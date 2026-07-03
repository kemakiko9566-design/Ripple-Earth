# Ripple Earth — Scientific Data Catalog / 科学数据目录

> **Restored from the original research document (Version 1). Contains all data tables, API sources, and technical visualization mappings.**
> **从原始调研文档（版本1）恢复。包含所有数据表、API来源和技术可视化映射。**

---

## 1. Ocean Data / 海洋数据

| Data Name / 数据名称 | Source / 来源 | API / Download | Resolution | Visual Method / 可视化方法 |
|---|---|---|---|---|
| Sea Surface Temperature / 海表温度 | NASA OBPG (MODIS Aqua) | https://oceancolor.gsfc.nasa.gov | 4.6 km daily | Heatmap / 热力图 |
| Ocean Currents / 洋流 | NASA PO.DAAC (OSCAR) | https://podaac.jpl.nasa.gov | 0.33deg 5-day | Particle flow lines / 粒子流线 |
| Sea Surface Height / 海面高度 | NASA / CNES (Jason-3) | https://www.aviso.altimetry.fr | 25 km 10-day | Color contour / 彩色等高线 |
| Chlorophyll-a / 叶绿素浓度 | NASA OBPG | https://oceancolor.gsfc.nasa.gov | 4 km daily | Bloom overlay / 水华叠加 |
| Ocean pH / 海洋酸度 | NOAA PMEL | https://www.pmel.noaa.gov/co2/story | 1deg monthly | pH gradient / 酸碱度梯度 |
| Microplastics / 微塑料 | NOAA Marine Debris | https://marinedebris.noaa.gov | Sparse points | Particle density / 粒子密度 |
| Marine Debris / 海洋垃圾 | University of Hawaii | https://www.microplastic.uh.edu | 1deg monthly | Accumulation heatmap / 积累热力图 |
| Fishing Effort / 捕鱼强度 | Global Fishing Watch | https://globalfishingwatch.org | 0.01deg daily | Vessel heatmap / 船只热力图 |
| Coral Bleaching / 珊瑚白化 | NOAA Coral Reef Watch | https://coralreefwatch.noaa.gov | 5 km weekly | Alert color map / 警报色图 |

---

## 2. Climate Data / 气候数据

| Data Name / 数据名称 | Source / 来源 | API / Download | Resolution | Visual Method / 可视化方法 |
|---|---|---|---|---|
| Temperature Anomaly / 温度异常 | NASA GISS | https://data.giss.nasa.gov/gistemp | 2deg monthly | Warming stripes / 暖色条带 |
| CO2 Concentration / CO2浓度 | NOAA GML (Mauna Loa) | https://gml.noaa.gov/ccgg/trends | Daily point | Keeling curve / 基林曲线 |
| CO2 Column / CO2柱浓度 | NASA OCO-2 | https://ocov2.jpl.nasa.gov | 1deg 16-day | Global concentration / 全球浓度 |
| Methane (CH4) / 甲烷 | NASA GMAO | https://gmao.gsfc.nasa.gov | 0.5deg monthly | Anomaly hot spots / 异常热点 |
| Sea Ice Extent / 海冰范围 | NSIDC | https://nsidc.org/data/seaice_index | 25 km daily | Ice boundary animation / 冰边界动画 |
| Ice Sheet Mass / 冰盖质量 | NASA GRACE | https://grace.jpl.nasa.gov | 300 km monthly | Mass loss gradient / 质量损失梯度 |
| Glacial Retreat / 冰川退缩 | WGMS | https://wgms.ch | Annual point | Recession lines / 退缩线 |
| Wildfire / 野火 | NASA FIRMS | https://firms.modaps.eosdis.nasa.gov | 375 m daily | Fire dots + smoke / 火点+烟雾 |
| Precipitation / 降水 | NASA GPM | https://gpm.nasa.gov | 0.1deg daily | Rain animation / 降雨动画 |
| Drought Index / 干旱指数 | NOAA NCEI | https://www.drought.gov | 0.5deg monthly | Severity color map / 严重程度色图 |
| Permafrost / 永久冻土 | GTN-P | https://gtnp.arcticportal.org | Annual point | Thaw depth profile / 解冻深度剖面 |

---

## 3. Water Resources Data / 水资源数据

| Data Name / 数据名称 | Source / 来源 | Resolution | Visual Method / 可视化方法 |
|---|---|---|---|
| River Discharge / 河流流量 | USGS / GRDC | Point daily | Flow rate pulse / 流量脉冲 |
| Groundwater Storage / 地下水储量 | NASA GRACE-FO | 300 km monthly | Depletion colormap / 枯竭色图 |
| Water Quality / 水质 | USGS NWIS | Point variable | Plume radius / 羽流半径 |
| Nutrient Pollution / 营养污染 | USGS / UN GEMS | Point variable | Gradient rings / 梯度环 |
| Reservoir Level / 水库水位 | Global Reservoir Database | Point monthly | Fill-level bar / 水位条 |
| Evapotranspiration / 蒸散发 | NASA MODIS | 500 m 8-day | Vapor particles / 水汽粒子 |
| Water Scarcity / 水资源压力 | WRI Aqueduct | 0.5deg annual | Stress polygon / 压力多边形 |

---

## 4. Urban & Atmospheric Data / 城市与大气数据

| Data Name / 数据名称 | Source / 来源 | Resolution | Visual Method / 可视化方法 |
|---|---|---|---|
| PM2.5 / 细颗粒物 | OpenAQ | Point real-time | Haze density / 雾霾密度 |
| NO2 / 二氧化氮 | ESA TROPOMI | 5.5 km daily | Urban plume / 城市羽流 |
| CO2 Emissions / CO2排放 | Carbon Monitor | 1deg daily | Emission plume / 排放羽流 |
| Nighttime Lights / 夜间灯光 | NASA VIIRS | 500 m annual | Globe night glow / 地球夜光 |
| Urban Extent / 城市范围 | NASA MODIS | 300 m annual | Growing boundary / 生长边界 |
| Heat Island / 热岛效应 | NASA Landsat | 30 m 16-day | City temperature / 城市温度 |
| Light Pollution / 光污染 | NASA VIIRS DNB | 500 m annual | Glow intensity / 发光强度 |
| Aerosol Optical Depth / 气溶胶 | NASA MODIS | 10 km daily | Atmospheric haze / 大气雾霾 |

---

## 5. Key API Endpoints / 关键API端点

| API | Rate Limit | Key Required | Use For / 用途 |
|---|---|---|---|
| NASA EOSDIS (CMR) | 1000 req/hr | Free token | Satellite data search / 卫星数据搜索 |
| OpenAQ | 100 req/min | Free | Real-time air quality / 实时空气质量 |
| Global Fishing Watch | 10 req/sec | Free key | Vessel activity / 船只活动 |
| NOAA CoastWatch | Moderate | Not required | Ocean color, SST / 海洋颜色、海温 |
| World Bank Climate | Unlimited | Not required | Country indicators / 国家指标 |
| UN Data | Unlimited | Not required | Cross-domain data / 跨领域数据 |
| ESA Copernicus | 100 req/min | Free registration | Satellite imagery / 卫星影像 |
| Open-Meteo | 10,000 req/day | Not required | Historical weather / 历史天气 |

---

## 6. Data to Rendering Technology Map / 数据到渲染技术映射

| Data Type / 数据类型 | Recommended Tech / 推荐技术 | Reasoning / 原因 |
|---|---|---|
| Globe base + terrain / 地球基底 | Three.js SphereGeometry + custom shaders | Native 3D control, shader access |
| Particle systems / 粒子系统 | Three.js Points / BufferGeometry + GPU compute | 10K-100K particles at 60fps |
| Flow lines / 流线 | Three.js Line / CatmullRomCurve3 + animated dash | Smooth curved paths |
| Heatmap overlays / 热力图叠加 | Three.js ShaderMaterial with texture | Per-pixel color mapping |
| Atmospheric glow / 大气辉光 | Fresnel shader on sphere | Physical atmospheric scattering |
| Ice boundaries / 冰边界 | ShapeGeometry + dynamic update | Real-time geometry updates |
| Animated data points / 动画数据点 | Three.js Points with sprite textures | Event-driven bursts |
| 2D overlays / 2D叠加 | Canvas2DTexture mapped to sphere | Lower complexity |
| UI transitions / UI过渡 | GSAP ScrollTrigger + timeline | Smooth narrative |
| Data processing / 数据处理 | Next.js Server Components + fetch | Server-side aggregation |
| Time-based play / 时间播放 | React state + requestAnimationFrame | Frame-level control |

---

## 7. Data Pipeline Architecture / 数据管线架构

`
Data Sources (APIs / static files)
       |
       v
  [Data Fetching Layer]
  |-- fetchData.ts (Next.js Server Components)
  |-- csvParser.ts (local CSV conversion)
  |-- apiAggregator.ts (rate-limited multi-API fetch)
       |
       v
  [Data Processing Layer]
  |-- normalizeToGrid.ts (resample to uniform grid)
  |-- interpolateTimeline.ts (fill temporal gaps)
  |-- clampRange.ts (auto-scale for visual range)
  |-- colorMap.ts (scientific colormap -> texture)
       |
       v
  [Rendering Layer (Three.js)]
  |-- GlobeShader (atmosphere, temperature, ice)
  |-- ParticleSystem (currents, dust, plastic)
  |-- FlowLineRenderer (shipping, river)
  |-- HUD / UI Overlay (data labels, time slider)
`

---

*Restored from Version 1 — 2026-07-01*
