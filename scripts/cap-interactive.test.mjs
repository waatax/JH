import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { renderCapSourceArchive, renderCapAnalysis } from '../dist/cap-interactive.js';
import { renderPastpapersTrendGuide } from '../dist/pedagogy-visuals.js';
import { units, unitById, subjects, subjectById } from '../dist/curriculum.js';

const distDir = path.resolve('dist');

test('英聽分析不把缺少的等級比率當 0，也不顯示不存在的 D 選項',()=>{
  const html=renderCapAnalysis({answer:'B',optionLetters:'ABC',analysis:{passRate:0.8463,discrimination:0.59,passBySkill:{基礎:0.9848,待加強:0.5551},optionPercent:{A:7.52,B:84.63,C:7.69,D:0.08}}});
  assert.doesNotMatch(html,/精熟級通過率|\(D\)/);
  assert.match(html,/84.6%/);
  assert.match(html,/基礎級通過率/);
  const zero=renderCapAnalysis({optionLetters:'ABC',analysis:{passRate:0,discrimination:0,passBySkill:{精熟:0}}});
  assert.match(zero,/精熟級通過率：<strong>0%/);
});

test('官方早期典藏 66 份檔案格式、雜湊與獨立來源完整', () => {
  const manifest=JSON.parse(fs.readFileSync(path.join(distDir,'cap-historical-manifest.json'),'utf8'));
  assert.equal(manifest.files.length,66);
  const identities=new Set();
  for(const file of manifest.files) {
    const identity=`${file.year}-${file.kind}-${file.subject}`;
    assert.ok(!identities.has(identity),identity);
    identities.add(identity);
    assert.equal(file.status,'downloaded',identity);
    assert.equal(file.questionImportStatus,'not-split');
    assert.match(file.sourceUrl,/^https:\/\/drive\.google\.com\/file\/d\//);
    assert.match(file.sourcePage,/^https:\/\/cap\.rcpet\.edu\.tw\/exam\//);
    const data=fs.readFileSync(path.join(distDir,file.path));
    assert.equal(data.length,file.bytes,identity);
    assert.equal(createHash('sha256').update(data).digest('hex'),file.sha256,identity);
    if(file.path.endsWith('.pdf')) assert.equal(data.subarray(0,5).toString(),'%PDF-');
    else if(file.path.endsWith('.zip')) assert.equal(data.subarray(0,4).toString('hex'),'504b0304');
    else assert.ok(data.subarray(0,3).toString()==='ID3' || (data[0]===255 && (data[1]&224)===224));
  }
  const html=renderCapSourceArchive(manifest.files);
  assert.match(html,/102 年試辦會考/);
  assert.match(html,/105 年新店考場重考/);
  assert.match(html,/未計入上方互動題庫題數/);
  for(const file of manifest.files) assert.ok(html.includes(`href="${file.path}"`));
});

test('年度進度圖從題庫實際計數，不呈現無來源的命題百分比',()=>{
  const bank=JSON.parse(fs.readFileSync(path.join(distDir,'cap-bank.json'),'utf8'));
  const html=renderPastpapersTrendGuide(bank);
  assert.doesNotMatch(html,/32%|68%|英聽停考|佔絕對主導/);
  assert.match(html,/AI 解析 237 題/);
  assert.match(html,/AI 解析 48 題/);
  for(const year of [109,110,111,112,113,114,115]) {
    const count=bank.questions.filter(q=>q.year===year).length;
    assert.ok(html.includes(`收錄 ${count} 題`));
  }
});

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

test('CAP Exam Bank - Explanation Record Structure & Valid Curriculum References', () => {
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
