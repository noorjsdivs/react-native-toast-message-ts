import React from 'react';
import { render } from '@testing-library/react-native';
import { ToastIcon, SuccessIcon, ErrorIcon, WarningIcon, InfoIcon } from '../ToastIcon';

describe('ToastIcon', () => {
  it('should render SuccessIcon for success type', () => {
    const { UNSAFE_root } = render(<ToastIcon type="success" />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render ErrorIcon for error type', () => {
    const { UNSAFE_root } = render(<ToastIcon type="error" />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render WarningIcon for warning type', () => {
    const { UNSAFE_root } = render(<ToastIcon type="warning" />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render InfoIcon for info type', () => {
    const { UNSAFE_root } = render(<ToastIcon type="info" />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render null for custom type', () => {
    const { UNSAFE_root } = render(<ToastIcon type="custom" />);
    expect(UNSAFE_root.children).toEqual([]);
  });

  it('should accept custom color', () => {
    const { UNSAFE_root } = render(<ToastIcon type="success" color="#ff0000" />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should accept custom size', () => {
    const { UNSAFE_root } = render(<ToastIcon type="success" size={30} />);
    expect(UNSAFE_root).toBeTruthy();
  });
});

describe('Individual Icon Components', () => {
  it('should render SuccessIcon', () => {
    const { UNSAFE_root } = render(<SuccessIcon />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render ErrorIcon', () => {
    const { UNSAFE_root } = render(<ErrorIcon />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render WarningIcon', () => {
    const { UNSAFE_root } = render(<WarningIcon />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render InfoIcon', () => {
    const { UNSAFE_root } = render(<InfoIcon />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render icons with custom props', () => {
    const { UNSAFE_root: success } = render(<SuccessIcon color="#00ff00" size={25} />);
    const { UNSAFE_root: error } = render(<ErrorIcon color="#ff0000" size={25} />);
    const { UNSAFE_root: warning } = render(<WarningIcon color="#ffff00" size={25} />);
    const { UNSAFE_root: info } = render(<InfoIcon color="#0000ff" size={25} />);

    expect(success).toBeTruthy();
    expect(error).toBeTruthy();
    expect(warning).toBeTruthy();
    expect(info).toBeTruthy();
  });
});
