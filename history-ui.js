'use strict';

(() => {
  const cardTitle = document.getElementById('cardTitle');
  const afterPrompt = document.getElementById('afterPrompt');
  if (!cardTitle || !afterPrompt || typeof HISTORICAL_EXAMPLES !== 'object') return;

  const box = document.createElement('section');
  box.className = 'history-example';
  box.hidden = true;
  box.setAttribute('aria-live', 'polite');

  const label = document.createElement('p');
  label.className = 'eyebrow';
  label.textContent = 'REAL-WORLD EXAMPLE';

  const heading = document.createElement('h3');
  const text = document.createElement('p');

  box.append(label, heading, text);
  afterPrompt.insertAdjacentElement('afterend', box);

  function renderHistoricalExample() {
    const current = PLOT_TWIST_CARDS.find(card => card.title === cardTitle.textContent);
    const example = current ? HISTORICAL_EXAMPLES[current.id] : null;

    if (!example) {
      heading.textContent = '';
      text.textContent = '';
      box.hidden = true;
      return;
    }

    heading.textContent = example.title;
    text.textContent = example.text;
    box.hidden = false;
  }

  new MutationObserver(renderHistoricalExample).observe(cardTitle, {
    childList: true,
    characterData: true,
    subtree: true
  });

  renderHistoricalExample();
})();