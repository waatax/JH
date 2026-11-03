// dist/publisher-matrix.js
// 108 Curriculum All-Publisher (康軒 / 翰林 / 南一) Autonomous Study Matrix & Version Switcher
// Bridges official 108 Curriculum indicators, documented school/publisher chapter plans,
// and version-specific pedagogical scaffolding across all 188 units (21 subjects).

import { units, subjects, subjectById, unitById } from './curriculum.js';
import { officialAlignment, officialSources } from './official-alignment-data.js';
import { lessonAlignment } from './lesson-alignment.js';
import { teachingFor } from './teaching.js';
import { workedCases } from './worked-cases.js';
import { lessonDeepening } from './lesson-deepening.js';
import { explicitKnowledgePoints } from './explicit-knowledge-points.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

export const PUBLISHER_STORAGE_KEY = 'zhixing-publisher-pref-v1';

export const PUBLISHERS = [
  { id: 'all', name: '三版核心導航', label: '三版核心導航', short: '三版本', icon: '🌟', color: '#193e35', badge: '康軒・翰林・南一 核心觀念查找' },
  { id: '康軒', name: '康軒版', label: '康軒版', short: '康軒', icon: '📗', color: '#1b6ca8', badge: '生活情境導入・圖表直覺建模' },
  { id: '翰林', name: '翰林版', label: '翰林版', short: '翰林', icon: '📘', color: '#2b6a4f', badge: '階梯邏輯推演・嚴謹定義辨析' },
  { id: '南一', name: '南一版', label: '南一版', short: '南一', icon: '📙', color: '#c25900', badge: '探究步驟拆解・考場避坑實戰' }
];

let memoryPub = 'all';

export function getPreferredPublisher(storage = globalThis.localStorage) {
  try {
    const val = storage?.getItem?.(PUBLISHER_STORAGE_KEY);
    if (val && ['all', '康軒', '翰林', '南一'].includes(val)) {
      memoryPub = val;
      return val;
    }
  } catch (_) {}
  return memoryPub;
}

export function setPreferredPublisher(pub, storage = globalThis.localStorage) {
  if (!['all', '康軒', '翰林', '南一'].includes(pub)) return false;
  memoryPub = pub;
  try {
    storage?.setItem?.(PUBLISHER_STORAGE_KEY, pub);
    return true;
  } catch (_) {
    return false;
  }
}

export function getPublisherGuideForUnit(uOrId) {
  const u = typeof uOrId === 'string' ? unitById[uOrId] : uOrId;
  if (!u) return null;

  const subj = subjectById[u.subject] || { name: u.subject, domain: '綜合' };
  const oa = officialAlignment[u.id] || { sourceId: 'index', refs: [], scope: '' };
  const src = officialSources[oa.sourceId] || { url: 'https://www.naer.edu.tw', label: '教育部 108 課綱綱要' };
  const docs = lessonAlignment[u.id] || [];
  const t = teachingFor(u);
  const wc = workedCases[u.id];
  const ld = lessonDeepening[u.id];
  const kps = explicitKnowledgePoints[u.id] || [];

  const gradeLabel = u.grade === 7 ? '國一' : u.grade === 8 ? '國二' : '國三';
  const termLabel = u.term === 1 ? '上學期' : '下學期';
  const gradeTerm = `${gradeLabel}${termLabel}（${u.grade}年級${termLabel}）`;

  // Extract documented chapter titles per publisher if present in lessonAlignment
  const byPub = {
    康軒: docs.filter(d => d.title.startsWith('康軒')),
    翰林: docs.filter(d => d.title.startsWith('翰林')),
    南一: docs.filter(d => d.title.startsWith('南一'))
  };

  // Search keywords for any textbook table of contents
  const rawKeywords = [
    u.title,
    ...(t?.rows || []).slice(0, 3).map(r => r[0]),
    ld?.leftLabel,
    ld?.rightLabel
  ].filter(Boolean);
  const searchKeywords = [...new Set(rawKeywords)].slice(0, 5);

  const officialRefs = (oa.refs || []).map(r => ({
    code: r.code,
    kind: r.kind,
    page: r.page,
    url: `${src.url}#page=${r.page}`,
    sourceLabel: src.label
  }));

  const row0 = t?.rows?.[0] || [u.title, u.concept, u.example];
  const row1 = t?.rows?.[1] || row0;

  const versions = {
    康軒: {
      id: '康軒',
      name: '康軒版',
      icon: '📗',
      styleTag: '本站建議：從實例理解',
      documented: byPub.康軒,
      chapterStatus: byPub.康軒.length
        ? byPub.康軒.map(x => x.title.replace(/\n/g, ' ')).join('；')
        : `依 108 課綱指標（${officialRefs.map(r => r.code).join('、') || subj.name}）對照${gradeLabel}課本「${u.title}」相關單元`,
      coreFocus: kps[0]?.core || u.concept,
      studyStrategy: `先從生活實例「${u.example.split('。')[0]}。」建立直觀圖像，再核對「${row0[0]}」的成立條件：${row0[1]}。`,
      examCheckpoint: kps[0]?.practicalTip || `確認圖表座標、單位與基準點：${row0[2]}`
    },
    翰林: {
      id: '翰林',
      name: '翰林版',
      icon: '📘',
      styleTag: '本站建議：比較判準',
      documented: byPub.翰林,
      chapterStatus: byPub.翰林.length
        ? byPub.翰林.map(x => x.title.replace(/\n/g, ' ')).join('；')
        : `依 108 課綱指標（${officialRefs.map(r => r.code).join('、') || subj.name}）對照${gradeLabel}課本「${u.title}／${ld?.leftLabel || row0[0]}」章節`,
      coreFocus: kps[1]?.formula || kps[1]?.core || `${row1[0]}：${row1[1]}`,
      studyStrategy: `把握「${ld?.leftLabel || row0[0]}」與「${ld?.rightLabel || row1[0]}」的嚴謹定義分界：${ld ? `${ld.leftLabel}為「${ld.left}」；${ld.rightLabel}為「${ld.right}」` : row1[2]}。`,
      examCheckpoint: kps[1]?.examIntel || `段考常考條件逆推與多步推理，務必保留推導步驟。`
    },
    南一: {
      id: '南一',
      name: '南一版',
      icon: '📙',
      styleTag: '本站建議：動手推理',
      documented: byPub.南一,
      chapterStatus: byPub.南一.length
        ? byPub.南一.map(x => x.title.replace(/\n/g, ' ')).join('；')
        : `依 108 課綱指標（${officialRefs.map(r => r.code).join('、') || subj.name}）對照${gradeLabel}課本「${u.title}」探究與應用章節`,
      coreFocus: wc ? `解題三步思維鏈：${wc.steps.slice(0, 2).join(' ➔ ')}` : u.task,
      studyStrategy: `跟著範例「${wc?.problem || u.example}」動手演練，最後落實防呆驗算：${wc?.check || u.task}`,
      examCheckpoint: `考場最高頻陷阱防禦：${u.pitfall}`
    }
  };

  const publishers = Object.values(versions).map(v => ({
    ...v,
    publisher: v.id,
    accent: v.id === '康軒' ? '#1b6ca8' : v.id === '翰林' ? '#2b6a4f' : '#c25900',
    tint: v.id === '康軒' ? '#eef7fc' : v.id === '翰林' ? '#eef8f3' : '#fef5ec',
    chapterStatus: v.documented?.length ? 'documented' : 'guided',
    chapters: (v.documented || []).map(d => ({ book: d.title, section: '', unit: d.title })),
    focus: v.coreFocus,
    strategy: v.studyStrategy,
    checkpoint: v.examCheckpoint
  }));

  return {
    unitId: u.id,
    title: u.title,
    subjectId: u.subject,
    subjectName: subj.name,
    domain: subj.domain,
    grade: u.grade,
    term: u.term,
    gradeTerm,
    searchKeywords,
    tocKeywords: searchKeywords,
    officialRefs,
    officialContent: officialRefs,
    scopeNote: oa.scope || '核心觀念與跨版本共通素養指標；各校實際段考進度請以課堂公布範圍為準。',
    versions,
    publishers
  };
}

export function renderPublisherMatrixSection(uOrId, activePub = getPreferredPublisher()) {
  const guide = getPublisherGuideForUnit(uOrId);
  if (!guide) return '';

  const pubList = ['康軒', '翰林', '南一'];
  const visiblePubs = activePub === 'all' ? pubList : [activePub, ...pubList.filter(p => p !== activePub)];

  return `
    <section class="publisher-matrix-section" id="step-publishers" data-unit-id="${esc(guide.unitId)}" aria-label="108課綱三版本教材對照與自學焦點">
      <div class="pub-matrix-header">
        <div class="pub-matrix-title-group">
          <div class="pub-matrix-badges">
            <span class="pub-main-pill">📚 108 課綱跨版本核心導航</span>
            <span class="pub-semester-pill">🗓️ 建議進度：${esc(guide.gradeTerm)}</span>
          </div>
          <h3>康軒・翰林・南一 跨版本核心焦點與段考雷達：${esc(guide.title)}</h3>
          <p class="pub-matrix-sub">本站以原創教材整理共通核心概念。已收錄章節附公開計畫來源，其餘提供查找關鍵字，仍待核對各版年度、冊次與頁碼。下列自學建議由本站編寫，不代表出版社教材特色或完整收錄。</p>
        </div>
        <div class="pub-quest-cta-box">
          <a class="button pub-quest-launch-btn" href="./quest/#unit/${esc(guide.unitId)}">
            <span>🎮</span>
            <div>
              <strong>進入本課遊戲闖關</strong>
              <small>5 階認知挑戰 · 即時評量</small>
            </div>
            <span>→</span>
          </a>
        </div>
      </div>

      <!-- Interactive Publisher Switcher Toolbar -->
      <div class="pub-switcher-bar" role="tablist" aria-label="選擇課本版本焦點">
        <span class="pub-switcher-label">🎯 我的課本版本：</span>
        ${PUBLISHERS.map(p => {
          const isAct = activePub === p.id;
          return `
            <button type="button" class="pub-switch-btn ${isAct ? 'active' : ''}" data-pub-select="${esc(p.id)}" role="tab" aria-selected="${isAct}">
              <span aria-hidden="true">${p.icon}</span>
              <span>${esc(p.name)}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Textbook TOC Quick Search Keywords & Official Indicators -->
      <div class="pub-meta-strip">
        <div class="pub-keywords-group">
          <span class="pub-meta-label">🔍 課本目錄對照關鍵字：</span>
          <div class="pub-keyword-chips">
            ${guide.searchKeywords.map(kw => `<span class="pub-kw-chip">${esc(kw)}</span>`).join('')}
          </div>
        </div>
        <div class="pub-official-group">
          <span class="pub-meta-label">🏛️ 108 課綱領綱指標：</span>
          <div class="pub-code-chips">
            ${guide.officialRefs.map(r => `
              <a href="${esc(r.url)}" target="_blank" rel="noopener" class="pub-code-chip" title="${esc(r.sourceLabel)} 第 ${r.page} 頁">
                ${esc(r.kind)} <strong>${esc(r.code)}</strong> <small>p.${r.page} ↗</small>
              </a>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Three-Publisher Cards Grid -->
      <div class="pub-cards-grid" role="list">
        ${visiblePubs.map(pubKey => {
          const v = guide.versions[pubKey];
          const isHighlighted = activePub === pubKey;
          const isDimmed = activePub !== 'all' && activePub !== pubKey;
          return `
            <article class="pub-version-card pub-${esc(pubKey)} ${isHighlighted ? 'is-selected' : ''} ${isDimmed ? 'is-secondary' : ''}" role="listitem" data-pub-card="${esc(pubKey)}">
              <header class="pub-card-top">
                <div class="pub-card-brand">
                  <span class="pub-card-icon" aria-hidden="true">${v.icon}</span>
                  <div>
                    <h4>${esc(v.name)}學習焦點</h4>
                    <span class="pub-style-tag">${esc(v.styleTag)}</span>
                  </div>
                </div>
                ${isHighlighted ? '<span class="pub-selected-badge">✓ 我的版本</span>' : ''}
              </header>

              <div class="pub-card-body">
                <div class="pub-field-box pub-chapter-box">
                  <span class="pub-field-label">📖 章節對應與檢索提示</span>
                  <p>${esc(v.chapterStatus)}</p>
                  ${v.documented.length ? `
                    <div class="pub-doc-links">
                      ${v.documented.slice(0, 2).map(d => `<a href="${esc(d.url)}" target="_blank" rel="noopener" class="pub-doc-link">📄 查看公開課程計畫來源 ↗</a>`).join('')}
                    </div>
                  ` : ''}
                </div>

                <div class="pub-field-box pub-focus-box">
                  <span class="pub-field-label">🎯 核心觀念與公式判準</span>
                  <p>${esc(v.coreFocus)}</p>
                </div>

                <div class="pub-field-box pub-strategy-box">
                  <span class="pub-field-label">🧭 自主學習攻略</span>
                  <p>${esc(v.studyStrategy)}</p>
                </div>

                <div class="pub-field-box pub-exam-box">
                  <span class="pub-field-label">🛡️ 段考與會考命題防線</span>
                  <p>${esc(v.examCheckpoint)}</p>
                </div>
              </div>
            </article>
          `;
        }).join('')}
      </div>

      <!-- Summary Comparison Table (Desktop Table / Mobile Responsive Cards) -->
      <details class="pub-comparison-details">
        <summary>📊 展開「${esc(guide.title)}」三版本（康軒／翰林／南一）一覽對照表</summary>
        <div class="table-wrap pub-table-wrap">
          <table class="teaching-table pub-comparison-table">
            <caption>${esc(guide.title)} · 108 課綱三版本自學檢核對照表</caption>
            <thead>
              <tr>
                <th scope="col" style="width:16%;">教材版本</th>
                <th scope="col" style="width:26%;">章節定位／對應線索</th>
                <th scope="col" style="width:30%;">核心切入視角</th>
                <th scope="col" style="width:28%;">段考與會考必考防線</th>
              </tr>
            </thead>
            <tbody>
              ${pubList.map(pubKey => {
                const v = guide.versions[pubKey];
                return `
                  <tr class="${activePub === pubKey ? 'row-highlight-core' : ''}">
                    <th scope="row" data-label="教材版本"><span class="row-icon" aria-hidden="true">${v.icon}</span> ${esc(v.name)}</th>
                    <td data-label="章節定位">${esc(v.chapterStatus)}</td>
                    <td data-label="核心切入視角">${esc(v.coreFocus)}</td>
                    <td data-label="必考防線">${esc(v.examCheckpoint)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        <p class="subtle" style="margin-top:8px;">📌 說明：${esc(guide.scopeNote)}未公開完整章節之冊別採 108 課綱官方學習重點指標對齊，不以臆測章號替代。</p>
      </details>
    </section>
  `;
}

export function wirePublisherMatrix(root = document, onPubChange = null) {
  root.querySelectorAll('[data-pub-select]').forEach(btn => {
    btn.onclick = () => {
      const pub = btn.dataset.pubSelect;
      setPreferredPublisher(pub);
      const sec = btn.closest('.publisher-matrix-section');
      if (sec && sec.dataset.unitId) {
        const uid = sec.dataset.unitId;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = renderPublisherMatrixSection(uid, pub).trim();
        const newSec = wrapper.firstElementChild;
        if (newSec) {
          sec.replaceWith(newSec);
          wirePublisherMatrix(newSec.parentElement || document, onPubChange);
        }
      }
      if (typeof onPubChange === 'function') onPubChange(pub);
    };
  });
}
