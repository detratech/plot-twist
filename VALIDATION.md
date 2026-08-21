# Plot Twist Validation

Validation performed on the revised source:

- JavaScript syntax checks passed for `cards.js`.
- Deck contains exactly 24 unique cards.
- Start Game shuffles the full deck rather than following a fixed curriculum order.
- Ten universal Chaos pressure tests are included and can apply to any card.
- The revised deck mixes absurd hypotheticals, everyday life, internet culture, social norms, privacy, sports, consumer choices, a small amount of mainstream pop culture, and deeper thought experiments.
- User-facing cards do not name the underlying worldview or theological themes.
- The service-worker cache version was bumped to `plot-twist-v4.2.0` so installed devices can replace the previous deck.
- Runtime design remains local/offline-first with no external CDN, remote font, analytics, authentication, or API dependency.
- The PWA manifest, app shell, saved-card system, local state persistence, Wake Lock option, and install flow were not structurally changed in this content revision.

## Content design check

Every card now pressure-tests at least one useful thinking habit while varying the surface subject enough that the deck does not feel like a repeated lesson. Themes include consequences, context-dependent social norms, popularity versus evidence, pluralistic ignorance, consistent evidence standards, privacy versus convenience, default effects, curated authenticity, repeated-source illusions, reinforcement of outrage, novelty bias, illusion of explanatory depth, in-group double standards, attitude-behaviour gaps, algorithmic curation, private versus public morality, stated priorities versus actual attention, source verification, self-exemption, truth versus comfort, intended purpose, falsifiability, and cause-and-effect over time.

The scenarios are analogies and discussion prompts, not proofs. Several cards deliberately avoid a single obviously “correct” moral answer so discussion does not become a hunt for the answer the game wants.

## Device-specific final check

A real Android/Chrome installation cannot be physically certified from this environment. Before relying on the app offline, perform the README airplane-mode test on the actual phone. That verifies the browser version, Android launcher, service-worker storage, and installed-app behaviour on the real device.
