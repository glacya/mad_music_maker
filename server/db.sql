drop database week4;
create database week4;
use week4;

create table users(
    id varchar(20) not null primary key,
    pw varchar(88) not null,
    salt varchar(88) not null
);

create table musics(
    music_id int not null primary key,
    author_id varchar(20) not null,
    music_name varchar(32) character set utf8 collate utf8_general_ci not null 
);