"use client";
import { useRef, useEffect, useState } from "react";

const TOPO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

var DUCK_TRAIL = [
  [28,-16],[29,-16],[30,-16.5],[31,-17],[32,-16.5],[33,-16],[34,-16],
  [35,-16.5],[36,-17],[37,-16.5],[38,-16],[39,-16],[40,-16.5],
  [41,-16],[42,-15.5],[43,-15],[44,-14.5],[45,-14],[46,-13.5],
  [47,-13],[48,-12.5],[49,-12],[50,-11.5],[51,-11],[52,-10.5],
  [53,-10],[54,-9.5],[55,-9],[56,-8.5],[57,-8],[58,-7.5]
];

const CURRENT_PATHS = [
  {color:"#FF6B35", label:"Gulf Stream", pts:[[24,-80],[26,-79.5],[28.5,-78.5],[31,-77.5],[33.5,-76.5],[36,-75.5],[38,-74.5],[40,-73],[42,-70.5],[44,-67.5],[46,-64.5],[48,-61],[50,-57],[52,-52],[53,-47],[53,-42]]},
  {color:"#FF6B35", label:"Kuroshio", pts:[[22,122],[24,125],[26,128],[28,130],[30,132],[32,134],[34,135],[36,136],[38,138],[40,140],[42,143],[44,147],[46,152],[48,157],[50,162]]},
  {color:"#00E5FF", label:"Antarctic Circumpolar", pts:[[-55,-180],[-56,-160],[-57,-140],[-57,-120],[-57,-100],[-57,-80],[-57,-60],[-56,-40],[-56,-20],[-56,0],[-56,20],[-56,40],[-57,60],[-57,80],[-57,100],[-57,120],[-57,140],[-56,160],[-55,180]]},
  {color:"#00E5FF", label:"S. Equatorial (Atl)", pts:[[5,-10],[4,-15],[3,-20],[2,-25],[1,-30],[0,-35],[-1,-40],[-2,-45],[-3,-50],[-4,-55]]},
  {color:"#00E5FF", label:"Humboldt", pts:[[-5,-85],[-6,-84],[-8,-83],[-10,-82],[-12,-81],[-14,-80],[-16,-79],[-18,-78],[-20,-77],[-22,-76],[-24,-75],[-26,-74],[-28,-73],[-30,-72],[-32,-71]]},
  {color:"#FF6B35", label:"Brazil Current", pts:[[-12,-38],[-14,-39],[-16,-40],[-18,-41],[-20,-42],[-22,-43],[-24,-44],[-26,-45],[-28,-46],[-30,-47],[-32,-48],[-34,-49],[-36,-50],[-38,-51],[-40,-52]]},
];

const FALLBACK_CONTINENTS: number[][][] = [
  [[37,10],[36,9],[35,3],[36,-5],[36,-6],[34,-10],[32,-10],[31,-5],[30,-5],[28,-10],[26,-13],[22,-17],[20,-17],[17,-17],[15,-17],[12,-17],[8,-14],[5,-12],[5,-11],[4,-9],[4,-8],[2,-11],[1,-10],[0,-9],[-1,-9],[-2,-8],[-5,-12],[-5,-13],[-6,-14],[-7,-14],[-8,-14],[-9,-13],[-10,-14],[-12,-14],[-14,-12],[-15,-12],[-17,-15],[-18,-16],[-21,-17],[-22,-17],[-23,-17],[-25,-17],[-26,-18],[-27,-17],[-28,-16],[-29,-15],[-30,-15],[-31,-16],[-32,-17],[-33,-18],[-34,-19],[-35,-20],[-35,20],[-33,26],[-30,30],[-28,32],[-25,33],[-22,35],[-20,35],[-18,36],[-15,40],[-12,43],[-10,40],[-8,39],[-5,40],[-3,40],[0,41],[2,42],[5,43],[7,44],[10,46],[12,44],[15,42],[18,42],[20,42],[22,40],[25,37],[28,35],[30,33],[32,34],[33,35],[34,35],[35,34],[36,32],[37,30],[37,20],[37,10]],
  [[36,-6],[36,-8],[37,-9],[38,-9],[40,-9],[42,-9],[43,-9],[44,-9],[45,-8],[47,-5],[48,-5],[48,-2],[49,3],[50,5],[51,4],[51,3],[53,5],[54,8],[56,8],[56,10],[56,12],[57,13],[57,15],[58,15],[58,17],[58,18],[59,18],[59,20],[60,20],[60,22],[60,24],[60,25],[60,27],[59,28],[59,30],[58,28],[58,27],[57,27],[57,25],[56,25],[56,23],[55,23],[54,22],[54,20],[53,20],[53,19],[52,19],[52,21],[51,21],[51,22],[50,22],[50,20],[49,18],[48,17],[48,14],[47,13],[47,11],[46,11],[45,11],[45,10],[44,10],[44,9],[43,10],[42,10],[42,12],[41,13],[40,15],[39,16],[38,15],[37,15],[37,13],[37,11],[37,10],[36,10],[36,6],[36,-6]],
  [[70,180],[68,170],[66,165],[62,160],[58,155],[55,150],[52,145],[50,142],[48,140],[45,138],[42,135],[40,132],[38,130],[35,128],[33,126],[30,122],[28,120],[25,118],[22,115],[20,110],[18,108],[15,105],[12,102],[10,100],[8,98],[5,95],[2,92],[0,90],[-2,88],[-5,85],[-6,82],[-8,80],[-8,78],[-6,76],[-4,74],[-3,72],[-2,70],[-2,68],[0,66],[2,63],[5,60],[5,58],[7,56],[8,54],[10,50],[12,47],[15,45],[18,43],[20,42],[22,40],[25,37],[28,35],[30,33],[32,34],[33,35],[34,35],[35,34],[36,32],[37,30],[37,28],[38,26],[39,25],[40,24],[40,22],[40,20],[40,18],[40,16],[40,14],[40,12],[40,10],[40,8],[41,6],[41,4],[42,0],[42,-2],[42,-4],[42,-6],[42,-8],[43,-10],[44,-12],[46,-14],[48,-15],[50,-15],[52,-15],[55,-14],[57,-13],[59,-12],[60,-10],[60,-8],[60,-6],[60,-4],[60,-2],[60,0],[60,2],[60,4],[60,6],[60,8],[60,10],[60,12],[60,14],[60,16],[60,18],[60,20],[60,22],[60,24],[60,26],[60,28],[60,30],[62,32],[64,34],[66,36],[68,40],[70,45],[70,50],[68,55],[66,60],[65,65],[63,70],[62,75],[60,80],[58,85],[55,90],[52,95],[50,100],[48,105],[45,110],[42,115],[40,120],[38,125],[36,130],[35,135],[35,140],[37,145],[40,150],[43,155],[46,160],[50,165],[55,170],[60,175],[65,180],[70,180]],
  [[50,-128],[48,-126],[45,-124],[42,-124],[38,-122],[35,-120],[32,-117],[30,-115],[28,-114],[26,-112],[24,-110],[22,-108],[20,-106],[18,-104],[16,-102],[15,-98],[15,-96],[15,-94],[17,-92],[19,-90],[21,-88],[23,-86],[25,-84],[27,-82],[29,-81],[30,-82],[31,-83],[32,-84],[33,-85],[34,-83],[35,-82],[36,-81],[37,-80],[38,-79],[39,-78],[40,-77],[41,-76],[41,-74],[41,-72],[41,-70],[41,-68],[41,-66],[42,-64],[43,-63],[44,-62],[45,-62],[46,-63],[47,-64],[48,-66],[49,-68],[50,-70],[51,-72],[52,-75],[53,-78],[54,-80],[55,-82],[56,-85],[57,-88],[58,-90],[59,-92],[60,-94],[61,-96],[62,-98],[63,-100],[64,-102],[65,-105],[66,-108],[67,-110],[68,-112],[68,-115],[68,-118],[68,-120],[68,-122],[68,-125],[68,-128],[68,-130],[68,-132],[68,-135],[67,-138],[66,-140],[65,-142],[64,-144],[63,-146],[62,-148],[60,-150],[58,-152],[56,-154],[54,-155],[52,-156],[50,-155],[48,-154],[48,-152],[48,-150],[48,-148],[48,-146],[48,-144],[48,-142],[48,-140],[48,-138],[48,-136],[48,-134],[48,-132],[48,-130],[48,-128],[50,-128]],
  [[12,-72],[10,-74],[8,-76],[5,-78],[2,-80],[0,-82],[-2,-82],[-4,-82],[-6,-82],[-8,-80],[-10,-78],[-12,-77],[-14,-78],[-16,-78],[-18,-76],[-20,-76],[-22,-74],[-24,-72],[-26,-70],[-28,-68],[-30,-67],[-32,-66],[-34,-64],[-36,-62],[-38,-60],[-40,-62],[-42,-64],[-44,-66],[-46,-68],[-48,-70],[-50,-72],[-52,-74],[-54,-76],[-55,-74],[-55,-72],[-54,-70],[-53,-68],[-52,-66],[-50,-64],[-48,-62],[-46,-60],[-44,-58],[-42,-56],[-40,-54],[-38,-52],[-36,-50],[-34,-48],[-32,-46],[-30,-44],[-28,-42],[-26,-40],[-24,-38],[-22,-36],[-20,-34],[-18,-32],[-16,-30],[-14,-28],[-12,-24],[-10,-22],[-8,-20],[-6,-18],[-4,-16],[-2,-14],[0,-12],[2,-10],[4,-8],[6,-6],[8,-4],[10,-2],[12,0],[12,-2],[12,-4],[12,-6],[12,-8],[12,-10],[12,-12],[12,-14],[12,-16],[12,-18],[12,-20],[12,-22],[12,-24],[12,-26],[12,-28],[12,-30],[12,-32],[12,-34],[12,-36],[12,-38],[12,-40],[12,-42],[12,-44],[12,-46],[12,-48],[12,-50],[12,-52],[12,-54],[12,-56],[12,-58],[12,-60],[12,-62],[12,-64],[12,-66],[12,-68],[12,-70],[12,-72]],
  [[-12,132],[-12,134],[-12,136],[-12,138],[-12,140],[-12,142],[-12,144],[-12,146],[-12,148],[-12,150],[-14,152],[-16,153],[-18,154],[-20,154],[-22,154],[-24,154],[-26,154],[-28,153],[-30,153],[-32,152],[-34,151],[-36,150],[-37,149],[-38,148],[-38,146],[-38,144],[-38,142],[-38,140],[-37,138],[-36,136],[-35,134],[-34,132],[-32,130],[-30,128],[-28,126],[-26,124],[-24,122],[-22,120],[-20,118],[-18,118],[-16,118],[-14,120],[-12,122],[-12,124],[-12,126],[-12,128],[-12,130],[-12,132]],
  [[-65,-180],[-65,-160],[-65,-140],[-65,-120],[-65,-100],[-65,-80],[-65,-60],[-65,-40],[-65,-20],[-65,0],[-65,20],[-65,40],[-65,60],[-65,80],[-65,100],[-65,120],[-65,140],[-65,160],[-65,180]],
];

function llToXY(lat: number, lng: number, W: number, H: number): [number, number] {
  var lngMin = -20, lngMax = 80;
  var latMin = -35, latMax = 70;
  var dataW = (lngMax - lngMin);
  var dataH = (latMax - latMin);
  var dataAspect = dataW / dataH;
  var canvasAspect = W / H;

  var scale, offsetX, offsetY;
  if (dataAspect > canvasAspect) {
    scale = W / dataW;
    offsetX = 0;
    offsetY = (H - dataH * scale) / 2;
  } else {
    scale = H / dataH;
    offsetX = (W - dataW * scale) / 2;
    offsetY = 0;
  }

  var x = (lng - lngMin) * scale + offsetX;
  var y = (latMax - lat) * scale + offsetY;
  return [x, y];
}

const GRID_INTERVAL = 15;

function drawGrid(ctx: CanvasRenderingContext2D, W: number, H: number, p: number) {
  ctx.strokeStyle = "rgba(255,255,255," + (0.02 * p) + ")";
  ctx.lineWidth = 0.5;
  ctx.font = "8px monospace";
  ctx.fillStyle = "rgba(255,255,255," + (0.2 * p) + ")";

  for (var lon = -180; lon < 180; lon += GRID_INTERVAL) {
    var [x1] = llToXY(0, lon, W, H);
    ctx.beginPath();
    ctx.moveTo(x1, 0); ctx.lineTo(x1, H); ctx.stroke();
    if (lon !== 0) ctx.fillText(lon + "\u00B0", x1 - 10, H - 4);
  }
  var [x0] = llToXY(0, 0, W, H);
  ctx.strokeStyle = "rgba(0,229,255," + (0.04 * p) + ")";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(x0, 0); ctx.lineTo(x0, H); ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255," + (0.02 * p) + ")";
  ctx.lineWidth = 0.5;
  for (var lat = -60; lat <= 60; lat += GRID_INTERVAL) {
    var [, y1] = llToXY(lat, 0, W, H);
    ctx.beginPath();
    ctx.moveTo(0, y1); ctx.lineTo(W, y1); ctx.stroke();
    ctx.fillText(lat + "\u00B0", 4, y1 - 2);
  }
  var [, yEq] = llToXY(0, 0, W, H);
  ctx.strokeStyle = "rgba(0,229,255," + (0.04 * p) + ")";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, yEq); ctx.lineTo(W, yEq); ctx.stroke();
}

function drawContours(ctx: CanvasRenderingContext2D, W: number, H: number, p: number) {
  ctx.strokeStyle = "rgba(255,255,255," + (0.15 * p) + ")";
  ctx.lineWidth = 0.8;
  FALLBACK_CONTINENTS.forEach(function (pts) {
    ctx.beginPath();
    pts.forEach(function (pt, i) {
      var [x, y] = llToXY(pt[0], pt[1], W, H);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  });
}

function drawTopoJSON(ctx: CanvasRenderingContext2D, features: any[], W: number, H: number, p: number) {
  ctx.strokeStyle = "rgba(255,255,255," + (0.15 * p) + ")";
  ctx.lineWidth = 0.8;
  ctx.fillStyle = "rgba(255,255,255," + (0.02 * p) + ")";
  features.forEach(function (f) {
    function project(coords: number[][]): [number, number][] {
      return coords.map(function (c) { return llToXY(c[1], c[0], W, H); });
    }
    if (f.geometry.type === "Polygon") {
      f.geometry.coordinates.forEach(function (ring: number[][]) {
        var projected = project(ring);
        ctx.beginPath();
        projected.forEach(function (p2, i) {
          if (i === 0) ctx.moveTo(p2[0], p2[1]); else ctx.lineTo(p2[0], p2[1]);
        });
        ctx.closePath(); ctx.fill(); ctx.stroke();
      });
    } else if (f.geometry.type === "MultiPolygon") {
      f.geometry.coordinates.forEach(function (poly: number[][][]) {
        poly.forEach(function (ring: number[][]) {
          var projected = project(ring);
          ctx.beginPath();
          projected.forEach(function (p2, i) {
            if (i === 0) ctx.moveTo(p2[0], p2[1]); else ctx.lineTo(p2[0], p2[1]);
          });
          ctx.closePath(); ctx.fill(); ctx.stroke();
        });
      });
    }
  });
}

function drawCurrents(ctx: CanvasRenderingContext2D, W: number, H: number, p: number) {
  CURRENT_PATHS.forEach(function (cp) {
    ctx.strokeStyle = cp.color + Math.round(p * 120).toString(16).padStart(2, "0");
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    cp.pts.forEach(function (pt, i) {
      var [x, y] = llToXY(pt[0], pt[1], W, H);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    var last = cp.pts[cp.pts.length - 1];
    var prev = cp.pts[cp.pts.length - 2];
    var [ex, ey] = llToXY(last[0], last[1], W, H);
    var [px, py] = llToXY(prev[0], prev[1], W, H);
    var dx = ex - px, dy = ey - py;
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len > 0) {
      dx /= len; dy /= len;
      var sz = 4;
      ctx.fillStyle = cp.color + Math.round(p * 140).toString(16).padStart(2, "0");
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - dx * sz - dy * sz * 0.4, ey - dy * sz + dx * sz * 0.4);
      ctx.lineTo(ex - dx * sz + dy * sz * 0.4, ey - dy * sz - dx * sz * 0.4);
      ctx.closePath();
      ctx.fill();
    }
  });
}

function drawDuckTrail(ctx: CanvasRenderingContext2D, W: number, H: number, p: number, dashOffset: number) {
  if (p <= 0) return;
  var points = DUCK_TRAIL.map(function (pt) { return llToXY(pt[0], pt[1], W, H); });

  ctx.save();
  ctx.strokeStyle = "rgba(255, 180, 50, " + (0.15 * p) + ")";
  ctx.lineWidth = 6;
  ctx.setLineDash([8, 12]);
  ctx.lineDashOffset = -dashOffset;
  ctx.beginPath();
  points.forEach(function (pt, i) {
    if (i === 0) ctx.moveTo(pt[0], pt[1]); else ctx.lineTo(pt[0], pt[1]);
  });
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 200, 80, " + (0.7 * p) + ")";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 14]);
  ctx.lineDashOffset = -dashOffset;
  ctx.beginPath();
  points.forEach(function (pt, i) {
    if (i === 0) ctx.moveTo(pt[0], pt[1]); else ctx.lineTo(pt[0], pt[1]);
  });
  ctx.stroke();
  ctx.restore();

  if (p > 0.1) {
    ctx.save();
    ctx.strokeStyle = "rgba(255, 200, 80, " + (0.3 * p) + ")";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    var trailLen = Math.min(points.length, Math.floor(3 + p * 8));
    for (var i = 0; i < trailLen; i++) {
      if (i === 0) ctx.moveTo(points[i][0], points[i][1]); else ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.stroke();
    ctx.restore();
  }

  var [ox, oy] = points[0];
  var pulseR = 3 + Math.sin(Date.now() / 300) * 1.5;
  ctx.save();
  ctx.beginPath();
  ctx.arc(ox, oy, pulseR, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 200, 80, " + (0.6 * p) + ")";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ox, oy, pulseR + 5, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 200, 80, " + (0.2 * p) + ")";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.font = "9px monospace";
  ctx.fillStyle = "rgba(255, 200, 80, " + (0.7 * p) + ")";
  ctx.fillText("1992 \u2022 28,800 DUCKS RELEASED", ox + 14, oy + 4);
  ctx.restore();
}

export default function EarthCanvas({ progress, visible }: { progress: number; visible: boolean }) {
  var canvasRef = useRef<HTMLCanvasElement>(null);
  var [features, setFeatures] = useState<any[] | null>(null);
  var dashRef = useRef(0);
  var rafRef = useRef<number>(0);

  useEffect(() => {
    if (!visible) return;
    var cancelled = false;
    async function load() {
      try {
        var resp = await fetch(TOPO_URL);
        var topo = await resp.json();
        var topojson = await import("topojson-client");
        var world = topojson.feature(topo, topo.objects.countries);
        if (!cancelled && "features" in world) setFeatures((world as any).features);
      } catch (e) {
        if (!cancelled) setFeatures(null);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [visible]);

  useEffect(() => {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d")!;

    function render() {
      if (!canvas) return;
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var W = canvas.offsetWidth;
      var H = canvas.offsetHeight;
      if (W === 0 || H === 0) { rafRef.current = requestAnimationFrame(render); return; }
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx!.scale(dpr, dpr);

var sceneFade = Math.min(1, Math.max(0, (progress - 0.15) / 0.20));
if (!visible) sceneFade = 0;
if (sceneFade <= 0) { rafRef.current = requestAnimationFrame(render); return; }

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, W, H);

var p = visible ? sceneFade : 0;

      drawGrid(ctx, W, H, p);
      drawCurrents(ctx, W, H, p);

      if (features) {
        drawTopoJSON(ctx, features, W, H, p);
      } else {
        drawContours(ctx, W, H, p);
      }

      dashRef.current += 0.3;
      drawDuckTrail(ctx, W, H, p, dashRef.current);

      ctx.font = "8px monospace";
      ctx.fillStyle = "rgba(0,229,255," + (0.15 * p) + ")";
      ctx.fillText("EARTH INTELLIGENCE // EURASIA-AFRICA REGION", 12, H - 12);

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(rafRef.current); };
  }, [progress, visible, features]);

  if (!visible) return null;

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      pointerEvents: "none", zIndex: 1,
    }} />
  );
}


