import { branchOnPlayer } from '../constants/player';
import { useGame } from '../context/gameContext';
import Square from './Square';

const asVector = (square: number) => (
  [square % 3, Math.floor(square / 3)]
);

const WinningLine = ({ start, end }: { start: number, end: number }) => {
  const [p1, q1] = [start, end].map(s => asVector(s).map(c => 10 + 20 * c));
  const normDiff = [0, 1].map(i => Math.sign(q1[i] - p1[i]));
  const [p2, q2] = [p1, q1].map((v, i) => v.map((c, j) => c + (i * 20 - 10) * normDiff[j]));
  return (
    <svg className='winning-line'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 60 60'
    >
      <path d={`M ${p2[0]} ${p2[1]} L ${q2[0]} ${q2[1]}`}
        fill='transparent'
        stroke='black'
      />
    </svg>
  );
};

const Board = () => {
  const { dispatch, grid, turn, outcome } = useGame();
  const status = outcome ? '' : branchOnPlayer(turn)('noughts-turn', 'crosses-turn');
  const squares = grid.map((player, index) => (
    <Square
      key={index}
      player={player}
      onClick={ (outcome === undefined && player === null) ?
        () => { dispatch({type: 'take-square', square: index}); } :
        () => { return; }
      }
    />
  ));
  let line;
  if (outcome?.type === 'win') {
    line = <WinningLine
      start={outcome.line[0]}
      end  ={outcome.line[2]}
    />;
  }

  return (
    <div className={'board ' + status}>
      {squares}
      {line}
    </div>
  );
};

export default Board;
