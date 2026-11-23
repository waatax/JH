// dist/ultralearning.js
// Zhixing Ultralearning OS: Synthesizing Scott H. Young's "Ultralearning" (9 Principles)
// & "Get Better at Anything" (See · Do · Feedback, 12 Maxims) for Junior High Mastery -> GSAT 頂頂標.

import { unitUltraData, gsatTopTierBlueprint } from './ultralearning-data.js';

export { unitUltraData, gsatTopTierBlueprint };

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

export function getUnitUltra(unitId) {
  return unitUltraData[unitId] || null;
}

// ---------------------------------------------------------------------------
// 1. Pure Cognitive-Science Analytics (100% Unit-Testable)
// ---------------------------------------------------------------------------

/**
 * Get Better at Anything Ch.5 — The Difficulty Sweet Spot (~85% Rule, Wilson et al.)
 * Evaluates learner records to classify current cognitive load zone & per-subject health.
 */
export function computeSweetSpotMetrics(state = {}, units = [], allQuestions = []) {
  const records = state.records || {};
  const readSet = new Set(state.read || []);
  const compDone = state.completionDone || {};
  const recallDone = state.freeRecallDone || {};

  let totalAttempted = 0;
  let totalCorrect = 0;
  let totalIndependent = 0;

  const qBySubject = {};
  for (const q of allQuestions) {
    if (!qBySubject[q.subject]) qBySubject[q.subject] = [];
    qBySubject[q.subject].push(q);
    const rec = records[q.id];
    if (rec && rec.attempts > 0) {
      totalAttempted++;
      if (rec.correctCount > 0 && rec.latestCorrect) totalIndependent++;
      if (rec.latestCorrect) totalCorrect++;
    }
  }

  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : null;

  let zone = 'start';
  let zoneLabel = '🚀 5 分鐘微啟動階段';
  let zoneAdvice = '先別追求一次讀完！運用《超速學習》5 分鐘法則，完成 1 個單元「看示範 ➔ 挖空補全」或 5 題暖身即可啟動正循環。';
  let zoneColor = 'accent';

  if (totalAttempted >= 5) {
    if (accuracy < 65) {
      zone = 'overload';
      zoneLabel = '🛡️ 負荷過高區（< 65%）';
      zoneAdvice = '目前難度偏高（認知負荷過載）。依《Get Better at Anything》第 2、5 章，先切回「SEE 示範＋挖空補全」，看懂專家 PARI 步驟再重練！';
      zoneColor = 'warn';
    } else if (accuracy <= 88) {
      zone = 'sweetspot';
      zoneLabel = '🎯 85% 黃金甜蜜點（65%–88%）';
      zoneAdvice = '你正處於最理想的「85% 難度甜蜜點」！維持 15% 左右的錯誤率能最大化大腦重塑，現在最適合進行「無提示交錯變異特訓」。';
      zoneColor = 'good';
    } else {
      zone = 'overkill';
      zoneLabel = '🏆 熟練自動化區（> 88%）';
      zoneAdvice = '基礎題已趨近自動化！避免陷入假性流暢（Autopilot），立即升級挑戰「無提示跨科盲測」或直接切入「學測頂標 Overkill」真題！';
      zoneColor = 'top';
    }
  }

  let masteredUnits = 0;
  for (const u of units) {
    const qs = u.questions || [];
    const qsMastered = qs.length > 0 && qs.every(q => records[q.id]?.latestCorrect);
    if (qsMastered || (readSet.has(u.id) && compDone[u.id])) masteredUnits++;
  }

  const perSubject = {};
  for (const u of units) {
    if (!perSubject[u.subject]) {
      perSubject[u.subject] = {
        subject: u.subject,
        totalUnits: 0,
        readUnits: 0,
        masteredUnits: 0,
        attemptedQ: 0,
        correctQ: 0,
        accuracy: null
      };
    }
    const bucket = perSubject[u.subject];
    bucket.totalUnits++;
    if (readSet.has(u.id)) bucket.readUnits++;
    const qs = u.questions || [];
    const qsMastered = qs.length > 0 && qs.every(q => records[q.id]?.latestCorrect);
    if (qsMastered || (readSet.has(u.id) && compDone[u.id])) bucket.masteredUnits++;
  }

  for (const [subId, qs] of Object.entries(qBySubject)) {
    const bucket = perSubject[subId];
    if (!bucket) continue;
    for (const q of qs) {
      const r = records[q.id];
      if (r && r.attempts > 0) {
        bucket.attemptedQ++;
        if (r.latestCorrect) bucket.correctQ++;
      }
    }
    bucket.accuracy = bucket.attemptedQ > 0 ? Math.round((bucket.correctQ / bucket.attemptedQ) * 100) : null;
  }

  const coveragePercent = units.length ? Math.round((readSet.size / units.length) * 100) : 0;
  const masteryPercent = units.length ? Math.round((masteredUnits / units.length) * 100) : 0;

  return {
    totalAttempted,
    totalCorrect,
    totalIndependent,
    accuracy,
    zone,
    zoneLabel,
    zoneAdvice,
    zoneColor,
    readCount: readSet.size,
    masteredUnits,
    totalUnits: units.length,
    coveragePercent,
    masteryPercent,
    completionsCount: Object.values(compDone).filter(Boolean).length,
    freeRecallsCount: Object.values(recallDone).filter(Boolean).length,
    perSubject
  };
}

/**
 * Ultralearning P4 (Direct-Then-Drill): Identify rate-limiting bottleneck units.
 * Priority: High-confidence mistakes > Wrong/Hinted questions > High-leverage core unmastered units.
 */
export function findBottleneckUnits(state = {}, units = [], allQuestions = [], limit = 6) {
  const records = state.records || {};
  const confLog = Array.isArray(state.confidenceLog) ? state.confidenceLog : [];
  const dangerUnitHits = {};
  for (const entry of confLog) {
    if (entry.confidence === 'high' && !entry.correct && entry.unitId) {
      dangerUnitHits[entry.unitId] = (dangerUnitHits[entry.unitId] || 0) + 1;
    }
  }

  const qByUnit = {};
  for (const q of allQuestions) {
    if (!qByUnit[q.unitId]) qByUnit[q.unitId] = [];
    qByUnit[q.unitId].push(q);
  }

  const coreSubjects = new Set(['math', 'chinese', 'english', 'physics', 'chemistry', 'biology', 'earth', 'history', 'geography', 'civics']);

  const scored = units.map(u => {
    const qs = qByUnit[u.id] || [];
    let wrongCount = 0;
    let attempted = 0;
    for (const q of qs) {
      const r = records[q.id];
      if (r) {
        attempted++;
        if (!r.latestCorrect) wrongCount++;
      }
    }
    const dangerCount = dangerUnitHits[u.id] || 0;
    const isRead = (state.read || []).includes(u.id);
    const isComp = Boolean(state.completionDone?.[u.id]);

    let priority = 0;
    let reason = '核心先備單元待建立';
    if (dangerCount > 0) {
      priority += 100 + dangerCount * 20;
      reason = `🚨 高信心答錯 ${dangerCount} 次（危險知識盲區，最高優先重學）`;
    } else if (wrongCount > 0) {
      priority += 60 + wrongCount * 15;
      reason = `⚠️ 尚有 ${wrongCount} 題待補強錯題（直接狙擊弱點）`;
    } else if (attempted === 0 && coreSubjects.has(u.subject)) {
      priority += isRead ? 30 : 20;
      if (u.grade >= 8) priority += 5;
      reason = isRead ? '📖 已閱讀尚未驗收（立即主動回想檢核）' : '🎯 高頻必考核心單元（尚未啟動探索）';
    } else if (!isComp && coreSubjects.has(u.subject)) {
      priority += 10;
      reason = '🧩 建議完成「挖空補全」鞏固程序性自動化';
    }

    return {
      unit: u,
      priority,
      wrongCount,
      dangerCount,
      attempted,
      reason,
      questions: qs
    };
  });

  scored.sort((a, b) => b.priority - a.priority || a.unit.grade - b.unit.grade);
  return scored.slice(0, limit);
}

/**
 * Ultralearning P5 (Free Recall): Evaluates blank-sheet recall against unit keywords.
 */
export function evaluateFreeRecall(text = '', keywords = []) {
  const normalized = String(text || '').toLowerCase().replace(/\s+/g, '');
  const cleanKeywords = (keywords || []).filter(k => typeof k === 'string' && k.trim().length > 0);
  if (!cleanKeywords.length) {
    return { matched: [], missing: [], coveragePercent: 0, charCount: normalized.length, verdict: '請先輸入你的白紙回想內容。' };
  }
  const matched = [];
  const missing = [];
  for (const kw of cleanKeywords) {
    const token = kw.toLowerCase().replace(/\s+/g, '');
    if (normalized.includes(token)) matched.push(kw);
    else missing.push(kw);
  }
  const coveragePercent = Math.round((matched.length / cleanKeywords.length) * 100);
  let verdict = '';
  if (normalized.length < 10) {
    verdict = '先不看講義，多寫出至少 1–2 句你記得的核心規則與例子，大腦提取越費力，記憶就越牢固！';
  } else if (coveragePercent >= 80) {
    verdict = '🌟 極佳提取品質！你已能脫離講義獨立重構本課核心概念骨架，可直接挑戰交錯盲測或學測延伸題。';
  } else if (coveragePercent >= 50) {
    verdict = '👍 掌握一半以上核心脈絡！請重點補齊下方漏掉的關鍵詞，明天再做一次 60 秒快回想。';
  } else {
    verdict = '🔍 成功抓出記憶斷層！這正是「白紙自由回想」最有價值的時刻——回看下方遺漏的關鍵詞並補寫一句自己的解釋。';
  }
  return { matched, missing, coveragePercent, charCount: normalized.length, verdict };
}

/**
 * Get Better at Anything Ch.9 (Confidence Calibration — Philip Tetlock):
 * Separates true mastery from dangerous illusions & lucky guesses.
 */
export function computeCalibrationMetrics(confidenceLog = []) {
  const log = Array.isArray(confidenceLog) ? confidenceLog : [];
  let calibratedHigh = 0;
  let dangerIllusion = 0;
  let luckyGuess = 0;
  let honestGap = 0;
  let midCount = 0;

  for (const row of log) {
    if (row.confidence === 'high') {
      if (row.correct) calibratedHigh++;
      else dangerIllusion++;
    } else if (row.confidence === 'low') {
      if (row.correct) luckyGuess++;
      else honestGap++;
    } else {
      midCount++;
    }
  }

  const total = log.length;
  // Calibration score penalizes high-confidence wrong (illusion) most heavily, then lucky guesses
  const calibrationScore = total > 0
    ? Math.max(0, Math.min(100, Math.round(((total - dangerIllusion * 1.5 - luckyGuess * 0.5) / total) * 100)))
    : null;

  return {
    total,
    calibratedHigh,
    dangerIllusion,
    luckyGuess,
    honestGap,
    midCount,
    calibrationScore
  };
}

/**
 * Get Better at Anything Ch.12 (Fears Fade with Exposure):
 * Computes the learner's current stage on the 5-level Graded Exposure Ladder.
 */
export function getExposureStage(state = {}, units = [], allQuestions = []) {
  const attempted = Object.keys(state.records || {}).length;
  const history = Array.isArray(state.history) ? state.history : [];
  const hasInterleaved = history.some(h => String(h.title || '').includes('交錯') || String(h.title || '').includes('盲測'));
  const hasTimed = history.some(h => h.mode === 'exam');
  let hasGsat = false;
  try {
    if (typeof localStorage !== 'undefined') {
      const gsatHist = JSON.parse(localStorage.getItem('gsat-practice-history-v1') || '[]');
      hasGsat = Array.isArray(gsatHist) && gsatHist.length > 0;
    }
  } catch {}

  const stages = [
    {
      level: 1,
      title: 'Lv.1 五分鐘無壓力破冰',
      bookRef: '《超速學習》P2 五分鐘法則 ×《GBAA》Ch.12 微暴露',
      desc: '不怕難科！先選 1 個單元讀完 3 分鐘元認知圖，做 1 題「挖空補全」拿下第一次成功。',
      done: (state.read || []).length >= 1 || Object.keys(state.completionDone || {}).length >= 1,
      actionHref: '#/lesson/math-1',
      actionLabel: '5 分鐘破冰首課 →'
    },
    {
      level: 2,
      title: 'Lv.2 低風險單科暖身（累積 10 題）',
      bookRef: '《GBAA》Ch.3 成功是最好的老師',
      desc: '不計時、無壓力完成 10 道原創題，建立「原來我解得出來」的正向多巴胺回饋。',
      done: attempted >= 10,
      actionHref: '#/quick',
      actionLabel: '10 題輕鬆暖身 →'
    },
    {
      level: 3,
      title: 'Lv.3 無標題交錯變異特訓（打破單課依賴）',
      bookRef: '《GBAA》Ch.7 變異勝於重複 × Ch.10 貼近實戰',
      desc: '隱藏單元名稱進行跨章節混合盲測，練出「看穿未知考題屬於哪個模型」的考場直覺。',
      done: hasInterleaved || attempted >= 35,
      actionId: 'exposure-launch-interleaved',
      actionLabel: '啟動交錯盲測 →'
    },
    {
      level: 4,
      title: 'Lv.4 國中會考 5A++ 限時全真模擬',
      bookRef: '《超速學習》P3 直接性 ×《GBAA》Ch.12 焦慮消退',
      desc: '在真實計時壓力下完成會考歷屆或全真模擬，讓大考緊張感在多次暴露後自然鈍化。',
      done: hasTimed,
      actionHref: '#/pastpapers',
      actionLabel: '挑戰近七年會考 →'
    },
    {
      level: 5,
      title: 'Lv.5 學測頂頂標 Overkill 超載突破',
      bookRef: '《超速學習》P3 超載法 (Overkill) × P9 跨界實驗',
      desc: '以「降維打擊」心態挑戰 111–115 學測歷屆真題（國綜/國寫/英/數A/數B/自然/社會），站穩頂標！',
      done: hasGsat,
      actionHref: '#/gsat',
      actionLabel: '直闖學測歷屆模考 →'
    }
  ];

  const currentLevel = stages.find(s => !s.done)?.level || 5;
  return { currentLevel, stages };
}

/**
 * Vertical Mastery Readiness across all 7 GSAT subjects mapped from 188 Junior High units.
 */
export function getGsatReadinessMetrics(state = {}, units = [], allQuestions = []) {
  const records = state.records || {};
  const readSet = new Set(state.read || []);
  const compDone = state.completionDone || {};

  const rows = gsatTopTierBlueprint.map(bp => {
    const relatedUnits = units.filter(u => bp.jhSubjects.includes(u.subject));
    const relatedQs = allQuestions.filter(q => bp.jhSubjects.includes(q.subject));
    const readCount = relatedUnits.filter(u => readSet.has(u.id)).length;
    const compCount = relatedUnits.filter(u => compDone[u.id]).length;
    const masteredUnitCount = relatedUnits.filter(u => {
      const uqs = u.questions || [];
      return (uqs.length > 0 && uqs.every(q => records[q.id]?.latestCorrect)) || (readSet.has(u.id) && compDone[u.id]);
    }).length;
    const attemptedQ = relatedQs.filter(q => records[q.id]?.attempts > 0).length;
    const correctQ = relatedQs.filter(q => records[q.id]?.latestCorrect).length;
    const accuracy = attemptedQ > 0 ? Math.round((correctQ / attemptedQ) * 100) : null;
    const foundationPercent = relatedUnits.length
      ? Math.round(((readCount * 0.4 + masteredUnitCount * 0.6) / relatedUnits.length) * 100)
      : 0;

    return {
      ...bp,
      relatedUnitCount: relatedUnits.length,
      readCount,
      compCount,
      masteredUnitCount,
      attemptedQ,
      correctQ,
      accuracy,
      foundationPercent: Math.min(100, foundationPercent),
      sampleUnits: relatedUnits.slice(0, 4)
    };
  });

  const overallFoundation = rows.length
    ? Math.round(rows.reduce((sum, r) => sum + r.foundationPercent, 0) / rows.length)
    : 0;

  return { overallFoundation, rows };
}

// ---------------------------------------------------------------------------
// 2. Homepage Ultralearning Quick-Launch Command Strip
// ---------------------------------------------------------------------------

export function renderHomeUltralearningBanner(state, units, subjects, allQuestions) {
  const sweet = computeSweetSpotMetrics(state, units, allQuestions);
  const bottlenecks = findBottleneckUnits(state, units, allQuestions, 3);
  const gsat = getGsatReadinessMetrics(state, units, allQuestions);
  const topWeak = bottlenecks[0]?.unit || units[0];

  return `
  <section class="ultra-home-strip" aria-label="超學習與學測頂標指揮列">
    <div class="ultra-home-head">
      <div>
        <span class="ultra-pill">🚀 Ultralearning × Get Better at Anything 學習引擎</span>
        <h2>國中全科 188 單元 ➔ 會考 5A++ ➔ 學測頂頂標</h2>
        <p class="ultra-sub">融合 Scott H. Young 雙書科學方法：<strong>先看示範（See）➔ 85% 甜蜜點與交錯盲測（Do）➔ 信心校準與瓶頸修復（Feedback）</strong>。</p>
      </div>
      <a class="button" href="#/ultralearning">開啟超學習·頂標總部 →</a>
    </div>

    <div class="ultra-home-metrics">
      <div class="ultra-metric-card tone-${sweet.zoneColor}">
        <span class="ultra-metric-label">目前難度甜蜜點（目標 ~85%）</span>
        <strong>${sweet.zoneLabel}</strong>
        <small>${sweet.accuracy !== null ? `實測獨立答對率 ${sweet.accuracy}%（已練 ${sweet.totalAttempted} 題）` : '尚未累積 5 題作答，點擊下方立刻破冰！'}</small>
      </div>
      <div class="ultra-metric-card">
        <span class="ultra-metric-label">國中 21 科全單元掌握</span>
        <strong>${sweet.masteredUnits} / ${sweet.totalUnits} 單元精熟</strong>
        <small>已閱讀 ${sweet.readCount} 課 · 挖空補全 ${sweet.completionsCount} 課 · 白紙回想 ${sweet.freeRecallsCount} 課</small>
      </div>
      <div class="ultra-metric-card">
        <span class="ultra-metric-label">學測頂頂標先備奠基度</span>
        <strong>${gsat.overallFoundation}% 七科聯動</strong>
        <small>直通 108–115 學測 53 卷 · 2,216 題真題實戰</small>
      </div>
    </div>

    <div class="ultra-quick-actions" role="group" aria-label="超學習一鍵啟動">
      <a class="ultra-action-btn primary" href="#/lesson/${esc(topWeak.id)}">
        <span>⚡ 5 分鐘微啟動</span>
        <small>優先突破：${esc(topWeak.title)}</small>
      </a>
      <button type="button" class="ultra-action-btn" id="home-ultra-interleaved">
        <span>🔀 無提示交錯變異盲測</span>
        <small>隱藏單元名稱・10 題跨科實戰</small>
      </button>
      <button type="button" class="ultra-action-btn" id="home-ultra-drill">
        <span>🎯 狙擊最弱瓶頸特訓</span>
        <small>Direct-Then-Drill 精準回練</small>
      </button>
      <a class="ultra-action-btn" href="#/gsat">
        <span>🎓 學測頂標 Overkill 挑戰</span>
        <small>國綜・國寫・英・數A/B・自然・社會</small>
      </a>
    </div>
  </section>`;
}

export function wireHomeUltralearningBanner(root, state, units, allQuestions, startFn) {
  const interBtn = root.querySelector('#home-ultra-interleaved');
  if (interBtn) {
    interBtn.onclick = () => {
      const coreSet = new Set(['math', 'chinese', 'english', 'physics', 'chemistry', 'biology', 'earth', 'history', 'geography', 'civics']);
      const pool = allQuestions.filter(q => coreSet.has(q.subject));
      startFn(pool, {
        title: '🔀 交錯變異無提示盲測（全科核心）',
        mode: 'practice',
        count: 10,
        blindTopic: true
      });
    };
  }
  const drillBtn = root.querySelector('#home-ultra-drill');
  if (drillBtn) {
    drillBtn.onclick = () => {
      const weak = findBottleneckUnits(state, units, allQuestions, 6);
      const pool = weak.flatMap(w => w.questions);
      startFn(pool.length ? pool : allQuestions, {
        title: '🎯 瓶頸狙擊特訓（Direct-Then-Drill）',
        mode: 'practice',
        count: Math.min(10, Math.max(4, pool.length)),
        blindTopic: false
      });
    };
  }
}

// ---------------------------------------------------------------------------
// 3. Flagship #/ultralearning Command Center Page
// ---------------------------------------------------------------------------

export function renderUltralearningCommandCenter(state, units, subjects, allQuestions) {
  const sweet = computeSweetSpotMetrics(state, units, allQuestions);
  const bottlenecks = findBottleneckUnits(state, units, allQuestions, 6);
  const calib = computeCalibrationMetrics(state.confidenceLog);
  const exposure = getExposureStage(state, units, allQuestions);
  const gsat = getGsatReadinessMetrics(state, units, allQuestions);
  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]));
  const qBookCount = Array.isArray(state.questionBook) ? state.questionBook.length : 0;

  return `
  <div class="ultra-hub">
    <header class="ultra-hero">
      <div class="eyebrow">ULTRALEARNING × GET BETTER AT ANYTHING OS</div>
      <h1>知行超學習總部｜掌握國中全科 ➔ 衝刺學測頂頂標</h1>
      <p class="ultra-hero-lead">
        任何背景的學習者，只要按照 <strong>See（看懂專家隱性思維）➔ Do（85% 甜蜜點＋交錯盲測＋挖空補全）➔ Feedback（信心校準＋瓶頸特訓）</strong> 閉環迭代，都能徹底精通 108 課綱 21 科 188 單元，並穩步拿下會考 5A++ 與學測 14–15 級分頂頂標。
      </p>
      <div class="ultra-hero-actions">
        <button type="button" class="button" id="ultra-btn-interleaved-core">🔀 啟動 10 題無提示交錯盲測</button>
        <button type="button" class="button secondary" id="ultra-btn-drill-weak">🎯 啟動最弱瓶頸特訓 (Drill)</button>
        <a class="button ghost" href="#/gsat">🎓 挑戰 115 學測真題 (Overkill) →</a>
      </div>
    </header>

    <!-- 1. Live 85% Sweet Spot + Calibration + Coverage Radar -->
    <section class="panel ultra-panel">
      <div class="row">
        <div>
          <span class="tag accent">《Get Better at Anything》Ch.5 & Ch.9</span>
          <h2>🎯 85% 難度甜蜜點與信心校準儀表板</h2>
        </div>
        <span class="ultra-zone-badge tone-${sweet.zoneColor}">${sweet.zoneLabel}</span>
      </div>
      <p class="muted">${sweet.zoneAdvice}</p>

      <div class="ultra-gauge-wrap" aria-label="85% 黃金甜蜜點進度尺">
        <div class="ultra-gauge-zones">
          <span class="g-overload">0–64% 負荷過高（回看示範）</span>
          <span class="g-sweet">65–88% ★ 85% 黃金甜蜜點</span>
          <span class="g-overkill">89–100% 升級學測 Overkill</span>
        </div>
        <div class="ultra-gauge-bar">
          <div class="ultra-gauge-marker" style="left:${sweet.accuracy !== null ? sweet.accuracy : 5}%;" title="目前答對率 ${sweet.accuracy ?? 0}%">
            <span>${sweet.accuracy !== null ? sweet.accuracy + '%' : '起點'}</span>
          </div>
        </div>
      </div>

      <div class="stats" style="margin-top:16px;">
        <div class="stat"><label>全科精熟單元</label><strong>${sweet.masteredUnits} / ${sweet.totalUnits}</strong><small>覆蓋 21 科 108 課綱（已讀 ${sweet.coveragePercent}%）</small></div>
        <div class="stat"><label>挖空補全＋白紙回想</label><strong>${sweet.completionsCount} / ${sweet.freeRecallsCount}</strong><small>Copy➔Complete 與 Free Recall 實踐</small></div>
        <div class="stat"><label>信心校準指數</label><strong>${calib.calibrationScore !== null ? calib.calibrationScore + ' 分' : '待累積'}</strong><small>${calib.dangerIllusion > 0 ? `🚨 發現 ${calib.dangerIllusion} 題高信心盲區` : '答題前點選信心度即可校準'}</small></div>
        <div class="stat"><label>個人問題本 (Question Book)</label><strong>${qBookCount} 題</strong><small><a href="#/review">前往問題本自測複習 →</a></small></div>
      </div>
    </section>

    <!-- 2. Interleaved Variability Blind-Context Trainer (GBAA Ch.7 & Ch.10) -->
    <section class="panel ultra-panel">
      <span class="tag accent">《GBAA》Ch.7 變異勝於重複 × Ch.10 練習必須貼近現實</span>
      <h2>🔀 無提示交錯變異特訓引擎（Blind-Context Interleaved Trainer）</h2>
      <p class="muted">
        為什麼平時分章節寫講義都會，段考、會考與學測卻突然卡住？因為課本標題先「暴雷」了公式！
        本模式在作答過程中<strong>自動隱藏單元名稱與章節提示</strong>，跨單元隨機交錯出題，逼迫大腦像真實考場一樣先辨識模型（Problem Search）再破題。
      </p>
      <div class="ultra-interleave-grid">
        <button type="button" class="ultra-track-card" data-interleave="core5">
          <strong>🔥 會考五科全能交錯盲測</strong>
          <span>國文・英文・數學・自然・社會隨機混考（15 題）</span>
        </button>
        <button type="button" class="ultra-track-card" data-interleave="math">
          <strong>📐 數學三年全單元無標題盲測</strong>
          <span>代數・幾何・函數・機率交錯辨識模型（12 題）</span>
        </button>
        <button type="button" class="ultra-track-card" data-interleave="science">
          <strong>🧪 自然四科（物化生地）交錯特訓</strong>
          <span>專治物理化學生物地科跨章混淆（12 題）</span>
        </button>
        <button type="button" class="ultra-track-card" data-interleave="social">
          <strong>🌍 社會三科（史地公）交錯特訓</strong>
          <span>歷史時序 × 地理圖表 × 公民法政混考（12 題）</span>
        </button>
        <button type="button" class="ultra-track-card" data-interleave="lang">
          <strong>📖 語文雙科（國文＋英語）交錯特訓</strong>
          <span>文言虛字・修辭推論・英文句構時態（12 題）</span>
        </button>
        <button type="button" class="ultra-track-card" data-interleave="all21">
          <strong>🌟 21 科全領域素養大亂鬥</strong>
          <span>含科技・藝術・健體・綜合全跨界探索（15 題）</span>
        </button>
      </div>
    </section>

    <!-- 3. Direct-Then-Drill Bottleneck Attack (Ultralearning P4) -->
    <section class="panel ultra-panel">
      <div class="row">
        <div>
          <span class="tag accent">《Ultralearning》原則 4：特訓 (Direct-Then-Drill)</span>
          <h2>🎯 你的前 6 大速率瓶頸單元（優先狙擊清單）</h2>
        </div>
        <button type="button" class="button small" id="ultra-btn-drill-weak-2">⚡ 一鍵開練瓶頸題組</button>
      </div>
      <p class="muted">系統自動掃描你的「高信心錯題盲區 ➔ 待補強錯題 ➔ 未驗收核心單元」，鎖定最拖慢你分數成長的關鍵瓶頸。</p>
      <div class="ultra-bottleneck-grid">
        ${bottlenecks.map((b, idx) => {
          const s = subjectMap[b.unit.subject];
          const ud = unitUltraData[b.unit.id];
          return `
          <div class="ultra-bottleneck-card">
            <div class="row">
              <span class="tag">${idx + 1}. ${esc(s?.name || '')} · ${b.unit.grade}年級</span>
              <span class="subtle">${esc(ud?.gsatBridge?.gsatSubjectName || '')}</span>
            </div>
            <h3><a href="#/lesson/${esc(b.unit.id)}">${esc(b.unit.title)}</a></h3>
            <p class="ultra-reason">${esc(b.reason)}</p>
            <div class="actions" style="margin-top:8px;">
              <a class="button small" href="#/lesson/${esc(b.unit.id)}">先補齊概念＋挖空補全 →</a>
              <a class="button small secondary" href="./quest/#unit/${esc(b.unit.id)}">🎮 闖關特訓</a>
            </div>
          </div>`;
        }).join('')}
      </div>
    </section>

    <!-- 4. Vertical Mastery Blueprint: 國中全科 ➔ 學測頂頂標 (14-15 級分) -->
    <section class="panel ultra-panel">
      <span class="tag accent">終極目標：國中 188 單元全掌握 ➔ 學測頂頂標（14–15 級分）</span>
      <h2>🎓 七大學測考科 × 國中先備基石垂直升維藍圖</h2>
      <p class="muted">學測頂標不是高三才開始衝刺，而是把國中 188 單元的「概念本質、解題程序自動化、交錯辨識能力」打成鋼骨，再透過高階真題超載（Overkill）降維打擊！</p>
      <div class="ultra-gsat-grid">
        ${gsat.rows.map(r => `
          <article class="ultra-gsat-card">
            <div class="row">
              <h3>${esc(r.name)}</h3>
              <span class="tag accent">${esc(r.target)}</span>
            </div>
            <div class="ultra-gsat-progress">
              <div class="row"><small>國中先備奠基度（${r.masteredUnitCount}/${r.relatedUnitCount} 單元精熟）</small><strong>${r.foundationPercent}%</strong></div>
              <progress value="${r.foundationPercent}" max="100"></progress>
            </div>
            <ul class="ultra-skill-list">
              ${r.coreSkills.map(sk => `<li>${esc(sk)}</li>`).join('')}
            </ul>
            <p class="ultra-protocol"><strong>🧠 超學習頂標協議：</strong>${esc(r.ultraProtocol)}</p>
            <div class="ultra-gsat-links">
              <span class="subtle">國中核心先備入口：</span>
              ${r.jhSubjects.slice(0, 4).map(sid => `<a class="chip" href="#/subject/${esc(sid)}">${esc(subjectMap[sid]?.name || sid)}</a>`).join('')}
            </div>
            <div class="actions" style="margin-top:10px;">
              <a class="button small" href="#/gsat-exam/${esc(r.overkillExams[0])}?mode=practice">🚀 挑戰 ${esc(r.overkillExams[0].split('-')[0])} 學測逐題練習</a>
              <a class="button small secondary" href="#/gsat-exam/${esc(r.overkillExams[0])}?mode=exam">⏱️ 限時全真模擬</a>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <!-- 5. Graded Exposure Ladder (GBAA Ch.12: Fears Fade with Exposure) -->
    <section class="panel ultra-panel">
      <span class="tag accent">《Get Better at Anything》Ch.12 恐懼因暴露而消退</span>
      <h2>🪜 五階勇氣暴露天梯（專治畏懼數理、拖延與考場焦慮）</h2>
      <p class="muted">逃避困難科目會讓大腦誤判它更危險；唯有「極小劑量、可承受的成功暴露」，能讓焦慮逐步歸零。你目前正推進至 <strong>Lv.${exposure.currentLevel}</strong>！</p>
      <div class="ultra-ladder">
        ${exposure.stages.map(st => `
          <div class="ultra-ladder-step ${st.done ? 'done' : ''} ${st.level === exposure.currentLevel ? 'current' : ''}">
            <div class="ladder-badge">${st.done ? '✓' : 'L' + st.level}</div>
            <div class="ladder-body">
              <div class="row">
                <strong>${esc(st.title)}</strong>
                <small class="muted">${esc(st.bookRef)}</small>
              </div>
              <p>${esc(st.desc)}</p>
            </div>
            <div class="ladder-act">
              ${st.actionHref
                ? `<a class="button small ${st.done ? 'secondary' : ''}" href="${st.actionHref}">${esc(st.actionLabel)}</a>`
                : `<button type="button" class="button small ${st.done ? 'secondary' : ''}" id="${st.actionId}">${esc(st.actionLabel)}</button>`}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 6. Dual-Book Operating System Reference Matrix -->
    <section class="panel ultra-panel">
      <span class="tag accent">雙書心法落地對照表</span>
      <h2>📚《Ultralearning》×《Get Better at Anything》全站功能對應</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>認知科學原則（書中出處）</th><th>為什麼影響國中精熟與學測頂標</th><th>知行學院落地功能（點擊直達）</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>1. 元學習地圖（Ultralearning P1）</strong></td><td>先分清「概念 / 事實 / 程序」，減少 50% 無效死背。</td><td>每課頂部「元學習藍圖」＋<a href="#/courses">全科地圖</a></td></tr>
            <tr><td><strong>2. 臨摹➔補全➔原創（GBAA Ch.2/5）</strong></td><td>挖空補全題（Completion Problem）大幅降低工作記憶負荷並加速圖式內化。</td><td>全 188 課「🧩 挖空補全演練」＋「SEE / DO / FEEDBACK 聚焦模式」</td></tr>
            <tr><td><strong>3. 專家隱性知識顯性化（GBAA Ch.4）</strong></td><td>用 PARI 模型把高手瞬間「看穿題眼」的反射拆成 4 個可學步驟。</td><td>全 188 課「🔬 PARI 專家思維透視卡」</td></tr>
            <tr><td><strong>4. 變異勝於重複 × 貼近實戰（GBAA Ch.7/10）</strong></td><td>無章節提示的交錯混考能真正遷移到陌生會考／學測素養題。</td><td>上方「🔀 無提示交錯變異特訓」＋<a href="#/pastpapers">近七年會考</a></td></tr>
            <tr><td><strong>5. 主動提取：白紙回想＋問題本（Ultralearning P5）</strong></td><td>提取練習比重複畫重點強 2–3 倍，問題本把筆記變成考前武器。</td><td>每課「📄 白紙自由回想」＋「❓ 個人問題本」＋<a href="#/review">間隔複習</a></td></tr>
            <tr><td><strong>6. 掙扎計時器與深度直覺（Ultralearning P8）</strong></td><td>遇難題不立刻看解答，給大腦 2–5 分鐘搜尋空間，建立真數學物理直覺。</td><td>每課與考場內建「⏳ 深度思考掙扎計時器」</td></tr>
            <tr><td><strong>7. 信心校準與反轉重學（GBAA Ch.9/11）</strong></td><td>「高信心卻答錯」是最危險的失分元凶，必須優先標定並徹底 Unlearn。</td><td>測驗「🎯 信心校準」＋<a href="#/review">高信心盲區優先消滅</a></td></tr>
            <tr><td><strong>8. 直接超載法 Overkill（Ultralearning P3）</strong></td><td>用更高維度（學測真題）訓練，回頭解國中會考與段考便游刃有餘。</td><td><a href="#/gsat">學測 8 年 53 卷 2,216 題全科模考</a></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>`;
}

export function wireUltralearningCommandCenter(root, state, units, subjects, allQuestions, startFn) {
  const launchInterleaved = (track) => {
    const sets = {
      core5: new Set(['math', 'chinese', 'english', 'physics', 'chemistry', 'biology', 'earth', 'history', 'geography', 'civics']),
      math: new Set(['math']),
      science: new Set(['physics', 'chemistry', 'biology', 'earth']),
      social: new Set(['history', 'geography', 'civics']),
      lang: new Set(['chinese', 'english']),
      all21: new Set(subjects.map(s => s.id))
    };
    const labels = {
      core5: '🔀 交錯變異無提示盲測（會考五科核心）',
      math: '🔀 數學三年全單元無標題交錯盲測',
      science: '🔀 自然四科（物化生地）交錯盲測',
      social: '🔀 社會三科（史地公）交錯盲測',
      lang: '🔀 語文雙科（國文＋英語）交錯盲測',
      all21: '🔀 21 科全領域交錯變異大挑戰'
    };
    const counts = { core5: 15, math: 12, science: 12, social: 12, lang: 12, all21: 15 };
    const allowed = sets[track] || sets.core5;
    const pool = allQuestions.filter(q => allowed.has(q.subject));
    startFn(pool, {
      title: labels[track] || labels.core5,
      mode: 'practice',
      count: counts[track] || 12,
      blindTopic: true
    });
  };

  const launchDrill = () => {
    const weak = findBottleneckUnits(state, units, allQuestions, 6);
    const pool = weak.flatMap(w => w.questions);
    startFn(pool.length ? pool : allQuestions, {
      title: '🎯 瓶頸狙擊特訓（Direct-Then-Drill）',
      mode: 'practice',
      count: Math.min(12, Math.max(4, pool.length)),
      blindTopic: false
    });
  };

  const btnCore = root.querySelector('#ultra-btn-interleaved-core');
  if (btnCore) btnCore.onclick = () => launchInterleaved('core5');

  const btnExp = root.querySelector('#exposure-launch-interleaved');
  if (btnExp) btnExp.onclick = () => launchInterleaved('core5');

  const btnDrill1 = root.querySelector('#ultra-btn-drill-weak');
  if (btnDrill1) btnDrill1.onclick = launchDrill;
  const btnDrill2 = root.querySelector('#ultra-btn-drill-weak-2');
  if (btnDrill2) btnDrill2.onclick = launchDrill;

  root.querySelectorAll('[data-interleave]').forEach(btn => {
    btn.onclick = () => launchInterleaved(btn.dataset.interleave);
  });
}

// ---------------------------------------------------------------------------
// 4. Lesson Page Ultralearning Suite:
//    - Progressive Cognitive Mode Switcher (Full / See / Do / Feedback)
//    - Metalearning Map (Why / Concepts · Facts · Procedures) + GSAT Bridge
//    - PARI Expert Tacit Knowledge Card
//    - Copy -> Complete -> Create Interactive Completion Problem
//    - Blank-Sheet Free Recall + Struggle Timer + Question-Book Builder
// ---------------------------------------------------------------------------

export function renderLessonCognitiveModeBar(currentMode = 'full') {
  const modes = [
    { id: 'full', icon: '🧭', label: '全覽深研', desc: '顯示所有模組' },
    { id: 'see', icon: '👁️', label: '1. SEE 看懂示範', desc: '只看元學習地圖、觀念、圖解與範例' },
    { id: 'do', icon: '⚡', label: '2. DO 補全與回想', desc: '聚焦挖空補全、白紙回想、問題本與闖關' },
    { id: 'feedback', icon: '🎯', label: '3. FEEDBACK 真題避坑', desc: '聚焦會考題型、迷思防線與學測銜接' }
  ];
  return `
  <div class="ultra-mode-bar" role="tablist" aria-label="認知負荷聚焦模式切換（See / Do / Feedback）">
    <div class="ultra-mode-title">
      <strong>🧠 認知負荷聚焦模式</strong>
      <small>《Get Better at Anything》See ➔ Do ➔ Feedback 分階專注，一次只做一件事！</small>
    </div>
    <div class="ultra-mode-pills">
      ${modes.map(m => `
        <button type="button" class="ultra-mode-btn ${currentMode === m.id ? 'active' : ''}" data-ultra-mode="${m.id}" role="tab" aria-selected="${currentMode === m.id}" title="${m.desc}">
          <span>${m.icon} ${m.label}</span>
        </button>
      `).join('')}
    </div>
  </div>`;
}

export function renderLessonUltralearningTop(u, state = {}) {
  const ud = getUnitUltra(u.id);
  if (!ud) return '';
  const { metalearning: ml, pari, gsatBridge: gb } = ud;
  const isCompDone = Boolean(state.completionDone?.[u.id]);
  const isRecallDone = Boolean(state.freeRecallDone?.[u.id]);

  return `
  <section class="lesson-step ultra-meta-section" id="step-ultralearning" data-phase="see">
    <div class="step-label">ULTRALEARNING P1 · METALEARNING & GSAT BRIDGE</div>
    <div class="row">
      <h2>🧭 超學習元認知地圖 × 學測頂標垂直銜接</h2>
      <div class="ultra-status-badges">
        <span class="tag ${isCompDone ? 'success' : ''}">${isCompDone ? '✓ 挖空補全完成' : '🧩 待做挖空補全'}</span>
        <span class="tag ${isRecallDone ? 'success' : ''}">${isRecallDone ? '✓ 白紙回想完成' : '📄 待做白紙回想'}</span>
      </div>
    </div>
    <p class="ultra-why-box"><strong>🎯 為什麼這課決定你的頂標高度（Why）：</strong>${esc(ml.why)}</p>

    <div class="ultra-cfp-grid">
      <div class="ultra-cfp-card">
        <div class="cfp-head"><span>💡 Concepts｜要理解的本質</span><small>忌死背，重直覺</small></div>
        <ul>${ml.concepts.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      </div>
      <div class="ultra-cfp-card">
        <div class="cfp-head"><span>📌 Facts｜要熟記的關鍵</span><small>適合閃卡與間隔複習</small></div>
        <ul>${ml.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
      </div>
      <div class="ultra-cfp-card">
        <div class="cfp-head"><span>⚙️ Procedures｜要自動化的 SOP</span><small>透過挖空補全與練習內化</small></div>
        <ol>${ml.procedures.map(p => `<li>${esc(p)}</li>`).join('')}</ol>
      </div>
    </div>

    <div class="ultra-pari-card">
      <div class="pari-header">
        <span>🔬 PARI 專家隱性思維透視（《Get Better at Anything》Ch.4）</span>
        <small>把高手看不見的「破題瞬間反射」完全透明化</small>
      </div>
      <div class="pari-grid">
        <div class="pari-cell"><strong>P · Precursor 題眼訊號</strong><p>${esc(pari.precursor)}</p></div>
        <div class="pari-cell"><strong>A · Action 專家首步動作</strong><p>${esc(pari.action)}</p></div>
        <div class="pari-cell"><strong>R · Result 預期推導結果</strong><p>${esc(pari.result)}</p></div>
        <div class="pari-cell"><strong>I · Interpretation 邊界與防呆</strong><p>${esc(pari.interpretation)}</p></div>
      </div>
    </div>

    <div class="ultra-gsat-bridge-box">
      <div class="row">
        <div>
          <span class="tag accent">🎓 國中 ➔ 高中 ➔ ${esc(gb.gsatSubjectName)} 頂頂標銜接</span>
          <p style="margin:8px 0 4px;"><strong>高階演化：</strong>${esc(gb.seniorEvolution)}</p>
          <p style="margin:0;"><strong>頂標突破心法：</strong>${esc(gb.topTierTactic)}</p>
        </div>
        <div class="ultra-gsat-cta">
          <a class="button small" href="#/gsat-exam/${esc(gb.recommendedGsatExamId)}?mode=practice">🚀 體驗 ${esc(gb.recommendedGsatLabel)} →</a>
          <a class="button small secondary" href="#/ultralearning">查看七科頂標藍圖</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderLessonUltralearningDo(u, state = {}) {
  const ud = getUnitUltra(u.id);
  if (!ud) return '';
  const cp = ud.completionProblem;
  const isCompDone = Boolean(state.completionDone?.[u.id]);
  const isRecallDone = Boolean(state.freeRecallDone?.[u.id]);
  const savedQb = (state.questionBook || []).filter(item => item.unitId === u.id);

  return `
  <section class="lesson-step ultra-do-section" id="step-ultra-do" data-phase="do">
    <div class="step-label">GBAA CH.2/5 & ULTRALEARNING P5/P8 · ACTIVE DO ENGINE</div>
    <h2>⚡ 實戰內化工作坊：挖空補全 × 掙扎計時器 × 白紙回想 × 問題本</h2>

    <!-- A. Copy -> Complete -> Create Completion Problem -->
    <div class="ultra-card ultra-completion-card" data-unit-id="${esc(u.id)}">
      <div class="row">
        <div>
          <span class="tag accent">🧩 Copy ➔ Complete ➔ Create（挖空補全鷹架）</span>
          <h3>先臨摹第 1 步，由你親自補齊最關鍵的第 2 步推導！</h3>
        </div>
        <span class="tag ${isCompDone ? 'success' : ''}" id="ultra-comp-badge-${esc(u.id)}">${isCompDone ? '✓ 已完成補全' : '完成 +15 XP'}</span>
      </div>
      <div class="ultra-comp-problem">
        <strong>📌 實戰情境：</strong>${esc(cp.problem)}
      </div>
      <div class="ultra-comp-steps">
        <div class="comp-step given"><span>Step 1（示範臨摹 · Copy）</span><p>${esc(cp.givenStep1)}</p></div>
        <div class="comp-step blank">
          <span>Step 2（由你補全 · Complete）👇 請選出正確的核心邏輯橋梁：</span>
          <div class="ultra-comp-options" role="group" aria-label="挖空補全選項">
            ${cp.options.map((opt, idx) => `
              <button type="button" class="option ultra-comp-opt" data-comp-idx="${idx}">
                <span>${'ABCD'[idx]}</span><span>${esc(opt)}</span>
              </button>
            `).join('')}
          </div>
          <div class="ultra-comp-feedback" id="ultra-comp-fb-${esc(u.id)}" hidden></div>
        </div>
        <div class="comp-step target"><span>Step 3（目標結論 · 對應驗算）</span><p>${esc(cp.givenStep3)}</p></div>
      </div>
    </div>

    <!-- B. Struggle Timer (Ultralearning P8: Don't give up on hard problems easily) -->
    <div class="ultra-card ultra-struggle-card">
      <div class="row">
        <div>
          <span class="tag">⏳ Ultralearning P8 · 深度直覺掙扎計時器</span>
          <h3>遇見難題別秒看解答！讓大腦深度搜尋 2–5 分鐘</h3>
          <p class="subtle">Scott H. Young 強調：真正建立數理與閱讀直覺的瞬間，發生在你卡住卻堅持推演的那幾分鐘。</p>
        </div>
        <div class="struggle-timer-box">
          <div class="struggle-clock" id="ultra-struggle-clock">02:00</div>
          <div class="struggle-btns">
            <button type="button" class="button small" id="ultra-struggle-start" data-sec="120">開始 2 分鐘深思</button>
            <button type="button" class="button small secondary" id="ultra-struggle-5m" data-sec="300">5 分鐘壓軸挑戰</button>
            <button type="button" class="button small ghost" id="ultra-struggle-stop">重設</button>
          </div>
        </div>
      </div>
    </div>

    <!-- C. Blank-Sheet Free Recall Evaluator (Ultralearning P5) -->
    <div class="ultra-card ultra-recall-card">
      <div class="row">
        <div>
          <span class="tag accent">📄 Ultralearning P5 · 白紙自由回想檢驗（Free Recall）</span>
          <h3>闔上講義！憑記憶寫出本課核心規則，即時檢測遺漏關鍵字</h3>
        </div>
        <button type="button" class="button small secondary" id="ultra-blind-toggle" aria-pressed="false">🙈 遮蔽本課上方講義</button>
      </div>
      <textarea id="ultra-recall-input" class="ultra-textarea" rows="4" placeholder="不要偷看上面！試著用自己的話寫下「${esc(u.title)}」的核心定義、重要判準、公式或生活例子..."></textarea>
      <div class="actions" style="margin-top:8px;">
        <button type="button" class="button small" id="ultra-recall-eval">🔍 檢驗我的回想覆蓋率</button>
        <span class="subtle" id="ultra-recall-status">${isRecallDone ? '✓ 本單元已完成過白紙回想檢驗！' : `本課內含 ${ud.metalearning.recallKeywords.length} 個核心記憶錨點`}</span>
      </div>
      <div id="ultra-recall-result" class="ultra-recall-result" hidden></div>
    </div>

    <!-- D. Question-Book Method (Ultralearning P5) -->
    <div class="ultra-card ultra-qbook-card">
      <div class="row">
        <div>
          <span class="tag">❓ Ultralearning P5 · 個人問題本筆記法（Question Book）</span>
          <h3>把筆記改寫成「考自己的問題」，考前直接進複習中心自測！</h3>
        </div>
        <a class="button small ghost" href="#/review">前往問題本複習 (${(state.questionBook || []).length}) →</a>
      </div>
      <div class="ultra-qbook-form">
        <input type="text" id="ultra-qb-q" placeholder="把本課最易忘的觀念寫成一個問題（例：為什麼 −|−3| 不等於 3？）">
        <input type="text" id="ultra-qb-a" placeholder="你的精準回答與理由（用於考前翻牌比對）">
        <div class="actions">
          <button type="button" class="button small" id="ultra-qb-add">＋ 加入個人問題本</button>
          <button type="button" class="button small secondary" id="ultra-qb-autogen">✨ 一鍵從本課避坑點生成自測題</button>
        </div>
      </div>
      <div id="ultra-qb-list" class="ultra-qb-list">
        ${savedQb.length
          ? savedQb.map(item => `<div class="ultra-qb-item"><strong>Q：${esc(item.q)}</strong><small>A：${esc(item.a)}</small></div>`).join('')
          : '<p class="subtle" style="margin:6px 0 0;">尚未為本課建立問題本條目，點上方「✨ 一鍵生成」或自行輸入！</p>'}
      </div>
    </div>
  </section>`;
}

let activeStruggleInterval = null;

export function wireLessonUltralearningSuite(root, u, state, callbacks = {}) {
  const ud = getUnitUltra(u.id);
  if (!ud) return;
  const { save, activity, toast, playChimeTone } = callbacks;

  // 1. Cognitive Mode Switcher (Full / See / Do / Feedback)
  const article = root.closest('.lesson') || root.querySelector('.lesson') || root;
  const applyMode = (mode) => {
    state.lessonMode = mode;
    if (article && article.setAttribute) article.setAttribute('data-cognitive-mode', mode);
    root.querySelectorAll('[data-ultra-mode]').forEach(btn => {
      const active = btn.dataset.ultraMode === mode;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    if (save) save();
  };
  applyMode(state.lessonMode || 'full');
  root.querySelectorAll('[data-ultra-mode]').forEach(btn => {
    btn.onclick = () => {
      applyMode(btn.dataset.ultraMode);
      const label = btn.textContent.trim();
      if (toast) toast(`🧠 已切換為「${label}」聚焦視角，減少認知過載！`);
    };
  });

  // 2. Interactive Completion Problem (Copy -> Complete -> Create)
  const cp = ud.completionProblem;
  const fbEl = root.querySelector(`#ultra-comp-fb-${u.id}`);
  const badgeEl = root.querySelector(`#ultra-comp-badge-${u.id}`);
  root.querySelectorAll('.ultra-comp-opt').forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.compIdx);
      const isCorrect = idx === cp.answer;
      root.querySelectorAll('.ultra-comp-opt').forEach(b => {
        const bIdx = Number(b.dataset.compIdx);
        b.classList.remove('correct', 'wrong');
        if (bIdx === cp.answer) b.classList.add('correct');
        else if (bIdx === idx && !isCorrect) b.classList.add('wrong');
      });
      if (fbEl) {
        fbEl.hidden = false;
        fbEl.className = 'ultra-comp-feedback ' + (isCorrect ? 'correct' : 'wrong');
        fbEl.innerHTML = `<strong>${isCorrect ? '✓ 完美補全核心推導橋梁！+15 XP' : '○ 這不是本題的關鍵推導步驟，再對照正確橋梁：'}</strong><p>${esc(cp.explanation)}</p>`;
      }
      if (isCorrect) {
        if (!state.completionDone) state.completionDone = {};
        state.completionDone[u.id] = true;
        if (badgeEl) { badgeEl.textContent = '✓ 已完成補全'; badgeEl.classList.add('success'); }
        if (playChimeTone) playChimeTone('success');
        if (activity) activity();
        if (save) save();
      }
    };
  });

  // 3. Struggle Timer (Ultralearning P8)
  const clockEl = root.querySelector('#ultra-struggle-clock');
  const startTimer = (seconds) => {
    clearInterval(activeStruggleInterval);
    let left = seconds;
    const draw = () => {
      const m = String(Math.floor(left / 60)).padStart(2, '0');
      const s = String(left % 60).padStart(2, '0');
      if (clockEl) clockEl.textContent = `${m}:${s}`;
    };
    draw();
    activeStruggleInterval = setInterval(() => {
      if (!document.body.contains(clockEl)) {
        clearInterval(activeStruggleInterval);
        return;
      }
      left--;
      draw();
      if (left <= 0) {
        clearInterval(activeStruggleInterval);
        if (playChimeTone) playChimeTone('pomodoro');
        if (toast) toast('⏳ 深度思考時間到！現在你可以自信核對詳解，大腦吸收率將大幅翻倍！');
      }
    }, 1000);
  };
  const s2Btn = root.querySelector('#ultra-struggle-start');
  const s5Btn = root.querySelector('#ultra-struggle-5m');
  const stopBtn = root.querySelector('#ultra-struggle-stop');
  if (s2Btn) s2Btn.onclick = () => { startTimer(120); if (toast) toast('⏳ 2 分鐘深度掙扎計時開始：先別偷看解答，試著自己寫出推導！'); };
  if (s5Btn) s5Btn.onclick = () => { startTimer(300); if (toast) toast('⏳ 5 分鐘壓軸挑戰計時開始：畫圖、舉特例、檢驗邊界！'); };
  if (stopBtn) stopBtn.onclick = () => { clearInterval(activeStruggleInterval); if (clockEl) clockEl.textContent = '02:00'; };

  // 4. Blank-Sheet Free Recall + Blindfold Lesson Toggle
  const blindBtn = root.querySelector('#ultra-blind-toggle');
  if (blindBtn) {
    blindBtn.onclick = () => {
      const blind = article.classList.toggle('ultra-blind-lecture');
      blindBtn.setAttribute('aria-pressed', String(blind));
      blindBtn.textContent = blind ? '👁️ 解除遮蔽顯示講義' : '🙈 遮蔽本課上方講義';
      if (toast) toast(blind ? '🙈 上方講義已遮蔽！現在請憑記憶寫下所有核心規則！' : '👁️ 已恢復顯示講義，快對照你剛才寫下的內容！');
    };
  }

  const evalBtn = root.querySelector('#ultra-recall-eval');
  const recallInput = root.querySelector('#ultra-recall-input');
  const recallRes = root.querySelector('#ultra-recall-result');
  const recallStatus = root.querySelector('#ultra-recall-status');
  if (evalBtn && recallInput && recallRes) {
    evalBtn.onclick = () => {
      const res = evaluateFreeRecall(recallInput.value, ud.metalearning.recallKeywords);
      recallRes.hidden = false;
      recallRes.innerHTML = `
        <div class="row" style="margin-bottom:8px;">
          <strong>白紙自由回想覆蓋率：${res.coveragePercent}%（命中 ${res.matched.length} / ${ud.metalearning.recallKeywords.length} 個核心錨點）</strong>
        </div>
        <p style="margin:0 0 8px;">${esc(res.verdict)}</p>
        <div class="recall-chips">
          ${res.matched.map(k => `<span class="tag success">✓ ${esc(k)}</span>`).join('')}
          ${res.missing.map(k => `<span class="tag warn-chip">○ 待補回想：${esc(k)}</span>`).join('')}
        </div>`;
      if (res.charCount >= 10) {
        if (!state.freeRecallDone) state.freeRecallDone = {};
        state.freeRecallDone[u.id] = true;
        if (recallStatus) recallStatus.textContent = '✓ 已記錄本課白紙回想練習！';
        if (playChimeTone && res.coveragePercent >= 50) playChimeTone('success');
        if (activity) activity();
        if (save) save();
      }
    };
  }

  // 5. Question-Book Builder
  const qbQ = root.querySelector('#ultra-qb-q');
  const qbA = root.querySelector('#ultra-qb-a');
  const qbAdd = root.querySelector('#ultra-qb-add');
  const qbAuto = root.querySelector('#ultra-qb-autogen');
  const qbList = root.querySelector('#ultra-qb-list');

  const renderQbList = () => {
    if (!qbList) return;
    const items = (state.questionBook || []).filter(item => item.unitId === u.id);
    qbList.innerHTML = items.length
      ? items.map(item => `<div class="ultra-qb-item"><strong>Q：${esc(item.q)}</strong><small>A：${esc(item.a)}</small></div>`).join('')
      : '<p class="subtle" style="margin:6px 0 0;">尚未為本課建立問題本條目。</p>';
  };

  if (qbAdd && qbQ && qbA) {
    qbAdd.onclick = () => {
      const qTxt = qbQ.value.trim();
      const aTxt = qbA.value.trim();
      if (!qTxt || !aTxt) {
        if (toast) toast('請同時填寫「自測問題」與「精準回答」再加入問題本。');
        return;
      }
      if (!Array.isArray(state.questionBook)) state.questionBook = [];
      state.questionBook.unshift({
        id: 'qb-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
        unitId: u.id,
        unitTitle: u.title,
        subject: u.subject,
        q: qTxt,
        a: aTxt,
        createdAt: Date.now(),
        mastered: false
      });
      qbQ.value = '';
      qbA.value = '';
      if (activity) activity();
      if (save) save();
      if (playChimeTone) playChimeTone('success');
      if (toast) toast('❓ 已加入個人問題本！之後可在「錯題與複習 ➔ 問題本自測」反覆提取！');
      renderQbList();
    };
  }

  if (qbAuto && qbQ && qbA) {
    qbAuto.onclick = () => {
      const cleanInterp = String(ud.pari.interpretation || '').replace(/（避坑雷達：[^）]*）\s*$/, '').trim();
      qbQ.value = `【${u.title}】考場最容易混淆的盲點是什麼？該如何用檢核步驟避開？`;
      qbA.value = cleanInterp && cleanInterp !== u.pitfall
        ? `${u.pitfall}｜防呆檢核：${cleanInterp}`
        : u.pitfall;
      if (toast) toast('✨ 已從本課避坑雷達自動填入自測問答，可微調後按「加入個人問題本」！');
      qbQ.focus();
    };
  }
}

// ---------------------------------------------------------------------------
// 5. GSAT Landing Page Bridge (#/gsat): 國中基礎 ➔ 學測頂頂標導航儀表板
// ---------------------------------------------------------------------------

export function renderGsatTopTierBridge(state = {}, units = [], allQuestions = []) {
  const gsat = getGsatReadinessMetrics(state, units, allQuestions);
  return `
  <section class="panel ultra-gsat-bridge-panel" aria-label="國中全科到學測頂頂標超學習導航">
    <div class="row">
      <div>
        <span class="tag accent">🚀 Ultralearning Overkill × 國中 ➔ 學測頂頂標雙軌引擎</span>
        <h2>國中全科奠基 ➔ 學測 14–15 級分頂頂標作戰藍圖</h2>
      </div>
      <a class="button small secondary" href="#/ultralearning">開啟超學習指揮總部 →</a>
    </div>
    <p class="muted">
      別等高三才準備學測！依《超速學習》<strong>直接超載法（Overkill）</strong>與《Get Better at Anything》<strong>領域特定圖式累積（Ch.6）</strong>，現在就看清每一科「國中先備基石（整體已奠基 <strong>${gsat.overallFoundation}%</strong>）➔ 學測頂標真題」的對應路徑：
    </p>
    <div class="ultra-gsat-mini-grid">
      ${gsat.rows.map(r => `
        <div class="ultra-gsat-mini-card">
          <div class="row">
            <strong>${esc(r.name)}</strong>
            <span class="tag">${esc(r.target)}</span>
          </div>
          <div class="ultra-gsat-progress">
            <div class="row"><small>國中先備精熟 ${r.masteredUnitCount}/${r.relatedUnitCount} 課</small><strong>${r.foundationPercent}%</strong></div>
            <progress value="${r.foundationPercent}" max="100"></progress>
          </div>
          <p class="subtle" style="margin:6px 0 8px;">${esc(r.ultraProtocol)}</p>
          <div class="actions" style="margin:0;">
            <a class="button small" href="#/gsat-exam/${esc(r.overkillExams[0])}?mode=practice">逐題練習 ${esc(r.overkillExams[0].split('-')[0])} 卷</a>
            <a class="button small ghost" href="#/subject/${esc(r.jhSubjects[0])}">補強國中基石</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>`;
}
