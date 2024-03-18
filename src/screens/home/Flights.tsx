/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONT_SIZES} from '../../utils/styles';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {FlightType, useGetFlightsQuery} from './home-api';
import ASSETS from '../../utils/assets';
import FlightItem from './FlightItem';
import {HEIGHT, WIDTH, sortFlights} from '../../utils/common';
import CustomModal from '../../components/CustomModal';
import Filters, {AirlineType, FiltersType} from '../../components/Filters';
import dayjs from 'dayjs';
import FlightRequest, {FlightRequestType} from './FlightRequest';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

const Flights = ({navigation, route}: Props) => {
  const {data, isLoading} = useGetFlightsQuery();

  const params = route.params as any;
  const flightRequest: FlightRequestType = {
    ...params,
    flightDate: {
      departure: dayjs(params.flightDate.departure),
      return: dayjs(params.flightDate.return),
    },
  };
  const [flightConfig, setFlightConfig] =
    useState<FlightRequestType>(flightRequest);
  const [showFilter, setShowFilter] = useState(false);
  const [airlines, setAirline] = useState<AirlineType[]>([]);
  const [flights, setFlights] = useState<FlightType[]>([]);
  const [filters, setFilter] = useState<FiltersType>({
    airlines: {},
    sort: {
      price: 0,
      duration: 0,
      departure: 0,
    },
  });

  useEffect(() => {
    if (data) {
      console.log('Filtering');
      const filtered = data.filter(item => {
        return isValidFlihght(item);
      });
      const map = new Map();
      filtered.forEach(item => {
        if (map.has(item.airline)) {
          map.set(item.airline, map.get(item.airline) + 1);
        } else {
          map.set(item.airline, 1);
        }
      });
      const values = Array.from(map.entries()).map(([key, value]) => ({
        name: key,
        length: value,
      }));
      setAirline(values);
      setFlights(filtered);
    }
  }, [data, flightConfig]);

  const isValidFlihght = (flight: FlightType) => {
    const validFlightAccordingToPassengers =
      flight.seatsAvailable >= flightConfig.passengers;
    const validFlightAccordingToConfig =
      flightConfig.flightRoute.from === flight.origin &&
      flightConfig.flightRoute.to === flight.destination;

    const flightDeaptureDate = new Date(flight.departureTime).getTime();
    const userDate = new Date(
      flightConfig.flightDate.departure.toISOString(),
    ).getTime();
    const validFlightAccordingToDate = flightDeaptureDate >= userDate;
    return (
      validFlightAccordingToConfig &&
      validFlightAccordingToPassengers &&
      validFlightAccordingToDate
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onApply = (filterConfig: FiltersType) => {
    setFilter(filterConfig);
    const newFlights = flights.filter(item => {
      const keys = Object.keys(filterConfig.airlines);
      if (keys.length) {
        return filterConfig.airlines[item.airline];
      }
      return true;
    });
    const sortedFlights = sortFlights(newFlights, filterConfig.sort);
    setFlights(sortedFlights);
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          height: HEIGHT - 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: FONT_SIZES['5xl'], fontWeight: 'bold'}}>
          No Flights Found
        </Text>
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={{flex: 1}}>
          <Image source={ASSETS.Loading} style={{width: WIDTH, height: 200}} />
        </View>
      );
    }
    return (
      <FlatList
        data={flights}
        style={{width: '100%', paddingHorizontal: 20}}
        renderItem={({item}) => <FlightItem {...item} />}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmpty}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backContainer} onPress={onBack}>
          <Image source={ASSETS.Back} style={{width: 22, height: 22}} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: FONT_SIZES['3xl'],
            fontWeight: 'bold',
            color: COLORS.BLACK,
          }}>
          Select Flight
        </Text>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => setShowFilter(true)}>
          <Image source={ASSETS.Filter} style={{width: 25, height: 25}} />
        </TouchableOpacity>
      </View>
      <FlightRequest
        fromFlights
        config={flightConfig}
        onChange={setFlightConfig}
      />
      {renderContent()}
      <CustomModal
        dismissable={false}
        visible={showFilter}
        toggleModal={setShowFilter}
        backdropStyle={{justifyContent: 'flex-end'}}>
        <Filters
          onApply={onApply}
          airlines={airlines}
          onDismiss={() => setShowFilter(false)}
          filter={filters}
        />
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  backText: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES['4xl'],
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 14,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
  },
  backContainer: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    // backgroundColor: COLORS.GREY,
  },
});

export default Flights;
