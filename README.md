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
- v6.3 **One Last Thing** consistency prompt after every Real-World Example
- Eight deterministic consistency tests covering role reversal, falsifiability, outcomes, impartiality, universal rules, self-application, power reversal, and cross-domain transfer
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
8. **Consistency gets pressure-tested.** After the example, `One Last Thing` asks whether the same rule survives a role swap, disliked outcome, power reversal, self-application, or different life domain.

The game is therefore not designed as `sensible answer vs obviously bad answer → reveal that sensible answer was sensible`. The target rhythm is closer to `two defensible positions → commitment → new information changes the trade-off → reconsider → principle → concrete example → consistency check`.

Recurring ideas include evidence over slogans and vibes, truth over comfort, precise claims over exaggeration, individual responsibility over collective guilt, cause and effect, substance over image, responsibility over blame, restraint over dependency, long-term consequences over short-term convenience, healthy family duties and boundaries, meaningful freedom over endless trivial choice, moral standards deeper than popularity or legality, reality over performance, purpose over distraction, reliable testimony and context, and consistent standards applied even when the conclusion is uncomfortable.

The intended game flow is:

`pick topics → funny/quirky dilemma → two clear choices → commit → defend → Plot Twist adds new information → reconsider/switch if needed → The Point → deeper question → Real-World Example → One Last Thing → Where This Can Go`

## Card, history, and consistency files

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

`history-ui.js` inserts the selected card's Real-World Example immediately after the post-Point question. `choice-ui.js` separates each authored choice into a large decision label and smaller reason. `game-v6.2.css` owns the two-column A-vs-B presentation.

`consistency-ui.js` inserts `One Last Thing` immediately after the Real-World Example. It contains eight concise universal tests and deterministically assigns one by stable card ID, so each card gets the same pressure test across sessions without changing saved-state structure. `game-v6.3.css` provides the small visual layer for that prompt.

`categories.js` runs after the deck and history data load. It preserves valid authored tags and infers tags for cards that do not already have them.

Numeric `id` values exist only for local state, saved-card handling, the one-to-one history mapping, and deterministic consistency-prompt assignment. They are not shown to players.

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

`validate-content.cjs` audits the full deck and the v6.2/v6.3 presentation, history, and consistency layers. GitHub Actions runs it together with `node --check` on the runtime JavaScript.

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
- all eight deck files, all five runtime history layers, and all v6.2/v6.3 presentation assets load in `index.html` and are precached by the service worker
- the Real-World Example is inserted immediately after the post-Point question
- `One Last Thing` is inserted immediately after the Real-World Example
- exactly eight unique consistency prompts exist and include the intended pressure-test types
- consistency assignment is deterministic from stable card ID
- the answer UI keeps two side-by-side columns with a divider, `VS` marker, large choice label, and secondary reason
- the user-facing rules explicitly say both choices are intended to be defensible and that switching after the reveal is allowed
- Settings visibly reports app version `v6.3.0`
- the app keeps deck version `masterpiece-200-v1` so compatible Saved IDs/state remain stable
- the service worker uses cache `plot-twist-v6.3.0`
- explicit source-worldview terminology and authoring/meta-instruction leaks intentionally excluded from the runtime are not present in the cards, historical examples, consistency layer, or app shell

Structural validation cannot prove that a joke lands, that two arguments are genuinely balanced, that a historical analogy is editorially ideal, or that every pressure test feels equally natural on a physical phone. Those remain human review tasks in addition to the automated checks.

## Android installation: GitHub-hosted PWA

1. Open the hosted Plot Twist HTTPS address in Chrome on the Android phone while online.
2. Wait until the bottom of the Plot Twist home screen says **Offline cache ready**.
3. In Chrome, tap **⋮ → Install app**. On some Chrome versions the menu group may be called **Install and create shortcut**.
4. Confirm a Plot Twist icon appears on the home screen/app launcher.

## Updating an installed copy

After a new version is published:

1. Open the hosted web version while online.
2. Reload it.
3. Wait a few seconds and reload once more.
4. Fully close the installed Plot Twist app.
5. Reopen it.
6. Confirm Settings shows the expected version.

Avoid clearing site data unless necessary because that removes saved cards and local game state.

The v6.3 consistency update intentionally keeps the existing `masterpiece-200-v1` deck/state identifier because internal IDs and compatible local state do not change. The service-worker cache is bumped to `plot-twist-v6.3.0` so the new runtime assets are downloaded without needlessly discarding Saved cards or the current order.

## Airplane-mode test

Before relying on the app offline:

1. Open the installed app once while online.
2. Confirm Settings shows `v6.3.0`.
3. Pick a topic mix and start a game.
4. Reveal a Plot Twist and verify the flow reaches `The Point → deeper question → Real-World Example → One Last Thing`.
5. Fully close the app.
6. Enable Airplane mode and turn Wi-Fi off.
7. Launch Plot Twist from its installed icon.
8. Confirm the same card reopens with the twist still revealed.
9. Test **Next Card**, **Random**, **Chaos**, **Saved**, topic selection, **Settings**, the A-vs-B choice layout, Real-World Examples, and several different `One Last Thing` prompts.
10. Close and reopen it again while still offline.

## Offline design notes

The service worker precaches every essential local asset, including all eight deck files, all runtime history files, category logic/styles, the v6.2 choice/history presentation assets, and the v6.3 consistency assets. Navigation requests use cached `index.html` when the network is unavailable. Game state is stored in `localStorage`, including deck order, card position, reveal state, saved cards, selected categories, and settings.

No external API, CDN, remote font, remote image, authentication service, analytics service, or server-side feature is used at runtime. The research ledger may contain web links for editors, but those Markdown files are not part of the player-facing runtime or offline dependency chain.
