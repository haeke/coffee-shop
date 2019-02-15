import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import "./NewItem.css";

// This component takes the list of items that a user currently entered and lists them on the page for reference.

const NewItem = ({ items, deleteItem }) => {
  return (
    <div className="newItemWrapper">
      {items.map(item => (
        <div className="itemContainer" key={`${item.item_type}-${item.name}`}>
          <div className="newItem">
            <h1 className="newItemHeader">New Item</h1>
          </div>
          <Fade right>
            <div className="itemWrapper">
              <p className="type">Type: {item.item_type}</p>
              <p className="itemName">Name: {item.name}</p>
              <p className="itemPrice">Price: ${item.price}</p>
              <p className="itemDescription">Description: {item.description}</p>
              <Link to={`/edit-item/${item._id}`}>Edit Item</Link>
            </div>
          </Fade>
        </div>
      ))}
    </div>
  );
};

export default NewItem;
