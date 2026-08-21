'use strict';

(() => {
  const cardTitle = document.getElementById('cardTitle');
  const afterPrompt = document.getElementById('afterPrompt');
  const choiceWrap = document.getElementById('scenarioChoices');
  if (!cardTitle || !afterPrompt || !choiceWrap || typeof HISTORICAL_EXAMPLES !== 'object') return;

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

  function enhanceChoices() {
    choiceWrap.querySelectorAll('.choice-pill').forEach(choice => {
      if (choice.dataset.enhanced === 'true') return;

      const raw = choice.textContent.trim();
      const separator = raw.indexOf(' — ');
      const choiceLabel = separator >= 0 ? raw.slice(0, separator).trim() : raw;
      const reason = separator >= 0 ? raw.slice(separator + 3).trim() : '';

      choice.textContent = '';

      const strong = document.createElement('strong');
      strong.textContent = choiceLabel;
      choice.appendChild(strong);

      if (reason) {
        const small = document.createElement('small');
        small.textContent = reason;
        choice.appendChild(small);
      }

      choice.dataset.enhanced = 'true';
    });
  }

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
  new MutationObserver(enhanceChoices).observe(choiceWrap, { childList: true });

  enhanceChoices();
  renderHistoricalExample();
})();
