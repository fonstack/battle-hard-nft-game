import { Button } from '../../components';
import { BattlePreview, ButtonWrapper } from './styles';
import { ReactComponent as VersusIcon } from '../../assets/icons/x.svg';
import bossHead from '../../assets/images/boss-head.png';
import heroesHeads from '../../assets/images/heroes-heads.png';

const WelcomePage = () => {
  return (
    <section className="max-width-wrapper fh">
      <BattlePreview>
        <img className="boss" src={bossHead} alt="boss head" />
        <VersusIcon className="versus" />
        <img className="heroes" src={heroesHeads} alt="heroes heads" />
      </BattlePreview>
      <ButtonWrapper>
        <Button isLarge>Connect Wallet to fight</Button>
      </ButtonWrapper>
    </section>
  );
};

export { WelcomePage };
