import {
  getDefaultBackgroundColor,
  getDefaultBorderColor,
  getDefaultIconColor,
  COLORS,
} from '../colors';

describe('colors', () => {
  describe('COLORS', () => {
    it('should export color constants', () => {
      expect(COLORS.success).toBe('#28a745');
      expect(COLORS.error).toBe('#dc3545');
      expect(COLORS.warning).toBe('#ffc107');
      expect(COLORS.info).toBe('#17a2b8');
      expect(COLORS.white).toBe('#FFFFFF');
      expect(COLORS.black).toBe('#000000');
    });
  });

  describe('getDefaultBackgroundColor', () => {
    it('should return white for all types', () => {
      expect(getDefaultBackgroundColor('success')).toBe(COLORS.white);
      expect(getDefaultBackgroundColor('error')).toBe(COLORS.white);
      expect(getDefaultBackgroundColor('warning')).toBe(COLORS.white);
      expect(getDefaultBackgroundColor('info')).toBe(COLORS.white);
      expect(getDefaultBackgroundColor('custom')).toBe(COLORS.white);
    });
  });

  describe('getDefaultBorderColor', () => {
    it('should return correct border color for success', () => {
      expect(getDefaultBorderColor('success')).toBe(COLORS.success);
    });

    it('should return correct border color for error', () => {
      expect(getDefaultBorderColor('error')).toBe(COLORS.error);
    });

    it('should return correct border color for warning', () => {
      expect(getDefaultBorderColor('warning')).toBe(COLORS.warning);
    });

    it('should return correct border color for info', () => {
      expect(getDefaultBorderColor('info')).toBe(COLORS.info);
    });

    it('should return border color for custom type', () => {
      expect(getDefaultBorderColor('custom')).toBe(COLORS.border);
    });
  });

  describe('getDefaultIconColor', () => {
    it('should return same color as border color', () => {
      expect(getDefaultIconColor('success')).toBe(getDefaultBorderColor('success'));
      expect(getDefaultIconColor('error')).toBe(getDefaultBorderColor('error'));
      expect(getDefaultIconColor('warning')).toBe(getDefaultBorderColor('warning'));
      expect(getDefaultIconColor('info')).toBe(getDefaultBorderColor('info'));
      expect(getDefaultIconColor('custom')).toBe(getDefaultBorderColor('custom'));
    });
  });
});
