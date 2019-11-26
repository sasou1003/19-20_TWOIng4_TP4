var express = require('express');
var router = express.Router();
const API = require('../routes/omdbAPI');
const _ = require('lodash');

let movies = [];
let newAPI = new API();

/* GET all movies. */
router.get('/', (req, res) => {
    // Get List of user and return JSON
    res.status(200).json({ movies });
});

/* GET one movie. */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find movie in DB by id
    const filmChoisi = _.find(movies, ["id", id]);
    // Return movie
    if(!filmChoisi){
        res.status(200).json({
            message : 'Film non trouvé'
        });
    }
    else {
        res.status(200).json({
            message: 'Film trouvé !',
            movie: filmChoisi
        /*
        movies: [
            {
            message: 'Film trouvé',
            id: id,
            title: filmChoisi.title,
            year: filmChoisi.year,
            duration: filmChoisi.duration,
            actors: filmChoisi.actors,
            director: filmChoisi.director,
            poster: filmChoisi.poster,
            awards: filmChoisi.awards
            } ]
            */
    });
    }

});


/* PUT new movie. */
router.put('/', (req, res) => {
    // Get the data from request from request
    const title = req.body.title;
    // Create new unique id
    //const id = _.uniqueId();

    if (!title) {
        res.status(200).json({
            message: 'Film introuvable'
        });

        res.status(200).json({
            message: `Ajout ${id}`,
            movieAdded: movie,
        })
    } else {
        const movie = _.find(movies, ["title", title]);

        if (!movie) {
            const api = newAPI
                .fetchTitle(title)
                .then(function (response) {

                    // Récupère la donnée d'une API
                    const data = response.data;

                    const id = data.imdbID;
                    const title = data.Title;
                    const year = parseInt(data.Year);
                    const duration = parseInt(data.Runtime);
                    const actors = data.Actors;
                    const director = data.Director;
                    const poster = data.Poster;
                    const awards = data.Awards;

                    movies.push({
                        id: id,
                        title: title,
                        year: year,
                        duration: duration,
                        actors: actors,
                        director: director,
                        poster: poster,
                        awards: awards
                    });

                    res.status(200).json({
                        movies: [
                            {
                                message: `${title} a été ajouté`,
                                id: id,
                                year: year,
                                duration: duration,
                                actors: actors,
                                director: director,
                                poster: poster,
                                awards: awards
                            }]
                    })
                })
                .catch(function (error) {
                    // Affiche une erreur
                    console.error(error);
                });
        }
    }
});



/* DELETE user. */
router.delete('/:id', (req, res) => {
    // Get the :id of the user we want to delete from the params of the request
    const { id } = req.params;
    const movie = _.find(movies, ['id', id]);

    // Remove from "DB"
    _.remove(movies, ["id", id]);

    // Return message
    res.json({
        message: `Le film '${movie.title} a été supprimé`
    });
});


/* UPDATE user. */
router.post('/:id', (req, res) => {
    // Get the :id of the user we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the user we want to update from the body of the request
    const { duration } = req.body;
    // Find in DB
    const movieToUpdate = _.find(movies, ['id', id]);
    // Update data with new data (js is by address)
    movieToUpdate.duration = duration;

    // Return message
    res.json({
        message: `Mise à jour de la durée du film du film ${movieToUpdate.title} `
    });
});

module.exports = router;