# Plot Twist Validation

Validation notes for the 200-card source, the v6.2/v6.3 presentation/history/consistency layers, and the v6.3.1 runtime/PWA audit.

## Current deck structure

- **200 local scenarios** split across `deck-a.js` through `deck-h.js`.
- `cards.js` initializes the shared array and 16 Chaos pressure tests.
- Five runtime history files provide exactly 200 Real-World Example mappings: `history-a.js` through `history-d.js`, then `history-reviewed.js` as the audited override layer.
- `choice-ui.js` owns choice label/reason enhancement.
- `history-ui.js` owns Real-World Example rendering only.
- `consistency-ui.js` owns the deterministic `One Last Thing` layer.
- `game-v6.2.css` owns the prominent A-vs-B presentation.
- `game-v6.3.css` owns the consistency callout.
- Internal IDs are compatibility/mapping keys and remain hidden from normal player-facing UI.

## Current flow

`pick topics → dilemma → two prominent A-vs-B choices → commitment → discussion → Plot Twist → reconsider/switch → The Point → deeper question → Real-World Example → One Last Thing → Where This Can Go`

The Real-World Example remains after the post-Point question. `One Last Thing` remains after that example.

The eight consistency prompts are:

1. `SAME RULE?`
2. `WHAT WOULD CHANGE YOUR MIND?`
3. `OUTCOME TEST`
4. `STRANGER TEST`
5. `EVERYONE GETS IT`
6. `YOUR TURN`
7. `POWER FLIP`
8. `CROSSOVER`

Assignment remains deterministic from stable card ID with `(current.id - 1) % TESTS.length`.

## Editorial validation standard

Every card should still pass these human checks in addition to automation:

1. Two thoughtful adults can reasonably disagree before the reveal.
2. Each button states a real action, rule, priority, or judgement.
3. Neither choice pre-labels itself as the obviously virtuous/correct side.
4. The Plot Twist adds decision-relevant information.
5. The reveal creates a credible reason to reconsider, narrow, or switch.
6. `The Point` lands a clear principle rather than forced neutrality.
7. The Real-World Example matches that exact principle and stays within what its source supports.
8. Humour supports the dilemma rather than rigging the vote.
9. `One Last Thing` pressure-tests the player's stated reasoning regardless of which side they chose.
10. Runtime text stays inside the protected terminology/meta-authoring rules enforced by the validator.

## v6.3.1 defects found by the deep code/workflow audit

The patch is not merely a documentation or lint change. The audit found concrete runtime/workflow flaws and added regression protection for them.

### Service worker

**Old-cache deletion was too broad.** The previous activation logic deleted every cache on the current origin except the newest Plot Twist cache. On a shared GitHub Pages origin, this could remove caches belonging to unrelated repository apps.

v6.3.1 now:

- defines `CACHE_PREFIX = 'plot-twist-'`
- deletes only old caches that start with that prefix
- uses the current named cache for runtime reads/writes rather than a global cache match
- restricts runtime caching to same-origin requests inside the service-worker registration scope
- awaits `cache.put()` so the fetch lifecycle does not abandon a pending write
- returns an explicit error response for uncached offline non-navigation requests

### Persisted state and run semantics

v6.3.1 now:

- validates/deduplicates persisted card-ID arrays
- normalizes settings to booleans
- validates persisted mode and clamps position
- tolerates localStorage write/remove failures rather than crashing gameplay
- advances completed runs to `position === order.length`, so the last card does not reappear as resumable
- adds `runCategories` as a compatible additive field, falling back from old state to `selectedCategories`
- uses `runCategories` for the active run label, preventing home-filter changes from relabelling an already-built run
- replaces the generic completed-run restart with mode-aware `PLAY AGAIN`
- keeps Saved-card replay in Saved mode and normal/random replay tied to the original run-category snapshot

### Browser interaction/lifecycle

v6.3.1:

- prevents duplicate wake-lock acquisition
- gives the Chaos modal Escape-key dismissal, close-control focus on open, and focus restoration on close
- attempts a service-worker update/activation while online before reporting the cache ready, while allowing an already-active worker to keep offline launch usable when update checks cannot reach the network

### Module ownership

The prior `history-ui.js` duplicated the full choice-enhancement logic already present in `choice-ui.js`.

v6.3.1 removes that duplicate path. `choice-ui.js` is now the single owner of choice formatting; `history-ui.js` only renders the historical example.

## Automated validation architecture

GitHub Actions now runs two complementary executable audits.

### 1. `validate-content.cjs`

This preserves the existing product/content contract. It requires, among other things:

- exactly 200 cards
- IDs 1–200 complete and unique
- unique normalized titles/scenarios
- required card fields
- exactly two scenario paragraphs
- exactly two distinct substantive pre-reveal choices
- no `it depends` escape
- conservative loaded-choice wording lint
- substantive Plot Twist text that is not an exact scenario repeat
- question-form main/deeper prompts
- exactly two conversation paths
- one or two valid categories per card and meaningful coverage across all six categories
- exactly 200 substantive Real-World Examples after the override layer
- all expected deck/history/UI assets loaded and precached
- two-sided dilemma and switch-after-reveal rules present in How to Play
- Real-World Example and One Last Thing placement contracts
- exactly eight intended consistency tests and deterministic assignment
- protected source-worldview/meta-authoring terminology absent from runtime/card/history/consistency text
- visible app version `v6.3.1`
- stable deck ID `masterpiece-200-v1`
- cache `plot-twist-v6.3.1`

The content validator was not weakened by the audit.

### 2. `validate-runtime.cjs`

This is the v6.3.1 runtime/PWA/workflow regression audit. It checks:

#### Version and compatibility

- Settings reports `v6.3.1`
- SW cache is `plot-twist-v6.3.1`
- localStorage key remains `plotTwistStateV4`
- deck/state ID remains `masterpiece-200-v1`

#### Service worker

- cache cleanup is restricted to `plot-twist-*`
- the old unsafe delete-all-other-caches pattern is absent
- runtime requests are origin/scope restricted
- current named cache is used for reads/writes
- runtime cache writes are awaited
- offline error/fallback behavior is explicitly wired
- `APP_SHELL` has no duplicates
- every `APP_SHELL` file exists

#### Runtime assets / manifest

- every local HTML script/link exists and is precached
- no external HTTP runtime dependency appears in `index.html`
- manifest JSON parses
- `start_url` and `scope` remain repository-relative
- display remains standalone
- required regular/maskable icons exist and are precached
- manifest shortcut URLs stay inside app scope
- the Random shortcut is handled by `app.js`

#### DOM and routing

- IDs in `index.html` are unique
- every runtime `getElementById()` target exists
- every `aria-labelledby` target exists
- every `data-screen` target is registered
- every `data-action` value is handled by `app.js`
- the full category picker contains exactly the expected `all` + six category IDs

#### State / interaction regressions

- persisted card/settings normalizers exist
- localStorage writes are guarded
- completion uses the end-of-run sentinel
- `runCategories` is stored and used for active-run labels
- mode-aware restart/PLAY AGAIN exists
- Saved-mode replay remains Saved-mode replay
- duplicate wake-lock requests are guarded
- Chaos Escape/focus handling remains present
- service-worker update/activation and offline-active-worker fallback remain wired

#### Module ownership

- `history-ui.js` does not contain choice enhancement logic
- `choice-ui.js` remains the sole owner of decision-label/reason splitting

#### GitHub Actions hardening

- `actions/checkout` and `actions/setup-node` are pinned to immutable 40-character SHAs
- checkout credentials are not persisted
- manual `workflow_dispatch` exists
- superseded validation runs are cancelled
- job timeout is present
- `validate-runtime.cjs` is syntax checked and executed
- Dependabot is configured for GitHub Actions updates

## GitHub Actions workflow

`.github/workflows/validate.yml` currently:

- runs on pushes to `main`
- runs on PRs targeting `main`
- supports manual `workflow_dispatch`
- grants only `contents: read`
- uses per-branch/PR concurrency with `cancel-in-progress: true`
- has `timeout-minutes: 10`
- pins `actions/checkout` and `actions/setup-node` to verified immutable SHAs
- sets `persist-credentials: false`
- uses Node.js 22
- syntax-checks all runtime/validator JavaScript
- runs both validators

`.github/dependabot.yml` checks the GitHub Actions ecosystem weekly so pinned dependency SHAs remain maintainable through reviewed PRs.

## State compatibility

v6.3.1 is intentionally compatible with prior v6.3 state.

Stable anchors remain:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- card IDs 1–200

`runCategories` is additive. An older state object without it falls back to its existing `selectedCategories`. There is no reason to clear Saved cards or reset site data merely to receive this patch.

## Offline/PWA source check

- no framework/build/backend/runtime API/CDN/remote font/remote image/auth/analytics dependency
- cache name: `plot-twist-v6.3.1`
- all essential runtime assets are precached
- cache cleanup is Plot-Twist-prefix scoped
- manifest remains standalone and repository-relative
- research-ledger Markdown files remain editorial-only, not runtime dependencies

## v6.3.1 Android acceptance

Static validation cannot physically certify Android Chrome, wake lock, PWA installation, service-worker activation, or narrow-screen interaction.

After v6.3.1 is merged/deployed, verify:

1. Settings shows `v6.3.1`.
2. Existing Saved cards/settings/compatible active state survive the v6.3.0 → v6.3.1 update without clearing site data.
3. Start a specific category run, return home, change the home category filter, then Resume: the active run label and deck remain tied to the category selection that created the run.
4. Reach the final card and complete the run; returning home must not offer Resume for that finished run.
5. `PLAY AGAIN` after a normal/random run uses the original run-category snapshot.
6. `PLAY AGAIN` after a Saved-card run remains a Saved-card run.
7. Chaos still works; closing it restores interaction/focus correctly, and Escape closes it where a keyboard is available.
8. Keep Screen Awake still behaves normally without duplicate requests.
9. Main flow remains `Plot Twist → The Point → deeper question → Real-World Example → One Last Thing`.
10. Category filtering, Random, Saved, Next, Settings, Host prompts, and long A-vs-B/history content remain comfortable on the target phone.
11. Fully close the app, enable airplane mode and turn Wi-Fi off, relaunch from the installed icon, and verify cached gameplay.
12. Close/reopen again while still offline and verify state restoration.

A green GitHub Actions run is the required static integration gate, not a substitute for this on-device acceptance test.
