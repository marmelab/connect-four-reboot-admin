ALTER TABLE games 
ALTER COLUMN game_state TYPE JSONB 
USING game_state::JSONB;
