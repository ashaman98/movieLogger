const express = require('express')
const router = express.Router()
const usersRouter = require("./userController")
const moviesRouter = require("./movieController")

router.use("/user", usersRouter)
router.use("/movies", moviesRouter)

module.exports = router