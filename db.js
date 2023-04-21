const { Sequelize } = require('sequelize');

let sequelize;

sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite'
});

// Synchronize the models with the database schema in development
sequelize.sync();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.names = require('./models/names.model')(sequelize, Sequelize);

module.exports = db;