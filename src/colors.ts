import { ToastType } from './types';

export const COLORS = {
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  white: '#FFFFFF',
  black: '#000000',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  shadow: '#00000029',
};

export const getDefaultBackgroundColor = (_type: ToastType): string => {
  return COLORS.white;
};

export const getDefaultBorderColor = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return COLORS.success;
    case 'error':
      return COLORS.error;
    case 'warning':
      return COLORS.warning;
    case 'info':
      return COLORS.info;
    default:
      return COLORS.border;
  }
};

export const getDefaultIconColor = (type: ToastType): string => {
  return getDefaultBorderColor(type);
};
