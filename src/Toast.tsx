import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  Platform,
} from 'react-native';
import { ToastConfig } from './types';
import { ToastIcon } from './ToastIcon';
import { COLORS, getDefaultBackgroundColor, getDefaultBorderColor } from './colors';
import { DEFAULT_ANIMATION_DURATION, DEFAULT_DURATION, DEFAULT_POSITION } from './types';

interface ToastProps {
  config: ToastConfig;
  onHide: () => void;
  topOffset?: number;
  bottomOffset?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Toast: React.FC<ToastProps> = ({
  config,
  onHide,
  topOffset = 40,
  bottomOffset = 40,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    type = 'info',
    text1,
    text2,
    position = DEFAULT_POSITION,
    duration = DEFAULT_DURATION,
    animationDuration = DEFAULT_ANIMATION_DURATION,
    onPress,
    onShow,
    icon,
    style,
    text1Style,
    text2Style,
    backgroundColor,
    borderLeftColor,
    swipeable = true,
    isVisible,
  } = config;

  const finalBackgroundColor = backgroundColor || getDefaultBackgroundColor(type);
  const finalBorderColor = borderLeftColor || getDefaultBorderColor(type);

  // Pan responder for swipe to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => swipeable,
      onMoveShouldSetPanResponder: (_, gestureState) => swipeable && Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (position === 'top' && gestureState.dy < 0) {
          translateY.setValue(gestureState.dy);
        } else if (position === 'bottom' && gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = 50;
        const shouldDismiss =
          (position === 'top' && gestureState.dy < -threshold) ||
          (position === 'bottom' && gestureState.dy > threshold);

        if (shouldDismiss) {
          hide();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const show = () => {
    const startPosition = position === 'top' ? -100 : 100;
    translateY.setValue(startPosition);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onShow?.();
    });

    if (duration > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        hide();
      }, duration);
    }
  };

  const hide = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    const endPosition = position === 'top' ? -100 : 100;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: endPosition,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  useEffect(() => {
    if (isVisible) {
      show();
    } else {
      hide();
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const handlePress = () => {
    onPress?.();
    if (duration > 0) {
      hide();
    }
  };

  const positionStyle = position === 'top' ? { top: topOffset } : { bottom: bottomOffset };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          transform: [{ translateY }, { translateX }],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress ? handlePress : undefined}
        style={[
          styles.toastContainer,
          {
            backgroundColor: finalBackgroundColor,
            borderLeftColor: finalBorderColor,
          },
          style,
        ]}
      >
        {icon || (type !== 'custom' && <ToastIcon type={type} size={24} />)}
        <View style={styles.textContainer}>
          {text1 && (
            <Text style={[styles.text1, text1Style]} numberOfLines={2}>
              {text1}
            </Text>
          )}
          {text2 && (
            <Text style={[styles.text2, text2Style]} numberOfLines={2}>
              {text2}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    paddingHorizontal: 16,
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH - 32,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  text2: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
