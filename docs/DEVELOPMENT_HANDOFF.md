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

---

# 2. Released Baseline

Current released source baseline on `main` before the active v6.4.2 branch:

**v6.4.1**

Last verified `main` at branch creation:

`d2882189dd341f92fbca6f652d741da532169bfa`

Commit message:

`Update handoff after v6.4.1 merge`

Its parent is the v6.4.1 merge commit:

`8dfecdacefd9d4a48bfce7b32e5dd211443c9c1f`

## PR #10 — v6.4.1 One Last Thing fix

Title:

`Plot Twist v6.4.1: make One Last Thing answer the follow-up`

Exact merged PR head:

`62a7dbf964fde4637b4441af514e7c1852220bb6`

Merge commit:

`8dfecdacefd9d4a48bfce7b32e5dd211443c9c1f`

Exact-head CI before merge:

- workflow: `Validate Plot Twist`
- run #64
- run ID `32812344266`
- conclusion: success
- syntax: success
- `validate-content.cjs`: success
- `validate-runtime.cjs`: success
- `validate-language.cjs`: success
- reviews: none
- inline review threads: none
- PR comments/blockers: none

v6.4.1 removed the old eight-question rotating One Last Thing bank and instead derived a short answer from the final meaningful sentence(s) of `card.conclusion`.

That fixed the structural problem of asking another unrelated question, but physical testing showed that simply recycling The Point still did not reliably answer the exact follow-up question.

## Earlier material releases

- PR #9 / v6.4 plain-language release: merged head `a56bbb6ef17a24f0a83b1c4c16c5e393be283cff`, merge commit `5aae49969450fe0d8ecfd104fccd1c0bc9a7c43a`, CI run #60 success
- PR #6 / v6.3.1 deep code/workflow audit: merged head `33838c46a3c48244c0eb75ed3467d780cd397ba3`, merge commit `0d7a102e73aba9999cb26c436a4a80c5439df2c7`
- PR #5 / v6.3 consistency layer: merged head `94fac2411bdfdcbe89e563c4263588773bec3406`, merge commit `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`
- PR #4 / v6.2 prominent choices + 200 Real-World Examples: merged head `34a5fd3dec48e0651a67ced093a15917887f999a`, merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- PR #3 / visible app version: merge commit `f90afb2d3096763af555cf2110a5a2d539a5e5a1`
- PR #2 / 200 true two-sided dilemma rewrite: relevant merged history commit `2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

---

# 3. Active Development — PR #11 / v6.4.2 Direct Answers

## User feedback that triggered this patch

The user tested v6.4.1 on the installed phone app and showed a card where:

- The Point said honest speech should be accurate, necessary, and aimed at helping
- the follow-up asked: `What makes a hard truth more useful without making it less true?`
- the Real-World Example used Churchill's first wartime speech as prime minister
- One Last Thing repeated the Point rather than directly answering the question

The user's core product requirement is correct and is now the authoritative flow rule:

**One Last Thing must directly answer the question immediately above the Real-World Example.**

Required ending:

`The Point → follow-up question → Real-World Example → One Last Thing / THE SHORT ANSWER`

The short answer must respond to that exact follow-up, not merely restate a nearby principle.

## PR #11

Title:

`Plot Twist v6.4.2: direct answers for every follow-up`

Branch:

`v6.4.2-direct-short-answers`

Base:

`main`

Base SHA:

`d2882189dd341f92fbca6f652d741da532169bfa`

PR number:

`#11`

State at this handoff edit:

- open
- draft
- unmerged
- most recently observed branch head before this handoff edit: `39c8f65add29eee2f14e0a41390a9ccda1fa8d5d`
- this handoff update creates a newer head, so final exact-head CI must be re-fetched afterward

## v6.4.2 implementation

### `after-answers.js`

New runtime data file containing exactly 200 explicitly authored answers:

`globalThis.AFTER_ANSWERS = Object.freeze({ 1: ..., 2: ..., ... 200: ... })`

Each stable card ID has one answer to that card's `afterPrompt`.

This is deliberately a separate content layer instead of changing the persisted card schema. It preserves state and ID compatibility while making semantic review straightforward.

Representative card 37:

Follow-up:

`What makes a hard truth more useful without making it less true?`

Direct answer:

`Say the truth accurately, at the right time, for a real reason, and in a way that helps the person act on it instead of humiliating them.`

The direct answers are intentionally written in ordinary language around broadly understandable principles such as honesty, fairness, responsibility, restraint, mercy, evidence, family duty, justice, boundaries, and character.

### Important content / persuasion boundary

Do not turn this answer layer into a covert religious, political, or ideological conversion mechanism while hiding the source from players.

The game may present universal principles clearly and persuasively through scenarios, evidence, consistency, consequences, and direct answers. It may not secretly grade or engineer players toward a concealed ideology.

If an explicitly faith-based mode or product is ever desired, it should be transparently labelled rather than smuggled into an apparently neutral game.

### `consistency-ui.js`

Legacy filename retained, but its responsibility is now the One Last Thing direct-answer presentation.

Current behaviour:

1. find current card by displayed title
2. read `AFTER_ANSWERS[current.id]`
3. show it under:
   - `ONE LAST THING`
   - `THE SHORT ANSWER`
4. place the section after `.history-example`

There is intentionally **no fallback** to `card.conclusion`.

If the mapping is missing or invalid, the section hides. CI is responsible for making a missing mapping impossible in a releasable branch.

Retired behaviours that must not return:

- `const TESTS = [...]`
- `(current.id - 1) % TESTS.length`
- `function shortAnswer(card)` deriving text from `card.conclusion`
- any other automatic fallback that silently turns The Point into the answer

### Runtime loading / PWA

Required script/data order:

`deck/history → categories.js → language-polish.js → after-answers.js → app.js → presentation helpers`

`after-answers.js` is an essential offline asset and is precached by the service worker.

Visible Settings version on the branch:

`v6.4.2`

Service-worker cache:

`plot-twist-v6.4.2`

Compatibility anchors remain:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- stable card IDs 1–200

No state reset/migration is intended.

---

# 4. Current CI History for PR #11

## Initial integrated run #67

Head:

`430a38f991c0990a2a476f31a2fbbd162f1ebc04`

Run ID:

`33343303973`

Result:

**failure**

Step results:

- JavaScript syntax: success
- `validate-content.cjs`: success
- `validate-runtime.cjs`: success
- `validate-language.cjs`: failure

The language gate found exactly one problem across the new 200 answers:

- direct answer 111 used the formal/jargon word `premise`

The answer was changed from wording containing `bad premise` to the plain-language phrase `bad assumption`.

The validator was **not** weakened.

Subsequent README and VALIDATION documentation edits changed the branch head again. This handoff edit changes it again as well.

Therefore run #67 is **not** final merge CI. A fresh run on the final exact PR head is mandatory.

---

# 5. Architecture

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
- `after-answers.js` — v6.4.2 explicit direct answers
- `app.js`
- `choice-ui.js`
- `history-ui.js`
- `consistency-ui.js` — One Last Thing answer renderer
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

---

# 6. Card and Data Contracts

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

Exactly one `AFTER_ANSWERS[id]` entry must exist for each card ID 1–200.

Every answer must be:

- present
- declarative, not another question
- direct enough to answer the associated `afterPrompt`
- concise
- conversational
- unique
- safe for the runtime's protected/meta-language rules

Automated validators can prove completeness and style constraints, but **semantic fit is ultimately a human editorial requirement**.

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
- Start and Random respect current filter
- active runs preserve `runCategories`
- Saved playback is independent of current home filter

## Real-World Examples

Exactly one substantive example per card ID 1–200.

Load precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js` overrides selected mappings

Do not remove `history-reviewed.js` as apparent duplication.

Accuracy and exact analogy fit outrank fame. Prefer strong primary, official, academic, archival, court, museum, or first-party sources where practical.

Card 184 intentionally uses the UC Berkeley graduate-admissions / Simpson's paradox example.

---

# 7. Product / Editorial Rules

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

The Point should be clear and declarative. It does not need false balance after the new information.

## One Last Thing

**One Last Thing is the answer step.**

Required relation:

`afterPrompt → Real-World Example → explicit AFTER_ANSWERS[id] answer`

Do not reintroduce generic consistency tests into this normal flow. Optional Chaos can still contain pressure-test mechanics.

## No grading / ideology score

Do not add moral scores, ideology scores, visible right/wrong grading, or hidden scoring designed to classify a player's worldview.

---

# 8. Persistence / Compatibility

Stable anchors:

- localStorage key `plotTwistStateV4`
- deck/state ID `masterpiece-200-v1`
- card IDs 1–200
- historical example IDs 1–200
- direct answer IDs 1–200 aligned to those same card IDs

Do not bump `masterpiece-200-v1` for wording/UI/asset-only changes.

Do not clear site data as the normal update path. Doing so destroys Saved cards, settings, categories, and active state and defeats compatibility testing.

---

# 9. PWA / Offline Rules

Offline-first is non-negotiable.

Current branch cache:

`plot-twist-v6.4.2`

Service worker must keep these v6.3.1 safety protections:

- `CACHE_PREFIX = 'plot-twist-'`
- delete only old Plot Twist caches
- never delete unrelated caches on the shared origin
- same-origin/scope runtime caching
- current named-cache reads/writes
- awaited `cache.put()`
- cached navigation fallback

`after-answers.js` must remain in APP_SHELL.

Installed Android PWA must eventually pass a full airplane-mode relaunch test without clearing site data.

---

# 10. Runtime Audit Protections That Must Not Regress

From the v6.3.1 deep audit:

- safe Plot-Twist-only cache cleanup
- awaited cache writes
- same-origin/scope cache isolation
- persisted-state normalization
- localStorage failure guard
- completed-run Resume bug fixed
- stable `runCategories`
- mode-aware PLAY AGAIN
- Saved runs replay Saved mode
- duplicate wake-lock prevention
- Chaos Escape/focus handling
- `choice-ui.js` owns choice formatting
- `history-ui.js` only owns Real-World Example rendering
- GitHub Actions hardening

---

# 11. Validation

Workflow:

`.github/workflows/validate.yml`

Hardening:

- Actions pinned to immutable SHAs
- `contents: read`
- checkout `persist-credentials: false`
- manual `workflow_dispatch`
- concurrency cancellation
- 10-minute timeout
- Dependabot for GitHub Actions

CI syntax-checks `after-answers.js` along with existing JavaScript.

## `validate-content.cjs`

Preserves the existing 200-card/schema/category/history/presentation/protected-term checks and additionally requires:

- exactly 200 direct answers
- complete IDs 1–200
- non-empty declarative answers
- 7–45 words per answer
- no duplicate answers
- protected runtime/meta terminology absent from answers
- `after-answers.js` loaded and precached
- required load order
- One Last Thing uses `AFTER_ANSWERS[current.id]`
- no `shortAnswer(card)` conclusion fallback
- no `card.conclusion` fallback in `consistency-ui.js`
- no generic `TESTS` bank/modulo selector
- Settings `v6.4.2`
- cache `plot-twist-v6.4.2`

## `validate-runtime.cjs`

Preserves prior PWA/state/workflow checks and now enforces:

- direct-answer asset exists
- direct-answer asset loaded before app rendering
- direct-answer asset precached
- explicit answer-map rendering
- no conclusion-derived fallback

## `validate-language.cjs`

Checks final card/history language and all 200 direct answers.

Direct answers must stay within:

- max 34 words per sentence
- max 40 total words

The first integrated run found one jargon issue in answer 111 and that wording was fixed rather than exempted.

---

# 12. Git / PR Safety Rule

**Never merge a material PR without explicit user authorization for that specific PR and exact revalidated head.**

Immediately before authorized merge:

1. re-fetch PR
2. verify exact current head SHA
3. verify CI success on that exact SHA
4. verify mergeability
5. check submitted reviews
6. check inline review threads
7. check PR comments/blockers
8. verify this handoff is current
9. merge only exact verified head using `expected_head_sha`

If the branch changes after approval, revalidate and obtain approval for the new head.

After merge:

1. verify resulting `main`
2. confirm intended PR is in `main`
3. update this handoff to released baseline
4. do not provide local-repo commands
5. verify hosted Settings version
6. conduct Android/PWA acceptance

---

# 13. Current Release Gates / Exact Next Step

A fresh development session must:

1. Fetch current live `main` and confirm v6.4.1 released baseline ancestry.
2. Fetch PR #11 live.
3. Determine the exact current PR head after this handoff commit.
4. Fetch CI for that exact SHA.
5. Require syntax, content, runtime/PWA/state, and plain-language gates all to pass.
6. If an answer fails language validation, fix the answer; do not weaken the gate merely to pass.
7. Inspect submitted reviews, inline review threads, and PR comments/blockers.
8. Keep PR #11 unmerged unless the user explicitly authorizes **PR #11** after the final exact-head state is known.
9. If authorized, rerun the full pre-merge checklist and merge only the verified head.
10. After merge, update this handoff to make v6.4.2 the released baseline.
11. Have the user test actual answer quality across the six categories on the phone.

## Android acceptance focus

The most important product test is:

**Read the follow-up question, then the Real-World Example, then One Last Thing. Does the short answer directly answer that exact question?**

Also verify:

- Settings shows v6.4.2
- Saved/settings/state survive update
- plain language remains natural
- category/Random/Saved/Resume/PLAY AGAIN/wake lock/Chaos work
- airplane-mode relaunch works
- state restores after offline close/reopen

Do not clear site data during ordinary acceptance.

## Git self-reference note

This document cannot contain the SHA of the commit that contains its own final edit, because changing this file changes the commit SHA. Always re-fetch GitHub for the live exact PR head.
