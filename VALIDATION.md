# Plot Twist Validation

This document defines the release gate for the current Plot Twist architecture.

## v6.5.0 release contract

The repository contains a **200-card source/archive pool** and a **100-card playable Sugar Coated deck**.

Two content modes are defined:

- **SUGAR COATED FOR SNOWFLAKES** — available; exactly 100 curated source IDs
- **CUTTHROAT HONEST** — named/reserved; unavailable until the vault-backed deck is implemented

The source/archive pool must not be physically reduced to 100 because stable IDs, Saved state, history mappings, direct answers, and old in-progress runs depend on the full source set remaining available.

## Automated gate 1 — `validate-content.cjs`

This validator must prove all of the following.

### Complete source pool

- exactly 200 source cards load
- IDs 1–200 are complete and unique
- titles and scenarios are unique
- every card retains the required schema
- exactly two defensible choices exist
- no pre-reveal `it depends` escape
- Plot Twist is substantive and not merely setup repeated
- The Point is declarative
- follow-up is a question
- exactly two Keep Talking prompts exist
- one or two valid categories exist

### Real-World Examples and answers

- exactly 200 Real-World Examples remain mapped to source IDs 1–200
- exactly 200 `AFTER_ANSWERS` remain mapped to source IDs 1–200
- direct answers are declarative, concise, non-empty, and unique
- One Last Thing remains an answer step rather than another generic question

### Sugar Coated curation

- `SUGAR_COATED_CARD_IDS` exists
- exactly 100 IDs are selected
- all 100 are unique
- every selected ID exists in the source pool
- every selected ID still has a Real-World Example
- every selected ID still has a direct answer
- each of the six categories has at least 10 selected cards

Current validated memberships:

| Category | Selected memberships |
|---|---:|
| Mind & Truth | 38 |
| Relationships & Family | 32 |
| Money & Success | 13 |
| Tech & Modern Life | 19 |
| Society & Culture | 26 |
| Life & Purpose | 39 |

Because a card may have two categories, totals exceed 100.

### Mode contract

- exact label `SUGAR COATED FOR SNOWFLAKES`
- Sugar mode is available and points to the 100 curated IDs
- exact label `CUTTHROAT HONEST`
- Cutthroat mode remains unavailable with no playable IDs until its vault-backed deck exists
- both names are visible in the player interface
- Cutthroat is visibly marked as coming next

### Runtime asset/version contract

- `game-modes.js` loads after current card/category/language/answer data and before `app.js`
- `game-modes.js` is in the service-worker precache
- Settings shows `v6.5.0`
- service worker uses `plot-twist-v6.5.0`
- stable deck/state ID remains `masterpiece-200-v1`

## Automated gate 2 — `validate-runtime.cjs`

This validator covers runtime and PWA regressions.

### Mode routing

- old/missing content-mode state normalizes to Sugar Coated
- new normal/random runs snapshot `runContentMode`
- eligible-card selection occurs inside that snapshotted mode
- category selection occurs inside the active mode pool
- changing the home selection cannot silently change a running deck
- Cutthroat cannot be selected while it is unavailable

### Backward compatibility

- localStorage key remains `plotTwistStateV4`
- deck/state ID remains `masterpiece-200-v1`
- Saved and legacy IDs continue to normalize against all source IDs 1–200
- card lookup continues to resolve against all 200 source cards
- an in-progress pre-v6.5 run may therefore finish even if it contains cards not included in the curated 100

### Existing v6.3.1+ protections

- service-worker cleanup deletes only old `plot-twist-*` caches
- runtime caching is same-origin and scope-limited
- cache writes are awaited
- manifest/local assets exist and are precached
- state writes cannot crash the game if localStorage is unavailable
- completed runs do not falsely appear resumable
- active category context is stable
- Saved replay remains Saved replay
- duplicate wake locks are prevented
- Chaos modal supports Escape/focus handling
- choice/history presentation responsibilities remain separated
- One Last Thing reads explicit `AFTER_ANSWERS[id]` and never falls back to The Point

### Workflow hardening

- GitHub Actions dependencies remain pinned to immutable SHAs
- checkout credentials are not persisted
- superseded runs are cancelled
- validation has a timeout
- workflow can be manually dispatched
- `game-modes.js` and all validators are syntax checked

## Automated gate 3 — `validate-language.cjs`

The existing plain-language gate remains mandatory for the current Sugar Coated source material.

It checks the final rendered language for selected formal/jargon terms and conversational sentence-length limits across:

- scenarios
- choices
- prompts
- Plot Twists
- The Point
- follow-up questions
- Keep Talking questions
- Real-World Examples
- all 200 direct answers

The future Cutthroat deck will require its **own explicit content/source validation contract** instead of weakening or silently repurposing the current general-mode rules.

## Android/PWA acceptance for v6.5.0

After merge/deployment:

1. Open the hosted/installed app online.
2. Confirm Settings shows **v6.5.0**.
3. Confirm the home screen displays both exact mode names.
4. Confirm **Sugar Coated for Snowflakes** is selected and usable.
5. Confirm **Cutthroat Honest** is visible but disabled/marked coming next.
6. With Mix Everything selected, confirm the home screen reports **100 cards**.
7. Start a normal run and confirm only the curated deck is used.
8. Try multiple categories and confirm the displayed eligible-card count changes sensibly.
9. Confirm existing Saved cards from before v6.5 still open, including any card that may no longer be in the curated 100.
10. If a pre-v6.5 run was already active before updating, confirm it can resume rather than being discarded.
11. Confirm Plot Twist → The Point → question → Real-World Example → THE SHORT ANSWER still works.
12. Confirm Random, Saved, replay, Chaos, Settings, wake lock, and persistence still work.
13. Fully close the app, enable airplane mode, turn Wi-Fi off, reopen from the installed icon, and verify gameplay remains functional.

Do not clear site/app data during ordinary acceptance because that defeats the compatibility tests.

## Future Cutthroat gate

Before `CUTTHROAT HONEST` can change to `available: true`, a later PR must add and validate at minimum:

- a separate stable card namespace/data layer
- at least 100 playable cards
- source/provenance metadata tied to the approved vault input
- update/version tracking for the vault knowledge snapshot
- explicit content validation suitable for that transparent mode
- offline precaching
- Saved/state behaviour across both content modes
- Android acceptance for mode switching

Until those requirements exist, CI should continue treating an available empty Cutthroat mode as a release failure.
