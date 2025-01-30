import { Admin, Resource, fetchUtils } from "react-admin";

import postgrestRestProvider, {
  IDataProviderConfig,
  defaultPrimaryKeys,
  defaultSchema,
} from "@raphiniert/ra-data-postgrest";
import { GameList } from "./games/GameList";

const config: IDataProviderConfig = {
  apiUrl: "http://localhost:3000",
  httpClient: fetchUtils.fetchJson,
  defaultListOp: "eq",
  primaryKeys: defaultPrimaryKeys,
  schema: defaultSchema,
};

const App = () => (
  <Admin dataProvider={postgrestRestProvider(config)}>
    <Resource name="games" list={GameList}></Resource>
  </Admin>
);

export default App;
