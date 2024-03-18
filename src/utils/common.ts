import {Dimensions, PixelRatio} from 'react-native';
import {FlightType} from '../screens/home/home-api';
import {SortType} from '../components/Filters';

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

const getDurationValue = (duration: string) => {
  const split = duration.split('hours');
  const hours = parseInt(split[0], 10);
  if (split.length < 2 || !split[1]) {
    return hours * 60;
  }
  const minutes = parseInt(split[1].split('minutes')[0], 10);
  return hours * 60 + minutes;
};

export const sortFlights = (flights: FlightType[], sort: SortType) => {
  return flights.sort((a, b) => {
    for (const key of Object.keys(sort)) {
      const sortDirection = sort[key as keyof SortType];
      if (sortDirection !== 0) {
        const valueA = getSortValue(a, key as keyof FlightType);
        const valueB = getSortValue(b, key as keyof FlightType);
        if (valueA < valueB) {
          return sortDirection;
        }
        if (valueA > valueB) {
          return -sortDirection;
        }
      }
    }
    return 0;
  });
};

const getSortValue = (flight: FlightType, field: string) => {
  switch (field) {
    case 'price':
      return flight.price;
    case 'duration':
      return getDurationValue(flight.duration);
    case 'departure':
      return new Date(flight.departureTime).getTime();
    default:
      throw new Error(`Unknown field ${field}`);
  }
};
