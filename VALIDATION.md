# Plot Twist Validation

Validation notes for the current source.

## Current deck structure

- The intended deck contains 100 local scenarios, split into four 25-card source files: `deck-a.js`, `deck-b.js`, `deck-c.js`, and `deck-d.js`.
- `cards.js` initializes the shared deck array and defines 16 reusable Chaos pressure tests.
- `categories.js` assigns broad topic categories after the full deck loads.
- `index.html` loads `cards.js`, all four deck files, `categories.js`, and then `app.js`.
- Every authored scenario includes a title, scenario, main prompt, two answer choices, Plot Twist, declarative conclusion, deeper follow-up, and conversation paths.
- Numeric IDs still exist internally for saved-card and state handling, but card IDs and run-position numbers are not displayed in the game UI or Saved list.

## Selectable categories

The home screen now exposes six broad topic selectors plus `Mix Everything`:

- Mind & Truth
- Relationships & Family
- Money & Success
- Tech & Modern Life
- Society & Culture
- Life & Purpose

The selector is multi-select. Players can combine categories into one shuffled run. `Mix Everything` restores the full-deck behaviour.

Category tags are inferred from each card's existing `vibe` plus topic words in its title, scenario, choices, twist, conclusion, and follow-up material. A card may therefore belong to more than one broad category. Filtering uses overlap logic and does not duplicate a card inside a single shuffled run.

Saved-card playback is independent of the current topic filter.

## Current reveal structure

The current card rhythm is:

`pick topics → funny/quirky scenario → two answer bubbles → commitment → discussion → Plot Twist → The Point → deeper question → Where This Can Go`

`The Point` is intentionally declarative. The deck is not designed around a neutral middle-ground conclusion. Each scenario is built to land a source-grounded principle while still giving players something worth discussing before and after the reveal.

## Content design check

The current deck repeatedly tests themes such as:

- evidence versus confidence, popularity, status, slogans, or personal feeling
- truth versus comfort and ego-protection
- reliable testimony and records versus impossible eyewitness-only standards
- contradiction versus merely different details
- context versus cropped or incomplete evidence
- influence versus coordination or total control
- individual evidence versus collective guilt
- legality and popularity versus moral rightness
- cause and effect versus wishful thinking
- purpose versus mechanism
- inherited assumptions versus examined beliefs
- substance versus image, performance, and unrealized potential
- responsibility versus blame
- self-command versus appetite and dependence
- long-term consequences versus immediate convenience
- pleasure versus fulfilment and hedonic escalation
- attention, algorithms, and commercial incentives
- time, health, money, debt, and lifestyle creep
- marriage compatibility, communication, presence, privacy, and boundaries
- parenting warmth, discipline, consistency, and screen dependence
- equal human dignity versus identical functions or roles
- meaningful freedom versus endless trivial choices
- finite life, character, service, responsibility, and purpose

Humour is used to make the dilemma memorable rather than to replace the reasoning. The deck uses absurd corporate logic, adult relationship situations, internet behaviour, money mistakes, family chaos, dry sarcasm, awkward hypotheticals, occasional dark humour, and limited pop-culture flavour.

## State behaviour

`app.js` keeps the existing `plotTwistStateV4` local-storage key and the current 100-card deck version marker.

State now also stores `selectedCategories`.

If no valid category selection exists, the app falls back to `Mix Everything`. Selecting a specific category removes `Mix Everything`; selecting the final active category again returns the app to `Mix Everything` rather than leaving an empty selection.

Compatible settings and saved IDs remain preserved.

## Offline/PWA source check

- Runtime remains vanilla HTML/CSS/JavaScript with no external runtime API, CDN, remote font, analytics, authentication, or server-side feature.
- `sw.js` uses cache name `plot-twist-v5.1.0`.
- The service-worker app shell includes `categories.js` and `categories.css` in addition to the four deck files and the existing app assets.
- The manifest remains configured for standalone PWA installation.

## Validation limits

The current checks are source/static checks. A real Android/Chrome installation has not been physically certified from this environment.

Before treating an installed phone copy as final, load the hosted build and verify:

1. `Mix Everything` starts a full mixed game.
2. A single category only draws cards matching that category.
3. Several selected categories combine into one shuffled run without duplicate cards.
4. `Random From Selected` respects the filter.
5. Saved-card playback still works independently of the filter.
6. Category selection survives closing and reopening the app.
7. Reveal, The Point, Where This Can Go, Chaos, Next Card, and Settings still work.
8. The category UI remains usable on a narrow phone screen.
9. The airplane-mode test in the README succeeds after the new service worker activates.
