import Player, { branchOnOptPlayer } from '../constants/player';

const Square = ({ player, onClick }: {
  player: Player | null,
  onClick: () => void,
}) => {
  const branch = branchOnOptPlayer(player);
  return (
    <div
      className={'square ' + branch('nought', 'cross', 'empty')}
      onClick={onClick}
    >
      <span>{branch('O', 'X', null)}</span>
    </div>
  );
};

export default Square;
