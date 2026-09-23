// dist/labs.js - Zhixing Academy Interactive Conceptual Simulations
const $ = s => document.querySelector(s);

function range(id, label, min, max, value, step) {
  return `<label class="row" for="${id}" style="margin-top:16px"><span>${label}</span><strong data-value="${id}">${value}</strong></label><input id="${id}" type="range" min="${min}" max="${max}" value="${value}" step="${step}">`;
}

export function renderLabs(main, speak) {
  main.innerHTML = `
    <div class="eyebrow">PREDICT · EXPLORE · EXPLAIN</div>
    <h1>先猜一猜，再動手驗證。</h1>
    <p class="muted">改變變因，觀察即時回饋，將抽象公式轉化為直觀物理與幾何意象。</p>
    <div class="unit-grid">
      <!-- 1. Quadratic Function -->
      <section class="panel">
        <span class="tag">數學 · 二次函數</span>
        <h2 style="margin-top:15px">讓函數的圖形動起來</h2>
        <p class="muted">y＝a(x−h)²＋k。先預測頂點位置與開口方向，再滑動觀察。</p>
        ${range('quad-a', 'a：開口方向與寬窄', -3, 3, 1, 0.5)}
        ${range('quad-h', 'h：水平平移 (左加右減)', -4, 4, 0, 1)}
        ${range('quad-k', 'k：垂直平移 (上加下減)', -4, 4, 0, 1)}
        <div id="quad-plot"></div>
        <div class="lab-output" id="quad-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/math-15">回到二次函數幾何課程 →</a>
      </section>

      <!-- 2. Electric Circuit -->
      <section class="panel">
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
      <section class="panel">
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
      <section class="panel">
        <span class="tag">自然 · 凸透鏡幾何光路</span>
        <h2 style="margin-top:15px">蠟燭成像：虛實與大小動態變化</h2>
        <p class="muted">定焦距 f＝20 cm。拖動物距，即時繪製三條特殊光線並求出像的位置。</p>
        ${range('lens-p', '物距 p（cm，焦距 f＝20cm）', 10, 60, 45, 1)}
        <div id="lens-plot"></div>
        <div class="lab-output" id="lens-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/physics-14">回到凸透鏡成像規律 →</a>
      </section>

      <!-- 5. Acid-Base Titration & pH -->
      <section class="panel">
        <span class="tag">自然 · 酸鹼滴定與 pH</span>
        <h2 style="margin-top:15px">酸鹼中和與指示劑色彩連續漸層</h2>
        <p class="muted">20 mL 的 0.1M HCl 鹽酸，逐漸滴入 0.1M NaOH 鹼液，觀察 pH 突躍與指示劑變色。</p>
        ${range('naoh-vol', '滴入 0.1M 鹼液（mL）', 0, 40, 15, 1)}
        <div id="titration-plot"></div>
        <div class="lab-output" id="titration-output" aria-live="polite"></div>
        <a class="source-link" href="#/lesson/chemistry-5">回到 pH 標度與酸鹼中和 →</a>
      </section>

      <!-- 6. Buoyancy & Density -->
      <section class="panel">
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
      <section class="panel">
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
    </div>
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
  $('#tense-audio').onclick = () => speak($('#tense-output').textContent);
  update();
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
}
