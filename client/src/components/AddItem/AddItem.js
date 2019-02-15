import React from "react";
import api from "../../api/restaurant";

import TextFieldGroup from "../TextFieldGroup/TextFieldGroup";
import NewItem from "../NewItem/NewItem";

import "./AddItem.css";

class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemType: "breakfast",
      name: "",
      price: "",
      description: ""
    };
  }

  // componentDidMount() {
  //   api.get("/api/items").then(res => {
  //     this.setState({
  //       items: res.data
  //     });
  //   });
  // }

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
    // reset the text after submitting
    this.setState(() => ({
      name: "",
      itemType: "",
      price: "",
      description: ""
    }));
    // Makes a request to Mongo to update the current menu on the homepage.
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
    const { title, items } = this.props;
    const { name, itemName, price, description, itemType, info } = this.state;
    return (
      <div className="addItemContainer">
        <div className="addItemWrapper">
          <h1 className="addItemHeader">{title}</h1>
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
          </form>
        </div>
        {items.length > 0 && <NewItem items={items} />}
      </div>
    );
  }
}

export default AddItem;
