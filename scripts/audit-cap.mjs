// Cycle 1/2 quality gate for 會考 109–115 bank. Exit code 1 when a hard check fails.
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const bank = JSON.parse(readFileSync(join(dist, 'cap-bank.json'), 'utf8'));
const alignment = JSON.parse(readFileSync(join(dist, 'alignment-data.json'), 'utf8'));
const strict = process.argv.includes('--strict');
const paperArg = process.argv.includes('--paper') ? process.argv[process.argv.indexOf('--paper') + 1] : null;
if (paperArg) bank.questions = bank.questions.filter(q => `${q.year}-${q.subject}` === paperArg);
const explainDir = join(dist, 'cap-explain');
const { units: unitList } = await import('../dist/curriculum.js');
const units = new Set(unitList.map(u => u.id));

const expected = alignment.questions.filter(q => q.kind !== 'writing' && (!paperArg || `${q.year}-${q.subject}` === paperArg));
const byId = new Map(bank.questions.map(q => [q.id, q]));
const groups = new Map(bank.groups.map(g => [g.id, g]));
const issues = [];
const papers = {};
const flag = (q, msg, hard = true) => issues.push({ id: q.id, msg, hard });

for (const e of expected) if (!byId.has(e.id)) issues.push({ id: e.id, msg: '題目未載入', hard: true });

const explanations = {};
if (existsSync(explainDir)) {
  for (const q of bank.questions) {
    const f = join(explainDir, `${q.year}-${q.subject}.json`);
    if (!(f in explanations)) explanations[f] = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
  }
}

for (const q of bank.questions) {
  const p = (papers[`${q.year}-${q.subject}`] ??= { n: 0, answer: 0, crops: 0, options: 0, analysis: 0, audio: 0, explained: 0, linked: 0 });
  p.n++;
  if (!q.crops?.length) flag(q, '缺題目圖');
  for (const c of q.crops || []) {
    if (!existsSync(join(dist, c.src))) flag(q, `圖檔不存在 ${c.src}`);
    if (c.h > 1500) flag(q, `題圖過高 ${c.h}px（疑似切題錯誤）`, false);
    if (c.h < 40) flag(q, `題圖過矮 ${c.h}px`, false);
  }
  if (q.crops?.length) p.crops++;
  if (q.kind !== 'written') {
    if (/^[A-D]$/.test(q.answer || '')) p.answer++; else flag(q, '缺官方答案');
    const need = q.optionLetters?.length || 4;
    if (Object.keys(q.options || {}).length === need) p.options++;
    else flag(q, '選項文字未拆出（以題圖作答）', false);
    if (q.analysis && q.analysis.answer && q.answer && q.analysis.answer !== q.answer) flag(q, `答案表 ${q.answer} ≠ 試題分析 ${q.analysis.answer}`);
  }
  if (q.analysis) p.analysis++;
  if (q.subject === 'listening') { if (q.audio && existsSync(join(dist, q.audio))) p.audio++; else flag(q, '缺官方音檔'); }
  if (q.groupId && !groups.has(q.groupId)) flag(q, '題組材料遺失');
  const ex = explanations[join(explainDir, `${q.year}-${q.subject}.json`)]?.[q.id];
  if (ex) {
    p.explained++;
    if (q.kind !== 'written' && ex.answer !== q.answer) flag(q, `解說答案 ${ex.answer} ≠ 官方 ${q.answer}`);
    const bad = (ex.unitIds || []).filter(u => !units.has(u));
    if (bad.length) flag(q, `無效單元 ${bad.join(',')}`);
    if ((ex.unitIds || []).length) p.linked++; else if (!ex.gap) flag(q, '未連結單元且未標示課綱缺口', false);
    for (const k of ['keyIdea', 'steps']) if (!ex[k] || (Array.isArray(ex[k]) && !ex[k].length)) flag(q, `解說缺 ${k}`);
  } else if (strict) flag(q, '缺解說');
}

const rows = Object.entries(papers).map(([paper, p]) => ({ paper, ...p }));
console.table(rows);
const total = rows.reduce((a, r) => { for (const k of Object.keys(r)) if (k !== 'paper') a[k] = (a[k] || 0) + r[k]; return a; }, {});
console.log('TOTAL', total, 'groups', bank.groups.length);
const hard = issues.filter(i => i.hard), soft = issues.filter(i => !i.hard);
console.log(`hard issues: ${hard.length}, soft issues: ${soft.length}`);
for (const i of [...hard, ...soft].slice(0, 60)) console.log(i.hard ? 'HARD' : 'soft', i.id, i.msg);
if (hard.length) process.exit(1);
