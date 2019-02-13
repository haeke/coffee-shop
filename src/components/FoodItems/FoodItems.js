import React from "react";

import MenuItem from "../MenuItem/MenuItem";

const FoodItems = ({ menuData, menuType }) => (
  <div>
    <h1>{menuType.toUpperCase()}</h1>
    {menuData.map(
      items =>
        items.item_type === menuType && (
          <div key={items._id}>
            <MenuItem item={items.name} itemPrice={items.price} />
          </div>
        )
    )}
  </div>
);

export default FoodItems;
