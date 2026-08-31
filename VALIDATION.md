# Plot Twist Validation

Validation contract for the 200-card deck, runtime/PWA, and conversational player experience.

## Current development version

PR #11 targets **v6.4.2**.

Compatibility anchors remain unchanged:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- stable card IDs: 1–200

Service-worker cache:

`plot-twist-v6.4.2`

## Product flow

`scenario → choose one of two reasonable sides → explain → Plot Twist → reconsider → The Point → follow-up question → Real-World Example → One Last Thing / THE SHORT ANSWER → Keep Talking`

The final three steps are a strict relationship:

`follow-up question → example → direct answer to that same question`

One Last Thing must not:

- ask another unrelated question
- rotate generic prompts by card ID
- recycle the final sentence of The Point as a fallback
- silently continue if a card-specific answer is missing

## Direct-answer contract

`after-answers.js` defines `AFTER_ANSWERS` with one answer for every card ID 1–200.

Each answer must:

- map to exactly one existing card ID
- directly address that card's `afterPrompt`
- be a non-empty string
- be declarative rather than another question
- be concise enough for a phone screen and spoken game
- use plain conversational language
- be unique rather than copied across cards
- avoid protected runtime/meta terminology

`consistency-ui.js` must use:

`AFTER_ANSWERS[current.id]`

There is no runtime fallback to `card.conclusion`. Missing data must be caught by CI.

## Human editorial standard

Every card should pass all of these checks:

1. Two thoughtful adults can reasonably disagree before the reveal.
2. Both choices are immediately understandable.
3. Neither choice is written as the obviously good or stupid side.
4. The Plot Twist adds information that matters.
5. The new information gives a real reason to reconsider, narrow, or switch.
6. The Point states a clear principle.
7. The follow-up question is natural and worth discussing.
8. The Real-World Example fits the exact principle and stays within its supporting source.
9. One Last Thing directly answers the follow-up instead of merely restating the Point.
10. The whole card can be read aloud once and understood by a normal adult.

Plain-language test:

> **Would a regular person naturally say or understand this out loud on the first read?**

If not, rewrite it.

## Three validation gates

GitHub Actions syntax-checks the runtime/validator JavaScript and then runs three executable gates.

### 1. `validate-content.cjs`

Checks the product/content contract, including:

- exactly 200 cards
- complete unique card IDs 1–200
- required card schema
- exactly two scenario paragraphs
- exactly two distinct pre-reveal choices
- no pre-reveal `it depends` escape
- substantive Plot Twists
- valid categories and category coverage
- exactly 200 substantive Real-World Examples
- exactly 200 direct answers
- complete direct-answer IDs 1–200
- each answer is non-empty and declarative
- each answer is at least 7 words and no more than 45 words
- no duplicate direct answers
- protected runtime terms absent from cards, examples, and direct answers
- authoring/meta leaks absent from player-facing content
- required assets loaded by `index.html`
- required assets precached by `sw.js`
- required data order: `categories.js → language-polish.js → after-answers.js → app.js`
- Real-World Example placement after the follow-up
- One Last Thing placement after the example
- explicit answer-map selection by current card ID
- absence of `shortAnswer(card)` conclusion fallback
- absence of the old generic `TESTS` bank/modulo selector
- side-by-side choice presentation contract
- plain How to Play statements
- visible Settings version `v6.4.2`
- stable `masterpiece-200-v1`
- cache `plot-twist-v6.4.2`

Do not weaken this validator just to make a change pass.

### 2. `validate-runtime.cjs`

Protects runtime/PWA/state/workflow behaviour.

#### Service worker

- cleanup is restricted to `plot-twist-*`
- unrelated origin caches cannot be deleted
- runtime reads/writes use the current Plot Twist cache
- requests are restricted to same origin and service-worker scope
- runtime cache writes are awaited
- offline navigation/error fallback remains present
- APP_SHELL has no duplicate or missing files

#### Runtime assets and installation

- local HTML scripts/styles exist
- local runtime assets are precached
- no external HTTP runtime dependency is introduced
- `language-polish.js` loads and is precached
- `after-answers.js` loads and is precached
- direct-answer map loads before `app.js`
- manifest JSON/start URL/scope/icons remain valid

#### State and interaction

- DOM IDs and routes remain valid
- persisted card IDs/settings are normalized
- localStorage failures remain guarded
- completed runs do not falsely resume from the final card
- active `runCategories` stays stable
- PLAY AGAIN remains mode-aware
- Saved runs replay Saved mode
- duplicate wake-lock acquisition remains guarded
- Chaos Escape/focus handling remains present
- service-worker update/offline lifecycle remains intact

#### One Last Thing

- label is `ONE LAST THING`
- heading is `THE SHORT ANSWER`
- explicit `AFTER_ANSWERS` map is read
- answer is selected by `current.id`
- section remains after the Real-World Example
- no conclusion-derived `shortAnswer(card)` helper exists
- no `card.conclusion` fallback exists in `consistency-ui.js`
- no old rotating `TESTS` bank exists
- How to Play explains the direct-answer step

#### Workflow hardening

- GitHub Actions are pinned to immutable SHAs
- checkout credentials are not persisted
- manual workflow dispatch exists
- superseded runs cancel
- timeout exists
- runtime and language validators run
- `after-answers.js` is syntax-checked
- Dependabot watches GitHub Actions

### 3. `validate-language.cjs`

Loads the deck/history, runs `language-polish.js`, loads `after-answers.js`, and checks the actual wording players receive.

It rejects selected formal/jargon terms and enforces readability limits.

Existing limits include:

- scenario/twist sentence: max 34 words
- conclusion sentence: max 30 words
- prompt/choice/extra-question sentence: max 26 words
- Real-World Example sentence: max 38 words
- main prompt: max 24 words total
- follow-up question: max 28 words total
- choice: max 18 words total

Direct-answer limits:

- max 34 words in any answer sentence
- max 40 words total

Passing the numbers does not prove the answer actually answers the question. Semantic fit still needs human testing.

## v6.4.2 CI history

### Initial integrated run #67

Head:

`430a38f991c0990a2a476f31a2fbbd162f1ebc04`

Run ID:

`33343303973`

Results:

- JavaScript syntax: pass
- content validator: pass
- runtime validator: pass
- language validator: fail

The language validator found exactly one problem among the 200 new answers:

- direct answer 111 used the jargon/formal word `premise`

The answer was rewritten to use `bad assumption` instead. The validator was not weakened.

A later documentation commit changes the head again, so run #67 must **not** be treated as final merge CI even after the answer is corrected. Final exact-head CI is required.

## Compatibility

v6.4.2 is a content/runtime-asset patch, not a state migration.

Do not change these merely because the answers changed:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- card IDs 1–200

Do not clear site data as the normal upgrade path.

## Android acceptance for v6.4.2

After authorization, merge, and hosted deployment:

1. Settings shows `v6.4.2`.
2. Existing Saved cards/settings survive the update.
3. Sample cards from all six categories.
4. Read each sampled follow-up question aloud.
5. Read its Real-World Example.
6. Read One Last Thing.
7. Confirm the answer responds directly to the exact follow-up question.
8. Confirm it is more useful than simply repeating The Point.
9. Confirm the wording remains casual and understandable on first read.
10. Confirm category filtering, Random, Saved, Resume, PLAY AGAIN, Settings, wake lock, and Chaos still work.
11. Fully close the installed PWA.
12. Enable airplane mode and turn Wi-Fi off.
13. Relaunch from the installed icon.
14. Verify v6.4.2 and all direct answers work offline.
15. Close/reopen again offline and verify state restoration.

Do not clear site data during ordinary acceptance testing.

Final human question:

**Does One Last Thing actually answer the question above the Real-World Example?**
