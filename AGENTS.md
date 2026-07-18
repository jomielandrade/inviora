# Inviora Development Guidelines

## Project

Inviora is a digital invitation and RSVP service initially focused on weddings
in the Philippines, with future expansion to other celebrations.

Tagline: "Beautiful invitations. Simpler celebrations."

The initial release is a single-page marketing website designed to convert
visitors into Facebook Messenger inquiries.

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui using Base UI primitives
- Motion for React
- Lucide icons
- npm

Use the existing project versions and conventions. Do not replace the package
manager or re-scaffold the application.

## Brand System

### Colors

Use semantic CSS variables instead of repeating hexadecimal values.

- Midnight Navy: `#0E1B3D`
- Champagne Gold: `#E7A23A`
- Warm Ivory: `#F8F4EC`
- Dusty Blue: `#7089A8`

Champagne Gold is a controlled accent. Do not use it for small body text on
Warm Ivory.

### Typography

- Display headings: Cormorant Garamond, semibold
- Body, navigation, buttons, labels, and UI: Manrope

Load fonts using `next/font/google`.

### Visual Direction

The interface should feel:

- Premium
- Romantic
- Minimal
- Modern
- Technically polished

Use generous whitespace, editorial typography, fine borders, restrained
shadows, invitation-inspired geometry, and subtle motion.

Avoid excessive gradients, glassmorphism, pink branding, decorative clutter,
large amounts of floral artwork, glowing effects, and unnecessary animation.

### Brand Voice

Use language that is:

- Warm
- Clear
- Refined
- Helpful
- Modern

Lead with benefits for couples and guests. Avoid technical jargon, exaggerated
claims, and overly ornate language.

## Logo Usage

Official brand assets belong in:

- `public/brand/inviora-logo-light.png`
- `public/brand/inviora-logo-dark.png`

Use the light logo on Warm Ivory or white surfaces. Use the dark-background
logo on Midnight Navy.

Never distort, crop, recolor, rotate, or recreate the logo with CSS.

If an official asset is missing, use a temporary text wordmark and report the
missing asset.

## Architecture

- Prefer Server Components.
- Add `"use client"` only when interaction or animation requires it.
- Keep repeated content in typed configuration objects.
- Create focused reusable components.
- Avoid oversized page components and unnecessary abstractions.
- Do not use `any`.
- Preserve unrelated existing changes.
- Follow existing repository conventions before introducing new patterns.

## Scope Restrictions

The landing-page MVP must not include:

- Authentication
- Database integration
- Admin dashboard
- Payment or checkout
- Functional RSVP backend
- Invented analytics
- Fake testimonials, statistics, ratings, awards, or customer logos

Template previews may use designed placeholders but must be labeled
"Preview coming soon."

Unavailable event categories must be labeled "Coming soon."

## Packages

Keep package information centralized in typed configuration.

Current launch prices (displayed):

- Essential: `₱1,499` (regular `₱1,999`)
- Signature: `₱2,499` (regular `₱3,499`)
- Bespoke: `Starts at ₱6,999` (regular `Starts at ₱9,999`)

Signature must be marked "Most Popular."

Do not change pricing, package names, or package inclusions without reporting
the proposed change first.

## Contact Configuration

All main conversion buttons should use one centrally configured Facebook
Messenger URL.

Never invent a Facebook page username. If the real URL is unavailable, use an
obvious placeholder and report it as a remaining task.

## Accessibility

- Use semantic HTML and landmarks.
- Maintain WCAG AA text contrast.
- Provide visible focus states.
- Support keyboard navigation.
- Use accessible labels for icon-only controls.
- Keep touch targets at least 44px.
- Respect `prefers-reduced-motion`.
- Ensure accordions and mobile navigation expose correct expanded states.
- Do not communicate meaning through color alone.

## Responsive Design

Test approximately:

- 320px
- 390px
- 768px
- 1024px
- 1440px

The page must not have horizontal overflow at 320px. Ensure sticky navigation
does not cover anchor targets.

## Verification

Before completing an implementation task, run the applicable commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
```
