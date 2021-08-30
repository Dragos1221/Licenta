import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//Material ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
//My components
import MovieCard from "../components/movieCard";
import Navigation from "../components/NavBar";
import { getMyMovie } from "../Remote";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import Toople from "../components/toople";
import { getMovieRecommandedList } from "../Remote";

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
  const [movieRec, setListRec] = useState([]);
  const [l, setL] = useState([]);
  const [recomList, setRecom] = useState([]);

  useEffect(() => {
    try {
      getMovieList();
    } catch (err) {
      alert(err + "crapa my movie");
    }
  }, []);

  useEffect(() => {
    console.log("da");
  }, [movieRec]);

  const getMovieList = async () => {
    const idUser = sessionStorage.getItem("tokenLicenta");
    const result = await getMyMovie({ idUser: idUser });
    setMovie(result.data.data);
  };

  const getGridItems = () => {
    return movieList.reduce((reducer, item) => {
      reducer.push(
        <Grid key={item.id} item style={{ marginTop: "10px" }}>
          <Toople
            item={item}
            getMovieList={getMovieList}
            addF={addRec}
            delF={delRec}
          ></Toople>
        </Grid>
      );
      return reducer;
    }, []);
  };

  const getGridItems2 = () => {
    return recomList.reduce((reducer, item) => {
      reducer.push(
        <Grid key={item.id} item style={{ marginTop: "10px" }}>
          <MovieCard details={item} buttons={false}></MovieCard>
        </Grid>
      );
      return reducer;
    }, []);
  };

  const addRec = (item) => {
    var list = movieRec;
    list.push(item);
    var l2 = [...l];
    l2.push(item);
    setListRec(list);
    setL(l2);
  };

  const delRec = (item) => {
    var list = [...l];
    list = list.filter((itemList) => itemList.id !== item.id);
    setL(list);
  };

  const getListMovieRecom = () => {
    var list = l.reduce((reducer, item) => {
      reducer.push(item.title);
      return reducer;
    }, []);
    return list;
  };

  const getRecom = async (l) => {
    try {
      const result = await getMovieRecommandedList({ test_list_imdb: l });
      setRecom(result.data);
    } catch (e) {
      window.alert("Eroare");
    }
  };

  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <h2>Movie for recomandation:</h2>
          <ul>
            {l.reduce((reducer, item) => {
              reducer.push(
                <li key={item.id} style={{ fontSize: 20 }}>
                  {item.title}
                </li>
              );
              return reducer;
            }, [])}
          </ul>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              const l = getListMovieRecom();
              const recom = getRecom(l);
            }}
          >
            Make recommendations
          </Button>
          <div className="searchContainer"></div>
          <h2>Filme recomandate:</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <Grid container spacing={5}>
              {getGridItems2()}
            </Grid>
          </div>

          <h2>Your movie list:</h2>
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
