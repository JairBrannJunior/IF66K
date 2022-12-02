create table mylistmovies (
	id serial not null primary key,
	user_id varchar(100) not null,
	movie_id varchar(20) not null,
	movie_name varchar(200) not null,
	movie_img varchar(500) not null,
	watched boolean not null default false
)

create table moviecomments (
	id serial not null primary key,
	comment varchar not null,
	user_id varchar(100) not null,
	user_name varchar(100) not null,
	movie_id varchar(20) not null
)

create table users (
	id serial not null primary key,
	name varchar(200) not null,
	email varchar(200) not null,
	password varchar(50) not null
)