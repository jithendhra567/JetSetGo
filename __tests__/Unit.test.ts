import {sortFlights} from '../src/utils/common';
import DATA from './data.json';

describe('sortFlights', () => {
  it('should return sorted flights by price', () => {
    const sortedFlights = sortFlights(DATA.original, {
      price: -1,
      duration: 0,
      departure: 0,
    });
    expect(sortedFlights).toEqual(DATA.sortedByPrice);
  });

  it('should return sorted flights by duration', () => {
    const sortedFlights = sortFlights(DATA.original, {
      price: 0,
      duration: -1,
      departure: 0,
    });
    expect(sortedFlights).toEqual(DATA.sortedByDuration);
  });

  it('should return sorted flights by departure', () => {
    const sortedFlights = sortFlights(DATA.original, {
      price: 0,
      duration: 0,
      departure: 1,
    });
    expect(sortedFlights).toEqual(DATA.sortedByDepature);
  });

  it('should return sorted flights by price, duration', () => {
    const sortedFlights = sortFlights(DATA.original, {
      price: 1,
      duration: -1,
      departure: 0,
    });
    expect(sortedFlights).toEqual(DATA.sortedByPriceAndDuration);
  });
});
