import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { toastManager } from './ToastManager';
import { Toast } from './Toast';
import {
  ToastConfig,
  ToastConfigParams,
  ToastData,
  ToastPosition,
  ToastStyleOverride,
  ToastAnimationType,
} from './types';
import { SuccessToast } from './components/SuccessToast';
import { ErrorToast } from './components/ErrorToast';
import { InfoToast } from './components/InfoToast';
import { WarningToast } from './components/WarningToast';
import { BaseToast } from './components/BaseToast';

export interface ToastContainerProps {
  config?: ToastConfig;
  topOffset?: number;
  bottomOffset?: number;
  visibilityTime?: number;
  /** Maximum number of toasts visible in stack */
  maxVisibleToasts?: number;
  /** Default position for all toasts */
  position?: ToastPosition;
  /** Animation type: 'fade', 'slide', or 'slide-fade' (default) */
  animation?: ToastAnimationType;
  /** Style overrides for success toasts */
  success?: ToastStyleOverride;
  /** Style overrides for error toasts */
  error?: ToastStyleOverride;
  /** Style overrides for warning toasts */
  warning?: ToastStyleOverride;
  /** Style overrides for info toasts */
  info?: ToastStyleOverride;
}

const defaultComponents: ToastConfig = {
  success: (props: ToastConfigParams) => <SuccessToast {...props} />,
  error: (props: ToastConfigParams) => <ErrorToast {...props} />,
  info: (props: ToastConfigParams) => <InfoToast {...props} />,
  warning: (props: ToastConfigParams) => <WarningToast {...props} />,
  base: (props: ToastConfigParams) => <BaseToast {...props} onClose={props.hide} />,
};

export interface ToastItem extends ToastData {
  id: string;
  createdAt: number;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  config,
  topOffset = 40,
  bottomOffset = 40,
  visibilityTime: defaultVisibilityTime = 3000,
  position: defaultPosition = 'top',
  animation: defaultAnimation = 'slide-fade',
  maxVisibleToasts = 3,
  success: successStyle,
  error: errorStyle,
  warning: warningStyle,
  info: infoStyle,
}) => {
  const [toastQueue, setToastQueue] = useState<ToastItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get style override for a toast type
  const getStyleOverride = useCallback(
    (type: string): ToastStyleOverride | undefined => {
      switch (type) {
        case 'success':
          return successStyle;
        case 'error':
          return errorStyle;
        case 'warning':
          return warningStyle;
        case 'info':
          return infoStyle;
        default:
          return undefined;
      }
    },
    [successStyle, errorStyle, warningStyle, infoStyle],
  );

  const mergedConfig = useMemo(() => {
    return {
      ...defaultComponents,
      ...config,
    };
  }, [config]);

  const removeToast = useCallback((toastId: string) => {
    setToastQueue(prev => {
      if (!prev) return [];
      const toastToRemove = prev.find(t => t.id === toastId);
      if (toastToRemove) {
        toastToRemove.onHide?.();
      }
      const newQueue = prev.filter(t => t.id !== toastId);
      if (newQueue.length === 0) {
        setIsExpanded(false);
      }
      return newQueue;
    });
  }, []);

  const handleHide = useCallback(() => {
    // Hide the newest (front) toast - it's at the end of the array
    setToastQueue(prev => {
      if (!prev || prev.length === 0) return prev || [];
      const newQueue = [...prev];
      const removed = newQueue.pop(); // Remove newest (front) toast
      removed?.onHide?.();
      if (newQueue.length === 0) {
        setIsExpanded(false);
      }
      return newQueue;
    });
  }, []);

  const handleShow = useCallback(
    (data: ToastData) => {
      const toastItem: ToastItem = {
        ...data,
        id: `toast_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        visibilityTime: data.visibilityTime ?? defaultVisibilityTime,
        createdAt: Date.now(),
      };
      // Add new toast to the end (newest = front)
      setToastQueue(prev => [...(prev || []), toastItem]);
    },
    [defaultVisibilityTime],
  );

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  useEffect(() => {
    const unsubscribeShow = toastManager.subscribe(handleShow);
    const unsubscribeHide = toastManager.subscribeToHide(handleHide);

    return () => {
      unsubscribeShow();
      unsubscribeHide();
    };
  }, [handleShow, handleHide]);

  if (!toastQueue || toastQueue.length === 0) {
    return null;
  }

  // Determine which toasts to show
  // We want the last N items, where N is maxVisibleToasts
  // Example: Queue [A, B, C, D, E], Max 3 => Show [C, D, E]
  // E is newest/front (index 0 in stack), D is index 1, C is index 2
  const visibleToasts = toastQueue.slice(-maxVisibleToasts);

  return (
    <View style={styles.container} pointerEvents="box-none">
      {visibleToasts.map((toastItem, index) => {
        const { type = 'success' } = toastItem;
        const Renderer = mergedConfig[type] || mergedConfig.info;
        const toastId = toastItem.id;

        // Calculate stack index
        // visibleToasts is [..., newest]. length=N.
        // Item at index i has stackIndex = N - 1 - i
        // Example: [C, D, E]. E (last, i=2) -> 3-1-2 = 0. Correct.
        const stackIndex = visibleToasts.length - 1 - index;

        // Hide function for this specific toast
        const hideThisToast = () => removeToast(toastId);

        const rendererProps: ToastConfigParams = {
          ...toastItem,
          isVisible: true,
          show: params => toastManager.show(params),
          hide: hideThisToast,
          position: toastItem.position || defaultPosition,
          type: type,
          props: toastItem.props || {},
          iconConfig: toastItem.iconConfig,
          stackIndex,
          stackSize: toastQueue.length,
          styleOverride: getStyleOverride(type),
          animation: defaultAnimation,
          isExpanded: isExpanded,
          toggleExpanded: toggleExpanded,
        };

        return (
          <Toast
            key={toastId}
            config={rendererProps}
            topOffset={topOffset}
            bottomOffset={bottomOffset}
            renderer={Renderer}
            stackIndex={stackIndex}
            stackSize={toastQueue.length}
            animation={defaultAnimation}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
});
