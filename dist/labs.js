// dist/labs.js - Zhixing Academy Interactive Conceptual Simulations (14 Interactive Labs across 8 Subjects)
const $ = s => document.querySelector(s);

export const LAB_CATALOG = [
  { id: 'lab-quadratic', title: '二次函數拋物線與極值', subject: 'math', icon: '📈', units: ['math-18'], desc: '調整 a、h、k，親眼看見頂點平移與最大利潤／投籃拋物線！' },
  { id: 'lab-linear', title: '一次函數與生活資費決策', subject: 'math', icon: '💰', units: ['math-4', 'math-5', 'math-6', 'math-7', 'math-8', 'math-13'], desc: '比較兩種月租／計程車方案，找黃金交叉點做出最省錢決策！' },
  { id: 'lab-prob', title: '機率、期望值與大數法則', subject: 'math', icon: '🎲', units: ['math-19', 'math-27'], desc: '一鍵實測 10～1,000 次抽卡與擲骰，親眼驗證頻率收斂並破除賭徒謬誤！' },
  { id: 'lab-vt', title: 'v-t 速度時間圖與安全煞車距離', subject: 'physics', icon: '🚗', units: ['physics-5', 'physics-10', 'physics-15'], desc: '用 v-t 圖面積即時算出反應距離＋煞車距離，看懂為何超速風險是平方倍暴增！' },
  { id: 'lab-circuit', title: '歐姆定律與家電電路功率', subject: 'physics', icon: '⚡', units: ['physics-7', 'physics-11', 'physics-12', 'physics-13'], desc: '調整電壓 V 與電阻 R，觀察電流 I 與電功率 P 變化！' },
  { id: 'lab-lever', title: '槓桿原理與力矩平衡', subject: 'physics', icon: '⚖️', units: ['physics-6'], desc: '調整兩側施力與力臂長，體驗省力槓桿與力矩平衡！' },
  { id: 'lab-lens', title: '凸透鏡三條光線與虛實成像', subject: 'physics', icon: '🔍', units: ['physics-3', 'physics-14'], desc: '拖動物距 p 跨過 2f 與 f，即時觀察倒立實像變成正立放大鏡虛像！' },
  { id: 'lab-buoyancy', title: '阿基米德浮力與吃水線模擬', subject: 'physics', icon: '⛵', units: ['physics-8', 'physics-9'], desc: '改變物體與液體密度，即時觀測沉浮、吃水深度與視重變化！' },
  { id: 'lab-titration', title: '酸鹼中和滴定與 pH 變色曲線', subject: 'chemistry', icon: '🧪', units: ['chemistry-4', 'chemistry-5', 'chemistry-9', 'chemistry-10'], desc: '逐毫升滴入 NaOH 觀察 pH 當量點突躍與指示劑色彩漸層！' },
  { id: 'lab-punnett', title: '孟德爾遺傳與棋盤方格機率', subject: 'biology', icon: '🧬', units: ['biology-5', 'biology-10', 'biology-11'], desc: '自由組合雙親基因型，即時呈現子代基因型與表現型比例！' },
  { id: 'lab-moon', title: '日地月相對位置與月相盈虧', subject: 'earth', icon: '🌙', units: ['earth-4', 'earth-10', 'earth-12'], desc: '滑動農曆天數 0–29.5 天，同步看懂太空俯視與地球觀測月相！' },
  { id: 'lab-tense', title: '英語四大時態與主詞動詞呼應', subject: 'english', icon: '🗣️', units: ['english-1', 'english-2', 'english-3', 'english-5', 'english-8', 'english-9', 'english-11'], desc: '切換主詞與時間維度，即時聽原音朗讀與語法解析！' },
  { id: 'lab-supply', title: '市場供需曲線、價格均衡與限價衝擊', subject: 'civics', icon: '📊', units: ['civics-5', 'civics-9', 'civics-12'], desc: '移動需求／供給曲線與政府限價，親眼看見短缺排隊與過剩滯銷如何形成！' },
  { id: 'lab-search', title: '線性搜尋 vs 二分搜尋演算法視覺化', subject: 'computing', icon: '💻', units: ['computing-1', 'computing-2', 'computing-3'], desc: '挑選目標數字，同步對比逐格查找與折半搜尋的步驟效率差距！' }
];

export function getLabsForUnit(unit) {
  if (!unit) return [];
  const exact = LAB_CATALOG.filter(l => l.units.includes(unit.id));
  if (exact.length) return exact;
  return LAB_CATALOG.filter(l => l.subject === unit.subject).slice(0, 1);
}

function range(id, label, min, max, value, step) {
  return `<label class="row" for="${id}" style="margin-top:16px"><span>${label}</span><strong data-value="${id}">${value}</strong></label><input id="${id}" type="range" min="${min}" max="${max}" value="${value}" step="${step}">`;
}

export function renderLabs(main, speak) {
  main.innerHTML = `
    <div class="eyebrow">PREDICT · EXPLORE · EXPLAIN · APPLY</div>
    <h1>先猜一猜，再動手驗證與應用。</h1>
    <p class="muted">全站 14 座互動概念實驗室（跨 8 科）：改變變因、觀察即時回饋，把抽象公式轉化為真實生活決策直覺。</p>
    <div class="filters" style="margin:12px 0 18px;" aria-label="快速跳轉互動實驗室">
      ${LAB_CATALOG.map(l => `<button type="button" class="chip lab-jump-chip" data-lab-jump="${l.id}">${l.icon} ${l.title.split('與')[0]}</button>`).join('')}
    </div>

    <section class="panel" style="margin-bottom:24px;">
      <div class="row" style="align-items:center;margin-bottom:10px;">
        <span class="tag accent">科學探究方法論 · POE 學習環</span>
        <span class="subtle">108 課綱自然與數學探究實作核心架構</span>
      </div>
      <h2>POE 科學探究三部曲與實驗變因控制指南</h2>
      <div class="diagram-box" style="margin:12px 0 18px;">
        <div class="diagram-header">
          <span class="diagram-icon">🔬</span>
          <div class="diagram-title-group">
            <strong>POE 探究學習環（Predict 預測 ➔ Observe 觀察 ➔ Explain 解釋）與變因控制架構圖</strong>
            <span class="subtle">每次只改變一個「操縱變因」，固定所有「控制變因」，量測並記錄「應變變因」</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg viewBox="0 0 640 120" style="width:100%;max-width:640px;display:block;margin:0 auto;" role="img" aria-label="POE科學探究與變因控制架構圖">
            <rect x="6" y="6" width="628" height="108" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            <g transform="translate(18, 16)">
              <rect width="180" height="88" rx="8" fill="#e8f3ee" stroke="#2f5e4e" stroke-width="1.6"/>
              <text x="90" y="24" font-size="11.5" font-weight="800" fill="#1e3c30" text-anchor="middle">① Predict 預測假設</text>
              <text x="90" y="46" font-size="9" font-weight="700" fill="#223832" text-anchor="middle">設定單一「操縱變因」</text>
              <text x="90" y="66" font-size="8.2" fill="#5a6d64" text-anchor="middle">先依定理推論可能走勢與極值</text>
            </g>
            <path d="M 202 60 L 226 60" stroke="#2f5e4e" stroke-width="2.2"/>
            <polygon points="228,60 221,56 221,64" fill="#2f5e4e"/>
            <g transform="translate(230, 16)">
              <rect width="180" height="88" rx="8" fill="#e6f0f9" stroke="#2b5b84" stroke-width="1.6"/>
              <text x="90" y="24" font-size="11.5" font-weight="800" fill="#2b5b84" text-anchor="middle">② Observe 動態觀察</text>
              <text x="90" y="46" font-size="9" font-weight="700" fill="#223832" text-anchor="middle">固定「控制變因」拉動滑桿</text>
              <text x="90" y="66" font-size="8.2" fill="#5a6d64" text-anchor="middle">觀察圖形、光路與數值即時變化</text>
            </g>
            <path d="M 414 60 L 438 60" stroke="#2b5b84" stroke-width="2.2"/>
            <polygon points="440,60 433,56 433,64" fill="#2b5b84"/>
            <g transform="translate(442, 16)">
              <rect width="180" height="88" rx="8" fill="#fdf6e2" stroke="#b07d2b" stroke-width="1.6"/>
              <text x="90" y="24" font-size="11.5" font-weight="800" fill="#b07d2b" text-anchor="middle">③ Explain 理論印證</text>
              <text x="90" y="46" font-size="9" font-weight="700" fill="#223832" text-anchor="middle">分析「應變變因」因果關係</text>
              <text x="90" y="66" font-size="8.2" fill="#5a6d64" text-anchor="middle">比對預測差異，修正心智模型</text>
            </g>
          </svg>
        </div>
      </div>
      <div class="table-wrap">
        <table class="teaching-table">
          <caption>互動實驗室 · 14 大跨科模擬模組之操縱變因與應變變因精選對照表</caption>
          <thead>
            <tr>
              <th scope="col">實驗模擬主題</th>
              <th scope="col">操縱變因（滑桿自變數）</th>
              <th scope="col">應變變因（觀測依變數）</th>
              <th scope="col">核心定量定律與會考關鍵</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">二次函數圖形</th>
              <td>係數 a（開口）、頂點座標 (h, k)</td>
              <td>拋物線開口方向、寬窄與極值位置</td>
              <td>y＝a(x−h)²＋k；|a| 越大開口越窄，x＝h 為對稱軸</td>
            </tr>
            <tr>
              <th scope="row">歐姆定律與電路</th>
              <td>電壓 V（伏特）、電阻 R（歐姆）</td>
              <td>電路電流 I（安培）與電功率 P</td>
              <td>I＝V/R；定電壓下電阻加倍則電流減半</td>
            </tr>
            <tr>
              <th scope="row">槓桿力矩平衡</th>
              <td>左右兩側施力 F 與力臂長 d</td>
              <td>逆時針力矩 vs 順時針力矩、平衡狀態</td>
              <td>τ＝F×d⊥；合力矩為 0 時達成轉動平衡</td>
            </tr>
            <tr>
              <th scope="row">凸透鏡幾何光路</th>
              <td>物距 p（相對於 f＝20cm 與 2f）</td>
              <td>像距 q、正倒立、放大縮小、實虛像</td>
              <td>物在 2f 外成縮小倒立實像；物在 f 內成放大正立虛像</td>
            </tr>
            <tr>
              <th scope="row">酸鹼滴定與 pH</th>
              <td>滴入 0.1M NaOH 鹼液體積（mL）</td>
              <td>混合溶液 pH 值與指示劑顏色變化</td>
              <td>n(H⁺)＝n(OH⁻) 達當量點（20mL 時 pH＝7 突躍）</td>
            </tr>
            <tr>
              <th scope="row">浮力與阿基米德</th>
              <td>物體密度 D_物、液體密度 D_液</td>
              <td>排開液體體積 V_排、浮力 B 與視重</td>
              <td>B＝V_排×D_液；浮體 B＝W，沉體 B＝V_物×D_液</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="unit-grid">
      <!-- 1. Quadratic Function -->
      <section class="panel" id="lab-quadratic">
        <span class="tag">數學 · 二次函數</span>
        <h2 style="margin-top:15px">讓函數的圖形動起來</h2>
        <p class="muted">y＝a(x−h)²＋k。先預測頂點位置與開口方向，再滑動觀察。</p>
        ${range('quad-a', 'a：開口方向與寬窄', -3, 3, 1, 0.5)}
        ${range('quad-h', 'h：水平平移 (左加右減)', -4, 4, 0, 1)}
        ${range('quad-k', 'k：垂直平移 (上加下減)', -4, 4, 0, 1)}
        <div id="quad-plot"></div>
        <div class="lab-output" id="quad-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/math-18">回到二次函數幾何課程 →</a>
      </section>

      <!-- 2. Electric Circuit -->
      <section class="panel" id="lab-circuit">
        <span class="tag">自然 · 電與電路</span>
        <h2 style="margin-top:15px">固定電壓，改變電阻</h2>
        <p class="muted">歐姆定律 V＝I×R。電阻加倍時，電流會如何減半？</p>
        ${range('voltage', '電壓 V（伏特）', 1, 24, 12, 1)}
        ${range('resistance', '電阻 R（歐姆）', 1, 24, 6, 1)}
        <div id="circuit-plot"></div>
        <div class="lab-output" id="circuit-output" aria-live="polite"></div>
        <p class="notice">純虛擬數值建模；真實操作請遵守實驗室用電安全守則。</p>
        <a class="source-link" href="#/lesson/physics-7">回到歐姆定律與電路課程 →</a>
      </section>

      <!-- 3. Lever Torque -->
      <section class="panel" id="lab-lever">
        <span class="tag">自然 · 力矩平衡</span>
        <h2 style="margin-top:15px">讓槓桿左右平衡</h2>
        <p class="muted">力矩＝施力×力臂。逆時針力矩等於順時針力矩時槓桿靜止平衡。</p>
        ${range('left-force', '左側施力（N）', 1, 20, 10, 1)}
        ${range('left-arm', '左側力臂（cm）', 10, 100, 40, 10)}
        ${range('right-force', '右側施力（N）', 1, 20, 10, 1)}
        ${range('right-arm', '右側力臂（cm）', 10, 100, 40, 10)}
        <div id="lever-plot"></div>
        <div class="lab-output" id="lever-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/physics-6">回到簡單機械與力矩平衡 →</a>
      </section>

      <!-- 4. Convex Lens Optics -->
      <section class="panel" id="lab-lens">
        <span class="tag">自然 · 凸透鏡幾何光路</span>
        <h2 style="margin-top:15px">蠟燭成像：虛實與大小動態變化</h2>
        <p class="muted">定焦距 f＝20 cm。拖動物距，即時繪製三條特殊光線並求出像的位置。</p>
        ${range('lens-p', '物距 p（cm，焦距 f＝20cm）', 10, 60, 45, 1)}
        <div id="lens-plot"></div>
        <div class="lab-output" id="lens-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/physics-14">回到凸透鏡成像規律 →</a>
      </section>

      <!-- 5. Acid-Base Titration & pH -->
      <section class="panel" id="lab-titration">
        <span class="tag">自然 · 酸鹼滴定與 pH</span>
        <h2 style="margin-top:15px">酸鹼中和與指示劑色彩連續漸層</h2>
        <p class="muted">20 mL 的 0.1M HCl 鹽酸，逐漸滴入 0.1M NaOH 鹼液，觀察 pH 突躍與指示劑變色。</p>
        ${range('naoh-vol', '滴入 0.1M 鹼液（mL）', 0, 40, 15, 1)}
        <div id="titration-plot"></div>
        <div class="lab-output" id="titration-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/chemistry-5">回到 pH 標度與酸鹼中和 →</a>
      </section>

      <!-- 6. Buoyancy & Density -->
      <section class="panel" id="lab-buoyancy">
        <span class="tag">自然 · 浮力與阿基米德</span>
        <h2 style="margin-top:15px">物體沈浮與吃水線動態模擬</h2>
        <p class="muted">改變物體密度與液體密度，觀察排開液體體積與浮力、視重磅秤讀數。</p>
        ${range('obj-density', '物體密度 D_物（g/cm³）', 0.2, 2.0, 0.6, 0.1)}
        ${range('liq-density', '液體密度 D_液（g/cm³）', 0.8, 1.4, 1.0, 0.1)}
        <div id="buoyancy-plot"></div>
        <div class="lab-output" id="buoyancy-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/physics-8">回到阿基米德浮力平衡 →</a>
      </section>

      <!-- 7. English Tense -->
      <section class="panel" id="lab-tense">
        <span class="tag">英語 · 時態變化</span>
        <h2 style="margin-top:15px">一句話，四種時間維度</h2>
        <p class="muted">觀察主詞、動詞變化和時間副詞如何精確呼應。</p>
        <div class="form-row">
          <label for="tense-person">主詞</label>
          <select id="tense-person"><option>I</option><option>She</option><option>They</option></select>
        </div>
        <div class="form-row">
          <label for="tense-time">時態</label>
          <select id="tense-time">
            <option value="present">現在簡單式 (Present Simple)</option>
            <option value="progressive">現在進行式 (Present Continuous)</option>
            <option value="past">過去簡單式 (Past Simple)</option>
            <option value="future">未來式 (Future Simple)</option>
          </select>
        </div>
        <div class="lab-output" id="tense-output" aria-live="polite"></div>
        <p id="tense-explanation" class="callout"></p>
        <button id="tense-audio" class="button secondary">▷ 聽朗讀語音</button>
        <a class="button ghost" href="#/lesson/english-1">回到五大基本句型 →</a>
      </section>

      <!-- 8. Moon Phase Astronomical Geometry -->
      <section class="panel" id="lab-moon">
        <span class="tag">地科 · 月相盈虧</span>
        <h2 style="margin-top:15px">日地月相對位置與月相變化</h2>
        <p class="muted">月球公轉軌道幾何位置，決定地球上觀測者看見的明亮面積與月相名稱。</p>
        ${range('moon-day', '農曆天數（0~29.5 日）', 0, 29.5, 7.5, 0.5)}
        <div id="moon-plot"></div>
        <div class="lab-output" id="moon-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/earth-4">回到地球運動、四季與月相課程 →</a>
      </section>

      <!-- 9. Mendelian Punnett Square -->
      <section class="panel" id="lab-punnett">
        <span class="tag">生物 · 孟德爾遺傳</span>
        <h2 style="margin-top:15px">基因分離律與棋盤方格模擬</h2>
        <p class="muted">選擇雙親基因型，即時計算子代基因型比例 (TT:Tt:tt) 與表現型比例 (高莖:矮莖)。</p>
        <div class="form-row">
          <label for="punnett-p1">父本基因型</label>
          <select id="punnett-p1">
            <option value="Tt" selected>Tt (雜合高莖)</option>
            <option value="TT">TT (純合高莖)</option>
            <option value="tt">tt (隱性矮莖)</option>
          </select>
          <label for="punnett-p2">母本基因型</label>
          <select id="punnett-p2">
            <option value="Tt" selected>Tt (雜合高莖)</option>
            <option value="TT">TT (純合高莖)</option>
            <option value="tt">tt (隱性矮莖)</option>
          </select>
        </div>
        <div id="punnett-plot"></div>
        <div class="lab-output" id="punnett-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/biology-11">回到孟德爾遺傳法則課程 →</a>
      </section>

      <!-- 10. Linear Function & Real-Life Plan Decision -->
      <section class="panel" id="lab-linear">
        <span class="tag accent">數學 · 一次函數生活資費決策</span>
        <h2 style="margin-top:15px">兩種方案哪個省？找黃金交叉點</h2>
        <p class="muted">比較「低月租高單價 (方案 A)」與「高月租低單價 (方案 B)」，用聯立方程式與一次函數一眼找出最划算決策！</p>
        ${range('lin-a1', '方案 A 每次費率 a₁（元/次）', 20, 100, 60, 5)}
        ${range('lin-b2', '方案 B 基本月費 b₂（元）', 100, 600, 300, 50)}
        ${range('lin-a2', '方案 B 每次費率 a₂（元/次）', 5, 60, 20, 5)}
        ${range('lin-x', '本月預計使用次數 x（次）', 1, 20, 10, 1)}
        <div id="linear-plot"></div>
        <div class="lab-output" id="linear-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/math-13">回到一次函數與等差數列課程 →</a>
      </section>

      <!-- 11. Probability & Law of Large Numbers -->
      <section class="panel" id="lab-prob">
        <span class="tag accent">數學 · 機率與大數法則模擬器</span>
        <h2 style="margin-top:15px">實測抽卡／中獎機率：驗證大數法則</h2>
        <p class="muted">設定理論中獎率 p%，實際模擬 10～1,000 次獨立試驗，親眼觀察頻率如何收斂，破除「連槓十次下次必中」的賭徒謬誤！</p>
        ${range('prob-p', '理論中獎機率 p（%）', 5, 80, 20, 5)}
        <div class="actions" style="margin:12px 0;">
          <button type="button" class="button small" id="prob-run-10">試抽 10 次</button>
          <button type="button" class="button small secondary" id="prob-run-100">模擬 100 次</button>
          <button type="button" class="button small secondary" id="prob-run-1000">大數模擬 1,000 次</button>
          <button type="button" class="button small ghost" id="prob-reset">重置紀錄</button>
        </div>
        <div id="prob-plot"></div>
        <div class="lab-output" id="prob-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/math-19">回到統計、機率與空間圖形課程 →</a>
      </section>

      <!-- 12. Physics v-t Graph & Braking Distance -->
      <section class="panel" id="lab-vt">
        <span class="tag accent">物理 · v-t 圖與道路安全煞車距離</span>
        <h2 style="margin-top:15px">車速加倍，停車距離為何暴增？</h2>
        <p class="muted">v-t 圖下方面積＝位移！分成「等速反應距離（矩形面積）」與「等減速煞車距離（三角形面積）」，親眼看見超速的危險。</p>
        ${range('vt-speed', '初始車速 v₀（km/h）', 20, 120, 60, 10)}
        ${range('vt-react', '駕駛反應時間 t₁（秒）', 0.3, 1.5, 0.7, 0.1)}
        ${range('vt-decel', '煞車減速度 a（m/s²，乾地約 6、雨天約 3）', 2, 8, 6, 1)}
        <div id="vt-plot"></div>
        <div class="lab-output" id="vt-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/physics-5">回到運動、力與牛頓定律課程 →</a>
      </section>

      <!-- 13. Civics Market Supply & Demand Equilibrium -->
      <section class="panel" id="lab-supply">
        <span class="tag accent">公民 · 市場供需均衡與限價衝擊</span>
        <h2 style="margin-top:15px">熱門商品為何會漲價或大排長龍？</h2>
        <p class="muted">移動需求與供給曲線，或設定政府價格上限，即時觀測均衡價格 P*、均衡數量 Q*、短缺（排隊搶購）與過剩（滯銷庫存）。</p>
        ${range('sd-demand', '需求變動（負＝退燒、正＝爆紅搶購）', -30, 30, 0, 5)}
        ${range('sd-supply', '供給變動（負＝原料缺貨、正＝技術量產）', -30, 30, 0, 5)}
        ${range('sd-cap', '市場管制售價（0＝自由市場不限價）', 0, 100, 0, 10)}
        <div id="supply-plot"></div>
        <div class="lab-output" id="supply-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/civics-5">回到選擇、機會成本與市場課程 →</a>
      </section>

      <!-- 14. Computing Linear vs Binary Search Visualizer -->
      <section class="panel" id="lab-search">
        <span class="tag accent">資訊科技 · 線性 vs 二分搜尋演算法</span>
        <h2 style="margin-top:15px">演算法差距：為什麼二分搜尋快好幾倍？</h2>
        <p class="muted">在 16 筆已排序資料中尋找目標數字，同步比較「線性逐筆查找 O(n)」與「二分折半搜尋 O(log₂n)」的探訪路徑與比較次數！</p>
        ${range('algo-target', '選擇要搜尋的目標數值（已排序陣列）', 4, 64, 48, 4)}
        <div id="search-plot"></div>
        <div class="lab-output" id="search-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/computing-1">回到演算法與問題拆解課程 →</a>
      </section>
    </div>

    <!-- Virtual Labs Principles and Formulas Reference Matrix -->
    <section class="panel" style="margin-top:28px">
      <h2>虛擬實驗室原理與公式對照總表</h2>
      <p class="muted">將操作變因、數學規律與會考情境題型完整對齊，理解公式背後的幾何與物理本質。</p>
      <div class="table-wrap">
        <table class="teaching-table">
          <thead>
            <tr>
              <th scope="col">實驗名稱</th>
              <th scope="col">操縱／控制變因</th>
              <th scope="col">數學與物理模型公式</th>
              <th scope="col">生活應用與大考題眼</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">二次函數平移與極值</th>
              <td>a (開口方向/大小), h (水平平移), k (垂直平移)</td>
              <td>y ＝ a(x−h)² ＋ k（頂點 (h, k)，對稱軸 x＝h）</td>
              <td>拋物線彈道軌跡、橋樑拱橋、最大利潤最佳化問題</td>
            </tr>
            <tr>
              <th scope="row">電路與歐姆定律</th>
              <td>操縱電阻 R，控制電壓 V，觀察電流 I</td>
              <td>V ＝ I · R；電功率 P ＝ V · I ＝ I²R ＝ V²/R</td>
              <td>家電串聯與並聯差異、家庭用電安全、保險絲熔斷原理</td>
            </tr>
            <tr>
              <th scope="row">槓桿原理與力矩平衡</th>
              <td>左/右側施力 (F) 與力臂 (d)</td>
              <td>L ＝ F · d；合力矩為零：L_逆 ＝ L_順</td>
              <td>天平秤量、剪刀/開瓶器/鑷子省力與費力槓桿判別</td>
            </tr>
            <tr>
              <th scope="row">凸透鏡幾何光路成像</th>
              <td>物距 p（相對 2f 與 f 焦距之位置）</td>
              <td>1/p ＋ 1/q ＝ 1/f；放大率 m ＝ q/p</td>
              <td>照相機 (p>2f 倒縮實)、放大鏡 (p&lt;f 正放虛)、投影機 (f&lt;p&lt;2f)</td>
            </tr>
            <tr>
              <th scope="row">酸鹼中和與滴定曲線</th>
              <td>滴入 0.1M NaOH 鹼液體積</td>
              <td>H⁺ ＋ OH⁻ ➔ H₂O；pH ＝ −log[H⁺]</td>
              <td>胃酸過多胃藥制酸、農田土壤酸鹼改良、酚酞變色敏銳點</td>
            </tr>
            <tr>
              <th scope="row">阿基米德浮力與密度</th>
              <td>物體密度 D_物 與液體密度 D_液</td>
              <td>B ＝ V_排 · D_液；浮體 B＝W，沉體 B＜W</td>
              <td>船隻吃水線、死海漂浮、熱氣球升空與潛水艇沉浮艙</td>
            </tr>
            <tr>
              <th scope="row">英語時態與時間副詞</th>
              <td>時間維度 (現在、過去、進行、未來)</td>
              <td>時態一致性：主詞 ＋ 相應動詞形式 ＋ 時間副詞</td>
              <td>英文閱讀克漏字時態一致、敘事視角轉換、日常口語表達</td>
            </tr>
            <tr>
              <th scope="row">月相盈虧與日地月幾何</th>
              <td>月球公轉農曆天數 (0~29.5 日)</td>
              <td>幾何夾角 θ ＝ (天數 / 29.5) × 360°</td>
              <td>大潮與小潮引潮力週期、中秋賞月、日食與月食發生條件</td>
            </tr>
            <tr>
              <th scope="row">孟德爾遺傳與棋盤方格</th>
              <td>雙親等位基因型 (TT, Tt, tt)</td>
              <td>分離律與自由配合律；配子結合機率乘法原理</td>
              <td>家族遺傳譜系圖分析、ABO 血型遺傳機率、優生保健篩檢</td>
            </tr>
            <tr>
              <th scope="row">一次函數生活資費決策</th>
              <td>各方案費率 a、基本月費 b、使用次數 x</td>
              <td>y₁＝a₁x vs y₂＝b₂＋a₂x；交點 x*＝b₂/(a₁−a₂)</td>
              <td>電信月租、計程車與會員卡方案比價、段考與會考應用建模</td>
            </tr>
            <tr>
              <th scope="row">機率與大數法則模擬</th>
              <td>理論機率 p（%）、獨立重複試驗次數 n</td>
              <td>實驗頻率 f/n 隨 n 增大收斂至理論機率 p</td>
              <td>手遊抽卡保底期望值、破除賭徒謬誤、統計抽樣誤差觀念</td>
            </tr>
            <tr>
              <th scope="row">v-t 圖與道路煞車距離</th>
              <td>初始車速 v₀、反應時間 t₁、減速度 a</td>
              <td>d_總＝v₀t₁＋v₀²/(2a)（矩形＋三角形面積）</td>
              <td>車速加倍煞車距離暴增 4 倍、雨天安全車距與牛頓力學應用</td>
            </tr>
            <tr>
              <th scope="row">市場供需曲線與限價</th>
              <td>需求變動 ΔD、供給變動 ΔS、價格管制 P_cap</td>
              <td>市場均衡 Q_d(P*)＝Q_s(P*)；限價過低生短缺、過高生過剩</td>
              <td>熱門商品搶購排隊與黃牛成因、公民與學測社會核心經濟分析</td>
            </tr>
            <tr>
              <th scope="row">線性 vs 二分搜尋演算法</th>
              <td>已排序陣列目標值 target（16 筆資料）</td>
              <td>線性搜尋 O(n) 逐格查 vs 二分搜尋 O(log₂n) 折半查</td>
              <td>查字典、資料庫索引與大數據檢索效率差距直覺化</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  main.querySelectorAll('input[type=range]').forEach(i => {
    i.oninput = () => {
      const display = document.querySelector(`[data-value="${i.id}"]`);
      if (display) display.textContent = i.value;
      update();
    };
  });

  $('#tense-person').onchange = update;
  $('#tense-time').onchange = update;
  if ($('#punnett-p1')) $('#punnett-p1').onchange = update;
  if ($('#punnett-p2')) $('#punnett-p2').onchange = update;
  $('#tense-audio').onclick = () => speak($('#tense-output').textContent);

  // Quick-jump chips & #/labs?lab=<id> deep-link highlight
  main.querySelectorAll('[data-lab-jump]').forEach(btn => {
    btn.onclick = () => {
      const target = document.getElementById(btn.dataset.labJump);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('highlight-pulse');
        setTimeout(() => target.classList.remove('highlight-pulse'), 1600);
      }
    };
  });

  // Probability simulator state & buttons
  let probHistory = [];
  let probTotal = 0;
  let probHits = 0;
  const renderProb = () => {
    const pPct = Number($('#prob-p')?.value || 20);
    const p = pPct / 100;
    const empPct = probTotal ? (probHits / probTotal) * 100 : 0;
    if ($('#prob-output')) {
      $('#prob-output').textContent = probTotal
        ? `累計模擬 ${probTotal} 次｜中獎 ${probHits} 次｜實驗頻率 ${empPct.toFixed(1)}% vs 理論機率 ${pPct}%（差值 ${Math.abs(empPct - pPct).toFixed(1)}%）`
        : `理論機率 ${pPct}%（期望每 ${(100 / pPct).toFixed(1)} 次中 1 次）。點擊上方按鈕開始真實隨機試驗！`;
    }
    if ($('#prob-plot')) {
      const pts = probHistory.map((val, idx) => {
        const x = 36 + (idx / Math.max(1, probHistory.length - 1)) * 340;
        const y = 145 - (val / 100) * 120;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');
      const ty = 145 - (pPct / 100) * 120;
      $('#prob-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 175" role="img" aria-label="機率大數法則收斂折線圖">
        <rect x="36" y="20" width="340" height="125" fill="#fbfcfb" stroke="#d6dfd9"/>
        <line x1="36" y1="${ty.toFixed(1)}" x2="376" y2="${ty.toFixed(1)}" stroke="#b84735" stroke-width="1.8" stroke-dasharray="5,4"/>
        <text x="372" y="${Math.max(32, ty - 5).toFixed(1)}" font-size="9" font-weight="700" fill="#b84735" text-anchor="end">理論機率 ${pPct}%</text>
        ${pts ? `<polyline points="${pts}" fill="none" stroke="#2d654e" stroke-width="2.5"/>` : '<text x="206" y="88" font-size="11" fill="#687b74" text-anchor="middle">按下「試抽 10 次」或「大數模擬 1,000 次」觀察收斂曲線</text>'}
        <text x="28" y="28" font-size="9" fill="#687b74" text-anchor="end">100%</text>
        <text x="28" y="88" font-size="9" fill="#687b74" text-anchor="end">50%</text>
        <text x="28" y="148" font-size="9" fill="#687b74" text-anchor="end">0%</text>
        <text x="206" y="166" font-size="9" fill="#687b74" text-anchor="middle">試驗累計次數（次數越多，綠線越貼近紅色理論虛線）</text>
      </svg>`;
    }
  };
  const runTrials = n => {
    const p = Number($('#prob-p')?.value || 20) / 100;
    const step = Math.max(1, Math.floor(n / 40));
    for (let i = 1; i <= n; i++) {
      probTotal++;
      if (Math.random() < p) probHits++;
      if (i % step === 0 || i === n) {
        probHistory.push((probHits / probTotal) * 100);
        if (probHistory.length > 80) probHistory.shift();
      }
    }
    renderProb();
  };
  if ($('#prob-run-10')) $('#prob-run-10').onclick = () => runTrials(10);
  if ($('#prob-run-100')) $('#prob-run-100').onclick = () => runTrials(100);
  if ($('#prob-run-1000')) $('#prob-run-1000').onclick = () => runTrials(1000);
  if ($('#prob-reset')) $('#prob-reset').onclick = () => { probHistory = []; probTotal = 0; probHits = 0; renderProb(); };
  if ($('#prob-p')) $('#prob-p').addEventListener('input', () => { probHistory = []; probTotal = 0; probHits = 0; renderProb(); });

  update();
  renderProb();

  // Auto-scroll to deep-linked lab if ?lab=lab-xxx is in URL hash
  try {
    const qStr = (location.hash.split('?')[1] || '');
    const targetLabId = new URLSearchParams(qStr).get('lab');
    if (targetLabId) {
      const el = document.getElementById(targetLabId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('highlight-pulse');
          setTimeout(() => el.classList.remove('highlight-pulse'), 2000);
        }, 120);
      }
    }
  } catch {}
}

function update() {
  const num = id => Number($('#' + id).value);

  // 1. Quadratic Plot
  const a = num('quad-a'), h = num('quad-h'), k = num('quad-k');
  const toX = x => 200 + x * 23, toY = y => 140 - y * 15;
  const points = [];
  for (let x = -8; x <= 8; x += 0.06) {
    const y = a * (x - h) ** 2 + k;
    points.push(`${toX(x).toFixed(1)},${toY(y).toFixed(1)}`);
  }
  let grid = '';
  for (let i = -8; i <= 8; i++) grid += `<line x1="${toX(i)}" y1="5" x2="${toX(i)}" y2="275" stroke="#e3e9df"/>`;
  for (let j = -8; j <= 8; j++) grid += `<line x1="5" y1="${toY(j)}" x2="395" y2="${toY(j)}" stroke="#e3e9df"/>`;
  $('#quad-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 280" role="img" aria-label="函數圖形">
    <defs><clipPath id="plot-clip"><rect x="5" y="5" width="390" height="270"/></clipPath></defs>
    ${grid}
    <path d="M5 140H395 M200 5V275" stroke="#80957e" stroke-width="1.5"/>
    <text x="383" y="157" font-size="13">x</text><text x="209" y="17" font-size="13">y</text>
    <polyline clip-path="url(#plot-clip)" points="${points.join(' ')}" fill="none" stroke="#4e773b" stroke-width="3"/>
    ${a !== 0 ? `<circle cx="${toX(h)}" cy="${toY(k)}" r="5" fill="#b84735"/>` : ''}
  </svg>`;
  $('#quad-output').textContent = a === 0 ? `y＝${k}，為常數水平線` : `頂點 (${h}, ${k}) · 開口向${a > 0 ? '上 (有最小值 ' + k + ')' : '下 (有最大值 ' + k + ')'}`;

  // 2. Circuit Plot
  const v = num('voltage'), r = num('resistance');
  const current = (v / r).toFixed(2);
  $('#circuit-output').textContent = `I ＝ ${v}V ÷ ${r}Ω ＝ ${current} A`;
  $('#circuit-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 150" role="img" aria-label="電路圖">
    <path d="M65 65V25H325V65 M325 95V135H65V85" fill="none" stroke="#50725f" stroke-width="3"/>
    <path d="M45 65H85 M52 85H78" stroke="#264a36" stroke-width="4"/>
    <rect x="310" y="65" width="30" height="30" fill="white" stroke="#264a36" stroke-width="3"/>
    <text x="95" y="80" fill="#264a36" font-size="14" font-weight="700">${v} V</text>
    <text x="250" y="82" fill="#264a36" font-size="14" font-weight="700">${r} Ω</text>
    <text x="195" y="20" fill="#b84735" font-size="12" font-weight="700" text-anchor="middle">電流 I ＝ ${current} A ➔</text>
  </svg>`;

  // 3. Lever Plot
  const lf = num('left-force'), la = num('left-arm');
  const rf = num('right-force'), ra = num('right-arm');
  const leftTorque = lf * la, rightTorque = rf * ra;
  const balanced = leftTorque === rightTorque;
  $('#lever-output').textContent = `左側 ${leftTorque} N·cm : 右側 ${rightTorque} N·cm · ${balanced ? '★ 完美靜止平衡' : leftTorque > rightTorque ? '左端下傾 (逆時針偏轉)' : '右端下傾 (順時針偏轉)'}`;
  const tilt = balanced ? 0 : leftTorque > rightTorque ? -4 : 4;
  $('#lever-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 140" role="img" aria-label="槓桿平衡">
    <g transform="rotate(${tilt} 200 70)">
      <line x1="${200 - la * 1.6}" y1="70" x2="${200 + ra * 1.6}" y2="70" stroke="#315441" stroke-width="5" stroke-linecap="round"/>
      <line x1="${200 - la * 1.6}" y1="70" x2="${200 - la * 1.6}" y2="105" stroke="#b84735" stroke-width="2.5"/>
      <polygon points="${200 - la * 1.6},108 ${200 - la * 1.6 - 4},100 ${200 - la * 1.6 + 4},100" fill="#b84735"/>
      <line x1="${200 + ra * 1.6}" y1="70" x2="${200 + ra * 1.6}" y2="105" stroke="#3b789e" stroke-width="2.5"/>
      <polygon points="${200 + ra * 1.6},108 ${200 + ra * 1.6 - 4},100 ${200 + ra * 1.6 + 4},100" fill="#3b789e"/>
    </g>
    <!-- Fulcrum triangle -->
    <polygon points="190,95 200,70 210,95" fill="#1e3831"/>
    <text x="${200 - la * 1.6}" y="45" font-size="12" font-weight="700" fill="#b84735" text-anchor="middle">${lf}N (${la}cm)</text>
    <text x="${200 + ra * 1.6}" y="45" font-size="12" font-weight="700" fill="#3b789e" text-anchor="middle">${rf}N (${ra}cm)</text>
  </svg>`;

  // 4. Convex Lens Optics Plot
  const p = num('lens-p'), f = 20, hObj = 25;
  const cx = 200, cy = 90;
  let qText = '', nature = '', q = 0, m = 1;
  if (p === f) {
    qText = '像距 ∞（無窮遠）';
    nature = '不成像（折射光線為平行光束）';
  } else if (p > f) {
    q = (p * f) / (p - f);
    m = q / p;
    qText = `像距 q ＝ ${q.toFixed(1)} cm`;
    if (p > 40) nature = `倒立、縮小實像（照相機模式，m ＝ ${m.toFixed(2)}）`;
    else if (p === 40) nature = `倒立、等大實像（影印機模式，m ＝ 1.00）`;
    else nature = `倒立、放大實像（投影機模式，m ＝ ${m.toFixed(2)}）`;
  } else {
    const qVirt = (p * f) / (f - p);
    m = qVirt / p;
    qText = `虛像距 ＝ ${qVirt.toFixed(1)} cm`;
    nature = `正立、放大虛像（放大鏡模式，m ＝ ${m.toFixed(2)}）`;
  }
  $('#lens-output').textContent = `物距 p＝${p}cm · ${qText} · ${nature}`;

  // Scale: 1cm = 2.4px
  const scale = 2.4;
  const objX = cx - p * scale;
  const objTop = cy - hObj;
  let imgSvg = '';
  if (p > f) {
    const imgX = Math.min(390, cx + q * scale);
    const imgHeight = Math.min(65, hObj * m);
    const imgBottom = cy + imgHeight;
    imgSvg = `
      <line x1="${imgX}" y1="${cy}" x2="${imgX}" y2="${imgBottom}" stroke="#3b789e" stroke-width="2.5"/>
      <polygon points="${imgX},${imgBottom + 4} ${imgX - 4},${imgBottom - 4} ${imgX + 4},${imgBottom - 4}" fill="#3b789e"/>
      <text x="${imgX}" y="${imgBottom + 18}" font-size="11" font-weight="700" fill="#3b789e" text-anchor="middle">實像</text>
      <!-- Rays -->
      <line x1="${objX}" y1="${objTop}" x2="${cx}" y2="${objTop}" stroke="#b84735" stroke-width="1.2"/>
      <line x1="${cx}" y1="${objTop}" x2="${imgX}" y2="${imgBottom}" stroke="#b84735" stroke-width="1.2"/>
      <line x1="${objX}" y1="${objTop}" x2="${imgX}" y2="${imgBottom}" stroke="#45825b" stroke-width="1.2"/>
    `;
  } else if (p < f) {
    const virtX = Math.max(10, cx - (p * f / (f - p)) * scale);
    const imgHeight = Math.min(70, hObj * m);
    const imgTop = cy - imgHeight;
    imgSvg = `
      <line x1="${virtX}" y1="${cy}" x2="${virtX}" y2="${imgTop}" stroke="#6d528f" stroke-width="2.5" stroke-dasharray="3,3"/>
      <polygon points="${virtX},${imgTop - 4} ${virtX - 4},${imgTop + 4} ${virtX + 4},${imgTop + 4}" fill="#6d528f"/>
      <text x="${virtX}" y="${imgTop - 8}" font-size="11" font-weight="700" fill="#6d528f" text-anchor="middle">放大虛像</text>
      <line x1="${objX}" y1="${objTop}" x2="${cx}" y2="${objTop}" stroke="#b84735" stroke-width="1.2"/>
      <line x1="${cx}" y1="${objTop}" x2="${cx + 120}" y2="${cy + (cy - objTop)}" stroke="#b84735" stroke-width="1.2"/>
      <line x1="${objX}" y1="${objTop}" x2="${cx + 120}" y2="${cy + (cx + 120 - cx) * (cy - objTop) / (cx - objX)}" stroke="#45825b" stroke-width="1.2"/>
    `;
  }

  $('#lens-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 180" role="img" aria-label="透鏡成像光路圖">
    <!-- Principal axis -->
    <line x1="10" y1="${cy}" x2="390" y2="${cy}" stroke="#a3b4ab" stroke-width="1.5"/>
    <!-- Convex lens -->
    <ellipse cx="${cx}" cy="${cy}" rx="7" ry="70" fill="#e8f3fa" stroke="#3b789e" stroke-width="2"/>
    <!-- F and 2F points -->
    <circle cx="${cx - 20 * scale}" cy="${cy}" r="3" fill="#1e3831"/><text x="${cx - 20 * scale}" y="${cy + 15}" font-size="10" text-anchor="middle">F</text>
    <circle cx="${cx - 40 * scale}" cy="${cy}" r="3" fill="#1e3831"/><text x="${cx - 40 * scale}" y="${cy + 15}" font-size="10" text-anchor="middle">2F</text>
    <circle cx="${cx + 20 * scale}" cy="${cy}" r="3" fill="#1e3831"/><text x="${cx + 20 * scale}" y="${cy + 15}" font-size="10" text-anchor="middle">F'</text>
    <circle cx="${cx + 40 * scale}" cy="${cy}" r="3" fill="#1e3831"/><text x="${cx + 40 * scale}" y="${cy + 15}" font-size="10" text-anchor="middle">2F'</text>
    <!-- Object Candle -->
    <line x1="${objX}" y1="${cy}" x2="${objX}" y2="${objTop}" stroke="#c4821a" stroke-width="3"/>
    <polygon points="${objX},${objTop - 5} ${objX - 4},${objTop + 3} ${objX + 4},${objTop + 3}" fill="#b84735"/>
    <text x="${objX}" y="${objTop - 8}" font-size="11" font-weight="700" fill="#c4821a" text-anchor="middle">蠟燭</text>
    ${imgSvg}
  </svg>`;

  // 5. Acid-Base Titration & pH Plot
  const naoh = num('naoh-vol');
  let ph = 7;
  if (naoh < 20) {
    const remainH = (2 - naoh * 0.1);
    const conc = remainH / (20 + naoh);
    ph = -Math.log10(conc);
  } else if (naoh === 20) {
    ph = 7.0;
  } else {
    const excessOH = (naoh - 20) * 0.1;
    const conc = excessOH / (20 + naoh);
    ph = 14 + Math.log10(conc);
  }
  ph = Math.max(1, Math.min(13, ph));

  let color = '#45825b';
  if (ph < 3) color = '#d93829';
  else if (ph < 6) color = '#e88a38';
  else if (ph <= 8) color = '#45825b';
  else if (ph < 11) color = '#3b789e';
  else color = '#6d528f';

  const litmus = ph < 6.8 ? '紅色 (酸性)' : ph > 7.5 ? '藍色 (鹼性)' : '紫色 (中性)';
  const phenol = ph < 8.2 ? '無色' : '鮮紅／粉紅色';
  $('#titration-output').textContent = `滴入 NaOH ${naoh} mL ➔ pH ＝ ${ph.toFixed(2)} · 石蕊：${litmus} · 酚酞：${phenol}`;

  $('#titration-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 160" role="img" aria-label="滴定實驗">
    <!-- Burette top -->
    <rect x="185" y="10" width="30" height="60" fill="#f4f7f5" stroke="#778b80" stroke-width="1.8"/>
    <line x1="200" y1="70" x2="200" y2="85" stroke="#778b80" stroke-width="3"/>
    <circle cx="200" cy="92" r="3" fill="#3b789e"/>
    <text x="230" y="45" font-size="11" fill="#3b789e">0.1M NaOH</text>
    <!-- Flask bottom -->
    <polygon points="175,95 225,95 255,145 145,145" fill="${color}" fill-opacity="0.75" stroke="#1e3831" stroke-width="2"/>
    <text x="200" y="130" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle">pH ${ph.toFixed(1)}</text>
    <!-- Indicator badges right -->
    <rect x="280" y="30" width="105" height="45" rx="6" fill="#ffffff" stroke="#d6dfd9"/>
    <text x="332" y="48" font-size="10" fill="#687b74" text-anchor="middle">石蕊試紙</text>
    <text x="332" y="65" font-size="12" font-weight="700" fill="${ph < 7 ? '#d93829' : ph > 7 ? '#3b789e' : '#45825b'}" text-anchor="middle">${litmus}</text>
    <rect x="280" y="85" width="105" height="45" rx="6" fill="#ffffff" stroke="#d6dfd9"/>
    <text x="332" y="103" font-size="10" fill="#687b74" text-anchor="middle">酚酞指示劑</text>
    <text x="332" y="120" font-size="12" font-weight="700" fill="${ph > 8.2 ? '#d93829' : '#687b74'}" text-anchor="middle">${phenol}</text>
  </svg>`;

  // 6. Buoyancy & Density Plot
  const dObj = num('obj-density'), dLiq = num('liq-density');
  const vol = 100;
  const weight = vol * dObj;
  let fraction = 1, buoy = 0, scaleRead = 0, buoyDesc = '';
  if (dObj < dLiq) {
    fraction = dObj / dLiq;
    buoy = weight;
    scaleRead = 0;
    buoyDesc = `浮體 (漂浮) · 浮力 B ＝ 物重 W (${weight.toFixed(0)} gw) · 下沉體積 ${(fraction * 100).toFixed(0)}%`;
  } else if (dObj === dLiq) {
    fraction = 1.0;
    buoy = weight;
    scaleRead = 0;
    buoyDesc = `懸浮 (懸於液中) · 浮力 B ＝ 物重 W (${weight.toFixed(0)} gw)`;
  } else {
    fraction = 1.0;
    buoy = vol * dLiq;
    scaleRead = weight - buoy;
    buoyDesc = `沉體 (沉底) · 浮力 B (${buoy.toFixed(0)} gw) ＜ 物重 (${weight.toFixed(0)} gw) · 視重磅秤讀數 ${scaleRead.toFixed(0)} gw`;
  }
  $('#buoyancy-output').textContent = buoyDesc;

  const tankTop = 55, tankBottom = 145;
  const blockH = 45;
  const subH = blockH * fraction;
  const blockY = dObj < dLiq ? (tankTop - (blockH - subH)) : (tankBottom - blockH);

  $('#buoyancy-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 160" role="img" aria-label="浮力實驗">
    <!-- Liquid tank -->
    <rect x="70" y="45" width="220" height="105" rx="4" fill="#e8f3fa" stroke="#3b789e" stroke-width="2.5"/>
    <line x1="72" y1="${tankTop}" x2="288" y2="${tankTop}" stroke="#3b789e" stroke-width="1.8" stroke-dasharray="3,2"/>
    <text x="78" y="70" font-size="10" font-weight="700" fill="#3b789e">D_液 ＝ ${dLiq.toFixed(1)}</text>
    <!-- Object Block -->
    <rect x="155" y="${blockY}" width="50" height="${blockH}" rx="4" fill="#fdf4e3" stroke="#c4821a" stroke-width="2"/>
    <text x="180" y="${blockY + 26}" font-size="11" font-weight="800" fill="#c4821a" text-anchor="middle">D_物 ${dObj.toFixed(1)}</text>
    <!-- Buoyancy arrow up -->
    <line x1="180" y1="${blockY}" x2="180" y2="${blockY - 18}" stroke="#45825b" stroke-width="2.5"/>
    <polygon points="180,${blockY - 22} 176,${blockY - 15} 184,${blockY - 15}" fill="#45825b"/>
    <text x="180" y="${blockY - 25}" font-size="10" font-weight="700" fill="#45825b" text-anchor="middle">浮力 B</text>
    <!-- Scale panel right -->
    <rect x="305" y="55" width="85" height="85" rx="8" fill="#ffffff" stroke="#d6dfd9"/>
    <text x="347" y="75" font-size="11" fill="#687b74" text-anchor="middle">磅秤讀數</text>
    <text x="347" y="102" font-size="18" font-weight="800" fill="${scaleRead > 0 ? '#b84735' : '#45825b'}" text-anchor="middle">${scaleRead.toFixed(0)} gw</text>
    <text x="347" y="125" font-size="10" fill="#687b74" text-anchor="middle">${scaleRead === 0 ? '完全浮起' : '沉底受力'}</text>
  </svg>`;

  // 7. English Tense
  const person = $('#tense-person').value, time = $('#tense-time').value;
  const sentences = {
    present: `${person} ${person === 'She' ? 'plays' : 'play'} basketball every Sunday.`,
    progressive: `${person} ${person === 'I' ? 'am' : person === 'She' ? 'is' : 'are'} playing basketball now.`,
    past: `${person} played basketball yesterday.`,
    future: `${person} will play basketball tomorrow.`
  };
  $('#tense-output').textContent = sentences[time];
  $('#tense-explanation').textContent = {
    present: '描述常態習慣；第三人稱單數 (She/He/It) 動詞須加 s/es。',
    progressive: '描述此時此刻正進行的動作；由「be 動詞 ＋ V-ing」構成。',
    past: '描述過去確定時間點發生的事實；規則動詞字尾加 -ed。',
    future: '描述未來將要發生的計畫；助動詞 will 後方恆接「原形動詞」。'
  }[time];

  // 8. Moon Phases Plot
  if ($('#moon-day')) {
    const mDay = num('moon-day');
    const theta = (mDay / 29.5) * 2 * Math.PI;
    const mRadius = 70;
    const mx = 200 - mRadius * Math.sin(theta);
    const my = 100 - mRadius * Math.cos(theta);
    let phaseName = '新月 (朔)';
    let illuPct = 0;
    if (mDay < 1.5 || mDay > 28.0) {
      phaseName = '新月 (朔 · 初一)';
      illuPct = 0;
    } else if (mDay < 6.5) {
      phaseName = '眉月 (初二～初六)';
      illuPct = Math.round((mDay / 14.75) * 100);
    } else if (mDay < 8.5) {
      phaseName = '上弦月 (初七～初八)';
      illuPct = 50;
    } else if (mDay < 13.5) {
      phaseName = '盈凸月 (初九～十四)';
      illuPct = Math.round((mDay / 14.75) * 100);
    } else if (mDay < 16.5) {
      phaseName = '滿月 (望 · 十五～十六)';
      illuPct = 100;
    } else if (mDay < 21.5) {
      phaseName = '虧凸月 (十七～廿一)';
      illuPct = Math.round(((29.5 - mDay) / 14.75) * 100);
    } else if (mDay < 23.5) {
      phaseName = '下弦月 (廿二～廿三)';
      illuPct = 50;
    } else {
      phaseName = '殘月 (廿四～廿九)';
      illuPct = Math.round(((29.5 - mDay) / 14.75) * 100);
    }
    if ($('#moon-output')) {
      $('#moon-output').textContent = `農曆第 ${mDay.toFixed(1)} 天 · ${phaseName} · 可見光照度約 ${illuPct}%`;
    }
    if ($('#moon-plot')) {
      $('#moon-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 200" role="img" aria-label="月相模擬">
        <circle cx="200" cy="100" r="${mRadius}" fill="none" stroke="#d6dfd9" stroke-width="1.5" stroke-dasharray="3,3"/>
        <circle cx="200" cy="100" r="16" fill="#e8f3fa" stroke="#3b789e" stroke-width="2"/>
        <text x="200" y="104" font-size="9" font-weight="800" fill="#3b789e" text-anchor="middle">地球</text>
        <g transform="translate(390, 100)">
          <line x1="0" y1="-40" x2="-25" y2="-40" stroke="#c4821a" stroke-width="1.8"/>
          <line x1="0" y1="0" x2="-35" y2="0" stroke="#c4821a" stroke-width="2.2"/>
          <line x1="0" y1="40" x2="-25" y2="40" stroke="#c4821a" stroke-width="1.8"/>
          <text x="-40" y="4" font-size="9" font-weight="800" fill="#c4821a" text-anchor="end">陽光 ➔</text>
        </g>
        <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="9" fill="#1e3831" stroke="#d6dfd9"/>
        <path d="M ${mx.toFixed(1)} ${(my - 9).toFixed(1)} A 9 9 0 0 1 ${mx.toFixed(1)} ${(my + 9).toFixed(1)} Z" fill="#fdf4e3"/>
        <g transform="translate(15, 125)">
          <rect x="0" y="0" width="105" height="65" rx="6" fill="#ffffff" stroke="#d6dfd9"/>
          <text x="52" y="16" font-size="9" font-weight="700" fill="#687b74" text-anchor="middle">地球視角觀測</text>
          <circle cx="52" cy="38" r="14" fill="#1e3831"/>
          ${illuPct > 0 ? (illuPct === 100 ? `<circle cx="52" cy="38" r="14" fill="#c4821a"/>` : `<path d="M 52 24 A 14 14 0 0 ${mDay < 15 ? '1' : '0'} 52 52 Z" fill="#c4821a"/>`) : ''}
          <text x="52" y="60" font-size="8" font-weight="700" fill="#c4821a" text-anchor="middle">${phaseName.split(' ')[0]}</text>
        </g>
      </svg>`;
    }
  }

  // 9. Punnett Square Plot
  if ($('#punnett-p1')) {
    const p1 = $('#punnett-p1').value || 'Tt';
    const p2 = $('#punnett-p2').value || 'Tt';
    const g1 = [p1[0], p1[1]], g2 = [p2[0], p2[1]];
    const offspring = [
      g1[0] + g2[0], g1[1] + g2[0],
      g1[0] + g2[1], g1[1] + g2[1]
    ].map(o => o === 'tT' ? 'Tt' : o);

    const counts = { TT: 0, Tt: 0, tt: 0 };
    offspring.forEach(g => { counts[g] = (counts[g] || 0) + 1; });
    const dominantCount = counts.TT + counts.Tt;
    const recessiveCount = counts.tt;

    if ($('#punnett-output')) {
      $('#punnett-output').textContent = `基因型比 (TT:Tt:tt) ＝ ${counts.TT}:${counts.Tt}:${counts.tt} · 表現型比 (顯性:隱性) ＝ ${dominantCount}:${recessiveCount} (高莖 ${(dominantCount/4*100).toFixed(0)}%, 矮莖 ${(recessiveCount/4*100).toFixed(0)}%)`;
    }
    if ($('#punnett-plot')) {
      $('#punnett-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 160" role="img" aria-label="孟德爾棋盤方格">
        <g transform="translate(60, 20)">
          <text x="100" y="15" font-size="10" font-weight="700" fill="#3b789e" text-anchor="middle">父本配子：${g1[0]} / ${g1[1]}</text>
          <text x="0" y="70" font-size="10" font-weight="700" fill="#c4821a" text-anchor="end">母本配子：${g2[0]} / ${g2[1]}</text>
          <rect x="25" y="25" width="150" height="90" fill="#ffffff" stroke="#d6dfd9" stroke-width="2"/>
          <line x1="100" y1="25" x2="100" y2="115" stroke="#d6dfd9" stroke-width="1.5"/>
          <line x1="25" y1="70" x2="175" y2="70" stroke="#d6dfd9" stroke-width="1.5"/>
          <text x="62" y="55" font-size="14" font-weight="800" fill="${offspring[0]==='tt'?'#b84735':'#2d5c48'}" text-anchor="middle">${offspring[0]}</text>
          <text x="137" y="55" font-size="14" font-weight="800" fill="${offspring[1]==='tt'?'#b84735':'#2d5c48'}" text-anchor="middle">${offspring[1]}</text>
          <text x="62" y="100" font-size="14" font-weight="800" fill="${offspring[2]==='tt'?'#b84735':'#2d5c48'}" text-anchor="middle">${offspring[2]}</text>
          <text x="137" y="100" font-size="14" font-weight="800" fill="${offspring[3]==='tt'?'#b84735':'#2d5c48'}" text-anchor="middle">${offspring[3]}</text>
        </g>
        <g transform="translate(265, 30)">
          <rect x="0" y="0" width="125" height="90" rx="8" fill="#e6f3eb" stroke="#45825b"/>
          <text x="62" y="24" font-size="10" font-weight="800" fill="#2d5c48" text-anchor="middle">子代遺傳機率</text>
          <text x="15" y="48" font-size="10" fill="#223832">顯性高莖：${(dominantCount/4*100).toFixed(0)}%</text>
          <text x="15" y="68" font-size="10" fill="#b84735">隱性矮莖：${(recessiveCount/4*100).toFixed(0)}%</text>
        </g>
      </svg>`;
    }
  }

  // 10. Linear Function Real-Life Plan Comparison
  if ($('#lin-a1')) {
    const a1 = num('lin-a1'), b2 = num('lin-b2'), a2 = num('lin-a2'), xUse = num('lin-x');
    const costA = a1 * xUse;
    const costB = b2 + a2 * xUse;
    const crossX = a1 !== a2 ? b2 / (a1 - a2) : null;
    const maxCost = Math.max(a1 * 20, b2 + a2 * 20, 600);
    const lx = x => 44 + (x / 20) * 336;
    const ly = c => 165 - (c / maxCost) * 140;
    const winner = costA < costB ? `選方案 A 省 ${costB - costA} 元` : (costB < costA ? `選方案 B 省 ${costA - costB} 元` : '兩方案費用完全相同！');
    if ($('#linear-output')) {
      $('#linear-output').textContent = `使用 ${xUse} 次：方案 A＝${costA} 元 vs 方案 B＝${costB} 元 ➔ ${winner}${crossX && crossX > 0 ? `（黃金交叉點約 ${crossX.toFixed(1)} 次）` : ''}`;
    }
    if ($('#linear-plot')) {
      $('#linear-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 190" role="img" aria-label="一次函數方案比較圖">
        <rect x="44" y="18" width="336" height="147" fill="#fbfcfb" stroke="#d6dfd9"/>
        <line x1="${lx(0)}" y1="${ly(0).toFixed(1)}" x2="${lx(20)}" y2="${ly(a1 * 20).toFixed(1)}" stroke="#2b6cb0" stroke-width="2.6"/>
        <line x1="${lx(0)}" y1="${ly(b2).toFixed(1)}" x2="${lx(20)}" y2="${ly(b2 + a2 * 20).toFixed(1)}" stroke="#c05621" stroke-width="2.6"/>
        <line x1="${lx(xUse).toFixed(1)}" y1="18" x2="${lx(xUse).toFixed(1)}" y2="165" stroke="#2f855a" stroke-width="1.5" stroke-dasharray="4,3"/>
        <circle cx="${lx(xUse).toFixed(1)}" cy="${ly(costA).toFixed(1)}" r="4.5" fill="#2b6cb0"/>
        <circle cx="${lx(xUse).toFixed(1)}" cy="${ly(costB).toFixed(1)}" r="4.5" fill="#c05621"/>
        ${crossX && crossX > 0 && crossX <= 20 ? `<circle cx="${lx(crossX).toFixed(1)}" cy="${ly(a1 * crossX).toFixed(1)}" r="5.5" fill="#d69e2e" stroke="#1a352a" stroke-width="1.5"/>` : ''}
        <text x="52" y="34" font-size="9.5" font-weight="700" fill="#2b6cb0">━ 方案 A: y = ${a1}x</text>
        <text x="168" y="34" font-size="9.5" font-weight="700" fill="#c05621">━ 方案 B: y = ${b2} + ${a2}x</text>
        <text x="212" y="182" font-size="9" fill="#687b74" text-anchor="middle">本月使用次數 x（0 ～ 20 次）</text>
      </svg>`;
    }
  }

  // 12. Physics v-t Graph & Braking Distance
  if ($('#vt-speed')) {
    const kmh = num('vt-speed'), tReact = num('vt-react'), decel = num('vt-decel');
    const v0 = kmh / 3.6;
    const tBrake = v0 / decel;
    const tTotal = tReact + tBrake;
    const dReact = v0 * tReact;
    const dBrake = 0.5 * v0 * tBrake;
    const dTotal = dReact + dBrake;
    const maxT = Math.max(tTotal * 1.15, 6);
    const maxV = 36;
    const vx = t => 42 + (t / maxT) * 336;
    const vy = v => 155 - (v / maxV) * 130;
    if ($('#vt-output')) {
      $('#vt-output').textContent = `初速 ${kmh} km/h (${v0.toFixed(1)} m/s)｜反應距離 ${dReact.toFixed(1)} m ＋ 煞車距離 ${dBrake.toFixed(1)} m ＝ 總停車距離 ${dTotal.toFixed(1)} m（耗時 ${tTotal.toFixed(1)} 秒）`;
    }
    if ($('#vt-plot')) {
      $('#vt-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 185" role="img" aria-label="v-t 速度時間圖與停車距離面積">
        <rect x="42" y="20" width="336" height="135" fill="#fbfcfb" stroke="#d6dfd9"/>
        <rect x="${vx(0)}" y="${vy(v0).toFixed(1)}" width="${(vx(tReact) - vx(0)).toFixed(1)}" height="${(155 - vy(v0)).toFixed(1)}" fill="rgba(43,108,176,0.22)" stroke="#2b6cb0"/>
        <polygon points="${vx(tReact).toFixed(1)},${vy(v0).toFixed(1)} ${vx(tTotal).toFixed(1)},155 ${vx(tReact).toFixed(1)},155" fill="rgba(197,48,48,0.22)" stroke="#c53030"/>
        <polyline points="${vx(0)},${vy(v0).toFixed(1)} ${vx(tReact).toFixed(1)},${vy(v0).toFixed(1)} ${vx(tTotal).toFixed(1)},155" fill="none" stroke="#1e3c30" stroke-width="2.6"/>
        <text x="${((vx(0) + vx(tReact)) / 2).toFixed(1)}" y="${Math.min(148, vy(v0) + 18).toFixed(1)}" font-size="8.5" font-weight="700" fill="#2b6cb0" text-anchor="middle">反應 ${dReact.toFixed(0)}m</text>
        <text x="${(vx(tReact) + (vx(tTotal) - vx(tReact)) * 0.35).toFixed(1)}" y="${Math.min(148, (vy(v0) + 155) / 2 + 12).toFixed(1)}" font-size="9" font-weight="700" fill="#c53030" text-anchor="middle">煞車 ${dBrake.toFixed(0)}m</text>
        <text x="36" y="${vy(v0).toFixed(1)}" font-size="8.5" fill="#223832" text-anchor="end">${v0.toFixed(0)}</text>
        <text x="210" y="176" font-size="9" fill="#687b74" text-anchor="middle">時間 t（秒）· 面積＝總位移 ${dTotal.toFixed(1)} 公尺</text>
      </svg>`;
    }
  }

  // 13. Civics Market Supply & Demand Equilibrium
  if ($('#sd-demand')) {
    const dShift = num('sd-demand'), sShift = num('sd-supply'), pCap = num('sd-cap');
    // Demand: P = 100 + dShift - Q ; Supply: P = 20 - sShift + Q
    // Equilibrium: 100 + dShift - Q = 20 - sShift + Q => 2Q = 80 + dShift + sShift
    const qEq = Math.max(5, Math.min(95, (80 + dShift + sShift) / 2));
    const pEq = Math.max(5, Math.min(95, 100 + dShift - qEq));
    const sx = q => 48 + (q / 100) * 320;
    const sy = p => 160 - (p / 110) * 135;
    let capMsg = `自由市場達成均衡：均衡價格 P*＝${pEq.toFixed(0)} 元 · 均衡數量 Q*＝${qEq.toFixed(0)} 單位`;
    let capLine = '';
    if (pCap > 0) {
      const qD = Math.max(0, Math.min(100, 100 + dShift - pCap));
      const qS = Math.max(0, Math.min(100, pCap - (20 - sShift)));
      capLine = `<line x1="48" y1="${sy(pCap).toFixed(1)}" x2="368" y2="${sy(pCap).toFixed(1)}" stroke="#805ad5" stroke-width="2" stroke-dasharray="5,3"/>`;
      if (qD > qS) {
        capMsg = `限價 ${pCap} 元（低於均衡價 ${pEq.toFixed(0)}）：需求量 ${qD.toFixed(0)} ＞ 供給量 ${qS.toFixed(0)} ➔ 🚨 供不應求「短缺 ${(qD - qS).toFixed(0)} 單位」（出現排隊搶購與黃牛！）`;
      } else if (qS > qD) {
        capMsg = `管制價 ${pCap} 元（高於均衡價 ${pEq.toFixed(0)}）：供給量 ${qS.toFixed(0)} ＞ 需求量 ${qD.toFixed(0)} ➔ 📦 供過於求「過剩 ${(qS - qD).toFixed(0)} 單位」（出現庫存滯銷！）`;
      } else {
        capMsg = `管制價 ${pCap} 元恰好等於市場均衡價，市場出清！`;
      }
    }
    if ($('#supply-output')) $('#supply-output').textContent = capMsg;
    if ($('#supply-plot')) {
      $('#supply-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 185" role="img" aria-label="市場供需曲線與均衡價格圖">
        <rect x="48" y="18" width="320" height="142" fill="#fbfcfb" stroke="#d6dfd9"/>
        <line x1="${sx(5)}" y1="${sy(Math.min(108, Math.max(2, 95 + dShift))).toFixed(1)}" x2="${sx(95)}" y2="${sy(Math.min(108, Math.max(2, 5 + dShift))).toFixed(1)}" stroke="#c53030" stroke-width="2.6"/>
        <line x1="${sx(5)}" y1="${sy(Math.min(108, Math.max(2, 25 - sShift))).toFixed(1)}" x2="${sx(95)}" y2="${sy(Math.min(108, Math.max(2, 115 - sShift))).toFixed(1)}" stroke="#2b6cb0" stroke-width="2.6"/>
        ${capLine}
        <circle cx="${sx(qEq).toFixed(1)}" cy="${sy(pEq).toFixed(1)}" r="5.5" fill="#2f855a" stroke="#ffffff" stroke-width="2"/>
        <text x="${(sx(qEq) + 8).toFixed(1)}" y="${(sy(pEq) - 6).toFixed(1)}" font-size="9.5" font-weight="800" fill="#2f855a">E(${qEq.toFixed(0)}, $${pEq.toFixed(0)})</text>
        <text x="60" y="34" font-size="9" font-weight="700" fill="#c53030">━ 需求線 D</text>
        <text x="145" y="34" font-size="9" font-weight="700" fill="#2b6cb0">━ 供給線 S</text>
        <text x="38" y="30" font-size="9" fill="#687b74" text-anchor="end">價 P</text>
        <text x="208" y="177" font-size="9" fill="#687b74" text-anchor="middle">交易數量 Q</text>
      </svg>`;
    }
  }

  // 14. Computing Linear vs Binary Search Visualizer
  if ($('#algo-target')) {
    const arr = Array.from({ length: 16 }, (_, i) => (i + 1) * 4);
    const target = num('algo-target');
    const linPath = [];
    for (let i = 0; i < arr.length; i++) {
      linPath.push(i);
      if (arr[i] === target) break;
    }
    const binPath = [];
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      binPath.push(mid);
      if (arr[mid] === target) break;
      if (arr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    if ($('#search-output')) {
      $('#search-output').textContent = `目標值 ${target}：線性搜尋檢查 ${linPath.length} 次 vs 二分搜尋僅需 ${binPath.length} 次（節省 ${Math.max(0, linPath.length - binPath.length)} 步，資料量 100 萬筆時二分搜尋最多只要 20 步！）`;
    }
    if ($('#search-plot')) {
      const drawRow = (label, path, yOff, hitColor) => {
        const visited = new Set(path);
        const foundIdx = path[path.length - 1];
        return `<text x="10" y="${yOff + 12}" font-size="9.5" font-weight="800" fill="#223832">${label}（共 ${path.length} 步）</text>` +
          arr.map((v, idx) => {
            const x = 10 + idx * 23.8;
            const isFound = idx === foundIdx;
            const isVis = visited.has(idx);
            const fill = isFound ? '#2f855a' : (isVis ? hitColor : '#f4f7f5');
            const fg = isFound || isVis ? '#ffffff' : '#5a6f64';
            return `<rect x="${x.toFixed(1)}" y="${yOff + 18}" width="21" height="24" rx="4" fill="${fill}" stroke="#cbd9cf"/><text x="${(x + 10.5).toFixed(1)}" y="${yOff + 34}" font-size="8.5" font-weight="700" fill="${fg}" text-anchor="middle">${v}</text>`;
          }).join('');
      };
      $('#search-plot').innerHTML = `<svg class="lab-svg" viewBox="0 0 400 132" role="img" aria-label="線性搜尋與二分搜尋步數比較">
        ${drawRow('線性搜尋 O(n)', linPath, 6, '#dd6b20')}
        ${drawRow('二分搜尋 O(log₂n)', binPath, 68, '#2b6cb0')}
      </svg>`;
    }
  }
}
