import axios from "axios";

const remote = axios.create({
  baseURL: `http://localhost:3300`,
});

const remoteRecommander = axios.create({
  baseURL: `http://127.0.0.1:5000`,
});

const login = (body) => {
  return remote.post("/login", body);
};

const searchMovie = (body) => {
  return remote.post("/movie/search", body);
};

const getMyMovie = (body) => {
  return remote.post("/usrm/getAllMovie", body);
};

const getMovieById = (body) => {
  return remote.post("movie/searchId", body);
};

const addMovieToList = (body) => {
  return remote.post("/usrm/add", body);
};

const deleteMovieFromList = (body) => {
  return remote.post("/usrm/del", body);
};

const addRating = (body) => {
  return remote.post("/usrm/addrating", body);
};

const getRating = (body) => {
  return remote.post("/usrm/getrating", body);
};

const getMovieRecommanded = (body) => {
  return remoteRecommander.post("/reco/movie", body);
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
  getMovieRecommanded,
};
