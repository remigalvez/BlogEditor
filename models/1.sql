CREATE DATABASE apv_db;

CREATE TABLE feed (
	id serial primary key,
	title varchar(255),
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