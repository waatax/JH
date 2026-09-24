import json
import re
import pathlib
import sqlite3

ROOT = pathlib.Path(__file__).resolve().parent.parent
DB_PATH = ROOT / 'dist' / 'gsat.db'

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute('SELECT question_id, exam_id, year, subject_code, question_number, question_type, passage_text, question_text, options, answer FROM questions;')
rows = cursor.fetchall()
conn.close()

print(f"Total questions in database: {len(rows)}")

# Check for artifacts
pua_count = 0
empty_stem = 0
options_count = 0
multi_choice_count = 0
fill_in_count = 0
passage_attached = 0

pua_chars = set()

for qid, eid, yr, subj, qnum, qtype, pas, stem, opts_json, ans in rows:
    opts = json.loads(opts_json)
    if pas.strip():
        passage_attached += 1
    if len(opts) > 0:
        options_count += 1
    if qtype == '多選題':
        multi_choice_count += 1
    elif qtype == '選填題' or '選填' in qtype:
        fill_in_count += 1
        
    # Check for PUA characters in stem or passage or options
    full_str = (stem or '') + (pas or '') + opts_json
    for ch in full_str:
        if 0xE000 <= ord(ch) <= 0xF8FF:
            pua_chars.add(ch)
            pua_count += 1

print(f"Questions with options: {options_count}")
print(f"Questions with passage attached: {passage_attached}")
print(f"Multiple choice questions: {multi_choice_count}")
print(f"Fill-in questions: {fill_in_count}")
print(f"PUA artifact occurrences: {pua_count} (unique chars: {len(pua_chars)})")
print(f"Sample PUA hex codes: {[hex(ord(c)) for c in list(pua_chars)[:20]]}")
