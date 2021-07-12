const express = require("express");
const {addUserMovieService, delUserMovieService, getMovie} = require('../service/UserMovie');


const router = express.Router();

router.post('/add', addUserMovieService);
router.post('/del', delUserMovieService);
router.post('/search', getMovie);

module.exports=router;