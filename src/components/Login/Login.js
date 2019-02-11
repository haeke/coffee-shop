import React, { Component } from "react";
import auth from "../../api/restaurant";
import TextFieldGroup from "../TextFieldGroup/TextFieldGroup";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: ""
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
      .post("/api/users/register", { name, password })
      .then(res => {
        console.log("res ", res);
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
