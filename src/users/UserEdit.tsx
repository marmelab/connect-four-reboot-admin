import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  email,
} from "react-admin";

const filterToQuery = (searchText: any) => ({
  "name@ilike": `%${searchText}%`,
});

export const UserEdit = () => (
  <Edit resource="users" redirect="/users_view">
    <SimpleForm>
      <TextInput source="username" label="Username" />
      <TextInput source="first_name" label="First Name" />
      <TextInput source="last_name" label="Last Name" />
      <TextInput source="email" label="Email" validate={email()} />
      <ReferenceInput source="league_id" reference="leagues">
        <AutocompleteInput
          optionText="name"
          label="League"
          filterToQuery={filterToQuery}
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
