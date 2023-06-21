"use strict";

require("dotenv").config();
const { db } = require("./src/auth/models/index");
const server = require("./src/server");
const port = process.env.PORT;

db.sync().then(() => {
  server.start(port);
});
