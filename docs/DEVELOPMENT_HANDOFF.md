# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> **docs/DEVELOPMENT_HANDOFF.md is the authoritative continuity document for this project. Every material development PR must update this file before merge. The update must reflect the actual final state of the branch, completed work, important decisions, tests and validation, current GitHub state, unresolved issues, and the exact next step. A material development PR is not complete until the handoff is current.**
>
> **Current repository code and verified GitHub state outrank this document. If the handoff is discovered to be stale or incorrect, verify the repository and correct the handoff immediately rather than following stale instructions.**
>
> **Do not rely on ChatGPT conversation history as the durable source of project state. Important development context must be captured in this repository handoff.**

Update this file whenever architecture, product rules, compatibility, runtime behaviour, deployment, validation, PR state, unresolved issues, or the exact continuation point materially changes. At minimum update it before every material merge and again after merge when the released baseline or next step changes.

---

# 1. Project Identity

## Project

**Plot Twist**

Repository: `detratech/plot-twist`

Default branch: `main`

Repository: public, GitHub Pages enabled.

Plot Twist is an offline-first Android-oriented social scenario/campfire game.

Current game flow:

`scenario → choose one of two defensible positions → defend → Plot Twist → reconsider/switch → The Point → deeper question → Real-World Example → One Last Thing → Where This Can Go`

The runtime should feel like an adult party/campfire game, not a survey, classroom exercise, overt debate-training tool, religious app, or philosophy app.

## User workflow

**The user does not maintain a local Plot Twist repository.**

Normal workflow:

`GitHub repository → feature branch/PR → GitHub Actions validation → explicit user authorization → merge to main → GitHub-hosted deployment → Android/PWA acceptance test`

Do not invent a local path or tell the user to run `git pull`, Node, Python, or a local server unless they explicitly choose to create a local clone later.

---

# 2. Current Released Baseline

**Released source baseline: v6.3.1 on `main`.**

PR #6 — **Plot Twist v6.3.1: deep code and workflow audit** — was explicitly authorized by the user and merged on 2026-08-24 America/Vancouver time.

Exact merged PR head:

`33838c46a3c48244c0eb75ed3467d780cd397ba3`

Merge commit:

`0d7a102e73aba9999cb26c436a4a80c5439df2c7`

Immediately before merge, GitHub was re-fetched and verified:

- PR #6 was open and mergeable
- exact head matched the authorized SHA
- `Validate Plot Twist` run #51, run ID `32807029125`, completed successfully on that exact SHA
- JavaScript syntax checks passed
- `validate-content.cjs` passed
- `validate-runtime.cjs` passed
- submitted reviews: none
- inline review threads: none
- PR comments/blockers: none
- base `main` remained `db65b3d3c15ad06201afbd5893a120724ca0977e`
- the handoff was current on the PR head

The PR was taken out of draft without changing the head SHA and merged with `expected_head_sha` pinned to the verified head.

After merge, `main` was verified at `0d7a102e73aba9999cb26c436a4a80c5439df2c7` before this handoff update. This handoff update creates a newer `main` commit, so future sessions must re-fetch live `main` rather than treating the pre-update SHA as current.

Previous material releases:

- PR #5 / v6.3 consistency pressure tests: merged head `94fac2411bdfdcbe89e563c4263588773bec3406`, merge commit `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`
- PR #4 / v6.2 prominent choices and 200 Real-World Examples: merged head `34a5fd3dec48e0651a67ced093a15917887f999a`, merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- PR #3 / visible app version: merged as `f90afb2d3096763af555cf2110a5a2d539a5e5a1`
- PR #2 / rewrite all 200 cards as true two-sided dilemmas: relevant merged history commit `2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

---

# 3. Architecture

## Runtime stack

- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- PWA manifest
- Service Worker / Cache API
- browser `localStorage`
- optional Screen Wake Lock API
- GitHub Actions validation
- GitHub-hosted static deployment / Pages

Deliberately absent:

- framework/bundler/build step
- package-manager runtime dependencies
- backend/database/auth
- runtime APIs/CDNs
- remote fonts/images
- analytics

## Main runtime files

- `index.html`
- `styles.css`
- `categories.css`
- `game-v6.2.css` — A-vs-B presentation
- `game-v6.3.css` — `One Last Thing` presentation
- `app.js` — state/navigation/persistence/install/wake-lock/SW handling
- `choice-ui.js` — sole choice label/reason enhancement owner
- `history-ui.js` — Real-World Example rendering only
- `consistency-ui.js` — deterministic consistency prompt layer
- `cards.js`
- `deck-a.js` through `deck-h.js`
- `categories.js`
- `history-a.js` through `history-d.js`
- `history-reviewed.js`
- `manifest.webmanifest`
- `sw.js`

## Validation/workflow files

- `validate-content.cjs` — deck/editorial/runtime-content structural gate
- `validate-runtime.cjs` — runtime/PWA/state/workflow regression gate added in v6.3.1
- `.github/workflows/validate.yml`
- `.github/dependabot.yml`
- `VALIDATION.md`
- `README.md`
- `docs/DEVELOPMENT_HANDOFF.md`

## Card model

Exactly 200 cards with stable internal IDs 1–200.

Each card contains:

- `id`
- `title`
- `vibe`
- `scenario` — exactly two non-empty paragraphs
- `prompt`
- `choices` — exactly two defensible pre-reveal choices
- `twist`
- `conclusion` — displayed as `The Point`
- `afterPrompt`
- `hostPrompts` — exactly two
- `categories` — one or two valid category IDs

Internal IDs are compatibility keys and must not be displayed to players.

## Categories

Six category IDs:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

`Mix Everything` represents the full deck. Multi-category selection forms a union without duplicate cards. Start and Random respect the active filter. Saved playback is independent of the current filter.

## Real-World Examples

Exactly one substantive runtime example maps to every card ID 1–200.

Runtime precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js`, loaded afterward and authoritative for overridden IDs

Research ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

Accuracy and analogy fit outrank fame. Prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical. Do not overclaim what a source proves.

Card 184 intentionally uses the documented 1973 UC Berkeley graduate-admissions / Simpson's paradox example instead of the weaker polio/ice-cream anecdote.

---

# 4. Product and Editorial Rules

## Two-sided dilemma rule

Every card must begin with two genuinely defensible choices. A thoughtful adult should be able to defend either side before the reveal.

Do not write:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- `it depends` escape choice
- Plot Twist that only repeats setup information
- reveal that merely congratulates one side

Target structure:

`two defensible positions → commitment → decision-relevant new information → reconsider → principle`

Changing sides after the reveal is intentional and explicitly allowed.

## The Point

`The Point` should land a clear declarative principle. Do not retreat into forced neutrality merely to make both sides seem equally valid after the reveal.

## Hidden source layer

Player-facing runtime text must not expose the source-worldview or authoring framework behind the game. `validate-content.cjs` enforces protected terminology and meta-authoring leak checks.

Do not weaken those checks merely to make new content pass.

## Choice presentation

Current design contract:

- two side-by-side columns
- center divider
- `VS`
- prominent decision label
- smaller reason

## Real-World Example placement

The Real-World Example appears after the post-Point question so players reason through the fictional dilemma before the concrete analogy anchors the discussion.

## One Last Thing

Every card gets one concise consistency pressure test after its Real-World Example and before `Where This Can Go`.

Eight deterministic test types:

1. `SAME RULE?`
2. `WHAT WOULD CHANGE YOUR MIND?`
3. `OUTCOME TEST`
4. `STRANGER TEST`
5. `EVERYONE GETS IT`
6. `YOUR TURN`
7. `POWER FLIP`
8. `CROSSOVER`

Assignment remains deterministic from stable card ID:

`(current.id - 1) % TESTS.length`

## Chaos remains separate

`cards.js` defines 16 optional universal Chaos pressure tests. Chaos remains random, playful, and more aggressive. `One Last Thing` is the guaranteed concise consistency check in the normal flow.

## No scoring / visible correct-answer system

Do not add ideology scores, moral scores, visible `correct` answers, or other mechanics that make players feel graded.

---

# 5. Persistence and Compatibility

Compatibility anchors:

- localStorage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`
- card IDs 1–200
- `HISTORICAL_EXAMPLES[id]` aligned to those IDs

These remain unchanged in v6.3.1.

v6.3.1 adds a compatible `runCategories` snapshot. This stores the category context of the active run so changing the home-screen filter does not change the label/replay semantics of a game already in progress.

Do not bump `masterpiece-200-v1` merely to refresh assets. Use the service-worker cache version for runtime asset refresh.

Visible Settings version:

`v6.3.1`

Service-worker cache:

`plot-twist-v6.3.1`

Do not casually recommend clearing browser/site data because it destroys Saved cards, settings, selected categories, and current state and undermines compatibility testing.

---

# 6. v6.3.1 Deep Audit: Defects Found and Fixed

## Service worker / offline

Fixed:

- old activation logic could delete every cache on the same origin except Plot Twist's current cache; cleanup is now restricted to `plot-twist-*`
- runtime cache reads/writes are isolated to the current Plot Twist cache
- runtime caching is restricted to same-origin requests inside the service-worker scope
- runtime `cache.put()` writes are awaited
- uncached offline failures return an explicit error response
- online startup attempts service-worker update/activation before reporting `Offline cache ready`, while an already-active worker can still support offline launch when the network is unavailable

This matters because GitHub Pages repository apps can share the same origin; Plot Twist must never destroy unrelated app caches.

## State / run semantics

Fixed:

- persisted card IDs are validated and deduplicated
- persisted settings, mode, and position are normalized
- unavailable/blocked localStorage writes no longer crash in-memory gameplay
- completed runs advance to an explicit end position and no longer reappear as resumable on the final card
- active runs keep `runCategories` so labels and replay do not drift when home-screen filters change
- `PLAY AGAIN` is mode-aware: Saved runs replay Saved cards; normal/random runs replay the original run-category snapshot

## Interaction / ownership

Fixed:

- duplicate wake-lock acquisition is prevented
- Chaos supports Escape dismissal, focus transfer on open, and focus restoration on close
- duplicate choice-formatting logic was removed from `history-ui.js`; `choice-ui.js` is the sole owner

---

# 7. Offline / PWA Rules

Offline-first is non-negotiable.

`sw.js` must precache all essential local runtime assets. Runtime network dependencies, external APIs, CDNs, remote fonts/images, authentication, and analytics must not be introduced casually.

When runtime assets change, inspect together:

- `index.html`
- `sw.js`
- `validate-content.cjs`
- `validate-runtime.cjs`

After the new service worker has activated, the installed Android PWA must launch and play with airplane mode enabled and Wi-Fi off.

A merge to `main` makes source eligible for hosted deployment, but an installed PWA can remain on an older cache until GitHub Pages publishes the source and Chrome completes the service-worker lifecycle. Always verify **Settings → App Version** on the physical device.

---

# 8. Validation and GitHub Workflow

Workflow:

`.github/workflows/validate.yml`

Name:

`Validate Plot Twist`

Environment:

- `ubuntu-latest`
- Node.js 22

v6.3.1 workflow hardening:

- `actions/checkout` pinned to an immutable verified commit SHA
- `actions/setup-node` pinned to an immutable verified commit SHA
- checkout `persist-credentials: false`
- `workflow_dispatch` supported
- concurrency cancellation enabled for superseded runs
- 10-minute job timeout
- weekly Dependabot maintenance for GitHub Actions

CI runs both:

1. `validate-content.cjs`
2. `validate-runtime.cjs`

The original content validator was retained and not weakened.

### `validate-content.cjs`

Checks include:

- exactly 200 cards
- IDs 1–200 complete/unique
- required schema
- exactly two scenario paragraphs
- exactly two distinct substantive choices
- no `it depends` escape
- loaded-choice wording lint
- substantive Plot Twists
- valid categories
- exactly 200 substantive Real-World Examples
- presentation/history/consistency assets loaded and precached
- Real-World Example and One Last Thing placement
- protected terminology/meta-authoring leak checks
- visible app version/cache/deck compatibility contract

### `validate-runtime.cjs`

Checks include:

- version and stable state compatibility
- Plot Twist-only cache cleanup
- service-worker scope/origin isolation
- awaited runtime cache writes
- APP_SHELL duplicates/missing files
- local HTML/manifest assets exist and are precached
- manifest installation contract
- DOM IDs and screen routing
- persistence normalization
- completion/resume regression
- runCategories/replay semantics
- wake-lock duplicate protection
- Chaos keyboard/focus behaviour
- service-worker update lifecycle wiring
- module ownership between choice/history UI
- GitHub Actions hardening and Dependabot configuration

Static CI does not replace physical Android/PWA acceptance.

---

# 9. Git and Pull Request Rules

`main` is the released baseline. Material development occurs on feature branches and PRs.

**Never merge a material PR without the user's explicit authorization for that specific PR.**

Immediately before an authorized merge:

1. re-fetch PR
2. verify exact head SHA
3. verify CI passed on that exact SHA
4. verify mergeability
5. check submitted reviews
6. check inline review threads
7. check PR comments/blockers
8. ensure this handoff is current
9. merge only the exact verified head using `expected_head_sha`

If the branch changes after authorization, previous approval does not automatically apply. Revalidate and reconfirm authorization for the new head.

After merge:

1. verify resulting `main` SHA
2. confirm intended PR is part of `main`
3. update this handoff if the released baseline or next step changed
4. do not give local-repository commands to the user
5. verify hosted version and conduct Android/PWA acceptance

---

# 10. Current Unresolved Issues

## 1. Hosted v6.3.1 deployment / installed-app update

PR #6 is merged, but the physical Android PWA still needs to confirm it has received v6.3.1.

Do not clear site data to force the update.

## 2. Android v6.3.1 acceptance

Once Settings shows `v6.3.1`, verify:

1. existing Saved cards/settings/category choices survive the v6.3.0 → v6.3.1 update
2. active run resumes correctly
3. changing home categories does not change the active run's displayed category context
4. `PLAY AGAIN` after a normal/random run uses the original run-category snapshot
5. `PLAY AGAIN` after a Saved run replays Saved cards rather than starting a normal category deck
6. completing the last card does not create a false Resume Game state
7. Chaos opens/closes normally and restores focus; Escape dismissal works where available
8. wake lock behaves normally without duplicate requests
9. A/B choice presentation, Real-World Example, One Last Thing, category filtering, Random, Saved, Host prompts, Settings, and Next remain correct
10. Settings shows `v6.3.1`
11. once `Offline cache ready` is shown with the new service worker active, fully close the app, enable airplane mode, turn Wi-Fi off, relaunch from the installed icon, and verify full gameplay

## 3. Hosted Pages details

The repository has GitHub Pages enabled. If deployment debugging is required, verify the exact live Pages configuration/URL from GitHub rather than inventing it.

---

# 11. Exact Continuation Point

## Exact Next Step

1. Re-fetch live `main` and verify the latest commit. The v6.3.1 merge commit is `0d7a102e73aba9999cb26c436a4a80c5439df2c7`; this handoff update creates a newer main commit.
2. Confirm PR #6 remains merged and no newer material PR supersedes it.
3. Treat **v6.3.1** as the released source baseline.
4. Do not ask for or invent a local Plot Twist repository.
5. Have the user open the hosted/installed Plot Twist app while online and check **Settings → App Version**.
6. If it shows `v6.3.1`, run the Android acceptance checklist in section 10, ending with airplane-mode relaunch.
7. If it still shows `v6.3.0`, do not clear site data. Investigate the GitHub Pages deployment/service-worker update path and use the least-destructive update method.
8. If Android testing finds a defect, create a new feature branch/PR, add or strengthen a regression check where practical, update this handoff, and do not merge without explicit authorization for that new PR.
9. If v6.3.1 passes acceptance, update this handoff to record acceptance complete and replace this Exact Next Step with the next concrete product/development task.
