// Build diagrams from the SAME authored table row as their knowledge card.
// No scientific causality, numeric scale or textbook frequency is inferred from subject names.
const esc = value=>String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function wrapDiagramText(text, maxWidth=520, size=16) {
  const lines=[];
  let line='',width=0;
  for(const char of String(text)) {
    const advance=/[\u0000-\u00ff]/.test(char) ? size*.58 : size;
    if(width+advance>maxWidth && line) {lines.push(line);line='';width=0;}
    line+=char;width+=advance;
  }
  if(line)lines.push(line);
  return lines;
}

export function rowDiagram(row, theme, index) {
  const sections=[['概念',row[0]],['規則與特徵',row[1]],['實例與界線',row[2]]];
  let y=58;
  const blocks=sections.map(([label,text],i)=>{
    const lines=wrapDiagramText(text);
    const height=48+lines.length*24;
    const block=`<rect x="20" y="${y}" width="560" height="${height}" rx="12" fill="${i===2?'#fff9e9':'#ffffff'}" stroke="${theme.primary}" stroke-opacity=".3"/><text x="38" y="${y+25}" font-size="12" font-weight="700" fill="${theme.accent}">${label}</text><text x="38" y="${y+51}" font-size="16" fill="${theme.text}">${lines.map((line,n)=>`<tspan x="38" dy="${n?24:0}">${esc(line)}</tspan>`).join('')}</text>`;
    y+=height+12;
    return block;
  }).join('');
  const height=y+28;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 ${height}" class="kp-svg-infograph" role="img" aria-label="${esc(row[0])}：概念、規則與實例"><title>${esc(row[0])}</title><desc>依同一筆原創比較表整理。依序閱讀，不表示因果循環或數值比例。</desc><rect x="1" y="1" width="598" height="${height-2}" rx="16" fill="${theme.bg}" stroke="${theme.primary}" stroke-opacity=".3"/><text x="22" y="32" font-size="15" font-weight="700" fill="${theme.accent}">知識點 ${index+1} / 概念閱讀卡</text>${blocks}<text x="22" y="${height-14}" font-size="11" fill="${theme.text}">閱讀順序示意 · 不代表因果或數值比例</text></svg>`;
}

function numberLine(theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 230" class="kp-svg-infograph" role="img" aria-label="數線上負三與正三到零的距離相同，互為相反數"><title>−3 與 3 互為相反數</title><rect width="600" height="230" rx="16" fill="${theme.bg}"/><text x="24" y="35" fill="${theme.text}" font-size="18" font-weight="700">相反數：以 0 為中心對稱</text><line x1="50" x2="550" y1="125" y2="125" stroke="${theme.accent}" stroke-width="2"/>${[-4,-3,-2,-1,0,1,2,3,4].map(n=>`<line x1="${300+n*55}" x2="${300+n*55}" y1="118" y2="132" stroke="${theme.accent}"/><text x="${300+n*55}" y="154" text-anchor="middle" font-size="16" fill="${theme.text}">${n}</text>`).join('')}<circle cx="135" cy="125" r="7" fill="${theme.accent}"/><circle cx="465" cy="125" r="7" fill="${theme.accent}"/><path d="M135 106V82H300V106M300 82H465V106" fill="none" stroke="${theme.accent}" stroke-width="2"/><text x="218" y="70" text-anchor="middle" font-size="14" fill="${theme.text}">距離 3</text><text x="382" y="70" text-anchor="middle" font-size="14" fill="${theme.text}">距離 3</text><text x="300" y="200" text-anchor="middle" font-size="16" fill="${theme.text}">−3 的相反數是 3；0 的相反數仍是 0。</text></svg>`;
}

export function groundedKnowledge(u, table, theme, knowledgeNode, unitById) {
  const rows=table.rows.slice(0,3);
  if(rows.length!==3)throw Error(`${u.id}: needs three authored concept rows`);
  return rows.map((row,index)=>{
    const [label,rule,example]=row;
    const cross=knowledgeNode.crossLinks?.[index] || knowledgeNode.crossLinks?.[0];
    const crossUnit=unitById[cross?.unitId];
    const next=rows[(index+1)%rows.length];
    return {
      id:`${u.id}-kp-${index+1}`,unitId:u.id,order:index+1,
      title:`【知識點 ${index+1}】${label}`,
      core:`${label}：${rule}。`,
      mechanism:`對照判準與實例：${rule}。${example}。`,
      explanation:`辨認「${label}」時，先說出「${rule}」，再核對「${example}」。請用自己的話說明例子如何對應判準，並指出使用時需要注意的限制。`,
      formula:`${rule}｜實例與界線：${example}`,
      examIntel:`自我檢核：遮住說明，試著解釋「${example}」與「${rule}」的關係。`,
      practicalTip:`核對本點實例與界線：${example}`,
      bloom:['理解','應用','分析'][index],examWeight:1,
      source:{module:'teaching.js',unitId:u.id,row:index,kind:'本站原創比較表'},
      infograph:{type:u.id==='math-1' && index===0?'coordinate':index===1?'process':index===2?'contrast':'concept-card',title:`${label}｜規則與實例`,caption:u.id==='math-1' && index===0?'數線每格表示 1；−3 與 3 分別在 0 的兩側，到 0 的距離都是 3。':'依同一筆比較表整理概念、規則與實例。卡片排列是閱讀順序，不表示科學因果、循環或數值比例。',svg:u.id==='math-1' && index===0?numberLine(theme):rowDiagram(row,theme,index)},
      relatedKnowledge:{
        prerequisite:{title:'回到本課核心觀念',unitId:u.id,icon:'🔗',desc:u.concept},
        extension:{title:next[0],unitId:u.id,icon:'🚀',desc:`同課比較：${next[1]}。請說明與「${label}」的差別。`},
        crossDisciplinary:{title:crossUnit?.title || '把概念帶進生活',unitId:crossUnit?.id || null,badge:'探索提問',icon:'🌐',desc:crossUnit?'比較兩課使用的對象與條件，找出相同與不同處。關聯僅供探索，不表示規則可以直接互用。':u.task},
        synapseNote:`回想練習：遮住「${label}」的說明，先說出規則，再用「${example}」核對自己的理解。`
      }
    };
  });
}
