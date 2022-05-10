const mongoose = require("mongoose")

const logSchema = mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    movie_id: {type: mongoose.Types.ObjectId},
    status: {type: String, enum : ['watched', 'wishlist', 'none'], default: 'none'}

})
const Log = mongoose.model("Log", logSchema)
module.exports = Log;