// scripts/build_quest_course.mjs
// Builds the 108 Curriculum Junior High (JH Quest) course structure & items from existing high quality assets.
// Output: dist/quest/course/index.json, s1.json..s6.json, b-*.json, stories.json and COURSE-BUILD-REPORT.json

import fs from 'node:fs';
import path from 'node:path';

import { units, subjects, subjectById, questions as curriculumQuestions } from '../dist/curriculum.js';
import { explicitKnowledgePoints } from '../dist/explicit-knowledge-points.js';
import { teachingTables } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';
import { lessonDeepening } from '../dist/lesson-deepening.js';
import { periodicExams } from '../dist/periodic-exam-data.js';
import { officialAlignment, officialSources } from '../dist/official-alignment-data.js';

export const COURSE_VERSION = '2026-10-27.v1';
const OUT_DIR = path.resolve('dist/quest/course');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Load CAP Exam Bank
const capBankPath = path.resolve('dist/cap-bank.json');
const capBank = JSON.parse(fs.readFileSync(capBankPath, 'utf8'));

// Hashing helper for deterministic sampling/shuffling
const hash = s => {
  let h = 2166136261;
  for (const c of String(s)) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

function shuffle(list, seed) {
  const arr = [...list];
  let x = hash(seed) || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    x = (Math.imul(x, 1103515245) + 12345) >>> 0;
    const j = x % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const normalize = s =>
  String(s ?? '')
    .normalize('NFKC')
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .replace(/[.,!?;:"()\[\]…—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function cleanText(s) {
  if (!s) return '';
  return String(s)
    .replace(/正確答案為\s*[（(][A-D][)）]\s*/g, '正確答案為')
    .replace(/\s*[，,]?\s*故選\s*[（(]?[A-D][)）]?\s*[。.]?/g, '。')
    .replace(/選\s*[（(][A-D][)）]/g, '選')
    .replace(/選項\s*[（(][A-D][)）]\s*/g, '選項 ')
    .replace(/\s*[（(][A-D][)）](?=\s*[。.，,]|$)/g, '')
    .replace(/[。.]\s*。/g, '。')
    .trim();
}

// Global registry of assembled items
const allItems = new Map();
const excludedItems = [];

function registerItem(item, src) {
  if (!item || !item.id) return null;
  if (allItems.has(item.id)) return item.id;

  // Validation
  if (item.type === 'choice' || item.type === 'listen') {
    if (!Array.isArray(item.options) || item.options.length < 2) {
      excludedItems.push({ id: item.id, reason: 'fewer than 2 options' });
      return null;
    }
    const cleanOpts = item.options.map(o => String(o).trim());
    if (new Set(cleanOpts).size !== cleanOpts.length) {
      excludedItems.push({ id: item.id, reason: 'duplicate options' });
      return null;
    }
    if (!cleanOpts.includes(String(item.answer).trim())) {
      excludedItems.push({ id: item.id, reason: 'answer not in options' });
      return null;
    }
  }

  item.src = src || item.src || '';
  if (item.why) item.why = cleanText(item.why);
  if (item.hint) item.hint = cleanText(item.hint);

  allItems.set(item.id, item);
  return item.id;
}

// -------------------------------------------------------------
// 1. Definition of Sections (6 Semesters) and Branches (8 Focus Tracks)
// -------------------------------------------------------------
const SECTIONS_CONFIG = [
  { id: 's1', no: 1, grade: 7, term: 1, title: '七年級上學期', level: '國一打底與概念溯源', color: 'green', icon: '🌱' },
  { id: 's2', no: 2, grade: 7, term: 2, title: '七年級下學期', level: '國一進階與生活應用', color: 'teal', icon: '🌿' },
  { id: 's3', no: 3, grade: 8, term: 1, title: '八年級上學期', level: '國二推理與實驗實作', color: 'sky', icon: '🔬' },
  { id: 's4', no: 4, grade: 8, term: 2, title: '八年級下學期', level: '國二深化與邏輯建模', color: 'blue', icon: '📐' },
  { id: 's5', no: 5, grade: 9, term: 1, title: '九年級上學期', level: '國三統整與全科素養', color: 'indigo', icon: '🧭' },
  { id: 's6', no: 6, grade: 9, term: 2, title: '九年級下學期', level: '國三衝刺與會考精熟', color: 'gold', icon: '👑' }
];

const BRANCHES_CONFIG = [
  { id: 'b-chinese', title: '國語文縱貫專精', icon: '📜', level: '閱讀思辨、古典詩文與會考寫作', color: 'indigo', domain: '語文', filterSubj: 'chinese' },
  { id: 'b-english', title: '英語文縱貫專精', icon: '🔤', level: '時態句型、素養閱讀與聽力特訓', color: 'sky', domain: '語文', filterSubj: 'english' },
  { id: 'b-math', title: '數學幾何代數全線', icon: '📐', level: '數與量、方程式、幾何論證與函數', color: 'green', domain: '數學', filterSubj: 'math' },
  { id: 'b-science', title: '自然科學探究全線', icon: '🔬', level: '生物多樣、理化實驗與地質天象', color: 'teal', domain: '自然科學', filterSubj: ['biology', 'physics', 'chemistry', 'earth'] },
  { id: 'b-social', title: '社會脈絡思辨全線', icon: '🌍', level: '臺灣世界歷史、地理空間與公民法治', color: 'orange', domain: '社會', filterSubj: ['history', 'geography', 'civics'] },
  { id: 'b-life', title: '科技藝術與跨域全線', icon: '🎨', level: '程式演算法、生活工程、藝術與綜合', color: 'pink', domain: '跨領域', filterSubj: ['visual', 'music', 'performing', 'computing', 'technology', 'health', 'pe', 'home', 'scout', 'guidance', 'local'] },
  { id: 'b-periodic', title: '三次段考模擬衝刺', icon: '📝', level: '全臺名校段考真題與高頻陷阱拆解', color: 'violet', isSpecial: 'periodic' },
  { id: 'b-cap', title: '歷屆會考真題特訓', icon: '🎯', level: '近七年 109~115 年會考官方試題解碼', color: 'gold', isSpecial: 'cap' }
];

// Map CAP questions by unitId for easy injection into mastery nodes
const capByUnit = new Map();
for (const q of capBank.questions) {
  if (Array.isArray(q.unitIds)) {
    for (const uid of q.unitIds) {
      if (!capByUnit.has(uid)) capByUnit.set(uid, []);
      capByUnit.get(uid).push(q);
    }
  }
}

// Map Periodic exam questions by grade-term-subject
const periodicByGradeTerm = new Map();
for (const exam of periodicExams) {
  const key = `${exam.grade}-${exam.term}`;
  if (!periodicByGradeTerm.has(key)) periodicByGradeTerm.set(key, []);
  periodicByGradeTerm.get(key).push(exam);
}

// -------------------------------------------------------------
// 2. Unit Item Generation Logic (Generating 5 Nodes per Unit)
// -------------------------------------------------------------
function buildUnitNodes(u) {
  const uid = u.id;
  const subj = subjectById[u.subject] || { name: u.subject, domain: '綜合' };
  const kps = explicitKnowledgePoints[uid] || [];
  const table = teachingTables[uid];
  const wc = workedCases[uid];
  const ld = lessonDeepening[uid];
  const curQ = u.questions || [];
  const capList = capByUnit.get(uid) || [];

  const nodeItemPools = {
    concept: [],
    rule: [],
    reasoning: [],
    mastery: [],
    boss: []
  };

  // ----- Node 1: Concept 起點 (Info Card + Definition Choice + Basic Term) -----
  // Info card for KP#1
  if (kps[0]) {
    const infoId = `info.${uid}.kp1`;
    registerItem({
      id: infoId,
      kind: 'concept',
      type: 'info',
      title: `${u.title} · ${kps[0].title.replace(/^【知識點 1】/, '')}`,
      formula: kps[0].formula || kps[0].core || '',
      body: kps[0].mechanism || kps[0].explanation || '',
      example: kps[0].practicalTip || '',
      svg: kps[0].infograph?.svg || '',
      badge: `${subj.name} · 核心觀念`,
      unitId: uid
    }, `#lesson/${uid}`);
    nodeItemPools.concept.push(infoId);
  }

  // Question 1: Concept Definition / Core understanding
  if (kps[0]) {
    // Generate distractors using other KPs from same subject or unit
    const qId = `q.${uid}.kp1.def`;
    const coreAns = kps[0].core;
    // Distractors
    const otherCores = [];
    if (kps[1]?.core && kps[1].core !== coreAns) otherCores.push(kps[1].core);
    if (kps[2]?.core && kps[2].core !== coreAns) otherCores.push(kps[2].core);
    if (table?.rows?.length >= 2) {
      for (const r of table.rows) {
        if (r[1] && r[1] !== coreAns && !otherCores.includes(r[1])) otherCores.push(r[1]);
        if (otherCores.length >= 3) break;
      }
    }
    while (otherCores.length < 3) {
      otherCores.push(`非本單元之次要現象或無關變因 (${otherCores.length + 1})`);
    }

    const item = {
      id: qId,
      kind: 'concept',
      type: 'choice',
      prompt: `關於「${kps[0].title.replace(/^【知識點 \d】/, '')}」的核心本質與判準，下列敘述何者正確？`,
      options: shuffle([coreAns, ...otherCores.slice(0, 3)], qId),
      answer: coreAns,
      hint: kps[0].formula ? `關鍵公式/法則：${kps[0].formula}` : `先回想「${u.title}」的基本起點。`,
      why: `${kps[0].explanation || kps[0].mechanism} 實戰心法：${kps[0].practicalTip || ''}`,
      level: 1,
      unitId: uid
    };
    const registered = registerItem(item, `#lesson/${uid}`);
    if (registered) nodeItemPools.concept.push(registered);
  }

  // Question from curriculum basic (curQ[0])
  if (curQ[0]) {
    const qId = `cq.${curQ[0].id}`;
    const registered = registerItem({
      id: qId,
      kind: 'concept',
      type: 'choice',
      prompt: curQ[0].prompt,
      options: curQ[0].options,
      answer: curQ[0].options[curQ[0].answer],
      hint: curQ[0].hint || `${u.title} 核心判準`,
      why: curQ[0].explanation,
      level: 1,
      unitId: uid
    }, `#lesson/${uid}`);
    if (registered) nodeItemPools.concept.push(registered);
  }

  // Terminology Match or Input if teachingTable exists
  if (table?.rows?.length >= 3) {
    const matchId = `match.${uid}.table`;
    const pairs = table.rows.slice(0, 4).map(r => [r[0], r[1]]);
    const registered = registerItem({
      id: matchId,
      kind: 'concept',
      type: 'match',
      prompt: `請將「${table.title || u.title}」之對應概念與核心特徵配對`,
      pairs,
      answer: 'match',
      why: table.rows.map(r => `【${r[0]}】${r[1]}`).join('；'),
      level: 1,
      unitId: uid
    }, `#lesson/${uid}`);
    if (registered) nodeItemPools.concept.push(registered);
  }

  // ----- Node 2: Rule 判準法則 (KP#2 Info + Rule Choice + Contrast + Input) -----
  if (kps[1]) {
    const infoId = `info.${uid}.kp2`;
    registerItem({
      id: infoId,
      kind: 'rule',
      type: 'info',
      title: `${u.title} · ${kps[1].title.replace(/^【知識點 2】/, '')}`,
      formula: kps[1].formula || kps[1].core || '',
      body: kps[1].mechanism || kps[1].explanation || '',
      example: kps[1].practicalTip || '',
      svg: kps[1].infograph?.svg || '',
      badge: `${subj.name} · 推演法則`,
      unitId: uid
    }, `#lesson/${uid}`);
    nodeItemPools.rule.push(infoId);
  }

  // Rule Choice: Based on KP#2
  if (kps[1]) {
    const qId = `q.${uid}.kp2.rule`;
    const rightAns = kps[1].practicalTip || kps[1].core;
    const fake1 = `只要觀察表面數值，無需理會限制條件與方向`;
    const fake2 = `該現象在任何極端環境下皆不受限制且絕對恆等`;
    const fake3 = `當條件改變時，其物理量或因果關係將完全隨機變動`;
    const registered = registerItem({
      id: qId,
      kind: 'rule',
      type: 'choice',
      prompt: `在運用「${kps[1].title.replace(/^【知識點 \d】/, '')}」進行解題推演時，最重要的操作法則為何？`,
      options: shuffle([rightAns, fake1, fake2, fake3], qId),
      answer: rightAns,
      hint: kps[1].formula ? `注意法則公式：${kps[1].formula}` : '排除過度絕對化或忽略邊界的選項。',
      why: `${kps[1].mechanism} 考點雷達：${kps[1].examIntel || ''}`,
      level: 2,
      unitId: uid
    }, `#lesson/${uid}`);
    if (registered) nodeItemPools.rule.push(registered);
  }

  // Contrast Question from lessonDeepening (left vs right)
  if (ld?.left && ld?.right) {
    const qId = `q.${uid}.deepening.contrast`;
    const prompt = `【概念辨析】${ld.prompt || `面對情境時，該如何精準分辨「${ld.leftLabel}」與「${ld.rightLabel}」？`}`;
    const rightAns = ld.answer || `【${ld.leftLabel}】：${ld.left}；而【${ld.rightLabel}】：${ld.right}。`;
    const wrong1 = `兩者完全相同，只是不同課本版本的翻譯名稱差異。`;
    const wrong2 = `【${ld.leftLabel}】與【${ld.rightLabel}】在任何情境下皆可直接抵消或互相替代。`;
    const wrong3 = `只有在微觀物理中才需區分，宏觀生活情境中沒有差別。`;

    const registered = registerItem({
      id: qId,
      kind: 'rule',
      type: 'choice',
      prompt,
      options: shuffle([rightAns, wrong1, wrong2, wrong3], qId),
      answer: rightAns,
      hint: `注意「${ld.leftLabel}」與「${ld.rightLabel}」的本質差異。`,
      why: `正確辨析：${ld.leftLabel}＝${ld.left}；${ld.rightLabel}＝${ld.right}。`,
      level: 2,
      unitId: uid
    }, `#lesson/${uid}`);
    if (registered) nodeItemPools.rule.push(registered);
  }

  // Input Question: Formula / Core Rule keyword
  if (kps[1]?.formula && kps[1].formula.length < 35 && kps[1].formula.length > 3) {
    const inputId = `input.${uid}.formula`;
    registerItem({
      id: inputId,
      kind: 'rule',
      type: 'input',
      prompt: `【記憶提取】請填寫「${u.title}」之核心公式或黃金法則`,
      text: `提示（${kps[1].title.replace(/^【知識點 \d】/, '')}）：`,
      answer: kps[1].formula,
      alternatives: [kps[1].formula.replace(/\s+/g, '')],
      why: `核心公式：${kps[1].formula}。${kps[1].practicalTip}`,
      level: 2,
      unitId: uid
    }, `#lesson/${uid}`);
    nodeItemPools.rule.push(inputId);
  }

  // ----- Node 3: Reasoning 思維推演 (Worked Cases Step-Build + Curriculum Q2) -----
  if (wc?.steps && wc.steps.length >= 3) {
    const buildId = `build.${uid}.case`;
    const stepTokens = wc.steps.slice(0, 3);
    const distractStep = `【易錯偽步驟】忽略前提假設，直接跳過中繼運算推導結論`;
    registerItem({
      id: buildId,
      kind: 'reasoning',
      type: 'build',
      prompt: `【思維鏈重組】面對問題：「${wc.problem}」，請依正確推演邏輯排出解題三步驟：`,
      answer: stepTokens.join(' -> '),
      words: shuffle([...stepTokens, distractStep], buildId),
      why: `完整思維鏈：\n1. ${stepTokens[0]}\n2. ${stepTokens[1]}\n3. ${stepTokens[2]}\n防呆檢核：${wc.check || ''}`,
      level: 3,
      unitId: uid
    }, `#lesson/${uid}`);
    nodeItemPools.reasoning.push(buildId);
  }

  // Curriculum Question 2 (應用題)
  if (curQ[1]) {
    const qId = `cq.${curQ[1].id}`;
    const registered = registerItem({
      id: qId,
      kind: 'reasoning',
      type: 'choice',
      prompt: curQ[1].prompt,
      options: curQ[1].options,
      answer: curQ[1].options[curQ[1].answer],
      hint: curQ[1].hint || `注意題幹條件轉換`,
      why: curQ[1].explanation,
      level: 2,
      unitId: uid
    }, `#lesson/${uid}`);
    if (registered) nodeItemPools.reasoning.push(registered);
  }

  // Worked Case Reasoning Choice
  if (wc) {
    const qId = `q.${uid}.case.check`;
    const rightAns = wc.check;
    const wrongAns1 = `只要公式套入正確，計算結果不必代回驗算生活合理性。`;
    const wrongAns2 = `單位不影響最終數值，寫出任意常見單位即可得分。`;
    const wrongAns3 = `在解題完成後，不需檢查極端邊界條件是否成立。`;
    const registered = registerItem({
      id: qId,
      kind: 'reasoning',
      type: 'choice',
      prompt: `【考場防呆】在完成「${wc.problem}」的計算與推導後，解題最後一步必須進行何種核心檢核？`,
      options: shuffle([rightAns, wrongAns1, wrongAns2, wrongAns3], qId),
      answer: rightAns,
      hint: `思維鏈最後的防呆防線。`,
      why: `防呆檢核重點：${wc.check}`,
      level: 3,
      unitId: uid
    }, `#lesson/${uid}`);
    if (registered) nodeItemPools.reasoning.push(registered);
  }

  // ----- Node 4: Mastery 避坑精熟 (KP#3 Info + Pitfall Choice + CAP / Periodic Exam) -----
  if (kps[2]) {
    const infoId = `info.${uid}.kp3`;
    registerItem({
      id: infoId,
      kind: 'mastery',
      type: 'info',
      title: `${u.title} · ${kps[2].title.replace(/^【知識點 3】/, '')}`,
      formula: kps[2].formula || '🛡️ 考場避坑防線',
      body: kps[2].mechanism || kps[2].explanation || '',
      example: kps[2].practicalTip || '',
      svg: kps[2].infograph?.svg || '',
      badge: `${subj.name} · 考場避坑`,
      unitId: uid
    }, `#lesson/${uid}`);
    nodeItemPools.mastery.push(infoId);
  }

  // Pitfall Question
  if (u.pitfall || kps[2]) {
    const qId = `q.${uid}.pitfall`;
    const prompt = `【考場避坑】在「${u.title}」的考試情境中，學生最常犯的觀念盲點或計算陷阱為何？`;
    const rightAns = u.pitfall || kps[2]?.core || '混淆前提定義與忽略邊界條件';
    const fake1 = `完全沒有任何陷阱，只要背下定義就能拿到滿分。`;
    const fake2 = `出題老師必定會刻意設計超出 108 課綱範圍的公式。`;
    const fake3 = `所有選項皆完全正確，本單元題目不需要特別防呆。`;

    const registered = registerItem({
      id: qId,
      kind: 'mastery',
      type: 'choice',
      prompt,
      options: shuffle([rightAns, fake1, fake2, fake3], qId),
      answer: rightAns,
      hint: `留意容易把什麼概念混淆或算錯。`,
      why: `考場避坑防線：${u.pitfall}。防禦心法：${kps[2]?.practicalTip || ''}`,
      level: 3,
      unitId: uid
    }, `#lesson/${uid}`);
    if (registered) nodeItemPools.mastery.push(registered);
  }

  // Inject CAP real exam question if available
  if (capList.length > 0) {
    const capQ = capList[0];
    const qId = `cap.${capQ.id}`;
    const optsObj = capQ.options || {};
    const optLetters = ['A', 'B', 'C', 'D'];
    const options = optLetters.map(l => optsObj[l]).filter(Boolean);
    const ansText = optsObj[capQ.answer];

    if (options.length === 4 && ansText) {
      const registered = registerItem({
        id: qId,
        kind: 'mastery',
        type: 'choice',
        prompt: `【${capQ.year} 年會考真題 · 第 ${capQ.number} 題】${capQ.stem}`,
        options: shuffle(options, qId),
        answer: ansText,
        crops: capQ.crops || [],
        hint: capQ.explanation?.keyIdea || `鎖定「${u.title}」核心觀念解題`,
        why: `【會考詳解】${capQ.explanation?.steps?.join(' ') || ''}。避坑提醒：${capQ.explanation?.trap || ''}`,
        level: 4,
        unitId: uid,
        isCap: true
      }, `#cap-exam/${capQ.year}/${capQ.subject}/${capQ.number}`);
      if (registered) nodeItemPools.mastery.push(registered);
    }
  }

  // ----- Node 5: Boss 單元挑戰 (Mixed Pool from Nodes 1..4) -----
  const allScorable = [
    ...nodeItemPools.concept,
    ...nodeItemPools.rule,
    ...nodeItemPools.reasoning,
    ...nodeItemPools.mastery
  ].filter(id => allItems.get(id)?.type !== 'info');

  nodeItemPools.boss = allScorable;

  // Build the 5 node descriptors
  const nodes = [
    { id: `${uid}:concept`, kind: 'concept', title: '概念起點', icon: '🌱', pool: nodeItemPools.concept, size: Math.min(nodeItemPools.concept.length, 6) },
    { id: `${uid}:rule`, kind: 'rule', title: '判準法則', icon: '📐', pool: nodeItemPools.rule, size: Math.min(nodeItemPools.rule.length, 6) },
    { id: `${uid}:reasoning`, kind: 'reasoning', title: '思維推演', icon: '⚡', pool: nodeItemPools.reasoning, size: Math.min(nodeItemPools.reasoning.length, 6) },
    { id: `${uid}:mastery`, kind: 'mastery', title: '避坑精熟', icon: '🛡️', pool: nodeItemPools.mastery, size: Math.min(nodeItemPools.mastery.length, 6) },
    { id: `${uid}:boss`, kind: 'boss', title: '單元挑戰', icon: '🏆', pool: nodeItemPools.boss, size: Math.min(nodeItemPools.boss.length, 10), hearts: 3 }
  ];

  // Build guide metadata
  const alignment = officialAlignment[uid] || { refs: [] };
  const guide = {
    unitId: uid,
    title: u.title,
    subject: subj.name,
    grade: u.grade,
    term: u.term,
    concept: u.concept,
    example: u.example,
    pitfall: u.pitfall,
    task: u.task,
    knowledgePoints: kps.map(k => ({
      title: k.title,
      core: k.core,
      mechanism: k.mechanism,
      formula: k.formula,
      tip: k.practicalTip,
      svg: k.infograph?.svg || ''
    })),
    table: table ? { title: table.title, rows: table.rows } : null,
    workedCase: wc ? { problem: wc.problem, steps: wc.steps, check: wc.check } : null,
    officialRefs: alignment.refs || []
  };

  return { nodes, guide };
}

// -------------------------------------------------------------
// 3. Assemble Stories (36 Cross-Disciplinary Case Stories)
// -------------------------------------------------------------
function buildStories() {
  const stories = [];
  const storyThemes = [
    { s: 's1', title: '潛水員的數線危機', subj: '數學 / 自然', line1: '潛水員抵達海平面下 12 公尺處，需要上升至安全水層。', q: '若先上升 7 公尺再下降 4 公尺，最後深度為？', ans: '海平面下 9 公尺' },
    { s: 's1', title: '顯微鏡下的生命密碼', subj: '生物', line1: '在實驗室觀察洋蔥表皮細胞與水蘊草葉片細胞。', q: '換用高倍物鏡後，視野範圍與亮度如何變化？', ans: '範圍變小且亮度變暗' },
    { s: 's1', title: '大航海時代的熱蘭遮城', subj: '歷史 / 地理', line1: '荷蘭東印度公司在臺灣南部建立安平古堡與貿易航線。', q: '十七世紀歐洲人來臺的主要驅動因素是？', ans: '全球海洋貿易網絡擴張' },
    { s: 's1', title: '等高線與暴雨防汛', subj: '地理', line1: '山區氣象站發布豪雨特報，巡查員調閱等高線地形圖。', q: '等高線彎曲處 V 字形尖端指向高海拔處，代表什麼地形？', ans: '山谷（易匯集水流）' },
    { s: 's1', title: '少年法庭的溫柔界線', subj: '公民', line1: '阿凱因一時衝動與同儕發生衝突，接受少年事件處理程序。', q: '少年事件處理法最優先的核心立法原則為何？', ans: '健全少年自我成長，以保護輔導為優先' },
    { s: 's1', title: '六書造字與漢字密碼', subj: '國文', line1: '國文課上探索「木、本、末、休、河」的造字結構。', q: '在「刀」鋒處加上一點標示刃部的造字法則為？', ans: '指事' },

    { s: 's2', title: '孟德爾豌豆園的遺傳奇蹟', subj: '生物', line1: '修道院花園裡，高莖豌豆與矮莖豌豆正展開雜交實驗。', q: '兩株異型合子高莖豌豆（Tt）交配，子代出現矮莖（tt）的機率為？', ans: '25% (1/4)' },
    { s: 's2', title: '高鐵走廊與一日生活圈', subj: '地理 / 歷史', line1: '臺灣高鐵連結西部走廊，形成南北 90 分鐘便捷交通生活圈。', q: '高鐵快速便捷交通同時也可能對沿線小市鎮造成何種挑戰？', ans: '吸管效應（人口資源向都會中心集中）' },
    { s: 's2', title: '清領開港與茶香大稻埕', subj: '歷史', line1: '淡水與安平開港後，外商洋行紛紛設立於大稻埕河岸。', q: '清末促成臺灣對外貿易轉為出超的大宗三寶商品是？', ans: '茶葉、蔗糖、樟腦' },
    { s: 's2', title: '二元一次方程式的雞兔同籠', subj: '數學', line1: '農場裡有雞與兔共 20 隻，數地上的腳共有 56 隻。', q: '請問農場裡的兔子有幾隻？', ans: '8 隻' },
    { s: 's2', title: '呼吸與循環的微觀接力', subj: '生物', line1: '劇烈慢跑運動後，血液中二氧化碳濃度升高刺激大腦。', q: '人體主要透過何種中樞調節呼吸運動之快慢頻率？', ans: '腦幹' },
    { s: 's2', title: '文言虛字的語氣魔術', subj: '國文', line1: '讀「學而時習之，不亦說乎」，探索虛字「之」與「乎」的靈魂。', q: '「學而時習之」文句中的代詞「之」主要指代？', ans: '所學的內容與知識' },

    { s: 's3', title: '阿基米德的王冠浮力之謎', subj: '理化·物理', line1: '敘拉古國王懷疑金匠在純金王冠中摻入了銀，請阿基米德檢驗。', q: '將物體浸入水中時，其所受向上浮力大小等於？', ans: '物體排開的液體重量' },
    { s: 's3', title: '拉瓦節與質量守恆定律', subj: '理化·化學', line1: '在密閉玻璃鐘罩中加熱金屬，天平兩端始終保持精確平衡。', q: '在沒有物質進出的密閉系統中進行化學反應，前後總質量如何？', ans: '必然嚴格保持不變' },
    { s: 's3', title: '畢氏定理與古代金字塔量測', subj: '數學', line1: '工匠用長度 3、4、5 的結繩在地面精準拉出直角基底。', q: '直角三角形中兩股長為 5 與 12，則斜邊長度為？', ans: '13' },
    { s: 's3', title: '季風亞洲的水稻與古文明', subj: '地理', line1: '夏季吹向亞洲大陸的暖濕季風，滋潤了廣大的沖積平原。', q: '季風氣候區有利於水稻集約農業的最核心優勢為？', ans: '夏季高溫多雨、雨熱同期' },
    { s: 's3', title: '封建瓦解與諸子百家爭鳴', subj: '歷史', line1: '春秋戰國時代鐵器牛耕普及，封建秩序崩解，學者提出救世學說。', q: '秦始皇統一天下後，廢除封建制度代之以何種中央集權體制？', ans: '郡縣制' },
    { s: 's3', title: '古典近體詩的對仗美學', subj: '國文', line1: '「大漠孤煙直，長河落日圓」，字字句句凝結大漠壯闊風光。', q: '七言律詩中嚴格規定必須詞性字面工整對仗的聯次為？', ans: '頷聯（三四句）與頸聯（五六句）' },

    { s: 's4', title: '勒沙特列平衡移動天平', subj: '理化·化學', line1: '黃色的鉻酸根離子水溶液加入濃鹽酸，顏色逐漸轉為紅橙色。', q: '化學平衡達到動態平衡時，最重要的核心特徵為？', ans: '正反應速率等於逆反應速率' },
    { s: 's4', title: '等差級數與高斯速算奇蹟', subj: '數學', line1: '少年高斯在黑板上迅速算出了 1 加到 100 的總和為 5050。', q: '首項為 3，公差為 4 的等差數列，第 10 項為？', ans: '39' },
    { s: 's4', title: '現代法治：民刑行政大辨析', subj: '公民', line1: '車禍案件現場，交警開罰單、被害人求償、檢察官偵查。', q: '行為之處罰以行為時法律有明文規定者為限，此原則為？', ans: '罪刑法定原則' },
    { s: 's4', title: '西力東漸與利瑪竇的坤輿地圖', subj: '歷史', line1: '耶穌會傳教士利瑪竇攜帶西洋鐘錶與世界地圖來到明朝北京。', q: '明末徐光啟與利瑪竇合作翻譯的重要西方數學典籍為？', ans: '《幾何原本》' },
    { s: 's4', title: '比熱實驗與海陸風日夜輪替', subj: '理化·物理', line1: '白天烈日下海灘的沙子燙腳，而海水卻依舊涼爽。', q: '相同質量水與沙石吸收相同熱量，沙石升溫顯著較快是因為？', ans: '沙石的比熱小於水' },
    { s: 's4', title: '宋詞長短句與豪放婉約', subj: '國文', line1: '「大江東去，浪淘盡，千古風流人物」，蘇軾赤壁懷古千古傳唱。', q: '宋詞又被稱為「長短句」，其主要特點為？', ans: '依照詞牌曲調填詞，句式長短錯落便於歌唱' },

    { s: 's5', title: '板塊運動與造就福爾摩沙', subj: '地球科學', line1: '菲律賓海板塊與歐亞板塊持續擠壓，中央山脈至今仍在隆起。', q: '臺灣島位於哪兩個主要板塊的聚合板塊邊界？', ans: '菲律賓海板塊與歐亞板塊' },
    { s: 's5', title: '牛頓第二定律與火箭升空', subj: '理化·物理', line1: '火箭發動機噴射高壓氣體產生強大推力，火箭加速升空。', q: '質量 2 kg 的物體受到 10 N 的合力作用，加速度為？', ans: '5 m/s²' },
    { s: 's5', title: '圓周角與外接圓的幾何證明', subj: '數學', line1: '圓形劇場看臺上，觀眾無論坐在圓弧哪個位置視角皆相同。', q: '同弧所對的圓周角度數，等於其所對圓心角度數的？', ans: '一半 (1/2)' },
    { s: 's5', title: '機會成本與市場經濟選擇', subj: '公民', line1: '週六下午只有兩小時，在讀書、打球與打工之間做抉擇。', q: '經濟學中做出選擇時所付出的「機會成本」是指？', ans: '被放棄的各選項中價值最高者' },
    { s: 's5', title: '古希臘雅典與公民大會', subj: '歷史', line1: '雅典衛城普尼克斯山丘上，公民們正聚集投票表決城邦法律。', q: '西方歷史上首創成年男性公民直接參與投票表決的城邦是？', ans: '雅典' },
    { s: 's5', title: '古典小說紅樓與人物風采', subj: '國文', line1: '走進大觀園，林黛玉葬花、王熙鳳弄權，刻畫世態炎涼。', q: '古典小說塑造生動立體的人物性格時，最有效的手法為？', ans: '透過具體言行細節、抉擇衝突與心理轉變' },

    { s: 's6', title: '法拉第感應與發電機革命', subj: '理化·物理', line1: '將磁鐵快速穿過閉合線圈，檢流計指針瞬間發生劇烈偏轉。', q: '發電機將力學能轉換為電能所依據的核心物理原理為？', ans: '電磁感應現象' },
    { s: 's6', title: '地軸傾斜與地球四季星空', subj: '地球科學', line1: '冬至與夏至的太陽正午仰角截然不同，四季如期更替。', q: '地球表面產生四季變化的最主要天文成因為？', ans: '地軸傾斜約 23.5 度並繞太陽公轉' },
    { s: 's6', title: '二次函數拋物線與最完美拋射', subj: '數學', line1: '籃球選手起跳投籃，籃球在空中劃出一道對稱優美的拋物線。', q: '二次函數 y = −(x − 3)² + 9 在 x 等於多少時達到最大值 9？', ans: 'x = 3' },
    { s: 's6', title: '冷戰鐵幕與柏林圍牆倒塌', subj: '歷史', line1: '1989 年市民走上柏林街頭敲碎水泥牆，冷戰對峙走向終點。', q: '第二次世界大戰後美蘇兩大陣營長期對峙的狀態稱為？', ans: '冷戰' },
    { s: 's6', title: '全球化分工與碳足跡永續', subj: '地理 / 公民', line1: '一支智慧型手機零件來自十多個國家，經過全球跨國供應鏈。', q: '工廠排放廢氣汙染環境卻無需支付成本，經濟學上稱為？', ans: '外部成本（負外部性）' },
    { s: 's6', title: '會考寫作審題與立意高飛', subj: '國文', line1: '面對會考寫作題目，從真實生活素材提煉出生命洞察與反思。', q: '寫作時能讓閱卷老師感受情感真實深度的關鍵要素為？', ans: '精準刻畫可觀察的動作、場景細節並呼應立意' }
  ];

  storyThemes.forEach((st, i) => {
    const storyId = `story-${st.s}-${String(i % 6 + 1).padStart(2, '0')}`;
    const questionId = `q.${storyId}`;
    registerItem({
      id: questionId,
      kind: 'story',
      type: 'choice',
      prompt: `【探究檢核】${st.q}`,
      options: shuffle([st.ans, '與情境相反之錯誤推論', '未經證實之假設條件', '缺乏科學與史料依據之臆測'], questionId),
      answer: st.ans,
      hint: `回到情境對話中尋找關鍵證據。`,
      why: `正確答案為「${st.ans}」。${st.line1}`,
      level: 2
    }, `#story/${storyId}`);

    stories.push({
      id: storyId,
      sectionId: st.s,
      title: st.title,
      subjectTag: st.subj,
      scenario: st.line1,
      steps: [
        { id: `line.${storyId}.1`, type: 'line', speaker: '知知導師', text: `同學好！今天我們要探索「${st.title}」的真實情境。` },
        { id: `line.${storyId}.2`, type: 'line', speaker: '情境觀測', text: st.line1 },
        { id: questionId, type: 'choice' },
        { id: `line.${storyId}.3`, type: 'line', speaker: '知知導師', text: `太棒了！能夠從真實現象中抽象出學科原理，這就是 108 課綱的核心素養！` }
      ]
    });
  });

  return stories;
}

// -------------------------------------------------------------
// 4. Main Build Execution
// -------------------------------------------------------------
console.log('🚀 Starting JH Quest Course Builder...');

// Group units by grade & term
const unitsBySection = new Map();
for (const sec of SECTIONS_CONFIG) {
  unitsBySection.set(sec.id, []);
}

for (const u of units) {
  const secId = `s${(u.grade - 7) * 2 + u.term}`;
  if (unitsBySection.has(secId)) {
    unitsBySection.get(secId).push(u);
  }
}

// Build each section data
const builtSections = [];
for (const secConfig of SECTIONS_CONFIG) {
  const uList = unitsBySection.get(secConfig.id) || [];
  const sectionUnits = [];
  const sectionFileUnits = {};

  for (const u of uList) {
    const { nodes, guide } = buildUnitNodes(u);
    const subj = subjectById[u.subject] || { name: u.subject };

    const unitMeta = {
      id: u.id,
      title: u.title,
      subject: u.subject,
      subjectName: subj.name,
      domain: subj.domain,
      grade: u.grade,
      term: u.term,
      icon: subj.icon || '📚',
      nodes: nodes.map(n => ({
        id: n.id,
        kind: n.kind,
        title: n.title,
        icon: n.icon,
        size: n.size
      }))
    };
    sectionUnits.push(unitMeta);

    sectionFileUnits[u.id] = {
      guide,
      nodes: Object.fromEntries(nodes.map(n => [n.id, n.pool]))
    };
  }

  builtSections.push({
    ...secConfig,
    units: sectionUnits
  });

  // Write section chunk (dist/quest/course/s1.json etc.)
  const secFilePath = path.join(OUT_DIR, `${secConfig.id}.json`);
  fs.writeFileSync(secFilePath, JSON.stringify({
    id: secConfig.id,
    title: secConfig.title,
    units: sectionFileUnits
  }, null, 2), 'utf8');
  console.log(`✔ Generated ${secConfig.id}.json (${sectionUnits.length} units)`);
}

// Build branches (b-chinese, b-english, ..., b-periodic, b-cap)
const builtBranches = [];
for (const brConfig of BRANCHES_CONFIG) {
  let brUnits = [];
  let brFileUnits = {};

  if (brConfig.isSpecial === 'periodic') {
    // 17 Periodic Exams
    for (const exam of periodicExams) {
      const eid = `periodic-${exam.id}`;
      const examTitle = `第 ${exam.examNumber} 次段考 · ${exam.grade}年級${exam.term === 1 ? '上' : '下'}學期預備卷`;
      const pool = [];
      for (const [sKey, sObj] of Object.entries(exam.subjects || {})) {
        for (const ep of sObj.examPaperQuestions || []) {
          const qId = `pe.${ep.id}`;
          const reg = registerItem({
            id: qId,
            kind: 'mastery',
            type: 'choice',
            prompt: `【${ep.sourceSchool || '名校段考精選'}】${ep.question}`,
            options: ep.options,
            answer: ep.options[ep.answer],
            hint: ep.thinkingTrap ? `段考陷阱提示：${ep.thinkingTrap}` : '注意題目關鍵字與限制條件',
            why: ep.solution,
            level: 3
          }, `#periodic-exam/${exam.id}`);
          if (reg) pool.push(reg);
        }
      }

      const nodes = [
        { id: `${eid}:mock`, kind: 'boss', title: '名校段考模考', icon: '📝', pool: pool.slice(0, 10), size: Math.min(pool.length, 10), hearts: 3 }
      ];

      brUnits.push({
        id: eid,
        title: examTitle,
        subject: 'periodic',
        subjectName: '段考衝刺',
        icon: '📝',
        nodes: nodes.map(n => ({ id: n.id, kind: n.kind, title: n.title, icon: n.icon, size: n.size }))
      });

      brFileUnits[eid] = {
        guide: {
          title: examTitle,
          scopeSummary: exam.scopeSummary || '',
          knowledgePoints: []
        },
        nodes: Object.fromEntries(nodes.map(n => [n.id, n.pool]))
      };
    }
  } else if (brConfig.isSpecial === 'cap') {
    // CAP Special Focus by Year (109~115)
    for (const yr of [109, 110, 111, 112, 113, 114, 115]) {
      const yid = `cap-yr-${yr}`;
      const yTitle = `${yr} 年國中教育會考五科全真精選`;
      const yrQs = capBank.questions.filter(q => q.year === yr && q.options && Object.keys(q.options).length === 4);
      const pool = yrQs.slice(0, 20).map(q => {
        const qId = `cap.${q.id}`;
        const optsObj = q.options;
        const options = ['A', 'B', 'C', 'D'].map(l => optsObj[l]).filter(Boolean);
        return registerItem({
          id: qId,
          kind: 'mastery',
          type: 'choice',
          prompt: `【${q.year} 年會考 · ${subjectById[q.subject]?.name || q.subject} · 第 ${q.number} 題】${q.stem}`,
          options: shuffle(options, qId),
          answer: optsObj[q.answer],
          crops: q.crops || [],
          hint: q.explanation?.keyIdea || '會考核心破題思考',
          why: q.explanation?.steps?.join(' ') || '',
          level: 4,
          isCap: true
        }, `#cap-exam/${q.year}/${q.subject}/${q.number}`);
      }).filter(Boolean);

      const nodes = [
        { id: `${yid}:cap`, kind: 'boss', title: `${yr} 會考特訓`, icon: '🎯', pool: pool.slice(0, 12), size: Math.min(pool.length, 12), hearts: 3 }
      ];

      brUnits.push({
        id: yid,
        title: yTitle,
        subject: 'cap',
        subjectName: '會考題庫',
        icon: '🎯',
        nodes: nodes.map(n => ({ id: n.id, kind: n.kind, title: n.title, icon: n.icon, size: n.size }))
      });

      brFileUnits[yid] = {
        guide: {
          title: yTitle,
          concept: `收錄 ${yr} 年國中教育會考五科核心試題與官方詳解。`,
          knowledgePoints: []
        },
        nodes: Object.fromEntries(nodes.map(n => [n.id, n.pool]))
      };
    }
  } else {
    // Subject focus branches (b-chinese, b-english, b-math, b-science, b-social, b-life)
    const targetSubjs = Array.isArray(brConfig.filterSubj) ? brConfig.filterSubj : [brConfig.filterSubj];
    const filteredUnits = units.filter(u => targetSubjs.includes(u.subject));

    for (const u of filteredUnits) {
      const { nodes, guide } = buildUnitNodes(u);
      const subj = subjectById[u.subject] || { name: u.subject };

      brUnits.push({
        id: u.id,
        title: u.title,
        subject: u.subject,
        subjectName: subj.name,
        grade: u.grade,
        term: u.term,
        icon: subj.icon || '📚',
        nodes: nodes.map(n => ({ id: n.id, kind: n.kind, title: n.title, icon: n.icon, size: n.size }))
      });

      brFileUnits[u.id] = {
        guide,
        nodes: Object.fromEntries(nodes.map(n => [n.id, n.pool]))
      };
    }
  }

  builtBranches.push({
    ...brConfig,
    units: brUnits
  });

  const brFilePath = path.join(OUT_DIR, `${brConfig.id}.json`);
  fs.writeFileSync(brFilePath, JSON.stringify({
    id: brConfig.id,
    title: brConfig.title,
    units: brFileUnits
  }, null, 2), 'utf8');
  console.log(`✔ Generated branch ${brConfig.id}.json (${brUnits.length} units)`);
}

// Build Stories
const stories = buildStories();
const storiesFilePath = path.join(OUT_DIR, 'stories.json');
fs.writeFileSync(storiesFilePath, JSON.stringify({
  stories: Object.fromEntries(stories.map(s => [s.id, s]))
}, null, 2), 'utf8');
console.log(`✔ Generated stories.json (${stories.length} stories)`);

// Build items dictionary chunk
const allItemsObj = Object.fromEntries(allItems);
const itemsFilePath = path.join(OUT_DIR, 'items.json');
fs.writeFileSync(itemsFilePath, JSON.stringify({ items: allItemsObj }, null, 2), 'utf8');
console.log(`✔ Generated items.json (${allItems.size} items)`);

// Build Root index.json
const rootIndex = {
  version: COURSE_VERSION,
  generatedAt: new Date().toISOString(),
  totalUnits: units.length,
  totalItems: allItems.size,
  sections: builtSections,
  branches: builtBranches,
  stories: stories.map(s => ({
    id: s.id,
    sectionId: s.sectionId,
    title: s.title,
    subjectTag: s.subjectTag,
    scenario: s.scenario
  }))
};

const indexFilePath = path.join(OUT_DIR, 'index.json');
fs.writeFileSync(indexFilePath, JSON.stringify(rootIndex, null, 2), 'utf8');
console.log(`✔ Generated index.json (Total sections: ${builtSections.length}, Total branches: ${builtBranches.length})`);

// Output Build Report
const report = {
  version: COURSE_VERSION,
  builtAt: new Date().toISOString(),
  statistics: {
    curriculumUnits: units.length,
    totalSections: builtSections.length,
    totalBranches: builtBranches.length,
    totalRegisteredItems: allItems.size,
    totalStories: stories.length,
    excludedItemsCount: excludedItems.length
  },
  sectionsSummary: builtSections.map(s => ({
    id: s.id,
    title: s.title,
    unitCount: s.units.length,
    nodeCount: s.units.reduce((a, u) => a + u.nodes.length, 0)
  })),
  branchesSummary: builtBranches.map(b => ({
    id: b.id,
    title: b.title,
    unitCount: b.units.length
  })),
  excludedItemsSample: excludedItems.slice(0, 10)
};

const reportDir = path.resolve('docs/quest-redesign');
fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, 'COURSE-BUILD-REPORT.json'), JSON.stringify(report, null, 2), 'utf8');
console.log('🎉 Course build completed successfully! Report saved to docs/quest-redesign/COURSE-BUILD-REPORT.json\n');
