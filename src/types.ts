import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'custom';

export type ToastPosition = 'top' | 'bottom';

export interface ToastIconProps {
  type: ToastType;
  color?: string;
}

export interface ToastConfig {
  /**
   * Type of the toast
   */
  type?: ToastType;
  /**
   * Toast title/main text
   */
  text1?: string;
  /**
   * Toast subtitle/secondary text
   */
  text2?: string;
  /**
   * Position of the toast
   */
  position?: ToastPosition;
  /**
   * Duration in milliseconds (0 for persistent)
   */
  duration?: number;
  /**
   * Show or hide the toast
   */
  isVisible?: boolean;
  /**
   * Callback when toast is pressed
   */
  onPress?: () => void;
  /**
   * Callback when toast is hidden
   */
  onHide?: () => void;
  /**
   * Callback when toast is shown
   */
  onShow?: () => void;
  /**
   * Custom icon component
   */
  icon?: ReactNode;
  /**
   * Custom styles
   */
  style?: ViewStyle;
  text1Style?: TextStyle;
  text2Style?: TextStyle;
  /**
   * Custom colors
   */
  backgroundColor?: string;
  borderLeftColor?: string;
  /**
   * Animation configurations
   */
  animationDuration?: number;
  /**
   * Swipe to dismiss
   */
  swipeable?: boolean;
  /**
   * Custom props for advanced use cases
   */
  props?: Record<string, any>;
}

export interface ToastOptions extends Omit<ToastConfig, 'type'> {
  type?: ToastType;
}

export interface ToastShowParams {
  type?: ToastType;
  text1?: string;
  text2?: string;
  position?: ToastPosition;
  duration?: number;
  onPress?: () => void;
  onHide?: () => void;
  onShow?: () => void;
  icon?: ReactNode;
  style?: ViewStyle;
  text1Style?: TextStyle;
  text2Style?: TextStyle;
  backgroundColor?: string;
  borderLeftColor?: string;
  animationDuration?: number;
  swipeable?: boolean;
  props?: Record<string, any>;
}

export interface ToastMethods {
  /**
   * Show a toast with custom configuration
   */
  show: (config: ToastShowParams) => void;
  /**
   * Show a success toast
   */
  success: (text1: string, text2?: string, options?: ToastOptions) => void;
  /**
   * Show an error toast
   */
  error: (text1: string, text2?: string, options?: ToastOptions) => void;
  /**
   * Show a warning toast
   */
  warning: (text1: string, text2?: string, options?: ToastOptions) => void;
  /**
   * Show an info toast
   */
  info: (text1: string, text2?: string, options?: ToastOptions) => void;
  /**
   * Hide the currently visible toast
   */
  hide: () => void;
}

export interface ToastContainerProps {
  /**
   * Default configuration for all toasts
   */
  config?: Partial<ToastConfig>;
  /**
   * Top offset for positioning
   */
  topOffset?: number;
  /**
   * Bottom offset for positioning
   */
  bottomOffset?: number;
  /**
   * Custom render function for toast types
   */
  renderToast?: (config: ToastConfig) => ReactNode;
}

export const DEFAULT_DURATION = 4000;
export const DEFAULT_ANIMATION_DURATION = 300;
export const DEFAULT_POSITION: ToastPosition = 'top';
export const DEFAULT_TOP_OFFSET = 40;
export const DEFAULT_BOTTOM_OFFSET = 40;
