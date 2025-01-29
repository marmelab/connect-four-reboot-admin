import pg from "pg";
import path from "path";
import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { Client } = pg;
console.log(process.env.DATABASE_USER);
// Configuration de la connexion à la base de données
const client = new pg.Client({
  user: process.env.DATABASE_USER || "postgres", // Utiliser des variables d'environnement pour la sécurité
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE_NAME || "mydatabase",
  password: process.env.DATABASE_PASSWORD || "password",
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
});

async function populateDatabase() {
  try {
    await client.connect(); // Connexion à la base de données

    // Création de quelques ligues
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

    // Création de quelques utilisateurs
    for (let i = 0; i < 10; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = faker.internet.username();
      const email = faker.internet.email();
      const passwordHash = faker.internet.password();
      const leagueId = leagueIds[Math.floor(Math.random() * leagueIds.length)];
      const creationDate = faker.date.past();
      const lastConnectionDate = faker.date.recent();

      await client.query(
        "INSERT INTO users (first_name, last_name, username, email, password_hash, league_id, creation_date, last_connection_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
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
      console.log(`User created: ${firstName} ${lastName}`);
    }

    // Création de quelques jeux
    for (let i = 0; i < 5; i++) {
      const firstPlayerId = Math.floor(Math.random() * 10) + 1;
      const secondPlayerId = Math.floor(Math.random() * 10) + 1;
      const creationDate = faker.date.past();
      const lastUpdateDate = faker.date.recent();
      const gameState = faker.helpers.arrayElement([
        "waiting",
        "in-progress",
        "finished",
      ]);

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
    await client.end(); // Fermer la connexion à la base de données
  }
}

// Exécuter la fonction de peuplement
populateDatabase();
