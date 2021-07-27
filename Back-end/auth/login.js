const express = require("express");
const User = require("../Model/user");
const { findUser, addUser } = require("../repository/usersRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const route = express.Router();

const login = async (request, response) => {
  console.log("Fac login", request.body);
  const { username, password } = request.body;
  console.log(username, password);
  //Validate data
  const msg = "";
  if (msg !== "") response.status(400).send({ error: msg });
  //Verify if the username exist
  const userList = await findUser(username);
  console.log(userList.length);
  if (userList.length !== 1)
    response.status(400).send({ error: "Username is not found" });
  //Verify
  const databaseUser = new User(userList[0].user, userList[0].password);
  const id = userList[0].id;
  const validPass = bcrypt.compare(databaseUser.password, password);
  if (!validPass) response.status(400).send({ error: "Password is incorect" });
  response.status(200).send({ status: "ok", token: id });
};

module.exports = { login: login };
