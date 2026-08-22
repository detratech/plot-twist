# Plot Twist Development Handoff

This file is the authoritative continuity document for future Plot Twist development sessions.

## Continuity rule

When starting a fresh development chat/session:

1. Connect to GitHub repository `detratech/plot-twist`.
2. Read this file in full.
3. Inspect the current `main`, open pull requests, and the branch named in **Active development state** below.
4. Treat the live GitHub repository as authoritative when it differs from an old chat transcript.
5. Continue from **Exact next step** instead of asking the user to restate the project.
6. Before a substantial merge, or before handing work to another chat mid-PR, update this file so it reflects the new repository state and next step.

Do not rely on conversation memory alone. The purpose of this file is to make GitHub sufficient for development continuity.

---

# 1. Project identity

## Project name

**Plot Twist**

## GitHub repository

`detratech/plot-twist`

Default branch: `main`

Repository visibility: public.

## Purpose

Plot Twist is a small, polished, offline-first social scenario game designed primarily for Android phones during camping trips or other situations with little or no connectivity.

The game loop is:

`scenario → choose one of two defensible positions → defend it → reveal Plot Twist → reconsider/switch if warranted → The Point → deeper question → Real-World Example → follow-up discussion`

The player-facing app must feel like a legitimate adult party/campfire game, not a survey, classroom exercise, religious app, philosophy app, or debate-training tool.

The deck is intentionally capable of leading into deeper discussion about evidence, assumptions, responsibility, relationships, money, technology, society, purpose, consistency, incentives, and similar themes, but the runtime does not expose the source-worldview/authoring layer behind those ideas.

## Current production/development status

### Released baseline on `main`

The last substantive release merged to `main` is **v6.1.1**, from PR #3, which added a visible app-version row to Settings after the full 200-card two-sided-dilemma rewrite in PR #2.

Current `main` includes two later housekeeping commits that added and then removed an accidental placeholder file; they do not materially change the application.

### Active work in progress

**PR #4 — `Plot Twist v6.2: prominent choices and real-world examples`**

- Branch: `historical-examples-ui`
- Base: `main`
- State: open draft PR
- Merge policy: **do not merge merely because CI is green**. The v6.2 source/history/docs work must be complete and the final phone/offline smoke test must be treated separately from static validation.

v6.2 adds:

- prominent side-by-side A-vs-B choice presentation
- center divider and `VS` marker
- large choice decision label plus smaller reason text
- one local Real-World Example for every one of the 200 cards
- researched/audited historical-example override layer
- full 1–200 historical source ledger
- v6.2 validator coverage
- visible version `v6.2.0`
- service-worker cache `plot-twist-v6.2.0`

The historical source audit is now complete through ID 200.

## Primary technologies/frameworks

- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- Node.js only for static validation (`validate-content.cjs` and `node --check`)
- Progressive Web App manifest
- Service worker / Cache API
- Browser `localStorage`
- optional Screen Wake Lock API
- GitHub Actions for repository validation
- GitHub Pages is the documented production distribution path from `main`

There is deliberately **no framework, bundler, package install, build pipeline, backend, database, authentication service, analytics service, external API, CDN, or remote font/image dependency at runtime**.

## Local development environment

There is no build step.

From the repository root:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

Do not test the PWA by opening `index.html` directly from `file://`; service workers require a secure context such as HTTPS or localhost.

Static validation is run with:

```bash
node --check cards.js
node --check deck-a.js
node --check deck-b.js
node --check deck-c.js
node --check deck-d.js
node --check deck-e.js
node --check deck-f.js
node --check deck-g.js
node --check deck-h.js
node --check history-a.js
node --check history-b.js
node --check history-c.js
node --check history-d.js
node --check history-reviewed.js
node --check categories.js
node --check app.js
node --check choice-ui.js
node --check history-ui.js
node --check sw.js
node --check validate-content.cjs
node validate-content.cjs
```

GitHub Actions runs the repository validation automatically.

## Important repository paths

### Application shell

- `index.html` — all player-facing screens, rules, settings markup, runtime script/style loading
- `styles.css` — base visual system
- `categories.css` — topic-selector styling
- `game-v6.2.css` — v6.2 choice/history presentation styling
- `app.js` — main application/game state and interaction logic
- `choice-ui.js` — v6.2 choice-label/reason rendering
- `history-ui.js` — inserts the Real-World Example after the post-Point question

### Card data

- `cards.js` — shared `PLOT_TWIST_CARDS` initialization and 16 universal Chaos prompts
- `deck-a.js` through `deck-h.js` — eight 25-card files, exactly 200 cards total
- `categories.js` — six category definitions plus authored/inferred card tagging logic

### Real-World Example runtime data

- `history-a.js`
- `history-b.js`
- `history-c.js`
- `history-d.js`
- `history-reviewed.js` — audited replacements loaded after the draft mappings

### Historical research records

These Markdown files are editorial records only and are not part of the runtime dependency chain:

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
- `docs/DEVELOPMENT_HANDOFF.md` — this continuity document

---

# 2. Architecture

## Front end

Plot Twist is a single-page, framework-free web application.

`index.html` contains the screens and semantic structure. `app.js` manages navigation, game order, card rendering, reveal state, saved cards, settings, selected categories, random/next behaviour, Chaos prompts, install handling, wake lock, persistence, and service-worker status.

The v6.2 UI is intentionally split into small additive files rather than forcing all presentation logic into `app.js`:

- `choice-ui.js` transforms each authored choice string into a large decision label plus a smaller explanatory reason.
- `game-v6.2.css` renders the two choices side by side with a central divider and `VS` marker.
- `history-ui.js` maps the current card ID to `HISTORICAL_EXAMPLES` and inserts a Real-World Example immediately after the post-Point question.

## Card data flow

1. `cards.js` creates the shared card array and Chaos prompts.
2. `deck-a.js` through `deck-h.js` append all 200 cards.
3. `history-a.js` through `history-d.js` populate draft `HISTORICAL_EXAMPLES` mappings.
4. `history-reviewed.js` overwrites selected IDs with audited replacements.
5. `categories.js` preserves valid authored category tags and infers tags where needed.
6. `app.js` selects/shuffles/renders cards according to the chosen topic mix and local state.
7. `choice-ui.js` improves the two-choice visual hierarchy.
8. `history-ui.js` adds the final card-specific Real-World Example to the rendered discussion flow.

## Card schema

Each card has:

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

Internal numeric IDs are stable keys. They are used for saved cards, state continuity, and the one-to-one Real-World Example mapping, but they are not displayed to players.

## Historical example schema/data flow

`HISTORICAL_EXAMPLES[id]` contains:

- `title`
- `text`

There must be exactly one substantive example for every ID 1–200.

The source-ledger Markdown files are intentionally separate from runtime data. The PWA remains fully local and does not fetch research links while playing.

## Persistence/storage

There is no server persistence.

Browser `localStorage` stores compatible player state, including the shuffled order/current card, reveal state, saved cards, category selection, and settings.

Important identifiers:

- local-storage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`

The deck/state identifier intentionally remains stable across the v6.1 and v6.2 content/presentation work because the 200 internal card IDs remain compatible. Do not bump it merely to force an asset refresh; use the service-worker cache version for that.

## APIs

No remote application APIs are used.

Browser platform APIs used or conditionally used include:

- Service Worker API
- Cache API
- `localStorage`
- install/PWA events
- Screen Wake Lock API when supported

## External integrations

Runtime: none.

Development/research only:

- GitHub / GitHub Actions
- research-source links stored in `HISTORY_SOURCES*.md`

The app must not become dependent on those research sites at runtime.

## Authentication

None.

## Backend

None.

## Deployment/hosting

The documented distribution path is GitHub Pages served from the repository root on `main`, then installed from Android Chrome as a PWA.

Publishing a branch/PR is not equivalent to updating the installed app. Installed clients update through the service-worker cache lifecycle after the new `main` assets are deployed.

## Offline architecture

`sw.js` precaches the entire app shell required to play offline, including:

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

Navigation falls back to cached `index.html` when the network is unavailable.

The research-ledger Markdown files are not part of the service-worker app shell and do not need to be cached for play.

---

# 3. Product and UX invariants

These are not optional style suggestions. They are constraints that future development should preserve unless the user explicitly changes them.

## Offline first

After the PWA has been loaded/installed online, the full game must work in airplane mode without internet or cellular service.

Do not introduce runtime dependencies on remote APIs, CDNs, fonts, images, analytics, authentication, or server processing.

## Adult party/campfire identity

The game should feel:

- dark/campfire friendly
- witty and adult
- conversational
- easy to read aloud
- comfortable when a phone is passed around
- lightly mysterious rather than academic

Avoid bright full-screen surfaces, tiny targets, classroom language, preachiness, or unnecessary animation.

## Hidden source layer

The user-facing runtime must not expose the source-worldview or authoring framework that informed parts of the deck.

`validate-content.cjs` contains explicit forbidden-runtime terminology and meta-instruction leak checks. Do not weaken those checks just to make new content pass.

## Two-sided dilemma rule

The current editorial standard is stricter than the original prototype.

Every card must begin with **two defensible choices**. A thoughtful adult should be able to defend either side before the reveal.

Do not write:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- an `it depends` escape choice
- a Plot Twist that merely restates information already in the setup
- a reveal that simply congratulates the intended side

Target:

`two defensible positions → commitment → decision-relevant new information → reconsider → principle`

Changing sides after the reveal is explicitly allowed and is part of the mechanic.

## v6.2 choice presentation

The two authored choices are visually important, not minor chips.

Current design contract:

- two side-by-side columns
- center divider
- `VS` marker
- prominent decision label
- smaller explanatory reason

`validate-content.cjs` checks for these structural hooks. If the UI is redesigned later, update the validator deliberately rather than bypassing it.

## Real-World Example rule

Each of the 200 cards has one local Real-World Example displayed after the post-Point question.

Editorial standard:

- example must clarify the exact card principle
- accuracy/fit outrank fame
- prefer strong sources
- do not use neat historical anecdotes that collapse under checking
- do not overclaim beyond the source
- an example illustrates the principle; it is not universal proof

When audit research replaces a draft mapping, prefer an override in `history-reviewed.js` rather than silently rewriting the draft history files, unless there is a reason to restructure the data layer.

---

# 4. Completed work and major decisions

## Original offline PWA

Completed:

- installable PWA structure
- local icons/manifest
- service worker/offline cache
- local state restore
- Saved cards
- Chaos prompts
- Host prompts
- wake-lock support where available
- dark campfire-oriented UI

## 200-card expansion

Completed:

- deck expanded to exactly 200 local cards
- split into eight 25-card files
- selectable/mixable topic categories
- category-aware Start/Random behaviour
- stable internal IDs
- automated source validation

## Full two-sided-dilemma rewrite — v6.1

PR #2 rewrote all 200 cards around the stricter mechanic:

- two defensible pre-reveal choices
- clear commitment before reveal
- decision-relevant Plot Twists
- sharper declarative `The Point`
- stronger meta/source terminology linting
- updated How to Play

The deck/state identifier stayed `masterpiece-200-v1` because IDs remained compatible.

## Visible app version — v6.1.1

PR #3 added a visible Settings version so an installed phone can be checked against the intended deployed build.

## v6.2 prominent choices and Real-World Examples

Active draft PR #4 has implemented:

- `game-v6.2.css`
- `choice-ui.js`
- `history-ui.js`
- 200 runtime Real-World Example mappings
- `history-reviewed.js` audited override layer
- validator coverage for the entire history layer and new presentation assets
- Settings version `v6.2.0`
- cache `plot-twist-v6.2.0`

### Historical source audit

The source ledger is complete for all IDs 1–200 across four Markdown files.

During the 151–200 pass, several mappings were replaced because research found a stronger fit or removed repetition/weak anecdotes. Important late-deck overrides include:

- 179 — Cynthia Cooper / WorldCom
- 184 — UC Berkeley graduate admissions / Simpson’s paradox
- 187 — *Moritz v. Commissioner*
- 189 — Salt March
- 196 — First World War / July Crisis multi-causation
- 200 — Charles Darwin’s routine at Down House

Card 184 was specifically changed away from the weaker polio/ice-cream anecdote to the published Berkeley admissions case because it is a cleaner documented example of aggregate correlation changing after a confounding variable is examined.

---

# 5. Validation and quality gates

## Automated gate

`.github/workflows/validate.yml` runs syntax checks and `node validate-content.cjs`.

The v6.2 validator checks, among other things:

- exactly 200 cards
- IDs 1–200 complete/unique
- required card structure
- exactly two substantive/distinct choices
- no `it depends` escape
- conservative loaded-choice lint
- substantive Plot Twists
- valid prompts/follow-ups/categories
- exactly 200 substantive Real-World Examples
- all history files loaded/precached
- v6.2 choice/history assets loaded/precached
- Real-World Example placement
- side-by-side choice UI hooks/divider/`VS`
- visible `v6.2.0`
- `masterpiece-200-v1`
- cache `plot-twist-v6.2.0`
- forbidden source-worldview terms absent from runtime
- authoring/meta-instruction leaks absent from runtime

Static validation is necessary but insufficient.

## Manual/on-device gate

Before v6.2 should be treated as final for the camping use case, perform the Android/Chrome smoke test described in `VALIDATION.md` and `README.md`, especially:

- A-vs-B panels on the actual target phone
- long choice labels/reasons
- long Real-World Example titles/body text
- reveal → Point → post-Point question → Real-World Example ordering
- Saved cards
- category filtering/mixing
- app version display
- state persistence after closing/reopening
- service-worker update from the previous installed version
- full airplane-mode launch and play after the v6.2 cache activates

Do not claim that GitHub Actions physically certifies Android PWA behaviour.

---

# 6. Current unresolved issues / risks

## 1. Final v6.2 physical smoke test is still separate from CI

The source/history/docs work is complete, but the actual phone presentation and airplane-mode update path still require the manual test described above.

This matters because the v6.2 UI deliberately keeps two prominent side-by-side choices; static CSS validation cannot prove every long label remains comfortable on the target Android viewport.

## 2. PR #4 should remain draft until the release decision

Do not merge PR #4 merely because source validation passes. Confirm the latest CI result and preserve the manual-test distinction.

If the user performs the target-phone smoke test successfully and asks to release, update this handoff with the result, make PR #4 ready for review if appropriate, and merge through the normal GitHub flow.

## 3. Source-ledger links are editorial dependencies, not runtime dependencies

Broken research links later do not break the PWA, but they degrade maintainability. If a future content audit touches a historical example, verify the cited source rather than copying the existing prose blindly.

---

# 7. Git workflow / branch discipline

- `main` is the released baseline.
- Active v6.2 work belongs on `historical-examples-ui` / PR #4 until that PR is resolved.
- Reuse the existing PR rather than opening a duplicate v6.2 PR.
- Keep the PR draft until the work is genuinely release-ready.
- Do not directly develop new features on `main`.
- Preserve stable card IDs unless an intentional migration is designed.
- When runtime assets/content change, consider whether the service-worker cache name must be bumped so installed clients actually receive the change.
- Do not bump `masterpiece-200-v1` unless the saved-state/card-ID compatibility contract really changes.

---

# 8. Exact next step

At the time this handoff was created, the exact next development step is:

1. **Check the latest GitHub Actions run on `historical-examples-ui` after the completed 176–200 source audit and documentation commits.** Fix any static validation failure before doing anything else.
2. If CI is green, **leave PR #4 as a draft** and perform/obtain the final Android Chrome visual + persistence + airplane-mode smoke test for v6.2.
3. If the phone test passes, record that result in this handoff and `VALIDATION.md` if useful, then move PR #4 toward release/merge only when the user authorizes that release step.
4. After PR #4 is merged, update this document so `main`/v6.2 becomes the released baseline and replace this section with the next real development task.

Do not restart the project, regenerate the 200-card deck, or reopen the already-completed historical source audit unless a concrete defect is found.
