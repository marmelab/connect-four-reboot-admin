DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'web_anon') THEN 
    CREATE ROLE web_anon;
  END IF;
END $$;

GRANT USAGE ON SCHEMA public TO web_anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO web_anon;

CREATE TABLE IF NOT EXISTS leagues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    league_id INT REFERENCES leagues(id) ON DELETE SET NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_connection_date TIMESTAMP
);


CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    first_player_id INT REFERENCES users(id) ON DELETE CASCADE,
    second_player_id INT REFERENCES users(id) ON DELETE CASCADE,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    game_state JSONB NOT NULL
);

CREATE INDEX idx_games_winner ON games ((game_state->'victoryState'->>'player'));

CREATE VIEW games_view AS
    SELECT 
        g.id, 
        g.first_player_id,
        u1.username as first_player, 
        g.second_player_id,
        u2.username as second_player,
        g.game_state->'victoryState'->>'player' as winner_id,
        w.username as winner,
        g.creation_date,
        g.last_update_date,
        g.game_state,
        CONCAT(u1.username,' ',u2.username) as _players
    FROM games g
    LEFT JOIN users as u1 on first_player_id=u1.id
    LEFT JOIN users as u2 on second_player_id=u2.id
    LEFT JOIN users as w on (g.game_state->'victoryState'->>'player')::INT=w.id
;