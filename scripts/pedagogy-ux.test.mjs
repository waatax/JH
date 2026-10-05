import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units, unitById} from '../dist/curriculum.js';
import {teachingFor, teachingTables} from '../dist/teaching.js';
import {workedCases, renderWorkedCase, stepRoles} from '../dist/worked-cases.js';

test('1. Every unit satisfies the 5-Stage Cognitive Learning Ladder', () => {
  assert.equal(units.length, 188, 'Should have exactly 188 curriculum units');

  for (const u of units) {
    // Stage 1: Concept Anchor & Plain-Language Intuition
    assert(u.concept && u.concept.length >= 15, `${u.id} concept anchor is missing or too short`);
    
    // Stage 2: Structural Contrastive Table
    assert(teachingTables[u.id], `${u.id} is missing teaching table`);
    const table = teachingFor(u);
    assert(table.rows && table.rows.length >= 3, `${u.id} comparison table must have at least 3 rows`);
    for (const row of table.rows) {
      assert.equal(row.length, 3, `${u.id} row must have 3 columns (辨識、規則、例子)`);
    }

    // Stage 3: Worked Example & Thinking Chain
    assert(u.example && u.example.length >= 15, `${u.id} missing basic example`);
    const c = workedCases[u.id];
    assert(c, `${u.id} is missing workedCase`);
    assert(c.teaching.length >= 50, `${u.id} teaching heuristic too brief`);
    assert(c.problem.length >= 20, `${u.id} problem prompt too brief`);
    assert(c.steps.length >= 3, `${u.id} must have at least 3 cognitive steps`);
    assert(c.check.length >= 20, `${u.id} sanity check too brief`);

    // Stage 4: Cognitive Conflict & Misconception Defense
    assert(u.pitfall && u.pitfall.length >= 15, `${u.id} missing misconception defense`);

    // Stage 5: Active Recall Feynman Task & Verification Quizzes
    assert(u.task && u.task.length >= 15, `${u.id} missing active recall task`);
    assert.equal(u.questions.length, 2, `${u.id} must have exactly 2 verification questions`);
  }
});

test('2. Cognitive Thinking Chain renders semantic step roles and sanity check', () => {
  assert(stepRoles.length >= 3, 'Must have at least 3 cognitive step roles');
  assert(stepRoles[0].includes('審題定位'), 'Step 1 role must focus on identifying question clues');
  assert(stepRoles[1].includes('策略轉化'), 'Step 2 role must focus on strategic transformation');
  assert(stepRoles[2].includes('破題求解'), 'Step 3 role must focus on solving and conclusions');

  for (const u of units) {
    const html = renderWorkedCase(u);
    assert(html.includes('class="worked-case"'), `${u.id} HTML missing worked-case section`);
    assert(html.includes('class="case-solution"'), `${u.id} HTML missing case-solution for expansion check`);
    assert(html.includes('class="thinking-chain-steps"'), `${u.id} HTML missing thinking chain steps list`);
    assert(html.includes('class="thinking-step-item"'), `${u.id} HTML missing step items`);
    assert(html.includes('class="case-check"'), `${u.id} HTML missing sanity check container`);
    assert(html.includes('防呆驗算與適用邊界'), `${u.id} HTML missing sanity check title`);
    assert(html.includes('第 1 步'), `${u.id} HTML missing step 1 pill`);
  }
});

test('3. Feynman Scaffolding Templates provide structured metacognitive prompts', () => {
  const feynmanTemplates = {
    plain: `【🍎 觀念白話說給朋友聽】\n1. 這個觀念用一句話來說就是：\n2. 為什麼這個規則是這樣？因為：\n3. 生活中的例子是：\n`,
    steps: `【📐 解題思維路徑筆記】\n1. 題目的核心關鍵字（題眼）是：\n2. 看到題眼，聯想到的定理/公式是：\n3. 解題步驟三部曲：\n   ① 審題與設未知數：\n   ② 列式或推導：\n   ③ 單位與合理性檢核：\n`,
    pitfall: `【🛡️ 我的考場避坑手記】\n1. 最容易粗心或被題目拐彎的地方是：\n2. 為什麼這個錯誤會發生？\n3. 解題時我要提醒自己的檢查步驟：\n`
  };

  for (const [key, tpl] of Object.entries(feynmanTemplates)) {
    assert(tpl.length > 30, `Template ${key} is too brief`);
    assert(tpl.includes('\n'), `Template ${key} should have multiple prompt lines`);
  }
  assert(feynmanTemplates.plain.includes('白話'));
  assert(feynmanTemplates.steps.includes('解題步驟'));
  assert(feynmanTemplates.pitfall.includes('粗心'));
});

test('4. Learning Journey Anchor Targets map seamlessly to lesson sections', () => {
  const anchors = ['step-understand', 'step-diagram', 'step-solve', 'step-pitfall', 'step-practice'];
  assert.equal(anchors.length, 5, 'Should have 5 distinct learning ladder anchors');
  for (const a of anchors) {
    assert(a.startsWith('step-'), `Anchor ${a} must start with step-`);
  }
});

test('5. UIUX Comfortable Reading Themes, Font Scalability & Mobile Optimization', () => {
  const css = fs.readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8');
  const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const js = fs.readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');

  // 4 Reading Themes
  for (const theme of ['sage', 'paper', 'dark', 'day']) {
    assert(css.includes(`[data-theme="${theme}"]`), `style.css missing theme [data-theme="${theme}"]`);
  }

  // 4 Scalable Font Sizes
  for (const fsSize of ['standard', 'comfortable', 'large', 'xlarge']) {
    assert(css.includes(`[data-font-size="${fsSize}"]`), `style.css missing font-size [data-font-size="${fsSize}"]`);
  }

  // Mobile Drawer & Mobile Bottom Nav in CSS
  assert(css.includes('.sidebar.drawer-open'), 'style.css missing drawer-open class');
  assert(css.includes('.mobile-drawer-backdrop'), 'style.css missing mobile-drawer-backdrop');
  assert(css.includes('.mobile-bottom-nav'), 'style.css missing mobile-bottom-nav');
  assert(css.includes('.bottom-nav-item'), 'style.css missing bottom-nav-item');

  // HTML Toolbar and Bottom Navigation
  assert(html.includes('id="mobile-menu-btn"'), 'index.html missing mobile-menu-btn');
  assert(html.includes('id="theme-btn"'), 'index.html missing theme-btn');
  assert(html.includes('id="font-dec-btn"'), 'index.html missing font-dec-btn');
  assert(html.includes('id="font-inc-btn"'), 'index.html missing font-inc-btn');
  assert(html.includes('class="mobile-bottom-nav"'), 'index.html missing mobile-bottom-nav');

  // JS Engine Handlers
  assert(js.includes('applySettings'), 'app.js missing applySettings');
  assert(js.includes('cycleTheme'), 'app.js missing cycleTheme');
  assert(js.includes('adjustFontSize'), 'app.js missing adjustFontSize');
  assert(js.includes('openMobileDrawer'), 'app.js missing openMobileDrawer');
  assert(js.includes('closeMobileDrawer'), 'app.js missing closeMobileDrawer');
});

test('6. PWA Offline First, Web App Manifest & Service Worker Cache Assets', () => {
  const manifestPath = new URL('../dist/manifest.json', import.meta.url);
  assert(fs.existsSync(manifestPath), 'dist/manifest.json must exist');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(manifest.name && manifest.name.includes('知行學院'), 'Manifest name must contain 知行學院');
  assert(manifest.short_name === '知行學院', 'Manifest short_name should be 知行學院');
  assert.equal(manifest.display, 'standalone', 'PWA display must be standalone');
  assert(manifest.icons && manifest.icons.length >= 2, 'Manifest must provide at least 2 icons');

  const swPath = new URL('../dist/sw.js', import.meta.url);
  assert(fs.existsSync(swPath), 'dist/sw.js must exist');
  const swCode = fs.readFileSync(swPath, 'utf8');
  assert(swCode.includes('CACHE_NAME'), 'Service worker must declare CACHE_NAME');
  assert(swCode.includes('STATIC_ASSETS'), 'Service worker must list STATIC_ASSETS');
  assert(swCode.includes('caches.match'), 'Service worker must handle cache match');

  const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert(html.includes('rel="manifest"'), 'index.html must link manifest.json');
});

test('7. Reading Progress Bar, Back-To-Top, Shortcuts Modal & Flashcard Active Recall', () => {
  const css = fs.readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8');
  const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const js = fs.readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');

  // DOM Elements in index.html
  assert(html.includes('id="reading-progress"'), 'index.html missing reading-progress bar');
  assert(html.includes('id="back-to-top-btn"'), 'index.html missing back-to-top button');
  assert(html.includes('id="shortcuts-btn"'), 'index.html missing shortcuts trigger button');
  assert(html.includes('id="shortcuts-modal"'), 'index.html missing shortcuts modal');

  // CSS rules
  assert(css.includes('.reading-progress'), 'style.css missing .reading-progress rule');
  assert(css.includes('.back-to-top-btn'), 'style.css missing .back-to-top-btn rule');
  assert(css.includes('.shortcuts-modal'), 'style.css missing .shortcuts-modal rule');
  assert(css.includes('.flashcard-wrap'), 'style.css missing .flashcard-wrap rule');
  assert(css.includes('.flashcard-flip-btn'), 'style.css missing .flashcard-flip-btn rule');

  // JS Engine Handlers
  assert(js.includes('openShortcuts'), 'app.js missing openShortcuts');
  assert(js.includes('closeShortcuts'), 'app.js missing closeShortcuts');
  assert(js.includes('mode-flashcard'), 'app.js missing mode-flashcard handler');
  assert(js.includes('fc-flip'), 'app.js missing fc-flip handler');
  assert(js.includes('reading-progress'), 'app.js missing reading progress scroll handler');
});


