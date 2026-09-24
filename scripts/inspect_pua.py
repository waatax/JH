import json
import re
import pathlib
import sqlite3

ROOT = pathlib.Path(__file__).resolve().parent.parent
DB_PATH = ROOT / 'dist' / 'gsat.db'

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute('SELECT question_id, question_text, passage_text, options FROM questions;')
rows = cursor.fetchall()
conn.close()

pua_samples = {}

for qid, stem, pas, opts_json in rows:
    full_str = f"{stem} {pas} {opts_json}"
    for i, ch in enumerate(full_str):
        if 0xE000 <= ord(ch) <= 0xF8FF:
            h = hex(ord(ch))
            if h not in pua_samples:
                start = max(0, i - 25)
                end = min(len(full_str), i + 25)
                snippet = full_str[start:end].replace('\n', ' ')
                pua_samples[h] = {
                    'qid': qid,
                    'char': ch,
                    'snippet': snippet
                }

with open(ROOT / 'tmp' / 'pua_mapping_candidates.json', 'w', encoding='utf-8') as f:
    json.dump(pua_samples, f, ensure_ascii=False, indent=2)

print(f"Recorded {len(pua_samples)} PUA characters and snippets.")
