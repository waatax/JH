// dist/diagrams.js - Native Vector SVG Conceptual Diagrams & Visual Schemas
// Original study illustrations; not affiliated with any learning platform

const c = {
  dark: '#1e3831',
  forest: '#2d5c48',
  green: '#45825b',
  lightGreen: '#e6f3eb',
  lime: '#d6fa77',
  gold: '#c4821a',
  lightGold: '#fdf4e3',
  red: '#b84735',
  lightRed: '#faece8',
  blue: '#3b789e',
  lightBlue: '#e8f3fa',
  purple: '#6d528f',
  lightPurple: '#f0ebf7',
  border: '#d6dfd9',
  bg: '#fbfcfb',
  text: '#223832',
  muted: '#687b74',
  white: '#ffffff'
};

function frame(title, svgContent, width = 540, height = 210) {
  return `<svg class="concept-svg" viewBox="0 0 ${width} ${height}" width="100%" height="auto" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" rx="10" fill="${c.bg}" stroke="${c.border}" stroke-width="1.2"/>
    ${svgContent}
  </svg>`;
}

const diagrams = {
  // === MATH ===
  'math-1': {
    title: '數線模型與絕對值距離',
    subtitle: '原點 0 為基準，正負代表方向，絕對值表示到原點的幾何距離',
    caption: '負數與正數在數線上以 0 為中心對稱，|−3|＝3 代表 −3 到 0 的距離為 3 格，故絕對值必大於或等於 0。',
    render: () => frame('數線與絕對值', `
      <line x1="40" y1="110" x2="500" y2="110" stroke="${c.forest}" stroke-width="2.5"/>
      <polygon points="500,110 490,105 490,115" fill="${c.forest}"/>
      ${[-4,-3,-2,-1,0,1,2,3,4].map((n, i) => {
        const x = 70 + i * 45;
        const isZero = n === 0;
        return `
          <line x1="${x}" y1="102" x2="${x}" y2="118" stroke="${isZero ? c.forest : c.border}" stroke-width="${isZero ? 2.5 : 1.5}"/>
          <text x="${x}" y="138" font-size="${isZero ? 15 : 13}" font-weight="${isZero ? '700' : '500'}" fill="${isZero ? c.forest : c.muted}" text-anchor="middle">${n}</text>
        `;
      }).join('')}
      <!-- Distance arc for |-3| = 3 -->
      <path d="M 115 95 Q 182 50 250 95" fill="none" stroke="${c.gold}" stroke-width="2" stroke-dasharray="4,3"/>
      <circle cx="115" cy="110" r="5" fill="${c.red}"/>
      <circle cx="250" cy="110" r="5" fill="${c.forest}"/>
      <text x="182" y="60" font-size="13" font-weight="700" fill="${c.gold}" text-anchor="middle">|−3| ＝ 距離 3 格</text>
      <text x="115" y="90" font-size="12" font-weight="700" fill="${c.red}" text-anchor="middle">−3</text>
      <text x="250" y="90" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">基準原點 (0)</text>
    `)
  },
  'math-2': {
    title: '短除法與質因數分解樹',
    subtitle: '公因數取共同質因數較小次方，公倍數取所有質因數較大次方',
    caption: '以 24 與 36 為例：24＝2³×3，36＝2²×3²。最大公因數 GCD＝2²×3＝12；最小公倍數 LCM＝2³×3²＝72。',
    render: () => frame('質因數分解', `
      <!-- Venn Diagram / Factor branches -->
      <circle cx="210" cy="105" r="70" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2" fill-opacity="0.6"/>
      <circle cx="330" cy="105" r="70" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2" fill-opacity="0.6"/>
      <text x="165" y="60" font-size="14" font-weight="700" fill="${c.green}">24 的質因數</text>
      <text x="375" y="60" font-size="14" font-weight="700" fill="${c.gold}">36 的質因數</text>
      <text x="165" y="110" font-size="15" font-weight="700" fill="${c.forest}">2</text>
      <text x="270" y="95" font-size="15" font-weight="700" fill="${c.dark}">2² × 3</text>
      <text x="270" y="118" font-size="11" fill="${c.muted}" text-anchor="middle">(最大公因數 12)</text>
      <text x="375" y="110" font-size="15" font-weight="700" fill="${c.gold}">3</text>
      <rect x="120" y="175" width="300" height="26" rx="6" fill="${c.white}" stroke="${c.border}"/>
      <text x="270" y="193" font-size="12" font-weight="600" fill="${c.forest}" text-anchor="middle">最小公倍數 LCM ＝ 2 × (2² × 3) × 3 ＝ 72</text>
    `)
  },
  'math-4': {
    title: '一元一次方程式天平平衡模型',
    subtitle: '等量公理：兩邊同加、同減、同乘、同除以非零數，等式依然平衡',
    caption: '3x＋5＝20 → 兩邊同減 5 得 3x＝15 → 兩邊同除以 3 得 x＝5。移項變號是等量公理的簡化運算。',
    render: () => frame('方程式天平', `
      <!-- Scale Fulcrum -->
      <polygon points="270,140 250,175 290,175" fill="${c.forest}"/>
      <!-- Beam -->
      <line x1="90" y1="140" x2="450" y2="140" stroke="${c.dark}" stroke-width="5" stroke-linecap="round"/>
      <!-- Left Pan -->
      <line x1="140" y1="140" x2="140" y2="165" stroke="${c.muted}" stroke-width="1.5"/>
      <rect x="80" y="165" width="120" height="8" rx="4" fill="${c.border}"/>
      <rect x="90" y="130" width="30" height="30" rx="5" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="105" y="150" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">x</text>
      <rect x="125" y="130" width="30" height="30" rx="5" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="140" y="150" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">x</text>
      <rect x="160" y="130" width="30" height="30" rx="5" fill="${c.lightGold}" stroke="${c.gold}"/>
      <text x="175" y="150" font-size="13" font-weight="700" fill="${c.gold}" text-anchor="middle">+5</text>
      <text x="140" y="195" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">左盤：2x ＋ 5</text>
      <!-- Right Pan -->
      <line x1="400" y1="140" x2="400" y2="165" stroke="${c.muted}" stroke-width="1.5"/>
      <rect x="340" y="165" width="120" height="8" rx="4" fill="${c.border}"/>
      <rect x="375" y="125" width="50" height="35" rx="6" fill="${c.lightBlue}" stroke="${c.blue}"/>
      <text x="400" y="148" font-size="14" font-weight="700" fill="${c.blue}" text-anchor="middle">15</text>
      <text x="400" y="195" font-size="13" font-weight="700" fill="${c.blue}" text-anchor="middle">右盤：15</text>
      <!-- Center Equal Sign -->
      <text x="270" y="105" font-size="28" font-weight="800" fill="${c.forest}" text-anchor="middle">＝</text>
      <text x="270" y="65" font-size="13" font-weight="600" fill="${c.muted}" text-anchor="middle">兩側同減 5：2x ＝ 10 → x ＝ 5</text>
    `)
  },
  'math-8': {
    title: '直角坐標系四象限模型',
    subtitle: '橫軸 x 軸，縱軸 y 軸，交於原點 (0,0)，逆時針劃分四個象限',
    caption: '點 P(x,y) 的符號規律：第一象限 (+,+)，第二象限 (−,+)，第三象限 (−,−)，第四象限 (+,−)。',
    render: () => frame('直角坐標系', `
      <!-- Axes -->
      <line x1="60" y1="105" x2="480" y2="105" stroke="${c.forest}" stroke-width="2"/>
      <line x1="270" y1="20" x2="270" y2="190" stroke="${c.forest}" stroke-width="2"/>
      <text x="475" y="98" font-size="13" font-weight="700" fill="${c.forest}">x</text>
      <text x="278" y="32" font-size="13" font-weight="700" fill="${c.forest}">y</text>
      <!-- Quadrants -->
      <rect x="290" y="35" width="160" height="55" rx="6" fill="${c.lightGreen}" fill-opacity="0.4"/>
      <text x="370" y="58" font-size="13" font-weight="700" fill="${c.green}" text-anchor="middle">第一象限 (Ⅰ)</text>
      <text x="370" y="78" font-size="12" fill="${c.muted}" text-anchor="middle">(+, +) 例如 (3, 4)</text>

      <rect x="90" y="35" width="160" height="55" rx="6" fill="${c.lightBlue}" fill-opacity="0.4"/>
      <text x="170" y="58" font-size="13" font-weight="700" fill="${c.blue}" text-anchor="middle">第二象限 (Ⅱ)</text>
      <text x="170" y="78" font-size="12" fill="${c.muted}" text-anchor="middle">(−, +) 例如 (−2, 3)</text>

      <rect x="90" y="120" width="160" height="55" rx="6" fill="${c.lightGold}" fill-opacity="0.4"/>
      <text x="170" y="143" font-size="13" font-weight="700" fill="${c.gold}" text-anchor="middle">第三象限 (Ⅲ)</text>
      <text x="170" y="163" font-size="12" fill="${c.muted}" text-anchor="middle">(−, −) 例如 (−4, −1)</text>

      <rect x="290" y="120" width="160" height="55" rx="6" fill="${c.lightPurple}" fill-opacity="0.4"/>
      <text x="370" y="143" font-size="13" font-weight="700" fill="${c.purple}" text-anchor="middle">第四象限 (Ⅳ)</text>
      <text x="370" y="163" font-size="12" fill="${c.muted}" text-anchor="middle">(+, −) 例如 (5, −3)</text>
    `)
  },
  'math-9': {
    title: '乘法公式幾何面積分割模型',
    subtitle: '(a＋b)² ＝ a² ＋ 2ab ＋ b²',
    caption: '邊長為 (a＋b) 的大正方形，面積被分割為：一個 a² 正方形、兩個 ab 長方形、一個 b² 正方形。',
    render: () => frame('乘法公式面積圖', `
      <!-- Big Square -->
      <g transform="translate(180, 25)">
        <!-- a^2 -->
        <rect x="0" y="0" width="105" height="105" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <text x="52" y="58" font-size="16" font-weight="700" fill="${c.forest}" text-anchor="middle">a²</text>
        <!-- ab top-right -->
        <rect x="105" y="0" width="55" height="105" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="132" y="58" font-size="14" font-weight="700" fill="${c.gold}" text-anchor="middle">ab</text>
        <!-- ab bottom-left -->
        <rect x="0" y="105" width="105" height="55" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="52" y="137" font-size="14" font-weight="700" fill="${c.gold}" text-anchor="middle">ab</text>
        <!-- b^2 bottom-right -->
        <rect x="105" y="105" width="55" height="55" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="2"/>
        <text x="132" y="137" font-size="14" font-weight="700" fill="${c.purple}" text-anchor="middle">b²</text>

        <!-- dimension labels -->
        <text x="52" y="-8" font-size="13" font-weight="600" fill="${c.forest}" text-anchor="middle">a</text>
        <text x="132" y="-8" font-size="13" font-weight="600" fill="${c.gold}" text-anchor="middle">b</text>
        <text x="-12" y="58" font-size="13" font-weight="600" fill="${c.forest}" text-anchor="middle">a</text>
        <text x="-12" y="137" font-size="13" font-weight="600" fill="${c.gold}" text-anchor="middle">b</text>
      </g>
      <text x="420" y="95" font-size="16" font-weight="700" fill="${c.dark}">總面積 ＝</text>
      <text x="420" y="125" font-size="15" font-weight="700" fill="${c.green}">a² ＋ 2ab ＋ b²</text>
    `)
  },
  'math-10': {
    title: '畢氏定理幾何三方圖解',
    subtitle: '直角三角形兩股平方和等於斜邊平方：a² ＋ b² ＝ c²',
    caption: '直角三角形三邊分別向外作正方形，兩股正方形面積和（9＋16＝25）剛好等於斜邊正方形面積（25）。',
    render: () => frame('畢氏定理', `
      <g transform="translate(230, 95)">
        <!-- Triangle -->
        <polygon points="0,0 60,0 0,-45" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <!-- Right angle mark -->
        <rect x="0" y="-12" width="12" height="12" fill="none" stroke="${c.green}" stroke-width="1.5"/>
        <!-- Leg a square -->
        <rect x="-45" y="-45" width="45" height="45" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="-22" y="-18" font-size="12" font-weight="700" fill="${c.blue}" text-anchor="middle">a²＝9</text>
        <!-- Leg b square -->
        <rect x="0" y="0" width="60" height="60" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="30" y="35" font-size="12" font-weight="700" fill="${c.gold}" text-anchor="middle">b²＝16</text>
        <!-- Hypotenuse c square -->
        <g transform="translate(60, 0) rotate(143.13)">
          <rect x="0" y="0" width="75" height="75" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="1.5"/>
          <text x="37" y="42" font-size="13" font-weight="700" fill="${c.purple}" text-anchor="middle">c²＝25</text>
        </g>
      </g>
      <text x="80" y="70" font-size="15" font-weight="700" fill="${c.dark}">兩股長 3, 4</text>
      <text x="80" y="95" font-size="15" font-weight="700" fill="${c.forest}">斜邊長 ＝ 5</text>
      <text x="80" y="125" font-size="14" font-weight="600" fill="${c.muted}">3² ＋ 4² ＝ 5²</text>
    `)
  },
  'math-11': {
    title: '二元一次聯立方程式直線交點幾何模型',
    subtitle: '聯立方程式的解 (x, y)，即為兩條二元一次直線在坐標平面上的交點',
    caption: '相交於一點有唯一解；平行不相交為無解；兩直線重合為無限多組解。代入消去與加減消去為代數核心手法。',
    render: () => frame('聯立方程式交點', `
      <!-- Axes -->
      <line x1="80" y1="110" x2="460" y2="110" stroke="${c.border}" stroke-width="2"/>
      <line x1="240" y1="20" x2="240" y2="190" stroke="${c.border}" stroke-width="2"/>
      <text x="455" y="105" font-size="12" fill="${c.muted}">x</text>
      <text x="248" y="32" font-size="12" fill="${c.muted}">y</text>
      <!-- Line 1: y = 2x - 1 (positive slope) -->
      <line x1="140" y1="180" x2="380" y2="40" stroke="${c.blue}" stroke-width="2.5"/>
      <text x="390" y="48" font-size="12" font-weight="700" fill="${c.blue}">L₁: 2x − y ＝ 1</text>
      <!-- Line 2: y = -x + 5 (negative slope) -->
      <line x1="150" y1="35" x2="370" y2="165" stroke="${c.gold}" stroke-width="2.5"/>
      <text x="380" y="168" font-size="12" font-weight="700" fill="${c.gold}">L₂: x ＋ y ＝ 5</text>
      <!-- Intersection Point (2, 3) -->
      <circle cx="300" cy="85" r="6" fill="${c.red}"/>
      <text x="300" y="70" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">交點 P(2, 3)</text>
      <!-- Box Callout -->
      <rect x="50" y="35" width="130" height="60" rx="6" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="115" y="58" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">代數解：</text>
      <text x="115" y="80" font-size="14" font-weight="800" fill="${c.forest}" text-anchor="middle">x ＝ 2 , y ＝ 3</text>
    `)
  },
  'math-12': {
    title: '比例式與正比、反比函數關係對比',
    subtitle: '正比 y＝kx (過原點斜直線) vs 反比 xy＝k (雙曲線漸近坐標軸)',
    caption: '正比中比值 y/x 固定為常數 k；反比中乘積 xy 固定為常數 k。生活應用：等速運動距離與時間成正比，固定距離速度與時間成反比。',
    render: () => frame('正比與反比', `
      <!-- Left: Direct Proportion -->
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="210" height="170" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <line x1="25" y1="140" x2="190" y2="140" stroke="${c.muted}" stroke-width="1.5"/>
        <line x1="25" y1="140" x2="25" y2="25" stroke="${c.muted}" stroke-width="1.5"/>
        <line x1="25" y1="140" x2="175" y2="40" stroke="${c.green}" stroke-width="3"/>
        <circle cx="25" cy="140" r="4" fill="${c.green}"/>
        <text x="105" y="25" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">正比：y ＝ kx</text>
        <text x="105" y="45" font-size="11" fill="${c.muted}" text-anchor="middle">比值 y/x ＝ k 為定值</text>
        <text x="105" y="160" font-size="11" font-weight="600" fill="${c.forest}" text-anchor="middle">過原點 (0,0) 的斜直線</text>
      </g>
      <!-- Right: Inverse Proportion -->
      <g transform="translate(290, 20)">
        <rect x="0" y="0" width="210" height="170" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <line x1="25" y1="140" x2="190" y2="140" stroke="${c.muted}" stroke-width="1.5"/>
        <line x1="25" y1="140" x2="25" y2="25" stroke="${c.muted}" stroke-width="1.5"/>
        <path d="M 40 40 Q 60 120 180 135" fill="none" stroke="${c.blue}" stroke-width="3"/>
        <text x="105" y="25" font-size="13" font-weight="700" fill="${c.blue}" text-anchor="middle">反比：xy ＝ k</text>
        <text x="105" y="45" font-size="11" fill="${c.muted}" text-anchor="middle">乘積 xy ＝ k 為定值</text>
        <text x="105" y="160" font-size="11" font-weight="600" fill="${c.blue}" text-anchor="middle">漸近坐標軸之雙曲線</text>
      </g>
    `)
  },
  'math-13': {
    title: '一元一次不等式解集與數線圖示規範',
    subtitle: '大於向右、小於向左；含等號為實心圓點，不含等號為空心圓點',
    caption: '不等式兩邊同乘或同除以「負數」時，不等號方向必須反轉！例如：−2x < 6 ➔ 兩邊同除以 −2 ➔ x > −3。',
    render: () => frame('不等式解集數線', `
      <!-- Number Line 1: x > 2 -->
      <g transform="translate(50, 40)">
        <line x1="0" y1="25" x2="440" y2="25" stroke="${c.border}" stroke-width="2"/>
        <polygon points="440,25 432,20 432,30" fill="${c.border}"/>
        <text x="20" y="15" font-size="13" font-weight="700" fill="${c.blue}">案例 A：x ＞ 2 (空心點向右)</text>
        <line x1="200" y1="20" x2="200" y2="30" stroke="${c.muted}" stroke-width="1.5"/>
        <text x="200" y="45" font-size="12" fill="${c.muted}" text-anchor="middle">2</text>
        <!-- Ray -->
        <line x1="200" y1="25" x2="410" y2="25" stroke="${c.blue}" stroke-width="4"/>
        <circle cx="200" cy="25" r="5" fill="${c.white}" stroke="${c.blue}" stroke-width="2.5"/>
      </g>
      <!-- Number Line 2: x <= -1 (with negative reversal note) -->
      <g transform="translate(50, 120)">
        <line x1="0" y1="25" x2="440" y2="25" stroke="${c.border}" stroke-width="2"/>
        <polygon points="440,25 432,20 432,30" fill="${c.border}"/>
        <text x="20" y="15" font-size="13" font-weight="700" fill="${c.red}">案例 B：−3x ≧ 3 ➔ x ≦ −1 (乘除負數變號)</text>
        <line x1="260" y1="20" x2="260" y2="30" stroke="${c.muted}" stroke-width="1.5"/>
        <text x="260" y="45" font-size="12" fill="${c.muted}" text-anchor="middle">−1</text>
        <!-- Ray -->
        <line x1="260" y1="25" x2="60" y2="25" stroke="${c.red}" stroke-width="4"/>
        <circle cx="260" cy="25" r="5" fill="${c.red}"/>
      </g>
    `)
  },
  'math-15': {
    title: '二次函數拋物線頂點與開口方向幾何模型',
    subtitle: '標準式 y ＝ a(x − h)² ＋ k，頂點坐標 (h, k)，對稱軸 x ＝ h',
    caption: '當 a > 0 時開口向上，頂點為最低點，有最小值 k；當 a < 0 時開口向下，頂點為最高點，有最大值 k。|a| 愈大開口愈狹窄。',
    render: () => frame('二次函數拋物線', `
      <!-- Coordinate Axes -->
      <line x1="60" y1="160" x2="480" y2="160" stroke="${c.border}" stroke-width="2"/>
      <line x1="160" y1="20" x2="160" y2="190" stroke="${c.border}" stroke-width="2"/>
      <text x="475" y="155" font-size="12" fill="${c.muted}">x</text>
      <text x="168" y="32" font-size="12" fill="${c.muted}">y</text>
      <!-- Axis of symmetry x = h -->
      <line x1="300" y1="25" x2="300" y2="185" stroke="${c.muted}" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="300" y="198" font-size="11" font-weight="700" fill="${c.muted}" text-anchor="middle">對稱軸 x ＝ h</text>
      <!-- Parabola curve opening up -->
      <path d="M 180 35 Q 300 230 420 35" fill="none" stroke="${c.forest}" stroke-width="3"/>
      <!-- Vertex (h, k) -->
      <circle cx="300" cy="132" r="6" fill="${c.red}"/>
      <text x="300" y="120" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">頂點 V(h, k)</text>
      <!-- Properties Panel -->
      <rect x="50" y="35" width="90" height="95" rx="6" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="95" y="58" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">a ＞ 0</text>
      <text x="95" y="78" font-size="11" fill="${c.muted}" text-anchor="middle">開口向上</text>
      <text x="95" y="98" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">最小值 k</text>
      <text x="95" y="118" font-size="10" fill="${c.muted}" text-anchor="middle">當 x ＝ h</text>
    `)
  },
  'math-16': {
    title: '圓的幾何性質：圓心角與圓周角關係定理',
    subtitle: '同弧所對的圓周角等於圓心角的一半：∠APB ＝ ½ ∠AOB',
    caption: '半圓（直徑）所對的圓周角必為 90° 直角；同弧所對的所有圓周角度數完全相等。',
    render: () => frame('圓心角與圓周角', `
      <!-- Circle -->
      <circle cx="270" cy="105" r="75" fill="none" stroke="${c.forest}" stroke-width="2"/>
      <circle cx="270" cy="105" r="4" fill="${c.forest}"/>
      <text x="270" y="125" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">O (圓心)</text>
      <!-- Chord points A, B -->
      <circle cx="215" cy="155" r="5" fill="${c.dark}"/>
      <text x="200" y="168" font-size="13" font-weight="800" fill="${c.dark}">A</text>
      <circle cx="325" cy="155" r="5" fill="${c.dark}"/>
      <text x="340" y="168" font-size="13" font-weight="800" fill="${c.dark}">B</text>
      <!-- Arc AB highlight -->
      <path d="M 215 155 A 75 75 0 0 0 325 155" fill="none" stroke="${c.gold}" stroke-width="4"/>
      <text x="270" y="195" font-size="12" font-weight="700" fill="${c.gold}" text-anchor="middle">所夾圓弧 AB (2θ)</text>
      <!-- Central Angle Lines -->
      <line x1="270" y1="105" x2="215" y2="155" stroke="${c.gold}" stroke-width="1.8"/>
      <line x1="270" y1="105" x2="325" y2="155" stroke="${c.gold}" stroke-width="1.8"/>
      <text x="270" y="90" font-size="13" font-weight="800" fill="${c.gold}" text-anchor="middle">圓心角 2θ</text>
      <!-- Inscribed Angle vertex P -->
      <circle cx="240" cy="33" r="5" fill="${c.blue}"/>
      <text x="240" y="24" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">P (圓周頂點)</text>
      <!-- Inscribed Angle Lines -->
      <line x1="240" y1="33" x2="215" y2="155" stroke="${c.blue}" stroke-width="1.8"/>
      <line x1="240" y1="33" x2="325" y2="155" stroke="${c.blue}" stroke-width="1.8"/>
      <text x="248" y="58" font-size="13" font-weight="800" fill="${c.blue}">圓周角 θ</text>
      <!-- Formula Callout -->
      <rect x="40" y="65" width="130" height="70" rx="8" fill="${c.lightBlue}" stroke="${c.blue}"/>
      <text x="105" y="92" font-size="12" font-weight="700" fill="${c.blue}" text-anchor="middle">圓周角定理：</text>
      <text x="105" y="118" font-size="14" font-weight="800" fill="${c.dark}" text-anchor="middle">∠APB ＝ ½ 弧AB</text>
    `)
  },
  'math-17': {
    title: '三角形三心特質模型：外心、內心與重心',
    subtitle: '外心（三中垂線/外接圓）、內心（三角平分線/內切圓）、重心（三中線/2:1）',
    caption: '重心 G 將每條中線分成 2:1 長度比，並將三角形面積六等分；直角三角形外心位於斜邊中點；鈍角三角形外心在三角形外部。',
    render: () => frame('三角形三心特質', `
      <!-- Center 1: Circumcenter -->
      <g transform="translate(30, 25)">
        <rect x="0" y="0" width="145" height="155" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <polygon points="20,120 125,120 70,35" fill="none" stroke="${c.green}" stroke-width="1.5"/>
        <circle cx="72" cy="85" r="5" fill="${c.green}"/>
        <text x="72" y="105" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">外心 (O)</text>
        <text x="72" y="125" font-size="10" fill="${c.muted}" text-anchor="middle">三邊中垂線交點</text>
        <text x="72" y="142" font-size="11" font-weight="700" fill="${c.green}" text-anchor="middle">到三頂點等距</text>
      </g>
      <!-- Center 2: Incenter -->
      <g transform="translate(195, 25)">
        <rect x="0" y="0" width="145" height="155" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <polygon points="20,120 125,120 70,35" fill="none" stroke="${c.gold}" stroke-width="1.5"/>
        <circle cx="72" cy="90" r="28" fill="none" stroke="${c.gold}" stroke-width="1.2" stroke-dasharray="3,3"/>
        <circle cx="72" cy="90" r="5" fill="${c.gold}"/>
        <text x="72" y="105" font-size="13" font-weight="700" fill="${c.gold}" text-anchor="middle">內心 (I)</text>
        <text x="72" y="125" font-size="10" fill="${c.muted}" text-anchor="middle">三角平分線交點</text>
        <text x="72" y="142" font-size="11" font-weight="700" fill="${c.gold}" text-anchor="middle">到三邊等距</text>
      </g>
      <!-- Center 3: Centroid -->
      <g transform="translate(360, 25)">
        <rect x="0" y="0" width="145" height="155" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <polygon points="20,120 125,120 70,35" fill="none" stroke="${c.blue}" stroke-width="1.5"/>
        <line x1="70" y1="35" x2="72" y2="120" stroke="${c.blue}" stroke-width="1" stroke-dasharray="3,2"/>
        <circle cx="72" cy="92" r="5" fill="${c.red}"/>
        <text x="72" y="105" font-size="13" font-weight="700" fill="${c.red}" text-anchor="middle">重心 (G)</text>
        <text x="72" y="125" font-size="10" fill="${c.muted}" text-anchor="middle">三中線交點</text>
        <text x="72" y="142" font-size="11" font-weight="700" fill="${c.blue}" text-anchor="middle">頂點至底邊 2:1</text>
      </g>
    `)
  },
  'math-25': {
    title: '古典機率與樹狀圖分析模型',
    subtitle: '事件機率 P(A) ＝ n(A) / n(S)，樹狀圖有系統窮舉所有等可能結果',
    caption: '連續擲兩枚公正硬幣：樣本空間 n(S)＝4，恰好出現「一正一反」的結果有 (正,反) 與 (反,正) 共 2 種，機率 P＝2/4＝1/2。',
    render: () => frame('樹狀圖與機率', `
      <!-- Root -->
      <circle cx="80" cy="105" r="14" fill="${c.dark}"/>
      <text x="80" y="110" font-size="11" font-weight="700" fill="${c.lime}" text-anchor="middle">開始</text>
      <!-- Branches Stage 1 -->
      <line x1="94" y1="105" x2="200" y2="65" stroke="${c.forest}" stroke-width="2"/>
      <line x1="94" y1="105" x2="200" y2="145" stroke="${c.forest}" stroke-width="2"/>
      <!-- Stage 1 nodes -->
      <rect x="200" y="50" width="60" height="30" rx="6" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="230" y="70" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">第1枚正</text>
      <rect x="200" y="130" width="60" height="30" rx="6" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="230" y="150" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">第1枚反</text>
      <!-- Branches Stage 2 -->
      <line x1="260" y1="65" x2="350" y2="40" stroke="${c.muted}" stroke-width="1.5"/>
      <line x1="260" y1="65" x2="350" y2="85" stroke="${c.muted}" stroke-width="1.5"/>
      <line x1="260" y1="145" x2="350" y2="125" stroke="${c.muted}" stroke-width="1.5"/>
      <line x1="260" y1="145" x2="350" y2="170" stroke="${c.muted}" stroke-width="1.5"/>
      <!-- Stage 2 outcomes -->
      <text x="355" y="44" font-size="12" font-weight="700" fill="${c.dark}">正 ➔ (正, 正) [1/4]</text>
      <text x="355" y="89" font-size="12" font-weight="700" fill="${c.gold}">反 ➔ (正, 反) ★ [1/4]</text>
      <text x="355" y="129" font-size="12" font-weight="700" fill="${c.gold}">正 ➔ (反, 正) ★ [1/4]</text>
      <text x="355" y="174" font-size="12" font-weight="700" fill="${c.dark}">反 ➔ (反, 反) [1/4]</text>
      <!-- Result badge -->
      <rect x="350" y="180" width="160" height="24" rx="4" fill="${c.lightGold}" stroke="${c.gold}"/>
      <text x="430" y="196" font-size="11" font-weight="700" fill="${c.gold}" text-anchor="middle">一正一反機率 ＝ 2/4 ＝ 0.5</text>
    `)
  },
  'math-27': {
    title: '盒狀圖與五數綜合數據分佈',
    subtitle: '最小值、第 1 四分位數 (Q₁)、中位數 (Q₂)、第 3 四分位數 (Q₃)、最大值',
    caption: '盒子涵蓋中央 50% 數據，四分位距 IQR＝Q₃−Q₁，盒長代表資料分散程度，不受極端值干擾。',
    render: () => frame('盒狀圖分佈', `
      <!-- Axis -->
      <line x1="60" y1="150" x2="480" y2="150" stroke="${c.border}" stroke-width="2"/>
      ${[40, 50, 60, 70, 80, 90, 100].map((v, i) => `
        <line x1="${80 + i * 55}" y1="145" x2="${80 + i * 55}" y2="155" stroke="${c.muted}"/>
        <text x="${80 + i * 55}" y="172" font-size="12" fill="${c.muted}" text-anchor="middle">${v}</text>
      `).join('')}
      <!-- Whiskers -->
      <line x1="120" y1="80" x2="190" y2="80" stroke="${c.forest}" stroke-width="2.5"/>
      <line x1="370" y1="80" x2="445" y2="80" stroke="${c.forest}" stroke-width="2.5"/>
      <!-- Whisker caps -->
      <line x1="120" y1="65" x2="120" y2="95" stroke="${c.forest}" stroke-width="2.5"/>
      <line x1="445" y1="65" x2="445" y2="95" stroke="${c.forest}" stroke-width="2.5"/>
      <!-- Box -->
      <rect x="190" y="55" width="180" height="50" rx="4" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2.5"/>
      <!-- Median line -->
      <line x1="280" y1="55" x2="280" y2="105" stroke="${c.red}" stroke-width="3"/>
      <!-- Labels -->
      <text x="120" y="45" font-size="12" font-weight="700" fill="${c.muted}" text-anchor="middle">Min (48)</text>
      <text x="190" y="45" font-size="12" font-weight="700" fill="${c.green}" text-anchor="middle">Q₁ (60)</text>
      <text x="280" y="45" font-size="12" font-weight="700" fill="${c.red}" text-anchor="middle">中位數 Q₂ (76)</text>
      <text x="370" y="45" font-size="12" font-weight="700" fill="${c.green}" text-anchor="middle">Q₃ (86)</text>
      <text x="445" y="45" font-size="12" font-weight="700" fill="${c.muted}" text-anchor="middle">Max (98)</text>
      <!-- IQR brace -->
      <text x="280" y="125" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">四分位距 IQR ＝ Q₃ − Q₁ ＝ 26</text>
    `)
  },

  // === PHYSICS ===
  'physics-3': {
    title: '光的反射定律與平面鏡成像',
    subtitle: '入射角等於反射角（角度自法線量起），物距等於像距',
    caption: '入射光線、反射光線與法線在同一平面上；平面鏡所成的像是大小相等、左右相反的正立虛像。',
    render: () => frame('光的反射', `
      <!-- Mirror Surface -->
      <line x1="60" y1="140" x2="480" y2="140" stroke="${c.blue}" stroke-width="3"/>
      ${[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => `<line x1="${80+i*30}" y1="140" x2="${70+i*30}" y2="155" stroke="${c.border}" stroke-width="1.5"/>`).join('')}
      <!-- Normal Line -->
      <line x1="270" y1="30" x2="270" y2="140" stroke="${c.muted}" stroke-width="1.8" stroke-dasharray="5,4"/>
      <text x="270" y="24" font-size="13" font-weight="600" fill="${c.muted}" text-anchor="middle">法線 (垂直鏡面)</text>
      <!-- Incident Ray -->
      <line x1="130" y1="40" x2="270" y2="140" stroke="${c.red}" stroke-width="2.5"/>
      <polygon points="195,86 205,92 203,80" fill="${c.red}"/>
      <text x="145" y="80" font-size="13" font-weight="700" fill="${c.red}">入射光線</text>
      <!-- Reflected Ray -->
      <line x1="270" y1="140" x2="410" y2="40" stroke="${c.green}" stroke-width="2.5"/>
      <polygon points="340,90 350,84 345,95" fill="${c.green}"/>
      <text x="375" y="80" font-size="13" font-weight="700" fill="${c.green}">反射光線</text>
      <!-- Angle Arcs -->
      <path d="M 240 115 A 35 35 0 0 1 262 105" fill="none" stroke="${c.red}" stroke-width="1.5"/>
      <text x="238" y="98" font-size="12" font-weight="700" fill="${c.red}">θ₁ 入射角</text>
      <path d="M 278 105 A 35 35 0 0 1 300 115" fill="none" stroke="${c.green}" stroke-width="1.5"/>
      <text x="302" y="98" font-size="12" font-weight="700" fill="${c.green}">θ₂ 反射角</text>
      <text x="270" y="185" font-size="14" font-weight="700" fill="${c.forest}" text-anchor="middle">定律核心：θ₁ ＝ θ₂（皆由垂直法線量起）</text>
    `)
  },
  'physics-5': {
    title: '牛頓第二運動定律與 v-t 圖幾何意涵',
    subtitle: 'v-t 圖斜率代表加速度 a，線下面積代表位移 Δx，F_合力 ＝ m × a',
    caption: '當合力 F 不為 0 時物體產生加速度，加速度方向與合力相同。水平直線代表等速，傾斜直線代表等加速度。',
    render: () => frame('牛頓定律與vt圖', `
      <!-- vt Graph Axes -->
      <g transform="translate(40, 20)">
        <line x1="30" y1="140" x2="220" y2="140" stroke="${c.border}" stroke-width="2"/>
        <line x1="30" y1="140" x2="30" y2="20" stroke="${c.border}" stroke-width="2"/>
        <text x="225" y="145" font-size="12" font-weight="700" fill="${c.muted}">t (時間)</text>
        <text x="25" y="15" font-size="12" font-weight="700" fill="${c.muted}">v (速度)</text>
        <!-- Shaded Area (Displacement) -->
        <polygon points="30,140 180,60 180,140" fill="${c.lightGreen}" fill-opacity="0.6"/>
        <!-- Motion Line -->
        <line x1="30" y1="140" x2="180" y2="60" stroke="${c.forest}" stroke-width="3"/>
        <text x="95" y="85" font-size="12" font-weight="700" fill="${c.forest}">斜率 ＝ 加速度 a</text>
        <text x="115" y="125" font-size="12" font-weight="700" fill="${c.green}">面積 ＝ 位移 Δx</text>
      </g>
      <!-- F = ma Physics model -->
      <g transform="translate(290, 35)">
        <rect x="0" y="0" width="210" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="105" y="32" font-size="15" font-weight="800" fill="${c.gold}" text-anchor="middle">F_合力 ＝ m × a</text>
        <rect x="40" y="55" width="45" height="40" rx="4" fill="${c.forest}"/>
        <text x="62" y="80" font-size="14" font-weight="700" fill="${c.white}" text-anchor="middle">m</text>
        <!-- Force Arrow -->
        <line x1="85" y1="75" x2="155" y2="75" stroke="${c.red}" stroke-width="3.5"/>
        <polygon points="155,75 145,69 145,81" fill="${c.red}"/>
        <text x="120" y="65" font-size="13" font-weight="800" fill="${c.red}">F (合力)</text>
        <text x="105" y="120" font-size="11" font-weight="600" fill="${c.dark}" text-anchor="middle">合力與加速度方向必相同</text>
      </g>
    `)
  },
  'physics-7': {
    title: '歐姆定律與串聯／並聯電路特性圖解',
    subtitle: '歐姆定律 V ＝ I × R；串聯電流處處相等，並聯各支路電壓相同',
    caption: '串聯總電阻 R_總＝R₁＋R₂（愈串愈大）；並聯總電阻 1/R_總＝1/R₁＋1/R₂（愈並愈小，一燈壞他燈仍亮）。',
    render: () => frame('歐姆定律與電路', `
      <!-- Series Circuit (Left) -->
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="210" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="105" y="25" font-size="13" font-weight="800" fill="${c.forest}" text-anchor="middle">串聯電路 (Series)</text>
        <!-- Loop -->
        <rect x="35" y="45" width="140" height="70" rx="4" fill="none" stroke="${c.dark}" stroke-width="2"/>
        <!-- Resistor 1 & 2 -->
        <rect x="60" y="38" width="30" height="14" fill="${c.lightGreen}" stroke="${c.green}"/>
        <text x="75" y="49" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">R₁</text>
        <rect x="120" y="38" width="30" height="14" fill="${c.lightGreen}" stroke="${c.green}"/>
        <text x="135" y="49" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">R₂</text>
        <!-- Battery bottom -->
        <line x1="95" y1="110" x2="95" y2="120" stroke="${c.red}" stroke-width="3"/>
        <line x1="105" y1="105" x2="105" y2="125" stroke="${c.forest}" stroke-width="2"/>
        <text x="105" y="140" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">電流相同：I_總 ＝ I₁ ＝ I₂</text>
        <text x="105" y="155" font-size="10" fill="${c.muted}" text-anchor="middle">電壓分配：V_總 ＝ V₁ ＋ V₂</text>
      </g>
      <!-- Parallel Circuit (Right) -->
      <g transform="translate(290, 20)">
        <rect x="0" y="0" width="210" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="105" y="25" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">並聯電路 (Parallel)</text>
        <!-- Loop & Branches -->
        <line x1="35" y1="50" x2="175" y2="50" stroke="${c.dark}" stroke-width="2"/>
        <line x1="35" y1="85" x2="175" y2="85" stroke="${c.dark}" stroke-width="2"/>
        <line x1="35" y1="50" x2="35" y2="115" stroke="${c.dark}" stroke-width="2"/>
        <line x1="175" y1="50" x2="175" y2="115" stroke="${c.dark}" stroke-width="2"/>
        <line x1="35" y1="115" x2="175" y2="115" stroke="${c.dark}" stroke-width="2"/>
        <!-- Resistors in branches -->
        <rect x="90" y="43" width="30" height="14" fill="${c.lightBlue}" stroke="${c.blue}"/>
        <text x="105" y="54" font-size="9" font-weight="700" fill="${c.blue}" text-anchor="middle">R₁</text>
        <rect x="90" y="78" width="30" height="14" fill="${c.lightBlue}" stroke="${c.blue}"/>
        <text x="105" y="89" font-size="9" font-weight="700" fill="${c.blue}" text-anchor="middle">R₂</text>
        <text x="105" y="140" font-size="11" font-weight="700" fill="${c.blue}" text-anchor="middle">電壓相同：V_總 ＝ V₁ ＝ V₂</text>
        <text x="105" y="155" font-size="10" fill="${c.muted}" text-anchor="middle">電流分流：I_總 ＝ I₁ ＋ I₂</text>
      </g>
    `)
  },
  'physics-8': {
    title: '液體壓力與阿基米德浮力平衡模型',
    subtitle: '浮力 B ＝ 排開液體重 ＝ V_排 × D_液',
    caption: '浮體 (D_物 < D_液)：浮力等於物重，靜止於表面；沉體 (D_物 > D_液)：浮力小於物重，在液體中秤重變輕（視重 W＝W−B）。',
    render: () => frame('浮力與阿基米德', `
      <!-- Beaker -->
      <rect x="80" y="50" width="160" height="110" rx="4" fill="none" stroke="${c.blue}" stroke-width="2.5"/>
      <!-- Water Fill -->
      <rect x="82" y="80" width="156" height="78" fill="${c.lightBlue}" fill-opacity="0.6"/>
      <text x="210" y="95" font-size="11" font-weight="700" fill="${c.blue}">液體 D_液</text>
      <!-- Floating Body -->
      <rect x="130" y="65" width="40" height="35" rx="3" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
      <text x="150" y="87" font-size="11" font-weight="700" fill="${c.gold}" text-anchor="middle">浮體</text>
      <!-- Force vectors for floating body -->
      <line x1="150" y1="50" x2="150" y2="30" stroke="${c.forest}" stroke-width="2.5"/>
      <polygon points="150,25 146,33 154,33" fill="${c.forest}"/>
      <text x="150" y="20" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">浮力 B</text>
      <!-- Right Comparison Summary -->
      <g transform="translate(280, 45)">
        <rect x="0" y="0" width="220" height="125" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="110" y="25" font-size="13" font-weight="800" fill="${c.dark}" text-anchor="middle">狀態受力關鍵比較</text>
        <line x1="15" y1="35" x2="205" y2="35" stroke="${c.border}"/>
        <text x="20" y="55" font-size="12" font-weight="700" fill="${c.gold}">● 浮體 (沉入部分)：</text>
        <text x="35" y="72" font-size="11" fill="${c.muted}">B ＝ W_物 ＝ V_排 × D_液</text>
        <text x="20" y="95" font-size="12" font-weight="700" fill="${c.red}">● 沉體 (完全沉底)：</text>
        <text x="35" y="112" font-size="11" fill="${c.muted}">B ＜ W_物 ， 視重 W' ＝ W − B</text>
      </g>
    `)
  },
  'physics-9': {
    title: '托里切利實驗與大氣壓力平衡水銀柱',
    subtitle: '1 atm ＝ 76 cm-Hg ＝ 1033.6 gw/cm² ≒ 1013 hPa',
    caption: '玻璃管倒插水銀槽中，頂端為「托里切利真空」；管內 76 cm 高的水銀柱重量恰好由槽面承受的大氣壓力完全支撐。',
    render: () => frame('托里切利實驗', `
      <!-- Mercury Basin -->
      <rect x="120" y="140" width="300" height="40" rx="4" fill="${c.border}" stroke="${c.muted}" stroke-width="2"/>
      <rect x="122" y="148" width="296" height="30" fill="${c.muted}" fill-opacity="0.4"/>
      <text x="360" y="168" font-size="12" font-weight="700" fill="${c.dark}">水銀槽 (Hg)</text>
      <!-- Glass Tube -->
      <rect x="250" y="30" width="30" height="130" fill="none" stroke="${c.blue}" stroke-width="2"/>
      <!-- Mercury inside tube (76cm height) -->
      <rect x="252" y="65" width="26" height="95" fill="${c.muted}" fill-opacity="0.8"/>
      <!-- Torricelli Vacuum at top -->
      <rect x="252" y="32" width="26" height="33" fill="${c.lightGold}"/>
      <text x="265" y="52" font-size="10" font-weight="700" fill="${c.gold}" text-anchor="middle">真空</text>
      <!-- Height 76cm Dimension Arrow -->
      <line x1="295" y1="65" x2="295" y2="148" stroke="${c.red}" stroke-width="2"/>
      <line x1="290" y1="65" x2="300" y2="65" stroke="${c.red}" stroke-width="1.5"/>
      <line x1="290" y1="148" x2="300" y2="148" stroke="${c.red}" stroke-width="1.5"/>
      <text x="335" y="110" font-size="13" font-weight="800" fill="${c.red}">垂直高度 76 cm</text>
      <!-- Atmospheric pressure arrows pushing down -->
      <line x1="180" y1="115" x2="180" y2="140" stroke="${c.forest}" stroke-width="3"/>
      <polygon points="180,140 175,130 185,130" fill="${c.forest}"/>
      <line x1="360" y1="115" x2="360" y2="140" stroke="${c.forest}" stroke-width="3"/>
      <polygon points="360,140 355,130 365,130" fill="${c.forest}"/>
      <text x="180" y="105" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">大氣壓力 P_atm</text>
      <text x="270" y="198" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">管子無論粗細、傾斜，水銀柱「垂直高度」均為 76 公分</text>
    `)
  },
  'physics-14': {
    title: '凸透鏡三條特殊光線與成像規律',
    subtitle: '平行主軸過焦點、過鏡心不偏折、過焦點平行射出',
    caption: '物距在兩倍焦距外（p > 2f）時，成倒立、縮小實像（照相機原理）；在焦點內（p < f）成正立、放大虛像（放大鏡原理）。',
    render: () => frame('凸透鏡成像', `
      <!-- Principal Axis -->
      <line x1="40" y1="105" x2="500" y2="105" stroke="${c.muted}" stroke-width="1.5"/>
      <!-- Lens -->
      <ellipse cx="270" cy="105" rx="10" ry="80" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2" fill-opacity="0.5"/>
      <!-- Focal Points -->
      <circle cx="190" cy="105" r="4" fill="${c.forest}"/>
      <text x="190" y="125" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">F</text>
      <circle cx="110" cy="105" r="4" fill="${c.forest}"/>
      <text x="110" y="125" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">2F</text>
      <circle cx="350" cy="105" r="4" fill="${c.forest}"/>
      <text x="350" y="125" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">F'</text>
      <circle cx="430" cy="105" r="4" fill="${c.forest}"/>
      <text x="430" y="125" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">2F'</text>
      <!-- Object (Candle) at > 2F -->
      <line x1="80" y1="105" x2="80" y2="45" stroke="${c.gold}" stroke-width="3"/>
      <polygon points="80,38 76,46 84,46" fill="${c.red}"/>
      <text x="80" y="28" font-size="12" font-weight="700" fill="${c.gold}" text-anchor="middle">物體 (p>2F)</text>
      <!-- Rays -->
      <!-- Ray 1: parallel to axis then through F' -->
      <line x1="80" y1="45" x2="270" y2="45" stroke="${c.red}" stroke-width="1.5"/>
      <line x1="270" y1="45" x2="410" y2="150" stroke="${c.red}" stroke-width="1.5"/>
      <!-- Ray 2: through center -->
      <line x1="80" y1="45" x2="410" y2="150" stroke="${c.green}" stroke-width="1.5"/>
      <!-- Real Inverted Image -->
      <line x1="410" y1="105" x2="410" y2="150" stroke="${c.blue}" stroke-width="2.5"/>
      <polygon points="410,155 406,147 414,147" fill="${c.blue}"/>
      <text x="410" y="175" font-size="12" font-weight="700" fill="${c.blue}" text-anchor="middle">倒立縮小實像</text>
    `)
  },
  'physics-15': {
    title: '單擺運動力學能守恆模型',
    subtitle: '動能與重力位能相互轉換：Ek ＋ Ep ＝ 常數',
    caption: '擺錘在兩側最高點 A、C 瞬時靜止，位能最大、動能為 0；通過最低點 B 速率最大，動能最大、位能最小。',
    render: () => frame('力學能守恆', `
      <!-- Pivot -->
      <circle cx="270" cy="30" r="5" fill="${c.dark}"/>
      <line x1="240" y1="30" x2="300" y2="30" stroke="${c.dark}" stroke-width="3"/>
      <!-- Strings -->
      <line x1="270" y1="30" x2="160" y2="115" stroke="${c.muted}" stroke-width="1.5" stroke-dasharray="3,3"/>
      <line x1="270" y1="30" x2="270" y2="150" stroke="${c.forest}" stroke-width="2"/>
      <line x1="270" y1="30" x2="380" y2="115" stroke="${c.muted}" stroke-width="1.5" stroke-dasharray="3,3"/>
      <!-- Bobs -->
      <circle cx="160" cy="115" r="14" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
      <text x="160" y="120" font-size="12" font-weight="700" fill="${c.gold}" text-anchor="middle">A</text>
      <circle cx="270" cy="150" r="14" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
      <text x="270" y="155" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">B</text>
      <circle cx="380" cy="115" r="14" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
      <text x="380" y="120" font-size="12" font-weight="700" fill="${c.gold}" text-anchor="middle">C</text>
      <!-- Trajectory -->
      <path d="M 160 115 Q 270 165 380 115" fill="none" stroke="${c.border}" stroke-width="1.5" stroke-dasharray="4,4"/>
      <!-- Notes -->
      <text x="140" y="155" font-size="11" font-weight="700" fill="${c.gold}">最高點：Ep 最大，Ek＝0</text>
      <text x="270" y="185" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">最低點：Ek 最大，Ep 最小</text>
      <text x="400" y="155" font-size="11" font-weight="700" fill="${c.gold}">最高點：Ep 最大，Ek＝0</text>
    `)
  },

  // === CHEMISTRY ===
  'chemistry-2': {
    title: '原子內部微觀結構與電子軌域層模型',
    subtitle: '原子核（質子＋中子）集中質量，核外電子依能階分層排列',
    caption: '質子帶正電、中子不帶電、電子帶負電。原子序＝質子數＝核外電子數（維持電中性）；質量數＝質子數＋中子數。',
    render: () => frame('原子結構模型', `
      <!-- Electron Shells -->
      <circle cx="270" cy="105" r="80" fill="none" stroke="${c.border}" stroke-width="1.5" stroke-dasharray="4,4"/>
      <circle cx="270" cy="105" r="50" fill="none" stroke="${c.border}" stroke-width="1.5" stroke-dasharray="4,4"/>
      <!-- Nucleus -->
      <circle cx="270" cy="105" r="24" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
      <text x="270" y="102" font-size="10" font-weight="800" fill="${c.red}" text-anchor="middle">質子 p⁺</text>
      <text x="270" y="115" font-size="10" font-weight="800" fill="${c.muted}" text-anchor="middle">中子 n⁰</text>
      <!-- Electrons (Blue dots) -->
      <circle cx="270" cy="55" r="5" fill="${c.blue}"/>
      <circle cx="270" cy="155" r="5" fill="${c.blue}"/>
      <circle cx="190" cy="105" r="5" fill="${c.blue}"/>
      <circle cx="350" cy="105" r="5" fill="${c.blue}"/>
      <text x="280" y="55" font-size="11" font-weight="700" fill="${c.blue}">電子 e⁻</text>
      <!-- Left Callout -->
      <rect x="40" y="45" width="130" height="110" rx="8" fill="${c.white}" stroke="${c.border}"/>
      <text x="105" y="68" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">原子核 (集中質量)</text>
      <line x1="50" y1="78" x2="160" y2="78" stroke="${c.border}"/>
      <text x="55" y="98" font-size="11" fill="${c.red}">● 質子：帶正電 (+1)</text>
      <text x="55" y="118" font-size="11" fill="${c.muted}">● 中子：不帶電 (0)</text>
      <text x="55" y="138" font-size="11" fill="${c.blue}">● 電子：帶負電 (−1)</text>
      <!-- Right Callout -->
      <rect x="370" y="45" width="130" height="110" rx="8" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="435" y="68" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">計量關係</text>
      <line x1="380" y1="78" x2="490" y2="78" stroke="${c.green}"/>
      <text x="435" y="98" font-size="11" font-weight="600" fill="${c.forest}" text-anchor="middle">原子序 ＝ 質子數</text>
      <text x="435" y="125" font-size="11" font-weight="600" fill="${c.forest}" text-anchor="middle">質量數 ＝ 質子＋中子</text>
    `)
  },
  'chemistry-3': {
    title: '化學反應質量守恆微觀粒子模型',
    subtitle: '化學反應前後原子的種類、數目與質量保持守恆',
    caption: '2H₂ ＋ O₂ → 2H₂O：4 個氫原子與 2 個氧原子重新鍵結生成 2 個水分子，反應前後總質量不變。',
    render: () => frame('反應式質量守恆', `
      <!-- Left Reactants: 2 H2 + 1 O2 -->
      <g transform="translate(60, 60)">
        <circle cx="25" cy="30" r="12" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <circle cx="43" cy="30" r="12" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="34" y="34" font-size="10" font-weight="700" fill="${c.blue}" text-anchor="middle">H₂</text>

        <circle cx="25" cy="65" r="12" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <circle cx="43" cy="65" r="12" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="34" y="69" font-size="10" font-weight="700" fill="${c.blue}" text-anchor="middle">H₂</text>

        <text x="80" y="55" font-size="20" font-weight="700" fill="${c.muted}">＋</text>

        <circle cx="120" cy="50" r="18" fill="${c.lightRed}" stroke="${c.red}" stroke-width="2"/>
        <circle cx="148" cy="50" r="18" fill="${c.lightRed}" stroke="${c.red}" stroke-width="2"/>
        <text x="134" y="55" font-size="12" font-weight="700" fill="${c.red}" text-anchor="middle">O₂</text>
        <text x="95" y="110" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">反應前：4個H ＋ 2個O</text>
      </g>
      <!-- Arrow -->
      <g transform="translate(250, 100)">
        <line x1="0" y1="0" x2="35" y2="0" stroke="${c.forest}" stroke-width="3"/>
        <polygon points="35,-6 45,0 35,6" fill="${c.forest}"/>
      </g>
      <!-- Right Products: 2 H2O -->
      <g transform="translate(325, 60)">
        <circle cx="60" cy="35" r="18" fill="${c.lightRed}" stroke="${c.red}" stroke-width="2"/>
        <circle cx="45" cy="22" r="11" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <circle cx="75" cy="22" r="11" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="60" y="40" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">H₂O</text>

        <circle cx="60" cy="80" r="18" fill="${c.lightRed}" stroke="${c.red}" stroke-width="2"/>
        <circle cx="45" cy="67" r="11" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <circle cx="75" cy="67" r="11" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="60" y="85" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">H₂O</text>
        <text x="60" y="125" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">反應後：4個H ＋ 2個O</text>
      </g>
    `)
  },
  'chemistry-5': {
    title: '酸鹼度 pH 標度與指示劑呈色尺',
    subtitle: 'pH < 7 呈酸性，pH ＝ 7 呈中性，pH > 7 呈鹼性',
    caption: 'pH 值每相差 1，氫離子濃度相差 10 倍。石蕊試紙酸紅鹼藍，酚酞遇鹼呈鮮艷紅紫色。',
    render: () => frame('pH 標度', `
      <!-- pH Gradient Bar -->
      <defs>
        <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d93829"/>
          <stop offset="25%" stop-color="#e88a38"/>
          <stop offset="50%" stop-color="#4ea34a"/>
          <stop offset="75%" stop-color="#3b789e"/>
          <stop offset="100%" stop-color="#5a388a"/>
        </linearGradient>
      </defs>
      <rect x="50" y="65" width="440" height="28" rx="6" fill="url(#phGrad)"/>
      ${[0,2,4,6,7,8,10,12,14].map(val => {
        const x = 50 + (val / 14) * 440;
        return `
          <line x1="${x}" y1="60" x2="${x}" y2="98" stroke="${c.white}" stroke-width="1.5"/>
          <text x="${x}" y="118" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">${val}</text>
        `;
      }).join('')}
      <!-- Annotations -->
      <text x="120" y="48" font-size="13" font-weight="700" fill="${c.red}">強酸性 (胃酸、檸檬)</text>
      <text x="270" y="48" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">中性 (純水 pH=7)</text>
      <text x="420" y="48" font-size="13" font-weight="700" fill="${c.purple}" text-anchor="middle">強鹼性 (肥皂、氨水)</text>
      <rect x="50" y="145" width="440" height="40" rx="8" fill="${c.lightGreen}"/>
      <text x="270" y="170" font-size="13" font-weight="600" fill="${c.forest}" text-anchor="middle">石蕊指示劑：酸紅 / 鹼藍 ； 酚酞指示劑：酸無色 / 鹼深紅</text>
    `)
  },
  'chemistry-8': {
    title: '化學動態平衡與勒沙特列原理移動模型',
    subtitle: '密閉系統中，正反應速率 ＝ 逆反應速率，巨觀濃度維持不變',
    caption: '二鉻酸根 (Cr₂O₇²⁻，橙色) ＋ 水 ⇌ 鉻酸根 (2CrO₄²⁻，黃色) ＋ 2H⁺：加酸向左呈橙色，加鹼向右呈黃色。',
    render: () => frame('勒沙特列平衡移動', `
      <!-- Two flasks comparison -->
      <g transform="translate(60, 30)">
        <rect x="0" y="0" width="180" height="145" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="90" y="30" font-size="14" font-weight="800" fill="${c.gold}" text-anchor="middle">酸性環境 (加 H⁺)</text>
        <circle cx="90" cy="75" r="30" fill="#e88a38"/>
        <text x="90" y="80" font-size="12" font-weight="800" fill="${c.white}" text-anchor="middle">橙色 Cr₂O₇²⁻</text>
        <text x="90" y="130" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">平衡向「左」移動</text>
      </g>
      <!-- Center Equilibrium symbol -->
      <g transform="translate(255, 80)">
        <line x1="0" y1="0" x2="30" y2="0" stroke="${c.forest}" stroke-width="2.5"/>
        <polygon points="30,0 23,-4 23,4" fill="${c.forest}"/>
        <line x1="30" y1="14" x2="0" y2="14" stroke="${c.forest}" stroke-width="2.5"/>
        <polygon points="0,14 7,10 7,18" fill="${c.forest}"/>
        <text x="15" y="38" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">動態平衡</text>
      </g>
      <g transform="translate(300, 30)">
        <rect x="0" y="0" width="180" height="145" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <text x="90" y="30" font-size="14" font-weight="800" fill="${c.forest}" text-anchor="middle">鹼性環境 (加 OH⁻)</text>
        <circle cx="90" cy="75" r="30" fill="#e8c238"/>
        <text x="90" y="80" font-size="12" font-weight="800" fill="${c.white}" text-anchor="middle">黃色 CrO₄²⁻</text>
        <text x="90" y="130" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">平衡向「右」移動</text>
      </g>
      <text x="270" y="195" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">勒沙特列法則：系統會朝「減弱外界改變」的方向移動</text>
    `)
  },
  'chemistry-14': {
    title: '莫耳數概念與反應計量換算金三角',
    subtitle: '莫耳 (mol) 為化學計量橋樑：連結微觀粒子數與巨觀質量',
    caption: '1 mol ＝ 6.02 × 10²³ 個粒子。質量＝莫耳數 × 原子量（或分子量）。化學方程式係數比＝反應莫耳數比。',
    render: () => frame('莫耳換算三角', `
      <!-- Central Mole Circle -->
      <circle cx="270" cy="105" r="45" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="3"/>
      <text x="270" y="102" font-size="16" font-weight="800" fill="${c.gold}" text-anchor="middle">莫耳數</text>
      <text x="270" y="120" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">(mol)</text>
      <!-- Top: Particle Count -->
      <rect x="195" y="15" width="150" height="36" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
      <text x="270" y="38" font-size="13" font-weight="700" fill="${c.blue}" text-anchor="middle">粒子數 (原子/分子)</text>
      <line x1="270" y1="52" x2="270" y2="60" stroke="${c.muted}" stroke-width="1.5"/>
      <text x="315" y="58" font-size="10" font-weight="700" fill="${c.forest}">× 6×10²³</text>
      <!-- Bottom Left: Mass -->
      <rect x="40" y="150" width="150" height="38" rx="6" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
      <text x="115" y="174" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">物質質量 (公克 g)</text>
      <!-- Arrow to Mass -->
      <path d="M 230 125 L 170 150" stroke="${c.forest}" stroke-width="2"/>
      <text x="175" y="130" font-size="10" font-weight="700" fill="${c.forest}">× 分子量</text>
      <!-- Bottom Right: Volume for Gas -->
      <rect x="350" y="150" width="150" height="38" rx="6" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="2"/>
      <text x="425" y="174" font-size="13" font-weight="700" fill="${c.purple}" text-anchor="middle">氣體體積 (STP 22.4L)</text>
      <!-- Arrow to Volume -->
      <path d="M 310 125 L 370 150" stroke="${c.purple}" stroke-width="2"/>
      <text x="365" y="130" font-size="10" font-weight="700" fill="${c.purple}">× 22.4 L</text>
    `)
  },

  // === BIOLOGY ===
  'biology-1': {
    title: '動植物細胞構造對比模型',
    subtitle: '細胞膜、細胞核、粒線體為動植物共有；細胞壁與葉綠體為多數植物專有',
    caption: '植物細胞具有纖維素構成的細胞壁以維持細胞形狀，成熟植物細胞常具備大型中央液胞與葉綠體。',
    render: () => frame('細胞構造對比', `
      <!-- Plant Cell (Left) -->
      <g transform="translate(60, 30)">
        <polygon points="10,20 150,10 165,130 15,140" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="3"/>
        <polygon points="16,25 144,16 158,124 21,133" fill="none" stroke="${c.green}" stroke-width="1.5"/>
        <circle cx="55" cy="65" r="18" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="2"/>
        <text x="55" y="70" font-size="10" font-weight="700" fill="${c.purple}" text-anchor="middle">細胞核</text>
        <ellipse cx="110" cy="45" rx="12" ry="7" fill="${c.green}"/>
        <ellipse cx="125" cy="95" rx="12" ry="7" fill="${c.green}"/>
        <ellipse cx="95" cy="85" rx="30" ry="22" fill="${c.lightBlue}" stroke="${c.blue}" fill-opacity="0.6"/>
        <text x="95" y="89" font-size="11" font-weight="600" fill="${c.blue}" text-anchor="middle">大液胞</text>
        <text x="85" y="160" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">植物細胞 (具細胞壁與葉綠體)</text>
      </g>
      <!-- Animal Cell (Right) -->
      <g transform="translate(310, 30)">
        <ellipse cx="85" cy="75" rx="75" ry="60" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2.5"/>
        <circle cx="85" cy="75" r="20" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="2"/>
        <text x="85" y="80" font-size="10" font-weight="700" fill="${c.purple}" text-anchor="middle">細胞核</text>
        <ellipse cx="45" cy="45" rx="10" ry="6" fill="${c.red}" fill-opacity="0.8"/>
        <ellipse cx="130" cy="100" rx="10" ry="6" fill="${c.red}" fill-opacity="0.8"/>
        <text x="85" y="160" font-size="13" font-weight="700" fill="${c.gold}" text-anchor="middle">動物細胞 (無細胞壁、無葉綠體)</text>
      </g>
    `)
  },
  'biology-3': {
    title: '人體雙循環系統血流動向模型',
    subtitle: '體循環（左心室出發至全身）與肺循環（右心室出發至肺泡交換氣體）',
    caption: '動脈為離開心臟之血管；肺動脈運送缺氧血，肺靜脈運送充氧血，左心室肌肉壁最厚負責將血打至全身。',
    render: () => frame('人體血液循環', `
      <!-- Lung Capillaries -->
      <rect x="200" y="20" width="140" height="30" rx="8" fill="${c.lightPurple}" stroke="${c.purple}"/>
      <text x="270" y="40" font-size="12" font-weight="700" fill="${c.purple}" text-anchor="middle">肺部微血管 (氣體交換)</text>
      <!-- Heart Box -->
      <rect x="190" y="70" width="160" height="70" rx="10" fill="${c.white}" stroke="${c.border}" stroke-width="2"/>
      <line x1="270" y1="70" x2="270" y2="140" stroke="${c.border}" stroke-width="2"/>
      <line x1="190" y1="105" x2="350" y2="105" stroke="${c.border}" stroke-width="2"/>
      <text x="230" y="93" font-size="11" font-weight="700" fill="${c.blue}">右心房</text>
      <text x="310" y="93" font-size="11" font-weight="700" fill="${c.red}">左心房</text>
      <text x="230" y="128" font-size="11" font-weight="700" fill="${c.blue}">右心室</text>
      <text x="310" y="128" font-size="11" font-weight="700" fill="${c.red}">左心室</text>
      <!-- Body Capillaries -->
      <rect x="200" y="160" width="140" height="30" rx="8" fill="${c.lightGold}" stroke="${c.gold}"/>
      <text x="270" y="180" font-size="12" font-weight="700" fill="${c.gold}" text-anchor="middle">全身組織微血管</text>
      <!-- Pulmonary Circuit -->
      <path d="M 230 70 Q 150 45 200 35" fill="none" stroke="${c.blue}" stroke-width="2.5"/>
      <text x="140" y="55" font-size="10" font-weight="700" fill="${c.blue}">肺動脈</text>
      <path d="M 340 35 Q 390 45 320 70" fill="none" stroke="${c.red}" stroke-width="2.5"/>
      <text x="390" y="55" font-size="10" font-weight="700" fill="${c.red}">肺靜脈</text>
      <!-- Systemic Circuit -->
      <path d="M 330 140 Q 400 165 340 175" fill="none" stroke="${c.red}" stroke-width="2.5"/>
      <text x="400" y="155" font-size="10" font-weight="700" fill="${c.red}">主動脈</text>
      <path d="M 200 175 Q 140 165 210 140" fill="none" stroke="${c.blue}" stroke-width="2.5"/>
      <text x="140" y="155" font-size="10" font-weight="700" fill="${c.blue}">大靜脈</text>
    `)
  },
  'biology-4': {
    title: '神經傳導路徑與反射弧傳遞模型',
    subtitle: '受器 ➔ 感覺神經元 ➔ 脊髓反射中樞 ➔ 運動神經元 ➔ 動器',
    caption: '縮手或膝跳反射直接由脊髓發布命令，不經過大腦即可完成動作以爭取避險時效，大腦隨後感知疼痛。',
    render: () => frame('反射弧路徑', `
      <!-- Flow steps -->
      <g transform="translate(30, 80)">
        <rect x="0" y="0" width="80" height="50" rx="6" fill="${c.lightRed}" stroke="${c.red}"/>
        <text x="40" y="24" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">受器</text>
        <text x="40" y="38" font-size="9" fill="${c.muted}" text-anchor="middle">(皮膚/眼/耳)</text>

        <path d="M 85 25 L 115 25" stroke="${c.forest}" stroke-width="2"/>
        <polygon points="115,25 107,21 107,29" fill="${c.forest}"/>

        <rect x="120" y="0" width="90" height="50" rx="6" fill="${c.lightBlue}" stroke="${c.blue}"/>
        <text x="165" y="24" font-size="11" font-weight="700" fill="${c.blue}" text-anchor="middle">感覺神經元</text>
        <text x="165" y="38" font-size="9" fill="${c.muted}" text-anchor="middle">傳入中樞</text>

        <path d="M 215 25 L 245 25" stroke="${c.forest}" stroke-width="2"/>
        <polygon points="245,25 237,21 237,29" fill="${c.forest}"/>

        <rect x="250" y="-10" width="90" height="70" rx="8" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="2"/>
        <text x="295" y="20" font-size="12" font-weight="800" fill="${c.purple}" text-anchor="middle">脊髓中樞</text>
        <text x="295" y="38" font-size="10" fill="${c.purple}" text-anchor="middle">(反射控制)</text>

        <path d="M 345 25 L 375 25" stroke="${c.forest}" stroke-width="2"/>
        <polygon points="375,25 367,21 367,29" fill="${c.forest}"/>

        <rect x="380" y="0" width="90" height="50" rx="6" fill="${c.lightGreen}" stroke="${c.green}"/>
        <text x="425" y="24" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">運動神經元</text>
        <text x="425" y="38" font-size="9" fill="${c.muted}" text-anchor="middle">傳出指令</text>
      </g>
      <!-- Brain loop above -->
      <path d="M 295 70 L 295 40" stroke="${c.muted}" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="295" y="30" font-size="11" font-weight="700" fill="${c.muted}" text-anchor="middle">向上傳送至大腦 (事後感覺)</text>
      <text x="270" y="185" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">反射關鍵：動器迅速反應避險 ➔ 訊息上傳大腦產生痛覺</text>
    `)
  },
  'biology-5': {
    title: '孟德爾單性雜交遺傳與棋盤方格法 (Punnett Square)',
    subtitle: '雜合子 Tt × Tt：基因型比例 1:2:1，表現型比例 3:1',
    caption: '顯性等位基因 (T) 遮蔽隱性等位基因 (t)。基因型 TT (1/4)、Tt (1/2) 均表現高莖，tt (1/4) 表現矮莖。',
    render: () => frame('棋盤方格法', `
      <!-- Punnett Square (Center) -->
      <g transform="translate(190, 35)">
        <!-- Header Gametes -->
        <text x="50" y="-8" font-size="14" font-weight="800" fill="${c.forest}" text-anchor="middle">T</text>
        <text x="110" y="-8" font-size="14" font-weight="800" fill="${c.gold}" text-anchor="middle">t</text>
        <text x="-15" y="42" font-size="14" font-weight="800" fill="${c.forest}">T</text>
        <text x="-15" y="102" font-size="14" font-weight="800" fill="${c.gold}">t</text>
        <!-- 4 Grid Cells -->
        <rect x="20" y="10" width="60" height="60" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <text x="50" y="46" font-size="16" font-weight="800" fill="${c.forest}" text-anchor="middle">TT</text>
        <rect x="80" y="10" width="60" height="60" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <text x="110" y="46" font-size="16" font-weight="800" fill="${c.forest}" text-anchor="middle">Tt</text>
        <rect x="20" y="70" width="60" height="60" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <text x="50" y="106" font-size="16" font-weight="800" fill="${c.forest}" text-anchor="middle">Tt</text>
        <rect x="80" y="70" width="60" height="60" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="110" y="106" font-size="16" font-weight="800" fill="${c.gold}" text-anchor="middle">tt</text>
      </g>
      <!-- Left Callout: Genotype -->
      <rect x="35" y="55" width="120" height="85" rx="6" fill="${c.white}" stroke="${c.border}"/>
      <text x="95" y="78" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">基因型比例</text>
      <text x="95" y="102" font-size="13" font-weight="800" fill="${c.forest}" text-anchor="middle">TT : Tt : tt</text>
      <text x="95" y="124" font-size="14" font-weight="700" fill="${c.blue}" text-anchor="middle">1 : 2 : 1</text>
      <!-- Right Callout: Phenotype -->
      <rect x="385" y="55" width="120" height="85" rx="6" fill="${c.white}" stroke="${c.border}"/>
      <text x="445" y="78" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">表現型比例</text>
      <text x="445" y="102" font-size="13" font-weight="800" fill="${c.forest}" text-anchor="middle">高莖 : 矮莖</text>
      <text x="445" y="124" font-size="14" font-weight="800" fill="${c.red}" text-anchor="middle">3 : 1</text>
    `)
  },
  'biology-13': {
    title: '人體中樞神經系統：腦部與脊髓分工剖面',
    subtitle: '大腦（意識思維）、小腦（協調平衡）、腦幹（生命中樞）、脊髓（軀幹反射）',
    caption: '腦幹控制呼吸、心跳、吞嚥等非自主生命機能；小腦協調骨骼肌精細動作維持平衡；大腦負責感官、語言與記憶。',
    render: () => frame('中樞神經分工', `
      <!-- Cerebrum (Large Top) -->
      <path d="M 170 110 C 140 40, 240 25, 290 35 C 330 45, 340 90, 310 110 Z" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="2.5"/>
      <text x="240" y="75" font-size="14" font-weight="800" fill="${c.purple}" text-anchor="middle">大 腦</text>
      <text x="240" y="93" font-size="10" fill="${c.muted}" text-anchor="middle">思考/感覺/記憶/意識</text>
      <!-- Cerebellum (Back Lower) -->
      <ellipse cx="320" cy="135" rx="28" ry="20" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
      <text x="320" y="138" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">小 腦</text>
      <text x="320" y="152" font-size="9" fill="${c.muted}" text-anchor="middle">平衡協調</text>
      <!-- Brainstem (Center Stem) -->
      <rect x="235" y="110" width="30" height="45" rx="4" fill="${c.lightRed}" stroke="${c.red}" stroke-width="2"/>
      <text x="250" y="134" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">腦幹</text>
      <!-- Spinal Cord (Going Down) -->
      <rect x="242" y="155" width="16" height="35" rx="3" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.8"/>
      <text x="250" y="180" font-size="10" font-weight="700" fill="${c.blue}" text-anchor="middle">脊髓</text>
      <!-- Function Annotations -->
      <rect x="40" y="45" width="115" height="45" rx="6" fill="${c.white}" stroke="${c.border}"/>
      <text x="97" y="65" font-size="11" font-weight="700" fill="${c.purple}" text-anchor="middle">大腦皮質</text>
      <text x="97" y="80" font-size="10" fill="${c.muted}" text-anchor="middle">感覺運動主控</text>

      <rect x="380" y="115" width="130" height="50" rx="6" fill="${c.lightRed}" stroke="${c.red}"/>
      <text x="445" y="135" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">腦幹：生命中樞</text>
      <text x="445" y="152" font-size="10" fill="${c.muted}" text-anchor="middle">心跳、呼吸、血壓</text>
    `)
  },

  // === EARTH SCIENCE ===
  'earth-8': {
    title: '板塊構造學說與臺灣聚合造山帶剖面',
    subtitle: '歐亞大陸板塊與菲律賓海板塊強烈擠壓碰撞',
    caption: '花東縱谷為兩大板塊交界的縫合帶，菲律賓海板塊在東北方向下隱沒，造就大屯火山群；在東南方歐亞板塊隱沒形成中央山脈隆起。',
    render: () => frame('臺灣板塊構造剖面', `
      <!-- Continental Crust (Eurasian Plate) -->
      <path d="M 40 130 Q 140 130 200 100 L 260 70 L 290 120 L 40 150 Z" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="2"/>
      <text x="110" y="145" font-size="13" font-weight="700" fill="${c.forest}">歐亞大陸板塊</text>
      <text x="240" y="60" font-size="12" font-weight="700" fill="${c.forest}">中央山脈</text>
      <!-- Suture line (Hualien-Taitung Valley) -->
      <line x1="290" y1="120" x2="310" y2="90" stroke="${c.red}" stroke-width="2.5" stroke-dasharray="3,3"/>
      <text x="300" y="80" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">花東縱谷縫合帶</text>
      <!-- Coastal Range (Philippine Sea Plate) -->
      <path d="M 310 90 L 350 75 L 490 110 L 490 160 L 290 170 Z" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
      <text x="340" y="70" font-size="12" font-weight="700" fill="${c.blue}">海岸山脈</text>
      <text x="420" y="145" font-size="13" font-weight="700" fill="${c.blue}">菲律賓海板塊</text>
      <!-- Collision arrows -->
      <g transform="translate(190, 165)">
        <line x1="0" y1="0" x2="35" y2="0" stroke="${c.forest}" stroke-width="3"/>
        <polygon points="35,-5 45,0 35,5" fill="${c.forest}"/>
      </g>
      <g transform="translate(370, 165)">
        <line x1="0" y1="0" x2="-35" y2="0" stroke="${c.blue}" stroke-width="3"/>
        <polygon points="-35,-5 -45,0 -35,5" fill="${c.blue}"/>
      </g>
      <text x="270" y="195" font-size="13" font-weight="700" fill="${c.red}" text-anchor="middle">強烈聚合碰撞：每年約 8 公分擠壓，地震頻繁</text>
    `)
  },
  'earth-9': {
    title: '冷鋒與暖鋒雲系剖面與天氣特徵模型',
    subtitle: '冷氣團楔入暖氣團下方形成積雨雲驟雨 vs 暖氣團徐緩爬升形成層狀雲連續雨',
    caption: '臺灣冬季東北季風南下常伴隨冷鋒通過：氣溫驟降、氣壓回升、風向轉為偏北風，常有短暫雷陣雨或強陣風。',
    render: () => frame('鋒面系統剖面', `
      <!-- Left: Cold Front -->
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="215" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="107" y="25" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">冷鋒 (Cold Front)</text>
        <!-- Cold air wedge -->
        <polygon points="15,130 140,130 110,65 15,90" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.8"/>
        <text x="60" y="115" font-size="11" font-weight="700" fill="${c.blue}">冷氣團前推 ➔</text>
        <!-- Cumulonimbus Cloud -->
        <ellipse cx="125" cy="55" rx="28" ry="18" fill="${c.muted}" fill-opacity="0.3"/>
        <text x="125" y="58" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">積雨雲</text>
        <!-- Rain shower -->
        <line x1="115" y1="75" x2="110" y2="95" stroke="${c.blue}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <line x1="125" y1="75" x2="120" y2="95" stroke="${c.blue}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <line x1="135" y1="75" x2="130" y2="95" stroke="${c.blue}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <text x="107" y="150" font-size="10" font-weight="700" fill="${c.red}" text-anchor="middle">天氣：短暫強降雨、驟降溫</text>
      </g>
      <!-- Right: Warm Front -->
      <g transform="translate(285, 20)">
        <rect x="0" y="0" width="215" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="107" y="25" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">暖鋒 (Warm Front)</text>
        <!-- Cold air retreat slope -->
        <polygon points="100,130 195,130 195,85 100,130" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="150" y="115" font-size="10" fill="${c.blue}">冷空氣退行</text>
        <!-- Warm air climbing -->
        <path d="M 25 125 Q 90 90 180 50" fill="none" stroke="${c.red}" stroke-width="2.5"/>
        <polygon points="180,50 170,52 174,60" fill="${c.red}"/>
        <text x="75" y="85" font-size="10" font-weight="700" fill="${c.red}">暖空氣徐升</text>
        <!-- Stratus Cloud -->
        <ellipse cx="140" cy="50" rx="35" ry="12" fill="${c.muted}" fill-opacity="0.3"/>
        <text x="140" y="53" font-size="10" fill="${c.dark}" text-anchor="middle">層狀雲</text>
        <text x="107" y="150" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">天氣：範圍廣泛、持續性降雨</text>
      </g>
    `)
  },
  'earth-10': {
    title: '日地月引潮力幾何：大潮與小潮成因模型',
    subtitle: '初一（朔）與十五（望）引潮力同向為大潮；初八與廿三引潮力垂直為小潮',
    caption: '滿潮與乾潮的水位差稱為潮差。大潮時潮差最大，適合觀察潮間帶生態；小潮時潮差最小。',
    render: () => frame('引潮力與潮汐', `
      <!-- Left: Spring Tide (大潮) -->
      <g transform="translate(30, 20)">
        <rect x="0" y="0" width="230" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="115" y="24" font-size="13" font-weight="800" fill="${c.gold}" text-anchor="middle">大潮 (Spring Tide) · 朔/望</text>
        <!-- Sun, Moon, Earth on same line -->
        <circle cx="35" cy="80" r="16" fill="${c.gold}"/>
        <text x="35" y="108" font-size="9" font-weight="700" fill="${c.gold}" text-anchor="middle">日</text>
        <!-- Tidal bulge Earth -->
        <ellipse cx="120" cy="80" rx="26" ry="16" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.8"/>
        <circle cx="120" cy="80" r="16" fill="${c.forest}"/>
        <text x="120" y="84" font-size="9" font-weight="700" fill="${c.white}" text-anchor="middle">地</text>
        <!-- Moon -->
        <circle cx="185" cy="80" r="10" fill="${c.dark}"/>
        <text x="185" y="105" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">月(初一/十五)</text>
        <text x="115" y="145" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">引潮力同軸疊加 ➔ 潮差最大</text>
      </g>
      <!-- Right: Neap Tide (小潮) -->
      <g transform="translate(280, 20)">
        <rect x="0" y="0" width="230" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="115" y="24" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">小潮 (Neap Tide) · 上下弦</text>
        <!-- Sun horizontal -->
        <circle cx="35" cy="80" r="16" fill="${c.gold}"/>
        <text x="35" y="108" font-size="9" font-weight="700" fill="${c.gold}" text-anchor="middle">日</text>
        <!-- Earth -->
        <circle cx="125" cy="80" r="18" fill="${c.forest}"/>
        <text x="125" y="84" font-size="9" font-weight="700" fill="${c.white}" text-anchor="middle">地</text>
        <!-- Moon at 90 deg above -->
        <circle cx="125" cy="40" r="9" fill="${c.dark}"/>
        <text x="155" y="44" font-size="9" font-weight="700" fill="${c.dark}">月(初八/廿三)</text>
        <line x1="125" y1="80" x2="125" y2="52" stroke="${c.muted}" stroke-width="1.2" stroke-dasharray="2,2"/>
        <line x1="55" y1="80" x2="105" y2="80" stroke="${c.muted}" stroke-width="1.2" stroke-dasharray="2,2"/>
        <text x="115" y="145" font-size="11" font-weight="700" fill="${c.blue}" text-anchor="middle">引力夾角 90° 相互抵消 ➔ 潮差最小</text>
      </g>
    `)
  },
  'earth-11': {
    title: '地震波 P波與 S波傳播特性及時差判讀',
    subtitle: 'P波（縱波／快／上下震動）率先抵達，S波（橫波／慢／破壞力大）緊隨其後',
    caption: '震央距離愈遠，P波與S波抵達測站的「P-S 時間差」愈大，利用三座測站交會圓即可精確鎖定震央。',
    render: () => frame('地震波特性比較', `
      <!-- P Wave (Compressional) -->
      <g transform="translate(50, 30)">
        <rect x="0" y="0" width="440" height="60" rx="6" fill="${c.lightBlue}" stroke="${c.blue}"/>
        <text x="20" y="26" font-size="13" font-weight="800" fill="${c.blue}">P 波 (Primary Wave) · 縱波 / 疏密波</text>
        <text x="20" y="46" font-size="11" fill="${c.dark}">速度最快 (5~7 km/s) · 先抵達 · 介質上下震動 · 可穿透固、液、氣態</text>
        <!-- Wave marks -->
        <line x1="330" y1="18" x2="330" y2="42" stroke="${c.blue}" stroke-width="3"/>
        <line x1="340" y1="18" x2="340" y2="42" stroke="${c.blue}" stroke-width="3"/>
        <line x1="355" y1="18" x2="355" y2="42" stroke="${c.blue}" stroke-width="1"/>
        <line x1="375" y1="18" x2="375" y2="42" stroke="${c.blue}" stroke-width="1"/>
        <line x1="390" y1="18" x2="390" y2="42" stroke="${c.blue}" stroke-width="3"/>
        <line x1="400" y1="18" x2="400" y2="42" stroke="${c.blue}" stroke-width="3"/>
      </g>
      <!-- S Wave (Shear) -->
      <g transform="translate(50, 105)">
        <rect x="0" y="0" width="440" height="60" rx="6" fill="${c.lightRed}" stroke="${c.red}"/>
        <text x="20" y="26" font-size="13" font-weight="800" fill="${c.red}">S 波 (Secondary Wave) · 橫波 / 剪力波</text>
        <text x="20" y="46" font-size="11" fill="${c.dark}">速度較慢 (3~4 km/s) · 後抵達 · 左右劇烈搖晃破壞大 · 僅能穿透固態</text>
        <!-- Sine wave -->
        <path d="M 330 30 Q 345 10 360 30 T 390 30 T 420 30" fill="none" stroke="${c.red}" stroke-width="2.5"/>
      </g>
      <text x="270" y="190" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">防震預警核心：利用電波速度 >> S波破壞波，爭取數秒至數十秒避難黃金時間</text>
    `)
  },
  'earth-12': {
    title: '日食與月食天體運行幾何光影模型',
    subtitle: '日食必發生於農曆初一（朔），月食必發生於農曆十五（望）',
    caption: '日食是月球運行至太陽與地球之間擋住陽光；月食是月球運行進入地球本影中，呈現暗紅色「血月」。',
    render: () => frame('日食與月食幾何', `
      <!-- Sun -->
      <circle cx="65" cy="105" r="35" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="3"/>
      <text x="65" y="110" font-size="14" font-weight="800" fill="${c.gold}" text-anchor="middle">太陽</text>
      <!-- Solar Eclipse (Upper part) -->
      <g transform="translate(0, -35)">
        <circle cx="250" cy="105" r="10" fill="${c.dark}"/>
        <text x="250" y="85" font-size="11" font-weight="700" fill="${c.dark}" text-anchor="middle">月球 (初一)</text>
        <circle cx="430" cy="105" r="22" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="430" y="110" font-size="12" font-weight="700" fill="${c.blue}" text-anchor="middle">地球</text>
        <line x1="98" y1="90" x2="250" y2="100" stroke="${c.gold}" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="98" y1="120" x2="250" y2="110" stroke="${c.gold}" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="250" y1="100" x2="408" y2="105" stroke="${c.dark}" stroke-width="1.2"/>
        <text x="320" y="80" font-size="12" font-weight="700" fill="${c.forest}">日食 (月遮日)</text>
      </g>
      <!-- Lunar Eclipse (Lower part) -->
      <g transform="translate(0, 35)">
        <circle cx="270" cy="105" r="22" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="270" y="110" font-size="12" font-weight="700" fill="${c.blue}" text-anchor="middle">地球</text>
        <circle cx="440" cy="105" r="10" fill="${c.red}"/>
        <text x="440" y="85" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">月球 (十五)</text>
        <polygon points="285,90 470,98 470,112 285,120" fill="${c.dark}" fill-opacity="0.15"/>
        <text x="350" y="125" font-size="12" font-weight="700" fill="${c.red}">月食 (地遮月)</text>
      </g>
    `)
  },

  // === GEOGRAPHY ===
  'geography-1': {
    title: '經緯度網格系統與世界時區推算模型',
    subtitle: '緯度決定氣候帶（赤道0°/回歸線23.5°/極圈66.5°）；經度每15°相差1小時（東加西減）',
    caption: '本初子午線（0°經線）通過英國格林威治；國際換日線約在180°經線，自西向東跨越減一天，自東向西跨越加一天。',
    render: () => frame('經緯度與時區', `
      <!-- Globe Grid Frame -->
      <g transform="translate(70, 20)">
        <circle cx="80" cy="80" r="70" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2" fill-opacity="0.5"/>
        <!-- Equator -->
        <line x1="10" y1="80" x2="150" y2="80" stroke="${c.red}" stroke-width="2"/>
        <text x="160" y="84" font-size="10" font-weight="700" fill="${c.red}">赤道 0°</text>
        <!-- Tropics -->
        <line x1="20" y1="52" x2="140" y2="52" stroke="${c.gold}" stroke-width="1.2" stroke-dasharray="3,2"/>
        <text x="150" y="55" font-size="9" fill="${c.gold}">北回歸線 23.5°N</text>
        <line x1="20" y1="108" x2="140" y2="108" stroke="${c.gold}" stroke-width="1.2" stroke-dasharray="3,2"/>
        <!-- Prime Meridian -->
        <line x1="80" y1="10" x2="80" y2="150" stroke="${c.forest}" stroke-width="2"/>
        <text x="80" y="165" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">本初子午線 0°</text>
      </g>
      <!-- Timezone Rule Panel -->
      <g transform="translate(290, 30)">
        <rect x="0" y="0" width="215" height="145" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="107" y="28" font-size="14" font-weight="800" fill="${c.dark}" text-anchor="middle">時區推算黃金法則</text>
        <line x1="20" y1="40" x2="195" y2="40" stroke="${c.border}"/>
        <text x="20" y="65" font-size="12" font-weight="700" fill="${c.forest}">● 經度 15° ＝ 1 小時</text>
        <text x="20" y="90" font-size="12" font-weight="800" fill="${c.blue}">● 「東加西減」</text>
        <text x="35" y="108" font-size="11" fill="${c.muted}">愈往東迎晨光，時間愈快</text>
        <text x="20" y="130" font-size="11" font-weight="700" fill="${c.red}">臺灣 (120°E) ＝ GMT ＋ 8</text>
      </g>
    `)
  },
  'geography-2': {
    title: '等高線地形判讀核心模型',
    subtitle: '凸向低處為山脊（分水嶺），凸向高處為山谷（河流集水線）',
    caption: '閉合圓圈海拔內高外低為山頂；等高線越密集代表坡度越陡峭，越稀疏代表地勢平緩。',
    render: () => frame('等高線判讀', `
      <!-- Concentric contour lines -->
      <ellipse cx="270" cy="105" rx="200" ry="80" fill="none" stroke="${c.green}" stroke-width="1.5"/>
      <text x="455" y="108" font-size="11" font-weight="700" fill="${c.green}">100m</text>
      <ellipse cx="270" cy="105" rx="140" ry="55" fill="none" stroke="${c.green}" stroke-width="1.8"/>
      <text x="395" y="108" font-size="11" font-weight="700" fill="${c.green}">200m</text>
      <ellipse cx="270" cy="105" rx="80" ry="32" fill="none" stroke="${c.green}" stroke-width="2"/>
      <text x="335" y="108" font-size="11" font-weight="700" fill="${c.green}">300m</text>
      <circle cx="270" cy="105" r="3" fill="${c.dark}"/>
      <text x="270" y="95" font-size="12" font-weight="800" fill="${c.dark}" text-anchor="middle">▲ 山頂 350m</text>
      <!-- Valley arrow & stream -->
      <path d="M 270 105 Q 240 140 220 185" fill="none" stroke="${c.blue}" stroke-width="2.5"/>
      <text x="210" y="175" font-size="12" font-weight="700" fill="${c.blue}">河流發源於山谷 (凸向高處)</text>
      <!-- Ridge arrow -->
      <path d="M 270 105 Q 330 65 370 30" fill="none" stroke="${c.gold}" stroke-width="2.5" stroke-dasharray="4,3"/>
      <text x="380" y="35" font-size="12" font-weight="700" fill="${c.gold}">山脊分水嶺 (凸向低處)</text>
    `)
  },

  // === CIVICS ===
  'civics-5': {
    title: '市場經濟供需曲線與均衡價格模型',
    subtitle: '需求曲線向下傾斜（價高少買），供給曲線向上傾斜（價高多賣），交點達成市場均衡',
    caption: '當價格高於均衡價 P* 時產生「供過於求（超額供給）」，促使降價；當低於均衡價時產生「供不應求（超額需求）」，推動漲價。',
    render: () => frame('供需均衡曲線', `
      <!-- Axes -->
      <line x1="70" y1="170" x2="470" y2="170" stroke="${c.border}" stroke-width="2"/>
      <line x1="70" y1="170" x2="70" y2="25" stroke="${c.border}" stroke-width="2"/>
      <text x="475" y="175" font-size="12" font-weight="700" fill="${c.muted}">數量 Q</text>
      <text x="65" y="20" font-size="12" font-weight="700" fill="${c.muted}">價格 P</text>
      <!-- Demand Curve D (Downward) -->
      <line x1="110" y1="45" x2="410" y2="155" stroke="${c.blue}" stroke-width="3"/>
      <text x="420" y="160" font-size="14" font-weight="800" fill="${c.blue}">D (需求)</text>
      <!-- Supply Curve S (Upward) -->
      <line x1="110" y1="155" x2="410" y2="45" stroke="${c.red}" stroke-width="3"/>
      <text x="420" y="50" font-size="14" font-weight="800" fill="${c.red}">S (供給)</text>
      <!-- Equilibrium Point E (260, 100) -->
      <circle cx="260" cy="100" r="6" fill="${c.forest}"/>
      <line x1="70" y1="100" x2="260" y2="100" stroke="${c.forest}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="260" y1="100" x2="260" y2="170" stroke="${c.forest}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="50" y="105" font-size="12" font-weight="800" fill="${c.forest}">P*</text>
      <text x="260" y="185" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">Q*</text>
      <text x="260" y="85" font-size="14" font-weight="800" fill="${c.forest}" text-anchor="middle">均衡點 E (市場出清)</text>
      <!-- Surpluses -->
      <text x="180" y="55" font-size="11" font-weight="600" fill="${c.red}">供過於求 (超額供給)</text>
      <text x="180" y="145" font-size="11" font-weight="600" fill="${c.blue}">供不應求 (超額需求)</text>
    `)
  },
  'civics-11': {
    title: '中央政府五院職權分工與權力制衡圖',
    subtitle: '總統為國家元首，五院各司其職並受憲政程序相互制衡',
    caption: '立法院審查法案與預算，行政院可提覆議；立法院可提不信任案；憲法法庭掌理違憲審查保障人權。',
    render: () => frame('五院職權分工', `
      <!-- President at top -->
      <rect x="200" y="18" width="140" height="32" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
      <text x="270" y="39" font-size="13" font-weight="800" fill="${c.gold}" text-anchor="middle">總 統 (元首)</text>
      <!-- Line to Executive -->
      <line x1="270" y1="50" x2="270" y2="75" stroke="${c.muted}" stroke-width="1.5"/>
      <text x="275" y="65" font-size="10" fill="${c.muted}">任命院長</text>
      <!-- Five Yuans -->
      <rect x="35" y="75" width="105" height="45" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.8"/>
      <text x="87" y="95" font-size="12" font-weight="700" fill="${c.blue}" text-anchor="middle">立法院</text>
      <text x="87" y="112" font-size="10" fill="${c.muted}" text-anchor="middle">立法/預算審查</text>

      <rect x="155" y="75" width="105" height="45" rx="6" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="2"/>
      <text x="207" y="95" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">行政院</text>
      <text x="207" y="112" font-size="10" fill="${c.muted}" text-anchor="middle">最高行政執行</text>

      <rect x="280" y="75" width="105" height="45" rx="6" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="1.8"/>
      <text x="332" y="95" font-size="12" font-weight="700" fill="${c.purple}" text-anchor="middle">司法院</text>
      <text x="332" y="112" font-size="10" fill="${c.muted}" text-anchor="middle">憲法法庭/審判</text>

      <rect x="400" y="75" width="105" height="45" rx="6" fill="${c.white}" stroke="${c.border}" stroke-width="1.5"/>
      <text x="452" y="95" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">考試院</text>
      <text x="452" y="112" font-size="10" fill="${c.muted}" text-anchor="middle">考選/任用保障</text>

      <rect x="215" y="145" width="110" height="40" rx="6" fill="${c.white}" stroke="${c.border}" stroke-width="1.5"/>
      <text x="270" y="163" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">監察院</text>
      <text x="270" y="178" font-size="10" fill="${c.muted}" text-anchor="middle">彈劾/糾舉/審計</text>
      <!-- Checks and Balances arrows -->
      <path d="M 140 92 L 155 92" stroke="${c.red}" stroke-width="1.5"/>
      <text x="148" y="87" font-size="9" fill="${c.red}" text-anchor="middle">覆議</text>
      <path d="M 155 102 L 140 102" stroke="${c.blue}" stroke-width="1.5"/>
      <text x="148" y="114" font-size="9" fill="${c.blue}" text-anchor="middle">質詢</text>
    `)
  },
  'civics-12': {
    title: '比較利益法則與國際貿易專業化分工',
    subtitle: '比較利益：生產該產品「機會成本較低」者擁有比較利益，進行專業化生產',
    caption: '即使一國在所有產品上都具備絕對優勢，各國仍可依比較利益專業分工後進行貿易，創造雙贏綜效。',
    render: () => frame('比較利益與國際貿易', `
      <!-- Table Matrix Graphic -->
      <g transform="translate(60, 30)">
        <rect x="0" y="0" width="420" height="135" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <!-- Header -->
        <rect x="0" y="0" width="420" height="35" rx="8" fill="${c.lightGreen}"/>
        <text x="90" y="22" font-size="12" font-weight="700" fill="${c.forest}">國家 / 項目</text>
        <text x="210" y="22" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">製造 1 臺電腦機會成本</text>
        <text x="340" y="22" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">製造 1 雙鞋機會成本</text>
        <!-- Row 1: Country A -->
        <line x1="0" y1="35" x2="420" y2="35" stroke="${c.border}"/>
        <text x="30" y="60" font-size="12" font-weight="700" fill="${c.dark}">甲國</text>
        <rect x="155" y="42" width="110" height="26" rx="4" fill="${c.lightGreen}" stroke="${c.green}"/>
        <text x="210" y="60" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">2 雙鞋 ★ (較低)</text>
        <text x="340" y="60" font-size="12" fill="${c.muted}" text-anchor="middle">0.5 臺電腦</text>
        <!-- Row 2: Country B -->
        <line x1="0" y1="75" x2="420" y2="75" stroke="${c.border}"/>
        <text x="30" y="100" font-size="12" font-weight="700" fill="${c.dark}">乙國</text>
        <text x="210" y="100" font-size="12" fill="${c.muted}" text-anchor="middle">4 雙鞋</text>
        <rect x="285" y="82" width="110" height="26" rx="4" fill="${c.lightGold}" stroke="${c.gold}"/>
        <text x="340" y="100" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">0.25 臺電腦 ★ (較低)</text>
        <!-- Conclusion -->
        <line x1="0" y1="115" x2="420" y2="115" stroke="${c.border}"/>
        <text x="210" y="130" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">分工決策：甲國專門生產電腦，乙國專門生產鞋子，彼此貿易皆獲益</text>
      </g>
      <text x="270" y="195" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">核心判準：比較利益看「機會成本」而非產量大小</text>
    `)
  },

  // === HISTORY ===
  'history-10': {
    title: '西周宗法封建制 vs 秦漢郡縣中央集權制演變',
    subtitle: '西周血緣政治層層分封 ➔ 秦漢官僚帝制皇帝直轄流官',
    caption: '西周以宗法嫡庶為核心，諸侯世襲領地；秦統一天下後廢封建立郡縣，郡守縣令由皇帝直接任免考核，不可世襲。',
    render: () => frame('封建制與郡縣制對比', `
      <!-- Left: Feudalism -->
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="215" height="165" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.8"/>
        <text x="107" y="25" font-size="13" font-weight="800" fill="${c.gold}" text-anchor="middle">西周·宗法封建制 (血緣政治)</text>
        <!-- Hierarchy pyramid -->
        <polygon points="107,45 60,115 155,115" fill="${c.white}" stroke="${c.gold}"/>
        <text x="107" y="65" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">周天子 (大宗)</text>
        <text x="107" y="85" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">諸侯 (世襲封地)</text>
        <text x="107" y="105" font-size="10" font-weight="700" fill="${c.dark}" text-anchor="middle">卿大夫 / 士</text>
        <text x="107" y="135" font-size="11" font-weight="700" fill="${c.gold}" text-anchor="middle">嫡長子繼承制 · 諸侯世襲領地</text>
        <text x="107" y="152" font-size="10" fill="${c.muted}" text-anchor="middle">地方自治權力大，晚期諸侯爭霸</text>
      </g>
      <!-- Right: Commandery System -->
      <g transform="translate(285, 20)">
        <rect x="0" y="0" width="215" height="165" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.8"/>
        <text x="107" y="25" font-size="13" font-weight="800" fill="${c.forest}" text-anchor="middle">秦漢·郡縣官僚制 (中央集權)</text>
        <rect x="55" y="42" width="105" height="24" rx="4" fill="${c.forest}"/>
        <text x="107" y="58" font-size="11" font-weight="800" fill="${c.white}" text-anchor="middle">皇 帝 (天下獨尊)</text>
        <line x1="107" y1="66" x2="107" y2="80" stroke="${c.forest}" stroke-width="1.5"/>
        <rect x="55" y="80" width="105" height="24" rx="4" fill="${c.white}" stroke="${c.forest}"/>
        <text x="107" y="96" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">郡 守 / 縣 令</text>
        <text x="107" y="135" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">流官派任 · 領取俸祿 · 不得世襲</text>
        <text x="107" y="152" font-size="10" fill="${c.muted}" text-anchor="middle">政令直接貫徹到底，強化皇權統治</text>
      </g>
    `)
  },
  'history-13': {
    title: '清領開港通商四大港口與三大特產外銷地圖',
    subtitle: '1860年後淡水、雞籠、安平、打狗開港；茶、糖、樟腦外銷使臺灣轉為出超',
    caption: '北部出口茶與樟腦，南部出口蔗糖；茶葉大盛帶動大稻埕繁榮，促使臺灣經濟與政治重心逐漸「北移」。',
    render: () => frame('清領開港四港地圖', `
      <!-- Island Silhouette -->
      <path d="M 230 35 Q 260 80 250 120 Q 235 160 215 180 Q 185 140 190 90 Z" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="2"/>
      <!-- Keelung -->
      <circle cx="255" cy="38" r="5" fill="${c.blue}"/>
      <text x="290" y="40" font-size="11" font-weight="800" fill="${c.blue}">雞籠 (煤炭/港口)</text>
      <!-- Tamsui -->
      <circle cx="225" cy="40" r="5" fill="${c.blue}"/>
      <text x="175" y="40" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="end">淡水 (茶/大稻埕)</text>
      <!-- Anping -->
      <circle cx="195" cy="140" r="5" fill="${c.blue}"/>
      <text x="185" y="145" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="end">安平 (蔗糖)</text>
      <!-- Takow -->
      <circle cx="205" cy="165" r="5" fill="${c.blue}"/>
      <text x="250" y="170" font-size="11" font-weight="800" fill="${c.blue}">打狗 (蔗糖)</text>
      <!-- Exports Box Left -->
      <rect x="35" y="70" width="130" height="90" rx="6" fill="${c.white}" stroke="${c.border}"/>
      <text x="100" y="90" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">三大外銷商品</text>
      <text x="45" y="110" font-size="11" fill="${c.dark}">● 茶 葉 (北部山區)</text>
      <text x="45" y="128" font-size="11" fill="${c.dark}">● 樟 腦 (中北丘陵)</text>
      <text x="45" y="146" font-size="11" fill="${c.dark}">● 蔗 糖 (中南部平原)</text>
      <!-- Result Box Right -->
      <rect x="340" y="70" width="165" height="90" rx="6" fill="${c.lightGold}" stroke="${c.gold}"/>
      <text x="422" y="90" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">經濟重大轉變</text>
      <text x="350" y="112" font-size="11" font-weight="700" fill="${c.dark}">● 貿易由「入超」轉為「出超」</text>
      <text x="350" y="132" font-size="11" font-weight="700" fill="${c.red}">● 經濟重心「由南向北移」</text>
      <text x="350" y="148" font-size="10" fill="${c.muted}">促使光緒年間建省首府設臺北</text>
    `)
  },

  // === CHINESE ===
  'chinese-7': {
    title: '六書造字與用字法則體系樹',
    subtitle: '象形、指事（獨體造字）＋ 會意、形聲（合體造字）＋ 轉注、假借（用字法）',
    caption: '形聲字兼具表意形符與表音聲符，占漢字 80% 以上；象形隨體詰詘，指事視而可識加符號標示。',
    render: () => frame('六書體系樹', `
      <!-- Root -->
      <rect x="220" y="20" width="100" height="30" rx="6" fill="${c.dark}"/>
      <text x="270" y="40" font-size="13" font-weight="800" fill="${c.lime}" text-anchor="middle">六書原則</text>
      <!-- 2 Main Branches -->
      <line x1="270" y1="50" x2="160" y2="80" stroke="${c.forest}" stroke-width="2"/>
      <line x1="270" y1="50" x2="380" y2="80" stroke="${c.forest}" stroke-width="2"/>
      <!-- 造字法 -->
      <rect x="90" y="80" width="140" height="28" rx="5" fill="${c.lightGreen}" stroke="${c.green}"/>
      <text x="160" y="98" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">造字法 (結構生成)</text>
      <!-- 用字法 -->
      <rect x="310" y="80" width="140" height="28" rx="5" fill="${c.lightGold}" stroke="${c.gold}"/>
      <text x="380" y="98" font-size="12" font-weight="700" fill="${c.gold}" text-anchor="middle">用字法 (功能延伸)</text>
      <!-- 4 types of characters -->
      <g transform="translate(30, 125)">
        <rect x="0" y="0" width="60" height="50" rx="5" fill="${c.white}" stroke="${c.border}"/>
        <text x="30" y="20" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">象形</text>
        <text x="30" y="38" font-size="10" fill="${c.muted}" text-anchor="middle">日、月</text>

        <rect x="68" y="0" width="60" height="50" rx="5" fill="${c.white}" stroke="${c.border}"/>
        <text x="98" y="20" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">指事</text>
        <text x="98" y="38" font-size="10" fill="${c.muted}" text-anchor="middle">上、刃</text>

        <rect x="136" y="0" width="60" height="50" rx="5" fill="${c.white}" stroke="${c.border}"/>
        <text x="166" y="20" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">會意</text>
        <text x="166" y="38" font-size="10" fill="${c.muted}" text-anchor="middle">休、武</text>

        <rect x="204" y="0" width="60" height="50" rx="5" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="234" y="20" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">形聲(80%)</text>
        <text x="234" y="38" font-size="10" fill="${c.green}" text-anchor="middle">江、河</text>
      </g>
      <!-- 2 types of usage -->
      <g transform="translate(330, 125)">
        <rect x="0" y="0" width="70" height="50" rx="5" fill="${c.white}" stroke="${c.border}"/>
        <text x="35" y="20" font-size="11" font-weight="700" fill="${c.gold}" text-anchor="middle">轉注</text>
        <text x="35" y="38" font-size="10" fill="${c.muted}" text-anchor="middle">考、老</text>

        <rect x="80" y="0" width="70" height="50" rx="5" fill="${c.white}" stroke="${c.border}"/>
        <text x="115" y="20" font-size="11" font-weight="700" fill="${c.gold}" text-anchor="middle">假借</text>
        <text x="115" y="38" font-size="10" fill="${c.muted}" text-anchor="middle">自、莫</text>
      </g>
    `)
  },
  'chinese-8': {
    title: '漢語四大基本句型結構剖析模型',
    subtitle: '敘事句（主＋述＋賓）、表態句（主＋表）、有無句（主＋有/無＋賓）、判斷句（主＋繫＋斷）',
    caption: '判斷核心：看謂語（述語/表語/繫詞）的性質。繫詞如「是、乃、為、非」必為判斷句；表語為形容詞者為表態句。',
    render: () => frame('四大句型結構', `
      <!-- 4 sentence type boxes -->
      <g transform="translate(30, 25)">
        <!-- 敘事句 -->
        <rect x="0" y="0" width="230" height="70" rx="6" fill="${c.white}" stroke="${c.border}"/>
        <text x="15" y="22" font-size="12" font-weight="800" fill="${c.forest}">敘事句：主語 ＋ 述語(動詞) ＋ 賓語</text>
        <text x="15" y="42" font-size="12" fill="${c.dark}">例：燕子 (主) 飛過 (述) 田野 (賓)。</text>
        <text x="15" y="58" font-size="10" fill="${c.muted}">核心：述語為一般動作行為動詞</text>

        <!-- 表態句 -->
        <rect x="250" y="0" width="230" height="70" rx="6" fill="${c.white}" stroke="${c.border}"/>
        <text x="265" y="22" font-size="12" font-weight="800" fill="${c.blue}">表態句：主語 ＋ 表語(形容詞)</text>
        <text x="265" y="42" font-size="12" fill="${c.dark}">例：湖水 (主) 清澈 (表語)。</text>
        <text x="265" y="58" font-size="10" fill="${c.muted}">核心：無一般動詞，表語描寫人事物狀態</text>

        <!-- 有無句 -->
        <rect x="0" y="85" width="230" height="70" rx="6" fill="${c.white}" stroke="${c.border}"/>
        <text x="15" y="107" font-size="12" font-weight="800" fill="${c.gold}">有無句：主語 ＋ 有/無 ＋ 賓語</text>
        <text x="15" y="127" font-size="12" fill="${c.dark}">例：天下 (主) 無 (述) 不散的筵席 (賓)。</text>
        <text x="15" y="143" font-size="10" fill="${c.muted}">核心：述語必為表存在之「有」或「無」</text>

        <!-- 判斷句 -->
        <rect x="250" y="85" width="230" height="70" rx="6" fill="${c.white}" stroke="${c.border}"/>
        <text x="265" y="107" font-size="12" font-weight="800" fill="${c.purple}">判斷句：主語 ＋ 繫詞 ＋ 斷語</text>
        <text x="265" y="127" font-size="12" fill="${c.dark}">例：讀書 (主) 是 (繫) 求知的途徑 (斷)。</text>
        <text x="265" y="143" font-size="10" fill="${c.muted}">核心：繫詞為「是/非/乃/為/即」，判定身份性質</text>
      </g>
    `)
  },
  'chinese-9': {
    title: '近體詩格律與律詩對仗結構規範',
    subtitle: '絕句（四句）、律詩（八句）；律詩頷聯（3-4句）與頸聯（5-6句）必須嚴格對仗',
    caption: '律詩偶數句（2、4、6、8）末字押平聲韻，首句可押可不押，一韻到底不可換韻；對仗要求詞性相同、平仄相反。',
    render: () => frame('近體詩對仗格律', `
      <!-- 4 Couplets Box -->
      <g transform="translate(60, 20)">
        <rect x="0" y="0" width="420" height="155" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <!-- 首聯 -->
        <text x="20" y="28" font-size="12" font-weight="700" fill="${c.muted}">首聯 (1, 2句)：開篇破題、起興引入</text>
        <text x="350" y="28" font-size="11" fill="${c.muted}">可對仗或不對仗</text>
        <line x1="15" y1="38" x2="405" y2="38" stroke="${c.border}"/>
        <!-- 頷聯 -->
        <rect x="10" y="44" width="400" height="30" rx="4" fill="${c.lightGreen}"/>
        <text x="20" y="64" font-size="12" font-weight="800" fill="${c.forest}">頷聯 (3, 4句)：★ 必須嚴格對仗 (詞性相同、平仄相對)</text>
        <!-- 頸聯 -->
        <rect x="10" y="80" width="400" height="30" rx="4" fill="${c.lightGreen}"/>
        <text x="20" y="100" font-size="12" font-weight="800" fill="${c.forest}">頸聯 (5, 6句)：★ 必須嚴格對仗 (詞性相同、平仄相對)</text>
        <!-- 尾聯 -->
        <line x1="15" y1="116" x2="405" y2="116" stroke="${c.border}"/>
        <text x="20" y="136" font-size="12" font-weight="700" fill="${c.muted}">尾聯 (7, 8句)：抒發情懷、點明主旨</text>
        <text x="350" y="136" font-size="11" fill="${c.muted}">結尾收束</text>
      </g>
      <text x="270" y="195" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">押韻規範：偶數句末字必押韻（通常押平聲韻，一韻到底不換韻）</text>
    `)
  },
  'chinese-12': {
    title: '傳統書信直式信封標準格式與禁忌',
    subtitle: '右收件地址，中框「收件人＋稱謂＋啟封詞」，左「寄件地址＋寄件人＋緘」',
    caption: '框內稱謂依寄件人稱呼收件人（如「李教授 世賢」）；啟封詞對長輩用「安啟/福啟/鈞啟」，平輩用「大啟/台啟」；寄件人處切忌寫「敬緘」。',
    render: () => frame('中式直式信封格式', `
      <!-- Envelope Outline -->
      <g transform="translate(140, 15)">
        <rect x="0" y="0" width="260" height="175" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <!-- Right Column: Recipient Address -->
        <text x="220" y="30" font-size="11" fill="${c.dark}" writing-mode="vertical-rl">○○市○○區○○路一段100號</text>
        <text x="238" y="25" font-size="9" font-weight="700" fill="${c.red}">郵遞區號</text>
        <!-- Center Box: Recipient Name -->
        <rect x="90" y="25" width="80" height="125" rx="4" fill="${c.white}" stroke="${c.red}" stroke-width="1.5"/>
        <text x="145" y="45" font-size="11" fill="${c.muted}" writing-mode="vertical-rl">(職稱/稱謂)</text>
        <text x="125" y="40" font-size="14" font-weight="800" fill="${c.dark}" writing-mode="vertical-rl">王大明 老師</text>
        <text x="125" y="125" font-size="12" font-weight="700" fill="${c.red}" writing-mode="vertical-rl">道啟</text>
        <!-- Left Column: Sender Address -->
        <text x="40" y="45" font-size="10" fill="${c.muted}" writing-mode="vertical-rl">學生 陳小華 緘</text>
        <text x="20" y="30" font-size="9" fill="${c.muted}" writing-mode="vertical-rl">寄件人地址...</text>
      </g>
      <!-- Pitfall notes -->
      <rect x="420" y="40" width="105" height="120" rx="6" fill="${c.lightRed}" stroke="${c.red}"/>
      <text x="472" y="60" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">易錯禁忌指南</text>
      <text x="430" y="80" font-size="10" fill="${c.dark}">● 框內稱謂是給郵差看的，不可寫「父親大人」</text>
      <text x="430" y="115" font-size="10" fill="${c.dark}">● 寄件人萬不可寫「敬緘」(恭敬封閉給自己)</text>
    `)
  },

  // === ENGLISH ===
  'english-1': {
    title: '英文五大基本句型結構解構模型',
    subtitle: 'S+V, S+V+O, S+V+C, S+V+IO+DO, S+V+O+OC',
    caption: '動詞決定句型：不及物動詞無需受詞；連綴動詞需主詞補詞 (C)；授與動詞帶雙受詞 (IO+DO)；不完全及物動詞需受詞補詞 (OC)。',
    render: () => frame('五大基本句型', `
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="460" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <!-- 1: SV -->
        <text x="20" y="26" font-size="12" font-weight="800" fill="${c.forest}">1. S ＋ V (完全不及物)</text>
        <text x="260" y="26" font-size="12" fill="${c.dark}">Birds <tspan font-weight="700" fill="${c.forest}">fly</tspan>.</text>
        <line x1="15" y1="35" x2="445" y2="35" stroke="${c.border}"/>
        <!-- 2: SVC -->
        <text x="20" y="58" font-size="12" font-weight="800" fill="${c.blue}">2. S ＋ V ＋ C (連綴動詞＋主詞補詞)</text>
        <text x="260" y="58" font-size="12" fill="${c.dark}">She <tspan font-weight="700" fill="${c.blue}">looks</tspan> happy.</text>
        <line x1="15" y1="67" x2="445" y2="67" stroke="${c.border}"/>
        <!-- 3: SVO -->
        <text x="20" y="90" font-size="12" font-weight="800" fill="${c.forest}">3. S ＋ V ＋ O (完全及物)</text>
        <text x="260" y="90" font-size="12" fill="${c.dark}">He <tspan font-weight="700" fill="${c.forest}">plays</tspan> basketball.</text>
        <line x1="15" y1="99" x2="445" y2="99" stroke="${c.border}"/>
        <!-- 4: SVOO -->
        <text x="20" y="122" font-size="12" font-weight="800" fill="${c.gold}">4. S ＋ V ＋ IO ＋ DO (授與動詞)</text>
        <text x="260" y="122" font-size="12" fill="${c.dark}">Dad <tspan font-weight="700" fill="${c.gold}">gave</tspan> me a watch.</text>
        <line x1="15" y1="131" x2="445" y2="131" stroke="${c.border}"/>
        <!-- 5: SVOC -->
        <text x="20" y="154" font-size="12" font-weight="800" fill="${c.purple}">5. S ＋ V ＋ O ＋ OC (不完全及物＋受詞補詞)</text>
        <text x="260" y="154" font-size="12" fill="${c.dark}">We <tspan font-weight="700" fill="${c.purple}">painted</tspan> the wall blue.</text>
      </g>
    `)
  },
  'english-5': {
    title: '現在完成式時間軸與經驗／持續／完成跨度模型',
    subtitle: 'have / has ＋ 過去分詞 (p.p.)，動作發生於過去，影響或狀態持續連結到「現在」',
    caption: '關鍵標誌詞：since ＋ 過去特定時間點（since 2020）；for ＋ 一段時間（for 5 years）；already / yet / ever / never。',
    render: () => frame('現在完成式時間軸', `
      <!-- Timeline -->
      <line x1="60" y1="110" x2="480" y2="110" stroke="${c.forest}" stroke-width="3"/>
      <polygon points="480,110 470,105 470,115" fill="${c.forest}"/>
      <!-- Time Points -->
      <line x1="120" y1="100" x2="120" y2="120" stroke="${c.muted}" stroke-width="2"/>
      <text x="120" y="140" font-size="13" font-weight="700" fill="${c.muted}" text-anchor="middle">Past (過去)</text>
      <line x1="380" y1="95" x2="380" y2="125" stroke="${c.red}" stroke-width="3"/>
      <text x="380" y="140" font-size="14" font-weight="800" fill="${c.red}" text-anchor="middle">NOW (現在)</text>
      <!-- Present Perfect Span Arc -->
      <path d="M 120 90 Q 250 25 380 90" fill="none" stroke="${c.gold}" stroke-width="3.5"/>
      <polygon points="380,90 376,80 385,82" fill="${c.gold}"/>
      <text x="250" y="55" font-size="15" font-weight="800" fill="${c.gold}" text-anchor="middle">have / has ＋ p.p.</text>
      <text x="250" y="75" font-size="12" font-weight="600" fill="${c.forest}" text-anchor="middle">(跨度：從過去持續或影響到現在)</text>
      <!-- Usage markers bottom -->
      <rect x="60" y="160" width="420" height="36" rx="6" fill="${c.lightGreen}"/>
      <text x="270" y="182" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">典型搭配：since ＋ 過去時間點 (since 2022)  /  for ＋ 時間長度 (for 3 years)</text>
    `)
  },
  'english-13': {
    title: '空間與時間介系詞立體方位模型',
    subtitle: 'AT (精確點) ➔ ON (表面/街道) ➔ IN (立體空間/廣泛時間)',
    caption: '空間：at the door（特定點）、on the table（平面接觸）、in the room（三維包圍）；穿越空間用 through，橫跨平面用 across。',
    render: () => frame('介系詞模型', `
      <!-- AT (Point) -->
      <g transform="translate(70, 45)">
        <circle cx="50" cy="50" r="10" fill="${c.red}"/>
        <circle cx="50" cy="50" r="28" fill="none" stroke="${c.red}" stroke-width="2" stroke-dasharray="3,3"/>
        <text x="50" y="98" font-size="14" font-weight="800" fill="${c.red}" text-anchor="middle">AT (點)</text>
        <text x="50" y="115" font-size="11" fill="${c.muted}" text-anchor="middle">at 7:00 / at the bus stop</text>
      </g>
      <!-- ON (Surface) -->
      <g transform="translate(220, 45)">
        <line x1="10" y1="50" x2="90" y2="50" stroke="${c.gold}" stroke-width="4"/>
        <rect x="35" y="25" width="30" height="25" rx="3" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="50" y="98" font-size="14" font-weight="800" fill="${c.gold}" text-anchor="middle">ON (面)</text>
        <text x="50" y="115" font-size="11" fill="${c.muted}" text-anchor="middle">on Monday / on the table</text>
      </g>
      <!-- IN (3D / Enclosed) -->
      <g transform="translate(370, 45)">
        <polygon points="20,30 65,15 95,35 50,50" fill="${c.lightBlue}" stroke="${c.blue}"/>
        <polygon points="20,30 50,50 50,75 20,55" fill="${c.lightBlue}" stroke="${c.blue}"/>
        <polygon points="50,50 95,35 95,60 50,75" fill="${c.lightBlue}" stroke="${c.blue}"/>
        <circle cx="55" cy="45" r="8" fill="${c.blue}"/>
        <text x="55" y="98" font-size="14" font-weight="800" fill="${c.blue}" text-anchor="middle">IN (體)</text>
        <text x="55" y="115" font-size="11" fill="${c.muted}" text-anchor="middle">in May / in the room</text>
      </g>
      <rect x="50" y="155" width="440" height="35" rx="6" fill="${c.lightGreen}"/>
      <text x="270" y="177" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">方位動態：Walk THROUGH the forest (穿透立體)  vs  Walk ACROSS the street (橫跨平面)</text>
    `)
  }
  ,'physics-2': {
    title: '橫波與縱波幾何模型及波速公式',
    subtitle: '波速 v ＝ 頻率 f × 波長 λ ＝ 波長 λ / 週期 T',
    caption: '橫波介質振動方向與波前進方向垂直（如繩波、水波）；縱波振動方向與前進方向平行（如聲波、彈簧疏密波）。',
    render: () => frame('波的特性與波速', `
      <!-- Wave Line (Transverse) -->
      <path d="M 60 110 Q 110 40 160 110 T 260 110 T 360 110 T 460 110" fill="none" stroke="${c.blue}" stroke-width="3"/>
      <!-- Baseline -->
      <line x1="40" y1="110" x2="480" y2="110" stroke="${c.border}" stroke-width="1.5" stroke-dasharray="4,4"/>
      <!-- Wavelength Lambda -->
      <line x1="110" y1="35" x2="210" y2="35" stroke="${c.red}" stroke-width="2"/>
      <polygon points="110,35 118,31 118,39" fill="${c.red}"/>
      <polygon points="210,35 202,31 202,39" fill="${c.red}"/>
      <text x="160" y="28" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">波長 λ (相鄰波峰間距)</text>
      <!-- Amplitude A -->
      <line x1="110" y1="110" x2="110" y2="40" stroke="${c.forest}" stroke-width="2"/>
      <polygon points="110,40 106,48 114,48" fill="${c.forest}"/>
      <text x="125" y="75" font-size="12" font-weight="700" fill="${c.forest}">振幅 A</text>
      <!-- Peak and Trough -->
      <circle cx="110" cy="40" r="4" fill="${c.red}"/>
      <text x="110" y="55" font-size="11" font-weight="700" fill="${c.dark}" text-anchor="middle">波峰</text>
      <circle cx="210" cy="180" r="4" fill="${c.blue}"/>
      <text x="210" y="195" font-size="11" font-weight="700" fill="${c.dark}" text-anchor="middle">波谷</text>
      <!-- Formula Callout -->
      <rect x="290" y="45" width="180" height="50" rx="6" fill="${c.lightGold}" stroke="${c.gold}"/>
      <text x="380" y="68" font-size="14" font-weight="800" fill="${c.gold}" text-anchor="middle">v ＝ f × λ</text>
      <text x="380" y="86" font-size="11" fill="${c.muted}" text-anchor="middle">波速 ＝ 頻率 × 波長</text>
    `)
  },
  'physics-6': {
    title: '簡單機械與機械利益：動滑輪與斜面模型',
    subtitle: '功的原理：理想機械絕不省功（W＝F×s），省力必費時、省時必費力',
    caption: '動滑輪省力 1/2（施力為物重一半），但拉繩距離為物體上升高度的 2 倍；斜面施力 F＝物重 W × (高度 h / 長度 L)。',
    render: () => frame('簡單機械與功的原理', `
      <!-- Left: Pulley -->
      <g transform="translate(50, 20)">
        <rect x="0" y="0" width="200" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="100" y="25" font-size="13" font-weight="800" fill="${c.forest}" text-anchor="middle">動滑輪 (Movable Pulley)</text>
        <circle cx="95" cy="75" r="22" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="2"/>
        <rect x="80" y="105" width="30" height="25" rx="3" fill="${c.lightGold}" stroke="${c.gold}"/>
        <text x="95" y="122" font-size="11" font-weight="700" fill="${c.gold}" text-anchor="middle">W</text>
        <line x1="95" y1="97" x2="95" y2="105" stroke="${c.forest}" stroke-width="1.8"/>
        <!-- Rope -->
        <line x1="73" y1="35" x2="73" y2="75" stroke="${c.muted}" stroke-width="2"/>
        <path d="M 73 75 A 22 22 0 0 0 117 75" fill="none" stroke="${c.muted}" stroke-width="2"/>
        <line x1="117" y1="75" x2="117" y2="40" stroke="${c.muted}" stroke-width="2"/>
        <polygon points="117,35 113,43 121,43" fill="${c.red}"/>
        <text x="140" y="42" font-size="11" font-weight="800" fill="${c.red}">F ＝ ½ W</text>
        <text x="100" y="150" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">省力 50%，拉繩長度加倍 2h</text>
      </g>
      <!-- Right: Inclined Plane -->
      <g transform="translate(280, 20)">
        <rect x="0" y="0" width="210" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="105" y="25" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">斜面 (Inclined Plane)</text>
        <polygon points="30,120 180,120 180,50" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <!-- Box on slope -->
        <rect x="85" y="70" width="25" height="20" rx="2" transform="rotate(-25 97 80)" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="105" y="138" font-size="11" font-weight="700" fill="${c.dark}" text-anchor="middle">斜面長 L ； 垂直高 h</text>
        <text x="105" y="155" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">拉力 F ＝ W × (h / L)</text>
      </g>
    `)
  },
  'physics-10': {
    title: '摩擦力特性與外力受力分析圖線',
    subtitle: '靜摩擦力等於外力（fs＝F）；最大靜摩擦力 fs(max) 啟動瞬間；動摩擦力 fk 保持定值',
    caption: '正向力愈大、接觸面愈粗糙，最大靜摩擦力愈大；物體開始滑動後，動摩擦力小於最大靜摩擦力，且與推力大小無關。',
    render: () => frame('摩擦力與外力關係', `
      <!-- Axes -->
      <line x1="80" y1="160" x2="460" y2="160" stroke="${c.border}" stroke-width="2"/>
      <line x1="80" y1="160" x2="80" y2="30" stroke="${c.border}" stroke-width="2"/>
      <text x="465" y="165" font-size="12" font-weight="700" fill="${c.muted}">外力 F (推力)</text>
      <text x="75" y="24" font-size="12" font-weight="700" fill="${c.muted}">摩擦力 f</text>
      <!-- Static Friction 45 deg line -->
      <line x1="80" y1="160" x2="240" y2="60" stroke="${c.forest}" stroke-width="3"/>
      <!-- Drop to Kinetic friction -->
      <line x1="240" y1="60" x2="260" y2="85" stroke="${c.red}" stroke-width="2.5" stroke-dasharray="3,3"/>
      <!-- Kinetic Friction horizontal line -->
      <line x1="260" y1="85" x2="440" y2="85" stroke="${c.blue}" stroke-width="3"/>
      <!-- Peak Point -->
      <circle cx="240" cy="60" r="5" fill="${c.red}"/>
      <text x="240" y="45" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">最大靜摩擦力 fs(max)</text>
      <!-- Annotations -->
      <text x="140" y="125" font-size="12" font-weight="700" fill="${c.forest}">靜摩擦區：f_s ＝ F</text>
      <text x="350" y="75" font-size="12" font-weight="700" fill="${c.blue}">動摩擦區：f_k (定值)</text>
      <text x="270" y="195" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">啟動後 fk ＜ fs(max)，推動瞬間最吃力，滑動後阻力變小</text>
    `)
  },
  'physics-12': {
    title: '電流磁效應與安培右手定則幾何模型',
    subtitle: '長直導線同心圓磁場；螺線管四指順電流彎曲，大拇指所指即為 N 極',
    caption: '厄斯特發現電流周圍產生磁場；安培定則：導線大拇指為電流，四指為同心圓磁場；線圈四指為電流，大拇指為內部磁場 (N極)。',
    render: () => frame('安培右手定則', `
      <!-- Left: Straight wire -->
      <g transform="translate(60, 25)">
        <rect x="0" y="0" width="180" height="150" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="90" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">載流長直導線</text>
        <line x1="90" y1="130" x2="90" y2="40" stroke="${c.red}" stroke-width="4"/>
        <polygon points="90,35 84,45 96,45" fill="${c.red}"/>
        <text x="90" y="145" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">電流 I 向上</text>
        <!-- Magnetic field concentric ellipses -->
        <ellipse cx="90" cy="85" rx="55" ry="18" fill="none" stroke="${c.blue}" stroke-width="1.8"/>
        <text x="145" y="82" font-size="10" font-weight="700" fill="${c.blue}">B (磁場)</text>
        <text x="90" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">拇指電流 ➔ 四指磁場</text>
      </g>
      <!-- Right: Solenoid -->
      <g transform="translate(290, 25)">
        <rect x="0" y="0" width="190" height="150" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="95" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">螺線管 (電磁鐵)</text>
        <ellipse cx="40" cy="85" rx="15" ry="30" fill="none" stroke="${c.gold}" stroke-width="3"/>
        <ellipse cx="75" cy="85" rx="15" ry="30" fill="none" stroke="${c.gold}" stroke-width="3"/>
        <ellipse cx="110" cy="85" rx="15" ry="30" fill="none" stroke="${c.gold}" stroke-width="3"/>
        <ellipse cx="145" cy="85" rx="15" ry="30" fill="none" stroke="${c.gold}" stroke-width="3"/>
        <!-- Polarity -->
        <rect x="15" y="70" width="22" height="30" rx="4" fill="${c.red}"/>
        <text x="26" y="90" font-size="13" font-weight="800" fill="${c.white}" text-anchor="middle">N</text>
        <rect x="150" y="70" width="22" height="30" rx="4" fill="${c.blue}"/>
        <text x="161" y="90" font-size="13" font-weight="800" fill="${c.white}" text-anchor="middle">S</text>
        <text x="95" y="138" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">四指順電流 ➔ 拇指指 N 極</text>
      </g>
    `)
  },
  'chemistry-4': {
    title: '電解質水溶液解離與離子導電微觀模型',
    subtitle: 'NaCl 溶於水完全解離為自由移動的 Na⁺ 陽離子與 Cl⁻ 陰離子',
    caption: '通電時，帶正電陽離子移向負極，帶負電陰離子移向正極，陰陽離子定向移動形成電流，使外電路燈泡發光。',
    render: () => frame('電解質解離導電', `
      <!-- Beaker -->
      <rect x="130" y="60" width="280" height="120" rx="6" fill="none" stroke="${c.blue}" stroke-width="2.5"/>
      <rect x="132" y="85" width="276" height="93" fill="${c.lightBlue}" fill-opacity="0.5"/>
      <!-- Electrodes -->
      <rect x="190" y="40" width="16" height="110" fill="${c.dark}"/>
      <text x="198" y="32" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">正極 (+)</text>
      <rect x="330" y="40" width="16" height="110" fill="${c.dark}"/>
      <text x="338" y="32" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">負極 (−)</text>
      <!-- Ions -->
      <circle cx="280" cy="115" r="14" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.8"/>
      <text x="280" y="120" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">Na⁺</text>
      <path d="M 296 115 L 320 115" stroke="${c.red}" stroke-width="2"/>
      <polygon points="320,115 313,111 313,119" fill="${c.red}"/>
      <circle cx="250" cy="145" r="16" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.8"/>
      <text x="250" y="150" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">Cl⁻</text>
      <path d="M 232 145 L 210 145" stroke="${c.green}" stroke-width="2"/>
      <polygon points="210,145 217,141 217,149" fill="${c.green}"/>
      <text x="270" y="198" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">解離關鍵：陰陽離子「總電量相等」，溶液整體恆維持電中性</text>
    `)
  },
  'chemistry-6': {
    title: '氧化還原反應微觀電子轉移與得失氧模型',
    subtitle: '氧化（得氧／失電子）與還原（失氧／得電子）必同時發生',
    caption: 'CuO ＋ C ➔ Cu ＋ CO₂：碳搶奪氧（活性大，為還原劑被氧化）；氧化銅失去氧（為氧化劑被還原成銅單質）。',
    render: () => frame('氧化還原反應', `
      <!-- Reactants -->
      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="160" height="90" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="80" y="26" font-size="13" font-weight="800" fill="${c.dark}" text-anchor="middle">反應物 (Reactants)</text>
        <text x="40" y="60" font-size="15" font-weight="800" fill="${c.dark}">2CuO</text>
        <text x="95" y="60" font-size="15" font-weight="700" fill="${c.muted}">＋</text>
        <text x="130" y="60" font-size="15" font-weight="800" fill="${c.forest}">C</text>
      </g>
      <!-- Arrow -->
      <g transform="translate(230, 85)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="${c.forest}" stroke-width="3"/>
        <polygon points="60,0 52,-5 52,5" fill="${c.forest}"/>
        <text x="30" y="-8" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">加熱 Δ</text>
      </g>
      <!-- Products -->
      <g transform="translate(305, 40)">
        <rect x="0" y="0" width="160" height="90" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="80" y="26" font-size="13" font-weight="800" fill="${c.dark}" text-anchor="middle">生成物 (Products)</text>
        <text x="45" y="60" font-size="15" font-weight="800" fill="${c.gold}">2Cu</text>
        <text x="95" y="60" font-size="15" font-weight="700" fill="${c.muted}">＋</text>
        <text x="135" y="60" font-size="14" font-weight="800" fill="${c.blue}">CO₂</text>
      </g>
      <!-- Oxidation Arc -->
      <path d="M 190 75 Q 260 20 380 75" fill="none" stroke="${c.red}" stroke-width="2"/>
      <text x="285" y="32" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">C 得氧被「氧化」 (還原劑)</text>
      <!-- Reduction Arc -->
      <path d="M 110 100 Q 220 160 340 100" fill="none" stroke="${c.blue}" stroke-width="2"/>
      <text x="225" y="155" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">CuO 失氧被「還原」 (氧化劑)</text>
    `)
  },
  'chemistry-9': {
    title: '有機化合物碳鏈骨架與常見官能基結構',
    subtitle: '烴類（只含碳氫）、醇類（含羥基 −OH）、有機酸（含羧基 −COOH）',
    caption: '碳原子具 4 個價鍵可串成長鏈或環狀；乙醇與乙酸在濃硫酸催化下發生「酯化反應」生成具果香之乙酸乙酯。',
    render: () => frame('有機化合物骨架', `
      <!-- Alkane -->
      <g transform="translate(30, 25)">
        <rect x="0" y="0" width="145" height="155" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="72" y="25" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">烷類 (烴類)</text>
        <text x="72" y="45" font-size="10" fill="${c.muted}" text-anchor="middle">只含碳與氫元素</text>
        <circle cx="72" cy="85" r="16" fill="${c.dark}"/>
        <text x="72" y="90" font-size="14" font-weight="800" fill="${c.white}" text-anchor="middle">C</text>
        <text x="72" y="130" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">甲烷 CH₄ / 乙烷 C₂H₆</text>
        <text x="72" y="148" font-size="10" fill="${c.muted}" text-anchor="middle">難溶於水、作燃料</text>
      </g>
      <!-- Alcohol -->
      <g transform="translate(195, 25)">
        <rect x="0" y="0" width="145" height="155" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="72" y="25" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">醇類 (具 −OH 羥基)</text>
        <text x="72" y="45" font-size="10" fill="${c.muted}" text-anchor="middle">乙醇 C₂H₅OH</text>
        <rect x="42" y="70" width="60" height="30" rx="6" fill="${c.lightBlue}" stroke="${c.blue}"/>
        <text x="72" y="90" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">−OH</text>
        <text x="72" y="130" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">酒精 · 易溶於水</text>
        <text x="72" y="148" font-size="10" fill="${c.muted}" text-anchor="middle">水溶液呈中性</text>
      </g>
      <!-- Acid -->
      <g transform="translate(360, 25)">
        <rect x="0" y="0" width="145" height="155" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="72" y="25" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">有機酸 (具 −COOH)</text>
        <text x="72" y="45" font-size="10" fill="${c.muted}" text-anchor="middle">乙酸 CH₃COOH (醋酸)</text>
        <rect x="35" y="70" width="75" height="30" rx="6" fill="${c.lightRed}" stroke="${c.red}"/>
        <text x="72" y="90" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">−COOH</text>
        <text x="72" y="130" font-size="12" font-weight="700" fill="${c.dark}" text-anchor="middle">食用醋 · 具酸味</text>
        <text x="72" y="148" font-size="10" fill="${c.red}" text-anchor="middle">水溶液呈弱酸性</text>
      </g>
    `)
  },
  'biology-2': {
    title: '光合作用光反應與碳反應能量流轉模型',
    subtitle: '光反應（葉綠體囊狀膜分解水釋放 O₂）➔ 碳反應（基質酵素合成葡萄糖 C₆H₁₂O₆）',
    caption: '光反應需要光能，將水分解放出氧氣並轉化能量；碳反應不直接需光，利用能量與二氧化碳在酵素催化下生成葡萄糖與水。',
    render: () => frame('光合作用歷程', `
      <!-- Chloroplast Outer Membrane -->
      <rect x="50" y="30" width="440" height="150" rx="16" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="2.5"/>
      <text x="80" y="52" font-size="12" font-weight="800" fill="${c.forest}">葉綠體 (Chloroplast)</text>
      <!-- Light Reaction -->
      <g transform="translate(70, 65)">
        <rect x="0" y="0" width="150" height="95" rx="8" fill="${c.white}" stroke="${c.green}" stroke-width="1.8"/>
        <text x="75" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">光反應 (需光)</text>
        <text x="75" y="44" font-size="11" fill="${c.blue}" text-anchor="middle">原料：水 (H₂O) ＋ 光</text>
        <text x="75" y="66" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">產物：氧氣 (O₂) ↑</text>
        <text x="75" y="84" font-size="10" fill="${c.gold}" text-anchor="middle">產生 ATP 能量</text>
      </g>
      <!-- Energy Transfer Arrow -->
      <g transform="translate(225, 105)">
        <line x1="0" y1="0" x2="80" y2="0" stroke="${c.gold}" stroke-width="3"/>
        <polygon points="80,0 72,-5 72,5" fill="${c.gold}"/>
        <text x="40" y="-8" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">能量轉移</text>
      </g>
      <!-- Dark Reaction -->
      <g transform="translate(310, 65)">
        <rect x="0" y="0" width="160" height="95" rx="8" fill="${c.white}" stroke="${c.forest}" stroke-width="1.8"/>
        <text x="80" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">碳反應 (不需光)</text>
        <text x="80" y="44" font-size="11" fill="${c.dark}" text-anchor="middle">原料：二氧化碳 (CO₂)</text>
        <text x="80" y="66" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">產物：葡萄糖 ＋ 水</text>
        <text x="80" y="84" font-size="10" fill="${c.muted}" text-anchor="middle">儲存為澱粉</text>
      </g>
      <text x="270" y="198" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">總反應式：水 ＋ 二氧化碳 ➔ (光能/葉綠體) ➔ 葡萄糖 ＋ 氧氣 ＋ 水</text>
    `)
  },
  'biology-6': {
    title: '心臟腔室構造與瓣膜單向防逆流剖面',
    subtitle: '心房心室瓣膜與半月瓣確保血液單向流動：心房 ➔ 心室 ➔ 動脈',
    caption: '左心室肌肉壁最厚（負責將充氧血強力打入主動脈供應全身組織）；瓣膜開閉維持單向循環，逆流會造成心雜音或心臟肥大。',
    render: () => frame('心臟腔室與瓣膜', `
      <!-- Outer Heart Box -->
      <rect x="150" y="30" width="240" height="150" rx="12" fill="${c.white}" stroke="${c.dark}" stroke-width="2.5"/>
      <line x1="270" y1="30" x2="270" y2="180" stroke="${c.dark}" stroke-width="3"/>
      <line x1="150" y1="95" x2="390" y2="95" stroke="${c.border}" stroke-width="2"/>
      <!-- Right Side -->
      <rect x="152" y="32" width="116" height="61" fill="${c.lightBlue}" fill-opacity="0.6"/>
      <text x="210" y="65" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">右心房</text>
      <rect x="152" y="97" width="116" height="81" fill="${c.lightBlue}" fill-opacity="0.6"/>
      <text x="210" y="140" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">右心室</text>
      <!-- Left Side -->
      <rect x="272" y="32" width="116" height="61" fill="${c.lightRed}" fill-opacity="0.6"/>
      <text x="330" y="65" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">左心房</text>
      <rect x="272" y="97" width="116" height="81" fill="${c.lightRed}" fill-opacity="0.6"/>
      <rect x="370" y="97" width="18" height="81" fill="${c.red}" fill-opacity="0.4"/>
      <text x="325" y="140" font-size="13" font-weight="800" fill="${c.red}" text-anchor="middle">左心室 ★</text>
      <text x="330" y="158" font-size="9" fill="${c.red}" text-anchor="middle">(肌肉壁最厚)</text>
      <!-- Valves -->
      <line x1="190" y1="95" x2="230" y2="95" stroke="${c.gold}" stroke-width="4"/>
      <line x1="310" y1="95" x2="350" y2="95" stroke="${c.gold}" stroke-width="4"/>
      <text x="80" y="98" font-size="11" font-weight="700" fill="${c.gold}">房室瓣 (防逆流) ➔</text>
      <text x="270" y="198" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">血流方向：靜脈 ➔ 心房 ➔ (房室瓣開) ➔ 心室 ➔ (半月瓣開) ➔ 動脈</text>
    `)
  },
  'biology-7': {
    title: '植物維管束排列：雙子葉植物 vs 單子葉植物莖部對比',
    subtitle: '雙子葉環狀排列具形成層（會加粗/年輪） vs 單子葉散生排列無形成層（不加粗）',
    caption: '木質部在內側運送水分與礦物質（由下而上單向流動）；韌皮部在外面運送光合作用有機養分（可上下雙向流動）。',
    render: () => frame('植物維管束對比', `
      <!-- Left: Dicot -->
      <g transform="translate(60, 20)">
        <rect x="0" y="0" width="190" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="95" y="24" font-size="13" font-weight="800" fill="${c.forest}" text-anchor="middle">雙子葉植物 (如向日葵)</text>
        <circle cx="95" cy="85" r="45" fill="none" stroke="${c.forest}" stroke-width="2"/>
        <circle cx="95" cy="85" r="30" fill="none" stroke="${c.gold}" stroke-width="1.8" stroke-dasharray="3,2"/>
        <text x="95" y="80" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">形成層</text>
        <text x="95" y="95" font-size="9" fill="${c.muted}" text-anchor="middle">向內木質/向外韌皮</text>
        <text x="95" y="145" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">環狀排列 · 莖能持續加粗</text>
        <text x="95" y="158" font-size="9" fill="${c.muted}" text-anchor="middle">多年生木本具顯著年輪</text>
      </g>
      <!-- Right: Monocot -->
      <g transform="translate(290, 20)">
        <rect x="0" y="0" width="190" height="165" rx="8" fill="${c.white}" stroke="${c.border}"/>
        <text x="95" y="24" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">單子葉植物 (如玉米/竹子)</text>
        <circle cx="95" cy="85" r="45" fill="none" stroke="${c.blue}" stroke-width="2"/>
        ${[ [80,60], [110,65], [75,90], [105,95], [85,115], [115,110] ].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${c.blue}"/>`).join('')}
        <text x="95" y="145" font-size="11" font-weight="700" fill="${c.blue}" text-anchor="middle">散生排列 · 無形成層</text>
        <text x="95" y="158" font-size="9" fill="${c.muted}" text-anchor="middle">莖粗度有限，無年輪構造</text>
      </g>
    `)
  },
  'earth-1': {
    title: '地球大氣垂直分層結構與溫度變化曲線',
    subtitle: '對流層（氣溫遞減/天氣現象）、平流層（臭氧吸UV逆溫）、中氣層、熱氣層',
    caption: '對流層厚度約 10 公里，集中大氣 80% 質量與幾乎所有水氣；平流層上熱下冷極為穩定，為噴射客機理想巡航高度。',
    render: () => frame('大氣垂直分層', `
      <!-- Altitude Axis -->
      <line x1="80" y1="170" x2="80" y2="25" stroke="${c.border}" stroke-width="2"/>
      <text x="75" y="20" font-size="11" font-weight="700" fill="${c.muted}" text-anchor="middle">高度 (km)</text>
      <!-- Layers -->
      <rect x="90" y="140" width="380" height="30" fill="${c.lightBlue}" fill-opacity="0.4"/>
      <text x="140" y="160" font-size="12" font-weight="800" fill="${c.blue}">對流層 (0~10 km)</text>
      <text x="320" y="160" font-size="11" fill="${c.muted}">每升 1km 降 6.5℃ · 天氣現象</text>
      <rect x="90" y="100" width="380" height="38" fill="${c.lightGreen}" fill-opacity="0.4"/>
      <text x="140" y="123" font-size="12" font-weight="800" fill="${c.forest}">平流層 (10~50 km)</text>
      <text x="320" y="123" font-size="11" fill="${c.forest}">臭氧層吸收 UV 逆溫 · 客機巡航</text>
      <rect x="90" y="65" width="380" height="33" fill="${c.lightGold}" fill-opacity="0.4"/>
      <text x="140" y="86" font-size="12" font-weight="800" fill="${c.gold}">中氣層 (50~85 km)</text>
      <text x="320" y="86" font-size="11" fill="${c.muted}">大氣最冷處 (−90℃)</text>
      <rect x="90" y="28" width="380" height="35" fill="${c.lightPurple}" fill-opacity="0.4"/>
      <text x="140" y="50" font-size="12" font-weight="800" fill="${c.purple}">熱氣層 (85 km 以上)</text>
      <text x="320" y="50" font-size="11" fill="${c.purple}">氣溫高達 1000℃ · 極光/人造衛星</text>
      <!-- Temperature curve -->
      <path d="M 280 170 L 220 140 L 260 100 L 190 65 L 260 30" fill="none" stroke="${c.red}" stroke-width="2.5"/>
      <text x="270" y="198" font-size="11" font-weight="700" fill="${c.red}" text-anchor="middle">紅線代表溫度變化曲線：對流層降 ➔ 平流層升 ➔ 中氣層降 ➔ 熱氣層升</text>
    `)
  },
  'earth-6': {
    title: '水循環與地下水文地質剖面：受壓自流井模型',
    subtitle: '降水、地表逕流、土壤入滲；受壓含水層夾於不透水層之間',
    caption: '當井口海拔「低於受壓地下水面（水頭高度）」時，水在水壓推動下會自動噴湧而出，形成珍貴的「自流井」。',
    render: () => frame('水循環與地下水', `
      <!-- Geological layers -->
      <path d="M 40 100 Q 150 70 250 85 T 500 110 L 500 190 L 40 190 Z" fill="${c.lightGreen}" fill-opacity="0.3"/>
      <path d="M 40 120 Q 250 105 500 130" stroke="${c.dark}" stroke-width="3" fill="none"/>
      <text x="440" y="125" font-size="10" fill="${c.dark}">不透水層 (頁岩)</text>
      <path d="M 40 125 Q 250 110 500 135 L 500 160 Q 250 135 40 150 Z" fill="${c.lightBlue}" fill-opacity="0.7"/>
      <text x="140" y="142" font-size="11" font-weight="800" fill="${c.blue}">受壓含水層 (砂礫岩)</text>
      <path d="M 40 150 Q 250 135 500 160" stroke="${c.dark}" stroke-width="3" fill="none"/>
      <text x="440" y="155" font-size="10" fill="${c.dark}">不透水層 (基盤)</text>
      <!-- Artesian Well -->
      <line x1="320" y1="70" x2="320" y2="135" stroke="${c.blue}" stroke-width="3.5"/>
      <path d="M 320 70 Q 315 50 310 60" fill="none" stroke="${c.blue}" stroke-width="2.5"/>
      <text x="320" y="45" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">自流井 (噴泉)</text>
      <line x1="120" y1="65" x2="420" y2="65" stroke="${c.red}" stroke-width="1.8" stroke-dasharray="4,3"/>
      <text x="120" y="58" font-size="11" font-weight="700" fill="${c.red}">受壓地下水面 (水頭)</text>
      <text x="270" y="195" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">成井條件：井口海拔低於受壓水面即可自動出水</text>
    `)
  },
  'geography-3': {
    title: '人口金字塔三大類型與臺灣少子高齡化轉型',
    subtitle: '幼年型（高出生高死亡）➔ 靜止型（低出生低死亡）➔ 縮減型（倒金字塔高齡社會）',
    caption: '臺灣目前邁入「縮減型」人口結構：扶養比負擔加重，面臨少子化與高齡化雙重挑戰，推動長期照護與托育政策刻不容緩。',
    render: () => frame('人口金字塔轉型', `
      <!-- 1: Expansive -->
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="135" height="155" rx="6" fill="${c.white}" stroke="${c.border}"/>
        <text x="67" y="24" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">幼年型 (高金字塔)</text>
        <polygon points="67,40 18,125 116,125" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="67" y="142" font-size="10" fill="${c.muted}" text-anchor="middle">高出生率 · 發展中國家</text>
      </g>
      <!-- 2: Stationary -->
      <g transform="translate(200, 20)">
        <rect x="0" y="0" width="135" height="155" rx="6" fill="${c.white}" stroke="${c.border}"/>
        <text x="67" y="24" font-size="11" font-weight="800" fill="${c.blue}" text-anchor="middle">靜止型 (彈頭型)</text>
        <path d="M 67 40 L 105 60 L 105 125 L 30 125 L 30 60 Z" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="67" y="142" font-size="10" fill="${c.muted}" text-anchor="middle">各年齡層分佈平穩</text>
      </g>
      <!-- 3: Constrictive -->
      <g transform="translate(360, 20)">
        <rect x="0" y="0" width="140" height="155" rx="6" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.8"/>
        <text x="70" y="24" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">縮減型 (罈型) ★臺灣</text>
        <polygon points="35,50 105,50 115,85 90,125 50,125 25,85" fill="${c.white}" stroke="${c.red}" stroke-width="1.5"/>
        <text x="70" y="142" font-size="10" font-weight="700" fill="${c.red}" text-anchor="middle">少子化 ＋ 高齡化加劇</text>
      </g>
      <text x="270" y="195" font-size="12" font-weight="700" fill="${c.forest}" text-anchor="middle">扶養比升高：青壯年撫養幼年與老年人口負擔日益沉重</text>
    `)
  },
  'chinese-1': {
    title: '漢字字形演變歷史軸線與結構特徵',
    subtitle: '甲骨文 ➔ 金文 ➔ 小篆 ➔ 隸書（古今文字分水嶺）➔ 楷書（現代標準）',
    caption: '隸書「破圓為方、化繁為簡（隸變）」，徹底擺脫圖畫線條邁入符號化；楷書字形方正，為今日印刷與書寫之通用典範。',
    render: () => frame('漢字演變歷史軸', `
      <!-- Timeline line -->
      <line x1="50" y1="100" x2="490" y2="100" stroke="${c.forest}" stroke-width="3"/>
      ${[
        { name: '甲骨文', era: '殷商', desc: '圖畫象形/刻龜甲', x: 80, color: c.dark },
        { name: '金文', era: '商周', desc: '鐘鼎銘文/筆畫圓厚', x: 170, color: c.dark },
        { name: '小篆', era: '秦代', desc: '書同文/線條圓轉勻稱', x: 260, color: c.forest },
        { name: '隸書 ★', era: '漢代', desc: '化圓為方/蠶頭燕尾', x: 355, color: c.red },
        { name: '楷書', era: '魏晉唐', desc: '方正端莊/現代範本', x: 445, color: c.blue }
      ].map(s => `
        <circle cx="${s.x}" cy="100" r="7" fill="${s.color}"/>
        <rect x="${s.x - 38}" y="42" width="76" height="42" rx="5" fill="${c.white}" stroke="${s.color}" stroke-width="1.5"/>
        <text x="${s.x}" y="58" font-size="12" font-weight="800" fill="${s.color}" text-anchor="middle">${s.name}</text>
        <text x="${s.x}" y="74" font-size="10" fill="${c.muted}" text-anchor="middle">${s.era}</text>
        <text x="${s.x}" y="125" font-size="9" fill="${c.dark}" text-anchor="middle">${s.desc.split('/')[0]}</text>
        <text x="${s.x}" y="139" font-size="9" fill="${c.muted}" text-anchor="middle">${s.desc.split('/')[1]}</text>
      `).join('')}
      <rect x="70" y="165" width="400" height="30" rx="6" fill="${c.lightGold}" stroke="${c.gold}"/>
      <text x="270" y="184" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">關鍵考點：隸書為「古文字（象形描摹）」與「今文字（方塊筆畫）」之分水嶺</text>
    `)
  },
  'english-6': {
    title: '被動語態句型幾何結構轉化模型',
    subtitle: '主動 (S ＋ V ＋ O) ➔ 被動 (O變主詞 ＋ be動詞 ＋ 過去分詞 p.p. ＋ by S)',
    caption: '動詞時態依 be 動詞展現：現在式 is/are + p.p.；過去式 was/were + p.p.；未來式 will be + p.p.；完成式 has/have been + p.p.。',
    render: () => frame('被動語態結構', `
      <!-- Active sentence box -->
      <g transform="translate(60, 25)">
        <rect x="0" y="0" width="420" height="55" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="20" y="24" font-size="11" font-weight="800" fill="${c.forest}">主動語態 (Active Voice)</text>
        <text x="20" y="44" font-size="13" fill="${c.dark}">
          <tspan font-weight="700" fill="${c.blue}">Tom</tspan> (S)
          <tspan font-weight="700" fill="${c.forest}">wrote</tspan> (V)
          <tspan font-weight="700" fill="${c.gold}">the letter</tspan> (O).
        </text>
      </g>
      <!-- Transformation Arrows -->
      <path d="M 380 80 Q 270 95 140 110" fill="none" stroke="${c.gold}" stroke-width="2"/>
      <polygon points="140,110 148,105 148,115" fill="${c.gold}"/>
      <path d="M 100 80 Q 220 95 360 110" fill="none" stroke="${c.blue}" stroke-width="2"/>
      <polygon points="360,110 352,105 352,115" fill="${c.blue}"/>
      <!-- Passive sentence box -->
      <g transform="translate(60, 115)">
        <rect x="0" y="0" width="420" height="55" rx="8" fill="${c.white}" stroke="${c.forest}" stroke-width="2"/>
        <text x="20" y="24" font-size="11" font-weight="800" fill="${c.purple}">被動語態 (Passive Voice)</text>
        <text x="20" y="44" font-size="13" fill="${c.dark}">
          <tspan font-weight="800" fill="${c.gold}">The letter</tspan> (新主詞)
          <tspan font-weight="800" fill="${c.red}">was written</tspan> (be+p.p.)
          by <tspan font-weight="700" fill="${c.blue}">Tom</tspan>.
        </text>
      </g>
      <text x="270" y="195" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">公式口訣：受詞變主詞，動詞變 be+p.p.，原主詞變 by 後受格</text>
    `)
  }

,
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
  },

  // === CHINESE EXPANSION ===
  'chinese-10': {
    title: '詞與曲體制比較與流派特色',
    subtitle: '宋詞（長短句、依詞牌填詞）vs 元曲（散曲雜劇、依曲牌加襯字）',
    caption: '詞重整齊典雅，句有定數；曲語言生動活潑，允許在格律之外增加「襯字」以暢達文意。',
    render: () => frame('詞曲體制比較', `
      <!-- Column 1: Song Ci -->
      <g transform="translate(40, 35)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="25" font-size="14" font-weight="800" fill="${c.blue}" text-anchor="middle">【宋詞 · 詩餘長短句】</text>
        <line x1="20" y1="36" x2="195" y2="36" stroke="${c.blue}" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="20" y="58" font-size="10" font-weight="700" fill="${c.dark}">格律：依詞牌填詞，平仄嚴格</text>
        <text x="20" y="78" font-size="10" font-weight="700" fill="${c.dark}">句式：句式長短不齊，便於入樂</text>
        <text x="20" y="98" font-size="10" font-weight="700" fill="${c.dark}">風格：婉約派（李清照）／豪放派（蘇軾）</text>
        <text x="20" y="118" font-size="9" fill="${c.muted}">特點：無襯字，講求字句凝鍊含蓄</text>
      </g>
      <!-- Column 2: Yuan Qu -->
      <g transform="translate(285, 35)">
        <rect width="215" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="107" y="25" font-size="14" font-weight="800" fill="${c.gold}" text-anchor="middle">【元曲 · 詞餘雜劇散曲】</text>
        <line x1="20" y1="36" x2="195" y2="36" stroke="${c.gold}" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="20" y="58" font-size="10" font-weight="700" fill="${c.dark}">體制：散曲（小令、套數）與雜劇</text>
        <text x="20" y="78" font-size="10" font-weight="700" fill="${c.dark}">字數：可加「襯字」，句式靈活</text>
        <text x="20" y="98" font-size="10" font-weight="700" fill="${c.dark}">風格：元曲四大家（關、馬、白、鄭）</text>
        <text x="20" y="118" font-size="9" fill="${c.muted}">特點：通俗明快，善用市井白話與俚語</text>
      </g>
      <text x="270" y="192" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">韻文演進脈絡：詩莊 ➔ 詞媚 ➔ 曲俗，反映庶民生活與歌唱美學的變遷</text>
    `)
  },
  'chinese-11': {
    title: '古典章回小說演進與四大奇書',
    subtitle: '宋元話本說書 ➔ 明清章回小說，以人物衝突展現人性深度',
    caption: '章回小說以「分回標目」開展宏大敘事。四大奇書在軍政謀略、義氣背叛、神魔寓言與世情百態各具典型。',
    render: () => frame('古典章回小說', `
      <!-- Timeline box -->
      <line x1="50" y1="50" x2="490" y2="50" stroke="${c.forest}" stroke-width="2"/>
      <polygon points="490,50 482,46 482,54" fill="${c.forest}"/>
      <circle cx="90" cy="50" r="5" fill="${c.forest}"/>
      <text x="90" y="35" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">先秦神話寓言</text>
      <circle cx="200" cy="50" r="5" fill="${c.forest}"/>
      <text x="200" y="35" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">魏晉志怪唐傳奇</text>
      <circle cx="330" cy="50" r="5" fill="${c.forest}"/>
      <text x="330" y="35" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">宋元話本說話</text>
      <circle cx="450" cy="50" r="6" fill="${c.red}"/>
      <text x="450" y="35" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">明清章回小說高峰</text>
      <!-- 4 Books Grid -->
      ${[
        ['三國演義', '羅貫中 · 歷史演義', '天下大勢分合與智謀忠奸', c.blue, c.lightBlue, 50],
        ['水滸傳', '施耐庵 · 英雄傳奇', '官逼民反與江湖忠義悲劇', c.forest, c.lightGreen, 165],
        ['西遊記', '吳承恩 · 神魔諷刺', '取經磨難象徵心魔修煉', c.gold, c.lightGold, 280],
        ['紅樓夢', '曹雪芹 · 世情悲劇', '家族興衰與人生虛妄幻滅', c.purple, c.lightPurple, 395]
      ].map(([title, author, theme, stroke, fill, x]) => `
        <g transform="translate(${x}, 75)">
          <rect width="98" height="95" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="49" y="24" font-size="12" font-weight="800" fill="${stroke}" text-anchor="middle">${title}</text>
          <text x="49" y="42" font-size="8" font-weight="700" fill="${c.muted}" text-anchor="middle">${author}</text>
          <line x1="12" y1="52" x2="86" y2="52" stroke="${stroke}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="49" y="72" font-size="8" fill="${c.dark}" text-anchor="middle">${theme.slice(0,6)}</text>
          <text x="49" y="86" font-size="8" fill="${c.dark}" text-anchor="middle">${theme.slice(6)}</text>
        </g>
      `).join('')}
      <text x="270" y="195" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">特色：話本底色、分回標目、說書人口吻（且聽下回分解）、細膩刻畫人性</text>
    `)
  },
  'chinese-13': {
    title: '先秦諸子百家哲理散文光譜',
    subtitle: '儒墨道法四家核心主張、譬喻論辯與救世良方',
    caption: '先秦思想家面對春秋戰國動盪提出不同解方：儒家仁政禮教、道家順應自然、墨家兼愛尚同、法家嚴刑厚賞。',
    render: () => frame('先秦諸子思想光譜', `
      ${[
        ['儒家 · 孔孟荀', '仁義禮智 · 王道仁政', '以性善/性惡立論；孟子善用譬喻，論辯氣勢磅礡', c.forest, c.lightGreen, 40],
        ['道家 · 老莊', '順應自然 · 無為逍遙', '莊子善用寓言寄託哲理（庖丁解牛、涸轍之鮒）', c.blue, c.lightBlue, 160],
        ['墨家 · 墨子', '兼愛非攻 · 尚賢節用', '站在平民工匠立場，重視邏輯論辯與實用防禦', c.gold, c.lightGold, 280],
        ['法家 · 韓非子', '法術勢結合 · 富國強兵', '歷史進化觀，寓言生動尖銳（守株待兔、矛與盾）', c.red, c.lightRed, 400]
      ].map(([school, core, style, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="105" height="125" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="52" y="24" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${school}</text>
          <text x="52" y="44" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${core}</text>
          <line x1="12" y1="54" x2="93" y2="54" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <foreignObject x="8" y="58" width="89" height="60">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:8.5px;color:#223832;line-height:1.3;margin:0;text-align:center;">${style}</p>
          </foreignObject>
        </g>
      `).join('')}
      <text x="270" y="188" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">先秦散文特色：巧用譬喻、寓言寄意、長於說理，奠定漢語說服與哲思傳統</text>
    `)
  },
  'chinese-14': {
    title: '現代記敘抒情散文「情景交融」模型',
    subtitle: '借事抒情、以景襯情、托物言志的層次開展',
    caption: '優秀散文不直接呼喊口號，而是將抽象情感注入生活具象物件（如朱自清《背影》的橘子、琦君的桂花）。',
    render: () => frame('抒情散文意象營造', `
      <!-- 4 Stages loop -->
      ${[
        ['01 聚焦點染', '生活具象物件／微細場景', '一枚發黃相片、一盞夜燈', c.forest, c.lightGreen, 30],
        ['02 五感通感', '視覺/聽覺/觸覺細膩描摹', '雨水微涼、桂花甜香', c.blue, c.lightBlue, 155],
        ['03 情感投射', '物我互映、內在心緒轉折', '由景生情、思念與愧疚', c.gold, c.lightGold, 280],
        ['04 哲理昇華', '人生領悟、餘韻悠長點題', '生命的脆弱與溫柔', c.purple, c.lightPurple, 405]
      ].map(([num, stage, eg, col, bg, x]) => `
        <g transform="translate(${x}, 40)">
          <rect width="105" height="105" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <circle cx="52" cy="22" r="12" fill="${col}"/>
          <text x="52" y="26" font-size="9" font-weight="800" fill="${c.white}" text-anchor="middle">${num.slice(0,2)}</text>
          <text x="52" y="50" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${num.slice(3)}</text>
          <text x="52" y="70" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${stage}</text>
          <line x1="12" y1="78" x2="93" y2="78" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="52" y="94" font-size="7.5" fill="${c.muted}" text-anchor="middle">${eg}</text>
        </g>
        ${x < 405 ? `<path d="M ${x + 107} 92 L ${x + 128} 92" stroke="${c.forest}" stroke-width="2"/><polygon points="${x + 128},92 ${x + 122},88 ${x + 122},96" fill="${c.forest}"/>` : ''}
      `).join('')}
      <text x="270" y="185" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">核心心法：文貴有真情，更貴在以「具體象徵」承載抽象心緒，做到言有盡而意無窮</text>
    `)
  },
  'chinese-15': {
    title: '臺灣自然生態與海洋文學地景座標',
    subtitle: '高山森林、太平洋黑潮、原住民山海智慧與土地生態關懷',
    caption: '臺灣作家如廖鴻基（海洋）、劉克襄（自然踏查）、夏曼·藍波安（達悟海洋生態），展現人與自然的對話。',
    render: () => frame('臺灣生態文學地景', `
      <!-- Mountain and Ocean split -->
      <g transform="translate(40, 35)">
        <rect width="215" height="130" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="25" font-size="13" font-weight="800" fill="${c.forest}" text-anchor="middle">【山林與島嶼自然踏查】</text>
        <line x1="20" y1="36" x2="195" y2="36" stroke="${c.green}" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="20" y="58" font-size="10" font-weight="700" fill="${c.dark}">代表作家：劉克襄、徐仁修、吳明益</text>
        <text x="20" y="78" font-size="10" fill="${c.dark}">視角：步道踏查、鳥類觀察、舊鐵道尋蹤</text>
        <text x="20" y="98" font-size="10" fill="${c.dark}">核心關懷：環境變遷、物種保育、土地記憶</text>
        <text x="20" y="116" font-size="9" fill="${c.muted}">心法：放慢腳步，用身體五感重新認識鄉土</text>
      </g>
      <g transform="translate(285, 35)">
        <rect width="215" height="130" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="25" font-size="13" font-weight="800" fill="${c.blue}" text-anchor="middle">【海洋文學與南島文化】</text>
        <line x1="20" y1="36" x2="195" y2="36" stroke="${c.blue}" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="20" y="58" font-size="10" font-weight="700" fill="${c.dark}">代表作家：廖鴻基、夏曼·藍波安</text>
        <text x="20" y="78" font-size="10" fill="${c.dark}">視角：尋鯨討海、飛魚季、達悟造舟信仰</text>
        <text x="20" y="98" font-size="10" fill="${c.dark}">核心關懷：走出陸地思維，擁抱開闊海洋胸襟</text>
        <text x="20" y="116" font-size="9" fill="${c.muted}">心法：敬畏大海，尊重大自然生生不息的節奏</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">文學價值：打破以人為中心的傲慢，重新建立敬畏大地、同理共生的生態倫理</text>
    `)
  },
  'chinese-16': {
    title: '會考寫作審題立意四步破題模型',
    subtitle: '抓準題眼 ➔ 具體取材 ➔ 脈絡開展 ➔ 思想昇華',
    caption: '審題決定文章成敗。先辨識題幹關鍵詞（題眼）的隱含條件，由個人切身體驗出發，層層推進至深刻共鳴。',
    render: () => frame('會考寫作破題四步', `
      ${[
        ['第 1 步 · 審題眼', '圈出題目限制與提問核心', '例：《未完成的…》重點在「未完成」的遺憾與轉化', c.red, c.lightRed, 25],
        ['第 2 步 · 擇真材', '篩選具體、獨特的生活經歷', '避開爛俗套路，寫自己真正哭過、笑過、流汗的事', c.blue, c.lightBlue, 155],
        ['第 3 步 · 設轉折', '安排內在衝突與心境頓悟', '起（事件）➔ 承（鋪陳）➔ 轉（衝突體悟）', c.gold, c.lightGold, 285],
        ['第 4 步 · 昇華合', '收束全文，提煉普世價值', '不空洞喊口號，從自身領會照映人間大愛或成長', c.forest, c.lightGreen, 415]
      ].map(([step, action, detail, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="100" height="120" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="50" y="24" font-size="10.5" font-weight="800" fill="${col}" text-anchor="middle">${step}</text>
          <line x1="10" y1="34" x2="90" y2="34" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="50" y="52" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${action.slice(0,6)}</text>
          <text x="50" y="66" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${action.slice(6)}</text>
          <foreignObject x="6" y="74" width="88" height="42">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:7.5px;color:#687b74;line-height:1.2;margin:0;text-align:center;">${detail}</p>
          </foreignObject>
        </g>
      `).join('')}
      <text x="270" y="185" font-size="11" font-weight="700" fill="${c.forest}" text-anchor="middle">評分規準指引：立意深遠 ＋ 取材真實 ＋ 結構嚴謹 ＋ 遣詞流暢 ＝ 會考六級分</text>
    `)
  },

  // === ENGLISH EXPANSION ===
  'english-7': {
    title: '名詞單複數規則與祈使句結構',
    subtitle: '可數名詞複數變化規則、不可數名詞計量與祈使句原形動詞',
    caption: '名詞複數規則變化加 -s/-es；不規則變化如 child/children、foot/feet。祈使句省略主詞 You，以原形動詞開頭。',
    render: () => frame('名詞複數與祈使句', `
      <!-- Left: Plural Nouns -->
      <g transform="translate(35, 30)">
        <rect width="225" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="112" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【名詞複數變化圖解】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.forest}">規則變化：</tspan> 一般 +s (books, cats)</text>
        <text x="15" y="68" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.forest}">字尾 s, x, ch, sh：</tspan> +es (boxes, watches)</text>
        <text x="15" y="88" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.forest}">子音 + y：</tspan> 去 y 變 -ies (baby ➔ babies)</text>
        <text x="15" y="108" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.red}">不規則：</tspan> man/men, tooth/teeth, child/children</text>
        <text x="15" y="126" font-size="9" fill="${c.muted}">單複同形：sheep, fish, deer</text>
      </g>
      <!-- Right: Imperatives -->
      <g transform="translate(280, 30)">
        <rect width="225" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="112" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【祈使句 (Imperatives) 句型】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.blue}">肯定祈使：</tspan> [VR] + O. (Open the door!)</text>
        <text x="15" y="68" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.red}">否定祈使：</tspan> Don't + [VR]. (Don't run!)</text>
        <text x="15" y="88" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.gold}">委婉語氣：</tspan> Please + VR 或 VR, please.</text>
        <text x="15" y="108" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.purple}">指示代名詞：</tspan> this/that (單) ➔ these/those (複)</text>
        <text x="15" y="126" font-size="9" fill="${c.muted}">考點：祈使句首必用原形動詞，不可加 ing 或 to</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">易錯提醒：不可數名詞（water, money, bread）無複數形，需用 a cup of / two loaves of 計量</text>
    `)
  },
  'english-9': {
    title: '過去進行式與時間連接詞 when / while',
    subtitle: 'was / were ＋ V-ing 表過去某特定時刻正在進行的動作',
    caption: '當較長持續動作進行中（while + 過去進行式），突然發生另一個短暫中斷動作（when + 過去簡單式）。',
    render: () => frame('過去進行式與時間連接詞', `
      <!-- Time axis -->
      <line x1="50" y1="90" x2="490" y2="90" stroke="${c.forest}" stroke-width="2"/>
      <polygon points="490,90 482,86 482,94" fill="${c.forest}"/>
      <text x="490" y="110" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="end">時間推進 ➔</text>
      <!-- Ongoing action wave -->
      <rect x="100" y="45" width="260" height="30" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
      <text x="230" y="65" font-size="11" font-weight="700" fill="${c.blue}" text-anchor="middle">持續動作：I was studying English (while...)</text>
      <!-- Interruption action arrow -->
      <line x1="260" y1="130" x2="260" y2="82" stroke="${c.red}" stroke-width="2.5"/>
      <polygon points="260,82 255,90 265,90" fill="${c.red}"/>
      <circle cx="260" cy="90" r="5" fill="${c.red}"/>
      <text x="260" y="148" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">突發中斷：when the phone rang (點狀動作)</text>
      <!-- Formulas box -->
      <g transform="translate(50, 160)">
        <text x="0" y="15" font-size="10" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">公式①：</tspan> I was cooking <tspan font-weight="700" fill="${c.red}">when</tspan> you called me.</text>
        <text x="240" y="15" font-size="10" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">公式②：</tspan> <tspan font-weight="700" fill="${c.gold}">While</tspan> he was sleeping, Mom washed clothes.</text>
      </g>
    `)
  },
  'english-10': {
    title: '連綴動詞、感官動詞與最高級比較',
    subtitle: 'Look/Sound/Taste/Smell/Feel ＋ 形容詞；感官動詞 ＋ 原形動詞 / V-ing',
    caption: '連綴動詞後接形容詞當補語；感官動詞強調目擊全程用原形動詞，強調正在進行用 V-ing。最高級需加 the。',
    render: () => frame('連綴動詞與感官動詞', `
      <!-- Left: Linking verbs -->
      <g transform="translate(35, 30)">
        <rect width="225" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="112" y="24" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【連綴動詞 Linking Verbs】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.forest}">五種感官：</tspan> look, sound, smell, taste, feel</text>
        <text x="15" y="68" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.forest}">狀態轉變：</tspan> get, become, turn, grow</text>
        <text x="15" y="90" font-size="10" font-weight="800" fill="${c.red}">核心句型：S ＋ 連綴動詞 ＋ Adj.</text>
        <text x="15" y="110" font-size="9" fill="${c.dark}">例：The soup <tspan font-weight="700" fill="${c.red}">tastes delicious</tspan> (不可用副詞!)</text>
        <text x="15" y="126" font-size="9" fill="${c.muted}">若接名詞需加 like：It sounds <tspan font-weight="700">like a good idea</tspan>.</text>
      </g>
      <!-- Right: Sensory verbs -->
      <g transform="translate(280, 30)">
        <rect width="225" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="112" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【感官動詞 Sensory Verbs】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="700" fill="${c.blue}">動詞清單：</tspan> see, watch, hear, listen to, feel</text>
        <text x="15" y="72" font-size="10" font-weight="800" fill="${c.forest}">① S ＋ 感官動詞 ＋ O ＋ [VR] (全程)</text>
        <text x="25" y="90" font-size="9" fill="${c.dark}">例：I saw him <tspan font-weight="700">cross</tspan> the street.</text>
        <text x="15" y="110" font-size="10" font-weight="800" fill="${c.purple}">② S ＋ 感官動詞 ＋ O ＋ [V-ing] (當下正進行)</text>
        <text x="25" y="126" font-size="9" fill="${c.dark}">例：I heard her <tspan font-weight="700">singing</tspan> in the room.</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">最高級提醒：三者以上比較用 the ＋ -est / the most...，並搭配 in ＋ 範圍 或 of all</text>
    `)
  },
  'english-11': {
    title: '授予動詞介系詞搭配與使役動詞句型',
    subtitle: 'Give sth TO sb vs Buy sth FOR sb；Make/Have/Let ＋ 原形動詞',
    caption: '授予動詞有雙受詞。改寫為直接受詞在前時，一般動作用 to，需費心為對方做用 for。使役動詞強迫/允許受詞做動作。',
    render: () => frame('授予動詞與使役動詞', `
      <!-- Dative Verbs to vs for -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【授予動詞 (Dative Verbs)】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">搭配 to：</tspan> 方向性傳遞 (give, send, teach)</text>
        <text x="25" y="66" font-size="8.5" fill="${c.muted}">➔ She gave a book <tspan font-weight="700" fill="${c.blue}">to</tspan> me.</text>
        <text x="15" y="86" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">搭配 for：</tspan> 為某人付出/購買 (buy, make, cook)</text>
        <text x="25" y="104" font-size="8.5" fill="${c.muted}">➔ Dad made a cake <tspan font-weight="700" fill="${c.gold}">for</tspan> us.</text>
        <text x="15" y="124" font-size="8.5" fill="${c.red}">★ 代名詞當受詞必用 S+V+代名詞+Prep+人</text>
      </g>
      <!-- Causative Verbs -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">【使役動詞 (Causative Verbs)】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">make：</tspan> 強迫/要求 ➔ make + O + [VR]</text>
        <text x="15" y="68" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">have：</tspan> 委託/吩咐 ➔ have + O + [VR]</text>
        <text x="15" y="88" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">let：</tspan> 允許/讓 ➔ let + O + [VR]</text>
        <line x1="15" y1="98" x2="200" y2="98" stroke="${c.red}" stroke-width="0.8" stroke-dasharray="2,2"/>
        <text x="15" y="114" font-size="9" fill="${c.dark}"><tspan font-weight="700" fill="${c.purple}">get：</tspan> 說服某人 ➔ get + O + <tspan font-weight="800" fill="${c.red}">to VR</tspan> (特別注意!)</text>
        <text x="15" y="128" font-size="9" fill="${c.dark}"><tspan font-weight="700" fill="${c.forest}">help：</tspan> 幫助 ➔ help + O + (to) VR</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">現在完成式進階：have/has + p.p. 與 since（接時間點）及 for（接一段時間）常考連用</text>
    `)
  },
  'english-12': {
    title: '附加問句原則與間接問句語序',
    subtitle: 'Tag Questions 前肯後否、前否後肯；間接問句 Wh- ＋ 主詞 ＋ 動詞',
    caption: '附加問句時態與助動詞必須與主要子句一致。間接問句為名詞子句，核心考點是「不可倒裝，恢復直述句語序」。',
    render: () => frame('附加問句與間接問句', `
      <!-- Tag questions -->
      <g transform="translate(35, 30)">
        <rect width="225" height="135" rx="8" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="1.6"/>
        <text x="112" y="24" font-size="12" font-weight="800" fill="${c.purple}" text-anchor="middle">【附加問句 (Tag Questions)】</text>
        <text x="15" y="50" font-size="10" font-weight="700" fill="${c.dark}">原則一：前肯定 ➔ 後否定</text>
        <text x="25" y="68" font-size="9" fill="${c.muted}">You are a student, <tspan font-weight="700" fill="${c.red}">aren't you?</tspan></text>
        <text x="15" y="88" font-size="10" font-weight="700" fill="${c.dark}">原則二：前否定 ➔ 後肯定</text>
        <text x="25" y="106" font-size="9" fill="${c.muted}">He didn't go, <tspan font-weight="700" fill="${c.forest}">did he?</tspan></text>
        <text x="15" y="124" font-size="8.5" fill="${c.red}">特例：Let's ➔ shall we? / 祈使句 ➔ will you?</text>
      </g>
      <!-- Indirect questions -->
      <g transform="translate(280, 30)">
        <rect width="225" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="112" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【間接問句 (Indirect Questions)】</text>
        <text x="15" y="48" font-size="10" font-weight="800" fill="${c.red}">核心語序：疑問詞 ＋ 主詞 ＋ 動詞</text>
        <text x="15" y="70" font-size="9" fill="${c.dark}">直接：Where <tspan text-decoration="line-through">does he live</tspan>?</text>
        <text x="15" y="88" font-size="9.5" font-weight="700" fill="${c.blue}">間接：I wonder <tspan fill="${c.red}">where he lives</tspan>.</text>
        <text x="15" y="110" font-size="9" fill="${c.dark}">Yes/No 問句改寫加 <tspan font-weight="700" fill="${c.gold}">if / whether</tspan>：</text>
        <text x="15" y="126" font-size="9" fill="${c.muted}">➔ Tell me <tspan font-weight="700">if she is coming</tspan>.</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">考場必殺技：看到間接問句選項，立刻檢查主詞動詞有沒有被助動詞倒裝，凡倒裝者直接剔除！</text>
    `)
  },
  'english-14': {
    title: '條件副詞子句與假設語氣情態助動詞',
    subtitle: 'If 子句用「現在式代替未來式」；unless 等同 if... not',
    caption: '當主要子句表達未來時，if 條件子句必須使用現在簡單式。unless 表「除非」，子句內部不可再有 not 雙重否定。',
    render: () => frame('條件副詞子句', `
      <!-- If clause diagram -->
      <g transform="translate(50, 40)">
        <rect width="200" height="90" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.8"/>
        <text x="100" y="30" font-size="13" font-weight="800" fill="${c.gold}" text-anchor="middle">If 條件子句</text>
        <text x="100" y="55" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">【使用現在簡單式】</text>
        <text x="100" y="74" font-size="9" fill="${c.dark}" text-anchor="middle">If it <tspan font-weight="700" fill="${c.red}">rains</tspan> tomorrow, ...</text>
      </g>
      <path d="M 260 85 L 285 85" stroke="${c.forest}" stroke-width="2.5"/>
      <polygon points="285,85 277,81 277,89" fill="${c.forest}"/>
      <g transform="translate(290, 40)">
        <rect width="200" height="90" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.8"/>
        <text x="100" y="30" font-size="13" font-weight="800" fill="${c.forest}" text-anchor="middle">主要子句 (Main Clause)</text>
        <text x="100" y="55" font-size="11" font-weight="800" fill="${c.forest}" text-anchor="middle">【使用未來式 will / can】</text>
        <text x="100" y="74" font-size="9" fill="${c.dark}" text-anchor="middle">... we <tspan font-weight="700" fill="${c.forest}">will cancel</tspan> the picnic.</text>
      </g>
      <!-- Bottom explanation -->
      <rect x="50" y="145" width="440" height="40" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.2"/>
      <text x="270" y="165" font-size="10" font-weight="700" fill="${c.blue}" text-anchor="middle">Unless 語意拆解：Unless you study hard = If you do not study hard (絕不可寫 unless you don't!)</text>
      <text x="270" y="178" font-size="9" fill="${c.muted}" text-anchor="middle">情態助動詞：should (應該/建言), must (必須/高把握推測), could/would (禮貌客氣/假設)</text>
    `)
  },
  'english-15': {
    title: '關係代名詞受格省略與介系詞前置規則',
    subtitle: 'Who / Whom / Which / That 作受格時可省略；介系詞前置時不可用 that 或 who',
    caption: '關代當受格時（後方有完整主詞＋動詞），關代可直接省略。若介系詞移至關代前面，人必用 whom，物必用 which。',
    render: () => frame('關係代名詞受格與介系詞', `
      <!-- Row 1: Omission of Object Relative Pronoun -->
      <g transform="translate(40, 30)">
        <rect width="460" height="65" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="20" y="24" font-size="11" font-weight="800" fill="${c.forest}">① 受格關代可省略規則 (Omission)：</text>
        <text x="20" y="46" font-size="10" fill="${c.dark}">The boy <tspan font-weight="700" fill="${c.red}">(whom / that)</tspan> you met yesterday is my brother.</text>
        <text x="320" y="46" font-size="9" font-weight="700" fill="${c.forest}">➔ 後面有完整主詞 you，可省略！</text>
      </g>
      <!-- Row 2: Preposition in front -->
      <g transform="translate(40, 105)">
        <rect width="460" height="85" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="20" y="24" font-size="11" font-weight="800" fill="${c.gold}">② 介系詞前置陷阱 (Preposition + Relative Pronoun)：</text>
        <text x="20" y="46" font-size="10" fill="${c.dark}">This is the house <tspan font-weight="800" fill="${c.blue}">in which</tspan> I was born.（先行詞是物，只准用 which，<tspan fill="${c.red}">禁用 in that!</tspan>）</text>
        <text x="20" y="66" font-size="10" fill="${c.dark}">The man <tspan font-weight="800" fill="${c.purple}">to whom</tspan> she spoke is a teacher.（先行詞是人，只准用 whom，<tspan fill="${c.red}">禁用 to who!</tspan>）</text>
      </g>
    `)
  },
  'english-16': {
    title: '跨文本多模態閱讀策略與素養克漏字',
    subtitle: 'Skimming (略讀抓主旨) ➔ Scanning (掃讀找細節) ➔ Context Clues (上下文推理)',
    caption: '會考長篇非連續性文本（火車時刻表、菜單、招募廣告、長篇對話）重在「不被生詞卡住，用關鍵字精確回文定位」。',
    render: () => frame('素養閱讀三步解題策略', `
      ${[
        ['Step 1 · Skimming', '5 秒略讀大意', '看標題、粗體字、首尾段第一句，了解文章文體（email、說明書或故事）', c.blue, c.lightBlue, 35],
        ['Step 2 · Scanning', '帶題目關鍵字掃讀', '先看題幹問 Who/When/Where，在圖表或長文中精確鎖定數據與行數', c.gold, c.lightGold, 195],
        ['Step 3 · Deduction', '上下文推理排除', '注意 not, except, however 等轉折詞；排除過度推論與無中生有選項', c.forest, c.lightGreen, 355]
      ].map(([step, action, detail, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="145" height="120" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="72" y="24" font-size="11.5" font-weight="800" fill="${col}" text-anchor="middle">${step}</text>
          <line x1="15" y1="34" x2="130" y2="34" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="72" y="52" font-size="9.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${action}</text>
          <foreignObject x="10" y="60" width="125" height="60">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:8px;color:#223832;line-height:1.25;margin:0;text-align:center;">${detail}</p>
          </foreignObject>
        </g>
      `).join('')}
      <text x="270" y="185" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">克漏字心法：先讀空格前後完整一句，由連接詞（because, but, so）決定因果與時態</text>
    `)
  },

  // === ARTS EXPANSION ===
  'visual-1': {
    title: '色彩三要素與構圖三分法則',
    subtitle: '色相（種類）、明度（明暗）、彩度（鮮豔）與井字構圖黃金分割',
    caption: '色彩搭配講究對比與調和；構圖將重要視覺焦點置於九宮格交點上，能營造平衡自然的視覺張力。',
    render: () => frame('色彩三要素與構圖法則', `
      <!-- Left: Color 3 Dimensions -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【色彩三要素 (Color Attributes)】</text>
        <circle cx="45" cy="55" r="14" fill="#e74c3c"/>
        <text x="70" y="58" font-size="9.5" font-weight="700" fill="${c.dark}">色相 (Hue)：紅黃藍綠色彩種類</text>
        <circle cx="45" cy="85" r="14" fill="#bdc3c7"/>
        <text x="70" y="88" font-size="9.5" font-weight="700" fill="${c.dark}">明度 (Value)：加白變亮、加黑變暗</text>
        <circle cx="45" cy="115" r="14" fill="#f39c12"/>
        <text x="70" y="118" font-size="9.5" font-weight="700" fill="${c.dark}">彩度 (Chroma)：純度與鮮豔飽和度</text>
      </g>
      <!-- Right: Rule of Thirds -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【三分法則 (Rule of Thirds)】</text>
        <!-- Grid -->
        <rect x="35" y="38" width="145" height="80" fill="none" stroke="${c.blue}" stroke-width="1.5"/>
        <line x1="83" y1="38" x2="83" y2="118" stroke="${c.blue}" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="131" y1="38" x2="131" y2="118" stroke="${c.blue}" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="35" y1="65" x2="180" y2="65" stroke="${c.blue}" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="35" y1="91" x2="180" y2="91" stroke="${c.blue}" stroke-width="1" stroke-dasharray="3,3"/>
        <!-- Focal point intersection -->
        <circle cx="131" cy="65" r="5" fill="${c.red}"/>
        <text x="107" y="132" font-size="8.5" fill="${c.forest}" text-anchor="middle">★ 將視覺焦點置於交點上最具動態張力</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">藝術表現：利用冷暖對比、互補色（紅綠、藍橙）強化視覺重量，創造主從層次</text>
    `)
  },
  'visual-2': {
    title: '線性透視消逝點與媒材創作流程',
    subtitle: '一點透視、二點透視與地平線（視平線）空間深度營造',
    caption: '透視法利用平行線往地平線上的消逝點 (VP) 匯聚，營造近大遠小的二維三度空間錯覺。',
    render: () => frame('線性透視與空間深度', `
      <!-- Horizon line -->
      <line x1="40" y1="90" x2="500" y2="90" stroke="${c.blue}" stroke-width="2"/>
      <text x="490" y="82" font-size="10" font-weight="800" fill="${c.blue}" text-anchor="end">地平線／視平線 (Horizon)</text>
      <!-- Vanishing point -->
      <circle cx="270" cy="90" r="5" fill="${c.red}"/>
      <text x="270" y="75" font-size="11" font-weight="800" fill="${c.red}" text-anchor="middle">消逝點 (VP)</text>
      <!-- Perspective lines -->
      <line x1="270" y1="90" x2="90" y2="170" stroke="${c.gold}" stroke-width="1.8" stroke-dasharray="4,3"/>
      <line x1="270" y1="90" x2="450" y2="170" stroke="${c.gold}" stroke-width="1.8" stroke-dasharray="4,3"/>
      <line x1="270" y1="90" x2="130" y2="170" stroke="${c.forest}" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="270" y1="90" x2="410" y2="170" stroke="${c.forest}" stroke-width="1.2" stroke-dasharray="3,3"/>
      <!-- Near building vs Far building -->
      <rect x="90" y="110" width="40" height="55" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1.5"/>
      <text x="110" y="142" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">近大</text>
      <rect x="220" y="93" width="18" height="22" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1.2"/>
      <text x="229" y="108" font-size="7" font-weight="700" fill="${c.forest}" text-anchor="middle">遠小</text>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">媒材探究：水彩具透明渲染流動美感；壓克力快乾遮蓋力強；素描炭筆長於光影素體塑造</text>
    `)
  },
  'visual-3': {
    title: '藝術賞析四步法與策展空間動線',
    subtitle: '描述 (Describe) ➔ 分析 (Analyze) ➔ 詮釋 (Interpret) ➔ 評價 (Judge)',
    caption: '欣賞藝術品不是主觀說「好看」而已，需透過具體客觀形式分析，連結文化時代脈絡，提出有證據的詮釋。',
    render: () => frame('藝術賞析與策展脈絡', `
      ${[
        ['① 描述', '客觀列舉視覺元素', '題材、尺寸、色調、物體細節', c.blue, c.lightBlue, 35],
        ['② 分析', '解構形式美學原理', '比例、節奏、平衡、對比與焦點', c.forest, c.lightGreen, 155],
        ['③ 詮釋', '探究內在情感與意涵', '作者意圖、時代背景、象徵隱喻', c.gold, c.lightGold, 275],
        ['④ 評價', '立足證據給予評判', '創新突破度、文化價值與啟發性', c.purple, c.lightPurple, 395]
      ].map(([step, action, detail, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="105" height="115" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="52" y="24" font-size="12" font-weight="800" fill="${col}" text-anchor="middle">${step}</text>
          <line x1="12" y1="34" x2="93" y2="34" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="52" y="52" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">${action.slice(0,6)}</text>
          <text x="52" y="66" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">${action.slice(6)}</text>
          <foreignObject x="8" y="74" width="89" height="38">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:7.5px;color:#687b74;line-height:1.2;margin:0;text-align:center;">${detail}</p>
          </foreignObject>
        </g>
        ${x < 395 ? `<path d="M ${x + 107} 92 L ${x + 124} 92" stroke="${c.forest}" stroke-width="2"/><polygon points="${x + 124},92 ${x + 118},88 ${x + 118},96" fill="${c.forest}"/>` : ''}
      `).join('')}
      <text x="270" y="185" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">展演策劃：考量展品動線、燈光照度、文字說明牌（導覽系統）與觀眾互動體驗</text>
    `)
  },
  'music-1': {
    title: '節奏拍號金字塔與音符長度關係',
    subtitle: '全音符 ➔ 二分音符 ➔ 四分音符 ➔ 八分音符 ➔ 十六分音符',
    caption: '4/4 拍代表以四分音符為一拍，每小節四拍，強弱規律為「強、弱、次強、弱」；3/4 拍為「強、弱、弱」圓舞曲風。',
    render: () => frame('音符長度與拍號體系', `
      <!-- Pyramid Levels -->
      <g transform="translate(170, 30)">
        <rect width="200" height="26" rx="5" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="100" y="18" font-size="11" font-weight="800" fill="${c.gold}" text-anchor="middle">全音符 (𝅝) ＝ 4 拍</text>
      </g>
      <g transform="translate(120, 62)">
        <rect width="145" height="26" rx="5" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.2"/>
        <text x="72" y="18" font-size="10" font-weight="700" fill="${c.blue}" text-anchor="middle">二分音符 (𝅗𝅥) ＝ 2 拍</text>
      </g>
      <g transform="translate(275, 62)">
        <rect width="145" height="26" rx="5" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.2"/>
        <text x="72" y="18" font-size="10" font-weight="700" fill="${c.blue}" text-anchor="middle">二分音符 (𝅗𝅥) ＝ 2 拍</text>
      </g>
      <g transform="translate(50, 94)">
        ${[0, 1, 2, 3].map(i => `
          <rect x="${i * 112}" width="102" height="26" rx="5" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.2"/>
          <text x="${i * 112 + 51}" y="18" font-size="9" font-weight="700" fill="${c.forest}" text-anchor="middle">四分音符 (𝅘𝅥) 1拍</text>
        `).join('')}
      </g>
      <!-- Time Signature explanation -->
      <g transform="translate(50, 132)">
        <rect width="440" height="42" rx="6" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="1.2"/>
        <text x="220" y="22" font-size="11" font-weight="800" fill="${c.purple}" text-anchor="middle">拍號解讀：上數字為「每小節拍數」，下數字為「以何種音符為一拍」</text>
        <text x="220" y="35" font-size="9" fill="${c.dark}" text-anchor="middle">例 4/4 拍（強-弱-次強-弱） · 3/4 拍（強-弱-弱） · 6/8 拍（複拍子兩大拍循環）</text>
      </g>
      <text x="270" y="193" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">旋律特性：音高起伏構成線條，結合節拍律動與休止符，傳遞不同張力與情緒</text>
    `)
  },
  'music-2': {
    title: '管弦樂團四大樂器家族與音色織體',
    subtitle: '弦樂族、木管族、銅管族、打擊樂族舞台編制與發聲原理',
    caption: '樂器因材質、共鳴箱體與振動方式不同產生獨特泛音列（音色）。合奏講究聲部平衡與主從織體。',
    render: () => frame('管弦樂團編制圖解', `
      <!-- Semi-circle Orchestra Layout -->
      <path d="M 60 140 A 210 110 0 0 1 480 140" fill="none" stroke="${c.border}" stroke-width="1.5" stroke-dasharray="3,3"/>
      <!-- Conductor podium -->
      <rect x="250" y="135" width="40" height="25" rx="4" fill="${c.forest}"/>
      <text x="270" y="152" font-size="10" font-weight="800" fill="${c.white}" text-anchor="middle">指揮台</text>
      <!-- 4 Families -->
      <!-- Strings -->
      <g transform="translate(100, 100)">
        <rect width="90" height="32" rx="5" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="45" y="16" font-size="9.5" font-weight="800" fill="${c.forest}" text-anchor="middle">弦樂家族</text>
        <text x="45" y="27" font-size="7" fill="${c.muted}" text-anchor="middle">小提/中提/大提/低提</text>
      </g>
      <!-- Woodwinds -->
      <g transform="translate(225, 80)">
        <rect width="90" height="32" rx="5" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="45" y="16" font-size="9.5" font-weight="800" fill="${c.blue}" text-anchor="middle">木管家族</text>
        <text x="45" y="27" font-size="7" fill="${c.muted}" text-anchor="middle">長笛/雙簧管/單簧管/低音管</text>
      </g>
      <!-- Brass -->
      <g transform="translate(350, 100)">
        <rect width="90" height="32" rx="5" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="45" y="16" font-size="9.5" font-weight="800" fill="${c.gold}" text-anchor="middle">銅管家族</text>
        <text x="45" y="27" font-size="7" fill="${c.muted}" text-anchor="middle">小號/法國號/長號/低音號</text>
      </g>
      <!-- Percussion -->
      <g transform="translate(210, 35)">
        <rect width="120" height="32" rx="5" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.5"/>
        <text x="60" y="16" font-size="9.5" font-weight="800" fill="${c.red}" text-anchor="middle">打擊樂家族</text>
        <text x="60" y="27" font-size="7" fill="${c.muted}" text-anchor="middle">定音鼓/小鼓/大鈸/鐵琴</text>
      </g>
      <text x="270" y="188" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">合奏聆聽：分辨單音音樂 (Monophony)、主調音樂 (Homophony) 與複調對位 (Polyphony)</text>
    `)
  },
  'music-3': {
    title: '音樂動機發展與世界民族調式',
    subtitle: '重複、對比、變奏三大作曲手法與五聲音階（宮商角徵羽）',
    caption: '作曲家常從短小動機（如貝多芬第五號四音動機）發展成宏大樂章；傳統東方音樂則以五聲音階展現典雅意境。',
    render: () => frame('音樂動機發展與調式', `
      <!-- Motif development -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【音樂動機發展三大法則】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">① 重複 (Repetition)：</tspan> 強化主題印象</text>
        <text x="15" y="68" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">② 對比 (Contrast)：</tspan> 引入不同節奏/調性</text>
        <text x="15" y="88" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.purple}">③ 變奏 (Variation)：</tspan> 改變節奏、和聲、音色</text>
        <text x="15" y="112" font-size="9" fill="${c.muted}">例：主題與變奏曲、奏鳴曲式呈示發展再現</text>
      </g>
      <!-- Pentatonic Scale -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【傳統五聲音階 (Pentatonic)】</text>
        <g transform="translate(15, 45)">
          ${['宮 (1/Do)', '商 (2/Re)', '角 (3/Mi)', '徵 (5/Sol)', '羽 (6/La)'].map((tone, idx) => `
            <circle cx="${idx * 38 + 15}" cy="20" r="14" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1.5"/>
            <text x="${idx * 38 + 15}" y="24" font-size="7.5" font-weight="800" fill="${c.forest}" text-anchor="middle">${tone.slice(0,1)}</text>
            <text x="${idx * 38 + 15}" y="48" font-size="7" fill="${c.muted}" text-anchor="middle">${tone.slice(2)}</text>
          `).join('')}
        </g>
        <text x="107" y="118" font-size="8.5" fill="${c.dark}" text-anchor="middle">特色：無半音（無 4/Fa 與 7/Ti），和諧悠遠</text>
        <text x="107" y="130" font-size="8" fill="${c.muted}" text-anchor="middle">臺灣民謠（望春風、雨夜花）深植五聲美學</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">世界音樂：非洲複節奏、印尼甘美朗、原住民族合唱（布農八部合音泛音和聲）展現多元智慧</text>
    `)
  },
  'performing-1': {
    title: '表演身體方位九宮格與聲音投射',
    subtitle: '舞台九方位（上/中/下、左/中/右）與演員呼吸共鳴投影',
    caption: '舞台方位以「演員視角」定義。下舞台最靠近觀眾、親密感強；聲音需靠腹式呼吸支撐與共鳴腔體投射至劇場後排。',
    render: () => frame('舞台九宮格與聲音投影', `
      <!-- 3x3 Stage Grid -->
      <g transform="translate(50, 30)">
        <rect width="180" height="120" fill="none" stroke="${c.forest}" stroke-width="1.8"/>
        <!-- grid lines -->
        <line x1="110" y1="30" x2="110" y2="150" stroke="${c.border}" stroke-width="1"/>
        <line x1="170" y1="30" x2="170" y2="150" stroke="${c.border}" stroke-width="1"/>
        <line x1="50" y1="70" x2="230" y2="70" stroke="${c.border}" stroke-width="1"/>
        <line x1="50" y1="110" x2="230" y2="110" stroke="${c.border}" stroke-width="1"/>
        <!-- Labels -->
        <text x="80" y="55" font-size="8" fill="${c.muted}" text-anchor="middle">上右 (USR)</text>
        <text x="140" y="55" font-size="8" fill="${c.muted}" text-anchor="middle">上中 (USC)</text>
        <text x="200" y="55" font-size="8" fill="${c.muted}" text-anchor="middle">上左 (USL)</text>
        <text x="80" y="95" font-size="8" fill="${c.muted}" text-anchor="middle">中右 (CSR)</text>
        <text x="140" y="95" font-size="9" font-weight="800" fill="${c.red}" text-anchor="middle">舞台中央 (CS)</text>
        <text x="200" y="95" font-size="8" fill="${c.muted}" text-anchor="middle">中左 (CSL)</text>
        <text x="80" y="135" font-size="8" fill="${c.muted}" text-anchor="middle">下右 (DSR)</text>
        <text x="140" y="135" font-size="8.5" font-weight="700" fill="${c.forest}" text-anchor="middle">下中 (DSC)</text>
        <text x="200" y="135" font-size="8" fill="${c.muted}" text-anchor="middle">下左 (DSL)</text>
      </g>
      <text x="140" y="165" font-size="9.5" font-weight="700" fill="${c.forest}" text-anchor="middle">▼ 觀眾席 (Audience) ▼</text>
      <!-- Voice Projection Box -->
      <g transform="translate(265, 30)">
        <rect width="225" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="112" y="24" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【演員聲音與肢體能量】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">呼吸支撐：</tspan> 橫膈膜腹式呼吸，穩定氣流</text>
        <text x="15" y="68" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">共鳴投射：</tspan> 頭腔、胸腔共鳴，聲音穿透力</text>
        <text x="15" y="88" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">肢體姿態：</tspan> 開放開放 (Open) 面對觀眾</text>
        <text x="15" y="108" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.purple}">專注定點：</tspan> 眼神焦點 (Focal Point) 凝聚張力</text>
        <text x="15" y="126" font-size="8.5" fill="${c.muted}">停頓 (Pause) 與節奏變化是傳遞未說之話的法寶</text>
      </g>
    `)
  },
  'performing-2': {
    title: '戲劇衝突三幕結構與「Yes, and...」即興心法',
    subtitle: '開端建置 ➔ 衝突對立 ➔ 高潮 ➔ 結局轉化；即興表演接納與推進',
    caption: '無衝突即無戲劇。角色內在慾望受到障礙阻撓產生張力；即興表演則以「讚同並加碼」打破框架。',
    render: () => frame('戲劇衝突與即興原則', `
      <!-- Dramatic Arc Curve -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="22" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【戲劇張力金字塔弧線】</text>
        <!-- Mountain path -->
        <path d="M 20 115 L 75 80 L 125 45 L 195 115" fill="none" stroke="${c.red}" stroke-width="2.5"/>
        <circle cx="125" cy="45" r="5" fill="${c.red}"/>
        <text x="125" y="38" font-size="9.5" font-weight="800" fill="${c.red}" text-anchor="middle">高潮 (Climax)</text>
        <text x="35" y="128" font-size="8" fill="${c.muted}">開端建置</text>
        <text x="65" y="72" font-size="8" font-weight="700" fill="${c.gold}">危機衝突</text>
        <text x="185" y="128" font-size="8" fill="${c.muted}">收束結局</text>
      </g>
      <!-- Improv Yes and -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【即興表演「Yes, and...」黃金律】</text>
        <text x="15" y="50" font-size="10" font-weight="800" fill="${c.forest}">① 認同接受 (Yes)：</text>
        <text x="25" y="66" font-size="8.5" fill="${c.dark}">完全接納搭檔丟出的情境設定，不否定阻斷</text>
        <text x="15" y="88" font-size="10" font-weight="800" fill="${c.gold}">② 加碼拓展 (And)：</text>
        <text x="25" y="104" font-size="8.5" fill="${c.dark}">在既有設定上主動追加新資訊、關係或動機</text>
        <text x="15" y="124" font-size="8.5" fill="${c.red}">★ 嚴禁說「No」或「不是這樣啦」，避免情境凍結</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">角色三要素：我是誰（身分目標）？我要什麼（慾望動機）？誰在阻撓我（障礙危機）？</text>
    `)
  },
  'performing-3': {
    title: '劇場演製整合與跨領域回饋反思循環',
    subtitle: '編導演、舞臺設計、燈光、音效、服裝梳化與前台後台協同',
    caption: '一場演出的成功仰賴各專業精密配合。彩排技術排練 (Tech Rehearsal) 整合聲光，演後落實結構化回饋。',
    render: () => frame('劇場演製合作循環', `
      <!-- Circular Collaboration Wheel -->
      <circle cx="270" cy="95" r="60" fill="none" stroke="${c.border}" stroke-width="2"/>
      <!-- Core: Audience Experience -->
      <circle cx="270" cy="95" r="28" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
      <text x="270" y="92" font-size="9" font-weight="800" fill="${c.gold}" text-anchor="middle">核心體現</text>
      <text x="270" y="104" font-size="7.5" fill="${c.dark}" text-anchor="middle">觀眾共鳴</text>
      <!-- 4 Satellites -->
      <!-- Director & Actors -->
      <g transform="translate(140, 40)">
        <rect width="90" height="34" rx="6" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.2"/>
        <text x="45" y="16" font-size="9.5" font-weight="800" fill="${c.forest}" text-anchor="middle">導演與演員</text>
        <text x="45" y="28" font-size="7.5" fill="${c.muted}" text-anchor="middle">文本詮釋/角色排練</text>
      </g>
      <!-- Technical Design -->
      <g transform="translate(310, 40)">
        <rect width="90" height="34" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.2"/>
        <text x="45" y="16" font-size="9.5" font-weight="800" fill="${c.blue}" text-anchor="middle">舞美與燈光音效</text>
        <text x="45" y="28" font-size="7.5" fill="${c.muted}" text-anchor="middle">空間氛圍/技術Cue點</text>
      </g>
      <!-- Stage Manager -->
      <g transform="translate(140, 115)">
        <rect width="90" height="34" rx="6" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="1.2"/>
        <text x="45" y="16" font-size="9.5" font-weight="800" fill="${c.purple}" text-anchor="middle">舞監與後台</text>
        <text x="45" y="28" font-size="7.5" fill="${c.muted}" text-anchor="middle">換場道具/安全掌控</text>
      </g>
      <!-- Front of House -->
      <g transform="translate(310, 115)">
        <rect width="90" height="34" rx="6" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.2"/>
        <text x="45" y="16" font-size="9.5" font-weight="800" fill="${c.red}" text-anchor="middle">前台與行政</text>
        <text x="45" y="28" font-size="7.5" fill="${c.muted}" text-anchor="middle">票務文宣/問卷反饋</text>
      </g>
      <text x="270" y="188" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">回饋規準：先肯定亮點（哪幕被打動），再提出具體可行動的調整建議（聲量、走位或節奏）</text>
    `)
  },

  // === COMPUTING & TECH EXPANSION ===
  'computing-1': {
    title: '運算思維四核心與演算法流程圖',
    subtitle: '問題拆解、模式識別、抽象化、演算法設計與規範符號',
    caption: '運算思維是解決複雜問題的通法。流程圖標準符號：起止橢圓、處理矩形、判斷菱形、輸入輸出平行四邊形。',
    render: () => frame('運算思維與流程圖', `
      <!-- Left: 4 Pillars -->
      <g transform="translate(35, 30)">
        <rect width="210" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="105" y="22" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【運算思維四核心能力】</text>
        <text x="15" y="46" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">① 問題拆解 (Decomposition)：</tspan> 大化小</text>
        <text x="15" y="68" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">② 模式識別 (Pattern)：</tspan> 找重複規律</text>
        <text x="15" y="90" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">③ 抽象化 (Abstraction)：</tspan> 捨枝節抓本質</text>
        <text x="15" y="112" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">④ 演算法 (Algorithm)：</tspan> 明確執行步驟</text>
      </g>
      <!-- Right: Flowchart Symbols -->
      <g transform="translate(275, 30)">
        <rect width="230" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="115" y="22" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【流程圖標準規範符號】</text>
        <!-- Oval Start -->
        <rect x="20" y="38" width="55" height="18" rx="9" fill="${c.forest}"/>
        <text x="47" y="51" font-size="8" font-weight="700" fill="${c.white}" text-anchor="middle">開始/結束</text>
        <text x="90" y="51" font-size="8.5" fill="${c.dark}">橢圓形 (Terminal)</text>
        <!-- Parallelogram I/O -->
        <polygon points="25,65 75,65 65,83 15,83" fill="${c.blue}"/>
        <text x="45" y="77" font-size="8" font-weight="700" fill="${c.white}" text-anchor="middle">輸入/輸出</text>
        <text x="90" y="77" font-size="8.5" fill="${c.dark}">平行四邊形 (I/O)</text>
        <!-- Rect Process -->
        <rect x="18" y="90" width="55" height="18" rx="2" fill="${c.gold}"/>
        <text x="45" y="103" font-size="8" font-weight="700" fill="${c.white}" text-anchor="middle">運算處理</text>
        <text x="90" y="103" font-size="8.5" fill="${c.dark}">矩形 (Process)</text>
        <!-- Diamond Decision -->
        <polygon points="45,112 68,124 45,136 22,124" fill="${c.red}"/>
        <text x="45" y="127" font-size="7.5" font-weight="700" fill="${c.white}" text-anchor="middle">條件判斷</text>
        <text x="90" y="127" font-size="8.5" fill="${c.dark}">菱形 (Decision：True/False)</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">演算法三特性：明確性（無歧義）、有限性（必能結束）、有效性（步驟皆可執行）</text>
    `)
  },
  'computing-2': {
    title: '程式結構三大基石：循序、分支與迴圈',
    subtitle: '變數賦值、if-else 條件選擇、for / while 重複結構與變數追蹤',
    caption: '所有現代軟體程式皆由這三種控制結構組合而成。除錯關鍵在於使用表格逐步追蹤 (Trace) 變數值的改變。',
    render: () => frame('程式三大控制結構', `
      <!-- 1. Sequence -->
      <g transform="translate(35, 30)">
        <rect width="135" height="125" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="67" y="24" font-size="11.5" font-weight="800" fill="${c.forest}" text-anchor="middle">① 循序結構</text>
        <rect x="25" y="40" width="85" height="20" rx="3" fill="${c.green}"/>
        <text x="67" y="54" font-size="8" fill="${c.white}" text-anchor="middle">步驟 A：輸入 x</text>
        <line x1="67" y1="60" x2="67" y2="72" stroke="${c.forest}" stroke-width="1.5"/>
        <rect x="25" y="72" width="85" height="20" rx="3" fill="${c.green}"/>
        <text x="67" y="86" font-size="8" fill="${c.white}" text-anchor="middle">步驟 B：y ＝ x ＋ 1</text>
        <line x1="67" y1="92" x2="67" y2="104" stroke="${c.forest}" stroke-width="1.5"/>
        <rect x="25" y="104" width="85" height="20" rx="3" fill="${c.green}"/>
        <text x="67" y="117" font-size="8" fill="${c.white}" text-anchor="middle">步驟 C：印出 y</text>
      </g>
      <!-- 2. Selection -->
      <g transform="translate(190, 30)">
        <rect width="150" height="125" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="75" y="24" font-size="11.5" font-weight="800" fill="${c.gold}" text-anchor="middle">② 分支結構 (if-else)</text>
        <polygon points="75,40 120,55 75,70 30,55" fill="${c.gold}"/>
        <text x="75" y="58" font-size="8" font-weight="700" fill="${c.white}" text-anchor="middle">成績 ≥ 60？</text>
        <line x1="30" y1="55" x2="15" y2="55" stroke="${c.gold}" stroke-width="1.2"/>
        <line x1="15" y1="55" x2="15" y2="85" stroke="${c.gold}" stroke-width="1.2"/>
        <text x="20" y="75" font-size="7" fill="${c.red}">否</text>
        <line x1="120" y1="55" x2="135" y2="55" stroke="${c.gold}" stroke-width="1.2"/>
        <line x1="135" y1="55" x2="135" y2="85" stroke="${c.gold}" stroke-width="1.2"/>
        <text x="125" y="75" font-size="7" fill="${c.forest}">是</text>
        <rect x="8" y="85" width="55" height="22" rx="3" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1"/>
        <text x="35" y="99" font-size="7.5" fill="${c.red}" text-anchor="middle">待加強</text>
        <rect x="88" y="85" width="55" height="22" rx="3" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1"/>
        <text x="115" y="99" font-size="7.5" fill="${c.forest}" text-anchor="middle">通過及格</text>
      </g>
      <!-- 3. Loop -->
      <g transform="translate(360, 30)">
        <rect width="145" height="125" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="72" y="24" font-size="11.5" font-weight="800" fill="${c.blue}" text-anchor="middle">③ 迴圈結構 (Loop)</text>
        <rect x="25" y="42" width="95" height="22" rx="3" fill="${c.blue}"/>
        <text x="72" y="56" font-size="8" fill="${c.white}" text-anchor="middle">i ＝ 1; sum ＝ 0</text>
        <path d="M 120 53 Q 135 75 120 98" fill="none" stroke="${c.blue}" stroke-width="1.5"/>
        <polygon points="120,53 125,58 118,60" fill="${c.blue}"/>
        <rect x="25" y="88" width="95" height="22" rx="3" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.2"/>
        <text x="72" y="102" font-size="8" fill="${c.blue}" text-anchor="middle">sum＋＝i; i＋＝1</text>
        <text x="72" y="122" font-size="8" font-weight="700" fill="${c.red}" text-anchor="middle">防呆：需有終止條件!</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">重要思維：避免無窮迴圈（Infinite Loop）；陣列與清單提供大量資料的批次迭代處理</text>
    `)
  },
  'computing-3': {
    title: '資料編碼、網際網路協定與資安三要素',
    subtitle: '二進位、Client-Server 網路架構、HTTPS 加密與資安 CIA 鐵三角',
    caption: '電腦底層以 0 與 1 儲存文字與圖像；網路傳輸依賴 IP 與 DNS 尋址；資安防護嚴守機密、完整與可用性。',
    render: () => frame('網路架構與資訊安全', `
      <!-- Left: Client-Server DNS -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【網際網路溝通架構】</text>
        <rect x="20" y="45" width="60" height="28" rx="4" fill="${c.forest}"/>
        <text x="50" y="62" font-size="8.5" fill="${c.white}" text-anchor="middle">客戶端(瀏覽器)</text>
        <line x1="85" y1="59" x2="135" y2="59" stroke="${c.blue}" stroke-width="1.5"/>
        <polygon points="135,59 127,55 127,63" fill="${c.blue}"/>
        <text x="110" y="52" font-size="7.5" fill="${c.muted}">HTTP Request</text>
        <rect x="140" y="45" width="60" height="28" rx="4" fill="${c.blue}"/>
        <text x="170" y="62" font-size="8.5" fill="${c.white}" text-anchor="middle">伺服端(Server)</text>
        <line x1="135" y1="67" x2="85" y2="67" stroke="${c.green}" stroke-width="1.5"/>
        <polygon points="85,67 93,63 93,71" fill="${c.green}"/>
        <text x="110" y="78" font-size="7.5" fill="${c.green}">HTML Response</text>
        <text x="15" y="105" font-size="9" fill="${c.dark}">DNS：將網址轉譯為 IP 位址 (如 140.112.1.1)</text>
        <text x="15" y="122" font-size="9" fill="${c.dark}">HTTPS：SSL/TLS 加密傳輸，防封包竊聽</text>
      </g>
      <!-- Right: CIA Triad -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">【資訊安全 CIA 鐵三角】</text>
        <polygon points="107,45 45,120 170,120" fill="none" stroke="${c.red}" stroke-width="1.5"/>
        <text x="107" y="42" font-size="9" font-weight="800" fill="${c.red}" text-anchor="middle">機密性 (Confidentiality)</text>
        <text x="45" y="132" font-size="8.5" font-weight="700" fill="${c.blue}" text-anchor="middle">完整性 (Integrity)</text>
        <text x="170" y="132" font-size="8.5" font-weight="700" fill="${c.forest}" text-anchor="middle">可用性 (Availability)</text>
        <text x="107" y="75" font-size="8" fill="${c.muted}" text-anchor="middle">僅授權者可看</text>
        <text x="107" y="88" font-size="8" fill="${c.muted}" text-anchor="middle">資料未遭未授權竄改</text>
        <text x="107" y="101" font-size="8" fill="${c.muted}" text-anchor="middle">需要時系統能正常服務</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">個人資安守則：啟用雙重驗證 (2FA)、不點擊釣魚簡訊未知連結、定期備份重要資料</text>
    `)
  },
  'technology-1': {
    title: '工程設計流程迭代循環模型',
    subtitle: '定義問題 ➔ 收集資訊 ➔ 構想選案 ➔ 原型製作 ➔ 測試評估 ➔ 修正優化',
    caption: '科技來自對問題的解決。工程並非一次成功，而是透過不斷建立原型 (Prototype) 並測試迭代，逐步逼近最佳解。',
    render: () => frame('工程設計流程迭代模型', `
      <!-- 6 Steps Hexagon Cycle -->
      ${[
        ['01 定義問題', '確認需求與限制條件', c.red, c.lightRed, 50, 45],
        ['02 收集資訊', '調查現有案例與原理', c.gold, c.lightGold, 200, 45],
        ['03 構想選案', '多方案腦力激盪評估', c.blue, c.lightBlue, 350, 45],
        ['06 修正優化', '迭代改進至符合標準', c.purple, c.lightPurple, 50, 115],
        ['05 測試評估', '數據量測與可行性檢驗', c.forest, c.lightGreen, 200, 115],
        ['04 原型製作', '動手打造實體模型', c.green, c.lightGreen, 350, 115]
      ].map(([step, note, col, bg, x, y]) => `
        <g transform="translate(${x}, ${y})">
          <rect width="135" height="48" rx="7" fill="${bg}" stroke="${col}" stroke-width="1.5"/>
          <text x="67" y="20" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${step}</text>
          <text x="67" y="36" font-size="8" fill="${c.dark}" text-anchor="middle">${note}</text>
        </g>
      `).join('')}
      <!-- Connector arrows -->
      <path d="M 188 68 L 198 68" stroke="${c.forest}" stroke-width="2"/>
      <path d="M 338 68 L 348 68" stroke="${c.forest}" stroke-width="2"/>
      <path d="M 418 95 L 418 112" stroke="${c.forest}" stroke-width="2"/>
      <path d="M 348 138 L 338 138" stroke="${c.forest}" stroke-width="2"/>
      <path d="M 198 138 L 188 138" stroke="${c.forest}" stroke-width="2"/>
      <path d="M 118 112 L 118 95" stroke="${c.forest}" stroke-width="2"/>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">核心原則：安全第一、善用工具手工具規範、尊重智慧財產權與專利授權</text>
    `)
  },
  'technology-2': {
    title: '結構穩定性與機構運動轉換',
    subtitle: '三角形桁架結構抗變形、連桿機構、齒輪傳動比與材料力學',
    caption: '四邊形易受剪力歪斜，三角形三個邊長固定則形狀唯一確定（最穩定結構）。齒輪齒數比決定轉速與扭矩。',
    render: () => frame('結構力學與機械傳動', `
      <!-- Left: Triangle Truss -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【結構抗變形原理】</text>
        <!-- Unstable Quad -->
        <rect x="25" y="45" width="40" height="40" fill="none" stroke="${c.red}" stroke-width="1.5"/>
        <text x="45" y="100" font-size="8" fill="${c.red}" text-anchor="middle">四邊形：易形變</text>
        <!-- Stable Triangle Truss -->
        <polygon points="150,45 125,85 175,85" fill="none" stroke="${c.forest}" stroke-width="2"/>
        <line x1="150" y1="45" x2="150" y2="85" stroke="${c.forest}" stroke-width="1.5"/>
        <text x="150" y="100" font-size="8" font-weight="700" fill="${c.forest}" text-anchor="middle">三角形桁架：極穩定</text>
        <text x="107" y="122" font-size="8.5" fill="${c.dark}" text-anchor="middle">受力形態：拉力 (Tension)、壓力 (Compression)</text>
      </g>
      <!-- Right: Gears & Linkages -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【機構傳動與轉換】</text>
        <!-- Gear 1 small -->
        <circle cx="65" cy="65" r="22" fill="none" stroke="${c.blue}" stroke-width="2"/>
        <circle cx="65" cy="65" r="4" fill="${c.blue}"/>
        <text x="65" y="68" font-size="7" fill="${c.white}">10齒</text>
        <!-- Gear 2 big -->
        <circle cx="115" cy="65" r="33" fill="none" stroke="${c.forest}" stroke-width="2"/>
        <circle cx="115" cy="65" r="4" fill="${c.forest}"/>
        <text x="115" y="68" font-size="7" fill="${c.white}">20齒</text>
        <text x="165" y="68" font-size="8" font-weight="700" fill="${c.dark}">減速增扭</text>
        <text x="15" y="112" font-size="9" fill="${c.dark}"><tspan font-weight="700" fill="${c.blue}">齒數比：</tspan> 齒數加倍 ➔ 轉速減半、扭矩增倍</text>
        <text x="15" y="126" font-size="8.5" fill="${c.muted}">凸輪/曲柄：將旋轉運動轉換為往復直線運動</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">材料選用：木材質輕易加工；金屬強度高耐衝擊；壓克力塑膠耐候具透明性</text>
    `)
  },
  'technology-3': {
    title: '產品生命週期評估 (LCA) 與循環經濟',
    subtitle: '原料開採 ➔ 零件製造 ➔ 使用維護 ➔ 回收再生，落實綠色永續',
    caption: '從「搖籃到墳墓」轉向「搖籃到搖籃」。優良工程設計著重易拆解性、模組化維修與低碳材料。',
    render: () => frame('綠色製造與循環經濟', `
      <!-- Circular Diagram -->
      <g transform="translate(60, 40)">
        ${[
          ['01 綠色設計', '易拆解、模組化', c.forest, c.lightGreen, 0],
          ['02 低碳製造', '減廢與節能製程', c.blue, c.lightBlue, 110],
          ['03 共享與延壽', '定期維護翻新', c.gold, c.lightGold, 220],
          ['04 封閉回收', '材料再生資源化', c.purple, c.lightPurple, 330]
        ].map(([title, desc, col, bg, x]) => `
          <g transform="translate(${x}, 0)">
            <rect width="95" height="85" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
            <text x="47" y="28" font-size="10.5" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
            <line x1="12" y1="38" x2="83" y2="38" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
            <text x="47" y="58" font-size="8.5" fill="${c.dark}" text-anchor="middle">${desc.slice(0,4)}</text>
            <text x="47" y="72" font-size="8.5" fill="${c.dark}" text-anchor="middle">${desc.slice(4)}</text>
          </g>
          ${x < 330 ? `<path d="M ${x + 98} 42 L ${x + 108} 42" stroke="${c.forest}" stroke-width="2"/><polygon points="${x + 108},42 ${x + 103},38 ${x + 103},46" fill="${c.forest}"/>` : ''}
        `).join('')}
      </g>
      <!-- Bottom energy box -->
      <g transform="translate(60, 140)">
        <rect width="425" height="35" rx="6" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.2"/>
        <text x="212" y="22" font-size="9.5" font-weight="700" fill="${c.dark}" text-anchor="middle">再生能源整合：太陽能光電、離岸風電、儲能電池技術與智慧電網效率優化</text>
      </g>
      <text x="270" y="195" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">永續核心：減少原生物料消耗，延長產品生命，把垃圾轉化為下一輪生產的養分</text>
    `)
  },

  // === HEALTH & PE EXPANSION ===
  'health-1': {
    title: '身心全人健康模式與身體界線同理圈',
    subtitle: '生理、心理、社會三大健康面向與身體自主權同心圓',
    caption: '青春期第二性徵發展因人而異。身體界線需清楚溝通；任何親密互動皆須建立在自由、知情且可隨時撤回的同意之上。',
    render: () => frame('健康全人與身體界線', `
      <!-- Left: Triangle of Health -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【全人健康三大面向】</text>
        <polygon points="107,45 50,115 165,115" fill="none" stroke="${c.forest}" stroke-width="2"/>
        <text x="107" y="40" font-size="9.5" font-weight="800" fill="${c.forest}" text-anchor="middle">生理健康 (Physical)</text>
        <text x="45" y="128" font-size="9" font-weight="800" fill="${c.blue}" text-anchor="middle">心理調適</text>
        <text x="165" y="128" font-size="9" font-weight="800" fill="${c.gold}" text-anchor="middle">社會適應</text>
        <text x="107" y="85" font-size="8" fill="${c.muted}" text-anchor="middle">均衡動態平衡</text>
      </g>
      <!-- Right: Boundaries Rings -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【人際與身體界線同心圓】</text>
        <!-- Concentric circles -->
        <circle cx="107" cy="78" r="45" fill="none" stroke="${c.border}" stroke-width="1.5"/>
        <circle cx="107" cy="78" r="30" fill="none" stroke="${c.gold}" stroke-width="1.5"/>
        <circle cx="107" cy="78" r="16" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.5"/>
        <text x="107" y="81" font-size="8" font-weight="800" fill="${c.red}" text-anchor="middle">自我核心</text>
        <text x="107" y="58" font-size="7.5" font-weight="700" fill="${c.gold}" text-anchor="middle">熟識親友</text>
        <text x="107" y="42" font-size="7.5" fill="${c.muted}" text-anchor="middle">點頭之交/公眾</text>
        <text x="107" y="130" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">身體自主原則：清楚表達「不」，隨時可叫停</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">性平核心：打破性別刻板印象、尊重多元氣質、勇於求助並拒絕人際暴力與霸凌</text>
    `)
  },
  'health-2': {
    title: '「我的餐盤」黃金比例與食品營養標示',
    subtitle: '全穀雜糧、豆魚蛋肉、蔬菜、水果、乳品、堅果種子六大類均衡攝取',
    caption: '飲食注重多樣與適量。看食品標示需先辨別「每份含量」與「本包裝含幾份」，計算總糖量與反式脂肪。',
    render: () => frame('我的餐盤與營養標示', `
      <!-- MyPlate Circle -->
      <g transform="translate(50, 30)">
        <circle cx="95" cy="70" r="50" fill="${c.bg}" stroke="${c.forest}" stroke-width="2"/>
        <!-- Segments -->
        <path d="M 95 70 L 95 20 A 50 50 0 0 1 145 70 Z" fill="${c.lightGold}"/>
        <text x="115" y="52" font-size="7.5" font-weight="800" fill="${c.gold}">全穀雜糧</text>
        <path d="M 95 70 L 145 70 A 50 50 0 0 1 95 120 Z" fill="${c.lightRed}"/>
        <text x="115" y="95" font-size="7.5" font-weight="800" fill="${c.red}">豆魚蛋肉</text>
        <path d="M 95 70 L 95 120 A 50 50 0 0 1 45 70 Z" fill="${c.lightGreen}"/>
        <text x="65" y="95" font-size="7.5" font-weight="800" fill="${c.forest}">蔬菜類</text>
        <path d="M 95 70 L 45 70 A 50 50 0 0 1 95 20 Z" fill="${c.lightPurple}"/>
        <text x="65" y="52" font-size="7.5" font-weight="800" fill="${c.purple}">水果類</text>
        <!-- Milk cup -->
        <circle cx="155" cy="30" r="14" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.2"/>
        <text x="155" y="33" font-size="6.5" font-weight="800" fill="${c.blue}" text-anchor="middle">乳品一杯</text>
        <text x="95" y="132" font-size="9" font-weight="800" fill="${c.forest}" text-anchor="middle">菜比水果多一點 · 飯跟蔬菜一樣多</text>
      </g>
      <!-- Nutrition Facts Box -->
      <g transform="translate(265, 30)">
        <rect width="235" height="135" rx="8" fill="${c.white}" stroke="${c.border}" stroke-width="1.5"/>
        <text x="117" y="20" font-size="11" font-weight="800" fill="${c.dark}" text-anchor="middle">營養標示 (Nutrition Facts)</text>
        <line x1="15" y1="28" x2="220" y2="28" stroke="${c.dark}" stroke-width="2"/>
        <text x="18" y="44" font-size="8.5" fill="${c.dark}">每一份量 30 公克 · 本包裝含 4 份</text>
        <line x1="15" y1="50" x2="220" y2="50" stroke="${c.border}" stroke-width="1"/>
        <text x="18" y="65" font-size="8.5" fill="${c.dark}">熱量：150 大卡 <tspan fill="${c.red}">(整包含 600 大卡!)</tspan></text>
        <text x="18" y="82" font-size="8.5" fill="${c.dark}">蛋白質：3.0 公克 · 脂肪：6.0 公克</text>
        <text x="18" y="99" font-size="8.5" fill="${c.dark}">碳水化合物：21 公克 (糖：8.0 公克)</text>
        <text x="18" y="116" font-size="8.5" fill="${c.dark}">鈉：120 毫克 <tspan fill="${c.muted}">(多食無益，適量攝取)</tspan></text>
        <text x="18" y="130" font-size="7.5" font-weight="700" fill="${c.red}">★ 避坑：標示為「每份」，算總量必乘以包裝份數！</text>
      </g>
    `)
  },
  'health-3': {
    title: '傳染病防治傳播鏈與急救 CPR+AED 叫叫CD',
    subtitle: '病原體 ➔ 傳染途徑 ➔ 易感宿主；急救黃金 4 分鐘流程',
    caption: '阻斷傳染病可從「消滅病原、戴口罩勤洗手阻斷途徑、施打疫苗保護宿主」著手。心跳停止時立即啟動叫叫CD。',
    render: () => frame('傳染病傳播鏈與急救流程', `
      <!-- Left: Chain of Infection -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">【傳染病傳播三大要素】</text>
        <circle cx="45" cy="65" r="18" fill="${c.red}"/>
        <text x="45" y="68" font-size="7.5" font-weight="800" fill="${c.white}" text-anchor="middle">致病原</text>
        <line x1="68" y1="65" x2="90" y2="65" stroke="${c.forest}" stroke-width="2"/>
        <circle cx="107" cy="65" r="18" fill="${c.gold}"/>
        <text x="107" y="68" font-size="7.5" font-weight="800" fill="${c.white}" text-anchor="middle">傳染途徑</text>
        <line x1="130" y1="65" x2="152" y2="65" stroke="${c.forest}" stroke-width="2"/>
        <circle cx="170" cy="65" r="18" fill="${c.blue}"/>
        <text x="170" y="68" font-size="7.5" font-weight="800" fill="${c.white}" text-anchor="middle">易感宿主</text>
        <text x="107" y="105" font-size="8.5" font-weight="700" fill="${c.forest}" text-anchor="middle">防治關鍵：切斷任一環節即可阻斷疫情！</text>
        <text x="107" y="122" font-size="8" fill="${c.muted}" text-anchor="middle">洗手戴口罩阻斷途徑 · 疫苗提升宿主免疫力</text>
      </g>
      <!-- Right: CPR + AED (叫叫CD) -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【急救成人 CPR＋AED (叫叫CD)】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">① 叫：</tspan> 拍肩確認意識與呼吸</text>
        <text x="15" y="68" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">② 叫：</tspan> 求救撥打 119、指定人員取 AED</text>
        <text x="15" y="88" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">③ C (CPR)：</tspan> 兩乳連線中點，每分 100~120 下</text>
        <text x="25" y="104" font-size="8" fill="${c.muted}">深度至少 5 公分，胸回彈完全，不中斷</text>
        <text x="15" y="124" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">④ D (AED)：</tspan> 開電貼片聽語音指示電擊</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">心理求助管道：遇到情緒困境可撥打衛福部安心專線 1925、生命線 1995，或向學校輔導室求助</text>
    `)
  },
  'pe-1': {
    title: '運動處方 FITT 原則與目標心率區間',
    subtitle: '頻率 (F)、強度 (I)、時間 (T)、型態 (T) 與有氧目標心率',
    caption: '有效體適能訓練遵循 FITT 原則。最大心率估算為 220 減年齡；有氧燃脂與心肺強化區間約為最大心率之 60%~80%。',
    render: () => frame('運動處方與心率區間', `
      <!-- Left: FITT Formula -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【運動處方 FITT 原則】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">F (Frequency)：</tspan> 頻率（每週 3~5 次）</text>
        <text x="15" y="68" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">I (Intensity)：</tspan> 強度（心率/自覺量表 RPE）</text>
        <text x="15" y="88" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">T (Time)：</tspan> 時間（每次 20~60 分鐘）</text>
        <text x="15" y="108" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">T (Type)：</tspan> 型態（跑步/游泳/球類/重訓）</text>
        <text x="15" y="126" font-size="8.5" fill="${c.muted}">三階段：暖身 ➔ 主運動 ➔ 伸展收操</text>
      </g>
      <!-- Right: Target Heart Rate -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">【目標心率 (Target HR) 階梯】</text>
        <!-- Heart Rate Bar -->
        <rect x="25" y="42" width="165" height="20" rx="3" fill="${c.lightGreen}"/>
        <text x="107" y="56" font-size="8" font-weight="700" fill="${c.forest}" text-anchor="middle">熱身放鬆區間：50% ~ 60%</text>
        <rect x="25" y="68" width="165" height="24" rx="3" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="107" y="83" font-size="8.5" font-weight="800" fill="${c.gold}" text-anchor="middle">★ 有氧心肺訓練：60% ~ 80%</text>
        <rect x="25" y="98" width="165" height="20" rx="3" fill="${c.lightRed}"/>
        <text x="107" y="112" font-size="8" font-weight="700" fill="${c.red}" text-anchor="middle">無氧極限衝刺：80% ~ 90%+</text>
        <text x="107" y="132" font-size="8" fill="${c.muted}" text-anchor="middle">最大心率估算 ＝ 220 − 年齡</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">自我監控：運動中能說話但無法唱歌為中等強度；出現頭暈胸悶應立即減速休息</text>
    `)
  },
  'pe-2': {
    title: '球類戰術空間轉換與攻防決策模型',
    subtitle: '進攻拉開空間與傳切走位 vs 防守縮小空間與輪轉補位',
    caption: '球類比賽本質是「空間與時間的爭奪」。進攻需製造人數優勢 (Overload)，防守講求對球施壓、保護內線。',
    render: () => frame('球類攻防空間戰術', `
      <!-- Court representation -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【進攻戰術原則 (Offense)】</text>
        <text x="15" y="50" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">① 拉開空間 (Spacing)：</tspan> 保持隊友距離</text>
        <text x="15" y="70" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">② 傳切配合 (Give and Go)：</tspan> 傳球後空切</text>
        <text x="15" y="90" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">③ 掩護檔拆 (Pick and Roll)：</tspan> 製造防守錯位</text>
        <text x="15" y="110" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">④ 多打少 (2 on 1)：</tspan> 快速推進抓時間差</text>
        <text x="15" y="126" font-size="8.5" fill="${c.muted}">核心：球動人動，尋求最高命中率出手機會</text>
      </g>
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.red}" text-anchor="middle">【防守戰術原則 (Defense)】</text>
        <text x="15" y="50" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">① 人球兼顧：</tspan> 站位在進攻者與球門/籃框間</text>
        <text x="15" y="70" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">② 施壓延阻 (Delay)：</tspan> 迫使持球者停球或失誤</text>
        <text x="15" y="90" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">③ 弱側協防 (Help & Recover)：</tspan> 輪轉補位保護禁區</text>
        <text x="15" y="110" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">④ 籃板卡位 (Box out)：</tspan> 奪回球權發動快攻</text>
        <text x="15" y="126" font-size="8.5" fill="${c.muted}">核心：溝通呼應、腳步先於手部，減少非必要犯規</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">團隊精神：信任隊友、跑出空檔、勝不驕敗不餒，展現兼具智慧與默契的競技風範</text>
    `)
  },
  'pe-3': {
    title: '健康體適能四大要素與公平競賽精神',
    subtitle: '心肺耐力、肌力與肌耐力、柔軟度、身體組成與運動員精神',
    caption: '體適能評量包括 800/1600m 跑走、仰臥起坐、坐姿體前彎與 BMI。公平競賽要求尊重對手、服從裁判判決。',
    render: () => frame('健康體適能與運動精神', `
      ${[
        ['心肺耐力', '800/1600m 跑走', '心肺攝氧能力，降低慢性病風險', c.blue, c.lightBlue, 35],
        ['肌力與肌耐力', '仰臥捲腹/伏地挺身', '維持軀幹核心穩定與日常搬重支撐', c.forest, c.lightGreen, 155],
        ['柔軟度', '坐姿體前彎', '關節活動範圍，預防拉傷與下背痛', c.gold, c.lightGold, 275],
        ['身體組成', 'BMI 與體脂肪率', '骨骼肌量與脂肪比例，評估代謝健康', c.purple, c.lightPurple, 395]
      ].map(([item, test, benefit, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="105" height="115" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="52" y="22" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${item}</text>
          <line x1="12" y1="32" x2="93" y2="32" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="52" y="50" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${test.slice(0,6)}</text>
          <text x="52" y="64" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${test.slice(6)}</text>
          <foreignObject x="8" y="70" width="89" height="42">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:7.5px;color:#687b74;line-height:1.2;margin:0;text-align:center;">${benefit}</p>
          </foreignObject>
        </g>
      `).join('')}
      <text x="270" y="185" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">運動品格：公平競爭 (Fair Play)、敬重對手、守護運動安全、將堅持毅力化為生活態度</text>
    `)
  },

  // === INTEGRATIVE (HOME, SCOUT, GUIDANCE) EXPANSION ===
  'home-1': {
    title: '時間管理艾森豪矩陣與家庭分工合作',
    subtitle: '重要性與緊急性四象限生活管理；跨性別家庭事務協商契約',
    caption: '主動投資「重要但不緊急」（第二象限：學習、健康、家人溝通），減少焦慮救火。家務依能力公平協商分擔。',
    render: () => frame('時間管理與家庭分工', `
      <!-- Eisenhower Matrix 2x2 -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.white}" stroke="${c.border}" stroke-width="1.5"/>
        <line x1="40" y1="95" x2="255" y2="95" stroke="${c.border}" stroke-width="1"/>
        <line x1="147" y1="30" x2="147" y2="165" stroke="${c.border}" stroke-width="1"/>
        <!-- Q1 -->
        <rect x="42" y="32" width="103" height="61" fill="${c.lightRed}"/>
        <text x="93" y="50" font-size="8.5" font-weight="800" fill="${c.red}" text-anchor="middle">第Ⅰ象限 · 緊急且重要</text>
        <text x="93" y="68" font-size="7.5" fill="${c.dark}" text-anchor="middle">危機/明天段考 (立即做)</text>
        <!-- Q2 -->
        <rect x="149" y="32" width="104" height="61" fill="${c.lightGreen}"/>
        <text x="201" y="50" font-size="8.5" font-weight="800" fill="${c.forest}" text-anchor="middle">★ 第Ⅱ象限 · 重要不緊急</text>
        <text x="201" y="68" font-size="7.5" fill="${c.forest}" text-anchor="middle">自學計畫/運動 (專注做)</text>
        <!-- Q3 -->
        <rect x="42" y="97" width="103" height="66" fill="${c.lightGold}"/>
        <text x="93" y="115" font-size="8.5" font-weight="800" fill="${c.gold}" text-anchor="middle">第Ⅲ象限 · 緊急不重要</text>
        <text x="93" y="133" font-size="7.5" fill="${c.dark}" text-anchor="middle">臨時干擾/電話 (委託拒絕)</text>
        <!-- Q4 -->
        <rect x="149" y="97" width="104" height="66" fill="${c.bg}"/>
        <text x="201" y="115" font-size="8.5" font-weight="800" fill="${c.muted}" text-anchor="middle">第Ⅳ象限 · 不緊急不重要</text>
        <text x="201" y="133" font-size="7.5" fill="${c.muted}" text-anchor="middle">無意識滑手機 (刪除節制)</text>
      </g>
      <!-- Family partnership -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【家庭夥伴關係與分工】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">打破性別分工刻板：</tspan> 家事是全家人的事</text>
        <text x="15" y="70" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">能力與時間盤點：</tspan> 依課業作息彈性輪替</text>
        <text x="15" y="92" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">家庭會議協商：</tspan> 建立規則與感謝機制</text>
        <text x="15" y="114" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.purple}">情緒支持同理：</tspan> 傾聽家人疲憊，適時支援</text>
        <text x="15" y="130" font-size="8" fill="${c.muted}">良好空間整理（5S整理整頓）能大幅降低家庭衝突</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">生活智慧：自主管理不是機械化填滿行程，而是有意識地保留給自己與家人優質的喘息對話時間</text>
    `)
  },
  'home-2': {
    title: '食品安全五要與衣物洗滌標籤解碼',
    subtitle: '洗手生熟分開、澈底加熱、安全溫度；水洗、漂白、烘乾、熨燙圖示',
    caption: '食材生熟分開避免交叉污染，熟食中心溫度達 70°C 以上；衣物照護看懂國際洗標，延長衣物使用壽命。',
    render: () => frame('食安五要與國際洗標', `
      <!-- Left: 5 Food Safety Keys -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【食品安全五大要訣 (WHO)】</text>
        <text x="15" y="46" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">① 要洗手：</tspan> 備餐前、如廁後肥皂洗淨</text>
        <text x="15" y="64" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">② 要新鮮：</tspan> 食材乾淨無腐壞，用安全水</text>
        <text x="15" y="82" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">③ 生熟分開：</tspan> 刀具砧板專用，防交叉污染</text>
        <text x="15" y="100" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">④ 澈底加熱：</tspan> 中心溫度需超過 70°C</text>
        <text x="15" y="118" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.purple}">⑤ 安全溫度：</tspan> 避開 7~60°C 危險溫度帶 (冷藏<7°C)</text>
      </g>
      <!-- Right: Laundry Symbols -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【國際衣物洗滌標籤辨識】</text>
        <!-- 4 symbols -->
        <g transform="translate(15, 38)">
          <!-- Wash Tub -->
          <rect x="0" y="0" width="40" height="30" rx="3" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.2"/>
          <text x="20" y="18" font-size="9" font-weight="800" fill="${c.blue}" text-anchor="middle">水洗</text>
          <text x="20" y="40" font-size="7.5" fill="${c.dark}" text-anchor="middle">洗衣盆(水溫)</text>
          <!-- Triangle Bleach -->
          <polygon points="75,0 95,30 55,30" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1.2"/>
          <text x="75" y="22" font-size="8" font-weight="800" fill="${c.forest}" text-anchor="middle">漂白</text>
          <text x="75" y="40" font-size="7.5" fill="${c.dark}" text-anchor="middle">三角形(氯/氧)</text>
          <!-- Square Tumble -->
          <rect x="110" y="0" width="30" height="30" rx="2" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.2"/>
          <circle cx="125" cy="15" r="10" fill="none" stroke="${c.gold}"/>
          <text x="125" y="40" font-size="7.5" fill="${c.dark}" text-anchor="middle">翻滾烘乾</text>
          <!-- Iron -->
          <rect x="155" y="0" width="30" height="30" rx="2" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.2"/>
          <text x="170" y="18" font-size="9" font-weight="800" fill="${c.red}" text-anchor="middle">熨燙</text>
          <text x="170" y="40" font-size="7.5" fill="${c.dark}" text-anchor="middle">熨斗(點代表溫度)</text>
        </g>
        <text x="107" y="125" font-size="8.5" font-weight="700" fill="${c.red}" text-anchor="middle">★ 打「X」符號代表禁止（如禁漂白、禁烘乾）</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">環保生活：自備環保袋餐具、減少外送免洗餐具、善用天然小蘇打與檸檬酸清潔</text>
    `)
  },
  'home-3': {
    title: '理性消費「需要 vs 想要」與家庭儲蓄模型',
    subtitle: '消費者權益保護、機會成本、預算編列與「收入 − 儲蓄 ＝ 支出」',
    caption: '消費前冷靜思考是需要還是想要。掌握正確理財公式：先扣除固定儲蓄再花費，避免淪為衝動消費的月光族。',
    render: () => frame('理性消費與預算規劃', `
      <!-- Left: Needs vs Wants -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【需要 (Needs) vs 想要 (Wants)】</text>
        <text x="15" y="50" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">需要 (Needs)：</tspan> 維持生存與基本生活所需</text>
        <text x="25" y="66" font-size="8.5" fill="${c.muted}">例：三餐營養、教科書、健保、基本衣物</text>
        <text x="15" y="88" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">想要 (Wants)：</tspan> 滿足欲望、追求享受娛樂</text>
        <text x="25" y="104" font-size="8.5" fill="${c.muted}">例：最新旗艦手機、限量球鞋、手搖飲</text>
        <text x="15" y="124" font-size="8.5" font-weight="700" fill="${c.red}">★ 決策延遲法則：衝動想要時，先等 48 小時再決定</text>
      </g>
      <!-- Right: Budget Equation -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【致富儲蓄黃金公式】</text>
        <!-- Formula boxes -->
        <rect x="20" y="42" width="175" height="30" rx="6" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.2"/>
        <text x="107" y="60" font-size="9.5" font-weight="700" fill="${c.red}" text-anchor="middle">一般人：收入 − 支出 ＝ 儲蓄 (很難存到錢!)</text>
        <rect x="20" y="80" width="175" height="35" rx="6" fill="${c.forest}"/>
        <text x="107" y="102" font-size="10.5" font-weight="800" fill="${c.white}" text-anchor="middle">聰明人：收入 − 儲蓄 ＝ 支出 (先存再花!)</text>
        <text x="107" y="130" font-size="8.5" fill="${c.dark}" text-anchor="middle">消費者保護：7天鑑賞期（網購特種買賣適用）</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">綠色消費：優先選購碳足跡標籤、節能標章、環保標章商品，用消費選擇改變世界</text>
    `)
  },
  'scout-1': {
    title: '戶外活動準備、小隊制度與三大實用繩結',
    subtitle: '雙套結（固定營柱）、平結（接等粗繩）、稱人結（救生結王）',
    caption: '童軍落實小隊制度（分工合作）與徽章制度。掌握登山三層穿搭法則（排汗、保暖、防風雨）確保安全。',
    render: () => frame('戶外準備與實用繩結', `
      <!-- Left: 3-Layer Clothing -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【戶外登山三層穿搭法】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">① 內層 (排汗)：</tspan> 快乾化纖/羊毛，嚴禁純棉!</text>
        <text x="15" y="70" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">② 中層 (保暖)：</tspan> 抓絨 (Fleece) 或輕量羽絨</text>
        <text x="15" y="92" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">③ 外層 (防護)：</tspan> 防水防風透氣雨衣 (Gore-Tex)</text>
        <line x1="15" y1="102" x2="200" y2="102" stroke="${c.blue}" stroke-width="0.8" stroke-dasharray="2,2"/>
        <text x="15" y="118" font-size="8.5" fill="${c.red}">失溫防制：棉質衣物吸汗不乾為山難頭號殺手!</text>
      </g>
      <!-- Right: Knots -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【童軍三大實用必備繩結】</text>
        <text x="15" y="48" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">① 平結 (Reef Knot)：</tspan> 連接兩條等粗繩子</text>
        <text x="25" y="64" font-size="8" fill="${c.muted}">口訣：左壓右、右壓左，平整易解</text>
        <text x="15" y="82" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">② 雙套結 (Clove Hitch)：</tspan> 綁營柱工程繩頭結</text>
        <text x="25" y="98" font-size="8" fill="${c.muted}">受力越緊越不易鬆脫，工程紮結起點</text>
        <text x="15" y="116" font-size="9.5" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">③ 稱人結 (Bowline)：</tspan> 救生繩圈王</text>
        <text x="25" y="130" font-size="8" fill="${c.muted}">結圈大小固定不收縮，抗拉力強</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">童軍銘言：準備 (Be Prepared)、日行一善、人生以服務為目的；落實隊長帶領與團隊協作</text>
    `)
  },
  'scout-2': {
    title: '指北針方位角判定與等高線地圖判讀',
    subtitle: '360 度方位角、磁北 vs 正北、等高線疏密與山脊山谷辨別',
    caption: '定向越野核心在於「地圖方位校準 (Orientation)」。等高線愈密代表坡度愈陡；等高線凸向低處為山脊，凸向高處為山谷。',
    render: () => frame('定向指北針與地圖判讀', `
      <!-- Left: Compass -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【席爾瓦 (Silva) 指北針定位】</text>
        <!-- Compass dial -->
        <circle cx="107" cy="72" r="35" fill="${c.white}" stroke="${c.forest}" stroke-width="1.8"/>
        <line x1="107" y1="40" x2="107" y2="104" stroke="${c.border}" stroke-width="1"/>
        <line x1="75" y1="72" x2="139" y2="72" stroke="${c.border}" stroke-width="1"/>
        <text x="107" y="48" font-size="8" font-weight="800" fill="${c.red}" text-anchor="middle">N (0°/360°)</text>
        <text x="107" y="100" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">S (180°)</text>
        <text x="135" y="75" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="end">E (90°)</text>
        <text x="80" y="75" font-size="8" font-weight="700" fill="${c.dark}">W (270°)</text>
        <!-- Magnetic needle -->
        <polygon points="107,72 103,50 111,50" fill="${c.red}"/>
        <polygon points="107,72 103,94 111,94" fill="${c.dark}"/>
        <text x="107" y="126" font-size="8" fill="${c.forest}" text-anchor="middle">紅針入紅屋 (Red in the bed) ➔ 定位方向</text>
      </g>
      <!-- Right: Contour Lines -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【等高線地形圖判讀法則】</text>
        <!-- Ridge vs Valley lines -->
        <path d="M 30 55 Q 65 35 100 55" fill="none" stroke="${c.forest}" stroke-width="1.5"/>
        <path d="M 30 70 Q 65 50 100 70" fill="none" stroke="${c.forest}" stroke-width="1.5"/>
        <text x="65" y="65" font-size="8" font-weight="800" fill="${c.forest}" text-anchor="middle">山脊：凸向低處</text>
        <path d="M 120 50 Q 155 70 190 50" fill="none" stroke="${c.blue}" stroke-width="1.5"/>
        <path d="M 120 65 Q 155 85 190 65" fill="none" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="155" y="65" font-size="8" font-weight="800" fill="${c.blue}" text-anchor="middle">山谷：凸向高處 (常有河流)</text>
        <line x1="20" y1="95" x2="195" y2="95" stroke="${c.gold}" stroke-width="0.8" stroke-dasharray="2,2"/>
        <text x="20" y="112" font-size="9" fill="${c.dark}">等高線密集 ➔ 坡度陡峭（需避開落石懸崖）</text>
        <text x="20" y="128" font-size="9" fill="${c.dark}">等高線稀疏 ➔ 坡度平緩（適宜紮營行走）</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">野外自救：迷途時切記「留在原地 (STOP原則)、往高處吹哨求援、切勿盲目下切未知溪谷」</text>
    `)
  },
  'scout-3': {
    title: '無痕山林 (LNT) 七大準則與服務學習反思',
    subtitle: 'Leave No Trace 友善環境倫理與社區行動「計畫・執行・反思」',
    caption: '走入山林不留痕跡。服務學習結合真實社會需求，透過結構化反思 (Reflection)，將經驗沉澱為公民責任感。',
    render: () => frame('無痕山林與服務學習', `
      <!-- LNT 7 Principles mini cards -->
      <g transform="translate(40, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="22" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【無痕山林 LNT 七大準則】</text>
        <text x="15" y="42" font-size="8.5" fill="${c.dark}">① 事前充分規劃與準備 (Plan Ahead)</text>
        <text x="15" y="58" font-size="8.5" fill="${c.dark}">② 在耐受地點紮營行走 (Travel on Surfaces)</text>
        <text x="15" y="74" font-size="8.5" fill="${c.dark}">③ 妥善處理垃圾排遺 (Pack It Out)</text>
        <text x="15" y="90" font-size="8.5" fill="${c.dark}">④ 保持環境原有風貌 (Leave What You Find)</text>
        <text x="15" y="106" font-size="8.5" fill="${c.dark}">⑤ 減低營火對環境衝擊 (Minimize Campfire)</text>
        <text x="15" y="122" font-size="8.5" fill="${c.dark}">⑥ 尊重野生動植物 · ⑦ 考量其他使用者</text>
      </g>
      <!-- Service Learning Cycle -->
      <g transform="translate(285, 30)">
        <rect width="215" height="135" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="24" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【服務學習反思四階循環】</text>
        <!-- 4 Steps -->
        <rect x="20" y="42" width="80" height="35" rx="5" fill="${c.forest}"/>
        <text x="60" y="58" font-size="8.5" font-weight="800" fill="${c.white}" text-anchor="middle">1. 準備 (Plan)</text>
        <text x="60" y="70" font-size="7" fill="${c.white}" text-anchor="middle">調查社區真需求</text>
        <rect x="115" y="42" width="80" height="35" rx="5" fill="${c.blue}"/>
        <text x="155" y="58" font-size="8.5" font-weight="800" fill="${c.white}" text-anchor="middle">2. 服務 (Action)</text>
        <text x="155" y="70" font-size="7" fill="${c.white}" text-anchor="middle">落實行動與陪伴</text>
        <rect x="20" y="88" width="80" height="35" rx="5" fill="${c.gold}"/>
        <text x="60" y="104" font-size="8.5" font-weight="800" fill="${c.white}" text-anchor="middle">4. 慶賀 (Celebrate)</text>
        <text x="60" y="116" font-size="7" fill="${c.white}" text-anchor="middle">肯定成果與推廣</text>
        <rect x="115" y="88" width="80" height="35" rx="5" fill="${c.purple}"/>
        <text x="155" y="104" font-size="8.5" font-weight="800" fill="${c.white}" text-anchor="middle">3. 反思 (Reflect)</text>
        <text x="155" y="116" font-size="7" fill="${c.white}" text-anchor="middle">What? So What?</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">核心體會：只留下足跡、只帶走照片，在付出中看見他人的尊嚴與自己的潛能</text>
    `)
  },
  'guidance-1': {
    title: '薩提爾情緒冰山理論與非暴力溝通',
    subtitle: '水面上行為與事件 ➔ 水面下感受、感受的感受、觀點、期待、渴望與真我',
    caption: '行為只是冰山一角。當我們看懂情緒背後未被滿足的心理渴望，運用非暴力溝通四步驟即可化解人際衝突。',
    render: () => frame('薩提爾冰山與非暴力溝通', `
      <!-- Left: Iceberg -->
      <g transform="translate(40, 25)">
        <rect width="215" height="145" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.6"/>
        <text x="107" y="20" font-size="12" font-weight="800" fill="${c.blue}" text-anchor="middle">【薩提爾 (Satir) 情緒冰山】</text>
        <!-- Water line -->
        <line x1="20" y1="48" x2="195" y2="48" stroke="${c.blue}" stroke-width="2" stroke-dasharray="3,3"/>
        <text x="190" y="44" font-size="7" fill="${c.blue}" text-anchor="end">水平面 (外顯)</text>
        <!-- Above water -->
        <polygon points="107,26 80,48 134,48" fill="${c.white}" stroke="${c.blue}" stroke-width="1.2"/>
        <text x="107" y="42" font-size="8" font-weight="800" fill="${c.red}" text-anchor="middle">外在行為／事件</text>
        <!-- Underwater layers -->
        <text x="107" y="65" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">① 感受 (Feelings：憤怒/害怕)</text>
        <text x="107" y="80" font-size="8" fill="${c.dark}" text-anchor="middle">② 觀點 (Perceptions：信念評判)</text>
        <text x="107" y="95" font-size="8" fill="${c.dark}" text-anchor="middle">③ 期待 (Expectations：對己/對他)</text>
        <text x="107" y="110" font-size="8" font-weight="700" fill="${c.forest}" text-anchor="middle">④ 渴望 (Yearnings：愛/接納/安全感)</text>
        <text x="107" y="130" font-size="8.5" font-weight="800" fill="${c.purple}" text-anchor="middle">★ 真我 (Self: 我是值得被愛的)</text>
      </g>
      <!-- Right: NVC 4 Steps -->
      <g transform="translate(285, 25)">
        <rect width="215" height="145" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.6"/>
        <text x="107" y="20" font-size="12" font-weight="800" fill="${c.forest}" text-anchor="middle">【非暴力溝通 (NVC) 四部曲】</text>
        <text x="15" y="45" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">1. 觀察 (Observation)：</tspan> 客觀陳述事實，不評判</text>
        <text x="25" y="60" font-size="7.5" fill="${c.muted}">「這週我們約好三次你遲到了兩次」</text>
        <text x="15" y="78" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">2. 感受 (Feeling)：</tspan> 表達自己的真實情緒</text>
        <text x="25" y="93" font-size="7.5" fill="${c.muted}">「我感到有些焦慮和不被重視」</text>
        <text x="15" y="111" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.gold}">3. 需要 (Need)：</tspan> 釐清背後核心價值渴望</text>
        <text x="25" y="126" font-size="7.5" fill="${c.muted}">「因為我很看重彼此的約定與信任」</text>
        <text x="15" y="140" font-size="8.5" font-weight="800" fill="${c.forest}">4. 請求 (Request)：提出具體、正向、可執行的請求</text>
      </g>
      <text x="270" y="195" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">情緒對策：先處理心情，再處理事情。情緒沒有對錯，所有感受都值得被溫柔抱持</text>
    `)
  },
  'guidance-2': {
    title: '自主學習黃金三角：番茄鐘・康奈爾・費曼法',
    subtitle: '時間分割專注 ➔ 筆記結構化整理 ➔ 白話輸出主動回想檢驗',
    caption: '高效自學不靠熬夜爆肝，靠科學心智工具組合。結合提取練習 (Active Recall) 與間隔複習，鞏固永久長期記憶。',
    render: () => frame('自主學習黃金工具箱', `
      ${[
        ['番茄工作法', '25 分鐘專注 ＋ 5 分鐘休息', '短衝刺戰勝拖延症；每四個番茄鐘大休息 15~30 分鐘', c.red, c.lightRed, 35],
        ['康奈爾筆記法', '筆記欄 ＋ 提示欄 ＋ 總結欄', '上課記右側重點；課後左側提煉線索題眼；底端寫 3 行總結', c.blue, c.lightBlue, 195],
        ['費曼學習法', '假想教導一個國小學弟妹', '用大白話解釋觀念；一旦卡住回頭翻講義，直至完全暢通', c.forest, c.lightGreen, 355]
      ].map(([tool, rule, desc, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="145" height="120" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="72" y="24" font-size="12" font-weight="800" fill="${col}" text-anchor="middle">${tool}</text>
          <line x1="15" y1="34" x2="130" y2="34" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="72" y="52" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">${rule.slice(0,10)}</text>
          <text x="72" y="66" font-size="9" font-weight="700" fill="${c.dark}" text-anchor="middle">${rule.slice(10)}</text>
          <foreignObject x="10" y="72" width="125" height="46">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:7.8px;color:#687b74;line-height:1.25;margin:0;text-align:center;">${desc}</p>
          </foreignObject>
        </g>
      `).join('')}
      <text x="270" y="188" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">後設認知核心：監控自己的學習狀態 —— 誠實辨析「自己是真的懂了，還是只是覺得眼熟而已」</text>
    `)
  },
  'guidance-3': {
    title: '何倫碼 (Holland) 職業興趣六角形與生涯抉擇',
    subtitle: 'RIASEC 六大型態：實用型、研究型、藝術型、社會型、企業型、事務型',
    caption: '生涯探索結合興趣、能力與價值觀。六角形相鄰代碼共通性高，對角線差異大；生涯是持續試驗、修正的動態航行。',
    render: () => frame('何倫碼與生涯決策', `
      <!-- RIASEC Hexagon -->
      <g transform="translate(70, 25)">
        <!-- Hexagon lines -->
        ${[0, 1, 2, 3, 4, 5].map(i => {
          const a1 = i * Math.PI / 3 - Math.PI / 6;
          const a2 = (i + 1) * Math.PI / 3 - Math.PI / 6;
          return `<line x1="${(100 + 55 * Math.cos(a1)).toFixed(1)}" y1="${(75 + 55 * Math.sin(a1)).toFixed(1)}" x2="${(100 + 55 * Math.cos(a2)).toFixed(1)}" y2="${(75 + 55 * Math.sin(a2)).toFixed(1)}" stroke="${c.forest}" stroke-width="1.8"/>`;
        }).join('')}
        <!-- Nodes -->
        <circle cx="100" cy="20" r="14" fill="${c.lightRed}" stroke="${c.red}" stroke-width="1.5"/>
        <text x="100" y="24" font-size="9" font-weight="800" fill="${c.red}" text-anchor="middle">R 實用</text>
        <circle cx="147" cy="47" r="14" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.5"/>
        <text x="147" y="51" font-size="9" font-weight="800" fill="${c.blue}" text-anchor="middle">I 研究</text>
        <circle cx="147" cy="102" r="14" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="1.5"/>
        <text x="147" y="106" font-size="9" font-weight="800" fill="${c.purple}" text-anchor="middle">A 藝術</text>
        <circle cx="100" cy="130" r="14" fill="${c.lightGreen}" stroke="${c.forest}" stroke-width="1.5"/>
        <text x="100" y="134" font-size="9" font-weight="800" fill="${c.forest}" text-anchor="middle">S 社會</text>
        <circle cx="53" cy="102" r="14" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="53" y="106" font-size="9" font-weight="800" fill="${c.gold}" text-anchor="middle">E 企業</text>
        <circle cx="53" cy="47" r="14" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="53" y="51" font-size="9" font-weight="800" fill="${c.green}" text-anchor="middle">C 事務</text>
      </g>
      <!-- Right: Decision Process -->
      <g transform="translate(285, 25)">
        <rect width="215" height="145" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.6"/>
        <text x="107" y="22" font-size="12" font-weight="800" fill="${c.gold}" text-anchor="middle">【生涯決策四步漏斗模型】</text>
        <text x="15" y="45" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.forest}">1. 了解自我：</tspan> 探索興趣、優勢性向、價值觀</text>
        <text x="15" y="65" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.blue}">2. 探索世界：</tspan> 認識高中/高職/五專學制群科</text>
        <text x="15" y="85" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.red}">3. 綜合評估：</tspan> SWOT 分析優劣勢與未來機會</text>
        <text x="15" y="105" font-size="9" fill="${c.dark}"><tspan font-weight="800" fill="${c.purple}">4. 擬定行動：</tspan> 設定短中長期目標並持續試探</text>
        <text x="15" y="128" font-size="8" fill="${c.muted}">舒伯 (Super) 生涯彩虹：生涯包含子女、學生、工作者多重角色平衡</text>
      </g>
      <text x="270" y="195" font-size="10" font-weight="700" fill="${c.forest}" text-anchor="middle">生涯啟發：沒有最好的科系，只有最適合自己的路。保持彈性心態，每一段經歷都是養分</text>
    `)
  },

  // === LOCAL LANGUAGES EXPANSION ===
  'local-1': {
    title: '臺灣本土語文多樣性與語言文化光譜',
    subtitle: '臺灣台語、臺灣客語、臺灣原住民族語、馬祖語與臺灣手語',
    caption: '本土語文是臺灣多元族群珍貴的文化資產。學習本土語言不僅是學會溝通，更是理解土地與歷史的鑰匙。',
    render: () => frame('臺灣本土語文光譜', `
      ${[
        ['臺灣台語', '七聲八調 · 泉漳融合', '豐富台羅拼音、文白異讀美學', c.forest, c.lightGreen, 35],
        ['臺灣客語', '四縣/海陸/大埔/饒平/詔安', '五大腔調，音韻典雅硬頸文化', c.gold, c.lightGold, 155],
        ['臺灣原住民族語', '南島語系發源瑰寶', '16族多樣語言，神話泛靈生態智慧', c.blue, c.lightBlue, 275],
        ['臺灣手語 & 馬祖語', '視覺語言與閩東瑰寶', '自然手語手形方位語法；馬祖閩東話', c.purple, c.lightPurple, 395]
      ].map(([lang, feat, desc, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="105" height="115" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="52" y="22" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${lang.slice(0,4)}</text>
          <text x="52" y="36" font-size="10" font-weight="800" fill="${col}" text-anchor="middle">${lang.slice(4)}</text>
          <line x1="12" y1="44" x2="93" y2="44" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="52" y="60" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${feat.slice(0,6)}</text>
          <text x="52" y="74" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${feat.slice(6)}</text>
          <foreignObject x="8" y="80" width="89" height="36">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:7.5px;color:#687b74;line-height:1.2;margin:0;text-align:center;">${desc}</p>
          </foreignObject>
        </g>
      `).join('')}
      <text x="270" y="185" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">語言人權：不以單一強勢語言為優劣標準，尊重每一個孩子使用母語發聲的權利</text>
    `)
  },
  'local-2': {
    title: '在地生活情境語用與文化對話體驗',
    subtitle: '日常問候、節慶習俗諺語、傳統小吃與在地生命智慧',
    caption: '母語生活化是語言傳承的活水源頭。從市場買菜、家族圍爐問候中體會俚語中蘊含的處世哲學與人情味。',
    render: () => frame('母語生活情境對話', `
      <!-- Speech bubbles -->
      <g transform="translate(50, 35)">
        <rect width="200" height="60" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="1.5"/>
        <text x="20" y="25" font-size="11" font-weight="800" fill="${c.forest}">情境一 · 市場買菜人情味</text>
        <text x="20" y="45" font-size="9" fill="${c.dark}">「老闆，這菜有青無？算俗一點啦！」</text>
        <path d="M 60 95 L 75 110 L 90 95" fill="${c.lightGreen}" stroke="${c.green}"/>
      </g>
      <g transform="translate(290, 35)">
        <rect width="200" height="60" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="1.5"/>
        <text x="20" y="25" font-size="11" font-weight="800" fill="${c.gold}">情境二 · 俗諺智慧長輩傳承</text>
        <text x="20" y="45" font-size="9" fill="${c.dark}">「吃緊弄破碗」➔ 欲速則不達的勸勉</text>
        <path d="M 120 95 L 135 110 L 150 95" fill="${c.lightGold}" stroke="${c.gold}"/>
      </g>
      <!-- Bottom summary box -->
      <g transform="translate(50, 115)">
        <rect width="440" height="50" rx="6" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="1.2"/>
        <text x="220" y="25" font-size="10" font-weight="800" fill="${c.blue}" text-anchor="middle">文化連結：客語「寧賣祖宗田，莫忘祖宗言」· 原民敬畏山林海靈之歌</text>
        <text x="220" y="40" font-size="8.5" fill="${c.dark}" text-anchor="middle">多聽、多講、不怕講錯，讓母語在三代同堂的餐桌上自然流動</text>
      </g>
      <text x="270" y="190" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">實作策略：錄下家中長輩的一段童年回憶或拿手菜做法，完成專屬家庭有聲口述歷史</text>
    `)
  },
  'local-3': {
    title: '臺灣手語五大基本語法要素與視覺空間溝通',
    subtitle: '手形 (Handshape)、位置 (Location)、動作 (Movement)、方向 (Orientation)、表情 (NMF)',
    caption: '手語是聾人社群完整的自然語言，非比手畫腳。面部非手部訊號 (NMF) 擔負疑問、否定與副詞等關鍵語法功能。',
    render: () => frame('臺灣手語五大語法要素', `
      ${[
        ['手形 (Handshape)', '手指伸展彎曲形狀', '拳頭、一指、五指開展等基本手勢', c.forest, c.lightGreen, 30],
        ['位置 (Location)', '手勢在身體周邊空間', '額頭（思考）、胸前（情感）、下巴', c.blue, c.lightBlue, 125],
        ['動作 (Movement)', '手部的移動路徑方式', '直線、圓弧、震動、重複拍打', c.gold, c.lightGold, 220],
        ['方向 (Orientation)', '手掌與手心朝向方位', '手心朝內、朝外、朝上或朝下', c.purple, c.lightPurple, 315],
        ['表情 (NMF)', '面部眉眼唇與頭部動作', '挑眉表疑問、皺眉表困惑、否定搖頭', c.red, c.lightRed, 410]
      ].map(([title, role, eg, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="85" height="120" rx="7" fill="${bg}" stroke="${col}" stroke-width="1.5"/>
          <text x="42" y="22" font-size="9" font-weight="800" fill="${col}" text-anchor="middle">${title.split(' ')[0]}</text>
          <text x="42" y="34" font-size="7" fill="${col}" text-anchor="middle">${title.split(' ')[1] || ''}</text>
          <line x1="8" y1="40" x2="77" y2="40" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="42" y="58" font-size="7.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${role.slice(0,5)}</text>
          <text x="42" y="70" font-size="7.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${role.slice(5)}</text>
          <foreignObject x="5" y="76" width="75" height="42">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:6.8px;color:#687b74;line-height:1.2;margin:0;text-align:center;">${eg}</p>
          </foreignObject>
        </g>
      `).join('')}
      <text x="270" y="188" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">溝通平權：手語是視覺三維空間語言。學會基本打招呼與指文字，搭起聽人與聾人同理共融之橋</text>
    `)
  },
  'local-4': {
    title: '語言文化資產記錄與在地復振行動模型',
    subtitle: '口述歷史訪談 ➔ 國際音標/拼音標註 ➔ 數位資料庫 ➔ 跨世代文化傳承',
    caption: '搶救瀕危母語刻不容緩。透過社區田野訪談、語料數位建檔與青年創作，讓古老語言在現代生活中綻放新生命。',
    render: () => frame('母語文化記錄與復振', `
      <!-- 4 Stages Pipeline -->
      ${[
        ['01 田野採集', '長輩耆老訪談口述', '記錄童謠、農耕經驗、部落古調', c.forest, c.lightGreen, 35],
        ['02 記音建檔', '拼音音標與語意對照', '臺羅/客拼/原民拼音文字化', c.blue, c.lightBlue, 155],
        ['03 數位典藏', '影音資料庫與線上字辭典', '開放授權、雲端有聲辭典保存', c.gold, c.lightGold, 275],
        ['04 創新活化', 'Podcast/繪本/獨立音樂', '將母語融入流行文化引發共鳴', c.red, c.lightRed, 395]
      ].map(([step, action, detail, col, bg, x]) => `
        <g transform="translate(${x}, 35)">
          <rect width="105" height="115" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.6"/>
          <text x="52" y="24" font-size="11.5" font-weight="800" fill="${col}" text-anchor="middle">${step}</text>
          <line x1="12" y1="34" x2="93" y2="34" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="52" y="52" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${action.slice(0,6)}</text>
          <text x="52" y="66" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${action.slice(6)}</text>
          <foreignObject x="8" y="72" width="89" height="40">
            <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:7.5px;color:#687b74;line-height:1.2;margin:0;text-align:center;">${detail}</p>
          </foreignObject>
        </g>
        ${x < 395 ? `<path d="M ${x + 107} 92 L ${x + 124} 92" stroke="${c.forest}" stroke-width="2"/><polygon points="${x + 124},92 ${x + 118},88 ${x + 118},96" fill="${c.forest}"/>` : ''}
      `).join('')}
      <text x="270" y="185" font-size="10.5" font-weight="700" fill="${c.forest}" text-anchor="middle">行動實踐：只要有人願意說、願意聽、願意記，古老的族群記憶與母語靈魂就不會消逝</text>
    `)
  }
  ,
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
          <text x="56" y="74" font-size="8.5" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="56" y="94" font-size="8.5" fill="${c.muted}" text-anchor="middle">${desc.split('\n')[1] || ''}</text>
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
          <text x="70" y="76" font-size="8.5" fill="${c.dark}" text-anchor="middle">${eg.split('\n')[0]}</text>
          <text x="70" y="96" font-size="8.5" font-weight="700" fill="${col}" text-anchor="middle">${eg.split('\n')[1]}</text>
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
          <text x="56" y="74" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${action.split('\n')[0]}</text>
          <text x="56" y="96" font-size="8.5" fill="${c.dark}" text-anchor="middle">${action.split('\n')[1]}</text>
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
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${desc.split('\n')[1]}</text>
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
          <text x="75" y="74" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${feat.split('\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${feat.split('\n')[1]}</text>
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
          <text x="75" y="74" font-size="8.5" font-weight="700" fill="${c.dark}" text-anchor="middle">${feat.split('\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${feat.split('\n')[1]}</text>
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
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${detail.split('\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${detail.split('\n')[1]}</text>
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
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${desc.split('\n')[1]}</text>
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
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${detail.split('\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${detail.split('\n')[1]}</text>
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
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${desc.split('\n')[1]}</text>
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
          <text x="75" y="74" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\n')[1]}</text>
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
          <text x="56" y="74" font-size="8" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="56" y="96" font-size="8" font-weight="700" fill="${col}" text-anchor="middle">${desc.split('\n')[1]}</text>
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
          <text x="75" y="74" font-size="8.2" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\n')[1]}</text>
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
          <text x="75" y="74" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\n')[1]}</text>
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
          <text x="75" y="74" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\n')[1]}</text>
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
          <text x="75" y="74" font-size="8" font-weight="700" fill="${c.dark}" text-anchor="middle">${desc.split('\n')[0]}</text>
          <text x="75" y="96" font-size="8" fill="${c.muted}" text-anchor="middle">${desc.split('\n')[1]}</text>
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

};

// Generic subject fallback visual schematics to ensure all 188 units have clean graphics
function defaultSubjectDiagram(u) {
  const s = u.subject;
  const gradeLabel = `${u.grade} 年級・第 ${u.term} 學期核心思維`;
  
  if (['math'].includes(s)) {
    return {
      title: `${u.title} · 數學思維建模`,
      subtitle: gradeLabel,
      caption: `本單元核心在於「${u.concept.split('。')[0]}」。透過幾何模型與代數運算驗證規律。`,
      render: () => frame(u.title, `
        <rect x="60" y="45" width="120" height="110" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <text x="120" y="85" font-size="14" font-weight="700" fill="${c.forest}" text-anchor="middle">數量關係</text>
        <text x="120" y="115" font-size="11" fill="${c.muted}" text-anchor="middle">觀察、列式、假設</text>
        
        <path d="M 185 100 L 225 100" stroke="${c.forest}" stroke-width="2.5"/>
        <polygon points="225,100 217,96 217,104" fill="${c.forest}"/>
        
        <rect x="230" y="45" width="120" height="110" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="290" y="85" font-size="14" font-weight="700" fill="${c.gold}" text-anchor="middle">邏輯推理</text>
        <text x="290" y="115" font-size="11" fill="${c.muted}" text-anchor="middle">定理、性質、化簡</text>
        
        <path d="M 355 100 L 395 100" stroke="${c.forest}" stroke-width="2.5"/>
        <polygon points="395,100 387,96 387,104" fill="${c.forest}"/>
        
        <rect x="400" y="45" width="120" height="110" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="460" y="85" font-size="14" font-weight="700" fill="${c.blue}" text-anchor="middle">精準解題</text>
        <text x="460" y="115" font-size="11" fill="${c.muted}" text-anchor="middle">驗算、反思、建模</text>
        <text x="270" y="185" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">知行數學歷程：數量觀察 ➔ 代數幾何推理 ➔ 規律應用</text>
      `)
    };
  }

  if (['physics', 'chemistry', 'biology', 'earth'].includes(s)) {
    return {
      title: `${u.title} · 科學探究與實證架構`,
      subtitle: gradeLabel,
      caption: `科學探究：以客觀證據為基礎，透過觀察、操縱變因與模型推論驗證「${u.concept.split('。')[0]}」。`,
      render: () => frame(u.title, `
        <circle cx="110" cy="100" r="45" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="110" y="98" font-size="13" font-weight="700" fill="${c.blue}" text-anchor="middle">現象觀察</text>
        <text x="110" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">實作與數據</text>

        <path d="M 160 100 L 210 100" stroke="${c.forest}" stroke-width="2.5"/>
        <polygon points="210,100 202,96 202,104" fill="${c.forest}"/>

        <circle cx="270" cy="100" r="45" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <text x="270" y="98" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">科學機制</text>
        <text x="270" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">變因與定律</text>

        <path d="M 320 100 L 370 100" stroke="${c.forest}" stroke-width="2.5"/>
        <polygon points="370,100 362,96 362,104" fill="${c.forest}"/>

        <circle cx="430" cy="100" r="45" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="430" y="98" font-size="13" font-weight="700" fill="${c.gold}" text-anchor="middle">原理解釋</text>
        <text x="430" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">生活與環境</text>
        <text x="270" y="185" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">108 課綱自然科學：探究與實作四大歷程</text>
      `)
    };
  }

  if (['history', 'geography', 'civics'].includes(s)) {
    return {
      title: `${u.title} · 社會領域時空與制度架構`,
      subtitle: gradeLabel,
      caption: `歷史的時間脈絡、地理的空間環境與公民的制度生活相互交織，理解「${u.concept.split('。')[0]}」。`,
      render: () => frame(u.title, `
        <rect x="50" y="55" width="130" height="90" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
        <text x="115" y="95" font-size="13" font-weight="700" fill="${c.gold}" text-anchor="middle">歷史脈絡</text>
        <text x="115" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">時間與變遷</text>

        <rect x="205" y="55" width="130" height="90" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
        <text x="270" y="95" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">空間地景</text>
        <text x="270" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">環境與人地</text>

        <rect x="360" y="55" width="130" height="90" rx="8" fill="${c.lightBlue}" stroke="${c.blue}" stroke-width="2"/>
        <text x="425" y="95" font-size="13" font-weight="700" fill="${c.blue}" text-anchor="middle">公民制度</text>
        <text x="425" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">權利與責任</text>
        <text x="270" y="185" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">社會領域核心素養：跨維度批判思維與公民實踐</text>
      `)
    };
  }

  // Language, Arts, Technology, Health, PE, Guidance, Scout, Local
  return {
    title: `${u.title} · 實作與素養思維架構`,
    subtitle: gradeLabel,
    caption: `掌握核心結構，從基礎認知、情境分析到主動實踐，確實深化「${u.concept.split('。')[0]}」。`,
    render: () => frame(u.title, `
      <rect x="60" y="60" width="120" height="80" rx="8" fill="${c.lightPurple}" stroke="${c.purple}" stroke-width="2"/>
      <text x="120" y="95" font-size="13" font-weight="700" fill="${c.purple}" text-anchor="middle">基礎輸入</text>
      <text x="120" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">知識、規則、要素</text>

      <path d="M 185 100 L 225 100" stroke="${c.forest}" stroke-width="2.5"/>
      <polygon points="225,100 217,96 217,104" fill="${c.forest}"/>

      <rect x="230" y="60" width="120" height="80" rx="8" fill="${c.lightGreen}" stroke="${c.green}" stroke-width="2"/>
      <text x="290" y="95" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">情境理解</text>
      <text x="290" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">觀察、推論、分析</text>

      <path d="M 355 100 L 395 100" stroke="${c.forest}" stroke-width="2.5"/>
      <polygon points="395,100 387,96 387,104" fill="${c.forest}"/>

      <rect x="400" y="60" width="120" height="80" rx="8" fill="${c.lightGold}" stroke="${c.gold}" stroke-width="2"/>
      <text x="460" y="95" font-size="13" font-weight="700" fill="${c.gold}" text-anchor="middle">主動實踐</text>
      <text x="460" y="115" font-size="10" fill="${c.muted}" text-anchor="middle">表達、創作、修正</text>
      <text x="270" y="185" font-size="13" font-weight="700" fill="${c.forest}" text-anchor="middle">素養導向學習：精準理解 ➔ 深度思考 ➔ 自信表達</text>
    `)
  };
}

export function getDiagram(u) {
  if (!u) return '';
  const d = diagrams[u.id] || defaultSubjectDiagram(u);
  if (!d) return ""; // Unit comparison tables replace generic decorative diagrams.
  const svg = d.render();
  return `
    <div class="diagram-box">
      <div class="diagram-header">
        <span class="diagram-icon">📐</span>
        <div class="diagram-title-group">
          <strong>${d.title}</strong>
          <span class="subtle">${d.subtitle}</span>
        </div>
      </div>
      <div class="diagram-svg-wrap">
        ${svg}
      </div>
      ${d.caption ? `<p class="diagram-caption">${d.caption}</p>` : ''}
    </div>
  `;
}
