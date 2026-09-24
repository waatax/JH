"""Import official objectives and curriculum codes, not teacher-coverage decisions."""
import json,pathlib,re
root=pathlib.Path(__file__).resolve().parent.parent
data=json.loads((root/'dist/alignment-data.json').read_text(encoding='utf-8'))
manifest=json.loads((root/'dist/cap-analysis-manifest.json').read_text(encoding='utf-8'))
lookup={q['id']:q for q in data['questions']};added=0;misses=[]
for f in manifest['files']:
 year,subject=f['year'],f['subject'];pages=json.loads((root/f'tmp/research/analysis/{year}-{subject}.json').read_text(encoding='utf-8'))
 written=False;last_number=None
 for i,page in enumerate(pages):
  if re.search(r'二[、.]\s*非選擇題',page) and i>5:written=True
  number=re.search(r'第\s*(\d+)\s*題',page)
  if number:last_number=int(number[1])
  target=re.search(r'評量目標\s*[：:]\s*([\s\S]*?)(?:命題依據|試題分析結果)',page)
  if not target or not last_number or i<3:continue
  n=last_number;id=f'{year}-{subject}-'+('written-' if written and subject=='math' else '')+str(n)
  if id not in lookup and subject=='listening':
   q=dict(id=id,year=year,subject=subject,number=str(n),kind='listening',page=None,status='pending',unitIds=[],required=[],evidence='',sourcePath=f['path'])
   data['questions'].append(q);lookup[id]=q
  if id not in lookup:misses.append(id);continue
  q=lookup[id]
  block=re.search(r'命題依據([\s\S]*?)(?:試題分析結果|評分結果)',page)
  normalized=re.sub(r'\s+','',block[1] if block else '').replace('Ⅳ','IV').replace('－','-')
  codes=re.findall(r'[\u4e00-\u9fff]?[A-Za-z0-9]+[-](?:IV|[789])[-]\d+',normalized)
  q.update(officialObjective=re.sub(r'\s+','',target[1]),officialCodes=list(dict.fromkeys(codes)),analysisPath=f['path'],analysisPage=i+1,analysisSource=f['sourceUrl'])
  if subject=='listening':q['page']=i+1
  added+=1
data['summary'].update(indexedQuestions=len(data['questions']),pending=sum(q['status']=='pending' for q in data['questions']),officialObjectives=sum(bool(q.get('officialObjective')) for q in data['questions']))
(root/'dist/alignment-data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print('Objectives imported',added,'unmatched',misses)
print(data['summary'])
