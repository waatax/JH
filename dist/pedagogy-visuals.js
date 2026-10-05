// dist/pedagogy-visuals.js - Instructional Infographics, Charts & Pedagogical Tables
// Built for Zhixing Junior Academy (108 Curriculum Comprehensive Study & Exam Prep)

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ============================================================================
// 1. HOME & OVERVIEW: 3-Year Milestone Roadmap, Spiral SVG & Study Rhythm Matrix
// ============================================================================
export function renderHomeRoadmap() {
  return `
    <section class="panel pedagogy-roadmap-panel" aria-labelledby="milestone-title">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">學科素養 · 循序漸進</span>
        <span class="subtle">依教育部 108 課綱三面九項素養精神規劃</span>
      </div>
      <h2 id="milestone-title" style="margin-top:0;">國中三年全科學習進程與關鍵里程碑</h2>
      <p class="muted">國中學習不是死記片段知識，而是沿著「生活探究 ➔ 抽象建模 ➔ 跨科整合」的認知階梯穩步躍升。</p>
      
      <!-- 3-Year Spiral Progression SVG -->
      <div class="pedagogy-flowchart-wrap">
        <div class="diagram-header">
          <span class="diagram-icon">🚀</span>
          <div class="diagram-title-group">
            <strong>國中三年縱向螺旋學習進階圖</strong>
            <span class="subtle">由具象生活經驗，過渡至抽象數理符號，最終抵達跨領域整合應用</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 540 145" width="100%" height="auto" role="img" aria-label="三年螺旋學習進階圖">
            <rect width="540" height="145" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            <!-- 3 stages cards -->
            <g transform="translate(25, 20)">
              <rect width="145" height="105" rx="8" fill="#e8f3fa" stroke="#3b789e" stroke-width="1.8"/>
              <circle cx="72" cy="22" r="12" fill="#3b789e"/>
              <text x="72" y="26" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">七年級</text>
              <text x="72" y="52" font-size="12" font-weight="800" fill="#3b789e" text-anchor="middle">生活經驗與具象探究</text>
              <text x="72" y="72" font-size="9" fill="#223832" text-anchor="middle">負數與代數初探 · 細胞微觀</text>
              <text x="72" y="88" font-size="8.5" fill="#687b74" text-anchor="middle">臺灣史地 · 敘事結構</text>
            </g>
            <path d="M 175 72 L 200 72" stroke="#45825b" stroke-width="2.5"/><polygon points="200,72 194,68 194,76" fill="#45825b"/>
            <g transform="translate(205, 20)">
              <rect width="145" height="105" rx="8" fill="#e6f3eb" stroke="#45825b" stroke-width="1.8"/>
              <circle cx="72" cy="22" r="12" fill="#45825b"/>
              <text x="72" y="26" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">八年級</text>
              <text x="72" y="52" font-size="12" font-weight="800" fill="#45825b" text-anchor="middle">抽象邏輯與數理建模</text>
              <text x="72" y="72" font-size="9" fill="#223832" text-anchor="middle">乘法公式 · 理化受力與反應</text>
              <text x="72" y="88" font-size="8.5" fill="#687b74" text-anchor="middle">東亞時空 · 完成式文法</text>
            </g>
            <path d="M 355 72 L 380 72" stroke="#45825b" stroke-width="2.5"/><polygon points="380,72 374,68 374,76" fill="#45825b"/>
            <g transform="translate(385, 20)">
              <rect width="145" height="105" rx="8" fill="#fdf4e3" stroke="#c4821a" stroke-width="1.8"/>
              <circle cx="72" cy="22" r="12" fill="#c4821a"/>
              <text x="72" y="26" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">九年級</text>
              <text x="72" y="52" font-size="12" font-weight="800" fill="#c4821a" text-anchor="middle">跨科整合與會考衝刺</text>
              <text x="72" y="72" font-size="9" fill="#223832" text-anchor="middle">圓形幾何 · 天文地科系統</text>
              <text x="72" y="88" font-size="8.5" fill="#687b74" text-anchor="middle">長篇題組 · 歷屆模考演練</text>
            </g>
          </svg>
        </div>
      </div>

      <div class="table-wrap" style="margin-top:20px;">
        <table class="teaching-table">
          <thead>
            <tr>
              <th scope="col" style="width:18%;">年級階段</th>
              <th scope="col" style="width:26%;">核心認知任務</th>
              <th scope="col" style="width:28%;">關鍵學科突破點</th>
              <th scope="col" style="width:28%;">會考與素養準備策略</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">七年級 (國一)<br><span class="subtle">建立學科直覺</span></th>
              <td><strong>從具象經驗過渡至符號運算</strong><br>養成主動閱讀長文、動手做紀錄、釐清因果關係的自學習慣。</td>
              <td><strong>數：</strong>負數與一元一次方程式<br><strong>生：</strong>細胞微觀與生態平衡<br><strong>文：</strong>敘事結構與語法基礎<br><strong>社：</strong>臺灣史地法治生活</td>
              <td>每日 15 分鐘建立固定自學節奏；利用「白話說觀念」向自己解釋，不依賴公式死背。</td>
            </tr>
            <tr>
              <th scope="row">八年級 (國二)<br><span class="subtle">邏輯深化與建模</span></th>
              <td><strong>抽象邏輯推導與實驗探究</strong><br>掌握多步驟數學證明、理化受力與化學計量、時空跨域比較。</td>
              <td><strong>數：</strong>乘法公式、聯立、幾何全等<br><strong>理化：</strong>密度、力與運動、酸鹼反應<br><strong>文：</strong>文言虛字倒裝、議論說服<br><strong>英：</strong>完成式、關係子句</td>
              <td>每次練習落實「錯題間隔複習」；進入互動實驗室動手調變因，加深物理與幾何意象。</td>
            </tr>
            <tr>
              <th scope="row">九年級 (國三)<br><span class="subtle">跨科整合與大考</span></th>
              <td><strong>會考全真模擬與圖表題組突破</strong><br>強化跨文本資訊整合、長篇題組耐心閱讀、非選題完整推導。</td>
              <td><strong>數：</strong>圓形幾何、二次函數極值<br><strong>地科：</strong>板塊、天氣季風、月相日食<br><strong>全科：</strong>歷屆真題與跨單元綜合題</td>
              <td>固定進行計時全真模考；掌握 50 分鐘作文布局；徹底診斷錯題盲點並修復知識破洞。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Daily Study Rhythm & Time Blocking Table -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>每日微步自學節奏與番茄時段規劃指南</caption>
          <thead>
            <tr>
              <th scope="col" style="width:16%;">自學時段</th>
              <th scope="col" style="width:20%;">建議時間長度</th>
              <th scope="col" style="width:34%;">核心學習活動</th>
              <th scope="col" style="width:30%;">大腦認知效益</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">晨間清醒時段</th>
              <td>15 ~ 20 分鐘</td>
              <td>抽取 5~10 張「智能記憶卡」進行主動回想；複習英語核心高頻詞與文法句型。</td>
              <td>睡眠過後皮質醇平穩，提取練習能直接刺激突觸，喚醒日間記憶網絡。</td>
            </tr>
            <tr>
              <th scope="row">午後黃金專注</th>
              <td>25 ~ 35 分鐘 (1 番茄鐘)</td>
              <td>精讀 1 個核心單元：研讀 Stage 01/02 圖解對照表，觀摩 Stage 03 思維鏈。</td>
              <td>利用工作記憶高點攻克抽象數理或理化原理，親自推導一次公式。</td>
            </tr>
            <tr>
              <th scope="row">傍晚動手實作</th>
              <td>20 ~ 30 分鐘</td>
              <td>進入「互動實驗室」調試變因，或完成 Stage 05 費曼筆記與 2 題驗收。</td>
              <td>動手操作即時回饋，將抽象符號轉化為幾何與物理生活直覺。</td>
            </tr>
            <tr>
              <th scope="row">睡前夜間復盤</th>
              <td>10 ~ 15 分鐘</td>
              <td>清空「今日到期錯題」；在腦中默想今天學到的新概念，寫下 1 句精煉心得。</td>
              <td>大腦海馬迴會在夜間慢波睡眠中重播日間提取的記憶，轉化為持久長期記憶。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Features Matrix -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>知行學院教學功能與自學工具導引矩陣</caption>
          <thead>
            <tr>
              <th scope="col">教學輔助工具</th>
              <th scope="col">內建資源規格</th>
              <th scope="col">學習情境與最佳使用時機</th>
              <th scope="col">操作入口</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">188 課核心單元</th>
              <td>188 課精講、188 幅專屬 SVG 圖解、755 列對照表</td>
              <td>預習課堂新觀念、考前單元概念快速打底</td>
              <td><a class="source-link" href="#/courses">全科學習地圖 →</a></td>
            </tr>
            <tr>
              <th scope="row">解題思維鏈</th>
              <td>188 組原創示範、564 個階梯式推理步驟與防呆驗算</td>
              <td>看到題目不知從何下筆時，觀摩專家破題思路</td>
              <td><a class="source-link" href="#/lesson/math-1">各課 Stage 03 →</a></td>
            </tr>
            <tr>
              <th scope="row">互動實驗室</th>
              <td>9 大動態科學與數學模擬（含月相盈虧、孟德爾遺傳）</td>
              <td>抽象定理難以理解時，滑動變因觀察即時圖形反饋</td>
              <td><a class="source-link" href="#/labs">進入實驗室 →</a></td>
            </tr>
            <tr>
              <th scope="row">會考與學測模考</th>
              <td>109~115 會考歷屆、108~115 學測 53 卷 2,216 題</td>
              <td>全真計時模擬考、多選與選填題答案自動核對</td>
              <td><a class="source-link" href="#/exam">模擬考場 →</a></td>
            </tr>
            <tr>
              <th scope="row">智能記憶卡與錯題</th>
              <td>1/3/7/14 天艾賓浩斯間隔提取演算法</td>
              <td>利用零碎時間進行主動回想，將短期記憶轉化為長期記憶</td>
              <td><a class="source-link" href="#/review">錯題與複習 →</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// 2. COURSES / CURRICULUM MAP: 8-Domain Cross-Reference, Cross-Disciplinary Matrix & 5-Stage Method
// ============================================================================
export function renderCurriculumOverview() {
  return `
    <section class="panel pedagogy-domains-panel">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">108 課綱領域架構</span>
        <span class="subtle">全人發展 · 自主行動 · 溝通互動 · 社會參與</span>
      </div>
      <h2>教育部 108 課綱八大領域全科核心素養總覽</h2>
      <p class="muted">本平台將國中三年 188 個核心單元完整對齊八大領域，協助學習者跨越學科藩籬，建立立體化知識網絡。</p>
      
      <div class="table-wrap">
        <table class="teaching-table">
          <thead>
            <tr>
              <th scope="col" style="width:14%;">學習領域</th>
              <th scope="col" style="width:16%;">包含學科</th>
              <th scope="col" style="width:34%;">核心素養與學習重點</th>
              <th scope="col" style="width:36%;">生活實踐與素養評量導向</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">語文領域</th>
              <td>國語文、英語文、本土語文</td>
              <td>文本理解、文意批判、多模態圖表閱讀、跨文化口語與書面表達。</td>
              <td>辨析訊息真偽、清晰表達觀點、會考長篇素養題組閱讀。</td>
            </tr>
            <tr>
              <th scope="row">數學領域</th>
              <td>數學 (數與量、代數、幾何、統計機率)</td>
              <td>符號運算、空間幾何推理、函數建模、數據統計與機率估算。</td>
              <td>財務預算規劃、幾何空間測量、非選擇題步驟合理推導。</td>
            </tr>
            <tr>
              <th scope="row">自然科學領域</th>
              <td>物理、化學、生物、地球科學</td>
              <td>提出問題、規劃與執行探究、分析數據、論證與建立科學模型。</td>
              <td>實驗變因控制、能源與環境永續、氣候變遷與生活科技評估。</td>
            </tr>
            <tr>
              <th scope="row">社會領域</th>
              <td>歷史、地理、公民與社會</td>
              <td>時空脈絡演進、人地互動空間關係、民主法治制度與公共參與。</td>
              <td>歷史史料批判、地圖等高線判讀、公民權益維護與社會議題探究。</td>
            </tr>
            <tr>
              <th scope="row">科技領域</th>
              <td>資訊科技、生活科技</td>
              <td>運算思維、演算法設計、程式控制結構、工程設計與機構製作。</td>
              <td>問題拆解流程圖、材料強度與機構應用、資訊安全與倫理。</td>
            </tr>
            <tr>
              <th scope="row">藝術領域</th>
              <td>視覺藝術、音樂、表演藝術</td>
              <td>藝術審美感知、創意表現、文化脈絡理解與跨媒介展演策劃。</td>
              <td>構圖色彩搭配、樂曲聆賞與情感抒發、肢體協作與戲劇呈現。</td>
            </tr>
            <tr>
              <th scope="row">健康與體育</th>
              <td>健康教育、體育</td>
              <td>身心發展調適、運動技能、人際界線、安全急救與終身運動處方。</td>
              <td>體適能自我管理、運動家精神、健康飲食與風險求助。</td>
            </tr>
            <tr>
              <th scope="row">綜合活動</th>
              <td>家政、童軍、輔導</td>
              <td>生活管理、家庭互動、戶外技能、環境倫理、自我探索與生涯抉擇。</td>
              <td>家務分工與預算管理、戶外無痕山林、情緒覺察與生涯彩虹規劃。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5-Stage Learning Visual SVG -->
      <div class="pedagogy-flowchart-wrap" style="margin-top:24px;">
        <div class="diagram-header">
          <span class="diagram-icon">🧠</span>
          <div class="diagram-title-group">
            <strong>知行五階認知學習法思維架構</strong>
            <span class="subtle">從觀念錨定到費曼輸出 · 打造長期記憶突觸</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 540 130" width="100%" height="auto" role="img" aria-label="五階認知學習法">
            <rect width="540" height="130" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            ${[
              ['01', '觀念錨定', '生活直覺', '#45825b', '#e6f3eb', 20],
              ['02', '圖解對照', '結構辨析', '#3b789e', '#e8f3fa', 125],
              ['03', '思維鏈', '示範破題', '#c4821a', '#fdf4e3', 230],
              ['04', '避坑雷達', '防呆界線', '#b84735', '#faece8', 335],
              ['05', '費曼輸出', '兩題驗收', '#6d528f', '#f0ebf7', 440]
            ].map(([num, title, sub, color, bg, x]) => `
              <g transform="translate(${x}, 20)">
                <rect width="80" height="85" rx="8" fill="${bg}" stroke="${color}" stroke-width="1.8"/>
                <circle cx="40" cy="22" r="12" fill="${color}"/>
                <text x="40" y="26" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">${num}</text>
                <text x="40" y="52" font-size="11" font-weight="800" fill="${color}" text-anchor="middle">${title}</text>
                <text x="40" y="72" font-size="9" fill="#687b74" text-anchor="middle">${sub}</text>
              </g>
              ${x < 440 ? `<path d="M ${x + 85} 62 L ${x + 115} 62" stroke="#45825b" stroke-width="2.5"/><polygon points="${x + 115},62 ${x + 109},58 ${x + 109},66" fill="#45825b"/>` : ''}
            `).join('')}
          </svg>
        </div>
        <p class="diagram-caption" style="text-align:center;font-size:11px;color:#687b74;margin-top:8px;">每一課均嚴格依循五階認知循環，確保學員從「聽懂」躍遷至「能向他人解釋並獨立解題」。</p>
      </div>

      <!-- Cross-Disciplinary Integration Matrix Table -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>會考重大跨領域核心議題與學科概念交集矩陣</caption>
          <thead>
            <tr>
              <th scope="col" style="width:18%;">跨領域核心議題</th>
              <th scope="col" style="width:26%;">主要學科交集</th>
              <th scope="col" style="width:28%;">會考常見素養題組情境</th>
              <th scope="col" style="width:28%;">整合破題思考策略</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">氣候變遷與淨零轉型</th>
              <td><strong>理化 ＋ 地科 ＋ 公民</strong></td>
              <td>溫室氣體碳循環、再生能源發電效率與碳稅碳費外部成本內部化。</td>
              <td>連結化學反應與大氣吸收輻射原理；以經濟誘因分析政府政策工具。</td>
            </tr>
            <tr>
              <th scope="row">假訊息與數據判讀</th>
              <td><strong>數學 ＋ 國文 ＋ 資訊</strong></td>
              <td>長篇新聞報導圖表、統計平均數中位數誤用、網路演算法同溫層效應。</td>
              <td>檢查圖表橫縱軸比例是否刻意扭曲；從文本用字辨識客觀事實與主觀論點。</td>
            </tr>
            <tr>
              <th scope="row">人地互動與區域永續</th>
              <td><strong>地理 ＋ 生物 ＋ 歷史</strong></td>
              <td>水資源分配、外來種入侵生態失衡、大航海時代物種交流與農業轉型。</td>
              <td>結合等高線水系地形與生態食物鏈能量塔；掌握時空因果演進關聯。</td>
            </tr>
            <tr>
              <th scope="row">AI 科技與公民倫理</th>
              <td><strong>科技 ＋ 公民 ＋ 綜合</strong></td>
              <td>演算法偏誤、個人隱私與數位足跡保護、深度偽造 (Deepfake) 法律責任。</td>
              <td>理解資料訓練與密碼加密原理；落實憲法個人隱私權與人格權法律保障。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// 3. SUBJECT PORTALS: Complete 21-Subject Comprehensive Guides, Trends & SVG Mind Maps
// ============================================================================
const SUBJECT_METAS = {
  math: {
    trends: [
      ['數與量運算', '每年固定 2~3 題；質因數分解、科學記號指數律與根式運算', '負數去括號變號粗心、科學記號次方忘記標準化', '先列括號確認正負號；乘除先數負因子個數；檢查指數是否符合 1≤a<10'],
      ['代數與函數', '每年 5~7 題；二元一次聯立、一元一次不等式、二次函數極值', '同乘負數不等號忘記反轉、二次函數頂點平移左加右減搞反', '將答案代回原式檢核；畫簡圖標示開口方向與頂點；確認變數有無非負限制'],
      ['空間與幾何證明', '每年 7~9 題；全等相似判定、三心性質、圓形幾何、非選題大宗', '誤用 SSA 或 AAA 判別全等、圓周角與圓心角關係混淆', '在圖上標註已知條件與等長記號；非選擇題寫清「因為…所以…定理名稱」'],
      ['統計與機率', '每年 3~4 題；盒狀圖 IQR、平均數中位數比較、等可能樣本空間', '誤以為盒狀圖箱子長代表人數多；樹狀圖漏算不放回情境', '記住箱體代表中間約 50% 資料；用二維表格列出所有等可能樣本點']
    ],
    strategy: '先搶穩前 15 題基礎題；遇到幾何題一定要自己動手畫輔助線；非選擇題嚴格保留推導算式與單位。'
  },
  physics: {
    trends: [
      ['力與運動', '合力為零等速直線、牛頓運動定律、浮力與壓力公式', '誤以為等速前進物體受力為零、浮體排開體積看成全部體積', '畫隔離物體受力圖；浮體必有 B＝W；完全浸沒時排開體積固定'],
      ['波動與光學', '聲波反射折射、凸透鏡物距與像距變化規律', '虛像誤以為可在紙屏上承接、聲速隨介質密度變化混淆', '背熟凸透鏡五大成像區間；聲音在固體中最快、光在真空中最快'],
      ['電與磁', '歐姆定律、串聯並聯電流電壓、電功率與電磁感應', '忘記串聯電流處處相等；發電機與馬達能量轉換混淆', '確認電路節點通路；用 P＝V²/R 或 P＝I²R 計算耗電；動生電用冷次定律判方向']
    ],
    strategy: '理化重在物理圖像。讀題先畫出受力圖與光路圖，再套公式；注意單位統一（g 與 kg、cm³ 與 m³）。'
  },
  chemistry: {
    trends: [
      ['物質組成與反應', '質量守恆、莫耳數換算、化學計量四部曲', '直接以公克數比當作反應係數比；化學式下標隨意更改', '先配平化學方程式；換算成「莫耳數」才能按係數比計算；確認反應物有無過量'],
      ['水溶液與酸鹼', 'pH 標度、酸鹼中和反應、常見生活鹽類', '酸稀釋後誤以為 pH 會大於 7；觸摸品嘗辨別酸鹼', '25°C 下中性 pH＝7；強酸強鹼中和必釋熱；酚酞酸無色鹼紅色記牢'],
      ['有機與生活材料', '烴類、醇酸酯化反應、熱塑性與熱固性聚合物', '將有機聚合物與小分子混淆；酯化反應催化劑忘記濃硫酸', '鏈狀可加熱塑形；網狀耐高溫不熔化；酯類不溶於水有水果香味']
    ],
    strategy: '化學計量先轉莫耳數；實驗題仔細觀察器材安裝順序（如排水集氣法先移導管再熄酒精燈）。'
  },
  biology: {
    trends: [
      ['細胞與體內恆定', '細胞膜擴散滲透、光合作用、神經與內分泌調節', '將酵素受質專一性與溫度變性條件混淆；水分散失途徑', '消化酵素具專一性；植物水分運輸主要靠葉片蒸散拉力；血液循環體與肺雙循環'],
      ['生殖與遺傳', '細胞分裂與減數分裂染色體套數、棋盤方格單性雜交', '減數分裂染色體複製次數算成兩次；性聯遺傳男女機率', '減數分裂「複製一次、分裂兩次」2n➔n；畫棋盤方格精確算出子代表現型比'],
      ['演化與生態系', '達爾文天擇說、碳循環、食物鏈能量塔金字塔', '用拉馬克用進廢退解釋天擇；誤以為能量在食物鏈可循環', '天擇關鍵是「先有變異，環境篩選」；能量金字塔每層只有約 10% 傳遞']
    ],
    strategy: '生物重在生理機制流程。圖表題務必分清對照組與實驗組操縱變因；注意顯性隱性遺傳條件。'
  },
  earth: {
    trends: [
      ['固體地球與地質', '地層疊置、截切定律、正逆斷層、板塊邊界特徵', '誤將逆斷層受張力拉扯；侵蝕與沉積地形分布混淆', '上盤向上為逆斷層（受擠壓力）；聚合板塊多褶皺逆斷層；河流上游侵蝕下游沉積'],
      ['大氣水文與氣候', '天氣鋒面符號、臺灣冬夏季風雨量、颱風與副熱帶高壓', '冷鋒過境前後氣溫風向變化；誤將滯留鋒當成晴朗天氣', '冷鋒後降雨、暖鋒前降雨；臺灣冬季東北季風迎風面東北部多雨、夏季西南季風南部多雨'],
      ['天文與地球運動', '黃赤交角 23.5° 四季變化、月相日食幾何位置、星空周日運動', '將月相盈虧原因誤解為地球影子遮蔽；滿月當天誤認有日食', '月相是月球反射陽光的「日地月視角幾何」；初一朔、十五望；地球自西向東自轉']
    ],
    strategy: '地科是幾何與空間科學。讀題時在腦中建立立體地球公轉與板塊截面圖，特別注意方位視角。'
  },
  chinese: {
    trends: [
      ['白話文本理解', '篇章主旨、深層意涵推論、跨文本觀點對比', '僅憑個人主觀感受作答，忽略文本內部的具體文句證據', '答案必定能從文章字裡行間找到對應證據；注意作者的情感轉折語詞'],
      ['文言文閱讀', '文意脈絡、寓言哲理、文言虛字與省略主語', '逐字硬套字典解釋，忽略文言省略句與賓語前置倒裝', '先找出句子的主語與受詞；善用上下文對仗與對比推敲生字詞意'],
      ['圖表與資訊整合', '統計圖表文字化、長篇非連續性文本客觀萃取', '將圖表中的相關性直接當成因果關係；過度推論', '先看圖表標題、橫縱軸單位與極值；交叉比對文章論點是否有數據佐證']
    ],
    strategy: '文意理解題先看題幹問什麼，再帶著問題回文本定位關鍵句；做刪去法排除「過度推論」與「無中生有」選項。'
  },
  english: {
    trends: [
      ['單字與文法克漏字', '基礎 1,200 字詞彙、動詞時態一致、關係子句、使役授予動詞', '忽略時間副詞導致時態選錯；被動語態忘記 be 動詞', '找時間線索定時態；主詞單複數確認動詞形式；介系詞固定搭配熟記'],
      ['長篇閱讀題組', '圖表菜單公告、電子郵件對話、論說與科普跨文本', '被少數生字卡住影響作答節奏；誤選過於狹隘的選項', '先快速掃描 (Skimming) 主旨與首尾段；再帶著題目細節精確定位 (Scanning)'],
      ['英語聽力測驗', '圖片理解、簡短對話、日常生活廣播與長對話', '只抓到單一關鍵字就倉促作答，忽略否定詞 not 或 but 轉折', '聽力播放前先看題目選項預測情境；聽時專注抓 5W1H (Who, When, Where, What)']
    ],
    strategy: '閱讀長題組不要害怕生詞，利用上下文線索猜測詞意；英聽保持心態沉穩，聽第二遍時核對細節。'
  },
  history: {
    trends: [
      ['臺灣史時空演進', '大航海時代、清領初期與開港通商、日治殖民統治、戰後民主發展', '混淆清領前期開港前後土地制度、日治三個時期統治政策混雜', '以重大轉折事件為節點（如1860開港通商轉為出口導向、1895割臺、二二八事件）'],
      ['中國與東亞跨域', '封建到郡縣、絲路商貿、唐宋變革與士大夫社會、明清海禁與朝貢', '死記朝代年號而忽略社會經濟變遷因果；儒家正統單一觀點', '掌握政治制度、商業經濟（宋代交子紙幣、市舶司）與文化互動脈絡'],
      ['世界歷史與全球化', '希臘羅馬古典、文藝復興與宗教改革、大航海與啟蒙運動、兩次大戰冷戰', '將啟蒙思想家主張（洛克天賦人權、孟德斯鳩三權分立）搞混', '抓住世界體系形成主線：地理大發現連接全球商貿 ➔ 工業革命加劇帝國擴張']
    ],
    strategy: '歷史是「時間軸與因果網」的交織。讀題先抓年代、關鍵人物與地景名詞，連結其背後的時代制度特徵。'
  },
  geography: {
    trends: [
      ['地理空間與圖表', '經緯度座標、等高線地形圖、氣候圖氣溫降水、人口金字塔判讀', '看錯氣候圖半球位置（南半球 7 月低溫）；混淆山脊與山谷等高線', '等高線凸向低處為山脊、凸向高處為山谷；氣溫年溫差小且全年多雨多為熱帶雨林'],
      ['臺灣地理環境', '臺灣地形五大分區、季風氣候迎風背風、水資源與河川短急、區域發展', '看錯冬夏季風迎風面（基隆迎東北風、恆春落山風）；忽視斷層縱谷', '結合地形阻擋分析地形雨；理解板塊擠壓造成高山林立、河川短促水力豐但流急'],
      ['世界區域地理', '亞洲、歐洲、美洲、非洲與大洋洲的自然地景與跨國經貿', '將熱帶莽原與地中海型氣候乾季分布搞反；忽視板塊交界地震帶', '牢記行星風系與洋流分佈；地中海型氣候夏乾冬雨、西風帶迎風面溫帶海洋全年溫和']
    ],
    strategy: '地理是「人地關係的空間科學」。讀題必先辨別地圖圖名、圖例、方向標與比例尺，從海陸位置推論氣候。'
  },
  civics: {
    trends: [
      ['民主法治與制度', '五權憲法分立制衡、中央政府職權、地方自治、選舉制度與公民投票', '混淆行政院提出覆議與立法院提出不信任案；誤將行政命令位階等同法律', '憲法位階最高；行政權負責施政、立法權審查預算與法律、司法權解釋憲法與裁判'],
      ['法律生活與人權', '憲法基本權利、民事損害賠償責任、刑事責任與刑罰、少年事件處理法', '混淆民事責任（填補損害）與刑事責任（處罰罪責）；忘記契約自由原則', '民法著重私法自治；刑法採罪刑法定主義；少年事件處理法著重保護與輔導性格'],
      ['經濟與公共生活', '機會成本、市場供需法則、外部效果內部化、政府經濟角色與全球貿易', '將需求量變動（點在線上移）與需求變動（整條線平移）混為一談', '價跌量增為需求法則、價漲量增為供給法則；外部成本藉課稅或收費內部化']
    ],
    strategy: '公民生活即考點。讀題先辨識當事人身分、行為涉及哪一部實體法規，以及各項制度的制衡牽制關係。'
  },
  computing: {
    trends: [
      ['運算思維與演算法', '問題拆解、模式識別、抽象化、流程圖標準符號與搜尋排序邏輯', '二分搜尋法忘記資料必須先排序；流程圖菱形分支缺少條件標籤', '演算法三要素：有限性、明確性、有效性；二分搜尋法每次縮小一半搜尋範圍'],
      ['程式設計基礎', '變數型態、循序分支迴圈三大控制結構、函式模組化與陣列清單', '無窮迴圈缺乏終止條件；陣列索引從 0 開始造成差一錯誤 (Off-by-one)', '用表格逐步追蹤變數每一步的值 (Trace Table)；模組化拆解提升可讀性'],
      ['資訊安全與網路', 'IP 位址、DNS 轉譯、HTTPS 加密、密碼防護與資安 CIA 三要素', '將隨身碟病毒與網路釣魚郵件混淆；公用 Wi-Fi 未加密傳送帳密', '機密性 (C)、完整性 (I)、可用性 (A)；雙重驗證 (2FA) 防護帳號安全']
    ],
    strategy: '資訊重在邏輯步驟追蹤。用紙筆手繪流程圖與追蹤表，釐清輸入、運算與輸出結果。'
  },
  technology: {
    trends: [
      ['工程設計思維', '定義問題、限制條件、方案發想、原型製作 (Prototype) 與測試迭代', '忽略限制條件（成本、時間、材料）直接跳入製作；缺乏測試數據', '工程非一次成功，重點在發現問題後回到前一步修正，形成迭代循環'],
      ['材料結構與機構', '木材金屬塑膠材料特性、三角形桁架抗形變、齒輪傳動比與連桿機構', '四邊形易變形未加斜撐；大齒輪帶動小齒輪轉速與扭矩算反', '大齒輪帶動小齒輪為增速減扭；連桿可轉換旋轉運動為往復直線運動'],
      ['能源與永續製造', '再生能源（風力太陽能）、3D 列印減法加法製造、產品生命週期 LCA', '誤將不可回收熱固性塑膠當成熱塑性；忽略產品廢棄回收成本', '綠色設計重視搖籃到搖籃循環經濟；評估產品從原料、製造、使用到回收的全程碳足跡']
    ],
    strategy: '生科重在手腦並用。先分析材料與機構受力，安全規範擺第一，遵循工程標準流程。'
  },
  visual: {
    trends: [
      ['色彩與形式美', '色相明度彩度、對比與調和、三分構圖法、黃金分割與視覺焦點', '互補色混淆（紅綠、藍橙、黃紫）；構圖主體偏離視覺動線', '善用對比突出焦點；三分法將主角置於井字交點營造動態張力'],
      ['透視與創作媒材', '一點與二點線性透視消逝點、地平線、水彩壓克力素描炭筆特質', '透視消逝點不在視平線上；水彩重疊過早造成畫面髒濁', '平行線匯聚於消逝點表現近大遠小；水彩注重透明渲染層次'],
      ['藝術鑑賞與策展', '描述形式、分析結構、詮釋文化意涵、評估審美價值四步鑑賞法', '主觀喜好代替客觀形式分析；忽略藝術品所處時代社會背景', '先客觀描述畫面元素，再連結文化脈絡，提出有證據支持的美學評價']
    ],
    strategy: '視覺藝術從觀察出發。先用眼睛捕捉光影結構，再用心體會創作者傳達的情感與文化底蘊。'
  },
  music: {
    trends: [
      ['節奏拍號與旋律', '音符長度金字塔、4/4與3/4與6/8拍強弱律動、旋律線條起伏', '複拍子 6/8 算成六大拍而非兩大拍；休止符長度漏算', '4/4 拍「強弱次強弱」、3/4 拍「強弱弱」；拍號下數字為基準音符、上數字為每小節拍數'],
      ['樂器音色與合奏', '管弦樂團四大樂器家族發聲原理、織體結構（單音、主調、複調）', '木管樂器長笛與銅管發聲混淆；雙簧管單簧管簧片結構不分', '弦樂靠弓弦振動、木管靠簧片或吹孔空氣柱、銅管靠唇部振動；合奏需聆聽聲部平衡'],
      ['音樂文化與創作', '動機發展（重複/對比/變奏）、傳統五聲音階（宮商角徵羽）、世界民族音樂', '五聲音階誤以為有半音（無 4/Fa 與 7/Ti）；民謠風格混亂', '五聲音階無半音和諧悠遠；世界音樂反映各民族生活祭典與宇宙觀']
    ],
    strategy: '音樂是時間與聽覺的藝術。用心聆聽音色層次與聲部對位，體會樂句呼吸與情感起伏。'
  },
  performing: {
    trends: [
      ['身體聲音與舞台', '舞台方位九宮格（上中下、左右）、腹式呼吸支撐、聲音共鳴投影', '以觀眾視角錯判舞台左右（應以演員面向觀眾的視角為準）', '演員面向觀眾，下舞台近觀眾、上舞台遠；腹式呼吸氣流支撐確保後排聽清'],
      ['角色衝突與即興', '角色目標障礙衝突、戲劇張力三幕弧線、即興表演「Yes, and...」原則', '即興表演直接否定搭檔情境 (Say No)；角色目標模糊無障礙', '戲劇本質是衝突；即興表演嚴守「認同並加碼推進」原則，推動情節向前'],
      ['劇場演製合作', '編導演員、燈光音效舞台服裝、技術彩排與演後結構化反思', '聲光 Cue 點缺乏整體節奏配合；演後回饋缺乏具體行動建議', '演製是跨領域協作；先肯定亮點，再針對節奏與走位提出具體改進策略']
    ],
    strategy: '表演透過身體空間傳遞生命經驗。放下防衛、信任搭檔，在衝突與轉折中展現角色心境。'
  },
  health: {
    trends: [
      ['身心健康與界線', '生理心理社會全人健康、青春期生心理個別差異、身體自主權同心圓', '誤將身體界線視為他人要求；人際溝通模糊不敢拒絕', '身體自主權原則：自由知情同意，隨時可以說不；尊重他人拒絕'],
      ['飲食營養與安全', '六大類食物、我的餐盤黃金比例、營養標示反式脂肪熱量換算', '看食品標示忘記乘以「包裝份數」；盲目節食缺乏三大營養素', '菜比水果多一點、飯跟蔬菜一樣多；計算總熱量與鈉含量需乘以總份數'],
      ['疾病預防與急救', '傳染病傳播鏈（病原/途徑/宿主）、急救成人 CPR＋AED (叫叫CD)', 'CPR 按壓位置錯誤；AED 語音分析心律時未離開傷患', '切斷傳播鏈任一環節可防疫；CPR 兩乳連線中點每分 100~120 下、深 5 公分']
    ],
    strategy: '健康是終身自主管理的資產。養成正確生活習慣，學會求助管道與危機急救技能。'
  },
  pe: {
    trends: [
      ['運動處方與心率', '運動處方 FITT 原則、最大心率估算 (220-年齡)、有氧運動目標區間', '熱身收操草率省略導致拉傷；過度高強度缺乏漸進性', '有氧燃脂心肺區間為最大心率 60%~80%；運動三部曲：熱身 ➔ 主運動 ➔ 伸展收操'],
      ['球類策略與空間', '進攻拉開空間傳切走位、防守縮小空間對球施壓輪轉協防', '持球者單打獨鬥忽略傳球空檔；防守只看球漏掉背後進攻者', '進攻製造人數優勢 (2 on 1)；防守人球兼顧，弱側協防保護禁區'],
      ['健康體適能要素', '心肺耐力、肌力肌耐力、柔軟度、身體組成與運動員精神', '只注重力量忽視柔軟度拉伸；比賽落後出現情緒化犯規', '全方位體適能預防運動傷害；遵守公平競賽 (Fair Play)，勝不驕敗不餒']
    ],
    strategy: '體育不僅鍛鍊體魄，更培養意志力與團隊合作。在規則中全力以赴，尊重對手與裁判。'
  },
  home: {
    trends: [
      ['生活與時間管理', '艾森豪重要緊急四象限矩陣、家庭分工協商契約、生活空間整理 5S', '永遠在救火緊急事件缺乏前瞻規劃；家務固定由特定性別承擔', '主動投資「重要但不緊急」第二象限；家庭會議依能力時間公平分工'],
      ['飲食製備與衣物', '食品安全五要（生熟分開/中心溫度70°C）、國際衣物洗標辨識', '熟食未達安全溫度引起食物中毒；禁漂白高溫烘乾衣物縮水毀損', '危險溫度帶 7~60°C；看懂洗標水洗、漂白、烘乾、熨燙圖示保護衣物'],
      ['理性消費與理財', '需要 vs 想要區分、機會成本、收入預算儲蓄公式「收入−儲蓄＝支出」', '先花費再存錢淪為月光族；網購衝動消費忽略退換貨權益', '掌握「收入−儲蓄＝支出」先存再花；消保法 7 天鑑賞期保護消費者']
    ],
    strategy: '家政是美好生活實踐的科學。從一餐一飯、衣物照護到預算收支，建立自律獨立的生活能力。'
  },
  scout: {
    trends: [
      ['戶外安全與繩結', '登山三層穿搭法（排汗保暖防雨）、三大實用繩結（平結/雙套結/稱人結）', '穿純棉衣物登山吸汗失溫；繩結用途混淆受力鬆脫', '純棉衣物吸汗不乾為山難殺手；平結接等粗繩、雙套結固定營柱、稱人結救生圈'],
      ['定向越野與地圖', '席爾瓦指北針 360° 方位角判讀、等高線地形圖疏密山脊山谷辨別', '紅針入紅屋操作錯誤；誤將山脊當山谷（山脊凸向低處、山谷凸向高處）', '等高線密坡度陡、等高線疏坡度緩；迷途時留在原地 (STOP) 往稜線吹哨求援'],
      ['無痕山林與服務', '無痕山林 LNT 七大準則、社區服務學習反思循環（準備/行動/反思/慶賀）', '在野外亂扔果皮廚餘（分解緩慢破壞生態）；服務學習流於形式無反思', '只留足跡不留垃圾；服務中看見他人需求與自身價值，落實童軍人生以服務為目的']
    ],
    strategy: '童軍注重做中學與團隊分工。做好萬全準備，尊重大自然，在服務行動中體現公民擔當。'
  },
  guidance: {
    trends: [
      ['情緒覺察與溝通', '薩提爾情緒冰山理論（外顯行為到內在渴望）、非暴力溝通 NVC 四要素', '以憤怒指責掩飾受傷脆弱感受；溝通時習慣道德評判引發防衛', '情緒冰山看懂行為背後的愛與安全感；NVC「觀察 ➔ 感受 ➔ 需要 ➔ 請求」化解衝突'],
      ['高效自主學習', '番茄工作法、康奈爾筆記法、費曼學習法白話輸出、間隔提取演算法', '盲目重讀劃線缺乏主動提取；長時間熬夜工作記憶超載', '25分鐘短衝刺防拖延；白話解釋給朋友聽檢驗真正理解；間隔複習建立永久記憶'],
      ['生涯探索與決策', '何倫碼 RIASEC 職業興趣六角形、高中職五專群科特色、SWOT 決策分析', '依他人期望盲從熱門科系；單次測驗直接定終生忽略動態探索', '六角形相鄰共通性高；結合興趣、優勢能力與價值觀，多元試探描繪生涯彩虹']
    ],
    strategy: '輔導是探索內在自我與世界的羅盤。認識自己的獨特性，學習自我接納，自信邁向未來。'
  },
  local: {
    trends: [
      ['本土語文多樣性', '臺灣台語、臺灣客語、臺灣原住民族語、馬祖語與臺灣手語文化拼圖', '以單一強勢語言為優劣標準；忽略手語為完整自然語言', '本土語文皆具文化平等地位；手語透過手形方位表情構建三維視覺語法'],
      ['在地情境與生活語用', '市場生活問候、飲食民俗諺語、跨世代祖孫對話、在地故事口述', '死記生字無法於情境中開口；長輩對話缺乏文化同理心', '從一日三餐與日常問候開口講母語；體會諺語中蘊含的先民生活智慧'],
      ['語言記錄與文化復振', '社區耆老口述歷史採集、臺羅/客拼記音建檔、數位保存與青年創作行動', '語言斷層缺乏跨世代傳承；母語僅停留在課堂未走入家庭', '錄下長輩的童年回憶或拿手菜故事；將母語融入音樂繪本與現代數位社群']
    ],
    strategy: '母語是靈魂與土地的連結。多聽、多講、不怕說錯，在日常生活中讓母語自然傳承流動。'
  }
};

export function renderSubjectGuide(s) {
  const meta = SUBJECT_METAS[s.id] || SUBJECT_METAS[s.domain === '自然科學' ? 'physics' : s.domain === '社會' ? 'geography' : 'math'] || {
    trends: [
      ['核心概念理解', '考查本學科基礎原理與核心名詞定義', '死記片面名詞缺乏整體結構認知', '先梳理知識脈絡，用自己的話解釋關鍵詞'],
      ['情境生活應用', '將學科原理融入日常生活或實作任務情境中', '無法將真實問題抽象為學科模型', '主動聯想生活常見案例，多做變因與因果推導']
    ],
    strategy: '以課綱核心素養為本，結合實作體驗與自主探索，深化學習動機。'
  };

  return `
    <section class="panel pedagogy-subject-panel" style="margin-top:24px;">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">會考趨勢 · 高分攻略</span>
        <span class="subtle">依大考中心評量目標與近七年題型大數據分析</span>
      </div>
      <h2>${esc(s.name)}：會考命題趨勢、高頻題型與破題策略</h2>
      <p class="muted">${esc(s.name)}在 108 課綱下強調生活情境化與素養導向題組。以下歸納核心命題向度與應考策略：</p>
      
      <div class="table-wrap">
        <table class="teaching-table">
          <thead>
            <tr>
              <th scope="col" style="width:18%;">核心主題範疇</th>
              <th scope="col" style="width:26%;">會考命題趨勢與代表題型</th>
              <th scope="col" style="width:26%;">考場常見陷阱與盲點</th>
              <th scope="col" style="width:30%;">高分破題策略指南</th>
            </tr>
          </thead>
          <tbody>
            ${meta.trends.map(([cat, trend, pitfall, tip]) => `
              <tr>
                <th scope="row">${esc(cat)}</th>
                <td>${esc(trend)}</td>
                <td style="color:#b84735;">⚠️ ${esc(pitfall)}</td>
                <td style="color:#2d5c48;">💡 ${esc(tip)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="callout" style="margin-top:18px;">
        <strong>🎯 ${esc(s.name)} 高效自學心法：</strong>
        <span>${esc(meta.strategy)}</span>
      </div>
    </section>
  `;
}

// ============================================================================
// 4. EXAM STRATEGY: CAP 5-Subject Pacing, Time Allocation & 3-Step Mindset SVG
// ============================================================================
export function renderExamStrategy() {
  return `
    <section class="panel pedagogy-exam-panel" style="margin-top:28px;">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">會考應試 · 考場策略</span>
        <span class="subtle">作答節奏控制 · 審題防呆機制 · 穩拿每一分</span>
      </div>
      <h2>國中教育會考各科時間分配、題數與作答節奏速查表</h2>
      <p class="muted">會考考的不僅是知識儲備，更是「作答節奏與心理穩定度」。合理的每題配時能大幅減少粗心失誤，確保寫完並有充裕時間檢查。</p>
      
      <div class="table-wrap">
        <table class="teaching-table">
          <thead>
            <tr>
              <th scope="col" style="width:14%;">考試科目</th>
              <th scope="col" style="width:14%;">官方時間</th>
              <th scope="col" style="width:16%;">官方題數規格</th>
              <th scope="col" style="width:28%;">建議每題分配時間與節奏</th>
              <th scope="col" style="width:28%;">難題跳過與檢查底線策略</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">國文科</th>
              <td>70 分鐘</td>
              <td>40 ~ 42 題選擇</td>
              <td>前 20 題單題每題約 1 分鐘；後續長篇題組每篇約 3~4 分鐘。</td>
              <td>預留最後 10 分鐘檢查劃卡與疑義題。先看題幹問句，再回文本定位。</td>
            </tr>
            <tr>
              <th scope="row">英語科 (閱讀)</th>
              <td>60 分鐘</td>
              <td>40 ~ 43 題選擇</td>
              <td>單字文法單題每題約 45 秒；長篇跨文本圖表題組每組約 4 分鐘。</td>
              <td>預留 8 分鐘核對劃卡。遇到生詞不慌張，透過上下文因果推敲詞義。</td>
            </tr>
            <tr>
              <th scope="row">英語科 (聽力)</th>
              <td>25 分鐘</td>
              <td>21 題選擇 (播 2 次)</td>
              <td>播放間隔約 5~10 秒。第一遍專注抓 5W1H；第二遍確認細節與否定詞。</td>
              <td>趁播放說明空檔先瀏覽題目選項；聽力不回頭，當機立斷不影響下一題。</td>
            </tr>
            <tr>
              <th scope="row">數學科</th>
              <td>80 分鐘</td>
              <td>23~25 題選＋2 題非選</td>
              <td>選擇題每題約 1.8 分鐘 (共約 45 分)；非選擇 2 題各留 12 分鐘。</td>
              <td>選擇題卡住逾 2 分鐘立刻標記跳過；非選題寫清未知數、幾何定理與單位。</td>
            </tr>
            <tr>
              <th scope="row">社會科</th>
              <td>70 分鐘</td>
              <td>50 ~ 54 題選擇</td>
              <td>每題平均 1 分鐘。圖表題與題組較長者預留 1.5 分鐘。</td>
              <td>預留 8~10 分鐘巡檢。注意題幹「何者為非」、「最主要原因」等關鍵題眼。</td>
            </tr>
            <tr>
              <th scope="row">自然科</th>
              <td>70 分鐘</td>
              <td>48 ~ 52 題選擇</td>
              <td>每題平均 1 分鐘。理化計算與實驗題組預留 1.5~2 分鐘。</td>
              <td>預留 10 分鐘回驗理化單位（g/kg、cm³/m³）與電路正負極、化學係數。</td>
            </tr>
            <tr>
              <th scope="row">寫作測驗</th>
              <td>50 分鐘</td>
              <td>1 題引導寫作</td>
              <td>審題構思 7 分鐘 ➔ 動筆寫作 35 分鐘 (約 600~800 字) ➔ 檢查標點 8 分鐘。</td>
              <td>切忌提筆就寫！先擬妥「起承轉合」四段大綱，結尾務必點題昇華。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Exam Mindset 3-Step SVG -->
      <div class="pedagogy-flowchart-wrap" style="margin-top:24px;">
        <div class="diagram-header">
          <span class="diagram-icon">🎯</span>
          <div class="diagram-title-group">
            <strong>考場高分作答破題三部曲流程圖</strong>
            <span class="subtle">圈出題眼 ➔ 刪去干擾 ➔ 逆向驗算 · 拒絕無謂失分</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 540 130" width="100%" height="auto" role="img" aria-label="會考破題三部曲">
            <rect width="540" height="130" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            <g transform="translate(35, 20)">
              <rect width="135" height="90" rx="8" fill="#e8f3fa" stroke="#3b789e" stroke-width="1.8"/>
              <text x="67" y="26" font-size="11" font-weight="800" fill="#3b789e" text-anchor="middle">第一部 · 審題圈題眼</text>
              <line x1="15" y1="36" x2="120" y2="36" stroke="#3b789e" stroke-width="1" stroke-dasharray="2,2"/>
              <text x="67" y="56" font-size="8.5" fill="#223832" text-anchor="middle">圈出「限制條件」與「非者」</text>
              <text x="67" y="72" font-size="8" fill="#687b74" text-anchor="middle">幾何圖上標註已知等長角</text>
            </g>
            <path d="M 175 65 L 200 65" stroke="#45825b" stroke-width="2.5"/><polygon points="200,65 194,61 194,69" fill="#45825b"/>
            <g transform="translate(205, 20)">
              <rect width="135" height="90" rx="8" fill="#e6f3eb" stroke="#45825b" stroke-width="1.8"/>
              <text x="67" y="26" font-size="11" font-weight="800" fill="#45825b" text-anchor="middle">第二部 · 刪去干擾項</text>
              <line x1="15" y1="36" x2="120" y2="36" stroke="#45825b" stroke-width="1" stroke-dasharray="2,2"/>
              <text x="67" y="56" font-size="8.5" fill="#223832" text-anchor="middle">排除「過度推論」無中生有</text>
              <text x="67" y="72" font-size="8" fill="#687b74" text-anchor="middle">二選一猶豫時回文本找證據</text>
            </g>
            <path d="M 345 65 L 370 65" stroke="#45825b" stroke-width="2.5"/><polygon points="370,65 364,61 364,69" fill="#45825b"/>
            <g transform="translate(375, 20)">
              <rect width="135" height="90" rx="8" fill="#fdf4e3" stroke="#c4821a" stroke-width="1.8"/>
              <text x="67" y="26" font-size="11" font-weight="800" fill="#c4821a" text-anchor="middle">第三部 · 防呆逆向回驗</text>
              <line x1="15" y1="36" x2="120" y2="36" stroke="#c4821a" stroke-width="1" stroke-dasharray="2,2"/>
              <text x="67" y="56" font-size="8.5" fill="#223832" text-anchor="middle">數理答案代回原式檢核</text>
              <text x="67" y="72" font-size="8" fill="#687b74" text-anchor="middle">劃卡題號一對一雙重核對</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  `;
}

// ============================================================================
// 5. WRITING STUDIO: CAP 6-Score Rubric, 4-Paragraph SVG & Cliché vs Insight Table
// ============================================================================
export function renderWritingGuide() {
  return `
    <section class="panel pedagogy-writing-panel" style="margin-top:28px;">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">會考作文 · 官方規準</span>
        <span class="subtle">50 分鐘原創命題寫作評閱對照</span>
      </div>
      <h2>國中會考寫作測驗六級分官方評閱規準總表</h2>
      <p class="muted">會考作文從「立意取材、結構組織、遣詞造句、錯別字標點」四向度整體評定，非單憑字數或修辭堆砌給分。</p>
      
      <div class="table-wrap">
        <table class="teaching-table">
          <thead>
            <tr>
              <th scope="col" style="width:12%;">級分等級</th>
              <th scope="col" style="width:22%;">立意取材 (立意深遠 · 取材貼切)</th>
              <th scope="col" style="width:22%;">結構組織 (脈絡清楚 · 呼應完整)</th>
              <th scope="col" style="width:22%;">遣詞造句 (用詞精準 · 句型流暢)</th>
              <th scope="col" style="width:22%;">標點錯字 (格式正確 · 逐句檢核)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" style="color:#2d5c48;">六級分<br><span class="subtle">特優</span></th>
              <td>精準切題，能從日常細微處發掘深刻哲理，視角獨特且富同理心。</td>
              <td>結構嚴密，首尾呼應，段落過渡自然順暢，層次轉折峰迴路轉。</td>
              <td>文句生動洗練，修辭融於情感之中，無生硬造作之感。</td>
              <td>幾乎無錯別字，標點符號運用靈活且完全合乎規範。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#45825b;">五級分<br><span class="subtle">優等</span></th>
              <td>切合題意，取材充實具體，能完整表達個人觀點與情感。</td>
              <td>結構完整，段落分明，前後文思連貫，轉折合理。</td>
              <td>文句通順暢達，用字貼切，能適當運用各類修辭手法。</td>
              <td>極少錯別字，標點符號運用大致正確。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#c4821a;">四級分<br><span class="subtle">基礎</span></th>
              <td>大致切題，但取材較為常見平淡，發揮多停留在表面描述。</td>
              <td>具備基本段落結構，但過渡略顯生硬，銜接較為鬆散。</td>
              <td>文句大致通順，但詞彙較為貧乏，偶有語病或重複用字。</td>
              <td>有少數錯別字，標點符號偶有不當但尚不影響文意理解。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#b84735;">三級分以下<br><span class="subtle">待加強</span></th>
              <td>題意掌握不清、偏題或文不對題，內容空洞缺乏具體細節支持。</td>
              <td>段落劃分不當或未分段，前後邏輯矛盾，文思紊亂。</td>
              <td>文句不通順、口語化嚴重、語病眾多，詞不達意。</td>
              <td>錯別字偏多，常見火星文或全篇一逗到底，嚴重干擾閱讀。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Essay Structure SVG -->
      <div class="pedagogy-flowchart-wrap" style="margin-top:24px;">
        <div class="diagram-header">
          <span class="diagram-icon">📐</span>
          <div class="diagram-title-group">
            <strong>高分文章「起、承、轉、合」架構思維模型</strong>
            <span class="subtle">四段式黃金比例 · 兼顧敘事張力與思辨深度</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 540 140" width="100%" height="auto" role="img" aria-label="作文結構思維圖">
            <rect width="540" height="140" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            ${[
              ['第一段 · 起', '破題點題 · 營造情境', '破題如破竹，引人入勝', '#3b789e', '#e8f3fa', 20],
              ['第二段 · 承', '鋪陳事例 · 具體細節', '細膩描摹，五感通感', '#45825b', '#e6f3eb', 150],
              ['第三段 · 轉', '內在轉折 · 頓悟思辨', '衝突反思，思想躍遷', '#c4821a', '#fdf4e3', 280],
              ['第四段 · 合', '總結昇華 · 首尾呼應', '餘音繞樑，點亮主題', '#b84735', '#faece8', 410]
            ].map(([title, desc, tip, col, bg, x]) => `
              <g transform="translate(${x}, 20)">
                <rect width="110" height="95" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.8"/>
                <text x="55" y="28" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${title}</text>
                <text x="55" y="52" font-size="9" font-weight="700" fill="#223832" text-anchor="middle">${desc}</text>
                <line x1="15" y1="64" x2="95" y2="64" stroke="${col}" stroke-width="1" stroke-dasharray="2,2"/>
                <text x="55" y="82" font-size="8" fill="#687b74" text-anchor="middle">${tip}</text>
              </g>
            `).join('')}
          </svg>
        </div>
      </div>

      <!-- Cliché vs Insight Table -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>會考經典命題取材立意對照表（平淡俗套 vs 高分昇華）</caption>
          <thead>
            <tr>
              <th scope="col" style="width:18%;">命題情境範例</th>
              <th scope="col" style="width:36%;">常見平淡俗套寫法 (四級分邊緣)</th>
              <th scope="col" style="width:46%;">高分深邃昇華視角 (五~六級分亮點)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">面對失敗的經驗</th>
              <td>月考考差了被父母責罵，在房間大哭一場後決定下次要用功讀書，最後名次進步了。</td>
              <td>在田徑接力賽最後因自己掉棒而痛失錦標，從隊友拍肩沉默中，領悟真正的團隊不是「沒有人犯錯」，而是「願意一同承受遺憾並重新站起」。</td>
            </tr>
            <tr>
              <th scope="row">那一刻，我真感動</th>
              <td>生病發燒時，媽媽在半夜為我煮了一碗熱粥、換額頭毛巾，我覺得媽媽真偉大。</td>
              <td>放學經過工地，目睹滿身汗漬的工人父親悄悄躲在柱後吃著冷便當，卻在電話裡笑著對孩子說「爸爸吃很飽」；讀懂了沉默背後沉重而溫柔的愛。</td>
            </tr>
            <tr>
              <th scope="row">我想為社會做的事</th>
              <td>大家都不應該亂丟垃圾，我們應該去淨灘、多坐大眾運輸工具，讓地球變乾淨。</td>
              <td>從社區長者獨自面對智慧手機點餐機的慌亂身影出發，探討科技飛速發展下的數位落差；倡議青年應成為跨世代的「數位擺渡人」，溫柔陪伴長輩走入新時代。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Transition Words Cheat Table -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>寫作亮點修辭與轉折詞庫百寶箱</caption>
          <thead>
            <tr>
              <th scope="col">轉折情境</th>
              <th scope="col">實用銜接詞語</th>
              <th scope="col">高分範例應用</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">時間推進與轉折</th>
              <td>倏忽之間、不料、未料、時序遞嬗、轉眼即逝</td>
              <td>「未料那一抹晚霞，竟悄悄染紅了整座山嶺…」</td>
            </tr>
            <tr>
              <th scope="row">因果推理與體悟</th>
              <td>由是觀之、正因如此、水到渠成、幡然悔悟</td>
              <td>「由是觀之，真正的成長往往萌芽於挫折的泥淖中。」</td>
            </tr>
            <tr>
              <th scope="row">情境對比與深化</th>
              <td>反觀、殊不知、與其…毋寧…、看似…實則…</td>
              <td>「看似平淡無奇的叮嚀，實則是歲月沉澱出的深情。」</td>
            </tr>
            <tr>
              <th scope="row">總結昇華與期許</th>
              <td>綜上所述、行文至此、願我們都能、心之所向</td>
              <td>「行文至此，那盞夜燈依舊在記憶深處，指引著前行的方向。」</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// 6. REVIEW & SPACED REPETITION: Ebbinghaus Science, Leitner Box SVG & Cognitive Diagnostics
// ============================================================================
export function renderReviewScience() {
  return `
    <section class="panel pedagogy-review-panel" style="margin-top:28px;">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">認知神經科學 · 間隔提取</span>
        <span class="subtle">把短期遺忘，轉化為永久長期記憶</span>
      </div>
      <h2>艾賓浩斯遺忘曲線與主動提取（Active Recall）科學原理</h2>
      <p class="muted">記憶在大腦中如同刻痕：若不複習，學習後 24 小時內會遺忘近 70%；在關鍵節點（1天、3天、7天、14天）主動提取，能重塑神經元突觸，使記憶保持率接近 100%。</p>
      
      <!-- Ebbinghaus Curve SVG -->
      <div class="pedagogy-flowchart-wrap">
        <div class="diagram-header">
          <span class="diagram-icon">📈</span>
          <div class="diagram-title-group">
            <strong>遺忘曲線與四階段間隔複習曲線對比</strong>
            <span class="subtle">紅色：自然遺忘曲線 ➔ 綠色：四次間隔提取後的記憶鞏固</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 540 180" width="100%" height="auto" role="img" aria-label="遺忘曲線對比圖">
            <rect width="540" height="180" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            <line x1="60" y1="140" x2="500" y2="140" stroke="#687b74" stroke-width="1.5"/>
            <polygon points="500,140 492,136 492,144" fill="#687b74"/>
            <line x1="60" y1="140" x2="60" y2="25" stroke="#687b74" stroke-width="1.5"/>
            <polygon points="60,25 56,33 64,33" fill="#687b74"/>
            <text x="50" y="30" font-size="10" font-weight="700" fill="#687b74" text-anchor="end">記憶保留率 (%)</text>
            <text x="495" y="158" font-size="10" font-weight="700" fill="#687b74" text-anchor="end">時間 (天數)</text>
            
            <path d="M 60 40 Q 90 120 480 135" fill="none" stroke="#b84735" stroke-width="2.5" stroke-dasharray="4,4"/>
            <text x="210" y="125" font-size="10" font-weight="700" fill="#b84735">無複習遺忘曲線 (24hr 掉到 30%)</text>
            
            <path d="M 60 40 Q 80 80 120 90" fill="none" stroke="#45825b" stroke-width="2"/>
            <line x1="120" y1="90" x2="120" y2="40" stroke="#c4821a" stroke-width="2"/>
            <circle cx="120" cy="40" r="4" fill="#c4821a"/>
            <text x="120" y="155" font-size="9" fill="#2d5c48" text-anchor="middle">第 1 天</text>
            
            <path d="M 120 40 Q 150 70 200 75" fill="none" stroke="#45825b" stroke-width="2"/>
            <line x1="200" y1="75" x2="200" y2="40" stroke="#c4821a" stroke-width="2"/>
            <circle cx="200" cy="40" r="4" fill="#c4821a"/>
            <text x="200" y="155" font-size="9" fill="#2d5c48" text-anchor="middle">第 3 天</text>
            
            <path d="M 200 40 Q 240 60 320 65" fill="none" stroke="#45825b" stroke-width="2"/>
            <line x1="320" y1="65" x2="320" y2="40" stroke="#c4821a" stroke-width="2"/>
            <circle cx="320" cy="40" r="4" fill="#c4821a"/>
            <text x="320" y="155" font-size="9" fill="#2d5c48" text-anchor="middle">第 7 天</text>
            
            <path d="M 320 40 Q 380 50 480 55" fill="none" stroke="#45825b" stroke-width="3"/>
            <circle cx="480" cy="55" r="5" fill="#2d5c48"/>
            <text x="480" y="155" font-size="9" fill="#2d5c48" text-anchor="middle">第 14 天</text>
            <text x="480" y="45" font-size="10" font-weight="800" fill="#2d5c48" text-anchor="middle">永久記憶鞏固 ➔</text>
          </svg>
        </div>
      </div>

      <!-- Leitner Box Flowchart SVG -->
      <div class="pedagogy-flowchart-wrap" style="margin-top:24px;">
        <div class="diagram-header">
          <span class="diagram-icon">📦</span>
          <div class="diagram-title-group">
            <strong>萊特納五格箱（Leitner Box）間隔提取演算法圖解</strong>
            <span class="subtle">答對則晉級延長間隔，答錯或看提示立刻回退至第一箱</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 540 120" width="100%" height="auto" role="img" aria-label="萊特納五格箱演算法">
            <rect width="540" height="120" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            ${[
              ['Box 1', '每日提取', '錯題/新卡', '#b84735', '#faece8', 20],
              ['Box 2', '3 天提取', '初步熟練', '#c4821a', '#fdf4e3', 125],
              ['Box 3', '7 天提取', '中度穩固', '#3b789e', '#e8f3fa', 230],
              ['Box 4', '14 天提取', '高度掌握', '#45825b', '#e6f3eb', 335],
              ['Box 5', '永久精通', '長期大腦突觸', '#6d528f', '#f0ebf7', 440]
            ].map(([box, cycle, status, col, bg, x]) => `
              <g transform="translate(${x}, 15)">
                <rect width="80" height="75" rx="7" fill="${bg}" stroke="${col}" stroke-width="1.5"/>
                <text x="40" y="22" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${box}</text>
                <text x="40" y="42" font-size="9" font-weight="700" fill="#223832" text-anchor="middle">${cycle}</text>
                <line x1="10" y1="50" x2="70" y2="50" stroke="${col}" stroke-width="0.8" stroke-dasharray="2,2"/>
                <text x="40" y="65" font-size="8" fill="#687b74" text-anchor="middle">${status}</text>
              </g>
              ${x < 440 ? `<path d="M ${x + 84} 50 L ${x + 120} 50" stroke="#45825b" stroke-width="2"/><polygon points="${x + 120},50 ${x + 114},46 ${x + 114},54" fill="#45825b"/>` : ''}
            `).join('')}
            <!-- Fallback arc from box 4 back to box 1 -->
            <path d="M 375 92 Q 220 125 60 92" fill="none" stroke="#b84735" stroke-width="1.5" stroke-dasharray="3,3"/>
            <polygon points="60,92 68,90 66,97" fill="#b84735"/>
            <text x="220" y="112" font-size="8.5" font-weight="700" fill="#b84735" text-anchor="middle">❌ 答錯或使用提示 ➔ 重設回第 1 箱 (嚴格防呆)</text>
          </svg>
        </div>
      </div>

      <!-- Cognitive Error Diagnostic Matrix -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>四維度錯題診斷與修復策略指南表</caption>
          <thead>
            <tr>
              <th scope="col" style="width:18%;">錯題歸因類型</th>
              <th scope="col" style="width:26%;">典型思維病灶表現</th>
              <th scope="col" style="width:28%;">大腦認知盲點剖析</th>
              <th scope="col" style="width:28%;">對應的思維修復處方</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" style="color:#b84735;">① 審題盲點<br><span class="subtle">(眼高手低)</span></th>
              <td>漏看關鍵限制條件（如「選非者」、「x 為整數」、「不含摩擦力」）。</td>
              <td>大腦基於過往經驗快速腦補，工作記憶未充分讀取題幹細節。</td>
              <td>用螢光筆或手指劃出題目的「限制條件」與「提問核心」再作答。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#c4821a;">② 概念混淆<br><span class="subtle">(似懂非懂)</span></th>
              <td>公式記錯符號（如將 y＝kx 與 xy＝k 混淆，或酸稀釋 pH 判斷錯誤）。</td>
              <td>記憶僅停留在機械死記，未在心智模型中建立因果物理意象。</td>
              <td>回到單元 Stage 02 比較表與 SVG 圖解，親手推導一次公式來源。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#3b789e;">③ 推理跳步<br><span class="subtle">(思維斷層)</span></th>
              <td>計算過程跳過中間化簡，或幾何證明缺乏充分定理支持。</td>
              <td>認知負荷過高時企圖一步到位，缺乏分步驗算防呆機制。</td>
              <td>參考單元 Stage 03「解題思維鏈」，按 3 步驟依序寫出已知、定理、求值。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#45825b;">④ 情境干擾<br><span class="subtle">(素養恐懼)</span></th>
              <td>題目文字或圖表很長時產生焦慮，無法將生活語境抽象為學科符號。</td>
              <td>長文本誘發心理防禦，未將問題拆解為熟悉的核心子問題。</td>
              <td>剔除無關修飾語，直接圈出數據與因果關係，建立數學/物理模型。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// 7. PROGRESS: All-Subject Competency Growth Radar & Metacognitive Checklist
// ============================================================================
export function renderProgressRadar(state, subjects, units, allQuestions) {
  return `
    <section class="panel pedagogy-progress-panel" style="margin-top:28px;">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">後設認知 · 自我校準</span>
        <span class="subtle">不僅看答對題數，更培養終身自學管理能力</span>
      </div>
      <h2>全科素養掌握度與後設認知成長儀表板</h2>
      <p class="muted">卓越的學習者懂得監控自己的學習狀態：清楚知道自己「哪裡真正懂了、哪裡只是盲目猜中、下週該補強何處」。</p>

      <!-- Competency Radar SVG -->
      <div class="pedagogy-flowchart-wrap">
        <div class="diagram-header">
          <span class="diagram-icon">🎯</span>
          <div class="diagram-title-group">
            <strong>國中全科六大核心素養能力向度圖解</strong>
            <span class="subtle">均衡發展 · 兼顧基礎運算、空間幾何、探究實作與批判思辨</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 540 200" width="100%" height="auto" role="img" aria-label="能力向度雷達圖">
            <rect width="540" height="200" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            ${[30, 60, 90].map(r => `
              <polygon points="
                ${(270 + r * Math.cos(0)).toFixed(1)},${(100 + r * Math.sin(0)).toFixed(1)}
                ${(270 + r * Math.cos(Math.PI/3)).toFixed(1)},${(100 + r * Math.sin(Math.PI/3)).toFixed(1)}
                ${(270 + r * Math.cos(2*Math.PI/3)).toFixed(1)},${(100 + r * Math.sin(2*Math.PI/3)).toFixed(1)}
                ${(270 + r * Math.cos(Math.PI)).toFixed(1)},${(100 + r * Math.sin(Math.PI)).toFixed(1)}
                ${(270 + r * Math.cos(4*Math.PI/3)).toFixed(1)},${(100 + r * Math.sin(4*Math.PI/3)).toFixed(1)}
                ${(270 + r * Math.cos(5*Math.PI/3)).toFixed(1)},${(100 + r * Math.sin(5*Math.PI/3)).toFixed(1)}
              " fill="none" stroke="#d6dfd9" stroke-width="1.2" stroke-dasharray="3,3"/>
            `).join('')}
            ${[0, 1, 2, 3, 4, 5].map(i => {
              const ang = i * Math.PI / 3;
              return `<line x1="270" y1="100" x2="${(270 + 95 * Math.cos(ang)).toFixed(1)}" y2="${(100 + 95 * Math.sin(ang)).toFixed(1)}" stroke="#687b74" stroke-width="1.2"/>`;
            }).join('')}
            <polygon points="
              ${(270 + 75 * Math.cos(0)).toFixed(1)},${(100 + 75 * Math.sin(0)).toFixed(1)}
              ${(270 + 70 * Math.cos(Math.PI/3)).toFixed(1)},${(100 + 70 * Math.sin(Math.PI/3)).toFixed(1)}
              ${(270 + 80 * Math.cos(2*Math.PI/3)).toFixed(1)},${(100 + 80 * Math.sin(2*Math.PI/3)).toFixed(1)}
              ${(270 + 65 * Math.cos(Math.PI)).toFixed(1)},${(100 + 65 * Math.sin(Math.PI)).toFixed(1)}
              ${(270 + 72 * Math.cos(4*Math.PI/3)).toFixed(1)},${(100 + 72 * Math.sin(4*Math.PI/3)).toFixed(1)}
              ${(270 + 78 * Math.cos(5*Math.PI/3)).toFixed(1)},${(100 + 78 * Math.sin(5*Math.PI/3)).toFixed(1)}
            " fill="#45825b" fill-opacity="0.25" stroke="#2d5c48" stroke-width="2.5"/>
            <text x="385" y="104" font-size="11" font-weight="800" fill="#2d5c48">語言文本理解</text>
            <text x="330" y="190" font-size="11" font-weight="800" fill="#2d5c48">符號運算與證明</text>
            <text x="145" y="190" font-size="11" font-weight="800" fill="#2d5c48">科學實驗與探究</text>
            <text x="90" y="104" font-size="11" font-weight="800" fill="#2d5c48">時空脈絡與制度</text>
            <text x="145" y="20" font-size="11" font-weight="800" fill="#2d5c48">資訊與工程思維</text>
            <text x="330" y="20" font-size="11" font-weight="800" fill="#2d5c48">藝術美感與表達</text>
          </svg>
        </div>
      </div>

      <!-- Bloom's Taxonomy Table -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>布魯姆認知歷程（Bloom's Taxonomy）自學進階里程碑評估表</caption>
          <thead>
            <tr>
              <th scope="col" style="width:16%;">認知層次</th>
              <th scope="col" style="width:24%;">學科行為指標</th>
              <th scope="col" style="width:30%;">知行學院對應功能支援</th>
              <th scope="col" style="width:30%;">學習成果達成標準</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">L1 · 記憶 (Remember)</th>
              <td>準確指認名詞定義、常數數值與公式符號。</td>
              <td>Stage 01 觀念錨定金句、智能記憶卡主動提取。</td>
              <td>能在 3 秒內回答定義，不把正反比或凸透鏡成像搞混。</td>
            </tr>
            <tr>
              <th scope="row">L2 · 理解 (Understand)</th>
              <td>能用大白話向同儕解釋概念背後的因果機制。</td>
              <td>Stage 02 比較對照表與 SVG 向量圖解。</td>
              <td>完成 Stage 05 費曼白話筆記，清楚舉出生活例證。</td>
            </tr>
            <tr>
              <th scope="row">L3 · 應用 (Apply)</th>
              <td>將學科定理遷移至全新生活情境，列式計算求解。</td>
              <td>Stage 03 典範例題與解題思維鏈示範。</td>
              <td>獨立寫出 3 步驟解題推導，不依賴提示獨立答對。</td>
            </tr>
            <tr>
              <th scope="row">L4 · 分析 (Analyze)</th>
              <td>解構長篇非連續性圖表，區分變因與邏輯漏洞。</td>
              <td>互動實驗室動態模擬、會考歷屆題組分析。</td>
              <td>分清操縱與控制變因，抓出選項過度推論與無中生有。</td>
            </tr>
            <tr>
              <th scope="row">L5 · 評鑑 (Evaluate)</th>
              <td>辨析不同解題策略優劣，檢核計算合理性與適用邊界。</td>
              <td>Stage 03 防呆驗算、會考寫作四向度自評。</td>
              <td>主動進行逆向驗算，確認變數非負性與物理量單位合理性。</td>
            </tr>
            <tr>
              <th scope="row">L6 · 創造 (Create)</th>
              <td>整合多學科知識，產出原創論述、工程原型或寫作篇章。</td>
              <td>50 分鐘寫作測驗、跨單元原創實作與自學專案。</td>
              <td>完成一篇立意深刻的會考作文，或構思出工程問題優化方案。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Weekly Metacognitive Checklist -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>自律自學每週反思與進度自我檢核規準表</caption>
          <thead>
            <tr>
              <th scope="col">每週檢核向度</th>
              <th scope="col">自我提問 (促發大腦後設思考)</th>
              <th scope="col">健康自學習慣標準</th>
              <th scope="col">警訊提醒 (需即時調整)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">規律性與節奏</th>
              <td>這週我是否維持了每週至少 4~5 天的微步自學，而非考前熬夜突擊？</td>
              <td>每天 20~30 分鐘，專注理解 1~2 個單元。</td>
              <td>連續多天未登入，考前一天狂刷題。</td>
            </tr>
            <tr>
              <th scope="row">主動回想品質</th>
              <td>我是否在翻開解答前，先在腦中自己說出破題理由與關鍵定理？</td>
              <td>遮住講義口述觀念；寫下費曼筆記。</td>
              <td>一遇到卡點立刻點「看詳解」或看提示。</td>
            </tr>
            <tr>
              <th scope="row">錯題複習落實</th>
              <td>系統排定的到期複習題目，我是否都有如期在間隔期完成提取？</td>
              <td>及時清空到期錯題，維持跨日連續答對。</td>
              <td>錯題堆積超過 20 題未處理。</td>
            </tr>
            <tr>
              <th scope="row">跨科均衡度</th>
              <td>我是否過度偏愛擅長科目，而避開了自己容易卡關的弱勢學科？</td>
              <td>弱勢學科排在每日精神最好的第一順位。</td>
              <td>完全只做單一科目題目。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// 8. GSAT / COLLEGE ENTRANCE STRATEGY: Math A vs B, 5-Tier Percentiles & 18 Clusters
// ============================================================================
export function renderGsatStrategy() {
  return `
    <section class="panel pedagogy-gsat-panel" style="margin-top:28px;">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">升學導引 · 學測全真</span>
        <span class="subtle">大學多元入學 · 108 課綱考招新制解析</span>
      </div>
      <h2>大考中心學測選考制度、數A/數B策略與 18 學群採計導引</h2>
      <p class="muted">學測（學科能力測驗）為高中升大學核心評量。掌握考科特色與目標學群門檻，才能精準擬定高三衝刺策略。</p>
      
      <!-- Math A vs B Comparison Table -->
      <div class="table-wrap">
        <table class="teaching-table">
          <caption>學測 數學A vs 數學B 選考深度與學群對照表</caption>
          <thead>
            <tr>
              <th scope="col" style="width:16%;">考科名稱</th>
              <th scope="col" style="width:26%;">難度定位與知識深度</th>
              <th scope="col" style="width:28%;">高頻考點與代表單元</th>
              <th scope="col" style="width:30%;">主要採計大學學群與目標校系</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" style="color:#b84735;">數學 A<br><span class="subtle">(高數學需求)</span></th>
              <td>強調嚴密幾何空間論證、向量內積外積、矩陣線性變換與空間坐標系。</td>
              <td>空間向量、空間平面與直線方程式、三階行列式、三角函數和差角。</td>
              <td>醫學、牙醫、中醫、電機、資工、機械、理學院（數學/物理/化學）、頂大商管財務。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#3b789e;">數學 B<br><span class="subtle">(低數學需求)</span></th>
              <td>強調生活情境數據解讀、平面向量、圓錐曲線、按比例縮放與單點透視。</td>
              <td>單點透視圖、連續複利估算、圓與直線、球體經緯度、平面幾何。</td>
              <td>文史哲、法學、社會心理、傳播設計、外語、部分商管（企管/行銷）、教育體育藝術。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5-Tier Percentiles Table -->
      <div class="table-wrap" style="margin-top:24px;">
        <table class="teaching-table">
          <caption>大考中心學測成績「五標」官方統計定義規準表</caption>
          <thead>
            <tr>
              <th scope="col">標準名稱</th>
              <th scope="col">大考中心官方統計百分位數定義</th>
              <th scope="col">分數意涵解讀</th>
              <th scope="col">個人申請志願選填參考點</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" style="color:#2d5c48;">頂標 (Top)</th>
              <td>該科全體到考考生中，得分由小到大排序第 <strong>88 百分位數</strong>之考生級分。</td>
              <td>前 12% 優秀頂尖群體。</td>
              <td>頂大（臺成清交政）熱門科系、醫學牙醫系之基本檢定篩選門檻。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#45825b;">前標 (Front)</th>
              <td>該科全體到考考生中，得分由小到大排序第 <strong>75 百分位數</strong>之考生級分。</td>
              <td>前 25% 穩健領先群體。</td>
              <td>國立中字輩大學（中興/中正/中央/中山）、頂大人文社會學系門檻。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#c4821a;">均標 (Mean)</th>
              <td>該科全體到考考生中，得分由小到大排序第 <strong>50 百分位數</strong>之考生級分。</td>
              <td>全體考生的平均中位水準。</td>
              <td>公立與老牌私立大學多數科系標準檢定門檻。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#3b789e;">後標 (Back)</th>
              <td>該科全體到考考生中，得分由小到大排序第 <strong>25 百分位數</strong>之考生級分。</td>
              <td>後 25% 基礎底線。</td>
              <td>部分校系篩選條件，低於此標需評估後續分科測驗轉換策略。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#b84735;">底標 (Bottom)</th>
              <td>該科全體到考考生中，得分由小到大排序第 <strong>12 百分位數</strong>之考生級分。</td>
              <td>全體後 12% 警戒線。</td>
              <td>多數大學校系設定不得低於底標，否則無法進入繁星或個人申請二階。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// 9. LESSON STAGE 01 & 04 ENHANCEMENT TABLES
// ============================================================================
export function renderUnitStageTables(u) {
  const takeaways = [
    ['核心破題概念', u.concept.split('。')[0] + '。', '審題時迅速聯想心智模型與核心定義'],
    ['關鍵解題規準', u.example.split('。')[0] + '。', '依循已知條件、定理依據逐步推進計算'],
    ['防呆驗算邊界', u.pitfall.split('。')[0] + '。', '留意極端值、負數變號或幾何圖形假象']
  ];

  return `
    <div class="table-wrap unit-takeaway-table-wrap" style="margin-top:14px;">
      <table class="teaching-table">
        <caption>本單元核心考點與防呆速查對照</caption>
        <thead>
          <tr>
            <th scope="col" style="width:20%;">維度項目</th>
            <th scope="col" style="width:50%;">本課核心內容要訣</th>
            <th scope="col" style="width:30%;">考場防呆心法</th>
          </tr>
        </thead>
        <tbody>
          ${takeaways.map(([dim, content, tip]) => `
            <tr>
              <th scope="row">${esc(dim)}</th>
              <td>${esc(content)}</td>
              <td style="color:#2d5c48;">💡 ${esc(tip)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ============================================================================
// 10. STUDY LIBRARY: 3-Year 6-Semester Milestone & Handout Study Guide
// ============================================================================
export function renderLibraryScheduleGuide() {
  return `
    <section class="panel pedagogy-schedule-guide" aria-labelledby="schedule-guide-title">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">系統進程 · 螺旋複習</span>
        <span class="subtle">全站 188 單元六學期講義自學指引</span>
      </div>
      <h2 id="schedule-guide-title" style="margin-top:0;">國中三年六學期會考備考時程與講義研讀導引</h2>
      <p class="muted">從國一啟蒙奠基、國二數理深化，到國三跨科統整與歷屆真題衝刺，循序建構各科知識網絡與會考解題直覺。</p>

      <div class="pedagogy-flowchart-wrap" style="margin-bottom:18px;">
        <div class="diagram-header">
          <span class="diagram-icon">📚</span>
          <div class="diagram-title-group">
            <strong>六學期階梯複習與講義學習地圖</strong>
            <span class="subtle">扎根、加深、統整到衝刺之完整備戰節奏</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 720 160" width="100%" height="auto" role="img" aria-label="六學期階梯學習時程圖">
            <rect width="720" height="160" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            <!-- Stage 1: 7-1 -->
            <g transform="translate(15, 20)">
              <rect width="105" height="120" rx="8" fill="#e8f3fa" stroke="#3b789e" stroke-width="1.6"/>
              <rect width="105" height="24" rx="8" fill="#3b789e"/>
              <text x="52.5" y="16" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">國一上 (7-1)</text>
              <text x="52.5" y="44" font-size="11.5" font-weight="800" fill="#3b789e" text-anchor="middle">觀念啟蒙扎根</text>
              <text x="52.5" y="64" font-size="9" fill="#223832" text-anchor="middle">數線 · 負數運算</text>
              <text x="52.5" y="79" font-size="9" fill="#223832" text-anchor="middle">細胞微觀 · 臺灣地形</text>
              <text x="52.5" y="102" font-size="9" font-weight="700" fill="#2d5c48" text-anchor="middle">會考佔比 ~15%</text>
            </g>
            <path d="M 122 80 L 133 80" stroke="#3b789e" stroke-width="2"/><polygon points="135,80 130,76 130,84" fill="#3b789e"/>

            <!-- Stage 2: 7-2 -->
            <g transform="translate(135, 20)">
              <rect width="105" height="120" rx="8" fill="#e8f3fa" stroke="#3b789e" stroke-width="1.6"/>
              <rect width="105" height="24" rx="8" fill="#3b789e"/>
              <text x="52.5" y="16" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">國一下 (7-2)</text>
              <text x="52.5" y="44" font-size="11.5" font-weight="800" fill="#3b789e" text-anchor="middle">結構脈絡建立</text>
              <text x="52.5" y="64" font-size="9" fill="#223832" text-anchor="middle">二元聯立 · 遺傳演化</text>
              <text x="52.5" y="79" font-size="9" fill="#223832" text-anchor="middle">氣候水文 · 清領社會</text>
              <text x="52.5" y="102" font-size="9" font-weight="700" fill="#2d5c48" text-anchor="middle">會考佔比 ~18%</text>
            </g>
            <path d="M 242 80 L 253 80" stroke="#45825b" stroke-width="2"/><polygon points="255,80 250,76 250,84" fill="#45825b"/>

            <!-- Stage 3: 8-1 -->
            <g transform="translate(255, 20)">
              <rect width="105" height="120" rx="8" fill="#e6f3eb" stroke="#45825b" stroke-width="1.6"/>
              <rect width="105" height="24" rx="8" fill="#45825b"/>
              <text x="52.5" y="16" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">國二上 (8-1)</text>
              <text x="52.5" y="44" font-size="11.5" font-weight="800" fill="#45825b" text-anchor="middle">數理邏輯深化</text>
              <text x="52.5" y="64" font-size="9" fill="#223832" text-anchor="middle">乘法公式 · 理化波動</text>
              <text x="52.5" y="79" font-size="9" fill="#223832" text-anchor="middle">化學反應 · 東亞世界</text>
              <text x="52.5" y="102" font-size="9" font-weight="700" fill="#2d5c48" text-anchor="middle">會考佔比 ~20%</text>
            </g>
            <path d="M 362 80 L 373 80" stroke="#45825b" stroke-width="2"/><polygon points="375,80 370,76 370,84" fill="#45825b"/>

            <!-- Stage 4: 8-2 -->
            <g transform="translate(375, 20)">
              <rect width="105" height="120" rx="8" fill="#e6f3eb" stroke="#45825b" stroke-width="1.6"/>
              <rect width="105" height="24" rx="8" fill="#45825b"/>
              <text x="52.5" y="16" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">國二下 (8-2)</text>
              <text x="52.5" y="44" font-size="11.5" font-weight="800" fill="#45825b" text-anchor="middle">幾何論證與力學</text>
              <text x="52.5" y="64" font-size="9" fill="#223832" text-anchor="middle">三角形全等 · 有機化合物</text>
              <text x="52.5" y="79" font-size="9" fill="#223832" text-anchor="middle">力與壓力 · 憲法法律</text>
              <text x="52.5" y="102" font-size="9" font-weight="700" fill="#2d5c48" text-anchor="middle">會考佔比 ~22%</text>
            </g>
            <path d="M 482 80 L 493 80" stroke="#c4821a" stroke-width="2"/><polygon points="495,80 490,76 490,84" fill="#c4821a"/>

            <!-- Stage 5: 9-1 -->
            <g transform="translate(495, 20)">
              <rect width="105" height="120" rx="8" fill="#fdf4e3" stroke="#c4821a" stroke-width="1.6"/>
              <rect width="105" height="24" rx="8" fill="#c4821a"/>
              <text x="52.5" y="16" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">國三上 (9-1)</text>
              <text x="52.5" y="44" font-size="11.5" font-weight="800" fill="#c4821a" text-anchor="middle">跨科統整與地科</text>
              <text x="52.5" y="64" font-size="9" fill="#223832" text-anchor="middle">圓形幾何 · 電與磁</text>
              <text x="52.5" y="79" font-size="9" fill="#223832" text-anchor="middle">天文板塊 · 世界史地</text>
              <text x="52.5" y="102" font-size="9" font-weight="700" fill="#2d5c48" text-anchor="middle">會考佔比 ~20%</text>
            </g>
            <path d="M 602 80 L 613 80" stroke="#c4821a" stroke-width="2"/><polygon points="615,80 610,76 610,84" fill="#c4821a"/>

            <!-- Stage 6: 9-2 -->
            <g transform="translate(615, 20)">
              <rect width="90" height="120" rx="8" fill="#fdedeb" stroke="#b84735" stroke-width="1.6"/>
              <rect width="90" height="24" rx="8" fill="#b84735"/>
              <text x="45" y="16" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">國三下 (9-2)</text>
              <text x="45" y="44" font-size="11.5" font-weight="800" fill="#b84735" text-anchor="middle">全真模考衝刺</text>
              <text x="45" y="64" font-size="9" fill="#223832" text-anchor="middle">二次函數 · 統計機率</text>
              <text x="45" y="79" font-size="9" fill="#223832" text-anchor="middle">跨科題組 · 弱點回填</text>
              <text x="45" y="102" font-size="9" font-weight="700" fill="#b84735" text-anchor="middle">總複習衝 A++</text>
            </g>
          </svg>
        </div>
      </div>

      <div class="table-wrap">
        <table class="teaching-table">
          <caption>國中三年六學期會考備考時程與講義學習導引表</caption>
          <thead>
            <tr>
              <th scope="col" style="width:12%;">年級學期</th>
              <th scope="col" style="width:38%;">核心主題與學習里程碑</th>
              <th scope="col" style="width:15%;">會考權重</th>
              <th scope="col" style="width:35%;">講義研讀策略與備考心法</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">國一上 (7-1)</th>
              <td><strong>奠定學科基石</strong>：正負數四則運算、代數符號轉換、顯微微觀生物世界、臺灣地形氣候空間概念。</td>
              <td>約 12% ~ 15%</td>
              <td>研讀講義時聚焦「基本定義精準理解與符號化能力」，講義例題確實手算，避免跳步心算。</td>
            </tr>
            <tr>
              <th scope="row">國一下 (7-2)</th>
              <td><strong>建立脈絡聯繫</strong>：二元一次聯立方程式、直角坐標系、孟德爾遺傳學、演化與生態系循環、清領與日治時期臺灣。</td>
              <td>約 15% ~ 18%</td>
              <td>善用講義「遺傳棋盤方格」與「生態能量金字塔」圖解，數學重點在將文字應用題轉換為聯立方程式的能力。</td>
            </tr>
            <tr>
              <th scope="row">國二上 (8-1)</th>
              <td><strong>抽象邏輯分水嶺</strong>：乘法公式、二次方根、理化波動光學熱學、化學反應式平衡與化學劑量、東亞歷史地理。</td>
              <td>約 18% ~ 20%</td>
              <td>理化公式需徹底理解物理意義與適用情境（如比熱公式 H=msΔT），切忌死背；講義範例題需按部就班寫出算式步驟。</td>
            </tr>
            <tr>
              <th scope="row">國二下 (8-2)</th>
              <td><strong>幾何論證與理化力學</strong>：等差數列、三角形全等證明、理化有機化合物、力與牛頓定律、壓力浮力、憲法與民刑法體系。</td>
              <td>約 20% ~ 22%</td>
              <td>本學期為會考超高頻核心考區！講義附帶的幾何輔助線作法、受力分析圖必須熟練親手繪製，強化邏輯證明與受力平衡判讀。</td>
            </tr>
            <tr>
              <th scope="row">國三上 (9-1)</th>
              <td><strong>跨科整合與高階幾何</strong>：相似形定理、圓心角圓周角、理化電路與電磁學、地科板塊與天文週期、世界歷史與全球地理。</td>
              <td>約 20% ~ 22%</td>
              <td>展開第一輪會考全真總複習，利用講義概念心智圖橫向串聯 1~4 冊概念；地科重視日地月三者相對運動與季節成因空間想像。</td>
            </tr>
            <tr>
              <th scope="row">國三下 (9-2)</th>
              <td><strong>全真題庫與精準衝刺</strong>：二次函數極值、空間幾何與統計機率、全球化永續議題、近七年會考真題刷題與錯題診斷。</td>
              <td>約 12% ~ 15% (含全真衝刺)</td>
              <td>主攻全真題庫與跨科整合題組；以錯題為導向，精準對應講義薄弱章節進行「弱點回填」，嚴格遵循 5 階認知梯次攻克 A++ 障礙。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// 11. CURRICULUM ALIGNMENT: 108 Syllabus Code Decoding & Publisher Comparisons
// ============================================================================
export function renderCurriculumAlignmentGuide() {
  return `
    <section class="panel pedagogy-alignment-guide" aria-labelledby="alignment-guide-title">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">課綱標準 · 版本對照</span>
        <span class="subtle">教育部 108 課綱學習內容代碼解碼與三大版本特性</span>
      </div>
      <h2 id="alignment-guide-title" style="margin-top:0;">教育部 108 課綱學習內容解碼與三大版本編排特色比較</h2>
      <p class="muted">掌握官方課綱編碼體系，理解康軒、翰林、南一三大版本在章節組織與命題重點上的異同，跨版本自學不迷航。</p>

      <!-- Code Decoding Infographic SVG -->
      <div class="pedagogy-flowchart-wrap" style="margin-bottom:18px;">
        <div class="diagram-header">
          <span class="diagram-icon">🔍</span>
          <div class="diagram-title-group">
            <strong>108 課綱學習內容編碼規則解碼圖</strong>
            <span class="subtle">範例解析：數學「S-7-1」與自然「INa-IV-1」代碼結構拆解</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 680 145" width="100%" height="auto" role="img" aria-label="課綱代碼解碼圖">
            <rect width="680" height="145" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            
            <!-- Math example: S-7-1 -->
            <g transform="translate(30, 20)">
              <text x="0" y="16" font-size="12" font-weight="800" fill="#2d5c48">數學科代碼範例：S-7-1</text>
              <rect x="0" y="26" width="90" height="70" rx="6" fill="#e8f3fa" stroke="#3b789e" stroke-width="1.4"/>
              <text x="45" y="52" font-size="15" font-weight="800" fill="#3b789e" text-anchor="middle">S</text>
              <text x="45" y="74" font-size="10" fill="#223832" text-anchor="middle">主題：空間與形狀</text>
              <text x="45" y="86" font-size="8.5" fill="#687b74" text-anchor="middle">(Space & Shape)</text>

              <text x="105" y="65" font-size="18" font-weight="800" fill="#3b789e">-</text>

              <rect x="120" y="26" width="70" height="70" rx="6" fill="#e6f3eb" stroke="#45825b" stroke-width="1.4"/>
              <text x="155" y="52" font-size="15" font-weight="800" fill="#45825b" text-anchor="middle">7</text>
              <text x="155" y="74" font-size="10" fill="#223832" text-anchor="middle">適用年級</text>
              <text x="155" y="86" font-size="8.5" fill="#687b74" text-anchor="middle">七年級 (國一)</text>

              <text x="205" y="65" font-size="18" font-weight="800" fill="#45825b">-</text>

              <rect x="220" y="26" width="60" height="70" rx="6" fill="#fdf4e3" stroke="#c4821a" stroke-width="1.4"/>
              <text x="250" y="52" font-size="15" font-weight="800" fill="#c4821a" text-anchor="middle">1</text>
              <text x="250" y="74" font-size="10" fill="#223832" text-anchor="middle">項目序號</text>
              <text x="250" y="86" font-size="8.5" fill="#687b74" text-anchor="middle">第 1 項指標</text>
            </g>

            <!-- Science example: INa-IV-1 -->
            <g transform="translate(370, 20)">
              <text x="0" y="16" font-size="12" font-weight="800" fill="#2d5c48">自然科學代碼範例：INa-IV-1</text>
              <rect x="0" y="26" width="95" height="70" rx="6" fill="#e8f3fa" stroke="#3b789e" stroke-width="1.4"/>
              <text x="47.5" y="52" font-size="14" font-weight="800" fill="#3b789e" text-anchor="middle">INa</text>
              <text x="47.5" y="74" font-size="10" fill="#223832" text-anchor="middle">跨科概念主題</text>
              <text x="47.5" y="86" font-size="8.5" fill="#687b74" text-anchor="middle">物質與能量 (a)</text>

              <text x="110" y="65" font-size="18" font-weight="800" fill="#3b789e">-</text>

              <rect x="125" y="26" width="70" height="70" rx="6" fill="#e6f3eb" stroke="#45825b" stroke-width="1.4"/>
              <text x="160" y="52" font-size="14" font-weight="800" fill="#45825b" text-anchor="middle">IV</text>
              <text x="160" y="74" font-size="10" fill="#223832" text-anchor="middle">學習階段</text>
              <text x="160" y="86" font-size="8.5" fill="#687b74" text-anchor="middle">第四階段 (國中)</text>

              <text x="210" y="65" font-size="18" font-weight="800" fill="#45825b">-</text>

              <rect x="225" y="26" width="60" height="70" rx="6" fill="#fdf4e3" stroke="#c4821a" stroke-width="1.4"/>
              <text x="255" y="52" font-size="14" font-weight="800" fill="#c4821a" text-anchor="middle">1</text>
              <text x="255" y="74" font-size="10" fill="#223832" text-anchor="middle">內容細目</text>
              <text x="255" y="86" font-size="8.5" fill="#687b74" text-anchor="middle">第 1 項內容</text>
            </g>
          </svg>
        </div>
      </div>

      <div class="table-wrap" style="margin-bottom:18px;">
        <table class="teaching-table">
          <caption>教育部 108 課綱各領域學習內容代碼解碼對照表</caption>
          <thead>
            <tr>
              <th scope="col" style="width:16%;">領域 / 學科</th>
              <th scope="col" style="width:20%;">代碼結構示例</th>
              <th scope="col" style="width:34%;">首碼英文分類意涵</th>
              <th scope="col" style="width:30%;">國中核心能力培養重點</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">國語文</th>
              <td><code>Ab-IV-1, Bb-IV-2</code></td>
              <td><strong>A=文字與標點</strong>、<strong>B=文本結構</strong> (Ba記敘/Bb抒情/Bc說明/Bd議論)、<strong>C=文化內涵</strong></td>
              <td>掌握文本多樣體裁之篇章架構與深層思維情感。</td>
            </tr>
            <tr>
              <th scope="row">英語文</th>
              <td><code>1-IV-1, Ac-IV-2</code></td>
              <td><strong>1~4=聽說讀寫語言能力</strong>、<strong>A=語言知識</strong> (Aa字母/Ab語音/Ac字詞/Ad句型)</td>
              <td>由單句語法進階到跨段落訊息統整與真實跨文化溝通。</td>
            </tr>
            <tr>
              <th scope="row">數學</th>
              <td><code>N-7-1, G-8-2, D-9-1</code></td>
              <td><strong>N=數與量</strong>、<strong>S/G=空間與形狀</strong>、<strong>A=代數</strong>、<strong>F=函數</strong>、<strong>D=資料與不確定性</strong></td>
              <td>生活問題數學建模、代數推演與幾何演繹論證能力。</td>
            </tr>
            <tr>
              <th scope="row">自然科學</th>
              <td><code>INa-IV-1, INg-IV-2</code></td>
              <td><strong>INa~INg=跨科主題</strong> (a物質能量/b生命系統/c地球環境/d生態/e交互作用/f演變/g科學發展)</td>
              <td>強調「探究與實作」，從實驗操作歸納自然規律與因果關聯。</td>
            </tr>
            <tr>
              <th scope="row">社會領域</th>
              <td><code>地Aa-IV-1, 歷Ba-IV-2, 公Ca-IV-1</code></td>
              <td><strong>地=地理</strong> (空間與人地互動)、<strong>歷=歷史</strong> (時間變遷與歷史意識)、<strong>公=公民</strong> (社會參與與法治生活)</td>
              <td>培養現代公民素養，學會運用地圖、史料與法條思辨公共議題。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-wrap">
        <table class="teaching-table">
          <caption>康軒 · 翰林 · 南一 三大主流版本教材特色與備考適配表</caption>
          <thead>
            <tr>
              <th scope="col" style="width:15%;">教材版本</th>
              <th scope="col" style="width:35%;">編排脈絡與特色風格</th>
              <th scope="col" style="width:25%;">教學強項與優勢</th>
              <th scope="col" style="width:25%;">跨版本學習者備考避坑指南</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" style="color:#2d5c48;">康軒 (KNSH)</th>
              <td>生活化情境起手，習題鋪陳平緩細緻，強調概念的可讀性與日常連結，圖表說明生動親切。</td>
              <td>概念詮釋清楚易懂、範例循序漸進，非常適合紮根奠基與自學。</td>
              <td>幾何與深層綜合理化題型偏溫和，考前務必多補充本站歷屆變化題組。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#3b789e;">翰林 (Hanlin)</th>
              <td>學術體系嚴密，數理推導邏輯強，名詞定義規範精確，段考與模考常考進階變化題。</td>
              <td>章節架構綱舉目張，深度題型覆蓋完整，對於訓練推理論證能力極佳。</td>
              <td>自學者若感到推導步驟跳躍，可隨時回查本站概念向量圖解與防呆速查表。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#c4821a;">南一 (Nani)</th>
              <td>緊扣生活情境與素養實作，跨科議題結合度高，版面編排富有探究互動性與視覺多樣性。</td>
              <td>非連續文本與圖表判讀訓練豐富，題型設計極具新課綱會考素養風貌。</td>
              <td>需特別注意傳統定義與繁複代數計算的基本功熟練度，切忌眼高手低。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// 12. PAST PAPERS: 7-Year CAP Trend Matrix (109~115) & Literacy Evolution
// ============================================================================
export function renderPastpapersTrendGuide() {
  return `
    <section class="panel pedagogy-pastpapers-guide" aria-labelledby="pastpapers-guide-title">
      <div class="row" style="align-items:center;margin-bottom:12px;">
        <span class="tag accent">真題導向 · 命題洞察</span>
        <span class="subtle">近七年 (109~115) 國中教育會考命題趨勢全景解讀</span>
      </div>
      <h2 id="pastpapers-guide-title" style="margin-top:0;">國中教育會考近七年命題趨勢與素養題型演進分析</h2>
      <p class="muted">從 109 年舊課綱銜接期，到 111 年 108 課綱首屆，再到 115 年深度素養思辨，掌握命題風格演進與奪取 A++ 關鍵心法。</p>

      <!-- 7-Year Trend Progression SVG Chart -->
      <div class="pedagogy-flowchart-wrap" style="margin-bottom:18px;">
        <div class="diagram-header">
          <span class="diagram-icon">📈</span>
          <div class="diagram-title-group">
            <strong>會考長文閱讀與多模態圖表題佔比演進趨勢 (109~115)</strong>
            <span class="subtle">題幹文字量由 32% 躍升至 68%，全面考驗資訊擷取、圖表轉換與批判驗證能力</span>
          </div>
        </div>
        <div class="diagram-svg-wrap">
          <svg class="concept-svg" viewBox="0 0 700 170" width="100%" height="auto" role="img" aria-label="會考素養演進趨勢圖">
            <rect width="700" height="170" rx="10" fill="#fbfcfb" stroke="#d6dfd9" stroke-width="1.2"/>
            <!-- Coordinate axes -->
            <line x1="60" y1="130" x2="660" y2="130" stroke="#a0b3a8" stroke-width="1.5"/>
            <line x1="60" y1="20" x2="60" y2="130" stroke="#a0b3a8" stroke-width="1.5"/>
            <!-- Y-axis markers -->
            <text x="50" y="133" font-size="9" fill="#687b74" text-anchor="end">0%</text>
            <text x="50" y="98" font-size="9" fill="#687b74" text-anchor="end">25%</text>
            <text x="50" y="63" font-size="9" fill="#687b74" text-anchor="end">50%</text>
            <text x="50" y="28" font-size="9" fill="#687b74" text-anchor="end">75%</text>
            <line x1="60" y1="95" x2="660" y2="95" stroke="#edf1ee" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="60" y1="60" x2="660" y2="60" stroke="#edf1ee" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="60" y1="25" x2="660" y2="25" stroke="#edf1ee" stroke-width="1" stroke-dasharray="3,3"/>

            <!-- Trend Bars & Points: 109: 32%, 110: 40%, 111: 52%, 112: 58%, 113: 62%, 114: 65%, 115: 68% -->
            <!-- 109 (x=110) -->
            <rect x="95" y="85" width="30" height="45" rx="3" fill="#e8f3fa" stroke="#3b789e" stroke-width="1.2"/>
            <text x="110" y="79" font-size="10" font-weight="700" fill="#3b789e" text-anchor="middle">32%</text>
            <text x="110" y="145" font-size="10" font-weight="700" fill="#223832" text-anchor="middle">109 年</text>

            <!-- 110 (x=195) -->
            <rect x="180" y="74" width="30" height="56" rx="3" fill="#e8f3fa" stroke="#3b789e" stroke-width="1.2"/>
            <text x="195" y="68" font-size="10" font-weight="700" fill="#3b789e" text-anchor="middle">40%</text>
            <text x="195" y="145" font-size="10" font-weight="700" fill="#223832" text-anchor="middle">110 年</text>

            <!-- 111 (x=280) 108 Curriculum First Year -->
            <rect x="265" y="57" width="30" height="73" rx="3" fill="#e6f3eb" stroke="#45825b" stroke-width="1.4"/>
            <text x="280" y="51" font-size="10" font-weight="800" fill="#45825b" text-anchor="middle">52%</text>
            <text x="280" y="145" font-size="10" font-weight="800" fill="#45825b" text-anchor="middle">111 年*</text>

            <!-- 112 (x=365) -->
            <rect x="350" y="49" width="30" height="81" rx="3" fill="#e6f3eb" stroke="#45825b" stroke-width="1.2"/>
            <text x="365" y="43" font-size="10" font-weight="700" fill="#45825b" text-anchor="middle">58%</text>
            <text x="365" y="145" font-size="10" font-weight="700" fill="#223832" text-anchor="middle">112 年</text>

            <!-- 113 (x=450) -->
            <rect x="435" y="43" width="30" height="87" rx="3" fill="#fdf4e3" stroke="#c4821a" stroke-width="1.2"/>
            <text x="450" y="37" font-size="10" font-weight="700" fill="#c4821a" text-anchor="middle">62%</text>
            <text x="450" y="145" font-size="10" font-weight="700" fill="#223832" text-anchor="middle">113 年</text>

            <!-- 114 (x=535) -->
            <rect x="520" y="39" width="30" height="91" rx="3" fill="#fdf4e3" stroke="#c4821a" stroke-width="1.2"/>
            <text x="535" y="33" font-size="10" font-weight="700" fill="#c4821a" text-anchor="middle">65%</text>
            <text x="535" y="145" font-size="10" font-weight="700" fill="#223832" text-anchor="middle">114 年</text>

            <!-- 115 (x=620) -->
            <rect x="605" y="35" width="30" height="95" rx="3" fill="#fdedeb" stroke="#b84735" stroke-width="1.5"/>
            <text x="620" y="29" font-size="10" font-weight="800" fill="#b84735" text-anchor="middle">68%</text>
            <text x="620" y="145" font-size="10" font-weight="800" fill="#b84735" text-anchor="middle">115 年 (現行)</text>

            <!-- Connecting trend line -->
            <polyline points="110,85 195,74 280,57 365,49 450,43 535,39 620,35" fill="none" stroke="#b84735" stroke-width="2.2" stroke-linecap="round"/>
            <circle cx="110" cy="85" r="3.5" fill="#3b789e"/>
            <circle cx="195" cy="74" r="3.5" fill="#3b789e"/>
            <circle cx="280" cy="57" r="4" fill="#45825b"/>
            <circle cx="365" cy="49" r="3.5" fill="#45825b"/>
            <circle cx="450" cy="43" r="3.5" fill="#c4821a"/>
            <circle cx="535" cy="39" r="3.5" fill="#c4821a"/>
            <circle cx="620" cy="35" r="4.5" fill="#b84735"/>
          </svg>
        </div>
      </div>

      <div class="table-wrap">
        <table class="teaching-table">
          <caption>國中教育會考近七年（109~115）命題趨勢與素養題佔比分析表</caption>
          <thead>
            <tr>
              <th scope="col" style="width:12%;">會考年度</th>
              <th scope="col" style="width:15%;">課綱階段與定位</th>
              <th scope="col" style="width:38%;">試題風格特徵與重大變化</th>
              <th scope="col" style="width:12%;">長文圖表佔比</th>
              <th scope="col" style="width:23%;">頂標 A++ 奪分突破關鍵</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">109 年 (2020)</th>
              <td>九年一貫末期 (銜接期)</td>
              <td>重視學科基本核心定義與標準題型運算，傳統名詞背誦與公式帶入型題目仍佔一定比重；該年因疫情英聽停考。</td>
              <td>約 32%</td>
              <td>掌握課本核心概念與基礎計算熟練度，避免粗心計算失誤。</td>
            </tr>
            <tr>
              <th scope="row">110 年 (2021)</th>
              <td>課綱交替過渡年</td>
              <td>試題情境化比例提高，科普長篇閱讀題增多，數學開始出現跨學科（如自然現象、生活統計）情境非選題。</td>
              <td>約 40%</td>
              <td>培養 500 字以上長篇題幹快速提煉已知條件與核心問題的能力。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#2d5c48;">111 年 (2022)</th>
              <td>108 課綱首屆會考</td>
              <td>正式迎來素養導向命題里程碑！跨領域長篇題組大幅增加，非連續文本（圖表、地圖、數據看板）成為命題標配。</td>
              <td>約 52%</td>
              <td>徹底擺脫死背公式，學會由情境題幹抽離出數學幾何模型與物理因果鏈。</td>
            </tr>
            <tr>
              <th scope="row">112 年 (2023)</th>
              <td>素養題型成熟深化</td>
              <td>雙文本對照閱讀、多圖表綜合判讀題型成熟；理化地科實驗題強調變因控制與探究假設檢驗，選項干擾性增加。</td>
              <td>約 58%</td>
              <td>精準閱讀圖表坐標軸單位與圖例，練習雙文本觀點比較與邏輯推論。</td>
            </tr>
            <tr>
              <th scope="row">113 年 (2024)</th>
              <td>探究實作全面開花</td>
              <td>自然科實驗題組比例創高，數學非選題融入真實生活決策（如租車方案最優化、公共工程統計），重視文字論述完整性。</td>
              <td>約 62%</td>
              <td>數學非選題必須完整寫出「定義假設 ➔ 列式運算 ➔ 合理解釋說明」之三段式結構。</td>
            </tr>
            <tr>
              <th scope="row">114 年 (2025)</th>
              <td>多模態與數位時代素養</td>
              <td>題目取材高度契合現代生活（假訊息辨識、氣候變遷因應、AI 數位倫理），文字量大但雜訊多，考驗資訊過濾敏銳度。</td>
              <td>約 65%</td>
              <td>練就「圈出題幹核心關鍵字」與「迅速排除題目贅述雜訊」的高速審題直覺。</td>
            </tr>
            <tr>
              <th scope="row" style="color:#b84735;">115 年 (2026)</th>
              <td>深度素養與決策思辨 (現行)</td>
              <td>全面聚焦高層次認知（布魯姆分類之分析、評鑑與創造），跨學科融合題普及，非連續文本與真實情境決策佔絕對主導。</td>
              <td>約 68%</td>
              <td>回歸各科底層心智模型，解題時兼具宏觀概念架構與微觀防呆驗算能力。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

