import { Admin, Resource } from "react-admin";
import { GameList } from "./games/GameList";
import { supabaseDataProvider } from "ra-supabase";
import { createClient } from "@supabase/supabase-js";
import { Box, Typography } from "@mui/material";

const instanceUrl =
  import.meta.env.VITE_SUPABASE_API_URL || "http://127.0.0.1:54321";
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!apiKey) {
  console.error("VITE_SUPABASE_ANON_KEY is not set.");
}

const supabaseClient = apiKey ? createClient(instanceUrl, apiKey) : null;
const dataProvider =
  apiKey && supabaseClient
    ? supabaseDataProvider({
        instanceUrl,
        apiKey,
        supabaseClient,
      })
    : null;

const App = () => {
  if (!dataProvider) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h6" color="error">
          Error: VITE_SUPABASE_ANON_KEY is not set.
          <br />
          Please check your environment variables in .env file (see
          .env.sample).
        </Typography>
      </Box>
    );
  }

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="games_view"
        list={GameList}
        options={{ label: "Games" }}
      ></Resource>
    </Admin>
  );
};

export default App;
