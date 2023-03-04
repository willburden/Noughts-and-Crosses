import Board from './Board';
import Status from './Status';
import History from './History';
import { GameProvider } from '../context/gameContext';

const Game = () => {
  return (
    <GameProvider>
      <div className='game'>
        <Status />
        <Board />
        <History />
      </div>
    </GameProvider>
  );
};

export default Game;
