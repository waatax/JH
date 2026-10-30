import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { units } from '../dist/curriculum.js';
import { teachingTables } from '../dist/teaching.js';
import { answerText, questionText, repairSteps } from '../dist/quest/coach.mjs';
import { speak, stopSpeaking, speechChunks } from '../dist/quest/sound.mjs';

const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const items = read('dist/quest/course/items.json').items;
test('Every core unit gains at least 10% distinct activities, reachable in reasoning and boss pools', () => {
  const report = read('docs/quest-redesign/ENRICHMENT-REPORT.json');
  assert.equal(report.units.length, units.length);
  for (const unit of units) {
    const entry = report.units.find(r => r.unitId === unit.id);
    const extra = Object.values(items).filter(it => it.unitId === unit.id && it.enrichment);
    assert.equal(extra.length, entry.addedActivities);
    assert.ok(extra.length >= entry.baselineActivities * .1, unit.id);
    const section = read(`dist/quest/course/s${(unit.grade - 7) * 2 + unit.term}.json`);
    for (const it of extra) {
      assert.ok(section.units[unit.id].nodes[`${unit.id}:reasoning`].includes(it.id));
      assert.ok(section.units[unit.id].nodes[`${unit.id}:boss`].includes(it.id));
      assert.equal(new Set(it.options).size, it.options.length);
      assert.ok(it.options.includes(it.answer));
      assert.ok(teachingTables[unit.id].rows.some(r => r[0] === it.answer && it.prompt.includes(r[1])));
      for (const option of it.options) assert.ok(it.optionExplanations[option]);
    }
  }
});
test('Speech retains all text beyond 300 characters, and handles punctuation', () => {
  const text = '第一句。' + '很長的學習內容'.repeat(100) + '！\nThe end.';
  assert.equal(speechChunks(text).join(''), text);
  assert.ok(speechChunks(text).every(s => s.length <= 180));
});
test('Question speech never reveals answer; match answer reads actual pairs', () => {
  const it = {prompt:'選出正確答案', options:['甲','乙'], answer:'秘密答案', why:'秘密解析'};
  assert.ok(!questionText(it).includes('秘密'));
  assert.match(questionText(it), /選項 2：乙/);
  assert.equal(answerText({type:'match',pairs:[['外心','中垂線交點']]}), '外心：中垂線交點');
  assert.equal(answerText({answer:0}), '0');
  assert.equal(repairSteps({optionExplanations:{甲:'比較具體判準'}},'甲')[0], '比較具體判準');
});
test('Speech queue completes long content, cancellation blocks stale continuation, unsupported browsers give feedback', () => {
  const spoken = [];
  globalThis.window = {speechSynthesis:{cancel(){},getVoices(){return [];},speak(u){spoken.push(u);}}};
  globalThis.SpeechSynthesisUtterance = class { constructor(text){this.text=text;} };
  try {
    const text = '中文。' + 'English sentence. '.repeat(40);
    assert.equal(speak(text), true);
    for (let i = 0; i < spoken.length; i++) spoken[i].onend();
    assert.equal(spoken.map(u => u.text).join(''), text);
    assert.equal(spoken[0].lang, 'zh-TW');
    assert.equal(spoken[1].lang, 'en-US');
    speak('第一段。第二段。');
    const last = spoken.at(-1), count = spoken.length;
    stopSpeaking(); last.onend();
    assert.equal(spoken.length, count);
    delete globalThis.window;
    let error = '';
    assert.equal(speak('test', {onError:m=>error=m}), false);
    assert.ok(error);
  } finally { delete globalThis.window; delete globalThis.SpeechSynthesisUtterance; }
});
