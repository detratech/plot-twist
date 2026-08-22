'use strict';

(() => {
  const choiceWrap = document.getElementById('scenarioChoices');
  if (!choiceWrap) return;

  function enhanceChoices() {
    choiceWrap.querySelectorAll('.choice-pill').forEach(choice => {
      if (choice.dataset.enhanced === 'true') return;

      const raw = choice.textContent.trim();
      const separator = raw.indexOf(' — ');
      const label = separator >= 0 ? raw.slice(0, separator).trim() : raw;
      const reason = separator >= 0 ? raw.slice(separator + 3).trim() : '';

      choice.textContent = '';

      const strong = document.createElement('strong');
      strong.textContent = label;
      choice.appendChild(strong);

      if (reason) {
        const small = document.createElement('small');
        small.textContent = reason;
        choice.appendChild(small);
      }

      choice.dataset.enhanced = 'true';
    });
  }

  new MutationObserver(enhanceChoices).observe(choiceWrap, { childList: true });
  enhanceChoices();
})();
