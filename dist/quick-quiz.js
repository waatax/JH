import {subjects,questions} from './curriculum.js';
import {extraQuestions} from './exam-bank.js';
const bank=[...questions,...extraQuestions];
export function quickPool(subject='all'){
 return [...new Map(bank.filter(q=>subject==='all'||q.subject===subject).map(q=>[q.id,q])).values()];
}
export function quickConfig(subject,count){
 if(![10,20].includes(count))throw new Error('請選擇 10 或 20 題');
 const name=subject==='all'?'全科混合':subjects.find(s=>s.id===subject)?.name;
 if(!name)throw new Error('找不到科目');
 return {title:`趣味闖關・${name}・${Math.min(count,quickPool(subject).length)} 題`,mode:'practice',count};
}
export function renderQuickQuiz(container,start){
 container.innerHTML=`<div class="eyebrow">QUICK QUIZ · PLAY & LEARN</div><h1>抽一組題，來闖關！</h1><p class="muted">選一科，隨機抽題。用提示找方向，用解析把觀念學起來。</p><section class="panel quick-panel"><span class="tag accent">不限時 · 即時解析 · 自動儲存</span><h2>① 今天想挑戰哪一科？</h2><div class="quick-subjects" role="group" aria-label="選擇測驗科目">${[{id:'all',name:'全科驚喜包'},...subjects].map(s=>`<button type="button" class="chip" data-quick-subject="${s.id}" aria-pressed="${s.id==='all'}">${s.name}<small>${quickPool(s.id).length} 題</small></button>`).join('')}</div><h2>② 選擇你的回合</h2><div class="quick-rounds" role="group" aria-label="選擇題數"><button type="button" class="quick-round" data-quick-count="10" aria-pressed="true"><strong>10 題暖身</strong><span>小小一步，啟動腦力</span></button><button type="button" class="quick-round" data-quick-count="20" aria-pressed="false"><strong>20 題挑戰</strong><span>多想一點，探索更多</span></button></div><p id="quick-summary" class="notice" role="status"></p><button type="button" id="quick-start" class="button">隨機抽題，開始闖關 →</button><a href="#/quiz" class="button ghost">繼續尚未完成的測驗</a><p class="subtle">範圍為七至九年級原創選擇題，不受上方年級篩選限制，不含聽力與學測轉錄題。每回合不重複抽題；不同回合可能再次遇到同一道題。</p></section><section class="panel"><h2>你的闖關小任務</h2><div class="quick-missions"><p>① 先自己想答案<br><small>每次獨立答對，收下一顆理解之星。</small></p><p>② 卡住就看提示<br><small>看懂解析比猜中更有收穫。</small></p><p>③ 交卷後回顧<br><small>錯題會加入複習，再挑戰一次！</small></p></div></section>`;
 let subject='all',count=10;
 const update=()=>{
  container.querySelectorAll('[data-quick-subject]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.quickSubject===subject)));
  container.querySelectorAll('[data-quick-count]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.quickCount)===count)));
  const available=quickPool(subject).length,name=subject==='all'?'全科混合':subjects.find(s=>s.id===subject).name;
  container.querySelector('#quick-summary').textContent=`${name}：從 ${available} 題隨機抽出 ${Math.min(count,available)} 題，題目與選項順序都會打亂。`+(available<count?` 本科目前不足 ${count} 題，將使用全部 ${available} 題，不重複湊題。`:'');
  container.querySelector('#quick-start').disabled=!available;
 };
 container.querySelectorAll('[data-quick-subject]').forEach(b=>b.onclick=()=>{subject=b.dataset.quickSubject;update();});
 container.querySelectorAll('[data-quick-count]').forEach(b=>b.onclick=()=>{count=Number(b.dataset.quickCount);update();});
 container.querySelector('#quick-start').onclick=()=>start(quickPool(subject),quickConfig(subject,count));
 update();
}
