/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/styles';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ASSETS from '../utils/assets';
import {HEIGHT, WIDTH} from '../utils/common';

const ANIMATION_DURATION = 1200;

const SplashScreen = () => {
  const flightOffset = useSharedValue(0);
  const zoomOffset = useSharedValue(15);
  const opacityOffset = useSharedValue(0);

  const animatedFlight = useAnimatedStyle(() => {
    return {
      transform: [{translateY: flightOffset.value}],
    };
  });

  const lineStyles = useAnimatedStyle(() => {
    return {
      height: -flightOffset.value + 20,
      width: zoomOffset.value,
    };
  });

  const nameStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityOffset.value,
    };
  });

  useEffect(() => {
    flightOffset.value = withTiming(
      -HEIGHT,
      {
        duration: ANIMATION_DURATION,
        // easing: Easing.out(Easing.ease),
        easing: Easing.exp,
      },
      () => {
        zoomOffset.value = withTiming(
          WIDTH * 1.5,
          {
            duration: ANIMATION_DURATION / 2,
            easing: Easing.exp,
          },
          () => {
            opacityOffset.value = withTiming(1, {
              duration: ANIMATION_DURATION / 2,
              easing: Easing.exp,
            });
          },
        );
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.flightStyle, animatedFlight]}>
        <Image
          source={ASSETS.Flight}
          resizeMode="contain"
          style={styles.logo}
        />
      </Animated.View>
      <Animated.View style={[styles.lineStyle, lineStyles]}>
        <Animated.Text style={[styles.name, nameStyles]}>
          Jet Set Go
        </Animated.Text>
      </Animated.View>
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
  flightStyle: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineStyle: {
    position: 'absolute',
    width: 15,
    bottom: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  logo: {width: 100, height: 100},
  name: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES['6xl'],
    fontWeight: 'bold',
  },
});

export default SplashScreen;
