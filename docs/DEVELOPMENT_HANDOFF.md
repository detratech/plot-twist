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
3. After a material merge, update it again if the merge changes the released baseline or continuation point.
4. Do not let stale TODOs accumulate. Remove or rewrite resolved items.

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

The product loop is:

`scenario → choose one of two defensible positions → defend it → reveal Plot Twist → reconsider/switch if warranted → The Point → deeper question → Real-World Example → follow-up discussion`

It must feel like an adult party/campfire game, not a survey, classroom exercise, religious app, philosophy app, or debate-training tool.

The deck explores evidence, assumptions, responsibility, relationships, money, technology, society, purpose, consistency, incentives, and related ideas. The player-facing runtime deliberately does **not** expose the source-worldview/authoring framework behind those ideas.

## Current development / production status

### Released baseline on `main`

The last meaningful released feature PR is **PR #3 — `Show app version in Settings`**, merged as `f90afb2d3096763af555cf2110a5a2d539a5e5a1`. It represents the v6.1.1 baseline after the full 200-card two-sided-dilemma rewrite in PR #2.

`main` later received two housekeeping commits that added and then removed an accidental placeholder file. The current verified `main` SHA at the time of this handoff update is:

`d5ee158222181ee422699811b2e0baae79703e1e`

### Active development

**PR #4 — `Plot Twist v6.2: prominent choices and real-world examples`**

- branch: `historical-examples-ui`
- base: `main`
- base SHA verified before this handoff maintenance commit: `d5ee158222181ee422699811b2e0baae79703e1e`
- state: open
- draft: yes
- mergeability at the last verification: mergeable
- submitted reviews at the last verification: none
- inline review threads at the last verification: none
- PR comments at the last verification: none

The last fully verified PR head immediately **before** this handoff maintenance commit was:

`367d3c4c2b7d7a88f88da79c3172f124a95ca7eb`

GitHub Actions run **#36** (`Validate Plot Twist`, run ID `32541764668`) completed successfully against that exact head.

**Important Git limitation:** a Git commit cannot contain its own final SHA because the SHA is derived from the commit/tree content. Therefore this file cannot truthfully hard-code the SHA of the commit that contains this exact handoff revision. Any fresh development session must re-fetch PR #4 and obtain the exact live head before acting. The static SHA above is the last exact predecessor/head verified before this handoff commit, not permission to assume the PR has not moved.

v6.2 currently adds:

- prominent side-by-side A-vs-B choice presentation
- center divider and `VS` marker
- large decision label plus smaller reason text
- one local Real-World Example for every one of the 200 cards
- a researched/audited historical-example override layer
- a complete source ledger for IDs 1–200
- validator coverage for the history and presentation layers
- visible app version `v6.2.0`
- service-worker cache `plot-twist-v6.2.0`

The historical source audit is complete through ID 200.

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

There is deliberately **no framework, bundler, package manager dependency install, backend, database, authentication service, analytics service, runtime external API, CDN, or remote font/image dependency**.

## Operating environment

### Player environment

- Android Chrome is the target install/test environment.
- The PWA must remain usable after installation in full airplane mode with Wi-Fi off.

### Development environment

- Use Windows/PowerShell command examples for the user unless a repository task specifically requires another shell.
- CI runs on `ubuntu-latest`, so scripts must remain portable enough for the current Node-based validation workflow.
- The exact local repository checkout path has **not** been verified. Do not invent one. Ask Git/GitHub/the local shell to identify the checkout rather than assuming a path.

## Important repository paths

### Runtime shell and UI

- `index.html` — screens, rules, Settings markup, script/style loading
- `styles.css` — base visual system
- `categories.css` — topic selector styling
- `game-v6.2.css` — v6.2 A-vs-B and history presentation
- `app.js` — main app/game state and interaction logic
- `choice-ui.js` — v6.2 choice label/reason rendering
- `history-ui.js` — inserts the card-specific Real-World Example after the post-Point question

### Card and category data

- `cards.js` — shared `PLOT_TWIST_CARDS` initialization and 16 universal Chaos prompts
- `deck-a.js` through `deck-h.js` — eight 25-card files, exactly 200 cards
- `categories.js` — category definitions and authored/inferred tag handling

### Runtime historical/example data

- `history-a.js`
- `history-b.js`
- `history-c.js`
- `history-d.js`
- `history-reviewed.js` — audited replacements loaded after the draft mappings

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

v6.2 deliberately keeps presentation additions modular:

- `choice-ui.js` transforms authored choice strings into a prominent decision label and a secondary reason.
- `game-v6.2.css` renders the two choices as side-by-side panels with the center divider and `VS` marker.
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

## Backend

None.

## Persistence / storage

No server storage and no database.

Browser `localStorage` stores compatible game state including shuffled order/current position, reveal state, Saved card IDs, category selection, and settings.

Important compatibility anchors:

- local-storage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`

The exact current state object structure is defined by `app.js`. `app.js` is authoritative over prose documentation if the two conflict.

## Database

None.

There are no SQL schemas, ORM models, database migrations, exported production databases, or server-side user records.

## APIs

No remote application APIs.

Browser platform APIs used or conditionally used include:

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

The research sources must never become required network dependencies for gameplay.

## Authentication

None.

## Deployment / hosting

The documented distribution path is GitHub Pages from the repository root on `main`, then installation through Android Chrome as a PWA.

A branch/PR push does not update the released installed app. Release requires the expected work to reach `main`, GitHub Pages to serve that state, and installed clients to activate the new service-worker cache.

The exact live GitHub Pages URL/configuration was not independently verified during this handoff update; do not invent deployment details beyond what the repository documents.

## Offline architecture

`sw.js` precaches the entire app shell needed for gameplay:

- HTML/CSS
- all eight deck files
- all five runtime history files
- category logic/styles
- `choice-ui.js`
- `history-ui.js`
- main app logic
- manifest
- local icons

v6.2 cache name:

`plot-twist-v6.2.0`

Offline navigation falls back to cached `index.html`.

The research-ledger Markdown files are not service-worker runtime dependencies.

## Important data models

### Card

Each card must contain:

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

Use the following precedence.

## Repository/runtime behaviour

1. Current repository code on the exact verified branch/head.
2. `validate-content.cjs` and `.github/workflows/validate.yml` for executable validation contracts.
3. `docs/DEVELOPMENT_HANDOFF.md`, `VALIDATION.md`, and `README.md` for maintained explanatory context.
4. Chat history only as non-authoritative background.

## Product/game rules

- `docs/DEVELOPMENT_HANDOFF.md` records the settled product invariants and rationale.
- `README.md` and `VALIDATION.md` describe the intended gameplay/editorial contract.
- The card files are authoritative for actual card content.
- If prose says something the current runtime does not do, inspect/fix the discrepancy rather than assuming the prose is correct.

## Card schema and deck size

Authoritative:

- `deck-a.js` through `deck-h.js`
- `validate-content.cjs`

Hard constraints currently enforced:

- exactly 200 cards
- internal IDs 1–200 unique and complete
- two scenario paragraphs
- exactly two distinct substantive choices
- substantive Plot Twist
- declarative conclusion
- valid follow-up structure
- one or two valid category IDs

## Category mappings

Authoritative:

- authored card `categories` values
- `categories.js` for category definitions/inference

Six selectable categories:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

## Historical example mappings

Authoritative runtime mapping order:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js` loaded afterward and therefore authoritative for overridden IDs

Do not “clean up” `history-reviewed.js` merely because it appears duplicative; it intentionally preserves audit decisions without erasing the draft mapping history.

## Historical research support

Authoritative editorial ledger:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

These support editorial claims but are not runtime dependencies.

## Persistence and compatibility

Authoritative:

- `app.js`

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

Authoritative:

`.github/workflows/validate.yml`

Current CI environment:

- GitHub Actions `ubuntu-latest`
- Node.js 22

## Calculations / financial rules

There are no application financial calculations, transaction rules, balances, accounting formulas, or business-finance models in this project.

## Migrations

There is no database migration system. Compatibility is handled through stable local-storage/state identifiers and card IDs.

---

# 4. Important Decisions Already Made

## Product identity

The game is an adult party/campfire experience first. Deep discussion is the result, not the visible branding.

Rejected/restricted approaches:

- classroom/quiz framing
- overt debate-training framing
- exposing the source-worldview/authoring framework
- turning the app into a religious/philosophy-branded product

## Offline-first is non-negotiable

The core camping use case requires the complete game to work after installation with no internet connection.

Rejected/restricted approaches:

- runtime APIs
- CDNs
- remote fonts/images
- authentication dependencies
- server-side content fetches
- requiring source-ledger links while playing

## Framework-free architecture

The app intentionally remains vanilla HTML/CSS/JS with no build system because the project is small and offline distribution should stay simple.

Do not introduce React/Vue/Svelte/build tooling merely because it is conventional. A framework change would need a concrete benefit that outweighs migration/offline complexity.

## Two-sided dilemma rule

The old “obvious correct answer” structure was rejected.

Every card must begin with **two defensible choices**. A thoughtful adult should be able to defend either side before the reveal.

Do not write:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- `it depends` as a pre-reveal escape
- a Plot Twist that repeats the setup
- a reveal that only congratulates the intended side

Target rhythm:

`two defensible positions → commitment → decision-relevant new information → reconsider → principle`

Changing sides after the reveal is explicitly allowed.

## Declarative `The Point`

The reveal may create nuance, but `The Point` should still land a clear principle. Forced “both sides are equally valid” conclusions were rejected.

## Hidden source layer

Explicit source-worldview and authoring/meta terminology is intentionally excluded from player-facing runtime text.

`validate-content.cjs` enforces this. Do not weaken those checks just to make content pass. Fix the content or deliberately revisit the product rule with the user.

## v6.2 choice presentation

The two choices must remain visually important:

- two side-by-side columns
- center divider
- `VS` marker
- prominent decision label
- smaller reason

This was chosen to make the commitment stage feel like a real choice rather than two minor chips/buttons.

## Real-World Example placement

Each card has one local Real-World Example displayed **after** the post-Point question.

Reason: players should reason through the fictional dilemma and principle before a concrete historical/real-world analogy anchors the discussion.

## Historical example audit policy

Accuracy and analogy fit outrank fame.

Rules:

- prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical
- remove or narrow popular anecdotes when the neat version is disputed
- do not overstate what a source proves
- examples illustrate principles; they do not prove every modern case works the same way
- use `history-reviewed.js` for researched replacements when preserving the original draft mapping is useful

## Card 184 decision

The weaker polio/ice-cream anecdote was rejected during audit and replaced with the documented **1973 UC Berkeley graduate-admissions / Simpson’s paradox** example because it cleanly illustrates an aggregate association changing after a confounding variable is examined.

## Stable state/deck version

`masterpiece-200-v1` intentionally remained stable through the v6.1 rewrite and v6.2 presentation/history work because internal IDs and compatible persisted state did not change.

Do not bump it as an asset-refresh mechanism. Use the service-worker cache version for asset refresh.

## Visible app version

PR #3 added a Settings version row specifically so the user can determine what installed build is actually running on the phone.

## No visible card numbering

Internal IDs exist for data/state integrity but should not be displayed as card numbers in the game or Saved list.

---

# 5. Current Implemented Behaviour

## Topic selection

The home screen supports six broad topic selectors plus `Mix Everything`.

Players may select multiple categories. The selected set determines the shuffled run.

Expected rules:

- choosing a specific category removes `Mix Everything`
- selecting the last active category again falls back to `Mix Everything` rather than leaving an empty selection
- combining categories creates a union without duplicating a card within the run

## Start / Random

- Start Game shuffles only cards matching the active topic selection.
- Random From Selected respects the same filter.

## Card flow

The current intended flow is:

`scenario → two prominent choices → commit/discuss → Plot Twist → reconsider/switch → The Point → post-Point question → Real-World Example → Where This Can Go`

## Choice presentation

v6.2 renders the two choices side by side, with:

- divider
- `VS`
- large decision label
- smaller reason text

## Plot Twist

Hidden until revealed. It must add substantive decision-relevant information.

## The Point

A declarative conclusion stating the card’s principle.

## Real-World Example

Exactly one substantive local example is mapped to each card ID. `history-reviewed.js` may override the draft history data for audited IDs.

## Saved cards

Cards can be saved and revisited. Saved playback is independent of the current category filter.

Saved state relies on stable internal IDs. This is a major reason not to casually renumber or regenerate the deck.

## Chaos

`cards.js` defines 16 universal Chaos pressure tests that can be applied during play.

## Host prompts / Where This Can Go

Every card provides two follow-up directions/prompts.

## Persistence

Local game state survives refresh/close/reopen through `localStorage`, subject to browser/site-data behaviour.

Persisted state includes the compatible deck order/position, reveal state, Saved IDs, selected categories, and settings.

## Screen wake lock

Optional and dependent on browser support/permission.

## PWA/offline

After the service worker has cached the app shell, the installed app is intended to launch and play with airplane mode enabled and Wi-Fi disabled.

## Version visibility

Settings displays the app version. v6.2 expects `v6.2.0`.

## User data / destructive actions

There is no account, server-side user profile, production database, or remote destructive action.

Clearing browser site data is destructive to Saved cards/settings/current local state and should not be recommended casually. Prefer normal service-worker update/reload procedures.

---

# 6. Compatibility and Migration Constraints

## Current persistence/schema version

There is no database schema version.

The effective browser-state compatibility anchors are:

- `plotTwistStateV4`
- `masterpiece-200-v1`

## Card-ID compatibility

Internal IDs 1–200 must remain stable unless a deliberate migration is designed.

They connect:

- Saved cards
- persisted order/state
- runtime card data
- historical examples
- research-ledger entries

Renumbering is therefore not cosmetic.

## Historical mapping compatibility

`HISTORICAL_EXAMPLES[id]` uses the same stable card IDs.

`history-reviewed.js` may look like an extra/duplicative layer, but it is intentional compatibility/editorial structure and should not be removed without understanding the audit history.

## v6.1 → v6.2 compatibility

v6.2 changes presentation and adds history/example assets without intentionally invalidating the existing 200-card state IDs.

The asset-update mechanism is the service-worker cache bump to `plot-twist-v6.2.0`, not a deck/state-version reset.

## Service-worker compatibility

When runtime assets change:

1. determine whether `sw.js` needs the new/changed assets in `APP_SHELL`
2. bump the cache name when an installed copy must receive changed assets
3. update validator expectations if the version intentionally changes
4. test the update path from an older installed copy

## Legacy/obsolete code

There is no known database migration/legacy import subsystem.

Do not delete apparently old state/version handling, cache logic, or override files solely because they look redundant. First determine whether they preserve installed-user compatibility or audit history.

## Clearing data

Avoid telling the user to clear site data unless genuinely necessary because it removes Saved cards and local settings/state.

---

# 7. Development and Safety Rules

1. **Do not weaken validation merely to make tests pass.** If a rule is wrong, change it deliberately with justification; otherwise fix the content/code.
2. **Do not remove compatibility anchors casually.** Before changing `plotTwistStateV4`, `masterpiece-200-v1`, stable card IDs, history-ID mappings, or service-worker update logic, determine the migration impact.
3. **Do not introduce runtime network dependencies** without explicit product justification. Offline-first is a core requirement.
4. **Do not expose forbidden source-worldview or authoring/meta terminology** in runtime content. Preserve the validator protection.
5. **Do not regenerate or renumber the 200-card deck** unless the user explicitly asks for a structural migration.
6. **Do not replace researched examples with famous anecdotes without checking sources.** Accuracy/fit outrank fame.
7. **Do not treat a green static CI run as proof that Android PWA behaviour is good.** Manual phone/offline testing remains required for presentation/service-worker changes.
8. **Do not clear real browser site data as a routine test step** when non-destructive testing can prove the same behaviour.
9. **Do not commit secrets, API keys, tokens, credentials, exported browser data, backups, machine-specific files, or incidental logs.** This app currently needs no runtime secrets.
10. **Do not commit generated junk or placeholder files.** Two main-branch housekeeping commits already exist solely because an accidental placeholder was added and removed.
11. **Add/strengthen regression validation for bugs when practical.** The repository already uses `validate-content.cjs` as the regression gate for many content/UI contracts.
12. **Preserve player-facing card numbering invisibility.** IDs are internal compatibility keys.
13. **If a runtime asset is added/renamed, inspect `index.html`, `sw.js`, and `validate-content.cjs` together.** Loading and offline precaching must not drift apart.
14. **Prefer non-destructive acceptance testing.** Especially for installed PWA updates and local state.
15. **Update this handoff before material merge or handoff to a fresh chat.**

---

# 8. Git and Pull Request Workflow

## Branch strategy

- `main` is the released baseline.
- Material development should occur on a feature branch.
- Current v6.2 work belongs on `historical-examples-ui` until PR #4 is resolved.
- Reuse an existing matching PR rather than opening a duplicate.

## PR strategy

- Keep material work in a PR so CI and review state are inspectable.
- Keep PR #4 draft until the remaining on-device acceptance gate is complete and the user decides it is ready.
- Every material PR must update `docs/DEVELOPMENT_HANDOFF.md` before merge.

## CI requirement

The required project validation is `.github/workflows/validate.yml` (`Validate Plot Twist`).

A merge decision must use CI attached to the **exact current PR head SHA**, not an older successful run.

## Review requirement

Immediately before merge, fetch:

- submitted PR reviews
- inline review threads
- PR comments/known blockers

Do not infer “no blockers” from an old snapshot.

## Merge method

Previous material PRs were merged using merge commits. No project rule currently establishes merge-commit vs squash/rebase as a permanent requirement. Preserve history unless the user establishes a different preference.

## Mandatory user authorization rule

**Never merge a material PR without the user’s explicit authorization for that specific PR.**

General statements such as “finish it,” “make it ready,” “continue,” or an approval tied to an older head are not permission to merge a materially changed head.

### Immediately before an authorized merge

1. Re-fetch the PR from GitHub.
2. Verify the exact PR head SHA.
3. Verify CI passed against that exact SHA.
4. Verify mergeability.
5. Check submitted reviews.
6. Check inline review threads.
7. Ensure no unresolved blockers remain.
8. Ensure `docs/DEVELOPMENT_HANDOFF.md` is current.
9. Merge only the exact verified head after the user’s explicit approval.

If the branch changes after the user authorizes the merge, **do not assume the previous authorization applies to the new head**. Revalidate the new head and obtain/reconfirm authorization for that head before merging.

### After a merge

1. Re-fetch `main` from GitHub.
2. Verify the resulting `main` SHA.
3. Confirm the expected PR actually became part of `main`.
4. Update the handoff if the released baseline/next step changed.
5. Give the user a safe Windows PowerShell local update/build/test/start command block appropriate for Plot Twist.

## Repository protection note

At the last verification, GitHub reported `main` as not branch-protected. That makes the process rule above more important, not less. Do not bypass the PR/user-authorization workflow simply because GitHub technically allows direct writes.

---

# 9. Local Development Workflow

## Local repository path

**Not verified.**

Do not hard-code `C:\GitHub\plot-twist` or another guessed path into instructions. A fresh development session should ask Git/the user’s shell to identify the actual clone only if local commands are needed.

## OS / shell

Use Windows PowerShell commands for the user.

## Dependencies

No package installation is required for the app itself.

For validation, use Node.js 22 where possible because CI uses Node 22.

For local static serving, Python is sufficient.

## Build command

None. There is no build step.

## Test / validation commands

From the repository root in PowerShell:

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

There is no separate lint command beyond the syntax/content validation currently encoded above.

## Development/start command

From the repository root:

```powershell
py -m http.server 8080
```

If the Python launcher is unavailable but `python` is on PATH:

```powershell
python -m http.server 8080
```

Then open:

`http://localhost:8080`

`localhost` is valid for service-worker/PWA development. Do not rely on opening `index.html` via `file://` for PWA testing.

## Port

`8080` for the documented local static server.

## Environment variables

None currently required.

## Local-only/untracked files

No project-specific required untracked file is currently documented. Do not introduce committed machine-specific files/logs/backups.

## Safe local update block after an authorized merge

From the actual local repository root:

```powershell
git status
git fetch origin --prune
git switch main
git pull --ff-only origin main
node .\validate-content.cjs
py -m http.server 8080
```

If `git status` shows local changes, do not discard them automatically. Resolve ownership of those changes before switching/pulling.

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

CI runs:

1. `node --check` across runtime/data/validator JavaScript
2. `node validate-content.cjs`

## Automated content/runtime checks

The current validator covers, among other things:

- exactly 200 cards
- IDs 1–200 complete/unique
- unique titles and scenario bodies
- required fields
- two scenario paragraphs
- exactly two distinct/substantive choices
- no `it depends` escape
- conservative loaded-choice wording lint
- question-form prompts
- substantive Plot Twists
- Plot Twist not identical to setup
- conclusions/follow-ups
- valid category assignments and coverage
- exactly 200 substantive historical examples
- all deck/history files loaded
- all required runtime assets precached
- two-choice How to Play rules
- Real-World Example explanation and placement
- v6.2 choice UI structural hooks
- visible `v6.2.0`
- `masterpiece-200-v1`
- cache `plot-twist-v6.2.0`
- forbidden source-worldview terms absent from the validated runtime text
- authoring/meta-instruction leaks absent from the validated runtime text

## Important limitation of automated validation

Static checks cannot prove:

- the two choices are genuinely balanced to humans
- a joke is actually funny
- a historical analogy is the best possible editorial fit
- long labels remain visually good on the actual phone
- service-worker update behaviour works on the actual installed Android PWA

## Manual Android acceptance

Before v6.2 is released, test on the target Android Chrome installation:

1. `Mix Everything` can draw from all 200 cards.
2. A single category only draws matching cards.
3. Multiple categories combine without duplicate cards in the run.
4. Random respects selected categories.
5. Saved playback works independently of the filter.
6. Category selection survives close/reopen.
7. Existing Saved cards/settings survive the v6.2 update.
8. The side-by-side A-vs-B panels remain readable/tappable on the target phone.
9. Long choice labels/reasons do not collapse or overlap the divider/`VS` marker.
10. Reveal → The Point → post-Point question → Real-World Example ordering is correct.
11. Long historical titles/body text remain comfortable to read.
12. Chaos, Next Card, Saved, Settings, and wake-lock-related behaviour still work.
13. Settings visibly shows `v6.2.0`.
14. Close/reopen retains the expected card/reveal state.
15. After the new service worker activates, fully close the app, enable airplane mode, turn Wi-Fi off, relaunch from the installed icon, and verify full gameplay remains available.

Do not clear site data as the normal update test because that destroys the very compatibility state being tested.

---

# 11. Current GitHub State

**Verification timestamp:** 2026-08-21, during the continuity-system update. Always re-verify live before acting.

## `main`

Verified `main` SHA before this handoff maintenance commit:

`d5ee158222181ee422699811b2e0baae79703e1e`

Commit message: `Remove accidental placeholder`

This is a housekeeping commit after the v6.1.1 feature release.

## Latest important merged PR

PR #3 — **Show app version in Settings**

- state: merged
- base: `main`
- head branch: `show-app-version`
- head SHA: `8007dea012bd22ee9a8dad4e7ab2e5b8e12a8e6f`
- merge commit: `f90afb2d3096763af555cf2110a5a2d539a5e5a1`
- merged: 2026-08-21

## Current development PR

PR #4 — **Plot Twist v6.2: prominent choices and real-world examples**

Last verified immediately before this handoff maintenance commit:

- branch: `historical-examples-ui`
- base: `main`
- base SHA: `d5ee158222181ee422699811b2e0baae79703e1e`
- exact verified head: `367d3c4c2b7d7a88f88da79c3172f124a95ca7eb`
- workflow: `Validate Plot Twist`
- run number: 36
- run ID: `32541764668`
- status/conclusion: completed / success
- draft: yes
- mergeable: yes
- requested reviewers: none
- submitted reviews: none
- inline review threads: none
- unresolved inline review threads: none
- PR comments: none

**Dynamic-state warning:** this handoff maintenance commit necessarily moves the branch beyond the exact head recorded above. A fresh session must fetch PR #4 and verify the live head/CI/reviews/threads. Never interpret this recorded SHA as merge authorization.

---

# 12. Completed Work

## Original offline PWA

Completed:

- installable PWA structure
- local manifest/icons
- service-worker/offline cache
- local state restore
- Saved cards
- Chaos prompts
- Host prompts
- wake-lock support where available
- dark campfire-oriented UI

## 200-card expansion

Completed:

- exactly 200 local cards
- eight 25-card deck files
- six selectable/mixable categories
- category-aware Start/Random
- stable internal IDs
- automated source validation

## PR #1 — Finalize Plot Twist 200-card audit

Established stronger repository validation/documentation around the complete deck.

A Codex review identified a gap where some user-facing text was outside the terminology audit; subsequent validation work expanded/strengthened runtime/meta leak checks. Do not resurrect the earlier narrower claim without inspecting the validator.

## PR #2 — Rewrite all 200 cards as real two-sided dilemmas

Merged commit:

`2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

Major outcome:

- complete 200-card editorial rewrite
- two defensible pre-reveal choices
- decision-relevant Plot Twists
- clearer `The Point`
- stronger forbidden/meta wording validation
- updated player instructions
- cache v6.1.0

Codex review findings during the PR exposed prohibited wording and loaded-choice lint failures. Those were fixed in subsequent commits before merge. This history is why “weaken the validator to make the deck pass” is explicitly rejected.

## PR #3 — Show app version in Settings

Merged as:

`f90afb2d3096763af555cf2110a5a2d539a5e5a1`

Added visible version reporting and corresponding cache/validation update to v6.1.1.

## PR #4 — v6.2 prominent choices and Real-World Examples

Still open/draft.

Implemented:

- `game-v6.2.css`
- `choice-ui.js`
- `history-ui.js`
- 200 runtime Real-World Example mappings
- `history-reviewed.js` audited override layer
- validator coverage for history and presentation assets
- Settings `v6.2.0`
- cache `plot-twist-v6.2.0`
- full 1–200 historical research ledger
- README/VALIDATION documentation updates
- permanent development continuity system in this file

### Historical audit milestones

The source pass is complete for IDs 1–200.

Important late-deck overrides include:

- 179 — Cynthia Cooper / WorldCom
- 184 — UC Berkeley graduate admissions / Simpson’s paradox
- 187 — *Moritz v. Commissioner*
- 189 — Salt March
- 196 — First World War / July Crisis multi-causation
- 200 — Charles Darwin’s routine at Down House

---

# 13. Current Unresolved Issues

## 1. Final v6.2 Android acceptance test

The major remaining release gate is the physical target-phone smoke test.

Specifically verify:

- side-by-side long choices
- divider/`VS` marker
- Real-World Example placement/readability
- existing local state survives the update
- visible v6.2.0
- installed service-worker update path
- complete airplane-mode use after activation

## 2. PR #4 remains draft

Do not mark ready or merge solely because static CI is green. The phone/offline acceptance requirement is still outstanding unless the user reports it complete.

## 3. Exact local checkout path remains unverified

This is not a code blocker, but future local command instructions must not invent a path.

## 4. Exact live GitHub Pages configuration/URL was not independently verified

The repository documents GitHub Pages from `main`, but this handoff update did not independently verify the Pages settings or deployed URL. Only investigate this if deployment/update behaviour requires it.

---

# 14. Exact Continuation Point

## Exact Next Step

A fresh development chat/session must do the following in order:

1. Connect to GitHub repository `detratech/plot-twist`.
2. Read `docs/DEVELOPMENT_HANDOFF.md` in full.
3. Fetch the live `main` branch and record its exact SHA. Confirm whether it still descends from/equals the last verified `d5ee158222181ee422699811b2e0baae79703e1e` baseline or has moved.
4. Fetch all open PRs and identify the active material development PR. At handoff time that is PR #4, `Plot Twist v6.2: prominent choices and real-world examples`, branch `historical-examples-ui`.
5. Re-fetch PR #4 and record its exact **current** head SHA, draft/ready state, mergeability, base/base SHA, requested reviewers, submitted reviews, comments, and inline review threads. Do not rely on the predecessor SHA recorded in this file.
6. Fetch GitHub Actions for that exact current PR head and confirm `Validate Plot Twist` passed on that exact SHA. If CI is failing, inspect/fix CI before continuing.
7. Confirm the source/history/documentation work remains complete: all 200 cards, all 200 Real-World Examples, all four source-ledger files through ID 200, and the v6.2 UI/history validation remain present.
8. **Do not redo the completed historical source audit** unless repository evidence reveals a concrete defect.
9. The active release task is the final Android Chrome acceptance test: v6.2 visual layout, persistence, service-worker update, and airplane-mode gameplay. Use the checklist in section 10 and `VALIDATION.md`.
10. If the phone test exposes a defect, fix it on the existing v6.2 branch/PR, add or strengthen regression validation where practical, run the full validation suite, and update this handoff.
11. If the phone test passes, update this handoff to record the acceptance result and the new exact continuation point. Keep PR #4 unmerged until the user explicitly authorizes merging that specific PR.
12. If the user explicitly authorizes PR #4 to merge, perform the exact-head merge checklist in section 8 immediately before merging. If the branch has moved since authorization, revalidate and reconfirm authorization for the new head.
13. After an authorized merge, re-fetch `main`, verify the resulting SHA and that PR #4 is included, update this handoff to make v6.2 the released baseline, and provide the user with the safe Windows PowerShell update/validate/start command block from section 9.

Do not end a future handoff with “continue development.” Replace this section with the next concrete ordered procedure whenever the current work changes.
