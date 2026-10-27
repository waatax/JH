// dist/quest/atlas.mjs
// Course progress overview map & Next adventure recommender

export function courseAtlas(course, game, activeTrackId) {
  if (!course?.index?.sections) return '';
  const sections = course.index.sections;
  const currentTrackId = activeTrackId || (game.currentTrack ? game.currentTrack() : 's1');

  return `
  <section class="course-atlas card" aria-label="三年六學期進度總覽">
    <div class="atlas-header">
      <div class="atlas-title-group">
        <h3>🗺️ 國中三年六學期學習地圖</h3>
        <span class="atlas-sub">108 課綱 · 188 個核心單元 · 點擊切換學期進度</span>
      </div>
      <div class="atlas-legend">
        <span class="legend-pill" title="全部六學期全科覆蓋">國 · 英 · 數 · 自 · 社 · 跨</span>
      </div>
    </div>
    <div class="atlas-grid">
      ${sections.map(s => {
        const uCount = s.units.length;
        const doneCount = s.units.filter(u => u.nodes?.every(n => {
          const st = game.nodeStatus(n.id);
          return st === 'done' || st === 'crowned';
        })).length;
        const isCurrent = currentTrackId === s.id;
        const pct = uCount ? Math.round((doneCount / uCount) * 100) : 0;
        return `
          <button class="atlas-chip ${s.id} ${isCurrent ? 'active' : ''}" data-act="track" data-id="${s.id}" title="${s.title} · ${s.level}">
            <div class="atlas-chip-badge">${s.no ? `第 ${s.no} 段` : ''}</div>
            <div class="atlas-chip-top">
              <span class="atlas-icon">${s.icon || '📚'}</span>
              <b>${s.title}</b>
            </div>
            <div class="atlas-chip-sub">
              <span>${s.level}</span>
              <span class="atlas-pct">${pct}%</span>
            </div>
            <div class="atlas-bar"><span style="width: ${pct}%"></span></div>
          </button>
        `;
      }).join('')}
    </div>
  </section>`;
}

export function nextAdventure(game, course, currentTrackId) {
  const track = course.track(currentTrackId) || course.index.sections[0];
  if (!track) return { title: '開始今日學習', text: '探索 108 課綱各科核心觀念。', mode: 'lesson', id: 'math-1:concept', label: '開始' };

  // Find next available uncompleted node
  for (const u of track.units) {
    for (const n of u.nodes) {
      const status = game.nodeStatus(n.id);
      if (status === 'available') {
        return {
          title: `繼續推進：${u.title}`,
          text: `下一關「${n.title}」已經就緒，弄懂觀念，累積學習能量！`,
          mode: n.kind === 'boss' ? 'boss' : 'lesson',
          id: n.id,
          label: n.kind === 'boss' ? '挑戰金冠 👑' : '開始闖關 🌱'
        };
      }
    }
  }

  return {
    title: `恭喜完成本段！`,
    text: `本段落所有關卡皆已通過，可以前往下一段或進行段考/會考衝刺！`,
    mode: 'review',
    id: track.units[0]?.id || 'math-1',
    label: '前往複習'
  };
}
