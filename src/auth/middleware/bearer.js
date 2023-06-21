"use strict";

const { users } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next("Invalid Login");
    }

    const token = req.headers.authorization.split(" ").pop();
    const validUser = await users
      .authenticateToken(token)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.error("Erorr bearer middleware", e);
    res.status(403).send("Invalid Login");
  }
};
