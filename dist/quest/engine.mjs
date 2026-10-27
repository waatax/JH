// dist/quest/engine.mjs
// JH Quest Game Engine. Pure logic: zero DOM dependencies.
// Storage and time are injected so every rule is 100% testable.

import { makePlacement, placementReport } from './placement.mjs';

export const KEY = 'jh-quest-game-v1';
export const DAY = 86400000;
export const GOALS = { casual: 10, regular: 20, serious: 30, intense: 50 };
export const XP = {
  lesson: 10,
  replay: 5,
  perfect: 5,
  boss: 20,
  bossTry: 5,
  story: 10,
  storyReplay: 5,
  review: 10,
  practice: 5,
  jump: 30
};
export const REVIEW_DAYS = [1, 3, 7, 14, 30];
export const FREEZE_COST = 100, MAX_FREEZES = 2, QUEST_GEMS = 10, QUEST_BONUS = 20, CROWN_GEMS = 15, BADGE_GEMS = 20;
export const LESSON_SIZE = 10, BOSS_SIZE = 12, HEARTS = 3;

const SCORED = new Set(['choice', 'listen', 'build', 'input', 'match']);
export const isScored = it => SCORED.has(it?.type);

export const normalize = s =>
  String(s ?? '')
    .normalize('NFKC')
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .replace(/[.,!?;:"()\[\]…—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function accepts(item, value) {
  if (!item) return false;
  if (!isScored(item)) return true; // Info card / non-scored items always pass
  if (item.type === 'match') return value === 'matched';
  if (item.type === 'build') {
    return normalize(item.answer) === normalize(value);
  }
  if (item.type === 'choice' || item.type === 'listen') {
    return String(value).trim() === String(item.answer).trim();
  }
  const cleanVal = normalize(value);
  return [item.answer, ...(item.alternatives || [])].some(a => normalize(a) === cleanVal);
}

export function localDay(time = Date.now()) {
  const d = new Date(time);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const dayNum = s => {
  const [y, m, d] = s.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / DAY;
};

const dayStr = n => {
  const d = new Date(n * DAY);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
};

export function streakOf(days, frozen, now) {
  const active = new Set(days), cover = new Set(frozen);
  let n = dayNum(localDay(now)), count = 0;
  if (!active.has(dayStr(n))) n--; // today still open
  while (active.has(dayStr(n)) || cover.has(dayStr(n))) {
    if (active.has(dayStr(n))) count++;
    n--;
  }
  return count;
}

const hash = s => {
  let h = 2166136261;
  for (const c of String(s)) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export function shuffle(list, seed) {
  const arr = [...list];
  let x = hash(seed) || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    x = (Math.imul(x, 1103515245) + 12345) >>> 0;
    const j = x % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Course creation and item registry
export function createCourse(index) {
  const units = new Map(), nodes = new Map(), items = new Map(), files = new Set(), guides = new Map(), stories = new Map();
  const tracks = [
    ...index.sections.map(s => ({ ...s, kind: 'section' })),
    ...index.branches.map(b => ({ ...b, kind: 'branch' }))
  ];

  for (const t of tracks) {
    t.units.forEach((u, ui) => {
      units.set(u.id, { ...u, track: t.id, trackKind: t.kind, order: ui });
      (u.nodes || []).forEach((n, ni) => {
        nodes.set(n.id, { ...n, unit: u.id, track: t.id, order: ni, pool: null });
      });
    });
  }

  for (const s of index.stories || []) {
    stories.set(s.id, { ...s, steps: null });
  }

  const course = {
    index, tracks, units, nodes, items, guides, stories,
    track: id => tracks.find(t => t.id === id),
    loaded: id => files.has(id),
    item: id => items.get(id),
    register(file) {
      if (file.stories) {
        for (const s of Object.values(file.stories)) {
          stories.set(s.id, { ...stories.get(s.id), ...s, steps: s.steps.map(x => x.id) });
          for (const x of s.steps) items.set(x.id, { ...x, f: 'stories', story: s.id });
        }
        files.add('stories');
        return;
      }
      if (file.items) {
        const itemDict = file.items.items ? file.items.items : file.items;
        for (const [id, it] of Object.entries(itemDict)) items.set(id, it);
        files.add('items');
      } else if (!file.units && !file.stories && typeof file === 'object') {
        let count = 0;
        for (const [id, it] of Object.entries(file)) {
          if (it && typeof it === 'object' && it.type) {
            items.set(id, it);
            count++;
          }
        }
        if (count > 0) files.add('items');
      }
      if (file.units) {
        for (const [uid, u] of Object.entries(file.units)) {
          guides.set(uid, u.guide);
          for (const [nid, pool] of Object.entries(u.nodes || {})) {
            if (nodes.has(nid)) nodes.get(nid).pool = pool;
          }
        }
        files.add(file.id);
      }
    },
    path(trackId) {
      return (course.track(trackId)?.units || []).flatMap(u => (u.nodes || []).map(n => n.id));
    },
    unitOfNode: id => nodes.get(id)?.unit
  };

  return course;
}

// State management
const makeProfile = p => ({
  goal: GOALS[p.goal] ? p.goal : 'regular',
  start: p.start || 's1',
  subjectFilter: p.subjectFilter || 'all',
  sound: p.sound !== false,
  motion: p.motion !== false,
  rate: p.rate || 1
});

const fresh = now => ({
  schema: 1,
  created: now,
  profile: makeProfile({}),
  nodes: {},
  crowns: {},
  review: {},
  jumped: {},
  items: {},
  xp: { total: 0, days: {} },
  awards: {},
  rewardRuns: {},
  days: [],
  frozen: [],
  freezes: 0,
  gems: 0,
  quests: null,
  achievements: {},
  stories: {},
  flags: {},
  stats: { lessons: 0, perfect: 0, combo: 0, fixed: 0, stories: 0, crowns: 0 },
  session: null,
  serial: 0
});

const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
const num = (v, d = 0) => (Number.isFinite(v) && v >= 0 ? v : d);
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

function sanitize(raw, now) {
  if (!isObj(raw)) return fresh(now);
  const s = fresh(num(raw.created, now));
  if (isObj(raw.profile)) s.profile = makeProfile(raw.profile);
  for (const [k, v] of Object.entries(raw.nodes || {})) {
    if (isObj(v)) s.nodes[k] = { n: num(v.n), at: num(v.at), best: Math.min(1, num(v.best)), tested: v.tested === true };
  }
  for (const k of ['crowns', 'jumped', 'achievements', 'stories', 'flags']) {
    for (const [id, at] of Object.entries(raw[k] || {})) {
      if (Number.isFinite(at)) s[k][id] = at;
    }
  }
  for (const [k, v] of Object.entries(raw.review || {})) {
    if (isObj(v) && Number.isFinite(v.due) && Number.isInteger(v.step)) {
      s.review[k] = { due: v.due, step: Math.min(REVIEW_DAYS.length - 1, v.step) };
    }
  }
  for (const [k, v] of Object.entries(raw.items || {})) {
    if (isObj(v)) s.items[k] = { s: num(v.s), c: num(v.c), w: num(v.w), last: v.last === 1 ? 1 : 0, at: num(v.at), m: v.m === true, fix: num(v.fix) };
  }
  s.xp.total = num(raw.xp?.total);
  for (const [d, v] of Object.entries(raw.xp?.days || {})) {
    if (DAY_RE.test(d)) s.xp.days[d] = num(v);
  }
  for (const [k, v] of Object.entries(raw.awards || {})) if (Number.isFinite(v)) s.awards[k] = v;
  for (const [k, v] of Object.entries(raw.rewardRuns || {})) if (Number.isInteger(v) && v >= 0 && v <= 3) s.rewardRuns[k] = v;
  s.days = [...new Set((raw.days || []).filter(d => DAY_RE.test(d)))].sort();
  s.frozen = [...new Set((raw.frozen || []).filter(d => DAY_RE.test(d)))].sort();
  s.freezes = Math.min(MAX_FREEZES, num(raw.freezes));
  s.gems = num(raw.gems);
  s.serial = num(raw.serial);
  if (isObj(raw.quests) && DAY_RE.test(raw.quests.day) && Array.isArray(raw.quests.list)) {
    s.quests = {
      day: raw.quests.day,
      bonus: raw.quests.bonus === true,
      list: raw.quests.list.filter(isObj).map(q => ({ id: String(q.id), target: num(q.target, 1), n: num(q.n), done: q.done === true }))
    };
  }
  for (const k of Object.keys(s.stats)) s.stats[k] = num(raw.stats?.[k]);
  if (isObj(raw.session) && Array.isArray(raw.session.queue) && Number.isInteger(raw.session.index)) {
    s.session = raw.session;
  }
  return s;
}

// Daily quests & Badges
const QUEST_POOL = [
  { id: 'xp', label: g => `今日累積獲得 ${g} XP`, target: g => g },
  { id: 'lessons', label: () => '完成 2 個課程節點', target: () => 2 },
  { id: 'perfect', label: () => '達成 1 次全對無瑕闖關', target: () => 1 },
  { id: 'combo', label: () => '單次課程中連續答對 6 題', target: () => 6 },
  { id: 'fix', label: () => '在錯題本中訂正 2 題', target: () => 2 },
  { id: 'story', label: () => '讀完 1 篇跨科探究故事', target: () => 1 }
];

export const questLabel = (q, goalXp) => QUEST_POOL.find(p => p.id === q.id)?.label(goalXp) || q.id;

export const BADGES = [
  { id: 'first_step', icon: '🌱', title: '探究第一步', desc: '完成第一個觀念節點', test: s => s.stats.lessons >= 1 },
  { id: 'streak_3', icon: '🔥', title: '三日自學火花', desc: '連續學習 3 天', test: (s, x) => x.streak >= 3 },
  { id: 'streak_7', icon: '🔥', title: '一週自律先鋒', desc: '連續學習 7 天', test: (s, x) => x.streak >= 7 },
  { id: 'streak_30', icon: '🏅', title: '恆毅自學巨匠', desc: '連續學習 30 天', test: (s, x) => x.streak >= 30 },
  { id: 'first_crown', icon: '👑', title: '第一座金冠', desc: '成功通過一次單元挑戰 Boss', test: s => s.stats.crowns >= 1 },
  { id: 'crowns_10', icon: '👑', title: '十頂金冠傳奇', desc: '通過 10 個單元挑戰 Boss', test: s => s.stats.crowns >= 10 },
  { id: 'perfect_10', icon: '💯', title: '零失誤達人', desc: '完成 10 次全對課程', test: s => s.stats.perfect >= 10 },
  { id: 'fix_15', icon: '🛠️', title: '避坑除錯大師', desc: '把 15 題錯題成功改對', test: s => s.stats.fixed >= 15 },
  { id: 'story_5', icon: '📖', title: '跨科探究學者', desc: '閱讀並完成 5 篇情境探究故事', test: s => s.stats.stories >= 5 },
  { id: 'xp_500', icon: '⚡', title: '500 XP 能量', desc: '累積 500 XP 學習能量', test: s => s.xp.total >= 500 },
  { id: 'xp_2000', icon: '🌟', title: '2000 XP 宗師', desc: '累積 2000 XP 學習能量', test: s => s.xp.total >= 2000 },
  { id: 'section_done', icon: '🎓', title: '學期圓滿學士', desc: '完整通關任一學期所有單元', test: (s, x) => x.anySectionDone() }
];

// Main Game Controller
export function createGame({ storage, now = () => Date.now(), course }) {
  let state = fresh(now()), warning = '', result = null, pending = [];

  try {
    const raw = storage?.getItem(KEY);
    if (raw) state = sanitize(JSON.parse(raw), now());
  } catch {
    warning = '無法讀取儲存紀錄，已開啟新自學旅程。';
  }

  function save() {
    try {
      if (!storage) throw Error();
      storage.setItem(KEY, JSON.stringify(state));
      if (warning.startsWith('無法儲存')) warning = '';
    } catch {
      warning = '無法儲存：進度暫存於當前視窗，建議定時於「我的」匯出備份。';
    }
  }

  const today = () => localDay(now());
  const goalXp = () => GOALS[state.profile?.goal] || GOALS.regular;
  const todayXp = () => state.xp.days[today()] || 0;

  function applyFreezes() {
    const last = state.days.at(-1);
    if (!last) return false;
    let changed = false;
    const yesterday = dayNum(today()) - 1;
    for (let n = dayNum(last) + 1; n <= yesterday; n++) {
      const d = dayStr(n);
      if (state.frozen.includes(d)) continue;
      if (state.freezes > 0) {
        state.freezes--;
        state.frozen.push(d);
        changed = true;
      } else break;
    }
    if (changed) state.frozen.sort();
    return changed;
  }

  function ensureQuests() {
    const day = today();
    if (state.quests?.day === day) return;
    const picks = shuffle(QUEST_POOL.filter(q => q.id !== 'xp'), 'jh_quests' + day).slice(0, 2);
    state.quests = {
      day,
      bonus: false,
      list: [QUEST_POOL[0], ...picks].map(q => ({
        id: q.id,
        target: q.target(goalXp()),
        n: 0,
        done: false
      }))
    };
  }

  function bumpQuest(id, by = 1, set = false) {
    ensureQuests();
    const q = state.quests.list.find(x => x.id === id);
    if (!q || q.done) return;
    q.n = set ? Math.max(q.n, by) : q.n + by;
    if (q.n >= q.target) {
      q.n = q.target;
      q.done = true;
      state.gems += QUEST_GEMS;
      pending.push({ type: 'quest', id });
    }
    if (!state.quests.bonus && state.quests.list.every(x => x.done)) {
      state.quests.bonus = true;
      state.gems += QUEST_BONUS;
      pending.push({ type: 'chest' });
    }
  }

  const streak = () => streakOf(state.days, state.frozen, now());
  const nodeDone = id => !!(state.nodes[id]?.n || state.nodes[id]?.tested);

  function sectionDone(trackId) {
    const track = course.track(trackId);
    if (!track?.units?.length) return false;
    return track.units.every(u => u.nodes.filter(n => n.kind !== 'boss').every(n => nodeDone(n.id)));
  }

  function anySectionDone() {
    return course.index.sections.some(s => sectionDone(s.id));
  }

  function checkBadges() {
    const ctx = { streak: streak(), anySectionDone };
    for (const b of BADGES) {
      if (!state.achievements[b.id] && b.test(state, ctx)) {
        state.achievements[b.id] = now();
        state.gems += BADGE_GEMS;
        pending.push({ type: 'badge', id: b.id });
      }
    }
  }

  applyFreezes();
  ensureQuests();

  // Navigation & Unlocking logic
  function trackUnlocked(trackId) {
    // 108 Curriculum Sections (s1..s6) and all branches are open for free exploration
    return true;
  }

  function nodeStatus(nodeId) {
    const n = course.nodes.get(nodeId);
    if (!n) return 'locked';
    const done = state.nodes[nodeId];

    if (n.kind === 'boss') {
      if (state.crowns[n.unit]) return 'crowned';
      return 'available';
    }
    if (done?.n) return 'done';
    if (done?.tested) return 'tested';
    return 'available';
  }

  function current(trackId) {
    const p = course.path(trackId);
    return p.find(id => course.nodes.get(id)?.kind !== 'boss' && nodeStatus(id) === 'available') || p[0] || null;
  }

  // Session composition
  function composeNode(nodeId, serial) {
    const n = course.nodes.get(nodeId);
    if (!n?.pool) return null;
    const pool = n.pool.filter(id => course.item(id));
    if (!pool.length) return null;

    if (n.kind === 'boss') {
      const picked = shuffle(pool, nodeId + serial).slice(0, BOSS_SIZE);
      return { queue: picked, hearts: HEARTS, base: picked.length, results: [], feedback: null, index: 0, combo: 0, maxCombo: 0 };
    }

    const scorable = pool.filter(id => isScored(course.item(id)));
    const infos = pool.filter(id => course.item(id)?.type === 'info').slice(0, 1);
    const picked = shuffle(scorable, nodeId + serial).slice(0, LESSON_SIZE);
    const queue = [...infos, ...picked];

    return { queue, hearts: null, base: queue.length, results: [], feedback: null, index: 0, combo: 0, maxCombo: 0 };
  }

  function compose(mode, id, serial) {
    switch (mode) {
      case 'lesson':
      case 'boss':
        return composeNode(id, serial);
      case 'story': {
        const s = course.stories.get(id);
        if (!s) return null;
        const queue = (s.steps || []).map(x => (typeof x === 'string' ? x : x.id));
        return { queue, hearts: null, base: queue.length, results: [], feedback: null, index: 0, combo: 0, maxCombo: 0 };
      }
      case 'placement': {
        const p = makePlacement(id || 20, course);
        return { queue: p.slots.map(x => x.id), hearts: null, base: p.slots.length, results: [], feedback: null, index: 0, combo: 0, maxCombo: 0, placement: p };
      }
      case 'review': {
        const u = course.units.get(id);
        const pool = (u?.nodes || []).flatMap(n => course.nodes.get(n.id)?.pool || []).filter(qid => isScored(course.item(qid)));
        const picked = shuffle(pool, id + serial).slice(0, LESSON_SIZE);
        return { queue: picked, hearts: null, base: picked.length, results: [], feedback: null, index: 0, combo: 0, maxCombo: 0 };
      }
      case 'mistakes': {
        const pool = Object.entries(state.items).filter(([k, r]) => r.m && isScored(course.item(k))).map(([k]) => k);
        const picked = shuffle(pool, 'm' + serial).slice(0, LESSON_SIZE);
        return { queue: picked, hearts: null, base: picked.length, results: [], feedback: null, index: 0, combo: 0, maxCombo: 0 };
      }
      default:
        return null;
    }
  }

  const game = {
    get state() { return state; },
    get warning() { return warning; },
    get result() { return result; },
    course,
    today,
    goalXp,
    todayXp,
    streak,
    trackUnlocked,
    nodeStatus,
    current,
    currentTrack: () => state.profile?.start || 's1',
    questLabel: q => questLabel(q, goalXp()),
    sectionDone,

    dueUnits: () => {
      const t = now();
      return Object.entries(state.review).filter(([uid, r]) => r.due <= t).map(([uid]) => uid);
    },
    mistakeCount: () => Object.values(state.items).filter(r => r.m).length,

    startSession(mode, ref) {
      state.serial++;
      const s = compose(mode, ref, state.serial);
      if (!s) return false;
      state.session = { mode, ref, id: `${mode}-${ref}-${state.serial}`, startTime: now(), ...s };
      save();
      return true;
    },

    currentItem() {
      const s = state.session;
      if (!s || s.index >= s.queue.length) return null;
      return course.item(s.queue[s.index]);
    },

    checkAnswer(value) {
      const s = state.session;
      if (!s) return null;
      const it = game.currentItem();
      if (!it) return null;

      const ok = accepts(it, value);
      s.feedback = { ok, value };

      const isFirstTry = s.index < s.base;
      if (isFirstTry) {
        s.results.push({ id: it.id, ok, value });
      }

      // Update item performance stats
      const r = state.items[it.id] || { s: 0, c: 0, w: 0, last: 0, at: now(), m: false, fix: 0 };
      r.s++;
      r.at = now();
      if (ok) {
        r.c++;
        r.last = 1;
        s.combo++;
        if (s.combo > s.maxCombo) s.maxCombo = s.combo;
        if (r.m) {
          r.fix++;
          if (r.fix >= 2) r.m = false; // Graduated from mistake notebook
          bumpQuest('fix', 1);
          state.stats.fixed++;
        }
      } else {
        r.w++;
        r.last = 0;
        s.combo = 0;
        r.m = true;
        // In-lesson repair: append mistake to queue to try again at end of lesson
        if (isFirstTry) {
          s.queue.push(it.id);
        }
        if (s.hearts !== null) {
          s.hearts--;
        }
      }
      state.items[it.id] = r;

      if (s.combo >= 6) bumpQuest('combo', s.combo, true);
      save();
      return { ok, hearts: s.hearts };
    },

    nextStep() {
      const s = state.session;
      if (!s) return null;
      s.feedback = null;
      s.index++;

      // Heart exhaustion check in Boss mode
      if (s.hearts !== null && s.hearts <= 0) {
        return game.endSession(false);
      }

      // Check if session queue completed
      if (s.index >= s.queue.length) {
        const accuracy = s.base ? s.results.filter(x => x.ok).length / s.base : 1;
        const passed = s.hearts !== null ? s.hearts > 0 && accuracy >= 0.8 : true;
        return game.endSession(passed);
      }

      save();
      return { done: false, index: s.index, total: s.queue.length };
    },

    endSession(passed) {
      const s = state.session;
      if (!s) return null;

      const finishTime = now();
      const seconds = Math.max(1, Math.round((finishTime - s.startTime) / 1000));
      const accuracy = s.base ? s.results.filter(x => x.ok).length / s.base : 1;
      const perfect = accuracy === 1;

      // Handle Placement result
      if (s.mode === 'placement') {
        const report = placementReport(s.results, course);
        result = { ...report, seconds };
        state.session = null;
        save();
        return result;
      }

      // Compute earned XP
      let earnedXp = 0;
      if (passed) {
        if (s.mode === 'boss') earnedXp = XP.boss;
        else if (s.mode === 'story') earnedXp = XP.story;
        else if (s.mode === 'review') earnedXp = XP.review;
        else earnedXp = XP.lesson;

        if (perfect) earnedXp += XP.perfect;
      } else {
        earnedXp = s.mode === 'boss' ? XP.bossTry : 0;
      }

      // Anti-farming check (Max 3 reward runs per activity per day)
      const runKey = `${s.ref}-${today()}`;
      state.rewardRuns[runKey] = (state.rewardRuns[runKey] || 0) + 1;
      if (state.rewardRuns[runKey] > 3) earnedXp = 0;

      // Update XP & Daily attendance
      state.xp.total += earnedXp;
      state.xp.days[today()] = (state.xp.days[today()] || 0) + earnedXp;
      if (!state.days.includes(today())) state.days.push(today());

      // Update node / crown status
      if (passed) {
        if (s.mode === 'lesson') {
          state.nodes[s.ref] = { n: (state.nodes[s.ref]?.n || 0) + 1, at: finishTime, best: Math.max(state.nodes[s.ref]?.best || 0, accuracy) };
          state.stats.lessons++;
          bumpQuest('lessons', 1);
        } else if (s.mode === 'boss') {
          const uId = course.nodes.get(s.ref)?.unit;
          if (uId) {
            state.crowns[uId] = finishTime;
            state.stats.crowns++;
            state.gems += CROWN_GEMS;
            // Schedule spaced repetition
            state.review[uId] = { due: finishTime + REVIEW_DAYS[0] * DAY, step: 0 };
          }
        } else if (s.mode === 'story') {
          state.stories[s.ref] = finishTime;
          state.stats.stories++;
          bumpQuest('story', 1);
        }
        if (perfect) {
          state.stats.perfect++;
          bumpQuest('perfect', 1);
        }
      }

      bumpQuest('xp', earnedXp);
      checkBadges();

      result = {
        mode: s.mode,
        ref: s.ref,
        passed,
        accuracy,
        perfect,
        xp: earnedXp,
        seconds,
        maxCombo: s.maxCombo,
        events: [...pending],
        streak: streak()
      };
      pending = [];
      state.session = null;
      save();
      return result;
    },

    clearSession() {
      state.session = null;
      save();
    },

    clearResult() {
      result = null;
    },

    buyFreeze() {
      if (state.gems >= FREEZE_COST && state.freezes < MAX_FREEZES) {
        state.gems -= FREEZE_COST;
        state.freezes++;
        save();
        return true;
      }
      return false;
    },

    setProfile(p) {
      state.profile = makeProfile({ ...state.profile, ...p });
      ensureQuests();
      save();
    }
  };

  return game;
}
