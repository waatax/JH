import fs from 'node:fs';
import {units} from '../dist/curriculum.js';
import {knowledgePoints,teachingFor} from '../dist/teaching.js';
import {supplements} from '../dist/supplements.js';
import {reviewedQuestions} from '../dist/cap-reviewed.js';
const data=JSON.parse(fs.readFileSync('dist/alignment-data.json','utf8'));
data.books=data.books.filter(b=>b.publisher==='康軒');
const school=JSON.parse(fs.readFileSync('tmp/research/school-plans/index.json','utf8'));
const subjectRules=[['國文','chinese'],['英語','english'],['數學','math'],['地球科學','earth'],['理化','physics'],['自然科學','biology'],['公民','civics'],['歷史','history'],['地理','geography'],['視覺','visual'],['音樂','music'],['表演','performing'],['家政','home'],['童軍','scout'],['輔導','guidance'],['健康教育','health'],['體育)','pe'],['生活科技','technology'],['資訊科技','computing']];
for(const [i,b] of school.entries()){
 const subject=subjectRules.find(([needle])=>b.label.includes(needle))?.[1];
 const gradeToken=b.label.match(/([789七八九二三])年級/)?.[1];
 const grade=({'七':7,'八':8,'九':9,'二':8,'三':9})[gradeToken]||Number(gradeToken);
 if(!subject||![7,8,9].includes(grade))continue;
 const text=fs.readFileSync(b.textFile,'utf8');
 const architecture=text.match(/五[、．.][\s]*課程架構[：:]?([\s\S]*?)六[、．.]/)?.[1];
 const chapters=architecture?architecture.split('\n').map(s=>s.trim()).filter(s=>s&&!/^\d+$|^\[PAGE/.test(s)).map((lesson,j)=>({id:`school-${i}-${j}`,chapter:'課程架構摘錄',lesson,codes:[],status:'pending',unitIds:[]})):[];
 data.books.push({id:`school-${i}`,publisher:b.publisher,schoolYear:b.schoolYear,grade,term:b.term,subject,title:b.label,sourceUrl:b.url,sourcePage:b.sourcePage,sourceKind:'學校公開計畫（可能依校情調整；非出版社完整目錄）',chapters});
}
// Curated thematic relationships, not automated claims of coverage.
const mathRules=[['負數|數線|正負|整數的加|整數的乘','math-1'],['質因數|最大公因數|最小公倍數|倍數與因數','math-2'],['科學記號|分數|指數','math-3'],['一元一次方程|式子的運算','math-4'],['二元一次|聯立','math-5'],['正比|反比|比與比例|比例式','math-6'],['不等式','math-7'],['坐標|平面上的點','math-8'],['多項式|乘法公式','math-9'],['平方根|根式|畢氏','math-10'],['因式分解','math-11'],['一元二次方程','math-12'],['數列|等差|等比|一次函數','math-13'],['全等|三角形的基本|三角形的邊角','math-14'],['平行線|尺規|垂直|線對稱','math-15'],['相似|連比','math-16'],['圓|切線','math-17'],['二次函數','math-18'],['機率|統計','math-19'],['三心|外心|內心|重心','math-20'],['級數','math-22'],['多邊形','math-23'],['四邊形','math-24'],['空間|立體|柱體|錐體|三視圖','math-26'],['四分位|盒狀|累積','math-27']];
for(const b of data.books){
 b.subjectIds=b.subject==='physics'&&b.grade===8?['physics','chemistry']:[b.subject];
 if(b.subject==='math')for(const c of b.chapters)c.unitIds=[...new Set(mathRules.filter(([pattern])=>new RegExp(pattern).test(c.chapter+' '+c.lesson)).map(([,id])=>id))];
}
data.knowledge=units.flatMap(u=>[
 ...knowledgePoints(u).map((text,i)=>({id:`${u.id}:concept:${i+1}`,unitId:u.id,kind:'concept',text})),
 ...teachingFor(u).rows.map((r,i)=>({id:`${u.id}:table:${i+1}`,unitId:u.id,kind:'comparison',text:r.join('；')})),
 ...(supplements[u.id]?.points||[]).map((text,i)=>({id:`${u.id}:supplement:${i+1}`,unitId:u.id,kind:'supplement',text}))
]);
const reviewed=Object.fromEntries(reviewedQuestions.map(q=>[q.id,q]));
data.questions=data.questions.map(q=>({...q,...reviewed[q.id]}));
data.summary={books:data.books.length,chapterEntries:data.books.reduce((n,b)=>n+b.chapters.length,0),knowledgeEntries:data.knowledge.length,indexedQuestions:data.questions.length,reviewed:reviewedQuestions.length,covered:reviewedQuestions.filter(q=>q.status==='covered').length,partial:reviewedQuestions.filter(q=>q.status==='partial').length,pending:data.questions.filter(q=>q.status==='pending').length};
fs.writeFileSync('dist/alignment-data.json',JSON.stringify(data,null,2));
fs.writeFileSync('docs/coverage-audit.json',JSON.stringify({checkedAt:data.checkedAt,...data.summary,limitations:['現有教學条目不是完整課綱分母。','康軒全領域計畫已建章節索引，非逐點覆蓋驗證。','翰林、南一僅部分学校公開計畫，不是全部版本六冊。','目前只完成115年數學27題內容初核，仍有部分涵蓋項。','109與110年須另核現行課綱適用性。','聽力ZIP已下載，逐題對照未納入。','本土語文各語別與臺灣手語尚缺完整教材。']},null,2));
console.log(data.summary);
