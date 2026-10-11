// dist/cap-notebook.js
// 國中教育會考歷屆錯題筆記本、星號收藏與智能間隔回練系統

const NOTEBOOK_RECORDS_KEY = 'cap-notebook-records-v1';
const NOTEBOOK_BOOKMARKS_KEY = 'cap-notebook-bookmarks-v1';

// In-memory fallback if localStorage is unavailable
let memRecords = {};
let memBookmarks = [];

function getStorage() {
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return {
    getItem: k => (k === NOTEBOOK_RECORDS_KEY ? JSON.stringify(memRecords) : JSON.stringify(memBookmarks)),
    setItem: (k, v) => {
      if (k === NOTEBOOK_RECORDS_KEY) memRecords = JSON.parse(v);
      else memBookmarks = JSON.parse(v);
    }
  };
}

export function loadCapRecords() {
  try {
    const raw = getStorage().getItem(NOTEBOOK_RECORDS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCapRecords(records) {
  try {
    getStorage().setItem(NOTEBOOK_RECORDS_KEY, JSON.stringify(records));
  } catch {}
}

export function loadCapBookmarks() {
  try {
    const raw = getStorage().getItem(NOTEBOOK_BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCapBookmarks(bookmarks) {
  try {
    getStorage().setItem(NOTEBOOK_BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch {}
}

/**
 * 記錄一題會考真題的作答結果
 */
export function recordCapQuestionResult(qid, paperId, userAns, isCorrect, timestamp = Date.now()) {
  if (!qid) return;
  const records = loadCapRecords();
  const current = records[qid] || {
    qid,
    paperId,
    attempts: 0,
    wrongCount: 0,
    history: []
  };

  current.attempts++;
  if (!isCorrect) {
    current.wrongCount++;
  }
  current.lastAttemptCorrect = isCorrect;
  current.lastAnswer = userAns;
  current.updatedAt = timestamp;
  current.history.push({
    at: timestamp,
    userAns,
    isCorrect
  });
  // Keep last 10 attempts
  if (current.history.length > 10) {
    current.history = current.history.slice(-10);
  }

  records[qid] = current;
  saveCapRecords(records);
  return current;
}

/**
 * 收藏 / 取消收藏會考真題
 */
export function toggleCapBookmark(qid) {
  if (!qid) return false;
  const bookmarks = loadCapBookmarks();
  const idx = bookmarks.indexOf(qid);
  let isStarred = false;
  if (idx === -1) {
    bookmarks.push(qid);
    isStarred = true;
  } else {
    bookmarks.splice(idx, 1);
    isStarred = false;
  }
  saveCapBookmarks(bookmarks);
  return isStarred;
}

export function isCapBookmarked(qid) {
  if (!qid) return false;
  const bookmarks = loadCapBookmarks();
  return bookmarks.includes(qid);
}

/**
 * 取得待加強錯題清單（最近一次答錯者）
 */
export function getCapWrongQuestions(subject = 'all', year = 'all') {
  const records = loadCapRecords();
  return Object.values(records).filter(r => {
    if (r.lastAttemptCorrect) return false;
    if (subject !== 'all' && !r.paperId.includes(subject)) return false;
    if (year !== 'all' && !r.paperId.startsWith(String(year))) return false;
    return true;
  }).sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * 取得收藏試題清單
 */
export function getCapBookmarkedQuestions(subject = 'all') {
  const bookmarks = loadCapBookmarks();
  if (subject === 'all') return bookmarks;
  return bookmarks.filter(qid => qid.includes(subject));
}

/**
 * 取得錯題本總體統計數據
 */
export function getCapNotebookStats() {
  const records = loadCapRecords();
  const bookmarks = loadCapBookmarks();
  const values = Object.values(records);
  const wrongList = values.filter(r => !r.lastAttemptCorrect);
  const masteredList = values.filter(r => r.lastAttemptCorrect && r.attempts >= 1);

  const subjectStats = {};
  for (const r of values) {
    const parts = r.paperId.split('-');
    const sub = parts[1] || 'other';
    subjectStats[sub] ??= { total: 0, wrong: 0, mastered: 0 };
    subjectStats[sub].total++;
    if (!r.lastAttemptCorrect) subjectStats[sub].wrong++;
    else subjectStats[sub].mastered++;
  }

  return {
    totalPracticed: values.length,
    wrongCount: wrongList.length,
    masteredCount: masteredList.length,
    bookmarkedCount: bookmarks.length,
    subjectStats
  };
}

/**
 * 產出錯題筆記本總覽 HTML 卡片
 */
export function renderCapNotebookSummaryHtml() {
  const stats = getCapNotebookStats();
  return `
    <section class="panel cap-notebook-summary-panel" style="background:var(--surface);border-left:5px solid #c94c34;margin-bottom:24px;">
      <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <span class="tag accent" style="background:#fff3f0;color:#c94c34;font-weight:700;">📕 歷屆會考錯題筆記本</span>
          <h2 style="margin:6px 0 4px;">累積待加強錯題：<strong style="color:#c94c34;">${stats.wrongCount}</strong> 題</h2>
          <p class="muted" style="margin:0;font-size:0.9rem;">
            已練習 ${stats.totalPracticed} 題真題 · 已精通回練 ${stats.masteredCount} 題 · 已收藏 ${stats.bookmarkedCount} 題重點
          </p>
        </div>
        <div class="actions" style="margin:0;">
          ${stats.wrongCount > 0 ? `
            <a class="button small" href="#/pastpapers?filter=wrong" style="background:#c94c34;color:#fff;">
              ⚡ 立即專項重練錯題 (${stats.wrongCount})
            </a>
          ` : `
            <span class="tag" style="background:#eef8ee;color:#2e7d32;font-weight:700;">✓ 目前無未補強錯題</span>
          `}
        </div>
      </div>
    </section>
  `;
}
