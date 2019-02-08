import React from "react";
import Fade from "react-reveal/Fade";
import MenuItem from "../MenuItem/MenuItem";

import "./menu.css";

// Used to display the menu items for sale, the name and price for each item is provided to another component called MenuItem.

const Menu = () => {
  return (
    <Fade top>
      <section className="menuWrapper" id="menu">
        <div>
          <h3>Latte and chai</h3>
          <MenuItem item="Latte and Cappuccino" itemPrice="$4.00" />
          <MenuItem item="Mocha" itemPrice="$2.75" />
          <MenuItem item="White Mocha" itemPrice="$3.00" />
        </div>
        <div>
          <h3>Specialty</h3>
          <MenuItem item="Doppio" itemPrice="$2.50" />
          <MenuItem item="Machiatto" itemPrice="$3.50" />
          <MenuItem item="Cortado" itemPrice="$3.50" />
        </div>
        <div>
          <h3>Brew and More</h3>
          <MenuItem item="Drip" itemPrice="$1.70" />
          <MenuItem item="Toddy Cold Brew" itemPrice="$2.25" />
          <MenuItem item="Pour Over" itemPrice="$3.25" />
          <MenuItem item="Chemex" itemPrice="$3.50" />
          <MenuItem item="Kale Smoothie" itemPrice="$6.00" />
        </div>
      </section>
    </Fade>
  );
};

export default Menu;
