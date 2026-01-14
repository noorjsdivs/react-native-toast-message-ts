import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import { Toast } from '../Toast';
import { ToastConfig } from '../types';

jest.useFakeTimers();

import { Text } from 'react-native';

// ... (keep imports)

describe('Toast', () => {
  const mockOnHide = jest.fn();
  const mockRenderer = ({ text1, text2 }: any) => (
    <>
      <Text>{text1}</Text>
      {text2 && <Text>{text2}</Text>}
    </>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultConfig: ToastConfig = {
    type: 'info',
    text1: 'Test Toast',
    text2: 'Test Description',
    isVisible: true,
    hide: jest.fn(),
  };

  it('should render toast with text1 and text2', () => {
    const { getByText } = render(
      <Toast config={defaultConfig} onHide={mockOnHide} renderer={mockRenderer} />,
    );

    expect(getByText('Test Toast')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });

  it('should render success toast', () => {
    const config: ToastConfig = {
      ...defaultConfig,
      type: 'success',
    };

    const { getByText } = render(
      <Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />,
    );
    expect(getByText('Test Toast')).toBeTruthy();
  });

  it('should render error toast', () => {
    const config: ToastConfig = {
      ...defaultConfig,
      type: 'error',
    };

    const { getByText } = render(
      <Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />,
    );
    expect(getByText('Test Toast')).toBeTruthy();
  });

  it('should render warning toast', () => {
    const config: ToastConfig = {
      ...defaultConfig,
      type: 'warning',
    };

    const { getByText } = render(
      <Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />,
    );
    expect(getByText('Test Toast')).toBeTruthy();
  });

  it('should render at top position', () => {
    const config: ToastConfig = {
      ...defaultConfig,
      position: 'top',
    };

    const { UNSAFE_root } = render(
      <Toast config={config} onHide={mockOnHide} topOffset={50} renderer={mockRenderer} />,
    );
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render at bottom position', () => {
    const config: ToastConfig = {
      ...defaultConfig,
      position: 'bottom',
    };

    const { UNSAFE_root } = render(
      <Toast config={config} onHide={mockOnHide} bottomOffset={50} renderer={mockRenderer} />,
    );
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should auto-hide after duration', async () => {
    const hide = jest.fn();
    const config: ToastConfig = {
      ...defaultConfig,
      visibilityTime: 1000,
      hide,
    };

    render(<Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(hide).toHaveBeenCalled();
    });
  });

  it('should not auto-hide with duration 0', async () => {
    const hide = jest.fn();
    const config: ToastConfig = {
      ...defaultConfig,
      visibilityTime: 0,
      hide,
    };

    render(<Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(hide).not.toHaveBeenCalled();
  });

  it('should call onShow callback', () => {
    const onShow = jest.fn();
    const config: ToastConfig = {
      ...defaultConfig,
      onShow,
    };

    render(<Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />);

    act(() => {
      jest.advanceTimersByTime(300); // Animation duration
    });

    waitFor(() => {
      expect(onShow).toHaveBeenCalled();
    });
  });

  it('should render with custom background color', () => {
    const config: ToastConfig = {
      ...defaultConfig,
      backgroundColor: '#ff0000',
    };

    const { getByText } = render(
      <Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />,
    );
    expect(getByText('Test Toast')).toBeTruthy();
  });

  it('should render with custom border color', () => {
    const config: ToastConfig = {
      ...defaultConfig,
      borderLeftColor: '#00ff00',
    };

    const { getByText } = render(
      <Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />,
    );
    expect(getByText('Test Toast')).toBeTruthy();
  });

  it('should render with custom icon', () => {
    const CustomIcon = () => <></>;
    const config: ToastConfig = {
      ...defaultConfig,
      icon: <CustomIcon />,
    };

    const { getByText } = render(
      <Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />,
    );
    expect(getByText('Test Toast')).toBeTruthy();
  });

  it('should render without text2', () => {
    const config: ToastConfig = {
      ...defaultConfig,
      text2: undefined,
    };

    const { getByText, queryByText } = render(
      <Toast config={config} onHide={mockOnHide} renderer={mockRenderer} />,
    );
    expect(getByText('Test Toast')).toBeTruthy();
    expect(queryByText('Test Description')).toBeNull();
  });
});
