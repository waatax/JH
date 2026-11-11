// scripts/check-expansion.mjs
// Rigorous verification of unit content expansion across all 188 units
// Enforces dual benchmarks:
// 1. Historical baseline (c54dc06: 118,267 characters)
// 2. Pre-optimization baseline (575,580 characters): Every unit MUST achieve >= 30% practical learning growth!

import assert from 'node:assert/strict';
import fs from 'node:fs';
import { units } from '../dist/curriculum.js';
import { teachingFor } from '../dist/teaching.js';
import { workedCases, renderWorkedCase } from '../dist/worked-cases.js';
import { examTypesData, renderExamTypeAndExample } from '../dist/exam-types-data.js';

const baseline = JSON.parse(fs.readFileSync('docs/expansion-baseline.json', 'utf8'));
const preOptBaselinePath = 'docs/expansion-pre-opt-baseline.json';
const preOptBaseline = fs.existsSync(preOptBaselinePath)
  ? JSON.parse(fs.readFileSync(preOptBaselinePath, 'utf8'))
  : null;

const count = text => [...text.replace(/\s/g, '')].length;

assert.equal(Object.keys(workedCases).length, units.length, 'Each unit needs exactly one original example');
assert.equal(Object.keys(examTypesData).length, units.length, 'Each unit needs high-frequency exam types and 5-step scaffolding practice');

const beforeById = Object.fromEntries(baseline.units.map(u => [u.id, u]));
const preOptBeforeById = preOptBaseline ? Object.fromEntries(preOptBaseline.units.map(u => [u.id, u])) : {};
const originalTeaching = new Set(), newTeaching = new Set();

const rows = units.map(u => {
  const c = workedCases[u.id], before = beforeById[u.id];
  assert(c && before, `Missing example or baseline: ${u.id}`);
  assert(c.teaching.length >= 50, `Teaching too short: ${u.id}`);
  assert(c.problem.length >= 20, `Missing meaningful problem: ${u.id}`);
  assert(c.steps.length >= 3, `Missing reasoning steps: ${u.id}`);
  assert(c.steps.every(s => s.length >= 12), `Empty reasoning step: ${u.id}`);
  assert(c.check.length >= 20, `Missing scope check: ${u.id}`);

  const et = examTypesData[u.id];
  assert(et, `Missing exam types data for ${u.id}`);
  assert(et.zeroToTopLadder && et.zeroToTopLadder.zeroFoundation && et.zeroToTopLadder.mainstreamBtoA && et.zeroToTopLadder.topTierAPlusPlus, `Missing zeroToTopLadder for ${u.id}`);
  assert(et.examType && et.examType.typeName && et.examType.strategy, `Missing examType spec: ${u.id}`);
  assert(Array.isArray(et.questionTypeList) && et.questionTypeList.length === 3, `Missing 3-archetype questionTypeList: ${u.id}`);
  assert(et.knowledgeSufficiencyPatch && Array.isArray(et.knowledgeSufficiencyPatch.patchPoints) && et.knowledgeSufficiencyPatch.patchPoints.length === 3, `Missing 3-point knowledgeSufficiencyPatch: ${u.id}`);
  assert(et.workedExample && et.workedExample.stem && et.workedExample.options.length === 4, `Missing workedExample 4-options: ${u.id}`);
  assert(Number.isInteger(et.workedExample.answer) && et.workedExample.answer >= 0 && et.workedExample.answer < 4, `Invalid answer index: ${u.id}`);
  assert(et.workedExample.steps && et.workedExample.steps.length === 5, `Missing 5-step scaffolding solution: ${u.id}`);
  assert(et.workedExample.steps.every(s => s.length >= 20), `5-step solution step too brief: ${u.id}`);
  assert(et.followUpPractice && et.followUpPractice.stem && et.followUpPractice.options.length === 4, `Missing followUpPractice 4-options: ${u.id}`);
  assert(et.followUpPractice.steps && et.followUpPractice.steps.length === 5, `Missing followUpPractice 5-step solution: ${u.id}`);

  const existing = [u.concept, u.example, u.pitfall, u.task, ...teachingFor(u).rows.flat(), ...u.questions.flatMap(q => [q.prompt, ...q.options, q.explanation, q.hint])];
  const additions = [
    c.teaching, c.problem, ...c.steps, c.check,
    et.zeroToTopLadder.zeroFoundation, et.zeroToTopLadder.mainstreamBtoA, et.zeroToTopLadder.topTierAPlusPlus,
    et.examType.typeName, et.examType.frequency, et.examType.targetCodes, et.examType.clues, et.examType.strategy, et.examType.publishersFocus, et.examType.knowledgeAudit,
    ...(et.examType.knowledgeAuditDetail ? [et.examType.knowledgeAuditDetail] : []),
    ...(et.examType.publishersBreakdown ? [et.examType.publishersBreakdown] : []),
    ...(et.examType.examCluesRadar ? [et.examType.examCluesRadar] : []),
    ...(et.examType.scoringCriteria ? [et.examType.scoringCriteria] : []),
    ...et.questionTypeList.flatMap(qt => [qt.archetypeName, qt.capRef, qt.questionPattern, qt.requiredKnowledge, qt.solvingSOP]),
    et.knowledgeSufficiencyPatch.auditConclusion,
    ...et.knowledgeSufficiencyPatch.patchPoints.flatMap(pt => [pt.tag, pt.title, pt.content]),
    et.workedExample.title, et.workedExample.stem, ...et.workedExample.options, ...et.workedExample.steps,
    et.followUpPractice.title, et.followUpPractice.stem, ...et.followUpPractice.options, ...et.followUpPractice.steps
  ];
  existing.forEach(t => originalTeaching.add(t));
  additions.forEach(t => newTeaching.add(t));

  const current = count([...existing, ...additions].join('')), added = current - before.chars;

  // 1. Rigorous check against historical baseline (c54dc06)
  assert(current >= before.chars * 1.30, `${u.id}: less than 30% growth from historical baseline (got ${((current - before.chars) / before.chars * 100).toFixed(1)}%)`);

  // 2. Rigorous check against pre-optimization baseline: EVERY unit MUST achieve >= 30% growth!
  let preOptGrowthPercent = 0;
  if (preOptBeforeById[u.id]) {
    const preOptBefore = preOptBeforeById[u.id].chars;
    preOptGrowthPercent = Number(((current - preOptBefore) / preOptBefore * 100).toFixed(2));
    assert(current >= preOptBefore * 1.30, `${u.id}: less than 30% growth from pre-opt baseline (got ${preOptGrowthPercent}%, required >= 30%)`);
  }

  assert(renderWorkedCase(u).includes('case-solution'), `Example not rendered: ${u.id}`);
  assert(renderExamTypeAndExample(u).includes('exam-type-matrix-card') && renderExamTypeAndExample(u).includes('practice-opt-btn'), `Exam type not rendered: ${u.id}`);

  return {
    id: u.id,
    title: u.title,
    historicalBefore: before.chars,
    preOptBefore: preOptBeforeById[u.id]?.chars || before.chars,
    after: current,
    added,
    growthPercent: Number((added / before.chars * 100).toFixed(2)),
    historicalGrowthPercent: Number((added / before.chars * 100).toFixed(2)),
    preOptGrowthPercent
  };
});

assert.equal(new Set(units.map(u => workedCases[u.id].problem)).size, units.length, 'Do not repeat example prompts across units');
assert.equal(new Set(units.map(u => examTypesData[u.id].workedExample.stem)).size, units.length, 'Do not repeat exam practice stems across units');
assert.equal(new Set(units.map(u => examTypesData[u.id].followUpPractice.stem)).size, units.length, 'Do not repeat follow-up practice stems across units');

const after = rows.reduce((n, u) => n + u.after, 0);
const added = after - baseline.total;
const uniqueNewCharacters = [...newTeaching].filter(s => !originalTeaching.has(s)).reduce((n, s) => n + count(s), 0);

const preOptTotal = preOptBaseline ? preOptBaseline.total : baseline.total;
const preOptAdded = after - preOptTotal;
const preOptGrowthPercent = Number((preOptAdded / preOptTotal * 100).toFixed(2));
const preOptMinUnitGrowth = Math.min(...rows.map(u => u.preOptGrowthPercent));

const report = {
  baselineCommit: baseline.commit,
  method: baseline.method,
  historicalBaselineCharacters: baseline.total,
  preOptBaselineCharacters: preOptTotal,
  afterCharacters: after,
  addedCharacters: added,
  preOptAddedCharacters: preOptAdded,
  historicalGrowthPercent: Number((added / baseline.total * 100).toFixed(2)),
  preOptGrowthPercent,
  minimumUnitGrowthPercent: Math.min(...rows.map(u => u.historicalGrowthPercent)),
  preOptMinimumUnitGrowthPercent: preOptMinUnitGrowth,
  growthPercent: Number((added / baseline.total * 100).toFixed(2)), // For backward test compatibility
  unitsWithAddedTeaching: rows.length,
  newWorkedExamples: rows.length * 2,
  newReasoningSteps: units.reduce((n, u) => n + workedCases[u.id].steps.length + examTypesData[u.id].workedExample.steps.length + examTypesData[u.id].followUpPractice.steps.length, 0),
  uniqueNewCharacters,
  units: rows
};

fs.writeFileSync('docs/expansion-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, units: undefined }, null, 2));
