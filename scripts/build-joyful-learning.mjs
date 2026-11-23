// scripts/build-joyful-learning.mjs
// Generates dist/joyful-learning.js
// Empowering junior high school students (國一～國三) to learn joyfully, master all knowledge points
// and possible question archetypes (Type A / B / C), and fall in love with all 21 academic subjects.

import fs from 'node:fs';
import { subjects, units } from '../dist/curriculum.js';
import { teachingFor } from '../dist/teaching.js';
import { workedCases } from '../dist/worked-cases.js';
import { lessonDeepening } from '../dist/lesson-deepening.js';
import { explicitKnowledgePoints } from '../dist/explicit-knowledge-points.js';

const clean = s => String(s || '').replace(/\s+/g, ' ').trim();

// 1. Rich, Teen-Relatable Subject Love Profiles for all 21 Subjects
const subjectLoveProfiles = {
  chinese: {
    superpower: '🖋️ 文字魔法與人心讀心術師',
    whyLoveIt: '國語文不只是背注音解釋，而是幫你裝上「看穿言外之意的雷達」！從小說伏筆、歌詞意境、網路迷因到自媒體文案，學會國語文就能用最精準的文字打動人心、識破話術。',
    realLifeMagic: [
      '🎬 追劇與動漫：一秒看懂角色台詞裡的「雙關、反諷與伏筆」，比別人更早猜出劇情神反轉！',
      '💬 社交與表達：寫卡片、發限動或上台報告時，用對譬喻和排比，讓全場瞬間記住你的觀點。',
      '🕵️ 資訊防身術：看網路新聞或廣告時，一眼分清楚哪句是「客觀事實」、哪句是帶風向的「主觀推論」。'
    ],
    joyfulHack: '把每篇課文當成「推理劇本」：先抓主角情緒轉折詞（但是、然而、卻），再看作者用什麼景物偷偷暗示心情，閱讀題馬上變超簡單！',
    cheer: '知知貓頭鷹：「當你讀懂文字背後的故事，千年前的古人也會變成你的聊天好友喔！」',
    lifeHookPrefix: '在日常看小說、滑社群貼文或聽流行歌時'
  },
  english: {
    superpower: '🌍 跨文化任意門與世界玩家',
    whyLoveIt: '英語是打開全世界遊戲伺服器、國外 YouTuber 頻道、歐美影集與未來旅行的「萬用鑰匙」！當你把文法當成組裝樂高積木的規則，就能輕鬆跟全世界交朋友。',
    realLifeMagic: [
      '🎮 遊戲與科技：看懂國外第一手遊戲攻略、介面設定與熱門外電，不用苦等翻譯！',
      '✈️ 旅行與點餐：出國旅遊、在機場看指標或用英文認識新朋友時，開口就能自信溝通。',
      '🎧 音樂與影集：聽懂英文歌的押韻巧思與影集原音笑點，感受最道地的語感魅力。'
    ],
    joyfulHack: '別死背單字表！先抓句子的「時間線索（時態）」和「主角動作（動詞）」，像拼樂高一樣把句子拆開再組合，克漏字與閱讀測驗秒破關！',
    cheer: '知知貓頭鷹：「多會一種語言，就像在腦中多開了一個全新的世界地圖！」',
    lifeHookPrefix: '在看外國影集、打國際服遊戲或出國旅遊看英文告示時'
  },
  math: {
    superpower: '🔮 宇宙規律與機率破解師',
    whyLoveIt: '數學是宇宙的隱藏程式碼！從手遊抽卡機率、超商打折划算度、籃球投籃拋物線到 AI 演算法，學會數學就像開了「看穿數字規律的透視眼」，再複雜的問題都能拆解成簡單幾步。',
    realLifeMagic: [
      '🎲 遊戲抽卡與中獎率：用機率與期望值算出抽卡保底與買一送一哪個最划算，絕不被商人套路！',
      '🏀 運動與空間幾何：籃球三分球的拋物線頂點（二次函數）、撞球反彈角度（對稱與相似形）全都是數學！',
      '💰 聰明理財規劃：用方程式與不等式一秒算出存錢目標、團購分攤與打折最優解。'
    ],
    joyfulHack: '數學最怕心算跳步！養成「先畫數線／簡圖 ➔ 圈出單位與正負號 ➔ 把答案代回題目驗算」三步曲，粗心失誤直接歸零！',
    cheer: '知知貓頭鷹：「算出答案對齊條件的那一瞬間，比打贏遊戲 Boss 還要有成就感！」',
    lifeHookPrefix: '在超商比價打折、算手遊抽卡機率或看運動比賽數據時'
  },
  biology: {
    superpower: '🧬 生命演化與生態密碼偵探',
    whyLoveIt: '生物課是一本「關於你自己與地球所有生物的使用說明書」！為什麼緊張會心跳加速？為什麼運動後會喘？為什麼父母跟我們長得像？每個知識點都在解開生命的奇蹟。',
    realLifeMagic: [
      '🏃 身體外掛解密：搞懂神經反射、內分泌與呼吸循環，知道怎麼運動、睡眠與補充營養最有精神！',
      '🐾 自然觀察家：去海邊、森林或公園時，一眼看懂植物葉脈、動物保護色與生態食物網的平衡。',
      '🧪 基因與醫學超前線：理解 DNA、遺傳機率與疫苗免疫原理，成為懂科學的健康達人。'
    ],
    joyfulHack: '學生物一定要「看圖說故事」！把細胞構造、血液循環或反射弧想像成一座分工合作的城市工廠，順著箭頭走一遍就永遠不會背反！',
    cheer: '知知貓頭鷹：「你全身上下幾十兆個細胞，每秒鐘都在為你上演最精彩的生命魔術！」',
    lifeHookPrefix: '在運動流汗、觀察家裡寵物植物或好奇身體為什麼會反射動作時'
  },
  physics: {
    superpower: '⚡ 時空、能量與光電魔導師',
    whyLoveIt: '物理讓看不見的「力、光、熱、電、波」全部現形！為什麼雲霄飛車倒著開不會掉下來？為什麼湯匙放進水裡看起來折斷了？搞懂物理，生活處處都是你的科學遊樂場。',
    realLifeMagic: [
      '🎢 遊樂園力學王：坐雲霄飛車與海盜船時，親身體驗位能與動能轉換、慣性與加速度的刺激！',
      '📱 光學與電學達人：理解眼鏡矯正、相機鏡頭成像與家裡電器功率，既安全又懂科技原理。',
      '🎸 聲音與波動玩家：從樂器音調高低（頻率）、音量大小（振幅）到回音測距，秒懂聲波魔法。'
    ],
    joyfulHack: '物理公式不是拿來死背的！先畫出「受力方向箭頭」或「光線行進圖」，確認正負方向與單位（公尺/秒、瓦特），公式自然水到渠成！',
    cheer: '知知貓頭鷹：「牛頓和愛因斯坦也是從對身邊小事感到好奇開始的喔！」',
    lifeHookPrefix: '在搭捷運煞車、照鏡子拍照、坐雲霄飛車或使用家電時'
  },
  chemistry: {
    superpower: '🧪 微觀粒子與鍊金術調配師',
    whyLoveIt: '化學帶你戴上「微觀放大鏡」，看穿萬物是由哪些原子與分子拼成的！從氣泡水冒泡泡、暖暖包發熱、切洋蔥流眼淚到煙火的繽紛色彩，全都是超酷的化學反應。',
    realLifeMagic: [
      '🥤 廚房裡的化學家：為什麼小蘇打加檸檬汁會冒泡泡？為什麼冰鎮飲料比溫飲料氣泡更多？',
      '🔥 生活材料大揭密：從防鏽塗層、酸鹼清潔劑使用安全到電池發電原理，處處都能派上用場。',
      '🎆 粒子重組魔術：看懂化學反應前後「原子種類與數目不變（質量守恆）」，就像原子樂高重新組裝！'
    ],
    joyfulHack: '學化學先抓「粒子觀點」：想像自己縮小成一顆原子，看看反應前後是「距離改變（物理變化）」還是「重新牽手組隊（化學變化）」，觀念瞬間無敵清楚！',
    cheer: '知知貓頭鷹：「整個世界就是一座超大型的原子樂高樂園，等你來探索組合規律！」',
    lifeHookPrefix: '在喝氣泡飲料、用暖暖包、調配清潔劑或看煙火變色時'
  },
  earth: {
    superpower: '🌌 星際與地球脈動觀測家',
    whyLoveIt: '地球科學把教室無限放大到「整顆地球、大氣海洋與浩瀚宇宙」！為什麼會有四季與梅雨？為什麼臺灣常有地震？今晚的月亮為什麼長這樣？抬頭看天空就能印證所學！',
    realLifeMagic: [
      '🌦️ 氣象預報讀心術：看懂地面天氣圖的高低氣壓、冷暖鋒面與衛星雲圖，出門要不要帶傘問你最準！',
      '🌕 觀星與月相浪漫派：抬頭看月亮位置就知道現在大概幾點、初幾，還能找出四季星空星座。',
      '⛰️ 臺灣地質探險家：去太魯閣、野柳女王頭或泡溫泉時，一眼看出板塊聚合、風化侵蝕的鬼斧神工。'
    ],
    joyfulHack: '地科最愛考「立體空間轉視角」！用手比出氣流旋轉方向，或畫出「太陽—地球—月球」俯視圖，把立體變平面，考題怎麼轉都難不倒你！',
    cheer: '知知貓頭鷹：「腳下的岩石記錄了千萬年的地球歷史，頭頂的星光則是來自宇宙的信件！」',
    lifeHookPrefix: '在看氣象預報鋒面、抬頭觀察月亮陰晴圓缺或感受地震搖晃時'
  },
  history: {
    superpower: '⏳ 時空旅人與文明劇本導演',
    whyLoveIt: '歷史不是冷冰冰的年代數字，而是一場場真實發生過的「人類生存與選擇大戲」！當你搭上時光機回到過去，理解當時人們為什麼那樣做，就能看懂今天的世界為什麼長這樣。',
    realLifeMagic: [
      '🏮 老街與古蹟解碼：逛大稻埕、安平古堡或鹿港老街時，從建築與地名就能說出超精彩的時代故事！',
      '🎮 策略遊戲與影視：玩歷史策略遊戲或看古裝劇、戰爭片時，一眼看懂背後的貿易航線與政權博弈。',
      '🧭 因果推理超能力：學會從「背景原因 ➔ 關鍵轉折 ➔ 制度影響」串聯事件，再也不用死背零碎年代！'
    ],
    joyfulHack: '讀歷史要畫「時間軸＋因果骨牌圖」！問自己三個問題：「那時候發生了什麼問題？他們想出什麼辦法？結果改變了誰的生活？」歷史馬上活起來！',
    cheer: '知知貓頭鷹：「讀懂過去的人如何面對挑戰，也能給今天的我們滿滿的勇氣與智慧！」',
    lifeHookPrefix: '在逛老街古蹟、玩歷史策略遊戲或看時代電影時'
  },
  geography: {
    superpower: '🗺️ 地表空間與全球生存領航員',
    whyLoveIt: '地理教你讀懂「大地的長相與人類生活的默契」！為什麼有些地方種茶、有些地方養牡蠣？為什麼北歐有極光、沙漠日夜溫差超大？學會地理，看世界地圖就像看立體實景。',
    realLifeMagic: [
      '🧭 旅行規劃王牌：看懂等高線地形圖、氣候圖與交通路網，規劃旅遊路線與穿搭裝備超專業！',
      '🍱 美食與產地偵探：從臺灣各地名產（屏東蓮霧、彰化稻米、新竹米粉）秒懂地形、季風與日照的關係。',
      '🌍 全球視野玩家：理解各國時差、產業分工與人口遷移，看國際新聞時馬上掌握地緣關鍵。'
    ],
    joyfulHack: '地理的核心密碼是「位置 ➔ 地形與風向 ➔ 氣候水文 ➔ 產業聚落」因果鏈！看到圖表先看座標軸與風向箭頭，答案就在圖裡面！',
    cheer: '知知貓頭鷹：「一張地圖在手，全世界的山川、季風與城市都在對你說故事！」',
    lifeHookPrefix: '在用手機地圖導航、品嚐各地特產美食或規劃出國旅行時'
  },
  civics: {
    superpower: '⚖️ 社會規則制定者與權利守門人',
    whyLoveIt: '公民與社會是幫你升級「現代社會生存裝備」的必修課！從班會投票、網路發言界線、打工權益、消費退貨到國家法律與經濟運作，懂公民的人最懂得保護自己、尊重他人。',
    realLifeMagic: [
      '🛡️ 權益防身術：網購遇到瑕疵品、網路照片被盜用或發生爭執時，清楚知道民法、刑法與消保法怎麼保障你。',
      '📈 經濟決策小達人：理解機會成本、供需法則與比較利益，不管是分配讀書時間還是管零用錢都超聰明！',
      '🗳️ 民主參與玩家：看懂政府五權分立、選舉制度與公共議題討論，成為有思辨力的現代公民。'
    ],
    joyfulHack: '公民題最愛考「情境配對」！先看主角是「個人對個人（民法）」、「犯罪處罰（刑法）」還是「人民對政府（行政法）」，抓準主體與關係就百發百中！',
    cheer: '知知貓頭鷹：「了解規則不是為了被束縛，而是為了讓每個人都能自由又安全地發光！」',
    lifeHookPrefix: '在網購消費、參與班級投票或看新聞討論公共政策與法律時'
  },
  visual: {
    superpower: '🎨 視覺美感與光影創世畫師',
    whyLoveIt: '視覺藝術讓你擁有一雙「把平凡日常變成絕美畫面」的眼睛！不管是拍照構圖、設計海報、搭配穿搭色彩還是欣賞名畫，懂視覺語言就能讓你的創意被全世界看見。',
    realLifeMagic: [
      '📸 拍照與排版大神：運用三分構圖法、互補色對比與留白，手機隨手拍出的照片都像雜誌封面！',
      '🎨 色彩情緒魔法：知道暖色調帶來活力、冷色調帶來寧靜，設計簡報、手帳或房間佈置超有質感。',
      '🖼️ 展覽鑑賞玩家：走進美術館不再走馬看花，能從筆觸、光影與材質讀懂藝術家的內心宇宙。'
    ],
    joyfulHack: '先觀察作品的「點、線、面、色彩與明暗」，再問自己：「視線最先被哪裡吸引？給你什麼感覺？」美感分析其實超直覺！',
    cheer: '知知貓頭鷹：「每個人眼中的世界都有獨特的濾鏡，勇敢畫出屬於你的色彩吧！」',
    lifeHookPrefix: '在用手機拍照構圖、設計社團海報或挑選衣服配色時'
  },
  music: {
    superpower: '🎵 聲波律動與情緒共鳴指揮家',
    whyLoveIt: '音樂是人類共通的「情緒瞬移魔法」！只要幾個音符與節奏組合，就能讓人熱血沸騰或瞬間平靜。學會音樂要素，你不只是聽歌的人，更是能聽見編曲巧思的知音。',
    realLifeMagic: [
      '🎧 聽歌升級高解析：聽流行歌、動漫主題曲或電影配樂時，能聽出鼓點節奏、和聲層次與樂器音色！',
      '🥁 節奏與律動達人：拍手打拍子、唱 KTV 或玩音樂節奏遊戲時，精準掌握強弱拍與速度變化。',
      '🌍 聽見世界文化：從臺灣傳統戲曲、原住民古調到西方古典與爵士樂，用耳朵環遊世界。'
    ],
    joyfulHack: '記住音樂四大積木：「節奏（長短快慢）、旋律（高低走向）、和聲（厚實色彩）、音色（樂器個性）」，聽題時先抓哪一個要素在改變！',
    cheer: '知知貓頭鷹：「當心情說不出來的時候，就讓旋律幫你唱出來吧！」',
    lifeHookPrefix: '在戴耳機聽最愛的歌、玩音樂節奏遊戲或看電影配樂烘托氣氛時'
  },
  performing: {
    superpower: '🎭 舞台魅力與肢體故事魔法師',
    whyLoveIt: '表演藝術是「用身體、聲音與想像力創造奇蹟」的舞台！它教你怎麼控制音量與眼神、怎麼跟夥伴接梗即興合作、怎麼站在台前自信地說出好故事。',
    realLifeMagic: [
      '🎤 上台報告零怯場：運用丹田發聲、眼神交流與肢體開放姿態，讓大家目不轉睛聽你說話！',
      '🎬 戲劇與走位導演：拍短影音、班級演戲或看舞台劇時，秒懂鏡框式舞台、走位高低層次與燈光氣氛。',
      '🤝 團隊默契神隊友：透過即興劇場的「Yes, and（接納並延續）」原則，成為最受歡迎的合作夥伴。'
    ],
    joyfulHack: '把每個題目想像成「你就是舞台導演」：演員站在哪裡觀眾才看得到？聲音怎麼變才能表現角色情緒？在腦海裡演一遍就懂了！',
    cheer: '知知貓頭鷹：「人生就是一場精彩的即興演出，每個自信的眼神都是你的聚光燈！」',
    lifeHookPrefix: '在班級話劇排練、拍短影音分鏡或上台自我介紹時'
  },
  computing: {
    superpower: '💻 演算法召喚師與數位造物主',
    whyLoveIt: '資訊科技讓你從「只會滑手機的使用者」進化成「指揮電腦幫你做事的創造者」！學會演算法思維，任何大難題都能被你拆解成電腦聽得懂的流程，還能練就防範網路詐騙的金鐘罩。',
    realLifeMagic: [
      '🤖 程式與自動化思維：用「循序、選擇（如果…否則）、重複（迴圈）」邏輯，自己設計小遊戲與工具！',
      '🔍 搜尋與排序神技：秒懂二元搜尋法為什麼比從頭翻找快超多，整理資料與找檔案效率翻倍。',
      '🔒 資安與隱私護盾：看穿釣魚網站、設計高強度密碼、理解數位足跡，保護自己的帳號安全。'
    ],
    joyfulHack: '遇到流程圖或迴圈題，當一回「人肉電腦」：拿筆在旁邊寫下變數初始值，一步一步跟著箭頭更新數值，保證百分之百算對！',
    cheer: '知知貓頭鷹：「一行行邏輯清楚的演算法，就是現代世界最強大的魔法咒語！」',
    lifeHookPrefix: '在寫程式做小遊戲、設定帳號兩步驟驗證或用搜尋引擎找資料時'
  },
  technology: {
    superpower: '🛠️ 創客機關與工程實現家',
    whyLoveIt: '生活科技是把腦中天馬行空的點子「親手做出來」的創客基地！為什麼橋樑用三角形結構最穩？腳踏車變速器怎麼省力？懂得結構與機構，你就能動手改造生活用品。',
    realLifeMagic: [
      '🚲 機械結構解密：看懂齒輪、滑輪、連桿與槓桿如何轉換力的大小與方向，修理與組裝物品超順手！',
      '🌉 結構穩固工程師：知道三角形桁架抗形變、拱形結構分散壓力，做模型或收納架堅固又美觀。',
      '📐 設計思考流程：遇到生活不便時，懂得「界定問題 ➔ 畫設計圖 ➔ 選材加工 ➔ 測試改良」。'
    ],
    joyfulHack: '生科題要抓「需求與限制」！先看這個作品要承受什麼力（拉力、壓力、剪力）或要達成什麼運動（旋轉變直線），再挑對應的材料與機構！',
    cheer: '知知貓頭鷹：「失敗的測試不是錯誤，而是幫你找到更棒設計的必經路標！」',
    lifeHookPrefix: '在組裝模型家具、騎變速腳踏車或動手做創意機關作品時'
  },
  health: {
    superpower: '🛡️ 身心防護罩與健康領航官',
    whyLoveIt: '健康教育是你一輩子最實用的「自我照顧與急救錦囊」！從青春期身心變化、聰明看食品營養標示、運動傷害處理（PRICE）到 CPR 與情緒調適，學會了能保護自己也能救人一命。',
    realLifeMagic: [
      '🥗 超商飲食智慧王：看懂包裝上的營養標示與熱量反式脂肪，外食也能吃得好吃又健康！',
      '🚑 黃金急救超能力：熟記燒燙傷「沖脫泡蓋送」、扭傷保護與 CPR＋AED 步驟，危急時刻冷靜救人。',
      '💬 人際界線與情緒力：練習「我訊息」溝通與身體自主權界線，建立健康互相尊重的人際關係。'
    ],
    joyfulHack: '健康題緊扣「先確認環境安全 ➔ 科學實證步驟 ➔ 尊重自己與他人界線」，用保護生命與健康的初衷思考，每個選項都清清楚楚！',
    cheer: '知知貓頭鷹：「懂得好好照顧自己的身體與心情，是你送給自己最棒的禮物！」',
    lifeHookPrefix: '在超商挑選餐點看營養標示、運動熱身防護或練習表達心情時'
  },
  pe: {
    superpower: '🏃 身體動能與戰術協調王牌',
    whyLoveIt: '體育課不只是流汗跑步，而是訓練「大腦與肌肉完美連線」的實戰場！當你掌握發力協調、心率區間與球類空間戰術，運動就會變得輕鬆、安全又充滿團隊獲勝的快樂！',
    realLifeMagic: [
      '🏀 球類空間戰術家：打籃球、排球或羽球時，懂得拉開空間、觀察隊友跑位與預判落點，得分率大增！',
      '💓 體適能科學訓練：用運動自覺強度與心率評估訓練效果，越動越有精神、讀書專注力也跟著暴增。',
      '🤸 動作協調與保護：學會正確落地緩衝、重心轉移與伸展收操，享受運動快感同時遠離受傷。'
    ],
    joyfulHack: '體育觀念題記住三大關鍵：「運動前動態熱身 ➔ 運動中重心穩定與空間配合 ➔ 運動後緩和伸展」，安全與效率一次搞定！',
    cheer: '知知貓頭鷹：「每一次流汗與傳球配合，都在幫你的身體與大腦充電升級！」',
    lifeHookPrefix: '在球場上跟隊友跑位配合、練習投籃發球動作或跑步配速時'
  },
  home: {
    superpower: '🍳 生活美學與獨立生存玩家',
    whyLoveIt: '家政課把「照顧自己與家人的生活技能」變成超有成就感的創作！不管是親手做出一道美味料理、把衣服洗燙整齊、縫補改造小物，還是管理時間與資源，都是超酷的獨立能力。',
    realLifeMagic: [
      '🍳 料理小當家：懂食材保存、生熟食分開與營養搭配，自己下廚做早餐或點心既安全又美味！',
      '👕 穿搭與織品達人：看懂衣服洗標符號、天然與人造纖維特性，心愛的衣服洗完不縮水不褪色。',
      '🏡 空間與資源管理：運用收納分類與綠色消費原則，把書桌與生活安排得清爽又高效。'
    ],
    joyfulHack: '家政實作題先看「安全衛生（生熟分開、用火用電）」與「材料特性（棉麻吸汗、化纖快乾）」，從真實生活經驗聯想最容易拿滿分！',
    cheer: '知知貓頭鷹：「能把生活過得井井有條又充滿溫暖的人，走到哪裡都會發光！」',
    lifeHookPrefix: '在自己動手做料理、看衣服洗滌標示或整理房間書桌時'
  },
  scout: {
    superpower: '⛺ 荒野求生與團隊領導探險家',
    whyLoveIt: '童軍課把教室搬到大自然！從一條繩子打出超牢靠的繩結、看指北針與地圖定向越野、搭帳篷野炊到無痕山林（LNT），讓你具備面對未知環境的勇氣與團隊解決問題的領導力。',
    realLifeMagic: [
      '🪢 繩結實用魔法：平結綁物品、稱人結救生固定、雙套結抓牢木棍，露營或日常生活綁東西超穩固！',
      '🧭 戶外安全探險家：學會觀察天候地形、生火滅火安全與迷途自救（STOP 原則），大自然就是你的好朋友。',
      '🌱 無痕山林守護者：實踐 LNT 七大原則，享受露營野炊樂趣的同時，留給山林最乾淨的原貌。'
    ],
    joyfulHack: '童軍題最重「用途配對」與「安全優先」：平結接同粗細繩、雙半結／雙套結固定在柱上、稱人結救生不滑脫，配對清楚就絕對不會搞混！',
    cheer: '知知貓頭鷹：「準備好的人永遠不慌張，和夥伴一起完成露營任務是最難忘的青春回憶！」',
    lifeHookPrefix: '在露營搭帳篷、打包行李綁繩結或到郊外步道健行探險時'
  },
  guidance: {
    superpower: '🧭 內在心靈與天賦探索引路人',
    whyLoveIt: '輔導課是一趟「認識最真實的自己」的溫暖旅程！在國中階段面對課業壓力、朋友相處或未來升學選擇時，輔導課幫你找到自己的優勢天賦、學會傾聽與情緒調節，成為自己最好的朋友。',
    realLifeMagic: [
      '💡 發掘多元智慧：發現自己在語文、邏輯、空間、音樂、人際或內省上的獨特亮點，建立自信心！',
      '🌱 成長型思維轉換：把「我不會」變成「我只是還沒學會」，遇到挫折時懂得拆解小目標重新出發。',
      '🗺️ 生涯藍圖導航：結合興趣、能力與價值觀，認識高中、高職與五專多元進路，為未來做出好選擇。'
    ],
    joyfulHack: '輔導題的核心是「同理傾聽、不貼標籤、聚焦可控行動」：先接納情緒，再找具體可嘗試的方法，永遠給自己與他人成長的空間！',
    cheer: '知知貓頭鷹：「每個人都有自己開花結果的時區，認識自己就是最棒的超能力！」',
    lifeHookPrefix: '在思考未來想讀什麼科系、安慰心情不好的朋友或幫自己設定目標時'
  },
  local: {
    superpower: '🌾 在地文化靈魂與手語傳承者',
    whyLoveIt: '本土語文與臺灣手語帶我們聽見這片土地最親切的聲音、看見最生動的視覺語言！不管是閩南語、客語、原住民族語的趣味俗諺，還是臺灣手語的豐富表情與手勢，都是超珍貴的文化寶藏。',
    realLifeMagic: [
      '👵 跨世代溫暖對話：用流利的本土語跟阿公阿嬤、長輩聊天或逛傳統市場，距離感瞬間消失！',
      '👐 視覺語言新視野：認識臺灣手語如何結合「手形、位置、動作、方向與非手控表情」傳達心意。',
      '🏮 俗諺智慧解碼：從節慶習俗、在地地名與趣味諺語中，讀懂先民的生活幽默與智慧。'
    ],
    joyfulHack: '學本土語與手語要抓「語境情境」與「尊重多元」！理解諺語背後的比喻意思，以及手語「眼神與表情也是語法一部分」的特色，學起來超有趣！',
    cheer: '知知貓頭鷹：「每一種語言都裝著一個族群看世界的美麗角度，一起來挖寶吧！」',
    lifeHookPrefix: '在跟家裡長輩聊天、逛在地夜市廟口或觀察手語翻譯員生動的表達時'
  }
};

// Topic-specific everyday Taiwan teen life-hook matcher (eliminating repetitive subject boilerplate!)
const TOPIC_LIFE_HOOKS = [
  [/正負數|絕對值/, '查看阿里山清晨氣溫升降、計算高樓電梯地下室到頂樓的樓層差，或核對電子錢包收支餘額時'],
  [/因數|倍數|質因數/, '規劃兩班公車何時同時進站、把不同口味點心剛好平分給全班，或設計網銀密碼加密原理時'],
  [/分數|科學記號/, '調整甜點食譜份量比例、判讀手機晶片 3 奈米製程尺度，或讀懂天文望遠鏡遙遠星系距離時'],
  [/方程式|聯立/, '計算超商第二件六折與滿額折扣哪個省、規劃團購分攤費用，或反推手遊升級所需經驗值時'],
  [/比例|正比|反比|連比/, '依人數縮放珍珠奶茶黃金比例、估算固定路程開快一點能省幾分鐘，或換算地圖真實距離時'],
  [/不等式/, '在有限零用錢預算下決定最多能買幾件商品、計算安全載重上限，或估算段考至少要考幾分才達標時'],
  [/坐標|圖表|統計|機率|盒狀圖/, '看懂手機地圖定位經緯度、拆穿新聞截斷縱軸的誤導圖表，或精算遊戲抽卡保底與民調分布時'],
  [/乘法公式|多項式|因式分解/, '快速心算 99×101、拆解長方形設計圖面積重組，或化簡複雜工程計算式時'],
  [/平方根|畢氏定理/, '測量 55 吋電視螢幕實際長寬尺寸、規劃校園最短斜向捷徑，或判定書櫃轉角是不是標準直角時'],
  [/數列|級數|一次函數/, '比較兩種手機資費與計程車跳表方案、規劃每週遞增存錢目標，或推算劇院座位總數時'],
  [/全等|相似|多邊形|四邊形|三心/, '利用陽光影長免爬樹測出大樓高度、設計最穩固的橋樑桁架結構，或用折紙找出重心平衡點時'],
  [/圓|切線|圓周角|弦切角|立體/, '調整足球射門視角、計算摩天輪俯瞰角度，或估算飲料杯包裝紙面積與真實容量時'],
  [/二次函數|極值/, '分析籃球三分球最佳出手弧線、幫園遊會攤位算出「定價多少元能賺最多淨利」的最佳點時'],
  [/文言|虛字|諸子|寓言/, '讀懂成語典故的精簡邏輯、像破譯古人版「極簡縮寫梗」一樣還原對話主詞與言外之意時'],
  [/修辭|詩歌|近體詩|詞曲|散文|小說/, '欣賞流行歌詞的意象鋪陳、看穿動漫台詞的雙關伏筆與角色反轉，或寫出讓人一眼記住的動人段落時'],
  [/說明文|議論|批判|寫作|應用文/, '識破社群平台帶風向的偽證據貼文、撰寫得體的電子郵件與請柬，或在報告中用數據有條理說服聽眾時'],
  [/六書|標點|語法/, '從漢字偏旁秒猜生字讀音與意思、用對標點符號避免傳訊息引發誤會，或提升長句閱讀速度時'],
  [/現在式|進行式|過去式|未來|完成式|時態/, '跟國外網友聊日常習慣、用英文分享剛發生的新鮮事，或看懂影集角色時間軸切換時'],
  [/比較級|最高級|子句|被動|介系詞|假設|句型|副詞|助動詞/, '看懂遊戲更新公告與英文食譜指示、精準表達旅遊路線與時間點，或寫出流暢自然的英文長句時'],
  [/細胞|顯微鏡|滲透|酵素|消化/, '觀察醃漬小黃瓜為何出水變脆、理解為何咬米飯越嚼越甜，或明白運動飲料如何快速補水時'],
  [/光合|呼吸|運輸|神經|內分泌|恆定|排泄/, '感受手碰到熱水一瞬間縮回的反射弧、明白為何跑步會喘氣流汗，或了解熬夜如何打亂荷爾蒙節律時'],
  [/生殖|遺傳|孟德爾|演化|生態|多樣性/, '推算捲舌與血型等家族遺傳特徵、看懂食物鏈毒素累積警訊，或思考守護臺灣濕地物種多樣性時'],
  [/測量|密度|聲音|波動/, '用鋁箔紙摺出能載重的小船、調整吉他弦鬆緊改變音高，或用閃電與雷聲時間差估算雷雨距離時'],
  [/光|反射|折射|透鏡|面鏡/, '理解近視與老花眼鏡鏡片差異、手機鏡頭對焦原理，或看懂插進水杯的吸管為何看似折斷時'],
  [/溫度|熱量|熱傳播/, '挑選出門保冰最久的保溫瓶、理解夏天穿淺色衣服較涼爽，或感受海邊日夜風向變化的原因時'],
  [/運動|力|牛頓|摩擦|功|能量|機械|動能/, '體驗捷運突然煞車身體前傾的慣性、選擇開瓶器或剪刀省力支點，或計算車速加倍後的煞車距離時'],
  [/浮力|阿基米德|壓力|大氣壓力/, '觀察合歡山高山上洋芋片包裝袋鼓起、理解死海為何能輕鬆漂浮，或看懂潛水艇如何控制沉浮時'],
  [/靜電|電路|電流|磁|電磁|發電機/, '預防冬天穿脫毛衣靜電啪啪響、避免延長線插滿高功率電器跳電，或了解無線充電與風力發電原理時'],
  [/物質|原子|週期表|反應式|質量守恆|莫耳/, '拆解暖暖包發熱與烘焙蘇打膨脹的微觀粒子重組，或依比例精準調配清潔與實驗配方時'],
  [/溶液|濃度|溶解度|酸鹼|中和|電解質|滴定/, '理解為何冰汽水比溫汽水氣泡多、吃胃藥緩解胃酸過多原理，或分辨食醋與小蘇打水的酸鹼性質時'],
  [/氧化還原|有機|聚合物|反應速率|平衡|空氣|氣體/, '解釋蘋果切開變褐色、延長食物冷藏保鮮期，或辨識耐熱塑膠與可回收寶特瓶的材質差異時'],
  [/岩石|板塊|地震|地層|造山/, '走訪太魯閣峽谷與野柳地景、判讀地震速報的 P 波與 S 波時間差，並做好居家防震準備時'],
  [/水循環|天氣|鋒面|季風|氣團|颱風|氣候變遷/, '看懂氣象局地面天氣圖與颱風路徑潛勢、判斷明天要不要帶傘，並理解全球暖化下的節能減碳行動時'],
  [/地球運動|四季|月相|潮汐|日食|月食|太陽系|星空/, '抬頭看月亮位置推估農曆日期、規劃海邊潮間帶退潮探險時間，或欣賞血月與流星雨天文奇觀時'],
  [/臺灣|荷西|鄭氏|清領|日治|戰後|原住民/, '漫步安平古堡、大稻埕與鹿港老街，從建築騎樓、茶葉樟腦與地名讀懂臺灣四百年的海洋身世時'],
  [/中國|東亞|明清|近代|辛亥|歐洲|工業革命|冷戰|希臘|羅馬/, '看歷史劇、玩文明策略遊戲或看新聞分析國際局勢，一眼串起貿易航線、科技革命與制度變遷的骨牌效應時'],
  [/地圖|比例尺|等高線|地形|人口|產業|都市|交通/, '規劃登山步道避開陡坡地形、看懂臺灣高鐵生活圈與少子化趨勢，或從產地名產反推在地氣候水文時'],
  [/亞洲|非洲|歐洲|美洲|西亞|中亞|大洋洲|澳洲|全球/, '看懂國際油價漲跌新聞、追蹤一支手機橫跨五大洲的供應鏈分工，或規劃跨時區出國旅行時'],
  [/自我|家庭|公共|民主|人權|法治|少年|民法|刑法|中央|地方/, '面對網購退貨糾紛、網路留言法律界線、校園學生自治提案或關注公民投票與地方創生議題時'],
  [/機會成本|市場|競爭|外部效果|國際貿易|比較利益|媒體/, '權衡考前讀書與玩遊戲的機會成本、識破演算法同溫層假新聞，或看懂漲價排隊背後的供需法則時'],
  [/色彩|構圖|透視|藝術|節奏|拍號|音色|音樂|舞臺|戲劇|展演/, '拍出黃金三分法神級照片、設計吸睛簡報配色、抓準節奏遊戲拍點，或上台大方展現聲音與肢體魅力時'],
  [/演算法|變數|迴圈|資訊安全|設計|機構|能源/, '拆解遊戲邏輯與除錯、設定雙重驗證防範釣魚簡訊、善用齒輪連桿原理修東西或動手打造生活原型時'],
  [/健康|飲食|運動|體適能|球類|家庭合作|衣物|消費|童軍|定向|無痕|輔導|生涯|手語|本土/, '看懂飲料營養標示與衣物洗標、管理零用錢與讀書時間、規劃安全露營路線，或尊重多元語言文化溝通時']
];

function resolveLifeHook(u, fallbackPrefix) {
  const hay = `${u.title} ${u.concept}`;
  for (const [rx, hook] of TOPIC_LIFE_HOOKS) {
    if (rx.test(hay)) return hook;
  }
  return fallbackPrefix;
}

const unitsBySubject = {};
for (const u of units) {
  if (!unitsBySubject[u.subject]) unitsBySubject[u.subject] = [];
  unitsBySubject[u.subject].push(u);
}

// 2. Build Unit Wonder & Knowledge Playground Data for all 188 Units
const unitWonderData = {};

units.forEach((u, idx) => {
  const subj = subjects.find(s => s.id === u.subject);
  const profile = subjectLoveProfiles[u.subject] || subjectLoveProfiles.math;
  const t = teachingFor(u);
  const rows = t.rows || [];
  const r0 = rows[0] || ['核心定義', u.concept, u.example];
  const r1 = rows[1] || ['關鍵判準', u.concept, u.example];
  const r2 = rows[2] || ['實戰檢核', u.pitfall, u.task];
  const r3 = rows[3] || r2;
  const ld = lessonDeepening[u.id] || { leftLabel: '基礎觀念', left: u.concept, rightLabel: '易混淆點', right: u.pitfall };
  const wc = workedCases[u.id] || { problem: u.example, steps: [u.concept], check: u.pitfall };
  const kps = explicitKnowledgePoints[u.id] || [];

  const firstConcept = clean(u.concept.split('。')[0]);
  const firstExample = clean(u.example.split('。')[0]);
  const firstPitfall = clean(u.pitfall.split('。')[0]);
  const lifeHook = resolveLifeHook(u, profile.lifeHookPrefix);

  const wonderTitle = `✨ 為什麼「${u.title}」超有趣？生活超能力 × 秒殺口訣`;
  const lifeConnection = `${lifeHook}，「${u.title}」其實正在背後運作！舉個直接的例子：${firstExample}。只要抓住「${clean(r0[0])}（${clean(r0[1])}）」，你就能像${profile.superpower.replace(/^[^\s]+\s*/, '')}一樣，把課本規則直接變現成生活判斷力！`;

  const funFactStyles = [
    `🔍 反直覺冷知識：多數人第一次遇到「${u.title}」，會下意識落入「${firstPitfall}」的錯覺！其實把【${ld.leftLabel}】與【${ld.rightLabel}】並排對照就會發現：${clean(r0[1])}，一秒就能看透表象底層的真實規律。`,
    `⚡ 專家看世界的小秘密：在「${u.title}」裡，真正決定成敗的關鍵往往不是背更多細節，而是分清【${ld.leftLabel}】和【${ld.rightLabel}】的界線！記得防呆原則：${clean(wc.check)}，思考速度與準確度立刻翻倍。`,
    `💡 概念透視鏡：面對「${u.title}」，最常讓人掉坑的正是「${firstPitfall}」。只要先檢查「${clean(r1[0])}（${clean(r1[1])}）」，你會驚訝地發現原本看似複雜的考題與生活現象，其實都遵守同一套簡潔邏輯！`
  ];
  const funFact = funFactStyles[idx % funFactStyles.length];

  const mnemonic = `🎵【${u.title} · 快樂秒殺口訣】\n① 抓基準：${clean(r0[0])}看仔細（${clean(r0[1]).slice(0, 26)}）\n② 分左右：${ld.leftLabel}對照${ld.rightLabel}，關鍵就在「${clean(r1[0])}」\n③ 避陷阱：小心「${firstPitfall.slice(0, 24)}」別中計\n④ 穩驗算：最後代回「${clean(wc.check).slice(0, 24)}」拿滿分！`;

  const curiosityTemplates = [
    {
      q: `🤔 腦筋急轉彎：在處理「${u.title}」時，如果有人把「${ld.leftLabel}」的規則直接套到「${ld.rightLabel}」身上，結果會出現什麼離譜破綻？`,
      a: `🎉 答案揭曉：那就會踩中本課頭號陷阱「${firstPitfall}」！因為【${ld.leftLabel}】重點在「${clean(ld.left)}」，而【${ld.rightLabel}】則是「${clean(ld.right)}」。先用「${clean(r1[0])}」切分界線，就能避開錯誤！`
    },
    {
      q: `🕵️ 生活偵探考驗：在「${u.title}」的實戰現場（例如：${firstExample}），為什麼不能只憑表面直覺下結論，必須先確認「${clean(r0[0])}」？`,
      a: `🎉 偵探破解：因為直覺常會忽略「${firstPitfall}」！依據核心判準「${clean(r0[1])}」，搭配最後一步檢核「${clean(wc.check)}」，才能確保推理站得住腳！`
    },
    {
      q: `🔄 逆向思考挑戰：假如你要當小老師，只用 20 秒提醒同學在「${u.title}」最容易搞混的地方，你會把哪兩件事擺在一起對比？`,
      a: `🎉 滿分講解：一定要對比【${ld.leftLabel}（${clean(ld.left)}）】與【${ld.rightLabel}（${clean(ld.right)}）】，並特別強調「${firstPitfall}」，讓同學一次把觀念徹底釐清！`
    }
  ];
  const curPair = curiosityTemplates[idx % curiosityTemplates.length];
  const curiosityQ = curPair.q;
  const curiosityA = curPair.a;

  // 3 Interactive Knowledge Point Flip Cards per unit (564 total)
  const kpFlipCards = rows.slice(0, 3).map((row, rIdx) => {
    const kpDetail = kps[rIdx] || kps[0];
    return {
      id: `${u.id}-kp-${rIdx + 1}`,
      index: rIdx + 1,
      title: clean(row[0]),
      frontPrompt: `🤔 點擊翻卡自測：面對「${u.title}」的【${clean(row[0])}】，核心規則與實例是什麼？`,
      backRule: clean(row[1]),
      backExample: clean(row[2]),
      backTip: kpDetail ? clean(kpDetail.practicalTip) : `避坑提醒：切勿觸犯「${firstPitfall}」。`
    };
  });

  // Gather REAL domain-authentic sibling unit rules & checks (ZERO cartoon/absurd distractors!)
  const siblings = (unitsBySubject[u.subject] || units).filter(s => s.id !== u.id);
  const sib1 = siblings[idx % siblings.length] || units[(idx + 1) % units.length];
  const sib2 = siblings[(idx + 1) % siblings.length] || units[(idx + 2) % units.length];
  const sib3 = siblings[(idx + 2) % siblings.length] || units[(idx + 3) % units.length];
  const sibRows1 = teachingFor(sib1).rows || [];
  const sibRows2 = teachingFor(sib2).rows || [];
  const sibWc1 = workedCases[sib1.id] || { check: sib1.pitfall };
  const sibWc2 = workedCases[sib2.id] || { check: sib2.pitfall };
  const sibWc3 = workedCases[sib3.id] || { check: sib3.pitfall };

  const placeBlitzOpt = (correct, candidateWrongs, targetIdx) => {
    const uniqWrongs = [];
    for (const w of candidateWrongs) {
      const cw = clean(w);
      if (cw && cw !== clean(correct) && !uniqWrongs.includes(cw)) uniqWrongs.push(cw);
      if (uniqWrongs.length === 3) break;
    }
    const fallbacks = [
      `此說法實際上對應的是「${sib1.title}」的核心條件：${clean(sib1.concept.split('。')[0])}`,
      `此判準適用於「${sib2.title}」情境：${clean(sib2.concept.split('。')[0])}`,
      `僅檢視局部數值或文字表面，尚未核對「${u.title}」的前提範圍與單位`
    ];
    for (const fb of fallbacks) {
      if (uniqWrongs.length >= 3) break;
      if (fb !== clean(correct) && !uniqWrongs.includes(fb)) uniqWrongs.push(fb);
    }
    const ans = ((targetIdx % 4) + 4) % 4;
    const arr = uniqWrongs.slice(0, 3);
    arr.splice(ans, 0, clean(correct));
    return { options: arr, answer: ans };
  };

  // Blitz 1: Distinguish r0's true rule from r1/r2/sibling rules (poker-faced domain distractors — zero giveaways!)
  const b0 = placeBlitzOpt(
    `${clean(r0[1])}（實例：${clean(r0[2])}）`,
    [
      `${clean(r1[1])}（實例：${clean(r1[2])}）`,
      `${clean(r2[1])}（實例：${clean(r2[2])}）`,
      sibRows1[0] ? `${clean(sibRows1[0][1])}（實例：${clean(sibRows1[0][2])}）` : clean(sib1.concept.split('。')[0])
    ],
    idx % 4
  );

  // Blitz 2: Accurately separate leftLabel vs rightLabel (swapped definitions & sibling concept distractors)
  const b1 = placeBlitzOpt(
    `【${ld.leftLabel}】重在「${clean(ld.left)}」；【${ld.rightLabel}】則指「${clean(ld.right)}」`,
    [
      `【${ld.leftLabel}】重在「${clean(ld.right)}」；【${ld.rightLabel}】則指「${clean(ld.left)}」`,
      `【${ld.leftLabel}】與【${ld.rightLabel}】皆指「${clean(ld.left)}」，僅適用在不同題幹敘述`,
      `【${ld.leftLabel}】與【${ld.rightLabel}】的主要核心為「${clean(sib2.concept.split('。')[0])}」`
    ],
    (idx + 1) % 4
  );

  // Blitz 3: Choose the authentic verification check for THIS unit vs sibling units' checks!
  const b2 = placeBlitzOpt(
    `檢核重點：${clean(wc.check)}`,
    [
      `檢核重點：${clean(sibWc1.check)}`,
      `檢核重點：${clean(sibWc2.check)}`,
      `檢核重點：${clean(sibWc3.check)}`
    ],
    (idx + 2) % 4
  );

  const kpBlitz = [
    {
      id: `${u.id}-blitz-1`,
      kpTag: `知識點 ① · ${clean(r0[0])}`,
      prompt: `⚡【閃電第 1 擊】關於「${u.title}」中的【${clean(r0[0])}】，下列哪一項定義與實例配對最精準？`,
      options: b0.options,
      answer: b0.answer,
      cheer: `✨ Combo +1！你已能精準區辨「${clean(r0[0])}」與相近概念！`
    },
    {
      id: `${u.id}-blitz-2`,
      kpTag: `知識點 ② · ${ld.leftLabel} vs. ${ld.rightLabel}`,
      prompt: `⚡【閃電第 2 擊】怎麼一秒分清楚本課常考的「${ld.leftLabel}」與「${ld.rightLabel}」？`,
      options: b1.options,
      answer: b1.answer,
      cheer: `🔥 Combo +2！火眼金睛！再也不會把「${ld.leftLabel}」與「${ld.rightLabel}」搞混了！`
    },
    {
      id: `${u.id}-blitz-3`,
      kpTag: `知識點 ③ · 避坑與驗算（${clean(r2[0])}）`,
      prompt: `⚡【閃電第 3 擊】在考場寫完「${u.title}」的題目後，哪一招能幫你守住 100% 滿分？`,
      options: b2.options,
      answer: b2.answer,
      cheer: `🏆 閃電三連擊 MAX！恭喜你完全制霸「${u.title}」的所有核心知識點！`
    }
  ];

  unitWonderData[u.id] = {
    unitId: u.id,
    subject: u.subject,
    subjectName: subj ? subj.name : u.subject,
    title: u.title,
    wonderTitle,
    lifeConnection,
    funFact,
    mnemonic,
    curiosityQ,
    curiosityA,
    kpFlipCards,
    kpBlitz
  };
});

console.log(`[Build Joyful Learning] Generated subjectLoveProfiles for ${Object.keys(subjectLoveProfiles).length} subjects and unitWonderData for ${Object.keys(unitWonderData).length} units.`);

const outputJs = `// dist/joyful-learning.js
// Joyful Learning, Subject Love Engine, Unit Wonder & Mnemonic Hooks,
// 3D Knowledge Point Flip-Card Playground, Combo Blitz Mini-Game & Possible Question Archetype (Type A/B/C) Mastery Hub.
// Auto-generated by scripts/build-joyful-learning.mjs with 100% coverage across 21 subjects and 188 units.

import { examTypesData } from './exam-types-data.js';

export const JOYFUL_STORAGE_KEY = 'zhixing-joyful-mastery-v1';

export const subjectLoveData = ${JSON.stringify(subjectLoveProfiles, null, 2)};

export const unitWonderData = ${JSON.stringify(unitWonderData, null, 2)};

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function loadJoyfulState() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(JOYFUL_STORAGE_KEY) : null;
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      lovedSubjects: parsed.lovedSubjects || {},
      stampedKPs: parsed.stampedKPs || {},
      conqueredArchetypes: parsed.conqueredArchetypes || {},
      blitzClearedUnits: parsed.blitzClearedUnits || {},
      bonusXP: Number(parsed.bonusXP || 0),
      rouletteUnitId: parsed.rouletteUnitId || 'math-1',
      randomDrillKey: parsed.randomDrillKey || 'math-1:Type A'
    };
  } catch {
    return {
      lovedSubjects: {},
      stampedKPs: {},
      conqueredArchetypes: {},
      blitzClearedUnits: {},
      bonusXP: 0,
      rouletteUnitId: 'math-1',
      randomDrillKey: 'math-1:Type A'
    };
  }
}

export function saveJoyfulState(st) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(JOYFUL_STORAGE_KEY, JSON.stringify(st));
    }
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('zhixing:joyful-update', { detail: st }));
    }
  } catch {}
}

export function getJoyfulStats(units = [], subjects = []) {
  const st = loadJoyfulState();
  const totalSubjects = subjects.length || 21;
  const totalUnits = units.length || 188;
  const totalKPs = totalUnits * 3;
  const totalArchetypes = totalUnits * 3;

  const lovedSubjectCount = Object.keys(st.lovedSubjects).filter(k => st.lovedSubjects[k]).length;
  const stampedKPCount = Object.keys(st.stampedKPs).filter(k => st.stampedKPs[k]).length;
  const conqueredArchetypeCount = Object.keys(st.conqueredArchetypes).filter(k => st.conqueredArchetypes[k]).length;
  const blitzClearedUnitCount = Object.keys(st.blitzClearedUnits).filter(k => st.blitzClearedUnits[k]).length;

  return {
    lovedSubjectCount,
    totalSubjects,
    stampedKPCount,
    totalKPs,
    conqueredArchetypeCount,
    totalArchetypes,
    blitzClearedUnitCount,
    totalUnits,
    bonusXP: st.bonusXP || 0
  };
}

export function renderUnitJoyfulMiniBadge(unitId) {
  const st = loadJoyfulState();
  let kp = 0;
  for (let i = 1; i <= 3; i++) {
    if (st.stampedKPs[\`\${unitId}-kp-\${i}\`]) kp++;
  }
  let arch = 0;
  ['Type A', 'Type B', 'Type C'].forEach(c => {
    if (st.conqueredArchetypes[\`\${unitId}:\${c}\`]) arch++;
  });
  const blitz = !!st.blitzClearedUnits[unitId];
  if (kp === 0 && arch === 0 && !blitz) {
    return '<span class="unit-joyful-mini-pill">✨ 含趣味口訣 · 3 知識卡 · 3 題型挑戰</span>';
  }
  return \`<span class="unit-joyful-mini-pill active">🃏 知識章 \${kp}/3 · ⚔️ 題型 \${arch}/3\${blitz ? ' · ⚡滿貫' : ''}</span>\`;
}

function speakText(text) {
  try {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(String(text).replace(/[🎵①②③④✨⚡💡]/g, ' '));
      utter.lang = 'zh-TW';
      utter.rate = 1.02;
      window.speechSynthesis.speak(utter);
      return true;
    }
  } catch {}
  return false;
}

// ============================================================================
// 1. HOME PAGE: Joyful Wonder Roulette & Full-Curriculum Knowledge/Archetype Hub
// ============================================================================
export function renderHomeJoyfulHub(state, units = [], subjects = []) {
  const jState = loadJoyfulState();
  const stats = getJoyfulStats(units, subjects);

  const rouletteUnit = units.find(u => u.id === jState.rouletteUnitId) || units[0];
  const wonder = unitWonderData[rouletteUnit.id] || Object.values(unitWonderData)[0];
  const subj = subjects.find(s => s.id === rouletteUnit.subject) || subjects[0];
  const loveProfile = subjectLoveData[rouletteUnit.subject] || subjectLoveData.math;

  // Resolve current random archetype drill
  const [drillUnitId, drillCode] = String(jState.randomDrillKey || 'math-1:Type A').split(':');
  const dUnit = units.find(u => u.id === drillUnitId) || units[0];
  const dExam = examTypesData[dUnit.id];
  const qtList = dExam?.questionTypeList || [];
  const qt = qtList.find(x => x.code === drillCode) || qtList[0];
  const drill = qt?.archetypeDrill;
  const isDrillConquered = !!jState.conqueredArchetypes[\`\${dUnit.id}:\${qt?.code || 'Type A'}\`];

  return \`
  <section class="joyful-home-hub" aria-label="快樂學習驚喜轉盤與全知識點題型制霸中心">
    <div class="joyful-hub-grid">
      <!-- Left Card: Daily Subject Wonder & Mnemonic Roulette -->
      <article class="card joyful-roulette-card">
        <div class="row space wrap">
          <div class="row" style="gap:8px;align-items:center;">
            <span class="joyful-pill-badge">🦉 知知貓頭鷹 · 趣味冷知識與秒殺口訣轉盤</span>
            <span class="tag" style="background:\${subj.tint};color:\${subj.accent};font-weight:700;">\${esc(subj.name)} · 七～九年級</span>
          </div>
          <button type="button" class="btn small primary" id="btn-spin-wonder-roulette">🎲 轉動驚喜轉盤（換一課）</button>
        </div>

        <div class="joyful-roulette-body">
          <div class="joyful-superpower-line">
            <span>\${esc(loveProfile.superpower)}</span>
            <strong>「\${esc(rouletteUnit.title)}」原來這麼好玩！</strong>
          </div>
          <p class="joyful-life-text">🌟 <strong>生活超能力：</strong>\${esc(wonder.lifeConnection)}</p>
          <p class="joyful-fact-text">💡 <strong>驚喜冷知識：</strong>\${esc(wonder.funFact)}</p>

          <div class="joyful-mnemonic-box">
            <div class="row space wrap" style="margin-bottom:6px;">
              <strong>⚡ 考場秒殺記憶口訣</strong>
              <div class="row" style="gap:6px;">
                <button type="button" class="btn small ghost" id="btn-home-speak-mnemonic" data-speech="\${esc(wonder.mnemonic)}">🔊 朗讀口訣</button>
              </div>
            </div>
            <pre class="joyful-mnemonic-pre">\${esc(wonder.mnemonic)}</pre>
          </div>

          <details class="joyful-curiosity-details">
            <summary>🧠 \${esc(wonder.curiosityQ)}（點我揭曉答案）</summary>
            <p>\${esc(wonder.curiosityA)}</p>
          </details>

          <div class="row space wrap" style="margin-top:12px;">
            <span class="subtle" style="font-size:0.84rem;">\${esc(loveProfile.cheer)}</span>
            <div class="row" style="gap:8px;">
              <a class="btn small ghost" href="#/subject/\${rouletteUnit.subject}">探索\${esc(subj.name)}魅力</a>
              <a class="btn small primary" href="#/lesson/\${rouletteUnit.id}">🚀 前往本課快樂闖關</a>
            </div>
          </div>
        </div>
      </article>

      <!-- Right Card: All 188 Units Knowledge Points & Type A/B/C Archetype Mastery Arena -->
      <article class="card joyful-arena-card">
        <div class="row space wrap">
          <div>
            <span class="joyful-pill-badge accent">🏆 全站知識點 × 三大可能題型 快樂制霸雷達</span>
            <h3 style="margin:6px 0 2px;">邊玩邊收集印章，188 課知識與會考題型零死角！</h3>
          </div>
          <span class="tag accent" style="font-weight:800;">✨ 快樂獎勵：+\${stats.bonusXP} XP</span>
        </div>

        <div class="joyful-stats-strip">
          <div class="joyful-stat-box">
            <span>💖 熱愛學科點亮</span>
            <strong>\${stats.lovedSubjectCount} / \${stats.totalSubjects} 科</strong>
          </div>
          <div class="joyful-stat-box">
            <span>🃏 知識點精通章</span>
            <strong>\${stats.stampedKPCount} / \${stats.totalKPs} 點</strong>
          </div>
          <div class="joyful-stat-box">
            <span>⚔️ 可能題型制霸</span>
            <strong>\${stats.conqueredArchetypeCount} / \${stats.totalArchetypes} 型</strong>
          </div>
          <div class="joyful-stat-box">
            <span>⚡ 閃電連擊滿貫</span>
            <strong>\${stats.blitzClearedUnitCount} / \${stats.totalUnits} 課</strong>
          </div>
        </div>

        \${drill ? \`
        <div class="joyful-mini-drill-box" id="home-random-drill-box">
          <div class="row space wrap" style="margin-bottom:8px;">
            <div class="row" style="gap:6px;align-items:center;">
              <span class="tag" style="background:#193e35;color:#fff;font-weight:700;">\${esc(qt.code)}</span>
              <strong style="font-size:0.92rem;">【隨機可能題型快篩】\${esc(dUnit.title)}</strong>
              <span class="subtle" style="font-size:0.8rem;">（\${isDrillConquered ? '🏆 已制霸' : '🌱 挑戰領 +15 XP'}）</span>
            </div>
            <button type="button" class="btn small ghost" id="btn-next-random-drill">🎲 換一題可能題型</button>
          </div>
          <p style="margin:0 0 10px;font-size:0.88rem;font-weight:600;line-height:1.5;">\${esc(drill.stem)}</p>
          <div class="joyful-mini-drill-opts" role="group" aria-label="首頁隨機題型快篩選項">
            \${drill.options.map((opt, oIdx) => \`
              <button type="button" class="joyful-home-drill-opt" data-unit="\${dUnit.id}" data-code="\${qt.code}" data-idx="\${oIdx}" data-ans="\${drill.answer}" data-exp="\${esc(drill.explanation)}">
                <span class="opt-badge">\${String.fromCharCode(65 + oIdx)}</span>
                <span>\${esc(opt)}</span>
              </button>
            \`).join('')}
          </div>
          <div id="home-random-drill-fb" style="display:none;margin-top:10px;padding:10px 12px;border-radius:8px;font-size:0.85rem;line-height:1.5;"></div>
        </div>
        \` : ''}
      </article>
    </div>
  </section>
  \`;
}

export function wireHomeJoyfulHub(container, units = [], subjects = [], onUpdate) {
  if (!container) return;

  const spinBtn = container.querySelector('#btn-spin-wonder-roulette');
  if (spinBtn) {
    spinBtn.onclick = () => {
      const st = loadJoyfulState();
      const pool = units.filter(u => u.id !== st.rouletteUnitId);
      const pick = pool[Math.floor(Math.random() * pool.length)] || units[0];
      st.rouletteUnitId = pick.id;
      saveJoyfulState(st);
      if (typeof onUpdate === 'function') onUpdate();
    };
  }

  const speakBtn = container.querySelector('#btn-home-speak-mnemonic');
  if (speakBtn) {
    speakBtn.onclick = () => {
      const ok = speakText(speakBtn.dataset.speech || '');
      speakBtn.textContent = ok ? '🔊 朗讀中…' : '✨ 請大聲跟著念一遍！';
      setTimeout(() => { speakBtn.textContent = '🔊 朗讀口訣'; }, 2500);
    };
  }

  const nextDrillBtn = container.querySelector('#btn-next-random-drill');
  if (nextDrillBtn) {
    nextDrillBtn.onclick = () => {
      const st = loadJoyfulState();
      const codes = ['Type A', 'Type B', 'Type C'];
      const rUnit = units[Math.floor(Math.random() * units.length)] || units[0];
      const rCode = codes[Math.floor(Math.random() * codes.length)];
      st.randomDrillKey = \`\${rUnit.id}:\${rCode}\`;
      saveJoyfulState(st);
      if (typeof onUpdate === 'function') onUpdate();
    };
  }

  container.querySelectorAll('.joyful-home-drill-opt').forEach(btn => {
    btn.onclick = () => {
      const unitId = btn.dataset.unit;
      const code = btn.dataset.code;
      const idx = parseInt(btn.dataset.idx, 10);
      const ans = parseInt(btn.dataset.ans, 10);
      const exp = btn.dataset.exp || '';
      const box = container.querySelector('#home-random-drill-box');
      if (!box) return;

      box.querySelectorAll('.joyful-home-drill-opt').forEach((b, bIdx) => {
        b.classList.remove('is-correct', 'is-wrong');
        if (bIdx === ans) b.classList.add('is-correct');
      });

      const fb = box.querySelector('#home-random-drill-fb');
      if (idx === ans) {
        const st = loadJoyfulState();
        const key = \`\${unitId}:\${code}\`;
        const firstTime = !st.conqueredArchetypes[key];
        if (firstTime) {
          st.conqueredArchetypes[key] = true;
          st.bonusXP = (st.bonusXP || 0) + 15;
          saveJoyfulState(st);
        }
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#e8f5e9';
          fb.style.color = '#1b5e20';
          fb.style.border = '1px solid #a5d6a7';
          fb.innerHTML = \`🎉 <strong>秒殺破關！成功拿下【\${esc(code)}】題型印章！\${firstTime ? '（+15 XP）' : ''}</strong><br>\${esc(exp)}\`;
        }
      } else {
        btn.classList.add('is-wrong');
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#fff3e0';
          fb.style.color = '#e65100';
          fb.style.border = '1px solid #ffcc80';
          fb.innerHTML = \`💡 <strong>差一點點！正確答案為 (\${String.fromCharCode(65 + ans)})。</strong><br>\${esc(exp)}\`;
        }
      }
    };
  });
}

// ============================================================================
// 2. SUBJECT PAGE: "Why You'll Love This Subject" Superpower Banner
// ============================================================================
export function renderSubjectLoveBanner(subjectId, subjectUnits = []) {
  const profile = subjectLoveData[subjectId];
  if (!profile) return '';
  const st = loadJoyfulState();
  const isLoved = !!st.lovedSubjects[subjectId];

  // Calculate subject-specific KP & Archetype stamps
  let kpCount = 0;
  let archCount = 0;
  subjectUnits.forEach(u => {
    for (let i = 1; i <= 3; i++) {
      if (st.stampedKPs[\`\${u.id}-kp-\${i}\`]) kpCount++;
    }
    ['Type A', 'Type B', 'Type C'].forEach(c => {
      if (st.conqueredArchetypes[\`\${u.id}:\${c}\`]) archCount++;
    });
  });
  const totalSubjKPs = subjectUnits.length * 3;
  const totalSubjArch = subjectUnits.length * 3;

  return \`
  <section class="card subject-love-banner" id="subject-love-banner-\${subjectId}" aria-label="愛上這門學科超能力指南">
    <div class="row space wrap" style="margin-bottom:10px;">
      <div class="row" style="gap:8px;align-items:center;">
        <span class="joyful-pill-badge">\${esc(profile.superpower)}</span>
        <span class="tag" style="font-weight:700;">🃏 知識點印章：\${kpCount} / \${totalSubjKPs}</span>
        <span class="tag" style="font-weight:700;">⚔️ 可能題型制霸：\${archCount} / \${totalSubjArch}</span>
      </div>
      <button type="button" class="btn small \${isLoved ? 'primary' : 'ghost'}" id="btn-love-subject-\${subjectId}" data-subject="\${subjectId}">
        \${isLoved ? '💖 已點亮「我超愛這門課」徽章！' : '🤍 點亮「我喜歡這門學科」徽章 (+15 XP)'}
      </button>
    </div>

    <p class="subject-love-why">\${esc(profile.whyLoveIt)}</p>

    <div class="subject-magic-grid">
      \${profile.realLifeMagic.map(item => \`
        <div class="subject-magic-item">
          \${esc(item)}
        </div>
      \`).join('')}
    </div>

    <div class="subject-love-footer">
      <div><strong>🚀 快樂學好秘訣：</strong>\${esc(profile.joyfulHack)}</div>
      <div class="subtle" style="margin-top:4px;">\${esc(profile.cheer)}</div>
    </div>
  </section>
  \`;
}

export function wireSubjectLoveBanner(container, subjectId) {
  if (!container) return;
  const btn = container.querySelector(\`#btn-love-subject-\${subjectId}\`);
  if (!btn) return;
  btn.onclick = () => {
    const st = loadJoyfulState();
    const wasLoved = !!st.lovedSubjects[subjectId];
    st.lovedSubjects[subjectId] = !wasLoved;
    if (!wasLoved) {
      st.bonusXP = (st.bonusXP || 0) + 15;
    }
    saveJoyfulState(st);
    const nowLoved = !!st.lovedSubjects[subjectId];
    btn.className = \`btn small \${nowLoved ? 'primary' : 'ghost'}\`;
    btn.textContent = nowLoved ? '💖 已點亮「我超愛這門課」徽章！' : '🤍 點亮「我喜歡這門學科」徽章 (+15 XP)';
  };
}

// ============================================================================
// 3. LESSON PAGE: Unit Wonder & Mnemonic Hook + Interactive KP Playground
// ============================================================================
export function renderUnitWonderSection(u) {
  const w = unitWonderData[u.id];
  const profile = subjectLoveData[u.subject] || subjectLoveData.math;
  if (!w) return '';

  return \`
  <section class="lesson-step unit-wonder-step" id="step-unit-wonder" aria-labelledby="wonder-heading-\${u.id}">
    <div class="step-label" style="background:#fff3e0;color:#e65100;font-weight:700;">JOYFUL DISCOVERY &amp; MEMORY HOOK · 趣味破冰與秒殺口訣</div>
    <div class="row space wrap" style="margin-bottom:8px;">
      <h2 id="wonder-heading-\${u.id}" style="margin:0;">\${esc(w.wonderTitle)}</h2>
      <span class="joyful-pill-badge">\${esc(profile.superpower)}</span>
    </div>

    <div class="unit-wonder-grid">
      <div class="unit-wonder-card life-card">
        <strong>🌟 生活超能力連結：學這課能幹嘛？</strong>
        <p>\${esc(w.lifeConnection)}</p>
      </div>
      <div class="unit-wonder-card fact-card">
        <strong>💡 驚喜冷知識與破題雷達</strong>
        <p>\${esc(w.funFact)}</p>
      </div>
    </div>

    <div class="joyful-mnemonic-box lesson-mnemonic-box">
      <div class="row space wrap" style="margin-bottom:6px;">
        <strong>🎵 本課專屬「秒殺記憶口訣」—— 念三遍考場不忘記！</strong>
        <div class="row" style="gap:8px;">
          <button type="button" class="btn small ghost btn-unit-speak-mnemonic" data-speech="\${esc(w.mnemonic)}">🔊 語音朗讀口訣</button>
          <button type="button" class="btn small ghost btn-unit-copy-mnemonic" data-copy="\${esc(w.mnemonic)}">📋 複製口訣</button>
        </div>
      </div>
      <pre class="joyful-mnemonic-pre">\${esc(w.mnemonic)}</pre>
    </div>

    <details class="joyful-curiosity-details">
      <summary>🧠 \${esc(w.curiosityQ)}（點我翻開答案）</summary>
      <p>\${esc(w.curiosityA)}</p>
    </details>
  </section>
  \`;
}

export function renderUnitKnowledgePlayground(u) {
  const w = unitWonderData[u.id];
  if (!w) return '';
  const st = loadJoyfulState();
  const isBlitzCleared = !!st.blitzClearedUnits[u.id];

  let stampedCount = 0;
  w.kpFlipCards.forEach(c => {
    if (st.stampedKPs[c.id]) stampedCount++;
  });

  return \`
  <section class="lesson-step kp-playground-step" id="step-kp-playground" aria-labelledby="kp-playground-heading-\${u.id}">
    <div class="step-label" style="background:#e8f5e9;color:#1b5e20;font-weight:700;">INTERACTIVE KNOWLEDGE PLAYGROUND · 知識點快樂闖關遊樂場</div>
    <div class="row space wrap" style="margin-bottom:8px;">
      <h2 id="kp-playground-heading-\${u.id}" style="margin:0;">🎮 知識點記憶翻翻樂 × 閃電三連擊挑戰</h2>
      <div class="row" style="gap:8px;">
        <span class="tag" data-kp-stamp-counter="\${u.id}" style="background:#e8f5e9;color:#1b5e20;font-weight:700;">🃏 知識點印章：\${stampedCount} / \${w.kpFlipCards.length}</span>
        <span class="tag" data-blitz-badge="\${u.id}" style="background:\${isBlitzCleared ? '#fff8e1' : 'var(--surface-alt)'};color:\${isBlitzCleared ? '#e65100' : 'var(--text-muted)'};font-weight:700;">
          \${isBlitzCleared ? '🏅 閃電三連擊已制霸 (+20 XP)' : '⚡ 閃電連擊待挑戰'}
        </span>
      </div>
    </div>
    <p class="muted" style="margin-top:0;">先點選下方「知識點翻翻卡」自我檢測並蓋上精通印章，再挑戰 30 秒「⚡ 知識點閃電三連擊」累積 Combo！</p>

    <!-- Part A: 3 Interactive Flip Cards -->
    <div class="kp-flip-grid">
      \${w.kpFlipCards.map(card => {
        const stamped = !!st.stampedKPs[card.id];
        return \`
        <div class="kp-flip-card \${stamped ? 'is-stamped' : ''}" data-kp-card="\${card.id}">
          <div class="row space" style="margin-bottom:6px;">
            <span class="tag accent">知識點 #\${card.index} · \${esc(card.title)}</span>
            <span class="kp-stamp-pill" data-kp-pill="\${card.id}">\${stamped ? '✅ 已蓋精通章' : '🌱 點擊翻卡'}</span>
          </div>
          <div class="kp-flip-front">
            <p class="kp-front-q">\${esc(card.frontPrompt)}</p>
            <button type="button" class="btn small ghost btn-flip-kp-card" data-target="\${card.id}">🔄 翻開看黃金判準與實例</button>
          </div>
          <div class="kp-flip-back" style="display:none;">
            <p style="margin:0 0 6px;"><strong>📌 黃金判準：</strong>\${esc(card.backRule)}</p>
            <p style="margin:0 0 6px;"><strong>🔍 具體實例：</strong>\${esc(card.backExample)}</p>
            <p style="margin:0 0 10px;font-size:0.83rem;color:#0277bd;"><strong>💡 實戰秘訣：</strong>\${esc(card.backTip)}</p>
            <div class="row space wrap">
              <button type="button" class="btn small ghost btn-flip-kp-back" data-target="\${card.id}">↩️ 蓋回正面自測</button>
              <button type="button" class="btn small \${stamped ? 'ghost' : 'primary'} btn-stamp-kp" data-kp-id="\${card.id}" data-unit="\${u.id}">
                \${stamped ? '🏅 已掌握 (+10 XP)' : '✅ 我學會了！蓋章 (+10 XP)'}
              </button>
            </div>
          </div>
        </div>
        \`;
      }).join('')}
    </div>

    <!-- Part B: 3-Question Knowledge Blitz Mini-Game -->
    <div class="kp-blitz-arena" id="kp-blitz-arena-\${u.id}" data-unit="\${u.id}">
      <div class="row space wrap" style="margin-bottom:10px;">
        <div>
          <strong style="font-size:1rem;">⚡ 本課知識點「閃電三連擊」Combo 挑戰賽</strong>
          <span class="subtle" style="margin-left:8px;font-size:0.84rem;">連對 3 題直接點亮本課【知識點閃電制霸】金章！</span>
        </div>
        <span class="kp-combo-badge" id="kp-combo-badge-\${u.id}">🔥 Combo x0</span>
      </div>

      <div class="kp-blitz-questions">
        \${w.kpBlitz.map((bq, bIdx) => \`
          <div class="kp-blitz-item" data-blitz-item="\${bq.id}" data-blitz-idx="\${bIdx}">
            <div class="row space wrap" style="margin-bottom:6px;">
              <span class="tag">\${esc(bq.kpTag)}</span>
              <span class="subtle" data-blitz-status="\${bq.id}">待作答</span>
            </div>
            <p style="margin:0 0 8px;font-weight:600;font-size:0.92rem;">\${esc(bq.prompt)}</p>
            <div class="kp-blitz-opts" role="group" aria-label="\${esc(bq.kpTag)} 閃電挑戰選項">
              \${bq.options.map((opt, oIdx) => \`
                <button type="button" class="kp-blitz-opt-btn" data-unit="\${u.id}" data-blitz-id="\${bq.id}" data-opt-idx="\${oIdx}" data-ans="\${bq.answer}" data-cheer="\${esc(bq.cheer)}">
                  <span class="opt-badge">\${String.fromCharCode(65 + oIdx)}</span>
                  <span>\${esc(opt)}</span>
                </button>
              \`).join('')}
            </div>
            <div class="kp-blitz-fb" id="fb-\${bq.id}" style="display:none;margin-top:8px;padding:8px 10px;border-radius:6px;font-size:0.84rem;"></div>
          </div>
        \`).join('')}
      </div>

      <div id="kp-blitz-grand-banner-\${u.id}" style="display:\${isBlitzCleared ? 'block' : 'none'};margin-top:12px;padding:12px 16px;border-radius:8px;background:linear-gradient(135deg,#e8f5e9,#fff8e1);border:1px solid #81c784;color:#1b5e20;font-weight:700;">
        🎊 太神啦！閃電三連擊全數通關！你已經把「\${esc(u.title)}」的所有核心知識點牢牢裝進腦袋裡了！
      </div>
    </div>
  </section>
  \`;
}

export function wireUnitJoyfulInteractions(container, u) {
  if (!container || !u) return;

  // 1. Speech & Copy Mnemonic
  container.querySelectorAll('.btn-unit-speak-mnemonic').forEach(btn => {
    btn.onclick = () => {
      const ok = speakText(btn.dataset.speech || '');
      btn.textContent = ok ? '🔊 朗讀中…' : '✨ 請跟著節奏念一遍！';
      setTimeout(() => { btn.textContent = '🔊 語音朗讀口訣'; }, 2500);
    };
  });

  container.querySelectorAll('.btn-unit-copy-mnemonic').forEach(btn => {
    btn.onclick = async () => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(btn.dataset.copy || '');
          btn.textContent = '✅ 已複製口訣！';
          setTimeout(() => { btn.textContent = '📋 複製口訣'; }, 2000);
        }
      } catch {}
    };
  });

  // 2. Flip Cards & Knowledge Point Stamps
  container.querySelectorAll('.btn-flip-kp-card').forEach(btn => {
    btn.onclick = () => {
      const card = container.querySelector(\`[data-kp-card="\${btn.dataset.target}"]\`);
      if (!card) return;
      const front = card.querySelector('.kp-flip-front');
      const back = card.querySelector('.kp-flip-back');
      if (front) front.style.display = 'none';
      if (back) back.style.display = 'block';
    };
  });

  container.querySelectorAll('.btn-flip-kp-back').forEach(btn => {
    btn.onclick = () => {
      const card = container.querySelector(\`[data-kp-card="\${btn.dataset.target}"]\`);
      if (!card) return;
      const front = card.querySelector('.kp-flip-front');
      const back = card.querySelector('.kp-flip-back');
      if (front) front.style.display = 'block';
      if (back) back.style.display = 'none';
    };
  });

  const updateKPStampCounter = () => {
    const st = loadJoyfulState();
    const w = unitWonderData[u.id];
    if (!w) return;
    let count = 0;
    w.kpFlipCards.forEach(c => {
      if (st.stampedKPs[c.id]) count++;
    });
    container.querySelectorAll(\`[data-kp-stamp-counter="\${u.id}"]\`).forEach(el => {
      el.textContent = \`🃏 知識點印章：\${count} / \${w.kpFlipCards.length}\`;
    });
  };

  container.querySelectorAll('.btn-stamp-kp').forEach(btn => {
    btn.onclick = () => {
      const kpId = btn.dataset.kpId;
      const st = loadJoyfulState();
      if (!st.stampedKPs[kpId]) {
        st.stampedKPs[kpId] = true;
        st.bonusXP = (st.bonusXP || 0) + 10;
        saveJoyfulState(st);
      }
      btn.className = 'btn small ghost btn-stamp-kp';
      btn.textContent = '🏅 已掌握 (+10 XP)';
      const card = container.querySelector(\`[data-kp-card="\${kpId}"]\`);
      if (card) card.classList.add('is-stamped');
      const pill = container.querySelector(\`[data-kp-pill="\${kpId}"]\`);
      if (pill) pill.textContent = '✅ 已蓋精通章';
      updateKPStampCounter();
    };
  });

  // 3. Knowledge Blitz Combo Arena
  const solvedInArena = new Set();
  let comboCount = 0;

  container.querySelectorAll('.kp-blitz-opt-btn').forEach(btn => {
    btn.onclick = () => {
      const blitzId = btn.dataset.blitzId;
      const optIdx = parseInt(btn.dataset.optIdx, 10);
      const ansIdx = parseInt(btn.dataset.ans, 10);
      const cheer = btn.dataset.cheer || '';
      const item = container.querySelector(\`[data-blitz-item="\${blitzId}"]\`);
      if (!item) return;

      item.querySelectorAll('.kp-blitz-opt-btn').forEach((b, idx) => {
        b.classList.remove('is-correct', 'is-wrong');
        if (idx === ansIdx) b.classList.add('is-correct');
      });

      const fb = item.querySelector(\`#fb-\${blitzId}\`);
      const statusEl = item.querySelector(\`[data-blitz-status="\${blitzId}"]\`);
      const comboBadge = container.querySelector(\`#kp-combo-badge-\${u.id}\`);

      if (optIdx === ansIdx) {
        solvedInArena.add(blitzId);
        comboCount = solvedInArena.size;
        if (comboBadge) comboBadge.textContent = \`🔥 Combo x\${comboCount}\`;
        if (statusEl) {
          statusEl.textContent = '✅ 破關';
          statusEl.style.color = '#1b5e20';
          statusEl.style.fontWeight = '700';
        }
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#e8f5e9';
          fb.style.color = '#1b5e20';
          fb.style.border = '1px solid #a5d6a7';
          fb.innerHTML = \`<strong>\${esc(cheer)}</strong>\`;
        }
        if (solvedInArena.size >= 3) {
          const st = loadJoyfulState();
          if (!st.blitzClearedUnits[u.id]) {
            st.blitzClearedUnits[u.id] = true;
            st.bonusXP = (st.bonusXP || 0) + 20;
            saveJoyfulState(st);
          }
          const grandBanner = container.querySelector(\`#kp-blitz-grand-banner-\${u.id}\`);
          if (grandBanner) grandBanner.style.display = 'block';
          container.querySelectorAll(\`[data-blitz-badge="\${u.id}"]\`).forEach(b => {
            b.textContent = '🏅 閃電三連擊已制霸 (+20 XP)';
            b.style.background = '#fff8e1';
            b.style.color = '#e65100';
          });
        }
      } else {
        comboCount = 0;
        if (comboBadge) comboBadge.textContent = '💥 Combo 重置 x0（再試一次！）';
        btn.classList.add('is-wrong');
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = '#fff3e0';
          fb.style.color = '#e65100';
          fb.style.border = '1px solid #ffcc80';
          fb.innerHTML = \`💡 差一點！正確答案是 (\${String.fromCharCode(65 + ansIdx)})，點選綠色正確選項繼續累積 Combo！\`;
        }
      }
    };
  });
}
`;

fs.writeFileSync('dist/joyful-learning.js', outputJs, 'utf8');
console.log('Successfully written dist/joyful-learning.js!');
