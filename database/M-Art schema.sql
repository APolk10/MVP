
CREATE DATABASE mvp;

CREATE TABLE stats
(
  country VARCHAR(100),
  country_iso VARCHAR(5),
  track_hits INT,
  PRIMARY KEY (country)
);