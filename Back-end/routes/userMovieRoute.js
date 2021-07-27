const express = require("express");
const {
  addUserMovieService,
  delUserMovieService,
  getMovie,
  addRatingService,
  getRatingService,
  getAllMovieDetailsService,
} = require("../service/UserMovie");

const router = express.Router();

router.post("/add", addUserMovieService);
router.post("/del", delUserMovieService);
router.post("/search", getMovie);
router.post("/addRating", addRatingService);
router.post("/getRating", getRatingService);
router.post("/getAllMovie", getAllMovieDetailsService);

module.exports = router;
