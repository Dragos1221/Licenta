const connection = require("./connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);


const searchMovies = async (title)=>{
    const command = `SELECT * FROM Movie`

    console.log(command)
    try{
        const data =await query(command);
        const result = data.reduce((acc,elem)=>
        {
            if(elem.title.includes(title))
                acc.push(elem)
            return acc;
        },[])
        return result;
    }catch(err){
        throw new Error(err);
    }
}

module.exports ={
   searchMovies:searchMovies,
}