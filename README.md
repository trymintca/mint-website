# MiNT Home Services Website

Official website for **MiNT Home Services**.

**Production Domain:** https://trymint.ca

------------------------------------------------------------------------

## Purpose

This repository is the single source of truth for the MiNT Home Services
website.

The website should project trust, professionalism, premium quality,
local expertise, speed, and simplicity.

Every change should improve at least one of:

-   User experience
-   Conversion rate
-   Maintainability
-   SEO
-   Performance

------------------------------------------------------------------------

## Company

MiNT Home Services serves:

-   South Surrey
-   White Rock

Primary services:

-   Window Cleaning
-   Gutter Cleaning
-   Pressure Washing
-   Soft Washing
-   Moss Removal
-   Christmas Light Installation (Seasonal)

Do not expand service areas unless explicitly requested.

------------------------------------------------------------------------

## Tech Stack

-   HTML
-   CSS
-   Vanilla JavaScript

Avoid unnecessary frameworks and dependencies.

------------------------------------------------------------------------

## Design Principles

Priorities:

1.  Conversion rate
2.  Mobile-first UX
3.  Fast loading
4.  Accessibility
5.  Local SEO

Avoid generic AI-looking layouts, glassmorphism, excessive gradients,
and unnecessary animations.

Prefer excellent spacing, strong typography, realistic photography,
semantic HTML, and clean layouts.

------------------------------------------------------------------------

## Branding

-   Preserve the official MiNT logo.
-   Never recolor or distort the logo.
-   Keep branding consistent.

------------------------------------------------------------------------

## Forms

Quote forms use FormSubmit.

Requirements:

-   Submit every visible field.
-   Email field should use `name="email"`.
-   Do not use `_replyto` as the primary email field.

Verify validation, spam protection, redirect behavior, and successful
submission.

------------------------------------------------------------------------

## Code Style

### HTML

-   Semantic
-   Accessible
-   Consistent

### CSS

-   Organized
-   Reusable
-   Minimal duplication

### JavaScript

-   Readable
-   Small
-   Maintainable

------------------------------------------------------------------------

## Workflow

1.  Understand the current implementation.
2.  Explain the plan for significant changes.
3.  Make the smallest reasonable change.
4.  Test if possible.
5.  Summarize what changed.

Do not refactor unrelated code without approval.

------------------------------------------------------------------------

## Deployment

Production: https://trymint.ca

Cloudflare Pages must use:

- Build command: `npm run build`
- Build output directory: `dist`

Never deploy the repository root. The allowlisted build prevents `.git`, source
archives, documentation, and development files from becoming public assets.

Run `npm run check` before deployment. The same build and security checks run in
GitHub Actions on every pull request and push to `main`.

Cloudflare zone settings must also enforce:

- SSL/TLS mode: Full (strict)
- Always Use HTTPS: On
- Minimum TLS version: 1.2

After deployment, verify that HTTP redirects to HTTPS and `/.git/HEAD` returns
404. Purge the Cloudflare cache after correcting the exposed Git metadata.

------------------------------------------------------------------------

## Future Integrations

-   EspoCRM
-   Google Analytics
-   Google Search Console
-   Microsoft Clarity
-   Online booking
-   Customer portal

------------------------------------------------------------------------

## AI Contributor Guidelines

-   Think like a senior frontend engineer.
-   Optimize for maintainability and conversions.
-   Challenge poor ideas with evidence.
-   Ask before making production-impacting changes.
