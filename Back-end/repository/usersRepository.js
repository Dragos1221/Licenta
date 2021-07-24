const pool = require("./connection");

const getAllUsers = async () => {
  const connection = require("./connection");
  const util = require("util");
  const query = util.promisify(connection.query).bind(connection);

  let l;
  const data = await query("Select * from User");
  connection.end();
  return data;
};

const addUser = async (user) => {
  const { username, password } = user;
  const command = `INSERT INTO User (user, password) VALUES ('${username}', '${password}')`;
  const prom = new Promise((resolve, reject) => {
    pool.query(command, (err, data) => {
      if (err) throw Error;
      resolve(data);
    });
  });
};

const findUser = async (username) => {
  const command = `Select * from User Where user = '${username}'`;
  const prom = new Promise((resolve, reject) => {
    pool.query(command, (err, data) => {
      if (err) throw Error;
      resolve(data);
    });
  });
  return prom;
};

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser,
  findUser: findUser,
};
