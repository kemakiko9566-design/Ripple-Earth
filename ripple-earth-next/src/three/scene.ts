"use client";

/** Scene-level environment configuration for Ripple Earth */

// Background: deep space with a trace of violet
export const BACKGROUND = 0x050510;

// Tone mapping & exposure - ACESFilmic for cinematic contrast
export const TONE_MAPPING = 0;        // THREE.ACESFilmicToneMapping
export const TONE_MAPPING_EXPOSURE = 1.0;

// Fog - intentionally disabled so the star field reads crisp
export const FOG_ENABLED = false;
export const FOG_COLOR = 0x050510;
export const FOG_NEAR = 30;
export const FOG_FAR = 80;

/** Canvas rendering defaults passed as gl={{ ... }} props */
export const GL_CONFIG = {
  toneMapping: TONE_MAPPING,
  toneMappingExposure: TONE_MAPPING_EXPOSURE,
  alpha: false,
  antialias: true,
  powerPreference: "high-performance",
} as const;

/** Clamp device-pixel ratio for performance (min 1x, max 2x) */
export const DPR = [1, 2] as [number, number];
