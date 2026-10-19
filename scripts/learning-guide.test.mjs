import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units, subjects} from '../dist/curriculum.js';
import {renderLearningGuide, learningGuideFor} from '../dist/learning-guide.js';
import {subjectStrategies} from '../dist/subject-strategies.js';
import {lessonAlignment} from '../dist/lesson-alignment.js';
import {renderUnitStageTables,renderThinkingFlowChart,renderConceptQuickCheck} from '../dist/pedagogy-visuals.js';
import {exegesisData} from '../dist/exegesis-data.js';
const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

test('round 1: all lessons and subjects have usable learning objectives',()=>{
 for(const s of subjects) assert.equal(subjectStrategies[s.id].length,2,s.id);
 for(const u of units){const g=learningGuideFor(u);assert(g.points.length);assert.equal(g.evidence.length,3);assert(g.source.url.startsWith('https://'));}
});
test('round 2: knowledge diagrams retain the actual concept, limits and task',()=>{
 for(const u of units){const html=renderLearningGuide(u);assert(html.includes('概念到應用的關係圖'));assert(html.includes(escape(u.pitfall)));assert(html.includes(escape(u.task)));assert(html.includes('學習成果檢核表'));}
});
test('round 3: recall answers and explanations match original question records',()=>{
 for(const u of units){const html=renderLearningGuide(u);for(const q of u.questions){assert(q.answer>=0&&q.answer<q.options.length);assert(html.includes(`答案：${String.fromCharCode(65+q.answer)}．${escape(q.options[q.answer])}`));assert(html.includes(escape(q.explanation)));}assert.equal((html.match(/展開答案與修正依據/g)||[]).length,u.questions.length);}
});
test('round 4: remediation references a worked example for every lesson',()=>{
 for(const u of units){const g=learningGuideFor(u);assert(g.worked.teaching.length>40);assert(g.worked.check.length>15);assert(renderLearningGuide(u).includes('隔天不看答案'));const html=renderUnitStageTables(u);assert(!html.includes('undefined'),u.id);assert(html.includes(escape(g.worked.problem)),u.id);}
});
test('round 5: accessible structure, escaping and mobile styles',()=>{
 const probe={...units[0],title:'<img src=x onerror=alert(1)>',task:'<script>bad()</script>'};
 const html=renderLearningGuide(probe);assert(!html.includes('<img'));assert(!html.includes('<script>'));assert(html.includes('&lt;img'));assert(html.includes('scope="col"'));assert(html.includes('role="listitem"'));
 const css=fs.readFileSync('dist/style.css','utf8');assert(css.includes('.guide-map{grid-template-columns:1fr}'));assert(css.includes('summary:focus-visible'));
});
test('round 6: normal lessons and studio both integrate the guide',()=>{
 const app=fs.readFileSync('dist/app.js','utf8');assert.equal((app.match(/\$\{renderLearningGuide\(u\)\}/g)||[]).length,2);
 for(const u of units){const html=renderLearningGuide(u);assert(html.includes('不是官方逐條指標認證'));assert(Array.isArray(lessonAlignment[u.id]));assert(html.includes(lessonAlignment[u.id].length?'本課對應待審':'尚無已建檔的逐章對照'));}
});
test('round 7: offline update includes both new modules and a new cache version',()=>{
 const sw=fs.readFileSync('dist/sw.js','utf8');assert(sw.includes('zhixing-cache-v15'));
 for(const file of ['learning-guide.js','subject-strategies.js','lesson-alignment.js','knowledge-practice.js','subject-challenges.js']){assert(sw.includes(`'./${file}'`));assert(fs.existsSync(`dist/${file}`));}
});
test('all lesson boards and quick checks use real authored fields and answers',()=>{
 for(const u of units){
  assert(!JSON.stringify(exegesisData[u.id]).includes('undefined'),u.id);
  assert(!renderThinkingFlowChart(u).includes('undefined'),u.id);
  const html=renderConceptQuickCheck(u),q=u.questions[0];
  assert(html.includes(escape(q.prompt)),u.id);
  assert.equal((html.match(/data-qc-result="correct"/g)||[]).length,1,u.id);
  for(const option of q.options)assert(html.includes(escape(option)),u.id);
 }
});
