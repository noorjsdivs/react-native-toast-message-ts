import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from './BaseToast';
import { BaseToastProps, ToastIconConfig } from '../types';
import { COLORS } from '../colors';
import { ToastIcon } from '../ToastIcon';

interface InfoToastProps extends BaseToastProps {
  hide?: () => void;
  iconConfig?: ToastIconConfig;
}

export const InfoToast: React.FC<InfoToastProps> = props => {
  const { iconConfig } = props;

  return (
    <BaseToast
      {...props}
      style={[styles.info, props.style]}
      text1Style={[styles.text1, props.text1Style]}
      text2Style={[styles.text2, props.text2Style]}
      renderLeadingIcon={
        iconConfig?.hideLeadingIcon
          ? undefined
          : () => (
              <ToastIcon
                type="info"
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
  info: {
    backgroundColor: COLORS.info,
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
