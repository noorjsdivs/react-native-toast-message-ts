// Silence warnings
global.__DEV__ = true;

// Mock react-native before anything else
jest.mock('react-native', () => {
  const React = require('react');

  // Create mock components
  const View = React.forwardRef((props, ref) => {
    const { children, testID, ...rest } = props;
    return React.createElement('View', { ...rest, 'data-testid': testID, ref }, children);
  });
  View.displayName = 'View';

  const Text = props => {
    const { children, testID, ...rest } = props;
    return React.createElement('Text', { ...rest, 'data-testid': testID }, children);
  };
  Text.displayName = 'Text';

  const TouchableOpacity = props => {
    const { children, onPress, testID, ...rest } = props;
    return React.createElement(
      'TouchableOpacity',
      { ...rest, onClick: onPress, 'data-testid': testID },
      children,
    );
  };
  TouchableOpacity.displayName = 'TouchableOpacity';

  const Image = props => React.createElement('Image', props);
  Image.displayName = 'Image';

  // Create mock Animated.Value
  const createAnimatedValue = (initialValue = 0) => ({
    _value: initialValue,
    _offset: 0,
    setValue: jest.fn(function (val) {
      this._value = val;
    }),
    setOffset: jest.fn(function (offset) {
      this._offset = offset;
    }),
    flattenOffset: jest.fn(),
    extractOffset: jest.fn(),
    addListener: jest.fn(() => '1'),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    stopAnimation: jest.fn(cb => cb && cb(initialValue)),
    resetAnimation: jest.fn(cb => cb && cb(initialValue)),
    interpolate: jest.fn(() => ({ __getValue: () => initialValue })),
    __getValue: function () {
      return this._value + this._offset;
    },
  });

  const Animated = {
    Value: jest.fn(val => createAnimatedValue(val)),
    timing: jest.fn(() => ({
      start: jest.fn(cb => cb && cb({ finished: true })),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
    spring: jest.fn(() => ({
      start: jest.fn(cb => cb && cb({ finished: true })),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
    parallel: jest.fn(anims => ({
      start: jest.fn(cb => {
        anims.forEach(a => a.start && a.start());
        cb && cb({ finished: true });
      }),
      stop: jest.fn(),
    })),
    sequence: jest.fn(anims => ({
      start: jest.fn(cb => {
        anims.forEach(a => a.start && a.start());
        cb && cb({ finished: true });
      }),
      stop: jest.fn(),
    })),
    View,
    Text,
    Image,
  };

  return {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView: View,
    SafeAreaView: View,
    Platform: {
      OS: 'ios',
      select: jest.fn(obj => obj.ios || obj.default),
    },
    Animated,
    StyleSheet: {
      create: styles => styles,
      flatten: jest.fn(style => {
        if (Array.isArray(style)) {
          return Object.assign({}, ...style.filter(Boolean));
        }
        return style || {};
      }),
      absoluteFillObject: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    useWindowDimensions: jest.fn(() => ({ width: 375, height: 812 })),
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
      addEventListener: jest.fn(() => ({ remove: jest.fn() })),
      removeEventListener: jest.fn(),
    },
    PanResponder: {
      create: jest.fn(() => ({ panHandlers: {} })),
    },
    LayoutAnimation: {
      configureNext: jest.fn(),
      create: jest.fn(),
      Types: { spring: 'spring', linear: 'linear', easeInEaseOut: 'easeInEaseOut' },
      Properties: { opacity: 'opacity', scaleXY: 'scaleXY' },
    },
  };
});

// Also mock @testing-library/react-native to use react testing library instead
jest.mock('@testing-library/react-native', () => {
  const rtl = require('@testing-library/react');
  return {
    ...rtl,
    render: rtl.render,
    fireEvent: {
      ...rtl.fireEvent,
      press: element => rtl.fireEvent.click(element),
    },
    waitFor: rtl.waitFor,
    act: rtl.act,
  };
});
