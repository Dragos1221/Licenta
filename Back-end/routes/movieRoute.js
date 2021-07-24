const express = require("express");
const { getMoviesFromSearch, getMovieById } = require("../service/Movie");

const router = express.Router();

router.post("/search", getMoviesFromSearch);
router.post("/searchId", getMovieById);

module.exports = router;
