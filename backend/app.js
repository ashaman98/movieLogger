const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const { errorHandler } = require("./middlewares/errorHandler");
const router = require("./controllers");
const path = require("path");

app.use(express.static(path.join(__dirname, "../ui/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../ui/build/", "index.html"));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

mongoose.connect(config.mongoPort, function () {
  console.log("Mongo connected!");
});

app.listen(config.port, function () {
  console.log("Server running at " + config.port);
});
