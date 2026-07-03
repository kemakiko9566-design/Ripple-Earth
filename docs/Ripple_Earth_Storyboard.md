# Ripple Earth — Interactive Environmental Documentary
# Scene-by-Scene Storyboard / 分镜设计文档

> **定位：** 这不是一个环保网页。这是一个交互式环境纪录片 (Interactive Environmental Documentary)。
> **目标：** Awwwards / 国际数字叙事奖级别的 Web Experience
> **原则：** 视觉体验 > 叙事 > 真实数据完整度 > 后端功能

---

## Table of Contents / 目录

1. [Project Positioning / 项目定位](#1-project-positioning--项目定位)
2. [Technical Architecture / 技术架构](#2-technical-architecture--技术架构)
3. [Component Sourcing Strategy / 组件来源策略](#3-component-sourcing-strategy--组件来源策略)
4. [The Living Trace / 贯穿路线设计](#4-the-living-trace--贯穿路线设计)
5. [Chapter 0 — Loading / Awakening](#5-chapter-0--loading--awakening)
6. [Scene 01 — THE EARTH WE SEE](#6-scene-01--the-earth-we-see)
7. [Scene 02 — BELOW THE SURFACE](#7-scene-02--below-the-surface)
8. [Scene 03 — THE FIRST RIPPLE](#8-scene-03--the-first-ripple)
9. [Scene 04 — THE INVISIBLE OCEAN](#9-scene-04--the-invisible-ocean)
10. [Scene 05 — SCALE OF IMPACT](#10-scene-05--scale-of-impact)
11. [Scene 06 — PLANETARY MEMORY](#11-scene-06--planetary-memory)
12. [Reference Direction / 参考方向](#12-reference-direction--参考方向)

---

# 1. Project Positioning / 项目定位

## Core Thesis / 核心论点

> **The Earth is full of things you didn't know. We saw some of them. Now we want you to see them too.**
> **地球上有太多你不知道的事。我们看到了其中一些。现在想让你也看到。**

## User Experience / 用户体验定位

The user is not "browsing a website." They are **passing through a planetary cognition process.**

用户不是"浏览网页"。用户是在**穿过一次地球认知过程。**

## Flow / 体验流程

`
Awakening (Loading) → The Earth We See (3D globe) → Below the Surface (wireframe Earth)
→ The First Ripple (little yellow ducks) → The Invisible Ocean (currents, particles)
→ Scale of Impact (system change visualization) → Planetary Memory (return with knowledge)
`

---

# 2. Technical Architecture / 技术架构

A pragmatic, layered system that prioritizes visual quality and development speed over low-level customization.

一个务实的、分层系统，优先考虑视觉质量和开发速度，而非底层定制。

`
┌─────────────────────────────────────────────────────┐
│ Layer 4: UI (React)                                  │
│ Data cards, scene nodes, info panels, typography     │
│ React + Tailwind / Framer Motion                     │
├─────────────────────────────────────────────────────┤
│ Layer 3: Data Visuals (Canvas)                       │
│ Particles, heat maps, scan rings, flow lines         │
│ Canvas 2D / OffscreenCanvas                          │
├─────────────────────────────────────────────────────┤
│ Layer 2: Motion System (GSAP)                        │
│ Scroll-driven narrative, pin, fade, scale, morph     │
│ GSAP ScrollTrigger / ScrollSmoother                  │
├─────────────────────────────────────────────────────┤
│ Layer 1: Video / 3D (Background)                     │
│ Earth rendering, atmospheric effects                 │
│ MP4/WebM video textures OR Three.js                  │
└─────────────────────────────────────────────────────┘
`

## Layer Details / 各层详解

| Layer | Technology | Responsibility |
|---|---|---|
| Layer 1: Video / 3D | MP4/WebM Video Texture or Three.js | Earth rendering, video globe |
| Layer 2: Motion | GSAP + ScrollTrigger | Scroll-driven narrative, scene transitions |
| Layer 3: Data Visuals | Canvas 2D | Particles, flow lines, heat maps, scan circles |
| Layer 4: UI | React + Tailwind | Data cards, scene labels, information overlays |

## Key Decision: Video vs Three.js for Earth

| Approach | Pros | Cons | Recommendation |
|---|---|---|---|
| **Video + WebM** | Cinema-grade quality; stable performance; no WebGL overhead; easy to swap | No real interaction; large file size | **Recommended for competition / limited dev time** |
| Three.js Globe | Interactive; real-time data overlay | Dev time cost; performance tuning; complexity | Use if time permits for Scene 01 and Scene 06 |

Many award-winning websites use **video + scroll-driven frame** rather than real-time rendering. This is a proven pattern.

很多获奖网页使用**视频 + 滚动驱动帧**而不是实时渲染。这是一个成熟的模式。

---

# 3. Component Sourcing Strategy / 组件来源策略

Do not build from scratch. Compose from proven libraries and resources.

不要从零造轮子。从成熟的库和资源中组合。

| Component | Source | Purpose |
|---|---|---|
| Glow effects, cards, animated text | React Bits / Aceternity UI | UI polish, dynamic text |
| Globe rendering | Three.js examples / video | Earth visualization |
| Particle system | Canvas 2D / Three.js Points | Flow lines, data visualization |
| Scroll-driven narrative | GSAP ScrollTrigger demos | Scene transitions, timeline |
| Data cards | Custom React + Tailwind | Scene information overlays |

---

# 4. The Living Trace / 贯穿路线设计

Not a static SVG line. A **living trace** that evolves through three states across the experience.

不是一条静态 SVG 曲线。是一个**活的轨迹**，在整个体验中经历三种状态。

## State 1: Dormant / 休眠态

**Scene 01 — The Earth We See**

Almost invisible. Appears as a coordinate annotation on the globe.

几乎看不见。显示为地球上的坐标标注。

`
Style: thin hairline, opacity 0.15, gray
Position: bottom of viewport
Motion: static, barely perceptible
`

## State 2: Flow / 流动态

**Scene 02-04 — Below the Surface through The First Ripple**

Transforms into an ocean current. A path of propagation.

变成洋流。一条传播路径。

`
Style: glowing line, opacity 0.4-0.8, cyan-to-white gradient
Position: follows the data flow on the wireframe Earth
Motion: animated dash offset, particles flowing along the path
`

## State 3: Ripple / 涟漪态

**Scene 05 — Scale of Impact**

Affected by events. Creates ripples, waves, propagation rings.

受事件影响。产生波纹、波浪、传播环。

`
Style: thickened line with ripple rings at key points
Position: expanding from data points on the Earth
Motion: concentric ring expansion, frequency-based pulse
`

---

# 5. Chapter 0 — Loading / Awakening

> **Purpose:** Create a sense of ritual. Film-like opening.
> **目的：制造仪式感。电影般的开场。**

## Visual / 视觉

- Pure black screen. Pure darkness.
- A faint signal appears — a single pixel or glitch.
- Text appears in monospace, terminal-style:
`
EARTH SYSTEM INITIALIZING...
`
- The text fades after 2 seconds.
- Then a low-frequency audio pulse (optional).

## Animation / 动画

| Time | Event |
|---|---|
| 0.0s | Black screen |
| 0.5s | Glitch / pixel flicker |
| 1.0s | "EARTH SYSTEM INITIALIZING..." types out letter by letter |
| 3.0s | Text fades |
| 4.0s | Screen remains black. Transition to Scene 01 begins. |

## Emotion / 情绪

Anticipation. Ceremony. Something is waking up.

期待。仪式感。某物正在苏醒。

## Technical / 技术实现

- Pure CSS animation for text typing
- setTimeout or GSAP timeline for timing
- Transition: opacity 0 → 1, then 1 → 0 over 1s each

---

# 6. Scene 01 — THE EARTH WE SEE

> **Purpose:** Present the familiar Earth. Create the visual anchor.
> **目的：呈现熟悉的地球。创建视觉锚点。**

## Visual / 视觉

- 3D Earth rotating slowly, centered in frame
- Earth starts with Africa's eastern edge visible (current implementation)
- Deep space background with stars
- "From afar, Earth is a small blue marble, slowly turning in the dark." (text overlay)
- The **Living Trace** appears as a faint coordinate line at the bottom

## Interaction / 交互

- User scrolls to begin the journey
- Scroll drives: Earth scale 1.0 → 1.3, opacity 1.0 → 0

## Animation / 动画

| Scroll Progress | Event |
|---|---|
| 0% | Earth visible, scale 1.0, full opacity. "From afar..." text visible |
| 50% | Earth begins scaling up (1.0 → 1.3) and rotating |
| 100% | Earth reached max scale, opacity reaches 0. **Black screen.** |

## Emotion / 情绪

Awe. Familiarity. Then — the familiar dissolves.

敬畏。熟悉。然后——熟悉的东西消失了。

## Technical / 技术实现

| Element | Implementation |
|---|---|
| Globe | Three.js SphereGeometry (current Globe.tsx) with NASA earth texture |
| Rotation | Auto-rotate + scroll-driven rotation |
| Scale/Opacity | GSAP timeline tied to scroll progress |
| Transition | Opacity fade to black at end of scene |

**Current state:** Globe.tsx with Africa-edge rotation, OceanCurrents removed. This scene is already working.

---

# 7. Scene 02 — BELOW THE SURFACE

> **Purpose:** Enter the hidden layer. The Earth's blueprint.
> **目的：进入隐藏层。地球的蓝图。**

## Visual / 视觉

- Black background
- A **white line-art Earth** appears — Earth Blueprint style
- Elements: lat/long grid lines, topographic contours, coordinate markers, scan lines
- Aesthetic: NASA data interface, architectural blueprint
- The **Living Trace** transitions from dormant to flow — becomes visible, glowing

## Text / 文字

`
Surface scan complete.
Beneath the familiar image...
...there is another layer.
`

## Emotion / 情绪

Discovery. Transition. "There is more here than I thought."

发现。过渡。"这里比我想的更多。"

## Animation / 动画

| Time | Event |
|---|---|
| 0.0s | Screen black (from Scene 01 fade) |
| 0.5s | Lat/long grid lines fade in (wireframe sphere) |
| 1.5s | White continental outlines appear |
| 2.5s | Scan lines sweep across the globe |
| 3.5s | Text appears, line by line |
| 5.0s | Scene settles. Living Trace becomes visible as a glowing flow line |

## Technical / 技术实现

| Element | Implementation |
|---|---|
| Wireframe globe | Three.js with EdgesGeometry or LineSegments on sphere |
| Lat/long grid | Custom Line geometry at regular intervals |
| Scan lines | Animated opacity sweep (GSAP or ShaderMaterial) |
| Continental outlines | Simplified coastline data as Line geometry |
| Living Trace | Animated dashed line with GSAP |

**Alternative:** Canvas 2D drawing of wireframe globe (simpler, no WebGL dependency).

---

# 8. Scene 03 — THE FIRST RIPPLE

> **Purpose:** Tell the little yellow duck story — the anchor narrative.
> **目的：讲小黄鸭的故事——锚点叙事。**

## Visual / 视觉

- The white wireframe Earth from Scene 02 remains as background
- A data UI overlay appears in the style of a system detection interface
- A single point appears on the globe — location of the 1992 spill

## Data UI / 数据界面

`
╔══════════════════════════════════════╗
║  ANOMALY 001  DETECTED              ║
║                                      ║
║  YEAR:     1992                      ║
║  LOCATION: NORTH PACIFIC OCEAN       ║
║  SOURCE:   CONTAINER SPILL           ║
║  OBJECTS:  28,800 RUBBER DUCKS       ║
║  SIGNAL:   LOW → TRACKING           ║
╚══════════════════════════════════════╝
`

## Animation / 动画

| Time | Event |
|---|---|
| 0.0s | Scene 02 transitions to Scene 03. Wireframe Earth visible. |
| 0.5s | A single yellow dot appears at 44°N, 178°W (the spill location) |
| 1.0s | Data UI panel slides in from the right |
| 2.0s | Multiple yellow dots begin to spread across the ocean — tiny, multiplying |
| 3.0s | Dots form flowing paths — tracing ocean currents |
| 4.0s | Text appears: "A child's bath toy became a scientific tool." |
| 5.0s | Dots fade. The **Living Trace** now glows — it has become the current path. |

## Emotion / 情绪

Surprise. Intrigue. "Wait — this actually happened?"

惊讶。好奇。"等等——这件事真的发生过？"

## Technical / 技术实现

| Element | Implementation |
|---|---|
| Anomaly dot | Canvas 2D or Three.js Points — single bright yellow point |
| Spreading dots | Particle system — dots multiply and follow pre-computed current paths |
| Data UI | React component with typewriter effect |
| Flow paths | Pre-defined lat/lng paths (already exist from OceanCurrents research data) |

---

# 9. Scene 04 — THE INVISIBLE OCEAN

> **Purpose:** The first "punch" — reveal that the ocean is a living system.
> **目的：第一个爆点——揭示海洋是一个活的系统。**

## Visual / 视觉

- The wireframe Earth transitions to a **dark ocean field**
- Ocean current flow lines appear — cyan and orange particles flowing in complex patterns
- The **Living Trace** is now fully active — flowing along the currents
- Multiple current systems reveal themselves simultaneously:

`
Gulf Stream          (warm — orange)
Kuroshio Current     (warm — orange)
Antarctic Circumpolar (cold — cyan)
Humboldt Current     (cold — cyan)
Brazil Current       (warm — orange)
S. Equatorial        (cold — cyan)
`

## Text / 文字

`
The ocean is not a backdrop.
It is a dynamic system.
Constant motion. Global scale. Hidden from view.
`

## Emotion / 情绪

Awe. Realization. "The ocean is alive in a way I never understood."

敬畏。领悟。"海洋以一种我从未理解的方式活着。"

## Animation / 动画

| Time | Event |
|---|---|
| 0.0s | Scene 03 flows into Scene 04. Wireframe Earth dims. |
| 0.5s | First current line appears (Gulf Stream) — orange flow |
| 1.0s | Second (Kuroshio) — orange flow in Pacific |
| 1.5s | Third (Antarctic Circumpolar) — cyan band around Antarctica |
| 2.0s | All 6 currents visible simultaneously. Particle flow begins. |
| 2.5s | Particles animate along current paths |
| 3.5s | Text fades in |
| 5.0s | Full flowing ocean visualization stable |

## Technical / 技术实现

| Element | Implementation |
|---|---|
| Current flow lines | Animated CatmullRomCurve3 lines with dash offset |
| Particles | Points material flowing along curve paths (the OceanCurrents concept) |
| Background | Dark blue-black gradient |
| Color coding | Warm currents (#ff6b35), cold currents (#00e5ff) |

**Note:** This component was previously built as OceanCurrents.tsx and removed. It can be re-created in Canvas 2D for better performance, or restored in Three.js with optimization.

---

# 10. Scene 05 — SCALE OF IMPACT

> **Purpose:** Plague Inc-style system change visualization. Show how small events propagate.
> **目的：瘟疫公司式系统变化可视化。展示小事件如何传播。**

## Visual / 视觉

- The flow lines from Scene 04 become **affected** by external events
- A point source appears — representing pollution, temperature change, or an introduced material
- Visual propagation: a single dot expands into a spreading pattern:

`
    ●
    
    ○               ○
            →
    ○○              ○○○
    
    ○○○○           ○○○○○○
`

- Three data layers toggle or blend:
  1. **Ocean plastic concentration** — particle density in gyres
  2. **Temperature anomaly** — heat map overlay on globe
  3. **Ecosystem impact** — species range shift lines

## Data Points / 数据点

- Microplastic concentration in the Great Pacific Garbage Patch
- Sea surface temperature anomaly zones
- Marine debris accumulation over time

## Text / 文字

`
A single event.
Multiplied by current.
Amplified by system.
Planetary in scale.
`

## Emotion / 情绪

Systemic understanding. Scale shock. "This one thing touched everything."

系统性理解。尺度冲击。"这一件事触及了一切。"

## Animation / 动画

| Time | Event |
|---|---|
| 0.0s | Scene 04 currents fade to background |
| 0.5s | A bright point appears (e.g., a river mouth) |
| 1.0s | Particles spread from the point, following current paths |
| 1.5s | Accumulation zones begin to glow — gyre hot spots |
| 2.5s | Heat map overlay appears (temperature anomaly) |
| 3.5s | All three data layers visible simultaneously |
| 5.0s | View settles on full data visualization |

## Technical / 技术实现

| Element | Implementation |
|---|---|
| Point source | Three.js Points with bright sprite |
| Particle spread | Particle system with current-following behavior |
| Accumulation heatmap | Heatmap overlay (Canvas or custom shader) |
| Temperature overlay | Color gradient texture on globe surface |
| Layer toggle | UI buttons (React) controlling visibility |

---

# 11. Scene 06 — PLANETARY MEMORY

> **Purpose:** Return to the 3D Earth. But now the user knows: beneath the surface, there are systems.
> **目的：回到 3D 地球。但用户现在知道：表面之下存在系统。**

## Visual / 视觉

- Return to the 3D Earth from Scene 01
- But this time — data layers are visible on the globe
- The **Living Trace** completes its arc — it has become a permanent mark on the Earth
- Final text overlay:

`
The Earth is full of things you didn't know.
We saw some of them.
Now you have seen them too.

Keep looking.
`

## Emotion / 情绪

Resolution. New understanding. The world looks different now.

收束。新的理解。世界现在看起来不一样了。

## Animation / 动画

| Time | Event |
|---|---|
| 0.0s | Fade in from Scene 05 |
| 1.0s | 3D Earth appears — identical to Scene 01, but with data overlays |
| 2.0s | Current lines gently pulse on the ocean surface |
| 3.0s | The Living Trace glows once, then settles |
| 4.0s | Final text fades in, one line at a time |
| 6.0s | Scene holds. Gentle auto-rotation continues. |

## Technical / 技术实现

| Element | Implementation |
|---|---|
| Globe | Same as Scene 01 — video or Three.js |
| Data layers | Subtle overlays (texture blend or ParticleSystem) — low opacity |
| Living Trace | Final glowing line on globe surface |
| Text | React overlay with fade animation |

---

# 12. Reference Direction / 参考方向

## Essential References / 必看参考

| Reference | Why | What to Steal |
|---|---|---|
| **Atlas by D-LAB** | Cinematic scroll experience; video + GSAP + Three.js | Scroll-driven narrative pacing; video frame integration |
| **CyberFiction by Karan Singh** | Awwwards WebGL project | 3D integration in scroll narrative; visual polish |
| **Washington Post — World's Best-Designed Digital** | Award-winning digital storytelling | Text + visual + interaction fusion; data journalism approach |
| **NASA Scientific Visualization Studio** | Scientific data visualization | Colormaps, data aesthetics, Earth rendering |
| **Plague Inc.** | Global system spread visualization | Infection propagation visual language |
| **earth.nullschool.net** | Real-time Earth data viz | Particle flow, minimal UI |

## Design Language Summary / 设计语言总结

| Element | Direction |
|---|---|
| Color palette | Black, white, cyan accent (#00E5FF), orange (#FF6B35) |
| Typography | Inter (light/extra-light), monospace for data UI |
| Grid | Minimal — hidden until interaction |
| Motion | Slow, deliberate — never fast or jarring |
| Data visualization | Line art, particles, heat maps — never photorealism (except Scene 01/06 Earth) |

---

*End of Storyboard Document — 2026-07-01*
*Next Phase: Storyboard → Visual Design → Implementation*
