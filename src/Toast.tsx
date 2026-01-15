import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';

import { ToastConfigParams } from './types';

export interface ToastProps {
  config: ToastConfigParams;
  topOffset?: number;
  bottomOffset?: number;
  renderer: (params: ToastConfigParams) => React.ReactNode;
  /** Index in the stack (0 = front/newest) */
  stackIndex?: number;
  /** Total number of toasts */
  stackSize?: number;
}

// Animation configuration for smooth drawer effect
const ANIMATION_CONFIG = {
  duration: 300,
  useNativeDriver: true,
  // Scale reduction per stack level
  scaleReduction: 0.05,
  // Vertical offset per stack level (drawer effect)
  stackOffset: 12,
  // Maximum stack depth to show
  maxVisibleStack: 5,
  // Opacity reduction per stack level
  opacityReduction: 0.15,
};

export const Toast: React.FC<ToastProps> = ({
  config,
  topOffset = 40,
  bottomOffset = 40,
  renderer,
  stackIndex = 0,
  stackSize = 1,
}) => {
  const {
    position,
    isVisible,
    autoHide = true,
    visibilityTime = 4000,
    hide,
    onShow,
    onHide,
  } = config as ToastConfigParams & {
    autoHide?: boolean;
    visibilityTime?: number;
    onShow?: () => void;
    onHide?: () => void;
  };

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const stackTranslateY = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate drawer-style stacking values
  const targetScale = Math.max(1 - stackIndex * ANIMATION_CONFIG.scaleReduction, 0.85);
  const targetStackOffset =
    position === 'top'
      ? stackIndex * ANIMATION_CONFIG.stackOffset
      : -stackIndex * ANIMATION_CONFIG.stackOffset;
  const targetOpacity = Math.max(1 - stackIndex * ANIMATION_CONFIG.opacityReduction, 0.4);

  // Z-index: higher for front toasts (newest has highest z-index)
  const zIndex = 9999 - stackIndex;

  // Pan responder for swipe to dismiss
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => stackIndex === 0, // Only front toast is swipeable
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return stackIndex === 0 && Math.abs(gestureState.dy) > 5;
        },
        onPanResponderMove: (_, gestureState) => {
          if (stackIndex !== 0) return;
          if (position === 'top' && gestureState.dy < 0) {
            translateY.setValue(gestureState.dy);
          } else if (position === 'bottom' && gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (stackIndex !== 0) return;
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
              bounciness: 0,
            }).start();
          }
        },
      }),
    [hide, position, translateY, stackIndex],
  );

  const animateShow = () => {
    const startPosition = position === 'top' ? -100 : 100;
    translateY.setValue(startPosition);
    opacity.setValue(0);
    scale.setValue(targetScale);
    stackTranslateY.setValue(targetStackOffset);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIMATION_CONFIG.duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: targetOpacity,
        duration: ANIMATION_CONFIG.duration,
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
        duration: ANIMATION_CONFIG.duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_CONFIG.duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  // Animate stack position changes smoothly
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: targetScale,
        duration: ANIMATION_CONFIG.duration,
        useNativeDriver: true,
      }),
      Animated.timing(stackTranslateY, {
        toValue: targetStackOffset,
        duration: ANIMATION_CONFIG.duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isVisible ? targetOpacity : 0,
        duration: ANIMATION_CONFIG.duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [stackIndex, targetScale, targetStackOffset, targetOpacity, isVisible]);

  useEffect(() => {
    if (isVisible) {
      animateShow();
      // Only auto-hide the front toast
      if (autoHide && visibilityTime > 0 && stackIndex === 0) {
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

  // Clear/reset timer when becoming front toast
  useEffect(() => {
    if (stackIndex === 0 && isVisible && autoHide && visibilityTime > 0) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(hide, visibilityTime);
    } else if (stackIndex !== 0 && hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackIndex]);

  // Don't render if beyond max visible stack
  if (stackIndex >= ANIMATION_CONFIG.maxVisibleStack) {
    return null;
  }

  const positionStyle = position === 'top' ? { top: topOffset } : { bottom: bottomOffset };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          transform: [{ translateY: Animated.add(translateY, stackTranslateY) }, { scale }],
          opacity,
          zIndex,
          elevation: zIndex, // Android elevation
        },
      ]}
      {...(stackIndex === 0 ? panResponder.panHandlers : {})}
      testID="toast-animated-view"
      pointerEvents={stackIndex === 0 ? 'auto' : 'box-none'}
    >
      {renderer({ ...config, stackIndex, stackSize })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
