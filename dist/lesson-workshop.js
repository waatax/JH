import { mathCases } from './workshop-math.js';
import { languageCases } from './workshop-language.js';
import { scienceCases } from './workshop-science.js';
import { socialCases } from './workshop-social.js';
import { lifeCases } from './workshop-life.js';
import { checks } from './workshop-checks.js';
import { socialLifeChecks } from './workshop-checks-social-life.js';
import { workshopSources } from './workshop-sources.js';
import { repairs } from './workshop-repairs.js';
import { scienceRepairs } from './workshop-repairs-science.js';
import { socialLifeRepairs } from './workshop-repairs-social-life.js';
import { officialAlignment } from './official-alignment-data.js';

const rows = (...sets) => sets.map(s => s.trim()).join('\n').split('\n').map(line => line.split('｜'));
const steps = text => text.split('；').map(s => s.trim()).filter(Boolean);
export const workshops = Object.create(null);
for (const [id, type, teaching, first, solution, second, transfer] of rows(mathCases, languageCases, scienceCases, socialCases, lifeCases)) {
  if (workshops[id]) throw Error('Duplicate workshop: ' + id);
  workshops[id] = {type, teaching, tasks:[
    {prompt:first, steps:steps(solution)}, {prompt:second, steps:steps(transfer)}
  ]};
}
for (const [id, prompt, answer, explanation] of rows(checks, socialLifeChecks)) {
  if (workshops[id].check || !['對','錯'].includes(answer)) throw Error('Invalid check: ' + id);
  workshops[id].check = {prompt, answer, steps:steps(explanation)};
}
for (const [id, prompt, solution] of rows(repairs, scienceRepairs, socialLifeRepairs)) {
  if (workshops[id].tasks.length !== 2) throw Error('Duplicate independent problem: ' + id);
  workshops[id].tasks.push({prompt, steps:steps(solution)});
}

const schoolPapers = {
  yichangBio: ['宜昌國中 111 學年七上第一次段考・翰林自然','https://www.ycjh.hlc.edu.tw/modules/tad_uploader/index.php?cat_sn=383&cfsn=2327&op=dlfile&name=111-1-%E7%AC%AC1%E6%AC%A1%E6%AE%B5%E8%80%837%E5%B9%B4%E7%B4%9A%E8%87%AA%E7%84%B6%E7%A7%91%E9%A1%8C%E7%9B%AE-%E9%BB%83%E7%91%9E%E7%91%9B.pdf'],
  yichangPhys: ['宜昌國中 112 學年八上第二次定期評量・自然','https://www.ycjh.hlc.edu.tw/modules/tad_uploader/index.php?cat_sn=419&cfsn=2677&op=dlfile&name=112-1-%E7%AC%AC2%E6%AC%A1%E6%AE%B5%E8%80%838%E5%B9%B4%E7%B4%9A%E8%87%AA%E7%84%B6%E7%A7%91%E9%A1%8C%E7%9B%AE%E8%88%87%E7%AD%94%E6%A1%88-%E6%9E%97%E9%9D%9C%E5%AB%BB.pdf'],
  hongdao: ['弘道國中 111 學年八上第二次定期評量・理化','https://www.htjh.tp.edu.tw/wp-content/uploads/doc/t210/111-1%20%E7%AC%AC%E4%BA%8C%E6%AE%B5%E8%80%83%E5%85%AB%E5%B9%B4%E7%B4%9A%E7%90%86%E5%8C%96.pdf'],
  zhishanMath: ['至善國中 112 學年七上第一次定期評量・數學','https://school.tc.edu.tw/open-message/193521/get-file/65c1181f5f136072a50d60af'],
  zhishanEnglish: ['至善國中 112 學年七上第三次定期評量・英語','https://school.tc.edu.tw/open-message/193521/get-file/65c118089ec59345351ccec9'],
  caota: ['草漯國中 114 學年七上第三次定期考查・國文','https://www.ttjh.tyc.edu.tw/modules/tad_uploader/index.php?cat_sn=99&cfsn=714&name=7-3-%E5%9C%8B%E6%96%87.pdf&op=dlfile'],
  zhongzheng: ['高雄中正高中國中部 113 學年七下第三次月考・社會','https://www.cchs.kh.edu.tw/ischool/wr/file/1/3392/59e256572b56402608d29a1929f39fc0.pdf']
};
export const schoolExamples = {
  'biology-1':['yichangBio','2、3、18','先按標本厚薄與要看的細節選擇顯微鏡，再區分倍率、亮度和焦距的調節。'],
  'biology-7':['yichangBio','41、非選擇題一','比對其他條件相同的兩組。數據只能指出受測條件中哪一組反應較快。'],
  'biology-14':['yichangBio','17','由唾液能加速澱粉分解、對另一種多醣卻無同樣作用，辨認酵素的專一性。'],
  'biology-2':['yichangPhys','32','從光的顏色連結葉片吸收與澱粉產量。比較實驗須維持光強度與照射時間等其他條件。'],
  'physics-2':['yichangPhys','20、21、25','弦的振動頻率、聲音的響度與聲速各有不同判準。計時員較晚聽見起跑訊號，還須補回聲音傳播的時間。'],
  'physics-3':['yichangPhys','27、28','先畫界面法線以比較入射角和反射角，再利用平面鏡的物像對稱關係定位。'],
  'physics-14':['hongdao','34、35','物距改變會改變像的位置與大小。遮住部分透鏡則仍可見完整的像，但亮度降低。'],
  'math-1': ['zhishanMath','選擇 2、5、12','同一張卷同時考絕對值、數線中點與距離。第 2 題需要再利用非負量之和為零的條件，列在本課延伸題。'],
  'math-3': ['zhishanMath','選擇 1、3，填充 3','先確認係數是否在 1 與 10 之間（可等於 1），再將兩個數換為相同表示法比較。'],
  'english-8':['zhishanEnglish','單題 12','先用存在句引進複數事物，再用代名詞指回這些事物。兩個空格的功能不同。'],
  'english-9':['zhishanEnglish','單題 13','選數量詞時要合看名詞可數性及後句提供的數量，只有否定句式還不足以作答。'],
  'english-13':['zhishanEnglish','單題 14','指定日期的早晨需要掌握時間介系詞，再確認表達日期的片語。'],
  'chinese-1':['caota','綜合測驗 3','辨譬喻要看兩個事物是否有可說明的相似點。只圈「像」字會漏掉省略喻詞的句子。'],
  'geography-3':['zhongzheng','1','比較三類產業的就業比例，把第三級產業比重當作判讀城市特徵的一項線索。'],
  'geography-11':['zhongzheng','2、16','先比較旅時的變化，再判斷哪些措施能改善不同區域的可及性。'],
  'geography-8':['zhongzheng','7','河運條件除了流速，還受季節性流量變化影響。須連結地形、水文與交通。'],
  'history-4':['zhongzheng','18','先從資料找出土地所有權的變化，再連結戰後土地改革。'],
  'chinese-15':['zhongzheng','20','跨科閱讀可從作品關注的人物和生活處境，連結臺灣鄉土文學的時代背景。']
};
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lists = items => '<ol>'+items.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>';
const paperLabels = {math:'數學',social:'社會',science:'自然',chinese:'國文',english:'英語'};
function sources(id, base) {
  const {exams, plans} = workshopSources[id];
  const example = schoolExamples[id];
  let school = '';
  if (example) {
    const [key,number,note] = example;
    const [label,url] = schoolPapers[key];
    school = `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}・${esc(number)}</a><p>${esc(note)}</p></li>`;
  }
  const examList = exams.map(q => `<li><a href="${base}#/cap-exam/${q.year}-${q.subject}?mode=practice&amp;q=${q.number}">${q.year} 年會考${paperLabels[q.subject]}第 ${q.number} 題</a>　${esc(q.objective)} <a href="${base}downloads/cap/${q.year}-${q.subject}.pdf#page=${q.page}" target="_blank" rel="noopener">對照題本</a></li>`).join('');
  const chapters = plans.map(p => `<li><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.publisher)}・${p.year} 學年 ${p.grade} 年級${p.term===1?'上':'下'}・${esc(p.title)}</a>　${p.school?esc(p.school)+'課程計畫列此關鍵詞，PDF 第 '+p.page+' 頁':p.direct?'既有章節對照':'課程計畫共用指標 '+esc(p.codes.join('、'))}</li>`).join('');
  return `<details><summary>題型依據與教材查找</summary>
    ${school || examList ? '<ul>'+school+examList+'</ul>' : '<p>本題組依本課學習任務編寫。尚無逐題核對的校卷或會考題號。</p>'}
    ${chapters ? '<h4>版本課程計畫</h4><ul>'+chapters+'</ul><small>共用指標可用來查找教材，實際範圍請核對該學年章節。</small>' : '<p>本課使用跨版本原創例題，個別版本章次待核對。</p>'}
  </details>`;
}

export function renderWorkshop(id, base='./') {
  const w = workshops[id];
  if (!w) return '';
  const openTasks = w.tasks.map((t,i) => `<form data-workshop-task="${i}">
    <label><strong>${['例題演算與推論','換個條件再試','獨立應用'][i]}　</strong>${esc(t.prompt)}
      <textarea name="attempt" required rows="2" aria-label="第 ${i+1} 題的答案與理由" placeholder="寫下答案與理由"></textarea>
    </label><button class="button small secondary" type="submit">核對解題步驟</button>
    <div class="workshop-feedback" hidden><strong>參考解法</strong>${lists(t.steps)}<small>對照自己的理由，找出第一個不同的步驟。開放作答採自行核對。</small></div>
  </form>`).join('');
  return `<section class="lesson-step chapter-workshop" data-workshop="${esc(id)}">
    <h2>章末練習・${esc(w.type)}</h2><h3>先學會這一步</h3><p>${esc(w.teaching)}</p>
    ${officialAlignment[id]?.scope ? '<p><strong>課綱範圍　</strong>'+esc(officialAlignment[id].scope)+'</p>' : ''}
    ${sources(id,base)}${openTasks}
    <form data-workshop-task="check"><fieldset><legend><strong>觀念辨正　</strong>${esc(w.check.prompt)}</legend>
    ${['對','錯'].map(a=>`<label><input type="radio" required name="choice" value="${a}"> ${a==='對'?'正確':'錯誤'}</label>`).join(' ')}
    </fieldset><button class="button small secondary" type="submit">檢查判斷</button>
    <div class="workshop-feedback" hidden><strong data-verdict></strong>${lists(w.check.steps)}</div></form>
  </section>`;
}

// Delegation works after hash navigation and Quest modal re-renders.
export function bindWorkshop(root) {
  root.addEventListener('submit', event => {
    const form = event.target;
    if (!form.matches('form[data-workshop-task]')) return;
    event.preventDefault();
    const panel = form.querySelector('.workshop-feedback');
    if (form.dataset.workshopTask === 'check') {
      const key = workshops[form.closest('[data-workshop]').dataset.workshop].check.answer;
      const correct = form.elements.choice.value === key;
      panel.querySelector('[data-verdict]').textContent = (correct ? '答對了。' : '再核對一次。') + '這個說法' + (key==='對'?'正確。':'有誤。');
    } else if (!form.elements.attempt.value.trim()) {
      form.elements.attempt.focus();
      return;
    }
    panel.hidden = false;
    panel.tabIndex = -1;
    panel.focus({preventScroll:true});
  });
  root.addEventListener('input', event => {
    const form = event.target.closest('form[data-workshop-task]');
    if (form) form.querySelector('.workshop-feedback').hidden = true;
  });
}
