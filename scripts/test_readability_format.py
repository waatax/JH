import re

# Complete 50 PUA glyphs mapping
PUA_MAP = {
    '\uf0e0': '→',
    '\uf047': 'Γ',
    '\uf067': 'γ',
    '\uf0d0': '∠',
    '\uf0d7': '·',
    '\uf0e6': '(',
    '\uf0e7': '(',
    '\uf0e8': '(',
    '\uf0f6': ')',
    '\uf0f7': ')',
    '\uf0f8': ')',
    '\uf8eb': '(',
    '\uf8ec': '(',
    '\uf8ed': '(',
    '\uf8f6': ')',
    '\uf8f7': ')',
    '\uf8f8': ')',
    '\uf0e9': '[',
    '\uf0ea': '[',
    '\uf0eb': '[',
    '\uf0f9': ']',
    '\uf0fa': ']',
    '\uf0fb': ']',
    '\uf8ee': '[',
    '\uf8ef': '[',
    '\uf8f0': '[',
    '\uf8f9': ']',
    '\uf8fa': ']',
    '\uf8fb': ']',
    '\uf0ec': '{',
    '\uf0ed': '{',
    '\uf0ee': '{',
    '\uf0ef': '{',
    '\uf086': '□',
    '\uf0b9': '≠',
    '\uf06d': 'μ',
    '\uf0e5': 'Σ',
    '\uf0bb': '≈',
    '\uf0ae': '→',
    '\uf072': '△',
    '\uf0b3': '≥',
    '\uf076': ' ',
    '\uf0a2': '′',
    '\uf04c': '…',
    '\uf04b': '…',
    '\uf0ad': '↑',
    '\uf0af': '↓',
    '\uf06c': 'λ',
    '\uf065': 'ε',
    '\uf0bc': '…',
    '\uf0a3': '≤',
    '\uf0be': '≥',
    '\uf0b1': '±',
    '\uf0b4': '×',
    '\uf0b8': '÷',
    '\uf0b0': '°',
    '\uf0ce': '∈',
    '\uf0cf': '∉',
    '\uf0cc': '⊂',
    '\uf0cd': '⊆',
    '\uf0c8': '∩',
    '\uf0c9': '∪',
    '\uf0d8': '→',
    '\uf0db': '⇔',
    '\uf0de': '⇒',
    '\uf0ac': '¬',
    '\uf0bd': '⊥',
    '\uf0b7': '·',
    '\uf0b5': 'μ',
    '\uf061': 'α',
    '\uf062': 'β',
    '\uf071': 'θ',
    '\uf070': 'π',
    '\uf073': 'σ',
    '\uf077': 'ω',
    '\uf044': 'Δ',
    '\uf053': 'Σ',
    '\uf057': 'Ω',
    '\uf03d': '=',
    '\uf03c': '<',
    '\uf03e': '>',
    '\uf02b': '+',
    '\uf02d': '-',
    '\uf028': '(',
    '\uf029': ')',
    '\uf05b': '[',
    '\uf05d': ']',
    '\uf07b': '{',
    '\uf07d': '}',
    '\uf088': '▲',
    '\uf07e': '~',
}

def clean_pua(text):
    if not text:
        return ""
    for k, v in PUA_MAP.items():
        text = text.replace(k, v)
    text = text.replace('\xa0', ' ')
    # Eliminate any leftover PUA characters (0xE000-0xF8FF) with space or appropriate fallback
    text = re.sub(r'[\ue000-\uf8ff]', ' ', text)
    return text

def format_readability(text):
    if not text:
        return ""
    text = clean_pua(text)
    # Split paragraphs by 2 or more newlines
    paras = text.split('\n\n')
    cleaned_paras = []
    for p in paras:
        lines = [l.strip() for l in p.split('\n') if l.strip()]
        if not lines:
            continue
        # Join lines: if line ends with Chinese character and next line starts with Chinese, join without space
        # If line ends with English / number and next starts with English, join with space
        buf = [lines[0]]
        for nxt in lines[1:]:
            prev = buf[-1]
            if not prev:
                buf.append(nxt)
                continue
            # If line starts with a list item (e.g. (A), 甲、, ①, 1.), keep on new line
            if re.match(r'^(?:\([A-Za-z0-9]\)|[甲乙丙丁戊己庚辛]、|[①②③④⑤⑥]|\d+\.)', nxt):
                buf.append('\n' + nxt)
            elif re.search(r'[\u4e00-\u9fff\uff01-\uffee]$', prev) and re.match(r'[\u4e00-\u9fff\uff01-\uffee]', nxt):
                # Chinese to Chinese: join directly without space
                buf[-1] = prev + nxt
            else:
                buf[-1] = prev + ' ' + nxt
        cleaned_paras.append(''.join(buf))
    return '\n\n'.join(cleaned_paras).strip()

sample = """小文發現讀國小的妹妹會講幾句越南文，有點羨慕，詢問後得知學校新開設東南亞移民
母語課。小文跟公民老師討論此項義務教育課程改變的用意，若老師欲以目標相近的
政策解說，下列何者最適當？
(A)公家機關與道路應設雙語標示以建置國際友善環境
(B)法院為語言不通的外籍刑事被告提供司法通譯協助"""

print("Before:\n", sample)
print("\nAfter:\n", format_readability(sample))
