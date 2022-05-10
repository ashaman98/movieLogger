const express = require("express");
const verifyToken = require("../middlewares/authToken");
const router = express.Router();
const moviesService = require("../services/movies_service");

router.get("/:title",verifyToken, getMovie);
router.post("/:status",verifyToken, logMovie);

async function getMovie(req, res, next) {
  try {
    const { title } = req.params;
    const result = await moviesService.getMovie(title);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

async function logMovie(req, res, next) {
  try {
    const { status } = req.params;
    const result = await moviesService.logMovie(req.body, req.user, status);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
