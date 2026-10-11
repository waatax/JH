"""Extract 會考 109–115 official papers into structured, renderable question data.

Output
  dist/cap-bank.json             questions, groups, answers, official analysis stats
  dist/cap-img/<year>/<id>.webp  per-question / per-group crops rendered from the official PDF

Every question keeps BOTH a faithful image crop (figures, tables, formulas) and the
extracted text (search, screen readers). Run with a Python that has PyMuPDF + Pillow:
  python scripts/extract_cap.py [--years 114,115] [--subjects math]
"""
from __future__ import annotations

import argparse
import io
import json
import re
import sys
import zipfile
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
CAP = DIST / 'downloads' / 'cap'
ANALYSIS = DIST / 'downloads' / 'cap-analysis'
IMG = DIST / 'cap-img'
YEARS = list(range(109, 116))
SUBJECTS = ['chinese', 'english', 'listening', 'math', 'social', 'science']
ZOOM = 2.0
FOOTER_Y = 752.0
TOP_Y = 40.0
MARGIN_X = 78.0

ANCHOR = re.compile(r'^(?:第\s*(\d{1,2})\s*題|(\d{1,2})\s*[\.．])')
ANCHOR_PREFIX = re.compile(r'^(?:第\s*\d{1,2}\s*題|\d{1,2}\s*[\.．])\s*')


def anchor_no(text: str):
    m = ANCHOR.match(text)
    return int(m.group(1) or m.group(2)) if m else None
GROUP_PATTERNS = [
    re.compile(r'^[\(（]\s*(\d{1,2})\s*[-–~～至]\s*(\d{1,2})\s*[\)）]'),
    re.compile(r'(\d{1,2})\s*[-–~～至]\s*(\d{1,2})\s*題'),
    re.compile(r'(?:questions?|Questions?)\s*(\d{1,2})\s*[-–~～]\s*(\d{1,2})'),
]
WRITTEN_HEAD = re.compile(r'非選擇題')
SECTION = re.compile(r'^第[一二三四五六]部分|^作答說明|^非選擇題|^示範題')
OPTION = re.compile(r'[\(（]\s*([A-D])\s*[\)）]')


def expected_counts() -> dict:
    data = json.loads((DIST / 'alignment-data.json').read_text('utf-8'))
    out: dict = {}
    for q in data['questions']:
        key = (q['year'], q['subject'])
        out.setdefault(key, {'choice': 0, 'written': 0, 'meta': {}})
        if q['kind'] in ('choice', 'listening'):
            out[key]['choice'] += 1
        elif q['kind'] == 'written':
            out[key]['written'] += 1
        out[key]['meta'][q['id']] = q
    return out


def page_lines(page) -> list[dict]:
    rows = []
    for block in page.get_text('dict')['blocks']:
        for line in block.get('lines', []):
            text = ''.join(span['text'] for span in line['spans'])
            if not text.strip():
                continue
            x0, y0, x1, y1 = line['bbox']
            if y0 >= FOOTER_Y or y1 <= TOP_Y:
                continue
            rows.append({'x0': x0, 'y0': y0, 'x1': x1, 'y1': y1, 'text': text.strip()})
    rows.sort(key=lambda r: (round(r['y0'] / 3), r['x0']))
    return rows


def page_graphics(page) -> list[tuple]:
    rects = []
    for d in page.get_drawings():
        r = d.get('rect')
        if r is None or r.height > 650 or r.width > 560:
            continue
        if r.y0 >= FOOTER_Y or r.y1 <= TOP_Y:
            continue
        rects.append((r.x0, r.y0, r.x1, r.y1))
    for info in page.get_image_info():
        x0, y0, x1, y1 = info['bbox']
        if y0 >= FOOTER_Y or y1 <= TOP_Y:
            continue
        rects.append((x0, y0, x1, y1))
    return rects


def group_range(text: str, expect: int):
    for pat in GROUP_PATTERNS:
        m = pat.search(text)
        if m:
            a, b = int(m.group(1)), int(m.group(2))
            if a == expect and b > a and b - a <= 8:
                return a, b
    return None


def find_markers(doc, counts) -> list[dict]:
    """Walk the paper in reading order and return question / group / written markers."""
    total_choice, total_written = counts['choice'], counts['written']
    markers, expect, phase, wexpect = [], 1, 'choice', 1
    for pno in range(1, doc.page_count):
        lines = page_lines(doc[pno])
        for ln in lines:
            if ln['x0'] > MARGIN_X:
                continue
            text = ln['text']
            if SECTION.search(text) and not anchor_no(text):
                markers.append({'type': 'break', 'page': pno, 'y': ln['y0']})
                if phase == 'choice' and expect > total_choice and total_written and WRITTEN_HEAD.search(text):
                    phase = 'written'
                continue
            if phase == 'choice' and expect > total_choice and total_written and WRITTEN_HEAD.search(text):
                phase = 'written'
                markers.append({'type': 'break', 'page': pno, 'y': ln['y0']})
                continue
            if phase == 'choice' and expect <= total_choice:
                rng = group_range(text, expect)
                if rng and not anchor_no(text):
                    markers.append({'type': 'group', 'page': pno, 'y': ln['y0'], 'range': rng})
                    continue
                if anchor_no(text) == expect:
                    markers.append({'type': 'q', 'page': pno, 'y': ln['y0'], 'n': expect, 'kind': 'choice'})
                    expect += 1
            elif phase == 'written' and wexpect <= total_written:
                if anchor_no(text) == wexpect:
                    markers.append({'type': 'q', 'page': pno, 'y': ln['y0'], 'n': wexpect, 'kind': 'written'})
                    wexpect += 1
    return markers


def regions_for(doc, markers, idx) -> list[tuple]:
    """Return [(page, y0, y1)] covering marker idx until the next marker."""
    cur = markers[idx]
    nxt = markers[idx + 1] if idx + 1 < len(markers) else None
    out, page, top = [], cur['page'], cur['y'] - 3
    last_page = nxt['page'] if nxt else doc.page_count - 1
    while page <= last_page:
        bottom = nxt['y'] - 3 if (nxt and page == nxt['page']) else FOOTER_Y
        if bottom - top > 6:
            out.append((page, top, bottom))
        page += 1
        top = TOP_Y
        if not nxt and page > cur['page'] + 1:
            break  # the final item never spans more than one extra page
    return out


def has_body(lines, y0, y1) -> bool:
    """True when the region holds real body text (indented paragraph / option lines), not just figure labels."""
    body = [ln for ln in lines if y0 <= (ln['y0'] + ln['y1']) / 2 <= y1 and ln['x0'] < 110 and len(ln['text']) >= 4]
    return len(body) >= 1


def content_box(lines, graphics, y0, y1):
    xs0, ys0, xs1, ys1 = [], [], [], []
    for ln in lines:
        cy = (ln['y0'] + ln['y1']) / 2
        if y0 <= cy <= y1:
            xs0.append(ln['x0']); ys0.append(ln['y0']); xs1.append(ln['x1']); ys1.append(ln['y1'])
    for g in graphics:
        cy = (g[1] + g[3]) / 2
        if y0 <= cy <= y1:
            xs0.append(g[0]); ys0.append(max(g[1], y0)); xs1.append(g[2]); ys1.append(min(g[3], y1))
    if not ys0:
        return None
    return (max(min(xs0) - 6, 20), max(min(ys0) - 6, y0), min(max(xs1) + 6, 580), min(max(ys1) + 6, y1 + 2))


def region_text(lines, y0, y1) -> str:
    picked = [ln for ln in lines if y0 <= (ln['y0'] + ln['y1']) / 2 <= y1]
    out, last_y = [], None
    for ln in picked:
        if last_y is not None and abs(ln['y0'] - last_y) < 3:
            out[-1] += ' ' + ln['text']
        else:
            out.append(ln['text'])
        last_y = ln['y0']
    return '\n'.join(out)


def render(doc, regions, cache, dest: Path, rel: str):
    crops = []
    for i, (pno, y0, y1) in enumerate(regions):
        lines, graphics = cache[pno]
        box = content_box(lines, graphics, y0, y1)
        if not box:
            continue
        clip = pymupdf.Rect(*box)
        pix = doc[pno].get_pixmap(matrix=pymupdf.Matrix(ZOOM, ZOOM), clip=clip, alpha=False)
        img = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
        name = f'{dest.stem}-{i + 1}.webp' if len(regions) > 1 else f'{dest.stem}.webp'
        path = dest.parent / name
        path.parent.mkdir(parents=True, exist_ok=True)
        img.save(path, 'WEBP', quality=72, method=4)
        crops.append({'src': f'{rel}/{name}', 'w': img.width, 'h': img.height, 'page': pno + 1})
    return crops


def split_options(text: str, letters_needed='ABCD'):
    hits = list(OPTION.finditer(text))
    letters = [h.group(1) for h in hits]
    k = len(letters_needed)
    # take the LAST option run so passage parentheses do not confuse the split
    for start in range(len(hits) - k, -1, -1):
        if letters[start:start + k] == list(letters_needed):
            run = hits[start:start + k]
            stem = text[:run[0].start()].strip()
            opts = {}
            for j, h in enumerate(run):
                end = run[j + 1].start() if j < k - 1 else len(text)
                opts[h.group(1)] = re.sub(r'\s+', ' ', text[h.end():end]).strip()
            return stem, opts
    return text.strip(), {}


def parse_answers(year: int) -> dict:
    """Return {subject: {number: letter}} from the official answer table PDF (all pages)."""
    doc = pymupdf.open(CAP / f'{year}-answers.pdf')
    names = {'國文': 'chinese', '閱讀': 'english', '英語': 'english', '聽力': 'listening',
             '數學': 'math', '社會': 'social', '自然': 'science'}
    out, cols = {}, None
    for page in doc:
        words = page.get_text('words')
        heads = {}
        for w in words:
            t = w[4]
            if t in ('國文', '數學', '社會', '自然', '閱讀', '聽力', '英語'):
                heads.setdefault(t, (w[0] + w[2]) / 2)
        if len(heads) >= 4:
            cols = sorted(((x, names[t]) for t, x in heads.items() if not (t == '英語' and '閱讀' in heads)),
                          key=lambda c: c[0])
        if not cols:
            continue
        rows = [(w, int(w[4])) for w in words if w[4].isdigit() and w[0] < cols[0][0] - 10 and 1 <= int(w[4]) <= 70]
        for _, name in cols:
            out.setdefault(name, {})
        for rw, num in rows:
            cy = (rw[1] + rw[3]) / 2
            for w in words:
                if re.fullmatch(r'[A-D]', w[4]) and abs((w[1] + w[3]) / 2 - cy) < 4:
                    cx = (w[0] + w[2]) / 2
                    name = min(cols, key=lambda c: abs(c[0] - cx))[1]
                    out[name][str(num)] = w[4]
    return out


STAT = re.compile(r'\n\s*([A-D])\s*\n((?:\s*-?\d?\.\d+\s*\n){3,5})')
_analysis_docs: dict = {}


def parse_analysis(path: Path, page_no: int):
    try:
        doc = _analysis_docs.get(path) or _analysis_docs.setdefault(path, pymupdf.open(path))
        text = doc[page_no - 1].get_text()
    except Exception:
        return None
    start = text.find('試題分析結果')
    if start < 0:
        return None
    m = STAT.search(text, start)
    if not m:
        return None
    nums = [float(x) for x in re.findall(r'-?\d?\.\d+', m.group(2))]
    bands = nums[2:]
    names = ['精熟', '基礎', '待加強'] if len(bands) == 3 else ['基礎', '待加強'] if len(bands) == 2 else []
    dist = {}
    tail = text[m.end():]
    for letter in 'ABCD':
        mm = re.search(rf'\n\s*{letter}\s*\n\s*(\d+)\s*\n\s*(\d+\.\d+)', tail)
        if mm:
            dist[letter] = float(mm.group(2))
    out = {'answer': m.group(1), 'passRate': nums[0], 'discrimination': nums[1],
           'passBySkill': dict(zip(names, bands)), 'optionPercent': dist}
    tm = re.search(r'錄音稿\s*(.*?)\s*\n\s*題目', text, re.S)
    if tm:
        out['transcript'] = re.sub(r'\s+', ' ', tm.group(1)).strip()
    om = re.search(r'評量目標：\s*(.+)', text)
    if om:
        out['objective'] = om.group(1).strip()
    return out


def extract_audio(year: int) -> dict:
    """Copy official per-question MP3 tracks (「NN 第K題.mp3」) out of the archived ZIP."""
    src = CAP / f'{year}-listening.zip'
    out = {}
    if not src.exists():
        return out
    dest = DIST / 'cap-audio' / str(year)
    dest.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(src) as z:
        for info in z.infolist():
            name = info.filename
            try:
                name = name.encode('cp437').decode('cp950')
            except (UnicodeEncodeError, UnicodeDecodeError):
                pass
            m = re.search(r'第\s*(\d{1,2})\s*題\.mp3$', name)
            if not m:
                continue
            n = int(m.group(1))
            target = dest / f'{n}.mp3'
            if not target.exists() or target.stat().st_size != info.file_size:
                target.write_bytes(z.read(info))
            out[n] = f'cap-audio/{year}/{n}.mp3'
    return out


def extract_paper(year, subject, counts, answers, report):
    pdf = CAP / f'{year}-{subject}.pdf'
    if not pdf.exists():
        report.append({'paper': f'{year}-{subject}', 'status': 'missing-pdf'})
        return [], []
    doc = pymupdf.open(pdf)
    cache = {p: (page_lines(doc[p]), page_graphics(doc[p])) for p in range(doc.page_count)}
    markers = find_markers(doc, counts)
    audio = extract_audio(year) if subject == 'listening' else {}
    questions, groups, open_group = [], [], None
    rel = f'cap-img/{year}'
    for i, mk in enumerate(markers):
        if mk['type'] == 'break':
            open_group = None
            continue
        regs = regions_for(doc, markers, i)
        regs = [r for k, r in enumerate(regs) if k == 0 or has_body(cache[r[0]][0], r[1], r[2])]
        text = '\n'.join(region_text(cache[p][0], a, b) for p, a, b in regs)
        if mk['type'] == 'group':
            gid = f'{year}-{subject}-g{mk["range"][0]}-{mk["range"][1]}'
            crops = render(doc, regs, cache, IMG / str(year) / gid, rel)
            groups.append({'id': gid, 'year': year, 'subject': subject, 'range': list(mk['range']),
                           'text': text, 'crops': crops})
            open_group = (gid, mk['range'])
            continue
        n, kind = mk['n'], mk['kind']
        qid = f'{year}-{subject}-{n}' if kind == 'choice' else f'{year}-{subject}-written-{n}'
        crops = render(doc, regs, cache, IMG / str(year) / qid, rel)
        letters = 'ABC' if subject == 'listening' else 'ABCD'
        stem, options = split_options(ANCHOR_PREFIX.sub('', text), letters) if kind == 'choice' else (text, {})
        gid = open_group[0] if (kind == 'choice' and open_group and open_group[1][0] <= n <= open_group[1][1]) else None
        meta = counts['meta'].get(qid, {})
        q = {'id': qid, 'year': year, 'subject': subject, 'number': n, 'kind': 'listening' if subject == 'listening' else kind,
             'page': regs[0][0] + 1 if regs else None, 'groupId': gid, 'stem': stem, 'options': options,
             'optionLetters': letters if kind == 'choice' else '',
             'crops': crops, 'answer': answers.get(subject, {}).get(str(n)) if kind == 'choice' else None,
             'officialObjective': meta.get('officialObjective', ''), 'officialCodes': meta.get('officialCodes', [])}
        if subject == 'listening':
            q['audio'] = audio.get(n)
        if meta.get('analysisPath') and meta.get('analysisPage'):
            q['analysis'] = parse_analysis(DIST / meta['analysisPath'], meta['analysisPage'])
            q['analysisRef'] = {'path': meta['analysisPath'], 'page': meta['analysisPage']}
        questions.append(q)
    got_c = sum(1 for q in questions if q['kind'] != 'written')
    got_w = sum(1 for q in questions if q['kind'] == 'written')
    report.append({'paper': f'{year}-{subject}', 'expectedChoice': counts['choice'], 'gotChoice': got_c,
                   'expectedWritten': counts['written'], 'gotWritten': got_w, 'groups': len(groups),
                   'missing': [n for n in range(1, counts['choice'] + 1)
                               if not any(q['number'] == n and q['kind'] != 'written' for q in questions)]})
    return questions, groups


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--years', default=','.join(map(str, YEARS)))
    ap.add_argument('--subjects', default=','.join(SUBJECTS))
    args = ap.parse_args()
    years = [int(y) for y in args.years.split(',')]
    subjects = args.subjects.split(',')
    sys.stdout.reconfigure(encoding='utf-8')
    exp = expected_counts()
    out_path = DIST / 'cap-bank.json'
    bank = json.loads(out_path.read_text('utf-8')) if out_path.exists() else {'questions': [], 'groups': []}
    keep = lambda r: not (r['year'] in years and r['subject'] in subjects)
    bank['questions'] = [q for q in bank['questions'] if keep(q)]
    bank['groups'] = [g for g in bank['groups'] if keep(g)]
    report = []
    for year in years:
        answers = parse_answers(year)
        for subject in subjects:
            counts = exp.get((year, subject))
            if not counts:
                continue
            qs, gs = extract_paper(year, subject, counts, answers, report)
            bank['questions'] += qs
            bank['groups'] += gs
    order = {s: i for i, s in enumerate(SUBJECTS)}
    bank['questions'].sort(key=lambda q: (q['year'], order[q['subject']], q['kind'] == 'written', q['number']))
    bank['groups'].sort(key=lambda g: (g['year'], order[g['subject']], g['range'][0]))
    bank['generatedBy'] = 'scripts/extract_cap.py'
    out_path.write_text(json.dumps(bank, ensure_ascii=False, separators=(',', ':')), 'utf-8')
    for r in report:
        flag = 'OK ' if r.get('gotChoice') == r.get('expectedChoice') and r.get('gotWritten') == r.get('expectedWritten') else '!! '
        print(flag, json.dumps(r, ensure_ascii=False))


if __name__ == '__main__':
    main()
