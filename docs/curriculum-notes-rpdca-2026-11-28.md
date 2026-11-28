# 國中課綱重點筆記 RPDCA 紀錄

查核日期為 2026 年 11 月 28 日。交付範圍為知行學院的國一至國三六學期、八大領域、21 門站內科目及 188 個既有單元。本輪新增 21 份課綱補強。

## R｜研究

- 從均一教育平台的 115 學年度上學期資源包核對最新入口，再查看七、八、九年級數學的均一版、基礎／課習／會考教材與出版社編排。七年級整數運算、指數與幾何都可拆成較短的學習步驟。均一的「類版本」欄可協助搜尋學生的課本進度。 [均一學期資源包](https://www.junyiacademy.org/event/115-1-semester-junyi-academy-courses/) · [七年級](https://www.junyiacademy.org/topics/math-7) · [八年級](https://www.junyiacademy.org/topics/math-8) · [九年級](https://www.junyiacademy.org/topics/math-9) · [課中差異化教材](https://www.junyiacademy.org/topics/diff-m7)
- 確認均一國中英語、公民，及其酷課雲合作專區所提供的生物、理化、地科、地理入口。這些來源適合在相應章節提供影音或練習連結。 [國中英語](https://www.junyiacademy.org/topics/eng-junior) · [國中公民](https://www.junyiacademy.org/topics/middle-school-civics) · [酷課雲學科專區](https://www.junyiacademy.org/topics/cooc)
- 正式學習範圍以教育部發布的總綱與領綱為準。核對數學領綱 PDF 實體第 38–46 頁，以行首編碼擷取國中三個年級的學習內容條目，合計 73 條。既有 `official-alignment-data.js` 中 49 條出現在數學單元索引，24 條尚未列入。逐一讀取缺列條目及相鄰前提。部分內容（如統計集中趨勢和運算律）已在原課程分散出現，本輪納入獨立筆記及對應頁碼。 [國教院正式領綱入口](https://www.naer.edu.tw/PageSyllabus?fid=52) · [教育部數學領綱](https://edu.law.moe.gov.tw/LawContent.aspx?id=GL001788) · [教育部總綱](https://edu.law.moe.gov.tw/LawContent.aspx?id=GL002057)
- 國中各領域補充依個別領綱或官方教材核對。依學校語別選習提供路徑，保留國家語言的教材和音像差異。會考題本與聽力重返正式試題入口。 [教育部因材網](https://adl.edu.tw/) · [教育部本土語言資源網](https://mhi.moe.edu.tw/) · [會考官方歷屆試題](https://cap.rcpet.edu.tw/examination.html)
- 學習流程採示範例題、主動提取、回饋與間隔練習。隔天、第三天、一週是供學生起步的示例，可依答題和保留時間調整。 [IES 實務指南](https://ies.ed.gov/ncee/WWC/PracticeGuide/1/Published) · [提取練習原始實驗](https://pubmed.ncbi.nlm.nih.gov/16507066/) · [間隔練習統合分析](https://pubmed.ncbi.nlm.nih.gov/16719566/)

## P｜規劃

每個站內單元提供一份能獨立閱讀的筆記，包含核心觀念、三項重點、演算或分析示範、易錯處、遮答案自測和課綱出處。數學保留原本 49 條索引並補 24 條。其餘領域各選一至數項有具體可練習的補強主題。網頁按學期、科目、類型與課綱代碼搜尋，列印採 A4 灰階、每章一頁並保留書寫空間。

## D｜執行

| 領域 | 本輪補強 | 可見學習證據 |
| --- | --- | --- |
| 語文 | 生活英語聽力、澄清回述，以及本土語文與臺灣手語選習路徑 | 轉述更動後的地點與時間，或完成有語別與來源的練習卡 |
| 數學 | 13 份筆記補全索引缺列的 24 個代碼 | 描述運算條件、作圖、解釋證明依據和檢驗機率假設 |
| 自然科學 | 食物網、碳循環與非生物因子 | 用同一張食物網分別解釋能量和物質，辨識觀察資料的限制 |
| 社會 | 公共意見、社群資訊與校園參與 | 提出一個中立調查問題和可查證的改進方案 |
| 藝術 | 視覺文化、作品解讀與觀眾測試 | 以可指認的畫面線索支持解讀並測試海報 |
| 綜合活動 | 服務學習的需求、行動與反思 | 用使用者能完成的任務檢查方案是否改善困難 |
| 科技 | 數位資料、陣列、缺失值與資料清理 | 區分零值與缺值，保留清理前後的資料與解讀 |
| 健康與體育 | 校園與社區安全觀察和通報 | 清楚回報位置、狀況和可行改善 |

網頁與 PDF 使用同一份章節內容和列印樣式。既有講義和完整課程也可從筆記頁或學習館取得。補強的學期是本站建議進度，各校依教材實施。

## C｜查核

- `node scripts/check-curriculum-notes.mjs` 逐章檢查 209 個網頁及 PDF 的配對、課頁入口、六冊頁數、答案收合與數學索引。GitHub Pages 的既有 `npm test` 與 `npm run build` 均會執行該檢查。
- PDF 以 Chromium 從相同 HTML 產生。檢查每章頁數、A4 尺寸、關鍵標題可擷取、整學期冊序，以及代表頁的字型、換行和書寫區。
- 瀏覽器查核涵蓋搜尋、篩選條件回復、空結果、答案展開、手機版、PDF 下載及原課頁入口。

## A｜修正與維護

- 首輪列印發現大洋洲地理筆記的來源區另占一頁。校訂時也發現沿用舊稿會造成「澳洲沒有原生胎盤類哺乳動物」的誤解。重寫該章，用地形與氣候的資料比較練習取代過長段落，並加入澳洲博物館的特有性資料。 [澳洲博物館](https://australian.museum/learn/animals/mammals/endemism-in-australian-mammals/) · [澳洲氣象局](https://www.bom.gov.au/resources/learn-and-explore/climate-knowledge-centre/australian-climate-zones)
- 重新生成時執行 `node scripts/build-curriculum-notes.mjs --pdf`。使用已安裝的 Playwright 與 Chromium，亦可用 `CODEX_NODE_MODULES` 和 `CHROME_PATH` 指向本機套件與瀏覽器。完整校驗後將 `dist/notes/` 隨 `main` 的 GitHub Pages 工作流程發布。
- 此次查核能確認 188 既有站內單元的重點筆記、八大領域的補強，以及數學 73 條內容的對應索引。其他領域的逐條領綱覆蓋、各出版社每冊與語別的教材完整度仍需逐步審查。校訂課程和社團專題以各校規劃為準。
