"use strict";

const express = require("express");
const authRouter = express.Router();

const basicAuth = require("../middleware/basic");
const bearerAuth = require("../middleware/bearer");
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
} = require("./handlers");

authRouter.post("/signup", handleSignup);
authRouter.post("/signin", basicAuth, handleSignin);
authRouter.get("/users", bearerAuth, handleGetUsers);
authRouter.get("/secret", bearerAuth, handleSecret);

module.exports = authRouter;
