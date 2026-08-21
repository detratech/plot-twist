# Plot Twist

Offline-first Android-friendly social scenario game.

## What is included

- Vanilla HTML/CSS/JavaScript, no framework and no build step
- 24 local scenario cards
- Start Game shuffles the full deck every time
- Mixed scenario styles: absurd hypotheticals, everyday dilemmas, internet culture, social norms, money, privacy, sports, a small amount of mainstream pop culture, and deeper thought experiments
- Every card is designed to pressure-test at least one useful thinking habit without making the deck feel like a lesson plan
- Random Card mode
- Hidden Plot Twist stage with reveal animation
- 10 universal Chaos pressure tests
- Optional Host prompts
- Saved cards
- Local game-state persistence
- Optional Screen Wake Lock support
- Installable PWA manifest and local icons
- Service-worker offline cache

## Content design

The subjects are randomized, but each card has a reason to exist. Cards may test whether players follow consequences, check evidence, separate repetition from independent confirmation, use the same standard on both sides, notice social pressure and defaults, examine inherited norms, distinguish stated values from behaviour, define what would change their mind, or ask where an assumption came from.

The deck also uses familiar contradictions of modern life: privacy versus convenience, authenticity versus performance, individual choice versus defaults and recommendation systems, environmental concern versus actual purchases, stated priorities versus attention, and the way social context can make the same physical situation feel completely different.

The cards are discussion prompts and analogies, not proofs. A good card should make the group commit to an answer before the twist adds a fact, changes the context, or exposes an assumption they did not notice.

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

All card content is in `cards.js`.

Each card has a unique numeric `id`, title, scenario, prompt, optional choices, twist, follow-up prompt, and optional host prompts.

When changing card content, bump `CACHE_NAME` in `sw.js` so installed devices replace the old cached deck.

## Offline design notes

The service worker precaches every essential local asset. Navigation requests use cached `index.html` when the network is unavailable. Game state is stored in `localStorage`, including deck order, card position, reveal state, saved cards, and settings.

No external API, CDN, remote font, remote image, authentication service, analytics service, or server-side feature is used.
