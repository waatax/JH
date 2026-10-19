import {languageMathDeepening} from './deepening-language-math.js';
import {scienceDeepening} from './deepening-science.js';
import {socialLifeDeepening} from './deepening-social-life.js';
import {officialAlignment,officialSources} from './official-alignment-data.js';
import {deepeningCharts} from './deepening-charts.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const lessonDeepening={};
for(const line of [languageMathDeepening,scienceDeepening,socialLifeDeepening].join('\n').split('\n')){
 const cells=line.split('|');
 if(cells.length!==7||cells.some(c=>!c.trim()))throw new Error('Incomplete deepening row: '+cells[0]);
 const [id,leftLabel,left,rightLabel,right,prompt,answer]=cells;
 if(lessonDeepening[id])throw new Error('Duplicate deepening: '+id);
 lessonDeepening[id]={leftLabel,left,rightLabel,right,prompt,answer};
}
export function renderOfficialAlignment(u){
 const a=officialAlignment[u.id],s=officialSources[a.sourceId];
 return `<section class="official-curriculum" aria-label="本課課綱依據"><h4>📖 課綱定位與學習證據</h4><p>下列是本課相關的學習內容與表現；代碼已核對官方文件。頁碼是 PDF 檔案頁次，可能與紙本頁碼不同。</p><ul class="curriculum-codes">${a.refs.map(r=>`<li><a href="${esc(s.url)}#page=${r.page}" target="_blank" rel="noopener">${r.kind} ${esc(r.code)} <small>PDF 第 ${r.page} 頁</small></a></li>`).join('')}</ul><p class="subtle">來源：${esc(s.label)}。本站整理的教學對應不代表官方認證；單一課程也未必涵蓋該指標全部要求。</p>${a.scope?`<p class="scope-note"><strong>學習範圍：</strong>${esc(a.scope)}</p>`:''}<p><strong>本課可留下的證據：</strong>${esc(u.task)}</p></section>`;
}
export const chartData = deepeningCharts;
function renderQuantitativeChart(id){
 const c=chartData[id];if(!c)return '';
 if(c.kind==='process')return `<figure class="knowledge-process-chart"><figcaption>${esc(c.caption)}</figcaption><ol class="knowledge-process-steps">${c.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol><p><strong>核對：</strong>${esc(c.note)}</p></figure>`;
 const max=Math.max(...c.rows.map(r=>r[1]));
 return `<figure class="knowledge-bar-chart"><figcaption>${esc(c.caption)}</figcaption><p class="subtle">量尺：${esc(c.unit)}</p><ul>${c.rows.map(([label,value])=>`<li><span>${esc(label)}</span><span class="knowledge-bar-track" aria-hidden="true"><span style="width:${value/max*100}%"></span></span><strong>${value}</strong></li>`).join('')}</ul><p>${esc(c.note)}</p></figure>`;
}
export function renderLessonDeepening(u){
 const d=lessonDeepening[u.id];
 return `<section class="lesson-deepening" aria-label="${esc(u.title)}的概念比較與遷移練習"><h3>🔬 深入理解：${esc(u.title)}</h3>${renderOfficialAlignment(u)}<figure class="concept-contrast"><figcaption>🔍 並排比較：辨認兩個容易混淆的重點</figcaption><div class="contrast-panels"><section><h4>① ${esc(d.leftLabel)}</h4><p>${esc(d.left)}</p></section><section><h4>② ${esc(d.rightLabel)}</h4><p>${esc(d.right)}</p></section></div></figure>${renderQuantitativeChart(u.id)}<section class="transfer-practice"><h4>✍️ 換個情境，自己推理</h4><p>${esc(d.prompt)}</p><p class="subtle">先寫答案、適用條件與理由，再展開解析。本題為本站原創練習。</p><details><summary>核對答案與修正方向</summary><p>${esc(d.answer)}</p><div class="table-wrap"><table class="teaching-table"><caption>如何判斷自己真的理解</caption><thead><tr><th scope="col">檢查</th><th scope="col">修正行動</th></tr></thead><tbody><tr><th scope="row">概念用對了嗎？</th><td>在答案中標出「${esc(d.leftLabel)}」與「${esc(d.rightLabel)}」各自適用的地方。</td></tr><tr><th scope="row">理由與條件完整嗎？</th><td>對照解析，補上遺漏的數據、語境、證據或限制。</td></tr><tr><th scope="row">換題仍會嗎？</th><td>改動一項條件，先預測結果，再用本課方法檢查。</td></tr></tbody></table></div></details></section></section>`;
}
