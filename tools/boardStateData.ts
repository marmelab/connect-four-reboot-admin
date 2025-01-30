const games = [
  {
    boardState: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0],
      [2, 2, 0, 1, 1, 0, 0],
    ],
    fourLineCoordinates: [
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
    ],
    isDraw: false,
    winner: 1,
  },

  {
    boardState: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 2, 2, 2, 2, 1, 0],
    ],
    fourLineCoordinates: [
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
    ],
    isDraw: false,
    winner: 2,
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
  },
];

export default games;
