# React Native Toast Message (TypeScript)

[![npm version](https://img.shields.io/npm/v/react-native-toast-message-ts.svg)](https://www.npmjs.com/package/react-native-toast-message-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.70+-green.svg)](https://reactnative.dev/)
[![Support](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-orange.svg)](https://buymeacoffee.com/reactbd)

A modern, highly customizable toast notification library for React Native with full TypeScript support. Features **drawer-style stacking** for multiple toasts, beautiful colored backgrounds, smooth animations, and flexible icon configuration. Works flawlessly on both iOS and Android.

## ✨ Features

- 🎨 **Colorful Design** - Each toast type has its own background color (green for success, red for error, etc.) with white text
- 📚 **Drawer-Style Stacking** - Multiple toasts stack with the newest in front, older ones scaled behind with smooth animations
- 🎭 **Icon Configuration** - Show/hide leading icons and close buttons per toast
- ⚡ **Smooth Animations** - Beautiful slide-in/out with scale and opacity transitions using native driver
- 📱 **Cross-Platform** - Works flawlessly on iOS and Android
- 👆 **Swipeable** - Swipe to dismiss the front toast
- ✕ **Close Button** - Built-in close button on every toast (can be hidden)
- 🎯 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🪶 **Lightweight** - Zero dependencies, minimal footprint
- 🧪 **Well Tested** - Comprehensive test coverage
- 📦 **Easy to Use** - Simple API similar to popular web toast libraries
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

// Success toast (green background with white text)
Toast.success('Success!', 'Your changes have been saved');

// Error toast (red background with white text)
Toast.error('Error!', 'Something went wrong');

// Warning toast (yellow background with dark text)
Toast.warning('Warning!', 'Please review your input');

// Info toast (blue background with white text)
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

## 🆕 Drawer-Style Multi-Toast Stacking

This library features a beautiful drawer-style stacking animation for multiple toasts:

- **Newest toast appears in front** with full size and opacity
- **Older toasts stack behind** with reduced scale and opacity
- **Smooth animations** when toasts are added or removed
- **Up to 5 visible toasts** in the stack

```tsx
// Show multiple toasts - they will stack with drawer effect!
Toast.success('First Toast', 'This will move to the back');
Toast.info('Second Toast', 'This appears in front of the first');
Toast.warning('Third Toast', 'This is now the front toast');

// Each new toast pushes previous ones back with a smooth animation
```

### How it works:

- New toasts slide in and appear at the front
- Previous toasts animate to the back with reduced scale (95%, 90%, etc.)
- Each stacked toast has slightly reduced opacity
- Only the front toast can be swiped to dismiss
- When the front toast is dismissed, the next one animates forward

## 🎭 Icon Configuration

Control the visibility of icons on a per-toast basis:

### Hide All Icons

```tsx
Toast.success('Success!', 'No icons on this toast', {
  iconConfig: {
    hideLeadingIcon: true, // Hide the checkmark/status icon
    hideCloseIcon: true, // Hide the X close button
  },
});
```

### Hide Only Leading Icon (Keep Close Button)

```tsx
Toast.error('Error!', 'No status icon, but has close button', {
  iconConfig: {
    hideLeadingIcon: true,
  },
});
```

### Hide Only Close Button (Keep Leading Icon)

```tsx
Toast.info('Info', 'Has icon but no close button', {
  iconConfig: {
    hideCloseIcon: true,
  },
});
```

### Custom Icon Colors and Size

```tsx
Toast.success('Custom Icons', 'Personalized icon appearance', {
  iconConfig: {
    leadingIconSize: 28, // Larger icon
    leadingIconColor: '#FFD700', // Gold color
    closeIconColor: '#FFD700', // Matching close icon
  },
});
```

## 📖 API Reference

### ToastContainer Props

| Prop               | Type          | Default | Description                                               |
| ------------------ | ------------- | ------- | --------------------------------------------------------- |
| `config`           | `ToastConfig` | -       | Map of toast types to render functions                    |
| `topOffset`        | `number`      | `40`    | Top offset for positioning (when position is 'top')       |
| `bottomOffset`     | `number`      | `40`    | Bottom offset for positioning (when position is 'bottom') |
| `visibilityTime`   | `number`      | `3000`  | Default visibility time in milliseconds                   |
| `maxVisibleToasts` | `number`      | `5`     | Maximum number of toasts visible in stack                 |

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
  iconConfig: {
    hideLeadingIcon: false,
    hideCloseIcon: false,
  },
  onPress: () => console.log('Pressed'),
});
```

#### `Toast.success(text1: string, text2?: string, options?: ToastOptions)`

Show a success toast with green background.

```tsx
Toast.success('Success!', 'Your changes have been saved', {
  visibilityTime: 3000,
  position: 'bottom',
  iconConfig: { hideCloseIcon: true },
});
```

#### `Toast.error(text1: string, text2?: string, options?: ToastOptions)`

Show an error toast with red background.

```tsx
Toast.error('Error!', 'Failed to save changes');
```

#### `Toast.warning(text1: string, text2?: string, options?: ToastOptions)`

Show a warning toast with yellow background.

```tsx
Toast.warning('Warning!', 'Please check your input');
```

#### `Toast.info(text1: string, text2?: string, options?: ToastOptions)`

Show an info toast with blue background.

```tsx
Toast.info('Info', 'New features available');
```

#### `Toast.hide()`

Hide the front (newest) toast in the stack.

```tsx
Toast.hide();
```

### ToastShowParams / ToastOptions

| Prop             | Type                                                      | Default     | Description                                     |
| ---------------- | --------------------------------------------------------- | ----------- | ----------------------------------------------- |
| `type`           | `'success' \| 'error' \| 'warning' \| 'info' \| 'custom'` | `'success'` | Type of the toast                               |
| `text1`          | `string`                                                  | -           | Main text (title)                               |
| `text2`          | `string`                                                  | -           | Secondary text (subtitle)                       |
| `position`       | `'top' \| 'bottom'`                                       | `'top'`     | Position of the toast                           |
| `visibilityTime` | `number`                                                  | `3000`      | Duration in milliseconds                        |
| `autoHide`       | `boolean`                                                 | `true`      | Whether toast auto-hides (false for persistent) |
| `topOffset`      | `number`                                                  | `40`        | Top offset when position is 'top'               |
| `bottomOffset`   | `number`                                                  | `40`        | Bottom offset when position is 'bottom'         |
| `iconConfig`     | `ToastIconConfig`                                         | -           | Icon visibility and styling options             |
| `onPress`        | `() => void`                                              | -           | Callback when toast is pressed                  |
| `onShow`         | `() => void`                                              | -           | Callback when toast is shown                    |
| `onHide`         | `() => void`                                              | -           | Callback when toast is hidden                   |
| `props`          | `Record<string, any>`                                     | -           | Custom props for advanced use cases             |

### ToastIconConfig

| Prop               | Type      | Default | Description                       |
| ------------------ | --------- | ------- | --------------------------------- |
| `hideLeadingIcon`  | `boolean` | `false` | Hide the status icon (✓, ✕, etc.) |
| `hideCloseIcon`    | `boolean` | `false` | Hide the close (X) button         |
| `leadingIconSize`  | `number`  | `24`    | Size of the leading icon          |
| `leadingIconColor` | `string`  | -       | Custom color for leading icon     |
| `closeIconColor`   | `string`  | -       | Custom color for close icon       |

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
  // Override default success with custom styling
  success: (props: ToastConfigParams) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#00C851' }}
      text1Style={{ color: '#fff' }}
      text2Style={{ color: '#fff' }}
      onClose={props.hide}
    />
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

### Icon-Only Toast (No Close Button)

```tsx
Toast.success('Clean Design', 'Just the icon and text', {
  iconConfig: {
    hideCloseIcon: true,
  },
});
```

### Text-Only Toast (No Icons)

```tsx
Toast.info('Minimal', 'Just text, no distractions', {
  iconConfig: {
    hideLeadingIcon: true,
    hideCloseIcon: true,
  },
});
```

### Multiple Toasts with Different Configurations

```tsx
// Show a series of toasts with drawer stacking
Toast.success('Step 1 Complete', 'First task done');

setTimeout(() => {
  Toast.info('Step 2 In Progress', 'Processing...');
}, 500);

setTimeout(() => {
  Toast.warning('Almost Done', 'One more step');
}, 1000);

setTimeout(() => {
  Toast.success('All Done!', 'Everything completed successfully');
}, 1500);
```

## 🎭 Toast Types

The library comes with 4 beautifully styled toast types, each with its own colored background:

### Success (Green Background)

```tsx
// ✓ icon + text + ✕ close button
Toast.success('Success!', 'Operation completed successfully');

// Without close button
Toast.success('Saved!', 'Changes saved', {
  iconConfig: { hideCloseIcon: true },
});

// Without any icons
Toast.success('Done', 'Simple message', {
  iconConfig: { hideLeadingIcon: true, hideCloseIcon: true },
});
```

### Error (Red Background)

```tsx
// ✕ icon + text + ✕ close button
Toast.error('Error!', 'Something went wrong');

// Custom icon size
Toast.error('Critical Error', 'Please try again', {
  iconConfig: { leadingIconSize: 32 },
});
```

### Warning (Yellow Background)

```tsx
// ⚠ icon + text + ✕ close button (with dark text for contrast)
Toast.warning('Warning!', 'Please review your input');
```

### Info (Blue Background)

```tsx
// ℹ icon + text + ✕ close button
Toast.info('Info', 'Here is some helpful information');
```

### Base / Custom

Create your own toast with full customization:

```tsx
Toast.show({
  type: 'base',
  text1: 'Base Toast',
  text2: 'Minimal styling with white background',
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
  ToastIconConfig,
  BaseToast,
  BaseToastProps,
  SuccessToast,
  ErrorToast,
  InfoToast,
  WarningToast,
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

Access the color constants and helper functions:

```tsx
import {
  COLORS,
  getDefaultBackgroundColor,
  getDefaultTextColor,
  getDefaultBorderColor,
  getDefaultIconColor,
} from 'react-native-toast-message-ts';

console.log(COLORS.success); // '#28a745' (green)
console.log(COLORS.error); // '#dc3545' (red)
console.log(COLORS.warning); // '#ffc107' (yellow)
console.log(COLORS.info); // '#17a2b8' (blue)
console.log(COLORS.white); // '#FFFFFF'
console.log(COLORS.warningText); // '#664d03' (dark text for yellow bg)

// Get background color for a toast type
getDefaultBackgroundColor('success'); // '#28a745'
getDefaultTextColor('warning'); // '#664d03'
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
| `backgroundColor`       | `string`          | -       | Background color        |
| `text1Style`            | `TextStyle`       | -       | Title text style        |
| `text2Style`            | `TextStyle`       | -       | Subtitle text style     |
| `text1NumberOfLines`    | `number`          | `1`     | Max lines for title     |
| `text2NumberOfLines`    | `number`          | `1`     | Max lines for subtitle  |
| `renderLeadingIcon`     | `() => ReactNode` | -       | Custom leading icon     |
| `renderTrailingIcon`    | `() => ReactNode` | -       | Custom trailing icon    |
| `contentContainerStyle` | `ViewStyle`       | -       | Content container style |
| `activeOpacity`         | `number`          | `0.8`   | Touch opacity           |
| `iconConfig`            | `ToastIconConfig` | -       | Icon visibility options |

## 🎬 Animation Details

The drawer-style stacking animation includes:

- **Slide Animation**: 300ms slide-in from top/bottom
- **Scale Animation**: Each stacked toast is scaled down by 5% (95%, 90%, 85%...)
- **Opacity Animation**: Stacked toasts have reduced opacity (85%, 70%, 55%...)
- **Stack Offset**: 12px vertical offset between stacked toasts
- **Native Driver**: All animations use native driver for 60fps performance
- **Cross-Platform**: Works identically on iOS and Android

## 🧪 Testing

The library includes comprehensive tests. To run tests:

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
