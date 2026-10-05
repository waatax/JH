// dist/pedagogy-visuals.js - Instructional Infographics, Charts & Pedagogical Tables
// Built for Zhixing Junior Academy (108 Curriculum Comprehensive Study & Exam Prep)

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ============================================================================
// 1. HOME & OVERVIEW: 3-Year Milestone Roadmap & Resource Matrix
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
      
      <div class="table-wrap">
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
// 2. COURSES / CURRICULUM MAP: 8-Domain Cross-Reference & 5-Stage Method
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
    </section>
  `;
}

// ============================================================================
// 3. SUBJECT PORTAL: Subject-Specific Architecture, Trends & Strategies
// ============================================================================
const SUBJECT_METAS = {
  math: {
    trends: [
      ['數與量運算', '每年固定 2~3 題；考質因數分解、科學記號與根式運算', '負數去括號變號粗心、科學記號次方忘記標準化', '先列括號確認正負號；乘除先數負因子個數；檢查指數是否符合 1≤a<10'],
      ['代數與函數', '每年 5~7 題；二元一次聯立、一元一次不等式、二次函數極值', '同乘負數不等號忘記反轉、二次函數頂點平移左加右減搞反', '將答案代回原式檢核；畫簡圖標示開口方向與頂點；確認變數有無非負限制'],
      ['空間與幾何證明', '每年 7~9 題；全等相似判定、三心性質、圓形幾何、非選題大宗', '誤用 SSA 或 AAA 判別全等、圓周角與圓心角關係混淆', '在圖上標註已知條件與等長記號；非選擇題寫清「因為…所以…定理名稱」'],
      ['統計與機率', '每年 3~4 題；盒狀圖 IQR、平均數中位數比較、等可能樣本空間', '誤以為盒狀圖箱子長代表人數多；樹狀圖漏算不放回情境', '記住箱體代表中間約 50% 資料；用二維表格列出所有等可能樣本點']
    ],
    strategy: '先搶穩前 15 題基礎題；遇到幾何題一定要自己動手畫輔助線；非選擇題嚴格保留推導算式與單位。'
  },
  physics: {
    trends: [
      ['力與運動', '合力為零等速直線、牛頓運動定律、浮力與壓力', '誤以為等速前進物體受力為零、浮體排開體積看成全部體積', '畫隔離物體受力圖；浮體必有 B＝W；完全浸沒時排開體積固定'],
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
      ['細胞與體內恆定', '細胞膜擴散滲透、光合作用、神經與內分泌', '將酵素受質專一性與溫度變性條件混淆；水分散失途徑', '消化酵素具專一性；植物水分運輸主要靠葉片蒸散拉力；血液循環體與肺雙循環'],
      ['生殖與遺傳', '細胞分裂與減數分裂染色體套數、棋盤方格單性雜交', '減數分裂染色體複製次數算成兩次；性聯遺傳男女機率', '減數分裂「複製一次、分裂兩次」2n➔n；畫棋盤方格精確算出子代表現型比'],
      ['演化與生態系', '達爾文天擇說、碳循環、食物鏈能量塔金字塔', '用拉馬克用進廢退解釋天擇；誤以為能量在食物鏈可循環', '天擇關鍵是「先有變異，環境篩選」；能量金字塔每層只有約 10% 傳遞']
    ],
    strategy: '生物重在生理機制流程。圖表題務必分清對照組與實驗組操縱變因；注意顯性隱性遺傳條件。'
  },
  earth: {
    trends: [
      ['固體地球與地質', '地層疊置、截切定律、正逆斷層、板塊邊界', '誤將逆斷層受張力拉扯；侵蝕與沉積地形分布混淆', '上盤向上為逆斷層（受擠壓力）；聚合板塊多褶皺逆斷層；河流上游侵蝕下游沉積'],
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
  social: {
    trends: [
      ['歷史脈絡分析', '史料一手二手辨析、臺灣/東亞/世界重大變遷因果', '死記朝代年號而忽略社會經濟與制度演進脈絡', '掌握時間軸與跨區域文化商貿交流（如絲路、大航海、冷戰）'],
      ['地理空間圖表', '等高線判讀、氣候圖氣溫雨量分析、全球區域特色', '看錯氣候圖半球位置（南半球 7 月氣溫低）；忽略比例尺', '先看緯度海陸位置判定氣候型態；等高線凸向低處為山脊、凸向高處為山谷'],
      ['公民生活與制度', '五權憲法制衡、人權保障、市場供需曲線、法規位階', '混淆民事責任（賠償）與刑事責任（處罰）；外部成本未內部化', '權力分立防專制；供給法則價漲量增、需求法則價漲量跌；憲法高於法律高於命令']
    ],
    strategy: '社會科是「時空地景與制度生活」的三維結合。讀題抓住題幹中的時間、地點與法規身分關鍵字。'
  }
};

export function renderSubjectGuide(s) {
  const meta = SUBJECT_METAS[s.id] || SUBJECT_METAS[s.domain === '自然科學' ? 'physics' : s.domain === '社會' ? 'social' : 'math'] || {
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
// 4. WRITING STUDIO: CAP 6-Score Rubric, 4-Paragraph SVG & Connectives
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
// 5. REVIEW & SPACED REPETITION: Ebbinghaus Science & Cognitive Diagnostics
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
            <!-- Axes -->
            <line x1="60" y1="140" x2="500" y2="140" stroke="#687b74" stroke-width="1.5"/>
            <polygon points="500,140 492,136 492,144" fill="#687b74"/>
            <line x1="60" y1="140" x2="60" y2="25" stroke="#687b74" stroke-width="1.5"/>
            <polygon points="60,25 56,33 64,33" fill="#687b74"/>
            <text x="50" y="30" font-size="10" font-weight="700" fill="#687b74" text-anchor="end">記憶保留率 (%)</text>
            <text x="495" y="158" font-size="10" font-weight="700" fill="#687b74" text-anchor="end">時間 (天數)</text>
            
            <!-- Natural Forgetting Curve (Red dash) -->
            <path d="M 60 40 Q 90 120 480 135" fill="none" stroke="#b84735" stroke-width="2.5" stroke-dasharray="4,4"/>
            <text x="210" y="125" font-size="10" font-weight="700" fill="#b84735">無複習遺忘曲線 (24hr 掉到 30%)</text>
            
            <!-- Spaced Review Curves (Green) -->
            <!-- 1 Day -->
            <path d="M 60 40 Q 80 80 120 90" fill="none" stroke="#45825b" stroke-width="2"/>
            <line x1="120" y1="90" x2="120" y2="40" stroke="#c4821a" stroke-width="2"/>
            <circle cx="120" cy="40" r="4" fill="#c4821a"/>
            <text x="120" y="155" font-size="9" fill="#2d5c48" text-anchor="middle">第 1 天</text>
            
            <!-- 3 Days -->
            <path d="M 120 40 Q 150 70 200 75" fill="none" stroke="#45825b" stroke-width="2"/>
            <line x1="200" y1="75" x2="200" y2="40" stroke="#c4821a" stroke-width="2"/>
            <circle cx="200" cy="40" r="4" fill="#c4821a"/>
            <text x="200" y="155" font-size="9" fill="#2d5c48" text-anchor="middle">第 3 天</text>
            
            <!-- 7 Days -->
            <path d="M 200 40 Q 240 60 320 65" fill="none" stroke="#45825b" stroke-width="2"/>
            <line x1="320" y1="65" x2="320" y2="40" stroke="#c4821a" stroke-width="2"/>
            <circle cx="320" cy="40" r="4" fill="#c4821a"/>
            <text x="320" y="155" font-size="9" fill="#2d5c48" text-anchor="middle">第 7 天</text>
            
            <!-- 14 Days -->
            <path d="M 320 40 Q 380 50 480 55" fill="none" stroke="#45825b" stroke-width="3"/>
            <circle cx="480" cy="55" r="5" fill="#2d5c48"/>
            <text x="480" y="155" font-size="9" fill="#2d5c48" text-anchor="middle">第 14 天</text>
            <text x="480" y="45" font-size="10" font-weight="800" fill="#2d5c48" text-anchor="middle">永久記憶鞏固 ➔</text>
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
// 6. PROGRESS: All-Subject Competency Growth Radar & Metacognitive Checklist
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
            <!-- Center at (270, 100) -->
            <!-- Hexagon grid lines -->
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
            
            <!-- Axis lines -->
            ${[0, 1, 2, 3, 4, 5].map(i => {
              const ang = i * Math.PI / 3;
              return `<line x1="270" y1="100" x2="${(270 + 95 * Math.cos(ang)).toFixed(1)}" y2="${(100 + 95 * Math.sin(ang)).toFixed(1)}" stroke="#687b74" stroke-width="1.2"/>`;
            }).join('')}
            
            <!-- Balanced Competency Polygon (Filled) -->
            <polygon points="
              ${(270 + 75 * Math.cos(0)).toFixed(1)},${(100 + 75 * Math.sin(0)).toFixed(1)}
              ${(270 + 70 * Math.cos(Math.PI/3)).toFixed(1)},${(100 + 70 * Math.sin(Math.PI/3)).toFixed(1)}
              ${(270 + 80 * Math.cos(2*Math.PI/3)).toFixed(1)},${(100 + 80 * Math.sin(2*Math.PI/3)).toFixed(1)}
              ${(270 + 65 * Math.cos(Math.PI)).toFixed(1)},${(100 + 65 * Math.sin(Math.PI)).toFixed(1)}
              ${(270 + 72 * Math.cos(4*Math.PI/3)).toFixed(1)},${(100 + 72 * Math.sin(4*Math.PI/3)).toFixed(1)}
              ${(270 + 78 * Math.cos(5*Math.PI/3)).toFixed(1)},${(100 + 78 * Math.sin(5*Math.PI/3)).toFixed(1)}
            " fill="#45825b" fill-opacity="0.25" stroke="#2d5c48" stroke-width="2.5"/>
            
            <!-- Dimension labels -->
            <text x="385" y="104" font-size="11" font-weight="800" fill="#2d5c48">語言文本理解</text>
            <text x="330" y="190" font-size="11" font-weight="800" fill="#2d5c48">符號運算與證明</text>
            <text x="145" y="190" font-size="11" font-weight="800" fill="#2d5c48">科學實驗與探究</text>
            <text x="90" y="104" font-size="11" font-weight="800" fill="#2d5c48">時空脈絡與制度</text>
            <text x="145" y="20" font-size="11" font-weight="800" fill="#2d5c48">資訊與工程思維</text>
            <text x="330" y="20" font-size="11" font-weight="800" fill="#2d5c48">藝術美感與表達</text>
          </svg>
        </div>
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
