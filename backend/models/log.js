const mongoose = require("mongoose")

const logSchema = mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    movie_id: {type: mongoose.Types.ObjectId},
    status: String

})
const Log = mongoose.model("Log", logSchema)
module.exports = Log;