const { default: axios } = require("axios");
const { NotFound, Conflict } = require("../middlewares/errorHandler");
const Log = require("../models/log");
const Movie = require("../models/movie");

async function fetchMovie(title){
    const apiUrl = `http://www.omdbapi.com/?apikey=ec35c852&t=${title}`;
    const res = await axios.get(apiUrl);
    
    if(res.data.Error){
        throw new NotFound("Movie not found")
    }

    const {Title,Year,Director,imdbID} = res.data
    return {Title,Year,Director,imdbID};
}

async function getMovie(title){
    const movie = await fetchMovie(title);
    return movie;
}

async function logMovie(data, user, status){
    const movieExists = await Movie.findOne({imdbID: data.imdbID})

    if(movieExists){
        const exists = await Log.findOne({
            user_id: user._id,
            movie_id: movie._id,
            status: status
        })
        if(exists){
            throw new Conflict("Movie Already logged with this status")
        }
        const log = await Log.create({
            user_id: user._id,
            movie_id: movie._id,
            status: status
        })

        return log;
    }

    const movie = await Movie.create({
        title: data.Title,
        director: data.Director,
        release_date: data.Year,
        imdb_id: data.imdbID
    })

    const log = await Log.create({
        user_id: user._id,
        movie_id: movie._id,
        status: status
    })

    return log;

}

module.exports = {getMovie, logMovie}