CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_uid VARCHAR(200) UNIQUE,
  email VARCHAR(100)
);

SELECT * FROM users;