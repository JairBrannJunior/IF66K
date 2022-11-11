create table mylistmovies (
	id serial not null primary key,
	user_id varchar(100) not null,
	movie_id varchar(20) not null,
	movie_name varchar(200) not null,
	movie_img varchar(500) not null
)