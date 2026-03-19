/**
 * backend/config/database.js
 * Database connection configuration
 */

const { Sequelize } = require('sequelize');
const path = require('path');

// สร้างการเชื่อมต่อกับฐานข้อมูล SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'music.sqlite'),
  logging: false
});

module.exports = sequelize;
