# Plot Twist Validation

Validation notes for the current source:

- The deck contains 24 unique local scenario cards.
- `Start Game` shuffles the full deck, so there is no fixed lesson sequence.
- The deck mixes modern-life dilemmas, absurd thought experiments, moral tensions, technology, money, relationships, pleasure, truth, identity, and a small amount of mainstream pop culture.
- Every card uses a scenario → commitment → Plot Twist → follow-up structure.
- The current content is designed to pressure-test assumptions without naming a political, religious, or philosophical target in the user-facing game.
- Twelve reusable Chaos prompts can be applied to any card.
- Game state, reveal state, saved cards, and settings are stored locally.
- Runtime remains vanilla HTML/CSS/JavaScript with no external APIs, analytics, authentication, CDN assets, or remote fonts.
- The service worker caches the essential application shell for offline use.
- The current cache version is `plot-twist-v4.3.0`.
- The manifest remains configured for standalone PWA installation.

## Content design check

The deck now focuses on deeper tensions such as:

- pleasure versus fulfilment
- truth versus comfort
- freedom versus conditioning and manipulation
- inherited assumptions versus examined beliefs
- consent versus wisdom or fairness
- legality versus morality
- majority approval versus individual rights
- self-definition versus meaningful standards
- stated values versus revealed behaviour
- present desire versus consequences for the future self
- mechanism versus intended purpose
- confidence versus evidence
- whether a belief is genuinely open to correction

The scenarios are analogies and discussion prompts, not proofs. A twist should reveal a tension, missing assumption, hidden cost, double standard, or new fact without making the desired answer obvious in advance.

## Device-specific final check

A real Android/Chrome installation cannot be physically certified from the build environment. Before relying on the app offline, open the hosted PWA online, wait for the updated service worker to activate, then perform the airplane-mode test described in the README.
