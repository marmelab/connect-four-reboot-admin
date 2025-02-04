CREATE VIEW users_view AS
    SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.username,
        u.email,
        u.league_id,
        u.creation_date,
        u.last_connection_date,
        CONCAT(u.first_name,' ',u.last_name, ' ', u.username, ' ', u.email) as _user_infos
    FROM users u
    LEFT JOIN leagues as l on l.id=u.league_id
;