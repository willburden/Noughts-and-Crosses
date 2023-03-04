import { branchOnPlayer } from '../constants/player';
import { useGame } from '../context/gameContext';

const Status = () => {
  const { turn, outcome } = useGame();
  return (<h1 className='turn-display'>{
    outcome ?
      (outcome.type === 'win' ?
        branchOnPlayer(outcome.player)('Noughts', 'Crosses') + '’ win.' :
        'Draw.'
      ) :
      branchOnPlayer(turn)('Noughts', 'Crosses') + '’ turn.'
  }</h1>);
};

export default Status;
