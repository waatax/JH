// Publish authored AI explanations only after checking identity, source and official answer.
// The checks establish consistency, not an external teacher review.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = path.join(root, 'dist');
const input = path.join(root, 'data/cap-ai-derivations');
const bank = JSON.parse(fs.readFileSync(path.join(dist, 'cap-bank.json'), 'utf8'));
const byId = new Map(bank.questions.map(q => [q.id, q]));
const seen = new Set();
const pendingWrites = [];
const summary = [];
const hashes = new Map();
const sourceHash = file => {
  if (!hashes.has(file)) hashes.set(file, createHash('sha256').update(fs.readFileSync(path.join(dist, file))).digest('hex'));
  return hashes.get(file);
};
const template = /與題幹條件不符，或存在觀念混淆|經推導計算求得對應結果|完全符合題幹核心要求/;
for (const file of fs.readdirSync(input).filter(f => f.endsWith('.json')).sort()) {
  const packet = JSON.parse(fs.readFileSync(path.join(input, file), 'utf8'));
  if (!/^\d{3}-(chinese|english|listening|math|social|science)$/.test(packet.paper)) throw Error(`Invalid paper: ${file}`);
  const out = path.join(dist, 'cap-explain', `${packet.paper}.json`);
  const explanations = JSON.parse(fs.readFileSync(out, 'utf8'));
  let count = 0;
  for (const [id, entry] of Object.entries(packet.entries)) {
    const q = byId.get(id);
    if (!q || `${q.year}-${q.subject}` !== packet.paper || seen.has(id)) throw Error(`Invalid or duplicate identity: ${id}`);
    if (entry.answer !== q.answer) throw Error(`AI answer ${entry.answer} differs from official ${q.answer}: ${id}`);
    if (packet.source !== `downloads/cap/${packet.paper}.pdf` || !fs.existsSync(path.join(dist, packet.source))) throw Error(`Missing original paper: ${id}`);
    if (typeof entry.keyIdea !== 'string' || !Array.isArray(entry.steps) || entry.steps.length < 2 || entry.steps.some(s => typeof s !== 'string' || s.length < 10) || !entry.hint || !entry.trap) throw Error(`Incomplete explanation: ${id}`);
    if (template.test(JSON.stringify(entry))) throw Error(`Generic explanation is not publishable: ${id}`);
    if (q.kind !== 'written') {
      const letters = Array.from(q.optionLetters || 'ABCD').sort().join('');
      if (Object.keys(entry.options || {}).sort().join('') !== letters) throw Error(`Option explanations missing: ${id}`);
      if (Object.values(entry.options).some(s => typeof s !== 'string' || s.length < 8)) throw Error(`Option explanation too short: ${id}`);
    } else if (!entry.rubric?.length) throw Error(`Written self-check missing: ${id}`);
    const { transcription, ...derivation } = entry;
    if (transcription) {
      if ((transcription.stem !== undefined && (typeof transcription.stem !== 'string' || transcription.stem.length < 10)) ||
          Object.keys(transcription.options || {}).sort().join('') !== (q.optionLetters || '') ||
          Object.values(transcription.options).some(s => typeof s !== 'string' || !s.trim())) throw Error(`Invalid transcription: ${id}`);
      q.originalExtraction ??= {stem:q.stem, options:q.options};
      if (transcription.stem !== undefined) q.stem = transcription.stem;
      q.options = transcription.options;
      q.textReview = {author:'AI', method:'original-pdf-visual-review', source:packet.source, page:q.page, updatedAt:'2026-10-28', teacherReviewed:false};
    }
    const explanation = {
      ...explanations[id], ...derivation,
      provenance: {
        author: 'AI', status: 'ai-derived',
        answerCheck: q.kind === 'written' ? 'written-self-check' : 'matches-official',
        source: packet.source, page: q.page,
        sourceSha256: sourceHash(packet.source),
        answerSource: `downloads/cap/${q.year}-answers.pdf`,
        answerSourceSha256: sourceHash(`downloads/cap/${q.year}-answers.pdf`),
        analysisSource: q.analysisRef || null,
        analysisSourceSha256: q.analysisRef?.path ? sourceHash(q.analysisRef.path) : null,
        teacherReviewed: false, updatedAt: '2026-10-28'
      }
    };
    // Keep claims of official scoring out of AI-written self-checks.
    if (q.kind === 'written') explanation.rubricLabel = 'AI 解題自我檢核（非官方配分規準）';
    explanations[id] = explanation;
    q.explanation = explanation;
    seen.add(id); count++;
  }
  pendingWrites.push([out, explanations]);
  summary.push({paper: packet.paper, aiDerived: count, total: bank.questions.filter(q => `${q.year}-${q.subject}` === packet.paper).length});
}
// Validate the entire batch before changing any output.
for (const [file, value] of pendingWrites) fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
fs.writeFileSync(path.join(dist, 'cap-bank.json'), JSON.stringify(bank, null, 1) + '\n');
fs.writeFileSync(path.join(dist, 'cap-ai-coverage.json'), JSON.stringify({
  checkedAt: '2026-10-28', officialIndex: 'https://cap.rcpet.edu.tw/examination.html',
  total: bank.questions.length, aiDerived: seen.size, pending: bank.questions.length - seen.size,
  note: 'AI 推導已核對答案欄位；此檢查不等同學科專家審查。非選題為 AI 參考解法及自我檢核。', papers: summary
}, null, 2) + '\n');
console.log(`Published ${seen.size} AI explanations; ${bank.questions.length - seen.size} pending.`);
