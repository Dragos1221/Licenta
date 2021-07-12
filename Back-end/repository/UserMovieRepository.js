const connection = require("./connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);


const add = async (idUser , idMovies)=>{
    const vCommand = `Select * from UserMovie Where iduser = ${idUser} and idMovie ='${idMovies}'`;
    try{
        const data =await query(vCommand);
        if(data.length > 0)
            throw new Error("Exista");
    }catch(err){
        throw new Error(err.message);
    }
    console.log("eee")
    const command =`Insert IGNORE into UserMovie(idUser,idMovie) Values ('${idUser}','${idMovies}')`;
    try{
        const data =await query(command);
        return true;
    }catch(err){
        throw new Error("err");
    }
}

const  del = async(id) =>{
    const command=`DELETE FROM UserMovie WHERE id = ${id}`;
    try{
        const data = await query(command);
        return true;
    }catch(err){
        throw new Error(err);
    }
}

const getMovieForUser = async (id) =>{
    const vCommand = `Select * from UserMovie Where iduser = ${id}`;
    try{
        const data =await query(vCommand);
        return data;
    }catch(err){
        throw new Error(err.message);
    }
}


module.exports={
    addUserMovie:add,
    deleteUserMovie:del,
    getMovieForUser:getMovieForUser
}