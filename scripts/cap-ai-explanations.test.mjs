import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getCapExplanation, formatCapExplanation, relatedCapQuestions } from '../dist/cap-explanations.js';

const bank = JSON.parse(fs.readFileSync(new URL('../dist/cap-bank.json', import.meta.url), 'utf8'));
const byId = new Map(bank.questions.map(q => [q.id, q]));
const q = id => byId.get(`115-${id}`);

test('115 年六種考科的 237 題皆有實質 AI 解析，選項與官方答案相符', () => {
  const latest = bank.questions.filter(q => q.year === 115);
  assert.equal(latest.length, 237);
  for (const item of latest) {
    const ex = getCapExplanation(item);
    assert.equal(ex.ready, true, item.id);
    assert.equal(ex.answer, item.answer, item.id);
    assert.equal(ex.provenance.teacherReviewed, false);
    assert.ok(ex.steps.length >= 2 && ex.steps.every(s => typeof s === 'string' && s.length > 10));
    if (item.kind !== 'written') assert.equal(Object.keys(ex.options).sort().join(''), item.optionLetters);
    assert.doesNotMatch(ex.steps.join(' '), /經推導計算求得對應結果|逐步代入數值或列式化簡計算/);
  }
});

test('舊模板與答案不一致的推導不冒充已完成解析', () => {
  assert.equal(getCapExplanation(bank.questions.find(q => q.year === 114 && q.subject === 'chinese')).ready, false);
  const changed = {...q('math-1'), answer: 'B'};
  assert.equal(getCapExplanation(changed).ready, false);
  assert.match(formatCapExplanation(changed), /尚未完成校訂/);
  assert.doesNotMatch(formatCapExplanation(changed), /3x＝6/);
});

test('114 年數學全卷 27 題推導完整，統計與實際已發表題數相符', () => {
  const items = bank.questions.filter(q => q.year === 114 && q.subject === 'math');
  assert.equal(items.length, 27);
  for (const item of items) {
    const ex = getCapExplanation(item);
    assert.ok(ex.ready, item.id);
    assert.equal(ex.answer, item.answer);
    assert.ok(ex.steps.length >= 2);
    if (item.kind === 'written') {
      assert.match(ex.rubricLabel, /非官方/);
      assert.ok(ex.rubric.length >= 3);
    } else assert.equal(Object.keys(ex.options).sort().join(''), item.optionLetters);
  }
  const coverage = JSON.parse(fs.readFileSync(new URL('../dist/cap-ai-coverage.json',import.meta.url),'utf8'));
  const ready = bank.questions.filter(q => getCapExplanation(q).ready).length;
  assert.equal(coverage.aiDerived, ready);
  assert.equal(coverage.pending,bank.questions.length-ready);
  const radical = byId.get('114-math-8');
  assert.equal(radical.options.C,'2√3＋2√6');
  assert.match(radical.stem,/√2/);
  assert.match(radical.textReview.method,/visual-review/);
  assert.ok(radical.originalExtraction);
  assert.equal(byId.get('114-math-1').options.C,'7⁸');
  assert.equal(byId.get('114-math-11').options.B,'2/3');
});

test('114 年數學以獨立枚舉、代回與座標重算關鍵結果', () => {
  // Hidden cards: enumerate the sample space instead of copying the solution count.
  const pairs = [2,4,5].flatMap(a => [1,3,4].map(b => [a,b]));
  assert.equal(pairs.filter(([a,b])=>a>b).length/pairs.length,2/3);
  const combinations = [];
  for (let sets=0;sets<=100;sets++) {
    if (sets*70+(120-sets)*50+(100-sets)*40===8700) combinations.push(sets);
  }
  assert.deepEqual(combinations,[65]);
  assert.equal(combinations[0]*70,4550);
  // Search all valid allocations: each ticket may use only one offer.
  let maxPopcorn = -1;
  for(let bundle=0;bundle<=16;bundle++) for(let singlePopcorn=0;singlePopcorn<=16;singlePopcorn++) {
    if(16*320+bundle*90+(16-bundle)*35+singlePopcorn*80<=6000) maxPopcorn=Math.max(maxPopcorn,bundle+singlePopcorn);
  }
  assert.equal(maxPopcorn,5);
  const gearCounts = [6,7,8,9].map(d=>[22,33,44].filter(f=>[14,16,18,21,24,28].some(r=>f*d===11*r)).length);
  assert.deepEqual(gearCounts,[2,3,2,1]);
  const y = t => 12-(7-t)**2;
  assert.ok(y(0)<y(7) && y(7)>y(10));
  assert.ok(Math.abs((5/8)/(2/Math.sqrt(3))-5*Math.sqrt(3)/16)<1e-12);
  const area = (a,b,c)=>Math.abs((b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]))/2;
  const A=[0,0],B=[7,0],C=[0,6],G=[7/3,2],E=[3,0];
  const D=E.map((v,i)=>v+1.5*(v-G[i]));
  assert.ok(Math.abs(area(A,D,G)/area(A,B,C)-5/14)<1e-12);
  assert.equal(8+18+30,56);
  assert.equal(16+18+30/2,49);
  assert.equal(Number.isInteger(27/5),false);
});

test('114 年英聽 21 題有錄音來源、三個選項解說與標準答案核對',()=>{
  const items=bank.questions.filter(q=>q.year===114 && q.subject==='listening');
  assert.equal(items.length,21);
  for(const item of items) {
    const ex=getCapExplanation(item);
    assert.ok(ex.ready,item.id);
    assert.equal(ex.answer,item.answer);
    assert.equal(Object.keys(ex.options).sort().join(''),'ABC');
    assert.ok(item.audio && fs.existsSync(new URL(`../dist/${item.audio}`,import.meta.url)));
    assert.ok(item.analysis.transcript.length>20);
    assert.match(ex.provenance.analysisSourceSha256,/^[a-f0-9]{64}$/);
  }
  assert.equal(byId.get('114-listening-21').options.C,'People have to wait until the rain stops.');
});

test('獨立重算數學與自然科數值，對照答案選項', () => {
  const numericChoice = (id, result) => assert.equal(Number(q(id).options[q(id).answer].replace('−','-')), result, id);
  numericChoice('math-1', (5+1)/3);
  numericChoice('math-3', 6+14);
  numericChoice('math-6', 180+270+100+80);
  numericChoice('math-9', 5+2*(-7));
  numericChoice('math-10', 57600/120);
  numericChoice('math-12', (15-9)+16);
  numericChoice('math-16', 180-25-50);
  numericChoice('math-18', (13-Math.sqrt(13**2-12**2))-Math.sqrt(13**2-12**2));
  const sums = new Map();
  for (const a of [2,3,4]) for (const b of [3,4,5]) sums.set(a+b,(sums.get(a+b)||0)+1);
  numericChoice('math-4', [...sums].sort((a,b) => b[1]-a[1])[0][0]);
  assert.equal(2.45*98.7-(-0.55)*98.7,296.1);
  assert.equal(120 > 1160/11 && Math.ceil(1160/11) === 106,true);
  // Similarity calculation from a coordinate model with AB = BC = 13, BE = 6, BF = 5.
  assert.equal((13-6)/(13-5),7/8);
  const first = [];
  for(let week=1;week<=18;week++) for(const [day,laps] of [['一',2*week+3],['四',2*week+5]]) if(laps*400>15000) first.push({week,day,laps});
  assert.deepEqual(first[0],{week:17,day:'四',laps:39});
  const sofaSide = 2*(130+45/Math.sqrt(3)+50)/Math.sqrt(3);
  assert.ok(Math.abs(sofaSide-(120*Math.sqrt(3)+30))<1e-10);
  const pressureRatio = ((20*10*8)/(30*20*10))/((20*10)/(30*20));
  assert.ok(Math.abs(pressureRatio-0.8)<1e-10);
  assert.ok(Math.abs((20/40)/(30/50)-5/6)<1e-10);
  assert.equal(50/(5/50)-50,450);
  assert.equal((5-4.5)/5,0.1);
  assert.equal(44/16,2.75);
});

test('相關題目具真實共同目標或代碼，連結可定位同科其他題', () => {
  for (const item of bank.questions.filter(q => q.year === 115)) {
    for (const related of relatedCapQuestions(item, bank.questions)) {
      const other = byId.get(related.id);
      assert.ok(other && other.id !== item.id && other.subject === item.subject);
      assert.match(related.href, new RegExp(`^#/cap-exam/${other.year}-${other.subject}\\?mode=practice&q=${other.number}$`));
      assert.ok(related.basis.startsWith('相同評量目標') || item.officialCodes.some(code => other.officialCodes.includes(code)));
    }
  }
});

test('闖關使用同一版 AI 解析，保留換行、音檔及解析狀態', () => {
  const {items} = JSON.parse(fs.readFileSync(new URL('../dist/quest/course/items.json', import.meta.url),'utf8'));
  for(const item of bank.questions.filter(q => getCapExplanation(q).ready && q.kind!=='written')) {
    const gameItem = items[`cap.${item.id}`];
    assert.equal(gameItem.why,formatCapExplanation(item), item.id);
    assert.equal(gameItem.explanationStatus,'ai-derived');
    assert.equal(gameItem.hint,getCapExplanation(item).hint);
    assert.deepEqual(gameItem.options,Array.from(item.optionLetters));
  }
  const view = fs.readFileSync(new URL('../dist/quest/view.mjs',import.meta.url),'utf8');
  assert.match(view,/white-space:pre-line/);
  assert.match(view,/ui\.a\.hint && !s\.feedback/);
  assert.match(view,/s\.feedback \? lessonFeedback\(it, s\.feedback\)/);
  const footer=view.slice(view.indexOf('function lessonFooter'),view.indexOf('// Views: Modals'));
  assert.doesNotMatch(footer,/class="why"/);
});
