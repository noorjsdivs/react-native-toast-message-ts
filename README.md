# React Native Toast Message (TypeScript)

[![npm version](https://img.shields.io/npm/v/react-native-toast-message-ts.svg)](https://www.npmjs.com/package/react-native-toast-message-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.83-green.svg)](https://reactnative.dev/)

A modern, highly customizable toast notification library for React Native with full TypeScript support. Inspired by popular toast libraries like Sonner and react-native-toast-message, this library provides an elegant and flexible way to display notifications in your React Native applications.

## ✨ Features

- 🎨 **Fully Customizable** - Customize colors, positions, icons, durations, and more
- 📱 **Cross-Platform** - Works seamlessly on iOS and Android
- 🎭 **Multiple Variants** - Success, error, warning, info, and custom toasts
- ⚡ **Smooth Animations** - Beautiful slide-in/out animations with native driver
- 👆 **Swipeable** - Swipe to dismiss functionality
- 🎯 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🪶 **Lightweight** - Zero dependencies, minimal footprint
- 🧪 **Well Tested** - Comprehensive test coverage
- 📦 **Easy to Use** - Simple API similar to popular web toast libraries
- 🔧 **Highly Configurable** - Global and per-toast configuration options
- 🆕 **Latest React Native** - Compatible with React 19.2 and React Native 0.83

## 📋 Requirements

- React Native >= 0.70.0
- React >= 18.0.0
- TypeScript >= 5.0.0 (optional, but recommended)

## 📦 Installation

```bash
npm install react-native-toast-message-ts
```

or with yarn:

```bash
yarn add react-native-toast-message-ts
```

or with pnpm (recommended):

```bash
pnpm add react-native-toast-message-ts
```

## 🚀 Quick Start

### 1. Add ToastContainer to your App

```tsx
import React from 'react';
import { View } from 'react-native';
import { ToastContainer } from 'react-native-toast-message-ts';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* Your app content */}

      {/* Toast Container should be at the root level */}
      <ToastContainer />
    </View>
  );
}
```

### 2. Show Toasts Anywhere

```tsx
import { Toast } from 'react-native-toast-message-ts';

// Success toast
Toast.success('Success!', 'Your changes have been saved');

// Error toast
Toast.error('Error!', 'Something went wrong');

// Warning toast
Toast.warning('Warning!', 'Please review your input');

// Info toast
Toast.info('Info', 'Did you know?');

// Custom toast with full configuration
Toast.show({
  type: 'success',
  text1: 'Custom Toast',
  text2: 'This is a custom configured toast',
  position: 'bottom',
  duration: 5000,
  onPress: () => console.log('Toast pressed!'),
});
```

## 📖 API Reference

### ToastContainer Props

| Prop           | Type                                 | Default     | Description                                               |
| -------------- | ------------------------------------ | ----------- | --------------------------------------------------------- |
| `config`       | `Partial<ToastConfig>`               | `undefined` | Default configuration for all toasts                      |
| `topOffset`    | `number`                             | `40`        | Top offset for positioning (when position is 'top')       |
| `bottomOffset` | `number`                             | `40`        | Bottom offset for positioning (when position is 'bottom') |
| `renderToast`  | `(config: ToastConfig) => ReactNode` | `undefined` | Custom render function for toasts                         |

### Toast Methods

#### `Toast.show(config: ToastShowParams)`

Show a toast with custom configuration.

```tsx
Toast.show({
  type: 'success',
  text1: 'Success!',
  text2: 'Operation completed',
  position: 'top',
  duration: 4000,
  backgroundColor: '#00ff00',
  onPress: () => console.log('Pressed'),
});
```

#### `Toast.success(text1: string, text2?: string, options?: ToastOptions)`

Show a success toast.

```tsx
Toast.success('Success!', 'Your changes have been saved', {
  duration: 3000,
  position: 'bottom',
});
```

#### `Toast.error(text1: string, text2?: string, options?: ToastOptions)`

Show an error toast.

```tsx
Toast.error('Error!', 'Failed to save changes');
```

#### `Toast.warning(text1: string, text2?: string, options?: ToastOptions)`

Show a warning toast.

```tsx
Toast.warning('Warning!', 'Please check your input');
```

#### `Toast.info(text1: string, text2?: string, options?: ToastOptions)`

Show an info toast.

```tsx
Toast.info('Info', 'New features available');
```

#### `Toast.hide()`

Hide the currently visible toast.

```tsx
Toast.hide();
```

### ToastShowParams / ToastOptions

| Prop                | Type                                                      | Default     | Description                                 |
| ------------------- | --------------------------------------------------------- | ----------- | ------------------------------------------- |
| `type`              | `'success' \| 'error' \| 'warning' \| 'info' \| 'custom'` | `'info'`    | Type of the toast                           |
| `text1`             | `string`                                                  | `undefined` | Main text (title)                           |
| `text2`             | `string`                                                  | `undefined` | Secondary text (subtitle)                   |
| `position`          | `'top' \| 'bottom'`                                       | `'top'`     | Position of the toast                       |
| `duration`          | `number`                                                  | `4000`      | Duration in milliseconds (0 for persistent) |
| `onPress`           | `() => void`                                              | `undefined` | Callback when toast is pressed              |
| `onShow`            | `() => void`                                              | `undefined` | Callback when toast is shown                |
| `onHide`            | `() => void`                                              | `undefined` | Callback when toast is hidden               |
| `icon`              | `ReactNode`                                               | `undefined` | Custom icon component                       |
| `style`             | `ViewStyle`                                               | `undefined` | Custom container style                      |
| `text1Style`        | `TextStyle`                                               | `undefined` | Custom style for text1                      |
| `text2Style`        | `TextStyle`                                               | `undefined` | Custom style for text2                      |
| `backgroundColor`   | `string`                                                  | `'#FFFFFF'` | Background color                            |
| `borderLeftColor`   | `string`                                                  | Type-based  | Border left color                           |
| `animationDuration` | `number`                                                  | `300`       | Animation duration in milliseconds          |
| `swipeable`         | `boolean`                                                 | `true`      | Enable swipe to dismiss                     |
| `props`             | `Record<string, any>`                                     | `undefined` | Custom props for advanced use cases         |

## 🎨 Customization Examples

### Custom Colors

```tsx
Toast.success('Success!', 'Custom colors', {
  backgroundColor: '#1a1a1a',
  borderLeftColor: '#00ff00',
  text1Style: { color: '#ffffff' },
  text2Style: { color: '#cccccc' },
});
```

### Custom Icons

```tsx
import { Image } from 'react-native';

Toast.show({
  type: 'custom',
  text1: 'Custom Icon',
  icon: <Image source={require('./icon.png')} style={{ width: 24, height: 24 }} />,
});
```

### Bottom Position with Long Duration

```tsx
Toast.info('Info', 'This toast stays longer', {
  position: 'bottom',
  duration: 10000, // 10 seconds
});
```

### Persistent Toast (Manual Dismiss)

```tsx
Toast.show({
  text1: 'Persistent Toast',
  text2: 'This will not auto-hide',
  duration: 0, // 0 means it won't auto-hide
});

// Hide it manually when needed
Toast.hide();
```

### With Press Handler

```tsx
Toast.success('New Message', 'Tap to view', {
  onPress: () => {
    console.log('Toast pressed!');
    // Navigate to message screen
  },
});
```

### Global Configuration

Set default options for all toasts:

```tsx
<ToastContainer
  config={{
    position: 'bottom',
    duration: 5000,
    animationDuration: 500,
  }}
  topOffset={60}
  bottomOffset={60}
/>
```

### Custom Toast Renderer

For complete control over toast appearance:

```tsx
import { View, Text } from 'react-native';
import { ToastContainer, ToastConfig } from 'react-native-toast-message-ts';

const renderCustomToast = (config: ToastConfig) => (
  <View
    style={{
      backgroundColor: '#000',
      padding: 20,
      borderRadius: 10,
      margin: 20,
    }}
  >
    <Text style={{ color: '#fff', fontSize: 18 }}>{config.text1}</Text>
    {config.text2 && <Text style={{ color: '#ccc', fontSize: 14 }}>{config.text2}</Text>}
  </View>
);

<ToastContainer renderToast={renderCustomToast} />;
```

## 🎭 Toast Types

The library comes with 4 pre-styled toast types:

### Success

Green border with checkmark icon - perfect for successful operations

```tsx
Toast.success('Success!', 'Operation completed successfully');
```

### Error

Red border with X icon - ideal for error messages

```tsx
Toast.error('Error!', 'Something went wrong');
```

### Warning

Yellow/orange border with warning icon - for warnings and cautions

```tsx
Toast.warning('Warning!', 'Please review your input');
```

### Info

Blue border with info icon - for informational messages

```tsx
Toast.info('Info', 'Here is some helpful information');
```

### Custom

Create your own toast with full customization

```tsx
Toast.show({
  type: 'custom',
  text1: 'Custom Toast',
  // Full customization options
});
```

## 🔧 Advanced Usage

### TypeScript Support

The library is written in TypeScript and provides comprehensive type definitions:

```tsx
import {
  Toast,
  ToastContainer,
  ToastConfig,
  ToastShowParams,
  ToastOptions,
  ToastType,
  ToastPosition,
} from 'react-native-toast-message-ts';
```

### Custom Icons Export

You can use the built-in icon components separately:

```tsx
import { SuccessIcon, ErrorIcon, WarningIcon, InfoIcon } from 'react-native-toast-message-ts';

<SuccessIcon color="#00ff00" size={30} />;
```

### Colors Export

Access the color constants:

```tsx
import { COLORS } from 'react-native-toast-message-ts';

console.log(COLORS.success); // '#28a745'
console.log(COLORS.error); // '#dc3545'
console.log(COLORS.warning); // '#ffc107'
console.log(COLORS.info); // '#17a2b8'
```

## 🧪 Testing

The library includes comprehensive tests. To run tests:

```bash
npm test
```

To run tests with coverage:

```bash70.0
- React >= 18.0.0
- iOS 13.0+
- Android API 23+
- Node >= 18.0.0
- pnpm >= 9.0.0 (recommended)
## 📱 Compatibility

- React Native >= 0.64.0
- React >= 16.8.0
- iOS 11.0+
- Android API 21+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by:
- [react-native-toast-message](https://www.npmjs.com/package/react-native-toast-message)
- [Sonner](https://sonner.emilkowal.ski/) - for web

## 📞 Support

If you have any questions or need help, please:
- Open an issue on [GitHub](https://github.com/noor-mohammad/react-native-toast-message-ts/issues)
- Check the [examples](./example) directory for more usage examples

## 🎉 Show Your Support

If this library helped you, please give it a ⭐️ on GitHub!

---

Made with ❤️ by Noor Mohammad
```
