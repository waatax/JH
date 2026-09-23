export const extraQuestions=[];
function passage(subject,unitId,text,items){items.forEach(q=>extraQuestions.push({id:'extra-'+subject+'-'+(extraQuestions.filter(x=>x.subject===subject).length+1),subject,unitId,prompt:text+'\n\n'+q[0],options:q[1],answer:q[2],explanation:q[3],hint:'先在材料中圈出與問題直接相關的條件，再排除超出材料的選項。',difficulty:'素養應用',source:'本站原創題組'}))}
passage('chinese','chinese-2','【原創短文】巷口的修鞋店要關門了。我以為老闆終於可以休息，他卻說：「我最捨不得的，是那些還沒修好的鞋。」後來，社區把空教室借給他，每週六教大家修補。第一堂課，我學會的不是把鞋修得像新的一樣，而是看見裂痕後，願意再給它一次機會。',[
['老闆最初捨不得的是？',['失去廣告','還沒修好的鞋','少了假期','空教室太大'],1,'原文明確寫出「那些還沒修好的鞋」。'],
['敘事者原先以為老闆關店後會？',['可以休息','去賣新鞋','開新工廠','搬去國外'],0,'「我以為老闆終於可以休息」直接交代最初想法。'],
['社區提供空教室，主要作用是？',['懲罰店主','讓修補技藝有新的延續方式','把學生趕走','禁止居民買鞋'],1,'老闆改為週六教修補，空間讓技藝與交流延續。'],
['末句「再給它一次機會」最接近？',['珍惜並嘗試修復','保證永不損壞','所有鞋都免費','只重視全新物品'],0,'裂痕與修補的對照，支持珍惜與修復的意義。'],
['本文敘事觀點是？',['全知第三人稱','第一人稱參與者','完全客觀數據','老闆自傳'],1,'敘事者以「我」敘述所見與參與第一堂課的經驗。'],
['哪個推論超出文本證據？',['老闆在意未完成的工作','社區提供教學場地','老闆因欠債而關店','敘事者重新理解修補'],2,'文章沒有交代欠債或關店的具體原因。'],
['最合適的標題為？',['修補，也是一種看見','世界鞋價統計','空教室安全規定','如何買最便宜的鞋'],0,'標題連結具體修補與看見價值的主題。']]);
passage('chinese','chinese-4','【原創資料】圖書館試辦延長開放。四月晚間平均到館 80 人，五月 120 人；四月開放 20 晚，五月 10 晚。問卷只在五月晚間向現場讀者發放，八成受訪者希望繼續延長。館方另發現晚間照明成本增加，準備比較使用需求與經費後再決定。',[
['五月每晚平均到館人數比四月增加多少？',['20 人','40 人','80 人','120 人'],1,'120−80＝40 人。'],
['四月晚間總到館人次為？',['80','100','1600','2400'],2,'平均每晚 80 人×20 晚＝1600 人次。'],
['五月晚間總到館人次為？',['120','1200','1600','2400'],1,'120×10＝1200 人次。'],
['「平均每晚人數增加，總人次必增加」是否符合此資料？',['符合','不符合，開放晚數不同','不需計算就知道符合','只能看問卷'],1,'五月平均較高，但開放晚數少，總人次反而低於四月。'],
['問卷推論最需要注意？',['所有市民都已受訪','只訪問現場晚間讀者，代表性有限','問題一定完全無效','照明成本等於讀者數'],1,'未到館的人未被涵蓋，不能直接代表所有市民。'],
['館方尚未立即決定，主要因？',['還要比較需求與經費','完全沒有讀者','不相信任何數字','已永久關館'],0,'最後一句直接說明需比較使用需求與經費。'],
['哪項補充資料最有助決策？',['館員最喜歡的顏色','不同時段需求與新增成本','附近花店花色','讀者星座'],1,'需求和成本直接對應是否延長開放的取捨。']]);
passage('chinese','chinese-3','【原創文言短篇】客問園者：「何不盡植速成之木？」園者曰：「速成者可蔭一時，深根者可歷風雨。吾不求今日滿園，惟願後人有蔭。」客默然，乃助之培土。',[
['客人最初建議種什麼？',['全種成長快的樹','全種花','完全不種','只種水草'],0,'「盡植速成之木」即全種成長快速的樹。'],
['「盡」在第一句意為？',['疲憊','全部','盡頭','消失'],1,'「盡植」意為全部種植，「盡」在此作副詞，代表全部或完全。'],
['「可歷風雨」的「歷」最接近？',['經歷、承受','日曆','排列','數目'],0,'深根能承受風雨，歷在此指經過、歷經。'],
['園者更重視？',['立刻看起來滿園','長遠效益','客人讚美','木材售價'],1,'「願後人有蔭」顯示重視後代與長期結果。'],
['「乃助之培土」的「之」指？',['風雨','客人自己','園者','所有後人'],2,'客人於是幫園者培土，之代園者。'],
['客人最後行動顯示？',['較能理解並支持園者','決定摧毀園子','完全拒絕溝通','準備販賣土地'],0,'默然後幫忙培土，支持其接受園者理念的推論。'],
['本文最能呼應何種觀念？',['只看眼前成果','兼顧長遠，耐心累積','不必做任何事','速度永遠不重要'],1,'文章比較短期速成與長期根基，但不是否定所有速度的價值。']]);
passage('chinese','chinese-5','【原創議論】學校討論是否設置安靜午休區。甲說：「有人需要安靜休息，也有人想小聲討論，分區能減少衝突。」乙說：「空間有限，應先調查各班需求並試辦兩週。」丙說：「乙上次活動遲到，所以他的意見不用聽。」主席請大家回到方案的可行性，最後決定公布試辦規則與回饋方式。',[
['甲的核心主張是？',['完全禁止休息','透過分區回應不同需求','取消所有討論','每人必須睡著'],1,'甲以分區減少不同需求之間的衝突。'],
['乙對方案提出的主要考量？',['空間限制與需求證據','只在乎衣著','所有人想法相同','不需試辦'],0,'乙指出空間有限並建議調查與試辦。'],
['丙的回應有何問題？',['提供足夠數據','以個人事件取代對方案的討論','完整分析空間','提出替代方案'],1,'遲到與這次方案的合理性沒有直接關係，是人身攻擊式回應。'],
['主席要求回到可行性，目的為？',['禁止任何反對','聚焦議題與理由','只讓甲發言','立刻結束所有活動'],1,'聚焦方案可讓討論處理真正的決策問題。'],
['試辦兩週主要可提供？',['永遠不變的結論','實際使用與改善的資訊','所有人都滿意的保證','免除任何規則'],1,'試辦可蒐集實施結果作為調整依據。'],
['「分區能減少衝突」屬於？',['待驗證的效果推論','已確定的自然定律','對乙的個人描述','與議題無關'],0,'分區可能有效，仍需以試辦資料檢驗。'],
['公布回饋方式的作用是？',['讓使用者有機會參與修正','使規則永遠不能變','只增加文章字數','取消管理責任'],0,'回饋讓真實使用經驗可進入後續調整。']]);

passage('english','english-6','【Original notice】Green Library: Monday–Friday, 9 a.m.–6 p.m. Saturday, 10 a.m.–4 p.m. Closed on Sunday. Please return borrowed tablets to the desk at least 30 minutes before closing. Books may be returned through the outdoor box at any time.',[
['When does the library open on Saturday?',['9 a.m.','10 a.m.','4 p.m.','6 p.m.'],1,'Saturday 開館時間為 10 a.m.。'],
['By what time should a tablet be returned on Saturday?',['3:30 p.m.','4:30 p.m.','5:30 p.m.','6 p.m.'],0,'週六 4 點關館，平板至少提早 30 分鐘，為 3:30。'],
['What can be returned through the outdoor box?',['Tablets','Books','Food','Chairs'],1,'公告明定 books 可以投入戶外還書箱。'],
['Can you enter the library on Sunday according to the notice?',['Yes, at 9','Yes, at 10','No, it is closed','Only at 6'],2,'Closed on Sunday 表示週日不開放。']]);
passage('english','english-6','【Original story】Lena used to take the bus to school. Last month, her class started a walking group. At first she joined to save money. Now she enjoys talking with friends on the way. On rainy days, however, she still takes the bus.',[
['How did Lena usually get to school before?',['By train','By bus','By bike','On foot'],1,'used to take the bus 表示過去通常搭公車。'],
['Why did she first join the walking group?',['To save money','To become a driver','To avoid her friends','To buy a bus'],0,'At first…to save money，直接交代最初原因。'],
['What does she now enjoy about walking?',['Getting wet','Talking with friends','Missing school','Driving faster'],1,'Now she enjoys talking with friends。'],
['What does she do when it rains?',['Never goes to school','Takes the bus','Walks alone every time','Takes a plane'],1,'最後一句说明雨天仍搭公車。']]);
passage('english','english-6','【Original email】Hi Sam, Our science club will meet in Room 203 this Friday at 3:30. Please bring a notebook, but you do not need to bring any tools. Ms. Lin will provide them. If you cannot come, let me know by Thursday. — Jo',[
['Where will the club meet?',['Room 302','Room 203','The library','Sam’s home'],1,'信件指定 Room 203。'],
['What should Sam bring?',['A notebook','A hammer','A camera','A lunch box'],0,'Please bring a notebook。'],
['Who will provide the tools?',['Sam','Jo’s brother','Ms. Lin','No one'],2,'Ms. Lin will provide them，them 指工具。'],
['If Sam cannot attend, when should he tell Jo?',['By Thursday','After Friday','Next month','Sunday night'],0,'let me know by Thursday，最遲週四告知。']]);
passage('english','english-6','【Original information】A school garden used 200 liters of water each week in April. In May, students collected rainwater and used only 140 liters of tap water per week. The garden still needed 200 liters in total. They used the rainwater to supply the rest.',[
['How much tap water was used weekly in May?',['60 liters','140 liters','200 liters','340 liters'],1,'五月每週使用自來水 140 公升。'],
['How much rainwater was used each week?',['40 liters','60 liters','140 liters','200 liters'],1,'總需求 200，扣除自來水 140，雨水供應 60。'],
['Did the total weekly water need change?',['Yes, to 140','Yes, to 60','No, it stayed at 200','The text says nothing'],2,'still needed 200 liters in total，總需求不變。'],
['What does “the rest” refer to?',['The remaining 60 liters','All students','The next month','A break'],0,'the rest 指總需求扣除自來水後的剩餘部分。']]);
passage('english','english-6','【Original dialogue】Mia: Shall we ride our bikes to the museum? Ken: I would like to, but my bike has a flat tire. Mia: Then let’s take the train. The station is only five minutes from here. Ken: Good idea. The next train leaves at 10:20, so we should leave now.',[
['Why can’t Ken ride his bike?',['He dislikes museums','His tire is flat','It was stolen','He has no time today'],1,'flat tire 指輪胎沒氣。'],
['How will they travel to the museum?',['By train','By boat','By car','By plane'],0,'Mia 提議 take the train，Ken 同意。'],
['How far is the station in terms of walking time given?',['Five minutes','Twenty minutes','An hour','Two hours'],0,'station is only five minutes from here。'],
['Why does Ken suggest leaving now?',['To catch the next train','To fix every bike','To close the museum','To avoid Mia'],0,'下一班 10:20 出發，因此要盡快前往車站。']]);
passage('english','english-6','【Original story】When Tom found a wallet outside a bakery, he did not open it to count the money. He gave it to the shop owner, who contacted the person named on a card inside. Later, the owner of the wallet thanked Tom and offered him a reward. Tom politely refused.',[
['Where did Tom find the wallet?',['Inside a school','Outside a bakery','On a train','At home'],1,'第一句交代 outside a bakery。'],
['Who contacted the wallet’s owner?',['The shop owner','Tom’s teacher','A bus driver','No one'],0,'who 承接 shop owner，由店主聯繫。'],
['What did Tom do with the reward?',['Accepted it','Asked for more','Politely refused it','Lost it'],2,'最後一句 politely refused 說明婉拒獎勵。'],
['Which description is best supported?',['Tom wanted to keep the wallet','Tom acted honestly','Tom owned the bakery','Tom counted every coin'],1,'交出皮夾並拒絕獎勵，支持誠實行動；其他無依據。']]);
passage('english','english-6','【Original notice】Reuse Day: Bring clean items you no longer need. You may exchange up to three items. Broken electronics and food are not accepted. Any items left after the event will be donated, with the owners’ permission, to a local community center.',[
['What kind of items should people bring?',['Clean items they no longer need','Any food','Broken computers','Only new cars'],0,'首句明定 clean items you no longer need。'],
['What is the maximum number of items a person may exchange?',['One','Two','Three','Ten'],2,'up to three items 表示最多三件。'],
['Which item is NOT accepted?',['A clean book','A clean scarf','A broken radio','A clean bag'],2,'broken electronics 不收，壞收音機屬此類。'],
['When can leftover items be donated?',['With owners’ permission','Without telling anyone','Only if broken','Before the event begins'],0,'需取得 owners’ permission，即物主同意。']]);

passage('geography','geography-7','【原創資料】某社區夏季用水：家庭 50%、農業 30%、其他 20%。冬季家庭用水量不變，農業用水減半，其他不變。夏季總量以 100 單位計。',[
['冬季總用水為幾單位？',['70','75','85','100'],2,'家庭 50＋農業 15＋其他 20＝85。'],
['冬季家庭用水占比會？',['下降','不變','上升','變零'],2,'家庭量不變但總量下降，所以占比從 50% 升為 50/85。'],
['農業季節用水差異可能與什麼有關？',['作物及降雨條件','國旗顏色','書本大小','時間不存在'],0,'農業用水需求受栽種與環境條件影響。'],
['僅憑本資料可以確定？',['所有社區比例相同','此社區冬季總量較低','全球用水減少','家庭人口減半'],1,'推論限於給定社區與假設，不能擴大到全球。']]);
passage('civics','civics-6','【原創情境】某校討論購買運動器材。學生代表先公開預算，再蒐集各班意見，比較價格、使用人次與維護費，最後公布理由並開放回饋。',[
['公開預算主要有助於？',['資訊透明與監督','取消責任','保證零爭議','只讓少數人知道'],0,'讓參與者理解資源與限制，有助監督。'],
['比較維護費的原因是？',['購買價格不是全部成本','維護永遠免費','只看外觀','使用者不重要'],0,'總成本還包含使用期間的保養維修。'],
['蒐集各班意見主要體現？',['公共參與','完全獨裁','拒絕協商','只看多數姓名'],0,'意見蒐集讓受影響者參與決策。'],
['回饋指出某群體無法使用新器材，應？',['直接忽略','檢討可及性與改善方案','禁止回饋','嘲笑使用者'],1,'公共設施應考慮不同需求，並依結果調整。']]);

export const listening = [
['The train leaves at nine fifteen. Please arrive ten minutes early.','When should the listener arrive?',['9:05','9:15','9:25','10:15'],0,'9:15 提早十分鐘是 9:05。'],
['I wanted to buy a red bag, but it was too expensive. I bought the blue one instead.','Which bag did the speaker buy?',['Red','Blue','Green','Black'],1,'instead 表示改買藍色那個。'],
['It is raining outside. Take an umbrella before you leave.','What should the listener take?',['A camera','An umbrella','A ticket','A book'],1,'說話者要求帶 umbrella。'],
['The library is across from the bank, next to the post office.','What is across from the library?',['The bank','The park','The school','The station'],0,'across from 表示在...對面，因此銀行在圖書館正對面。'],
['I cannot join you on Saturday. Can we meet on Sunday morning instead?','When does the speaker suggest meeting?',['Friday night','Saturday morning','Sunday morning','Monday afternoon'],2,'改約 Sunday morning。'],
['These apples are thirty dollars each. I would like two, please.','How much do the two apples cost?',['30 dollars','40 dollars','60 dollars','90 dollars'],2,'每顆蘋果 30 元，買兩顆共需 30×2＝60 元。'],
['Please turn off the lights when you are the last person to leave the room.','What should the last person do?',['Open the windows','Turn off the lights','Buy a lamp','Lock the desk'],1,'要求最後離開的人關燈。'],
['I used to dislike vegetables, but now I eat them every day.','What is true about the speaker now?',['Never eats vegetables','Eats vegetables daily','Only eats fruit','Dislikes all food'],1,'now…every day 指現在每天吃蔬菜。'],
['The basketball game has been moved from the outdoor court to the gym because of the weather.','Where will the game take place?',['The gym','The library','The outdoor court','The classroom'],0,'地點由室外球場改到體育館 gym。'],
['My sister is older than me, but my brother is younger.','Who is the youngest of the three?',['The speaker','The sister','The brother','They are the same age'],2,'sister 比說話者年長，而 brother 比說話者年幼，因此弟弟最年輕。'],
['I borrowed this book last week. I need to return it tomorrow.','What does the speaker need to do tomorrow?',['Write a book','Return the book','Buy a book','Sell the book'],1,'return it tomorrow，明天還書。'],
['The soup is too hot. Let us wait a few minutes before eating it.','Why will they wait?',['The soup is cold','The soup is too hot','They have no bowls','They lost the recipe'],1,'too hot 表示湯太燙，因此需要等待幾分鐘後再喝。'],
['Our club meets twice a week, on Tuesday and Friday.','How often does the club meet?',['Every day','Once a week','Twice a week','Once a month'],2,'twice a week 即每週兩次。'],
['I looked for my keys in my bag, but I found them under the table.','Where were the keys?',['In the bag','Under the table','On the roof','In the car'],1,'but 之後交代實際找到的位置。'],
['This shirt is a little small. Do you have a larger one?','What does the customer want?',['A smaller shirt','A larger shirt','A different book','A shorter belt'],1,'larger one 指尺寸較大的襯衫。'],
['We planned to go hiking, but Dad hurt his foot. We will stay home and watch a movie.','What will the family do?',['Go hiking','Watch a movie at home','Run a race','Visit a museum'],1,'因父親腳受傷，原定健行取消，改為留在家中看電影。'],
['The first bus is full. We will have to take the next one.','Why are they waiting for another bus?',['The first bus is full','They hate buses','The station is closed','They have arrived'],0,'full 表示客滿，因此必須等待下一班公車。'],
['Please write your name at the top of the page before you answer the questions.','What should students do first?',['Answer every question','Write their names','Close the book','Draw a picture'],1,'before 表示先在頁面上方寫姓名。'],
['The concert starts at seven, and it lasts for two hours.','When will the concert end?',['At seven','At eight','At nine','At ten'],2,'七點開始，持續兩小時，九點結束。'],
['I chose this bottle because I can use it again instead of throwing it away after one drink.','Why did the speaker choose the bottle?',['It is reusable','It is broken','It is the heaviest','It can only be used once'],0,'use it again 表示可重複使用。']
].map((q,i)=>({id:'listening-'+(i+1),subject:'english',unitId:'english-6',audio:q[0],prompt:q[1],options:q[2],answer:q[3],explanation:q[4],hint:'注意人物、時間、轉折詞與行動。',difficulty:'聽力',source:'本站原創・瀏覽器合成語音'}));
export const constructed=[
 {id:'constructed-1',title:'數學非選擇題：票價方案',prompt:'遊樂場方案 A 每人 120 元；方案 B 團體固定費 600 元，另每人 70 元。設人數為 n。\n（1）寫出兩方案總費用。\n（2）至少幾人時，方案 B 比 A 便宜？請列式並解釋。',solution:'A＝120n；B＝600＋70n。\n600＋70n<120n → 600<50n → n>12。\n人數是正整數，因此至少 13 人。12 人兩方案都是 1440 元，只是相等。',rubric:['正確寫出 A、B 兩式','列出嚴格不等式並求得 n>12','說明整數條件，答至少 13 人']},
 {id:'constructed-2',title:'數學非選擇題：長方形花圃',prompt:'用 24 公尺圍籬圍成一個長方形花圃，四邊都要圍。設寬為 x 公尺。\n（1）用 x 表示長與面積。\n（2）求最大面積並說明理由。',solution:'2×(長＋寬)＝24，長＝12−x，且 0<x<12。\n面積 A＝x(12−x)＝−x²＋12x＝−(x−6)²＋36。\n平方項最小為 0，所以 x＝6 時面積最大為 36 平方公尺。',rubric:['長＝12−x 且面積 x(12−x)','能以配方、函數或合理推理求極值','指出寬長皆 6 m，最大面積 36 m²']}
];
