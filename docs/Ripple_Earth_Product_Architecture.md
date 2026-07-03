# Ripple Earth — Product Architecture & Page Design Specification
# 产品架构与页面设计规范

> **From "a single-page visual experience" to a complete "Earth Impact Research & Action Platform"**
> **从"单页视觉作品"升级为"地球影响研究与行动平台"**

---

## Table of Contents / 目录

1. [Product Positioning / 产品定位](#1-product-positioning--产品定位)
2. [Product Structure / 产品结构](#2-product-structure--产品结构)
3. [Navigation & User Flow / 导航与用户流程](#3-navigation--user-flow--导航与用户流程)
4. [Page 1: Home (Earth Experience) / 首页](#4-page-1-home-earth-experience--首页)
5. [Page 2: Ripple Archive (Earth Stories) / 故事库](#5-page-2-ripple-archive-earth-stories--故事库)
6. [Page 3: Earth Intelligence / 数据平台](#6-page-3-earth-intelligence--数据平台)
7. [Page 4: Solutions / 商业化](#7-page-4-solutions--商业化)
8. [Page 5: Community (Earth Pulse) / 社区](#8-page-5-community-earth-pulse--社区)
9. [Design System: The Ripple Line / 统一设计语言](#9-design-system-the-ripple-line--统一设计语言)
10. [Technical Architecture / 技术架构](#10-technical-architecture--技术架构)
11. [Competition Value / 比赛价值](#11-competition-value--比赛价值)

---

# 1. Product Positioning / 产品定位

## What This Is / 这是什么

Not a "corporate website." Not a "blog." Not a "dashboard."

不是一个"企业网站"。不是一个"博客"。不是一个"仪表盘"。

Ripple Earth is a **trinity**:

Ripple Earth 是一个**三位一体**：

> **Digital Museum + Environmental Intelligence Platform + Sustainability Consulting Brand**
> **数字博物馆 + 环境情报平台 + 可持续咨询品牌**

## The User Journey / 用户旅程

`
ENTER → FEEL (Home) → UNDERSTAND (Stories) → ANALYZE (Data) → ACT (Solutions) → SHARE (Community)
进入 → 感受 (首页) → 理解 (故事) → 分析 (数据) → 行动 (咨询) → 分享 (社区)
`

## Business Logic / 商业逻辑

| Phase | Product Section | Value Delivered |
|---|---|---|
| 1. Emotional Hook | Home | Brand spirit. "I had no idea" moment. |
| 2. Depth | Ripple Archive | Content depth. Story library. Knowledge accumulation. |
| 3. Credibility | Earth Intelligence | Data legitimacy. Research backing. B2B value. |
| 4. Commercial | Solutions | Revenue model. Enterprise services. |
| 5. Community | Earth Pulse | User growth. UGC. Continuous engagement. |

---

# 2. Product Structure / 产品结构

`
                            ┌─────────────────────┐
                            │    RIPPLE EARTH      │
                            │  地球影响研究与行动平台  │
                            └─────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Earth Stories  │      │   Earth Pulse    │      │   Solutions      │
│  故事库 / 档案馆   │      │  社区 / 实时故事墙  │      │  解决方案         │
│                  │      │                  │      │                  │
│  Story Grid      │      │  Live Masonry    │      │  How We Help     │
│  → Detail Page   │      │  → Submit Story  │      │  Case Studies    │
│  Timeline View   │      │                  │      │  Contact         │
└──────────────────┘      └──────────────────┘      └──────────────────┘
          │
          ▼
┌──────────────────┐
│  Earth Intelligence│
│  数据平台         │
│                  │
│  Data Hub        │
│  Risk Analysis   │
│  Reports         │
└──────────────────┘
`

## Navigation / 导航结构

`
RIPPLE EARTH  [logo]

Explore ▼
├── Earth Experience   (Home — interactive documentary)
├── Ripple Archive     (Story library)
├── Earth Intelligence  (Data & research)
├── Solutions          (Enterprise services)
└── Earth Pulse        (Community wall)
`

---

# 3. Navigation & User Flow / 导航与用户流程

## User Types / 用户类型

| User Type | Primary Path | Goal |
|---|---|---|
| **General visitor** | Home → Stories → (share) | Emotional experience, knowledge |
| **Student / researcher** | Stories → Intelligence → (download data) | Research material |
| **Enterprise / brand** | Home → Solutions → Cases → Contact | Sustainability partnership |
| **Community member** | Stories → Pulse → Submit | Contribute, engage |

## Primary Flow / 主导流程

`
Landing (Home)
    │
    ├──→ Ripple Archive (browse stories)
    │       │
    │       └──→ Story Page (read, interact, share)
    │
    ├──→ Earth Intelligence (browse data)
    │
    ├──→ Solutions (view services)
    │       │
    │       └──→ Contact / Inquiry
    │
    └──→ Earth Pulse (community wall)
            │
            └──→ Submit Story (user contribution)

                    ┌─→ Email capture
    Exit ───────────┤
                    └─→ Share to social
`

---

# 4. Page 1: Home (Earth Experience) / 首页

## Purpose / 目的

Brand spirit. Emotional hook. The "I had no idea" moment. First impression determines whether user explores further.

品牌精神。情感钩子。"我完全不知道"的时刻。第一印象决定用户是否继续探索。

## Pages / 页面

Single page. Immersive scroll experience. 6 scenes.

单页。沉浸式滚动体验。6 个场景。

*(See Ripple_Earth_Storyboard.md for complete scene-by-scene design.)*

## User Action / 用户动作

| Action | Trigger | Response |
|---|---|---|
| Scroll | Scene progression | Smooth GSAP transitions |
| Pause | Any scene | Content holds, atmosphere continues |
| Click on Ripple line | Scene marker | Jump to corresponding scene |
| "Explore Stories" CTA | End of experience | Navigate to Ripple Archive |

## Visual / 视觉

- Dark theme throughout
- 3D globe (video or Three.js)
- White wireframe digital Earth
- Particle flow systems
- Minimal text overlay — no buttons during experience

## Technical / 技术实现

| Layer | Technology |
|---|---|
| Globe | Three.js or MP4 video texture |
| Animation | GSAP ScrollTrigger timeline |
| Data particles | Canvas 2D |
| Text overlay | React + Tailwind, fade transitions |
| Scroll container | Lenis smooth scroll (optional) |

---

# 5. Page 2: Ripple Archive (Earth Stories) / 故事库

## Purpose / 目的

Content depth. Knowledge accumulation. Show that Ripple Earth is not a single story — it is a growing collection.

内容深度。知识积累。展示 Ripple Earth 不是一个单一故事——它是一个不断增长的集合。

## Pages / 页面

### 5.1 Story Grid / 故事网格

A photography exhibition-style masonry grid.

摄影展风格的瀑布流网格。

#### Layout / 布局

`
┌──────┐  ┌────────┐
│      │  │        │
│ img1 │  │  img2  │
│      │  │        │
└──────┘  └────────┘
     ┌────────┐
     │        │
     │  img3  │
     │        │
     └────────┘
┌────────┐  ┌──────┐
│        │  │      │
│  img4  │  │ img5 │
│        │  │      │
└────────┘  └──────┘
`

#### Visual Effects / 视觉效果

| Effect | Implementation |
|---|---|
| Masonry layout | React Masonry or CSS columns |
| Parallax on scroll | Framer Motion or GSAP |
| Slow zoom on hover | CSS transform + transition |
| Dark overlay reveal | Opacity fade on hover |
| Category filter | Top bar — sticky, minimal |

#### Filter / 过滤

`
All  |  Ocean  |  Climate  |  Water  |  Urban  |  Biodiversity
`

### 5.2 Story Detail Page / 故事详情页

Rich narrative page for each story in the archive.

每个故事的丰富叙事页面。

#### Layout / 布局

`
┌────────────────────────────────────────┐
│                                        │
│         Hero Image / Video             │
│          (full-bleed)                   │
│                                        │
│         Title / Subtitle               │
│         Category badge                 │
│                                        │
├────────────────────────────────────────┤
│                                        │
│    Timeline                            │
│                                        │
│    1980 ── 1990 ── 2000 ── 2010 ── now│
│      │       │       │       │       │  │
│    Event   Event   Event   Event   Event│
│                                        │
├────────────────────────────────────────┤
│                                        │
│    Data Visualization                  │
│    (Canvas / Three.js)                 │
│                                        │
├────────────────────────────────────────┤
│                                        │
│    Narrative Text                      │
│    (scroll-driven parallax)           │
│                                        │
├────────────────────────────────────────┤
│                                        │
│    Related Stories                     │
│    ┌───┐ ┌───┐ ┌───┐                 │
│    │   │ │   │ │   │                   │
│    └───┘ └───┘ └───┘                 │
│                                        │
└────────────────────────────────────────┘
`

#### Components / 组件

| Component | Description | Technology |
|---|---|---|
| Hero | Full-bleed image/video | Next.js Image / video element |
| Timeline | Horizontal scrollable timeline | React + GSAP |
| Data viz | Interactive data visualization | Canvas 2D / Three.js |
| Narrative text | Scroll-driven story text | GSAP ScrollTrigger |
| Related stories | 3-card grid at bottom | React + Tailwind |

## User Action / 用户动作

| Action | Trigger | Response |
|---|---|---|
| Scroll grid | Mouse / touch | Parallax masonry |
| Click card | Any story card | Navigate to detail page |
| Scroll detail page | Mouse / touch | Timeline + data viz progress |
| Share story | Share button | Copy link / social share |
| "Back to archive" | Nav button | Return to grid |

## Technical / 技术实现

| Requirement | Solution |
|---|---|
| Masonry grid | React Masonry library or CSS columns |
| Smooth scroll | Lenis |
| Parallax | Framer Motion or GSAP |
| Timeline | Custom React component + GSAP |
| Data-driven | JSON files for story content |

---

# 6. Page 3: Earth Intelligence / 数据平台

## Purpose / 目的

Demonstrate data legitimacy. Provide research value. Show that Ripple Earth is backed by real data.

展示数据合法性。提供研究价值。展示 Ripple Earth 有真实数据支撑。

## Pages / 页面

### 6.1 Data Hub Overview / 数据总览

A clean, minimal dashboard showing key environmental indicators.

一个干净、简洁的仪表盘，展示关键环境指标。

#### Layout / 布局

`
┌────────────────────────────────────────┐
│  Earth Intelligence Hub                │
│                                        │
│  ┌────────────┐  ┌────────────┐       │
│  │ Ocean      │  │ Climate    │       │
│  │ Temp: +1.2°│  │ CO2: 427ppm│       │
│  │ Currents: ▓│  │ Sea Ice: ░░│       │
│  └────────────┘  └────────────┘       │
│                                        │
│  ┌────────────┐  ┌────────────┐       │
│  │ Water      │  │ Urban      │       │
│  │ Stress: ▒░ │  │ AQI: 85    │       │
│  │ Quality: ░ │  │ Heat: +2.3°│       │
│  └────────────┘  └────────────┘       │
│                                        │
│  [Source: NASA, NOAA, UNEP]           │
└────────────────────────────────────────┘
`

#### Key Metrics / 关键指标

| Category | Metric | Source |
|---|---|---|
| Ocean | SST anomaly, current velocity | NASA PO.DAAC |
| Climate | CO2 concentration, temperature anomaly | NOAA GML, NASA GISS |
| Water | Groundwater depletion, river discharge | NASA GRACE, USGS |
| Urban | PM2.5, NO2 concentration | OpenAQ, ESA TROPOMI |

### 6.2 Risk Analysis / 风险分析

Enterprise-facing section showing environmental risks by region/industry.

面向企业的板块，按区域/行业展示环境风险。

#### Layout / 布局

`
┌────────────────────────────────────────┐
│  Risk Analysis                         │
│                                        │
│  Region: [Dropdown]                    │
│  Industry: [Dropdown]                  │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Risk Map                         │ │
│  │  (Globe with heat overlay)        │ │
│  │                                   │ │
│  └──────────────────────────────────┘ │
│                                        │
│  Risk Score: 72/100                    │
│  Key Factors: Water scarcity,          │
│  Temperature anomaly                   │
│                                        │
└────────────────────────────────────────┘
`

### 6.3 Data Reports / 数据报告

Downloadable research reports. PDFs generated from the research data.

可下载的研究报告。从研究数据生成的 PDF。

## User Action / 用户动作

| Action | Trigger | Response |
|---|---|---|
| Select category | Tab click | Switch data view |
| Hover metric | Mouse | Show detailed tooltip |
| Download report | Button click | PDF download |
| Explore map | Globe interaction | Regional data drill-down |

## Visual / 视觉

- McKinsey + NASA aesthetic — clean, data-heavy, minimal
- Dark background with data card overlays
- Charts and graphs in monochrome + cyan accent
- Globe with data overlay (same Three.js globe, different layer)

---

# 7. Page 4: Solutions / 商业化

## Purpose / 目的

Commercial conversion. Show how Ripple Earth helps businesses. Revenue model.

商业转化。展示 Ripple Earth 如何帮助企业。收入模式。

## Pages / 页面

### 7.1 How We Help / 我们如何帮助

Three service cards:

`
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌───────┐│
│  │                 │  │                 │  │       ││
│  │ Environmental   │  │ Impact           │  │ Sust. ││
│  │ Assessment      │  │ Visualization    │  │ Story ││
│  │                 │  │                 │  │       ││
│  │ Identify risks  │  │ Turn ESG data   │  │ Craft ││
│  │ Measure impact  │  │ into compelling │  │ brand ││
│  │ Regulatory      │  │ visual stories  │  │ env.  ││
│  │ compliance      │  │                 │  │ story ││
│  └─────────────────┘  └─────────────────┘  └───────┘│
│                                                      │
└──────────────────────────────────────────────────────┘
`

### 7.2 Case Studies / 案例研究

Example client projects (realistic but not necessarily real for competition).

示例客户项目（比赛版可以含真实感但非实际项目）。

`
┌────────────────────────────────────────┐
│  Case Study: Water Corp               │
│                                        │
│  Challenge: Water scarcity risk        │
│  Solution: Visual impact assessment    │
│  Result: 30% reduction in water risk   │
│                                        │
│  [Read Full Case →]                   │
└────────────────────────────────────────┘
`

### 7.3 Contact / 咨询

Simple contact form. Not "Contact Us" — "Start a Conversation."

## User Action / 用户动作

| Action | Trigger | Response |
|---|---|---|
| View service | Card click | Expand / detail view |
| Read case study | Case card click | Detail page |
| Submit inquiry | Form submit | Send to email / CRM |
| Request demo | CTA button | Calendar booking |

---

# 8. Page 5: Community (Earth Pulse) / 社区

## Purpose / 目的

User growth. UGC. Continuous engagement. Show that Ripple Earth is a living platform.

用户增长。用户生成内容。持续参与。展示 Ripple Earth 是一个活的平台。

## Pages / 页面

### 8.1 Earth Pulse Wall / 地球脉搏墙

Real-time masonry story wall. Each card = a user-submitted environmental observation.

实时瀑布流故事墙。每张卡片 = 用户提交的环境观察。

#### Card Design / 卡片设计

`
┌──────────────────────────┐
│                          │
│     [Photo]              │
│                          │
│  Shenzhen River, 2026    │
│  "Water clarity improved │
│   after rain season"     │
│                          │
│  ──────────────────────  │
│  🌍 Shenzhen, China      │
│  📅 July 1, 2026         │
│                          │
│  [View Ripple →]        │
└──────────────────────────┘
`

### 8.2 Submit Story / 提交故事

Form for users to submit their own environmental observations.

用户提交自己环境观察的表单。

#### Form Fields / 表单字段

| Field | Type | Required |
|---|---|---|
| Photo/Video | Upload | Yes |
| Location | Auto-detect or manual | Yes |
| Date | Date picker | Yes |
| Description | Text area | Yes |
| Category | Tag select | Optional |

## User Action / 用户动作

| Action | Trigger | Response |
|---|---|---|
| Scroll wall | Mouse / touch | Infinite scroll masonry |
| Click card | Card click | Open story modal / detail |
| Submit story | "Share" button | Open submit form |
| Upload photo | Form upload | Preview + submit |

---

# 9. Design System: The Ripple Line / 统一设计语言

## Definition / 定义

The Ripple Line is the **visual backbone** of the entire product. It appears in every page, transforming to match the context.

Ripple Line 是整个产品的**视觉骨架**。它出现在每个页面，根据上下文变化形态。

## States by Page / 各页面状态

| Page | Form | Meaning |
|---|---|---|
| Home — Scene 01 | Dormant hairline on globe | The hidden connection waiting to be discovered |
| Home — Scene 02-04 | Flowing current line | Data in motion, system revealed |
| Home — Scene 05 | Ripple rings | Impact propagation |
| Ripple Archive — Grid | Connecting line between cards | Stories are linked, not isolated |
| Ripple Archive — Detail | Timeline axis | The chronological path of an event |
| Earth Intelligence | Connecting data nodes | Data relationships |
| Solutions | Service connecting line | From problem to solution |
| Earth Pulse | Subtle grid line | Community connections growing |

## Visual Specifications / 视觉规格

| Property | Value |
|---|---|
| Color | Cyan (#00E5FF) to White gradient |
| Thickness | 0.5px (dormant) → 2px (active) |
| Opacity | 0.08 (dormant) → 0.9 (active) |
| Animation | Dash offset (flow), circle expansion (ripple) |
| Context | Always connected to the page content — never decorative |

## Implementation / 技术实现

| Context | Implementation |
|---|---|
| Three.js scene | THREE.Line + ShaderMaterial |
| Canvas scene | Canvas 2D path + animation |
| UI element | SVG or CSS border animation |
| Brand logo | Animated SVG |

---

# 10. Technical Architecture / 技术架构

## Stack / 技术栈

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | Routing, SSR, file structure |
| Styling | Tailwind CSS | Utility-first styling |
| 3D / WebGL | Three.js (via @react-three/fiber) | Globe rendering |
| Data visual | Canvas 2D | Particles, flow lines, heat maps |
| Animation | GSAP (ScrollTrigger) | Scroll narrative, transitions |
| UI motion | Framer Motion | Component-level animations |
| Smooth scroll | Lenis | Premium scroll feel |
| Images | Next.js Image + blur placeholder | Optimized image grid |

## Page Structure / 页面结构

`
src/
├── app/
│   ├── page.tsx                 # Home (Earth Experience)
│   ├── layout.tsx                # Root layout (nav + footer)
│   ├── stories/
│   │   ├── page.tsx              # Ripple Archive Grid
│   │   └── [slug]/
│   │       └── page.tsx          # Story Detail
│   ├── intelligence/
│   │   ├── page.tsx              # Earth Intelligence Hub
│   │   └── reports/
│   │       └── page.tsx          # Report detail
│   ├── solutions/
│   │   └── page.tsx              # Solutions + Cases + Contact
│   └── community/
│       ├── page.tsx              # Earth Pulse Wall
│       └── submit/
│           └── page.tsx          # Submit Story Form
│
└── components/
    ├── Earth/                    # Globe, Wireframe, Particles
    ├── UI/                       # Header, Footer, Navigation
    ├── Story/                    # StoryGrid, StoryCard, StoryTimeline
    ├── Data/                     # DataHub, RiskMap, Charts
    └── Community/                # PulseWall, SubmitForm
`

## Data Strategy / 数据策略

| Page | Data Source | Format |
|---|---|---|
| Home | Inline (scene config) | TypeScript constants |
| Ripple Archive | JSON files in /data/stories/ | JSON schema (see Knowledge Graph spec) |
| Earth Intelligence | JSON files in /data/metrics/ | JSON with real source references |
| Earth Pulse | Initial: JSON seed data | JSON |
| Solutions | Inline content | TypeScript constants |

For the competition version, all data is static JSON. No backend needed.

比赛版所有数据为静态 JSON，无需后端。

---

# 11. Competition Value / 比赛价值

## Why This Wins / 为什么这能赢

| Criteria | How Ripple Earth Satisfies It |
|---|---|
| **1. Problem identification** | Environmental storytelling is broken. Same images, same guilt trips. People have tuned out. |
| **2. Innovation** | Not another eco-blog. An interactive documentary + intelligence platform + consulting brand. |
| **3. Feasibility** | All components use proven technologies. No backend needed for competition. JSON-driven. |
| **4. Business viablity** | Three revenue streams: Enterprise visualization services, B2B intelligence, sustainability storytelling. |
| **5. Team story** | Two students who discovered hidden connections and built a platform to share them. Honest. Real. |
| **6. Design excellence** | Awwwards-level scroll experience. NASA + Apple aesthetic. Coherent design language across all pages. |

## The Pitch / 30秒演讲

> "We started asking questions. The Earth is full of things we didn't know. A rubber duck traced ocean currents. Concrete breathes CO2. Plastic falls from the sky. We built a platform to share these discoveries — not as another guilt trip, but as a revelation.
>
> Ripple Earth is an interactive documentary that changes how you see the planet. It's an intelligence platform backed by real NASA and NOAA data. And it's a business that helps organizations understand and communicate their environmental impact.
>
> You cannot protect what you cannot see. Ripple Earth makes the invisible visible."

---

*End of Product Architecture Document — 2026-07-01*
*Next Phase: Architecture → Page Implementation → Competition Preparation*
