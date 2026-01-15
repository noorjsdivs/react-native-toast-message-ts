# React Native Toast Message (TypeScript)

[![npm version](https://img.shields.io/npm/v/react-native-toast-message-ts.svg)](https://www.npmjs.com/package/react-native-toast-message-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.70+-green.svg)](https://reactnative.dev/)
[![Support](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-orange.svg)](https://buymeacoffee.com/reactbd)

A modern, highly customizable toast notification library for React Native with full TypeScript support. Inspired by popular toast libraries like Sonner and react-native-toast-message, this library provides an elegant and flexible way to display notifications in your React Native applications.

## ✨ Features

- 🎨 **Fully Customizable** - Customize colors, positions, icons, durations, and more
- 📱 **Cross-Platform** - Works seamlessly on iOS and Android
- 🎭 **Multiple Variants** - Success, error, warning, info, and custom toasts
- ⚡ **Smooth Animations** - Beautiful slide-in/out animations (300ms) with native driver
- 👆 **Swipeable** - Swipe to dismiss functionality
- ✕ **Close Button** - Built-in close button on every toast
- 📚 **Multi-Toast Queue** - Display multiple toasts simultaneously with stacking
- 🎯 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🪶 **Lightweight** - Zero dependencies, minimal footprint
- 🧪 **Well Tested** - Comprehensive test coverage (58+ tests)
- 📦 **Easy to Use** - Simple API similar to popular web toast libraries
- 🔧 **Highly Configurable** - Global and per-toast configuration options
- 🏗️ **Expo Compatible** - Works with Expo Go and prebuilds out of the box

## 📱 Expo Support

This library is fully compatible with Expo. It uses standard React Native APIs (`Animated`, `PanResponder`) and requires no native code linking. You can use it directly in:

- **Expo Go**
- **Expo Development Builds**
- **Expo Prebuilds**

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
import { SafeAreaView } from 'react-native';
import { ToastContainer } from 'react-native-toast-message-ts';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Your app content */}

      {/* Toast Container should be at the root level */}
      <ToastContainer />
    </SafeAreaView>
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
  visibilityTime: 5000,
  onPress: () => console.log('Toast pressed!'),
});
```

## 📖 API Reference

### ToastContainer Props

| Prop             | Type          | Default     | Description                                               |
| ---------------- | ------------- | ----------- | --------------------------------------------------------- |
| `config`         | `ToastConfig` | `undefined` | Map of toast types to render functions                    |
| `topOffset`      | `number`      | `40`        | Top offset for positioning (when position is 'top')       |
| `bottomOffset`   | `number`      | `40`        | Bottom offset for positioning (when position is 'bottom') |
| `visibilityTime` | `number`      | `3000`      | Default visibility time in milliseconds                   |

### Toast Methods

#### `Toast.show(config: ToastShowParams)`

Show a toast with custom configuration.

```tsx
Toast.show({
  type: 'success',
  text1: 'Success!',
  text2: 'Operation completed',
  position: 'top',
  visibilityTime: 4000,
  onPress: () => console.log('Pressed'),
});
```

#### `Toast.success(text1: string, text2?: string, options?: ToastOptions)`

Show a success toast.

```tsx
Toast.success('Success!', 'Your changes have been saved', {
  visibilityTime: 3000,
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

Hide the oldest visible toast in the queue.

```tsx
Toast.hide();
```

### ToastShowParams / ToastOptions

| Prop             | Type                                                      | Default     | Description                                     |
| ---------------- | --------------------------------------------------------- | ----------- | ----------------------------------------------- |
| `type`           | `'success' \| 'error' \| 'warning' \| 'info' \| 'custom'` | `'success'` | Type of the toast                               |
| `text1`          | `string`                                                  | `undefined` | Main text (title)                               |
| `text2`          | `string`                                                  | `undefined` | Secondary text (subtitle)                       |
| `position`       | `'top' \| 'bottom'`                                       | `'top'`     | Position of the toast                           |
| `visibilityTime` | `number`                                                  | `3000`      | Duration in milliseconds                        |
| `autoHide`       | `boolean`                                                 | `true`      | Whether toast auto-hides (false for persistent) |
| `topOffset`      | `number`                                                  | `40`        | Top offset when position is 'top'               |
| `bottomOffset`   | `number`                                                  | `40`        | Bottom offset when position is 'bottom'         |
| `onPress`        | `() => void`                                              | `undefined` | Callback when toast is pressed                  |
| `onShow`         | `() => void`                                              | `undefined` | Callback when toast is shown                    |
| `onHide`         | `() => void`                                              | `undefined` | Callback when toast is hidden                   |
| `props`          | `Record<string, any>`                                     | `undefined` | Custom props for advanced use cases             |

## 🆕 Multi-Toast Queue

This library supports displaying multiple toasts simultaneously. When you trigger multiple toasts, they stack vertically with a 75px spacing:

```tsx
// Show multiple toasts - they will stack!
Toast.success('First Toast', 'This is the first message');
Toast.info('Second Toast', 'This is the second message');
Toast.warning('Third Toast', 'This is the third message');
```

Each toast has its own close button (✕) and auto-hide timer. Users can dismiss individual toasts by:

- Tapping the close button (✕)
- Swiping up (for top position) or down (for bottom position)
- Waiting for auto-hide (default 3 seconds)

## 🎨 Advanced Customization

### 1. Global Configuration

Define your custom types once in `ToastContainer` and use them everywhere.

```tsx
import { View, Text } from 'react-native';
import { ToastContainer, ToastConfigParams, BaseToast } from 'react-native-toast-message-ts';

// Custom toast component
const CustomToast = ({ text1, text2, hide }: ToastConfigParams) => (
  <View
    style={{
      height: 60,
      width: '90%',
      backgroundColor: 'tomato',
      borderRadius: 10,
      padding: 15,
      justifyContent: 'center',
      alignSelf: 'center',
    }}
  >
    <Text style={{ color: 'white', fontWeight: 'bold' }}>{text1}</Text>
    {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
  </View>
);

const toastConfig = {
  custom: CustomToast,
  // Override default types
  success: (props: ToastConfigParams) => (
    <BaseToast {...props} style={{ borderLeftColor: 'pink' }} onClose={props.hide} />
  ),
};

// In your App
<ToastContainer config={toastConfig} visibilityTime={5000} />;
```

### 2. Usage

```tsx
Toast.show({
  type: 'custom',
  text1: 'Hello World',
  text2: 'Custom toast message',
});
```

## 💡 Examples

### Custom Duration

```tsx
// Quick toast (2 seconds)
Toast.info('Quick Toast', 'This disappears fast', {
  visibilityTime: 2000,
});

// Long toast (10 seconds)
Toast.info('Long Toast', 'This stays longer', {
  visibilityTime: 10000,
});
```

### Persistent Toast (Manual Dismiss)

```tsx
Toast.show({
  type: 'info',
  text1: 'Persistent Toast',
  text2: 'Tap the X button or swipe to dismiss',
  autoHide: false, // Won't auto-hide
});

// Or hide programmatically
Toast.hide();
```

### Bottom Position

```tsx
Toast.success('Bottom Toast', 'Appears at the bottom', {
  position: 'bottom',
});
```

### With Press Handler

```tsx
Toast.success('New Message', 'Tap to view', {
  onPress: () => {
    console.log('Toast pressed!');
    // Navigate to message screen
    navigation.navigate('Messages');
  },
});
```

### With Callbacks

```tsx
Toast.show({
  type: 'success',
  text1: 'Processing',
  text2: 'Your request is being processed',
  onShow: () => console.log('Toast shown'),
  onHide: () => console.log('Toast hidden'),
});
```

## 🎭 Toast Types

The library comes with 5 pre-styled toast types:

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

### Base / Custom

Create your own toast with full customization

```tsx
Toast.show({
  type: 'base',
  text1: 'Base Toast',
  text2: 'Minimal styling',
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
  ToastConfigParams,
  ToastType,
  ToastPosition,
  BaseToast,
  BaseToastProps,
} from 'react-native-toast-message-ts';
```

### Custom Icons Export

You can use the built-in icon components separately:

```tsx
import { SuccessIcon, ErrorIcon, WarningIcon, InfoIcon, ToastIcon } from 'react-native-toast-message-ts';

// Individual icons
<SuccessIcon color="#00ff00" size={30} />
<ErrorIcon color="#ff0000" size={24} />

// Or use ToastIcon with type
<ToastIcon type="success" size={24} />
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

### BaseToast Props

When creating custom toast components, you can use these props:

| Prop                    | Type              | Default | Description             |
| ----------------------- | ----------------- | ------- | ----------------------- |
| `text1`                 | `string`          | -       | Main title text         |
| `text2`                 | `string`          | -       | Subtitle text           |
| `onPress`               | `() => void`      | -       | Press handler           |
| `onClose`               | `() => void`      | -       | Close button handler    |
| `hideCloseButton`       | `boolean`         | `false` | Hide the X close button |
| `style`                 | `ViewStyle`       | -       | Container style         |
| `text1Style`            | `TextStyle`       | -       | Title text style        |
| `text2Style`            | `TextStyle`       | -       | Subtitle text style     |
| `text1NumberOfLines`    | `number`          | `1`     | Max lines for title     |
| `text2NumberOfLines`    | `number`          | `1`     | Max lines for subtitle  |
| `renderLeadingIcon`     | `() => ReactNode` | -       | Custom leading icon     |
| `renderTrailingIcon`    | `() => ReactNode` | -       | Custom trailing icon    |
| `contentContainerStyle` | `ViewStyle`       | -       | Content container style |
| `activeOpacity`         | `number`          | `0.8`   | Touch opacity           |

## 🧪 Testing

The library includes comprehensive tests (58+ test cases). To run tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm test -- --coverage
```

## 📱 Compatibility

- React Native >= 0.70.0
- React >= 18.0.0
- iOS 13.0+
- Android API 23+
- Expo SDK 49+

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

- Open an issue on [GitHub](https://github.com/noorjsdivs/react-native-toast-message-ts/issues)
- Check the [examples](./example) directory for more usage examples

## 🎉 Show Your Support

If this library helped you, please give it a ⭐️ on GitHub!

You can also support the development of this project by buying me a coffee:

<a href="https://buymeacoffee.com/reactbd" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
</a>

---

Made with ❤️ by Noor Mohammad
