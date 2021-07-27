const pool = require("./connection");

const add = async (idUser, idMovies) => {
  console.log("am ajuns");
  const command = `Insert IGNORE into UserMovie(idUser,idMovie) Values ('${idUser}','${idMovies}')`;
  const prom = new Promise((resolve, reject) => {
    pool.query(command, (err, data) => {
      if (err) throw Error;
      resolve(data);
    });
  });
  return prom;
};

const del = async (idUser, idMovie) => {
  const command = `DELETE FROM UserMovie WHERE idUser = ${idUser} and idMovie = '${idMovie}' `;
  const prom = new Promise((resolve, reject) => {
    pool.query(command, (err, data) => {
      if (err) throw Error;
      resolve(data);
    });
  });
  return prom;
};

const getMovieForUser = async (id) => {
  const vCommand = `Select * from UserMovie Where iduser = ${id}`;
  const prom = new Promise((resolve, reject) => {
    pool.query(vCommand, (err, data) => {
      if (err) throw Error;
      resolve(data);
    });
  });
  return prom;
};

const getAllMovieDetails=async (id) => {
  const vCommand = `Select * from Movie INNER JOIN UserMovie ON UserMovie.idUser=${id} AND Movie.id = UserMovie.idMovie`;
  const prom = new Promise((resolve, reject) => {
    pool.query(vCommand, (err, data) => {
      if (err) throw Error;
      resolve(data);
    });
  });
  return prom;
};

module.exports = {
  addUserMovie: add,
  deleteUserMovie: del,
  getMovieForUser: getMovieForUser,
  getAllMovieDetails
};
