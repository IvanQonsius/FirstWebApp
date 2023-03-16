const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // Use the DATABASE_URL environment variable in production
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  // Use a local SQLite database file in development
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite'
  });

  // Synchronize the models with the database schema in development
  sequelize.sync();
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.names = require('./models/names.model')(sequelize, Sequelize);

module.exports = db;