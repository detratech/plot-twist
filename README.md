# Plot Twist

Plot Twist is an offline-first social scenario game designed for Android phones, camping trips, game nights, and other situations where a group wants something easy to pick up and talk about.

The basic loop is simple:

`pick a side → say why → reveal the Plot Twist → rethink it → talk it through`

## Current development version

**v6.4.0** is the active development version on PR #9.

v6.4 does not change the 200-card deck IDs or saved-data compatibility. It changes how the game **speaks**.

The main goal is that a regular person should understand a card on the first read without needing academic, legal, philosophical, or debate-club vocabulary.

Compatibility remains:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- stable internal card IDs: 1–200

The v6.4 service-worker cache is:

`plot-twist-v6.4.0`

## What is included

- 200 local scenario cards
- six selectable topics plus **Mix Everything**
- two real, defensible choices before each reveal
- side-by-side A-vs-B choice layout
- Plot Twist reveal
- **The Point**
- a follow-up question
- one researched **Real-World Example** per card
- one **One Last Thing** consistency question per card
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

The eight **One Last Thing** questions were also made more conversational, including:

- `SAME RULE?`
- `WHAT WOULD CHANGE YOUR MIND?`
- `WHAT IF YOU HATED THE RESULT?`
- `WHAT IF THEY WERE STRANGERS?`
- `WOULD YOU LET EVERYONE USE IT?`
- `WHAT IF IT WAS YOU?`
- `WHAT IF THE POWER FLIPPED?`
- `SAME RULE SOMEWHERE ELSE?`

Chaos prompts were rewritten in the same style.

## Card design rules

Making the language easier does **not** mean making the ideas shallow.

Every card still needs:

1. **Two reasonable choices.** A thoughtful adult should be able to defend either side before the reveal.
2. **A real commitment.** No `it depends` escape before choosing.
3. **A meaningful Plot Twist.** The reveal must add information that matters to the decision.
4. **A reason to reconsider.** The reveal should not simply congratulate one side.
5. **A clear Point.** The lesson can be direct without pretending both sides are equally right after the reveal.
6. **A fitting Real-World Example.** The example should match the exact principle and stay within what the source supports.
7. **A consistency check.** One Last Thing asks whether the same rule survives a change in people, power, outcome, or setting.

The intended player flow is:

`pick topics → scenario → choose → explain → Plot Twist → reconsider → The Point → question → Real-World Example → One Last Thing → Keep Talking`

## Main runtime files

- `index.html` — screens and plain player-facing UI copy
- `app.js` — state, navigation, persistence, install, wake lock, service-worker handling
- `cards.js` — shared card array and Chaos prompts
- `deck-a.js` through `deck-h.js` — 200 authored cards
- `categories.js` — category definitions/tag processing
- `language-polish.js` — v6.4 player-facing plain-language layer
- `choice-ui.js` — choice label/reason presentation
- `history-ui.js` — Real-World Example presentation
- `consistency-ui.js` — One Last Thing presentation
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
- v6.4 version/cache wiring

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

The first v6.4 run found nine remaining overlong passages. Those nine were rewritten rather than exempted, and the next CI run passed the language gate.

See `VALIDATION.md` for the full validation contract.

## Offline design

Offline-first remains non-negotiable.

The service worker precaches all essential game files, including `language-polish.js`. Once the installed PWA has received the new service worker, full gameplay should work with airplane mode enabled and Wi-Fi off.

Do not clear site data as the normal update method because that removes Saved cards, settings, category choices, and active state.

## Android acceptance for v6.4

After v6.4 is eventually merged and deployed:

1. Open Plot Twist online.
2. Confirm Settings shows **v6.4.0**.
3. Confirm existing Saved cards/settings survive the update.
4. Read several cards aloud from different topics.
5. Confirm scenarios, choices, twists, The Point, examples, One Last Thing, Chaos, and extra questions sound natural and are understandable on the first read.
6. Confirm the simplified home screen and How to Play are obvious without explanation.
7. Confirm the existing category, resume, replay, Saved, wake-lock, and Chaos behaviours still work.
8. Fully close the app.
9. Enable airplane mode and turn Wi-Fi off.
10. Relaunch from the installed icon and verify full gameplay.

Static validation is required, but the final language-quality check is still a human one: **does it sound natural when spoken?**
