import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { toastManager } from './ToastManager';
import { Toast } from './Toast';
import { ToastConfig, ToastContainerProps } from './types';
import { DEFAULT_TOP_OFFSET, DEFAULT_BOTTOM_OFFSET } from './types';

export const ToastContainer: React.FC<ToastContainerProps> = ({
  config: defaultConfig,
  topOffset = DEFAULT_TOP_OFFSET,
  bottomOffset = DEFAULT_BOTTOM_OFFSET,
  renderToast,
}) => {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  const handleHide = useCallback(() => {
    setToastConfig(prev => {
      if (prev) {
        prev.onHide?.();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    const unsubscribeShow = toastManager.subscribe((config: ToastConfig) => {
      const mergedConfig = { ...defaultConfig, ...config };
      setToastConfig(mergedConfig);
    });

    const unsubscribeHide = toastManager.subscribeToHide(() => {
      handleHide();
    });

    return () => {
      unsubscribeShow();
      unsubscribeHide();
    };
  }, [defaultConfig, handleHide]);

  if (!toastConfig || !toastConfig.isVisible) {
    return null;
  }

  if (renderToast) {
    return <View style={styles.container}>{renderToast(toastConfig)}</View>;
  }

  return (
    <Toast
      config={toastConfig}
      onHide={handleHide}
      topOffset={topOffset}
      bottomOffset={bottomOffset}
    />
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
  },
});
