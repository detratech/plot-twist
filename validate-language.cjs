'use strict';

const fs = require('fs');
const vm = require('vm');

const DECK_FILES = [
  'deck-a.js', 'deck-b.js', 'deck-c.js', 'deck-d.js',
  'deck-e.js', 'deck-f.js', 'deck-g.js', 'deck-h.js'
];
const HISTORY_FILES = ['history-a.js', 'history-b.js', 'history-c.js', 'history-d.js', 'history-reviewed.js'];

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function words(text) {
  return String(text || '').trim().split(/\s+/).filter(Boolean);
}

function sentences(text) {
  return String(text || '').split(/(?<=[.!?])\s+/).map(item => item.trim()).filter(Boolean);
}

function wordCount(text) {
  return words(text).length;
}

const context = {};
vm.createContext(context);
vm.runInContext(read('cards.js'), context, { filename: 'cards.js' });
for (const file of DECK_FILES) vm.runInContext(read(file), context, { filename: file });
for (const file of HISTORY_FILES) vm.runInContext(read(file), context, { filename: file });
vm.runInContext(read('categories.js'), context, { filename: 'categories.js' });
vm.runInContext(read('language-polish.js'), context, { filename: 'language-polish.js' });
vm.runInContext(read('after-answers.js'), context, { filename: 'after-answers.js' });
vm.runInContext('globalThis.__cards = PLOT_TWIST_CARDS; globalThis.__history = HISTORICAL_EXAMPLES; globalThis.__answers = AFTER_ANSWERS;', context);

const cards = context.__cards;
const history = context.__history;
const answers = context.__answers;
const problems = [];

const JARGON = [
  /\bepistem(?:ic|ically)\b/i,
  /\bprovenance\b/i,
  /\bcorroborat(?:e|es|ion|ing)\b/i,
  /\bfalsifi(?:able|ability)\b/i,
  /\buniversalization\b/i,
  /\bnormative\b/i,
  /\bmethodolog(?:y|ies)\b/i,
  /\bcommensurate\b/i,
  /\bnotwithstanding\b/i,
  /\bproposition(?:s)?\b/i,
  /\bpremise(?:s)?\b/i,
  /\bcausal inference\b/i,
  /\bempirical\b/i,
  /\bsubstantive\b/i,
  /\butili[sz](?:e|es|ed|ing)\b/i
];

function checkJargon(text, location) {
  for (const pattern of JARGON) {
    const match = String(text || '').match(pattern);
    if (match) problems.push(`${location}: formal/jargon word “${match[0]}”`);
  }
}

function checkSentenceLength(text, location, limit) {
  for (const sentence of sentences(text)) {
    const count = wordCount(sentence);
    if (count > limit) problems.push(`${location}: ${count}-word sentence (limit ${limit})`);
  }
}

for (const card of cards) {
  const fields = {
    prompt: card.prompt,
    conclusion: card.conclusion,
    afterPrompt: card.afterPrompt,
    ...Object.fromEntries((card.choices || []).map((text, index) => [`choice${index + 1}`, text])),
    ...Object.fromEntries((card.hostPrompts || []).map((text, index) => [`extra${index + 1}`, text]))
  };

  for (const [name, value] of Object.entries(fields)) {
    checkJargon(value, `card ${card.id} ${name}`);
    checkSentenceLength(value, `card ${card.id} ${name}`, name === 'conclusion' ? 30 : 26);
  }

  (card.scenario || []).forEach((text, index) => {
    checkJargon(text, `card ${card.id} scenario ${index + 1}`);
    checkSentenceLength(text, `card ${card.id} scenario ${index + 1}`, 34);
  });

  (card.twist || []).forEach((text, index) => {
    checkJargon(text, `card ${card.id} twist ${index + 1}`);
    checkSentenceLength(text, `card ${card.id} twist ${index + 1}`, 34);
  });

  if (wordCount(card.prompt) > 24) problems.push(`card ${card.id} prompt: ${wordCount(card.prompt)} words (limit 24)`);
  if (wordCount(card.afterPrompt) > 28) problems.push(`card ${card.id} afterPrompt: ${wordCount(card.afterPrompt)} words (limit 28)`);
  for (const [index, choice] of (card.choices || []).entries()) {
    if (wordCount(choice) > 18) problems.push(`card ${card.id} choice ${index + 1}: ${wordCount(choice)} words (limit 18)`);
  }
}

for (const [id, example] of Object.entries(history)) {
  checkJargon(example.title, `example ${id} title`);
  checkJargon(example.text, `example ${id} text`);
  checkSentenceLength(example.text, `example ${id} text`, 38);
}

for (const [id, answer] of Object.entries(answers)) {
  checkJargon(answer, `direct answer ${id}`);
  checkSentenceLength(answer, `direct answer ${id}`, 34);
  if (wordCount(answer) > 40) problems.push(`direct answer ${id}: ${wordCount(answer)} words (limit 40)`);
}

const shellFiles = ['index.html', 'cards.js', 'consistency-ui.js'];
for (const file of shellFiles) {
  const text = read(file);
  checkJargon(text, file);
}

if (problems.length) {
  console.error(`FAIL: ${problems.length} plain-language issue(s) found.`);
  problems.slice(0, 120).forEach(problem => console.error(`- ${problem}`));
  if (problems.length > 120) console.error(`- ...and ${problems.length - 120} more`);
  process.exit(1);
}

console.log('PASS: player-facing card language and all 200 direct answers avoid the formal/jargon terms covered by the v6.4 plain-language gate.');
console.log('PASS: prompts, choices, conclusions, follow-ups, direct answers, scenarios, twists, and real-world examples stay within conversational sentence-length limits.');
