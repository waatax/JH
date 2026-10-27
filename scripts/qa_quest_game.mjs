// scripts/qa_quest_game.mjs
// Comprehensive End-to-End QA and Data Integrity Verifier for JH Quest

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCourse, createGame, isScored } from '../dist/quest/engine.mjs';
import { courseAtlas, nextAdventure } from '../dist/quest/atlas.mjs';
import { makePlacement, placementReport } from '../dist/quest/placement.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const questDir = path.join(root, 'dist', 'quest');
const courseDir = path.join(questDir, 'course');

console.log('====================================================');
console.log('🧪 RUNNING JH QUEST QUALITY ASSURANCE & VERIFICATION');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function check(label, cond, msg = '') {
  if (cond) {
    console.log(`  ✔ [PASS] ${label}`);
    passCount++;
  } else {
    console.error(`  ✖ [FAIL] ${label} - ${msg}`);
    failCount++;
  }
}

// -----------------------------------------------------------------
// 1. Static File Existence & HTML Structure
// -----------------------------------------------------------------
console.log('--- 1. File Structure & Static Assets ---');
const requiredFiles = [
  'index.html',
  'quest.css',
  'engine.mjs',
  'view.mjs',
  'sound.mjs',
  'coach.mjs',
  'atlas.mjs',
  'placement.mjs',
  'course/index.json',
  'course/items.json',
  'course/stories.json',
  'course/s1.json',
  'course/s2.json',
  'course/s3.json',
  'course/s4.json',
  'course/s5.json',
  'course/s6.json',
  'course/b-chinese.json',
  'course/b-english.json',
  'course/b-math.json',
  'course/b-science.json',
  'course/b-social.json',
  'course/b-life.json',
  'course/b-periodic.json',
  'course/b-cap.json'
];

for (const rel of requiredFiles) {
  const p = path.join(questDir, rel);
  check(`File exists: ${rel}`, fs.existsSync(p), `Missing: ${p}`);
}

const html = fs.readFileSync(path.join(questDir, 'index.html'), 'utf8');
check('index.html specifies lang="zh-Hant"', html.includes('lang="zh-Hant"'));
check('index.html specifies viewport-fit=cover', html.includes('viewport-fit=cover'));
check('index.html links to quest.css', html.includes('quest.css'));
check('index.html imports view.mjs', html.includes('view.mjs'));

// -----------------------------------------------------------------
// 2. Course Index & Curriculum Coverage
// -----------------------------------------------------------------
console.log('\n--- 2. Course Index & Curriculum Coverage ---');
const index = JSON.parse(fs.readFileSync(path.join(courseDir, 'index.json'), 'utf8'));

check('Course index has 6 sections (s1~s6)', index.sections?.length === 6);
check('Course index has 8 branches', index.branches?.length === 8);
check('Course index has 36 stories listed', index.stories?.length === 36);

let totalUnits = 0;
let totalNodes = 0;
for (const s of index.sections) {
  totalUnits += s.units?.length || 0;
  for (const u of s.units) {
    totalNodes += u.nodes?.length || 0;
  }
}
check('All 188 108-Curriculum units accounted for in 6 sections', totalUnits === 188, `Found ${totalUnits}`);
check('All units have 5 progressive stages (940 nodes total)', totalNodes === 940, `Found ${totalNodes}`);

// -----------------------------------------------------------------
// 3. Items Bank & Question Quality
// -----------------------------------------------------------------
console.log('\n--- 3. Items Bank & Question Quality ---');
const itemsJsonRaw = JSON.parse(fs.readFileSync(path.join(courseDir, 'items.json'), 'utf8'));
const itemsObj = itemsJsonRaw.items || itemsJsonRaw;
const items = Object.values(itemsObj);
const itemMap = new Map(Object.entries(itemsObj));

check('Item bank contains 2,600+ questions', items.length >= 2600, `Found ${items.length}`);

let invalidQuestionTypes = 0;
const validTypes = new Set(['info', 'choice', 'listen', 'build', 'match', 'input']);

for (const it of items) {
  if (!validTypes.has(it.type)) invalidQuestionTypes++;
  if (it.type === 'choice' || it.type === 'listen') {
    if (!it.options || it.options.length < 2 || !it.answer) invalidQuestionTypes++;
  } else if (it.type === 'build') {
    if (!it.words || !it.answer) invalidQuestionTypes++;
  } else if (it.type === 'match') {
    if (!it.pairs || it.pairs.length < 2) invalidQuestionTypes++;
  } else if (it.type === 'input') {
    if (!it.prompt || !it.answer) invalidQuestionTypes++;
  } else if (it.type === 'info') {
    if (!it.title || !it.body) invalidQuestionTypes++;
  }
}
check('All items have valid structural schemas and question types', invalidQuestionTypes === 0, `Errors: ${invalidQuestionTypes}`);

let missingItemRefs = 0;
for (let i = 1; i <= 6; i++) {
  const sData = JSON.parse(fs.readFileSync(path.join(courseDir, `s${i}.json`), 'utf8'));
  const unitList = Array.isArray(sData.units) ? sData.units : Object.values(sData.units);
  for (const u of unitList) {
    if (u.nodes) {
      if (Array.isArray(u.nodes)) {
        for (const n of u.nodes) {
          for (const iId of (n.items || [])) {
            if (!itemMap.has(iId)) missingItemRefs++;
          }
        }
      } else {
        for (const [nodeId, itemIds] of Object.entries(u.nodes)) {
          for (const iId of itemIds) {
            if (!itemMap.has(iId)) missingItemRefs++;
          }
        }
      }
    }
  }
}
check('100% of node item references exist in items.json', missingItemRefs === 0, `Missing: ${missingItemRefs}`);

// -----------------------------------------------------------------
// 4. Stories & Placement Diagnostics
// -----------------------------------------------------------------
console.log('\n--- 4. Stories & Placement Engine ---');
const storiesRaw = JSON.parse(fs.readFileSync(path.join(courseDir, 'stories.json'), 'utf8'));
const stories = Object.values(storiesRaw.stories || storiesRaw);
check('stories.json contains 36 inquiry stories', stories.length === 36, `Found ${stories.length}`);

let missingStoryItems = 0;
for (const st of stories) {
  for (const step of (st.steps || [])) {
    if (step.id && !itemMap.has(step.id) && step.type !== 'line') missingStoryItems++;
  }
}
check('All story question items exist in item bank', missingStoryItems === 0, `Missing: ${missingStoryItems}`);

// Test placement bank sampling and evaluation
const mockCourse = createCourse(index);
for (let i = 1; i <= 6; i++) {
  mockCourse.register(JSON.parse(fs.readFileSync(path.join(courseDir, `s${i}.json`), 'utf8')));
}
mockCourse.register(itemsJsonRaw);

const placePlan10 = makePlacement(10, mockCourse);
const placePlan20 = makePlacement(20, mockCourse);
const placePlan30 = makePlacement(30, mockCourse);
check('Placement plan samples 10 items accurately', placePlan10.slots.length === 10, `Got ${placePlan10.slots.length}`);
check('Placement plan samples 20 items accurately', placePlan20.slots.length === 20, `Got ${placePlan20.slots.length}`);
check('Placement plan samples 30 items accurately', placePlan30.slots.length === 30, `Got ${placePlan30.slots.length}`);

// Simulate answering placement test (all correct vs mixed)
const allCorrectAnswers = placePlan20.slots.map(s => ({ id: s.id, ok: true }));
const report = placementReport(allCorrectAnswers, mockCourse);
check('Placement report produces recommended section', !!report.recommended);
check('Placement 100% correct recommends s6', report.recommended === 's6');

// -----------------------------------------------------------------
// 5. Game Engine State Simulation (Session, Hearts, Repair, XP)
// -----------------------------------------------------------------
console.log('\n--- 5. Game Logic Simulation ---');
const game = createGame({ storage: {}, course: mockCourse });

// Test 5.1 Lesson Session with In-Lesson Repair
const s1Unit1Node = index.sections[0].units[0].nodes[0];
const startOk = game.startSession('lesson', s1Unit1Node.id);
check('Session starts successfully', startOk === true);

const initialQueueLen = game.state.session.queue.length;
const firstItem = game.currentItem();
check('Current item is available', !!firstItem);

// Answer wrong to trigger In-Lesson Repair
if (isScored(firstItem)) {
  const wrongAns = 'THIS_IS_DEFINITELY_WRONG_123';
  const res = game.checkAnswer(wrongAns);
  check('Wrong answer returns ok=false', res.ok === false);
  check('Wrong answer queues item at end for repair', game.state.session.queue.length === initialQueueLen + 1);

  // Advance to next
  game.nextStep();
  check('Advanced to next item in queue', game.state.session.index === 1);
}

// Exit session
game.clearSession();
check('clearSession resets session state to null', game.state.session === null);

// Test 5.2 Boss Challenge 3 Hearts Limit
const bossNode = index.sections[0].units[0].nodes[4];
game.startSession('boss', bossNode.id);
check('Boss session initializes with 3 hearts', game.state.session.hearts === 3);

// Lose 3 hearts
for (let h = 3; h > 0; h--) {
  const it = game.currentItem();
  if (it && isScored(it)) {
    game.checkAnswer('__WRONG__');
    game.nextStep();
  } else if (it) {
    game.nextStep();
  }
}
check('Losing all hearts triggers failed session result', game.result && game.result.passed === false);
game.clearResult();

// Test 5.3 Daily Quests & Streaks
const streak = game.streak();
check('Streak calculation returns non-negative integer', typeof streak === 'number' && streak >= 0);
const todayXp = game.todayXp();
check('Today XP calculation returns non-negative integer', typeof todayXp === 'number' && todayXp >= 0);

// Test 5.4 Course Atlas & Next Adventure Recommender
const atlasHtml = courseAtlas(mockCourse, game, 's1');
check('courseAtlas generates valid HTML with 6 semester chips', atlasHtml.includes('atlas-grid') && (atlasHtml.match(/atlas-chip/g) || []).length >= 6);

const adv = nextAdventure(game, mockCourse, 's1');
check('nextAdventure recommends valid next node', !!adv && !!adv.id && !!adv.title);

// -----------------------------------------------------------------
// Summary
// -----------------------------------------------------------------
console.log('\n====================================================');
console.log(`QA SUMMARY: ${passCount} Passed, ${failCount} Failed.`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL JH QUEST QA VERIFICATIONS PASSED 100%!\n');
}
