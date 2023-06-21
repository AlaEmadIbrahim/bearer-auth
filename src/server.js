"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT;

const errorHandler = require("./error-handlers/500");
const notFound = require("./error-handlers/404");
const authRoutes = require("./auth/router/index");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.use(notFound);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => {
    console.log(`Server Listening on PORT ${port}`);
  });
}

module.exports = {
  server: app,
  start,
};
