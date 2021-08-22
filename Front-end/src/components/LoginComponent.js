import React, { Component, useEffect } from "react";
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

export default function LoginComponent({
  userName,
  password,
  login,
  setUser,
  setPassword,
  error,
}) {
  const onEnterPress = (e) => {
    if (e === "Enter") login();
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
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
            onKeyDown={(e) => {
              onEnterPress(e.key);
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
            onKeyDown={(e) => {
              onEnterPress(e.key);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => {
              login();
            }}
          >
            Sign In
          </Button>
          <Button
            style={{ marginTop: "20px" }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.assign("/register");
            }}
          >
            Rgister
          </Button>
        </form>
      </div>
    </Container>
  );
}
