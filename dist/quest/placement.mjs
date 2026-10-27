// dist/quest/placement.mjs
// 10 / 20 / 30 question placement diagnostic test across Grades 7-9 & subjects

export function makePlacement(size = 20, course) {
  const allItems = [...course.items.values()].filter(it => it.type === 'choice' && it.unitId);
  const sections = ['s1', 's2', 's3', 's4', 's5', 's6'];
  const queue = [];

  // Stratified sample across s1..s6
  const perSec = Math.max(1, Math.floor(size / sections.length));
  for (const s of sections) {
    const secItems = allItems.filter(it => {
      const u = course.units.get(it.unitId);
      return u && u.track === s;
    });
    const picked = secItems.slice(0, perSec);
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
  let recommended = 's1';
  if (accuracy >= 0.85) recommended = 's6';
  else if (accuracy >= 0.70) recommended = 's5';
  else if (accuracy >= 0.55) recommended = 's4';
  else if (accuracy >= 0.40) recommended = 's3';
  else if (accuracy >= 0.25) recommended = 's2';
  else recommended = 's1';

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
