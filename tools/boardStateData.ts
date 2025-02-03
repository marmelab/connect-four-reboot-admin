const games = [
  {
    boardState: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0],
      [2, 2, 2, 1, 1, 0, 0],
    ],
    fourLineCoordinates: [
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
    ],
    isDraw: false,
    winner: 1,
    currentPlayer: 1,
  },

  {
    boardState: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 2, 2, 2, 2, 1, 0],
    ],
    fourLineCoordinates: [
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
    ],
    isDraw: false,
    winner: 2,
    currentPlayer: 2,
  },

  {
    boardState: [
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
    ],
    fourLineCoordinates: [],
    isDraw: true,
    winner: 0,
    currentPlayer: 2,
  },

  {
    boardState: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 2, 0, 2, 1, 0, 0],
      [1, 2, 1, 1, 2, 0, 0],
    ],
    fourLineCoordinates: [],
    isDraw: false,
    winner: 0,
    currentPlayer: 2,
  },

  {
    boardState: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0],
      [0, 2, 2, 1, 1, 0, 0],
      [1, 1, 2, 1, 2, 0, 0],
    ],
    fourLineCoordinates: [],
    isDraw: false,
    winner: 0,
    currentPlayer: 2,
  },
];

export default games;
