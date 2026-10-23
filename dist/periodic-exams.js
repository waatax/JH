// periodic-exams.js - Junior High School Periodic Exam Preparation Handouts & Cross-Reference System
import { periodicExams, periodicExamById } from './periodic-exam-data.js';

let activeGrade = 7;
let activeTerm = 1;
let activeExamNum = 1;
let activeSubject = 'chinese';
let searchQuery = '';

const CHECKLIST_STORAGE_KEY = 'zhixing_periodic_checklist_v1';
const ANSWERS_STORAGE_KEY = 'zhixing_periodic_answers_v1';

function loadChecklistState() {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveChecklistState(state) {
  try {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save checklist state', e);
  }
}

function loadAnswersState() {
  try {
    return JSON.parse(localStorage.getItem(ANSWERS_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveAnswersState(state) {
  try {
    localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save answers state', e);
  }
}

const escapeHtml = str => String(str ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

export function renderPeriodicExamsPage(container, targetId) {
  if (targetId) {
    const parts = targetId.split('-');
    if (parts.length >= 3) {
      activeGrade = parseInt(parts[0], 10) || 7;
      activeTerm = parseInt(parts[1], 10) || 1;
      activeExamNum = parseInt(parts[2], 10) || 1;
      if (parts[3]) activeSubject = parts[3];
    }
  }

  // Fallback for Grade 9 Term 2 (only has exams 1 and 2)
  if (activeGrade === 9 && activeTerm === 2 && activeExamNum > 2) {
    activeExamNum = 2;
  }

  const examId = `${activeGrade}-${activeTerm}-${activeExamNum}`;
  let currentExam = periodicExamById[examId];
  if (!currentExam) {
    // default to 7-1-1
    activeGrade = 7;
    activeTerm = 1;
    activeExamNum = 1;
    currentExam = periodicExamById['7-1-1'];
  }

  const subjectData = currentExam.subjects[activeSubject] || currentExam.subjects.chinese;
  const checklistState = loadChecklistState();
  const answersState = loadAnswersState();

  const subjectsList = [
    { id: 'chinese', name: '國語文', icon: '📜' },
    { id: 'english', name: '英語文', icon: '🔤' },
    { id: 'math', name: '數學', icon: '📐' },
    { id: 'science', name: '自然科學', icon: '🔬' },
    { id: 'social', name: '社會領域', icon: '🌏' }
  ];

  // Calculate checklist progress for current subject
  const currentChecklistKeys = (subjectData.countdownChecklist || []).map((_, i) => `${examId}-${activeSubject}-${i}`);
  const completedCount = currentChecklistKeys.filter(k => checklistState[k]).length;
  const totalChecklist = currentChecklistKeys.length;
  const checklistPct = totalChecklist ? Math.round((completedCount / totalChecklist) * 100) : 0;

  container.innerHTML = `
    <div class="periodic-exams-container">
      <!-- Breadcrumb & Top Bar -->
      <div class="periodic-header-banner no-print">
        <div class="periodic-badge-row">
          <span class="pill-tag gradient">臺灣 108 課綱最新標準</span>
          <span class="pill-tag junyi">均一教育平台全面對齊</span>
          <span class="pill-tag paper">段考考卷真題交叉比對</span>
          <span class="pill-tag print-tag">支援 A4 講義一鍵列印</span>
        </div>
        <h1 class="periodic-main-title">國中三年各科 · 段考知識點預備講義</h1>
        <p class="periodic-subtitle">
          依據教育部 108 課綱、均一教育平台數位學習資源，及全臺國中段考/期中/期末考卷題目交叉比對。完整編列康軒、翰林、南一三大版本核心知識點、考場防踩坑防呆提醒、名校真題精選詳解與素養導向情境題，供學生高效複習、迎戰段考！
        </p>
        <div class="periodic-actions-bar">
          <button class="button print-btn" type="button" id="btn-print-handout">
            🖨️ 一鍵列印本單元段考講義
          </button>
          <div class="periodic-search-wrap">
            <input type="search" id="periodic-search-input" placeholder="🔍 搜尋段考考點（如：光合作用、二元一次、關係代名詞...）" value="${escapeHtml(searchQuery)}" />
          </div>
          <div class="checklist-progress-badge">
            <span class="progress-label">考前檢核完成度：</span>
            <div class="progress-bar-small">
              <div class="progress-fill-small" style="width: ${checklistPct}%;"></div>
            </div>
            <strong>${checklistPct}%</strong> (${completedCount}/${totalChecklist})
          </div>
        </div>
      </div>

      <!-- Grade, Term & Exam Switcher -->
      <div class="periodic-nav-box no-print">
        <div class="periodic-nav-group">
          <span class="nav-group-label">年級選擇：</span>
          <div class="pill-group">
            ${[7, 8, 9].map(g => `
              <button type="button" class="chip-button ${g === activeGrade ? 'active' : ''}" data-grade="${g}">
                國${['一', '二', '三'][g - 7]} (${g}年級)
              </button>
            `).join('')}
          </div>
        </div>

        <div class="periodic-nav-group">
          <span class="nav-group-label">學期選擇：</span>
          <div class="pill-group">
            <button type="button" class="chip-button ${activeTerm === 1 ? 'active' : ''}" data-term="1">
              上學期（Term 1）
            </button>
            <button type="button" class="chip-button ${activeTerm === 2 ? 'active' : ''}" data-term="2">
              下學期（Term 2）
            </button>
          </div>
        </div>

        <div class="periodic-nav-group">
          <span class="nav-group-label">段考次別：</span>
          <div class="pill-group">
            <button type="button" class="chip-button ${activeExamNum === 1 ? 'active' : ''}" data-exam="1">
              第一次段考（期中考）
            </button>
            <button type="button" class="chip-button ${activeExamNum === 2 ? 'active' : ''}" data-exam="2">
              第二次段考${activeGrade === 9 && activeTerm === 2 ? '（畢業考／會考全真模擬）' : ''}
            </button>
            ${!(activeGrade === 9 && activeTerm === 2) ? `
              <button type="button" class="chip-button ${activeExamNum === 3 ? 'active' : ''}" data-exam="3">
                第三次段考（期末考）
              </button>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Subject Tabs -->
      <div class="periodic-subject-tabs no-print">
        ${subjectsList.map(s => `
          <button type="button" class="subject-tab-btn ${s.id === activeSubject ? 'active' : ''}" data-subject="${s.id}">
            <span class="tab-icon">${s.icon}</span>
            <span class="tab-title">${s.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- PRINT-ONLY HEADER -->
      <div class="print-header-only">
        <div class="print-header-top">
          <h2 style="margin:0 0 4px 0;font-size:18pt;text-align:center;">知行學院 · 國中段考知識點預備講義</h2>
          <div style="display:flex;justify-content:space-between;border-bottom:2px solid #000;padding-bottom:6px;font-size:10pt;">
            <span><strong>年級/考別：</strong>${currentExam.title}</span>
            <span><strong>考查科目：</strong>${subjectData.subjectName}</span>
            <span><strong>班級：</strong>__________ <strong>座號：</strong>____ <strong>姓名：</strong>__________</span>
          </div>
        </div>
      </div>

      <!-- Active Exam Info Card -->
      <div class="periodic-exam-info-card">
        <div class="exam-title-row">
          <div>
            <span class="exam-id-badge">${currentExam.id}</span>
            <h2 class="exam-title-text">${currentExam.title} · ${subjectData.subjectName}</h2>
          </div>
          <span class="exam-scope-pill">考科範圍：${currentExam.scopeSummary}</span>
        </div>

        <!-- Textbook Comparison Box -->
        <div class="curriculum-alignment-grid">
          <div class="alignment-card textbook-card">
            <div class="alignment-card-title">
              <span>📚</span> 三大版本（康軒 / 翰林 / 南一）教材課次範圍交叉對照
            </div>
            <p class="alignment-card-content">${escapeHtml(subjectData.editionScope)}</p>
          </div>

          <div class="alignment-card naer-card">
            <div class="alignment-card-title">
              <span>🏛️</span> 108 課綱學習內容與指標對齊代碼
            </div>
            <p class="alignment-card-content"><code>${escapeHtml(subjectData.naerCode)}</code></p>
          </div>

          <div class="alignment-card junyi-card">
            <div class="alignment-card-title">
              <span>💡</span> 均一教育平台推薦數位學習單元
            </div>
            <p class="alignment-card-content">${escapeHtml(subjectData.junyiAlignment)}</p>
          </div>
        </div>
      </div>

      <!-- SECTION 1: CORE KNOWLEDGE BASE -->
      <section class="periodic-section">
        <div class="section-badge-title">
          <span class="section-icon">🌟</span>
          <h3>【核心段考知識點預備精華】高頻觀念深度梳理</h3>
        </div>
        <div class="knowledge-cards-list">
          ${(subjectData.coreKnowledge || []).map((item, idx) => `
            <div class="knowledge-card">
              <div class="knowledge-card-head">
                <span class="point-num">考點 0${idx + 1}</span>
                <h4>${escapeHtml(item.title)}</h4>
              </div>
              <div class="knowledge-takeaway">
                <strong>💡 核心觀念精粹：</strong>
                <p>${escapeHtml(item.takeaway)}</p>
              </div>
              <div class="knowledge-details">
                <strong>📖 深入解構與推導：</strong>
                <p>${item.details ? escapeHtml(item.details).replace(/\\n/g, '<br>') : ''}</p>
              </div>
              ${item.rule ? `
                <div class="knowledge-rule">
                  <span class="rule-icon">⚡</span>
                  <strong>考場秒殺法則 / 解題黃金口訣：</strong>
                  <span>${escapeHtml(item.rule)}</span>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 2: CROSS-REFERENCED EXAM QUESTIONS -->
      <section class="periodic-section">
        <div class="section-badge-title">
          <span class="section-icon">🎯</span>
          <h3>【段考考卷題目交叉比對與即時驗證】名校段考真題實戰</h3>
        </div>
        <div class="exam-questions-list">
          ${(subjectData.examPaperQuestions || []).map((q, qIdx) => {
            const answerKey = `${q.id || `${examId}-${activeSubject}-q${qIdx}`}`;
            const selectedOpt = answersState[answerKey];
            const isAnswered = typeof selectedOpt === 'number';
            const isCorrect = isAnswered && selectedOpt === q.answer;

            return `
              <div class="periodic-question-card ${isAnswered ? (isCorrect ? 'answered-correct' : 'answered-wrong') : ''}" data-qid="${answerKey}" data-correct="${q.answer}">
                <div class="question-header">
                  <span class="question-badge">試題 0${qIdx + 1}</span>
                  <span class="school-source-badge">🏫 來源出處：${escapeHtml(q.sourceSchool || '全臺段考精選')}</span>
                  ${isAnswered ? `<span class="feedback-badge ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✓ 答對了！' : '✗ 答錯了，請看解析'}</span>` : ''}
                </div>
                <div class="question-body">
                  <p class="question-text">${escapeHtml(q.question).replace(/\\n/g, '<br>')}</p>
                  <div class="question-options">
                    ${(q.options || []).map((opt, optIdx) => {
                      const optLabel = ['(A)', '(B)', '(C)', '(D)'][optIdx] || `(${optIdx + 1})`;
                      let optClass = 'option-btn';
                      if (isAnswered) {
                        if (optIdx === q.answer) optClass += ' option-correct';
                        else if (optIdx === selectedOpt) optClass += ' option-wrong';
                      }
                      return `
                        <button type="button" class="${optClass}" data-qid="${answerKey}" data-opt="${optIdx}">
                          <span class="opt-label">${optLabel}</span>
                          <span class="opt-text">${escapeHtml(opt)}</span>
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- Explanation Box (revealed after answer or always in print) -->
                <div class="question-explanation-box ${isAnswered ? 'revealed' : ''}">
                  <div class="explanation-title">
                    <span>💡 標準詳解與思考路徑</span>
                  </div>
                  <p class="explanation-text">${escapeHtml(q.solution).replace(/\\n/g, '<br>')}</p>
                  ${q.thinkingTrap ? `
                    <div class="thinking-trap-alert">
                      <span class="trap-icon">⚠️</span>
                      <div>
                        <strong>考場思維盲點陷阱防呆：</strong>
                        <span>${escapeHtml(q.thinkingTrap)}</span>
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- SECTION 3: PITFALL DEFENSE ALERTS -->
      <section class="periodic-section">
        <div class="section-badge-title">
          <span class="section-icon">🛡️</span>
          <h3>【段考考前防踩坑警報】常見扣分盲點與避坑防呆策略</h3>
        </div>
        <div class="pitfalls-list">
          ${(subjectData.pitfallAlerts || []).map(pitfall => `
            <div class="pitfall-card">
              <div class="pitfall-header">
                <span class="pitfall-tag">💣 致命失分地雷</span>
                <h4>${escapeHtml(pitfall.title)}</h4>
              </div>
              <div class="pitfall-warning">
                <strong>🚨 學生常犯迷思：</strong>
                <p>${escapeHtml(pitfall.warning)}</p>
              </div>
              <div class="pitfall-fix">
                <strong>🛡️ 考場破坑防呆對策：</strong>
                <p>${escapeHtml(pitfall.fixStrategy)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 4: COMPETENCY SCENARIO -->
      ${subjectData.competencyScenario ? `
        <section class="periodic-section">
          <div class="section-badge-title">
            <span class="section-icon">🚀</span>
            <h3>【跨領域素養導向情境題實戰】高階思辨與生活實踐</h3>
          </div>
          <div class="competency-scenario-card">
            <div class="scenario-head">
              <span class="scenario-pill">素養實戰挑戰</span>
              <h4>${escapeHtml(subjectData.competencyScenario.title)}</h4>
            </div>
            <div class="scenario-context">
              <strong>📖 生活與科學真實情境：</strong>
              <p>${escapeHtml(subjectData.competencyScenario.context)}</p>
            </div>
            <div class="scenario-challenge">
              <strong>🎯 核心素養任務挑戰：</strong>
              <p>${escapeHtml(subjectData.competencyScenario.challenge)}</p>
            </div>
            <div class="scenario-analysis">
              <strong>💡 滿分示範剖析與模型建構：</strong>
              <p>${escapeHtml(subjectData.competencyScenario.analysis).replace(/\\n/g, '<br>')}</p>
            </div>
          </div>
        </section>
      ` : ''}

      <!-- SECTION 5: 48-HOUR COUNTDOWN CHECKLIST -->
      <section class="periodic-section no-print">
        <div class="section-badge-title">
          <span class="section-icon">📋</span>
          <h3>【考前 48 小時高分衝刺檢核清單】自我回想與精熟確認</h3>
        </div>
        <div class="checklist-card">
          <p class="checklist-guide-text">
            考前黃金 48 小時，請蓋住課本，逐條檢視自己是否能清楚說出或默寫出下列關鍵點。每確認一項即點擊打勾，系統會自動儲存您的複習進度！
          </p>
          <div class="checklist-items-grid">
            ${(subjectData.countdownChecklist || []).map((item, idx) => {
              const checkKey = `${examId}-${activeSubject}-${idx}`;
              const isChecked = !!checklistState[checkKey];
              return `
                <label class="checklist-item-row ${isChecked ? 'checked' : ''}" data-ckey="${checkKey}">
                  <input type="checkbox" class="checklist-checkbox" data-ckey="${checkKey}" ${isChecked ? 'checked' : ''} />
                  <span class="checkmark-box">${isChecked ? '✓' : ''}</span>
                  <span class="checklist-text">${escapeHtml(item)}</span>
                </label>
              `;
            }).join('')}
          </div>
          <div class="checklist-actions-row">
            <button type="button" class="button small secondary" id="btn-check-all">全部標記為已精通</button>
            <button type="button" class="button small ghost" id="btn-clear-checks">清除本單元檢核標記</button>
          </div>
        </div>
      </section>

      <!-- PRINT-ONLY FOOTER -->
      <div class="print-footer-only">
        <div style="border-top:1px dashed #666;padding-top:8px;margin-top:16px;font-size:9pt;display:flex;justify-content:space-between;color:#555;">
          <span>知行學院 108 課綱段考預備講義 · https://www.tcool.cc/</span>
          <span>第 ____ 頁 / 共 ____ 頁</span>
          <span>複習完成打卡：[   ] 日期：____/____</span>
        </div>
      </div>
    </div>
  `;

  // Wire event handlers
  wirePeriodicEvents(container);
}

function wirePeriodicEvents(container) {
  // Grade Switcher
  container.querySelectorAll('[data-grade]').forEach(btn => {
    btn.onclick = () => {
      activeGrade = parseInt(btn.dataset.grade, 10);
      renderPeriodicExamsPage(container);
    };
  });

  // Term Switcher
  container.querySelectorAll('[data-term]').forEach(btn => {
    btn.onclick = () => {
      activeTerm = parseInt(btn.dataset.term, 10);
      renderPeriodicExamsPage(container);
    };
  });

  // Exam Number Switcher
  container.querySelectorAll('[data-exam]').forEach(btn => {
    btn.onclick = () => {
      activeExamNum = parseInt(btn.dataset.exam, 10);
      renderPeriodicExamsPage(container);
    };
  });

  // Subject Switcher
  container.querySelectorAll('[data-subject]').forEach(btn => {
    btn.onclick = () => {
      activeSubject = btn.dataset.subject;
      renderPeriodicExamsPage(container);
    };
  });

  // Print button
  const printBtn = container.querySelector('#btn-print-handout');
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }

  // Search filter input
  const searchInput = container.querySelector('#periodic-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      filterKnowledgeCards(container, searchQuery);
    };
  }

  // Interactive Question Option Click
  container.querySelectorAll('.option-btn').forEach(btn => {
    btn.onclick = () => {
      const qid = btn.dataset.qid;
      const optIdx = parseInt(btn.dataset.opt, 10);
      const answersState = loadAnswersState();
      answersState[qid] = optIdx;
      saveAnswersState(answersState);
      renderPeriodicExamsPage(container);
    };
  });

  // Interactive Checklist Checkbox Click
  container.querySelectorAll('.checklist-checkbox').forEach(cb => {
    cb.onchange = () => {
      const key = cb.dataset.ckey;
      const checklistState = loadChecklistState();
      checklistState[key] = cb.checked;
      saveChecklistState(checklistState);
      renderPeriodicExamsPage(container);
    };
  });

  // Check All / Clear Checks
  const checkAllBtn = container.querySelector('#btn-check-all');
  if (checkAllBtn) {
    checkAllBtn.onclick = () => {
      const checklistState = loadChecklistState();
      container.querySelectorAll('.checklist-checkbox').forEach(cb => {
        checklistState[cb.dataset.ckey] = true;
      });
      saveChecklistState(checklistState);
      renderPeriodicExamsPage(container);
    };
  }

  const clearChecksBtn = container.querySelector('#btn-clear-checks');
  if (clearChecksBtn) {
    clearChecksBtn.onclick = () => {
      const checklistState = loadChecklistState();
      container.querySelectorAll('.checklist-checkbox').forEach(cb => {
        delete checklistState[cb.dataset.ckey];
      });
      saveChecklistState(checklistState);
      renderPeriodicExamsPage(container);
    };
  }
}

function filterKnowledgeCards(container, query) {
  const q = query.trim().toLowerCase();
  const cards = container.querySelectorAll('.knowledge-card, .periodic-question-card, .pitfall-card');
  if (!q) {
    cards.forEach(c => c.style.display = '');
    return;
  }
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(q)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}
