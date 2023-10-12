const express = require('express')
const movieRouter = express.Router();

const {
    insertMoive,
    getAllmovies,
    updateMoviebyId,
    getMoviebyId,
    deleteMovie
} = require("../controller/movieController");


movieRouter.post('/', insertMoive);
movieRouter.get('/', getAllmovies);
movieRouter.get('/:id', getMoviebyId);
movieRouter.put('/:id', updateMoviebyId);
movieRouter.delete('/:id', deleteMovie);



module.exports = { movieRouter };