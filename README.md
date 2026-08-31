# Plot Twist

Plot Twist is an offline-first social scenario game for Android phones, camping trips, game nights, travel, and casual group discussion.

The basic loop is:

`pick a side → say why → reveal the Plot Twist → rethink it → discuss → see the real example → get the direct answer`

## Current development version

**v6.4.2** is the active release candidate on PR #11.

This patch fixes the final remaining problem with **One Last Thing**. v6.4.1 stopped asking an unrelated generic question, but it still generated the short answer by recycling the final sentence of **The Point**. That could leave the actual follow-up question unanswered.

v6.4.2 gives every card its own explicitly written direct answer.

Compatibility remains unchanged:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- stable card IDs: 1–200

Service-worker cache:

`plot-twist-v6.4.2`

## Intended player flow

`scenario → choose one of two reasonable sides → explain → Plot Twist → reconsider → The Point → follow-up question → Real-World Example → One Last Thing / THE SHORT ANSWER → Keep Talking`

The relationship at the end is important:

1. The card asks a specific follow-up question.
2. The group considers it.
3. The Real-World Example gives a concrete case.
4. **One Last Thing** directly answers that same question.

It must not introduce another unrelated question and it must not simply repeat The Point.

## Direct-answer architecture

`after-answers.js` contains exactly 200 answers keyed by the stable card IDs 1–200.

Example, card 37 asks:

> What makes a hard truth more useful without making it less true?

Its direct answer is:

> Say the truth accurately, at the right time, for a real reason, and in a way that helps the person act on it instead of humiliating them.

`consistency-ui.js` uses:

`AFTER_ANSWERS[current.id]`

There is intentionally **no fallback** to `card.conclusion`. If an answer is missing, the section is hidden and CI fails because the answer map must be complete.

The old systems are retired:

- no eight-question `TESTS` bank
- no card-ID modulo selection
- no `shortAnswer(card)` conclusion-sentence heuristic

## What is included

- 200 local scenario cards
- six selectable topics plus **Mix Everything**
- two defensible pre-reveal choices
- side-by-side A-vs-B layout
- Plot Twist reveal
- The Point
- one follow-up question per card
- one researched Real-World Example per card
- one explicit direct answer per card
- Keep Talking extra questions
- 16 optional Chaos prompts
- Saved cards
- persistent state
- optional Screen Wake Lock
- installable offline PWA
- no framework, backend, runtime API, CDN, remote font, analytics, or build step

## Plain-language rule

Player-facing writing should sound like something a normal person would understand when read aloud once.

Prefer:

- short, direct sentences
- familiar everyday words
- one idea at a time
- concrete wording
- conversational questions
- natural humour

Avoid:

- academic jargon
- unnecessary legalistic language
- debate-club terminology
- stacked metaphors
- sentences that require rereading
- clever wording that hides the actual point

The practical test is:

> **Would a regular person naturally understand this out loud on the first read?**

See `PLAIN_LANGUAGE_NOTES.md`.

## Main runtime files

- `index.html` — screens and player-facing shell
- `app.js` — navigation, state, persistence, install, wake lock, service-worker handling
- `cards.js` — shared card array and Chaos prompts
- `deck-a.js` through `deck-h.js` — 200 authored cards
- `categories.js` — category definitions/tag processing
- `language-polish.js` — final plain-language layer for cards/history
- `after-answers.js` — 200 explicit direct answers to the 200 follow-up questions
- `choice-ui.js` — choice label/reason presentation
- `history-ui.js` — Real-World Example presentation
- `consistency-ui.js` — One Last Thing direct-answer presentation; filename retained for compatibility/history
- `history-a.js` through `history-d.js` plus `history-reviewed.js` — 200 Real-World Examples
- `sw.js` — offline cache
- `manifest.webmanifest` — PWA metadata

Required data/loading order includes:

`deck/history → categories.js → language-polish.js → after-answers.js → app.js → presentation helpers`

`after-answers.js` is precached for offline use.

## Card design rules

Every card still needs:

1. **Two reasonable choices.** A thoughtful adult can defend either side before the reveal.
2. **A real commitment.** No `it depends` escape before choosing.
3. **A meaningful Plot Twist.** The reveal adds information that matters.
4. **A reason to reconsider.** The reveal does not merely congratulate one side.
5. **A clear Point.** The lesson can be direct without forced false balance.
6. **A fitting Real-World Example.** The example stays within what its source supports.
7. **A direct close.** One Last Thing explicitly answers the follow-up that came before the example.

Changing sides after the reveal is allowed.

## Validation

GitHub Actions runs syntax checks and three complementary validators.

### `validate-content.cjs`

Checks the 200-card/content contract and now also requires:

- exactly 200 direct answers
- IDs 1–200 complete
- every answer is non-empty, declarative, unique, and concise
- answers do not contain protected player-facing/meta terminology
- `after-answers.js` is loaded and precached
- One Last Thing reads the explicit answer map
- no conclusion-derived fallback
- no old generic question bank
- v6.4.2 version/cache wiring

### `validate-runtime.cjs`

Protects PWA/state/workflow behaviour, including:

- safe Plot-Twist-only cache cleanup
- same-origin/scope cache isolation
- awaited cache writes
- runtime/manifest asset wiring
- persisted-state normalization
- completed-run/replay behaviour
- wake lock and Chaos modal handling
- direct-answer loading, offline precaching, and rendering
- rejection of the retired conclusion fallback
- hardened GitHub Actions configuration

### `validate-language.cjs`

Checks the final conversational wording of cards, examples, and all 200 direct answers. It rejects selected jargon and enforces practical sentence-length limits.

The first v6.4.2 integrated CI run found one issue only: direct answer 111 used the word `premise`. The answer was rewritten in normal speech rather than weakening the rule.

See `VALIDATION.md` for the full contract.

## Offline design

Offline-first is non-negotiable.

`sw.js` precaches all essential runtime files, including:

- `language-polish.js`
- `after-answers.js`
- `consistency-ui.js`

Do not clear site data during a normal update because that destroys Saved cards, settings, category choices, and active state.

## Android acceptance for v6.4.2

After the PR is authorized, merged, and deployed:

1. Open Plot Twist online.
2. Confirm Settings shows **v6.4.2**.
3. Confirm existing Saved cards/settings survive the update.
4. Play cards across all six topics.
5. For each sampled card, read the follow-up question.
6. Read the Real-World Example.
7. Confirm **One Last Thing → THE SHORT ANSWER** directly answers that exact question.
8. Confirm it does not merely repeat The Point.
9. Confirm scenarios, choices, twists, Point, examples, answers, Chaos, and extra questions remain easy to understand aloud.
10. Confirm category, Random, Saved, Resume, PLAY AGAIN, Settings, wake-lock, and Chaos behaviour still works.
11. Fully close the installed PWA.
12. Enable airplane mode and turn Wi-Fi off.
13. Relaunch from the installed icon and verify full gameplay and direct answers remain available offline.

The final qualitative test is simple:

**If someone reads the question, does One Last Thing actually answer it?**
