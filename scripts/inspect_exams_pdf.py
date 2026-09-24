import pdfplumber
import pathlib
import json

ROOT = pathlib.Path(__file__).resolve().parent.parent
GSAT_DIR = ROOT / 'dist' / 'downloads' / 'gsat'

sample_exams = [
    '115-math_a-exam.pdf',
    '115-chinese_comp-exam.pdf',
    '114-social-exam.pdf',
    '113-english-exam.pdf',
    '115-writing-exam.pdf'
]

results = {}
for name in sample_exams:
    p = GSAT_DIR / name
    if not p.exists():
        continue
    with pdfplumber.open(p) as pdf:
        pages_text = [page.extract_text() or '' for page in pdf.pages]
        results[name] = {
            'pages_count': len(pdf.pages),
            'page1_sample': pages_text[0][:1000] if pages_text else '',
            'page2_sample': pages_text[1][:1000] if len(pages_text) > 1 else ''
        }

with open(ROOT / 'tmp' / 'sample_exams_parsed.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Parsed sample exams, written to tmp/sample_exams_parsed.json")
