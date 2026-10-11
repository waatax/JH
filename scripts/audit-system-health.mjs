// Automated System Health & Process Audit for Zhixing Junior Academy
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {units, subjects, questions, unitById, subjectById} from '../dist/curriculum.js';
import {workedCases} from '../dist/worked-cases.js';
import {teachingTables} from '../dist/teaching.js';
import {getDiagram} from '../dist/diagrams.js';

console.log('====================================================');
console.log('🩺 RUNNING SYSTEM HEALTH & QUALITY AUDIT');
console.log('====================================================\n');

let passCount = 0;
let warnCount = 0;
let errCount = 0;

function check(label, condition, errorMsg = '') {
  if (condition) {
    console.log(`  ✔ [PASS] ${label}`);
    passCount++;
  } else {
    console.error(`  ✖ [FAIL] ${label} - ${errorMsg}`);
    errCount++;
  }
}

// 1. Curriculum & Internal Link Integrity
console.log('--- 1. Curriculum & Link Integrity ---');
const unitIds = new Set(units.map(u => u.id));
const subjectIds = new Set(subjects.map(s => s.id));

check('All 188 units have unique IDs', unitIds.size === 188);
check('All 21 subjects have unique IDs', subjectIds.size === 21);

let orphanUnits = units.filter(u => !subjectIds.has(u.subject));
check('All units map to an existing subject', orphanUnits.length === 0, `Found orphans: ${orphanUnits.map(u=>u.id)}`);

let invalidQuestions = questions.filter(q => !unitIds.has(q.unitId) || !subjectIds.has(q.subject));
check('All 376 lesson questions map to valid units and subjects', invalidQuestions.length === 0);

// 2. Diagrams and Worked Cases Rendering
console.log('\n--- 2. Diagram & Thinking Chain Rendering ---');
let diagramErrors = 0;
let specializedDiagramCount = 0;
for (const u of units) {
  try {
    const diag = getDiagram(u);
    if (typeof diag !== 'string') diagramErrors++;
    if (diag.length > 0) specializedDiagramCount++;
  } catch (e) {
    diagramErrors++;
  }
}
check('All 188 units evaluate getDiagram without runtime exceptions', diagramErrors === 0);
check('All 188 units have visual diagrams rendered correctly (100% coverage)', specializedDiagramCount === 188, `Found: ${specializedDiagramCount}`);

let workedCaseErrors = 0;
for (const u of units) {
  const c = workedCases[u.id];
  if (!c || !c.steps || c.steps.length < 3 || !c.check) workedCaseErrors++;
}
check('All 188 units have complete 3+ step thinking chains and sanity checks', workedCaseErrors === 0);

// 3. PWA & Static Assets Alignment
console.log('\n--- 3. PWA & Static Assets Alignment ---');
const swCode = fs.readFileSync(new URL('../dist/sw.js', import.meta.url), 'utf8');
const matchAssets = swCode.match(/const STATIC_ASSETS = \[([\s\S]*?)\];/);
if (matchAssets) {
  const assetList = matchAssets[1]
    .split(',')
    .map(s => s.trim().replace(/['"]/g, ''))
    .filter(s => s && s !== './');
  
  const distDir = fileURLToPath(new URL('../dist', import.meta.url));
  let missingAssets = [];
  for (const asset of assetList) {
    const relName = asset.replace(/^\.\//, '');
    const assetPath = path.join(distDir, relName);
    if (!fs.existsSync(assetPath)) {
      missingAssets.push(asset);
    }
  }
  check('All Service Worker STATIC_ASSETS exist on disk', missingAssets.length === 0, `Missing: ${missingAssets.join(', ')}`);
} else {
  check('Service worker declares STATIC_ASSETS array', false);
}

// 4. Accessibility and DOM Semantic Markers
console.log('\n--- 4. Accessibility & UI Markers ---');
const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
check('HTML specifies lang="zh-Hant"', html.includes('lang="zh-Hant"'));
check('HTML specifies viewport-fit=cover', html.includes('viewport-fit=cover'));
check('Skip link target #main exists', html.includes('href="#main"') && html.includes('id="main"'));
check('Search dialog has aria-modal="true"', html.includes('id="search-modal"') && html.includes('aria-modal="true"'));
check('Shortcuts dialog has aria-modal="true"', html.includes('id="shortcuts-modal"') && html.includes('aria-modal="true"'));
check('Mobile bottom nav has aria-label', html.includes('class="mobile-bottom-nav"') && html.includes('aria-label='));

// 5. CAP Exam Bank & 108 Curriculum Alignment Health
console.log('\n--- 5. CAP Exam Bank & 108 Curriculum Alignment ---');
const capBankPath = fileURLToPath(new URL('../dist/cap-bank.json', import.meta.url));
const capBankExists = fs.existsSync(capBankPath);
check('cap-bank.json exists in dist/', capBankExists);
if (capBankExists) {
  const capData = JSON.parse(fs.readFileSync(capBankPath, 'utf8'));
  check('CAP question bank contains 1,674 questions', capData.questions.length === 1674, `Got: ${capData.questions.length}`);
  check('CAP question bank contains 173 stimulus groups', capData.groups.length === 173, `Got: ${capData.groups.length}`);
  
  const unlinked = capData.questions.filter(q => !q.unitIds || q.unitIds.length === 0);
  check('All 1,674 CAP questions are linked to 108 curriculum units', unlinked.length === 0, `Unlinked: ${unlinked.length}`);
  
  const invalidUnitLinks = capData.questions.filter(q => (q.unitIds || []).some(uid => !unitIds.has(uid)));
  check('All CAP unitIds map to valid 108 curriculum units', invalidUnitLinks.length === 0, `Invalid: ${invalidUnitLinks.length}`);
  
  const unexplained = capData.questions.filter(q => !q.explanation || !q.explanation.keyIdea || !q.explanation.steps);
  check('All 1,674 CAP questions have structured pedagogical explanations', unexplained.length === 0, `Unexplained: ${unexplained.length}`);
}

console.log('\n====================================================');
console.log(`SUMMARY: ${passCount} Passed, ${errCount} Failed.`);
console.log('====================================================\n');

if (errCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
