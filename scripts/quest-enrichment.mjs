// New retrieval activities grounded in each unit's existing comparison table.
// Count distinct activities, excluding duplicate boss-pool references.
export function enrichUnit(unit, table, baselineCount) {
  const rows = (table?.rows || []).filter(r => r[0] && r[1]);
  const needed = Math.max(2, Math.ceil(baselineCount * 0.1));
  const items = [];
  for (let i = 0; i < rows.length && items.length < needed; i++) {
    const row = rows[i];
    // Repeated criteria cannot establish an unambiguous correct answer.
    if (rows.filter(r => r[1] === row[1]).length !== 1) continue;
    const alternatives = rows.filter(r => r[0] !== row[0] && r[1] !== row[1]);
    const options = [...new Set([row[0], ...alternatives.map(r => r[0])])].slice(0, 4);
    if (options.length < 2) continue;
    const optionExplanations = Object.fromEntries(options.map(label => {
      const other = rows.find(r => r[0] === label);
      return [label, label === row[0] ? `符合判準：${row[1]}` : `你選的「${label}」在本表的判準是「${other[1]}」。題目指定的是「${row[1]}」，應對應「${row[0]}」。`];
    }));
    items.push({
      id: `enrich.${unit.id}.${i}`, unitId: unit.id, kind: 'reasoning', type: 'choice', level: 2,
      prompt: `【判準辨識｜${unit.title}】在「${table.title || unit.title}」比較表中，哪一項對應以下判準？\n${row[1]}`,
      options: options.slice(i % options.length).concat(options.slice(0, i % options.length)),
      answer: row[0], hint: `先回想各選項的定義；找出能完整符合「${row[1]}」的項目。`,
      why: `判準：${row[0]} → ${row[1]}。${row[2] ? `例子或補充：${row[2]}。` : ''}\n比較：${alternatives.slice(0, 2).map(r => `${r[0]} → ${r[1]}`).join('；')}。\n回想練習：遮住解析，說明這些項目的差異，再回到單元例題檢查自己的理解。`,
      optionExplanations, sourceBasis: `teachingTables.${unit.id}`, enrichment: true
    });
  }
  if (items.length < needed) throw Error(`${unit.id}: only ${items.length}/${needed} unambiguous enrichment activities`);
  return items;
}
