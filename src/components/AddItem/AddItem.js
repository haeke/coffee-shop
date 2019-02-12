import React from "react";
import api from "../../api/restaurant";

import TextFieldGroup from "../TextFieldGroup/TextFieldGroup";

class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemType: "",
      name: "",
      price: "",
      description: ""
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

    const { name, itemType, price, description } = this.state;
    const { url } = this.props;
    api.post(url, { name, price, description, item_type: itemType });
  };

  render() {
    const { title } = this.props;
    const { name, itemName, price, description, itemType, info } = this.state;
    return (
      <div className="addItemWrapper">
        <h1>{title}</h1>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            name="itemType"
            type="text"
            value={itemType}
            placeholder="Type of Item"
            error={itemName}
            info={info}
            onChange={this.handleChange}
            disabled={false}
          />
          <TextFieldGroup
            name="name"
            type="text"
            value={name}
            placeholder="Name of Item"
            error={itemName}
            info={info}
            onChange={this.handleChange}
            disabled={false}
          />
          <TextFieldGroup
            name="price"
            type="text"
            value={price}
            placeholder="Price of Item"
            error={itemName}
            info={info}
            onChange={this.handleChange}
            disabled={false}
          />
          <TextFieldGroup
            name="description"
            type="text"
            value={description}
            placeholder="Description of Item"
            error={itemName}
            info={info}
            onChange={this.handleChange}
            disabled={false}
          />
          <button type="button" onClick={this.handleSubmit}>
            {title}
          </button>
        </form>
      </div>
    );
  }
}

export default AddItem;
