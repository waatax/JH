// Generator for 108 Curriculum Explicit Knowledge Points & Infographics
// Version 19 Upgrade - 12 Specialized SVG Generators, 4D Epistemic Depth & Next-Gen UI/UX Architecture
import fs from 'node:fs';
import { units, subjects, unitById, subjectById } from '../dist/curriculum.js';
import { teachingTables } from '../dist/teaching.js';
import { exegesisData } from '../dist/exegesis-data.js';
import { lessonDeepening } from '../dist/lesson-deepening.js';
import { workedCases } from '../dist/worked-cases.js';
import { getKnowledgeNode } from '../dist/knowledge-network.js';

const esc = s => String(s).replace(/[&<>'"]/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
}[c]));

const subjectThemes = {
  math: { primary: '#668c36', bg: '#f4f8ee', accent: '#466421', text: '#283b12', label: '數理邏輯', icon: '📐' },
  biology: { primary: '#3f8768', bg: '#edf7f2', accent: '#295d46', text: '#153628', label: '生命科學', icon: '🔬' },
  physics: { primary: '#487b8a', bg: '#edf5f7', accent: '#305560', text: '#1b3239', label: '物質與力', icon: '⚡' },
  chemistry: { primary: '#8160a0', bg: '#f6f1fb', accent: '#5c3f78', text: '#342147', label: '物質變化', icon: '🧪' },
  earth: { primary: '#546e9f', bg: '#f0f4fa', accent: '#374b72', text: '#1e2b44', label: '地球天文', icon: '🌍' },
  chinese: { primary: '#5867a2', bg: '#f1f3f9', accent: '#3b4774', text: '#212946', label: '語文思維', icon: '✍️' },
  english: { primary: '#4879a5', bg: '#f0f5fa', accent: '#2f5577', text: '#1a3249', label: '英語溝通', icon: '🌐' },
  local: { primary: '#9d8256', bg: '#fbf7f1', accent: '#6f5b3a', text: '#433620', label: '本土文化', icon: '🌾' },
  history: { primary: '#a97b36', bg: '#faf4ea', accent: '#795521', text: '#473010', label: '歷史時空', icon: '🏛️' },
  geography: { primary: '#458570', bg: '#eef6f3', accent: '#2e5d4d', text: '#18362c', label: '地理空間', icon: '🗺️' },
  civics: { primary: '#b07150', bg: '#fbf2ed', accent: '#7d4d34', text: '#4d2b1a', label: '公民法治', icon: '⚖️' },
  visual: { primary: '#9d6092', bg: '#faf0f8', accent: '#6e3e65', text: '#42203c', label: '視覺美感', icon: '🎨' },
  music: { primary: '#7762a1', bg: '#f4f1fa', accent: '#513f73', text: '#2f2345', label: '音樂美感', icon: '🎵' },
  performing: { primary: '#a45e74', bg: '#faf1f4', accent: '#753e4f', text: '#47212d', label: '表演藝術', icon: '🎭' },
  computing: { primary: '#5c72a6', bg: '#f1f4fa', accent: '#3c4c73', text: '#212c45', label: '運算思維', icon: '💻' },
  technology: { primary: '#637b88', bg: '#f2f5f7', accent: '#445660', text: '#243037', label: '生活科技', icon: '⚙️' },
  health: { primary: '#a7794d', bg: '#faf4ee', accent: '#775330', text: '#482f18', label: '身心健康', icon: '🩺' },
  pe: { primary: '#7b9246', bg: '#f5f8ed', accent: '#55672d', text: '#323f18', label: '體能運動', icon: '🏃' },
  home: { primary: '#a97070', bg: '#faf1f1', accent: '#774c4c', text: '#472b2b', label: '家政實務', icon: '🍳' },
  scout: { primary: '#658351', bg: '#f2f7ef', accent: '#445b34', text: '#25351a', label: '戶外探索', icon: '⛺' },
  guidance: { primary: '#82709c', bg: '#f5f2f9', accent: '#594a6e', text: '#342943', label: '生涯成長', icon: '🧭' }
};

// 1. Coordinate / Number Line Vector
function generateCoordinateSvg(title, labelA, valA, labelB, valB, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="32" font-size="13" font-weight="700" fill="${theme.accent}">📐 數線與坐標對稱結構圖解</text>
    <text x="516" y="32" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${theme.label}</text>
    
    <line x1="40" y1="95" x2="500" y2="95" stroke="${theme.primary}" stroke-width="3" stroke-linecap="round"/>
    <polygon points="508,95 496,90 496,100" fill="${theme.primary}"/>
    <polygon points="32,95 44,90 44,100" fill="${theme.primary}"/>
    
    <line x1="270" y1="85" x2="270" y2="105" stroke="${theme.primary}" stroke-width="2"/>
    <circle cx="270" cy="95" r="4" fill="${theme.accent}"/>
    <text x="270" y="125" text-anchor="middle" font-size="13" font-weight="700" fill="${theme.text}">基準原點 0</text>
    
    <line x1="140" y1="88" x2="140" y2="102" stroke="${theme.accent}" stroke-width="2"/>
    <circle cx="140" cy="95" r="6" fill="${theme.primary}"/>
    <rect x="75" y="52" width="130" height="26" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.2"/>
    <text x="140" y="69" text-anchor="middle" font-size="11" font-weight="600" fill="${theme.text}">${esc(labelA)}: ${esc(valA)}</text>
    
    <line x1="400" y1="88" x2="400" y2="102" stroke="${theme.accent}" stroke-width="2"/>
    <circle cx="400" cy="95" r="6" fill="${theme.accent}"/>
    <rect x="335" y="52" width="130" height="26" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.2"/>
    <text x="400" y="69" text-anchor="middle" font-size="11" font-weight="600" fill="${theme.accent}">${esc(labelB)}: ${esc(valB)}</text>
    
    <path d="M 140 138 C 140 148, 270 148, 270 156 C 270 148, 400 148, 400 138" fill="none" stroke="${theme.primary}" stroke-width="1.8" stroke-dasharray="4,2"/>
    <rect x="200" y="146" width="140" height="22" rx="4" fill="${theme.primary}"/>
    <text x="270" y="161" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">幾何距離 |A−B| ≥ 0</text>
  </svg>`;
}

// 2. Parabola & Geometric Theorem Breakdown
function generateParabolaGeometrySvg(title, apex, formula, symmetry, rootInfo, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="30" font-size="13" font-weight="700" fill="${theme.accent}">📈 拋物線函數與幾何定理結構圖</text>
    <text x="516" y="30" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${theme.label}</text>
    
    <!-- Coordinate Axis -->
    <line x1="30" y1="130" x2="230" y2="130" stroke="${theme.primary}" stroke-width="1.5"/>
    <line x1="130" y1="35" x2="130" y2="155" stroke="${theme.primary}" stroke-width="1.5"/>
    <polygon points="234,130 226,126 226,134" fill="${theme.primary}"/>
    <polygon points="130,31 126,39 134,39" fill="${theme.primary}"/>
    
    <!-- Parabola Curve -->
    <path d="M 60 145 Q 130 50 200 145" fill="none" stroke="${theme.accent}" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Apex point -->
    <circle cx="130" cy="50" r="5" fill="${theme.primary}"/>
    <rect x="75" y="35" width="110" height="20" rx="4" fill="#ffffff" stroke="${theme.primary}" stroke-width="1"/>
    <text x="130" y="49" text-anchor="middle" font-size="10" font-weight="700" fill="${theme.accent}">頂點: ${esc(apex)}</text>
    
    <!-- Symmetry line -->
    <line x1="130" y1="55" x2="130" y2="150" stroke="${theme.primary}" stroke-width="1.5" stroke-dasharray="3,3"/>
    
    <!-- Info Cards on Right -->
    <rect x="250" y="45" width="265" height="34" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.4"/>
    <text x="260" y="66" font-size="11" font-weight="700" fill="${theme.accent}">標準解析式：</text>
    <text x="340" y="66" font-size="11" font-weight="800" fill="${theme.text}">${esc(formula)}</text>
    
    <rect x="250" y="85" width="265" height="34" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.4"/>
    <text x="260" y="106" font-size="11" font-weight="700" fill="${theme.primary}">對稱與極值：</text>
    <text x="340" y="106" font-size="11" font-weight="600" fill="${theme.text}">${esc(symmetry)}</text>
    
    <rect x="250" y="125" width="265" height="34" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.4"/>
    <text x="260" y="146" font-size="11" font-weight="700" fill="${theme.accent}">判別式與根：</text>
    <text x="340" y="146" font-size="11" font-weight="600" fill="${theme.text}">${esc(rootInfo)}</text>
    
    <text x="130" y="170" text-anchor="middle" font-size="10" font-weight="600" fill="${theme.text}">對稱軸 x＝h</text>
  </svg>`;
}

// 3. Formula Breakdown & Quantitative Relations
function generateFormulaSvg(title, formulaTitle, part1, part2, result, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="30" font-size="13" font-weight="700" fill="${theme.accent}">⚡ 核心法則與定量關係圖</text>
    <text x="516" y="30" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${esc(formulaTitle)}</text>
    
    <rect x="30" y="58" width="135" height="74" rx="8" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.8"/>
    <rect x="30" y="58" width="135" height="24" rx="8" fill="${theme.primary}"/>
    <text x="97" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">📥 輸入／已知條件</text>
    <text x="97" y="104" text-anchor="middle" font-size="12" font-weight="600" fill="${theme.text}">${esc(part1)}</text>
    
    <circle cx="190" cy="95" r="14" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5"/>
    <text x="190" y="100" text-anchor="middle" font-size="16" font-weight="700" fill="${theme.primary}">➔</text>
    
    <rect x="215" y="58" width="135" height="74" rx="8" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.8"/>
    <rect x="215" y="58" width="135" height="24" rx="8" fill="${theme.accent}"/>
    <text x="282" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">⚙️ 轉換／運算機制</text>
    <text x="282" y="104" text-anchor="middle" font-size="12" font-weight="600" fill="${theme.accent}">${esc(part2)}</text>
    
    <circle cx="375" cy="95" r="14" fill="${theme.bg}" stroke="${theme.accent}" stroke-width="1.5"/>
    <text x="375" y="100" text-anchor="middle" font-size="16" font-weight="700" fill="${theme.accent}">＝</text>
    
    <rect x="400" y="52" width="115" height="86" rx="8" fill="#ffffff" stroke="${theme.primary}" stroke-width="2.2"/>
    <rect x="400" y="52" width="115" height="24" rx="8" fill="${theme.primary}"/>
    <text x="457" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">🎯 判準結論</text>
    <text x="457" y="102" text-anchor="middle" font-size="13" font-weight="800" fill="${theme.text}">${esc(result)}</text>
    
    <rect x="30" y="146" width="485" height="22" rx="4" fill="${theme.primary}" fill-opacity="0.12"/>
    <text x="272" y="161" text-anchor="middle" font-size="11" font-weight="600" fill="${theme.text}">💡 檢核要領：保留完整單位、驗證正負號與邊界限制</text>
  </svg>`;
}

// 4. 3-Stage Process Flow
function generateProcessSvg(title, step1, step2, step3, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="30" font-size="13" font-weight="700" fill="${theme.accent}">🔄 推演機制與解題流程圖</text>
    <text x="516" y="30" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} 3-Stage</text>
    
    <g transform="translate(30, 52)">
      <rect width="135" height="96" rx="8" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.5"/>
      <circle cx="20" cy="20" r="12" fill="${theme.primary}"/>
      <text x="20" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">1</text>
      <text x="42" y="24" font-size="12" font-weight="700" fill="${theme.text}">審題定位</text>
      <foreignObject x="10" y="42" width="115" height="48">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;line-height:1.35;color:#334155;overflow:hidden;">
          ${esc(step1)}
        </div>
      </foreignObject>
    </g>
    
    <path d="M 175 100 L 195 100" stroke="${theme.primary}" stroke-width="2.5" stroke-linecap="round"/>
    <polygon points="199,100 191,96 191,104" fill="${theme.primary}"/>
    
    <g transform="translate(205, 52)">
      <rect width="135" height="96" rx="8" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.8"/>
      <circle cx="20" cy="20" r="12" fill="${theme.accent}"/>
      <text x="20" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">2</text>
      <text x="42" y="24" font-size="12" font-weight="700" fill="${theme.accent}">模型推演</text>
      <foreignObject x="10" y="42" width="115" height="48">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;line-height:1.35;color:#334155;overflow:hidden;">
          ${esc(step2)}
        </div>
      </foreignObject>
    </g>
    
    <path d="M 350 100 L 370 100" stroke="${theme.accent}" stroke-width="2.5" stroke-linecap="round"/>
    <polygon points="374,100 366,96 366,104" fill="${theme.accent}"/>
    
    <g transform="translate(380, 52)">
      <rect width="130" height="96" rx="8" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.8"/>
      <circle cx="20" cy="20" r="12" fill="${theme.primary}"/>
      <text x="20" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">3</text>
      <text x="42" y="24" font-size="12" font-weight="700" fill="${theme.text}">驗算防呆</text>
      <foreignObject x="10" y="42" width="110" height="48">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;line-height:1.35;color:#334155;overflow:hidden;">
          ${esc(step3)}
        </div>
      </foreignObject>
    </g>
    
    <text x="270" y="166" text-anchor="middle" font-size="11" font-weight="600" fill="${theme.primary}">🔗 閉環檢驗：確保每一步推理皆有課綱定義或物理/數學定理支撐</text>
  </svg>`;
}

// 5. Cognitive Contrast
function generateContrastSvg(title, labelA, descA, labelB, descB, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="30" font-size="13" font-weight="700" fill="${theme.accent}">⚖️ 易混淆概念雙軌辨析圖</text>
    <text x="516" y="30" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} Contrast</text>
    
    <rect x="30" y="50" width="220" height="98" rx="8" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.6"/>
    <rect x="30" y="50" width="220" height="26" rx="8" fill="${theme.primary}"/>
    <text x="140" y="67" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">① ${esc(labelA)}</text>
    <foreignObject x="42" y="82" width="196" height="58">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;line-height:1.35;color:#1e293b;overflow:hidden;">
        ${esc(descA)}
      </div>
    </foreignObject>
    
    <circle cx="270" cy="99" r="18" fill="#ffffff" stroke="${theme.accent}" stroke-width="2"/>
    <text x="270" y="104" text-anchor="middle" font-size="12" font-weight="900" fill="${theme.accent}">VS</text>
    
    <rect x="290" y="50" width="220" height="98" rx="8" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.6"/>
    <rect x="290" y="50" width="220" height="26" rx="8" fill="${theme.accent}"/>
    <text x="400" y="67" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">② ${esc(labelB)}</text>
    <foreignObject x="302" y="82" width="196" height="58">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;line-height:1.35;color:#1e293b;overflow:hidden;">
        ${esc(descB)}
      </div>
    </foreignObject>
    
    <text x="270" y="166" text-anchor="middle" font-size="11" font-weight="600" fill="${theme.text}">🛡️ 避坑分水嶺：抓住核心邊界條件，杜絕以假亂真或偷換概念</text>
  </svg>`;
}

// 6. Dynamic Equilibrium & Balance Scales
function generateSystemBalanceSvg(title, leftTitle, rightTitle, pivotTitle, takeaway, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="30" font-size="13" font-weight="700" fill="${theme.accent}">⚖️ 動態平衡與系統制衡模型</text>
    <text x="516" y="30" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} Equilibrium</text>
    
    <line x1="100" y1="92" x2="440" y2="92" stroke="${theme.primary}" stroke-width="4" stroke-linecap="round"/>
    
    <polygon points="270,92 250,135 290,135" fill="${theme.accent}"/>
    <rect x="210" y="137" width="120" height="20" rx="4" fill="${theme.primary}"/>
    <text x="270" y="151" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">${esc(pivotTitle)}</text>
    
    <rect x="70" y="52" width="120" height="38" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.6"/>
    <text x="130" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="${theme.text}">${esc(leftTitle)}</text>
    <line x1="130" y1="90" x2="130" y2="92" stroke="${theme.primary}" stroke-width="2"/>
    
    <rect x="350" y="52" width="120" height="38" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.6"/>
    <text x="410" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="${theme.accent}">${esc(rightTitle)}</text>
    <line x1="410" y1="90" x2="410" y2="92" stroke="${theme.accent}" stroke-width="2"/>
    
    <text x="270" y="170" text-anchor="middle" font-size="11" font-weight="600" fill="${theme.text}">💡 核心啟發：${esc(takeaway)}</text>
  </svg>`;
}

// 7. Ecosystem & Material Cycle Loops (Biology & Earth Science)
function generateCycleSvg(title, step1, step2, step3, step4, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="28" font-size="13" font-weight="700" fill="${theme.accent}">🔄 封閉系統循環與動態流向圖</text>
    <text x="516" y="28" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${theme.label}</text>
    
    <circle cx="270" cy="98" r="28" fill="${theme.primary}" fill-opacity="0.15" stroke="${theme.primary}" stroke-width="2"/>
    <text x="270" y="94" font-size="10" font-weight="700" fill="${theme.text}" text-anchor="middle">系統守恆</text>
    <text x="270" y="108" font-size="9" fill="${theme.accent}" text-anchor="middle">能量／物質</text>
    
    <rect x="210" y="40" width="120" height="26" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.5"/>
    <text x="270" y="57" font-size="11" font-weight="700" fill="${theme.text}" text-anchor="middle">① ${esc(step1)}</text>
    
    <rect x="375" y="86" width="125" height="26" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.5"/>
    <text x="437" y="103" font-size="11" font-weight="700" fill="${theme.accent}" text-anchor="middle">② ${esc(step2)}</text>
    
    <rect x="210" y="128" width="120" height="26" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.5"/>
    <text x="270" y="145" font-size="11" font-weight="700" fill="${theme.text}" text-anchor="middle">③ ${esc(step3)}</text>
    
    <rect x="40" y="86" width="125" height="26" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.5"/>
    <text x="102" y="103" font-size="11" font-weight="700" fill="${theme.accent}" text-anchor="middle">④ ${esc(step4)}</text>
    
    <path d="M 335 53 C 365 62, 385 70, 395 82" fill="none" stroke="${theme.primary}" stroke-width="2" stroke-linecap="round"/>
    <path d="M 437 114 C 430 130, 380 138, 335 140" fill="none" stroke="${theme.accent}" stroke-width="2" stroke-linecap="round"/>
    <path d="M 205 140 C 165 138, 120 130, 110 114" fill="none" stroke="${theme.primary}" stroke-width="2" stroke-linecap="round"/>
    <path d="M 102 84 C 115 70, 155 60, 205 53" fill="none" stroke="${theme.accent}" stroke-width="2" stroke-linecap="round"/>
    
    <text x="270" y="170" text-anchor="middle" font-size="10.5" font-weight="600" fill="${theme.text}">💡 核心規律：各環節相互轉換且守恆，任一環節受阻將引發連鎖失衡</text>
  </svg>`;
}

// 8. Language Syntax & Rhetorical Tree (Chinese & English)
function generateSyntaxTreeSvg(title, mainWord, partS, partV, partO, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="28" font-size="13" font-weight="700" fill="${theme.accent}">🌳 語意結構與層次樹狀圖</text>
    <text x="516" y="28" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${theme.label}</text>
    
    <rect x="205" y="42" width="130" height="30" rx="6" fill="${theme.primary}"/>
    <text x="270" y="62" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">${esc(mainWord)}</text>
    
    <path d="M 270 72 L 100 102" stroke="${theme.primary}" stroke-width="2"/>
    <path d="M 270 72 L 270 102" stroke="${theme.primary}" stroke-width="2"/>
    <path d="M 270 72 L 440 102" stroke="${theme.primary}" stroke-width="2"/>
    
    <rect x="35" y="104" width="130" height="42" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.5"/>
    <text x="100" y="122" font-size="11" font-weight="700" fill="${theme.accent}" text-anchor="middle">主幹／主詞 [S]</text>
    <text x="100" y="138" font-size="10.5" fill="${theme.text}" text-anchor="middle">${esc(partS)}</text>
    
    <rect x="205" y="104" width="130" height="42" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.8"/>
    <text x="270" y="122" font-size="11" font-weight="700" fill="${theme.primary}" text-anchor="middle">動詞／述語 [V]</text>
    <text x="270" y="138" font-size="10.5" fill="${theme.accent}" text-anchor="middle">${esc(partV)}</text>
    
    <rect x="375" y="104" width="130" height="42" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.5"/>
    <text x="440" y="122" font-size="11" font-weight="700" fill="${theme.accent}" text-anchor="middle">受詞／補語 [O/C]</text>
    <text x="440" y="138" font-size="10.5" fill="${theme.text}" text-anchor="middle">${esc(partO)}</text>
    
    <text x="270" y="168" text-anchor="middle" font-size="10.5" font-weight="600" fill="${theme.text}">💡 句意解碼：抓住核心述語與修飾限制，分清主從關係不被長句誤導</text>
  </svg>`;
}

// 9. Computational Logic & Algorithmic Decision Tree (Tech & Computing)
function generateLogicDecisionSvg(title, inputLabel, condLabel, trueBranch, falseBranch, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="28" font-size="13" font-weight="700" fill="${theme.accent}">⌘ 運算邏輯與演算法決策樹</text>
    <text x="516" y="28" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${theme.label}</text>
    
    <rect x="30" y="74" width="90" height="32" rx="16" fill="${theme.primary}"/>
    <text x="75" y="94" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">${esc(inputLabel)}</text>
    
    <path d="M 120 90 L 160 90" stroke="${theme.primary}" stroke-width="2"/>
    <polygon points="165,90 157,86 157,94" fill="${theme.primary}"/>
    
    <polygon points="230,55 295,90 230,125 165,90" fill="#ffffff" stroke="${theme.accent}" stroke-width="2"/>
    <text x="230" y="93" font-size="10.5" font-weight="700" fill="${theme.accent}" text-anchor="middle">${esc(condLabel)}</text>
    
    <path d="M 230 55 L 230 46 L 360 46" stroke="#16a34a" stroke-width="2"/>
    <polygon points="365,46 357,42 357,50" fill="#16a34a"/>
    <text x="250" y="40" font-size="9.5" font-weight="800" fill="#16a34a">TRUE (成立)</text>
    
    <rect x="365" y="32" width="145" height="28" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
    <text x="437" y="50" font-size="10.5" font-weight="700" fill="#15803d" text-anchor="middle">${esc(trueBranch)}</text>
    
    <path d="M 230 125 L 230 134 L 360 134" stroke="#dc2626" stroke-width="2"/>
    <polygon points="365,134 357,130 357,138" fill="#dc2626"/>
    <text x="250" y="148" font-size="9.5" font-weight="800" fill="#dc2626">FALSE (不成立)</text>
    
    <rect x="365" y="120" width="145" height="28" rx="6" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
    <text x="437" y="138" font-size="10.5" font-weight="700" fill="#b91c1c" text-anchor="middle">${esc(falseBranch)}</text>
    
    <text x="270" y="170" text-anchor="middle" font-size="10.5" font-weight="600" fill="${theme.text}">💡 運算思維：條件明確、邏輯窮盡、無二義性，方能保證演算法正確終止</text>
  </svg>`;
}

// 10. Molecular Reaction & Chemical Stoichiometry (Chemistry)
function generateMolecularReactionSvg(title, reactants, mechanism, products, principle, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="28" font-size="13" font-weight="700" fill="${theme.accent}">🧪 微觀原子重組與質量守恆圖</text>
    <text x="516" y="28" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${theme.label}</text>
    
    <!-- Reactants -->
    <rect x="30" y="48" width="140" height="85" rx="8" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.6"/>
    <rect x="30" y="48" width="140" height="24" rx="8" fill="${theme.primary}"/>
    <text x="100" y="65" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">反應物 (鍵結斷裂)</text>
    <circle cx="65" cy="95" r="14" fill="${theme.primary}" fill-opacity="0.2" stroke="${theme.primary}" stroke-width="2"/>
    <circle cx="100" cy="95" r="14" fill="${theme.accent}" fill-opacity="0.2" stroke="${theme.accent}" stroke-width="2"/>
    <circle cx="135" cy="95" r="14" fill="${theme.primary}" fill-opacity="0.2" stroke="${theme.primary}" stroke-width="2"/>
    <text x="100" y="124" text-anchor="middle" font-size="11" font-weight="700" fill="${theme.text}">${esc(reactants)}</text>
    
    <!-- Reaction Arrow & Mechanism -->
    <path d="M 180 90 L 225 90" stroke="${theme.accent}" stroke-width="2.5"/>
    <polygon points="230,90 220,85 220,95" fill="${theme.accent}"/>
    <rect x="180" y="60" width="55" height="20" rx="4" fill="${theme.accent}" fill-opacity="0.15"/>
    <text x="207" y="74" text-anchor="middle" font-size="9.5" font-weight="700" fill="${theme.accent}">活化能</text>
    
    <!-- Intermediate / Mechanism Card -->
    <rect x="240" y="48" width="105" height="85" rx="8" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.6" stroke-dasharray="3,2"/>
    <text x="292" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="${theme.accent}">碰撞重組</text>
    <foreignObject x="246" y="80" width="93" height="48">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:10px;line-height:1.25;color:#475569;text-align:center;">
        ${esc(mechanism)}
      </div>
    </foreignObject>
    
    <path d="M 355 90 L 390 90" stroke="${theme.primary}" stroke-width="2.5"/>
    <polygon points="395,90 385,85 385,95" fill="${theme.primary}"/>
    
    <!-- Products -->
    <rect x="400" y="48" width="115" height="85" rx="8" fill="#ffffff" stroke="${theme.primary}" stroke-width="2"/>
    <rect x="400" y="48" width="115" height="24" rx="8" fill="${theme.primary}"/>
    <text x="457" y="65" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">生成物 (新鍵形成)</text>
    <circle cx="435" cy="95" r="14" fill="${theme.primary}" stroke="${theme.primary}" stroke-width="2"/>
    <circle cx="475" cy="95" r="14" fill="${theme.accent}" stroke="${theme.accent}" stroke-width="2"/>
    <text x="457" y="124" text-anchor="middle" font-size="11" font-weight="700" fill="${theme.text}">${esc(products)}</text>
    
    <text x="270" y="168" text-anchor="middle" font-size="10.5" font-weight="600" fill="${theme.text}">💡 微觀定律：${esc(principle)}（原子種類與數目守恆，分子種類改變）</text>
  </svg>`;
}

// 11. Historical Causality & Spatio-Temporal Line (History)
function generateHistoricalCausalitySvg(title, bgContext, trigger, change, impact, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="28" font-size="13" font-weight="700" fill="${theme.accent}">🏛️ 歷史時空脈絡與因果鏈條圖</text>
    <text x="516" y="28" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${theme.label}</text>
    
    <!-- Timeline spine -->
    <line x1="40" y1="92" x2="500" y2="92" stroke="${theme.primary}" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Step 1: Background -->
    <g transform="translate(30, 44)">
      <rect width="105" height="96" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.4"/>
      <rect width="105" height="22" rx="6" fill="${theme.primary}"/>
      <text x="52" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">① 時代背景</text>
      <foreignObject x="8" y="28" width="89" height="60">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:10px;line-height:1.3;color:#334155;overflow:hidden;">
          ${esc(bgContext)}
        </div>
      </foreignObject>
    </g>
    
    <!-- Step 2: Trigger -->
    <g transform="translate(155, 44)">
      <rect width="105" height="96" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.6"/>
      <rect width="105" height="22" rx="6" fill="${theme.accent}"/>
      <text x="52" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">② 關鍵轉折</text>
      <foreignObject x="8" y="28" width="89" height="60">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:10px;line-height:1.3;color:#334155;overflow:hidden;">
          ${esc(trigger)}
        </div>
      </foreignObject>
    </g>
    
    <!-- Step 3: Reform / Change -->
    <g transform="translate(280, 44)">
      <rect width="105" height="96" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.6"/>
      <rect width="105" height="22" rx="6" fill="${theme.primary}"/>
      <text x="52" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">③ 體制變革</text>
      <foreignObject x="8" y="28" width="89" height="60">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:10px;line-height:1.3;color:#334155;overflow:hidden;">
          ${esc(change)}
        </div>
      </foreignObject>
    </g>
    
    <!-- Step 4: Long-term Impact -->
    <g transform="translate(405, 44)">
      <rect width="105" height="96" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.8"/>
      <rect width="105" height="22" rx="6" fill="${theme.accent}"/>
      <text x="52" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">④ 深遠影響</text>
      <foreignObject x="8" y="28" width="89" height="60">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:10px;line-height:1.3;color:#334155;overflow:hidden;">
          ${esc(impact)}
        </div>
      </foreignObject>
    </g>
    
    <text x="270" y="168" text-anchor="middle" font-size="10.5" font-weight="600" fill="${theme.text}">💡 史事思維：歷史非孤立條目，必考因果脈絡與不同群體之利益變遷</text>
  </svg>`;
}

// 12. Legal Hierarchy & Separation of Powers (Civics)
function generateLegalPyramidSvg(title, topLaw, midLaw, lowLaw, balanceCheck, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" class="kp-svg-infograph" role="img" aria-label="${esc(title)}">
    <rect width="540" height="180" rx="12" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.25"/>
    <text x="24" y="28" font-size="13" font-weight="700" fill="${theme.accent}">⚖️ 法律位階金字塔與權力制衡圖</text>
    <text x="516" y="28" text-anchor="end" font-size="11" fill="${theme.primary}" font-weight="600">${theme.icon} ${theme.label}</text>
    
    <!-- Pyramid Structure -->
    <!-- Tier 1: Constitution -->
    <polygon points="140,42 80,78 200,78" fill="${theme.primary}" stroke="#ffffff" stroke-width="1.5"/>
    <text x="140" y="65" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">憲法 (最高)</text>
    
    <!-- Tier 2: Statutes / Laws -->
    <polygon points="76,82 196,82 230,114 42,114" fill="${theme.accent}" stroke="#ffffff" stroke-width="1.5"/>
    <text x="140" y="102" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">法律 (立法院)</text>
    
    <!-- Tier 3: Orders / Regulations -->
    <polygon points="38,118 226,118 250,148 14,148" fill="${theme.primary}" fill-opacity="0.85" stroke="#ffffff" stroke-width="1.5"/>
    <text x="132" y="138" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">命令 (行政機關)</text>
    
    <!-- Right side: Content & Principle Breakdown -->
    <g transform="translate(265, 42)">
      <rect width="250" height="32" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.4"/>
      <text x="12" y="21" font-size="10.5" font-weight="700" fill="${theme.accent}">憲法內涵：</text>
      <text x="75" y="21" font-size="10.5" font-weight="600" fill="${theme.text}">${esc(topLaw)}</text>
      
      <rect y="40" width="250" height="32" rx="6" fill="#ffffff" stroke="${theme.accent}" stroke-width="1.4"/>
      <text x="12" y="61" font-size="10.5" font-weight="700" fill="${theme.primary}">法律授權：</text>
      <text x="75" y="61" font-size="10.5" font-weight="600" fill="${theme.text}">${esc(midLaw)}</text>
      
      <rect y="78" width="250" height="32" rx="6" fill="#ffffff" stroke="${theme.primary}" stroke-width="1.4"/>
      <text x="12" y="99" font-size="10.5" font-weight="700" fill="${theme.accent}">命令執行：</text>
      <text x="75" y="99" font-size="10.5" font-weight="600" fill="${theme.text}">${esc(lowLaw)}</text>
    </g>
    
    <text x="270" y="170" text-anchor="middle" font-size="10.5" font-weight="600" fill="${theme.text}">💡 憲政原則：${esc(balanceCheck)}（下位階不得牴觸上位階；牴觸者無效）</text>
  </svg>`;
}

// Generate Knowledge Points for a Single Unit with Tailored SVG & Synapses
export function buildExplicitKnowledgeForUnit(u) {
  const table = teachingTables[u.id] || { rows: [] };
  const ex = exegesisData[u.id] || { definitions: [], blackboard: { heuristicSteps: [] }, examEye: {} };
  const dep = lessonDeepening[u.id] || { leftLabel: '概念 A', left: u.concept, rightLabel: '概念 B', right: u.pitfall };
  const worked = workedCases[u.id] || { steps: ['審題', '推導', '檢核'] };
  const theme = subjectThemes[u.subject] || subjectThemes.math;
  const knNode = getKnowledgeNode(u.id);

  const r0 = table.rows[0] || ['核心判準', u.concept, u.example];
  const r1 = table.rows[1] || ['條件推演', u.concept, u.example];
  const r2 = table.rows[2] || ['避坑防線', u.pitfall, u.task];

  const def0 = ex.definitions && ex.definitions[0] ? ex.definitions[0] : { term: r0[0], meaning: r0[1], condition: r0[2] };
  const def1 = ex.definitions && ex.definitions[1] ? ex.definitions[1] : { term: r1[0], meaning: r1[1], condition: r1[2] };
  const def2 = ex.definitions && ex.definitions[2] ? ex.definitions[2] : { term: r2[0], meaning: r2[1], condition: r2[2] };

  // Core definitions
  const core0 = `${r0[0]}之核心本質：${r0[1]}。`;
  const core1 = `${r1[0]}之判別準則：${r1[1]}。`;
  const core2 = `${r2[0]}之避坑界線：${r2[1]}。`;

  // Cross links resolution
  const crossLinks = knNode.crossLinks || [];
  const c0 = crossLinks[0] || { unitId: null, badge: '跨科素養', reason: '跨領域素養思維與生活實踐連結' };
  const c1 = crossLinks[1] || crossLinks[0] || { unitId: null, badge: '整合分析', reason: '統整學科核心規律與圖表判讀' };
  const c2 = crossLinks[2] || crossLinks[0] || { unitId: null, badge: '大考遷移', reason: '面對跨情境素養題時之綜合破題策略' };

  const subjectUnits = units.filter(x => x.subject === u.subject);
  const currIdx = subjectUnits.findIndex(x => x.id === u.id);
  const prevU = currIdx > 0 ? subjectUnits[currIdx - 1] : null;
  const nextU = currIdx < subjectUnits.length - 1 ? subjectUnits[currIdx + 1] : null;
  const prereqFromKn = (knNode.prerequisites || []).map(id => unitById[id]).filter(Boolean)[0];

  // Tailored SVG 1 generator based on subject domain & topic
  let svg1 = '';
  let kp1InfographType = 'domain-visual';

  if (u.subject === 'math') {
    if (u.title.includes('函數') || u.title.includes('二次') || u.title.includes('幾何') || u.title.includes('面積')) {
      svg1 = generateParabolaGeometrySvg(r0[0], '(h, k)', 'y＝a(x−h)²＋k', '對稱軸 x＝h；a＞0 向上', 'b²−4ac 判別相交', theme);
      kp1InfographType = 'parabola';
    } else {
      svg1 = generateCoordinateSvg(r0[0], r0[0], r0[1].slice(0, 10), '對稱基準', '0', theme);
      kp1InfographType = 'coordinate';
    }
  } else if (u.subject === 'chemistry') {
    svg1 = generateMolecularReactionSvg(r0[0], r0[0].slice(0, 8), '原子重排', r0[1].slice(0, 8), '質量守恆定律', theme);
    kp1InfographType = 'molecular';
  } else if (u.subject === 'history') {
    svg1 = generateHistoricalCausalitySvg(r0[0], r0[0].slice(0, 16), '制度矛盾爆發', r0[1].slice(0, 16), '現代法治奠基', theme);
    kp1InfographType = 'causality';
  } else if (u.subject === 'civics') {
    svg1 = generateLegalPyramidSvg(r0[0], '保障人民基本權利', r0[0].slice(0, 10), '執行細則與行政規章', '權力分立與違憲審查', theme);
    kp1InfographType = 'legal';
  } else if (['biology', 'earth'].includes(u.subject)) {
    svg1 = generateCycleSvg(r0[0], r0[0].slice(0, 8), r1[0].slice(0, 8), r2[0].slice(0, 8), '環境守恆', theme);
    kp1InfographType = 'cycle';
  } else if (['chinese', 'english', 'local'].includes(u.subject)) {
    svg1 = generateSyntaxTreeSvg(r0[0], u.title.slice(0, 6), r0[0].slice(0, 6), r0[1].slice(0, 6), r0[2].slice(0, 6), theme);
    kp1InfographType = 'syntax';
  } else if (['computing', 'technology'].includes(u.subject)) {
    svg1 = generateLogicDecisionSvg(r0[0], '輸入條件', r0[0].slice(0, 8), r0[1].slice(0, 8), '回退修正', theme);
    kp1InfographType = 'logic';
  } else {
    svg1 = generateFormulaSvg(r0[0], r0[0], r0[0], r0[1].slice(0, 14), r0[2].slice(0, 12), theme);
    kp1InfographType = 'formula';
  }

  // Deep Epistemic Explanations (150~300 characters each)
  const explanation1 = `本知識點著眼於「${r0[0]}」之本質定義與深層機轉。依據 108 課綱核心素養，${def0.meaning}。其底層運作在於建立概念的第一原理（First Principle），當且僅當滿足關鍵條件「${def0.condition}」時成立。日常直觀現象（例如：${u.example}）正反映此一規律之客觀必然性。理解此點時切忌盲目套公式，而應先建立其空間幾何、能量守恆或語法層次的具象模型。`;

  const explanation2 = `本知識點強調「${r1[0]}」的推演流程與判別邊界。解題標準流程分為三階閉環：首先審題定位題目給定之已知量與定義域範圍；其次精準調用定理「${r1[1]}」建立等價關聯式；最後代入實例（例如：${r1[2]}）驗算正負號與邊界極限。${def1.meaning}。唯有步驟完整且保留算式與單位，方能在素養導向大考中穩健破題而不失分。`;

  const explanation3 = `會考與學測命題最常藉由相近觀念或逆命題設置認知干擾選項。針對「${r2[0]}」，必須明確區分「${dep.leftLabel}」與「${dep.rightLabel}」兩者的本質分野。${u.pitfall}。診斷其錯因病理，常源於忽略了成立前提或將充分條件誤當充要條件。破題防線在於：遇題先確認是否滿足限制邊界，並透過遷移任務（${u.task}）進行主動逆向檢核。`;

  const kp1 = {
    id: `${u.id}-kp-1`,
    unitId: u.id,
    order: 1,
    title: `【知識點 1】${r0[0]}：核心意義與原理機轉`,
    core: core0,
    mechanism: `底層機轉：依據 108 課綱定義，${def0.meaning}。在客觀條件「${def0.condition}」成立下，確保結論之必然性。`,
    explanation: explanation1,
    formula: `【實戰法則】${r0[1]} ➔ 檢驗條件：${r0[2]}`,
    examIntel: `【🎯 會考／學測出題雷達】考點定位：概念題眼為「${ex.examEye?.triggerClue || '審題核心關鍵字'}」。命題高頻題型：定義辨識題與圖表分析題。`,
    practicalTip: `考場避坑防線：${ex.examEye?.pitfallTrap || u.pitfall}`,
    bloom: '理解',
    examWeight: 3,
    infograph: {
      type: kp1InfographType,
      title: `${r0[0]} 結構概念圖解`,
      caption: `直觀解析 ${r0[0]} 之核心關係、成立條件與深層機轉`,
      svg: svg1
    },
    relatedKnowledge: {
      prerequisite: {
        title: prereqFromKn ? prereqFromKn.title : (prevU ? prevU.title : '國小經驗與直覺先備'),
        unitId: prereqFromKn ? prereqFromKn.id : (prevU ? prevU.id : null),
        icon: '🔗',
        desc: prereqFromKn ? `掌握「${prereqFromKn.title}」之基礎定義，本點方能順利奠基。` : `以直觀生活經驗為起點，建立「${r0[0]}」之核心概念。`
      },
      extension: {
        title: nextU ? nextU.title : '進階綜合應用',
        unitId: nextU ? nextU.id : null,
        icon: '🚀',
        desc: nextU ? `「${r0[0]}」將直接作為「${nextU.title}」之推演核心前提。` : '本點為該領域之集大成概念，廣泛應用於複雜情境。'
      },
      crossDisciplinary: {
        title: c0.targetUnit ? c0.targetUnit.title : c0.badge,
        unitId: c0.unitId,
        badge: c0.badge,
        icon: '🌐',
        desc: c0.reason
      },
      synapseNote: `【概念連結心法】${c0.badge}與本點「${r0[0]}」概念相通；題幹若出現跨領域情境，可直接調用「${r0[1]}」之思考模型。`
    }
  };

  const kp2 = {
    id: `${u.id}-kp-2`,
    unitId: u.id,
    order: 2,
    title: `【知識點 2】${r1[0]}：條件判別與推理步驟`,
    core: core1,
    mechanism: `推導機制：由已知條件出發，套用「${r1[1]}」，依序完成定位、推導與單位邊界檢核。`,
    explanation: explanation2,
    formula: `【推導公式／口訣】${r1[1]} ➔ 典型示範：${r1[2]}`,
    examIntel: `【🎯 會考／學測出題雷達】解題手筋：${ex.blackboard?.heuristicSteps?.[0]?.explanation || '依序標註已知條件與未知數，畫圖輔助思考'}。高頻題型：計算應用與實驗推理題。`,
    practicalTip: `步驟防呆：${ex.blackboard?.heuristicSteps?.[1]?.explanation || '按部就班列出推演算式，確認符號與單位'}。`,
    bloom: '應用',
    examWeight: 3,
    infograph: {
      type: 'process',
      title: `${r1[0]} 推演步驟流程圖`,
      caption: `3 階段解題思考路徑與檢驗策略`,
      svg: generateProcessSvg(
        r1[0],
        worked.steps?.[0] || '審題定位條件',
        worked.steps?.[1] || '套用核心定理',
        worked.steps?.[2] || '檢核單位邊界',
        theme
      )
    },
    relatedKnowledge: {
      prerequisite: {
        title: `${r0[0]}之第一定義`,
        unitId: u.id,
        icon: '🔗',
        desc: `先確認「${r0[0]}」之成立條件，方能順利執行本點「${r1[0]}」的推導演算。`
      },
      extension: {
        title: `${r2[0]}之邊界防護`,
        unitId: u.id,
        icon: '🚀',
        desc: `熟練「${r1[0]}」後，必須立即檢驗「${r2[0]}」之限制條件與考場盲區。`
      },
      crossDisciplinary: {
        title: c1.targetUnit ? c1.targetUnit.title : c1.badge,
        unitId: c1.unitId,
        badge: c1.badge,
        icon: '🌐',
        desc: c1.reason
      },
      synapseNote: `【步驟推演心法】${c1.badge}中的分析流程與本點「${r1[0]}」完全一致；審題務必依序定位已知量、套用規則並保留算式與單位。`
    }
  };

  const kp3 = {
    id: `${u.id}-kp-3`,
    unitId: u.id,
    order: 3,
    title: `【知識點 3】${r2[0]}：易混淆辨析與避坑防線`,
    core: core2,
    mechanism: `防呆機制：並列對比「${dep.leftLabel}」與「${dep.rightLabel}」之邊界約束，杜絕以假亂真或偷換概念。`,
    explanation: explanation3,
    formula: `【辨析對照】${dep.leftLabel} vs ${dep.rightLabel} ➔ 適用防線：${r2[2]}`,
    examIntel: `【🎯 會考／學測出題雷達】陷阱識破：命題常在題幹中故意隱藏干擾條件；破解關鍵在於檢核「${dep.leftLabel}」的特有邊界。`,
    practicalTip: `考場急救手記：${ex.examEye?.defenseCheck || '做完題目務必重檢適用邊界與特殊反例'}。`,
    bloom: '分析',
    examWeight: 2,
    infograph: {
      type: 'contrast',
      title: `${dep.leftLabel} 與 ${dep.rightLabel} 雙軌對照圖`,
      caption: `精準辨析易混淆點，掌握解題分水嶺與避坑邊界`,
      svg: generateContrastSvg(
        r2[0],
        dep.leftLabel,
        dep.left.slice(0, 48),
        dep.rightLabel,
        dep.right.slice(0, 48),
        theme
      )
    },
    relatedKnowledge: {
      prerequisite: {
        title: `${dep.leftLabel} 與 ${dep.rightLabel}`,
        unitId: u.id,
        icon: '⚖️',
        desc: `並排對照：明確區分「${dep.leftLabel}」與「${dep.rightLabel}」的本質差異。`
      },
      extension: {
        title: knNode.senior ? knNode.senior.split('：')[0] : '高中升學銜接素養',
        unitId: null,
        icon: '🎓',
        desc: `本點避坑與遷移思維，將無縫銜接至「${knNode.senior || '高中延伸素養'}」之深度探究。`
      },
      crossDisciplinary: {
        title: c2.targetUnit ? c2.targetUnit.title : c2.badge,
        unitId: c2.unitId,
        badge: c2.badge,
        icon: '🌐',
        desc: c2.reason
      },
      synapseNote: `【大考避坑心法】會考與大考極常將「${dep.leftLabel}」與「${dep.rightLabel}」包裝在情境題中；解題切入點是先抓出關鍵限制條件再行作答！`
    }
  };

  return [kp1, kp2, kp3];
}

// Build the complete database for all 188 units
console.log('Building v19 explicit knowledge points with 12 specialized SVG engines & UIUX enhancements for all 188 units...');
const allExplicitKnowledge = {};
let totalPoints = 0;
let totalSvgs = 0;
let totalRelated = 0;

for (const u of units) {
  const points = buildExplicitKnowledgeForUnit(u);
  allExplicitKnowledge[u.id] = points;
  totalPoints += points.length;
  totalSvgs += points.filter(p => p.infograph && p.infograph.svg).length;
  totalRelated += points.filter(p => p.relatedKnowledge).length;
}

console.log(`Generated ${totalPoints} explicit knowledge points with ${totalSvgs} SVG infographs and ${totalRelated} connected knowledge links across ${units.length} units.`);

// Write out dist/explicit-knowledge-points.js
const fileContent = `// 108 Curriculum Explicit Knowledge Points & Infographics Database
// Auto-generated by scripts/build-explicit-knowledge.mjs
// Version: zhixing-cache-v19

export const explicitKnowledgePoints = ${JSON.stringify(allExplicitKnowledge, null, 2)};

export function getExplicitKnowledgePoints(u) {
  if (!u || !u.id) return [];
  return explicitKnowledgePoints[u.id] || [];
}

const esc = s => String(s).replace(/[&<>'"]/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
}[c]));

// Renders the modern UI/UX Explicit Knowledge Points Board with Stepper Nav, Blindfold Recall & Infographics
export function renderExplicitKnowledgePoints(u) {
  const points = getExplicitKnowledgePoints(u);
  if (!points || points.length === 0) return '';

  return \`
    <div class="explicit-knowledge-container" aria-label="\${esc(u.title)} 明確知識點、圖解與相關知識網絡">
      <div class="kp-container-header">
        <div class="kp-header-title-row">
          <span class="kp-main-badge"><span aria-hidden="true">💡</span> 108課綱明確知識點深度解析</span>
          <span class="kp-count-badge">共 \${points.length} 個核心點 · 均配備專屬 INFOGRAPH 與相關知識點網絡</span>
        </div>
        <p class="kp-header-subtitle">每個知識點均包含<strong>明確說明</strong>、<strong>深層機轉</strong>、<strong>實戰法則／公式</strong>、<strong>大考題型雷達</strong>、<strong>考場避坑防線</strong>、<strong>專屬資訊圖表（INFOGRAPH）</strong>與<strong>立體思維網絡</strong>，全面深化自學成效。</p>
        
        <!-- Cognitive Stepper Navigation Bar -->
        <nav class="kp-stepper-nav" aria-label="三階認知階梯導航">
          <div class="kp-stepper-title"><span aria-hidden="true">🪜</span> 認知階梯導航：</div>
          <div class="kp-stepper-track">
            \${points.map((p, idx) => \`
              <button type="button" class="kp-step-chip" data-step-target="\${p.id}">
                <span class="step-num">\${p.order}</span>
                <span class="step-text">\${idx === 0 ? '🎯 核心本質' : (idx === 1 ? '⚡ 定理推演' : '🛡️ 考場避坑')}</span>
                <span class="step-status" data-step-kp="\${p.id}">🌱</span>
              </button>
              \${idx < points.length - 1 ? '<span class="step-arrow" aria-hidden="true">➔</span>' : ''}
            \`).join('')}
          </div>
        </nav>

        <!-- Interactive Knowledge Filter Toolbar -->
        <div class="kp-filter-toolbar" role="group" aria-label="知識點認知視角快速篩選">
          <span class="kp-filter-title"><span aria-hidden="true">🔍</span> 認知切入視角：</span>
          <button type="button" class="kp-filter-pill active" data-kp-filter="all">全部展示 (3)</button>
          <button type="button" class="kp-filter-pill" data-kp-filter="core">🎯 核心定義 (KP#1)</button>
          <button type="button" class="kp-filter-pill" data-kp-filter="process">⚡ 推演步驟 (KP#2)</button>
          <button type="button" class="kp-filter-pill" data-kp-filter="pitfall">🛡️ 考場避坑 (KP#3)</button>
          <button type="button" class="kp-filter-pill" data-kp-filter="unmastered">🌱 尚未掌握</button>
        </div>
      </div>

      <div class="kp-cards-grid" role="list">
        \${points.map((p, idx) => \`
          <article class="kp-card" role="listitem" id="\${p.id}" data-kp-order="\${p.order}">
            <header class="kp-card-header">
              <div class="kp-badge-row">
                <span class="kp-order-pill"><span class="pill-icon" aria-hidden="true">\${idx === 0 ? '🎯' : (idx === 1 ? '⚡' : '🛡️')}</span> KP #\${p.order}</span>
                <span class="kp-bloom-pill bloom-\${p.bloom}"><span class="pill-icon" aria-hidden="true">🧠</span> 認知層次：\${p.bloom}</span>
                <span class="kp-weight-pill"><span class="pill-icon" aria-hidden="true">📊</span> 大考權重：\${'⭐'.repeat(p.examWeight)}</span>
                
                <div class="kp-card-actions">
                  <button type="button" class="kp-blindfold-btn" data-blindfold-target="\${p.id}" title="遮蔽解析與公式進行自主回想測試" aria-label="切換遮蔽自主回想模式">🙈 遮蔽回想</button>
                  <button type="button" class="kp-copy-card-btn" data-kp-id="\${p.id}" title="複製此知識點為 Markdown 筆記" aria-label="複製知識點筆記">📋 複製筆記</button>
                </div>
              </div>
              <h4 class="kp-title">\${esc(p.title)}</h4>
            </header>

            <div class="kp-body">
              <section class="kp-core-box">
                <span class="kp-label"><span class="section-icon" aria-hidden="true">📌</span> 核心本質定義（第一原理）：</span>
                <p class="kp-core-text">\${esc(p.core)}</p>
              </section>

              <section class="kp-explanation-box">
                <span class="kp-label"><span class="section-icon" aria-hidden="true">📖</span> 明確說明與深層機轉：</span>
                <p class="kp-explanation-text">\${esc(p.explanation)}</p>
              </section>

              <!-- Infograph Component -->
              <figure class="kp-infograph-frame">
                <figcaption class="kp-infograph-caption">
                  <div class="infograph-title-group">
                    <span class="infograph-icon">📊</span>
                    <strong>\${esc(p.infograph.title)}</strong>
                    <span class="infograph-sub">\${esc(p.infograph.caption)}</span>
                  </div>
                  <button type="button" class="kp-zoom-btn" data-zoom-target="\${p.id}" title="點擊放大檢視圖解" aria-label="放大檢視 \${esc(p.infograph.title)}">🔍 點擊放大檢視</button>
                </figcaption>
                <div class="kp-svg-wrapper">
                  \${p.infograph.svg}
                </div>
              </figure>

              <section class="kp-formula-box">
                <span class="kp-label"><span class="section-icon" aria-hidden="true">⚡</span> 實戰法則與公式：</span>
                <p class="kp-formula-text"><code>\${esc(p.formula)}</code></p>
              </section>

              <!-- Exam Intel Radar -->
              <section class="kp-exam-intel-box">
                <span class="kp-label"><span class="section-icon" aria-hidden="true">🎯</span> 會考／學測出題雷達與題眼：</span>
                <p class="kp-exam-intel-text">\${esc(p.examIntel)}</p>
              </section>

              <section class="kp-tip-box">
                <span class="kp-label"><span class="section-icon" aria-hidden="true">🛡️</span> 考場避坑與解題切入：</span>
                <p class="kp-tip-text">\${esc(p.practicalTip)}</p>
              </section>

              <!-- Related Knowledge Points Section -->
              \${p.relatedKnowledge ? \`
                <section class="kp-related-box" aria-label="相關知識點與跨領域神經網絡">
                  <div class="kp-related-header">
                    <div class="kp-related-title-wrap">
                      <span class="related-header-icon" aria-hidden="true">🌐</span>
                      <h5 class="related-header-title">相關知識點與思維網絡</h5>
                    </div>
                    <span class="related-header-sub">前後貫通 · 跨科遷移</span>
                  </div>

                  <div class="kp-related-grid" role="list">
                    <!-- Prerequisite Pill -->
                    <div class="kp-related-card prereq-card" role="listitem">
                      <div class="related-tag-row">
                        <span class="related-tag-icon" aria-hidden="true">\${p.relatedKnowledge.prerequisite.icon}</span>
                        <span class="related-tag-label">先備知識點</span>
                      </div>
                      <div class="related-card-title">
                        \${p.relatedKnowledge.prerequisite.unitId ? \`<a href="#/lesson/\${p.relatedKnowledge.prerequisite.unitId}" class="related-card-link"><strong>\${esc(p.relatedKnowledge.prerequisite.title)}</strong> <span class="ext-arrow" aria-hidden="true">↗</span></a>\` : \`<strong>\${esc(p.relatedKnowledge.prerequisite.title)}</strong>\`}
                      </div>
                      <p class="related-card-desc">\${esc(p.relatedKnowledge.prerequisite.desc)}</p>
                    </div>

                    <!-- Extension Pill -->
                    <div class="kp-related-card ext-card" role="listitem">
                      <div class="related-tag-row">
                        <span class="related-tag-icon" aria-hidden="true">\${p.relatedKnowledge.extension.icon}</span>
                        <span class="related-tag-label">延伸知識點</span>
                      </div>
                      <div class="related-card-title">
                        \${p.relatedKnowledge.extension.unitId ? \`<a href="#/lesson/\${p.relatedKnowledge.extension.unitId}" class="related-card-link"><strong>\${esc(p.relatedKnowledge.extension.title)}</strong> <span class="ext-arrow" aria-hidden="true">↗</span></a>\` : \`<strong>\${esc(p.relatedKnowledge.extension.title)}</strong>\`}
                      </div>
                      <p class="related-card-desc">\${esc(p.relatedKnowledge.extension.desc)}</p>
                    </div>

                    <!-- Cross-domain Pill -->
                    <div class="kp-related-card cross-card" role="listitem">
                      <div class="related-tag-row">
                        <span class="related-tag-icon" aria-hidden="true">\${p.relatedKnowledge.crossDisciplinary.icon}</span>
                        <span class="related-tag-label">跨科關聯</span>
                        <span class="related-domain-badge">\${esc(p.relatedKnowledge.crossDisciplinary.badge)}</span>
                      </div>
                      <div class="related-card-title">
                        \${p.relatedKnowledge.crossDisciplinary.unitId ? \`<a href="#/lesson/\${p.relatedKnowledge.crossDisciplinary.unitId}" class="related-card-link"><strong>\${esc(p.relatedKnowledge.crossDisciplinary.title)}</strong> <span class="ext-arrow" aria-hidden="true">↗</span></a>\` : \`<strong>\${esc(p.relatedKnowledge.crossDisciplinary.title)}</strong>\`}
                      </div>
                      <p class="related-card-desc">\${esc(p.relatedKnowledge.crossDisciplinary.desc)}</p>
                    </div>
                  </div>

                  <!-- Synapse Transfer Note -->
                  <div class="kp-synapse-note">
                    <span class="synapse-note-icon" aria-hidden="true">💡</span>
                    <p class="synapse-note-text">\${esc(p.relatedKnowledge.synapseNote)}</p>
                  </div>
                </section>
              \` : ''}
            </div>

            <footer class="kp-footer">
              <label class="kp-mastery-label">
                <input type="checkbox" class="kp-mastery-checkbox" data-kp-id="\${p.id}">
                <span class="mastery-check-icon" aria-hidden="true">✅</span>
                <span>我已完全掌握此知識點、圖解與相關脈絡</span>
              </label>
            </footer>
          </article>
        \`).join('')}
      </div>
    </div>
  \`;
}
`;

fs.writeFileSync('dist/explicit-knowledge-points.js', fileContent, 'utf8');
console.log('Successfully wrote dist/explicit-knowledge-points.js with 12 specialized generators & UIUX enhancements!');
