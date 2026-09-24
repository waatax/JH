// Uses local Chromium to preserve Chinese typography, mathematical symbols and original SVGs.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {units,subjectById} from '../dist/curriculum.js';
import {renderTeaching} from '../dist/teaching.js';
import {renderWorkedCase} from '../dist/worked-cases.js';
import {renderSupplement} from '../dist/supplements.js';
import {getDiagram} from '../dist/diagrams.js';
const require=createRequire(import.meta.url);
const runtime=process.env.CODEX_NODE_MODULES;
const {chromium}=runtime?require(path.join(runtime,'playwright')):require('playwright');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
fs.mkdirSync('dist/downloads/handouts',{recursive:true});
fs.mkdirSync('tmp/pdfs',{recursive:true});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const css=`@page{size:A4;margin:16mm 16mm 18mm}*{box-sizing:border-box}body{font:11px/1.7 'Microsoft JhengHei','Noto Sans CJK TC',sans-serif;color:#233e38;margin:0}h1{font-size:25px;line-height:1.35;margin:8px 0 15px}h2{font-size:17px;border-bottom:2px solid #adc5b3;padding-bottom:6px;margin:22px 0 10px}h3{font-size:14px;margin:14px 0 8px}p{margin:8px 0}table{width:100%;border-collapse:collapse;table-layout:fixed;margin:10px 0;font-size:10.5px}th,td{border:1px solid #c9d6ce;padding:7px;vertical-align:top;overflow-wrap:anywhere}th{background:#edf3eb;text-align:left}caption{text-align:left;font-weight:bold;margin:5px 0}tr,svg,li{break-inside:avoid}thead{display:table-header-group}h2,h3,caption{break-after:avoid}.eyebrow{color:#587464;letter-spacing:1px;font-size:10px}.meta,.subtle{font-size:10px;color:#60756b}.notice{background:#f0f4ed;padding:10px;border-left:3px solid #678b73}svg{max-width:100%;height:auto;max-height:230px;display:block;margin:12px auto}.diagram-container,.concept-diagram{max-width:100%;break-inside:avoid}.case-solution{display:block}details>summary{font-weight:bold}details{margin:10px 0}ul,ol{padding-left:22px}a{color:#255b43;text-decoration:none}.answer{font-size:10px;color:#456050}.practice{break-before:page}.question{break-inside:avoid;border-bottom:1px solid #cedad2;padding:10px 0}.space{height:35px;border-bottom:1px dotted #ccd5ce}.footer-note{margin-top:20px;font-size:9px;color:#738477}.worked-case{padding:0}.step-label{display:none}`;
const manifest=[];
try{
 const page=await browser.newPage();
 for(const u of units){
  const body=`<div class="eyebrow">知行學院 / 國中複習講義</div><h1>${esc(u.title)}</h1><p class="meta">${esc(subjectById[u.subject].name)} · 國${{7:'一',8:'二',9:'三'}[u.grade]}${u.term===1?'上':'下'}建議進度 · ${u.id} · 2026-09-24</p><p class="notice">本站原創主題講義。年級學期為建議順序；各版本對照與完整課綱覆蓋仍須逐點核對。</p><h2>01 理解與比較</h2><p>${esc(u.concept)}</p>${getDiagram(u)||''}${renderTeaching(u)}${renderSupplement(u)}<h2>02 例題與推理</h2><p><b>示範：</b>${esc(u.example)}</p><p class="notice"><b>易錯提醒：</b>${esc(u.pitfall)}</p>${renderWorkedCase(u)}<section class="practice"><h2>03 遮住答案，自己試一次</h2><p>${esc(u.task)}</p><div class="space"></div>${u.questions.map((q,i)=>`<div class="question"><h3>${i+1}. ${esc(q.prompt)}</h3>${q.options.map((v,j)=>`<p>${'ABCD'[j]}. ${esc(v)}</p>`).join('')}<div class="space"></div></div>`).join('')}<h2>04 答案與回想檢核</h2>${u.questions.map((q,i)=>`<p class="answer"><b>${i+1}. ${'ABCD'[q.answer]}</b> ${esc(q.explanation)}</p>`).join('')}<p>□ 我能說明概念適用的條件　□ 我能完整解釋推理　□ 我能辨識常見錯誤</p><p class="footer-note">課綱參照：國家教育研究院 https://www.naer.edu.tw/PageSyllabus?fid=52<br>官方歷屆試題：https://cap.rcpet.edu.tw/examination.html<br>兩題驗收僅供初步檢核，不代表已涵蓋全部教材或已達精熟。實作課程請搭配教師與同儕回饋。</p></section>`;
  await page.setContent(`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><title>${esc(u.title)}</title><style>${css}</style></head><body>${body}</body></html>`);
  await page.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true)});
  const file=`downloads/handouts/${u.id}.pdf`;
  await page.pdf({path:'dist/'+file,format:'A4',printBackground:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font-size:8px;color:#65796e;width:100%;text-align:center">知行學院 · <span class="pageNumber"></span> / <span class="totalPages"></span></div>'});
  manifest.push({unitId:u.id,title:u.title,grade:u.grade,term:u.term,subject:u.subject,path:file,bytes:fs.statSync('dist/'+file).size});
  if(['math-9','english-16','biology-1'].includes(u.id))await page.screenshot({path:`tmp/pdfs/${u.id}-html.png`,fullPage:true});
 }
 fs.writeFileSync('dist/handouts-manifest.json',JSON.stringify({generatedAt:'2026-09-24',files:manifest},null,2));
 console.log(`Built ${manifest.length} handouts`);
}finally{await browser.close()}
