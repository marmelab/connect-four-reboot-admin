import pg from "pg";
import path from "path";
import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import games from "./boardStateData.ts";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { Client } = pg;

const client = new pg.Client({
  user: process.env.DATABASE_USER || "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE_NAME || "mydatabase",
  password: process.env.DATABASE_PASSWORD || "password",
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
});

async function populateDatabase() {
  try {
    await client.connect();

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
    for (let i = 0; i < 10; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = faker.internet.username();
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

    for (let i = 0; i < 25; i++) {
      const creationDate = faker.date.past();
      const lastUpdateDate = faker.date.recent();
      const isDraw = faker.datatype.boolean();
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const secondPlayerId =
        randomGame.winner === 2
          ? randomGame.winner
          : userIds[Math.floor(Math.random() * userIds.length)];

      const firstPlayerId =
        randomGame.winner === 1
          ? randomGame.winner
          : userIds[Math.floor(Math.random() * userIds.length)];

      const gameState = JSON.stringify({
        boardState: randomGame.boardState,
        currentPlayer: randomGame.winner === 2 ? secondPlayerId : firstPlayerId,
        victoryState: {
          player: isDraw
            ? null
            : randomGame.winner === 1
              ? firstPlayerId
              : secondPlayerId,
          fourLineCoordinates: isDraw ? [] : randomGame.fourLineCoordinates,
          isDraw: randomGame.isDraw,
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
