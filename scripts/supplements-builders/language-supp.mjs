// scripts/supplements-builders/language-supp.mjs
// Language 32 Units (chinese-1..16, english-1..16): 108 Curriculum Deep Supplements & Self-Check Tasks

export const languageSupplements = {
  "chinese-1": {
    title: "一詞多義語境判讀與修辭「像」字真偽辨析",
    points: [
      "漢語單音節與雙音節詞常隨上下文改變詞性與詞義（一詞多義），判讀時必須將選項釋義代回原句檢查前後主賓搭配是否通順，切忌死背單一解釋。",
      "看見「像、如、似、彷彿、宛如」不一定是譬喻修辭！必須同時存在「本質不同的兩種事物（本體與喻體）」且具相似點才構成譬喻；同類比較、舉例說明或未定猜測皆非譬喻。"
    ],
    rows: [
      ["真譬喻（異類相比）", "母親的笑容像冬日暖陽（人容貌 vs 太陽）", "本體與喻體屬於不同類事物，抓出溫暖共通點"],
      ["非譬喻（同類比較）", "弟弟長得像爸爸一樣高大", "兩人屬同類血親比較，無喻體轉借"],
      ["非譬喻（舉例／猜測）", "像花蓮、臺東這類城市／天色陰暗像要下雨了", "前者為舉例說明，後者為推測語氣"],
      ["轉化（擬人 vs 擬物）", "風兒輕撫臉龐（擬人）／把煩惱統統打包丟掉（形象化）", "賦予人性動作為擬人；將抽象情緒具體物化為形象化"]
    ],
    task: "判斷下列兩句何者使用了「譬喻」修辭？甲：「這座圖書館安靜得像一座深山古寺。」乙：「我看他神色匆忙，像是有急事要辦。」",
    answer: "甲句為譬喻（本體「圖書館」、喻詞「像」、喻體「深山古寺」，異類事物以安靜相似連結）；乙句「像是」表推測猜想語氣，並非譬喻。"
  },
  "chinese-2": {
    title: "敘事觀點（第一／第三人稱）限制與人物心理證據鏈推論",
    points: [
      "第一人稱「我」具親歷真實感，但只能知道「我」親眼所見與內心想法；第三人稱全知觀點可同時俯瞰多位角色內心，第三人稱限知觀點則聚焦單一角色視角。",
      "會考人物推論必須嚴守「行動／對話細節（明示證據）➔ 心理動機推論」，凡文本未提及的延伸猜測均屬「過度推論」。"
    ],
    rows: [
      ["第一人稱主角／配角", "如〈背影〉之「我」、魯迅〈孔乙己〉之小伙計", "拉近讀者距離，但受限於敘述者知識範圍"],
      ["第三人稱全知視角", "古典章回小說常見，交替描寫雙方將領計謀", "敘事靈活宏觀，可客觀對比多方動機"],
      ["明示資訊 vs 隱含推論", "「他攥緊衣角低頭不語」➔ 推論內心緊張或愧疚", "由外在肢體動作合理推敲情緒狀態"],
      ["過度推論防呆", "文中僅寫「未赴約」不可逕斷「故意絕交」", "檢查選項是否自行腦補文中不存在的因果"]
    ],
    task: "若小說寫道：「阿婆望著空蕩蕩的公車站牌，把剛蒸好的熱包子又收回保溫袋裡，嘆了口氣轉身往回走。」可合理推論阿婆什麼心情？",
    answer: "可由「望著空站牌、收回熱包子、嘆氣」合理推論阿婆原本期待親人搭車歸來並準備了熱食，因未能等到人而感到失落與牽掛。"
  },
  "chinese-3": {
    title: "文言文四大虛字（之、其、以、而）詞性轉換與省略主語還原",
    points: [
      "文言文極常承前或蒙後省略「主語」與「介詞賓語」，閱讀對話或連續動作時，務必先圈出每個動詞是誰發出的，避免張冠李戴把甲做的事算到乙頭上！",
      "「之」字三大高頻用法：接在名詞間譯為助詞「的」；接在及物動詞後多為代詞「他／它／這件事」；接在地名前且前無其他動詞時為動詞「往、到」（如送孟浩然之廣陵）。"
    ],
    rows: [
      ["之：代詞 vs 動詞", "學而時習「之」（代詞：所學知識）／吾欲「之」南海（動詞：前往）", "看「之」前是及物動詞還是後接處所名詞"],
      ["其：代詞 vs 語氣副詞", "「其」恕乎（副詞：大概、恐怕）／擇「其」善者而從之（代詞：他們）", "句首或反詰句中常表推測或反問語氣"],
      ["以：介詞用法", "「以」叢草為林（把）／徐噴「以」煙（用）／不「以」物喜（因為）", "依前後語意分別譯為用、把、憑藉、因為"],
      ["主語轉換防呆", "「公與語，悅之，厚賜之」主語皆為「公」", "逐句補上（人物名）核對施事者與受事者"]
    ],
    task: "辨析下列三個「之」字的詞性與意義：① 心「之」所向（助詞，取消獨立性／的）；② 昂首觀「之」；③ 送杜少府「之」任蜀州。",
    answer: "②「觀之」接在動詞觀後，為代詞（指蚊群／該物）；③「之任蜀州」後接地名官任，為動詞「往、到」。"
  },
  "chinese-4": {
    title: "說明文結構手法與非連續性圖表「相關 ≠ 因果」判讀",
    points: [
      "科普說明文常運用「下定義、分類別、舉例子、作比較、列數字」釐清複雜知識；標題與首尾段通常揭示說明對象的核心特徵。",
      "圖表轉譯題必做三檢核：橫縱軸單位與起點、分母基數（百分比高不代表絕對人數多！）、相關性不等於直接因果關係。"
    ],
    rows: [
      ["比率 vs 絕對數量", "甲校近視率 60%（共100人＝60人）＜ 乙校 50%（共500人＝250人）", "未給總母體數時，不可單憑百分比比人數多寡"],
      ["同期比較 vs 環比", "年增率（YoY）比去年同月；月增率（MoM）比上個月", "看清表格欄位比較的時間基準"],
      ["相關不必然因果", "冰淇淋銷量與溺水人數夏季同步上升（共同變因為高溫）", "不可推論「吃冰淇淋會導致溺水」"],
      ["限制條件字眼", "「可能、有助於、部分研究顯示」≠「必然、唯一原因」", "選項把或然改為絕對必然即屬誘答"]
    ],
    task: "某調查顯示：「每週運動超過 3 次的學生，平均睡眠滿意度達 78%，高於未運動學生的 52%。」能否據此斷言「只要開始運動就保證治癒所有失眠疾病」？",
    answer: "不能！數據僅顯示運動習慣與睡眠滿意度呈正相關，並未證明絕對因果，更不能誇大為「保證治癒所有失眠疾病」（過度推論）。"
  },
  "chinese-5": {
    title: "議論文三要素（論點、論據、論證）與常見邏輯謬誤識破",
    points: [
      "議論文以「論點（作者真正主張什麼）」為靈魂，「論據（事實史例或科學數據）」為支撐，「論證（舉例、正反對比、類比、演繹因果）」為橋樑。",
      "會考常考論證檢驗：首尾呼應處鎖定中心論點；注意作者引用反方觀點是為了「批駁（破而後立）」，切勿把靶子當成作者主張！"
    ],
    rows: [
      ["正反對比論證", "先舉自滿敗亡史例，再舉謙沖致勝史例", "一正一反強化中心論點說服力"],
      ["類比論證界線", "以治水宜疏不宜堵類比教育溝通", "生動易懂，但須檢驗兩事物本質是否真具可比性"],
      ["稻草人與人身攻擊", "曲解對手原意再打擊／批評說話者外貌出身而非論據", "皆屬無效邏輯謬誤，無法推翻原命題"],
      ["倖存者偏差", "只看少數輟學創業富豪便主張讀書無用", "忽略龐大失敗分母，樣本不具代表性"]
    ],
    task: "某文先寫：「世人多以為天賦決定一切，故遇挫即棄。」接著寫：「然觀歷代大家，無一不是積數十年苦功始成氣候。」作者真正的中心論點為何？",
    answer: "首句「世人多以為…」為欲批駁的俗見靶子，「然」字轉折後才是作者真正論點：後天持續不懈的積累苦功，才是成就卓越的關鍵。"
  },
  "chinese-6": {
    title: "詩歌意象解碼、轉品借代象徵辨析與寫作首尾結構",
    points: [
      "詩歌藉具體「意象（融合主觀情意的客觀物象）」寄託幽微情感；解讀時須觀察意象群的冷暖色調、動靜反差與轉折詞，而非套用死板公式。",
      "嚴格區分三大進階修辭：「轉品」是同一字在句中臨時改變詞性（如春風又『綠』江南岸，形容詞轉動詞）；「借代」是以部分或相關特徵代替本體（如干戈代戰爭、白衣天使代護理師）；「象徵」是以具體物象寄託抽象哲理情感（如十字架象徵救贖、松柏象徵堅貞）。"
    ],
    rows: [
      ["轉品（詞性活用）", "形容詞轉動詞：「紅」了櫻桃、「綠」了芭蕉", "看該字在句法位置上是否變成謂語動詞或名詞"],
      ["借代（以相關代本體）", "何以解憂，唯有「杜康」（以造酒人代酒）", "借體與本體具現實關聯，不可出現「像」字"],
      ["象徵（具體託抽象）", "燈塔象徵希望指引；落葉歸根象徵思鄉", "全篇脈絡賦予深層抽象意涵"],
      ["寫作四段起承轉合", "起（點題切入）→承（具體敘事細節）→轉（衝突感悟）→合（昇華呼應）", "避免有例無思或空喊口號"]
    ],
    task: "判斷「孤帆遠影碧空盡」中的「帆」與「他今天穿得很『陽光』」中的「陽光」各屬何種修辭？",
    answer: "「孤帆」以船的一部分「帆」代替整艘「船」，屬於「借代」；「很陽光」受程度副詞「很」修飾，將名詞「陽光」臨時轉為形容詞（開朗有活力），屬於「轉品」。"
  },
  "chinese-7": {
    title: "六書造字四大法則（象形、指事、會意、形聲）秒判流程",
    points: [
      "漢字六書中「象形、指事、會意、形聲」為造字法（體），「轉注、假借」為用字法（用）；現代通用漢字逾八成屬於「形聲字」。",
      "實戰秒判決策樹：先拆看是否為「獨體不可拆之單一文」——畫具體實物為「象形（日、月、山、水、木、鳥）」，表抽象概念或在象形上加抽象符號為「指事（上、下、本、末、刃、寸）」；若為「可拆成兩部件以上之合體字」——有部件負責表音即為「形聲（江、河、晴、聞、悶）」，兩部件皆表意無表音則為「會意（休、信、武、明、森、淼）」！"
    ],
    rows: [
      ["象形（具體獨體文）", "日、月、山、川、魚、馬、門、戶", "依具體天地萬物輪廓描繪，不能再拆出獨立偏旁"],
      ["指事（抽象獨體文）", "上、下、一、二、本（木下加點）、末（木上加點）、刃（刀口加點）", "純抽象記號或在象形字關鍵處加指示符號"],
      ["會意（合體全表意）", "人倚木為「休」、人言為「信」、日落草中為「莫（暮）」", "合二以上意符產生新義，無任何聲符"],
      ["形聲（意符＋聲符）", "「悶（心意門聲）」、「聞（耳意門聲）」、「衷（衣意中聲）」", "注意古今音變：如「江（工聲）」古音相近仍屬形聲！"]
    ],
    task: "請依序判斷「果、甘、武、晴」四個字分別屬於六書中的哪一種造字法？",
    answer: "「果」畫樹上結實之具體物象（或木上象果形），一般國中國學歸為象形（或合體象形／會意，課本標準範例：木上加符號「本、末、朱」為指事，「旦、甘（口含一物甜美）」為指事，「止戈為武」兩部件皆表意為會意，「晴（日表意、青表音）」為形聲）。"
  },
  "chinese-8": {
    title: "漢語四大基本句型（敘事、有無、表態、判斷）與標點語氣精析",
    points: [
      "判別四大句型只看「謂語中心是什麼詞」：一般動詞為「敘事句」；表存在擁有的「有／無／沒」為「有無句」；形容詞或形容詞性短語描述狀態性質為「表態句」；以繫詞「是、乃、為、即、非」斷定身分歸屬為「判斷句」！",
      "最大陷阱：句子裡出現「是」字不一定是判斷句（如「真是太美了」表程度強調，仍為表態句）；文言文「是」更常作指示代詞「這」（如「是法平等」、「是可忍」），且文言常以「……者，……也」表判斷！"
    ],
    rows: [
      ["敘事句（動作行為）", "微風吹過金黃色的稻浪／天下沒有白吃的午餐？注意後句為有無句！", "敘事句必有具體或心理動作動詞（吹、跑、想、愛）"],
      ["有無句（存在擁有）", "山不在高，「有」仙則名／宅邊「有」五柳樹", "以「有、無」為主要謂語表擁有或存在"],
      ["表態句（性質狀態）", "荷葉「亭亭淨植」／今夜月色「真美」", "謂語為形容詞，無動作亦無身分歸類"],
      ["判斷句（身分等號）", "孔子「是」至聖先師／蓮，花之君子「者也」", "主語與斷語間建立「A 屬於／等於 B」之定義判斷"]
    ],
    task: "請判斷下列三句各屬四大句型中的哪一種：① 老殘「有」一個老朋友；② 牡丹，「花之富貴者也」；③ 春天的陽光「十分溫暖」。",
    answer: "① 表擁有的「有無句」；②「……者也」表身分歸屬的文言「判斷句」；③「十分溫暖」為形容詞短語描寫性質，屬於「表態句」。"
  },
  "chinese-9": {
    title: "唐代近體詩（絕句、律詩）平仄押韻對仗鐵律與季節意象",
    points: [
      "近體詩（今體詩）句數與字數嚴格固定（絕句 4 句、律詩 8 句，分五言與七言）；偶數句必押韻（首句可押可不押），通常押平聲韻且「一韻到底、不可換韻、不可重韻」。",
      "律詩四聯為首聯（1、2句）、頷聯（3、4句）、頸聯（5、6句）、尾聯（7、8句）：其中「頷聯與頸聯必須嚴格對仗」（同位置字詞性相同、平仄相反：名詞對名詞、動詞對動詞、顏色對顏色、數目對數目）！"
    ],
    rows: [
      ["入聲字判平仄", "國語一二聲多為平聲，三四聲多為仄聲（注意古入聲字現派入平聲者如白、竹、菊、石、一、十實為仄聲！）", "律詩每聯出句末字必為仄聲，押韻句末字必為平聲"],
      ["頷聯頸聯工對", "「明月松間照（名名名方位動），清泉石上流（名名名方位動）」", "逐字詞性對齊，借對或流水對亦符律詩規範"],
      ["春夏季代表意象", "春：東風、楊柳、杏花、杜鵑、紙鳶／夏：薰風、荷（芙蕖）、蟬、蛙、梅雨", "由植物風向與農事秒判詩中季節"],
      ["秋冬季代表意象", "秋：西風（金風）、楓紅、菊、茱萸、鴻雁、梧桐／冬：朔風、梅、雪、蘆花（秋末冬初）", "重陽插茱萸登高為秋，折柳送別多在春"]
    ],
    task: "王維五言律詩〈山居秋暝〉中有兩聯：甲「空山新雨後，天氣晚來秋」與乙「竹喧歸浣女，蓮動下漁舟」。請問哪一聯可能是首聯？哪一聯必在中間頷／頸聯？",
    answer: "甲聯「空山（形名）」與「天氣（並列名詞）」、「新雨後」與「晚來秋」未工整對仗且點出詩題，為首聯；乙聯「竹喧」對「蓮動」、「歸浣女」對「下漁舟」詞性嚴謹對仗，為律詩中間的頸聯。"
  },
  "chinese-10": {
    title: "宋詞（詞牌長短句）與元曲（曲牌襯字、散曲雜劇）體制比較",
    points: [
      "唐詩、宋詞、元曲一脈相承：詞依「詞牌（曲調名，規定字數、句數、平仄與押韻，原本與內容無關，故後期常另加題目如〈破陣子・為陳同甫賦壯詞以寄之〉）」填詞，按字數分小令（58字內）、中調（59～90字）、長調（91字以上）。",
      "元曲分為「散曲（清唱無科白，含單支『小令』與同宮調多支串聯『套數』）」與「雜劇（有曲、科〔動作〕、白〔對話〕的完整舞台戲劇）」；曲最大體制解放是允許在正字外加入「襯字」使語言活潑口語化！"
    ],
    rows: [
      ["詞牌 vs 題目", "〈虞美人〉、〈水調歌頭〉是詞牌音樂格式；「丙辰中秋…」小序或後綴才是題意", "不可看詞牌〈菩薩蠻〉就以為內容在寫佛教菩薩"],
      ["婉約派 vs 豪放派", "婉約（李煜、柳永、李清照：清麗柔婉）／豪放（蘇軾、辛棄疾：豪邁闊大）", "依意象格局（小樓殘月 vs 大江鐵馬）判別詞風"],
      ["元曲小令 vs 詞小令", "〈天淨沙・秋思〉：「天淨沙」為曲牌，「秋思」為題目，屬元代散曲小令", "枯藤老樹昏鴉連用九個名詞意象並列烘托羈旅孤愁"],
      ["襯字與押韻特色", "曲可加襯字（不計入曲譜正字）、平仄通押且無入聲（入派三聲）", "語言比宋詞更通俗俚俗、自然本色"]
    ],
    task: "辛棄疾〈南鄉子・登京口北固亭有懷〉與馬致遠〈天淨沙・秋思〉中，哪一首是宋詞？哪一首是元曲？兩者標題前半與後半各代表什麼？",
    answer: "〈南鄉子〉為宋詞（南鄉子是詞牌、登京口北固亭有懷是題目）；〈天淨沙〉為元代散曲小令（天淨沙是曲牌、秋思是題目）。"
  },
  "chinese-11": {
    title: "明清章回小說四大奇書／名著流變與人物白描反諷刻畫",
    points: [
      "中國小說演進歷經「先秦神話寓言 ➔ 魏晉筆記志怪志人（《世說新語》）➔ 唐代傳奇（文言短篇成熟）➔ 宋元話本（白話短篇）➔ 明清章回小說（白話長篇巔峰）」。",
      "《三國演義》為文言淺近（文不甚深，言不甚俗）之歷史演義；《水滸傳》、《西遊記》、《儒林外史》（諷刺科舉士人，如范進中舉）、《紅樓夢》（曹雪芹，清代言情世情巔峰）及《老殘遊記》（劉鶚，譴責小說）皆為白話章回小說。"
    ],
    rows: [
      ["《世說新語》vs 唐傳奇", "南朝宋劉義慶召集門客編纂（筆記志人，非章回！）／唐傳奇如〈虯髯客傳〉具完整結構", "切記魏晉唐代尚無「章回小說」體裁"],
      ["《三國演義》與正史區隔", "羅貫中根據陳壽《三國志》加民間傳說藝術加工（尊劉貶曹，七實三虛）", "空城計、草船借箭諸葛亮形象為文學塑造非正史原貌"],
      ["《儒林外史》諷刺筆法", "吳敬梓以冷峻白描對比胡屠戶在范進中舉前後的前倨後恭", "不直接破口大罵，讓人物言行自己暴露科舉毒害與世態炎涼"],
      ["《紅樓夢》判詞伏筆", "以賈寶玉、林黛玉、薛寶釵及賈府興衰寫人情百態，不落才子佳人大團圓俗套", "善用詩詞謎語設下人物命運伏筆"]
    ],
    task: "某生報告寫道：「《世說新語》是漢代最著名的白話章回小說，而《紅樓夢》則是唐代文言傳奇代表作。」請訂正其中四處文學史錯誤！",
    answer: "①《世說新語》成書於「南朝宋」（非漢代），屬「文言筆記（志人）小說」（非白話章回）；②《紅樓夢》成書於「清代」（非唐代），屬「白話章回小說」（非文言傳奇）。"
  },
  "chinese-12": {
    title: "應用文全攻略：書信提稱啟封詞、中式信封、題辭場合與對聯仄起平收",
    points: [
      "中式信封中間欄收信人稱謂寫給「郵差」看，故絕不可寫「家父、家兄、先父」，應寫收件人姓氏加職稱「先生／女士／君」，下方啟封詞長輩用「安啟、福啟」、平輩用「大啟、台啟」、師長用「道啟」，**嚴禁寫『敬啟』（等於叫收件人恭敬拆信！）**！",
      "對聯必守「上下聯字數相等、詞性相同、平仄相反，且**上聯末字必仄聲（國語三四聲或入聲）、下聯末字必平聲（國語一二聲，仄起平收）**」；傳統直貼時面對大門右手邊為上聯、左手邊為下聯！"
    ],
    rows: [
      ["書信內文提稱語", "父母長輩：膝下、尊前、尊鑒／師長：道鑒、壇席／平輩：大鑒、惠鑒、足下／晚輩：青鑒、如晤", "內文開頭稱呼用「家／舍」對人謙稱自己親屬？不，對收信本人直稱「母親大人、吾兄」！"],
      ["結婚與生子題辭", "男方賀婚：宜室宜家、琴瑟和鳴／女方出嫁：于歸之喜、之子于歸／生男：弄璋／生女：弄瓦", "「珠聯璧合、天作之合」男女雙方賀婚通用"],
      ["教育醫療政商題辭", "教育：杏壇之光、桃李春風、化雨均霑／醫界：杏林春暖、華佗再世、仁心仁術／商界：近悅遠來", "千萬分清：**杏「壇」＝教育界（孔子）**，**杏「林」＝醫界（董奉）**！"],
      ["哀輓題辭性別年齡", "男喪：哲人其萎、駕返道山／女喪：駕返瑤池、彤管流芳、慈竹風摧／高壽（80+）始稱喜喪福壽全歸", "「音容宛在」（不是苑在！）通用哀輓"]
    ],
    task: "請將下列上下聯配對並分辨哪一句是上聯、哪一句是下聯：甲「春回大地千山秀」，乙「日暖神州萬木榮」。並判斷「杏林之光」應送給學校校長還是醫院院長？",
    answer: "甲末字「秀（ㄒㄧㄡˋ，第四聲仄聲）」為上聯（貼門右），乙末字「榮（ㄖㄨㄥˊ，第二聲平聲）」為下聯（貼門左），符合仄起平收！「杏林」專指醫學界，應送給醫院院長（送校長應用「杏壇之光」）。"
  },
  "chinese-13": {
    title: "先秦諸子四大家（儒、道、墨、法）核心思想與寓言哲理對照",
    points: [
      "春秋戰國諸子針對亂世提出不同解方：儒家（孔、孟、荀）重仁義禮教與民本王道；道家（老、莊）重順應自然、無為不爭與破除成見相對逍遙；墨家（墨子）重兼愛（無差等之愛）、非攻、尚賢節用；法家（韓非）重嚴刑峻法、法術勢結合與因時變法！",
      "讀諸子寓言必抓「故事表象 ➔ 喻指政治／人生哲理」：如韓非〈買櫝還珠〉諷刺捨本逐末、〈守株待兔〉諷刺不知隨時代變法而死守舊制；莊子〈庖丁解牛〉喻順應自然肌理養生！"
    ],
    rows: [
      ["儒家（孔孟荀）", "孟子主張性善（民為貴，社稷次之，君為輕；揠苗助長戒急躁）／荀子主張性惡（化性起偽重後天禮法師教）", "有親疏遠近推己及人之「仁愛」"],
      ["道家（老莊）", "老子「柔弱勝剛強、小國寡民、無為而無不為」／莊子「齊物逍遙、無用之用、井底之蛙」", "批判人為禮法束縛與名利巧智"],
      ["墨家（墨子）", "兼愛（愛人若愛其身，無血緣親疏差別）、非攻（反對侵略戰爭）、節葬非樂", "代表平民工匠階層務實互利精神"],
      ["法家（商鞅韓非）", "法（公開法令）、術（駕馭群臣心術）、勢（君主威勢）；不期修古，不法常可", "強調人性趨利避害，須靠明確賞罰治理"]
    ],
    task: "請判斷下列兩段治國主張各屬先秦哪一學派？甲：「聖人不期修古，不法常可，論世之事，因為之備（依當代情勢制定新法）。」乙：「視人之國若視其國，視人之家若視其家，視人之身若視其身，則誰攻？」",
    answer: "甲強調不墨守古法、隨時代變遷制定法令，屬於「法家（韓非子）」；乙強調無差等地愛他人之國與家以消弭侵略戰爭（兼愛、非攻），屬於「墨家（墨子）」。"
  },
  "chinese-14": {
    title: "現代抒情記敘散文「藉事／藉物抒情」與映襯、倒反、層遞技巧",
    points: [
      "高明散文「不直接喊愛與痛，而把情感藏進具體物件與動作細節裡（寓情於物／融情入景）」：如朱自清〈背影〉聚焦父親攀爬月台時青布棉袍黑布馬褂與肥胖蹣跚動作；琦君藉母親搖桂花凝結鄉愁。",
      "辨析三大情感強化修辭：「映襯」將兩種相反相對觀念並置對比；「倒反」表面說反話（正話反說表親暱幽默，如罵頑皮愛孫『小冤家』；反話正說表辛辣諷刺，如〈背影〉自嘲『那時真是太聰明了』實悔恨自己當年愚昧不懂父愛！）；「層遞」按大小輕重深淺依序推進。"
    ],
    rows: [
      ["核心物象錨點", "〈背影〉之紫毛大衣與朱紅橘子／〈紙船印象〉之母親摺紙船", "外在物象隨歲月流轉成為親情永恆象徵"],
      ["倒反（自責／親暱）", "「我那時真是太聰明了！」（自責當年自作聰明不體貼父親）", "字面褒義而內心悔恨，情感張力比直說「我很笨」更痛切"],
      ["映襯（反襯烘托）", "「蟬噪林逾靜，鳥鳴山更幽」／以熱鬧街景反襯主角孤寂", "借少許聲響或歡樂對照，使寂靜悲涼加倍凸顯"],
      ["層遞（階梯推進）", "「知之者不如好之者，好之者不如樂之者」（知→好→樂）", "三個以上層次具邏輯深淺或範圍大小順序"]
    ],
    task: "閱讀文句：「母親一邊幫全身淋濕的我擦頭髮，一邊嘆氣說：『你呀，真是個讓人省心的小祖宗！』」請問畫線句運用了何種修辭？真實情感為何？",
    answer: "運用了「倒反」修辭（正話反說／責備語氣藏心疼）；表面說「省心的小祖宗」，實際上表達對孩子淋雨擔心受寒的滿滿疼愛與寵溺。"
  },
  "chinese-15": {
    title: "臺灣自然生態、海洋文學與跨文本比較閱讀策略",
    points: [
      "臺灣自然寫作與海洋文學兼具「科學觀察精確度（知性）」、「現場感官摹寫（美感）」與「生命土地倫理省思（情意）」三層次：如廖鴻基海洋書寫扭轉陸地中心對海的恐懼、夏曼・藍波安呈現達悟族海洋宇宙觀、劉克襄與吳明益思索人類開發與野生物種共存。",
      "會考「甲乙雙文比較題組」必用雙欄對照法：先找兩文「共同探討的核心議題」，再切分兩位作者在「觀察視角、取材切入點或價值立場」上的同中之異！"
    ],
    rows: [
      ["海洋文學視角翻轉", "從「望洋興嘆的島嶼邊緣」轉為「以海洋為母親與無垠道路」", "結合真實漁獵航海體驗與鯨豚黑潮生態關懷"],
      ["自然寫作 ≠ 百科圖鑑", "既有鳥類植物習性觀察，更有「人類退後一步尊重荒野主體」之謙卑", "批判人類中心主義將自然僅視為經濟掠奪資源"],
      ["鄉土與原住民文學", "黃春明、洪醒夫關懷農村小人物尊嚴；瓦歷斯・諾幹、夏曼・藍波安書寫部落文化主體", "在時代現代化衝擊中凝視人的處境與土地記憶"],
      ["雙文對讀四問檢核", "對象同嗎？時代同嗎？態度同嗎（贊成／反思）？手法同嗎（記敘／議論）？", "切忌將甲文才有的論據偷渡成乙文也主張的觀點"]
    ],
    task: "若甲文詳述黑面琵鷺度冬覓食的嘴喙構造與溼地食源數據，乙文則描寫老漁民在寒風魚塭旁留下一畦淺水小魚給候鳥過冬的溫柔默契。比較甲、乙兩文寫作手法與側重點之差異。",
    answer: "甲文採客觀科普「說明」筆法，側重鳥類生理構造與生態棲地科學知識；乙文採「記敘抒情」筆法，透過老漁民留魚護鳥的具體人情細節，傳達人與自然和諧共生的倫理溫度。"
  },
  "chinese-16": {
    title: "會考寫作測驗六級分架構：精準審題、具體五感細節與思辨昇華",
    points: [
      "會考寫作測驗（引導式或圖表資訊整合式命題）奪取五～六級分的三大鐵則：① **審題零偏離**（抓準題幹限定詞，如「未成功的經驗」不可寫最後逆轉奪冠！）；② **以小見大具象化**（用動作慢鏡頭與五感描寫取代「我很難過、非常努力」空泛形容詞）；③ **由個人經驗提煉普世哲思**。",
      "近年新型「圖表立場題（如養生／選擇／標題設計）」無須死背名言佳句，必須先精準「摘要圖表關鍵現象與正反多元觀點」，再提出「有真實生活事例支撐的個人立場與反思」！"
    ],
    rows: [
      ["審題圈題眼", "如〈多做多得〉須辯證「付出與無形收穫」；〈不必凡事爭第一〉須寫退一步看見的風景", "動筆前花 3 分鐘列四段大綱，鎖死核心母題"],
      ["慢鏡頭細節放大術", "把「我上台很緊張」改寫為「指尖冰涼發汗，講稿邊角被捏出深深皺褶，連吞嚥聲都清晰可聞」", "不寫「緊張」二字卻讓閱卷老師身歷其境"],
      ["轉折段深度思辨", "從「一次挫敗／誤解」轉入「換位思考或重新定義價值標準」", "這是區隔四級分（純流水帳）與六級分（深刻體悟）的分水嶺"],
      ["版面與標點規範", "分段勻稱（4～5段最佳）、不寫錯別字與網路火星縮寫、引號破折號占格正確", "全篇約 650～850 字結構飽滿收束有力"]
    ],
    task: "若作文題目引導語要求書寫「一次因『慢下來』而意外發現美好的真實經驗」，下列甲、乙兩種立意選材何者符合六級分審題？甲：寫自己百米賽跑衝刺破紀錄拿金牌的快感；乙：寫錯過直達公車改走路回家，在巷弄老樹下聽見修鞋匠與老狗互動而釋懷考試焦慮。",
    answer: "乙完全扣緊「慢下來」與「意外發現美好」之雙重題眼，具畫面轉折與心境昇華；甲寫追求極速奪冠，嚴重偏離「慢下來」的審題限制。"
  },

  "english-1": {
    title: "Be 動詞 vs 一般動詞互斥鐵律與現在簡單式三單變化",
    points: [
      "英文簡單句一個子句「不能同時並存原形 be 動詞（am/is/are）與一般動詞原形／三單（如 ✕ `He is plays` 或 ✕ `Are you like...?`）」！描述身分狀態用 be 動詞，描述習慣動作則用一般動詞（疑問否定借用助動詞 `do / does ＋ 原形 V`）。",
      "現在簡單式表「規律習慣、不變事實與真理」：只有當主詞為「第三人稱單數（he, she, it, 單數人名或不可數名詞如 Water/Time）」且在肯定直述句時，一般動詞才加 `-s / -es / 去 y 加 ies`；一旦出現 `does / doesn't`，後面動詞立刻打回原形！"
    ],
    rows: [
      ["Be 動詞句型", "Amy `is` a nurse. → `Is` Amy a nurse?（直接把 be 動詞移句首）", "句中只有形容詞／名詞／介系詞片語無一般動作時必用 be"],
      ["一般動詞三單變化", "watch→watches, study→studies（子音+y）, play→plays（母音+y）, have→has", "注意 `have` 的三單是 `has`，絕不是 `haves`！"],
      ["助動詞照妖鏡", "He `doesn't have` a bike. / `Does` your mom `cook` every day?", "助動詞 `does` 已扛走三單標記，主要動詞強制回原形 `V`"],
      ["不可數與動名詞主詞", "`Drinking` enough water `keeps` us healthy.", "一件事（V-ing / To V）或不可數名詞當主詞視為第三人稱單數！"]
    ],
    task: "挑出並訂正下列兩句的文法錯誤：① `Does Kevin has math class on Fridays?` ② `My sister is walks to school every morning.`",
    answer: "① 助動詞 `Does` 後動詞須回原形，應改為 `Does Kevin have math class on Fridays?`；② `is` 與一般動詞 `walks` 互斥不可並用，應刪去 `is` 改為 `My sister walks to school every morning.`。"
  },
  "english-2": {
    title: "現在進行式（be + V-ing）結構完整性與瞬間／狀態動詞限制",
    points: [
      "現在進行式 `am / is / are ＋ V-ing` 兩大零件缺一不可（單寫 `V-ing` 不是動詞！）；拼字注意「去不發音 e 加 ing（write→writing, make→making）」與「單音節短母音＋單子音重複字尾加 ing（run→running, swim→swimming, sit→sitting, get→getting）」。",
      "表「擁有、認知、喜好、感官狀態」的靜態動詞（如 `have〔擁有〕, know, like, love, want, need, understand, belong`）通常不用進行式！但當 `have` 解釋為「吃喝、舉辦、經歷（動作）」時則可用進行式（如 `We are having dinner now.`）！"
    ],
    rows: [
      ["進行式信號詞", "`Look!`, `Listen!`, `now`, `right now`, `at the moment`", "看到感嘆號祈使句 `Look! The bus ___!` 秒選 `is coming`"],
      ["重複字尾 V-ing", "put→putting, shop→shopping, plan→planning, cut→cutting", "重音閉音節「子－母－子」結尾必雙寫尾字母"],
      ["靜態 vs 動態 have", "✕ I am having two brothers. → ✔ I `have` two brothers.", "「擁有」為狀態不可進行；`having lunch`（吃午餐）為動作可進行"],
      ["時間表達（逆讀法）", "7:15 = a quarter `past` seven / 7:45 = a quarter `to` eight", "`past/after` 表「過幾分」，`to` 表「差幾分到下一點鐘」！"]
    ],
    task: "判斷空格應填入 `has` 還是 `is having`：① `Quiet! Dad ___ a meeting online in the study right now.` ② `Jenny ___ big brown eyes like her mother.`",
    answer: "① `Quiet!` 與 `right now` 且 `have a meeting（開會）` 為持續動作，填 `is having`；②「擁有大眼睛」為長期狀態特徵不可用進行式，填 `has`。"
  },
  "english-3": {
    title: "過去簡單式不規則動詞、未來式（will vs be going to）與來去動詞現在進行表未來",
    points: [
      "過去簡單式搭配明確過去時間（`yesterday, last night, two days ago, in 2020, this morning〔已過〕`）；遇到助動詞 `did / didn't` 動詞一律回原形，且極易考「三態同形動詞 `read-read-read, put-put-put, cut-cut-cut, hurt-hurt-hurt, cost-cost-cost`」（例如 `He read the book` 主詞三單卻沒加 s，證明這句的 `read [rɛd]` 必定是過去式！）！",
      "未來式可用 `will + V`（臨時決定、預測、承諾）或 `am/is/are going to + V`（事先計畫打算、眼前明顯跡象）；而來去移動動詞（`come, go, leave, arrive, fly`）常用 `be + V-ing` 直接表達近期確定的未來行程！"
    ],
    rows: [
      ["三態同形時態偵探", "`Tom put his bag on the desk.`（Tom 三單卻無 -s ➔ 必為過去式！）", "附加問句或後續子句時態必須同步用過去式 `didn't he?`"],
      ["易混淆過去式拼字", "buy→bought, bring→brought / catch→caught, teach→taught / fall→fell, feel→felt", "特別區分 `fell（跌倒，fall過去式）` vs `felt（感覺，feel過去式）`！"],
      ["過去存在句", "`There was` a park here ten years ago. / `Were there` many trees?", "`There is/are` 的過去式直接變 `There was/were`（絕無 `There had`！）"],
      ["未來時間表達", "`in + 一段時間`（如 `in ten minutes` 十分鐘後）配未來式！", "對比：`ten minutes ago` 配過去式，`in ten minutes` 配未來式"]
    ],
    task: "觀察句子：`Grandpa hurt his back when he ___ (move) the heavy sofa.` 為何可確定這句發生在過去？空格應填什麼？",
    answer: "因為主詞 `Grandpa` 為第三人稱單數，若為現在式動詞應寫 `hurts`；此處寫無 `-s` 的 `hurt`，證明是過去式（hurt 三態同形），故 `when` 子句亦須用過去時態 `moved`（或 `was moving`）。"
  },
  "english-4": {
    title: "比較級修飾語（much/even）、雙重比較與不定詞（to V）vs 動名詞（V-ing）分工",
    points: [
      "比較級前**嚴禁加 `very / so / too / quite`**，要表達「……得多」必須用 **`much / even / far / a lot / a little ＋ 比較級`**（如 `much taller, even more expensive`，且不可重複寫 `more taller`）！兩者中較……的那一個（後接 `of the two`）比較級前必加定冠詞 **`the`**（`the taller of the two boys`）！",
      "動詞後接 `to V` 或 `V-ing` 口訣：表未來願望計畫多接 **`to V`**（`want, need, plan, decide, hope, ask, tell`）；表享受持續結束逃避必接 **`V-ing`**（`enjoy, finish, practice, keep, mind, quit, give up`）；而 **`stop / remember / forget`** 接兩者語意截然不同！"
    ],
    rows: [
      ["比較級合法修飾詞", "✔ `much / even / a lot` cheaper（✕ `very` cheaper）", "會考單選題最愛挖空格在比較級前考 `much / even`"],
      ["兩者之較（the + 比較級）", " Kelly is `the younger` of the twin sisters.", "看到句尾限定 `of the two...`，比較級前必加 `the`！"],
      ["stop to V vs V-ing", "`stop to rest`（停下原動作去休息）vs `stop talking`（停止說話）", "`to V` 表目的（去做另一件事）；`V-ing` 表停掉正在做的事"],
      ["forget / remember", "`remember to lock`（記得要去鎖門，還沒鎖）vs `locking`（記得鎖過了）", "`to V` 尚未做；`V-ing` 已經做過之記憶"]
    ],
    task: "選出正確形式：① `Today is (very / much) hotter than yesterday.` ② `Please remember (turning / to turn) off the lights before you leave.`",
    answer: "① 比較級 `hotter` 前不可用 `very`，應選 `much`；② 離開前「記得要去關燈（尚未發生之提醒）」，應選不定詞 `to turn`。"
  },
  "english-5": {
    title: "現在完成式時間標記（since vs for / gone vs been）、被動語態與關係子句核心",
    points: [
      "現在完成式 `have / has + p.p.` 連結過去到現在，**絕對不能與明確已結束的過去時間點（`yesterday, last week, ...ago, in 2019, When...?`）連用**！`since` 後接「過去起算時間點或過去簡單式子句（`since 2021 / since he was ten`）」，`for` 後接「持續時間長度（`for three years`）」。",
      "被動語態 `be + p.p.` 必同時看「主詞是自己做還是被做」以及「時態變換 be 動詞（過去被動 `was/were + p.p.`、完成被動 `has been + p.p.`、助動詞被動 `can/must/should be + p.p.`）」！"
    ],
    rows: [
      ["have been to vs gone to", "She `has been to` Japan twice.（去過已回）vs `has gone to`（去了人還在日未歸）", "第一、二人稱 `I / You` 不可能說 `have gone to`（人就在這說話）！"],
      ["since 子句時態黃金配對", "Mr. Lin `has lived` here `since` he `moved` to Taipei in 2010.", "主要子句用「現在完成式」，`since` 子句必用「過去簡單式」！"],
      ["被動語態時態矩陣", "The bridge `was built` in 1998. / Trash `must be sorted`.", "看時間副詞決定 `be` 動詞用 `is, was, will be` 或 `has been`"],
      ["關代先行詞單複數一致", "The boys `who are` playing basketball `are` my cousins.", "主格關代後的動詞單複數，完全取決於前面的「先行詞」！"]
    ],
    task: "填入正確動詞時態：`Ms. Wang ___ (teach) English at our school since she ___ (come) to Taiwan ten years ago.`",
    answer: "主要子句表從過去持續至今用現在完成式 `has taught`；`since` 引導的過去起點子句（含 `ten years ago`）用過去簡單式 `came`。"
  },
  "english-6": {
    title: "會考長文閱讀策略（主旨、指代代名詞、前後文猜詞與時刻表條件整合）",
    points: [
      "解答會考閱讀題組四大題型 SOP：① **主旨標題題（Main idea / Best title）**看首段轉折後與末段結論，淘汰以偏概全（只講單一段落細節）或範圍過大的選項；② **代名詞指涉題（it / they / this / one）**必往「前一句或前半句」找單複數一致的核心名詞代回驗算！",
      "面對「車班時刻表、折價券限制、活動海報」多條件應用題，務必用筆逐條勾核「日期（平日 weekday vs 週末 weekend）、年齡身高門檻、截止時間（before 4:30 pm）與除外小字（`*except holidays`）」！"
    ],
    rows: [
      ["轉折詞抓作者真意", "`However, Yet, But, In fact, Instead, On the other hand`", "會考文章最愛先寫大眾普遍迷思，再用 `However` 翻盤亮出真正主旨！"],
      ["因果與舉例信號", "因果：`therefore, thus, as a result`／舉例：`for instance, such as`", "陌生單字題常在後面 `such as` 或對比句中直接給出解釋線索"],
      ["語氣態度題（Tone）", "批評擔憂（worried/critical）、客觀中立（objective）、幽默諷刺（humorous/ironic）", "從作者選用的形容詞正負色彩判斷立場"],
      ["時刻表跨條件交集", "9:20 到車站 ➔ 9:15 那班已開走不可選！須選 ≥ 9:20 的下一班車再加上車程時間", "把「抵達車站時間 → 發車時間 → 到站時間」畫時間軸核對"]
    ],
    task: "閱讀短句：`Many people believe sharks hunt humans for food. However, studies show most shark bites happen simply because sharks mistake surfers for seals in murky water.` 這段話的核心主旨為何？",
    answer: "`However` 後揭示真正主旨：澄清大眾對鯊魚主動獵食人類的誤解，指出多數咬傷事件其實是混濁水域中的視覺誤判。"
  },
  "english-7": {
    title: "可數／不可數名詞、不規則複數、指示代名詞與祈使句（含對等連接詞 and/or）",
    points: [
      "英語常見不可數名詞（恆單數、不可加 `a/an` 或字尾 `-s`）：`information, news, advice, homework, housework, mail, garbage/trash, furniture, equipment, money, bread, beef, pork, water, weather`！表數量須借用量詞單位（如 `two pieces of news / three loaves of bread`）。",
      "祈使句省略主詞 `You`，一律以「**原形動詞 `V` / `Be + adj.`**」開頭，否定祈使句用 **`Don't + 原形 V` / `Never + 原形 V`**（嚴禁寫 `No + V` 如 ✕ `No park`，標示牌僅能寫 `No + V-ing / N` 如 `No parking`）！且「**祈使句 ＋ `, and`（那麼就會…）／ `, or`（否則就會…）＋ `S + will...`**」為段考會考超級高頻句型！"
    ],
    rows: [
      ["不規則複數名詞", "child→children, mouse→mice, tooth→teeth, foot→feet, person→people, sheep→sheep（單複同形）", "`fish, deer, sheep, Chinese, Japanese` 單複數同形不加 s"],
      ["不可數名詞動詞搭配", "Good `news` `is` hard to come by. / Much `homework` `makes` him tired.", "不可數名詞當主詞，動詞一律用單數 `is / was / V-s`！"],
      ["祈使句 vs 動名詞主詞", "`Wash` your hands before meals.（祈使句無其他動詞）vs `Washing` hands `is` important.（有動詞 `is`！）", "句首挖空必往後掃描整句「有沒有別的動詞或連接詞」！"],
      ["祈使句 + and / or", "`Hurry up, or` you will miss the train.（快點，否則會趕不上火車）", "順接好結果用 `, and`；警告壞後果用 `, or`"]
    ],
    task: "比較下列兩句句首空格應填 `Eat` 還是 `Eating`：① `___ more vegetables, and you will feel healthier.` ② `___ more vegetables helps you stay healthy.`",
    answer: "① 後有對等連接詞 `, and` 連接完整子句，前半為「祈使句」，填原形 `Eat`；② 無連接詞且後有單數動詞 `helps`，前半為「動名詞片語當主詞」，填 `Eating`！"
  },
  "english-8": {
    title: "頻率副詞精準位置（Be 後動前、簡答 Be/助前）與 There is/are 存在句鐵律",
    points: [
      "頻率副詞（`always 100% > usually > often > sometimes > seldom/hardly ever > never 0%`）位置口訣：「**Be 動詞與助動詞之後、一般動詞之前**」（`He is always early.` / `He always gets up early.`）；但在**簡答句中必須放在 be 動詞或助動詞「之前」**（`Yes, he always is.` / `Yes, I usually do.`）！注意 `never, seldom, hardly` 本身已含否定意，不可再與 `not` 重複否定！",
      "存在句 **`There is / There are`（某處有某物）絕對不能與 `have / has` 混血寫成 ✕ `There has / There have`**！動詞單複數採取「就近原則」看緊接在後的第一個名詞（如 `There is a pen and two books on the desk.`）！"
    ],
    rows: [
      ["頻率副詞位置", "She `is never` late. / She `never goes` late. / She `can always` win.", "Be 後、助後、一般動前"],
      ["簡答句位置倒轉陷阱", "A: Is Jeff often late? B: Yes, he `often is`.（✕ `Yes, he is often.`）", "簡答句句尾不能懸空放頻率副詞，須移到 `is/do/can` 前面！"],
      ["How often 問頻率", "— `How often` do you floss? — `Twice a day` / `Every two weeks`.", "區分：`How often` 問頻率、`How long` 問時長、`How soon` 問多久以後"],
      ["There be 未來與完成變形", "未來：`There will be` / `There is going to be`（✕ `There will have`！）", "把 `be` 套入各時態助動詞後，永遠不出現表擁有的 `have`"]
    ],
    task: "改錯並寫出正確句子：`There will have two basketball games in our gym tomorrow, and Ted doesn't never miss them.`",
    answer: "兩處錯誤：① `There will have` 應改為 `There will be`（或 `There are going to be`）；② `doesn't` 與否定頻率副詞 `never` 雙重否定錯誤，應改為 `never misses`（或 `doesn't ever miss`）。"
  },
  "english-9": {
    title: "過去進行式交錯時間軸（when vs while）與可數／不可數數量詞（few vs little）",
    points: [
      "過去時間軸上「一長（持續進行背景動作 `was/were + V-ing`）配一短（瞬間突發動作過去簡單式 `V-ed`）」：瞬間動作前多接 **`when`**（`I was taking a shower when the phone rang.`），持續進行長動作前常接 **`while`**（`While Mom was cooking, Dad was mopping the floor.`）！",
      "數量詞雙軸矩陣：先看名詞「可數複數（`many / a few / few`）」或「不可數（`much / a little / little`）」，再看語意正負——**有 `a`（`a few / a little`）表肯定「還有一些」；沒 `a`（`few / little`）表否定「幾乎沒有、極少」**！"
    ],
    rows: [
      ["when + 短動作（V-ed）", "We `were having` class `when` the earthquake `hit`.", "地震發生瞬間，當時正在上課用 `were having`"],
      ["while + 長動作（be V-ing）", "`While` I `was walking` home, I `saw` an old friend.", "`while` 後優先接持續進行的 `was/were + V-ing`"],
      ["a few vs few（可數複數）", "`a few` friends（幾個朋友，肯定）vs `few` mistakes（極少錯誤，否定）", "後必接複數可數名詞 `N-s`"],
      ["a little vs little（不可數）", "`a little` milk（一點牛奶，還夠）vs `little` time left（幾乎沒時間了！）", "後必接不可數名詞；注意 `little` 另有形容詞「小的」之意（`a little boy`）"]
    ],
    task: "依語意選出正確數量詞：`Hurry up! There is (a little / little / few) time left before the train leaves, and only (a few / few / a little) seats are still free.`",
    answer: "第一格 `time` 不可數且催促「快沒時間了（否定意）」選 `little`；第二格 `seats` 可數複數且前有 `only`（固定搭配 `only a few / only a little` 表僅剩少許）選 `a few`！"
  },
  "english-10": {
    title: "連綴動詞（look vs look at）、感官動詞（V vs V-ing）與最高級範圍介系詞",
    points: [
      "連綴動詞（起來……：`look, sound, smell, taste, feel`；變得……：`become, get, grow, turn`；保持：`stay, keep`）後接 **`形容詞`** 修飾主詞狀態，接名詞必加 **`like`**（`sounds great` / `sounds like a good idea`）！但小心同一動詞變身為及物動作（如 `look happily at the baby`）時，則改用**副詞 `happily`** 修飾看的動作！",
      "感官動詞（`see, watch, look at, hear, listen to, feel, notice`）＋ 受詞 O ＋ **`原形 V`（強調事實或看完全程）或 `V-ing`（強調當下正在進行中）**，**主動語態絕不可接 `to V`**！"
    ],
    rows: [
      ["連綴（+ adj.）vs 動作（+ adv.）", "Tina `looked angry`（看起來生氣）vs Tina `looked angrily at` me（憤怒地瞪我）", "有介系詞受詞 `at...` 表「注視動作」用副詞；無受詞表「外表神情」用形容詞！"],
      ["感官動詞雙補語", "I heard someone `knock / knocking` on the door.（✕ `to knock`）", "主動接 `V` 或 `V-ing`，都不加 `to`"],
      ["最高級範圍 `in` vs `of`", "the tallest `in` his class / `in` Taiwan vs the tallest `of` the three / `of` all", "`in` 後接「單數地點／團體組織」；`of` 後接「同類群體數量或 all」！"],
      ["原級與倍數比較", "not `as/so` old `as`... / `The harder` you work, `the luckier` you get.", "`The + 比較級..., the + 比較級...`（越……就越……）"]
    ],
    task: "選出正確詞形：① `The soup Mom cooked smells (delicious / deliciously), and my brother tasted it (happy / happily).` ② `Did you see a dog (ran / run / to run) across the street?`",
    answer: "① 第一格 `smells` 為連綴動詞「聞起來」接形容詞 `delicious`；第二格 `tasted it` 為及物動作「品嚐它」用副詞 `happily` 修飾動作！② 感官動詞 `see` 受詞後接原形 `run`（或 `running`），不可接過去式 `ran` 或 `to run`。"
  },
  "english-11": {
    title: "使役動詞（make/have/let vs get/help）、授與動詞介系詞（to/for/of）與完成式進階",
    points: [
      "三大純正使役動詞 **`make（強迫／使）, have（請／叫）, let（讓／允許）` ＋ 受詞 O ＋ `原形 V`**（若受詞是「被修理／被剪」，如 `have my hair cut`，因頭髮是被剪則用過去分詞 `p.p.`！）；對照陷阱：**`ask, tell, want, get` 受詞後必須接 `to V`**（`get him to wash`），`help` 後接 `V` 或 `to V` 皆可！",
      "授與動詞雙受詞倒轉時（`V + 物 + 介系詞 + 人`）：表方向傳遞用 **`to`**（`give, send, show, lend, pass, teach, write, sell`）；表費心代勞購買製作用 **`for`**（`buy, make, cook, get, find, choose`）；表詢問請求用 **`of`**（`ask`）！"
    ],
    rows: [
      ["使役家族動詞形式對決", "Mom `made` me `clean` my room. ＝ Mom `got / asked` me `to clean` my room.", "`make/have/let` 接原形 `V`；`get/ask/tell/want` 必加 `to V`！"],
      ["make + O + adj. / N", "The sad movie `made` everyone `cry`（原形V）/ `made` us `sad`（形容詞）.", "`make` 受詞補語可為原形動詞或形容詞"],
      ["授與動詞代名詞鐵律", "✔ Give `it to me`.（當「物」是代名詞 `it / them` 時，**嚴禁**寫 ✕ `Give me it`！）", "代名詞 `it / them` 永遠只能放動詞後面配介系詞 `to / for 人`！"],
      ["How long 完成式延續動詞", "✕ How long have you `bought` it? → ✔ How long have you `had` it?", "瞬間動詞 `buy, borrow, die, join` 配 `for/since` 持續時須換成狀態 `have, keep, be dead, be in`！"]
    ],
    task: "訂正下列兩句常見段考高頻錯誤：① `These shoes are nice. Can you buy me them?` ② `My grandpa has died for five years.`",
    answer: "① 物為代名詞 `them` 時不可放人後面，且 `buy` 配介系詞 `for`，應改為 `Can you buy them for me?`；② `die` 為瞬間動詞不可持續五年，應改為狀態 `My grandpa has been dead for five years.`（或過去式 `Grandpa died five years ago.`）。"
  },
  "english-12": {
    title: "附加問句特殊陷阱（never/little, Let's, I am）與間接問句「疑問詞 + S + V」直述語序",
    points: [
      "附加問句黃金原則「前肯後否、前否後肯，主詞必化為人稱代名詞」；三大必考陷阱：① 主要子句含 **`never, seldom, hardly, few, little, nothing`** 視為「**否定句**」，後面附加問句必須用**肯定**！② `I am right, **`aren't I`**?`；③ `Let's go, **`shall we`**?` vs 一般祈使句 `Open the door, **`will you`**?`！",
      "間接問句（名詞子句放句中當受詞或主詞）第一鐵律：**拿掉問句倒裝與助動詞 `do/does/did`（肯定句），恢復直述句語序「`wh-疑問詞 / whether / if ＋ 主詞 S ＋ 動詞 V`」**（注意當疑問詞 `who / what` 本身就是該子句主詞時，如 `Tell me what happened`，語序本來就不變）！"
    ],
    rows: [
      ["隱含否定詞附加問句", "He `seldom` eats fast food, `does he`? / There is `little` water, `is there`?", "無 `not` 但有 `seldom / little`，視為前否，後面必用肯定！"],
      ["複合句附加問句看誰", "`I think` she is honest, `isn't she`? vs `You think`..., `don't you`?", "第一人稱 `I think / believe` 看後面附屬子句；其他人稱看前面主句！"],
      ["間接問句去 do/does/did", "Where `does he live`? → Tell me `where he lives`.（記得三單 `-s` 還給動詞！）", "過去式 `Where did she go?` → `where she went`（過去式還給動詞！）"],
      ["whether vs if（是否）", "I don't know `whether / if` it will rain tomorrow.（後接 `or not` 或介系詞後優先用 `whether`）", "表「是否」的不確定未來事件，名詞子句內**照樣用未來式 `will rain`**（與條件副詞子句不同！）"]
    ],
    task: "完成下列兩題轉換：① 加上附加問句：`Ted had little money with him yesterday, ___ ___?` ② 合併為間接問句：`Do you know?` ＋ `When did the train leave?`",
    answer: "① `had` 為過去一般動詞且 `little` 表否定，故後用肯定過去助動詞 `did he`；② 去掉助動詞 `did` 並將 `leave` 還原過去式 `left`，得 `Do you know when the train left?`。"
  },
  "english-13": {
    title: "時間介系詞金字塔（at / on / in / for / during）與空間移動介系詞精準辨析",
    points: [
      "時間介系詞口訣：「**`at` 點鐘、`on` 特定日、`in` 月季年長時段**」——最大陷阱是：雖然早上說 `in the morning`，但只要加上**特定哪一天或形容詞修飾**（如星期日早上、寒冷的冬夜、5月4日下午），一律升級改用 **`on`**（**`on Sunday morning` / `on a cold winter night`**）！且時間前若有 `this, next, last, every`（如 `next Friday`）則**不加任何介系詞**！",
      "空間動態介系詞對比：**`across`** 是從平面表面橫越（過馬路 `walk across the street`、游過河）；**`through`** 是從立體內部空間穿過（穿過隧道／森林／窗戶 `drive through the tunnel`）；**`between`** 在兩者之間，**`among`** 在三者以上群體之中！"
    ],
    rows: [
      ["on 特定日早午晚陷阱", "`in` the morning ➔ `on` Christmas morning / `on` the morning of July 1st", "只要鎖定到「某特定日」的早午晚，一律用 `on`！"],
      ["in vs after + 時間段", "Mom will be back `in` half an hour.（從現在起算半小時後，配未來式）", "`in + 時間長` 配未來式；`for + 時間長` 表持續多久"],
      ["by（不遲於）vs until（直到）", "Hand in the report `by` Friday.（週五前交）vs Wait here `until` 5:00.（一直等到五點）", "瞬間截止期限用 `by`；動作持續到某刻才停用 `until`"],
      ["臺灣方位 in / on / to", "Yilan is `in` the east of Taiwan; Japan is `to` the northeast of Taiwan.", "範圍內用 `in`、接壤毗鄰用 `on`、隔海不接壤範圍外用 `to`"]
    ],
    task: "填入正確介系詞：`The hikers walked ___ the dark forest and arrived at the camp ___ a rainy Friday night.`",
    answer: "第一格「穿過立體森林內部」填 `through`；第二格雖有 `night`（單獨為 `at night`），但因限定為「某個下雨的週五夜晚（特定日之夜）」，必須填 `on`！"
  },
  "english-14": {
    title: "條件／時間副詞子句「現在式代未來式」鐵律 vs 名詞子句未來式對決",
    points: [
      "108 課綱最核心必考文法（Ad-IV-1）：當 **`if（如果）、unless（除非＝if...not）、when、before、after、as soon as（一……就……）、until`** 引導「**未來條件或時間副詞子句**」時，副詞子句內**必須用「現在簡單式」代替未來式**，主要子句才用未來式 `will / can / may` 或祈使句！（例如：`If it rains tomorrow, we will stay home.` 嚴禁寫 `If it will rain`！）",
      "課綱延伸與終極陷阱對比：① 若 `if` 引導的是放在 `know / ask / wonder` 後面解釋為「**是否**」的**名詞子句**，未來事件照樣用 **`will`**（`I don't know if it will rain tomorrow.`）！② 與現在事實相反的假設語氣（`If I were you, I would...`）於國中課綱列為延伸補充。"
    ],
    rows: [
      ["副詞子句（如果）：現在代未來", "`If` Leo `comes`（✕ will come）tonight, please tell him the news.", "`if` 表條件「如果」，時間雖為今晚，動詞必用現在式 `comes`"],
      ["名詞子句（是否）：維持未來式", "I'm not sure `if` Leo `will come` tonight.（我不確定 Leo 今晚『是否會來』）", "`if` 當 `be not sure / wonder / know` 受詞表「是否」，未來就寫 `will come`！"],
      ["unless（＝ if ... not）轉換", "You won't pass `unless` you study hard.（＝ `if` you `don't` study hard）", "`unless` 本身已含否定「除非」，其子句內不可再多加 `not`"],
      ["與事實相反假設（課綱延伸）", "If I `were` a bird, I `could fly` to you.（延伸句型：過去式動詞表現在非真實假設）", "會考重心在「可能發生的真實條件句」，校內段考偶考 `If I were you`"]
    ],
    task: "分辨下列兩句中的 `if` 意思，並填入 `rains` 或 `will rain`：① `We won't go camping if it ___ tomorrow.` ② `Nobody knows if it ___ tomorrow.`",
    answer: "① `if` 表「如果」（條件副詞子句），未來條件用現在簡單式代未來式，填 `rains`；② `if` 當 `knows` 的受詞表「是否」（名詞子句），明天是否下雨照常填未來式 `will rain`！"
  },
  "english-15": {
    title: "關係代名詞主格／受格省略規則、只用 that 特例與介系詞前置鐵律",
    points: [
      "判別關代是「主格」還是「受格」只看關代後面緊接著什麼：後接「**動詞**」＝**主格關代**（人用 `who/that`、物用 `which/that`，**主格關代絕對不可省略**，除非連同 `be` 動詞一起省略變分詞片語如 `the girl [who is] wearing glasses`！）；後接「**主詞 ＋ 動詞**」＝**受格關代**（**受格關代可以直接省略**）！",
      "介系詞搭配與 `that` 禁區：當關係子句尾端的介系詞移到關代正前方時（如 `the house in which he lives` / `the man to whom she spoke`），**介系詞後面只能接 `which`（物）或 `whom`（人），絕對禁止接 `that` 或 `who`，也不可省略**！反之，先行詞若為「人＋物（`the boy and his dog`）」或有最高級、序數、`all/only/no/every` 修飾時，則優先選 `that`！"
    ],
    rows: [
      ["主格關代（不可單獨省略）", "The woman `who / that lives` next door is a doctor.", "後接動詞 `lives`（配合單數先行詞 woman 加 -s），不可省略關代"],
      ["受格關代（可直接省略！）", "The cake `(which / that)` Mom `baked` yesterday was yummy.", "後接 `主詞 Mom ＋ 動詞 baked`，關代當 `baked` 受詞可省略"],
      ["介系詞 + which / whom", "This is the song `to which` I often listen.（✕ `to that`）", "介系詞在句尾時可省關代；介系詞一移到關代前，只能用 `which/whom`！"],
      ["所有格 whose（人／物通用）", "Look at the house `whose roof` is red.（後必緊接無冠詞名詞！）", "`whose + 名詞` 表「……的」，人與動物、無生命事物皆可用 `whose`"]
    ],
    task: "判斷空格可填入哪些關係代名詞（或能否省略）：① `Look at the girl and her cat ___ are sleeping on the sofa.` ② `Is this the brush with ___ you painted the wall?`",
    answer: "① 先行詞同時包含人與動物（`the girl and her cat`）且後接動詞為主格，只能填 `that`（不可省略）；② 前有介系詞 `with` 且先行詞為物 `brush`，只能填 `which`（不可填 `that` 亦不可省略）。"
  },
  "english-16": {
    title: "跨文本多模態圖表轉譯與素養克漏字（時態一致性 × 轉折語篇銜接）",
    points: [
      "會考克漏字（Cloze）兩大命題支柱：① **時態劇本一致性**——先讀首二句定下整篇故事主時間軸（如過去敘事回憶主調為 `V-ed / was V-ing`，唯有直接引號對話 `「……」` 或結尾談現況 `now / since then` 才切換回現在式或現在完成式！）；② **邏輯轉折連接詞**（因果 `because/so/therefore`、轉折讓步 `although/however`、並列遞進 `besides/in addition/what's more`）。",
      "跨文本整合題組（如「通訊軟體群組對話 ＋ 餐廳菜單優惠券 ＋ 公車路線圖」）必先將零散限制條件（幾人同行、幾點抵達、預算上限、誰不吃牛肉）列成核對清單，用刪去法逐一淘汰違反任一條件的選項！"
    ],
    rows: [
      ["although vs but 互斥鐵律", "✔ `Although` he was tired, he kept working.（✕ `Although..., but...`）", "英文一山不容二虎：`because` 不配 `so`，`although/though` 絕不配 `but`（但可配副詞 `yet / still`）！"],
      ["besides vs except（除了）", "`Besides` English, she speaks French.（包含：除英語外還說法語）vs `Everyone except` Tom came.（排除：只有 Tom 沒來）", "`besides` 是加法（＋）；`except` 是減法（−）！"],
      ["used to V vs be used to V-ing", "I `used to stay` up late（過去曾習慣熬夜，現已不）vs `am used to getting` up early（現在習慣於早起）", "`be / get used to` 的 `to` 是介系詞，後必接名詞或 **`V-ing`**！"],
      ["多圖表交叉核對 SOP", "人物對話抓需求 ➔ 對照地圖／時刻表篩時間 ➔ 對照價目表算折扣", "小心 `Buy 2 get 1 free`（買二送一＝拿 3 件付 2 件錢）與 `20% off`（打八折，付 80%！）"]
    ],
    task: "計算與文法雙檢核：① 店內標示 `All jackets: $1,000 each. Buy a second one at 30% off!` 買兩件外套共付多少元？② 選正確形式：`Grandpa is used to (take / taking) a walk after dinner.`",
    answer: "① `30% off` 代表折掉 30%（即打七折 `70%`），第一件 1,000 元＋第二件 `1,000 × 0.7 ＝ 700` 元，共付 `1,700` 元！② 前有 `is`，`be used to` 表「習慣於……」，`to` 為介系詞後接動名詞 `taking`。"
  }
};
