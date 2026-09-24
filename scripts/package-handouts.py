import json,pathlib,zipfile
from pypdf import PdfReader
root=pathlib.Path('dist');manifest=json.loads((root/'handouts-manifest.json').read_text(encoding='utf-8'))
with zipfile.ZipFile(root/'downloads/handouts-all.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in manifest['files']:
  p=root/f['path'];reader=PdfReader(p)
  assert 1<=len(reader.pages)<=12,(p,len(reader.pages))
  f['pages']=len(reader.pages)
  assert all(float(page.mediabox.width)>590 and float(page.mediabox.height)>830 for page in reader.pages)
  z.write(p,f"grade-{f['grade']}/term-{f['term']}/{f['subject']}/{p.name}")
(root/'handouts-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Validated and packaged',len(manifest['files']),'handouts;',sum(f['pages'] for f in manifest['files']),'pages')
