const User = require('../Model/user')
const { findUser , addUser } = require('../repository/usersRepository');
const bcrypt = require("bcryptjs");

const registerFunction = async (request , response)=>{
    const {user:username , password } = request.body;
    //Validate the user
    const msg ='';
    if(msg !== '')
        response.status(400).send({error:msg});
    
    //Verify if the username is uniq
    const userList = await findUser(username);
    if(userList.length !== 0)
        {
            response.status(400).send({error:"This username is already in use!"});
            return;
        }
        
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = new User(username , hasedPassword);
    try{
        await addUser(user);
        response.status(200).send({message:"Registred"});
    }catch(err)
    {
        response.status(400).send({error:err});
    }
}


module.exports={register: registerFunction};