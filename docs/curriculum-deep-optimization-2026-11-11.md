# 2026-11-11 國中全科 188 單元教學頁面深度優化報告（歷屆會考真題回推 × 108 課綱 × 三大版本教材對齊 × 雙階段五步詳解）

本報告完整記錄依循**「深度思考 ➔ 規劃 ➔ 優化規劃 ➔ 迭代規劃 ➔ 執行 ➔ 效果確認 ➔ 優化」**七階段閉環流程，針對全站 188 個單元（橫跨國一至國三共 6 個學期、8 大領域、21 個學科）所進行的深度教學內容與歷屆會考實戰題型優化。

---

## 一、七階段閉環執行軌跡

### 1. 深度思考（Deep Thinking）
- **核心問題診斷**：
  1. 檢視全站 188 個單元與 `dist/cap-bank.json`（109～115 年共 1,674 題歷屆會考真題）、`dist/official-alignment-data.js`（108 課綱學習內容與學習表現指標）及 `dist/publisher-matrix.js`（康軒、翰林、南一三版本教材矩陣）之關聯，發現先前版本在自然（55 單元）、社會（40 單元）、藝能生活科技（34 單元）與部分語文單元（5 單元）的例題選項中，存在通用模板式干擾項（如「實驗中所有測量結果皆可直接套用理想模型…」），缺乏學科真實數據與誘答鑑別度。
  2. 學生在閱讀完課程講義後，需要明確知道**「這課在歷屆會考到底怎麼考（題型清單）」**、**「課本定義與考場真題之間有哪些微觀知識斷層（充足度補強）」**，並透過**「基礎典範例題＋進階變形實戰題」雙題演練與五步階梯詳解**完成從理解到獨立解題的閉環。
  3. 針對 `dist/cap-reviewed.js` 中 115 年會考數學科原先標記為 `partial`（部分涵蓋）的 11 道進階複合題型（如最大真因數反推、雙向列聯表否定聯集排除、圓與菱形重疊弦心距、正六邊形 30-60-90 邊心距與旋轉極值等），需在 `dist/supplements.js` 直接補齊專屬教學表格與實作演練。

### 2. 規劃（Planning）
- 設計每個單元教學頁面末端（`#step-exam-types`）的完整五模組架構：
  - **Module 0**：零基礎小白 ➔ 會考 A++ 頂標 三階通關藍圖（`zeroToTopLadder`）
  - **Module 1**：會考高頻題型分析矩陣、歷屆真題回推統計與三大版本聚焦點（`examType`）
  - **Module 1.5A**：歷屆會考（109～115）三大核心題型分類表與破題 SOP（`questionTypeList`：Type A 基礎保底、Type B 圖表轉譯、Type C 逆向壓軸）
  - **Module 1.5B**：108 課綱 × 會考真題回推微觀知識充足度補強講義（`knowledgeSufficiencyPatch`：隱含前提邊界、雙概念切分線、考場逆向檢核防線）
  - **Module 2 & Module 3**：雙階段互動練習（【實戰例題一】`workedExample` ＋【進階練習二】`followUpPractice`），每題均具備 4 個具體學科選項、點擊即時診斷回饋與自動展開之 5 步階梯式詳解。

### 3. 優化規劃（Optimized Planning）
- 將 `dist/cap-bank.json` 的 1,674 道歷屆真題依 `unitIds` 自動索引對接至各單元：
  - 在 `examType.knowledgeAuditDetail` 與 `questionTypeList` 中直接標註該單元對應之歷屆會考年份、題號與考查技能（如概念辨析、圖表判讀、綜合逆推）。
  - 在 `followUpPractice` 中，優先選用無圖片依賴之歷屆會考真實考題或結合 `lessonDeepening`（並排概念比較與遷移問題）之逆向思辨題，確保兩道練習題角度互補。

### 4. 迭代規劃（Iterative Planning）
- 確保全站主教材頁面（`dist/exam-types-data.js`）、補充講義（`dist/supplements.js`）、會考逐題初核紀錄（`dist/cap-reviewed.js`）與遊戲化闖關引擎（`scripts/build_quest_course.mjs` 產出之 `dist/quest/course/*.json`）100% 同步更新，將新增之 `q.${uid}.cap.followup` 納入 `mastery` 精熟池，讓闖關題庫總數提升至 **4,844 個學習與測驗項目**。

### 5. 執行（Execution）
- 撰寫並執行 `scripts/upgrade-builders.mjs`，全面翻新 `language-builder.mjs`、`science-builder.mjs`、`social-builder.mjs`、`arts-life-builder.mjs` 共 134 個單元的 `workedExample`，徹底消除所有模板化選項，全面替換為具真實學科情境、數據與迷思誘答的 4 選項考題。
- 升級 `scripts/build-exam-types-data.mjs` 並重新編譯 `dist/exam-types-data.js`，為全部 188 個單元注入 `questionTypeList`（564 項核心題型分類）、`knowledgeSufficiencyPatch`（564 項微觀知識補強點）與 `followUpPractice`（188 道進階實戰題與 940 個五步詳解步驟）。
- 擴充 `dist/supplements.js` 補齊 `math-2`、`math-3`、`math-4`、`math-6`、`math-8`、`math-14`、`math-15`、`math-16`、`math-17`、`math-20`、`math-23`、`math-24` 之會考常見卡點補充表，並更新 `dist/cap-reviewed.js` 完成 115 年數學全卷 27 題 `covered` 覆蓋驗證。

### 6. 效果確認（Verification）
- 執行 `node scripts/check-expansion.mjs` 驗證字數擴增指標：
  - **歷史基準字數（`c54dc06`）**：`118,267` 字
  - **優化前基準字數（`preOptBaseline`）**：`575,580` 字
  - **前次狀態字數**：`969,376` 字
  - **本次優化後總字數（`afterCharacters`）**：**`1,794,511` 字**
  - **相較於 `preOptBaseline`（575,580 字）淨增**：**`+1,218,931` 字（整體成長 `+211.77%`，單一單元最低成長 `+125.11%`）**
  - **相較於前次狀態（969,376 字）淨增**：**`+825,135` 字（整體再成長 `+85.12%`，遠超 30% 擴增目標）**
  - **不重複原創教學新增字數（`uniqueNewCharacters`）**：**`1,579,661` 字**
- 執行 `npm test` 與 `npm run build`：全站 19 個測試套件、77 項 QA 驗證全數 100% 通過（0 失敗）。

### 7. 優化與部署（Optimization & Deployment）
- 更新 Service Worker 快取版本（`zhixing-cache-v31`）確保離線 PWA 使用者立即取得最新講義與題庫，並同步更新 `README.md` 與 GitHub Pages 線上環境。
