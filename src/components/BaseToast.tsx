import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BaseToastProps, ToastIconConfig } from '../types';

interface ExtendedBaseToastProps extends BaseToastProps {
  onClose?: () => void;
  hideCloseButton?: boolean;
  /** Icon configuration options */
  iconConfig?: ToastIconConfig;
}

export const BaseToast: React.FC<ExtendedBaseToastProps> = ({
  text1,
  text2,
  onPress,
  onClose,
  hideCloseButton = false,
  activeOpacity = 0.8,
  style,
  contentContainerStyle,
  text1Style,
  text2Style,
  text1NumberOfLines = 1,
  text2NumberOfLines = 1,
  renderLeadingIcon,
  renderTrailingIcon,
  testID,
  accessibilityLabel,
  iconConfig,
  backgroundColor,
}) => {
  const hideLeadingIcon = iconConfig?.hideLeadingIcon ?? false;
  const hideCloseIcon = iconConfig?.hideCloseIcon ?? hideCloseButton;
  const closeIconColor = iconConfig?.closeIconColor;

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      activeOpacity={onPress ? activeOpacity : 1}
      style={[styles.base, backgroundColor ? { backgroundColor } : undefined, style]}
    >
      {!hideLeadingIcon && renderLeadingIcon && (
        <View style={styles.iconWrapper}>{renderLeadingIcon()}</View>
      )}
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {text1 && (
          <Text style={[styles.text1, text1Style]} numberOfLines={text1NumberOfLines}>
            {text1}
          </Text>
        )}
        {text2 && (
          <Text style={[styles.text2, text2Style]} numberOfLines={text2NumberOfLines}>
            {text2}
          </Text>
        )}
      </View>
      {renderTrailingIcon && renderTrailingIcon()}
      {!hideCloseIcon && (
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          testID="toast-close-button"
        >
          <Text style={[styles.closeIcon, closeIconColor ? { color: closeIconColor } : undefined]}>
            ✕
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  text1: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    color: '#1C1C1E',
  },
  text2: {
    fontSize: 12,
    color: '#8E8E93',
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  closeIcon: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
  },
});
