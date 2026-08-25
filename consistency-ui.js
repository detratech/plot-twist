'use strict';

(() => {
  const cardTitle = document.getElementById('cardTitle');
  const historyBox = document.querySelector('.history-example');
  if (!cardTitle || !historyBox || !Array.isArray(PLOT_TWIST_CARDS)) return;

  const TESTS = [
    {
      title: 'SAME RULE?',
      text: 'If the people switched places, would you still use the same rule?'
    },
    {
      title: 'WHAT WOULD CHANGE YOUR MIND?',
      text: 'What new fact would actually make you switch sides? If the answer is “nothing,” why?'
    },
    {
      title: 'WHAT IF YOU HATED THE RESULT?',
      text: 'Would you still back this rule if it gave you an outcome you really did not like?'
    },
    {
      title: 'WHAT IF THEY WERE STRANGERS?',
      text: 'If you did not know who these people were, would you answer the same way?'
    },
    {
      title: 'WOULD YOU LET EVERYONE USE IT?',
      text: 'Would you be okay with everyone using this rule, even people you strongly disagree with?'
    },
    {
      title: 'WHAT IF IT WAS YOU?',
      text: 'If someone used this exact rule on you, would it still feel fair?'
    },
    {
      title: 'WHAT IF THE POWER FLIPPED?',
      text: 'If the weaker side became the stronger side tomorrow, should the rule stay the same?'
    },
    {
      title: 'SAME RULE SOMEWHERE ELSE?',
      text: 'Would you use this same rule with family, money, work, and strangers? If not, what is different?'
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
