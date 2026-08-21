# Plot Twist

Offline-first Android-friendly social scenario game.

## What is included

- Vanilla HTML/CSS/JavaScript, no framework and no build step
- **200 local scenario cards**
- Six broad selectable topic categories plus `Mix Everything`
- Multi-select topic mixing so players can combine several categories in one run
- Start Game shuffles only the currently selected topics
- Random Card also respects the current topic selection
- No visible card numbering in the game or Saved list
- Adult game-night tone: dry sarcasm, ridiculous stakes, awkward social situations, petty human behaviour, strange corporate logic, dark humour, and occasional pop-culture flavour
- Exactly two clearly stated answer bubbles under each main question so players commit before the reveal
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

- **Mind & Truth** — evidence, beliefs, logic, assumptions
- **Relationships & Family** — marriage, dating, parenting, boundaries
- **Money & Success** — work, ambition, debt, status, responsibility
- **Tech & Modern Life** — phones, algorithms, attention, convenience
- **Society & Culture** — social rules, politics, groups, public life
- **Life & Purpose** — character, pleasure, freedom, meaning, time

Cards may fit more than one category. The newer cards carry deliberate authored category tags. Older cards without authored tags are classified by `categories.js` from their content and vibe. Selecting several categories creates one combined shuffled deck without duplicating a card inside that run.

Saved cards remain independent of the category filter so players can revisit anything they previously saved.

## Content design

The deck is shuffled so players should not know whether the next card will be absurd, personal, social, technological, moral, financial, political, relational, or uncomfortable within the topics they selected.

The core rule is **funny dilemma, real commitment, meaningful reversal, sharp conclusion**. A card should feel like something adults would actually enjoy reading aloud. Humour can be dry, dark, awkward, ridiculous, or pop-culture-flavoured, but it should make the dilemma easier to picture rather than bury the idea.

Every card is written around these editorial requirements:

1. **Two intelligent choices.** Before the reveal, a reasonable adult should be able to defend either answer without sounding like the designated idiot at the table.
2. **Clear buttons.** Each answer bubble states a real course, rule, priority, or judgement. `It depends` is not a pre-reveal escape hatch.
3. **No conclusion hidden in the choices.** One bubble should not be labelled with the obvious virtue while the other is written as a caricature.
4. **New information in the Plot Twist.** The reveal must add a fact, consequence, trade-off, missing context, or changed condition the player did not already have.
5. **The reveal must matter to the choice.** It should create a credible reason to reconsider the original answer rather than simply congratulate whoever picked the intended side.
6. **The Point still lands.** After the dilemma has done its work, `The Point` states the source-grounded principle rather than retreating into forced neutrality.

The game is therefore not designed as `sensible answer vs obviously bad answer → reveal that sensible answer was sensible`. The target rhythm is closer to `two defensible positions → commitment → new information changes the trade-off → reconsider → principle`.

Recurring ideas include evidence over slogans and vibes, truth over comfort, precise claims over exaggeration, individual responsibility over collective guilt, cause and effect, substance over image, responsibility over blame, restraint over dependency, long-term consequences over short-term convenience, healthy family duties and boundaries, meaningful freedom over endless trivial choice, moral standards deeper than popularity or legality, reality over performance, purpose over distraction, reliable testimony and context, and consistent standards applied even when the conclusion is uncomfortable.

The intended game flow is:

`pick topics → funny/quirky dilemma → two clear answer bubbles → commit → defend → Plot Twist adds new information → reconsider/switch if needed → The Point → deeper question → Where This Can Go`

## Card files

`cards.js` initializes the shared card array and defines the 16 reusable Chaos pressure tests.

The 200-card deck is split into eight 25-card files:

- `deck-a.js`
- `deck-b.js`
- `deck-c.js`
- `deck-d.js`
- `deck-e.js`
- `deck-f.js`
- `deck-g.js`
- `deck-h.js`

`categories.js` runs after all eight deck files load. It preserves valid authored tags and infers tags for cards that do not already have them.

Numeric `id` values exist only for local state and saved-card handling. They are not shown to players.

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
- optional authored `categories`

## Automated validation

`validate-content.cjs` audits the full deck. GitHub Actions runs it together with `node --check` on the runtime JavaScript.

The validator checks, among other things:

- exactly 200 cards load
- internal IDs 1–200 are complete and unique
- titles and scenarios are not exact duplicates
- every scenario has the required card structure
- every card has exactly two distinct and substantive answer choices
- answer choices do not use an `it depends` escape or obviously insulting loaded labels
- Plot Twists contain substantive reveal text rather than an empty one-liner or exact scenario repeat
- prompts and follow-up paths are present in the required form
- every card resolves to one or two valid categories
- all eight deck files load in `index.html` and are precached by the service worker
- the user-facing rules explicitly say both choices are intended to be defensible and that switching after the reveal is allowed
- the app keeps deck version `masterpiece-200-v1` so compatible Saved IDs/state remain stable
- the service worker uses cache `plot-twist-v6.1.0` so installed copies receive the rewritten deck
- explicit source-worldview terminology that is intentionally excluded from the runtime is not present in the game text or app shell

Structural validation cannot prove that a joke lands or that two arguments are genuinely balanced. Those are editorial judgements and are reviewed card-by-card in addition to the automated checks.

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

The 200-card dilemma rewrite intentionally keeps the existing `masterpiece-200-v1` deck/state identifier because internal IDs and compatible local state did not change. The service-worker cache is bumped instead so revised scenario text is downloaded without needlessly discarding Saved cards or the current order.

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

The service worker precaches every essential local asset, including all eight deck files, category logic, and category styles. Navigation requests use cached `index.html` when the network is unavailable. Game state is stored in `localStorage`, including deck order, card position, reveal state, saved cards, selected categories, and settings.

No external API, CDN, remote font, remote image, authentication service, analytics service, or server-side feature is used at runtime.
