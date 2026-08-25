# Plot Twist Validation

Validation contract for the 200-card deck, runtime/PWA, and v6.4 plain-language player experience.

## Current development version

PR #9 targets **v6.4.0**.

Compatibility anchors remain unchanged:

- localStorage key: `plotTwistStateV4`
- deck/state ID: `masterpiece-200-v1`
- stable internal card IDs: 1–200

Service-worker cache:

`plot-twist-v6.4.0`

## Product flow

`pick topics → scenario → choose one of two reasonable sides → explain → Plot Twist → reconsider/switch → The Point → follow-up → Real-World Example → One Last Thing → Keep Talking`

The content still needs depth, but the player-facing wording must now be understandable on the first read by a normal adult without specialist vocabulary.

## Human editorial standard

Every card should pass all of these checks:

1. Two thoughtful adults can reasonably disagree before the reveal.
2. The choices are clear enough to understand immediately.
3. Neither choice is written as the obviously good or stupid side.
4. The Plot Twist adds information that matters.
5. The new information gives a real reason to reconsider, narrow, or switch.
6. The Point says something clear rather than hiding behind vague neutrality.
7. The Real-World Example fits the exact principle and stays within the supporting source.
8. Humour makes the scenario easier or more fun to picture instead of making the wording harder.
9. One Last Thing tests consistency regardless of which side the player chose.
10. A regular person can read the card aloud once and understand what it is asking.

The final test for wording is:

> **Would a regular person naturally say or understand this out loud on the first read?**

If not, rewrite it.

## v6.4 plain-language layer

`language-polish.js` runs after `categories.js` and before `app.js`.

It applies the approved player-facing language to the already-loaded card/history data. The layer contains:

- replacements for formal or academic wording
- everyday alternatives for common dense phrases
- targeted per-card rewrites when a general replacement is not enough
- the same light cleanup for Real-World Example text

The stable card schema and IDs do not change.

Required script order:

`categories.js → language-polish.js → app.js`

The file must also be in the service-worker APP_SHELL.

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
- choice/history/consistency presentation contracts
- plain How to Play statements that both sides are reasonable and changing your mind after the twist is fair
- eight expected conversational One Last Thing prompts
- protected source-worldview terminology absent from player-facing content
- meta-authoring language absent from player-facing content
- visible Settings version `v6.4.0`
- stable `masterpiece-200-v1`
- cache `plot-twist-v6.4.0`

The content gate must not be weakened merely to make a new edit pass.

### 2. `validate-runtime.cjs`

This retains the v6.3.1 deep runtime/PWA regression audit and extends it for v6.4.

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

It rejects selected formal/jargon terms such as:

- epistemic / epistemically
- provenance
- corroboration
- falsifiability
- universalization
- normative
- methodology
- commensurate
- notwithstanding
- proposition
- premise
- causal inference
- empirical
- substantive
- utilize variants

It also enforces practical length limits so player-facing sentences do not sprawl:

- scenario/twist sentence: max 34 words
- conclusion sentence: max 30 words
- prompt/choice/extra-question sentence: max 26 words
- Real-World Example sentence: max 38 words
- main prompt: max 24 words total
- follow-up question: max 28 words total
- choice: max 18 words total

These are guardrails, not a substitute for human judgement. Passing the numbers does not automatically make a sentence natural.

## v6.4 first-pass findings

The first integrated v6.4 run passed the content and runtime gates but failed the new language gate with only nine remaining sentence-length problems:

- card 26 scenario
- card 34 scenario
- card 51 scenario
- card 72 conclusion
- card 107 twist
- card 131 twist
- card 152 conclusion
- card 153 conclusion
- card 200 twist

All nine were rewritten by hand in `language-polish.js` rather than excluded from the rule.

The next exact-head run passed all three validators.

## Conversational UI copy

v6.4 also simplifies the shell itself. Validation requires the new How to Play wording to preserve the product rules while using plain language.

Examples of visible changes:

- **START GAME**
- **SURPRISE ME**
- **KEEP PLAYING**
- **SHOW THE TWIST**
- **KEEP TALKING**
- **Extra Questions**

The eight One Last Thing titles now use ordinary questions rather than abstract labels:

1. `SAME RULE?`
2. `WHAT WOULD CHANGE YOUR MIND?`
3. `WHAT IF YOU HATED THE RESULT?`
4. `WHAT IF THEY WERE STRANGERS?`
5. `WOULD YOU LET EVERYONE USE IT?`
6. `WHAT IF IT WAS YOU?`
7. `WHAT IF THE POWER FLIPPED?`
8. `SAME RULE SOMEWHERE ELSE?`

## Compatibility

v6.4 is a language/UI release, not a state migration.

Do not change these simply because wording changes:

- `plotTwistStateV4`
- `masterpiece-200-v1`
- card IDs 1–200

The service-worker cache is what changes to fetch the new runtime wording.

Do not clear site data as the normal upgrade path because doing so destroys Saved cards, settings, category choices, and active state.

## Android acceptance for v6.4

Automated checks cannot prove that conversation sounds natural in a real group.

After v6.4 is merged/deployed, test on the hosted/installed Android PWA:

1. Settings shows `v6.4.0`.
2. Existing Saved cards/settings survive the update.
3. Home screen controls and How to Play make sense without explanation.
4. Read a sample of cards aloud across all six categories.
5. Scenarios are understandable on the first read.
6. The two choices are immediately clear.
7. Plot Twists do not require rereading.
8. The Point sounds like normal speech rather than an essay.
9. Follow-up and extra questions sound natural in a group conversation.
10. Real-World Examples remain accurate but understandable.
11. One Last Thing prompts feel conversational rather than like a logic exercise.
12. Chaos prompts are playful and obvious.
13. Existing category/resume/replay/Saved/wake-lock behaviours still work.
14. Fully close the app, enable airplane mode, turn Wi-Fi off, and relaunch from the installed icon.
15. Confirm the v6.4 language and full gameplay remain available offline.

A green CI run is required. Final acceptance still includes one human question: **does this sound like a real person talking?**
