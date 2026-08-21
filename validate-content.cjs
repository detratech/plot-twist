'use strict';

const fs = require('fs');
const vm = require('vm');

const DECK_FILES = [
  'deck-a.js', 'deck-b.js', 'deck-c.js', 'deck-d.js',
  'deck-e.js', 'deck-f.js', 'deck-g.js', 'deck-h.js'
];

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

const context = {};
vm.createContext(context);

vm.runInContext(read('cards.js'), context, { filename: 'cards.js' });
for (const file of DECK_FILES) {
  vm.runInContext(read(file), context, { filename: file });
}
vm.runInContext(
  read('categories.js') + '\nglobalThis.__cards = PLOT_TWIST_CARDS; globalThis.__categories = GAME_CATEGORIES;',
  context,
  { filename: 'categories.js' }
);

const cards = context.__cards;
const categories = context.__categories;

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

  if (normalize(card.choices[0]) === normalize(card.choices[1])) {
    fail(`Card ${card.id} has duplicate answer choices.`);
  }

  if (card.choices.some(choice => /\bit depends\b/i.test(choice))) {
    fail(`Card ${card.id} contains an "it depends" escape choice.`);
  }

  if (typeof card.prompt !== 'string' || !card.prompt.trim().endsWith('?')) {
    fail(`Card ${card.id} main prompt must be a question.`);
  }

  if (!Array.isArray(card.twist) || card.twist.length < 1 || card.twist.some(x => typeof x !== 'string' || !x.trim())) {
    fail(`Card ${card.id} must have a non-empty Plot Twist.`);
  }

  if (typeof card.conclusion !== 'string' || !card.conclusion.trim()) {
    fail(`Card ${card.id} must have a declarative conclusion.`);
  }

  if (typeof card.afterPrompt !== 'string' || !card.afterPrompt.trim().endsWith('?')) {
    fail(`Card ${card.id} afterPrompt must be a question.`);
  }

  if (!Array.isArray(card.hostPrompts) || card.hostPrompts.length !== 2 ||
      card.hostPrompts.some(x => typeof x !== 'string' || !x.trim())) {
    fail(`Card ${card.id} must have exactly two non-empty conversation paths.`);
  }

  if (!Array.isArray(card.categories) || card.categories.length < 1 || card.categories.length > 2 ||
      card.categories.some(id => !CATEGORY_IDS.has(id))) {
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

  for (const pattern of FORBIDDEN_RUNTIME_TERMS) {
    const match = runtimeText.match(pattern);
    if (match) fail(`Forbidden runtime term "${match[0]}" found in card ${card.id}.`);
  }
}

if (!Array.isArray(categories) || categories.length !== 6) {
  fail(`Expected six selectable categories, found ${Array.isArray(categories) ? categories.length : 'invalid data'}.`);
}

const index = read('index.html');
const sw = read('sw.js');
const app = read('app.js');
const manifest = read('manifest.webmanifest');
const runtimeStatic = [index, app, manifest].join('\n');

for (const file of DECK_FILES) {
  if (!index.includes(`<script src="${file}"></script>`)) fail(`index.html does not load ${file}.`);
  if (!sw.includes(`'./${file}'`)) fail(`sw.js does not precache ${file}.`);
}

if (!sw.includes("plot-twist-v6.0.0")) fail('Service-worker cache is not plot-twist-v6.0.0.');
if (!app.includes("masterpiece-200-v1")) fail('App deck version is not masterpiece-200-v1.');
if (/\b(?:card|scenario)\s*#?\d+\b/i.test(index)) fail('Visible card/scenario numbering pattern found in index.html.');

for (const pattern of FORBIDDEN_RUNTIME_TERMS) {
  const match = runtimeStatic.match(pattern);
  if (match) fail(`Forbidden runtime term "${match[0]}" found in runtime shell.`);
}

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
console.log('PASS: every card has two scenario paragraphs, two distinct choices, a Plot Twist, The Point, and three follow-up/conversation directions total.');
console.log('PASS: no "it depends" answer escape choices.');
console.log('PASS: all cards have one or two valid selectable categories.');
console.log('PASS: prohibited explicit worldview terms were not found in card or runtime shell text.');
console.log('PASS: all eight deck files are loaded and precached.');
console.log('PASS: deck version masterpiece-200-v1 and cache plot-twist-v6.0.0 are wired.');
console.log('Category memberships:', distribution);
