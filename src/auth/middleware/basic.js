"use strict";

const base64 = require("base-64");
const { users } = require("../models/index");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }

  let basic = req.headers.authorization.split(" ").pop();
  let [username, pass] = base64.decode(basic).split(":");

  try {
    req.user = await users
      .authenticateBasic(username, pass)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.error("Erorr basic middleware", e);
    res.status(403).send("Invalid Login");
  }
};
