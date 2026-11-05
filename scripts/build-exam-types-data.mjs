// scripts/build-exam-types-data.mjs
// Compiles dist/exam-types-data.js covering all 188 units across junior high curriculum
// Includes Zero-to-A++ Progressive Mastery Ladder + CAP High-Frequency Exam Type Matrix + 5-Step Scaffolding Practice
import fs from 'fs';
import assert from 'node:assert/strict';
import { units } from '../dist/curriculum.js';
import { teachingFor } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';
import { mathExamData } from './exam-data-builders/math-builder.mjs';
import { languageExamData } from './exam-data-builders/language-builder.mjs';
import { scienceExamData } from './exam-data-builders/science-builder.mjs';
import { socialExamData } from './exam-data-builders/social-builder.mjs';
import { artsLifeExamData } from './exam-data-builders/arts-life-builder.mjs';

const allExamData = {
  ...mathExamData,
  ...languageExamData,
  ...scienceExamData,
  ...socialExamData,
  ...artsLifeExamData
};

console.log(`Aggregated total units: ${Object.keys(allExamData).length} / expected: ${units.length}`);
assert.equal(Object.keys(allExamData).length, units.length, 'Must have exactly 188 units covered');

for (const u of units) {
  const d = allExamData[u.id];
  assert(d, `Missing exam data for unit: ${u.id}`);
  assert(d.examType, `Missing examType for ${u.id}`);
  assert(d.examType.typeName.length >= 8, `typeName too short for ${u.id}`);
  assert(d.examType.clues.length >= 10, `clues too short for ${u.id}`);
  assert(d.examType.publishersFocus.length >= 15, `publishersFocus too short for ${u.id}`);
  assert(d.examType.strategy.length >= 15, `strategy too short for ${u.id}`);

  assert(d.workedExample, `Missing workedExample for ${u.id}`);
  assert(d.workedExample.stem.length >= 20, `stem too short for ${u.id}`);
  assert.equal(d.workedExample.options.length, 4, `options must be 4 for ${u.id}`);
  assert(Number.isInteger(d.workedExample.answer) && d.workedExample.answer >= 0 && d.workedExample.answer < 4, `invalid answer for ${u.id}`);
  assert.equal(d.workedExample.steps.length, 5, `must have exactly 5 steps for ${u.id}`);
  for (const st of d.workedExample.steps) {
    assert(st.length >= 25, `Step too short in ${u.id}: ${st}`);
  }

  // Enrich each unit with a dedicated 3-Tier "Zero-Foundation Beginner to CAP A++ Top-Tier" Mastery Ladder
  const tRows = teachingFor(u)?.rows || [];
  const r0 = tRows[0] || [u.title, u.concept.split('。')[0], u.example.split('。')[0]];
  const r1 = tRows[1] || r0;
  const r2 = tRows[2] || r1;
  const wc = workedCases[u.id] || { teaching: u.concept, problem: u.example, steps: [], check: u.pitfall };

  d.zeroToTopLadder = {
    zeroFoundation: `【白話破冰直覺】先別被專有名詞嚇到！「${u.title}」最核心的白話本質就是：${u.concept} 初學起步時，請先牢記第一條黃金判準——「${r0[0]}：${r0[1]}（實例：${r0[2]}）」，只要順著定義一步步對照，零基礎也能穩拿會考 B 級基礎保底分。`,
    mainstreamBtoA: `【主流破題 SOP】晉升 B++ 至 A 精熟等級的關鍵，在於把題幹線索（${d.examType.clues}）直接轉譯為「${r1[0]}」與「${r2[0]}」的比較判準。遵循「${d.examType.strategy}」，並主動避開考場頭號陷阱：「${u.pitfall.split('。')[0]}。」`,
    topTierAPlusPlus: `【A++ 頂標壓軸突破】會考前 5%（A++ 頂標）決勝壓軸題常結合跨圖表轉譯、多條件逆向推導或極端值檢驗。面對高難度綜合題時，請運用頂標驗算防線：「${wc.check}」算完務必代回原題幹檢驗邊界條件，做到零粗心、零死角滿分通關！`
  };
}

// Generate dist/exam-types-data.js
const header = `// dist/exam-types-data.js
// 108 Curriculum x CAP Exam (109-115) Reverse-Engineered Question Types, Zero-to-A++ Mastery Ladder, Worked Examples & 5-Step Scaffolding Solutions
// Generated automatically with 100% coverage across all 188 units.

export const examTypesData = ${JSON.stringify(allExamData, null, 2)};

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function renderExamTypeAndExample(u) {
  const data = examTypesData[u.id];
  if (!data) return '';

  const et = data.examType;
  const we = data.workedExample;
  const ladder = data.zeroToTopLadder;

  return \`
<section class="lesson-step cap-exam-type-step" id="step-exam-types" aria-labelledby="exam-types-heading-\${u.id}">
  <div class="step-label" style="background:#e8f4fd;color:#0277bd;font-weight:700;">ZERO TO A++ MASTERY &amp; CAP WORKED CASE</div>
  <h2 id="exam-types-heading-\${u.id}">🎯 小白到會考頂標（A++）：高頻題型分析與五步詳解實戰</h2>
  <p class="muted">從零基礎白話破冰一路進階至會考 A++ 頂標：依據近七年（109～115）會考真題大數據、108 課綱指標與康軒／翰林／南一三版本教材重點回推，打造完整解題鷹架。</p>

  \${ladder ? \`
  <!-- Module 0: Zero-Foundation to CAP A++ Top-Tier 3-Stage Mastery Ladder -->
  <div class="zero-to-top-ladder-card" style="border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:18px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
      <strong style="font-size:1rem;color:var(--text);display:flex;align-items:center;gap:6px;">🧭 零基礎小白 ➔ 會考 A++ 頂標 三階通關藍圖</strong>
      <span class="tag" style="background:#edf7ed;color:#1e4620;font-weight:700;font-size:0.8rem;">循序漸進 · 階梯式養成</span>
    </div>
    <div class="zero-to-top-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:12px;">
      <div class="ladder-stage-box" style="background:var(--surface-alt);border:1px solid var(--border);border-top:4px solid #43a047;border-radius:8px;padding:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <strong style="color:#2e7d32;font-size:0.92rem;">🌱 Step 1｜小白破冰（B 保底）</strong>
          <span style="font-size:0.75rem;background:#e8f5e9;color:#2e7d32;padding:2px 6px;border-radius:4px;font-weight:600;">零基礎秒懂</span>
        </div>
        <p style="margin:0;font-size:0.88rem;line-height:1.55;color:var(--text);">\${esc(ladder.zeroFoundation)}</p>
      </div>
      <div class="ladder-stage-box" style="background:var(--surface-alt);border:1px solid var(--border);border-top:4px solid #1e88e5;border-radius:8px;padding:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <strong style="color:#1565c0;font-size:0.92rem;">⚡ Step 2｜主流破題（B++ ➔ A）</strong>
          <span style="font-size:0.75rem;background:#e3f2fd;color:#1565c0;padding:2px 6px;border-radius:4px;font-weight:600;">高頻必拿分</span>
        </div>
        <p style="margin:0;font-size:0.88rem;line-height:1.55;color:var(--text);">\${esc(ladder.mainstreamBtoA)}</p>
      </div>
      <div class="ladder-stage-box" style="background:var(--surface-alt);border:1px solid var(--border);border-top:4px solid #fb8c00;border-radius:8px;padding:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <strong style="color:#ef6c00;font-size:0.92rem;">🏆 Step 3｜頂標突破（A+ ➔ A++）</strong>
          <span style="font-size:0.75rem;background:#fff3e0;color:#e65100;padding:2px 6px;border-radius:4px;font-weight:600;">壓軸決勝題</span>
        </div>
        <p style="margin:0;font-size:0.88rem;line-height:1.55;color:var(--text);">\${esc(ladder.topTierAPlusPlus)}</p>
      </div>
    </div>
  </div>
  \` : ''}

  <!-- Module 1: Exam Type Analysis Matrix -->
  <div class="exam-type-matrix-card" style="border:1px solid var(--border);border-left:5px solid var(--brand);background:var(--surface);border-radius:10px;padding:18px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
    <div class="row" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:14px;">
      <span class="tag accent" style="font-weight:700;font-size:0.95rem;">📌 \${esc(et.typeName)}</span>
      <span class="tag" style="background:#e3f2fd;color:#0d47a1;">🔥 \${esc(et.frequency)}</span>
      <span class="subtle" style="margin-left:auto;font-size:0.85rem;">認知層次：\${esc(et.bloomLevel)}</span>
    </div>

    <div class="exam-type-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;background:var(--surface-alt);padding:14px;border-radius:8px;">
      <div class="exam-type-cell">
        <strong style="color:var(--text);display:block;margin-bottom:4px;">🔍 審題題眼與已知線索：</strong>
        <p style="margin:0;font-size:0.9rem;line-height:1.5;color:var(--text-muted);">\${esc(et.clues)}</p>
      </div>
      <div class="exam-type-cell">
        <strong style="color:var(--text);display:block;margin-bottom:4px;">💡 破題思維攻擊角：</strong>
        <p style="margin:0;font-size:0.9rem;line-height:1.5;color:var(--text-muted);">\${esc(et.strategy)}</p>
      </div>
      <div class="exam-type-cell" style="grid-column:1 / -1;">
        <strong style="color:var(--text);display:block;margin-bottom:4px;">📚 康軒 · 翰林 · 南一 跨版本教材聚焦點：</strong>
        <p style="margin:0;font-size:0.9rem;line-height:1.5;color:var(--text-muted);">\${esc(et.publishersFocus)}</p>
      </div>
    </div>
    
    <div class="knowledge-audit-row" style="margin-top:12px;font-size:0.82rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;">
      <span>✅ <strong>課綱知識充足度檢驗：</strong>\${esc(et.knowledgeAudit)}</span>
    </div>
  </div>

  <!-- Module 2: Interactive Worked Example Practice -->
  <div class="exam-practice-card" id="exam-practice-\${u.id}" style="border:1px solid var(--border);border-radius:10px;background:var(--surface);padding:20px;box-shadow:0 3px 12px rgba(0,0,0,0.05);">
    <div class="practice-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.3rem;">🎯</span>
        <strong style="font-size:1.05rem;">\${esc(we.title)}</strong>
      </div>
      <span class="subtle" style="font-size:0.82rem;">點選選項立即自我檢驗</span>
    </div>

    <div class="practice-stem-box" style="margin-bottom:16px;">
      <p class="practice-stem" style="font-size:1rem;line-height:1.65;font-weight:500;margin:0;white-space:pre-wrap;">\${esc(we.stem)}</p>
    </div>

    <!-- 4 Option Buttons -->
    <div class="practice-options-grid" role="group" aria-label="例題選項" style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">
      \${we.options.map((opt, optIdx) => \`
        <button type="button" class="practice-opt-btn" data-unit="\${u.id}" data-opt-idx="\${optIdx}" data-ans="\${we.answer}" style="display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;padding:12px 16px;border-radius:8px;border:1px solid var(--border);background:var(--surface-alt);cursor:pointer;transition:all 0.2s ease;font-size:0.95rem;line-height:1.5;">
          <span class="opt-letter-badge" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--surface);border:1px solid var(--border);font-weight:700;flex-shrink:0;">\${String.fromCharCode(65 + optIdx)}</span>
          <span class="opt-text" style="flex:1;">\${esc(opt)}</span>
        </button>
      \`).join('')}
    </div>

    <!-- Feedback Banner -->
    <div class="practice-fb-banner" id="practice-fb-\${u.id}" style="display:none;padding:12px 16px;border-radius:8px;margin-bottom:16px;font-weight:600;font-size:0.95rem;line-height:1.5;"></div>

    <!-- Module 3: 5-Step Scaffolding Solution -->
    <details class="exam-solution-accordion" id="practice-sol-\${u.id}" style="margin-top:14px;border-top:1px dashed var(--border);padding-top:14px;">
      <summary style="cursor:pointer;font-weight:700;color:var(--brand);display:flex;align-items:center;gap:8px;padding:6px 0;user-select:none;">
        <span>🔍 展開階梯式五步詳解思維鏈（審題 ➔ 定理 ➔ 推導 ➔ 避坑 ➔ 版本與頂標心法）</span>
        <span class="summary-pill" style="margin-left:auto;background:var(--surface-alt);border:1px solid var(--border);padding:2px 8px;border-radius:12px;font-size:0.8rem;color:var(--text-muted);font-weight:500;">5 步完整推理</span>
      </summary>
      <div class="solution-steps-wrapper" style="margin-top:12px;background:var(--surface-alt);padding:16px;border-radius:8px;border:1px solid var(--border);">
        <ol class="solution-steps-list" style="padding-left:18px;margin:0;display:flex;flex-direction:column;gap:12px;">
          \${we.steps.map(st => \`
            <li class="solution-step-item" style="line-height:1.6;font-size:0.92rem;color:var(--text);">
              \${esc(st)}
            </li>
          \`).join('')}
        </ol>
      </div>
    </details>
  </div>
</section>
\`;
}

export function wireExamPractice(container) {
  if (!container) return;

  container.querySelectorAll('.practice-opt-btn').forEach(btn => {
    btn.onclick = () => {
      const unitId = btn.dataset.unit;
      const optIdx = parseInt(btn.dataset.optIdx, 10);
      const ansIdx = parseInt(btn.dataset.ans, 10);

      const card = container.querySelector(\`#exam-practice-\${unitId}\`);
      if (!card) return;

      const fb = card.querySelector(\`#practice-fb-\${unitId}\`);
      const sol = card.querySelector(\`#practice-sol-\${unitId}\`);
      const allBtns = card.querySelectorAll('.practice-opt-btn');

      // Reset all buttons style
      allBtns.forEach(b => {
        b.style.borderColor = 'var(--border)';
        b.style.background = 'var(--surface-alt)';
      });

      // Highlight correct option in green
      const correctBtn = allBtns[ansIdx];
      if (correctBtn) {
        correctBtn.style.borderColor = '#2e7d32';
        correctBtn.style.background = '#e8f5e9';
      }

      if (optIdx === ansIdx) {
        // Correct
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#e8f5e9';
          fb.style.color = '#1b5e20';
          fb.style.border = '1px solid #a5d6a7';
          fb.innerHTML = '🎉 <strong>恭喜答對！</strong>您已精準掌握本題題眼與大考解題邏輯！請進一步對照下方五步思維推導與 A++ 頂標心法鞏固實力：';
        }
      } else {
        // Incorrect
        btn.style.borderColor = '#c62828';
        btn.style.background = '#ffebee';
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#fff3e0';
          fb.style.color = '#e65100';
          fb.style.border = '1px solid #ffcc80';
          fb.innerHTML = \`💡 <strong>差一點點！正確答案為 (\${String.fromCharCode(65 + ansIdx)})。</strong>別氣餒，從錯題找盲點是衝上 A++ 頂標最快的方式！請看下方【第 1～4 步詳解與易錯陷阱剖析】：\`;
        }
      }

      // Automatically open the solution accordion
      if (sol) {
        sol.setAttribute('open', '');
      }
    };
  });
}
`;

fs.writeFileSync('dist/exam-types-data.js', header, 'utf8');
const fileStats = fs.statSync('dist/exam-types-data.js');
console.log(`Successfully generated dist/exam-types-data.js! Size: ${(fileStats.size / 1024).toFixed(1)} KB`);
