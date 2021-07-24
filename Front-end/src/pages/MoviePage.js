import { Details, Movie } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Container from "@material-ui/core/Container";
import { getMovieById, addRating, getRating } from "../Remote";
import Rating from "@material-ui/lab/Rating";
import "../styles/moviePage.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default function MoviePage() {
  const classes = useStyles();
  const [movie, setMovie] = useState({});
  const [myRating, setMyRating] = useState(0);

  useEffect(async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idMovie = urlParams.get("id");
    const idUser = sessionStorage.getItem("tokenLicenta");
    console.log(idMovie);
    try {
      const movie = await getMovieById({ id: idMovie });
      const rating = await getRating({ idUser, idMovie });
      if (rating.data.data.length > 0)
        setMyRating(rating.data.data[0].rating || 0);
      setMovie(movie.data.movie);
      console.log(movie);
    } catch (err) {
      setMovie({ title: "Nu s-a putut incarca", actors: "None" });
    }
  }, []);

  const addratingEvent = async (event, newValue) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idMovie = urlParams.get("id");
    const idUser = sessionStorage.getItem("tokenLicenta");

    try {
      await addRating({ idMovie: idMovie, idUser, rating: newValue });
    } catch (err) {
      alert("a  crapat adaugare rating");
    }
  };

  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div className="title-container">
            <h1>{movie.title}</h1>
          </div>
          <div className="details-container">
            <div className="one-details">
              <h2>Actors:</h2>
              <span className="detail">{movie.actors}</span>
            </div>
            <div className="">
              <h2>Description</h2>
              <span className="detail">{movie.description}</span>
            </div>
            <div className="one-details">
              <h2>Country:</h2>
              <span className="detail">{movie.country}</span>
            </div>
            <div className="one-details">
              <h2>Director:</h2>
              <span className="detail">{movie.director}</span>
            </div>
            <div className="one-details">
              <h2>Genre:</h2>
              <span className="detail">{movie.genre}</span>
            </div>
            <div className="one-details">
              <h2>Writer:</h2>
              <span className="detail">{movie.writer}</span>
            </div>
            <div className="one-details">
              <h2>Give rating:</h2>
              <Rating
                readOnly={myRating !== 0}
                name="simple-controlled"
                value={myRating}
                onChange={addratingEvent}
              />
            </div>
            <div className="one-details">
              <h2>Movie rating:</h2>
              <Rating
                name="simple-controlled"
                value={5}
                onChange={(event, newValue) => {}}
              />
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
