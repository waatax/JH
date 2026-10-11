// dist/cap-scoring.js
// 國中教育會考官方等級標示與加權計分轉換引擎 (109~115 年官方標準)

export const CAP_GRADE_CONFIG = {
  'A++': { label: '精熟 A++', level: 'A', tag: 'A++', bg: '#e8f5e9', border: '#2e7d32', color: '#1b5e20', desc: '精熟頂標 · 表現最優異 (該科前 25%)' },
  'A+':  { label: '精熟 A+',  level: 'A', tag: 'A+',  bg: '#f1f8e9', border: '#558b2f', color: '#33691e', desc: '精熟高標 · 具備優秀素養 (該科前 26%~50%)' },
  'A':   { label: '精熟 A',   level: 'A', tag: 'A',   bg: '#f9fbe7', border: '#827717', color: '#827717', desc: '精熟門檻 · 精通國中各核心能力' },
  'B++': { label: '基礎 B++', level: 'B', tag: 'B++', bg: '#e3f2fd', border: '#1565c0', color: '#0d47a1', desc: '基礎頂標 · 基礎學力扎實 (基礎前 25%)' },
  'B+':  { label: '基礎 B+',  level: 'B', tag: 'B+',  bg: '#e1f5fe', border: '#0277bd', color: '#01579b', desc: '基礎高標 · 具備良好基礎 (基礎前 26%~50%)' },
  'B':   { label: '基礎 B',   level: 'B', tag: 'B',   bg: '#f5f5f5', border: '#616161', color: '#424242', desc: '基礎達標 · 具備國中階段基本學力' },
  'C':   { label: '待加強 C', level: 'C', tag: 'C',   bg: '#fff3e0', border: '#e65100', color: '#bf360c', desc: '待加強 · 建議加強單元核心概念理解' }
};

// 歷屆各科答對題數或加權分數切點標準 (109~115)
const CUTOFFS = {
  chinese: {
    // 48題 (109-110)
    48: [
      { grade: 'A++', min: 45 },
      { grade: 'A+',  min: 43 },
      { grade: 'A',   min: 40 },
      { grade: 'B++', min: 36 },
      { grade: 'B+',  min: 31 },
      { grade: 'B',   min: 20 },
      { grade: 'C',   min: 0  }
    ],
    // 42題 (111-115)
    42: [
      { grade: 'A++', min: 40 },
      { grade: 'A+',  min: 38 },
      { grade: 'A',   min: 36 },
      { grade: 'B++', min: 31 },
      { grade: 'B+',  min: 27 },
      { grade: 'B',   min: 18 },
      { grade: 'C',   min: 0  }
    ]
  },
  social: {
    // 63題 (109-110)
    63: [
      { grade: 'A++', min: 59 },
      { grade: 'A+',  min: 57 },
      { grade: 'A',   min: 54 },
      { grade: 'B++', min: 46 },
      { grade: 'B+',  min: 38 },
      { grade: 'B',   min: 24 },
      { grade: 'C',   min: 0  }
    ],
    // 54題 (111-115)
    54: [
      { grade: 'A++', min: 52 },
      { grade: 'A+',  min: 50 },
      { grade: 'A',   min: 47 },
      { grade: 'B++', min: 41 },
      { grade: 'B+',  min: 34 },
      { grade: 'B',   min: 22 },
      { grade: 'C',   min: 0  }
    ]
  },
  science: {
    // 54題 (109-110)
    54: [
      { grade: 'A++', min: 52 },
      { grade: 'A+',  min: 50 },
      { grade: 'A',   min: 47 },
      { grade: 'B++', min: 40 },
      { grade: 'B+',  min: 32 },
      { grade: 'B',   min: 19 },
      { grade: 'C',   min: 0  }
    ],
    // 50題 (111-115)
    50: [
      { grade: 'A++', min: 47 },
      { grade: 'A+',  min: 45 },
      { grade: 'A',   min: 42 },
      { grade: 'B++', min: 36 },
      { grade: 'B+',  min: 29 },
      { grade: 'B',   min: 19 },
      { grade: 'C',   min: 0  }
    ]
  },
  // 數學加權分數切點 (滿分 100)
  math: [
    { grade: 'A++', minScore: 93.5 },
    { grade: 'A+',  minScore: 87.5 },
    { grade: 'A',   minScore: 79.5 },
    { grade: 'B++', minScore: 68.5 },
    { grade: 'B+',  minScore: 58.5 },
    { grade: 'B',   minScore: 38.0 },
    { grade: 'C',   minScore: 0.0  }
  ],
  // 英語加權分數切點 (滿分 100)
  english: [
    { grade: 'A++', minScore: 96.0 },
    { grade: 'A+',  minScore: 92.5 },
    { grade: 'A',   minScore: 88.0 },
    { grade: 'B++', minScore: 78.5 },
    { grade: 'B+',  minScore: 66.5 },
    { grade: 'B',   minScore: 38.0 },
    { grade: 'C',   minScore: 0.0  }
  ]
};

/**
 * 計算會考成績三等級四標示
 * @param {Object} options
 * @param {number} options.year - 會考年度 (如 115)
 * @param {string} options.subject - 考科 ('chinese'|'english'|'listening'|'math'|'social'|'science')
 * @param {number} options.choiceCorrect - 選擇題答對題數
 * @param {number} options.choiceTotal - 選擇題總題數
 * @param {number} [options.writtenScore=0] - 數學非選得分 (0~6)
 * @param {number} [options.listeningCorrect=null] - 英聽答對題數 (0~21，若無則單獨以閱讀計算)
 */
export function calculateCapGrade({
  year = 115,
  subject = 'math',
  choiceCorrect = 0,
  choiceTotal = 25,
  writtenScore = 0,
  listeningCorrect = null
}) {
  let grade = 'C';
  let weightedScore = null;
  let formulaDesc = '';

  if (subject === 'math') {
    // 數學：選擇題 (85%) + 非選擇題 (15%，滿分6分)
    const choiceRatio = choiceTotal > 0 ? (choiceCorrect / choiceTotal) : 0;
    const writtenRatio = Math.min(6, Math.max(0, writtenScore)) / 6;
    weightedScore = Math.round(((choiceRatio * 85) + (writtenRatio * 15)) * 10) / 10;
    formulaDesc = `選擇題 (${choiceCorrect}/${choiceTotal} × 85%) + 非選擇題 (${writtenScore}/6 × 15%) = ${weightedScore} 分`;

    for (const rule of CUTOFFS.math) {
      if (weightedScore >= rule.minScore) {
        grade = rule.grade;
        break;
      }
    }
  } else if (subject === 'english') {
    if (listeningCorrect !== null && listeningCorrect !== undefined) {
      // 英語加權：閱讀 (80%) + 聽力 (20%，滿分21題)
      const readRatio = choiceTotal > 0 ? (choiceCorrect / choiceTotal) : 0;
      const listenRatio = Math.min(21, Math.max(0, listeningCorrect)) / 21;
      weightedScore = Math.round(((readRatio * 80) + (listenRatio * 20)) * 10) / 10;
      formulaDesc = `閱讀 (${choiceCorrect}/${choiceTotal} × 80%) + 聽力 (${listeningCorrect}/21 × 20%) = ${weightedScore} 分`;
    } else {
      // 單做閱讀測驗：折算滿分 100 分
      weightedScore = choiceTotal > 0 ? Math.round((choiceCorrect / choiceTotal * 100) * 10) / 10 : 0;
      formulaDesc = `閱讀測驗獨立答對率 (${choiceCorrect}/${choiceTotal}) 折算 ${weightedScore} 分`;
    }

    for (const rule of CUTOFFS.english) {
      if (weightedScore >= rule.minScore) {
        grade = rule.grade;
        break;
      }
    }
  } else if (subject === 'listening') {
    // 英聽單科：滿分 21 題，基礎 14 題以上，待加強 13 題以下
    if (choiceCorrect >= 20) grade = 'A++';
    else if (choiceCorrect >= 19) grade = 'A+';
    else if (choiceCorrect >= 18) grade = 'A';
    else if (choiceCorrect >= 16) grade = 'B++';
    else if (choiceCorrect >= 14) grade = 'B+';
    else if (choiceCorrect >= 12) grade = 'B';
    else grade = 'C';
    formulaDesc = `聽力測驗答對 ${choiceCorrect}/${choiceTotal} 題 (官方標準：14 題以上為基礎)`;
  } else if (['chinese', 'social', 'science'].includes(subject)) {
    // 依答對題數直接切點
    const table = CUTOFFS[subject];
    const rules = table[choiceTotal] || table[Object.keys(table)[0]];
    if (rules) {
      for (const rule of rules) {
        if (choiceCorrect >= rule.min) {
          grade = rule.grade;
          break;
        }
      }
    }
    formulaDesc = `全卷選擇題答對 ${choiceCorrect} / ${choiceTotal} 題`;
  }

  const meta = CAP_GRADE_CONFIG[grade] || CAP_GRADE_CONFIG['C'];

  return {
    grade,
    gradeLabel: meta.label,
    level: meta.level,
    tag: meta.tag,
    desc: meta.desc,
    bg: meta.bg,
    border: meta.border,
    color: meta.color,
    weightedScore,
    formulaDesc,
    choiceCorrect,
    choiceTotal,
    writtenScore,
    listeningCorrect
  };
}

/**
 * 產生官方能力等級標示 HTML 徽章
 */
export function getCapGradeBadgeHtml(gradeResult) {
  if (!gradeResult) return '';
  const g = gradeResult;
  return `
    <span class="cap-grade-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:20px;font-weight:800;font-size:0.95rem;background:${g.bg};border:1.5px solid ${g.border};color:${g.color};">
      <span>${g.gradeLabel}</span>
      <small style="font-weight:600;opacity:0.85;font-size:0.78rem;">(${g.level} 等級)</small>
    </span>
  `;
}

/**
 * 產生官方能力等級診斷摘要卡片
 */
export function getCapGradeSummaryCardHtml(gradeResult) {
  if (!gradeResult) return '';
  const g = gradeResult;
  return `
    <div class="panel cap-grade-summary-card" style="border-left:5px solid ${g.border};background:var(--surface);margin-bottom:20px;padding:18px 20px;">
      <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <span class="subtle" style="font-size:0.82rem;text-transform:uppercase;">OFFICIAL CAP GRADE ESTIMATION</span>
          <h3 style="margin:4px 0 6px;display:flex;align-items:center;gap:10px;">
            會考落點等級：${getCapGradeBadgeHtml(g)}
          </h3>
          <p class="muted" style="margin:0;font-size:0.9rem;">${g.desc}</p>
        </div>
        ${g.weightedScore !== null ? `
          <div style="text-align:right;">
            <div style="font-size:1.6rem;font-weight:800;color:${g.color};">${g.weightedScore} <small style="font-size:0.9rem;font-weight:500;">/ 100分</small></div>
            <span class="subtle" style="font-size:0.8rem;">官方加權計算分數</span>
          </div>
        ` : ''}
      </div>
      <div style="margin-top:12px;padding-top:10px;border-top:1px dashed var(--border);font-size:0.85rem;color:var(--text-muted);">
        <strong>📐 計分依據：</strong> ${g.formulaDesc}
      </div>
    </div>
  `;
}
