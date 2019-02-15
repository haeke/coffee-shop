import React, { Component } from "react";
import api from "../../api/restaurant";

import TextFieldGroup from "../TextFieldGroup/TextFieldGroup";

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemType: "",
      name: "",
      price: "",
      description: ""
    };
  }

  componentDidMount() {
    // Get the item that we are for by looking the item up by its ID
    api
      .get(`/api/items/${this.props.match.params.id}`)
      .then(res => {
        console.table(res.data);
        this.setState({
          itemType: res.data.item_type,
          name: res.data.name,
          price: res.data.price,
          description: res.data.description
        });
      })
      .catch(error => console.error(error));
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  deleteItem = async () => {
    // Delete an item from Mongo by looking for its ID
    try {
      await api.delete(`/api/items/${this.props.match.params.id}`);
      api
        .get("/api/items")
        .then(res => {
          this.props.getMenu(res.data);
        })
        .catch(error => {
          console.error("Error : ", error);
        });
      this.props.history.push("/");
    } catch (error) {
      console.error("error ", error);
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { name, itemType, price, description } = this.state;
    const { url } = this.props;
    api.patch(`${url}/${this.props.match.params.id}`, {
      _id: this.props.match.params.id,
      name,
      price,
      description,
      item_type: itemType
    });
    // reset the text after submitting
    this.setState(() => ({
      name: "",
      itemType: "",
      price: "",
      description: ""
    }));
    // make a request to Mongo for the current list of items
    api
      .get("/api/items")
      .then(res => {
        this.props.getMenu(res.data);
      })
      .catch(error => {
        console.error("Error : ", error);
      });
  };
  render() {
    const { title } = this.props;
    const { name, itemName, price, description, itemType, info } = this.state;
    return (
      <div className="editItemContainer">
        <div className="editItemWrapper">
          <h1 className="editItemHeader">{title}</h1>
          <form className="addItemForm" onSubmit={this.handleSubmit}>
            <div className="field">
              <select
                name="itemType"
                value={itemType}
                onChange={this.handleChange}
                className="inputField"
              >
                <option value="breakfast">Breakfast</option>
                <option value="salads">Salads</option>
                <option value="sandwiches">Sandwiches</option>
                <option value="latte and chai">Latte and Chai</option>
                <option value="specialty">Specialty</option>
                <option value="brew and more">Brew and More</option>
              </select>
            </div>
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
            <button
              className="addItemButton"
              type="button"
              onClick={this.handleSubmit}
            >
              {title}
            </button>
            <button
              className="addItemButton"
              type="button"
              onClick={this.deleteItem}
            >
              Delete Item
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditItem;
