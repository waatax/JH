# -*- coding: utf-8 -*-
"""
Full Generator for 108 Curriculum Junior High Periodic Exam (段考) Handouts
and Exam Question Cross-Reference Dataset.
Covers Grades 7~9 (17 Periodic Exams, 85 Subject Units, 170+ Real School Exam Questions with Full Solutions,
108 Curriculum Codes, Junyi Academy Alignments, and 3-Publisher Textbook Comparisons).
"""

import json
import os
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

print("Starting full generation of 17 periodic exam modules across 5 subjects...")

from periodic_data_builder import build_all_exams

exams = build_all_exams()

output_path = os.path.join(os.path.dirname(__file__), '..', 'dist', 'periodic-exam-data.js')

js_content = """// 108 課綱國中全科（國一至國三）段考 期中 期末考 知識點 預備講義與考題交叉比對資料庫
// 涵蓋 17 場段考、5 大考科、108課綱條目、均一教育平台對齊、三大版本範圍、段考真題解析、避坑防線與48小時檢核清單
// 自動構建於 2026-10-20

export const periodicExams = """ + json.dumps(exams, ensure_ascii=False, indent=2) + """;

export const periodicExamById = Object.fromEntries(periodicExams.map(e => [e.id, e]));

export const gradeExams = {
  7: periodicExams.filter(e => e.grade === 7),
  8: periodicExams.filter(e => e.grade === 8),
  9: periodicExams.filter(e => e.grade === 9)
};
"""

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully generated {output_path} with {len(exams)} periodic exams.")
