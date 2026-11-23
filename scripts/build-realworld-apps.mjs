// scripts/build-realworld-apps.mjs
// Generates dist/realworld-apps-data.js covering 100% of all 188 units & 21 subjects
// Focused on the 4-Pillar Goal: 學會 (Plain Intuition) · 學好 (Rigorous Check) · 有興趣 (Real-World Spark) · 會應用 (Decision Transfer & Mini-Project)

import fs from 'node:fs';
import { subjects, units, subjectById } from '../dist/curriculum.js';
import { teachingFor } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';

const clean = s => String(s || '').replace(/\s+/g, ' ').trim();
const firstSent = s => {
  const t = clean(s);
  const idx = t.indexOf('。');
  return idx > 0 ? t.slice(0, idx + 1) : t;
};

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const LIFE_THEMES = [
  { id: 'money', icon: '💰', label: '消費理財與決策', desc: '省錢比價、預算規劃、風險機率與市場供需判斷' },
  { id: 'tech', icon: '🎮', label: '科技、數據與工程', desc: '演算法、幾何設計、電路光學與AI數據識讀' },
  { id: 'health', icon: '🏥', label: '身體奧秘與健康生活', desc: '營養標示、生理反射、運動體適能與化學食安' },
  { id: 'nature', icon: '🌦️', label: '自然探索與永續旅行', desc: '氣象預報、天文潮汐、地理地形與無痕生態' },
  { id: 'society', icon: '💬', label: '媒體公民與人際權益', desc: '新聞查核、法治防身、歷史脈絡與公共參與' },
  { id: 'culture', icon: '🎨', label: '溝通表達與創意文化', desc: '說服寫作、英語跨國溝通、美感構圖與多元文化' }
];

function classifyTheme(u) {
  const text = `${u.title} ${u.concept} ${u.example}`;
  if (['home', 'civics'].includes(u.subject) && /消費|預算|機會成本|市場|貿易|比較利益|家務|資源/.test(text)) return 'money';
  if (u.subject === 'math' && /方程式|不等式|比例|正比|反比|二次函數|數列|級數|統計|機率|盒狀圖|正負數/.test(text)) return 'money';
  if (['computing', 'technology'].includes(u.subject)) return 'tech';
  if (u.subject === 'math') return 'tech';
  if (['physics', 'chemistry'].includes(u.subject)) {
    if (/食物|酸鹼|營養|胃|呼吸|清潔|有機|聚合物|溫室|安全/.test(text)) return 'health';
    return 'tech';
  }
  if (['biology', 'health', 'pe'].includes(u.subject)) return 'health';
  if (['earth', 'scout'].includes(u.subject)) return 'nature';
  if (u.subject === 'geography') return /產業|人口|都市|交通|貿易/.test(text) ? 'society' : 'nature';
  if (['history', 'civics', 'guidance'].includes(u.subject)) return 'society';
  if (u.subject === 'home') return /飲食|營養|衣物/.test(text) ? 'health' : 'money';
  return 'culture'; // chinese, english, visual, music, performing, local
}

const SUBJECT_CAREERS = {
  math: ['數據科學家', 'AI 演算法工程師', '精算師與財務分析師'],
  chinese: ['內容策略與企劃總監', '新聞記者與作家', '法律論述與公共溝通專家'],
  english: ['跨國產品經理', '國際外交與口譯員', '全球科技工程師'],
  physics: ['半導體與光電工程師', '航太與自動駕駛工程師', '建築結構與聲學設計師'],
  chemistry: ['生醫藥師與材料科學家', '食品研發與檢驗師', '綠能電池與環境工程師'],
  biology: ['醫師與臨床研究員', '生物科技基因工程師', '生態保育與野生動物學家'],
  earth: ['氣象預報與防災專家', '地質探勘與地震研究員', '天文觀測與衛星遙測工程師'],
  history: ['策展人與文化遺產顧問', '國際關係與政策分析師', '歷史影視與遊戲世界觀編劇'],
  geography: ['都市規劃與 GIS 空間分析師', '供應鏈與國際物流策略師', '永續觀光與氣候風險顧問'],
  civics: ['律師與檢察官', '經濟政策與消保顧問', '社會企業與地方創生推動者'],
  visual: ['UI/UX 互動設計師', '建築與視覺品牌總監', '電影美術與動畫指導'],
  music: ['音樂製作人與配樂師', '聲學與遊戲音效設計師', '藝文展演策劃人'],
  performing: ['導演與劇本創作人', '舞台燈光音響技術指導', '簡報教練與公眾表達顧問'],
  computing: ['軟體與 AI 系統工程師', '資安防護專家', '資料視覺化工程師'],
  technology: ['工業設計與機構工程師', '智慧製造與機器人開發者', '永續產品設計師'],
  health: ['營養師與公共衛生專家', '心理諮商與健康管理師', '醫學科普編輯'],
  pe: ['運動防護與物理治療師', '職業運動數據分析師', '體適能訓練教練'],
  home: ['理財與生活管理顧問', '永續時尚與紡織品設計師', '餐飲研發與食安管理師'],
  scout: ['戶外安全與山域嚮導', '環境教育與防災規劃師', '專案管理與團隊領隊'],
  guidance: ['職涯發展與學習教練', '組織心理與人才發展師', '教育科技體驗設計師'],
  local: ['母語文化策展與媒體人', '專業手語翻譯與無障礙顧問', '語言田野紀錄與創作者']
};

const realWorldAppsData = {};

const unitsBySubj = {};
for (const u of units) {
  if (!unitsBySubj[u.subject]) unitsBySubj[u.subject] = [];
  unitsBySubj[u.subject].push(u);
}

for (const u of units) {
  const s = subjectById[u.subject];
  const table = teachingFor(u);
  const wc = workedCases[u.id] || { problem: u.example, steps: [u.concept], check: u.pitfall };
  const r0 = table.rows[0] || ['核心觀念', u.concept, u.example];
  const r1 = table.rows[1] || ['判準檢核', u.concept, u.example];
  const siblings = (unitsBySubj[u.subject] || units).filter(x => x.id !== u.id);
  const sib = siblings[hashStr(u.id) % siblings.length] || units[0];
  const sibTable = teachingFor(sib);
  const sibR0 = sibTable.rows[0] || ['相近判準', sib.concept, sib.example];
  const themeId = classifyTheme(u);
  const careers = SUBJECT_CAREERS[u.subject] || ['跨領域問題解決專家', '創新專案企劃', '教育研究者'];

  const coreLine = firstSent(u.concept);
  const exLine = firstSent(u.example);
  const pitLine = firstSent(u.pitfall);

  // 1. Plain-language intuition (學會)
  const plainIntuition = `用最白話來說，「${u.title}」的核心精神就是：${coreLine} 把它想成生活中的「${clean(r0[0])}」工具——例如「${exLine.replace(/。$/, '')}」，先看懂這個具體畫面，公式與名詞自然就記住了！`;

  // 2. Real-World Interactive Decision Challenge (會應用 — realistic tempting everyday options!)
  const scene = `你在真實生活中遇到一個需要運用「${u.title}」的任務：${clean(u.task)}（參考情境：${clean(wc.problem)}）`;
  const correctOpt = `先依「${clean(r0[0])}（${clean(r0[1])}）」建立依據，執行後再用「${clean(wc.check)}」檢核結果`;
  const wrongOpt1 = `優先套用「${clean(sibR0[0])}（${clean(sibR0[1])}）」作為主要依據，不需額外對照本課限制條件`;
  const wrongOpt2 = `直接以直覺估算結果，並將「${clean(r1[0])}」與「${clean(r0[0])}」視為相同規則交替使用`;

  const optItems = [
    { text: correctOpt, ok: true },
    { text: wrongOpt1, ok: false },
    { text: wrongOpt2, ok: false }
  ];
  // Deterministic 3-way permutation
  const rot = hashStr(u.id + ':apply') % 3;
  const ordered = [optItems[rot], optItems[(rot + 1) % 3], optItems[(rot + 2) % 3]];
  const answer = ordered.findIndex(x => x.ok);

  const outcome = `🌍 學以致用成功！在真實生活與考場裡，把「${clean(r0[0])}」落實成可檢核的步驟（${clean(wc.check)}），就能精準避開「${pitLine.replace(/。$/, '')}」的現實代價，讓課本知識真正成為你的決策武器！`;

  // 3. 10-Minute Hands-On Mini Action Mission
  const actionMission = `${clean(u.task)} 完成後，用 1 句話向家人或自己說明：「這個做法如何避開『${pitLine.replace(/。$/, '')}』？」`;

  realWorldAppsData[u.id] = {
    unitId: u.id,
    subject: u.subject,
    themeId,
    plainIntuition,
    decisionChallenge: {
      scene,
      question: `面對這個真實生活任務，哪一種應用策略最專業、最不容易踩坑？`,
      options: ordered.map(o => o.text),
      answer,
      outcome
    },
    actionMission,
    careers
  };
}

const output = `// Auto-generated by scripts/build-realworld-apps.mjs
// 4-Pillar Curriculum Application Dataset (學會 · 學好 · 有興趣 · 會應用) across all 188 units & 21 subjects.

export const LIFE_THEMES = ${JSON.stringify(LIFE_THEMES, null, 2)};

export const realWorldAppsData = ${JSON.stringify(realWorldAppsData, null, 2)};
`;

fs.writeFileSync('dist/realworld-apps-data.js', output, 'utf8');
console.log(`✔ Generated dist/realworld-apps-data.js for ${Object.keys(realWorldAppsData).length} units across ${LIFE_THEMES.length} real-life themes (${(output.length / 1024).toFixed(1)} KB).`);
