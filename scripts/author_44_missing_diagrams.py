# scripts/author_44_missing_diagrams.py
# Authors 44 bespoke, topic-specific SVG conceptual diagrams for the remaining 44 units in dist/diagrams.js
import re

svg_44_code = r"""  ,
  // === SCIENCE & EARTH & BIOLOGY & PHYSICS & CHEMISTRY 15 BESPOKE DIAGRAMS ===
  'earth-2': {
    title: '全球水循環儲庫與河流侵蝕搬運沉積剖面',
    subtitle: '蒸發 ➔ 凝結 ➔ 降水 ➔ 逕流與地下入滲；上游侵蝕 V 型谷、下游沖積扇平原',
    caption: '太陽輻射與重力驅動全球水循環。河流自高山向海洋流動時，依流速遞減依序產生侵蝕、搬運與沉積作用，並受最終侵蝕基準面（海平面）控制。',
    render: () => frame('水循環與河流地形', `
      <!-- Sun & Clouds -->
      <circle cx="460" cy="42" r="18" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
      <text x="460" y="46" font-size="10" font-weight="800" fill="${c.gold}" text-anchor="middle">太陽能</text>
      <rect x="80" y="25" width="110" height="28" rx="14" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
      <text x="135" y="43" font-size="10" font-weight="700" fill="${c.blue}" text-anchor="middle">凝結雲層 · 降水</text>
      <!-- Rain drops -->
      <line x1="110" y1="58" x2="105" y2="75" stroke="${c.blue}" stroke-width="1.8" stroke-dasharray="3,2"/>
      <line x1="135" y1="58" x2="130" y2="75" stroke="${c.blue}" stroke-width="1.8" stroke-dasharray="3,2"/>
      <line x1="160" y1="58" x2="155" y2="75" stroke="${c.blue}" stroke-width="1.8" stroke-dasharray="3,2"/>
      <!-- Mountain to Sea profile -->
      <path d="M 40 80 L 140 85 L 250 135 L 360 150 L 500 155 L 500 180 L 40 180 Z" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="2"/>
      <!-- Ocean -->
      <path d="M 355 150 L 500 150 L 500 180 L 355 180 Z" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
      <text x="430" y="168" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">海洋 (97% 水體 · 最終基準面)</text>
      <!-- Evaporation arrow -->
      <path d="M 430 142 L 430 78" stroke="${c.gold}" stroke-width="2" stroke-dasharray="4,2"/>
      <polygon points="430,74 426,82 434,82" fill="${c.gold}"/>
      <text x="430" y="95" font-size="9.5" font-weight="700" fill="${c.gold}" text-anchor="middle">海面蒸發</text>
      <!-- Vapor transport -->
      <path d="M 400 39 L 200 39" stroke="${c.blue}" stroke-width="2"/>
      <polygon points="196,39 204,35 204,43" fill="${c.blue}"/>
      <text x="300" y="32" font-size="9.5" font-weight="700" fill="${c.blue}" text-anchor="middle">大氣水氣輸送</text>
      <!-- River Stages Labels -->
      <rect x="52" y="95" width="85" height="36" rx="5" fill="${c.white}" stroke="${c.forest}"/>
      <text x="94" y="110" font-size="9.5" font-weight="800" fill="${c.forest}" text-anchor="middle">上游：向下侵蝕</text>
      <text x="94" y="124" font-size="8" fill="${c.muted}" text-anchor="middle">V型峽谷 · 巨石</text>
      <rect x="165" y="102" width="85" height="36" rx="5" fill="${c.white}" stroke="${c.green}"/>
      <text x="207" y="117" font-size="9.5" font-weight="800" fill="${c.green}" text-anchor="middle">中游：側向侵蝕</text>
      <text x="207" y="131" font-size="8" fill="${c.muted}" text-anchor="middle">曲流 · 鵝卵石</text>
      <rect x="265" y="110" width="85" height="36" rx="5" fill="${c.white}" stroke="${c.gold}"/>
      <text x="307" y="125" font-size="9.5" font-weight="800" fill="${c.gold}" text-anchor="middle">下游：沉積作用</text>
      <text x="307" y="139" font-size="8" fill="${c.muted}" text-anchor="middle">三角洲 · 細泥沙</text>
      <text x="270" y="198" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">地表逕流與地下水入滲共同連結陸地水與海洋，流速減緩時搬運力下降而沉積</text>
    `)
  },
  'earth-3': {
    title: '臺灣冬夏季風轉向與迎風坡地形雨模型',
    subtitle: '冬季蒙古高壓吹東北季風（東北多雨）vs 夏季太平洋高壓吹西南季風（中南部多雨）',
    caption: '臺灣受海陸比熱差異形成顯著季風氣候，配合南北縱走的中央山脈阻擋，迎風坡抬升凝結致雨，背風坡沉降乾暖。',
    render: () => frame('臺灣冬夏季風與地形雨', `
      <!-- Left: Winter NE Monsoon -->
      <g transform="translate(30, 28)">
        <rect width="225" height="142" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【冬季 · 東北季風 (10~4月)】</text>
        <!-- Central Mountain Range triangle -->
        <polygon points="75,125 115,58 155,125" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1.8"/>
        <text x="115" y="112" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">中央山脈</text>
        <!-- NE Wind arrow from right-top -->
        <path d="M 205 55 L 140 82" stroke="${c.blue}" stroke-width="2.5"/>
        <polygon points="136,84 145,84 142,76" fill="${c.blue}"/>
        <text x="182" y="50" font-size="9.5" font-weight="800" fill="${c.blue}" text-anchor="middle">東北季風</text>
        <text x="175" y="105" font-size="8.5" font-weight="700" fill="${c.blue}" text-anchor="middle">基隆/宜蘭迎風多雨</text>
        <text x="52" y="105" font-size="8.5" font-weight="700" fill="${c.gold}" text-anchor="middle">中南部背風乾晴</text>
      </g>
      <!-- Right: Summer SW Monsoon -->
      <g transform="translate(285, 28)">
        <rect width="225" height="142" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【夏季 · 西南季風 (5~9月)】</text>
        <polygon points="75,125 115,58 155,125" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1.8"/>
        <text x="115" y="112" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">中央山脈</text>
        <!-- SW Wind arrow from left-bottom -->
        <path d="M 20 88 L 85 75" stroke="${c.red}" stroke-width="2.5"/>
        <polygon points="90,74 81,71 83,79" fill="${c.red}"/>
        <text x="48" y="65" font-size="9.5" font-weight="800" fill="${c.red}" text-anchor="middle">西南季風</text>
        <text x="52" y="108" font-size="8.5" font-weight="700" fill="${c.red}" text-anchor="middle">中南部迎風多雨</text>
        <text x="178" y="108" font-size="8.5" font-weight="700" fill="${c.muted}" text-anchor="middle">臺東背風焚風</text>
      </g>
      <text x="270" y="192" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">5~6月冷暖氣團勢均力敵形成「滯留鋒（梅雨）」；夏秋熱帶海洋低壓發展為颱風</text>
    `)
  },
  'earth-5': {
    title: '宇宙天體結構層級與天文尺度（AU vs 光年）',
    subtitle: '地月系 ⊂ 太陽系 (AU) ⊂ 銀河系 (光年) ⊂ 宇宙星系群；類地行星 vs 類木行星',
    caption: '1 天文單位 (AU) 約為日地平均距離（1.5億公里），適用於太陽系內；光年 (ly) 為光走一年的距離，是長度單位而非時間單位。',
    render: () => frame('宇宙天體尺度與太陽系', `
      ${[
        ['地月系', '地球與月球', '距離約 38 萬 km\n衛星繞行星公轉', c.blue, c.lightBlue, 25],
        ['太陽系 (AU)', '1 顆恆星 + 8 大行星', '類地(岩石密度大)\n類木(氣體體積大)', c.gold, c.lightGold, 150],
        ['銀河系 (ly)', '約兩千億顆恆星', '直徑約 10 萬光年\n太陽位於旋臂上', c.purple, c.lightPurple, 275],
        ['宇宙星系群', '數千億個星系', '光年 = 長度單位\n大霹靂膨脹演化', c.forest, c.lightGreen, 400]
      ].map(([title, sub, desc, col, bg, x]) => `
        <g transform="translate(${x}, 32)">
          <rect width="112" height="125" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="56" y="24" font-size="11.5" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
          <text x="56" y="42" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${sub}</text>
          <line x1="12" y1="50" x2="100" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="56" y="74" font-size="8.5" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="56" y="94" font-size="8.5" fill="${c.muted}" text-anchor="middle">${desc.split('\\n')[1] || ''}</text>
          <text x="56" y="114" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">尺度逐級放大 ➔</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">考場防呆：類地行星（水金地火）密度大體積小；類木行星（木土天海）體積龐大密度小</text>
    `)
  },
  'earth-7': {
    title: '地層疊置定律與火成岩脈截切先後判讀',
    subtitle: '未翻轉沉積層「下老上新」；切割者必晚於被切割者（截切定律）',
    caption: '判讀地質事件順序：先沉積 A→B→C 水平岩層，再發生火成岩脈 D 侵入截切，最後斷層 E 錯動切穿岩脈。',
    render: () => frame('地層疊置與截切定律', `
      <!-- Sedimentary layers block -->
      <g transform="translate(45, 30)">
        <rect x="0" y="90" width="220" height="40" rx="3" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="55" y="114" font-size="11" font-weight="800" fill="${c.blue}">岩層 A (最老底層·三葉蟲)</text>
        <rect x="0" y="50" width="220" height="40" rx="3" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="55" y="74" font-size="11" font-weight="800" fill="${c.forest}">岩層 B (中生代·恐龍化石)</text>
        <rect x="0" y="10" width="220" height="40" rx="3" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="55" y="34" font-size="11" font-weight="800" fill="${c.gold}">岩層 C (最新頂層·哺乳類)</text>
        <!-- Igneous Dike D cutting through A, B, C -->
        <polygon points="155,130 175,130 195,10 175,10" fill="${c.lightRed}" stroke="${c.red}" stroke-width="2"/>
        <text x="175" y="75" font-size="10" font-weight="800" fill="${c.red}" text-anchor="middle">岩脈 D</text>
      </g>
      <!-- Right Explanation Box -->
      <g transform="translate(290, 30)">
        <rect width="215" height="130" rx="8" fill="${c.white}" stroke="${c.border}" stroke-width="1.5"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">地質事件先後推論法則</text>
        <line x1="15" y1="34" x2="200" y2="34" stroke="${c.border}"/>
        <text x="18" y="54" font-size="9.5" font-weight="700" fill="${c.dark}">① 疊置律：沉積岩下老上新 (A→B→C)</text>
        <text x="18" y="76" font-size="9.5" font-weight="700" fill="${c.red}">② 截切律：岩脈 D 切穿 A~C，故 D 最晚</text>
        <text x="18" y="98" font-size="9.5" font-weight="700" fill="${c.blue}">③ 標準化石：定出地質年代與當時環境</text>
        <text x="18" y="118" font-size="9" fill="${c.muted}">完整順序：沉積 A ➔ 沉積 B ➔ 沉積 C ➔ 岩脈 D</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">不整合面代表沉積中斷並經歷隆起侵蝕；珊瑚化石指示當時為溫暖清澈淺海</text>
    `)
  },
  'biology-9': {
    title: '人體橫膈呼吸運動與含氮廢物排泄轉化系統',
    subtitle: '吸氣（肋骨上舉、橫膈下降、胸腔擴大）vs 肝臟將氨轉為尿素由腎臟排尿',
    caption: '肺泡本身沒有肌肉，依靠胸腔體積變化帶動氣壓差呼吸；蛋白質代謝產生劇毒氨，在肝臟轉化為尿素後經腎臟過濾成尿液。',
    render: () => frame('呼吸運動與排泄系統', `
      <!-- Left: Breathing Mechanics -->
      <g transform="translate(30, 28)">
        <rect width="225" height="138" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11.5" font-weight="800" fill="${c.blue}" text-anchor="middle">【呼吸運動 · 胸腔氣壓差機制】</text>
        <text x="18" y="48" font-size="9.5" font-weight="700" fill="${c.dark}">🔹 吸氣：肋骨上舉 ＋ 橫膈收縮下降</text>
        <text x="28" y="64" font-size="8.5" fill="${c.blue}">➔ 胸腔擴大 ➔ 腔內壓減小 ➔ 氣體入肺</text>
        <text x="18" y="90" font-size="9.5" font-weight="700" fill="${c.dark}">🔸 呼氣：肋骨下降 ＋ 橫膈舒張上升</text>
        <text x="28" y="106" font-size="8.5" fill="${c.muted}">➔ 胸腔縮小 ➔ 腔內壓增大 ➔ 氣體排出</text>
        <text x="112" y="128" font-size="8.5" font-weight="700" fill="${c.red}" text-anchor="middle">⚠️ 肺泡無肌肉，不可主動收縮擴張！</text>
      </g>
      <!-- Right: Excretion Pathway -->
      <g transform="translate(285, 28)">
        <rect width="225" height="138" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11.5" font-weight="800" fill="${c.gold}" text-anchor="middle">【含氮廢物 · 氨→尿素→尿液】</text>
        <rect x="20" y="38" width="185" height="24" rx="5" fill="${c.white}" stroke="${c.gold}"/>
        <text x="112" y="54" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">① 細胞氧化蛋白質產生「氨」(毒性極強)</text>
        <rect x="20" y="70" width="185" height="24" rx="5" fill="${c.white}" stroke="${c.forest}"/>
        <text x="112" y="86" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">②「肝臟」將氨轉化為低毒「尿素」</text>
        <rect x="20" y="102" width="185" height="24" rx="5" fill="${c.white}" stroke="${c.blue}"/>
        <text x="112" y="118" font-size="9" font-weight="700" fill="${c.blue}" text-anchor="middle">③「腎臟」過濾血液形成尿液→膀胱排出</text>
      </g>
      <text x="270" y="190" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">排泄定義：排除代謝廢物（呼吸排 CO₂、皮膚排汗、腎排尿）；排便屬未消化殘渣非排泄</text>
    `)
  },
  'biology-10': {
    title: '體細胞有絲分裂 vs 生殖細胞減數分裂染色體變化',
    subtitle: '有絲分裂（複製1次、分裂1次，2n➔2n）vs 減數分裂（複製1次、分裂2次，2n➔n）',
    caption: '體細胞分裂確保子細胞遺傳物質完全相同；減數分裂使配子染色體數目減半（僅含不成對單套 n），受精後恢復雙套 2n。',
    render: () => frame('細胞分裂與減數分裂比較', `
      <!-- Left: Mitosis -->
      <g transform="translate(30, 28)">
        <rect width="225" height="138" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11.5" font-weight="800" fill="${c.forest}" text-anchor="middle">【體細胞分裂 · 生長與無性生殖】</text>
        <circle cx="50" cy="70" r="20" fill="${c.white}" stroke="${c.forest}" stroke-width="2"/>
        <text x="50" y="74" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">2n</text>
        <path d="M 75 70 L 105 70" stroke="${c.forest}" stroke-width="2"/><polygon points="108,70 102,66 102,74" fill="${c.forest}"/>
        <circle cx="130" cy="70" r="22" fill="${c.white}" stroke="${c.forest}" stroke-width="2"/>
        <text x="130" y="74" font-size="9.5" font-weight="700" fill="${c.forest}" text-anchor="middle">複製4n</text>
        <path d="M 155 62 L 175 50" stroke="${c.forest}" stroke-width="1.8"/>
        <path d="M 155 78 L 175 90" stroke="${c.forest}" stroke-width="1.8"/>
        <circle cx="192" cy="48" r="15" fill="${c.white}" stroke="${c.forest}" stroke-width="2"/>
        <text x="192" y="52" font-size="9.5" font-weight="800" fill="${c.forest}" text-anchor="middle">2n</text>
        <circle cx="192" cy="92" r="15" fill="${c.white}" stroke="${c.forest}" stroke-width="2"/>
        <text x="192" y="96" font-size="9.5" font-weight="800" fill="${c.forest}" text-anchor="middle">2n</text>
        <text x="112" y="126" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">複製 1 次 · 分裂 1 次 ➔ 2 個雙套子細胞</text>
      </g>
      <!-- Right: Meiosis -->
      <g transform="translate(285, 28)">
        <rect width="225" height="138" rx="8" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11.5" font-weight="800" fill="${c.purple}" text-anchor="middle">【減數分裂 · 配子形成與有性生殖】</text>
        <circle cx="42" cy="70" r="18" fill="${c.white}" stroke="${c.purple}" stroke-width="2"/>
        <text x="42" y="74" font-size="10" font-weight="800" fill="${c.purple}" text-anchor="middle">2n</text>
        <path d="M 62 70 L 82 70" stroke="${c.purple}" stroke-width="2"/>
        <circle cx="102" cy="70" r="20" fill="${c.white}" stroke="${c.purple}" stroke-width="2"/>
        <text x="102" y="74" font-size="8.5" font-weight="700" fill="${c.purple}" text-anchor="middle">同源分離</text>
        <path d="M 125 60 L 148 48" stroke="${c.purple}" stroke-width="1.5"/>
        <path d="M 125 80 L 148 92" stroke="${c.purple}" stroke-width="1.5"/>
        ${[36, 58, 82, 104].map(y => `
          <circle cx="190" cy="${y}" r="10" fill="${c.white}" stroke="${c.purple}" stroke-width="1.8"/>
          <text x="190" y="${y + 3}" font-size="8" font-weight="800" fill="${c.purple}" text-anchor="middle">n</text>
        `).join('')}
        <text x="112" y="126" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">複製 1 次 · 分裂 2 次 ➔ 4 個單套配子 (n)</text>
      </g>
      <text x="270" y="190" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">關鍵考點：第一次減數分裂「同源染色體分離」，第二次減數分裂「複製染色體分開」</text>
    `)
  },
  'biology-12': {
    title: '生物多樣性三層次與外來入侵種生態衝擊',
    subtitle: '遺傳多樣性（同種基因差異）➔ 物種多樣性（群集豐富度）➔ 生態系多樣性（棲地多元）',
    caption: '遺傳多樣性越高，族群面對環境巨變或疫病時越不易滅絕；棲地破壞與外來入侵種是當前生物多樣性喪失的主因。',
    render: () => frame('生物多樣性三層次', `
      ${[
        ['① 遺傳多樣性', '同種個體間基因差異', '例：不同花色紋路的瓢蟲\n助族群適應環境天擇', c.blue, c.lightBlue, 30],
        ['② 物種多樣性', '同一區域內物種豐富度', '例：森林含鳥、蛙、蕨、蟲\n維持複雜食物網穩定', c.forest, c.lightGreen, 200],
        ['③ 生態系多樣性', '多元自然棲地環境', '例：河口濕地、高山、珊瑚礁\n保護棲地即保護全物種', c.gold, c.lightGold, 370]
      ].map(([title, sub, eg, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="140" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="70" y="24" font-size="11.5" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
          <text x="70" y="42" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${sub}</text>
          <line x1="12" y1="52" x2="128" y2="52" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="70" y="76" font-size="8.5" fill="${c.dark}" text-anchor="middle">${eg.split('\\n')[0]}</text>
          <text x="70" y="96" font-size="8.5" font-weight="700" fill="${col}" text-anchor="middle">${eg.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.red}" text-anchor="middle">⚠️ 生物放大作用：重金屬或戴奧辛不易分解，會沿食物鏈在高階消費者體內高度累積</text>
    `)
  },
  'biology-14': {
    title: '人體消化道分區與三大營養素酵素專一性分解',
    subtitle: '口腔（澱粉→麥芽糖）➔ 胃（蛋白質初步分解）➔ 小腸（膽汁乳化＋胰液腸液完全分解與絨毛吸收）',
    caption: '消化腺分泌酵素具受質專一性與酸鹼偏好（胃液強酸、小腸弱鹼）。膽汁由肝臟製造、膽囊儲存，不含酵素，僅物理乳化脂質。',
    render: () => frame('人體消化道與酵素分解', `
      ${[
        ['口腔 · 唾腺', 'pH 中性偏弱鹼', '唾液澱粉酶\n澱粉 ➔ 麥芽糖', c.blue, c.lightBlue, 25],
        ['胃 · 胃腺', 'pH ~ 2 (鹽酸殺菌)', '胃蛋白酶\n蛋白質 ➔ 肽類', c.red, c.lightRed, 150],
        ['肝臟 / 胰臟', '注入小腸前段', '膽汁乳化脂肪(無酵素)\n胰液分解醣/蛋白/脂', c.gold, c.lightGold, 275],
        ['小腸 · 腸腺', '絨毛擴增表面積', '最終小分子：葡萄糖\n胺基酸、脂肪酸甘油', c.forest, c.lightGreen, 400]
      ].map(([organ, ph, action, col, bg, x]) => `
        <g transform="translate(${x}, 30)">
          <rect width="112" height="125" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="56" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${organ}</text>
          <text x="56" y="42" font-size="8.5" font-weight="700" fill="${c.muted}" text-anchor="middle">${ph}</text>
          <line x1="10" y1="50" x2="102" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="56" y="74" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${action.split('\\n')[0]}</text>
          <text x="56" y="96" font-size="8.5" fill="${c.dark}" text-anchor="middle">${action.split('\\n')[1]}</text>
        </g>
        ${x < 400 ? `<path d="M ${x + 114} 92 L ${x + 123} 92" stroke="${c.forest}" stroke-width="2"/>` : ''}
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">核心考點：小腸是消化與吸收最主要場所（吸收大部分水分與全部養分）；大腸吸收剩餘水分</text>
    `)
  },
  'physics-11': {
    title: '靜電感應、接觸起電與庫侖靜電力定律',
    subtitle: '絕緣體摩擦起電（電子轉移）vs 導體靜電感應（近端異性電、遠端同性電）；F ＝ kq₁q₂ / r²',
    caption: '原子核內質子不可自由移動，起電現象皆為「負電荷（電子）」得失或轉移。距離減半時，庫侖靜電力增為 4 倍。',
    render: () => frame('靜電感應與庫侖定律', `
      <!-- Left: Electrostatic Induction -->
      <g transform="translate(30, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11.5" font-weight="800" fill="${c.blue}" text-anchor="middle">【導體靜電感應 · 電荷分離】</text>
        <!-- Charged rod (-) -->
        <rect x="18" y="60" width="55" height="22" rx="6" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.8"/>
        <text x="45" y="75" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">− − −</text>
        <text x="45" y="52" font-size="8.5" fill="${c.red}" text-anchor="middle">帶負電棒靠近</text>
        <!-- Metal sphere -->
        <ellipse cx="155" cy="71" rx="60" ry="30" fill="${c.white}" stroke="${c.dark}" stroke-width="1.8"/>
        <text x="118" y="75" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">＋＋</text>
        <text x="190" y="75" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">− −</text>
        <text x="118" y="116" font-size="8.5" font-weight="700" fill="${c.red}" text-anchor="middle">近端感應異性電</text>
        <text x="190" y="116" font-size="8.5" font-weight="700" fill="${c.blue}" text-anchor="middle">遠端感應同性電</text>
      </g>
      <!-- Right: Coulomb's Law -->
      <g transform="translate(285, 28)">
        <rect width="225" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11.5" font-weight="800" fill="${c.gold}" text-anchor="middle">【庫侖定律 · 平方反比關係】</text>
        <rect x="25" y="36" width="175" height="32" rx="6" fill="${c.white}" stroke="${c.gold}"/>
        <text x="112" y="57" font-size="13" font-weight="800" fill="${c.dark}" text-anchor="middle">F ＝ k · (q₁ × q₂) / r²</text>
        <text x="18" y="88" font-size="9" font-weight="700" fill="${c.dark}">• 同性電相斥、異性電相吸（作用與反作用力）</text>
        <text x="18" y="106" font-size="9" font-weight="700" fill="${c.red}">• 帶電體亦可吸引「不帶電中性導體/紙屑」</text>
        <text x="18" y="124" font-size="9" font-weight="700" fill="${c.forest}">• 移動的永遠是「電子 e⁻」，質子不動！</text>
      </g>
      <text x="270" y="190" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">防呆警語：兩物相互吸引時，可能為「異性電」或「一帶電一中性」；相互排斥則必為同性電</text>
    `)
  },
  'physics-13': {
    title: '法拉第電磁感應與冷次定律（磁生電）',
    subtitle: '線圈內磁力線（磁通量）發生變化時產生感應電流；感應磁場恆反抗原始變化',
    caption: '發電機利用外力轉動線圈切割磁力線，將「力學能轉化為電能」；磁鐵靜止在線圈內時，磁通量不變，感應電流為 0。',
    render: () => frame('電磁感應與冷次定律', `
      <!-- Magnet moving into coil -->
      <g transform="translate(35, 45)">
        <rect x="0" y="30" width="55" height="32" fill="${c.blue}" stroke="${c.dark}" stroke-width="1.5"/>
        <text x="27" y="51" font-size="13" font-weight="800" fill="${c.white}" text-anchor="middle">S</text>
        <rect x="55" y="30" width="55" height="32" fill="${c.red}" stroke="${c.dark}" stroke-width="1.5"/>
        <text x="82" y="51" font-size="13" font-weight="800" fill="${c.white}" text-anchor="middle">N</text>
        <!-- Motion arrow -->
        <path d="M 120 46 L 155 46" stroke="${c.red}" stroke-width="2.5"/>
        <polygon points="160,46 152,42 152,50" fill="${c.red}"/>
        <text x="85" y="20" font-size="10" font-weight="800" fill="${c.red}" text-anchor="middle">N極向右插入線圈 ➔</text>
      </g>
      <!-- Solenoid Coil -->
      <g transform="translate(215, 40)">
        <rect x="0" y="20" width="120" height="60" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="22" y="55" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">N'</text>
        <text x="98" y="55" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">S'</text>
        <text x="60" y="12" font-size="10" font-weight="800" fill="${c.forest}" text-anchor="middle">感應磁場左N右S（排斥靠近）</text>
        <!-- Galvanometer -->
        <circle cx="60" cy="112" r="18" fill="${c.white}" stroke="${c.forest}" stroke-width="2"/>
        <text x="60" y="116" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">G</text>
        <line x1="20" y1="80" x2="42" y2="112" stroke="${c.forest}" stroke-width="1.5"/>
        <line x1="100" y1="80" x2="78" y2="112" stroke="${c.forest}" stroke-width="1.5"/>
      </g>
      <!-- Summary Box -->
      <g transform="translate(355, 32)">
        <rect width="155" height="128" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="77" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">冷次定律判別心法</text>
        <line x1="12" y1="30" x2="143" y2="30" stroke="${c.green}"/>
        <text x="12" y="50" font-size="9" font-weight="700" fill="${c.dark}">• N極逼近 ➔ 左端生N排斥</text>
        <text x="12" y="70" font-size="9" font-weight="700" fill="${c.dark}">• N極遠離 ➔ 左端生S挽留</text>
        <text x="12" y="90" font-size="9" font-weight="700" fill="${c.red}">• 相對靜止 ➔ 電流 ＝ 0</text>
        <text x="12" y="112" font-size="8.5" fill="${c.muted}">發電機：力學能 ➔ 電能</text>
      </g>
      <text x="270" y="190" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">感應電流大小正比於「磁通量變化率」：加快移動速率、增加線圈匝數均可增大感應電流</text>
    `)
  },
  'chemistry-7': {
    title: '有效碰撞理論與影響反應速率五大因素',
    subtitle: '本質、濃度/表面積（增碰撞頻率）、溫度（增動能與頻率）、催化劑（降低活化能門檻）',
    caption: '化學反應須粒子發生「方向正確且能量大於活化能」的有效碰撞。催化劑改變反應途徑降低活化能，但反應完本身質量不變。',
    render: () => frame('碰撞理論與催化劑活化能', `
      <!-- Left: Activation Energy Curve -->
      <g transform="translate(30, 28)">
        <rect width="235" height="138" rx="8" fill="${c.white}" stroke="${c.border}" stroke-width="1.5"/>
        <text x="117" y="20" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【催化劑降低活化能曲線圖】</text>
        <line x1="25" y1="120" x2="215" y2="120" stroke="${c.muted}" stroke-width="1.5"/>
        <line x1="25" y1="120" x2="25" y2="30" stroke="${c.muted}" stroke-width="1.5"/>
        <!-- Uncatalyzed high peak -->
        <path d="M 35 95 L 65 95 Q 115 15 165 108 L 205 108" fill="none" stroke="${c.red}" stroke-width="2" stroke-dasharray="4,2"/>
        <text x="115" y="42" font-size="8.5" font-weight="700" fill="${c.red}" text-anchor="middle">未加催化劑 (高門檻)</text>
        <!-- Catalyzed lower peak -->
        <path d="M 35 95 L 65 95 Q 115 55 165 108 L 205 108" fill="none" stroke="${c.green}" stroke-width="2.5"/>
        <text x="115" y="85" font-size="8.5" font-weight="800" fill="${c.forest}" text-anchor="middle">加催化劑 (低活化能)</text>
      </g>
      <!-- Right: 5 Factors -->
      <g transform="translate(285, 28)">
        <rect width="225" height="138" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【影響反應速率五大控制變因】</text>
        <text x="15" y="44" font-size="9" font-weight="700" fill="${c.dark}">① 反應物本質：活性大者反應快（鉀＞鈉＞鐵）</text>
        <text x="15" y="64" font-size="9" font-weight="700" fill="${c.dark}">② 表面積：磨成粉末，總接觸面積大增</text>
        <text x="15" y="84" font-size="9" font-weight="700" fill="${c.dark}">③ 濃度：單位體積粒子數增多，碰撞機率升</text>
        <text x="15" y="104" font-size="9" font-weight="700" fill="${c.red}">④ 溫度：粒子高速運動，超越活化能比例大增</text>
        <text x="15" y="124" font-size="9" font-weight="700" fill="${c.forest}">⑤ 催化劑：如雙氧水加 MnO₂，只改速率不改產量</text>
      </g>
      <text x="270" y="190" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">考場防呆：把固體切細或加催化劑只會「加快反應速率（縮短時間）」，不會增加最終產物總莫耳數！</text>
    `)
  },
  'chemistry-10': {
    title: '酸鹼滴定裝置、當量點 pH 突躍與常見鹽類',
    subtitle: 'H⁺ ＋ OH⁻ ➔ H₂O ＋ 熱量（必為放熱反應）；滴定管裝已知液、錐形瓶裝待測液與指示劑',
    caption: '中和當量點指 H⁺ 莫耳數恰好等於 OH⁻ 莫耳數。錐形瓶內須先滴入幾滴酚酞指示劑，方便觀察顏色瞬間轉變。',
    render: () => frame('酸鹼滴定與常見生活鹽類', `
      <!-- Left: Titration Setup & Curve -->
      <g transform="translate(30, 28)">
        <rect width="220" height="138" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="110" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【酸鹼中和滴定 · H⁺＋OH⁻→H₂O】</text>
        <text x="16" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 滴定管（上）：裝濃度已知標準液</text>
        <text x="16" y="63" font-size="9" font-weight="700" fill="${c.dark}">• 錐形瓶（下）：裝待測液 ＋ 指示劑</text>
        <text x="16" y="81" font-size="9" font-weight="700" fill="${c.red}">• 熱效應：酸鹼中和必放熱，水溫上升</text>
        <text x="16" y="99" font-size="9" font-weight="700" fill="${c.forest}">• 當量條件：n(H⁺) ＝ n(OH⁻)</text>
        <text x="16" y="120" font-size="8.5" fill="${c.muted}">酚酞指示劑：酸中無色 ➔ 鹼中呈粉紅色</text>
      </g>
      <!-- Right: Common Salts -->
      <g transform="translate(270, 28)">
        <rect width="240" height="138" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="120" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【四大常考生活鹽類性質速查】</text>
        <text x="14" y="46" font-size="9" font-weight="700" fill="${c.dark}">① 氯化鈉 NaCl：食鹽，中性，調味防腐</text>
        <text x="14" y="68" font-size="9" font-weight="700" fill="${c.dark}">② 碳酸鈣 CaCO₃：大理石/貝殼，遇酸冒 CO₂</text>
        <text x="14" y="90" font-size="9" font-weight="700" fill="${c.blue}">③ 碳酸氫鈉 NaHCO₃：小蘇打，弱鹼，受熱冒 CO₂</text>
        <text x="14" y="112" font-size="9" font-weight="700" fill="${c.gold}">④ 硫酸鈣 CaSO₄：石膏，白色難溶固體（豆花凝固）</text>
        <text x="14" y="130" font-size="8.5" fill="${c.red}">碳酸鈉 Na₂CO₃（蘇打/洗滌鹼）鹼性強於小蘇打</text>
      </g>
      <text x="270" y="190" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">必背鑑別：小蘇打粉（NaHCO₃）無論「加熱」或「加酸」皆會產生二氧化碳氣體使澄清石灰水變混濁</text>
    `)
  },
  'chemistry-11': {
    title: '有機化合物官能基分類與酯化皂化反應對照',
    subtitle: '烴類（只含C、H）、醇類（−OH 中性不導電）、有機酸（−COOH 弱酸導電）、酯類（−COOR 水果香難溶於水）',
    caption: '酒精（C₂H₅OH）雖有 OH 基但在水中不解離，屬於非電解質中性溶液；有機酸與醇在濃硫酸催化下脫水生成酯與水。',
    render: () => frame('有機化合物分類與酯化反應', `
      ${[
        ['烴類 (CₓHᵧ)', '僅含碳與氫', '甲烷(天然氣)、丙烷\n難溶於水，完全燃燒生CO₂+H₂O', c.blue, c.lightBlue, 25],
        ['醇類 (−OH)', '羥基 · 中性非電解質', '乙醇(酒精 75%防疫)\n易溶於水，但水中不解離！', c.forest, c.lightGreen, 150],
        ['有機酸 (−COOH)', '羧基 · 弱酸電解質', '乙酸(醋酸)、甲酸(蟻酸)\n部分解離出 H⁺，可導電', c.red, c.lightRed, 275],
        ['酯類 (−COOR)', '有機酸＋醇 ➔ 酯＋水', '濃硫酸催化·水浴加熱\n具水果香味，密度小浮於水面', c.gold, c.lightGold, 400]
      ].map(([title, group, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="112" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="56" y="24" font-size="10.5" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
          <text x="56" y="42" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${group}</text>
          <line x1="10" y1="50" x2="102" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">⚠️ 考場高頻陷阱：CO、CO₂、碳酸鹽（CaCO₃）與氰化物雖含碳，但性質同無機物，不屬於有機化合物！</text>
    `)
  },
  'chemistry-12': {
    title: '聚合物結構（鏈狀熱塑性 vs 網狀熱固性）與皂化去污',
    subtitle: '鏈狀結構遇熱軟化可回收重塑（PE/PP/PET）vs 網狀結構高溫不熔化（輪胎橡膠/酚醛樹脂）',
    caption: '肥皂由油脂與強鹼共煮皂化而成，加入飽和食鹽水「鹽析」分離；肥皂分子的親油端包覆油污、親水端朝向水完成乳化去污。',
    render: () => frame('聚合物結構與肥皂去污原理', `
      <!-- Left: Linear vs Cross-linked Polymer -->
      <g transform="translate(30, 28)">
        <rect width="225" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【聚合物：熱塑性 vs 熱固性】</text>
        <!-- Linear chain -->
        <circle cx="35" cy="52" r="6" fill="${c.blue}"/><circle cx="55" cy="52" r="6" fill="${c.blue}"/><circle cx="75" cy="52" r="6" fill="${c.blue}"/><circle cx="95" cy="52" r="6" fill="${c.blue}"/>
        <line x1="41" y1="52" x2="89" y2="52" stroke="${c.blue}" stroke-width="2"/>
        <text x="160" y="55" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">鏈狀：加熱軟化可回收</text>
        <!-- Cross-linked mesh -->
        <circle cx="35" cy="95" r="6" fill="${c.red}"/><circle cx="65" cy="95" r="6" fill="${c.red}"/><circle cx="95" cy="95" r="6" fill="${c.red}"/>
        <circle cx="35" cy="118" r="6" fill="${c.red}"/><circle cx="65" cy="118" r="6" fill="${c.red}"/><circle cx="95" cy="118" r="6" fill="${c.red}"/>
        <line x1="35" y1="95" x2="95" y2="95" stroke="${c.red}" stroke-width="2"/><line x1="35" y1="118" x2="95" y2="118" stroke="${c.red}" stroke-width="2"/>
        <line x1="35" y1="95" x2="35" y2="118" stroke="${c.red}" stroke-width="2"/><line x1="65" y1="95" x2="65" y2="118" stroke="${c.red}" stroke-width="2"/><line x1="95" y1="95" x2="95" y2="118" stroke="${c.red}" stroke-width="2"/>
        <text x="162" y="108" font-size="9" font-weight="700" fill="${c.red}" text-anchor="middle">網狀：受熱不熔化定型</text>
      </g>
      <!-- Right: Saponification & Micelle -->
      <g transform="translate(280, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【皂化反應與肥皂微胞去污】</text>
        <text x="15" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 皂化：油脂 ＋ 氫氧化鈉 ➔ 肥皂 ＋ 甘油</text>
        <text x="15" y="65" font-size="9" font-weight="700" fill="${c.forest}">• 鹽析：加飽和食鹽水使肥皂浮出分離（物理變化）</text>
        <text x="15" y="88" font-size="9" font-weight="700" fill="${c.blue}">• 去污：長碳鏈「親油端」插入油滴內部</text>
        <text x="15" y="108" font-size="9" font-weight="700" fill="${c.red}">• 乳化：帶電「親水端」朝外溶於水帶走油污</text>
        <text x="15" y="126" font-size="8.2" fill="${c.muted}">天然聚合物：澱粉、纖維素、蛋白質、天然橡膠</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">注意：葡萄糖、蔗糖、油脂、胺基酸分子量小，均「不屬於」聚合物！肥皂水溶液呈弱鹼性</text>
    `)
  },
  'chemistry-13': {
    title: '乾燥空氣組成比例與實驗室氣體集氣法選擇',
    subtitle: '氮氣 N₂ (78%)、氧氣 O₂ (21%)、氬氣 Ar (0.9%)；難溶於水用排水集氣法，易溶於水依密度選排空氣法',
    caption: '排水集氣法收集到的氣體純度最高：氧氣（雙氧水＋二氧化錳）與二氧化碳（大理石＋稀鹽酸）皆可用排水集氣法收集。',
    render: () => frame('空氣組成與實驗室集氣法', `
      <!-- Left: Air Composition Bar -->
      <g transform="translate(30, 28)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="107" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【乾燥空氣固定氣體組成】</text>
        <rect x="18" y="36" width="135" height="24" rx="4" fill="${c.blue}"/>
        <text x="85" y="52" font-size="9.5" font-weight="800" fill="${c.white}" text-anchor="middle">氮氣 N₂ (78%)</text>
        <rect x="155" y="36" width="42" height="24" rx="4" fill="${c.green}"/>
        <text x="176" y="52" font-size="8.5" font-weight="800" fill="${c.white}" text-anchor="middle">O₂ 21%</text>
        <text x="18" y="80" font-size="9" font-weight="700" fill="${c.dark}">• 氮氣 N₂：常溫安定，填充食品防氧化</text>
        <text x="18" y="98" font-size="9" font-weight="700" fill="${c.forest}">• 氧氣 O₂：具助燃性（無可燃性）</text>
        <text x="18" y="116" font-size="9" font-weight="700" fill="${c.purple}">• 氬氣 Ar (0.9%)：焊接保護、填充燈泡</text>
      </g>
      <!-- Right: Gas Collection Methods -->
      <g transform="translate(265, 28)">
        <rect width="245" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="122" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【實驗室三大集氣法選擇準則】</text>
        <text x="15" y="45" font-size="9" font-weight="700" fill="${c.forest}">① 排水集氣法（難溶或略溶於水，純度最高）</text>
        <text x="25" y="61" font-size="8.5" fill="${c.dark}">➔ 適用：氧氣 O₂、氫氣 H₂、二氧化碳 CO₂</text>
        <text x="15" y="83" font-size="9" font-weight="700" fill="${c.blue}">② 向上排空氣法（易溶於水，且比空氣重 M＞29）</text>
        <text x="25" y="99" font-size="8.5" fill="${c.dark}">➔ 適用：氯化氫 HCl、二氧化硫 SO₂</text>
        <text x="15" y="120" font-size="9" font-weight="700" fill="${c.red}">③ 向下排空氣法（易溶於水，且比空氣輕 M＜29）</text>
        <text x="155" y="120" font-size="8.5" font-weight="800" fill="${c.red}">➔ 氨氣 NH₃</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">製備關鍵：雙氧水＋二氧化錳製 O₂；大理石(CaCO₃)＋稀鹽酸製 CO₂（薊頭漏斗長管須沒入液面下）</text>
    `)
  },
  // === HISTORY 13 BESPOKE DIAGRAMS ===
  'history-1': {
    title: '臺灣史前文化演進與史料考證雙軌圖',
    subtitle: '舊石器（長濱敲擊石器）➔ 新石器（大坌坑/圓山/卑南磨製與陶器農耕）➔ 金屬器（十三行煉鐵玻璃）',
    caption: '沒有文字記載的時代稱為史前時代，主要依賴考古出土遺物與遺址層位重建；進入歷史時代後則結合文字檔案與實物互證。',
    render: () => frame('臺灣史前文化三階段演進', `
      ${[
        ['舊石器時代', '台東長濱文化', '敲擊石器 · 採集漁獵\n已知用火、尚無陶器與農耕', c.blue, c.lightBlue, 25],
        ['新石器時代', '大坌坑 ➔ 圓山 / 卑南', '磨製石器 · 燒製陶器\n定居農耕、貝塚、玉器石板棺', c.forest, c.lightGreen, 195],
        ['金屬器時代', '新北十三行文化', '煉鐵作坊 · 人面陶罐\n出土唐宋銅錢與琉璃珠(海外貿易)', c.gold, c.lightGold, 365]
      ].map(([era, site, feat, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="150" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="75" y="24" font-size="11.5" font-weight="800" fill="${col}" text-anchor="middle">${era}</text>
          <text x="75" y="42" font-size="9.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${site}</text>
          <line x1="12" y1="50" x2="138" y2="50" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="75" y="74" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${feat.split('\\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${feat.split('\\n')[1]}</text>
        </g>
        ${x < 365 ? `<path d="M ${x + 153} 92 L ${x + 167} 92" stroke="${c.forest}" stroke-width="2"/>` : ''}
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">史料法則：第一手史料（當時遺物、官方檔案、日記）價值高於後人轉述；歷史事實不等同個人主觀詮釋</text>
    `)
  },
  'history-2': {
    title: '十七世紀大航海時代臺灣多方勢力競逐格局',
    subtitle: '荷蘭治南（大員/熱蘭遮城、新港文書）vs 西班牙治北（雞籠/淡水）➔ 鄭氏政權（軍屯開墾、儒學孔廟）',
    caption: '17 世紀臺灣因地處東亞航線樞紐，成為荷蘭東印度公司轉口貿易據點（出口鹿皮蔗糖）；1662 年鄭成功驅荷，奠定漢人典章制度。',
    render: () => frame('十七世紀荷西與鄭氏臺灣', `
      ${[
        ['荷蘭東印度公司', '台南大員 · 熱蘭遮城', '轉口貿易(鹿皮、蔗糖)\n新港文書(羅馬字拼原民語)', c.gold, c.lightGold, 25],
        ['西班牙北臺灣', '雞籠(聖薩爾瓦多城)·淡水', '發展馬尼拉對日貿易\n宣揚天主教 · 1642為荷所逐', c.blue, c.lightBlue, 195],
        ['明鄭東寧政權', '鄭成功驅荷 · 鄭經陳永華', '寓兵於農「軍屯制度」\n建全臺首學孔廟、走私英日貿易', c.red, c.lightRed, 365]
      ].map(([power, loc, feat, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="150" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="75" y="24" font-size="11.5" font-weight="800" fill="${col}" text-anchor="middle">${power}</text>
          <text x="75" y="42" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${loc}</text>
          <line x1="12" y1="50" x2="138" y2="50" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="75" y="74" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${feat.split('\\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${feat.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">地名線索：「紅毛城、王田、甲」源於荷治；「三貂角(Santiago)」源於西治；「左營、林鳳營」源於明鄭軍屯</text>
    `)
  },
  'history-3': {
    title: '清領時期（渡臺禁令到開港建省）與日治三階段統治演進',
    subtitle: '清領前期（米糖出口大陸、水圳宗族）➔ 1860開港（茶糖樟腦外銷）➔ 日治（無方針→內地延長→皇民化）',
    caption: '1860 年開港通商使臺灣經濟重心由南往北移（茶、樟腦在北部）；日治時期完成人口普查、土地調查、縱貫鐵路與現代衛生教育。',
    render: () => frame('清領與日治時期臺灣變遷', `
      <!-- Left: Qing Rule -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【清領臺灣兩階段 (1683~1895)】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 清領前期：渡臺禁令、畫界封山(土牛紅線)</text>
        <text x="22" y="61" font-size="8.5" fill="${c.muted}">八堡圳/瑠公圳興築、一府二鹿三艋舺郊商</text>
        <text x="14" y="83" font-size="9" font-weight="700" fill="${c.red}">• 1860 開港通商：淡水、基隆、安平、打狗</text>
        <text x="22" y="99" font-size="8.5" fill="${c.dark}">出口「茶、糖、樟腦」；政治經濟重心北移</text>
        <text x="14" y="119" font-size="9" font-weight="700" fill="${c.forest}">• 牡丹社事件(沈葆楨) ➔ 清法戰爭(劉銘傳建省)</text>
      </g>
      <!-- Right: Japanese Colonial Rule -->
      <g transform="translate(278, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【日治統治三時期 (1895~1945)】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">① 漸進主義 (1895~1919)：武裝抗日、六三法</text>
        <text x="22" y="61" font-size="8.5" fill="${c.muted}">兒玉後藤：土地林野調查、專賣、縱貫鐵路</text>
        <text x="14" y="83" font-size="9" font-weight="700" fill="${c.forest}">② 內地延長 (1919~1937)：文官總督、日臺共學</text>
        <text x="22" y="99" font-size="8.5" fill="${c.dark}">議會設置請願運動、臺灣文化協會、嘉南大圳</text>
        <text x="14" y="119" font-size="9" font-weight="700" fill="${c.red}">③ 皇民化運動 (1937~1945)：說日語、改日姓、徵兵</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">日治經濟變遷：前期「工業日本、農業臺灣（米糖相剋）」➔ 1930年代日月潭水力發電後轉向「工業臺灣、農業南洋」</text>
    `)
  },
  'history-4': {
    title: '戰後臺灣政治民主化、經濟轉型與兩岸關係演進軸',
    subtitle: '二二八與戒嚴威權 ➔ 1987 解嚴、國會改選與總統直選；進口替代 ➔ 出口導向 ➔ 高科技產業',
    caption: '1949 年實施戒嚴至 1987 年解嚴，臺灣逐步邁向政黨輪替與多數決民主；經濟則從土地改革、加工出口區一路躍升為半導體科技島。',
    render: () => frame('戰後臺灣政經演進', `
      ${[
        ['1945~1950s', '威權體制 · 土地改革', '二二八事件、1949戒嚴\n三七五減租、進口替代輕工業', c.red, c.lightRed, 25],
        ['1960~1970s', '出口導向 · 十大建設', '設立加工出口區(勞力密集)\n退出聯合國、美麗島事件', c.gold, c.lightGold, 150],
        ['1980~1990s', '解嚴民主 · 科技轉型', '1987解嚴、開放兩岸探親\n竹科設立、1996總統首度直選', c.forest, c.lightGreen, 275],
        ['2000s~當代', '政黨輪替 · 公民社會', '多次政黨和平輪替、加入WTO\n婚姻平權與多元文化深化', c.blue, c.lightBlue, 400]
      ].map(([decade, theme, detail, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="112" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="56" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${decade}</text>
          <text x="56" y="42" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${theme}</text>
          <line x1="10" y1="50" x2="102" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${detail.split('\\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${detail.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">兩岸關係里程碑：1949 古寧頭/八二三武力對峙 ➔ 1979 停止砲擊政治對峙 ➔ 1987 開放探親民間交流</text>
    `)
  },
  'history-5': {
    title: '中國政治選才制度演進與東亞漢字文化圈交流',
    subtitle: '商周封建世襲 ➔ 秦漢郡縣與察舉孝廉 ➔ 魏晉九品官人法（世族門第）➔ 隋唐宋科舉取士（平民士大夫）',
    caption: '唐代東亞形成包含漢字、儒學、律令、佛教的「東亞文化圈」（日本大化革新、新羅、越南）；宋代商業繁榮出現最早紙幣交子與指南針海運。',
    render: () => frame('中國選才制度與東亞文化圈', `
      ${[
        ['商周 · 封建宗法', '世卿世祿 · 血緣貴族', '天子分封諸侯\n大宗小宗嫡長子繼承', c.gold, c.lightGold, 25],
        ['秦漢 · 中央集權', '郡縣制 · 漢代察舉', '秦廢封建行郡縣書同文\n漢武帝獨尊儒術、鄉舉里選', c.blue, c.lightBlue, 150],
        ['魏晉 · 門閥世族', '九品官人法', '中正官依家世評定品第\n造成「上品無寒門」壟斷', c.purple, c.lightPurple, 275],
        ['隋唐宋 · 科舉制', '分科考試 · 社會流動', '隋創科舉、唐文化圈輻射\n宋重文輕武、交子紙幣夜市', c.forest, c.lightGreen, 400]
      ].map(([era, sys, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="112" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="56" y="24" font-size="10.5" font-weight="800" fill="${col}" text-anchor="middle">${era}</text>
          <text x="56" y="42" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${sys}</text>
          <line x1="10" y1="50" x2="102" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">唐宋社會大變革：唐代以前由門第貴族主導，坊市分離；宋代科舉普及形成平民士大夫社會，坊市合一無宵禁</text>
    `)
  },
  'history-6': {
    title: '近代東亞面對西方帝國主義衝擊之改革三層次與中日對比',
    subtitle: '清末改革（器物自強運動 ➔ 制度戊戌變法/立憲 ➔ 思想新文化運動）vs 日本明治維新（全盤西化君主立憲）',
    caption: '鴉片戰爭《南京條約》打破天朝體制（協定關稅、領事裁判權）；甲午戰爭檢驗了清朝僅學西方軍事器物的自強運動與日本全面改革明治維新的差距。',
    render: () => frame('近代東亞改革與明治維新對比', `
      <!-- Left: Qing 3 Stages -->
      <g transform="translate(28, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">【清末民初近代化三層次遞進】</text>
        <text x="14" y="46" font-size="9" font-weight="700" fill="${c.dark}">① 器物層（1860s 自強運動）：師夷長技以制夷</text>
        <text x="22" y="61" font-size="8.2" fill="${c.muted}">江南製造局、北洋艦隊 ➔ 敗於1894甲午戰爭</text>
        <text x="14" y="83" font-size="9" font-weight="700" fill="${c.dark}">② 制度層（1898 戊戌變法 / 1911 辛亥革命）</text>
        <text x="22" y="98" font-size="8.2" fill="${c.muted}">康梁百日維新、廢科舉、孫中山推翻帝制建民國</text>
        <text x="14" y="119" font-size="9" font-weight="700" fill="${c.red}">③ 思想層（1915 新文化運動 / 1919 五四運動）</text>
      </g>
      <!-- Right: Japan Meiji Restoration -->
      <g transform="translate(280, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【日本明治維新 (1868) 與擴張】</text>
        <text x="14" y="46" font-size="9" font-weight="700" fill="${c.dark}">• 尊王攘夷 ➔ 大政奉還、廢藩置縣中央集權</text>
        <text x="14" y="68" font-size="9" font-weight="700" fill="${c.forest}">• 脫亞入歐：器物、憲政議會、義務教育同步改革</text>
        <text x="14" y="90" font-size="9" font-weight="700" fill="${c.blue}">• 對外戰爭：1894甲午戰爭、1904日俄戰爭獲勝</text>
        <text x="14" y="112" font-size="9" font-weight="700" fill="${c.red}">• 帝國擴張：1895領有臺灣、1910併吞朝鮮</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">不平等條約核心侵害：領事裁判權（破壞司法主權）、協定關稅（使本國工商業失去關稅保護）、片面最惠國待遇</text>
    `)
  },
  'history-7': {
    title: '西方文明演進軸：古典希羅 ➔ 文藝復興 ➔ 科學革命 ➔ 啟蒙運動',
    subtitle: '中世紀神權中心 ➔ 文藝復興人文主義（以人為本）➔ 科學革命理性實證 ➔ 啟蒙運動天賦人權與三權分立',
    caption: '啟蒙運動將科學革命的「理性法則」推廣至人類政治社會，直接催生了美國獨立宣言與法國大革命《人權宣言》。',
    render: () => frame('近代歐洲思想與政治革命軸', `
      ${[
        ['14~16世紀', '文藝復興 · 宗教改革', '人文主義以人為本\n馬丁路德因信稱義、新航路', c.gold, c.lightGold, 25],
        ['16~17世紀', '科學革命 · 實證理性', '哥白尼日心說、伽利略\n牛頓運動定律(機械宇宙觀)', c.blue, c.lightBlue, 150],
        ['18世紀', '啟蒙運動 · 政治哲學', '洛克(天賦人權/社會契約)\n孟德斯鳩(三權分立)、盧梭', c.purple, c.lightPurple, 275],
        ['18世紀末', '美法雙元民主革命', '1776 美國獨立(三權分立)\n1789 法國大革命(人權宣言)', c.red, c.lightRed, 400]
      ].map(([century, era, detail, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="112" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="56" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${century}</text>
          <text x="56" y="42" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${era}</text>
          <line x1="10" y1="50" x2="102" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${detail.split('\\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${detail.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">必考對應：洛克主張生命財產自由權，政府若違背契約人民有權推翻；伏爾泰提倡言論自由與宗教寬容</text>
    `)
  },
  'history-8': {
    title: '工業革命、新帝國主義與二十世紀兩次世界大戰格局',
    subtitle: '瓦特改良蒸汽機（煤鐵工廠都市化）➔ 資本主義與社會主義交鋒 ➔ 一戰（國際聯盟）➔ 二戰（聯合國與冷戰）',
    caption: '18 世紀英國工業革命開啟機器大生產，列強為爭奪原料與市場展開新帝國主義瓜分亞非，最終引爆第一次與第二次世界大戰。',
    render: () => frame('工業革命與兩次世界大戰', `
      ${[
        ['18世紀中葉', '英國工業革命', '瓦特改良蒸汽機·鐵路\n都市化、勞資階級、社會主義', c.gold, c.lightGold, 25],
        ['19世紀末', '新帝國主義擴張', '列強瓜分亞非原料市場\n社會達爾文主義、白人負擔', c.purple, c.lightPurple, 150],
        ['1914~1939', '一戰 · 經濟大恐慌', '塞拉耶佛事件·壕溝戰\n威爾遜民族自決、法西斯崛起', c.red, c.lightRed, 275],
        ['1939~當代', '二戰 · 聯合國與全球化', '同盟國戰勝軸心國\n成立聯合國、美蘇冷戰對峙', c.blue, c.lightBlue, 400]
      ].map(([time, title, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="112" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="56" y="24" font-size="10.5" font-weight="800" fill="${col}" text-anchor="middle">${time}</text>
          <text x="56" y="42" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${title}</text>
          <line x1="10" y1="50" x2="102" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">一戰後成立「國際聯盟」（美未加入、無武力）；二戰後成立「聯合國」（美蘇英法中五大常任理事國具否決權）</text>
    `)
  },
  'history-9': {
    title: '臺灣南島語族擴散原鄉與平埔族／高山原住民族文化制度',
    subtitle: '臺灣為南島語系擴散最北端與可能原鄉；清領界線（熟番/生番）與多元歲時祭儀社會組織',
    caption: '南島語族廣泛分布於太平洋與印度洋島嶼；臺灣原住民族各具獨特社會制度（阿美族母系、排灣魯凱貴族階級、達悟飛魚祭）。',
    render: () => frame('臺灣南島語族與原住民族文化', `
      <!-- Left: Austronesian Map Concept -->
      <g transform="translate(28, 28)">
        <rect width="225" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【南島語族分布四極與臺灣地位】</text>
        <text x="112" y="46" font-size="9.5" font-weight="800" fill="${c.red}" text-anchor="middle">⬆ 最北：臺灣（古南島語最分歧原鄉）</text>
        <text x="18" y="72" font-size="8.5" font-weight="700" fill="${c.dark}">⬅ 最西：非洲馬達加斯加</text>
        <text x="128" y="72" font-size="8.5" font-weight="700" fill="${c.dark}">最東：復活節島 ➡</text>
        <text x="112" y="96" font-size="9" font-weight="700" fill="${c.blue}" text-anchor="middle">⬇ 最南：紐西蘭（毛利人）</text>
        <text x="112" y="120" font-size="8.2" fill="${c.muted}" text-anchor="middle">共通文化特徵：山田燒墾、小米與芋頭、紋面編織</text>
      </g>
      <!-- Right: Indigenous Social Systems -->
      <g transform="translate(273, 28)">
        <rect width="240" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="120" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【原住民族社會組織與著名祭典】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 阿美族、卑南族：母系社會、年齡階層、豐年祭</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.dark}">• 排灣族、魯凱族：貴族頭目階級制度、百步蛇石板屋</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.dark}">• 泰雅族、賽德克族：Gaya 祖靈信仰、紋面文化</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.blue}">• 布農族：八部合音祈禱小米豐收、打耳祭</text>
        <text x="14" y="126" font-size="9" font-weight="700" fill="${c.forest}">• 賽夏族：巴斯達隘（矮靈祭）；達悟族：飛魚祭拼板舟</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">歷史分類：清代依服從納稅與否分「熟番（平埔族）」與「生番（高山族）」；日治改稱高砂族與平埔族</text>
    `)
  },
  'history-11': {
    title: '明清帝國貿易網絡、白銀貨幣化與耶穌會中西文化交流',
    subtitle: '鄭和下西洋（朝貢貿易）➔ 新航路美洲白銀流入（一條鞭法／攤丁入畝）➔ 利瑪竇傳教士東來',
    caption: '16 世紀後西班牙與日本白銀大量流入中國，促成明代張居正「一條鞭法」（賦役折銀）與清代雍正「攤丁入畝」（廢除人頭稅，人口暴增）。',
    render: () => frame('明清經濟變遷與中西交流', `
      ${[
        ['鄭和下西洋', '明成祖 · 朝貢體制', '宣揚國威、厚往薄來\n最遠抵達東非海岸與紅海', c.blue, c.lightBlue, 25],
        ['白銀帝國與賦稅', '一條鞭法 ➔ 攤丁入畝', '美洲高產作物(番薯玉米)\n清雍正丁銀併入田賦人口激增', c.gold, c.lightGold, 195],
        ['西學東漸與東學西傳', '利瑪竇 × 徐光啟', '合譯《幾何原本》《坤輿萬國全圖》\n清康熙禁教後中西交流中斷', c.forest, c.lightGreen, 365]
      ].map(([title, sub, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="150" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="75" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
          <text x="75" y="42" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${sub}</text>
          <line x1="12" y1="50" x2="138" y2="50" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="75" y="74" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">商幫崛起：明清商品經濟發達，形成晉商、徽商等地域性商幫，並建立「會館」作為同鄉互助與商務中心</text>
    `)
  },
  'history-12': {
    title: '古希臘城邦（雅典民主 vs 斯巴達軍國）與羅馬三階段政體法制',
    subtitle: '希臘哲學三賢（蘇格拉底、柏拉圖、亞里斯多德）➔ 亞歷山大希臘化 ➔ 羅馬（王政→共和→帝國）與《十二表法》',
    caption: '雅典公民大會為直接民主（女性、外邦人與奴隸無公民權）；羅馬法（《十二表法》至《查士丁尼法典》）與共和制衡奠定現代西方法治基石。',
    render: () => frame('古希臘羅馬古典文明比較', `
      <!-- Left: Ancient Greece -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【古希臘城邦 · 民主與哲學搖籃】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 雅典：商業海權、公民大會直接民主、陶片流放制</text>
        <text x="22" y="61" font-size="8.2" fill="${c.red}">⚠️ 僅成年男性公民有投票權（婦女奴隸外邦人排除）</text>
        <text x="14" y="81" font-size="9" font-weight="700" fill="${c.dark}">• 斯巴達：內陸農業、寡頭政治、嚴格尚武軍事教育</text>
        <text x="14" y="101" font-size="9" font-weight="700" fill="${c.forest}">• 希臘三哲：蘇格拉底 ➔ 柏拉圖 ➔ 亞里斯多德</text>
        <text x="14" y="121" font-size="8.5" fill="${c.muted}">亞歷山大東征：融合希臘、波斯、埃及、印度文化(歐幾里得)</text>
      </g>
      <!-- Right: Ancient Rome -->
      <g transform="translate(278, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【古羅馬政體演進 · 法治與工程】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">① 王政時期 ➔ ② 共和時期（執政官、元老院、護民官）</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.red}">③ 帝國時期：屋大維獲尊「奧古斯都」，開啟羅馬和平</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.forest}">• 法學遺產：《十二表法》➔ 東羅馬《查士丁尼法典》</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.blue}">• 基督教演變：1世紀迫害 ➔ 君士坦丁合法 ➔ 狄奧多西國教</text>
        <text x="14" y="125" font-size="8.2" fill="${c.muted}">實用建築：圓拱結構、引水橋、萬神殿、羅馬競技場</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">文化比較：希臘人重哲學思辨與科學理論（神人同形同性、奧林匹亞）；羅馬人重實用工程建築與法律制度</text>
    `)
  },
  'history-14': {
    title: '中華民國建立、五四新文化、北伐十年建設至八年抗戰時序軸',
    subtitle: '1911 武昌起義 ➔ 1919 五四運動（德先生賽先生）➔ 1928 完成北伐與黃金十年 ➔ 1937~1945 對日抗戰與廢除不平等條約',
    caption: '五四運動因巴黎和會山東問題引爆，促成白話文普及與青年參政；1943 年對日抗戰期間，英美與我國簽訂新約，正式廢除百年不平等條約。',
    render: () => frame('民國初年到對日抗戰時序軸', `
      ${[
        ['1911~1916', '辛亥建國 · 民初政局', '武昌起義、1912中華民國成立\n袁世凱洪憲帝制、軍閥割據', c.gold, c.lightGold, 25],
        ['1915~1919', '新文化 · 五四運動', '陳獨秀《新青年》白話文\n外爭主權(山東問題)、內除國賊', c.blue, c.lightBlue, 150],
        ['1926~1937', '國民革命北伐 · 十年建設', '蔣中正北伐統一、廢兩改元\n發行法幣、清黨與長征、西安事變', c.forest, c.lightGreen, 275],
        ['1937~1945', '八年對日抗戰勝利', '七七盧溝橋事變、南京大屠殺\n1941珍珠港併入二戰、廢不平等條約', c.red, c.lightRed, 400]
      ].map(([years, title, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="112" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="56" y="24" font-size="10.5" font-weight="800" fill="${col}" text-anchor="middle">${years}</text>
          <text x="56" y="42" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${title}</text>
          <line x1="10" y1="50" x2="102" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">關鍵轉折：1931 九一八事變日本占領東北（局部抗戰）➔ 1936 西安事變促成國共二次合作 ➔ 1937 七七事變全面抗戰</text>
    `)
  },
  'history-15': {
    title: '二次大戰後美蘇冷戰兩大陣營對峙與亞非解殖浪潮',
    subtitle: '美國資本主義陣營（馬歇爾計畫、北約 NATO）vs 蘇聯共產主義陣營（華沙公約）；1991 蘇聯解體冷戰結束',
    caption: '冷戰具有「美蘇不直接武力交戰，而透過代理人區域戰爭（韓戰、越戰）、太空與核武競賽對抗」之特徵；亞非新興獨立國家組成不結盟運動（第三世界）。',
    render: () => frame('戰後冷戰雙極對峙與解殖', `
      <!-- Left: Western Bloc -->
      <g transform="translate(28, 28)">
        <rect width="160" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="80" y="22" font-size="10.5" font-weight="800" fill="${c.blue}" text-anchor="middle">【美國為首 · 民主資本陣營】</text>
        <text x="12" y="46" font-size="8.5" font-weight="700" fill="${c.dark}">• 圍堵政策（杜魯門主義）</text>
        <text x="12" y="66" font-size="8.5" font-weight="700" fill="${c.dark}">• 經濟：馬歇爾計畫復興西歐</text>
        <text x="12" y="86" font-size="8.5" font-weight="700" fill="${c.blue}">• 軍事：北大西洋公約組織(NATO)</text>
        <text x="12" y="106" font-size="8.5" fill="${c.muted}">• 西德、日本、南韓、中華民國</text>
      </g>
      <!-- Center: Hotspots & Third World -->
      <g transform="translate(198, 28)">
        <rect width="144" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="72" y="22" font-size="10.5" font-weight="800" fill="${c.gold}" text-anchor="middle">【冷戰危機與第三世界】</text>
        <text x="72" y="45" font-size="8.5" font-weight="700" fill="${c.red}" text-anchor="middle">🔥 柏林圍牆 · 古巴飛彈危機</text>
        <text x="72" y="65" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">🔥 代理人戰爭：韓戰、越戰</text>
        <line x1="12" y1="76" x2="132" y2="76" stroke="${c.gold}" stroke-width="0.8" stroke-dasharray="2,2"/>
        <text x="72" y="95" font-size="8.5" font-weight="800" fill="${c.forest}" text-anchor="middle">🌍 亞非解殖 · 萬隆會議</text>
        <text x="72" y="114" font-size="8" fill="${c.muted}" text-anchor="middle">印巴分治、不結盟運動興起</text>
      </g>
      <!-- Right: Eastern Bloc -->
      <g transform="translate(352, 28)">
        <rect width="160" height="135" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.6"/>
        <text x="80" y="22" font-size="10.5" font-weight="800" fill="${c.red}" text-anchor="middle">【蘇聯為首 · 共產極權陣營】</text>
        <text x="12" y="46" font-size="8.5" font-weight="700" fill="${c.dark}">• 鐵幕演說與共產國際擴張</text>
        <text x="12" y="66" font-size="8.5" font-weight="700" fill="${c.dark}">• 經濟：經濟互助委員會</text>
        <text x="12" y="86" font-size="8.5" font-weight="700" fill="${c.red}">• 軍事：華沙公約組織</text>
        <text x="12" y="106" font-size="8.5" fill="${c.muted}">• 1989柏林圍牆倒塌➔1991蘇聯解體</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">1950 韓戰爆發後，美國派第七艦隊協防臺海，將臺灣納入東亞防共島鏈並重啟美援</text>
    `)
  },
  // === GEOGRAPHY 9 BESPOKE DIAGRAMS ===
  'geography-4': {
    title: '中國三大地形階梯、秦嶺淮河氣候分界與東北亞經濟互補',
    subtitle: '西高東低三級階梯（利於海洋水氣深入與水力發電）；秦嶺淮河（800mm雨量線、1月0°C等溫線）分南北',
    caption: '秦嶺—淮河線是中國最重要的地理界線：以南為濕潤副熱帶季風（水田稻米、河運），以北為半濕潤溫帶季風（旱作小麥、陸運）。',
    render: () => frame('中國地形階梯與秦嶺淮河分界', `
      <!-- Left: 3 Terraces -->
      <g transform="translate(28, 28)">
        <rect width="225" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【西高東低 · 三級地形階梯】</text>
        <rect x="18" y="40" width="55" height="75" fill="${c.gold}" opacity="0.35" stroke="${c.gold}"/>
        <text x="45" y="65" font-size="8.5" font-weight="800" fill="${c.dark}" text-anchor="middle">第一階</text>
        <text x="45" y="80" font-size="7.5" fill="${c.dark}" text-anchor="middle">青藏高原</text>
        <text x="45" y="95" font-size="7.5" fill="${c.muted}" text-anchor="middle">>4000m</text>
        <rect x="73" y="65" width="65" height="50" fill="${c.green}" opacity="0.3" stroke="${c.green}"/>
        <text x="105" y="85" font-size="8.5" font-weight="800" fill="${c.dark}" text-anchor="middle">第二階</text>
        <text x="105" y="100" font-size="7.5" fill="${c.dark}" text-anchor="middle">高原盆地</text>
        <rect x="138" y="90" width="70" height="25" fill="${c.blue}" opacity="0.25" stroke="${c.blue}"/>
        <text x="173" y="106" font-size="8.5" font-weight="800" fill="${c.blue}" text-anchor="middle">第三階平原丘陵</text>
        <text x="112" y="128" font-size="8.2" font-weight="700" fill="${c.forest}" text-anchor="middle">大江東流溝通東西 · 交界處水力蘊藏豐富</text>
      </g>
      <!-- Right: Qinling-Huaihe Line -->
      <g transform="translate(273, 28)">
        <rect width="240" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="120" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【秦嶺—淮河線（800mm·1月0°C）】</text>
        <text x="14" y="46" font-size="9" font-weight="700" fill="${c.gold}">⬆ 北方區域（年雨＜800mm、1月＜0°C河川結冰）</text>
        <text x="22" y="62" font-size="8.5" fill="${c.dark}">溫帶季風 · 旱田小麥雜糧 · 南水北調受水區</text>
        <line x1="14" y1="74" x2="226" y2="74" stroke="${c.red}" stroke-width="2" stroke-dasharray="4,2"/>
        <text x="120" y="71" font-size="8" font-weight="800" fill="${c.red}" text-anchor="middle">── 秦嶺 — 淮河分界線 ──</text>
        <text x="14" y="94" font-size="9" font-weight="700" fill="${c.forest}">⬇ 南方區域（年雨＞800mm、1月＞0°C不結冰）</text>
        <text x="22" y="110" font-size="8.5" fill="${c.dark}">副熱帶/熱帶季風 · 水田稻米茶葉 · 河運發達</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">東北亞雁行理論：日本（資金技術研發）➔ 臺灣/南韓（精密零組件製造）➔ 東協/中國（市場與組裝）</text>
    `)
  },
  'geography-5': {
    title: '亞洲多元文化區與非洲以赤道為軸對稱氣候帶',
    subtitle: '非洲氣候由赤道向南北依序對稱：熱帶雨林 ➔ 熱帶莽原（動物大遷徙）➔ 熱帶沙漠 ➔ 地中海型氣候',
    caption: '赤道橫貫非洲中部，受間熱帶輻合區 (ITCZ) 與副熱帶高壓交替影響，使非洲氣候與自然景觀呈現標準的南北對稱分布。',
    render: () => frame('非洲赤道對稱氣候帶與亞洲文化', `
      <!-- Left: Africa Symmetric Climate Zones -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="115" y="20" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【非洲以赤道(0°)南北對稱氣候】</text>
        <rect x="20" y="28" width="190" height="18" rx="3" fill="${c.lightBlue}"/><text x="115" y="40" font-size="8" font-weight="700" fill="${c.blue}" text-anchor="middle">北端：地中海型氣候 (夏乾冬雨)</text>
        <rect x="20" y="48" width="190" height="18" rx="3" fill="#faebd0"/><text x="115" y="60" font-size="8" font-weight="700" fill="${c.gold}" text-anchor="middle">北回歸線：撒哈拉熱帶沙漠 (副高籠罩)</text>
        <rect x="20" y="68" width="190" height="18" rx="3" fill="${c.lightGreen}"/><text x="115" y="80" font-size="8" font-weight="800" fill="${c.forest}" text-anchor="middle">── 赤道 0°：剛果盆地熱帶雨林 (午後對流雨) ──</text>
        <rect x="20" y="88" width="190" height="18" rx="3" fill="#faebd0"/><text x="115" y="100" font-size="8" font-weight="700" fill="${c.gold}" text-anchor="middle">東非高原/南北側：熱帶莽原 (夏雨冬乾)</text>
        <rect x="20" y="108" width="190" height="18" rx="3" fill="${c.lightBlue}"/><text x="115" y="120" font-size="8" font-weight="700" fill="${c.blue}" text-anchor="middle">南端好望角：地中海型 + 喀拉哈里沙漠</text>
      </g>
      <!-- Right: Colonial Economy & Asian Landscapes -->
      <g transform="translate(275, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【殖民經濟結構與跨洲文化地景】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.red}">• 非洲殖民遺緒：幾何直線國界（切割部族衝突）</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.dark}">• 單一熱帶栽培業：出口可可/咖啡，進口糧食工業品</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.blue}">• 東非大裂谷：板塊張裂帶，湖泊呈狹長串珠狀</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.gold}">• 南亞季風與宗教：印度教(恆河)、伊斯蘭教、佛教</text>
        <text x="14" y="126" font-size="8.2" fill="${c.muted}">尼羅河定期氾濫孕育古埃及文明（亞斯文高壩改變水文）</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">考場重點：東非雖位於赤道，但因「高原地形海拔高、氣溫降」，未形成熱帶雨林而成為「熱帶莽原氣候」</text>
    `)
  },
  'geography-6': {
    title: '歐洲溫帶海洋性氣候成因、歐盟整合與美洲地形氣候剖面',
    subtitle: '西風帶＋北大西洋暖流＋平原東西敞開＝歐洲全年有雨溫和；美洲西部科迪勒拉山系阻擋西風',
    caption: '歐洲雖緯度偏高，但受北大西洋暖流與西風吹拂，西歐終年溫暖濕潤且港口不凍；南歐地中海沿岸則為「夏乾冬雨」的溫帶地中海型氣候。',
    render: () => frame('歐洲氣候成因與美洲空間架構', `
      <!-- Left: Europe Climate Triad -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【歐洲三大氣候區與暖流西風】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.blue}">① 西歐（溫帶海洋性）：西風帶＋北大西洋暖流</text>
        <text x="22" y="61" font-size="8.2" fill="${c.dark}">➔ 全年有雨、年溫差小、酪農業與混合農業發達</text>
        <text x="14" y="81" font-size="9" font-weight="700" fill="${c.gold}">② 南歐（溫帶地中海型）：夏受副高乾熱、冬受西風雨</text>
        <text x="22" y="97" font-size="8.2" fill="${c.dark}">➔ 夏乾冬雨（雨熱不同期），耐旱橄欖、葡萄、柑橘</text>
        <text x="14" y="118" font-size="9" font-weight="700" fill="${c.forest}">③ 東歐（溫帶大陸性）：距海漸遠，年溫差變大、夏雨</text>
      </g>
      <!-- Right: Americas & Oceania -->
      <g transform="translate(275, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【歐盟超國家組織與美洲山脈】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 歐盟 (EU)：單一市場、申根免簽、歐元區整合</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.dark}">• 北美地形：西洛磯山、中大平原(龍捲風走廊)、東阿帕拉契</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.red}">• 南美安地斯山：垂直氣候分帶（熱帶高地都市多）</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.gold}">• 亞馬孫盆地：全球最大熱帶雨林（地球之肺）</text>
        <text x="14" y="126" font-size="8.2" fill="${c.muted}">拉丁美洲：受西、葡殖民影響，通用拉丁語族並信奉天主教</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">必考判讀：氣候圖中「氣溫最高月卻降水量最少（雨熱反相）」必為溫帶地中海型氣候！</text>
    `)
  },
  'geography-7': {
    title: '全球化跨國供應鏈分工、碳足跡與永續發展目標 (SDGs)',
    subtitle: '研發設計（核心國家）➔ 原料與組裝（半邊陲/邊陲）➔ 全球品牌行銷；溫室效應與公平貿易',
    caption: '跨國企業依各國「比較利益」（技術、勞力成本、關稅與市場）進行全球空間分工；同時也帶來碳排放轉移、熱帶雨林砍伐與血汗工廠議題。',
    render: () => frame('全球供應鏈分工與永續發展', `
      ${[
        ['微笑曲線左端', '研發設計 · 專利核心', '高附加價值（美日歐臺）\n掌握核心晶片與演算法', c.blue, c.lightBlue, 25],
        ['微笑曲線底部', '加工製造 · 勞力組裝', '低附加價值（開發中國家）\n承擔高耗能與環境外部成本', c.gold, c.lightGold, 195],
        ['微笑曲線右端', '品牌行銷 · 售後服務', '高附加價值（全球通路）\n推動綠色碳中和與公平貿易', c.forest, c.lightGreen, 365]
      ].map(([stage, role, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="150" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="75" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${stage}</text>
          <text x="75" y="42" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">${role}</text>
          <line x1="12" y1="50" x2="138" y2="50" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="75" y="74" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">永續解方：縮短食物里程（減少運輸碳足跡）、支持公平貿易認證（保障小農合理收益與環境友善）</text>
    `)
  },
  'geography-9': {
    title: '季風亞洲水稻集約農業、南亞地形三區與東南亞多元文化交匯',
    subtitle: '南亞（喜馬拉雅山、印度河恆河平原、德干高原）vs 東南亞（中南半島縱谷與南洋群島火山地震）',
    caption: '季風亞洲「雨熱同期」適合種植高產量水稻，養活全球逾半人口；東南亞地處太平洋與印度洋十字路口，匯聚印度教、佛教、伊斯蘭教與基督宗教。',
    render: () => frame('季風亞洲農業與南亞東南亞地理', `
      <!-- Left: Monsoon Asia & South Asia -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【季風亞洲水稻與南亞地理】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 水稻自給農業：小農經營、勞力密集、單位面積產量高</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.blue}">• 南亞三季：熱季(3~5月) ➔ 雨季(6~10西南季風) ➔ 涼季</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.dark}">• 作物空間：恆河下游黃麻水稻、德干高原棉花、阿薩姆茶</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.gold}">• 軟體科技：印度英語人才與時差優勢，成全球軟體外包重鎮</text>
      </g>
      <!-- Right: Southeast Asia -->
      <g transform="translate(275, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【東南亞半島與群島 · 文化十字路口】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 中南半島：山河相間、縱谷南北走向（湄公河下游稻米）</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.dark}">• 南洋群島：熱帶雨林氣候、板塊交界多火山地震</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.red}">• 麻六甲海峽：溝通印度洋與太平洋的黃金航道咽喉</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.blue}">• 宗教分布：半島多佛教、印馬汶多伊斯蘭、菲律賓天主教</text>
        <text x="14" y="126" font-size="8.2" fill="${c.muted}">熱帶栽培業：橡膠、油棕、椰子、咖啡（大規模商業出口）</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">關鍵比較：「集約水稻農業」單位面積產量高但每人平均產量低；「商業性穀物農業」機械化粗放，每人產量高</text>
    `)
  },
  'geography-10': {
    title: '北美洲地形東西縱列、商業性專業農業帶與矽谷高科技聚落',
    subtitle: '西部洛磯山脈 ➔ 中部北美大平原（玉米、小麥、酪農專業帶）➔ 東部阿帕拉契山與五大湖工業區',
    caption: '北美洲中部大平原南北暢通無東西向山脈阻擋，冬季北極冷氣團可長驅直入造成暴風雪，春夏冷暖氣團交會易生龍捲風。',
    render: () => frame('北美洲地形剖面與農業科技區位', `
      <!-- Left: E-W Topographic Cross Section -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【北美地形西東剖面與氣候走廊】</text>
        <polygon points="20,115 45,50 75,115" fill="${c.gold}" opacity="0.5" stroke="${c.gold}"/>
        <text x="48" y="45" font-size="8.5" font-weight="800" fill="${c.gold}" text-anchor="middle">西：洛磯山脈</text>
        <rect x="75" y="98" width="90" height="17" fill="${c.lightGreen}" stroke="${c.green}"/>
        <text x="120" y="88" font-size="8.5" font-weight="800" fill="${c.forest}" text-anchor="middle">中：北美大平原</text>
        <polygon points="165,115 190,78 215,115" fill="${c.blue}" opacity="0.4" stroke="${c.blue}"/>
        <text x="190" y="72" font-size="8" font-weight="700" fill="${c.blue}" text-anchor="middle">東：阿帕拉契山</text>
        <text x="115" y="128" font-size="8" font-weight="700" fill="${c.red}" text-anchor="middle">南北無屏障：冬有北極寒流、春有龍捲風</text>
      </g>
      <!-- Right: Commercial Ag & Tech Clusters -->
      <g transform="translate(275, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【大規模商業性農牧帶與產業區位】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 酪農帶：五大湖與東北部（都市人口稠密市場近、氣候冷涼）</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.dark}">• 玉米帶 / 小麥帶：中部平原（地廣人稀、高度機械化粗放）</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.red}">• 西部放牧與地中海農業：雨影區乾燥放牧、加州陽光果蔬</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.blue}">• 高科技矽谷：鄰近史丹佛等名校、創投基金與產業群聚</text>
        <text x="14" y="126" font-size="8.2" fill="${c.muted}">美墨加協定 (USMCA)：區域內免關稅自由貿易與跨國製造分工</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">西風受洛磯山脈阻擋，迎風坡溫哥華西雅圖多雨，背風側內陸形成乾燥雨影區（100°W 等雨量線分界）</text>
    `)
  },
  'geography-11': {
    title: '臺灣四大區域發展差距、中地體系與現代交通網絡',
    subtitle: '北部（政經金融研發）· 中部（精密機械農業）· 南部（重化工業文化古都）· 東部與離島（生態觀光慢活）',
    caption: '高鐵與國道系統形成「臺灣一日生活圈」，產生時空收斂效應；中地體系中，商品等級越高，需要的商閾（基本消費人口）與服務範圍越大。',
    render: () => frame('臺灣區域發展與中地體系', `
      <!-- Left: 4 Regions of Taiwan -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【臺灣四大區域產業定位與特色】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.blue}">• 北部區域：政治金融決策中心、竹科內科高科技研發</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.forest}">• 中部區域：精密機械聚落、花卉蔬果園藝與中科</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.gold}">• 南部區域：石化鋼鐵重工業、南科光電半導體、熱帶農漁</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.purple}">• 東部與離島：斷層縱谷海岸、原民文化與戰地生態觀光</text>
        <text x="14" y="126" font-size="8.2" fill="${c.muted}">國土規劃目標：透過公共建設與地方創生減緩城鄉差距</text>
      </g>
      <!-- Right: Central Place Theory & Transport -->
      <g transform="translate(275, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【中地體系（商閾 vs 商品圈）與交通】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 低級中地（便利商店）：商閾小、商品圈小、數量多分布廣</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.red}">• 高級中地（百貨/醫學中心）：商閾大、商品圈大、數量少</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.forest}">• 營業成立條件：商品圈（實際客源範圍）≥ 商閾（維持生存門檻）</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.gold}">• 運具比較：海運最廉價宜大宗貨、空運最快宜高價輕薄晶片</text>
        <text x="14" y="126" font-size="8.2" fill="${c.muted}">推拉理論：鄉村就業不足為「推力」，都市高薪醫療為「拉力」</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">考場必背：高鐵通車縮短北高時間距離稱為「時空收斂」，但也可能產生資源向大都市集中的「磁吸效應」</text>
    `)
  },
  'geography-12': {
    title: '西亞與中亞乾燥氣候灌溉智慧、波斯灣石油與伊斯蘭文化圈',
    subtitle: '副熱帶高壓與內陸背風乾燥；坎兒井（地下暗渠防蒸發）、兩河流域引水灌溉與海水淡化',
    caption: '西亞波斯灣蘊藏全球最豐富石油（OPEC 石油輸出國組織），卻極度缺乏淡水；中亞阿姆河與錫爾河因過度引水種植棉花，導致鹹海嚴重乾涸鹽鹼化。',
    render: () => frame('西亞中亞乾燥水資源與石油文化', `
      ${[
        ['乾燥水資源調適', '坎兒井 · 滴灌 · 海水淡化', '伊朗高原坎兒井減少蒸發\n以色列精準滴灌、波斯灣淡化廠', c.blue, c.lightBlue, 25],
        ['石油經濟與轉型', '波斯灣 OPEC · 單一經濟風險', '掌握全球能源命脈財富集中\n杜拜發展金融觀光航空樞紐轉型', c.gold, c.lightGold, 195],
        ['伊斯蘭與地緣衝突', '五功 · 清真飲食 · 聖城耶路撒冷', '禁食豬肉與酒、麥加朝聖\n中亞鹹海因引水種棉縮減悲劇', c.forest, c.lightGreen, 365]
      ].map(([title, sub, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="150" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="75" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
          <text x="75" y="42" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${sub}</text>
          <line x1="12" y1="50" x2="138" y2="50" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="75" y="74" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">地緣焦點：西亞為歐亞非三洲陸橋，耶路撒冷同為猶太教、基督教與伊斯蘭教三教聖城，衝突根源複雜</text>
    `)
  },
  'geography-13': {
    title: '澳洲三大地形區（大分水嶺自流井）、紐西蘭冰河火山與太平洋三島群',
    subtitle: '澳洲東南沿海人口精華區 vs 中部大自流盆地（地下水含鹽宜畜牧）vs 西部古老高原（鐵礦出口）',
    caption: '大洋洲位於南半球，季節與北半球相反（1 月盛夏、7 月隆冬）；太平洋島嶼分為美拉尼西亞（大陸島）、密克羅尼西亞與玻里尼西亞（珊瑚礁與火山島）。',
    render: () => frame('澳洲紐西蘭與大洋洲地理架構', `
      <!-- Left: Australia W-E Cross Section -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【澳洲地形西東剖面與氣候人口】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.gold}">• 西部古老高原：副熱帶高壓籠罩大沙漠，富產鐵礦</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.blue}">• 中部大平原（大自流盆地）：背東南信風雨影區</text>
        <text x="22" y="82" font-size="8.2" fill="${c.dark}">➔ 抽取自流井地下水（含鹽分）發展粗放牧羊牧牛</text>
        <text x="14" y="102" font-size="9" font-weight="700" fill="${c.forest}">• 東部大分水嶺與東南沿海：迎東南信風溫暖濕潤</text>
        <text x="22" y="118" font-size="8.2" fill="${c.dark}">➔ 人口最稠密（雪梨、墨爾本）、小麥與牧羊混合農業</text>
      </g>
      <!-- Right: New Zealand & Pacific Islands -->
      <g transform="translate(275, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【紐西蘭西風溫帶海洋與太平洋島群】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 紐西蘭：終年吹西風（溫帶海洋性氣候），畜牧酪農發達</text>
        <text x="22" y="61" font-size="8.2" fill="${c.muted}">北島多火山溫泉（板塊交界）；南島多高山冰河峽灣</text>
        <text x="14" y="81" font-size="9" font-weight="700" fill="${c.forest}">• 太平洋三大島群：美拉尼西亞、密克羅尼西亞、玻里尼西亞</text>
        <text x="14" y="102" font-size="9" font-weight="700" fill="${c.red}">• 氣候變遷危機：吐瓦魯等低窪珊瑚礁環礁面臨海平面上升</text>
        <text x="14" y="122" font-size="8.2" fill="${c.muted}">澳洲特有生物：因長期孤立演化，保有袋鼠、無尾熊、鴨嘴獸</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">考場防呆：澳洲與紐西蘭位於南半球，12~2 月為夏季、6~8 月為冬季；澳洲北端夏季受風帶季移影響多雨</text>
    `)
  },
  // === CIVICS 7 BESPOKE DIAGRAMS ===
  'civics-1': {
    title: '人性尊嚴、多元文化主義（沙拉碗 vs 大熔爐）與性別平權',
    subtitle: '由刻板印象 ➔ 偏見 ➔ 歧視的防制；從同化主義「大熔爐」邁向彼此尊重主體性的「沙拉碗」',
    caption: '形式平等（齊頭式平分）忽略弱勢起點差異；「實質平等（積極平權措施）」依不同需求給予合理差別待遇，真正落實人性尊嚴。',
    render: () => frame('多元文化與實質平權模型', `
      ${[
        ['破除偏見歧視鏈', '刻板印象 ➔ 偏見 ➔ 歧視', '破除性別/族群刻板標籤\n由內在態度偏見轉為不當行為即歧視', c.red, c.lightRed, 25],
        ['多元文化沙拉碗', '大熔爐(同化) vs 沙拉碗(共榮)', '拒絕強勢文化單向同化\n各族群保有獨特文化並平等共存', c.forest, c.lightGreen, 195],
        ['形式 vs 實質平等', '齊頭式平等 vs 立足點平權', '無障礙坡道、保障名額\n依差異給予合理扶助達成真正公平', c.blue, c.lightBlue, 365]
      ].map(([title, sub, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="150" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="75" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
          <text x="75" y="42" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${sub}</text>
          <line x1="12" y1="50" x2="138" y2="50" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="75" y="74" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">性別平權三法：性別平等教育法（校園）、性別平等工作法（職場產假育嬰假）、性騷擾防治法（公共場所）</text>
    `)
  },
  'civics-2': {
    title: '親屬關係（血親 vs 姻親）、學生自治會議規範與志願結社',
    subtitle: '自然血親／法定血親（收養）vs 姻親（血親之配偶、配偶之血親、配偶之血親之配偶）；會議民主程序',
    caption: '注意「血親之配偶之血親」（如親家公、親家母）在民法上不屬於姻親！校園班會遵循動議→附議→討論→表決之民主程序，服從多數、尊重少數。',
    render: () => frame('親屬關係與民主會議程序', `
      <!-- Left: Kinship Types -->
      <g transform="translate(28, 28)">
        <rect width="230" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="115" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【民法親屬分類：血親與姻親】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">① 自然血親：出生血緣（直系：父母子女；旁系：兄弟姊妹）</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.forest}">② 法定血親（擬制血親）：經法院認可「收養」成立</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.blue}">③ 三類姻親：血親之配偶(嫂)、配偶之血親(岳父母)、</text>
        <text x="22" y="103" font-size="8.5" fill="${c.blue}">配偶之血親之配偶(連襟、妯娌)</text>
        <text x="14" y="124" font-size="8.5" font-weight="800" fill="${c.red}">⚠️ 陷阱：夫妻雙方的父母（親家）彼此「無親屬關係」！</text>
      </g>
      <!-- Right: Democratic Meeting & Civic Groups -->
      <g transform="translate(275, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【學生自治會議程序與公共利益】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 提案與動議：書面「提案」需連署；臨時口頭「動議」需附議</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.dark}">• 秩序問題（程序違法）與權宜問題（緊急事故）優先處理</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.forest}">• 表決原則：多數決（但不可用多數決侵害少數人基本人權）</text>
        <text x="14" y="108" font-size="9" font-weight="700" fill="${c.gold}">• 公共財特性：非排他性、共享性（如國防、路燈、治安）</text>
        <text x="14" y="126" font-size="8.2" fill="${c.muted}">搭便車問題：因公共財無法排除未付費者，需由政府課稅提供</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">家庭型態：核心家庭（父母＋未婚子女）、主幹／折衷家庭（祖父母＋父母＋子女三代）、擴大家庭</text>
    `)
  },
  'civics-4': {
    title: '法規範位階金字塔（憲法＞法律＞命令）、比例原則與正當法律程序',
    subtitle: '法律保留原則（限制基本權須有立法院通過之法律依據）與比例原則（適當性、必要性、衡量性）',
    caption: '憲法為國家根本大法，任何法律或行政命令牴觸憲法者無效（由司法院憲法法庭審查）；國家行使公權力必須遵守正當法律程序。',
    render: () => frame('法位階金字塔與法治原則', `
      <!-- Left: Legal Hierarchy Pyramid -->
      <g transform="translate(30, 28)">
        <rect width="225" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="112" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【凱爾森法規範位階金字塔】</text>
        <polygon points="112,32 72,62 152,62" fill="${c.red}" opacity="0.85"/>
        <text x="112" y="55" font-size="9.5" font-weight="800" fill="${c.white}" text-anchor="middle">憲法 (最高)</text>
        <polygon points="70,65 45,95 179,95 154,65" fill="${c.blue}" opacity="0.8"/>
        <text x="112" y="85" font-size="9" font-weight="800" fill="${c.white}" text-anchor="middle">法律 (法·律·條例·通則 / 立法院)</text>
        <polygon points="43,98 20,126 204,126 181,98" fill="${c.forest}" opacity="0.8"/>
        <text x="112" y="116" font-size="8.5" font-weight="800" fill="${c.white}" text-anchor="middle">命令 (規程·規則·細則·辦法 / 行政機關)</text>
      </g>
      <!-- Right: Constitutional Principles -->
      <g transform="translate(275, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【憲法第23條基本人權限制與原則】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 四大目的：防妨礙他人自由、避緊急危難、維持社會秩序、增進公益</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.red}">• 比例原則（禁止用大砲打小鳥）：</text>
        <text x="22" y="82" font-size="8.2" fill="${c.dark}">① 適當性（有助目的）② 必要性（侵害最小）③ 狹義比例</text>
        <text x="14" y="102" font-size="9" font-weight="700" fill="${c.forest}">• 正當法律程序：搜索票由法官核發、保障被告答辯與請律師權</text>
        <text x="14" y="122" font-size="8.2" fill="${c.muted}">憲法基本權：平等權、自由權、受益權(訴訟/請願)、參政權</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">名稱秒判：結尾為「法、律、條例、通則」必為立法院三讀通過之【法律】；結尾為「辦法、細則、規程、標準」為【行政命令】</text>
    `)
  },
  'civics-6': {
    title: '批判性媒體識讀、演算法同溫層效應與綠色倫理消費',
    subtitle: '區分「客觀事實 (Fact)」與「主觀觀點 (Opinion)」；突破資訊繭房與落實社會企業責任 (CSR/ESG)',
    caption: '社群媒體演算法依個人喜好推播訊息，容易形成「同溫層（回音室效應）」加劇社會對立；公共意見（民意）具多元性、變動性與不一致性。',
    render: () => frame('媒體識讀與永續消費決策', `
      ${[
        ['事實 vs 觀點辨識', '客觀可查證 vs 主觀價值判斷', '「今日氣溫32度」為事實\n「今天熱得讓人受不了」為觀點', c.blue, c.lightBlue, 25],
        ['突破演算法同溫層', '過濾氣泡 · 回音室效應', '主動查核第三方事實查核平台\n跨出舒適圈傾聽多元立場論據', c.purple, c.lightPurple, 195],
        ['倫理與永續消費', '選票在消費者手中', '拒絕血汗童工與過度包裝商品\n支持環保標章、減塑與共享經濟', c.forest, c.lightGreen, 365]
      ].map(([title, sub, desc, col, bg, x]) => `
        <g transform="translate(${x}, 28)">
          <rect width="150" height="128" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="75" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
          <text x="75" y="42" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${sub}</text>
          <line x1="12" y1="50" x2="138" y2="50" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="75" y="74" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\\n')[1]}</text>
        </g>
      `).join('')}
      <text x="270" y="186" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">媒體第四權功能：監督政府施政、提供公共資訊、設定公共議題、傳遞文化教育（同時須受自律與法律規範）</text>
    `)
  },
  'civics-7': {
    title: '民法／刑法責任年齡光譜與《少年事件處理法》保護優先精神',
    subtitle: '民法 18 歲成年（完全行為能力）；刑法 14~18 歲減輕其刑；12~18 歲少年事件以「保護處分」代替監獄刑罰',
    caption: '《少年事件處理法》針對 12 歲以上未滿 18 歲之觸法或曝險少年，由少年法院（庭）調查審理，非公開進行並塗銷前科紀錄，協助少年改過自新。',
    render: () => frame('民刑法年齡分級與少年保護', `
      <!-- Top Age Timeline for Civil Law -->
      <g transform="translate(30, 25)">
        <rect width="480" height="58" rx="7" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="240" y="18" font-size="10.5" font-weight="800" fill="${c.blue}" text-anchor="middle">【民法行為能力年齡三階段（契約有效性）】</text>
        <text x="85" y="38" font-size="9" font-weight="800" fill="${c.red}" text-anchor="middle">未滿 7 歲：無行為能力</text>
        <text x="85" y="51" font-size="8" fill="${c.dark}" text-anchor="middle">由法定代理人代為意思表示</text>
        <text x="245" y="38" font-size="9" font-weight="800" fill="${c.gold}" text-anchor="middle">7 ~ 未滿 18 歲：限制行為能力</text>
        <text x="245" y="51" font-size="8" fill="${c.dark}" text-anchor="middle">需法代事前允許或事後承認(除純獲利/日常)</text>
        <text x="410" y="38" font-size="9" font-weight="800" fill="${c.forest}" text-anchor="middle">滿 18 歲：完全行為能力</text>
        <text x="410" y="51" font-size="8" fill="${c.dark}" text-anchor="middle">獨立簽約並負完全民事責任</text>
      </g>
      <!-- Bottom Age Timeline for Criminal & Juvenile Law -->
      <g transform="translate(30, 92)">
        <rect width="480" height="72" rx="7" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="240" y="18" font-size="10.5" font-weight="800" fill="${c.gold}" text-anchor="middle">【刑法責任能力與少年事件處理法（12~18歲以教代罰）】</text>
        <text x="85" y="38" font-size="9" font-weight="800" fill="${c.forest}" text-anchor="middle">未滿 14 歲：不罰 (無責任能力)</text>
        <text x="85" y="52" font-size="8" fill="${c.dark}" text-anchor="middle">12~14歲觸法移送少年法院</text>
        <text x="85" y="64" font-size="8" fill="${c.muted}" text-anchor="middle">僅適用「保護處分」不判刑</text>
        <text x="250" y="38" font-size="9" font-weight="800" fill="${c.blue}" text-anchor="middle">14 ~ 未滿 18 歲：得減輕其刑</text>
        <text x="250" y="52" font-size="8" fill="${c.dark}" text-anchor="middle">原則：訓誡、保護管束、感化教育</text>
        <text x="250" y="64" font-size="8" fill="${c.red}" text-anchor="middle">例外：最輕本刑5年以上重罪才移送檢察官</text>
        <text x="415" y="38" font-size="9" font-weight="800" fill="${c.red}" text-anchor="middle">滿 18 歲：完全刑事責任</text>
        <text x="415" y="52" font-size="8" fill="${c.dark}" text-anchor="middle">80歲以上亦得減輕其刑</text>
        <text x="415" y="64" font-size="8" fill="${c.muted}" text-anchor="middle">少年不得判處死刑或無期徒刑</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">四大少年保護處分：① 訓誡並得假日生活輔導 ② 交付保護管束並得勞動服務 ③ 交付安置輔導 ④ 令入感化教育處所</text>
    `)
  },
  'civics-9': {
    title: '市場供需均衡、外部效果（外部成本 vs 外部效益）與政府干預',
    subtitle: '需求法則（價跌量增）＋ 供給法則（價漲量增）＝ 市場均衡；外部性內部化（課徵污染稅 vs 發放補貼）',
    caption: '「看不見的手（價格機能）」能自動調節供需；但當出現外部成本（如工廠排污未計入售價）或壟斷時會導致市場失靈，需政府介入矯正。',
    render: () => frame('市場供需與外部效果內部化', `
      <!-- Left: Supply and Demand Curve -->
      <g transform="translate(28, 28)">
        <rect width="225" height="135" rx="8" fill="${c.white}" stroke="${c.border}" stroke-width="1.5"/>
        <text x="112" y="20" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【市場供需曲線與均衡價格】</text>
        <line x1="35" y1="115" x2="195" y2="115" stroke="${c.dark}" stroke-width="1.5"/>
        <line x1="35" y1="115" x2="35" y2="30" stroke="${c.dark}" stroke-width="1.5"/>
        <text x="22" y="40" font-size="8.5" font-weight="700" fill="${c.dark}">P價</text>
        <text x="190" y="126" font-size="8.5" font-weight="700" fill="${c.dark}">Q量</text>
        <!-- Demand D (downward) -->
        <line x1="50" y1="40" x2="175" y2="105" stroke="${c.blue}" stroke-width="2.2"/>
        <text x="182" y="106" font-size="9" font-weight="800" fill="${c.blue}">D需求</text>
        <!-- Supply S (upward) -->
        <line x1="50" y1="105" x2="175" y2="40" stroke="${c.red}" stroke-width="2.2"/>
        <text x="182" y="44" font-size="9" font-weight="800" fill="${c.red}">S供給</text>
        <!-- Equilibrium E -->
        <circle cx="112" cy="72" r="4.5" fill="${c.gold}"/>
        <text x="112" y="62" font-size="9" font-weight="800" fill="${c.gold}" text-anchor="middle">均衡點 E</text>
      </g>
      <!-- Right: Externalities -->
      <g transform="translate(273, 28)">
        <rect width="240" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="120" y="22" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">【外部效果內部化：解決市場失靈】</text>
        <text x="14" y="46" font-size="9" font-weight="700" fill="${c.red}">• 外部成本（負外部性）：如工廠排放廢氣廢水、二手菸</text>
        <text x="22" y="62" font-size="8.5" fill="${c.dark}">➔ 政府對策：課徵碳費/空污費、罰款、總量管制</text>
        <text x="14" y="86" font-size="9" font-weight="700" fill="${c.forest}">• 外部效益（正外部性）：如接種疫苗、維護古蹟、種樹</text>
        <text x="22" y="102" font-size="8.5" fill="${c.dark}">➔ 政府對策：提供補助、減免稅賦、智慧財產權保護</text>
        <text x="14" y="124" font-size="8.2" fill="${c.muted}">⚠️「本身價格改變」是點在線上移動；「非價格因素」是整條線平移！</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">公平交易法：規範獨占、聯合哄抬價格與不實廣告，維護市場自由公平競爭與消費者利益</text>
    `)
  },
  'civics-10': {
    title: '地方自治雙軌制（地方行政 vs 地方立法）、財源與社區地方創生',
    subtitle: '均權制度（全國一致歸中央、因地制宜歸地方）；直轄市／縣（市）／鄉（鎮、市）三級地方自治團體',
    caption: '注意「直轄市與市的『區』（如臺北市大安區）」屬於市政府派出的行政機關，區長由市長官派，不屬於具有公法人地位的地方自治團體（山地原住民區除外）！',
    render: () => frame('地方自治架構與地方創生', `
      <!-- Left: Local Government Matrix -->
      <g transform="translate(28, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">【三級地方自治團體：府會制衡】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">① 直轄市（6都）：直轄市政府 ⟷ 直轄市議會</text>
        <text x="14" y="66" font-size="9" font-weight="700" fill="${c.dark}">② 縣／市（13縣3市）：縣(市)政府 ⟷ 縣(市)議會</text>
        <text x="14" y="87" font-size="9" font-weight="700" fill="${c.forest}">③ 鄉／鎮／縣轄市／直轄市山地原住民區：</text>
        <text x="22" y="103" font-size="8.5" fill="${c.forest}">鄉(鎮市區)公所 ⟷ 鄉(鎮市區)民代表會</text>
        <text x="14" y="124" font-size="8.5" font-weight="800" fill="${c.red}">⚠️ 一般「市轄區（如板橋區）」區長官派，非自治團體！</text>
      </g>
      <!-- Right: Local Finance & Placemaking -->
      <g transform="translate(278, 28)">
        <rect width="235" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="117" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【地方財政來源與社區地方創生】</text>
        <text x="14" y="45" font-size="9" font-weight="700" fill="${c.dark}">• 地方稅收：房屋稅、地價稅、土地增值稅、使用牌照稅</text>
        <text x="22" y="61" font-size="8.2" fill="${c.muted}">（所得稅、關稅、貨物稅則屬於「國稅」歸中央）</text>
        <text x="14" y="81" font-size="9" font-weight="700" fill="${c.gold}">• 自籌財源與補助：公共造產、規費、中央統籌分配稅款</text>
        <text x="14" y="102" font-size="9" font-weight="700" fill="${c.blue}">• 社區參與＆地方創生：結合在地風土文化、數位科技與</text>
        <text x="22" y="118" font-size="8.5" fill="${c.blue}">青年返鄉創業，扭轉高齡化與人口外流危機</text>
      </g>
      <text x="270" y="188" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">均權原則（憲法第111條）：事務有全國一致之性質者屬於中央，有因地制宜之性質者屬於地方；爭議由立法院解決</text>
    `)
  }
"""

with open('dist/diagrams.js', 'r', encoding='utf-8') as f:
    orig = f.read()

marker = '};\n\nfunction defaultSubjectDiagram'
pos = orig.find(marker)
if pos == -1:
    marker = '};\n\n// Generic'
    pos = orig.find(marker)
if pos == -1:
    raise RuntimeError("Could not find end of diagrams object in dist/diagrams.js")

svg_44_code = svg_44_code.replace('\\\\n', '\\n')
new_content = orig[:pos] + svg_44_code + '\n' + orig[pos:]
with open('dist/diagrams.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Injected 44 bespoke SVG diagrams into dist/diagrams.js!")
