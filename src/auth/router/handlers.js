"use strict";

const { users } = require("../models/index");

async function handleSignup(req, res, next) {
  try {
    users
      .beforeCreate(req.body.password)
      .then(async (hashedpassword) => {
        let userRecord = await users.create({
          username: req.body.username,
          password: hashedpassword,
        });
        res.status(200).json(userRecord);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.error("Error handleSignup", e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    console.error("Error handleSignin", e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    console.error("Error handleGetUsers", e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("secret");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
};
