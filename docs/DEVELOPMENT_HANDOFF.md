# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> **`docs/DEVELOPMENT_HANDOFF.md` is the authoritative continuity document for this project. Every material development PR must update this file before merge. The update must reflect the actual final repository state, completed work, important decisions, compatibility rules, tests, unresolved issues, and the exact next step.**
>
> **Current repository code and freshly verified GitHub state outrank this document. If this handoff is stale, verify GitHub and correct the handoff immediately. Do not rely on ChatGPT conversation history as the durable project state.**

---

# 1. Project Identity

## Project

**Plot Twist**

Repository: `detratech/plot-twist`

Default branch: `main`

Repository is public and the app is distributed as a GitHub-hosted static PWA / GitHub Pages style deployment.

Plot Twist is an offline-first Android-oriented social scenario/campfire game for camping trips, game nights, travel, and casual group discussion.

The game must feel like something normal adults can pick up and play around a table. It must not feel like a classroom exercise, survey, formal debate tool, philosophy app, religious app, or academic test.

Current player flow:

`scenario → choose one of two reasonable positions → say why → reveal Plot Twist → reconsider/switch → The Point → follow-up question → Real-World Example → One Last Thing: short answer → Keep Talking`

## User workflow

**The user does not maintain a local Plot Twist repository.**

Normal workflow:

`GitHub repository → feature branch/PR → GitHub Actions → explicit user authorization for that exact material PR/head → merge to main → GitHub-hosted deployment → Android/PWA acceptance`

Do not invent a local checkout path. Do not tell the user to run `git pull`, Node, Python, npm, or a local server unless they explicitly choose to create a local clone later.

---

# 2. Current Released Baseline

**Current released source baseline: v6.4.1 on `main`.**

PR #10 — **Plot Twist v6.4.1: make One Last Thing answer the follow-up** — was explicitly authorized by the user and merged on 2026-08-24 America/Vancouver time.

Exact merged PR head:

`62a7dbf964fde4637b4441af514e7c1852220bb6`

Merge commit:

`8dfecdacefd9d4a48bfce7b32e5dd211443c9c1f`

Immediately before merge, GitHub was re-fetched and verified:

- PR #10 was open and mergeable
- exact current head was `62a7dbf964fde4637b4441af514e7c1852220bb6`
- base `main` remained `2a0034fd45ba1e1c084030c501d08a1d67234443`
- `Validate Plot Twist` run #64, run ID `32812344266`, succeeded on that exact head
- JavaScript syntax checks passed
- `validate-content.cjs` passed
- `validate-runtime.cjs` passed
- `validate-language.cjs` passed
- submitted reviews: none
- inline review threads: none
- PR comments/blockers: none
- this handoff was current on the PR head

The PR was marked ready for review without changing its head and merged with `expected_head_sha` pinned to the verified head.

After merge, `main` was verified at:

`8dfecdacefd9d4a48bfce7b32e5dd211443c9c1f`

before this post-merge handoff edit.

This handoff edit creates a newer `main` commit. Future sessions must always re-fetch live `main` rather than treating the merge SHA above as the permanent branch head.

## Previous material releases

- PR #9 / v6.4 plain, human game language: merged head `a56bbb6ef17a24f0a83b1c4c16c5e393be283cff`, merge commit `5aae49969450fe0d8ecfd104fccd1c0bc9a7c43a`
- PR #6 / v6.3.1 deep code and workflow audit: merged head `33838c46a3c48244c0eb75ed3467d780cd397ba3`, merge commit `0d7a102e73aba9999cb26c436a4a80c5439df2c7`
- PR #5 / v6.3 consistency pressure tests: merged head `94fac2411bdfdcbe89e563c4263588773bec3406`, merge commit `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`
- PR #4 / v6.2 prominent choices + 200 Real-World Examples: merged head `34a5fd3dec48e0651a67ced093a15917887f999a`, merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- PR #3 / visible app version: merge commit `f90afb2d3096763af555cf2110a5a2d539a5e5a1`
- PR #2 / rewrite all 200 cards as true two-sided dilemmas: relevant merged history commit `2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

There is currently **no active material development PR** after PR #10 merge.

---

# 3. v6.4.1 Product Correction: One Last Thing

## User requirement

After v6.4, the user reported that **One Last Thing did not make sense** and clarified the intended flow:

1. The card asks a follow-up question after The Point.
2. The Real-World Example gives concrete context.
3. **One Last Thing should then answer that follow-up question.**
4. It should not introduce a second unrelated pressure-test question.

This is a product-flow rule, not merely a wording preference.

## Current implementation

File:

`consistency-ui.js`

The legacy filename remains, but its v6.4.1 responsibility is now the **One Last Thing short-answer presentation**.

The old v6.3/v6.4 behaviour was removed:

- no eight-item generic `TESTS` bank
- no `(current.id - 1) % TESTS.length`
- no normal-flow rotating role-reversal/outcome/stranger/power-flip question

Current behaviour:

1. keep visible label `ONE LAST THING`
2. show heading `THE SHORT ANSWER`
3. identify the currently displayed card
4. derive a concise close from that card's own `conclusion` / The Point
5. display it after the Real-World Example
6. do not ask another generic question

Current helper:

`shortAnswer(card)`

Selection rules:

- one-sentence conclusion → use it
- multi-sentence conclusion → prefer the final meaningful sentence
- if the final sentence is unusually short → use the final two sentences together

How to Play now explicitly explains that One Last Thing gives the short answer to the question after the example.

## Permanent rule

**One Last Thing is an answer step, not a second question step.**

Required relationship:

`follow-up question → Real-World Example → One Last Thing short answer`

Do not reintroduce the removed rotating question bank unless the product decision is explicitly reversed in a future PR.

The consistency ideas can still appear in optional Chaos or another future mechanic, but not as a replacement for the answer step.

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
- GitHub-hosted static deployment
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
- `game-v6.3.css` — One Last Thing presentation styling
- `cards.js` — shared card array + Chaos prompts
- `deck-a.js` through `deck-h.js` — 200 authored cards
- `categories.js`
- `language-polish.js` — player-facing plain-language layer
- `app.js` — navigation, state, persistence, install, wake lock, service-worker handling
- `choice-ui.js` — sole owner of choice label/reason formatting
- `history-ui.js` — Real-World Example rendering only
- `consistency-ui.js` — One Last Thing short-answer presentation
- `history-a.js` through `history-d.js`
- `history-reviewed.js`
- `manifest.webmanifest`
- `sw.js`

## Validation/documentation files

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

# 5. Card and Data Contracts

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
- `categories` — one or two valid category IDs

Internal IDs are compatibility/mapping keys and must never be displayed to players.

## Categories

Six category IDs:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

`Mix Everything` represents the full deck.

Rules:

- selecting a specific category removes Mix Everything
- deselecting the last specific category restores Mix Everything
- multi-category selection forms a union without duplicate cards
- Start and Random respect the active filter
- active runs preserve their original `runCategories`
- Saved playback is independent of the current home filter

## Real-World Examples

Exactly one substantive runtime example maps to every card ID 1–200.

Runtime precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js` loaded afterward and authoritative for overridden IDs

Do not delete `history-reviewed.js` as apparent duplication. It intentionally overrides selected weaker mappings.

Reviewed override IDs include:

11, 21, 22, 27, 34, 35, 39, 48, 55, 57, 82, 91, 98, 104, 107, 112, 117, 118, 126, 129, 131, 139, 143, 148, 156, 160, 169, 171, 172, 175, 179, 184, 187, 189, 196, 200.

Research ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

Accuracy and exact analogy fit outrank fame. Prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical.

Card 184 intentionally uses the 1973 UC Berkeley graduate-admissions / Simpson's paradox example rather than the weaker polio/ice-cream anecdote.

Important later mappings retained from the research audit include:

- 176 NFL pass-interference replay rule
- 177 HRSA/OPTN liver MELD/PELD timeline
- 178 National Army Museum Christmas Truce
- 179 SEC WorldCom / Cynthia Cooper
- 180 George Waring / NYC sanitation
- 181 Quebec pro-natalist payments and subsidized childcare
- 182 Iceland fathers' leave quota
- 183 Federal Reserve history on redlining
- 184 UC Berkeley admissions / Simpson's paradox
- 185 USADA Armstrong / Livestrong
- 186 FBI Richard Jewell Atlanta history
- 187 Moritz v. Commissioner
- 188 Nieman Lab Boston Marathon misidentification
- 189 Library of Congress Gandhi / Salt March
- 190 Royal Museums Greenwich Black Tot
- 191 Larrey triage
- 192 NLM aspirin
- 193 Natural History Museum Piltdown
- 194 UK Parliament abolition dates
- 195 Franck Report
- 196 International Encyclopedia WWI July Crisis
- 197 NASA Rogers Commission / Feynman O-ring demo
- 198 UCLA Library Murrow
- 199 NPS Carnegie libraries / Homestead
- 200 Darwin Correspondence Project routine at Down House

---

# 6. Product and Editorial Rules

## Two-sided dilemma rule

Every card must begin with two genuinely defensible choices. A thoughtful adult should be able to defend either side before the reveal.

Do not create:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- pre-reveal `it depends` escape
- Plot Twist that only repeats the setup
- reveal that merely congratulates one side

Target:

`two reasonable choices → commitment → new information that matters → reconsider → clear principle`

Changing sides after the reveal is explicitly allowed.

## The Point

The Point should land a clear, understandable principle. It does not need to pretend both sides remain equally good after the reveal.

Avoid essay-like summaries.

## Plain-language rule

The user's standing requirement is that the game sound:

- human
- casual
- understandable
- conversational
- real

The ideas can stay deep. The wording must not make them harder than necessary.

Core rule from `PLAIN_LANGUAGE_NOTES.md`:

> **Would a regular person naturally say or understand this out loud on the first read?**

If not, rewrite it.

Prefer:

- short direct sentences
- familiar everyday words
- one idea at a time
- conversational questions
- concrete examples before abstract labels
- humour that sounds natural when spoken

Avoid:

- academic/debate-club wording
- unnecessary legalistic phrasing
- jargon
- stacked metaphors
- sentences that need rereading
- clever wording that hides the actual choice

Plain language is part of correctness, not a one-time cleanup preference.

## Hidden source layer

The player-facing runtime must not expose the hidden authoring/source-worldview layer.

`validate-content.cjs` enforces protected terminology and meta-authoring leak checks.

Do not weaken those checks merely to make content pass.

## Choice presentation

Keep:

- two side-by-side columns
- center divider
- `VS`
- prominent decision label
- smaller reason

## No scoring / visible correct-answer system

Do not add moral scores, ideology scores, visible right/wrong answers, or grading mechanics.

---

# 7. Plain-Language Runtime Layer

File:

`language-polish.js`

Required load order:

`deck/history → categories.js → language-polish.js → app.js → presentation helpers`

It applies approved player-facing wording across:

- scenarios
- prompts
- choices
- Plot Twists
- The Point
- follow-up questions
- extra questions
- Real-World Example text

It combines general formal-to-everyday phrase replacements with targeted per-card rewrites.

Examples of terms intentionally simplified include:

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

Representative targeted readability rewrites include cards:

1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 26, 34, 51, 72, 107, 131, 152, 153, 200.

`language-polish.js` is an essential runtime asset and must remain precached.

---

# 8. Persistence and Compatibility

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

Current version:

- visible Settings version: `v6.4.1`
- service-worker cache: `plot-twist-v6.4.1`

Do not bump `masterpiece-200-v1` merely for wording, UI, or asset refreshes.

Do not recommend clearing site data as the normal update path. Doing so destroys Saved cards, settings, category choices, and current state and undermines compatibility testing.

---

# 9. PWA / Offline Rules

Offline-first is non-negotiable.

`sw.js` must precache every essential local runtime dependency, including `language-polish.js` and `consistency-ui.js`.

Cache safety introduced in v6.3.1 must remain:

- `CACHE_PREFIX = 'plot-twist-'`
- delete only old Plot Twist caches
- never delete unrelated caches on the shared origin
- same-origin/scope runtime caching only
- current named-cache reads/writes
- awaited `cache.put()`
- navigation fallback to cached `index.html`

Whenever runtime assets change, inspect together:

- `index.html`
- `sw.js`
- `validate-content.cjs`
- `validate-runtime.cjs`

After a new service worker activates, the installed Android PWA must pass a full airplane-mode relaunch test.

A merge to `main` makes source eligible for deployment, but the installed app can remain on an older cache until the hosted deployment finishes and Chrome completes the service-worker lifecycle. Always verify **Settings → App Version** on the physical device.

---

# 10. Runtime Audit Fixes That Must Not Regress

The v6.3.1 deep audit fixed concrete defects. Preserve them.

## Service worker / offline

- cleanup is scoped to `plot-twist-*` caches only
- unrelated origin caches must never be deleted
- runtime reads/writes use the current Plot Twist cache
- runtime caching is same-origin and service-worker-scope restricted
- runtime `cache.put()` writes are awaited
- uncached offline failures return an explicit error response
- online startup attempts service-worker update/activation before reporting offline cache ready
- an already-active worker can still support offline launch when the network is unavailable

## State / run semantics

- persisted card IDs are validated and deduplicated
- persisted settings, mode, and position are normalized
- localStorage write failures do not crash in-memory gameplay
- completed runs advance to an explicit end position and do not reappear as resumable on the final card
- active runs preserve `runCategories`
- PLAY AGAIN is mode-aware
- Saved runs replay Saved mode

## Interaction / ownership

- duplicate wake-lock acquisition is prevented
- Chaos supports Escape dismissal, focus transfer on open, and focus restoration on close
- `choice-ui.js` is the sole owner of choice formatting
- `history-ui.js` only renders the Real-World Example

---

# 11. Validation and GitHub Workflow

Workflow:

`.github/workflows/validate.yml`

Environment:

- `ubuntu-latest`
- Node.js 22

Workflow hardening:

- Actions pinned to immutable SHAs
- `contents: read`
- checkout `persist-credentials: false`
- manual `workflow_dispatch`
- concurrency cancellation for superseded runs
- 10-minute timeout
- weekly Dependabot maintenance for GitHub Actions

CI runs syntax checks plus three gates:

1. `validate-content.cjs`
2. `validate-runtime.cjs`
3. `validate-language.cjs`

## `validate-content.cjs`

Checks include:

- exactly 200 cards
- complete unique IDs 1–200
- required schema
- exactly two scenario paragraphs
- exactly two distinct substantive choices
- no `it depends` pre-reveal escape
- conservative loaded-choice wording checks
- substantive Plot Twists
- valid categories and category coverage
- exactly 200 substantive Real-World Examples
- required assets loaded and precached
- hidden source/meta terminology absent from player-facing content
- side-by-side choice presentation contract
- Real-World Example placement after the follow-up
- One Last Thing placement after the example
- v6.4.1 `THE SHORT ANSWER` contract
- answer builder uses the current card conclusion
- obsolete generic `TESTS` bank absent
- obsolete card-ID modulo selector absent
- visible version/cache/deck compatibility contract

Do not weaken this validator merely to make an edit pass.

## `validate-runtime.cjs`

Checks include:

- version and stable state compatibility
- safe Plot-Twist-only cache cleanup
- service-worker origin/scope isolation
- awaited runtime cache writes
- APP_SHELL validity
- HTML/manifest asset existence and precaching
- DOM IDs, ARIA references, screen/action/category routing
- state normalization
- completion/resume and replay semantics
- runCategories preservation
- wake-lock duplicate protection
- Chaos keyboard/focus behaviour
- service-worker lifecycle
- module ownership
- language layer load order/precache
- v6.4.1 One Last Thing answer behaviour
- absence of the old rotating `TESTS` bank/modulo selector
- GitHub Actions hardening and Dependabot

## `validate-language.cjs`

Checks the final player-facing wording after `language-polish.js` runs.

Guardrails include:

- scenario/twist sentence: max 34 words
- conclusion sentence: max 30 words
- prompt/choice/extra-question sentence: max 26 words
- Real-World Example sentence: max 38 words
- main prompt: max 24 words total
- follow-up: max 28 words total
- choice: max 18 words total
- selected academic/formal jargon rejected

Because One Last Thing derives from the validated conclusion, its short answer inherits the conclusion's plain-language guardrails.

Static validation does **not** prove that every short answer perfectly answers every follow-up. Human acceptance is still required.

---

# 12. Git and Pull Request Safety Rules

`main` is the released baseline. Material development occurs on feature branches and PRs.

**Never merge a material PR without explicit user authorization for that specific PR and the exact revalidated head.**

Immediately before an authorized merge:

1. re-fetch PR
2. verify exact current head SHA
3. verify CI passed on that exact SHA
4. verify mergeability
5. check submitted reviews
6. check inline review threads
7. check PR comments/blockers
8. ensure this handoff is current
9. merge only the exact verified head with `expected_head_sha`

If the branch changes after approval, prior approval does not automatically cover the new head. Revalidate and reconfirm authorization.

After merge:

1. verify resulting `main`
2. confirm intended PR is part of `main`
3. update this handoff if the released baseline or exact next step changed
4. do not give local-repository commands to the user
5. verify hosted Settings version
6. conduct Android/PWA acceptance

---

# 13. Current Unresolved Product Risk

The v6.4.1 implementation derives One Last Thing from the final sentence(s) of `card.conclusion`.

This fixes the structural mismatch created by the old rotating question bank, but one qualitative risk remains:

- a card's final conclusion sentence may state the correct principle without directly answering the exact wording of that card's `afterPrompt`

If physical sampling shows this on a meaningful number of cards, the next appropriate architecture is likely an explicit per-card `afterAnswer` field or answer mapping.

Do **not** restore generic consistency questions as the fix.

Do not prematurely add 200 new answer fields unless human acceptance shows the derived answer is insufficient. v6.4.1 intentionally uses the simplest coherent approach first.

---

# 14. Android / Human Acceptance for v6.4.1

This is now the exact next product gate.

After the hosted app updates:

1. Open Plot Twist online.
2. Confirm **Settings → App Version** shows `v6.4.1`.
3. Confirm existing Saved cards, settings, category choices, and compatible current state survive the update.
4. Play several cards across all six categories.
5. Confirm the follow-up question appears before the Real-World Example.
6. Confirm the Real-World Example appears immediately after that question.
7. Confirm One Last Thing appears after the example.
8. Confirm it says `THE SHORT ANSWER` rather than asking another generic test question.
9. For every sampled card, ask: **does this short answer actually respond to the follow-up question that was just asked?**
10. Record any card where the answer feels indirect, repetitive, or mismatched.
11. Confirm scenarios, choices, Plot Twists, The Point, examples, Chaos, and extra questions still sound natural on first read.
12. Confirm category filtering, Random, Saved, Resume, PLAY AGAIN, Settings, wake lock, and Chaos still work.
13. Fully close the installed PWA.
14. Enable airplane mode and turn Wi-Fi off.
15. Relaunch from the installed icon.
16. Verify v6.4.1 wording and full gameplay work offline.
17. Close/reopen again while still offline and confirm state restoration.

Do **not** clear site data during ordinary acceptance testing.

---

# 15. Exact Continuation Point

A fresh development session must:

1. Re-fetch live `main` from GitHub.
2. Read this handoff in full.
3. Treat v6.4.1 / PR #10 as the released source baseline.
4. Do not begin another structural rewrite merely because PR #10 merged.
5. First complete or collect the physical Android/read-aloud acceptance results described above.
6. Pay special attention to whether `THE SHORT ANSWER` directly answers the immediately preceding follow-up question across a representative sample of all six categories.
7. If isolated cards are weak, fix those cards specifically.
8. If a broad pattern of mismatch appears, design a new feature PR for explicit per-card `afterAnswer` content or an equivalent validated mapping.
9. Preserve `plotTwistStateV4`, `masterpiece-200-v1`, card IDs 1–200, offline-first behaviour, v6.3.1 runtime protections, and the v6.4 plain-language standard unless a future migration is deliberately designed.
10. Use the normal GitHub-only branch/PR/CI/explicit-authorization workflow for any material follow-up.

## Git self-reference note

This document cannot contain the SHA of the commit that contains its own final edit because changing the document changes the commit SHA. Always re-fetch GitHub for the live current `main` SHA.