const express = require("express");
const {searchMovies} = require("../repository/moviesRepository")


const getMoviesFromSearch = async (req, res)=>{
    const title = req.body.title;
    try{
        const data = await searchMovies(title);
        res.status(200).send({
            result:data
        })
    }catch(err){
        res.status(400).send({
            err:err
        })
    }
}

module.exports={
    getMoviesFromSearch:getMoviesFromSearch
}