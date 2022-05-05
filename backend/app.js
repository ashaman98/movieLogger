const express = require('express')
const app = express()
const { default: mongoose } = require('mongoose')
const bodyParser = require("body-parser")
const config = require('./config')
const {errorHandler} = require("./middlewares/errorHandler")
const router = require("./controllers")




app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(router)
app.use(errorHandler)



mongoose.connect(config.mongoPort,function(){
    console.log('Mongo connected!')
})

app.listen(config.port,function(){
    console.log("Server running at " + config.port)
})