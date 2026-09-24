import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {units,unitById} from '../dist/curriculum.js';
import {reviewedQuestions} from '../dist/cap-reviewed.js';
const read=p=>JSON.parse(fs.readFileSync('dist/'+p,'utf8'));
const data=read('alignment-data.json'),cap=read('cap-manifest.json'),handouts=read('handouts-manifest.json');
const analyses=read('cap-analysis-manifest.json');
assert.equal(analyses.files.length,30);
for(const f of analyses.files){const b=fs.readFileSync('dist/'+f.path);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256)}
assert.deepEqual(cap.years,[109,110,111,112,113,114,115]);
assert.equal(new Set(cap.files.map(f=>f.year+'-'+f.subject)).size,cap.files.length);
for(const year of cap.years){for(const s of ['chinese','english','math','social','science','writing','answers','notes',...(year>109?['listening']:[])])assert(cap.files.some(f=>f.year===year&&f.subject===s&&f.status==='downloaded'),`Missing ${year} ${s}`)}
for(const f of cap.files){assert.equal(f.status,'downloaded');const buffer=fs.readFileSync('dist/'+f.path);assert.equal(buffer.length,f.bytes);assert.equal(crypto.createHash('sha256').update(buffer).digest('hex'),f.sha256);assert(buffer.subarray(0,4).equals(Buffer.from('%PDF'))||buffer.subarray(0,2).equals(Buffer.from('PK')))}
assert.equal(handouts.files.length,units.length);assert.equal(new Set(handouts.files.map(f=>f.unitId)).size,units.length);
for(const f of handouts.files){assert(unitById[f.unitId]);assert(fs.readFileSync('dist/'+f.path).subarray(0,5).equals(Buffer.from('%PDF-')));assert(f.pages>=1)}
assert(fs.existsSync('dist/downloads/handouts-all.zip'));
assert.equal(new Set(data.books.map(b=>b.id)).size,data.books.length);
assert.equal(new Set(data.questions.map(q=>q.id)).size,data.questions.length);
assert.equal(new Set(data.knowledge.map(k=>k.id)).size,data.knowledge.length);
for(const k of data.knowledge)assert(unitById[k.unitId]);
for(const q of data.questions){assert(['pending','partial','covered'].includes(q.status));assert(fs.existsSync('dist/'+q.sourcePath));q.unitIds.forEach(id=>assert(unitById[id]));if(q.status!=='pending'){assert(q.required.length&&q.evidence&&q.reviewedAt);assert(reviewedQuestions.some(r=>r.id===q.id))}}
for(const b of data.books){assert([7,8,9].includes(b.grade)&&[1,2].includes(b.term));assert(new URL(b.sourceUrl).protocol==='https:');b.chapters.forEach(c=>c.unitIds.forEach(id=>assert(unitById[id])))}
assert.equal(data.summary.pending,data.questions.filter(q=>q.status==='pending').length);
for(const q of data.questions){if(q.year>=111&&q.subject!=='writing'){assert(q.officialObjective&&q.officialCodes.length,`Missing official objective: ${q.id}`);assert(fs.existsSync('dist/'+q.analysisPath));assert(Number.isInteger(q.analysisPage)&&q.analysisPage>0)}(q.candidateUnitIds||[]).forEach(id=>assert(unitById[id]));if(q.status==='pending')assert.equal(q.unitIds.length,0,'Candidates must never become verified coverage');}
console.log(`Verified ${cap.files.length} official files, ${handouts.files.length} handouts, ${data.questions.length} question records; unreviewed records remain pending.`);
