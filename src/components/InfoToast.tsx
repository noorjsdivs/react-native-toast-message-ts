import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from './BaseToast';
import { BaseToastProps } from '../types';
import { COLORS } from '../colors';
import { ToastIcon } from '../ToastIcon';

export const InfoToast: React.FC<BaseToastProps & { hide?: () => void }> = props => {
  return (
    <BaseToast
      {...props}
      style={[styles.info, props.style]}
      text1Style={[styles.text1, props.text1Style]}
      renderLeadingIcon={() => <ToastIcon type="info" />}
      onClose={(props as any).hide}
    />
  );
};

const styles = StyleSheet.create({
  info: {
    borderLeftColor: COLORS.info,
    borderLeftWidth: 5,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
