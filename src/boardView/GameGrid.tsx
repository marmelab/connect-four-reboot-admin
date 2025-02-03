import Column from "./Column";
import { transpose } from "./tools/tools";
import { BoardState, VictoryState } from "./model/types";

interface GameGridProps {
  boardState: BoardState;
  victoryState: VictoryState;
}

const GameGrid = ({ boardState, victoryState }: GameGridProps) => {
  const columns = transpose(boardState);

  return (
    <div id="game-grid-container">
      <div id="game-grid">
        <div id="grid-container">
          {columns.map((_, index) => (
            <Column
              boardState={boardState}
              victoryState={victoryState}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
