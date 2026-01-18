import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, PanResponder, StyleSheet, Easing } from 'react-native';

import { ToastConfigParams, ToastAnimationType } from './types';

export interface ToastProps {
  config: ToastConfigParams;
  topOffset?: number;
  bottomOffset?: number;
  renderer: (params: ToastConfigParams) => React.ReactNode;
  /** Index in the stack (0 = front/newest) */
  stackIndex?: number;
  /** Total number of toasts */
  stackSize?: number;
  /** Animation type */
  animation?: ToastAnimationType;
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
  opacityReduction: 0.1,
  // Slide distance
  slideDistance: 120,
  // Height estimate for expansion
  expandedHeight: 80, // 60px height + 20px gap
};

export const Toast: React.FC<ToastProps> = ({
  config,
  topOffset = 40,
  bottomOffset = 40,
  renderer,
  stackIndex = 0,
  stackSize = 1,
  animation = 'slide-fade',
}) => {
  const {
    position,
    isVisible,
    autoHide = true,
    visibilityTime = 4000,
    hide,
    onShow,
    onHide,
    isExpanded,
    toggleExpanded,
  } = config as ToastConfigParams & {
    autoHide?: boolean;
    visibilityTime?: number;
    onShow?: () => void;
    onHide?: () => void;
    isExpanded?: boolean;
    toggleExpanded?: () => void;
  };

  // Use animation from config if provided, otherwise use prop
  const animationType = config.animation || animation;

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const stackTranslateY = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate stacking values based on state
  let targetScale = 1;
  let targetStackOffset = 0;
  let targetOpacity = 1;

  if (isExpanded) {
    // Expanded state: No scaling, vertical stacking with gap
    targetScale = 1;
    targetOpacity = 1;

    // Calculate expanded offset
    // Stack Index 0 is at pos 0
    // Stack Index 1 is at pos 1 * height
    const expandedOffset = stackIndex * ANIMATION_CONFIG.expandedHeight;
    targetStackOffset = position === 'top' ? expandedOffset : -expandedOffset;
  } else {
    // Collapsed state: Scale down, small vertical offset
    targetScale = Math.max(1 - stackIndex * ANIMATION_CONFIG.scaleReduction, 0.85);
    const collapsedOffset = stackIndex * ANIMATION_CONFIG.stackOffset;
    targetStackOffset = position === 'top' ? collapsedOffset : -collapsedOffset;
    targetOpacity = Math.max(1 - stackIndex * ANIMATION_CONFIG.opacityReduction, 0.6);
  }

  // Z-index: higher for front toasts (newest has highest z-index)
  // When expanded, we might want to reverse logic or keep it?
  // If keeping, 0 overlaying 1 overlaying 2. This works fine for expanded too.
  const zIndex = 9999 - stackIndex;

  // Pan responder for swipe to dismiss
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Enable swipe for all items if expanded, or only front if collapsed
        onStartShouldSetPanResponder: () => isExpanded || stackIndex === 0,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          const active = isExpanded || stackIndex === 0;
          return active && Math.abs(gestureState.dy) > 5;
        },
        onPanResponderMove: (_, gestureState) => {
          if (!isExpanded && stackIndex !== 0) return;

          if (position === 'top' && gestureState.dy < 0) {
            translateY.setValue(gestureState.dy);
          } else if (position === 'bottom' && gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (!isExpanded && stackIndex !== 0) return;

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
    [hide, position, translateY, stackIndex, isExpanded],
  );

  const animateShow = () => {
    // Get slide distance based on position (top slides from above, bottom slides from below)
    const slideDistance = ANIMATION_CONFIG.slideDistance;
    const startPosition = position === 'top' ? -slideDistance : slideDistance;

    // Set initial values based on animation type
    switch (animationType) {
      case 'fade':
        translateY.setValue(0);
        opacity.setValue(0);
        break;
      case 'slide':
        translateY.setValue(startPosition);
        opacity.setValue(1);
        break;
      case 'slide-fade':
      default:
        translateY.setValue(startPosition);
        opacity.setValue(0);
        break;
    }

    scale.setValue(targetScale);
    stackTranslateY.setValue(targetStackOffset);

    const animations: Animated.CompositeAnimation[] = [];

    // Add slide animation if needed
    if (animationType === 'slide' || animationType === 'slide-fade') {
      animations.push(
        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIMATION_CONFIG.duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      );
    }

    // Add fade animation if needed
    if (animationType === 'fade' || animationType === 'slide-fade') {
      animations.push(
        Animated.timing(opacity, {
          toValue: targetOpacity,
          duration: ANIMATION_CONFIG.duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      );
    } else {
      // For slide-only, still animate to target opacity for stacking
      animations.push(
        Animated.timing(opacity, {
          toValue: targetOpacity,
          duration: ANIMATION_CONFIG.duration / 2,
          useNativeDriver: true,
        }),
      );
    }

    Animated.parallel(animations).start(() => {
      onShow?.();
    });
  };

  const animateHide = () => {
    // Get slide distance based on position (exit in same direction)
    const slideDistance = ANIMATION_CONFIG.slideDistance;
    const endPosition = position === 'top' ? -slideDistance : slideDistance;

    const animations: Animated.CompositeAnimation[] = [];

    // Add slide animation if needed
    if (animationType === 'slide' || animationType === 'slide-fade') {
      animations.push(
        Animated.timing(translateY, {
          toValue: endPosition,
          duration: ANIMATION_CONFIG.duration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      );
    }

    // Add fade animation if needed
    if (animationType === 'fade' || animationType === 'slide-fade') {
      animations.push(
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_CONFIG.duration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      );
    } else {
      // For slide-only, quickly fade at the end
      animations.push(
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_CONFIG.duration / 2,
          delay: ANIMATION_CONFIG.duration / 2,
          useNativeDriver: true,
        }),
      );
    }

    Animated.parallel(animations).start(() => {
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
  }, [
    stackIndex,
    targetScale,
    targetStackOffset,
    targetOpacity,
    isVisible,
    scale,
    stackTranslateY,
    opacity,
  ]);

  useEffect(() => {
    if (isVisible) {
      animateShow();
      // Only auto-hide the front toast, AND only if not expanded
      // If expanded, we probably want to pause auto-hide or let them stay?
      // For now, let's keep auto-hide logic simple: pause if expanded?
      if (autoHide && visibilityTime > 0 && stackIndex === 0 && !isExpanded) {
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
  }, [isVisible, isExpanded]); // added isExpanded dependency to restart/cancel timer

  // Clear/reset timer when becoming front toast or checking expansion
  useEffect(() => {
    if (stackIndex === 0 && isVisible && autoHide && visibilityTime > 0 && !isExpanded) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(hide, visibilityTime);
    } else if ((stackIndex !== 0 || isExpanded) && hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackIndex, isExpanded]);

  // Don't render if beyond max visible stack
  if (stackIndex >= ANIMATION_CONFIG.maxVisibleStack) {
    return null;
  }

  const positionStyle = position === 'top' ? { top: topOffset } : { bottom: bottomOffset };

  // Intercept onPress to handle expansion toggle
  const handlePress = () => {
    if (!isExpanded && stackSize > 1 && toggleExpanded) {
      toggleExpanded();
    } else {
      config.onPress?.();
    }
  };

  // Create a modified renderer wrapper to hijack onPress
  // We can't easily modify the internal TouchableOpacity of the rendered component
  // unless we pass a modified `config` to `renderer`.
  const rendererConfig = {
    ...config,
    onPress: handlePress, // Override the onPress passed to the component
  };

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
      {...panResponder.panHandlers}
      testID="toast-animated-view"
      pointerEvents={isExpanded || stackIndex === 0 ? 'auto' : 'box-none'}
    >
      {renderer({ ...rendererConfig, stackIndex, stackSize })}
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
