# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> **docs/DEVELOPMENT_HANDOFF.md is the authoritative continuity document for this project. Every material development PR must update this file before merge. The update must reflect the actual final state of the branch, completed work, important decisions, tests and validation, current GitHub state, unresolved issues, and the exact next step. A material development PR is not complete until the handoff is current.**
>
> **Current repository code and verified GitHub state outrank this document. If the handoff is discovered to be stale or incorrect, verify the repository and correct the handoff immediately rather than following stale instructions.**
>
> **Do not rely on ChatGPT conversation history as the durable source of project state. Important development context must be captured in this repository handoff.**

## Handoff maintenance triggers

Update this file whenever material work changes architecture, product/business rules, strategy, storage, schema/state compatibility, integrations, runtime behaviour, important UI/workflows, deployment, development procedures, testing, current PR status, unresolved issues, or the exact next step.

At minimum:

1. Update it before every material PR is merged.
2. If development stops mid-PR and the current chat/session is approaching its limit, update it before handing the project to another chat.
3. After a material merge, update it again if the released baseline or continuation point changed.
4. Remove or rewrite resolved TODOs instead of letting them accumulate.

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

Core loop:

`scenario → choose one of two defensible positions → defend it → reveal Plot Twist → reconsider/switch if warranted → The Point → deeper question → Real-World Example → follow-up discussion`

The product must feel like an adult party/campfire game, not a survey, classroom exercise, religious app, philosophy app, or debate-training tool.

The deck explores evidence, assumptions, responsibility, relationships, money, technology, society, purpose, consistency, incentives, and related ideas. The player-facing runtime deliberately does **not** expose the source-worldview/authoring framework behind those ideas.

## Current development / production status

### Released baseline on `main`

**v6.2.0 is now merged to `main`.**

PR #4 — **`Plot Twist v6.2: prominent choices and real-world examples`** — was explicitly authorized by the user and merged on 2026-08-21 (America/Vancouver).

Exact merged PR head:

`34a5fd3dec48e0651a67ced093a15917887f999a`

Merge commit:

`c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

The merge commit has parents:

- previous `main`: `d5ee158222181ee422699811b2e0baae79703e1e`
- PR #4 head: `34a5fd3dec48e0651a67ced093a15917887f999a`

Immediately before merge, GitHub was re-fetched and verified:

- exact PR head matched the authorized SHA
- mergeable: yes
- `Validate Plot Twist` run #37, run ID `32542683784`, passed on that exact head
- submitted reviews: none
- inline review threads: none
- PR comments: none
- handoff file present/current

PR #4 was taken out of draft without changing its head SHA, then merged with `expected_head_sha` pinned to the verified head.

### Current active development

There is no known material development PR immediately after the v6.2 merge.

The current continuation task is **post-merge Android acceptance testing of the deployed/installed v6.2.0 PWA**. The user had been seeing v6.1.1 before the merge; the purpose of merging was to make the production `main` build available for the real phone/service-worker test.

## v6.2.0 contents

- prominent side-by-side A-vs-B choice presentation
- center divider and `VS` marker
- large decision label plus smaller reason text
- one local Real-World Example for every one of the 200 cards
- researched/audited historical-example override layer
- complete source ledger for IDs 1–200
- validator coverage for history and presentation layers
- visible app version `v6.2.0`
- service-worker cache `plot-twist-v6.2.0`
- permanent repository development handoff system

## Primary technologies / frameworks

- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- Node.js 22 for CI/static validation only
- Progressive Web App manifest
- Service Worker / Cache API
- browser `localStorage`
- optional Screen Wake Lock API
- GitHub Actions
- GitHub Pages as the documented distribution path from `main`

There is deliberately **no framework, bundler, package-manager dependency install, backend, database, authentication service, analytics service, runtime external API, CDN, or remote font/image dependency**.

## Operating environment

### Player environment

- Android Chrome is the target install/test environment.
- The installed PWA must remain usable in full airplane mode with Wi-Fi off after the required assets are cached.

### Development environment

- Give the user Windows PowerShell commands unless a specific task requires another shell.
- CI runs on `ubuntu-latest` with Node.js 22.
- The exact local repository checkout path has **not** been verified. Do not invent one.

## Important repository paths

### Runtime shell and UI

- `index.html` — screens, rules, Settings markup, script/style loading
- `styles.css` — base visual system
- `categories.css` — topic selector styling
- `game-v6.2.css` — v6.2 A-vs-B/history presentation
- `app.js` — main app/game state and interaction logic
- `choice-ui.js` — v6.2 choice label/reason rendering
- `history-ui.js` — inserts the card-specific Real-World Example after the post-Point question

### Card and category data

- `cards.js` — shared `PLOT_TWIST_CARDS` initialization and 16 universal Chaos prompts
- `deck-a.js` through `deck-h.js` — eight 25-card files, exactly 200 cards
- `categories.js` — category definitions and authored/inferred tag handling

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

`index.html` provides the main semantic screens. `app.js` manages navigation, shuffled deck order, card rendering, reveal state, Saved cards, settings, selected categories, Random/Next behaviour, Chaos prompts, install handling, wake lock, persistence, and service-worker status.

v6.2 keeps presentation additions modular:

- `choice-ui.js` transforms authored choice strings into a prominent decision label and a secondary reason.
- `game-v6.2.css` renders the two choices as side-by-side panels with a center divider and `VS` marker.
- `history-ui.js` maps the current card ID to `HISTORICAL_EXAMPLES` and inserts the Real-World Example immediately after the post-Point question.

## Runtime data flow

1. `cards.js` initializes the shared card array and Chaos prompts.
2. `deck-a.js` through `deck-h.js` append all 200 cards.
3. `history-a.js` through `history-d.js` populate draft `HISTORICAL_EXAMPLES` entries.
4. `history-reviewed.js` overwrites selected IDs with research-audited replacements.
5. `categories.js` preserves valid authored category tags and infers tags where needed.
6. `app.js` filters/shuffles/renders cards according to selected categories and persisted state.
7. `choice-ui.js` applies the two-level choice visual hierarchy.
8. `history-ui.js` injects the final Real-World Example into the rendered card flow.

## Backend / database / authentication

None.

There is no server persistence, SQL schema, ORM, API server, account system, or authentication layer.

## Persistence / storage

Browser `localStorage` stores compatible game state including shuffled order/current position, reveal state, Saved card IDs, category selection, and settings.

Compatibility anchors:

- local-storage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`

The exact current state object structure in `app.js` is authoritative if prose documentation ever conflicts.

## Browser APIs

- Service Worker API
- Cache API
- `localStorage`
- PWA install events
- Screen Wake Lock API when supported

## External services

Runtime: none.

Development/editorial only:

- GitHub / GitHub Actions
- external research URLs stored in the source-ledger Markdown files

Research sources must never become required network dependencies for gameplay.

## Deployment / hosting

The repository documents GitHub Pages from `main` as the production distribution path, with Android Chrome installation as a PWA.

A merge to `main` makes the new source eligible for deployment, but an already-installed PWA may continue showing an older cached build until GitHub Pages has published the new `main` state and the browser/service-worker update lifecycle activates the new cache.

The exact live GitHub Pages URL/configuration was not independently verified during this handoff maintenance pass. Do not invent it.

## Offline architecture

`sw.js` precaches the app shell needed for gameplay, including:

- HTML/CSS
- all eight deck files
- all five runtime history files
- category logic/styles
- `choice-ui.js`
- `history-ui.js`
- app logic
- manifest
- local icons

v6.2 cache name:

`plot-twist-v6.2.0`

Offline navigation falls back to cached `index.html`.

The research-ledger Markdown files are not service-worker runtime dependencies.

## Important data models

### Card

Each card contains:

- `id`
- `title`
- `vibe`
- `scenario` — exactly two non-empty paragraphs
- `prompt`
- `choices` — exactly two pre-reveal positions
- `twist`
- `conclusion` — displayed as `The Point`
- `afterPrompt`
- `hostPrompts` — exactly two follow-up directions
- `categories` — one or two valid category IDs after category processing

Internal IDs are stable compatibility keys. They are used for Saved cards, persisted state, and the one-to-one Real-World Example mapping, but are not shown to players.

### Historical example

`HISTORICAL_EXAMPLES[id]` contains:

- `title`
- `text`

There must be exactly one substantive runtime example for every card ID 1–200.

---

# 3. Sources of Truth

Use this precedence:

1. Current repository code on the exact verified branch/head.
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

Six categories:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

## Historical example mappings

Runtime precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js`, loaded afterward and therefore authoritative for overridden IDs

Do not remove `history-reviewed.js` as “duplication” without understanding its audit purpose.

## Historical research support

Editorial ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

## Persistence and compatibility

Authoritative: `app.js`

Compatibility anchors:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- stable internal card IDs 1–200

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

## Financial calculations / migrations

There are no application financial calculations or database migrations. Compatibility is handled through stable browser-state identifiers and card IDs.

---

# 4. Important Decisions Already Made

## Product identity

The game is an adult party/campfire experience first. Deep discussion is the outcome, not the visible branding.

Rejected/restricted approaches:

- classroom/quiz framing
- overt debate-training framing
- exposing source-worldview/authoring framework
- turning the app into a religious/philosophy-branded product

## Offline-first is non-negotiable

Do not introduce runtime APIs, CDNs, remote fonts/images, authentication dependencies, server-side content fetches, or required research-site access without explicit product justification.

## Framework-free architecture

The app intentionally remains vanilla HTML/CSS/JS with no build system. Do not introduce a framework merely because it is conventional.

## Two-sided dilemma rule

Every card begins with two defensible choices. A thoughtful adult should be able to defend either side before the reveal.

Do not write:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- `it depends` escape choice
- Plot Twist that only repeats setup information
- reveal that simply congratulates one side

Target:

`two defensible positions → commitment → decision-relevant new information → reconsider → principle`

Changing sides after the reveal is allowed and intentional.

## Declarative `The Point`

The reveal may create nuance, but `The Point` should land a clear principle. Forced “both sides are equally valid” conclusions were rejected.

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

Each card has one local Real-World Example displayed **after** the post-Point question so players reason through the fictional dilemma/principle before the historical analogy anchors the discussion.

## Historical audit policy

Accuracy and analogy fit outrank fame.

Prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical. Do not overclaim what a source proves. Examples illustrate principles; they are not universal proof.

## Card 184 decision

The weaker polio/ice-cream anecdote was rejected and replaced with the documented **1973 UC Berkeley graduate-admissions / Simpson’s paradox** example.

## Stable state/deck version

`masterpiece-200-v1` intentionally remained stable through v6.1 and v6.2 because internal IDs and compatible persisted state did not change.

Do not bump it merely to refresh assets. Use the service-worker cache version for asset refresh.

## Visible app version

Settings displays the app version specifically so the installed phone build can be checked. v6.2 expects `v6.2.0`.

## No visible card numbering

Internal IDs must remain invisible in normal player-facing game/Saved presentation.

---

# 5. Current Implemented Behaviour

## Topic selection

The home screen supports six broad topic selectors plus `Mix Everything`.

Players may select multiple categories.

Expected rules:

- choosing a specific category removes `Mix Everything`
- selecting the last active category again falls back to `Mix Everything`
- combining categories forms a union without duplicating a card within the run

## Start / Random

- Start Game shuffles only matching cards.
- Random From Selected respects the same filter.

## Card flow

`scenario → two prominent choices → commit/discuss → Plot Twist → reconsider/switch → The Point → post-Point question → Real-World Example → Where This Can Go`

## Saved cards

Cards can be saved/revisited. Saved playback is independent of the current category filter.

Saved state relies on stable internal IDs.

## Chaos

`cards.js` defines 16 universal Chaos pressure tests.

## Host prompts / Where This Can Go

Every card provides two follow-up directions/prompts.

## Persistence

Local state survives refresh/close/reopen through `localStorage`, subject to browser/site-data behaviour.

## Wake lock

Optional and browser-dependent.

## PWA/offline

After the service worker has cached the app shell, the installed app is intended to launch/play with airplane mode enabled and Wi-Fi disabled.

## Version visibility

Settings should show `v6.2.0` after the new build/service worker is active.

## Destructive local action

Clearing browser site data destroys Saved cards/settings/current local state. Do not recommend it casually; prefer normal service-worker update/reload procedures.

---

# 6. Compatibility and Migration Constraints

There is no database schema version.

Browser-state compatibility anchors:

- `plotTwistStateV4`
- `masterpiece-200-v1`

## Card-ID compatibility

IDs 1–200 connect:

- Saved cards
- persisted order/state
- runtime card data
- historical examples
- research-ledger entries

Renumbering is therefore a migration, not a cosmetic edit.

## Historical mapping compatibility

`HISTORICAL_EXAMPLES[id]` uses the same stable IDs.

`history-reviewed.js` is intentional audit/editorial structure and should not be removed without understanding why it exists.

## v6.1 → v6.2 compatibility

v6.2 changes presentation and adds history/example assets without intentionally invalidating the existing 200-card state IDs.

Asset update mechanism: service-worker cache bump to `plot-twist-v6.2.0`, **not** a deck/state reset.

## Service-worker compatibility

When runtime assets change:

1. determine whether `sw.js` must add/update them in `APP_SHELL`
2. bump the cache name when installed copies must receive changed assets
3. update validator expectations deliberately
4. test updating from an older installed copy

## Clearing data

Avoid clearing site data unless genuinely necessary because it destroys the compatibility state being tested.

---

# 7. Development and Safety Rules

1. Do not weaken validation merely to make tests pass.
2. Do not remove `plotTwistStateV4`, `masterpiece-200-v1`, stable card IDs, history mappings, or cache/update logic without determining migration impact.
3. Do not introduce runtime network dependencies casually.
4. Do not expose forbidden source-worldview or authoring/meta terminology in runtime text.
5. Do not regenerate or renumber the 200-card deck without an explicit migration decision.
6. Do not replace researched examples with famous anecdotes without checking sources.
7. Do not treat green static CI as proof of Android PWA/service-worker quality.
8. Do not clear real browser site data as a routine test step.
9. Do not commit secrets, API keys, tokens, credentials, exported browser data, backups, machine-specific files, incidental logs, or placeholder junk.
10. Add/strengthen regression validation for bugs when practical.
11. Preserve invisible player-facing card numbering.
12. When adding/renaming runtime assets, inspect `index.html`, `sw.js`, and `validate-content.cjs` together.
13. Prefer non-destructive acceptance testing.
14. Update this handoff before material merge or handoff to another development chat.

---

# 8. Git and Pull Request Workflow

## Branch strategy

- `main` is the released baseline.
- Material development should occur on feature branches.
- Reuse an existing matching PR rather than opening duplicates.

## PR strategy

- Keep material work in a PR so CI/review state is inspectable.
- Every material PR must update `docs/DEVELOPMENT_HANDOFF.md` before merge.

## CI requirement

Required validation: `.github/workflows/validate.yml` (`Validate Plot Twist`).

Merge decisions must use CI attached to the **exact current PR head SHA**, not an older run.

## Review requirement

Immediately before merge, fetch:

- PR metadata / exact head
- submitted reviews
- inline review threads
- PR comments/blockers
- exact-head CI

## Merge method

Material PRs to date have used merge commits. No permanent requirement has been established to prefer merge vs squash/rebase beyond preserving useful history.

## Mandatory user authorization rule

**Never merge a material PR without the user’s explicit authorization for that specific PR.**

Immediately before an authorized merge:

1. Re-fetch the PR.
2. Verify exact head SHA.
3. Verify CI passed on that exact SHA.
4. Verify mergeability.
5. Check submitted reviews.
6. Check inline review threads.
7. Ensure no unresolved blockers remain.
8. Ensure this handoff is current.
9. Merge only the exact verified/authorized head.

If the branch changes after authorization, the previous authorization does not automatically apply to the new head.

## PR #4 merge audit trail

PR #4 followed the above process:

- authorized by user
- verified head `34a5fd3dec48e0651a67ced093a15917887f999a`
- CI run #37 success on exact head
- mergeable
- no reviews/threads/comments
- draft flag removed without changing head
- merge performed with exact expected head pinned
- merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`
- `main` subsequently verified to point to that merge commit before this post-merge handoff maintenance commit

## After merge

1. Re-fetch `main`.
2. Verify resulting SHA.
3. Confirm intended PR is part of `main`.
4. Update this handoff if baseline/next step changed.
5. Give the user safe Windows PowerShell local update/validate/start commands.

## Branch protection note

At the last verification before PR #4, `main` was not branch-protected. Process rules therefore matter even more; do not bypass them simply because GitHub permits direct writes.

---

# 9. Local Development Workflow

## Local repository path

**Not verified.** Do not invent one.

## OS / shell

Windows PowerShell.

## Dependencies

No package install/build step is required.

Use Node.js 22 where possible because CI uses Node 22.

## Validation commands

From the actual repository root:

```powershell
node --check .\cards.js
node --check .\deck-a.js
node --check .\deck-b.js
node --check .\deck-c.js
node --check .\deck-d.js
node --check .\deck-e.js
node --check .\deck-f.js
node --check .\deck-g.js
node --check .\deck-h.js
node --check .\history-a.js
node --check .\history-b.js
node --check .\history-c.js
node --check .\history-d.js
node --check .\history-reviewed.js
node --check .\categories.js
node --check .\app.js
node --check .\choice-ui.js
node --check .\history-ui.js
node --check .\sw.js
node --check .\validate-content.cjs
node .\validate-content.cjs
```

## Development server

```powershell
py -m http.server 8080
```

Fallback:

```powershell
python -m http.server 8080
```

Open:

`http://localhost:8080`

Do not test the PWA from `file://`.

## Safe local update block after the v6.2 merge

From the actual local repository root:

```powershell
git status
git fetch origin --prune
git switch main
git pull --ff-only origin main
node .\validate-content.cjs
py -m http.server 8080
```

If `git status` shows local changes, do not discard them automatically.

---

# 10. Testing and Validation

## CI workflow

`.github/workflows/validate.yml`

Name: `Validate Plot Twist`

Triggers:

- pushes to `main`
- pull requests targeting `main`

Environment:

- `ubuntu-latest`
- Node.js 22

CI runs JavaScript syntax checks and `node validate-content.cjs`.

## Important automated coverage

- exactly 200 cards
- complete/unique IDs
- required fields/structure
- exactly two substantive/distinct choices
- no `it depends` escape
- loaded-choice wording lint
- substantive Plot Twists
- valid categories
- exactly 200 substantive Real-World Examples
- required history/runtime files loaded
- required app-shell assets precached
- v6.2 choice UI hooks
- Real-World Example placement
- visible `v6.2.0`
- `masterpiece-200-v1`
- cache `plot-twist-v6.2.0`
- forbidden source-worldview/meta leaks rejected

## Manual Android acceptance — current release task

The v6.2 code is now merged, so perform this test against the deployed/installed production build once the phone updates from v6.1.1 to v6.2.0:

1. Confirm Settings shows **v6.2.0**.
2. Confirm existing Saved cards/settings/current state survived the update.
3. Confirm A/B choices appear as large side-by-side panels.
4. Confirm the center divider and `VS` marker look correct.
5. Confirm long choice labels/reasons are readable and do not overlap.
6. Confirm reveal → The Point → post-Point question → Real-World Example ordering.
7. Confirm long historical titles/body text are comfortable to read.
8. Confirm `Mix Everything` can draw across the full deck.
9. Confirm single/multiple category filtering works without duplicates.
10. Confirm Random respects selected categories.
11. Confirm Saved playback works independently of category filters.
12. Confirm close/reopen restores expected state.
13. Confirm Chaos, Next Card, Saved, Settings, and wake-lock-related behaviour still work.
14. After the new service worker is active, fully close the app, enable airplane mode, turn Wi-Fi off, relaunch from the installed icon, and play several cards.
15. Do **not** clear site data as the normal way to force the upgrade; preserving prior state is part of the acceptance test.

If Settings still shows v6.1.1 shortly after merge, treat that first as a deployment/service-worker propagation/update issue, not proof that the v6.2 source is absent from `main`.

---

# 11. Current GitHub State

**Verification date:** 2026-08-21 (America/Vancouver), immediately after authorized PR #4 merge. Re-verify live before future actions.

## Verified v6.2 merge state

PR #4 — **Plot Twist v6.2: prominent choices and real-world examples**

- merged: yes
- source branch: `historical-examples-ui`
- exact PR head: `34a5fd3dec48e0651a67ced093a15917887f999a`
- exact pre-merge base: `d5ee158222181ee422699811b2e0baae79703e1e`
- CI: `Validate Plot Twist` run #37 / run ID `32542683784`
- exact-head CI conclusion: success
- submitted reviews at merge time: none
- inline review threads at merge time: none
- PR comments at merge time: none
- merge commit: `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

`main` was fetched immediately after merge and verified to point to `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2` before this post-merge documentation maintenance commit.

**Dynamic-state warning:** this handoff maintenance commit itself advances `main` beyond the merge commit. A future chat must fetch the live `main` SHA instead of assuming the merge commit remains the branch tip.

## Current development PR

None known immediately after the merge.

---

# 12. Completed Work

## Original offline PWA

Completed:

- installable PWA
- local icons/manifest
- service-worker/offline cache
- local state restore
- Saved cards
- Chaos prompts
- Host prompts
- wake-lock support where available
- dark campfire-oriented UI

## 200-card expansion

Completed:

- exactly 200 cards
- eight 25-card files
- six selectable/mixable categories
- category-aware Start/Random
- stable internal IDs
- automated validation

## PR #1 — Finalize Plot Twist 200-card audit

Established stronger validation/documentation around the complete deck.

## PR #2 — Rewrite all 200 cards as real two-sided dilemmas

Merged commit:

`2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

Outcome:

- full 200-card editorial rewrite
- two defensible pre-reveal choices
- decision-relevant twists
- clearer `The Point`
- stronger terminology/meta validation
- updated How to Play
- cache v6.1.0

## PR #3 — Show app version in Settings

Merged as:

`f90afb2d3096763af555cf2110a5a2d539a5e5a1`

Added visible version reporting and v6.1.1 cache/validation alignment.

## PR #4 — v6.2 prominent choices and Real-World Examples

Merged as:

`c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

Completed:

- `game-v6.2.css`
- `choice-ui.js`
- `history-ui.js`
- 200 runtime Real-World Example mappings
- audited `history-reviewed.js` overrides
- complete source ledger IDs 1–200
- v6.2 validation coverage
- Settings `v6.2.0`
- cache `plot-twist-v6.2.0`
- README/VALIDATION updates
- permanent development continuity system

Important late-deck audited overrides include:

- 179 — Cynthia Cooper / WorldCom
- 184 — UC Berkeley admissions / Simpson’s paradox
- 187 — *Moritz v. Commissioner*
- 189 — Salt March
- 196 — First World War / July Crisis multi-causation
- 200 — Charles Darwin’s routine at Down House

---

# 13. Current Unresolved Issues

## 1. Post-merge Android acceptance test

This is now the main active task.

The user must verify the production/installed app updates from v6.1.1 to v6.2.0 and test visual layout, persistence, service-worker update, and airplane-mode gameplay.

## 2. Deployment/service-worker propagation may delay visible version change

If Settings remains on v6.1.1 immediately after merge, verify GitHub Pages deployment/current served assets and normal service-worker update lifecycle before proposing destructive cache/site-data clearing.

## 3. Exact local checkout path remains unverified

Future local command instructions must not invent a path.

## 4. Exact live GitHub Pages URL/settings remain independently unverified

Investigate only if the production update does not appear or deployment behaviour needs diagnosis.

---

# 14. Exact Continuation Point

## Exact Next Step

A fresh development session must proceed in this order:

1. Connect to `detratech/plot-twist` and read this handoff in full.
2. Fetch current `main` and record its exact SHA. Verify that it contains PR #4 merge commit `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2` in its ancestry.
3. Check for any new open material PRs/branches created after this handoff.
4. The immediate product task is the user’s **v6.2 Android production test**.
5. First ask/check what version Settings now shows. Expected: `v6.2.0` once the deployment/service-worker update has activated.
6. If the user still sees `v6.1.1`, diagnose the non-destructive update path: verify deployed `main` assets/GitHub Pages state and service-worker lifecycle before suggesting any data-clearing action.
7. Once v6.2.0 appears, walk through the Android acceptance checklist in section 10: A/B layout, long choices, Real-World Example placement/readability, categories, Random, Saved cards, persistence, close/reopen, and airplane-mode play.
8. If a defect is found, create/use an appropriate feature/fix branch and PR. Add regression validation where practical. Update this handoff with the defect, fix, test state, and new exact next step.
9. Do not reopen the completed 200-card rewrite or historical source audit unless a concrete defect is identified.
10. Do not merge any new material PR without explicit user authorization and the exact-head pre-merge checks in section 8.
11. After any future material merge, re-fetch `main`, verify the exact resulting SHA, update this handoff, and give the safe Windows PowerShell local update/validate/start commands.

Do not end future handoffs with vague instructions such as “continue development.” Replace this section with the next concrete ordered procedure whenever project state changes.
