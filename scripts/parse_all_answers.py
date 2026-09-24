import pdfplumber
import pathlib
import json
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
GSAT_DIR = ROOT / 'dist' / 'downloads' / 'gsat'

answer_files = sorted(list(GSAT_DIR.glob('*-answers.pdf')))
print(f"Total answer files found: {len(answer_files)}")

all_answers = {}

for af in answer_files:
    # af.name e.g. "115-chinese_comp-answers.pdf"
    parts = af.stem.split('-')
    year = int(parts[0])
    subj_code = parts[1]
    
    with pdfplumber.open(af) as pdf:
        text = "\n".join([page.extract_text() or '' for page in pdf.pages])
        
    # Standard CEEC answer key formats:
    # 1. Multi-column table in text:
    # "題號 答案 題號 答案"
    # or "題號 答案 題號 答案 題號 答案"
    # or lines like:
    # "1 C 21 A" or "1 2 13-1 9 18 3"
    
    # We can parse either by table extraction or regex from text!
    # Let's inspect the lines:
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    # Check if lines have pairs of (num, ans)
    # Tokens on each line:
    parsed_items = {}
    
    # Regex to find (num, ans) tokens
    # Note: question numbers can be 1, 2, ..., 72, or 13-1, 14-2, or A, B, C, D (for old math fill-in), or 14 (with 14-1)
    # Answer can be single letter (A, B, C, D, E, F, G, H, I, J), multiple letters (BE, ABD, ACDE),
    # digit (1, 2, 3, 4, 5), multiple digits (3,4, 1,2,5), negative sign (–, -), slash (／), or number
    for line in lines:
        if '學年度' in line or '答案' in line or '※' in line or '考科' in line or '測驗' in line or '非選擇題' in line:
            continue
        tokens = line.split()
        # Pair tokens: often [num1, ans1, num2, ans2, ...]
        # Let's see: if line is "1 C 21 A", tokens are ['1', 'C', '21', 'A']
        # If line is "7 3,4 15-2 2", tokens are ['7', '3,4', '15-2', '2']
        # If line is "14 14-2 4", sometimes line has a number then subnumber
        i = 0
        while i < len(tokens):
            t = tokens[i]
            # check if t is a question number
            if re.match(r'^(?:\d+|\d+-\d+|[A-Z])$', t):
                if i + 1 < len(tokens):
                    ans = tokens[i+1]
                    # check if ans is valid answer token
                    # Could ans be another question number?
                    if re.match(r'^(?:[A-Z]+|[0-9,]+|／|-|–)$', ans):
                        parsed_items[t] = ans
                        i += 2
                        continue
            i += 1

    all_answers[f"{year}-{subj_code}"] = {
        'year': year,
        'subject_code': subj_code,
        'count': len(parsed_items),
        'answers': parsed_items
    }

print("Answer parsing complete. Summary:")
for k, v in sorted(all_answers.items()):
    sample = list(v['answers'].items())[:4]
    print(f"  {k}: {v['count']} questions parsed (sample: {sample})")

with open(ROOT / 'tmp' / 'parsed_all_answers.json', 'w', encoding='utf-8') as f:
    json.dump(all_answers, f, ensure_ascii=False, indent=2)
