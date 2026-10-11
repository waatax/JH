"""Refresh answers + official analysis stats in dist/cap-bank.json without re-rendering images."""
import json, sys
sys.path.insert(0, 'scripts')
import extract_cap as X

sys.stdout.reconfigure(encoding='utf-8')
bank = json.loads((X.DIST / 'cap-bank.json').read_text('utf-8'))
meta = {}
for (y, s), c in X.expected_counts().items():
    meta.update(c['meta'])
answers = {y: X.parse_answers(y) for y in X.YEARS}
for q in bank['questions']:
    if q['kind'] != 'written':
        q['answer'] = answers[q['year']].get(q['subject'], {}).get(str(q['number']))
    m = meta.get(q['id'], {})
    if m.get('analysisPath') and m.get('analysisPage'):
        q['analysis'] = X.parse_analysis(X.DIST / m['analysisPath'], m['analysisPage'])
        q['analysisRef'] = {'path': m['analysisPath'], 'page': m['analysisPage']}
(X.DIST / 'cap-bank.json').write_text(json.dumps(bank, ensure_ascii=False, separators=(',', ':')), 'utf-8')
print('refreshed', len(bank['questions']))
