CREATE DATABASE apv_db;

CREATE TABLE feed (
	id serial primary key,
	title varchar(255),
	tags varchar(255)[],
	message text,
	vote_up int default 0,
	vote_down int default 0,
	visits int default 0,
	timestamp timestamp
);

CREATE TABLE comments (
	id serial primary key, 
	user_id int,
	user_name varchar(255),
	feed_id int,
	comment text,
	vote_up int default 0,
	vote_down int default 0,
	timestamp timestamp
);

CREATE TABLE tags (
	id serial primary key,
	feed_id int,
	tag varchar(255)
);

// Primary key should be combined username/email
CREATE TABLE users (
	id serial primary key,
	username varchar(255),
	email varchar(255),
	password varchar(255),
	liked int[],
	comments int[]
);