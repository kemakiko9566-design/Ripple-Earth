"use client";

/** Camera configuration for the Ripple Earth scene */

export const CAMERA_DEFAULTS = {
  position: [0, 0, 4.5] as [number, number, number],
  fov: 45,
  near: 0.1,
  far: 100,
} as const;

/** Manual-orbit feel with slow auto-rotation */
export const CAMERA_ORBIT = {
  enableDamping: true,
  dampingFactor: 0.05,
  enableZoom: false,
  enablePan: false,
  autoRotate: true,
  autoRotateSpeed: 0.3,
  minDistance: 3,
  maxDistance: 8,
  rotateSpeed: 0.4,
} as const;
