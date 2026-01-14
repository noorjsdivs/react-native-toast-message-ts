import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BaseToastProps } from '../types';

export const BaseToast: React.FC<BaseToastProps> = ({
  text1,
  text2,
  onPress,
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
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      activeOpacity={onPress ? activeOpacity : 1}
      style={[styles.base, style]}
    >
      {renderLeadingIcon && renderLeadingIcon()}
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: 60,
    width: '90%',
    borderRadius: 6,
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
  },
  text2: {
    fontSize: 12,
    color: '#979797',
  },
});
