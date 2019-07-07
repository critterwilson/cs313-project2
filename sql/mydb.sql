CREATE DATABASE project2;
\c project2;

CREATE TABLE mode
(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(20) NOT NULL,
);

CREATE TABLE descriptions
(
  id SERIAL PRIMARY KEY NOT NULL,
  mode_id SERIAL REFERENCES mode(id) NOT NULL,
  tone VARCHAR(50) NOT NULL
);

CREATE TABLE alterations
(
  id SERIAL PRIMARY KEY NOT NULL,
  mode_id SERIAL REFERENCES mode(id) NOT NULL,
  alter_2 SMALLINT NOT NULL,
  alter_3 SMALLINT NOT NULL,
  alter_4 SMALLINT NOT NULL,
  alter_5 SMALLINT NOT NULL,
  alter_6 SMALLINT NOT NULL,
  alter_7 SMALLINT NOT NULL,
  mood_1 SMALLINT NOT NULL,
  mood_2 SMALLINT NOT NULL,
  mood_3 SMALLINT NOT NULL,
  mood_4 SMALLINT NOT NULL,
  mood_5 SMALLINT NOT NULL,
  mood_6 SMALLINT NOT NULL,
  mood_7 SMALLINT NOT NULL
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

INSERT INTO descriptions(mode_id, tone) VALUES
  ('1','Neutral'),
  ('1','Good Time'),
  ('1','Positive'),
  ('2','Bright'),
  ('2','Triumphant'),
  ('2','Sharp'),
  ('3','Less Bright'),
  ('3','Bluesy'),
  ('3','Fun'),
  ('4','Dark'),
  ('4','Sexy'),
  ('4','Edgy'),
  ('5','Darker'),
  ('5','Melancholy'),
  ('5','Dramatic'),
  ('6','Darkest'),
  ('6','Introspective'),
  ('6','Defiant'),
  ('7','Mostly Unusable'),
  ('7','Gloomy'),
  ('7','Restless');

INSERT INTO alterations(mode_id, alter_2, alter_3, alter_4, alter_5, alter_6, alter_7, mood_1, mood_2, mood_3, mood_4, mood_5, mood_6, mood_7) VALUES
  ('1', '0','0','0','0','0','0', '1','0','0','1','1','0','2'),
  ('2', '0','0','1','0','0','0', '1','1','0','2','1','0','0'),
  ('3', '0','0','0','0','0','-1', '1','0','2','1','0','0','1'),
  ('4', '0','-1','0','0','0','-1', '0','0','1','1','0','2','1'),
  ('5', '0','-1','0','0','-1','-1', '0','2','1','0','0','1','1'),
  ('6', '-1','-1','0','0','-1','-1', '0','1','1','0','2','1','0'),
  ('7', '-1','-1','0','-1','-1','-1', '2','1','0','0','1','1','1');

CREATE USER critter WITH PASSWORD 'critter';
GRANT SELECT, INSERT, UPDATE ON mode TO critter;
GRANT USAGE, SELECT ON SEQUENCE mode_id_seq TO critter;