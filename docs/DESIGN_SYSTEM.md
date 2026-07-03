
# Ripple Earth — Design System & Technical Spec

> **Session 0 · 总控文档 | 所有 Session 引用此文档确认组件/命名/动画/Three.js 规范**
> 维护者：Session 0 | 变更需经项目核心讨论

---

## 1. Component Specs / 组件规范

### 1.1 Glass Panel

导航、数据面板、浮层。

```
background: rgba(10,14,26,0.85)
backdrop-filter: blur(12px)
border: 1px solid rgba(255,255,255,0.06)
border-radius: 8px
padding: 12px 16px
```

对应 Tailwind: `bg-[rgba(10,14,26,0.85)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.06)] rounded-[8px]`

### 1.2 Buttons

```
font-family: JetBrains Mono, monospace
font-size: 11px
letter-spacing: 0.12em
text-transform: uppercase
border: 1px solid rgba(255,255,255,0.15)
border-radius: 2px (small, not pill)
background: transparent
padding: 10px 24px
hover: border-color accent-cyan, background rgba(0,229,255,0.04)
active: border-color rgba(0,229,255,0.15)
```

- 不使用 pills (border-radius > 20px)
- 不使用 filled button style（除特殊功能外）
- Icons 放在文字左侧，lucide-react，14px

### 1.3 Cards (Story / Archive)

```
background: rgba(255,255,255,0.02)
border: 1px solid rgba(255,255,255,0.06)
border-radius: 4px
padding: 0 (image flush to top, content padding inside)
hover: border-color rgba(255,255,255,0.12), transform translateY(-4px)
```

- No shadows
- No large border-radius
- Image 与顶部边缘对齐（全出血）

### 1.4 Data Visualization

```
- Thin lines (0.5px - 1.5px)
- Monospace labels
- Dark background (inherit from page)
- Color only for data signals (cyan, orange)
- Grid lines at rgba(255,255,255,0.06)
- No 3D effects (flat projection for maps)
- No gradients in data layers
```

### 1.5 Navigation

```
Style: Glass panel, fixed at top
Logo: Left-aligned, subtle glow ring
Menu: "Explore" dropdown, right-aligned
Items: Monospace, letter-spaced, thin borders on hover
Active: Cyan accent
```

### 1.6 Data Panels (Anomaly, Intelligence)

```
background: rgba(0,0,0,0.75)
border: 1px solid rgba(0,229,255,0.2)
border-radius: 4px
backdrop-filter: blur(8px)
padding: 32px 40px
Data rows: bordered separators at rgba(255,255,255,0.04)
Labels: monospace, uppercase, letter-spaced
Values: monospace, cyan for active
```

### 1.7 Loading / System States

```
font-family: JetBrains Mono, monospace
color: rgba(255,255,255,0.4)
Typewriter effect for system messages
Pulsing dot for active detection
No spinners. No progress bars.
```

### 1.8 Scientific Earth (Canvas/D3)

```
Projection: Equirectangular (flat)
Grid: lat/long at 30deg intervals
Grid style: rgba(255,255,255,0.06), 0.5px
Grid labels: 8px monospace, rgba(255,255,255,0.15)
Continents: rgba(255,255,255,0.35), 0.8px stroke, no fill
Data lines: 1.2px, colored by signal type
Arrows: at line endpoints, matching color
Legend: minimal, bottom-left, 8px monospace
Background: #0B0E14 (slightly different from page bg)
```

### 1.9 Flow Lines (Ocean Currents)

```
Warm currents: #FF6B35 at 60% opacity
Cold currents: #00E5FF at 60% opacity
Glow under-line: same color at 8% opacity, 3px width
Arrows: at endpoints, matching color
Labels: at midpoint, 10px monospace, matching color
```

### 1.10 Data Points

```
Active: 8px circle, cyan, with 24px glow ring
Inactive: 6px circle, rgba(255,255,255,0.3)
Anomaly: pulsing orange dot
Cluster: variable size, cyan, brownian motion
```

### 1.11 Spacing System

| Token | Value | Usage |
|-------|-------|-------|
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

## 2. Naming Conventions / 命名规范

### Files & Folders

- **React components**: PascalCase — `Globe.tsx`, `SceneOrigin.tsx`, `StoryCard.tsx`
- **Hooks**: camelCase with `use` prefix — `useScroll.ts`, `useLenisScroll.ts`
- **Utilities / helpers**: camelCase — `scroll.ts`, `timeline.ts`, `utils.ts`
- **Data files**: camelCase — `stories.json`
- **Style / token files**: kebab-case — `tokens.css`, `globals.css`
- **Page routes**: kebab-case — `stories/[slug]/page.tsx`, `intelligence/reports/page.tsx`

### Folder Structure Rules

```
src/
  app/           # Next.js App Router pages (kebab-case)
  components/    # React components organized by domain
    Earth/       # 3D globe and related Three.js components
    Effects/     # Reusable visual effects (particles, transitions)
    Scene/       # Narrative scene sections (match scene naming)
    Story/       # Story grid, card, timeline components
    UI/          # Generic UI components (Header, Button, Panel)
    visual/      # Data visualization components (Canvas 2D)
    Ripple/      # The Ripple Line visual system
  three/         # Low-level Three.js modules
  styles/        # Color tokens, CSS
  animations/    # Animation utilities, scene timelines
  animation/     # Math helpers (phase, clamp, mix, lerp)
  data/          # Static JSON data
  hooks/         # Custom React hooks
  lib/           # Shared utilities
```

### Code Style

- **All narrative scene components** follow the pattern: `Scene<Name>.tsx` (e.g., `SceneOrigin`, `SceneOceanEcho`)
- **Data visualization components** follow: `<Topic>Data.tsx` (e.g., `DuckTrail`, `SandData`, `LightData`, `BallastData`)
- **Effects** follow: `<Effect>.tsx` (e.g., `ScrollReveal`, `AtmosphereGlow`, `SpaceParticles`)
- **Exported from index.ts** — each component folder has an `index.ts` barrel export
- Prefer `function` declarations (not arrow) for exported components
- Use **named exports** for components (not `export default`)
- Exception: Next.js page files (`page.tsx`) use `export default`

---

## 3. Animation Spec / 动画规范

### 3.1 Duration Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| instant | 100ms | Hover, micro-interactions |
| fast | 200ms | UI transitions, button states |
| normal | 400ms | Panel reveals, data updates |
| slow | 600ms | Scene transitions |
| narrative | 800-1500ms | Scroll-driven reveals |

### 3.2 Easing Curves

| Token | Curve | Usage |
|-------|-------|-------|
| ease-out | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals, fade-in |
| ease-in-out | `cubic-bezier(0.65, 0, 0.35, 1)` | Scene transitions |
| linear | `linear` | Data animation, particle flow |
| spring | custom spring(0.3, 0.8, 0.2, 1) | UI element entrances |

### 3.3 Motion Principles

1. **Slow reveals** — Content should emerge, not appear. Use fade + translate (y: 20-40px)
2. **No bounces** — Never use elastic or bounce easings. Scientific instruments don't bounce.
3. **Stagger** — Elements reveal in sequence, 80-120ms apart
4. **Scroll-driven** — GSAP ScrollTrigger controls narrative timelines
5. **Data animation** — Particle motion is continuous, linear, with subtle noise

### 3.4 Scene Transition Pattern

所有场景遵循相同的过渡模式：

```
[Scene Enter] → [Narrative Reveal] → [Data Animation] → [Hold] → [Scene Exit]
```

- **Enter**: Image/visual layer fades in (800ms ease-out)
- **Reveal**: Text and labels scroll-triggered via GSAP (scrub: 1.0-1.5)
- **Animate**: Data particles, counters, and charts animate (continuously or triggered)
- **Hold**: Scene stays visible while user scrolls through
- **Exit**: Fade or dissolve to next scene (600ms ease-in-out)

### 3.5 Data Animation

- 所有数字变化用 GSAP `animate` 或自定义计数器
- 所有粒子运动用 Canvas 2D `requestAnimationFrame`
- 所有数据图表使用 Canvas 2D（保持风格一致），D3 仅在需要复杂交互时引入
- 粒子/流线使用 `linear` 缓动，持续运动

### 3.6 Technology Stack for Animation

- **GSAP** + **ScrollTrigger**: Scroll-driven narrative timelines, scene transitions, number counters
- **Lenis**: Smooth scroll (optional, GSAP-compatible)
- **Canvas 2D**: Particles, flow lines, heat maps, light halos
- **Framer Motion** (备用): Component-level UI animations (the current codebase uses GSAP almost exclusively)

### 3.7 Scroll-driven Narrative Rules

- 使用 `progress` prop (0-1) 在场景间传递滚动进度
- 每个 Scene 组件接收 `progress` 参数控制自身视觉状态
- GSAP ScrollTrigger 应该在 `useEffect` 中注册
- 场景 transition 使用 GSAP Timeline + ScrollTrigger scrub
- 关键 transition 数学工具在 `src/animation/scroll.ts`:
  - `phase(t, start, end)` — normalized progress within range
  - `clamp(v, min, max)` — clamp value
  - `mix(a, b, t)` — linear interpolation
  - `lerp(cur, tgt, f)` — exponential interpolation

---

## 4. Three.js Spec / Three.js 规范

### 4.1 Stack

| Capability | Choice | Reason |
|------------|--------|--------|
| 3D rendering | `@react-three/fiber` + `drei` | React ecosystem, Awwwards standard |
| Globe textures | `TextureLoader` (Three.js) | Proven, built-in |
| Particle/overlay | Canvas 2D (preferred) + Three.js (when needed) | Performance, style consistency |

### 4.2 Globe Component

**核心组件层级：**

```
<Globe />                   → fixed, full-screen container
  <Canvas />                → R3F canvas
    <ambientLight />        → 必配
    <directionalLight />    → 必配
    <EarthCore />           → sphere + textures + clouds + glow
    <Stars />               → background star field (custom or drei)
```

**GlobeCore / EarthCore 特性：**

- Earth texture: `earth_atmos_2048.jpg` (内置 Three.js 示例资源)
- Cloud layer: `earth_clouds_1024.png`，透明度 12%
- Specular map: `earth_specular_2048.jpg`
- Normal map: `earth_normal_2048.jpg`
- Emissive: `#3366aa` at intensity 0.25
- Rotation: Y-axis at 0.025-0.03 rad/s
- Glow rings: Three concentric BackSide meshes at 2.15/2.35/2.6 radius

### 4.3 Three.js Naming & Organization

- **Low-level Three.js modules** live in `src/three/`
- **React-wrapped Three.js components** live in `src/components/Earth/`
- **Canvas 2D visualizations** live in `src/components/visual/`

### 4.4 Texture Loading

- 所有纹理用 `useLoader(TextureLoader, [...urls])` 加载
- 优先使用 Three.js 示例服务器的内置纹理（开发阶段）
- 上线前替换为自托管或 CDN 纹理

### 4.5 Performance Rules

- 默认不启用 Three.js 粒子系统（开销大）；用 Canvas 2D 替代
- Globe 分段数: sphereGeometry `[2, 96, 96]`
- Stars 数量: 1500-2000 点
- 场景退出时应有 cleanup（GSAP `ScrollTrigger.kill()` + 组件 unmount）
- 低性能设备策略：无 bloom 效果，降低星星数量

### 4.6 Visual Effects

- **Fresnel glow**: BackSide mesh, color `#4CC9F0` / `#fff`, opacity 0.03-0.06
- **Stars**: Custom BufferGeometry 或 drei `<Stars />`
- **Bloom** (谨慎使用): `UnrealBloomPass` — 仅用于灯光场景，且控制强度
- **No shadows** in Three.js scenes

### 4.7 Ripple Line (Three.js Context)

```
Three.js scene ripple line implementation:
- THREE.Line + ShaderMaterial for animated dash offset
- Or Canvas 2D path with GSAP animation
- Color: cyan gradient, thickness 0.5-2px
- Animation: dash offset to simulate flow
```

---

## 5. Data Visualization Patterns / 数据可视化规范

### 场景可视化优先级

| Scene | Visualization | Technology |
|-------|--------------|------------|
| [01] Duck Trail | Path lines + waypoint labels | Canvas 2D setLineDash + dashOffset |
| [02] Sand | Particle system + data counters | Canvas 2D particles + GSAP |
| [03] Light | Radial gradient halo + night texture | Canvas 2D radial + Three.js texture swap |
| [04] Ballast | Cross-section + species spread waves | Canvas 2D geometry + radial waves |
| [Close] Globe Return | Combined traces on globe | Three.js lines |

**All visualizations use:**
- Canvas 2D as primary renderer
- GSAP for number animations
- Color tokens from design system
- No external visualization libraries unless strictly needed (D3 only for complex interactive charts)

---

*Maintained by Session 0. Last updated: 2026-07-02.*
*Reference: Ripple_Earth_Design_System.md, Ripple_Earth_Visual_Technical_Design.md, codebase `src/`*
