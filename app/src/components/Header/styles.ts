import styled from 'styled-components';
import { getSize, getSpacing } from '../../styles';

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${getSpacing(6)};
  padding: 0 ${getSpacing(6)};

  @media (max-width: 850px) {
    padding: 0 ${getSpacing(1)};
    flex-direction: column;
  }

  .text-container {
    text-align: center;
    margin: 0 ${getSpacing(5)};
  }

  img {
    width: ${getSize(10)};

    @media (max-width: 850px) {
      width: ${getSize(13)};

      &:last-of-type {
        display: none;
      }
    }
  }
`;
