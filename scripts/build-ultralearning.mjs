// scripts/build-ultralearning.mjs
// Generates dist/ultralearning-data.js covering all 188 108-Curriculum units & 21 subjects
// Synthesizes insights from Scott H. Young's "Ultralearning" & "Get Better at Anything"
// with a complete Junior High -> CAP 5A++ -> GSAT 頂頂標 (14-15 級分) Vertical Mastery Bridge.

import fs from 'node:fs';
import { subjects, units, subjectById } from '../dist/curriculum.js';
import { teachingFor } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';
import { exegesisData } from '../dist/exegesis-data.js';

const gsatDb = JSON.parse(fs.readFileSync('dist/gsat-database.json', 'utf8'));
const validGsatExamIds = new Set(gsatDb.exams.map(e => e.exam_id));

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededShuffle(arr, seedStr) {
  const out = [...arr];
  let s = hashStr(seedStr);
  for (let i = out.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function cleanText(s) {
  return String(s || '').replace(/\s+/g, ' ').trim();
}

function firstSentence(s) {
  const t = cleanText(s);
  const idx = t.indexOf('。');
  return idx > 0 ? t.slice(0, idx + 1) : t;
}

// Subject -> GSAT Vertical Mapping
const SUBJECT_TO_GSAT = {
  math: {
    code: 'math_a',
    name: '學測數學A / 數學B',
    tier: 'core',
    examId: '115-math_a',
    examLabel: '115 學測 數學A',
    altExamId: '115-math_b',
    altExamLabel: '115 學測 數學B',
    evolutionMap: [
      [/正負|絕對值|因數|分數|科學記號/, '銜接高中「實數與指對數、絕對值不等式與科學數量級估算」，為學測數A/數B 第一題群穩拿滿分基石。'],
      [/方程式|不等式|比例|正比|反比/, '升維至高中「多項式函數、線性規劃、聯立方程矩陣消去法與參數條件討論」，學測多選題與混合題超高頻必考。'],
      [/坐標|統計|機率|資料/, '直接演進為高中「數據分析（標準差、迴歸直線）、條件機率與期望值」，學測數A/數B 幾乎年年壓軸必出。'],
      [/乘法公式|多項式|因式分解|平方根|畢氏/, '擴展為高中「多項式除法原理、餘式定理、根與係數關係與三角比幾何距離」，是代數流暢度（Automaticity）的核心引擎。'],
      [/數列|一次函數/, '延伸為高中「等比數列、遞迴關係、數學歸納法與斜率直線方程式」，學測情境建模題必備工具。'],
      [/全等|平行|四邊形|相似|圓|切線/, '升級為高中「三角函數（正餘弦定理）、平面向量、圓與直線方程式」，是學測數A 頂標拉開差距的關鍵戰場。'],
      [/二次函數|極值/, '直通高中「三次函數圖形特徵、配方法極值與微積分斜率極值直覺」，學測多選與選填題必考核心。']
    ],
    defaultEvolution: '直接奠定高中數學抽象建模、代數運算自動化與幾何圖形轉譯基礎，決定學測數A/數B 能否突破頂標。',
    topTierTactic: '運用「多表徵切換（代數式 ⇄ 圖形 ⇄ 數值特例）」與「無標題交錯盲測」，練到一眼辨識題型模型並在 90 秒內寫出關鍵式。'
  },
  chinese: {
    code: 'chinese_comp',
    name: '學測國綜 & 國寫',
    tier: 'core',
    examId: '115-chinese_comp',
    examLabel: '115 學測 國綜',
    altExamId: '115-writing',
    altExamLabel: '115 學測 國寫',
    evolutionMap: [
      [/文言|虛字|古文|韻文|詩詞/, '直通學測「15 篇核心古文與課外文言對讀」，精準判讀主詞省略、實虛詞多義與作者立場轉折。'],
      [/說明|圖表|論證|議論文|媒體/, '直通學測國綜「長篇跨文本資訊整合」與國寫第一題「知性統整判斷」，鍛鍊證據鏈與立場權衡。'],
      [/敘事|小說|人物|修辭|語境/, '直通學測國綜「文學賞析雙文對讀」與國寫第二題「情意感受抒發」，將細節觀察轉化為高分敘事張力。']
    ],
    defaultEvolution: '升級為學測國綜「長篇跨文本對讀、古今文互證」與國寫「知性思辨＋情意敘寫」雙軸頂標核心能力。',
    topTierTactic: '實踐「證據鎖定法（Every inference must cite a textual anchor）」與「國寫雙向度臨摹➔補全➔原創（Copy-Complete-Create）」。'
  },
  english: {
    code: 'english',
    name: '學測英文',
    tier: 'core',
    examId: '115-english',
    examLabel: '115 學測 英文',
    evolutionMap: [
      [/句型|現在式|過去|未來|完成式|時態/, '升級為學測英文「綜合測驗時態一致性、分詞構句與中譯英零文法失誤」的自動化神經迴路。'],
      [/子句|關係|被動|假設|連接/, '直通學測「長難句拆解（閱讀測驗/篇章結構）」與「高分英文作文複雜句型運用」，是衝刺 14–15 級分分水嶺。'],
      [/閱讀|字彙|推論|聽力|對話/, '擴展為學測 4,500–7,000 字彙語境推敲、文意選填詞性鎖定與混合題摘要寫作核心實力。']
    ],
    defaultEvolution: '直接累積至學測英文「長篇閱讀推論、篇章結構邏輯、中譯英與 18 分以上頂標英文作文」的核心語感。',
    topTierTactic: '以「直接浸泡閱讀（Directness）＋語境句構盲測」取代死背單字表，每週寫 1 段仿寫並即時核對時態與主詞動詞一致。'
  },
  physics: {
    code: 'science',
    name: '學測自然（物理）',
    tier: 'core',
    examId: '115-science',
    examLabel: '115 學測 自然',
    evolutionMap: [
      [/運動|速度|加速度|力|牛頓|功|能/, '直通學測自然「力學圖表分析（v-t / F-t / 位能動能轉換）與實驗誤差探究」，為學測物理必考大題。'],
      [/電|磁|電流|歐姆|電功率/, '銜接高中「電與磁統一、電磁感應與生活能源轉換」，學測自然跨科混合題最愛命題核心。'],
      [/光|波|聲|熱/, '銜接高中「波動干涉、光電效應量子現象與熱力學能量守恆」，重視圖形判讀與量綱檢核。']
    ],
    defaultEvolution: '奠定高中物理「模型抽象、圖表斜率面積意義與實驗探究實作」核心底蘊，直取學測自然 15 級分。',
    topTierTactic: '永遠先畫「受力/能量/光路圖」再列式，並用「極端值代入法（如質量趨近 0 或無窮大）」驗證直覺（Ultralearning P8）。'
  },
  chemistry: {
    code: 'science',
    name: '學測自然（化學）',
    tier: 'core',
    examId: '115-science',
    examLabel: '115 學測 自然',
    evolutionMap: [
      [/原子|分子|元素|週期表|粒子/, '直通高中「電子組態、週期性趨勢與化學鍵結構」，讓所有物質性質都能從微觀結構推導而非死背。'],
      [/莫耳|反應|化學計量|質量守恆/, '直通學測自然「限量試劑計量、濃度換算與綠色化學產率分析」，考場精準計算的必拿分區。'],
      [/酸鹼|電解質|氧化還原|有機/, '直接升維為高中「pH 滴定曲線、氧化數電化學電池與有機官能基反應」，學測自然混合題超高頻題組。']
    ],
    defaultEvolution: '貫通高中化學「巨觀現象 ⇄ 微觀粒子 ⇄ 化學符號」三重表徵，是學測自然探究與實作題組致勝關鍵。',
    topTierTactic: '強制落實「微觀粒子圖像化＋反應前後原子與電荷守恆驗算」，拒絕背誦無理解的反應口訣。'
  },
  biology: {
    code: 'science',
    name: '學測自然（生物）',
    tier: 'core',
    examId: '115-science',
    examLabel: '115 學測 自然',
    evolutionMap: [
      [/細胞|酵素|代謝|光合|呼吸/, '直通高中「細胞胞器協作、ATP 能量流動與酵素活性實驗數據判讀」，學測自然年年必考。'],
      [/遺傳|DNA|染色體|生殖|演化/, '直通學測自然「分子遺傳中心法則、孟德爾機率與天擇演化證據鏈」，是頂標關鍵推理區。'],
      [/神經|內分泌|恆定|循環|免疫|生態/, '銜接高中「免疫防線、生理回饋調控與碳氮循環生態系變遷」，最常以跨科素養題組呈現。']
    ],
    defaultEvolution: '建立高中生物「結構決定功能、因果調控鏈與對照組實驗設計」核心思維，穩拿學測自然高分。',
    topTierTactic: '用「空白紙因果流程圖自由回想（Free Recall）」重繪生理調控或實驗變因控制，一眼抓出對照組漏洞。'
  },
  earth: {
    code: 'science',
    name: '學測自然（地球科學）',
    tier: 'core',
    examId: '115-science',
    examLabel: '115 學測 自然',
    evolutionMap: [
      [/板塊|地層|地震|岩石/, '直通學測地科「地質事件先後定年、震波時距與板塊隱沒帶災害分析」，圖表判讀投資報酬率最高。'],
      [/天氣|大氣|氣候|洋流|水循環/, '直通學測地科「等壓線風向判讀、聖嬰現象與全球氣候變遷跨科題組」，極度重視空間與尺度感。'],
      [/天文|月相|日食|四季|宇宙/, '直通學測地科「天球視運動、星等光譜與宇宙膨脹」，透過空間建模徹底消除死背盲點。']
    ],
    defaultEvolution: '強化學測自然地科「跨尺度空間視覺化、多圖表疊合判讀與系統回饋推理」的穩定拿分優勢。',
    topTierTactic: '每題強制畫出「空間相對位置簡圖（俯視／側視）」或「地質時間軸」，把抽象文字轉為秒殺幾何直覺。'
  },
  history: {
    code: 'social',
    name: '學測社會（歷史）',
    tier: 'core',
    examId: '115-social',
    examLabel: '115 學測 社會',
    defaultEvolution: '升級為學測社會「長時段歷史變遷、多史料立場互證與跨科（史地公）混合論述題」頂標分析力。',
    topTierTactic: '以「時間軸 × 因果鏈 × 史料作者立場」三維表格進行交錯對比練習，絕不孤立背誦年代事件。'
  },
  geography: {
    code: 'social',
    name: '學測社會（地理）',
    tier: 'core',
    examId: '115-social',
    examLabel: '115 學測 社會',
    defaultEvolution: '直通學測社會「GIS 空間分析、氣候地形人地互動與全球化產業鏈圖表混合題」，穩拿社會頂標。',
    topTierTactic: '養成「先讀圖例、坐標軸、比例尺與經緯度，再看題幹」的專家級 PARI 讀圖反射動作。'
  },
  civics: {
    code: 'social',
    name: '學測社會（公民）',
    tier: 'core',
    examId: '115-social',
    examLabel: '115 學測 社會',
    defaultEvolution: '直通學測社會「憲政權力分立、法律位階權利救濟、經濟供需外部性與全球治理」核心思辨題組。',
    topTierTactic: '用真實新聞時事進行「概念遷移測試（Transfer Practice）」，對每個案例精準區分法律責任或供需曲線移動方向。'
  },
  computing: {
    code: 'math_a',
    name: '學測數A / 自然探究（運算思維）',
    tier: 'literacy',
    examId: '115-math_a',
    examLabel: '115 學測 數學A',
    defaultEvolution: '強化高中「演算法邏輯、遞迴拆解、資料結構與數位素養」，直接賦能學測數學建模與自然數據處理題。',
    topTierTactic: '把每個流程畫成「輸入 ➔ 條件判斷 ➔ 迴圈 ➔ 輸出」追蹤表（Trace Table），零失誤掌握邏輯推理題。'
  },
  technology: {
    code: 'science',
    name: '學測自然（探究實作與工程思維）',
    tier: 'literacy',
    examId: '115-science',
    examLabel: '115 學測 自然',
    defaultEvolution: '對應學測自然「科學探究與實作」之控制變因、機構力學與系統優化思維，提升跨領域實境解題力。',
    topTierTactic: '從「限制條件 ➔ 結構功能 ➔ 測試回饋迭代」分析真實工程情境，打通物理與生活應用的最後一哩路。'
  },
  visual: {
    code: 'writing',
    name: '學測國寫 / 國綜（美感與圖像詮釋）',
    tier: 'literacy',
    examId: '115-writing',
    examLabel: '115 學測 國寫',
    defaultEvolution: '培養學測國綜圖像符號判讀、社會文化美學與國寫情意題「細膩感官描寫」的差異化頂標亮點。',
    topTierTactic: '練習「形式觀察 ➔ 象徵脈絡 ➔ 觀點闡述」三步賞析，將視覺語言轉化為精準文字論述。'
  },
  music: {
    code: 'chinese_comp',
    name: '學測國綜 / 社會（藝術文化素養）',
    tier: 'literacy',
    examId: '115-chinese_comp',
    examLabel: '115 學測 國綜',
    defaultEvolution: '厚植跨文化藝術史脈絡與聲學結構理解，支援學測國綜、社會跨領域文化題組與國寫人文素材。',
    topTierTactic: '結合「聽覺特徵辨識＋歷史文化脈絡對照」，建立跨領域文化圖式記憶。'
  },
  performing: {
    code: 'writing',
    name: '學測國寫 / 國綜（敘事張力與共情）',
    tier: 'literacy',
    examId: '115-writing',
    examLabel: '115 學測 國寫',
    defaultEvolution: '強化敘事衝突結構、角色動機分析與公開表達自信，直接轉化為學測國綜戲劇小說分析與國寫敘事深度。',
    topTierTactic: '以「角色目標 ➔ 阻礙衝突 ➔ 轉折行動」拆解任何文本或生活故事，快速看懂敘事核心。'
  },
  health: {
    code: 'science',
    name: '學測自然 / 國寫（健康決策與科學實證）',
    tier: 'literacy',
    examId: '115-science',
    examLabel: '115 學測 自然',
    defaultEvolution: '連結學測自然生醫公衛題組與國寫知性議題評析，養成以實證資料評估健康風險的科學判斷力。',
    topTierTactic: '辨識「實證數據 vs 商業宣稱」，以因果機制與風險權衡框架剖析生活健康議題。'
  },
  pe: {
    code: 'science',
    name: '學測自然 / 自我調控（身心能量管理）',
    tier: 'literacy',
    examId: '115-science',
    examLabel: '115 學測 自然',
    defaultEvolution: '結合運動力學、心肺代謝與考前壓力調節（GBAA Ch.12），維持高強度備考期間的大腦專注與抗壓體能。',
    topTierTactic: '落實動作分解特訓（Drill）與節奏呼吸調控，將運動場上的專注儀式遷移到大考考場。'
  },
  home: {
    code: 'social',
    name: '學測社會 / 國寫（消費決策與永續生活）',
    tier: 'literacy',
    examId: '115-social',
    examLabel: '115 學測 社會',
    defaultEvolution: '銜接學測社會理財消費、資源永續與生活倫理素養題組，將日常決策轉化為公民經濟與國寫實例。',
    topTierTactic: '以「需求評估 ➔ 資源預算 ➔ 永續影響」決策表檢視生活選擇，強化情境題系統思考。'
  },
  scout: {
    code: 'social',
    name: '學測社會 / 自然（環境安全與系統規劃）',
    tier: 'literacy',
    examId: '115-social',
    examLabel: '115 學測 社會',
    defaultEvolution: '鍛鍊學測地理空間定位、防災氣候應變與團隊專案規劃素養，對應跨科環境永續題組。',
    topTierTactic: '在情境題中優先檢查「風險因子 ➔ 預備方案 ➔ 環境倫理邊界」，培養實務解決問題能力。'
  },
  guidance: {
    code: 'writing',
    name: '學測國寫 / 超學習後設認知（情緒與生涯）',
    tier: 'literacy',
    examId: '115-writing',
    examLabel: '115 學測 國寫',
    defaultEvolution: '強化超學習核心（專注抗拖延、情緒暴露調適、生涯目標規劃），並成為學測國寫情意反思與學習歷程的深度泉源。',
    topTierTactic: '結合「5 分鐘啟動法則（Ultralearning P2）」與「漸進暴露階梯（GBAA Ch.12）」，把焦慮轉化為可執行的微小行動。'
  },
  local: {
    code: 'social',
    name: '學測社會 / 國綜（多元文化與在地語言）',
    tier: 'literacy',
    examId: '115-social',
    examLabel: '115 學測 社會',
    defaultEvolution: '深化學測社會臺灣多元文化史觀與國綜語言變遷素養，理解語言背後的族群記憶與社會結構。',
    topTierTactic: '透過「語境對照＋文化脈絡聯結」記憶在地詞彙與文化意涵，避免斷章取義。'
  }
};

// Extract 4-6 clean recall keywords for Blank-Sheet Free Recall evaluation
const GENERIC_KW = new Set([
  '本課核心判準', '本課易錯防線', '本課核心概念', '核心概念', '核心判準',
  '易錯防線', '概念', '定義', '規則', '例子', '應用', '重點', '辨識'
]);
function extractKeywords(u, tableRows) {
  const raw = [];
  // From unit title segments
  u.title.split(/[、，,與及／\/\s・()（）]+/).forEach(tok => {
    const t = tok.trim();
    if (t.length >= 2 && t.length <= 10 && !GENERIC_KW.has(t)) raw.push(t);
  });
  // From teaching table row col[0] (the key concept labels!)
  for (const row of tableRows) {
    const head = cleanText(row[0]).replace(/[（(][^）)]*[）)]/g, '').trim();
    head.split(/[、，,與及／\/\s]+/).forEach(tok => {
      const t = tok.trim();
      if (t.length >= 2 && t.length <= 10 && !GENERIC_KW.has(t) && !t.startsWith('本課')) raw.push(t);
    });
  }
  // Supplement from concept core terms if fewer than 4 domain keywords
  if (raw.length < 4) {
    const matches = cleanText(u.concept).match(/[\u4e00-\u9fff]{2,5}/g) || [];
    for (const m of matches) {
      if (!GENERIC_KW.has(m) && !['可以', '通常', '代表', '表示', '就是', '所以', '因此', '一個', '兩個', '如果', '必須', '才能', '不會', '不能', '時候', '不是'].includes(m)) {
        raw.push(m);
      }
      if (new Set(raw).size >= 6) break;
    }
  }
  const unique = [...new Set(raw)].filter(k => k.length >= 2);
  return unique.slice(0, 6);
}

// Build unit-specific distractors from same-subject sibling units' step[1] or concept/pitfall
const unitsBySubject = {};
for (const u of units) {
  if (!unitsBySubject[u.subject]) unitsBySubject[u.subject] = [];
  unitsBySubject[u.subject].push(u);
}

function buildCompletionProblem(u, wc, siblings) {
  const step1 = cleanText(wc.steps[0]);
  const correctStep2 = cleanText(wc.steps[1]);
  const step3 = cleanText(wc.steps[2] || wc.check);

  const distractorPool = [];
  // 1. Misconception-derived distractor directly from this unit's pitfall (flipped into a tempting wrong action)
  const pitfallFirst = firstSentence(u.pitfall);
  if (pitfallFirst && pitfallFirst !== correctStep2) {
    distractorPool.push(`忽略邊界條件直接跳步：誤落入「${pitfallFirst.replace(/。$/, '')}」的常見迷思而直接套答案。`);
  }

  // 2. Sibling units' real step[1] (domain-authentic same-subject procedures that belong to a DIFFERENT concept!)
  const otherSiblings = siblings.filter(s => s.id !== u.id);
  const rotated = seededShuffle(otherSiblings, u.id + ':siblings');
  for (const sib of rotated) {
    const swc = workedCases[sib.id];
    if (swc && swc.steps && swc.steps[1]) {
      const cand = cleanText(swc.steps[1]);
      if (cand && cand !== correctStep2 && cand !== step1 && !distractorPool.includes(cand)) {
        distractorPool.push(cand);
      }
    }
    if (distractorPool.length >= 3) break;
  }

  // Fallback from other units in same domain if subject has < 4 units
  if (distractorPool.length < 3) {
    const dom = subjectById[u.subject].domain;
    const domUnits = seededShuffle(units.filter(x => x.id !== u.id && subjectById[x.subject].domain === dom), u.id + ':dom');
    for (const du of domUnits) {
      const dwc = workedCases[du.id];
      if (dwc && dwc.steps && dwc.steps[1]) {
        const cand = cleanText(dwc.steps[1]);
        if (cand && cand !== correctStep2 && !distractorPool.includes(cand)) {
          distractorPool.push(cand);
        }
      }
      if (distractorPool.length >= 3) break;
    }
  }

  const chosenDistractors = distractorPool.slice(0, 3);
  const indexedOptions = [
    { text: correctStep2, isCorrect: true },
    ...chosenDistractors.map(text => ({ text, isCorrect: false }))
  ];
  const shuffled = seededShuffle(indexedOptions, u.id + ':completion');
  const answer = shuffled.findIndex(o => o.isCorrect);

  return {
    problem: cleanText(wc.problem),
    givenStep1: step1,
    givenStep3: step3,
    options: shuffled.map(o => o.text),
    answer,
    explanation: `【Copy ➔ Complete ➔ Create 補全解析】第 1 步確立已知與目標後，核心關鍵橋梁正是「${correctStep2}」，接著才能嚴謹推進至第 3 步並通過防呆檢核：${cleanText(wc.check)}`
  };
}

function resolveSeniorEvolution(u, cfg) {
  if (cfg.evolutionMap) {
    for (const [regex, text] of cfg.evolutionMap) {
      if (regex.test(u.title + ' ' + u.concept)) return text;
    }
  }
  return cfg.defaultEvolution;
}

const unitUltraData = {};
for (const u of units) {
  const s = subjectById[u.subject];
  const table = teachingFor(u);
  const wc = workedCases[u.id];
  const ex = exegesisData[u.id];
  const gsatCfg = SUBJECT_TO_GSAT[u.subject];

  if (!validGsatExamIds.has(gsatCfg.examId)) {
    throw new Error(`Invalid GSAT examId ${gsatCfg.examId} for subject ${u.subject}`);
  }

  const concepts = [
    firstSentence(u.concept),
    ...table.rows.slice(0, 2).map(r => `${cleanText(r[0])}：${cleanText(r[1])}`)
  ];
  const facts = table.rows.slice(0, 3).map(r => `${cleanText(r[0])} ➔ ${cleanText(r[2])}`);
  const procedures = wc.steps.slice(0, 3).map(cleanText);
  const recallKeywords = extractKeywords(u, table.rows);

  const precursor = ex?.examEye?.triggerClue
    ? cleanText(ex.examEye.triggerClue)
    : `當題幹出現「${u.title}」或「${table.rows.map(r => r[0]).slice(0, 2).join('、')}」線索時，立即啟動本單元模型。`;

  const pari = {
    precursor,
    action: `${cleanText(wc.steps[0])} 接著執行核心推導：${cleanText(wc.steps[1])}`,
    result: cleanText(wc.steps[2] || wc.check),
    interpretation: `${cleanText(wc.check)}（避坑雷達：${firstSentence(u.pitfall)}）`
  };

  const completionProblem = buildCompletionProblem(u, wc, unitsBySubject[u.subject]);

  unitUltraData[u.id] = {
    unitId: u.id,
    subject: u.subject,
    metalearning: {
      why: `掌握「${u.title}」不僅是${s.name}（${u.grade}年級${u.term === 1 ? '上' : '下'}）必考基石，更是進階銜接【${gsatCfg.name}】頂標推理的關鍵先備模組。`,
      concepts,
      facts,
      procedures,
      recallKeywords
    },
    pari,
    completionProblem,
    gsatBridge: {
      gsatSubjectCode: gsatCfg.code,
      gsatSubjectName: gsatCfg.name,
      tier: gsatCfg.tier,
      seniorEvolution: resolveSeniorEvolution(u, gsatCfg),
      topTierTactic: gsatCfg.topTierTactic,
      recommendedGsatExamId: gsatCfg.examId,
      recommendedGsatLabel: gsatCfg.examLabel
    }
  };
}

// Comprehensive 7-Subject GSAT 頂頂標 (Top 12% -> 14-15 級分) Vertical Blueprint
const gsatTopTierBlueprint = [
  {
    code: 'chinese_comp',
    name: '學測國綜',
    target: '頂標 13 級 ➔ 頂頂標 14–15 級',
    jhSubjects: ['chinese', 'history', 'performing', 'music'],
    coreSkills: ['15 篇核心古文與課外文言對讀', '長篇跨文本資訊整合與論證辨析', '語境實虛詞精準鎖定'],
    ultraProtocol: '【直接實戰＋問題本】每讀完一篇古文或長文，闔上講義用白紙寫出「作者主張＋轉折點＋2 個文本證據」，並將易混虛詞做成自測問題本。',
    overkillExams: ['115-chinese_comp', '114-chinese_comp', '113-chinese_comp']
  },
  {
    code: 'writing',
    name: '學測國寫',
    target: '雙題皆達 A / A+（36+ 分）',
    jhSubjects: ['chinese', 'visual', 'guidance', 'performing'],
    coreSkills: ['知性題：精準摘錄立場、提出正反權衡與具體論據', '情意題：具體感官細節＋轉折頓悟＋真摯反思'],
    ultraProtocol: '【臨摹➔補全➔原創 (GBAA Ch.2)】拆解大考中心佳作結構 ➔ 遮住轉折段自行補全 ➔ 50 分鐘限時原創＋四向度校正。',
    overkillExams: ['115-writing', '114-writing', '113-writing']
  },
  {
    code: 'english',
    name: '學測英文',
    target: '頂標 13 級 ➔ 頂頂標 14–15 級',
    jhSubjects: ['english'],
    coreSkills: ['長難句結構秒解（子句/分詞/倒裝）', '文意選填與篇章結構邏輯鎖定', '中譯英零文法錯誤＋18+ 分高階英文寫作'],
    ultraProtocol: '【直接浸泡＋自動化量變 (GBAA Ch.8)】國中五大句型與時態練到零思考反射，再直接跨入 111–115 學測真題閱讀與翻譯精修。',
    overkillExams: ['115-english', '114-english', '113-english']
  },
  {
    code: 'math_a',
    name: '學測數學A',
    target: '頂標 11–12 級 ➔ 頂頂標 14–15 級',
    jhSubjects: ['math', 'computing'],
    coreSkills: ['代數／幾何／函數多表徵自由轉換', '多選題反例構造與極端值檢核', '混合題非選嚴謹推論表達'],
    ultraProtocol: '【85% 甜蜜點＋交錯盲測＋掙扎計時器】關掉章節標題做跨單元混考；遇壓軸題開啟 5 分鐘掙扎計時器，絕不秒看詳解！',
    overkillExams: ['115-math_a', '114-math_a', '113-math_a']
  },
  {
    code: 'math_b',
    name: '學測數學B',
    target: '頂標 12 級 ➔ 頂頂標 14–15 級',
    jhSubjects: ['math'],
    coreSkills: ['生活情境數學建模（比例、週期、利率、經緯度）', '統計數據判讀與機率期望值', '空間透視與幾何直覺'],
    ultraProtocol: '【情境轉譯特訓 (Direct-Then-Drill)】專練把 200 字生活題幹在 30 秒內抽象為數學公式，並用日常合理性反向驗算。',
    overkillExams: ['115-math_b', '114-math_b', '113-math_b']
  },
  {
    code: 'science',
    name: '學測自然',
    target: '頂標 13 級 ➔ 頂頂標 14–15 級',
    jhSubjects: ['physics', 'chemistry', 'biology', 'earth', 'technology', 'health'],
    coreSkills: ['跨科（物化生地）圖表數據與實驗變因探究', '守恆律與微觀粒子因果推導', '非選簡答精準關鍵詞作答'],
    ultraProtocol: '【PARI 專家讀圖法＋變異練習 (GBAA Ch.4 & Ch.7)】每見實驗題必先鎖定「操縱/應變/控制變因」，混合四科輪流演練消除單科慣性。',
    overkillExams: ['115-science', '114-science', '113-science']
  },
  {
    code: 'social',
    name: '學測社會',
    target: '頂標 13 級 ➔ 頂頂標 14–15 級',
    jhSubjects: ['history', 'geography', 'civics', 'home', 'scout', 'local'],
    coreSkills: ['史地公三科跨領域混合題組解讀', '地圖／統計圖／史料立場交叉驗證', '公民法律與經濟供需精準判準'],
    ultraProtocol: '【信心校準＋跨科交錯特訓 (GBAA Ch.9)】答題前先標註信心度，優先針對「高信心卻答錯」的混淆概念進行反轉重學（Unlearning）。',
    overkillExams: ['115-social', '114-social', '113-social']
  }
];

// Verify all overkillExams exist in gsat-database.json
for (const b of gsatTopTierBlueprint) {
  for (const eid of b.overkillExams) {
    if (!validGsatExamIds.has(eid)) {
      throw new Error(`Invalid overkillExam ${eid} in GSAT blueprint ${b.code}`);
    }
  }
}

const outContent = `// Auto-generated by scripts/build-ultralearning.mjs
// Synthesizes Scott H. Young's "Ultralearning" (9 Principles) & "Get Better at Anything" (See · Do · Feedback, 12 Maxims)
// across all 188 Junior High 108-Curriculum units -> CAP 5A++ -> GSAT 頂頂標 (14-15 級分).

export const gsatTopTierBlueprint = ${JSON.stringify(gsatTopTierBlueprint, null, 2)};

export const unitUltraData = ${JSON.stringify(unitUltraData, null, 2)};
`;

fs.writeFileSync('dist/ultralearning-data.js', outContent, 'utf8');
console.log(`✔ Generated dist/ultralearning-data.js for ${Object.keys(unitUltraData).length} units & ${gsatTopTierBlueprint.length} GSAT subjects (${(outContent.length / 1024).toFixed(1)} KB).`);
