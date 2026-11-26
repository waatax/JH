// scripts/curriculum-exam-sufficiency-2026.test.mjs
// Comprehensive audit test for the 2026-11-26 Deep Teaching Optimization:
// 1. 100% MOE 108 Curriculum official code alignment (188 units + 85 periodic exam handouts)
// 2. 564 globally unique authentic school/CAP practice questions with 5-step explanations
// 3. 188 authored deep supplements + 188 constructed-response 3-level rubric labs + examPrepDigests
// 4. 21-subject & 188-unit native SVG visual illustrations & clean rich-text rendering
// 5. >= 20% practical learning content growth for EVERY SINGLE ONE of the 188 units
// 6. Latest MOE 108 Curriculum & Taiwan statutory accuracy compliance guard

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { subjects, units, unitById } from '../dist/curriculum.js';
import { officialAlignment } from '../dist/official-alignment-data.js';
import { periodicExams } from '../dist/periodic-exam-data.js';
import { examTypesData, renderExamTypeAndExample } from '../dist/exam-types-data.js';
import { supplements, renderSupplement } from '../dist/supplements.js';
import {
  getSubjectIconSVG,
  getStepIconSVG,
  renderConceptVisualMap,
  renderSupplementVisualStrip,
  renderExamRoadmapIllustration,
  renderFiveStepVisualGuide,
  renderConstructedRubricSVG
} from '../dist/lesson-illustrations.js';

const STEP_HEADERS = [
  '【第 1 步：審題定位 · 題眼與已知】',
  '【第 2 步：破題關鍵 · 課綱概念與核心公式】',
  '【第 3 步：階梯推導 · 逐步拆解運算／推理過程】',
  '【第 4 步：易錯陷阱 · 混淆選項逐項剖析與迷思防線】',
  '【第 5 步：版本對照 · 跨版本教材提點與大考心法】'
];

test('1. MOE 108 Curriculum Alignment: 188 units targetCodes & 85 periodic exam handouts verified', () => {
  assert.equal(units.length, 188);
  for (const u of units) {
    const oa = officialAlignment[u.id];
    const et = examTypesData[u.id]?.examType;
    assert(oa && oa.refs?.length > 0, `${u.id}: missing officialAlignment`);
    assert(et && et.targetCodes, `${u.id}: missing examType.targetCodes`);
    const validCodes = new Set(oa.refs.map(r => r.code));
    const listedCodes = et.targetCodes.split(/[,、\s]+/).map(s => s.trim()).filter(Boolean);
    assert(listedCodes.length >= 1, `${u.id}: empty targetCodes`);
    for (const code of listedCodes) {
      assert(validCodes.has(code), `${u.id}: targetCode "${code}" not found in officialAlignment [${[...validCodes].join(', ')}]`);
    }
  }

  let handoutCount = 0;
  for (const exam of periodicExams) {
    for (const [subjKey, subj] of Object.entries(exam.subjects || {})) {
      handoutCount++;
      assert(subj.naerCode && subj.naerCode.length >= 6, `${exam.id}/${subjKey}: missing naerCode`);
      assert(Array.isArray(subj.linkedUnits) && subj.linkedUnits.length >= 1, `${exam.id}/${subjKey}: missing linkedUnits`);
      for (const lu of subj.linkedUnits) {
        const uid = typeof lu === 'string' ? lu : lu?.id;
        assert(uid && unitById[uid], `${exam.id}/${subjKey}: invalid linkedUnit ${JSON.stringify(lu)}`);
      }
      for (const q of (subj.examPaperQuestions || [])) {
        assert(!('sourceSchool: ' in q), `${exam.id}/${subjKey}/${q.id}: malformed key "sourceSchool: "`);
        assert(q.sourceSchool && q.question && q.options?.length === 4, `${exam.id}/${subjKey}/${q.id}: invalid examPaperQuestion`);
      }
    }
  }
  assert.equal(handoutCount, 85, 'Should verify all 85 periodic exam subject handouts');
  // Verify bidirectional linking populated linkedPeriodicExams on core units
  const linkedCount = units.filter(u => (examTypesData[u.id]?.linkedPeriodicExams?.length || 0) > 0).length;
  assert(linkedCount >= 100, `Expected >= 100 units linked to periodic exam handouts, got ${linkedCount}`);
});

test('2. 564 Globally Unique Authentic Practice Problems (3 per unit) + 3 School Archetypes + Constructed-Response Labs', () => {
  const allStems = new Set();
  const forbiddenPhrases = [
    '【進階遷移情境】',
    '實驗中所有測量結果皆可直接套用理想模型',
    '此情境純屬偶然突發事件',
    '為了追求速度，可以省略前置安全檢查',
    'The grammar in the example is incorrect'
  ];

  for (const u of units) {
    const d = examTypesData[u.id];
    assert(Array.isArray(d.schoolExamArchetypes) && d.schoolExamArchetypes.length === 3, `${u.id}: needs 3 schoolExamArchetypes`);
    for (const sa of d.schoolExamArchetypes) {
      assert(sa.code && sa.examTiming && sa.title && sa.schoolContext && sa.requiredKnowledge && sa.sop, `${u.id}: incomplete schoolExamArchetype`);
    }

    for (const key of ['workedExample', 'followUpPractice', 'periodicExamPractice']) {
      const q = d[key];
      assert(q && q.title && q.stem, `${u.id}.${key}: missing title/stem`);
      assert(!allStems.has(q.stem), `${u.id}.${key}: duplicate stem detected`);
      allStems.add(q.stem);
      assert.equal(q.options.length, 4, `${u.id}.${key}: must have 4 options`);
      assert.equal(new Set(q.options).size, 4, `${u.id}.${key}: options must be distinct`);
      assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3, `${u.id}.${key}: invalid answer index`);
      assert.equal(q.steps.length, 5, `${u.id}.${key}: must have 5 steps`);
      for (let i = 0; i < 5; i++) {
        assert(q.steps[i].includes(STEP_HEADERS[i]), `${u.id}.${key} step ${i + 1}: missing header`);
      }
      const fullBlob = [q.stem, ...q.options, ...q.steps].join(' ');
      for (const bad of forbiddenPhrases) {
        assert(!fullBlob.includes(bad), `${u.id}.${key}: contains forbidden template phrase "${bad}"`);
      }
    }

    assert(d.examPrepDigest && d.examPrepDigest.evidenceLedger?.length >= 3 && d.examPrepDigest.oralCheckpoints?.length === 3, `${u.id}: incomplete examPrepDigest`);
    assert(d.constructedResponseLab && d.constructedResponseLab.subQuestions?.length === 2 && d.constructedResponseLab.rubric?.length === 4 && d.constructedResponseLab.deductionDiagnostics?.length === 2, `${u.id}: incomplete constructedResponseLab`);
  }
  assert.equal(allStems.size, 564, 'All 564 practice stems must be globally unique');
});

test('3. Native SVG Visual Illustrations & Iconography System: 21 Subjects & 188 Units Clean Rendering', () => {
  assert.equal(subjects.length, 21);
  for (const s of subjects) {
    const icon = getSubjectIconSVG(s.id, 48);
    assert(icon.includes('<svg') && icon.includes('</svg>') && !icon.includes('undefined'), `${s.id}: broken subject SVG icon`);
  }
  for (let i = 0; i < 5; i++) {
    const stIcon = getStepIconSVG(i, 20);
    assert(stIcon.includes('<svg') && stIcon.includes('</svg>'), `Step icon ${i} invalid`);
  }
  assert(renderFiveStepVisualGuide().includes('<svg') && renderFiveStepVisualGuide().includes('審題定位'));

  for (const u of units) {
    const mapHtml = renderConceptVisualMap(u);
    assert(mapHtml.includes('visual-explainer-card') && mapHtml.includes('<svg') && mapHtml.includes('</svg>'), `${u.id}: broken concept visual map`);
    assert(!mapHtml.includes('undefined') && !mapHtml.includes('NaN'), `${u.id}: visual map contains undefined/NaN`);

    assert(supplements[u.id], `${u.id}: missing authored supplement`);
    const suppHtml = renderSupplement(u);
    assert(suppHtml.includes('supp-visual-strip') && suppHtml.includes('<svg'), `${u.id}: supplement missing visual strip`);
    assert(!suppHtml.includes('**'), `${u.id}: raw unrendered markdown ** leaked in supplement HTML`);
    assert(!suppHtml.includes('undefined') && !suppHtml.includes('NaN'), `${u.id}: supplement HTML contains undefined/NaN`);

    const examHtml = renderExamTypeAndExample(u);
    assert(examHtml.includes('exam-roadmap-svg-card') && examHtml.includes('school-archetypes-card') && examHtml.includes('exam-digest-card') && examHtml.includes(`exam-periodic-${u.id}`) && examHtml.includes(`exam-constructed-${u.id}`) && examHtml.includes('rubric-svg-strip'), `${u.id}: missing upgraded exam HTML cards/illustrations`);
    assert(!examHtml.includes('**'), `${u.id}: raw unrendered markdown ** leaked in exam-types HTML`);
    assert(!examHtml.includes('undefined') && !examHtml.includes('NaN'), `${u.id}: exam HTML contains undefined/NaN`);

    const periodicBtns = examHtml.match(/class="practice-opt-btn periodic-opt-btn"/g);
    assert.equal(periodicBtns?.length, 4, `${u.id}: must render 4 periodic-opt-btn buttons`);
  }
});

test('4. >= 20% Practical Learning Content Growth Verified on EVERY Single Unit (188/188)', () => {
  const prePath = 'docs/expansion-pre-2026-11-26-baseline.json';
  const curPath = 'docs/expansion-report.json';
  assert(fs.existsSync(prePath) && fs.existsSync(curPath), 'Baseline and current expansion reports must exist');
  const pre = JSON.parse(fs.readFileSync(prePath, 'utf8'));
  const cur = JSON.parse(fs.readFileSync(curPath, 'utf8'));
  assert(cur.cycle2026GrowthPercent >= 20, `Overall 2026 growth must be >= 20% (got ${cur.cycle2026GrowthPercent}%)`);
  assert(cur.cycle2026MinimumUnitGrowthPercent >= 20, `Minimum single-unit 2026 growth must be >= 20% (got ${cur.cycle2026MinimumUnitGrowthPercent}%)`);
  const preById = Object.fromEntries(pre.units.map(x => [x.id, x.after]));
  for (const row of cur.units) {
    const pct = (row.after - preById[row.id]) / preById[row.id] * 100;
    assert(pct >= 20, `${row.id}: growth ${pct.toFixed(2)}% is below 20%`);
  }
});

test('5. Latest MOE 108 Curriculum & Taiwan Statutory Accuracy Guard', () => {
  const m18 = JSON.stringify(examTypesData['math-18']) + JSON.stringify(supplements['math-18']);
  assert(/F-9-1|F-9-2/.test(m18) && /頂點/.test(m18), 'math-18 must align with F-9-1/F-9-2 vertex form');
  assert(/不列為|延伸|高中/.test(m18), 'math-18 must clarify 108 curriculum boundary on completing the square / discriminant');

  const localBlob = ['local-1', 'local-2', 'local-3', 'local-4'].map(id => JSON.stringify(examTypesData[id]) + JSON.stringify(supplements[id])).join(' ');
  assert(localBlob.includes('111') && localBlob.includes('國家語言'), 'local-1..4 must reflect 111學年度國家語言部定課程');
  assert(localBlob.includes('閩東語') && localBlob.includes('手形'), 'local units must accurately cover 閩東語 and 臺灣手語要素');

  const civBlob = Array.from({ length: 12 }, (_, i) => `civics-${i + 1}`).map(id => JSON.stringify(examTypesData[id]) + JSON.stringify(supplements[id])).join(' ');
  assert(civBlob.includes('18 歲') || civBlob.includes('18歲'), 'civics must reflect Civil Code age of majority = 18');
  assert(civBlob.includes('憲法法庭'), 'civics must reflect Constitutional Court (憲法法庭)');
  assert(civBlob.includes('懲戒法院'), 'civics must reflect Disciplinary Court (懲戒法院)');
  assert(civBlob.includes('國民法官') && civBlob.includes('23'), 'civics must reflect Citizen Judges Act age 23');

  const h3 = JSON.stringify(examTypesData['health-3']) + JSON.stringify(supplements['health-3']);
  assert(h3.includes('20') && h3.includes('電子煙'), 'health-3 must reflect latest Tobacco Hazards Prevention Act (age 20 & e-cigarette ban)');
});
