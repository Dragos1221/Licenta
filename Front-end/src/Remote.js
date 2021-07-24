import axios from "axios";

const remote = axios.create({
  baseURL: `http://localhost:3300`,
});

const login = (body) => {
  return remote.post("/login", body);
};

const searchMovie = (body) => {
  return remote.post("/movie/search", body);
};

const getMyMovie = (body) => {
  return remote.post("/usrm/search", body);
};

const getMovieById = (body) => {
  return remote.post("movie/searchId", body);
};

const addMovieToList = (body) => {
  return remote.post("/usrm/add", body);
};

const deleteMovieFromList = (body) => {
  console.log("body", body);
  return remote.post("/usrm/del", body);
};

const addRating = (body) => {
  return remote.post("/usrm/addrating", body);
};

const getRating = (body) => {
  return remote.post("/usrm/getrating", body);
};
export {
  login,
  searchMovie,
  getMyMovie,
  getMovieById,
  addMovieToList,
  deleteMovieFromList,
  addRating,
  getRating,
};
