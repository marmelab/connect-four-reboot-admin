export enum PlayerNum {
  p1 = 1,
  p2 = 2,
  empty = 0,
}

export type BoardState = Array<Array<PlayerNum>>;

export interface VictoryState {
  player: PlayerNum;
  fourLineCoordinates: Array<[Number, number]>;
  isDraw: boolean;
}

export interface VictoryState {
  player: PlayerNum;
  fourLineCoordinates: Array<[Number, number]>;
  isDraw: boolean;
}
