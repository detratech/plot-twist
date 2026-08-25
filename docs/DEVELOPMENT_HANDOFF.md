# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> **`docs/DEVELOPMENT_HANDOFF.md` is the authoritative continuity document for this project. Every material development PR must update this file before merge. The update must reflect the actual final state of the branch, completed work, important decisions, tests and validation, current GitHub state, unresolved issues, and the exact next step. A material development PR is not complete until the handoff is current.**
>
> **Current repository code and freshly verified GitHub state outrank this document. If this handoff is stale or incorrect, verify the repository and correct the handoff immediately rather than following stale instructions.**
>
> **Do not rely on ChatGPT conversation history as the durable source of project state. Important development context belongs here.**

Update this file whenever architecture, product rules, wording standards, compatibility, runtime behaviour, deployment, validation, PR state, unresolved issues, or the exact continuation point changes.

---

# 1. Project Identity

## Project

**Plot Twist**

Repository: `detratech/plot-twist`

Default branch: `main`

Repository is public and GitHub Pages is the hosting/distribution model.

Plot Twist is an offline-first Android-oriented social scenario/campfire game.

Core player loop:

`scenario → choose one of two reasonable positions → say why → reveal Plot Twist → reconsider/switch → The Point → follow-up → Real-World Example → One Last Thing → Keep Talking`

The game should feel like something normal adults can pick up at a campfire or game night. It must not feel like a classroom exercise, formal debate tool, philosophy app, religious app, survey, or academic test.

## User workflow

**The user does not maintain a local Plot Twist repository.**

Normal workflow:

`GitHub repository → feature branch/PR → GitHub Actions → explicit user authorization for that exact material PR/head → merge to main → GitHub-hosted deployment → Android/PWA acceptance`

Do not invent a local checkout path. Do not tell the user to run local Git, Node, Python, or server commands unless they explicitly choose to create a local clone later.

---

# 2. Current Released Baseline

**Current released source baseline: v6.4.0 on `main`.**

PR #9 — **Plot Twist v6.4: plain, human game language** — was explicitly authorized by the user and merged on 2026-08-24 America/Vancouver time.

Exact merged PR head:

`a56bbb6ef17a24f0a83b1c4c16c5e393be283cff`

Merge commit:

`5aae49969450fe0d8ecfd104fccd1c0bc9a7c43a`

Immediately before merge, GitHub was re-fetched and verified:

- PR #9 was open and mergeable
- exact head matched the authorized SHA
- `Validate Plot Twist` run #60, run ID `32810044880`, completed successfully on that exact SHA
- JavaScript syntax checks passed
- `validate-content.cjs` passed
- `validate-runtime.cjs` passed
- `validate-language.cjs` passed
- submitted reviews: none
- inline review threads: none
- PR comments/blockers: none
- base `main` remained `1d3c0d00764549efd13c1b8468ade3a63ac2a576`
- this handoff was current on the PR head

The PR was taken out of draft without changing the head SHA and merged with `expected_head_sha` pinned to the verified head.

After merge, `main` was verified at:

`5aae49969450fe0d8ecfd104fccd1c0bc9a7c43a`

before this post-merge handoff edit.

Important Git self-reference limitation: this handoff edit creates a newer `main` commit, so the SHA above is the verified merge baseline, not necessarily the current head after this file update. Fresh sessions must always re-fetch live `main`.

## Previous material releases

- PR #6 / v6.3.1 deep code and workflow audit: merged head `33838c46a3c48244c0eb75ed3467d780cd397ba3`, merge commit `0d7a102e73aba9999cb26c436a4a80c5439df2c7`
- PR #5 / v6.3 consistency layer: merged head `94fac2411bdfdcbe89e563c4263588773bec3406`, merge commit `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`
- PR #4 / v6.2 prominent choices + 200 Real-World Examples: merged head `34a5fd3dec48e0651a67ced093a15917887f999a`, merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- PR #3 / visible app version: merged as `f90afb2d3096763af555cf2110a5a2d539a5e5a1`
- PR #2 / rewrite all 200 cards as true two-sided dilemmas: relevant merged history commit `2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

There is currently **no active material development PR** after PR #9 merge.

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
- GitHub-hosted static deployment / Pages
- GitHub Actions validation

Deliberately absent:

- framework
- bundler/build step
- package-manager runtime dependencies
- backend/database/authentication
- runtime APIs/CDNs
- remote fonts/images
- analytics

## Main runtime files

- `index.html`
- `styles.css`
- `categories.css`
- `game-v6.2.css` — side-by-side A-vs-B presentation
- `game-v6.3.css` — One Last Thing presentation
- `cards.js` — shared card array + Chaos prompts
- `deck-a.js` through `deck-h.js` — 200 authored cards
- `categories.js`
- `language-polish.js` — v6.4 final player-facing wording layer
- `app.js` — navigation, state, persistence, install, wake lock, service-worker handling
- `choice-ui.js` — sole owner of choice label/reason formatting
- `history-ui.js` — Real-World Example rendering only
- `consistency-ui.js` — deterministic One Last Thing layer
- `history-a.js` through `history-d.js`
- `history-reviewed.js`
- `manifest.webmanifest`
- `sw.js`

## Validation and documentation files

- `validate-content.cjs`
- `validate-runtime.cjs`
- `validate-language.cjs`
- `PLAIN_LANGUAGE_NOTES.md`
- `.github/workflows/validate.yml`
- `.github/dependabot.yml`
- `README.md`
- `VALIDATION.md`
- `docs/DEVELOPMENT_HANDOFF.md`

---

# 4. Card and Data Contracts

Exactly 200 cards with stable internal IDs 1–200.

Each card contains:

- `id`
- `title`
- `vibe`
- `scenario` — exactly two non-empty paragraphs
- `prompt`
- `choices` — exactly two
- `twist`
- `conclusion` — shown as The Point
- `afterPrompt`
- `hostPrompts` — exactly two
- `categories` — one or two valid IDs

Internal IDs are compatibility/mapping keys and must not be shown to players.

## Categories

Six IDs:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

`Mix Everything` represents the full deck.

Rules:

- selecting specific categories removes Mix Everything
- removing the last specific category restores Mix Everything
- multiple categories form a union without duplicate cards
- Start and Random respect the current category selection
- active runs keep their original `runCategories` context
- Saved playback is independent of the current home filter

## Real-World Examples

Exactly one runtime example maps to every card ID 1–200.

Load precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js` loaded afterward and authoritative for overridden IDs

Research ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

Accuracy and exact analogy fit outrank fame. Prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical.

Do not remove `history-reviewed.js` as redundant. It intentionally overrides weaker draft mappings.

Card 184 intentionally uses the UC Berkeley graduate-admissions / Simpson's paradox example instead of the weaker polio/ice-cream anecdote.

---

# 5. Product and Editorial Rules

## Two-sided dilemma rule

Every card must offer two genuinely reasonable choices before the reveal.

Do not create:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- pre-reveal `it depends` escape
- Plot Twist that only repeats the setup
- reveal that merely congratulates one side

Target:

`two reasonable choices → commitment → new information that matters → reconsider → clear principle`

Switching sides after the reveal is explicitly allowed.

## The Point

The Point should land a clear, understandable principle. It does not need to pretend both sides remain equally good after the new information.

Avoid essay-like summaries.

## Hidden source layer

The player-facing game must not expose the hidden authoring/source-worldview layer.

`validate-content.cjs` enforces protected terminology and meta-authoring leak checks.

Do not weaken those checks merely to make new content pass.

## Choice presentation

Keep:

- two side-by-side columns
- center divider
- VS marker
- prominent choice label
- smaller reason

## Reveal order

After reveal:

`Plot Twist → The Point → follow-up question → Real-World Example → One Last Thing → Keep Talking`

## No scoring / visible correct-answer system

Do not add moral scores, ideology scores, visible right/wrong answers, or grading mechanics.

---

# 6. v6.4 Plain-Language Standard

The user's explicit requirement for v6.4 was that the game become:

- more human
- casual
- understandable
- conversational
- real

The requirement is **not** to make the ideas shallow. It is to remove unnecessary difficulty from the wording.

Core rule from `PLAIN_LANGUAGE_NOTES.md`:

> **Would a regular person naturally say or understand this out loud on the first read?**

If not, rewrite it.

Preferred voice:

- short, direct sentences
- familiar everyday words
- one idea at a time
- conversational questions
- concrete examples before abstract labels
- humour that sounds natural when read aloud

Avoid:

- academic/debate-club wording
- unnecessary legalistic phrasing
- jargon
- stacked metaphors
- sentences that need rereading
- clever writing that hides the actual choice

Plain language is now part of **correctness**, not a one-time style preference.

## `language-polish.js`

v6.4 adds a runtime language layer that runs after deck/history/category data and before `app.js` renders it.

Required loading order:

`deck/history data → categories.js → language-polish.js → app.js → presentation helpers`

It applies approved player-facing wording across:

- scenarios
- prompts
- choices
- Plot Twists
- The Point
- follow-up questions
- extra questions
- Real-World Example text

It combines:

1. general formal-to-everyday phrase replacements
2. targeted rewrites where simple replacement is not enough

Examples of wording intentionally simplified include concepts previously expressed with terms such as:

- epistemic / epistemically
- provenance
- corroboration
- falsifiability
- universalization
- causal inference
- empirical
- normative
- methodology
- substantive
- proposition / premise

Representative targeted readability rewrites include cards 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 26, 34, 51, 72, 107, 131, 152, 153, and 200.

`language-polish.js` is an essential runtime asset and must remain precached.

## Player-shell simplification

Examples introduced in v6.4:

- `START SELECTED MIX` → `START GAME`
- `RANDOM FROM SELECTED` → `SURPRISE ME`
- `RESUME GAME` → `KEEP PLAYING`
- `REVEAL PLOT TWIST` → `SHOW THE TWIST`
- `Where This Can Go` → `Keep Talking`
- visible `Host Prompts` → `Extra Questions`

How to Play was rewritten into short ordinary instructions.

## Chaos

The 16 optional Chaos prompts remain playful pressure tests but now use simpler labels/questions.

Examples:

- `SWITCH SIDES`
- `SHOW YOUR RECEIPTS`
- `WHERE DID THAT COME FROM?`
- `SAME RULE`
- `NOBODY IS WATCHING`
- `BET $10,000`
- `WHAT DOES THAT WORD MEAN?`
- `WHO BENEFITS?`
- `FAULT VS FIXING IT`
- `MAKE YOUR SIDE LOOK BAD`
- `FIND ONE EXCEPTION`
- `WHAT HAPPENS NEXT?`
- `REMOVE THE LABELS`

## One Last Thing

Eight deterministic prompts remain assigned by stable card ID using:

`(current.id - 1) % TESTS.length`

Current player-facing titles:

1. `SAME RULE?`
2. `WHAT WOULD CHANGE YOUR MIND?`
3. `WHAT IF YOU HATED THE RESULT?`
4. `WHAT IF THEY WERE STRANGERS?`
5. `WOULD YOU LET EVERYONE USE IT?`
6. `WHAT IF IT WAS YOU?`
7. `WHAT IF THE POWER FLIPPED?`
8. `SAME RULE SOMEWHERE ELSE?`

---

# 7. Persistence and Compatibility

Stable anchors:

- localStorage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`
- stable card IDs 1–200
- `HISTORICAL_EXAMPLES[id]` aligned to those IDs

State includes, among other things:

- active order
- position
- reveal state
- Saved IDs
- selected categories
- active `runCategories`
- settings

v6.4 is a language/UI release and does not justify clearing or replacing compatible state.

Do not bump `masterpiece-200-v1` merely for wording or asset refreshes.

Do not recommend clearing site data as the normal update path because doing so destroys Saved cards, settings, category choices, and current state and undermines compatibility testing.

Visible Settings version:

`v6.4.0`

Service-worker cache:

`plot-twist-v6.4.0`

---

# 8. PWA / Offline Rules

Offline-first is non-negotiable.

`sw.js` must precache every essential local runtime dependency, including `language-polish.js`.

Cache safety introduced in v6.3.1 must remain:

- `CACHE_PREFIX = 'plot-twist-'`
- delete only old Plot Twist caches
- never delete unrelated caches on the shared GitHub Pages origin
- same-origin/scope runtime caching only
- named-current-cache reads/writes
- awaited `cache.put()`
- navigation fallback to cached `index.html`

Whenever runtime files are added or renamed, inspect together:

- `index.html`
- `sw.js`
- `validate-content.cjs`
- `validate-runtime.cjs`

After the service worker updates, the installed Android PWA must pass a full airplane-mode relaunch test.

A merge to `main` makes source eligible for hosted deployment, but an installed PWA can temporarily remain on an older cache until GitHub Pages publishes the source and Chrome completes the service-worker lifecycle. Always verify **Settings → App Version** on the physical device.

---

# 9. v6.3.1 Runtime Audit Fixes That Must Not Regress

The deep audit found and fixed concrete defects. Preserve these protections.

## Service worker / offline

- old activation logic could delete unrelated caches on the shared origin; cleanup is now Plot-Twist-prefix scoped
- runtime cache reads/writes use the current Plot Twist cache
- runtime caching is same-origin and service-worker-scope restricted
- runtime `cache.put()` writes are awaited
- uncached offline failures return an explicit error response
- online startup attempts service-worker update/activation before reporting offline cache ready, while an already-active worker can still support offline launch when the network is unavailable

## State / run semantics

- persisted card IDs are validated and deduplicated
- persisted settings, mode, and position are normalized
- blocked/unavailable localStorage writes do not crash in-memory gameplay
- completed runs advance to an explicit end position and do not reappear as resumable on the final card
- active runs keep `runCategories` so labels and replay do not drift when home filters change
- PLAY AGAIN is mode-aware: Saved runs replay Saved cards; normal/random runs replay the original run-category snapshot

## Interaction / module ownership

- duplicate wake-lock acquisition is prevented
- Chaos supports Escape dismissal, focus transfer on open, and focus restoration on close
- `history-ui.js` does not duplicate `choice-ui.js` formatting logic

---

# 10. Validation and GitHub Workflow

Workflow:

`.github/workflows/validate.yml`

Environment:

- `ubuntu-latest`
- Node.js 22 for project checks

Workflow hardening:

- `actions/checkout` pinned to an immutable SHA
- `actions/setup-node` pinned to an immutable SHA
- `contents: read`
- checkout `persist-credentials: false`
- manual `workflow_dispatch`
- concurrency cancellation for superseded runs
- 10-minute job timeout
- weekly Dependabot maintenance for GitHub Actions

CI runs three complementary gates:

1. `validate-content.cjs`
2. `validate-runtime.cjs`
3. `validate-language.cjs`

## `validate-content.cjs`

Checks include:

- exactly 200 cards
- complete/unique IDs 1–200
- required schema
- exactly two scenario paragraphs
- exactly two distinct substantive choices
- no `it depends` escape
- loaded-choice wording lint
- substantive Plot Twists
- valid categories
- exactly 200 substantive Real-World Examples
- required runtime assets loaded and precached
- choice/history/consistency ordering and presentation contracts
- protected terminology/meta-authoring leak checks
- v6.4 version/cache/deck compatibility wiring

Do not weaken this validator merely to make a branch pass.

## `validate-runtime.cjs`

Checks include:

- version and stable state compatibility
- Plot Twist-only cache cleanup
- service-worker scope/origin isolation
- awaited runtime cache writes
- APP_SHELL validity
- local HTML/manifest assets exist and are precached
- manifest installation contract
- DOM IDs and screen/action/category routing
- state normalization
- end-of-run handling
- `runCategories` and replay semantics
- wake-lock duplicate protection
- Chaos keyboard/focus behaviour
- service-worker update lifecycle wiring
- module ownership between choice/history UI
- `language-polish.js` load order and precache
- GitHub Actions hardening

## `validate-language.cjs`

Checks the final player-facing data **after `language-polish.js` runs**.

It rejects selected formal/jargon wording and enforces readability guardrails.

Current limits:

- scenario/twist sentence: max 34 words
- conclusion sentence: max 30 words
- prompt/choice/extra-question sentence: max 26 words
- Real-World Example sentence: max 38 words
- main prompt: max 24 total words
- follow-up: max 28 total words
- choice: max 18 total words

These limits are safeguards, not proof that the writing actually sounds good.

## v6.4 language CI history

Initial integrated run #56 passed content/runtime validation but the language gate found nine overlong passages:

- card 26 scenario
- card 34 scenario
- card 51 scenario
- card 72 conclusion
- card 107 twist
- card 131 twist
- card 152 conclusion
- card 153 conclusion
- card 200 twist

Those nine were rewritten instead of exempted or weakening the validator.

Run #57 then passed all three gates on implementation head `3dd83e7c0ac31b1e9a5b52248375d24a681748f9`.

Final exact-head run #60 passed all three gates on merged PR head `a56bbb6ef17a24f0a83b1c4c16c5e393be283cff`.

Static CI does not replace physical Android/PWA acceptance or human read-aloud language review.

---

# 11. Git and Pull Request Safety Rule

`main` is the released baseline. Material development occurs on feature branches and PRs.

**Never merge a material PR without the user's explicit authorization for that specific PR and the exact revalidated head.**

Immediately before an authorized merge:

1. re-fetch PR
2. confirm exact current head SHA
3. confirm CI success on that exact SHA
4. confirm mergeability
5. check submitted reviews
6. check inline review threads
7. check PR comments/blockers
8. verify this handoff is current
9. merge only the exact verified head with `expected_head_sha`

If the branch changes after approval, prior approval does not automatically cover the new head. Revalidate and reconfirm authorization for the new head.

After merge:

1. verify resulting `main`
2. confirm intended PR is in `main`
3. update this handoff when release baseline or next step changes
4. do not give local-repository commands to the user
5. verify hosted Settings version
6. conduct Android/PWA acceptance

---

# 12. Current Unresolved / Acceptance Gates

There is no known open code blocker after PR #9 merge.

The remaining release task is **hosted Android v6.4.0 acceptance**, especially the new conversational language.

Do not clear site data during normal testing.

Acceptance checklist:

1. Open the hosted Plot Twist app while online.
2. Settings shows `v6.4.0`.
3. Existing Saved cards/settings/category choices/current compatible state survive the update.
4. Home buttons and How to Play make sense without explanation.
5. Read cards aloud across all six categories.
6. Scenarios are understandable on the first read.
7. Choices are immediately clear.
8. Plot Twists do not require rereading.
9. The Point sounds like normal speech rather than an essay.
10. Real-World Examples remain accurate and easy to follow.
11. One Last Thing sounds conversational.
12. Chaos sounds playful and obvious rather than technical.
13. Extra Questions sound like things real people would actually ask.
14. Existing category/filter/resume/replay/Saved/wake-lock behaviour remains correct.
15. Finish a run and verify completed-run Resume/replay behaviour still matches v6.3.1 fixes.
16. Fully close the app.
17. Enable airplane mode and turn Wi-Fi off.
18. Relaunch the installed PWA from its icon.
19. Confirm the v6.4 wording and full gameplay work offline.
20. Close/reopen again while offline and verify state restoration.

The final language test is qualitative:

> **Does this sound like a real person talking?**

---

# 13. Exact Continuation Point

## Exact Next Step

A fresh development session must:

1. Fetch live `main` and verify it descends from v6.4 merge commit `5aae49969450fe0d8ecfd104fccd1c0bc9a7c43a`.
2. Confirm there is no newer active material PR before starting new work.
3. Treat v6.4.0, `plotTwistStateV4`, `masterpiece-200-v1`, IDs 1–200, and the plain-language standard as the current baseline.
4. Have the user verify **Settings → App Version** on the hosted Android PWA; expected version is `v6.4.0`.
5. If the device still shows an older version, diagnose GitHub Pages/service-worker update behaviour non-destructively. Do **not** clear site data as the first step.
6. Once v6.4.0 is visible, run the Android/read-aloud acceptance checklist above.
7. Treat any wording that feels unnatural, formal, confusing, or hard to read aloud as a real product defect even if CI passes.
8. If new changes are needed, create a new feature branch/PR, update this handoff before merge, require all three validators, and follow the exact-head authorization rule.

## Git self-reference note

A static file cannot contain the SHA of the commit that contains its own final edit because changing the file changes the commit hash. Therefore always re-fetch GitHub for the live current `main`/PR SHA rather than treating a SHA written inside this document as self-current.
