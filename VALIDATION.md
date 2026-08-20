# Plot Twist Validation

Validation performed on the revised source:

- JavaScript syntax checks passed for `cards.js`, `app.js`, and `sw.js`.
- `manifest.webmanifest` parses as valid JSON.
- Deck contains exactly 24 unique cards.
- The app now has one primary game flow; the separate Campfire Run has been removed.
- Ten universal Chaos pressure tests are included.
- Essential PWA assets all exist locally.
- PWA icons are valid 192×192 and 512×512 PNGs, including a 512×512 maskable icon.
- Runtime files contain no external CDN, remote-font, analytics, authentication, or API dependencies.
- The service worker precaches the complete essential app shell and uses cached `index.html` for navigation when offline.
- `manifest.webmanifest` requests `standalone` display mode and a dark theme/background.
- Game state persists deck order, current position, reveal state, saved cards, and settings in `localStorage`.
- The fallback HTML contains its CSS, scenario data, and application JavaScript inline and has no runtime network dependency.
- User-facing cards and interface do not name the underlying worldview or theological themes.

## Content design check

The revised deck uses familiar situations, media references, technology, work, home-buying, social media, gaming, and adult-life decisions to pressure-test evidence, causes, source reliability, contradictions, inherited assumptions, consistency, purpose, priorities, and willingness to change one’s mind. Analogies are used to make reasoning structures easier to see rather than being presented as proof by themselves.

## Device-specific final check

A real Android/Chrome installation cannot be physically certified from the build environment. Before relying on the app offline, perform the README airplane-mode test on the actual phone. That verifies the browser version, Android launcher, service-worker storage, and installed-app behaviour on the real device.
