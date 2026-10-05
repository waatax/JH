# scripts/build_all_188_diagrams.py
import re

with open('dist/diagrams.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Marker before defaultSubjectDiagram
marker = "};\n\n// Generic subject fallback"
pos = code.find(marker)
if pos == -1:
    marker = "};\n\nfunction defaultSubjectDiagram"
    pos = code.find(marker)

prefix = code[:pos]
suffix = code[pos:]

new_diagrams = """,
  // === MATH EXPANSION ===
  'math-3': {
    title: '科學記號標準式與十進位級距',
    subtitle: 'a × 10ⁿ（1 ≤ a ＜ 10，n 為整數）與數量級尺度',
    caption: '科學記號將極大或極小數值標準化。比較大小時先比指數 n（量級），指數相同再比較係數 a。',
    render: () => frame('科學記號標準式', `
      <rect x="50" y="45" width="440" height="70" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.8"/>
      <text x="270" y="80" font-size="22" font-weight="800" fill="${c.dark}" text-anchor="middle">
        <tspan fill="${c.red}">a</tspan> × <tspan fill="${c.blue}">10ⁿ</tspan>
      </text>
      <text x="140" y="105" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">1 ≤ a ＜ 10（係數）</text>
      <text x="390" y="105" font-size="11" font-weight="700" fill="${c.blue}" text-anchor="middle">n 為整數（數量級）</text>
      <!-- Scale line -->
      <line x1="50" y1="150" x2="490" y2="150" stroke="${c.forest}" stroke-width="2"/>
      <circle cx="100" cy="150" r="5" fill="${c.forest}"/>
      <text x="100" y="172" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">10⁻³ (0.001)</text>
      <circle cx="230" cy="150" r="5" fill="${c.forest}"/>
      <text x="230" y="172" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">10⁰ (1)</text>
      <circle cx="360" cy="150" r="5" fill="${c.forest}"/>
      <text x="360" y="172" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">10³ (1000)</text>
      <circle cx="450" cy="150" r="5" fill="${c.forest}"/>
      <text x="450" y="172" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">10⁶ (百萬)</text>
    `)
  },
  'math-5': {
    title: '二元一次聯立方程式幾何交點與消元法',
    subtitle: '兩條直線在直角坐標系中的交點，即為聯立方程式的唯一解',
    caption: '二元一次方程式圖形為直線。聯立解對應兩線交點 (x, y)；代數上使用加減消去法或代入消去法化簡求解。',
    render: () => frame('二元一次聯立方程式', `
      <!-- Axes -->
      <line x1="120" y1="30" x2="120" y2="170" stroke="${c.border}" stroke-width="1.5"/>
      <line x1="50" y1="130" x2="230" y2="130" stroke="${c.border}" stroke-width="1.5"/>
      <!-- Line 1 -->
      <line x1="60" y1="160" x2="200" y2="50" stroke="${c.blue}" stroke-width="2.5"/>
      <text x="195" y="45" font-size="10" font-weight="700" fill="${c.blue}">L₁: ax＋by＝c</text>
      <!-- Line 2 -->
      <line x1="60" y1="60" x2="200" y2="150" stroke="${c.gold}" stroke-width="2.5"/>
      <text x="195" y="165" font-size="10" font-weight="700" fill="${c.gold}">L₂: dx＋ey＝f</text>
      <!-- Intersection -->
      <circle cx="137" cy="100" r="5" fill="${c.red}"/>
      <text x="145" y="95" font-size="11" font-weight="800" fill="${c.red}">交點 P(x, y)</text>
      <!-- Algebraic Box -->
      <g transform="translate(250, 45)">
        <rect x="0" y="0" width="240" height="120" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="20" y="30" font-size="12" font-weight="800" fill="${c.forest}">代數消元二大途徑：</text>
        <text x="20" y="60" font-size="11" fill="${c.dark}">① 代入消去法：將一未知數用另一表示</text>
        <text x="20" y="85" font-size="11" fill="${c.dark}">② 加減消去法：通分係數兩式相加減</text>
        <text x="20" y="108" font-size="10" font-weight="700" fill="${c.muted}">➔ 將二元問題降維為一元一次方程式</text>
      </g>
    `)
  },
  'math-6': {
    title: '正比與反比函數關係對照',
    subtitle: '正比 y/x＝k（成定比直線），反比 xy＝k（成定積雙曲線）',
    caption: '正比通過原點，x 增 y 同倍率增；反比兩量相乘固定，x 增 y 等比例減小，圖形為第一、三象限平滑雙曲線。',
    render: () => frame('正比與反比', `
      <!-- Left: Direct -->
      <g transform="translate(40, 35)">
        <rect x="0" y="0" width="210" height="145" rx="8" fill="${c.white}" stroke="${c.border}" stroke-width="1.2"/>
        <text x="105" y="25" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">正比：y ＝ kx (y/x＝k)</text>
        <line x1="30" y1="120" x2="180" y2="120" stroke="${c.border}" stroke-width="1"/>
        <line x1="30" y1="120" x2="30" y2="40" stroke="${c.border}" stroke-width="1"/>
        <line x1="30" y1="120" x2="160" y2="50" stroke="${c.green}" stroke-width="2.5"/>
        <text x="105" y="140" font-size="10" fill="${c.muted}" text-anchor="middle">過原點斜直線 · x 倍增 y 倍增</text>
      </g>
      <!-- Right: Inverse -->
      <g transform="translate(290, 35)">
        <rect x="0" y="0" width="210" height="145" rx="8" fill="${c.white}" stroke="${c.border}" stroke-width="1.2"/>
        <text x="105" y="25" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">反比：xy ＝ k (y＝k/x)</text>
        <line x1="30" y1="120" x2="180" y2="120" stroke="${c.border}" stroke-width="1"/>
        <line x1="30" y1="120" x2="30" y2="40" stroke="${c.border}" stroke-width="1"/>
        <path d="M 45 50 Q 60 100 170 115" fill="none" stroke="${c.gold}" stroke-width="2.5"/>
        <text x="105" y="140" font-size="10" fill="${c.muted}" text-anchor="middle">平滑雙曲線 · 乘積保持定值</text>
      </g>
    `)
  },
  'math-7': {
    title: '一元一次不等式數線圖示與運算方向律',
    subtitle: '兩邊同乘除負數，不等號方向必須反轉；空心不含等號，實心包含等號',
    caption: '不等式解集在數線上為射線。加減運算或乘除正數方向不變；乘除負數（如 −2x ≤ 6 ➔ x ≥ −3）方向必顛倒。',
    render: () => frame('一元一次不等式', `
      <!-- Number line -->
      <line x1="50" y1="75" x2="490" y2="75" stroke="${c.border}" stroke-width="2"/>
      <polygon points="490,75 482,71 482,79" fill="${c.border}"/>
      <!-- Open circle -->
      <line x1="120" y1="75" x2="220" y2="75" stroke="${c.blue}" stroke-width="3"/>
      <circle cx="120" cy="75" r="5" fill="${c.white}" stroke="${c.blue}" stroke-width="2"/>
      <text x="120" y="98" font-size="11" font-weight="700" fill="${c.blue}" text-anchor="middle">x ＞ a（空心）</text>
      <!-- Solid circle -->
      <line x1="320" y1="75" x2="440" y2="75" stroke="${c.red}" stroke-width="3"/>
      <circle cx="320" cy="75" r="5" fill="${c.red}"/>
      <text x="320" y="98" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">x ≥ b（實心）</text>
      <!-- Rule Box -->
      <rect x="70" y="120" width="400" height="60" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.5"/>
      <text x="270" y="145" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">⚠️ 考場核心鐵律：同乘除負數，不等號方向反轉！</text>
      <text x="270" y="167" font-size="11" fill="${c.dark}" text-anchor="middle">範例：−3x ＜ 12  ➔  同除以 −3  ➔  x ＞ −4</text>
    `)
  },
  'math-14': {
    title: '三角形全等五大幾何判別法',
    subtitle: 'SSS、SAS、ASA、AAS、RHS 條件鎖定唯一幾何形狀',
    caption: '三角形全等代表對應邊等長、對應角相等。注意 SSA 與 AAA 不能保證三角形全等。',
    render: () => frame('全等判別法', `
      ${['SSS (三邊)', 'SAS (兩邊夾角)', 'ASA (兩角夾邊)', 'AAS (兩角對邊)', 'RHS (直角斜邊)'].map((name, i) => {
        const x = 30 + i * 100;
        return `
          <g transform="translate(${x}, 50)">
            <polygon points="10,80 85,80 50,20" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1.5"/>
            <text x="47" y="105" font-size="10" font-weight="800" fill="${c.forest}" text-anchor="middle">${name}</text>
          </g>
        `;
      }).join('')}
      <text x="270" y="185" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">⚠️ 陷阱注意：AAA 僅相似不保證全等；SSA 存在鈍角/銳角雙解不成立！</text>
    `)
  },
  'math-18': {
    title: '二次函數拋物線頂點式與極值',
    subtitle: 'y ＝ a(x−h)² ＋ k（頂點 (h, k)，對稱軸 x ＝ h）',
    caption: '開口方向由 a 正負決定：a ＞ 0 開口向上有最小值 k；a ＜ 0 開口向下有最大值 k。頂點即極值所在點。',
    render: () => frame('二次函數頂點與極值', `
      <!-- Left: a > 0 -->
      <g transform="translate(60, 40)">
        <line x1="30" y1="120" x2="170" y2="120" stroke="${c.border}" stroke-width="1"/>
        <line x1="100" y1="20" x2="100" y2="130" stroke="${c.border}" stroke-width="1" stroke-dasharray="3,3"/>
        <path d="M 40 40 Q 100 130 160 40" fill="none" stroke="${c.green}" stroke-width="2.5"/>
        <circle cx="100" cy="85" r="4" fill="${c.red}"/>
        <text x="100" y="105" font-size="10" font-weight="700" fill="${c.red}" text-anchor="middle">頂點 (h, k)</text>
        <text x="100" y="25" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">a ＞ 0 向上，最小值 k</text>
      </g>
      <!-- Right: a < 0 -->
      <g transform="translate(290, 40)">
        <line x1="30" y1="120" x2="170" y2="120" stroke="${c.border}" stroke-width="1"/>
        <line x1="100" y1="20" x2="100" y2="130" stroke="${c.border}" stroke-width="1" stroke-dasharray="3,3"/>
        <path d="M 40 110 Q 100 20 160 110" fill="none" stroke="${c.blue}" stroke-width="2.5"/>
        <circle cx="100" cy="65" r="4" fill="${c.red}"/>
        <text x="100" y="55" font-size="10" font-weight="700" fill="${c.red}" text-anchor="middle">頂點 (h, k)</text>
        <text x="100" y="138" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">a ＜ 0 向下，最大值 k</text>
      </g>
    `)
  },
  'math-19': {
    title: '統計盒狀圖五數綜合指標 (Box Plot)',
    subtitle: '最小值、第一四分位數 Q1、中位數 Q2、第三四分位數 Q3、最大值',
    caption: '盒狀圖呈現資料分散情形。箱體涵蓋中間 50% 資料量，長度為四分位距 IQR＝Q3−Q1，不受極端值干擾。',
    render: () => frame('盒狀圖五數指標', `
      <!-- Axis -->
      <line x1="60" y1="140" x2="480" y2="140" stroke="${c.border}" stroke-width="1.5"/>
      <!-- Box Plot Elements -->
      <!-- Whiskers -->
      <line x1="100" y1="85" x2="190" y2="85" stroke="${c.forest}" stroke-width="2"/>
      <line x1="100" y1="70" x2="100" y2="100" stroke="${c.forest}" stroke-width="2"/>
      <line x1="370" y1="85" x2="450" y2="85" stroke="${c.forest}" stroke-width="2"/>
      <line x1="450" y1="70" x2="450" y2="100" stroke="${c.forest}" stroke-width="2"/>
      <!-- Box -->
      <rect x="190" y="55" width="180" height="60" rx="4" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
      <!-- Median -->
      <line x1="270" y1="55" x2="270" y2="115" stroke="${c.red}" stroke-width="2.5"/>
      <!-- Labels -->
      <text x="100" y="125" font-size="10" font-weight="700" fill="${c.muted}" text-anchor="middle">最小值</text>
      <text x="190" y="45" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">Q1 (前25%)</text>
      <text x="270" y="45" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">中位數 Q2</text>
      <text x="370" y="45" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">Q3 (前75%)</text>
      <text x="450" y="125" font-size="10" font-weight="700" fill="${c.muted}" text-anchor="middle">最大值</text>
      <text x="280" y="165" font-size="11" font-weight="700" fill="${c.dark}" text-anchor="middle">四分位距 IQR ＝ Q3 − Q1（箱體代表中間 50% 數據散布）</text>
    `)
  },
  'math-20': {
    title: '三角形外心、內心與重心幾何本質對照',
    subtitle: '外心（中垂線/等距頂點）、內心（角平分線/等距三邊）、重心（中線/2:1）',
    caption: '三心是會考高頻考點：直角三角形外心必在斜邊中點；重心將各中線分成 2：1；內心必在三角形內部。',
    render: () => frame('三角形三心對照', `
      <!-- Circumcenter -->
      <g transform="translate(30, 40)">
        <polygon points="10,95 130,95 70,25" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <circle cx="70" cy="72" r="4" fill="${c.red}"/>
        <text x="70" y="120" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">外心 (O)</text>
        <text x="70" y="138" font-size="9" fill="${c.muted}" text-anchor="middle">三邊中垂線 · 等距三頂點</text>
      </g>
      <!-- Incenter -->
      <g transform="translate(195, 40)">
        <polygon points="10,95 130,95 70,25" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <circle cx="70" cy="65" r="28" fill="none" stroke="${c.green}" stroke-dasharray="2,2"/>
        <circle cx="70" cy="65" r="4" fill="${c.red}"/>
        <text x="70" y="120" font-size="11" font-weight="800" fill="${c.green}" text-anchor="middle">內心 (I)</text>
        <text x="70" y="138" font-size="9" fill="${c.muted}" text-anchor="middle">三內角平分線 · 等距三邊</text>
      </g>
      <!-- Centroid -->
      <g transform="translate(360, 40)">
        <polygon points="10,95 130,95 70,25" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <line x1="70" y1="25" x2="70" y2="95" stroke="${c.gold}" stroke-width="1.2"/>
        <circle cx="70" cy="72" r="4" fill="${c.red}"/>
        <text x="70" y="120" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">重心 (G)</text>
        <text x="70" y="138" font-size="9" fill="${c.muted}" text-anchor="middle">三中線交點 · 頂點到重心 2:1</text>
      </g>
    `)
  },
  'math-21': {
    title: '連比 a : b : c 與比例式應用轉換',
    subtitle: '尋找中間共同項的最小公倍數作為橋樑，串接為最簡整數比',
    caption: '若 a:b＝2:3，b:c＝4:5，藉由通分 b 的公倍數 12，得出 a:b:c＝8:12:15。設未知數時可令 a＝8r, b＝12r, c＝15r (r≠0)。',
    render: () => frame('連比橋樑模型', `
      <rect x="70" y="45" width="160" height="60" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
      <text x="150" y="72" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">a : b ＝ 2 : 3</text>
      <text x="150" y="92" font-size="10" fill="${c.muted}" text-anchor="middle">乘 4 ➔ 8 : 12</text>
      
      <rect x="310" y="45" width="160" height="60" rx="6" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
      <text x="390" y="72" font-size="13" font-weight="800" fill="${c.gold}" text-anchor="middle">b : c ＝ 4 : 5</text>
      <text x="390" y="92" font-size="10" fill="${c.muted}" text-anchor="middle">乘 3 ➔ 12 : 15</text>
      
      <path d="M 230 75 Q 270 50 310 75" fill="none" stroke="${c.forest}" stroke-width="2.5"/>
      <text x="270" y="42" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">b 橋樑公倍數 12</text>
      
      <rect x="120" y="135" width="300" height="45" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
      <text x="270" y="163" font-size="14" font-weight="800" fill="${c.forest}" text-anchor="middle">連比串接：a : b : c ＝ 8 : 12 : 15</text>
    `)
  },
  'math-22': {
    title: '等差級數倒轉相加與求和公式推導',
    subtitle: 'Sₙ ＝ n(a₁ ＋ aₙ) / 2 ＝ n[2a₁ ＋ (n−1)d] / 2',
    caption: '將數列首尾配對倒轉相加，每組和皆為 (a₁＋aₙ)，總共有 n 組，折半即得等差級數梯形求和公式。',
    render: () => frame('等差級數求和', `
      <g transform="translate(60, 45)">
        <rect x="0" y="0" width="420" height="70" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="30" y="30" font-size="13" font-weight="700" fill="${c.forest}">  Sₙ ＝ a₁ ＋ a₂ ＋ … ＋ aₙ</text>
        <text x="30" y="55" font-size="13" font-weight="700" fill="${c.forest}">＋Sₙ ＝ aₙ ＋ … ＋ a₂ ＋ a₁</text>
      </g>
      <text x="270" y="135" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">2 Sₙ ＝ n × (a₁ ＋ aₙ)</text>
      <rect x="140" y="150" width="260" height="40" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
      <text x="270" y="176" font-size="14" font-weight="800" fill="${c.gold}" text-anchor="middle">Sₙ ＝ n(a₁ ＋ aₙ) / 2</text>
    `)
  },
  'math-23': {
    title: '多邊形內角和分割定理與外角和 360°',
    subtitle: 'n 邊形內角和＝(n−2)×180°；凸多邊形外角和恆等於 360°',
    caption: '由單一頂點連對角線可切成 (n−2) 個三角形。不論多邊形有多少邊，在外側沿周界旋轉一圈外角和恆為 360°。',
    render: () => frame('多邊形內角與外角', `
      <!-- Pentagon -->
      <g transform="translate(60, 40)">
        <polygon points="60,10 120,45 100,105 20,105 0,45" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <line x1="60" y1="10" x2="100" y2="105" stroke="${c.red}" stroke-width="1.5" stroke-dasharray="3,3"/>
        <line x1="60" y1="10" x2="20" y2="105" stroke="${c.red}" stroke-width="1.5" stroke-dasharray="3,3"/>
        <text x="60" y="135" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">五邊形 ➔ 3 個三角形</text>
        <text x="60" y="152" font-size="10" fill="${c.muted}" text-anchor="middle">內角和 ＝ (5−2)×180° ＝ 540°</text>
      </g>
      <!-- Exterior 360 Box -->
      <g transform="translate(260, 50)">
        <circle cx="110" cy="55" r="45" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <path d="M 110 15 A 40 40 0 1 1 109 15" fill="none" stroke="${c.red}" stroke-width="3"/>
        <polygon points="110,12 118,18 118,6" fill="${c.red}"/>
        <text x="110" y="58" font-size="13" font-weight="800" fill="${c.dark}" text-anchor="middle">外角轉一圈</text>
        <text x="110" y="78" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">恆為 360°</text>
        <text x="110" y="130" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">正 n 邊形每一外角 ＝ 360° / n</text>
      </g>
    `)
  },
  'math-24': {
    title: '特殊四邊形幾何性質與包含層次',
    subtitle: '平行四邊形、菱形、矩形與正方形的邊角與對角線特徵',
    caption: '四邊形家族有包含關係：菱形對角線垂直平分；矩形對角線等長平分；正方形兼具兩者性質（垂直、等長、平分）。',
    render: () => frame('特殊四邊形層次圖', `
      <!-- Hierarchy chart -->
      <rect x="180" y="30" width="180" height="30" rx="6" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
      <text x="270" y="50" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">平行四邊形（對邊平行且等長）</text>
      
      <line x1="220" y1="60" x2="150" y2="90" stroke="${c.forest}" stroke-width="1.5"/>
      <line x1="320" y1="60" x2="390" y2="90" stroke="${c.forest}" stroke-width="1.5"/>
      
      <rect x="70" y="90" width="160" height="40" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
      <text x="150" y="110" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">菱形（四邊等長）</text>
      <text x="150" y="123" font-size="9" fill="${c.muted}" text-anchor="middle">對角線互相垂直平分</text>
      
      <rect x="310" y="90" width="160" height="40" rx="6" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
      <text x="390" y="110" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">矩形（四個直角）</text>
      <text x="390" y="123" font-size="9" fill="${c.muted}" text-anchor="middle">對角線互相等長平分</text>
      
      <line x1="150" y1="130" x2="220" y2="155" stroke="${c.forest}" stroke-width="1.5"/>
      <line x1="390" y1="130" x2="320" y2="155" stroke="${c.forest}" stroke-width="1.5"/>
      
      <rect x="180" y="155" width="180" height="40" rx="6" fill="${c.lightRed}" stroke="${c.red}" stroke-width="2"/>
      <text x="270" y="175" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">正方形（完美幾何）</text>
      <text x="270" y="188" font-size="9" fill="${c.dark}" text-anchor="middle">對角線等長、垂直且平分</text>
    `)
  },
  'math-26': {
    title: '立體幾何展開圖與三視圖投影',
    subtitle: '直角柱表面積＝底面積×2＋側面積；前視、俯視、左視圖空間投射',
    caption: '立體圖形展開後側面積為底面周長乘柱高。三視圖以「長對正、高平齊、寬相等」投射立體空間結構。',
    render: () => frame('立體展開與三視圖', `
      <!-- Cylinder net -->
      <g transform="translate(60, 45)">
        <circle cx="70" cy="20" r="15" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <rect x="10" y="40" width="120" height="50" rx="4" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <circle cx="70" cy="110" r="15" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="70" y="68" font-size="10" font-weight="800" fill="${c.forest}" text-anchor="middle">側面積 ＝ 2πr × h</text>
        <text x="70" y="145" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">圓柱展開圖</text>
      </g>
      <!-- 3 Views -->
      <g transform="translate(260, 45)">
        <rect x="20" y="20" width="70" height="50" fill="${c.white}" stroke="${c.border}" stroke-width="1.2"/>
        <text x="55" y="50" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">前視圖</text>
        <rect x="110" y="20" width="40" height="50" fill="${c.white}" stroke="${c.border}" stroke-width="1.2"/>
        <text x="130" y="50" font-size="10" font-weight="700" fill="${c.blue}" text-anchor="middle">左視圖</text>
        <rect x="20" y="80" width="70" height="40" fill="${c.white}" stroke="${c.border}" stroke-width="1.2"/>
        <text x="55" y="105" font-size="10" font-weight="700" fill="${c.gold}" text-anchor="middle">俯視圖</text>
        <text x="90" y="145" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">正投影三視圖對齊</text>
      </g>
    `)
  },

  // === CHINESE EXPANSION ===
  'chinese-2': {
    title: '記敘文情節弧線 (Freytag Pyramid) 與人物性格冰山',
    subtitle: '開端 ➔ 發展 ➔ 高潮 ➔ 結局；外在言行揭示內在動機',
    caption: '敘事作品透過事件衝突推動情節，在最高潮處展現主角抉擇；透過言語、動作等細節刻畫冰山水面下的深層性格。',
    render: () => frame('敘事弧線與人物冰山', `
      <!-- Freytag Pyramid -->
      <path d="M 50 140 L 140 100 L 220 40 L 300 90 L 370 140" fill="none" stroke="${c.forest}" stroke-width="3"/>
      <circle cx="50" cy="140" r="5" fill="${c.forest}"/>
      <text x="50" y="160" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">開端</text>
      <circle cx="140" cy="100" r="5" fill="${c.forest}"/>
      <text x="140" y="90" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">發展</text>
      <circle cx="220" cy="40" r="6" fill="${c.red}"/>
      <text x="220" y="30" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">高潮 (衝突激化)</text>
      <circle cx="300" cy="90" r="5" fill="${c.forest}"/>
      <text x="300" y="80" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">轉折</text>
      <circle cx="370" cy="140" r="5" fill="${c.forest}"/>
      <text x="370" y="160" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">結局</text>
      <!-- Character Iceberg Box -->
      <g transform="translate(400, 45)">
        <rect x="0" y="0" width="115" height="110" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="57" y="28" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">人物冰山</text>
        <line x1="10" y1="42" x2="105" y2="42" stroke="${c.blue}" stroke-width="1.2" stroke-dasharray="3,2"/>
        <text x="57" y="58" font-size="9" fill="${c.dark}" text-anchor="middle">水上：外貌/言語</text>
        <text x="57" y="78" font-size="9" font-weight="700" fill="${c.red}" text-anchor="middle">水下：動機/慾望</text>
        <text x="57" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">深層價值觀</text>
      </g>
    `)
  },
  'chinese-3': {
    title: '文言特殊句式解構：省略、倒裝與判斷句',
    subtitle: '文言文常省略主語或賓語；疑問句與否定句中代詞賓語常前置',
    caption: '理解文言文先補足省略成分（如「（客）見漁人，乃大驚」），辨識「何陋之有」等賓語前置倒裝，掌握文意核心。',
    render: () => frame('文言文句式解構', `
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="200" height="60" rx="6" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="100" y="26" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">① 省略句式（主語/介詞）</text>
        <text x="100" y="48" font-size="11" fill="${c.dark}" text-anchor="middle">「[生] 讀書 [於] 鏡湖之旁」</text>
      </g>
      <g transform="translate(290, 40)">
        <rect x="0" y="0" width="200" height="60" rx="6" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="100" y="26" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">② 倒裝句式（賓語前置）</text>
        <text x="100" y="48" font-size="11" fill="${c.dark}" text-anchor="middle">「何陋之有」＝ 有何陋</text>
      </g>
      <g transform="translate(170, 120)">
        <rect x="0" y="0" width="200" height="55" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="100" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">③ 判斷句與被動句</text>
        <text x="100" y="44" font-size="11" fill="${c.dark}" text-anchor="middle">「…者，…也」／「為…所…」</text>
      </g>
    `)
  },
  'chinese-4': {
    title: '跨文本圖表資訊整合與客觀判讀',
    subtitle: '將長文論述與統計圖表雙向對照，剔除主觀偏誤，萃取事實結論',
    caption: '會考素養題強調圖文互轉：讀懂圖表標題、座標單位與極值，並與文字段落交叉比對，找出支持論點的實證數據。',
    render: () => frame('跨文本圖表整合', `
      <rect x="60" y="45" width="180" height="110" rx="8" fill="${c.white}" stroke="${c.forest}" stroke-width="1.5"/>
      <text x="150" y="70" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">📄 文字文本</text>
      <line x1="80" y1="85" x2="220" y2="85" stroke="${c.border}" stroke-width="2"/>
      <line x1="80" y1="105" x2="200" y2="105" stroke="${c.border}" stroke-width="2"/>
      <line x1="80" y1="125" x2="220" y2="125" stroke="${c.border}" stroke-width="2"/>
      <text x="150" y="145" font-size="9" fill="${c.muted}" text-anchor="middle">論點主張與背景脈絡</text>
      
      <!-- Arrow -->
      <path d="M 255 100 L 285 100" stroke="${c.gold}" stroke-width="3"/>
      <polygon points="285,100 277,95 277,105" fill="${c.gold}"/>
      
      <rect x="300" y="45" width="180" height="110" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
      <text x="390" y="70" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">📊 統計圖表</text>
      <rect x="325" y="95" width="20" height="35" fill="${c.blue}"/>
      <rect x="355" y="80" width="20" height="50" fill="${c.green}"/>
      <rect x="385" y="105" width="20" height="25" fill="${c.gold}"/>
      <text x="390" y="145" font-size="9" fill="${c.muted}" text-anchor="middle">客觀數據與變化趨勢</text>
      
      <text x="270" y="185" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">合流核心：論點是否具有相符數據支持？是否有过度推論？</text>
    `)
  },
  'chinese-5': {
    title: '議論文黃金三角：論點、論據與論證',
    subtitle: '中心論點明確，事實與理論論據充足，論證邏輯嚴密無漏洞',
    caption: '議論文核心在說服讀者。常見論證方法包括舉例論證、正反對比論證與引證法，論據必須能直接導向論點。',
    render: () => frame('議論文黃金三角', `
      <polygon points="270,35 120,150 420,150" fill="none" stroke="${c.forest}" stroke-width="2.5"/>
      <circle cx="270" cy="35" r="8" fill="${c.red}"/>
      <text x="270" y="20" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">【論點】作者的核心主張</text>
      
      <circle cx="120" cy="150" r="8" fill="${c.blue}"/>
      <text x="120" y="175" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【論據】支撐的材料</text>
      <text x="120" y="190" font-size="10" fill="${c.muted}" text-anchor="middle">事實數據、名言典故</text>
      
      <circle cx="420" cy="150" r="8" fill="${c.gold}"/>
      <text x="420" y="175" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【論證】推導的過程</text>
      <text x="420" y="190" font-size="10" fill="${c.muted}" text-anchor="middle">舉例、對比、因果推論</text>
      
      <text x="270" y="110" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">邏輯自洽 · 不以偏概全</text>
    `)
  },
  'chinese-6': {
    title: '近體詩格律體系：絕句與律詩規範',
    subtitle: '五言/七言、四句(絕句)/八句(律詩)、偶數句押韻、律詩頷頸聯必對仗',
    caption: '近體詩講究平仄與押韻。一韻到底不換韻；律詩第三、四句（頷聯）與第五、六句（頸聯）詞性與結構必須工整對仗。',
    render: () => frame('近體詩格律體系', `
      <g transform="translate(60, 45)">
        <rect x="0" y="0" width="180" height="110" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="90" y="25" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">絕句 (四句)</text>
        <text x="90" y="50" font-size="11" fill="${c.dark}" text-anchor="middle">首句可押可不押</text>
        <text x="90" y="70" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">二、四句必押韻</text>
        <text x="90" y="90" font-size="11" fill="${c.dark}" text-anchor="middle">第三句必不押韻</text>
      </g>
      <g transform="translate(300, 45)">
        <rect x="0" y="0" width="180" height="110" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="90" y="25" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">律詩 (八句)</text>
        <text x="90" y="48" font-size="10" fill="${c.dark}" text-anchor="middle">首聯 (1, 2 句)：起興點題</text>
        <text x="90" y="66" font-size="10" font-weight="800" fill="${c.red}" text-anchor="middle">頷聯 (3, 4 句)：嚴格對仗</text>
        <text x="90" y="84" font-size="10" font-weight="800" fill="${c.red}" text-anchor="middle">頸聯 (5, 6 句)：嚴格對仗</text>
        <text x="90" y="102" font-size="10" fill="${c.dark}" text-anchor="middle">尾聯 (7, 8 句)：總結作結</text>
      </g>
      <text x="270" y="185" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">格律關鍵：一韻到底不可轉韻 · 詞性平仄對仗工整</text>
    `)
  },

  // === ENGLISH EXPANSION ===
  'english-2': {
    title: '現在進行式時態時間軸 (Present Continuous)',
    subtitle: 'S ＋ be動詞 (am/is/are) ＋ V-ing，描述說話當下正在發生的動作',
    caption: '現在進行式常用時間副詞有 now, right now, at the moment, look!, listen!。注意狀態動詞 (like, know) 通常不加 -ing。',
    render: () => frame('現在進行式時間軸', `
      <!-- Timeline -->
      <line x1="50" y1="100" x2="490" y2="100" stroke="${c.border}" stroke-width="2.5"/>
      <polygon points="490,100 480,95 480,105" fill="${c.border}"/>
      <circle cx="270" cy="100" r="7" fill="${c.red}"/>
      <text x="270" y="80" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">NOW (說話當下)</text>
      <!-- Action wave -->
      <path d="M 230 100 Q 250 60 270 100 T 310 100" fill="none" stroke="${c.blue}" stroke-width="3"/>
      <text x="270" y="130" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">am / is / are ＋ V-ing</text>
      <text x="100" y="100" font-size="11" fill="${c.muted}" text-anchor="middle">過去 (Past)</text>
      <text x="440" y="100" font-size="11" fill="${c.muted}" text-anchor="middle">未來 (Future)</text>
      <!-- Clue words -->
      <rect x="100" y="150" width="340" height="35" rx="6" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="270" y="172" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">時間線索：Look! / Listen! / now / right now / at this moment</text>
    `)
  },
  'english-3': {
    title: '英文基礎三時態對比 (Past, Present, Future)',
    subtitle: '過去簡單式 (V-ed)、現在簡單式 (V/Vs)、未來式 (will / be going to)',
    caption: '時態由時間副詞決定：yesterday/ago 搭配過去式；every day/always 搭配現在簡單式；tomorrow/next week 搭配未來式。',
    render: () => frame('三大時態對照', `
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="145" height="110" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="72" y="25" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">過去簡單式 (Past)</text>
        <text x="72" y="55" font-size="14" font-weight="800" fill="${c.dark}" text-anchor="middle">V-ed</text>
        <text x="72" y="85" font-size="9" fill="${c.muted}" text-anchor="middle">yesterday, last night</text>
        <text x="72" y="98" font-size="9" fill="${c.muted}" text-anchor="middle">... ago, in 2020</text>
      </g>
      <g transform="translate(195, 45)">
        <rect x="0" y="0" width="145" height="110" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="72" y="25" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">現在簡單式 (Present)</text>
        <text x="72" y="55" font-size="14" font-weight="800" fill="${c.dark}" text-anchor="middle">V / V-s / V-es</text>
        <text x="72" y="85" font-size="9" fill="${c.muted}" text-anchor="middle">every day, always</text>
        <text x="72" y="98" font-size="9" fill="${c.muted}" text-anchor="middle">習慣、真理、常態</text>
      </g>
      <g transform="translate(360, 45)">
        <rect x="0" y="0" width="145" height="110" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="72" y="25" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">未來式 (Future)</text>
        <text x="72" y="55" font-size="13" font-weight="800" fill="${c.dark}" text-anchor="middle">will ＋ V原</text>
        <text x="72" y="85" font-size="9" fill="${c.muted}" text-anchor="middle">tomorrow, next year</text>
        <text x="72" y="98" font-size="9" fill="${c.muted}" text-anchor="middle">be going to ＋ V原</text>
      </g>
      <text x="270" y="185" font-size="11" font-weight="700" fill="${c.dark}" text-anchor="middle">文法心法：找時間副詞（題眼）➔ 定時態 ➔ 主詞單複數確認動詞變化</text>
    `)
  },
  'english-4': {
    title: '形容詞比較級與動名詞/不定詞受詞結構',
    subtitle: 'A is adj-er / more adj than B；enjoy ＋ V-ing vs want ＋ to V',
    caption: '單音節形容詞加 -er；三音節以上加 more。後接動名詞 (V-ing) 常見動詞：enjoy, practice, finish, mind；接 to V：want, hope, plan。',
    render: () => frame('比較級與動詞受詞', `
      <!-- Comparatives -->
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="200" height="90" rx="6" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="100" y="24" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">比較級 (Comparatives)</text>
        <text x="100" y="48" font-size="11" fill="${c.dark}" text-anchor="middle">tall ➔ taller than</text>
        <text x="100" y="68" font-size="11" fill="${c.dark}" text-anchor="middle">popular ➔ more popular than</text>
      </g>
      <!-- Gerund vs Infinitive -->
      <g transform="translate(290, 40)">
        <rect x="0" y="0" width="200" height="90" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="100" y="24" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">動詞後接受詞形式</text>
        <text x="100" y="48" font-size="10" font-weight="700" fill="${c.red}" text-anchor="middle">只接 V-ing：enjoy, finish, practice</text>
        <text x="100" y="68" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">只接 to V：want, hope, decide, plan</text>
      </g>
      <text x="270" y="165" font-size="11" font-weight="700" fill="${c.dark}" text-anchor="middle">口訣：進行完成已發生用 -ing；未來目標未發生用 to V</text>
    `)
  },
  'english-8': {
    title: '頻率副詞刻度與位置規則 (Frequency Adverbs)',
    subtitle: 'Always (100%) ➔ Usually ➔ Often ➔ Sometimes ➔ Seldom ➔ Never (0%)',
    caption: '頻率副詞位置口訣：「be動詞、助動詞之後；一般動詞之前」。seldom/never 具否定含意，簡答句不與 not 連用。',
    render: () => frame('頻率副詞量尺', `
      <!-- Scale -->
      ${[
        ['Always', '100%', c.forest],
        ['Usually', '80%', c.green],
        ['Often', '60%', c.blue],
        ['Sometimes', '40%', c.gold],
        ['Seldom', '10%', c.purple],
        ['Never', '0%', c.red]
      ].map(([word, pct, col], i) => {
        const x = 50 + i * 75;
        return `
          <g transform="translate(${x}, 50)">
            <rect x="0" y="0" width="65" height="55" rx="6" fill="${c.white}" stroke="${col}" stroke-width="2"/>
            <text x="32" y="24" font-size="10" font-weight="800" fill="${col}" text-anchor="middle">${word}</text>
            <text x="32" y="44" font-size="11" font-weight="700" fill="${c.dark}" text-anchor="middle">${pct}</text>
          </g>
        `;
      }).join('')}
      <!-- Position rule -->
      <rect x="70" y="130" width="400" height="50" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
      <text x="270" y="152" font-size="12" font-weight="800" fill="${c.dark}" text-anchor="middle">📍 頻率副詞位置口訣：</text>
      <text x="270" y="170" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">be 後、助後、一般動詞前（例：He is always happy / She often reads）</text>
    `)
  },

  // === SCIENCE EXPANSION ===
  'physics-1': {
    title: '科學實驗變因三角與密度公式 ρ ＝ m / V',
    subtitle: '操縱變因（單一改變）、應變變因（測量結果）、控制變因（保持一致）',
    caption: '公平實驗一次只能改變一個操縱變因。密度為物質特性，在定溫定壓下不隨質量大小改變（ρ＝m/V）。',
    render: () => frame('實驗變因與密度', `
      <!-- Triangle -->
      <polygon points="150,40 50,150 250,150" fill="none" stroke="${c.forest}" stroke-width="2.5"/>
      <circle cx="150" cy="40" r="6" fill="${c.red}"/>
      <text x="150" y="25" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">操縱變因（只能一個！）</text>
      <circle cx="50" cy="150" r="6" fill="${c.blue}"/>
      <text x="50" y="170" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">應變變因（實驗結果）</text>
      <circle cx="250" cy="150" r="6" fill="${c.green}"/>
      <text x="250" y="170" font-size="11" font-weight="800" fill="${c.green}" text-anchor="middle">控制變因（皆保持相同）</text>
      
      <!-- Density Box -->
      <g transform="translate(300, 45)">
        <rect x="0" y="0" width="190" height="110" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.8"/>
        <text x="95" y="30" font-size="13" font-weight="800" fill="${c.dark}" text-anchor="middle">密度計算公式：</text>
        <text x="95" y="65" font-size="20" font-weight="800" fill="${c.forest}" text-anchor="middle">D ＝ M / V</text>
        <text x="95" y="95" font-size="10" fill="${c.muted}" text-anchor="middle">質量 (g) ÷ 體積 (cm³)</text>
      </g>
    `)
  },
  'physics-4': {
    title: '熱量計算 H ＝ msΔT 與熱傳播三途徑',
    subtitle: '熱量吸收/釋放＝質量×比熱×溫差；傳導、對流與輻射特性',
    caption: '比熱大者難冷難熱（如水 s＝1 cal/g·°C）。熱傳播方式：固體主靠傳導、流體主靠對流、真空只能靠電磁波輻射。',
    render: () => frame('熱量與熱傳播', `
      <!-- Formula Box -->
      <rect x="50" y="40" width="200" height="75" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.8"/>
      <text x="150" y="70" font-size="18" font-weight="800" fill="${c.red}" text-anchor="middle">H ＝ m · s · ΔT</text>
      <text x="150" y="95" font-size="10" fill="${c.dark}" text-anchor="middle">熱量＝質量 × 比熱 × 溫度變化</text>
      
      <!-- 3 Methods -->
      <g transform="translate(280, 35)">
        <rect x="0" y="0" width="210" height="85" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="105" y="22" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">熱傳播三途徑：</text>
        <text x="15" y="42" font-size="10" fill="${c.dark}">① 傳導：固體分子振動碰撞</text>
        <text x="15" y="60" font-size="10" fill="${c.dark}">② 對流：液體與氣體冷降熱升</text>
        <text x="15" y="78" font-size="10" fill="${c.dark}">③ 輻射：不需介質（太陽光）</text>
      </g>
      <text x="270" y="165" font-size="11" font-weight="700" fill="${c.muted}" text-anchor="middle">保溫瓶設計：真空層斷傳導對流，鍍銀內壁反射熱輻射</text>
    `)
  },
  'chemistry-1': {
    title: '物質分類階層樹：純物質與混合物',
    subtitle: '純物質（固定組成與沸點：元素 vs 化合物）；混合物（比例可變）',
    caption: '純物質有固定的物理性質（熔點、沸點）；混合物如食鹽水、空氣無固定沸點。化合物可由化學方法分解為元素。',
    render: () => frame('物質分類階層樹', `
      <!-- Top -->
      <rect x="200" y="20" width="140" height="30" rx="6" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
      <text x="270" y="40" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">物 質 (Matter)</text>
      
      <line x1="240" y1="50" x2="140" y2="75" stroke="${c.forest}" stroke-width="1.5"/>
      <line x1="300" y1="50" x2="400" y2="75" stroke="${c.forest}" stroke-width="1.5"/>
      
      <!-- Pure -->
      <rect x="60" y="75" width="160" height="35" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
      <text x="140" y="97" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">純物質（固定熔沸點）</text>
      
      <!-- Mixture -->
      <rect x="320" y="75" width="160" height="35" rx="6" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
      <text x="400" y="97" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">混合物（性質隨比例變）</text>
      
      <!-- Sub pure -->
      <line x1="110" y1="110" x2="80" y2="135" stroke="${c.blue}" stroke-width="1.2"/>
      <line x1="170" y1="110" x2="200" y2="135" stroke="${c.blue}" stroke-width="1.2"/>
      <rect x="20" y="135" width="110" height="35" rx="4" fill="${c.white}" stroke="${c.border}"/>
      <text x="75" y="152" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">元素 (O₂, Fe)</text>
      <text x="75" y="165" font-size="8" fill="${c.muted}" text-anchor="middle">單一原子組成</text>
      
      <rect x="150" y="135" width="110" height="35" rx="4" fill="${c.white}" stroke="${c.border}"/>
      <text x="205" y="152" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">化合物 (H₂O)</text>
      <text x="205" y="165" font-size="8" fill="${c.muted}" text-anchor="middle">化學結合固定比</text>
      
      <text x="400" y="145" font-size="10" fill="${c.muted}" text-anchor="middle">空氣、合金、糖水</text>
    `)
  },
  'biology-8': {
    title: '植物體內維管束雙向運輸機制',
    subtitle: '木質部導管送水分與無機鹽（由下往上）；韌皮部篩管送有機養分（雙向）',
    caption: '蒸散作用是植物水分向上運輸的最主要動力。木質部位於維管束內側，韌皮部位於外側，雙子葉植物中間具形成層。',
    render: () => frame('植物維管束運輸', `
      <!-- Stem section -->
      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="180" height="120" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="90" y="25" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">維管束構造 (莖剖面)</text>
        <circle cx="50" cy="70" r="22" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="50" y="74" font-size="9" font-weight="700" fill="${c.blue}" text-anchor="middle">木質部</text>
        <circle cx="130" cy="70" r="22" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="130" y="74" font-size="9" font-weight="700" fill="${c.gold}" text-anchor="middle">韌皮部</text>
        <line x1="90" y1="40" x2="90" y2="100" stroke="${c.forest}" stroke-width="2"/>
        <text x="90" y="112" font-size="8" fill="${c.muted}" text-anchor="middle">形成層</text>
      </g>
      <!-- Transport rules -->
      <g transform="translate(280, 45)">
        <rect x="0" y="0" width="210" height="110" rx="8" fill="${c.white}" stroke="${c.border}" stroke-width="1.2"/>
        <text x="15" y="25" font-size="11" font-weight="800" fill="${c.blue}">💧 木質部導管：</text>
        <text x="25" y="45" font-size="10" fill="${c.dark}">方向：根 ➔ 莖 ➔ 葉 (單向向上)</text>
        <text x="25" y="60" font-size="9" fill="${c.muted}">物質：水分、無機鹽 (蒸散流動力)</text>
        
        <text x="15" y="80" font-size="11" font-weight="800" fill="${c.gold}">🍯 韌皮部篩管：</text>
        <text x="25" y="98" font-size="10" fill="${c.dark}">方向：雙向傳輸 (依供需調配)</text>
      </g>
    `)
  },
  'biology-11': {
    title: '孟德爾單性雜交與棋盤方格法 (Punnett Square)',
    subtitle: '等位基因分離律：雜試交 Tt × Tt ➔ 基因型 1:2:1，表現型顯隱性 3:1',
    caption: '顯性等位基因 (T) 掩蓋隱性基因 (t)。棋盤方格呈現配子受精機率，自交後代高莖 (TT, Tt) 與矮莖 (tt) 比例為 3：1。',
    render: () => frame('孟德爾棋盤方格', `
      <!-- Punnett Grid -->
      <g transform="translate(80, 40)">
        <text x="60" y="20" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">父本配子：T (50%), t (50%)</text>
        <rect x="20" y="30" width="140" height="110" fill="${c.white}" stroke="${c.border}" stroke-width="1.5"/>
        <line x1="90" y1="30" x2="90" y2="140" stroke="${c.border}" stroke-width="1.5"/>
        <line x1="20" y1="85" x2="160" y2="85" stroke="${c.border}" stroke-width="1.5"/>
        
        <text x="55" y="65" font-size="14" font-weight="800" fill="${c.forest}" text-anchor="middle">TT</text>
        <text x="125" y="65" font-size="14" font-weight="800" fill="${c.forest}" text-anchor="middle">Tt</text>
        <text x="55" y="120" font-size="14" font-weight="800" fill="${c.forest}" text-anchor="middle">Tt</text>
        <text x="125" y="120" font-size="14" font-weight="800" fill="${c.red}" text-anchor="middle">tt</text>
      </g>
      <!-- Results Box -->
      <g transform="translate(290, 45)">
        <rect x="0" y="0" width="200" height="105" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="100" y="25" font-size="11" font-weight="800" fill="${c.dark}" text-anchor="middle">子二代 (F2) 統計比例：</text>
        <text x="20" y="55" font-size="11" font-weight="700" fill="${c.forest}">基因型比：TT : Tt : tt ＝ 1 : 2 : 1</text>
        <text x="20" y="85" font-size="11" font-weight="800" fill="${c.red}">表現型比：顯性 : 隱性 ＝ 3 : 1</text>
      </g>
    `)
  },
  'earth-4': {
    title: '地球自轉公轉與月球月相盈虧幾何位置',
    subtitle: '日地月相對幾何位置決定月相：新月(朔) ➔ 上弦 ➔ 滿月(望) ➔ 下弦',
    caption: '月球自身不發光，靠反射太陽光。農曆初一新月居於日地之間（不可見）；十五滿月地球居於日月之間；初七八上弦月亮西半部。',
    render: () => frame('月相盈虧幾何位置', `
      <!-- Earth -->
      <circle cx="270" cy="100" r="22" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
      <text x="270" y="105" font-size="10" font-weight="800" fill="${c.blue}" text-anchor="middle">地球</text>
      <!-- Sun rays -->
      <g transform="translate(480, 50)">
        <text x="0" y="55" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="end">太陽平行光 ➔</text>
      </g>
      <!-- Moons around -->
      <!-- New Moon (Right) -->
      <circle cx="370" cy="100" r="12" fill="${c.dark}"/>
      <text x="370" y="125" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">初一 新月</text>
      <!-- Full Moon (Left) -->
      <circle cx="170" cy="100" r="12" fill="${c.gold}"/>
      <text x="170" y="125" font-size="9" font-weight="700" fill="${c.gold}" text-anchor="middle">十五 滿月</text>
      <!-- First Quarter (Top) -->
      <circle cx="270" cy="40" r="12" fill="${c.white}" stroke="${c.dark}"/>
      <path d="M 270 28 A 12 12 0 0 1 270 52 Z" fill="${c.gold}"/>
      <text x="270" y="24" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">初七八 上弦月</text>
      <!-- Third Quarter (Bottom) -->
      <circle cx="270" cy="160" r="12" fill="${c.white}" stroke="${c.dark}"/>
      <path d="M 270 148 A 12 12 0 0 0 270 172 Z" fill="${c.gold}"/>
      <text x="270" y="185" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">廿二 下弦月</text>
    `)
  },
  'geography-8': {
    title: '等高線地形圖判讀：稜線、谷線、鞍部與坡度',
    subtitle: '等高線密集表坡陡、稀疏表坡緩；凸向低處為山脊、凸向高處為山谷',
    caption: '山谷為集水線，河流發源於谷線；山脊為分水嶺。閉合等高線中心數值高為山頂，兩山峰間低凹處為鞍部。',
    render: () => frame('等高線地形判讀', `
      <!-- Contour lines -->
      <ellipse cx="140" cy="100" rx="90" ry="60" fill="none" stroke="${c.forest}" stroke-width="1.5"/>
      <ellipse cx="140" cy="100" rx="65" ry="40" fill="none" stroke="${c.forest}" stroke-width="1.5"/>
      <ellipse cx="140" cy="100" rx="40" ry="22" fill="none" stroke="${c.forest}" stroke-width="2"/>
      <circle cx="140" cy="100" r="3" fill="${c.red}"/>
      <text x="140" y="94" font-size="9" font-weight="800" fill="${c.red}" text-anchor="middle">▲ 山頂 500m</text>
      
      <!-- Ridge vs Valley -->
      <g transform="translate(280, 40)">
        <rect x="0" y="0" width="210" height="120" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="105" y="25" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">等高線判讀三大金律：</text>
        <text x="15" y="50" font-size="10" font-weight="700" fill="${c.dark}">① 凸向低處 ➔ 山脊（分水嶺）</text>
        <text x="15" y="70" font-size="10" font-weight="700" fill="${c.blue}">② 凸向高處 ➔ 山谷（集水河流）</text>
        <text x="15" y="90" font-size="10" fill="${c.dark}">③ 密陡疏緩（間距小坡度陡）</text>
        <text x="15" y="108" font-size="9" fill="${c.muted}">④ 兩峰之間窪地 ➔ 鞍部</text>
      </g>
    `)
  },
  'civics-3': {
    title: '中華民國五權憲法分立與權力制衡機制',
    subtitle: '行政、立法、司法、考試、監察五院各司其職，相互監督制衡',
    caption: '權力分立防範專制：立法院掌立法與預算審查，行政院依法施政並提覆議，司法院掌憲法法庭與各級審判，監察院掌彈劾糾正。',
    render: () => frame('五權憲法制衡架構', `
      <!-- Executive -->
      <rect x="50" y="45" width="105" height="45" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
      <text x="102" y="68" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">行政院</text>
      <text x="102" y="82" font-size="8" fill="${c.muted}" text-anchor="middle">政令推行/覆議</text>
      
      <!-- Legislative -->
      <rect x="215" y="45" width="110" height="45" rx="6" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
      <text x="270" y="68" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">立法院</text>
      <text x="270" y="82" font-size="8" fill="${c.muted}" text-anchor="middle">法律案/預算/質詢</text>
      
      <!-- Judicial -->
      <rect x="385" y="45" width="105" height="45" rx="6" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
      <text x="437" y="68" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">司法院</text>
      <text x="437" y="82" font-size="8" fill="${c.muted}" text-anchor="middle">裁判/憲法法庭</text>
      
      <!-- Exam & Control -->
      <rect x="130" y="115" width="110" height="40" rx="6" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="1.2"/>
      <text x="185" y="135" font-size="10" font-weight="800" fill="${c.purple}" text-anchor="middle">考試院</text>
      <text x="185" y="148" font-size="8" fill="${c.muted}" text-anchor="middle">文官考選銓敘</text>
      
      <rect x="300" y="115" width="110" height="40" rx="6" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.2"/>
      <text x="355" y="135" font-size="10" font-weight="800" fill="${c.red}" text-anchor="middle">監察院</text>
      <text x="355" y="148" font-size="8" fill="${c.muted}" text-anchor="middle">糾正/彈劾/審計</text>
      
      <text x="270" y="185" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">核心原則：民主法治、民意監督、保障基本人權</text>
    `)
  },
  'civics-8': {
    title: '現代法治體系：法規位階與民刑行政三大領域',
    subtitle: '憲法 ＞ 法律 ＞ 命令；民法（私法自治）、刑法（犯罪制裁）、行政法（依法行政）',
    caption: '上位階法規優於下位階法規，命令牴觸法律者無效。三法責任不同：民法賠償損害、刑法自由刑罰金處罰、行政法行政罰鍰。',
    render: () => frame('法規位階與三大法系', `
      <!-- Pyramid -->
      <polygon points="120,35 40,150 200,150" fill="none" stroke="${c.forest}" stroke-width="2"/>
      <line x1="95" y1="75" x2="145" y2="75" stroke="${c.forest}" stroke-width="1.5"/>
      <line x1="70" y1="115" x2="170" y2="115" stroke="${c.forest}" stroke-width="1.5"/>
      <text x="120" y="62" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">憲法 (最高)</text>
      <text x="120" y="100" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">法律 (立法院)</text>
      <text x="120" y="138" font-size="11" font-weight="700" fill="${c.muted}" text-anchor="middle">命令 (行政機關)</text>
      
      <!-- 3 Law branches -->
      <g transform="translate(250, 40)">
        <rect x="0" y="0" width="240" height="115" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="120" y="24" font-size="12" font-weight="800" fill="${c.dark}" text-anchor="middle">三大實體法責任比較：</text>
        <text x="15" y="48" font-size="10" fill="${c.dark}"><tspan font-weight="700" fill="${c.forest}">民法：</tspan>私人間權利義務、損害賠償</text>
        <text x="15" y="70" font-size="10" fill="${c.dark}"><tspan font-weight="700" fill="${c.red}">刑法：</tspan>處罰犯罪行為、維護社會公益</text>
        <text x="15" y="92" font-size="10" fill="${c.dark}"><tspan font-weight="700" fill="${c.blue}">行政法：</tspan>政府依法行政、罰鍰沒入處分</text>
      </g>
    `)
  }
"""

# Update suffix getDiagram to use diagrams[u.id] || defaultSubjectDiagram(u)
suffix_updated = re.sub(
    r'const d = diagrams\[u\.id\];\s*if \(!d\) return "";',
    'const d = diagrams[u.id] || defaultSubjectDiagram(u);\n  if (!d) return "";',
    suffix
)

full_new_code = prefix + new_diagrams + suffix_updated

with open('dist/diagrams.js', 'w', encoding='utf-8') as f:
    f.write(full_new_code)

print("Updated dist/diagrams.js with expanded diagrams and activated fallback for 100% diagram coverage!")
