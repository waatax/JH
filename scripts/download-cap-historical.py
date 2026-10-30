"""Fetch the verified historical official sources; keep downloads distinct from split questions."""
import concurrent.futures
import hashlib
import html
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
OUT = DIST / 'downloads/cap'
OUT.mkdir(parents=True, exist_ok=True)
source = json.loads((ROOT / 'data/cap-historical-sources.json').read_text('utf-8'))
jobs = []
for row in source['years']:
    if len(row['fileIds']) != len(source['subjects']):
        raise ValueError(f"Incomplete source year {row['year']}")
    for subject, label, file_id in zip(source['subjects'], source['labels'], row['fileIds']):
        jobs.append(dict(year=row['year'], kind=row['kind'], subject=subject,
                         label=row.get('listeningLabel', label) if subject == 'listening' else label,
                         fileId=file_id))
jobs += source['additional']

def extension(data):
    if data.startswith(b'%PDF-'): return '.pdf'
    if data.startswith(b'PK\x03\x04'): return '.zip'
    if data.startswith(b'ID3') or (len(data)>1 and data[0]==255 and data[1]&224==224): return '.mp3'
    raise ValueError('Unexpected format; no question data published')

def download(row):
    row = dict(row)
    row['sourcePage'] = f"https://cap.rcpet.edu.tw/exam/{row['year']}/{row['year']}exam.html"
    row['sourceUrl'] = f"https://drive.google.com/file/d/{row.pop('fileId')}/view?usp=drive_link"
    base = f"{row['year']}-" + (row['kind']+'-' if row['kind']=='xindian-retest' else '') + row['subject']
    try:
        existing = next((OUT/(base+suffix) for suffix in ['.pdf','.zip','.mp3'] if (OUT/(base+suffix)).exists()), None)
        if existing:
            data = existing.read_bytes()
            if extension(data) != existing.suffix: raise ValueError('Existing file extension mismatch')
            target = existing
        else:
            file_id = re.search(r'/file/d/([^/]+)',row['sourceUrl'])[1]
            url = 'https://drive.google.com/uc?'+urllib.parse.urlencode({'export':'download','id':file_id})
            with urllib.request.urlopen(url,timeout=60) as response: data=response.read()
            if b'Virus scan warning' in data:
                warning=data.decode('utf-8')
                action=html.unescape(re.search(r'<form[^>]*action="([^"]+)"',warning)[1])
                if not action.startswith('https://drive.usercontent.google.com/'): raise ValueError('Unexpected download host')
                fields=dict(re.findall(r'<input[^>]*name="([^"]+)"[^>]*value="([^"]*)"',warning))
                with urllib.request.urlopen(action+'?'+urllib.parse.urlencode(fields),timeout=90) as response: data=response.read()
            target=OUT/(base+extension(data))
            target.write_bytes(data)
        row.update(status='downloaded', path=target.relative_to(DIST).as_posix(), bytes=len(data), sha256=hashlib.sha256(data).hexdigest(), questionImportStatus='not-split')
    except Exception as error:
        row.update(status='failed', error=str(error), questionImportStatus='not-split')
    print(row['year'],row['subject'],row['status'],flush=True)
    return row

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    results=list(pool.map(download,jobs))
manifest=dict(checkedAt=source['checkedAt'], officialIndex=source['officialIndex'],
              note='原始題本及音訊典藏；未拆題，不列入互動題庫及 AI 解析完成數。102 年為試辦，105 年新店重考另列。', files=results)
(DIST/'cap-historical-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n','utf-8')
print('Downloaded',sum(r['status']=='downloaded' for r in results),'of',len(results),flush=True)
