const movieModel= require('../models/movieModel');
const { Op } = require('sequelize');

const insertMoive = async (req, res,next) => {
  try {
      const { movieName, duration, rating } = req.body;
      const movie = await movieModel.create({
          movieName,
          duration,
          rating,
      });
      res.status(201).json(movie);
  } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ error: 'Could not create the movie' });
  }
}
const getAllmovies = async (req, res) => {
  try {
    const { page = 1, perPage = 10, name, rating, sortBy, sortOrder } = req.query;

    // Ensure page is at least 1
    const pageInt = Math.max(1, parseInt(page, 10));

    const options = {
      limit: Number(perPage),
      offset: (pageInt - 1) * Number(perPage),
      where: {
        // Add filtering conditions based on 'name' and 'rating' here.
      },
      order: [['movieName', sortOrder || 'ASC']],
    };

    if (name) {
      options.where.movieName = {
        [Op.like]: `%${name}%`
      };
    }

    const { count, rows } = await movieModel.findAndCountAll(options);

    // Construct the response object
    const response = {
      total: count, // Total number of movies
      page: pageInt,
      perPage: perPage,
      movies: rows, // Movies for the current page
    };

    res.json(response);
  } catch (error) {
    console.error('Error retrieving movies:', error);
    res.status(500).json({ error: 'Could not retrieve movies' });
  }
};






const getMoviebyId=async (req, res,next) => {
  const movieId = req.params.id;
  try {
      const movie = await movieModel.findByPk(movieId);
      if (movie) {
          res.json(movie);
      } else {
          res.status(404).json({ error: 'Movie not found' });
      }
  } catch (error) {
      console.error('Error retrieving movie:', error);
      res.status(500).json({ error: 'Could not retrieve the movie' });
  }
}

const updateMoviebyId= async (req, res,next) => {
  const movieId = req.params.id;
  const { movieName, duration, rating } = req.body;
  try {
      const [updatedRows] = await movieModel.update(
          { movieName, duration, rating },
          {
              where: { id: movieId },
          }
      );
      if (updatedRows > 0) {
          res.json({ message: 'Movie updated successfully' });
      } else {
          res.status(404).json({ error: 'Movie not found' });
      }
  } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ error: 'Could not update the movie' });
  }
}

const deleteMovie=async (req, res,next) => {
  const movieId = req.params.id;
  try {
      const deletedRows = await movieModel.destroy({
          where: { id: movieId },
      });
      if (deletedRows > 0) {
          res.json({ message: 'Movie deleted successfully' });
      } else {
          res.status(404).json({ error: 'Movie not found' });
      }
  } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ error: 'Could not delete the movie' });
  }
}

  module.exports={
    insertMoive,
    getAllmovies,
    getMoviebyId,
    updateMoviebyId,
    deleteMovie
  }

