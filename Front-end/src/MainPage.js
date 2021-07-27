import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//Material ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
//My components
import MovieCard from "./components/movieCard";
import Navigation from "./components/NavBar";
import { searchMovie, getMyMovie } from "./Remote";

//Style
import "./styles/mainPage.css";

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

export default function Dashboard() {
  const classes = useStyles();
  const [movieList, setMovie] = useState([]);
  const [searchInput, setSearch] = useState("");
  const [myMovie, setMyMovie] = useState([]);

  useEffect(async () => {
    try {
      getMovies();
    } catch (err) {
      alert(err + "crapa my movie");
    }
  }, []);

  const getMovies = async () => {
    const idUser = sessionStorage.getItem("tokenLicenta");
    const result = await getMyMovie({ idUser: idUser });
    setMyMovie(result.data.data);
  };

  const searchMovies = async () => {
    if (searchInput !== "")
      try {
        const result = await searchMovie({ title: searchInput });
        setMovie(result.data.result);
      } catch (err) {
        alert(err + "main page");
      }
  };

  const isInMyList = (movieId) => {
    var ok = false;
    console.log(myMovie);
    myMovie.forEach((e) => {
      if (e.title === movieId) {
        ok = true;
      }
    });
    return ok;
  };

  const getGridItems = () => {
    return movieList.reduce((reducer, item) => {
      reducer.push(
        <Grid item>
          <MovieCard
            details={item}
            isInList={isInMyList(item.title)}
            refresList={getMovies}
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
          <div className="searchContainer">
            <div>
              <InputLabel htmlFor="outlined-adornment-amount">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={searchInput}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                startAdornment={<SearchIcon position="start">$</SearchIcon>}
                labelWidth={60}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() => {
                searchMovies();
              }}
            >
              Search
            </Button>
          </div>
          <Grid container spacing={5}>
            {getGridItems()}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
