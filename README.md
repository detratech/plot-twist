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
- Exactly two clearly stated answer choices under each main question so players commit before the reveal
- v6.2 choice presentation: large side-by-side A-vs-B panels, center divider/`VS` marker, prominent decision label, and smaller supporting reason
- Hidden Plot Twist stage with reveal animation
- A declarative `The Point` section after every twist that states the principle the scenario was built to expose
- A post-Point question followed by a local **Real-World Example** mapped specifically to that card
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
2. **Clear buttons.** Each answer choice states a real course, rule, priority, or judgement. `It depends` is not a pre-reveal escape hatch.
3. **No conclusion hidden in the choices.** One side should not be labelled with the obvious virtue while the other is written as a caricature.
4. **New information in the Plot Twist.** The reveal must add a fact, consequence, trade-off, missing context, or changed condition the player did not already have.
5. **The reveal must matter to the choice.** It should create a credible reason to reconsider the original answer rather than simply congratulate whoever picked the intended side.
6. **The Point still lands.** After the dilemma has done its work, `The Point` states the source-grounded principle rather than retreating into forced neutrality.
7. **The Real-World Example must fit the exact principle.** It illustrates the idea after the discussion; it is not a substitute for the dilemma and is not presented as proof that every modern case works the same way.

The game is therefore not designed as `sensible answer vs obviously bad answer → reveal that sensible answer was sensible`. The target rhythm is closer to `two defensible positions → commitment → new information changes the trade-off → reconsider → principle → concrete example`.

Recurring ideas include evidence over slogans and vibes, truth over comfort, precise claims over exaggeration, individual responsibility over collective guilt, cause and effect, substance over image, responsibility over blame, restraint over dependency, long-term consequences over short-term convenience, healthy family duties and boundaries, meaningful freedom over endless trivial choice, moral standards deeper than popularity or legality, reality over performance, purpose over distraction, reliable testimony and context, and consistent standards applied even when the conclusion is uncomfortable.

The intended game flow is:

`pick topics → funny/quirky dilemma → two clear choices → commit → defend → Plot Twist adds new information → reconsider/switch if needed → The Point → deeper question → Real-World Example → Where This Can Go`

## Card and history files

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

The 200 player-facing historical/example mappings are split across:

- `history-a.js`
- `history-b.js`
- `history-c.js`
- `history-d.js`
- `history-reviewed.js` — audited replacements for draft mappings that were repeated, disputed, too weak, or a poorer fit after research

`history-ui.js` inserts the selected card's Real-World Example immediately after the post-Point question. `choice-ui.js` separates each authored choice into a large decision label and smaller reason. `game-v6.2.css` owns the v6.2 two-column A-vs-B presentation.

`categories.js` runs after the deck and history data load. It preserves valid authored tags and infers tags for cards that do not already have them.

Numeric `id` values exist only for local state, saved-card handling, and the one-to-one history mapping. They are not shown to players.

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

Each runtime historical example contains a `title` and `text`, keyed by the same internal card ID.

## Historical research ledger

The `HISTORY_SOURCES*.md` files are editorial/research records only and are **not loaded by the game**. Together they contain one source-ledger entry for every internal ID 1–200.

The research standard is:

- accuracy and exact analogy fit outrank fame
- prefer primary, official, academic, archival, court, museum, or strong first-party sources
- remove or narrow popular anecdotes when the neat version is disputed
- state only what the cited source can reasonably support
- treat each example as an illustration of the card's principle, not universal proof

When research finds a stronger example than the original draft mapping, the runtime replacement belongs in `history-reviewed.js` so the draft files remain easy to compare with the audit decisions.

## Automated validation

`validate-content.cjs` audits the full deck and v6.2 history/presentation layer. GitHub Actions runs it together with `node --check` on the runtime JavaScript.

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
- exactly 200 substantive Real-World Examples map one-to-one to card IDs 1–200
- all eight deck files, all five runtime history layers, and the v6.2 presentation assets load in `index.html` and are precached by the service worker
- the Real-World Example is inserted immediately after the post-Point question
- the answer UI keeps two side-by-side columns with a divider, `VS` marker, large choice label, and secondary reason
- the user-facing rules explicitly say both choices are intended to be defensible and that switching after the reveal is allowed
- Settings visibly reports app version `v6.2.0`
- the app keeps deck version `masterpiece-200-v1` so compatible Saved IDs/state remain stable
- the service worker uses cache `plot-twist-v6.2.0`
- explicit source-worldview terminology and authoring/meta-instruction leaks intentionally excluded from the runtime are not present in the cards, historical examples, or app shell

Structural validation cannot prove that a joke lands, that two arguments are genuinely balanced, or that a historical analogy is editorially ideal. Those remain human review tasks in addition to the automated checks.

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

The v6.2 presentation/history update intentionally keeps the existing `masterpiece-200-v1` deck/state identifier because internal IDs and compatible local state did not change. The service-worker cache is bumped to `plot-twist-v6.2.0` so revised assets are downloaded without needlessly discarding Saved cards or the current order.

## Airplane-mode test

Before relying on the app offline:

1. Open the installed app once while online.
2. Pick a topic mix and start a game.
3. Reveal a Plot Twist and leave the app on that card.
4. Fully close the app.
5. Enable Airplane mode and turn Wi-Fi off.
6. Launch Plot Twist from its installed icon.
7. Confirm the same card reopens with the twist still revealed.
8. Test **Next Card**, **Random**, **Chaos**, **Saved**, topic selection, **Settings**, the A-vs-B choice layout, and Real-World Examples.
9. Close and reopen it again while still offline.

## Offline design notes

The service worker precaches every essential local asset, including all eight deck files, all runtime history files, category logic/styles, and the v6.2 presentation scripts/styles. Navigation requests use cached `index.html` when the network is unavailable. Game state is stored in `localStorage`, including deck order, card position, reveal state, saved cards, selected categories, and settings.

No external API, CDN, remote font, remote image, authentication service, analytics service, or server-side feature is used at runtime. The research ledger may contain web links for editors, but those Markdown files are not part of the player-facing runtime or offline dependency chain.
