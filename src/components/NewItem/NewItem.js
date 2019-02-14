import React from "react";
import Fade from "react-reveal/Fade";
import "./NewItem.css";

const NewItem = ({ items }) => {
  return (
    <div className="newItemWrapper">
      {items.map(item => (
        <div className="itemContainer" key={item._id}>
          <Fade right>
            <div className="itemWrapper">
              <p className="type">Type: {item.item_type}</p>
              <p className="itemName">Name: {item.name}</p>
              <p className="itemPrice">Price: ${item.price}</p>
              <p className="itemDescription">Description: {item.description}</p>
            </div>
          </Fade>
        </div>
      ))}
    </div>
  );
};

export default NewItem;
