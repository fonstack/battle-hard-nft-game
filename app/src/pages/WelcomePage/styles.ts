import styled from 'styled-components';
import { getSize, getSpacing } from '../../styles';

export const BattlePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 700px) {
    flex-direction: column;
  }

  .boss,
  .heroes {
    width: ${getSize(40)};

    @media (max-width: 1000px) {
      width: ${getSize(30)};
    }

    @media (max-width: 700px) {
      width: ${getSize(18)};
    }
  }

  .versus {
    width: ${getSize(8)};
    margin: 0 ${getSize(12)};

    @media (max-width: 1000px) {
      width: ${getSize(5)};
      margin: 0 ${getSize(6)};
    }

    @media (max-width: 700px) {
      margin: ${getSize(3)} 0;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${getSpacing(15)};

  @media (max-width: 700px) {
    margin: ${getSpacing(4)} 0;
  }
`;
