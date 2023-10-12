const { DataTypes } = require('sequelize');
const initializeDatabase = require('../config/connection');

const { sequelize } = initializeDatabase();

const Movie = sequelize.define('Movie', {
  movieName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
    },
  },
  duration: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.1,
      max: 12, 
    },
  },
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: false,
    validate: {
      isDecimal: true, 
      min: 0, 
      max: 10, 
    },
  },
});

Movie.sync();


module.exports = Movie;