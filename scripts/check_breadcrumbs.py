import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

for sid, label in [('0J052424829869345634', 'xmfile_1'), ('0J052427633128416650', 'xmfile_2')]:
    url = f'https://www.ceec.edu.tw/xmfile?xsmsid={sid}'
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx) as r:
        html = r.read().decode('utf-8', errors='ignore')
    
    # print breadcrumbs or pathway
    pathway = re.findall(r'<li[^>]*class=["\']breadcrumb-item[^"\']*["\'][^>]*>(.*?)</li>', html, re.DOTALL)
    print(f"=== {label} ({sid}) ===")
    print("Breadcrumb:", [re.sub(r'<[^>]+>', '', p).strip() for p in pathway])
    
    # print table headers and first few rows
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
    print(f"Total rows: {len(rows)}")
    for row in rows[:8]:
        cols = [re.sub(r'<[^>]+>', '', c).strip() for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', row, re.DOTALL)]
        if any(cols):
            print("Row:", " | ".join(cols))
