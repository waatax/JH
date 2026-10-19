"""Download the official documents linked from NAER, retaining page text and hashes."""
import concurrent.futures, hashlib, json, pathlib, re, urllib.request
from urllib.parse import urljoin, quote
from pypdf import PdfReader

base='https://stv.naer.edu.tw/teaching/course_outline.jsp'
root=pathlib.Path(__file__).resolve().parent.parent
out=root/'tmp/official-curriculum';out.mkdir(parents=True,exist_ok=True)
html=urllib.request.urlopen(base,timeout=60).read().decode('utf-8')
links=re.findall(r'href=[\"\']([^\"\']+\.pdf)[\"\']',html)
selection={'chinese':0,'english':1,'taiwanese':4,'hakka':6,'mindong':7,'indigenous':9,'sign':10,'math':12,'social':13,'science':14,'arts':15,'integrative':16,'technology':17,'health':18}

def fetch(item):
 key,index=item
 url=quote(urljoin(base,links[index]),safe=':/%()?=&')
 path=out/f'{key}.pdf'
 if not path.exists():path.write_bytes(urllib.request.urlopen(url,timeout=90).read())
 reader=PdfReader(path)
 pages=[p.extract_text() for p in reader.pages] if key=='math' else [p.extract_text(extraction_mode='layout') for p in reader.pages]
 (out/f'{key}.json').write_text(json.dumps(pages,ensure_ascii=False),encoding='utf-8')
 (out/f'{key}.txt').write_text('\n'.join(f'\n[PDF PAGE {i+1}]\n{text}' for i,text in enumerate(pages)),encoding='utf-8')
 return {'id':key,'url':url,'indexUrl':base,'retrievedAt':'2026-10-18','pages':len(pages),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 results=[]
 for key,future in [(key,pool.submit(fetch,(key,index))) for key,index in selection.items()]:
  try: results.append(future.result())
  except Exception as e: print(key, str(e))
(root/'docs/official-curriculum-sources.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps([{k:v for k,v in r.items() if k in ['id','pages']} for r in results]))
