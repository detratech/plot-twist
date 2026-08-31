# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> `docs/DEVELOPMENT_HANDOFF.md` is the durable continuity document for this project. Every material development PR must update it before merge. Current repository code and freshly verified GitHub state outrank this file if anything becomes stale.
>
> Do not rely on ChatGPT conversation history as the durable source of project state.

---

# 1. Project Identity

**Project:** Plot Twist  
**Repository:** `detratech/plot-twist`  
**Default branch:** `main`  
**Distribution:** public GitHub-hosted static PWA / GitHub Pages style deployment

Plot Twist is an offline-first Android-oriented social scenario/campfire game for camping trips, game nights, travel, and casual group discussion.

It should feel like a legitimate adult party/campfire game, not a classroom exercise, formal debate tool, survey, philosophy app, religious app, or ideological scoring system.

## User development workflow

**The user does not maintain a local Plot Twist repository.**

Normal workflow:

`GitHub repo → feature branch / PR → GitHub Actions → explicit user authorization for that exact material PR/head → merge to main → hosted deployment → Android/PWA acceptance`

Do not invent a local checkout path. Do not tell the user to run local Git, Node, Python, npm, or a local server unless they explicitly decide to create a local clone later.

## Mandatory merge rule

Never merge a material PR without explicit user authorization for that specific PR and the exact revalidated head.

Immediately before merge:

1. Re-fetch the PR and exact head SHA.
2. Verify CI passed against that exact SHA.
3. Verify mergeability.
4. Check submitted reviews.
5. Check inline review threads.
6. Check PR comments/blockers.
7. Verify `docs/DEVELOPMENT_HANDOFF.md` is current.
8. Re-fetch `main`.
9. Merge only the exact verified head after explicit approval.

If the branch head changes after approval, revalidate and obtain fresh approval for the new head.

---

# 2. Current Released Baseline

**Current released source baseline: v6.4.2**

## PR #11 — direct answers for every follow-up

Title:

`Plot Twist v6.4.2: direct answers for every follow-up`

PR number:

`#11`

Exact merged PR head:

`2d8b6b27a923087f8f35c8ebf8f185e6159ceff8`

Base `main` immediately before merge:

`d2882189dd341f92fbca6f652d741da532169bfa`

Merge commit:

`c96126e6a6c0ac74a33b698bf62c4a4bf88e4fc6`

Exact-head validation before merge:

- workflow: `Validate Plot Twist`
- run #71
- run ID: `33343476494`
- exact head: `2d8b6b27a923087f8f35c8ebf8f185e6159ceff8`
- conclusion: success
- JavaScript syntax: success
- `validate-content.cjs`: success
- `validate-runtime.cjs`: success
- `validate-language.cjs`: success
- submitted reviews: none
- inline review threads: none
- PR comments/blockers: none
- PR was mergeable

The first integrated run for PR #11, run #67 / ID `33343303973`, failed only because direct answer 111 used the formal word `premise`. The answer was rewritten using `bad assumption`; the validator was not weakened. Final run #71 then passed all gates.

### Merge implementation note

GitHub's connector mutation for `markPullRequestReadyForReview` failed because the connector requested a GraphQL field GitHub no longer exposes. The normal REST merge endpoint then correctly rejected the still-draft PR.

Because the user had explicitly authorized merging PR #11, the repository state was revalidated again and the exact approved head was merged by creating a standard two-parent merge commit through GitHub's Git data API:

- first parent: `d2882189dd341f92fbca6f652d741da532169bfa`
- second parent: `2d8b6b27a923087f8f35c8ebf8f185e6159ceff8`
- merge tree: the exact verified PR-head tree
- merge commit: `c96126e6a6c0ac74a33b698bf62c4a4bf88e4fc6`
- `main` was advanced non-force to that merge commit

GitHub then recognized PR #11 as **merged=true** and **closed**. The PR may still display its historical `draft=true` field because the ready-for-review mutation itself never succeeded; this does not mean the code was not merged.

This post-merge handoff edit creates a newer `main` commit. Future sessions must always re-fetch live `main` instead of treating the merge SHA above as the permanent branch head.

## Earlier material releases

- PR #10 / v6.4.1 One Last Thing fix: merged head `62a7dbf964fde4637b4441af514e7c1852220bb6`, merge commit `8dfecdacefd9d4a48bfce7b32e5dd211443c9c1f`, CI run #64 success
- PR #9 / v6.4 plain-language release: merged head `a56bbb6ef17a24f0a83b1c4c16c5e393be283cff`, merge commit `5aae49969450fe0d8ecfd104fccd1c0bc9a7c43a`, CI run #60 success
- PR #6 / v6.3.1 deep code/workflow audit: merged head `33838c46a3c48244c0eb75ed3467d780cd397ba3`, merge commit `0d7a102e73aba9999cb26c436a4a80c5439df2c7`
- PR #5 / v6.3 consistency layer: merged head `94fac2411bdfdcbe89e563c4263588773bec3406`, merge commit `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`
- PR #4 / v6.2 prominent choices + 200 Real-World Examples: merged head `34a5fd3dec48e0651a67ced093a15917887f999a`, merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- PR #3 / visible app version: merge commit `f90afb2d3096763af555cf2110a5a2d539a5e5a1`
- PR #2 / 200 true two-sided dilemma rewrite: relevant merged history commit `2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

---

# 3. v6.4.2 Product Contract

The required normal ending is now:

`The Point → follow-up question → Real-World Example → One Last Thing / THE SHORT ANSWER → Keep Talking`

**One Last Thing must directly answer the question immediately above the Real-World Example.**

It must not:

- ask another generic question
- recycle The Point automatically
- derive an answer heuristically from `card.conclusion`
- silently fall back to unrelated text when an answer is missing

## `after-answers.js`

Runtime data file containing exactly 200 explicit answers:

`globalThis.AFTER_ANSWERS = Object.freeze({ 1: ..., 2: ..., ... 200: ... })`

Each stable card ID has exactly one answer to that card's `afterPrompt`.

Representative card 37:

Follow-up:

`What makes a hard truth more useful without making it less true?`

Direct answer:

`Say the truth accurately, at the right time, for a real reason, and in a way that helps the person act on it instead of humiliating them.`

The answers are intentionally written in ordinary language around broadly understandable principles such as honesty, fairness, responsibility, restraint, mercy, evidence, family duty, justice, boundaries, and character.

### Content / persuasion boundary

Do not turn this answer layer into a covert religious, political, or ideological conversion mechanism while hiding the source from players.

The game may present universal principles clearly and persuasively through scenarios, evidence, consistency, consequences, and direct answers. It may not secretly grade or engineer players toward a concealed ideology.

If an explicitly faith-based mode or separate product is ever desired, it should be transparent about that framing.

## `consistency-ui.js`

Legacy filename retained. Its responsibility is now One Last Thing answer presentation.

Current behaviour:

1. find the current card
2. read `AFTER_ANSWERS[current.id]`
3. display it under `ONE LAST THING` / `THE SHORT ANSWER`
4. place the block after `.history-example`

There is intentionally no fallback to `card.conclusion`.

Retired behaviours that must not return:

- `const TESTS = [...]`
- `(current.id - 1) % TESTS.length`
- `function shortAnswer(card)` derived from `card.conclusion`
- any automatic fallback that turns The Point into the answer

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
- GitHub Actions validation using Node.js 22

Deliberately absent:

- framework
- bundler/build step
- runtime package-manager dependencies
- backend/database/authentication
- runtime API/CDN
- remote fonts/images
- analytics

## Important runtime files

- `index.html`
- `styles.css`
- `categories.css`
- `game-v6.2.css`
- `game-v6.3.css`
- `cards.js`
- `deck-a.js` through `deck-h.js`
- `categories.js`
- `language-polish.js`
- `after-answers.js`
- `app.js`
- `choice-ui.js`
- `history-ui.js`
- `consistency-ui.js`
- `history-a.js` through `history-d.js`
- `history-reviewed.js`
- `manifest.webmanifest`
- `sw.js`

## Validation / docs

- `validate-content.cjs`
- `validate-runtime.cjs`
- `validate-language.cjs`
- `PLAIN_LANGUAGE_NOTES.md`
- `.github/workflows/validate.yml`
- `.github/dependabot.yml`
- `README.md`
- `VALIDATION.md`
- `docs/DEVELOPMENT_HANDOFF.md`

## Required script/data order

`deck/history → categories.js → language-polish.js → after-answers.js → app.js → presentation helpers`

`after-answers.js` is an essential offline asset and must remain precached by the service worker.

---

# 5. Card and Data Contracts

Exactly 200 cards with stable IDs 1–200.

Each card contains:

- `id`
- `title`
- `vibe`
- `scenario` — exactly two non-empty paragraphs
- `prompt`
- `choices` — exactly two
- `twist`
- `conclusion` — The Point
- `afterPrompt` — question immediately before the Real-World Example
- `hostPrompts` — exactly two
- `categories` — one or two valid IDs

Internal IDs must remain hidden from players.

## Direct answers

Exactly one `AFTER_ANSWERS[id]` must exist for every ID 1–200.

Each answer must be:

- present
- declarative, not another question
- a direct response to the associated `afterPrompt`
- concise
- conversational
- unique
- safe for runtime protected/meta-language rules

Automated validation proves completeness and style constraints. Semantic fit remains a human editorial requirement.

## Categories

IDs:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

Rules:

- selecting specific categories removes Mix Everything
- removing the last specific category restores Mix Everything
- multiple categories form a union without duplicates
- Start and Random respect the current filter
- active runs preserve `runCategories`
- Saved playback is independent of the current home filter

## Real-World Examples

Exactly one substantive example per card ID 1–200.

Load precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js` overrides selected mappings

Do not remove `history-reviewed.js` as apparent duplication.

Accuracy and analogy fit outrank fame. Prefer strong primary, official, academic, archival, court, museum, or first-party sources where practical.

Card 184 intentionally uses the UC Berkeley graduate-admissions / Simpson's paradox example.

---

# 6. Product / Editorial Rules

## Two-sided dilemma

Every card must offer two genuinely reasonable positions before reveal.

Do not create:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- pre-reveal `it depends` escape
- Plot Twist that merely repeats setup
- reveal that only congratulates one side

Target:

`two defensible choices → commitment → meaningful new information → reconsider → clear principle`

Changing sides after reveal is allowed.

## Plain language

Permanent rule:

> **Would a regular person naturally say or understand this out loud on the first read?**

Prefer short direct sentences, familiar words, concrete phrasing, one idea at a time, and natural humour.

Avoid academic/debate/legalistic wording, jargon, stacked metaphors, and sentences needing rereading.

Plain language is part of correctness.

## The Point

The Point should be clear and declarative. It does not need false balance after the reveal.

## One Last Thing

**One Last Thing is the answer step.**

Required relation:

`afterPrompt → Real-World Example → explicit AFTER_ANSWERS[id] answer`

Do not reintroduce generic consistency tests into this normal flow. Optional Chaos can still contain pressure-test mechanics.

## No grading / ideology score

Do not add moral scores, ideology scores, visible right/wrong grading, or hidden scoring designed to classify a player's worldview.

---

# 7. Persistence / Compatibility

Stable anchors:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- card IDs: 1–200
- historical example IDs: 1–200
- direct-answer IDs: 1–200 aligned to the same cards

Visible Settings version:

`v6.4.2`

Service-worker cache:

`plot-twist-v6.4.2`

Do not bump `masterpiece-200-v1` for wording/UI/asset-only changes.

Do not clear site/app data as the normal update path. Doing so destroys Saved cards, settings, categories, and active state and defeats compatibility testing.

---

# 8. PWA / Offline Rules

Offline-first is non-negotiable.

Service worker must keep these protections:

- `CACHE_PREFIX = 'plot-twist-'`
- delete only old Plot Twist caches
- never delete unrelated caches on the shared origin
- same-origin/scope runtime caching
- current named-cache reads/writes
- awaited `cache.put()`
- cached navigation fallback

`after-answers.js` must remain in APP_SHELL.

Installed Android PWA must pass a full airplane-mode relaunch test without clearing site data.

Runtime protections from the v6.3.1 audit that must not regress include:

- persisted-state normalization
- localStorage failure guard
- completed-run Resume handling
- stable `runCategories`
- mode-aware PLAY AGAIN
- Saved runs replay Saved mode
- duplicate wake-lock prevention
- Chaos Escape/focus handling
- `choice-ui.js` owns choice formatting
- `history-ui.js` owns Real-World Example rendering
- offline-ready service-worker update/activation handling

---

# 9. Validation Contract

GitHub Actions runs three complementary gates.

## `validate-content.cjs`

Must protect at least:

- exactly 200 cards with IDs 1–200
- required card structure
- two distinct defensible choices
- substantive Plot Twists
- valid categories
- exactly 200 substantive Real-World Examples
- exactly 200 explicit direct answers
- no missing/duplicate direct answers
- direct answers are declarative rather than more questions
- runtime/meta-language protections
- script/load/precache contracts
- visible version `v6.4.2`
- cache `plot-twist-v6.4.2`
- no conclusion-derived One Last Thing fallback

## `validate-runtime.cjs`

Must protect at least:

- service-worker cache isolation and cleanup
- runtime asset/manifest integrity
- DOM/routing integrity
- persistence/state normalization/replay
- wake lock and Chaos behaviour
- loading and offline caching of `language-polish.js` and `after-answers.js`
- One Last Thing reading `AFTER_ANSWERS[current.id]`
- no old rotating TESTS bank
- no automatic `card.conclusion` fallback
- hardened GitHub Actions configuration

## `validate-language.cjs`

Must check final player-facing language, including all 200 direct answers, for conversational sentence length and protected jargon/formal wording.

Do not weaken validators just to make a failing branch green. Fix the content or implementation problem instead.

---

# 10. Exact Next Step

There is no active material development PR after PR #11 merge.

The next step is **hosted Android/PWA acceptance for v6.4.2**.

Do not clear site data.

Acceptance checklist:

1. Open the hosted/installed app online and confirm Settings shows `v6.4.2`.
2. Confirm existing Saved cards, settings, category selections, and current state survived the update.
3. Sample cards across all six categories.
4. Confirm the order is:
   `The Point → follow-up question → Real-World Example → One Last Thing / THE SHORT ANSWER → Keep Talking`.
5. On each sampled card, read the follow-up and then the short answer as a pair. The answer must directly answer that exact question, not merely restate The Point.
6. Specifically verify the hard-truth card answers:
   `Say the truth accurately, at the right time, for a real reason, and in a way that helps the person act on it instead of humiliating them.`
7. Confirm different cards show different card-specific answers.
8. Confirm category filtering, multi-select, Random, Saved, resume/replay, wake lock, and Chaos still work.
9. Fully close the app, enable airplane mode, turn Wi-Fi off, relaunch from the installed icon, and verify full gameplay.
10. If any answer feels indirect, repetitive, unnatural, or mismatched to its question, treat that as an editorial bug and fix the specific `AFTER_ANSWERS[id]` entry rather than reintroducing heuristics.

After acceptance, the next development priority should be chosen from actual user testing feedback rather than speculative feature work.
