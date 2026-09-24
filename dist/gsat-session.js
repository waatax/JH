export const questionKey=q=>String(q.question_id??q.question_number);
export const hasAnswer=value=>Array.isArray(value)?value.some(x=>String(x??'').trim()):value!==undefined&&value!==null&&String(value).trim()!=='';
export const answeredCount=(session,questions)=>questions.filter(q=>hasAnswer(session.answers[questionKey(q)])).length;
export const sessionKey=(examId,mode)=>`gsat-practice-session-v2:${encodeURIComponent(examId)}:${mode}`;
export const secondsLeft=(session,now=Date.now())=>session.mode==='exam'?Math.max(0,Math.ceil((session.deadline-now)/1000)):0;
export function createSession(exam,questions,mode,minutes,now=Date.now()){
 return {version:2,examId:exam.exam_id,examTitle:`${exam.year} 學年度 ${exam.subject_name}`,mode,durationMinutes:minutes,startTime:now,deadline:mode==='exam'?now+minutes*60000:null,questionIds:questions.map(questionKey),cursor:0,answers:{},flagged:{},checked:{},fontSize:18,submitted:false};
}
export function restoreSession(raw,examId,mode,questions){
 try{
  const s=JSON.parse(raw),ids=questions.map(questionKey);
  if(!s||s.version!==2||s.examId!==examId||s.mode!==mode||s.submitted||JSON.stringify(s.questionIds)!==JSON.stringify(ids))return null;
  if(!Number.isFinite(s.startTime)||(mode==='exam'&&(!Number.isFinite(s.deadline)||s.deadline<s.startTime)))return null;
  for(const name of ['answers','flagged','checked'])if(!s[name]||typeof s[name]!=='object'||Array.isArray(s[name]))return null;
  for(const [key,value] of Object.entries(s.answers))if(!ids.includes(key)||!(typeof value==='string'||(Array.isArray(value)&&value.every(x=>typeof x==='string'))))return null;
  s.cursor=Number.isInteger(s.cursor)?Math.max(0,Math.min(ids.length-1,s.cursor)):0;
  s.fontSize=[14,16,18,20,22,24].includes(s.fontSize)?s.fontSize:18;
  return s;
 }catch{return null;}
}
