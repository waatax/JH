# scripts/build_exegesis.py
# Generates dist/exegesis-data.js with Junyi Academy style deep exegesis study materials
# for all 188 curriculum units across all 8 domains.

import json
import os
import re

with open('scripts/units_dump.json', 'r', encoding='utf-8') as f:
    units = json.load(f)

print(f"Loaded {len(units)} units")

# Domain specific knowledge bases and templates
def build_exegesis_for_unit(u):
    uid = u['id']
    subj = u['subject']
    title = u['title']
    concept = u['concept']
    example = u['example']
    pitfall = u['pitfall']
    task = u['task']
    grade = u['grade']
    term = u['term']

    # Customize by subject and unit title
    # Math
    if subj == 'math':
        origin_problem = f"在數值計算與幾何測量中，單純的正整數無法滿足生活中的相反方位、虧損負債、微觀極小量或抽象未知量之精確建模需求。"
        origin_anchor = f"日常生活中的氣溫升降（如零下低溫）、銀行帳戶收支餘額、路程往返方向與地圖坐標網格定位。"
        origin_spark = f"古印度與中國《九章算術》以赤籌黑籌表正負；笛卡爾藉由觀察天花板蒼蠅爬行建立坐標系，將代數與幾何融為一體。"
        
        def1_term = "核心數學模型"
        def1_meaning = f"本課「{title}」將現實數量關係抽象化為嚴謹之代數表達式或幾何空間定理，使未知量可經由等量變換求解。"
        def1_cond = "運算時注意定義域限制（如分母不可為 0、根號內非負、絕對值為非負數）。"

        def2_term = "運算規則與變換"
        def2_meaning = f"等量公理、移項法則或定理性質（如：{concept.split('。')[0]}），保證推導過程每一步均為充要變換。"
        def2_cond = "去括號變號規則、不等式同乘負數方向相反、開平方根必須考慮正負兩解。"

        step1_lead = f"審題定位未知數與基準點"
        step1_expr = f"設基準原點 O 為 0，欲求量為 x (單位依題意)"
        step1_exp = f"細讀題幹條件，將日常語言轉譯為數學符號，確認已知條件與求解目標。"

        step2_lead = f"依定理或數量關係列式化簡"
        step2_expr = f"根據「{title}」之核心公式建立等式或不等式"
        step2_exp = f"落實移項、通分或因式分解，保持等號兩端平衡，嚴禁跳步造成計算失誤。"

        step3_lead = f"求解驗證與合理性邊界檢查"
        step3_expr = f"解得 x 之值，回代原式檢驗"
        step3_exp = f"確認答案符合真實情境物理意義（如人數、邊長必須為正數，機率介於 0 與 1 之間）。"

        takeaway = f"【破題核心定理】{concept.split('。')[0]}。幾何看對稱，代數看平衡，運算落實驗算防呆！"

        l1_crit = f"能辨識「{title}」的基本定義，用白話向他人舉例說明其生活應用。"
        l2_crit = f"熟練掌握標準計算步驟與符號運算，能獨立完成 2 題課堂驗收測驗。"
        l3_crit = f"看穿會考生活情境長題題眼，能將長文轉化為數學模型，避開命題盲點。"

        trigger = f"題幹出現「相差、比值、增減、最大/最小、坐標、垂直、平行」等核心詞時。"
        trap = f"最容易忽視符號變號、單位不一致或分母為零的例外條件（{pitfall.split('。')[0]}）。"
        check = "① 檢查正負號與括號；② 檢查單位是否換算；③ 檢查答案是否符合題意合理性。"

    # Physics
    elif subj == 'physics':
        origin_problem = f"物理學旨在探究自然界的運行規律，從天體運行到微觀粒子，尋求以客觀數據與數學定律描述物質運動與能量轉化。"
        origin_anchor = f"行車煞車的慣性、槓桿省力原理、聲音在空氣與水中的傳播、光在水杯中的折射倒影。"
        origin_spark = f"伽利略自斜面滾球實驗推翻亞里斯多德慣性概念；牛頓坐在蘋果樹下思考月球為何繞地運行，開創經典力學。"
        
        def1_term = "物理量與單位"
        def1_meaning = f"「{title}」定義之物理量具有嚴謹國際標準單位（SI制），兼具大小（標量）或大小與方向（向量）。"
        def1_cond = "各物理量代入公式前，必須統一換算為一致單位（如 m, s, kg, N, J, W）。"

        def2_term = "支配定律與守恆原理"
        def2_meaning = f"遵循本質物理機制：{concept.split('。')[0]}，在孤立系統中能量與質量守恆。"
        def2_cond = "注意環境條件假設（如忽略摩擦阻力、彈性碰撞、均勻重力場或理想氣體）。"

        step1_lead = "受力分析與物理狀態辨析"
        step1_expr = "繪製受力圖 (Free Body Diagram) 或光路/電路圖"
        step1_exp = "標示接觸力（彈力、摩擦力、浮力）與超距力（重力、磁力、靜電力），建立坐標系。"

        step2_lead = "列出支配方程式 (定律建模)"
        step2_expr = f"應用核心物理公式進行推導建立等式"
        step2_exp = "將已知物理量代入公式，利用因次分析 (Dimensional Analysis) 檢驗方程式合理性。"

        step3_lead = "求解與因果合理性反思"
        step3_expr = "計算物理量數值，並確認方向與單位"
        step3_exp = "確認數值符合真實物理常識（如速度不可超過光速、效率不可大於 100%）。"

        takeaway = f"【物理核心守則】{concept.split('。')[0]}。先畫圖看狀態，再列式查守恆，單位統一不漏看！"

        l1_crit = f"能以白話直覺說出「{title}」的現象本質，辨識生活中常見範例。"
        l2_crit = f"能準確繪製受力圖、光路圖或電路圖，並應用公式完成定量計算。"
        l3_crit = f"能分析實驗變因圖表與大考綜合素養題，看穿題眼得出結論。"

        trigger = "出現「平衡、等速、加速度、折射、熱平衡、串並聯、功與能量」等關鍵字。"
        trap = f"混淆標量與向量方向、或忽略接觸面摩擦力與外在阻力影響（{pitfall.split('。')[0]}）。"
        check = "① 繪製受力/電路草圖；② 確認單位是否統一；③ 檢視極端邊界值合理性。"

    # Chemistry
    elif subj == 'chemistry':
        origin_problem = f"探究世間萬物的微觀組成與質能變化規律，解開物質如何由原子分子經由化學鍵斷裂重組生成新物質。"
        origin_anchor = f"鐵生鏽氧化、烘焙小蘇打發泡、胃酸過多胃乳中和、暖暖包發熱反應、日常肥皂去污乳化。"
        origin_spark = f"拉瓦節以天平密閉加熱燃燒實驗推翻燃素說，確立質量守恆定律；門得列夫依原子量與化學性質排出週期表。"
        
        def1_term = "微觀粒子與化學式"
        def1_meaning = f"物質由原子、離子或分子構成；化學式表示物質所含元素的種類與原子個數比例。"
        def1_cond = "化合物化學式中各元素化合價代數和為零；金屬元素符號寫在左邊，非金屬寫在右邊。"

        def2_term = "化學反應與計量"
        def2_meaning = f"化學反應遵守原子不滅與質量守恆定律：{concept.split('。')[0]}。"
        def2_cond = "化學反應式必須嚴格平衡係數；計算時必須以莫耳數 (mol) 作為微觀與巨觀之橋樑。"

        step1_lead = "判斷反應類型與反應物產物"
        step1_expr = "書寫正確之化學式與離子符號"
        step1_exp = "確認反應物與生成物質，辨析是物理變化（狀態改變）還是化學變化（生成新物質）。"

        step2_lead = "平衡反應方程式與莫耳計量"
        step2_expr = "觀察法平衡化學反應式係數比＝莫耳數比"
        step2_exp = "檢查等號兩端各元素原子總數完全相等，找出限量試劑 (Limiting Reagent)。"

        step3_lead = "計算物質質量與濃度關係"
        step3_expr = "莫耳數 n ＝ 質量 m ÷ 分子量 M"
        step3_exp = "由莫耳數換算質量、體積或溶液濃度，檢查有效位數與單位。"

        takeaway = f"【化學黃金定律】{concept.split('。')[0]}。原子不滅質量守恆，反應前後莫耳橋樑牽！"

        l1_crit = f"能辨別「{title}」涉及的物質種類與現象，區分物理與化學特徵。"
        l2_crit = f"能正確書寫化學反應式並平衡係數，進行莫耳數與質量換算。"
        l3_crit = f"能看懂會考實驗步驟圖與濃度/速率變化曲線圖，準確判斷產物與反應終點。"

        trigger = "出現「沈澱、氣體產生、變色、pH值、滴定、平衡移動、莫耳數、催化劑」時。"
        trap = f"忽略係數比是莫耳數比而非質量比，或混淆電解質解離離子數（{pitfall.split('。')[0]}）。"
        check = "① 檢查原子數是否平衡；② 檢查質量比與莫耳比是否混淆；③ 確認溶液中離子電荷是否守恆。"

    # Biology
    elif subj == 'biology':
        origin_problem = f"探索生命現象的起源、微觀構造與繁衍調控機制，理解個體如何維持內部恆定並適應環境。"
        origin_anchor = f"運動後心跳加速與流汗散熱、吃飽後血糖調節、植物向光彎曲、顯微鏡下的細胞結構動態。"
        origin_spark = f"虎克在顯微鏡下觀察軟木塞發現細胞小室；孟德爾在修道院花園中培育豌豆，發現遺傳因子分離規律。"
        
        def1_term = "構造與功能相適應"
        def1_meaning = f"生物體各層次構造（細胞、組織、器官、系統）與其所承擔之生理功能高度配合：{concept.split('。')[0]}。"
        def1_cond = "各器官之生理功能需在適宜溫度與pH環境下進行（如酵素活性受受質與溫度影響）。"

        def2_term = "恆定性與負回饋調節"
        def2_meaning = "生物體經由神經系統與內分泌系統協同調控，將體內環境（體溫、血糖、水分、血壓）維持在動態平衡。"
        def2_cond = "受器感知刺激，經中樞整合後由動器做出反應；負回饋機制在生理量偏離正常值時啟動反向調節。"

        step1_lead = "辨認生理構造與所屬系統層級"
        step1_expr = "細胞 → 組織 → 器官 → 器官系統 → 個體"
        step1_exp = "明確所探討的構造位置、微觀型態與其對應之專一性生理作用。"

        step2_lead = "追蹤物質路徑或神經/荷爾蒙傳導鏈"
        step2_expr = "刺激 → 受器 → 感覺神經 → 中樞 → 運動神經 → 動器"
        step2_exp = "梳理物質流向（如循環路徑、消化道）或資訊傳遞路徑，區分自主神經與意識反應。"

        step3_lead = "分析調節機制與實驗對照控制"
        step3_expr = "實驗組與對照組僅保留單一操縱變因"
        step3_exp = "評估各變因對生長、代謝或遺傳表現型的影響，得出科學結論。"

        takeaway = f"【生命科學真理】{concept.split('。')[0]}。構造配合功能，神經內分泌協同維持動態平衡！"

        l1_crit = f"能辨識「{title}」涉及的核心構造與功能，說出生理調節基本流程。"
        l2_crit = f"能解讀生物循環路徑圖、遺傳棋盤方格或生理數據曲線圖表。"
        l3_crit = f"能分析會考長篇探究情境題，辨識實驗設計之操縱變因與控制變因。"

        trigger = "出現「酵素、消化液、心房心室、呼吸、內分泌、孟德爾遺傳、光合作用」時。"
        trap = f"混淆感覺神經與運動神經傳導方向、或混淆體循環與肺循環動脈靜脈（{pitfall.split('。')[0]}）。"
        check = "① 檢查傳遞方向（如動脈離心、靜脈回心）；② 檢查顯微鏡倒像左右上下顛倒；③ 檢查遺傳機率分子分母。"

    # Earth Science
    elif subj == 'earth':
        origin_problem = f"解開地球圈層（岩石圈、大氣圈、水圈、生物圈）與宇宙天體的時空演變奧秘，理解自然環境變遷與災害成因。"
        origin_anchor = f"臺灣頻繁的有感地震、午後雷陣雨與颱風路徑、農曆初一十五的月相潮汐、夏至太陽高懸與冬至日落。"
        origin_spark = f"魏格納觀察大西洋兩岸海岸線吻合提出大陸漂移；克卜勒歸納行星運動定律，揭開天體運行的秩序。"
        
        def1_term = "地球系統與板塊動力"
        def1_meaning = f"地球內部熱對流驅動板塊運動：{concept.split('。')[0]}，造成造山運動、火山與地震。"
        def1_cond = "辨析聚合型、張裂型與錯動型板塊交界之應力狀態與代表性地質景觀。"

        def2_term = "大氣、海洋與天體時空相對位置"
        def2_meaning = "地球自轉與公轉造成晝夜交替與四季變更；月球繞地公轉決定月相盈虧與引潮力高低潮。"
        def2_cond = "觀察方向與視角限制（北極上空俯視為逆時針方向自轉與公轉；面向南方仰望天空東昇西落）。"

        step1_lead = "確立時空坐標與視角方位"
        step1_expr = "確認經緯度、海拔高度、觀測日期與地球/太陽/月球相對幾何位置"
        step1_exp = "明確觀測者所在半球（北半球向南看太陽在南方天空）與自轉公轉方向。"

        step2_lead = "分析系統交互作用機制"
        step2_expr = "力學平衡、熱量傳遞或波形傳播分析"
        step2_exp = "剖析鋒面系統的冷暖空氣交會、地震波P波S波到達時差、或海洋湧升流成因。"

        step3_lead = "推導地表特徵與預報結論"
        step3_expr = "對照地質剖面圖或等壓線天氣圖做出科學研判"
        step3_exp = "檢核結論是否符合板塊構造學說或大氣環流規律，提出防災應對措施。"

        takeaway = f"【地學宇宙觀】{concept.split('。')[0]}。大氣水圈循環不息，板塊天體相對幾何定乾坤！"

        l1_crit = f"能說出「{title}」所描述的地球或天文現象成因與生活關聯。"
        l2_crit = f"能準確判讀地質地層剖面圖、地面天氣圖鋒面符號與日地月中天位置。"
        l3_crit = f"能結合會考地球科學素養題圖表，推導潮汐高度、日照仰角或震央距離。"

        trigger = "出現「板塊交界、震央、高氣壓低氣壓、冷鋒暖鋒、滿月新月、大潮小潮、自轉公轉」時。"
        trap = f"混淆震度（地表搖晃程度）與規模（釋放總能量），或混淆月相升落時間（{pitfall.split('。')[0]}）。"
        check = "① 確認觀測者仰望方位；② 確認冷空氣在下、暖空氣在上；③ 確認地震規模不加單位、震度才有級數。"

    # History
    elif subj == 'history':
        origin_problem = f"歷史學藉由多元史料考證與時空架構重建，探尋人類社會制度、文化思想與政治權力的演變軌跡。"
        origin_anchor = f"當前社會民主憲政的由來、多元族群語言在臺灣的交融、傳統節慶習俗的歷史淵源、古蹟遺址的歷史記憶。"
        origin_spark = f"司馬遷著《史記》究天人之際通古今之變；西方史學之父希羅多德記述希波戰爭，探索事件背後的因果因緣。"
        
        def1_term = "史料種類與考證批判"
        def1_meaning = f"區分第一手史料（原始檔案、遺物、當時日記）與第二手史料（後人研究編著）；辨別作者立場與歷史語境。"
        def1_cond = "孤證不立，需透過多重視角史料交互比對，還原歷史真相。"

        def2_term = "歷史時序與因果關聯"
        def2_meaning = f"事件之爆發均有其時代背景與長程結構：{concept.split('。')[0]}。"
        def2_cond = "避免以今非古（時代錯置），必須將歷史人物與決策置於當年的時空條件中理解。"

        step1_lead = "定位時空座標與時代背景"
        step1_expr = "時間（朝代/年代）＋ 空間（地理疆域/政權範圍）＋ 核心人物"
        step1_exp = "確認事件發生所處的國際局勢或國內政治經濟社會結構。"

        step2_lead = "剖析事件導火線與內在驅動力"
        step2_expr = "經濟利益 ＋ 權力爭奪 ＋ 思想啟蒙 ＋ 外部衝突"
        step2_exp = "探究重大變革或衝突爆發的直接導火線與深層制度性原因。"

        step3_lead = "評估歷史影響與現代意義"
        step3_expr = "制度創新 ＋ 社會變遷 ＋ 思想流變"
        step3_exp = "客觀評析該事件對後世體制與人民生活的深遠影響，提煉歷史智慧。"

        takeaway = f"【史家智慧】{concept.split('。')[0]}。以史為鑑明得失，考證史料辨立場，時空脈絡知興衰！"

        l1_crit = f"能簡述「{title}」的核心事件人物與時間先後順序。"
        l2_crit = f"能分析文字史料或地圖圖表，指出政策或條約背後的利害關係。"
        l3_crit = f"能綜觀跨時代制度變遷（如土地制度、官制、貿易政策），解析會考素養題組。"

        trigger = "出現「條約、變法、改革、起義、開港、戒嚴、啟蒙、工業革命」等詞。"
        trap = f"倒置因果關係、或混淆不同條約割讓與賠款內容（{pitfall.split('。')[0]}）。"
        check = "① 檢查年代先後順序；② 檢查締約國與開放港口；③ 檢查改革失敗或成功的核心原因。"

    # Geography
    elif subj == 'geography':
        origin_problem = f"地理學探究「人地互動關係」與空間分佈規律，解析自然環境如何形塑人類聚落生活，人類活動又如何改造地表環境。"
        origin_anchor = f"臺灣南北雨量分布差異、高科技科學園區的區位選址、各國因氣候風土形成之飲食文化特色、交通動線與房價。"
        origin_spark = f"洪堡德遠赴美洲考察創立自然地理學；現代地理資訊系統 (GIS) 疊圖分析整合多源空間大數據。"
        
        def1_term = "地理空間要素與坐標"
        def1_meaning = f"地表位置以經緯度坐標、相對位置或等高線地形圖界定：{concept.split('。')[0]}。"
        def1_cond = "地圖三大要素不可或缺：圖名、方向標、圖例與比例尺；大比例尺看局部詳情，小比例尺看大範圍。"

        def2_term = "自然環境與人文區位"
        def2_meaning = "地形、氣候（氣溫、降水）、水文構成自然骨架；人口、產業、聚落、交通構成人文網絡。"
        def2_cond = "各區位因子（原料、動力、勞力、市場、政策）隨技術進步與全球化動態權衡。"

        step1_lead = "解讀空間地圖與圖表數據"
        step1_expr = "圖例判讀 ＋ 等高線/等溫線/降水柱狀圖分析"
        step1_exp = "先讀圖名與坐標範圍，辨析地形高低起伏與氣候類型（熱帶、溫帶、寒帶、季風、地中海型等）。"

        step2_lead = "分析人地互動因果鏈條"
        step2_expr = "自然條件（限制/優勢） → 農業/工業選址 → 聚落交通格局"
        step2_exp = "探討人類如何因應自然環境條件發展特定經濟活動（如梯田水利、港口貿易）。"

        step3_lead = "綜合區域特色與全球環境議題"
        step3_expr = "區域整合 ＋ 永續發展策略"
        step3_exp = "評估都市化擴張、水資源分配、環境衝擊與跨國區域分工合作之道。"

        takeaway = f"【地理空間眼】{concept.split('。')[0]}。圖名圖例看空間，自然人文相交互，因地制宜謀永續！"

        l1_crit = f"能辨析「{title}」所涵蓋的地理區域特色與核心地貌環境。"
        l2_crit = f"能精準判讀等高線地形圖、氣候圖與人口金字塔圖表。"
        l3_crit = f"能以人地關係視角分析會考跨科地理題組，指出區域發展策略。"

        trigger = "出現「比例尺、等高線、季風、雨影效應、集約農業、都市化、板塊、流域」時。"
        trap = f"混淆迎風坡降雨與背風坡焚風、或混淆大比例尺與小比例尺範圍（{pitfall.split('。')[0]}）。"
        check = "① 檢查比例尺分母大小；② 檢查河流流向（高處往低處）；③ 檢查氣候圖氣溫降水配合特徵。"

    # Civics
    elif subj == 'civics':
        origin_problem = f"公民學探討個人與社會群體、民主法治制度及市場經濟的互動規範，培養公民素養與理性決策能力。"
        origin_anchor = f"班級幹部投票自治、消費者退換貨權利與民法契約、立法院制定法律與質詢、超市商品價格隨供需浮動。"
        origin_spark = f"洛克提出天賦人權與社會契約論；孟德斯鳩倡導三權分立制衡；亞當斯密提出「看不見的手」市場機制。"
        
        def1_term = "權利保障與法治原則"
        def1_meaning = f"憲法保障人民基本權利（自由權、平等權、參政權、受益權）：{concept.split('。')[0]}。"
        def1_cond = "政府公權力行使必須符合法律保留原則與比例原則（目的正當、手段必要、限制合度）。"

        def2_term = "民主政治與經濟思維"
        def2_meaning = "五院職權分立制衡，各司其職；經濟學強調機會成本、比較利益法則與市場供求均衡。"
        def2_cond = "民法重私法自治、刑法重罪刑法定與保護無辜；市場失靈時需政府適度介入矯正外部效果。"

        step1_lead = "界定核心概念所屬範疇與法規層級"
        step1_expr = "確認所屬領域：社會群體 / 政治民主 / 法律體系 / 經濟市場"
        step1_exp = "判斷法律位階（憲法 ＞ 法律 ＞ 命令），明確權利主體與公權力機關職責。"

        step2_lead = "梳理各主體之權利義務與權力制衡"
        step2_expr = "立法、行政、司法、考試、監察權限劃分與互為制衡"
        step2_exp = "在經濟題型中，計算機會成本＝外顯成本 ＋ 隱含成本（放棄的最高價值）；畫出供給需求曲線。"

        step3_lead = "評估法律救濟途徑或公共政策效益"
        step3_expr = "權利受損 → 和解/調解/仲裁/訴訟 → 行政救濟（訴願/行政訴訟）"
        step3_exp = "檢視公民參與途徑與公共政策之公平性與效率，提出建設性公民行動方案。"

        takeaway = f"【公民素養基石】{concept.split('。')[0]}。權利法治有邊界，五院分立互制衡，市場理性衡成本！"

        l1_crit = f"能清楚說明「{title}」涉及的公民概念、權利義務或市場名詞。"
        l2_crit = f"能精準辨析五院職權分工、法律位階或計算機會成本與比較利益。"
        l3_crit = f"能剖析會考社會公民時事題組，準確適用法律條文與經濟學原理。"

        trigger = "出現「比例原則、五院、民法、刑法、行政處分、訴願、機會成本、外部效果」時。"
        trap = f"混淆立法院質詢對象與監察院彈劾對象、或混淆絕對利益與比較利益（{pitfall.split('。')[0]}）。"
        check = "① 檢查權力機關是否具管轄權；② 檢查訴訟程序是民事、刑事還是行政；③ 檢查機會成本是否取最高值。"

    # Chinese
    elif subj == 'chinese':
        origin_problem = f"語文為思維的工具與文化的載體，旨在掌握字詞句篇之精確表達、文言與白話文本之深層意涵與審美境界。"
        origin_anchor = f"日常對話中弦外之音的領會、閱讀新聞社論的論點提煉、文學名篇中借景抒情的共鳴、寫作時的立意結構。"
        origin_spark = f"倉頡造字夜雨粟；《文心雕龍》劉勰論文章之體制風骨；司馬遷《史記》善於在人物白描與對話中傳達神髓。"
        
        def1_term = "字詞義理與六書造字"
        def1_meaning = f"漢字兼具形音義三要素：{concept.split('。')[0]}；六書分為造字之法（象形、指事、會意、形聲）與用字之法（轉注、假借）。"
        def1_cond = "同一個詞在不同語境中詞性與意涵常有引申與轉變（詞類活用、一詞多義）。"

        def2_term = "篇章結構與修辭風格"
        def2_meaning = "句型包括判斷句、敘事句、有無句、表態句；修辭手法（譬喻、轉化、映襯、排比、倒裝）強化情感表達力。"
        def2_cond = "文言倒裝句（賓語前置）需尋求核心動詞；文言虛詞（之、乎、者、也、以、其）需依上下文靈活定解。"

        step1_lead = "審讀語境標記關鍵字詞與句型"
        step1_expr = "圈點主詞、動詞與虛詞，辨析詞性與語法結構"
        step1_exp = "文言文先斷句釋義，確認詞性活用（如名詞作動詞）；白話文先抓段落首尾關鍵句。"

        step2_lead = "理清篇章脈絡與作者論證思維"
        step2_expr = "起承轉合 ＋ 意象拆解 ＋ 借物言志 / 借景抒情"
        step2_exp = "探究作者選取特定材料或意象的深層寓意，區分客觀事實 (Fact) 與主觀觀點 (Opinion)。"

        step3_lead = "提煉主旨文心與文藝賞析"
        step3_expr = "扣緊篇章文眼，總結全篇核心思想"
        step3_exp = "結合生活情境反思文本的人生哲理，領略中華文化詞章義理之美。"

        takeaway = f"【文心雕龍】{concept.split('。')[0]}。因字解詞依語境，文脈推展見文眼，立意深刻傳神思！"

        l1_crit = f"能正確理解「{title}」所涉及之字詞形音義與基本修辭句型。"
        l2_crit = f"能精準梳理文言文譯文與白話散文之論證結構，說明作者用意。"
        l3_crit = f"能速讀會考長文閱讀題組，看穿干擾選項，鎖定題眼正確破題。"

        trigger = "出現「文意、詞性活用、修辭、文眼、寫作手法、主旨、詩意」時。"
        trap = f"望文生義字面誤解、忽略語境反諷或倒裝省筆（{pitfall.split('。')[0]}）。"
        check = "① 檢查動詞受詞搭配；② 檢查修辭喻體喻詞本體；③ 檢查主旨是否以偏概全。"

    # English
    elif subj == 'english':
        origin_problem = f"英語作為全球共通語 (Lingua Franca)，旨在掌握句型語法骨架、精確語篇時態與多元跨文化文本之閱讀溝通能力。"
        origin_anchor = f"與外籍朋友線上交流、閱讀國際英文新聞與科技說明書、觀賞英語電影與英美影集之對白情境。"
        origin_spark = f"莎士比亞豐富了現代英語的成語與詞彙庫；牛津英語字典歷時數十年編纂，記錄語言演變之生生不息。"
        
        def1_term = "句子核心骨架 (SVO Structure)"
        def1_meaning = f"英語句子以五大基本句型為骨架：{concept.split('。')[0]}；主詞與動詞必須在人稱與單複數上保持一致 (Subject-Verb Agreement)。"
        def1_cond = "一個簡單句只能有一個主要動詞；連接詞連接兩個獨立子句，不可隨意逗號串接 (Comma Splice)。"

        def2_term = "時態語態與子句修飾"
        def2_meaning = "十二時態精準標記時間點與動作狀態（完成、進行）；關係子句與名詞子句擴展資訊承載量。"
        def2_cond = "被動語態 (be + p.p.) 需確認主詞是否為動作承受者；假設語氣需倒退一個時態表達非真實願望。"

        step1_lead = "識別主詞與主要動詞結構"
        step1_expr = "Subject (主詞) ＋ Verb (動詞) ＋ Object/Complement"
        step1_exp = "劃除介系詞片語等修飾成分，抓住核心主幹，確認單複數一致性。"

        step2_lead = "依時間副詞或語境線索判定時態語態"
        step2_expr = "Yesterday (過去) / Now (進行) / Since then (完成式 have/has + p.p.)"
        step2_exp = "尋找語境中的時間座標錨點，確認主動或被動關係，檢視助動詞搭配。"

        step3_lead = "語篇閱讀：掌握主旨與推論題眼"
        step3_expr = "Skimming (略讀主旨) ＋ Scanning (掃讀細節) ＋ Inference (上下文推論)"
        step3_exp = "利用 Context Clues（同義字、轉折詞 However/Although）推敲生字詞義，鎖定題幹核心。"

        takeaway = f"【Grammar & Reading Mastery】{concept.split('。')[0]}。主幹抓主動，時態看錨點，上下文語境見真意！"

        l1_crit = f"能辨別「{title}」之核心文法規則，正確造出合乎語法之簡單句。"
        l2_crit = f"能靈活運用時態變換、被動語態或複合子句，完成語法填空。"
        l3_crit = f"能迅速解答會考英語閱讀測驗之圖表題、主旨題與推論題。"

        trigger = "出現「if, although, since, because, which, who, that, passive voice」時。"
        trap = f"忘記第三人稱單數動詞加 s/es、或將被動語態寫成主動語態（{pitfall.split('。')[0]}）。"
        check = "① 檢查主詞單複數動詞一致；② 檢查時態是否有前後矛盾；③ 檢查代名詞指涉對象。"

    # Arts, Tech, Health, PE, Integrative, Local
    else:
        origin_problem = f"培養全人素養、美感體驗、數位運算與身心健康技能，將知識落地為解決生活真實問題之實踐能力。"
        origin_anchor = f"日常生活空間的美學設計、數位程式工具的邏輯自動化、運動傷害預防與健康飲食選擇、社區文化探索。"
        origin_spark = f"達文西融通藝術與解剖學機械學；包浩斯運動提倡藝術與科技的完美結合，強調形式隨機能而生。"
        
        def1_term = "領域核心素養與實踐原則"
        def1_meaning = f"本主題「{title}」聚焦於做中學：{concept.split('。')[0]}，強調動手操作、創思與多元反思。"
        def1_cond = "落實安全規範（如實驗防護、運動防護、網路隱私保護與倫理規範）。"

        def2_term = "美感、邏輯或體育技能構念"
        def2_meaning = "透過結構化步驟掌握核心技藝，結合批判性思維與團隊協作，展現多元表達能力。"
        def2_cond = "重視過程評量與同儕互評，在回饋中不斷迭代優化作品或行動方案。"

        step1_lead = "界定問題情境與審美/實作目標"
        step1_expr = "釐清使用者需求、藝術主題或運動目標"
        step1_exp = "明確所欲探究之生活情境，收集必要素材與安全設備。"

        step2_lead = "規劃執行策略與結構化流程"
        step2_expr = "草圖設計 / 演算法虛擬碼 / 動作技巧分解"
        step2_exp = "分步驟推進操作，落實核心技巧與方法論，適時調整參數。"

        step3_lead = "展示成果、檢驗成效與反思精進"
        step3_expr = "成果驗收 ＋ 同儕回饋 ＋ 行動迭代"
        step3_exp = "以具體指標或作品評估表現，提煉跨學科遷移之綜合素養能力。"

        takeaway = f"【知行合一實踐力】{concept.split('。')[0]}。思維動手並重，美感安全兼備，反思迭代成專才！"

        l1_crit = f"能辨識「{title}」所規範的基本觀念與安全原則。"
        l2_crit = f"能獨立完成指定之實作任務、運算步驟或動作流程。"
        l3_crit = f"能針對真實生活情境提出創新改善方案，展現跨領域綜合素養。"

        trigger = "面對真實生活情境設計、藝術鑑賞、科技自動化或身心健康抉擇時。"
        trap = f"忽視操作安全防護、或缺乏結構化流程草率行動（{pitfall.split('。')[0]}）。"
        check = "① 檢查安全標準；② 檢查流程完整性；③ 檢查作品是否達成預期目標。"

    return {
        "genesis": {
            "problemToSolve": origin_problem,
            "realWorldAnchor": origin_anchor,
            "historicalSpark": origin_spark
        },
        "definitions": [
            {
                "term": def1_term,
                "meaning": def1_meaning,
                "condition": def1_cond
            },
            {
                "term": def2_term,
                "meaning": def2_meaning,
                "condition": def2_cond
            }
        ],
        "blackboard": {
            "title": f"【{subj.upper()}】{title} · 核心原理解析與板書推導",
            "chalkboardTheme": "green",
            "heuristicSteps": [
                {
                    "stepNumber": 1,
                    "lead": step1_lead,
                    "mathExpression": step1_expr,
                    "explanation": step1_exp
                },
                {
                    "stepNumber": 2,
                    "lead": step2_lead,
                    "mathExpression": step2_expr,
                    "explanation": step2_exp
                },
                {
                    "stepNumber": 3,
                    "lead": step3_lead,
                    "mathExpression": step3_expr,
                    "explanation": step3_exp
                }
            ],
            "coreTakeawayFormula": takeaway
        },
        "masteryLevels": {
            "level1": { "title": "直覺概念層 (Intuitive)", "criteria": l1_crit },
            "level2": { "title": "運算推導層 (Procedural)", "criteria": l2_crit },
            "level3": { "title": "題眼素養層 (Transfer & Exam)", "criteria": l3_crit }
        },
        "examEye": {
            "triggerClue": trigger,
            "pitfallTrap": trap,
            "defenseCheck": check
        }
    }

# Build full dictionary
exegesis_dict = {}
for u in units:
    exegesis_dict[u['id']] = build_exegesis_for_unit(u)

print(f"Generated exegesis for all {len(exegesis_dict)} units.")

# Render function in JS
js_content = f"""// dist/exegesis-data.js
// 均一教育平台風格：臺灣 108 課綱國中全科 188 個單元深度研經講義與核心板書
// 包含概念溯源、符號嚴謹定義、黑板推導板書、三階微技能規準與考場題眼雷達

export const exegesisData = {json.dumps(exegesis_dict, ensure_ascii=False, indent=2)};

export function getExegesis(unitId) {{
  return exegesisData[unitId] || null;
}}

function escapeHtml(str) {{
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}}

export function renderExegesisBoard(u) {{
  const ex = exegesisData[u.id];
  if (!ex) return '';

  const gen = ex.genesis;
  const defs = ex.definitions;
  const bb = ex.blackboard;
  const ml = ex.masteryLevels;
  const ee = ex.examEye;

  return `
    <section class="lesson-step exegesis-study-section" id="step-exegesis" aria-labelledby="exegesis-title">
      <div class="step-label">EXEGESIS &amp; CHALKBOARD LECTURE / 均一研經深度講義與核心板書</div>
      
      <div class="exegesis-origin-card">
        <div class="exegesis-card-header">
          <span class="exegesis-header-icon">🌱</span>
          <div>
            <strong id="exegesis-title">概念溯源與生活直覺錨定</strong>
            <p class="subtle">探究知識本質起源 · 擺脫死背公理</p>
          </div>
        </div>
        <div class="exegesis-origin-body">
          <div class="origin-item">
            <span class="origin-label">💡 解決的核心矛盾：</span>
            <p>${{escapeHtml(gen.problemToSolve)}}</p>
          </div>
          <div class="origin-item">
            <span class="origin-label">🌍 生活場景錨定：</span>
            <p>${{escapeHtml(gen.realWorldAnchor)}}</p>
          </div>
          <div class="origin-item">
            <span class="origin-label">📜 歷史思想火花：</span>
            <p>${{escapeHtml(gen.historicalSpark)}}</p>
          </div>
        </div>
      </div>

      <div class="exegesis-definitions-card">
        <div class="exegesis-card-header">
          <span class="exegesis-header-icon">📐</span>
          <div>
            <strong>嚴謹定義與符號邊界解構</strong>
            <p class="subtle">掌握學術代數/物理/幾何符號意義與邊界限制</p>
          </div>
        </div>
        <div class="exegesis-def-grid">
          ${{defs.map(d => `
            <div class="exegesis-def-item">
              <div class="def-term-row">
                <span class="def-term-badge">${{escapeHtml(d.term)}}</span>
              </div>
              <p class="def-meaning"><strong>本質意涵：</strong>${{escapeHtml(d.meaning)}}</p>
              <div class="def-condition-box"><strong>🛡️ 成立邊界：</strong>${{escapeHtml(d.condition)}}</div>
            </div>
          `).join('')}}
        </div>
      </div>

      <div class="exegesis-blackboard-card">
        <div class="blackboard-frame">
          <div class="blackboard-header">
            <span class="chalk-badge">黑板微課板書推導</span>
            <span class="blackboard-title">${{escapeHtml(bb.title)}}</span>
            <span class="chalk-dots">● ● ●</span>
          </div>
          <div class="blackboard-content">
            <div class="blackboard-steps">
              ${{bb.heuristicSteps.map(s => `
                <div class="chalk-step-item">
                  <div class="chalk-step-lead"><span class="chalk-num">第 ${{s.stepNumber}} 步</span> <strong>${{escapeHtml(s.lead)}}</strong></div>
                  <div class="chalk-math-box">${{escapeHtml(s.mathExpression)}}</div>
                  <p class="chalk-explanation">${{escapeHtml(s.explanation)}}</p>
                </div>
              `).join('')}}
            </div>
            <div class="chalk-takeaway-box">
              <div class="chalk-takeaway-header">⚡ 板書黃金結論錨定</div>
              <div class="chalk-takeaway-content">${{escapeHtml(bb.coreTakeawayFormula)}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="exegesis-rubrics-card">
        <div class="exegesis-card-header">
          <span class="exegesis-header-icon">🏆</span>
          <div>
            <strong>均一三階微技能精熟指標</strong>
            <p class="subtle">自學掌握度階梯檢驗，看穿自身所處能力層次</p>
          </div>
        </div>
        <div class="rubric-levels-grid">
          <div class="rubric-level-col l1">
            <div class="rubric-lvl-header"><span class="lvl-badge">Level 1</span> <strong>${{escapeHtml(ml.level1.title)}}</strong></div>
            <p>${{escapeHtml(ml.level1.criteria)}}</p>
          </div>
          <div class="rubric-level-col l2">
            <div class="rubric-lvl-header"><span class="lvl-badge">Level 2</span> <strong>${{escapeHtml(ml.level2.title)}}</strong></div>
            <p>${{escapeHtml(ml.level2.criteria)}}</p>
          </div>
          <div class="rubric-level-col l3">
            <div class="rubric-lvl-header"><span class="lvl-badge">Level 3</span> <strong>${{escapeHtml(ml.level3.title)}}</strong></div>
            <p>${{escapeHtml(ml.level3.criteria)}}</p>
          </div>
        </div>
      </div>

      <div class="exegesis-radar-card">
        <div class="radar-item">
          <span class="radar-tag trigger">🎯 審題題眼觸發詞</span>
          <p>${{escapeHtml(ee.triggerClue)}}</p>
        </div>
        <div class="radar-item">
          <span class="radar-tag trap">⚠️ 會考易錯盲點陷阱</span>
          <p>${{escapeHtml(ee.pitfallTrap)}}</p>
        </div>
        <div class="radar-item">
          <span class="radar-tag check">🛡️ 考場防呆檢查法</span>
          <p>${{escapeHtml(ee.defenseCheck)}}</p>
        </div>
      </div>
    </section>
  `;
}}
"""

with open('dist/exegesis-data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully wrote dist/exegesis-data.js ({len(js_content)} bytes)")
