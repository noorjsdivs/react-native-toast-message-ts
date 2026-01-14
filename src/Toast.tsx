import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';

import { ToastConfigParams } from './types';

export interface ToastProps {
  config: ToastConfigParams;
  topOffset?: number;
  bottomOffset?: number;
  renderer: (params: ToastConfigParams) => React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({
  config,
  topOffset = 40,
  bottomOffset = 40,
  renderer,
}) => {
  const {
    position,
    isVisible,
    autoHide = true,
    visibilityTime = 4000,
    hide,
    onShow,
    onHide,
  } = config as any; // Cast to access extra props if needed or fix types

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animationDuration = 300; // Could be a prop

  // Pan responder for swipe to dismiss
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
           return Math.abs(gestureState.dy) > 5;
        },
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
              bounciness: 0
            }).start();
          }
        },
      }),
    [hide, position, translateY]
  );

  const animateShow = () => {
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
  };

  const animateHide = () => {
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
      onHide?.();
    });
  };

  useEffect(() => {
    if (isVisible) {
      animateShow();
      if (autoHide && visibilityTime > 0) {
        hideTimeoutRef.current = setTimeout(hide, visibilityTime);
      }
    } else {
      animateHide();
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const positionStyle = position === 'top' ? { top: topOffset } : { bottom: bottomOffset };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
      testID="toast-animated-view"
    >
      {renderer(config)}
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
  },
});
