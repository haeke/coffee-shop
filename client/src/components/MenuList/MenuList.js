import React from "react";
import Fade from "react-reveal/Fade";

import FoodItems from "../FoodItems/FoodItems";

const MenuList = ({ items }) => {
  return (
    <Fade top>
      <section id="menu">
        <h1 style={{ textAlign: "center" }}>Food</h1>
        <div className="menuWrapper">
          <FoodItems menuData={items} menuType="breakfast" />
          <FoodItems menuData={items} menuType="salads" />
          <FoodItems menuData={items} menuType="sandwiches" />
        </div>
        <h1 style={{ textAlign: "center" }}>Drinks</h1>
        <div className="menuWrapper">
          <FoodItems menuData={items} menuType="latte and chai" />
          <FoodItems menuData={items} menuType="specialty" />
          <FoodItems menuData={items} menuType="brew and more" />
        </div>
      </section>
    </Fade>
  );
};

export default MenuList;
