// Scene environment
export {
  BACKGROUND, GL_CONFIG, DPR,
  TONE_MAPPING, TONE_MAPPING_EXPOSURE,
  FOG_ENABLED, FOG_COLOR, FOG_NEAR, FOG_FAR,
} from "./scene";

// Camera
export { CAMERA_DEFAULTS, CAMERA_ORBIT } from "./camera";

// Lighting
export {
  AMBIENT_LIGHT, DIRECTIONAL_LIGHT,
  HEMISPHERE_LIGHT, RIM_LIGHT,
  LIGHT_CONFIGS, SceneLights,
} from "./lights";

// Particles
export {
  default as StarField,
  createStarGeometry, createStarMaterial,
  STAR_DEFAULTS,
} from "./particles";
export type { StarFieldConfig } from "./particles";

// Earth component
export { default as Earth } from "./Earth";
