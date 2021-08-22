import { LocalSee } from "@material-ui/icons";
import React, { Component, useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import { login } from "../Remote";
import "../styles/loginPageStyle.css";
import { TextField, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../styles/loginStyle.css";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import { register } from "../Remote";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cssLabel: {},

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#C0C0C0 !important`,
    },
  },

  cssFocused: {
    color: "black !important",
  },

  notchedOutline: {
    borderWidth: "1px",
  },
}));

export default function RegisterPage() {
  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setPassword2] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setMessage] = useState("");
  const classes = useStyles();

  const registerf = () => {
    if (password !== repetPassword) {
      setError(true);
      setMessage("Passwords are not identical");
    } else {
      try {
        register({ username: userName, password });
        window.location.assign("/");
      } catch (err) {
        setMessage(err);
      }
    }
  };

  return (
    <div className="mainContainer">
      <main>
        <div className="loginContainer">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <EmojiPeopleIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <h2 style={{ textAlign: "center", color: "red" }}>
                  {errorMessage}
                </h2>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  style={{
                    color: "balck",
                  }}
                  id="user"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={userName}
                  autoFocus
                  error={error}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    inputMode: "numeric",
                  }}
                />
                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    inputMode: "numeric",
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  error={error}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    inputMode: "numeric",
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={repetPassword}
                  error={error}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    registerf();
                  }}
                >
                  Register
                </Button>
              </form>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}
