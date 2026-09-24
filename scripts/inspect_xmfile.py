import urllib.request
import re
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0'}

def inspect(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    
    # Check breadcrumb or h1/h2/h3
    headings = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', html, re.DOTALL)
    clean_h = [re.sub(r'<[^>]+>', '', h).strip() for h in headings]
    
    # Check tables or file download links
    file_links = []
    for href, text in re.findall(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html, re.DOTALL):
        if any(ext in href.lower() for ext in ['.pdf', '.zip', 'xmfile']):
            file_links.append({'text': re.sub(r'<[^>]+>', '', text).strip(), 'href': href})
            
    # Check query inputs/selects
    selects = []
    for sel in re.finditer(r'<select\b[^>]*name=["\']([^"\']+)["\'][^>]*>(.*?)</select>', html, re.DOTALL):
        name = sel.group(1)
        opts = re.findall(r'<option\b[^>]*value=["\']([^"\']*)["\'][^>]*>(.*?)</option>', sel.group(2), re.DOTALL)
        selects.append({'name': name, 'options': [{'value': v, 'text': re.sub(r'<[^>]+>', '', t).strip()} for v, t in opts]})

    return {
        'headings': clean_h,
        'selects': selects,
        'file_links_sample': file_links[:20],
        'total_file_links': len(file_links)
    }

res = {
    '0J052424829869345634': inspect('https://www.ceec.edu.tw/xmfile?xsmsid=0J052424829869345634'),
    '0J052427633128416650': inspect('https://www.ceec.edu.tw/xmfile?xsmsid=0J052427633128416650')
}

with open('tmp/ceec_diff.json', 'w', encoding='utf-8') as f:
    json.dump(res, f, ensure_ascii=False, indent=2)

print('Done diff')
