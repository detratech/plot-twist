# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> **docs/DEVELOPMENT_HANDOFF.md is the authoritative continuity document for this project. Every material development PR must update this file before merge. The update must reflect the actual final state of the branch, completed work, important decisions, tests and validation, current GitHub state, unresolved issues, and the exact next step. A material development PR is not complete until the handoff is current.**
>
> **Current repository code and verified GitHub state outrank this document. If the handoff is discovered to be stale or incorrect, verify the repository and correct the handoff immediately rather than following stale instructions.**
>
> **Do not rely on ChatGPT conversation history as the durable source of project state. Important development context must be captured in this repository handoff.**

Update this file whenever architecture, product rules, compatibility, runtime behaviour, deployment, validation, PR state, unresolved issues, or the exact continuation point materially changes. At minimum update it before every material merge and again after merge when the released baseline/next step changes.

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

**Released source baseline on `main`: v6.3.0**

Last verified `main` before the active audit PR:

`db65b3d3c15ad06201afbd5893a120724ca0977e`

Commit message:

`Update handoff after v6.3 merge`

Its parent is the v6.3 merge commit:

`deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`

## PR #5 — v6.3

Title: **Plot Twist v6.3: consistency pressure tests**

Merged PR head:

`94fac2411bdfdcbe89e563c4263588773bec3406`

Merge commit:

`deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`

Pre-merge exact-head CI:

- workflow: `Validate Plot Twist`
- run #42
- run ID `32545084361`
- conclusion: success
- reviews: none
- inline review threads: none
- PR comments/blockers: none

v6.3 added:

- `One Last Thing` after every Real-World Example
- eight deterministic consistency pressure tests
- `consistency-ui.js`
- `game-v6.3.css`
- visible `v6.3.0`
- cache `plot-twist-v6.3.0`

The user previously confirmed v6.2 reached the phone and liked it. Physical v6.3/v6.3.1 acceptance is still a separate post-deployment gate.

---

# 3. Active Development: PR #6 Deep Audit

PR #6:

**Plot Twist v6.3.1: deep code and workflow audit**

Branch:

`audit-code-workflows-v6.3.1`

Base:

`main`

Base SHA at PR creation:

`db65b3d3c15ad06201afbd5893a120724ca0977e`

State when this handoff was edited:

- open
- draft
- unmerged
- mergeable on the most recent metadata fetch before this handoff update

Last exact PR head verified **before this handoff edit**:

`aa2b9244876deabc048eaaa4f9a37fbcd673ee0f`

Important Git self-reference limitation: this file cannot contain the SHA of the commit that contains its own final edited content. A fresh session must re-fetch PR #6 and use GitHub as the source of truth for its live exact head and CI.

## First integrated audit CI checkpoint

On earlier audit head:

`63dc7849d28fef9a6183738fedeebcfc86e93f94`

GitHub Actions ran:

- `Validate Plot Twist`
- run #45
- run ID `32806623553`
- conclusion: success

More fixes were added after that successful run, including active-run category snapshot/replay semantics and expanded runtime validation. Therefore **run #45 is not sufficient for merge**. Final CI must pass on the final exact PR head after this handoff/docs update.

---

# 4. Architecture

## Runtime stack

- Vanilla HTML/CSS/JavaScript
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

- `validate-content.cjs`
- `validate-runtime.cjs` — added by PR #6
- `.github/workflows/validate.yml`
- `.github/dependabot.yml` — added by PR #6
- `README.md`
- `VALIDATION.md`
- `docs/DEVELOPMENT_HANDOFF.md`

---

# 5. Card / Content Sources of Truth

Exactly 200 cards with stable internal IDs 1–200.

Each card contains:

- `id`
- `title`
- `vibe`
- `scenario` — exactly two non-empty paragraphs
- `prompt`
- `choices` — exactly two defensible pre-reveal choices
- `twist`
- `conclusion` — `The Point`
- `afterPrompt`
- `hostPrompts` — exactly two
- `categories` — one or two valid category IDs

Six category IDs:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

`Mix Everything` represents the full deck. Multi-category selection forms a union without duplicate cards. Start/Random respect filtering. Saved playback is independent of the home filter.

## Real-World Examples

Runtime precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js`, loaded afterward and authoritative for overridden IDs

Research ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

Accuracy/analogy fit outrank fame. Prefer primary/official/academic/archival/court/museum/strong first-party sources where practical and do not overclaim.

Card 184 intentionally uses the documented 1973 UC Berkeley graduate-admissions / Simpson's paradox example rather than the weaker polio/ice-cream anecdote.

---

# 6. Product / Editorial Invariants

## Two-sided dilemma

Every card begins with two genuinely defensible choices.

Reject:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- `it depends` escape choice
- Plot Twist that simply repeats setup
- reveal that only congratulates one side

Target:

`two defensible positions → commitment → decision-relevant new information → reconsider → principle`

Changing sides after the reveal is explicitly allowed.

## The Point

Should land a clear declarative principle, not forced neutrality.

## Hidden source layer

Player-facing runtime text must not expose protected source-worldview/authoring terminology. `validate-content.cjs` enforces this. Do not weaken validation just to pass new content.

## Choice UI

- two side-by-side columns
- center divider
- `VS`
- large decision label
- smaller reason

## Real-World Example / consistency ordering

`The Point → deeper question → Real-World Example → One Last Thing → Where This Can Go`

Eight deterministic `One Last Thing` types:

1. `SAME RULE?`
2. `WHAT WOULD CHANGE YOUR MIND?`
3. `OUTCOME TEST`
4. `STRANGER TEST`
5. `EVERYONE GETS IT`
6. `YOUR TURN`
7. `POWER FLIP`
8. `CROSSOVER`

Assignment:

`(current.id - 1) % TESTS.length`

Chaos remains a separate optional/random mechanic.

Do not add ideology/morality scores or visible correct-answer grading.

---

# 7. Persistence / Compatibility

Stable anchors:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- card IDs: 1–200
- history mappings keyed to same IDs

PR #6 keeps these anchors unchanged.

## Additive v6.3.1 state field

PR #6 adds:

`runCategories`

Purpose: snapshot the category selection that created the current run so returning home/changing the home filter does not change the label/replay semantics of the already-built deck.

Compatibility behavior:

- old state without `runCategories` falls back to existing `selectedCategories`
- no migration/reset is required
- do not clear site data as the normal update path

## v6.3.1 version/cache on PR #6

Visible Settings version:

`v6.3.1`

Service-worker cache:

`plot-twist-v6.3.1`

Use cache-version bumps for runtime asset refresh. Do not bump `masterpiece-200-v1` just to force downloads.

---

# 8. Deep Audit Findings and Fixes in PR #6

## 8.1 Service worker deleted unrelated origin caches

Previous activation cleanup deleted every cache except the current Plot Twist cache. On a shared GitHub Pages origin, that could remove caches belonging to other apps.

Fixed with:

- `CACHE_PREFIX = 'plot-twist-'`
- cleanup restricted to old keys starting with that prefix

This is the highest-severity defect found in the audit.

## 8.2 Runtime cache writes were not awaited

Previous runtime cache writes could outlive the service-worker event lifecycle.

Fixed with an async fetch handler and `await cache.put(...)`.

## 8.3 Runtime cache boundary was too broad

Fixed by:

- using the current named Plot Twist cache for read/write
- same-origin check
- service-worker registration-scope check
- explicit error response for uncached non-navigation offline failures

## 8.4 Persisted-state recovery was too permissive

Fixed by:

- validating/deduplicating card-ID arrays
- normalizing settings to booleans
- validating mode
- clamping position
- tolerating blocked/unavailable localStorage writes
- guarding reset storage removal

## 8.5 Completed run appeared resumable

Old code left position on the final card when the run completed. Returning home could offer Resume and reopen that final card.

Fixed by storing the explicit end-of-run sentinel:

`state.position = state.order.length`

## 8.6 Active run label could drift after changing home filter

An already-built run could show a new category label after the user changed the home filter and resumed.

Fixed with `runCategories` snapshot and mode-label derivation from that snapshot.

## 8.7 Saved-run replay changed modes

The old completion replay button used generic `start`, so completing a Saved-card run and replaying could start a normal category deck.

Fixed with `restartRun()` and mode-aware `PLAY AGAIN`:

- Saved run → Saved run
- normal/random → same original run-category snapshot

## 8.8 Duplicate wake-lock acquisition

`requestWakeLock()` now returns when a live wake lock already exists.

## 8.9 Chaos modal focus/keyboard handling

Added:

- focus transfer to close control on open
- Escape dismissal
- previous-focus restoration on close
- shared `closeChaos()` path

## 8.10 Duplicate choice-enhancement ownership

`history-ui.js` contained a second copy of `choice-ui.js` choice formatting.

Fixed:

- `choice-ui.js` is sole owner
- `history-ui.js` only renders Real-World Example

## 8.11 Service-worker update/offline-ready handling

PR #6 attempts explicit registration update/activation before saying `Offline cache ready` while online.

If the update check cannot reach the network but an active service worker already exists, offline launch can still proceed instead of falsely failing the whole offline-ready state.

## 8.12 GitHub Actions hardening gaps

PR #6:

- pins `actions/checkout` to `11d5960a326750d5838078e36cf38b85af677262`
- pins `actions/setup-node` to `49933ea5288caeca8642d1e84afbd3f7d6820020`
- sets `persist-credentials: false`
- adds manual `workflow_dispatch`
- adds concurrency/cancel-in-progress
- adds 10-minute job timeout
- adds new runtime validator
- adds weekly Dependabot checks for GitHub Actions

The pinned SHAs were independently verified against their v4 tag refs during the audit.

---

# 9. Validation Architecture on PR #6

## `validate-content.cjs`

The existing content/product gate remains intact and was not weakened.

It checks, among other things:

- exactly 200 cards / IDs 1–200
- card schema
- two scenario paragraphs
- exactly two distinct substantive choices
- no `it depends`
- conservative loaded-choice lint
- substantive twists
- category coverage
- exactly 200 Real-World Examples
- runtime presentation/history/consistency assets
- protected terminology/meta-authoring rules
- visible `v6.3.1`
- `masterpiece-200-v1`
- cache `plot-twist-v6.3.1`

## `validate-runtime.cjs`

New in PR #6. It checks:

- version/state compatibility anchors
- Plot-Twist-only cache cleanup
- no old delete-all-other-caches pattern
- scope/origin-restricted current-cache reads/writes
- awaited runtime cache writes
- APP_SHELL uniqueness/file existence
- all local HTML/manifest runtime dependencies exist and are precached
- no external HTTP runtime dependency in `index.html`
- manifest parsing, relative scope/start URL, standalone mode, icons, shortcuts
- unique DOM IDs and valid `aria-labelledby`
- every runtime `getElementById` target exists
- screen/action/category routing is wired
- Random manifest shortcut is handled
- state normalization/localStorage guard
- completion sentinel
- run-category snapshot and mode-aware replay
- Saved replay semantics
- wake-lock duplicate guard
- Chaos focus/Escape handling
- SW update/activation plus offline-active fallback
- separation of choice/history UI responsibilities
- pinned Actions, no persisted checkout credentials, manual dispatch, concurrency, timeout
- Dependabot GitHub Actions maintenance

## GitHub Actions

Workflow:

`.github/workflows/validate.yml`

Environment:

- `ubuntu-latest`
- Node 22

Triggers:

- push to `main`
- PR targeting `main`
- manual `workflow_dispatch`

CI runs syntax checks, `node validate-content.cjs`, and `node validate-runtime.cjs`.

Static CI does not replace physical Android PWA testing.

---

# 10. Git / Merge Rules

`main` is the released baseline. Material changes use feature branches/PRs.

**Never merge a material PR without explicit user authorization for that specific PR.**

Immediately before an authorized merge:

1. Re-fetch PR.
2. Verify exact head SHA.
3. Verify CI passed on that exact SHA.
4. Verify mergeability.
5. Check submitted reviews.
6. Check inline review threads.
7. Check PR comments/blockers.
8. Verify this handoff is current.
9. Merge only the exact verified head after explicit approval.

If the branch changes after authorization, revalidate and obtain new authorization for the new head.

After merge:

1. verify `main` SHA
2. confirm intended PR is in `main`
3. update this handoff if released baseline/next step changed
4. do not give local-repo commands
5. verify hosted version on Android
6. run acceptance/offline tests

---

# 11. Previous Material PRs

## PR #2

200-card two-sided dilemma rewrite.

Relevant merged history commit:

`2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

## PR #3

Visible app version in Settings.

Merge commit:

`f90afb2d3096763af555cf2110a5a2d539a5e5a1`

## PR #4 — v6.2

Prominent A/B UI + 200 Real-World Examples + researched history layer.

Head:

`34a5fd3dec48e0651a67ced093a15917887f999a`

Merge:

`c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

## PR #5 — v6.3

`One Last Thing` consistency layer.

Head:

`94fac2411bdfdcbe89e563c4263588773bec3406`

Merge:

`deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`

---

# 12. Current Unresolved / Release Gates

## PR #6 final exact-head CI

Run #45 passed on an earlier head, but more fixes/docs were added afterward. The final exact head must receive a fresh successful `Validate Plot Twist` run.

## PR review/blocker check

Before merge authorization is acted on, inspect:

- requested reviewers
- submitted reviews
- inline review threads/resolution state
- PR comments/blockers
- exact mergeability

## No authorization yet for PR #6

The user authorized the previous PR #5 merge, then requested that the next audit PR be developed. That is **not** authorization to merge PR #6 automatically.

PR #6 must remain unmerged until the user explicitly authorizes that PR after hearing the audit result.

## Android v6.3.1 acceptance after merge

If PR #6 is eventually authorized/merged, verify without clearing site data:

1. Settings shows `v6.3.1`.
2. Saved cards/settings/compatible active state survive v6.3.0 → v6.3.1.
3. Start a specific-category run, go home, change home categories, Resume: run label/deck remain tied to original run snapshot.
4. Finish final card: completed run must not reappear as resumable.
5. `PLAY AGAIN` after normal/random run uses original run category snapshot.
6. `PLAY AGAIN` after Saved run remains Saved mode.
7. Chaos closes normally and focus/keyboard behavior is sane.
8. Keep Screen Awake still behaves correctly.
9. Flow remains `Plot Twist → The Point → deeper question → Real-World Example → One Last Thing`.
10. Category filtering, Random, Saved, Next, Host prompts, Settings and long content remain comfortable on Android.
11. Fully close app, enable airplane mode + Wi-Fi off, relaunch from installed icon, verify full cached gameplay.
12. Close/reopen again while offline and verify restored state.

---

# 13. Exact Continuation Point

## Exact Next Step

1. Re-fetch PR #6 from GitHub. Do not trust the pre-handoff SHA in this file as the final SHA because this handoff edit itself changes the branch head.
2. Fetch `Validate Plot Twist` runs for the new exact PR head.
3. Require a completed **success** on that exact SHA. If CI fails, inspect the failed job/step and fix the defect; do not weaken validation merely to pass.
4. Re-fetch PR #6 after CI and verify mergeability.
5. Check submitted reviews, inline review threads, and PR comments/blockers.
6. Update the PR body with the final exact verified head, CI run number/ID, all material audit findings/fixes, and the fact that Android acceptance remains post-merge.
7. Keep PR #6 draft/unmerged unless and until the user explicitly authorizes merging **PR #6**.
8. If the user authorizes merge, repeat the exact-head merge checklist immediately before merging. Any intervening commit invalidates prior authorization.
9. After merge, verify `main`, update this handoff to make v6.3.1 the released baseline, then have the user verify Settings `v6.3.1` and run the Android acceptance checklist above.
