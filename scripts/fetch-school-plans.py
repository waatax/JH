import concurrent.futures, html, json, pathlib, re, urllib.parse, urllib.request
from pypdf import PdfReader
root=pathlib.Path('tmp/research/school-plans');root.mkdir(parents=True,exist_ok=True)
pages=[('https://www.chjhs.ntpc.edu.tw/p/405-1000-16500,c718.php?Lang=zh-tw',115,1),('https://www.mdhs.ntpc.edu.tw/p/405-1000-19520,c852.php',114,2)]
jobs=[]
for url,year,term in pages:
 s=urllib.request.urlopen(url,timeout=45).read().decode('utf-8')
 for href,label in re.findall(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>',s,re.S):
  title=html.unescape(re.sub('<[^>]*>','',label)).strip()
  if title.endswith('.pdf') and any(p in title for p in ['翰林','南一']):
   jobs.append(dict(label=title,sourcePage=url,url=urllib.parse.urljoin(url,html.unescape(href)),schoolYear=year,term=term,publisher='翰林' if '翰林' in title else '南一'))
def fetch(row):
 try:
  key=str(row['schoolYear'])+'-'+str(row['term'])+'-'+str(jobs.index(row));p=root/(key+'.pdf')
  if not p.exists():p.write_bytes(urllib.request.urlopen(row['url'],timeout=60).read())
  reader=PdfReader(p);text='\n'.join(f'[PAGE {i+1}]\n'+page.extract_text() for i,page in enumerate(reader.pages))
  (root/(key+'.txt')).write_text(text,encoding='utf-8');row['textFile']=str(root/(key+'.txt'));row['pages']=len(reader.pages)
  print(row['label'],flush=True);return row
 except Exception as e:print(row['label'],str(e),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=[r for r in pool.map(fetch,jobs) if r]
(root/'index.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
