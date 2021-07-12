const express = require("express");
const {addUserMovie, deleteUserMovie, getMovieForUser} = require("../repository/UserMovieRepository")


const addUserMovieService = async (req, res)=>{
    const{idUser, idMovie} = req.body;
    try{
        await addUserMovie(idUser,idMovie);
        res.status(200).send({status:true});
    }catch(err){
        console.log(err.message);
        res.status(400).send({err:err.message});
    }
}

const delUserMovieService = async (req, res)=>{
    const{id} = req.body;
    try{
        await deleteUserMovie(id);
        res.status(200).send({status:true});
    }catch(err){
        res.status(400).send({err:err});
    }
}


const getMovie = async(req,res)=>{
    const{idUser} = req.body;
    console.log(idUser,"Dsaaaaa")
    try{
        const data = await getMovieForUser(idUser)
        res.status(200).send({status:true, data:data});
    }catch(err){
        res.status(400).send({err:err.message});
    }
}



module.exports={
    addUserMovieService,
    delUserMovieService,
    getMovie
}