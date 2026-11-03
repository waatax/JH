// dist/quest/placement.mjs
// 10 / 20 / 30 question placement diagnostic test across Grades 7-9 & subjects

export function makePlacement(size = 20, course, seed = 0) {
  size = [10,20,30].includes(Number(size)) ? Number(size) : 20;
  const allItems = [...course.items.values()].filter(it => it.type === 'choice' && it.unitId);
  const sections = ['s1', 's2', 's3', 's4', 's5', 's6'];
  const queue = [];

  const rank = id => {
    let h = 2166136261;
    for (const c of `${seed}:${id}`) h = Math.imul(h ^ c.codePointAt(0), 16777619);
    return h >>> 0;
  };
  // Equal semester allocation, then one item per subject before repeating a subject.
  for (const [index, s] of sections.entries()) {
    const secItems = allItems.filter(it => {
      const u = course.units.get(it.unitId);
      return u && u.track === s;
    });
    const quota = Math.floor(size / sections.length) + (index < size % sections.length ? 1 : 0);
    const ranked = secItems.sort((a,b)=>rank(a.id)-rank(b.id));
    const subjects = new Set();
    const diverse = ranked.filter(it=>{
      const subject = course.units.get(it.unitId)?.subject;
      if (subjects.has(subject)) return false;
      subjects.add(subject);
      return true;
    });
    const picked = [...diverse, ...ranked.filter(it=>!diverse.includes(it))].slice(0,quota);
    queue.push(...picked);
  }

  // Fill up if needed
  while (queue.length < size && allItems.length > queue.length) {
    const next = allItems.find(it => !queue.includes(it));
    if (next) queue.push(next);
    else break;
  }

  return {
    version: 1,
    size: queue.length,
    slots: queue.map(it => ({ id: it.id, unitId: it.unitId }))
  };
}

export function placementReport(results, course) {
  let correct = 0;
  const bySection = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 };
  const totalBySection = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 };

  for (const r of results) {
    const it = course.item(r.id);
    const u = it ? course.units.get(it.unitId) : null;
    const s = u?.track || 's1';

    if (totalBySection[s] !== undefined) totalBySection[s]++;
    if (r.ok) {
      correct++;
      if (bySection[s] !== undefined) bySection[s]++;
    }
  }

  const accuracy = results.length ? correct / results.length : 0;
  // Suggest the earliest observed gap, without inferring untested semester ability.
  const measured = Object.keys(totalBySection).filter(s=>totalBySection[s]>0);
  const recommended = measured.find(s=>bySection[s] < totalBySection[s]) || measured[0] || 's1';

  return {
    mode: 'placement',
    total: results.length,
    firstTry: correct,
    accuracy,
    recommended,
    bySection,
    totalBySection
  };
}
