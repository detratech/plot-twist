# Plot Twist

Offline-first Android-friendly social scenario game.

## What is included

- Vanilla HTML/CSS/JavaScript, no framework and no build step
- 100 local scenario cards
- Six broad selectable topic categories plus `Mix Everything`
- Multi-select topic mixing so players can combine several categories in one run
- Start Game shuffles only the currently selected topics
- Random Card also respects the current topic selection
- No visible card numbering in the game or Saved list
- Mixed scenario styles: absurd hypotheticals, everyday dilemmas, relationships, family chaos, internet culture, money, work, morality, technology, group behaviour, institutions, mystery, dark humour, and occasional pop-culture flavour
- Adult game-night tone: dry sarcasm, ridiculous stakes, awkward social situations, petty human behaviour, strange corporate logic, and quirky wording
- Two answer bubbles under each main question so players commit before the reveal
- Hidden Plot Twist stage with reveal animation
- A declarative `The Point` section after every twist that states the principle the scenario was built to expose
- `Where This Can Go` follow-up paths for deeper discussion
- 16 universal Chaos pressure tests
- Optional Host prompts
- Saved cards
- Local game-state persistence
- Optional Screen Wake Lock support
- Installable PWA manifest and local icons
- Service-worker offline cache

## Topic categories

The home screen lets players choose one category, combine several, or leave `Mix Everything` selected for the full deck.

The six broad categories are:

- **Mind & Truth** — evidence, beliefs, logic, assumptions
- **Relationships & Family** — marriage, dating, parenting, boundaries
- **Money & Success** — work, ambition, debt, status, responsibility
- **Tech & Modern Life** — phones, algorithms, attention, convenience
- **Society & Culture** — social rules, politics, groups, public life
- **Life & Purpose** — character, pleasure, freedom, meaning, time

Cards may fit more than one category. `categories.js` assigns broad topic tags from each card's existing vibe and content, then the game filters by the selected tags. Selecting multiple categories creates one combined shuffled deck without duplicating a card inside that run.

Saved cards remain independent of the category filter so players can revisit anything they previously saved.

## Content design

The deck is shuffled so players should not know whether the next card will be absurd, personal, social, technological, moral, financial, political, relational, or uncomfortable within the topics they selected.

The core rule is **funny setup, sharp conclusion**. The card should feel like something adults would actually enjoy reading aloud. The deeper idea arrives through the Plot Twist and then lands clearly in `The Point`.

The deck is intentionally not written as a neutral debate workbook. Each scenario is built around a principle and the reveal is allowed to show why one way of thinking is stronger, more coherent, more responsible, or more grounded in evidence than the alternative.

The recurring principles include:

- evidence over slogans, vibes, confidence, status, and popularity
- truth over comfort and ego-protection
- individual responsibility over collective guilt
- precise claims over conspiracy-style overreach
- cause and effect over wishful thinking
- responsibility over blame
- substance over image and potential
- self-control over appetite and dependency
- long-term consequences over short-term convenience
- family duty, communication, boundaries, and responsibility over performance
- meaningful freedom over endless trivial choice
- moral standards deeper than legality, polling, or personal disgust
- reality over simulation and appearance
- purpose over distraction and accumulation
- reliable testimony, context, and preservation over shallow slogans
- mechanism and purpose as different questions
- equality of dignity without pretending every role or function is identical

The humour must not replace the idea. Every joke should either make the scenario easier to picture, make adults want to answer it, or make the contradiction memorable.

The intended rhythm is:

`pick topics → funny/quirky scenario → answer bubbles → commit → defend → Plot Twist → The Point → deeper question → Where This Can Go`

## Card files

`cards.js` defines the shared card array and Chaos pressure tests.

The 100-card deck is split into four readable files:

- `deck-a.js`
- `deck-b.js`
- `deck-c.js`
- `deck-d.js`

`categories.js` assigns the broad selectable topic tags after all four deck files have loaded.

The numeric `id` values exist only for internal state and saved-card handling. They are not displayed to players.

Each card contains:

- `id`
- `title`
- `vibe`
- `scenario`
- `prompt`
- `choices`
- `twist`
- `conclusion`
- `afterPrompt`
- `hostPrompts`

Runtime category tags are added after the deck loads.

## Fast local desktop test

From this folder, run:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

`localhost` is acceptable for local PWA/service-worker testing on the computer itself.

## Android installation: GitHub Pages

1. Serve the repository through GitHub Pages from the `main` branch and repository root.
2. Open the HTTPS Pages address in Chrome on the Android phone while online.
3. Wait until the bottom of the Plot Twist home screen says **Offline cache ready**.
4. In Chrome, tap **⋮ → Install app**. On some Chrome versions the menu group may be called **Install and create shortcut**.
5. Confirm a Plot Twist icon appears on the home screen/app launcher.

## Updating an installed copy

After a new version is published:

1. Open the web version while online.
2. Reload it.
3. Wait a few seconds and reload once more.
4. Fully close the installed Plot Twist app.
5. Reopen it.

Avoid clearing site data unless necessary because that removes saved cards and local game state.

The current deck migration preserves compatible Saved IDs, topic choices, and settings when possible.

## Airplane-mode test

Before relying on the app offline:

1. Open the installed app once while online.
2. Pick a topic mix and start a game.
3. Reveal a Plot Twist and leave the app on that card.
4. Fully close the app.
5. Enable Airplane mode and turn Wi-Fi off.
6. Launch Plot Twist from its installed icon.
7. Confirm the same card reopens with the twist still revealed.
8. Test **Next Card**, **Random**, **Chaos**, **Saved**, topic selection, and **Settings**.
9. Close and reopen it again while still offline.

## Offline design notes

The service worker precaches every essential local asset, including the category logic and category styles. Navigation requests use cached `index.html` when the network is unavailable. Game state is stored in `localStorage`, including deck order, card position, reveal state, saved cards, selected categories, and settings.

No external API, CDN, remote font, remote image, authentication service, analytics service, or server-side feature is used.
