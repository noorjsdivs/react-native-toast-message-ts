// Silence warnings
global.__DEV__ = true;

// Mock React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  // Mock Animated values
  RN.Animated.Value = jest.fn(() => ({
    setValue: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    interpolate: jest.fn(() => ({
      setValue: jest.fn(),
    })),
  }));

  RN.Animated.timing = jest.fn(() => ({
    start: jest.fn(callback => callback && callback()),
  }));

  RN.Animated.spring = jest.fn(() => ({
    start: jest.fn(callback => callback && callback()),
  }));

  RN.Animated.View = 'Animated.View';
  RN.Animated.Text = 'Animated.Text';

  // Mock PanResponder
  RN.PanResponder.create = jest.fn(() => ({
    panHandlers: {},
  }));

  return RN;
});
