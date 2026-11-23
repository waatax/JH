// scripts/ultralearning.test.mjs
// Comprehensive automated verification for Zhixing Ultralearning OS
// (Scott H. Young's "Ultralearning" & "Get Better at Anything" -> JH 188 Units -> GSAT 頂頂標)

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { subjects, units, questions } from '../dist/curriculum.js';
import { makeSession } from '../dist/engine.js';
import {
  unitUltraData,
  gsatTopTierBlueprint,
  getUnitUltra,
  computeSweetSpotMetrics,
  findBottleneckUnits,
  evaluateFreeRecall,
  computeCalibrationMetrics,
  getExposureStage,
  getGsatReadinessMetrics,
  renderHomeUltralearningBanner,
  renderUltralearningCommandCenter,
  renderLessonCognitiveModeBar,
  renderLessonUltralearningTop,
  renderLessonUltralearningDo,
  renderGsatTopTierBridge
} from '../dist/ultralearning.js';

const gsatDb = JSON.parse(fs.readFileSync('dist/gsat-database.json', 'utf8'));
const validGsatIds = new Set(gsatDb.exams.map(e => e.exam_id));
const validSubjectIds = new Set(subjects.map(s => s.id));

test('1. Ultralearning Dataset: 100% 188-unit coverage with Metalearning, PARI, Completion & GSAT Bridge', () => {
  assert.equal(Object.keys(unitUltraData).length, 188);
  for (const u of units) {
    const ud = getUnitUltra(u.id);
    assert.ok(ud, `Missing unitUltraData for ${u.id}`);

    // Metalearning Map (Ultralearning P1)
    assert.ok(ud.metalearning.why.length >= 20, `${u.id}: why too short`);
    assert.ok(ud.metalearning.concepts.length >= 2, `${u.id}: needs >=2 concepts`);
    assert.ok(ud.metalearning.facts.length >= 2, `${u.id}: needs >=2 facts`);
    assert.ok(ud.metalearning.procedures.length >= 3, `${u.id}: needs >=3 procedures`);
    assert.ok(ud.metalearning.recallKeywords.length >= 2, `${u.id}: needs >=2 recallKeywords`);

    // PARI Expert Tacit Cue (GBAA Ch.4)
    for (const k of ['precursor', 'action', 'result', 'interpretation']) {
      assert.ok(ud.pari[k] && ud.pari[k].length >= 10, `${u.id}: missing PARI.${k}`);
    }

    // Copy -> Complete -> Create Completion Problem (GBAA Ch.2/5)
    const cp = ud.completionProblem;
    assert.ok(cp.problem.length >= 15 && cp.givenStep1.length >= 8 && cp.givenStep3.length >= 8, `${u.id}: incomplete completion problem`);
    assert.equal(cp.options.length, 4, `${u.id}: completion problem must have 4 options`);
    assert.equal(new Set(cp.options).size, 4, `${u.id}: completion problem options must be distinct`);
    assert.ok(Number.isInteger(cp.answer) && cp.answer >= 0 && cp.answer <= 3, `${u.id}: invalid completion answer`);
    assert.ok(cp.explanation.length >= 20, `${u.id}: completion explanation too short`);

    // GSAT Vertical Bridge
    assert.ok(validGsatIds.has(ud.gsatBridge.recommendedGsatExamId), `${u.id}: invalid GSAT exam ID ${ud.gsatBridge.recommendedGsatExamId}`);
    assert.ok(ud.gsatBridge.seniorEvolution.length >= 20, `${u.id}: seniorEvolution too short`);
    assert.ok(ud.gsatBridge.topTierTactic.length >= 20, `${u.id}: topTierTactic too short`);
  }
});

test('2. GSAT 7-Subject 頂頂標 Blueprint Integrity', () => {
  assert.equal(gsatTopTierBlueprint.length, 7);
  for (const bp of gsatTopTierBlueprint) {
    assert.ok(bp.name && bp.target && bp.ultraProtocol.length >= 20);
    assert.ok(bp.coreSkills.length >= 2);
    assert.ok(bp.jhSubjects.length >= 1 && bp.jhSubjects.every(sid => validSubjectIds.has(sid)), `${bp.code}: invalid jhSubjects`);
    assert.ok(bp.overkillExams.length >= 1 && bp.overkillExams.every(eid => validGsatIds.has(eid)), `${bp.code}: invalid overkillExams`);
  }
});

test('3. Difficulty Sweet Spot (~85% Rule) classifies Start / Overload / SweetSpot / Overkill accurately', () => {
  const sampleQs = questions.slice(0, 10);
  const sStart = computeSweetSpotMetrics({ records: {} }, units, sampleQs);
  assert.equal(sStart.zone, 'start');

  // 4/10 = 40% -> overload
  const recOverload = Object.fromEntries(sampleQs.map((q, i) => [q.id, { attempts: 1, correctCount: i < 4 ? 1 : 0, latestCorrect: i < 4 }]));
  const sOver = computeSweetSpotMetrics({ records: recOverload }, units, sampleQs);
  assert.equal(sOver.zone, 'overload');
  assert.equal(sOver.accuracy, 40);

  // 8/10 = 80% -> sweetspot
  const recSweet = Object.fromEntries(sampleQs.map((q, i) => [q.id, { attempts: 1, correctCount: i < 8 ? 1 : 0, latestCorrect: i < 8 }]));
  const sSweet = computeSweetSpotMetrics({ records: recSweet }, units, sampleQs);
  assert.equal(sSweet.zone, 'sweetspot');
  assert.equal(sSweet.accuracy, 80);

  // 10/10 = 100% -> overkill
  const recTop = Object.fromEntries(sampleQs.map(q => [q.id, { attempts: 1, correctCount: 1, latestCorrect: true }]));
  const sTop = computeSweetSpotMetrics({ records: recTop }, units, sampleQs);
  assert.equal(sTop.zone, 'overkill');
  assert.equal(sTop.accuracy, 100);
});

test('4. Direct-Then-Drill Bottleneck Detection prioritizes High-Confidence Illusions first', () => {
  const uDanger = units[5];
  const uWrong = units[2];
  const state = {
    read: [],
    records: {
      [uWrong.questions[0].id]: { attempts: 2, latestCorrect: false },
      [uDanger.questions[0].id]: { attempts: 1, latestCorrect: false }
    },
    confidenceLog: [
      { qId: uDanger.questions[0].id, unitId: uDanger.id, confidence: 'high', correct: false }
    ]
  };
  const ranked = findBottleneckUnits(state, units, questions, 5);
  assert.equal(ranked[0].unit.id, uDanger.id, 'High-confidence wrong unit must be #1 bottleneck');
  assert.equal(ranked[1].unit.id, uWrong.id, 'Wrong unit must rank ahead of unattempted units');
});

test('5. Blank-Sheet Free Recall & Confidence Calibration Analytics', () => {
  const evalGood = evaluateFreeRecall('正負數表示方向，絕對值是到原點的距離，相反數改變方向。', ['正負數', '絕對值', '相反數', '兩點距離']);
  assert.equal(evalGood.matched.length, 3);
  assert.deepEqual(evalGood.missing, ['兩點距離']);
  assert.equal(evalGood.coveragePercent, 75);

  const cal = computeCalibrationMetrics([
    { confidence: 'high', correct: true },
    { confidence: 'high', correct: false }, // danger illusion
    { confidence: 'low', correct: true },   // lucky guess
    { confidence: 'low', correct: false }   // honest gap
  ]);
  assert.equal(cal.calibratedHigh, 1);
  assert.equal(cal.dangerIllusion, 1);
  assert.equal(cal.luckyGuess, 1);
  assert.equal(cal.honestGap, 1);
  assert.ok(cal.calibrationScore >= 0 && cal.calibrationScore <= 100);
});

test('6. Graded Exposure Ladder & GSAT Readiness Metrics', () => {
  const exp0 = getExposureStage({}, units, questions);
  assert.equal(exp0.currentLevel, 1);
  assert.equal(exp0.stages.length, 5);

  const exp2 = getExposureStage({ read: ['math-1'], records: Object.fromEntries(questions.slice(0, 12).map(q => [q.id, { attempts: 1, latestCorrect: true }])) }, units, questions);
  assert.equal(exp2.currentLevel, 3);

  const gsat = getGsatReadinessMetrics({ read: ['math-1', 'math-2'], completionDone: { 'math-1': true } }, units, questions);
  assert.equal(gsat.rows.length, 7);
  assert.ok(gsat.overallFoundation >= 0 && gsat.overallFoundation <= 100);
});

test('7. Blind-Topic Interleaved Quiz Session & Full UI Rendering (Zero undefined/NaN across all 188 units)', () => {
  const sess = makeSession(questions.slice(0, 20), { title: '交錯盲測', count: 10, blindTopic: true });
  assert.equal(sess.blindTopic, true);
  assert.deepEqual(sess.confidences, {});

  const homeHtml = renderHomeUltralearningBanner({}, units, subjects, questions);
  assert.ok(homeHtml.includes('ultra-home-strip') && homeHtml.includes('home-ultra-interleaved'));
  assert.ok(!homeHtml.includes('undefined') && !homeHtml.includes('NaN'));

  const hubHtml = renderUltralearningCommandCenter({}, units, subjects, questions);
  assert.ok(hubHtml.includes('ultra-gauge-bar') && hubHtml.includes('data-interleave="core5"') && hubHtml.includes('ultra-ladder'));
  assert.ok(!hubHtml.includes('undefined') && !hubHtml.includes('NaN'));

  const gsatBridgeHtml = renderGsatTopTierBridge({}, units, questions);
  assert.ok(gsatBridgeHtml.includes('ultra-gsat-bridge-panel') && !gsatBridgeHtml.includes('undefined'));

  const modeBarHtml = renderLessonCognitiveModeBar('full');
  assert.ok(modeBarHtml.includes('data-ultra-mode="see"') && modeBarHtml.includes('data-ultra-mode="do"') && modeBarHtml.includes('data-ultra-mode="feedback"'));

  for (const u of units) {
    const topHtml = renderLessonUltralearningTop(u, {});
    const doHtml = renderLessonUltralearningDo(u, {});
    assert.ok(topHtml.includes('step-ultralearning') && topHtml.includes('ultra-pari-card') && topHtml.includes('ultra-gsat-bridge-box'), `${u.id}: missing top UI`);
    assert.ok(doHtml.includes('step-ultra-do') && doHtml.includes('ultra-comp-opt') && doHtml.includes('ultra-recall-input') && doHtml.includes('ultra-qb-add'), `${u.id}: missing do UI`);
    assert.ok(!topHtml.includes('undefined') && !doHtml.includes('undefined'), `${u.id}: rendered HTML contains undefined`);
  }
});

test('8. App, Index, CSS & Service Worker Integration Verification', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8');
  const sw = fs.readFileSync('dist/sw.js', 'utf8');
  const app = fs.readFileSync('dist/app.js', 'utf8');
  const css = fs.readFileSync('dist/ultralearning.css', 'utf8');

  assert.ok(html.includes('./ultralearning.css') && html.includes('#/ultralearning'));
  assert.ok(sw.includes('./ultralearning.js') && sw.includes('./ultralearning-data.js') && sw.includes('./ultralearning.css'));
  assert.ok(app.includes('renderUltralearningCommandCenter') && app.includes('wireLessonUltralearningSuite') && app.includes('data-conf'));
  assert.ok(css.includes('[data-cognitive-mode="see"]') && css.includes('[data-theme="dark"]'));
});
