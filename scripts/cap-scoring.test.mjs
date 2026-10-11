import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCapGrade, getCapGradeBadgeHtml, getCapGradeSummaryCardHtml } from '../dist/cap-scoring.js';

test('CAP Scoring - Chinese 42 Questions (111~115)', () => {
  const r1 = calculateCapGrade({ year: 115, subject: 'chinese', choiceCorrect: 41, choiceTotal: 42 });
  assert.equal(r1.grade, 'A++');
  assert.equal(r1.level, 'A');

  const r2 = calculateCapGrade({ year: 115, subject: 'chinese', choiceCorrect: 38, choiceTotal: 42 });
  assert.equal(r2.grade, 'A+');

  const r3 = calculateCapGrade({ year: 115, subject: 'chinese', choiceCorrect: 33, choiceTotal: 42 });
  assert.equal(r3.grade, 'B++');

  const r4 = calculateCapGrade({ year: 115, subject: 'chinese', choiceCorrect: 15, choiceTotal: 42 });
  assert.equal(r4.grade, 'C');
});

test('CAP Scoring - Math Weighted (85% choice + 15% written)', () => {
  // Full marks: 25/25 choice + 6/6 written = 100
  const r1 = calculateCapGrade({ year: 115, subject: 'math', choiceCorrect: 25, choiceTotal: 25, writtenScore: 6 });
  assert.equal(r1.grade, 'A++');
  assert.equal(r1.weightedScore, 100);

  // 24/25 choice (81.6) + 5/6 written (12.5) = 94.1 -> A++
  const r2 = calculateCapGrade({ year: 115, subject: 'math', choiceCorrect: 24, choiceTotal: 25, writtenScore: 5 });
  assert.equal(r2.grade, 'A++');
  assert.ok(r2.weightedScore >= 93.5);

  // 21/25 choice (71.4) + 4/6 written (10.0) = 81.4 -> A
  const r3 = calculateCapGrade({ year: 115, subject: 'math', choiceCorrect: 21, choiceTotal: 25, writtenScore: 4 });
  assert.equal(r3.grade, 'A');

  // Low score: 8/25 choice + 1/6 written = 27.2 + 2.5 = 29.7 -> C
  const r4 = calculateCapGrade({ year: 115, subject: 'math', choiceCorrect: 8, choiceTotal: 25, writtenScore: 1 });
  assert.equal(r4.grade, 'C');
});

test('CAP Scoring - English Weighted (80% read + 20% listen)', () => {
  // 43/43 read + 21/21 listen = 100 -> A++
  const r1 = calculateCapGrade({ year: 115, subject: 'english', choiceCorrect: 43, choiceTotal: 43, listeningCorrect: 21 });
  assert.equal(r1.grade, 'A++');
  assert.equal(r1.weightedScore, 100);

  // Reading only (no listening): 40/43 = 93.0 -> A+
  const r2 = calculateCapGrade({ year: 115, subject: 'english', choiceCorrect: 40, choiceTotal: 43 });
  assert.equal(r2.grade, 'A+');
  assert.equal(r2.weightedScore, 93);
});

test('CAP Scoring - Social (54Q) & Science (50Q)', () => {
  const socA = calculateCapGrade({ year: 115, subject: 'social', choiceCorrect: 53, choiceTotal: 54 });
  assert.equal(socA.grade, 'A++');

  const sciA = calculateCapGrade({ year: 115, subject: 'science', choiceCorrect: 48, choiceTotal: 50 });
  assert.equal(sciA.grade, 'A++');

  const sciB = calculateCapGrade({ year: 115, subject: 'science', choiceCorrect: 35, choiceTotal: 50 });
  assert.equal(sciB.grade, 'B+');
});

test('CAP Scoring - HTML Badge & Card Generators', () => {
  const res = calculateCapGrade({ year: 115, subject: 'math', choiceCorrect: 24, choiceTotal: 25, writtenScore: 6 });
  const badgeHtml = getCapGradeBadgeHtml(res);
  assert.ok(badgeHtml.includes('精熟 A++'), 'Badge must include grade label');
  assert.ok(badgeHtml.includes('cap-grade-badge'), 'Badge must have class');

  const cardHtml = getCapGradeSummaryCardHtml(res);
  assert.ok(cardHtml.includes('會考落點等級'), 'Card must have heading');
  assert.ok(cardHtml.includes('官方加權計算分數'), 'Card must have score explanation');
});
