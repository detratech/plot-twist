'use strict';

(() => {
  const cardTitle = document.getElementById('cardTitle');
  const historyBox = document.querySelector('.history-example');
  if (!cardTitle || !historyBox || !Array.isArray(PLOT_TWIST_CARDS)) return;

  const TESTS = [
    {
      title: 'SAME RULE?',
      text: 'If the people on each side swapped places, would you still defend the rule you just used?'
    },
    {
      title: 'WHAT WOULD CHANGE YOUR MIND?',
      text: 'Name one new fact that would genuinely make you switch. If nothing could, what is your answer resting on?'
    },
    {
      title: 'OUTCOME TEST',
      text: 'Would you keep the same principle if it produced an outcome you personally disliked?'
    },
    {
      title: 'STRANGER TEST',
      text: 'If you knew nothing about the people involved except what they did, would your answer stay the same?'
    },
    {
      title: 'EVERYONE GETS IT',
      text: 'Would you accept everyone using this rule, including people you strongly disagree with?'
    },
    {
      title: 'YOUR TURN',
      text: 'If somebody judged your own behaviour by this exact standard, would you call it fair?'
    },
    {
      title: 'POWER FLIP',
      text: 'If the weaker side became the stronger side tomorrow, should the same rule still apply?'
    },
    {
      title: 'CROSSOVER',
      text: 'Would you use this same rule in family, money, work, and public life, or does it change by domain?'
    }
  ];

  const box = document.createElement('section');
  box.className = 'consistency-check';
  box.hidden = true;
  box.setAttribute('aria-live', 'polite');

  const label = document.createElement('p');
  label.className = 'eyebrow';
  label.textContent = 'ONE LAST THING';

  const heading = document.createElement('h3');
  const text = document.createElement('p');

  box.append(label, heading, text);
  historyBox.insertAdjacentElement('afterend', box);

  function renderConsistencyCheck() {
    const current = PLOT_TWIST_CARDS.find(card => card.title === cardTitle.textContent);
    if (!current) {
      heading.textContent = '';
      text.textContent = '';
      box.hidden = true;
      return;
    }

    const test = TESTS[(current.id - 1) % TESTS.length];
    heading.textContent = test.title;
    text.textContent = test.text;
    box.hidden = false;
  }

  new MutationObserver(renderConsistencyCheck).observe(cardTitle, {
    childList: true,
    characterData: true,
    subtree: true
  });

  renderConsistencyCheck();
})();
