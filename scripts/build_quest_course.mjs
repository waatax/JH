import { writeAtomic } from "./write-atomic.mjs";
// scripts/build_quest_course.mjs
// Builds the 108 Curriculum Junior High (JH Quest) course structure & items from existing high quality assets.
// Output: dist/quest/course/index.json, s1.json..s6.json, b-*.json, stories.json and COURSE-BUILD-REPORT.json

import fs from 'node:fs';
import path from 'node:path';
import { enrichUnit } from './quest-enrichment.mjs';

import { units, subjects, subjectById, questions as curriculumQuestions } from '../dist/curriculum.js';
import { explicitKnowledgePoints } from '../dist/explicit-knowledge-points.js';
import { teachingTables } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';
import { lessonDeepening } from '../dist/lesson-deepening.js';
import { deepeningCharts } from '../dist/deepening-charts.js';
import { getPublisherGuideForUnit } from '../dist/publisher-matrix.js';
import { periodicExams } from '../dist/periodic-exam-data.js';
import { officialAlignment, officialSources } from '../dist/official-alignment-data.js';
import { getCapExplanation, formatCapExplanation, relatedCapQuestions } from '../dist/cap-explanations.js';
import { examTypesData } from '../dist/exam-types-data.js';
import { unitWonderData, subjectLoveData } from '../dist/joyful-learning.js';

export const COURSE_VERSION = '2026-11-05.v3';
const enrichmentReport = [];
const OUT_DIR = path.resolve('dist/quest/course');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Load CAP Exam Bank
const capBankPath = path.resolve('dist/cap-bank.json');
const capBank = JSON.parse(fs.readFileSync(capBankPath, 'utf8'));
const capGroupMap = new Map((capBank.groups || []).map(g => [g.id, g]));

export function formatCapQuestion(q) {
  if (!q || !q.crops?.length || !/^[A-D]$/.test(q.answer || '')) return null;
  // The original image is authoritative: extracted option text may be missing or garbled.
  const options = Array.from(q.optionLetters || 'ABCD');
  const ansText = q.answer;
  if (options.length < 2 || !options.includes(ansText)) return null;

  const qId = `cap.${q.id}`;
  const CAP_SUBJ_NAMES = {
    chinese: '國語文',
    english: '英語閱讀',
    listening: '英語聽力',
    math: '數學',
    science: '自然科學',
    social: '社會領域'
  };
  const subjName = CAP_SUBJ_NAMES[q.subject] || subjectById[q.subject]?.name || q.subject;

  let promptText = `【${q.year} 年會考 · ${subjName} · 第 ${q.number} 題】`;
  let readingText = '';
  const allCrops = [...(q.crops || [])];

  if (q.groupId && capGroupMap.has(q.groupId)) {
    const g = capGroupMap.get(q.groupId);
    if (g && g.text) {
      const stripped = g.text.replace(/^請閱讀以下.*?[：:\n]+/g, '').trim();
      if (stripped.length > 20 && !/^[\d\s:.,-]+$/.test(stripped)) {
        readingText = stripped;
      }
    }
    if (g && Array.isArray(g.crops)) {
      for (const gc of [...g.crops].reverse()) {
        if (!allCrops.some(c => c.src === gc.src)) {
          allCrops.unshift(gc);
        }
      }
    }
  }

  promptText += q.subject === 'listening' ? '請播放錄音，依題圖選擇答案。' : '請閱讀題圖及題組材料，選擇答案。';

  const why = formatCapExplanation(q);
  const explanation = getCapExplanation(q);

  return {
    id: qId,
    kind: 'mastery',
    type: q.subject === 'listening' ? 'listen' : 'choice',
    prompt: promptText,
    // OCR text is not sufficiently reliable to replace the original images.
    options,
    answer: ansText,
    crops: allCrops,
    audio: q.audio || undefined,
    sourcePaper: `downloads/cap/${q.year}-${q.subject}.${q.subject === 'listening' ? 'zip' : 'pdf'}`,
    hint: explanation.ready ? explanation.hint : `仔細核對「${subjName}」題目中的條件與提問。`,
    explanationStatus: explanation.ready ? 'ai-derived' : 'pending',
    relatedQuestions: relatedCapQuestions(q, capBank.questions),
    why,
    level: 4,
    unitId: (q.unitIds && q.unitIds[0]) || (q.subject === 'chinese' ? 'chinese-1' : q.subject === 'math' ? 'math-1' : q.subject === 'english' || q.subject === 'listening' ? 'english-1' : q.subject === 'science' ? 'biology-1' : 'history-1'),
    isCap: true,
    year: q.year,
    subject: q.subject,
    number: q.number
  };
}

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
  // CAP answer labels remain A/B/C/D from the source images; retain the complete explanation.
  if (item.why && !item.isCap) item.why = cleanText(item.why);
  if (item.hint && !item.isCap) item.hint = cleanText(item.hint);

  allItems.set(item.id, item);
  return item.id;
}

// -------------------------------------------------------------
// 1. Definition of Sections (6 Semesters) and Branches (8 Focus Tracks)
// -------------------------------------------------------------
const SECTIONS_CONFIG = [
  { id: 's1', no: 1, grade: 7, term: 1, gradeName: '國一', termName: '上學期', title: '七年級上學期', level: '國一打底與概念溯源 (七上)', color: 'green', icon: '🌱' },
  { id: 's2', no: 2, grade: 7, term: 2, gradeName: '國一', termName: '下學期', title: '七年級下學期', level: '國一進階與生活應用 (七下)', color: 'teal', icon: '🌿' },
  { id: 's3', no: 3, grade: 8, term: 1, gradeName: '國二', termName: '上學期', title: '八年級上學期', level: '國二推理與實驗實作 (八上)', color: 'sky', icon: '🔬' },
  { id: 's4', no: 4, grade: 8, term: 2, gradeName: '國二', termName: '下學期', title: '八年級下學期', level: '國二深化與邏輯建模 (八下)', color: 'blue', icon: '📐' },
  { id: 's5', no: 5, grade: 9, term: 1, gradeName: '國三', termName: '上學期', title: '九年級上學期', level: '國三統整與全科素養 (九上)', color: 'indigo', icon: '🧭' },
  { id: 's6', no: 6, grade: 9, term: 2, gradeName: '國三', termName: '下學期', title: '九年級下學期', level: '國三衝刺與會考精熟 (九下)', color: 'gold', icon: '👑' }
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
function tableRecallItem(u,table,rowIndex,id,kind) {
  const row=table.rows[rowIndex];
  const alternatives=table.rows.filter(r=>r[0]!==row[0] && r[1]!==row[1]);
  const options=[...new Set([row[1],...alternatives.map(r=>r[1])])].slice(0,4);
  if(options.length<2)return null;
  return {id,kind,type:'choice',unitId:u.id,level:2,
    prompt:'【概念辨識】在「'+table.title+'」比較表中，「'+row[0]+'」對應哪一項規則或特徵？',
    options:shuffle(options,id),answer:row[1],
    hint:'先回想「'+row[0]+'」的定義，再與同課其他概念比較。',
    why:row[0]+'：'+row[1]+'。實例與界線：'+row[2],
    sourceBasis:'teachingTables.'+u.id+'.rows.'+rowIndex,
    optionExplanations:Object.fromEntries(options.map(option=>[option,option===row[1]?'符合本表判準：'+row[0]+' → '+row[1]:'這段描述在本表對應「'+table.rows.find(r=>r[1]===option)[0]+'」，請再比較與「'+row[0]+'」的差異。']))
  };
}

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
      explanation: kps[0].explanation || '',
      examIntel: kps[0].examIntel || '',
      bloom: kps[0].bloom || '記憶與理解',
      examWeight: kps[0].examWeight || '★★★',
      example: kps[0].practicalTip || '',
      svg: kps[0].infograph?.svg || '',
      infographTitle: kps[0].infograph?.title || '',
      infographCaption: kps[0].infograph?.caption || '',
      badge: `${subj.name} · 核心觀念`,
      unitId: uid
    }, `#lesson/${uid}`);
    nodeItemPools.concept.push(infoId);
  }

  // Same-row retrieval; no semantically equivalent bare rule used as a distractor.
  const conceptItem=tableRecallItem(u,table,0,`q.${uid}.kp1.def`,'concept');
  if(conceptItem)nodeItemPools.concept.push(registerItem(conceptItem,`#lesson/${uid}`));

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
      explanation: kps[1].explanation || '',
      examIntel: kps[1].examIntel || '',
      bloom: kps[1].bloom || '應用與分析',
      examWeight: kps[1].examWeight || '★★★',
      example: kps[1].practicalTip || '',
      svg: kps[1].infograph?.svg || '',
      infographTitle: kps[1].infograph?.title || '',
      infographCaption: kps[1].infograph?.caption || '',
      badge: `${subj.name} · 推演法則`,
      unitId: uid
    }, `#lesson/${uid}`);
    nodeItemPools.rule.push(infoId);
  }

  const ruleItem=tableRecallItem(u,table,1,`q.${uid}.kp2.rule`,'rule');
  if(ruleItem)nodeItemPools.rule.push(registerItem(ruleItem,`#lesson/${uid}`));

    // Compare actual descriptions from the authored contrast, without generic fake options.
  if(ld?.left && ld?.right && ld.left!==ld.right) {
    const id=`q.${uid}.deepening.contrast`;
    nodeItemPools.rule.push(registerItem({id,kind:'rule',type:'choice',unitId:uid,level:2,
      prompt:`【概念比較】在本單元對照中，哪一段描述的是「${ld.leftLabel}」？`,
      options:shuffle([ld.left,ld.right],id),answer:ld.left,
      hint:`先比較「${ld.leftLabel}」與「${ld.rightLabel}」各自的判準。`,
      why:`${ld.leftLabel}：${ld.left}；${ld.rightLabel}：${ld.right}。`,
      optionExplanations:{[ld.left]:`符合：${ld.leftLabel}。`,[ld.right]:`這段對應「${ld.rightLabel}」，請比較兩者的條件與對象。`}
    },`#lesson/${uid}`));
  }

    // Formulas are studied with examples; do not grade exact reproduction of a long sentence.

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

  // Retrieve the actual final step in the worked example.
  if(wc?.steps?.length>=3) {
    const id=`q.${uid}.case.check`,steps=wc.steps.slice(0,3);
    nodeItemPools.reasoning.push(registerItem({id,kind:'reasoning',type:'choice',unitId:uid,level:3,
      prompt:`【推理順序】在示範例題「${wc.problem}」的三步推理中，哪一步列在最後？`,
      options:shuffle(steps,id),answer:steps[2],hint:'先想起題目的已知條件，再依示範推理順序回想。',
      why:steps.map((s,i)=>`${i+1}. ${s}`).join('\n')+'\n驗證：'+wc.check
    },`#lesson/${uid}`));
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
      explanation: kps[2].explanation || '',
      examIntel: kps[2].examIntel || '',
      bloom: kps[2].bloom || '評鑑與防呆',
      examWeight: kps[2].examWeight || '★★★',
      example: kps[2].practicalTip || '',
      svg: kps[2].infograph?.svg || '',
      infographTitle: kps[2].infograph?.title || '',
      infographCaption: kps[2].infograph?.caption || '',
      badge: `${subj.name} · 考場避坑`,
      unitId: uid
    }, `#lesson/${uid}`);
    nodeItemPools.mastery.push(infoId);
  }

  const thirdItem=tableRecallItem(u,table,2,`q.${uid}.pitfall`,'mastery');
  if(thirdItem)nodeItemPools.mastery.push(registerItem(thirdItem,`#lesson/${uid}`));

    // Inject CAP real exam questions if available (up to 2 per unit)
  if (capList.length > 0) {
    for (let ci = 0; ci < Math.min(capList.length, 2); ci++) {
      const capQ = capList[ci];
      const capItem = formatCapQuestion(capQ);
      if (capItem) {
        const registered = registerItem(capItem, `#cap-exam/${capQ.year}/${capQ.subject}/${capQ.number}`);
        if (registered) nodeItemPools.mastery.push(registered);
      }
    }
  }

  // Inject High-Yield CAP Worked Example with 5-Step Scaffolding Thought Chain
  const etData = examTypesData[uid];
  if (etData?.workedExample) {
    const we = etData.workedExample;
    const weId = registerItem({
      id: `q.${uid}.cap.example`,
      kind: 'mastery',
      type: 'choice',
      unitId: uid,
      level: 4,
      prompt: `【${we.title}】${we.stem}`,
      options: we.options,
      answer: we.options[we.answer],
      hint: `審題題眼：${etData.examType?.clues || u.title}`,
      why: (we.steps || []).join('\n')
    }, `#lesson/${uid}`);
    if (weId) {
      nodeItemPools.mastery.push(weId);
    }
  }

  // Inject Follow-Up CAP Practice Question with 5-Step Scaffolding Thought Chain
  if (etData?.followUpPractice) {
    const fp = etData.followUpPractice;
    const fpId = registerItem({
      id: `q.${uid}.cap.followup`,
      kind: 'mastery',
      type: 'choice',
      unitId: uid,
      level: 4,
      prompt: `【${fp.title}】${fp.stem}`,
      options: fp.options,
      answer: fp.options[fp.answer],
      hint: `進階檢核：${etData.examType?.strategy || u.title}`,
      why: (fp.steps || []).join('\n')
    }, `#lesson/${uid}`);
    if (fpId) {
      nodeItemPools.mastery.push(fpId);
    }
  }

  const baselineCount = new Set(Object.values(nodeItemPools).flat()).size;
  const enrichment = enrichUnit(u, table, baselineCount);
  for (const item of enrichment) {
    const id = registerItem(item, `#lesson/${uid}`);
    if (id) nodeItemPools.reasoning.push(id);
  }
  enrichmentReport.push({ unitId: uid, baselineActivities: baselineCount, addedActivities: enrichment.length,
    increasePercent: Number((100 * enrichment.length / baselineCount).toFixed(2)) });

  // Inject Type A / Type B / Type C Possible Question Archetype Challenges into Quest pools
  if (Array.isArray(etData?.questionTypeList)) {
    etData.questionTypeList.forEach((qt, qIdx) => {
      const drill = qt.archetypeDrill;
      if (!drill || !Array.isArray(drill.options)) return;
      const poolKind = qIdx === 0 ? 'concept' : qIdx === 1 ? 'rule' : 'mastery';
      const archItemId = registerItem({
        id: `q.${uid}.archetype.${qt.code.replace(/\s+/g, '')}`,
        kind: poolKind,
        type: 'choice',
        unitId: uid,
        level: qIdx + 1,
        prompt: `${drill.stem}`,
        options: drill.options,
        answer: drill.options[drill.answer],
        hint: drill.hint || qt.solvingSOP,
        why: `${drill.explanation}\n⚡ 標準破題 SOP：${qt.solvingSOP}`
      }, `#lesson/${uid}`);
      if (archItemId) {
        nodeItemPools[poolKind].push(archItemId);
      }
    });
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
  const pubGuide = getPublisherGuideForUnit(u);
  const dChart = deepeningCharts[uid] || null;
  const uWonder = unitWonderData[uid] || null;
  const sLove = subjectLoveData[u.subject] || null;
  const guide = {
    unitId: uid,
    title: u.title,
    subject: subj.name,
    subjectId: u.subject,
    domain: subj.domain,
    grade: u.grade,
    term: u.term,
    concept: u.concept,
    example: u.example,
    pitfall: u.pitfall,
    task: u.task,
    unitWonder: uWonder ? {
      wonderTitle: uWonder.wonderTitle,
      lifeConnection: uWonder.lifeConnection,
      funFact: uWonder.funFact,
      mnemonic: uWonder.mnemonic,
      curiosityQ: uWonder.curiosityQ,
      curiosityA: uWonder.curiosityA,
      superpower: sLove?.superpower || '',
      whyLoveIt: sLove?.whyLoveIt || '',
      joyfulHack: sLove?.joyfulHack || '',
      cheer: sLove?.cheer || ''
    } : null,
    knowledgePoints: kps.map(k => ({
      id: k.id,
      order: k.order,
      title: k.title,
      core: k.core,
      mechanism: k.mechanism,
      explanation: k.explanation || '',
      formula: k.formula,
      examIntel: k.examIntel || '',
      tip: k.practicalTip,
      bloom: k.bloom || '理解與應用',
      examWeight: k.examWeight || '★★★',
      svg: k.infograph?.svg || '',
      infographTitle: k.infograph?.title || '',
      infographCaption: k.infograph?.caption || '',
      source: k.source,
      relatedKnowledge: k.relatedKnowledge || []
    })),
    table: table ? { title: table.title, rows: table.rows } : null,
    chart: dChart,
    contrast: ld ? {
      focus: ld.focus || '',
      leftLabel: ld.leftLabel || '',
      left: ld.left || '',
      rightLabel: ld.rightLabel || '',
      right: ld.right || '',
      prompt: ld.prompt || '',
      answer: ld.answer || ''
    } : null,
    workedCase: wc ? { problem: wc.problem, steps: wc.steps, check: wc.check } : null,
    zeroToTopLadder: etData?.zeroToTopLadder || null,
    examType: etData?.examType || null,
    questionTypeList: etData?.questionTypeList || null,
    knowledgeSufficiencyPatch: etData?.knowledgeSufficiencyPatch || null,
    capWorkedExample: etData?.workedExample || null,
    capFollowUpPractice: etData?.followUpPractice || null,
    officialRefs: alignment.refs || [],
    publisherGuide: pubGuide ? {
      tocKeywords: pubGuide.tocKeywords,
      universalSteps: pubGuide.universalSteps,
      publishers: pubGuide.publishers
    } : null
  };

  return { nodes, guide };
}

// -------------------------------------------------------------
// 3. Assemble Stories (36 Cross-Disciplinary Case Stories)
// -------------------------------------------------------------
function buildStories() {
  const stories = [];
  const storyThemes = [
    { s: 's1', title: '潛水員的數線危機', subj: '數學 / 自然', line1: '潛水員抵達海平面下 12 公尺處（記為 −12），需要依減壓程序調整深度。', q: '若從 −12 公尺先上升 7 公尺，再下降 4 公尺，最後位置在哪裡？', ans: '海平面下 9 公尺', wrongs: ['海平面下 15 公尺', '海平面下 1 公尺', '海平面上 9 公尺'] },
    { s: 's1', title: '顯微鏡下的生命密碼', subj: '生物', line1: '在實驗室觀察洋蔥表皮細胞與水蘊草葉片細胞的微觀構造。', q: '由低倍物鏡換用高倍物鏡後，視野範圍與亮度如何變化？', ans: '範圍變小且亮度變暗', wrongs: ['範圍變大且亮度變亮', '範圍變小但亮度變亮', '範圍變大但亮度變暗'] },
    { s: 's1', title: '大航海時代的熱蘭遮城', subj: '歷史 / 地理', line1: '荷蘭聯合東印度公司（VOC）在臺灣南部建立安平古堡與轉口貿易航線。', q: '十七世紀歐洲人來臺建立據點的主要驅動因素是？', ans: '全球海洋貿易網絡擴張', wrongs: ['工業革命蒸汽機普及', '躲避蒙古帝國西征戰火', '開採大規模煤礦與石油'] },
    { s: 's1', title: '等高線與暴雨防汛', subj: '地理', line1: '山區氣象站發布豪雨特報，巡查員緊急調閱等高線地形圖判讀水路。', q: '等高線彎曲處 V 字形尖端指向高海拔處，代表什麼地形？', ans: '山谷（易匯集水流）', wrongs: ['山脊（分水嶺高地）', '鞍部（兩山之間低平處）', '盆地（四周高中間低）'] },
    { s: 's1', title: '少年法庭的溫柔界線', subj: '公民', line1: '阿凱因一時衝動與同儕發生衝突，進入少年事件處理程序。', q: '我國《少年事件處理法》最優先的核心立法原則為何？', ans: '健全少年自我成長，以保護輔導為優先', wrongs: ['一律比照成年人加重刑責處罰', '由學校直接代替法院判決罰金', '完全免除一切法律與民事賠償責任'] },
    { s: 's1', title: '六書造字與漢字密碼', subj: '國文', line1: '國文課上探索「木、本、末、休、河」的造字結構與古人巧思。', q: '在象形字「刀」鋒處加上一點成「刃」以標示抽象位置，此造字法則為？', ans: '指事', wrongs: ['形聲', '會意', '象形'] },

    { s: 's2', title: '孟德爾豌豆園的遺傳奇蹟', subj: '生物', line1: '修道院花園裡，高莖豌豆與矮莖豌豆正展開棋盤方格遺傳實驗。', q: '兩株異型合子高莖豌豆（Tt）交配，子代出現矮莖（tt）的機率為？', ans: '25% (1/4)', wrongs: ['50% (1/2)', '75% (3/4)', '0% (完全不會出現)'] },
    { s: 's2', title: '高鐵走廊與一日生活圈', subj: '地理 / 歷史', line1: '臺灣高鐵連結西部走廊，形成南北 90 分鐘便捷交通一日生活圈。', q: '高鐵快速便捷交通同時也可能對沿線中小型市鎮造成何種挑戰？', ans: '吸管效應（人口資源向大都會集中）', wrongs: ['時空輻散（往返時間變長）', '熱島效應完全消失', '全島人口平均分散至高山地區'] },
    { s: 's2', title: '清領開港與茶香大稻埕', subj: '歷史', line1: '淡水與安平開港通商後，外商洋行紛紛設立於大稻埕河岸。', q: '清末促成臺灣對外貿易轉為出超的大宗三寶商品是？', ans: '茶葉、蔗糖、樟腦', wrongs: ['鹿皮、硫磺、白銀', '香蕉、鳳梨、水泥', '絲綢、瓷器、香料'] },
    { s: 's2', title: '二元一次方程式的雞兔同籠', subj: '數學', line1: '快樂農場裡有雞與兔共 20 隻，數地上的腳共有 56 隻。', q: '請問農場裡的兔子有幾隻？', ans: '8 隻', wrongs: ['12 隻', '6 隻', '10 隻'] },
    { s: 's2', title: '呼吸與循環的微觀接力', subj: '生物', line1: '劇烈慢跑運動後，血液中二氧化碳濃度升高並刺激呼吸中樞。', q: '人體主要透過何種神經中樞自動調節呼吸運動之快慢頻率？', ans: '腦幹', wrongs: ['小腦', '大腦皮質感覺區', '脊髓背根'] },
    { s: 's2', title: '文言虛字的語氣魔術', subj: '國文', line1: '讀《論語》「學而時習之，不亦說乎」，探索虛字「之」與「乎」的靈魂。', q: '「學而時習之」文句中的代詞「之」主要指代？', ans: '所學的內容與知識', wrongs: ['前往學校的道路', '老師本人的稱呼', '同班學習的朋友'] },

    { s: 's3', title: '阿基米德的王冠浮力之謎', subj: '理化·物理', line1: '敘拉古國王懷疑金匠在純金王冠中摻入了銀，請阿基米德設法檢驗。', q: '將物體浸入水中時，其所受向上浮力大小等於？', ans: '物體排開的液體重量', wrongs: ['物體本身的總重量', '容器內所有液體的總重量', '物體浸入水中的深度乘以質量'] },
    { s: 's3', title: '拉瓦節與質量守恆定律', subj: '理化·化學', line1: '在密閉玻璃鐘罩中加熱金屬，天平兩端始終保持精確平衡。', q: '在沒有物質進出的密閉系統中進行化學反應，前後總質量如何？', ans: '必然嚴格保持不變', wrongs: ['因放熱而大幅減少', '因產生新物質而增加一倍', '隨溫度升高而無限變大'] },
    { s: 's3', title: '畢氏定理與古代金字塔量測', subj: '數學', line1: '古代工匠用長度 3、4、5 的結繩在地面精準拉出直角地基。', q: '直角三角形中兩股長為 5 與 12，則斜邊長度為？', ans: '13', wrongs: ['17', '15', '10'] },
    { s: 's3', title: '季風亞洲的水稻與古文明', subj: '地理', line1: '夏季吹向亞洲大陸的暖濕季風，滋潤了廣大的沖積平原。', q: '季風氣候區有利於水稻集約農業的最核心優勢為？', ans: '夏季高溫多雨、雨熱同期', wrongs: ['夏季乾熱少雨、冬季多雨', '全年酷寒結冰無病蟲害', '終年無風且日照時數為零'] },
    { s: 's3', title: '封建瓦解與諸子百家爭鳴', subj: '歷史', line1: '春秋戰國時代鐵器牛耕普及，封建秩序崩解，學者提出救世學說。', q: '秦始皇統一天下後，廢除封建制度代之以何種中央集權體制？', ans: '郡縣制', wrongs: ['九品官人法', '行省制度', '城邦直接民主制'] },
    { s: 's3', title: '古典近體詩的對仗美學', subj: '國文', line1: '「大漠孤煙直，長河落日圓」，王維筆下字字凝結大漠壯闊風光。', q: '七言律詩中嚴格規定必須詞性字面工整對仗的聯次為？', ans: '頷聯（三四句）與頸聯（五六句）', wrongs: ['首聯（一二句）與尾聯（七八句）', '只有第一句與最後一句', '全詩八句皆不可對仗'] },

    { s: 's4', title: '勒沙特列平衡移動天平', subj: '理化·化學', line1: '黃色的鉻酸根離子水溶液加入酸液後，顏色逐漸轉為橙色。', q: '可逆反應達到動態化學平衡時，最重要的核心特徵為？', ans: '正反應速率等於逆反應速率', wrongs: ['正逆反應完全停止不再進行', '反應物與生成物濃度必定 1:1 相等', '溶液中所有離子皆沉澱消失'] },
    { s: 's4', title: '等差級數與高斯速算奇蹟', subj: '數學', line1: '少年高斯利用首尾配對法迅速算出了 1 加到 100 的總和為 5050。', q: '首項為 3，公差為 4 的等差數列，第 10 項為？', ans: '39', wrongs: ['43', '36', '40'] },
    { s: 's4', title: '現代法治：民刑行政大辨析', subj: '公民', line1: '車禍案件現場，交警開行政罰單、被害人提民事求償、檢察官偵查刑責。', q: '「行為之處罰，以行為時之法律有明文規定者為限」，此刑法鐵則稱為？', ans: '罪刑法定原則', wrongs: ['契約自由原則', '誠實信用原則', '比較利益原則'] },
    { s: 's4', title: '西力東漸與利瑪竇的坤輿地圖', subj: '歷史', line1: '耶穌會傳教士利瑪竇攜帶自鳴鐘與世界地圖來到明朝北京。', q: '明末徐光啟與利瑪竇合作翻譯的重要西方幾何學典籍為？', ans: '《幾何原本》', wrongs: ['《天工開物》', '《本草綱目》', '《資治通鑑》'] },
    { s: 's4', title: '比熱實驗與海陸風日夜輪替', subj: '理化·物理', line1: '白天烈日下海灘的沙子燙腳，而海水卻依舊清涼舒適。', q: '相同質量水與沙石吸收相同熱量，沙石升溫顯著較快是因為？', ans: '沙石的比熱小於水', wrongs: ['沙石的比熱大於水', '水的密度小於沙石', '沙石完全不會散熱'] },
    { s: 's4', title: '宋詞長短句與豪放婉約', subj: '國文', line1: '「大江東去，浪淘盡，千古風流人物」，蘇軾赤壁懷古千古傳唱。', q: '宋詞又被稱為「長短句」或「詩餘」，其主要體製特點為？', ans: '依照詞牌曲調填詞，句式長短錯落便於歌唱', wrongs: ['每句固定五字或七字且不可換韻', '完全不講求平仄與押韻的散文', '專供舞台戲曲武打動作使用的劇本'] },

    { s: 's5', title: '板塊運動與造就福爾摩沙', subj: '地球科學', line1: '菲律賓海板塊與歐亞板塊持續聚合擠壓，玉山與中央山脈至今仍在隆起。', q: '臺灣島位於哪兩個主要板塊的聚合型板塊邊界？', ans: '菲律賓海板塊與歐亞板塊', wrongs: ['太平洋板塊與北美洲板塊', '印澳板塊與非洲板塊', '南極洲板塊與南美洲板塊'] },
    { s: 's5', title: '牛頓第二定律與火箭升空', subj: '理化·物理', line1: '火箭發動機向下噴射高壓氣體產生強大推力，帶動火箭加速升空。', q: '根據 F＝ma，質量 2 kg 的物體受到 10 N 的合力作用，加速度為？', ans: '5 m/s²', wrongs: ['20 m/s²', '0.2 m/s²', '12 m/s²'] },
    { s: 's5', title: '圓周角與外接圓的幾何證明', subj: '數學', line1: '圓形劇場看臺上，觀眾無論坐在同弧哪個位置對舞台張角皆相同。', q: '同弧所對的圓周角度數，等於其所對圓心角度數的？', ans: '一半 (1/2)', wrongs: ['兩倍 (2 倍)', '完全相等 (1 倍)', '四分之一 (1/4)'] },
    { s: 's5', title: '機會成本與市場經濟選擇', subj: '公民', line1: '週六下午只有兩小時空檔，在讀書、打球與打工之間做抉擇。', q: '經濟學中做出選擇時所付出的「機會成本」是指？', ans: '被放棄的各選項中價值最高者', wrongs: ['被放棄的所有選項價值總和', '所選擇該項目的實際標價', '被放棄的各選項中價值最低者'] },
    { s: 's5', title: '古希臘雅典與公民大會', subj: '歷史', line1: '雅典衛城山丘上，成年男性公民們正聚集投票表決城邦公共事務。', q: '西方歷史上首創公民大會直接民主與陶片放逐制的城邦是？', ans: '雅典', wrongs: ['斯巴達', '馬其頓', '迦太基'] },
    { s: 's5', title: '古典小說紅樓與人物風采', subj: '國文', line1: '走進《紅樓夢》大觀園，劉姥姥進大觀園逗得眾人開懷大笑。', q: '古典章回小說塑造生動立體的人物性格時，最有效的手法為？', ans: '透過具體言行細節、抉擇衝突與心理轉變', wrongs: ['只列出人物的出生年月日與籍貫', '全篇使用統計數據表格取代對話', '避免任何人物之間的對話與互動'] },

    { s: 's6', title: '法拉第感應與發電機革命', subj: '理化·物理', line1: '將磁鐵快速穿過閉合線圈改變磁場，檢流計指針瞬間發生偏轉。', q: '發電機將力學能轉換為電能所依據的核心物理原理為？', ans: '電磁感應現象', wrongs: ['電流熱效應', '靜電感應現象', '光電效應'] },
    { s: 's6', title: '地軸傾斜與地球四季星空', subj: '地球科學', line1: '臺灣冬至與夏至的太陽正午仰角與晝夜長短截然不同，四季如期更替。', q: '地球表面產生四季變化的最主要天文成因為？', ans: '地軸傾斜約 23.5 度並繞太陽公轉', wrongs: ['地球與太陽距離在冬夏相差十倍', '月球遮擋陽光造成冬季降溫', '太陽本身每半年熄滅一次'] },
    { s: 's6', title: '二次函數拋物線與最完美拋射', subj: '數學', line1: '籃球選手起跳投出三分球，籃球在空中劃出一道對稱優美的拋物線。', q: '二次函數 y = −(x − 3)² + 9 在 x 等於多少時達到最大值 9？', ans: 'x = 3', wrongs: ['x = −3', 'x = 9', 'x = 0'] },
    { s: 's6', title: '冷戰鐵幕與柏林圍牆倒塌', subj: '歷史', line1: '1989 年市民走上柏林街頭敲碎水泥圍牆，歐洲冷戰對峙走向終點。', q: '第二次世界大戰後美蘇兩大陣營長期「全面對立卻未爆發直接大戰」的狀態稱為？', ans: '冷戰', wrongs: ['百年戰爭', '三十年戰爭', '十字軍東征'] },
    { s: 's6', title: '全球化分工與碳足跡永續', subj: '地理 / 公民', line1: '一支智慧型手機零件來自十多個國家，經過全球跨國供應鏈組裝。', q: '工廠排放廢氣汙染環境卻由社會大眾承受代價，經濟學上稱為？', ans: '外部成本（負外部性）', wrongs: ['外部效益（正外部性）', '比較利益優勢', '規模經濟效益'] },
    { s: 's6', title: '會考寫作審題與立意高飛', subj: '國文', line1: '面對會考寫作題目，從真實生活素材提煉出生命洞察與深刻反思。', q: '寫作時能讓閱卷老師感受情感真實深度的關鍵要素為？', ans: '精準刻畫可觀察的動作、場景細節並呼應立意', wrongs: ['背誦無關題旨的萬用罐頭名言佳句', '整篇只重複「我覺得很開心、很難過」', '故意不使用任何標點符號與分段'] }
  ];

  storyThemes.forEach((st, i) => {
    const storyId = `story-${st.s}-${String(i % 6 + 1).padStart(2, '0')}`;
    const questionId = `q.${storyId}`;
    const wrongOpts = st.wrongs || ['與情境相反之錯誤推論', '未經證實之假設條件', '缺乏科學與史料依據之臆測'];
    registerItem({
      id: questionId,
      kind: 'story',
      type: 'choice',
      prompt: `【探究檢核】${st.q}`,
      options: shuffle([st.ans, ...wrongOpts], questionId),
      answer: st.ans,
      hint: `回到情境對話中尋找關鍵證據：「${st.line1.slice(0, 28)}…」`,
      why: `🎉 破案成功！正確答案為「${st.ans}」。${st.line1}`,
      level: 2
    }, `#story/${storyId}`);

    stories.push({
      id: storyId,
      sectionId: st.s,
      title: st.title,
      subjectTag: st.subj,
      scenario: st.line1,
      steps: [
        { id: `line.${storyId}.1`, type: 'line', speaker: '🦉 知知貓頭鷹導師', text: `探險家你好！歡迎來到「${st.title}」的跨領域真實劇場，一起找出隱藏在故事裡的學科超能力吧！` },
        { id: `line.${storyId}.2`, type: 'line', speaker: '🔭 現場情境觀測', text: st.line1 },
        { id: questionId, type: 'choice' },
        { id: `line.${storyId}.3`, type: 'line', speaker: '🦉 知知貓頭鷹導師', text: `太精彩了！你能從生活故事中一眼認出「${st.ans}」的核心原理，這就是真正的素養超能力！` }
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

const SUBJ_ICONS = {
  chinese: '📜', english: '🔤', local: '🗣️', math: '📐',
  biology: '🧬', physics: '⚡', chemistry: '🧪', earth: '🌍',
  history: '🏺', geography: '🗺️', civics: '⚖️',
  computing: '💻', technology: '⚙️',
  visual: '🎨', music: '🎵', performing: '🎭',
  health: '🩺', pe: '🏀', home: '🍳', scout: '⛺', guidance: '🧭'
};

function getCategory(subj) {
  if (['chinese', 'english', 'math', 'biology', 'physics', 'chemistry', 'earth', 'history', 'geography', 'civics'].includes(subj)) return 'core';
  if (['computing', 'technology'].includes(subj)) return 'tech';
  if (['visual', 'music', 'performing'].includes(subj)) return 'arts';
  if (['health', 'pe', 'home', 'scout', 'guidance'].includes(subj)) return 'activity';
  return 'local';
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

    const isSpecialized = !['chinese', 'english', 'math', 'biology', 'physics', 'chemistry', 'earth', 'history', 'geography', 'civics'].includes(u.subject);
    const category = getCategory(u.subject);

    const unitMeta = {
      id: u.id,
      title: u.title,
      subject: u.subject,
      subjectName: subj.name,
      domain: subj.domain,
      grade: u.grade,
      term: u.term,
      gradeName: u.grade === 7 ? '國一' : u.grade === 8 ? '國二' : '國三',
      gradeTermName: `${u.grade === 7 ? '國一' : u.grade === 8 ? '國二' : '國三'}${u.term === 1 ? '上' : '下'}`,
      isSpecialized,
      category,
      icon: SUBJ_ICONS[u.subject] || '📚',
      pitfall: u.pitfall || '',
      task: u.task || '',
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
  writeAtomic(secFilePath, JSON.stringify({
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
        domain: '跨領域',
        category: 'core',
        grade: exam.grade,
        term: exam.term,
        gradeName: exam.grade === 7 ? '國一' : exam.grade === 8 ? '國二' : '國三',
        gradeTermName: `${exam.grade === 7 ? '國一' : exam.grade === 8 ? '國二' : '國三'}${exam.term === 1 ? '上' : '下'}`,
        isSpecialized: false,
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
    // CAP Special Focus by Year (109~115) - Comprehensive 5-Subject Gamified Nodes
    for (const yr of [109, 110, 111, 112, 113, 114, 115]) {
      const yid = `cap-yr-${yr}`;
      const yTitle = `${yr} 年國中教育會考選擇題闖關`;
      const yrRawQs = capBank.questions.filter(q => q.year === yr);

      const chinesePool = [];
      const englishPool = [];
      const listeningPool = [];
      const mathPool = [];
      const sciencePool = [];
      const socialPool = [];

      for (const q of yrRawQs) {
        const item = formatCapQuestion(q);
        if (!item) continue;
        const regId = registerItem(item, `#cap-exam/${q.year}/${q.subject}/${q.number}`);
        if (!regId) continue;

        if (q.subject === 'chinese') chinesePool.push(regId);
        else if (q.subject === 'english') englishPool.push(regId);
        else if (q.subject === 'listening') listeningPool.push(regId);
        else if (q.subject === 'math') mathPool.push(regId);
        else if (q.subject === 'science') sciencePool.push(regId);
        else if (q.subject === 'social') socialPool.push(regId);
      }

      // 5-Subject balanced Boss Challenge Pool (2 questions per subject)
      const bossPool = [
        ...chinesePool.slice(0, 2),
        ...englishPool.slice(0, 2),
        ...mathPool.slice(0, 2),
        ...sciencePool.slice(0, 2),
        ...socialPool.slice(0, 2)
      ];

      const nodes = [
        { id: `${yid}:chinese`, kind: 'concept', title: `${yr} 國文專精`, icon: '📜', pool: chinesePool, size: Math.min(chinesePool.length, 6) },
        { id: `${yid}:english`, kind: 'rule', title: `${yr} 英語閱讀`, icon: '🔤', pool: englishPool, size: Math.min(englishPool.length, 6) },
        ...(listeningPool.length ? [{ id: `${yid}:listening`, kind: 'rule', title: `${yr} 英語聽力`, icon: '🎧', pool: listeningPool, size: Math.min(listeningPool.length, 6) }] : []),
        { id: `${yid}:math`, kind: 'reasoning', title: `${yr} 數學思維`, icon: '📐', pool: mathPool, size: Math.min(mathPool.length, 6) },
        { id: `${yid}:science`, kind: 'mastery', title: `${yr} 自然探究`, icon: '🔬', pool: sciencePool, size: Math.min(sciencePool.length, 6) },
        { id: `${yid}:social`, kind: 'mastery', title: `${yr} 社會素養`, icon: '🌍', pool: socialPool, size: Math.min(socialPool.length, 6) },
        { id: `${yid}:cap`, kind: 'boss', title: `${yr} 五科綜合挑戰`, icon: '🎯', pool: bossPool, size: bossPool.length, hearts: 3 }
      ];

      brUnits.push({
        id: yid,
        title: yTitle,
        subject: 'cap',
        subjectName: '會考全真',
        domain: '會考全真',
        category: 'core',
        grade: 9,
        term: 2,
        gradeName: '國三',
        gradeTermName: '國三下',
        isSpecialized: false,
        icon: '🎯',
        nodes: nodes.map(n => ({ id: n.id, kind: n.kind, title: n.title, icon: n.icon, size: n.size }))
      });

      brFileUnits[yid] = {
        guide: {
          title: yTitle,
          concept: `練習 ${yr} 年會考選擇題，包含官方答案；目前 ${yrRawQs.filter(q => q.kind !== 'written' && getCapExplanation(q).ready).length} 題已有 AI 解析。每次闖關從題池抽題，題目不清楚時請開啟原始題本。`,
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

      const isSpecialized = !['chinese', 'english', 'math', 'biology', 'physics', 'chemistry', 'earth', 'history', 'geography', 'civics'].includes(u.subject);
      const category = getCategory(u.subject);

      brUnits.push({
        id: u.id,
        title: u.title,
        subject: u.subject,
        subjectName: subj.name,
        domain: subj.domain,
        grade: u.grade,
        term: u.term,
        gradeName: u.grade === 7 ? '國一' : u.grade === 8 ? '國二' : '國三',
        gradeTermName: `${u.grade === 7 ? '國一' : u.grade === 8 ? '國二' : '國三'}${u.term === 1 ? '上' : '下'}`,
        isSpecialized,
        category,
        icon: SUBJ_ICONS[u.subject] || subj.icon || '📚',
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
  writeAtomic(brFilePath, JSON.stringify({
    id: brConfig.id,
    title: brConfig.title,
    units: brFileUnits
  }, null, 2), 'utf8');
  console.log(`✔ Generated branch ${brConfig.id}.json (${brUnits.length} units)`);
}

// Build Stories
const stories = buildStories();
const storiesFilePath = path.join(OUT_DIR, 'stories.json');
writeAtomic(storiesFilePath, JSON.stringify({
  stories: Object.fromEntries(stories.map(s => [s.id, s]))
}, null, 2), 'utf8');
console.log(`✔ Generated stories.json (${stories.length} stories)`);

// Build items dictionary chunk
const allItemsObj = Object.fromEntries(allItems);
const itemsFilePath = path.join(OUT_DIR, 'items.json');
writeAtomic(itemsFilePath, JSON.stringify({ items: allItemsObj }, null, 2), 'utf8');
console.log(`✔ Generated items.json (${allItems.size} items)`);

// Build Root index.json
const rootIndex = {
  version: COURSE_VERSION,
  generatedAt: new Date().toISOString(),
  totalUnits: units.length,
  totalItems: allItems.size,
  publisherCoverage: ['康軒','翰林','南一'].map(name=>({name,total:units.length,documented:units.filter(u=>getPublisherGuideForUnit(u).publishers.some(p=>p.publisher===name && p.chapterStatus==='documented')).length})),
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
writeAtomic(indexFilePath, JSON.stringify(rootIndex, null, 2), 'utf8');
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
writeAtomic(path.join(reportDir, 'COURSE-BUILD-REPORT.json'), JSON.stringify(report, null, 2), 'utf8');
writeAtomic(path.join(reportDir, 'ENRICHMENT-REPORT.json'), JSON.stringify({
  version: COURSE_VERSION, metric: 'Distinct learning activities per core unit; excludes repeated boss references. Reuses verified table facts in new retrieval exercises, not new syllabus coverage.',
  units: [...new Map(enrichmentReport.map(row => [row.unitId, row])).values()]
}, null, 2), 'utf8');
console.log('🎉 Course build completed successfully! Report saved to docs/quest-redesign/COURSE-BUILD-REPORT.json\n');
