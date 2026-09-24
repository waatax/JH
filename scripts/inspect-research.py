import pathlib,re
from pypdf import PdfReader
r=pathlib.Path('tmp/research')
for f in pathlib.Path('dist/downloads/cap').glob('*.pdf'):
    reader=PdfReader(f)
    (r/(f.stem+'.txt')).write_text('\n'.join(f'\n[PDF PAGE {i+1}]\n'+p.extract_text() for i,p in enumerate(reader.pages)),encoding='utf-8')
for name in ['knsh-math','nani','hle']:
    s=(r/(name+'.html')).read_text(encoding='utf-8')
    print(name)
    print('\n'.join(re.findall(r'.{0,100}(?:data-id=|課程計畫|七年級|數學領域).{0,150}',s)[-20:]))
