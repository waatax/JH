# 2026-11-23 全課程深度審查與「學會 · 學好 · 有興趣 · 會應用」四維升級報告

## 1. 深度內容鑑識審查發現（Deep Curriculum Audit）

針對全站 21 科、188 單元逐一比對教材表、明確知識點、研經板書、趣味快問快答與互動實驗室後，揪出並根治五大實質教學缺口：

1. **14 處跨章節／跨洲錯置與對調教學表（已全面修復並同步重建全下游資料庫）**：
   - `physics-8`（浮力與阿基米德原理）⇄ `physics-9`（液體壓力與大氣壓力）原本整份對調，已完整對正。
   - `physics-11`（靜電現象與庫侖定律）原誤植為電與磁，已重寫為摩擦／感應起電、接地與庫侖定律。
   - `earth-6`（氣候變遷與永續探究）原誤植為岩石循環，已重寫為溫室效應、暖化證據與淨零永續行動。
   - `earth-10`（天體引力、潮汐與月相）與 `earth-12`（日食月食與太陽系）原錯置，已完整校正。
   - `biology-13`（人體神經系統與腦部構造）原誤植為內分泌激素，已重寫為大腦／小腦／腦幹／脊髓分工。
   - `geography-3`（臺灣人口、產業與都市）、`geography-9`（季風亞洲）、`geography-12`（西亞中亞與石油地緣政治）原分別誤植氣候、非洲與歐洲內容，已全數重寫對齊。
   - `civics-10`（地方自治與地方創生）、`english-8`（頻率副詞、can 與 There is/are）、`health-2`（飲食資訊與營養標示）、`home-1/2/3`（家政三單元輪轉錯位）、`scout-2/3`（定向與無痕山林對調）、`local-3`（臺灣手語五要素與非手控語法，並修正「民間民間」錯字）全面校正。
   - 同步重建 `dist/explicit-knowledge-points.js`（564 知識點）、`dist/exegesis-data.js`（188 研經板書）、`dist/joyful-learning.js`、`dist/ultralearning-data.js` 及 JH Quest `dist/quest/course/items.json`（5,408 互動題，940 關卡）。

2. **根除模板化話術與無效誘答（提升「有興趣」與「學好」）**：
   - 重寫 `scripts/build-joyful-learning.mjs`：改採 40+ 類單元主題專屬的臺灣青少年生活情境破冰句，移除全站重複的「高達 80%」無來源話術，並將 564 道閃電三連擊（`kpBlitz`）的卡通化無效選項（如「故意違反…」）全面替換為具真實鑑別力的同學科核心判準誘答。

3. **互動概念實驗室擴充（9 座 ➔ 14 座，涵蓋 8 大科目）與單元直連（提升「學會」＋「有興趣」＋「會應用」）**：
   - 於 `dist/labs.js` 新增 5 座生活決策與直覺模擬器：
     - **一次函數與生活資費決策**（比較雙方案與黃金交叉點）
     - **機率、期望值與大數法則模擬器**（10／100／1,000 次實測收斂折線圖）
     - **物理 `v-t` 圖與道路安全煞車距離**（矩形反應距離＋三角形煞車距離面積）
     - **公民市場供需曲線、價格均衡與限價衝擊**（即時觀測短缺排隊與過剩滯銷）
     - **資訊科技線性搜尋 vs 二分搜尋演算法視覺化**（`O(n)` vs `O(log₂n)` 步數實測）
   - 支援 `#/labs?lab=<id>` 深層錨點跳轉，並透過 `getLabsForUnit(unit)` 讓數學、物理、化學、生物、地科、英語、公民與資訊科技單元皆可於課頁一鍵直達專屬實驗室。

4. **全新「🌍 學以致用館（`#/apply`）」與全 188 單元「四維轉化工作坊」（提升「學會」＋「會應用」）**：
   - 新增 `scripts/build-realworld-apps.mjs`、`dist/realworld-apps-data.js`、`dist/realworld-apps.js`、`dist/realworld-apps.css`：
     - **💡 30 秒白話直覺橋梁（學會）**
     - **🌍 互動式真實生活應用決策任務（會應用）**（全 188 課 3 選 1 生活決策挑戰與即時後果回饋）
     - **🛠️ 10 分鐘生活實踐微專案打卡**（持久化於 `state.appliedMissions`）與 **🚀 未來職涯連結**
     - **`#/apply` 學以致用館**：依 6 大生活問題主題（消費理財、科技工程、身體健康、自然旅行、媒體公民、溝通文化）探索全站 188 單元與 14 座實驗室，並於首頁即時呈現「學會 · 學好 · 有興趣 · 會應用」四維進度條。
   - Service Worker 升級至 `zhixing-cache-v35`。

## 2. 驗證結果

- 新增 [curriculum-mastery.test.mjs](file:///c:/Users/User/OneDrive/文件/Antigravity/JH/scripts/curriculum-mastery.test.mjs)（涵蓋 14 單元主題對齊守衛、零無效誘答檢驗、14 實驗室驗證、188 單元學以致用完整性與零 `undefined`/`NaN` 渲染），全站 23 組自動化測試、`npm run build` 與 JH Quest 77/77 QA 100% 通過。
- 實機瀏覽器驗證 `#/home`、`#/apply`、`#/labs?lab=lab-supply`、`#/lesson/physics-8`、`#/lesson/geography-12` 與深色模式：0 Console Errors、0 Failed Network Requests，並針對實測細節完成二輪視覺與文案精修。
