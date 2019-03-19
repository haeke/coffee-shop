import React, { Component } from "react";

import auth from "../../api/restaurant";
import setAuth from "../../utils/setAuthToken";
import TextFieldGroup from "../TextFieldGroup/TextFieldGroup";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      error: {},
      errors: {}
    };
  }

  componentDidMount() {
    // use to redirect the user if they are already logged in.
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    // handle the case where the isAuthenticated prop changes
    if (nextProps.auth.isAuthenticated) {
      this.props.push.history("/");
    }
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, password } = this.state;
    auth
      .post("/api/users/login", { name, password })
      .then(res => {
        // we confirmed that we can login
        // res.data.token should return the JWT token
        const { token } = res.data;
        // set the token to local storage
        localStorage.setItem("espressoToken", token);
        // set the auth token to the header of all requests
        setAuth(token);
        // set the isAuthenticated boolean to true
        this.props.setAuthenticated();
      })
      .then(() => {
        // redirect to the homepage after the user is logged in
        this.props.history.push("/");
      })
      .catch(error => {
        // handle setting the appropriate error message if a user cannot login
        this.setState(() => ({
          error: error.response.data
        }));
      });
  };
  render() {
    const { name, password, error } = this.state;
    return (
      <div className="loginWrapper">
        <h2 className="loginHeader">Admin Login</h2>
        <form onSubmit={this.handleSubmit} className="formContainer">
          {!error.auth ? (
            <div className="error">
              <small style={{ color: "red", visibility: "hidden" }}>
                no error to show
              </small>
            </div>
          ) : (
            <div className="error">
              <small style={{ color: "red" }}>{error.auth}</small>
            </div>
          )}

          <TextFieldGroup
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Name..."
          />
          <TextFieldGroup
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password..."
          />
          <button className="loginButton" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
