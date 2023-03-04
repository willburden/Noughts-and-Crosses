import Player from '../constants/player';
import { useGame } from '../context/gameContext';
import TurnLink from './TurnLink';

const History = () => {
  const { dispatch, history } = useGame();
  const revertHistory = (index: number) => {
    dispatch?.({
      type: 'revert-to-turn',
      index,
    });
  };
  const pastTurns = history.map((square, index) => (
    <li key={index} onClick={() => { revertHistory(index); }}>
      <TurnLink turn={{
        player: index % 2 == 0 ? Player.Crosses : Player.Noughts,
        square,
      }}/>
    </li>
  ));

  return (
    <div className={'turn-history ' + (history.length === 0 ? 'empty' : '')}>
      <div>
        <h1 onClick={() => { revertHistory(0); }}>Past turns: <small>(revert)</small></h1>
        <ol>{pastTurns}</ol>
      </div>
    </div>
  );
};

export default History;
