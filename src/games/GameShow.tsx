import Typography from "@mui/material/Typography/Typography";
import { Show, SimpleShowLayout, TextField, useFieldValue } from "react-admin";
import GameGrid from "../boardView/GameGrid";
import { tokenColors } from "../boardView/model/consts";

const MatchupField = () => {
  const p1 = useFieldValue({ source: "first_player" });
  const p2 = useFieldValue({ source: "second_player" });
  return (
    <Typography variant="h6" sx={{ textAlign: "center" }}>
      <span className={tokenColors[1]}>{p1}</span> <b>vs</b>{" "}
      <span className={tokenColors[2]}>{p2}</span>
    </Typography>
  );
};

const GameStatusField = () => {
  const gameStatus = useFieldValue({ source: "_game_status" });
  if (!gameStatus) {
    return "Loading game status field ...";
  }
  return (
    <Typography sx={{ textAlign: "center" }}>
      The match status is: <b>{gameStatus}</b>.
    </Typography>
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

export const GameShow = () => (
  <Show>
    <SimpleShowLayout>
      <MatchupField />
      <GameStatusField />
      <GameBoardView />
      <TextField source="creation_date" />
    </SimpleShowLayout>
  </Show>
);
