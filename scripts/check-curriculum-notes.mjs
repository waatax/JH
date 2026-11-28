import assert from 'node:assert/strict';
import fs from 'node:fs';
import { units, subjects, subjectById } from '../dist/curriculum.js';
import { officialAlignment, officialSources } from '../dist/official-alignment-data.js';
import { lessonResources } from '../dist/study-library.js';
import { addedNotes } from './curriculum-note-supplements.mjs';
import { capGroups, capPatterns } from './cap-note-patterns.mjs';
import { capReferences, capYears } from './cap-note-sources.mjs';

const root = new URL('../dist/notes/', import.meta.url);
const read = (relative, encoding) => fs.readFileSync(new URL(relative, root), encoding);
const catalog = read('index.html', 'utf8');
const capGuide = read('cap.html', 'utf8');
const notes = [...units, ...addedNotes];
const capSubject = {
  chinese: 'chinese', english: 'english', math: 'math', biology: 'science', chemistry: 'science', physics: 'science', earth: 'science',
  history: 'social', geography: 'social', civics: 'social',
};
const capCourseNotes = notes.filter(note => capSubject[note.subject]);
const capIds = new Set(capPatterns.flatMap(pattern => pattern.chapterIds));
assert.equal(new Set(notes.map(note => note.id)).size, notes.length, 'duplicate note ID');
assert.equal(new Set(notes.map(note => subjectById[note.subject].domain)).size, 8);
assert.equal(new Set(notes.map(note => note.subject)).size, subjects.length);
assert.equal(new Set(addedNotes.map(note => subjectById[note.subject].domain)).size, 8);
assert.deepEqual([...capIds].sort(), capCourseNotes.map(note => note.id).sort(), 'CAP chapter coverage does not include unrelated subjects');
assert.equal(new Set(capPatterns.map(pattern => pattern.id)).size, capPatterns.length);
assert.equal(new Set(capPatterns.map(pattern => pattern.prompt)).size, capPatterns.length);

function checkPdf(id, pages) {
  const pdf = read(`pdf/${id}.pdf`, 'latin1');
  assert.ok(pdf.startsWith('%PDF-'), `${id} PDF signature`);
  assert.equal([...pdf.matchAll(/\/Type\s+\/Page\b/g)].length, pages, `${id} number of pages`);
}

for (const note of notes) {
  assert.ok(catalog.includes(`href="./chapters/${note.id}.html"`), `${note.id} reading link`);
  assert.ok(catalog.includes(`href="./pdf/${note.id}.pdf"`), `${note.id} catalog download link`);
  const html = read(`chapters/${note.id}.html`, 'utf8');
  for (const heading of ['章節重點', '示範與推理', '闔上筆記，試著回想', '參考解答與自評', '課綱依據']) {
    assert.ok(html.includes(heading), `${note.id} section ${heading}`);
  }
  assert.ok(html.includes(`href="../pdf/${note.id}.pdf"`), `${note.id} download link`);
  assert.ok(!html.includes('<details class="answer-panel" open>'), `${note.id} answer should start collapsed`);
  assert.equal(html.includes('id="cap-prep"'), capIds.has(note.id), `${note.id} CAP section`);
  for (const pattern of capPatterns.filter(p => p.chapterIds.includes(note.id))) {
    assert.ok(html.includes(escapeHtml(pattern.title)), `${note.id}: ${pattern.id} missing`);
  }
  checkPdf(note.id, capIds.has(note.id) ? 2 : 1);
}

for (const grade of [7, 8, 9]) for (const term of [1, 2]) {
  const id = `semester-${grade}-${term}`;
  const count = notes.filter(note => note.grade === grade && note.term === term)
    .reduce((total, note) => total + (capIds.has(note.id) ? 2 : 1), 0);
  assert.ok(catalog.includes(`href="./pdf/${id}.pdf"`), `${id} download link`);
  checkPdf(id, count);
}

function escapeHtml(text) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return text.replace(/[&<>"']/g, char => entities[char]);
}

assert.ok(catalog.includes('href="./cap.html"') && capGuide.includes('href="./pdf/cap-guide.pdf"'));
checkPdf('cap-guide', Object.keys(capGroups).reduce((pages, group) => pages + Math.ceil(capPatterns.filter(pattern => pattern.group === group).length / 2), 0));
for (const [id, label] of Object.entries(capGroups)) assert.ok(capGuide.includes(`id="group-${id}"><h2>${label}</h2>`));
for (const pattern of capPatterns) {
  assert.ok(pattern.steps.length >= 3 && pattern.prompt.length > 15 && pattern.answer.length > 15);
  assert.ok(capGuide.includes(`id="${pattern.id}"`));
  assert.ok(pattern.refs.length >= 2 && new Set(pattern.refs).size === pattern.refs.length);
  for (const id of pattern.refs) {
    const ref = capReferences.get(id);
    assert.equal(ref.subject, pattern.group, `${pattern.id} reference ${id}`);
    assert.ok(capGuide.includes(`href="../${ref.pdf}#page=${ref.page}"`));
    if (ref.analysis) assert.ok(capGuide.includes(`href="../${ref.analysis}"`));
  }
}
const referencedPapers = new Set([...capReferences.values()].map(ref => `${ref.year}-${ref.subject}`));
for (const year of capYears) for (const subject of Object.keys(capGroups)) {
  if (year.year === 109 && subject === 'listening') continue;
  assert.ok(referencedPapers.has(`${year.year}-${subject}`), `Missing targeted example for ${year.year} ${subject}`);
}
const capBank = JSON.parse(read('../cap-bank.json', 'utf8'));
for (const q of capBank.questions.filter(q => (q.subject === 'math' && [114, 115].includes(q.year)) || (q.subject === 'science' && q.year === 115))) {
  assert.ok(capReferences.has(q.id), `Missing item from the fully referenced paper: ${q.id}`);
}

for (const note of units) {
  assert.ok(lessonResources(note).includes(`./notes/chapters/${note.id}.html`), `${note.id} lesson integration`);
}
for (const note of addedNotes) {
  const source = officialSources[note.sourceId ?? officialAlignment[note.links[0]].sourceId];
  for (const [code, page] of note.refs) {
    assert.ok(source && page > 0 && page <= source.pages, `${note.id}: invalid source page for ${code}`);
    assert.ok(read(`chapters/${note.id}.html`, 'utf8').includes(`#page=${page}`), `${note.id}: source page link`);
  }
}

// Fourth-stage mathematics learning-content codes from the MOE outline, physical pages 38–46.
const ranges = {
  7: { N: 9, S: 5, G: 1, A: 8, D: 2 },
  8: { N: 6, S: 12, G: 1, A: 7, F: 2, D: 1 },
  9: { N: 1, S: 13, F: 2, D: 3 },
};
const mapped = new Set();
for (const unit of units.filter(unit => unit.subject === 'math')) {
  for (const ref of officialAlignment[unit.id].refs) if (ref.kind === '學習內容') mapped.add(ref.code);
}
for (const note of addedNotes.filter(note => note.subject === 'math')) {
  for (const [code] of note.refs) mapped.add(code);
}
const expected = Object.entries(ranges).flatMap(([grade, strands]) => Object.entries(strands).flatMap(([strand, count]) =>
  Array.from({ length: count }, (_, i) => `${strand}-${grade}-${i + 1}`)));
assert.equal(expected.length, 73);
assert.deepEqual([...mapped].sort(), expected.sort(), 'mathematics official learning-content index');
console.log(`✔ Curriculum notes verified: ${notes.length} HTML/PDF pairs, ${capIds.size} CAP chapters, ${capPatterns.length} patterns, ${capReferences.size} verified links, 73 math content references.`);
