# Plot Twist

Offline-first Android-friendly social scenario game.

## What is included

- Vanilla HTML/CSS/JavaScript, no framework and no build step
- 50 local scenario cards
- Start Game shuffles the full deck every time
- Mixed scenario styles: absurd hypotheticals, everyday dilemmas, relationships, family chaos, internet culture, social norms, money, privacy, technology, group behaviour, a small amount of mainstream pop culture, and deeper thought experiments
- Adult party-game tone: dry sarcasm, ridiculous stakes, awkward social situations, petty human behaviour, dark humour where it helps, and deliberately quirky wording
- Two-sided card design: every main question should offer two genuinely defensible positions rather than a smart answer and a foolish answer
- Two-sided Plot Twists: the reveal adds information that creates a new problem for both original choices instead of revealing which side was correct
- Every card pressure-tests at least one useful thinking habit without making the deck feel like a lesson plan
- Random Card mode
- Hidden Plot Twist stage with reveal animation
- 12 universal Chaos pressure tests
- Optional Host prompts
- `Where This Can Go` follow-up paths after the reveal
- Saved cards
- Local game-state persistence
- Optional Screen Wake Lock support
- Installable PWA manifest and local icons
- Service-worker offline cache

## Content design

The deck is shuffled so players should not know whether the next card will be absurd, personal, social, technological, moral, political, or uncomfortable.

The first rule is **fun setup, serious aftertaste**. Every card should feel like something adults would actually enjoy reading aloud at game night. Prefer weird hypotheticals, dry jokes, social awkwardness, absurd corporate logic, relationship chaos, petty human behaviour, and occasional dark humour over lecture-like wording. The deeper issue should arrive almost by accident.

The humour must not make one answer obviously foolish. A joke can live in either answer label, the scenario, or the reveal, but both sides still need to represent a position a reasonable player could defend.

The second rule is **both sides must make sense before the reveal**. Avoid escape-hatch options such as “it depends,” “show me the evidence,” or a joke answer when they let a player dodge the actual trade-off. The player should commit to one of two positions that a reasonable person could defend.

The third rule is **the Plot Twist attacks both sides**. It should not reveal that one original answer was secretly correct. The new information should expose a cost, weakness, exception, or uncomfortable consequence for Side A and Side B. A player who chose either side should have a real reason to reconsider or refine the answer.

The intended rhythm is:

`funny/quirky scenario → two defensible choices → commit → defend → reveal new information → both sides now have a problem → decide whether to switch → Where This Can Go`

Cards may test whether players follow consequences, check evidence, separate repetition from independent confirmation, use the same standard on both sides, notice social pressure and defaults, examine inherited norms, distinguish stated values from behaviour, define what would change their mind, or ask where an assumption came from.

The deck also uses familiar contradictions of modern life: privacy versus convenience, authenticity versus performance, individual choice versus defaults and recommendation systems, endless options versus meaningful control, stated priorities versus actual attention, status versus competence, personal freedom versus dependence, and the way social context can make the same situation feel completely different.

The cards are discussion prompts and analogies, not proofs.

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

## Airplane-mode test

Before relying on the app offline:

1. Open the installed app once while online.
2. Start a game, reveal a Plot Twist, and leave the app on that card.
3. Fully close the app.
4. Enable Airplane mode and turn Wi-Fi off.
5. Launch Plot Twist from its installed icon.
6. Confirm the same card reopens with the twist still revealed.
7. Test **Next Card**, **Random Card**, **Chaos**, **Saved**, and **Settings**.
8. Close and reopen it again while still offline.

## Editing cards

Cards 1–24 are defined in `cards.js`. Cards 25–50 are defined in `cards-extra.js`. `cards-balance.js` applies the two-sided game mechanic across all 50 cards. `cards-party.js` then applies the current adult party-game wording, titles, scenarios, answer labels, twists, follow-up questions, and conversation paths. All card files load before `app.js` and form one 50-card deck.

Each card has a unique numeric `id`, title, scenario, prompt, choices, twist, follow-up prompt, and optional host prompts. Host prompts are also used to populate the visible `Where This Can Go` section after the reveal.

When changing card content, bump `CACHE_NAME` in `sw.js` so installed devices replace the old cached deck.

## Offline design notes

The service worker precaches every essential local asset. Navigation requests use cached `index.html` when the network is unavailable. Game state is stored in `localStorage`, including deck order, card position, reveal state, saved cards, and settings.

No external API, CDN, remote font, remote image, authentication service, analytics service, or server-side feature is used.
