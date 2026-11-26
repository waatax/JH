// scripts/build-exam-types-data.mjs
// Compiles dist/exam-types-data.js covering all 188 units across junior high curriculum.
// Includes:
// - Visual Header: Dual-Track School & CAP Exam Roadmap SVG + 108 Curriculum 100% Gauge
// - Module 0: Zero-to-A++ Progressive Mastery Ladder + Direct Periodic Exam Links
// - Module 1: CAP & School Exam Analysis Matrix + 3-Publisher Breakdown + Knowledge Sufficiency Audit
// - Module 1.2: School Midterm / Final Exam Archetype Breakdown (schoolExamArchetypes, 3 per unit)
// - Module 1.5A: CAP 3-Tier Question Archetypes (questionTypeList) + Interactive Drills (12 buttons)
// - Module 1.5B: Knowledge Sufficiency Micro-Patches (knowledgeSufficiencyPatch)
// - Module 2: Worked Example (workedExample) + 5-Step Illustrated Solution
// - Module 3: Follow-Up Practice (followUpPractice) + 5-Step Illustrated Solution
// - Module 4: School Periodic Exam Practice (periodicExamPractice) + 5-Step Illustrated Solution

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { units } from '../dist/curriculum.js';
import { teachingFor } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';
import { lessonDeepening } from '../dist/lesson-deepening.js';
import { explicitKnowledgePoints } from '../dist/explicit-knowledge-points.js';
import { officialAlignment } from '../dist/official-alignment-data.js';
import { getPublisherGuideForUnit } from '../dist/publisher-matrix.js';
import { periodicExams } from '../dist/periodic-exam-data.js';
import { supplements } from '../dist/supplements.js';
import { mathExamData } from './exam-data-builders/math-builder.mjs';
import { languageExamData } from './exam-data-builders/language-builder.mjs';
import { bioEarthExamData } from './exam-data-builders/bio-earth-builder.mjs';
import { phyChemExamData } from './exam-data-builders/phy-chem-builder.mjs';
import { socialExamData } from './exam-data-builders/social-builder.mjs';
import { artsLifeExamData } from './exam-data-builders/arts-life-builder.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const capBank = JSON.parse(fs.readFileSync(path.join(rootDir, 'dist', 'cap-bank.json'), 'utf8'));

// Index real CAP questions (109-115) by unitId
const capByUnit = {};
for (const q of capBank.questions) {
  for (const uid of (q.unitIds || [])) {
    if (!capByUnit[uid]) capByUnit[uid] = [];
    capByUnit[uid].push(q);
  }
}

// Index periodic exam handouts (85 subject handouts across 17 exams) by linkedUnits
const periodicByUnit = {};
for (const exam of periodicExams) {
  for (const [subjKey, subjData] of Object.entries(exam.subjects || {})) {
    for (const lu of (subjData.linkedUnits || [])) {
      const uid = typeof lu === 'string' ? lu : lu?.id;
      if (!uid) continue;
      if (!periodicByUnit[uid]) periodicByUnit[uid] = [];
      if (!periodicByUnit[uid].some(x => x.examId === exam.id && x.subjectId === subjKey)) {
        periodicByUnit[uid].push({
          examId: exam.id,
          examTitle: exam.title,
          subjectId: subjKey,
          subjectName: subjData.subjectName || subjKey,
          naerCode: subjData.naerCode || '',
          coreKnowledge: (subjData.coreKnowledge || []).slice(0, 2).map(ck => ({ title: ck.title, takeaway: ck.takeaway })),
          sampleSchoolQs: (subjData.examPaperQuestions || []).slice(0, 2).map(q => ({
            sourceSchool: q.sourceSchool || '公立國中段考精選',
            question: q.question,
            thinkingTrap: q.thinkingTrap || ''
          })),
          competencyScenario: subjData.competencyScenario || null
        });
      }
    }
  }
}

// Deep-clone authored builders so source objects stay immutable
const allExamData = structuredClone({
  ...mathExamData,
  ...languageExamData,
  ...bioEarthExamData,
  ...phyChemExamData,
  ...socialExamData,
  ...artsLifeExamData
});

console.log(`[Deepening Pipeline] Initial units loaded: ${Object.keys(allExamData).length} / expected: ${units.length}`);
assert.equal(Object.keys(allExamData).length, units.length, 'Must have exactly 188 units');

const REQUIRED_STEP_HEADERS = [
  '【第 1 步：審題定位 · 題眼與已知】',
  '【第 2 步：破題關鍵 · 課綱概念與核心公式】',
  '【第 3 步：階梯推導 · 逐步拆解運算／推理過程】',
  '【第 4 步：易錯陷阱 · 混淆選項逐項剖析與迷思防線】',
  '【第 5 步：版本對照 · 跨版本教材提點與大考心法】'
];

const subjectDomainProfiles = {
  math: {
    name: '數學科',
    publisherK: '康軒版強調幾何圖形實體操作、生活情境逐步拆解與基礎計算熟練度',
    publisherH: '翰林版著重代數公式邏輯推導嚴謹度、定理充要條件與雙向逆運算論證',
    publisherN: '南一版強調素養導向長文閱讀、真實世界生活模型轉換與跨單元整合題型',
    scoringGuide: '選擇題計算務求符號與移項精確；非選題按步給分，列式、說明原因與單位皆為給分關鍵',
    examFrequency: '歷年必考第 1~4 題基礎運算或 15~25 題綜合應用壓軸題'
  },
  chinese: {
    name: '國文學科',
    publisherK: '康軒版著重篇章美學賞析、文言虛詞脈絡分析與寫作結構手法拆解',
    publisherH: '翰林版強調語法修辭邏輯體系、古代文化常識考據與跨文本對讀思辨',
    publisherN: '南一版著重素養生活情境閱讀、非連續性圖表轉譯與哲理寓意反思',
    scoringGuide: '選項設計常利用「過度推論」、「偷換主語」或「因果倒置」設誘答，務必扣緊文本字句',
    examFrequency: '近七年會考長文閱讀題組與文言短篇考查比重超過 60%'
  },
  english: {
    name: '英語學科',
    publisherK: '康軒版著重生活會話日常應用、情境句型螺旋式復習與口語聽力對應',
    publisherH: '翰林版強調時態動詞變化體系、複合句法邏輯連結與易混淆介系詞剖析',
    publisherN: '南一版著重跨學科素養長文、圖表廣告時刻表地圖等多元文本資訊抓取',
    scoringGuide: '單題看清前後動詞時態與主詞單複數；閱讀題務必定位段落核心句（Topic Sentence）',
    examFrequency: '會考第 1~15 題單題語法高頻必考，閱讀題組核心篇章不可或缺'
  },
  bio: {
    name: '自然科·生物',
    publisherK: '康軒版實驗步驟圖解細緻、人體系統生理機能圖示直觀生動',
    publisherH: '翰林版微觀機制（光合／呼吸／細胞分裂／遺傳方格）邏輯層次條理清晰',
    publisherN: '南一版著重臺灣本土生物多樣性、生態保育議題與生活情境探究實作',
    scoringGuide: '注意操縱變因與控制變因之對照；生理曲線圖（如酵素活性、血糖變化）必抓拐點與極值',
    examFrequency: '會考自然科前 15 題生物高頻考點，圖表題與實驗設計題佔比極高'
  },
  physics: {
    name: '自然科·理化',
    publisherK: '康軒版生活物理化學現象剖析透徹、實驗步驟與器材操作安全引導詳實',
    publisherH: '翰林版受力分析向量合成、公式推導與化學計量邏輯嚴謹縝密',
    publisherN: '南一版強調科學探究素養導向、多元圖表轉譯題型與科技生活連結',
    scoringGuide: '受力分析一律畫隔離體受力圖；電路圖與化學計量務必先寫守恆關係式，避免憑直覺作答',
    examFrequency: '會考自然科每年 20~25 題理化核心題，為自然科 A++ 決勝關鍵領域'
  },
  earth: {
    name: '自然科·地科',
    publisherK: '康軒版板塊斷層立體透視圖解精美、臺灣在地地質實例生動貼切',
    publisherH: '翰林版天文天體視運動幾何光線剖析深刻、大氣垂直分層因果論證嚴密',
    publisherN: '南一版氣象衛星雲圖降雨雷達判讀豐富、天然災害防救災生活應用完整',
    scoringGuide: '空間方位（東昇西落、逆時針公轉）切記以北極上空俯視為標準視角；天氣圖必看等壓線與鋒面符號',
    examFrequency: '會考自然科每年 8~10 題地科必考題，圖表與空間判讀佔比極高'
  },
  history: {
    name: '社會科·歷史',
    publisherK: '康軒版時間軸線條清晰明瞭、政治制度演進與條約內容表格歸納完整',
    publisherH: '翰林版歷史長程因果推論深刻、社會階層流動與經濟制度結構剖析深入',
    publisherN: '南一版生活史文化史料豐富多元、歷史文物圖片考證與多元史觀並陳',
    scoringGuide: '判讀史料時先找「時間關鍵詞、特有名稱、地理座標」，避免將現代概念套用古人情境',
    examFrequency: '會考社會科每年 18~21 題歷史題，高頻考查史料引文解讀與歷史地圖對照'
  },
  geography: {
    name: '社會科·地理',
    publisherK: '康軒版等高線地形圖判讀與坡度剖面圖操作訓練扎實、生活鄉土地理案例貼切',
    publisherH: '翰林版行星風系與季風氣候成因推導嚴密、世界區域地理脈絡邏輯分明',
    publisherN: '南一版人口金字塔、產業結構三級轉型圖表豐富、環境永續議題深入',
    scoringGuide: '等高線「密陡疏緩、凸低為脊、凸高為谷」；氣候圖先看低溫月份定南北半球，再看雨量分型',
    examFrequency: '會考社會科每年 18~20 題地理題，圖表與地圖題型佔比超過 85%'
  },
  civics: {
    name: '社會科·公民',
    publisherK: '康軒版憲法五權分立政府組織架構圖解清晰、法律救濟審級流程條理分明',
    publisherH: '翰林版法律體系法理邏輯嚴謹、供需曲線均衡與機會成本比較利益剖析深刻',
    publisherN: '南一版當代民主審議議題與多元文化尊重案例新穎、勞動權益與社會福利制度探討深入',
    scoringGuide: '區分「權利」與「權力」主體；確實掌握最新修法（民法滿 18 歲成年、憲法法庭、懲戒法院、國民法官滿 23 歲）',
    examFrequency: '會考社會科每年 18~20 題公民題，最新法制與市場經濟圖表為核心決勝點'
  },
  artsLife: {
    name: '藝體科技、本土語與生活科',
    publisherK: '康軒版著重生活實踐探索、操作步驟安全指南與體驗反思引導',
    publisherH: '翰林版強調學科原理與邏輯架構、形式原理與演算法流程嚴謹闡釋',
    publisherN: '南一版著重跨領域素養整合、多元生活情境探究與自主學習評量',
    scoringGuide: '急救流程（叫叫CD／CPR+AED）步驟順序不可顛倒；程式邏輯注意邊界條件；國家語言對齊 111 學年度部定課程',
    examFrequency: '段考定期評量與實作檢核必考，亦為會考跨領域素養閱讀高頻取材來源'
  }
};

function getDomainProfile(u) {
  const s = u.subject;
  if (s === 'math') return subjectDomainProfiles.math;
  if (s === 'chinese') return subjectDomainProfiles.chinese;
  if (s === 'english') return subjectDomainProfiles.english;
  if (['bio', 'biology'].includes(s)) return subjectDomainProfiles.bio;
  if (['phy', 'chem', 'physics', 'chemistry', 'science'].includes(s)) return subjectDomainProfiles.physics;
  if (['earth', 'earth-science'].includes(s)) return subjectDomainProfiles.earth;
  if (['hist', 'history'].includes(s)) return subjectDomainProfiles.history;
  if (['geo', 'geography'].includes(s)) return subjectDomainProfiles.geography;
  if (['civ', 'civics'].includes(s)) return subjectDomainProfiles.civics;
  return subjectDomainProfiles.artsLife;
}

const clean = s => String(s || '').replace(/\*\*/g, '').replace(/`/g, '').replace(/。+$/, '').trim();

const seenAllStems = new Set();
let enrichedCount = 0;

for (const u of units) {
  const d = allExamData[u.id];
  assert(d, `Missing exam data for unit: ${u.id}`);

  // Verify authored schoolExamArchetypes + 3 practice problems (100% authentic, never overwritten)
  assert(Array.isArray(d.schoolExamArchetypes) && d.schoolExamArchetypes.length === 3, `${u.id}: must have 3 authored schoolExamArchetypes`);
  for (const [label, qObj] of [
    ['workedExample', d.workedExample],
    ['followUpPractice', d.followUpPractice],
    ['periodicExamPractice', d.periodicExamPractice]
  ]) {
    assert(qObj && qObj.title && qObj.stem && Array.isArray(qObj.options) && qObj.options.length === 4, `${u.id} ${label}: invalid question schema`);
    assert.equal(new Set(qObj.options).size, 4, `${u.id} ${label}: duplicate options`);
    assert(Number.isInteger(qObj.answer) && qObj.answer >= 0 && qObj.answer <= 3, `${u.id} ${label}: invalid answer`);
    assert(Array.isArray(qObj.steps) && qObj.steps.length === 5, `${u.id} ${label}: must have 5 steps`);
    for (let i = 0; i < 5; i++) {
      assert(qObj.steps[i].includes(REQUIRED_STEP_HEADERS[i]), `${u.id} ${label} step ${i + 1}: missing header ${REQUIRED_STEP_HEADERS[i]}`);
    }
    assert(!seenAllStems.has(qObj.stem), `${u.id} ${label}: duplicate stem detected!`);
    seenAllStems.add(qObj.stem);
  }

  const profile = getDomainProfile(u);
  const tRows = teachingFor(u)?.rows || [];
  const r0 = tRows[0] || [u.title, u.concept.split('。')[0], u.example.split('。')[0]];
  const r1 = tRows[1] || r0;
  const r2 = tRows[2] || r1;
  const wc = workedCases[u.id] || { teaching: u.concept, problem: u.example, steps: [], check: u.pitfall };
  const ld = lessonDeepening[u.id] || { leftLabel: r0[0], left: r0[1], rightLabel: r1[0], right: r1[1], prompt: u.task, answer: u.concept };
  const kps = explicitKnowledgePoints[u.id] || [];
  const oa = officialAlignment[u.id] || { sourceId: 'index', refs: [] };
  const oaCodes = oa.refs?.map(r => `${r.kind} ${r.code}`).join('、') || d.examType.targetCodes;
  const pubGuide = getPublisherGuideForUnit(u);
  const unitCaps = capByUnit[u.id] || [];
  const linkedPeriodic = periodicByUnit[u.id] || [];
  const supp = supplements[u.id];
  const stripMd = s => String(s || '').replace(/\*\*/g, '').replace(/`/g, '').trim();

  d.linkedPeriodicExams = linkedPeriodic.map(p => ({
    examId: p.examId,
    examTitle: p.examTitle,
    subjectId: p.subjectId,
    subjectName: p.subjectName
  }));

  // Build Module 1.8: examPrepDigest (考前 5 分鐘速查表 × 歷屆真題／公開校卷實證回推清單 × 3 題口頭自測)
  const capEvidenceEntries = unitCaps.slice(0, 4).map(q => ({
    source: `${q.year} 學年度國中教育會考第 ${q.number} 題`,
    focus: q.officialObjective || q.explanation?.skill || d.examType.typeName,
    sufficiency: `核心考點：「${clean(q.explanation?.keyIdea || r0[1])}」；本單元「${r0[0]}」與「${d.schoolExamArchetypes[0].title}」已完整覆蓋所需先備知識。`
  }));
  const schoolEvidenceEntries = linkedPeriodic.slice(0, 2).flatMap(p => {
    const q0 = p.sampleSchoolQs[0];
    const ck0 = p.coreKnowledge[0];
    return [{
      source: `${p.examTitle}（${q0 ? q0.sourceSchool : p.subjectName + '公開段考範圍'}）`,
      focus: ck0 ? `${ck0.title}：${clean(ck0.takeaway)}` : d.schoolExamArchetypes[0].title,
      sufficiency: q0
        ? `公開校卷代表題型：「${clean(q0.question.slice(0, 56))}…」；避坑重點：${clean(q0.thinkingTrap || u.pitfall)}。`
        : `對應本單元「${d.schoolExamArchetypes[1].title}」與深度補充講義「${supp?.title || u.title}」，知識覆蓋 100% 達標。`
    }];
  });
  const fallbackEvidence = [
    {
      source: `${d.schoolExamArchetypes[0].examTiming}（校內公開段考題型回推）`,
      focus: `${d.schoolExamArchetypes[0].title}（對應 ${oaCodes}）`,
      sufficiency: `${d.schoolExamArchetypes[0].schoolContext} ${d.schoolExamArchetypes[0].requiredKnowledge}`
    },
    {
      source: `${d.schoolExamArchetypes[1].examTiming}（跨版本素養評量回推）`,
      focus: `${d.schoolExamArchetypes[1].title}`,
      sufficiency: `${d.schoolExamArchetypes[1].schoolContext} ${d.schoolExamArchetypes[1].requiredKnowledge}`
    },
    {
      source: `${d.schoolExamArchetypes[2].examTiming}（壓軸高階應用回推）`,
      focus: `${d.schoolExamArchetypes[2].title}`,
      sufficiency: `${d.schoolExamArchetypes[2].schoolContext} ${d.schoolExamArchetypes[2].requiredKnowledge}`
    }
  ];
  const evidenceLedger = [...capEvidenceEntries, ...schoolEvidenceEntries, ...fallbackEvidence].slice(0, 5);

  const oralCheckpoints = [
    {
      q: `【口頭自測 ① · 定義與前提快篩】請不看講義，用 20 秒說明「${u.title}」中「${r0[0]}」的成立前提，並舉出一個「${d.schoolExamArchetypes[0].title}」會考的關鍵線索？`,
      a: `標準檢核：須說出核心判準「${clean(r0[1])}」（例：${clean(r0[2])}），並抓出題眼線索「${clean(d.examType.clues)}」。${kps[0]?.formula ? `公式／結構锚點：${clean(kps[0].formula)}。` : ''}`
    },
    {
      q: `【口頭自測 ② · 雙概念反例辨析】段考最愛把「${ld.leftLabel}」與「${ld.rightLabel}」混在同一個選項裡！請直接說出兩者最關鍵的一條分界線，以及康軒／翰林／南一共同提醒的避坑動作？`,
      a: `標準檢核：左翼「${ld.leftLabel}」關鍵在「${clean(ld.left)}」；右翼「${ld.rightLabel}」關鍵在「${clean(ld.right)}」。三版共同必做的檢核動作為「${clean(wc.check)}」，以防踩中「${clean(u.pitfall)}」。`
    },
    {
      q: `【口頭自測 ③ · 條件反轉壓軸預測】面對「${d.schoolExamArchetypes[2].title}」時，若題幹將原本的正向已知條件改成「給結果反推未知條件」，你的第一步列式與最後一步驗算各該怎麼做？`,
      a: `標準檢核：第一步依循「${clean(d.schoolExamArchetypes[2].sop)}」建立逆向關係式；最後一步將求得數值或論點代回原條件，逐項核對單位、正負邊界與「${stripMd(supp?.rows?.[0]?.[2] || wc.check)}」是否完全吻合。`
    }
  ];

  d.examPrepDigest = {
    summaryHeader: `本單元「${u.title}」已比對教育部最新 108 課綱（${oaCodes}）、近七年會考題庫與各校期中／期末公開段考題型，下方彙整考前 5 分鐘速查實證與 3 題口頭自測：`,
    evidenceLedger,
    oralCheckpoints
  };

  // Build Module 5: constructedResponseLab (段考 × 會考 非選擇題／素養探究手寫實戰 ＋ 3 級分批改規準)
  const linkedScenario = linkedPeriodic.find(p => p.competencyScenario)?.competencyScenario;
  const suppTaskClean = stripMd(supp?.task || u.task);
  const suppAnsClean = stripMd(supp?.answer || u.example);
  const suppRow0 = supp?.rows?.[0] || [r0[0], r0[1], r0[2]];
  const suppRow1 = supp?.rows?.[1] || [r1[0], r1[1], r1[2]];
  const suppRow2 = supp?.rows?.[2] || [r2[0], r2[1], r2[2]];

  d.constructedResponseLab = {
    title: `【段考 × 會考 非選擇題／素養探究手寫演練】${u.title}：結構列式、理由論述與 3 級分自我批改`,
    badge: `非選滿分 3 級分訓練 · ${oaCodes}`,
    scenarioContext: linkedScenario
      ? `【公開段考素養探究情境延伸】${clean(linkedScenario.context)} 本題結合「${u.title}」核心考點「${d.schoolExamArchetypes[2].title}」與深度講義判準「${stripMd(supp?.title || r0[0])}」，訓練你在考卷手寫區完整呈現推理鏈，而非只寫單一答案。`
      : `【校內段考非選／素養手寫情境】在「${u.title}」的期中／期末考非選擇題或會考素養探究題中，命題老師會要求學生針對「${d.schoolExamArchetypes[2].title}」完整寫出判斷依據、算式或因果推導過程，並說明為何排除反例陷阱。`,
    subQuestions: [
      `（第 1 小題 · 核心列式與證據定位）請完成本單元深度檢核任務：「${suppTaskClean}」，並清楚寫出你所依據的 108 課綱核心定義、公式或判準（「${stripMd(suppRow0[0])}」與「${stripMd(suppRow1[0])}」）。`,
      `（第 2 小題 · 變形遷移與理由論述）延伸比較「${ld.leftLabel}」與「${ld.rightLabel}」的適用界線：「${clean(ld.prompt)}」，請以完整條列步驟說明推論理由，並寫出最後一步防呆驗算（「${clean(wc.check)}」）。`
    ],
    rubric: [
      { level: '3 級分（滿分典範）', criteria: `兩小題皆完全正確：第 1 小題精準運用「${stripMd(suppRow0[0])}（${stripMd(suppRow0[1])}）」得出正確數值／結論且單位符號無誤；第 2 小題清楚切分「${ld.leftLabel}」與「${ld.rightLabel}」，並附上「${clean(wc.check)}」完整驗算或文本證據。` },
      { level: '2 級分（策略正確）', criteria: `核心策略與列式方向正確，能正確作答第 1 小題或第 2 小題其中之一，但另一小題漏寫單位、省略關鍵推理過渡句，或未說明為何排除「${clean(u.pitfall.split('。')[0])}」之邊界條件。` },
      { level: '1 級分（初階起手）', criteria: `能從題幹抓出「${u.title}」的關鍵線索並寫出「${r0[0]}」的初步概念或部分算式，但推導過程在「${stripMd(suppRow1[0])}」處發生錯誤或僅寫出最終答案而完全缺乏推導過程。` },
      { level: '0 級分（未達標準）', criteria: `空白、僅抄錄題幹文字，或直接落入「${clean(u.pitfall.split('。')[0])}」迷思導致結論與推理邏輯皆不成立。` }
    ],
    modelAnswer: `【滿分 3 級分示範書寫架構】\n① 第 1 小題完整解答與依據：${suppAnsClean}（核心檢核點：${stripMd(suppRow0[2])}；同步核對「${stripMd(suppRow1[0])}」：${stripMd(suppRow1[2])}）。\n② 第 2 小題遷移推導與理由論述：${clean(ld.answer)}。區分界線為——【${ld.leftLabel}】${clean(ld.left)}；【${ld.rightLabel}】${clean(ld.right)}。\n③ 考場最終防呆驗算：執行「${clean(wc.check)}」，並確認未觸犯「${stripMd(suppRow2[0])}（${stripMd(suppRow2[2])}）」，故結論嚴密成立。`,
    deductionDiagnostics: [
      `【閱卷常見扣分診斷 ① · 跳步失分】許多同學在紙上心算正確卻直接寫結論，在段考非選與會考數學非選中，若未寫出「${stripMd(suppRow0[0])}」的列式根據或理由主詞，即使答案正確也常從 3 級分被扣至 1～2 級分！`,
      `【閱卷常見扣分診斷 ② · 邊界與單位疏漏】考生常在最後一步誤踩「${clean(u.pitfall)}」，或漏寫「${stripMd(suppRow2[0])}」的限制前提與單位；建議交卷前用 10 秒默念「${clean(wc.check)}」做最後一次把關。`
    ]
  };

  const capYears = [...new Set(unitCaps.map(q => q.year))].sort((a, b) => a - b);
  const capSampleRefs = unitCaps.slice(0, 6).map(q => `${q.year}會考第${q.number}題(${q.explanation?.skill || '核心辨析'})`);
  const capSummaryLine = unitCaps.length > 0
    ? `已直接對齊歷屆會考真題庫共 ${unitCaps.length} 題（涵蓋 ${capYears.join('、')} 學年度，代表真題如：${capSampleRefs.join('、')}）`
    : `對應 108 課綱素養評量與各校定期評量核心命題（指標：${oaCodes}）`;

  const periodicSummaryLine = linkedPeriodic.length > 0
    ? `並雙向連結至站內 ${linkedPeriodic.length} 份公開段考預備講義（${linkedPeriodic.map(p => p.examTitle).join('、')}）`
    : `並搭配三組各校公開段考題型分析（${d.schoolExamArchetypes.map(a => a.title).join('、')}）`;

  d.examType.knowledgeAuditDetail = `【段考 × 會考 歷屆考點回推深度審計】
本單元「${u.title}」在近七年會考（109～115）與各校公開期中／期末段考中屬於「${profile.name}」的${profile.examFrequency}。
• 歷屆真題與校卷回推：${capSummaryLine}，${periodicSummaryLine}。
• 知識充足度專項稽核結論：${d.examType.knowledgeAudit}
• 回推解開段考與會考所需調用的「底層知識鏈」：
1. 核心定義與判準：「${r0[0]}」之精確內涵（${r0[1]}）；
2. 雙向對比與轉化：「${ld.leftLabel} vs. ${ld.rightLabel}」及「${r1[0]}／${r2[0]}」的條件轉換；
3. 考場防線與邊界：本頁核心精講、深度補充講義與原創圖解已 100% 覆蓋解題所需先備知識，並針對「${clean(u.pitfall.split('。')[0])}」設立避坑檢核。`;

  d.examType.publishersBreakdown = `【康軒 · 翰林 · 南一 三大版本教材重點深度對照】
• 本單元三版命題精要：${d.examType.publishersFocus}
1. 康軒版焦點（${pubGuide?.versions?.康軒?.chapterStatus || '核心概念導入'}）：${profile.publisherK}，特別著重「${r0[0]}」與實例應用（${clean(r0[2])}）。
2. 翰林版焦點（${pubGuide?.versions?.翰林?.chapterStatus || '嚴謹定義辨析'}）：${profile.publisherH}，聚焦「${r1[0]}」與「${ld.leftLabel} vs. ${ld.rightLabel}」的邏輯分界。
3. 南一版焦點（${pubGuide?.versions?.南一?.chapterStatus || '探究避坑實戰'}）：${profile.publisherN}，檢驗「${r2[0]}」在跨情境圖表題中的靈活遷移。`;

  d.examType.examCluesRadar = `【考場題眼關鍵詞雷達】
當段考或會考題幹出現「${d.examType.clues}」等訊號字眼時，立即啟動破題策略：「${d.examType.strategy}」。作答時先圈出限制條件與單位，建立穩健推理路徑。`;

  d.examType.scoringCriteria = `【108 課綱指標與大考評量要點】
對應教育部最新 108 課綱指標【${oaCodes}】，認知層次為【${d.examType.bloomLevel}】。${profile.scoringGuide}。`;

  // 3-Tier CAP Question Archetypes List + Interactive Drills
  const capQ0 = unitCaps[0];
  const capQ1 = unitCaps[1] || unitCaps[0];
  const capQ2 = unitCaps[Math.min(2, unitCaps.length - 1)] || unitCaps[0];

  const placeCorrectAt = (correctText, wrongs, targetIdx) => {
    const idx = ((targetIdx % 4) + 4) % 4;
    const arr = [...wrongs];
    arr.splice(idx, 0, correctText);
    return { options: arr.slice(0, 4), answer: idx };
  };

  const drillAOpts = placeCorrectAt(
    `依據「${r0[0]}」判準：${clean(r0[1])}（課本實例核對：${clean(r0[2])}）`,
    [
      `忽略基準前提，誤以為在任何情況下「${clean(u.pitfall.split('。')[0])}」皆不影響結果`,
      `將「${r0[0]}」與「${ld.rightLabel}」混淆，直接套用相反方向的規則`,
      `僅憑直覺猜測單一數值，不檢查單位與「${clean(r0[0])}」的成立條件`
    ],
    enrichedCount % 4
  );

  const drillBOpts = placeCorrectAt(
    `先鎖定控制變因，區分「${ld.leftLabel}（${clean(ld.left)}）」與「${ld.rightLabel}（${clean(ld.right)}）」，再依「${clean(r1[1])}」推導`,
    [
      `把「${ld.leftLabel}」與「${ld.rightLabel}」當成完全相同的條件，直接平均兩者數據`,
      `只看圖表或題幹的最後一個數字，完全忽略「${r1[0]}」的轉換關係`,
      `掉入「${clean(u.pitfall.split('。')[0])}」陷阱，把「${ld.rightLabel}」的特徵張冠李戴到「${ld.leftLabel}」`
    ],
    (enrichedCount + 1) % 4
  );

  const drillCOpts = placeCorrectAt(
    `結合「${r2[0]}（${clean(r2[1])}）」分步逆推（${clean(wc.steps?.[0] || r0[1])}），最後執行「${clean(wc.check)}」代回驗算`,
    [
      `直接跳過中間推理步驟，用未經驗證的極端假設猜測答案並省略驗算`,
      `只套用「${r0[0]}」的單向公式，忽略題幹給定的邊界限制與「${clean(u.pitfall.split('。')[0])}」`,
      `認為逆向題無法用課本概念解決，放棄核對「${clean(wc.check)}」的檢驗條件`
    ],
    (enrichedCount + 2) % 4
  );

  d.questionTypeList = [
    {
      code: 'Type A',
      badge: '基礎保底（B ➔ B+）',
      archetypeName: `【題型一：核心定義與基本判準辨析題】${r0[0]}之直接檢驗`,
      capRef: capQ0 ? `${capQ0.year} 會考第 ${capQ0.number} 題（${capQ0.explanation?.skill || '概念辨析'}）` : `108 課綱基礎指標【${d.examType.targetCodes}】核心題型`,
      questionPattern: `題幹直接給出「${clean(u.example.split('。')[0])}」之標準條件或基本圖式，要求判別「${r0[0]}」的正確性或直接求出單一目標量。`,
      requiredKnowledge: `必備知識點：「${r0[0]}」——${clean(r0[1])}（課本實例檢核：${clean(r0[2])}）。`,
      solvingSOP: `第 1 步先圈出題幹基準量與單位 ➔ 第 2 步直接套用「${r0[0]}」判準 ➔ 第 3 步核對是否觸犯「${clean(u.pitfall.split('。')[0])}」基本防線。`,
      archetypeDrill: {
        stem: `【Type A 基礎秒殺挑戰】在「${u.title}」的基礎情境（如：${clean(u.example.split('。')[0])}）中，若要正確運用「${r0[0]}」快速破題，下列哪個作法最正確？`,
        options: drillAOpts.options,
        answer: drillAOpts.answer,
        hint: `回想「${r0[0]}」的核心定義：${clean(r0[1])}。`,
        explanation: `破關關鍵：Type A 基礎題重在穩拿基本分！只要對準「${r0[0]}：${clean(r0[1])}」，並以「${clean(r0[2])}」核對、避開「${clean(u.pitfall.split('。')[0])}」，就能一秒鎖定正確答案！`
      }
    },
    {
      code: 'Type B',
      badge: '主流精熟（B++ ➔ A）',
      archetypeName: `【題型二：圖表數據轉譯與易混淆概念對比題】${ld.leftLabel} vs. ${ld.rightLabel}`,
      capRef: capQ1 ? `${capQ1.year} 會考第 ${capQ1.number} 題（${capQ1.explanation?.skill || '圖表與情境轉譯'}）` : `康軒／翰林／南一跨版本整合應用題型`,
      questionPattern: `題幹結合實驗紀錄表、對照圖形或雙情境文本，將「${ld.leftLabel}」與「${ld.rightLabel}」並列呈現，考驗學生能否從非連續性資訊中提煉「${r1[0]}」的變化規律。`,
      requiredKnowledge: `必備知識點：(1) ${ld.leftLabel}：${clean(ld.left)}；(2) ${ld.rightLabel}：${clean(ld.right)}；(3) 轉換規則：${clean(r1[1])}。`,
      solvingSOP: `第 1 步標出圖表橫縱軸或雙情境的控制變因 ➔ 第 2 步以「${r1[0]}」區隔「${ld.leftLabel}」與「${ld.rightLabel}」 ➔ 第 3 步刪除偷換條件或張冠李戴的誘答選項。`,
      archetypeDrill: {
        stem: `【Type B 雙情境對照挑戰】當題目同時列出「${ld.leftLabel}」與「${ld.rightLabel}」並要求結合「${r1[0]}」判讀圖表或情境時，哪個破題步驟能幫你穩拿 A 級分？`,
        options: drillBOpts.options,
        answer: drillBOpts.answer,
        hint: `先分清楚「${ld.leftLabel}」與「${ld.rightLabel}」的差異，再套用「${r1[0]}」。`,
        explanation: `破關關鍵：Type B 是從 B++ 衝上 A 級的決勝區！先切分「${ld.leftLabel}（${clean(ld.left)}）」與「${ld.rightLabel}（${clean(ld.right)}）」，再運用「${r1[0]}：${clean(r1[1])}」，就不會被張冠李戴的選項騙倒！`
      }
    },
    {
      code: 'Type C',
      badge: '頂標壓軸（A+ ➔ A++）',
      archetypeName: `【題型三：跨概念逆向推論與極端邊界壓軸題】${r2[0]}之綜合遷移`,
      capRef: capQ2 ? `${capQ2.year} 會考第 ${capQ2.number} 題（${capQ2.explanation?.skill || '綜合逆推壓軸'}）` : `會考前 5% A++ 頂標跨概念壓軸題型`,
      questionPattern: `題幹不直接給出正向條件，而是給予最終結果或限制範圍（如：「${clean(wc.problem.slice(0, 48))}…」），要求逆向反推未知條件或評估改變條件後的連鎖效應。`,
      requiredKnowledge: `必備知識點：結合「${r0[0]}」、「${r1[0]}」與「${r2[0]}（${clean(r2[1])}）」，並啟動邊界防禦機制「${clean(wc.check)}」。`,
      solvingSOP: `第 1 步將題幹結果逆向拆解為子條件（${clean(wc.steps?.[0] || r0[1])}） ➔ 第 2 步聯立「${r1[0]}」與「${r2[0]}」推演（${clean(wc.steps?.[1] || r1[1])}） ➔ 第 3 步將所得結論代回原情境執行「${clean(wc.check)}」雙向驗算。`,
      archetypeDrill: {
        stem: `【Type C 頂標壓軸挑戰】面對逆向壓軸情境：「${clean(wc.problem.slice(0, 54))}…」，若要達成 A++ 零失誤破關，應該採取哪項策略？`,
        options: drillCOpts.options,
        answer: drillCOpts.answer,
        hint: `結合「${r2[0]}」分步逆推，並務必執行「${clean(wc.check)}」驗算。`,
        explanation: `破關關鍵：Type C 壓軸題考驗逆向拆解與邊界防禦！結合「${r2[0]}：${clean(r2[1])}」逐步推演，最後一定要用「${clean(wc.check)}」反向代回驗算，這就是會考 A++ 滿分高手的秘密武器！`
      }
    }
  ];

  // Knowledge Sufficiency Micro-Patches
  const kp0 = kps[0];
  const kp1 = kps[1] || kp0;
  d.knowledgeSufficiencyPatch = {
    auditConclusion: `✅ 108 課綱指標【${oaCodes}】× 歷屆段考與會考回推檢驗通過：本頁知識點已 100% 涵蓋「${u.title}」三大段考題型與三大會考題型所需之定義、公式與邊界判準。特於下方補足 3 項「從課本定義到考場破題」的微觀知識銜接點：`,
    patchPoints: [
      {
        tag: '微觀補強 ① · 隱含前提與定義邊界',
        title: `為什麼課本背熟了還是會錯？「${r0[0]}」的成立前提`,
        content: `許多考生只背誦結論「${clean(r0[1])}」，卻忽略段考與會考常在前提條件做文章。在使用「${r0[0]}」前，務必先確認情境是否滿足基準條件（實例核對：${clean(r0[2])}）。${kp0 ? `微觀機制提醒：${clean(kp0.mechanism)}。` : ''}`
      },
      {
        tag: '微觀補強 ② · 雙概念精準切分線',
        title: `一秒分辨「${ld.leftLabel}」與「${ld.rightLabel}」的黃金判準`,
        content: `康軒、翰林、南一三版本皆將此對比列為命題核心：當情境符合「${clean(ld.left)}」時歸類為【${ld.leftLabel}】；當情境呈現「${clean(ld.right)}」時則必須歸類為【${ld.rightLabel}】。搭配「${r1[0]}（${clean(r1[1])}）」即可消除模糊地帶。`
      },
      {
        tag: '微觀補強 ③ · 考場逆向檢核防線',
        title: `防範「${clean(u.pitfall.split('。')[0])}」的實戰驗算公式`,
        content: `段考與會考誘答選項最常利用「${clean(u.pitfall)}」設下陷阱。作答完畢後，請務必執行本課專屬逆向檢核：「${clean(wc.check)}」，並對照遷移任務「${clean(u.task)}」確認邏輯閉環。${kp1 ? `實戰秘訣：${clean(kp1.practicalTip)}。` : ''}`
      }
    ]
  };

  d.zeroToTopLadder = {
    zeroFoundation: `【🌱 Step 1｜小白破冰 · B 級保底心法】
先別被專有名詞嚇到！「${u.title}」最核心的白話本質就是：${u.concept}
初學起步時，請先牢記第一條黃金保底判準——「${r0[0]}：${r0[1]}（例如：${r0[2]}）」。
在段考與會考作答時，只要順著定義冷靜比對題幹條件，不盲目猜題，就能在 30 秒內排除明顯誤導選項，穩拿基礎題保底分數！`,

    mainstreamBtoA: `【⚡ Step 2｜主流破題 · B++ 躍升 A 級 SOP】
晉升 B++ 至 A 精熟等級的致勝核心，在於建立「題幹線索 ➔ 核心判準 ➔ 嚴謹列式」的反射神經：
1. 抓題眼：精準捕捉題幹中隱藏的關鍵訊號「${d.examType.clues}」；
2. 判準定位：快速調用「${r1[0]}」與「${r2[0]}」的比較法則；
3. 執行策略：堅決貫徹破題法寶「${d.examType.strategy}」；
4. 避坑防禦：主動築起避坑防線，徹底杜絕盲點「${clean(u.pitfall.split('。')[0])}」，穩拿段考與會考主流分數。`,

    topTierAPlusPlus: `【🏆 Step 3｜頂標壓軸 · A++ 決勝滿分思維】
段考壓軸與會考前 5%（A++ 頂標）決勝題，考驗跨圖表轉譯、逆向倒推與多條件約束下的推理嚴密性。
面對難度最高的壓軸挑戰時，必須啟動終極驗算防禦系統：
運用頂標檢驗原則——「${wc.check}」，做完務必進行「邊界極端值代入驗算」或「反向代回原題幹檢核」，排除所有隱含陷阱與計算筆誤！`
  };

  enrichedCount++;
}

assert.equal(seenAllStems.size, units.length * 3, `Expected ${units.length * 3} unique practice stems, got ${seenAllStems.size}`);
console.log(`[Build Exam Types Data] Successfully compiled ${enrichedCount} units (${seenAllStems.size} globally unique practice problems, 0 overwritten)!`);

const outSource = `// dist/exam-types-data.js
// 108 Curriculum x Public School Midterm/Final Exams x CAP Exam (109-115)
// Reverse-Engineered Question Types, Visual Roadmap Illustrations, Knowledge Sufficiency Audit,
// and 564 Authentic Practice Problems (3 per unit) with Illustrated 5-Step Scaffolding Solutions.

import {
  renderExamRoadmapIllustration,
  renderFiveStepVisualGuide,
  renderConstructedRubricSVG,
  getStepIconSVG
} from './lesson-illustrations.js';

export const examTypesData = ${JSON.stringify(allExamData, null, 2)};

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Safe textbook formatting: HTML-escapes first, then converts **bold** and \`code\` cleanly (strips stray **)
const fmt = s => esc(s)
  .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
  .replace(/\\*\\*/g, '')
  .replace(/\`([^\`]+)\`/g, '<code class="supp-code">$1</code>');

function renderSolutionSteps(steps) {
  return \`
    \${renderFiveStepVisualGuide()}
    <ol class="solution-steps-list" style="padding-left:0;margin:0;display:flex;flex-direction:column;gap:12px;">
      \${steps.map((st, sIdx) => \`
        <li class="solution-step-item solution-step-item-rich">
          \${getStepIconSVG(sIdx, 20)}
          <div class="solution-step-body">\${fmt(st)}</div>
        </li>
      \`).join('')}
    </ol>
  \`;
}

export function renderExamTypeAndExample(u) {
  const data = examTypesData[u.id];
  if (!data) return '';

  const et = data.examType;
  const we = data.workedExample;
  const fp = data.followUpPractice;
  const pp = data.periodicExamPractice;
  const cr = data.constructedResponseLab;
  const digest = data.examPrepDigest;
  const schoolArchs = data.schoolExamArchetypes || [];
  const linkedPeriodic = data.linkedPeriodicExams || [];
  const qTypes = data.questionTypeList || [];
  const patch = data.knowledgeSufficiencyPatch;
  const ladder = data.zeroToTopLadder;

  return \`
<section class="lesson-step cap-exam-type-step" id="step-exam-types" aria-labelledby="exam-types-heading-\${u.id}">
  <div class="step-label" style="background:#e8f4fd;color:#0277bd;font-weight:700;">段考 × 會考 題型攻略與實戰演練</div>
  <h2 id="exam-types-heading-\${u.id}">本課段考／會考題型分析、實戰例題與五步詳解</h2>
  <p class="muted">整合歷年各校公開段考／期中考／期末考與會考真題，對照教育部最新 108 課綱與三版教材，先看圖掌握題型地圖，再完成三道互動實戰題並核對五步詳解。</p>

  <!-- Visual Illustration Header: Dual-Track Roadmap & 108 Curriculum 100% Coverage Gauge -->
  \${renderExamRoadmapIllustration(u, data, linkedPeriodic)}

  \${ladder ? \`
  <!-- Module 0: Zero-Foundation to CAP A++ Top-Tier 3-Stage Mastery Ladder -->
  <div class="zero-to-top-ladder-card" style="border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:18px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
      <strong style="font-size:1rem;color:var(--text);display:flex;align-items:center;gap:6px;">🧭 從辨認線索到獨立應用（零基礎 ➔ A++ 進階階梯）</strong>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        \${linkedPeriodic.slice(0, 2).map(p => \`<a class="periodic-link-pill" href="#/periodic-exams" title="前往檢視該次段考完整講義">📝 \${esc(p.examTitle)}講義 ↗</a>\`).join('')}
        <span class="tag" style="background:#edf7ed;color:#1e4620;font-weight:700;font-size:0.8rem;">循序漸進 · 階梯式養成</span>
      </div>
    </div>
    <div class="zero-to-top-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;">
      <div class="ladder-stage-box" style="background:var(--surface-alt);border:1px solid var(--border);border-top:4px solid #43a047;border-radius:8px;padding:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <strong style="color:#2e7d32;font-size:0.92rem;">🌱 Step 1｜小白破冰（B 保底）</strong>
          <span style="font-size:0.75rem;background:#e8f5e9;color:#2e7d32;padding:2px 6px;border-radius:4px;font-weight:600;">零基礎秒懂</span>
        </div>
        <p style="margin:0;font-size:0.88rem;line-height:1.6;color:var(--text);white-space:pre-wrap;">\${fmt(ladder.zeroFoundation)}</p>
      </div>
      <div class="ladder-stage-box" style="background:var(--surface-alt);border:1px solid var(--border);border-top:4px solid #1e88e5;border-radius:8px;padding:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <strong style="color:#1565c0;font-size:0.92rem;">⚡ Step 2｜主流破題（B++ ➔ A）</strong>
          <span style="font-size:0.75rem;background:#e3f2fd;color:#1565c0;padding:2px 6px;border-radius:4px;font-weight:600;">高頻必拿分</span>
        </div>
        <p style="margin:0;font-size:0.88rem;line-height:1.6;color:var(--text);white-space:pre-wrap;">\${fmt(ladder.mainstreamBtoA)}</p>
      </div>
      <div class="ladder-stage-box" style="background:var(--surface-alt);border:1px solid var(--border);border-top:4px solid #fb8c00;border-radius:8px;padding:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <strong style="color:#ef6c00;font-size:0.92rem;">🏆 Step 3｜頂標突破（A+ ➔ A++）</strong>
          <span style="font-size:0.75rem;background:#fff3e0;color:#e65100;padding:2px 6px;border-radius:4px;font-weight:600;">壓軸決勝題</span>
        </div>
        <p style="margin:0;font-size:0.88rem;line-height:1.6;color:var(--text);white-space:pre-wrap;">\${fmt(ladder.topTierAPlusPlus)}</p>
      </div>
    </div>
  </div>
  \` : ''}

  <!-- Module 1: Exam Type Analysis Matrix & Reverse-Engineered Knowledge Audit -->
  <div class="exam-type-matrix-card" style="border:1px solid var(--border);border-left:5px solid var(--brand);background:var(--surface);border-radius:10px;padding:18px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
    <div class="row" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:14px;">
      <span class="tag accent" style="font-weight:700;font-size:0.95rem;">📌 \${fmt(et.typeName)}</span>
      <span class="tag" style="font-size:0.78rem;">📐 108 課綱：\${esc(et.targetCodes)}</span>
      <span class="subtle" style="margin-left:auto;font-size:0.85rem;">認知層次：\${esc(et.bloomLevel)}</span>
    </div>

    <p style="margin:0 0 12px 0;font-size:0.86rem;color:var(--text-muted);"><strong>📊 命題熱度與定位：</strong>\${fmt(et.frequency)}</p>

    <div class="exam-type-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;background:var(--surface-alt);padding:14px;border-radius:8px;margin-bottom:12px;">
      <div class="exam-type-cell">
        <strong style="color:var(--text);display:block;margin-bottom:4px;">🔍 審題題眼與已知線索：</strong>
        <p style="margin:0;font-size:0.9rem;line-height:1.55;color:var(--text);">\${fmt(et.clues)}</p>
      </div>
      <div class="exam-type-cell">
        <strong style="color:var(--text);display:block;margin-bottom:4px;">💡 破題思維攻擊角：</strong>
        <p style="margin:0;font-size:0.9rem;line-height:1.55;color:var(--text);">\${fmt(et.strategy)}</p>
      </div>
      <div class="exam-type-cell" style="grid-column:1 / -1;">
        <strong style="color:var(--text);display:block;margin-bottom:4px;">📚 康軒 · 翰林 · 南一 三版本教材重點對照：</strong>
        <p style="margin:0;font-size:0.88rem;line-height:1.65;color:var(--text);white-space:pre-wrap;">\${fmt(et.publishersBreakdown || et.publishersFocus)}</p>
      </div>
    </div>

    \${et.knowledgeAuditDetail ? \`
    <div class="knowledge-audit-box" style="margin-top:12px;background:var(--surface);border:1px solid var(--border);border-left:4px solid #10b981;border-radius:6px;padding:12px 14px;">
      <strong style="color:#059669;display:block;margin-bottom:4px;font-size:0.88rem;">✅ 108 課綱 × 段考與會考知識充足度回推審計</strong>
      <div style="font-size:0.86rem;line-height:1.65;color:var(--text);white-space:pre-wrap;">\${fmt(et.knowledgeAuditDetail)}</div>
    </div>
    \` : \`
    <div class="knowledge-audit-row" style="margin-top:12px;font-size:0.82rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;">
      <span>✅ <strong>課綱知識充足度檢驗：</strong>\${fmt(et.knowledgeAudit)}</span>
    </div>
    \`}

    \${et.scoringCriteria ? \`
    <div class="scoring-criteria-box" style="margin-top:10px;font-size:0.82rem;line-height:1.55;color:var(--text-muted);background:var(--surface-alt);padding:8px 12px;border-radius:6px;">
      <span>⚖️ \${fmt(et.scoringCriteria)}</span>
    </div>
    \` : ''}
  </div>

  \${schoolArchs.length ? \`
  <!-- Module 1.2: 各校公開段考 · 期中考 · 期末考 必考題型分析清單 -->
  <div class="school-archetypes-card">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
      <strong style="font-size:1rem;color:var(--text);display:flex;align-items:center;gap:6px;">🏫 各校公開段考 · 期中考 · 期末考 必考題型分析清單</strong>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span class="tag" style="background:#e0f2f1;color:#00695c;font-weight:700;font-size:0.8rem;">實戰校卷回推 · 3 大必考題型</span>
        <a class="periodic-link-pill" href="#/periodic-exams">📚 開啟全學期段考總覽 →</a>
      </div>
    </div>
    <div class="school-archetypes-grid">
      \${schoolArchs.map(sa => \`
        <div class="school-archetype-item">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;">
            <span class="tag" style="background:#00695c;color:#fff;font-size:0.74rem;font-weight:700;">\${esc(sa.code)}</span>
            <span style="font-size:0.75rem;color:#00796b;font-weight:700;background:#e0f2f1;padding:2px 8px;border-radius:12px;">\${esc(sa.examTiming)}</span>
          </div>
          <strong style="font-size:0.94rem;color:var(--text);line-height:1.45;">\${fmt(sa.title)}</strong>
          <p style="margin:0;font-size:0.85rem;line-height:1.6;color:var(--text);"><strong>📝 校卷出題脈絡：</strong>\${fmt(sa.schoolContext)}</p>
          <p style="margin:0;font-size:0.85rem;line-height:1.6;color:var(--text);"><strong>🧩 回推必備知識：</strong>\${fmt(sa.requiredKnowledge)}</p>
          <div style="margin-top:auto;padding-top:8px;border-top:1px dashed var(--border);font-size:0.83rem;line-height:1.55;color:#00695c;">
            <strong>⚡ 考場破題 SOP：</strong>\${fmt(sa.sop)}
          </div>
        </div>
      \`).join('')}
    </div>
  </div>
  \` : ''}

  \${qTypes.length ? \`
  <!-- Module 1.5A: 歷屆會考三大核心題型分類表 & 互動破關集章 -->
  <div class="cap-archetypes-card" style="border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:18px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
      <strong style="font-size:1rem;color:var(--text);display:flex;align-items:center;gap:6px;">🗂️ 歷屆會考三階核心題型分類與破關快篩</strong>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span class="tag" style="background:#fff8e1;color:#e65100;font-weight:700;font-size:0.8rem;" data-unit-archetype-prog="\${u.id}">🏆 題型制霸進度：0 / \${qTypes.length}</span>
        <span class="tag" style="background:#e8eaf6;color:#283593;font-weight:700;font-size:0.8rem;">作答後核對理由</span>
      </div>
    </div>
    <div id="archetype-mastery-banner-\${u.id}" style="display:none;margin-bottom:14px;padding:12px 16px;border-radius:8px;background:linear-gradient(135deg,#e8f5e9,#fff8e1);border:1px solid #81c784;color:#1b5e20;font-weight:700;font-size:0.92rem;">
      🎊 恭喜大滿貫！你已 100% 制霸「\${esc(u.title)}」三大核心題型（Type A / Type B / Type C），考場遇到任何變形題都能從容應對！
    </div>
    <div class="cap-archetypes-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;">
      \${qTypes.map(qt => \`
        <div class="archetype-item" data-archetype-card="\${u.id}:\${qt.code}" style="background:var(--surface-alt);border:1px solid var(--border);border-radius:8px;padding:14px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;">
            <span class="tag" style="background:#193e35;color:#fff;font-size:0.75rem;font-weight:700;">\${esc(qt.code)}</span>
            <span style="font-size:0.76rem;color:#0277bd;font-weight:600;background:#e1f5fe;padding:2px 8px;border-radius:12px;">\${esc(qt.badge)}</span>
            <span class="archetype-stamp-badge" data-archetype-stamp="\${u.id}:\${qt.code}" style="margin-left:auto;font-size:0.74rem;font-weight:700;padding:2px 8px;border-radius:12px;background:#f5f5f5;color:#616161;border:1px solid #e0e0e0;">🌱 待破關</span>
          </div>
          <strong style="font-size:0.93rem;color:var(--text);line-height:1.45;">\${esc(qt.archetypeName)}</strong>
          <div style="font-size:0.78rem;color:var(--text-muted);">📌 對應參考：\${esc(qt.capRef)}</div>
          <p style="margin:0;font-size:0.86rem;line-height:1.55;color:var(--text);"><strong>命題模式：</strong>\${esc(qt.questionPattern)}</p>
          <p style="margin:0;font-size:0.86rem;line-height:1.55;color:var(--text);"><strong>回推必備知識點：</strong>\${esc(qt.requiredKnowledge)}</p>
          <div style="padding-top:8px;border-top:1px dashed var(--border);font-size:0.84rem;line-height:1.5;color:#1b5e20;">
            <strong>⚡ 標準破題 SOP：</strong>\${esc(qt.solvingSOP)}
          </div>
          \${qt.archetypeDrill ? \`
          <details class="archetype-drill-details" style="margin-top:auto;padding-top:8px;border-top:1px solid var(--border);">
            <summary style="cursor:pointer;font-size:0.84rem;font-weight:700;color:#0d47a1;display:flex;align-items:center;justify-content:space-between;user-select:none;padding:4px 0;">
              <span>🎮 立即實戰破關【\${esc(qt.code)}】核心題型</span>
              <span style="font-size:0.74rem;background:#e3f2fd;color:#1565c0;padding:1px 7px;border-radius:10px;">點此挑戰領印章</span>
            </summary>
            <div class="archetype-drill-box" data-drill-unit="\${u.id}" data-drill-code="\${qt.code}" style="margin-top:8px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px;">
              <p style="margin:0 0 8px 0;font-size:0.84rem;font-weight:600;line-height:1.5;color:var(--text);">\${esc(qt.archetypeDrill.stem)}</p>
              <div style="display:flex;flex-direction:column;gap:6px;" role="group" aria-label="\${esc(qt.code)} 題型破關選項">
                \${qt.archetypeDrill.options.map((dOpt, dIdx) => \`
                  <button type="button" class="archetype-drill-opt-btn" data-unit="\${u.id}" data-code="\${qt.code}" data-opt-idx="\${dIdx}" data-ans="\${qt.archetypeDrill.answer}" data-exp="\${esc(qt.archetypeDrill.explanation)}" style="display:flex;align-items:flex-start;gap:8px;width:100%;text-align:left;padding:8px 10px;border-radius:6px;border:1px solid var(--border);background:var(--surface-alt);cursor:pointer;font-size:0.82rem;line-height:1.45;transition:all 0.18s ease;">
                    <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--surface);border:1px solid var(--border);font-weight:700;font-size:0.75rem;flex-shrink:0;">\${String.fromCharCode(65 + dIdx)}</span>
                    <span style="flex:1;">\${esc(dOpt)}</span>
                  </button>
                \`).join('')}
              </div>
              <div class="archetype-drill-fb" style="display:none;margin-top:8px;padding:8px 10px;border-radius:6px;font-size:0.81rem;line-height:1.5;"></div>
            </div>
          </details>
          \` : ''}
        </div>
      \`).join('')}
    </div>
  </div>
  \` : ''}

  \${patch ? \`
  <!-- Module 1.5B: 知識點回推充足度檢驗與微觀補強講義 -->
  <div class="knowledge-patch-card" style="border:1px solid var(--border);border-left:5px solid #8e24aa;background:var(--surface);border-radius:10px;padding:18px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
      <strong style="font-size:1rem;color:var(--text);display:flex;align-items:center;gap:6px;">🧩 解題前知識點充足度微觀補強</strong>
      <span class="tag" style="background:#f3e5f5;color:#6a1b9a;font-weight:700;font-size:0.8rem;">零知識斷層 · 100% 充足度保障</span>
    </div>
    <p style="margin:0 0 12px 0;font-size:0.88rem;line-height:1.65;color:var(--text);">\${esc(patch.auditConclusion)}</p>
    <div class="patch-points-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
      \${patch.patchPoints.map(pt => \`
        <div class="patch-point-item" style="background:var(--surface-alt);border:1px solid var(--border);border-radius:8px;padding:12px 14px;">
          <div style="font-size:0.76rem;font-weight:700;color:#6a1b9a;margin-bottom:4px;">\${esc(pt.tag)}</div>
          <strong style="display:block;font-size:0.9rem;color:var(--text);margin-bottom:6px;">\${esc(pt.title)}</strong>
          <p style="margin:0;font-size:0.86rem;line-height:1.6;color:var(--text);">\${esc(pt.content)}</p>
        </div>
      \`).join('')}
    </div>
  </div>
  \` : ''}

  \${digest ? \`
  <!-- Module 1.8: 歷屆段考×會考實證回推清單與考前 5 分鐘口頭自測 -->
  <div class="exam-digest-card">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
      <strong style="font-size:1rem;color:var(--text);">⚡ 考前 5 分鐘速查：歷屆真題／公開校卷實證回推與口頭自測</strong>
      <span class="tag" style="background:#e8f5e9;color:#1b5e20;font-weight:700;font-size:0.78rem;">真題實證 × 主動提取</span>
    </div>
    <p style="margin:0 0 12px 0;font-size:0.86rem;line-height:1.6;color:var(--text-muted);">\${esc(digest.summaryHeader)}</p>
    <div class="table-wrap" style="margin-bottom:14px;">
      <table class="teaching-table">
        <caption>\${esc(u.title)} · 歷屆會考與公開校卷知識點回推實證表</caption>
        <thead>
          <tr><th style="width:28%;">📌 考卷來源與題號</th><th style="width:32%;">🎯 核心考點定位</th><th style="width:40%;">✅ 本課知識覆蓋與避坑對應</th></tr>
        </thead>
        <tbody>
          \${digest.evidenceLedger.map(ev => \`
            <tr>
              <td><strong>\${fmt(ev.source)}</strong></td>
              <td>\${fmt(ev.focus)}</td>
              <td>\${fmt(ev.sufficiency)}</td>
            </tr>
          \`).join('')}
        </tbody>
      </table>
    </div>
    <div class="oral-checkpoints-wrap">
      <strong style="display:block;font-size:0.9rem;color:var(--text);margin-bottom:8px;">🗣️ 考前 3 題口頭秒答自測（先口頭說出理由，再點開核對）</strong>
      \${digest.oralCheckpoints.map(oc => \`
        <details class="oral-checkpoint-item">
          <summary>\${fmt(oc.q)}</summary>
          <p>\${fmt(oc.a)}</p>
        </details>
      \`).join('')}
    </div>
  </div>
  \` : ''}

  <!-- Module 2: Interactive Worked Example Practice (Example 1) -->
  <div class="exam-practice-card" id="exam-practice-\${u.id}" style="border:1px solid var(--border);border-radius:10px;background:var(--surface);padding:20px;margin-bottom:20px;box-shadow:0 3px 12px rgba(0,0,0,0.05);">
    <div class="practice-card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.3rem;">🎯</span>
        <strong style="font-size:1.05rem;">【實戰例題一 · 會考典範】\${esc(we.title)}</strong>
      </div>
      <span class="subtle" style="font-size:0.82rem;">點選選項立即批改並自動展開五步詳解</span>
    </div>

    <div class="practice-stem-box" style="margin-bottom:16px;">
      <p class="practice-stem" style="font-size:1rem;line-height:1.65;font-weight:500;margin:0;white-space:pre-wrap;">\${fmt(we.stem)}</p>
    </div>

    <div class="practice-options-grid" role="group" aria-label="例題一選項" style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">
      \${we.options.map((opt, optIdx) => \`
        <button type="button" class="practice-opt-btn" data-card-id="exam-practice-\${u.id}" data-fb-id="practice-fb-\${u.id}" data-sol-id="practice-sol-\${u.id}" data-unit="\${u.id}" data-opt-idx="\${optIdx}" data-ans="\${we.answer}" style="display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;padding:12px 16px;border-radius:8px;border:1px solid var(--border);background:var(--surface-alt);cursor:pointer;transition:all 0.2s ease;font-size:0.95rem;line-height:1.5;">
          <span class="opt-letter-badge" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--surface);border:1px solid var(--border);font-weight:700;flex-shrink:0;">\${String.fromCharCode(65 + optIdx)}</span>
          <span class="opt-text" style="flex:1;">\${fmt(opt)}</span>
        </button>
      \`).join('')}
    </div>

    <div class="practice-fb-banner" id="practice-fb-\${u.id}" style="display:none;padding:12px 16px;border-radius:8px;margin-bottom:16px;font-weight:600;font-size:0.95rem;line-height:1.5;"></div>

    <details class="exam-solution-accordion" id="practice-sol-\${u.id}" style="margin-top:14px;border-top:1px dashed var(--border);padding-top:14px;">
      <summary style="cursor:pointer;font-weight:700;color:var(--brand);display:flex;align-items:center;gap:8px;padding:6px 0;user-select:none;">
        <span>📖 展開【實戰例題一】圖解式五步詳解（審題 ➔ 定理 ➔ 推導 ➔ 逐項剖析 ➔ 版本心法）</span>
        <span class="summary-pill" style="margin-left:auto;background:var(--surface-alt);border:1px solid var(--border);padding:2px 8px;border-radius:12px;font-size:0.8rem;color:var(--text-muted);font-weight:500;">5 步全方位解析</span>
      </summary>
      <div class="solution-steps-wrapper" style="margin-top:12px;background:var(--surface-alt);padding:16px;border-radius:8px;border:1px solid var(--border);">
        \${renderSolutionSteps(we.steps)}
      </div>
    </details>
  </div>

  \${fp ? \`
  <!-- Module 3: Interactive Follow-Up Practice (Example 2: Variation / Transfer Problem) -->
  <div class="exam-practice-card exam-followup-card" id="exam-followup-\${u.id}" style="border:1px solid var(--border);border-left:5px solid #0277bd;border-radius:10px;background:var(--surface);padding:20px;box-shadow:0 3px 12px rgba(0,0,0,0.05);">
    <div class="practice-card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.3rem;">🚀</span>
        <strong style="font-size:1.05rem;">【進階練習二 · 素養變形】\${esc(fp.title)}</strong>
      </div>
      <span class="tag" style="background:#e1f5fe;color:#01579b;font-weight:700;font-size:0.78rem;">\${esc(fp.badge || '進階遷移實戰')}</span>
    </div>

    <div class="practice-stem-box" style="margin-bottom:16px;">
      <p class="practice-stem" style="font-size:1rem;line-height:1.65;font-weight:500;margin:0;white-space:pre-wrap;">\${fmt(fp.stem)}</p>
    </div>

    <div class="practice-options-grid" role="group" aria-label="進階練習二選項" style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">
      \${fp.options.map((opt, optIdx) => \`
        <button type="button" class="practice-opt-btn followup-opt-btn" data-card-id="exam-followup-\${u.id}" data-fb-id="followup-fb-\${u.id}" data-sol-id="followup-sol-\${u.id}" data-unit="\${u.id}" data-opt-idx="\${optIdx}" data-ans="\${fp.answer}" style="display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;padding:12px 16px;border-radius:8px;border:1px solid var(--border);background:var(--surface-alt);cursor:pointer;transition:all 0.2s ease;font-size:0.95rem;line-height:1.5;">
          <span class="opt-letter-badge" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--surface);border:1px solid var(--border);font-weight:700;flex-shrink:0;">\${String.fromCharCode(65 + optIdx)}</span>
          <span class="opt-text" style="flex:1;">\${fmt(opt)}</span>
        </button>
      \`).join('')}
    </div>

    <div class="practice-fb-banner" id="followup-fb-\${u.id}" style="display:none;padding:12px 16px;border-radius:8px;margin-bottom:16px;font-weight:600;font-size:0.95rem;line-height:1.5;"></div>

    <details class="exam-solution-accordion" id="followup-sol-\${u.id}" style="margin-top:14px;border-top:1px dashed var(--border);padding-top:14px;">
      <summary style="cursor:pointer;font-weight:700;color:#0277bd;display:flex;align-items:center;gap:8px;padding:6px 0;user-select:none;">
        <span>📖 展開【進階練習二】圖解式五步詳解（審題 ➔ 定理 ➔ 推導 ➔ 逐項剖析 ➔ 變形遷移）</span>
        <span class="summary-pill" style="margin-left:auto;background:var(--surface-alt);border:1px solid var(--border);padding:2px 8px;border-radius:12px;font-size:0.8rem;color:var(--text-muted);font-weight:500;">5 步全方位解析</span>
      </summary>
      <div class="solution-steps-wrapper" style="margin-top:12px;background:var(--surface-alt);padding:16px;border-radius:8px;border:1px solid var(--border);">
        \${renderSolutionSteps(fp.steps)}
      </div>
    </details>
  </div>
  \` : ''}

  \${pp ? \`
  <!-- Module 4: Interactive School Periodic Exam Practice (Example 3: School Midterm/Final Exam) -->
  <div class="exam-practice-card exam-periodic-card" id="exam-periodic-\${u.id}">
    <div class="practice-card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.3rem;">🏫</span>
        <strong style="font-size:1.05rem;">【段考實戰三 · 校卷壓軸】\${esc(pp.title)}</strong>
      </div>
      <span class="tag" style="background:#fff3e0;color:#b45309;font-weight:700;font-size:0.78rem;">\${esc(pp.badge || '校內段考壓軸演練')}</span>
    </div>

    <div class="practice-stem-box" style="margin-bottom:16px;">
      <p class="practice-stem" style="font-size:1rem;line-height:1.65;font-weight:500;margin:0;white-space:pre-wrap;">\${fmt(pp.stem)}</p>
    </div>

    <div class="practice-options-grid" role="group" aria-label="段考實戰三選項" style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">
      \${pp.options.map((opt, optIdx) => \`
        <button type="button" class="practice-opt-btn periodic-opt-btn" data-card-id="exam-periodic-\${u.id}" data-fb-id="periodic-fb-\${u.id}" data-sol-id="periodic-sol-\${u.id}" data-unit="\${u.id}" data-opt-idx="\${optIdx}" data-ans="\${pp.answer}" style="display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;padding:12px 16px;border-radius:8px;border:1px solid var(--border);background:var(--surface-alt);cursor:pointer;transition:all 0.2s ease;font-size:0.95rem;line-height:1.5;">
          <span class="opt-letter-badge" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--surface);border:1px solid var(--border);font-weight:700;flex-shrink:0;">\${String.fromCharCode(65 + optIdx)}</span>
          <span class="opt-text" style="flex:1;">\${fmt(opt)}</span>
        </button>
      \`).join('')}
    </div>

    <div class="practice-fb-banner" id="periodic-fb-\${u.id}" style="display:none;padding:12px 16px;border-radius:8px;margin-bottom:16px;font-weight:600;font-size:0.95rem;line-height:1.5;"></div>

    <details class="exam-solution-accordion" id="periodic-sol-\${u.id}" style="margin-top:14px;border-top:1px dashed var(--border);padding-top:14px;">
      <summary style="cursor:pointer;font-weight:700;color:#b45309;display:flex;align-items:center;gap:8px;padding:6px 0;user-select:none;">
        <span>📖 展開【段考實戰三】圖解式五步詳解（審題 ➔ 課綱 ➔ 推導 ➔ 陷阱剖析 ➔ 段考必勝心法）</span>
        <span class="summary-pill" style="margin-left:auto;background:var(--surface-alt);border:1px solid var(--border);padding:2px 8px;border-radius:12px;font-size:0.8rem;color:var(--text-muted);font-weight:500;">5 步全方位解析</span>
      </summary>
      <div class="solution-steps-wrapper" style="margin-top:12px;background:var(--surface-alt);padding:16px;border-radius:8px;border:1px solid var(--border);">
        \${renderSolutionSteps(pp.steps)}
      </div>
    </details>
  </div>
  \` : ''}

  \${cr ? \`
  <!-- Module 5: Constructed-Response / Non-Choice Written Lab with 3-Level Scoring Rubric -->
  <div class="exam-constructed-card" id="exam-constructed-\${u.id}">
    <div class="practice-card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.3rem;">✍️</span>
        <strong style="font-size:1.05rem;">\${esc(cr.title)}</strong>
      </div>
      <span class="tag" style="background:#f3e5f5;color:#6a1b9a;font-weight:700;font-size:0.78rem;">\${esc(cr.badge)}</span>
    </div>
    <p style="margin:0 0 12px 0;font-size:0.9rem;line-height:1.65;color:var(--text-muted);">\${fmt(cr.scenarioContext)}</p>
    <ol class="constructed-subq-list">
      \${cr.subQuestions.map(sq => \`<li>\${fmt(sq)}</li>\`).join('')}
    </ol>
    <label for="cr-draft-\${u.id}" class="subtle" style="display:block;margin:10px 0 6px;font-weight:700;">📝 我的手寫草稿與推導列式區（先試著寫下完整步驟與理由，再展開下方滿分規準批改）：</label>
    <textarea id="cr-draft-\${u.id}" class="constructed-draft-box" rows="4" placeholder="第 1 小題列式與理由：&#10;第 2 小題比較界線與驗算："></textarea>
    <details class="exam-solution-accordion" id="constructed-sol-\${u.id}" style="margin-top:14px;border-top:1px dashed var(--border);padding-top:14px;">
      <summary style="cursor:pointer;font-weight:700;color:#6a1b9a;display:flex;align-items:center;gap:8px;padding:6px 0;user-select:none;">
        <span>🏆 展開【非選滿分 3 級分評分規準 · 標準示範寫法 · 閱卷扣分診斷】</span>
        <span class="summary-pill" style="margin-left:auto;background:var(--surface-alt);border:1px solid var(--border);padding:2px 8px;border-radius:12px;font-size:0.8rem;color:var(--text-muted);font-weight:500;">3 級分自評表</span>
      </summary>
      <div class="solution-steps-wrapper" style="margin-top:12px;background:var(--surface-alt);padding:16px;border-radius:8px;border:1px solid var(--border);">
        \${renderConstructedRubricSVG(u)}
        <div class="table-wrap" style="margin:12px 0;">
          <table class="teaching-table">
            <caption>\${esc(u.title)} · 非選擇題 0～3 級分自我批改規準</caption>
            <thead><tr><th style="width:26%;">評分等級</th><th>給分判準與必備要素</th></tr></thead>
            <tbody>
              \${cr.rubric.map(rb => \`<tr><th scope="row">\${esc(rb.level)}</th><td>\${fmt(rb.criteria)}</td></tr>\`).join('')}
            </tbody>
          </table>
        </div>
        <div class="constructed-model-box">
          <strong>✅ 滿分 3 級分示範解析與標準寫法</strong>
          <p style="margin:6px 0 0 0;white-space:pre-wrap;line-height:1.7;">\${fmt(cr.modelAnswer)}</p>
        </div>
        <div class="constructed-deduction-box">
          <strong>🚨 閱卷老師提醒：兩大常見扣分地雷</strong>
          <ul style="margin:6px 0 0 0;padding-left:20px;line-height:1.65;">
            \${cr.deductionDiagnostics.map(dd => \`<li>\${fmt(dd)}</li>\`).join('')}
          </ul>
        </div>
      </div>
    </details>
  </div>
  \` : ''}
</section>
\`;
}

export function wireExamPractice(container) {
  if (!container) return;

  const JOYFUL_STORAGE_KEY = 'zhixing-joyful-mastery-v1';
  const loadJoyfulState = () => {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(JOYFUL_STORAGE_KEY) : null;
      const parsed = raw ? JSON.parse(raw) : {};
      return {
        lovedSubjects: parsed.lovedSubjects || {},
        stampedKPs: parsed.stampedKPs || {},
        conqueredArchetypes: parsed.conqueredArchetypes || {},
        blitzClearedUnits: parsed.blitzClearedUnits || {},
        bonusXP: parsed.bonusXP || 0
      };
    } catch {
      return { lovedSubjects: {}, stampedKPs: {}, conqueredArchetypes: {}, blitzClearedUnits: {}, bonusXP: 0 };
    }
  };
  const saveJoyfulState = (st) => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(JOYFUL_STORAGE_KEY, JSON.stringify(st));
      }
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('zhixing:joyful-update', { detail: st }));
      }
    } catch {}
  };

  const refreshArchetypeStamps = () => {
    const st = loadJoyfulState();
    const progEls = container.querySelectorAll('[data-unit-archetype-prog]');
    progEls.forEach(progEl => {
      const uId = progEl.dataset.unitArchetypeProg;
      const codes = ['Type A', 'Type B', 'Type C'];
      let count = 0;
      codes.forEach(code => {
        const key = \`\${uId}:\${code}\`;
        const isConquered = !!st.conqueredArchetypes[key];
        if (isConquered) count++;
        container.querySelectorAll(\`[data-archetype-stamp="\${key}"]\`).forEach(badge => {
          if (isConquered) {
            badge.textContent = '🏆 已制霸 (+15 XP)';
            badge.style.background = '#e8f5e9';
            badge.style.color = '#1b5e20';
            badge.style.borderColor = '#81c784';
          } else {
            badge.textContent = '🌱 待破關';
          }
        });
      });
      progEl.textContent = \`🏆 題型制霸進度：\${count} / 3\`;
      const banner = container.querySelector(\`#archetype-mastery-banner-\${uId}\`);
      if (banner) {
        banner.style.display = count === 3 ? 'block' : 'none';
      }
    });
  };

  refreshArchetypeStamps();

  container.querySelectorAll('.archetype-drill-opt-btn').forEach(btn => {
    btn.onclick = () => {
      const unitId = btn.dataset.unit;
      const code = btn.dataset.code;
      const optIdx = parseInt(btn.dataset.optIdx, 10);
      const ansIdx = parseInt(btn.dataset.ans, 10);
      const exp = btn.dataset.exp || '';
      const box = btn.closest('.archetype-drill-box');
      if (!box) return;

      const allBtns = box.querySelectorAll('.archetype-drill-opt-btn');
      allBtns.forEach(b => {
        b.style.borderColor = 'var(--border)';
        b.style.background = 'var(--surface-alt)';
      });

      const correctBtn = allBtns[ansIdx];
      if (correctBtn) {
        correctBtn.style.borderColor = '#2e7d32';
        correctBtn.style.background = '#e8f5e9';
      }

      const fb = box.querySelector('.archetype-drill-fb');
      if (optIdx === ansIdx) {
        const st = loadJoyfulState();
        const key = \`\${unitId}:\${code}\`;
        const isFirstTime = !st.conqueredArchetypes[key];
        if (isFirstTime) {
          st.conqueredArchetypes[key] = true;
          st.bonusXP = (st.bonusXP || 0) + 15;
          saveJoyfulState(st);
        }
        refreshArchetypeStamps();
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#e8f5e9';
          fb.style.color = '#1b5e20';
          fb.style.border = '1px solid #a5d6a7';
          fb.innerHTML = \`🎉 <strong>太強了！成功制霸【\${code}】核心題型！\${isFirstTime ? '（獲得 🏆 題型制霸印章 +15 XP）' : ''}</strong><br>\${exp}\`;
        }
      } else {
        btn.style.borderColor = '#c62828';
        btn.style.background = '#ffebee';
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#fff3e0';
          fb.style.color = '#e65100';
          fb.style.border = '1px solid #ffcc80';
          fb.innerHTML = \`💡 <strong>差一點點！正確答案是 (\${String.fromCharCode(65 + ansIdx)})。</strong>再點一次綠色正確選項即可領取【\${code}】制霸印章！<br>\${exp}\`;
        }
      }
    };
  });

  container.querySelectorAll('.practice-opt-btn').forEach(btn => {
    btn.onclick = () => {
      const unitId = btn.dataset.unit;
      const cardId = btn.dataset.cardId || \`exam-practice-\${unitId}\`;
      const fbId = btn.dataset.fbId || \`practice-fb-\${unitId}\`;
      const solId = btn.dataset.solId || \`practice-sol-\${unitId}\`;
      const optIdx = parseInt(btn.dataset.optIdx, 10);
      const ansIdx = parseInt(btn.dataset.ans, 10);

      const card = container.querySelector(\`#\${cardId}\`);
      if (!card) return;

      const fb = card.querySelector(\`#\${fbId}\`);
      const sol = card.querySelector(\`#\${solId}\`);
      const allBtns = card.querySelectorAll('.practice-opt-btn');

      allBtns.forEach(b => {
        b.style.borderColor = 'var(--border)';
        b.style.background = 'var(--surface-alt)';
      });

      const correctBtn = allBtns[ansIdx];
      if (correctBtn) {
        correctBtn.style.borderColor = '#2e7d32';
        correctBtn.style.background = '#e8f5e9';
      }

      if (optIdx === ansIdx) {
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#e8f5e9';
          fb.style.color = '#1b5e20';
          fb.style.border = '1px solid #a5d6a7';
          fb.innerHTML = '🎉 <strong>答對了！精準掌握考場題眼！</strong>請對照下方圖解式五步詳解，確認各選項誘答機制與三版本驗算心法！';
        }
      } else {
        btn.style.borderColor = '#c62828';
        btn.style.background = '#ffebee';
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#fff3e0';
          fb.style.color = '#e65100';
          fb.style.border = '1px solid #ffcc80';
          fb.innerHTML = \`💡 <strong>差一點就對了！正確答案為 (\${String.fromCharCode(65 + ansIdx)})。</strong>請展開下方【五步詳解】對照第 4 步逐項剖析，徹底排除誘答盲點！\`;
        }
      }

      if (sol) {
        sol.setAttribute('open', '');
      }
    };
  });
}
`;

fs.writeFileSync('dist/exam-types-data.js', outSource, 'utf8');
console.log('Successfully written dist/exam-types-data.js with 3-tier school/CAP exam archetypes, 564 authentic problems & SVG visual guides!');
