# Plot Twist Validation

Validation notes for the 200-card source.

## Current deck structure

- The intended deck contains **200 local scenarios** split across eight 25-card source files: `deck-a.js` through `deck-h.js`.
- `cards.js` initializes the shared deck array and defines 16 reusable Chaos pressure tests.
- `index.html` loads `cards.js`, all eight deck files, `categories.js`, and then `app.js`.
- Every authored scenario includes a title, two-paragraph scenario, main prompt, exactly two answer choices, Plot Twist, declarative conclusion, deeper follow-up, and two conversation paths.
- Numeric IDs exist internally for saved-card and state handling, but card IDs and run-position numbers are not displayed in the game UI or Saved list.

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

`pick topics → funny/quirky dilemma → two clear answer bubbles → commitment → discussion → Plot Twist introduces new information → reconsider/switch if warranted → The Point → deeper question → Where This Can Go`

`The Point` is intentionally declarative. The deck is not designed around a forced middle-ground conclusion, but it is also not allowed to cheat by making the correct principle obvious in the pre-reveal buttons.

## Editorial audit standard

Every scenario in the dilemma rewrite is reviewed against the following questions:

1. **Can two smart adults reasonably disagree before the reveal?** If one side sounds unserious, the card fails.
2. **Are the two choices clear?** Each button must state a real action, priority, rule, or judgement rather than a vague mood.
3. **Does either choice secretly contain the conclusion?** Labels such as “use the obviously correct evidence” versus a caricature are not acceptable.
4. **Does the Plot Twist add information the player did not already have?** A consequence already stated in the setup is not a twist.
5. **Is the new information relevant to the exact choice?** It must change the trade-off rather than merely add trivia.
6. **Could the reveal credibly make at least one thoughtful player switch, narrow, or substantially revise the reason for their answer?** A reveal that simply congratulates one side is weak.
7. **Does the conclusion still land the intended principle?** The card may become more nuanced after the twist, but `The Point` should not retreat into empty “both sides are valid” language.
8. **Is the card enjoyable aloud?** The setup/question should have adult game-night energy: dry, dark, awkward, absurd, relatable, witty, or selectively pop-culture-flavoured rather than classroom energy.
9. **Is the humour aimed at the situation rather than making one answer-holder the joke?** The funny line must not rig the vote.
10. **Does the card stay neutral about the source material?** The runtime uses ordinary analogies and principles without exposing the source-worldview terminology or authoring instructions behind them.

The 200-card rewrite was performed across all eight 25-card files using this standard. The final block, `deck-h.js`, was rebuilt after the earlier audit specifically because several old cards still behaved like obvious-answer quizzes.

## Automated source audit

`validate-content.cjs` is the executable source audit. The GitHub Actions workflow `.github/workflows/validate.yml` first runs `node --check` on the runtime JavaScript and then runs the validator.

The validator requires:

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
16. each card has exactly two non-empty conversation paths, which may be questions, prompts, or topic directions
17. each card resolves to one or two valid category IDs
18. all six selectable categories exist and have meaningful deck coverage
19. all eight deck files are loaded by `index.html`
20. all eight deck files are precached by `sw.js`
21. `index.html` explicitly states that both answer choices are intended to be defensible before the reveal
22. `index.html` explicitly allows switching after the Plot Twist adds new information
23. `app.js` keeps `masterpiece-200-v1` for compatible local state
24. `sw.js` uses `plot-twist-v6.1.0` so installed copies receive the rewritten content
25. explicit source-worldview terminology intentionally excluded from the runtime is absent from card text and the user-facing runtime shell

Automated structural validation does **not** prove that a joke is funny, that a dilemma is genuinely balanced, or that a twist will persuade a human to switch. Those remain editorial checks. The automation exists to prevent structural regressions around that editorial work, not to fake certainty about it.

## State behaviour

`app.js` retains the `plotTwistStateV4` local-storage key so compatible settings and Saved IDs are preserved.

The deck/state identifier remains `masterpiece-200-v1`. The dilemma rewrite changes scenario wording and reveal logic without changing internal card IDs, so there is no reason to discard compatible Saved IDs, selected categories, settings, or the current shuffled order merely to force a new version number.

If no valid category selection exists, the app falls back to `Mix Everything`. Selecting a specific category removes `Mix Everything`; selecting the final active category again returns to `Mix Everything` rather than leaving an empty selection.

## Offline/PWA source check

- Runtime remains vanilla HTML/CSS/JavaScript with no external runtime API, CDN, remote font, analytics, authentication, or server-side feature.
- `sw.js` uses cache name `plot-twist-v6.1.0`.
- The service-worker app shell includes all eight deck files plus category logic/styles and existing app assets.
- The manifest remains configured for standalone PWA installation.

## Validation limits

The automated audit and repository checks are source/static validation. A real Android/Chrome installation is not physically certified by these checks.

Before treating an installed phone copy as final, verify:

1. `Mix Everything` can draw from the complete 200-card deck.
2. A single category draws only cards tagged to that category.
3. Several selected categories combine into one shuffled run without duplicate cards.
4. `Random From Selected` respects the filter.
5. Saved-card playback works independently of the filter.
6. Category selection survives closing and reopening the app.
7. Existing Saved cards/settings survive the v6.1 content update.
8. Reveal, The Point, Where This Can Go, Chaos, Next Card, and Settings work.
9. The category UI and longer two-sided answer labels remain usable on a narrow phone screen.
10. The airplane-mode test in the README succeeds after service worker `plot-twist-v6.1.0` activates.
