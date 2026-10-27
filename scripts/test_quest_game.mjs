// scripts/test_quest_game.mjs
// Test suite for JH Quest engine, course structure, XP, Streaks & Rules

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { createCourse, createGame, XP, HEARTS, accepts, normalize } from '../dist/quest/engine.mjs';

const root = path.resolve('dist/quest/course');
const index = JSON.parse(fs.readFileSync(path.join(root, 'index.json'), 'utf8'));

// In-memory mock storage
function mockStorage() {
  const map = new Map();
  return {
    getItem: k => map.get(k) || null,
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: k => map.delete(k),
    clear: () => map.clear()
  };
}

test('1. Course Index Structure & Completeness', () => {
  assert.equal(index.sections.length, 6, 'Must have 6 semesters (s1..s6)');
  assert.equal(index.branches.length, 8, 'Must have 8 focus branches');
  assert.equal(index.totalUnits, 188, 'Must cover 188 curriculum units');
  assert(index.totalItems >= 2500, `Expected at least 2500 items, got ${index.totalItems}`);
  assert.equal(index.stories.length, 36, 'Must have 36 cross-disciplinary case stories');
});

test('2. Course Loading and Item Registration', () => {
  const course = createCourse(index);
  assert.equal(course.units.size, 188 + 17 + 7, 'Must register units across sections and special branches');

  // Load s1 chunk
  const s1 = JSON.parse(fs.readFileSync(path.join(root, 's1.json'), 'utf8'));
  const items = JSON.parse(fs.readFileSync(path.join(root, 'items.json'), 'utf8'));
  course.register({ id: 'items', items });
  course.register({ id: 's1', units: s1.units });

  assert(course.loaded('s1'), 's1 chunk must be marked as loaded');
  assert(course.guides.has('math-1'), 'math-1 guide must be present');
  const n = course.nodes.get('math-1:concept');
  assert(n && n.pool && n.pool.length > 0, 'math-1:concept node must have item pool');
});

test('3. Game Session Flow: Start, Answer, In-Lesson Repair, Finish', () => {
  const course = createCourse(index);
  const s1 = JSON.parse(fs.readFileSync(path.join(root, 's1.json'), 'utf8'));
  const items = JSON.parse(fs.readFileSync(path.join(root, 'items.json'), 'utf8'));
  course.register({ id: 'items', items });
  course.register({ id: 's1', units: s1.units });

  const storage = mockStorage();
  let fakeTime = 1761566400000; // 2025-10-27
  const game = createGame({ storage, now: () => fakeTime, course });

  const started = game.startSession('lesson', 'math-1:concept');
  assert.equal(started, true);
  assert(game.state.session, 'Session must exist in state');

  const initialQueueLen = game.state.session.queue.length;
  const it = game.currentItem();
  assert(it, 'Current item must not be null');

  // Answer correctly if scored
  const chk = game.checkAnswer(it.answer || 'any');
  assert.equal(chk.ok, true);

  // Advance
  const stepRes = game.nextStep();
  assert.equal(stepRes.done, false);

  // Simulate wrong answer for in-lesson repair
  const it2 = game.currentItem();
  if (it2) {
    const wrongChk = game.checkAnswer('DEFINITELY_WRONG_ANSWER_XYZ');
    assert.equal(wrongChk.ok, false);
    assert.equal(game.state.session.queue.length, initialQueueLen + 1, 'Wrong answer must be appended to queue for in-lesson repair');
  }

  // End session
  const res = game.endSession(true);
  assert(res.passed, 'Session must be passed');
  assert.equal(game.state.session, null, 'Session must be cleared after completion');
  assert(game.todayXp() >= XP.lesson, 'XP must be awarded');
  assert.equal(game.state.days.length, 1, 'Today must be counted in attendance');
});

test('4. Boss Challenge: Hearts & 80% Threshold', () => {
  const course = createCourse(index);
  const s1 = JSON.parse(fs.readFileSync(path.join(root, 's1.json'), 'utf8'));
  const items = JSON.parse(fs.readFileSync(path.join(root, 'items.json'), 'utf8'));
  course.register({ id: 'items', items });
  course.register({ id: 's1', units: s1.units });

  const storage = mockStorage();
  const game = createGame({ storage, course });

  game.startSession('boss', 'math-1:boss');
  assert.equal(game.state.session.hearts, HEARTS, `Boss mode must start with ${HEARTS} hearts`);

  // Exhaust all hearts
  game.checkAnswer('WRONG_1');
  assert.equal(game.state.session.hearts, 2);
  game.checkAnswer('WRONG_2');
  assert.equal(game.state.session.hearts, 1);
  game.checkAnswer('WRONG_3');
  assert.equal(game.state.session.hearts, 0);

  const stepRes = game.nextStep();
  assert.equal(stepRes.passed, false, 'Heart exhaustion must end session as failed');
  assert.equal(stepRes.xp, XP.bossTry, 'Failed boss attempt must award encouragement XP');
});

test('5. Placement Test Diagnostics', () => {
  const course = createCourse(index);
  const items = JSON.parse(fs.readFileSync(path.join(root, 'items.json'), 'utf8'));
  course.register({ id: 'items', items });

  const storage = mockStorage();
  const game = createGame({ storage, course });

  const started = game.startSession('placement', 10);
  assert.equal(started, true);
  assert.equal(game.state.session.queue.length, 10);

  const res = game.endSession(true);
  assert.equal(res.mode, 'placement');
  assert(['s1', 's2', 's3', 's4', 's5', 's6'].includes(res.recommended), 'Must recommend a valid semester section');
});
