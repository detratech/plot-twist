'use strict';

const fs = require('fs');

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function unique(values) {
  return new Set(values).size === values.length;
}

const index = read('index.html');
const app = read('app.js');
const sw = read('sw.js');
const manifestText = read('manifest.webmanifest');
const historyUi = read('history-ui.js');
const choiceUi = read('choice-ui.js');
const consistencyUi = read('consistency-ui.js');
const workflow = read('.github/workflows/validate.yml');
const dependabot = read('.github/dependabot.yml');

const APP_VERSION = 'v6.3.1';
const CACHE_NAME = 'plot-twist-v6.3.1';

// Version / state compatibility contracts.
assert(index.includes(`<strong>${APP_VERSION}</strong>`), `Settings does not report ${APP_VERSION}.`);
assert(sw.includes(`const CACHE_NAME = '${CACHE_NAME}'`), `Service worker cache is not ${CACHE_NAME}.`);
assert(app.includes("const STORAGE_KEY = 'plotTwistStateV4'"), 'Stable localStorage key changed unexpectedly.');
assert(app.includes("const DECK_VERSION = 'masterpiece-200-v1'"), 'Stable deck/state identifier changed unexpectedly.');

// Service-worker cache isolation and reliability.
assert(sw.includes("const CACHE_PREFIX = 'plot-twist-'"), 'Service worker is missing a Plot Twist cache prefix.');
assert(/key\.startsWith\(CACHE_PREFIX\)\s*&&\s*key\s*!==\s*CACHE_NAME/.test(sw), 'Old-cache cleanup is not scoped to Plot Twist caches only.');
assert(!/keys\.filter\(key\s*=>\s*key\s*!==\s*CACHE_NAME\)/.test(sw), 'Service worker would delete unrelated origin caches.');
assert(sw.includes('requestUrl.origin !== self.location.origin'), 'Service worker does not reject cross-origin runtime caching.');
assert(sw.includes('!event.request.url.startsWith(self.registration.scope)'), 'Service worker does not restrict runtime caching to its own scope.');
assert(sw.includes('const cache = await caches.open(CACHE_NAME)'), 'Fetch handler does not use the named Plot Twist cache.');
assert(sw.includes('const cached = await cache.match(event.request)'), 'Fetch handler is not isolated to the current Plot Twist cache.');
assert(sw.includes('await cache.put(event.request, response.clone())'), 'Runtime cache writes are not awaited.');
assert(sw.includes('Response.error()'), 'Offline non-navigation failures do not return an explicit error response.');

const shellBlock = sw.match(/const APP_SHELL = \[([\s\S]*?)\];/);
assert(shellBlock, 'Could not parse APP_SHELL from sw.js.');
const shellAssets = [...shellBlock[1].matchAll(/'([^']+)'/g)].map(match => match[1]);
assert(unique(shellAssets), 'APP_SHELL contains duplicate entries.');
for (const asset of shellAssets) {
  if (asset === './') continue;
  assert(asset.startsWith('./'), `APP_SHELL contains a non-relative asset: ${asset}`);
  const file = asset.slice(2);
  assert(fs.existsSync(file), `APP_SHELL references a missing file: ${file}`);
}

// All local HTML runtime dependencies must be precached.
const scriptRefs = [...index.matchAll(/<script\s+src="([^"]+)"/g)].map(match => match[1]);
const linkRefs = [...index.matchAll(/<link\s+[^>]*href="([^"]+)"[^>]*>/g)].map(match => match[1]);
const runtimeRefs = [...scriptRefs, ...linkRefs].filter(ref => !/^https?:\/\//i.test(ref));
assert(unique(scriptRefs), 'index.html loads a script more than once.');
for (const ref of runtimeRefs) {
  assert(fs.existsSync(ref), `index.html references a missing local asset: ${ref}`);
  assert(shellAssets.includes(`./${ref}`), `Local runtime asset is not precached: ${ref}`);
}
assert(!/(?:src|href)="https?:\/\//i.test(index), 'index.html contains an external runtime dependency.');

// Manifest installation contract.
let manifest;
try {
  manifest = JSON.parse(manifestText);
} catch (error) {
  fail(`manifest.webmanifest is invalid JSON: ${error.message}`);
}
assert(manifest.start_url === './', 'Manifest start_url must remain relative to the repository Pages path.');
assert(manifest.scope === './', 'Manifest scope must remain relative to the repository Pages path.');
assert(manifest.display === 'standalone', 'Manifest display mode is not standalone.');
assert(Array.isArray(manifest.icons) && manifest.icons.length >= 3, 'Manifest icon set is incomplete.');
for (const icon of manifest.icons) {
  assert(typeof icon.src === 'string' && fs.existsSync(icon.src), `Manifest references a missing icon: ${icon.src}`);
  assert(shellAssets.includes(`./${icon.src}`), `Manifest icon is not precached: ${icon.src}`);
}
assert(manifest.icons.some(icon => icon.sizes === '192x192'), 'Manifest is missing the 192x192 icon.');
assert(manifest.icons.some(icon => icon.sizes === '512x512' && icon.purpose === 'any'), 'Manifest is missing the regular 512x512 icon.');
assert(manifest.icons.some(icon => icon.sizes === '512x512' && icon.purpose === 'maskable'), 'Manifest is missing the maskable 512x512 icon.');

// DOM wiring: every getElementById used by runtime scripts must exist exactly once.
const runtimeJs = [app, choiceUi, historyUi, consistencyUi].join('\n');
const referencedIds = [...runtimeJs.matchAll(/getElementById\('([^']+)'\)/g)].map(match => match[1]);
const declaredIds = [...index.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
assert(unique(declaredIds), 'index.html contains duplicate element IDs.');
for (const id of new Set(referencedIds)) {
  assert(declaredIds.includes(id), `Runtime JavaScript references missing DOM id: ${id}`);
}

const screenBlock = app.match(/const screens = \{([\s\S]*?)\n\};/);
assert(screenBlock, 'Could not parse the screen registry in app.js.');
const screenKeys = [...screenBlock[1].matchAll(/\b([a-z]+):\s*document\.getElementById/g)].map(match => match[1]);
const screenTargets = [...index.matchAll(/data-screen="([^"]+)"/g)].map(match => match[1]);
for (const target of new Set(screenTargets)) {
  assert(screenKeys.includes(target), `index.html targets an unregistered screen: ${target}`);
}

// State recovery and interaction regressions found by the v6.3.1 audit.
assert(app.includes('function normalizeCardIds(value)'), 'Persisted card IDs are not normalized on load.');
assert(app.includes('function normalizeSettings(value)'), 'Persisted settings are not normalized on load.');
assert(/try\s*\{[\s\S]{0,160}localStorage\.setItem/.test(app), 'Persistence can still crash gameplay when localStorage writes fail.');
assert(app.includes('state.position = state.order.length;'), 'Completed runs can still look resumable from their final card.');
assert(app.includes("if (wakeLock || !('wakeLock' in navigator)"), 'Wake-lock requests are not protected from duplicate acquisition.');
assert(app.includes("event.key === 'Escape' && !el.chaosModal.hidden"), 'Chaos modal cannot be dismissed with Escape.');
assert(app.includes("document.getElementById('closeChaos').focus()"), 'Chaos modal does not move focus to its close control when opened.');
assert(app.includes('await registration.update()') && app.includes('waitForWorkerActivation(registration)'), 'Offline-ready status does not wait for a service-worker update/activation attempt.');

// Module ownership: history UI must not duplicate choice UI behaviour.
assert(!historyUi.includes('enhanceChoices'), 'history-ui.js still duplicates choice-ui.js enhancement logic.');
assert(!historyUi.includes('scenarioChoices'), 'history-ui.js still depends on the choice container.');
assert(choiceUi.includes("raw.indexOf(' — ')"), 'choice-ui.js no longer owns choice label/reason enhancement.');

// GitHub Actions workflow hardening.
assert(/actions\/checkout@[0-9a-f]{40}/.test(workflow), 'actions/checkout is not pinned to an immutable commit SHA.');
assert(/actions\/setup-node@[0-9a-f]{40}/.test(workflow), 'actions/setup-node is not pinned to an immutable commit SHA.');
assert(workflow.includes('persist-credentials: false'), 'Checkout still persists GitHub credentials unnecessarily.');
assert(workflow.includes('workflow_dispatch:'), 'Validation workflow cannot be run manually.');
assert(workflow.includes('cancel-in-progress: true'), 'Validation workflow does not cancel superseded runs.');
assert(/timeout-minutes:\s*10/.test(workflow), 'Validation job is missing its execution timeout.');
assert(workflow.includes('node --check validate-runtime.cjs'), 'Runtime validator is not syntax-checked in CI.');
assert(workflow.includes('node validate-runtime.cjs'), 'Runtime validator is not executed in CI.');

// Keep pinned Actions maintainable.
assert(/package-ecosystem:\s*["']?github-actions["']?/.test(dependabot), 'Dependabot is not configured for GitHub Actions updates.');
assert(/directory:\s*["']\/["']/.test(dependabot), 'Dependabot GitHub Actions directory is not repository root.');

console.log(`PASS: runtime reports ${APP_VERSION} and cache ${CACHE_NAME}.`);
console.log('PASS: service-worker cleanup is cache-prefix scoped and runtime cache writes are awaited.');
console.log('PASS: all local HTML/manifest runtime assets exist and are precached.');
console.log('PASS: manifest, DOM IDs, screen targets, and offline wiring are internally consistent.');
console.log('PASS: persisted-state recovery, run completion, wake lock, and Chaos modal regressions are guarded.');
console.log('PASS: choice/history UI responsibilities are separated.');
console.log('PASS: GitHub Actions uses pinned actions, least-privilege checkout, concurrency cancellation, timeout, and the runtime audit.');