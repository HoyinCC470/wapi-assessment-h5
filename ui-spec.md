# WAPI H5 UI Spec

## Baseline Version

- Current stable baseline: `0.1.3`
- `0.1.0` remains the original approved UI handoff point.
- `0.1.2` is the assessment behavior and scoring baseline.
- `0.1.3` adds local draft persistence and is the current ongoing PM, UI, and development collaboration baseline.
- New requests should build on this baseline unless a later version is explicitly defined.

## Scope

This document defines the UI baseline for the WAPI H5 prototype.

The current source of truth is the finished register page in:

- `src/App.jsx`
- `src/styles.css`

All later pages should reuse this visual system unless a page has a strong content-specific reason to diverge.

## Design Principles

1. Keep the layout clean, bright, and readable.
2. Use one shared container language across pages.
3. Keep component states simple: default, active, disabled.
4. Support both mobile-first H5 and stretched desktop layouts with the same component system.
5. Prefer real HTML/CSS layouts over pasted screenshot slices.

## Foundation Tokens

### Core colors

- Page blue background: `#e7f2ff`
- Primary text: `#1b1b21`
- Secondary text: `#777896`
- Input border default: `#d9e0f2`
- Card background: `#ffffff`
- Soft option background: `#f7f5fa`
- Active accent: `#f49700`
- Dark CTA: `#1b1b21`

### Radius

- Main white card: `28px`
- Desktop main white card: `32px`
- Input and group containers: `15px`
- Option rows: `10px`
- Primary button: `17px`

### Typography

- Product title:
  - Mobile: `clamp(24px, 7vw, 28px)`
  - Desktop: `clamp(42px, 5vw, 64px)`
  - Weight: `800`
- Field label / legend: `13px`, `600`
- Input text: `16px` mobile, `17px` desktop, `600`
- Option text: `14px`, `600`
- CTA text: `14px`, `700`

### Type hierarchy

- Page-level title:
  - Used for product name and the most important screen headline
  - Weight: `700-800`
- Section title:
  - Used for modules such as `Voice Identity`, `Expression Profile`
  - Weight: `600`
- Card title:
  - Used inside result cards and highlight modules
  - Weight: `600`
- Body emphasis:
  - Used for option rows, short UI copy, actionable labels
  - Weight: `500`
- Secondary body:
  - Used for helper text, Chinese subtitle, supporting description
  - Weight: `400-500`
- Micro label:
  - Used for field labels, legends, tiny meta text
  - Weight: `500-600`

### Type sizing rules

- Large headline:
  - Mobile: `22-28px`
  - Desktop: `30-64px`
- Medium section title:
  - Mobile: `18-22px`
  - Desktop: `22-28px`
- Primary body:
  - Mobile: `14-16px`
  - Desktop: `15-17px`
- Secondary body:
  - Mobile: `12-13px`
  - Desktop: `13-14px`
- Micro text:
  - Mobile and desktop: `10-13px`

### Spacing

- Page side padding: `16px` mobile
- Card inner padding:
  - Mobile: `clamp(22px, 4svh, 28px) 16px clamp(20px, 4svh, 28px)`
  - Desktop: `clamp(34px, 4vw, 56px)`
- Two-column field gap:
  - Mobile: `clamp(18px, 6vw, 32px)`
  - Desktop: `24px`

## Page Shell

### Mobile

- Use `.phone-shell` as the outer page shell.
- Width stays at `375px` visual basis with `max-width: 100vw`.
- Pages should feel like a real H5 page, not a phone screenshot.
- Do not recreate status bar, home indicator, or device chrome.

### Desktop

- Desktop should not use a separate design language.
- Keep the same vertical page structure as mobile.
- Top branding remains centered and stacked vertically.
- Main white content container expands horizontally instead of staying narrow.

## Layout Rules

### Register page structure

Order must stay:

1. Logo
2. Page title
3. Main white card
4. Fields and groups inside the card
5. CTA at the end of the card

### Desktop expansion rule

- The register card should stretch with `width: min(1180px, 100%)`.
- The desktop register page remains vertically stacked and centered.
- Do not split logo and title into a left-right hero layout.

### Card behavior

- White card height should be content-driven.
- Do not force the CTA to the bottom with `margin-top: auto`.
- Vertical rhythm should come from explicit spacing between sections.

## Component Spec

### 1. Branding block

- Logo uses transparent asset: `public/wapi-logo-transparent.png`
- Logo and title are centered on mobile and desktop.
- Title stays on its own line under the logo.

### 2. Standard input field

Structure:

- Outer wrapper: `.floating-field`
- Floating label: `span`
- Control: `input`

Rules:

- Input text must be vertically centered.
- Use `padding: 0 20px`
- Do not push text downward to make room for the label.
- Floating label sits on top of the border opening, not inside the field body.

States:

- Default: gray border `#d9e0f2`
- Focus / active: orange border `#f49700`
- No blue active state

### 3. Two-column field row

Used for:

- `Your Name`
- `Your Age`

Rules:

- Mobile: two columns
- Desktop: still two columns inside the larger card
- Each field keeps identical height and visual weight

### 4. Wide field

Used for:

- `Your Speaking Experience`
- `Test Code`

Rules:

- Span full available width on mobile
- Span both columns in desktop card when needed
- Same border, height, label style, and input text style as standard input fields

### 5. Radio group

Structure:

- Outer group: `.radio-group`
- Group title: `legend`
- Each option row: `.radio-row`

Rules:

- Group border matches input border style
- Inner rows sit on soft filled background
- Row content is vertically centered
- Multi-line text is allowed when needed

States:

- Default radio: white center, gray border
- Checked radio: orange fill with orange ring
- No blue radio state

### 6. Primary CTA

Used for:

- `Login`
- Future start / submit actions on pages with equivalent hierarchy

Rules:

- Background: dark `#1b1b21`
- Text: white
- Full width on mobile
- Centered with max width on desktop
- Keep it close to the final form control, using explicit top spacing

## Interaction Rules

Only use these states:

1. Default
2. Active / selected
3. Disabled if the page needs it later

Do not introduce:

- Blue focus borders for register form fields
- Multiple competing selected states
- Extra heavy border states that do not exist elsewhere in the system

## Responsive Rules

### Mobile-first

- Build all pages from the mobile structure first.
- Use `clamp()` and `svh`-aware spacing where helpful.
- Avoid fixed card heights unless the content is truly fixed.

### Desktop adaptation

- Preserve the same component language.
- Expand width first before inventing new layout regions.
- Keep important content centered.
- Let the main content card breathe horizontally.

## Reuse Rules For Later Pages

When building the question pages and result page, reuse these decisions:

- Same page shell logic
- Same border color system
- Same card radius system
- Same label and body typography hierarchy
- Same CTA visual hierarchy
- Same mobile-first, desktop-expanded behavior

Allowed variation by page:

- Illustration placement
- Progress indicator
- Answer option layout
- Result visualization modules

Not allowed without deliberate redesign:

- New accent colors
- New border logic
- New card language
- New desktop layout philosophy

## Build Checklist

Before treating a new page as done, check:

1. Is the page still visually part of the same product?
2. Are labels, inputs, and buttons using the same container language?
3. Does desktop expand the layout instead of breaking it into an unrelated composition?
4. Are interactive states still limited to the approved system?
5. Can the page be implemented as real HTML/CSS without screenshot dependence?

## Implementation Note

Current implementation already contains the baseline styles in `src/styles.css`.

If we continue building more pages, the next cleanup step should be extracting shared UI primitives such as:

- `PageShell`
- `ContentCard`
- `Field`
- `FieldRow`
- `RadioGroup`
- `PrimaryButton`

That extraction should follow this spec rather than redefine it.
