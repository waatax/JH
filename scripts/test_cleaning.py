import pdfplumber
import pathlib
import json
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
GSAT_DIR = ROOT / 'dist' / 'downloads' / 'gsat'

def extract_pdf_pages_clean(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        pages = []
        for i, page in enumerate(pdf.pages):
            text = page.extract_text() or ''
            # Clean headers/footers common in CEEC exams
            # Header: e.g. "第 1 頁 請記得在答題卷簽名欄位以正楷簽全名 115年學測\n共 11 頁 國語文綜合能力測驗"
            # Footer: e.g. "- 1 -" or "- 2 -"
            lines = text.split('\n')
            clean_lines = []
            for l in lines:
                l_s = l.strip()
                if re.match(r'^第\s*\d+\s*頁.*共\s*\d+\s*頁', l_s):
                    continue
                if re.match(r'^-\s*\d+\s*-$', l_s):
                    continue
                if '財團法人大學入學考試中心' in l_s:
                    continue
                if '作答注意事項' in l_s or '請於考試開始鈴響起' in l_s:
                    continue
                clean_lines.append(l)
            pages.append('\n'.join(clean_lines))
        return pages

test_exams = ['115-chinese_comp-exam.pdf', '115-math_a-exam.pdf', '115-english-exam.pdf', '115-writing-exam.pdf']
results = {}

for name in test_exams:
    p = GSAT_DIR / name
    if not p.exists():
        continue
    pages = extract_pdf_pages_clean(p)
    full_text = "\n".join(pages[1:]) # page 0 is cover
    results[name] = {
        'total_pages': len(pages),
        'full_text_len': len(full_text),
        'full_text_sample': full_text[:1500]
    }

with open(ROOT / 'tmp' / 'cleaned_text_sample.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Cleaned text sample written to tmp/cleaned_text_sample.json")
