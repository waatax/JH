import concurrent.futures
import hashlib
import json
import os
import pathlib
import ssl
import time
import urllib.request
from urllib.parse import urljoin

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / 'dist' / 'downloads' / 'gsat'
OUT_DIR.mkdir(parents=True, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

with open(ROOT / 'tmp' / 'gsat_all_collected.json', encoding='utf-8') as f:
    raw_items = json.load(f)

# Filter years 108 to 115 (8 academic years, covering past 7 years whether 109-115 or 108-114)
target_items = [it for it in raw_items if 108 <= it['year'] <= 115]

# Prepare download jobs
jobs = []
seen_files = set()

for it in target_items:
    year = it['year']
    subj_code = it['subject_code']
    subj_name = it['subject_name']
    
    # We focus on PDFs for exam, answers, rubric, and sheet
    for link in it['links']:
        cat = link['category']
        ext = link['extension']
        if ext != 'pdf':
            continue
        if cat not in ['exam', 'answers', 'rubric', 'sheet']:
            continue
            
        filename = f"{year}-{subj_code}-{cat}.pdf"
        # In case there are duplicates (e.g. 2 rubric files), deduplicate:
        if filename in seen_files:
            idx = 2
            while f"{year}-{subj_code}-{cat}_{idx}.pdf" in seen_files:
                idx += 1
            filename = f"{year}-{subj_code}-{cat}_{idx}.pdf"
        seen_files.add(filename)
        
        jobs.append({
            'year': year,
            'year_ad': it['year_ad'],
            'subject_code': subj_code,
            'subject_name': subj_name,
            'category': cat,
            'category_name': {
                'exam': '試題內容',
                'answers': '選擇題答案',
                'rubric': '非選擇題評分原則',
                'sheet': '答題卷'
            }.get(cat, cat),
            'filename': filename,
            'source_title': it['title'],
            'link_name': link['name'],
            'source_url': link['url']
        })

print(f"Total PDF download jobs prepared: {len(jobs)}")

def download_file(job):
    out_path = OUT_DIR / job['filename']
    status = 'skipped'
    try:
        if out_path.exists() and out_path.stat().st_size > 500:
            data = out_path.read_bytes()
            if data.startswith(b'%PDF'):
                job['status'] = 'exists'
                job['bytes'] = len(data)
                job['sha256'] = hashlib.sha256(data).hexdigest()
                job['local_path'] = f"dist/downloads/gsat/{job['filename']}"
                return job
                
        # Download
        req = urllib.request.Request(job['source_url'], headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            data = resp.read()
            
        if not data.startswith(b'%PDF'):
            # Some servers return html redirect or error
            raise ValueError(f"Content does not start with %PDF (header: {data[:20]})")
            
        out_path.write_bytes(data)
        job['status'] = 'downloaded'
        job['bytes'] = len(data)
        job['sha256'] = hashlib.sha256(data).hexdigest()
        job['local_path'] = f"dist/downloads/gsat/{job['filename']}"
    except Exception as e:
        job['status'] = 'failed'
        job['error'] = str(e)
        
    return job

print("Starting concurrent download with 8 threads...")
start_time = time.time()
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(download_file, jobs))

elapsed = time.time() - start_time
success_count = sum(1 for r in results if r['status'] in ('downloaded', 'exists'))
failed_count = sum(1 for r in results if r['status'] == 'failed')
print(f"Finished in {elapsed:.2f}s. Success: {success_count}, Failed: {failed_count}")

# Save manifest
manifest = {
    'title': '大學學科能力測驗 (GSAT) 歷屆試題與解答檔案目錄',
    'source': '大學入學考試中心 (CEEC)',
    'years_covered': sorted(list(set(r['year'] for r in results))),
    'scope': '108學年度至115學年度（含過去七年109~115及108完整試題、答案、評分原則、答題卷）',
    'generated_at': time.strftime('%Y-%m-%d %H:%M:%S'),
    'total_files': len(results),
    'successful_files': success_count,
    'failed_files': failed_count,
    'files': results
}

manifest_path = ROOT / 'dist' / 'gsat-manifest.json'
with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"Manifest saved to {manifest_path}")

# Print summary table by year
by_year = {}
for r in results:
    by_year.setdefault(r['year'], []).append(r)

for yr in sorted(by_year.keys(), reverse=True):
    yr_jobs = by_year[yr]
    ok = sum(1 for j in yr_jobs if j['status'] in ('downloaded', 'exists'))
    print(f"Year {yr}: {ok}/{len(yr_jobs)} files ready")
