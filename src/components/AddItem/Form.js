import React from "react";
import api from "../../api/restaurant";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
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

    const { name, price, description } = this.state;

    api.post("/api/items/drinks", { name, price, description });
  };

  render() {
    const { children } = this.props;
    return children({
      value: this.state.value,
      handleChange: this.handleChange
    });
  }
}

export default Form;
