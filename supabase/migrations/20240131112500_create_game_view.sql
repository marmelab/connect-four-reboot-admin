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