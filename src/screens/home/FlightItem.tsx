import React from 'react';
import {FlightType} from './home-api';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../../utils/styles';
import dayjs from 'dayjs';
import ASSETS from '../../utils/assets';

const FlightItem = (props: FlightType) => {
  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{props.airline}</Text>
          <Text style={styles.info}>{props.flightNumber}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={[styles.title, {color: COLORS.BLUE}]}>
            {props.seatsAvailable} seat
          </Text>
          <Text style={styles.info}>Avalibale</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>
            {dayjs(props.departureTime).format('HH:mm')}
          </Text>
          <Text style={styles.info}>depature</Text>
        </View>
        <View style={styles.flightDetails}>
          <View style={styles.flexRow}>
            <View style={styles.dot} />
            <Text style={{color: COLORS.BLUE}}>
              - - - - - - - - - - - - - -
            </Text>
            <View style={styles.dot} />
            <Image source={ASSETS.flightFroward} style={styles.forward} />
          </View>
          <Text style={[styles.info, {color: COLORS.BLUE, fontWeight: 'bold'}]}>
            {props.aircraft}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.title}>
            {dayjs(props.arrivalTime).format('HH:mm')}
          </Text>
          <Text style={styles.info}>arrival</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.footer}>
        <View>
          <Text style={[styles.title, {fontSize: FONT_SIZES.xl}]}>
            Gate - {props.gate}
          </Text>
          <Text style={{color: COLORS.GREY_DARK, fontWeight: 'bold'}}>
            {props.duration}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.title, {color: COLORS.WHITE}]}>
            {props.price} ₹
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 16,
    // width: WIDTH - 32,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.BORDER_COLOR,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footer: {
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  info: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.GREY_DARK,
  },
  flightDetails: {
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.BLUE,
  },
  forward: {
    width: 24,
    height: 24,
    left: '40%',
    top: -10,
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.BORDER_COLOR,
  },
  priceContainer: {
    backgroundColor: COLORS.BLUE,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});

export default React.memo(FlightItem);
