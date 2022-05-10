const express = require("express");
const router = express.Router();
const userService = require("../services/users_service");

router.post("/", signup);
router.get("/:id", findUser);
router.post("/session", login);

async function signup(req, res, next) {
  try {
    const result = await userService.signUp(req);
    return res.status(201).send(result);
  } catch (err) {
    next(err);
  }
}
async function login(req, res, next) {
  try {
    const token = await userService.login(req.body);
    res.send(token);
  } catch (err) {
    next(err);
  }
}
async function findUser(req, res, next) {
  try {
    const myUser = await userService.getUser(req.params.id);
    res.send(myUser);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
