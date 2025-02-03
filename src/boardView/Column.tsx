import Square from "./Square";
import { transpose } from "./tools/tools";
import { BoardState, VictoryState } from "./model/types";

function isWinningToken(
  victoryState: VictoryState,
  columnIndex: number,
  rowIndex: number,
): boolean {
  return victoryState.fourLineCoordinates.some(
    ([x, y]) => x === columnIndex && y === rowIndex,
  );
}

interface ColumnProps {
  boardState: BoardState;
  victoryState: VictoryState;
  index: number;
}

export const Column = ({ boardState, victoryState, index }: ColumnProps) => {
  const transposedBoard = transpose(boardState);

  return (
    <div className="column">
      {transposedBoard[index].map((value: any, y: any) => (
        <Square
          value={value}
          x={index}
          y={y}
          isWinningToken={isWinningToken(victoryState, index, y)}
          key={`square${index}${y}`}
        />
      ))}
    </div>
  );
};

export default Column;
