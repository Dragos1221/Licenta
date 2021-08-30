const pool = require("./connection");

const searchMovies = async (title) => {
  const command = `SELECT * FROM Movie`;
  const prom = new Promise((resolve, reject) => {
    pool.query(command, (err, data) => {
      if (err) reject(err);
      const result = data.reduce((acc, elem) => {
        if (elem.title.toLowerCase().includes(title.toLowerCase())) acc.push(elem);
        return acc;
      }, []);
      resolve(result.slice(0, 100));
    });
  });
  return prom;
};

const getMovieById = async (id) => {
  const command = `SELECT * FROM Movie Where id="${id}" `;
  console.log(command);
  const prom = new Promise((resolve, reject) => {
    pool.query(command, (err, data) => {
      if (err) reject(err);
      if (data !== undefined && data.length != 0) resolve(data[0]);
      resolve({ title: -1 });
    });
  });
  return prom;
};

module.exports = {
  searchMovies: searchMovies,
  getMovieById,
};
