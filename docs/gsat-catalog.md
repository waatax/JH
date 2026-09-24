# 大學入學考試中心 學科能力測驗（學測 GSAT）歷屆試題與解答全庫目錄
> **收錄範圍**：民國 108 學年度至 115 學年度（涵蓋過去七年 109～115 及 108 學年度共 8 個完整年度）  
> **建置與校正時間**：2026-09-24 12:24:57  
> **檔案總數**：174 份官方 PDF（試題、答案、評分原則、答題卷）完整下載存檔  
> **資料庫規模**：收錄 **53 場考科試卷**、**2216 題完整題目與選項**，已全面校正數學與自然科學特殊符號（Unicode PUA 轉譯），消除斷行破詞，完成題組閱讀材料關聯綁定，建置 SQLite (`dist/gsat.db`) 與 JSON 資料庫。  

## 題庫與考科統計概覽

| 學年度 | 西元年 | 課綱別 | 考科數 | 總收錄題數 | 試題 PDF | 答案 PDF | 評分原則 | 答題卷 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **115** | 2026 | 108課綱 | 7 科 | **284 題** | 7 份 | 6 份 | 7 份 | 7 份 |
| **114** | 2025 | 108課綱 | 7 科 | **287 題** | 7 份 | 6 份 | 7 份 | 7 份 |
| **113** | 2024 | 108課綱 | 7 科 | **278 題** | 7 份 | 6 份 | 7 份 | 7 份 |
| **112** | 2023 | 108課綱 | 7 科 | **280 題** | 7 份 | 6 份 | 7 份 | 7 份 |
| **111** | 2022 | 108課綱 | 7 科 | **287 題** | 7 份 | 6 份 | 7 份 | 7 份 |
| **110** | 2021 | 99課綱 | 6 科 | **262 題** | 6 份 | 5 份 | 2 份 | — |
| **109** | 2020 | 99課綱 | 6 科 | **271 題** | 6 份 | 5 份 | 2 份 | — |
| **108** | 2019 | 99課綱 | 6 科 | **267 題** | 6 份 | 5 份 | 2 份 | — |

---

## 資料庫結構與使用方式

本題庫已完整資料庫化為本機 SQLite 檔案 `dist/gsat.db`，並同步匯出為標準 `dist/gsat-database.json`。

### 資料庫檔案
- **SQLite 資料庫**：`dist/gsat.db`（支援全文檢索 FTS5）
- **JSON 完整題庫**：`dist/gsat-database.json`
- **檔案清單目錄**：`dist/gsat-manifest.json`
- **統計摘要**：`dist/gsat-summary.json`

### 資料表結構說明
1. **`exams`**：考科總表（年度、考科、課綱、題數、試題與解答本機路徑）。
2. **`questions`**：各考題明細（題目編號、考題類型、大題題組、閱讀題幹/背景文、題目本文、選項 JSON、官方標準答案、配分、評分原則）。
3. **`answer_keys`**：官方選擇題/選填題答案對照表。
4. **`questions_fts`**：FTS5 全文檢索虛擬表，支援考題本文與選項關鍵字全文搜尋。

### 各年度試題與解答檔案下載明細目錄

#### 民國 115 學年度（西元 2026 年）

| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |
|:---|:---:|:---:|:---:|:---:|:---:|
| **國語文綜合能力測驗** (`chinese_comp`) | 35 題 | [115-chinese_comp-exam.pdf](../dist/downloads/gsat/115-chinese_comp-exam.pdf) | [115-chinese_comp-answers.pdf](../dist/downloads/gsat/115-chinese_comp-answers.pdf) | [115-chinese_comp-rubric.pdf](../dist/downloads/gsat/115-chinese_comp-rubric.pdf) | [115-chinese_comp-sheet.pdf](../dist/downloads/gsat/115-chinese_comp-sheet.pdf) |
| **英文** (`english`) | 42 題 | [115-english-exam.pdf](../dist/downloads/gsat/115-english-exam.pdf) | [115-english-answers.pdf](../dist/downloads/gsat/115-english-answers.pdf) | [115-english-rubric.pdf](../dist/downloads/gsat/115-english-rubric.pdf) | [115-english-sheet.pdf](../dist/downloads/gsat/115-english-sheet.pdf) |
| **數學A** (`math_a`) | 40 題 | [115-math_a-exam.pdf](../dist/downloads/gsat/115-math_a-exam.pdf) | [115-math_a-answers.pdf](../dist/downloads/gsat/115-math_a-answers.pdf) | [115-math_a-rubric.pdf](../dist/downloads/gsat/115-math_a-rubric.pdf) | [115-math_a-sheet.pdf](../dist/downloads/gsat/115-math_a-sheet.pdf) |
| **數學B** (`math_b`) | 41 題 | [115-math_b-exam.pdf](../dist/downloads/gsat/115-math_b-exam.pdf) | [115-math_b-answers.pdf](../dist/downloads/gsat/115-math_b-answers.pdf) | [115-math_b-rubric.pdf](../dist/downloads/gsat/115-math_b-rubric.pdf) | [115-math_b-sheet.pdf](../dist/downloads/gsat/115-math_b-sheet.pdf) |
| **自然** (`science`) | 58 題 | [115-science-exam.pdf](../dist/downloads/gsat/115-science-exam.pdf) | [115-science-answers.pdf](../dist/downloads/gsat/115-science-answers.pdf) | [115-science-rubric.pdf](../dist/downloads/gsat/115-science-rubric.pdf) | [115-science-sheet.pdf](../dist/downloads/gsat/115-science-sheet.pdf) |
| **社會** (`social`) | 65 題 | [115-social-exam.pdf](../dist/downloads/gsat/115-social-exam.pdf) | [115-social-answers.pdf](../dist/downloads/gsat/115-social-answers.pdf) | [115-social-rubric.pdf](../dist/downloads/gsat/115-social-rubric.pdf) | [115-social-sheet.pdf](../dist/downloads/gsat/115-social-sheet.pdf) |
| **國語文寫作能力測驗** (`writing`) | 3 題 | [115-writing-exam.pdf](../dist/downloads/gsat/115-writing-exam.pdf) | — | [115-writing-rubric.pdf](../dist/downloads/gsat/115-writing-rubric.pdf) | [115-writing-sheet.pdf](../dist/downloads/gsat/115-writing-sheet.pdf) |

#### 民國 114 學年度（西元 2025 年）

| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |
|:---|:---:|:---:|:---:|:---:|:---:|
| **國語文綜合能力測驗** (`chinese_comp`) | 36 題 | [114-chinese_comp-exam.pdf](../dist/downloads/gsat/114-chinese_comp-exam.pdf) | [114-chinese_comp-answers.pdf](../dist/downloads/gsat/114-chinese_comp-answers.pdf) | [114-chinese_comp-rubric.pdf](../dist/downloads/gsat/114-chinese_comp-rubric.pdf) | [114-chinese_comp-sheet.pdf](../dist/downloads/gsat/114-chinese_comp-sheet.pdf) |
| **英文** (`english`) | 43 題 | [114-english-exam.pdf](../dist/downloads/gsat/114-english-exam.pdf) | [114-english-answers.pdf](../dist/downloads/gsat/114-english-answers.pdf) | [114-english-rubric.pdf](../dist/downloads/gsat/114-english-rubric.pdf) | [114-english-sheet.pdf](../dist/downloads/gsat/114-english-sheet.pdf) |
| **數學A** (`math_a`) | 39 題 | [114-math_a-exam.pdf](../dist/downloads/gsat/114-math_a-exam.pdf) | [114-math_a-answers.pdf](../dist/downloads/gsat/114-math_a-answers.pdf) | [114-math_a-rubric.pdf](../dist/downloads/gsat/114-math_a-rubric.pdf) | [114-math_a-sheet.pdf](../dist/downloads/gsat/114-math_a-sheet.pdf) |
| **數學B** (`math_b`) | 36 題 | [114-math_b-exam.pdf](../dist/downloads/gsat/114-math_b-exam.pdf) | [114-math_b-answers.pdf](../dist/downloads/gsat/114-math_b-answers.pdf) | [114-math_b-rubric.pdf](../dist/downloads/gsat/114-math_b-rubric.pdf) | [114-math_b-sheet.pdf](../dist/downloads/gsat/114-math_b-sheet.pdf) |
| **自然** (`science`) | 60 題 | [114-science-exam.pdf](../dist/downloads/gsat/114-science-exam.pdf) | [114-science-answers.pdf](../dist/downloads/gsat/114-science-answers.pdf) | [114-science-rubric.pdf](../dist/downloads/gsat/114-science-rubric.pdf) | [114-science-sheet.pdf](../dist/downloads/gsat/114-science-sheet.pdf) |
| **社會** (`social`) | 70 題 | [114-social-exam.pdf](../dist/downloads/gsat/114-social-exam.pdf) | [114-social-answers.pdf](../dist/downloads/gsat/114-social-answers.pdf) | [114-social-rubric.pdf](../dist/downloads/gsat/114-social-rubric.pdf) | [114-social-sheet.pdf](../dist/downloads/gsat/114-social-sheet.pdf) |
| **國語文寫作能力測驗** (`writing`) | 3 題 | [114-writing-exam.pdf](../dist/downloads/gsat/114-writing-exam.pdf) | — | [114-writing-rubric.pdf](../dist/downloads/gsat/114-writing-rubric.pdf) | [114-writing-sheet.pdf](../dist/downloads/gsat/114-writing-sheet.pdf) |

#### 民國 113 學年度（西元 2024 年）

| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |
|:---|:---:|:---:|:---:|:---:|:---:|
| **國語文綜合能力測驗** (`chinese_comp`) | 36 題 | [113-chinese_comp-exam.pdf](../dist/downloads/gsat/113-chinese_comp-exam.pdf) | [113-chinese_comp-answers.pdf](../dist/downloads/gsat/113-chinese_comp-answers.pdf) | [113-chinese_comp-rubric.pdf](../dist/downloads/gsat/113-chinese_comp-rubric.pdf) | [113-chinese_comp-sheet.pdf](../dist/downloads/gsat/113-chinese_comp-sheet.pdf) |
| **英文** (`english`) | 36 題 | [113-english-exam.pdf](../dist/downloads/gsat/113-english-exam.pdf) | [113-english-answers.pdf](../dist/downloads/gsat/113-english-answers.pdf) | [113-english-rubric.pdf](../dist/downloads/gsat/113-english-rubric.pdf) | [113-english-sheet.pdf](../dist/downloads/gsat/113-english-sheet.pdf) |
| **數學A** (`math_a`) | 40 題 | [113-math_a-exam.pdf](../dist/downloads/gsat/113-math_a-exam.pdf) | [113-math_a-answers.pdf](../dist/downloads/gsat/113-math_a-answers.pdf) | [113-math_a-rubric.pdf](../dist/downloads/gsat/113-math_a-rubric.pdf) | [113-math_a-sheet.pdf](../dist/downloads/gsat/113-math_a-sheet.pdf) |
| **數學B** (`math_b`) | 35 題 | [113-math_b-exam.pdf](../dist/downloads/gsat/113-math_b-exam.pdf) | [113-math_b-answers.pdf](../dist/downloads/gsat/113-math_b-answers.pdf) | [113-math_b-rubric.pdf](../dist/downloads/gsat/113-math_b-rubric.pdf) | [113-math_b-sheet.pdf](../dist/downloads/gsat/113-math_b-sheet.pdf) |
| **自然** (`science`) | 60 題 | [113-science-exam.pdf](../dist/downloads/gsat/113-science-exam.pdf) | [113-science-answers.pdf](../dist/downloads/gsat/113-science-answers.pdf) | [113-science-rubric.pdf](../dist/downloads/gsat/113-science-rubric.pdf) | [113-science-sheet.pdf](../dist/downloads/gsat/113-science-sheet.pdf) |
| **社會** (`social`) | 68 題 | [113-social-exam.pdf](../dist/downloads/gsat/113-social-exam.pdf) | [113-social-answers.pdf](../dist/downloads/gsat/113-social-answers.pdf) | [113-social-rubric.pdf](../dist/downloads/gsat/113-social-rubric.pdf) | [113-social-sheet.pdf](../dist/downloads/gsat/113-social-sheet.pdf) |
| **國語文寫作能力測驗** (`writing`) | 3 題 | [113-writing-exam.pdf](../dist/downloads/gsat/113-writing-exam.pdf) | — | [113-writing-rubric.pdf](../dist/downloads/gsat/113-writing-rubric.pdf) | [113-writing-sheet.pdf](../dist/downloads/gsat/113-writing-sheet.pdf) |

#### 民國 112 學年度（西元 2023 年）

| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |
|:---|:---:|:---:|:---:|:---:|:---:|
| **國語文綜合能力測驗** (`chinese_comp`) | 37 題 | [112-chinese_comp-exam.pdf](../dist/downloads/gsat/112-chinese_comp-exam.pdf) | [112-chinese_comp-answers.pdf](../dist/downloads/gsat/112-chinese_comp-answers.pdf) | [112-chinese_comp-rubric.pdf](../dist/downloads/gsat/112-chinese_comp-rubric.pdf) | [112-chinese_comp-sheet.pdf](../dist/downloads/gsat/112-chinese_comp-sheet.pdf) |
| **英文** (`english`) | 36 題 | [112-english-exam.pdf](../dist/downloads/gsat/112-english-exam.pdf) | [112-english-answers.pdf](../dist/downloads/gsat/112-english-answers.pdf) | [112-english-rubric.pdf](../dist/downloads/gsat/112-english-rubric.pdf) | [112-english-sheet.pdf](../dist/downloads/gsat/112-english-sheet.pdf) |
| **數學A** (`math_a`) | 37 題 | [112-math_a-exam.pdf](../dist/downloads/gsat/112-math_a-exam.pdf) | [112-math_a-answers.pdf](../dist/downloads/gsat/112-math_a-answers.pdf) | [112-math_a-rubric.pdf](../dist/downloads/gsat/112-math_a-rubric.pdf) | [112-math_a-sheet.pdf](../dist/downloads/gsat/112-math_a-sheet.pdf) |
| **數學B** (`math_b`) | 40 題 | [112-math_b-exam.pdf](../dist/downloads/gsat/112-math_b-exam.pdf) | [112-math_b-answers.pdf](../dist/downloads/gsat/112-math_b-answers.pdf) | [112-math_b-rubric.pdf](../dist/downloads/gsat/112-math_b-rubric.pdf) | [112-math_b-sheet.pdf](../dist/downloads/gsat/112-math_b-sheet.pdf) |
| **自然** (`science`) | 62 題 | [112-science-exam.pdf](../dist/downloads/gsat/112-science-exam.pdf) | [112-science-answers.pdf](../dist/downloads/gsat/112-science-answers.pdf) | [112-science-rubric.pdf](../dist/downloads/gsat/112-science-rubric.pdf) | [112-science-sheet.pdf](../dist/downloads/gsat/112-science-sheet.pdf) |
| **社會** (`social`) | 65 題 | [112-social-exam.pdf](../dist/downloads/gsat/112-social-exam.pdf) | [112-social-answers.pdf](../dist/downloads/gsat/112-social-answers.pdf) | [112-social-rubric.pdf](../dist/downloads/gsat/112-social-rubric.pdf) | [112-social-sheet.pdf](../dist/downloads/gsat/112-social-sheet.pdf) |
| **國語文寫作能力測驗** (`writing`) | 3 題 | [112-writing-exam.pdf](../dist/downloads/gsat/112-writing-exam.pdf) | — | [112-writing-rubric.pdf](../dist/downloads/gsat/112-writing-rubric.pdf) | [112-writing-sheet.pdf](../dist/downloads/gsat/112-writing-sheet.pdf) |

#### 民國 111 學年度（西元 2022 年）

| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |
|:---|:---:|:---:|:---:|:---:|:---:|
| **國語文綜合能力測驗** (`chinese_comp`) | 37 題 | [111-chinese_comp-exam.pdf](../dist/downloads/gsat/111-chinese_comp-exam.pdf) | [111-chinese_comp-answers.pdf](../dist/downloads/gsat/111-chinese_comp-answers.pdf) | [111-chinese_comp-rubric.pdf](../dist/downloads/gsat/111-chinese_comp-rubric.pdf) | [111-chinese_comp-sheet.pdf](../dist/downloads/gsat/111-chinese_comp-sheet.pdf) |
| **英文** (`english`) | 37 題 | [111-english-exam.pdf](../dist/downloads/gsat/111-english-exam.pdf) | [111-english-answers.pdf](../dist/downloads/gsat/111-english-answers.pdf) | [111-english-rubric.pdf](../dist/downloads/gsat/111-english-rubric.pdf) | [111-english-sheet.pdf](../dist/downloads/gsat/111-english-sheet.pdf) |
| **數學A** (`math_a`) | 40 題 | [111-math_a-exam.pdf](../dist/downloads/gsat/111-math_a-exam.pdf) | [111-math_a-answers.pdf](../dist/downloads/gsat/111-math_a-answers.pdf) | [111-math_a-rubric.pdf](../dist/downloads/gsat/111-math_a-rubric.pdf) | [111-math_a-sheet.pdf](../dist/downloads/gsat/111-math_a-sheet.pdf) |
| **數學B** (`math_b`) | 41 題 | [111-math_b-exam.pdf](../dist/downloads/gsat/111-math_b-exam.pdf) | [111-math_b-answers.pdf](../dist/downloads/gsat/111-math_b-answers.pdf) | [111-math_b-rubric.pdf](../dist/downloads/gsat/111-math_b-rubric.pdf) | [111-math_b-sheet.pdf](../dist/downloads/gsat/111-math_b-sheet.pdf) |
| **自然** (`science`) | 61 題 | [111-science-exam.pdf](../dist/downloads/gsat/111-science-exam.pdf) | [111-science-answers.pdf](../dist/downloads/gsat/111-science-answers.pdf) | [111-science-rubric.pdf](../dist/downloads/gsat/111-science-rubric.pdf) | [111-science-sheet.pdf](../dist/downloads/gsat/111-science-sheet.pdf) |
| **社會** (`social`) | 68 題 | [111-social-exam.pdf](../dist/downloads/gsat/111-social-exam.pdf) | [111-social-answers.pdf](../dist/downloads/gsat/111-social-answers.pdf) | [111-social-rubric.pdf](../dist/downloads/gsat/111-social-rubric.pdf) | [111-social-sheet.pdf](../dist/downloads/gsat/111-social-sheet.pdf) |
| **國語文寫作能力測驗** (`writing`) | 3 題 | [111-writing-exam.pdf](../dist/downloads/gsat/111-writing-exam.pdf) | — | [111-writing-rubric.pdf](../dist/downloads/gsat/111-writing-rubric.pdf) | [111-writing-sheet.pdf](../dist/downloads/gsat/111-writing-sheet.pdf) |

#### 民國 110 學年度（西元 2021 年）

| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |
|:---|:---:|:---:|:---:|:---:|:---:|
| **國語文綜合能力測驗** (`chinese_comp`) | 42 題 | [110-chinese_comp-exam.pdf](../dist/downloads/gsat/110-chinese_comp-exam.pdf) | [110-chinese_comp-answers.pdf](../dist/downloads/gsat/110-chinese_comp-answers.pdf) | — | — |
| **英文** (`english`) | 51 題 | [110-english-exam.pdf](../dist/downloads/gsat/110-english-exam.pdf) | [110-english-answers.pdf](../dist/downloads/gsat/110-english-answers.pdf) | [110-english-rubric.pdf](../dist/downloads/gsat/110-english-rubric.pdf) | — |
| **數學** (`math`) | 29 題 | [110-math-exam.pdf](../dist/downloads/gsat/110-math-exam.pdf) | [110-math-answers.pdf](../dist/downloads/gsat/110-math-answers.pdf) | — | — |
| **自然** (`science`) | 67 題 | [110-science-exam.pdf](../dist/downloads/gsat/110-science-exam.pdf) | [110-science-answers.pdf](../dist/downloads/gsat/110-science-answers.pdf) | — | — |
| **社會** (`social`) | 70 題 | [110-social-exam.pdf](../dist/downloads/gsat/110-social-exam.pdf) | [110-social-answers.pdf](../dist/downloads/gsat/110-social-answers.pdf) | — | — |
| **國語文寫作能力測驗** (`writing`) | 3 題 | [110-writing-exam.pdf](../dist/downloads/gsat/110-writing-exam.pdf) | — | [110-writing-rubric.pdf](../dist/downloads/gsat/110-writing-rubric.pdf) | — |

#### 民國 109 學年度（西元 2020 年）

| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |
|:---|:---:|:---:|:---:|:---:|:---:|
| **國語文綜合能力測驗** (`chinese_comp`) | 41 題 | [109-chinese_comp-exam.pdf](../dist/downloads/gsat/109-chinese_comp-exam.pdf) | [109-chinese_comp-answers.pdf](../dist/downloads/gsat/109-chinese_comp-answers.pdf) | — | — |
| **英文** (`english`) | 50 題 | [109-english-exam.pdf](../dist/downloads/gsat/109-english-exam.pdf) | [109-english-answers.pdf](../dist/downloads/gsat/109-english-answers.pdf) | [109-english-rubric.pdf](../dist/downloads/gsat/109-english-rubric.pdf) | — |
| **數學** (`math`) | 29 題 | [109-math-exam.pdf](../dist/downloads/gsat/109-math-exam.pdf) | [109-math-answers.pdf](../dist/downloads/gsat/109-math-answers.pdf) | — | — |
| **自然** (`science`) | 72 題 | [109-science-exam.pdf](../dist/downloads/gsat/109-science-exam.pdf) | [109-science-answers.pdf](../dist/downloads/gsat/109-science-answers.pdf) | — | — |
| **社會** (`social`) | 76 題 | [109-social-exam.pdf](../dist/downloads/gsat/109-social-exam.pdf) | [109-social-answers.pdf](../dist/downloads/gsat/109-social-answers.pdf) | — | — |
| **國語文寫作能力測驗** (`writing`) | 3 題 | [109-writing-exam.pdf](../dist/downloads/gsat/109-writing-exam.pdf) | — | [109-writing-rubric.pdf](../dist/downloads/gsat/109-writing-rubric.pdf) | — |

#### 民國 108 學年度（西元 2019 年）

| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |
|:---|:---:|:---:|:---:|:---:|:---:|
| **國語文綜合能力測驗** (`chinese_comp`) | 42 題 | [108-chinese_comp-exam.pdf](../dist/downloads/gsat/108-chinese_comp-exam.pdf) | [108-chinese_comp-answers.pdf](../dist/downloads/gsat/108-chinese_comp-answers.pdf) | — | — |
| **英文** (`english`) | 50 題 | [108-english-exam.pdf](../dist/downloads/gsat/108-english-exam.pdf) | [108-english-answers.pdf](../dist/downloads/gsat/108-english-answers.pdf) | [108-english-rubric.pdf](../dist/downloads/gsat/108-english-rubric.pdf) | — |
| **數學** (`math`) | 29 題 | [108-math-exam.pdf](../dist/downloads/gsat/108-math-exam.pdf) | [108-math-answers.pdf](../dist/downloads/gsat/108-math-answers.pdf) | — | — |
| **自然** (`science`) | 71 題 | [108-science-exam.pdf](../dist/downloads/gsat/108-science-exam.pdf) | [108-science-answers.pdf](../dist/downloads/gsat/108-science-answers.pdf) | — | — |
| **社會** (`social`) | 72 題 | [108-social-exam.pdf](../dist/downloads/gsat/108-social-exam.pdf) | [108-social-answers.pdf](../dist/downloads/gsat/108-social-answers.pdf) | — | — |
| **國語文寫作能力測驗** (`writing`) | 3 題 | [108-writing-exam.pdf](../dist/downloads/gsat/108-writing-exam.pdf) | — | [108-writing-rubric.pdf](../dist/downloads/gsat/108-writing-rubric.pdf) | — |

