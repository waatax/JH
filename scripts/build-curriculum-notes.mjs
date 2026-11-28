import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { units, subjects, subjectById, unitById } from '../dist/curriculum.js';
import { officialAlignment, officialSources } from '../dist/official-alignment-data.js';
import { teachingTables } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';
import { addedNotes } from './curriculum-note-supplements.mjs';

const root = fileURLToPath(new URL('../dist/notes/', import.meta.url));
const tmp = fileURLToPath(new URL('../tmp/pdfs/curriculum-notes/', import.meta.url));
const rootUrl = 'https://waatax.github.io/JH/';
const grades = { 7: '國一', 8: '國二', 9: '國三' };
const semesters = [7, 8, 9].flatMap(grade => [1, 2].map(term => ({
  grade, term, key: `${grade}-${term}`, label: `${grades[grade]}${term === 1 ? '上' : '下'}學期`,
})));
const labelFor = { chapter: '章節筆記', supplement: '課綱補強' };
const general = { label: '教育部十二年國教課綱總綱', url: 'https://edu.law.moe.gov.tw/LawContent.aspx?id=GL002057' };
const learningGuideUrl = 'https://ies.ed.gov/ncee/WWC/PracticeGuide/1/Published';
const guide = [
  ['讀懂', '先讀核心概念，對照一題示範，說出每一步的理由。'],
  ['闔上回想', '遮住筆記作答，再展開答案，寫下自己的錯因。'],
  ['隔一段時間再練', '可在隔天、三天後及一週後回想一次。依答題情況調整間隔。'],
];
const research = [
  ['均一教育平台｜115 學年度上學期資源包', 'https://www.junyiacademy.org/event/115-1-semester-junyi-academy-courses/', '從現行學期入口確認資源與教材路徑。'],
  ['均一教育平台｜七年級數學', 'https://www.junyiacademy.org/topics/math-7', '對照整數、指數、方程式、統計與幾何的年級編排。'],
  ['均一教育平台｜八年級數學', 'https://www.junyiacademy.org/topics/math-8', '對照多項式、平方根與後續函數、幾何的先備。'],
  ['均一教育平台｜九年級數學', 'https://www.junyiacademy.org/topics/math-9', '對照比例線段、相似形、圓與幾何推理。'],
  ['均一教育平台｜課中差異化教材', 'https://www.junyiacademy.org/topics/diff-m7', '參照微概念、示範、紙本與線上練習的編排。'],
  ['均一教育平台｜國中英語', 'https://www.junyiacademy.org/topics/eng-junior', '依年級查找英語課程，搭配表達與聽力練習。'],
  ['均一教育平台｜酷課雲學科專區', 'https://www.junyiacademy.org/topics/cooc', '查找國中生物、理化、地科與地理的示範資源。'],
  ['均一教育平台｜國中公民', 'https://www.junyiacademy.org/topics/middle-school-civics', '查找公民課程及生活情境。'],
  ['國家教育研究院｜十二年國教課程綱要', 'https://www.naer.edu.tw/PageSyllabus?fid=52', '正式總綱、領綱和課程手冊的查核入口。'],
  [general.label, general.url, '核對國中第四學習階段、八大領域及部定與校訂課程。'],
  ['教育部｜因材網', 'https://adl.edu.tw/', '提供國中各領域的補充教材與練習。'],
  ['教育部｜本土語言資源網', 'https://mhi.moe.edu.tw/', '依選習語別取得教材及影音。'],
  ['國中教育會考｜官方歷屆試題', 'https://cap.rcpet.edu.tw/examination.html', '檢索正式題本、聽力與參考答案。'],
  ['美國教育科學研究院｜學習實務指南', learningGuideUrl, '參照間隔複習、示範例題與主動提取。'],
  ['Roediger 與 Karpicke｜提取練習研究', 'https://pubmed.ncbi.nlm.nih.gov/16507066/', '閱讀材料的延宕回憶實驗。'],
  ['Cepeda 等人｜間隔練習統合分析', 'https://pubmed.ncbi.nlm.nih.gov/16719566/', '複習間隔依學習材料和預定保留時間調整。'],
];
const subjectResources = {
  english: ['均一｜國中英語', 'https://www.junyiacademy.org/topics/eng-junior'],
  civics: ['均一｜國中公民', 'https://www.junyiacademy.org/topics/middle-school-civics'],
  local: ['教育部｜本土語言資源網', 'https://mhi.moe.edu.tw/'],
};
for (const subject of ['biology', 'physics', 'chemistry', 'earth', 'geography']) {
  subjectResources[subject] = ['均一｜酷課雲學科專區', 'https://www.junyiacademy.org/topics/cooc'];
}

const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
const link = (url, label) => `<a href="${esc(url)}">${esc(label)}</a>`;
const clean = value => value.trim();
const baseNotes = units.map(unit => {
  const alignment = officialAlignment[unit.id];
  const worked = workedCases[unit.id];
  const question = unit.questions[0];
  const points = teachingTables[unit.id].rows.slice(0, 3).map(row => row.map(clean));
  return {
    id: unit.id, title: unit.title, subject: unit.subject, grade: unit.grade, term: unit.term,
    kind: 'chapter', sourceId: alignment.sourceId, refs: alignment.refs, scope: alignment.scope,
    core: unit.concept, points, example: worked.problem, steps: worked.steps,
    pitfall: unit.pitfall, prompt: question.prompt, options: question.options,
    answer: `${'ABCD'[question.answer]}（${question.options[question.answer]}）。${question.explanation}`,
    apply: unit.task, links: [unit.id],
  };
});

const revisedNotes = {
  'local-4': { points: [
    ['記下語境', '記錄誰在什麼情境使用這個詞、故事或歌謠。', '可記下學校或家庭中不同世代的說法與脈絡。'],
    ['保存來源', '記錄語別、教材名稱及頁次，使用他人的聲音或影像前先取得同意。', '用文字或口述皆可，依語別及教材調整。'],
    ['回饋與行動', '與老師或具該語別能力的人核對原意。', '加入一則問候、家庭用語或生活場景的練習。'],
  ] },
  'geography-13': {
    core: '由地形、氣候及海洋位置解讀大洋洲地景。澳洲內陸多乾燥，東岸山地影響區域氣候。紐西蘭有火山地熱與冰河地景。太平洋島嶼的火山島與低平珊瑚島面臨不同的環境條件。',
    points: [
      ['澳洲', '澳洲大部分內陸乾燥。地勢、環流與距海遠近會影響不同地區的氣候。', '判讀氣候圖時要分辨溫度、降雨量及降雨季節。'],
      ['紐西蘭', '北島有火山與地熱地形，南島有高山、冰河與峽灣。', '同一山脈兩側可因盛行風出現降雨差異。'],
      ['大洋洲島嶼', '火山島與珊瑚環礁的高度、地形和水源不同。', '低平環礁特別需要注意海岸淹水與淡水資源。'],
    ],
    example: '地圖上澳洲內陸比東岸乾燥。可以用什麼資料檢驗？',
    steps: ['在相近緯度選一處東岸和一處內陸測站。', '比對同時段月雨量與年雨量。', '參考地勢、距海和盛行風，說明可能的影響。'],
    pitfall: '澳洲的有袋類和單孔類特有比例高，但也有原生的胎盤類，例如蝙蝠和囓齒類。',
    prompt: '澳洲許多哺乳類在其他地方找不到，哪個地理過程最能解釋？', options: null,
    answer: '與其他大陸長期隔離，有利於各地的族群分別演化，形成許多特有種。',
    resource: 'https://australian.museum/learn/animals/mammals/endemism-in-australian-mammals/', resourceName: '澳洲博物館｜澳洲哺乳類特有性',
  },
};
for (const note of baseNotes) Object.assign(note, revisedNotes[note.id]);

const supplementNotes = addedNotes.map(note => ({
  ...note, kind: 'supplement', sourceId: note.sourceId ?? officialAlignment[note.links[0]].sourceId,
  refs: note.refs.map(([code, page, kind = '學習內容']) => ({ code, page, kind })),
}));
const notes = [...baseNotes, ...supplementNotes].sort((a, b) =>
  a.grade - b.grade || a.term - b.term || subjects.indexOf(subjectById[a.subject]) - subjects.indexOf(subjectById[b.subject]));
const supplementsByUnit = new Map();
for (const note of supplementNotes) for (const unitId of note.links) {
  if (!supplementsByUnit.has(unitId)) supplementsByUnit.set(unitId, []);
  supplementsByUnit.get(unitId).push(note);
}

function layout(title, body, { prefix = './', printOnly = false, inlineCss = '' } = {}) {
  return `<!doctype html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="知行學院國中課綱重點筆記，包含核心觀念、示範、自測和 A4 列印版。">
  <title>${esc(title)}｜知行學院</title>
  ${inlineCss ? `<style>${inlineCss}</style>` : `<link rel="stylesheet" href="${prefix}notes.css">`}
  ${printOnly ? '' : `<script src="${prefix}notes.js" defer></script>`}
</head>
<body>
${body}
</body>
</html>\n`.replace(/[ \t]+$/gm, '');
}

function masthead(prefix) {
  return `<a class="skip screen-only" href="#main">跳到主要內容</a>
<header class="masthead screen-only"><nav class="shell" aria-label="網站導覽">
  <a class="brand" href="${prefix}../">知行學院</a>
  <a href="${prefix}index.html#catalog">章節目錄</a>
  <a href="${prefix}index.html#downloads">下載整學期</a>
  <a href="${prefix}index.html#sources">資料來源</a>
</nav></header>`;
}

function noteArticle(note, printOnly = false) {
  const subject = subjectById[note.subject];
  const source = note.sourceId === 'general' ? general : officialSources[note.sourceId];
  const semester = semesters.find(s => s.grade === note.grade && s.term === note.term);
  const resource = note.resource ? [note.resourceName, note.resource] : note.subject === 'math'
    ? [`均一｜${note.grade} 年級數學`, `https://www.junyiacademy.org/topics/math-${note.grade}`]
    : subjectResources[note.subject];
  const related = supplementsByUnit.get(note.id) ?? [];
  const scope = note.scope?.trim();
  return `<article class="note">
  <header>
    <p class="metadata">${esc(subject.name)} · ${semester.label} · ${labelFor[note.kind]}</p>
    <h1>${esc(note.title)}</h1>
    <p class="core">${esc(note.core)}</p>
  </header>
  <section>
    <h2>章節重點</h2>
    <dl class="key-points">${note.points.map(([term, meaning, use]) => `<div class="point"><dt>${esc(term)}</dt><dd>${esc(meaning)}<span>${esc(use)}</span></dd></div>`).join('')}</dl>
  </section>
  <section>
    <h2>示範與推理</h2>
    <p>${esc(note.example)}</p>
    <ol class="steps">${note.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>
    <p class="pitfall"><strong>易錯提醒</strong>　${esc(note.pitfall)}</p>
  </section>
  <section>
    <h2>闔上筆記，試著回想</h2>
    <ol class="questions"><li>${esc(note.prompt)}${note.options ? `<ul class="options">${note.options.map((option, i) => `<li>${'ABCD'[i]}．${esc(option)}</li>`).join('')}</ul>` : ''}</li>${note.apply ? `<li>${esc(note.apply)}</li>` : ''}</ol>
    <div class="writing-lines" aria-hidden="true"><span></span><span></span></div>
    <details class="answer-panel"${printOnly ? ' open' : ''}>
      <summary>參考解答與自評</summary>
      <div class="answer-body"><p>${note.apply ? '第 1 題　' : ''}${esc(note.answer)}</p>${note.apply ? '<p>第 2 題　用上方的章節重點自評。寫出答案，標明依據，並核對所用條件、單位或情境是否適合。</p>' : ''}</div>
    </details>
  </section>
  <footer>
    <p><strong>課綱依據</strong>　${link(source.url, source.label)}${note.refs.length ? `　${note.refs.map(ref => link(`${source.url}#page=${ref.page}`, `${ref.code}（PDF ${ref.page} 頁）`)).join('、')}` : ''}</p>
    ${scope ? `<p><strong>國中範圍</strong>　${esc(scope)}</p>` : ''}
    ${resource ? `<p><strong>補充學習</strong>　${link(resource[1], resource[0])}</p>` : ''}
    <p>知行學院重點筆記 · 建議學期依本站編排${printOnly ? ` · ${link(`${rootUrl}notes/chapters/${note.id}.html`, '網頁版')}` : ''}</p>
    ${printOnly ? '' : `<p class="note-links screen-only"><strong>相關課程</strong>　${note.links.map(id => link(`../../#/lesson/${id}`, unitById[id].title)).join('、')}</p>
    ${related.length ? `<p class="note-links screen-only"><strong>相關補強</strong>　${related.map(item => link(`./${item.id}.html`, item.title)).join('、')}</p>` : ''}`}
  </footer>
</article>`;
}

function notePage(note) {
  const prefix = '../';
  return layout(note.title, `${masthead(prefix)}
<main id="main" class="shell note-shell">
  <div class="actions note-actions screen-only">
    <a class="button" download href="../pdf/${note.id}.pdf">下載本章 A4 PDF</a>
    <button class="button outline" type="button" id="print-note" hidden>列印網頁</button>
    <a href="../index.html?subject=${note.subject}#catalog">回同科目目錄</a>
  </div>
  ${noteArticle(note)}
</main>`, { prefix });
}

function renderRow(note) {
  const subject = subjectById[note.subject];
  const search = [note.id, note.title, subject.name, subject.domain, ...note.refs.map(ref => ref.code)]
    .join(' ').normalize('NFKC').toLowerCase();
  return `<li class="list-row" data-subject="${note.subject}" data-term="${note.grade}-${note.term}" data-kind="${note.kind}" data-search="${esc(search)}">
    <span class="quiet">${esc(subject.name)}${note.kind === 'supplement' ? ' · 補強' : ''}</span>
    <a href="./chapters/${note.id}.html">${esc(note.title)}</a>
    <a class="button outline" aria-label="下載${esc(note.title)} A4 PDF" href="./pdf/${note.id}.pdf" download>PDF</a>
  </li>`;
}

function indexPage() {
  return layout('國中課綱重點筆記', `${masthead('./')}
<main id="main" class="shell">
  <header class="intro">
    <p class="overline">臺灣十二年國教 · 國中第四學習階段</p>
    <h1>國中課綱重點筆記</h1>
    <p class="lede">從觀念、示範到自測。按學期或科目找章節，線上閱讀或下載 A4 列印。</p>
    <p class="metadata">八大領域 · ${subjects.length} 門站內科目 · ${baseNotes.length} 章 · ${addedNotes.length} 份課綱補強</p>
    <dl class="study-guide">${guide.map(([label, body]) => `<div><dt>${esc(label)}</dt><dd>${esc(body)}</dd></div>`).join('')}</dl>
    <p class="quiet">回想與間隔複習參考${link(learningGuideUrl, '美國教育科學研究院學習實務指南')}。各校教材編排可依版本與教師進度調整。</p>
  </header>
  <section class="catalog" id="catalog" aria-labelledby="catalog-title">
    <h2 id="catalog-title">找章節</h2>
    <form id="note-filters" aria-label="筆記篩選" hidden>
      <div class="filters">
        <div class="filter-field"><label for="filter-query">搜尋</label><input id="filter-query" type="search" name="query" maxlength="100" placeholder="章節、科目或課綱代碼"></div>
        <div class="filter-field"><label for="filter-subject">科目</label><select id="filter-subject" name="subject"><option value="">全部科目</option>${subjects.map(subject => `<option value="${subject.id}">${esc(subject.name)}</option>`).join('')}</select></div>
        <div class="filter-field"><label for="filter-term">學期</label><select id="filter-term" name="term"><option value="">全部學期</option>${semesters.map(s => `<option value="${s.key}">${s.label}</option>`).join('')}</select></div>
        <div class="filter-field"><label for="filter-kind">筆記類型</label><select id="filter-kind" name="kind"><option value="">全部類型</option><option value="chapter">章節筆記</option><option value="supplement">課綱補強</option></select></div>
      </div>
      <div class="filter-footer"><p class="quiet" id="note-count" role="status">${notes.length} 章</p><button class="clear" type="reset">清除篩選</button></div>
    </form>
    <p id="no-notes" hidden>沒有符合條件的章節。可換用較短的關鍵字或清除篩選。</p>
    ${semesters.map((s, i) => {
      const rows = notes.filter(note => note.grade === s.grade && note.term === s.term);
      return `<details class="group"${i === 0 ? ' open' : ''}><summary>${s.label} <span class="quiet">· ${rows.length} 章</span></summary><ul>${rows.map(renderRow).join('\n')}</ul></details>`;
    }).join('\n')}
  </section>
  <section class="packs" id="downloads" aria-labelledby="downloads-title">
    <h2 id="downloads-title">下載整學期</h2>
    <p class="quiet">各冊收錄該學期全部章節與補強筆記，可在 PDF 列印介面挑選頁數。</p>
    <div class="actions">${semesters.map(s => `<a class="button outline" download href="./pdf/semester-${s.key}.pdf">${s.label} PDF</a>`).join('')}</div>
  </section>
  <section class="source-list" id="sources" aria-labelledby="sources-title">
    <h2 id="sources-title">課綱、教學與學習研究</h2>
    <p class="quiet">章節內附相關領綱與 PDF 實體頁碼。各章是本站主題摘要，官方逐條課綱、各版本課文、語別教材及校訂課程請查原始資料。</p>
    <ul>${research.map(([name, url, use]) => `<li>${esc(use)} ${link(url, name)}</li>`).join('')}</ul>
  </section>
</main>
<footer class="site-footer shell">知行學院｜國中全科學習</footer>`);
}

await fs.mkdir(path.join(root, 'chapters'), { recursive: true });
await fs.writeFile(path.join(root, 'index.html'), indexPage());
await Promise.all(notes.map(note => fs.writeFile(path.join(root, 'chapters', `${note.id}.html`), notePage(note))));

if (process.argv.includes('--pdf')) {
  const require = createRequire(import.meta.url);
  const { chromium } = process.env.CODEX_NODE_MODULES
    ? require(path.join(process.env.CODEX_NODE_MODULES, 'playwright')) : require('playwright');
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  await fs.mkdir(path.join(root, 'pdf'), { recursive: true });
  await fs.mkdir(tmp, { recursive: true });
  const css = await fs.readFile(path.join(root, 'notes.css'), 'utf8');
  const footer = '<div style="width:100%;text-align:center;font:8px Arial;color:#333"><span class="pageNumber"></span> / <span class="totalPages"></span></div>';
  const jobs = notes.map(note => ({ id: note.id, title: note.title, chapters: [note] }));
  for (const s of semesters) jobs.push({
    id: `semester-${s.key}`, title: `${s.label}重點筆記`,
    chapters: notes.filter(note => note.grade === s.grade && note.term === s.term),
  });
  try {
    await Promise.all(Array.from({ length: 4 }, async (_, offset) => {
      const page = await browser.newPage();
      for (const job of jobs.filter((_, index) => index % 4 === offset)) {
        await page.setContent(layout(job.title, `<main>${job.chapters.map(note => noteArticle(note, true)).join('\n')}</main>`, { inlineCss: css, printOnly: true }));
        await page.evaluate(() => document.fonts.ready);
        await page.pdf({
          path: path.join(root, 'pdf', `${job.id}.pdf`), preferCSSPageSize: true,
          displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: footer, tagged: true, outline: true,
        });
      }
    }));
    console.log(`PDFs built: ${jobs.length}`);
  } finally {
    await browser.close();
  }
}

console.log(`Notes built: ${baseNotes.length} chapters and ${addedNotes.length} supplements across ${semesters.length} semesters`);
