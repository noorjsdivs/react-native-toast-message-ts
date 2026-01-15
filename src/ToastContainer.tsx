import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { toastManager } from './ToastManager';
import { Toast } from './Toast';
import { ToastConfig, ToastConfigParams, ToastData } from './types';
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
}) => {
  const [toastQueue, setToastQueue] = useState<ToastItem[]>([]);

  const mergedConfig = useMemo(() => {
    return {
      ...defaultComponents,
      ...config,
    };
  }, [config]);

  const removeToast = useCallback((toastId: string) => {
    setToastQueue(prev => {
      const toastToRemove = prev.find(t => t.id === toastId);
      if (toastToRemove) {
        toastToRemove.onHide?.();
      }
      return prev.filter(t => t.id !== toastId);
    });
  }, []);

  const handleHide = useCallback(() => {
    // Hide the newest (front) toast - it's at the end of the array
    setToastQueue(prev => {
      if (prev.length === 0) return prev;
      const newQueue = [...prev];
      const removed = newQueue.pop(); // Remove newest (front) toast
      removed?.onHide?.();
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
      setToastQueue(prev => [...prev, toastItem]);
    },
    [defaultVisibilityTime],
  );

  useEffect(() => {
    const unsubscribeShow = toastManager.subscribe(handleShow);
    const unsubscribeHide = toastManager.subscribeToHide(handleHide);

    return () => {
      unsubscribeShow();
      unsubscribeHide();
    };
  }, [handleShow, handleHide]);

  if (toastQueue.length === 0) {
    return null;
  }

  // Reverse for rendering: newest (last added) should be at front (index 0 in display)
  const reversedQueue = [...toastQueue].reverse();
  const stackSize = reversedQueue.length;

  return (
    <View style={styles.container} pointerEvents="box-none">
      {reversedQueue.map((toastData, displayIndex) => {
        const { type = 'success' } = toastData;
        const Renderer = mergedConfig[type] || mergedConfig.info;
        const toastId = toastData.id;

        // Create hide function specific to this toast
        const hideThisToast = () => removeToast(toastId);

        const rendererProps: ToastConfigParams = {
          ...toastData,
          isVisible: true,
          show: params => toastManager.show(params),
          hide: hideThisToast,
          position: toastData.position || 'top',
          type: type,
          props: toastData.props || {},
          iconConfig: toastData.iconConfig,
          stackIndex: displayIndex,
          stackSize: stackSize,
        };

        return (
          <Toast
            key={toastId}
            config={rendererProps}
            topOffset={topOffset}
            bottomOffset={bottomOffset}
            renderer={Renderer}
            stackIndex={displayIndex}
            stackSize={stackSize}
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
