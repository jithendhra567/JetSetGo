/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {HEIGHT, WIDTH} from '../../utils/common';
import {COLORS, FONT_SIZES} from '../../utils/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomTabs} from '../../components/CustomTabs';

const TABS = ['One Way', 'Round'];

const Home = () => {
  const animationOffset = useRef(new Animated.Value(HEIGHT)).current;

  const [tripType, setTripType] = React.useState(0);

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
        </View>
      </View>
      <Animated.View style={[styles.lineStyle, {height: animationOffset}]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default Home;
