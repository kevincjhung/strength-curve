# return names of all tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';


# Truncate all tables and reset the sequence
TRUNCATE TABLE users, workout_plans, workouts, workout_instances, workout_sets, movements, estimated_one_rms, exercise_progress_logs   RESTART IDENTITY;


INSERT INTO users (username, email, created_at)
VALUES ('johndoe', 'johndoe@example.com', NOW());


TRUNCATE TABLE movements;
