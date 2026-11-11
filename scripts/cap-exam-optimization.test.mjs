import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units, unitById} from '../dist/curriculum.js';
import {examTypesData, renderExamTypeAndExample} from '../dist/exam-types-data.js';

test('1. CAP Exam Optimization: 100% 188 units complete coverage', () => {
  assert.equal(units.length, 188, 'Should have exactly 188 units');
  const dataKeys = Object.keys(examTypesData);
  assert.equal(dataKeys.length, 188, 'examTypesData must cover all 188 units');

  for (const u of units) {
    const entry = examTypesData[u.id];
    assert(entry, `Unit ${u.id} must exist in examTypesData`);
    assert(entry.zeroToTopLadder, `Unit ${u.id} must have zeroToTopLadder`);
    assert(entry.zeroToTopLadder.zeroFoundation.length >= 40, `Unit ${u.id} zeroFoundation too short`);
    assert(entry.zeroToTopLadder.mainstreamBtoA.length >= 40, `Unit ${u.id} mainstreamBtoA too short`);
    assert(entry.zeroToTopLadder.topTierAPlusPlus.length >= 40, `Unit ${u.id} topTierAPlusPlus too short`);
    assert(entry.examType, `Unit ${u.id} must have examType`);
    assert(Array.isArray(entry.questionTypeList) && entry.questionTypeList.length === 3, `Unit ${u.id} must have 3-archetype questionTypeList`);
    assert(entry.knowledgeSufficiencyPatch && Array.isArray(entry.knowledgeSufficiencyPatch.patchPoints) && entry.knowledgeSufficiencyPatch.patchPoints.length === 3, `Unit ${u.id} must have 3-point knowledgeSufficiencyPatch`);
    assert(entry.workedExample, `Unit ${u.id} must have workedExample`);
    assert(entry.followUpPractice, `Unit ${u.id} must have followUpPractice`);
  }
});

test('2. CAP Exam Types Analysis Matrix & Archetype List: Rigorous Schema & Curriculum Intel', () => {
  for (const u of units) {
    const et = examTypesData[u.id].examType;
    assert(typeof et.typeName === 'string' && et.typeName.length >= 8, `${u.id} typeName too short`);
    assert(typeof et.frequency === 'string' && et.frequency.length >= 8, `${u.id} frequency too short`);
    assert(typeof et.bloomLevel === 'string' && et.bloomLevel.length >= 2, `${u.id} bloomLevel missing`);
    assert(typeof et.targetCodes === 'string' && et.targetCodes.length >= 3, `${u.id} targetCodes missing`);
    assert(typeof et.clues === 'string' && et.clues.length >= 10, `${u.id} clues too short`);
    assert(typeof et.publishersFocus === 'string' && et.publishersFocus.length >= 15, `${u.id} publishersFocus too short`);
    assert(typeof et.strategy === 'string' && et.strategy.length >= 15, `${u.id} strategy too short`);
    assert(typeof et.knowledgeAudit === 'string' && et.knowledgeAudit.length >= 15, `${u.id} knowledgeAudit too short`);

    for (const qt of examTypesData[u.id].questionTypeList) {
      assert(qt.archetypeName && qt.capRef && qt.questionPattern && qt.requiredKnowledge && qt.solvingSOP, `${u.id} incomplete questionTypeList item`);
    }
  }
});

test('3. High-Yield Practice Examples (workedExample & followUpPractice): Zero Generic Placeholders & Valid 4 Options', () => {
  const stems = new Set();
  const followUpStems = new Set();
  for (const u of units) {
    const we = examTypesData[u.id].workedExample;
    assert(typeof we.title === 'string' && we.title.length >= 6, `${u.id} title missing`);
    assert(typeof we.stem === 'string' && we.stem.length >= 15, `${u.id} stem too short`);
    assert(!stems.has(we.stem), `${u.id} has duplicate stem with another unit`);
    stems.add(we.stem);

    assert(Array.isArray(we.options) && we.options.length === 4, `${u.id} must have exactly 4 options`);
    assert.equal(new Set(we.options).size, 4, `${u.id} options must all be distinct`);
    for (const opt of we.options) {
      assert(typeof opt === 'string' && opt.trim().length > 0, `${u.id} option cannot be empty`);
      assert(!opt.includes('實驗中所有測量結果皆可直接套用理想模型'), `${u.id} contains generic science option placeholder`);
      assert(!opt.includes('此情境純屬偶然突發事件'), `${u.id} contains generic social option placeholder`);
      assert(!opt.includes('為了追求速度，可以省略前置安全檢查'), `${u.id} contains generic arts/life option placeholder`);
      assert(!opt.includes('The grammar in the example is incorrect'), `${u.id} contains generic English option placeholder`);
    }
    assert(Number.isInteger(we.answer) && we.answer >= 0 && we.answer <= 3, `${u.id} answer must be index 0, 1, 2, or 3`);

    const fp = examTypesData[u.id].followUpPractice;
    assert(typeof fp.title === 'string' && fp.title.length >= 6, `${u.id} followUpPractice title missing`);
    assert(typeof fp.stem === 'string' && fp.stem.length >= 15, `${u.id} followUpPractice stem too short`);
    assert(!followUpStems.has(fp.stem), `${u.id} has duplicate followUpPractice stem`);
    followUpStems.add(fp.stem);
    assert(Array.isArray(fp.options) && fp.options.length === 4, `${u.id} followUpPractice must have 4 options`);
    assert.equal(new Set(fp.options).size, 4, `${u.id} followUpPractice options must be distinct`);
    assert(Number.isInteger(fp.answer) && fp.answer >= 0 && fp.answer <= 3, `${u.id} followUpPractice answer must be 0..3`);
  }
});

test('4. 5-Step Scaffolding Thought Chain: Complete 5 Steps on Both Practice Questions per Unit', () => {
  const stepHeaders = [
    '【第 1 步：審題定位 · 題眼與已知】',
    '【第 2 步：破題關鍵 · 課綱概念與核心公式】',
    '【第 3 步：階梯推導 · 逐步拆解運算／推理過程】',
    '【第 4 步：易錯陷阱 · 混淆選項逐項剖析與迷思防線】',
    '【第 5 步：版本對照 · 跨版本教材提點與大考心法】'
  ];

  for (const u of units) {
    for (const qObj of [examTypesData[u.id].workedExample, examTypesData[u.id].followUpPractice]) {
      assert(Array.isArray(qObj.steps) && qObj.steps.length === 5, `${u.id} must have exactly 5 solution steps`);
      for (let i = 0; i < 5; i++) {
        const step = qObj.steps[i];
        assert(typeof step === 'string' && step.length >= 25, `${u.id} step ${i + 1} too short (length ${step?.length})`);
        assert(step.includes(stepHeaders[i]), `${u.id} step ${i + 1} must contain header "${stepHeaders[i]}"`);
      }
    }
  }
});

test('5. HTML Rendering & Interactive Wiring Verification', () => {
  for (const u of units) {
    const html = renderExamTypeAndExample(u);
    assert(html.includes(`id="step-exam-types"`), `${u.id} missing step-exam-types id`);
    assert(html.includes('cap-exam-type-step'), `${u.id} missing cap-exam-type-step class`);
    assert(html.includes('exam-type-matrix-card'), `${u.id} missing exam-type-matrix-card`);
    assert(html.includes('cap-archetypes-card'), `${u.id} missing cap-archetypes-card`);
    assert(html.includes('knowledge-patch-card'), `${u.id} missing knowledge-patch-card`);
    assert(html.includes(`id="exam-practice-${u.id}"`), `${u.id} missing exam-practice card id`);
    assert(html.includes(`id="practice-fb-${u.id}"`), `${u.id} missing feedback banner id`);
    assert(html.includes(`id="practice-sol-${u.id}"`), `${u.id} missing solution accordion id`);
    assert(html.includes(`id="exam-followup-${u.id}"`), `${u.id} missing exam-followup card id`);
    assert(html.includes(`id="followup-fb-${u.id}"`), `${u.id} missing followup feedback banner id`);
    assert(html.includes(`id="followup-sol-${u.id}"`), `${u.id} missing followup solution accordion id`);
    assert(html.includes(`data-unit="${u.id}"`), `${u.id} missing data-unit`);
    assert(html.includes(`data-ans="${examTypesData[u.id].workedExample.answer}"`), `${u.id} missing data-ans`);

    // Verify 4 primary option buttons + 4 follow-up option buttons are rendered
    const primaryBtns = html.match(/class="practice-opt-btn"/g);
    const followUpBtns = html.match(/class="practice-opt-btn followup-opt-btn"/g);
    assert.equal(primaryBtns?.length, 4, `${u.id} must render 4 primary practice option buttons`);
    assert.equal(followUpBtns?.length, 4, `${u.id} must render 4 follow-up practice option buttons`);
  }
});

test('6. Expansion Report: Every Unit Achieves >= 30% Growth (Actual Min >= 100%)', () => {
  const reportPath = 'docs/expansion-report.json';
  assert(fs.existsSync(reportPath), 'docs/expansion-report.json must exist');
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

  assert(report.growthPercent >= 30, `Overall growth must be >= 30% (actual: ${report.growthPercent}%)`);
  assert(report.minimumUnitGrowthPercent >= 30, `Minimum unit growth must be >= 30% (actual: ${report.minimumUnitGrowthPercent}%)`);
  assert(report.preOptGrowthPercent >= 120, `Growth over preOptBaseline must be >= 120% (actual: ${report.preOptGrowthPercent}%)`);
  assert.equal(report.unitsWithAddedTeaching, 188, 'Must cover 188 units');
  assert.equal(report.units.length, 188, 'Report array must list 188 units');

  for (const u of report.units) {
    assert(u.growthPercent >= 30, `${u.id} growth is only ${u.growthPercent}%, expected >= 30%`);
    assert(u.preOptGrowthPercent >= 90, `${u.id} preOptGrowthPercent is ${u.preOptGrowthPercent}%, expected >= 90%`);
  }
});
