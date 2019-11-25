var express = require('express');
var router = express.Router();

let movies = [];

/* GET all movies. */
router.get('/', (req, res) => {
    // Get List of user and return JSON
    res.status(200).json({ movies });
});

/* GET one movie. */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find movie in DB by id
    const movie = _.find(movies, ["id", id]);
    // Return user
    res.status(200).json({
        message: 'Movie found!',
        movie
    });
});


/* PUT new movie. */
router.put('/', (req, res) => {
    // Get the data from request from request
    const { movie } = req.body;
    // Create new unique id
    const id = _.uniqueId();

    // Insert it in array (normaly with connect the data with the database)
    movies.push({ movie, id });
    // Return message
    res.json({
        message: `Ajout du film : ${id}`,
        movie: { movie, id }
    });
});

/* DELETE user. */
router.delete('/:id', (req, res) => {
    // Get the :id of the user we want to delete from the params of the request
    const { id } = req.params;

    // Remove from "DB"
    _.remove(movies, ["id", id]);

    // Return message
    res.json({
        message: `Le film avec l'${id} a été supprimé`
    });
});

/* UPDATE user. */
router.post('/:id', (req, res) => {
    // Get the :id of the user we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the user we want to update from the body of the request
    const { movie } = req.body;
    // Find in DB
    const movieToUpdate = _.find(movies, ["id", id]);
    // Update data with new data (js is by address)
    movieToUpdate.movie = movie;

    // Return message
    res.json({
        message: `Mise à jour du titre du film n° ${id} `
    });
});

module.exports = router;