import React, { Component } from "react";
import jwt_decode from "jwt-decode";

import auth from "../../api/restaurant";
import setAuth from "../../utils/setAuthToken";
import TextFieldGroup from "../TextFieldGroup/TextFieldGroup";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      isAuthenticated: false
    };
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
        // res.data should return the JWT token
        const { token } = res.data;
        // set the token to local storage
        localStorage.setItem("espressoToken", token);
        // set the auth token to the header of all requests
        setAuth(token);
        // decode token to get the user data
        const decoded = jwt_decode(token);
        console.log("res ", decoded);
      })
      .then(() => {
        this.setState(prevState => ({
          isAuthenticated: !prevState
        }));

        this.props.history.push("/");
      })
      .catch(error => {
        console.error("error: ", error);
      });
  };
  render() {
    const { name, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
