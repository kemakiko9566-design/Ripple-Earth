# Ripple Earth — Narrative Flow / 叙事流设计

> **How the website tells its story, scene by scene.**
> **网站如何一个场景接一个场景地讲述它的故事。**

---

## 1. Current State / 当前状态

The existing website has 7 scenes in this order:

现有网站有 7 个场景，按此顺序：

`
SceneOrigin        →  "From afar, Earth is a small blue marble" (abstract intro)
SceneEarthReveal   →  "We descend through layers of cloud" (atmosphere descent)
SceneOceanEcho     →  ocean systems
SceneSpill         →  pollution/spill
SceneInvisibleImpact → invisible effects
SceneGlobalEcho    →  global reverberations
SceneFuture        →  the future
`

**Problem / 问题：** The narrative is abstract. Beautiful, but there's no hook. No specific thing for the user to grab onto. No "wait, really?" moment in the first scene.

叙事是抽象的。漂亮，但没有钩子。没有具体的东西让用户抓住。第一幕没有"等等，真的？"的时刻。

---

## 2. Proposed Restructure / 建议重构

### New Flow / 新的流程

`
[ACT 1: The Invitation / 邀请]
  SceneOrigin:      小黄鸭的故事 → 一个浴缸玩具揭示了洋流的秘密
  SceneEarthReveal: "还有什么是我不知道的?" → 从太空下降

[ACT 2: The Hidden Systems / 隐藏系统]
  SceneOceanEcho:   鲸鱼泵 / 海洋中的看不见的工程师
  SceneSpill:       塑料天空 / 从天而降的塑料
  SceneInvisibleImpact: 噪音污染 / 臭氧 / 混凝土悖论

[ACT 3: The Scale / 尺度]
  SceneGlobalEcho:  僵尸火灾 / 沉睡的巨人 / 全球连接
  SceneFuture:      你已经看到了隐藏系统。现在呢？
`

---

## 3. Scene-by-Scene Redesign / 每个场景的重设计

### SceneOrigin — The Ducks

**Current / 当前:** "From afar, Earth is a small blue marble."
**Proposed / 建议:** The story of 28,800 rubber ducks.

**Visual / 视觉：**
- Start: A single rubber duck floating in darkness
- Text appears: "In 1992, 28,800 rubber ducks fell off a ship."
- Cut to: Globe view. One duck becomes thousands, dots spreading across ocean currents
- Text: "They spent 15 years tracing the ocean's hidden paths."
- Cut to: Duck dots revealing invisible current lines
- Text: "A child's bath toy became a scientific tool."
- Final text: "The planet is full of things you didn't know. This is the first of them."

**从：** "从远处看，地球是一颗蓝色弹珠。"
**到：** 28,800只橡皮鸭的故事。

---

### SceneEarthReveal — The Question

**Current / 当前:** "We descend through layers of cloud and atmosphere."
**Proposed / 建议:** Answer the question the ducks opened.

**Visual / 视觉：**
- Camera descends from space toward Earth
- Dots from the duck story become visible on the ocean surface
- Text: "What else don't we see?"
- Fade to: the planet in full view, but with ghost layers of data
- Text: "We descended into the atmosphere. But there's another descent. Into what we don't know."

---

### SceneOceanEcho — The Whale Pump

**Current / 当前:** Generic ocean scene
**Proposed / 建议:** The whale pump story

**Visual / 视觉：**
- Globe zooms to Southern Ocean
- A whale shape appears, diving
- A glowing nutrient plume blooms at the surface
- Hundreds of whales multiply
- Text: "Before whaling, the ocean had a biological pump you never knew about."
- Counterfactual toggle: whale pump on vs off
- Text: "We killed 90% of the whales. The pump almost stopped. It's slowly restarting."

---

### SceneSpill — The Plastic Sky

**Current / 当前:** Spill event
**Proposed / 建议:** Microplastics in the atmosphere

**Visual / 视觉：**
- Camera pulls back from ocean to show atmosphere
- Particles rise from ocean surface
- Wind systems carry them across continents
- Rain falls — colored particles in the rain
- Text: "Plastic doesn't just float in the ocean. It falls from the sky."
- Globe shows microplastic concentration in rain everywhere
- Text: "This cycle didn't exist 50 years ago."

---

### SceneInvisibleImpact — Sound, Ozone, Concrete

**Current / 当前:** Abstract "invisible impact"
**Proposed / 建议:** Three invisible stories, one scene

**Visual / 视觉：**
- Triptych or sequential reveal:
  1. Sound: ships creating expanding noise rings, whale calls shifting
  2. Ozone: the hole as a void, connected to shifting weather
  3. Concrete: buildings slowly glowing with absorbed CO2
- Text: "Some of the most important things happening are the things you cannot see."
- Each one is toggleable for deeper dive

---

### SceneGlobalEcho — Zombie Fires + Sleeping Giant

**Current / 当前:** Generic "global echo"
**Proposed / 建议:** Two stories about invisible fires and frozen carbon

**Visual / 视觉：**
- Globe zooms to Arctic
- Cross-section view: fire burning underground through winter
- Text: "In the Arctic, fire survives winter. It burns underground while the surface freezes."
- Second reveal: permafrost cross-section, carbon particles rising
- Text: "The ground beneath the Arctic holds twice as much carbon as the sky. It's thawing."
- Connection line drawn between zombie fire and permafrost — both are feedback loops

---

### SceneFuture — The Choice

**Current / 当前:** "The future"
**Proposed / 建议:** The closing question

**Visual / 视觉：**
- Globe slowly rotating, all data layers visible
- The duck from SceneOrigin appears again — small, floating
- Text: "You've seen 8 hidden connections. There are thousands more."
- The duck fades
- Text: "What happens next depends on what we choose to see."
- Fade to black, but starfield slowly reveals
- Final text: "The Earth is full of things you didn't know. Keep looking."

---

## 4. The Duck as a Recurring Motif / 鸭子作为循环出现的意象

The little yellow duck appears in every scene, in a different context:

小黄鸭在每个场景中以不同形式出现：

| Scene / 场景 | Duck Appears As / 鸭子出现为 |
|---|---|
| SceneOrigin | The main character — 28,800 ducks |
| SceneEarthReveal | Single duck floating on the ocean surface below |
| SceneOceanEcho | Duck-shaped nutrient tracer in the whale pump animation |
| SceneSpill | Rubber duck material fragments among microplastics |
| SceneInvisibleImpact | Duck on a globe, hearing no sound (acoustic story) |
| SceneGlobalEcho | Duck frozen in permafrost (sleeping giant) |
| SceneFuture | The original duck returns, fades away |

This creates a **visual thread** that ties the entire experience together.

这创建了一条**视觉线索**，把整个体验串在一起。

---

## 5. Technical Notes / 技术要点

| Change / 改动 | Impact / 影响 | Complexity / 复杂度 |
|---|---|---|
| Rewrite SceneOrigin text + visuals | Core scene | Medium |
| Add duck sprite to each scene | Visual pass | Low |
| Rewrite Scene text content | All scenes | Medium |
| Add counterfactual toggle controls | Interaction | Medium |
| Add knowledge graph visualization to SceneFuture | New feature | High |
| Add cross-section shader for permafrost/zombie | Shader work | High |

**Priority / 优先级：**
1. SceneOrigin — duck story (highest impact, lowest effort)
2. Scene text rewrites (all scenes)
3. Counterfactual toggle + visual updates
4. Duck sprite in each scene
5. Cross-section shader
6. Knowledge graph visualization

---

## 6. Connection to Knowledge Graph / 与知识图谱的连接

Each scene corresponds to one or more nodes in the knowledge graph:

每个场景对应知识图谱中的一个或多个节点：

| Scene / 场景 | Knowledge Graph Nodes / 图谱节点 |
|---|---|
| SceneOrigin | little_yellow_duck |
| SceneOceanEcho | whale_pump |
| SceneSpill | plastic_sky |
| SceneInvisibleImpact | invisible_orchestra, ozone_divide, concrete_paradox |
| SceneGlobalEcho | zombie_fire, sleeping_giant |
| SceneFuture | All nodes (full graph) |

This means: as the knowledge graph grows, scenes can be updated, swapped, or expanded without rewriting the narrative framework.

这意味着：随着知识图谱的增长，场景可以更新、替换或扩展，而无需重写叙事框架。

---

*End of Narrative Flow — 2026-07-01*

> **Note / 注：** This revision keeps the original Earth visual anchor ("From afar, Earth is a small blue marble") and layers the duck story on top of it, rather than replacing it. The visual anchor is too good to lose; the duck story gives it meaning.
> **这次修订保留了原有的地球视觉锚点（"从远处看，地球是一颗蓝色弹珠"），并把鸭子故事叠加在上面，而非替换它。视觉锚点太好了不能丢；鸭子故事给了它意义。**

---

### SceneOrigin — The Blue Marble and The Duck / 蓝色弹珠和那只鸭子

**Concept / 概念：** The duck emerges FROM the Earth visual. The journey is: far away → look closer → hidden stories.

鸭子从地球视觉中**长出来**。旅程是：远处→看近一点→隐藏故事。

**Visual Flow / 视觉流程：**

`
[Phase 1: The Blue Marble]
Globe slowly rotating in darkness. Small. Distant. Perfect.
地球在黑暗中缓慢旋转。小。远。完美。
"From afar, Earth is a small blue marble, slowly turning in the dark."
(≈5 seconds / 约5秒)

[Phase 2: Something on the surface]
Camera begins a slow zoom toward the ocean surface.
镜头开始缓慢向海洋表面推进。
A single dot becomes visible. Yellow, against the blue.
一个点变得可见。黄色，衬着蓝色。
"...But look closer."
(≈3 seconds)

[Phase 3: The Duck]
Zoom continues. The yellow dot resolves into a rubber duck, floating on the ocean.
放大继续。黄色点显现为一只橡皮鸭，漂浮在海洋上。
"In 1992, 28,800 rubber ducks fell off a cargo ship in the North Pacific."
(≈4 seconds)

The duck is alone on a vast ocean. Then another duck appears. Then another.
那只鸭子在广阔海洋上孤独漂浮。然后另一只出现。再一只。
"They didn't sink. They floated. And they kept floating."
(≈3 seconds)

[Phase 4: The Revelation]
POV pulls back. The ducks become a constellation of dots spreading across ocean currents.
视角拉回。鸭子变成散布在洋流上的星座般的点。
"For 15 years, they washed up on shores around the world. Oceanographers tracked them.
15年来，它们在世界各地的海岸上被冲上岸。海洋学家追踪它们。
A child's bath toy revealed the hidden paths of the ocean."
(≈5 seconds)

[Phase 5: The Thesis]
Globe fully visible. Duck dots now form glowing current lines — the hidden system revealed.
地球完全可见。鸭子点现在形成发光的洋流线——隐藏系统被揭示。
"Small things. Hidden connections. Planetary scale."
(≈3 seconds)

Final text appears, floating beside the globe:
最终文字出现，漂浮在地球旁：
"This is Ripple Earth. And this is only the beginning."
(≈4 seconds)
`

**Text Sequence / 文字序列：**

| Time / 时间 | Text / 文字 |
|---|---|
| 0s | "From afar, Earth is a small blue marble, slowly turning in the dark." |
| 5s | "But look closer." |
| 8s | "In 1992, 28,800 rubber ducks fell off a cargo ship in the North Pacific." |
| 12s | "They didn't sink. They floated. And they kept floating." |
| 15s | "For 15 years, they washed up on shores around the world. Oceanographers tracked them. A child's bath toy revealed the hidden paths of the ocean." |
| 20s | "Small things. Hidden connections. Planetary scale." |
| 24s | "This is Ripple Earth. And this is only the beginning." |

**Scroll Trigger / 滚动触发：**

The first phase (Blue Marble) plays on autoplay. The user can scroll, but the zoom + duck transition is driven by the scroll position. After the thesis line, scrolling continues to SceneEarthReveal.

第一阶段（蓝色弹珠）自动播放。用户可以滚动，但缩放+鸭子过渡由滚动位置驱动。在论点句之后，滚动继续到 SceneEarthReveal。

**The Thesis Line / 论点句：**

"Small things. Hidden connections. Planetary scale." becomes the project tagline. It appears in SceneOrigin and echoes throughout the experience.

"微小的事物。隐藏的连接。行星级的规模。" 成为项目标语。它在 SceneOrigin 中出现，并在整个体验中回响。

---

**Why this works / 为什么这样有效：**

1. **You keep the Earth visual** — the blue marble is preserved, not replaced / 保留了地球视觉——蓝色弹珠被保留，没有被替换
2. **The duck emerges naturally** — it starts as a tiny dot on the globe, the user has to zoom to see it / 鸭子自然地出现——它开始时是地球上一个小点，用户需要放大才能看到
3. **"But look closer"** — this becomes the motto of the entire experience / "但看近一点"——这成为整个体验的座右铭
4. **The thesis line** — "Small things. Hidden connections. Planetary scale." — introduces the product positioning in one line / 论点句——引入产品定位，一句话
5. **Scroll cue is preserved** — "Scroll to disturb the surface" becomes "Scroll to look closer" / 滚动提示被保留

---

## 7. Project Tagline / 项目标语

**"Small things. Hidden connections. Planetary scale."**
**"微小的事物。隐藏的连接。行星级的规模。"**

This line appears:
- In the final frame of SceneOrigin
- In the website header / metadata
- In the competition pitch closing
- Embedded in the knowledge graph UI

它出现在：
- SceneOrigin 的最后一帧
- 网站标题/元数据中
- 比赛演讲结尾
- 嵌入知识图谱 UI 中
