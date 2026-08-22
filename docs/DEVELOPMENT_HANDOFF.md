# Plot Twist Development Handoff

> **Authoritative continuity rule**
>
> **docs/DEVELOPMENT_HANDOFF.md is the authoritative continuity document for this project. Every material development PR must update this file before merge. The update must reflect the actual final state of the branch, completed work, important decisions, tests and validation, current GitHub state, unresolved issues, and the exact next step. A material development PR is not complete until the handoff is current.**
>
> **Current repository code and verified GitHub state outrank this document. If the handoff is discovered to be stale or incorrect, verify the repository and correct the handoff immediately rather than following stale instructions.**
>
> **Do not rely on ChatGPT conversation history as the durable source of project state. Important development context must be captured in this repository handoff.**

## Handoff maintenance triggers

Update this file whenever material work changes architecture, product rules, storage/state compatibility, runtime behaviour, important UI/workflows, deployment, development procedures, testing, current PR status, unresolved issues, or the exact next step. At minimum, update it before every material merge and again after merge when the released baseline or continuation point changes.

---

# 1. Project Identity

## Project

**Plot Twist**

Repository: `detratech/plot-twist`

Default branch: `main`

Repository visibility: public.

Plot Twist is an offline-first social scenario game intended primarily for Android phones during camping trips, game nights, travel, and other low-connectivity situations.

Current player flow:

`scenario → choose one of two defensible positions → defend it → reveal Plot Twist → reconsider/switch if warranted → The Point → deeper question → Real-World Example → One Last Thing → Where This Can Go`

The product should feel like an adult party/campfire game, not a survey, classroom exercise, overt debate-training tool, religious app, or philosophy app.

## Current released baseline

**v6.3.0 is merged to `main`.**

PR #5 — **Plot Twist v6.3: consistency pressure tests** — was explicitly authorized by the user and merged on 2026-08-21 America/Vancouver time.

Exact merged PR head:

`94fac2411bdfdcbe89e563c4263588773bec3406`

Merge commit:

`deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`

The merge commit has parents:

- previous `main`: `045684ad04e5dd6f823a14d2caf49353846f197a`
- PR #5 head: `94fac2411bdfdcbe89e563c4263588773bec3406`

Immediately before merge, GitHub was re-fetched and verified:

- PR #5 was open and mergeable
- exact head matched the authorized SHA
- `Validate Plot Twist` run #42, run ID `32545084361`, completed successfully on that exact SHA
- submitted reviews: none
- inline review threads: none
- PR comments/blockers: none
- handoff file was current on the PR head

The PR was taken out of draft without changing the head SHA and merged with `expected_head_sha` pinned to the verified head.

After merge, `main` was verified at `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40` before this handoff update. This handoff update itself creates a newer `main` commit, so future sessions must re-fetch live `main` rather than treating the pre-update SHA as current.

## User workflow

**The user does not maintain a local Plot Twist repository.**

Normal project path:

`GitHub repository → feature branch/PR → GitHub Actions validation → explicit user authorization → merge to main → GitHub-hosted deployment → Android/PWA acceptance test`

Do not tell the user to run `git pull`, `git switch`, Node, Python, or a local web server unless they explicitly choose to create a local clone later.

---

# 2. Architecture

## Runtime

- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- Progressive Web App manifest
- Service Worker / Cache API
- browser `localStorage`
- optional Screen Wake Lock API

There is deliberately no framework, bundler, package-manager dependency install, backend, database, authentication service, analytics service, runtime API, CDN, or remote font/image dependency.

## Main runtime files

- `index.html`
- `styles.css`
- `categories.css`
- `game-v6.2.css` — prominent side-by-side A-vs-B presentation
- `game-v6.3.css` — `One Last Thing` presentation
- `app.js`
- `choice-ui.js`
- `history-ui.js`
- `consistency-ui.js`
- `cards.js`
- `deck-a.js` through `deck-h.js`
- `categories.js`
- `history-a.js` through `history-d.js`
- `history-reviewed.js`
- `manifest.webmanifest`
- `sw.js`

## Card model

Exactly 200 cards. Stable internal IDs 1–200.

Each card contains:

- `id`
- `title`
- `vibe`
- `scenario` — exactly two non-empty paragraphs
- `prompt`
- `choices` — exactly two defensible pre-reveal choices
- `twist`
- `conclusion` — displayed as `The Point`
- `afterPrompt`
- `hostPrompts` — exactly two
- `categories` — one or two valid category IDs

Internal IDs are compatibility keys and must not be displayed to players.

## Categories

Six category IDs:

- `mind`
- `relationships`
- `money`
- `tech`
- `society`
- `life`

`Mix Everything` represents the full deck. Multi-category selection forms a union without duplicate cards. Start and Random respect the active filter. Saved playback is independent of the current filter.

## Real-World Examples

Exactly one substantive runtime example maps to every card ID 1–200.

Runtime precedence:

1. `history-a.js` through `history-d.js`
2. `history-reviewed.js`, loaded afterward and authoritative for overridden IDs

Research ledgers:

- `HISTORY_SOURCES.md`
- `HISTORY_SOURCES_51_100.md`
- `HISTORY_SOURCES_101_150.md`
- `HISTORY_SOURCES_151_200.md`

Accuracy and analogy fit outrank fame. Prefer primary, official, academic, archival, court, museum, or strong first-party sources where practical. Do not overclaim what a source proves.

Card 184 intentionally uses the documented 1973 UC Berkeley graduate-admissions / Simpson's paradox example instead of the weaker polio/ice-cream anecdote.

---

# 3. Persistence and Compatibility

Browser state uses:

- localStorage key: `plotTwistStateV4`
- deck/state identifier: `masterpiece-200-v1`
- stable card IDs 1–200

These intentionally remain unchanged through v6.3 because the persisted state structure and card-ID compatibility remain intact.

Do not bump `masterpiece-200-v1` merely to refresh assets. Use the service-worker cache version for runtime asset refresh.

v6.3 service-worker cache:

`plot-twist-v6.3.0`

Visible Settings version:

`v6.3.0`

Do not casually recommend clearing browser/site data because that destroys Saved cards, settings, selected categories, and current state and undermines compatibility testing.

---

# 4. Product and Editorial Rules

## Two-sided dilemma rule

Every card must begin with two genuinely defensible choices. A thoughtful adult should be able to defend either side before the reveal.

Do not write:

- sensible answer vs caricature
- virtue-labelled answer vs obviously bad answer
- `it depends` escape choice
- Plot Twist that only repeats setup information
- reveal that merely congratulates one side

Target structure:

`two defensible positions → commitment → decision-relevant new information → reconsider → principle`

Changing sides after the reveal is intentional and explicitly allowed.

## The Point

`The Point` should land a clear declarative principle. Do not retreat into forced neutrality merely to make both sides seem equally valid after the reveal.

## Hidden source layer

Player-facing runtime text must not expose the source-worldview or authoring framework behind the game. `validate-content.cjs` enforces protected terminology and meta-authoring leak checks.

Do not weaken those checks merely to make new content pass.

## Choice presentation

Current design contract:

- two side-by-side columns
- center divider
- `VS`
- prominent decision label
- smaller reason

## Real-World Example placement

The Real-World Example appears after the post-Point question so players reason through the fictional dilemma before the concrete analogy anchors the discussion.

## v6.3 One Last Thing

Every card now gets one concise consistency pressure test after its Real-World Example and before `Where This Can Go`.

Eight deterministic test types:

1. `SAME RULE?` — role reversal
2. `WHAT WOULD CHANGE YOUR MIND?` — identify evidence that could genuinely change the conclusion
3. `OUTCOME TEST` — keep the principle when the result is disliked
4. `STRANGER TEST` — remove identity attachment
5. `EVERYONE GETS IT` — universal application
6. `YOUR TURN` — self-application
7. `POWER FLIP` — apply the same rule after power reverses
8. `CROSSOVER` — transfer the same standard across family, money, work, and public life

Assignment is deterministic using stable card ID:

`(current.id - 1) % TESTS.length`

This keeps a card's consistency prompt stable across sessions without adding a new saved-state field.

## Chaos remains separate

`cards.js` defines 16 optional universal Chaos pressure tests. Chaos remains random, playful, and more aggressive. `One Last Thing` is the guaranteed concise consistency check in the normal flow.

## No scoring / visible correct-answer system

Do not add ideology scores, moral scores, visible `correct` answers, or other mechanics that make players feel they are being graded. The game works best when discussion and self-consistency do the work.

---

# 5. Offline / PWA Rules

Offline-first is non-negotiable.

`sw.js` must precache all essential runtime assets, including deck files, history files, categories, app logic, v6.2/v6.3 presentation assets, manifest, and local icons.

When runtime assets are added or renamed, inspect and update together:

- `index.html`
- `sw.js`
- `validate-content.cjs`

After the service worker caches the app shell, the installed Android PWA must launch and play with airplane mode enabled and Wi-Fi off.

A merge to `main` makes source eligible for hosted deployment, but an installed PWA can remain on an older service-worker cache until the hosted site publishes the new source and Chrome completes its update lifecycle. Verify the visible Settings version on-device rather than assuming the merge reached the phone.

---

# 6. Validation

GitHub Actions workflow:

`.github/workflows/validate.yml`

Workflow name:

`Validate Plot Twist`

Environment:

- `ubuntu-latest`
- Node.js 22

The workflow runs JavaScript syntax checks and `node validate-content.cjs`.

Validator coverage includes, among other things:

- exactly 200 cards
- IDs 1–200 complete and unique
- required card schema
- two scenario paragraphs
- exactly two distinct substantive choices
- no `it depends` escape
- conservative loaded-choice wording lint
- substantive Plot Twists
- valid category assignments
- exactly 200 substantive Real-World Examples
- runtime assets loaded by `index.html`
- runtime assets precached by `sw.js`
- Real-World Example placement
- A-vs-B structural hooks
- v6.3 `One Last Thing` assets and prompt contracts
- visible `v6.3.0`
- `masterpiece-200-v1`
- cache `plot-twist-v6.3.0`
- protected terminology/meta-authoring leak checks

Static CI does **not** prove mobile visual comfort, installed service-worker update behaviour, persistence across a real upgrade, or airplane-mode launch. Those require physical Android testing.

---

# 7. Git and Pull Request Workflow

`main` is the released baseline. Material development occurs on a feature branch and PR.

**Never merge a material PR without explicit user authorization for that specific PR.**

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

If the branch changes after authorization, the previous authorization does not automatically apply. Revalidate and reconfirm approval for the new head.

After merge:

1. verify resulting `main` SHA from GitHub
2. confirm the intended PR became part of `main`
3. update this handoff if the released baseline or next step changed
4. do **not** give local-repository commands to the user
5. verify the hosted version and conduct Android/PWA acceptance

---

# 8. Completed Material Work

## PR #2

Rewrite all 200 cards as real two-sided dilemmas.

Relevant merged history commit: `2c9056a4a0c0bbd6c547804379e5fa16eee4a1e9`

## PR #3

Show app version in Settings.

Merged as `f90afb2d3096763af555cf2110a5a2d539a5e5a1`.

## PR #4 — v6.2

Prominent A/B choices and 200 Real-World Examples.

Exact merged head: `34a5fd3dec48e0651a67ced093a15917887f999a`

Merge commit: `c1c41ba64d08a0c7b7239bda10fad7a56ce645a2`

Included full historical source ledger IDs 1–200, audited override layer, visible v6.2 version/cache, and permanent handoff system.

## PR #5 — v6.3

Consistency pressure tests.

Exact merged head: `94fac2411bdfdcbe89e563c4263588773bec3406`

Merge commit: `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`

Pre-merge exact-head validation: run #42, run ID `32545084361`, success.

Added:

- `One Last Thing`
- eight deterministic consistency tests
- `consistency-ui.js`
- `game-v6.3.css`
- v6.3 cache/version wiring
- expanded static validation
- README/VALIDATION/handoff updates

---

# 9. Current Unresolved Issues

## 1. Hosted v6.3 deployment / service-worker update

The source is merged to `main`, but the Android app still needs to confirm it has received the hosted v6.3 build.

Do not clear site data merely to force the update.

## 2. Android v6.3 acceptance

Once Settings shows `v6.3.0`, physically verify:

1. existing Saved cards/settings/categories survive the v6.2 → v6.3 update
2. `One Last Thing` appears after the Real-World Example and before later follow-up content
3. several cards rotate through different consistency-test types as expected
4. long prompt text remains readable and visually balanced on the target phone
5. A/B choice UI remains unchanged and readable
6. category filtering / multi-select / Random still work
7. Saved playback remains independent of category filtering
8. state survives close/reopen
9. Chaos, Next, Saved, Settings, Host prompts, and wake-lock-related behaviour still work
10. Settings shows `v6.3.0`
11. after the new service worker activates, fully close the app, enable airplane mode, turn Wi-Fi off, relaunch from the installed icon, and verify full gameplay including `One Last Thing`

## 3. Exact hosted URL/settings

The project is GitHub-hosted, but the exact public Pages URL/settings are not yet recorded here. Verify them only if deployment debugging requires it; do not invent them.

---

# 10. Exact Continuation Point

## Exact Next Step

1. Re-fetch live `main` and PR #5 state from GitHub. PR #5 should remain merged; the merge commit is `deb24319e7302a45ed2f2b9cf3bfe7006ba7da40`.
2. Treat v6.3.0 as the released source baseline.
3. Do not ask for or invent a local Plot Twist repository.
4. Have the user open the hosted/installed Plot Twist app while online and check **Settings → App Version**.
5. If it shows `v6.3.0`, complete the Android acceptance checklist in section 9, ending with the airplane-mode relaunch test.
6. If it still shows `v6.2.0`, do **not** clear site data. Investigate hosted deployment/service-worker update behaviour first and use the least-destructive update path.
7. If testing reveals a defect, create/use a feature branch and PR, add regression validation where practical, keep this handoff current, and do not merge without explicit user authorization.
8. If v6.3 passes Android acceptance, update this handoff to record acceptance as complete and replace this Exact Next Step with the next concrete product/development task.
