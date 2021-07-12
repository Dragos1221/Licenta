const express = require("express");
const {getMoviesFromSearch} = require('../service/Movie')

const router = express.Router();

router.post('/search',getMoviesFromSearch);


module.exports=router;