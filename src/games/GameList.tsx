import {
  AutocompleteInput,
  Datagrid,
  DateField,
  List,
  ReferenceInput,
  SearchInput,
  SelectInput,
  ShowButton,
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
    <Datagrid isRowSelectable={() => false}>
      <TextField source="id" />
      <TextField source="first_player" label="First player" />
      <TextField source="second_player" label="Second player" />
      <WrapperField label="Game status">
        <GameStatus />
      </WrapperField>
      <TextField source="winner" label="Winner" />
      <DateField source="creation_date" label="Game creation date" />
      <DateField source="last_update_date" label="Game last update date" />
      <ShowButton />
    </Datagrid>
  </List>
);
