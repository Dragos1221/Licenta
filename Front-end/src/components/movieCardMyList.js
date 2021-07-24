import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getMovieById, deleteMovieFromList } from "../Remote";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ({ details, refreshList }) {
  const classes = useStyles();
  const { idMovie } = details;
  const [movie, setMovie] = useState({ title: "", actors: "" });
  useEffect(async () => {
    try {
      const movie = await getMovieById({ id: idMovie });
      setMovie(movie.data.movie);
    } catch (err) {
      setMovie({ title: "Nu s-a putut incarca", actors: "None" });
    }
  }, []);

  const deleteMovie = async () => {
    const idUser = sessionStorage.getItem("tokenLicenta");
    try {
      await deleteMovieFromList({
        idUser,
        idMovie: idMovie,
      });
      refreshList();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.actors}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            deleteMovie();
          }}
        >
          Delete
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.location.assign(`/movie?id=${movie.id}`);
          }}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  );
}
