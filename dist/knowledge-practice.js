import {teachingFor} from './teaching.js';
import {unitById} from './curriculum.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const reviewStorageKey='zhixing-point-review-v1';
const states=['new','review','explained'];
const pendingByStorage=new WeakMap();
const unavailableStorage={};
const storageIdentity=storage=>storage&&(typeof storage==='object'||typeof storage==='function')?storage:unavailableStorage;
const pendingFor=storage=>pendingByStorage.get(storageIdentity(storage))||{};
const fingerprint=s=>{let h=2166136261;for(const char of s){h^=char.codePointAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);};
export function practicePointsFor(u){
 return teachingFor(u).rows.filter(row=>!['本課核心判準','本課易錯防線'].includes(row[0])).map(([label,rule,example])=>({id:u.id+'-'+fingerprint([label,rule,example].join('\n')),label,rule,example}));
}
export function readPointReview(storage){
 const pending=pendingFor(storage);
 try{const raw=JSON.parse(storage.getItem(reviewStorageKey)||'{}');if(!raw||Array.isArray(raw)||typeof raw!=='object')return {...pending};return {...Object.fromEntries(Object.entries(raw).filter(([key,value])=>/^[a-z]+-\d+-[a-z0-9]+$/.test(key)&&states.includes(value))),...pending};}catch{return {...pending};}
}
export function savePointReview(storage,pointId,status){
 if(!states.includes(status)||!/^[a-z]+-\d+-[a-z0-9]+$/.test(pointId))throw new Error('Invalid knowledge review record');
 const data={...readPointReview(storage),[pointId]:status};
 try{storage.setItem(reviewStorageKey,JSON.stringify(data));pendingByStorage.delete(storageIdentity(storage));return true;}catch{pendingByStorage.set(storageIdentity(storage),{...pendingFor(storage),[pointId]:status});return false;}
}
export function pointReviewSummary(points,data){const explained=points.filter(p=>data[p.id]==='explained').length;const review=points.filter(p=>data[p.id]==='review').length;return `共 ${points.length} 點｜能說明（自評）${explained} 點｜需複習 ${review} 點｜尚未自評 ${points.length-explained-review} 點`;}
function storageForBrowser(){try{return globalThis.localStorage;}catch{return null;}}
export function renderKnowledgePractice(u,storage=storageForBrowser()){
 const points=practicePointsFor(u),data=readPointReview(storage);
 return `<section class="point-practice" data-point-review="${u.id}" aria-label="逐點回想與複習"><div class="point-practice-header"><span class="point-practice-badge">🧩 費曼自評階梯</span><h3>每個知識點，練到能說明</h3></div><p class="point-practice-desc">依照教學表的核心規律逐點檢核。先自己閉眼回想，再展開核對；自評用於強化長期記憶，不替代測驗。</p><div class="point-summary-card"><span class="summary-icon" aria-hidden="true">📈</span><p data-point-summary aria-live="polite">${pointReviewSummary(points,data)}</p></div><label class="point-filter"><input type="checkbox" data-point-filter> <span>只看尚未能說明的知識點</span></label><ol class="point-cards">${points.map((p,i)=>`<li data-point-card="${p.id}"><div class="point-card-header"><span class="point-index-pill">#${i+1}</span><h4>${esc(p.label)}</h4></div><div class="point-recall-prompt"><strong class="prompt-tag">🧠 先自主回想：</strong>不用看答案，向自己或同學解釋「${esc(p.label)}」的核心意義，並說出使用時需確認的邊界條件。</div><details class="point-hint-detail"><summary>💡 看提示：由例子辨識條件</summary><div class="hint-body"><p>${esc(p.example)}</p><p class="subtle">先指出例子中的已知條件，再連回本課規則；需要計算時保留單位與步驟。</p></div></details><details class="point-check-detail"><summary>🔍 核對概念與修正方法</summary><div class="check-body"><p><strong>核心定義：</strong>${esc(p.rule)}</p><p><strong>例證／檢核：</strong>${esc(p.example)}</p><div class="redo-tip"><strong>🔁 再做一次：</strong>闔上答案，用自己的話重新完整說明。若只記得結論，請回到例子補出推理過程。</div></div></details><div class="point-status-row"><label>這一點目前的狀態 <select data-point-id="${p.id}" aria-label="${esc(p.label)}的複習狀態">${[['new','🌱 尚未自評'],['review','🔄 需再複習'],['explained','✅ 能說明（自評）']].map(([value,label])=>`<option value="${value}"${(data[p.id]||'new')===value?' selected':''}>${label}</option>`).join('')}</select></label></div></li>`).join('')}</ol><p data-point-empty hidden>🎉 此篩選下所有知識點皆已標記為能說明！請隔天遮住答案再試一次，確認不是短暫記住。</p><p class="subtle" data-point-save aria-live="polite">複習狀態只存於本機；內容更新時，已修改的知識點會重新等待自評。</p></section>`;
}
export function handlePointReviewChange(event,root,storage=storageForBrowser()){
 const section=event.target.closest?.('[data-point-review]');if(!section)return;
 const u=unitById[section.dataset.pointReview];if(!u)return;
 const points=practicePointsFor(u);let saved=true;
 if(event.target.dataset.pointId){if(!points.some(p=>p.id===event.target.dataset.pointId)||!states.includes(event.target.value))return;saved=savePointReview(storage,event.target.dataset.pointId,event.target.value);}
 const data=readPointReview(storage);
 for(const panel of root.querySelectorAll('[data-point-review]')){
  if(panel.dataset.pointReview!==u.id)continue;
  panel.querySelector('[data-point-summary]').textContent=pointReviewSummary(points,data);
  const filtered=panel.querySelector('[data-point-filter]').checked;let shown=0;
  for(const card of panel.querySelectorAll('[data-point-card]')){const state=data[card.dataset.pointCard]||'new';card.querySelector('select').value=state;card.hidden=filtered&&state==='explained';if(!card.hidden)shown++;}
  panel.querySelector('[data-point-empty]').hidden=shown!==0;
  if(event.target.dataset.pointId)panel.querySelector('[data-point-save]').textContent=saved?'已儲存於本機。自評不會替代測驗成績。':'目前無法寫入本機儲存；本次頁面仍保留狀態，重新開啟可能消失。';
 }
}
