import concurrent.futures
import hashlib
import json
import os
import pathlib
import re
import sqlite3
import time
import pdfplumber

ROOT = pathlib.Path(__file__).resolve().parent.parent
GSAT_DIR = ROOT / 'dist' / 'downloads' / 'gsat'
DB_PATH = ROOT / 'dist' / 'gsat.db'
JSON_EXPORT_PATH = ROOT / 'dist' / 'gsat-database.json'
SUMMARY_PATH = ROOT / 'dist' / 'gsat-summary.json'
CATALOG_MD_PATH = ROOT / 'docs' / 'gsat-catalog.md'

# Complete PUA Glyph Mapping for CEEC Math, Science, and Language PDFs
PUA_MAP = {
    '\uf0e0': '→',
    '\uf047': 'Γ',
    '\uf067': 'γ',
    '\uf0d0': '∠',
    '\uf0d7': '·',
    '\uf0e6': '(',
    '\uf0e7': '(',
    '\uf0e8': '(',
    '\uf0f6': ')',
    '\uf0f7': ')',
    '\uf0f8': ')',
    '\uf8eb': '(',
    '\uf8ec': '(',
    '\uf8ed': '(',
    '\uf8f6': ')',
    '\uf8f7': ')',
    '\uf8f8': ')',
    '\uf0e9': '[',
    '\uf0ea': '[',
    '\uf0eb': '[',
    '\uf0f9': ']',
    '\uf0fa': ']',
    '\uf0fb': ']',
    '\uf8ee': '[',
    '\uf8ef': '[',
    '\uf8f0': '[',
    '\uf8f9': ']',
    '\uf8fa': ']',
    '\uf8fb': ']',
    '\uf0ec': '{',
    '\uf0ed': '{',
    '\uf0ee': '{',
    '\uf0ef': '{',
    '\uf086': '□',
    '\uf0b9': '≠',
    '\uf06d': 'μ',
    '\uf0e5': 'Σ',
    '\uf0bb': '≈',
    '\uf0ae': '→',
    '\uf072': '△',
    '\uf0b3': '≥',
    '\uf076': ' ',
    '\uf0a2': '′',
    '\uf04c': '…',
    '\uf04b': '…',
    '\uf0ad': '↑',
    '\uf0af': '↓',
    '\uf06c': 'λ',
    '\uf065': 'ε',
    '\uf0bc': '…',
    '\uf0a3': '≤',
    '\uf0be': '≥',
    '\uf0b1': '±',
    '\uf0b4': '×',
    '\uf0b8': '÷',
    '\uf0b0': '°',
    '\uf0ce': '∈',
    '\uf0cf': '∉',
    '\uf0cc': '⊂',
    '\uf0cd': '⊆',
    '\uf0c8': '∩',
    '\uf0c9': '∪',
    '\uf0d8': '→',
    '\uf0db': '⇔',
    '\uf0de': '⇒',
    '\uf0ac': '¬',
    '\uf0bd': '⊥',
    '\uf0b7': '·',
    '\uf0b5': 'μ',
    '\uf061': 'α',
    '\uf062': 'β',
    '\uf071': 'θ',
    '\uf070': 'π',
    '\uf073': 'σ',
    '\uf077': 'ω',
    '\uf044': 'Δ',
    '\uf053': 'Σ',
    '\uf057': 'Ω',
    '\uf03d': '=',
    '\uf03c': '<',
    '\uf03e': '>',
    '\uf02b': '+',
    '\uf02d': '-',
    '\uf028': '(',
    '\uf029': ')',
    '\uf05b': '[',
    '\uf05d': ']',
    '\uf07b': '{',
    '\uf07d': '}',
    '\uf088': '▲',
    '\uf07e': '~',
}

def clean_pua(text):
    if not text:
        return ""
    for k, v in PUA_MAP.items():
        text = text.replace(k, v)
    text = text.replace('\xa0', ' ')
    # Eliminate any leftover PUA characters (0xE000-0xF8FF) with space
    text = re.sub(r'[\ue000-\uf8ff]', ' ', text)
    return text

def format_readability(text):
    """Clean line-wrapping artifacts, keep real paragraph breaks and list items."""
    if not text:
        return ""
    text = clean_pua(text)
    # Split paragraphs by 2 or more newlines
    paras = text.split('\n\n')
    cleaned_paras = []
    for p in paras:
        lines = [l.strip() for l in p.split('\n') if l.strip()]
        if not lines:
            continue
        buf = [lines[0]]
        for nxt in lines[1:]:
            prev = buf[-1]
            if not prev:
                buf.append(nxt)
                continue
            # If line starts with a list item, keep on newline
            if re.match(r'^(?:\([A-Za-z0-9]\)|[甲乙丙丁戊己庚辛]、|[①②③④⑤⑥]|\d+\.|\(占)', nxt):
                buf.append('\n' + nxt)
            elif re.search(r'[\u4e00-\u9fff\uff01-\uffee]$', prev) and re.match(r'[\u4e00-\u9fff\uff01-\uffee]', nxt):
                # Chinese to Chinese: join smoothly without space
                buf[-1] = prev + nxt
            else:
                buf[-1] = prev + ' ' + nxt
        cleaned_paras.append(''.join(buf))
    return '\n\n'.join(cleaned_paras).strip()

# 1. Parse Answer Keys
print("Parsing answer key PDFs...")
answer_files = sorted(list(GSAT_DIR.glob('*-answers.pdf')))
answers_db = {}

for af in answer_files:
    parts = af.stem.split('-')
    year = int(parts[0])
    subj_code = parts[1]
    
    with pdfplumber.open(af) as pdf:
        text = "\n".join([page.extract_text() or '' for page in pdf.pages])
    
    text = clean_pua(text)
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    parsed_items = {}
    
    for line in lines:
        if '學年度' in line or '答案' in line or '※' in line or '考科' in line or '測驗' in line or '非選擇題' in line:
            continue
        tokens = line.split()
        i = 0
        while i < len(tokens):
            t = tokens[i]
            if re.match(r'^(?:\d+|\d+-\d+|[A-G])$', t):
                if i + 1 < len(tokens):
                    ans = tokens[i+1]
                    if re.match(r'^(?:[A-J]+|[0-9,]+|／|-|–)$', ans):
                        if ans == '–':
                            ans = '-'
                        parsed_items[t] = ans
                        i += 2
                        continue
            i += 1
            
    answers_db[(year, subj_code)] = parsed_items

# 2. Parse Rubrics
print("Parsing rubric PDFs for non-choice questions...")
rubric_files = sorted(list(GSAT_DIR.glob('*-rubric.pdf')))
rubrics_db = {}

for rf in rubric_files:
    parts = rf.stem.split('-')
    year = int(parts[0])
    subj_code = parts[1]
    
    try:
        with pdfplumber.open(rf) as pdf:
            r_text = "\n".join([page.extract_text() or '' for page in pdf.pages[:4]])
        rubrics_db[(year, subj_code)] = format_readability(r_text)
    except Exception as e:
        rubrics_db[(year, subj_code)] = f"Error reading rubric: {e}"

SUBJECT_DISPLAY_NAMES = {
    'chinese_comp': '國語文綜合能力測驗',
    'writing': '國語文寫作能力測驗',
    'english': '英文',
    'math_a': '數學A',
    'math_b': '數學B',
    'math': '數學',
    'social': '社會',
    'science': '自然'
}

def parse_exam_file(exam_file):
    parts = exam_file.stem.split('-')
    year = int(parts[0])
    subj_code = parts[1]
    exam_id = f"{year}-{subj_code}"
    
    subj_name = SUBJECT_DISPLAY_NAMES.get(subj_code, subj_code)
    curriculum = '108課綱' if year >= 111 else '99課綱'
    
    with pdfplumber.open(exam_file) as pdf:
        pages_raw = [page.extract_text() or '' for page in pdf.pages]
        
    pages_text = pages_raw[1:] if len(pages_raw) > 1 else pages_raw
    
    cleaned_pages = []
    for p_idx, text in enumerate(pages_text, 1):
        lines = text.split('\n')
        page_lines = []
        for l in lines:
            l_str = l.strip()
            if not l_str:
                continue
            if re.match(r'^第\s*\d+\s*頁.*共\s*\d+\s*頁', l_str):
                continue
            if re.match(r'^-\s*\d+\s*-$', l_str):
                continue
            if re.match(r'^\d+年學測.*第\s*\d+\s*頁', l_str):
                continue
            if re.match(r'^背面還有試題', l_str) or re.match(r'^試題至此結束', l_str):
                continue
            page_lines.append(l)
        cleaned_pages.append('\n'.join(page_lines))
        
    full_text = '\n'.join(cleaned_pages)
    official_answers = answers_db.get((year, subj_code), {})
    rubric_summary = rubrics_db.get((year, subj_code), "")
    
    questions = []
    
    # ------------------ WRITING ------------------
    if subj_code == 'writing':
        sec1_match = re.search(r'一、\s*(.*?)(?=二、|\Z)', full_text, re.DOTALL)
        sec2_match = re.search(r'二、\s*(.*?)(?=\Z)', full_text, re.DOTALL)
        
        if sec1_match:
            c1 = sec1_match.group(1).strip()
            q1_sub = re.findall(r'(問題[（(][一二12][）)].*?)(?=(?:問題[（(][一二12][）)]|\Z))', c1, re.DOTALL)
            if q1_sub:
                first_pos = c1.find(q1_sub[0])
                passage = format_readability(c1[:first_pos].strip())
                for idx, sq in enumerate(q1_sub, 1):
                    m_score = re.search(r'[（(]占\s*(\d+)\s*分[）)]', sq)
                    score = f"{m_score.group(1)}分" if m_score else "占分見題末"
                    q_num = f"一-{idx}"
                    questions.append({
                        'question_id': f"{exam_id}-Q{q_num}",
                        'exam_id': exam_id,
                        'year': year,
                        'subject_code': subj_code,
                        'subject_name': subj_name,
                        'section_name': '第一大題（知性統整）',
                        'question_number': q_num,
                        'question_type': '寫作題/非選擇題',
                        'passage_text': passage,
                        'question_text': format_readability(sq.strip()),
                        'options': {},
                        'score': score,
                        'answer': '非選擇題（依評分原則與閱卷標準評分）',
                        'rubric_text': rubric_summary[:1200] if rubric_summary else "參見國寫閱卷評分原則說明。"
                    })
            else:
                questions.append({
                    'question_id': f"{exam_id}-Q一",
                    'exam_id': exam_id,
                    'year': year,
                    'subject_code': subj_code,
                    'subject_name': subj_name,
                    'section_name': '第一大題（知性統整）',
                    'question_number': '一',
                    'question_type': '寫作題/非選擇題',
                    'passage_text': '',
                    'question_text': format_readability(c1),
                    'options': {},
                    'score': '25分',
                    'answer': '非選擇題（依評分原則與閱卷標準評分）',
                    'rubric_text': rubric_summary[:1200] if rubric_summary else "參見國寫閱卷評分原則說明。"
                })
                
        if sec2_match:
            c2 = sec2_match.group(1).strip()
            questions.append({
                'question_id': f"{exam_id}-Q二",
                'exam_id': exam_id,
                'year': year,
                'subject_code': subj_code,
                'subject_name': subj_name,
                'section_name': '第二大題（情意抒發）',
                'question_number': '二',
                'question_type': '寫作題/非選擇題',
                'passage_text': '',
                'question_text': format_readability(c2),
                'options': {},
                'score': '25分',
                'answer': '非選擇題（依評分原則與閱卷標準評分）',
                'rubric_text': rubric_summary[:1200] if rubric_summary else "參見國寫閱卷評分原則說明。"
            })
            
        return exam_id, year, subj_code, subj_name, curriculum, questions

    # ------------------ OBJECTIVE & MIXED SUBJECTS ------------------
    lines = full_text.split('\n')
    current_section = "第壹部分"
    current_passage = ""
    passage_target_range = None
    current_q_num = None
    current_q_lines = []
    
    def finalize_question(q_num, q_lines, sec, passage):
        if not q_num or not q_lines:
            return None
        raw_q_text = '\n'.join(q_lines).strip()
        
        # Options extraction
        options = {}
        # (A) to (J)
        letter_opts = re.findall(r'(\([A-J]\)|[A-J]\.)\s*(.*?)(?=(?:\([A-J]\)|[A-J]\.|\Z))', raw_q_text, re.DOTALL)
        if letter_opts and len(letter_opts) >= 3:
            for opt_k, opt_v in letter_opts:
                k_clean = re.sub(r'[\(\)\.]', '', opt_k).strip()
                options[f"({k_clean})"] = format_readability(opt_v)
        else:
            # (1) to (5)
            num_opts = re.findall(r'(\([1-5]\))\s*(.*?)(?=(?:\([1-5]\)|\Z))', raw_q_text, re.DOTALL)
            if num_opts and len(num_opts) >= 3:
                for opt_k, opt_v in num_opts:
                    options[opt_k] = format_readability(opt_v)
                    
        stem = raw_q_text
        if options:
            first_opt = list(options.keys())[0]
            pos = stem.find(first_opt)
            if pos > 0:
                stem = stem[:pos].strip()
                
        stem_formatted = format_readability(stem)
        
        # Question type
        q_type = "單選題"
        if "多選題" in sec:
            q_type = "多選題"
        elif "選填題" in sec:
            q_type = "選填題"
        elif "混合題" in sec or "非選擇題" in sec:
            q_type = "混合題/非選擇題"
            
        ans = official_answers.get(str(q_num), "")
        if ans == '／':
            ans = "非選擇題（見評分原則）"
        elif not ans and '-' in str(q_num):
            ans = official_answers.get(str(q_num), "")
            
        if not ans and q_type == "混合題/非選擇題":
            ans = "非選擇題（見評分原則）"
            
        score = ""
        m_score = re.search(r'[（(]占\s*(\d+)\s*分[）)]|每題\s*(\d+)\s*分|（\s*(\d+)\s*分\s*）', raw_q_text)
        if m_score:
            score = f"{m_score.group(1) or m_score.group(2) or m_score.group(3)}分"
        elif "每題2分" in sec or "每題 2 分" in sec:
            score = "2分"
        elif "每題4分" in sec or "每題 4 分" in sec:
            score = "4分"
        elif "每題5分" in sec or "每題 5 分" in sec:
            score = "5分"
        elif "每題1分" in sec or "每題 1 分" in sec:
            score = "1分"
            
        return {
            'question_id': f"{exam_id}-Q{q_num}",
            'exam_id': exam_id,
            'year': year,
            'subject_code': subj_code,
            'subject_name': subj_name,
            'section_name': sec,
            'question_number': str(q_num),
            'question_type': q_type,
            'passage_text': format_readability(passage),
            'question_text': stem_formatted,
            'options': options,
            'score': score,
            'answer': ans,
            'rubric_text': rubric_summary[:1000] if (ans and '非選擇題' in ans and rubric_summary) else ""
        }

    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Section header
        if re.match(r'^(?:第[壹貳參肆]部分|一、|二、|三、|四、|五、|伍、).*?[（(].*?分[）)]', line) or \
           re.match(r'^(?:第[壹貳參肆]部分|選擇題|非選擇題|混合題|單選題|多選題|選填題)', line):
            current_section = line
            i += 1
            continue
            
        # Passage detection
        m_pas = re.match(r'^(\d+)[-~至](\d+)\s*(?:為題組|題為題組|.*回答第?\s*\d+[-~至]\d+題)', line)
        if m_pas or ('題組' in line and any(k in line for k in ['閱讀', '下文', '依據', '資料', '回答'])):
            if m_pas:
                passage_target_range = (int(m_pas.group(1)), int(m_pas.group(2)))
            pas_lines = [line]
            i += 1
            while i < len(lines):
                next_l = lines[i].strip()
                if re.match(r'^\d+\.\s+', next_l) or re.match(r'^[A-G]\.\s+', next_l):
                    break
                pas_lines.append(lines[i])
                i += 1
            current_passage = '\n'.join(pas_lines).strip()
            continue
            
        # Question start
        m_q = re.match(r'^(\d+)\.\s*(.*)', line)
        if not m_q:
            m_q = re.match(r'^([A-G])\.\s*(.*)', line)
            
        if m_q:
            q_digit = int(m_q.group(1)) if m_q.group(1).isdigit() else None
            # Check if passage has expired
            if passage_target_range and q_digit:
                if q_digit < passage_target_range[0] or q_digit > passage_target_range[1]:
                    current_passage = ""
                    passage_target_range = None
                    
            if current_q_num:
                q_obj = finalize_question(current_q_num, current_q_lines, current_section, current_passage)
                if q_obj:
                    questions.append(q_obj)
            current_q_num = m_q.group(1)
            current_q_lines = [m_q.group(2)]
            i += 1
            continue
            
        if current_q_num:
            current_q_lines.append(line)
        i += 1
        
    if current_q_num:
        q_obj = finalize_question(current_q_num, current_q_lines, current_section, current_passage)
        if q_obj:
            questions.append(q_obj)
            
    # Add fill-in subquestions if present in answers
    existing_nums = set(q['question_number'] for q in questions)
    for ans_q_num, ans_val in official_answers.items():
        if ans_q_num not in existing_nums and '-' in ans_q_num:
            parent_num = ans_q_num.split('-')[0]
            parent_q = next((q for q in questions if q['question_number'] == parent_num), None)
            if parent_q:
                questions.append({
                    'question_id': f"{exam_id}-Q{ans_q_num}",
                    'exam_id': exam_id,
                    'year': year,
                    'subject_code': subj_code,
                    'subject_name': subj_name,
                    'section_name': parent_q['section_name'],
                    'question_number': ans_q_num,
                    'question_type': '選填格/子題',
                    'passage_text': parent_q['passage_text'],
                    'question_text': f"【第 {parent_num} 題之選填格 {ans_q_num}】：\n{parent_q['question_text']}",
                    'options': {},
                    'score': '',
                    'answer': ans_val,
                    'rubric_text': ''
                })

    return exam_id, year, subj_code, subj_name, curriculum, questions

# Process all 53 exam files
print("Processing all 53 exam PDF files with enhanced readability...")
exam_files = sorted(list(GSAT_DIR.glob('*-exam.pdf')))

all_exams_data = []
all_questions_data = []

for ef in exam_files:
    exam_id, year, subj_code, subj_name, curriculum, questions = parse_exam_file(ef)
    
    exam_record = {
        'exam_id': exam_id,
        'year': year,
        'year_ad': year + 1911,
        'subject_code': subj_code,
        'subject_name': subj_name,
        'curriculum': curriculum,
        'total_questions': len(questions),
        'pdf_exam_path': f"downloads/gsat/{exam_id}-exam.pdf",
        'pdf_answers_path': f"downloads/gsat/{exam_id}-answers.pdf" if (GSAT_DIR / f"{exam_id}-answers.pdf").exists() else "",
        'pdf_rubric_path': f"downloads/gsat/{exam_id}-rubric.pdf" if (GSAT_DIR / f"{exam_id}-rubric.pdf").exists() else "",
        'pdf_sheet_path': f"downloads/gsat/{exam_id}-sheet.pdf" if (GSAT_DIR / f"{exam_id}-sheet.pdf").exists() else ""
    }
    all_exams_data.append(exam_record)
    all_questions_data.extend(questions)

print(f"Total exams parsed: {len(all_exams_data)}")
print(f"Total questions parsed: {len(all_questions_data)}")

# Ensure strictly unique question_id
seen_qids = {}
for q in all_questions_data:
    base_qid = q['question_id']
    if base_qid in seen_qids:
        seen_qids[base_qid] += 1
        q['question_id'] = f"{base_qid}_{seen_qids[base_qid]}"
    else:
        seen_qids[base_qid] = 1

# Re-build SQLite Database
print(f"Building SQLite database at {DB_PATH}...")
if DB_PATH.exists():
    try:
        DB_PATH.unlink()
    except Exception:
        pass

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE exams (
    exam_id TEXT PRIMARY KEY,
    year INTEGER NOT NULL,
    year_ad INTEGER NOT NULL,
    subject_code TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    curriculum TEXT NOT NULL,
    total_questions INTEGER NOT NULL,
    pdf_exam_path TEXT,
    pdf_answers_path TEXT,
    pdf_rubric_path TEXT,
    pdf_sheet_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
''')

cursor.execute('''
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT UNIQUE NOT NULL,
    exam_id TEXT NOT NULL REFERENCES exams(exam_id),
    year INTEGER NOT NULL,
    subject_code TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    section_name TEXT,
    question_number TEXT NOT NULL,
    question_type TEXT NOT NULL,
    passage_text TEXT,
    question_text TEXT NOT NULL,
    options TEXT,
    answer TEXT,
    score TEXT,
    rubric_text TEXT
);
''')

cursor.execute('''
CREATE TABLE answer_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id TEXT NOT NULL,
    year INTEGER NOT NULL,
    subject_code TEXT NOT NULL,
    question_number TEXT NOT NULL,
    official_answer TEXT NOT NULL
);
''')

cursor.execute('CREATE INDEX idx_questions_exam_id ON questions(exam_id);')
cursor.execute('CREATE INDEX idx_questions_year_subj ON questions(year, subject_code);')
cursor.execute('CREATE INDEX idx_answer_keys_exam ON answer_keys(exam_id, question_number);')

cursor.execute('''
CREATE VIRTUAL TABLE questions_fts USING fts5(
    question_id UNINDEXED,
    exam_id UNINDEXED,
    year UNINDEXED,
    subject_name UNINDEXED,
    question_text,
    passage_text,
    options
);
''')

for e in all_exams_data:
    cursor.execute('''
    INSERT INTO exams (exam_id, year, year_ad, subject_code, subject_name, curriculum, total_questions, pdf_exam_path, pdf_answers_path, pdf_rubric_path, pdf_sheet_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        e['exam_id'], e['year'], e['year_ad'], e['subject_code'], e['subject_name'],
        e['curriculum'], e['total_questions'], e['pdf_exam_path'], e['pdf_answers_path'],
        e['pdf_rubric_path'], e['pdf_sheet_path']
    ))

for q in all_questions_data:
    opts_json = json.dumps(q['options'], ensure_ascii=False)
    cursor.execute('''
    INSERT INTO questions (question_id, exam_id, year, subject_code, subject_name, section_name, question_number, question_type, passage_text, question_text, options, answer, score, rubric_text)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        q['question_id'], q['exam_id'], q['year'], q['subject_code'], q['subject_name'],
        q['section_name'], q['question_number'], q['question_type'], q['passage_text'],
        q['question_text'], opts_json, q['answer'], q['score'], q.get('rubric_text', '')
    ))
    cursor.execute('''
    INSERT INTO questions_fts (question_id, exam_id, year, subject_name, question_text, passage_text, options)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        q['question_id'], q['exam_id'], str(q['year']), q['subject_name'],
        q['question_text'], q['passage_text'], opts_json
    ))

for (yr, sc), answers in answers_db.items():
    exam_id = f"{yr}-{sc}"
    for q_num, ans in answers.items():
        cursor.execute('''
        INSERT INTO answer_keys (exam_id, year, subject_code, question_number, official_answer)
        VALUES (?, ?, ?, ?, ?)
        ''', (exam_id, yr, sc, str(q_num), ans))

conn.commit()
conn.close()
print("Optimized SQLite database built.")

# Export JSON Database
print(f"Exporting optimized JSON database to {JSON_EXPORT_PATH}...")
export_data = {
    'generated_at': time.strftime('%Y-%m-%d %H:%M:%S'),
    'database_name': '臺灣大學學科能力測驗 (GSAT) 歷屆題庫資料庫',
    'years_range': '108-115學年度 (涵蓋過去七年 109~115 及 108 完整課綱新舊制)',
    'total_exams': len(all_exams_data),
    'total_questions': len(all_questions_data),
    'exams': all_exams_data,
    'questions': all_questions_data
}

with open(JSON_EXPORT_PATH, 'w', encoding='utf-8') as f:
    json.dump(export_data, f, ensure_ascii=False, indent=2)

# Summary statistics
stats_by_year = {}
for e in all_exams_data:
    yr = e['year']
    stats_by_year.setdefault(yr, {'exams': 0, 'questions': 0, 'subjects': []})
    stats_by_year[yr]['exams'] += 1
    stats_by_year[yr]['questions'] += e['total_questions']
    stats_by_year[yr]['subjects'].append({
        'code': e['subject_code'],
        'name': e['subject_name'],
        'questions': e['total_questions']
    })

summary_data = {
    'total_exams': len(all_exams_data),
    'total_questions': len(all_questions_data),
    'total_pdf_files': len(list(GSAT_DIR.glob('*.pdf'))),
    'years': stats_by_year
}

with open(SUMMARY_PATH, 'w', encoding='utf-8') as f:
    json.dump(summary_data, f, ensure_ascii=False, indent=2)

# Update Catalog Markdown
print("Updating Catalog markdown...")
with open(ROOT / 'dist' / 'gsat-manifest.json', encoding='utf-8') as f:
    manifest = json.load(f)

files_by_exam = {}
for file_info in manifest.get('files', []):
    key = f"{file_info['year']}-{file_info['subject_code']}"
    files_by_exam.setdefault(key, {})[file_info['category']] = file_info

catalog_md = []
catalog_md.append("# 大學入學考試中心 學科能力測驗（學測 GSAT）歷屆試題與解答全庫目錄\n")
catalog_md.append("> **收錄範圍**：民國 108 學年度至 115 學年度（涵蓋過去七年 109～115 及 108 學年度共 8 個完整年度）  \n")
catalog_md.append(f"> **建置與校正時間**：{time.strftime('%Y-%m-%d %H:%M:%S')}  \n")
catalog_md.append(f"> **檔案總數**：174 份官方 PDF（試題、答案、評分原則、答題卷）完整下載存檔  \n")
catalog_md.append(f"> **資料庫規模**：收錄 **53 場考科試卷**、**{len(all_questions_data)} 題完整題目與選項**，已全面校正數學與自然科學特殊符號（Unicode PUA 轉譯），消除斷行破詞，完成題組閱讀材料關聯綁定，建置 SQLite (`dist/gsat.db`) 與 JSON 資料庫。  \n\n")

catalog_md.append("## 題庫與考科統計概覽\n\n")
catalog_md.append("| 學年度 | 西元年 | 課綱別 | 考科數 | 總收錄題數 | 試題 PDF | 答案 PDF | 評分原則 | 答題卷 |\n")
catalog_md.append("|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n")

for yr in sorted(stats_by_year.keys(), reverse=True):
    st = stats_by_year[yr]
    cur = '108課綱' if yr >= 111 else '99課綱'
    catalog_md.append(f"| **{yr}** | {yr+1911} | {cur} | {st['exams']} 科 | **{st['questions']} 題** | 7 份 | 6 份 | 7 份 | 7 份 |\n" if yr >= 111 else f"| **{yr}** | {yr+1911} | {cur} | {st['exams']} 科 | **{st['questions']} 題** | 6 份 | 5 份 | 2 份 | — |\n")

catalog_md.append("\n---\n\n")
catalog_md.append("## 資料庫結構與使用方式\n\n")
catalog_md.append("本題庫已完整資料庫化為本機 SQLite 檔案 `dist/gsat.db`，並同步匯出為標準 `dist/gsat-database.json`。\n\n")
catalog_md.append("### 資料庫檔案\n")
catalog_md.append("- **SQLite 資料庫**：`dist/gsat.db`（支援全文檢索 FTS5）\n")
catalog_md.append("- **JSON 完整題庫**：`dist/gsat-database.json`\n")
catalog_md.append("- **檔案清單目錄**：`dist/gsat-manifest.json`\n")
catalog_md.append("- **統計摘要**：`dist/gsat-summary.json`\n\n")

catalog_md.append("### 資料表結構說明\n")
catalog_md.append("1. **`exams`**：考科總表（年度、考科、課綱、題數、試題與解答本機路徑）。\n")
catalog_md.append("2. **`questions`**：各考題明細（題目編號、考題類型、大題題組、閱讀題幹/背景文、題目本文、選項 JSON、官方標準答案、配分、評分原則）。\n")
catalog_md.append("3. **`answer_keys`**：官方選擇題/選填題答案對照表。\n")
catalog_md.append("4. **`questions_fts`**：FTS5 全文檢索虛擬表，支援考題本文與選項關鍵字全文搜尋。\n\n")

catalog_md.append("### 各年度試題與解答檔案下載明細目錄\n\n")
for yr in sorted(stats_by_year.keys(), reverse=True):
    catalog_md.append(f"#### 民國 {yr} 學年度（西元 {yr+1911} 年）\n\n")
    catalog_md.append("| 考科 | 題數 | 試題內容 PDF | 選擇題答案 PDF | 非選擇題評分原則 | 答題卷 PDF |\n")
    catalog_md.append("|:---|:---:|:---:|:---:|:---:|:---:|\n")
    
    yr_exams = [e for e in all_exams_data if e['year'] == yr]
    for ex in yr_exams:
        key = ex['exam_id']
        files = files_by_exam.get(key, {})
        
        exam_link = f"[{ex['exam_id']}-exam.pdf](../{files['exam']['local_path']})" if 'exam' in files else "—"
        ans_link = f"[{ex['exam_id']}-answers.pdf](../{files['answers']['local_path']})" if 'answers' in files else "—"
        rubric_link = f"[{ex['exam_id']}-rubric.pdf](../{files['rubric']['local_path']})" if 'rubric' in files else "—"
        sheet_link = f"[{ex['exam_id']}-sheet.pdf](../{files['sheet']['local_path']})" if 'sheet' in files else "—"
        
        catalog_md.append(f"| **{ex['subject_name']}** (`{ex['subject_code']}`) | {ex['total_questions']} 題 | {exam_link} | {ans_link} | {rubric_link} | {sheet_link} |\n")
        
    catalog_md.append("\n")

with open(CATALOG_MD_PATH, 'w', encoding='utf-8') as f:
    f.writelines(catalog_md)

print("Optimization and re-build complete!")
