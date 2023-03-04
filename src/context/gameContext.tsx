import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react';
import Player from '../constants/player';

export type Game = {
  dispatch: Dispatch<Action>,
  history: number[],
  grid: (Player | null)[],
  turn: Player,
  outcome?: Outcome,
}

export type Outcome = {
  type: 'win',
  player: Player,
  line: number[],
} | {
  type: 'draw',
};

const GameContext = createContext<Game | undefined>(undefined);

export type Action = {
  type: 'take-square',
  square: number,
} | {
  type: 'revert-to-turn',
  index: number,
};

const reducer = (history: number[], action: Action) => {
  switch (action.type) {
  case 'take-square':
    return [...history, action.square];
  case 'revert-to-turn':
    return history.slice(0, action.index);
  }
};

export const GameProvider = ({ children }: { children?: ReactNode }) => {
  const [history, dispatch] = useReducer(reducer, []);
  const [grid, turn, outcome] = useMemo(() => {
    const [grid, turn] = computeGrid(history);
    const win = computeOutcome(grid);
    return [grid, turn, win];
  }, [history]);

  return (
    <GameContext.Provider value={{history, dispatch, grid, turn, outcome}}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const game = useContext(GameContext);
  if (game === undefined) {
    throw new Error('No GameContext.Provider available when calling useGame');
  }
  return game;
};

const computeGrid = (history: number[]): [(Player | null)[], Player] => {
  let turn = Player.Crosses;
  const grid = Array<Player | null>(9).fill(null);
  for (const square of history) {
    grid[square] = turn;
    turn = turn === Player.Crosses ? Player.Noughts : Player.Crosses;
  }
  return [grid, turn];
};

const computeOutcome = (grid: (Player | null)[]): Outcome | undefined => {
  const line = computeWinningLine(grid);
  if (line !== undefined) {
    return {
      type: 'win',
      player: grid[line[0]] as Player,
      line,
    };
  }
  if (grid.filter(square => square === null).length === 0) {
    return { type: 'draw' };
  }
  return undefined;
};

const computeWinningLine = (grid: (Player | null)[]) => {
  const wins = (line: number[]) => (
    grid[line[0]] !== null &&
    grid[line[0]] === grid[line[1]] && grid[line[0]] === grid[line[2]]
  );
  // Horizontals
  for (let y = 0; y < 9; y += 3) {
    const line = [y, y + 1, y + 2];
    if (wins(line)) {
      return line;
    }
  }
  // Verticals
  for (let x = 0; x < 3; x++) {
    const line = [x, x + 3, x + 6];
    if (wins(line)) {
      return line;
    }
  }
  // Diagonals
  for (let d = 0; d <= 2; d += 2) {
    const line = [d, 4, 8 - d];
    if (wins(line)) {
      return line;
    }
  }
  return undefined;
};
