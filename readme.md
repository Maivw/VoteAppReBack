1. psql

create user vote_app with password 'password' createdb;

create database vote_app_db with owner vote_app;


tao database
npx dotenv sequelize-cli db:create

migrate
npx dotenv sequelize-cli db:migrate

seed

npx dotenv sequelize-cli db:seed:all

drop database

npx dotenv sequelize-cli db:drop
