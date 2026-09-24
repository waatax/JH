import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');

console.log('--- 1. Testing Core HTML & CSS Assets ---');
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');
if (!indexHtml.includes('./style.css') || !indexHtml.includes('./app.js')) {
  throw new Error('index.html missing core asset references');
}
if (!fs.existsSync(path.join(root, 'style.css'))) {
  throw new Error('style.css does not exist');
}
console.log('✔ Core assets verified.');

console.log('--- 2. Testing GSAT Database & Catalog ---');
const dbPath = path.join(root, 'gsat-database.json');
if (!fs.existsSync(dbPath)) throw new Error('gsat-database.json missing');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
if (db.exams.length !== 53) throw new Error(`Expected 53 exams, got ${db.exams.length}`);
if (db.questions.length !== 2216) throw new Error(`Expected 2216 questions, got ${db.questions.length}`);
console.log(`✔ GSAT database verified: ${db.exams.length} exams, ${db.questions.length} questions.`);

console.log('--- 3. Testing GSAT PDF Files Existence on Disk ---');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'gsat-manifest.json'), 'utf-8'));
let missingGsatPdfs = 0;
for (const f of manifest.files) {
  const filePath = path.join(root, f.local_path);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing PDF: ${f.local_path}`);
    missingGsatPdfs++;
  }
}
if (missingGsatPdfs > 0) {
  throw new Error(`${missingGsatPdfs} GSAT PDF files missing!`);
}
console.log(`✔ All ${manifest.files.length} GSAT PDF files exist on disk.`);

console.log('--- 4. Testing GSAT Standalone Catalog HTML ---');
const gsatCatalogHtml = path.join(root, 'downloads', 'gsat', 'index.html');
if (!fs.existsSync(gsatCatalogHtml)) throw new Error('dist/downloads/gsat/index.html missing');
console.log('✔ GSAT standalone catalog HTML exists.');

console.log('--- 5. Testing Handouts and CAP Manifests ---');
const capMf = JSON.parse(fs.readFileSync(path.join(root, 'cap-manifest.json'), 'utf-8'));
const handoutsMf = JSON.parse(fs.readFileSync(path.join(root, 'handouts-manifest.json'), 'utf-8'));
console.log(`✔ CAP files: ${capMf.files.length}, Handout files: ${handoutsMf.files.length}.`);

console.log('--- 6. Testing Module Imports in Node Environment ---');
await import('../dist/curriculum.js');
await import('../dist/exam-bank.js');
await import('../dist/sources.js');
await import('../dist/engine.js');
await import('../dist/labs.js');
await import('../dist/diagrams.js');
await import('../dist/teaching.js');
await import('../dist/worked-cases.js');
await import('../dist/supplements.js');
await import('../dist/study-library.js');
await import('../dist/gsat-interactive.js');
console.log('✔ All ESM modules load and evaluate cleanly.');

console.log('\n========================================');
console.log('🎉 ALL INTEGRATION TESTS PASSED 100%!');
console.log('========================================');
