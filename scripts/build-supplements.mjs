// scripts/build-supplements.mjs
// Compiles all 6 domain supplement modules (188/188 units) into dist/supplements.js
// Includes rich safe formatting (**bold**, `code`) and native SVG visual strip illustrations.

import fs from 'node:fs';
import assert from 'node:assert/strict';
import { units } from '../dist/curriculum.js';
import { mathSupplements } from './supplements-builders/math-supp.mjs';
import { languageSupplements } from './supplements-builders/language-supp.mjs';
import { bioEarthSupplements } from './supplements-builders/bio-earth-supp.mjs';
import { phyChemSupplements } from './supplements-builders/phy-chem-supp.mjs';
import { socialSupplements } from './supplements-builders/social-supp.mjs';
import { artsLifeSupplements } from './supplements-builders/arts-life-supp.mjs';

const allSupplements = {
  ...mathSupplements,
  ...languageSupplements,
  ...bioEarthSupplements,
  ...phyChemSupplements,
  ...socialSupplements,
  ...artsLifeSupplements
};

assert.equal(Object.keys(allSupplements).length, units.length, `Expected ${units.length} supplements, got ${Object.keys(allSupplements).length}`);

const ordered = {};
let totalChars = 0;
for (const u of units) {
  const s = allSupplements[u.id];
  assert(s, `Missing supplement for unit: ${u.id}`);
  assert(typeof s.title === 'string' && s.title.length >= 6, `Invalid supplement title: ${u.id}`);
  assert(Array.isArray(s.points) && s.points.length >= 2 && s.points.every(p => p.length >= 30), `Invalid supplement points: ${u.id}`);
  assert(Array.isArray(s.rows) && s.rows.length >= 3 && s.rows.every(r => Array.isArray(r) && r.length === 3), `Invalid supplement rows: ${u.id}`);
  assert(typeof s.task === 'string' && s.task.length >= 20, `Invalid supplement task: ${u.id}`);
  assert(typeof s.answer === 'string' && s.answer.length >= 25, `Invalid supplement answer: ${u.id}`);
  ordered[u.id] = s;
  const chars = [s.title, ...s.points, ...s.rows.flat(), s.task, s.answer].join('').replace(/\s+/g, '').length;
  totalChars += chars;
}

const out = `// dist/supplements.js
// 108 Curriculum x School Midterm/Final & CAP Exam Reverse-Engineered Deep Supplements (100% 188/188 Units Authored)
import { workedCases } from './worked-cases.js';
import { renderSupplementVisualStrip } from './lesson-illustrations.js';

export const supplements = ${JSON.stringify(ordered, null, 2)};

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Safe inline textbook formatting: escapes HTML first, then renders **bold** and \`code/formula\` pills
const fmt = s => esc(s)
  .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
  .replace(/\`([^\`]+)\`/g, '<code class="supp-code">$1</code>');

export function supplementFor(u) {
  if (!u) return null;
  if (supplements[u.id]) return supplements[u.id];
  const wc = workedCases[u.id];
  const q = u.questions?.[1] || u.questions?.[0];
  return {
    title: \`\${u.title} · 進階條件辨析與實戰檢核\`,
    points: [
      wc ? wc.teaching : u.concept,
      \`【適用邊界與易錯防線】\${u.pitfall} \${wc ? wc.check : ''}\`
    ],
    rows: [
      ['審題焦點', wc ? wc.problem : u.title, wc && wc.steps[0] ? wc.steps[0] : u.example],
      ['核心推演', wc && wc.steps[1] ? wc.steps[1] : u.concept, wc && wc.steps[2] ? wc.steps[2] : '逐步核對已知條件與未知目標'],
      ['邊界檢核', wc ? wc.check : u.pitfall, \`完成遷移：\${u.task}\`]
    ],
    task: q ? \`\${q.prompt}（試著不看選項先說出判斷根據）\` : u.task,
    answer: q ? \`正確結論為「\${q.options[q.answer]}」。解析：\${q.explanation}\` : u.example
  };
}

export function renderSupplement(u) {
  const s = supplementFor(u);
  if (!s) return '';
  return \`<section class="teaching-notes supp-visual-card"><h3>📘 深度補充講義：\${esc(s.title)}</h3>\${renderSupplementVisualStrip(u, s)}\${s.points.map(p => \`<p>\${fmt(p)}</p>\`).join('')}<div class="table-wrap"><table class="teaching-table"><caption>\${esc(s.title)} · 條件、做法與檢核</caption><thead><tr><th>🔍 辨識</th><th>⚙️ 做法</th><th>✅ 檢核</th></tr></thead><tbody>\${s.rows.map(r => \`<tr>\${r.map(v => \`<td>\${fmt(v)}</td>\`).join('')}</tr>\`).join('')}</tbody></table></div><p><strong>✍️ 自己試一次：</strong>\${fmt(s.task)}</p><details><summary>💡 查看理由與完整推導</summary><p>\${fmt(s.answer)}</p></details></section>\`;
}
`;

fs.writeFileSync('dist/supplements.js', out, 'utf8');
console.log(`[Build Supplements] Successfully compiled 188 / 188 authored supplements (${totalChars.toLocaleString()} pure teaching characters)!`);
