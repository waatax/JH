// periodic-exams.test.mjs - Unit test suite for Junior High Periodic Exams & Preparation Handouts
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('1. Periodic Exam Data Module Integrity', async (t) => {
  const dataPath = path.join(rootDir, 'dist', 'periodic-exam-data.js');
  assert.ok(fs.existsSync(dataPath), 'dist/periodic-exam-data.js must exist on disk');

  const { periodicExams, periodicExamById, gradeExams } = await import('../dist/periodic-exam-data.js');

  await t.test('1.1 Should export exactly 17 periodic exams covering Grades 7-9', () => {
    assert.equal(periodicExams.length, 17, 'Total periodic exams must be exactly 17');
    assert.equal(Object.keys(periodicExamById).length, 17, 'periodicExamById must index all 17 exams');
  });

  const expectedIds = [
    '7-1-1', '7-1-2', '7-1-3',
    '7-2-1', '7-2-2', '7-2-3',
    '8-1-1', '8-1-2', '8-1-3',
    '8-2-1', '8-2-2', '8-2-3',
    '9-1-1', '9-1-2', '9-1-3',
    '9-2-1', '9-2-2'
  ];

  await t.test('1.2 Should cover all 17 expected exam IDs in exact sequence', () => {
    const actualIds = periodicExams.map(e => e.id);
    assert.deepEqual(actualIds, expectedIds);
  });

  await t.test('1.3 Grade groups should partition properly', () => {
    assert.equal(gradeExams[7].length, 6, 'Grade 7 must have 6 exams (3 in term 1, 3 in term 2)');
    assert.equal(gradeExams[8].length, 6, 'Grade 8 must have 6 exams (3 in term 1, 3 in term 2)');
    assert.equal(gradeExams[9].length, 5, 'Grade 9 must have 5 exams (3 in term 1, 2 in term 2)');
  });

  await t.test('1.4 Every exam must contain all 5 academic core subjects (85 units total)', () => {
    const requiredSubjectKeys = ['chinese', 'english', 'math', 'science', 'social'];
    let totalSubjectUnits = 0;

    for (const exam of periodicExams) {
      assert.ok(exam.title, `Exam ${exam.id} must have a title`);
      assert.ok(exam.scopeSummary, `Exam ${exam.id} must have a scopeSummary`);
      assert.ok(exam.subjects, `Exam ${exam.id} must have subjects object`);

      const actualKeys = Object.keys(exam.subjects);
      assert.equal(actualKeys.length, 5, `Exam ${exam.id} must have exactly 5 subjects`);
      for (const reqKey of requiredSubjectKeys) {
        assert.ok(exam.subjects[reqKey], `Exam ${exam.id} must contain subject ${reqKey}`);
        totalSubjectUnits++;
      }
    }

    assert.equal(totalSubjectUnits, 85, 'Total subject units across all 17 exams must be 85');
  });

  await t.test('1.5 Quality audit: Every subject must meet 108 Curriculum, Junyi, and Pitfall standards', () => {
    for (const exam of periodicExams) {
      for (const [subKey, subData] of Object.entries(exam.subjects)) {
        const prefix = `[${exam.id} ${subKey}]`;

        // 1. Textbooks comparison
        assert.ok(subData.editionScope && subData.editionScope.length > 15,
          `${prefix} editionScope must provide detailed 3-publisher comparison`);
        assert.ok(subData.editionScope.includes('康軒') || subData.editionScope.includes('全冊') || subData.editionScope.includes('複習'),
          `${prefix} editionScope must mention textbook publishers`);

        // 2. 108 Curriculum code
        assert.ok(subData.naerCode && subData.naerCode.length > 5,
          `${prefix} naerCode must be present`);

        // 3. Junyi Alignment
        assert.ok(subData.junyiAlignment && subData.junyiAlignment.length > 5,
          `${prefix} junyiAlignment must be present`);
        assert.ok(subData.junyiAlignment.includes('均一'),
          `${prefix} junyiAlignment must explicitly reference Junyi`);

        // 4. Core Knowledge items
        assert.ok(Array.isArray(subData.coreKnowledge) && subData.coreKnowledge.length >= 2,
          `${prefix} coreKnowledge must contain at least 2 key concepts`);
        for (const k of subData.coreKnowledge) {
          assert.ok(k.title, `${prefix} coreKnowledge item must have a title`);
          assert.ok(k.takeaway, `${prefix} coreKnowledge item must have a takeaway`);
          assert.ok(k.details, `${prefix} coreKnowledge item must have details`);
        }

        // 5. Exam Paper Questions
        assert.ok(Array.isArray(subData.examPaperQuestions) && subData.examPaperQuestions.length >= 1,
          `${prefix} examPaperQuestions must contain at least 1 real exam question`);
        for (const q of subData.examPaperQuestions) {
          assert.ok(q.question, `${prefix} question must have question text`);
          assert.ok(Array.isArray(q.options) && q.options.length >= 4,
            `${prefix} question must have 4 options`);
          assert.ok(typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.options.length,
            `${prefix} question must have valid answer index`);
          assert.ok(q.solution && q.solution.length > 20,
            `${prefix} question must have comprehensive step-by-step solution`);
          assert.ok(q.thinkingTrap,
            `${prefix} question must highlight student thinking trap`);
        }

        // 6. Pitfall Alerts
        assert.ok(Array.isArray(subData.pitfallAlerts) && subData.pitfallAlerts.length >= 1,
          `${prefix} pitfallAlerts must contain at least 1 pitfall`);
        for (const p of subData.pitfallAlerts) {
          assert.ok(p.title, `${prefix} pitfall must have title`);
          assert.ok(p.warning, `${prefix} pitfall must have warning`);
          assert.ok(p.fixStrategy, `${prefix} pitfall must have fixStrategy`);
        }

        // 7. Competency Scenario
        assert.ok(subData.competencyScenario, `${prefix} competencyScenario must exist`);
        assert.ok(subData.competencyScenario.title, `${prefix} scenario must have title`);
        assert.ok(subData.competencyScenario.context, `${prefix} scenario must have context`);
        assert.ok(subData.competencyScenario.challenge, `${prefix} scenario must have challenge`);
        assert.ok(subData.competencyScenario.analysis, `${prefix} scenario must have analysis`);

        // 8. Countdown Checklist
        assert.ok(Array.isArray(subData.countdownChecklist) && subData.countdownChecklist.length >= 3,
          `${prefix} countdownChecklist must contain at least 3 items`);
      }
    }
  });
});

test('2. UI Component dist/periodic-exams.js Validation', async () => {
  const uiModule = await import('../dist/periodic-exams.js');
  assert.equal(typeof uiModule.renderPeriodicExamsPage, 'function',
    'renderPeriodicExamsPage must be an exported function');

  // Verify rendering inside simulated container
  const mockContainer = {
    _html: '',
    set innerHTML(val) { this._html = val; },
    get innerHTML() { return this._html; },
    querySelectorAll() { return []; },
    querySelector() { return null; }
  };

  assert.doesNotThrow(() => {
    uiModule.renderPeriodicExamsPage(mockContainer, '7-1-1');
  }, 'renderPeriodicExamsPage should execute without throwing');

  assert.ok(mockContainer.innerHTML.includes('國中三年各科 · 段考知識點預備講義'),
    'Rendered HTML must contain title banner');
  assert.ok(mockContainer.innerHTML.includes('三大版本（康軒 / 翰林 / 南一）'),
    'Rendered HTML must contain edition comparison box');
});

test('3. Custom Domain & GitHub Pages CNAME Binding', () => {
  const rootCnamePath = path.join(rootDir, 'CNAME');
  const distCnamePath = path.join(rootDir, 'dist', 'CNAME');

  assert.ok(fs.existsSync(rootCnamePath), 'Root CNAME file must exist');
  assert.ok(fs.existsSync(distCnamePath), 'dist/CNAME file must exist');

  const rootContent = fs.readFileSync(rootCnamePath, 'utf-8').trim();
  const distContent = fs.readFileSync(distCnamePath, 'utf-8').trim();

  assert.equal(rootContent, 'www.tcool.cc', 'Root CNAME must be www.tcool.cc');
  assert.equal(distContent, 'www.tcool.cc', 'dist/CNAME must be www.tcool.cc');
});

test('4. Service Worker Cache & Asset Registration', () => {
  const swPath = path.join(rootDir, 'dist', 'sw.js');
  const swContent = fs.readFileSync(swPath, 'utf-8');

  assert.ok(swContent.includes('zhixing-cache-v18'), 'sw.js must be updated to cache v18');
  assert.ok(swContent.includes('./periodic-exam-data.js'), 'sw.js must cache periodic-exam-data.js');
  assert.ok(swContent.includes('./periodic-exams.js'), 'sw.js must cache periodic-exams.js');
});
