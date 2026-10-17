import fs from 'node:fs';
import {units} from '../dist/curriculum.js';
const data=JSON.parse(fs.readFileSync('dist/alignment-data.json','utf8'));
const result=Object.fromEntries(units.map(u=>[u.id,[]]));
for(const book of data.books)for(const chapter of book.chapters){
 for(const id of chapter.unitIds||[]){
  if(!result[id])throw Error(`Unknown alignment unit: ${id}`);
  result[id].push({title:`${book.publisher} ${book.grade}年級${book.term===1?'上':'下'}：${chapter.lesson}`,codes:chapter.codes||[],url:book.sourceUrl,kind:book.sourceKind});
 }
}
fs.writeFileSync('dist/lesson-alignment.js','// Chapter associations from existing source records; NOT verified official coverage.\nexport const lessonAlignment = '+JSON.stringify(result,null,2)+';\n');
console.log(`Alignment references: ${Object.values(result).filter(x=>x.length).length}/${units.length}; remaining units explicitly pending.`);
