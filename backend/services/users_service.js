const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
  BadRequest,
  Conflict,
  NotFound,
} = require("../middlewares/errorHandler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

async function signUp(reqData) {
  const data = reqData.body;
  const existingUser = await User.findOne({ username: data.username });

  if (existingUser) {
    throw new Conflict("User already exists");
  }

  const newUser = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    password: data.password,
    email: data.email,
    role: data.role,
  });
  const myToken = jwt.sign(
    {
      id: newUser._id,
    },
    jwtSecret,
    { expiresIn: "5h" }
  );
 
  return myToken;
}

async function getUser(id) {
  return await User.findById(id);
}

async function login(data) {
  const user = await User.findOne({
    username: data.username,
    password: data.password,
  });
  if (!user) {
    throw new NotFound("User Not Found");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    jwtSecret,
    { expiresIn: "5h" }
  );

  return token;
}

module.exports = { signUp, login, getUser };
