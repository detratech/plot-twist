'use strict';

(() => {
  const PHRASE_SWAPS = [
    [/\bepistemically humble\b/gi, "honest about what we don't know"],
    [/\bepistemic humility\b/gi, "being honest about what we don't know"],
    [/\bepistemic\b/gi, 'about what we know'],
    [/\bprovenance\b/gi, 'where it came from'],
    [/\bcorroboration\b/gi, 'cross-checking'],
    [/\bcorroborate\b/gi, 'cross-check'],
    [/\bindependently checkable\b/gi, 'something other people can actually check'],
    [/\brational basis\b/gi, 'good reason'],
    [/\bprovisional\b/gi, 'for now'],
    [/\bprovisionally\b/gi, 'for now'],
    [/\bfalsifiability\b/gi, 'what could prove it wrong'],
    [/\bfalsifiable\b/gi, 'possible to prove wrong'],
    [/\buniversalization\b/gi, 'using the same rule for everyone'],
    [/\baggregate\b/gi, 'overall'],
    [/\binference\b/gi, 'conclusion'],
    [/\binferences\b/gi, 'conclusions'],
    [/\bcoherent\b/gi, 'makes sense'],
    [/\bframework\b/gi, 'way of thinking'],
    [/\bframeworks\b/gi, 'ways of thinking'],
    [/\bproposition\b/gi, 'claim'],
    [/\bpropositions\b/gi, 'claims'],
    [/\bpremise\b/gi, 'starting claim'],
    [/\bpremises\b/gi, 'starting claims'],
    [/\bunderlying mechanism\b/gi, 'what actually caused it'],
    [/\bmechanism\b/gi, 'cause'],
    [/\bmechanisms\b/gi, 'causes'],
    [/\bcausal mechanism\b/gi, 'what caused it'],
    [/\bcausal inference\b/gi, 'figuring out what caused what'],
    [/\bempirical\b/gi, 'real-world'],
    [/\bnormative\b/gi, 'about what should happen'],
    [/\bsubstantive\b/gi, 'real'],
    [/\bcredible\b/gi, 'believable'],
    [/\bcredibility\b/gi, 'trust'],
    [/\boptimal\b/gi, 'best'],
    [/\butilize\b/gi, 'use'],
    [/\butilizes\b/gi, 'uses'],
    [/\bcommence\b/gi, 'start'],
    [/\bprioritize\b/gi, 'put first'],
    [/\bprioritizes\b/gi, 'puts first'],
    [/\bprioritized\b/gi, 'put first'],
    [/\bmitigate\b/gi, 'reduce'],
    [/\bmitigates\b/gi, 'reduces'],
    [/\bmitigating\b/gi, 'reducing'],
    [/\bconsequently\b/gi, 'so'],
    [/\bnevertheless\b/gi, 'still'],
    [/\bfurthermore\b/gi, 'also'],
    [/\btherefore\b/gi, 'so'],
    [/\bthus\b/gi, 'so'],
    [/\binherently\b/gi, 'by itself'],
    [/\bmerely\b/gi, 'just'],
    [/\bpertinent\b/gi, 'relevant'],
    [/\bdisproportionately\b/gi, 'much more'],
    [/\bsubsequently\b/gi, 'later'],
    [/\bapproximately\b/gi, 'about'],
    [/\bcommensurate\b/gi, 'in line'],
    [/\bnotwithstanding\b/gi, 'despite'],
    [/\bmethodology\b/gi, 'method'],
    [/\bmethodologies\b/gi, 'methods'],
    [/\bdemonstrates\b/gi, 'shows'],
    [/\bdemonstrate\b/gi, 'show'],
    [/\billustrates\b/gi, 'shows'],
    [/\billustrate\b/gi, 'show'],
    [/\bindicates\b/gi, 'shows'],
    [/\bindicate\b/gi, 'show'],
    [/\bconstitutes\b/gi, 'is'],
    [/\bconstitute\b/gi, 'are'],
    [/\bobtain\b/gi, 'get'],
    [/\bobtains\b/gi, 'gets'],
    [/\bretain\b/gi, 'keep'],
    [/\bretains\b/gi, 'keeps'],
    [/\bsubsequent\b/gi, 'later'],
    [/\bprior to\b/gi, 'before'],
    [/\bin order to\b/gi, 'to'],
    [/\bwith regard to\b/gi, 'about'],
    [/\bwith respect to\b/gi, 'about'],
    [/\bdue to the fact that\b/gi, 'because'],
    [/\bin the event that\b/gi, 'if'],
    [/\ba majority of\b/gi, 'most'],
    [/\ba number of\b/gi, 'several'],
    [/\bthe available evidence\b/gi, 'the facts you have'],
    [/\bpresent reality\b/gi, "what's true right now"],
    [/\bautomatic truth\b/gi, 'always right'],
    [/\bautomatic authority\b/gi, 'always right'],
    [/\bpersonally meaningful\b/gi, 'meaningful to you'],
    [/\boutside the experience\b/gi, 'outside what you felt'],
    [/\bwhat can be checked outside the experience\b/gi, 'what other people can actually check'],
    [/\bdoes not become less true because\b/gi, "doesn't stop being true just because"],
    [/\bis not simply\b/gi, "isn't just"],
    [/\bare not simply\b/gi, "aren't just"],
    [/\bcannot be allowed to\b/gi, "shouldn't"],
    [/\bcan not be allowed to\b/gi, "shouldn't"],
    [/\bdo not know for certain\b/gi, "aren't completely sure"],
    [/\bwe do not know for certain\b/gi, "we aren't completely sure"],
    [/\bwe know nothing\b/gi, "we have no idea"],
    [/\bthe strongest authority\b/gi, 'the expert to trust most'],
    [/\bthe right move is not to\b/gi, "you don't have to"],
    [/\bwhen claims conflict\b/gi, 'when two stories clash'],
    [/\bwhen competing claims conflict\b/gi, 'when two stories clash'],
    [/\bmeaningful new information\b/gi, 'new information that actually matters'],
    [/\bdecision-relevant\b/gi, 'important to the decision'],
    [/\bfull-strength signals\b/gi, 'feel everything fully'],
    [/\bsource before improvisation\b/gi, 'follow the official instructions'],
    [/\bsurvival may contain wisdom\b/gi, 'old rules may exist for a reason'],
    [/\btradition has to earn authority\b/gi, 'old rules still need a reason'],
    [/\bkeep the explanation open to correction\b/gi, 'be ready to change your explanation'],
    [/\buse evidence suited to the claim\b/gi, 'use the kind of evidence that actually fits the question'],
    [/\breliable history comes from\b/gi, 'to trust a story about the past, look at'],
    [/\btechnically deeper description\b/gi, 'more technical explanation'],
    [/\bhigher-level one\b/gi, 'everyday one']
  ];

  const CARD_OVERRIDES = {
    1: {
      prompt: 'Would you turn down painful emotions if the rest of you stayed the same?',
      choices: ['TURN THEM DOWN — life feels easier', 'KEEP THEM — feel everything fully'],
      conclusion: 'Feeling good and living well are not always the same thing. Pain can be awful, but it can also warn you that something needs to change.',
      afterPrompt: 'Which bad feelings are just noise, and which ones are trying to tell you something?'
    },
    2: {
      prompt: 'Do you open it now, or enjoy one more peaceful day?',
      choices: ['OPEN IT — face whatever is inside', 'WAIT — deal with it tomorrow'],
      conclusion: "Something doesn't stop being true just because the truth is inconvenient. If a big decision depends on it, avoiding the truth can cost more than facing it.",
      afterPrompt: 'When is waiting to hear the truth reasonable, and when is it just avoidance?'
    },
    3: {
      conclusion: 'Your feelings matter, and measurements matter. The trick is knowing what each one can actually tell you and whether the measurement itself can be trusted.',
      afterPrompt: 'When do people jump from “this feels true” or “the number says so” to a bigger conclusion that has not actually been proven?'
    },
    4: {
      conclusion: 'Experience and technology can both help, but neither is always right. When new facts show up, change your mind toward whatever best fits what is happening now.'
    },
    5: {
      prompt: 'Which should carry more weight when making claims about the outside world?',
      choices: ['THE EXPERIENCE — lots of people felt the same thing', 'THE TEST — other people can check it too'],
      conclusion: 'A powerful experience can matter a lot to you without proving every explanation attached to it. If two people have equally strong experiences but reach opposite answers, you need another way to check what is actually true.',
      afterPrompt: 'What can a personal experience tell you for sure, and what still needs to be checked another way?'
    },
    6: {
      scenario: [
        'Engineers find a sealed black box controlling backup power in a hospital wing. Nobody fully understands it, but their best model says flipping Switch B has a 70% chance of stabilizing the system.',
        "You have thirty minutes before the wing loses power. Saying “we're not totally sure” does not help the ICU very much."
      ],
      choices: ['ACT — use the best guess you have', 'WAIT — do not gamble with ICU power'],
      conclusion: "Not being completely sure does not mean you have no idea. Sometimes you still have to act. The key is to use the best evidence you have and stay ready to change your explanation if better facts show up.",
      afterPrompt: 'When does “we are not sure” become an excuse to avoid making a decision?'
    },
    9: {
      conclusion: 'You should not ignore instructions just because you have experience. But you also should not follow one line blindly when better context or an official correction changes what it means.',
      afterPrompt: 'What would be a good enough reason to stop following the written instructions?'
    },
    10: {
      conclusion: 'You can know things about the past without being there yourself. But memories and documents can both be wrong. Check where the information came from, whether the sources are independent, and whether different kinds of evidence agree.',
      afterPrompt: 'When do several sources really make a case stronger, and when are they all repeating the same mistake?'
    },
    11: {
      conclusion: 'The technical cause and the everyday problem can both be real at the same time. Use the explanation that actually helps answer the question you are trying to solve.',
      afterPrompt: 'When do people use a technical explanation to dodge the bigger everyday problem?'
    },
    12: {
      prompt: 'Until you can check, do you keep the old rule or stop following it?',
      choices: ['KEEP IT FOR NOW — it may exist for a reason', 'DROP IT FOR NOW — old rules still need a reason'],
      conclusion: 'Old does not mean wrong, and familiar does not mean true. A tradition deserves a fair look instead of automatic obedience or automatic rejection.',
      afterPrompt: 'What belief or rule did you grow up with that you have never really stopped to question?'
    }
  };

  function cleanText(value) {
    if (typeof value !== 'string') return value;
    let result = value;
    for (const [pattern, replacement] of PHRASE_SWAPS) result = result.replace(pattern, replacement);
    return result
      .replace(/\s+([,.;!?])/g, '$1')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  function cleanValue(value) {
    if (Array.isArray(value)) return value.map(cleanValue);
    return cleanText(value);
  }

  function polishCard(card) {
    for (const field of ['title', 'scenario', 'prompt', 'choices', 'twist', 'conclusion', 'afterPrompt', 'hostPrompts']) {
      if (field in card) card[field] = cleanValue(card[field]);
    }

    const override = CARD_OVERRIDES[card.id];
    if (!override) return;
    Object.entries(override).forEach(([field, value]) => {
      card[field] = cleanValue(value);
    });
  }

  if (Array.isArray(PLOT_TWIST_CARDS)) PLOT_TWIST_CARDS.forEach(polishCard);

  if (typeof HISTORICAL_EXAMPLES === 'object' && HISTORICAL_EXAMPLES) {
    Object.values(HISTORICAL_EXAMPLES).forEach(example => {
      if (!example || typeof example !== 'object') return;
      if ('title' in example) example.title = cleanText(example.title);
      if ('text' in example) example.text = cleanText(example.text);
    });
  }
})();
