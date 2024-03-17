/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {LayoutAnimation, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/styles';

type Props = {
  tabs: string[];
  onTabPress: (index: number) => void;
  tabStyle?: ViewStyle;
  tabTextStyle?: ViewStyle;
  activeTabIndex: number;
};

export const CustomTabs = ({
  tabs,
  onTabPress,
  tabStyle,
  tabTextStyle,
  activeTabIndex,
}: Props) => {
  const onPress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onTabPress(index);
  };

  return (
    <View style={[styles.tabs, tabStyle]}>
      {tabs.map((tab, index) => (
        <View
          style={{
            alignItems: 'center',
            width: `${100 / tabs.length}%`,
            gap: 6,
          }}>
          <Text
            key={index}
            style={[
              styles.tabText,
              tabTextStyle,
              {opacity: index === activeTabIndex ? 1 : 0.5},
            ]}
            onPress={() => onPress(index)}>
            {tab}
          </Text>
          {activeTabIndex === index && (
            <View
              style={{
                height: 3,
                borderRadius: 10,
                width: '20%',
                backgroundColor: COLORS.ORANGE,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabText: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
