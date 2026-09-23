import { science } from './science.js';
import { social } from './social.js';
import { life } from './life.js';
export const subjects = [
 ['chinese','國語文','語文','文','閱讀線索、語言表達與文學賞析','#edf0fa','#5867a2'],
 ['english','英語文','語文','Aa','在真實情境裡，聽懂、讀懂、表達','#edf4fc','#4879a5'],
 ['math','數學','數學','π','從數量關係，走向推理與建模','#edf3e5','#668c36'],
 ['biology','生物','自然科學','生','從細胞到生態，理解生命的連結','#e5f3ec','#3f8768'],
 ['physics','理化・物理','自然科學','力','讓力、光、熱與電變得看得見','#e9f3f5','#487b8a'],
 ['chemistry','理化・化學','自然科學','化','用粒子觀點，解釋物質的變化','#f1eefa','#8160a0'],
 ['earth','地球科學','自然科學','地','觀察地球、天氣與星空','#eaf0f8','#546e9f'],
 ['history','歷史','社會','史','用史料與時序，理解變遷','#fbefdf','#a97b36'],
 ['geography','地理','社會','圖','讀懂地圖，發現人與環境的關係','#e6f2ef','#458570'],
 ['civics','公民與社會','社會','公','理解權利、制度與生活選擇','#faede8','#b07150'],
 ['visual','視覺藝術','藝術','色','觀察、創作，說出作品的觀點','#f5eaf3','#9d6092'],
 ['music','音樂','藝術','♪','從節奏與旋律，聽見文化','#eeedf9','#7762a1'],
 ['performing','表演藝術','藝術','演','用身體、聲音與合作說故事','#f7ecef','#a45e74'],
 ['computing','資訊科技','科技','⌘','拆解問題，建立程式與數位素養','#eaf0fa','#5c72a6'],
 ['technology','生活科技','科技','工','從需求出發，設計並測試作品','#edf1f4','#637b88'],
 ['health','健康教育','健康與體育','健','理解身心、尊重界線與健康決策','#f7eee7','#a7794d'],
 ['pe','體育','健康與體育','動','練習動作、運動策略與合作','#f0f4e6','#7b9246'],
 ['home','家政','綜合活動','家','把生活管理，變成實際能力','#f8eeee','#a97070'],
 ['scout','童軍','綜合活動','野','規劃、安全與環境行動','#eaf1e7','#658351'],
 ['guidance','輔導','綜合活動','心','認識自己，練習溝通與生涯探索','#f0eef9','#82709c'],
 ['local','本土語文／臺灣手語','語文','語','尊重語言差異，走進在地文化','#f8f0e6','#9d8256']
].map(([id,name,domain,icon,desc,tint,accent])=>({id,name,domain,icon,desc,tint,accent}));
export const domains=['語文','數學','社會','自然科學','藝術','綜合活動','科技','健康與體育'];
export const units=[];
function u(subject,grade,term,title,concept,example,pitfall,task,questions){const id=subject+'-'+(units.filter(x=>x.subject===subject).length+1);units.push({id,subject,grade,term,title,concept,example,pitfall,task,minutes:12,questions:questions.map((q,i)=>({id:id+'-q'+(i+1),unitId:id,subject,prompt:q[0],options:q[1],answer:q[2],explanation:q[3],hint:q[4]||concept.split('。')[0]+'。',difficulty:i===0?'基礎':'應用',source:'本站原創練習'}))})}
// The grade/term sequence below is an authored study recommendation, not a publisher chapter mapping.
u('math',7,1,'正負數與絕對值','正負號描述相對於基準的方向。絕對值是到 0 的距離，所以不會小於 0。減去一個數等於加上它的相反數。','氣溫從 −3°C 上升 8°C：−3＋8＝5°C。數線上從 −3 向右走 8 格。','−(−3) 是 3；但 −|−3| 是 −3，括號外的負號不能消失。','畫一條數線，標出 −5 與 2，說明兩點距離為什麼是 7。',[
 ['−7＋12 的結果是？',['−19','−5','5','19'],2,'從 −7 向右移動 12 格，先走 7 格到 0，再走 5 格到 5。'],
 ['冷凍庫原為 −8°C，降溫 5°C 後再升溫 9°C，最後是幾度？',['6°C','−4°C','−22°C','4°C'],1,'−8−5＋9＝−13＋9＝−4。降溫是減去溫差。']]);
u('math',7,1,'因數、倍數與質因數分解','質數只有 1 與自己兩個正因數。最大公因數用共同質因數的較小次方；最小公倍數用所有質因數的較大次方。','18＝2×3²，24＝2³×3。最大公因數＝2×3＝6；最小公倍數＝2³×3²＝72。','1 不是質數；互質不代表兩個數各自都是質數，例如 8 與 9。','把 24 張紅卡與 36 張藍卡平均分成最多份，每份都包含兩色且沒有剩餘。',[
 ['24 與 36 的最大公因數是？',['6','12','24','72'],1,'24＝2³×3，36＝2²×3²，取較小次方得 2²×3＝12。'],
 ['兩班車分別每 12 分、18 分發車，同時出發後至少幾分鐘再同時發車？',['6','24','36','72'],2,'時間要同時是 12 和 18 的倍數，最小公倍數為 36。']]);
u('math',7,1,'分數運算與科學記號','分數加減先通分，乘法分子分母各自相乘，除以非零分數等於乘以倒數。科學記號 a×10ⁿ 中，1≤|a|<10。','3/4−1/6＝9/12−2/12＝7/12。0.00052＝5.2×10⁻⁴。','小數點左移使係數變小時，10 的次方要補償變大，總值才不變。','把 0.003 與 3000 寫成科學記號，解釋指數正負的差別。',[
 ['2/3 ÷ 4/5＝？',['8/15','5/6','6/5','2/5'],1,'2/3×5/4＝10/12＝5/6。'],
 ['0.00072 的科學記號是？',['7.2×10⁴','72×10⁻⁵','7.2×10⁻⁴','0.72×10⁻³'],2,'小數點右移 4 位變 7.2，所以乘 10⁻⁴。其餘有的值相等但係數不符標準。']]);
u('math',7,1,'一元一次方程式','等量公理：等式兩側加減同一數、乘同一數或除以同一非零數，仍然相等。先去括號、合併同類項，再求未知數。','3x＋5＝20 → 3x＝15 → x＝5。代回 3×5＋5＝20 驗算。','移項變號是兩側同做加減的結果，不是只改變一邊。','用一元一次方程式表示「三本相同筆記本加 20 元袋子，共 110 元」。',[
 ['2x−7＝9，x＝？',['1','8','−8','16'],1,'兩側加 7 得 2x＝16，再除以 2 得 x＝8。'],
 ['一本書打八折後 240 元，原價是多少元？',['192','260','280','300'],3,'設原價 x，0.8x＝240，所以 x＝300。']]);
u('math',7,2,'二元一次聯立方程式','一條二元一次方程式通常有許多組解，聯立要求同時滿足兩式。可用代入或加減消去一個未知數。','x＋y＝10，2x＋y＝14。第二式減第一式得 x＝4，再代回 y＝6。','找到一式的解還不夠，必須代回兩式。','設雞有 x 隻、兔有 y 隻，利用頭數與腳數建立兩式。',[
 ['x＋y＝9，x−y＝3，x 等於？',['3','6','9','12'],1,'兩式相加得 2x＝12，所以 x＝6，y＝3。'],
 ['全票 50 元、半票 30 元，共買 8 張花 320 元，全票幾張？',['2','3','4','5'],2,'設全票 x 張：50x＋30(8−x)＝320，20x＝80，x＝4。']]);
u('math',7,2,'比例、正比與反比','正比關係 y＝kx 的比值固定，圖形通過原點。反比關係 xy＝k 的乘積固定。判斷時要先確認其他條件是否固定。','固定速率 60 km/h，路程 y＝60t。固定路程 120 km，時間 t＝120/v。','費用含基本費時常是一次關係，但不一定是正比。','比較計程車基本費加里程費，與每公斤固定單價水果，哪個是正比？',[
 ['y 與 x 成正比，x＝3 時 y＝12，x＝5 時 y＝？',['14','15','20','60'],2,'比例常數 k＝12÷3＝4，y＝4×5＝20。'],
 ['固定路程，同速行駛所需時間與速率的關係是？',['正比','反比','相等','無法比較'],1,'路程＝速率×時間固定，所以時間與速率成反比。']]);
u('math',7,2,'一元一次不等式','不等式表示一段範圍。兩側同加減一數不改方向；同乘除負數時，不等號必須反向。','−2x<6，兩側除以 −2 得 x>−3。以 x＝0 檢查：0<6 成立。','把 < 誤讀成 ≤ 會多包含邊界值。','一張票 120 元，預算至多 500 元，可以買幾張？說明整數條件。',[
 ['−3x≥12 的解為？',['x≥−4','x≤−4','x≥4','x≤4'],1,'除以負數 −3，不等號反向，得到 x≤−4。'],
 ['每本 35 元，只有 200 元，最多買幾本？',['4','5','6','7'],1,'35n≤200，n≤5.714…，本數須是非負整數，所以最多 5 本。']]);
u('math',7,2,'坐標與資料圖表','平面坐標先讀 x 再讀 y；平均數受極端值影響，中位數依排序找中央，眾數是出現次數最多的值。','資料 2、3、3、4、18 的平均數是 6，中位數是 3，眾數是 3。','圖表縱軸若不是從 0 起算，視覺差距可能被放大。','找一份班級身高資料，說明平均數與中位數各回答什麼。',[
 ['點 (−2,3) 位於哪個象限？',['第一','第二','第三','第四'],1,'x 為負、y 為正，位於第二象限。'],
 ['資料 1、2、3、4、40 的中位數是？',['3','10','4','40'],0,'排序後第 3 個數是 3；10 是平均數，不是中位數。']]);
u('math',8,1,'乘法公式與多項式','(a＋b)²＝a²＋2ab＋b²；(a＋b)(a−b)＝a²−b²。多項式相加只合併同次方的同類項。','(x＋3)²＝x²＋6x＋9。可畫邊長 x＋3 的正方形，把面積分成四塊。','(a＋b)² 不等於 a²＋b²，中間的兩個 ab 不能漏掉。','不直接相乘，用平方差算 101×99。',[
 ['(x＋4)² 展開後是？',['x²＋16','x²＋4x＋16','x²＋8x＋16','2x＋8'],2,'套公式 a²＋2ab＋b²，得到 x²＋8x＋16。'],
 ['99×101 等於？',['9999','10001','9801','10201'],0,'(100−1)(100＋1)＝10000−1＝9999。']]);
u('math',8,1,'平方根與畢氏定理','√a 表示非負平方根；x²＝a 在 a>0 時有正負兩解。直角三角形兩股平方和等於斜邊平方。','兩股長 6、8，斜邊平方＝36＋64＝100，所以斜邊長 10。','使用畢氏定理前要確認直角；斜邊一定在直角對面。','畫出兩股長 5、12 的三角形，求斜邊並標記單位。',[
 ['√49 等於？',['±7','7','−7','24.5'],1,'根號表示主平方根，也就是非負的 7；x²＝49 才有 ±7 兩解。'],
 ['直角三角形斜邊 13、一股 5，另一股長？',['8','12','18','√194'],1,'另一股平方＝13²−5²＝144，所以長 12。']]);
u('math',8,1,'因式分解','因式分解是把和式寫成乘積，可先提公因式，再看平方差、完全平方或十字交乘。乘回原式可驗算。','x²＋5x＋6＝(x＋2)(x＋3)，因為 2＋3＝5 且 2×3＝6。','公因式要提乾淨，且每一項都要除以公因式。','比較 x²−9 與 x²＋9，何者可在實數範圍用平方差分解？',[
 ['x²−16＝？',['(x−4)²','(x−8)(x＋2)','(x−4)(x＋4)','(x−16)(x＋1)'],2,'平方差公式：x²−4²＝(x−4)(x＋4)。'],
 ['x²＋7x＋12 的分解是？',['(x＋3)(x＋4)','(x＋2)(x＋6)','(x−3)(x−4)','(x＋1)(x＋12)'],0,'3＋4＝7、3×4＝12，乘回得到原式。']]);
u('math',8,1,'一元二次方程式','先整理為 ax²＋bx＋c＝0（a≠0），再因式分解、配方或用公式解。零乘積性質：AB＝0 時 A 或 B 至少一個是 0。','x²−5x＋6＝0 → (x−2)(x−3)＝0 → x＝2 或 3。','x(x−3)＝0 不可直接除以 x，否則會遺失 x＝0。','解 x²＝4x，並檢查是否漏掉 0。',[
 ['x(x−5)＝0 的解是？',['只有 5','只有 0','0 或 5','−5 或 5'],2,'兩因式至少一個為零，所以 x＝0 或 x＝5。'],
 ['長方形長比寬多 3，面積 40，寬是多少？',['4','5','8','10'],1,'設寬 x，x(x＋3)＝40 → (x＋8)(x−5)＝0。長度為正，取 x＝5。']]);
u('math',8,2,'等差數列與一次函數','等差數列每次增加固定公差 d，第 n 項 aₙ＝a₁＋(n−1)d。一次函數 y＝ax＋b 中 a 是變化率、b 是 y 截距。','3、7、11…第 10 項＝3＋9×4＝39。y＝2x＋5 中，x 增 1，y 增 2。','第 n 項只走了 n−1 次公差；截距不是斜率。','為「起跳 30 元，每公里 12 元」建立費用模型。',[
 ['等差數列 5、8、11…第 8 項為？',['24','26','29','40'],1,'a₈＝5＋(8−1)×3＝26。'],
 ['y＝−2x＋7，當 x 增加 3，y 如何變？',['增加 6','減少 6','增加 7','減少 2'],1,'變化量 Δy＝−2×3＝−6。']]);
u('math',8,2,'三角形全等與幾何推理','三角形全等須具足夠條件，如 SSS、SAS、ASA、AAS 或直角三角形 RHS。證明要標明對應頂點與理由。','兩三角形的兩邊及其夾角分別相等，可由 SAS 判定全等，進而得到對應第三邊相等。','AAA 只保證相似，不保證大小一樣；SSA 一般不能判定全等。','用紙做兩個角度一樣但大小不同的三角形，說明 AAA 的限制。',[
 ['哪組條件必能判定兩三角形全等？',['三角相等','兩邊及夾角相等','兩邊與任一角相等','一邊相等'],1,'SAS 的角必須是兩已知邊的夾角。'],
 ['三角形兩內角為 48°、67°，第三角為？',['65°','75°','115°','132°'],0,'內角和 180°，180−48−67＝65°。']]);
u('math',8,2,'平行線、四邊形與尺規','平行線的同位角相等、內錯角相等。平行四邊形對邊相等且平行，對角線互相平分。矩形再多四個直角的條件。','平行四邊形一角 65°，鄰角為 115°，因同側內角互補。','對角線等長不代表一定是正方形，矩形也成立。','畫平行四邊形，量測兩條對角線被交點分成的線段。',[
 ['平行四邊形必定具有哪個性質？',['四邊等長','對角線垂直','對角線互相平分','四角相等'],2,'對角線互相平分是平行四邊形的一般性質，其他需要額外條件。'],
 ['正六邊形每一內角為？',['60°','90°','120°','135°'],2,'內角和 (6−2)×180＝720°，除以 6 得 120°。']]);
u('math',9,1,'相似形與比例推理','相似三角形對應角相等、對應邊成比例。長度比 k 時面積比 k²；相似立體的體積比為 k³。','模型長度是實物的 1/10，對應面積是 1/100，不是 1/10。','先找對應邊，不能把任意兩邊直接列成比例。','同時測量人與樹的影長，利用比例估計樹高並交代假設。',[
 ['相似三角形對應邊長比 2:3，面積比是？',['2:3','4:9','8:27','3:2'],1,'面積按長度比例平方縮放，所以 2²:3²＝4:9。'],
 ['人高 1.5 m、影長 2 m；同時樹影長 8 m，樹高為？',['4 m','6 m','8 m','12 m'],1,'陽光角度相同且地面水平，h/8＝1.5/2，h＝6。']]);
u('math',9,1,'圓、切線與圓周角','同弧的圓周角是圓心角的一半。切線與切點半徑垂直。讀圓的題目先找圓心、半徑與對應弧。','對應 100° 圓心角的同弧圓周角是 50°。半圓所對的圓周角是 90°。','圓周角的頂點在圓上，圓心角的頂點在圓心。','畫直徑 AB 與圓上第三點 C，觀察 ∠ACB 的大小。',[
 ['同弧圓心角 140°，圓周角為？',['35°','70°','140°','280°'],1,'圓周角為同弧圓心角的一半，140÷2＝70°。'],
 ['圓的半徑與切線在切點所夾的角為？',['30°','45°','60°','90°'],3,'圓的切線垂直於切點的半徑。']]);
u('math',9,2,'二次函數與極值','y＝a(x−h)²＋k 的頂點是 (h,k)，對稱軸 x＝h。a>0 開口向上，有最小值 k；a<0 則有最大值 k。','y＝(x−2)²＋3 中平方項最小是 0，所以當 x＝2 時最小值 3。','(x＋2)² 的對稱軸是 x＝−2，不是 2。','使用互動實驗室改變 a、h、k，先預測再觀察頂點。',[
 ['y＝(x−3)²＋2 的頂點是？',['(−3,2)','(3,2)','(2,3)','(3,−2)'],1,'比較頂點式，可讀出 h＝3、k＝2。'],
 ['y＝−(x＋1)²＋9 的最大值是？',['−1','1','9','不存在'],2,'負平方項至多為 0，所以 y 至多 9，於 x＝−1 時達到。']]);
u('math',9,2,'統計、機率與空間圖形','在等可能情況下，事件機率＝有利結果數÷所有結果數。立體表面積計算外露的面，體積衡量所占空間。','公平骰子出現大於 4 的結果為 5、6，機率 2/6＝1/3。邊長 3 的正方體體積 27、表面積 54。','抽樣次數少時，實際頻率不一定等於理論機率；無放回抽取會改變後續條件。','列出擲兩枚公平硬幣的全部有序結果，計算恰一正面機率。',[
 ['擲兩枚公平硬幣，恰好一枚正面的機率？',['1/4','1/3','1/2','3/4'],2,'正正、正反、反正、反反四種等可能結果，有利兩種，所以 1/2。'],
 ['半徑 3、高 4 的圓柱體積是？',['12π','24π','36π','48π'],2,'底面積 π×3²＝9π，乘高 4 得 36π。']]);

u('chinese',7,1,'字詞、語境與修辭','同一個詞會依語境改變意思。判斷修辭需看語句的作用：譬喻以相似性連結，擬人賦予非人的事物人的行為，排比用相似結構累積語勢。','「風在窗邊低語」讓風像人一樣說話，是擬人。「時間像流水」則藉流水比喻時間。','看見「像」不一定是譬喻；「他像哥哥一樣高」也可能只是實際比較。','從生活廣告找一句修辭，指出本體、喻體或被賦予的人類行為。',[
 ['「路燈靜靜守候每個晚歸的人」最明顯的修辭是？',['設問','排比','擬人','引用'],2,'路燈被賦予人的「守候」行為，形成擬人。'],
 ['「他在辯論中抓住對方的破綻」中「抓住」最接近？',['用手握住','掌握關鍵','阻止離開','捕捉動物'],1,'搭配「破綻」是抽象語境，意為掌握問題或漏洞。']]);
u('chinese',7,2,'敘事閱讀與人物推論','把事件、人物行動與心理推論分開。先找文本證據，再提出能涵蓋線索的解釋；敘事觀點會影響讀者能知道的資訊。','「他把傘推給我，自己跑進雨裡。」可以支持他體貼他人，不能據此判斷他的家庭收入。','合理推論不是自由想像；答案不能超出文本支持的範圍。','用「我認為…因為文中…」寫一段人物判斷，附兩項證據。',[
 ['「祖父說不餓，卻把最後的飯留給孫子。」最有根據的推論？',['祖父討厭米飯','祖父體貼孫子','孫子不喜歡祖父','家中從不煮飯'],1,'留飯的行動支持體貼照顧，其他選項都沒有文本依據。'],
 ['第一人稱敘事最需要注意的限制是？',['不能描述風景','必定沒有情緒','未必知道其他人的真實想法','故事一定是真實'],2,'敘事者通常只能依所見、所聞與推論理解其他人物。']]);
u('chinese',8,1,'文言文的省略與虛字','讀文言先確認主詞、動詞與受詞，再依上下文補出省略成分。「之」可以是代詞、助詞或動詞，不能永遠翻成「的」。','「學而時習之」中的「之」指所學內容；「友人之言」中的「之」連接修飾關係。','逐字固定翻譯容易誤判，應先讀完整句再回頭對照。','把一則短寓言改寫為現代白話，標出原文省略的主詞。',[
 ['「學而時習之」的「之」主要指？',['時間','所學的內容','老師','地方'],1,'「習」的對象承接前面的「學」，之代指所學。'],
 ['閱讀古文出現省略主詞時，最好怎麼處理？',['全部補成作者','直接跳過','依前後文行動者判斷','一律補成皇帝'],2,'省略須依語境復原，不能套固定人物。']]);
u('chinese',8,2,'說明文、圖表與資訊整合','說明文常以定義、分類、比較、因果解釋事物。跨文本閱讀要核對研究對象、時間、單位與資料來源後，再整合結論。','甲圖是「使用人數」，乙圖是「使用比例」，即使線條都上升，也不能直接比較增加了多少人。','相關不必然是因果；只看標題或單一數字容易過度推論。','找兩篇談同一環境議題的文章，列出共同發現與不同限制。',[
 ['甲圖單位「人」、乙圖單位「百分比」，比較前最需要？',['只比柱子的高度','確認母數與單位','忽略年份','挑較大數字'],1,'百分比需要知道母數，還要核對時間與定義才可比較。'],
 ['「冰淇淋銷售與溺水件數同時上升」足以證明冰淇淋造成溺水嗎？',['足以','只要數字大就足以','不足，可能有氣溫等共同因素','代表資料必定造假'],2,'兩者可能都受炎熱天氣影響，相關不足以證明因果。']]);
u('chinese',9,1,'議論、論據與批判閱讀','議論包含主張、理由與支持證據。好的論證能處理反例與條件，區分事實描述和價值判斷。','「圖書館應延長開放」是主張；「晚間使用需求調查」可作為證據，還需考量成本。','名人說過不等於證據充分；攻擊說話者也不等於反駁論點。','就校園手機使用提出立場、兩項證據與一個可能的反例。',[
 ['哪一項最能支持「應增設校園飲水機」？',['我喜歡銀色機器','全校調查顯示下課平均排隊 8 分鐘','別校校長很有名','有人不喜歡喝水'],1,'排隊調查直接反映設備供應與學生需求的落差。'],
 ['反駁某提案時，最合適的做法是？',['嘲笑提案者','檢查證據與推理是否成立','只說大家都反對','改談無關話題'],1,'討論應針對主張、證據和推理，才能構成有效反駁。']]);
u('chinese',9,2,'詩歌賞析與寫作組織','詩歌以意象、節奏與語言濃縮情感；賞析要回到字句。寫作可用具體事件展開主題，再由細節轉入反思，結尾呼應但不重複。','「空椅上，夕陽慢慢坐下」藉空椅與夕陽形成缺席、等待的意象，仍需全文才能判定情感。','意象並沒有唯一固定情緒；也不要只堆成語而沒有具體經驗。','以「一次改變想法的經驗」寫出起因、衝突、轉折和反思各一段。',[
 ['賞析詩句情感時，哪種方法較可靠？',['每逢月亮必定思鄉','依全詩語境和意象判讀','只看作者年代','只數押韻字'],1,'意象的情感由語境建構，不應硬套固定答案。'],
 ['讓「我很緊張」更具體的寫法是？',['我非常十分極度緊張','緊張就是緊張','手心的汗把講稿邊角浸濕','大家都應該懂'],2,'以可觀察的身體與動作細節呈現心理，讓讀者感受到緊張。']]);

u('english',7,1,'句子骨架與現在式','先找主詞與動詞。be 動詞描述身分、狀態；一般動詞描述動作。現在簡單式常描述習慣；第三人稱單數的一般動詞通常加 s 或 es。','She is a student. / She plays tennis every Sunday. 否定：She does not play tennis.','does 後面的主要動詞回原形，不寫 does not plays。','用英文寫三句你的週間習慣，再改寫成另一位同學的習慣。',[
 ['My brother ___ to school by bus every day.',['go','goes','going','is go'],1,'brother 是第三人稱單數，習慣用現在簡單式 goes。'],
 ['哪句正確？',['She does not likes tea.','She not like tea.','She does not like tea.','She is not like tea.'],2,'一般動詞否定用 does not＋原形 like。']]);
u('english',7,2,'現在進行式與時間表達','現在進行式 be＋V-ing，描述正在進行的動作。頻率副詞 often、usually 多和習慣現在式使用；時態仍要靠情境而非只抓單字。','Look! They are playing basketball. / They usually play after school.','be 和 V-ing 缺一不可；They playing 不是完整的現在進行式句子。','描述窗外正在發生的兩個動作，說明主詞如何決定 be。',[
 ['Listen! The birds ___.',['sing','sings','are singing','is singing'],2,'Listen! 指向當下正在發生，birds 為複數，使用 are singing。'],
 ['選出正確句子。',['I am read now.','He are running.','We are studying now.','They is eating.'],2,'We 搭配 are，主要動詞使用 studying。']]);
u('english',8,1,'過去式、未來與敘事順序','過去簡單式描述過去事件，否定和問句用 did＋原形。未來可用 will 或 be going to 表達預測或計畫，仍要配合情境。','I visited Tainan yesterday. / Did you visit Tainan? / We are going to visit tomorrow.','Did she went? 錯誤，應為 Did she go?；went 已表示過去，不能重複標記。','用 first、then、finally 連接你上週末的三件事。',[
 ['We ___ a movie last night.',['watch','watched','watching','are watch'],1,'last night 為過去時間，watch 使用過去式 watched。'],
 ['Did Amy ___ her homework yesterday?',['finished','finishes','finish','finishing'],2,'助動詞 did 已表示過去，後面用原形 finish。']]);
u('english',8,2,'比較級、不定詞與動名詞','比較兩者常用比較級＋than；最高級常加 the 並界定範圍。不同動詞接受不同的後接結構，如 want to do、enjoy doing。','This bag is lighter than that one. / I enjoy reading, and I want to read more.','不是每個動詞後都加 to；也不要寫 more taller。','比較兩條上學路線的距離、安全與時間，寫兩句比較句。',[
 ['This box is ___ than that one.',['heavy','heavier','heaviest','most heavy'],1,'兩者比較，heavy 的比較級改 y 為 i 再加 er。'],
 ['Mia enjoys ___ in the pool.',['swim','to swim','swimming','swam'],2,'enjoy 後接動名詞 swimming。']]);
u('english',9,1,'完成式、被動與關係子句','現在完成式 have/has＋過去分詞，連結過去與現在。被動語態 be＋過去分詞，突出承受動作的對象。關係子句補充名詞資訊。','I have lived here for three years. / The bridge was built in 2000. / The boy who wears glasses is Ben.','現在完成式通常不和明確結束的過去時間 yesterday 搭配。','把「有人昨天打掃教室」改寫成以教室為主詞的英文句子。',[
 ['The room ___ cleaned yesterday.',['is','was','has','does'],1,'主詞 room 承受打掃，昨天是過去時間，所以 was cleaned。'],
 ['The girl ___ is talking to our teacher is my sister.',['which','who','where','when'],1,'先行詞為人 girl，關係代名詞 who 作子句主詞。']]);
u('english',9,2,'閱讀策略與情境溝通','閱讀先確認文本目的，再找主旨、指代和細節。推論需有線索。公告、時刻表與對話常需要整合時間、條件及人物意圖。','Notice: The library closes at 5 p.m. Please return books before 4:30. 借還書截止早於關門時間。','close at 5 不等於 5 點仍可還書，需同時讀到 before 4:30 的限制。','把一則英文公告整理成 Who、What、When 三欄。',[
 ['Notice: Return books before 4:30 p.m. The library closes at 5. When should you return books?',['At 5:10','Before 4:30','After 5','Only at noon'],1,'公告明定還書須早於 4:30，而非只看關門時間。'],
 ['Amy: Would you like some tea? Ben: No, thanks. I have just had some. Ben means he ___.',['wants more tea','has already drunk some tea','never drinks tea','will make tea'],1,'have just had 表示剛喝過，所以禮貌婉拒。']]);
u('math',9,1,'三角形的外心、內心與重心','外心是三邊中垂線交點，到三頂點等距，為外接圓圓心；內心是三內角平分線交點，到三邊等距，為內切圓圓心；重心是三中線交點，將中線分為 2:1，且將三角形分成六個等面積小三角形。','直角三角形外心在斜邊中點，斜邊長 10 則外接圓半徑為 5。若等腰三角形底邊 8、高 6，重心到底邊距離為 6×(1/3)＝2。','外心不一定在三角形內部（鈍角三角形外心在外部）；重心到頂點的距離是到對邊中點距離的 2 倍，不是相反。','畫一個直角三角形，標出斜邊中點（外心），並驗證它到三個頂點的距離是否相等。',[
 ['直角三角形兩股長為 6 與 8，其外接圓半徑為？',['3','4','5','10'],2,'斜邊長＝√(6²＋8²)＝10，外心為斜邊中點，外接圓半徑＝10÷2＝5。'],
 ['三角形 ABC 重心為 G，若中線 AD 長度為 12，則線段 AG 的長度為？',['4','6','8','9'],2,'重心將中線分為 2:1，AG 占中線的 2/3，12×(2/3)＝8。']]);
u('chinese',7,1,'六書原則與漢字形義流變','六書是漢字的造字與用字法則，前四者「象形、指事、會意、形聲」為造字法，後二者「轉注、假借」為用字法。象形隨體詰詘畫成其物；指事視而可識察而見意；會意比類合誼以見指撝；形聲形旁表意、聲旁表音。','「日、月、水」為象形；「上、下、刃」在刀上加點標示刀刃，是指事；「休」（人倚木）、「武」（止戈）為會意；「江、河、湖」形旁水部、聲旁工可胡為形聲。','形聲字占漢字八成以上；形聲字聲旁因古今語音演變，不一定與今日讀音完全一致。指事字通常含有抽象符號或在象形基礎上加指事符號，非純粹具體物象。','整理「木、本、末、林、森」五個字，分別指出它們各自屬於六書中的哪一種造字法則，並說明判斷依據。',[
 ['下列漢字中，造字法則屬於「指事」的是？',['木','刃','河','休'],1,'「刃」在「刀」的刀鋒處加上一點指示位置，屬於指事字；木為象形，河為形聲，休為會意。'],
 ['漢字中數量最多、由意符與聲符組合而成的造字法是？',['象形','指事','會意','形聲'],3,'形聲字占漢字 80% 以上，具有表意與表音雙重功能，極富擴充性。']]);
u('chinese',7,2,'標點符號、句型結構與語法邏輯','漢語基本句子結構通常包含主語、謂語與賓語。常見句型有敘事句（主＋動＋賓）、有無句（主＋有/無＋賓）、表態句（主＋表語/形容詞）與判斷句（主＋繫詞「是」＋斷語）。標點符號如破折號表聲音延長或轉折插說，夾注號表補充說明。','「燕子去了，有再來的時候」為敘事句；「天下沒有白吃的午餐」為有無句；「環堵蕭然」為表態句；「菊，花之隱逸者也」為文言判斷句（相當於「菊是隱逸之花」）。','「是」在古代常作代詞「這」（如「是可忍，孰不可忍」），不一定是現代語法中的繫詞。表態句的中心是形容詞，沒有一般及物動詞。','各造一個敘事句、表態句與判斷句，並用符號標出每句的主語與核心動詞或形容詞。',[
 ['下列文句中，何者屬於「表態句」？',['故人具雞黍','白日依山盡','雄兔腳撲朔','我是一片雲'],2,'「雄兔腳撲朔」中「撲朔」為形容詞，描寫腳步跳躍貌，句型為主語＋表語（形容詞），屬表態句。'],
 ['在文章中，若要表示聲音的延長或語意的突然轉折，最適合使用的標點符號是？',['分號','破折號','夾注號','書名號'],1,'破折號（——）常用於語意的躍進、轉折、補充插說或聲音的拉長。']]);
u('chinese',8,1,'古典近體詩：絕句與律詩格律賞析','近體詩盛於唐代，分為絕句（四句）與律詩（八句），每句字數固定為五言或七言。律詩格律嚴格：偶數句必押平聲韻且一韻到底；三四句（頷聯）與五六句（頸聯）必須字面與詞性嚴格對仗。','杜甫〈蜀相〉「丞相祠堂何處尋？錦官城外柏森森。映階碧草自春色，隔葉黃鸝空好音。」頷聯中「映階碧草」對「隔葉黃鸝」，「自春色」對「空好音」，詞性工整對仗。','絕句不要求對仗，若有對仗屬作者巧思；律詩首尾兩聯（首聯、尾聯）通常不對仗，只有中間兩聯必須對仗。近體詩通常不可換韻。','選一首唐代七言律詩，標出其偶數句押韻的字，並指出哪兩聯形成了工整的對仗。',[
 ['關於近體詩「七言律詩」的格律要求，下列何者正確？',['全首共四句','第三、四聯必須對仗','頷聯與頸聯必須對仗','每句皆可自由換韻'],2,'律詩八句共四聯：首聯、頷聯（三四句）、頸聯（五六句）、尾聯。其中頷聯與頸聯必須嚴格對仗。'],
 ['王維〈使至塞上〉「大漠孤煙直，長河落日圓」屬於律詩中的哪一聯？',['首聯','頷聯或頸聯','尾聯','散句聯'],1,'此兩句字字對仗（大漠對長河、孤煙對落日、直對圓），為律詩中間對仗之頸聯。']]);
u('chinese',8,2,'詞曲賞析與古代生活文化','詞盛於宋，又稱曲子詞、詩餘或長短句，依詞牌填詞，句式參差便於歌唱，分為婉約派（晏殊、李清照）與豪放派（蘇軾、辛棄疾）。曲盛於元，包含散曲與雜劇，語言通俗自然，押韻更密且可加入襯字。','李清照〈如夢令〉「昨夜雨疏風驟，濃睡不消殘酒。試問捲簾人，卻道海棠依舊。知否？知否？應是綠肥紅瘦！」詞調長短錯落，藉紅瘦比喻落花，風格清麗婉約。','詞牌名（如〈念奴嬌〉、〈破陣子〉）是音樂曲調，與詞的內容題目不一定有直接關聯；題目通常另附於詞牌之後。','比較一首宋詞與一首唐代五言絕句的句式結構，寫出長短句在情感抒發上的節奏特色。',[
 ['宋代文學代表「詞」又被稱為「長短句」，其主要特點是？',['每句必須字數相同','依照詞牌曲調填詞，句式長短錯落','完全不需押韻','只能描述邊疆戰爭'],1,'詞本為配合音樂歌唱的歌詞，依照詞牌特定譜格填寫，句子長短參差，故稱長短句。'],
 ['辛棄疾「醉裡挑燈看劍，夢回吹角連營」展現了報國熱忱與壯烈情懷，在風格流派上屬於？',['婉約派','花間派','豪放派','奇險派'],2,'辛棄疾為宋代豪放派代表詞人，詞風雄健豪邁，常抒發愛國壯志與收復失土之抱負。']]);
u('chinese',9,1,'古典小說選讀與人性刻畫','中國古代章回小說由宋元話本發展而來，明清達到高峰。四大名著包括《三國演義》（歷史演義）、《水滸傳》（英雄傳奇）、《西遊記》（神魔奇幻）與《紅樓夢》（世情小說）。刻畫人物藉由外貌、心理、言行對比及情節衝突展現人性複雜面貌。','《水滸傳》寫林沖風雪山神廟，由一再隱忍、退讓到得知真相後的憤怒反抗，人物轉變層次分明，細膩刻畫「逼上梁山」的心路歷程。','章回小說的情節經過作者藝術加工，不等同於真實歷史事實（如《三國演義》七實三虛，草船借箭在正史中並非諸葛亮所為）。','選一部古典小說中的人物（如孔明、曹操、武松或孫悟空），寫出一次他的言行細節，並分析該細節如何展現其性格特徵。',[
 ['明清四大章回小說中，以細膩描寫賈、史、王、薛四大家族興衰與封建社會人性百態的世情小說是？',['水滸傳','三國演義','西遊記','紅樓夢'],3,'《紅樓夢》曹雪芹著，描寫榮寧二府盛衰與寶黛愛情，為中國古代世情小說的最高峰。'],
 ['古典小說中塑造人物性格時，最能讓讀者信服並感受真實深度的手法是？',['由作者直接宣稱好人壞人','透過具體言行細節、抉擇衝突與心理轉變','讓所有角色性格完全相同','省略所有情節背景'],1,'優良的小說透過客觀行動細節、兩難處境與性格轉折展現立體人性，而非單純給予道德標籤。']]);
u('chinese',9,2,'應用文全覽：書信、題辭、對聯與柬帖規範','應用文處理人際交往與社會事務。書信注意受信人提稱語（長輩用尊鑒/道鑒、平輩用大鑒、晚輩用青鑒/如晤）、啟封詞（長輩用安啟/福啟、平輩用大啟、晚輩用啟/收）；對聯講究字數相等、詞性對仗、平仄相對且「仄起平收」（上聯末字仄聲、下聯末字平聲）；題辭需合乎場合（如賀婚、賀壽、賀遷居、哀輓）。','寫給老師信封中間受信欄應寫「某某老師 安啟」，不可寫「敬啟」（敬啟意為恭敬開啟，不可請長輩敬啟）。祝賀新婚可用「宜室宜家」、「琴瑟和鳴」；祝賀醫院診所可用「妙手回春」、「仁心仁術」。','信封上的啟封詞是給送信人看的「請收信人拆開」之詞，寫「敬啟」等於要收件人恭敬拆開，極為失禮。「桃李春風」用於教育界，不可用於醫療開業。','檢視一幅對聯「風調雨順千山秀，國泰民安萬里春」，標出上下聯末字的平仄，並說明為何上聯在右、下聯在左。',[
 ['寫信給自己的師長，信封上的「啟封詞」下列何者最恰當禮貌？',['敬啟','安啟','大啟','青啟'],1,'寫給長輩或師長宜用「安啟」或「福啟」；「敬啟」為自己恭敬拆開之意，不可用於他人；大啟適用平輩，青啟適用晚輩。'],
 ['傳統對聯的平仄格律與貼法原則為？',['平起仄收，上聯在左','仄起平收，上聯在右','不需管平仄，字數相同即可','平起平收，左右隨意'],1,'傳統對聯講求「仄起平收」，即上聯最後一字為仄聲（三四聲或入聲），貼在面向大門的右側；下聯最後一字為平聲（一二聲），貼在左側。']]);

u('english',7,1,'名詞單複數、指示代名詞與祈使句','Regular plural nouns add -s or -es; irregular plurals change internally (child/children, foot/feet, man/men). Demonstratives indicate distance and number: this/that (singular), these/those (plural). Imperative sentences begin with a base verb for commands, directions, or requests (use "Please" for politeness).','This is my apple, and those are your books. / Please open your book and turn to page ten. / Don’t run in the hallway!','Do not use plural verbs with this/that. In negative imperatives, use "Don’t" + base verb, never "Not" or "No" (say "Don’t touch", not "No touch").','Write four signs for your school library using polite positive and negative imperatives.',[
 ['Look at ___ birds in the tall tree over there! They are so colorful.',['this','that','these','those'],3,'The birds are plural and "over there" indicates far distance, so "those" is used.'],
 ['Which of the following is a correct imperative sentence for classroom safety?',['No running in the lab.','Don’t run in the lab.','Not run in the lab.','Doesn’t run in the lab.'],1,'Negative imperatives take "Don’t" followed by the base verb: "Don’t run".']]);
u('english',7,2,'頻率副詞、情態助動詞 can 與存在句','Adverbs of frequency (always, usually, often, sometimes, never) show how often an action happens. They come before action verbs but after be-verbs. The modal verb "can" expresses ability or permission and is followed by a base verb. "There is" and "There are" state existence.','She is always on time. / He often plays baseball after school. / Can you swim? Yes, I can. / There is a cat on the roof, and there are three dogs in the yard.','Do not put frequency adverbs before be-verbs (say "He is always kind", not "He always is kind"). In There is/are sentences, verb agreement depends on the noun that immediately follows.','Write three sentences about your weekly schedule using different frequency adverbs and the correct word order.',[
 ['David is a vegetarian, so he ___ eats beef or pork.',['always','usually','never','sometimes'],2,'A vegetarian does not eat meat, so the frequency is zero ("never").'],
 ['There ___ a pencil and two erasers on the desk.',['is','are','be','am'],0,'In "There + be" structures, the verb agrees with the immediate subject ("a pencil", which is singular), so "is" is correct.']]);
u('english',8,1,'過去進行式、時間連接詞與數量詞','The past continuous tense (was/were + V-ing) describes an action that was in progress at a specific moment in the past. When combined with "when" or "while", it shows an ongoing background action interrupted by another past action. Countable and uncountable nouns use distinct quantifiers (many/few vs much/little).','I was doing my homework when the phone rang. / While Dad was cooking, Mom was reading a book. / She has a few friends, but very little free time.','Do not confuse "a few" (positive: some) with "few" (negative: almost none), or "a little" (some) with "little" (almost none). Remember "were" is used for you/we/they in past continuous.','Describe what you and your family members were doing yesterday at 7 p.m. using past continuous and "while".',[
 ['When the earthquake struck, we ___ dinner in the dining room.',['have','ate','were having','are having'],2,'The ongoing background activity during a past event requires past continuous: "were having".'],
 ['There is only ___ milk left in the bottle; we need to buy some more.',['a few','few','a little','many'],2,'Milk is uncountable and the positive remaining small amount is expressed by "a little".']]);
u('english',8,2,'連綴動詞、感官動詞與最高級比較','Linking verbs (look, sound, smell, taste, feel) describe sensory perception and are followed by adjectives, or "like" + nouns. Sensory verbs (see, hear, watch, notice) take an object followed by a base verb (entire action) or V-ing (action in progress). Superlatives compare three or more items using the + -est/most.','The soup tastes delicious. / That sounds like a great idea. / I saw the bird fly into the garden. / Mount Everest is the highest mountain in the world.','Do not use adverbs after linking verbs (say "The flower smells sweet", not "sweetly"). Do not forget the definite article "the" before superlatives.','Write a food review describing a meal using three different sensory linking verbs and one superlative statement.',[
 ['The fresh bread from the oven smells ___ and looks attractive.',['deliciously','delicious','more delicious','most deliciously'],1,'The linking verb "smells" takes a predicative adjective ("delicious"), not an adverb.'],
 ['Of all the students in our class, Jason runs ___.',['fastest','the fastest','faster','more fast'],1,'When comparing among all students in a group (three or more), use the superlative form "the fastest".']]);
u('english',9,1,'授予動詞、使役動詞與現在完成式進階','Dative verbs take two objects: direct (thing) and indirect (person). When the person follows, prepositions are required: "to" for transfer (give, send, show), "for" for benefit/effort (buy, make, cook). Causative verbs (make, have, let) take an object and a bare infinitive (base verb). Present perfect with "since" indicates an action starting at a specific point in time.','She bought a gift for her brother (= She bought her brother a gift). / The teacher made us clean the classroom. / I have studied English since 2020.','Do not use "to V" after causative verbs (say "Mom let me go", not "Mom let me to go"). "Since" takes a specific starting point; "for" takes a duration of time.','Create two pairs of sentences showing dative verb transformations with "to" and "for", and one sentence using "let" or "make".',[
 ['My father made my brother ___ his bedroom before going out to play.',['cleaned','cleaning','clean','to clean'],2,'The causative verb "make" requires an object followed by the base form of the verb ("clean").'],
 ['Uncle Kevin has lived in Kaohsiung ___ more than ten years.',['since','for','in','at'],1,'"More than ten years" is a duration of time, so the preposition "for" is required with present perfect.']]);
u('english',9,2,'附加問句、名詞子句與間接問句','Tag questions confirm information: affirmative statements take negative tags; negative statements take affirmative tags. Noun clauses serve as subjects or objects, introduced by "that", "whether/if", or wh-question words. Indirect questions change question word order into normal statement order (wh-word + subject + verb).','You like playing soccer, don’t you? / She isn’t coming, is she? / I wonder where the post office is. / Do you know if the bus has arrived?','In indirect questions, do not keep inversion or auxiliary do/does/did (say "Can you tell me where he lives?", not "where does he live?").','Convert two direct questions (e.g. "What time does the movie start?") into polite indirect questions starting with "Could you tell me...".',[
 ['Your brother plays the guitar very well, ___?',['is he','isn’t he','does he','doesn’t he'],3,'The statement is affirmative with an action verb in present tense ("plays"), so the negative tag is "doesn’t he?".'],
 ['Excuse me, could you please tell me where ___?',['is the train station','the train station is','the train station was','does the train station be'],1,'In indirect questions, the clause takes regular statement word order: question word + subject ("the train station") + verb ("is").']]);

science(u); social(u); life(u);
export const questions=units.flatMap(x=>x.questions);
export const subjectById=Object.fromEntries(subjects.map(x=>[x.id,x]));
export const unitById=Object.fromEntries(units.map(x=>[x.id,x]));
