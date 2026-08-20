# Plot Twist Validation

Validation performed on the revised source:

- JavaScript syntax checks passed for `cards.js`, `app.js`, and `sw.js`.
- `manifest.webmanifest` parses as valid JSON.
- Deck contains exactly 24 unique cards.
- The main game uses a fixed intentional order so the experience can progress from funny/easy scenarios into more demanding reasoning.
- `Random Card` remains available as an optional off-sequence utility.
- Ten universal MCU-themed Chaos pressure tests are included and each can apply to any card.
- Essential PWA assets all exist locally.
- PWA icons are valid 192×192 and 512×512 PNGs, including a 512×512 maskable icon.
- Runtime files contain no external CDN, remote-font, analytics, authentication, or API dependencies.
- The service worker precaches the complete essential app shell and uses cached `index.html` for navigation when offline.
- `manifest.webmanifest` requests `standalone` display mode and a dark theme/background.
- Game state persists deck order, current position, reveal state, saved cards, and settings in `localStorage`.
- The fallback HTML contains its CSS, scenario data, and application JavaScript inline and has no runtime network dependency.
- User-facing cards do not name the underlying worldview or theological themes.

## Content design check

The 24-card sequence deliberately starts with mainstream MCU humour and easy reasoning mistakes (showmanship, correlation, repeated sources, context, definitions), then moves into consistent standards, inherited assumptions, majority pressure, truth versus comfort, intended purpose, dependence, mechanism versus purpose, habits, priorities, and willingness to change one’s mind. Major non-MCU references are limited to widely recognizable films and franchises such as *Inception*, *Harry Potter*, *Pirates of the Caribbean*, *The Dark Knight*, *The Matrix*, *Jurassic Park*, *GTA*, *The Truman Show*, *The Lord of the Rings*, *Back to the Future*, and *Click*.

The scenarios are written as analogies and discussion prompts, not as proofs. The intended learning pattern is to make players use the same standards of evidence and reasoning in playful contexts before the later cards ask harder questions.

## Device-specific final check

A real Android/Chrome installation cannot be physically certified from the build environment. Before relying on the app offline, perform the README airplane-mode test on the actual phone. That verifies the browser version, Android launcher, service-worker storage, and installed-app behaviour on the real device.
