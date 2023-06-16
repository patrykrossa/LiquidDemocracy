CREATE DATABASE liquid_democracy_database;

CREATE TABLE people(
    person_id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    living_address VARCHAR(150) NOT NULL,
    PESEL VARCHAR(20) NOT NULL UNIQUE
);
CREATE TABLE loglevels(
    loglevel_id SERIAL PRIMARY KEY,
    loglevel VARCHAR(20) NOT NULL UNIQUE
);
CREATE TABLE logs(
    log_id SERIAL PRIMARY KEY,
    description VARCHAR(1000) NOT NULL,
    loglevel_id INTEGER,
    date TIMESTAMP,
    CONSTRAINT fk_loglevel FOREIGN KEY(loglevel_id) 
        REFERENCES loglevels(loglevel_id)
        ON DELETE SET NULL
        ON UPDATE NO ACTION
);
CREATE TABLE actiontypes(
    actiontype_id SERIAL PRIMARY KEY,
    actiontype VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    details VARCHAR(1000),
    actiontype_id INTEGER,
    CONSTRAINT fk_actiontypes FOREIGN KEY(actiontype_id) 
        REFERENCES actiontypes(actiontype_id)
        ON DELETE SET NULL
        ON UPDATE NO ACTION
);