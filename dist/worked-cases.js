import {mathCases} from './cases-math.js';
import {languageCases} from './cases-language.js';
import {scienceCases} from './cases-science.js';
import {socialCases} from './cases-social.js';
import {lifeCases} from './cases-life.js';

export const workedCases = Object.create(null);
for (const line of [mathCases,languageCases,scienceCases,socialCases,lifeCases].join('\n').split('\n').filter(s=>s.trim())) {
 const fields=line.split('|');
 if(fields.length!==5)throw new Error('Invalid worked example: '+fields[0]);
 const [id,teaching,problem,steps,check]=fields;
 if(workedCases[id])throw new Error('Duplicate worked example: '+id);
 workedCases[id]={teaching,problem,steps:steps.split('~'),check};
}
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderWorkedCase(u){
 const c=workedCases[u.id];
 if(!c)return '';
 return `<section class="worked-case" aria-labelledby="worked-case-title"><h3 id="worked-case-title">再學深一點：觀念到解題</h3><p class="case-teaching">${esc(c.teaching)}</p><div class="case-problem"><strong>原創示範題／情境任務</strong><p>${esc(c.problem)}</p></div><details class="case-solution"><summary>先想一想，再看分步解析</summary><ol>${c.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol><div class="case-check"><strong>驗算與適用界線</strong><p>${esc(c.check)}</p></div></details><p class="subtle">先說出已知條件與判斷依據，再展開解析核對；實作科目重視過程與合理解釋。</p></section>`;
}
