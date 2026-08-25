# Plot Twist Validation

Validation contract for the 200-card deck, runtime/PWA, and plain-language player experience.

## Current development version

The current patch release candidate is **v6.4.1**.

Compatibility anchors remain unchanged:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- stable internal card IDs: 1–200

Service-worker cache:

`plot-twist-v6.4.1`

## Product flow

`pick topics → scenario → choose one of two reasonable sides → explain → Plot Twist → reconsider/switch → The Point → follow-up question → Real-World Example → One Last Thing: short answer → Keep Talking`

The important v6.4.1 correction is that **One Last Thing no longer asks another generic question**. It now closes the follow-up that appeared immediately before the Real-World Example.

## Human editorial standard

Every card should pass all of these checks:

1. Two thoughtful adults can reasonably disagree before the reveal.
2. The choices are clear enough to understand immediately.
3. Neither choice is written as the obviously good or stupid side.
4. The Plot Twist adds information that matters.
5. The new information gives a real reason to reconsider, narrow, or switch.
6. The Point says something clear rather than hiding behind vague neutrality.
7. The follow-up question gives the group something worth discussing.
8. The Real-World Example fits the exact principle and stays within the supporting source.
9. One Last Thing gives a concise answer/takeaway that actually responds to the preceding follow-up.
10. Humour makes the scenario easier or more fun to picture instead of making the wording harder.
11. A regular person can read the card aloud once and understand what it is asking.

The final test for wording is:

> **Would a regular person naturally say or understand this out loud on the first read?**

If not, rewrite it.

## v6.4 plain-language layer

`language-polish.js` runs after `categories.js` and before `app.js`.

It applies approved player-facing language to the loaded card/history data. The layer contains:

- replacements for formal or academic wording
- everyday alternatives for common dense phrases
- targeted per-card rewrites when a general replacement is not enough
- the same light cleanup for Real-World Example text

The stable card schema and IDs do not change.

Required script order:

`categories.js → language-polish.js → app.js`

The file must also be in the service-worker APP_SHELL.

## v6.4.1 One Last Thing contract

The old v6.3/v6.4 implementation contained eight generic consistency prompts and chose one using:

`(current.id - 1) % TESTS.length`

That behaviour is intentionally removed.

The required v6.4.1 behaviour is:

1. `afterPrompt` asks the follow-up question.
2. `history-ui.js` inserts the Real-World Example immediately after that question.
3. `consistency-ui.js` inserts One Last Thing after the Real-World Example.
4. The section is labelled `ONE LAST THING` and headed `THE SHORT ANSWER`.
5. The answer comes from the current card's own conclusion/Point rather than from an unrelated question bank.
6. When the Point contains multiple sentences, the final meaningful sentence is preferred as the concise takeaway; if that sentence is too short, the final two sentences are used.

The important product relationship is:

`follow-up question → example → answer`

Static checks can verify wiring and source relationship. Human Android acceptance must still verify that the resulting answer actually feels responsive to the question for real cards.

## Three validation gates

GitHub Actions runs JavaScript syntax checks followed by three executable validators.

### 1. `validate-content.cjs`

This remains the product/content structure gate.

It checks, among other things:

- exactly 200 cards
- complete unique IDs 1–200
- required fields
- exactly two scenario paragraphs
- exactly two non-empty, distinct choices
- no pre-reveal `it depends` escape
- conservative loaded-choice wording checks
- substantive Plot Twist text
- question-form main/follow-up prompts
- two extra conversation prompts
- one or two valid categories per card
- meaningful category coverage
- exactly 200 Real-World Examples
- required runtime files loaded by `index.html`
- required runtime files precached by `sw.js`
- `language-polish.js` loaded after categories and before app rendering
- choice/history/One Last Thing presentation contracts
- plain How to Play statements that both sides are reasonable and changing your mind after the twist is fair
- One Last Thing is presented as a short answer after the example
- the obsolete `TESTS` bank and card-ID modulo selector are absent
- protected source-worldview terminology absent from player-facing content
- meta-authoring language absent from player-facing content
- visible Settings version `v6.4.1`
- stable `masterpiece-200-v1`
- cache `plot-twist-v6.4.1`

The content gate must not be weakened merely to make a new edit pass.

### 2. `validate-runtime.cjs`

This retains the v6.3.1 deep runtime/PWA regression audit and the v6.4 language-layer checks, while adding the v6.4.1 One Last Thing regression checks.

It checks:

#### Service worker

- cache cleanup is restricted to `plot-twist-*`
- unrelated origin caches cannot be deleted
- runtime reads/writes use the current Plot Twist cache
- requests are restricted to same origin and service-worker scope
- runtime cache writes are awaited
- offline navigation/error fallbacks are present
- APP_SHELL has no duplicate/missing files

#### Runtime assets and installation

- local scripts/styles referenced by HTML exist
- local runtime assets are precached
- no external HTTP runtime dependency is introduced
- `language-polish.js` is loaded and precached
- language layer runs after category inference and before rendering
- manifest JSON, start URL, scope, icons, and shortcuts remain valid

#### DOM/routing/state

- IDs are unique
- JavaScript DOM targets exist
- ARIA references exist
- screen/action/category routes are valid
- persisted IDs/settings are normalized
- localStorage failures are guarded
- completed runs do not reappear as resumable
- active-run category context remains stable
- PLAY AGAIN remains mode-aware
- Saved runs replay Saved mode
- wake-lock duplicate requests remain guarded
- Chaos keyboard/focus handling remains present
- service-worker update/offline-active-worker lifecycle stays intact

#### One Last Thing

- label remains `ONE LAST THING`
- heading is `THE SHORT ANSWER`
- `shortAnswer(card)` exists
- the answer is derived from `card.conclusion`
- section is inserted after the Real-World Example
- old `TESTS` bank is absent
- old modulo-by-card-ID selector is absent
- How to Play explicitly says this step answers the preceding question

#### Module ownership

- `choice-ui.js` remains the sole choice formatting owner
- `history-ui.js` remains focused on the Real-World Example

#### Workflow hardening

- GitHub Actions are pinned to immutable SHAs
- checkout credentials are not persisted
- manual workflow dispatch exists
- superseded runs cancel
- timeout exists
- runtime and language validators are syntax-checked and executed
- Dependabot watches GitHub Actions

### 3. `validate-language.cjs`

This is the v6.4 readability gate.

Unlike the source-structure validator, it loads the deck/history and then runs `language-polish.js`, so it checks the **actual wording players receive**.

It rejects selected formal/jargon terms and enforces practical length limits:

- scenario/twist sentence: max 34 words
- conclusion sentence: max 30 words
- prompt/choice/extra-question sentence: max 26 words
- Real-World Example sentence: max 38 words
- main prompt: max 24 words total
- follow-up question: max 28 words total
- choice: max 18 words total

Because One Last Thing is derived from the already-validated conclusion, its language inherits the same plain-language constraints.

These are guardrails, not a substitute for human judgement. Passing the numbers does not automatically make a sentence natural or make an answer perfectly responsive.

## Compatibility

v6.4.1 is a UI/flow patch, not a state migration.

Do not change these simply because wording or presentation changes:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- card IDs 1–200

The service-worker cache changes so installed PWAs can receive the corrected runtime assets.

Do not clear site data as the normal upgrade path because doing so destroys Saved cards, settings, category choices, and active state.

## Android acceptance for v6.4.1

Automated checks cannot prove that the new close actually feels coherent in a real conversation.

After v6.4.1 is merged/deployed, test on the hosted/installed Android PWA:

1. Settings shows `v6.4.1`.
2. Existing Saved cards/settings survive the update.
3. Play cards from all six categories.
4. The follow-up question appears before the Real-World Example.
5. One Last Thing appears after the example.
6. It says `THE SHORT ANSWER`, not another generic test question.
7. The answer feels like a real response to the follow-up question that was just asked.
8. The answer does not simply feel like a confusing new topic.
9. Scenarios, choices, Plot Twists, The Point, examples, Chaos, and extra questions remain understandable on the first read.
10. Existing category/resume/replay/Saved/wake-lock behaviours still work.
11. Fully close the app, enable airplane mode, turn Wi-Fi off, and relaunch from the installed icon.
12. Confirm v6.4.1 wording and full gameplay remain available offline.

A green CI run is required. Final acceptance still includes one human question: **does the example naturally lead into the answer?**
