import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from './BaseToast';
import { BaseToastProps, ToastIconConfig, ToastStyleOverride } from '../types';
import { COLORS } from '../colors';
import { ToastIcon } from '../ToastIcon';

interface WarningToastProps extends BaseToastProps {
  hide?: () => void;
  iconConfig?: ToastIconConfig;
  styleOverride?: ToastStyleOverride;
}

export const WarningToast: React.FC<WarningToastProps> = props => {
  const { iconConfig, styleOverride } = props;
  const bgColor = styleOverride?.backgroundColor || COLORS.warning;
  const textColor = styleOverride?.color || COLORS.white;

  return (
    <BaseToast
      {...props}
      style={[styles.warning, { backgroundColor: bgColor }, props.style]}
      text1Style={[styles.text1, { color: textColor }, props.text1Style]}
      text2Style={[styles.text2, { color: textColor }, props.text2Style]}
      renderLeadingIcon={
        iconConfig?.hideLeadingIcon
          ? undefined
          : () => (
              <ToastIcon
                type="warning"
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
  warning: {
    borderRadius: 8,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 13,
    opacity: 0.9,
  },
});
