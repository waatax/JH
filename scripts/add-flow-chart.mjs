// scripts/add-flow-chart.mjs
import fs from 'node:fs';

const filePath = 'dist/teaching.js';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `export function renderTeaching(u) {
 const t=teachingFor(u);
 const pts=knowledgePoints(u);
 return \`<section class="teaching-notes" aria-label="逐點學習與比較表"><div class="teaching-notes-header"><div class="teaching-notes-title-wrap"><span class="teaching-badge">📊 108課綱核心知識點矩陣</span><h3>拆開理解，再連起來：\${esc(u.title)}</h3></div><div class="knowledge-chips-row" role="list" aria-label="學習維度導覽"><span class="knowledge-chip" role="listitem">🎯 核心概念</span><span class="knowledge-chip" role="listitem">⚖️ 判準法則</span><span class="knowledge-chip" role="listitem">🔍 實證檢驗</span><span class="knowledge-chip" role="listitem">🛡️ 避坑防護</span></div></div><ol class="knowledge-list">\${pts.map((p,i)=>\`<li><span class="knowledge-point-tag">📌 知識要點 \${i+1}</span><strong>\${esc(p)}。</strong></li>\`).join('')}</ol><div class="table-wrap"><table class="teaching-table"><caption>\${esc(t.title)}</caption><thead><tr><th scope="col">辨識重點</th><th scope="col">規則／條件</th><th scope="col">例子／檢查方法</th></tr></thead><tbody>\${t.rows.map(row=>{const isCore=row[0].includes('核心判準');const isDefense=row[0].includes('易錯防線');const rowCls=isCore?' class="row-highlight-core"':(isDefense?' class="row-highlight-defense"':'');const icon=getRowIcon(row[0]);return \`<tr\${rowCls}>\${row.map((v,i)=>i===0?\`<th scope="row"><span class="row-icon" aria-hidden="true">\${icon}</span> \${esc(v)}</th>\`:\`<td>\${esc(v)}</td>\`).join('')}</tr>\`;}).join('')}</tbody></table></div><details class="worked-retrieval"><summary>先遮住講義：我能解釋「\${esc(u.title)}」嗎？</summary><p>先口頭說出核心概念，再展開上表核對。最後完成這項遷移任務：</p><p>\${esc(u.task)}</p><p class="subtle">能認出答案只是第一步；還要能說明理由、條件，以及何時不能套用。</p></details></section>\`;
}`;

// Normalize line breaks for matching
const normContent = content.replace(/\r\n/g, '\n');
const normTarget = targetStr.replace(/\r\n/g, '\n');

if (!normContent.includes(normTarget)) {
  console.error('Target not found in content!');
  process.exit(1);
}

const replacement = `function getDomainMeta(subject) {
  if (['math'].includes(subject)) return { icon: '📐', label: '數理邏輯' };
  if (['biology', 'physics', 'chemistry', 'earth'].includes(subject)) return { icon: '🔬', label: '自然探究' };
  if (['chinese', 'english', 'local'].includes(subject)) return { icon: '✍️', label: '語文溝通' };
  if (['history', 'geography', 'civics'].includes(subject)) return { icon: '🌍', label: '社會人文' };
  if (['visual', 'music', 'performing'].includes(subject)) return { icon: '🎨', label: '藝術素養' };
  if (['computing', 'technology'].includes(subject)) return { icon: '💡', label: '科技實踐' };
  if (['health', 'pe'].includes(subject)) return { icon: '🏃', label: '健體身心' };
  return { icon: '🧭', label: '綜合素養' };
}

export function renderKnowledgeFlowChart(u, pts, t) {
  const meta = getDomainMeta(u.subject);
  const firstPt = pts && pts[0] ? pts[0] : u.concept;
  const keyRow = t && t.rows && t.rows[0] ? t.rows[0] : [u.title, u.concept, u.example];
  const keyRule = keyRow[0] + '：' + keyRow[1];
  return \`<div class="teaching-visual-chart" aria-label="\${esc(u.title)} 視覺學習掌握圖解">
    <div class="teaching-chart-header">
      <div class="teaching-chart-meta">
        <span class="teaching-chart-domain-badge"><span aria-hidden="true">\${meta.icon}</span> \${meta.label}</span>
        <span class="teaching-chart-step-badge">📈 108課綱思維掌握歷程</span>
      </div>
      <h4 class="teaching-chart-title">學習掌握思維圖解：從觀念啟發到遷移實戰</h4>
    </div>
    <div class="teaching-flow-grid" role="list">
      <div class="flow-card flow-card-core" role="listitem">
        <div class="flow-card-badge"><span aria-hidden="true">🎯</span> 概念起點</div>
        <div class="flow-card-body">
          <h5 class="flow-card-title">\${esc(u.title)}</h5>
          <p class="flow-card-text">\${esc(firstPt)}。</p>
        </div>
      </div>
      <div class="flow-connector" aria-hidden="true">
        <svg class="flow-arrow-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div class="flow-card flow-card-rule" role="listitem">
        <div class="flow-card-badge"><span aria-hidden="true">⚖️</span> 判準法則</div>
        <div class="flow-card-body">
          <h5 class="flow-card-title">關鍵判斷規律</h5>
          <p class="flow-card-text">\${esc(keyRule)}</p>
        </div>
      </div>
      <div class="flow-connector" aria-hidden="true">
        <svg class="flow-arrow-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div class="flow-card flow-card-pitfall" role="listitem">
        <div class="flow-card-badge"><span aria-hidden="true">🛡️</span> 避坑防護</div>
        <div class="flow-card-body">
          <h5 class="flow-card-title">易錯界線檢查</h5>
          <p class="flow-card-text">\${esc(u.pitfall)}</p>
        </div>
      </div>
      <div class="flow-connector" aria-hidden="true">
        <svg class="flow-arrow-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div class="flow-card flow-card-task" role="listitem">
        <div class="flow-card-badge"><span aria-hidden="true">🚀</span> 遷移解題</div>
        <div class="flow-card-body">
          <h5 class="flow-card-title">實戰素養任務</h5>
          <p class="flow-card-text">\${esc(u.task)}</p>
        </div>
      </div>
    </div>
  </div>\`;
}

export function renderTeaching(u) {
 const t=teachingFor(u);
 const pts=knowledgePoints(u);
 const chartHtml = renderKnowledgeFlowChart(u, pts, t);
 return \`<section class="teaching-notes" aria-label="逐點學習與比較表"><div class="teaching-notes-header"><div class="teaching-notes-title-wrap"><span class="teaching-badge">📊 108課綱核心知識點矩陣</span><h3>拆開理解，再連起來：\${esc(u.title)}</h3></div><div class="knowledge-chips-row" role="list" aria-label="學習維度導覽"><span class="knowledge-chip" role="listitem">🎯 核心概念</span><span class="knowledge-chip" role="listitem">⚖️ 判準法則</span><span class="knowledge-chip" role="listitem">🔍 實證檢驗</span><span class="knowledge-chip" role="listitem">🛡️ 避坑防護</span></div></div>\${chartHtml}<ol class="knowledge-list">\${pts.map((p,i)=>\`<li><span class="knowledge-point-tag">📌 知識要點 \${i+1}</span><strong>\${esc(p)}。</strong></li>\`).join('')}</ol><div class="table-wrap"><table class="teaching-table"><caption>\${esc(t.title)}</caption><thead><tr><th scope="col">辨識重點</th><th scope="col">規則／條件</th><th scope="col">例子／檢查方法</th></tr></thead><tbody>\${t.rows.map(row=>{const isCore=row[0].includes('核心判準');const isDefense=row[0].includes('易錯防線');const rowCls=isCore?' class="row-highlight-core"':(isDefense?' class="row-highlight-defense"':'');const icon=getRowIcon(row[0]);return \`<tr\${rowCls}>\${row.map((v,i)=>i===0?\`<th scope="row"><span class="row-icon" aria-hidden="true">\${icon}</span> \${esc(v)}</th>\`:\`<td>\${esc(v)}</td>\`).join('')}</tr>\`;}).join('')}</tbody></table></div><details class="worked-retrieval"><summary>先遮住講義：我能解釋「\${esc(u.title)}」嗎？</summary><p>先口頭說出核心概念，再展開上表核對。最後完成這項遷移任務：</p><p>\${esc(u.task)}</p><p class="subtle">能認出答案只是第一步；還要能說明理由、條件，以及何時不能套用。</p></details></section>\`;
}`;

const newContent = normContent.replace(normTarget, replacement);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated dist/teaching.js with renderKnowledgeFlowChart!');
