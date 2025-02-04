import {
  Edit,
  SimpleForm,
  TextInput,
  EmailField,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";

export const UserEdit = () => (
  <Edit resource="users">
    <SimpleForm>
      <TextInput source="username" label="Username" />
      <TextInput source="first_name" label="First Name" />
      <TextInput source="last_name" label="Last Name" />
      <EmailField source="email" label="Email" />
      <ReferenceInput source="league_id" reference="leagues">
        <AutocompleteInput optionText="name" label="League" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
