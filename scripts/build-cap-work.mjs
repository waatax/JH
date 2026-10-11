// Build per-paper work packets for writing 會考 explanations (Cycle 2).
// Output: tmp/cap-work/<year>-<subject>.json  (tmp/ is git-ignored)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { units } from '../dist/curriculum.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const bank = JSON.parse(readFileSync(join(root, 'dist/cap-bank.json'), 'utf8'));
const alignment = JSON.parse(readFileSync(join(root, 'dist/alignment-data.json'), 'utf8'));
const candidates = new Map(alignment.questions.map(q => [q.id, q.candidateUnitIds || []]));
const unitSubjects = {
  chinese: ['chinese'], english: ['english'], listening: ['english'], math: ['math'],
  social: ['history', 'geography', 'civics'], science: ['biology', 'physics', 'chemistry', 'earth'],
};
const out = join(root, 'tmp/cap-work');
mkdirSync(out, { recursive: true });
const groups = new Map(bank.groups.map(g => [g.id, g]));
const papers = {};
for (const q of bank.questions) (papers[`${q.year}-${q.subject}`] ??= []).push(q);
for (const [paper, qs] of Object.entries(papers)) {
  const subject = qs[0].subject;
  const catalog = units.filter(u => unitSubjects[subject].includes(u.subject))
    .map(u => ({ id: u.id, grade: u.grade, term: u.term, title: u.title, concept: u.concept }));
  const usedGroups = [...new Set(qs.map(q => q.groupId).filter(Boolean))].map(id => {
    const g = groups.get(id);
    return { id, range: g.range, text: g.text, images: g.crops.map(c => 'dist/' + c.src) };
  });
  const packet = {
    paper, subject, year: qs[0].year,
    outputFile: `dist/cap-explain/${paper}.json`,
    units: catalog,
    groups: usedGroups,
    questions: qs.map(q => ({
      id: q.id, number: q.number, kind: q.kind, groupId: q.groupId,
      stem: q.stem, options: q.options, answer: q.answer,
      images: q.crops.map(c => 'dist/' + c.src),
      officialObjective: q.analysis?.objective || q.officialObjective || '',
      officialCodes: q.officialCodes,
      transcript: q.analysis?.transcript || '',
      passRate: q.analysis?.passRate ?? null,
      optionPercent: q.analysis?.optionPercent || null,
      candidateUnitIds: candidates.get(q.id) || [],
    })),
  };
  writeFileSync(join(out, `${paper}.json`), JSON.stringify(packet, null, 1));
}
console.log('packets', Object.keys(papers).length);
