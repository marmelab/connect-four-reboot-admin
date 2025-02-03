DROP VIEW IF EXISTS games_view;

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
        CONCAT(u1.username, ' ', u2.username) as _players,
        g.game_state->'boardState' as board_state,
        g.game_state->'victoryState' as _victory_state,
        CASE
            WHEN (g.game_state->'victoryState'->>'player') IS NOT NULL
                 OR COALESCE((g.game_state->'victoryState'->>'isDraw')::BOOLEAN, FALSE) = TRUE
            THEN 'Finished'
            ELSE 'Ongoing'
        END as _game_status
    FROM games g
    LEFT JOIN users as u1 ON g.first_player_id = u1.id
    LEFT JOIN users as u2 ON g.second_player_id = u2.id
    LEFT JOIN users as w ON (g.game_state->'victoryState'->>'player')::INT = w.id;
