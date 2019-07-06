CREATE DATABASE project2;
\c project2;

CREATE TABLE mode
(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100) NOT NULL
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
  ('Minor Blues Scale');

CREATE USER critter WITH PASSWORD 'critter';
GRANT SELECT, INSERT, UPDATE ON mode TO critter;
GRANT USAGE, SELECT ON SEQUENCE mode_id_seq TO critter;