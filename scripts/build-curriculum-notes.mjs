import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { units, subjects, subjectById, unitById } from '../dist/curriculum.js';
import { officialAlignment, officialSources } from '../dist/official-alignment-data.js';
import { teachingTables } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';
import { addedNotes } from './curriculum-note-supplements.mjs';
import { capGroups, capPatterns } from './cap-note-patterns.mjs';
import { archivedYears, capIndexUrl, capReferences, capYears } from './cap-note-sources.mjs';

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
  'math-8': { points: [
    ['點與軸', '有序數對先 x 再 y。水平直線固定 y，鉛直直線固定 x。', '坐標軸上的點不屬於任何象限。'],
    ['交叉分類', '先讀列標籤、欄標籤和單位，再圈要加的交叉格。', '排除 A 或 B 後，只保留兩個條件都不符合的格。'],
    ['資料摘要', '平均以總和除以總筆數。中位數須先排序。', '圖表若截短縱軸，用數值比較，並分清總數、變動數與比例。'],
  ] },
  'math-9': { points: [
    ['乘法公式', '和或差的平方要計入交叉項 ±2ab。平方差 (a＋b)(a−b)＝a²−b²。', '先辨識公式，再展開檢查。'],
    ['合併與減法', '只合併同次方的項。減去多項式時改變括號內各項符號。', '空缺的冪次可當作係數 0，便於直式對齊。'],
    ['多項式除法', '每輪由首項相除，再乘回並減去。餘式次數須低於除式。', '用「除式×商式＋餘式」重建被除式。'],
  ] },
  'english-9': { points: [
    ['過去進行', '用 was／were＋V-ing 說明過去某時正在持續的動作。', 'I was walking when the phone rang.'],
    ['時間關係', '先找過去的參照時點，再辨認正在進行與已完成的事件。', 'when 可導入事件或時段。不能只看連接詞，就決定兩個動詞的時態。'],
    ['數量詞', '依名詞是可數或不可數、以及語意範圍選數量詞。', 'a few books、a little water。'],
  ] },
  'biology-8': { points: [
    ['水的路徑', '根吸水，木質部運水至葉，主要由氣孔逸出。', '被切斷的枝條可由切口吸水，並非由氣孔大量向下吸水。'],
    ['有機養分', '韌皮部由來源輸送有機養分到使用或儲存處。', '依器官的生長與儲存需求決定方向。'],
    ['裝置讀值', '同管徑下氣泡位移可估計吸水量，位移除以時間才可比速度。', '吸水是蒸散的間接指標，先核對是否控制風、光及枝條條件。'],
  ] },
  'physics-4': { points: [
    ['狀態與傳遞', '溫度描述冷熱。熱量是因溫差而傳遞的能量。', '同溫的少量水與大量水，再升高一樣溫度所需熱量不同。'],
    ['比熱與升溫', '同質量同物態，比熱較大，吸收等量熱時升溫較少。', '要判升溫快慢比較 ΔT／Δt，不能只看最後溫度。'],
    ['傳熱方式', '傳導經接觸，對流伴隨流體移動，輻射不必依賴物質介質。', '對照題目中熱量傳遞的媒介和方向。'],
  ] },
  'chemistry-7': { points: [
    ['速率的意義', '用單位時間內消耗或生成的量描述反應快慢。', '比較同長時間的變化量，或取同一時段的平均斜率。'],
    ['因素與控制', '溫度、濃度、固體接觸面積及催化劑都可能影響速率。', '一次只改待驗因素，控制其餘條件。'],
    ['速率與最終量', '相同反應物若都充分反應，快慢不同也可能產生等量產物。', '圖線初段斜率和最後平台是兩種資訊。'],
  ] },
  'chemistry-8': { points: [
    ['可逆反應', '在適當條件下，生成物也能向反應物方向轉變。', '將正向與逆向當作同時可發生的兩個過程。'],
    ['動態平衡', '正逆反應速率相等，各物質的巨觀量可維持穩定。', '濃度穩定不表示各物質濃度一樣，也不表示反應停止。'],
    ['判讀曲線', '先讀坐標是速率、濃度或生成量，再比較穩定值或斜率。', '曲線平坦還可能來自反應物用完。要結合可逆與系統條件才能下結論。'],
  ] },
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
const capByNote = new Map(notes.map(note => {
  const rank = pattern => note.id === 'english-listening' && pattern.id === 'listening-update' ? 0 : pattern.chapterIds.length;
  const patterns = capPatterns.filter(pattern => pattern.chapterIds.includes(note.id)).sort((a, b) => rank(a) - rank(b));
  return [note.id, patterns];
}));
const noteById = new Map(notes.map(note => [note.id, note]));
const capNoteCount = [...capByNote.values()].filter(patterns => patterns.length > 0).length;

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
  <a href="${prefix}cap.html">會考題型</a>
  <a href="${prefix}index.html#downloads">下載整學期</a>
  <a href="${prefix}index.html#sources">資料來源</a>
</nav></header>`;
}

function capCard(pattern, { prefix, printOnly = false, guide = false }) {
  const items = pattern.refs.map(id => capReferences.get(id));
  const references = items.slice(0, guide ? items.length : 3);
  const sourceRoot = printOnly ? rootUrl : guide ? '../' : '../../';
  const refs = references.map(ref => `<li>${link(`${sourceRoot}${ref.pdf}#page=${ref.page}`, `${ref.title}｜PDF 第 ${ref.page} 頁`)}${!printOnly && ref.analysis ? ` · ${link(sourceRoot + ref.analysis, '官方分析')}` : ''}${!printOnly && ref.practice ? ` · ${link(sourceRoot + ref.practice, ref.hasDetailedDerivation ? '練習與本站解析' : '線上作答')}` : ''}</li>`).join('');
  return `<section class="cap-card"${guide ? ` id="${pattern.id}"` : ''}>
  <p class="metadata">${capGroups[pattern.group]}</p>
  <h3>${esc(pattern.title)}</h3>
  <p><strong>看到什麼</strong>　${esc(pattern.clue)}</p>
  <ol class="steps">${pattern.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>
  <p class="pitfall"><strong>易錯辨識</strong>　${esc(pattern.trap)}</p>
  <p class="cap-question"><strong>原創變式</strong>　${esc(pattern.prompt)}</p>
  ${!guide ? '<div class="writing-lines" aria-hidden="true"><span></span><span></span></div>' : ''}
  <details class="answer-panel cap-answer"${printOnly ? ' open' : ''}>
    <summary>查看變式解答</summary><div class="answer-body"><p>${esc(pattern.answer)}</p></div>
  </details>
  <div class="cap-sources"><strong>歷屆考法參照</strong><ul>${refs}</ul>${!guide && items.length > references.length ? `<p>${link(`${printOnly ? `${rootUrl}notes/` : prefix}cap.html#${pattern.id}`, '更多題本參照')}</p>` : ''}</div>
  ${guide && !printOnly ? `<p class="cap-sources"><strong>回章節讀觀念</strong>　${pattern.chapterIds.map(id => link(`./chapters/${id}.html#cap-prep`, noteById.get(id).title)).join('、')}</p>` : ''}
</section>`;
}

function chapterCap(note, printOnly = false) {
  const patterns = capByNote.get(note.id);
  if (!patterns.length) return '';
  return `<article class="note cap-note" id="cap-prep">
  <header><p class="metadata">${esc(subjectById[note.subject].name)} · ${esc(note.title)}</p>
  <h2>會考題型與變式演練</h2>
  <p class="quiet">先用章節觀念作答原創變式，再開同類歷屆題。題型可能結合其他章節。</p></header>
  ${(printOnly ? patterns.slice(0, 2) : patterns).map(pattern => capCard(pattern, { prefix: '../', printOnly })).join('\n')}
  ${printOnly && patterns.length > 2 ? `<p class="cap-sources">${link(`${rootUrl}notes/chapters/${note.id}.html#cap-prep`, '線上看本章其他會考題型')}</p>` : ''}
</article>`;
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
    ${capByNote.get(note.id).length ? '<a href="#cap-prep">本章會考題型</a>' : ''}
    <a href="../index.html?subject=${note.subject}#catalog">回同科目目錄</a>
  </div>
  ${noteArticle(note)}
  ${chapterCap(note)}
</main>`, { prefix });
}

function renderRow(note) {
  const subject = subjectById[note.subject];
  const patterns = capByNote.get(note.id);
  const search = [note.id, note.title, subject.name, subject.domain, ...note.refs.map(ref => ref.code),
    ...patterns.map(pattern => pattern.title), ...(patterns.length ? ['會考'] : [])]
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
    <div class="actions cap-intro-actions"><a class="button" href="./cap.html">讀會考題型與變式</a><a class="button outline" download href="./pdf/cap-guide.pdf">下載會考題型 PDF</a></div>
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

function capPage() {
  const entries = Object.entries(capGroups);
  return layout('歷屆會考題型與變式演練', `${masthead('./')}
<main id="main" class="shell cap-guide">
  <header class="intro">
    <p class="overline">民國 109–115 年國中教育會考</p>
    <h1>歷屆會考題型與變式演練</h1>
    <p class="lede">先找題幹線索，確認出手條件，自己做一道變式，再回正式題本驗證會不會遷移。</p>
    <p class="metadata">${capPatterns.length} 種練法 · ${capNoteCount} 份章節筆記已連結 · ${capReferences.size} 筆正式試題參照</p>
    <div class="actions cap-intro-actions"><a class="button" download href="./pdf/cap-guide.pdf">下載會考題型 A4 PDF</a><a class="button outline" href="#papers">依年份找題本與答案</a></div>
    <p class="quiet">參照為代表題目及寫作題本。解題步驟、變式與答法由本站編寫，依題本的完整題組、圖表和錄音作答。</p>
  </header>
  <nav class="actions group-nav" aria-label="依考科跳到題型">${entries.map(([id, title]) => `<a href="#group-${id}">${title}</a>`).join('')}</nav>
  ${entries.map(([id, title]) => `<section class="cap-group" id="group-${id}"><h2>${title}</h2>${capPatterns.filter(pattern => pattern.group === id).map(pattern => capCard(pattern, { prefix: './', guide: true })).join('\n')}</section>`).join('\n')}
  <section class="source-list" id="papers"><h2>正式題本、參考答案與試題說明</h2>
  <div class="paper-list">${capYears.map(year => `<div><h3>${year.year} 年</h3><p>${year.items.map(item => link(`../${item.pdf}`, item.label)).join(' · ')} · ${link(`../${year.answers}`, '參考答案')} · ${link(`../${year.notes}`, '試題說明')} · ${link(year.source, '官方年度索引')}</p></div>`).join('\n')}</div>
  <p class="quiet">較早年度的題本可用來加練題型。跨年度練習時，確認施測課綱及當時法規。</p>
  <p>${archivedYears.map(item => link(item.source, `${item.year} ${item.year === 102 ? '年試辦' : '年'}`)).join(' · ')} · ${link(capIndexUrl, '會考官方歷屆試題入口')}</p>
  </section>
</main>
<footer class="site-footer shell">知行學院｜國中全科學習</footer>`);
}

await fs.mkdir(path.join(root, 'chapters'), { recursive: true });
await fs.writeFile(path.join(root, 'index.html'), indexPage());
await fs.writeFile(path.join(root, 'cap.html'), capPage());
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
  const guidePages = Object.keys(capGroups).flatMap(group => {
    const patterns = capPatterns.filter(pattern => pattern.group === group);
    return Array.from({ length: Math.ceil(patterns.length / 2) }, (_, i) => patterns.slice(i * 2, i * 2 + 2));
  });
  jobs.push({ id: 'cap-guide', title: '歷屆會考題型與變式演練', guidePages });
  try {
    await Promise.all(Array.from({ length: 4 }, async (_, offset) => {
      const page = await browser.newPage();
      for (const job of jobs.filter((_, index) => index % 4 === offset)) {
        const articles = job.chapters ? job.chapters.map(note => noteArticle(note, true) + chapterCap(note, true))
          : job.guidePages.map(patterns => `<article class="note cap-note"><header><p class="metadata">知行學院 · 歷屆會考題型與變式演練</p></header>${patterns.map(pattern => capCard(pattern, { prefix: '../', printOnly: true, guide: true })).join('\n')}</article>`);
        await page.setContent(layout(job.title, `<main>${articles.join('\n')}</main>`, { inlineCss: css, printOnly: true }));
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

console.log(`Notes built: ${notes.length} chapters and supplements, ${capNoteCount} with CAP practice, ${capPatterns.length} CAP patterns`);
