import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units} from '../dist/curriculum.js';
import {lessonDeepening,renderLessonDeepening,chartData} from '../dist/lesson-deepening.js';
import {officialAlignment,officialSources} from '../dist/official-alignment-data.js';
import {renderSupplement} from '../dist/supplements.js';
import {renderMisconceptionDefenseTable} from '../dist/pedagogy-visuals.js';
for(const [group,subjects,count] of [['language/math',['math','chinese','english'],59],['science',['biology','physics','chemistry','earth'],55],['social/life',null,74]]){
 test(`${group}: every lesson has its own contrast, new prompt and explained answer`,()=>{
  const selected=units.filter(u=>subjects?subjects.includes(u.subject):!['math','chinese','english','biology','physics','chemistry','earth'].includes(u.subject));
  assert.equal(selected.length,count);
  const prompts=new Set();
  for(const u of selected){const d=lessonDeepening[u.id];assert(d,u.id);assert.notEqual(d.leftLabel,d.rightLabel);assert.notEqual(d.left,d.right);assert(d.answer.length>10,u.id);assert(!u.questions.some(q=>q.prompt===d.prompt),u.id);prompts.add(d.prompt);assert(!renderLessonDeepening(u).includes('undefined'));}
  assert.equal(prompts.size,count);
 });
}
test('numerical transfer answers retain correct values, units and limiting conditions',()=>{
 for(const [id,terms] of Object.entries({'math-1':['5','9'],'math-9':['10404'],'math-18':['x=4','5'],'math-21':['8:12:15'],'math-26':['24','52'],'biology-1':['100','400'],'physics-3':['60°'],'chemistry-4':['10/(10+90)','10%'],'geography-1':['1.5 km'],'health-2':['16 g']}))for(const term of terms)assert(lessonDeepening[id].answer.includes(term),id+' '+term);
 assert(lessonDeepening['math-11'].answer.includes('漏解'));
 assert(lessonDeepening['biology-11'].answer.includes('不保證'));
 assert(lessonDeepening['chemistry-8'].answer.includes('速率'));
});
test('all 188 lessons have official content and performance links with physical PDF page numbers',()=>{
 assert.equal(Object.keys(officialAlignment).length,units.length);
 for(const u of units){const a=officialAlignment[u.id],s=officialSources[a.sourceId];assert(s.url.startsWith('https://'));assert(a.refs.some(r=>r.kind==='學習內容'));assert(a.refs.some(r=>r.kind==='學習表現'));for(const r of a.refs)assert(r.page>0&&r.page<=s.pages);}
 for(const id of ['physics-11','physics-14','chemistry-14','english-14','civics-12'])assert(officialAlignment[id].scope.includes('延伸'));
 assert(officialAlignment['local-1'].scope.includes('閩東語'));
});
test('all supplements render and true reminders are not marked as false propositions',()=>{
 for(const u of units){assert(!renderSupplement(u).includes('undefined'),u.id);const html=renderMisconceptionDefenseTable(u);assert(html.includes('易混淆處與正確提醒'));assert(!html.split('<tbody>')[1].split('</tr>')[0].includes('❌'));}
});
test('all 188 units have curriculum-aligned quantitative and comparative chart data',()=>{
 assert.equal(Object.keys(chartData).length, units.length);
 for(const u of units){
  const c=chartData[u.id];
  assert(c, 'Missing chart data for '+u.id);
  assert(c.caption&&c.caption.length>=4, u.id+' invalid caption');
  if(c.kind==='process'){
   assert(c.steps.length>=3,u.id+' requires reasoning steps');
   assert(c.steps.every(step=>typeof step==='string'&&step.length>0));
   assert(!c.rows,u.id+' qualitative concepts must not have artificial quantities');
   continue;
  }
  assert.equal(c.kind,'quantity');
  assert(c.unit&&c.unit.length>=1, u.id+' invalid unit');
  assert(Array.isArray(c.rows)&&c.rows.length>=2, u.id+' must have at least 2 rows');
  for(const [label,val] of c.rows){
   assert(typeof label==='string'&&label.length>0, u.id+' row label invalid');
   assert(Number.isFinite(val)&&val>=0, u.id+' bars require finite nonnegative values');
  }
  assert(c.note&&c.note.length>=10, u.id+' invalid note');
 }
});
test('contrast charts are labelled, responsive and included in the offline cache',()=>{
 const css=fs.readFileSync('dist/style.css','utf8'),sw=fs.readFileSync('dist/sw.js','utf8');
 assert(css.includes('.contrast-panels{grid-template-columns:1fr}'));
 for(const file of ['lesson-deepening.js','deepening-charts.js','deepening-language-math.js','deepening-science.js','deepening-social-life.js','official-alignment-data.js'])assert(sw.includes(`'./${file}'`));
 for(const u of units){
  const html=renderLessonDeepening(u);
  assert(html.includes('<figcaption>'));
  assert(html.includes('<summary>核對答案'));
  assert(html.includes('scope="row"'));
  assert(html.includes(chartData[u.id].kind==='quantity'?'class="knowledge-bar-chart"':'class="knowledge-process-chart"'), 'Must include appropriate chart for '+u.id);
 }
});
