import { test } from 'node:test';
import assert from 'node:assert/strict';
import { units } from '../dist/curriculum.js';
import { explicitKnowledgePoints, getExplicitKnowledgePoints, renderExplicitKnowledgePoints } from '../dist/explicit-knowledge-points.js';

test('1. Explicit Knowledge Points: 100% 188 units coverage and structural integrity', () => {
  assert.equal(units.length, 188, 'Must have 188 units');
  assert.equal(Object.keys(explicitKnowledgePoints).length, 188, 'All 188 units must be mapped');

  for (const u of units) {
    const points = getExplicitKnowledgePoints(u);
    assert(Array.isArray(points), `${u.id}: points must be an array`);
    assert(points.length >= 3, `${u.id}: must have at least 3 explicit knowledge points, got ${points.length}`);

    for (const kp of points) {
      assert(kp.id && kp.id.startsWith(u.id), `${u.id}: invalid kp id ${kp.id}`);
      assert(kp.title && kp.title.length > 5, `${u.id}: title too short`);
      assert(kp.core && kp.core.length > 5, `${u.id}: core too short`);
      assert(kp.explanation && kp.explanation.length >= 50, `${u.id}: explanation too short: ${kp.explanation.length}`);
      assert(kp.formula && kp.formula.length > 5, `${u.id}: formula too short`);
      assert(kp.practicalTip && kp.practicalTip.length > 5, `${u.id}: practicalTip too short`);
      assert(['記憶', '理解', '應用', '分析', '綜合'].includes(kp.bloom), `${u.id}: invalid bloom level ${kp.bloom}`);
      assert([1, 2, 3].includes(kp.examWeight), `${u.id}: invalid examWeight`);
      
      // Infograph verification
      assert(kp.infograph, `${u.id}: missing infograph`);
      assert(kp.infograph.title && kp.infograph.title.length > 3, `${u.id}: infograph title too short`);
      assert(kp.infograph.caption && kp.infograph.caption.length > 3, `${u.id}: infograph caption too short`);
      assert(kp.infograph.svg && kp.infograph.svg.includes('<svg') && kp.infograph.svg.includes('</svg>'), `${u.id}: invalid SVG in infograph`);
      assert(kp.infograph.svg.includes('kp-svg-infograph'), `${u.id}: SVG missing class kp-svg-infograph`);

      // Related Knowledge Points & Synapses verification
      assert(kp.relatedKnowledge, `${u.id}: missing relatedKnowledge`);
      assert(kp.relatedKnowledge.prerequisite?.title, `${u.id}: missing prerequisite title`);
      assert(kp.relatedKnowledge.extension?.title, `${u.id}: missing extension title`);
      assert(kp.relatedKnowledge.crossDisciplinary?.title, `${u.id}: missing crossDisciplinary title`);
      assert(kp.relatedKnowledge.synapseNote && kp.relatedKnowledge.synapseNote.length >= 15, `${u.id}: synapseNote too short`);
    }
  }
});

test('2. Explicit Knowledge Points: HTML Rendering, Connected Mesh & Accessibility', () => {
  for (const u of units) {
    const html = renderExplicitKnowledgePoints(u);
    assert(!html.includes('undefined'), `${u.id}: rendered HTML contains undefined`);
    assert(!html.includes('null'), `${u.id}: rendered HTML contains null`);
    assert(html.includes('explicit-knowledge-container'), `${u.id}: missing container`);
    assert(html.includes('kp-svg-wrapper'), `${u.id}: missing svg wrapper`);
    assert(html.includes('kp-mastery-checkbox'), `${u.id}: missing mastery checkbox`);
    assert(html.includes('kp-zoom-btn'), `${u.id}: missing zoom button`);

    // Related Knowledge Points & Visual Icons in HTML
    assert(html.includes('kp-related-box'), `${u.id}: missing related knowledge box in HTML`);
    assert(html.includes('prereq-card'), `${u.id}: missing prereq card in HTML`);
    assert(html.includes('ext-card'), `${u.id}: missing ext card in HTML`);
    assert(html.includes('cross-card'), `${u.id}: missing cross card in HTML`);
    assert(html.includes('kp-synapse-note'), `${u.id}: missing synapse note in HTML`);
    assert(html.includes('🔗'), `${u.id}: missing prerequisite icon in HTML`);
    assert(html.includes('🚀'), `${u.id}: missing extension icon in HTML`);
    // Filter Toolbar & Interactive Pills
    assert(html.includes('kp-filter-toolbar'), `${u.id}: missing kp-filter-toolbar in HTML`);
    assert(html.includes('kp-filter-pill'), `${u.id}: missing kp-filter-pill in HTML`);
    assert(html.includes('data-kp-filter="all"'), `${u.id}: missing all filter`);
    assert(html.includes('data-kp-filter="core"'), `${u.id}: missing core filter`);
    assert(html.includes('data-kp-filter="process"'), `${u.id}: missing process filter`);
    assert(html.includes('data-kp-filter="pitfall"'), `${u.id}: missing pitfall filter`);
    assert(html.includes('data-kp-filter="unmastered"'), `${u.id}: missing unmastered filter`);
  }
});
