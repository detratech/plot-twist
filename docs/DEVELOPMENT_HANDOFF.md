# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> **docs/DEVELOPMENT_HANDOFF.md is the authoritative continuity document for this project. Every material development PR must update this file before merge. The update must reflect the actual final state of the branch, completed work, important decisions, tests and validation, current GitHub state, unresolved issues, and the exact next step. A material development PR is not complete until the handoff is current.**
>
> **Current repository code and verified GitHub state outrank this document. If the handoff is discovered to be stale or incorrect, verify the repository and correct the handoff immediately rather than following stale instructions.**
>
> **Do not rely on ChatGPT conversation history as the durable source of project state. Important development context must be captured in this repository handoff.**

Update this file whenever architecture, product rules, wording standards, persistence compatibility, runtime behaviour, deployment, validation, PR state, unresolved issues, or the exact next step materially changes.

---

# 1. Project Identity

## Project

**Plot Twist**

Repository: `detratech/plot-twist`

Default branch: `main`

Repository: public, GitHub Pages enabled.

Plot Twist is an offline-first Android-oriented social scenario/campfire game.

Core player loop:

`scenario → choose one of two reasonable positions → say why → reveal Plot Twist → reconsider/switch → The Point → follow-up → Real-World Example → One Last Thing → Keep Talking`

The game should feel like something normal adults can pick up at a campfire or game night. It must not feel like a classroom exercise, formal debate tool, philosophy app, religious app, survey, or academic test.

## User workflow

**The user does not maintain a local Plot Twist repository.**

Normal workflow:

`GitHub repository → feature branch/PR → GitHub Actions → explicit user authorization for that exact material PR/head → merge to main → GitHub-hosted deployment → Android/PWA acceptance`

Do not invent a local checkout path. Do not tell the user to run local Git/Node/Python/server commands unless they explicitly choose to create a local clone later.

---

# 2. Released Baseline

**Current released source baseline on `main`: v6.3.1.**

Last verified `main` before the active v6.4 branch:

`1d3c0d00764549efd13c1b8468ade3a63ac2a576`

Commit message:

`Update handoff after v6.3.1 audit merge`

Its parent is the v6.3.1 audit merge commit:

`0d7a102e73aba9999cb26c436a4a80c5439df2c7`

## PR #6 — v6.3.1 deep audit

Exact merged PR head:

`33838c46a3c48244c0eb75ed3467d780cd397ba3`

Merge commit:

`0d7a102e73aba9999cb26c436a4a80c5439df2c7`

Exact-head CI before merge:

- workflow: `Validate Plot Twist`
- run #51
- run ID `32807029125`
- conclusion: success
- `validate-content.cjs`: success
- `validate-runtime.cjs`: success
- reviews: none
- inline review threads: none
- PR comments/blockers: none

Major v6.3.1 fixes:

- safe Plot-Twist-only service-worker cache cleanup
- same-origin/scope runtime cache isolation
- awaited runtime cache writes
- persisted-state normalization
- completed-run Resume bug fixed
- active `runCategories` snapshot added
- mode-aware PLAY AGAIN
- duplicate wake-lock prevention
- Chaos modal Escape/focus handling
- duplicate choice formatting removed from `history-ui.js`
- hardened GitHub Actions workflow
- new `validate-runtime.cjs`

Previous material releases:

- PR #5 / v6.3 consistency layer: merged head `94fac2411bdfdcbe89e563c4263588773bec3406`, merge commit `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`
- PR #4 / v6.2 prominent choices + 200 Real-World Examples: merged head `34a5fd3dec48e0651a67ced093a15917887f999a`, merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- PR #3 / visible app version: merged as `f90afb2d3096763af555cf2110a5a2d539a5e5a1`
- PR #2 / 200-card true dilemma rewrite: relevant merged history commit `2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

---

# 3. Active Development: PR #9 / v6.4 Plain Language

PR #9:

**Plot Twist v6.4: plain, human game language**

Branch:

`plain-language-v6.4`

Base:

`main`

Base SHA at PR creation:

`1d3c0d00764549efd13c1b8468ade3a63ac2a576`

State at this handoff edit:

- open
- draft
- unmerged
- most recently observed mergeable before the documentation edits

The user asked for the game's wording to become:

- more human
- casual
- understandable
- conversational
- real

The requirement is **not** to make the ideas shallow. It is to remove unnecessary difficulty from the language.

## Current v6.4 versioning

Visible Settings version on the branch:

`v6.4.0`

Service-worker cache:

`plot-twist-v6.4.0`

Compatibility anchors intentionally remain:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- stable internal card IDs 1–200

No state reset or migration is intended.

## v6.4 implementation

### `language-polish.js`

New runtime language layer.

Required loading order:

`deck/history data → categories.js → language-polish.js → app.js → presentation helpers`

It runs before rendering and applies approved player-facing wording across:

- scenarios
- prompts
- choices
- Plot Twists
- The Point
- follow-up questions
- extra questions
- Real-World Example text

It contains:

1. general formal-to-everyday phrase replacements
2. targeted rewrites for cards where general replacements are not enough

Examples of formal wording removed/simplified include:

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
- unnecessarily formal transition words and phrases

Representative targeted rewrites include cards 1, 2, 3, 4, 5, 6, 9, 10, 11, 12 and additional readability outliers 26, 34, 51, 72, 107, 131, 152, 153, and 200.

`language-polish.js` is an essential runtime asset and is precached by `sw.js`.

### UI shell simplification

Examples:

- `START SELECTED MIX` → `START GAME`
- `RANDOM FROM SELECTED` → `SURPRISE ME`
- `RESUME GAME` → `KEEP PLAYING`
- `REVEAL PLOT TWIST` → `SHOW THE TWIST`
- `Where This Can Go` → `Keep Talking`
- visible `Host Prompts` → `Extra Questions`

Home tagline now leads with the simple rule: choose a side, explain why, reveal the twist.

How to Play has been rewritten into short ordinary instructions.

### Chaos rewrite

The 16 optional Chaos prompts remain the same kind of pressure-test mechanic but use simpler labels/questions.

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

### One Last Thing rewrite

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

### Permanent writing standard

New file:

`PLAIN_LANGUAGE_NOTES.md`

Core rule:

> **Would a regular person naturally say or understand this out loud on the first read?**

If not, rewrite it.

Preferred voice:

- short direct sentences
- familiar everyday words
- one idea at a time
- conversational questions
- concrete examples before abstract labels
- humour that sounds natural when read aloud

Avoid:

- academic/debate-club wording
- unnecessary legalistic phrasing
- stacked metaphors
- jargon
- sentences that need rereading
- clever writing that hides the actual choice

This standard is now a permanent product rule, not a one-time cleanup preference.

---

# 4. Architecture

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
- `cards.js` — shared card array + Chaos
- `deck-a.js` through `deck-h.js` — 200 authored cards
- `categories.js`
- `language-polish.js` — v6.4 final player-facing wording layer
- `app.js`
- `choice-ui.js`
- `history-ui.js`
- `consistency-ui.js`
- `history-a.js` through `history-d.js`
- `history-reviewed.js`
- `manifest.webmanifest`
- `sw.js`

## Validation/docs files

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

# 5. Card/Data Contracts

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

## Historical examples

Exactly one runtime example per card ID 1–200.

Load precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js` overrides selected mappings

Research ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

Accuracy and exact analogy fit outrank fame. Prefer primary/official/academic/archival/court/museum/strong first-party sources where practical.

Do not remove `history-reviewed.js` as redundant. It intentionally overrides weaker draft mappings.

Card 184 intentionally uses the UC Berkeley graduate-admissions / Simpson's paradox example.

---

# 6. Product and Editorial Rules

## Two-sided dilemma

Every card must offer two genuinely reasonable choices before the reveal.

Do not create:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- pre-reveal `it depends` escape
- Plot Twist that just repeats the setup
- reveal that merely congratulates the intended side

Target:

`two reasonable choices → commitment → new information that matters → reconsider → clear principle`

Switching sides after the reveal is explicitly allowed.

## Plain language is now part of correctness

A card can be logically correct and still fail the product if normal people cannot comfortably understand it aloud.

Do not reintroduce abstract terminology merely because it is technically precise. Prefer ordinary words that preserve the idea.

If a technical term is truly necessary, explain the idea in normal speech rather than assuming the player knows the label.

## The Point

The Point should be direct and understandable. It does not need to pretend both sides remain equally good after the new information.

Avoid essay-like summaries.

## Hidden source layer

The player-facing game must not expose the hidden authoring/source-worldview layer.

`validate-content.cjs` enforces protected terms and meta-authoring leak checks.

Do not weaken those checks merely to make content pass.

## Choice layout

Keep:

- two side-by-side columns
- center divider
- VS marker
- prominent choice label
- smaller reason

## Example / consistency order

After reveal:

`Plot Twist → The Point → follow-up question → Real-World Example → One Last Thing → Keep Talking`

## No scoring/correct-answer UI

Do not add moral scores, ideology scores, visible right/wrong answers, or grading mechanics.

---

# 7. Persistence and Compatibility

Stable anchors:

- localStorage key `plotTwistStateV4`
- deck/state ID `masterpiece-200-v1`
- card IDs 1–200

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

Do not recommend clearing site data as the normal update path.

---

# 8. PWA / Offline Rules

Offline-first is non-negotiable.

Current v6.4 cache:

`plot-twist-v6.4.0`

`sw.js` must precache every essential local runtime dependency, now including `language-polish.js`.

Cache safety introduced in v6.3.1 must remain:

- `CACHE_PREFIX = 'plot-twist-'`
- delete only old Plot Twist caches
- never delete unrelated caches on the shared origin
- same-origin/scope runtime caching only
- named-current-cache reads/writes
- awaited `cache.put()`
- navigation fallback to cached `index.html`

Whenever runtime files are added/renamed, inspect together:

- `index.html`
- `sw.js`
- `validate-content.cjs`
- `validate-runtime.cjs`

Installed Android PWA must eventually pass a full airplane-mode relaunch test.

---

# 9. Validation

Workflow:

`.github/workflows/validate.yml`

Environment:

- `ubuntu-latest`
- Node.js 22 for project checks

Workflow hardening retained from v6.3.1:

- Actions pinned to immutable SHAs
- `contents: read`
- checkout `persist-credentials: false`
- manual `workflow_dispatch`
- concurrency cancellation
- 10-minute timeout
- weekly Dependabot for GitHub Actions

CI now runs three gates:

1. `validate-content.cjs`
2. `validate-runtime.cjs`
3. `validate-language.cjs`

## `validate-content.cjs`

Structural/product content contract, including:

- exactly 200 cards
- complete/unique IDs
- schema
- two scenario paragraphs
- two distinct choices
- no `it depends`
- substantive twists
- category validity
- exactly 200 examples
- required assets loaded/precached
- presentation ordering
- hidden terminology/meta-authoring checks
- v6.4 version/cache wiring
- required plain How to Play rules

## `validate-runtime.cjs`

Runtime/PWA/state/workflow contract, including:

- safe cache isolation
- awaited writes
- APP_SHELL validity
- manifest validity
- DOM and route targets
- state normalization
- end-of-run handling
- runCategories/replay semantics
- wake lock
- Chaos modal keyboard/focus
- service-worker lifecycle
- module ownership
- language layer load order/precache
- CI hardening

## `validate-language.cjs`

Checks the final data **after `language-polish.js` runs**.

It rejects selected formal/jargon words and enforces readability guardrails.

Current limits:

- scenario/twist sentence: max 34 words
- conclusion sentence: max 30 words
- prompt/choice/extra-question sentence: max 26 words
- Real-World Example sentence: max 38 words
- main prompt: max 24 total words
- follow-up: max 28 total words
- choice: max 18 total words

The limits are minimum safeguards, not proof that the writing sounds good.

## v6.4 CI history

### Run #56

Initial integrated v6.4 head:

`6054f5079641b033659420bdcce8835b12298f74`

Run ID:

`32809737764`

Results:

- syntax checks: pass
- content validator: pass
- runtime validator: pass
- language validator: fail

Language gate found nine remaining overlong passages:

- 26 scenario
- 34 scenario
- 51 scenario
- 72 conclusion
- 107 twist
- 131 twist
- 152 conclusion
- 153 conclusion
- 200 twist

Those nine were rewritten rather than exempted.

### Run #57

Exact head after the nine fixes:

`3dd83e7c0ac31b1e9a5b52248375d24a681748f9`

Run ID:

`32809840625`

Conclusion:

**success**

All three validators passed.

README/VALIDATION/handoff documentation commits occurred after run #57, so **run #57 is not the final merge CI**. Final exact-head CI must run after this handoff edit.

---

# 10. Git / PR Safety Rule

**Never merge a material PR without explicit user authorization for that specific PR and the exact revalidated head.**

Immediately before an authorized merge:

1. re-fetch PR
2. confirm exact current head SHA
3. confirm CI success on that exact SHA
4. confirm mergeability
5. check reviews
6. check inline review threads
7. check PR comments/blockers
8. verify this handoff is current
9. merge only the exact verified head with `expected_head_sha`

If the branch changes after approval, prior approval does not automatically cover the new head.

After merge:

1. verify resulting `main`
2. confirm intended PR is in `main`
3. update handoff if release baseline/next step changes
4. do not give local-repository commands to the user
5. verify hosted Settings version
6. conduct Android/PWA acceptance

---

# 11. Current Unresolved / Release Gates

## PR #9 final static verification

The implementation and docs are complete enough for final CI, but the exact head created by this handoff edit must be freshly fetched and validated.

Do not merge PR #9 based on run #57 alone because documentation commits changed the branch head afterward.

## Android v6.4 human-language acceptance

If PR #9 is eventually authorized, merged, and deployed:

1. Settings shows `v6.4.0`.
2. Existing Saved cards/settings/state survive the update.
3. Home buttons and How to Play make sense without explanation.
4. Read cards aloud across all six categories.
5. Scenarios are understandable on the first read.
6. Choices are immediately clear.
7. Plot Twists do not require rereading.
8. The Point sounds like normal speech rather than an essay.
9. Real-World Examples remain accurate and easy to follow.
10. One Last Thing sounds conversational.
11. Chaos sounds playful/obvious rather than technical.
12. Extra Questions sound like things real people would ask.
13. Existing category/filter/resume/replay/Saved/wake-lock behaviour remains correct.
14. Fully close app, enable airplane mode, turn Wi-Fi off, relaunch installed PWA.
15. Confirm v6.4 wording and full gameplay work offline.

The final language test is qualitative:

**Does this sound like a real person talking?**

---

# 12. Exact Continuation Point

## Exact Next Step

A fresh development session must:

1. Fetch live `main` and confirm it still matches/descends from the released v6.3.1 baseline.
2. Fetch PR #9 live from GitHub.
3. Get PR #9's exact current head SHA after this handoff commit.
4. Fetch GitHub Actions runs for that exact head.
5. Require all three gates to pass:
   - syntax/content
   - runtime/PWA/state
   - plain-language
6. If a language failure appears, fix the wording. **Do not loosen the language gate merely to pass.**
7. Check submitted reviews, inline review threads, and PR comments/blockers.
8. Keep PR #9 unmerged unless the user explicitly authorizes **PR #9** after this exact-head state exists.
9. If the user authorizes merge, re-run the full exact-head merge checklist immediately before merging.
10. After merge, verify `main`, update this handoff to make v6.4.0 the released baseline, then have the user verify the hosted Android PWA and its conversational tone without clearing site data.

## Git self-reference note

This document cannot contain the SHA of the commit that contains its own final edit because changing the document changes the commit SHA. Therefore the latest SHA written inside the file will always predate the commit containing that text. Always re-fetch GitHub for the live exact PR head.
