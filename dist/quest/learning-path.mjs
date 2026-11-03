// Learning recommendations use the visible scope and observed work, never XP as mastery.
export const DOMAINS = [
  {label:'語文', icon:'文', subjects:['chinese','english','local']},
  {label:'數學', icon:'數', subjects:['math']},
  {label:'自然', icon:'理', subjects:['biology','physics','chemistry','earth']},
  {label:'社會', icon:'社', subjects:['history','geography','civics']},
  {label:'科技', icon:'技', subjects:['computing','technology']},
  {label:'藝術', icon:'藝', subjects:['visual','music','performing']},
  {label:'健康與體育', icon:'健', subjects:['health','pe']},
  {label:'綜合活動', icon:'綜', subjects:['home','scout','guidance']}
];

export function visibleLearningUnits(track, {grade='all', category='all', subject='all', query=''} = {}) {
  const q = query.normalize('NFKC').trim().toLocaleLowerCase();
  return (track?.units || []).filter(u =>
    (grade === 'all' || u.grade === Number(grade)) &&
    (category === 'all' || u.category === category) &&
    (subject === 'all' || u.subject === subject) &&
    (!q || `${u.title} ${u.subjectName} ${u.pitfall || ''}`.normalize('NFKC').toLocaleLowerCase().includes(q)));
}

export function recommendLearning(units, game) {
  if (!units.length) return null;
  const due = new Set(game.dueUnits());
  const review = units.find(u => due.has(u.id));
  if (review) return {unit:review, mode:'review', id:review.id, reason:'這個單元到了回想時間。先不看筆記試一次。', label:'開始到期複習'};
  for (const unit of units) {
    const node = unit.nodes?.find(n => game.nodeStatus(n.id) === 'available');
    if (node) return {unit, mode:node.kind === 'boss' ? 'boss' : 'lesson', id:node.id, reason:`下一步：${node.title}。一般學習不限重試，提示隨時可用。`, label:node.kind === 'boss' ? '挑戰本單元' : '開始這一小關'};
  }
  return {unit:units[0], mode:'review', id:units[0].id, reason:'這個範圍已走過一輪，再用回想鞏固理解。', label:'回想複習'};
}

export function learningEvidence(course, state) {
  const units = course.index.sections.flatMap(s => s.units);
  return DOMAINS.map(domain => {
    const members = units.filter(u => domain.subjects.includes(u.subject));
    const ids = new Set(members.map(u => u.id));
    let trials = 0, independent = 0, questions = 0;
    for (const [id, record] of Object.entries(state.items)) {
      if (!ids.has(course.item(id)?.unitId) || !record.trials) continue;
      trials += record.trials;
      independent += record.independent || 0;
      questions++;
    }
    return {...domain, units:members.length, trials, independent, questions, rate:trials ? Math.round(100 * independent / trials) : null};
  });
}
