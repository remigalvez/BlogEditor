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