// dist/quest/coach.mjs
// Pedagogical coach tips, explanation parsing and spoken prompts

export function correctionTip(item, chosen) {
  if (!item) return '仔細審題，留意概念的成立條件與限制範圍。';
  if (item.why) {
    // Extract first sentence of why
    const m = String(item.why).match(/^([^。！？\n]+[。！？])/);
    if (m) return m[1];
  }
  return '先回到觀念起點，分清楚已知條件與待求結論。';
}

export function answerText(item) {
  if (!item) return '';
  if (item.type === 'match') return (item.pairs || []).map(([a, b]) => `${a}：${b}`).join('；');
  if (item.type === 'build') return item.answer;
  return String(item.answer ?? '');
}

export function questionText(item) {
  if (!item) return '';
  if (item.type === 'info') return [item.title, item.formula, item.body, item.example].filter(Boolean).join('。');
  return [item.readingGroupText, item.prompt,
    ...(item.options || []).map((o, i) => `選項 ${i + 1}：${o}`),
    item.crops?.length ? '本題含圖片，朗讀僅涵蓋文字，請對照題圖。' : ''
  ].filter(Boolean).join('。');
}

export function repairSteps(item, chosen) {
  const specific = item.optionExplanations?.[chosen];
  return [specific || correctionTip(item, chosen),
    item.hint || '先說出題目要求，再圈出支持答案的條件。',
    '看懂後先用自己的話說明理由，再繼續；稍後錯題重練時，試著不看提示作答。'];
}
