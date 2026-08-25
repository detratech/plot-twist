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

Repository is public and the application is distributed as a GitHub-hosted static PWA / GitHub Pages style deployment.

Plot Twist is an offline-first Android-oriented social scenario/campfire game for camping trips, game nights, travel, and casual group discussion.

The intended player experience is not a classroom exercise or formal debate tool. It should feel like a legitimate adult party/campfire game that normal people can pick up and understand without explanation.

Current intended flow for the v6.4.1 patch:

`scenario → choose one of two reasonable positions → say why → reveal Plot Twist → reconsider/switch → The Point → follow-up question → Real-World Example → One Last Thing: short answer → Keep Talking`

## User workflow

**The user does not maintain a local Plot Twist repository.**

Normal workflow:

`GitHub repository → feature branch/PR → GitHub Actions → explicit user authorization for that exact material PR/head → merge to main → GitHub-hosted deployment → Android/PWA acceptance`

Do not invent a local checkout path. Do not tell the user to run `git pull`, Node, Python, npm, or a local server unless the user explicitly chooses to create a local clone later.

---

# 2. Current Released Baseline

**Current released source baseline: v6.4.0 on `main`.**

Last verified `main` before the v6.4.1 patch branch was created:

`2a0034fd45ba1e1c084030c501d08a1d67234443`

That commit message is:

`Update handoff after v6.4 merge`

Its parent is the v6.4 merge commit:

`5aae49969450fe0d8ecfd104fccd1c0bc9a7c43a`

## PR #9 — v6.4 plain-language release

PR #9 title:

**Plot Twist v6.4: plain, human game language**

Exact merged PR head:

`a56bbb6ef17a24f0a83b1c4c16c5e393be283cff`

Merge commit:

`5aae49969450fe0d8ecfd104fccd1c0bc9a7c43a`

Immediately before merge, GitHub was re-fetched and verified:

- PR #9 was open and mergeable
- exact head matched the authorized SHA
- `Validate Plot Twist` run #60, run ID `32810044880`, succeeded on that exact SHA
- JavaScript syntax checks passed
- `validate-content.cjs` passed
- `validate-runtime.cjs` passed
- `validate-language.cjs` passed
- submitted reviews: none
- inline review threads: none
- PR comments/blockers: none
- base `main` had not moved
- this handoff was current on the PR head

The PR was taken out of draft without changing the head and merged with `expected_head_sha` pinned to the verified head.

## Previous material releases

- PR #6 / v6.3.1 deep code and workflow audit: merged head `33838c46a3c48244c0eb75ed3467d780cd397ba3`, merge commit `0d7a102e73aba9999cb26c436a4a80c5439df2c7`
- PR #5 / v6.3 consistency layer: merged head `94fac2411bdfdcbe89e563c4263588773bec3406`, merge commit `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`
- PR #4 / v6.2 prominent choices + 200 Real-World Examples: merged head `34a5fd3dec48e0651a67ced093a15917887f999a`, merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- PR #3 / visible app version: merged as `f90afb2d3096763af555cf2110a5a2d539a5e5a1`
- PR #2 / rewrite all 200 cards as true two-sided dilemmas: relevant merged history commit `2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

---

# 3. Active Development: PR #10 / v6.4.1 One Last Thing Fix

## User feedback that triggered this patch

After v6.4 was released, the user reported that **One Last Thing did not make sense**.

The user clarified the intended behaviour:

- the card asks a follow-up question immediately before the Real-World Example
- the Real-World Example should give the player concrete context
- **One Last Thing should then answer that follow-up question**
- One Last Thing should not introduce another unrelated pressure-test question

This is a product-flow correction, not merely a wording tweak.

## PR #10

Title:

**Plot Twist v6.4.1: make One Last Thing answer the follow-up**

Branch:

`fix-one-last-thing-answers-v6.4.1`

Base:

`main`

Base SHA at branch/PR creation:

`2a0034fd45ba1e1c084030c501d08a1d67234443`

PR number:

`#10`

State at the time this handoff was updated:

- open
- draft
- unmerged
- initial integrated head before this handoff edit: `9156680aca574b41ae62da7dbdf39eb8bd890570`
- this handoff commit changes the head again, so final exact-head CI must run after this edit

Do not merge PR #10 based on any CI run that predates this handoff update.

## v6.4.1 implementation

### `consistency-ui.js`

The old behaviour has been removed.

Previous v6.3/v6.4 behaviour:

- contained an eight-item generic `TESTS` bank
- chose one question using `(current.id - 1) % TESTS.length`
- therefore One Last Thing had no semantic relationship to the card's actual follow-up question

The v6.4.1 behaviour is:

1. keep the visible label `ONE LAST THING`
2. show heading `THE SHORT ANSWER`
3. find the currently displayed card
4. derive a concise answer from that card's own `conclusion` / The Point
5. place the section after the Real-World Example
6. do not ask another generic question

Current answer-selection helper:

`shortAnswer(card)`

It splits the card conclusion into sentences.

Rules:

- if there is one sentence, use it
- if there are multiple sentences, prefer the final sentence as the concise takeaway
- if that final sentence is unusually short, use the final two sentences together

This is intentionally simple and deterministic. It avoids inventing a second hidden content system while ensuring the close comes from the same card-specific reasoning already written into the Point.

Human acceptance is still required because a static validator cannot prove that every final sentence perfectly answers every follow-up question.

### How to Play

The v6.4.1 How to Play text now explicitly explains:

> **One Last Thing gives the short answer to that question after you have seen the example.**

### Version / PWA

Visible Settings version on the branch:

`v6.4.1`

Service-worker cache:

`plot-twist-v6.4.1`

Compatibility anchors intentionally remain unchanged:

- localStorage key `plotTwistStateV4`
- deck/state ID `masterpiece-200-v1`
- card IDs 1–200

No state reset or migration is intended.

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
- `language-polish.js` — v6.4 player-facing plain-language layer
- `app.js` — navigation, state, persistence, install, wake lock, service-worker handling
- `choice-ui.js` — sole owner of choice label/reason formatting
- `history-ui.js` — Real-World Example rendering only
- `consistency-ui.js` — despite the legacy filename, now owns the v6.4.1 One Last Thing short-answer presentation
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

Internal IDs are compatibility/mapping keys and must not be shown to players.

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

- selecting specific categories removes Mix Everything
- removing the last specific category restores Mix Everything
- multiple categories form a union without duplicate cards
- Start and Random respect the current category selection
- active runs keep their original `runCategories` context
- Saved playback is independent of the current home filter

## Real-World Examples

Exactly one substantive runtime example maps to every card ID 1–200.

Load precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js` loaded afterward and authoritative for overridden IDs

Do not remove `history-reviewed.js` as apparent duplication. It intentionally overrides selected weaker mappings.

Reviewed override IDs include:

11, 21, 22, 27, 34, 35, 39, 48, 55, 57, 82, 91, 98, 104, 107, 112, 117, 118, 126, 129, 131, 139, 143, 148, 156, 160, 169, 171, 172, 175, 179, 184, 187, 189, 196, 200.

Research ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

Accuracy and exact analogy fit outrank fame. Prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical.

Card 184 intentionally uses the 1973 UC Berkeley graduate-admissions / Simpson's paradox example instead of the weaker polio/ice-cream anecdote.

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

Do not write:

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

## One Last Thing v6.4.1 rule

**One Last Thing is now an answer step, not a second question step.**

Required relationship:

`follow-up question → Real-World Example → One Last Thing short answer`

Do not reintroduce the v6.3/v6.4 eight-question rotating consistency bank unless the product decision is explicitly reversed in a future PR.

Do not restore:

- `const TESTS = [...]`
- `(current.id - 1) % TESTS.length`
- generic role-reversal / outcome / stranger / power-flip questions inside the normal One Last Thing flow

Those ideas may still be used inside optional Chaos or future mechanics, but they should not replace the answer the user explicitly wants in One Last Thing.

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

# 7. Plain-Language Standard

The user explicitly required the game to become:

- more human
- casual
- understandable
- conversational
- real

The requirement is **not** to make the ideas shallow. It is to remove unnecessary difficulty from the language.

Core rule from `PLAIN_LANGUAGE_NOTES.md`:

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
- jargon
- stacked metaphors
- sentences that need rereading
- clever writing that hides the actual choice

Plain language is part of **correctness**, not a one-time style preference.

## `language-polish.js`

The runtime language layer runs after category processing and before `app.js`.

Required order:

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

It combines general phrase replacements with targeted per-card rewrites.

Examples of terms intentionally removed/simplified include:

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

Representative targeted rewrites include cards:

1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 26, 34, 51, 72, 107, 131, 152, 153, 200.

`language-polish.js` is an essential runtime asset and must remain precached.

---

# 8. Persistence and Compatibility

Stable anchors:

- localStorage key `plotTwistStateV4`
- deck/state ID `masterpiece-200-v1`
- card IDs 1–200
- `HISTORICAL_EXAMPLES[id]` aligned to those IDs

State includes, among other things:

- active order
- position
- reveal state
- Saved IDs
- selected categories
- active `runCategories`
- settings

Do not bump `masterpiece-200-v1` merely for wording, UI, or asset refreshes.

Do not recommend clearing site data as the normal update path because doing so destroys Saved cards, settings, category choices, and current state and undermines compatibility testing.

Current v6.4.1 branch version:

- visible Settings version: `v6.4.1`
- service-worker cache: `plot-twist-v6.4.1`

---

# 9. PWA / Offline Rules

Offline-first is non-negotiable.

`sw.js` must precache every essential local runtime dependency, including `language-polish.js` and the updated `consistency-ui.js`.

Cache safety introduced in v6.3.1 must remain:

- `CACHE_PREFIX = 'plot-twist-'`
- delete only old Plot Twist caches
- never delete unrelated caches on the shared origin
- same-origin/scope runtime caching only
- current named-cache reads/writes
- awaited `cache.put()`
- navigation fallback to cached `index.html`

Whenever runtime files are added or renamed, inspect together:

- `index.html`
- `sw.js`
- `validate-content.cjs`
- `validate-runtime.cjs`

After a new service worker activates, the installed Android PWA must pass a full airplane-mode relaunch test.

A merge to `main` makes source eligible for deployment, but an installed PWA may temporarily remain on an older cache until GitHub-hosted deployment finishes and Chrome completes the service-worker lifecycle. Always verify **Settings → App Version** on the physical device.

---

# 10. v6.3.1 Runtime Audit Fixes That Must Not Regress

The deep audit found and fixed concrete defects. Preserve these protections.

## Service worker / offline

- old activation logic could delete unrelated caches on the shared origin; cleanup is Plot-Twist-prefix scoped
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
- active runs preserve `runCategories` so labels and replay do not drift when home-screen filters change
- PLAY AGAIN is mode-aware: Saved runs replay Saved cards; normal/random runs replay the original run-category snapshot

## Interaction / ownership

- duplicate wake-lock acquisition is prevented
- Chaos supports Escape dismissal, focus transfer on open, and focus restoration on close
- `choice-ui.js` is the sole owner of choice formatting
- `history-ui.js` only renders the Real-World Example and does not duplicate choice behaviour

---

# 11. Validation and GitHub Workflow

Workflow:

`.github/workflows/validate.yml`

Environment:

- `ubuntu-latest`
- Node.js 22 for project checks

Workflow hardening:

- Actions pinned to immutable SHAs
- `contents: read`
- checkout `persist-credentials: false`
- manual `workflow_dispatch`
- concurrency cancellation for superseded runs
- 10-minute timeout
- weekly Dependabot maintenance for GitHub Actions

CI runs three gates after syntax checks:

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
- protected source-worldview/meta-authoring terminology absent from runtime content
- side-by-side choice presentation contract
- Real-World Example placement after the follow-up
- One Last Thing placement after the example
- v6.4.1 One Last Thing short-answer contract
- obsolete generic `TESTS` bank absent
- obsolete card-ID modulo selector absent
- visible version/cache/deck compatibility contract

The content validator was rewritten in PR #10 to preserve the previous checks while replacing the obsolete v6.3/v6.4 requirement that eight rotating consistency questions must exist.

Do not weaken the validator merely to make a change pass.

## `validate-runtime.cjs`

Checks include:

- version and stable state compatibility
- safe Plot-Twist-only cache cleanup
- service-worker origin/scope isolation
- awaited runtime cache writes
- APP_SHELL validity
- HTML/manifest runtime asset existence and precaching
- manifest installation contract
- DOM IDs, ARIA references, screen/action/category routing
- state normalization
- completed-run/resume semantics
- runCategories/replay semantics
- wake-lock duplicate protection
- Chaos keyboard/focus behaviour
- service-worker update lifecycle
- module ownership between choice/history UI
- v6.4 language layer loading/precache
- v6.4.1 One Last Thing answer behaviour
- absence of the old rotating `TESTS` bank/modulo selector
- GitHub Actions hardening and Dependabot

## `validate-language.cjs`

Loads the actual deck/history plus `language-polish.js`, so it validates the wording players receive.

Current guardrails include:

- scenario/twist sentence: max 34 words
- conclusion sentence: max 30 words
- prompt/choice/extra-question sentence: max 26 words
- Real-World Example sentence: max 38 words
- main prompt: max 24 words total
- follow-up: max 28 words total
- choice: max 18 words total

Selected jargon/formal terms are rejected.

Because v6.4.1 One Last Thing derives from the already-validated conclusion, the short answer inherits the conclusion's language guardrails.

Static validation does not prove semantic fit. Physical/human acceptance still matters.

---

# 12. Git and Pull Request Safety Rules

`main` is the released baseline. Material development occurs on feature branches and PRs.

**Never merge a material PR without explicit user authorization for that specific PR and the exact revalidated head.**

Immediately before an authorized merge:

1. re-fetch the PR
2. verify exact current PR head SHA
3. verify CI passed on that exact SHA
4. verify mergeability
5. check submitted reviews
6. check inline review threads
7. check PR comments/blockers
8. ensure this handoff is current
9. merge only the exact verified head with `expected_head_sha`

If the branch changes after approval, previous approval does not automatically apply. Revalidate and reconfirm authorization for the new head.

After merge:

1. verify resulting `main`
2. confirm intended PR is in `main`
3. update this handoff if the released baseline or next step changed
4. do not give local-repository commands to the user
5. verify hosted Settings version
6. conduct Android/PWA acceptance

---

# 13. Current PR #10 Release Gates

PR #10 is **not ready to merge merely because implementation code exists**.

Required before merge:

1. fetch the final PR #10 head after this handoff commit
2. run/fetch GitHub Actions for that exact head
3. require syntax checks to pass
4. require `validate-content.cjs` to pass
5. require `validate-runtime.cjs` to pass
6. require `validate-language.cjs` to pass
7. confirm PR is mergeable
8. confirm no submitted reviews block it
9. confirm no unresolved inline review threads
10. confirm no PR comments/blockers
11. ensure this handoff still matches the exact branch state
12. obtain explicit user authorization for **PR #10 on that exact verified head**

Do not merge PR #10 based on the user's earlier authorization for PR #9.

---

# 14. Android / Human Acceptance for v6.4.1

After PR #10 is merged and the hosted app updates:

1. Open Plot Twist online.
2. Confirm **Settings → App Version** shows `v6.4.1`.
3. Confirm existing Saved cards/settings/category choices/current compatible state survive the update.
4. Play several cards from each of the six categories.
5. Confirm the follow-up question appears before the Real-World Example.
6. Confirm the Real-World Example appears immediately after that question.
7. Confirm One Last Thing appears after the example.
8. Confirm the section says `THE SHORT ANSWER` rather than asking another generic test question.
9. For each sampled card, ask: **does this short answer actually respond to the follow-up question that was just asked?**
10. If any card's final conclusion sentence does not answer the follow-up well, treat that as a real content defect and add a targeted card-specific answer mechanism rather than restoring generic questions.
11. Confirm scenarios, choices, Plot Twists, The Point, examples, Chaos, and extra questions remain understandable on first read.
12. Confirm category filtering, Random, Saved, Resume, PLAY AGAIN, Settings, wake lock, and Chaos still work.
13. Fully close the installed PWA.
14. Enable airplane mode and turn Wi-Fi off.
15. Relaunch from the installed icon.
16. Verify the v6.4.1 wording and full gameplay work offline.
17. Close/reopen again while still offline and verify state restoration.

Do **not** clear site data during ordinary acceptance testing.

---

# 15. Current Unresolved Issue / Product Risk

The v6.4.1 implementation derives One Last Thing from the final sentence(s) of `card.conclusion`.

This solves the structural mismatch that the old eight-question bank created, but there is one remaining qualitative risk:

- a card's final conclusion sentence may state the correct principle without directly answering the exact wording of that card's `afterPrompt`

If on-device sampling reveals this problem on meaningful numbers of cards, the next appropriate architecture is likely an explicit per-card `afterAnswer` field or answer mapping, still preserving stable IDs/state and still validated for plain language.

Do not prematurely add 200 new fields unless human acceptance shows the derived answer is insufficient. The v6.4.1 patch deliberately chooses the simplest coherent fix first.

---

# 16. Exact Continuation Point

A fresh development session must do the following, in order:

1. Fetch live `main` and confirm the released baseline still includes v6.4.0 / PR #9.
2. Fetch PR #10 live.
3. Fetch PR #10's exact current head SHA after this handoff commit.
4. Fetch GitHub Actions runs for that exact head.
5. Require all three validators plus syntax checks to pass.
6. If CI fails, inspect and fix the real issue. Do **not** restore the obsolete rotating consistency-question bank just to satisfy a stale assertion.
7. Check submitted reviews, inline review threads, and PR comments/blockers.
8. Keep PR #10 unmerged unless the user explicitly authorizes **PR #10** after this exact-head state exists.
9. If the user authorizes merge, immediately re-run the full merge checklist on the same head and merge only with `expected_head_sha` pinned.
10. After merge, verify `main`, update this handoff to make v6.4.1 the released baseline, and have the user perform the Android/read-aloud acceptance checklist above.

## Git self-reference note

This document cannot contain the SHA of the commit that contains its own final edit because changing the document changes the commit SHA. Therefore the latest SHA written inside the file will always predate the commit containing that text. Always re-fetch GitHub for the live exact PR head.
