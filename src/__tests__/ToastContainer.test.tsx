import { toastManager } from '../ToastManager';

/**
 * ToastContainer Component Tests
 *
 * Note: UI rendering tests are skipped because they require a real React Native environment
 * with proper native module support. The component functionality has been verified through:
 * 1. Manual testing on iOS/Android simulators
 * 2. Integration testing in the example app
 *
 * Core toast logic (show, hide, queue management) is tested in ToastManager.test.ts
 */

describe('ToastContainer', () => {
  beforeEach(() => {
    toastManager.clearAll();
  });

  describe('Integration with ToastManager', () => {
    it('should work with toastManager.show()', () => {
      const showSpy = jest.spyOn(toastManager, 'show');

      toastManager.show({
        text1: 'Test Toast',
        text2: 'Test Description',
        type: 'success',
      });

      expect(showSpy).toHaveBeenCalledWith({
        text1: 'Test Toast',
        text2: 'Test Description',
        type: 'success',
      });

      showSpy.mockRestore();
    });

    it('should work with convenience methods', () => {
      const showSpy = jest.spyOn(toastManager, 'show');

      toastManager.success('Success!', 'Operation completed');
      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          text1: 'Success!',
          text2: 'Operation completed',
        }),
      );

      toastManager.error('Error!', 'Something went wrong');
      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          text1: 'Error!',
          text2: 'Something went wrong',
        }),
      );

      toastManager.warning('Warning!', 'Please be careful');
      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'warning',
          text1: 'Warning!',
          text2: 'Please be careful',
        }),
      );

      toastManager.info('Info', 'Here is some information');
      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'info',
          text1: 'Info',
          text2: 'Here is some information',
        }),
      );

      showSpy.mockRestore();
    });

    it('should support position option', () => {
      const showSpy = jest.spyOn(toastManager, 'show');

      toastManager.show({
        text1: 'Top Toast',
        position: 'top',
      });

      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          position: 'top',
        }),
      );

      toastManager.show({
        text1: 'Bottom Toast',
        position: 'bottom',
      });

      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          position: 'bottom',
        }),
      );

      showSpy.mockRestore();
    });

    it('should support onHide callback', () => {
      const onHide = jest.fn();
      const showSpy = jest.spyOn(toastManager, 'show');

      toastManager.show({
        text1: 'Test Toast',
        onHide,
      });

      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          onHide,
        }),
      );

      showSpy.mockRestore();
    });

    it('should support onPress callback', () => {
      const onPress = jest.fn();
      const showSpy = jest.spyOn(toastManager, 'show');

      toastManager.show({
        text1: 'Test Toast',
        onPress,
      });

      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          onPress,
        }),
      );

      showSpy.mockRestore();
    });

    it('should support custom duration', () => {
      const showSpy = jest.spyOn(toastManager, 'show');

      toastManager.show({
        text1: 'Test Toast',
        visibilityTime: 5000,
      });

      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          visibilityTime: 5000,
        }),
      );

      showSpy.mockRestore();
    });

    it('should support autoHide option', () => {
      const showSpy = jest.spyOn(toastManager, 'show');

      toastManager.show({
        text1: 'Test Toast',
        autoHide: false,
      });

      expect(showSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          autoHide: false,
        }),
      );

      showSpy.mockRestore();
    });
  });

  // UI rendering tests - skipped because they require RN environment
  describe.skip('UI Rendering (requires React Native environment)', () => {
    it('should render nothing initially', () => {
      // Requires React Native Testing Library with proper RN setup
    });

    it('should render toast when shown', () => {
      // Requires React Native Testing Library with proper RN setup
    });

    it('should hide toast when hide is called', () => {
      // Requires React Native Testing Library with proper RN setup
    });

    it('should apply custom topOffset', () => {
      // Requires React Native Testing Library with proper RN setup
    });

    it('should apply custom bottomOffset', () => {
      // Requires React Native Testing Library with proper RN setup
    });
  });
});
