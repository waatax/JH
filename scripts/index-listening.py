import hashlib,json,pathlib,re,zipfile
from pypdf import PdfReader
root=pathlib.Path('dist');data=json.loads((root/'alignment-data.json').read_text(encoding='utf-8'));manifest=json.loads((root/'cap-manifest.json').read_text(encoding='utf-8'));derived=[]
lookup={q['id']:q for q in data['questions']}
for year in range(110,116):
 archive=root/f'downloads/cap/{year}-listening.zip'
 with zipfile.ZipFile(archive) as z:
  choices=sorted([i for i in z.infolist() if i.filename.lower().endswith('.pdf')],key=lambda i:(i.filename.count('/'),i.filename))
  assert choices
  selected=choices[0];content=z.read(selected)
  assert content.startswith(b'%PDF-')
  file=f'downloads/cap/{year}-listening.pdf';(root/file).write_bytes(content)
  derived.append(dict(year=year,subject='listening',path=file,archivePath=f'downloads/cap/{year}-listening.zip',member=selected.filename,sha256=hashlib.sha256(content).hexdigest(),bytes=len(content)))
 reader=PdfReader(root/file);pages=[p.extract_text() for p in reader.pages]
 (pathlib.Path('tmp/research')/f'{year}-listening.txt').write_text('\n'.join(pages),encoding='utf-8')
 # Question numbers are read from the actual booklet, not assumed from other years.
 numbers=set(int(n) for page in pages[1:] for n in re.findall(r'第\s*(\d+)\s*題',page))
 assert numbers and numbers==set(range(1,max(numbers)+1)),(year,numbers)
 for n in sorted(numbers):
  id=f'{year}-listening-{n}';page=next(i+1 for i,s in enumerate(pages[1:],1) if re.search(r'第\s*'+str(n)+r'\s*題',s))
  if id in lookup:q=lookup[id]
  else:
   q=dict(id=id,year=year,subject='listening',number=str(n),kind='listening',status='pending',unitIds=[],required=[],evidence='');data['questions'].append(q)
  q.update(sourcePath=file,page=page)
manifest['derivedFiles']=derived
data['summary'].update(indexedQuestions=len(data['questions']),pending=sum(q['status']=='pending' for q in data['questions']))
(root/'cap-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'alignment-data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print('Listening booklets indexed',len(derived),'questions',sum(q['subject']=='listening' for q in data['questions']))
