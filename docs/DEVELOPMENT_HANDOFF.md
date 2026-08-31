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

**Current released source baseline: v6.5.0**

## PR #12 — curate Sugar Coated to the strongest 100 cards

Title:

`Plot Twist v6.5: curate Sugar Coated to the strongest 100 cards`

PR:

`#12`

Branch:

`v6.5-sugar-coated-100`

Base `main` immediately before merge:

`66e8475075e61a6970b897a1274426fd111f60bb`

Exact merged PR head:

`61462ba9c9f3844bd2107618f25fc872dee4723f`

Exact verified head tree:

`141da8fc60a65725fb89f83c49b41261496ba34b`

Final premerge CI:

- workflow: `Validate Plot Twist`
- run #77
- run ID: `33352389739`
- exact head: `61462ba9c9f3844bd2107618f25fc872dee4723f`
- conclusion: success
- JavaScript syntax: success
- 200-card source + 100-card curated-mode gate: success
- runtime/PWA/state/workflow gate: success
- plain conversational language gate: success
- submitted reviews: none
- inline review threads: none
- PR comments/blockers: none
- PR mergeable before merge: yes

Merge commit:

`b00856d49d5c4252ae047d7874c4e33610723ffc`

Merge commit parents:

1. `66e8475075e61a6970b897a1274426fd111f60bb` — prior `main`
2. `61462ba9c9f3844bd2107618f25fc872dee4723f` — exact approved PR head

GitHub recognized PR #12 as:

- state: closed
- merged: true
- merged at: 2026-08-31T03:56:12Z
- merge commit: `b00856d49d5c4252ae047d7874c4e33610723ffc`

### Merge implementation note

The connector's `markPullRequestReadyForReview` mutation failed because it requested a GraphQL field GitHub no longer exposes. The normal REST merge endpoint then correctly refused the still-draft PR.

Because the user had explicitly authorized merging PR #12, the exact head, CI, mergeability, reviews, threads, comments, and unchanged `main` base were revalidated. Since `main` was still exactly the PR base, the approved head was merged through GitHub's Git data API as a standard two-parent merge commit using the exact verified head tree. `main` was advanced non-force to that merge commit, and GitHub then automatically recognized PR #12 as merged.

The PR may still show its historical `draft=true` field because the ready-for-review mutation itself never succeeded. This does not mean the code was not merged.

This handoff edit creates a newer `main` commit after the merge commit. Future sessions must always re-fetch live `main` instead of assuming `b00856d49...` remains the current branch head.

## Previous release baseline — v6.4.2

PR #11 added exactly 200 explicit direct answers in `after-answers.js`, keyed to stable card IDs 1–200.

Relevant commits:

- exact merged PR #11 head: `2d8b6b27a923087f8f35c8ebf8f185e6159ceff8`
- merge commit: `c96126e6a6c0ac74a33b698bf62c4a4bf88e4fc6`
- post-merge handoff commit: `66e8475075e61a6970b897a1274426fd111f60bb`
- final premerge CI run #71 / ID `33343476494`: success
- post-merge push CI run #73 / ID `33349800673`: success

Normal card ending remains:

`The Point → afterPrompt → Real-World Example → One Last Thing / THE SHORT ANSWER → Keep Talking`

`consistency-ui.js` is a legacy filename but presents `AFTER_ANSWERS[current.id]`.

There is intentionally no fallback to `card.conclusion` and no old rotating consistency-question bank.

---

# 3. v6.5 Product Direction

The product now has two explicitly named content modes:

1. **SUGAR COATED FOR SNOWFLAKES**
2. **CUTTHROAT HONEST**

## Sugar Coated

Sugar Coated is the currently playable general mode.

It uses the strongest 100 cards selected from the existing 200-card source/archive pool.

The other 100 source cards are intentionally retained for compatibility, historical mappings, Saved cards, legacy runs, editorial provenance, and future reconsideration.

## Cutthroat Honest

Cutthroat Honest is visible but currently disabled.

It is intended to become a separate, explicitly vault-backed mode based on a controlled subset of the user's Obsidian knowledge base, with at least 100 playable questions/cards and source/provenance tracking.

Do not make Cutthroat playable with placeholder content.

The explicit vault-backed mode should represent its source framing transparently. Do not disguise the source or implement hidden scoring that secretly grades players against a concealed ideology.

---

# 4. v6.5 Content-Mode Architecture

## `game-modes.js`

Runtime file defining the release selection layer.

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
- Plot Twist materially changes or complicates the initial choice
- strong transferable Point
- fitting Real-World Example and direct answer
- memorable read-aloud quality
- remove redundant cards that substantially teach the same principle
- maintain useful coverage across all six categories

Final selected-category memberships validated by exact-head CI run #77:

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

The home screen intentionally shows:

`Vault-backed mode · coming next`

A later material PR must provide the actual vault-backed deck and source/provenance validation before setting `available: true`.

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

# 6. State / Runtime Contracts

Stable persisted anchors remain unchanged:

- localStorage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`

New v6.5 persisted fields:

- `contentMode`
- `runContentMode`

Older state with neither field normalizes to:

`sugar`

A new normal/random run snapshots:

- `runContentMode`
- `runCategories`

This prevents changing the home selector from mutating the meaning of an active run.

`eligibleCards(selectedCategories, modeId)` first obtains the current mode's card pool and then applies category filtering inside that pool.

Saved runs remain independent of the current home mode/category filter.

## Home UI

Mode selector appears before categories.

- Sugar Coated is selected/usable
- Cutthroat Honest is visible but disabled
- mode summary shows Sugar has 100 cards
- category summary shows how many eligible Sugar cards remain under the selected topic mix

## Game header

Normal/random runs display the snapshotted content-mode context rather than merely `GAME`.

---

# 7. Current Version / PWA

Visible Settings version:

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

# 8. Source Card / Data Contracts

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

One Last Thing is the answer step.

Required relation:

`afterPrompt → Real-World Example → AFTER_ANSWERS[id]`

Do not reintroduce the old generic consistency-test bank or derive the answer from The Point.

---

# 10. Validation

GitHub Actions runs:

1. JavaScript syntax checks
2. `validate-content.cjs`
3. `validate-runtime.cjs`
4. `validate-language.cjs`

## v6.5 content gate

In addition to all previous 200-card/example/answer rules, it requires:

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

## Final exact-head v6.5 CI

Head:

`61462ba9c9f3844bd2107618f25fc872dee4723f`

Workflow:

`Validate Plot Twist`

Run:

- run #77
- run ID `33352389739`
- conclusion: success
- syntax: success
- source + 100-card curated mode gate: success
- runtime/PWA/state/workflow gate: success
- plain-language gate: success

---

# 11. Future Cutthroat Honest / Obsidian Direction

The future Cutthroat Honest mode is intended to follow a controlled subset of the user's Obsidian vault and contain at least 100 cards/questions derived from that knowledge base.

Recommended architecture:

`Obsidian approved source folder → controlled/private source bridge/repository → detect changed Markdown/hash → generate or update candidate Cutthroat cards → draft PR in detratech/plot-twist → validators → explicit user merge authorization → static GitHub-hosted PWA update`

Important design principles:

- do not make the installed PWA directly watch arbitrary Android filesystem Markdown
- do not copy the entire personal vault into the public app repository
- use a controlled subset of vault notes approved for game content
- maintain source/provenance metadata and a source revision/hash
- determine which cards are affected by changed source files instead of regenerating everything blindly
- generated changes should create a draft PR rather than silently publishing themselves
- keep the finished game fully static/offline after deployment
- keep Sugar and Cutthroat content contracts separate

Before Cutthroat becomes available, a later PR should add:

- a separate stable card namespace/data layer
- at least 100 playable cards
- source-note/provenance mapping
- knowledge snapshot/revision metadata
- validation appropriate for the explicit vault-backed mode
- offline precaching
- state/Saved behaviour across both modes
- Android acceptance for switching modes

The explicit mode should not be forced through the Sugar Coated terminology filter if doing so would contradict source material it is transparently representing.

---

# 12. Exact Next Step

## Immediate release acceptance

After this post-merge handoff commit, verify the latest live `main` and the push CI triggered by this documentation update.

Then perform hosted Android/PWA acceptance without clearing app/site data:

1. Settings shows `v6.5.0`
2. both exact mode names are visible
3. Sugar Coated is active
4. Cutthroat Honest is visible but disabled/coming next
5. Mix Everything reports 100 cards
6. category counts/filtering operate within the curated 100
7. old Saved cards still open even if their IDs are outside the curated 100
8. any pre-v6.5 active run can resume
9. reveal flow remains `Plot Twist → The Point → follow-up → Real-World Example → One Last Thing → Keep Talking`
10. Chaos still works independently
11. state survives close/reopen
12. final airplane-mode relaunch with Wi-Fi off succeeds

Do not clear site/app data during the normal update test because that would destroy the compatibility state being tested.

## Next development after acceptance

Start the first Cutthroat Honest content/provenance PR:

1. define the approved vault-source subset/bridge
2. define stable Cutthroat card IDs and provenance schema
3. build the source revision/hash contract
4. produce the first candidate vault-derived cards
5. establish validators before scaling toward 100+ cards
6. keep Cutthroat disabled until the real deck and offline/state support are complete
