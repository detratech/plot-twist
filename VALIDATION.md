# Plot Twist Validation

Validation notes for the current source.

## Current deck structure

- The intended deck contains 100 local scenarios, split into four 25-card source files: `deck-a.js`, `deck-b.js`, `deck-c.js`, and `deck-d.js`.
- `cards.js` initializes the shared deck array and defines 16 reusable Chaos pressure tests.
- `index.html` loads `cards.js`, all four deck files, and then `app.js`.
- The previous `cards-extra.js`, `cards-balance.js`, and `cards-party.js` layers have been removed from the active architecture.
- Every newly authored scenario includes a title, scenario, main prompt, two answer choices, Plot Twist, declarative conclusion, deeper follow-up, and conversation paths.
- Numeric IDs still exist internally for saved-card and state handling, but card IDs and run-position numbers are not displayed in the game UI or Saved list.

## Current reveal structure

The current card rhythm is:

`funny/quirky scenario → two answer bubbles → commitment → discussion → Plot Twist → The Point → deeper question → Where This Can Go`

`The Point` is intentionally declarative. The deck is no longer designed around a neutral middle-ground conclusion or around making both original positions equally correct after the reveal. Each scenario is built to land a source-grounded principle while still giving players something worth discussing before and after the reveal.

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

## Runtime wording check

A repository search was run against the current runtime/user-facing source for the prohibited explicit worldview vocabulary used by earlier project constraints. No matches were returned for the searched terms, including the explicit names/categories that are not meant to appear in the game. A separate search for `god` also returned no result.

This is a source-level check. It does not claim semantic proof that every possible indirect reference has been eliminated.

## State migration

`app.js` keeps the existing `plotTwistStateV4` local-storage key but adds `DECK_VERSION = 'masterpiece-100-v1'`.

When an older deck state is found:

- compatible settings are preserved
- saved IDs that still exist in the new deck are preserved
- the old in-progress run/order is discarded
- the next new game is generated from the new deck

This avoids blindly changing the storage key and unnecessarily wiping all user preferences.

## Offline/PWA source check

- Runtime remains vanilla HTML/CSS/JavaScript with no external runtime API, CDN, remote font, analytics, authentication, or server-side feature.
- `sw.js` uses cache name `plot-twist-v5.0.0`.
- The service-worker app shell includes `cards.js`, all four new deck files, `app.js`, `index.html`, styles, manifest, and local icons.
- The manifest remains configured for standalone PWA installation.

## Validation limits

The current checks are source/static checks. A real Android/Chrome installation has not been physically certified from this environment.

A full JavaScript parser/runtime syntax check of all newly created deck files has not been claimed here. Before treating an installed phone copy as final, load the hosted build, confirm the deck starts correctly, reveal several cards, test Saved/Chaos/Next Card, then perform the airplane-mode test described in the README.
