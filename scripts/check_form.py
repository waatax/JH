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

# find form
form_match = re.search(r'<form\b([^>]*)>(.*?)</form>', html, re.DOTALL | re.IGNORECASE)
if form_match:
    print("Form attributes:", form_match.group(1))
    # print input tags
    inputs = re.findall(r'<input\b[^>]*>', form_match.group(2))
    for inp in inputs:
        print("Input:", inp)
    # print select tags
    selects = re.findall(r'<select\b[^>]*>(.*?)</select>', form_match.group(2), re.DOTALL)
    print("Number of selects:", len(selects))
else:
    print("No form found")

# find javascript that handles filter/submit
scripts = re.findall(r'<script\b[^>]*>(.*?)</script>', html, re.DOTALL)
for s in scripts:
    if any(k in s for k in ['Annaul', 'search', 'submit', 'xsmsid']):
        print("Script snippet:", s[:300])
