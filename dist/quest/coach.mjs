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
  if (item.type === 'match') return '已完成全部概念配對';
  if (item.type === 'build') return item.answer;
  return String(item.answer || '');
}
