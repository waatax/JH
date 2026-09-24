import {questionKey,hasAnswer,answeredCount as countGsatAnswered,sessionKey,secondsLeft,createSession,restoreSession} from './gsat-session.js';
import {evaluateExamSession} from './gsat-grading.js';
// gsat-interactive.js - 學測歷屆各科模擬考與互動練習引擎
// 涵蓋 108~115 學年度全考科、2,216 題官方題庫、計時模擬、多選題評分、非選自評與逐題答案核對

let cachedDatabase = null;
let viewEpoch=0;
const recentResults=new Map();
export function stopGsatView(){viewEpoch++;clearInterval(examTimerInterval);}
const GSAT_RESULTS_KEY = 'gsat-practice-history-v1';

const SUBJECT_CONFIG = {
  'chinese_comp': { name: '國語文綜合能力測驗', short: '國綜', minutes: 90, color: '#2e5944', icon: '文' },
  'writing': { name: '國語文寫作能力測驗', short: '國寫', minutes: 90, color: '#385749', icon: '筆' },
  'english': { name: '英文', short: '英文', minutes: 100, color: '#1f4860', icon: '英' },
  'math_a': { name: '數學A', short: '數A', minutes: 100, color: '#563d7c', icon: '∑A' },
  'math_b': { name: '數學B', short: '數B', minutes: 100, color: '#4a5b7c', icon: '∑B' },
  'math': { name: '數學 (舊制)', short: '數學', minutes: 100, color: '#4a5b7c', icon: '∑' },
  'social': { name: '社會', short: '社會', minutes: 110, color: '#7c5a2e', icon: '社' },
  'science': { name: '自然', short: '自然', minutes: 110, color: '#2e6b7c', icon: '自' }
};

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const formatTime = sec => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export async function loadGsatDatabase() {
  if (cachedDatabase) return cachedDatabase;
  if (typeof window === 'undefined') {
    const fs = await import('node:fs/promises');
    const {fileURLToPath} = await import('node:url');
    const filePath = fileURLToPath(new URL('./gsat-database.json', import.meta.url));
    const raw = await fs.readFile(filePath, 'utf-8');
    cachedDatabase = JSON.parse(raw);
    return cachedDatabase;
  }
  const res = await fetch(new URL('./gsat-database.json', import.meta.url));
  if (!res.ok) throw new Error('無法載入學測歷屆題庫資料');
  cachedDatabase = await res.json();
  return cachedDatabase;
}

// ----------------------------------------------------
// 1. GSAT Landing & Hub Page (#/gsat)
// ----------------------------------------------------
export async function gsatLandingPage(container) {
  const epoch=viewEpoch;
  container.innerHTML = `
    <div class="eyebrow">GSAT SIMULATION & PRACTICE</div>
    <h1>學測歷屆全科模擬考與互動題庫</h1>
    <p class="muted">收錄 108 至 115 學年度（共八個年度，包含新舊課綱）共 53 場考科、2,216 道官方試題與標準答案。支援計時練習模擬考與逐題即時練習。</p>
    <div class="panel" style="text-align:center;padding:40px 20px;">載入題庫索引中...</div>
  `;

  try {
    const db = await loadGsatDatabase();
    if(epoch!==viewEpoch)return;
    let currentSubject = 'all';
    let currentYear = 'all';
    let searchQuery = '';

    const renderHub = () => {
      const filteredExams = db.exams.filter(e => {
        if (currentSubject !== 'all' && e.subject_code !== currentSubject) return false;
        if (currentYear !== 'all' && String(e.year) !== String(currentYear)) return false;
        if (searchQuery && !`${e.year} ${e.subject_name}`.includes(searchQuery)) return false;
        return true;
      });

      container.innerHTML = `
        <div class="eyebrow">GSAT SIMULATION & PRACTICE</div>
        <h1>學測歷屆全科模擬考與互動題庫</h1>
        <p class="muted">收錄 108 至 115 學年度共 8 個年度、53 場考科、2,216 道官方試題轉錄與答案資料。計時練習、多選題答案核對、非選人工核對與評分資料。</p>
        
        <div class="stats">
          <div class="stat"><label>收錄學年度</label><strong>8 年</strong><small>108 ~ 115 學年度</small></div>
          <div class="stat"><label>考科試卷數</label><strong>53 卷</strong><small>國綜、國寫、英、數A/B、社、自</small></div>
          <div class="stat"><label>題庫題目總數</label><strong>${db.total_questions} 題</strong><small>圖表、公式請以原卷 PDF 核對</small></div>
          <div class="stat"><label>官方 PDF 存檔</label><strong>174 份</strong><small>題目、答案、評分原則、答題卷</small></div>
        </div>

        <section class="panel">
          <p class="notice">本站顯示 PDF 轉錄資料，部分公式、圖片、題型與題目邊界仍須對照原卷。練習回饋不等於官方原始總分；非選題需人工評閱，也不以得分率推估級分。</p><h2>考科與學年度篩選</h2>
          <div class="filters">
            <label>考科 
              <select id="gsat-filter-subject">
                <option value="all">全部考科 (${db.exams.length} 卷)</option>
                ${Object.entries(SUBJECT_CONFIG).map(([k, cfg]) => `<option value="${k}" ${currentSubject === k ? 'selected' : ''}>${cfg.name}</option>`).join('')}
              </select>
            </label>
            <label>學年度
              <select id="gsat-filter-year">
                <option value="all">全部學年度 (108 ~ 115)</option>
                ${[115, 114, 113, 112, 111, 110, 109, 108].map(y => `<option value="${y}" ${String(currentYear) === String(y) ? 'selected' : ''}>${y} 學年度 (${y + 1911})</option>`).join('')}
              </select>
            </label>
            <input type="search" id="gsat-search" placeholder="搜尋考科或年度..." value="${esc(searchQuery)}" style="min-width:180px;">
            <span class="tag accent">${filteredExams.length} 份試卷可練習</span>
          </div>
          <p class="notice">💡 111 學年度起為 108 課綱新制，數學分為「數學A」與「數學B」，國文分為「國綜」與「國寫」，新增混合題與非選擇題評分規準。108～110 學年度為 99 課綱銜接期試題。</p>
        </section>

        <section class="panel">
          <div class="row">
            <h2>各科試卷列表與模考入口</h2>
            <div class="actions">
              <a class="button secondary small" href="./downloads/gsat/" target="_blank">瀏覽 174 份官方 PDF 總目錄 ↗</a>
              <a class="button ghost small" href="#/sources">大考中心版權說明</a>
            </div>
          </div>

          <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
            ${filteredExams.map(ex => {
              const cfg = SUBJECT_CONFIG[ex.subject_code] || { name: ex.subject_name, short: ex.subject_name, minutes: 100, color: '#333', icon: '考' };
              return `
                <div class="gsat-exam-card" style="border-top: 4px solid ${cfg.color};">
                  <div class="row" style="margin-bottom:8px;">
                    <span class="tag">${ex.year} 學年度 · ${ex.curriculum}</span>
                    <span class="tag accent">${cfg.minutes} 分鐘</span>
                  </div>
                  <h3 style="margin:4px 0 6px;">${ex.year} 學年度 ${ex.subject_name}</h3>
                  <p class="muted" style="font-size:0.84rem;margin:0 0 14px;">題數：${ex.total_questions} 題 · 官方原卷 PDF 與解答已就緒</p>
                  
                  <div class="actions" style="margin:0 0 12px;gap:6px;">
                    <a class="button small" href="#/gsat-exam/${ex.exam_id}?mode=exam">⏱️ 計時練習</a>
                    <a class="button small secondary" href="#/gsat-exam/${ex.exam_id}?mode=practice">✏️ 逐題練習</a>
                  </div>

                  <div style="border-top:1px solid #edf1ef;padding-top:10px;font-size:0.75rem;display:flex;gap:8px;flex-wrap:wrap;">
                    <a class="source-link" href="./${ex.pdf_exam_path}" target="_blank" download>📄 試題 PDF</a>
                    ${ex.pdf_answers_path ? `<a class="source-link" href="./${ex.pdf_answers_path}" target="_blank" download>✅ 答案 PDF</a>` : ''}
                    ${ex.pdf_rubric_path ? `<a class="source-link" href="./${ex.pdf_rubric_path}" target="_blank" download>📝 評分原則</a>` : ''}
                    ${ex.pdf_sheet_path ? `<a class="source-link" href="./${ex.pdf_sheet_path}" target="_blank" download>📋 答題卷</a>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          ${!filteredExams.length ? `<div class="empty"><h2>沒有找到符合的試卷</h2><p>請嘗試切換考科或年度篩選。</p></div>` : ''}
        </section>
      `;

      container.querySelector('#gsat-filter-subject').onchange = e => { currentSubject = e.target.value; renderHub(); };
      container.querySelector('#gsat-filter-year').onchange = e => { currentYear = e.target.value; renderHub(); };
      container.querySelector('#gsat-search').oninput = e => { searchQuery = e.target.value; renderHub(); };
    };

    renderHub();
  } catch (err) {
    if(epoch!==viewEpoch)return;
    container.innerHTML = `<div class="panel"><h2>題庫載入失敗</h2><p>${esc(err.message)}</p></div>`;
  }
}

// ----------------------------------------------------
// 2. Interactive Exam & Practice Page (#/gsat-exam/:id)
// ----------------------------------------------------
let activeExamSession = null;
let examTimerInterval = null;

export async function gsatExamPage(container, examId) {
  const epoch=viewEpoch;
  const urlParams = new URLSearchParams(location.hash.split('?')[1] || '');
  const mode = urlParams.get('mode') === 'practice' ? 'practice' : 'exam'; // 'exam' or 'practice'

  container.innerHTML = `
    <div class="panel" style="text-align:center;padding:50px 20px;">
      <h2>正在準備試卷內容...</h2>
      <p class="muted">載入題目、選項、題組引文與評分規準...</p>
    </div>
  `;

  let db;
  try{db=await loadGsatDatabase();}catch{
    if(epoch===viewEpoch)container.innerHTML='<section class="panel"><h2>題庫載入失敗</h2><p>請重新整理後續答。已儲存的作答仍保留在此裝置。</p></section>';
    return;
  }
  if(epoch!==viewEpoch)return;
  const exam = db.exams.find(e => e.exam_id === examId);
  if (!exam) {
    container.innerHTML = `<div class="panel"><h2>找不到指定的學測試卷</h2><p>試卷代碼：${esc(examId)}</p><a class="button" href="#/gsat">返回學測模考目錄</a></div>`;
    return;
  }

  const questions = db.questions.filter(q => q.exam_id === examId);
  const cfg = SUBJECT_CONFIG[exam.subject_code] || { name: exam.subject_name, minutes: 100, color: '#333' };

  if(!questions.length){container.innerHTML='<p>此試卷尚無可用題目。</p>';return;}
  const storageKey=sessionKey(examId,mode);
  if(!activeExamSession||activeExamSession.examId!==examId||activeExamSession.mode!==mode||activeExamSession.submitted){
    let saved=null;
    try{saved=restoreSession(localStorage.getItem(storageKey),examId,mode,questions);}catch{}
    activeExamSession=saved||createSession(exam,questions,mode,cfg.minutes);
  }
  const session=activeExamSession;
  session.secondsRemaining=secondsLeft(session);
  let storageOK=true;
  const persist=()=>{
    try{localStorage.setItem(storageKey,JSON.stringify(session));storageOK=true;}catch{storageOK=false;}
    const status=container.querySelector('#gsat-save-status');
    if(status)status.textContent=storageOK?'已自動儲存於此裝置，可離開後續答。計時練習離開後仍持續計時。':'此裝置無法儲存作答，請保持本頁開啟直到交卷。';
    const progress=container.querySelector('#gsat-answer-count');
    if(progress)progress.textContent=countGsatAnswered(session,questions)+' / '+questions.length;
    container.querySelectorAll('[data-nav-q]').forEach(button=>button.classList.toggle('answered',hasAnswer(session.answers[questionKey(questions[Number(button.dataset.navQ)])])));
  };

  // Timer logic
  clearInterval(examTimerInterval);
  if (session.mode === 'exam') {
    examTimerInterval = setInterval(() => {
      if(epoch!==viewEpoch||session.submitted)return;
      session.secondsRemaining = secondsLeft(session);
      const timerEl = document.getElementById('gsat-timer-display');
      if (timerEl) {
        timerEl.textContent = formatTime(Math.max(0, session.secondsRemaining));
        if (session.secondsRemaining <= 300) {
          timerEl.classList.add('urgent');
        } else {
          timerEl.classList.remove('urgent');
        }
      }
      if (session.secondsRemaining <= 0) {
        clearInterval(examTimerInterval);
        submitExam(true);
      }
    }, 1000);
  }

  const renderQuestionUI = () => {
    const q = questions[session.cursor];
    if (!q) return;

    const answeredCount = countGsatAnswered(session,questions);
    const isFlagged = session.flagged[questionKey(q)];
    const isChecked = session.checked[questionKey(q)];
    const userAnswer = session.answers[questionKey(q)];

    const hasPassage = Boolean(q.passage_text && q.passage_text.trim());
    const isWriting = exam.subject_code === 'writing';
    const isMultiChoice = q.question_type === '多選題';
    const isFillIn = q.question_type === '選填題' || q.question_type === '選填格/子題';
    const isNonChoice = q.question_type.includes('非選擇') || q.question_type.includes('混合') || isWriting;

    container.innerHTML = `
      <div class="quiz" style="max-width:1100px;">
        <div class="row" style="margin-bottom:12px;">
          <a class="breadcrumb" href="#/gsat" style="margin-bottom:0;">← 返回學測模考總覽</a>
          <div class="actions" style="margin:0;">
            <a class="button small secondary" href="./${exam.pdf_exam_path}" target="_blank">📄 原始試卷 PDF</a>
            ${exam.pdf_rubric_path ? `<a class="button small secondary" href="./${exam.pdf_rubric_path}" target="_blank">評分原則</a>` : ''}
          </div>
        </div>

        <div class="quiz-head" style="background:white;padding:16px 20px;border-radius:12px;border:1px solid #e1e7e6;margin-bottom:18px;">
          <div>
            <span class="tag accent">${session.mode === 'exam' ? '⏱️ 計時練習模擬考' : '✏️ 逐題即時練習'}</span>
            <span class="tag">${exam.curriculum}</span>
            <h1 style="font-size:1.35rem;margin:6px 0 0;">${esc(session.examTitle)}</h1>
          </div>
          <div style="text-align:right;">
            ${session.mode === 'exam' ? `
              <div style="font-size:0.75rem;color:#708277;">剩餘作答時間</div>
              <div id="gsat-timer-display" class="gsat-timer">${formatTime(Math.max(0, session.secondsRemaining))}</div>
            ` : `
              <span class="tag">隨選練習 · 自由查看解析</span>
            `}
          </div>
        </div>

        <p id="gsat-save-status" class="notice" role="status"></p>
        <!-- Question Navigation Grid -->
        <div class="panel" style="padding:14px 18px;margin-bottom:16px;">
          <div class="row" style="margin-bottom:8px;font-size:0.8rem;">
            <span>作答進度：<strong id="gsat-answer-count">${answeredCount} / ${questions.length}</strong> 題</span>
            <span style="display:flex;gap:12px;align-items:center;">
              <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#325941;border-radius:2px;"></span> 目前</span>
              <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#b9d89f;border-radius:2px;"></span> 已答</span>
              <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#fff3cd;border-radius:2px;"></span> 標記</span>
            </span>
          </div>
          <div class="quiz-nav" style="margin:0;max-height:100px;overflow-y:auto;">
            ${questions.map((item, idx) => {
              const ansed = hasAnswer(session.answers[questionKey(item)]);
              const flg = session.flagged[questionKey(item)];
              const cur = idx === session.cursor;
              let cls = cur ? 'current ' : '';
              if (ansed) cls += 'answered ';
              return `<button class="${cls}" style="${flg ? 'border:2px solid #e09b19;background:#fff9e6;' : ''}" data-nav-q="${idx}" title="第 ${item.question_number} 題">${item.question_number}</button>`;
            }).join('')}
          </div>
        </div>

        <!-- Main Question & Reading Area -->
        <div class="${hasPassage ? 'gsat-split-layout' : ''}">
          
          ${hasPassage ? `
            <!-- Left Pane: Reading Passage Context -->
            <section class="gsat-passage-panel">
              <div class="row" style="margin-bottom:10px;">
                <span class="tag accent" style="font-weight:700;">📖 題組閱讀材料 / 題文引述</span>
                <div class="actions" style="margin:0;gap:4px;">
                  <button class="button small ghost" id="font-dec" title="縮小字級" style="padding:3px 8px;">A-</button>
                  <button class="button small ghost" id="font-inc" title="放大字級" style="padding:3px 8px;">A+</button>
                </div>
              </div>
              <div id="passage-content" class="gsat-passage-content" style="font-size:${session.fontSize}px;">
                ${esc(q.passage_text)}
              </div>
            </section>
          ` : ''}

          <!-- Right Pane: Question Prompt & Answer Controls -->
          <section class="gsat-quiz-card">
            <div class="row">
              <span class="tag" style="font-weight:700;background:#e9f2eb;color:#1e4330;">
                第 ${q.question_number} 題 · ${q.question_type} ${q.score ? `(${q.score})` : ''}
              </span>
              <button id="flag-btn" class="button small ghost ${isFlagged ? 'active' : ''}" style="${isFlagged ? 'background:#fff3cd;color:#966400;' : ''}">
                ${isFlagged ? '⚑ 已標記此題' : '⚐ 標記本題'}
              </button>
            </div>

            <div class="question" style="margin:18px 0;font-size:1.15rem;line-height:1.95;color:#18362b;">
              ${esc(q.question_text)}
            </div>

            <!-- Answer Input Widget -->
            <div style="margin:20px 0;">
              ${isMultiChoice ? `
                <!-- Multiple Choice Checkboxes -->
                <p class="subtle" style="margin-bottom:10px;color:#355944;">
                  ☑️ <strong>多選題作答</strong>：每題有 5 個選項，請勾選所有正確項目（答錯一個選項扣部分分，計分規則參照大考中心規準）。
                </p>
                <div class="options">
                  ${Object.entries(q.options).map(([optKey, optText]) => {
                    const selectedList = Array.isArray(userAnswer) ? userAnswer : [];
                    const isCheckedOpt = selectedList.includes(optKey);
                    return `
                      <label class="option ${isCheckedOpt ? 'selected' : ''}" style="cursor:pointer;">
                        <input type="checkbox" name="multi-opt" value="${esc(optKey)}" ${isCheckedOpt ? 'checked' : ''} style="width:20px;height:20px;">
                        <span>${esc(optKey)}</span>
                        <span>${esc(optText)}</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              ` : Object.keys(q.options).length > 0 ? `
                <!-- Single Choice Options -->
                <div class="options">
                  ${Object.entries(q.options).map(([optKey, optText]) => {
                    const isSelected = userAnswer === optKey;
                    return `
                      <button type="button" class="option ${isSelected ? 'selected' : ''}" data-single-opt="${esc(optKey)}">
                        <span>${esc(optKey)}</span>
                        <span>${esc(optText)}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              ` : isFillIn ? `
                <!-- Fill-in Blanks -->
                <div class="callout" style="background:#f4f9f4;">
                  <strong>選填題作答</strong>
                  <p class="subtle">請輸入本格答案（包含數字、正負號或最簡分數表示）：</p>
                  <input type="text" id="fillin-input" value="${esc(userAnswer || '')}" placeholder="請在此輸入答案..." style="width:100%;max-width:320px;font-size:1.2rem;padding:10px 14px;border:1px solid #9bb5a3;border-radius:8px;">
                </div>
              ` : `
                <!-- Constructed Response / Writing -->
                <div class="callout" style="background:#f8faf8;">
                  <strong>${isWriting ? '寫作作答區' : '簡答與計算說明區'}</strong>
                  <p class="subtle">請依題意完整寫下解題推導、論證過程或分析（字數與排版請參照答題卷指示）：</p>
                  <textarea id="nonchoice-textarea" placeholder="在此輸入你的作答與推導過程..." style="min-height:220px;font-size:1rem;line-height:1.9;">${esc(userAnswer || '')}</textarea>
                  <div class="row" style="margin-top:8px;">
                    <small class="muted" id="char-count">${(userAnswer || '').replace(/\s/g, '').length} 字元</small>
                  </div>
                </div>
              `}
            </div>

            <!-- Instant Feedback in Practice Mode -->
            ${session.mode === 'practice' ? `
              <div class="actions" style="margin-top:14px;">
                <button id="show-answer-btn" class="button secondary small">
                  ${isChecked ? '隱藏解答與評分標準' : '💡 即時核對答案與解析'}
                </button>
              </div>

              ${isChecked ? `
                <div class="explanation" style="background:#eef6ea;border-left:4px solid #588746;padding:18px 20px;border-radius:8px;margin-top:16px;">
                  <h4 style="margin:0 0 8px;color:#214e32;">【官方標準答案與評閱指引】</h4>
                  <p style="font-size:1.05rem;font-weight:700;color:#1e432c;">
                    官方標準答案：${esc(q.answer || '非選擇題依評分原則評閱')}
                  </p>
                  ${q.rubric_text ? `
                    <div style="margin-top:10px;padding-top:10px;border-top:1px dashed #b9ceb9;">
                      <strong>非選擇題評分原則摘要：</strong>
                      <p style="font-size:0.88rem;line-height:1.8;color:#355341;">${esc(q.rubric_text)}</p>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
            ` : ''}

            <!-- Bottom Action Navigation -->
            <div class="actions" style="justify-content:space-between;border-top:1px solid #edf1ef;padding-top:18px;margin-top:24px;">
              <button id="btn-prev" class="button secondary" ${session.cursor === 0 ? 'disabled' : ''}>← 上一題</button>
              <div style="display:flex;gap:10px;">
                ${session.cursor < questions.length - 1 ? `
                  <button id="btn-next" class="button">下一題 →</button>
                ` : `
                  <button id="btn-submit" class="button light" style="background:#d6fa77;color:#193e35;font-weight:700;">✓ 完成交卷評分</button>
                `}
              </div>
            </div>
          </section>
        </div>

        <div style="margin-top:24px;text-align:right;">
          <button id="btn-submit-anytime" class="button secondary small">提前交卷與查看總評量 →</button>
        </div>
      </div>
    `;

    persist();
    // Bind event handlers
    // 1. Navigation buttons
    const prevBtn = container.querySelector('#btn-prev');
    if (prevBtn) prevBtn.onclick = () => { session.cursor--; renderQuestionUI(); };

    const nextBtn = container.querySelector('#btn-next');
    if (nextBtn) nextBtn.onclick = () => { session.cursor++; renderQuestionUI(); };

    const navBtns = container.querySelectorAll('[data-nav-q]');
    navBtns.forEach(b => b.onclick = () => { session.cursor = Number(b.dataset.navQ); renderQuestionUI(); });

    // 2. Flagging
    const flagBtn = container.querySelector('#flag-btn');
    if (flagBtn) flagBtn.onclick = () => {
      session.flagged[questionKey(q)] = !session.flagged[questionKey(q)];
      renderQuestionUI();
    };

    // 3. Single Choice
    const singleOpts = container.querySelectorAll('[data-single-opt]');
    singleOpts.forEach(b => b.onclick = () => {
      session.answers[questionKey(q)] = b.dataset.singleOpt;
      renderQuestionUI();
    });

    // 4. Multi Choice
    const multiChecks = container.querySelectorAll('input[name="multi-opt"]');
    multiChecks.forEach(cb => cb.onchange = () => {
      const selected = [...container.querySelectorAll('input[name="multi-opt"]:checked')].map(c => c.value);
      session.answers[questionKey(q)] = selected;
      multiChecks.forEach(c=>c.closest("label").classList.toggle("selected",c.checked));
      persist();
    });

    // 5. Fill-in
    const fillinInput = container.querySelector('#fillin-input');
    if (fillinInput) {
      fillinInput.oninput = e => {
        session.answers[questionKey(q)] = e.target.value.trim();
        persist();
      };
    }

    // 6. Non-choice Textarea
    const textarea = container.querySelector('#nonchoice-textarea');
    if (textarea) {
      textarea.oninput = e => {
        session.answers[questionKey(q)] = e.target.value;
        persist();
        const countEl = container.querySelector('#char-count');
        if (countEl) countEl.textContent = `${e.target.value.replace(/\s/g, '').length} 字元`;
      };
    }

    // 7. Practice Mode toggle answer
    const showAnsBtn = container.querySelector('#show-answer-btn');
    if (showAnsBtn) {
      showAnsBtn.onclick = () => {
        session.checked[questionKey(q)] = !session.checked[questionKey(q)];
        renderQuestionUI();
      };
    }

    // 8. Font size controls
    const fontInc = container.querySelector('#font-inc');
    if (fontInc) fontInc.onclick = () => { session.fontSize = Math.min(24, session.fontSize + 2); renderQuestionUI(); };
    const fontDec = container.querySelector('#font-dec');
    if (fontDec) fontDec.onclick = () => { session.fontSize = Math.max(14, session.fontSize - 2); renderQuestionUI(); };

    // 9. Submit buttons
    const submitBtn = container.querySelector('#btn-submit');
    if (submitBtn) submitBtn.onclick = () => confirmSubmit();
    const submitAnytime = container.querySelector('#btn-submit-anytime');
    if (submitAnytime) submitAnytime.onclick = () => confirmSubmit();
  };

  const confirmSubmit = () => {
    const answeredCount = countGsatAnswered(session,questions);
    const unanswered = questions.length - answeredCount;
    if (unanswered > 0) {
      if (!confirm(`尚有 ${unanswered} 題未作答，確定要現在交卷結算成績嗎？`)) return;
    } else {
      if (!confirm(`全卷 ${questions.length} 題皆已作答，確定要交卷嗎？`)) return;
    }
    submitExam(false);
  };

  const submitExam = (isExpired) => {
    if(session.submitted)return;
    session.submitted=true;
    persist();
    clearInterval(examTimerInterval);
    const result = evaluateExamSession(session, questions, exam, isExpired);
    
    recentResults.set(result.id,result);
    // Save to history in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem(GSAT_RESULTS_KEY) || '[]');
      const history=Array.isArray(stored)?stored:[];
      history.unshift(result);
      localStorage.setItem(GSAT_RESULTS_KEY, JSON.stringify(history.slice(0, 50)));
    } catch (e) {
      console.warn('Storage warning', e);
    }

    activeExamSession = null;
    location.hash = `#/gsat-result/${result.id}`;
  };

  if(mode==='exam'&&secondsLeft(session)===0)submitExam(true);
  else renderQuestionUI();
}

// ----------------------------------------------------
// 3. Exam Grading Algorithm (CEEC Standards)
// ----------------------------------------------------
// 4. Exam Result & Detailed Review Page (#/gsat-result/:id)
// ----------------------------------------------------
export function gsatResultPage(container, resultId) {
  let result = recentResults.get(resultId)||null;
  try {
    const history = JSON.parse(localStorage.getItem(GSAT_RESULTS_KEY) || '[]');
    result = (Array.isArray(history)?history.find(r => r.id === resultId):null)||result;
  } catch (e) {}

  if (!result) {
    container.innerHTML = `
      <div class="panel">
        <h2>查無此測驗評量結果</h2>
        <a class="button" href="#/gsat">返回學測模考總覽</a>
      </div>
    `;
    return;
  }

  if(result.scoringVersion!==2){container.innerHTML='<section class="panel"><h2>舊版評分紀錄</h2><p>先前版本的配分與級分推估未經完整校驗，因此不再顯示不可靠成績。原作答紀錄仍保留在此裝置。</p><a class="button" href="#/gsat">使用修正版重新練習</a></section>';return;}
  let filterTab = 'all';

  const renderResult = () => {
    const filteredRows = result.rows.filter(r => {
      if (filterTab === 'wrong') return !r.pendingReview && !r.isCorrect;
      if (filterTab === 'correct') return r.isCorrect;
      if (filterTab === 'nonchoice') return r.pendingReview;
      return true;
    });

    container.innerHTML = `
      <div class="quiz" style="max-width:1100px;">
        <div class="row" style="margin-bottom:12px;">
          <a class="breadcrumb" href="#/gsat">← 返回學測模考總覽</a>
          <div class="actions" style="margin:0;">
            <a class="button small secondary" href="#/gsat-exam/${result.examId}?mode=exam">🔄 重新挑戰全卷</a>
          </div>
        </div>

        <div class="eyebrow">DIAGNOSTIC REPORT & REFLECTION</div>
        <h1>${esc(result.examTitle)} · 測驗結果報告</h1>

        <!-- Overall Score Card -->
        <div class="panel" style="background:white;padding:28px;margin-bottom:24px;">
          <div class="row" style="align-items:center;border-bottom:1px solid #edf1ee;padding-bottom:20px;margin-bottom:20px;">
            <div>
              <div style="font-size:0.82rem;color:#6d8276;">可核對題目折算值（每題 1，非官方配分）</div>
              <div style="display:flex;align-items:baseline;gap:10px;">
                <span class="result-score">${result.earnedScore}</span>
                <span style="font-size:1.4rem;color:#788c81;">/ ${result.totalMaxScore} 題</span>
                <span class="tag accent" style="font-size:0.9rem;padding:6px 12px;">核對率 ${result.percent}%</span>
              </div>
            </div>
            
            <div style="text-align:right;">
              <span class="tag" style="font-size:0.85rem;padding:6px 14px;background:#eef6ea;color:#235436;font-weight:700;">
                不換算學測級分
              </span>
              <p class="subtle" style="margin-top:6px;">作答時間：${formatTime(result.durationSeconds)} · ${result.isExpired ? '時間到自動交卷' : '正常交卷'}</p>
            </div>
          </div>

          <div class="stats" style="margin:0 0 16px;">
            <div class="stat"><label>總作答題數</label><strong>${result.totalQuestions} 題</strong><small>全卷題目</small></div>
            <div class="stat"><label>客觀題全對</label><strong>${result.correctCount} 題</strong><small>滿分題數</small></div>
            <div class="stat"><label>待補強與錯題</label><strong>${result.totalMaxScore - result.correctCount} 題</strong><small>需詳讀解析</small></div>
            <div class="stat"><label>待人工核對</label><strong>${result.pendingCount} 題</strong><small>非選題或資料不足</small></div>
          </div>
          
          <p class="notice">此處僅以可核對題目提供練習回饋，每題採 1 單位、多選依完整五選項紀錄折算；未驗證官方逐題配分，不是原始總分或級分。非選題與資料不足題目待人工依原卷評分，不因輸入文字自動給分。</p>
        </div>

        <!-- Filter Tabs -->
        <div class="section-head">
          <h2>逐題檢討與官方評閱指引</h2>
          <div class="filters" style="margin:0;">
            <button class="chip ${filterTab === 'all' ? 'active' : ''}" id="tab-all">全部題目 (${result.rows.length})</button>
            <button class="chip ${filterTab === 'wrong' ? 'active' : ''}" id="tab-wrong">❌ 錯題與部分得分 (${result.rows.filter(r => !r.pendingReview && !r.isCorrect).length})</button>
            <button class="chip ${filterTab === 'correct' ? 'active' : ''}" id="tab-correct">✓ 完全答對 (${result.rows.filter(r => r.isCorrect).length})</button>
            <button class="chip ${filterTab === 'nonchoice' ? 'active' : ''}" id="tab-nonchoice">📝 待人工核對 (${result.pendingCount})</button>
          </div>
        </div>

        <!-- Question Cards -->
        <div class="stack" style="gap:16px;">
          ${filteredRows.map((r, i) => {
            const hasPassage = Boolean(r.passage_text && r.passage_text.trim());
            return `
              <div class="panel" style="border-left: 5px solid ${r.pendingReview ? '#ba8d3d' : r.isCorrect ? '#5da149' : '#c95442'};">
                <div class="row" style="margin-bottom:8px;">
                  <span class="tag" style="font-weight:700;">
                    第 ${r.question_number} 題 · ${r.question_type}
                  </span>
                  <span class="tag" style="${r.isCorrect ? 'background:#e3f5e1;color:#2b6e36;' : 'background:#fde8e5;color:#9e3223;'} font-weight:700;">
                    ${r.pendingReview ? `待人工核對（不計入）` : r.isCorrect ? `✓ 答案符合` : `核對值 ${r.earnedScore} / 1`}
                  </span>
                </div>

                ${hasPassage ? `
                  <details style="background:#f9fbf9;border:1px solid #e2ece4;border-radius:8px;padding:12px 16px;margin:10px 0;">
                    <summary style="font-weight:700;color:#244d37;">展開閱讀題組引文與情境材料 ▾</summary>
                    <div style="font-size:0.95rem;line-height:1.95;white-space:pre-wrap;color:#264335;margin-top:10px;">
                      ${esc(r.passage_text)}
                    </div>
                  </details>
                ` : ''}

                <div style="font-size:1.08rem;line-height:1.9;color:#18362b;margin:12px 0;">
                  ${esc(r.question_text)}
                </div>

                <!-- Display Options if available -->
                ${Object.keys(r.options).length > 0 ? `
                  <div class="options" style="margin:12px 0;">
                    ${Object.entries(r.options).map(([k, text]) => {
                      const isOfficial = String(r.officialAnswer).includes(k.replace(/[\(\)]/g, ''));
                      const isUser = Array.isArray(r.userAnswer) ? r.userAnswer.includes(k) : r.userAnswer === k;
                      let badge = '';
                      let optCls = '';
                      if (isOfficial) {
                        badge = '✓ 正確答案';
                        optCls = 'correct';
                      }
                      if (isUser && !isOfficial) {
                        badge = '✕ 你的作答 (錯誤)';
                        optCls = 'wrong';
                      } else if (isUser && isOfficial) {
                        badge = '✓ 你的作答 (正確)';
                      }
                      return `
                        <div class="option ${optCls}" style="padding:12px 16px;">
                          <span>${esc(k)}</span>
                          <span style="flex:1;">${esc(text)}</span>
                          ${badge ? `<span class="tag ${isOfficial ? 'success' : ''}" style="font-weight:700;">${badge}</span>` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                ` : ''}

                <!-- Answer & Explanation Callout -->
                <div class="explanation" style="background:#f4f9f2;border:1px solid #dbe8d8;padding:16px 20px;border-radius:8px;margin-top:14px;">
                  <div class="row" style="margin-bottom:6px;">
                    <div>
                      你的作答：<strong>${esc(Array.isArray(r.userAnswer) ? r.userAnswer.join(', ') : (r.userAnswer || '未作答'))}</strong>
                    </div>
                    <div>
                      官方標準答案：<strong style="color:#205234;font-size:1.1rem;">${esc(r.officialAnswer || '非選擇題依評分原則')}</strong>
                    </div>
                  </div>

                  ${r.rubric_text ? `
                    <div style="margin-top:10px;padding-top:10px;border-top:1px dashed #cadbc8;">
                      <strong style="color:#204e33;">大考中心評分原則與閱卷標準：</strong>
                      <p style="font-size:0.86rem;line-height:1.8;color:#2c4b38;margin:6px 0 0;">
                        ${esc(r.rubric_text)}
                      </p>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Tab bindings
    container.querySelector('#tab-all').onclick = () => { filterTab = 'all'; renderResult(); };
    container.querySelector('#tab-wrong').onclick = () => { filterTab = 'wrong'; renderResult(); };
    container.querySelector('#tab-correct').onclick = () => { filterTab = 'correct'; renderResult(); };
    container.querySelector('#tab-nonchoice').onclick = () => { filterTab = 'nonchoice'; renderResult(); };
  };

  renderResult();
}
