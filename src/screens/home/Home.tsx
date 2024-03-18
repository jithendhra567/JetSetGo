/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {HEIGHT, WIDTH} from '../../utils/common';
import {COLORS, FONT_SIZES} from '../../utils/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomTabs} from '../../components/CustomTabs';
import {CITIES} from '../../components/CitySelector';
import dayjs from 'dayjs';
import PrimaryButton from '../../components/PrimaryButton';
import {NavigationProp} from '@react-navigation/native';
import NAVIGATION from '../../navigation/NavConts';
import {showSnackbar} from '../../components/Snackbar';
import FlightRequest, {FlightRequestType} from './FlightRequest';

const TABS = ['One Way', 'Round'];

export type dateType = 'departure' | 'return';

const Home = ({navigation}: {navigation: NavigationProp<any>}) => {
  const animationOffset = useRef(new Animated.Value(HEIGHT)).current;

  const [flightConfig, setFlightConfig] = useState<FlightRequestType>({
    flightRoute: {
      from: CITIES[0],
      to: CITIES[3],
    },
    flightDate: {
      departure: dayjs(),
      return: dayjs(),
    },
    passengers: 0,
    tripType: 0,
  });

  useEffect(() => {
    showScreen();
  }, []);

  const showScreen = () => {
    Animated.timing(animationOffset, {
      toValue: 0,
      duration: 750,
      delay: 100,
      easing: Easing.exp,
      useNativeDriver: false,
    }).start();
  };

  const onSearch = () => {
    if (flightConfig.passengers < 1) {
      showSnackbar('At least 1 Passenger Required', {type: 'error'});
      return;
    }

    navigation.navigate(NAVIGATION.FLIGHTS, {
      ...flightConfig,
      flightDate: {
        departure: flightConfig.flightDate.departure.toISOString(),
        return: flightConfig.flightDate.return.toISOString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Jet Set Go</Text>
        <View style={styles.card}>
          <CustomTabs
            tabs={TABS}
            activeTabIndex={flightConfig.tripType}
            onTabPress={key => {
              if (key === 1) {
                showSnackbar('Not Enough Data For This Feature');
                return;
              }
            }}
          />
          <FlightRequest config={flightConfig} onChange={setFlightConfig} />
        </View>
        <PrimaryButton
          text="Search"
          onPress={onSearch}
          style={{marginTop: 30}}
        />
      </View>
      <Animated.View style={[styles.lineStyle, {height: animationOffset}]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    padding: 20,
  },
  lineStyle: {
    position: 'absolute',
    width: WIDTH,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES['4xl'],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginTop: 30,
    marginHorizontal: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    paddingVertical: 20,
  },
  flip: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginVertical: -32,
    zIndex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  box: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabText: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    width: '40%',
    textAlign: 'center',
  },
  infoContainer: {
    padding: 16,
    gap: 20,
  },
  info: {
    color: COLORS.GREY_DARK,
    fontSize: FONT_SIZES.lg,
    // fontWeight: 'bold',
  },
  label: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES['2xl'],
    fontWeight: 'bold',
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    width: '46%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    padding: 10,
  },
  datePicker: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.8,
    borderRadius: 10,
    padding: 10,
  },
});

export default Home;
