/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HEIGHT, WIDTH} from '../../utils/common';
import {COLORS, FONT_SIZES} from '../../utils/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomTabs} from '../../components/CustomTabs';
import CitySelector, {CITIES, selectType} from '../../components/CitySelector';
import CustomModal from '../../components/CustomModal';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import PrimaryButton from '../../components/PrimaryButton';
import StepCounter from '../../components/StepCounter';
import {NavigationProp} from '@react-navigation/native';
import NAVIGATION from '../../navigation/NavConts';
import ASSETS from '../../utils/assets';

const TABS = ['One Way', 'Round'];

type dateType = 'departure' | 'return';

const Home = ({navigation}: {navigation: NavigationProp<any>}) => {
  const animationOffset = useRef(new Animated.Value(HEIGHT)).current;

  const [tripType, setTripType] = useState(0);
  const [selectCity, setSelectCity] = useState<selectType>();
  const [config, setConfig] = useState({
    from: CITIES[0],
    to: CITIES[3],
  });
  const [dates, setDates] = useState({
    departure: dayjs(),
    return: dayjs(),
  });
  const [showDatePicker, setShowDatePicker] = useState<dateType>();
  const [passengers, setPassengers] = useState(0);

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

  const onPressDatePicker = ({date}: {date: dayjs.Dayjs}) => {
    setDates({
      ...dates,
      [showDatePicker as dateType]: date,
    });
  };

  const onSearch = () => {
    navigation.navigate(NAVIGATION.FLIGHTS, {
      config,
      dates,
      passengers,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi, Jet</Text>
        <View style={styles.card}>
          <CustomTabs
            tabs={TABS}
            activeTabIndex={tripType}
            onTabPress={key => setTripType(key as any)}
          />
          <View style={styles.infoContainer}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => setSelectCity('from')}>
              <Text style={styles.info}>From</Text>
              <Text style={styles.label}>{config.from}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => setSelectCity('to')}>
              <Text style={styles.info}>To</Text>
              <Text style={styles.label}>{config.to}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flip}>
              <Image source={ASSETS.Flip} style={{width: 20, height: 20}} />
            </TouchableOpacity>
            <View style={styles.dates}>
              <TouchableOpacity
                onPress={() => setShowDatePicker('departure')}
                style={styles.dateContainer}>
                <Text style={styles.info}>Departure</Text>
                <Text style={styles.label}>
                  {dates.departure.format('DD MMM, YYYY')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowDatePicker('return');
                  setTripType(1);
                }}
                style={styles.dateContainer}>
                <Text style={styles.info}>Return</Text>
                {tripType === 1 && (
                  <Text style={[styles.label]}>
                    {dates.return.format('DD MMM, YYYY')}
                  </Text>
                )}
                {tripType === 0 && (
                  <Text style={[styles.label, {color: COLORS.BLUE}]}>
                    Add Return
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={[styles.dates, {marginTop: 10, alignItems: 'flex-end'}]}>
              <View>
                <Text style={styles.info}>Adults</Text>
                <Text style={styles.label}>Passengers</Text>
              </View>
              <StepCounter
                onStepsChange={val => setPassengers(val)}
                steps={passengers}
              />
            </View>
          </View>
        </View>
        <PrimaryButton
          text="Search"
          onPress={onSearch}
          style={{marginTop: 30}}
        />
      </View>
      <Animated.View style={[styles.lineStyle, {height: animationOffset}]} />
      <CustomModal
        visible={Boolean(selectCity)}
        animationType="slide"
        toggleModal={val => setSelectCity(val ? 'from' : undefined)}>
        {selectCity && (
          <CitySelector
            selectionKey={selectCity}
            onClose={() => setSelectCity(undefined)}
            onSelect={value => setConfig({...config, [selectCity]: value})}
          />
        )}
      </CustomModal>
      <CustomModal
        visible={Boolean(showDatePicker)}
        toggleModal={val => setShowDatePicker(val ? 'departure' : undefined)}>
        <View style={styles.datePicker}>
          {showDatePicker && (
            <DateTimePicker
              mode="single"
              date={dates[showDatePicker]}
              onChange={params => onPressDatePicker(params as any)}
            />
          )}
          <PrimaryButton
            text="Done"
            style={{marginHorizontal: 6, marginVertical: 10}}
            onPress={() => setShowDatePicker(undefined)}
          />
        </View>
      </CustomModal>
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
  },
  card: {
    marginTop: 30,
    marginHorizontal: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    paddingVertical: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  flip: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
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
    width: '40%',
  },
  datePicker: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.8,
    borderRadius: 10,
    padding: 10,
  },
});

export default Home;
