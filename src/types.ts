import { ReactNode } from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | string;

export type ToastPosition = 'top' | 'bottom';

export interface BaseToastProps {
  text1?: string;
  text2?: string;
  onPress?: () => void;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  text1Style?: StyleProp<TextStyle>;
  text2Style?: StyleProp<TextStyle>;
  text1NumberOfLines?: number;
  text2NumberOfLines?: number;
  renderLeadingIcon?: () => ReactNode;
  renderTrailingIcon?: () => ReactNode;
  testID?: string;
  accessibilityLabel?: string;
}

export interface ToastProps extends BaseToastProps {
  type?: ToastType;
  props?: Record<string, any>;
}

export interface ToastConfigParams<Props = any> {
  position: ToastPosition;
  type: ToastType;
  isVisible: boolean;
  text1?: string;
  text2?: string;
  show: (params: ToastShowParams) => void;
  hide: () => void;
  onPress?: () => void;
  props: Props;
}

export type ToastConfig = {
  [key in ToastType]: (params: ToastConfigParams) => ReactNode;
};

export interface ToastShowParams {
  type?: ToastType;
  text1?: string;
  text2?: string;
  position?: ToastPosition;
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  props?: Record<string, any>;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
}

export interface ToastData extends ToastShowParams {
  isVisible: boolean;
}

export interface ToastHideParams {
  onAnimationEnd?: () => void;
}

export interface ToastRef {
  show: (params: ToastShowParams) => void;
  hide: (params?: ToastHideParams) => void;
}
