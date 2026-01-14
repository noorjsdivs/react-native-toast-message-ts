import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from './BaseToast';
import { BaseToastProps } from '../types';
import { COLORS } from '../colors';
import { ToastIcon } from '../ToastIcon';

export const SuccessToast: React.FC<BaseToastProps> = (props) => {
  return (
    <BaseToast
      {...props}
      style={[styles.success, props.style]}
      contentContainerStyle={[props.contentContainerStyle]}
      text1Style={[styles.text1, props.text1Style]}
      renderLeadingIcon={() => <ToastIcon type="success" />}
    />
  );
};

const styles = StyleSheet.create({
  success: {
    borderLeftColor: COLORS.success,
    borderLeftWidth: 5,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
