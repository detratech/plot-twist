'use strict';

const fs = require('fs');
const vm = require('vm');

const DECK_FILES = [
  'deck-a.js', 'deck-b.js', 'deck-c.js', 'deck-d.js',
  'deck-e.js', 'deck-f.js', 'deck-g.js', 'deck-h.js'
];
const HISTORY_FILES = ['history-a.js', 'history-b.js', 'history-c.js', 'history-d.js', 'history-reviewed.js'];
const REQUIRED_FIELDS = [
  'id', 'title', 'vibe', 'scenario', 'prompt', 'choices',
  'twist', 'conclusion', 'afterPrompt', 'hostPrompts'
];
const CATEGORY_IDS = new Set(['mind', 'relationships', 'money', 'tech', 'society', 'life']);

const FORBIDDEN_RUNTIME_TERMS = [
  /\bislam(?:ic)?\b/i,
  /\bmuslim(?:s)?\b/i,
  /\ballah\b/i,
  /\bqur[’'a]*an\b/i,
  /\bhadith\b/i,
  /\bhindu(?:ism|s)?\b/i,
  /\bchrist(?:ian|ianity)?\b/i,
  /\bjew(?:s|ish|ishness)?\b/i,
  /\bbible\b/i,
  /\btorah\b/i,
  /\bgod(?:s|dess|desses)?\b/i,
  /\bdeit(?:y|ies)\b/i,
  /\brevelation\b/i,
  /\bscripture(?:s)?\b/i,
  /\batheis(?:m|t|ts)\b/i,
  /\btheolog(?:y|ical|ian|ians)\b/i,
  /\bphilosoph(?:y|ical|er|ers)\b/i,
  /\bapologetics?\b/i,
  /\bdawah\b/i,
  /\breligion(?:s|ous)?\b/i,
  /\bprophet(?:s|ic)?\b/i,
  /\bsharia\b/i,
  /\bhijab\b/i
];

const FORBIDDEN_META_LEAKS = [
  /\bruntime\b/i,
  /\bauthoring\b/i,
  /\bsource[- ]worldview\b/i,
  /\bmeta[- ]instructions?\b/i,
  /\bhidden (?:instruction|prompt|rule)s?\b/i,
  /\bmust not include\b/i,
  /\buser[- ]facing\b/i,
  /\bprompt instructions?\b/i,
  /\bforbidden (?:word|term|phrase)s?\b/i
];

const LOADED_CHOICE_TERMS = [
  /\bobviously\b/i,
  /\bstupid\b/i,
  /\bdumb\b/i,
  /\bnonsense\b/i,
  /\bidiot(?:ic)?\b/i,
  /\bbrain[- ]?dead\b/i,
  /\bclown answer\b/i
];

function fail(message) {
  throw new Error(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function wordCount(text) {
  const normalized = normalize(text);
  return normalized ? normalized.split(/\s+/).length : 0;
}

function assertNoForbiddenRuntimeTerms(text, location) {
  for (const pattern of FORBIDDEN_RUNTIME_TERMS) {
    const match = text.match(pattern);
    if (match) fail(`Forbidden runtime term "${match[0]}" found in ${location}.`);
  }
}

function assertNoMetaLeaks(text, location) {
  for (const pattern of FORBIDDEN_META_LEAKS) {
    const match = text.match(pattern);
    if (match) fail(`Authoring/meta-instruction leak "${match[0]}" found in ${location}.`);
  }
}

const context = {};
vm.createContext(context);
vm.runInContext(read('cards.js'), context, { filename: 'cards.js' });
for (const file of DECK_FILES) vm.runInContext(read(file), context, { filename: file });
for (const file of HISTORY_FILES) vm.runInContext(read(file), context, { filename: file });
vm.runInContext(
  read('categories.js') + '\nglobalThis.__cards = PLOT_TWIST_CARDS; globalThis.__categories = GAME_CATEGORIES; globalThis.__history = HISTORICAL_EXAMPLES;',
  context,
  { filename: 'categories.js' }
);

const cards = context.__cards;
const categories = context.__categories;
const historicalExamples = context.__history;

if (!Array.isArray(cards)) fail('PLOT_TWIST_CARDS did not load as an array.');
if (cards.length !== 200) fail(`Expected 200 cards, found ${cards.length}.`);

const ids = cards.map(card => card.id);
if (new Set(ids).size !== 200) fail('Card IDs are not unique.');
for (let expected = 1; expected <= 200; expected += 1) {
  if (!ids.includes(expected)) fail(`Missing internal card ID ${expected}.`);
}

const titles = new Set();
const scenarioKeys = new Set();
for (const card of cards) {
  for (const field of REQUIRED_FIELDS) {
    if (!(field in card)) fail(`Card ${card.id} is missing ${field}.`);
  }

  if (typeof card.title !== 'string' || !card.title.trim()) fail(`Card ${card.id} has an empty title.`);
  const titleKey = normalize(card.title);
  if (titles.has(titleKey)) fail(`Duplicate title: ${card.title}`);
  titles.add(titleKey);

  if (!Array.isArray(card.scenario) || card.scenario.length !== 2 || card.scenario.some(x => typeof x !== 'string' || !x.trim())) {
    fail(`Card ${card.id} must have exactly two non-empty scenario paragraphs.`);
  }
  if (!Array.isArray(card.choices) || card.choices.length !== 2 || card.choices.some(x => typeof x !== 'string' || !x.trim())) {
    fail(`Card ${card.id} must have exactly two answer choices.`);
  }
  if (normalize(card.choices[0]) === normalize(card.choices[1])) fail(`Card ${card.id} has duplicate answer choices.`);
  if (card.choices.some(choice => /\bit depends\b/i.test(choice))) fail(`Card ${card.id} contains an "it depends" escape choice.`);
  if (card.choices.some(choice => wordCount(choice) < 2)) fail(`Card ${card.id} has an answer choice too vague to state a clear side.`);

  for (const choice of card.choices) {
    for (const pattern of LOADED_CHOICE_TERMS) {
      const match = choice.match(pattern);
      if (match) fail(`Loaded choice wording "${match[0]}" found in card ${card.id}.`);
    }
  }

  if (typeof card.prompt !== 'string' || !card.prompt.trim().endsWith('?')) fail(`Card ${card.id} main prompt must be a question.`);
  if (!Array.isArray(card.twist) || card.twist.length < 1 || card.twist.some(x => typeof x !== 'string' || !x.trim())) {
    fail(`Card ${card.id} must have a non-empty Plot Twist.`);
  }
  if (wordCount(card.twist.join(' ')) < 12) fail(`Card ${card.id} Plot Twist is too thin to introduce meaningful new information.`);
  if (normalize(card.twist.join(' ')) === normalize(card.scenario.join(' '))) fail(`Card ${card.id} Plot Twist merely repeats the scenario.`);
  if (typeof card.conclusion !== 'string' || !card.conclusion.trim()) fail(`Card ${card.id} must have a declarative conclusion.`);
  if (typeof card.afterPrompt !== 'string' || !card.afterPrompt.trim().endsWith('?')) fail(`Card ${card.id} afterPrompt must be a question.`);
  if (!Array.isArray(card.hostPrompts) || card.hostPrompts.length !== 2 || card.hostPrompts.some(x => typeof x !== 'string' || !x.trim())) {
    fail(`Card ${card.id} must have exactly two non-empty conversation paths.`);
  }
  if (!Array.isArray(card.categories) || card.categories.length < 1 || card.categories.length > 2 || card.categories.some(id => !CATEGORY_IDS.has(id))) {
    fail(`Card ${card.id} has invalid category tags: ${JSON.stringify(card.categories)}.`);
  }

  const scenarioKey = normalize(card.scenario.join(' '));
  if (scenarioKeys.has(scenarioKey)) fail(`Duplicate scenario detected at card ${card.id}.`);
  scenarioKeys.add(scenarioKey);

  const runtimeText = [
    card.title,
    ...card.scenario,
    card.prompt,
    ...card.choices,
    ...card.twist,
    card.conclusion,
    card.afterPrompt,
    ...card.hostPrompts
  ].join('\n');
  assertNoForbiddenRuntimeTerms(runtimeText, `card ${card.id}`);
  assertNoMetaLeaks(runtimeText, `card ${card.id}`);
}

if (!historicalExamples || typeof historicalExamples !== 'object' || Array.isArray(historicalExamples)) {
  fail('HISTORICAL_EXAMPLES did not load as an object.');
}
const historyIds = Object.keys(historicalExamples).map(Number).sort((a, b) => a - b);
if (historyIds.length !== 200) fail(`Expected 200 historical examples, found ${historyIds.length}.`);
for (let expected = 1; expected <= 200; expected += 1) {
  if (!historyIds.includes(expected)) fail(`Missing historical example for card ${expected}.`);
  const example = historicalExamples[expected];
  if (!example || typeof example !== 'object') fail(`Historical example ${expected} is invalid.`);
  if (typeof example.title !== 'string' || wordCount(example.title) < 2) fail(`Historical example ${expected} needs a substantive title.`);
  if (typeof example.text !== 'string' || wordCount(example.text) < 20) fail(`Historical example ${expected} is too thin; expected at least 20 words.`);
  const exampleText = `${example.title}\n${example.text}`;
  assertNoForbiddenRuntimeTerms(exampleText, `historical example ${expected}`);
  assertNoMetaLeaks(exampleText, `historical example ${expected}`);
}

if (!Array.isArray(categories) || categories.length !== 6) {
  fail(`Expected six selectable categories, found ${Array.isArray(categories) ? categories.length : 'invalid data'}.`);
}

const index = read('index.html');
const sw = read('sw.js');
const app = read('app.js');
const manifest = read('manifest.webmanifest');
const choiceUi = read('choice-ui.js');
const historyUi = read('history-ui.js');
const consistencyUi = read('consistency-ui.js');
const languagePolish = read('language-polish.js');
const gameCss = read('game-v6.2.css');
const consistencyCss = read('game-v6.3.css');
const runtimeStatic = [index, app, manifest, choiceUi, historyUi, consistencyUi].join('\n');
const runtimeFiles = [
  ...DECK_FILES,
  ...HISTORY_FILES,
  'game-v6.2.css',
  'game-v6.3.css',
  'language-polish.js',
  'choice-ui.js',
  'history-ui.js',
  'consistency-ui.js'
];

for (const file of [...DECK_FILES, ...HISTORY_FILES]) {
  if (!index.includes(`<script src="${file}"></script>`)) fail(`index.html does not load ${file}.`);
}
if (!index.includes('<link rel="stylesheet" href="game-v6.2.css">')) fail('index.html does not load game-v6.2.css.');
if (!index.includes('<link rel="stylesheet" href="game-v6.3.css">')) fail('index.html does not load game-v6.3.css.');
if (!index.includes('<script src="language-polish.js"></script>')) fail('index.html does not load language-polish.js.');
if (!index.includes('<script src="choice-ui.js"></script>')) fail('index.html does not load choice-ui.js.');
if (!index.includes('<script src="history-ui.js"></script>')) fail('index.html does not load history-ui.js.');
if (!index.includes('<script src="consistency-ui.js"></script>')) fail('index.html does not load consistency-ui.js.');
if (!(index.indexOf('<script src="categories.js"></script>') < index.indexOf('<script src="language-polish.js"></script>') &&
      index.indexOf('<script src="language-polish.js"></script>') < index.indexOf('<script src="app.js"></script>'))) {
  fail('language-polish.js must load after categories.js and before app.js.');
}
for (const file of runtimeFiles) {
  if (!sw.includes(`'./${file}'`)) fail(`sw.js does not precache ${file}.`);
}

if (!sw.includes("plot-twist-v6.4.1")) fail('Service-worker cache is not plot-twist-v6.4.1.');
if (!index.includes('<b>App Version</b>') || !index.includes('<strong>v6.4.1</strong>')) fail('Settings does not display app version v6.4.1.');
if (!app.includes("masterpiece-200-v1")) fail('App deck version is not masterpiece-200-v1.');
if (/\b(?:card|scenario)\s*#?\d+\b/i.test(index)) fail('Visible card/scenario numbering pattern found in index.html.');
if (!index.includes('Both choices are meant to be reasonable.')) fail('How to Play does not state the two-sided dilemma rule in plain language.');
if (!index.includes('changing your mind is completely fair.')) fail('How to Play does not say that changing sides after the twist is allowed.');
if (!index.includes('<b>Real-World Example</b>')) fail('How to Play does not explain the Real-World Example step.');
if (!index.includes('<b>One Last Thing</b>')) fail('How to Play does not explain One Last Thing.');
if (!index.includes('gives the short answer to that question')) fail('How to Play does not explain that One Last Thing answers the preceding question.');
if (!index.includes('<b>Keep Talking</b>')) fail('How to Play does not explain the extra-question step.');

if (!historyUi.includes("label.textContent = 'REAL-WORLD EXAMPLE'")) fail('Historical example UI label is missing.');
if (!historyUi.includes("afterPrompt.insertAdjacentElement('afterend', box)")) fail('Historical example is not inserted immediately after the post-Point question.');
if (!choiceUi.includes("raw.indexOf(' — ')")) fail('Choice UI does not split the decision label from its reason.');
if (!choiceUi.includes("document.createElement('strong')") || !choiceUi.includes("document.createElement('small')")) {
  fail('Choice UI does not render a prominent decision label plus secondary reason.');
}
if (!gameCss.includes('grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)')) fail('Choice UI is not locked to two side-by-side columns.');
if (!gameCss.includes('.choice-wrap::before')) fail('Choice UI is missing the center divider.');
if (!gameCss.includes("content: 'VS'")) fail('Choice UI is missing the VS marker.');

// One Last Thing now closes the preceding question instead of introducing a generic consistency test.
if (!consistencyUi.includes("label.textContent = 'ONE LAST THING'")) fail('One Last Thing label is missing.');
if (!consistencyUi.includes("heading.textContent = 'THE SHORT ANSWER'")) fail('One Last Thing does not present itself as the short answer.');
if (!consistencyUi.includes('function shortAnswer(card)')) fail('One Last Thing is missing the card-specific answer builder.');
if (!consistencyUi.includes('sentences(card.conclusion)')) fail('One Last Thing answer is not derived from the current card conclusion.');
if (!consistencyUi.includes("historyBox.insertAdjacentElement('afterend', box)")) fail('One Last Thing is not placed after the Real-World Example.');
if (consistencyUi.includes('const TESTS = [')) fail('Old generic One Last Thing question bank is still present.');
if (consistencyUi.includes('(current.id - 1) % TESTS.length')) fail('One Last Thing still cycles unrelated prompts by card ID.');
if (!consistencyCss.includes('.consistency-check')) fail('One Last Thing styling is missing.');
if (!languagePolish.includes('const PHRASE_SWAPS') || !languagePolish.includes('const CARD_OVERRIDES')) {
  fail('Plain-language polish layer is missing its phrase and card overrides.');
}

assertNoForbiddenRuntimeTerms(runtimeStatic, 'runtime shell');
assertNoMetaLeaks(runtimeStatic, 'runtime shell');

const distribution = {};
for (const id of CATEGORY_IDS) distribution[id] = 0;
for (const card of cards) {
  for (const id of card.categories) distribution[id] += 1;
}
for (const [id, count] of Object.entries(distribution)) {
  if (count < 15) fail(`Category "${id}" has only ${count} cards; expected at least 15.`);
}

console.log(`PASS: ${cards.length} unique scenarios loaded.`);
console.log('PASS: internal IDs 1-200 are unique and complete.');
console.log('PASS: every card has two scenario paragraphs, two distinct choices, a substantive Plot Twist, The Point, and three follow-up/conversation directions total.');
console.log('PASS: no "it depends" answer escape choices or obviously insulting choice labels.');
console.log('PASS: all cards have one or two valid selectable categories.');
console.log('PASS: exactly 200 substantive real-world examples map one-to-one to the 200 cards.');
console.log('PASS: prohibited explicit worldview terms and authoring/meta-instruction leaks were not found in cards, historical examples, or runtime shell text.');
console.log('PASS: all deck, history, presentation, and plain-language assets are loaded and precached.');
console.log('PASS: the post-Point question is followed by the Real-World Example and a One Last Thing short answer.');
console.log('PASS: One Last Thing derives its answer from the current card rather than an unrelated generic question bank.');
console.log('PASS: the two answer choices remain locked to the prominent left-vs-right layout with a divider, large decision label, and secondary reason.');
console.log('PASS: the player-facing rules use plain language, keep both choices reasonable, and allow changing sides after the twist.');
console.log('PASS: settings visibly reports app version v6.4.1.');
console.log('PASS: deck version masterpiece-200-v1 and cache plot-twist-v6.4.1 are wired.');
console.log('Category memberships:', distribution);
