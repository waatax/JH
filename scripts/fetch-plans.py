"""Collect public publisher curriculum plans for research, without republishing books."""
import concurrent.futures, html, json, pathlib, re, urllib.request, zipfile, xml.etree.ElementTree as ET
ROOT=pathlib.Path(__file__).resolve().parent.parent
out=ROOT/'tmp'/'research'/'plans';out.mkdir(parents=True,exist_ok=True)
base='https://www.knsh.com.tw/service/plan'
raw=urllib.request.urlopen(base).read().decode('utf-8')
section=raw.split('國中課程（康軒版）')[1].split('<!-- basic education curriculum -->')[0]
folders=re.findall(r'href="https://drive.google.com/drive/folders/([^?"/]+)[^"]*"[^>]*title="([^"(]+)',section)
seen=set(); jobs=[]
def walk(id,subject,depth=0):
 if id in seen or depth>3:return
 seen.add(id)
 s=urllib.request.urlopen('https://drive.google.com/drive/folders/'+id,timeout=40).read().decode('utf-8')
 for m in re.finditer(r'<tr data-selectable data-id="([^"]+)"(.*?)</tr>',s,re.S):
  labels=re.findall(r'data-tooltip="([^"]+)"',m[2]); label=html.unescape(labels[0]) if labels else ''
  if '.docx' in label:jobs.append((m[1],subject,label))
  elif 'folder' in label and '直式' not in label:walk(m[1],subject,depth+1)
for id,subject in folders:
 try:walk(id,subject)
 except Exception as e:print(subject,str(e),flush=True)
def fetch(job):
 id,subject,label=job; path=out/(id+'.docx')
 try:
  if not path.exists():path.write_bytes(urllib.request.urlopen('https://drive.google.com/uc?export=download&id='+id,timeout=60).read())
  with zipfile.ZipFile(path) as z:xml=ET.fromstring(z.read('word/document.xml'))
  ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
  rows=[]
  for tr in xml.findall('.//w:tr',ns):
   cells=['\n'.join(''.join(p.itertext()) for p in tc.findall('./w:p',ns)) for tc in tr.findall('./w:tc',ns)]
   if cells:rows.append(cells)
  record=dict(publisher='康軒',label=label,subject=subject,url='https://drive.google.com/file/d/'+id+'/view',sourcePage=base,rows=rows)
  (out/(id+'.json')).write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
  print(label,flush=True);return record
 except Exception as e:print(label,str(e),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:records=[x for x in pool.map(fetch,jobs) if x]
(out/'index.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print('Plans:',len(records))
