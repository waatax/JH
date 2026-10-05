# scripts/author_remaining_48_diagrams.py
import re

svg_diagrams_code = """
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
"""

with open('dist/diagrams.js', 'r', encoding='utf-8') as f:
    orig = f.read()

# Find the end of diagrams object before fallback function
marker = '};\n\nfunction defaultSubjectDiagram'
pos = orig.find(marker)
if pos == -1:
    marker = '};\n\n// Generic'
    pos = orig.find(marker)

prefix = orig[:pos]
suffix = orig[pos:]

new_content = prefix + svg_diagrams_code + suffix

with open('dist/diagrams.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully injected all 48 specialized diagrams into dist/diagrams.js!")
