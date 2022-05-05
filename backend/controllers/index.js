const express = require('express')
const router = express.Router()
const usersRouter = require("./userController")

router.use("/user", usersRouter)

module.exports = router