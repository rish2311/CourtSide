---
name: Elite Athleticism
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#404944'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#1b6b51'
  on-secondary: '#ffffff'
  secondary-container: '#a6f2d1'
  on-secondary-container: '#237157'
  tertiary: '#4f1f19'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b342d'
  on-tertiary-container: '#ea9e93'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#a6f2d1'
  secondary-fixed-dim: '#8bd6b6'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#00513b'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#380d08'
  on-tertiary-fixed-variant: '#6e372f'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is rooted in **Minimalist Luxury**, blending the high-precision utility of developer tools with the expansive, breathable elegance of premium hospitality platforms. The target audience consists of discerning athletes and club members who value efficiency and aesthetic prestige. 

The aesthetic is characterized by **"Performance Minimalism"**: every element must serve a functional purpose while maintaining a sophisticated, high-contrast visual rhythm. We utilize heavy whitespace to reduce cognitive load and high-quality typography to establish an editorial authority. Subtle glassmorphism is employed for transient surfaces, while core content sits on structured, high-contrast foundations.

## Colors

The palette is anchored by **Deep Emerald** and **Forest Green**, evoking the prestige of manicured grass courts and exclusive clubhouses. 

- **Primary & Secondary:** Used for brand identity, active states, and primary navigation elements.
- **Neutral Palette:** Utilizes **Charcoal** for primary text and **Slate** for secondary metadata, ensuring a crisp, high-contrast reading experience against **Pure White** backgrounds.
- **Soft Lime (Accent):** Reserved exclusively for high-priority calls to action (CTAs). It serves as a visual "jolt" of energy against the dark greens.
- **Electric Blue:** Used sparingly for technical indicators, status updates, and interactive data visualizations.

## Typography

This design system uses a dual-font strategy to balance technical precision with readability. **Geist** provides a geometric, high-performance feel for headlines and functional labels, while **Inter** handles body copy for maximum legibility.

The typographic hierarchy follows an editorial scale with aggressive negative letter-spacing on larger headings to create a "locked-in" professional look. Use `label-sm` for category tags and overlines to establish clear content buckets.

## Layout & Spacing

The design system employs a **Strict 8pt Grid** and a 12-column fluid layout for desktop environments. To achieve the "Portfolio-worthy" look, padding should be intentionally generous.

- **Desktop:** 12 columns, 24px gutters, 80px side margins.
- **Tablet:** 8 columns, 16px gutters, 40px side margins.
- **Mobile:** 4 columns, 16px gutters, 20px side margins.

Content should be grouped into logical sections separated by `xl` spacing to allow the eye to rest. Internal card padding should never drop below `md` (24px).

## Elevation & Depth

We utilize a three-tier elevation model to create a sense of organized hierarchy without clutter:

1.  **Level 0 (Flat):** The main background (Pure White). All primary content rests here.
2.  **Level 1 (Soft Elevation):** Content cards. These use a very subtle 1px border (`#E5E7EB`) and a soft, highly diffused shadow: `0 4px 20px rgba(0, 0, 0, 0.03)`.
3.  **Level 2 (Glassmorphism):** Floating navigation bars, dropdowns, and modal overlays. These use a `backdrop-filter: blur(12px)` with a semi-transparent white background (`rgba(255, 255, 255, 0.8)`) and a crisp 1px "glass" stroke.

## Shapes

The design system favors **Soft** geometry. While the vibe is modern, we avoid overly "bubbly" aesthetics to maintain a professional, high-end sporting atmosphere. 

- **Standard Buttons/Inputs:** 4px (Soft) radius for a precise, "engineered" look.
- **Cards & Containers:** 8px (Rounded-lg) radius to define clear sections.
- **Badges/Chips:** Full pill (Rounded-xl) for status indicators.

## Components

### Buttons
- **Primary:** Forest Green background, White text. 4px border-radius. High-intensity hover state (Deep Emerald).
- **CTA:** Soft Lime background, Charcoal text. Use sparingly for "Book Now" or "Check Availability."
- **Secondary:** Transparent background, Charcoal 1px border.

### Inputs
- **Text Fields:** 1px Slate border, 24px horizontal padding. Focus state uses a 2px Deep Emerald ring with 0px offset.
- **Selects:** Custom chevron icons with technical, thin strokes.

### Cards
- **Booking Card:** Features a large image with a 1:1 or 4:5 aspect ratio, followed by Geist-based metadata. Use "Level 1" shadows.
- **Metric Card:** Used for performance stats, featuring Electric Blue accents and large `headline-xl` numbers.

### Navigation
- **Floating Nav:** Centered at the bottom or top of the viewport. Uses "Level 2" glassmorphism with a hairline border and subtle charcoal text for links.