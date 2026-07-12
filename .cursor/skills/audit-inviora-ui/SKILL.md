---
name: audit-inviora-ui
description: Audit and refine the Inviora landing page with existing Playwright screenshots, Axe reports, browser inspection, and brand guidelines. Use when reviewing Inviora UI/UX, responsive screenshots, visual hierarchy, typography, spacing, accessibility, brand compliance, visual regressions, or when asked to run audit-only, audit-and-fix, approve-baseline, or regression-check workflows.
---

# Audit Inviora UI

Audit the rendered experience before editing code. Treat automated checks as evidence and the Inviora brand guidelines as the visual source of truth.

## Choose a mode

- `audit-only`: capture, inspect, and report. Do not edit application code.
- `audit-and-fix`: run the audit, fix confirmed critical/high issues, and verify. Stop after two fix loops.
- `approve-baseline`: update visual baselines only after explicit user approval of the current design.
- `regression-check`: compare against approved baselines. Never update them.

Default to `audit-only` when the user does not name a mode.

## Preflight

1. Read `AGENTS.md`, `docs/brand/Inviora_Brand_Guidelines.pdf`, `docs/prompts/Inviora-Cursor-Master-Prompt.md`, `package.json`, `playwright.config.*`, and the audit tests that exist.
2. Preserve repository conventions and unrelated changes.
3. Run `node <skill-dir>/scripts/check-audit-foundation.mjs` from the repository root. Use its output to locate scripts, screenshots, reports, and missing prerequisites.
4. Use existing npm scripts rather than inventing commands. Prefer `audit:ui`, `audit:a11y`, `audit:capture`, `test:visual`, and `test:visual:update` when present.
5. If the test harness is broken, repair only the harness before auditing the application.

## Capture rendered evidence

1. Run the repository's combined UI audit script.
2. Keep useful reports even when a test fails because a product defect was detected.
3. Verify screenshots cover approximately 320, 390, 768, 1024, and 1440 pixels.
4. Confirm every expected landing-page section appears in full-page captures. Scroll-triggered Motion content must be activated before capture; never globally force hidden elements visible.
5. Inspect 390px and 1440px captures first, then use the other sizes to confirm responsive behavior.
6. Use the controlled browser when available. Otherwise inspect local screenshot files.

## Separate objective and visual findings

Record objective findings first:

- horizontal overflow and clipping
- broken or distorted images
- console errors and failed requests
- serious/critical Axe violations
- unreadable focus states and keyboard blockers
- layout shifts and missing content
- failed visual-regression assertions

Then read `references/visual-checklist.md` and evaluate composition, hierarchy, typography, spacing, CTA clarity, brand character, and responsive adaptation.

Do not confuse technical correctness with good design. A page can pass automated tests and still look generic, repetitive, or poorly composed.

## Write the report

Write `ui-audit/reports/latest.md` with:

1. mode, date, commit/branch when available, and evidence reviewed
2. executive summary of no more than eight bullets
3. objective test results
4. visual findings grouped as critical, high, medium, and low
5. exact section/component and likely source file for each finding
6. a concrete recommendation and acceptance check for each finding
7. brand-compliance notes
8. verification commands and results
9. unresolved judgment calls requiring user approval

Do not use vague findings such as “make it prettier.” State the observed problem, design consequence, and measurable or visually verifiable correction.

## Audit-only mode

- Do not edit application code, content, tokens, tests, or baselines.
- Generate the report and stop.
- Recommend at most three coherent improvement themes instead of a long list of disconnected polish ideas.

## Audit-and-fix mode

1. Start from `latest.md` or produce it if missing or stale.
2. Fix critical and high findings first. Keep each change tied to a report item.
3. Preserve official logos, exact core colors, package names/prices, business policy, and approved content.
4. Fix overflow at its source; never mask it with global `overflow-x-hidden`.
5. Preserve production animations. Do not disable Motion merely to make screenshots pass.
6. Prefer semantic tokens and shared components over scattered one-off values.
7. Run the objective checks after each fix batch, recapture screenshots, and compare the affected sections.
8. Stop after two fix-and-verify loops. Report remaining issues instead of continuing an uncontrolled redesign.

## Baseline modes

For `approve-baseline`:

- Require explicit user approval of the rendered design.
- Confirm all expected sections are visible and objective audits pass.
- Use the repository's existing baseline-update command.
- Record the approval in the report. Do not invent a baseline mechanism.

For `regression-check`:

- Run the existing comparison command without update flags.
- Report changed viewports and likely affected sections.
- Never accept new snapshots automatically.

## Quality boundaries

- Do not introduce unverified testimonials, statistics, reviews, or client logos.
- Do not add databases, authentication, payments, dashboards, or RSVP backends.
- Do not replace the approved palette with unrelated colors.
- Do not redesign package content while solving layout problems.
- Do not claim a viewport or interaction was reviewed unless evidence was actually inspected.
