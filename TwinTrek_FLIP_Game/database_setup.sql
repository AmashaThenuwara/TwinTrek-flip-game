-- TwinTrek FLIP Game - MySQL Database Setup Script
-- Run this script in your MySQL Workbench or phpMyAdmin before starting the backend server!

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS twintrek_db;

-- 2. Use the database
USE twintrek_db;

-- NOTE: You DO NOT need to manually create the tables (like `player`, `game_session`, etc.). 
-- Spring Boot and Hibernate will automatically create all required tables for you 
-- when you run the backend server thanks to the `spring.jpa.hibernate.ddl-auto=update` property!
