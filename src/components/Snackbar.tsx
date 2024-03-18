import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {StyleSheet, Text} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/styles';

export type SnackbarProps = {
  message?: string;
  duration?: number;
  type: 'info' | 'success' | 'error' | 'warning';
};

const configStyles = {
  info: {
    borderColor: COLORS.BLUE,
    borderWidth: 1,
    color: 'BLUE',
  },
  success: {
    borderColor: COLORS.GREEN,
    borderWidth: 1,
    color: 'GREEN',
  },
  error: {
    borderColor: COLORS.RED,
    borderWidth: 1,
    color: 'RED',
  },
  warning: {
    borderColor: COLORS.ORANGE,
    borderWidth: 1,
    color: 'ORANGE',
  },
};

const ANIMATION_DURATION = 900;

const DEFAULT_CONFIG: SnackbarProps = {
  message: '',
  duration: 3000,
  type: 'info',
};

const snackbarRef = React.createRef<any>();
const modalSnackRef = React.createRef<any>();

const Snackbar = React.forwardRef<any, {isModal?: boolean}>(
  ({isModal}, ref) => {
    const offset = useSharedValue(-100);
    const [data, setData] = React.useState<SnackbarProps>(DEFAULT_CONFIG);

    const showSnackbar = (snackData: SnackbarProps) => {
      if (!snackData.message) {
        return;
      }
      setData(snackData);
      offset.value = withSpring(100, {
        duration: ANIMATION_DURATION,
      });
      hideSnackbar(snackData.duration);
    };

    const hideSnackbar = (delay: number = 0) => {
      if (isModal) {
        snackbarRef.current?.hideSnackbar();
      }
      setTimeout(() => {
        offset.value = withSpring(-100, {
          duration: ANIMATION_DURATION,
        });
      }, delay);
    };

    React.useImperativeHandle(isModal ? ref : snackbarRef, () => ({
      showSnackbar,
      hideSnackbar,
    }));

    const animatedStyles = useAnimatedStyle(() => ({
      top: offset.value,
    }));

    return (
      <Animated.View
        ref={isModal ? ref : snackbarRef}
        style={[styles.container, configStyles[data.type], animatedStyles]}>
        <Text style={styles.text}>
          {typeof data.message === 'string'
            ? data.message
            : 'Something went wrong'}
        </Text>
        <Text style={styles.close} onPress={() => hideSnackbar(0)}>
          Close
        </Text>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    left: '5%',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.BLACK,
  },
  text: {
    width: '86%',
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.lg,
  },
  close: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.md,
  },
});

export const showSnackbar = (
  message: string,
  props: SnackbarProps = DEFAULT_CONFIG,
) => {
  const params = {
    ...DEFAULT_CONFIG,
    ...props,
    message,
  };
  snackbarRef.current?.showSnackbar(params);
  modalSnackRef.current?.showSnackbar(params);
};

export default Snackbar;
