import fs from 'node:fs';
import {units,subjects} from '../dist/curriculum.js';
import {teachingFor} from '../dist/teaching.js';
import {workedCases} from '../dist/worked-cases.js';
import {getDiagram} from '../dist/diagrams.js';
import {supplements} from '../dist/supplements.js';
fs.mkdirSync('tmp/pdfs',{recursive:true});
fs.writeFileSync('tmp/pdfs/lessons.json',JSON.stringify({subjects,units:units.map(u=>({...u,table:teachingFor(u),worked:workedCases[u.id],diagram:getDiagram(u),supplement:supplements[u.id]}))}));
