"""Read-only structural audit of downloaded PDF/ZIP/audio sources. Requires pypdf."""
from pathlib import Path
import hashlib
import json
import sys
import zipfile
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')

ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
manifest=json.loads((DIST/'cap-historical-manifest.json').read_text('utf-8'))
rows=[]
for file in manifest['files']:
    path=DIST/file['path']
    data=path.read_bytes()
    if len(data)!=file['bytes'] or hashlib.sha256(data).hexdigest()!=file['sha256']:
        raise ValueError(f'File integrity mismatch: {path.name}')
    row=dict(path=file['path'],format=path.suffix[1:],valid=True)
    if path.suffix=='.pdf':
        reader=PdfReader(path)
        count=len(reader.pages)
        if count<1: raise ValueError(f'Empty PDF: {path.name}')
        # Force every page object to resolve, including media boxes and streams.
        for page in reader.pages:
            if float(page.mediabox.width)<=0 or float(page.mediabox.height)<=0:
                raise ValueError(f'Invalid page size: {path.name}')
            contents=page.get_contents()
            if contents: contents.get_data()
        row['pages']=count
    elif path.suffix=='.zip':
        with zipfile.ZipFile(path) as archive:
            if archive.testzip(): raise ValueError(f'ZIP CRC failed: {path.name}')
            names=[info.filename for info in archive.infolist() if not info.is_dir()]
            if not names: raise ValueError(f'Empty ZIP: {path.name}')
            row['entries']=len(names)
            row['audioEntries']=sum(name.lower().endswith(('.mp3','.wav','.wma')) for name in names)
            row['pdfEntries']=sum(name.lower().endswith('.pdf') for name in names)
    else:
        if not (data.startswith(b'ID3') or (data[0]==255 and data[1]&224==224)):
            raise ValueError(f'Invalid MPEG signature: {path.name}')
        row['check']='MPEG signature and SHA-256; playback not audited'
    rows.append(row)
report=dict(checkedAt=manifest['checkedAt'],files=len(rows),pdfPages=sum(r.get('pages',0) for r in rows),
            note='檔案雜湊、PDF 頁物件及內容串流、ZIP CRC、MP3 檔頭檢查；不代表已逐題閱讀或聆聽。',results=rows)
(ROOT/'docs/cap-historical-source-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n','utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='results'},ensure_ascii=False))
