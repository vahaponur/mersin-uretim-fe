import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import DailyReport from "./DailyReport";
import CustomReport from "./CustomReport";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  // Check if user is logged in from local storage
  const initialLoginStatus = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);

  useEffect(() => {
    // Save the login status to local storage whenever it changes
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Header />
      {isLoggedIn ? (
        <><Switch>
          <Route exact path="/" component={DailyReport} />
          <Route exact path="/daily" component={DailyReport} />
          <Route exact path="/custom" component={CustomReport} />
        </Switch></>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
};

export default App;
