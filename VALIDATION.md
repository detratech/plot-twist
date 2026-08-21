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

`pick topics → funny/quirky scenario → two answer bubbles → commitment → discussion → Plot Twist → The Point → deeper question → Where This Can Go`

`The Point` is intentionally declarative. The deck is not designed around a forced middle-ground conclusion. Each scenario is built to land a principle while still giving players something worth discussing before and after the reveal.

## Content design rules

The deck is audited against these standing rules:

- adult game-night energy rather than classroom or self-help-workbook energy
- humour can be dry, dark, absurd, awkward, petty, corporate, relational, internet-based, or occasionally pop-culture-flavoured
- jokes should make the dilemma easier to picture or remember, not replace the reasoning
- no visible question/card numbering
- exactly two answer bubbles so the player commits before the reveal
- no `it depends` answer escape
- the Plot Twist should materially change how the setup is viewed rather than merely restating the intended answer
- `The Point` states the conclusion instead of retreating into artificial neutrality
- `Where This Can Go` keeps the deeper discussion optional
- cards should use analogies and ordinary situations rather than exposing the source material or instructions that informed them
- sensitive social/political cards should target claims, incentives, evidence, framing, institutions, or conduct rather than assigning collective guilt to an identity group

The recurring reasoning themes include evidence versus confidence, reliable testimony, contradiction versus difference, complete context versus cropped evidence, influence versus control, individual evidence versus collective guilt, legality/popularity versus moral rightness, cause and effect, purpose versus mechanism, inherited assumptions, responsibility versus blame, self-command versus appetite/dependence, long-term consequences, financial risk and obligation, marriage/family responsibilities, attention and algorithms, institutional incentives, speech discipline, and consistent standards.

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
9. main prompts are question-form
10. Plot Twists are present
11. conclusions are present
12. deeper prompts are question-form
13. each card has exactly two question-form conversation paths
14. each card resolves to one or two valid category IDs
15. all six selectable categories exist and have meaningful deck coverage
16. all eight deck files are loaded by `index.html`
17. all eight deck files are precached by `sw.js`
18. `app.js` uses `masterpiece-200-v1`
19. `sw.js` uses `plot-twist-v6.0.0`
20. explicit source-worldview terminology intentionally excluded from the runtime is absent from card text and the user-facing runtime shell

Automated structural validation does not prove that a joke is funny or that a scenario is editorially excellent. Those remain editorial checks and were reviewed separately during the expansion.

## State behaviour

`app.js` retains the `plotTwistStateV4` local-storage key so compatible settings and Saved IDs can be migrated rather than blindly discarded.

The deck version is now `masterpiece-200-v1`. A user moving from the 100-card version gets a fresh game order so new scenarios can enter the shuffle, while valid Saved IDs, selected categories, and settings are preserved.

If no valid category selection exists, the app falls back to `Mix Everything`. Selecting a specific category removes `Mix Everything`; selecting the final active category again returns to `Mix Everything` rather than leaving an empty selection.

## Offline/PWA source check

- Runtime remains vanilla HTML/CSS/JavaScript with no external runtime API, CDN, remote font, analytics, authentication, or server-side feature.
- `sw.js` uses cache name `plot-twist-v6.0.0`.
- The service-worker app shell includes all eight deck files plus category logic/styles and existing app assets.
- The manifest remains configured for standalone PWA installation.

## Validation limits

The automated audit and repository checks are source/static validation. A real Android/Chrome installation is not physically certified by these checks.

Before treating an installed phone copy as final, verify:

1. `Mix Everything` can draw from the expanded deck.
2. A single category draws only cards tagged to that category.
3. Several selected categories combine into one shuffled run without duplicate cards.
4. `Random From Selected` respects the filter.
5. Saved-card playback works independently of the filter.
6. Category selection survives closing and reopening the app.
7. A pre-v6 install migrates without losing compatible Saved cards or settings.
8. Reveal, The Point, Where This Can Go, Chaos, Next Card, and Settings work.
9. The category UI remains usable on a narrow phone screen.
10. The airplane-mode test in the README succeeds after service worker `plot-twist-v6.0.0` activates.
