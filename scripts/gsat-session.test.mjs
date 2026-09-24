import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createSession,restoreSession,secondsLeft,answeredCount,sessionKey} from '../dist/gsat-session.js';
import {evaluateExamSession} from '../dist/gsat-grading.js';
const exam={exam_id:'example',year:115,subject_name:'測試'},questions=[{question_id:'part-a-1',question_number:'1',question_type:'單選題',answer:'A',options:{A:'a',B:'b'}},{question_id:'part-b-1',question_number:'1',question_type:'單選題',answer:'B',options:{A:'a',B:'b'}}];
test('duplicate display numbers retain separate answers through restore and grading',()=>{
 const s=createSession(exam,questions,'exam',10,1000);s.answers={'part-a-1':'A','part-b-1':'B'};s.cursor=1;s.flagged={'part-b-1':true};
 const restored=restoreSession(JSON.stringify(s),exam.exam_id,'exam',questions);
 assert.equal(restored.cursor,1);assert.equal(restored.flagged['part-b-1'],true);assert.equal(evaluateExamSession(restored,questions,exam,false,2000).correctCount,2);
});
test('refresh and time away never restart an exam deadline',()=>{
 const s=createSession(exam,questions,'exam',1,1000),r=restoreSession(JSON.stringify(s),exam.exam_id,'exam',questions);
 assert.equal(secondsLeft(r,31000),30);assert.equal(secondsLeft(r,65000),0);
 assert.equal(secondsLeft(createSession(exam,questions,'practice',1,1000),65000),0);
});
test('cleared input and empty multi-selection are unanswered',()=>{
 const s=createSession(exam,questions,'practice',1);s.answers={'part-a-1':'  ','part-b-1':[]};assert.equal(answeredCount(s,questions),0);
 s.answers['part-b-1']=['B'];assert.equal(answeredCount(s,questions),1);
});
test('invalid, mismatched and submitted sessions do not restore',()=>{
 const s=createSession(exam,questions,'exam',1,1000);
 for(const raw of ['bad','null',JSON.stringify({...s,answers:[]}),JSON.stringify({...s,deadline:'oops'}),JSON.stringify({...s,submitted:true})])assert.equal(restoreSession(raw,exam.exam_id,'exam',questions),null);
 assert.equal(restoreSession(JSON.stringify(s),exam.exam_id,'practice',questions),null);
 assert.equal(restoreSession(JSON.stringify(s),exam.exam_id,'exam',questions.slice(1)),null);
 assert.notEqual(sessionKey(exam.exam_id,'exam'),sessionKey(exam.exam_id,'practice'));
});
