'use strict';

(() => {
  const cardTitle = document.getElementById('cardTitle');
  const historyBox = document.querySelector('.history-example');
  const answers = globalThis.AFTER_ANSWERS;
  if (!cardTitle || !historyBox || !Array.isArray(PLOT_TWIST_CARDS) || !answers) return;

  const box = document.createElement('section');
  box.className = 'consistency-check';
  box.hidden = true;
  box.setAttribute('aria-live', 'polite');

  const label = document.createElement('p');
  label.className = 'eyebrow';
  label.textContent = 'ONE LAST THING';

  const heading = document.createElement('h3');
  heading.textContent = 'THE SHORT ANSWER';

  const text = document.createElement('p');

  box.append(label, heading, text);
  historyBox.insertAdjacentElement('afterend', box);

  function renderAnswer() {
    const current = PLOT_TWIST_CARDS.find(card => card.title === cardTitle.textContent);
    if (!current) {
      text.textContent = '';
      box.hidden = true;
      return;
    }

    const answer = answers[current.id];
    if (typeof answer !== 'string' || !answer.trim()) {
      text.textContent = '';
      box.hidden = true;
      return;
    }

    text.textContent = answer;
    box.hidden = false;
  }

  new MutationObserver(renderAnswer).observe(cardTitle, {
    childList: true,
    characterData: true,
    subtree: true
  });

  renderAnswer();
})();
