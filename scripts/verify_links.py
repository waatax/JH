import json

with open('tmp/gsat_all_collected.json', encoding='utf-8') as f:
    items = json.load(f)

# Filter for years 108 to 115
target_items = [it for it in items if 108 <= it['year'] <= 115]

print(f"Total target subject entries: {len(target_items)}")
for it in target_items:
    cats = {}
    for l in it['links']:
        if l['extension'] == 'pdf':
            cats[l['category']] = l['name']
    print(f"Year {it['year']} {it['subject_code']} ({it['title']}): {cats}")
