import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { addMovieToList } from "../Remote";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ({ details, isInList, refresList }) {
  const classes = useStyles();
  const { title, actors } = details;

  const addMovie = async () => {
    const token = sessionStorage.getItem("tokenLicenta");
    console.log("fac call");
    try {
      await addMovieToList({ idUser: token, idMovie: details.id });
      await refresList();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {actors}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!isInList ? (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              addMovie();
            }}
          >
            Add to my list
          </Button>
        ) : (
          ""
        )}

        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.location.assign(`/movie?id=${details.id}`);
          }}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  );
}
