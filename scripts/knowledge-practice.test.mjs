import {test} from 'node:test';
import assert from 'node:assert/strict';
import {units,subjects} from '../dist/curriculum.js';
import {practicePointsFor,readPointReview,savePointReview,renderKnowledgePractice,handlePointReviewChange,reviewStorageKey} from '../dist/knowledge-practice.js';
import {subjectChallenges} from '../dist/subject-challenges.js';
import {teachingFor} from '../dist/teaching.js';
import {renderLessonDeepening} from '../dist/lesson-deepening.js';
const store=()=>{let value='{}';return {getItem:()=>value,setItem:(key,text)=>{assert.equal(key,reviewStorageKey);value=text;}};};
const point=practicePointsFor(units[0])[0];
test('every lesson has stable, unique knowledge point identities and escaped recall cards',()=>{
 for(const u of units){const points=practicePointsFor(u);assert(points.length>=3,u.id);assert.equal(new Set(points.map(p=>p.id)).size,points.length,u.id);assert.deepEqual(practicePointsFor(u),points);const html=renderKnowledgePractice(u,store());assert.equal((html.match(/data-point-card=/g)||[]).length,points.length);assert(!html.includes('undefined'));}
});
test('stored review records restore independently without leaking between stores',()=>{
 const a=store(),b=store();assert(savePointReview(a,point.id,'explained'));assert.equal(readPointReview(a)[point.id],'explained');assert.equal(readPointReview(b)[point.id],undefined);savePointReview(a,point.id,'review');assert.equal(readPointReview(a)[point.id],'review');
});
test('a failed write keeps the latest self-assessment ahead of an older saved value',()=>{
 const a={getItem:()=>JSON.stringify({[point.id]:'new'}),setItem:()=>{throw Error('quota');}};
 assert.equal(savePointReview(a,point.id,'explained'),false);assert.equal(readPointReview(a)[point.id],'explained');
 a.setItem=()=>{};assert(savePointReview(a,point.id,'review'));a.getItem=()=>JSON.stringify({[point.id]:'review'});assert.equal(readPointReview(a)[point.id],'review');
});
test('malformed or untrusted records do not become review state',()=>{
 assert.deepEqual(readPointReview({getItem:()=>'{broken'}),{});
 assert.deepEqual(readPointReview({getItem:()=>JSON.stringify({[point.id]:'mastered','bad key':'explained'})}),{});
 assert.throws(()=>savePointReview(store(),point.id,'mastered'));
});
test('changing a point synchronizes lesson and studio while filtering hides only explained cards',()=>{
 const u=units[0],points=practicePointsFor(u),storage=store();
 const panel=()=>{const summary={},filter={checked:true},empty={},save={};const cards=points.map(p=>({dataset:{pointCard:p.id},select:{},hidden:false,querySelector(){return this.select;}}));return {dataset:{pointReview:u.id},cards,summary,empty,querySelector:s=>({'[data-point-summary]':summary,'[data-point-filter]':filter,'[data-point-empty]':empty,'[data-point-save]':save}[s]),querySelectorAll:()=>cards};};
 const a=panel(),b=panel(),root={querySelectorAll:()=>[a,b]};
 handlePointReviewChange({target:{dataset:{pointId:points[0].id},value:'explained',closest:()=>a}},root,storage);
 for(const p of [a,b]){assert.equal(p.cards[0].hidden,true);assert.equal(p.cards[1].hidden,false);assert.equal(p.cards[0].select.value,'explained');assert(p.summary.textContent.includes('自評）1 點'));assert.equal(p.empty.hidden,true);}
});
test('new subject challenges retain complete conditions and verifiable numerical answers',()=>{
 for(const s of subjects){const c=subjectChallenges[s.id];assert(c,s.id);assert.equal(c.steps.length,3);assert(c.scenario&&c.question&&c.answer&&c.transfer);}
 assert(subjectChallenges.math.answer.includes('420'));
 assert(subjectChallenges.chemistry.answer.includes('剩 2 個 H₂'));
 assert(subjectChallenges.geography.answer.includes('2,000'));
 assert(subjectChallenges.music.answer.includes('0.5+0.5'));
 assert(subjectChallenges.health.answer.includes('9 g'));
});
test('corrected tables match the plant transport and Chinese history topics',()=>{
 const rows=id=>teachingFor(units.find(u=>u.id===id)).rows;
 assert(rows('biology-8').some(r=>r[0]==='木質部'));
 assert(rows('history-10')[0][1].includes('周代分封'));
 assert(rows('history-13')[0][1].includes('開港後'));
 assert(rows('history-14')[0][1].includes('1912 年'));
});
test('zero quantities are drawn at zero width instead of a minimum visible bar',()=>{
 const u=units.find(u=>u.id==='math-12'),html=renderLessonDeepening(u);
 assert(html.includes('width:0%'));
 assert(html.includes('教學數量比較圖'));
});
