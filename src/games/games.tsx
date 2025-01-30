import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

enum GameStatus {
  Ongoing = "Ongoing",
  Finished = "Finished",
}

const computeGameStatus = (game: { game_state: string }): string => {
  const gameState = JSON.parse(game.game_state);
  return gameState.victoryState.player != null || gameState.victoryState?.isDraw
    ? GameStatus.Finished
    : GameStatus.Ongoing;
};

export const GameList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="first_player_id" reference="users">
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField source="second_player_id" reference="users">
        <TextField source="username" />
      </ReferenceField>
      <FunctionField source="game_state" render={computeGameStatus} />
      <DateField source="last_update_date" />
    </Datagrid>
  </List>
);
