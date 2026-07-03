
# Ripple Earth — Style Guide

> **Session 0 · 总控文档 | 所有 Session 引用此文档确认视觉规范**
> 维护者：Session 0 | 变更需经项目核心讨论
> 视觉语言：NASA Scientific Visualization + Apple Cinematic Website + Digital Documentary

**Avoid:** AI-generated SaaS style, large rounded cards, purple gradients, generic dashboards
**Feel:** Scientific instrument interface, not web app

---

## 1. Color Palette / 色彩系统

### Core Colors

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| `DEEP SPACE` | `#0A0E1A` | Primary background — the void, the unknown |
| `SURFACE` | `#0F1322` | Secondary surface — glass panels, cards |
| `BORDER` | `rgba(255,255,255,0.06)` | Subtle separators |
| `BORDER-ACTIVE` | `rgba(0,229,255,0.15)` | Active state borders |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `TEXT-PRIMARY` | `rgba(255,255,255,0.88)` | Primary text |
| `TEXT-SECONDARY` | `rgba(255,255,255,0.40)` | Secondary text, labels |
| `TEXT-MUTED` | `rgba(255,255,255,0.15)` | Placeholder, disabled |
| `TEXT-DATA` | `rgba(255,255,255,0.55)` | Data values, monospace |

### Accent / Signal Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `ACCENT-CYAN` | `#00E5FF` | Primary accent — active data, highlight, links, active states |
| `SIGNAL-ORANGE` | `#FF6B35` | Warning, anomaly, warm data |
| `ALERT-RED` | `#C53A3A` | Danger, threshold exceeded |
| `SUCCESS-GREEN` | `#2ECC71` | Positive, healing, recovery |

### Data Colors

| Token | Value | Usage |
|-------|-------|-------|
| `DATA-WARM` | `#FF6B35` | Warm data currents, temperature |
| `DATA-COLD` | `#00E5FF` | Cold data currents, ocean |
| `DATA-NEUTRAL` | `rgba(255,255,255,0.30)` | Grid lines, baseline |

### Color Usage Rules

- Cyan (`#00E5FF`) is the **primary interactive color** — links, active states, highlights
- Orange (`#FF6B35`) is the **signal color** — anomalies, warnings, data emphasis
- White is used at varying opacities — never pure white except for active text
- Never use purple gradients, blue gradients, or any gradient backgrounds
- Never use shadows — use thin borders instead
- No gradient backgrounds anywhere

### Runtime tokens (`src/styles/colors.ts`)

```typescript
export const colors = {
  bg: {
    deep: '#0A0E1A',
    surface: '#0F1322',
    glass: 'rgba(10,14,26,0.85)',
  },
  border: {
    subtle: 'rgba(255,255,255,0.06)',
    hover: 'rgba(255,255,255,0.12)',
    active: 'rgba(0,229,255,0.15)',
  },
  text: {
    primary: 'rgba(255,255,255,0.88)',
    secondary: 'rgba(255,255,255,0.40)',
    muted: 'rgba(255,255,255,0.15)',
    data: 'rgba(255,255,255,0.55)',
  },
  accent: {
    cyan: '#00E5FF',
    orange: '#FF6B35',
    red: '#C53A3A',
    green: '#2ECC71',
  },
  data: {
    warm: '#FF6B35',
    cold: '#00E5FF',
    neutral: 'rgba(255,255,255,0.30)',
  },
} as const;
```

---

## 2. Typography / 字体系统

### Font Families

| Usage | Font | Weight | Fallback |
|-------|------|--------|----------|
| UI Text | Inter | 300-600 | system-ui, sans-serif |
| Data / Code | JetBrains Mono | 300-500 | monospace |
| Narrative | Inter | 200-400 | system-ui, sans-serif |

### Type Scale

| Style | Size / Line Height | Weight | Usage |
|-------|-------------------|--------|-------|
| Display 1 | 56px / 0.88 | Inter Light 300 | Scene titles |
| Display 2 | 42px / 0.92 | Inter Light 300 | Section headers |
| Heading 1 | 32px / 1.0 | Inter Regular 400 | Page titles |
| Heading 2 | 24px / 1.1 | Inter Regular 400 | Subsection headers |
| Heading 3 | 18px / 1.2 | Inter Medium 500 | Card titles |
| Body Large | 16px / 1.6 | Inter Light 300 | Narrative text |
| Body | 14px / 1.5 | Inter Regular 400 | General text |
| Body Small | 12px / 1.4 | Inter Regular 400 | Labels, captions |
| Data Large | 42px / 0.9 | JetBrains Mono Light 300 | Hero metrics |
| Data | 16px / 1.2 | JetBrains Mono Regular 400 | Data values |
| Data Small | 11px / 1.3 | JetBrains Mono Regular 400 | Axis labels, legends |
| UI Small | 10px / 1.2 | JetBrains Mono Medium 500 | Buttons, tags, metadata |

### Typography Rules

- All data labels use monospace (JetBrains Mono)
- All UI buttons use monospace with `letter-spacing: 0.08em` (or 0.12em for uppercase)
- Narrative text uses Inter Light 300 for an airy, scientific feel
- Never use font-weight below 300 or above 600
- Line-height for headings is tight (0.88-1.2), body is loose (1.5-1.65)
- No negative letter-spacing
- Pure white (`rgba(255,255,255,0.88)`) reserved for primary text only

---

## 3. Design Language / 设计语言

### The Ripple Line (统一视觉骨架)

Ripple Line 是 **整个产品的视觉骨架**。它在每个页面出现，根据上下文变化形态。

| Page | Form | Meaning |
|------|------|---------|
| Home — Scene 01 | Dormant hairline on globe | The hidden connection waiting to be discovered |
| Home — Scene 02-04 | Flowing current line | Data in motion, system revealed |
| Home — Scene 05 | Ripple rings | Impact propagation |
| Ripple Archive — Grid | Connecting line between cards | Stories are linked, not isolated |
| Ripple Archive — Detail | Timeline axis | The chronological path of an event |
| Earth Intelligence | Connecting data nodes | Data relationships |
| Solutions | Service connecting line | From problem to solution |
| Earth Pulse | Subtle grid line | Community connections growing |

**Visual Specs:**

| Property | Value |
|----------|-------|
| Color | Cyan (#00E5FF) to White gradient |
| Thickness | 0.5px (dormant) → 2px (active) |
| Opacity | 0.08 (dormant) → 0.9 (active) |
| Animation | Dash offset (flow), circle expansion (ripple) |
| Context | Always connected to page content — never decorative |

**Implementation:**

| Context | Implementation |
|---------|---------------|
| Three.js scene | `THREE.Line` + ShaderMaterial |
| Canvas scene | Canvas 2D path + animation |
| UI element | SVG or CSS border animation |
| Brand logo | Animated SVG |

### Visual Identity Principles

1. **Scientific instrument aesthetic** — no decoration, every element has a purpose
2. **Dark theme throughout** — black is not empty, it is the unknown
3. **Thin lines, precise typography** — think NASA control room
4. **Content is the interface** — UI disappears when not needed
5. **Data tells the story** — numbers are visual elements, not footnotes

### Iconography

- Use **Lucide icons** exclusively (already in project: `lucide-react`)
- Icon size: 14-16px for UI, 20-24px for cards
- Stroke width: 1.5px
- No filled icons
- No colored icons (except for data signals)
- Icons are always secondary to text

---

## 4. Layout Grid / 布局网格

| Breakpoint | Columns | Margin | Gutter |
|------------|---------|--------|--------|
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

## 5. CSS Implementation / 样式实现

### Tokens (`globals.css` or `tokens.css`)

```css
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
```

### CSS Enforcement Rules

- All text uses `--font-ui` or `--font-mono`
- All borders use `--border-subtle` as default
- All interactive elements use `--accent-cyan` for active/hover states
- All data signals use `--signal-orange` for anomalies/warnings
- No shadows anywhere
- No border-radius larger than 8px
- No pill shapes
- No gradient backgrounds

### Accessibility

- Text contrast: minimum 4.5:1 for body text
- Focus indicators: cyan outline, 1px, offset 2px
- Motion: respect `prefers-reduced-motion`
- Interactive elements: minimum 44px tap target

---

*Maintained by Session 0. Last updated: 2026-07-02.*
*Reference: Ripple_Earth_Design_System.md, codebase `src/styles/colors.ts`*
