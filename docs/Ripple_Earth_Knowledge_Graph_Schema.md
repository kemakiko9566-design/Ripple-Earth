# Ripple Earth — Knowledge Graph Schema & Crawler Architecture
# 知识图谱数据结构和爬虫架构

> **Technical specification for the Hidden Story Engine.**
> **隐藏故事引擎的技术规范。**

---

## 1. Why a Knowledge Graph / 为什么是知识图谱

The hidden connection stories are not independent facts. They are a **network** — each story connects to others through shared systems, mechanisms, or causal chains. A knowledge graph captures this structure naturally.

这些隐藏连接故事不是独立的事实。它们是一个**网络**——每个故事通过共享系统、机制或因果链连接到其他故事。知识图谱自然地捕捉了这种结构。

Instead of a flat list of stories, we build a **graph of connections** that grows organically as new stories are discovered.

不是扁平的故事列表，我们建立一个**连接图谱**，随着新故事的发现而有机地生长。

---

## 2. Story Node Schema / 故事节点数据结构

`json
{
  "id": "whale_pump",
  "type": "story_node",
  "version": 2,

  "titles": {
    "en": "The Whale Pump",
    "zh": "鲸鱼泵"
  },

  "summary": {
    "en": "Whales fertilize the ocean. Before whaling, this planetary-scale nutrient pump sustained massive phytoplankton blooms. We killed 90% of the whales. The pump stopped.",
    "zh": "鲸鱼给海洋施肥。在捕鲸之前，这个行星级的营养泵维持着大规模的浮游植物水华。我们杀死了90%的鲸鱼。泵停止了。"
  },

  "systems": ["ocean", "biosphere", "nutrient_cycle"],
  "mechanisms": ["pump", "feedback_loop", "vertical_transport"],

  "data_sources": [
    {
      "name": "Whale population historical estimates",
      "url": "https://example.org/whale-population-study",
      "type": "research_paper"
    },
    {
      "name": "NASA Ocean Color (chlorophyll)",
      "url": "https://oceancolor.gsfc.nasa.gov",
      "type": "satellite_api"
    }
  ],

  "surprise_score": 8,
  "duck_score": 7,
  "visual_method": "particle_advection",

  "tags": ["hidden_pump", "ocean_engineers", "planetary_scale"],

  "connected_to": [
    {"node_id": "little_yellow_duck", "relation": "ocean_currents", "strength": 0.6},
    {"node_id": "plastisphere", "relation": "ocean_ecosystem", "strength": 0.4},
    {"node_id": "sargasso_belt", "relation": "ocean_productivity", "strength": 0.5}
  ],

  "status": "published",
  "created_at": "2026-07-01",
  "crawl_source": "manual"
}
`

**Field Descriptions / 字段说明：**

| Field / 字段 | Type / 类型 | Required / 必填 | Purpose / 用途 |
|---|---|---|---|
| id | string | yes | Unique identifier, snake_case / 唯一标识 |
| type | "story_node" | yes | Fixed / 固定值 |
| version | int | yes | Schema version / 数据结构版本 |
| titles | {en, zh} | yes | Bilingual titles / 双语标题 |
| summary | {en, zh} | yes | One-paragraph summary / 一段话摘要 |
| systems | string[] | yes | Earth system categories / 地球系统分类 |
| mechanisms | string[] | yes | Process mechanisms / 过程机制 |
| data_sources | object[] | yes | Where data comes from / 数据来源 |
| surprise_score | 1-10 | yes | How surprising is this? / 震惊程度 |
| duck_score | 1-10 | yes | How naturally does it connect to the duck story? / 与鸭子故事的自然连接程度 |
| visual_method | string | yes | Recommended visualization technique / 推荐的可视化技术 |
| tags | string[] | no | Flexible categorization / 灵活分类 |
| connected_to | object[] | yes | Links to other nodes / 链接到其他节点 |
| status | "draft","published","archived" | yes | Publication status / 发布状态 |
| created_at | date | yes | Creation date / 创建日期 |
| crawl_source | string | yes | How this node was discovered / 如何被发现 |

---

## 3. Controlled Vocabularies / 受控词汇

### Systems / 系统

`
ocean, atmosphere, cryosphere, biosphere, lithosphere,
hydrosphere, urban_system, climate_system, human_activity
`

### Mechanisms / 机制

`
pump, feedback_loop, transport, accumulation, dispersion,
fragmentation, phase_change, chemical_reaction, biological_cycle,
anthropogenic_forcing, cascade_effect, tipping_point
`

### Visual Methods / 可视化方法

`
particle_advection     — 粒子漂流 (currents, transport)
heatmap               — 热力图 (temperature, concentration)
flow_lines            — 流线 (currents, shipping)
cross_section         — 横截面 (subsurface, permafrost)
ghost_layer           — 幽灵图层 (hidden vessels, noise)
spectral_shift        — 频谱偏移 (methane, CO2)
scale_juxtaposition   — 尺度并置 (small object vs planetary effect)
time_lapse            — 时间推移 (change over decades)
`

---

## 4. Connection Schema / 连接数据结构

Each connection is a bi-directional edge between two story nodes:

每个连接是两个故事节点之间的双向边：

`json
{
  "source": "little_yellow_duck",
  "target": "whale_pump",
  "relation": "ocean_currents",
  "strength": 0.6,
  "description": {
    "en": "Both stories involve the movement of objects through ocean currents — rubber ducks reveal the current paths, and whale pump nutrients travel along those same currents.",
    "zh": "两个故事都涉及物体通过洋流的运动——橡皮鸭揭示了洋流路径，鲸鱼泵的营养物质沿着同样的洋流传播。"
  }
}
`

**Connection strength / 连接强度：**

| Range | Meaning / 含义 |
|---|---|
| 0.0-0.3 | Distant connection / 远距离连接 |
| 0.3-0.6 | Moderate connection / 中等连接 |
| 0.6-0.9 | Strong connection / 强连接 |
| 0.9-1.0 | Same phenomenon, different angle / 同一现象，不同角度 |

---

## 5. Crawler Architecture / 爬虫架构

`
┌──────────────────────────────────────────────────┐
│                   Crawler Engine                  │
│  (Python, scheduled: daily / weekly)              │
└──────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────────────────────────────────────┐
│               Source Monitor Layer                │
├──────────────────────────────────────────────────┤
│  [Science RSS]  Nature, Science, PNAS feeds       │
│  [Press RSS]    NASA, NOAA, ESA press releases    │
│  [Databases]    ResearchGate, Google Scholar      │
│  [News]         Environmental news aggregators    │
│  [Social]       Academic Twitter / Mastodon       │
└──────────────────────────────────────────────────┘
          │ (new articles)
          ▼
┌──────────────────────────────────────────────────┐
│              Signal Extraction Layer              │
├──────────────────────────────────────────────────┤
│  1. Title + abstract scan for "connection"        │
│     language (surprising links, hidden effects)   │
│                                                   │
│  2. NLP extraction:                               │
│     - What's the hidden connection?               │
│     - Which systems are involved?                 │
│     - What's the mechanism?                       │
│     - Can it be visualized?                       │
│                                                   │
│  3. Surprise score estimation                     │
│     (keyword-based + human review)                │
└──────────────────────────────────────────────────┘
          │ (candidate story)
          ▼
┌──────────────────────────────────────────────────┐
│              Connection Linker                    │
├──────────────────────────────────────────────────┤
│  - Compare with existing nodes in knowledge graph │
│  - Find shared systems, mechanisms, tags          │
│  - Calculate connection strength                  │
│  - Suggest bi-directional links                   │
│  - Flag orphan nodes (no connections)             │
└──────────────────────────────────────────────────┘
          │ (linked story)
          ▼
┌──────────────────────────────────────────────────┐
│              Output + Curation                    │
├──────────────────────────────────────────────────┤
│  - Write candidate JSON to /candidates/           │
│  - Notify for human review                        │
│  - If approved: add to knowledge graph            │
│  - If rejected: archive with reason               │
│  - Published stories → website API                │
└──────────────────────────────────────────────────┘
`

---

## 6. Sources to Monitor / 监控来源 (initial list)

| Source / 来源 | Type / 类型 | Why / 原因 |
|---|---|---|
| Nature.com RSS | Science journal | Earth system discoveries |
| Science.org RSS | Science journal | Same |
| NASA Earth Observatory | Press + data | Satellite discoveries |
| NOAA Research News | Press | Ocean + atmosphere |
| ESA Earth Observation | Press | European perspective |
| EurekAlert Earth Science | Aggregator | Multi-source |
| AGU Advances | Journal | Geoscience |
| Global Fishing Watch blog | Org blog | Ocean activity |
| Mongabay | Environmental news | Hidden stories |

---

## 7. File Structure / 文件结构

`
/knowledge-graph/
├── schema.json              # This schema
├── nodes/
│   ├── little_yellow_duck.json
│   ├── whale_pump.json
│   ├── plastic_sky.json
│   ├── concrete_paradox.json
│   ├── ozone_divide.json
│   ├── zombie_fire.json
│   ├── dark_fleet.json
│   ├── sleeping_giant.json
│   └── invisible_orchestra.json
│
├── connections/
│   ├── all_connections.json   # Complete edge list
│   └── by_strength.json       # Sorted for visualization
│
├── candidates/                # Pending human review
│   └── 2026-07-01_candidate.json
│
├── crawler/
│   ├── monitor.py             # RSS + API polling
│   ├── extract.py             # NLP signal extraction
│   ├── linker.py              # Connection matching
│   └── config.json            # Source URLs, intervals
│
└── export/
    ├── knowledge-graph.json   # Complete graph export
    └── knowledge-graph.gexf   # Gephi-compatible export
`

---

## 8. Integration with Website / 与网站集成

`json
{
  "endpoint": "/api/stories",
  "response": [
    {
      "id": "whale_pump",
      "title": "The Whale Pump",
      "summary": "...",
      "systems": ["ocean", "biosphere"],
      "connected_stories": ["little_yellow_duck", ...],
      "visual": "particle_advection",
      "data": {}
    }
  ]
}
`

The frontend fetches story nodes from /api/stories. Each node includes connected_stories for generating the graph visualization. The globe renders the isual_method for active stories.

前端从 /api/stories 获取故事节点。每个节点包含 connected_stories 用于生成图谱可视化。地球为活跃故事渲染对应的 isual_method。

---

*End of Knowledge Graph Schema — 2026-07-01*
