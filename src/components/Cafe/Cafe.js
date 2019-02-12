import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Header from "../Header/Header";
import Menu from "../Menu/menu";
import AboutUs from "../AboutUs/AboutUs";
import Hours from "../Hours/Hours";
import CafeLanding from "../CafeLanding/CafeLanding";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddItem from "../AddItem/AddItem";
import setAuthToken from "../../utils/setAuthToken";

// The entry point of the application where we add all of the components to be rendered onto the page.

if (localStorage.espressoToken) {
  // call the setAuth token function
  setAuthToken(localStorage.espressoToken);
  // decode token and get user into and expiration
  const decoded = jwt_decode(localStorage.espressoToken);

  // check for an expired token
  const currentTime = Date.now() / 1000;
  console.log("currentTime: ", currentTime);
  if (decoded.exp < currentTime) {
    // logout the user
    localStorage.removeItem("espressoToken");
    // remove the auth header on future requests
    setAuthToken(false);
  }
}

const Cafe = () => {
  return (
    <Router>
      <main>
        <Header>
          <ul className="headerList">
            <li className="logoItem">
              <a href="#logo" className="logo">
                The Espresso Shop
              </a>
            </li>
            <li className="linkItem">
              <a href="#about">About</a>
            </li>
            <li className="linkItem">
              <a href="#hours">Hours</a>
            </li>
            <li className="linkItem">
              <a href="#menu">Menu</a>
            </li>
          </ul>
        </Header>
        <div>
          <Route
            exact
            path="/"
            component={() => (
              <div>
                <CafeLanding />
                <AboutUs />
                <Hours />
                <Menu />
                <Footer />
              </div>
            )}
          />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/add-items" component={AddItem} />
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default Cafe;
