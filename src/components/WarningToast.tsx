import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from './BaseToast';
import { BaseToastProps, ToastIconConfig } from '../types';
import { COLORS } from '../colors';
import { ToastIcon } from '../ToastIcon';

interface WarningToastProps extends BaseToastProps {
  hide?: () => void;
  iconConfig?: ToastIconConfig;
}

export const WarningToast: React.FC<WarningToastProps> = props => {
  const { iconConfig } = props;

  return (
    <BaseToast
      {...props}
      style={[styles.warning, props.style]}
      text1Style={[styles.text1, props.text1Style]}
      text2Style={[styles.text2, props.text2Style]}
      renderLeadingIcon={
        iconConfig?.hideLeadingIcon
          ? undefined
          : () => (
              <ToastIcon
                type="warning"
                color={iconConfig?.leadingIconColor || COLORS.warningText}
                size={iconConfig?.leadingIconSize || 24}
              />
            )
      }
      onClose={props.hide}
      iconConfig={{
        ...iconConfig,
        closeIconColor: iconConfig?.closeIconColor || COLORS.warningText,
      }}
    />
  );
};

const styles = StyleSheet.create({
  warning: {
    backgroundColor: COLORS.warning,
    borderRadius: 8,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.warningText,
  },
  text2: {
    fontSize: 13,
    color: COLORS.warningText,
    opacity: 0.85,
  },
});
