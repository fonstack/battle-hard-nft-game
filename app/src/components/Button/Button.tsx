import { StyledButton } from './styles';
import { ButtonProps } from './types';

const Button = ({ children, onClick, isLarge }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} isLarge={isLarge}>
      {children}
    </StyledButton>
  );
};

export { Button };
