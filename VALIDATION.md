# Plot Twist Validation

Validation notes for the 200-card source and the v6.2/v6.3 presentation, history, and consistency layers.

## Current deck structure

- The intended deck contains **200 local scenarios** split across eight 25-card source files: `deck-a.js` through `deck-h.js`.
- `cards.js` initializes the shared deck array and defines 16 reusable Chaos pressure tests.
- Five runtime history files provide exactly 200 Real-World Example mappings: `history-a.js` through `history-d.js`, followed by the audited override layer `history-reviewed.js`.
- `index.html` loads the deck/history data, `categories.js`, `app.js`, `choice-ui.js`, `history-ui.js`, and `consistency-ui.js`.
- `game-v6.2.css` owns the prominent A-vs-B presentation.
- `game-v6.3.css` owns the small `One Last Thing` consistency callout.
- Every authored scenario includes a title, two-paragraph scenario, main prompt, exactly two answer choices, Plot Twist, declarative conclusion, deeper follow-up, and two conversation paths.
- Numeric IDs exist internally for saved-card/state handling, the one-to-one history mapping, and deterministic consistency-prompt assignment, but card IDs and run-position numbers are not displayed in the game UI or Saved list.

## Selectable categories

The home screen exposes six broad topic selectors plus `Mix Everything`:

- Mind & Truth
- Relationships & Family
- Money & Success
- Tech & Modern Life
- Society & Culture
- Life & Purpose

The selector is multi-select. Players can combine categories into one shuffled run. `Mix Everything` restores full-deck behaviour.

Newer cards carry deliberate authored category tags. `categories.js` preserves valid authored tags and infers one or two broad tags for older cards that do not already have them. Filtering uses overlap logic and does not duplicate a card inside a single shuffled run.

Saved-card playback is independent of the current topic filter.

## Current reveal structure

The card rhythm is:

`pick topics → funny/quirky dilemma → two prominent A-vs-B choices → commitment → discussion → Plot Twist introduces new information → reconsider/switch if warranted → The Point → deeper question → Real-World Example → One Last Thing → Where This Can Go`

`The Point` is intentionally declarative. The deck is not designed around a forced middle-ground conclusion, but it is also not allowed to cheat by making the intended principle obvious in the pre-reveal buttons.

The Real-World Example is deliberately placed after the post-Point question so players reason from the fictional dilemma before being shown the concrete historical/real-world analogy.

`One Last Thing` is deliberately placed after the Real-World Example. It does not tell the player which answer is correct. It asks whether the reasoning standard they just used survives a change in roles, outcome, power, self-interest, or life domain.

## v6.3 consistency layer

`consistency-ui.js` defines eight universal pressure tests:

1. `SAME RULE?` — role reversal
2. `WHAT WOULD CHANGE YOUR MIND?` — falsifiability / evidence threshold
3. `OUTCOME TEST` — keeping a principle when the result is personally disliked
4. `STRANGER TEST` — judging conduct without identity attachment
5. `EVERYONE GETS IT` — universal application
6. `YOUR TURN` — self-application
7. `POWER FLIP` — power reversal
8. `CROSSOVER` — cross-domain transfer across family, money, work, and public life

The prompt is selected deterministically with `(current.id - 1) % TESTS.length`. Stable card IDs therefore yield stable prompt assignments without adding a new persistence field or changing the deck/state identifier.

The consistency layer is intentionally distinct from **Chaos**. Chaos remains an optional random pressure-test mechanic. `One Last Thing` is part of normal card resolution so a basic run still tests consistency even if players never tap Chaos.

## Editorial audit standard

Every scenario is reviewed against the following questions:

1. **Can two smart adults reasonably disagree before the reveal?** If one side sounds unserious, the card fails.
2. **Are the two choices clear?** Each button must state a real action, priority, rule, or judgement rather than a vague mood.
3. **Does either choice secretly contain the conclusion?** Labels that pre-label one side as virtuous or foolish are not acceptable.
4. **Does the Plot Twist add information the player did not already have?** A consequence already stated in the setup is not a twist.
5. **Is the new information relevant to the exact choice?** It must change the trade-off rather than merely add trivia.
6. **Could the reveal credibly make at least one thoughtful player switch, narrow, or substantially revise the reason for their answer?** A reveal that only congratulates one side is weak.
7. **Does the conclusion still land the intended principle?** The card may become more nuanced after the twist, but `The Point` should not retreat into empty “both sides are valid” language.
8. **Is the card enjoyable aloud?** The setup/question should have adult game-night energy rather than classroom energy.
9. **Is the humour aimed at the situation rather than making one answer-holder the joke?** The funny line must not rig the vote.
10. **Does the card stay neutral about the source material?** The runtime uses ordinary analogies and principles without exposing protected source-worldview terminology or authoring instructions.
11. **Does the Real-World Example match the exact principle?** Fame is not enough; the example should clarify this card rather than merely sound historically interesting.
12. **Does the example text stay inside what the source supports?** Disputed anecdotes are narrowed or replaced instead of repeated because they are memorable.
13. **Does the consistency question pressure-test reasoning rather than announce a preferred ideology or answer?** It should work regardless of which side the player initially defended.

## Historical-example research audit

The runtime history data is intentionally separate from the research ledger.

- `history-a.js` through `history-d.js` contain the draft one-to-one mappings.
- `history-reviewed.js` is loaded afterward and replaces mappings that were repeated, disputed, weakly sourced, or a poorer analogy than a researched alternative.
- `HISTORY_SOURCES.md`, `HISTORY_SOURCES_51_100.md`, `HISTORY_SOURCES_101_150.md`, and `HISTORY_SOURCES_151_200.md` are editorial records only. They are not loaded by the PWA.
- Together the four ledger files contain one research entry for every internal card ID 1–200.
- The source preference is primary/official/academic/archival/court/museum/strong first-party material where practical.
- A historical example illustrates a principle. It is not presented as proof that every modern case has the same causes or moral structure.

## Automated source audit

`validate-content.cjs` is the executable source audit. The GitHub Actions workflow `.github/workflows/validate.yml` first runs `node --check` on all runtime JavaScript, including `consistency-ui.js`, and then runs the validator.

The validator currently requires:

1. exactly 200 cards load through the same eight deck files used by the app
2. internal IDs 1–200 are complete and unique
3. normalized titles are unique
4. exact normalized scenario bodies are unique
5. each card has every required field
6. each scenario has exactly two non-empty paragraphs
7. each card has exactly two non-empty, distinct answer choices
8. no answer choice contains an `it depends` escape
9. each answer choice is substantive enough to state a side
10. obviously insulting/loaded choice labels are rejected by a conservative wording lint
11. main prompts are question-form
12. Plot Twists are present and contain substantive text
13. a Plot Twist cannot be an exact repeat of the scenario
14. conclusions are present
15. deeper prompts are question-form
16. each card has exactly two non-empty conversation paths
17. each card resolves to one or two valid category IDs
18. all six selectable categories exist and have meaningful deck coverage
19. exactly 200 historical/real-world examples load after the audited override layer
20. every historical example has a substantive title and at least 20 words of body text
21. all eight deck files and all five history files are loaded by `index.html`
22. all deck/history assets, `game-v6.2.css`, `game-v6.3.css`, `choice-ui.js`, `history-ui.js`, and `consistency-ui.js` are precached by `sw.js`
23. `index.html` explicitly states that both answer choices are intended to be defensible before the reveal
24. `index.html` explicitly allows switching after the Plot Twist adds new information
25. `index.html` explains the Real-World Example and `One Last Thing` steps
26. `history-ui.js` labels the block `REAL-WORLD EXAMPLE` and inserts it immediately after the post-Point question
27. `choice-ui.js` splits authored choice text into a prominent decision label and secondary reason
28. `game-v6.2.css` locks the choices to two side-by-side columns, provides the center divider, and supplies the `VS` marker
29. `consistency-ui.js` defines exactly eight unique pressure-test titles
30. all eight intended pressure-test types are present
31. the consistency layer is labelled `ONE LAST THING`
32. the consistency layer is inserted after the Real-World Example
33. prompt assignment is deterministic from stable card ID
34. `game-v6.3.css` contains the consistency callout styling
35. Settings visibly reports app version `v6.3.0`
36. `app.js` keeps `masterpiece-200-v1` for compatible local state
37. `sw.js` uses `plot-twist-v6.3.0`
38. explicit source-worldview terminology intentionally excluded from the runtime is absent from card text, historical examples, the consistency layer, and the player-facing shell
39. authoring/meta-instruction language is also rejected from card text, historical examples, the consistency layer, and the runtime shell

Automated structural validation does **not** prove that a joke is funny, that a dilemma is genuinely balanced, that a historical analogy is the strongest possible editorial choice, or that a consistency prompt is perfectly matched to every card. Those remain human checks. The automation exists to prevent structural regressions around that editorial work.

## State behaviour

`app.js` retains the `plotTwistStateV4` local-storage key so compatible settings and Saved IDs are preserved.

The deck/state identifier remains `masterpiece-200-v1`. v6.3 adds a deterministic presentation layer without changing internal card IDs or persisted state structure, so there is no reason to discard compatible Saved IDs, selected categories, settings, or the current shuffled order.

If no valid category selection exists, the app falls back to `Mix Everything`. Selecting a specific category removes `Mix Everything`; selecting the final active category again returns to `Mix Everything` rather than leaving an empty selection.

## Offline/PWA source check

- Runtime remains vanilla HTML/CSS/JavaScript with no external runtime API, CDN, remote font, analytics, authentication, or server-side feature.
- `sw.js` uses cache name `plot-twist-v6.3.0`.
- The service-worker app shell includes all eight deck files, all five runtime history files, category logic/styles, v6.2 presentation assets, v6.3 consistency assets, and existing app assets.
- The research-ledger Markdown files are not runtime dependencies and do not need to be available offline to players.
- The manifest remains configured for standalone PWA installation.

## Validation limits

The automated audit and repository checks are source/static validation. A real Android/Chrome installation is not physically certified by these checks.

Before treating v6.3 as final, verify on the hosted Android PWA:

1. `Mix Everything` can draw from the complete 200-card deck.
2. A single category draws only cards tagged to that category.
3. Several selected categories combine into one shuffled run without duplicate cards.
4. `Random From Selected` respects the filter.
5. Saved-card playback works independently of the filter.
6. Category selection survives closing and reopening the app.
7. Existing Saved cards/settings survive the v6.3 update from v6.2.
8. Reveal order is `Plot Twist → The Point → post-Point question → Real-World Example → One Last Thing`.
9. The two A-vs-B choice panels remain readable and tappable on a narrow phone screen.
10. The center divider and `VS` marker remain legible without obscuring choice text.
11. Long historical examples plus `One Last Thing` remain comfortable to read without making the card feel bloated.
12. Several different cards show different consistency prompts, and a given card receives the same prompt after close/reopen.
13. `SAME RULE?`, `WHAT WOULD CHANGE YOUR MIND?`, `OUTCOME TEST`, and `CROSSOVER` all feel natural in real group play.
14. `Chaos`, `Where This Can Go`, Next, Random, Saved, Settings, and wake lock still behave normally.
15. Settings visibly shows `v6.3.0`.
16. The airplane-mode test succeeds after service worker `plot-twist-v6.3.0` activates.

A successful GitHub Actions run proves the static integration gate passed. It does not replace the final on-device visual and airplane-mode smoke test.
