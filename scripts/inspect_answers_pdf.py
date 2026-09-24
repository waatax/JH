import pdfplumber
import pathlib
import json

ROOT = pathlib.Path(__file__).resolve().parent.parent
GSAT_DIR = ROOT / 'dist' / 'downloads' / 'gsat'

sample_answers = [
    '115-chinese_comp-answers.pdf',
    '115-english-answers.pdf',
    '115-math_a-answers.pdf',
    '114-social-answers.pdf',
    '114-science-answers.pdf',
    '110-chinese_comp-answers.pdf',
    '110-math-answers.pdf'
]

results = {}
for name in sample_answers:
    pdf_path = GSAT_DIR / name
    if not pdf_path.exists():
        continue
    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join([page.extract_text() or '' for page in pdf.pages])
        tables = []
        for p in pdf.pages:
            t = p.extract_tables()
            if t:
                tables.extend(t)
        results[name] = {
            'pages': len(pdf.pages),
            'text_sample': text[:600],
            'tables_count': len(tables),
            'first_table_sample': tables[0][:5] if tables else None
        }

with open(ROOT / 'tmp' / 'sample_answers_parsed.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Parsed sample answers, written to tmp/sample_answers_parsed.json")
