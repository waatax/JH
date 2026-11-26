// dist/lesson-illustrations.js
// Native Vector SVG Illustrated Visual Explanations & 21-Subject Iconography System
// Built for Zhixing Junior Academy — Zero external dependencies, full 4-theme & mobile RWD support.

import { subjectById } from './curriculum.js';
import { teachingFor } from './teaching.js';
import { lessonDeepening } from './lesson-deepening.js';
import { officialAlignment } from './official-alignment-data.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

// CJK-aware text wrapper that keeps ASCII numbers/words atomic (never splits mid-number like "1" / "8")
function wrapSvgLines(raw, maxUnits = 24, maxLines = 3) {
  const text = String(raw || '').replace(/\s+/g, ' ').replace(/\*\*/g, '').replace(/`/g, '').trim();
  if (!text) return [''];
  const tokens = text.match(/[A-Za-z0-9._%+-]+|[\s]|./gu) || [];
  const tokenWeight = tok => {
    let w = 0;
    for (const ch of tok) w += /[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1.05;
    return w;
  };
  const lines = [];
  let cur = '';
  let units = 0;

  for (const tok of tokens) {
    const w = tokenWeight(tok);
    if (units + w > maxUnits && cur.trim().length > 0) {
      lines.push(cur.trim());
      if (lines.length === maxLines) {
        const last = lines[maxLines - 1];
        lines[maxLines - 1] = last.length > 2 ? last.slice(0, -1) + '…' : last + '…';
        return lines;
      }
      cur = tok.trimStart();
      units = tokenWeight(cur);
    } else {
      cur += tok;
      units += w;
    }
  }
  if (cur.trim() && lines.length < maxLines) lines.push(cur.trim());
  return lines.length ? lines : [''];
}

function truncUnits(raw, maxUnits = 22) {
  return wrapSvgLines(raw, maxUnits, 1)[0];
}

// ============================================================================
// 1. 21-SUBJECT CUSTOM MULTI-LAYER VECTOR ILLUSTRATIONS
// ============================================================================
const SUBJECT_PALETTES = {
  math:       { bg: '#e8f4fd', stroke: '#1565c0', accent: '#ef6c00', soft: '#bbdefb' },
  chinese:    { bg: '#fdf3e7', stroke: '#9a3412', accent: '#b45309', soft: '#fde68a' },
  english:    { bg: '#eef2ff', stroke: '#3730a3', accent: '#0284c7', soft: '#c7d2fe' },
  biology:    { bg: '#ecfdf5', stroke: '#15803d', accent: '#059669', soft: '#bbf7d0' },
  physics:    { bg: '#eff6ff', stroke: '#1d4ed8', accent: '#d97706', soft: '#bfdbfe' },
  chemistry:  { bg: '#f5f3ff', stroke: '#6d28d9', accent: '#0891b2', soft: '#ddd6fe' },
  earth:      { bg: '#ecfeff', stroke: '#0e7490', accent: '#ca8a04', soft: '#a5f3fc' },
  history:    { bg: '#fef3c7', stroke: '#92400e', accent: '#b91c1c', soft: '#fde68a' },
  geography:  { bg: '#f0fdf4', stroke: '#166534', accent: '#0369a1', soft: '#bbf7d0' },
  civics:     { bg: '#fdf2f8', stroke: '#9d174d', accent: '#1d4ed8', soft: '#fbcfe8' },
  computing:  { bg: '#ecfeff', stroke: '#0f766e', accent: '#4f46e5', soft: '#99f6e4' },
  tech:       { bg: '#fff7ed', stroke: '#c2410c', accent: '#334155', soft: '#fed7aa' },
  visual:     { bg: '#fdf4ff', stroke: '#a21caf', accent: '#e11d48', soft: '#f5d0fe' },
  music:      { bg: '#eef2ff', stroke: '#4338ca', accent: '#db2777', soft: '#c7d2fe' },
  performing: { bg: '#fff1f2', stroke: '#be123c', accent: '#d97706', soft: '#fecdd3' },
  health:     { bg: '#fef2f2', stroke: '#dc2626', accent: '#059669', soft: '#fecaca' },
  pe:         { bg: '#f0f9ff', stroke: '#0369a1', accent: '#ea580c', soft: '#bae6fd' },
  home:       { bg: '#fefce8', stroke: '#a16207', accent: '#16a34a', soft: '#fef08a' },
  scout:      { bg: '#f0fdf4', stroke: '#14532d', accent: '#ea580c', soft: '#bbf7d0' },
  guidance:   { bg: '#faf5ff', stroke: '#7e22ce', accent: '#e11d48', soft: '#e9d5ff' },
  local:      { bg: '#fffbeb', stroke: '#b45309', accent: '#0f766e', soft: '#fde68a' }
};

function subjectGlyphPaths(id, p) {
  switch (id) {
    case 'math':
      return `
        <line x1="12" y1="48" x2="52" y2="48" stroke="${p.stroke}" stroke-width="2.2" stroke-linecap="round"/>
        <line x1="18" y1="12" x2="18" y2="54" stroke="${p.stroke}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M22 44 Q34 12 48 42" fill="none" stroke="${p.accent}" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="35" cy="27" r="3.5" fill="${p.accent}"/>
        <polygon points="36,48 52,48 52,36" fill="${p.soft}" stroke="${p.stroke}" stroke-width="1.6"/>
      `;
    case 'chinese':
      return `
        <rect x="14" y="14" width="28" height="36" rx="4" fill="#fff" stroke="${p.stroke}" stroke-width="2.2"/>
        <line x1="22" y1="20" x2="22" y2="44" stroke="${p.stroke}" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="28" y1="20" x2="28" y2="44" stroke="${p.stroke}" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="34" y1="20" x2="34" y2="38" stroke="${p.stroke}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M44 16 L52 12 L48 34 L42 36 Z" fill="${p.accent}" stroke="${p.stroke}" stroke-width="1.5"/>
        <circle cx="44" cy="44" r="5" fill="${p.soft}" stroke="${p.stroke}" stroke-width="1.6"/>
      `;
    case 'english':
      return `
        <circle cx="28" cy="30" r="16" fill="#fff" stroke="${p.stroke}" stroke-width="2.2"/>
        <ellipse cx="28" cy="30" rx="7" ry="16" fill="none" stroke="${p.stroke}" stroke-width="1.5"/>
        <line x1="12" y1="30" x2="44" y2="30" stroke="${p.stroke}" stroke-width="1.5"/>
        <rect x="33" y="34" width="21" height="16" rx="5" fill="${p.accent}" stroke="#fff" stroke-width="1.6"/>
        <text x="43.5" y="45.5" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">Aa</text>
      `;
    case 'biology':
      return `
        <path d="M18 14 C36 22, 20 34, 38 42 C44 45, 46 48, 46 50" fill="none" stroke="${p.stroke}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M44 14 C26 22, 42 34, 24 42 C18 45, 16 48, 16 50" fill="none" stroke="${p.accent}" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="24" y1="20" x2="38" y2="20" stroke="${p.stroke}" stroke-width="1.8"/>
        <line x1="22" y1="32" x2="40" y2="32" stroke="${p.stroke}" stroke-width="1.8"/>
        <line x1="24" y1="44" x2="38" y2="44" stroke="${p.stroke}" stroke-width="1.8"/>
        <circle cx="47" cy="20" r="6" fill="${p.soft}" stroke="${p.stroke}" stroke-width="1.6"/>
      `;
    case 'physics':
      return `
        <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(-30 32 32)" fill="none" stroke="${p.stroke}" stroke-width="2"/>
        <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(30 32 32)" fill="none" stroke="${p.stroke}" stroke-width="2"/>
        <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(90 32 32)" fill="none" stroke="${p.accent}" stroke-width="1.8" stroke-dasharray="3,2"/>
        <circle cx="32" cy="32" r="5.5" fill="${p.accent}"/>
        <circle cx="46" cy="24" r="3" fill="${p.stroke}"/>
      `;
    case 'chemistry':
      return `
        <path d="M26 13 L38 13 M28 13 L28 24 L15 47 Q13 51 18 51 L46 51 Q51 51 49 47 L36 24 L36 13" fill="#fff" stroke="${p.stroke}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M20 40 L44 40 L47 48 Q48 50 45 50 L19 50 Q16 50 17 48 Z" fill="${p.soft}"/>
        <circle cx="28" cy="44" r="2.5" fill="${p.accent}"/>
        <circle cx="36" cy="35" r="2" fill="${p.accent}"/>
        <circle cx="32" cy="28" r="1.8" fill="${p.stroke}"/>
      `;
    case 'earth':
      return `
        <circle cx="32" cy="32" r="17" fill="${p.soft}" stroke="${p.stroke}" stroke-width="2.2"/>
        <path d="M18 28 Q26 22 33 27 T47 26" fill="none" stroke="${p.stroke}" stroke-width="2"/>
        <path d="M17 38 Q26 33 34 39 T46 37" fill="none" stroke="${p.accent}" stroke-width="2"/>
        <ellipse cx="32" cy="32" rx="25" ry="7" transform="rotate(-22 32 32)" fill="none" stroke="${p.accent}" stroke-width="1.8"/>
      `;
    case 'history':
      return `
        <line x1="18" y1="14" x2="46" y2="14" stroke="${p.stroke}" stroke-width="2.8" stroke-linecap="round"/>
        <line x1="18" y1="50" x2="46" y2="50" stroke="${p.stroke}" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M21 14 L21 20 Q21 28 32 32 Q43 28 43 20 L43 14" fill="${p.soft}" stroke="${p.stroke}" stroke-width="2"/>
        <path d="M21 50 L21 44 Q21 36 32 32 Q43 36 43 44 L43 50" fill="#fff" stroke="${p.stroke}" stroke-width="2"/>
        <polygon points="24,49 40,49 32,40" fill="${p.accent}"/>
      `;
    case 'geography':
      return `
        <polygon points="12,48 26,22 36,38 43,28 52,48" fill="${p.soft}" stroke="${p.stroke}" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="44" cy="18" r="7" fill="#fff" stroke="${p.accent}" stroke-width="1.8"/>
        <polygon points="44,12 46.5,18 44,24 41.5,18" fill="${p.accent}"/>
        <path d="M14 52 Q32 47 50 52" fill="none" stroke="${p.accent}" stroke-width="2" stroke-linecap="round"/>
      `;
    case 'civics':
      return `
        <line x1="32" y1="14" x2="32" y2="48" stroke="${p.stroke}" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="16" y1="22" x2="48" y2="22" stroke="${p.stroke}" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="22" y1="48" x2="42" y2="48" stroke="${p.stroke}" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M16 22 L11 35 Q16 40 21 35 Z" fill="${p.soft}" stroke="${p.stroke}" stroke-width="1.7"/>
        <path d="M48 22 L43 35 Q48 40 53 35 Z" fill="${p.soft}" stroke="${p.accent}" stroke-width="1.7"/>
        <circle cx="32" cy="15" r="3" fill="${p.accent}"/>
      `;
    case 'computing':
      return `
        <rect x="13" y="15" width="38" height="26" rx="4" fill="#fff" stroke="${p.stroke}" stroke-width="2.2"/>
        <polyline points="24,23 19,28 24,33" fill="none" stroke="${p.accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="40,23 45,28 40,33" fill="none" stroke="${p.accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="34" y1="21" x2="30" y2="35" stroke="${p.stroke}" stroke-width="2" stroke-linecap="round"/>
        <line x1="24" y1="48" x2="40" y2="48" stroke="${p.stroke}" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="32" y1="41" x2="32" y2="48" stroke="${p.stroke}" stroke-width="2.4"/>
      `;
    case 'tech':
      return `
        <circle cx="25" cy="34" r="11" fill="${p.soft}" stroke="${p.stroke}" stroke-width="2.4" stroke-dasharray="5,3"/>
        <circle cx="25" cy="34" r="4" fill="#fff" stroke="${p.stroke}" stroke-width="2"/>
        <circle cx="43" cy="24" r="8" fill="#fff" stroke="${p.accent}" stroke-width="2.4" stroke-dasharray="4,2.5"/>
        <circle cx="43" cy="24" r="3" fill="${p.accent}"/>
        <line x1="14" y1="50" x2="50" y2="50" stroke="${p.stroke}" stroke-width="2" stroke-linecap="round"/>
      `;
    case 'visual':
      return `
        <path d="M32 14 C18 14 12 24 12 34 C12 44 20 50 30 50 C34 50 37 47 36 44 C35 41 37 39 40 39 L45 39 C50 39 52 35 52 30 C52 20 43 14 32 14 Z" fill="#fff" stroke="${p.stroke}" stroke-width="2.2"/>
        <circle cx="23" cy="27" r="3" fill="#e11d48"/>
        <circle cx="32" cy="22" r="3" fill="#eab308"/>
        <circle cx="41" cy="26" r="3" fill="#2563eb"/>
        <circle cx="22" cy="38" r="3" fill="#16a34a"/>
      `;
    case 'music':
      return `
        <line x1="12" y1="22" x2="52" y2="22" stroke="${p.soft}" stroke-width="1.6"/>
        <line x1="12" y1="30" x2="52" y2="30" stroke="${p.soft}" stroke-width="1.6"/>
        <line x1="12" y1="38" x2="52" y2="38" stroke="${p.soft}" stroke-width="1.6"/>
        <path d="M26 42 L26 18 L46 14 L46 38" fill="none" stroke="${p.stroke}" stroke-width="2.6" stroke-linejoin="round"/>
        <ellipse cx="22" cy="43" rx="5" ry="3.8" fill="${p.accent}"/>
        <ellipse cx="42" cy="39" rx="5" ry="3.8" fill="${p.stroke}"/>
      `;
    case 'performing':
      return `
        <path d="M16 18 Q32 13 48 18 L45 38 Q32 48 19 38 Z" fill="#fff" stroke="${p.stroke}" stroke-width="2.2"/>
        <circle cx="26" cy="27" r="2.2" fill="${p.stroke}"/>
        <circle cx="38" cy="27" r="2.2" fill="${p.stroke}"/>
        <path d="M25 35 Q32 41 39 35" fill="none" stroke="${p.accent}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M14 50 L50 50" stroke="${p.accent}" stroke-width="2.4" stroke-linecap="round"/>
      `;
    case 'health':
      return `
        <path d="M32 48 C18 39 14 31 14 23 C14 17 19 14 24 14 C28 14 30 16 32 19 C34 16 36 14 40 14 C45 14 50 17 50 23 C50 31 46 39 32 48 Z" fill="${p.soft}" stroke="${p.stroke}" stroke-width="2.2"/>
        <polyline points="19,30 26,30 29,23 34,37 37,30 45,30" fill="none" stroke="${p.accent}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    case 'pe':
      return `
        <circle cx="32" cy="34" r="15" fill="#fff" stroke="${p.stroke}" stroke-width="2.2"/>
        <line x1="32" y1="34" x2="40" y2="26" stroke="${p.accent}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="27" y1="14" x2="37" y2="14" stroke="${p.stroke}" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="32" y1="14" x2="32" y2="19" stroke="${p.stroke}" stroke-width="2.4"/>
        <circle cx="32" cy="34" r="2.5" fill="${p.stroke}"/>
      `;
    case 'home':
      return `
        <path d="M14 30 L32 15 L50 30" fill="none" stroke="${p.stroke}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="19" y="30" width="26" height="19" rx="3" fill="#fff" stroke="${p.stroke}" stroke-width="2.2"/>
        <circle cx="32" cy="39" r="5" fill="${p.soft}" stroke="${p.accent}" stroke-width="1.8"/>
      `;
    case 'scout':
      return `
        <polygon points="32,14 13,48 51,48" fill="${p.soft}" stroke="${p.stroke}" stroke-width="2.2" stroke-linejoin="round"/>
        <polygon points="32,32 25,48 39,48" fill="#fff" stroke="${p.stroke}" stroke-width="1.8"/>
        <circle cx="46" cy="20" r="5" fill="${p.accent}"/>
      `;
    case 'guidance':
      return `
        <circle cx="24" cy="24" r="6" fill="${p.soft}" stroke="${p.stroke}" stroke-width="2"/>
        <circle cx="40" cy="24" r="6" fill="${p.soft}" stroke="${p.accent}" stroke-width="2"/>
        <path d="M14 46 C14 36 22 34 32 34 C42 34 50 36 50 46" fill="none" stroke="${p.stroke}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M28 24 Q32 19 36 24" fill="none" stroke="${p.accent}" stroke-width="2" stroke-linecap="round"/>
      `;
    case 'local':
    default:
      return `
        <path d="M35 13 C41 18 42 30 37 42 C34 48 30 51 28 50 C24 44 23 32 27 21 C29 16 32 13 35 13 Z" fill="${p.soft}" stroke="${p.stroke}" stroke-width="2.2"/>
        <path d="M44 24 Q49 30 44 36" fill="none" stroke="${p.accent}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M48 20 Q55 30 48 40" fill="none" stroke="${p.accent}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="19" cy="31" r="4" fill="${p.accent}"/>
      `;
  }
}

export function getSubjectIconSVG(subjectId, size = 48) {
  const p = SUBJECT_PALETTES[subjectId] || SUBJECT_PALETTES.math;
  const label = subjectById[subjectId]?.name || subjectId;
  return `<svg class="subject-vector-icon" width="${size}" height="${size}" viewBox="0 0 64 64" role="img" aria-label="${esc(label)}學科插圖圖示" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="60" height="60" rx="16" fill="${p.bg}" stroke="${p.stroke}" stroke-opacity="0.28" stroke-width="1.6"/>
    ${subjectGlyphPaths(subjectId, p)}
  </svg>`;
}

// Crisp inline SVG UI / Step Icons
export function getStepIconSVG(stepIndex, size = 24) {
  const specs = [
    { bg: '#e3f2fd', fg: '#1565c0', label: '第1步 審題定位', d: '<circle cx="10.5" cy="10.5" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="14.5" y1="14.5" x2="18.5" y2="18.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' },
    { bg: '#e8f5e9', fg: '#2e7d32', label: '第2步 課綱定理', d: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="12,7 14.2,12 12,17 9.8,12" fill="currentColor"/>' },
    { bg: '#fff3e0', fg: '#e65100', label: '第3步 階梯推導', d: '<polyline points="5,16 10,16 10,12 15,12 15,8 19,8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' },
    { bg: '#ffebee', fg: '#c62828', label: '第4步 陷阱排雷', d: '<path d="M12 4 L18 6.5 V12 C18 16 15.2 18.8 12 20 C8.8 18.8 6 16 6 12 V6.5 Z" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="15.8" r="1" fill="currentColor"/>' },
    { bg: '#f3e5f5', fg: '#6a1b9a', label: '第5步 版本心法', d: '<path d="M7 6 H17 V10 C17 13 14.8 15 12 15 C9.2 15 7 13 7 10 Z" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="12" y1="15" x2="12" y2="18.5" stroke="currentColor" stroke-width="2"/><line x1="8.5" y1="18.5" x2="15.5" y2="18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' }
  ];
  const sp = specs[stepIndex % 5];
  return `<span class="step-icon-badge" style="background:${sp.bg};color:${sp.fg};" title="${sp.label}" aria-hidden="true"><svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${sp.d}</svg></span>`;
}

// ============================================================================
// 2. STAGE 01: PER-UNIT "ONE-GLANCE VISUAL CONCEPT MAP" ILLUSTRATION
// ============================================================================
export function renderConceptVisualMap(u) {
  if (!u) return '';
  const subj = subjectById[u.subject] || { name: u.subject };
  const p = SUBJECT_PALETTES[u.subject] || SUBJECT_PALETTES.math;
  const rows = teachingFor(u)?.rows || [];
  const r0 = rows[0] || [u.title, u.concept.split('。')[0], u.example.split('。')[0]];
  const r1 = rows[1] || r0;
  const r2 = rows[2] || r1;
  const ld = lessonDeepening[u.id] || {
    leftLabel: r0[0], left: r0[1],
    rightLabel: r1[0], right: r1[1]
  };
  const oa = officialAlignment[u.id];
  const codesText = oa?.refs?.map(r => r.code).slice(0, 3).join(' · ') || '108 課綱核心指標';

  const coreTitle = truncUnits(r0[0], 18);
  const coreLines = wrapSvgLines(r0[1], 22, 3);
  const subKeyPill = truncUnits(r1[0], 18);

  const leftTitle = truncUnits(ld.leftLabel, 14);
  const leftLines = wrapSvgLines(ld.left, 16, 2);
  const rightTitle = truncUnits(ld.rightLabel, 14);
  const rightLines = wrapSvgLines(ld.right, 16, 2);

  const pitfallLines = wrapSvgLines(u.pitfall.split('。')[0], 22, 3);
  const checkPill = truncUnits(r2[0], 18);

  return `
  <figure class="visual-explainer-card" aria-label="${esc(u.title)} 一圖秒懂核心概念視覺插圖">
    <div class="visual-explainer-head">
      <div class="visual-head-left">
        ${getSubjectIconSVG(u.subject, 44)}
        <div>
          <div class="visual-kicker">視覺插圖解說 · ONE-GLANCE CONCEPT MAP</div>
          <strong class="visual-title">一圖秒懂「${esc(u.title)}」核心結構與辨析天平</strong>
        </div>
      </div>
      <div class="visual-head-badges">
        <span class="visual-code-pill">📐 108 課綱 ${esc(codesText)}</span>
        <span class="visual-grade-pill">${esc(subj.name)} · ${u.grade}${u.term === 1 ? '上' : '下'}</span>
      </div>
    </div>

    <div class="visual-svg-canvas">
      <svg class="concept-svg visual-concept-svg" viewBox="0 0 720 258" width="100%" style="height:auto;display:block;" role="img" aria-label="${esc(u.title)} 視覺結構圖解：核心判準、雙向對比與考場避坑" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vc-bg-${esc(u.id)}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--svg-bg, #f8fbf9)"/>
            <stop offset="100%" stop-color="var(--svg-bg-end, #f1f6f3)"/>
          </linearGradient>
          <marker id="vc-arr-${esc(u.id)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="${p.stroke}"/>
          </marker>
        </defs>

        <!-- Outer Frame -->
        <rect x="2" y="2" width="716" height="254" rx="14" fill="url(#vc-bg-${esc(u.id)})" stroke="var(--svg-border, #d6dfd9)" stroke-width="1.4"/>

        <!-- Subtle Background Blueprint Grid -->
        <g stroke="var(--svg-grid, #e6eee9)" stroke-width="0.8" opacity="0.7">
          <line x1="20" y1="64" x2="700" y2="64"/>
          <line x1="20" y1="128" x2="700" y2="128"/>
          <line x1="20" y1="192" x2="700" y2="192"/>
        </g>

        <!-- PANEL 1 (LEFT): Core Principle & Mechanism -->
        <g transform="translate(18, 18)">
          <rect width="206" height="218" rx="12" fill="var(--svg-card, #ffffff)" stroke="${p.stroke}" stroke-width="1.8"/>
          <rect width="206" height="36" rx="12" fill="${p.bg}"/>
          <rect y="24" width="206" height="12" fill="${p.bg}"/>
          <!-- Lightbulb Vector Icon -->
          <circle cx="24" cy="18" r="11" fill="${p.stroke}"/>
          <path d="M24 12 C21 12 19 14 19 16.5 C19 18.2 20.2 19.3 21 20.5 H27 C27.8 19.3 29 18.2 29 16.5 C29 14 27 12 24 12 Z" fill="#fff"/>
          <line x1="21.5" y1="22.8" x2="26.5" y2="22.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
          <text x="42" y="22.5" font-size="12" font-weight="800" fill="${p.stroke}">① 核心觀念錨點</text>

          <text x="14" y="60" font-size="12" font-weight="800" fill="var(--svg-ink, #19332a)">${esc(coreTitle)}</text>
          <text x="14" y="82" font-size="10.2" fill="var(--svg-muted, #475d54)">
            ${coreLines.map((ln, idx) => `<tspan x="14" dy="${idx === 0 ? 0 : 17}">${esc(ln)}</tspan>`).join('')}
          </text>

          <!-- Sub-rule Pill -->
          <rect x="12" y="146" width="182" height="58" rx="8" fill="var(--svg-tint-blue, #edf5fc)" stroke="#3b789e" stroke-opacity="0.35" stroke-width="1.2"/>
          <text x="22" y="165" font-size="9.5" font-weight="800" fill="var(--svg-blue, #1e5a85)">🔗 連動規則焦點</text>
          <text x="22" y="185" font-size="10.5" font-weight="700" fill="var(--svg-ink, #19332a)">${esc(subKeyPill)}</text>
        </g>

        <!-- Directional Connector 1 -> 2 -->
        <path d="M 226 126 C 236 126, 236 126, 246 126" fill="none" stroke="${p.stroke}" stroke-width="2.4" marker-end="url(#vc-arr-${esc(u.id)})"/>

        <!-- PANEL 2 (CENTER): Contrastive Balance Scale -->
        <g transform="translate(250, 18)">
          <rect width="220" height="218" rx="12" fill="var(--svg-card, #ffffff)" stroke="#0d9488" stroke-width="1.8"/>
          <rect width="220" height="36" rx="12" fill="var(--svg-tint-teal, #e6f7f5)"/>
          <rect y="24" width="220" height="12" fill="var(--svg-tint-teal, #e6f7f5)"/>
          <!-- Balance Scale Vector Icon -->
          <circle cx="24" cy="18" r="11" fill="#0d9488"/>
          <line x1="24" y1="11" x2="24" y2="24" stroke="#fff" stroke-width="1.7"/>
          <line x1="17" y1="15" x2="31" y2="15" stroke="#fff" stroke-width="1.7"/>
          <circle cx="17.5" cy="19" r="2.2" fill="#fff"/>
          <circle cx="30.5" cy="19" r="2.2" fill="#fff"/>
          <text x="42" y="22.5" font-size="12" font-weight="800" fill="var(--svg-teal, #0f766e)">② 必考觀念辨析天平</text>

          <!-- Top Balance Beam Graphic -->
          <line x1="36" y1="54" x2="184" y2="54" stroke="#0d9488" stroke-width="2" stroke-dasharray="4,2"/>
          <polygon points="110,44 102,56 118,56" fill="#0d9488"/>
          <circle cx="110" cy="54" r="11" fill="#0f766e"/>
          <text x="110" y="57.5" font-size="9.5" font-weight="800" fill="#fff" text-anchor="middle">VS</text>

          <!-- Left Side Box -->
          <rect x="10" y="72" width="96" height="132" rx="8" fill="var(--svg-tint-green, #eef8f2)" stroke="#2e7d32" stroke-opacity="0.45" stroke-width="1.2"/>
          <rect x="16" y="80" width="84" height="22" rx="5" fill="#2e7d32"/>
          <text x="58" y="94.5" font-size="9.5" font-weight="800" fill="#fff" text-anchor="middle">${esc(leftTitle)}</text>
          <text x="16" y="122" font-size="9.5" fill="var(--svg-ink, #19332a)">
            ${leftLines.map((ln, idx) => `<tspan x="16" dy="${idx === 0 ? 0 : 16}">${esc(ln)}</tspan>`).join('')}
          </text>
          <text x="58" y="192" font-size="8.5" font-weight="700" fill="var(--svg-green, #15803d)" text-anchor="middle">✔ 辨識左欄判準</text>

          <!-- Right Side Box -->
          <rect x="114" y="72" width="96" height="132" rx="8" fill="var(--svg-tint-amber, #fff7ea)" stroke="#d97706" stroke-opacity="0.45" stroke-width="1.2"/>
          <rect x="120" y="80" width="84" height="22" rx="5" fill="#d97706"/>
          <text x="162" y="94.5" font-size="9.5" font-weight="800" fill="#fff" text-anchor="middle">${esc(rightTitle)}</text>
          <text x="120" y="122" font-size="9.5" fill="var(--svg-ink, #19332a)">
            ${rightLines.map((ln, idx) => `<tspan x="120" dy="${idx === 0 ? 0 : 16}">${esc(ln)}</tspan>`).join('')}
          </text>
          <text x="162" y="192" font-size="8.5" font-weight="700" fill="var(--svg-amber, #b45309)" text-anchor="middle">✔ 辨識右欄判準</text>
        </g>

        <!-- Directional Connector 2 -> 3 -->
        <path d="M 472 126 C 482 126, 482 126, 492 126" fill="none" stroke="${p.stroke}" stroke-width="2.4" marker-end="url(#vc-arr-${esc(u.id)})"/>

        <!-- PANEL 3 (RIGHT): Pitfall Defense Shield & Checkpoint -->
        <g transform="translate(496, 18)">
          <rect width="206" height="218" rx="12" fill="var(--svg-card, #ffffff)" stroke="#c62828" stroke-width="1.8"/>
          <rect width="206" height="36" rx="12" fill="var(--svg-tint-red, #fdeeed)"/>
          <rect y="24" width="206" height="12" fill="var(--svg-tint-red, #fdeeed)"/>
          <!-- Shield Vector Icon -->
          <circle cx="24" cy="18" r="11" fill="#c62828"/>
          <path d="M24 11 L30 13.5 V18.5 C30 21.8 27.4 24 24 25 C20.6 24 18 21.8 18 18.5 V13.5 Z" fill="none" stroke="#fff" stroke-width="1.6"/>
          <line x1="24" y1="15" x2="24" y2="18.8" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="24" cy="21.5" r="1" fill="#fff"/>
          <text x="42" y="22.5" font-size="12" font-weight="800" fill="var(--svg-red, #b71c1c)">③ 考場避坑防禦雷達</text>

          <text x="14" y="60" font-size="11" font-weight="800" fill="var(--svg-red, #b71c1c)">⚠ 最常失分地雷警示</text>
          <text x="14" y="82" font-size="10.2" fill="var(--svg-ink, #19332a)">
            ${pitfallLines.map((ln, idx) => `<tspan x="14" dy="${idx === 0 ? 0 : 17}">${esc(ln)}</tspan>`).join('')}
          </text>

          <!-- Checkpoint Pill -->
          <rect x="12" y="146" width="182" height="58" rx="8" fill="var(--svg-tint-green, #eef8f2)" stroke="#2e7d32" stroke-opacity="0.45" stroke-width="1.2"/>
          <text x="22" y="165" font-size="9.5" font-weight="800" fill="var(--svg-green, #15803d)">✅ 檢核突破口</text>
          <text x="22" y="185" font-size="10.5" font-weight="700" fill="var(--svg-ink, #19332a)">${esc(checkPill)}</text>
        </g>
      </svg>
    </div>

    <figcaption class="visual-legend-bar">
      <div class="visual-legend-items">
        <span class="v-legend-chip"><i class="v-dot" style="background:${p.stroke};"></i>核心定義</span>
        <span class="v-legend-chip"><i class="v-dot" style="background:#0d9488;"></i>雙向易混淆辨析</span>
        <span class="v-legend-chip"><i class="v-dot" style="background:#c62828;"></i>避坑紅燈防線</span>
      </div>
      <div class="visual-quick-links">
        <a href="#step-diagram" class="visual-mini-link">📐 看本課專屬圖解</a>
        <a href="#step-exam-types" class="visual-mini-link">🎯 段考×會考實戰練習</a>
      </div>
    </figcaption>
  </figure>`;
}

// ============================================================================
// 3. STAGE 02 SUPPLEMENTS: 4-PILLAR ILLUSTRATED EXPLAINER STRIP
// ============================================================================
export function renderSupplementVisualStrip(u, supp) {
  if (!u || !supp) return '';
  const rowCount = supp.rows?.length || 3;
  const focusShort = truncUnits(supp.title, 20);
  const firstRowKey = truncUnits(supp.rows?.[0]?.[0] || '核心辨析', 16);
  const lastRowKey = truncUnits(supp.rows?.[rowCount - 1]?.[0] || '邊界檢核', 16);

  return `
  <div class="supp-visual-strip" aria-label="${esc(u.title)} 深度補充講義視覺導覽圖示">
    <svg class="concept-svg" viewBox="0 0 720 106" width="100%" style="height:auto;display:block;" role="img" aria-label="深度補充四階圖示流程：課綱精補、三版辨析、避坑檢核、自測驗證" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="716" height="102" rx="12" fill="var(--svg-bg, #f8fbf9)" stroke="var(--svg-border, #d6dfd9)" stroke-width="1.3"/>

      <!-- Node 1 -->
      <g transform="translate(14, 14)">
        <rect width="158" height="78" rx="9" fill="var(--svg-card, #ffffff)" stroke="#1565c0" stroke-width="1.6"/>
        <circle cx="24" cy="24" r="12" fill="#e3f2fd"/>
        <circle cx="24" cy="24" r="5.5" fill="none" stroke="#1565c0" stroke-width="2"/>
        <circle cx="24" cy="24" r="2" fill="#1565c0"/>
        <text x="42" y="28" font-size="11" font-weight="800" fill="#1565c0">① 課綱精補焦點</text>
        <text x="12" y="52" font-size="9.5" font-weight="700" fill="var(--svg-ink, #19332a)">${esc(focusShort)}</text>
        <text x="12" y="68" font-size="8.5" fill="var(--svg-muted, #5c7067)">回推段考×會考知識斷層</text>
      </g>

      <path d="M174 53 L190 53" stroke="#3d7957" stroke-width="2.2" stroke-dasharray="3,2"/>
      <polygon points="192,53 186,49 186,57" fill="#3d7957"/>

      <!-- Node 2 -->
      <g transform="translate(194, 14)">
        <rect width="158" height="78" rx="9" fill="var(--svg-card, #ffffff)" stroke="#2e7d32" stroke-width="1.6"/>
        <circle cx="24" cy="24" r="12" fill="#e8f5e9"/>
        <rect x="18" y="18" width="12" height="12" rx="2" fill="none" stroke="#2e7d32" stroke-width="1.8"/>
        <line x1="18" y1="22.5" x2="30" y2="22.5" stroke="#2e7d32" stroke-width="1.4"/>
        <line x1="23" y1="22.5" x2="23" y2="30" stroke="#2e7d32" stroke-width="1.4"/>
        <text x="42" y="28" font-size="11" font-weight="800" fill="#2e7d32">② ${rowCount} 組對照判準</text>
        <text x="12" y="52" font-size="9.5" font-weight="700" fill="var(--svg-ink, #19332a)">${esc(firstRowKey)}</text>
        <text x="12" y="68" font-size="8.5" fill="var(--svg-muted, #5c7067)">康軒 · 翰林 · 南一重點整合</text>
      </g>

      <path d="M354 53 L370 53" stroke="#d97706" stroke-width="2.2" stroke-dasharray="3,2"/>
      <polygon points="372,53 366,49 366,57" fill="#d97706"/>

      <!-- Node 3 -->
      <g transform="translate(374, 14)">
        <rect width="158" height="78" rx="9" fill="var(--svg-card, #ffffff)" stroke="#d97706" stroke-width="1.6"/>
        <circle cx="24" cy="24" r="12" fill="#fff3e0"/>
        <path d="M24 16 L30 18.5 V23.5 C30 27 27.5 29.5 24 31 C20.5 29.5 18 27 18 23.5 V18.5 Z" fill="none" stroke="#d97706" stroke-width="1.8"/>
        <text x="42" y="28" font-size="11" font-weight="800" fill="#b45309">③ 易錯邊界排雷</text>
        <text x="12" y="52" font-size="9.5" font-weight="700" fill="var(--svg-ink, #19332a)">${esc(lastRowKey)}</text>
        <text x="12" y="68" font-size="8.5" fill="var(--svg-muted, #5c7067)">先辨識前提再套用公式</text>
      </g>

      <path d="M534 53 L550 53" stroke="#6a1b9a" stroke-width="2.2" stroke-dasharray="3,2"/>
      <polygon points="552,53 546,49 546,57" fill="#6a1b9a"/>

      <!-- Node 4 -->
      <g transform="translate(554, 14)">
        <rect width="152" height="78" rx="9" fill="var(--svg-card, #ffffff)" stroke="#6a1b9a" stroke-width="1.6"/>
        <circle cx="24" cy="24" r="12" fill="#f3e5f5"/>
        <polyline points="19,24.5 22.5,28 29.5,20.5" fill="none" stroke="#6a1b9a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="42" y="28" font-size="11" font-weight="800" fill="#6a1b9a">④ 自己試一次</text>
        <text x="12" y="52" font-size="9.5" font-weight="700" fill="var(--svg-ink, #19332a)">即時自我檢驗任務</text>
        <text x="12" y="68" font-size="8.5" fill="var(--svg-muted, #5c7067)">展開完整理由核對推導</text>
      </g>
    </svg>
  </div>`;
}

// ============================================================================
// 4. EXAM-TYPES STAGE: DUAL-TRACK SCHOOL & CAP EXAM ROADMAP + COVERAGE GAUGE
// ============================================================================
export function renderExamRoadmapIllustration(u, data, linkedPeriodic = []) {
  if (!u || !data) return '';
  const et = data.examType || {};
  const archs = data.schoolExamArchetypes || [];
  const a0 = truncUnits(archs[0]?.title || '基礎概念辨析題', 16);
  const a1 = truncUnits(archs[1]?.title || '圖表數據轉換題', 16);
  const a2 = truncUnits(archs[2]?.title || '跨單元壓軸整合題', 16);
  const t0 = truncUnits(archs[0]?.examTiming || '段考基礎', 14);
  const t1 = truncUnits(archs[1]?.examTiming || '段考主流', 14);
  const t2 = truncUnits(archs[2]?.examTiming || '段考壓軸', 14);
  const codesShort = truncUnits(et.targetCodes || '108課綱核心', 22);
  const periodicTag = linkedPeriodic.length > 0
    ? `連動 ${linkedPeriodic.length} 份段考講義`
    : '108 課綱跨卷對齊';

  // Gauge circumference for r=34 -> 2*pi*34 = 213.6
  return `
  <figure class="exam-roadmap-svg-card" aria-label="${esc(u.title)} 段考與會考三階突破插圖指南">
    <svg class="concept-svg" viewBox="0 0 720 218" width="100%" style="height:auto;display:block;" role="img" aria-label="段考與會考三階能力躍升路線圖與 108 課綱知識覆蓋率 100% 儀表" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="er-bg-${esc(u.id)}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--svg-bg, #f7fbf9)"/>
          <stop offset="100%" stop-color="var(--svg-bg-end, #edf5f9)"/>
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="716" height="214" rx="14" fill="url(#er-bg-${esc(u.id)})" stroke="var(--svg-border, #d6dfd9)" stroke-width="1.4"/>

      <!-- Left Title -->
      <text x="20" y="28" font-size="12.5" font-weight="800" fill="var(--svg-ink, #19332a)">🏔️ 段考 × 會考 雙軌題型階梯攻略圖（由基礎保底一路打通壓軸）</text>

      <!-- Ascending Curve Path -->
      <path d="M 42 182 Q 155 170 215 130 T 395 66" fill="none" stroke="#0284c7" stroke-width="2.4" stroke-dasharray="5,3" opacity="0.65"/>

      <!-- Step 1: Foundation (Bottom Left) -->
      <g transform="translate(18, 124)">
        <rect width="144" height="78" rx="10" fill="var(--svg-card, #ffffff)" stroke="#43a047" stroke-width="1.8"/>
        <rect width="144" height="22" rx="10" fill="var(--svg-tint-green, #e8f5e9)"/>
        <rect y="12" width="144" height="10" fill="var(--svg-tint-green, #e8f5e9)"/>
        <text x="10" y="15" font-size="9.5" font-weight="800" fill="var(--svg-green, #1b5e20)">🌱 第 1 階 · Type A</text>
        <text x="10" y="40" font-size="9.5" font-weight="700" fill="var(--svg-ink, #19332a)">${esc(a0)}</text>
        <text x="10" y="56" font-size="8.3" fill="var(--svg-muted, #5c7067)">${esc(t0)}</text>
        <text x="10" y="70" font-size="8" font-weight="700" fill="var(--svg-green, #2e7d32)">目標：B ➔ B+ 穩拿保底</text>
      </g>

      <!-- Step 2: Mainstream (Center Middle) -->
      <g transform="translate(174, 84)">
        <rect width="144" height="80" rx="10" fill="var(--svg-card, #ffffff)" stroke="#1e88e5" stroke-width="1.8"/>
        <rect width="144" height="22" rx="10" fill="var(--svg-tint-blue, #e3f2fd)"/>
        <rect y="12" width="144" height="10" fill="var(--svg-tint-blue, #e3f2fd)"/>
        <text x="10" y="15" font-size="9.5" font-weight="800" fill="var(--svg-blue, #0d47a1)">⚡ 第 2 階 · Type B</text>
        <text x="10" y="40" font-size="9.5" font-weight="700" fill="var(--svg-ink, #19332a)">${esc(a1)}</text>
        <text x="10" y="56" font-size="8.3" fill="var(--svg-muted, #5c7067)">${esc(t1)}</text>
        <text x="10" y="70" font-size="8" font-weight="700" fill="var(--svg-blue, #1565c0)">目標：B++ ➔ A 精熟突破</text>
      </g>

      <!-- Step 3: Summit (Upper Middle-Right) -->
      <g transform="translate(330, 42)">
        <rect width="150" height="82" rx="10" fill="var(--svg-card, #ffffff)" stroke="#ef6c00" stroke-width="2"/>
        <rect width="150" height="22" rx="10" fill="var(--svg-tint-amber, #fff3e0)"/>
        <rect y="12" width="150" height="10" fill="var(--svg-tint-amber, #fff3e0)"/>
        <text x="10" y="15" font-size="9.5" font-weight="800" fill="var(--svg-amber, #e65100)">🏆 第 3 階 · Type C</text>
        <text x="10" y="41" font-size="9.5" font-weight="700" fill="var(--svg-ink, #19332a)">${esc(a2)}</text>
        <text x="10" y="58" font-size="8.3" fill="var(--svg-muted, #5c7067)">${esc(t2)}</text>
        <text x="10" y="72" font-size="8" font-weight="700" fill="var(--svg-amber, #e65100)">目標：A+ ➔ A++ 壓軸制霸</text>
        <!-- Summit Flag Icon -->
        <line x1="134" y1="-10" x2="134" y2="8" stroke="#ef6c00" stroke-width="2"/>
        <polygon points="134,-10 147,-5 134,0" fill="#ef6c00"/>
      </g>

      <!-- Bottom Quick Practice Bar under Steps 2-3 (ample inner margins) -->
      <rect x="176" y="176" width="304" height="26" rx="7" fill="var(--svg-card, #ffffff)" stroke="var(--svg-border, #d6dfd9)" stroke-width="1.2"/>
      <text x="328" y="193" font-size="9" font-weight="700" fill="var(--svg-ink, #19332a)" text-anchor="middle">✍️ 章末 3 大互動題（會考＋變形＋段考）＋ 非選 3 級分</text>

      <!-- RIGHT PANEL: 108 Curriculum Sufficiency Gauge -->
      <g transform="translate(498, 16)">
        <rect width="204" height="186" rx="12" fill="var(--svg-card, #ffffff)" stroke="#10b981" stroke-width="1.8"/>
        <text x="102" y="22" font-size="10.5" font-weight="800" fill="var(--svg-green, #047857)" text-anchor="middle">✅ 108 課綱知識充足度審計</text>

        <!-- Circular Progress Ring (100%) -->
        <circle cx="102" cy="74" r="34" fill="none" stroke="var(--svg-border, #e2e8f0)" stroke-width="7.5"/>
        <circle cx="102" cy="74" r="34" fill="none" stroke="#10b981" stroke-width="7.5" stroke-dasharray="213.6 0" stroke-linecap="round" transform="rotate(-90 102 74)"/>
        <text x="102" y="73" font-size="16" font-weight="800" fill="var(--svg-green, #047857)" text-anchor="middle">100%</text>
        <text x="102" y="88" font-size="8.5" font-weight="700" fill="var(--svg-muted, #5c7067)" text-anchor="middle">零斷層覆蓋</text>

        <!-- Audit Specs Pills -->
        <rect x="14" y="120" width="176" height="22" rx="6" fill="var(--svg-tint-green, #ecfdf5)"/>
        <text x="102" y="134.5" font-size="8.8" font-weight="700" fill="var(--svg-green, #065f46)" text-anchor="middle">指標：${esc(codesShort)}</text>

        <rect x="14" y="148" width="176" height="22" rx="6" fill="var(--svg-tint-blue, #e8f4fd)"/>
        <text x="102" y="162.5" font-size="8.8" font-weight="700" fill="var(--svg-blue, #0369a1)" text-anchor="middle">📚 ${esc(periodicTag)} · 三版對照</text>
      </g>
    </svg>
  </figure>`;
}

// ============================================================================
// 5. FIVE-STEP SOLUTION VISUAL GUIDE BAR
// ============================================================================
export function renderFiveStepVisualGuide() {
  const nodes = [
    { num: '1', title: '審題定位', sub: '抓題眼與已知', color: '#1565c0', bg: '#e3f2fd' },
    { num: '2', title: '破題關鍵', sub: '課綱核心定理', color: '#2e7d32', bg: '#e8f5e9' },
    { num: '3', title: '階梯推導', sub: '分步演算推理', color: '#e65100', bg: '#fff3e0' },
    { num: '4', title: '陷阱排雷', sub: '逐項剖析誘答', color: '#c62828', bg: '#ffebee' },
    { num: '5', title: '版本心法', sub: '三版整合驗算', color: '#6a1b9a', bg: '#f3e5f5' }
  ];
  return `
  <div class="five-step-svg-strip" aria-hidden="true">
    <svg viewBox="0 0 700 68" width="100%" style="height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="698" height="66" rx="10" fill="var(--svg-card, #ffffff)" stroke="var(--svg-border, #dbe4df)" stroke-width="1.2"/>
      ${nodes.map((n, i) => {
        const x = 12 + i * 138;
        const arrow = i < 4 ? `<path d="M ${x + 124} 34 L ${x + 135} 34" stroke="${n.color}" stroke-width="2"/><polygon points="${x + 136},34 ${x + 131},30.5 ${x + 131},37.5" fill="${n.color}"/>` : '';
        return `
          <g transform="translate(${x}, 10)">
            <rect width="122" height="48" rx="8" fill="${n.bg}" stroke="${n.color}" stroke-opacity="0.35" stroke-width="1.3"/>
            <circle cx="20" cy="24" r="11" fill="${n.color}"/>
            <text x="20" y="28" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">${n.num}</text>
            <text x="38" y="21" font-size="10.5" font-weight="800" fill="${n.color}">${n.title}</text>
            <text x="38" y="36" font-size="8.6" font-weight="600" fill="#334155">${n.sub}</text>
          </g>
          ${arrow}
        `;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================================
// 6. CONSTRUCTED-RESPONSE (非選擇題) 3-LEVEL SCORING RUBRIC VISUAL BAR
// ============================================================================
export function renderConstructedRubricSVG(u) {
  const tiers = [
    { lv: '0 級分', tag: '未達標準', desc: '只寫猜測或空白未列理由', color: '#94a3b8', bg: '#f1f5f9', stars: '☆☆☆' },
    { lv: '1 級分', tag: '初階起手', desc: '辨識題眼或寫出初步關係', color: '#d97706', bg: '#fff7ed', stars: '★☆☆' },
    { lv: '2 級分', tag: '策略正確', desc: '推導大致正確但缺單位／檢核', color: '#0284c7', bg: '#e0f2fe', stars: '★★☆' },
    { lv: '3 級分', tag: '滿分典範', desc: '列式完整＋嚴謹論述＋驗算', color: '#15803d', bg: '#dcfce7', stars: '★★★' }
  ];
  return `
  <div class="rubric-svg-strip" aria-label="${esc(u?.title || '本單元')} 非選擇題三級分評分視覺圖示">
    <svg viewBox="0 0 700 84" width="100%" style="height:auto;display:block;" role="img" aria-label="非選擇題 0 到 3 級分滿分階梯圖示" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="698" height="82" rx="10" fill="var(--svg-card, #ffffff)" stroke="var(--svg-border, #dbe4df)" stroke-width="1.2"/>
      ${tiers.map((t, i) => {
        const x = 12 + i * 172;
        const arr = i < 3 ? `<path d="M ${x + 160} 42 L ${x + 169} 42" stroke="${t.color}" stroke-width="2"/><polygon points="${x + 170},42 ${x + 165},38.5 ${x + 165},45.5" fill="${t.color}"/>` : '';
        return `
          <g transform="translate(${x}, 10)">
            <rect width="158" height="64" rx="8" fill="${t.bg}" stroke="${t.color}" stroke-width="${i === 3 ? 2 : 1.3}"/>
            <text x="10" y="21" font-size="10.5" font-weight="800" fill="${t.color}">${t.lv} · ${t.tag}</text>
            <text x="148" y="21" font-size="10" font-weight="800" fill="${t.color}" text-anchor="end">${t.stars}</text>
            <text x="10" y="40" font-size="8.6" font-weight="600" fill="#1e293b">${t.desc}</text>
            <rect x="10" y="49" width="${34 + i * 34}" height="5" rx="2.5" fill="${t.color}"/>
          </g>
          ${arr}
        `;
      }).join('')}
    </svg>
  </div>`;
}
