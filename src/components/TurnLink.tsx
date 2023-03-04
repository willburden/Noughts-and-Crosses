import { branchOnPlayer } from '../constants/player';
import Turn from '../constants/turn';

const TurnLink = ({ turn }: { turn: Turn }) => {
  const [x, y] = [ (turn.square % 3) + 1, Math.floor(turn.square / 3) + 1 ];
  const branch = branchOnPlayer(turn.player);
  return (
    <a target='_blank'>&nbsp;
      <span className='player'>{branch(<>Noughts</>, <>Crosses&nbsp;</>)}</span>&nbsp;
      <span className='to'>to</span>&nbsp;
      <span className='position'>({x}, {y})</span>
    </a>
  );
};

export default TurnLink;
