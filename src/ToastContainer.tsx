import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { toastManager } from './ToastManager';
import { Toast } from './Toast';
import { ToastConfig, ToastConfigParams, ToastData } from './types';
import { SuccessToast } from './components/SuccessToast';
import { ErrorToast } from './components/ErrorToast';
import { InfoToast } from './components/InfoToast';
import { BaseToast } from './components/BaseToast';
import { WarningIcon } from './ToastIcon';

export interface ToastContainerProps {
  config?: ToastConfig;
  topOffset?: number;
  bottomOffset?: number;
  visibilityTime?: number;
}

const defaultComponents: ToastConfig = {
  success: (props: ToastConfigParams) => <SuccessToast {...props} />,
  error: (props: ToastConfigParams) => <ErrorToast {...props} />,
  info: (props: ToastConfigParams) => <InfoToast {...props} />,
  base: (props: ToastConfigParams) => <BaseToast {...props} onClose={props.hide} />,
  warning: (props: ToastConfigParams) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#ffc107', borderLeftWidth: 5 }}
      renderLeadingIcon={() => <WarningIcon />}
      onClose={props.hide}
    />
  ),
};

export interface ToastItem extends ToastData {
  id: string;
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
    // Hide the first/oldest toast in queue
    setToastQueue(prev => {
      if (prev.length === 0) return prev;
      const [current, ...rest] = prev;
      current?.onHide?.();
      return rest;
    });
  }, []);

  const handleShow = useCallback(
    (data: ToastData) => {
      const toastItem: ToastItem = {
        ...data,
        id: `toast_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        visibilityTime: data.visibilityTime ?? defaultVisibilityTime,
      };
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

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toastQueue.map((toastData, index) => {
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
        };

        const offset = index * 75; // Stack toasts with 75px spacing
        const position = toastData.position || 'top';
        const calculatedTopOffset = position === 'top' ? topOffset + offset : topOffset;
        const calculatedBottomOffset = position === 'bottom' ? bottomOffset + offset : bottomOffset;

        return (
          <Toast
            key={toastId}
            config={rendererProps}
            topOffset={calculatedTopOffset}
            bottomOffset={calculatedBottomOffset}
            renderer={Renderer}
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
