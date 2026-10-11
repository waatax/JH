// dist/engagement.js - Learning Habit Loop, Gamification & CAP Readiness Engine
// Built for Zhixing Junior Academy (知行學院)

export const LEVEL_TIERS = [
  { level: 1, title: '啟蒙學徒', icon: '🌱', minXP: 0, nextXP: 100 },
  { level: 2, title: '敏思學士', icon: '📖', minXP: 100, nextXP: 300 },
  { level: 3, title: '格物健將', icon: '⚡', minXP: 300, nextXP: 600 },
  { level: 4, title: '理智先鋒', icon: '🔬', minXP: 600, nextXP: 1000 },
  { level: 5, title: '通達通才', icon: '🌟', minXP: 1000, nextXP: 1500 },
  { level: 6, title: '會考翹楚', icon: '🏆', minXP: 1500, nextXP: 2500 },
  { level: 7, title: '知行大師 A++', icon: '👑', minXP: 2500, nextXP: 5000 }
];

export function calculateXP(state) {
  if (!state) return 0;
  const readUnits = (state.read || []).length * 20;
  const correctCount = Object.values(state.records || {}).filter(r => r.latestCorrect).length * 15;
  const retainedCount = Object.values(state.records || {}).filter(r => (r.streak || 0) >= 2).length * 25;
  const feynmanNotes = Object.values(state.notes || {}).filter(n => typeof n === 'string' && n.trim().length >= 20).length * 30;
  const examsFinished = (state.history || []).length * 50;
  const activeDays = (state.days || []).length * 20;
  const focusTime = Math.floor((state.focusMinutes || 0) / 10) * 10;
  const checklistPoints = Object.values(state.masteryChecklist || {}).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.filter(Boolean).length * 5 : 0), 0);
  return readUnits + correctCount + retainedCount + feynmanNotes + examsFinished + activeDays + focusTime + checklistPoints;
}

export function getLevelInfo(xp) {
  const score = Math.max(0, xp || 0);
  let curTier = LEVEL_TIERS[0];
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (score >= LEVEL_TIERS[i].minXP) {
      curTier = LEVEL_TIERS[i];
      break;
    }
  }
  const range = curTier.nextXP - curTier.minXP;
  const earnedInRange = score - curTier.minXP;
  const progressPercent = Math.min(100, Math.max(0, Math.round((earnedInRange / range) * 100)));
  return {
    ...curTier,
    currentXP: score,
    progressPercent,
    xpToNext: Math.max(0, curTier.nextXP - score)
  };
}

export function getStreakInfo(state) {
  const days = state?.days || [];
  if (!days.length) {
    return { streak: 0, activeToday: false, message: '今天開始累積連續學習天數！' };
  }
  const todayStr = new Date().toLocaleDateString('sv-SE');
  const activeToday = days.includes(todayStr);

  const sortedDays = [...new Set(days)].sort();
  let streak = 0;
  let checkDate = new Date();
  if (!activeToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const s = checkDate.toLocaleDateString('sv-SE');
    if (sortedDays.includes(s)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  let message = '持續每日學習，點亮會考實力！';
  if (streak >= 7) message = `太厲害了！已連續學習 ${streak} 天，思維敏銳度處於巔峰！🔥`;
  else if (streak >= 3) message = `保持好節奏！連續 ${streak} 天學習，邁向知識複利！⚡`;
  else if (activeToday) message = '今日已打卡！觀念已深化，繼續保持！';

  return { streak, activeToday, message };
}

export function getDailyGoal(state) {
  const readCount = (state?.read || []).length;
  const historyToday = (state?.history || []).filter(h => {
    const hDate = new Date(h.at).toLocaleDateString('sv-SE');
    return hDate === new Date().toLocaleDateString('sv-SE');
  }).length;
  const targetRead = 1;
  const isCompleted = historyToday > 0 || (state?.days || []).includes(new Date().toLocaleDateString('sv-SE'));
  return {
    targetRead,
    isCompleted,
    message: isCompleted ? '今日學習目標已達成！太棒了！' : '今日目標：完成 1 個主題學習或 1 回練習'
  };
}

export const BADGE_DEFS = [
  { id: 'b_streak3', name: '恆毅之火', icon: '🔥', desc: '連續學習打卡 3 天以上' },
  { id: 'b_streak7', name: '百鍊成鋼', icon: '⚡', desc: '連續學習打卡 7 天以上' },
  { id: 'b_solve20', name: '破題之刃', icon: '🎯', desc: '累積獨立答對 20 道驗收題' },
  { id: 'b_solve50', name: '神射破題', icon: '🏹', desc: '累積獨立答對 50 道驗收題' },
  { id: 'b_feynman3', name: '費曼傳人', icon: '🧠', desc: '完成 3 篇深度自學筆記 (20字以上)' },
  { id: 'b_review10', name: '記憶大師', icon: '📇', desc: '完成 10 題以上跨日答對記憶卡' },
  { id: 'b_all_domains', name: '全科探索', icon: '🌐', desc: '學習足跡涵蓋 5 個不同學科領域' },
  { id: 'b_mock_ace', name: '模考勇者', icon: '⏱️', desc: '完成 1 回完整會考或學測全真模考' }
];

export function getBadgesStatus(state, units) {
  const streak = getStreakInfo(state).streak;
  const correctCount = Object.values(state?.records || {}).filter(r => r.latestCorrect).length;
  const feynmanCount = Object.values(state?.notes || {}).filter(n => typeof n === 'string' && n.trim().length >= 20).length;
  const retainedCount = Object.values(state?.records || {}).filter(r => (r.streak || 0) >= 2).length;
  const examCount = (state?.history || []).length;

  const readUnitIds = state?.read || [];
  const readSubjects = new Set(units.filter(u => readUnitIds.includes(u.id)).map(u => u.subject));

  return BADGE_DEFS.map(b => {
    let unlocked = false;
    if (b.id === 'b_streak3') unlocked = streak >= 3;
    else if (b.id === 'b_streak7') unlocked = streak >= 7;
    else if (b.id === 'b_solve20') unlocked = correctCount >= 20;
    else if (b.id === 'b_solve50') unlocked = correctCount >= 50;
    else if (b.id === 'b_feynman3') unlocked = feynmanCount >= 3;
    else if (b.id === 'b_review10') unlocked = retainedCount >= 10;
    else if (b.id === 'b_all_domains') unlocked = readSubjects.size >= 5;
    else if (b.id === 'b_mock_ace') unlocked = examCount >= 1;

    return { ...b, unlocked };
  });
}

// ============================================================================
// CAP PREDICTED SCORES & READINESS ENGINE (會考五科戰力預估)
// ============================================================================
export const CAP_SUBJECT_SPECS = [
  { id: 'chinese', name: '國文科', subjects: ['chinese'], icon: '文', fullScore: 48, advice: '多強化文言短文與長篇雙文本比對，圈選轉折關鍵字。' },
  { id: 'english', name: '英語科', subjects: ['english'], icon: 'Aa', fullScore: 43, advice: '掌握關係子句與完成時態，訓練不看中文直接提取英文意涵。' },
  { id: 'math', name: '數學科', subjects: ['math'], icon: 'π', fullScore: 27, advice: '精熟乘法公式、幾何輔助線，非選題寫清「定義、推導、答」。' },
  { id: 'science', name: '自然科', subjects: ['physics', 'chemistry', 'biology', 'earth'], icon: '理', fullScore: 54, advice: '掌握實驗操作變因、圖表坐標軸單位與化學劑量平衡計算。' },
  { id: 'social', name: '社會科', subjects: ['history', 'geography', 'civics'], icon: '社', fullScore: 54, advice: '建立時序因果軸、臺灣世界地圖人地關聯與公民法規位階。' }
];

export function getCapPredictedScores(state, units, allQuestions) {
  const readSet = new Set(state?.read || []);
  const records = state?.records || {};

  return CAP_SUBJECT_SPECS.map(spec => {
    const subUnits = units.filter(u => spec.subjects.includes(u.subject));
    const subQuestions = allQuestions.filter(q => spec.subjects.includes(q.subject));

    const readRatio = subUnits.length ? subUnits.filter(u => readSet.has(u.id)).length / subUnits.length : 0;
    const attemptedQ = subQuestions.filter(q => records[q.id]);
    const correctQ = attemptedQ.filter(q => records[q.id]?.latestCorrect);
    const accuracyRatio = attemptedQ.length ? correctQ.length / attemptedQ.length : 0;
    const volumeRatio = subQuestions.length ? Math.min(1, attemptedQ.length / (subQuestions.length * 0.4)) : 0;
    const streakQ = attemptedQ.filter(q => (records[q.id]?.streak || 0) >= 2);
    const retentionRatio = attemptedQ.length ? streakQ.length / attemptedQ.length : 0;

    // Power Score (0 ~ 100)
    let power = 0;
    if (attemptedQ.length === 0 && readRatio === 0) {
      power = 35; // Baseline initial assessment
    } else {
      power = Math.round(
        readRatio * 25 +
        accuracyRatio * 40 +
        volumeRatio * 20 +
        retentionRatio * 15
      );
    }
    power = Math.min(99, Math.max(30, power));

    // Grade Mapping (A++, A+, A, B++, B+, B, C)
    let grade = 'C';
    let gradeLabel = '待加強';
    let gradeColor = '#b84735';
    if (power >= 90) {
      grade = 'A++';
      gradeLabel = '精熟頂標';
      gradeColor = '#2d5c48';
    } else if (power >= 82) {
      grade = 'A+';
      gradeLabel = '精熟前標';
      gradeColor = '#3b789e';
    } else if (power >= 75) {
      grade = 'A';
      gradeLabel = '精熟水準';
      gradeColor = '#45825b';
    } else if (power >= 68) {
      grade = 'B++';
      gradeLabel = '基礎頂尖';
      gradeColor = '#c4821a';
    } else if (power >= 60) {
      grade = 'B+';
      gradeLabel = '基礎前段';
      gradeColor = '#d97706';
    } else if (power >= 50) {
      grade = 'B';
      gradeLabel = '基礎達標';
      gradeColor = '#d97706';
    }

    return {
      ...spec,
      unitCount: subUnits.length,
      unitsRead: subUnits.filter(u => readSet.has(u.id)).length,
      questionCount: subQuestions.length,
      correctCount: correctQ.length,
      power,
      grade,
      gradeLabel,
      gradeColor
    };
  });
}

// Deterministic Daily Question (Question of the Day)
export function getDailyQuestion(allQuestions) {
  if (!allQuestions || !allQuestions.length) return null;
  const todayStr = new Date().toLocaleDateString('sv-SE');
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash = (hash << 5) - hash + todayStr.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % allQuestions.length;
  return allQuestions[idx];
}

// Gentle Web Audio API Sound Generator (No external dependencies)
export function playChimeTone(type = 'success') {
  if (typeof window === 'undefined') return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  try {
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      // Pleasant C5 - E5 - G5 arpeggio
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'pomodoro') {
      // Gentle meditation bell
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.start(now);
      osc.stop(now + 1.2);
    }
  } catch (e) {
    // Ignore audio permission or context restrictions
  }
}

// Speech Synthesis Helper for Concept Reading (Mandarin / English)
export function readConceptAloud(text, lang = 'zh-TW') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
  return true;
}
