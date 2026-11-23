// dist/realworld-apps.js
// 4-Pillar Learner Growth Engine (學會 · 學好 · 有興趣 · 會應用)
// Provides Plain-Language Intuition Bridge, Lesson-to-Lab Launcher, Interactive Real-World Decision Studio,
// 10-Minute Action Missions, and the #/apply Real-World Application Hub across all 188 units & 21 subjects.

import { LIFE_THEMES, realWorldAppsData } from './realworld-apps-data.js';
import { LAB_CATALOG, getLabsForUnit } from './labs.js';

export { LIFE_THEMES, realWorldAppsData };

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

export function getRealWorldApp(unitId) {
  return realWorldAppsData[unitId] || null;
}

/**
 * Pure 4-Pillar Mastery Metrics (學會 · 學好 · 有興趣 · 會應用)
 */
export function computeFourPillarMetrics(state = {}, units = [], allQuestions = []) {
  const totalU = Math.max(1, units.length);
  const readCount = (state.read || []).length;
  const compCount = Object.values(state.completionDone || {}).filter(Boolean).length;
  const recallCount = Object.values(state.freeRecallDone || {}).filter(Boolean).length;
  const records = state.records || {};
  const attemptedQ = Object.values(records).filter(r => r && r.attempts > 0).length;
  const correctQ = Object.values(records).filter(r => r && r.latestCorrect).length;
  const accuracy = attemptedQ > 0 ? Math.round((correctQ / attemptedQ) * 100) : 0;

  const decisionsDone = Object.values(state.appliedDecisions || {}).filter(Boolean).length;
  const missionsDone = Object.values(state.appliedMissions || {}).filter(Boolean).length;
  const notesDone = Object.values(state.notes || {}).filter(v => String(v || '').trim().length >= 10).length;
  const bookmarksCount = (state.bookmarks || []).length;
  const labsVisitedCount = (state.labsVisited || []).length;

  // 1. 學會 (Understand): reading + completions + free recalls
  const learnPct = Math.min(100, Math.round(((readCount + compCount * 1.5 + recallCount * 1.5) / (totalU * 2)) * 100));
  // 2. 學好 (Master): independent accuracy + unit mastery
  const masteredUnits = units.filter(u => (u.questions || []).length > 0 && u.questions.every(q => records[q.id]?.latestCorrect)).length;
  const masterPct = attemptedQ === 0
    ? 0
    : Math.min(100, Math.round(accuracy * 0.55 + (masteredUnits / totalU) * 100 * 0.45));
  // 3. 有興趣 (Curiosity & Engagement): bookmarks + lab visits + active days
  const daysCount = (state.days || []).length;
  const interestScore = Math.min(100, Math.round(
    Math.min(40, labsVisitedCount * 10) +
    Math.min(30, bookmarksCount * 6) +
    Math.min(30, daysCount * 6)
  ));
  // 4. 會應用 (Real-World Transfer): solved real-world decisions + hands-on missions + explanation notes
  const applyScore = Math.min(100, Math.round(
    Math.min(50, (decisionsDone / Math.min(30, totalU)) * 50) +
    Math.min(30, (missionsDone / Math.min(15, totalU)) * 30) +
    Math.min(20, (notesDone / Math.min(15, totalU)) * 20)
  ));

  return {
    pillars: [
      { id: 'learn', icon: '💡', label: '學會・建立直覺', pct: learnPct, detail: `已讀 ${readCount}/${units.length} 課 · 挖空補全 ${compCount} 課` },
      { id: 'master', icon: '🏆', label: '學好・精熟大考', pct: masterPct, detail: attemptedQ ? `獨立答對率 ${accuracy}% · 精熟 ${masteredUnits} 單元` : '完成測驗立即追蹤精熟度' },
      { id: 'interest', icon: '✨', label: '有興趣・動手探索', pct: interestScore, detail: `探索 ${labsVisitedCount} 座實驗室 · 收藏 ${bookmarksCount} 課 · 累積 ${daysCount} 天` },
      { id: 'apply', icon: '🌍', label: '會應用・解決生活', pct: applyScore, detail: `完成 ${decisionsDone} 題應用決策 · ${missionsDone} 項生活實踐` }
    ],
    decisionsDone,
    missionsDone,
    labsVisitedCount
  };
}

/**
 * Compact 4-Pillar Progress Strip for Homepage & Apply Hub
 */
export function renderFourPillarBanner(state, units, allQuestions, opts = {}) {
  const m = computeFourPillarMetrics(state, units, allQuestions);
  const isApplyHub = Boolean(opts.isApplyHub);
  return `
  <section class="rwa-pillar-strip" aria-label="學會・學好・有興趣・會應用四維成長儀表">
    <div class="row" style="margin-bottom:12px;flex-wrap:wrap;gap:8px;">
      <div>
        <span class="tag accent">🌱 知行四維學習目標</span>
        <h2 style="margin:6px 0 2px;font-size:1.22rem;">不只考高分，更要「學會・學好・有興趣・會應用」</h2>
      </div>
      <div class="actions" style="margin:0;">
        ${isApplyHub ? '<a class="button small" href="#/ultralearning">🚀 前往超學習總部 →</a>' : '<a class="button small" href="#/apply">🌍 進入學以致用館 →</a>'}
        <a class="button small secondary" href="#/labs">🧪 玩 14 座互動實驗室</a>
      </div>
    </div>
    <div class="rwa-pillar-grid">
      ${m.pillars.map(p => `
        <div class="rwa-pillar-card pillar-${p.id}">
          <div class="row">
            <strong>${p.icon} ${p.label}</strong>
            <span class="rwa-pct">${p.pct}%</span>
          </div>
          <progress value="${p.pct}" max="100" aria-label="${p.label}"></progress>
          <small>${esc(p.detail)}</small>
        </div>
      `).join('')}
    </div>
  </section>`;
}

/**
 * Lesson-Embedded Studio:
 * - Plain-Language 30-Second Intuition Card (學會)
 * - Unit-Matched Interactive Lab Launcher (有興趣 + 學會)
 * - Interactive Real-World Decision Challenge (會應用)
 * - 10-Minute Mini Action Mission + Career Sparks (會應用 + 有興趣)
 */
export function renderLessonRealWorldStudio(u, state = {}) {
  const app = getRealWorldApp(u.id);
  if (!app) return '';
  const theme = LIFE_THEMES.find(t => t.id === app.themeId) || LIFE_THEMES[0];
  const matchedLabs = getLabsForUnit(u);
  const dc = app.decisionChallenge;
  const isDecDone = Boolean(state.appliedDecisions?.[u.id]);
  const isMisDone = Boolean(state.appliedMissions?.[u.id]);

  return `
  <section class="lesson-step rwa-lesson-studio" id="step-realworld" data-phase="do">
    <div class="step-label">4-PILLAR TRANSFER · 學會 × 有興趣 × 會應用</div>
    <div class="row" style="flex-wrap:wrap;gap:8px;">
      <h2>🌍 30 秒白話直覺 × 真實世界學以致用</h2>
      <span class="tag accent">${theme.icon} ${esc(theme.label)}</span>
    </div>

    <!-- 1. 學會: Plain-Language Intuition Bridge -->
    <div class="rwa-intuition-box">
      <div class="rwa-box-head">💡 <strong>30 秒零門檻白話直覺（先懂畫面，再背規則）</strong></div>
      <p>${esc(app.plainIntuition)}</p>
    </div>

    <!-- 2. 有興趣 + 學會: Interactive Lab Deep-Link (when matched) -->
    ${matchedLabs.length ? `
      <div class="rwa-lab-banner">
        <div>
          <span class="tag">🧪 本課專屬互動實驗室 · 動手拉滑桿秒懂原理</span>
          <h3 style="margin:6px 0 4px;">${matchedLabs[0].icon} ${esc(matchedLabs[0].title)}</h3>
          <p class="muted" style="margin:0;font-size:0.88rem;">${esc(matchedLabs[0].desc)}</p>
        </div>
        <a class="button small" href="#/labs?lab=${esc(matchedLabs[0].id)}" data-track-lab="${esc(matchedLabs[0].id)}">🚀 立即動手做實驗 →</a>
      </div>
    ` : ''}

    <!-- 3. 會應用: Interactive Real-World Decision Challenge -->
    <div class="rwa-decision-card">
      <div class="row" style="flex-wrap:wrap;gap:8px;">
        <div>
          <span class="tag accent">🌍 真實生活應用決策任務</span>
          <h3 style="margin:6px 0 4px;">${esc(dc.question)}</h3>
        </div>
        <span class="tag ${isDecDone ? 'success' : ''}" id="rwa-dec-badge-${esc(u.id)}">${isDecDone ? '✓ 已完成應用決策' : '挑戰 +15 XP'}</span>
      </div>
      <p class="rwa-scene">${esc(dc.scene)}</p>
      <div class="rwa-options" role="group" aria-label="生活應用決策選項">
        ${dc.options.map((opt, idx) => `
          <button type="button" class="option rwa-dec-opt" data-rwa-idx="${idx}">
            <span>${idx + 1}</span><span>${esc(opt)}</span>
          </button>
        `).join('')}
      </div>
      <div id="rwa-dec-fb-${esc(u.id)}" class="rwa-feedback" hidden></div>
    </div>

    <!-- 4. Hands-on 10-Min Action Mission + Real-World Careers -->
    <div class="rwa-bottom-grid">
      <div class="rwa-mission-card">
        <div class="row" style="margin-bottom:6px;">
          <strong>🛠️ 10 分鐘生活實踐微專案</strong>
          <span class="tag ${isMisDone ? 'success' : ''}" id="rwa-mis-badge-${esc(u.id)}">${isMisDone ? '✓ 已實踐' : '+20 XP'}</span>
        </div>
        <p style="margin:0 0 10px;font-size:0.88rem;line-height:1.65;">${esc(app.actionMission)}</p>
        <label class="check" style="margin:0;">
          <input type="checkbox" id="rwa-mis-check-${esc(u.id)}" ${isMisDone ? 'checked' : ''}>
          <span>我已經實際動手做過這個生活應用，並能向別人說明原理！</span>
        </label>
      </div>
      <div class="rwa-career-card">
        <strong>🚀 真實世界誰天天在用「${esc(u.title)}」？</strong>
        <div class="rwa-career-chips">
          ${app.careers.map(c => `<span class="rwa-career-pill">💼 ${esc(c)}</span>`).join('')}
        </div>
        <p class="subtle" style="margin:8px 0 0;">每個課綱單元背後，都是未來職涯與聰明生活的真實工具。<a href="#/apply">逛逛 6 大生活應用主題館 →</a></p>
      </div>
    </div>
  </section>`;
}

export function wireLessonRealWorldStudio(root, u, state, callbacks = {}) {
  const app = getRealWorldApp(u.id);
  if (!app) return;
  const { save, activity, toast, playChimeTone } = callbacks;
  const dc = app.decisionChallenge;
  const fb = root.querySelector(`#rwa-dec-fb-${u.id}`);
  const badge = root.querySelector(`#rwa-dec-badge-${u.id}`);

  root.querySelectorAll('.rwa-dec-opt').forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.rwaIdx);
      const ok = idx === dc.answer;
      root.querySelectorAll('.rwa-dec-opt').forEach(b => {
        const bIdx = Number(b.dataset.rwaIdx);
        b.classList.remove('correct', 'wrong');
        if (bIdx === dc.answer) b.classList.add('correct');
        else if (bIdx === idx && !ok) b.classList.add('wrong');
      });
      if (fb) {
        const cleanOutcome = ok ? dc.outcome : String(dc.outcome || '').replace(/^🌍\s*學以致用成功！\s*/, '');
        fb.hidden = false;
        fb.className = 'rwa-feedback ' + (ok ? 'correct' : 'wrong');
        fb.innerHTML = `<strong>${ok ? '✓ 決策超專業！你真正把知識用出來了（+15 XP）' : '○ 再想一下現實後果！最穩妥的應用策略是：'}</strong><p style="margin:6px 0 0;">${esc(cleanOutcome)}</p>`;
      }
      if (ok) {
        if (!state.appliedDecisions) state.appliedDecisions = {};
        state.appliedDecisions[u.id] = true;
        if (badge) { badge.textContent = '✓ 已完成應用決策'; badge.classList.add('success'); }
        if (playChimeTone) playChimeTone('success');
        if (activity) activity();
        if (save) save();
      }
    };
  });

  const misCb = root.querySelector(`#rwa-mis-check-${u.id}`);
  const misBadge = root.querySelector(`#rwa-mis-badge-${u.id}`);
  if (misCb) {
    misCb.onchange = () => {
      if (!state.appliedMissions) state.appliedMissions = {};
      state.appliedMissions[u.id] = misCb.checked;
      if (misBadge) {
        misBadge.textContent = misCb.checked ? '✓ 已實踐' : '+20 XP';
        misBadge.classList.toggle('success', misCb.checked);
      }
      if (misCb.checked) {
        if (playChimeTone) playChimeTone('success');
        if (toast) toast(`🛠️ 太棒了！已完成「${u.title}」生活實踐微專案（+20 XP）！`);
      }
      if (activity) activity();
      if (save) save();
    };
  }

  root.querySelectorAll('[data-track-lab]').forEach(a => {
    a.addEventListener('click', () => {
      if (!Array.isArray(state.labsVisited)) state.labsVisited = [];
      const lid = a.dataset.trackLab;
      if (lid && !state.labsVisited.includes(lid)) {
        state.labsVisited.push(lid);
        if (activity) activity();
        if (save) save();
      }
    });
  });
}

/**
 * Dedicated #/apply Page: 「🌍 學以致用館」
 * Lets learners explore all 188 curriculum units by Real-Life Problem Theme & Interactive Labs.
 */
export function renderApplyHubPage(state, units, subjects, allQuestions, activeTheme = 'all', query = '') {
  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]));
  const kw = String(query || '').trim().toLowerCase();

  const filtered = units.filter(u => {
    const app = realWorldAppsData[u.id];
    if (!app) return false;
    if (activeTheme !== 'all' && app.themeId !== activeTheme) return false;
    if (kw) {
      const hay = `${u.title} ${u.concept} ${u.task} ${app.plainIntuition} ${app.careers.join(' ')} ${subjectMap[u.subject]?.name || ''}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    return true;
  });

  return `
  <div class="rwa-hub">
    <header class="rwa-hub-hero">
      <div class="eyebrow">LEARN · MASTER · ENJOY · APPLY</div>
      <h1>🌍 知行學以致用館｜用國中全科解決 188 個真實生活問題</h1>
      <p>不再問「學這個到底有什麼用？」——直接從你關心的<strong>省錢決策、科技演算法、身體健康、旅遊防災、法律權益與創意表達</strong>切入，動手玩 14 座互動實驗室，把 21 科 188 單元真正用進真實世界！</p>
      <div class="actions" style="margin-top:14px;">
        <a class="button" href="#/labs">🧪 體驗全部 14 座互動實驗室 →</a>
        <a class="button secondary" href="#/ultralearning">🚀 前往超學習・學測頂標總部</a>
      </div>
    </header>

    ${renderFourPillarBanner(state, units, allQuestions, { isApplyHub: true })}

    <!-- 14 Interactive Labs Showcase -->
    <section class="panel">
      <div class="row" style="flex-wrap:wrap;gap:8px;">
        <div>
          <span class="tag accent">🧪 動手玩 ➔ 學會 ➔ 有興趣（跨 8 科 14 座模擬器）</span>
          <h2>互動實驗室精選直達（拉滑桿立刻驗證原理）</h2>
        </div>
        <a class="button small ghost" href="#/labs">開啟完整實驗室頁面 →</a>
      </div>
      <div class="rwa-lab-grid">
        ${LAB_CATALOG.map(l => `
          <a class="rwa-lab-tile" href="#/labs?lab=${esc(l.id)}" data-hub-lab="${esc(l.id)}">
            <div class="row"><strong>${l.icon} ${esc(l.title)}</strong><span class="subtle">進入 ↗</span></div>
            <p>${esc(l.desc)}</p>
          </a>
        `).join('')}
      </div>
    </section>

    <!-- 6 Real-Life Themes Browser across all 188 units -->
    <section class="panel">
      <span class="tag accent">🌍 依真實生活場景探索 188 個課程單元</span>
      <h2>從生活問題出發，找到能幫你的學科超能力</h2>
      <div class="filters" style="margin:12px 0;">
        <button type="button" class="chip ${activeTheme === 'all' ? 'active' : ''}" data-rwa-theme="all">🌟 全部場景 (${units.length})</button>
        ${LIFE_THEMES.map(t => {
          const cnt = units.filter(u => realWorldAppsData[u.id]?.themeId === t.id).length;
          return `<button type="button" class="chip ${activeTheme === t.id ? 'active' : ''}" data-rwa-theme="${t.id}">${t.icon} ${t.label} (${cnt})</button>`;
        }).join('')}
      </div>
      <div class="filters" style="margin-bottom:14px;">
        <input type="search" id="rwa-search-input" value="${esc(query)}" placeholder="搜尋生活問題或職涯，例如：省錢、煞車、抽卡、網購、營養、建築、AI..." style="min-width:280px;flex:1;">
        <span class="tag">${filtered.length} 個真實應用單元</span>
      </div>

      <div class="rwa-unit-grid">
        ${filtered.slice(0, 48).map(u => {
          const app = realWorldAppsData[u.id];
          const s = subjectMap[u.subject];
          const theme = LIFE_THEMES.find(t => t.id === app.themeId);
          const doneDec = Boolean(state.appliedDecisions?.[u.id]);
          const doneMis = Boolean(state.appliedMissions?.[u.id]);
          const labs = getLabsForUnit(u);
          return `
          <article class="rwa-unit-card">
            <div class="row" style="flex-wrap:wrap;gap:6px;">
              <span class="tag">${theme?.icon || '🌍'} ${esc(s?.name || '')} · ${u.grade}年級</span>
              ${doneDec || doneMis ? '<span class="tag success">✓ 已應用實踐</span>' : ''}
            </div>
            <h3><a href="#/lesson/${esc(u.id)}">${esc(u.title)}</a></h3>
            <p class="rwa-unit-intuition">${esc(app.plainIntuition.slice(0, 105))}${app.plainIntuition.length > 105 ? '…' : ''}</p>
            <div class="rwa-career-chips small">
              ${app.careers.slice(0, 2).map(c => `<span class="rwa-career-pill">💼 ${esc(c)}</span>`).join('')}
            </div>
            <div class="actions" style="margin-top:10px;">
              <a class="button small" href="#/lesson/${esc(u.id)}">挑戰本課應用任務 →</a>
              ${labs.length ? `<a class="button small secondary" href="#/labs?lab=${esc(labs[0].id)}">${labs[0].icon} 玩實驗室</a>` : ''}
            </div>
          </article>`;
        }).join('')}
      </div>
      ${filtered.length > 48 ? `<p class="notice" style="margin-top:14px;">目前已顯示前 48 個單元（共符合 ${filtered.length} 個），請點選上方生活場景分類或輸入關鍵字精準探索！</p>` : ''}
      ${!filtered.length ? `<div class="empty"><h3>找不到符合的生活應用場景</h3><p>試著換個關鍵字，或點選「🌟 全部場景」瀏覽。</p></div>` : ''}
    </section>
  </div>`;
}
