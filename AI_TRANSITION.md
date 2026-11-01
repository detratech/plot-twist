# Plot Twist — two-agent GitHub transition

**Staged documentation only.** This file cannot activate new game modes or approve a release. Only adopt after the My Brain two-agent pilot is accepted and this PR has independent final-head review and owner merge.

Verify GitHub main, all open PRs and exact work-branch SHA, then read the existing project authorities in their established order: `README.md`, `docs/DEVELOPMENT_HANDOFF.md`, `VALIDATION.md`, `PLAIN_LANGUAGE_NOTES.md`. Also read both agent journals; neither replaces the established development handoff.

ChatGPT coordinates product/gameplay requirements, editorial consistency review, independent source/history and validator checks, UAT guidance and defects. **Only ChatGPT edits `CHATGPT_HANDOFF.md`.** Claude implements approved code/content, self-reviews and runs automated validation. **Only Claude edits `CLAUDE_HANDOFF.md`.** Both read both, maintain latest meaningful checkpoint plus dated outcomes, and post live PR head/review/issues in GitHub PR comments. ChatGPT can post fixes directly for Claude to read; manual switching needs only one short PR/SHA handoff.

One writer per branch at a time. Both agents independently review the **same final head SHA**; a new commit voids previous approval. Shared GitHub identity is self-attested, so **owner personally merges** and separately approves deployment, publication and substantive content decisions. Preserve the full 200 source cards with stable IDs, archived sources, exactly 100 curated Sugar Coated mode cards, offline PWA operation and disabled Cutthroat Honest mode until accepted content/provenance exist. No unapproved public release.

**Copyable message:** To <Claude|ChatGPT>: inspect `detratech/plot-twist` PR #<N> (<URL>) at verified SHA <SHA>. Read both journals, current development handoff, README and PR comments. Complete <single next task> and post actual tests to GitHub. Update only your journal. No merge or deployment.

## Review-only cycles, journal branch selection and concurrency

**When independently reviewing an existing implementation PR, read both agent journals from the named PR's head branch and post findings exclusively as an exact-head PR review/comment. Do not commit to the implementer's branch, and do not create a journal-only commit to record a review.** This rule overrides any generic instruction above to update a journal "at every handoff" when the activity is review-only.

Only while owning an explicitly assigned **implementation/writing branch** may an agent update its own journal there, at a meaningful work checkpoint before handing off. The other agent's journal remains read-only. When two feature PRs are active, keep a concise, clearly labeled latest checkpoint **per PR** and reconcile journal changes during later integrations; do not overwrite another branch's checkpoint. Read actual current PR discussions, commits, tests and authoritative project handoff before trusting journal state. After initial transition setup, ChatGPT owns updates to `AGENTS.md` and Claude owns updates to `CLAUDE.md`; entry-file edits follow normal branch ownership and review rules. No review-only journal edits are required.
