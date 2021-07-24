const express = require("express");
const {
  addUserMovieService,
  delUserMovieService,
  getMovie,
  addRatingService,
  getRatingService,
} = require("../service/UserMovie");

const router = express.Router();

router.post("/add", addUserMovieService);
router.post("/del", delUserMovieService);
router.post("/search", getMovie);
router.post("/addRating", addRatingService);
router.post("/getRating", getRatingService);

module.exports = router;
