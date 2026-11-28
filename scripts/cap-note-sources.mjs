import fs from 'node:fs';
import { capGroups, capPatterns } from './cap-note-patterns.mjs';

const read = file => JSON.parse(fs.readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8'));
const { questions } = read('cap-bank.json');
const aligned = new Map(read('alignment-data.json').questions.map(q => [q.id, q]));
const bank = new Map(questions.map(q => [q.id, q]));
const manifest = read('cap-manifest.json');
const itemFiles = new Set([...manifest.files, ...manifest.derivedFiles].map(file => file.path));
const analysisFiles = new Set(read('cap-analysis-manifest.json').files.map(file => file.path));
export const capIndexUrl = 'https://cap.rcpet.edu.tw/examination.html';

export const capReferences = new Map([...new Set(capPatterns.flatMap(pattern => pattern.refs))].map(id => {
  const question = bank.get(id);
  const writing = /^(\d+)-writing$/.exec(id);
  if (!question && !writing) throw new Error(`Missing official CAP reference ${id}`);
  const year = question?.year ?? Number(writing[1]);
  const subject = question?.subject ?? 'writing';
  const pdf = `downloads/cap/${year}-${subject}.pdf`;
  const page = question?.page ?? 3;
  if (!itemFiles.has(pdf) || !Number.isInteger(page) || page < 1 || !fs.existsSync(new URL(`../dist/${pdf}`, import.meta.url))) {
    throw new Error(`Missing official CAP source for ${id}: ${pdf} page ${page}`);
  }
  const title = writing ? `${year} 年寫作測驗` : question.kind === 'written'
    ? `${year} 年數學非選第 ${question.number} 題`
    : `${year} 年${capGroups[subject]}第 ${question.number} 題`;
  const alignment = aligned.get(id);
  const provenance = question?.explanation?.provenance;
  const officialPath = provenance?.analysisSource?.path ?? alignment?.analysisPath;
  const officialPage = provenance?.analysisSource?.page ?? alignment?.analysisPage;
  const analysis = analysisFiles.has(officialPath) && Number.isInteger(officialPage) ? `${officialPath}#page=${officialPage}` : '';
  const practice = question?.kind === 'choice'
    ? `#/cap-exam/${year}-${subject}?mode=practice&q=${question.number}` : '';
  const hasDetailedDerivation = provenance?.status === 'ai-derived' && (question.kind === 'written'
    ? provenance.answerCheck === 'written-self-check' : provenance.answerCheck === 'matches-official' && question.explanation.answer === question.answer);
  return [id, { id, year, subject, title, pdf, page, analysis, practice, hasDetailedDerivation }];
}));

export const capYears = manifest.years.slice().sort((a, b) => b - a).map(year => ({
  year,
  items: Object.keys(capGroups).flatMap(subject => {
    const pdf = `downloads/cap/${year}-${subject}.pdf`;
    return itemFiles.has(pdf) ? [{ label: capGroups[subject], pdf }] : [];
  }),
  answers: `downloads/cap/${year}-answers.pdf`,
  notes: `downloads/cap/${year}-notes.pdf`,
  source: `https://cap.rcpet.edu.tw/exam/${year}/${year}exam.html`,
}));

const history = read('cap-historical-manifest.json').files;
export const archivedYears = history.filter(file => file.subject === 'answers' && ['regular', 'trial'].includes(file.kind))
  .map(file => ({ year: file.year, source: file.sourcePage })).sort((a, b) => b.year - a.year);
