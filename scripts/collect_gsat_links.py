import urllib.request
import re
import ssl
import json
from urllib.parse import urljoin

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

base_url = 'https://www.ceec.edu.tw/xmfile?xsmsid=0J052424829869345634'

# Subjects mapping helper
def classify_subject(title):
    # Normalize title
    t = title
    if '國文（選擇題）' in t or '國文(選擇題)' in t or '國綜' in t:
        return 'chinese_comp', '國語文綜合能力測驗(國綜/國文選擇)'
    elif '國寫' in t or '寫作' in t:
        return 'writing', '國語文寫作能力測驗(國寫)'
    elif '英文' in t:
        return 'english', '英文'
    elif '數學A' in t or '數學a' in t or '數A' in t:
        return 'math_a', '數學A'
    elif '數學B' in t or '數學b' in t or '數B' in t:
        return 'math_b', '數學B'
    elif '數學' in t:
        return 'math', '數學'
    elif '社會' in t:
        return 'social', '社會'
    elif '自然' in t:
        return 'science', '自然'
    return 'other', t

def classify_link(name, href):
    n = name.strip()
    h = href.lower()
    ext = 'pdf' if '.pdf' in h else ('docx' if '.docx' in h or '.doc' in h else 'other')
    
    cat = 'unknown'
    if '試題' in n or '試卷' in n:
        cat = 'exam'
    elif '選擇題答案' in n or '選擇(填)題答案' in n or '答案' in n:
        cat = 'answers'
    elif '評分原則' in n or '評分說明' in n or '非選擇題' in n:
        cat = 'rubric'
    elif '答題卷' in n:
        cat = 'sheet'
    return cat, ext

# Fetch pages 1 to 7 to cover 108~115 (and even 107 if on page 7)
items = []
for page in range(1, 8):
    url = f"{base_url}&page={page}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx) as r:
        html = r.read().decode('utf-8', errors='ignore')
    
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
    for tr in rows:
        cols = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, re.DOTALL)
        if len(cols) >= 3:
            date_str = re.sub(r'<[^>]+>', '', cols[0]).strip()
            title_str = re.sub(r'<[^>]+>', '', cols[1]).strip()
            if not title_str or title_str == '標題' or '發布日' in date_str:
                continue
            
            # parse year from title, e.g. "115學年度..."
            m_yr = re.search(r'(\d{3})學年度', title_str)
            if not m_yr:
                continue
            year = int(m_yr.group(1))
            
            subj_code, subj_name = classify_subject(title_str)
            
            links = []
            for a_m in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', cols[2], re.DOTALL):
                raw_name = re.sub(r'<[^>]+>', '', a_m.group(2)).strip()
                raw_href = urljoin(base_url, a_m.group(1).strip())
                cat, ext = classify_link(raw_name, raw_href)
                links.append({
                    'name': raw_name,
                    'url': raw_href,
                    'category': cat,
                    'extension': ext
                })
            
            items.append({
                'year': year,
                'year_ad': year + 1911,
                'title': title_str,
                'subject_code': subj_code,
                'subject_name': subj_name,
                'exam_date': date_str,
                'curriculum': '108課綱' if year >= 111 else '99課綱',
                'links': links
            })

with open('tmp/gsat_all_collected.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)

print(f"Collected total {len(items)} subject entries across pages 1-7.")
years_count = {}
for it in items:
    years_count[it['year']] = years_count.get(it['year'], 0) + 1
for y in sorted(years_count.keys(), reverse=True):
    print(f"Year {y}: {years_count[y]} subjects")
