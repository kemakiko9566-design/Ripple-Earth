# Ripple Earth — 项目技术架构与视觉实现报告

> 综合梳理：技术架构、各功能实现方式、视觉效果-技术实现一一对应
> 基于代码库 `src/` 及文档 `docs/` 实际状态

---

## 一、总体技术架构 (Technical Architecture)

### 1.1 技术栈总览

| 层级 | 技术 | 用途 |
|------|------|------|
| 框架 | Next.js 16 (App Router) | 页面路由、SSR、文件结构 |
| 语言 | TypeScript 5 | 类型安全 |
| 样式 | Tailwind CSS 4 + CSS 自定义属性 | 工具优先样式 + 设计 Token |
| 3D / WebGL | Three.js 0.185 + @react-three/fiber 9.6 + drei 10.7 | 3D 地球、场景 |
| Post-processing | postprocessing 6.39 + 自定义 ShaderPass | Bloom、色差、景深 |
| Canvas 2D | 原生 Canvas API | 粒子、流线、热力图、数据可视化 |
| 滚动叙事 | GSAP 3.15 + ScrollTrigger | 场景过渡、文字动画、数据计数器 |
| 平滑滚动 | Lenis 1.3 | 增强滚动体验 |
| UI 组件基座 | shadcn/ui + Base UI 1.6 | Button、Badge、Card |
| 图标 | lucide-react 1.23 | 全部 UI 图标 |
| 地理工具 | d3-geo 3.1 + topojson-client 3.1 | 地图投影、拓扑数据 |
| 性能监控 | 自建 FPS/Memory Monitor | 开发调试 |
| CI/CD | Vercel Analytics + SpeedInsights | 线上分析 |

### 1.2 分层架构

```
+------------------------------------------------------------+
|                   App Router 层                              |
|  src/app/ (layout.tsx, page.tsx, stories/...)               |
+------------------------------------------------------------+
|              功能 Domain 组件层                                |
|  Scene/ Earth/ Effects/ Story/ UI/                          |
+------------------------------------------------------------+
|             Canvas 2D 可视化层                                 |
|  visual/ (DuckTrail, SandData, LightData...)                 |
+------------------------------------------------------------+
|            Three.js 3D 渲染层                                 |
|  Earth/Globe three/Earth shaders/                           |
+------------------------------------------------------------+
|           动画与交互调度层                                     |
|  animations/ hooks/ animation/                              |
+------------------------------------------------------------+
|            数据层 (静态 JSON)                                  |
|  data/stories.json + TypeScript 内联常量                      |
+------------------------------------------------------------+
```

### 1.3 路由结构

| 路由 | 页面 | 内容 |
|------|------|------|
| `/` | Home (Earth Experience) | 滚动纪录片，6 个叙事场景 |
| `/stories` | Ripple Archive | 故事网格 + 分类筛选 |
| `/stories/[slug]` | Story Detail | 完整故事页 + 时间线 + 数据可视化 |
| `/intelligence` | Earth Intelligence | 数据中枢 + 指标 + 风险分析 |

### 1.4 数据流

```
静态 JSON / TypeScript 常量
        |
        v
  页面组件 page.tsx
        |
        v
  Domain 组件 (Scene, StoryGrid, 等)
        |
        +-- Canvas 2D 可视化 (visual/*) -- requestAnimationFrame 循环
        +-- Three.js 地球 (Earth/Globe) -- R3F useFrame 循环
        +-- UI 组件 (UI/*) -- 纯 DOM
        +-- GSAP ScrollTrigger 时间线 -- progress prop (0-1)
```

关键规则：`progress` prop (0-1) 是场景组件接收滚动状态的规范方式，每个可视化组件拥有自己的 `requestAnimationFrame` 循环，Three.js 地球拥有自己的 `useFrame` 循环。

### 1.5 性能策略

- **懒加载**：Three.js 地球、Canvas 可视化、VideoBackground 等通过 `next/dynamic` 延迟加载
- **DPR 缩放**：Canvas 2D 使用 `window.devicePixelRatio` 精确渲染
- **几何共享**：Three.js 的 SphereGeometry 在模块级创建一次，多个 Mesh 复用
- **纹理优化**：云层纹理关闭 mipmap，法线/高光图使用 LinearSRGBColorSpace
- **LOD**：地球透明度 < 0.3 时切换到低多边形几何体 (48x48)
- **渲染层隔离**：`pointerEvents: none` 确保可视化叠加层不干扰交互

---

## 二、各功能实现方式

### 2.1 3D 地球 (Three.js Globe)

**文件**：`src/three/Earth.tsx` `src/components/Earth/Globe.tsx`

- 使用 `@react-three/fiber` 的 `<Canvas>` 创建 WebGL 渲染上下文
- 地球纹理：从 Three.js 示例服务器加载 `earth_atmos_2048.jpg` `earth_clouds_1024.png` `earth_specular_2048.jpg` `earth_normal_2048.jpg`
- 通过 `useLoader(TextureLoader, [...])` 并行加载四张纹理
- 地球材质：`MeshPhongMaterial` + 自发发光 `emissive: #3366aa, intensity: 0.25`
- 云层：独立 Mesh，透明度 12%，关闭 mipmap 以减少显存
- 大气辉光环：三层 BackSide SphereGeometry，透明度逐层递减
- 旋转：`useFrame` 中驱动 rotation.y 缓慢自转
- 过渡控制：外部 progress 驱动 globeOpacity 和 scale

### 2.2 滚动叙事系统

**文件**：`src/app/page.tsx` `src/animations/sceneTimeline.ts`

- **Lenis 平滑滚动**：在页面根组件初始化，duration 1.2，easing cubic-bezier
- **GSAP 集成**：`gsap.ticker.add()` 将 Lenis RAF 接入 GSAP
- **progress 状态管理**：Lenis scroll 事件计算归一化进度
- **场景进度曲线**：`useSceneTimeline()` 对原始 progress 应用 ease-out 映射
- **ScrollTrigger 场景注册**：为每个场景 section 创建独立 ScrollTrigger
- **IntersectionObserver**：额外用于 data-reveal 属性的元素首次入场

### 2.3 自定义 Shader (GLSL)

**文件**：`src/shaders/` 目录

#### 水面着色器 (WaterShader.ts)
- Gerstner 波函数叠加 8 层，Fresnel Schlick 近似，Blinn-Phong 高光，泡沫效果

#### 玻璃着色器 (GlassShader.ts)
- Schlick Fresnel 基于 IOR 1.5，折射扰动，薄膜干涉，色散边缘

#### 噪声着色器 (NoiseShader.ts)
- 3D Simplex Noise 的 GLSL 实现，FBM 叠加 8 层，顶点置换模式

#### Post-processing 效果
- **Bloom**：基于 luminance 阈值的软提取，ADD 混合
- **色差**：R/G/B 沿径向分离，边缘增强
- **景深**：基于深度缓冲的 CoC 计算，Poisson disc 采样

### 2.4 Canvas 2D 数据可视化

所有可视化组件遵循统一模式：
- 全屏固定 canvas (position fixed, pointerEvents none)
- 从 progress 计算 fade/sp (scene progress) 控制可见性
- 独立 requestAnimationFrame 循环
- DPR 适配
- 使用 JetBrains Mono 字体渲染数据标签

#### 小黄鸭轨迹 (DuckTrail.tsx)
- 35 个路径点，白色虚线 + dashOffset 流动，黄色已行段随 progress 增长
- 起点脉冲圆点 + 9 个登陆点标注

#### 沙子消耗 (SandData.tsx)
- 150 个沙粒粒子下落，消耗计数器从 50 BILLION 动态减少

#### 光污染 (LightData.tsx)
- 250 个灯光点径向渐变光晕 + 脉冲，百分比从 0% 增长到 50%

#### 压舱水 (BallastData.tsx)
- 10 个港口 12 条贝塞尔航线，物种扩散橙色波纹

#### 鲸鱼泵 (OceanPump.tsx)
- 鲸鱼轮廓 Canvas 路径，200 个营养粒子上升，80 个浮游植物 bloom
- 柱状图对比 100万 vs 1万，水平泵效率指示条

#### 线框地球 (EarthCanvas.tsx)
- TopoJSON 大陆轮廓，15度经纬网格，7 条洋流路径带箭头，鸭子轨迹虚线

### 2.5 场景组件

| 场景 | 视觉 | 技术实现 |
|------|------|----------|
| [Open] 3D 地球 | 地球 + 星空 + 标题动画 | R3F Globe + GSAP + CharReveal |
| [01] 鸭子轨迹 | 线框地图 + 鸭子航线 | Canvas 2D + TopoJSON |
| [02] 沙子 | 沙粒粒子 + 数字计数器 | Canvas 2D particle + GSAP |
| [03] 鲸鱼泵 | 鲸鱼轮廓 + 营养流 + 种群图 | Canvas 2D 路径 + 粒子 + 图表 |
| [04] 灯光 | 灯光扩散 + 数据百分比 | Canvas 2D 径向渐变 + 脉冲 |
| [05] 压舱水 | 航线 + 港口 + 物种扩散 | Canvas 2D 贝塞尔 + 波纹 |
| [06] 尾声 | 结束语 + CTA 按钮 | GSAP ScrollTrigger |
| 系统面板 | 4 数据卡片 | GSAP staggered + Glass Panel |

### 2.6 UI 系统

- **Header**：玻璃面板，鼠标靠近显示，远离隐藏
- **SceneIndex**：右侧 7 场景导航，Lenis scrollTo 跳转
- **ScrollProgress**：顶部滚动进度条
- **ScientificOverlay**：坐标/数据流 HUD
- **RipplePath**：SVG path 渐现曲线

---

## 三、视觉效果-技术实现对应关系

### 3.1 完整对应表

| 视觉效果 | 视觉描述 | 技术实现 | 文件 |
|----------|----------|----------|------|
| 地球球体 | 高分辨率纹理 + 云层 + 高光 + 法线 | R3F + TextureLoader + MeshPhongMaterial | three/Earth.tsx |
| 地球辉光 | 三层半透明 BackSide 球壳 | SphereGeometry + meshBasicMaterial | three/Earth.tsx |
| 星空背景 | 1500-2000 随机散布发光点 | drei Stars / BufferGeometry + PointsMaterial | three/Earth.tsx |
| 云层动画 | 12% 透明度云层旋转 | 独立 Mesh + useFrame rotation.y | three/Earth.tsx |
| 地球过渡 | 右到中 + 放大 + 淡出 | R3F group position/scale + globeOpacity 映射 | three/Earth.tsx |
| 粒子星空 | 400 星闪烁微动 | Canvas 2D requestAnimationFrame | Effects/SpaceParticles |
| 科学线框地球 | 经纬网格 + 大陆 + 洋流 | Canvas 2D + TopoJSON + d3-geo 投影 | visual/EarthCanvas |
| 鸭子轨迹线 | 白色虚线 + 黄色已行段 | Canvas 2D setLineDash + lineDashOffset | visual/DuckTrail |
| 起点标记 | 脉冲圆点 + 数据标签 | Canvas 2D arc + fillText | visual/DuckTrail |
| 登陆点 | 9 位置 + 年份 + 地名 | Canvas 2D fillText + progress 渐现 | visual/DuckTrail |
| 沙粒下落 | 150 粒淡黄沙粒飘落 | Canvas 2D 粒子系统 + RAF | visual/SandData |
| 消耗计数器 | 数字减少 | Canvas 2D fillText + progress 映射 | visual/SandData |
| 灯光扩散 | 250 光点 + 径向渐变光晕 | Canvas 2D createRadialGradient + 脉冲 | visual/LightData |
| 百分比数据 | XX% 增长到 50% | Canvas 2D fillText + progress 映射 | visual/LightData |
| 全球航线 | 12 条贝塞尔曲线连接港口 | Canvas 2D quadraticCurveTo | visual/BallastData |
| 物种扩散 | 橙色波纹从港口扩散 | Canvas 2D arc + radialGradient | visual/BallastData |
| 鲸鱼轮廓 | 简约线框鲸鱼 | Canvas 2D 路径 + closePath | visual/OceanPump |
| 营养粒子 | 200 粒子深海上升变绿 | Canvas 2D 粒子 + 颜色渐变 + glow | visual/OceanPump |
| 浮游植物 | 80 绿色光晕点 + 脉冲 | Canvas 2D radialGradient | visual/OceanPump |
| 鲸鱼种群图 | 柱状图 100万 vs 1万 | Canvas 2D fillRect + fillText | visual/OceanPump |
| 泵效率条 | 水平进度条 + 百分比 | Canvas 2D fillRect | visual/OceanPump |
| HUD 覆盖 | 坐标 + 数据流状态 + 扫描 | DOM div + CSS + JetBrains Mono | visual/ScientificOverlay |
| 异常节点 | 脉冲橙色圆点 + 辉光 | DOM div + setInterval + box-shadow | visual/AnomalyNode |
| Ripple 路径 | SVG 贝塞尔渐现 | SVG path + strokeDasharray/offset | visual/RipplePath |
| Ripple 波动 | 波纹扩散 + 粒子散射 | Canvas 2D wave rings + particle | Ripple/RippleEffect |
| Bloom 辉光 | 亮度阈值 + 泛光叠加 | postprocessing.Effect + GLSL | shaders/BloomPass |
| 色差 | R/G/B 径向分离 | postprocessing.Effect + GLSL | shaders/ChromaticPass |
| 景深 | 深度缓冲焦点模糊 | postprocessing.Effect + GLSL + depth | shaders/DOFPass |
| 水面着色 | Gerstner 波 + Fresnel + 泡沫 | ShaderMaterial + GLSL | shaders/WaterShader |
| 玻璃着色 | Fresnel 折射 + 薄膜干涉 | ShaderMaterial + GLSL | shaders/GlassShader |
| 噪声着色 | 3D Simplex + FBM + 顶点置换 | ShaderMaterial + GLSL | shaders/NoiseShader |
| 大气辉光 | CSS 渐变 + 模糊 + 动画 | CSS radial-gradient + blur + keyframes | Effects/AtmosphereGlow |
| CharReveal | 字符逐字动画 | GSAP | animations/CharReveal |
| 玻璃面板 | 毛玻璃效果 | CSS backdrop-filter + rgba | tokens.css |
| 场景过渡 | opacity + translateY 视差 | GSAP ScrollTrigger fromTo | 每个 Scene |
| 滚动进度条 | 顶部细线填充 | CSS + scroll 事件 | UI/ScrollProgress |

### 3.2 渲染引擎选择策略

| 渲染引擎 | 用于 | 不用于 |
|----------|------|--------|
| Three.js (R3F) | 3D 地球云层辉光 | 粒子系统 (Canvas 更轻) |
| Canvas 2D | 轨迹线粒子图表热力图 | 3D 对象 |
| DOM + CSS | UI 组件 HUD 玻璃面板 | 动态数据可视化 |
| SVG | RipplePath 等简单曲线 | 复杂交互图形 |
| GLSL (postprocessing) | Bloom 色差景深 | 移动端 Bloom |

### 3.3 组件分层与 z-index

```
page.tsx (调度层)
  |
  +-- 3D 渲染层 (z-index 0)
  |   +-- Earth (Three.js)
  |   +-- SpaceParticles (Canvas)
  |
  +-- 科学可视化层 (z-index 1)
  |   +-- EarthCanvas (TopoJSON + 洋流)
  |
  +-- 场景可视化层 (z-index 2)
  |   +-- DuckTrail / SandData / LightData / BallastData / OceanPump
  |
  +-- 前景效果层 (z-index 3-5)
  |   +-- RipplePath / RippleEffect / ScientificOverlay / AnomalyNode
  |
  +-- 叙事场景层
  |   +-- SceneOrigin / Scene02 / SceneEarthReveal / ...
  |
  +-- UI 层 (z-index 30)
  |   +-- Header / SceneIndex / ScrollProgress / Cursor
  |
  +-- 性能诊断层
      +-- FPSCounter / MemoryMonitor
```

---

## 四、关键设计决策说明

### 4.1 为什么用 Canvas 2D 而非 Three.js 粒子
- 轻量，无需 GPU context 切换
- 多层独立更新互不阻塞
- 风格与 NASA SciVis 一致

### 4.2 为什么用 progress 而非 scrollY
- 归一化值设备无关
- Ease-out 缓动曲线更平滑
- 场景内 progress 松耦合设计

### 4.3 为什么 GSAP + Lenis
- GSAP ScrollTrigger 是行业标准
- Lenis 提供更好的滚动物理
- 两者集成成熟

### 4.4 为什么自定义 Post-processing
- postprocessing 库的 Effect 基类更简洁
- 内置 BlendMode
- 自定义 GLSL 完全可控

---

*生成日期：2026-07-03 · 基于代码库实际分析*
