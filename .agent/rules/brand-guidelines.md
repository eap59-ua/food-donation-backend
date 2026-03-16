---
trigger: model_decision
description: When working on the User Interface (Frontend)
---

# Brand Guidelines — Generic Product UI 
**Version:** 1.0 (Draft)  
**Scope:** Product UI (web/PWA), content, accessibility, and technical implementation rules (Design Tokens).  
**Audience:** Design, Frontend, Backend, QA.  
**Goal:** Visual consistency + accessibility + unambiguous technical specs (avoid “interpretation” in handoff).

---

## 0) Brand principles (what the UI must convey)
1. **Trust & clarity:** understandable information, strong visual hierarchy, nothing “decorative” if it harms legibility.
2. **User Proximity:** human and respectful tone, action-oriented microcopy (“Report”, “View”, “Submit”).
3. **Order & predictability:** consistent components, repeatable patterns, well-defined states.
4. **Accessible by default:** minimum AA contrast, visible focus, correct keyboard and touch behavior.

---

## 1) Logo
### 1.1 Allowed versions
- **Primary (full color):** standard usage (preferred).
- **Dark monochrome:** on light backgrounds.
- **Light monochrome:** on dark/photographic backgrounds.

### 1.2 Clear space
- Keep free margin around the logo of at least **1× the thickness of the outer ring**.
- Do not place text, icons, buttons, or borders inside that area.

### 1.3 Minimum size (digital)
- **Recommended:** 96 px wide (or more).
- **Absolute minimum:** 48 px wide. 

### 1.4 Allowed backgrounds
- **Solid** backgrounds: `--color-surface-0` (light) or `--color-surface-0-dark` (dark).
- Image backgrounds: use a **container box** (card) with padding and a solid surface.

### 1.5 Incorrect usage (forbidden)
- Stretching/distorting.
- Applying heavy shadows, glows, outlines, or gradients.
- Placing it on low-contrast backgrounds without a container.

---

## 2) Color

### 2.1 Base palette (extracted from the logo)
| Role | Name | Hex | Usage |
|---|---|---:|---|
| Brand Dark | Navy | `#322B46` | primary text, icons, borders, alternative dark background |
| Brand Accent | Terracotta | `#BE682D` | large accents, badges, charts (not normal body text) |
| Brand Accent (AA) | Terracotta AA | `#B2612A` | **primary button** (with light text), emphasized links |
| Brand Green | Green | `#91BC4A` | positive accent, tags, illustration, secondary surfaces (with Navy text) |
| Brand Green (AA) | Green AA | `#617F2F` | “success” states when light text is required |
| Warm White | Warm White | `#FEFDFB` | main background, light surfaces |
| Neutral | Gray | `#736F74` | secondary text (controlled), subtle borders |

### 2.2 Functional system (semantic tokens)
Do not use hex values in components. Use intention-based tokens:
- **Primary action:** Terracotta AA
- **Secondary action:** Green surface with Navy text (to ensure contrast)
- **States:** success/warning/error/info with AA variants

### 2.3 Contrast rules (mandatory)
- Normal text and informative elements: **WCAG AA (≥ 4.5:1)**.
- Large text (≥ 24px regular or ≥ 18.66px bold): **≥ 3:1**.
- Don’t rely on color alone: always pair error/success with **message** + **icon** when relevant.

---

## 3) Typography
### 3.1 Recommended typeface
- **Primary:** Inter (if available).
- **Fallback:** system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif.

### 3.2 Units (hard rule)
- Do not define typography in **px**. Use **rem**.
- Use fluid type with `clamp()` for headings.

Example (reference only, do not copy/paste as-is):
    h1: clamp(2rem, 2vw + 1.5rem, 3.5rem)
    body: 1rem
    small: 0.875rem

### 3.3 Hierarchy (UI guidance)
- **H1:** main screens.
- **H2/H3:** sections inside a screen.
- **Body:** reading content.
- **Caption:** helpers, metadata.

---

## 4) Spacing and layout
### 4.1 8pt grid (mandatory)
All spacing must be multiples of 8 (and 4 for “micro” cases):
- `space-1 = 4px`
- `space-2 = 8px`
- `space-3 = 12px` (exception only; prefer 8/16)
- `space-4 = 16px`
- `space-6 = 24px`
- `space-8 = 32px`
- `space-10 = 40px`
- `space-12 = 48px`

Rules of thumb:
- Card padding: 16–24
- Item gaps: 8–16
- Section spacing: 24–32

### 4.2 Modern responsive strategy
- Avoid “magic” global media queries.
- Prefer **container queries** for reusable components (cards, lists, panels).

---

## 5) UI components (Framework-Agnostic + Tailwind)
### 5.1 Buttons
- **Primary:** `--color-action-primary` background (Terracotta AA) + light text.
- **Secondary:** outline/ghost with Navy; use Green as an accent (not as a white-text background).
- **Danger:** accessible red (not derived from the logo).

Required states: default, hover, focus, active, disabled, loading.

### 5.2 Forms
- Labels must always be visible (not placeholder-only).
- Errors: text + icon + aria-describedby.
- Real-time validation only when it helps (avoid “punishing” while typing).

### 5.3 Cards and lists
- Light surfaces: Warm White.
- Subtle borders (no heavy shadows).
- Minimal elevation (one soft shadow or border + background).

---

## 6) Accessibility (A11y) — Non-negotiable
### 6.1 Visible focus
- Never remove outlines without a replacement.
- Focus ring must be high-contrast and clearly visible (min 2px).

### 6.2 Touch target size
- Minimum target: **44×44** (recommended).
- If an icon is 16–20, add transparent padding.

### 6.3 Keyboard support
- Logical focus order.
- Modals: focus trap, ESC closes, focus returns to the opener.

### 6.4 Reduced motion
- Respect `prefers-reduced-motion: reduce`.
- Replace slides with simple fades when needed.

---

## 7) Iconography and illustration
- Standard library: **Lucide React**.
- Typical sizes: 16 / 20 / 24.
- Color: `currentColor` (inherits from text).
- Icon fonts are forbidden.

---

## 8) Tone, Language & Microcopy (UX writing)
### 8.1 Language (Mandatory)
- **Primary Language:** Spanish (Castilian) / Español (Castellano).
- All user-facing text (labels, buttons, error messages, placeholders, notifications) MUST be in Spanish.
- Exception: Technical terms universally accepted in English (e.g., "API", "Token") may be used if appropriate for an admin audience, but localized equivalents are preferred ("Token de acceso").
- Code entities (variables, props, comments) MUST remain in English.

### 8.2 Tone
- Short, direct, non-blaming messages.
- Always state the action and the next step.
- Avoid technical jargon (e.g., “payload”, “JWT”) in a user-facing UI.

---

## 9) Motion (micro-interactions)
Define motion via tokens, not adjectives:
- `motion-duration-fast: 200ms`
- `motion-duration-normal: 300ms`
- `motion-ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1)`
- `motion-ease-entrance: cubic-bezier(0.0, 0.0, 0.2, 1)`

Usage:
- Hover/focus: short transitions.
- Loading: prefer skeletons for lists; spinner for single actions.

---

## 10) Theming (Light/Dark)
### 10.1 Strategy
- Don’t invert colors “blindly”.
- In dark mode, reduce saturation for accents used on large surfaces.

### 10.2 Suggested surfaces
- `surface-0-dark`: `#121212`
- `surface-1-dark`: `#1E1E1E`
- Primary text on dark: `#EDE7E1` (or Warm White if contrast is controlled)

---

## 11) Design Tokens (SSOT) — Format and rules
### 11.1 Golden rule
- Components must **not** consume primitive tokens (palette).
- Components must consume **semantic** tokens (intent).

### 11.2 Recommended structure (W3C/DTCG-like)
Example (illustrative format):
    {
      "color": {
        "palette": {
          "navy": { "$value": "#322B46", "$type": "color" },
          "terracotta": { "$value": "#BE682D", "$type": "color" },
          "terracottaAA": { "$value": "#B2612A", "$type": "color" }
        },
        "action": {
          "primary": {
            "bg": { "$value": "{color.palette.terracottaAA}", "$type": "color" },
            "fg": { "$value": "{color.palette.warmWhite}", "$type": "color" }
          }
        },
        "text": {
          "primary": { "$value": "{color.palette.navy}", "$type": "color" }
        }
      }
    }

### 11.3 Minimum tokens for shadcn/ui (CSS variables in HSL)
Light (example):
    :root {
      --background: 40 60% 99%;
      --foreground: 255.6 23.9% 22.2%;

      --primary: 24.3 61.8% 43.1%;
      --primary-foreground: 40 60% 99%;

      --secondary: 82.6 46.0% 51.4%;
      --secondary-foreground: 255.6 23.9% 22.2%;

      --muted: 23.3 39.7% 73.3%;
      --muted-foreground: 288 2.2% 44.5%;

      --border: 288 2.2% 44.5%;
      --ring: 82.6 46.0% 51.4%;
      --radius: 1rem;
    }

Dark (example):
    .dark {
      --background: 0 0% 7.1%;
      --foreground: 30 25% 90.6%;

      --primary: 24.3 61.8% 43.1%;
      --primary-foreground: 30 25% 90.6%;

      --secondary: 82.6 46.0% 51.4%;
      --secondary-foreground: 255.6 23.9% 22.2%;

      --border: 0 0% 20%;
      --ring: 82.6 46.0% 51.4%;
    }

---

## 12) Visual QA checklist (quick)
- Do buttons and inputs have visible focus?
- Is AA contrast met for normal text?
- Are states defined: hover/focus/disabled/loading?
- Are touch targets ≥ 44×44?
- No hardcoded hex/px in components?
- No hover-only functionality on mobile?
- Is dark mode readable with no color vibration?

---

## 13) Governance and changes
- Tokens and components must be versioned.
- If a color changes: **change the token**, not the component.
- PRs must include light/dark screenshots and basic a11y verification (at least contrast + focus).

