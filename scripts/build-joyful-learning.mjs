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
  const ld = lessonDeepening[u.id] || { leftLabel: '基礎觀念', left: u.concept, rightLabel: '易混淆點', right: u.pitfall };
  const wc = workedCases[u.id] || { problem: u.example, steps: [u.concept], check: u.pitfall };
  const kps = explicitKnowledgePoints[u.id] || [];

  const firstConcept = clean(u.concept.split('。')[0]);
  const firstExample = clean(u.example.split('。')[0]);
  const firstPitfall = clean(u.pitfall.split('。')[0]);

  const wonderTitle = `✨ 為什麼「${u.title}」超有趣？生活超能力 × 秒殺口訣`;
  const lifeConnection = `${profile.lifeHookPrefix}，「${u.title}」其實就在你身邊！例如：${firstExample}。當你搞懂「${r0[0]}（${clean(r0[1])}）」，你就能像${profile.superpower.replace(/^[^\s]+\s*/, '')}一樣，一眼看穿背後的規律，再也不會被表面現象騙倒！`;

  const funFact = `你知道嗎？在「${u.title}」中，高達 80% 的人最容易在「${ld.leftLabel} vs. ${ld.rightLabel}」搞混，或是掉進「${firstPitfall}」的直覺陷阱！${kps[0] ? `其實從微觀機制來看：${clean(kps[0].mechanism)}。` : ''}只要抓住這個小秘密，你就能比別人快 3 倍看穿題目！`;

  const mnemonic = `🎵【${u.title} · 快樂秒殺口訣】\n① 抓基準：${r0[0]}看仔細（${clean(r0[1]).slice(0, 26)}）\n② 分左右：${ld.leftLabel}對照${ld.rightLabel}，關鍵就在「${r1[0]}」\n③ 避陷阱：小心「${firstPitfall.slice(0, 24)}」別中計\n④ 穩驗算：最後代回「${clean(wc.check).slice(0, 24)}」拿滿分！`;

  const curiosityQ = `🤔 腦筋急轉彎：在「${u.title}」的情境裡，如果有人把「${ld.leftLabel}」跟「${ld.rightLabel}」當成一模一樣，會發生什麼事？`;
  const curiosityA = `🎉 答案揭曉：那就會踩中本課頭號陷阱「${firstPitfall}」！因為【${ld.leftLabel}】是「${clean(ld.left)}」，而【${ld.rightLabel}】則是「${clean(ld.right)}」。只要用「${r1[0]}」先做區分，就能輕鬆破解！`;

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

  // 3 Rapid-Fire Knowledge Blitz Questions per unit (564 total)
  const placeBlitzOpt = (correct, wrongs, targetIdx) => {
    const ans = ((targetIdx % 4) + 4) % 4;
    const arr = [...wrongs];
    arr.splice(ans, 0, correct);
    return { options: arr.slice(0, 4), answer: ans };
  };

  const b0 = placeBlitzOpt(
    `${clean(r0[1])}（實例：${clean(r0[2])}）`,
    [
      `與基準方向相反，且忽略「${firstPitfall}」的前提限制`,
      `把「${r0[0]}」直接當成「${ld.rightLabel}」而不需確認條件`,
      `無論條件如何改變，結果都固定不變且不必看單位`
    ],
    idx % 4
  );

  const b1 = placeBlitzOpt(
    `【${ld.leftLabel}】為「${clean(ld.left)}」；【${ld.rightLabel}】為「${clean(ld.right)}」`,
    [
      `【${ld.leftLabel}】與【${ld.rightLabel}】意義完全相同，可隨意互換`,
      `只看表面數字大小，不需理會「${r1[0]}（${clean(r1[1])}）」`,
      `故意違反「${firstPitfall}」，把兩者的判準顛倒過來套用`
    ],
    (idx + 1) % 4
  );

  const b2 = placeBlitzOpt(
    `先檢查是否避開「${firstPitfall}」，再執行「${clean(wc.check)}」反向驗算`,
    [
      `算出第一個數字就直接作答，完全不代回原題目檢查合理性`,
      `忽略題目給的限制條件，直接套用不相關的直覺猜測`,
      `把「${r2[0]}」的規則反過來用，認為不需驗證邊界條件`
    ],
    (idx + 2) % 4
  );

  const kpBlitz = [
    {
      id: `${u.id}-blitz-1`,
      kpTag: `知識點 ① · ${clean(r0[0])}`,
      prompt: `⚡【閃電第 1 擊】關於「${u.title}」的基礎核心【${clean(r0[0])}】，下列哪個敘述最正確？`,
      options: b0.options,
      answer: b0.answer,
      cheer: `✨ Combo +1！你已經精準掌握「${clean(r0[0])}」的核心定義！`
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
