enum Player {
  Noughts,
  Crosses,
}

export const branchOnPlayer = (
  player: Player,
) => <N, C>(
  if_noughts: N,
  if_crosses: C,
) => {
  if (player === Player.Noughts) {
    return if_noughts;
  } else {
    return if_crosses;
  }
};

export const branchOnOptPlayer = (
  player: Player | undefined | null,
) => <N, C, F>(
  if_noughts: N,
  if_crosses: C,
  if_nullish: F,
) => {
  if (player === null || player === undefined) {
    return if_nullish;
  } else {
    return branchOnPlayer(player)(if_noughts, if_crosses);
  }
};

export default Player;
