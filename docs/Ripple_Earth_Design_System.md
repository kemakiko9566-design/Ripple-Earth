# Ripple Earth — Design System

> **Visual Language:** NASA Scientific Visualization + Apple Cinematic Website + Digital Documentary
> **Avoid:** AI-generated SaaS style, large rounded cards, purple gradients, generic dashboards
> **Feel:** Scientific instrument interface, not web app

---

## 1. Design Principles / 设计原则

| # | Principle | Meaning |
|---|---|---|
| 1 | **Invisible Interface** | UI disappears when not needed. Content is the interface. |
| 2 | **Scientific Precision** | Every line has meaning. Every color is a signal. No decoration. |
| 3 | **Cinematic Motion** | Motion serves narrative. Slow in, slow out. Never fast or jarring. |
| 4 | **Data First** | Typography is monospace for data, clean sans for narrative. |
| 5 | **Dark Matter** | Black is not empty — it is the unknown, waiting to be revealed. |

---

## 2. Color Palette / 色彩系统

`
DEEP SPACE    #0A0E1A    Primary background — the void, the unknown
SURFACE       #0F1322    Secondary surface — glass panels, cards
BORDER        rgba(255,255,255,0.06)    Subtle separators
BORDER-ACTIVE rgba(0,229,255,0.15)     Active state borders

TEXT-PRIMARY   rgba(255,255,255,0.88)   Primary text
TEXT-SECONDARY rgba(255,255,255,0.40)   Secondary text, labels
TEXT-MUTED     rgba(255,255,255,0.15)   Placeholder, disabled
TEXT-DATA      rgba(255,255,255,0.55)   Data values, monospace

ACCENT-CYAN    #00E5FF    Primary accent — active data, highlight
SIGNAL-ORANGE  #FF6B35    Warning, anomaly, warm data
ALERT-RED      #C53A3A    Danger, threshold exceeded
SUCCESS-GREEN  #2ECC71    Positive, healing, recovery

DATA-WARM      #FF6B35    Warm data currents, temperature
DATA-COLD      #00E5FF    Cold data currents, ocean
DATA-NEUTRAL   rgba(255,255,255,0.30)   Grid lines, baseline
`

### Color Usage Rules / 使用规则

- Cyan (#00E5FF) is the **primary interactive color** — use for links, active states, highlights
- Orange (#FF6B35) is the **signal color** — use for anomalies, warnings, data emphasis
- White is used at varying opacities — never pure white except for active text
- Never use purple gradients, blue gradients, or any gradient backgrounds
- Never use shadows — use thin borders instead

---

## 3. Typography / 字体系统

### Font Families

| Usage | Font | Weight | Fallback |
|---|---|---|---|
| UI Text | Inter | 300-600 | system-ui, sans-serif |
| Data / Code | JetBrains Mono | 300-500 | monospace |
| Narrative | Inter | 200-400 | system-ui, sans-serif |

### Type Scale

`
Display 1    56px / 0.88     Inter Light 300    Scene titles
Display 2    42px / 0.92     Inter Light 300    Section headers
Heading 1    32px / 1.0      Inter Regular 400  Page titles
Heading 2    24px / 1.1      Inter Regular 400  Subsection headers
Heading 3    18px / 1.2      Inter Medium 500   Card titles
Body Large   16px / 1.6      Inter Light 300    Narrative text
Body         14px / 1.5      Inter Regular 400  General text
Body Small   12px / 1.4      Inter Regular 400  Labels, captions
Data Large   42px / 0.9      Mono Light 300     Hero metrics
Data         16px / 1.2      Mono Regular 400   Data values
Data Small   11px / 1.3      Mono Regular 400   Axis labels, legends
UI Small     10px / 1.2      Mono Medium 500    Buttons, tags, metadata
`

### Typography Rules / 文字规则

- All data labels use monospace (JetBrains Mono)
- All UI buttons use monospace with letter-spacing: 0.08em
- Narrative text uses Inter Light 300 for a airy, scientific feel
- Never use font-weight below 300 or above 600
- Line-height for headings is tight (0.88-1.2), body is loose (1.5-1.65)

---

## 4. Spacing / 间距系统

| Token | Value | Usage |
|---|---|---|
| space-1 | 4px | Micro spacing |
| space-2 | 8px | Tight padding |
| space-3 | 12px | Element spacing |
| space-4 | 16px | Button padding |
| space-5 | 20px | Section gap |
| space-6 | 24px | Card padding |
| space-8 | 32px | Section padding |
| space-10 | 40px | Page margins |
| space-12 | 48px | Large gaps |
| space-16 | 64px | Section separation |

---

## 5. Motion / 动画系统

### Duration

| Token | Duration | Usage |
|---|---|---|
| instant | 100ms | Hover, micro-interactions |
| fast | 200ms | UI transitions, button states |
| normal | 400ms | Panel reveals, data updates |
| slow | 600ms | Scene transitions |
| narrative | 800-1500ms | Scroll-driven reveals |

### Easing

| Token | Curve | Usage |
|---|---|---|
| ease-out | cubic-bezier(0.16, 1, 0.3, 1) | Reveals, fade-in |
| ease-in-out | cubic-bezier(0.65, 0, 0.35, 1) | Scene transitions |
| linear | linear | Data animation, particle flow |
| spring | custom spring(0.3, 0.8, 0.2, 1) | UI element entrances |

### Motion Principles

1. **Slow reveals** — Content should emerge, not appear. Use fade + translate (y: 20-40px)
2. **No bounces** — Never use elastic or bounce easings. Scientific instruments don't bounce.
3. **Stagger** — Elements reveal in sequence, 80-120ms apart
4. **Scroll-driven** — GSAP ScrollTrigger controls narrative timelines
5. **Data animation** — Particle motion is continuous, linear, with subtle noise

---

## 6. Component Guidelines / 组件规范

### 6.1 Glass Panel

Used for: Navigation, data panels, overlays

`
background: rgba(10,14,26,0.85)
backdrop-filter: blur(12px)
border: 1px solid rgba(255,255,255,0.06)
border-radius: 8px
padding: 12px 16px
`

### 6.2 Buttons

`
font-family: JetBrains Mono, monospace
font-size: 11px
letter-spacing: 0.12em
text-transform: uppercase
border: 1px solid rgba(255,255,255,0.15)
border-radius: 2px  (small, not pill)
background: transparent
padding: 10px 24px
hover: border-color accent-cyan, background rgba(0,229,255,0.04)
`

### 6.3 Cards (Story Grid)

`
background: rgba(255,255,255,0.02)
border: 1px solid rgba(255,255,255,0.06)
border-radius: 4px
padding: 0  (image flush to top, content padding inside)
hover: border-color rgba(255,255,255,0.12), transform translateY(-4px)
No shadows.
No large border-radius.
`

### 6.4 Data Visualization

`
All data visualizations use:
- Thin lines (0.5px - 1.5px)
- Monospace labels
- Dark background (inherit from page)
- Color only for data signals (cyan, orange)
- Grid lines at rgba(255,255,255,0.06)
- No 3D effects (flat projection for maps)
- No gradients in data layers
`

### 6.5 Navigation

`
Style: Glass panel, fixed at top
Logo: Left-aligned, subtle glow ring
Menu: "Explore" dropdown, right-aligned
Items: Monospace, letter-spaced, thin borders on hover
Active: Cyan accent
`

### 6.6 Data Panels (Anomaly, Intelligence)

`
background: rgba(0,0,0,0.75)
border: 1px solid rgba(0,229,255,0.2)
border-radius: 4px
backdrop-filter: blur(8px)
padding: 32px 40px
Data rows: bordered separators at rgba(255,255,255,0.04)
Labels: monospace, uppercase, letter-spaced
Values: monospace, cyan for active
`

### 6.7 Loading / System States

`
font-family: JetBrains Mono, monospace
color: rgba(255,255,255,0.4)
Typewriter effect for system messages
Pulsing dot for active detection
No spinners. No progress bars.
`

---

## 7. Layout Grid / 布局网格

| Breakpoint | Columns | Margin | Gutter |
|---|---|---|---|
| Mobile (<768px) | 4 | 20px | 16px |
| Tablet (768-1024px) | 8 | 32px | 20px |
| Desktop (1024-1440px) | 12 | 40px | 24px |
| Wide (>1440px) | 12 | 56px | 24px |

### Content Width

- Narrative text: max 680px, centered
- Data panels: max 480px
- Hero content: full width
- Story grid: max 1200px, centered

---

## 8. Iconography / 图标系统

- Use **Lucide icons** exclusively (already in project)
- Icon size: 14-16px for UI, 20-24px for cards
- Stroke width: 1.5px
- No filled icons
- No colored icons (except for data signals)
- Icons are always secondary to text

---

## 9. Data Visualization Patterns

### Scientific Earth (Canvas/D3)

`
Projection: Equirectangular (flat)
Grid: lat/long at 30deg intervals
Grid style: rgba(255,255,255,0.06), 0.5px
Grid labels: 8px monospace, rgba(255,255,255,0.15)
Continents: rgba(255,255,255,0.35), 0.8px stroke, no fill
Data lines: 1.2px, colored by signal type
Arrows: at line endpoints, matching color
Legend: minimal, bottom-left, 8px monospace
Background: #0B0E14 (slightly different from page bg)
`

### Flow Lines (Ocean Currents)

`
Warm currents: #FF6B35 at 60% opacity
Cold currents: #00E5FF at 60% opacity
Glow under-line: same color at 8% opacity, 3px width
Arrows: at endpoints, matching color
Labels: at midpoint, 10px monospace, matching color
`

### Data Points

`
Active: 8px circle, cyan, with 24px glow ring
Inactive: 6px circle, rgba(255,255,255,0.3)
Anomaly: pulsing orange dot
Cluster: variable size, cyan, brownian motion
`

---

## 10. HTML/CSS Implementation Notes

`css
/* These tokens are defined in tokens.css */
:root {
  --bg-deep: #0A0E1A;
  --bg-surface: #0F1322;
  --accent-cyan: #00E5FF;
  --signal-orange: #FF6B35;
  --border-subtle: rgba(255,255,255,0.06);
  --text-primary: rgba(255,255,255,0.88);
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
`

- All text uses --font-ui or --font-mono
- All borders use --border-subtle as default
- All interactive elements use --accent-cyan for active/hover states
- All data signals use --signal-orange for anomalies/warnings
- No shadows anywhere
- No border-radius larger than 8px
- No pill shapes
- No gradient backgrounds

---

## 11. Accessibility / 无障碍

- Text contrast: minimum 4.5:1 for body text
- Focus indicators: cyan outline, 1px, offset 2px
- Motion: respect prefers-reduced-motion
- Interactive elements: minimum 44px tap target

---

*End of Design System — 2026-07-01*
*Next: Apply tokens to codebase, build components*
