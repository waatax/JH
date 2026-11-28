const filters = document.querySelector('#note-filters');

if (filters) {
  const query = filters.elements.query;
  const subject = filters.elements.subject;
  const term = filters.elements.term;
  const kind = filters.elements.kind;
  const groups = Array.from(document.querySelectorAll('.group'));
  const rows = Array.from(document.querySelectorAll('.list-row'));
  const count = document.querySelector('#note-count');
  const empty = document.querySelector('#no-notes');
  const fields = [query, subject, term, kind];
  const params = new URLSearchParams(location.search);

  for (const field of fields) {
    const value = params.get(field.name);
    if (value && (field === query || Array.from(field.options).some(option => option.value === value))) {
      field.value = value;
    }
  }

  function filterNotes() {
    const words = query.value.normalize('NFKC').trim().toLowerCase().split(/\s+/).filter(Boolean);
    let matched = 0;
    for (const row of rows) {
      const data = row.dataset;
      const matches = (!subject.value || data.subject === subject.value)
        && (!term.value || data.term === term.value)
        && (!kind.value || data.kind === kind.value)
        && words.every(word => data.search.includes(word));
      row.hidden = !matches;
      matched += Number(matches);
    }
    for (const group of groups) {
      group.hidden = !group.querySelector('.list-row:not([hidden])');
      group.open = Boolean(words.length || subject.value || term.value || kind.value) || group === groups[0];
    }
    count.textContent = `${matched} 章符合條件`;
    empty.hidden = matched !== 0;
    const next = new URLSearchParams(location.search);
    for (const field of fields) {
      if (field.value.trim()) next.set(field.name, field.value.trim());
      else next.delete(field.name);
    }
    const search = next.toString();
    const url = `${location.pathname}${search ? `?${search}` : ''}${location.hash}`;
    if (url !== `${location.pathname}${location.search}${location.hash}` && location.protocol !== 'file:') {
      history.replaceState(history.state, '', url);
    }
  }

  filters.addEventListener('submit', event => event.preventDefault());
  filters.addEventListener('input', filterNotes);
  filters.addEventListener('reset', () => {
    setTimeout(() => {
      filterNotes();
      query.focus();
    });
  });
  filters.hidden = false;
  filterNotes();
}

const answers = document.querySelector('.answer-panel');
const print = document.querySelector('#print-note');
if (print && answers) {
  let wasOpen;
  print.hidden = false;
  print.addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', () => {
    wasOpen = answers.open;
    answers.open = true;
  });
  window.addEventListener('afterprint', () => {
    answers.open = wasOpen;
  });
}
