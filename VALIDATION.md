# Plot Twist Validation

Validation performed on the delivered source:

- JavaScript syntax checks passed for `cards.js`, `app.js`, and `sw.js`.
- `manifest.webmanifest` parses as valid JSON.
- Deck contains exactly 24 unique cards.
- All 12 specifically requested thought-provoking cards are present.
- Curated Campfire Run contains 14 valid card IDs in the requested light-to-deeper order.
- Five optional Chaos modifiers are present: PROVE IT, REVERSE IT, BET ON IT, SWITCH, and NO ESCAPE.
- Essential PWA assets all exist locally.
- PWA icons are valid 192×192 and 512×512 PNGs, including a 512×512 maskable icon.
- Runtime files contain no `http://` or `https://` dependencies, external CDN references, remote fonts, APIs, analytics, or remote images.
- The service worker precaches the complete essential app shell and uses the cached app shell for navigation when offline.
- `manifest.webmanifest` requests `standalone` display mode and a dark theme/background.
- Game state code persists the current mode, shuffled order, current position, reveal state, saved cards, and settings in `localStorage`.
- The fallback HTML contains its CSS, scenario data, and application JavaScript inline and has no external asset references.
- User-facing runtime content was checked for explicit religious/theological labels requested to be excluded.

## Device-specific final check

A real Android/Chrome installation cannot be physically certified from the build environment. Before the camping trip, perform the README airplane-mode test on the actual phone you will take. That verifies the browser version, Android launcher, service-worker storage, and installed-app behaviour on the real device.
