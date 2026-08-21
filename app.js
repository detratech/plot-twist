'use strict';

const STORAGE_KEY = 'plotTwistStateV4';
const DECK_VERSION = 'masterpiece-100-v1';
const defaultState = {
  deckVersion: DECK_VERSION,
  mode: null,
  order: [],
  position: 0,
  revealed: false,
  saved: [],
  settings: {
    keepAwake: false,
    hostPrompts: false
  }
};

let state = loadState();
let deferredInstallPrompt = null;
let wakeLock = null;

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
  chaosModal: document.getElementById('chaosModal'),
  chaosName: document.getElementById('chaosName'),
  chaosText: document.getElementById('chaosText')
};

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed) return structuredCloneCompat(defaultState);

    const preservedSettings = { ...defaultState.settings, ...(parsed.settings || {}) };
    const validSaved = Array.isArray(parsed.saved)
      ? parsed.saved.filter(id => PLOT_TWIST_CARDS.some(card => card.id === id))
      : [];

    if (parsed.deckVersion !== DECK_VERSION) {
      return {
        ...structuredCloneCompat(defaultState),
        settings: preservedSettings,
        saved: validSaved
      };
    }

    return {
      ...structuredCloneCompat(defaultState),
      ...parsed,
      deckVersion: DECK_VERSION,
      settings: preservedSettings,
      saved: validSaved,
      order: Array.isArray(parsed.order)
        ? parsed.order.filter(id => PLOT_TWIST_CARDS.some(card => card.id === id))
        : []
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
  if (name === 'settings') syncSettingsUI();
  if (name === 'saved') renderSavedList();
  if (name === 'home') updateResumeButton();
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
  const ids = PLOT_TWIST_CARDS.map(card => card.id);
  state.mode = mode;
  state.position = 0;
  state.revealed = false;

  if (mode === 'saved') {
    state.order = [...state.saved];
  } else {
    state.order = shuffled(ids);
  }

  if (!state.order.length) {
    showScreen('home');
    return;
  }

  persist();
  renderCard();
  showScreen('game');
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
      ? 'RANDOM'
      : 'GAME';

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
  el.chaosName.textContent = item.name;
  el.chaosText.textContent = item.text;
  el.chaosModal.hidden = false;
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
  if (!('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
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
  if (!window.confirm('Reset the current game, saved cards, and settings?')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = structuredCloneCompat(defaultState);
  applySettings();
  persist();
  showScreen('home');
}

document.addEventListener('click', event => {
  const screenButton = event.target.closest('[data-screen]');
  if (screenButton) showScreen(screenButton.dataset.screen);

  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === 'resume') resumeGame();
  if (action === 'start') beginGame('main');
  if (action === 'random') beginGame('random');
});

el.revealButton.addEventListener('click', () => {
  setRevealState(true, true);
  setTimeout(() => el.twistPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
});
el.nextButton.addEventListener('click', nextCard);
el.saveButton.addEventListener('click', toggleSave);
el.chaosButton.addEventListener('click', showChaos);
document.getElementById('closeChaos').addEventListener('click', () => { el.chaosModal.hidden = true; });
el.chaosModal.addEventListener('click', event => { if (event.target === el.chaosModal) el.chaosModal.hidden = true; });
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
      await navigator.serviceWorker.register('./sw.js');
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

if (requestedMode === 'random') {
  beginGame('random');
} else if (state.mode && state.order.length && currentCard()) {
  renderCard();
  showScreen('game');
} else {
  showScreen('home');
}
