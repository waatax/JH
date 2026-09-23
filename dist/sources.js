export const sources=[
{id:'general',name:'國家教育研究院｜十二年國教課綱總綱',url:'https://www.naer.edu.tw/PageSyllabus?fid=52',note:'採 111 學年度實施修正版確認國中八大領域、第四學習階段及語文選修結構。'},
{id:'index',name:'國家教育研究院愛學網｜領域課綱原文',url:'https://stv.naer.edu.tw/teaching/course_outline.jsp',note:'提供各領域與本土語文、臺灣手語官方 PDF。學習表現和學習內容須同時理解。'},
{id:'chinese',name:'語文領域・國語文課綱',url:'https://stv.naer.edu.tw/data/course_outline/pta_18510_4703638_59125.pdf',note:'聆聽、口語、識字與寫字、閱讀及寫作共同構成語文學習。'},
{id:'english',name:'語文領域・英語文課綱',url:'https://stv.naer.edu.tw/data/course_outline/pta_18518_3555074_59836.pdf',note:'語言技能、學習策略與文化理解；本站字彙並未宣稱逐字覆蓋附錄字表。'},
{id:'math',name:'數學領域課程手冊（113 年 3 月更新）',url:'https://www.naer.edu.tw/upload/1/16/doc/2021/數學領域課程手冊（113年3月更新版）.pdf',note:'以數與量、代數、幾何、函數及統計機率組織概念與推理。'},
{id:'social',name:'社會領域課綱',url:'https://stv.naer.edu.tw/data/course_outline/pta_18535_6408773_60398.pdf',note:'歷史、地理與公民重視探究、證據及社會參與，不只有記憶。'},
{id:'science',name:'教育部｜自然科學領域發布資料',url:'https://edu.law.moe.gov.tw/LawContent.aspx?id=GL001823',note:'結合知識與探究，評量包括觀察、提問、規劃、分析與表達。'},
{id:'arts',name:'藝術領域課綱',url:'https://stv.naer.edu.tw/data/course_outline/pta_18533_2143291_60289.pdf',note:'視覺藝術、音樂、表演藝術需兼顧表現、鑑賞及實踐。'},
{id:'integrative',name:'綜合活動領域課綱',url:'https://stv.naer.edu.tw/data/course_outline/pta_18531_5238547_60214.pdf',note:'生活實踐、自我發展與社會環境互動；以任務紀錄補充知識測驗。'},
{id:'technology',name:'科技領域課綱',url:'https://stv.naer.edu.tw/data/course_outline/pta_18529_8438379_60115.pdf',note:'生活科技設計實作與資訊科技運算思維，需以作品及過程評量。'},
{id:'health',name:'健康與體育領域課綱',url:'https://stv.naer.edu.tw/data/course_outline/pta_18522_1560772_59945.pdf',note:'知識之外，仍需動作表現、態度與實際健康行動的觀察。'},
{id:'cap',name:'116 年國中教育會考問與答',url:'https://cap.rcpet.edu.tw/release_item/116年國中教育會考問與答.pdf',note:'查核日期 2026-09-23。確認五科、寫作、時間、題數區間與命題依據。'},
{id:'cap-home',name:'國中教育會考官方網站',url:'https://cap.rcpet.edu.tw/',note:'歷屆試題、正式答案、當年度公告以此官方入口為準。本站題目為原創，非官方真題。'},
{id:'writing',name:'國中教育會考｜寫作測驗說明',url:'https://cap-rcpet.rcpet.edu.tw/test5-1.html',note:'寫作重視立意取材、結構組織、遣詞造句、錯別字與格式標點；本站不自動核發六級分。'}
];
export const examSpecs=[
{id:'chinese',name:'國文',subjects:['chinese'],minutes:70,count:40,official:'38–46 題',note:'含原創短文、文言、論證與資料題組'},
{id:'english',name:'英語閱讀',subjects:['english'],minutes:60,count:40,official:'40–45 題',note:'句型、閱讀、公告與生活情境'},
{id:'math',name:'數學',subjects:['math'],minutes:80,count:25,official:'23–28 題選擇＋2 題非選擇',note:'25 題選擇＋2 題非選擇自評'},
{id:'social',name:'社會',subjects:['history','geography','civics'],minutes:70,count:50,official:'50–60 題',note:'歷史、地理、公民與資料判讀'},
{id:'science',name:'自然',subjects:['biology','physics','chemistry','earth'],minutes:70,count:45,official:'45–55 題',note:'生物、理化、地科與科學探究'},
{id:'listening',name:'英語聽力',subjects:['english'],minutes:25,count:20,official:'20–30 題',note:'瀏覽器合成語音；非官方錄音與播放流程'}
];
export const writingPrompts=[
{title:'一次改變想法的經驗',lead:'有時，我們原本深信不疑的想法，會因一次對話、一段經驗或一個發現而改變。請敘述一次你改變想法的經驗，並說明這段轉變帶給你的體會。',plan:['我原本如何想？','什麼具體事件或細節帶來衝突？','我如何重新理解？','改變後，我會如何行動？']},
{title:'當我願意再試一次',lead:'面對不順利的事，再試一次可能需要勇氣，也需要改變方法。請以自身經驗或觀察，寫出一次重新嘗試的過程，並說明你對堅持與調整的理解。',plan:['第一次遇到什麼困難？','什麼讓我願意再試？','我具體改變了什麼方法？','結果如何？有什麼還沒做到？']},
{title:'留一個位置給不同的聲音',lead:'團體中出現不同的意見，可能帶來衝突，也可能讓我們看見新的角度。請寫出你曾經歷或觀察的一次意見分歧，說明如何回應及你的反思。',plan:['兩方各自重視什麼？','我最初如何回應？','哪一段對話或行動最關鍵？','如何兼顧表達與傾聽？']}
];
