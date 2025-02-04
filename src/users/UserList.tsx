import {
  AutocompleteInput,
  Datagrid,
  List,
  ReferenceField,
  ReferenceInput,
  SearchInput,
  TextField,
} from "react-admin";

const filterToQuery = (searchText: any) => ({
  "name@ilike": `%${searchText}%`,
});

const postFilters = [
  <SearchInput source="username@ilike" alwaysOn />,
  <ReferenceInput source="league_id" reference="leagues" alwaysOn>
    <AutocompleteInput filterToQuery={filterToQuery} optionText="name" />
  </ReferenceInput>,
];

export const UserList = () => (
  <List filters={postFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" label="Username" />
      <TextField source="first_name" label="First name" />
      <TextField source="last_name" label="Last name" />
      <TextField source="email" label="email" />
      <ReferenceField source="league_id" reference="leagues">
        <TextField source="name" label="League name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
