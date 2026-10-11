import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { units, unitById, subjects, subjectById } from '../dist/curriculum.js';

const distDir = path.resolve('dist');

test('CAP Exam Bank - 109~115 (7 Years) Full Ingestion Integrity', () => {
  const bankPath = path.join(distDir, 'cap-bank.json');
  assert.ok(fs.existsSync(bankPath), 'dist/cap-bank.json must exist');
  
  const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  assert.equal(bank.questions.length, 1674, 'Must have exactly 1,674 questions');
  assert.equal(bank.groups.length, 173, 'Must have exactly 173 stimulus groups');
  
  const years = [109, 110, 111, 112, 113, 114, 115];
  const expectedPapers = 41; // 7 years x 6 subjects - 1 (109 listening was cancelled)
  
  const papers = new Set(bank.questions.map(q => `${q.year}-${q.subject}`));
  assert.equal(papers.size, expectedPapers, `Must have exactly ${expectedPapers} papers`);
  
  // Verify all years are present
  for (const yr of years) {
    const yrQs = bank.questions.filter(q => q.year === yr);
    assert.ok(yrQs.length > 0, `Year ${yr} must have questions`);
  }
});

test('CAP Exam Bank - 100% Pedagogical Explanations & 108 Curriculum Alignment', () => {
  const bank = JSON.parse(fs.readFileSync(path.join(distDir, 'cap-bank.json'), 'utf8'));
  const curriculumUnitIds = new Set(units.map(u => u.id));
  
  for (const q of bank.questions) {
    // 1. Explanation integrity
    assert.ok(q.explanation, `Question ${q.id} must have explanation`);
    assert.ok(typeof q.explanation.keyIdea === 'string' && q.explanation.keyIdea.length > 0, `Question ${q.id} must have keyIdea`);
    assert.ok(Array.isArray(q.explanation.steps) && q.explanation.steps.length >= 2, `Question ${q.id} must have at least 2 steps`);
    assert.ok(typeof q.explanation.skill === 'string' && q.explanation.skill.length > 0, `Question ${q.id} must have skill label`);
    
    // 2. 108 Curriculum unit links
    assert.ok(Array.isArray(q.unitIds) && q.unitIds.length > 0, `Question ${q.id} must have unitIds`);
    for (const uid of q.unitIds) {
      assert.ok(curriculumUnitIds.has(uid), `Question ${q.id} unitId "${uid}" must exist in 108 curriculum`);
    }
    
    // 3. Question crops integrity
    assert.ok(Array.isArray(q.crops) && q.crops.length > 0, `Question ${q.id} must have image crops`);
    
    // 4. Answer / Rubric integrity
    if (q.kind === 'written') {
      assert.ok(Array.isArray(q.explanation.rubric) && q.explanation.rubric.length > 0, `Written question ${q.id} must have grading rubric`);
    } else {
      assert.ok(['A', 'B', 'C', 'D'].includes(q.answer), `Choice question ${q.id} must have valid answer A/B/C/D, got ${q.answer}`);
    }
  }
});

test('CAP English Listening - Official MP3 Files Existence on Disk', () => {
  const bank = JSON.parse(fs.readFileSync(path.join(distDir, 'cap-bank.json'), 'utf8'));
  const listeningQs = bank.questions.filter(q => q.subject === 'listening');
  assert.equal(listeningQs.length, 126, '110~115 listening must have 126 questions (6 years x 21 questions)');
  
  for (const q of listeningQs) {
    assert.ok(q.audio, `Listening question ${q.id} must have audio`);
    const audioRel = typeof q.audio === 'string' ? q.audio : q.audio.src;
    const audioPath = path.join(distDir, audioRel);
    assert.ok(fs.existsSync(audioPath), `Audio file ${audioRel} must exist on disk`);
    const stats = fs.statSync(audioPath);
    assert.ok(stats.size > 1000, `Audio file ${audioRel} must be non-trivial (>1KB)`);
  }
});

test('CAP Question Image Crops - WebP Files Verification', () => {
  const bank = JSON.parse(fs.readFileSync(path.join(distDir, 'cap-bank.json'), 'utf8'));
  // Verify a representative sample of question crops across all years
  for (let i = 0; i < bank.questions.length; i += 25) {
    const q = bank.questions[i];
    for (const crop of q.crops) {
      const cropPath = path.join(distDir, crop.src);
      assert.ok(fs.existsSync(cropPath), `Crop image ${crop.src} must exist on disk`);
      const stats = fs.statSync(cropPath);
      assert.ok(stats.size > 500, `Crop image ${crop.src} must have valid size`);
    }
  }
});
