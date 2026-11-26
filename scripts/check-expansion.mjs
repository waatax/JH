// scripts/check-expansion.mjs
// Rigorous verification of unit content expansion across all 188 units
// Enforces triple benchmarks:
// 1. Historical baseline (c54dc06: 118,267 characters): >= 30% growth
// 2. Pre-optimization baseline (575,580 characters): >= 30% growth
// 3. Pre-2026-11-26 optimization baseline (2,456,218 characters): EVERY unit MUST achieve >= 20.00% practical learning growth!

import assert from 'node:assert/strict';
import fs from 'node:fs';
import { units } from '../dist/curriculum.js';
import { teachingFor } from '../dist/teaching.js';
import { workedCases, renderWorkedCase } from '../dist/worked-cases.js';
import { examTypesData, renderExamTypeAndExample } from '../dist/exam-types-data.js';
import { unitWonderData } from '../dist/joyful-learning.js';
import { supplements, renderSupplement } from '../dist/supplements.js';

const baseline = JSON.parse(fs.readFileSync('docs/expansion-baseline.json', 'utf8'));
const preOptBaselinePath = 'docs/expansion-pre-opt-baseline.json';
const preOptBaseline = fs.existsSync(preOptBaselinePath)
  ? JSON.parse(fs.readFileSync(preOptBaselinePath, 'utf8'))
  : null;
const pre2026Path = 'docs/expansion-pre-2026-11-26-baseline.json';
const pre2026Baseline = fs.existsSync(pre2026Path)
  ? JSON.parse(fs.readFileSync(pre2026Path, 'utf8'))
  : null;

const count = text => [...text.replace(/\s/g, '')].length;

assert.equal(Object.keys(workedCases).length, units.length, 'Each unit needs exactly one original example');
assert.equal(Object.keys(examTypesData).length, units.length, 'Each unit needs high-frequency exam types and 5-step scaffolding practice');
assert.equal(Object.keys(supplements).length, units.length, 'Each unit needs authored deep supplement notes');

const beforeById = Object.fromEntries(baseline.units.map(u => [u.id, u]));
const preOptBeforeById = preOptBaseline ? Object.fromEntries(preOptBaseline.units.map(u => [u.id, u])) : {};
const pre2026BeforeById = pre2026Baseline ? Object.fromEntries(pre2026Baseline.units.map(u => [u.id, u])) : {};
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
  const supp = supplements[u.id];
  assert(et && supp, `Missing exam types or supplement data for ${u.id}`);
  assert(et.zeroToTopLadder && et.zeroToTopLadder.zeroFoundation && et.zeroToTopLadder.mainstreamBtoA && et.zeroToTopLadder.topTierAPlusPlus, `Missing zeroToTopLadder for ${u.id}`);
  assert(et.examType && et.examType.typeName && et.examType.strategy, `Missing examType spec: ${u.id}`);
  assert(Array.isArray(et.schoolExamArchetypes) && et.schoolExamArchetypes.length === 3, `Missing 3 schoolExamArchetypes: ${u.id}`);
  assert(Array.isArray(et.questionTypeList) && et.questionTypeList.length === 3, `Missing 3-archetype questionTypeList: ${u.id}`);
  assert(et.knowledgeSufficiencyPatch && Array.isArray(et.knowledgeSufficiencyPatch.patchPoints) && et.knowledgeSufficiencyPatch.patchPoints.length === 3, `Missing 3-point knowledgeSufficiencyPatch: ${u.id}`);
  assert(et.workedExample && et.workedExample.stem && et.workedExample.options.length === 4, `Missing workedExample 4-options: ${u.id}`);
  assert(Number.isInteger(et.workedExample.answer) && et.workedExample.answer >= 0 && et.workedExample.answer < 4, `Invalid answer index: ${u.id}`);
  assert(et.workedExample.steps && et.workedExample.steps.length === 5, `Missing 5-step scaffolding solution: ${u.id}`);
  assert(et.workedExample.steps.every(s => s.length >= 20), `5-step solution step too brief: ${u.id}`);
  assert(et.followUpPractice && et.followUpPractice.stem && et.followUpPractice.options.length === 4, `Missing followUpPractice 4-options: ${u.id}`);
  assert(et.followUpPractice.steps && et.followUpPractice.steps.length === 5, `Missing followUpPractice 5-step solution: ${u.id}`);
  assert(et.periodicExamPractice && et.periodicExamPractice.stem && et.periodicExamPractice.options.length === 4, `Missing periodicExamPractice 4-options: ${u.id}`);
  assert(et.periodicExamPractice.steps && et.periodicExamPractice.steps.length === 5, `Missing periodicExamPractice 5-step solution: ${u.id}`);

  const existing = [u.concept, u.example, u.pitfall, u.task, ...teachingFor(u).rows.flat(), ...u.questions.flatMap(q => [q.prompt, ...q.options, q.explanation, q.hint])];
  const additions = [
    c.teaching, c.problem, ...c.steps, c.check,
    supp.title, ...supp.points, ...supp.rows.flat(), supp.task, supp.answer,
    et.zeroToTopLadder.zeroFoundation, et.zeroToTopLadder.mainstreamBtoA, et.zeroToTopLadder.topTierAPlusPlus,
    et.examType.typeName, et.examType.frequency, et.examType.targetCodes, et.examType.clues, et.examType.strategy, et.examType.publishersFocus, et.examType.knowledgeAudit,
    ...(et.examType.knowledgeAuditDetail ? [et.examType.knowledgeAuditDetail] : []),
    ...(et.examType.publishersBreakdown ? [et.examType.publishersBreakdown] : []),
    ...(et.examType.examCluesRadar ? [et.examType.examCluesRadar] : []),
    ...(et.examType.scoringCriteria ? [et.examType.scoringCriteria] : []),
    ...et.schoolExamArchetypes.flatMap(sa => [sa.code, sa.examTiming, sa.title, sa.schoolContext, sa.requiredKnowledge, sa.sop]),
    ...et.questionTypeList.flatMap(qt => [
      qt.archetypeName, qt.capRef, qt.questionPattern, qt.requiredKnowledge, qt.solvingSOP,
      ...(qt.archetypeDrill ? [qt.archetypeDrill.stem, ...qt.archetypeDrill.options, qt.archetypeDrill.explanation] : [])
    ]),
    et.knowledgeSufficiencyPatch.auditConclusion,
    ...et.knowledgeSufficiencyPatch.patchPoints.flatMap(pt => [pt.tag, pt.title, pt.content]),
    et.workedExample.title, et.workedExample.stem, ...et.workedExample.options, ...et.workedExample.steps,
    et.followUpPractice.title, et.followUpPractice.stem, ...et.followUpPractice.options, ...et.followUpPractice.steps,
    et.periodicExamPractice.title, et.periodicExamPractice.badge || '', et.periodicExamPractice.stem, ...et.periodicExamPractice.options, ...et.periodicExamPractice.steps,
    ...(et.examPrepDigest ? [
      et.examPrepDigest.summaryHeader,
      ...et.examPrepDigest.evidenceLedger.flatMap(ev => [ev.source, ev.focus, ev.sufficiency]),
      ...et.examPrepDigest.oralCheckpoints.flatMap(oc => [oc.q, oc.a])
    ] : []),
    ...(et.constructedResponseLab ? [
      et.constructedResponseLab.title,
      et.constructedResponseLab.badge,
      et.constructedResponseLab.scenarioContext,
      ...et.constructedResponseLab.subQuestions,
      ...et.constructedResponseLab.rubric.flatMap(rb => [rb.level, rb.criteria]),
      et.constructedResponseLab.modelAnswer,
      ...et.constructedResponseLab.deductionDiagnostics
    ] : []),
    ...(unitWonderData[u.id] ? [
      unitWonderData[u.id].lifeConnection,
      unitWonderData[u.id].funFact,
      unitWonderData[u.id].mnemonic,
      unitWonderData[u.id].curiosityQ,
      unitWonderData[u.id].curiosityA,
      ...unitWonderData[u.id].kpFlipCards.flatMap(fc => [fc.frontPrompt, fc.backRule, fc.backExample, fc.backTip]),
      ...unitWonderData[u.id].kpBlitz.flatMap(bq => [bq.prompt, ...bq.options, bq.cheer])
    ] : [])
  ];
  existing.forEach(t => originalTeaching.add(t));
  additions.forEach(t => newTeaching.add(t));

  const current = count([...existing, ...additions].join('')), added = current - before.chars;

  // 1. Historical baseline (c54dc06)
  assert(current >= before.chars * 1.30, `${u.id}: less than 30% growth from historical baseline`);

  // 2. Pre-opt baseline
  let preOptGrowthPercent = 0;
  if (preOptBeforeById[u.id]) {
    const preOptBefore = preOptBeforeById[u.id].chars;
    preOptGrowthPercent = Number(((current - preOptBefore) / preOptBefore * 100).toFixed(2));
    assert(current >= preOptBefore * 1.30, `${u.id}: less than 30% growth from pre-opt baseline (got ${preOptGrowthPercent}%)`);
  }

  // 3. Pre-2026-11-26 optimization baseline: EVERY unit MUST achieve >= +20.00% practical content growth!
  let cycle2026GrowthPercent = 0;
  const pre2026Before = pre2026BeforeById[u.id]?.after || 0;
  if (pre2026Before > 0) {
    cycle2026GrowthPercent = Number(((current - pre2026Before) / pre2026Before * 100).toFixed(2));
    assert(current >= pre2026Before * 1.20, `${u.id}: less than 20% growth over 2026-11-26 baseline (got ${cycle2026GrowthPercent}%, before=${pre2026Before}, current=${current})`);
  }

  const examHtml = renderExamTypeAndExample(u);
  const suppHtml = renderSupplement(u);
  assert(renderWorkedCase(u).includes('case-solution'), `Example not rendered: ${u.id}`);
  assert(examHtml.includes('exam-type-matrix-card') && examHtml.includes('practice-opt-btn') && examHtml.includes(`exam-periodic-${u.id}`) && examHtml.includes('exam-roadmap-svg-card'), `Exam type or illustration not rendered: ${u.id}`);
  assert(suppHtml.includes('supp-visual-strip'), `Supplement visual strip not rendered: ${u.id}`);

  return {
    id: u.id,
    title: u.title,
    historicalBefore: before.chars,
    preOptBefore: preOptBeforeById[u.id]?.chars || before.chars,
    pre2026Before,
    after: current,
    added,
    growthPercent: Number((added / before.chars * 100).toFixed(2)),
    historicalGrowthPercent: Number((added / before.chars * 100).toFixed(2)),
    preOptGrowthPercent,
    cycle2026GrowthPercent
  };
});

assert.equal(new Set(units.map(u => workedCases[u.id].problem)).size, units.length, 'Do not repeat example prompts across units');
assert.equal(new Set(units.map(u => examTypesData[u.id].workedExample.stem)).size, units.length, 'Do not repeat exam practice stems across units');
assert.equal(new Set(units.map(u => examTypesData[u.id].followUpPractice.stem)).size, units.length, 'Do not repeat follow-up practice stems across units');
assert.equal(new Set(units.map(u => examTypesData[u.id].periodicExamPractice.stem)).size, units.length, 'Do not repeat periodic exam practice stems across units');

const after = rows.reduce((n, u) => n + u.after, 0);
const added = after - baseline.total;
const uniqueNewCharacters = [...newTeaching].filter(s => !originalTeaching.has(s)).reduce((n, s) => n + count(s), 0);

const preOptTotal = preOptBaseline ? preOptBaseline.total : baseline.total;
const preOptAdded = after - preOptTotal;
const preOptGrowthPercent = Number((preOptAdded / preOptTotal * 100).toFixed(2));
const preOptMinUnitGrowth = Math.min(...rows.map(u => u.preOptGrowthPercent));

const pre2026Total = pre2026Baseline ? pre2026Baseline.afterCharacters : after;
const cycle2026Added = after - pre2026Total;
const cycle2026GrowthPercent = pre2026Total ? Number((cycle2026Added / pre2026Total * 100).toFixed(2)) : 0;
const cycle2026MinUnitGrowth = Math.min(...rows.map(u => u.cycle2026GrowthPercent));

const report = {
  baselineCommit: baseline.commit,
  method: baseline.method,
  historicalBaselineCharacters: baseline.total,
  preOptBaselineCharacters: preOptTotal,
  pre2026BaselineCharacters: pre2026Total,
  afterCharacters: after,
  addedCharacters: added,
  preOptAddedCharacters: preOptAdded,
  cycle2026AddedCharacters: cycle2026Added,
  historicalGrowthPercent: Number((added / baseline.total * 100).toFixed(2)),
  preOptGrowthPercent,
  cycle2026GrowthPercent,
  minimumUnitGrowthPercent: Math.min(...rows.map(u => u.historicalGrowthPercent)),
  preOptMinimumUnitGrowthPercent: preOptMinUnitGrowth,
  cycle2026MinimumUnitGrowthPercent: cycle2026MinUnitGrowth,
  growthPercent: Number((added / baseline.total * 100).toFixed(2)),
  unitsWithAddedTeaching: rows.length,
  newWorkedExamples: rows.length * 3,
  newReasoningSteps: units.reduce((n, u) => n + workedCases[u.id].steps.length + examTypesData[u.id].workedExample.steps.length + examTypesData[u.id].followUpPractice.steps.length + examTypesData[u.id].periodicExamPractice.steps.length, 0),
  uniqueNewCharacters,
  units: rows
};

fs.writeFileSync('docs/expansion-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, units: undefined }, null, 2));
