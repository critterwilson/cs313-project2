CREATE DATABASE project2;
\c project2;

CREATE TABLE mode
(
	id SERIAL PRIMARY KEY NOT NULL,
	first name(100) NOT NULL
);

INSERT INTO mode(name) VALUES
  ('Ionian'),
  ('Lydian'),
  ('Mixolydian'),
  ('Dorian'),
  ('Aeolian'),
  ('Phrygian'),
  ('Locarian'),
  ('Major Pentatonic'),
  ('Minor Pentatonic'),
  ('Major Blues Scale'),
  ('Minor Blues Scale')

CREATE USER ta_user WITH PASSWORD 'ta_pass';
GRANT SELECT, INSERT, UPDATE ON person TO ta_user;
GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO ta_user;