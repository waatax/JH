export const DAY=86400000;
export function shuffled(items,random=Math.random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
export function makeSession(pool,{title,mode='practice',count=10,minutes=15,constructed=[]},now=Date.now()){
 const selected=shuffled(pool).slice(0,Math.min(count,pool.length));
 return {id:globalThis.crypto?.randomUUID?.()||`${now}-${Math.random()}`,title,mode,ids:selected.map(q=>q.id),orders:Object.fromEntries(selected.map(q=>[q.id,shuffled([0,1,2,3])])),answers:{},revealed:{},hints:{},cursor:0,started:now,deadline:mode==='exam'?now+minutes*60000:null,constructed,work:{},submitted:false};
}
export function remainingSeconds(session,now=Date.now()){return session.deadline===null?null:Math.max(0,Math.ceil((session.deadline-now)/1000))}
export function gradeSession(session,bank){let correct=0,answered=0,independent=0;const rows=session.ids.map(id=>{const q=bank[id];const answer=session.answers[id];const ok=answer===q.answer;if(answer!==undefined)answered++;if(ok)correct++;if(ok&&!session.hints[id])independent++;return {id,answer:answer??null,correct:ok,hinted:!!session.hints[id]}});return {total:rows.length,correct,answered,independent,percent:rows.length?Math.round(correct/rows.length*100):0,rows}}
export function nextRecord(old={},correct,hinted,now=Date.now()){
 const clean=correct&&!hinted;
 const previousDay=old.lastIndependent?new Date(old.lastIndependent).toDateString():null;
 const newDay=previousDay!==new Date(now).toDateString();
 const streak=clean?(old.streak||0)+(newDay?1:0):0;
 const interval=clean?([1,3,7,14][Math.min(Math.max(streak-1,0),3)]):1;
 return {attempts:(old.attempts||0)+1,correctCount:(old.correctCount||0)+(correct?1:0),latestCorrect:clean,last:now,lastIndependent:clean?now:old.lastIndependent||null,streak,due:now+interval*DAY};
}
export function formatTime(seconds){return `${Math.floor(seconds/60).toString().padStart(2,'0')}:${(seconds%60).toString().padStart(2,'0')}`}
