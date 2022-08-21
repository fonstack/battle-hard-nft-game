export type FontSizeToken = 'small' | 'medium' | 'large' | 'h1' | 'h2';

const fontSizes: Record<FontSizeToken, string> = {
  h1: '4rem',
  h2: '1.375rem',
  large: '1.1875rem',
  medium: '1rem',
  small: '0.75rem',
};

const SPACING_UNNIT = 8;
const SIZE_UNNIT = 8;

const getSpacing = (spacing: number) => {
  return `${spacing * SPACING_UNNIT}px`;
};

const getSize = (size: number) => {
  return `${size * SIZE_UNNIT}px`;
};

const getFontSize = (fontSize: FontSizeToken) => {
  return fontSizes[fontSize];
};

export { getSpacing, getSize, getFontSize };
