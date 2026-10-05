import {mathCases} from './cases-math.js';
import {languageCases} from './cases-language.js';
import {scienceCases} from './cases-science.js';
import {socialCases} from './cases-social.js';
import {lifeCases} from './cases-life.js';

export const workedCases = Object.create(null);
for (const line of [mathCases,languageCases,scienceCases,socialCases,lifeCases].join('\n').split('\n').filter(s=>s.trim())) {
 const fields=line.split('|');
 if(fields.length!==5)throw new Error('Invalid worked example: '+fields[0]);
 const [id,teaching,problem,steps,check]=fields;
 if(workedCases[id])throw new Error('Duplicate worked example: '+id);
 workedCases[id]={teaching,problem,steps:steps.split('~'),check};
}

export const stepRoles = [
  '【審題定位 · 抓出題眼與已知】',
  '【策略轉化 · 核心定理與推導】',
  '【破題求解 · 結論與單位確認】',
  '【深化拓展 · 綜合情境應用】'
];

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function renderWorkedCase(u) {
 const c = workedCases[u.id];
 if (!c) return '';
 return `<section class="worked-case" aria-labelledby="worked-case-title">
  <div class="worked-case-badge-row">
    <span class="tag accent">解題思維鏈 · 題眼到推導</span>
    <span class="subtle">階梯式引導 · 培養獨立破題思維</span>
  </div>
  <h3 id="worked-case-title">從觀念躍遷至解題：思維路徑拆解</h3>
  <div class="case-teaching-box">
    <div class="case-teaching-lead">💡 破題思維核心：</div>
    <p class="case-teaching">${esc(c.teaching)}</p>
  </div>
  <div class="case-problem">
    <div class="case-problem-header">
      <span class="problem-pin">🎯</span>
      <strong>原創實戰範例／情境任務</strong>
    </div>
    <p class="case-problem-text">${esc(c.problem)}</p>
  </div>
  <details class="case-solution">
    <summary>
      <span class="summary-icon">🔍</span>
      <span class="summary-text">先動腦想一想，再展開階梯式推導演練</span>
      <span class="summary-pill">${c.steps.length} 個推導步驟</span>
    </summary>
    <div class="thinking-chain-wrapper">
      <div class="thinking-chain-prompt">
        <span>💡 建議學習步驟：先在心裡回答每一步的問題，再對照下方的邏輯推導。</span>
      </div>
      <ol class="thinking-chain-steps">
        ${c.steps.map((step, idx) => `
          <li class="thinking-step-item" data-step-idx="${idx}">
            <div class="step-meta">
              <span class="step-num-pill">第 ${idx + 1} 步</span>
              <strong class="step-role-text">${stepRoles[idx] || '【邏輯推進】'}</strong>
            </div>
            <div class="step-text">${esc(step)}</div>
          </li>
        `).join('')}
      </ol>
      <div class="case-check">
        <div class="case-check-header">
          <span class="check-shield">🛡️</span>
          <strong>防呆驗算與適用邊界（避免落入常見陷阱）</strong>
        </div>
        <p class="case-check-text">${esc(c.check)}</p>
      </div>
    </div>
  </details>
  <p class="subtle case-footer-tip">心法提點：先審清題眼與限制條件，再選定理推導；驗算時確認單位合理性與正負界線。</p>
</section>`;
}
