const connection = require("./connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

const getAllUsers = async ()=>{
    let l;
    const data =await query('Select * from User');   
    return data;
}

const addUser = async (user)=>{
    const {username, password}= user;
    const command = `INSERT INTO User (user, password) VALUES ('${username}', '${password}')`
    try{
        const data =await query(command);
        return user;
    }catch(err){
        throw new Error(err);
    }
}

const findUser = async (username) =>{
    const command =`Select * from User Where user = '${username}'`;
    try{
        const data = await query(command);
        return data;
    }catch(err){
        throw new Error(err);
    }
}




module.exports ={
    getAllUsers:getAllUsers,
    addUser :addUser,
    findUser:findUser
}