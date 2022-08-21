import { StyledFooter } from './styles';
import fonstackLogo from '../../assets/images/fonstack.png';

const portfolioUrl = 'https://fonstack.dev/';

const Footer = () => {
  return (
    <StyledFooter className="max-width-wrapper">
      <a href={portfolioUrl} target="_blank" rel="noreferrer noopener">
        <img src={fonstackLogo} alt="fonstack" />
      </a>
    </StyledFooter>
  );
};

export { Footer };
