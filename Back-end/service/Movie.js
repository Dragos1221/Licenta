const express = require("express");
const {
  searchMovies,
  getMovieById,
} = require("../repository/moviesRepository");

const getMoviesFromSearch = async (req, res) => {
  const title = req.body.title;
  try {
    const data = await searchMovies(title);
    res.status(200).send({
      result: data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({
      err: err,
    });
  }
};

const getMovieByIdService = async (req, res) => {
  const id = req.body.id;
  try {
    const data = await getMovieById(id);
    res.status(200).send({
      movie: data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({
      err: err,
    });
  }
};

module.exports = {
  getMoviesFromSearch: getMoviesFromSearch,
  getMovieById: getMovieByIdService,
};
