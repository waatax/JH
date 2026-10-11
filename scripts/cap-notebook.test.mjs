import test from 'node:test';
import assert from 'node:assert/strict';
import {
  recordCapQuestionResult,
  toggleCapBookmark,
  isCapBookmarked,
  getCapWrongQuestions,
  getCapBookmarkedQuestions,
  getCapNotebookStats,
  renderCapNotebookSummaryHtml
} from '../dist/cap-notebook.js';

test('CAP Notebook - Record Results & Track Wrong Questions', () => {
  // Test wrong attempt
  const rec1 = recordCapQuestionResult('115-math-1', '115-math', 'B', false, 1000);
  assert.equal(rec1.attempts, 1);
  assert.equal(rec1.wrongCount, 1);
  assert.equal(rec1.lastAttemptCorrect, false);

  // Test another question (correct)
  const rec2 = recordCapQuestionResult('115-math-2', '115-math', 'A', true, 1100);
  assert.equal(rec2.attempts, 1);
  assert.equal(rec2.wrongCount, 0);
  assert.equal(rec2.lastAttemptCorrect, true);

  // Check wrong questions list
  const wrongList = getCapWrongQuestions('math', '115');
  assert.ok(wrongList.some(r => r.qid === '115-math-1'));
  assert.ok(!wrongList.some(r => r.qid === '115-math-2'));

  // Retest 115-math-1 as correct
  const rec1Updated = recordCapQuestionResult('115-math-1', '115-math', 'C', true, 1200);
  assert.equal(rec1Updated.attempts, 2);
  assert.equal(rec1Updated.wrongCount, 1);
  assert.equal(rec1Updated.lastAttemptCorrect, true);

  // Now it shouldn't be in the active wrong list
  const wrongListAfter = getCapWrongQuestions('math', '115');
  assert.ok(!wrongListAfter.some(r => r.qid === '115-math-1'));
});

test('CAP Notebook - Starred Bookmarks Toggle', () => {
  const qid = '114-chinese-5';
  assert.equal(isCapBookmarked(qid), false);

  const isStarred = toggleCapBookmark(qid);
  assert.equal(isStarred, true);
  assert.equal(isCapBookmarked(qid), true);

  const isUnstarred = toggleCapBookmark(qid);
  assert.equal(isUnstarred, false);
  assert.equal(isCapBookmarked(qid), false);
});

test('CAP Notebook - Stats & Summary HTML Card', () => {
  recordCapQuestionResult('113-social-10', '113-social', 'A', false);
  toggleCapBookmark('113-social-10');

  const stats = getCapNotebookStats();
  assert.ok(stats.totalPracticed >= 1);
  assert.ok(stats.bookmarkedCount >= 1);

  const html = renderCapNotebookSummaryHtml();
  assert.ok(html.includes('歷屆會考錯題筆記本'));
  assert.ok(html.includes('panel'));
});
