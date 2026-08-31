# Plot Twist

Plot Twist is an offline-first social scenario game for Android phones, camping trips, game nights, travel, and casual group discussion.

The core loop is:

`scenario → pick a side → say why → reveal Plot Twist → reconsider → The Point → follow-up question → Real-World Example → One Last Thing / THE SHORT ANSWER → Keep Talking`

## Current development version

**v6.5.0** introduces the content-mode foundation and trims the playable general deck to its strongest 100 cards while preserving the complete 200-card source/archive pool.

### Modes

#### SUGAR COATED FOR SNOWFLAKES

Available now.

- exactly 100 curated cards
- selected from the existing 200-card source pool
- intended to keep the strongest dilemmas, reveals, principles, examples, and discussion value
- category filtering still works inside this 100-card pool

#### CUTTHROAT HONEST

Visible in the interface but intentionally disabled in v6.5.0.

This is the reserved slot for the future vault-backed deck. It must not become playable until its own content, source/provenance rules, validators, and offline assets actually exist.

## Why the other 100 cards were not deleted

The repository deliberately keeps all source cards with stable IDs 1–200.

This preserves:

- existing Saved-card references
- in-progress pre-v6.5 runs
- 200 Real-World Example mappings
- 200 direct One Last Thing answers
- historical/editorial provenance
- the ability to revisit curation decisions later without reconstructing deleted content

`game-modes.js` is the release-selection layer. `SUGAR_COATED_CARD_IDS` contains exactly 100 stable source IDs.

New Sugar Coated normal/random runs use only those IDs. Saved cards continue to resolve against the full 200-card source pool.

## Curation standard

The 100-card set was selected for:

1. a genuinely defensible choice on both sides before the reveal
2. a setup normal people can discuss without needing specialist knowledge
3. a Plot Twist that materially changes or complicates the decision
4. a clear, transferable Point
5. a Real-World Example that fits the principle
6. a direct One Last Thing answer that closes the question
7. memorable read-aloud quality
8. avoiding duplicate cards that teach substantially the same lesson
9. useful coverage across all six categories

The current curated category memberships are:

- Mind & Truth: 38
- Relationships & Family: 32
- Money & Success: 13
- Tech & Modern Life: 19
- Society & Culture: 26
- Life & Purpose: 39

Cards may belong to two categories, so these totals intentionally exceed 100.

## Data architecture

The full source model remains exactly 200 cards with stable IDs 1–200.

Each source card contains:

- `id`
- `title`
- `vibe`
- `scenario` — exactly two paragraphs
- `prompt`
- `choices` — exactly two
- `twist`
- `conclusion` — The Point
- `afterPrompt`
- `hostPrompts` — exactly two
- `categories` — one or two category IDs after processing

Separate one-to-one data layers remain:

- `HISTORICAL_EXAMPLES[id]` — one Real-World Example for every source card
- `AFTER_ANSWERS[id]` — one explicit direct answer for every source card

## Main runtime files

- `index.html` — screens, mode picker, category picker, player-facing shell
- `cards.js` — base card array and Chaos modifiers
- `deck-a.js` through `deck-h.js` — complete 200-card source pool
- `categories.js` — category inference/normalization
- `language-polish.js` — plain-language rendering layer
- `after-answers.js` — explicit One Last Thing answers for IDs 1–200
- `game-modes.js` — v6.5 content-mode definitions and curated Sugar Coated IDs
- `app.js` — state, mode/category routing, persistence, Saved, install, wake lock, PWA handling
- `choice-ui.js` — prominent A-vs-B choice presentation
- `history-ui.js` — Real-World Example presentation
- `consistency-ui.js` — legacy filename; presents One Last Thing / THE SHORT ANSWER
- `history-a.js` through `history-d.js` plus `history-reviewed.js` — 200 example mappings
- `sw.js` — offline cache
- `manifest.webmanifest` — PWA installation metadata

## Compatibility anchors

Do not casually change:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- source card IDs: 1–200
- history IDs: 1–200
- direct-answer IDs: 1–200

v6.5 adds `contentMode` and `runContentMode` to persisted state without changing those compatibility anchors. Older state defaults safely to `sugar`.

Visible Settings version:

`v6.5.0`

Service-worker cache:

`plot-twist-v6.5.0`

## Plain-language rule

Player-facing writing should sound like something a normal person would naturally understand when read aloud the first time.

Prefer:

- short direct sentences
- familiar everyday words
- one idea at a time
- conversational questions
- concrete examples
- humour that sounds natural in a group

Avoid jargon, debate-club terminology, legalistic prose, stacked metaphors, and clever wording that hides the actual decision.

## Offline-first rule

Offline use after installation/update is non-negotiable.

The service worker precaches all required runtime assets, including `language-polish.js`, `after-answers.js`, and `game-modes.js`.

Do not clear site/app data during ordinary update testing because doing so destroys Saved cards, settings, category choices, and active state.

## Validation

GitHub Actions runs three complementary gates:

- `validate-content.cjs` — 200-card source contract, 100-card Sugar Coated contract, examples, answers, categories, mode labels, version/cache wiring
- `validate-runtime.cjs` — PWA/state/routing/compatibility/workflow regression checks
- `validate-language.cjs` — conversational-language and sentence-length checks

See `VALIDATION.md` for the detailed release gate.
