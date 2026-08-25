# Plot Twist

Plot Twist is an offline-first social scenario game designed for Android phones, camping trips, game nights, and other situations where a group wants something easy to pick up and talk about.

The basic loop is simple:

`pick a side → say why → reveal the Plot Twist → rethink it → talk it through`

## Current development version

**v6.4.1** is the active patch release candidate.

v6.4.1 keeps the v6.4 plain-language work and fixes the meaning of **One Last Thing**. Instead of asking an unrelated rotating consistency question, that section now gives a short answer to the follow-up question that appeared immediately before the Real-World Example.

Compatibility remains:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- stable internal card IDs: 1–200

The v6.4.1 service-worker cache is:

`plot-twist-v6.4.1`

## What is included

- 200 local scenario cards
- six selectable topics plus **Mix Everything**
- two real, defensible choices before each reveal
- side-by-side A-vs-B choice layout
- Plot Twist reveal
- **The Point**
- a follow-up question
- one researched **Real-World Example** per card
- **One Last Thing**, which gives a short answer to that follow-up after the example
- **Keep Talking** extra questions
- 16 optional **Chaos** prompts
- Saved cards
- persistent game state
- optional Screen Wake Lock
- installable offline PWA
- no framework, backend, runtime API, CDN, remote font, analytics, or build step

## Plain-language rule

Player-facing writing should sound like something a normal person would actually say or understand around a table.

Default style:

- short, direct sentences
- familiar everyday words
- one idea at a time
- conversational questions
- concrete examples before abstract labels
- humour that sounds natural when read aloud

Avoid:

- academic jargon
- legalistic wording unless the joke truly needs it
- debate-club terminology
- stacked metaphors
- long sentences that need rereading
- clever phrasing that hides the actual choice

The practical test is:

> **Would a regular person naturally understand this out loud on the first read?**

If not, rewrite it.

See `PLAIN_LANGUAGE_NOTES.md` for the permanent writing standard.

## v6.4 language architecture

The original authored deck remains in `deck-a.js` through `deck-h.js`.

`language-polish.js` loads after category processing and before `app.js`. It applies the approved plain-language wording before the card is shown to the player. It includes:

- common formal-to-everyday phrase replacements
- targeted rewrites for cards that still read too densely after the general pass
- the same light cleanup for Real-World Example text

This keeps stable IDs and state compatibility intact while allowing the player-facing language to improve without rewriting the data model.

The loading order is intentionally:

`deck/history → categories.js → language-polish.js → app.js → presentation helpers`

`language-polish.js` is also precached by the service worker so the exact same wording is available offline.

## Player-facing UI changes in v6.4

The game shell was simplified too.

Examples:

- `START SELECTED MIX` → **START GAME**
- `RANDOM FROM SELECTED` → **SURPRISE ME**
- `RESUME GAME` → **KEEP PLAYING**
- `REVEAL PLOT TWIST` → **SHOW THE TWIST**
- `Where This Can Go` → **Keep Talking**
- visible `Host Prompts` → **Extra Questions**

How to Play was rewritten around ordinary instructions rather than game-design language.

Chaos prompts were rewritten in the same style.

## One Last Thing in v6.4.1

The original v6.3/v6.4 implementation rotated through eight generic consistency questions based on card ID. That meant the section could ask something unrelated to the question the player had just discussed.

v6.4.1 changes that contract:

1. The card asks its follow-up question.
2. The player discusses it.
3. The Real-World Example gives a concrete case.
4. **One Last Thing** appears afterward as **THE SHORT ANSWER**.
5. That answer is derived from the current card's own Point, with the final meaningful sentence used as the concise takeaway when possible.

The old rotating `TESTS` bank and card-ID modulo assignment are removed.

This keeps the flow coherent:

`question → real example → short answer`

## Card design rules

Making the language easier does **not** mean making the ideas shallow.

Every card still needs:

1. **Two reasonable choices.** A thoughtful adult should be able to defend either side before the reveal.
2. **A real commitment.** No `it depends` escape before choosing.
3. **A meaningful Plot Twist.** The reveal must add information that matters to the decision.
4. **A reason to reconsider.** The reveal should not simply congratulate one side.
5. **A clear Point.** The lesson can be direct without pretending both sides are equally right after the reveal.
6. **A fitting Real-World Example.** The example should match the exact principle and stay within what the source supports.
7. **A coherent close.** One Last Thing should answer the follow-up that came before the example rather than start another unrelated test.

The intended player flow is:

`pick topics → scenario → choose → explain → Plot Twist → reconsider → The Point → question → Real-World Example → One Last Thing: short answer → Keep Talking`

## Main runtime files

- `index.html` — screens and plain player-facing UI copy
- `app.js` — state, navigation, persistence, install, wake lock, service-worker handling
- `cards.js` — shared card array and Chaos prompts
- `deck-a.js` through `deck-h.js` — 200 authored cards
- `categories.js` — category definitions/tag processing
- `language-polish.js` — v6.4 player-facing plain-language layer
- `choice-ui.js` — choice label/reason presentation
- `history-ui.js` — Real-World Example presentation
- `consistency-ui.js` — One Last Thing short-answer presentation
- `history-a.js` through `history-d.js` plus `history-reviewed.js` — 200 Real-World Examples
- `sw.js` — offline cache
- `manifest.webmanifest` — PWA installation metadata

Research ledgers in `HISTORY_SOURCES*.md` are editorial records only and are not runtime dependencies.

## Validation

GitHub Actions runs three complementary gates.

### `validate-content.cjs`

Checks the 200-card/content/product contract, including:

- exactly 200 cards and stable IDs 1–200
- required card structure
- two distinct choices
- substantive Plot Twists
- categories
- 200 Real-World Examples
- hidden terminology/meta-authoring protections
- UI/load/precache contracts
- v6.4.1 version/cache wiring
- One Last Thing is an answer after the example, not an unrelated generic question bank

### `validate-runtime.cjs`

Checks runtime/PWA/state/workflow regressions, including:

- safe service-worker cache cleanup
- same-origin/scope cache isolation
- awaited cache writes
- asset and manifest wiring
- DOM/routing integrity
- state normalization and replay behaviour
- wake lock and Chaos modal handling
- hardened GitHub Actions configuration
- loading and offline caching of `language-polish.js`
- removal of the old rotating One Last Thing question bank
- card-specific short-answer rendering after the Real-World Example

### `validate-language.cjs`

Checks the **final rendered language after the v6.4 polish layer**.

It rejects selected formal/jargon terms and sets readability limits on:

- scenarios
- choices
- prompts
- Plot Twists
- The Point
- follow-up questions
- extra questions
- Real-World Examples

See `VALIDATION.md` for the full validation contract.

## Offline design

Offline-first remains non-negotiable.

The service worker precaches all essential game files, including `language-polish.js` and the updated `consistency-ui.js`. Once the installed PWA has received the new service worker, full gameplay should work with airplane mode enabled and Wi-Fi off.

Do not clear site data as the normal update method because that removes Saved cards, settings, category choices, and active state.

## Android acceptance for v6.4.1

After v6.4.1 is merged and deployed:

1. Open Plot Twist online.
2. Confirm Settings shows **v6.4.1**.
3. Confirm existing Saved cards/settings survive the update.
4. Play several cards from different topics.
5. Confirm the follow-up question appears before the Real-World Example.
6. Confirm **One Last Thing → THE SHORT ANSWER** appears after the example.
7. Check that the short answer actually feels like a response to the question you just discussed rather than a new question.
8. Confirm scenarios, choices, twists, The Point, examples, Chaos, and extra questions still sound natural on the first read.
9. Confirm category, resume, replay, Saved, wake-lock, and Chaos behaviours still work.
10. Fully close the app, enable airplane mode, turn Wi-Fi off, relaunch from the installed icon, and verify full gameplay.

Static validation is required, but the final coherence check is human: **does the example lead naturally into the answer?**
