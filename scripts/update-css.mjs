// scripts/update-css.mjs
import fs from 'node:fs';

const filePath = 'dist/style.css';
let css = fs.readFileSync(filePath, 'utf8');
const target = '.row-highlight-defense { background: rgba(196,130,26,0.08); }';

if (!css.includes(target)) {
  console.error('Target not found in dist/style.css');
  process.exit(1);
}

const addition = `
/* 108 Curriculum Knowledge Visual Flow Chart & Diagrams */
.teaching-visual-chart {
  margin: 1.25rem 0 1.5rem;
  padding: 1.2rem;
  border-radius: 12px;
  background: var(--surface-alt, #f8fafc);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.teaching-chart-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
.teaching-chart-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}
.teaching-chart-domain-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(53, 98, 80, 0.12);
  color: #275240;
}
.teaching-chart-step-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(79, 70, 229, 0.1);
  color: #4338ca;
}
.teaching-chart-title {
  margin: 0.2rem 0 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text, #1e293b);
}
.teaching-flow-grid {
  display: flex;
  align-items: stretch;
  gap: 0.6rem;
}
.flow-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.85rem;
  border-radius: 10px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.flow-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.flow-card-core { border-top: 3px solid #10b981; }
.flow-card-rule { border-top: 3px solid #3b82f6; }
.flow-card-pitfall { border-top: 3px solid #f59e0b; }
.flow-card-task { border-top: 3px solid #8b5cf6; }
.flow-card-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.45rem;
  color: var(--text-muted, #64748b);
}
.flow-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}
.flow-card-title {
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text, #1e293b);
  line-height: 1.35;
}
.flow-card-text {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--text-muted, #475569);
  flex: 1;
}
.flow-connector {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted, #94a3b8);
  flex-shrink: 0;
}
.flow-arrow-svg { display: block; }

[data-theme="dark"] .teaching-visual-chart {
  background: #1e252b;
  border-color: #2d3748;
}
[data-theme="dark"] .flow-card {
  background: #171d22;
  border-color: #2d3748;
}
[data-theme="dark"] .teaching-chart-domain-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}
[data-theme="dark"] .teaching-chart-step-badge {
  background: rgba(129, 140, 248, 0.2);
  color: #a5b4fc;
}

[data-theme="paper"] .teaching-visual-chart {
  background: #f4ece1;
  border-color: #dfd4c5;
}
[data-theme="paper"] .flow-card {
  background: #fbf7f0;
  border-color: #dfd4c5;
}

@media (max-width: 768px) {
  .teaching-flow-grid {
    flex-direction: column;
    gap: 0.5rem;
  }
  .flow-connector {
    transform: rotate(90deg);
    padding: 0.25rem 0;
  }
}`;

css = css.replace(target, target + '\n' + addition);
fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully updated dist/style.css with teaching-visual-chart styles!');
