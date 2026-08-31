# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> `docs/DEVELOPMENT_HANDOFF.md` is the durable development continuity document for Plot Twist. Current repository code and freshly verified GitHub state outrank this document if anything becomes stale.
>
> Every material development PR must update this file before merge. Do not rely on ChatGPT conversation history as the durable source of project state.

---

# 1. Project Identity

**Project:** Plot Twist  
**Repository:** `detratech/plot-twist`  
**Default branch:** `main`  
**Distribution:** public GitHub-hosted static PWA / GitHub Pages style deployment

Plot Twist is an offline-first Android-oriented social scenario/campfire game for camping trips, game nights, travel, and casual group discussion.

The game should feel like something normal adults can read aloud and argue about naturally, not a survey, classroom worksheet, or formal debate exercise.

## User development workflow

**The user does not maintain a local Plot Twist repository.**

Normal workflow:

`GitHub repo → feature branch / PR → GitHub Actions → explicit user authorization for that exact material PR/head → merge to main → hosted deployment → Android/PWA acceptance`

Do not invent a local checkout path. Do not tell the user to run local Git, Node, Python, npm, or a local server unless they explicitly decide to create a local clone later.

## Mandatory merge rule

Never merge a material PR without explicit user authorization for that specific PR after revalidating the exact current head.

Immediately before an authorized merge:

1. re-fetch the PR
2. verify exact current head SHA
3. verify CI succeeded against that exact SHA
4. verify mergeability
5. check submitted reviews
6. check inline review threads
7. check PR comments/blockers
8. confirm this handoff is current
9. merge only the exact verified head

If the branch changes after authorization, revalidate and obtain approval for the new head.

---

# 2. Released Baseline

Current released source baseline on `main` before the active v6.5 branch:

**v6.4.2**

Last verified `main` at v6.5 branch creation:

`66e8475075e61a6970b897a1274426fd111f60bb`

Commit message:

`Update handoff after v6.4.2 merge`

Its parent is the v6.4.2 merge commit:

`c96126e6a6c0ac74a33b698bf62c4a4bf88e4fc6`

## PR #11 — v6.4.2 explicit direct answers

Title:

`Plot Twist v6.4.2: direct answers for every follow-up`

Exact merged PR head:

`2d8b6b27a923087f8f35c8ebf8f185e6159ceff8`

Merge commit:

`c96126e6a6c0ac74a33b698bf62c4a4bf88e4fc6`

Final premerge CI:

- workflow: `Validate Plot Twist`
- run #71
- run ID `33343476494`
- conclusion: success
- syntax/content/runtime/language gates all passed
- reviews: none
- inline review threads: none
- PR comments/blockers: none

Post-merge handoff commit:

`66e8475075e61a6970b897a1274426fd111f60bb`

Post-merge push CI:

- run #73
- run ID `33349800673`
- conclusion: success

### Important v6.4.2 architecture

`after-answers.js` contains exactly 200 explicit answers keyed to stable card IDs 1–200.

Normal card ending:

`The Point → afterPrompt → Real-World Example → One Last Thing / THE SHORT ANSWER → Keep Talking`

`consistency-ui.js` is a legacy filename but now presents `AFTER_ANSWERS[current.id]`.

There is intentionally no fallback to `card.conclusion` and no old rotating consistency-question bank.

---

# 3. Active Development — PR #12 / v6.5.0

## User direction

The product is being split into two explicitly named content modes:

1. **SUGAR COATED FOR SNOWFLAKES**
2. **CUTTHROAT HONEST**

The immediate v6.5 task is to reduce the current playable general deck from 200 cards to the **100 strongest cards**, while keeping all 200 source cards in the repository/runtime compatibility pool.

The future Cutthroat Honest mode will be developed from the user's Obsidian knowledge vault and is intended to contain at least 100 separate questions/cards with transparent source framing rather than the general-mode wording layer.

## PR #12

Title:

`Plot Twist v6.5: curate Sugar Coated to the strongest 100 cards`

Branch:

`v6.5-sugar-coated-100`

Base:

`main`

Base SHA:

`66e8475075e61a6970b897a1274426fd111f60bb`

PR number:

`#12`

State at this handoff edit:

- open
- draft
- unmerged
- pre-documentation integrated head `95008cbcfc787e4faa7200a849ff1bfb64e00796` passed CI run #74
- README and VALIDATION edits then changed the branch
- this handoff update creates another newer head
- therefore **run #74 is not final merge CI**; final exact-head CI must be re-fetched after this commit

---

# 4. v6.5 Content-Mode Architecture

## `game-modes.js`

New runtime file defining the release selection layer.

### Sugar Coated

Exact mode ID:

`sugar`

Exact visible label:

`SUGAR COATED FOR SNOWFLAKES`

Availability:

`true`

Exactly 100 selected stable source IDs:

```text
1, 2, 5, 7, 10, 12, 14, 15, 16, 17,
18, 19, 21, 24, 25, 26, 31, 33, 35, 37,
38, 43, 44, 45, 46, 54, 55, 56, 58, 59,
60, 63, 64, 73, 80, 85, 86, 92, 98, 99,
101, 104, 105, 107, 108, 110, 111, 113, 114, 117,
118, 119, 121, 125, 126, 127, 128, 129, 130, 131,
137, 138, 139, 142, 143, 144, 145, 147, 148, 150,
152, 156, 161, 162, 163, 164, 165, 167, 168, 169,
170, 171, 173, 175, 176, 178, 179, 180, 182, 184,
187, 188, 190, 191, 194, 196, 197, 198, 199, 200
```

Curation criteria:

- genuine two-sided pre-reveal dilemma
- natural group discussion value
- Plot Twist materially changes/complicates the initial choice
- strong transferable Point
- fitting Real-World Example and direct answer
- memorable read-aloud quality
- remove redundant cards that substantially teach the same principle
- maintain useful coverage across all six categories

Validated selected-category memberships from CI run #74:

- Mind & Truth: 38
- Relationships & Family: 32
- Money & Success: 13
- Tech & Modern Life: 19
- Society & Culture: 26
- Life & Purpose: 39

Cards can have two categories, so totals exceed 100.

### Cutthroat Honest

Exact mode ID:

`cutthroat`

Exact visible label:

`CUTTHROAT HONEST`

Current availability:

`false`

Current playable IDs:

none

The home screen intentionally shows the mode as:

`Vault-backed mode · coming next`

Do not make this mode playable with placeholder content. A later material PR must provide the actual vault-backed deck and its source/provenance validation before setting `available: true`.

---

# 5. Why the Source Pool Stays at 200

Do **not** delete the 100 cards that were not selected for Sugar Coated.

The complete 200-card source/archive pool remains important for:

- stable IDs 1–200
- Saved cards created before v6.5
- an in-progress pre-v6.5 run whose order can contain any old source ID
- historical example mappings
- direct-answer mappings
- editorial provenance/history
- future reconsideration of curation decisions

New normal/random Sugar Coated runs use only the curated 100 IDs.

Saved cards and legacy/in-progress state continue resolving with `cardById()` against `PLOT_TWIST_CARDS`, which still contains all 200 source cards.

This is an intentional compatibility contract.

---

# 6. v6.5 State / Runtime Changes

Stable persisted anchors are **not** changed:

- localStorage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`

New persisted fields:

- `contentMode`
- `runContentMode`

Older state with neither field normalizes to:

`sugar`

A new normal/random run snapshots:

- `runContentMode`
- `runCategories`

This prevents changing the home selector from mutating the meaning of an already active run.

`eligibleCards(selectedCategories, modeId)` first obtains the current mode's card pool and then applies category filtering inside that pool.

Saved runs remain independent of the current home mode/category filter.

## Home UI

Mode selector now appears before categories.

- Sugar Coated is selected/usable
- Cutthroat Honest is visible but disabled
- mode summary shows Sugar has 100 cards
- category summary shows how many eligible Sugar cards remain under the selected topic mix

## Game header

Normal/random runs display the snapshotted content-mode context rather than merely `GAME`.

---

# 7. Current Version / PWA

Visible Settings version on PR #12:

`v6.5.0`

Service-worker cache:

`plot-twist-v6.5.0`

New essential offline asset:

`game-modes.js`

Required runtime order:

`deck/history → categories.js → language-polish.js → after-answers.js → game-modes.js → app.js → presentation helpers`

The service worker must continue to preserve the v6.3.1 safety rules:

- `CACHE_PREFIX = 'plot-twist-'`
- delete only old Plot Twist caches
- never delete unrelated caches on a shared GitHub Pages origin
- same-origin/scope runtime caching
- current named-cache reads/writes
- awaited `cache.put()`
- navigation fallback

---

# 8. Source Card/Data Contracts

The repository still contains exactly 200 source cards with IDs 1–200.

Each source card includes:

- `id`
- `title`
- `vibe`
- `scenario` — exactly two non-empty paragraphs
- `prompt`
- `choices` — exactly two
- `twist`
- `conclusion` — The Point
- `afterPrompt`
- `hostPrompts` — exactly two
- `categories` — one or two valid IDs after category processing

Categories:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

Exactly 200 `HISTORICAL_EXAMPLES[id]` mappings and exactly 200 `AFTER_ANSWERS[id]` mappings remain aligned to those stable source IDs.

Internal IDs remain hidden from players.

---

# 9. Editorial Rules That Must Not Regress

## Two-sided dilemmas

Every card should force a real pre-reveal choice. Avoid:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- `it depends` escape before choosing
- reveal that merely repeats setup
- reveal that simply congratulates one side

Target:

`two defensible choices → commitment → meaningful new information → reconsider → clear principle`

Changing sides after the reveal is allowed.

## Plain language

Permanent practical rule:

> **Would a regular person naturally understand this out loud on the first read?**

Prefer ordinary words, short sentences, concrete examples, one idea at a time, and natural humour.

Avoid jargon, legalistic prose, debate-club terminology, stacked metaphors, and phrasing that needs rereading.

## One Last Thing

One Last Thing is the **answer step**.

Required relation:

`afterPrompt → Real-World Example → AFTER_ANSWERS[id]`

Do not reintroduce the old generic consistency-test bank or derive the answer from The Point.

---

# 10. Current Validation

GitHub Actions runs:

1. JavaScript syntax checks
2. `validate-content.cjs`
3. `validate-runtime.cjs`
4. `validate-language.cjs`

## v6.5 content gate

In addition to all previous 200-card/example/answer rules, it now requires:

- exactly 100 unique `SUGAR_COATED_CARD_IDS`
- every selected ID exists in the 200-card source pool
- every selected ID has a Real-World Example and direct answer
- every category has at least 10 selected Sugar cards
- exact Sugar and Cutthroat labels
- Sugar available with 100 cards
- Cutthroat unavailable with zero cards
- version/cache/load/precache wiring for v6.5

## v6.5 runtime gate

Also requires:

- content-mode DOM targets/wiring
- Sugar default for old state
- `contentMode` / `runContentMode` persistence
- mode snapshot at run start
- eligible-card filtering inside mode pool
- full 200-card lookup preserved for Saved/legacy state
- Cutthroat UI remains disabled until implemented

## First integrated v6.5 CI

Pre-documentation branch head:

`95008cbcfc787e4faa7200a849ff1bfb64e00796`

Workflow:

`Validate Plot Twist`

Run:

- run #74
- run ID `33352268119`
- conclusion: success
- syntax: success
- source + 100-card curated mode gate: success
- runtime/PWA/state/workflow gate: success
- plain-language gate: success

This is **not final merge CI** because README, VALIDATION, and this handoff were committed afterward.

---

# 11. Future Cutthroat Honest / Obsidian Direction

The user wants the future Cutthroat Honest mode to follow an Obsidian vault and eventually contain at least 100 cards/questions derived from that knowledge base.

Recommended architecture recorded for future development:

`Obsidian approved source folder → controlled/private source bridge/repository → detect changed Markdown/hash → generate or update candidate Cutthroat cards → draft PR in detratech/plot-twist → validators → explicit user merge authorization → static GitHub-hosted PWA update`

Important design principles:

- do not make the installed PWA directly watch arbitrary Android filesystem Markdown
- do not copy the entire personal vault into the public app repository
- use a controlled subset of vault notes approved for game content
- maintain source/provenance metadata and a source revision/hash
- determine which cards are affected by changed source files instead of regenerating everything blindly
- generated changes should create a draft PR rather than silently publishing themselves
- keep the finished game fully static/offline after deployment

Before Cutthroat can become available, a later PR should add:

- a separate stable card namespace/data layer
- at least 100 playable cards
- source-note/provenance mapping
- knowledge snapshot/revision metadata
- validation appropriate for the explicit vault-backed mode
- offline precaching
- state/Saved behaviour across both modes
- Android acceptance for switching modes

The future explicit mode should not be forced through the current Sugar Coated terminology filter if doing so would contradict the source material it is transparently representing. The two modes need separate content validation contracts.

---

# 12. Exact Next Step

After this handoff commit:

1. re-fetch PR #12 and record its new exact head SHA
2. wait for/run GitHub Actions against that exact head
3. inspect all gate results; fix real failures rather than weakening checks
4. verify current `main` has not unexpectedly moved from the branch base or otherwise assess mergeability
5. inspect submitted reviews
6. inspect inline review threads
7. inspect PR comments/blockers
8. update PR #12 body with final exact-head verification
9. leave the PR unmerged until the user explicitly authorizes **PR #12**

After an authorized merge:

1. verify resulting `main` SHA
2. update this handoff to make v6.5.0 the released baseline
3. verify post-merge CI
4. perform hosted Android/PWA acceptance:
   - Settings shows v6.5.0
   - both mode names visible
   - Sugar active
   - Cutthroat disabled/coming next
   - Mix Everything reports 100 cards
   - category counts/filtering work
   - old Saved cards still work even if not in the 100
   - pre-existing active run can resume
   - full card reveal/answer flow works
   - final airplane-mode relaunch works without clearing app data
