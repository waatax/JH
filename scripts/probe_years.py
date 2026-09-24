import urllib.request
import urllib.parse
import re
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

base_url = 'https://www.ceec.edu.tw/xmfile?xsmsid=0J052424829869345634'

# Let's test years from 2018 (107) to 2026 (115)
results = {}

for yr, roc_yr in [
    ('2026', 115),
    ('2025', 114),
    ('2024', 113),
    ('2023', 112),
    ('2022', 111),
    ('2021', 110),
    ('2020', 109),
    ('2019', 108),
    ('2018', 107),
]:
    # Query with GET or POST? Let's check GET first:
    url = f"{base_url}&Annaul={yr}&PageSize=50"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx) as r:
            html = r.read().decode('utf-8', errors='ignore')
            
        # find table rows
        rows_data = []
        for tr in re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL):
            cols = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, re.DOTALL)
            if len(cols) >= 3:
                date_str = re.sub(r'<[^>]+>', '', cols[0]).strip()
                title_str = re.sub(r'<[^>]+>', '', cols[1]).strip()
                # extract links in cols[2]
                links = []
                for a_m in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', cols[2], re.DOTALL):
                    links.append({
                        'href': urllib.parse.urljoin(base_url, a_m.group(1).strip()),
                        'name': re.sub(r'<[^>]+>', '', a_m.group(2)).strip()
                    })
                if title_str and title_str != '標題':
                    rows_data.append({
                        'date': date_str,
                        'title': title_str,
                        'links': links
                    })
        results[roc_yr] = {
            'year_ad': yr,
            'count': len(rows_data),
            'items': rows_data
        }
    except Exception as e:
        results[roc_yr] = {'error': str(e)}

with open('tmp/gsat_years_summary.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print('Checked all years.')
for yr in results:
    if 'error' in results[yr]:
        print(f"Year {yr}: ERROR {results[yr]['error']}")
    else:
        print(f"Year {yr}: {results[yr]['count']} subjects found")
        for item in results[yr]['items']:
            link_names = [l['name'] for l in item['links']]
            print(f"   {item['title']}: {', '.join(link_names)}")
