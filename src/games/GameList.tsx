import {
  Datagrid,
  DateField,
  List,
  TextField,
  TextInput,
  WrapperField,
} from "react-admin";
import { GameStatus } from "./GameStatus";

const postFilters = [
  <TextInput source="_players@ilike" label="Search a player" alwaysOn />,
];

export const GameList = () => (
  <List filters={postFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="first_player_id" label="P1 Id" />
      <TextField source="first_player" label="P1 username" />
      <TextField source="second_player_id" label="P2 Id" />
      <TextField source="second_player" label="P2 username" />
      <WrapperField label="Game status">
        <GameStatus />
      </WrapperField>
      <TextField source="winner_id" label="Winner Id" />
      <TextField source="winner" label="Winner username" />
      <DateField source="creation_date" label="Game creation date" />
      <DateField source="last_update_date" label="Game last update date" />
    </Datagrid>
  </List>
);
