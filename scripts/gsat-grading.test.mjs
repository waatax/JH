import {test} from 'node:test';
import assert from 'node:assert/strict';
import {compareGsatAnswer,evaluateExamSession} from '../dist/gsat-grading.js';
import {gsatResultPage} from '../dist/gsat-interactive.js';
const multi={question_type:'多選題',answer:'AC',options:{'(A)':'a','(B)':'b','(C)':'c','(D)':'d','(E)':'e'}};
test('blank multi-select earns zero, including when only one option is correct',()=>{
 for(const answer of ['A','AC'])for(const blank of [undefined,[],['']])assert.equal(compareGsatAnswer({...multi,answer},blank).earnedScore,0);
});
test('multi-select counts omissions and wrong selections with numeric or letter labels',()=>{
 assert.equal(compareGsatAnswer(multi,['(A)','(C)']).earnedScore,1);
 assert.equal(compareGsatAnswer(multi,['(A)']).earnedScore,0.6);
 assert.ok(Math.abs(compareGsatAnswer(multi,['(A)','(B)']).earnedScore-0.2)<1e-9);
 assert.equal(compareGsatAnswer({...multi,answer:'13',options:{'(1)':'a','(2)':'b','(3)':'c','(4)':'d','(5)':'e'}},['(1)','(3)']).earnedScore,1);
});
test('writing and incomplete extraction are pending, never rewarded for typing',()=>{
 assert.equal(compareGsatAnswer({question_type:'寫作題/非選擇題'},'隨便輸入').earnedScore,null);
 assert.equal(compareGsatAnswer({...multi,options:{A:'a',B:'b',C:'c',D:'d'}},['A']).pendingReview,true);
 assert.equal(compareGsatAnswer({question_type:'單選題',answer:'',options:{A:'a'}},'A').pendingReview,true);
});
test('manual review is excluded from comparison denominator and no grade is invented',()=>{
 const result=evaluateExamSession({answers:{1:'A',2:'文字'},startTime:0},[{question_number:1,question_type:'單選題',answer:'A',options:{A:'a',B:'b'}},{question_number:2,question_type:'寫作題/非選擇題'}],{exam_id:'test'},false,1000);
 assert.equal(result.totalMaxScore,1);assert.equal(result.earnedScore,1);assert.equal(result.pendingCount,1);assert.equal(result.estimatedLevel,undefined);
});
test('result renderer labels pending work and does not substitute unrelated history',()=>{
 const result=evaluateExamSession({answers:{1:'A',2:'文字'},startTime:0},[{question_number:1,question_type:'單選題',answer:'A',options:{A:'a',B:'b'}},{question_number:2,question_type:'寫作題/非選擇題'}],{exam_id:'test'},false,1000);
 const previous=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>JSON.stringify([result])}});
 try{
  const container={innerHTML:'',querySelector:()=>({})};
  gsatResultPage(container,result.id);
  assert.match(container.innerHTML,/待人工核對（不計入）/);
  assert.match(container.innerHTML,/不換算學測級分/);
  assert.doesNotMatch(container.innerHTML,/undefined|NaN/);
  gsatResultPage(container,'missing');assert.match(container.innerHTML,/查無此測驗/);
 }finally{if(previous)Object.defineProperty(globalThis,'localStorage',previous);else delete globalThis.localStorage;}
});
