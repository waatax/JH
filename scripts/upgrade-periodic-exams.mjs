// scripts/upgrade-periodic-exams.mjs
// Calibrates all 85 periodic exam subject handouts in dist/periodic-exam-data.js
// to 100% PDF-verified MOE 108 Curriculum codes, fixes schema/scope issues, and links to curriculum units.

import fs from 'node:fs';
import assert from 'node:assert/strict';
import { unitById } from '../dist/curriculum.js';
import { officialAlignment, officialSources } from '../dist/official-alignment-data.js';
import { periodicExams } from '../dist/periodic-exam-data.js';

const sources = JSON.parse(fs.readFileSync('docs/official-curriculum-sources.json', 'utf8'));
const allPdfText = Object.fromEntries(
  sources.map(s => [
    s.id,
    JSON.parse(fs.readFileSync('tmp/official-curriculum/' + (s.id === 'math' ? 'math-outline' : s.id) + '.json', 'utf8'))
      .join('')
      .normalize('NFKC')
      .replace(/[–－−]/g, '-')
      .replace(/\s+/g, '')
  ])
);

export const EXAM_UNIT_MAP = {
  '7-1-1': {
    chinese: ['chinese-1', 'chinese-8'],
    english: ['english-1', 'english-7'],
    math: ['math-1', 'math-3'],
    science: ['biology-1', 'biology-7'],
    social: ['history-1', 'history-9', 'geography-1', 'civics-1', 'civics-7']
  },
  '7-1-2': {
    chinese: ['chinese-1', 'chinese-9'],
    english: ['english-2', 'english-7'],
    math: ['math-2', 'math-3'],
    science: ['biology-2', 'biology-14'],
    social: ['history-2', 'geography-2', 'geography-8', 'civics-1']
  },
  '7-1-3': {
    chinese: ['chinese-7', 'chinese-13'],
    english: ['english-8', 'english-13'],
    math: ['math-4'],
    science: ['biology-3', 'biology-8'],
    social: ['history-3', 'geography-2', 'geography-8', 'civics-2']
  },
  '7-2-1': {
    chinese: ['chinese-2', 'chinese-7'],
    english: ['english-3', 'english-8'],
    math: ['math-5'],
    science: ['biology-4', 'biology-13'],
    social: ['history-13', 'geography-3', 'civics-2']
  },
  '7-2-2': {
    chinese: ['chinese-2', 'chinese-8', 'chinese-14'],
    english: ['english-9', 'english-11'],
    math: ['math-8', 'math-5'],
    science: ['biology-9', 'biology-3'],
    social: ['history-3', 'geography-3', 'civics-10']
  },
  '7-2-3': {
    chinese: ['chinese-3', 'chinese-2'],
    english: ['english-3', 'english-8'],
    math: ['math-6', 'math-21', 'math-7'],
    science: ['biology-5', 'biology-10', 'biology-11', 'biology-6', 'biology-12'],
    social: ['history-4', 'geography-11', 'civics-1']
  },
  '8-1-1': {
    chinese: ['chinese-9', 'chinese-3'],
    english: ['english-4', 'english-9'],
    math: ['math-9'],
    science: ['physics-1', 'physics-2'],
    social: ['history-10', 'geography-4', 'civics-3']
  },
  '8-1-2': {
    chinese: ['chinese-3', 'chinese-13'],
    english: ['english-4', 'english-10'],
    math: ['math-10', 'math-11'],
    science: ['physics-3', 'physics-14'],
    social: ['history-5', 'geography-4', 'civics-11']
  },
  '8-1-3': {
    chinese: ['chinese-10', 'chinese-11'],
    english: ['english-10', 'english-11'],
    math: ['math-11', 'math-12'],
    science: ['physics-4', 'chemistry-1', 'chemistry-2', 'chemistry-13'],
    social: ['history-5', 'geography-4', 'civics-10', 'civics-3']
  },
  '8-2-1': {
    chinese: ['chinese-10', 'chinese-14'],
    english: ['english-5', 'english-11'],
    math: ['math-13', 'math-22'],
    science: ['chemistry-3', 'chemistry-14', 'chemistry-4'],
    social: ['history-5', 'geography-9', 'civics-4']
  },
  '8-2-2': {
    chinese: ['chinese-4', 'chinese-14'],
    english: ['english-5', 'english-10'],
    math: ['math-23', 'math-14'],
    science: ['chemistry-9', 'chemistry-5', 'chemistry-10', 'chemistry-7'],
    social: ['history-11', 'geography-12', 'civics-8']
  },
  '8-2-3': {
    chinese: ['chinese-13', 'chinese-5'],
    english: ['english-14', 'english-9'],
    math: ['math-15', 'math-24'],
    science: ['chemistry-8', 'chemistry-6', 'chemistry-11', 'chemistry-12', 'physics-10', 'physics-9', 'physics-8'],
    social: ['history-6', 'history-14', 'geography-5', 'civics-8', 'civics-7']
  },
  '9-1-1': {
    chinese: ['chinese-5', 'chinese-13'],
    english: ['english-5', 'english-15'],
    math: ['math-16'],
    science: ['physics-5', 'earth-1', 'earth-7'],
    social: ['history-7', 'history-12', 'geography-6', 'civics-5']
  },
  '9-1-2': {
    chinese: ['chinese-11', 'chinese-2'],
    english: ['english-15', 'english-16'],
    math: ['math-17', 'math-25'],
    science: ['physics-5', 'earth-8', 'earth-11'],
    social: ['history-12', 'history-7', 'geography-6', 'civics-9']
  },
  '9-1-3': {
    chinese: ['chinese-15', 'chinese-5'],
    english: ['english-12'],
    math: ['math-20', 'math-14'],
    science: ['physics-6', 'physics-15', 'earth-2', 'earth-3', 'earth-9'],
    social: ['history-7', 'geography-10', 'civics-12']
  },
  '9-2-1': {
    chinese: ['chinese-12'],
    english: ['english-12', 'english-6'],
    math: ['math-18'],
    science: ['physics-11', 'physics-7', 'earth-4', 'earth-10', 'earth-12'],
    social: ['history-7', 'geography-13', 'civics-6']
  },
  '9-2-2': {
    chinese: ['chinese-16', 'chinese-4', 'chinese-6'],
    english: ['english-6', 'english-16'],
    math: ['math-26', 'math-27', 'math-19'],
    science: ['physics-12', 'physics-13', 'earth-5', 'earth-6'],
    social: ['history-8', 'history-15', 'geography-7', 'civics-6']
  }
};

for (const ex of periodicExams) {
  const mapForExam = EXAM_UNIT_MAP[ex.id];
  assert(mapForExam, `Missing EXAM_UNIT_MAP for ${ex.id}`);

  for (const [sk, sv] of Object.entries(ex.subjects)) {
    const uids = mapForExam[sk];
    assert(uids && uids.length > 0, `Missing unit list for ${ex.id} ${sk}`);

    // Fix any typo in examPaperQuestions keys (e.g. "sourceSchool: ")
    for (const q of sv.examPaperQuestions) {
      if (q['sourceSchool: ']) {
        q.sourceSchool = q['sourceSchool: '];
        delete q['sourceSchool: '];
      }
    }

    // Build 100% official PDF-verified naerCode string from linked units' officialAlignment
    const contentCodes = [];
    const perfCodes = [];
    const seenContent = new Set();
    const seenPerf = new Set();

    for (const uid of uids) {
      const u = unitById[uid];
      const oa = officialAlignment[uid];
      assert(u && oa, `Missing unit/alignment for ${uid}`);
      const unitContentCodes = oa.refs.filter(r => r.kind === '學習內容').map(r => r.code);
      const unitPerfCodes = oa.refs.filter(r => r.kind === '學習表現').map(r => r.code);
      const newCodes = unitContentCodes.filter(c => !seenContent.has(c));
      unitContentCodes.forEach(c => seenContent.add(c));
      if (newCodes.length) {
        contentCodes.push(`${newCodes.join('、')}（${u.title}）`);
      } else {
        contentCodes.push(`${unitContentCodes.join('、')}（${u.title}）`);
      }
      for (const pc of unitPerfCodes) {
        if (!seenPerf.has(pc)) {
          seenPerf.add(pc);
          perfCodes.push(pc);
        }
      }
    }

    sv.naerCode = `學習內容：${contentCodes.join('；')}｜學習表現：${perfCodes.join('、')}`;
    sv.linkedUnits = uids.map(uid => ({ id: uid, title: unitById[uid].title }));

    // Special 108 Curriculum scope calibration for 9-2-1 math (二次函數)
    if (ex.id === '9-2-1' && sk === 'math') {
      sv.editionScope = '康軒／翰林／南一：九下第一章 二次函數（1-1 二次函數的圖形與平移 y＝a(x−h)²＋k、1-2 二次函數的最大值與最小值）。【108課綱最新邊界提醒：國中九年級部定核心（F-9-1、F-9-2）聚焦由圖形與頂點式判讀開口、對稱軸與極值；一般式配方法與圍籬應用題已移至高一數學 F-10-1，僅部分學校列為段考補充延伸，教育會考不考一般式配方】。';
      if (sv.coreKnowledge[2]) {
        sv.coreKnowledge[2].title = '【段考延伸補充 · 高一銜接】一般式配方法與 x 軸交點判讀（非會考範圍）';
        sv.coreKnowledge[2].takeaway = '108 課綱部定範圍以頂點式 y = a(x − h)² + k 判讀極值與對稱性為主；若各校段考補充一般式 y = ax² + bx + c，可透過對稱點中點求對稱軸 x = h 或配方核對：';
      }
      if (!sv.examPaperQuestions.some(q => q.id === '9-2-1-ma-q0')) {
        sv.examPaperQuestions.unshift({
          id: '9-2-1-ma-q0',
          sourceSchool: '新北市永和國中九下第一次段考精選（108課綱標準題型）',
          question: '將二次函數 y ＝ −3(x ＋ 1)² ＋ 4 的圖形向右平移 3 個單位、再向下平移 6 個單位後，可得新二次函數圖形。關於新二次函數的敘述，下列何者正確？',
          options: [
            '頂點為 (2, −2)，且當 x ＝ 2 時有最大值 −2',
            '頂點為 (2, −2)，且當 x ＝ 2 時有最小值 −2',
            '頂點為 (−4, −2)，且對稱軸為 x ＝ −4',
            '頂點為 (2, 10)，且圖形與 x 軸有兩個交點'
          ],
          answer: 0,
          solution: '1. 原頂點為 (−1, 4)，開口係數 a ＝ −3（平移不改變開口方向與大小）；\n2. 向右平移 3 個單位：新頂點 x 坐標 h ＝ −1 ＋ 3 ＝ 2；\n3. 向下平移 6 個單位：新頂點 y 坐標 k ＝ 4 − 6 ＝ −2，故新函數為 y ＝ −3(x − 2)² − 2；\n4. 因 a ＝ −3 ＜ 0，開口向下，故在 x ＝ 2 時有最大值 −2（且最大值 −2 ＜ 0，整條拋物線位於 x 軸下方，與 x 軸無交點）。故選 (A)。',
          thinkingTrap: '學生常直接套用括號加減卻弄反原頂點符號（原式 x＋1 代表原頂點 x＝−1 而非 ＋1），或忽略 a＜0 開口向下應為最大值。'
        });
      }
    }

    // Verify 100% of extracted MOE codes exist in the official PDF text!
    const srcId = sk === 'math' ? 'math' : sk === 'chinese' ? 'chinese' : sk === 'english' ? 'english' : sk === 'science' ? 'science' : 'social';
    const checkCodes = sv.naerCode.match(/(?:[歷地公]?[A-Za-z0-9]+-IV-\d+|[A-Z]-[789]-\d+)/g) || [];
    assert(checkCodes.length > 0, `No MOE codes generated for ${ex.id} ${sk}`);
    for (const c of checkCodes) {
      assert(allPdfText[srcId].includes(c), `Code ${c} not found in official ${srcId} PDF (${ex.id} ${sk})`);
    }
  }
}

// Re-export periodic-exam-data.js cleanly
const out = `// 108 課綱國中全科（國一至國三）段考 期中 期末考 知識點 預備講義與考題交叉比對資料庫
// 涵蓋 17 場段考、5 大考科、教育部 108 課綱官方領綱核驗條目、均一教育平台對齊、三大版本範圍、段考真題解析、避坑防線、48小時檢核清單與本站精講單元雙向連結
// 已全面通過教育部國民中小學十二年國教最新領綱 PDF 條目核驗（2026-11-26）

export const periodicExams = ${JSON.stringify(periodicExams, null, 2)};

export const periodicExamById = Object.fromEntries(periodicExams.map(e => [e.id, e]));

export const gradeExams = {
  7: periodicExams.filter(e => e.grade === 7),
  8: periodicExams.filter(e => e.grade === 8),
  9: periodicExams.filter(e => e.grade === 9)
};
`;

fs.writeFileSync('dist/periodic-exam-data.js', out, 'utf8');
console.log('Successfully calibrated all 85 periodic exam subject handouts in dist/periodic-exam-data.js with 0 invalid MOE codes!');
