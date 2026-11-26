import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { units } from '../dist/curriculum.js';
import { workedCases } from '../dist/worked-cases.js';
import { examTypesData } from '../dist/exam-types-data.js';
import { unitWonderData } from '../dist/joyful-learning.js';
import { lessonDeepening } from '../dist/lesson-deepening.js';
import { officialAlignment, officialSources } from '../dist/official-alignment-data.js';
import { renderWorkshop, schoolExamples, workshops } from '../dist/lesson-workshop.js';
import { workshopSources } from '../dist/workshop-sources.js';

const read = name => JSON.parse(fs.readFileSync(name, 'utf8'));
const baseline = read('docs/workshop-text-baseline.json');
const bank = new Map(read('dist/cap-bank.json').questions.map(q => [q.id,q]));
const count = strings => [...strings.join('').replace(/\s/g,'')].length;
const prompts = new Set();
const percent = (added, before) => Number((100 * added / before).toFixed(2));

const rows = units.map(unit => {
  const id = unit.id, w = workshops[id], e = examTypesData[id], wonder = unitWonderData[id];
  const sources = workshopSources[id], outline = officialAlignment[id];
  // Fixed families present at commit 7473e77. Count a prompt once on both lesson surfaces.
  const before = unit.questions.length + e.questionTypeList.filter(t=>t.archetypeDrill).length
    + [e.workedExample, e.followUpPractice, workedCases[id].problem, lessonDeepening[id].prompt,
       wonder.curiosityQ].filter(Boolean).length + wonder.kpBlitz.length;
  const allTasks = [...w.tasks,w.check];
  for (const t of allTasks) {
    assert(t.prompt.trim() && !prompts.has(t.prompt), id + ' missing or duplicate prompt');
    prompts.add(t.prompt);
    assert(t.steps.length >= 2 && t.steps.every(s => s.trim().length >= 5), id + ' incomplete reasoning');
  }
  const chars = count([w.type,w.teaching,...allTasks.flatMap(t=>[t.prompt,...t.steps]),w.check.answer]);
  return {
    id, title:unit.title, type:w.type, priorActivities:before, newActivities:allTasks.length,
    activityGrowthPercent:percent(allTasks.length,before), priorTextCharacters:baseline.charactersByUnit[id],
    newWorkshopCharacters:chars, textAdditionPercent:percent(chars,baseline.charactersByUnit[id]),
    newSolutionSteps:allTasks.reduce((sum,t)=>sum+t.steps.length,0),
    outline: outline.refs.map(r=>r.code), exam:sources.exams.map(q=>q.id),
    school: schoolExamples[id]?.slice(0,2) || null,
    textbookPlans:sources.plans.map(p=>({publisher:p.publisher,match:p.school?'school-plan-keyword':p.direct?'chapter':'shared-code'}))
  };
});
const total = key => rows.reduce((sum,r)=>sum+r[key],0);
const baselineCharacters = total('priorTextCharacters');
const newCharacters = total('newWorkshopCharacters');
const report = {
  baselineCommit:baseline.commit,
  definitions:{
    activities:'同一單元的兩道基礎題、三道題型演練、例題及變化題、案例、遷移題、好奇提問與三道快問快答，各計一次。跨頁重現、翻卡、介面操作、外連真題不計。',
    text:'舊字數採該提交既有 expansion-report 的 after；新字數只計本站本次撰寫的章末題型名稱、教學、題幹、判斷正解與解析，排除引文、連結及介面。此欄為新增字量相對舊教材的比率。',
    evidence:'會考逐題對照限列出的題號。校卷列考卷代號與題號。教材對照分既有章節對應與共用學習內容代碼，後者只作查找線索。'
  },
  summary:{
    units:rows.length, priorActivities:total('priorActivities'), newActivities:total('newActivities'),
    minimumActivityGrowthPercent: Math.min(...rows.map(r=>r.activityGrowthPercent)),
    priorTextCharacters:baselineCharacters, newWorkshopCharacters:newCharacters,
    textAdditionPercent:percent(newCharacters,baselineCharacters), newSolutionSteps:total('newSolutionSteps'),
    capMappedUnits:rows.filter(r=>r.exam.length).length, schoolMappedUnits:rows.filter(r=>r.school).length,
    schoolPapers:new Set(rows.flatMap(r=>r.school?[r.school[0]]:[])).size,
    examOrSchoolMappedUnits:rows.filter(r=>r.exam.length || r.school).length,
    planMappedUnits:rows.filter(r=>r.textbookPlans.length).length,
    unitsByPublisher:Object.fromEntries(['康軒','翰林','南一'].map(p=>[p,rows.filter(r=>r.textbookPlans.some(t=>t.publisher===p)).length]))
  },
  units:rows
};
const reportPath='docs/workshop-audit.json';
if (process.argv.includes('--write-report')) fs.writeFileSync(reportPath, JSON.stringify(report,null,2)+'\n');

test('Each teaching unit gains at least 30% more practical activities and has an auditable baseline', () => {
  assert.deepEqual(Object.keys(workshops).sort(), units.map(u=>u.id).sort());
  assert.deepEqual(Object.keys(baseline.charactersByUnit).sort(), units.map(u=>u.id).sort());
  assert.deepEqual(report,read(reportPath));
  for (const r of rows) {
    assert.equal(r.priorActivities,13,r.id);
    assert.equal(r.newActivities,4,r.id);
    assert(r.activityGrowthPercent>=30,r.id);
    assert(r.priorTextCharacters>0 && r.newWorkshopCharacters>90,r.id);
  }
});
test('Every cited CAP question, school reference, publisher link and outline page is addressable', () => {
  for (const {id} of units) {
    const html=renderWorkshop(id), alt=renderWorkshop(id,'../');
    assert.equal((html.match(/<form /g)||[]).length,4,id);
    assert.equal((alt.match(/class="workshop-feedback" hidden/g)||[]).length,4,id);
    assert(!html.includes('undefined'),id);
    const outline=officialAlignment[id], doc=officialSources[outline.sourceId];
    for (const ref of outline.refs) assert(ref.page>0 && ref.page<=doc.pages,id);
    for (const q of workshopSources[id].exams) {
      const original=bank.get(q.id);
      assert.equal(q.objective,original.officialObjective);
      assert.equal(q.page,original.page);
      const path='downloads/cap/'+q.year+'-'+q.subject+'.pdf';
      assert(fs.existsSync('dist/'+path) && alt.includes('../'+path+'#page='+q.page),q.id);
    }
    for (const p of workshopSources[id].plans) {
      assert(p.url.startsWith('https://') && (p.direct || p.codes.length || (p.school && p.page>0)),id);
    }
    if (schoolExamples[id]) assert(html.includes('target="_blank"') && html.includes(schoolExamples[id][2]),id);
  }
});
