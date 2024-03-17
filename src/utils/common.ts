import {Dimensions, PixelRatio} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const WIDTH = windowWidth;
export const HEIGHT = windowHeight;

const BASE_UNIT_WIDTH = 340.72727272727275;
const BASE_UNIT_HEIGHT = 812.1818181818181;
const fontScale = PixelRatio.getFontScale();

export const fontNormalize = (
  size: number,
  baseWidth = BASE_UNIT_WIDTH,
  baseHeight = BASE_UNIT_HEIGHT,
) => {
  const scaleFactor = Math.min(WIDTH / baseWidth, HEIGHT / baseHeight);
  const newSize = size * scaleFactor * fontScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
