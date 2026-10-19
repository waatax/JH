import {lessonAlignment} from './lesson-alignment.js';
import {subjectStrategies} from './subject-strategies.js';
import {knowledgePoints, teachingFor} from './teaching.js';
import {workedCases} from './worked-cases.js';
import {subjectById} from './curriculum.js';
import {sources} from './sources.js';
import {renderLessonDeepening} from './lesson-deepening.js';
const sourceFor = id => sources.find(s => s.id === ({'社會':'social','自然科學':'science','藝術':'arts','綜合活動':'integrative','科技':'technology','健康與體育':'health'}[subjectById[id].domain] || (['chinese','english','math'].includes(id)?id:'index')));

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const evidenceByDomain = {
 '語文':['指出原文或語境線索','用自己的話重述並解釋語意','換一個對象或情境重新表達；口說與手語請邀請教師回饋'],
 '數學':['列出已知、未知、單位與適用條件','保留等式、推理或作圖步驟','代回、估算或用不同表示法驗算，說明限制'],
 '自然科學':['分清觀察紀錄、假設與推論','說明變因、模型與證據如何支持結論','檢查單位與控制條件，提出模型不能解釋的情境'],
 '社會':['指出資料的時間、地點、作者與立場','用資料比較變遷、空間差異或不同觀點','區分事實與意見；補找反例，避免把相關直接當因果'],
 '藝術':['描述作品中可觀察的聲音、動作或視覺元素','以創作或演出說明選擇的表現方式','保存作品及修改前後版本，請同儕提出具體回饋'],
 '科技':['寫清楚使用者需求、輸入輸出或設計限制','保留演算法、草圖、製作與測試紀錄','用正常與邊界情境測試，根據結果修改作品'],
 '健康與體育':['辨識情境、身體感受與安全條件','在合適指導下記錄動作或行動過程','以觀察與回饋調整；文字答對不能替代動作評量'],
 '綜合活動':['說明自己的需求、資源與情境限制','保留規劃、分工、實際行動與結果紀錄','比較預期與結果，說出下一次具體調整的方法']
};

export function learningGuideFor(u) {
 const subject=subjectById[u.subject], worked=workedCases[u.id];
 return {points:knowledgePoints(u), rows:teachingFor(u).rows, evidence:evidenceByDomain[subject.domain], strategies:subjectStrategies[u.subject], worked, source:sourceFor(u.subject)};
}

export function renderLearningGuide(u) {
 const g=learningGuideFor(u);
 return `${renderLessonDeepening(u)}<section class="learning-guide" aria-label="知識掌握與修正指南"><h3>🧭 本課學習地圖：${esc(u.title)}</h3>
 <p class="subtle">依領域課綱方向整理的本站學習目標；不是官方逐條指標認證。</p>
 <div class="guide-map" role="list" aria-label="概念到應用的關係圖">
 ${[['🎯','理解概念',g.points.join('；')],['🔎','辨識條件',u.pitfall],['✍️','應用驗證',u.task]].map(([icon,title,text])=>`<div role="listitem"><strong><span aria-hidden="true">${icon}</span> ${title}</strong><p>${esc(text)}</p></div>`).join('')}</div>
 <h4>📌 本科怎麼學：方法與遷移</h4><ol>${g.strategies.map(item=>`<li>${esc(item)}</li>`).join('')}</ol>
 <div class="table-wrap"><table class="teaching-table"><caption>${esc(u.title)}：學習成果檢核表</caption><thead><tr><th scope="col">目標</th><th scope="col">留下的證據</th><th scope="col">未達成時的修正</th></tr></thead><tbody><tr><th scope="row">概念辨識</th><td>不看講義，解釋：${esc(g.points[0]||u.concept)}</td><td>對照上方知識表，圈出漏掉的條件，再寫一次。</td></tr><tr><th scope="row">推理應用</th><td>${esc(u.example)}</td><td>逐步對照示範，標出第一個不理解的轉換。</td></tr><tr><th scope="row">遷移與界線</th><td>${esc(u.task)}</td><td>檢查是否出現此迷思：${esc(u.pitfall)}</td></tr></tbody></table></div>
 <details class="guide-recall"><summary>🧠 遮答練習：先完成推理，再核對解析</summary><p>先在筆記作答，寫下選擇理由及不確定處。以下是本站原創練習，不是官方試題。</p>${u.questions.map((q,i)=>`<section><h4>第 ${i+1} 題：${esc(q.prompt)}</h4><ol type="A">${q.options.map(o=>`<li>${esc(o)}</li>`).join('')}</ol><details><summary>展開答案與修正依據</summary><p><strong>答案：${String.fromCharCode(65+q.answer)}．${esc(q.options[q.answer])}</strong></p><p>${esc(q.explanation)}</p><p>修正任務：指出原答案漏掉的條件，再解釋一個其他選項為什麼不成立。</p></details></section>`).join('')}</details>
 <details><summary>🛠️ 卡住時怎麼修正？</summary><dl><dt>看不懂概念</dt><dd>回到本課焦點：${esc(g.points[0]||u.concept)}</dd><dt>知道規則卻不會用</dt><dd>${esc(g.worked.teaching)}</dd><dt>算出或選出答案仍不確定</dt><dd>${esc(g.worked.check)}</dd><dt>再次檢查</dt><dd>闔上解析重做，並完成：${esc(u.task)}。若仍無法說明，記下具體疑問請教師協助。</dd></dl></details>
 <h4>🔁 檢查 → 修正 → 計畫 → 實作 → 再檢查</h4><ol class="guide-cycle"><li><strong>檢查：</strong>不看講義說明本課概念，標出不會的知識點。</li><li><strong>修正：</strong>對照條件與解析，寫出錯誤原因。</li><li><strong>計畫：</strong>挑一個未掌握重點，安排一次例題與一次遷移任務。</li><li><strong>實作：</strong>${esc(u.task)}</li><li><strong>再檢查：</strong>隔天不看答案重述理由；仍卡住就重啟修正。</li></ol>
 <details><summary>📚 本課章節與課綱對照進度</summary><p>以下僅為既有課程計畫的主題關聯，章節代碼尚待逐條審訂，不能視為本課已完整涵蓋。</p>${lessonAlignment[u.id]?.length?`<ul>${lessonAlignment[u.id].map(ref=>`<li><a href="${esc(ref.url)}" target="_blank" rel="noopener">${esc(ref.title)}</a>（${esc(ref.kind)}）<br>來源所列代碼：${esc(ref.codes.join('、')||'未列代碼')}；本課對應待審。</li>`).join('')}</ul>`:'<p>本課尚無已建檔的逐章對照。請由上方官方領綱檢查學習內容與學習表現，不以主題相似代替指標審查。</p>'}</details>
 <h4>📋 本領域的學習證據</h4><ul>${g.evidence.map(item=>`<li>${esc(item)}</li>`).join('')}</ul><p class="notice">閱讀、勾選或答對兩題僅供初步自我檢查。<a href="${esc(g.source.url)}" target="_blank" rel="noopener">${esc(g.source.name)}</a>提供課綱參照；<a href="#/alignment">查看版本／章節對照與待補範圍</a>。</p></section>`;
}
