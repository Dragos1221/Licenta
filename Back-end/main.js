const express = require('express');
var cors = require('cors');
const authRoute = require('./routes/authRoute');
const movieRoute= require('./routes/movieRoute');
const UserMovie =require('./routes/userMovieRoute');

const { addUserMovie} = require('./repository/UserMovieRepository');
const router = require('./routes/authRoute');

const app = express();
const port = 3300;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.use('/',authRoute);
app.use('/movie/',movieRoute);
app.use('/usrm/',UserMovie);
 
app.listen(port, () => {
  console.log(`Started listening at http://localhost:${port}`)
});

const a= async ()=>{
  //console.log(await addUser({username:"Test",password:"parola"}));
  console.log(addUserMovie(1,"tt0000009"))
}


