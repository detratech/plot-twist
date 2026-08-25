# Plot Twist

Offline-first Android-friendly social scenario game.

## What is included

- Vanilla HTML/CSS/JavaScript, no framework and no build step
- **200 local scenario cards**
- Six broad selectable topic categories plus `Mix Everything`
- Multi-select topic mixing so players can combine several categories in one run
- Start Game and Random Card respect the selected topics
- No visible card numbering in the game or Saved list
- Exactly two defensible answer choices before each reveal
- v6.2 large side-by-side A-vs-B choice presentation with center divider and `VS`
- Hidden Plot Twist stage, declarative `The Point`, deeper question, and one researched local **Real-World Example** per card
- v6.3 **One Last Thing** consistency prompt after every Real-World Example
- Eight deterministic consistency tests covering role reversal, falsifiability, outcomes, impartiality, universal rules, self-application, power reversal, and cross-domain transfer
- `Where This Can Go` follow-up paths and 16 optional Chaos pressure tests
- Optional Host prompts and Screen Wake Lock support
- Saved cards and compatible local game-state persistence
- Installable PWA manifest, local icons, and service-worker offline cache
- GitHub Actions content plus runtime/PWA regression validation

## Current version

The v6.3.1 audit branch is a patch release over v6.3.0. It does not change the 200-card deck, internal IDs, or the stable persistence identifiers.

Compatibility anchors remain:

- local-storage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`
- stable internal card IDs: 1–200

v6.3.1 changes the visible version to `v6.3.1` and the service-worker cache to `plot-twist-v6.3.1` so installed copies can receive the corrected runtime assets without discarding compatible Saved cards/settings/state.

## Topic categories

- **Mind & Truth** — evidence, beliefs, logic, assumptions
- **Relationships & Family** — marriage, dating, parenting, boundaries
- **Money & Success** — work, ambition, debt, status, responsibility
- **Tech & Modern Life** — phones, algorithms, attention, convenience
- **Society & Culture** — social rules, politics, groups, public life
- **Life & Purpose** — character, pleasure, freedom, meaning, time

Cards may fit more than one category. `categories.js` preserves valid authored tags and infers tags for older cards that do not already have them. Selecting several categories creates one combined shuffled deck without duplicating a card inside that run.

Saved-card playback remains independent of the current category filter.

## Content design

The core rule is **funny dilemma, real commitment, meaningful reversal, sharp conclusion**.

Every card is built around these editorial requirements:

1. **Two intelligent choices.** Before the reveal, a reasonable adult should be able to defend either answer.
2. **Clear buttons.** Each choice states a real course, rule, priority, or judgement. `It depends` is not a pre-reveal escape hatch.
3. **No conclusion hidden in the choices.** One side cannot be pre-labelled as the obvious virtue while the other is a caricature.
4. **New information in the Plot Twist.** The reveal must add a fact, consequence, trade-off, missing context, or changed condition.
5. **The reveal must matter.** It should create a credible reason to reconsider rather than merely congratulate one side.
6. **The Point still lands.** It states the principle rather than retreating into forced neutrality.
7. **The Real-World Example must fit the exact principle.** It illustrates the idea but is not presented as universal proof.
8. **Consistency gets pressure-tested.** `One Last Thing` asks whether the same rule survives a role swap, disliked outcome, power reversal, self-application, or different life domain.

The intended flow is:

`pick topics → dilemma → two choices → commit → defend → Plot Twist → reconsider/switch → The Point → deeper question → Real-World Example → One Last Thing → Where This Can Go`

## Runtime files

### Core game

- `index.html` — screens and runtime asset loading
- `app.js` — game state, navigation, persistence, install/wake-lock/service-worker handling
- `styles.css` / `categories.css` — base/category presentation
- `game-v6.2.css` — A-vs-B presentation
- `game-v6.3.css` — `One Last Thing` presentation
- `choice-ui.js` — sole owner of choice label/reason enhancement
- `history-ui.js` — Real-World Example rendering only
- `consistency-ui.js` — deterministic eight-test consistency layer

### Card and category data

- `cards.js` — shared card array and 16 Chaos prompts
- `deck-a.js` through `deck-h.js` — eight 25-card files, exactly 200 cards
- `categories.js` — category definitions and tag processing

### Real-World Examples

- `history-a.js`
- `history-b.js`
- `history-c.js`
- `history-d.js`
- `history-reviewed.js` — audited replacements loaded after draft mappings

The `HISTORY_SOURCES*.md` files are editorial research records and are not runtime dependencies.

## v6.3.1 deep runtime/PWA audit

The v6.3.1 audit found and corrected several concrete defects rather than only adding lint rules.

### Service-worker cache isolation

Older code removed every cache on the current origin except Plot Twist's newest cache. On a shared GitHub Pages origin, that could remove caches belonging to other applications.

v6.3.1 introduces:

- `CACHE_PREFIX = 'plot-twist-'`
- cleanup restricted to old `plot-twist-*` caches
- runtime cache reads/writes restricted to the current named Plot Twist cache
- same-origin and service-worker-scope guards
- awaited `cache.put()` writes
- explicit offline failure responses for uncached non-navigation requests

### State and run recovery

`app.js` now:

- validates and deduplicates persisted card IDs
- normalizes settings to booleans
- validates mode and clamps persisted position
- tolerates unavailable/blocked localStorage writes without crashing the in-memory game
- marks a completed run with an end-of-run position so it does not reappear as resumable on the final card
- snapshots the category selection used to build an active run in `runCategories`, so changing the home filter does not relabel an already-created deck
- uses mode-aware `PLAY AGAIN` logic, so Saved-card runs replay Saved cards and normal/random runs replay the same category snapshot

### Interaction/lifecycle fixes

- duplicate wake-lock acquisition is prevented
- Chaos modal gains Escape dismissal, focus transfer to its close control, and focus restoration
- `history-ui.js` no longer duplicates `choice-ui.js` choice-formatting logic
- service-worker registration explicitly attempts update/activation while online, but an already-active worker can still support a clean offline launch

## Automated validation

GitHub Actions now runs **two complementary validators** after JavaScript syntax checks.

### `validate-content.cjs`

The original content/product contract remains intact. It verifies, among other things:

- exactly 200 cards and complete unique IDs 1–200
- required card structure, two choices, substantive Plot Twists, follow-up structure, and categories
- exactly 200 substantive Real-World Examples
- protected runtime/meta terminology rules
- choice/history/consistency presentation contracts
- visible `v6.3.1`, stable `masterpiece-200-v1`, and cache `plot-twist-v6.3.1`

### `validate-runtime.cjs`

The new runtime audit verifies, among other things:

- service-worker cache cleanup cannot delete unrelated origin caches
- runtime cache writes are awaited and scope/origin restricted
- every local HTML/manifest runtime asset exists and is precached
- manifest installation URLs/icons remain valid and scope-relative
- DOM IDs, `aria-labelledby`, screen/action/category routing, and manifest shortcuts are internally wired
- state normalization, run completion, run-category snapshot, Saved replay, wake lock, Chaos focus, and offline active-worker fallbacks remain present
- `choice-ui.js` and `history-ui.js` do not regress into duplicate ownership
- GitHub Actions remains hardened

## GitHub Actions workflow

`.github/workflows/validate.yml` uses Node.js 22 and:

- runs on PRs to `main`, pushes to `main`, and manual `workflow_dispatch`
- uses `contents: read`
- cancels superseded runs for the same branch/PR
- has a 10-minute job timeout
- pins `actions/checkout` and `actions/setup-node` to immutable commit SHAs
- disables checkout credential persistence
- syntax-checks all runtime/validator JavaScript
- runs both content and runtime audits

`.github/dependabot.yml` checks GitHub Actions weekly so pinned Action SHAs can be updated through reviewed dependency PRs.

## Android installation: GitHub-hosted PWA

1. Open the hosted Plot Twist HTTPS address in Chrome while online.
2. Wait for **Offline cache ready**.
3. Install the app from Chrome.
4. Confirm a Plot Twist icon appears on the home screen/app launcher.

## Updating an installed copy

After v6.3.1 is published:

1. Open the hosted version while online and reload it.
2. Fully close the installed Plot Twist app.
3. Reopen it.
4. Confirm Settings shows **v6.3.1**.

Do not clear site data as the normal update path because that removes Saved cards/settings/state.

## v6.3.1 Android acceptance checklist

After the audit PR is merged and deployed, verify:

1. Settings reports `v6.3.1`.
2. Existing Saved cards/settings/current compatible state survive the update.
3. A started category run keeps its original mode label after returning home, changing the home category filter, and resuming.
4. Finishing the last card does not produce a Resume button for that completed run.
5. `PLAY AGAIN` after a normal/random run replays the same run category selection.
6. `PLAY AGAIN` after a Saved-card run stays in Saved-card mode.
7. Chaos opens/closes normally; Escape closes it when a hardware/software keyboard is available.
8. Keep Screen Awake continues working without duplicate wake-lock behaviour.
9. The normal v6.3 flow remains `Plot Twist → The Point → deeper question → Real-World Example → One Last Thing`.
10. Fully close the app, enable airplane mode with Wi-Fi off, relaunch from the installed icon, and verify cached gameplay remains functional.

Static CI does not replace this physical Android/service-worker acceptance test.
