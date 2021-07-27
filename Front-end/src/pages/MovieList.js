import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//Material ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
//My components
import MovieCard from "../components/movieCardMyList";
import Navigation from "../components/NavBar";
import { getMyMovie } from "../Remote";

//Style
import "../styles/mainPage.css";

const drawerWidth = 240;

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

export default function () {
  const classes = useStyles();
  const [movieList, setMovie] = useState([]);

  useEffect(() => {
    try {
      getMovieList();
    } catch (err) {
      alert(err + "crapa my movie");
    }
  }, []);

  const getMovieList = async () => {
    const idUser = sessionStorage.getItem("tokenLicenta");
    const result = await getMyMovie({ idUser: idUser });
    console.log(result);
    setMovie(result.data.data);
  };

  const getGridItems = () => {
    return movieList.reduce((reducer, item) => {
      reducer.push(
        <Grid key={item.id} item style={{ marginTop: "10px" }}>
          <MovieCard
            key={item.id}
            details={item}
            refreshList={getMovieList}
          ></MovieCard>
        </Grid>
      );
      return reducer;
    }, []);
  };

  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div className="searchContainer"></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            {getGridItems()}
          </div>
        </Container>
      </main>
    </div>
  );
}
