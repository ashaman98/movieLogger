const { default: axios } = require("axios");
const { NotFound, Conflict, InternalServerError } = require("../middlewares/errorHandler");
const Log = require("../models/log");
const Movie = require("../models/movie");
const { startSession } = require("mongoose");
const User = require("../models/user");

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
    const movieExists = await Movie.findOne({imdb_id: data.imdbID})

    if(movieExists){

        const exists = await Log.findOne({
            user_id: user._id,
            movie_id: movieExists._id,
            status: status
        })
        if(exists){
            throw new Conflict("Movie Already logged with this status")
        }
        const log = await Log.create({
            user_id: user._id,
            movie_id: movieExists._id,
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

async function getList(user_id){
    console.log("Commencing retrieval of user's movies")
    const user = await User.findById(user_id);
    if (!user) throw new NotFound("user not found");
    
    const session = await startSession()

    try{
        session.startTransaction()
        const userLogs = await Log.find({user_id: user_id},null,{session})
        if(!userLogs) throw new NotFound("User has no entries")
        console.log(userLogs)

        console.log("getting the movie list")
        const movieList = []

        for (const elem of userLogs){
            const data = await Movie.findOne({_id: elem.movie_id}, null,{session})
            //data['status'] = elem.status                                 TODO: add the status to entry
                                                                        //ERROR:Cannot set properties of null (setting 'status')
            movieList.push(data)
        }
    
        await session.commitTransaction();
        session.endSession();
        console.log("Succesfully retrieved data");

        return movieList;

    }catch(err){
        console.log("Transaction failed, reverting changes");
        await session.abortTransaction();
        session.endSession();
        console.log(err.message);
        
        throw new InternalServerError("Internal error")
    }
}

module.exports = {getMovie, logMovie, getList}