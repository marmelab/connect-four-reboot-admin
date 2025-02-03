import Typography from "@mui/material/Typography/Typography";
import { Show, SimpleShowLayout, TextField, useFieldValue } from "react-admin";
import GameGrid from "../boardView/GameGrid";
import { tokenColors } from "../boardView/model/consts";
import { Status } from "./GameStatus";
import { PlayerNum } from "../boardView/model/types";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import Box from "@mui/material/Box/Box";

const GameStatusField = () => {
  const gameStatus = useFieldValue({ source: "_game_status" });
  const victoryState = useFieldValue({ source: "_victory_state" });
  const winner = useFieldValue({ source: "winner" });

  if (victoryState && victoryState.isDraw) {
    return (
      <Typography>
        <b>{gameStatus}</b> - it's a draw.
      </Typography>
    );
  }
  if (winner && gameStatus && gameStatus === Status.Finished.label) {
    return (
      <Typography>
        <b>{gameStatus}</b> - Winner: <b>{winner}</b>
      </Typography>
    );
  }
  if (gameStatus) {
    return (
      <Typography>
        <b>{gameStatus}</b>
      </Typography>
    );
  }

  return "Loading game status ...";
};

const PlayerField = ({ playerNum }: { playerNum: PlayerNum }) => {
  const p1 = useFieldValue({ source: "first_player" });
  const p2 = useFieldValue({ source: "second_player" });
  if (!p1 || !p2) {
    return "Loading players ...";
  }
  return (
    <Tooltip title="player" placement="top">
      <Box display="flex" alignItems="center">
        <Box
          width={10}
          height={10}
          borderRadius="50%"
          className={tokenColors[playerNum]}
          marginRight={1}
        />
        <Typography variant="body2">
          {playerNum === PlayerNum.p1 ? p1 : p2}
        </Typography>
      </Box>
    </Tooltip>
  );
};

const GameBoardView = () => {
  const victoryState = useFieldValue({ source: "_victory_state" });
  const boardState = useFieldValue({ source: "board_state" });
  if (!victoryState || !boardState) {
    return "Loading game board view ...";
  }
  return <GameGrid victoryState={victoryState} boardState={boardState} />;
};

const GameId = () => {
  const id = useFieldValue({ source: "id" });
  return <div className="game-infos">Game - id: {id}</div>;
};

export const GameShow = () => (
  <Show>
    <SimpleShowLayout>
      <GameId></GameId>
      <span className="RaLabeled-label">Players: </span>
      <PlayerField playerNum={PlayerNum.p1} />
      <PlayerField playerNum={PlayerNum.p2} />
      <span className="RaLabeled-label">Match status: </span>
      <GameStatusField />
      <span className="RaLabeled-label">Board game: </span>
      <GameBoardView />
      <TextField source="creation_date" />
      <TextField source="last_update_date" />
    </SimpleShowLayout>
  </Show>
);
