import {fontNormalize} from './common';

export const COLORS = {
  TRANSPARENT: '#00000000',

  TEXT: '#000',
  WHITE: '#FFF',

  BLACK: '#000',

  GREY: '#E8E8E8',

  ORANGE: '#FF5420',

  GREEN: '#4AE105',

  RED: '#FF2424',

  BLUE: '#1E59F9',
};

export const FONT_SIZES = {
  xs: fontNormalize(8),
  sm: fontNormalize(10),
  md: fontNormalize(12),
  lg: fontNormalize(14),
  xl: fontNormalize(16),
  '2xl': fontNormalize(18),
  '3xl': fontNormalize(20),
  '4xl': fontNormalize(24),
  '5xl': fontNormalize(30),
  '6xl': fontNormalize(36),
  '7xl': fontNormalize(48),
  '8xl': fontNormalize(60),
  '9xl': fontNormalize(72),
};
