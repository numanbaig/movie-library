const { Sequelize } = require("sequelize");

function initializeDatabase() {
  const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: `mysql`,
    }
  );

  async function checkDatabaseConnection() {
    try {
      await sequelize.authenticate();
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }

  return { sequelize, checkDatabaseConnection };
}

module.exports = initializeDatabase;