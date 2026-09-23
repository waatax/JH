import assert from 'node:assert/strict';
import fs from 'node:fs';
import {subjects,domains,units,questions,unitById} from '../dist/curriculum.js';
import {extraQuestions,listening,constructed} from '../dist/exam-bank.js';
import {examSpecs,sources} from '../dist/sources.js';
import {getDiagram} from '../dist/diagrams.js';
const all=[...questions,...extraQuestions,...listening];
assert.equal(new Set(units.map(x=>x.id)).size,units.length);
assert.equal(new Set(all.map(x=>x.id)).size,all.length);
for(const s of subjects){assert(domains.includes(s.domain));assert(units.some(u=>u.subject===s.id))}
for(const u of units){assert([7,8,9].includes(u.grade));assert([1,2].includes(u.term));for(const k of ['concept','example','pitfall','task'])assert(u[k].length>12,`${u.id} missing ${k}`);assert.equal(u.questions.length,2)}
for(const q of all){assert(unitById[q.unitId],q.id);assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);assert(q.explanation.length>10,q.id);assert.equal(q.subject,unitById[q.unitId].subject)}
for(const spec of examSpecs){const pool=spec.id==='listening'?listening:[...questions,...extraQuestions].filter(q=>spec.subjects.includes(q.subject));assert(pool.length>=spec.count,`${spec.id}: only ${pool.length}, need ${spec.count}`)}
assert.equal(constructed.length,2);
for(const u of units){const d=getDiagram(u);assert(d.includes('<svg')&&d.includes('</svg>'),`Missing svg diagram for ${u.id}`)}
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.js')||f.endsWith('.html'))){const content=fs.readFileSync('dist/'+file,'utf8');for(const m of content.matchAll(/#\/lesson\/([a-z]+-\d+)/g))assert(unitById[m[1]],`${file}: broken lesson ${m[1]}`);for(const m of content.matchAll(/(?:from\s*|src=|href=)["'](\.\/[\w.-]+)["']/g))assert(fs.existsSync('dist/'+m[1]),`Missing asset ${m[1]}`)}
for(const s of sources)assert(new URL(s.url).protocol==='https:');
const summary={subjects:subjects.length,domains:domains.length,units:units.length,questions:all.length,lessonQuestions:questions.length,extraQuestions:extraQuestions.length,listening:listening.length,constructed:constructed.length};
console.log(JSON.stringify(summary,null,2));
fs.writeFileSync('docs/content-inventory.json',JSON.stringify({...summary,subjects:subjects.map(s=>({id:s.id,name:s.name,domain:s.domain,units:units.filter(u=>u.subject===s.id).length,questions:all.filter(q=>q.subject===s.id).length})),units:units.map(({id,subject,grade,term,title})=>({id,subject,grade,term,title}))},null,2));
