import { Admin, CustomRoutes, Resource } from "react-admin";
import { GameList } from "./games/GameList";
import {
  ForgotPasswordPage,
  LoginPage,
  SetPasswordPage,
  supabaseAuthProvider,
  supabaseDataProvider,
} from "ra-supabase";
import { createClient } from "@supabase/supabase-js";
import { Box, Typography } from "@mui/material";
import { GameShow } from "./games/GameShow";
import { Route } from "react-router";

const instanceUrl =
  import.meta.env.VITE_SUPABASE_API_URL || "http://127.0.0.1:54321";
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!apiKey) {
  console.error("VITE_SUPABASE_ANON_KEY is not set.");
}

const supabaseClient = apiKey ? createClient(instanceUrl, apiKey) : null;
const authProvider = supabaseClient
  ? supabaseAuthProvider(supabaseClient, {})
  : null;
const dataProvider =
  apiKey && supabaseClient
    ? supabaseDataProvider({
        instanceUrl,
        apiKey,
        supabaseClient,
      })
    : null;

const App = () => {
  if (!supabaseClient || !dataProvider || !authProvider) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h6" color="error">
          Error: cannot instantiate the app.
          <br />
          Maybe VITE_SUPABASE_ANON_KEY is not set. Please check your environment
          variables in .env file (see .env.sample).
        </Typography>
      </Box>
    );
  }

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
    >
      <Resource
        name="games_view"
        list={GameList}
        show={GameShow}
        options={{ label: "Games" }}
      ></Resource>
      <CustomRoutes noLayout>
        <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
        <Route
          path={ForgotPasswordPage.path}
          element={<ForgotPasswordPage />}
        />
      </CustomRoutes>
    </Admin>
  );
};

export default App;
