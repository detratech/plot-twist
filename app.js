'use strict';

const STORAGE_KEY = 'plotTwistStateV4';
const DECK_VERSION = 'masterpiece-200-v1';
const defaultState = {
  deckVersion: DECK_VERSION,
  mode: null,
  order: [],
  position: 0,
  revealed: false,
  saved: [],
  selectedCategories: ['all'],
  runCategories: ['all'],
  settings: {
    keepAwake: false,
    hostPrompts: false
  }
};

let state = loadState();
let deferredInstallPrompt = null;
let wakeLock = null;
let chaosReturnFocus = null;

const screens = {
  home: document.getElementById('homeScreen'),
  game: document.getElementById('gameScreen'),
  how: document.getElementById('howScreen'),
  settings: document.getElementById('settingsScreen'),
  saved: document.getElementById('savedScreen'),
  complete: document.getElementById('completeScreen')
};

const el = {
  cardTitle: document.getElementById('cardTitle'),
  scenarioText: document.getElementById('scenarioText'),
  scenarioBullets: document.getElementById('scenarioBullets'),
  scenarioChoices: document.getElementById('scenarioChoices'),
  mainPrompt: document.getElementById('mainPrompt'),
  revealButton: document.getElementById('revealButton'),
  twistPanel: document.getElementById('twistPanel'),
  twistText: document.getElementById('twistText'),
  conclusionBox: document.getElementById('conclusionBox'),
  conclusionText: document.getElementById('conclusionText'),
  afterPrompt: document.getElementById('afterPrompt'),
  conversationPaths: document.getElementById('conversationPaths'),
  conversationPathList: document.getElementById('conversationPathList'),
  nextButton: document.getElementById('nextButton'),
  chaosButton: document.getElementById('chaosButton'),
  modeLabel: document.getElementById('modeLabel'),
  saveButton: document.getElementById('saveButton'),
  savedCount: document.getElementById('savedCount'),
  savedList: document.getElementById('savedList'),
  host1: document.getElementById('hostPromptStage1'),
  host2: document.getElementById('hostPromptStage2'),
  wakeToggle: document.getElementById('wakeToggle'),
  hostToggle: document.getElementById('hostToggle'),
  wakeSupportText: document.getElementById('wakeSupportText'),
  offlineStatus: document.getElementById('offlineStatus'),
  installButton: document.getElementById('installButton'),
  resumeButton: document.getElementById('resumeButton'),
  categorySummary: document.getElementById('categorySummary'),
  chaosModal: document.getElementById('chaosModal'),
  chaosName: document.getElementById('chaosName'),
  chaosText: document.getElementById('chaosText')
};

function validCategoryIds() {
  return GAME_CATEGORIES.map(category => category.id);
}

function normalizeSelectedCategories(value) {
  if (!Array.isArray(value)) return ['all'];
  if (value.includes('all')) return ['all'];

  const valid = new Set(validCategoryIds());
  const cleaned = [...new Set(value.filter(id => valid.has(id)))];
  return cleaned.length ? cleaned : ['all'];
}

function normalizeCardIds(value) {
  if (!Array.isArray(value)) return [];
  const valid = new Set(PLOT_TWIST_CARDS.map(card => card.id));
  return [...new Set(value.filter(id => valid.has(id)))];
}

function normalizeSettings(value) {
  return {
    keepAwake: value?.keepAwake === true,
    hostPrompts: value?.hostPrompts === true
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || typeof parsed !== 'object') return structuredCloneCompat(defaultState);

    const preservedSettings = normalizeSettings(parsed.settings);
    const preservedCategories = normalizeSelectedCategories(parsed.selectedCategories);
    const preservedRunCategories = normalizeSelectedCategories(parsed.runCategories || parsed.selectedCategories);
    const validSaved = normalizeCardIds(parsed.saved);

    if (parsed.deckVersion !== DECK_VERSION) {
      return {
        ...structuredCloneCompat(defaultState),
        settings: preservedSettings,
        selectedCategories: preservedCategories,
        runCategories: preservedCategories,
        saved: validSaved
      };
    }

    const order = normalizeCardIds(parsed.order);
    const mode = ['main', 'random', 'saved'].includes(parsed.mode) && order.length ? parsed.mode : null;
    const rawPosition = Number.isInteger(parsed.position) ? parsed.position : 0;
    const position = Math.min(Math.max(rawPosition, 0), order.length);

    return {
      deckVersion: DECK_VERSION,
      mode,
      order: mode ? order : [],
      position: mode ? position : 0,
      revealed: mode && position < order.length && parsed.revealed === true,
      saved: validSaved,
      selectedCategories: preservedCategories,
      runCategories: mode ? preservedRunCategories : preservedCategories,
      settings: preservedSettings
    };
  } catch {
    return structuredCloneCompat(defaultState);
  }
}

function structuredCloneCompat(value) {
  return JSON.parse(JSON.stringify(value));
}

function persist() {
  state.deckVersion = DECK_VERSION;
  state.selectedCategories = normalizeSelectedCategories(state.selectedCategories);
  state.runCategories = normalizeSelectedCategories(state.runCategories);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Keep the in-memory game usable if storage is blocked or unavailable.
  }
  updateSavedCount();
}

function shuffled(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function cardById(id) {
  return PLOT_TWIST_CARDS.find(card => card.id === id);
}

function currentCard() {
  return cardById(state.order[state.position]);
}

function categoryObjectsFor(value) {
  const selected = normalizeSelectedCategories(value);
  if (selected.includes('all')) return [];
  return GAME_CATEGORIES.filter(category => selected.includes(category.id));
}

function selectedCategoryObjects() {
  return categoryObjectsFor(state.selectedCategories);
}

function eligibleCards(selectedValue = state.selectedCategories) {
  const selected = normalizeSelectedCategories(selectedValue);
  if (selected.includes('all')) return [...PLOT_TWIST_CARDS];

  const filtered = PLOT_TWIST_CARDS.filter(card =>
    (card.categories || []).some(categoryId => selected.includes(categoryId))
  );

  return filtered.length ? filtered : [...PLOT_TWIST_CARDS];
}

function selectionModeLabel() {
  const categories = categoryObjectsFor(state.runCategories);
  if (!categories.length) return 'MIXED';
  if (categories.length === 1) return categories[0].label.toUpperCase();
  return 'CUSTOM MIX';
}

function renderCategoryPicker() {
  const selected = normalizeSelectedCategories(state.selectedCategories);
  document.querySelectorAll('[data-category]').forEach(button => {
    const active = selected.includes(button.dataset.category);
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  if (!el.categorySummary) return;

  const categories = selectedCategoryObjects();
  el.categorySummary.textContent = categories.length
    ? `Mixing: ${categories.map(category => category.label).join(' + ')}.`
    : 'Everything is in the mix.';
}

function toggleCategory(categoryId) {
  if (categoryId === 'all') {
    state.selectedCategories = ['all'];
  } else {
    const current = normalizeSelectedCategories(state.selectedCategories).filter(id => id !== 'all');
    const exists = current.includes(categoryId);
    state.selectedCategories = exists
      ? current.filter(id => id !== categoryId)
      : [...current, categoryId];

    if (!state.selectedCategories.length) state.selectedCategories = ['all'];
  }

  persist();
  renderCategoryPicker();
}

function showScreen(name) {
  if (!screens[name]) return;
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
  if (name === 'settings') syncSettingsUI();
  if (name === 'saved') renderSavedList();
  if (name === 'home') {
    updateResumeButton();
    renderCategoryPicker();
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function updateResumeButton() {
  const canResume = Boolean(state.mode && state.order.length && currentCard());
  el.resumeButton.hidden = !canResume;
}

function resumeGame() {
  if (!state.mode || !state.order.length || !currentCard()) return;
  renderCard();
  showScreen('game');
}

function beginGame(mode) {
  state.mode = mode;
  state.position = 0;
  state.revealed = false;

  if (mode === 'saved') {
    state.order = [...state.saved];
  } else {
    state.runCategories = normalizeSelectedCategories(state.selectedCategories);
    state.order = shuffled(eligibleCards(state.runCategories).map(card => card.id));
  }

  if (!state.order.length) {
    state.mode = null;
    showScreen('home');
    return;
  }

  persist();
  renderCard();
  showScreen('game');
}

function restartRun() {
  if (state.mode === 'saved') {
    beginGame('saved');
    return;
  }

  state.selectedCategories = normalizeSelectedCategories(state.runCategories);
  beginGame(state.mode === 'random' ? 'random' : 'main');
}

function renderParagraphs(container, paragraphs) {
  container.innerHTML = '';
  (paragraphs || []).forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    container.appendChild(p);
  });
}

function renderConversationPaths(card) {
  const paths = (card.hostPrompts || []).filter(Boolean).slice(0, 3);
  el.conversationPathList.innerHTML = '';

  if (!paths.length) {
    el.conversationPaths.hidden = true;
    return;
  }

  paths.forEach(text => {
    const p = document.createElement('p');
    p.textContent = `→ ${text}`;
    p.style.margin = '8px 0 0';
    p.style.lineHeight = '1.45';
    el.conversationPathList.appendChild(p);
  });

  el.conversationPaths.hidden = false;
}

function renderCard() {
  const card = currentCard();
  if (!card) {
    showScreen('complete');
    return;
  }

  el.cardTitle.textContent = card.title;
  renderParagraphs(el.scenarioText, card.scenario);
  el.mainPrompt.textContent = card.prompt;
  renderParagraphs(el.twistText, card.twist);

  if (card.conclusion) {
    el.conclusionText.textContent = card.conclusion;
    el.conclusionBox.hidden = false;
  } else {
    el.conclusionText.textContent = '';
    el.conclusionBox.hidden = true;
  }

  el.afterPrompt.textContent = card.afterPrompt || 'What does the twist change?';
  renderConversationPaths(card);

  el.scenarioBullets.innerHTML = '';
  if (card.bullets?.length) {
    const ul = document.createElement('ul');
    card.bullets.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    el.scenarioBullets.appendChild(ul);
    el.scenarioBullets.hidden = false;
  } else {
    el.scenarioBullets.hidden = true;
  }

  el.scenarioChoices.innerHTML = '';
  if (card.choices?.length) {
    card.choices.forEach(item => {
      const span = document.createElement('span');
      span.className = 'choice-pill';
      span.textContent = item;
      el.scenarioChoices.appendChild(span);
    });
    el.scenarioChoices.hidden = false;
  } else {
    el.scenarioChoices.hidden = true;
  }

  el.modeLabel.textContent = state.mode === 'saved'
    ? 'SAVED'
    : state.mode === 'random'
      ? `RANDOM · ${selectionModeLabel()}`
      : `GAME · ${selectionModeLabel()}`;

  setRevealState(state.revealed, false);
  updateSaveButton(card.id);
  renderHostPrompts(card);
  persist();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function setRevealState(revealed, animate = true) {
  state.revealed = revealed;
  el.revealButton.hidden = revealed;
  el.twistPanel.hidden = !revealed;
  if (revealed && !animate) el.twistPanel.style.animation = 'none';
  else el.twistPanel.style.animation = '';
  persist();
}

function renderHostPrompts(card) {
  const enabled = state.settings.hostPrompts && card.hostPrompts?.length;
  el.host1.hidden = !enabled;
  el.host2.hidden = !enabled;
  if (enabled) {
    el.host1.textContent = card.hostPrompts[0] || 'Ask: Why?';
    el.host2.textContent = card.hostPrompts[1] || 'Ask: What does the twist change?';
  }
}

function nextCard() {
  if (state.position >= state.order.length - 1) {
    state.position = state.order.length;
    state.revealed = false;
    persist();
    showScreen('complete');
    return;
  }
  state.position += 1;
  state.revealed = false;
  persist();
  renderCard();
}

function toggleSave() {
  const card = currentCard();
  if (!card) return;
  const index = state.saved.indexOf(card.id);
  if (index >= 0) state.saved.splice(index, 1);
  else state.saved.push(card.id);
  persist();
  updateSaveButton(card.id);
}

function updateSaveButton(cardId) {
  const saved = state.saved.includes(cardId);
  el.saveButton.classList.toggle('saved', saved);
  el.saveButton.setAttribute('aria-pressed', String(saved));
  el.saveButton.textContent = saved ? '★ SAVED' : '☆ SAVE';
}

function updateSavedCount() {
  el.savedCount.textContent = state.saved.length;
}

function renderSavedList() {
  el.savedList.innerHTML = '';
  if (!state.saved.length) {
    const empty = document.createElement('p');
    empty.className = 'saved-empty';
    empty.textContent = 'No saved cards yet. Tap ☆ SAVE on any card you want to revisit.';
    el.savedList.appendChild(empty);
    return;
  }

  state.saved.map(cardById).filter(Boolean).forEach(card => {
    const button = document.createElement('button');
    button.className = 'saved-item';
    button.textContent = card.title;
    button.addEventListener('click', () => {
      state.mode = 'saved';
      state.order = [...state.saved];
      state.position = state.order.indexOf(card.id);
      state.revealed = false;
      persist();
      renderCard();
      showScreen('game');
    });
    el.savedList.appendChild(button);
  });

  const play = document.createElement('button');
  play.className = 'btn btn-primary';
  play.textContent = 'PLAY SAVED CARDS';
  play.style.marginTop = '10px';
  play.addEventListener('click', () => beginGame('saved'));
  el.savedList.appendChild(play);
}

function showChaos() {
  const item = CHAOS_MODIFIERS[Math.floor(Math.random() * CHAOS_MODIFIERS.length)];
  if (!item) return;
  chaosReturnFocus = document.activeElement;
  el.chaosName.textContent = item.name;
  el.chaosText.textContent = item.text;
  el.chaosModal.hidden = false;
  requestAnimationFrame(() => document.getElementById('closeChaos').focus());
}

function closeChaos() {
  el.chaosModal.hidden = true;
  if (chaosReturnFocus && typeof chaosReturnFocus.focus === 'function') chaosReturnFocus.focus();
  chaosReturnFocus = null;
}

function applySettings() {
  syncSettingsUI();
  renderHostPrompts(currentCard() || {});
  if (state.settings.keepAwake) requestWakeLock();
  else releaseWakeLock();
}

function syncSettingsUI() {
  el.wakeToggle.checked = state.settings.keepAwake;
  el.hostToggle.checked = state.settings.hostPrompts;
  if (!('wakeLock' in navigator)) {
    el.wakeToggle.disabled = true;
    el.wakeSupportText.textContent = 'Not supported by this browser';
  }
}

async function requestWakeLock() {
  if (wakeLock || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => { wakeLock = null; });
  } catch {
    wakeLock = null;
  }
}

async function releaseWakeLock() {
  if (!wakeLock) return;
  try { await wakeLock.release(); } catch {}
  wakeLock = null;
}

function resetGameData() {
  if (!window.confirm('Reset the current game, saved cards, topic choices, and settings?')) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  state = structuredCloneCompat(defaultState);
  applySettings();
  persist();
  renderCategoryPicker();
  showScreen('home');
}

async function waitForWorkerActivation(registration) {
  const worker = registration.installing || registration.waiting;
  if (!worker || worker.state === 'activated') return;
  if (worker.state === 'redundant') throw new Error('Service worker update became redundant');

  await new Promise((resolve, reject) => {
    const handleState = () => {
      if (worker.state === 'activated') resolve();
      if (worker.state === 'redundant') reject(new Error('Service worker update failed'));
    };
    worker.addEventListener('statechange', handleState);
    handleState();
  });
}

document.addEventListener('click', event => {
  const categoryButton = event.target.closest('[data-category]');
  if (categoryButton) {
    toggleCategory(categoryButton.dataset.category);
    return;
  }

  const screenButton = event.target.closest('[data-screen]');
  if (screenButton) showScreen(screenButton.dataset.screen);

  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === 'resume') resumeGame();
  if (action === 'start') beginGame('main');
  if (action === 'random') beginGame('random');
  if (action === 'restart') restartRun();
});

el.revealButton.addEventListener('click', () => {
  setRevealState(true, true);
  setTimeout(() => el.twistPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
});
el.nextButton.addEventListener('click', nextCard);
el.saveButton.addEventListener('click', toggleSave);
el.chaosButton.addEventListener('click', showChaos);
document.getElementById('closeChaos').addEventListener('click', closeChaos);
el.chaosModal.addEventListener('click', event => { if (event.target === el.chaosModal) closeChaos(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !el.chaosModal.hidden) closeChaos();
});
document.getElementById('resetButton').addEventListener('click', resetGameData);

el.wakeToggle.addEventListener('change', () => { state.settings.keepAwake = el.wakeToggle.checked; persist(); applySettings(); });
el.hostToggle.addEventListener('change', () => { state.settings.hostPrompts = el.hostToggle.checked; persist(); renderHostPrompts(currentCard() || {}); });

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && state.settings.keepAwake) requestWakeLock();
});

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  el.installButton.hidden = false;
});

el.installButton.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  el.installButton.hidden = true;
});

window.addEventListener('appinstalled', () => {
  el.installButton.hidden = true;
  deferredInstallPrompt = null;
});

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');
      try {
        await registration.update();
        await waitForWorkerActivation(registration);
      } catch (error) {
        if (navigator.onLine || !registration.active) throw error;
      }
      await navigator.serviceWorker.ready;
      el.offlineStatus.textContent = 'Offline cache ready';
    } catch {
      el.offlineStatus.textContent = 'Offline cache could not start';
    }
  });
} else if (location.protocol === 'file:') {
  el.offlineStatus.textContent = 'Local file mode · PWA install unavailable';
} else {
  el.offlineStatus.textContent = 'Offline cache unsupported in this browser';
}

const params = new URLSearchParams(location.search);
const requestedMode = params.get('mode');
applySettings();
updateSavedCount();
renderCategoryPicker();

if (requestedMode === 'random') {
  beginGame('random');
} else if (state.mode && state.order.length && currentCard()) {
  renderCard();
  showScreen('game');
} else {
  showScreen('home');
}