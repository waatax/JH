# 會考歷屆題解說撰寫規範（cap-explain v1）

給撰寫 `dist/cap-explain/<year>-<subject>.json` 的作者（人或 AI）使用。

## 輸入
`tmp/cap-work/<year>-<subject>.json`：
- `questions[]`：題目文字 `stem`、`options`、**官方答案** `answer`、題圖 `images`（PDF 原圖裁切，**含圖表／公式的題目必須打開圖片看**）、官方評量目標 `officialObjective`、學習內容代碼 `officialCodes`、聽力錄音稿 `transcript`、全體通過率 `passRate`、各選項選答百分比 `optionPercent`、候選單元 `candidateUnitIds`。
- `groups[]`：題組共用閱讀材料（文字＋圖片）。
- `units[]`：本站可連結的國中教學單元（只能從這裡選 `unitIds`）。

## 輸出格式
一個 JSON 物件，key 為題目 id：

```json
{
  "114-math-2": {
    "answer": "B",
    "keyIdea": "一句話點出解題關鍵（≤ 40 字）",
    "steps": ["步驟 1……", "步驟 2……", "因此答案為 (B)。"],
    "options": {
      "A": "為什麼不對（或為什麼對）",
      "B": "……",
      "C": "……",
      "D": "……"
    },
    "trap": "最多人誤選的選項與原因（有 optionPercent 時必寫，引用該百分比）",
    "unitIds": ["math-8"],
    "gap": "",
    "skill": "能力標籤，例如：圖表判讀／計算／推論／文意理解／字詞辨析",
    "doubt": false
  }
}
```

### 規則
1. **`answer` 必須等於官方答案**（自動檢查）。若你推導結果與官方答案不同，仍填官方答案，`doubt: true`，並在 `steps` 末尾說明疑點。不得自行改答案。
2. `steps` 2–6 步，國中生看得懂；數學與自然要寫出關鍵算式或推理；國文寫出文意依據（引原文關鍵句）；英文說明文法／語意線索並附關鍵句中譯；社會說明判斷依據的概念。
3. `options` 逐一說明每個選項（聽力為 A–C）。圖片選項（無文字）時描述圖片內容後判斷。
4. `trap`：若有 `optionPercent`，找出錯誤選項中百分比最高者，寫「有 X% 考生誤選 (C)，因為……」。無資料時寫最常見的錯誤想法。
5. `unitIds`：1–3 個最相關的單元 id（必須出自 `units[]`）。若沒有任何單元真正教到該題核心概念，`unitIds` 可放最接近的單元，同時在 `gap` 寫出缺少的概念（例如「缺：相似三角形面積比」）；完全無關時 `unitIds: []` 並填 `gap`。
6. 數學非選擇題（kind = written）：`answer` 為 null，`steps` 寫完整參考解法，另加 `"rubric": ["得分要點1", "得分要點2"]`。
7. 只寫原創解說，不抄錄補習班或出版社解答。語氣：繁體中文、正向、精準，不寫「很簡單」。
8. 不確定時寧可說明不確定，也不要捏造事實（人名、年代、數據）。

## 驗收（scripts/audit-cap.mjs --strict）
- 每題都有解說；答案一致率 100%；`unitIds` 全部有效；`keyIdea`、`steps` 非空。
