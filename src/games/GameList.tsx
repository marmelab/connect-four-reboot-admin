import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
} from "react-admin";
import { GameStatus } from "./GameStatus";

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
      <GameStatus></GameStatus>
      <DateField source="last_update_date" />
    </Datagrid>
  </List>
);
