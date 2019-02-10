import React from "react";

import Header from "../Header/Header";
import Menu from "../Menu/menu";
import AboutUs from "../AboutUs/AboutUs";
import Hours from "../Hours/Hours";
import CafeLanding from "../CafeLanding/CafeLanding";
import Footer from "../Footer/Footer";

import AddItem from "../AddItem/AddItem";

// The entry point of the application where we add all of the components to be rendered onto the page.

const Cafe = () => {
  return (
    <main>
      <Header>
        <ul className="headerList">
          <li className="logoItem">
            <a href="#logo" className="logo">
              The Espresso Shop
            </a>
          </li>
          <li className="linkItem">
            <a href="#about">About</a>
          </li>
          <li className="linkItem">
            <a href="#hours">Hours</a>
          </li>
          <li className="linkItem">
            <a href="#menu">Menu</a>
          </li>
        </ul>
      </Header>
      {/* <AddItem url="/api/items/drinks" title="Add Drink" />
      <AddItem url="/api/items/food" title="Add Food" /> */}
      <CafeLanding />
      <AboutUs />
      <Hours />
      <Menu />
      <Footer />
    </main>
  );
};

export default Cafe;
