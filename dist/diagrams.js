// dist/diagrams.js - Native Vector SVG Conceptual Diagrams & Visual Schemas
// Crafted for 108 Curriculum & Junyi Academy learning model

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
