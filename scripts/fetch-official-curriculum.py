"""Cache and extract the reviewed official outlines listed in the source manifest."""
import hashlib
import json
from pathlib import Path
from urllib.request import urlopen

from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / "docs/official-curriculum-sources.json").read_text(encoding="utf-8"))
cache = root / "tmp/official-curriculum"
cache.mkdir(parents=True, exist_ok=True)


def matches(data, source):
    return hashlib.sha256(data).hexdigest() == source["sha256"]


for source in manifest:
    key = source["id"]
    stem = "math-outline" if key == "math" else key
    pdf = cache / f"{stem}.pdf"
    if not pdf.exists() or not matches(pdf.read_bytes(), source):
        with urlopen(source["url"], timeout=90) as response:
            content = response.read()
        if not matches(content, source):
            raise ValueError(f"{key}: source changed; review the document before updating its hash")
        pending = pdf.with_suffix(".pdf.part")
        pending.write_bytes(content)
        pending.replace(pdf)

    reader = PdfReader(pdf)
    if len(reader.pages) != source["pages"]:
        raise ValueError(f"{key}: unexpected page count")
    options = {} if key == "math" else {"extraction_mode": "layout"}
    pages = [page.extract_text(**options) or "" for page in reader.pages]
    (cache / f"{stem}.json").write_text(json.dumps(pages, ensure_ascii=False), encoding="utf-8")
    (cache / f"{stem}.txt").write_text(
        "\n".join(f"\n[PDF PAGE {number}]\n{text}" for number, text in enumerate(pages, 1)),
        encoding="utf-8",
    )
    print(key, len(pages), source["sha256"])
