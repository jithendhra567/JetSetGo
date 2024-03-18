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
import {NavigationProp} from '@react-navigation/native';
import {FlightType, useGetFlightsQuery} from './home-api';
import ASSETS from '../../utils/assets';
import FlightItem from './FlightItem';
import {WIDTH, sortFlights} from '../../utils/common';
import CustomModal from '../../components/CustomModal';
import Filters, {AirlineType, FiltersType} from '../../components/Filters';

type Props = {
  navigation: NavigationProp<any>;
};

const Flights = ({navigation}: Props) => {
  const {data, isLoading} = useGetFlightsQuery();
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
      const map = new Map();
      data.forEach(item => {
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
      setFlights(data);
    }
  }, [data]);

  const onBack = () => {
    navigation.goBack();
  };

  const onApply = (config: FiltersType) => {
    setFilter(config);
    const newFlights = flights.filter(item => {
      const keys = Object.keys(config.airlines);
      if (keys.length) {
        return config.airlines[item.airline];
      }
      return true;
    });
    const sortedFlights = sortFlights(newFlights, config.sort);
    setFlights(sortedFlights);
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
    padding: 20,
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
