import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from './BaseToast';
import { BaseToastProps, ToastIconConfig } from '../types';
import { COLORS } from '../colors';
import { ToastIcon } from '../ToastIcon';

interface SuccessToastProps extends BaseToastProps {
  hide?: () => void;
  iconConfig?: ToastIconConfig;
}

export const SuccessToast: React.FC<SuccessToastProps> = props => {
  const { iconConfig } = props;

  return (
    <BaseToast
      {...props}
      style={[styles.success, props.style]}
      contentContainerStyle={[props.contentContainerStyle]}
      text1Style={[styles.text1, props.text1Style]}
      text2Style={[styles.text2, props.text2Style]}
      renderLeadingIcon={
        iconConfig?.hideLeadingIcon
          ? undefined
          : () => (
              <ToastIcon
                type="success"
                color={iconConfig?.leadingIconColor || COLORS.white}
                size={iconConfig?.leadingIconSize || 24}
              />
            )
      }
      onClose={props.hide}
      iconConfig={{
        ...iconConfig,
        closeIconColor: iconConfig?.closeIconColor || COLORS.white,
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
