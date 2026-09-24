"""Build a traceable inventory; unreviewed rows never count as covered."""
import json,pathlib,re,hashlib
root=pathlib.Path(__file__).resolve().parent.parent
plans=json.loads((root/'tmp/research/plans/index.json').read_text(encoding='utf-8'))
def subject_for(label,grade):
 for key,value in [('中國','chinese'),('中英','english'),('中數','math'),('公民','civics'),('歷史','history'),('地理','geography'),('地科','earth'),('理化','physics'),('視覺','visual'),('音樂','music'),('表演','performing'),('健康','health'),('體育','pe'),('家政','home'),('童軍','scout'),('輔導','guidance'),('資科','computing'),('生科','technology'),('中閩','local')]:
  if key in label:return value
 if '中自' in label:return 'biology' if grade==7 else 'physics'
 return None
books=[]
for p in plans:
 label=p['label']
 if any(k in label for k in ['(分科)','(合科)','(對開','~$']):continue
 m=re.search(r'([123])([上下])',label)
 if not m:continue
 grade=int(m[1])+6;term=1 if m[2]=='上' else 2;subject=subject_for(label,grade)
 if not subject:continue
 chapters={}
 for row in p['rows']:
  if len(row)<10 or row[0]=='週次':continue
  chapter=row[2].strip();lesson=row[3].strip()
  if not lesson or '定期' in lesson or '總複習' in lesson:continue
  key=(chapter,lesson)
  codes=set(re.findall(r'[A-Za-z一-龥]+\s*[-－]\s*(?:[789]|IV|Ⅳ|[A-Za-z]+)\s*[-－]\s*\d+',row[7]+'\n'+row[8]))
  codes={re.sub(r'\s+','',c).replace('－','-').replace('Ⅳ','IV') for c in codes}
  if key not in chapters:chapters[key]={'chapter':chapter,'lesson':lesson,'codes':set()}
  chapters[key]['codes'].update(codes)
 bookId=f'knsh-115-{subject}-{grade}-{term}'
 books.append(dict(id=bookId,publisher='康軒',schoolYear=115,grade=grade,term=term,subject=subject,title=label.replace(' Microsoft Word',''),sourceUrl=p['url'],sourcePage=p['sourcePage'],sourceKind='出版社公開課程計畫',chapters=[dict(id=bookId+'-'+str(i+1),chapter=c['chapter'],lesson=c['lesson'],codes=sorted(c['codes']),status='pending',unitIds=[]) for i,c in enumerate(chapters.values())]))
questions=[];papers=[]
for year in range(109,116):
 for subject in ['chinese','english','math','social','science']:
  raw=(root/f'tmp/research/{year}-{subject}.txt').read_text(encoding='utf-8')
  first=raw.split('[PDF PAGE 2]')[0]
  found=re.search(r'(\d+)\s*題\s*選擇題',first)
  if found:count=int(found[1])
  elif (year,subject)==(113,'english'):
   # The cover is an image; the body explicitly labels the second section 22-43.
   assert re.search(r'22\s*-\s*43\s*題',raw)
   count=43
  else:raise ValueError(f'Cannot read question count: {year}-{subject}')
  pages=raw.split('[PDF PAGE ')
  for number in range(1,count+1):
   page=None
   for chunk in pages[2:]:
    if re.search(r'(?:^|\n)\s*'+str(number)+r'\s*[.．、]\s*',chunk):page=int(chunk.split(']')[0]);break
   questions.append(dict(id=f'{year}-{subject}-{number}',year=year,subject=subject,number=str(number),kind='choice',page=page,status='pending',unitIds=[],required=[],evidence='',sourcePath=f'downloads/cap/{year}-{subject}.pdf'))
  if subject=='math':
   for n in [1,2]:questions.append(dict(id=f'{year}-math-written-{n}',year=year,subject=subject,number=f'非選 {n}',kind='written',page=None,status='pending',unitIds=[],required=[],evidence='',sourcePath=f'downloads/cap/{year}-{subject}.pdf'))
  papers.append(dict(year=year,subject=subject,choiceCount=count))
 questions.append(dict(id=f'{year}-writing-1',year=year,subject='writing',number='寫作',kind='writing',page=1,status='pending',unitIds=[],required=[],evidence='',sourcePath=f'downloads/cap/{year}-writing.pdf'))
manifest=json.loads((root/'dist/cap-manifest.json').read_text(encoding='utf-8'))
data=dict(checkedAt='2026-09-24',books=books,papers=papers,questions=questions,scope='課綱代碼由公開課程計畫抽取；章節關聯不等於完整覆蓋。尚未逐題審核者維持待核對。',sources=[dict(name='國家教育研究院課綱',url='https://www.naer.edu.tw/PageSyllabus?fid=52'),dict(name='康軒國中課程計畫',url='https://www.knsh.com.tw/service/plan'),dict(name='會考官方歷屆試題',url='https://cap.rcpet.edu.tw/examination.html')])
(root/'dist/alignment-data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print('Books',len(books),'chapters',sum(len(b['chapters']) for b in books),'questions',len(questions))
