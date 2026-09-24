import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

url = 'https://www.ceec.edu.tw/xmfile?xsmsid=0J052424829869345634'
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, context=ctx) as r:
    html = r.read().decode('utf-8', errors='ignore')

for m in re.finditer(r'pagingHelper\b[^\n]+', html):
    print(m.group(0))

# Also search for scripts src
for src in re.findall(r'<script\b[^>]*src=["\']([^"\']+)["\']', html):
    print("Script src:", src)
