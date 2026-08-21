# Plot Twist

Offline-first Android-friendly social scenario game.

## What is included

- Vanilla HTML/CSS/JavaScript, no framework and no build step
- 24 local scenario cards
- Start Game shuffles the full deck every time
- Mixed scenario styles: absurd hypotheticals, everyday dilemmas, internet/nostalgia, a few major pop-culture references, moral questions, and deeper thought experiments
- Every card is designed to pressure-test at least one useful thinking habit without making the deck feel like a lesson plan
- Random Card mode
- Hidden Plot Twist stage with reveal animation
- 12 universal Chaos pressure tests
- Optional Host prompts
- Saved cards
- Local game-state persistence
- Optional Screen Wake Lock support
- Installable PWA manifest and local icons
- Service-worker offline cache
- Single-file `plot-twist-fallback.html` backup

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

## Easiest Android installation: GitHub Pages

A PWA should be served over HTTPS on Android. The simplest approach if you already use GitHub is:

1. Create a GitHub repository, for example `plot-twist`.
2. Upload the contents of this folder to the repository root.
3. In GitHub: **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. GitHub will give you an HTTPS Pages address such as `https://USERNAME.github.io/plot-twist/`.
7. Open that address in Chrome on the Android phone while you still have internet.
8. Wait until the bottom of the Plot Twist home screen says **Offline cache ready**.
9. In Chrome, tap **⋮ → Install app**. On some Chrome versions the menu group may be called **Install and create shortcut**.
10. Follow the Android prompt and confirm a Plot Twist icon appears on the home screen/app launcher.

## Airplane-mode test before the trip

1. Open the installed Plot Twist app once while online.
2. Start a game, reveal a Plot Twist, and leave the app on that card.
3. Fully close the app.
4. Enable **Airplane mode** and turn Wi-Fi off as well.
5. Launch Plot Twist from its installed icon, not from an old Chrome tab.
6. Confirm the same card reopens with the Plot Twist still revealed.
7. Test **Next Card**, **Random Card**, **Chaos**, and **Settings**.
8. Close and reopen it again while still in airplane mode.

If all of that works, the required game assets are cached locally.

## If Chrome does not show Install app

- Make sure you are opening the HTTPS GitHub Pages address, not a raw `file://` HTML file.
- Reload the page once and wait a few seconds for the manifest/service worker to be processed.
- Confirm the page says **Offline cache ready**.
- Open Chrome's three-dot menu and look for **Install app** or **Install and create shortcut**.
- If you already installed it, Chrome may not offer the install action again.
- If needed, remove the existing Plot Twist installation, revisit the HTTPS page, and retry.

## Why a raw local HTML file is not enough for PWA installation

The fallback HTML itself can run without the internet, but service workers and normal PWA installation are not available from a `file://` URL. Chromium PWA installation expects an HTTPS origin (or `localhost`/loopback for development). That is why the main PWA should be opened once from HTTPS before the trip.

## Backup option

Keep `plot-twist-fallback.html` in your phone's local storage as a second copy of the whole game. It has the cards, styles, game logic, and local-state code embedded into one file and has no network dependency.

It is not an installable PWA when opened as a raw file, but it is useful as an emergency backup if the installed app is ever removed or its browser storage is cleared.

## Editing or adding cards

All card content is in `cards.js`.

Each card looks like this:

```js
{
  id: 25,
  title: 'CARD TITLE',
  vibe: 'wild',
  scenario: [
    'First paragraph.',
    'Second paragraph.'
  ],
  prompt: 'What do you choose?',
  choices: ['Option A', 'Option B'],
  twist: [
    'New information revealed after the tap.'
  ],
  afterPrompt: 'Still your answer?',
  hostPrompts: ['Optional host prompt one', 'Optional host prompt two']
}
```

To add a card:

1. Copy an existing card object in `cards.js`.
2. Give it a new unique numeric `id`.
3. Change the title and content.
4. Keep the overall deck varied rather than grouping similar lessons or themes together.
5. Change `CACHE_NAME` in `sw.js` to a new version so installed devices replace the old cached files.

The internal `vibe` field is not shown to players.

## Offline design notes

The service worker precaches every essential local asset. Navigation requests use the cached `index.html` when the network is unavailable. Game state is stored in `localStorage`, including deck order, card position, reveal state, saved cards, and settings.

No external API, CDN, remote font, remote image, authentication service, analytics service, or server-side feature is used.
