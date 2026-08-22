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

Core loop:

`scenario → choose one of two defensible positions → defend it → reveal Plot Twist → reconsider/switch if warranted → The Point → deeper question → Real-World Example → follow-up discussion`

The product must feel like an adult party/campfire game, not a survey, classroom exercise, religious app, philosophy app, or debate-training tool.

## Current development / production status

**v6.2.0 is merged to `main`.**

PR #4 — **Plot Twist v6.2: prominent choices and real-world examples** — was explicitly authorized by the user and merged on 2026-08-21 (America/Vancouver).

Merged PR head:

`34a5fd3dec48e0651a67ced093a15917887f999a`

Merge commit:

`c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

The handoff was then updated on `main` after merge. Current verified `main` at the time of this correction is:

`0803203bc1215cfbc83fb03d121c2993827de900`

There is no known active material development PR immediately after the v6.2 merge.

The current continuation task is **post-merge Android acceptance testing of the hosted v6.2.0 PWA**, including service-worker update behaviour from the previously installed v6.1.1 build.

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
- GitHub Pages / GitHub-hosted static deployment

There is deliberately **no framework, bundler, package-manager install step, backend, database, authentication service, analytics service, runtime external API, CDN, or remote font/image dependency**.

## Operating environment

### Player environment

- Android Chrome is the target install/test environment.
- The installed PWA must remain usable in full airplane mode with Wi-Fi off after the required assets are cached.

### Development environment

**Important correction: the user does not maintain a local repository for Plot Twist. This project is developed and hosted through GitHub.**

Do not instruct the user to run `git pull`, `git switch`, `node`, `python -m http.server`, or any other local-repository command as part of the normal Plot Twist workflow unless the user explicitly chooses to create a local clone later.

The normal development path is:

`GitHub repository → feature branch/PR → GitHub Actions validation → user authorization → merge to main → GitHub-hosted deployment → Android/PWA acceptance test`

The user's machine/local filesystem is not part of the normal Plot Twist deployment path.

## Important repository paths

### Runtime shell and UI

- `index.html`
- `styles.css`
- `categories.css`
- `game-v6.2.css`
- `app.js`
- `choice-ui.js`
- `history-ui.js`

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

v6.2 keeps presentation additions modular:

- `choice-ui.js` turns authored choice strings into a prominent decision label plus smaller reason.
- `game-v6.2.css` renders the two choices side by side with a center divider and `VS` marker.
- `history-ui.js` inserts the card-specific Real-World Example after the post-Point question.

## Runtime data flow

1. `cards.js` initializes the shared card array and Chaos prompts.
2. `deck-a.js` through `deck-h.js` append all 200 cards.
3. `history-a.js` through `history-d.js` populate draft `HISTORICAL_EXAMPLES` entries.
4. `history-reviewed.js` overwrites selected IDs with audited replacements.
5. `categories.js` preserves/infers category tags.
6. `app.js` filters, shuffles, persists, and renders cards.
7. `choice-ui.js` applies choice presentation.
8. `history-ui.js` injects the Real-World Example.

## Backend / database / authentication

None.

There is no server persistence, SQL schema, ORM, API server, account system, or authentication layer.

## Persistence

Browser `localStorage` stores compatible game state including current order/position, reveal state, Saved card IDs, category selection, and settings.

Compatibility anchors:

- local-storage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`
- stable card IDs 1–200

The exact state object structure in `app.js` is authoritative.

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

A merge to `main` makes the new source eligible for the hosted deployment, but an already-installed PWA may continue showing an older cached build until the hosting deployment is current and the browser/service-worker lifecycle activates the new cache.

Do not assume a newly merged version is already active on the user's phone merely because `main` changed. Verify the visible Settings version on-device.

## Offline architecture

`sw.js` precaches the app shell required for gameplay, including the HTML/CSS, eight deck files, five runtime history files, category assets, choice/history UI, app logic, manifest, and local icons.

v6.2 cache name:

`plot-twist-v6.2.0`

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

## Offline-first is non-negotiable

Do not introduce runtime APIs, CDNs, remote fonts/images, authentication dependencies, server-side content fetches, or required research-site access without explicit product justification.

## Framework-free architecture

The app intentionally remains vanilla HTML/CSS/JS with no build system. Do not introduce a framework merely because it is conventional.

## GitHub-only user workflow

The user's normal Plot Twist workflow is hosted/GitHub-based. There is **no local Plot Twist repo to update after merges**.

Future chats must not invent a local path or give local Git/build/start commands as if they are required.

After merges, the useful user-facing action is to verify the hosted deployment and then test the installed Android PWA/version/update path.

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

## Historical audit policy

Accuracy and analogy fit outrank fame. Prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical. Do not overclaim what a source proves.

## Card 184 decision

The weaker polio/ice-cream anecdote was replaced with the documented **1973 UC Berkeley graduate-admissions / Simpson's paradox** example.

## Stable state/deck version

`masterpiece-200-v1` intentionally remained stable through v6.1 and v6.2 because internal IDs and compatible persisted state did not change.

Do not bump it merely to refresh assets. Use the service-worker cache version for asset refresh.

## Visible app version

Settings displays the app version so the installed phone build can be verified. v6.2 expects `v6.2.0`.

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

## Card flow

`scenario → two prominent choices → commit/discuss → Plot Twist → reconsider/switch → The Point → post-Point question → Real-World Example → Where This Can Go`

## Saved cards

Cards can be saved and revisited. Saved playback is independent of current category filtering.

## Chaos

`cards.js` defines 16 universal Chaos pressure tests.

## Host prompts / Where This Can Go

Every card provides two follow-up directions.

## Persistence

Game state survives normal refresh/close/reopen through `localStorage`, subject to browser/site-data behaviour.

Do not casually recommend clearing site data because that removes Saved cards/settings/state.

## PWA/offline

After the service worker has cached the app shell, the installed app must launch and play with airplane mode enabled and Wi-Fi off.

## Version visibility

v6.2 Settings should display `v6.2.0`.

---

# 6. Compatibility and Migration Constraints

There is no database schema or migration system.

Compatibility anchors:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- card IDs 1–200
- `HISTORICAL_EXAMPLES[id]` aligned to the same card IDs

Renumbering IDs is not cosmetic because IDs connect Saved cards, persisted state, runtime card data, historical examples, and research-ledger entries.

`history-reviewed.js` is intentional editorial/audit structure and must not be removed merely because it looks duplicative.

v6.2 changes presentation/history assets without intentionally invalidating existing compatible player state.

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
6. Instead, verify/allow time for the GitHub-hosted deployment, then have the user confirm the visible app version and perform the hosted Android/PWA acceptance test.

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
- v6.2 choice UI structural hooks
- visible `v6.2.0`
- `masterpiece-200-v1`
- cache `plot-twist-v6.2.0`
- protected forbidden/meta wording checks

## Manual Android acceptance

For v6.2, verify on the hosted/installed Android Chrome PWA:

1. Settings shows `v6.2.0`.
2. Existing Saved cards/settings survive the v6.1.1 → v6.2 update.
3. Side-by-side A-vs-B panels are readable/tappable.
4. Long choice labels/reasons do not overlap the divider/`VS` marker.
5. Reveal → The Point → post-Point question → Real-World Example ordering is correct.
6. Historical titles/body text are comfortable to read.
7. Category filtering and multi-select mixing work.
8. Random respects selected categories.
9. Saved playback works independently of the filter.
10. State survives close/reopen.
11. Chaos, Next, Saved, Settings, and wake-lock-related behaviour still work.
12. After the new service worker activates, fully close the app, enable airplane mode, turn Wi-Fi off, relaunch from the installed icon, and verify full gameplay.

Do not clear site data as the normal update test.

---

# 11. Current GitHub State

**Last verified after the v6.2 merge and handoff update:**

## `main`

`0803203bc1215cfbc83fb03d121c2993827de900`

Commit message:

`Update handoff after v6.2 merge`

Parent:

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

No known active material development PR immediately after the v6.2 merge.

Always re-fetch GitHub before relying on these values in a later session.

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

Important late-deck audited examples include:

- 179 — Cynthia Cooper / WorldCom
- 184 — UC Berkeley graduate admissions / Simpson's paradox
- 187 — *Moritz v. Commissioner*
- 189 — Salt March
- 196 — First World War / July Crisis multi-causation
- 200 — Charles Darwin's routine at Down House

---

# 13. Current Unresolved Issues

## 1. Verify hosted v6.2 reaches the user's phone

Before merge the installed app showed `v6.1.1`. PR #4 is now merged, so the immediate task is to verify that the hosted deployment/service-worker update moves the installed app to `v6.2.0` without clearing local state.

## 2. Complete Android v6.2 acceptance

Once Settings shows `v6.2.0`, complete the checklist in section 10, including airplane-mode relaunch.

## 3. Hosted deployment details

The project is known to be GitHub-hosted, but the exact public Pages URL/settings are not recorded in this handoff yet. A future session should verify and record the exact hosted URL if needed for debugging deployment/update behaviour.

---

# 14. Exact Continuation Point

## Exact Next Step

1. Re-fetch `main` and confirm the current SHA; the last verified value in this handoff is `0803203bc1215cfbc83fb03d121c2993827de900`.
2. Confirm PR #4 remains merged and no newer material PR has superseded v6.2.
3. Treat the user workflow as **GitHub-hosted only**. Do not ask for or invent a local Plot Twist repository.
4. Have the user open the hosted/installed Plot Twist app while online and check **Settings → App Version**.
5. If it shows `v6.2.0`, proceed directly through the Android acceptance checklist in section 10, ending with the airplane-mode relaunch test.
6. If it still shows `v6.1.1`, do **not** tell the user to clear site data. Investigate the GitHub-hosted deployment and service-worker update path first, determine whether the hosted site itself is serving v6.2 assets, and then use the least-destructive update procedure.
7. If testing reveals a defect, create/use a feature branch and PR, add regression validation where practical, keep this handoff current, and do not merge without explicit user authorization.
8. If v6.2 passes Android acceptance, update this handoff to record acceptance as complete and replace this Exact Next Step with the next concrete product/development task.
