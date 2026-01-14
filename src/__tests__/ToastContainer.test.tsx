import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ToastContainer } from '../ToastContainer';
import { toastManager } from '../ToastManager';
import { Text } from 'react-native';

describe('ToastContainer', () => {
  it('should render nothing initially', () => {
    const { UNSAFE_root } = render(<ToastContainer />);
    expect(UNSAFE_root.children.length).toBe(0);
  });

  it('should render toast when shown', async () => {
    const { getByText } = render(<ToastContainer />);

    toastManager.show({
      text1: 'Test Toast',
      text2: 'Test Description',
    });

    await waitFor(() => {
      expect(getByText('Test Toast')).toBeTruthy();
      expect(getByText('Test Description')).toBeTruthy();
    });
  });

  it('should hide toast when hide is called', async () => {
    const { getByText, queryByText } = render(<ToastContainer />);

    toastManager.show({
      text1: 'Test Toast',
    });

    await waitFor(() => {
      expect(getByText('Test Toast')).toBeTruthy();
    });

    toastManager.hide();

    await waitFor(() => {
      expect(queryByText('Test Toast')).toBeNull();
    });
  });

  it('should render with default config', async () => {
    const { getByText } = render(
      <ToastContainer
        config={{
          position: 'bottom',
          duration: 5000,
        }}
      />,
    );

    toastManager.show({
      text1: 'Test Toast',
    });

    await waitFor(() => {
      expect(getByText('Test Toast')).toBeTruthy();
    });
  });

  it('should use custom topOffset', async () => {
    const { getByText } = render(<ToastContainer topOffset={100} />);

    toastManager.show({
      text1: 'Test Toast',
      position: 'top',
    });

    await waitFor(() => {
      expect(getByText('Test Toast')).toBeTruthy();
    });
  });

  it('should use custom bottomOffset', async () => {
    const { getByText } = render(<ToastContainer bottomOffset={100} />);

    toastManager.show({
      text1: 'Test Toast',
      position: 'bottom',
    });

    await waitFor(() => {
      expect(getByText('Test Toast')).toBeTruthy();
    });
  });

  it('should call onHide callback', async () => {
    const onHide = jest.fn();
    const { getByText } = render(<ToastContainer />);

    toastManager.show({
      text1: 'Test Toast',
      onHide,
    });

    await waitFor(() => {
      expect(getByText('Test Toast')).toBeTruthy();
    });

    toastManager.hide();

    await waitFor(() => {
      expect(onHide).toHaveBeenCalled();
    });
  });

  it('should use custom renderToast function', async () => {
    const renderToast = jest.fn(() => <Text>Custom Toast</Text>);

    const { getByText } = render(<ToastContainer renderToast={renderToast} />);

    toastManager.show({
      text1: 'Test Toast',
    });

    await waitFor(() => {
      expect(renderToast).toHaveBeenCalled();
      expect(getByText('Custom Toast')).toBeTruthy();
    });
  });

  it('should show success toast', async () => {
    const { getByText } = render(<ToastContainer />);

    toastManager.success('Success!', 'Operation completed');

    await waitFor(() => {
      expect(getByText('Success!')).toBeTruthy();
      expect(getByText('Operation completed')).toBeTruthy();
    });
  });

  it('should show error toast', async () => {
    const { getByText } = render(<ToastContainer />);

    toastManager.error('Error!', 'Something went wrong');

    await waitFor(() => {
      expect(getByText('Error!')).toBeTruthy();
      expect(getByText('Something went wrong')).toBeTruthy();
    });
  });

  it('should show warning toast', async () => {
    const { getByText } = render(<ToastContainer />);

    toastManager.warning('Warning!', 'Please be careful');

    await waitFor(() => {
      expect(getByText('Warning!')).toBeTruthy();
      expect(getByText('Please be careful')).toBeTruthy();
    });
  });

  it('should show info toast', async () => {
    const { getByText } = render(<ToastContainer />);

    toastManager.info('Info', 'Here is some information');

    await waitFor(() => {
      expect(getByText('Info')).toBeTruthy();
      expect(getByText('Here is some information')).toBeTruthy();
    });
  });
});
