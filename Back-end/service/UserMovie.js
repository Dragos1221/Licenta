const express = require("express");
const {
  addUserMovie,
  deleteUserMovie,
  getMovieForUser,
} = require("../repository/UserMovieRepository");

const { addRating, getRating } = require("../repository/ratingRepository");

const addUserMovieService = async (req, res) => {
  const { idUser, idMovie } = req.body;
  try {
    await addUserMovie(idUser, idMovie);
    res.status(200).send({ status: true });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ err: err.message });
  }
};

const delUserMovieService = async (req, res) => {
  const { idUser, idMovie } = req.body;
  console.log(idMovie, idUser);
  try {
    await deleteUserMovie(idUser, idMovie);
    res.status(200).send({ status: true });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

const getMovie = async (req, res) => {
  const { idUser } = req.body;
  console.log(idUser, "Dsaaaaa");
  try {
    const data = await getMovieForUser(idUser);
    res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

const addRatingService = async (req, res) => {
  console.log("daa");
  const { idUser, idMovie, rating } = req.body;
  try {
    const data = await addRating(idUser, idMovie, rating);
    res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

const getRatingService = async (req, res) => {
  const { idUser, idMovie } = req.body;
  try {
    const data = await getRating(idUser, idMovie);
    res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

module.exports = {
  addUserMovieService,
  delUserMovieService,
  getMovie,
  addRatingService,
  getRatingService,
};
