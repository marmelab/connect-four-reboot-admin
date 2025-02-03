import pg from "pg";
import path from "path";
import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import games from "./boardStateData.ts";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const client = new pg.Client(process.env.SUPABASE_DB_URL);

const generateSimpleUsername = () => {
  const name = faker.person.firstName().toLowerCase().slice(0, 5); // Prénom en minuscule
  const number = faker.number.int({ min: 10, max: 99 }); // Petit nombre
  return `${name}${number}`;
};

async function populateDatabase() {
  try {
    await client.connect();

    console.log("Delete existing data and reset ids...");
    await client.query("DELETE FROM games");
    await client.query("DELETE FROM users");
    await client.query("DELETE FROM leagues");

    await client.query("ALTER SEQUENCE leagues_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE games_id_seq RESTART WITH 1");

    const leagueIds: number[] = [];
    for (let i = 0; i < 5; i++) {
      const leagueName = faker.company.name();
      const leagueLocation = faker.location.city();
      const res = await client.query(
        "INSERT INTO leagues (name, location) VALUES ($1, $2) RETURNING id",
        [leagueName, leagueLocation],
      );
      leagueIds.push(res.rows[0].id);
      console.log(`League created: ${leagueName} in ${leagueLocation}`);
    }

    const userIds: number[] = [];

    for (let i = 0; i < 50; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = generateSimpleUsername();
      const email = faker.internet.email();
      const passwordHash = faker.internet.password();
      const leagueId = leagueIds[Math.floor(Math.random() * leagueIds.length)];
      const creationDate = faker.date.past();
      const lastConnectionDate = faker.date.recent();
      const res = await client.query(
        "INSERT INTO users (first_name, last_name, username, email, password_hash, league_id, creation_date, last_connection_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [
          firstName,
          lastName,
          username,
          email,
          passwordHash,
          leagueId,
          creationDate,
          lastConnectionDate,
        ],
      );
      userIds.push(res.rows[0].id);
      console.log(`User created: ${firstName} ${lastName}`);
    }

    for (let i = 0; i < 200; i++) {
      const creationDate = faker.date.past();
      const lastUpdateDate = faker.date.recent();
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const isDraw = randomGame.isDraw;
      const firstPlayerId = userIds[Math.floor(Math.random() * userIds.length)];
      let secondPlayerId = 0;
      do {
        secondPlayerId = userIds[Math.floor(Math.random() * userIds.length)];
      } while (secondPlayerId === firstPlayerId);
      const winnerId =
        randomGame.winner === 0
          ? null
          : randomGame.winner === 1
            ? firstPlayerId
            : secondPlayerId;

      const gameState = JSON.stringify({
        boardState: randomGame.boardState,
        currentPlayer:
          randomGame.currentPlayer === 1 ? firstPlayerId : secondPlayerId,
        victoryState: {
          player: winnerId,
          fourLineCoordinates: randomGame.fourLineCoordinates,
          isDraw: isDraw,
        },
      });

      await client.query(
        "INSERT INTO games (first_player_id, second_player_id, creation_date, last_update_date, game_state) VALUES ($1, $2, $3, $4, $5)",
        [
          firstPlayerId,
          secondPlayerId,
          creationDate,
          lastUpdateDate,
          gameState,
        ],
      );
      console.log(
        `Game created: Player ${firstPlayerId} vs Player ${secondPlayerId}`,
      );
    }

    console.log("Database populated with fake data!");
  } catch (error) {
    console.error("Error populating the database:", error);
  } finally {
    await client.end();
  }
}

populateDatabase();
