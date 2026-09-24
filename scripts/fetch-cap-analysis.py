import concurrent.futures,hashlib,html,json,pathlib,re,urllib.request
from pypdf import PdfReader
ROOT=pathlib.Path(__file__).resolve().parent.parent
out=ROOT/'dist/downloads/cap-analysis';out.mkdir(parents=True,exist_ok=True)
cache=ROOT/'tmp/research/analysis';cache.mkdir(parents=True,exist_ok=True)
def fetch(job):
 year,id,label,url=job
 subject=next((v for k,v in [('數學','math'),('國文','chinese'),('自然','science'),('社會','social'),('聽力','listening'),('閱讀','english')] if k in label),None)
 if not subject:return
 p=out/f'{year}-{subject}.pdf'
 if not p.exists():p.write_bytes(urllib.request.urlopen('https://drive.google.com/uc?export=download&id='+id,timeout=90).read())
 assert p.read_bytes().startswith(b'%PDF-')
 j=cache/f'{year}-{subject}.json'
 if j.exists():pages=json.loads(j.read_text(encoding='utf-8'))
 else:
  pages=[page.extract_text() for page in PdfReader(p).pages]
  j.write_text(json.dumps(pages,ensure_ascii=False),encoding='utf-8')
 print(year,subject,len(pages),flush=True)
 return dict(year=year,subject=subject,label=label,sourcePage=url,sourceUrl='https://drive.google.com/file/d/'+id+'/view',path='downloads/cap-analysis/'+p.name,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),bytes=p.stat().st_size,pages=len(pages))
def main():
 jobs=[]
 for year in range(111,116):
  raw=(ROOT/f'tmp/research/cap-{year}.html').read_text(encoding='utf-8-sig')
  url=next(u for u,t in re.findall(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>',raw,re.S) if '各科試題分析' in t)
  s=urllib.request.urlopen(url,timeout=45).read().decode('utf-8')
  for m in re.finditer(r'<tr data-selectable data-id="([^"]+)"(.*?)</tr>',s,re.S):
   labels=re.findall(r'data-tooltip="([^"]+)"',m[2]);label=html.unescape(labels[0]) if labels else ''
   if '.pdf' in label:jobs.append((year,m[1],label,url))
 with concurrent.futures.ProcessPoolExecutor(max_workers=3) as pool:rows=[r for r in pool.map(fetch,jobs) if r]
 (ROOT/'dist/cap-analysis-manifest.json').write_text(json.dumps({'checkedAt':'2026-09-24','files':rows},ensure_ascii=False,indent=2),encoding='utf-8')
 print('Complete',len(rows))
if __name__=='__main__':main()
