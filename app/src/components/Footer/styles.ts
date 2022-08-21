import styled from 'styled-components';
import { getSize, getSpacing } from '../../styles';

export const StyledFooter = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${getSpacing(4)} ${getSpacing(6)};

  img {
    width: ${getSize(14)};
  }
`;
