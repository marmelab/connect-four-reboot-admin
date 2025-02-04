ALTER TABLE games DROP CONSTRAINT IF EXISTS games_first_player_id_fkey;
ALTER TABLE games DROP CONSTRAINT IF EXISTS games_second_player_id_fkey;

ALTER TABLE games 
ADD CONSTRAINT games_first_player_id_fkey 
FOREIGN KEY (first_player_id) 
REFERENCES users(id) 
ON DELETE CASCADE;

ALTER TABLE games 
ADD CONSTRAINT games_second_player_id_fkey 
FOREIGN KEY (second_player_id) 
REFERENCES users(id) 
ON DELETE CASCADE;