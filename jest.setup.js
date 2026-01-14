// Silence warnings
global.__DEV__ = true;

// Mock React Native
// Patch internal AnimatedValue used by TouchableOpacity and other components
try {
  // Use generic require to handle default/named exports
  const AnimatedValue = require('react-native/Libraries/Animated/nodes/AnimatedValue');
  const Value = AnimatedValue.default || AnimatedValue;
  if (Value && !Value.prototype.resetAnimation) {
    Value.prototype.resetAnimation = function() {};
  }
} catch (e) {
  // Ignore error if path is wrong, but log it for debugging
  console.log('Failed to patch AnimatedValue:', e.message);
}
