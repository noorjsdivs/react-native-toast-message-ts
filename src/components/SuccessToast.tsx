import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from './BaseToast';
import { BaseToastProps, ToastIconConfig, ToastStyleOverride } from '../types';
import { COLORS } from '../colors';
import { ToastIcon } from '../ToastIcon';

interface SuccessToastProps extends BaseToastProps {
  hide?: () => void;
  iconConfig?: ToastIconConfig;
  styleOverride?: ToastStyleOverride;
}

export const SuccessToast: React.FC<SuccessToastProps> = props => {
  const { iconConfig, styleOverride } = props;
  const bgColor = styleOverride?.backgroundColor || COLORS.success;
  const textColor = styleOverride?.color || COLORS.white;

  return (
    <BaseToast
      {...props}
      style={[styles.success, { backgroundColor: bgColor }, props.style]}
      contentContainerStyle={[props.contentContainerStyle]}
      text1Style={[styles.text1, { color: textColor }, props.text1Style]}
      text2Style={[styles.text2, { color: textColor }, props.text2Style]}
      renderLeadingIcon={
        iconConfig?.hideLeadingIcon
          ? undefined
          : () => (
              <ToastIcon
                type="success"
                color={iconConfig?.leadingIconColor || textColor}
                size={iconConfig?.leadingIconSize || 24}
              />
            )
      }
      onClose={props.hide}
      iconConfig={{
        ...iconConfig,
        closeIconColor: iconConfig?.closeIconColor || textColor,
      }}
    />
  );
};

const styles = StyleSheet.create({
  success: {
    backgroundColor: COLORS.success,
    borderRadius: 8,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  text2: {
    fontSize: 13,
    color: COLORS.white,
    opacity: 0.9,
  },
});
