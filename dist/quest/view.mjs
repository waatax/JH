// dist/quest/view.mjs
// Interactive view controller & DOM renderer for JH Quest
// Duolingo-Like gamification with 108 Curriculum 6-semester mastery, S-curve trail,
// weekly league leaderboard, unit treasure chests, and multi-modal practice.

import { createCourse, createGame, isScored, shuffle, XP, HEARTS, BADGES, LEAGUES } from './engine.mjs?v=20261103v2';
import * as sound from './sound.mjs?v=20261029v1';
import { answerText, correctionTip, questionText, repairSteps } from './coach.mjs?v=20261029v1';
import { courseAtlas, nextAdventure } from './atlas.mjs?v=20261027v2';
import { visibleLearningUnits, recommendLearning, learningEvidence } from './learning-path.mjs?v=20261103v2';

const V = '20261111v1';
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

const QUEST_THEMES = [
  { id: 'sage', icon: '🌿', label: '柔綠護眼' },
  { id: 'day', icon: '☀️', label: '晨曦日光' },
  { id: 'paper', icon: '📜', label: '暖柔米紙' },
  { id: 'dark', icon: '🌙', label: '極光深色' }
];

const QUEST_PUBLISHERS = [
  { id: 'all', icon: '🌟', label: '三版通用' },
  { id: '康軒', icon: '📗', label: '康軒版' },
  { id: '翰林', icon: '📘', label: '翰林版' },
  { id: '南一', icon: '📙', label: '南一版' }
];

function getInitialTheme() {
  try {
    const qt = storage?.getItem('jh-quest-theme-v1');
    if (qt && QUEST_THEMES.some(t => t.id === qt)) return qt;
    const mainRaw = storage?.getItem('zhixing-academy-v1');
    if (mainRaw) {
      const parsed = JSON.parse(mainRaw);
      const mt = parsed?.settings?.theme;
      if (mt && QUEST_THEMES.some(t => t.id === mt)) return mt;
    }
  } catch {}
  return 'sage';
}

function getInitialPublisher() {
  try {
    const p = storage?.getItem('zhixing-publisher-pref-v1');
    if (p && QUEST_PUBLISHERS.some(x => x.id === p)) return p;
  } catch {}
  return 'all';
}

let course, game;
const ui = {
  tab: 'learn',
  track: 's1',
  gradeFilter: 'all', // 'all' | '7' | '8' | '9'
  catFilter: 'all',   // 'all' | 'core' | 'tech' | 'arts' | 'activity'
  subjFilter: 'all',
  unitQuery: '',
  pubFilter: getInitialPublisher(), // 'all' | '康軒' | '翰林' | '南一'
  theme: getInitialTheme(),
  libFilter: '',
  pop: null,
  guide: null,
  guideTab: 'kp',     // 'kp' | 'visuals' | 'publishers' | 'thinking'
  blindfoldedKps: {},
  modal: null,
  toast: [],
  busy: '',
  msgIdx: 0,
  a: { value: '', tokens: [], text: '', left: null, done: [], wrong: 0, hint: false }
};

function applyQuestTheme(themeId) {
  const valid = QUEST_THEMES.find(t => t.id === themeId) ? themeId : 'sage';
  ui.theme = valid;
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('data-theme', valid);
  }
  try { storage?.setItem('jh-quest-theme-v1', valid); } catch {}
}
applyQuestTheme(ui.theme);

function setQuestPublisher(pubId) {
  const valid = QUEST_PUBLISHERS.find(p => p.id === pubId) ? pubId : 'all';
  ui.pubFilter = valid;
  try { storage?.setItem('zhixing-publisher-pref-v1', valid); } catch {}
}

let figZoom = 1;
function updateFigZoom(delta, absolute = null) {
  if (absolute !== null) figZoom = absolute;
  else figZoom = Math.min(2.5, Math.max(0.6, Number((figZoom + delta).toFixed(2))));
  const svg = document.querySelector('#figure-dialog-content svg');
  const badge = document.querySelector('#fig-zoom-level');
  if (svg) svg.style.transform = `scale(${figZoom})`;
  if (badge) badge.textContent = `${Math.round(figZoom * 100)}%`;
}

function launchCelebration() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  try {
    if (navigator?.vibrate) navigator.vibrate([25, 35, 25]);
  } catch {}

  let canvas = document.querySelector('#celebration-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'celebration-canvas';
    canvas.className = 'celebration-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);

  const colors = ['#f4a261', '#e76f51', '#2a9d8f', '#52b788', '#e9c46a', '#3b82f6', '#8b5cf6', '#ec4899'];
  const particles = Array.from({ length: 65 }, () => ({
    x: w * (0.35 + Math.random() * 0.3),
    y: h * (0.35 + Math.random() * 0.15),
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.8) * 16 - 3,
    size: 6 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vrot: (Math.random() - 0.5) * 14,
    shape: Math.random() > 0.4 ? 'rect' : 'circle',
    alpha: 1
  }));

  const start = performance.now();
  function draw(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.38;
      p.rot += p.vrot;
      if (elapsed > 1200) p.alpha = Math.max(0, 1 - (elapsed - 1200) / 1000);
      if (p.alpha > 0) alive = true;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    if (alive && elapsed < 2600) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, w, h);
      canvas.remove();
    }
  }
  requestAnimationFrame(draw);
}

function renderDailyQuestsWidget(st) {
  const list = st.quests?.list || [];
  const doneCount = list.filter(q => q.done).length;
  const allDone = list.length > 0 && doneCount === list.length;
  const bonusClaimed = st.quests?.bonus;

  return `
    <section class="card daily-quests-widget" aria-label="今日三大自學任務">
      <div class="daily-quests-header">
        <div class="daily-quests-title">
          <span class="daily-quests-icon">🎯</span>
          <div>
            <b>每日三大成長任務</b>
            <span class="small muted" style="margin-left:6px;">已完成 ${doneCount}/${list.length || 3} 項</span>
          </div>
        </div>
        ${allDone && !bonusClaimed ? `
          <button class="btn primary small glow" data-act="claim-quest-bonus" title="領取每日全勤大獎">🎁 領取全勤獎 (+20 💎)</button>
        ` : allDone ? `
          <span class="badge success" style="padding:4px 8px;border-radius:6px;background:var(--primary-soft, #e6f3eb);color:var(--primary-ink, #193e35);font-size:12px;font-weight:700;">🎉 今日任務全達成！已領 +20 💎</span>
        ` : `
          <span class="small muted">全達成解鎖 +20 💎 全勤寶箱</span>
        `}
      </div>
      <div class="daily-quests-grid">
        ${list.map(q => {
          const pct = Math.min(100, Math.round(100 * (q.n / q.target)));
          return `
            <div class="daily-quest-item ${q.done ? 'is-done' : ''}">
              <div class="daily-quest-info">
                <span class="daily-quest-status">${q.done ? '✅' : '⏳'}</span>
                <span class="daily-quest-label">${esc(game.questLabel(q))}</span>
                <span class="daily-quest-count">${q.n}/${q.target}</span>
              </div>
              <div class="progress daily-quest-progress"><span style="width:${pct}%"></span></div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

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

function mobileStatusStrip() {
  const today = game.todayXp(), goal = game.goalXp();
  const pct = Math.min(100, Math.round(100 * today / goal));
  const due = game.dueUnits(), mist = game.mistakeCount();
  const league = game.getLeagueData();

  return `
    <section class="mobile-status-strip" aria-label="今日學習進度摘要">
      <div class="mss-item">
        <span class="mss-label">🎯 今日目標 ${today}/${goal} XP</span>
        <div class="progress mss-bar"><span style="width:${pct}%"></span></div>
      </div>
      ${mist > 0 ? `<a class="mss-pill alert" href="#practice">📕 錯題 ${mist}</a>` : ''}
      ${due.length > 0 ? `<a class="mss-pill" href="#practice">↻ 複習 ${due.length}</a>` : ''}
    </section>
  `;
}

function layout(body) {
  const curTheme = QUEST_THEMES.find(t => t.id === ui.theme) || QUEST_THEMES[0];
  const curPub = QUEST_PUBLISHERS.find(p => p.id === ui.pubFilter) || QUEST_PUBLISHERS[0];
  return `
    <div class="shell ${ui.tab === 'learn' ? 'learning-shell' : ''}">
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
        <a class="side-out" href="../#/courses">← 回到主站研經地圖</a>
      </nav>

      <div class="main-wrap">
        <header class="top">
          <div class="top-actions">
            <button class="sound-toggle" data-act="sound-toggle" title="切換音效">${sound.isMuted() ? '🔇 靜音' : '🔊 音效'}</button>
            <button class="theme-toggle" data-act="theme-toggle" title="切換護眼/活力配色模式">${curTheme.icon} ${curTheme.label}</button>
            <button class="pub-toggle-chip" data-act="pub-toggle" title="切換課本版本 (三版通用 / 康軒 / 翰林 / 南一)">${curPub.icon} ${curPub.label}</button>
            <button class="placement-entry" data-act="placement">🧭 程度檢測</button>
            <button class="track-chip" data-act="tracks">${esc(course.track(ui.track)?.title || '切換段落')} ▾</button>
          </div>
          ${stats()}
        </header>

        <div class="main-layout">
          <main id="main" class="main" tabindex="-1">
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

  const displayUnits = visibleLearningUnits(t, {grade:ui.gradeFilter, category:ui.catFilter, subject:ui.subjFilter, query:ui.unitQuery});
  const mission = recommendLearning(displayUnits, game);
  const currentId = mission?.id;

  const unitsHtml = displayUnits.map((u, uiIdx) => unitBlock(t, u, uiIdx, currentId)).join('');
  const subjects = [...new Map(t.units.map(u => [u.subject,u.subjectName])).entries()];

  return `
    <section class="learning-hero">
      <div><p class="eyebrow">LEARN A LITTLE. GROW A LOT.</p>
      <h1>今天，懂一點。</h1>
      <p>選一個觀念，動手試一試。<br>答錯也能找到下一步。</p>
      <span class="hero-term">${esc(t.title)} · ${displayUnits.length} 個符合單元</span></div>
      <div class="hero-owl">${mascot('happy',112)}<span>每一小步，都算數。</span></div>
    </section>
    ${mobileStatusStrip()}
    ${renderDailyQuestsWidget(game.state)}
    ${mission ? `<section class="today-mission">
      <div class="mission-heading"><div class="section-kicker">今天的一小關 / 先從這裡開始</div><a href="#study-controls" data-act="focus-study-controls">換科目 ↓</a></div>
      <div class="mission-body"><span class="mission-icon" aria-hidden="true">${mission.unit.icon || '🌱'}</span><div><span class="small muted">${esc(mission.unit.subjectName)} · ${esc(t.title)}</span><h2>${esc(mission.unit.title)}</h2><p>${esc(mission.reason)}</p></div></div>
      <div class="mission-actions"><button class="btn primary" data-act="start" data-mode="${mission.mode}" data-id="${mission.id}">${mission.label} →</button><button class="btn ghost" data-act="guide" data-id="${mission.unit.id}">先看圖解指南</button></div>
      <ol class="learning-loop"><li><b>1</b> 看懂概念</li><li><b>2</b> 獨立試答</li><li><b>3</b> 看解說補強</li><li><b>4</b> 隔天再回想</li></ol>
    </section>` : ''}
    <section class="study-controls card" id="study-controls" aria-label="選擇學習範圍">
      <div class="section-kicker">學習範圍 / 隨時可以切換</div>
      <div class="study-selects">
        <label>學期<select data-control="term" aria-label="學習學期">${course.tracks.map(s=>`<option value="${s.id}" ${s.id===ui.track?'selected':''}>${esc(s.title)}</option>`).join('')}</select></label>
        <label>科目<select data-control="subject" aria-label="學習科目"><option value="all">全部科目</option>${subjects.map(([id,name])=>`<option value="${id}" ${ui.subjFilter===id?'selected':''}>${esc(name)}</option>`).join('')}</select></label>
        <label>我的課本<select data-control="publisher" aria-label="我的課本版本">${QUEST_PUBLISHERS.map(p=>`<option value="${p.id}" ${ui.pubFilter===p.id?'selected':''}>${p.label}</option>`).join('')}</select></label>
      </div>
      <form class="unit-search" id="unit-search-form"><label class="sr-only" for="unit-query">搜尋目前範圍的單元</label><input id="unit-query" name="query" type="search" value="${esc(ui.unitQuery)}" placeholder="找觀念，例如：絕對值、細胞…"><button class="btn ghost small" type="submit">搜尋</button>${ui.unitQuery?'<button class="btn ghost small" data-act="reset-filter" type="button">清除</button>':''}</form>
      <p class="scope-help">原創教材 · 依核心概念跨版查找，章節來源與待核對狀態見指南。</p>
    </section>
    <details class="map-disclosure"><summary>探索三年六學期與專修支線 <span>展開地圖 ↗</span></summary>${courseAtlas(course, game, ui.track)}</details>
    <div class="path-heading"><div><div class="section-kicker">單元探索 / 依自己的步調</div><h2>我的單元清單</h2></div><span class="small muted">${displayUnits.length} 個單元</span></div>
    <div class="path">
      ${unitsHtml || `
        <div class="card empty-filter-state">
          ${mascot('think', 72)}
          <h3>目前篩選條件下無符合單元</h3>
          <p class="muted">當前段落或分支可能未包含所選學年或領域，建議重設篩選或切換段落。</p>
          <button class="btn primary" data-act="reset-filter">重設篩選條件 (顯示全部)</button>
        </div>
      `}
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
      <div class="node-row${ui.pop === n.id ? ' pop-open' : ''}" style="--x:${off}">
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

  const totalStages = (u.nodes || []).length || 5;
  const completedStages = (u.nodes || []).filter(n => {
    const st = game.nodeStatus(n.id);
    return st === 'done' || st === 'crowned' || st === 'tested';
  }).length;
  const stagePct = Math.round((completedStages / totalStages) * 100);

  const g = course.guides.get(u.id);
  const pg = g?.publisherGuide;
  const activePubObj = ui.pubFilter !== 'all' && pg?.publishers ? pg.publishers.find(p => p.publisher === ui.pubFilter) : null;
  const pubBannerTag = activePubObj
    ? `<div class="unit-pub-banner-tag">${activePubObj.icon} <b>${esc(activePubObj.publisher)}版焦點：</b>${esc(activePubObj.chapterStatus === 'documented' ? (activePubObj.chapters?.[0]?.unit || activePubObj.focus) : activePubObj.focus)}</div>`
    : (pg?.tocKeywords?.length ? `<div class="unit-pub-banner-tag">🔍 <b>三版課本檢索詞：</b>${pg.tocKeywords.slice(0, 3).map(k => `<code>${esc(k)}</code>`).join(' ')}</div>` : '');

  return `
    <details class="unit learning-unit" id="unit-card-${u.id}" ${u.nodes?.some(n=>n.id===currentId) || ui.pop && u.nodes?.some(n=>n.id===ui.pop) ? 'open' : ''}>
      <summary class="unit-banner subj-${u.subject || 'chinese'}">
        <div class="unit-banner-info">
          <div class="unit-banner-badges">
            <span class="unit-subj-badge">${u.gradeName || ''} · ${u.subjectName || ''}</span>
            <span class="unit-stage-badge ${completedStages === totalStages ? 'crowned' : ''}">
              ${completedStages === totalStages ? '👑 全通關' : `⭐ 進度 ${completedStages}/${totalStages} 關 (${stagePct}%)`}
            </span>
          </div>
          <h2>${u.icon || '📖'} ${esc(u.title)}</h2>
          ${u.pitfall ? `<small class="unit-pitfall-tag">⚠️ 核心避坑：${esc(u.pitfall)}</small>` : ''}
          ${pubBannerTag}
        </div>
        <span class="unit-expand" aria-hidden="true">展開關卡 ⌄</span>
      </summary>
        <div class="unit-banner-actions unit-resource-actions">
          <button class="guide-btn" data-act="guide" data-id="${u.id}">📘 指南與版本</button>
          <a class="guide-btn ghost-link" href="../#/lesson/${u.id}" title="前往主站完整研經講義">📖 講義</a>
        </div>
      <div class="nodes-wrap">
        ${makeTrailSvg(index)}
        <div class="nodes" style="position:relative;z-index:2;">${nodesHtml}</div>
      </div>
      ${chestHtml}
    </details>
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
      <h1 style="font-size:1.6rem;font-weight:800;margin:0.25rem 0;">每週練習聯賽</h1>
      <p class="small muted">這是本機模擬排行榜，其他角色是練習夥伴，並非真人即時排名。以自己的理解進步為目標。</p>
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
        <h3>本機練習角色排名</h3>
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
        <div class="learning-toolbar" aria-label="朗讀與學習支援">
          <span class="learning-stage">${it.type === 'info' ? '🌱 先理解' : s.feedback ? '🌿 看懂理由' : '🎯 試著回想'} · ${s.index + 1} / ${s.queue.length}</span>
          <button class="btn ghost small" data-act="read-question">🔊 ${it.type === 'info' ? '朗讀觀念' : '題目與選項'}</button>
          <button class="btn ghost small" data-act="speech-rate" aria-label="切換朗讀速度，目前 ${sound.getSpeechRate()} 倍">語速 ${sound.getSpeechRate()}×</button>
          <button class="btn ghost small" data-act="speech-stop">停止朗讀</button>
        </div>
        ${itemView(it, s)}
        ${ui.a.hint && !s.feedback ? `<aside class="card lesson-hint" role="status"><b>💡 解題提示</b><p>${esc(it.hint || '仔細觀察題幹關鍵條件與判準。')}</p></aside>` : ''}
        ${s.feedback ? lessonFeedback(it, s.feedback) : ''}
      </main>

      ${lessonFooter(it, s)}
      <div id="toasts" aria-live="polite" role="status"></div>
    </div>
  `;
}

function itemView(it, s) {
  const a = ui.a, locked = !!s.feedback;

  if (it.type === 'info') {
    return `
      <section class="info-card">
        <div class="info-card-meta">
          <span class="small muted">${it.badge || '📐 觀念起點'}</span>
          ${it.bloom ? `<span class="info-meta-pill">🧠 ${esc(it.bloom)}</span>` : ''}
          <span class="info-meta-pill">原創觀念導讀</span>
        </div>
        <h1>${esc(it.title)}</h1>
        ${it.formula ? `<div class="formula">${esc(it.formula)}</div>` : ''}
        <div class="info-split-grid ${it.svg ? 'has-svg' : ''}">
          <div class="info-text-col">
            <p class="info-body-lead">${esc(it.body)}</p>
            ${it.explanation && it.explanation !== it.body ? `<p class="small muted" style="margin-top:0.5rem;line-height:1.65;">🔬 <b>深層機轉：</b>${esc(it.explanation)}</p>` : ''}
            ${it.examIntel ? `<div class="info-intel-box"><b>🎯 回想檢核：</b><span>${esc(it.examIntel)}</span></div>` : ''}
            ${it.example ? `<div class="info-tip-box"><b>💡 實戰避坑心法：</b><span>${esc(it.example)}</span></div>` : ''}
          </div>
          ${it.svg ? `
            <div class="info-visual-col">
              ${it.infographTitle ? `<div class="info-svg-caption-top">📊 ${esc(it.infographTitle)}</div>` : ''}
              ${conceptFigure(it.svg,it.infographTitle || it.title,it.infographCaption)}
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }

  const hasStimulus = !!(it.audio || it.readingGroupText || (it.crops && it.crops.length > 0));
  const stimulusHtml = hasStimulus ? `
    <div class="lesson-stimulus-pane">
      ${it.audio ? `
        <div class="audio-player-card">
          <div class="audio-player-header">
            <span class="audio-badge">🎧 官方會考英語聽力音檔</span>
            <span class="small muted">點擊播放聽取題幹與對話</span>
          </div>
          <audio class="cap-audio-element" controls preload="none" src="../${esc(it.audio)}">您的瀏覽器不支援音訊播放。</audio>
        </div>
      ` : ''}
      ${it.sourcePaper ? `
        <p class="source-paper-link">
          <a href="../${esc(it.sourcePaper)}" target="_blank" rel="noopener">
            <span>📄</span> 開啟官方原始題本${it.subject === 'listening' ? '（ZIP）' : '（PDF）'} ↗
          </a>
        </p>
      ` : ''}
      ${it.readingGroupText ? `
        <div class="reading-group-box" style="margin: 0.75rem 0; padding: 1rem 1.25rem; background: var(--bg-soft, #f8fafc); border-left: 4px solid var(--primary, #6366f1); border-radius: 8px; line-height: 1.7; font-size: 0.95rem;">
          <div style="font-weight: 700; color: var(--primary, #6366f1); margin-bottom: 0.35rem;">📖 題組閱讀材料：</div>
          <div>${esc(it.readingGroupText)}</div>
        </div>
      ` : ''}
      ${it.crops && it.crops.length > 0 ? `
        <div class="crops-wrap" style="text-align: center; margin: 0.75rem 0;">
          ${it.crops.map(c => `<img src="../${esc(c.src)}" alt="會考原始題目或題組材料" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--border, #e2e8f0); background: #ffffff;" loading="lazy">`).join('')}
        </div>
      ` : ''}
    </div>
  ` : '';

  const promptHtml = `
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
        ${a.tokens.length ? a.tokens.map((tok, i) => `<button class="tok" data-act="untok" data-i="${i}" ${locked ? 'disabled' : ''}>${esc(tok)}</button>`).join('') : '<span class="muted small">點擊下方步驟排出思維推演順序：</span>'}
      </div>
      <div class="bank">
        ${(it.words || []).map((w, idx) => `
          <button class="tok ${a.tokens.includes(w) ? 'used' : ''}" data-act="tok" data-w="${esc(w)}" ${locked || a.tokens.includes(w) ? 'disabled' : ''}>${esc(w)}</button>
        `).join('')}
      </div>
    `;
  } else if (it.type === 'match') {
    const pairs = it.pairs || [];
    if (a.matchId !== it.id) {
      a.matchId = it.id;
      a.matchOrder = shuffle(pairs.map((_, i) => i), it.id);
      if (a.matchOrder.length > 1 && a.matchOrder.every((v, i) => v === i)) a.matchOrder.push(a.matchOrder.shift());
    }
    body = `
      ${a.matchError ? `<aside class="repair-coach" role="status">${esc(a.matchError)}</aside>` : ''}
      <div class="match">
        <div>
          ${pairs.map(([l], i) => `
            <button class="mcell ${a.done.includes(i) ? 'done' : ''} ${a.left === i ? 'sel' : ''}" data-act="mL" data-i="${i}" ${locked || a.done.includes(i) ? 'disabled' : ''}>${esc(l)}</button>
          `).join('')}
        </div>
        <div>
          ${a.matchOrder.map(i => `
            <button class="mcell ${a.done.includes(i) ? 'done' : ''}" data-act="mR" data-i="${i}" ${locked || a.done.includes(i) ? 'disabled' : ''}>${esc(pairs[i][1])}</button>
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

  return `
    ${promptHtml}
    <div class="lesson-split-wrap ${hasStimulus ? 'has-stimulus' : ''}">
      ${stimulusHtml}
      <div class="lesson-interact-pane">
        ${body}
      </div>
    </div>
  `;
}

function lessonFeedback(it, f) {
  const praise = PRAISE[Math.floor(Math.random() * PRAISE.length)];
  return `<section class="card lesson-feedback verdict ${f.ok ? 'ok' : 'bad'}" aria-live="polite">
    <h2>${f.ok ? `✔ ${praise}` : '✘ 需要再釐清觀念'}</h2>
    ${f.assisted ? '<p class="assistance-note">這次使用了提示或配對修正，記為輔助作答。下次再獨立試一次就好。</p>' : ''}
    <p>正解：<b>${esc(answerText(it))}</b></p>
    <div class="learning-toolbar">
      <button class="btn ghost small" data-act="read-answer">🔊 朗讀答案</button>
      <button class="btn ghost small" data-act="read-explanation">🔊 朗讀解說</button>
    </div>
    ${!f.ok ? `<div class="repair-coach"><h3>🧭 一起找出關鍵</h3><ol>${repairSteps(it, f.value).map(step => `<li>${esc(step)}</li>`).join('')}</ol></div>` : ''}
    ${it.why ? `<p class="why" style="white-space:pre-line">${esc(it.why)}</p>` : ''}
    ${it.relatedQuestions?.length ? `<p>相關題目</p><ul>${it.relatedQuestions.map(q => `<li><a href="../${esc(q.href)}" target="_blank" rel="noopener">${esc(q.title)}</a> · ${esc(q.basis)}</li>`).join('')}</ul>` : ''}
  </section>`;
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
    return `
      <footer class="check ${f.ok ? 'ok' : 'bad'}">
        <div class="check-in">
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

function conceptFigure(svg, title, caption = '') {
  return `<figure class="concept-figure" data-act="zoom-figure" data-title="${esc(title)}"><div class="svg-wrap" title="點擊放大檢視">${svg}</div><figcaption><span>${esc(caption || title)}</span><button class="btn ghost small" data-act="zoom-figure" data-title="${esc(title)}" aria-label="放大圖解：${esc(title)}">🔍 放大圖解 ↗</button></figcaption></figure>`;
}

function renderGuideChart(chart) {
  if (!chart) return '';
  if (chart.type === 'bar' && Array.isArray(chart.bars)) {
    return `
      <div class="card guide-chart-card">
        <div class="guide-section-badge">📈 課綱量化數據圖表</div>
        <h4>${esc(chart.title || '數據對照圖')}</h4>
        ${chart.subtitle ? `<p class="small muted">${esc(chart.subtitle)}</p>` : ''}
        <div class="quest-bar-chart">
          ${chart.bars.map(b => `
            <div class="q-bar-row">
              <div class="q-bar-head">
                <b>${esc(b.label)}</b>
                <span class="q-bar-val">${esc(b.display || b.value)} ${esc(chart.unit || '')}</span>
              </div>
              <div class="progress q-bar-track"><span style="width:${Math.min(100, Math.max(8, Number(b.value) || 50))}%"></span></div>
              ${b.note ? `<small class="muted">${esc(b.note)}</small>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  if (chart.type === 'flow' && Array.isArray(chart.steps)) {
    return `
      <div class="card guide-chart-card">
        <div class="guide-section-badge">🔄 系統演進與機轉流程圖</div>
        <h4>${esc(chart.title || '核心流程圖')}</h4>
        ${chart.subtitle ? `<p class="small muted">${esc(chart.subtitle)}</p>` : ''}
        <div class="quest-flow-chart">
          ${chart.steps.map((st, idx) => `
            <div class="q-flow-step">
              <span class="q-flow-num">${idx + 1}</span>
              <div>
                <b>${esc(st.name)}</b>
                <p class="small muted">${esc(st.detail)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  return '';
}

function renderGuideModalContent(g) {
  const tabs = [
    ['kp', '🧠 知識點與圖解'],
    ['wonder', '✨ 趣味與口訣'],
    ['visuals', '📊 表格與圖表'],
    ['publishers', '📚 三版課本對照'],
    ['thinking', '⚡ 解題思維鏈']
  ];
  const curTab = tabs.some(t => t[0] === ui.guideTab) ? ui.guideTab : 'kp';

  let tabBody = '';
  if (curTab === 'wonder') {
    const uw = g.unitWonder;
    tabBody = uw ? `
      <div style="display:flex;flex-direction:column;gap:0.85rem;margin-top:0.75rem;">
        <div class="card">
          <div class="guide-section-badge">🌟 ${esc(uw.superpower || '學科生活超能力')}</div>
          <h4 style="margin:0.4rem 0;">${esc(uw.wonderTitle || g.title)}</h4>
          <p class="small" style="line-height:1.65;"><b>✨ 生活超能力連結：</b>${esc(uw.lifeConnection)}</p>
          <p class="small" style="line-height:1.65;margin-top:0.45rem;"><b>💡 驚喜冷知識：</b>${esc(uw.funFact)}</p>
        </div>
        <div class="card">
          <div class="guide-section-badge">🎵 考場秒殺記憶口訣</div>
          <pre style="white-space:pre-wrap;font-family:inherit;font-size:0.9rem;line-height:1.65;margin:0.4rem 0 0;background:var(--bg-soft, #f8fafc);padding:0.75rem;border-radius:8px;">${esc(uw.mnemonic)}</pre>
        </div>
        <div class="card">
          <div class="guide-section-badge">🧠 動腦快問快答</div>
          <p class="small"><b>${esc(uw.curiosityQ)}</b></p>
          <p class="small muted" style="margin-top:0.35rem;">${esc(uw.curiosityA)}</p>
          ${uw.joyfulHack ? `<div class="info-tip-box" style="margin-top:0.5rem;"><b>🚀 快樂學好秘訣：</b><span>${esc(uw.joyfulHack)}</span></div>` : ''}
        </div>
      </div>
    ` : '<p class="muted">載入中…</p>';
  } else if (curTab === 'kp') {
    const uw = g.unitWonder;
    tabBody = `
      <div class="guide-concept-hero card">
        <div class="guide-section-badge">🎯 108 課綱核心觀念錨定</div>
        <p style="margin:0.35rem 0 0;line-height:1.65;">${esc(g.concept || '')}</p>
        ${uw ? `<div class="info-tip-box" style="margin-top:0.55rem;"><b>🎵 秒殺口訣速記：</b><span style="white-space:pre-wrap;">${esc(uw.mnemonic)}</span></div>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;gap:0.9rem;margin-top:0.85rem;">
        ${(g.knowledgePoints || []).map((kp, idx) => {
          const kpKey = kp.id || `${g.unitId}-kp-${idx}`;
          const isBlind = !!ui.blindfoldedKps[kpKey];
          return `
            <div class="card guide-kp-card ${isBlind ? 'is-blindfolded' : ''}">
              <div class="guide-kp-head">
                <div>
                  <span class="info-meta-pill">🧠 ${esc(kp.bloom || '核心素養')}</span>
                  <span class="info-meta-pill">原創知識整理</span>
                </div>
                <button class="btn ghost small" data-act="guide-blindfold" data-kp="${esc(kpKey)}">
                  ${isBlind ? '👁️ 揭曉答案' : '🙈 遮蔽回想'}
                </button>
              </div>
              <h4 style="margin:0.4rem 0;">${esc(kp.title)}</h4>
              <p class="small" ${isBlind ? 'hidden' : ''}><b>🎯 核心定義：</b>${esc(kp.core || '')}</p>
              <details class="guide-kp-maskable" ${isBlind ? 'hidden' : ''}><summary>看實例與回想方法</summary>
                ${kp.formula ? `<div class="formula" style="margin:0.5rem 0;">📐 ${esc(kp.formula)}</div>` : ''}
                ${kp.explanation ? `<p class="small muted" style="margin-top:0.35rem;"><b>🔬 理解練習：</b>${esc(kp.explanation)}</p>` : ''}
                ${kp.examIntel ? `<div class="info-intel-box" style="margin-top:0.5rem;"><b>🎯 回想檢核：</b><span>${esc(kp.examIntel)}</span></div>` : ''}
                ${kp.tip ? `<div class="info-tip-box" style="margin-top:0.5rem;"><b>🛡️ 考場避坑防線：</b><span>${esc(kp.tip)}</span></div>` : ''}
              </details>
              ${kp.svg ? `
                <div style="margin-top:0.65rem;" ${isBlind ? 'hidden' : ''}>
                  ${kp.infographTitle ? `<div class="small muted" style="font-weight:700;margin-bottom:0.25rem;">📊 ${esc(kp.infographTitle)}</div>` : ''}
                  ${conceptFigure(kp.svg,kp.infographTitle || kp.title,kp.infographCaption)}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (curTab === 'visuals') {
    const tbl = g.table;
    const contrast = g.contrast;
    tabBody = `
      <div style="display:flex;flex-direction:column;gap:1rem;margin-top:0.75rem;">
        ${tbl && Array.isArray(tbl.rows) && tbl.rows.length ? `
          <div class="card">
            <div class="guide-section-badge">📋 結構化概念比較表</div>
            <h4 style="margin:0.3rem 0 0.65rem;">${esc(tbl.title || `${g.title} 對照表`)}</h4>
            <div class="quest-table-wrap">
              <table class="quest-guide-table">
                <thead>
                  <tr><th>比較項目</th><th>核心內容與特徵</th><th>關鍵辨析 / 實例</th></tr>
                </thead>
                <tbody>
                  ${tbl.rows.map(r => `
                    <tr>
                      <td data-label="比較項目"><b>${esc(r[0] || '')}</b></td>
                      <td data-label="核心內容">${esc(r[1] || '')}</td>
                      <td data-label="關鍵辨析">${esc(r[2] || '')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}
        ${renderGuideChart(g.chart)}
        ${contrast && (contrast.left || contrast.right) ? `
          <div class="card">
            <div class="guide-section-badge">⚖️ 易混概念雙向辨析</div>
            <h4 style="margin:0.3rem 0 0.6rem;">${esc(contrast.focus || '核心概念正反對照')}</h4>
            <div class="quest-contrast-grid">
              <div class="q-contrast-box left">
                <b>🔹 ${esc(contrast.leftLabel || '概念 A')}</b>
                <p class="small">${esc(contrast.left)}</p>
              </div>
              <div class="q-contrast-box right">
                <b>🔸 ${esc(contrast.rightLabel || '概念 B')}</b>
                <p class="small">${esc(contrast.right)}</p>
              </div>
            </div>
            ${contrast.answer ? `<p class="small muted" style="margin-top:0.6rem;">💡 <b>判準總結：</b>${esc(contrast.answer)}</p>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  } else if (curTab === 'publishers') {
    const pg = g.publisherGuide;
    const pubs = pg?.publishers || [];
    const filteredPubs = ui.pubFilter === 'all' ? pubs : pubs.filter(p => p.publisher === ui.pubFilter);
    tabBody = `
      <div style="display:flex;flex-direction:column;gap:0.85rem;margin-top:0.75rem;">
        <p class="scope-help">本站提供跨版本原創核心教材。${(course.index.publisherCoverage || []).map(p=>`${esc(p.name)} ${p.documented}/${p.total} 單元有公開章節來源`).join('；')}。來源紀錄不表示已核對最新年度或全冊頁碼；自學建議不代表出版社教材特色。</p>
        <div class="subject-filter-bar">
          <span class="filter-row-label">切換版本：</span>
          ${QUEST_PUBLISHERS.map(p => `
            <button class="subj-pill pub-pill ${ui.pubFilter === p.id ? 'active' : ''}" data-act="guide-pub" data-pub="${p.id}">
              ${p.icon} ${p.label}
            </button>
          `).join('')}
        </div>
        ${pg?.tocKeywords?.length ? `
          <div class="card">
            <div class="guide-section-badge">🔍 康軒 / 翰林 / 南一 課本目錄秒查關鍵詞</div>
            <p class="small muted" style="margin:0.25rem 0 0.5rem;">翻開學校課本或講義目錄，搜尋以下核心詞即可直接對接本單元：</p>
            <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
              ${pg.tocKeywords.map(k => `<code class="quest-kw-pill">${esc(k)}</code>`).join('')}
            </div>
          </div>
        ` : ''}
        ${ui.pubFilter === 'all' && pubs.length >= 3 ? `
          <div class="card quest-matrix-card">
            <div class="guide-section-badge">📊 108 課綱三版本全景對照矩陣</div>
            <h4 style="margin:0.35rem 0 0.5rem;">康軒・翰林・南一 學習焦點橫向速覽</h4>
            <div class="quest-matrix-table-wrap">
              <table class="quest-pub-matrix-table">
                <thead>
                  <tr>
                    <th>版本</th>
                    <th>課本章節進度</th>
                    <th>核心學習焦點</th>
                    <th>自學搭配策略</th>
                    <th>考場避坑防線</th>
                    <th>快速設定</th>
                  </tr>
                </thead>
                <tbody>
                  ${pubs.map(p => `
                    <tr class="pub-row-${p.publisher}">
                      <td data-label="版本"><b>${p.icon} ${esc(p.name)}</b></td>
                      <td data-label="章節進度">
                        ${p.chapters?.length ? p.chapters.map(ch => `<div class="small">${esc(ch.book || ch.unit)}</div>`).join('') : '<span class="muted small">依課綱核心進度對接</span>'}
                      </td>
                      <td data-label="學習焦點"><span class="small">${esc(p.focus || p.coreFocus || '')}</span></td>
                      <td data-label="自學策略"><span class="small">${esc(p.strategy || p.studyStrategy || '')}</span></td>
                      <td data-label="考場防線"><span class="small muted">${esc(p.checkpoint || p.examCheckpoint || '')}</span></td>
                      <td data-label="快速設定">
                        <button class="btn ghost small" data-act="set-preferred-pub" data-pub="${p.publisher}">設為課本</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}
        <div class="quest-pub-cards">
          ${filteredPubs.map(p => `
            <div class="card quest-pub-card">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
                <b>${p.icon} ${esc(p.name)}</b>
                <span class="info-meta-pill">${p.chapterStatus === 'documented' ? '有公開章節來源' : '章節待核對'}</span>
              </div>
              ${p.chapterStatus === 'documented' && p.chapters?.length ? p.chapters.map(ch => `
                <p class="small"><b>📖 章節：</b>${esc(ch.book)} · ${esc(ch.section)}「${esc(ch.unit)}」</p>
              `).join('') : ''}
              <p class="small"><b>🎯 本站原創學習焦點：</b>${esc(p.focus)}</p>
              ${(p.documented || []).map(d=>`<p class="small"><a class="source-link" href="${esc(d.url)}" target="_blank" rel="noopener">查看章節來源：${esc(d.title)} ↗</a></p>`).join('')}
              <p class="small" style="margin-top:0.25rem;"><b>💡 自學搭配建議：</b>${esc(p.strategy)}</p>
              <p class="small muted" style="margin-top:0.25rem;"><b>🛡️ 段考會考檢核：</b>${esc(p.checkpoint)}</p>
              <button class="btn ghost small" data-act="set-preferred-pub" data-pub="${p.publisher}" style="margin-top:0.5rem;">📌 設為我的學校課本</button>
            </div>
          `).join('')}
        </div>
        ${g.officialRefs?.length ? `
          <div class="card">
            <div class="guide-section-badge">🏛️ 教育部 108 課綱官方指標依據</div>
            ${g.officialRefs.map(r => `
              <div style="margin-top:0.4rem;">
                <b class="small">${esc(r.code)} (PDF p.${r.page})：</b>
                <p class="small muted">${esc(r.excerpt)}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  } else if (curTab === 'thinking') {
    const wc = g.workedCase;
    const ladder = g.zeroToTopLadder;
    const et = g.examType;
    const qTypes = g.questionTypeList || [];
    const patch = g.knowledgeSufficiencyPatch;
    const capWe = g.capWorkedExample;
    const capFp = g.capFollowUpPractice;
    tabBody = `
      <div style="display:flex;flex-direction:column;gap:0.85rem;margin-top:0.75rem;">
        ${ladder ? `
          <div class="card">
            <div class="guide-section-badge">🧭 零基礎小白 ➔ 會考 A++ 頂標 三階通關藍圖</div>
            <div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:0.4rem;">
              <div class="info-tip-box"><b>🌱 Step 1｜小白破冰（B 保底）：</b><span>${esc(ladder.zeroFoundation)}</span></div>
              <div class="info-tip-box"><b>⚡ Step 2｜主流破題（B++ ➔ A）：</b><span>${esc(ladder.mainstreamBtoA)}</span></div>
              <div class="info-tip-box"><b>🏆 Step 3｜頂標突破（A+ ➔ A++）：</b><span>${esc(ladder.topTierAPlusPlus)}</span></div>
            </div>
          </div>
        ` : ''}
        ${qTypes.length ? `
          <div class="card">
            <div class="guide-section-badge">🗂️ 歷屆會考（109～115）三大核心題型分類與對應知識點</div>
            <div style="display:flex;flex-direction:column;gap:0.55rem;margin-top:0.45rem;">
              ${qTypes.map(qt => `
                <div class="info-tip-box" style="display:flex;flex-direction:column;gap:0.25rem;">
                  <div><b>${esc(qt.code)} · ${esc(qt.archetypeName)}</b> <span class="small muted">（${esc(qt.capRef)}）</span></div>
                  <div class="small"><b>回推必備知識點：</b>${esc(qt.requiredKnowledge)}</div>
                  <div class="small" style="color:var(--primary-ink, #193e35);"><b>⚡ 破題 SOP：</b>${esc(qt.solvingSOP)}</div>
                  ${qt.archetypeDrill ? `<details style="margin-top:0.25rem;"><summary class="small" style="cursor:pointer;font-weight:700;">🎮 點看【${esc(qt.code)}】實戰破關挑戰與解析</summary><p class="small" style="margin:0.25rem 0;">${esc(qt.archetypeDrill.stem)}<br><b>正確判準：</b>${esc(qt.archetypeDrill.options?.[qt.archetypeDrill.answer] || '')}<br><span class="muted">${esc(qt.archetypeDrill.explanation)}</span></p></details>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        ${patch && patch.patchPoints?.length ? `
          <div class="card">
            <div class="guide-section-badge">🧩 108 課綱 × 會考回推：微觀知識充足度補強講義</div>
            <p class="small muted" style="margin:0.25rem 0;">${esc(patch.auditConclusion)}</p>
            <div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:0.4rem;">
              ${patch.patchPoints.map(pt => `
                <div class="info-tip-box">
                  <b>${esc(pt.tag)}｜${esc(pt.title)}：</b>
                  <span>${esc(pt.content)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        ${et && capWe ? `
          <div class="card">
            <div class="guide-section-badge">🎯 【實戰例題一】會考高頻題型與五步詳解：${esc(et.typeName)}</div>
            <p class="small muted" style="margin:0.25rem 0;">🔥 ${esc(et.frequency)} · 課綱指標：${esc(et.targetCodes)}</p>
            <h4 style="margin:0.4rem 0;">${esc(capWe.title)}：${esc(capWe.stem)}</h4>
            <p class="small"><b>正確答案：</b>(${String.fromCharCode(65 + (capWe.answer || 0))}) ${esc(capWe.options?.[capWe.answer || 0] || '')}</p>
            <ol class="quest-thinking-steps" style="margin-top:0.4rem;">
              ${(capWe.steps || []).map(st => `<li>${esc(st)}</li>`).join('')}
            </ol>
          </div>
        ` : ''}
        ${capFp ? `
          <div class="card">
            <div class="guide-section-badge">🚀 【進階練習二】歷屆會考真題／逆向遷移五步詳解</div>
            <h4 style="margin:0.4rem 0;">${esc(capFp.title)}：${esc(capFp.stem)}</h4>
            <p class="small"><b>正確答案：</b>(${String.fromCharCode(65 + (capFp.answer || 0))}) ${esc(capFp.options?.[capFp.answer || 0] || '')}</p>
            <ol class="quest-thinking-steps" style="margin-top:0.4rem;">
              ${(capFp.steps || []).map(st => `<li>${esc(st)}</li>`).join('')}
            </ol>
          </div>
        ` : ''}
        <aside class="reading-method"><h3>看圖也要試著說明</h3><ol><li>找對象：圖在比較哪些概念？</li><li>讀關係：箭頭、座標或分支代表什麼？</li><li>驗條件：什麼情況可以用？換個例子還成立嗎？</li></ol><p>示意圖用來整理關係；數值圖要一起核對單位與適用條件。</p></aside>
        ${wc ? `
          <div class="card">
            <div class="guide-section-badge">⚡ 典範例題三步思維鏈</div>
            <h4 style="margin:0.35rem 0;">題目情境：${esc(wc.problem)}</h4>
            <ol class="quest-thinking-steps">
              ${(wc.steps || []).map(st => `<li>${esc(st)}</li>`).join('')}
            </ol>
            ${wc.check ? `<div class="info-tip-box" style="margin-top:0.6rem;"><b>✅ 驗算與合理性檢核：</b><span>${esc(wc.check)}</span></div>` : ''}
          </div>
        ` : ''}
        ${g.example ? `
          <div class="card">
            <div class="guide-section-badge">📐 快速破題示範</div>
            <p class="small" style="margin-top:0.35rem;line-height:1.65;">${esc(g.example)}</p>
          </div>
        ` : ''}
        ${g.pitfall ? `
          <div class="card">
            <div class="guide-section-badge">⚠️ 考場高頻陷阱防禦</div>
            <p class="small" style="margin-top:0.35rem;line-height:1.65;">${esc(g.pitfall)}</p>
          </div>
        ` : ''}
        ${g.task ? `
          <div class="card">
            <div class="guide-section-badge">🗣️ 費曼白話自我檢測任務</div>
            <p class="small" style="margin-top:0.35rem;line-height:1.65;">${esc(g.task)}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  return `
    <div class="guide-modal-header">
      <span class="unit-subj-badge">${g.grade}年級 ${g.term === 1 ? '上' : '下'}學期 · ${esc(g.subject)}</span>
      <h2 style="margin:0.35rem 0 0.2rem;">📘 ${esc(g.title)} · 全方位自學指南</h2>
    </div>
    <div class="guide-tabs-bar" role="tablist" aria-label="單元指南分頁">
      ${tabs.map(([id, label]) => `
        <button class="guide-tab-btn ${curTab === id ? 'active' : ''}" data-act="guide-tab" data-gtab="${id}" role="tab" aria-selected="${curTab === id}">
          ${label}
        </button>
      `).join('')}
    </div>
    <div class="guide-tab-panel">
      ${tabBody}
    </div>
    <div class="guide-modal-footer">
      <button class="btn primary" data-act="start-unit-from-guide" data-unit="${g.unitId}">🎮 立即闖關本單元</button>
      <a class="btn ghost" href="../#/lesson/${g.unitId}">📖 打開主站完整研經講義 ↗</a>
    </div>
  `;
}

// -------------------------------------------------------------
// Views: Modals (Guide, Tracks, Placement, Result)
// -------------------------------------------------------------
function modalView() {
  if (game.result) return resultView();
  if (!ui.modal) return '';

  let inner = '';
  const isWideModal = ui.modal === 'guide' || ui.modal === 'tracks';
  if (ui.modal === 'guide') {
    const g = course.guides.get(ui.guide);
    if (!g) inner = '<p>指南載入中…</p>';
    else inner = renderGuideModalContent(g);
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
  } else if (ui.modal === 'shop') {
    const st = game.state;
    inner = `
      <h2>💎 能量寶石商店</h2>
      <p class="muted">透過自學闖關、金冠挑戰與每日任務累積寶石，兌換學習守護道具！</p>
      <div class="shop-balance card" style="margin: 1rem 0; display:flex; justify-content:space-between; align-items:center; background: var(--bg-soft, #f8fafc); border-radius: 12px; padding: 0.75rem 1rem;">
        <span>目前持有寶石：</span>
        <b style="font-size: 1.3rem; color: #0284c7;">💎 ${st.gems}</b>
      </div>
      <div class="shop-items-grid" style="display:flex; flex-direction:column; gap: 0.75rem;">
        <div class="card shop-item" style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap: 0.75rem;">
            <span style="font-size: 2rem;">🧊</span>
            <div>
              <b>連續自學凍結卡</b><br>
              <small class="muted">當天未學習時自動防護連續紀錄（目前持有：${st.freezes}/2）</small>
            </div>
          </div>
          <button class="btn primary small shop-price-btn" data-act="buy-freeze" ${st.gems >= 100 && st.freezes < 2 ? '' : 'disabled'}>
            100 💎 兌換
          </button>
        </div>
        <div class="card shop-item" style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap: 0.75rem;">
            <span style="font-size: 2rem;">❤️</span>
            <div>
              <b>挑戰心心全回復</b><br>
              <small class="muted">將單元挑戰或會考衝刺的心心立即補滿至 3 顆</small>
            </div>
          </div>
          <button class="btn primary small shop-price-btn" data-act="buy-hearts" ${st.gems >= 30 ? '' : 'disabled'}>
            30 💎 兌換
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="modal-bg" data-act="close"></div>
    <div class="modal card ${isWideModal ? 'modal-wide' : ''}" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-width:${isWideModal ? '760px' : '540px'};width:92%;max-height:88vh;overflow-y:auto;z-index:2000;">
      <button class="btn ghost small" data-act="close" style="float:right;">✕</button>
      ${inner}
    </div>
  `;
}

function resultView() {
  const r = game.result;
  if (!r) return '';
  if (r.passed || r.mode === 'placement') setTimeout(launchCelebration, 50);

  if (r.mode === 'placement') {
    const recTrack = course.track(r.recommended) || { title: '七年級上學期', level: '國一打底與概念溯源' };
    const pct = Math.round((r.accuracy || 0) * 100);
    const secKeys = ['s1', 's2', 's3', 's4', 's5', 's6'];

    return `
      <div class="modal-bg"></div>
      <div class="modal card center placement-report-card" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-width:540px;width:92%;max-height:88vh;overflow-y:auto;z-index:2000;text-align:center;padding:2rem 1.5rem;">
        ${mascot('celebrate', 80)}
        <h2 style="margin:1rem 0 0.25rem;">🧭 全科程度定位檢測診斷報告</h2>
        <p class="muted">完成 ${r.total} 題跨學期素養診斷，用時 ${r.seconds || 0} 秒</p>

        <div class="placement-highlight card" style="margin:1.25rem 0;background:var(--bg-soft, #f8fafc);border-radius:12px;padding:1rem;text-align:left;">
          <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.25rem;">💡 這次抽樣練習的起點建議：</div>
          <div style="font-size:1.15rem;font-weight:700;color:var(--primary);margin-bottom:0.25rem;">推薦從「${esc(recTrack.title)}」啟航</div>
          <p class="small muted" style="margin:0;">獨立首次答對 <b>${pct}%</b>（${r.firstTry}/${r.total} 題）。少量抽樣只供選擇練習起點，不能判定整學期能力；未抽到的範圍尚無證據。你也可以自由選擇學校正在教的學期。</p>
        </div>

        <div class="placement-breakdown" style="text-align:left;margin-bottom:1.5rem;">
          <h4 style="margin-bottom:0.75rem;font-size:0.95rem;">📊 六學期答對率分佈</h4>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            ${secKeys.map(sid => {
              const sec = course.track(sid) || { title: sid };
              const corr = r.bySection?.[sid] || 0;
              const tot = r.totalBySection?.[sid] || 0;
              const sPct = tot > 0 ? Math.round((corr / tot) * 100) : 0;
              return `
                <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.88rem;">
                  <span style="width:90px;white-space:nowrap;font-weight:600;">${sec.gradeTermName || sec.title}</span>
                  <div class="progress" style="flex:1;height:10px;"><span style="width:${sPct}%"></span></div>
                  <span class="muted" style="width:45px;text-align:right;">${corr}/${tot}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:0.5rem;">
          <button class="btn primary big" data-act="apply-placement" data-track="${r.recommended}">
            前往 ${esc(recTrack.title)} 開始自學 →
          </button>
          <button class="btn ghost small" data-act="done">關閉診斷報告</button>
        </div>
      </div>
    `;
  }

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
      <p class="muted">${r.perfect ? '這一回都能獨立答對！隔天再回想，看看記得多少。' : r.passed ? '練習完成！把還需要提示的觀念，再試一次。' : '錯題已自動排入錯題本，隨時可以複習。'}</p>
      <div style="display:flex;justify-content:center;gap:1.5rem;margin:1.5rem 0;">
        <div><small class="muted">獲得能量</small><br><b>⚡ +${r.xp} XP</b></div>
        <div><small class="muted">獨立首次答對</small><br><b>🎯 ${r.independent}/${r.total} 題</b></div>
        <div><small class="muted">用時</small><br><b>⏱ ${r.seconds || 0} 秒</b></div>
      </div>
      <p class="result-evidence-note">${r.assisted || 0} 題使用輔助 · ${r.repairCount || 0} 題建議回練。觀念卡與課內重試不納入首次答題統計。XP 表示參與，學習仍要靠回想驗收。</p>
      <div class="mission-actions"><button class="btn primary big" data-act="done">繼續前進</button>${r.repairCount ? '<button class="btn ghost" data-act="result-practice">查看補強練習 →</button>' : ''}</div>
    </div>
  `;
}

function renderQuestDomainRadar() {
  const domainDefs = [
    { id: '語文', label: '語文領域', subjects: ['chinese', 'english', 'local'], icon: '📜' },
    { id: '數學', label: '數學領域', subjects: ['math'], icon: '📐' },
    { id: '自然', label: '自然科學', subjects: ['biology', 'physics', 'chemistry', 'earth'], icon: '🔬' },
    { id: '社會', label: '社會領域', subjects: ['history', 'geography', 'civics'], icon: '🌍' },
    { id: '科技', label: '科技領域', subjects: ['computing', 'technology'], icon: '💻' },
    { id: '藝術', label: '藝術領域', subjects: ['visual', 'music', 'performing'], icon: '🎨' },
    { id: '健體', label: '健康與體育', subjects: ['health', 'pe'], icon: '🏃' },
    { id: '綜合', label: '綜合活動', subjects: ['home', 'scout', 'guidance'], icon: '🧭' }
  ];

  const allUnits = course.index.sections.flatMap(s => s.units);
  const statsByDomain = domainDefs.map(d => {
    const dUnits = allUnits.filter(u => d.subjects.includes(u.subject));
    let totalNodes = 0, doneNodes = 0, crowns = 0;
    for (const u of dUnits) {
      if (game.state.crowns[u.id]) crowns++;
      for (const n of u.nodes || []) {
        totalNodes++;
        const st = game.nodeStatus(n.id);
        if (st === 'done' || st === 'crowned' || st === 'tested') doneNodes++;
      }
    }
    const pct = totalNodes > 0 ? Math.round((doneNodes / totalNodes) * 100) : 0;
    return { ...d, unitCount: dUnits.length, totalNodes, doneNodes, crowns, pct };
  });

  // Build 8-axis SVG Radar Chart
  const cx = 130, cy = 130, maxR = 88;
  const angles = statsByDomain.map((_, i) => (Math.PI * 2 * i) / statsByDomain.length - Math.PI / 2);
  const gridRings = [0.25, 0.5, 0.75, 1].map(r => {
    const pts = angles.map(a => `${(cx + Math.cos(a) * maxR * r).toFixed(1)},${(cy + Math.sin(a) * maxR * r).toFixed(1)}`).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="${r < 1 ? '2,2' : ''}"/>`;
  }).join('');

  const axesLines = angles.map((a, i) => {
    const x2 = (cx + Math.cos(a) * maxR).toFixed(1);
    const y2 = (cy + Math.sin(a) * maxR).toFixed(1);
    const lx = (cx + Math.cos(a) * (maxR + 24)).toFixed(1);
    const ly = (cy + Math.sin(a) * (maxR + 20)).toFixed(1);
    return `
      <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="var(--border)" stroke-width="1"/>
      <text x="${lx}" y="${ly}" font-size="10" font-weight="800" fill="var(--text)" text-anchor="middle" dominant-baseline="middle">${statsByDomain[i].id} ${statsByDomain[i].pct}%</text>
    `;
  }).join('');

  const dataPts = statsByDomain.map((d, i) => {
    const ratio = d.pct / 100;
    const x = (cx + Math.cos(angles[i]) * maxR * ratio).toFixed(1);
    const y = (cy + Math.sin(angles[i]) * maxR * ratio).toFixed(1);
    return `${x},${y}`;
  }).join(' ');

  return `
    <section class="card" style="margin-top:1.25rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.85rem;">
        <div>
          <h3>📊 八大領域關卡進度</h3>
          <p class="small muted">已完成關卡 / 全部關卡，表示走過的進度。完成與金冠不等於已精熟全部教材。</p>
        </div>
      </div>
      <div class="quest-radar-layout">
        <div class="quest-radar-svg-box">
          <svg viewBox="0 0 260 260" style="width:100%;max-width:250px;display:block;margin:0 auto;" role="img" aria-label="八大領域關卡完成比例，數值另見右側文字">
            ${gridRings}
            ${axesLines}
            <polygon points="${dataPts}" fill="rgba(45, 106, 79, 0.28)" stroke="var(--primary)" stroke-width="2.5"/>
          </svg>
        </div>
        <div class="quest-domain-bars">
          ${statsByDomain.map(d => `
            <div class="q-domain-row">
              <div style="display:flex;justify-content:space-between;font-size:0.84rem;margin-bottom:0.2rem;">
                <b>${d.icon} ${d.label} (${d.unitCount} 單元)</b>
                <span class="muted">${d.doneNodes}/${d.totalNodes} 關 · 👑 ${d.crowns} (${d.pct}%)</span>
              </div>
              <div class="progress" style="height:9px;"><span style="width:${d.pct}%"></span></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderLearningEvidence() {
  const rows = learningEvidence(course, game.state);
  return `<section class="card evidence-panel"><div class="section-kicker">LEARNING EVIDENCE</div><h2>練過哪些，還要補什麼？</h2><p class="small muted">本次更新起記錄首次作答：提示與錯配修正後答對不列入獨立答對。舊紀錄保留，但不推估成績。</p><div class="evidence-rows">${rows.map(d=>`<div class="evidence-row"><span class="domain-token">${d.icon}</span><div><b>${d.label}</b><small>${d.questions ? `練過 ${d.questions} 道不同題目 · ${d.independent}/${d.trials} 次獨立答對` : '尚無新的作答證據'}</small></div><strong>${d.rate === null ? '待探索' : d.rate+'%'}</strong></div>`).join('')}</div><p class="scope-help">比例只反映已練習的題目；題數少、重複練習與難度不同，都會影響結果。這不是全領域能力評分。</p><a class="btn ghost" href="#practice">選一個範圍練習 →</a></section>`;
}

// -------------------------------------------------------------
// Core Render & Event Dispatcher
// -------------------------------------------------------------
let renderedItem = null;
function render() {
  if (!game) return;
  const itemId = game.currentItem()?.id || null;
  if (renderedItem !== itemId) sound.stopSpeaking();
  renderedItem = itemId;
  const s = game.state.session;
  if (s) {
    root.innerHTML = lessonView();
    if (s.feedback || ui.a.hint) document.querySelector(s.feedback ? '.lesson-feedback' : '.lesson-hint')?.scrollIntoView({block:'start'});
    return;
  }

  let body = '';
  if (ui.tab === 'learn') body = learnPage();
  else if (ui.tab === 'leaderboard') body = leaderboardPage();
  else if (ui.tab === 'practice') {
    const due = game.dueUnits();
    const quickScopes = [
      ['all', '🌟 全科隨機快篩 (10題)'],
      ['s1', '🌱 七上快篩'],
      ['s2', '🌿 七下快篩'],
      ['s3', '🔬 八上快篩'],
      ['s4', '📐 八下快篩'],
      ['s5', '🧭 九上快篩'],
      ['s6', '👑 九下快篩'],
      ['b-math', '📐 數學專精'],
      ['b-science', '🔬 自然專精'],
      ['b-social', '🌍 社會專精'],
      ['b-cap', '🎯 會考真題']
    ];
    body = `
      <h1>💪 全科鞏固練習與快篩評量</h1>
      <p class="muted">10 題閃電快篩、錯題本溫故、科學間隔複習與全科程度定位診斷。</p>
      <div style="display:flex;flex-direction:column;gap:1rem;margin-top:1.25rem;">
        <div class="card">
          <div class="guide-section-badge">⚡ 形成性即時評量 · 10 題閃電快篩</div>
          <h3 style="margin-top:0.25rem;">⚡ 選擇學期或領域，立即抽 10 題實戰驗收</h3>
          <p class="muted small">不扣心心、即時獲得三步修補診斷與 +10 XP 學習能量！</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.75rem;">
            ${quickScopes.map(([tid, label], idx) => `
              <button class="btn ${idx === 0 ? 'primary' : 'ghost'} small" data-act="quick-assess" data-id="${tid}">${label}</button>
            `).join('')}
          </div>
        </div>
        <div class="card">
          <h3>📕 錯題本消剿 (${game.mistakeCount()} 題)</h3>
          <p class="muted small">連續答對 2 次即可自錯題本畢業，把弱點徹底轉化為得分點。</p>
          <button class="btn primary small" data-act="start" data-mode="mistakes" data-id="all" style="margin-top:0.75rem;" ${game.mistakeCount() ? '' : 'disabled'}>開始訂正練習</button>
        </div>
        <div class="card">
          <h3>↻ 到期複習 (${due.length} 個單元)</h3>
          <p class="muted small">1 → 3 → 7 → 14 → 30 天間隔回想排程。</p>
          ${due.length ? due.map(uid => `<button class="btn ghost small" data-act="start" data-mode="review" data-id="${uid}" style="margin:0.25rem;">複習 ${esc(course.units.get(uid)?.title || uid)}</button>`).join('') : '<p class="muted small" style="margin-top:0.5rem;">目前無到期單元，保持得很好！</p>'}
        </div>
        <div class="card">
          <h3>🧭 全科程度定位檢測 (10 / 20 / 30 題)</h3>
          <p class="muted small">跨學期抽樣診斷，產出六學期強弱項分析報告並推薦最適起點。</p>
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
      <h1>📚 108 課綱 188 個單元三版教材總覽</h1>
      <p class="muted">國中三年六學期全單元指南、康軒/翰林/南一三版對照、知識點圖解與闖關捷徑。</p>
      <div style="margin:1rem 0;display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <input type="search" placeholder="🔍 搜尋單元名稱或學科..." value="${esc(ui.libFilter)}" data-act="lib-search" style="flex:1;min-width:220px;max-width:400px;padding:0.6rem 1rem;border-radius:var(--radius);border:1px solid var(--border);background:var(--card-bg);color:var(--text);">
        <div class="subject-filter-bar">
          ${QUEST_PUBLISHERS.map(p => `
            <button class="subj-pill pub-pill ${ui.pubFilter === p.id ? 'active' : ''}" data-act="filter-pub" data-pub="${p.id}">
              ${p.icon} ${p.label}
            </button>
          `).join('')}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:1rem;">
        ${filtered.map(u => {
          const doneCnt = (u.nodes || []).filter(n => ['done', 'crowned', 'tested'].includes(game.nodeStatus(n.id))).length;
          return `
            <div class="card lib-unit-row" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">
              <div>
                <b>${u.icon || '📖'} ${esc(u.title)}</b>
                <small class="muted" style="margin-left:0.5rem;">${u.gradeName || `${u.grade}年級`} · ${u.subjectName || ''} · ⭐ ${doneCnt}/${(u.nodes || []).length || 5} 關</small>
              </div>
              <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
                <button class="btn ghost small" data-act="guide" data-id="${u.id}">📘 單元指南</button>
                <button class="btn primary small" data-act="jump-unit" data-unit="${u.id}">🎮 前往闖關</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (ui.tab === 'profile') {
    const st = game.state;
    const goalOpts = [
      ['casual', '輕鬆 10 XP'],
      ['regular', '標準 20 XP'],
      ['serious', '充實 30 XP'],
      ['intense', '衝刺 50 XP']
    ];
    body = `
      <h1>🙂 我的自學檔案與能力分析</h1>
      <div class="card" style="margin-top:1rem;display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap;justify-content:space-between;">
        <div style="display:flex;gap:1.25rem;align-items:center;">
          ${mascot('happy', 64)}
          <div>
            <h3>連續自學 ${game.streak()} 天 · 累積 ${st.xp.total} XP</h3>
            <p class="muted small">已收穫 ${st.stats.crowns} 頂金冠 👑 · 完成 ${st.stats.lessons} 關課程 · 開啟 ${Object.keys(st.chests || {}).length} 個寶箱 🎁</p>
          </div>
        </div>
        <button class="btn ghost small" data-act="export-quest-data">💾 匯出學習紀錄備份</button>
      </div>

      <section class="card" style="margin-top:1rem;">
        <h3>🎯 每日自學目標設定</h3>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.65rem;">
          ${goalOpts.map(([gid, glabel]) => `
            <button class="subj-pill ${st.profile?.goal === gid ? 'active' : ''}" data-act="set-goal" data-goal="${gid}">${glabel}</button>
          `).join('')}
        </div>
      </section>

      ${renderQuestDomainRadar()}
      ${renderLearningEvidence()}

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

  const previousDialog = document.querySelector('.modal');
  const active = document.activeElement;
  const focusAction = previousDialog?.contains(active) ? active.dataset.act : null;
  const focusTab = active?.dataset?.gtab;
  root.innerHTML = layout(body);
  const dialog = document.querySelector('.modal');
  if (dialog) {
    dialog.setAttribute('role','dialog');
    dialog.setAttribute('aria-modal','true');
    dialog.setAttribute('aria-label',dialog.querySelector('h2')?.textContent || '學習對話框');
    dialog.tabIndex = -1;
    document.querySelector('.shell').inert = true;
    const focusTarget = focusAction ? [...dialog.querySelectorAll('[data-act]')].find(el=>el.dataset.act===focusAction && (!focusTab || el.dataset.gtab===focusTab)) : null;
    (focusTarget || dialog.querySelector('button') || dialog).focus({preventScroll:true});
  }
}

// -------------------------------------------------------------
// Event Handling & Wire-up
// -------------------------------------------------------------
async function handleHashRoute() {
  const rawHash = location.hash.replace(/^#\/?/, '');
  if (!rawHash) return;

  if (['learn', 'practice', 'leaderboard', 'stories', 'library', 'profile'].includes(rawHash)) {
    ui.tab = rawHash;
    render();
    return;
  }

  const [prefix, targetId] = rawHash.split('/');
  if ((prefix === 'unit' || prefix === 'guide') && targetId && course) {
    const sec = course.index.sections.find(s => (s.units || []).some(u => u.id === targetId));
    const secId = sec?.id || 's1';
    ui.track = secId;
    ui.tab = 'learn';
    ui.gradeFilter = 'all';
    ui.catFilter = 'all';
    ui.subjFilter = 'all';
    ui.unitQuery = '';
    await ensure([secId, 'items']);
    const unitObj = course.track(secId)?.units?.find(u => u.id === targetId);
    if (prefix === 'guide') {
      ui.guide = targetId;
      ui.guideTab = 'kp';
      ui.modal = 'guide';
      render();
    } else {
      ui.modal = null;
      if (unitObj?.nodes?.length) {
        const availNode = unitObj.nodes.find(n => game.nodeStatus(n.id) === 'available') || unitObj.nodes[0];
        ui.pop = availNode.id;
      }
      render();
      setTimeout(() => {
        const el = document.getElementById(`unit-card-${targetId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
    }
  }
}

window.addEventListener('hashchange', () => {
  handleHashRoute();
});

// Keyboard shortcuts for seamless learning
window.addEventListener('keydown', e => {
  if (document.querySelector('#figure-dialog[open]')) return;
  const dialog = document.querySelector('.modal');
  if (dialog) {
    if (e.key === 'Escape') {
      e.preventDefault();
      ui.modal = null;
      ui.guide = null;
      game.clearResult();
      render();
      document.querySelector('#main')?.focus({preventScroll:true});
    } else if (e.key === 'Tab') {
      const buttons = [...dialog.querySelectorAll('button:not([disabled]),a[href],input,select,textarea,[tabindex="0"]')].filter(el=>el.getClientRects().length);
      const first = buttons[0], last = buttons.at(-1);
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {e.preventDefault();last?.focus();}
      else if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first?.focus();}
    }
    return;
  }
  if (e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.closest?.('input, textarea, select, [contenteditable="true"]') && e.key !== 'Enter' && e.key !== 'Escape') return;
  // Let focused buttons keep their native Enter/Space activation (e.g. read aloud).
  if (e.target.closest?.('button, a') && (e.key === 'Enter' || e.key === ' ')) return;
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
        if (game.result?.passed) {
          sound.playTone('level');
          launchCelebration();
        }
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
    game.markAssisted();
    sound.speak(it.hint || it.prompt);
    render();
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

document.addEventListener('submit', e => {
  if (e.target.id !== 'unit-search-form') return;
  e.preventDefault();
  ui.unitQuery = new FormData(e.target).get('query')?.toString().trim() || '';
  render();
  document.querySelector('#unit-query')?.focus();
});

document.addEventListener('change', async e => {
  const control = e.target.dataset.control;
  if (!control) return;
  if (control === 'term') {
    ui.track = e.target.value;
    ui.gradeFilter = ui.catFilter = ui.subjFilter = 'all';
    ui.unitQuery = '';
    game.setProfile({start:ui.track});
    await ensure([ui.track, 'items']);
  } else if (control === 'subject') ui.subjFilter = e.target.value;
  else if (control === 'publisher') setQuestPublisher(e.target.value);
  render();
  document.querySelector(`[data-control="${control}"]`)?.focus();
});

document.addEventListener('click', async e => {
  const actBtn = e.target.closest('[data-act]');
  if (!actBtn) return;
  const act = actBtn.dataset.act;

  if (act === 'zoom-figure') {
    const figure = actBtn.closest('figure') || actBtn.closest('.concept-figure') || actBtn.closest('.guide-kp-card');
    const svg = figure?.querySelector('svg');
    const dialog = document.querySelector('#figure-dialog');
    if (svg && dialog) {
      document.querySelector('#figure-dialog-title').textContent = actBtn.dataset.title || '觀念圖解';
      document.querySelector('#figure-dialog-content').replaceChildren(svg.cloneNode(true));
      updateFigZoom(0, 1);
      dialog.showModal();
    }
  } else if (act === 'fig-zoom-in') {
    updateFigZoom(0.25);
  } else if (act === 'fig-zoom-out') {
    updateFigZoom(-0.25);
  } else if (act === 'fig-zoom-reset') {
    updateFigZoom(0, 1);
  } else if (act === 'pub-toggle') {
    const curIdx = QUEST_PUBLISHERS.findIndex(p => p.id === ui.pubFilter);
    const nextPub = QUEST_PUBLISHERS[(curIdx + 1) % QUEST_PUBLISHERS.length].id;
    setQuestPublisher(nextPub);
    const nextObj = QUEST_PUBLISHERS.find(p => p.id === nextPub);
    toast(`📚 已切換至：${nextObj.icon} ${nextObj.label}`);
    render();
  } else if (act === 'set-preferred-pub') {
    const pub = actBtn.dataset.pub || 'all';
    setQuestPublisher(pub);
    toast(`📚 已設定「${pub}版」為您的預設課本教材！`);
    render();
  } else if (act === 'claim-quest-bonus') {
    if (game.state.quests?.list?.every(q => q.done) && !game.state.quests.bonus) {
      game.state.quests.bonus = true;
      game.state.gems += 20;
      game.save();
      sound.playTone('level');
      launchCelebration();
      toast('🎉 達成今日全勤三大任務！獲得 +20 💎 寶石獎勵！');
      render();
    }
  } else if (act === 'focus-study-controls') {
    e.preventDefault();
    document.querySelector('#study-controls')?.scrollIntoView({behavior:'smooth',block:'start'});
    document.querySelector('[data-control="term"]')?.focus({preventScroll:true});
  } else if (act === 'sound-toggle') {
    sound.toggleMute();
    render();
  } else if (act === 'theme-toggle') {
    const idx = QUEST_THEMES.findIndex(t => t.id === ui.theme);
    const next = QUEST_THEMES[(idx + 1) % QUEST_THEMES.length];
    applyQuestTheme(next.id);
    toast(`${next.icon} 已切換為「${next.label}」主題配色`);
    render();
  } else if (act === 'filter-pub' || act === 'guide-pub') {
    const pub = actBtn.dataset.pub || 'all';
    setQuestPublisher(pub);
    toast(`📚 已切換課本版本焦點：${pub === 'all' ? '三版核心觀念導航' : pub + '版教材'}`);
    render();
  } else if (act === 'guide-tab') {
    ui.guideTab = actBtn.dataset.gtab || 'kp';
    render();
  } else if (act === 'guide-blindfold') {
    const kpKey = actBtn.dataset.kp;
    if (kpKey) {
      ui.blindfoldedKps[kpKey] = !ui.blindfoldedKps[kpKey];
      render();
    }
  } else if (act === 'start-unit-from-guide') {
    const uid = actBtn.dataset.unit;
    ui.modal = null;
    ui.guide = null;
    location.hash = `#unit/${uid}`;
    await handleHashRoute();
  } else if (act === 'jump-unit') {
    const uid = actBtn.dataset.unit;
    location.hash = `#unit/${uid}`;
    await handleHashRoute();
  } else if (act === 'quick-assess') {
    const scopeId = actBtn.dataset.id || 'all';
    const needIds = scopeId === 'all' ? ['s1', 's2', 's3', 's4', 's5', 's6', 'items'] : [scopeId, 'items'];
    if (!await ensure(needIds)) return;
    if (game.startSession('quick', scopeId)) {
      ui.a = freshAnswer();
      render();
    }
  } else if (act === 'set-goal') {
    const goal = actBtn.dataset.goal;
    game.setProfile({ goal });
    toast('🎯 每日自學目標已更新！');
    render();
  } else if (act === 'export-quest-data') {
    try {
      const blob = new Blob([JSON.stringify(game.state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `知行Quest-學習備份-${game.today()}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('💾 學習紀錄備份已匯出！');
    } catch {
      toast('匯出失敗，請稍後再試');
    }
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
    ui.subjFilter = 'all';
    ui.unitQuery = '';
    game.setProfile({start:ui.track});
    if (ui.track.startsWith('b-')) {
      ui.gradeFilter = 'all';
      ui.catFilter = 'all';
    }
    await ensure([ui.track, 'items']);
    render();
  } else if (act === 'reset-filter') {
    ui.gradeFilter = 'all';
    ui.catFilter = 'all';
    ui.subjFilter = 'all';
    ui.unitQuery = '';
    render();
  } else if (act === 'shop') {
    ui.modal = 'shop';
    render();
  } else if (act === 'buy-freeze') {
    const ok = game.buyFreeze();
    if (ok) {
      sound.playTone('level');
      toast('🧊 成功兌換連續自學凍結卡！連續紀錄已受守護。');
      render();
    } else {
      toast('寶石不足 (需 100 💎) 或凍結卡已達上限 (最多 2 張)');
    }
  } else if (act === 'buy-hearts') {
    const res = game.refillHeartsWithGems();
    if (res?.ok) {
      sound.playTone('level');
      toast('❤️ 成功消耗 30 寶石恢復滿心！');
      render();
    } else {
      toast(res?.msg || '寶石不足 (需要 30 💎)');
    }
  } else if (act === 'apply-placement') {
    ui.track = actBtn.dataset.track;
    ui.modal = null;
    game.clearResult();
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
    const uid = actBtn.dataset.id;
    const sec = course.index.sections.find(s => (s.units || []).some(u => u.id === uid));
    if (sec && !course.loaded(sec.id)) {
      await ensure([sec.id, 'items']);
    }
    ui.guide = uid;
    ui.guideTab = 'kp';
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
      launchCelebration();
      toast(`🎉 成功開啟通關寶箱！獲得 +${res.gems || 15} 💎 能量寶石！`);
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
    // Reviews may point to a different semester than the current map.
    const sourceTrack = (mode === 'lesson' || mode === 'boss') ? course.nodes.get(id)?.track : mode === 'review' ? course.units.get(id)?.track : null;
    const needed = mode === 'mistakes' ? course.index.sections.map(s=>s.id) : [sourceTrack || ui.track];
    if (!await ensure([...needed, 'items', mode === 'story' ? 'stories' : null].filter(Boolean))) return;
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
        ui.a.matchError = '';
        ui.a.done.push(rIdx);
        ui.a.left = null;
        sound.playTone('correct');
      } else {
        ui.a.wrong++;
        game.markAssisted();
        const pairs = game.currentItem().pairs;
        ui.a.matchError = `再比較一下：「${pairs[ui.a.left][0]}」對應「${pairs[ui.a.left][1]}」。你剛選的特徵屬於「${pairs[rIdx][0]}」。`;
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
    sound.stopSpeaking();
    const res = game.nextStep();
    ui.a = freshAnswer();
    if (res?.done || game.result) {
      if (game.result?.passed) {
        sound.playTone('level');
        launchCelebration();
      }
    }
    render();
  } else if (act === 'done') {
    game.clearResult();
    render();
  } else if (act === 'result-practice') {
    game.clearResult();
    ui.tab = 'practice';
    location.hash = '#practice';
    render();
  } else if (act === 'exit') {
    sound.stopSpeaking();
    game.clearSession();
    render();
  } else if (act === 'say') {
    sound.speak(actBtn.dataset.text, { onError: toast });
  } else if (act === 'speech-stop') {
    sound.stopSpeaking();
  } else if (act === 'speech-rate') {
    const rates = [0.75, 1, 1.25];
    sound.setSpeechRate(rates[(rates.indexOf(sound.getSpeechRate()) + 1) % rates.length]);
    render();
  } else if (act === 'read-question') {
    sound.speak(questionText(game.currentItem()), { onError: toast });
  } else if (act === 'read-answer' || act === 'read-explanation') {
    const it = game.currentItem();
    if (it && game.state.session?.feedback) {
      sound.speak(act === 'read-answer' ? answerText(it) : (it.why || correctionTip(it)), { onError: toast });
    }
  } else if (act === 'hint') {
    ui.a.hint = true;
    game.markAssisted();
    const it = game.currentItem();
    if (it) sound.speak(it.hint || it.prompt);
    render();
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
    ui.track = course.track(game.currentTrack()) ? game.currentTrack() : 's1';

    // Preload section 1 and items
    await ensure([ui.track, 'items', 'stories']);
    if (game.state.session?.queue.some(id=>!course.item(id))) {
      game.clearSession();
      toast('部分教材已更新，請重新開始這一關；先前學習紀錄仍保留。');
    }

    if (location.hash) {
      await handleHashRoute();
    }
    render();
  } catch (err) {
    console.error('Failed to init JH Quest:', err);
    root.innerHTML = `<div class="warn card" style="margin:2rem auto;max-width:480px;text-align:center;"><h2>⚠️ 載入失敗</h2><p class="muted">${err.message}</p></div>`;
  }
}

init();
