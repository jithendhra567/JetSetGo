import React, {useState} from 'react';
import {COLORS, FONT_SIZES} from '../../utils/styles';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WIDTH} from '../../utils/common';
import StepCounter from '../../components/StepCounter';
import {showSnackbar} from '../../components/Snackbar';
import ASSETS from '../../utils/assets';
import CitySelector, {selectType} from '../../components/CitySelector';
import {dateType} from './Home';
import dayjs from 'dayjs';
import CustomModal from '../../components/CustomModal';
import DateTimePicker from 'react-native-ui-datepicker';
import PrimaryButton from '../../components/PrimaryButton';

export type FlightRequestType = {
  flightRoute: {
    from: string;
    to: string;
  };
  flightDate: {
    departure: dayjs.Dayjs;
    return: dayjs.Dayjs;
  };
  passengers: number;
  tripType: number;
};

type Props = {
  config: FlightRequestType;
  onChange: (config: FlightRequestType) => void;
  fromFlights?: boolean;
};

const FlightRequest = ({config, onChange, fromFlights}: Props) => {
  const [selectCity, setSelectCity] = useState<selectType>();
  const [showDatePicker, setShowDatePicker] = useState<dateType>();

  const onPressDatePicker = ({date}: {date: dayjs.Dayjs}) => {
    onChange({
      ...config,
      flightDate: {
        ...config.flightDate,
        [showDatePicker as dateType]: date,
      },
    });
  };

  const updateFlightRoute = (value: string) => {
    const opp = selectCity === 'from' ? 'to' : 'from';
    if (config.flightRoute[opp] === value) {
      showSnackbar('Cannot Select same city');
      return;
    }
    onChange({
      ...config,
      flightRoute: {
        ...config.flightRoute,
        [selectCity as selectType]: value,
      },
    });
  };

  const flip = () => {
    onChange({
      ...config,
      flightRoute: {
        ...config.flightRoute,
        from: config.flightRoute.to,
        to: config.flightRoute.from,
      },
    });
  };

  return (
    <View
      style={[styles.infoContainer, fromFlights ? styles.infoContainer2 : {}]}>
      <View style={[fromFlights ? styles.cities : {}]}>
        <TouchableOpacity
          style={[styles.box, {width: fromFlights ? '38%' : undefined}]}
          onPress={() => setSelectCity('from')}>
          <Text style={styles.info}>From</Text>
          <Text style={styles.label}>{config.flightRoute.from}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles[fromFlights ? 'flip2' : 'flip']}
          onPress={flip}>
          <Image source={ASSETS.Flip} style={{width: 20, height: 20}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, {width: fromFlights ? '38%' : undefined}]}
          onPress={() => setSelectCity('to')}>
          <Text style={styles.info}>To</Text>
          <Text style={styles.label}>{config.flightRoute.to}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dates}>
        <TouchableOpacity
          onPress={() => setShowDatePicker('departure')}
          style={styles.dateContainer}>
          <Text style={styles.info}>Departure</Text>
          <Text style={styles.label}>
            {config.flightDate.departure.format('DD MMM, YYYY')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setShowDatePicker('return');
            // setTripType(1);
            showSnackbar('Not Enough Data For This Feature');
          }}
          style={styles.dateContainer}>
          <Text style={styles.info}>Return</Text>
          {config.tripType === 1 && (
            <Text style={[styles.label]}>
              {config.flightDate.return.format('DD MMM, YYYY')}
            </Text>
          )}
          {config.tripType === 0 && (
            <Text style={[styles.label, {color: COLORS.BLUE}]}>Add Return</Text>
          )}
        </TouchableOpacity>
      </View>
      {!fromFlights && (
        <View style={[styles.dates, {marginTop: 10, alignItems: 'flex-end'}]}>
          <View>
            <Text style={styles.info}>Adults</Text>
            <Text style={styles.label}>Passengers</Text>
          </View>
          <StepCounter
            onStepsChange={val => onChange({...config, passengers: val})}
            steps={config.passengers}
          />
        </View>
      )}
      <CustomModal
        visible={Boolean(selectCity)}
        animationType="slide"
        toggleModal={val => setSelectCity(val ? 'from' : undefined)}>
        {selectCity && (
          <CitySelector
            selectionKey={selectCity}
            onClose={() => setSelectCity(undefined)}
            onSelect={value => updateFlightRoute(value)}
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
              date={config.flightDate[showDatePicker]}
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
    </View>
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
  cities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flip: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginVertical: -12,
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

  flip2: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    padding: 10,
    zIndex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  infoContainer2: {
    gap: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 14,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  info2: {
    color: COLORS.GREY_DARK,
    fontSize: FONT_SIZES.md,
    // fontWeight: 'bold',
  },
  label2: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
});

export default FlightRequest;
