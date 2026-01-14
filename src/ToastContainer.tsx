import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { toastManager } from './ToastManager';
import { Toast } from './Toast';
import { ToastConfig, ToastConfigParams, ToastData } from './types';
import { SuccessToast } from './components/SuccessToast';
import { ErrorToast } from './components/ErrorToast';
import { InfoToast } from './components/InfoToast';
import { BaseToast } from './components/BaseToast';

export interface ToastContainerProps {
  config?: ToastConfig;
  topOffset?: number;
  bottomOffset?: number;
}

const defaultComponents: ToastConfig = {
  success: (props: ToastConfigParams) => <SuccessToast {...props} />,
  error: (props: ToastConfigParams) => <ErrorToast {...props} />,
  info: (props: ToastConfigParams) => <InfoToast {...props} />,
  base: (props: ToastConfigParams) => <BaseToast {...props} />,
  warning: (props: ToastConfigParams) => (
    <BaseToast {...props} style={{ borderLeftColor: '#ffc107', borderLeftWidth: 5 }} />
  ),
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  config,
  topOffset = 40,
  bottomOffset = 40,
}) => {
  const [toastData, setToastData] = useState<ToastData | null>(null);

  const mergedConfig = useMemo(() => {
    return {
      ...defaultComponents,
      ...config,
    };
  }, [config]);

  const handleHide = useCallback(() => {
    setToastData(prev => {
      if (prev) {
        prev.onHide?.();
      }
      return null;
    });
  }, []);

  const handleShow = useCallback((data: ToastData) => {
    setToastData(data);
  }, []);

  useEffect(() => {
    const unsubscribeShow = toastManager.subscribe(handleShow);
    const unsubscribeHide = toastManager.subscribeToHide(handleHide);

    return () => {
      unsubscribeShow();
      unsubscribeHide();
    };
  }, [handleShow, handleHide]);

  if (!toastData || !toastData.isVisible) {
    return null;
  }

  const { type = 'success' } = toastData;
  const Renderer = mergedConfig[type] || mergedConfig.info;

  const rendererProps: ToastConfigParams = {
    ...toastData,
    isVisible: true,
    show: params => toastManager.show(params),
    hide: toastManager.hide,
    position: toastData.position || 'top',
    type: type,
    props: toastData.props || {},
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container]}
      pointerEvents="box-none"
    >
      <Toast
        config={rendererProps}
        topOffset={topOffset}
        bottomOffset={bottomOffset}
        renderer={Renderer}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
