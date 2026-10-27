// dist/quest/view.mjs
// Interactive view controller & DOM renderer for JH Quest
// Duolingo-Like gamification with 108 Curriculum 6-semester mastery, S-curve trail,
// weekly league leaderboard, unit treasure chests, and multi-modal practice.

import { createCourse, createGame, isScored, shuffle, XP, HEARTS, BADGES, LEAGUES } from './engine.mjs?v=20261027v2';
import * as sound from './sound.mjs?v=20261027v2';
import { answerText, correctionTip } from './coach.mjs?v=20261027v2';
import { courseAtlas, nextAdventure } from './atlas.mjs?v=20261027v2';

const V = '20261027v2';
const root = document.querySelector('#game');
let storage;
try { storage = globalThis.localStorage; } catch {}

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const TABS = [
  ['learn', '🏠', '學習'],
  ['practice', '💪', '練習'],
  ['leaderboard', '🏆', '聯賽'],
  ['stories', '📖', '故事'],
  ['library', '📚', '教材'],
  ['profile', '🙂', '我的']
];

const PRAISE = ['太棒了！', '答對了！', '概念非常清楚！', '完全正確！', '漂亮！', '你做到了！'];
const KIND_TEXT = { concept: '概念起點', rule: '判準法則', reasoning: '思維推演', mastery: '避坑精熟', boss: '單元挑戰' };
const OFFSETS = [0, 1, 1.6, 1, 0, -1, -1.6, -1];

const COMPANION_MESSAGES = [
  '每天弄懂一個觀念，就是往前邁出紮實的一大步！',
  '遇到題目卡關別灰心，三步思維鏈會陪你理清頭緒！',
  '108 課綱重在理解與素養，從真實生活現象中看見學科原理！',
  '做錯了沒關係！「課內修復」會幫你在這堂課徹底搞懂！',
  '保持自學熱情，每天一小關，你比想像中更厲害！'
];

let course, game;
const ui = {
  tab: 'learn',
  track: 's1',
  gradeFilter: 'all', // 'all' | '7' | '8' | '9'
  catFilter: 'all',   // 'all' | 'core' | 'tech' | 'arts' | 'activity'
  subjFilter: 'all',
  libFilter: '',
  pop: null,
  guide: null,
  modal: null,
  toast: [],
  busy: '',
  msgIdx: 0,
  a: { value: '', tokens: [], text: '', left: null, done: [], wrong: 0, hint: false }
};

const freshAnswer = () => ({ value: '', tokens: [], text: '', left: null, done: [], wrong: 0, hint: false });

async function getJson(path) {
  const r = await fetch(`${path}?v=${V}`);
  if (!r.ok) throw Error(path);
  return r.json();
}

async function ensure(ids) {
  const need = [...new Set(ids)].filter(id => id && !course.loaded(id));
  if (!need.length) return true;
  ui.busy = '載入教材與題庫中…';
  render();
  try {
    for (const id of need) {
      const f = await getJson(`course/${id}.json`);
      course.register(f);
    }
    ui.busy = '';
    render();
    return true;
  } catch (err) {
    ui.busy = '';
    toast('⚠️ 內容載入失敗，請檢查網路連線。');
    render();
    return false;
  }
}

function toast(text) {
  ui.toast.push({ text, id: Math.random() });
  setTimeout(() => {
    ui.toast.shift();
    paintToasts();
  }, 3200);
  paintToasts();
}

function paintToasts() {
  const el = document.querySelector('#toasts');
  if (el) el.innerHTML = ui.toast.map(t => `<div class="toast">${esc(t.text)}</div>`).join('');
}

// High-Quality SVG Mascot: 知知 (ZhiZhi the Scholar Owl)
function mascot(mood = 'happy', size = 72) {
  let eyes = '';
  let beak = '<polygon points="50,52 46,58 54,58" fill="#e76f51"/>';
  let decor = '';

  if (mood === 'celebrate') {
    eyes = `
      <circle cx="40" cy="46" r="9" fill="#ffffff" stroke="#193e35" stroke-width="2"/>
      <circle cx="60" cy="46" r="9" fill="#ffffff" stroke="#193e35" stroke-width="2"/>
      <polygon points="40,43 42,48 37,45 43,45 38,48" fill="#f4a261"/>
      <polygon points="60,43 62,48 57,45 63,45 58,48" fill="#f4a261"/>
    `;
    decor = `
      <!-- Confetti / Sparkles -->
      <circle cx="20" cy="25" r="2.5" fill="#f4a261"/>
      <circle cx="80" cy="22" r="3" fill="#e76f51"/>
      <circle cx="15" cy="50" r="2" fill="#2a9d8f"/>
      <circle cx="86" cy="48" r="2.5" fill="#52b788"/>
    `;
  } else if (mood === 'sad') {
    eyes = `
      <circle cx="40" cy="46" r="9" fill="#ffffff" stroke="#193e35" stroke-width="2"/>
      <circle cx="60" cy="46" r="9" fill="#ffffff" stroke="#193e35" stroke-width="2"/>
      <line x1="35" y1="48" x2="45" y2="48" stroke="#193e35" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="48" x2="65" y2="48" stroke="#193e35" stroke-width="2.5" stroke-linecap="round"/>
    `;
  } else if (mood === 'thinking') {
    eyes = `
      <circle cx="40" cy="46" r="9" fill="#ffffff" stroke="#193e35" stroke-width="2"/>
      <circle cx="60" cy="46" r="9" fill="#ffffff" stroke="#193e35" stroke-width="2"/>
      <circle cx="42" cy="44" r="3.5" fill="#193e35"/>
      <circle cx="62" cy="44" r="3.5" fill="#193e35"/>
    `;
    decor = `
      <circle cx="78" cy="20" r="5" fill="#f4a261"/>
      <line x1="78" y1="13" x2="78" y2="10" stroke="#f4a261" stroke-width="2"/>
      <line x1="84" y1="16" x2="87" y2="14" stroke="#f4a261" stroke-width="2"/>
      <line x1="72" y1="16" x2="69" y2="14" stroke="#f4a261" stroke-width="2"/>
    `;
  } else {
    // happy / default
    eyes = `
      <circle cx="40" cy="46" r="10" fill="#ffffff" stroke="#193e35" stroke-width="2"/>
      <circle cx="60" cy="46" r="10" fill="#ffffff" stroke="#193e35" stroke-width="2"/>
      <circle cx="40" cy="46" r="3.8" fill="#193e35"/>
      <circle cx="60" cy="46" r="3.8" fill="#193e35"/>
      <circle cx="42" cy="44" r="1.5" fill="#ffffff"/>
      <circle cx="62" cy="44" r="1.5" fill="#ffffff"/>
    `;
  }

  return `
    <svg class="mascot ${mood}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
      ${decor}
      <ellipse cx="50" cy="55" rx="34" ry="36" fill="#2d6a4f"/>
      <ellipse cx="50" cy="62" rx="26" ry="24" fill="#d8f3dc"/>
      <path d="M16 52 C 14 62, 22 72, 28 68" fill="none" stroke="#193e35" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M84 52 C 86 62, 78 72, 72 68" fill="none" stroke="#193e35" stroke-width="2.5" stroke-linecap="round"/>
      ${eyes}
      ${beak}
      <polygon points="50,16 20,26 50,34 80,26" fill="#193e35"/>
      <rect x="42" y="28" width="16" height="8" rx="2" fill="#193e35"/>
      <line x1="74" y1="28" x2="78" y2="44" stroke="#e9c46a" stroke-width="2.5"/>
      <circle cx="78" cy="46" r="2.5" fill="#e9c46a"/>
    </svg>
  `;
}

function companionMsg(g) {
  const s = g.streak();
  const xp = g.todayXp();
  const goal = g.goalXp();

  if (xp >= goal) return `太棒了！今天的 ${goal} XP 自學目標已達成 🎉`;
  if (s >= 3) return `哇！連續自學已維持 ${s} 天，習慣力勢不可擋！🔥`;
  if (g.mistakeCount() > 0) return `錯題本還有 ${g.mistakeCount()} 題等待消剿，趁熱打鐵複習一下吧！`;
  return COMPANION_MESSAGES[ui.msgIdx % COMPANION_MESSAGES.length];
}

function stats() {
  const st = game.state, streak = game.streak(), today = game.todayXp(), goal = game.goalXp();
  return `
    <div class="stats" role="group" aria-label="今日狀態">
      <span class="stat streak ${st.days.includes(game.today()) ? 'lit' : ''}" title="連續自學天數">🔥 <b>${streak}</b></span>
      <span class="stat gems" title="能量寶石">💎 <b>${st.gems}</b></span>
      <span class="stat xp" title="今日 XP / 目標">⚡ <b>${today}</b><small>/${goal}</small></span>
    </div>
  `;
}

function rail() {
  const st = game.state, today = game.todayXp(), goal = game.goalXp();
  const pct = Math.min(100, Math.round(100 * today / goal));
  const due = game.dueUnits(), mist = game.mistakeCount();
  const league = game.getLeagueData();

  return `
    <aside class="rail" aria-label="學習推進總覽">
      <section class="card">
        <h3>每日目標</h3>
        <p class="muted">${today >= goal ? '太棒了！今日自學目標已達成 🎉' : `再獲得 ${goal - today} XP 即可達標`}</p>
        <div class="progress" style="margin-top:0.75rem;"><span style="width:${pct}%"></span></div>
      </section>

      <section class="card">
        <h3>${league.icon} ${league.tierName}</h3>
        <p class="muted small">本週累積 <b>${league.entries.find(e => e.isUser)?.weeklyXp || 0} XP</b> · 目前排名 <b>#${league.userRank}</b></p>
        <p class="small" style="margin-top:0.4rem;color:${league.userRank <= 7 ? 'var(--success)' : 'var(--text-muted)'};">
          ${league.userRank <= 7 ? '▲ 目前位居晉級區 (前 7 名)！' : '前 7 名晉級，再接再厲！'}
        </p>
        <a class="btn ghost small" href="#leaderboard" style="margin-top:0.6rem;width:100%;">查看完整聯賽榜單 →</a>
      </section>

      <section class="card">
        <h3>🔥 連續自學 ${game.streak()} 天</h3>
        <p class="muted small">${st.days.includes(game.today()) ? '今日已完成關卡，習慣又累積了一天！' : '完成任一關卡或練習，今天就算數。'}</p>
        <p class="small" style="margin-top:0.5rem;">🧊 凍結卡：${st.freezes}/2 <button class="btn ghost small" data-act="shop" style="margin-left:0.5rem;padding:0.2rem 0.5rem;">兌換</button></p>
      </section>

      <section class="card">
        <h3>每日任務</h3>
        <ul style="list-style:none;margin-top:0.5rem;display:flex;flex-direction:column;gap:0.4rem;">
          ${(st.quests?.list || []).map(q => `<li class="small ${q.done ? 'done' : ''}">${q.done ? '✅' : '🎯'} ${esc(game.questLabel(q))} (${q.n}/${q.target})</li>`).join('')}
        </ul>
      </section>

      ${due.length || mist ? `
        <section class="card">
          <h3>溫故知新</h3>
          ${due.length ? `<p class="small">↻ ${due.length} 個單元到期複習</p>` : ''}
          ${mist ? `<p class="small">📕 錯題本累積 ${mist} 題</p>` : ''}
          <a class="btn primary small" href="#practice" style="margin-top:0.5rem;">前往複習</a>
        </section>
      ` : ''}
    </aside>
  `;
}

function layout(body) {
  return `
    <div class="shell">
      <nav class="side" aria-label="主導覽">
        <a class="brand" href="#learn">
          ${mascot('happy', 44)}
          <span>知行 Quest<small>國中全科自學</small></span>
        </a>
        ${TABS.map(([id, ic, t]) => `
          <a href="#${id}" class="nav-link ${ui.tab === id ? 'on' : ''}">
            <i>${ic}</i><span>${t}</span>
          </a>
        `).join('')}
        <a class="side-out" href="../#courses">← 回到主站研經地圖</a>
      </nav>

      <div class="main-wrap">
        <header class="top">
          <div class="top-actions">
            <button class="sound-toggle" data-act="sound-toggle" title="切換音效">${sound.isMuted() ? '🔇 靜音' : '🔊 音效'}</button>
            <button class="placement-entry" data-act="placement">🧭 程度檢測</button>
            <button class="track-chip" data-act="tracks">${esc(course.track(ui.track)?.title || '切換段落')} ▾</button>
          </div>
          ${stats()}
        </header>

        <div class="main-layout">
          <main id="main" class="main">
            ${game.warning ? `<div class="warn">${esc(game.warning)}</div>` : ''}
            ${ui.busy ? `<div class="busy">${esc(ui.busy)}</div>` : ''}
            ${body}
          </main>
          ${rail()}
        </div>
      </div>

      <nav class="bottom" aria-label="手機快速導覽">
        ${TABS.map(([id, ic, t]) => `
          <a href="#${id}" class="${ui.tab === id ? 'on' : ''}">
            <i>${ic}</i><span>${t}</span>
          </a>
        `).join('')}
      </nav>
    </div>
    ${modalView()}
    <div id="toasts" class="toasts"></div>
  `;
}

// -------------------------------------------------------------
// Views: #learn (The Path)
// -------------------------------------------------------------
function makeTrailSvg(index) {
  const pts = [0, 1, 2, 3, 4].map(i => {
    const off = OFFSETS[(index * 3 + i) % OFFSETS.length];
    const x = 140 + off * 34;
    const y = 35 + i * 90;
    return { x, y };
  });

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const cy1 = p1.y + 45;
    const cy2 = p2.y - 45;
    d += ` C ${p1.x} ${cy1}, ${p2.x} ${cy2}, ${p2.x} ${p2.y}`;
  }

  return `
    <svg class="trail-svg" viewBox="0 0 280 430" preserveAspectRatio="none" aria-hidden="true">
      <path class="trail-path" d="${d}" />
    </svg>
  `;
}

function learnPage() {
  const t = course.track(ui.track);
  if (!t) return '<p>載入段落中…</p>';

  const currentId = game.current(t.id);
  const mission = nextAdventure(game, course, t.id);

  // Companion speech
  const speechBox = `
    <div class="mascot-speech-wrap">
      <div data-act="cycle-msg" style="cursor:pointer;" title="點擊換一句鼓勵話語">${mascot('happy', 52)}</div>
      <div class="mascot-bubble">
        <span>「${esc(companionMsg(game))}」</span>
        <button class="btn ghost small" data-act="say" data-text="${esc(companionMsg(game))}" style="margin-left:0.5rem;padding:0.15rem 0.45rem;" title="朗讀">🔊</button>
      </div>
    </div>
  `;

  // Grade Quick Selector
  const gradeFilters = [
    ['all', '全部學年'],
    ['7', '國一（七年級）'],
    ['8', '國二（八年級）'],
    ['9', '國三（九年級）']
  ];

  // Subject Category Filters (Basic vs Specialized 108 Curriculum)
  const catFilters = [
    ['all', '🌟 全部領域'],
    ['core', '📚 核心五科 (國/英/數/自/社)'],
    ['tech', '💻 專業科技 (資訊/生科)'],
    ['arts', '🎨 藝術人文 (視覺/音樂/表演)'],
    ['activity', '🏃 健體綜合 (健體/家政/童軍/輔導)']
  ];

  const filterBar = `
    <div style="margin-bottom:1.25rem;">
      <div class="subject-filter-bar" style="margin-bottom:0.5rem;">
        ${gradeFilters.map(([k, label]) => `
          <button class="subj-pill ${ui.gradeFilter === k ? 'active' : ''}" data-act="filter-grade" data-grade="${k}">
            ${label}
          </button>
        `).join('')}
      </div>
      <div class="subject-filter-bar">
        ${catFilters.map(([k, label]) => `
          <button class="subj-pill ${ui.catFilter === k ? 'active' : ''}" data-act="filter-cat" data-cat="${k}">
            ${label}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Filter units
  let displayUnits = t.units;

  // Grade filter
  if (ui.gradeFilter !== 'all') {
    const gNum = Number(ui.gradeFilter);
    displayUnits = displayUnits.filter(u => u.grade === gNum);
  }

  // Category filter
  if (ui.catFilter !== 'all') {
    displayUnits = displayUnits.filter(u => u.category === ui.catFilter);
  }

  const unitsHtml = displayUnits.map((u, uiIdx) => unitBlock(t, u, uiIdx, currentId)).join('');

  return `
    <section class="track-head ${t.id}">
      <p class="eyebrow">${t.kind === 'section' ? `108 課綱 · ${t.gradeName || ''}${t.termName || `第 ${t.no} 段`}` : '專精目標分支'}</p>
      <h1>${esc(t.title)}</h1>
      <p>${esc(t.level)} · ${t.units.length} 個單元 · 完整展開</p>
    </section>

    ${speechBox}

    <section class="adventure">
      <span>🧭</span>
      <div>
        <h2>${mission.title}</h2>
        <p class="muted">${esc(mission.text)}</p>
      </div>
      <button class="btn primary" data-act="start" data-mode="${mission.mode}" data-id="${mission.id}">
        ${mission.label} →
      </button>
    </section>

    ${courseAtlas(course, game, ui.track)}
    ${filterBar}

    <div class="path">
      ${unitsHtml || '<p class="muted">此篩選條件下無符合單元，請切換學期或學科分類。</p>'}
    </div>
  `;
}

function unitBlock(t, u, index, currentId) {
  const nodesHtml = (u.nodes || []).map((n, i) => {
    const status = game.nodeStatus(n.id);
    const isCur = n.id === currentId;
    const off = OFFSETS[(index * 3 + i) % OFFSETS.length];
    const icon = status === 'crowned' ? '👑' : status === 'done' ? '✓' : n.icon;

    return `
      <div class="node-row" style="--x:${off}">
        ${isCur ? '<div class="current-tag">開始！</div>' : ''}
        <button class="node ${n.kind} ${status} ${isCur ? 'current' : ''}" data-act="pop" data-id="${n.id}" aria-label="${esc(n.title)}">
          <span>${icon}</span>
        </button>
        <span class="node-label">${esc(n.title)}</span>
        ${ui.pop === n.id ? popover(n, status, u) : ''}
      </div>
    `;
  }).join('');

  // Unit Treasure Chest (Duolingo Style reward)
  const canOpen = game.canOpenChest(u.id);
  const isOpened = game.isChestOpened(u.id);
  const chestHtml = `
    <div class="unit-chest-row">
      <button class="chest-btn ${isOpened ? 'opened' : canOpen ? 'ready' : ''}" data-act="open-chest" data-unit="${u.id}" ${isOpened || !canOpen ? 'disabled' : ''}>
        <span>${isOpened ? '📭' : '🎁'}</span>
        <b>${isOpened ? '已領取通關寶石 (+15 💎)' : canOpen ? '領取單元通關寶箱！(+15 💎)' : '通關單元挑戰即可解鎖寶箱'}</b>
      </button>
    </div>
  `;

  return `
    <section class="unit">
      <header class="unit-banner subj-${u.subject || 'chinese'}">
        <div class="unit-banner-info">
          <span class="unit-subj-badge">${u.gradeName || ''} · ${u.subjectName || ''}</span>
          <h2>${u.icon || '📖'} ${esc(u.title)}</h2>
          ${u.pitfall ? `<small class="unit-pitfall-tag">⚠️ 核心避坑：${esc(u.pitfall)}</small>` : ''}
        </div>
        <button class="guide-btn" data-act="guide" data-id="${u.id}">📘 指南</button>
      </header>
      <div class="nodes-wrap">
        ${makeTrailSvg(index)}
        <div class="nodes" style="position:relative;z-index:2;">${nodesHtml}</div>
      </div>
      ${chestHtml}
    </section>
  `;
}

function popover(n, status, u) {
  return `
    <div class="pop">
      <h3>${n.icon} ${esc(n.title)}</h3>
      <p>${KIND_TEXT[n.kind] || '關卡'} · 約 ${n.size || 6} 步</p>
      <button class="btn primary big" data-act="start" data-mode="${n.kind === 'boss' ? 'boss' : 'lesson'}" data-id="${n.id}">
        ${status === 'done' || status === 'crowned' ? '再練一次' : '開始闖關'} +${n.kind === 'boss' ? XP.boss : XP.lesson} XP
      </button>
    </div>
  `;
}

// -------------------------------------------------------------
// Views: #leaderboard (Duolingo Weekly League)
// -------------------------------------------------------------
function leaderboardPage() {
  const l = game.getLeagueData();
  const top3 = l.entries.slice(0, 3);

  return `
    <section class="league-hero">
      <div class="league-badge">
        <span>${l.icon}</span>
        <b>${l.tierName}</b>
      </div>
      <h1 style="font-size:1.6rem;font-weight:800;margin:0.25rem 0;">每週聯賽排行榜</h1>
      <p class="league-countdown">⏳ 本週聯賽剩餘 ${l.daysLeft} 天 · 前 7 名升級至更高階聯賽</p>
    </section>

    <!-- Podium for Top 3 -->
    <div class="podium-wrap">
      ${top3[1] ? `
        <div class="podium-step p2">
          <div class="podium-avatar">
            <span class="podium-crown">🥈</span>
            ${top3[1].avatar}
          </div>
          <span class="podium-name">${esc(top3[1].name)}</span>
          <span class="podium-xp">${top3[1].weeklyXp} XP</span>
          <div class="podium-block">2</div>
        </div>
      ` : ''}
      ${top3[0] ? `
        <div class="podium-step p1">
          <div class="podium-avatar">
            <span class="podium-crown">👑</span>
            ${top3[0].avatar}
          </div>
          <span class="podium-name">${esc(top3[0].name)}</span>
          <span class="podium-xp">${top3[0].weeklyXp} XP</span>
          <div class="podium-block">1</div>
        </div>
      ` : ''}
      ${top3[2] ? `
        <div class="podium-step p3">
          <div class="podium-avatar">
            <span class="podium-crown">🥉</span>
            ${top3[2].avatar}
          </div>
          <span class="podium-name">${esc(top3[2].name)}</span>
          <span class="podium-xp">${top3[2].weeklyXp} XP</span>
          <div class="podium-block">3</div>
        </div>
      ` : ''}
    </div>

    <!-- Full 30 Learners List -->
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
        <h3>本組 30 位自學者排名</h3>
        <span class="small muted">每週一重置結算</span>
      </div>
      <div class="league-table">
        ${l.entries.map((e, idx) => {
          const isPromoteLine = e.rank === 7;
          const isDemoteLine = e.rank === 25;
          return `
            <div class="league-row ${e.isUser ? 'current-user' : ''}">
              <span class="league-rank">#${e.rank}</span>
              <span class="league-avatar">${e.avatar}</span>
              <span class="league-name">${esc(e.name)} ${e.isUser ? '🌟 (你)' : ''}</span>
              <span class="league-streak">🔥 ${e.streak}</span>
              <span class="league-xp">${e.weeklyXp} XP</span>
            </div>
            ${isPromoteLine ? '<div class="zone-line promote">▲ 以上為晉級區 (升至更高階聯賽) ▲</div>' : ''}
            ${isDemoteLine ? '<div class="zone-line demote">▼ 以下為降級區 ▼</div>' : ''}
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// Views: Lesson Screen
// -------------------------------------------------------------
function lessonView() {
  const s = game.state.session;
  const it = game.currentItem();
  if (!s || !it) return '';

  const pct = Math.round((s.index / s.queue.length) * 100);
  const hearts = s.hearts !== null ? `<span class="hearts">${'❤️'.repeat(s.hearts)}${'🤍'.repeat(HEARTS - s.hearts)}</span>` : '';
  const combo = s.combo >= 3 ? `<span class="combo">🔥 ${s.combo} 連對！</span>` : '';

  return `
    <div class="lesson-screen">
      <header class="lesson-top">
        <button class="btn ghost" data-act="exit" title="暫停並退出">✕</button>
        <div class="progress"><span style="width:${pct}%"></span></div>
        ${combo} ${hearts}
      </header>

      <main class="lesson-body">
        ${itemView(it, s)}
      </main>

      ${lessonFooter(it, s)}
    </div>
  `;
}

function itemView(it, s) {
  const a = ui.a, locked = !!s.feedback;

  if (it.type === 'info') {
    return `
      <section class="info-card">
        <p class="small muted">${it.badge || '📐 觀念起點'}</p>
        <h1>${esc(it.title)}</h1>
        ${it.formula ? `<div class="formula">${esc(it.formula)}</div>` : ''}
        <p>${esc(it.body)}</p>
        ${it.example ? `<p class="muted small" style="margin-top:0.75rem;">💡 ${esc(it.example)}</p>` : ''}
        ${it.svg ? `<div class="svg-wrap">${it.svg}</div>` : ''}
      </section>
    `;
  }

  const head = `
    <h1 class="prompt">
      <span>${esc(it.prompt)}</span>
      <button class="btn ghost small" data-act="say" data-text="${esc(it.prompt)}" title="朗讀題目">🔊</button>
    </h1>
  `;
  let body = '';

  if (it.type === 'choice' || it.type === 'listen') {
    const opts = it.options || [];
    body = `
      <div class="options">
        ${opts.map((o, i) => {
          const cls = locked ? (o === it.answer ? 'right' : o === s.feedback?.value ? 'wrong' : '') : (a.value === o ? 'sel' : '');
          return `
            <button class="opt ${cls}" data-act="choose" data-v="${esc(o)}" ${locked ? 'disabled' : ''}>
              <kbd>${i + 1}</kbd><span>${esc(o)}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  } else if (it.type === 'build') {
    body = `
      <div class="answer-line">
        ${a.tokens.length ? a.tokens.map((tok, i) => `<button class="tok" data-act="untok" data-i="${i}">${esc(tok)}</button>`).join('') : '<span class="muted small">點擊下方步驟排出思維推演順序：</span>'}
      </div>
      <div class="bank">
        ${(it.words || []).map((w, idx) => `
          <button class="tok ${a.tokens.includes(w) ? 'used' : ''}" data-act="tok" data-w="${esc(w)}">${esc(w)}</button>
        `).join('')}
      </div>
    `;
  } else if (it.type === 'match') {
    const pairs = it.pairs || [];
    body = `
      <div class="match">
        <div>
          ${pairs.map(([l], i) => `
            <button class="mcell ${a.done.includes(i) ? 'done' : ''} ${a.left === i ? 'sel' : ''}" data-act="mL" data-i="${i}">${esc(l)}</button>
          `).join('')}
        </div>
        <div>
          ${pairs.map(([, r], i) => `
            <button class="mcell ${a.done.includes(i) ? 'done' : ''}" data-act="mR" data-i="${i}">${esc(r)}</button>
          `).join('')}
        </div>
      </div>
    `;
  } else if (it.type === 'input') {
    body = `
      <div class="input-wrap" style="margin: 1.5rem 0;">
        ${it.text ? `<p class="muted" style="margin-bottom:0.75rem;">${esc(it.text)}</p>` : ''}
        <input type="text" class="text-input" placeholder="請在此輸入答案..." value="${esc(a.value)}" data-act="type-in" ${locked ? 'disabled' : ''} style="width:100%;font-size:1.1rem;padding:0.85rem 1rem;border-radius:var(--radius);border:2px solid var(--border);background:var(--card-bg);color:var(--text);" autofocus>
      </div>
    `;
  }

  return `${head}${body}`;
}

function lessonFooter(it, s) {
  const f = s.feedback;
  if (!isScored(it)) {
    return `
      <footer class="check">
        <div class="check-in">
          <span></span>
          <button class="btn primary big" data-act="next">繼續 (Enter) →</button>
        </div>
      </footer>
    `;
  }

  if (f) {
    const praise = PRAISE[Math.floor(Math.random() * PRAISE.length)];
    return `
      <footer class="check ${f.ok ? 'ok' : 'bad'}">
        <div class="check-in">
          <div class="verdict ${f.ok ? 'ok' : 'bad'}">
            <h2>${f.ok ? `✔ ${praise}` : '✘ 需要再釐清觀念'}</h2>
            ${!f.ok ? `<p>正解：<b>${esc(answerText(it))}</b></p>` : ''}
            ${it.why ? `<p class="why">${esc(it.why)}</p>` : ''}
          </div>
          <button class="btn primary big" data-act="next">繼續 (Enter)</button>
        </div>
      </footer>
    `;
  }

  const ready = it.type === 'build' ? ui.a.tokens.length > 0 : it.type === 'match' ? ui.a.done.length === (it.pairs?.length || 0) : !!ui.a.value;

  return `
    <footer class="check">
      <div class="check-in">
        <button class="btn ghost" data-act="hint">💡 提示 (H)</button>
        <button class="btn primary big" data-act="check" ${ready ? '' : 'disabled'}>檢查 (Enter)</button>
      </div>
    </footer>
  `;
}

// -------------------------------------------------------------
// Views: Modals (Guide, Tracks, Placement, Result)
// -------------------------------------------------------------
function modalView() {
  if (game.result) return resultView();
  if (!ui.modal) return '';

  let inner = '';
  if (ui.modal === 'guide') {
    const g = course.guides.get(ui.guide);
    if (!g) inner = '<p>指南載入中…</p>';
    else {
      inner = `
        <h2>${esc(g.title)} · 單元指南</h2>
        <p class="muted">${g.grade}年級 ${g.term === 1 ? '上' : '下'}學期 · ${esc(g.subject)}</p>
        <div style="margin:1rem 0;display:flex;flex-direction:column;gap:1rem;">
          ${(g.knowledgePoints || []).map(kp => `
            <div class="card">
              <h4>${esc(kp.title)}</h4>
              <p class="small">${esc(kp.core || '')}</p>
              ${kp.svg ? `<div class="svg-wrap">${kp.svg}</div>` : ''}
            </div>
          `).join('')}
        </div>
        <a class="btn primary" href="../#/lesson/${g.unitId}" target="_blank">打開主站研經黑板與思維鏈 ↗</a>
      `;
    }
  } else if (ui.modal === 'tracks') {
    inner = `
      <h2>選擇學習學期與目標分支</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:1rem;">
        ${course.index.sections.map(s => `
          <button class="btn ghost" data-act="track" data-id="${s.id}" style="text-align:left;padding:0.75rem;">
            <b>${s.icon || '📚'} ${esc(s.title)}</b><br><small class="muted">${esc(s.level)}</small>
          </button>
        `).join('')}
      </div>
      <h3 style="margin-top:1.5rem;">目標專精分支</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:0.5rem;">
        ${course.index.branches.map(b => `
          <button class="btn ghost" data-act="track" data-id="${b.id}" style="text-align:left;padding:0.75rem;">
            <b>${b.icon} ${esc(b.title)}</b><br><small class="muted">${esc(b.level)}</small>
          </button>
        `).join('')}
      </div>
    `;
  } else if (ui.modal === 'placement') {
    inner = `
      <h2>🧭 全科程度定位檢測</h2>
      <p class="muted">透過跨學期核心題庫取樣，評估最適合你的起點學期與各科強弱項。</p>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:1.25rem;">
        <button class="btn ghost" data-act="placement-start" data-size="10"><b>10 題快速定位</b> (約 3 分鐘)</button>
        <button class="btn primary" data-act="placement-start" data-size="20"><b>20 題標準診斷 · 建議</b> (約 6 分鐘)</button>
        <button class="btn ghost" data-act="placement-start" data-size="30"><b>30 題深度檢測</b> (約 10 分鐘)</button>
      </div>
    `;
  }

  return `
    <div class="modal-bg" data-act="close"></div>
    <div class="modal card" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-width:540px;width:90%;max-height:85vh;overflow-y:auto;z-index:2000;">
      <button class="btn ghost small" data-act="close" style="float:right;">✕</button>
      ${inner}
    </div>
  `;
}

function resultView() {
  const r = game.result;
  if (!r) return '';

  if (r.passed === false && r.mode === 'boss') {
    // Out of hearts modal (Duolingo Style Refill)
    return `
      <div class="modal-bg"></div>
      <div class="modal card center" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-width:440px;width:90%;z-index:2000;text-align:center;padding:2rem 1.5rem;">
        ${mascot('sad', 80)}
        <h2 style="margin:1rem 0 0.5rem;color:var(--danger);">心心用完了！💔</h2>
        <p class="muted">挑戰需要穩固的概念基礎，別擔心，選擇一種方式補充生命吧！</p>
        <div class="refill-options">
          <button class="refill-btn" data-act="refill-gems">
            <span>💎 寶石兌換滿心</span>
            <b>消耗 30 寶石</b>
          </button>
          <button class="refill-btn" data-act="refill-practice">
            <span>💪 以練代補 (+1 心)</span>
            <b>前往鞏固練習</b>
          </button>
        </div>
        <button class="btn ghost small" data-act="done" style="margin-top:1.25rem;">先暫停退出</button>
      </div>
    `;
  }

  return `
    <div class="modal-bg"></div>
    <div class="modal card center" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-width:480px;width:90%;z-index:2000;text-align:center;padding:2rem 1.5rem;">
      ${mascot(r.passed ? 'celebrate' : 'sad', 88)}
      <h2 style="margin:1rem 0 0.5rem;">${r.passed ? '恭喜過關！🎉' : '差一點點，再接再厲！'}</h2>
      <p class="muted">${r.perfect ? '全對無瑕完成！太厲害了！' : r.passed ? '概念掌握得非常清楚！' : '錯題已自動排入錯題本，隨時可以複習。'}</p>
      <div style="display:flex;justify-content:center;gap:1.5rem;margin:1.5rem 0;">
        <div><small class="muted">獲得能量</small><br><b>⚡ +${r.xp} XP</b></div>
        <div><small class="muted">本次正確率</small><br><b>🎯 ${Math.round((r.accuracy || 0) * 100)}%</b></div>
        <div><small class="muted">用時</small><br><b>⏱ ${r.seconds || 0} 秒</b></div>
      </div>
      <button class="btn primary big" data-act="done">繼續前進</button>
    </div>
  `;
}

// -------------------------------------------------------------
// Core Render & Event Dispatcher
// -------------------------------------------------------------
function render() {
  if (!game) return;
  const s = game.state.session;
  if (s) {
    root.innerHTML = lessonView();
    return;
  }

  let body = '';
  if (ui.tab === 'learn') body = learnPage();
  else if (ui.tab === 'leaderboard') body = leaderboardPage();
  else if (ui.tab === 'practice') {
    const due = game.dueUnits();
    body = `
      <h1>💪 全科鞏固練習</h1>
      <p class="muted">錯題溫故、到期間隔複習與專項弱點特訓。</p>
      <div style="display:flex;flex-direction:column;gap:1rem;margin-top:1.5rem;">
        <div class="card">
          <h3>📕 錯題本消剿 (${game.mistakeCount()} 題)</h3>
          <p class="muted small">連續答對 2 次即可自錯題本畢業。</p>
          <button class="btn primary small" data-act="start" data-mode="mistakes" data-id="all" style="margin-top:0.75rem;" ${game.mistakeCount() ? '' : 'disabled'}>開始訂正練習</button>
        </div>
        <div class="card">
          <h3>↻ 到期複習 (${due.length} 個單元)</h3>
          <p class="muted small">1 → 3 → 7 → 14 → 30 天科學間隔記憶排程。</p>
          ${due.length ? due.map(uid => `<button class="btn ghost small" data-act="start" data-mode="review" data-id="${uid}" style="margin:0.25rem;">複習 ${esc(course.units.get(uid)?.title || uid)}</button>`).join('') : '<p class="muted small" style="margin-top:0.5rem;">目前無到期單元，保持得很好！</p>'}
        </div>
        <div class="card">
          <h3>🧭 全科程度定位檢測</h3>
          <p class="muted small">隨時自我評估當前學力水準。</p>
          <button class="btn ghost small" data-act="placement" style="margin-top:0.5rem;">開啟程度檢測</button>
        </div>
      </div>
    `;
  } else if (ui.tab === 'stories') {
    body = `
      <h1>📖 跨科情境探究故事</h1>
      <p class="muted">36 篇真實生活與學科交叉探究故事，邊讀邊思考邊解題。</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:1rem;margin-top:1.5rem;">
        ${(course.index.stories || []).map(st => `
          <div class="card">
            <span class="small muted">${st.subjectTag}</span>
            <h3 style="margin:0.25rem 0;">${esc(st.title)}</h3>
            <p class="small muted">${esc(st.scenario)}</p>
            <button class="btn primary small" data-act="start" data-mode="story" data-id="${st.id}" style="margin-top:0.75rem;">進入探究</button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (ui.tab === 'library') {
    const allUnits = course.index.sections.flatMap(s => s.units);
    const filtered = ui.libFilter ? allUnits.filter(u => u.title.includes(ui.libFilter) || (u.subjectName || '').includes(ui.libFilter)) : allUnits;

    body = `
      <h1>📚 108 課綱 188 個單元總覽</h1>
      <p class="muted">國中三年六學期全單元指南、知識點圖解與板書公式查閱。</p>
      <div style="margin:1rem 0;">
        <input type="search" placeholder="🔍 搜尋單元名稱或學科..." value="${esc(ui.libFilter)}" data-act="lib-search" style="width:100%;max-width:400px;padding:0.6rem 1rem;border-radius:var(--radius);border:1px solid var(--border);background:var(--card-bg);color:var(--text);">
      </div>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:1rem;">
        ${filtered.map(u => `
          <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <b>${u.icon || '📖'} ${esc(u.title)}</b>
              <small class="muted" style="margin-left:0.5rem;">${u.gradeName || `${u.grade}年級`} · ${u.subjectName || ''}</small>
            </div>
            <button class="btn ghost small" data-act="guide" data-id="${u.id}">單元指南</button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (ui.tab === 'profile') {
    const st = game.state;
    body = `
      <h1>🙂 我的自學檔案</h1>
      <div class="card" style="margin-top:1rem;display:flex;gap:1.5rem;align-items:center;">
        ${mascot('happy', 64)}
        <div>
          <h3>連續自學 ${game.streak()} 天 · 累積 ${st.xp.total} XP</h3>
          <p class="muted small">已收穫 ${st.stats.crowns} 頂金冠 👑 · 完成 ${st.stats.lessons} 關課程 · 開啟 ${Object.keys(st.chests || {}).length} 個寶箱 🎁</p>
        </div>
      </div>
      <h3 style="margin-top:1.5rem;">🏆 成就徽章</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:0.75rem;margin-top:0.75rem;">
        ${BADGES.map(b => `
          <div class="card small ${st.achievements[b.id] ? '' : 'muted'}" style="text-align:center;">
            <div style="font-size:1.8rem;">${b.icon}</div>
            <b>${esc(b.title)}</b>
            <p class="small muted">${esc(b.desc)}</p>
            <small style="color:var(--primary);font-weight:700;">${st.achievements[b.id] ? '已達成 ✨' : '進行中'}</small>
          </div>
        `).join('')}
      </div>
    `;
  }

  root.innerHTML = layout(body);
}

// -------------------------------------------------------------
// Event Handling & Wire-up
// -------------------------------------------------------------
window.addEventListener('hashchange', () => {
  const hash = location.hash.replace(/^#/, '');
  if (['learn', 'practice', 'leaderboard', 'stories', 'library', 'profile'].includes(hash)) {
    ui.tab = hash;
    render();
  }
});

// Keyboard shortcuts for seamless learning
window.addEventListener('keydown', e => {
  const s = game?.state?.session;
  if (!s) return;

  const it = game.currentItem();
  if (!it) return;

  if (e.key === 'Escape') {
    game.clearSession();
    render();
    return;
  }

  if (e.key === 'Enter' || e.key === ' ') {
    if (s.feedback || !isScored(it)) {
      e.preventDefault();
      const res = game.nextStep();
      ui.a = freshAnswer();
      if (res?.done || game.result) {
        if (game.result?.passed) sound.playTone('level');
      }
      render();
      return;
    }

    if (e.key === 'Enter') {
      const ready = it.type === 'build' ? ui.a.tokens.length > 0 : it.type === 'match' ? ui.a.done.length === (it.pairs?.length || 0) : !!ui.a.value;
      if (ready) {
        e.preventDefault();
        let val = ui.a.value;
        if (it.type === 'build') val = ui.a.tokens.join(' -> ');
        else if (it.type === 'match') val = 'matched';

        const res = game.checkAnswer(val);
        if (res?.ok) sound.playTone('correct');
        else sound.playTone('wrong');
        render();
      }
    }
    return;
  }

  if ((e.key === 'h' || e.key === 'H') && !s.feedback) {
    ui.a.hint = true;
    sound.speak(it.prompt);
    toast('💡 仔細觀察題幹關鍵條件與判準。');
    return;
  }

  // Number keys 1-4 for choice selection
  if (['1', '2', '3', '4'].includes(e.key) && (it.type === 'choice' || it.type === 'listen') && !s.feedback) {
    const idx = parseInt(e.key, 10) - 1;
    if (it.options && it.options[idx]) {
      ui.a.value = it.options[idx];
      render();
    }
  }
});

document.addEventListener('input', e => {
  if (e.target.dataset.act === 'lib-search') {
    ui.libFilter = e.target.value.trim();
    render();
  } else if (e.target.dataset.act === 'type-in') {
    ui.a.value = e.target.value;
    const checkBtn = document.querySelector('button[data-act="check"]');
    if (checkBtn) {
      checkBtn.disabled = !ui.a.value.trim();
    }
  }
});

document.addEventListener('click', async e => {
  const actBtn = e.target.closest('[data-act]');
  if (!actBtn) return;
  const act = actBtn.dataset.act;

  if (act === 'sound-toggle') {
    sound.toggleMute();
    render();
  } else if (act === 'cycle-msg') {
    ui.msgIdx++;
    render();
  } else if (act === 'pop') {
    const id = actBtn.dataset.id;
    ui.pop = ui.pop === id ? null : id;
    render();
  } else if (act === 'track') {
    ui.track = actBtn.dataset.id;
    ui.modal = null;
    await ensure([ui.track, 'items']);
    render();
  } else if (act === 'tracks') {
    ui.modal = 'tracks';
    render();
  } else if (act === 'filter-grade') {
    ui.gradeFilter = actBtn.dataset.grade;
    if (ui.gradeFilter === '7' && !['s1', 's2'].includes(ui.track)) ui.track = 's1';
    else if (ui.gradeFilter === '8' && !['s3', 's4'].includes(ui.track)) ui.track = 's3';
    else if (ui.gradeFilter === '9' && !['s5', 's6'].includes(ui.track)) ui.track = 's5';
    await ensure([ui.track, 'items']);
    render();
  } else if (act === 'filter-cat') {
    ui.catFilter = actBtn.dataset.cat;
    render();
  } else if (act === 'filter-subj') {
    ui.subjFilter = actBtn.dataset.sub;
    render();
  } else if (act === 'guide') {
    ui.guide = actBtn.dataset.id;
    ui.modal = 'guide';
    render();
  } else if (act === 'close') {
    ui.modal = null;
    ui.guide = null;
    render();
  } else if (act === 'placement') {
    ui.modal = 'placement';
    render();
  } else if (act === 'placement-start') {
    const size = Number(actBtn.dataset.size || 20);
    ui.modal = null;
    await ensure(['s1', 's2', 's3', 's4', 's5', 's6', 'items']);
    game.startSession('placement', size);
    ui.a = freshAnswer();
    render();
  } else if (act === 'open-chest') {
    const uid = actBtn.dataset.unit;
    const res = game.openChest(uid);
    if (res?.ok) {
      sound.playTone('level');
      toast('🎉 成功開啟通關寶箱！獲得 15 💎 能量寶石！');
      render();
    }
  } else if (act === 'refill-gems') {
    const res = game.refillHeartsWithGems();
    if (res?.ok) {
      sound.playTone('level');
      toast('❤️ 成功消耗 30 寶石恢復滿心！');
      game.clearResult();
      render();
    } else {
      toast(res?.msg || '寶石不足');
    }
  } else if (act === 'refill-practice') {
    game.clearResult();
    game.clearSession();
    ui.tab = 'practice';
    location.hash = '#practice';
    render();
  } else if (act === 'start') {
    const mode = actBtn.dataset.mode;
    const id = actBtn.dataset.id;
    ui.pop = null;
    await ensure([ui.track, 'items', mode === 'story' ? 'stories' : null].filter(Boolean));
    const ok = game.startSession(mode, id);
    if (ok) {
      ui.a = freshAnswer();
      render();
    }
  } else if (act === 'choose') {
    ui.a.value = actBtn.dataset.v;
    render();
  } else if (act === 'tok') {
    ui.a.tokens.push(actBtn.dataset.w);
    render();
  } else if (act === 'untok') {
    const idx = Number(actBtn.dataset.i);
    ui.a.tokens.splice(idx, 1);
    render();
  } else if (act === 'mL') {
    ui.a.left = Number(actBtn.dataset.i);
    render();
  } else if (act === 'mR') {
    const rIdx = Number(actBtn.dataset.i);
    if (ui.a.left !== null) {
      if (ui.a.left === rIdx) {
        ui.a.done.push(rIdx);
        ui.a.left = null;
        sound.playTone('correct');
      } else {
        ui.a.wrong++;
        sound.playTone('wrong');
      }
      render();
    }
  } else if (act === 'check') {
    const it = game.currentItem();
    let val = ui.a.value;
    if (it.type === 'build') val = ui.a.tokens.join(' -> ');
    else if (it.type === 'match') val = 'matched';

    const res = game.checkAnswer(val);
    if (res?.ok) sound.playTone('correct');
    else sound.playTone('wrong');
    render();
  } else if (act === 'next') {
    const res = game.nextStep();
    ui.a = freshAnswer();
    if (res?.done || game.result) {
      if (game.result?.passed) sound.playTone('level');
    }
    render();
  } else if (act === 'done') {
    game.clearResult();
    render();
  } else if (act === 'exit') {
    game.clearSession();
    render();
  } else if (act === 'say') {
    sound.speak(actBtn.dataset.text);
  } else if (act === 'hint') {
    ui.a.hint = true;
    const it = game.currentItem();
    if (it) sound.speak(it.prompt);
    toast('💡 提示：仔細核對題幹與關鍵判準。');
  }
});

// -------------------------------------------------------------
// App Initialization
// -------------------------------------------------------------
async function init() {
  try {
    const indexData = await getJson('course/index.json');
    course = createCourse(indexData);
    game = createGame({ storage, course });

    // Preload section 1 and items
    await ensure(['s1', 'items', 'stories']);

    const hash = location.hash.replace(/^#/, '');
    if (['learn', 'practice', 'leaderboard', 'stories', 'library', 'profile'].includes(hash)) {
      ui.tab = hash;
    }
    render();
  } catch (err) {
    console.error('Failed to init JH Quest:', err);
    root.innerHTML = `<div class="warn card" style="margin:2rem auto;max-width:480px;text-align:center;"><h2>⚠️ 載入失敗</h2><p class="muted">${err.message}</p></div>`;
  }
}

init();
