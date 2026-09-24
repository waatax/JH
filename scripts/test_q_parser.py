import pdfplumber
import pathlib
import json
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
GSAT_DIR = ROOT / 'dist' / 'downloads' / 'gsat'

def parse_exam_questions(exam_file, official_answers, rubric_text_summary=""):
    # filename e.g. 115-chinese_comp-exam.pdf
    parts = exam_file.stem.split('-')
    year = int(parts[0])
    subj_code = parts[1]
    
    with pdfplumber.open(exam_file) as pdf:
        pages_raw = [page.extract_text() or '' for page in pdf.pages]

    # Skip cover page (page 0)
    pages_text = pages_raw[1:] if len(pages_raw) > 1 else pages_raw
    
    # Clean headers & footers
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
    
    questions = []
    
    # Subject-specific logic:
    # 1. Writing (國寫)
    if subj_code == 'writing':
        # Split into 大題 一 and 二
        sec1_match = re.search(r'一、\s*(.*?)(?=二、|\Z)', full_text, re.DOTALL)
        sec2_match = re.search(r'二、\s*(.*?)(?=\Z)', full_text, re.DOTALL)
        
        if sec1_match:
            c1 = sec1_match.group(1).strip()
            # check for 問題（一）, 問題（二）
            q1_sub = re.findall(r'(問題[（(][一二12][）)].*?)(?=(?:問題[（(][一二12][）)]|\Z))', c1, re.DOTALL)
            if q1_sub:
                # Background text is before the first subquestion
                first_pos = c1.find(q1_sub[0])
                passage = c1[:first_pos].strip()
                for idx, sq in enumerate(q1_sub, 1):
                    # extract score
                    m_score = re.search(r'[（(]占\s*(\d+)\s*分[）)]', sq)
                    score = f"{m_score.group(1)}分" if m_score else ""
                    questions.append({
                        'question_number': f"一-{idx}",
                        'section_name': '第一大題（知性題）',
                        'question_type': '寫作題/非選擇題',
                        'passage_text': passage,
                        'question_text': sq.strip(),
                        'options': {},
                        'score': score,
                        'answer': '非選擇題（依評分原則評閱）'
                    })
            else:
                questions.append({
                    'question_number': '一',
                    'section_name': '第一大題（知性題）',
                    'question_type': '寫作題/非選擇題',
                    'passage_text': '',
                    'question_text': c1,
                    'options': {},
                    'score': '25分',
                    'answer': '非選擇題（依評分原則評閱）'
                })
                
        if sec2_match:
            c2 = sec2_match.group(1).strip()
            questions.append({
                'question_number': '二',
                'section_name': '第二大題（情意題）',
                'question_type': '寫作題/非選擇題',
                'passage_text': '',
                'question_text': c2,
                'options': {},
                'score': '25分',
                'answer': '非選擇題（依評分原則評閱）'
            })
            
        return questions

    # Standard subjects (chinese_comp, english, math_a, math_b, math, social, science)
    # Let's track sections:
    # Typical sections:
    # "第壹部分、選擇題", "第壹部分、選擇（填）題", "一、單選題", "二、多選題", "三、選填題", "第貳部分、混合題或非選擇題", "第參部分、非選擇題"
    
    # We can split the document by question numbers or iterate through lines.
    # Notice questions are formatted as:
    # ^(\d+)\.\s or ^(\d+)\s+[^\d] or ^[A-Z]\.\s or ^第\s*(\d+)\s*題
    
    # Let's detect lines that start a new question:
    lines = full_text.split('\n')
    current_section = "第壹部分"
    current_passage = ""
    current_q_num = None
    current_q_lines = []
    
    def finalize_question(q_num, q_lines, sec, passage):
        if not q_num or not q_lines:
            return None
        raw_q_text = '\n'.join(q_lines).strip()
        
        # Extract options: (A), (B), (C), (D) or (1), (2), (3), (4), (5)
        # Check if options exist:
        options = {}
        # Find (A), (B), (C), (D), (E)
        letter_opts = re.findall(r'(\([A-J]\)|[A-J]\.)\s*(.*?)(?=(?:\([A-J]\)|[A-J]\.|\Z))', raw_q_text, re.DOTALL)
        if letter_opts and len(letter_opts) >= 3:
            for opt_k, opt_v in letter_opts:
                k_clean = re.sub(r'[\(\)\.]', '', opt_k).strip()
                options[f"({k_clean})"] = opt_v.strip()
        else:
            # Check for (1), (2), (3), (4), (5)
            num_opts = re.findall(r'(\([1-5]\))\s*(.*?)(?=(?:\([1-5]\)|\Z))', raw_q_text, re.DOTALL)
            if num_opts and len(num_opts) >= 3:
                for opt_k, opt_v in num_opts:
                    options[opt_k] = opt_v.strip()
        
        # Clean stem text by removing options part if extracted cleanly
        stem = raw_q_text
        if options:
            first_opt = list(options.keys())[0]
            pos = stem.find(first_opt)
            if pos > 0:
                stem = stem[:pos].strip()
        
        # Determine question type
        q_type = "單選題"
        if "多選題" in sec:
            q_type = "多選題"
        elif "選填題" in sec:
            q_type = "選填題"
        elif "混合題" in sec or "非選擇題" in sec:
            q_type = "混合題/非選擇題"
            
        # Official answer
        ans = official_answers.get(str(q_num), "")
        if not ans and '-' in str(q_num):
            ans = official_answers.get(str(q_num), "")
        if not ans:
            # Maybe non-choice
            if q_type == "混合題/非選擇題":
                ans = "非選擇題（見評分原則）"
            elif official_answers.get(str(q_num)) == '／':
                ans = "非選擇題（見評分原則）"
            else:
                ans = official_answers.get(str(q_num), "")
                
        # Points / score weight
        score = ""
        m_score = re.search(r'[（(]占\s*(\d+)\s*分[）)]|每題\s*(\d+)\s*分|（\s*(\d+)\s*分\s*）', raw_q_text)
        if m_score:
            score = f"{m_score.group(1) or m_score.group(2) or m_score.group(3)}分"
        elif "每題2分" in sec:
            score = "2分"
        elif "每題4分" in sec:
            score = "4分"
        elif "每題5分" in sec:
            score = "5分"
            
        return {
            'question_number': str(q_num),
            'section_name': sec,
            'question_type': q_type,
            'passage_text': passage,
            'question_text': stem,
            'options': options,
            'score': score,
            'answer': ans
        }

    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Check Section header
        if re.match(r'^(?:第[壹貳參肆]部分|一、|二、|三、|四、|五、|伍、).*?[（(].*?分[）)]', line) or \
           re.match(r'^(?:第[壹貳參肆]部分|選擇題|非選擇題|混合題|單選題|多選題|選填題)', line):
            current_section = line
            # If section changed, passage is reset
            current_passage = ""
            i += 1
            continue
            
        # Check Passage announcement, e.g. "6-8為題組。閱讀下文，回答6-8題。" or "第41至44題為題組"
        m_pas = re.match(r'^(\d+[-~至]\d+)\s*(?:為題組|題為題組|.*回答第?\s*\d+[-~至]\d+題)', line)
        if m_pas or ('題組' in line and any(k in line for k in ['閱讀', '下文', '依據', '資料', '回答'])):
            # Collect passage lines until next question
            pas_lines = [line]
            i += 1
            while i < len(lines):
                next_l = lines[i].strip()
                if re.match(r'^\d+\.\s+', next_l) or re.match(r'^[A-Z]\.\s+', next_l):
                    break
                pas_lines.append(lines[i])
                i += 1
            current_passage = '\n'.join(pas_lines).strip()
            continue
            
        # Check start of question: "1. ", "2. ", "13. ", "A. "
        m_q = re.match(r'^(\d+)\.\s*(.*)', line)
        if not m_q:
            # Check old math fill-in e.g. "A. 坐標平面..."
            m_q = re.match(r'^([A-G])\.\s*(.*)', line)
            
        if m_q:
            # Finalize previous question
            if current_q_num:
                q_obj = finalize_question(current_q_num, current_q_lines, current_section, current_passage)
                if q_obj:
                    questions.append(q_obj)
            current_q_num = m_q.group(1)
            current_q_lines = [m_q.group(2)]
            i += 1
            continue
            
        # Otherwise append line to current question lines
        if current_q_num:
            current_q_lines.append(line)
        i += 1
        
    # Finalize last question
    if current_q_num:
        q_obj = finalize_question(current_q_num, current_q_lines, current_section, current_passage)
        if q_obj:
            questions.append(q_obj)
            
    return questions

# Test on 115-chinese_comp-exam.pdf
with open(ROOT / 'tmp' / 'parsed_all_answers.json', encoding='utf-8') as f:
    all_ans = json.load(f)

ans_115_chinese = all_ans.get('115-chinese_comp', {}).get('answers', {})
parsed_q = parse_exam_questions(GSAT_DIR / '115-chinese_comp-exam.pdf', ans_115_chinese)
print(f"115-chinese_comp: parsed {len(parsed_q)} questions")
for q in parsed_q[:5]:
    print(f"  Q{q['question_number']} ({q['question_type']}): {q['question_text'][:40]}... Ans: {q['answer']} Options: {list(q['options'].keys())}")

ans_115_math = all_ans.get('115-math_a', {}).get('answers', {})
parsed_qm = parse_exam_questions(GSAT_DIR / '115-math_a-exam.pdf', ans_115_math)
print(f"115-math_a: parsed {len(parsed_qm)} questions")
for q in parsed_qm[:5]:
    print(f"  Q{q['question_number']} ({q['question_type']}): {q['question_text'][:40]}... Ans: {q['answer']} Options: {list(q['options'].keys())}")
