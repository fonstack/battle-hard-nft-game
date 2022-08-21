import { StyledHeader } from './styles';
import swordsIcon from '../../assets/icons/swords.png';

const Header = () => {
  return (
    <StyledHeader className="max-width-wrapper">
      <img src={swordsIcon} alt="swords" />
      <div className="text-container">
        <h1>Battle Hard</h1>
        <h2>Join us to save the Metaverse</h2>
      </div>
      <img src={swordsIcon} alt="swords" />
    </StyledHeader>
  );
};

export { Header };
