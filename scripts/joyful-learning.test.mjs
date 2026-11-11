// scripts/joyful-learning.test.mjs
// Comprehensive verification suite for JH Joyful Learning, Subject Love, Knowledge Point Playground,
// Interactive Type A/B/C Question Archetype Drills, and Quest Story Enrichment.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { subjects, units } from '../dist/curriculum.js';
import { examTypesData, renderExamTypeAndExample } from '../dist/exam-types-data.js';
import {
  subjectLoveData,
  unitWonderData,
  renderHomeJoyfulHub,
  renderSubjectLoveBanner,
  renderUnitWonderSection,
  renderUnitKnowledgePlayground,
  getJoyfulStats
} from '../dist/joyful-learning.js';

test('1. Subject Love Engine: 100% coverage of all 21 subjects with real-life superpowers', () => {
  assert.equal(subjects.length, 21);
  for (const s of subjects) {
    const p = subjectLoveData[s.id];
    assert.ok(p, `Missing subjectLoveData for ${s.id}`);
    assert.ok(p.superpower && p.superpower.length >= 6, `${s.id}: invalid superpower`);
    assert.ok(p.whyLoveIt && p.whyLoveIt.length >= 30, `${s.id}: whyLoveIt too short`);
    assert.ok(Array.isArray(p.realLifeMagic) && p.realLifeMagic.length === 3, `${s.id}: must have 3 realLifeMagic items`);
    assert.ok(p.joyfulHack && p.joyfulHack.length >= 20, `${s.id}: joyfulHack too short`);
    assert.ok(p.cheer && p.cheer.includes('知知貓頭鷹'), `${s.id}: cheer must include mascot`);

    const subUnits = units.filter(u => u.subject === s.id);
    const html = renderSubjectLoveBanner(s.id, subUnits);
    assert.ok(html.includes(p.superpower), `${s.id}: banner must render superpower`);
    assert.ok(!html.includes('undefined') && !html.includes('NaN'), `${s.id}: banner has undefined/NaN`);
  }
});

test('2. Unit Wonder, Mnemonics, 3D Flip Cards & Blitz Mini-Game: 100% coverage across 188 units', () => {
  assert.equal(units.length, 188);
  for (const u of units) {
    const w = unitWonderData[u.id];
    assert.ok(w, `Missing unitWonderData for ${u.id}`);
    assert.ok(w.lifeConnection && w.lifeConnection.length >= 30, `${u.id}: lifeConnection too short`);
    assert.ok(w.funFact && w.funFact.length >= 30, `${u.id}: funFact too short`);
    assert.ok(w.mnemonic && w.mnemonic.includes('快樂秒殺口訣'), `${u.id}: mnemonic missing header`);
    assert.ok(w.curiosityQ && w.curiosityA, `${u.id}: missing curiosity Q&A`);

    assert.equal(w.kpFlipCards.length, 3, `${u.id}: must have 3 KP flip cards`);
    for (const fc of w.kpFlipCards) {
      assert.ok(fc.id && fc.title && fc.frontPrompt && fc.backRule && fc.backExample && fc.backTip, `${u.id}: incomplete flip card`);
    }

    assert.equal(w.kpBlitz.length, 3, `${u.id}: must have 3 KP blitz questions`);
    for (const bq of w.kpBlitz) {
      assert.equal(bq.options.length, 4, `${u.id}: blitz question must have 4 options`);
      assert.equal(new Set(bq.options).size, 4, `${u.id}: blitz options must be distinct`);
      assert.ok(bq.answer >= 0 && bq.answer <= 3, `${u.id}: invalid blitz answer index`);
    }

    const wonderHtml = renderUnitWonderSection(u);
    const playHtml = renderUnitKnowledgePlayground(u);
    assert.ok(wonderHtml.includes('step-unit-wonder') && wonderHtml.includes(u.title), `${u.id}: wonder section render check`);
    assert.ok(playHtml.includes('step-kp-playground') && playHtml.includes('kp-blitz-opt-btn'), `${u.id}: playground render check`);
    assert.ok(!wonderHtml.includes('undefined') && !playHtml.includes('undefined'), `${u.id}: rendered HTML contains undefined`);
  }
});

test('3. Interactive Possible Question Archetype Drills (Type A / B / C): 564 drills across 188 units', () => {
  let totalDrills = 0;
  for (const u of units) {
    const d = examTypesData[u.id];
    assert.ok(d && Array.isArray(d.questionTypeList) && d.questionTypeList.length === 3, `${u.id}: must have 3 questionTypeList items`);
    for (const qt of d.questionTypeList) {
      const drill = qt.archetypeDrill;
      assert.ok(drill, `${u.id} ${qt.code}: missing archetypeDrill`);
      assert.ok(drill.stem && drill.stem.length >= 20, `${u.id} ${qt.code}: stem too short`);
      assert.ok(Array.isArray(drill.options) && drill.options.length === 4, `${u.id} ${qt.code}: must have 4 options`);
      assert.equal(new Set(drill.options).size, 4, `${u.id} ${qt.code}: options must be distinct`);
      assert.ok(drill.answer >= 0 && drill.answer <= 3, `${u.id} ${qt.code}: invalid answer index`);
      assert.ok(drill.explanation && drill.explanation.length >= 20, `${u.id} ${qt.code}: explanation too short`);
      totalDrills++;
    }
    const html = renderExamTypeAndExample(u);
    const drillBtns = html.match(/class="archetype-drill-opt-btn"/g) || [];
    assert.equal(drillBtns.length, 12, `${u.id}: must render 12 archetype-drill-opt-btn buttons (4 per Type A/B/C)`);
  }
  assert.equal(totalDrills, 564);
});

test('4. Home Joyful Hub & Quest Course Integration Verification', () => {
  const homeHtml = renderHomeJoyfulHub({}, units, subjects);
  assert.ok(homeHtml.includes('joyful-home-hub') && homeHtml.includes('btn-spin-wonder-roulette'));
  assert.ok(!homeHtml.includes('undefined') && !homeHtml.includes('NaN'));

  const stats = getJoyfulStats(units, subjects);
  assert.equal(stats.totalSubjects, 21);
  assert.equal(stats.totalUnits, 188);
  assert.equal(stats.totalKPs, 564);
  assert.equal(stats.totalArchetypes, 564);

  const itemsData = JSON.parse(fs.readFileSync('dist/quest/course/items.json', 'utf8'));
  const storyQuestions = Object.values(itemsData.items || itemsData).filter(it => it.kind === 'story');
  assert.equal(storyQuestions.length, 36, 'Must have 36 story questions');
  for (const sq of storyQuestions) {
    assert.equal(sq.options.length, 4);
    assert.equal(new Set(sq.options).size, 4);
    for (const opt of sq.options) {
      assert.ok(!opt.includes('與情境相反之錯誤推論'), `${sq.id}: still contains generic placeholder distractor`);
    }
  }

  const s1 = JSON.parse(fs.readFileSync('dist/quest/course/s1.json', 'utf8'));
  const firstGuide = Object.values(s1.units)[0].guide;
  assert.ok(firstGuide.unitWonder && firstGuide.unitWonder.mnemonic, 'Quest guide must include unitWonder and mnemonic');
});
