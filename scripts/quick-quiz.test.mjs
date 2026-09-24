import {test} from 'node:test';
import assert from 'node:assert/strict';
import {subjects} from '../dist/curriculum.js';
import {quickPool,quickConfig,renderQuickQuiz} from '../dist/quick-quiz.js';
import {makeSession} from '../dist/engine.js';
test('quick rounds draw unique valid questions for every subject and count',()=>{
 for(const subject of ['all',...subjects.map(s=>s.id)])for(const count of [10,20]){
  const pool=quickPool(subject),session=makeSession(pool,quickConfig(subject,count));
  assert.ok(pool.length>0);assert.equal(session.ids.length,Math.min(count,pool.length));assert.equal(new Set(session.ids).size,session.ids.length);
  assert.equal(session.deadline,null);assert.equal(session.mode,'practice');
  for(const id of session.ids){const q=pool.find(q=>q.id===id);assert.ok(q);if(subject!=='all')assert.equal(q.subject,subject);assert.deepEqual([...session.orders[id]].sort(),[0,1,2,3]);}
 }
 assert.throws(()=>quickConfig('math',30));assert.throws(()=>quickConfig('unknown',10));
});
test('quick picker changes subject and count before starting the selected round',()=>{
 const buttons=[{dataset:{quickSubject:'all'}},{dataset:{quickSubject:'math'}}],rounds=[{dataset:{quickCount:'10'}},{dataset:{quickCount:'20'}}];
 for(const b of [...buttons,...rounds])b.setAttribute=(k,v)=>b[k]=v;
 const summary={},startButton={},container={innerHTML:'',querySelectorAll:s=>s==='[data-quick-subject]'?buttons:rounds,querySelector:s=>s==='#quick-summary'?summary:startButton};
 let launched;renderQuickQuiz(container,(pool,config)=>launched={pool,config});
 assert.match(container.innerHTML,/10 題暖身/);assert.match(summary.textContent,/隨機抽出 10 題/);
 buttons[1].onclick();rounds[1].onclick();startButton.onclick();
 assert.equal(rounds[1]['aria-pressed'],'true');assert.equal(buttons[1]['aria-pressed'],'true');
 assert.equal(launched.config.count,20);assert.ok(launched.pool.every(q=>q.subject==='math'));assert.match(summary.textContent,/數學/);
});
