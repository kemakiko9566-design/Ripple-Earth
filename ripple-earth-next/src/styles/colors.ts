/**
 * Ripple Earth — Color Tokens
 * Design System: NASA SciVis + VLS Scientific Editorial
 */

export const colors = {
  bg: {
    deep: '#050505',
    surface: '#0F1322',
    glass: 'rgba(10,14,26,0.85)',
  },
  border: {
    subtle: 'rgba(255,255,255,0.06)',
    hover: 'rgba(255,255,255,0.12)',
    active: 'rgba(0,229,255,0.15)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.45)',
    muted: 'rgba(255,255,255,0.15)',
    data: 'rgba(255,255,255,0.55)',
  },
  accent: {
    cyan: '#00E5FF',
    orange: '#FF6B35',
    scientific: '#F6A623',
    danger: '#FF6B4A',
    green: '#2ECC71',
  },
  data: {
    warm: '#FF6B35',
    cold: '#00E5FF',
    neutral: 'rgba(255,255,255,0.30)',
  },
  grid: 'rgba(255,255,255,0.08)',
} as const;

export type ColorToken = typeof colors;
