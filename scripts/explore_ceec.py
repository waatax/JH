import urllib.request
import re
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def get_html(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
        return resp.read().decode('utf-8', errors='ignore')

# Let's inspect the two candidate links:
# 1: 0J052424829869345634
# 2: 0J052427633128416650
urls = [
    ('xmfile_A', 'https://www.ceec.edu.tw/xmfile?xsmsid=0J052424829869345634'),
    ('xmfile_B', 'https://www.ceec.edu.tw/xmfile?xsmsid=0J052427633128416650'),
    ('ExamInfo_A', 'https://ap.ceec.edu.tw/RegExam/ExamInfo/A'),
    ('ExamInfo_B', 'https://ap.ceec.edu.tw/RegExam/ExamInfo/B'),
]

results = {}
for name, url in urls:
    try:
        html = get_html(url)
        # title
        title = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
        t_str = title.group(1).strip() if title else ''
        # find select options or table contents or links
        links = re.findall(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html, re.DOTALL)
        clean_links = []
        for href, txt in links:
            txt_clean = re.sub(r'<[^>]+>', '', txt).strip()
            if any(k in txt_clean for k in ['試題', '學測', '分科', '指考', '國文', '英文', '數學', '社會', '自然', '答案', '解答', '113', '112', '111', '110', '109', '108', '107']):
                clean_links.append({'text': txt_clean, 'href': href})
        
        # also find select options (like year dropdown)
        options = re.findall(r'<option\b[^>]*value=["\']([^"\']*)["\'][^>]*>(.*?)</option>', html, re.DOTALL)
        clean_options = [{'value': v, 'text': re.sub(r'<[^>]+>', '', t).strip()} for v, t in options]

        results[name] = {
            'url': url,
            'title': t_str,
            'matching_links_sample': clean_links[:20],
            'matching_links_count': len(clean_links),
            'options_sample': clean_options[:20]
        }
    except Exception as e:
        results[name] = {'url': url, 'error': str(e)}

with open('tmp/ceec_probe.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print('Probe completed, written to tmp/ceec_probe.json')
