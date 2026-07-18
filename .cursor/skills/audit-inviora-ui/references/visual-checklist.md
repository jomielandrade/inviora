# Inviora Visual Audit Checklist

Use this checklist after objective Playwright and Axe results. Support every finding with a screenshot, browser observation, or concrete DOM/style evidence.

## Brand anchors

- Midnight Navy `#0E1B3D`: authority, primary text, primary controls, dark sections.
- Champagne Gold `#E7A23A`: restrained emphasis and decorative detail; avoid small text on ivory.
- Warm Ivory `#F8F4EC`: dominant light background and calm negative space.
- Dusty Blue `#7089A8`: secondary emphasis and quiet supporting detail; avoid low-contrast small text.
- Cormorant Garamond semibold: display headings.
- Manrope regular/semibold: body, navigation, controls, labels, and product UI.
- Voice: warm, clear, refined, helpful, and modern.
- Character: premium, romantic, minimalist, and technically polished.

## Composition and hierarchy

- Confirm the hero communicates product, audience, and primary action within one viewport on common laptop and mobile sizes.
- Check that the product visual proves what Inviora is instead of acting as generic decoration.
- Ensure section order creates a persuasive story: promise, proof, process, templates, features, packages, future events, FAQ, final CTA.
- Flag repeated grids or identical cards that make the page feel assembled from a template.
- Look for deliberate changes in composition, scale, surface, or alignment between adjacent sections.
- Ensure the primary Messenger action is visually dominant without appearing in every block.

## Typography

- Confirm heading and body font roles are consistent.
- Check that display headings retain elegance without becoming fragile, overly thin, or difficult to scan.
- Keep body line length approximately 45–75 characters on desktop.
- Check fluid type scaling and line breaks at 320px and 390px.
- Flag excessive uppercase, tracking, tiny labels, and muted copy that weakens readability.
- Ensure price, package name, and CTA hierarchy is immediate.

## Spacing and rhythm

- Compare section padding, heading-to-copy spacing, grid gaps, and card padding across the page.
- Flag uniform spacing that removes emphasis as well as arbitrary spacing that breaks rhythm.
- Check alignment edges across headers, text blocks, cards, and media.
- Confirm mobile spacing is intentionally reduced rather than merely stacked.
- Look for crowded card interiors, orphaned headings, and empty areas without purpose.

## Color and surfaces

- Verify the four core colors remain recognizable and restrained.
- Use gold as emphasis, not as a default text color.
- Check derived muted colors against their actual backgrounds.
- Avoid excessive gradients, glassmorphism, glow, pink branding, and decorative blobs.
- Ensure dark sections use the correct logo and readable foreground hierarchy.
- Check borders and shadows are subtle and consistent rather than stacking multiple elevation styles.

## Components and interaction

- Confirm controls look interactive in default, hover, focus, active, disabled, and expanded states.
- Check sticky navigation, mobile menu, accordions, package comparison, and anchor links with keyboard and pointer input.
- Ensure cards are used for true grouping, not every piece of content.
- Verify decorative invitation geometry supports the story without obstructing content.
- Confirm touch targets are at least 44px and focus indicators remain visible on light and dark surfaces.

## Motion

- Verify scroll-triggered content appears when entering the viewport and remains visible after animation.
- Keep most transitions roughly 200–500ms with modest distance and scale.
- Flag looping motion, aggressive parallax, scroll-jacking, and simultaneous animation of large page regions.
- Check reduced-motion mode retains every piece of content and interaction.
- Ensure automated screenshots activate viewport-triggered animations before capture rather than disabling production behavior.

## Responsive adaptation

- At 320px: no horizontal overflow; prices, buttons, badges, and long labels wrap cleanly.
- At 390px: hero, cards, and CTA grouping should feel intentionally composed for mobile.
- At 768px: avoid awkward half-desktop layouts and oversized empty space.
- At 1024px: confirm navigation, grids, and hero balance do not collide.
- At 1440px: cap line lengths and content widths so the page does not become sparse or stretched.
- Check that decorative elements are repositioned or removed when they compete with content.

## Content integrity

- Package names and launch prices must remain Essential `₱1,499`, Signature `₱2,499`, Bespoke `Starts at ₱6,999` unless the user explicitly changes them.
- Signature remains marked `Most Popular`.
- Template placeholders say `Preview coming soon`.
- Weddings are featured as the available category with CTA to `#templates`; three coming-soon cards (Birthdays & debuts, Baptisms, Corporate Events) use subtle footer status labels and remain non-interactive.
- Do not invent social proof, customers, ratings, awards, turnaround guarantees, or policies.

## Severity guide

- Critical: prevents access, conversion, or essential comprehension; broken interaction; hidden content; severe overflow.
- High: major hierarchy, readability, brand, responsive, or accessibility defect that materially harms the experience.
- Medium: visible inconsistency or composition weakness with a contained impact.
- Low: polish opportunity that does not materially affect comprehension or task completion.

## Evidence standard

For every finding record:

- viewport and screenshot/browser state
- section or component
- observed issue
- user or brand consequence
- recommended correction
- acceptance check

Avoid aesthetic claims without evidence or a stated Inviora design principle.
