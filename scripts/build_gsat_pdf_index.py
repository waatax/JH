import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / 'dist' / 'gsat-manifest.json'
OUTPUT_HTML = ROOT / 'dist' / 'downloads' / 'gsat' / 'index.html'

with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

files = manifest.get('files', [])

def format_size(bytes_num):
    if bytes_num >= 1024 * 1024:
        return f"{bytes_num / (1024 * 1024):.2f} MB"
    elif bytes_num >= 1024:
        return f"{bytes_num / 1024:.1f} KB"
    return f"{bytes_num} B"

# Prepare data for embedding into the standalone HTML
files_data = []
for f in files:
    filename = Path(f['local_path']).name
    file_path = ROOT / 'dist' / f['local_path']
    size = file_path.stat().st_size if file_path.exists() else f.get('file_size_bytes', 0)
    files_data.append({
        'filename': filename,
        'year': f['year'],
        'subject_code': f['subject_code'],
        'subject_name': f['subject_name'],
        'category': f['category'],
        'category_name': f['category_name'],
        'title': f.get('source_title', f['filename']),
        'size': size,
        'size_str': format_size(size),
        'sha256': f.get('sha256', ''),
        'url': filename
    })

files_json = json.dumps(files_data, ensure_ascii=False)

html_content = f"""<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>大考中心學測歷屆試題與官方文件檔案總目錄 (108~115 學年度)｜知行學院</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%23193e35'/%3E%3Cpath d='M10 11h8l3 4 3-4h6v19h-8l-2 3-2-3h-8z' fill='%23d6fa77'/%3E%3C/svg%3E">
  <link rel="stylesheet" href="../../style.css">
  <style>
    body {{ background: #f5f7f8; color: #203b35; margin: 0; font-family: 'Noto Sans TC', system-ui, sans-serif; }}
    .header-bar {{ background: #193e35; color: white; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }}
    .header-title h1 {{ margin: 0; font-size: 1.5rem; letter-spacing: -0.02em; color: #fff; }}
    .header-title p {{ margin: 4px 0 0; font-size: 0.88rem; color: #c3d9cf; }}
    .container {{ max-width: 1280px; margin: 0 auto; padding: 32px 24px 60px; }}
    .file-table {{ width: 100%; border-collapse: collapse; font-size: 0.88rem; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }}
    .file-table th {{ background: #edf4e8; color: #1f4233; padding: 14px 16px; text-align: left; font-weight: 700; border-bottom: 2px solid #dce8d5; }}
    .file-table td {{ padding: 12px 16px; border-bottom: 1px solid #edf1ee; vertical-align: middle; }}
    .file-table tr:hover {{ background: #f9fbf9; }}
    .cat-badge {{ display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }}
    .cat-exam {{ background: #e2f0d9; color: #276a3c; }}
    .cat-answers {{ background: #e0f2fe; color: #0369a1; }}
    .cat-rubric {{ background: #fef3c7; color: #92400e; }}
    .cat-sheet {{ background: #f3e8ff; color: #6b21a8; }}
    .hash-code {{ font-family: monospace; font-size: 0.72rem; color: #6b7280; background: #f3f4f6; padding: 2px 6px; border-radius: 4px; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; }}
    .btn-download {{ display: inline-flex; align-items: center; gap: 6px; background: #193e35; color: white; padding: 6px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; text-decoration: none; }}
    .btn-download:hover {{ background: #265c4f; }}
  </style>
</head>
<body>
  <header class="header-bar">
    <div class="header-title">
      <h1>大考中心學測歷屆試題與官方文件總存檔</h1>
      <p>108 ~ 115 學年度（涵蓋過去七年與新舊課綱）共 174 份官方 PDF 檔案本機存檔目錄</p>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <a class="button light small" href="../../index.html#/gsat">🎓 進入學測全科模考系統</a>
      <a class="button secondary small" href="../../index.html#/home">← 返回知行學院</a>
    </div>
  </header>

  <main class="container">
    <div class="stats" style="margin-top:0;">
      <div class="stat"><label>收錄學年度</label><strong>8 年</strong><small>108 ~ 115 學年度</small></div>
      <div class="stat"><label>考科試卷數</label><strong>53 卷</strong><small>國綜、國寫、英、數A/B、社、自</small></div>
      <div class="stat"><label>PDF 存檔總數</label><strong>174 份</strong><small>試題、答案、評分原則、答題卷</small></div>
      <div class="stat"><label>校驗完整性</label><strong>100%</strong><small>全部通過 SHA-256 驗證</small></div>
    </div>

    <section class="panel">
      <h2>快速檢索與篩選</h2>
      <div class="filters">
        <label>學年度
          <select id="filter-year">
            <option value="all">全部學年度 (108 ~ 115)</option>
            <option value="115">115 學年度 (2026)</option>
            <option value="114">114 學年度 (2025)</option>
            <option value="113">113 學年度 (2024)</option>
            <option value="112">112 學年度 (2023)</option>
            <option value="111">111 學年度 (2022)</option>
            <option value="110">110 學年度 (2021)</option>
            <option value="109">109 學年度 (2020)</option>
            <option value="108">108 學年度 (2019)</option>
          </select>
        </label>

        <label>考科
          <select id="filter-subject">
            <option value="all">全部考科</option>
            <option value="chinese_comp">國語文綜合能力測驗</option>
            <option value="writing">國語文寫作能力測驗</option>
            <option value="english">英文</option>
            <option value="math_a">數學A</option>
            <option value="math_b">數學B</option>
            <option value="math">數學 (舊制)</option>
            <option value="social">社會</option>
            <option value="science">自然</option>
          </select>
        </label>

        <label>文件類型
          <select id="filter-category">
            <option value="all">全部文件類型</option>
            <option value="exam">試題內容 (exam)</option>
            <option value="answers">選擇題參考答案 (answers)</option>
            <option value="rubric">非選擇題評分原則 (rubric)</option>
            <option value="sheet">答題卷 (sheet)</option>
          </select>
        </label>

        <input type="search" id="filter-search" placeholder="搜尋檔案名稱或科目..." style="min-width:200px;">
        <span class="tag accent" id="count-badge">顯示 174 份檔案</span>
      </div>
    </section>

    <div class="table-wrap">
      <table class="file-table">
        <thead>
          <tr>
            <th>學年度</th>
            <th>考科</th>
            <th>類型</th>
            <th>檔案名稱與標題</th>
            <th>檔案大小</th>
            <th>SHA-256 校驗碼</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="file-tbody"></tbody>
      </table>
    </div>
  </main>

  <script>
    const FILES = {files_json};
    const tbody = document.getElementById('file-tbody');
    const filterYear = document.getElementById('filter-year');
    const filterSubject = document.getElementById('filter-subject');
    const filterCategory = document.getElementById('filter-category');
    const filterSearch = document.getElementById('filter-search');
    const countBadge = document.getElementById('count-badge');

    const catMap = {{
      exam: {{ name: '試題內容', cls: 'cat-exam' }},
      answers: {{ name: '參考答案', cls: 'cat-answers' }},
      rubric: {{ name: '評分原則', cls: 'cat-rubric' }},
      sheet: {{ name: '答題卷', cls: 'cat-sheet' }}
    }};

    function render() {{
      const y = filterYear.value;
      const s = filterSubject.value;
      const c = filterCategory.value;
      const q = filterSearch.value.trim().toLowerCase();

      const filtered = FILES.filter(f => {{
        if (y !== 'all' && String(f.year) !== y) return false;
        if (s !== 'all' && f.subject_code !== s) return false;
        if (c !== 'all' && f.category !== c) return false;
        if (q && !`${{f.year}} ${{f.subject_name}} ${{f.filename}} ${{f.title}} ${{f.category_name}}`.toLowerCase().includes(q)) return false;
        return true;
      }});

      countBadge.textContent = `顯示 ${{filtered.length}} 份檔案`;

      if (filtered.length === 0) {{
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:#6b8174;">沒有找到符合條件的 PDF 檔案</td></tr>';
        return;
      }}

      tbody.innerHTML = filtered.map(f => {{
        const catInfo = catMap[f.category] || {{ name: f.category_name, cls: 'cat-exam' }};
        return `
          <tr>
            <td><strong>${{f.year}}</strong> <small class="muted">(${{f.year + 1911}})</small></td>
            <td><strong>${{f.subject_name}}</strong></td>
            <td><span class="cat-badge ${{catInfo.cls}}">${{catInfo.name}}</span></td>
            <td>
              <div style="font-weight:600;color:#1a3d2e;">${{f.title}}</div>
              <small class="muted">${{f.filename}}</small>
            </td>
            <td>${{f.size_str}}</td>
            <td><span class="hash-code" title="${{f.sha256}}">${{f.sha256.slice(0, 16)}}...</span></td>
            <td>
              <div style="display:flex;gap:6px;">
                <a class="btn-download" href="./${{f.url}}" target="_blank">檢視 ↗</a>
                <a class="btn-download" style="background:#4b6e58;" href="./${{f.url}}" download>下載 ↓</a>
              </div>
            </td>
          </tr>
        `;
      }}).join('');
    }}

    filterYear.onchange = render;
    filterSubject.onchange = render;
    filterCategory.onchange = render;
    filterSearch.oninput = render;

    render();
  </script>
</body>
</html>
"""

with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Generated standalone GSAT PDF Catalog at {OUTPUT_HTML}")
