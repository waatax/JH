// Shared, honest presentation contract for CAP and Quest.
export function getCapExplanation(q) {
  const ex = q?.explanation || {};
  if (ex.provenance?.status === 'ai-derived' && ex.answer === q.answer) return {...ex, label: 'AI 解題解析', ready: true};
  return {
    ready: false, label: 'AI 解析待補',
    keyIdea: q?.officialObjective || '請先閱讀原始題本與官方參考答案。',
    steps: ['本題的逐步推導尚未完成校訂。', '可先核對官方答案與原始題圖；目前不將通用解題提示列為逐題詳解。'],
    options: {}, trap: '', unitIds: ex.unitIds || [],
    rubric: q?.kind === 'written' ? ['請對照官方參考解法及評分資料自評。'] : []
  };
}

export function relatedCapQuestions(q, questions, limit = 3) {
  const objective = s => String(s || '').replace(/評量學生是否能|[\s，。、：]/g, '');
  const target = objective(q.officialObjective);
  return questions.filter(other => other.id !== q.id && other.subject === q.subject && other.kind !== 'written')
    .map(other => {
      const codes = (q.officialCodes || []).filter(code => other.officialCodes?.includes(code));
      const exact = target && objective(other.officialObjective) === target;
      return {other, score: (exact ? 100 : 0) + codes.length, basis: exact ? '相同評量目標' : `共同評量代碼：${codes.join('、')}`};
    }).filter(row => row.score > 0)
    .sort((a,b) => b.score - a.score || b.other.year - a.other.year || a.other.number - b.other.number)
    .slice(0, limit).map(({other, basis}) => ({
      id: other.id, title: `${other.year} 年第 ${other.number} 題`, basis,
      href: `#/cap-exam/${other.year}-${other.subject}?mode=practice&q=${other.number}`
    }));
}

export function formatCapExplanation(q) {
  const ex = getCapExplanation(q);
  const answer = q.kind === 'written' ? 'AI 非選擇題參考解法' : `官方參考答案：${q.answer}`;
  if (!ex.ready) return `${answer}。${ex.steps.join(' ')}`;
  return [answer, `【${ex.label}】${ex.keyIdea}`, ...ex.steps.map((s,i) => `${i + 1}. ${s}`),
    ...Object.entries(ex.options || {}).map(([letter, reason]) => `${letter}：${reason}`),
    ex.trap ? `提醒：${ex.trap}` : '', 'AI 推導已核對答案欄位，尚未經外部教師複核。'].filter(Boolean).join('\n\n');
}
