import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// -------------  Layout ----------
import Header from "./Components/Layout/Header";

// ------------ Route --------------
import MainRoute from "./Components/Layout/MainRoute";

// -------------  Script -----------
import Script from "./Public/Script/Script";

// -------------  CSS --------------

import "./Public/Css/Style.css";

// ------------ Pages --------------

import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/SignUp";

const App = props => {
  useEffect(() => {
    Script();
  }, []);

  return (
    <Router>
      <Header />
      <Route
        path="/"
        exact
        render={props => {
          if (localStorage.getItem("user")) {
            props.history.push("/main");
            return;
          }
          return <Login props={props} />;
        }}
      />
      <Route
        path="/main"
        render={props => {
          if (localStorage.getItem("user")) {
            return <MainRoute props={props} />;
          }
          props.history.push("/");
        }}
      />
      <Route
        path="/signup"
        render={props => {
          if (localStorage.getItem("user")) {
            props.history.push("/main");
            return;
          }
          return <SignUp />;
        }}
      />
      <div className="footer" >
        <p>CopyRight &copy; 2019-20</p>
      </div>
    </Router>
  );
};

export default App;
