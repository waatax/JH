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

all_items = []

for page in range(1, 10):
    url = f"{base_url}&page={page}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx) as r:
        html = r.read().decode('utf-8', errors='ignore')
    
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
    page_items = []
    for tr in rows:
        cols = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, re.DOTALL)
        if len(cols) >= 3:
            date_str = re.sub(r'<[^>]+>', '', cols[0]).strip()
            title_str = re.sub(r'<[^>]+>', '', cols[1]).strip()
            links = []
            for a_m in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', cols[2], re.DOTALL):
                links.append({
                    'name': re.sub(r'<[^>]+>', '', a_m.group(2)).strip(),
                    'href': urljoin(base_url, a_m.group(1).strip())
                })
            if title_str and title_str != '標題' and '發布日' not in date_str:
                page_items.append({'date': date_str, 'title': title_str, 'links': links})
                all_items.append({'page': page, 'date': date_str, 'title': title_str, 'links': links})
    print(f"Page {page}: found {len(page_items)} items. First title: {page_items[0]['title'] if page_items else 'None'}")

with open('tmp/pages_1_to_9.json', 'w', encoding='utf-8') as f:
    json.dump(all_items, f, ensure_ascii=False, indent=2)

print(f"Total collected: {len(all_items)}")
