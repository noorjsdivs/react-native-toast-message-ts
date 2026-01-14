import { toastManager } from '../ToastManager';
import { ToastConfig } from '../types';

describe('ToastManager', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('subscribe', () => {
    it('should subscribe to toast show events', () => {
      const listener = jest.fn();
      const unsubscribe = toastManager.subscribe(listener);

      toastManager.show({ text1: 'Test Toast' });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: 'Test Toast',
          isVisible: true,
        }),
      );

      unsubscribe();
    });

    it('should unsubscribe from toast show events', () => {
      const listener = jest.fn();
      const unsubscribe = toastManager.subscribe(listener);

      unsubscribe();
      toastManager.show({ text1: 'Test Toast' });

      expect(listener).not.toHaveBeenCalled();
    });

    it('should support multiple subscribers', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      toastManager.subscribe(listener1);
      toastManager.subscribe(listener2);

      toastManager.show({ text1: 'Test Toast' });

      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });
  });

  describe('subscribeToHide', () => {
    it('should subscribe to toast hide events', () => {
      const listener = jest.fn();
      const unsubscribe = toastManager.subscribeToHide(listener);

      toastManager.hide();

      expect(listener).toHaveBeenCalled();

      unsubscribe();
    });

    it('should unsubscribe from toast hide events', () => {
      const listener = jest.fn();
      const unsubscribe = toastManager.subscribeToHide(listener);

      unsubscribe();
      toastManager.hide();

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should show a toast with default type', () => {
      const listener = jest.fn();
      toastManager.subscribe(listener);

      toastManager.show({ text1: 'Test Toast' });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: 'Test Toast',
          isVisible: true,
        }),
      );
    });

    it('should show a toast with custom configuration', () => {
      const listener = jest.fn();
      toastManager.subscribe(listener);

      const config: ToastConfig = {
        type: 'success',
        text1: 'Success!',
        text2: 'Operation completed',
        position: 'bottom',
        duration: 5000,
      };

      toastManager.show(config);

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          ...config,
          isVisible: true,
        }),
      );
    });
  });

  describe('success', () => {
    it('should show a success toast', () => {
      const listener = jest.fn();
      toastManager.subscribe(listener);

      toastManager.success('Success!', 'Operation completed successfully');

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          text1: 'Success!',
          text2: 'Operation completed successfully',
          isVisible: true,
        }),
      );
    });

    it('should show a success toast with options', () => {
      const listener = jest.fn();
      toastManager.subscribe(listener);

      toastManager.success('Success!', 'Done', {
        position: 'bottom',
        duration: 3000,
      });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          text1: 'Success!',
          text2: 'Done',
          position: 'bottom',
          duration: 3000,
          isVisible: true,
        }),
      );
    });
  });

  describe('error', () => {
    it('should show an error toast', () => {
      const listener = jest.fn();
      toastManager.subscribe(listener);

      toastManager.error('Error!', 'Something went wrong');

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          text1: 'Error!',
          text2: 'Something went wrong',
          isVisible: true,
        }),
      );
    });
  });

  describe('warning', () => {
    it('should show a warning toast', () => {
      const listener = jest.fn();
      toastManager.subscribe(listener);

      toastManager.warning('Warning!', 'Please be careful');

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'warning',
          text1: 'Warning!',
          text2: 'Please be careful',
          isVisible: true,
        }),
      );
    });
  });

  describe('info', () => {
    it('should show an info toast', () => {
      const listener = jest.fn();
      toastManager.subscribe(listener);

      toastManager.info('Info', 'Here is some information');

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'info',
          text1: 'Info',
          text2: 'Here is some information',
          isVisible: true,
        }),
      );
    });
  });

  describe('hide', () => {
    it('should trigger hide listeners', () => {
      const listener = jest.fn();
      toastManager.subscribeToHide(listener);

      toastManager.hide();

      expect(listener).toHaveBeenCalled();
    });
  });
});
