"""Download documents linked by CAP's official annual index; retain provenance."""
import concurrent.futures, hashlib, html, json, pathlib, re, urllib.request, urllib.parse
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist' / 'downloads' / 'cap'
OUT.mkdir(parents=True, exist_ok=True)
names = {'參考答案':'answers', '試題說明':'notes', '寫作測驗':'writing', '國文科':'chinese', '英語（閱讀）':'english', '英語（聽力）':'listening', '數學科':'math', '社會科':'social', '自然科':'science'}
jobs=[]
for year in range(109,116):
    page=f'https://cap.rcpet.edu.tw/exam/{year}/{year}exam.html'
    raw=(ROOT / 'tmp' / 'research' / f'cap-{year}.html').read_text(encoding='utf-8-sig')
    for url,label in re.findall(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>',raw,re.S):
        label=html.unescape(re.sub('<[^>]+>','',label)).strip()
        if label in names:
            jobs.append(dict(year=year,subject=names[label],label=label,sourcePage=page,sourceUrl=html.unescape(url)))
def run(row):
    path=OUT / f"{row['year']}-{row['subject']}.pdf"
    try:
        if path.with_suffix('.zip').exists(): path=path.with_suffix('.zip')
        if path.exists() and path.read_bytes()[:4] in [b'%PDF',b'PK\x03\x04']:
            data=path.read_bytes()
        else:
            m=re.search(r'/file/d/([^/]+)',row['sourceUrl'])
            url=f'https://drive.google.com/uc?export=download&id={m[1]}' if m else row['sourceUrl']
            with urllib.request.urlopen(url,timeout=90) as response: data=response.read()
            if b'Virus scan warning' in data:
                warning=data.decode('utf-8')
                action=html.unescape(re.search(r'<form[^>]*action="([^"]+)"',warning)[1])
                fields=dict(re.findall(r'<input[^>]*name="([^"]+)"[^>]*value="([^"]*)"',warning))
                if not action.startswith('https://drive.usercontent.google.com/'):raise ValueError('Unexpected download host')
                with urllib.request.urlopen(action+'?'+urllib.parse.urlencode(fields),timeout=90) as response:data=response.read()
            if data.startswith(b'PK'):
                path=path.with_suffix('.zip')
            elif not data.startswith(b'%PDF-'): raise ValueError('Response is not PDF or ZIP')
            path.write_bytes(data)
        row.update(status='downloaded',path=f'downloads/cap/{path.name}',bytes=len(data),sha256=hashlib.sha256(data).hexdigest())
    except Exception as e: row.update(status='failed',error=str(e))
    print(row['year'],row['subject'],row['status'],flush=True)
    return row
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: rows=list(pool.map(run,jobs))
manifest={'checkedAt':'2026-09-24','years':list(range(109,116)),'scope':'正式施測；不含補考。109年官方索引未列英聽題本。聽力原始下載為ZIP。','files':rows}
(ROOT/'dist'/'cap-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Downloaded',sum(r['status']=='downloaded' for r in rows),'of',len(rows))
