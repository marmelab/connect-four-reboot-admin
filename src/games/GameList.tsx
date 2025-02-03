import {
  AutocompleteInput,
  Datagrid,
  DateField,
  List,
  ReferenceInput,
  SearchInput,
  SelectInput,
  TextField,
  WrapperField,
} from "react-admin";
import { GameStatus, statusChoices } from "./GameStatus";

const filterToQuery = (searchText: any) => ({
  "username@ilike": `%${searchText}%`,
});

const postFilters = [
  <SearchInput source="_players@ilike" alwaysOn />,
  <ReferenceInput source="winner_id" reference="users" alwaysOn>
    <AutocompleteInput filterToQuery={filterToQuery} optionText="username" />
  </ReferenceInput>,
  <SelectInput
    label="Game status"
    source="_game_status"
    choices={statusChoices}
    alwaysOn
  />,
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
