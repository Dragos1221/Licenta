import { LocalSee } from "@material-ui/icons";
import React, { Component, useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import { login } from "../Remote";
import "../styles/loginPageStyle.css";

export default function () {
  document.title = "Partner App Management-Sign In";

  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginFunction = async () => {
    try {
      const result = await login({ username: userName, password: password });
      if (result.data.status === "ok") {
        sessionStorage.setItem("tokenLicenta", result.data.token);
        window.location.assign("/main");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mainContainer">
      <main>
        <div className="loginContainer">
          <LoginComponent
            user={userName}
            password={password}
            login={loginFunction}
            setPassword={setPassword}
            setUser={setUser}
            error={error}
          ></LoginComponent>
        </div>
      </main>
    </div>
  );
}
