const pool = require("./connection");

const addRating = async (idUser, idMovies, rating) => {
  const command = `INSERT INTO Rating( idMovie, idUser, rating) VALUES ('${idMovies}',${idUser},${rating})`;
  const prom = new Promise((resolve, reject) => {
    pool.query(command, (err, data) => {
      if (err) throw Error;
      resolve(data);
    });
  });
  return prom;
};

const getRating = async (idUser, idMovies) => {
  const command = `Select * from Rating Where idUser = ${idUser} and idMovie = '${idMovies}'`;
  const prom = new Promise((resolve, reject) => {
    pool.query(command, (err, data) => {
      if (err) throw Error;
      resolve(data);
    });
  });
  return prom;
};

module.exports = {
  addRating,
  getRating,
};
