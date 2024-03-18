import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/styles';

type Props = {
  steps: number;
  onStepsChange: (steps: number) => void;
};

const StepCounter = ({steps, onStepsChange}: Props) => {
  const onAdd = () => {
    onStepsChange(steps + 1);
  };

  const onSubtract = () => {
    if (steps === 0) {
      return;
    }
    onStepsChange(steps - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSubtract} style={styles.actionContainer}>
        <Text
          style={[
            styles.action,
            {fontSize: FONT_SIZES['6xl'], transform: [{translateY: -4}]},
          ]}>
          -
        </Text>
      </TouchableOpacity>
      <Text style={styles.steps}>{steps}</Text>
      <TouchableOpacity onPress={onAdd} style={styles.actionContainer}>
        <Text style={[styles.action, {transform: [{translateY: -2}]}]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  actionContainer: {
    borderRadius: 100,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    position: 'relative',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    fontSize: FONT_SIZES['4xl'],
    position: 'absolute',
    color: COLORS.BLACK,
  },
  steps: {
    fontSize: FONT_SIZES['4xl'],
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
});

export default StepCounter;
