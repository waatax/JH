# 2026-11-23 知行超學習系統（Ultralearning OS）全站重構報告

## 1. 核心目標與雙書理論基底

本次全站深度重構以 **Scott H. Young** 兩本認知科學與學習方法著作——***Ultralearning***（9 大原則）與 ***Get Better at Anything***（See · Do · Feedback 12 箴言）——為設計骨幹，針對任何起點的學習者打造一條**從「掌握國中 21 科 188 單元」到「會考 5A++」再直上「學測 14–15 級分頂頂標」**的科學化自學閉環。

## 2. 雙書洞察與全站功能落地對照

| 雙書核心洞察 | 書籍出處 | 知行學院落地模組 |
|---|---|---|
| **元學習地圖（Why / Concepts · Facts · Procedures / How）** | *Ultralearning* P1 | 全站 188 單元專屬元學習藍圖（`dist/ultralearning-data.js`）＋ `#/ultralearning` 超學習指揮總部 |
| **認知負荷分階聚焦（See ➔ Do ➔ Feedback）** | *GBAA* Intro, Ch.1–2, Ch.5 | 每課頂部「認知負荷聚焦模式切換器」（全覽深研 / SEE 看懂示範 / DO 補全與回想 / FEEDBACK 真題避坑） |
| **臨摹 ➔ 補全 ➔ 原創（Copy ➔ Complete ➔ Create）** | *GBAA* Ch.2 & Ch.5 | 全站 188 單元專屬互動式「挖空補全題（Completion Problem）」，從真實思維鏈拆出關鍵第 2 步供學生主動補全 |
| **專家隱性知識顯性化（PARI 認知任務分析）** | *GBAA* Ch.4 | 全站 188 單元「PARI 專家思維透視卡」（Precursor 題眼 ➔ Action 首步 ➔ Result 結果 ➔ Interpretation 邊界） |
| **85% 難度甜蜜點雷達 ＋ 直接實戰後特訓（Direct-Then-Drill）** | *GBAA* Ch.5, *Ultralearning* P4 | 即時計算答對率落點（<65% 負荷過高 / 65–88% 黃金甜蜜點 / >88% 升級學測 Overkill），自動排序前 6 大速率瓶頸單元一鍵特訓 |
| **變異勝於重複 × 練習必須貼近現實（無提示交錯盲測）** | *GBAA* Ch.7 & Ch.10, *Ultralearning* P3 | 內建「無提示交錯變異盲測（Blind-Topic Interleaved Trainer）」，作答時自動隱藏科目與單元標題，逼迫大腦像真實考場般辨識模型 |
| **主動提取：白紙自由回想 ＋ 個人問題本（Question Book）** | *Ultralearning* P5 | 每課內建「遮蔽講義＋白紙自由回想關鍵詞覆蓋率檢測」與「個人問題本生成器」，並於 `#/review` 新增獨立問題本翻牌自測分頁 |
| **深度直覺掙扎計時器（Struggle Timer）** | *Ultralearning* P8 | 每課內建 2 分鐘／5 分鐘深度思考掙扎計時器，訓練遇難題先自主搜尋問題空間而不秒看解答 |
| **信心校準 × 錯因元回饋 × 反轉重學（Unlearning）** | *GBAA* Ch.9 & Ch.11, *Ultralearning* P6 | `#/quiz` 導入「🎯 確定 / 🤔 猶豫 / 🎲 猜測」信心校準與錯因標籤；`#/result` 與 `#/review` 優先標示並推播「🚨 高信心答錯（危險知識盲區）」 |
| **五階漸進暴露勇氣天梯 ＋ 五分鐘微啟動法則** | *GBAA* Ch.12, *Ultralearning* P2 | `#/ultralearning` 與首頁指揮列整合 Lv.1–Lv.5 漸進暴露階梯，克服數理恐懼、拖延與考場焦慮 |
| **國中全科 188 單元 ➔ 學測 7 科頂頂標垂直升維（Overkill）** | *Ultralearning* P3, *GBAA* Ch.6 & Ch.8 | 全 188 單元串聯 108–115 學測 53 卷 2,216 題真題；`#/gsat` 與 `#/ultralearning` 即時顯示七大學測考科（國綜/國寫/英/數A/數B/自然/社會）之國中先備奠基度 |

## 3. 新增與升級檔案

- `scripts/build-ultralearning.mjs`：188 單元元學習地圖、PARI 專家線索、挖空補全題、自由回想關鍵詞與學測七科頂標藍圖生成器。
- `dist/ultralearning-data.js`：全站 188 單元 × 7 大學測考科結構化資料庫。
- `dist/ultralearning.js` & `dist/ultralearning.css`：核心認知科學分析演算法、指揮中心、單元聚焦模式、互動工作坊與四主題響應式樣式。
- `dist/app.js`、`dist/engine.js`、`dist/index.html`、`dist/learning-entrance.js`、`dist/gsat-interactive.js`、`dist/quest/view.mjs`、`dist/quest/quest.css`、`dist/sw.js`（快取升級至 `zhixing-cache-v34`）。
- `scripts/ultralearning.test.mjs`：8 大自動化驗證測試（188 單元完整性、85% 甜蜜點分類、瓶頸排序、自由回想、信心校準、暴露階梯、盲測引擎與零 `undefined`/`NaN` 渲染檢查）。

## 4. 驗證與雙輪瀏覽器迭代修復

- 全站自動化測試（`npm test` + `npm run build`，涵蓋 22 組 Node 單元測試、`validate.mjs`、`check-expansion.mjs`、`test_all_pages.mjs`、`audit-system-health.mjs` 與 JH Quest 77/77 QA）100% 通過。
- 透過實機瀏覽器逐頁檢核並完成兩輪迭代修復：消除全站舊有 `<svg height="auto">` Console 錯誤（達成 0 Console Error）、修正淺色／深色模式下 Hero 按鈕與徽章對比度、優化 85% 甜蜜點量尺與學測卡片斷行、調整聚焦模式切換列避免被頂部導覽列遮擋、過濾自由回想通用詞並去重問題本自動生成文字。
