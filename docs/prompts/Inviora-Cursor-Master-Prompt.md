# Inviora Landing Page — Cursor Pro Master Prompt

Copy everything below this line into Cursor Agent mode.

---

You are a senior product designer and frontend engineer. Build a polished, production-ready single-page landing website for **Inviora**, a digital invitation and RSVP service initially focused on weddings in the Philippines, with future expansion to other events and international customers.

Do not stop at a plan or provide sample snippets. Inspect the repository, implement the complete landing page, run the appropriate checks, fix issues you introduce, and report the files changed and verification results.

## 1. Product goal

The page must help engaged couples quickly understand Inviora, preview the invitation experience, compare packages, and start an inquiry through Facebook Messenger.

Primary conversion: **Message us on Facebook / Messenger**.

This is a marketing MVP only. Do **not** add authentication, a database, an admin dashboard, payments, checkout, or a working RSVP backend.

## 2. Repository-first instructions

Before editing:

1. Inspect the repository structure, package manager, framework version, existing components, styles, assets, linting, tests, and local project instructions such as `AGENTS.md`, `.cursor/rules`, or equivalent.
2. Preserve useful existing code and follow the repository's conventions. Do not overwrite unrelated user changes.
3. If the project is already configured, adapt to it instead of re-scaffolding.
4. If the repository is empty, scaffold with Next.js App Router, TypeScript, Tailwind CSS, and ESLint using the current stable project conventions.
5. Reuse an existing component system. If shadcn/ui is already installed, use it. Add only the components needed for this page.
6. Use the package manager indicated by the lockfile. Do not replace it.

Preferred stack when compatible with the repository:

- Next.js App Router
- TypeScript with strict typing
- Tailwind CSS v4
- shadcn/ui for accessible primitives
- Motion for React only for subtle, purposeful animation
- `next/font/google` for brand typography
- Lucide icons where icons improve comprehension

## 3. Inviora brand kit — mandatory

Brand positioning: minimalist digital invitations and RSVP experiences with a premium, romantic, and technical character.

Tagline: **Beautiful invitations. Simpler celebrations.**

### Color tokens

Create semantic CSS variables and reference the variables throughout the UI. Do not scatter raw hex values across components.

| Token             | Brand color    | Hex       | Primary use                                         |
| ----------------- | -------------- | --------- | --------------------------------------------------- |
| `--inviora-navy`  | Midnight Navy  | `#0E1B3D` | Primary text, buttons, dark sections, footer        |
| `--inviora-gold`  | Champagne Gold | `#E7A23A` | Controlled accent, highlights, badges, icon details |
| `--inviora-ivory` | Warm Ivory     | `#F8F4EC` | Main page background and light surfaces             |
| `--inviora-blue`  | Dusty Blue     | `#7089A8` | Secondary accents, labels, quiet supporting UI      |

Derive accessible border, muted-surface, and muted-text colors from these tokens while preserving the character of the palette. Maintain WCAG AA contrast for normal text and interactive controls. Champagne Gold should be an accent, not the default color for small body text on ivory.

### Typography

- Display headings: **Cormorant Garamond**, semibold.
- Navigation, body copy, buttons, labels, and product UI: **Manrope**, regular and semibold.
- Use fluid type with `clamp()` or equivalent responsive Tailwind utilities.
- Keep line lengths comfortable and hierarchy obvious.

### Logo use

- Use the supplied **Inviora primary light logo** on Warm Ivory or white.
- Use the supplied **Inviora primary dark logo** on Midnight Navy.
- Preserve the logo's aspect ratio and clear space. Never recolor, distort, crop, rotate, or rebuild the emblem with CSS.
- Place optimized logo files under a clear path such as `public/brand/` and render them with `next/image` where appropriate.
- If the repository does not contain the official logo files, use a clean text wordmark reading `INVIORA` as a temporary fallback and add a clear TODO. Do not invent a replacement logo.

### Brand voice

The voice must feel:

- Warm
- Clear
- Refined
- Helpful
- Modern

Use simple, reassuring language. Lead with benefits for couples and guests. Balance romantic warmth with digital clarity. Avoid ornate language, exaggerated sales claims, corporate jargon, and technical jargon.

### Visual direction

Build a premium **minimal tech/SaaS** experience softened by romantic invitation details.

Use:

- Generous whitespace and a calm editorial rhythm
- Strong typography and clean alignment
- Warm Ivory as the dominant light background
- Midnight Navy for authority and contrast
- Champagne Gold in restrained, intentional moments
- Dusty Blue for quiet supporting details
- Subtle invitation-inspired geometry: folded-paper lines, envelope edges, tasteful borders, or a small wax-seal-inspired accent
- Soft shadows, fine borders, and moderate corner radii
- Product/UI mockups that feel believable and clean

Avoid:

- Generic wedding-template visuals overloaded with flowers
- Pink as a core brand color
- Excessive gradients, glassmorphism, glow effects, or floating decorative blobs
- Gold body text on ivory
- Huge empty hero copy with no product proof
- A page made entirely from identical floating cards
- Stock imagery that does not directly help explain the product
- Excessive animation or parallax

## 4. Information architecture and content

Create the sections below in this order. Copy may be refined for clarity while preserving the meaning, prices, package names, and brand voice.

### A. Sticky header

- Light version over Warm Ivory, then a subtle border or surface change after scrolling if appropriate.
- Official logo or approved text-wordmark fallback.
- Desktop navigation anchors: `Templates`, `Features`, `Packages`, `FAQ`.
- Primary CTA: `Message us`.
- Accessible mobile menu with focus management, Escape-to-close behavior, clear labels, and minimum 44px touch targets.
- Smooth anchor navigation that respects reduced-motion preferences.

### B. Hero

Eyebrow: `Digital invitations, thoughtfully made`

Headline: **A beautiful invitation. A simpler way to celebrate.**

Supporting copy: `Share your story, collect RSVPs, and keep every wedding detail in one elegant digital experience.`

Primary CTA: `Message us on Facebook`

Secondary CTA: `Explore templates`

Add a concise reassurance line such as: `Made for modern Filipino couples · Mobile-friendly · Easy for every guest`

Hero visual: create a responsive product mockup showing an elegant invitation on a phone/browser surface plus a small RSVP confirmation state. Use local placeholder artwork or CSS/SVG-native UI shapes where appropriate; do not fake an official template screenshot. The visual should demonstrate the product, not become decorative clutter.

### C. Trust/value strip

Use three short benefits rather than unverified statistics:

- `One link for every detail`
- `Simple RSVP for every guest`
- `Designed beautifully for mobile`

Do not invent customer counts, ratings, awards, or testimonials.

### D. How it works

Heading: `From your story to their screen`

Three steps:

1. `Choose your style` — Start from a curated wedding template.
2. `Share your details` — Send the couple's content, photos, schedule, and guest information.
3. `Invite and celebrate` — Share the finished link and receive RSVPs with less follow-up.

Keep the explanation simple. Do not imply instant self-service if the current service is still handled manually.

### E. Wedding template preview

Anchor ID: `templates`

Heading: `Wedding invitations made to feel like yours`

Show **three polished placeholder template cards**. Use tasteful names such as:

- `The Classic Vow`
- `Modern Romance`
- `Quiet Garden`

Each card must clearly display `Preview coming soon` and use intentionally designed placeholder art. Add a disabled or non-deceptive `Preview coming soon` control. Do not create broken links or imply that demos already exist.

Add a note: `More wedding designs are being prepared.`

### F. Product features

Anchor ID: `features`

Heading: `Everything guests need, beautifully organized`

Feature set:

- Personalized invitation experience
- Mobile-friendly RSVP form
- Wedding story
- Event timeline and venue details
- Photo gallery
- Guest-friendly sharing
- RSVP tracking, where included by package
- Custom sections for higher packages

Use icons sparingly and explain the benefit of each feature in one short sentence.

### G. Packages

Anchor ID: `packages`

Heading: `Choose the experience that fits your celebration`

Render responsive, accessible pricing cards and keep all package data in one typed configuration object so prices and features can be updated without editing the component markup.

#### Essential — ₱1,499 (regular ₱1,999)

Positioning: `A polished digital invitation with the details your guests need.`

Include:

- Curated template selection
- RSVP form
- Wedding story
- Event timeline and venue details
- Photo gallery
- Mobile-friendly invitation link

CTA: `Choose Essential`

#### Signature — ₱2,499 (regular ₱3,499)

Badge: `Most Popular`

Positioning: `More personalization, more guest flexibility, and easier RSVP management.`

Include everything in Essential, plus:

- Signature template options
- Personalized guest links
- Advanced RSVP fields
- Full RSVP management dashboard
- Expanded or unlimited gallery, subject to final service policy
- Priority customization

CTA: `Choose Signature`

#### Bespoke — Starts at ₱6,999 (regular Starts at ₱9,999)

Positioning: `A fully custom digital experience designed around your celebration.`

Include:

- Fully custom visual direction
- Custom page structure and sections
- Custom RSVP flow
- Personalized guest links
- Full RSVP management dashboard
- Custom integrations scoped separately

CTA: `Discuss a bespoke invitation`

Add a short note below pricing: `Launch pricing shown. Final inclusions and turnaround time are confirmed before the project begins.`

Do not add checkout or payment controls. Every package CTA should open the same Messenger inquiry destination with an optional prefilled package message if the final link supports it.

### H. Full package comparison

Add an expandable `Compare all features` section beneath the pricing cards.

Requirements:

- Use an accessible table on desktop.
- On small screens, preserve headers and meaning without forcing an unreadable compressed table. A horizontally scrollable table with a visible cue or grouped comparison rows is acceptable.
- Use text such as `Included`, `Not included`, `Custom`, or a stated limit; do not rely on color or check icons alone.
- Derive comparison values from the same package configuration where practical to prevent contradictions.
- Where the exact commercial limit has not yet been finalized, label it `To be confirmed` rather than inventing a number.

### I. Other celebrations

Heading: `Made for every celebration—soon`

Display coming-soon items for:

- Birthdays
- Baptisms
- Debuts
- Anniversaries
- Corporate events

Every item must be clearly tagged `Coming soon`. Keep weddings visually identified as the currently available category. Do not add working links for unavailable services.

### J. FAQ

Anchor ID: `faq`

Use an accessible accordion. Include concise answers for:

1. `How does the process work?`
2. `How long does an invitation take to prepare?`
3. `Can we use our own design or request custom sections?`
4. `How do guests submit their RSVP?`
5. `Can details be updated after the invitation is published?`
6. `Do you provide a custom domain?`

Do not invent rigid turnaround times, revision counts, hosting terms, domain inclusions, or support guarantees. Use careful language such as `confirmed based on your package and project scope` where policy is not finalized.

### K. Final CTA

Use a Midnight Navy section and the dark-background logo.

Heading: `Ready to make inviting feel simpler?`

Body: `Tell us about your celebration and we'll help you choose the right Inviora experience.`

CTA: `Message Inviora`

### L. Footer

Include:

- Inviora logo/wordmark
- Tagline: `Beautiful invitations. Simpler celebrations.`
- Navigation anchors
- Facebook/Messenger link
- Dynamic copyright year
- `Inviora Digital` as the business identity where appropriate
- Placeholder links for Privacy and Terms only if corresponding pages exist; otherwise omit them rather than linking to `#`

## 5. CTA and configuration behavior

Create a central site configuration file for:

- Brand/business name
- Messenger URL
- Navigation links
- Package details
- Social links
- Contact details if supplied in the repository

If no real Messenger URL exists in the repository, use an obvious typed placeholder such as `https://m.me/REPLACE_WITH_INVIORA_PAGE` in the configuration file, surface one implementation TODO, and ensure the UI remains functional. Do not invent a Facebook page username.

External links must use safe `target` and `rel` behavior where applicable. Track no personal data and add no analytics unless the repository already has an approved setup.

## 6. Component and code expectations

- Use semantic landmarks: header, nav, main, sections, and footer.
- Split the page into focused reusable components; avoid one oversized page component.
- Keep repeated content in typed data/configuration rather than duplicating markup.
- Prefer Server Components. Add `"use client"` only for interactions or motion that require it.
- Keep the component API simple and avoid premature abstractions.
- Use clean naming and no `any` types.
- Avoid hydration errors, layout shifts, and console warnings.
- Use optimized local assets and explicit image dimensions or stable aspect ratios.
- Use responsive containers and test narrow mobile widths, tablet, laptop, and large desktop layouts.
- Ensure the sticky header does not cover anchor targets.
- Use visible focus states in both light and dark surfaces.
- Support keyboard navigation throughout.
- Respect `prefers-reduced-motion` for smooth scrolling and animation.
- Ensure interactive controls communicate hover, focus, active, disabled, and expanded states.

## 7. Motion direction

Motion should make the page feel refined, never busy.

- Use gentle fade/reveal transitions with small vertical movement.
- Stagger only small related groups such as feature or package cards.
- Keep durations roughly 200–500ms.
- Avoid looping motion, aggressive scale effects, and scroll-jacking.
- Disable or simplify motion when reduced motion is preferred.
- Do not make core content depend on JavaScript animation to become visible.

## 8. SEO and metadata

Add complete page metadata using the project framework:

- Title: `Inviora | Beautiful Digital Invitations & RSVP Experiences`
- Description: `Elegant digital wedding invitations and simpler RSVP experiences for modern celebrations.`
- Canonical URL only if a confirmed production domain exists in repository configuration.
- Open Graph and Twitter metadata using a local placeholder image only if a suitable asset exists.
- Favicon/app icons based on official brand assets if available.
- Appropriate robots behavior for production; do not hardcode a fake domain.

Add valid structured data only if the information is factual and complete. Do not invent reviews, ratings, address, phone number, founding date, or business details.

## 9. Quality bar and acceptance criteria

The implementation is complete only when:

- The landing page contains every required section in the correct order.
- It clearly feels like Inviora, using the four exact brand colors and two brand fonts.
- The design balances premium romance with modern product clarity.
- Package names and displayed launch prices are exactly: Essential `₱1,499`, Signature `₱2,499`, Bespoke `Starts at ₱6,999`.
- Signature is visually marked `Most Popular` without making the other options look disabled.
- Wedding templates are explicitly placeholders with `Preview coming soon`.
- Other event categories are explicitly marked `Coming soon`.
- All primary CTAs use the central Messenger configuration.
- No fake statistics, testimonials, reviews, or customer logos appear.
- No database, authentication, payment, admin, or RSVP backend is added.
- The layout works without horizontal overflow at 320px width.
- Keyboard navigation, focus states, headings, labels, accordion behavior, and mobile navigation are accessible.
- Reduced-motion preferences are respected.
- The page has no obvious CLS, broken images, dead links, TypeScript errors, lint errors, or browser-console warnings caused by the implementation.
- Content remains readable and usable if motion fails or JavaScript loads slowly.

## 10. Verification workflow

After implementation:

1. Run the repository's formatter if configured.
2. Run lint.
3. Run TypeScript type checking.
4. Run the relevant tests if present.
5. Run a production build.
6. Start or use the local preview and visually inspect at approximately 320px, 390px, 768px, 1024px, and 1440px widths.
7. Check keyboard navigation, mobile menu, FAQ accordion, comparison expansion, anchor links, and every CTA.
8. Fix issues introduced by this work.

If browser automation or screenshot tools are available, capture desktop and mobile screenshots and use them to check spacing, typography, overflow, contrast, and section rhythm. Do not claim visual verification if it was not actually performed.

## 11. Final response format

When finished, respond with:

1. A concise summary of the completed landing page.
2. The important files created or changed.
3. Verification commands run and whether they passed.
4. Any remaining blocker or exact manual replacement still required, especially the official logo assets or Messenger URL.

Do not merely repeat this brief. Implement it.
