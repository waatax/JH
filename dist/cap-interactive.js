// dist/cap-interactive.js
// 國中教育會考歷屆全科全真題庫、互動模考、逐題精解與 108 課綱教學貫通模組
import { units, subjects, subjectById, unitById } from './curriculum.js';
import { calculateCapGrade, getCapGradeSummaryCardHtml } from './cap-scoring.js';
import { recordCapQuestionResult, toggleCapBookmark, isCapBookmarked, getCapWrongQuestions, renderCapNotebookSummaryHtml } from './cap-notebook.js';

let cachedBank = null;
let currentSession = null;
let examTimerInterval = null;
let currentAudio = null;

const CAP_SESSION_PREFIX = 'cap-session-v1:';
const CAP_RESULTS_KEY = 'cap-practice-history-v1';

const SUBJECT_CONFIG = {
  chinese: { name: '國語文', short: '國文', minutes: 70, color: '#3f51b5', icon: '文' },
  english: { name: '英語（閱讀）', short: '英讀', minutes: 60, color: '#00897b', icon: '英' },
  listening: { name: '英語（聽力）', short: '英聽', minutes: 25, color: '#00acc1', icon: '聽' },
  math: { name: '數學科', short: '數學', minutes: 80, color: '#689f38', icon: 'π' },
  social: { name: '社會科', short: '社會', minutes: 70, color: '#f57c00', icon: '社' },
  science: { name: '自然科', short: '自然', minutes: 70, color: '#0288d1', icon: '自' },
};

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const formatTime = sec => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export function stopCapView() {
  clearInterval(examTimerInterval);
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

export async function loadCapBank() {
  if (cachedBank) return cachedBank;
  const res = await fetch(new URL('./cap-bank.json', import.meta.url));
  if (!res.ok) throw new Error('無法載入會考歷屆題庫資料');
  cachedBank = await res.json();
  return cachedBank;
}

// --------------------------------------------------------------------------
// 1. 會考歷屆題庫總覽頁面 (#/pastpapers)
// --------------------------------------------------------------------------
export async function capLandingPage(container) {
  stopCapView();
  container.innerHTML = `
    <div class="eyebrow">CAP OFFICIAL EXAM BANK · 109–115</div>
    <h1>近七年國中教育會考全科題庫與全真模考</h1>
    <p class="intro muted">完整載入 109 至 115 年（共七個年度、41 場考科、1,674 道官方試題原圖與標準答案）。全真計時模擬、逐題精解診斷，每題皆完整對齊 108 課綱教學單元。</p>
    <div class="panel" style="text-align:center;padding:40px 20px;">載入題庫大數據中...</div>
  `;

  try {
    const bank = await loadCapBank();
    const years = [115, 114, 113, 112, 111, 110, 109];
    const subKeys = ['chinese', 'english', 'listening', 'math', 'social', 'science'];

    // Calculate days until 116 CAP (2027-05-15)
    const targetDate = new Date(2027, 4, 15);
    const now = new Date();
    const diffTime = targetDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Group papers
    const papers = {};
    for (const q of bank.questions) {
      const pid = `${q.year}-${q.subject}`;
      (papers[pid] ??= {
        year: q.year,
        subject: q.subject,
        count: 0,
        choiceCount: 0,
        writtenCount: 0,
        avgPassRate: 0,
        ratesSum: 0,
        ratesN: 0,
      });
      papers[pid].count++;
      if (q.kind === 'written') papers[pid].writtenCount++;
      else papers[pid].choiceCount++;
      if (q.analysis?.passRate) {
        papers[pid].ratesSum += q.analysis.passRate;
        papers[pid].ratesN++;
      }
    }
    for (const p of Object.values(papers)) {
      p.avgPassRate = p.ratesN > 0 ? (p.ratesSum / p.ratesN * 100).toFixed(1) : null;
    }

    let activeSubject = 'math';
    let activeYear = 'all';

    const render = () => {
      const urlParams = new URLSearchParams(location.hash.split('?')[1] || '');
      const filterWrong = urlParams.get('filter') === 'wrong';
      const wrongList = filterWrong ? getCapWrongQuestions() : [];

      const filteredPapers = Object.values(papers).filter(p => {
        if (activeSubject !== 'all' && p.subject !== activeSubject) return false;
        if (activeYear !== 'all' && p.year !== Number(activeYear)) return false;
        return true;
      }).sort((a, b) => b.year - a.year || subKeys.indexOf(a.subject) - subKeys.indexOf(b.subject));

      container.innerHTML = `
        <div class="eyebrow">CAP OFFICIAL EXAM BANK · 109–115</div>
        <h1>近七年國中教育會考全科題庫與全真模考</h1>
        <p class="intro muted">完整載入 109 至 115 年（共七個年度、41 場考科、1,674 道官方試題原圖與標準答案）。全真計時模擬、逐題精解診斷，每題皆完整對齊 108 課綱教學單元。</p>

        <!-- 116 會考倒數英雄卡 -->
        <section class="panel cap-countdown-card" style="background:linear-gradient(135deg, var(--surface), var(--surface-alt));border-left:5px solid var(--brand);margin-bottom:24px;">
          <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
            <div>
              <span class="tag accent">📅 距離 116 年國中教育會考</span>
              <h2 style="margin:8px 0 4px;font-size:1.8rem;">還有 <strong style="color:var(--brand);font-size:2.2rem;">${diffDays > 0 ? diffDays : 0}</strong> 天</h2>
              <p class="muted" style="margin:0;">考試日期：2027 年 5 月 15 日（六）～ 5 月 16 日（日）· 把握黃金複習週期，循序練習歷屆真題！</p>
            </div>
            <div class="stats" style="margin:0;">
              <div><strong>7 個年度</strong><small class="muted">109~115 會考</small></div>
              <div><strong>41 場考卷</strong><small class="muted">全科官方真題</small></div>
              <div><strong>1,674 道題</strong><small class="muted">100% 完整載入</small></div>
              <div><strong>100% 解說</strong><small class="muted">對齊 108 課綱</small></div>
            </div>
          </div>
        </section>

        <!-- 錯題筆記本與智能收藏總覽卡片 -->
        ${renderCapNotebookSummaryHtml()}

        ${filterWrong ? `
          <section class="panel" style="border-left:5px solid #c94c34;margin-bottom:24px;">
            <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h2 style="margin:0;color:#c94c34;">📕 待加強錯題精準專項清單 (${wrongList.length} 題)</h2>
              <a class="button small secondary" href="#/pastpapers">← 顯示全科歷屆試卷</a>
            </div>
            ${wrongList.length ? `
              <div class="grid" style="grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:14px;">
                ${wrongList.map(item => {
                  const q = bank.questions.find(x => x.id === item.qid);
                  if (!q) return '';
                  const cfg = SUBJECT_CONFIG[q.subject] || { short: q.subject };
                  const u = q.unitIds?.[0] ? unitById[q.unitIds[0]] : null;
                  return `
                    <div class="unit-card" style="padding:14px;background:var(--surface);border-top:3px solid #c94c34;">
                      <div class="row" style="justify-content:space-between;margin-bottom:6px;">
                        <span class="tag" style="background:#fff3f0;color:#c94c34;font-weight:700;">${q.year} 年 · ${cfg.short} 第 ${q.number} 題</span>
                        <span class="subtle">錯誤 ${item.wrongCount} 次</span>
                      </div>
                      ${u ? `<p style="margin:4px 0 10px;font-size:0.9rem;font-weight:600;">${esc(u.title)}</p>` : ''}
                      <div class="actions" style="margin-top:10px;display:flex;gap:8px;">
                        <a class="button small" href="#/cap-exam/${q.year}-${q.subject}?mode=practice&q=${q.number}" style="flex:1;text-align:center;">💡 逐題重練</a>
                        ${u ? `<a class="button small secondary" href="#/lesson/${u.id}">📖 單元</a>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <p class="muted" style="margin:8px 0 0;">目前無待加強錯題，太棒了！所有已練題目均已完全掌握。</p>
            `}
          </section>
        ` : ''}

        <!-- 考科與年度篩選工具列 -->
        <div class="panel" style="margin-bottom:24px;">
          <div class="filters" style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
            <label><strong>考科篩選：</strong>
              <select id="cap-subject-select">
                <option value="all" ${activeSubject === 'all' ? 'selected' : ''}>全部考科</option>
                ${subKeys.map(k => `<option value="${k}" ${activeSubject === k ? 'selected' : ''}>${SUBJECT_CONFIG[k].name}</option>`).join('')}
              </select>
            </label>
            <label><strong>考試年度：</strong>
              <select id="cap-year-select">
                <option value="all" ${activeYear === 'all' ? 'selected' : ''}>全部年度 (109~115)</option>
                ${years.map(y => `<option value="${y}" ${activeYear === String(y) ? 'selected' : ''}>${y} 年 (${y + 1911})</option>`).join('')}
              </select>
            </label>
            <span class="subtle" style="margin-left:auto;">共篩選出 ${filteredPapers.length} 卷歷屆試題</span>
          </div>
        </div>

        <!-- 考卷卡片清單 -->
        <div class="grid" style="grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:20px;margin-bottom:32px;">
          ${filteredPapers.map(p => {
            const cfg = SUBJECT_CONFIG[p.subject];
            const pid = `${p.year}-${p.subject}`;
            return `
              <div class="unit-card" style="border-top:4px solid ${cfg.color};display:flex;flex-direction:column;justify-content:space-between;background:var(--surface);">
                <div>
                  <div class="row" style="justify-content:space-between;margin-bottom:8px;">
                    <span class="tag" style="background:${cfg.color}15;color:${cfg.color};font-weight:700;">${p.year} 年 · ${cfg.name}</span>
                    <span class="subtle">${cfg.minutes} 分鐘 · ${p.count} 題${p.writtenCount ? ` (含非選 ${p.writtenCount})` : ''}</span>
                  </div>
                  <h3 style="margin:6px 0 10px;">${p.year} 年國中教育會考 ${cfg.short}</h3>
                  <p class="muted" style="font-size:0.9rem;line-height:1.5;">
                    ${p.subject === 'listening' ? '🎧 官方英語聽力測驗，支援逐題官方原音播放與錄音稿對照。' : '包含選擇題、原圖裁切、官方標準答案、通過率大數據與完整 108 課綱對應。'}
                  </p>
                  ${p.avgPassRate ? `<div style="font-size:0.85rem;color:var(--text-muted);margin:8px 0;">📊 官方全卷平均通過率：<strong>${p.avgPassRate}%</strong></div>` : ''}
                </div>
                <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px;">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                    <a class="button small" href="#/cap-exam/${pid}?mode=exam" title="依會考時間限制全真計時練習">⏱️ 全真模考</a>
                    <a class="button small secondary" href="#/cap-exam/${pid}?mode=practice" title="做一題看一題詳解與考綱對照">💡 逐題精練</a>
                  </div>
                  <a class="button small ghost" href="#/cap-exam/${pid}?mode=browse" style="text-align:center;">📖 試題全覽與課綱速查</a>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- 108 課綱歷屆出題重點與趨勢熱力表 -->
        <section class="panel" style="margin-top:32px;">
          <h2>108 課綱會考重點分佈與出題頻率熱力表</h2>
          <p class="muted">大數據分析 109~115 年共 1,674 道題目所對應之 108 課綱國中教學單元，點選單元名稱可直接前往觀念教學頁面複習。</p>
          <div class="table-wrap" style="max-height:480px;overflow-y:auto;">
            <table class="teaching-table">
              <thead>
                <tr>
                  <th>考科</th>
                  <th>108 課綱核心單元</th>
                  <th>年級</th>
                  <th>出題頻率 (7年)</th>
                  <th>複習捷徑</th>
                </tr>
              </thead>
              <tbody>
                ${units.filter(u => ['math', 'chinese', 'english', 'biology', 'physics', 'chemistry', 'earth', 'history', 'geography', 'civics'].includes(u.subject)).slice(0, 45).map(u => {
                  const hits = bank.questions.filter(q => q.unitIds && q.unitIds.includes(u.id));
                  return `
                    <tr>
                      <td><span class="tag">${subjectById[u.subject]?.name || u.subject}</span></td>
                      <td><strong>${esc(u.title)}</strong><br><small class="muted">${esc(u.concept.split('。')[0])}。</small></td>
                      <td>${u.grade} 年級</td>
                      <td><span class="tag accent" style="font-weight:700;">${hits.length} 題</span></td>
                      <td><a class="button small secondary" href="#/lesson/${u.id}">前往教學單元 →</a></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </section>
      `;

      container.querySelector('#cap-subject-select').onchange = e => {
        activeSubject = e.target.value;
        render();
      };
      container.querySelector('#cap-year-select').onchange = e => {
        activeYear = e.target.value;
        render();
      };
    };

    render();
  } catch (err) {
    container.innerHTML = `
      <div class="panel">
        <h2>資料載入錯誤</h2>
        <p class="notice">${esc(err.message)}</p>
        <button class="button" onclick="location.reload()">重新整理</button>
      </div>
    `;
  }
}

// --------------------------------------------------------------------------
// 2. 會考全真線上測驗與逐題精解頁面 (#/cap-exam/:paperId)
// --------------------------------------------------------------------------
export async function capExamPage(container, paperId) {
  stopCapView();
  if (!paperId) {
    location.hash = '#/pastpapers';
    return;
  }

  container.innerHTML = `
    <div class="panel" style="text-align:center;padding:40px 20px;">載入試卷題目與官方題圖中...</div>
  `;

  try {
    const bank = await loadCapBank();
    const paperQuestions = bank.questions.filter(q => `${q.year}-${q.subject}` === paperId);
    if (!paperQuestions.length) {
      container.innerHTML = `<div class="panel"><h2>找不到此考卷</h2><p>試卷代碼：${esc(paperId)}</p><a class="button" href="#/pastpapers">返回題庫首頁</a></div>`;
      return;
    }

    const groupsMap = new Map(bank.groups.map(g => [g.id, g]));
    const firstQ = paperQuestions[0];
    const cfg = SUBJECT_CONFIG[firstQ.subject] || { name: firstQ.subject, short: firstQ.subject, minutes: 60 };

    // Parse URL params for mode and initial question
    const params = new URLSearchParams(location.hash.split('?')[1] || '');
    const mode = params.get('mode') || 'practice'; // 'exam' | 'practice' | 'browse'
    let cursor = 0;
    if (params.get('q')) {
      const qNum = Number(params.get('q'));
      const idx = paperQuestions.findIndex(q => q.number === qNum);
      if (idx !== -1) cursor = idx;
    }

    // Session State
    const sessionKey = `${CAP_SESSION_PREFIX}${paperId}:${mode}`;
    let savedState = null;
    try {
      savedState = JSON.parse(localStorage.getItem(sessionKey));
    } catch {}

    const session = savedState || {
      paperId,
      mode,
      answers: {},
      revealed: mode === 'browse' ? Object.fromEntries(paperQuestions.map(q => [q.id, true])) : {},
      marked: {},
      scratchpad: {},
      startedAt: Date.now(),
      deadline: mode === 'exam' ? Date.now() + cfg.minutes * 60 * 1000 : null,
      submitted: mode === 'browse',
    };

    paperQuestions.forEach(item => {
      if (session.marked[item.id] === undefined && isCapBookmarked(item.id)) {
        session.marked[item.id] = true;
      }
    });

    const saveSession = () => {
      try {
        localStorage.setItem(sessionKey, JSON.stringify(session));
      } catch {}
    };

    // Timer management
    if (session.mode === 'exam' && session.deadline && !session.submitted) {
      examTimerInterval = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((session.deadline - Date.now()) / 1000));
        const timerEl = document.getElementById('cap-timer-display');
        if (timerEl) timerEl.textContent = formatTime(remaining);
        if (remaining <= 0) {
          clearInterval(examTimerInterval);
          session.submitted = true;
          saveSession();
          alert('考試時間已到！系統已自動交卷。');
          render();
        }
      }, 1000);
    }

    const render = () => {
      const q = paperQuestions[cursor];
      const isAnswered = session.answers[q.id] !== undefined;
      const userAns = session.answers[q.id];
      const isRevealed = session.revealed[q.id] || session.submitted || mode === 'browse';
      const isCorrect = userAns === q.answer;
      const group = q.groupId ? groupsMap.get(q.groupId) : null;
      const ex = q.explanation || {};
      const primaryUnitId = (q.unitIds && q.unitIds[0]) || (ex.unitIds && ex.unitIds[0]);
      const primaryUnit = primaryUnitId ? unitById[primaryUnitId] : null;

      // Calculate progress
      const answeredCount = Object.keys(session.answers).length;
      const totalCount = paperQuestions.length;

      container.innerHTML = `
        <article class="cap-exam-container" style="max-width:1080px;margin:0 auto;">
          <!-- 頂部資訊列與導航 -->
          <div class="lesson-header-nav" style="margin-bottom:16px;">
            <a class="breadcrumb" href="#/pastpapers">← 返回會考題庫總覽</a>
            <div style="display:flex;align-items:center;gap:12px;">
              <span class="tag" style="background:${cfg.color}15;color:${cfg.color};font-weight:700;">${firstQ.year} 年 · ${cfg.name}</span>
              <span class="tag accent">${mode === 'exam' ? '⏱️ 全真模考' : mode === 'practice' ? '💡 逐題實戰' : '📖 詳解速查'}</span>
              ${session.deadline && !session.submitted ? `
                <div class="timer" id="cap-timer-display" style="font-size:1.1rem;font-weight:800;color:var(--brand);background:var(--surface);padding:4px 12px;border-radius:20px;border:1px solid var(--border);">
                  ${formatTime(Math.max(0, Math.ceil((session.deadline - Date.now()) / 1000)))}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- 考場鍵盤 HUD 快捷提示列 -->
          <div class="cap-keyboard-hud">
            <span>快捷鍵：<kbd>1~4</kbd> / <kbd>A~D</kbd> 作答</span>
            <span><kbd>←</kbd> / <kbd>→</kbd> 切換題目</span>
            <span><kbd>M</kbd> 標記此題</span>
            <span><kbd>Z</kbd> 放大試題圖</span>
            <span><kbd>Enter</kbd> 核對/下一題</span>
          </div>

          <!-- 題號進度與跳轉宮格 -->
          <div class="panel" style="padding:14px 18px;margin-bottom:20px;">
            <div class="row" style="justify-content:space-between;margin-bottom:10px;align-items:center;">
              <span style="font-weight:700;">進度：第 ${cursor + 1} / ${totalCount} 題 (已作答 ${answeredCount}/${totalCount})</span>
              <div style="display:flex;gap:8px;">
                <button class="button small ghost" id="mark-question-btn">${session.marked[q.id] ? '★ 取消標記' : '☆ 標記此題'}</button>
                ${!session.submitted && mode === 'exam' ? `<button class="button small" id="submit-cap-exam-btn">提前交卷</button>` : ''}
              </div>
            </div>
            <progress value="${answeredCount}" max="${totalCount}" style="width:100%;height:6px;border-radius:3px;margin-bottom:12px;"></progress>
            <div class="cap-question-nav-grid" style="display:flex;flex-wrap:wrap;gap:6px;max-height:90px;overflow-y:auto;padding:2px;">
              ${paperQuestions.map((item, idx) => {
                const ans = session.answers[item.id];
                const isCur = idx === cursor;
                const isM = session.marked[item.id];
                let bg = 'var(--surface-alt)';
                let color = 'var(--text)';
                let border = '1px solid var(--border)';
                if (ans !== undefined) {
                  if (session.submitted) {
                    bg = ans === item.answer ? '#eef8ee' : '#fff3f0';
                    border = ans === item.answer ? '1px solid #378b4a' : '1px solid #c94c34';
                  } else {
                    bg = 'var(--brand)';
                    color = '#ffffff';
                  }
                }
                if (isCur) border = '2px solid var(--accent)';
                return `
                  <button class="cap-q-nav-btn" data-nav-idx="${idx}" style="min-width:32px;height:32px;padding:0 6px;border-radius:6px;background:${bg};color:${color};border:${border};font-size:0.8rem;font-weight:${isCur ? '800' : '500'};cursor:pointer;">
                    ${isM ? '★' : ''}${item.number}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- 主作答區：支援題組雙欄或上下分割 -->
          <div class="cap-question-card panel" style="padding:24px;margin-bottom:24px;">
            ${group ? `
              <div class="cap-group-passage-box" style="background:var(--surface-alt);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:24px;">
                <div style="font-weight:700;color:var(--brand);margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
                  <span>📑 題組閱讀材料 (第 ${group.range[0]}～${group.range[1]} 題)</span>
                  <span class="subtle">共用篇章</span>
                </div>
                ${group.crops && group.crops.length ? `
                  <div style="text-align:center;margin:12px 0;">
                    ${group.crops.map(c => `
                      <img src="./${c.src}" alt="題組材料圖" class="zoomable-img" style="max-width:100%;border-radius:8px;border:1px solid var(--border);box-shadow:0 2px 8px rgba(0,0,0,0.05);cursor:zoom-in;">
                    `).join('')}
                  </div>
                ` : ''}
                ${group.text ? `<div style="white-space:pre-wrap;line-height:1.7;font-size:0.95rem;color:var(--text);">${esc(group.text)}</div>` : ''}
              </div>
            ` : ''}

            <!-- 題幹資訊 -->
            <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:14px;">
              <span class="tag accent" style="font-size:0.95rem;">第 ${q.number} 題 ${q.kind === 'written' ? '(非選擇題)' : ''}</span>
              ${q.analysis?.passRate ? `
                <span class="tag" style="background:#e8f4fd;color:#0277bd;font-weight:600;">
                  📊 官方通過率：${(q.analysis.passRate * 100).toFixed(0)}%
                </span>
              ` : ''}
            </div>

            <!-- 聽力音訊控制 -->
            ${q.audio ? `
              <div class="cap-audio-player-box callout" style="margin-bottom:18px;background:#e0f7fa;border-left:4px solid #00acc1;">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                  <button class="button" id="play-official-audio-btn">🔊 播放官方錄音 (原音 MP3)</button>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span class="subtle">語速:</span>
                    <button class="button small ghost cap-rate-btn" data-rate="0.8">0.8x</button>
                    <button class="button small ghost cap-rate-btn active" data-rate="1.0">1.0x</button>
                    <button class="button small ghost cap-rate-btn" data-rate="1.2">1.2x</button>
                  </div>
                  <button class="button small secondary" id="toggle-transcript-btn">查看官方錄音稿</button>
                </div>
                <div id="cap-transcript-content" style="display:none;margin-top:12px;padding-top:12px;border-top:1px dashed #b2ebf2;font-size:0.9rem;line-height:1.6;">
                  <strong>官方錄音稿 (Transcript)：</strong><br>${esc(q.analysis?.transcript || '請聆聽音檔')}
                </div>
              </div>
            ` : ''}

            <!-- 題目裁切高清原圖 (100% 忠實還原符號、圖表、地圖與幾何) -->
            ${q.crops && q.crops.length ? `
              <div class="cap-question-crops-wrap" style="text-align:center;margin:16px 0 24px;">
                ${q.crops.map(c => `
                  <img src="./${c.src}" alt="第 ${q.number} 題試題圖" class="zoomable-img" style="max-width:100%;border-radius:8px;border:1px solid var(--border);box-shadow:0 3px 12px rgba(0,0,0,0.06);cursor:zoom-in;">
                `).join('')}
                <div class="subtle" style="margin-top:6px;font-size:0.8rem;">🔍 點選圖片可放大檢視</div>
              </div>
            ` : ''}

            <!-- 選擇題選項按鈕 -->
            ${q.kind !== 'written' ? `
              <div class="cap-options-group" style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
                ${(q.optionLetters ? q.optionLetters.split('') : ['A', 'B', 'C', 'D']).map(letter => {
                  const optText = q.options && q.options[letter] ? q.options[letter] : '';
                  const isSelected = userAns === letter;
                  let btnClass = 'option';
                  if (isSelected) btnClass += ' selected';
                  if (isRevealed) {
                    if (letter === q.answer) btnClass += ' correct';
                    else if (isSelected && !isCorrect) btnClass += ' wrong';
                  }
                  return `
                    <button class="${btnClass} cap-opt-btn" data-letter="${letter}" ${session.submitted || (isRevealed && mode === 'practice') ? '' : ''} style="display:flex;align-items:flex-start;text-align:left;gap:12px;padding:12px 16px;font-size:1rem;">
                      <span class="pill" style="min-width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;">${letter}</span>
                      <span style="flex:1;line-height:1.5;">${esc(optText) || `選擇 (${letter})`}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            ` : `
              <!-- 非選擇題作答手寫板 / 自評 -->
              <div class="cap-written-box" style="margin-bottom:24px;">
                <label for="written-scratchpad"><strong>我的解題思路與算式過程：</strong></label>
                <textarea id="written-scratchpad" style="width:100%;min-height:160px;margin:8px 0;padding:12px;border-radius:8px;border:1px solid var(--border);font-family:monospace;" placeholder="請在此記錄推導步驟或算式...">${esc(session.scratchpad[q.id] || '')}</textarea>
                <button class="button small secondary" id="save-scratchpad-btn">儲存草稿</button>
              </div>
            `}

            <!-- 逐題練習即時核對按鈕 -->
            ${mode === 'practice' && !isRevealed ? `
              <div style="margin-bottom:20px;">
                <button class="button" id="check-single-answer-btn" ${!isAnswered && q.kind !== 'written' ? 'disabled' : ''}>核對答案與查看詳解</button>
              </div>
            ` : ''}

            <!-- 深度解說與課綱對應面板 (Revealed Explanation) -->
            ${isRevealed ? `
              <div class="explanation ${isCorrect ? 'correct' : 'wrong'}" style="margin-top:24px;padding:20px;border-radius:12px;line-height:1.7;">
                <div class="explanation-header" style="margin-bottom:12px;">
                  <span class="result-icon">${isCorrect ? '✓ 答對了！' : '⚠️ 需要補強'}</span>
                  <strong>${q.kind === 'written' ? '官方非選擇題參考解法與評分規準' : `官方標準答案：${q.answer}`}</strong>
                </div>

                <!-- 官方大數據考情分析 -->
                ${q.analysis ? `
                  <div class="callout" style="background:var(--surface);margin-bottom:16px;border-left:4px solid var(--brand);">
                    <div style="font-weight:700;color:var(--brand);margin-bottom:6px;">📊 官方試題大數據分析：</div>
                    <div class="row" style="gap:16px;flex-wrap:wrap;font-size:0.9rem;">
                      <div>全體通過率：<strong>${(q.analysis.passRate * 100).toFixed(1)}%</strong></div>
                      <div>鑑別度：<strong>${(q.analysis.discrimination || 0).toFixed(2)}</strong></div>
                      ${q.analysis.passBySkill ? `
                        <div>精熟級通過率：<strong>${((q.analysis.passBySkill['精熟'] || 0) * 100).toFixed(0)}%</strong></div>
                        <div>待加強級：<strong>${((q.analysis.passBySkill['待加強'] || 0) * 100).toFixed(0)}%</strong></div>
                      ` : ''}
                    </div>
                    ${q.analysis.optionPercent ? `
                      <div style="margin-top:8px;font-size:0.85rem;">
                        <strong>考生選項分佈：</strong>
                        ${Object.entries(q.analysis.optionPercent).map(([L, pct]) => `
                          <span style="display:inline-block;margin-right:12px;${L === q.answer ? 'color:#2e7d32;font-weight:700;' : ''}">
                            (${L}) ${pct}%
                          </span>
                        `).join('')}
                      </div>
                    ` : ''}
                  </div>
                ` : ''}

                <!-- 解題關鍵 -->
                <div style="margin-bottom:14px;">
                  <h4 style="margin:0 0 4px;color:var(--brand);">🎯 核心破題關鍵 (Key Idea)：</h4>
                  <p style="margin:0;font-size:0.95rem;">${esc(ex.keyIdea || '掌握核心觀念與條件關係')}</p>
                </div>

                <!-- 階梯解題思維步驟 -->
                <div style="margin-bottom:14px;">
                  <h4 style="margin:0 0 6px;color:var(--brand);">📐 階梯式解題思維鏈 (Steps)：</h4>
                  <ol style="margin:0;padding-left:20px;">
                    ${(ex.steps || []).map(st => `<li style="margin-bottom:4px;">${esc(st)}</li>`).join('')}
                  </ol>
                </div>

                <!-- 選項深度診斷 -->
                ${ex.options && Object.keys(ex.options).length ? `
                  <div style="margin-bottom:14px;">
                    <h4 style="margin:0 0 6px;color:var(--brand);">🔍 選項逐一深度辨析：</h4>
                    <div style="display:flex;flex-direction:column;gap:6px;font-size:0.9rem;">
                      ${Object.entries(ex.options).map(([L, desc]) => `
                        <div style="padding:6px 10px;border-radius:6px;background:var(--surface);border:1px solid var(--border);">
                          <strong>(${L})</strong> ${esc(desc)}
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- 避坑防呆陷阱 -->
                ${ex.trap ? `
                  <div style="margin-bottom:16px;">
                    <h4 style="margin:0 0 4px;color:#c94c34;">🛡️ 考場避坑防呆指南 (Pitfall Defense)：</h4>
                    <p style="margin:0;font-size:0.9rem;color:var(--text);">${esc(ex.trap)}</p>
                  </div>
                ` : ''}

                <!-- 應對 108 課綱教學頁面捷徑按鈕 (核心需求) -->
                ${primaryUnit ? `
                  <div class="callout" style="background:var(--surface);border:2px solid var(--accent);margin-top:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                    <div>
                      <span class="tag accent">對齊 108 課綱學習單元</span>
                      <h4 style="margin:4px 0;">${esc(primaryUnit.title)} (${primaryUnit.grade} 年級・${primaryUnit.term === 1 ? '上' : '下'}學期)</h4>
                      <p class="muted" style="margin:0;font-size:0.85rem;">${esc(primaryUnit.concept.split('。')[0])}。</p>
                    </div>
                    <a class="button small" href="#/lesson/${primaryUnit.id}?return=cap&paper=${paperId}&q=${q.number}" style="font-weight:700;">
                      📖 前往課綱教學頁面複習 →
                    </a>
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- 底部換題控制 -->
            <div class="actions" style="margin-top:28px;display:flex;justify-content:space-between;">
              <button class="button secondary" id="cap-prev-btn" ${cursor === 0 ? 'disabled' : ''}>← 上一題</button>
              <div style="display:flex;gap:10px;">
                ${cursor < totalCount - 1 ? `<button class="button" id="cap-next-btn">下一題 →</button>` : ''}
                ${!session.submitted ? `<button class="button ${cursor === totalCount - 1 ? '' : 'secondary'}" id="cap-finish-btn">交卷並查看診斷</button>` : `<a class="button" href="#/cap-result/${paperId}">查看完整診斷報告</a>`}
              </div>
            </div>
          </div>
        </article>

        <!-- 圖片放大浮層 Modal (Lightbox) -->
        <div id="img-modal-backdrop" class="modal-backdrop" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;align-items:center;justify-content:center;cursor:zoom-out;">
          <img id="img-modal-content" src="" style="max-width:92%;max-height:92%;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,0.5);">
        </div>
      `;

      // Event listeners
      container.querySelectorAll('.cap-q-nav-btn').forEach(btn => {
        btn.onclick = () => {
          cursor = Number(btn.dataset.navIdx);
          render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
      });

      container.querySelectorAll('.cap-opt-btn').forEach(btn => {
        btn.onclick = () => {
          if (session.submitted && mode !== 'browse') return;
          session.answers[q.id] = btn.dataset.letter;
          if (mode === 'browse') session.revealed[q.id] = true;
          saveSession();
          render();
        };
      });

      const markBtn = container.querySelector('#mark-question-btn');
      if (markBtn) {
        markBtn.onclick = () => {
          const isStarred = toggleCapBookmark(q.id);
          session.marked[q.id] = isStarred;
          saveSession();
          render();
        };
      }

      const checkSingleBtn = container.querySelector('#check-single-answer-btn');
      if (checkSingleBtn) {
        checkSingleBtn.onclick = () => {
          session.revealed[q.id] = true;
          if (session.answers[q.id] !== undefined) {
            recordCapQuestionResult(q.id, paperId, session.answers[q.id], session.answers[q.id] === q.answer);
          }
          saveSession();
          render();
        };
      }

      const prevBtn = container.querySelector('#cap-prev-btn');
      if (prevBtn) prevBtn.onclick = () => { cursor--; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

      const nextBtn = container.querySelector('#cap-next-btn');
      if (nextBtn) nextBtn.onclick = () => { cursor++; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

      const recordAllChoiceAnswers = () => {
        for (const item of paperQuestions) {
          if (item.kind !== 'written' && session.answers[item.id] !== undefined) {
            recordCapQuestionResult(item.id, paperId, session.answers[item.id], session.answers[item.id] === item.answer);
          }
        }
      };

      const finishBtn = container.querySelector('#cap-finish-btn');
      if (finishBtn) {
        finishBtn.onclick = () => {
          const un = totalCount - Object.keys(session.answers).length;
          if (un > 0 && !confirm(`尚有 ${un} 題尚未作答，確定要交卷嗎？`)) return;
          recordAllChoiceAnswers();
          session.submitted = true;
          saveSession();
          location.hash = `#/cap-result/${paperId}`;
        };
      }

      const submitExamBtn = container.querySelector('#submit-cap-exam-btn');
      if (submitExamBtn) {
        submitExamBtn.onclick = () => {
          if (confirm('確定要提前交卷嗎？')) {
            recordAllChoiceAnswers();
            session.submitted = true;
            saveSession();
            location.hash = `#/cap-result/${paperId}`;
          }
        };
      }

      // Audio handlers
      const audioBtn = container.querySelector('#play-official-audio-btn');
      if (audioBtn) {
        audioBtn.onclick = () => {
          if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
            audioBtn.textContent = '🔊 播放官方錄音 (原音 MP3)';
            return;
          }
          currentAudio = new Audio(`./${q.audio}`);
          currentAudio.play();
          audioBtn.textContent = '⏸ 暫停播放';
          currentAudio.onended = () => {
            audioBtn.textContent = '🔊 再次播放官方錄音';
            currentAudio = null;
          };
        };
      }

      const toggleTransBtn = container.querySelector('#toggle-transcript-btn');
      if (toggleTransBtn) {
        toggleTransBtn.onclick = () => {
          const box = container.querySelector('#cap-transcript-content');
          if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
        };
      }

      // Scratchpad handler
      const scratchBtn = container.querySelector('#save-scratchpad-btn');
      if (scratchBtn) {
        scratchBtn.onclick = () => {
          const ta = container.querySelector('#written-scratchpad');
          if (ta) {
            session.scratchpad[q.id] = ta.value;
            saveSession();
            alert('草稿已儲存於本機！');
          }
        };
      }

      // Lightbox Zoom handlers
      const modalBackdrop = container.querySelector('#img-modal-backdrop');
      const modalImg = container.querySelector('#img-modal-content');
      container.querySelectorAll('.zoomable-img').forEach(img => {
        img.onclick = () => {
          modalImg.src = img.src;
          modalBackdrop.style.display = 'flex';
        };
      });
      if (modalBackdrop) {
        modalBackdrop.onclick = () => {
          modalBackdrop.style.display = 'none';
        };
      }
    };

    render();
  } catch (err) {
    container.innerHTML = `<div class="panel"><h2>測驗載入失敗</h2><p class="notice">${esc(err.message)}</p></div>`;
  }
}

// --------------------------------------------------------------------------
// 3. 會考模考診斷報告頁面 (#/cap-result/:paperId)
// --------------------------------------------------------------------------
export async function capResultPage(container, paperId) {
  stopCapView();
  container.innerHTML = `<div class="panel" style="text-align:center;padding:40px 20px;">計算診斷成績與課綱弱點中...</div>`;

  try {
    const bank = await loadCapBank();
    const paperQuestions = bank.questions.filter(q => `${q.year}-${q.subject}` === paperId);
    if (!paperQuestions.length) {
      container.innerHTML = `<div class="panel"><h2>找不到此考卷紀錄</h2><a class="button" href="#/pastpapers">返回題庫</a></div>`;
      return;
    }

    const sessionKey = `${CAP_SESSION_PREFIX}${paperId}:exam`;
    const practiceKey = `${CAP_SESSION_PREFIX}${paperId}:practice`;
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem(sessionKey)) || JSON.parse(localStorage.getItem(practiceKey));
    } catch {}

    if (!session) {
      container.innerHTML = `<div class="panel"><h2>尚未有此考卷之作答紀錄</h2><a class="button" href="#/cap-exam/${paperId}">立即開始測驗</a></div>`;
      return;
    }

    const firstQ = paperQuestions[0];
    const cfg = SUBJECT_CONFIG[firstQ.subject] || { name: firstQ.subject, short: firstQ.subject };

    // Score evaluation
    let correctCount = 0;
    let wrongQuestions = [];
    const unitErrors = {};

    for (const q of paperQuestions) {
      if (q.kind === 'written') continue;
      const userAns = session.answers[q.id];
      if (userAns === q.answer) {
        correctCount++;
      } else {
        wrongQuestions.push(q);
        const uId = q.unitIds?.[0] || q.explanation?.unitIds?.[0];
        if (uId) {
          unitErrors[uId] = (unitErrors[uId] || 0) + 1;
        }
      }
    }

    const totalChoice = paperQuestions.filter(q => q.kind !== 'written').length;
    const scorePct = totalChoice > 0 ? ((correctCount / totalChoice) * 100).toFixed(1) : 0;

    // Record question results into notebook
    for (const q of paperQuestions) {
      if (q.kind === 'written') continue;
      const userAns = session.answers[q.id];
      if (userAns !== undefined) {
        recordCapQuestionResult(q.id, paperId, userAns, userAns === q.answer);
      }
    }

    // Calculate official CAP grade (A++ to C)
    const gradeResult = calculateCapGrade({
      year: firstQ.year,
      subject: firstQ.subject,
      choiceCorrect: correctCount,
      choiceTotal: totalChoice,
      writtenScore: session.writtenScore || 0,
    });

    container.innerHTML = `
      <article class="cap-result-container" style="max-width:1000px;margin:0 auto;">
        <div class="eyebrow">CAP DIAGNOSTIC REPORT</div>
        <h1>${firstQ.year} 年國中教育會考 ${cfg.name} · 成果診斷報告</h1>
        <p class="muted">根據你的實際作答進行 108 課綱知識點交叉診斷，精準定位薄弱概念，提供階梯式補強指引。</p>

        <!-- 官方能力等級換算卡片 -->
        ${getCapGradeSummaryCardHtml(gradeResult)}

        <!-- 成績總覽英雄面板 -->
        <section class="panel" style="background:var(--surface);margin-bottom:24px;border-top:4px solid ${cfg.color};">
          <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;">
            <div>
              <span class="result-score" style="font-size:3rem;font-weight:900;color:var(--brand);">${correctCount} <small style="font-size:1.5rem;color:var(--text-muted);">/ ${totalChoice}</small></span>
              <p style="margin:6px 0;font-size:1.1rem;font-weight:700;">選擇題答對率：<strong>${scorePct}%</strong></p>
              <p class="subtle" style="margin:0;">完成作答時間：${new Date(session.startedAt).toLocaleDateString()}</p>
            </div>
            <div class="actions">
              <a class="button" href="#/cap-exam/${paperId}?mode=practice">💡 進入逐題模式檢討</a>
              <a class="button secondary" href="#/pastpapers">選擇下一份真題練習</a>
            </div>
          </div>
        </section>

        <!-- 108 課綱弱點單元雷達與補強推薦 (核心功能) -->
        <section class="panel" style="margin-bottom:24px;">
          <h2>🎯 108 課綱優先補強單元推薦</h2>
          <p class="muted">根據本次測驗的錯題，系統已為你抓出最需要重新複習的國中 108 課綱核心單元：</p>
          ${Object.keys(unitErrors).length ? `
            <div class="grid" style="grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px;">
              ${Object.entries(unitErrors).map(([uId, errCnt]) => {
                const u = unitById[uId];
                if (!u) return '';
                return `
                  <div class="unit-card" style="border-left:4px solid #c94c34;padding:14px;background:var(--surface-alt);">
                    <div class="row" style="justify-content:space-between;margin-bottom:4px;">
                      <span class="tag accent">${u.grade}年級·${u.term === 1 ? '上' : '下'}</span>
                      <span style="color:#c94c34;font-weight:700;font-size:0.85rem;">錯 ${errCnt} 題</span>
                    </div>
                    <h3 style="margin:4px 0 6px;font-size:1.1rem;">${esc(u.title)}</h3>
                    <p class="subtle" style="font-size:0.85rem;line-height:1.4;margin-bottom:10px;">${esc(u.concept.split('。')[0])}。</p>
                    <a class="button small secondary" href="#/lesson/${u.id}">📖 前往單元觀念與解題思維鏈 →</a>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="callout" style="background:#eef8ee;color:#2e7d32;">
              <strong>🎉 太厲害了！全卷選擇題完全答對！</strong><br>所有 108 課綱核心概念皆已熟練掌握，建議挑戰其他年度試題！
            </div>
          `}
        </section>

        <!-- 逐題核對與解析展開清單 -->
        <section class="panel">
          <h2>逐題作答與官方大數據解析</h2>
          <div class="stack" style="display:flex;flex-direction:column;gap:16px;">
            ${paperQuestions.map(q => {
              const uAns = session.answers[q.id];
              const isCorr = uAns === q.answer;
              const ex = q.explanation || {};
              const uId = q.unitIds?.[0] || ex.unitIds?.[0];
              const u = uId ? unitById[uId] : null;

              return `
                <details class="cap-review-item" style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 16px;" ${!isCorr ? 'open' : ''}>
                  <summary style="font-weight:700;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
                    <span>
                      <span style="color:${isCorr ? '#378b4a' : '#c94c34'};font-size:1.1rem;margin-right:8px;">${isCorr ? '✓' : '✗'}</span>
                      第 ${q.number} 題 ${u ? `· 【${esc(u.title)}】` : ''}
                    </span>
                    <span style="font-size:0.85rem;color:var(--text-muted);">
                      你的答案：<strong>${uAns || '未作答'}</strong> ｜ 正確答案：<strong style="color:#2e7d32;">${q.answer || '非選'}</strong>
                    </span>
                  </summary>
                  <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border);line-height:1.7;">
                    ${q.crops && q.crops.length ? `
                      <div style="text-align:center;margin-bottom:14px;">
                        ${q.crops.map(c => `<img src="./${c.src}" alt="試題圖" style="max-width:100%;border-radius:6px;border:1px solid var(--border);">`).join('')}
                      </div>
                    ` : ''}
                    <div style="background:var(--surface-alt);padding:12px;border-radius:8px;margin-bottom:12px;">
                      <strong>🎯 核心破題關鍵：</strong> ${esc(ex.keyIdea || '掌握核心條件')}<br>
                      ${(ex.steps || []).map(st => `<div style="font-size:0.9rem;margin-top:4px;">• ${esc(st)}</div>`).join('')}
                    </div>
                    ${u ? `
                      <a class="button small secondary" href="#/lesson/${u.id}">📖 回到「${esc(u.title)}」課綱教學頁面 →</a>
                    ` : ''}
                  </div>
                </details>
              `;
            }).join('')}
          </div>
        </section>
      </article>
    `;
  } catch (err) {
    container.innerHTML = `<div class="panel"><h2>診斷報告載入失敗</h2><p class="notice">${esc(err.message)}</p></div>`;
  }
}

// --------------------------------------------------------------------------
// 4. 教學單元頁面 (#/lesson/:id) 嵌入歷屆會考真題實戰區塊
// --------------------------------------------------------------------------
export async function renderLessonCapSection(unitId, container) {
  if (!unitId || !container) return;
  try {
    const bank = await loadCapBank();
    const matchingQs = bank.questions.filter(q => q.unitIds && q.unitIds.includes(unitId));
    if (!matchingQs.length) return;

    // Render dedicated CAP real exam challenge section
    const section = document.createElement('section');
    section.className = 'lesson-step cap-lesson-real-exam-step';
    section.style.marginTop = '28px';
    section.innerHTML = `
      <div class="step-label" style="background:#e8f4fd;color:#0277bd;font-weight:700;">CAP OFFICIAL EXAM CHALLENGE</div>
      <h2>🎯 歷屆會考真題實戰（過去七年真題 · 共 ${matchingQs.length} 題）</h2>
      <p class="muted">讀懂觀念後，立即檢驗大考實戰力！以下精選歷屆教育部正式會考考查本單元之題目與官方通過率：</p>

      <div class="cap-unit-questions-stack" style="display:flex;flex-direction:column;gap:18px;">
        ${matchingQs.slice(0, 5).map((q, idx) => {
          const cfg = SUBJECT_CONFIG[q.subject] || { short: q.subject };
          const ex = q.explanation || {};
          return `
            <div class="panel cap-unit-q-card" style="border-left:4px solid var(--brand);background:var(--surface);padding:18px;">
              <div class="row" style="justify-content:space-between;margin-bottom:10px;">
                <span class="tag" style="font-weight:700;">${q.year} 年會考 · ${cfg.short} 第 ${q.number} 題</span>
                ${q.analysis?.passRate ? `
                  <span class="tag accent">📊 全體通過率 ${(q.analysis.passRate * 100).toFixed(0)}%</span>
                ` : ''}
              </div>

              <!-- 試題圖 -->
              ${q.crops && q.crops.length ? `
                <div style="text-align:center;margin:12px 0;">
                  ${q.crops.map(c => `<img src="./${c.src}" alt="會考真題圖" style="max-width:100%;border-radius:6px;border:1px solid var(--border);">`).join('')}
                </div>
              ` : ''}

              <!-- 互動選項按鈕 -->
              <div class="cap-lesson-opt-group" style="display:flex;flex-wrap:wrap;gap:8px;margin:14px 0;">
                ${(q.optionLetters ? q.optionLetters.split('') : ['A', 'B', 'C', 'D']).map(L => `
                  <button class="button small secondary cap-inline-test-btn" data-qid="${q.id}" data-letter="${L}" data-ans="${q.answer}" style="min-width:70px;">
                    選項 (${L})
                  </button>
                `).join('')}
              </div>

              <!-- 反饋與詳解面板 -->
              <div id="inline-fb-${q.id}" style="display:none;margin-top:12px;padding:12px;border-radius:8px;background:var(--surface-alt);line-height:1.6;font-size:0.9rem;">
                <div id="inline-result-${q.id}" style="font-weight:700;margin-bottom:6px;"></div>
                <div><strong>🎯 解題關鍵：</strong>${esc(ex.keyIdea || '')}</div>
                <div><strong>📐 推理思維：</strong>${(ex.steps || []).join(' ')}</div>
                ${ex.trap ? `<div style="margin-top:4px;color:#c94c34;"><strong>🛡️ 避坑：</strong>${esc(ex.trap)}</div>` : ''}
                <div style="margin-top:8px;">
                  <a class="button small" href="#/cap-exam/${q.year}-${q.subject}?mode=practice&q=${q.number}">前往該年度考卷精解 →</a>
                </div>
              </div>
            </div>
          `;
        }).join('')}
        ${matchingQs.length > 5 ? `
          <div style="text-align:center;padding:12px;">
            <span class="subtle">本單元共於歷屆會考出現 ${matchingQs.length} 次，</span>
            <a class="button small secondary" href="#/pastpapers">前往歷屆會考題庫瀏覽全部 →</a>
          </div>
        ` : ''}
      </div>
    `;

    // Attach inline test handlers
    section.querySelectorAll('.cap-inline-test-btn').forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.qid;
        const chosen = btn.dataset.letter;
        const ans = btn.dataset.ans;
        const fbBox = section.querySelector(`#inline-fb-${qid}`);
        const resText = section.querySelector(`#inline-result-${qid}`);
        if (!fbBox || !resText) return;

        const isCorr = chosen === ans;
        const qObj = matchingQs.find(x => x.id === qid);
        if (qObj) {
          recordCapQuestionResult(qid, `${qObj.year}-${qObj.subject}`, chosen, isCorr);
        }

        fbBox.style.display = 'block';
        if (isCorr) {
          resText.style.color = '#2e7d32';
          resText.textContent = `✓ 恭喜答對！正確答案為 (${ans})`;
        } else {
          resText.style.color = '#c94c34';
          resText.textContent = `⚠️ 選擇 (${chosen}) 不正確，官方標準答案為 (${ans})`;
        }
      };
    });

    container.appendChild(section);
  } catch {}
}
