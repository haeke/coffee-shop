import React, { Component } from "react";
import api from "../../api/restaurant";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Header from "../Header/Header";
import MenuList from "../MenuList/MenuList";
import AboutUs from "../AboutUs/AboutUs";
import Hours from "../Hours/Hours";
import CafeLanding from "../CafeLanding/CafeLanding";
import Footer from "../Footer/Footer";
import Location from "../Location/Location";
import Login from "../Login/Login";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import EditItem from "../EditItem/EditItem";
import AddItem from "../AddItem/AddItem";
import setAuthToken from "../../utils/setAuthToken";

import "./Cafe.css";

// The entry point of the application where we add all of the components to be rendered onto the page.

class Cafe extends Component {
  constructor(props) {
    super(props);
    this._hasData = false;
    this.state = {
      isAuthenticated: false,
      items: []
    };
  }

  componentDidMount() {
    if (localStorage.espressoToken) {
      // call the setAuth token function
      setAuthToken(localStorage.espressoToken);
      // decode token and get user into and expiration
      const decoded = jwt_decode(localStorage.espressoToken);
      // check for an expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // logout the user
        localStorage.removeItem("espressoToken");
        // remove the auth header on future requests
        setAuthToken(false);
      }

      this.setAuthenticated();
    }

    api
      .get("/api/items")
      .then(res => {
        this.getMenu(res.data);
      })
      .catch(error => {
        console.error("Error : ", error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isAuthenticated !== this.state.isAuthenticated) {
      this.setAuthenticated();
    }
  }

  componentWillUnmount() {
    this._hasData = false;
  }

  getMenu = result => {
    this._hasData = true;
    if (this._hasData) {
      this.setState({
        items: result,
        dataLoaded: true
      });
    }
  };

  logOut = () => {
    // logout the user
    localStorage.removeItem("espressoToken");
    this.setState({
      isAuthenticated: false
    });
    // remove the auth header on future requests
    setAuthToken(false);
  };

  setAuthenticated = () => {
    // set the authenticated state to true
    this.setState(() => ({
      isAuthenticated: true
    }));
  };

  render() {
    const { items } = this.state;
    return (
      <Router>
        <main>
          <div>
            <Route
              exact
              path="/"
              component={() => (
                <div>
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
                      {this.state.isAuthenticated ? (
                        <React.Fragment>
                          <li className="linkItem">
                            <Link to="/add-items">Add-Items</Link>
                          </li>
                          <li className="linkItem">
                            <Link to="/">
                              <button
                                className="logoutButton"
                                onClick={this.logOut}
                              >
                                Logout
                              </button>
                            </Link>
                          </li>
                        </React.Fragment>
                      ) : (
                        <li className="linkItem">
                          <Link to="/login">Login</Link>
                        </li>
                      )}
                    </ul>
                  </Header>
                  <CafeLanding />
                  <AboutUs />
                  <Location />
                  <Hours />
                  <MenuList items={items} />
                  <Footer />
                </div>
              )}
            />
            <Route
              exact
              path="/login"
              component={props => (
                <React.Fragment>
                  <Header>
                    <ul className="headerList">
                      <li className="logoItem">
                        <Link to="/" className="logo">
                          The Espresso Shop
                        </Link>
                      </li>
                      <li className="linkItem">
                        <Link to="/">Home</Link>
                      </li>
                    </ul>
                  </Header>
                  <Login
                    isAuthenticated={this.state.isAuthenticated}
                    setAuthenticated={this.setAuthenticated}
                    {...props}
                  />
                </React.Fragment>
              )}
            />
            <Switch>
              <PrivateRoute
                exact
                path="/add-items"
                auth={this.state.isAuthenticated}
                component={props => (
                  <React.Fragment>
                    <Header>
                      <ul className="headerList">
                        <li className="logoItem">
                          <Link to="/" className="logo">
                            The Espresso Shop
                          </Link>
                        </li>
                        <li className="linkItem">
                          <Link to="/">Home</Link>
                        </li>
                        {this.state.isAuthenticated ? (
                          <li className="linkItem">
                            <Link to="/add-items">Add-Items</Link>
                          </li>
                        ) : (
                          <li className="linkItem">
                            <Link to="/login">Login</Link>
                          </li>
                        )}
                      </ul>
                    </Header>
                    <AddItem
                      title="Add Items"
                      url="/api/items/"
                      items={items}
                      getMenu={this.getMenu}
                      {...props}
                    />
                  </React.Fragment>
                )}
              />
              <PrivateRoute
                exact
                path="/edit-item/:id"
                auth={this.state.isAuthenticated}
                component={props => (
                  <React.Fragment>
                    <Header>
                      <ul className="headerList">
                        <li className="logoItem">
                          <Link to="/" className="logo">
                            The Espresso Shop
                          </Link>
                        </li>
                        <li className="linkItem">
                          <Link to="/">Home</Link>
                        </li>
                      </ul>
                    </Header>
                    <EditItem
                      getMenu={this.getMenu}
                      title="Edit Item"
                      url="/api/items"
                      {...props}
                    />
                  </React.Fragment>
                )}
              />
            </Switch>
          </div>
        </main>
      </Router>
    );
  }
}

export default Cafe;
