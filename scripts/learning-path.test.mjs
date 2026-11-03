import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCourse,createGame,DAY,isScored} from '../dist/quest/engine.mjs';
import {makePlacement,placementReport} from '../dist/quest/placement.mjs';
import {visibleLearningUnits,recommendLearning,learningEvidence} from '../dist/quest/learning-path.mjs';

const read = file=>JSON.parse(fs.readFileSync(`dist/quest/course/${file}.json`,'utf8'));
function setup() {
  const course = createCourse(read('index'));
  for (const id of ['items','s1','s2','s3','s4','s5','s6']) course.register(read(id));
  const map = new Map();
  const storage = {getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
  let time = new Date(2026,10,3,12).getTime();
  const now = ()=>time;
  return {course, storage, now, advance:d=>time+=d*DAY, game:createGame({course,storage,now})};
}
const answer = it=>it.type === 'match' ? 'matched' : it.answer;
function finish(game,{hint=false,wrong=false}={}) {
  let limit=150;
  while(game.state.session && limit--) {
    const it=game.currentItem(), s=game.state.session;
    if(isScored(it)) {
      if(hint)game.markAssisted();
      game.checkAnswer(wrong && s.index<s.base ? '__wrong__' : answer(it));
    }
    game.nextStep();
  }
  assert.ok(limit>0,'Session must terminate');
  return game.result;
}

test('Shared branch nodes retain their canonical semester for diagnosis and reviews',()=>{
  const {course}=setup();
  assert.equal(course.units.get('math-1').track,'s1');
  assert.equal(course.nodes.get('math-1:concept').track,'s1');
  assert.ok(course.track('b-math').units.some(u=>u.id==='math-1'));
});

test('Subject, search and recommendation share the same visible scope',()=>{
  const {course,game}=setup();
  const result=visibleLearningUnits(course.track('s1'),{subject:'biology',query:'細胞'});
  assert.ok(result.length>0);
  assert.ok(result.every(u=>u.subject==='biology' && `${u.title} ${u.pitfall}`.includes('細胞')));
  assert.equal(recommendLearning(result,game).unit.id,result[0].id);
  assert.equal(recommendLearning([],game),null);
  assert.equal(visibleLearningUnits(course.track('s1'),{query:'根本不存在的概念'}).length,0);
});

test('Due review takes priority only inside the selected scope',()=>{
  const {course,game,now}=setup();
  game.state.review['biology-1']={step:0,due:now()-1};
  const biology=visibleLearningUnits(course.track('s1'),{subject:'biology'});
  assert.equal(recommendLearning(biology,game).mode,'review');
  assert.equal(recommendLearning(visibleLearningUnits(course.track('s1'),{subject:'math'}),game).mode,'lesson');
});

test('Reading cards do not lower accuracy or create answer records',()=>{
  const {game}=setup();
  game.startSession('lesson','math-1:concept');
  const info=game.currentItem();
  assert.equal(info.type,'info');
  game.checkAnswer('any');
  assert.equal(game.state.items[info.id],undefined);
  assert.equal(game.state.session.results.length,0);
  const result=finish(game);
  assert.equal(result.accuracy,1);
  assert.ok(result.total>0);
  assert.equal(result.independent,result.total);
});

test('Repeated checks cannot award extra answers or consume extra hearts',()=>{
  const {game}=setup();
  game.startSession('boss','math-1:boss');
  const id=game.currentItem().id;
  game.checkAnswer('__wrong__');
  game.checkAnswer('__wrong__');
  assert.equal(game.state.session.hearts,2);
  assert.equal(game.state.session.results.length,1);
  assert.equal(game.state.items[id].s,1);
});

test('An unanswered scored item cannot be skipped using nextStep',()=>{
  const {game}=setup();
  game.startSession('boss','math-1:boss');
  assert.equal(game.nextStep(),null);
  assert.equal(game.state.session.index,0);
});

test('Hints persist across reload, exclude independent credit and retain a review target',()=>{
  const {game,course,storage,now}=setup();
  game.startSession('boss','math-1:boss');
  const id=game.currentItem().id;
  game.markAssisted();
  const resumed=createGame({course,storage,now});
  resumed.checkAnswer(answer(resumed.currentItem()));
  assert.equal(resumed.state.session.results[0].ok,false);
  assert.equal(resumed.state.session.results[0].correct,true);
  assert.equal(resumed.state.items[id].independent,0);
  assert.equal(resumed.state.items[id].m,true);
  const saved=createGame({course,storage,now});
  assert.equal(saved.state.items[id].trials,1);
});

test('Repair after seeing the answer cannot graduate a mistake; two later independent recalls can',()=>{
  const {game}=setup();
  game.startSession('review','math-1');
  const s=game.state.session,id=s.queue[0];
  s.queue=[id];s.base=1;
  game.checkAnswer('__wrong__');game.nextStep();
  game.checkAnswer(answer(game.currentItem()));game.nextStep();
  assert.equal(game.state.items[id].m,true);
  assert.equal(game.state.items[id].fix,0);
  for(let n=0;n<2;n++) {
    game.startSession('mistakes','all');
    const run=game.state.session;run.queue=[id];run.base=1;
    game.checkAnswer(answer(game.currentItem()));game.nextStep();
  }
  assert.equal(game.state.items[id].m,false);
});

test('Spaced review advances after independent success and resets after assistance',()=>{
  const {game,now}=setup();
  game.state.review['math-1']={step:0,due:now()-1};
  game.startSession('review','math-1');finish(game);
  assert.equal(game.state.review['math-1'].step,1);
  assert.equal(game.state.review['math-1'].due,now()+3*DAY);
  game.startSession('review','math-1');finish(game,{hint:true});
  assert.equal(game.state.review['math-1'].step,0);
  assert.equal(game.state.review['math-1'].due,now()+DAY);
});

test('Review questions are distinct across overlapping node pools',()=>{
  const {game}=setup();
  game.startSession('review','math-1');
  const queue=game.state.session.queue;
  assert.equal(new Set(queue).size,queue.length);
});

test('Placement balances six semesters, samples distinct subjects and varies by run',()=>{
  const {course}=setup();
  for(const size of [10,20,30]) {
    const plan=makePlacement(size,course,1);
    assert.equal(plan.size,size);
    assert.equal(new Set(plan.slots.map(s=>s.id)).size,size);
    const counts=course.index.sections.map(section=>plan.slots.filter(x=>course.units.get(x.unitId).track===section.id).length);
    assert.ok(Math.max(...counts)-Math.min(...counts)<=1);
    assert.ok(new Set(plan.slots.map(x=>course.units.get(x.unitId).subject)).size>=4);
  }
  assert.notDeepEqual(makePlacement(20,course,1).slots,makePlacement(20,course,2).slots);
});

test('Placement recommends an observed gap and never infers untested mastery',()=>{
  const {course}=setup();
  const slots=makePlacement(20,course).slots;
  const result=placementReport(slots.map(s=>({id:s.id,ok:course.units.get(s.unitId).track!=='s3'})),course);
  assert.equal(result.recommended,'s3');
  assert.equal(placementReport([],course).recommended,'s1');
});

test('Evidence distinguishes no observations from measured zero, and ignores legacy totals',()=>{
  const {course,game}=setup();
  let rows=learningEvidence(course,game.state);
  assert.equal(rows.find(d=>d.label==='數學').rate,null);
  game.startSession('review','math-1');
  const id=game.currentItem().id;
  game.state.items[id]={s:10,c:8};
  assert.equal(learningEvidence(course,game.state).find(d=>d.label==='數學').rate,null);
  game.markAssisted();game.checkAnswer(answer(game.currentItem()));
  rows=learningEvidence(course,game.state);
  assert.equal(rows.find(d=>d.label==='數學').rate,0);
  assert.equal(rows.find(d=>d.label==='數學').trials,1);
});
