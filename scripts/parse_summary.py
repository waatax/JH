import json

with open('tmp/gsat_years_summary.json', encoding='utf-8') as f:
    d = json.load(f)

with open('tmp/parsed_summary_utf8.txt', 'w', encoding='utf-8') as out:
    for yr in sorted(d.keys(), key=int, reverse=True):
        items = d[yr]['items']
        out.write(f"=== Year {yr} (items: {len(items)}) ===\n")
        for it in items:
            link_str = ", ".join([f"[{l['name']}]({l['href']})" for l in it['links']])
            out.write(f"  * {it['title']} ({it['date']}) -> {link_str}\n")

print("Done writing parsed_summary_utf8.txt")
