# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> **docs/DEVELOPMENT_HANDOFF.md is the authoritative continuity document for this project. Every material development PR must update this file before merge. The update must reflect the actual final state of the branch, completed work, important decisions, tests and validation, current GitHub state, unresolved issues, and the exact next step. A material development PR is not complete until the handoff is current.**
>
> **Current repository code and verified GitHub state outrank this document. If the handoff is discovered to be stale or incorrect, verify the repository and correct the handoff immediately rather than following stale instructions.**
>
> **Do not rely on ChatGPT conversation history as the durable source of project state. Important development context must be captured in this repository handoff.**

## Handoff maintenance triggers

Update this file whenever material work changes architecture, product rules, storage/state compatibility, runtime behaviour, important UI/workflows, deployment, development procedures, testing, current PR status, unresolved issues, or the exact next step.

At minimum:

1. Update it before every material PR is merged.
2. If development stops mid-PR and the current chat/session is approaching its limit, update it before handing the project to another chat.
3. After a material merge, update it again if the released baseline or next step changed.
4. Remove resolved TODOs instead of letting stale items accumulate.

---

# 1. Project Identity

## Project name

**Plot Twist**

## GitHub repository

`detratech/plot-twist`

Default branch: `main`

Repository visibility: public.

## Purpose

Plot Twist is an offline-first social scenario game intended primarily for Android phones during camping trips, game nights, travel, or other situations with little or no connectivity.

Released v6.2 core loop:

`scenario → choose one of two defensible positions → defend it → reveal Plot Twist → reconsider/switch if warranted → The Point → deeper question → Real-World Example → follow-up discussion`

Active v6.3 branch extends that normal resolution flow to:

`scenario → choose → defend → Plot Twist → reconsider → The Point → deeper question → Real-World Example → One Last Thing → Where This Can Go`

The product must feel like an adult party/campfire game, not a survey, classroom exercise, religious app, philosophy app, or debate-training tool.

## Current released baseline

**v6.2.0 is released on `main`.**

PR #4 — **Plot Twist v6.2: prominent choices and real-world examples** — was explicitly authorized by the user and merged on 2026-08-21 (America/Vancouver).

Merged PR head:

`34a5fd3dec48e0651a67ced093a15917887f999a`

Merge commit:

`c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

The user subsequently confirmed the hosted/installed app reports the correct v6.2 version and said they like the result.

Current verified `main` before the v6.3 branch work:

`045684ad04e5dd6f823a14d2caf49353846f197a`

Commit message:

`Correct handoff for GitHub-only workflow`

## Current active development

PR #5 — **Plot Twist v6.3: consistency pressure tests**

Branch:

`v6.3-consistency-pressure-tests`

Base:

`main`

Base SHA at PR creation:

`045684ad04e5dd6f823a14d2caf49353846f197a`

PR state at the time this handoff was edited:

- open
- draft
- not merged
- intended to remain draft until exact-head CI is green and the user decides whether to authorize merge

Last exact PR head verified **before this handoff edit**:

`b41a4001cbe547180c9af5dc05725cbdea57cab8`

Important Git self-reference limitation: this handoff file cannot contain the SHA of the commit that contains its own final edited contents. A fresh session must re-fetch PR #5 and use GitHub as the source of truth for the live exact head SHA and CI attached to that head.

## v6.3 scope

v6.3 is deliberately a focused mechanics upgrade, not another 200-card rewrite.

It adds one concise consistency pressure test to the normal resolution of every card while preserving the existing dilemma, history, category, Saved-card, and persistence architecture.

The new player-facing section is labelled:

`ONE LAST THING`

Eight deterministic test types:

1. `SAME RULE?` — role reversal
2. `WHAT WOULD CHANGE YOUR MIND?` — identify evidence that could genuinely change the conclusion
3. `OUTCOME TEST` — keep the principle when the result is personally disliked
4. `STRANGER TEST` — remove identity attachment
5. `EVERYONE GETS IT` — universal application
6. `YOUR TURN` — self-application
7. `POWER FLIP` — apply the same rule after power reverses
8. `CROSSOVER` — transfer the same standard across family, money, work, and public life

Prompt assignment is deterministic by stable card ID using:

`(current.id - 1) % TESTS.length`

This makes a card's pressure test stable across sessions without adding a new state field.

## Primary technologies / frameworks

- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- Node.js 22 for GitHub Actions/static validation only
- Progressive Web App manifest
- Service Worker / Cache API
- browser `localStorage`
- optional Screen Wake Lock API
- GitHub Actions
- GitHub-hosted static deployment / GitHub Pages workflow

There is deliberately **no framework, bundler, package-manager install step, backend, database, authentication service, analytics service, runtime external API, CDN, or remote font/image dependency**.

## Operating environment

### Player environment

- Android Chrome is the target install/test environment.
- The installed PWA must remain usable in full airplane mode with Wi-Fi off after the required assets are cached.

### Development environment

**The user does not maintain a local repository for Plot Twist. This project is developed and hosted through GitHub.**

Do not instruct the user to run `git pull`, `git switch`, `node`, `python -m http.server`, or any other local-repository command as part of the normal Plot Twist workflow unless the user explicitly chooses to create a local clone later.

Normal path:

`GitHub repository → feature branch/PR → GitHub Actions validation → explicit user authorization → merge to main → GitHub-hosted deployment → Android/PWA acceptance test`

## Important repository paths

### Runtime shell and UI

- `index.html`
- `styles.css`
- `categories.css`
- `game-v6.2.css` — prominent A-vs-B presentation
- `game-v6.3.css` — v6.3 `One Last Thing` callout styling
- `app.js`
- `choice-ui.js`
- `history-ui.js`
- `consistency-ui.js` — v6.3 eight-test deterministic pressure-test layer

### Card/category data

- `cards.js`
- `deck-a.js` through `deck-h.js` — eight 25-card files, exactly 200 cards
- `categories.js`

### Runtime Real-World Example data

- `history-a.js`
- `history-b.js`
- `history-c.js`
- `history-d.js`
- `history-reviewed.js` — audited replacements loaded after draft mappings

### Historical research ledger

Editorial/research only; not runtime dependencies:

- `HISTORY_SOURCES.md` — IDs 1–50
- `HISTORY_SOURCES_51_100.md` — IDs 51–100
- `HISTORY_SOURCES_101_150.md` — IDs 101–150
- `HISTORY_SOURCES_151_200.md` — IDs 151–200

### PWA/offline

- `manifest.webmanifest`
- `sw.js`
- `icons/`
- `.nojekyll`

### Validation/documentation

- `validate-content.cjs`
- `.github/workflows/validate.yml`
- `VALIDATION.md`
- `README.md`
- `docs/DEVELOPMENT_HANDOFF.md`

---

# 2. Architecture

## Frontend

Plot Twist is a single-page, framework-free web application.

`index.html` provides the screens. `app.js` manages navigation, shuffled deck order, card rendering, reveal state, Saved cards, settings, category selection, Random/Next behaviour, Chaos prompts, install handling, wake lock, persistence, and service-worker status.

Presentation/runtime layers are modular:

- `choice-ui.js` turns authored choice strings into a prominent decision label plus smaller reason.
- `game-v6.2.css` renders the two choices side by side with a center divider and `VS` marker.
- `history-ui.js` inserts the card-specific Real-World Example after the post-Point question.
- `consistency-ui.js` inserts one deterministic `One Last Thing` pressure test immediately after the Real-World Example.
- `game-v6.3.css` styles that new block without replacing the existing v6.2 choice layer.

## Runtime data flow

1. `cards.js` initializes the shared card array and 16 Chaos prompts.
2. `deck-a.js` through `deck-h.js` append all 200 cards.
3. `history-a.js` through `history-d.js` populate draft `HISTORICAL_EXAMPLES` entries.
4. `history-reviewed.js` overwrites selected IDs with audited replacements.
5. `categories.js` preserves/infers category tags.
6. `app.js` filters, shuffles, persists, and renders cards.
7. `choice-ui.js` applies choice presentation.
8. `history-ui.js` injects the Real-World Example after `afterPrompt`.
9. `consistency-ui.js` locates the rendered history block and inserts `One Last Thing` after it.

## Backend / database / authentication

None.

There is no server persistence, SQL schema, ORM, API server, account system, or authentication layer.

## Persistence

Browser `localStorage` stores compatible game state including current order/position, reveal state, Saved card IDs, category selection, and settings.

Compatibility anchors:

- local-storage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`
- stable card IDs 1–200

v6.3 intentionally does **not** add a new persistence field or change these anchors.

## Browser APIs

- Service Worker API
- Cache API
- `localStorage`
- PWA install events
- Screen Wake Lock API when supported

## External services

Runtime: none.

Development/editorial only:

- GitHub
- GitHub Actions
- external research URLs stored in source-ledger Markdown files

Research sources must never become required network dependencies for gameplay.

## Deployment / hosting

The project is hosted from GitHub and distributed as a static PWA.

The user does not maintain a separate local deployment.

A merge to `main` makes new source eligible for the hosted deployment, but an already-installed PWA may continue showing an older cached build until hosting is current and the browser/service-worker lifecycle activates the new cache.

Do not assume a newly merged version is active on the user's phone merely because `main` changed. Verify Settings on-device.

## Offline architecture

Released v6.2 cache:

`plot-twist-v6.2.0`

Active v6.3 branch cache:

`plot-twist-v6.3.0`

The v6.3 service-worker app shell adds:

- `game-v6.3.css`
- `consistency-ui.js`

while retaining all prior required HTML/CSS, deck, history, category, app, manifest, and icon assets.

Offline navigation falls back to cached `index.html`.

The historical research Markdown files are not runtime cache dependencies.

---

# 3. Sources of Truth

Use this precedence:

1. Current repository code on the exact verified GitHub branch/head.
2. `validate-content.cjs` and `.github/workflows/validate.yml` for executable validation contracts.
3. `docs/DEVELOPMENT_HANDOFF.md`, `VALIDATION.md`, and `README.md` for maintained explanatory context.
4. Chat history only as non-authoritative background.

## Card schema and deck size

Authoritative:

- `deck-a.js` through `deck-h.js`
- `validate-content.cjs`

Hard constraints include:

- exactly 200 cards
- IDs 1–200 complete/unique
- two scenario paragraphs
- exactly two distinct substantive choices
- substantive Plot Twist
- declarative conclusion
- valid follow-up structure
- one or two valid category IDs

## Category mappings

Authoritative:

- authored card `categories`
- `categories.js`

Categories:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

## Historical example mappings

Runtime precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js`, loaded afterward and authoritative for overridden IDs

Do not remove `history-reviewed.js` as apparent duplication without understanding its audit purpose.

## v6.3 consistency layer

Authoritative:

- `consistency-ui.js`
- `game-v6.3.css`
- corresponding integration assertions in `validate-content.cjs`

The eight-test bank is intentionally universal and side-neutral. It pressure-tests the player's stated rule; it does not encode a correct answer per card.

## Historical research support

Authoritative editorial ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

## Persistence / compatibility

Authoritative: `app.js`

Compatibility anchors:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- card IDs 1–200

## Offline configuration

Authoritative:

- `sw.js`
- `manifest.webmanifest`
- runtime asset references in `index.html`
- validator assertions in `validate-content.cjs`

## CI

Authoritative: `.github/workflows/validate.yml`

Environment:

- `ubuntu-latest`
- Node.js 22

There are no application financial calculations or database migrations.

---

# 4. Important Decisions Already Made

## Product identity

The game is an adult party/campfire experience first. Deep discussion is the outcome, not visible branding.

Rejected/restricted approaches:

- classroom/quiz framing
- overt debate-training framing
- exposing source-worldview/authoring framework
- turning the runtime into a religious/philosophy-branded product
- explicit scoring or a visible `correct answer` system

## Offline-first is non-negotiable

Do not introduce runtime APIs, CDNs, remote fonts/images, authentication dependencies, server-side content fetches, or required research-site access without explicit product justification.

## Framework-free architecture

The app intentionally remains vanilla HTML/CSS/JS with no build system. Do not introduce a framework merely because it is conventional.

## GitHub-only user workflow

The user's normal Plot Twist workflow is hosted/GitHub-based. There is **no local Plot Twist repo to update after merges**.

Future chats must not invent a local path or give local Git/build/start commands as if required.

After merges, verify the hosted deployment and then test the installed Android PWA/version/update path.

## Two-sided dilemma rule

Every card begins with two defensible choices. A thoughtful adult should be able to defend either side before the reveal.

Do not write:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- `it depends` escape choice
- Plot Twist that repeats setup information
- reveal that only congratulates one side

Target:

`two defensible positions → commitment → decision-relevant new information → reconsider → principle`

Changing sides after the reveal is allowed and intentional.

## Declarative `The Point`

The reveal may create nuance, but `The Point` should land a clear principle.

## Hidden source layer

Player-facing runtime text intentionally excludes protected source-worldview and authoring/meta terminology. `validate-content.cjs` enforces this.

Do not weaken those checks merely to make new content pass.

## v6.2 choice presentation

Current design contract:

- two side-by-side columns
- center divider
- `VS`
- prominent decision label
- smaller reason

## Real-World Example placement

Each card has one local Real-World Example displayed **after** the post-Point question.

## v6.3 consistency placement

`One Last Thing` appears **after** the Real-World Example and before the later follow-up material.

Rationale:

- the player first commits to a rule
- the Plot Twist can destabilize the first answer
- `The Point` names the principle
- the Real-World Example grounds the tension
- only then does `One Last Thing` ask whether the same standard survives a role/outcome/power/domain change

This should deepen consistency checking without turning the game into a scored ideology quiz.

## Chaos stays separate

`cards.js` already contains 16 strong optional Chaos pressure tests, including evidence checks and `SAME ENERGY`.

v6.3 does not replace or duplicate Chaos as a button mechanic. `One Last Thing` is the guaranteed concise consistency check in normal card resolution; Chaos remains random, optional, more playful, and more aggressive.

## Historical audit policy

Accuracy and analogy fit outrank fame. Prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical. Do not overclaim what a source proves.

## Card 184 decision

The weaker polio/ice-cream anecdote was replaced with the documented **1973 UC Berkeley graduate-admissions / Simpson's paradox** example.

## Stable state/deck version

`masterpiece-200-v1` intentionally remains stable through v6.3 because internal IDs and persisted state structure remain compatible.

Do not bump it merely to refresh assets. Use the service-worker cache version for asset refresh.

## Visible app version

Released v6.2 Settings: `v6.2.0`

Active v6.3 branch Settings: `v6.3.0`

## No visible card numbering

Internal IDs must remain invisible in normal player-facing game/Saved presentation.

---

# 5. Current Implemented Behaviour

## Topic selection

The home screen supports six topic selectors plus `Mix Everything` and supports multi-select category mixing.

Expected behaviour:

- selecting a specific category removes `Mix Everything`
- removing the last specific category falls back to `Mix Everything`
- combined categories form a union without duplicate cards in the run

## Start / Random

Start Game and Random From Selected respect the active topic selection.

## Released v6.2 card flow

`scenario → two prominent choices → commit/discuss → Plot Twist → reconsider/switch → The Point → post-Point question → Real-World Example → Where This Can Go`

## Active v6.3 branch card flow

`scenario → two prominent choices → commit/discuss → Plot Twist → reconsider/switch → The Point → post-Point question → Real-World Example → One Last Thing → Where This Can Go`

## One Last Thing

Every card receives exactly one of eight short consistency prompts.

Assignment is deterministic by stable card ID. No new saved-state structure is required.

## Saved cards

Cards can be saved and revisited. Saved playback is independent of current category filtering.

## Chaos

`cards.js` defines 16 universal optional Chaos pressure tests.

## Host prompts / Where This Can Go

Every card provides two follow-up directions.

## Persistence

Game state survives normal refresh/close/reopen through `localStorage`, subject to browser/site-data behaviour.

Do not casually recommend clearing site data because that removes Saved cards/settings/state.

## PWA/offline

After the service worker has cached the app shell, the installed app must launch and play with airplane mode enabled and Wi-Fi off.

## Version visibility

Released main: `v6.2.0`

Active v6.3 branch: `v6.3.0`

---

# 6. Compatibility and Migration Constraints

There is no database schema or migration system.

Compatibility anchors:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- card IDs 1–200
- `HISTORICAL_EXAMPLES[id]` aligned to the same card IDs

Renumbering IDs is not cosmetic because IDs connect Saved cards, persisted state, runtime card data, historical examples, research-ledger entries, and now deterministic consistency-prompt assignment.

`history-reviewed.js` is intentional editorial/audit structure and must not be removed merely because it looks duplicative.

v6.3 adds presentation/runtime assets without intentionally invalidating existing compatible player state.

When runtime assets change:

1. determine whether `sw.js` must precache them
2. bump the cache name when installed copies must receive changed assets
3. update validator expectations deliberately
4. test the update path from the prior installed version

Avoid clearing site data during compatibility testing unless genuinely necessary.

---

# 7. Development and Safety Rules

1. Do not weaken validation merely to make tests pass.
2. Do not change `plotTwistStateV4`, `masterpiece-200-v1`, stable card IDs, history-ID mappings, or service-worker update logic without checking compatibility impact.
3. Do not introduce runtime network dependencies casually.
4. Do not expose forbidden source-worldview or authoring/meta terminology in runtime content.
5. Do not regenerate or renumber the 200-card deck without an explicit migration decision.
6. Do not replace researched examples with famous anecdotes without checking sources.
7. Do not treat green static CI as proof of Android PWA/service-worker behaviour.
8. Do not clear real browser site data as a routine test step.
9. Do not commit secrets, API keys, tokens, credentials, backups, machine-specific files, or incidental logs.
10. Add/strengthen regression validation for fixed bugs where practical.
11. Preserve player-facing card-number invisibility.
12. If a runtime asset is added/renamed, inspect `index.html`, `sw.js`, and `validate-content.cjs` together.
13. Prefer non-destructive acceptance testing.
14. Update this handoff before material merge or handoff to a fresh chat.
15. **Do not invent a local repository workflow. Plot Twist is GitHub-hosted and the user does not maintain a local clone.**
16. Keep consistency prompts side-neutral: they should test whether a stated rule generalizes rather than revealing a hidden `correct` answer.
17. Do not merge PR #5 or any later material PR without explicit user authorization for the exact revalidated head.

---

# 8. Git and Pull Request Workflow

## Branch strategy

- `main` is the released baseline.
- Material development occurs on a feature branch.
- Reuse an existing matching PR rather than creating duplicates.

## PR / CI strategy

- Material work should be represented by a PR.
- `.github/workflows/validate.yml` is the required validation workflow.
- A merge decision must use CI attached to the **exact current PR head SHA**.
- Every material PR must update this handoff before merge.

## Mandatory user authorization rule

**Never merge a material PR without the user's explicit authorization for that specific PR.**

Immediately before an authorized merge:

1. Re-fetch the PR.
2. Verify exact head SHA.
3. Verify CI passed on that exact SHA.
4. Verify mergeability.
5. Check submitted reviews.
6. Check inline review threads.
7. Check PR comments/blockers.
8. Ensure this handoff is current.
9. Merge only the exact verified head after explicit approval.

If the branch changes after authorization, revalidate and reconfirm authorization for the new head.

## After a merge

1. Re-fetch `main`.
2. Verify the resulting `main` SHA.
3. Confirm the intended PR is part of `main`.
4. Update this handoff if the released baseline or continuation point changed.
5. **Do not provide local-repository update commands to the user. There is no normal local Plot Twist repo.**
6. Verify/allow for the GitHub-hosted deployment, then have the user confirm the visible app version and perform the hosted Android/PWA acceptance test.

---

# 9. Development Workflow

## Normal workflow

Plot Twist is developed and hosted through GitHub. The user does not maintain a local repository.

Normal flow:

1. Inspect/edit repository files on a GitHub feature branch.
2. Open/update the relevant PR.
3. Let GitHub Actions run syntax/content validation.
4. Resolve code/content/review issues on that branch.
5. Keep `docs/DEVELOPMENT_HANDOFF.md` current.
6. Obtain explicit user authorization before material merge.
7. Perform exact-head merge checks.
8. Merge to `main`.
9. Verify `main` from GitHub.
10. Verify the hosted version on Android/PWA.

## Local repository path

**Not applicable in the user's current workflow. No local Plot Twist repository is maintained.**

## Dependency installation

None for the hosted application.

## Build command

None. There is no build step.

## Local development/start command

Not part of the user's normal workflow.

A future developer may optionally clone/run the static site for debugging if explicitly useful, but must not present that optional environment as something the user already has or must maintain.

---

# 10. Testing and Validation

## GitHub Actions

Workflow: `.github/workflows/validate.yml`

Name: `Validate Plot Twist`

Environment:

- `ubuntu-latest`
- Node.js 22

It runs JavaScript syntax checks plus `node validate-content.cjs`.

The workflow now includes syntax validation for `consistency-ui.js`.

## Validator coverage

The validator checks, among other things:

- exactly 200 cards
- IDs 1–200 complete/unique
- required fields
- two scenario paragraphs
- exactly two distinct/substantive choices
- no `it depends` escape
- conservative loaded-choice wording lint
- substantive Plot Twists
- valid category assignments
- exactly 200 substantive Real-World Examples
- required deck/history files loaded
- required runtime assets precached
- two-choice How to Play contract
- Real-World Example placement
- v6.2 A-vs-B UI structural hooks
- `game-v6.3.css` and `consistency-ui.js` loaded and precached
- exactly eight unique consistency pressure-test titles
- required pressure-test types present
- `ONE LAST THING` label present
- consistency block inserted after Real-World Example
- deterministic selection from stable card ID
- visible `v6.3.0`
- `masterpiece-200-v1`
- cache `plot-twist-v6.3.0`
- protected forbidden/meta wording checks include the new runtime layer

## Manual Android acceptance for v6.3

After v6.3 is merged and the hosted app updates, verify:

1. Settings shows `v6.3.0`.
2. Existing Saved cards/settings survive the v6.2 → v6.3 update.
3. Side-by-side A-vs-B panels remain readable/tappable.
4. Long choice labels/reasons do not overlap the divider/`VS` marker.
5. Reveal order is `Plot Twist → The Point → post-Point question → Real-World Example → One Last Thing`.
6. Historical titles/body plus the new consistency block remain comfortable to read on a narrow phone.
7. Several different cards display different consistency prompts.
8. Reopening the same card retains the same prompt assignment because it is deterministic by card ID.
9. `SAME RULE?`, `WHAT WOULD CHANGE YOUR MIND?`, `OUTCOME TEST`, and `CROSSOVER` feel natural in actual discussion.
10. Category filtering and multi-select mixing still work.
11. Random respects selected categories.
12. Saved playback works independently of the filter.
13. State survives close/reopen.
14. Chaos remains separate and works normally.
15. Where This Can Go, Next, Saved, Settings, and wake-lock-related behaviour still work.
16. After the new service worker activates, fully close the app, enable airplane mode, turn Wi-Fi off, relaunch from the installed icon, and verify full gameplay.

Do not clear site data as the normal update test.

---

# 11. Current GitHub State

**Last verified while preparing PR #5. Always re-fetch before relying on these values.**

## `main`

`045684ad04e5dd6f823a14d2caf49353846f197a`

Commit message:

`Correct handoff for GitHub-only workflow`

Parent chain includes the v6.2 merge commit:

`c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

## Latest material merged PR

PR #4 — **Plot Twist v6.2: prominent choices and real-world examples**

- merged: yes
- exact merged head: `34a5fd3dec48e0651a67ced093a15917887f999a`
- merge commit: `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- pre-merge CI: `Validate Plot Twist` run #37, run ID `32542683784`, success on exact head
- pre-merge submitted reviews: none
- pre-merge inline review threads: none
- pre-merge PR comments: none

## Active PR

PR #5 — **Plot Twist v6.3: consistency pressure tests**

- state at handoff edit: open
- draft: yes
- merged: no
- branch: `v6.3-consistency-pressure-tests`
- base: `main`
- base SHA at creation: `045684ad04e5dd6f823a14d2caf49353846f197a`
- last exact head verified before this handoff edit: `b41a4001cbe547180c9af5dc05725cbdea57cab8`
- CI on the final post-handoff head: must be re-fetched; do not rely on a pre-handoff run

Because editing this handoff creates a new commit, a fresh session must fetch PR #5 live to obtain the exact current head and exact-head CI result.

---

# 12. Completed Work

## Original offline PWA

Completed:

- installable PWA
- local manifest/icons
- service-worker/offline cache
- local state restore
- Saved cards
- Chaos prompts
- Host prompts
- wake-lock support
- dark campfire-oriented UI

## 200-card expansion

Completed:

- exactly 200 cards
- eight 25-card deck files
- six selectable/mixable categories
- category-aware Start/Random
- stable internal IDs
- automated validation

## PR #2 — Rewrite all 200 cards as real two-sided dilemmas

Merged commit:

`2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

Established the stricter two-defensible-choice mechanic and stronger validator rules.

## PR #3 — Show app version in Settings

Merged as:

`f90afb2d3096763af555cf2110a5a2d539a5e5a1`

Added visible build/version reporting and v6.1.1 cache/version validation.

## PR #4 — v6.2 prominent choices and Real-World Examples

Merged as:

`c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

Completed:

- prominent A/B UI
- `choice-ui.js`
- `game-v6.2.css`
- `history-ui.js`
- 200 runtime Real-World Examples
- `history-reviewed.js` audited overrides
- full historical source ledger IDs 1–200
- v6.2.0 cache/version
- expanded validation
- README/VALIDATION updates
- permanent development handoff system

User acceptance after merge:

- hosted/installed app reported the correct v6.2 version
- user said they like the v6.2 result

## PR #5 — v6.3 consistency pressure tests

Implemented on active draft branch:

- `consistency-ui.js`
- eight deterministic side-neutral pressure tests
- `game-v6.3.css`
- `One Last Thing` inserted after Real-World Example
- How To Play updated
- Settings bumped to `v6.3.0`
- service-worker cache bumped to `plot-twist-v6.3.0`
- `game-v6.3.css` and `consistency-ui.js` added to offline app shell
- GitHub Actions syntax step expanded for `consistency-ui.js`
- `validate-content.cjs` expanded for v6.3 integration/contract checks
- README updated for v6.3 and GitHub-only user workflow
- VALIDATION updated for v6.3
- state/deck compatibility anchors preserved

---

# 13. Current Unresolved Issues

## 1. Exact-head CI for PR #5

The handoff update itself changes the PR head. Fetch PR #5 after this commit and verify `Validate Plot Twist` on the **new exact head**.

If CI fails, fix the branch rather than weakening validation.

## 2. PR #5 has not been user-authorized for merge

The user authorized implementation by saying to proceed, but that is not merge authorization.

Do not merge PR #5 until the user explicitly authorizes merging that PR after the exact-head checks.

## 3. v6.3 physical Android acceptance must happen after hosted deployment

The normal production hosting path is from `main`. After an authorized merge, verify hosted Settings reports `v6.3.0`, then run the manual checklist in section 10 without clearing local data.

## 4. Pressure-test editorial fit

The eight prompts are intentionally universal, but static validation cannot prove every prompt feels equally natural on all 200 cards. Phone/group testing should pay special attention to whether any test feels repetitive, too academic, too long, or awkward after a specific card.

## 5. Hosted URL details

The project is known to be GitHub-hosted, but the exact public Pages URL/settings are not recorded here. Verify and record the exact hosted URL only if needed for deployment debugging; do not invent it.

---

# 14. Exact Continuation Point

## Exact Next Step

1. Re-fetch PR #5 from GitHub.
2. Record its **live exact head SHA**; the pre-handoff head `b41a4001cbe547180c9af5dc05725cbdea57cab8` is expected to be stale because this handoff edit creates a new commit.
3. Confirm PR #5 is still open, draft, based on `main`, and has no unexpected review/comment blockers.
4. Fetch `Validate Plot Twist` for the live exact PR head.
5. If CI is still pending or absent, fetch again until GitHub has produced a result in the current session; do not claim success from an older head.
6. If CI fails, inspect the exact failing step/log, fix the branch, add/retain regression validation, and re-run against the new head.
7. If CI passes on the exact head, update the PR body with that exact head and CI run information.
8. Do **not** merge. Report PR #5 as ready for authorization and explain the main user-visible change: after each Real-World Example, one short `One Last Thing` consistency test now appears.
9. Only if the user explicitly says to merge PR #5: re-fetch exact head, exact-head CI, mergeability, submitted reviews, inline threads, PR comments/blockers, and handoff freshness; then merge only the verified head.
10. After merge, verify `main`, update this handoff if the released baseline changed, then have the user open the hosted/installed PWA while online and confirm Settings shows `v6.3.0`.
11. Run the v6.3 Android acceptance checklist, ending with airplane-mode relaunch. Do not clear site data as the normal update path.
