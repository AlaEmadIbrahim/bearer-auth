"use strict";

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, secret, {
          expiresIn: "15 min",
        });
      },
    },
  });

  model.beforeCreate = async function (user) {
    let hashedPass = await bcrypt.hash(user, 10);
    user = hashedPass;
    return hashedPass;
  };

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error("Invalid User");
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, secret);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error("authenticateToken Error :", e.message);
    }
  };

  return model;
};

module.exports = userSchema;
