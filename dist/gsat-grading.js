// Answer comparison only: extracted scores and question boundaries need PDF review.
const normalize=value=>String(value??'').normalize('NFKC').replace(/[()\s]/g,'').toUpperCase();
export function compareGsatAnswer(q,userAnswer){
 const answer=normalize(q.answer),options=Object.keys(q.options||{}).map(normalize);
 const pending={earnedScore:null,isCorrect:null,pendingReview:true};
 if(q.question_type==='單選題'){
  if(!answer||!options.includes(answer))return pending;
  const ok=normalize(userAnswer)===answer;
  return {earnedScore:ok?1:0,isCorrect:ok,pendingReview:false};
 }
 if(q.question_type==='多選題'){
  // Only unambiguous, complete five-option records are eligible for partial credit.
  const correct=answer.replace(/[,、]/g,'').split('');
  if(options.length!==5||new Set(options).size!==5||!correct.length||correct.some(c=>!options.includes(c)))return pending;
  const selected=(Array.isArray(userAnswer)?userAnswer:userAnswer==null?[]:[userAnswer]).map(normalize).filter(Boolean);
  if(!selected.length)return {earnedScore:0,isCorrect:false,pendingReview:false};
  if(selected.some(c=>!options.includes(c)))return {earnedScore:0,isCorrect:false,pendingReview:false};
  const errors=options.filter(c=>selected.includes(c)!==correct.includes(c)).length;
  return {earnedScore:Math.max(0,1-2*errors/5),isCorrect:errors===0,pendingReview:false};
 }
 if(['選填題','選填格/子題'].includes(q.question_type)){
  if(!answer||!/^[\d+−\-.,/]+$/.test(answer))return pending;
  const ok=normalize(userAnswer)===answer;
  // Equivalent expressions/representations require human review instead of false negatives.
  return ok?{earnedScore:1,isCorrect:true,pendingReview:false}:pending;
 }
 return pending;
}
export function evaluateExamSession(session,questions,exam,isExpired,now=Date.now()){
 const rows=questions.map(q=>({question_id:q.question_id,question_number:q.question_number,question_type:q.question_type,section_name:q.section_name,question_text:q.question_text,passage_text:q.passage_text,options:q.options||{},userAnswer:session.answers[q.question_number],officialAnswer:q.answer,points:1,rubric_text:q.rubric_text,...compareGsatAnswer(q,session.answers[q.question_number])}));
 const graded=rows.filter(r=>!r.pendingReview),earned=graded.reduce((n,r)=>n+r.earnedScore,0);
 return {scoringVersion:2,id:`result-${now}`,examId:exam.exam_id,examTitle:session.examTitle,mode:session.mode,timestamp:now,durationSeconds:Math.max(0,Math.floor((now-session.startTime)/1000)),isExpired,earnedScore:Math.round(earned*10)/10,totalMaxScore:graded.length,percent:graded.length?Math.round(earned/graded.length*1000)/10:0,correctCount:graded.filter(r=>r.isCorrect).length,pendingCount:rows.length-graded.length,totalQuestions:rows.length,rows};
}
