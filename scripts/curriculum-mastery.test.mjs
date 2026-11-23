// scripts/curriculum-mastery.test.mjs
// Verifies the 4-Pillar Deep Curriculum Upgrade (學會 · 學好 · 有興趣 · 會應用):
// 1. Topic-alignment guard for all 14 repaired teaching tables
// 2. Zero robotic/cartoon distractors in Joyful Learning (564 Blitz Qs)
// 3. 14 interactive labs across 8 subjects & lesson-to-lab deep linking
// 4. 188-unit Real-World Application Engine & #/apply Hub

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { subjects, units, questions } from '../dist/curriculum.js';
import { teachingTables } from '../dist/teaching.js';
import { exegesisData } from '../dist/exegesis-data.js';
import { unitWonderData } from '../dist/joyful-learning.js';
import { LAB_CATALOG, getLabsForUnit } from '../dist/labs.js';
import {
  LIFE_THEMES,
  realWorldAppsData,
  getRealWorldApp,
  computeFourPillarMetrics,
  renderFourPillarBanner,
  renderLessonRealWorldStudio,
  renderApplyHubPage
} from '../dist/realworld-apps.js';

test('1. Curriculum Topic-Alignment Guard: All 14 repaired teaching tables match their true unit topics', () => {
  const expected = {
    'physics-8': /浮力|阿基米德/,
    'physics-9': /液體壓力|大氣壓力|流體靜壓力/,
    'physics-11': /靜電|庫侖/,
    'earth-6': /溫室效應|氣候變遷/,
    'earth-10': /引潮力|潮汐/,
    'earth-12': /日食|月食|太陽系/,
    'biology-13': /神經系統|大腦|腦幹/,
    'geography-3': /人口|產業|都市/,
    'geography-9': /季風亞洲|稻作/,
    'geography-12': /西亞|中亞|伊斯蘭|石油/,
    'civics-10': /地方自治|地方創生/,
    'english-8': /頻率副詞|can|There is/,
    'health-2': /飲食|營養標示/,
    'home-1': /家庭合作|分工/,
    'home-2': /飲食製備|衣物/,
    'home-3': /消費規劃|預算/,
    'scout-2': /指北針|定向/,
    'scout-3': /無痕山林|服務/,
    'local-3': /臺灣手語|手形|非手控/
  };
  for (const [id, rx] of Object.entries(expected)) {
    const tbl = teachingTables[id];
    assert.ok(tbl, `Missing teaching table for ${id}`);
    const fullText = tbl.title + ' ' + tbl.rows.flat().join(' ');
    assert.ok(rx.test(fullText), `${id} teaching table mismatch! Got title: "${tbl.title}"`);
    assert.ok(!fullText.includes('民間民間'), `${id} still contains duplicate typo`);
    const ex = exegesisData[id];
    assert.ok(ex && rx.test(JSON.stringify(ex.definitions)), `${id} exegesisData definitions mismatch!`);
  }
});

test('2. Joyful Learning Quality Guard: Zero fake 80% stats & zero cartoon Blitz distractors across 564 questions', () => {
  for (const u of units) {
    const w = unitWonderData[u.id];
    assert.ok(w, `Missing unitWonderData for ${u.id}`);
    assert.ok(!w.funFact.includes('高達 80%'), `${u.id}: fabricated 80% boilerplate still present`);
    for (const bq of w.kpBlitz) {
      assert.equal(bq.options.length, 4);
      assert.equal(new Set(bq.options).size, 4, `${u.id} ${bq.id}: duplicate blitz options`);
      for (const opt of bq.options) {
        assert.ok(!opt.includes('故意違反'), `${u.id} ${bq.id}: cartoon distractor found`);
        assert.ok(!opt.includes('算出第一個數字就直接作答'), `${u.id} ${bq.id}: generic distractor found`);
      }
    }
  }
});

test('3. Interactive Labs Expansion: 14 labs across 8 subjects with multi-subject lesson deep links', () => {
  assert.equal(LAB_CATALOG.length, 14);
  const coveredSubjects = new Set(LAB_CATALOG.map(l => l.subject));
  for (const s of ['math', 'physics', 'chemistry', 'biology', 'earth', 'english', 'civics', 'computing']) {
    assert.ok(coveredSubjects.has(s), `Missing lab coverage for subject ${s}`);
  }
  const labsSource = fs.readFileSync('dist/labs.js', 'utf8');
  for (const lab of LAB_CATALOG) {
    assert.ok(labsSource.includes(`id="${lab.id}"`), `dist/labs.js missing section id="${lab.id}"`);
  }
  assert.ok(getLabsForUnit(units.find(u => u.id === 'physics-8')).some(l => l.id === 'lab-buoyancy'));
  assert.ok(getLabsForUnit(units.find(u => u.id === 'civics-5')).some(l => l.id === 'lab-supply'));
  assert.ok(getLabsForUnit(units.find(u => u.id === 'computing-1')).some(l => l.id === 'lab-search'));
  assert.ok(getLabsForUnit(units.find(u => u.id === 'math-19')).some(l => l.id === 'lab-prob'));
});

test('4. Real-World Application Dataset & 4-Pillar Mastery Engine: 100% 188-unit coverage & clean rendering', () => {
  assert.equal(LIFE_THEMES.length, 6);
  assert.equal(Object.keys(realWorldAppsData).length, 188);
  const themeIds = new Set(LIFE_THEMES.map(t => t.id));

  for (const u of units) {
    const app = getRealWorldApp(u.id);
    assert.ok(app, `Missing realWorldApp for ${u.id}`);
    assert.ok(themeIds.has(app.themeId), `${u.id}: invalid themeId ${app.themeId}`);
    assert.ok(app.plainIntuition.length >= 25, `${u.id}: plainIntuition too short`);
    assert.equal(app.decisionChallenge.options.length, 3, `${u.id}: decisionChallenge must have 3 options`);
    assert.equal(new Set(app.decisionChallenge.options).size, 3, `${u.id}: decisionChallenge options must be distinct`);
    assert.ok(app.decisionChallenge.answer >= 0 && app.decisionChallenge.answer <= 2);
    assert.ok(app.actionMission.length >= 15);
    assert.equal(app.careers.length, 3);

    const studioHtml = renderLessonRealWorldStudio(u, {});
    assert.ok(studioHtml.includes('id="step-realworld"') && studioHtml.includes('rwa-dec-opt'), `${u.id}: missing studio HTML`);
    assert.ok(!studioHtml.includes('undefined') && !studioHtml.includes('NaN'), `${u.id}: studio HTML contains undefined/NaN`);
  }

  const metrics = computeFourPillarMetrics({
    read: ['math-1', 'physics-8'],
    appliedDecisions: { 'math-1': true },
    appliedMissions: { 'math-1': true },
    labsVisited: ['lab-buoyancy', 'lab-linear']
  }, units, questions);
  assert.equal(metrics.pillars.length, 4);
  assert.ok(metrics.pillars.every(p => p.pct >= 0 && p.pct <= 100));
  assert.equal(metrics.decisionsDone, 1);
  assert.equal(metrics.missionsDone, 1);
  assert.equal(metrics.labsVisitedCount, 2);

  const bannerHtml = renderFourPillarBanner({}, units, questions);
  assert.ok(bannerHtml.includes('rwa-pillar-strip') && !bannerHtml.includes('undefined'));

  const hubHtml = renderApplyHubPage({}, units, subjects, questions, 'all', '');
  assert.ok(hubHtml.includes('rwa-hub-hero') && hubHtml.includes('rwa-lab-grid') && !hubHtml.includes('undefined'));
});

test('5. Integration Guard: index.html, app.js & sw.js properly register 4-Pillar Apply Engine', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8');
  const app = fs.readFileSync('dist/app.js', 'utf8');
  const sw = fs.readFileSync('dist/sw.js', 'utf8');
  assert.ok(html.includes('./realworld-apps.css') && html.includes('#/apply'));
  assert.ok(app.includes('renderApplyHubPage') && app.includes('wireLessonRealWorldStudio') && app.includes('getLabsForUnit'));
  assert.ok(sw.includes('./realworld-apps.js') && sw.includes('./realworld-apps-data.js') && sw.includes('./realworld-apps.css'));
});
