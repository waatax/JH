import assert from 'node:assert/strict';
import fs from 'node:fs';
import { units, subjects, subjectById } from '../dist/curriculum.js';
import { officialAlignment, officialSources } from '../dist/official-alignment-data.js';
import { lessonResources } from '../dist/study-library.js';
import { addedNotes } from './curriculum-note-supplements.mjs';

const root = new URL('../dist/notes/', import.meta.url);
const read = (relative, encoding) => fs.readFileSync(new URL(relative, root), encoding);
const catalog = read('index.html', 'utf8');
const notes = [...units, ...addedNotes];
assert.equal(new Set(notes.map(note => note.id)).size, notes.length, 'duplicate note ID');
assert.equal(new Set(notes.map(note => subjectById[note.subject].domain)).size, 8);
assert.equal(new Set(notes.map(note => note.subject)).size, subjects.length);
assert.equal(new Set(addedNotes.map(note => subjectById[note.subject].domain)).size, 8);

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
  checkPdf(note.id, 1);
}

for (const grade of [7, 8, 9]) for (const term of [1, 2]) {
  const id = `semester-${grade}-${term}`;
  const count = notes.filter(note => note.grade === grade && note.term === term).length;
  assert.ok(catalog.includes(`href="./pdf/${id}.pdf"`), `${id} download link`);
  checkPdf(id, count);
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
console.log(`✔ Curriculum notes verified: ${notes.length} HTML/PDF pairs, 6 semester packs, 73 math content references.`);
