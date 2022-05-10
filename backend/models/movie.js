const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title:{ type: String, required: true},
    director:{ type: String, required: true},
    release_date:{ type: String, required: true},
    imdb_id: {type: String, required:true, unique: true }
})

const Movie = mongoose.model("Movie", movieSchema)
module.exports = Movie;