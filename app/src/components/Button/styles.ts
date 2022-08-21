import styled, { css } from 'styled-components';
import { getSpacing, getFontSize } from '../../styles';

export const StyledButton = styled.button<{ isLarge?: boolean }>(
  ({ isLarge }) => css`
    padding: ${getSpacing(2.2)} ${getSpacing(5)};
    font-size: ${getFontSize(isLarge ? 'large' : 'medium')};
    border: none;
    border-radius: 10px;
    background: var(--gradient-primary-secondary);
    font-weight: 600;
    color: inherit;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  `
);
