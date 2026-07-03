
# Ripple Earth — Architecture & File Structure

> **Session 0 · 总控文档 | 所有 Session 引用此文档确认文件结构和技术架构**
> 维护者：Session 0 | 变更需经项目核心讨论

---

## 1. Tech Stack / 技术栈

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16 (App Router) | Routing, SSR, file structure |
| Language | TypeScript 5 | Type safety |
| Styling | Tailwind CSS 4 | Utility-first styling |
| 3D / WebGL | Three.js 0.185 + @react-three/fiber 9.6 + drei 10.7 | Globe, 3D scenes |
| Data visual | Canvas 2D | Particles, flow lines, heat maps |
| Animation | GSAP + ScrollTrigger | Scroll narrative, transitions, counters |
| UI motion | GSAP (primary), tw-animate-css (secondary) | Component-level animations |
| Smooth scroll | Lenis 1.3 | Premium scroll feel (optional) |
| UI component base | shadcn/ui + Base UI 1.6 | Button, Badge, Card primitives |
| Icons | lucide-react 1.23 | All UI icons |
| Geo utils | d3-geo 3.1, topojson-client 3.1 | Map projection, topology data |

### Runtime Scripts

| Script | Command |
|--------|---------|
| dev | `npm run dev` |
| build | `npm run build` |
| start | `npm run start` |
| lint | `npm run lint` |

---

## 2. File Structure / 文件结构

### Top Level

```
ripple-earth-next/
  .next/                  # Next.js build output
  node_modules/           # Dependencies
  public/                 # Static assets (images, fonts)
  src/                    # Application source
  .gitignore
  AGENTS.md               # Agent instructions
  CLAUDE.md               # Agent rules (references AGENTS.md)
  components.json         # shadcn/ui configuration
  eslint.config.mjs       # ESLint config
  next.config.ts          # Next.js configuration
  package.json
  postcss.config.mjs
  tsconfig.json
  README.md
```

### Application Source: `src/`

```
src/
  app/                             # Next.js App Router pages
    layout.tsx                     # Root layout (nav + footer + globals)
    page.tsx                       # Home (Earth Experience — scroll narrative)
    globals.css                    # Global styles + Tailwind + CSS tokens
    favicon.ico
    stories/
      page.tsx                     # Ripple Archive — Story Grid
      [slug]/
        page.tsx                   # Story Detail Page
    intelligence/
      page.tsx                     # Earth Intelligence Hub

  components/                      # React components organized by domain
    Earth/                         # 3D globe & canvas components
      EarthCanvas.tsx              # Canvas container for Three.js globe
      Globe.tsx                    # Globe core (textured sphere + clouds + glow + stars)
      index.ts

    Effects/                       # Reusable visual effects
      AtmosphereGlow.tsx           # Fresnel / atmospheric glow
      DuckAnimation.tsx            # Duck trail animations
      ImpactNode.tsx               # Impact point visualization
      ScrollReveal.tsx             # Scroll-triggered reveal wrapper
      SpaceParticles.tsx           # Background particle system
      index.ts

    Scene/                         # Narrative scene sections
      SceneOrigin.tsx              # [Open] — 3D Earth intro
      SceneEarthReveal.tsx         # Scene transitions
      SceneOceanEcho.tsx           # [01] Little Yellow Duck
      SceneSpill.tsx               # [02] Sand
      SceneInvisibleImpact.tsx     # [03] Light
      SceneGlobalEcho.tsx          # [04] Ballast
      SceneFuture.tsx              # [Close] Outro
      index.ts

    Story/                         # Story archive components
      StoryCard.tsx                # Story grid card
      StoryGrid.tsx                # Masonry grid layout
      index.ts

    UI/                            # Generic UI components
      Header.tsx                   # Top navigation (glass panel)
      AnomalyPanel.tsx             # Data anomaly / intelligence panel
      SceneIndex.tsx               # Scene progress indicator
      ScrollCue.tsx                # "Scroll to discover" cue
      badge.tsx                    # shadcn badge
      button.tsx                   # shadcn button base
      card.tsx                     # shadcn card base
      index.ts

    visual/                        # Data visualization (Canvas 2D)
      DuckTrail.tsx                # [01] Duck path visualization
      SandData.tsx                 # [02] Sand particle & data viz
      LightData.tsx                # [03] Light diffusion viz
      BallastData.tsx              # [04] Ballast water viz
      AnomalyNode.tsx              # Data anomaly node
      RipplePath.tsx               # Ripple Line visualization
      ScientificOverlay.tsx        # Scientific grid overlay
      WireframeGlobe.tsx           # Flat wireframe globe for data layers
      index.ts

    Ripple/                        # Ripple Line visual system
      RippleEffect.tsx             # Core ripple effect component
      index.ts

    VideoBackground.tsx            # Video-based background component

  three/                           # Low-level Three.js modules
    Earth.tsx                      # Raw Three.js Earth scene
    index.ts                       # Barrel export

  animations/                      # Animation utilities
    CharReveal.tsx                 # Character-by-character text reveal
    sceneTimeline.ts               # Narrative scene GSAP timelines
    useSceneTransition.ts          # Scene transition hook
    index.ts

  animation/                       # Math helpers for animation
    scroll.ts                      # phase(), clamp(), mix(), lerp()

  data/
    stories.json                   # Story archive data (JSON)

  hooks/
    useLenisScroll.ts              # Lenis smooth scroll integration
    useScroll.ts                   # Generic scroll tracking hook

  styles/
    colors.ts                      # Color token constants

  lib/
    utils.ts                       # Shared utilities (cn, etc.)
```

### Project Documentation: `docs/`

```
docs/
  PROJECT.md                       # [Session 0] Core project identity
  STYLE_GUIDE.md                   # [Session 0] Visual identity spec
  DESIGN_SYSTEM.md                 # [Session 0] Component/name/animation/Three.js spec
  ARCHITECTURE.md                  # [Session 0] Tech stack, routing, data flow (this file)
  Ripple_Earth_Design_System.md    # (Legacy) Original design system
  Ripple_Earth_Product_Architecture.md  # (Legacy) Original product architecture
  Ripple_Earth_Visual_Technical_Design.md  # (Legacy) Original visual tech design
  Ripple_Earth_Narrative_Core.md   # (Legacy) Original narrative core
  Ripple_Earth_Narrative_Flow.md   # (Legacy) Narrative flow
  Ripple_Earth_Storyboard.md       # (Legacy) Scene storyboard
  Ripple_Earth_Narrative_Reconstruction.md  # (Legacy) Narrative reconstruction
  Ripple_Earth_Knowledge_Graph_Schema.md   # (Legacy) KG schema
  Ripple_Earth_Environmental_Data_Research.md  # (Legacy) Environmental data
  Ripple_Earth_Scientific_Data_Catalog.md  # (Legacy) Scientific data catalog
```

---

## 3. Page Routing / 路由结构

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home (Earth Experience) | Interactive scroll documentary, 6 scenes |
| `/stories` | Ripple Archive | Story grid with category filter |
| `/stories/[slug]` | Story Detail | Full story page with timeline + data viz |
| `/intelligence` | Earth Intelligence | Data hub with metrics + risk analysis |
| `/intelligence/reports` | Data Reports | Downloadable research reports (TODO) |
| `/solutions` | Solutions | Enterprise services + cases + contact (TODO) |
| `/community` | Earth Pulse | Community story wall (TODO) |
| `/community/submit` | Submit Story | User contribution form (TODO) |

**Competition version:** All data is static JSON. No backend needed.

---

## 4. Data Flow / 数据流

```
static JSON / inline constants
        |
        v
  Page Component (page.tsx)
        |
        v
  Domain Component (StoryGrid / DataHub / Scene...)
        |
        +-- Canvas 2D Visualization (visual/*)
        |       L-- requestAnimationFrame loop
        |
        +-- Three.js Globe (Earth/Globe)
        |       L-- R3F useFrame loop
        |
        +-- UI Components (UI/*)
        |
        L-- GSAP ScrollTrigger timeline
                L-- progress prop (0-1) -> child components
```

### Data Strategy

| Page | Data Source | Format |
|------|-------------|--------|
| Home | Inline (scene config) | TypeScript constants |
| Ripple Archive | `src/data/stories.json` | JSON with schema |
| Earth Intelligence | `src/data/metrics/*.json` | JSON with real source references |
| Earth Pulse | Initial: JSON seed data | JSON |
| Solutions | Inline content | TypeScript constants |

### Key Data Flow Rules

- `progress` prop (0-1) is the canonical way to pass scroll state to scene components
- Data visualization components own their own `requestAnimationFrame` loops
- Three.js globe owns its `useFrame` loop
- GSAP timelines are created in `useEffect` and killed on unmount

---

## 5. Scene Architecture / 场景架构

### Home Page Scene Map (6 Scenes)

| # | Scene | Component | Visualization | Data Topic |
|---|-------|-----------|---------------|------------|
| Open | 3D Earth Intro | `SceneOrigin.tsx` | Three.js globe + text | None (brand) |
| 01 | Little Yellow Duck | `SceneOceanEcho.tsx` | Duck trail (Canvas) + DuckAnimation | 28,800 ducks, 15yr journey |
| 02 | Sand | `SceneSpill.tsx` | Sand particles (Canvas) + SandData | 50B tons/yr consumption |
| 03 | Light | `SceneInvisibleImpact.tsx` | Light halo (Canvas) + LightData | 50% increase in 25yr |
| 04 | Ballast | `SceneGlobalEcho.tsx` | Ship + spread waves | 7,000 species/day |
| Close | Outro | `SceneFuture.tsx` | Globe returns | None (reflection) |

### Scene Contract

Every Scene component receives the same props:

```typescript
interface SceneProps {
  progress: number;       // 0-1, normalized scroll progress within this scene
  containerRef?: RefObject<HTMLDivElement>;
}
```

---

## 6. Navigation Structure / 导航结构

```
RIPPLE EARTH  [logo]

Explore v
  +-- Earth Experience   (Home — interactive documentary)
  +-- Ripple Archive     (Story library)
  +-- Earth Intelligence  (Data & research)
  +-- Solutions          (Enterprise services)
  +-- Earth Pulse        (Community wall)
```

### Primary Flow

```
Landing (Home)
    |
    +-- Ripple Archive (browse stories)
    |       |
    |       L-- Story Page (read, interact, share)
    |
    +-- Earth Intelligence (browse data)
    |
    +-- Solutions (view services)
    |       |
    |       L-- Contact / Inquiry
    |
    L-- Earth Pulse (community wall)
            |
            L-- Submit Story (user contribution)
```

---

## 7. Key Dependencies / 关键依赖

| Package | Version | Role |
|---------|---------|------|
| next | ^16.2.9 | Framework |
| react / react-dom | ^19.2.4 | UI |
| three / @types/three | ^0.185.0 | 3D WebGL |
| @react-three/fiber | ^9.6.1 | React-ified Three.js |
| @react-three/drei | ^10.7.7 | R3F helpers |
| gsap | ^3.15.0 | Animation engine |
| lenis | ^1.3.25 | Smooth scroll |
| tailwindcss | ^4 | Styling |
| class-variance-authority | ^0.7.1 | Variants |
| d3-geo | ^3.1.1 | Map projection |
| topojson-client | ^3.1.0 | Topology |
| lucide-react | ^1.23.0 | Icons |

---

## 8. Knowledge Graph / 知识图谱 (External)

故事数据结构定义在 `src/data/stories.json`，完整知识图谱 schema 见 `docs/Ripple_Earth_Knowledge_Graph_Schema.md`。核心结构：

- 每个 story 是一个 Graph Node (JSON object)
- 节点通过 `connected_to` 字段建立双向边
- 边包含 `relation` (关系名) 和 `strength` (连接强度 0-1)
- 可视化方法 (`visual_method`) 决定了该 story 在前端如何渲染
- 所有数据为静态 JSON，比赛版无需后端 API 支持

---

*Maintained by Session 0. Last updated: 2026-07-02.*
*Reference: filesystem, package.json, codebase `src/*`*
