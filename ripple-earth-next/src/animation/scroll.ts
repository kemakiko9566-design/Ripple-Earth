export function phase(t: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (t - start) / (end - start)));
}
export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
export function lerp(cur: number, tgt: number, f: number): number {
  return cur + (tgt - cur) * f;
}
