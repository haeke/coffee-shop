import React from "react";
import Fade from "react-reveal/Fade";

import "./AboutUs.css";

// Used to display the company mission and first preview of the menu.

const AboutUs = () => {
  return (
    <section className="aboutWrapper" id="about">
      <Fade left>
        <div className="aboutUsMission">
          <h1 className="aboutHeader">About Us</h1>
          <p className="aboutSubTitle">
            We strive to deliver the best tasting Coffee that you can get on the
            East Coast.
          </p>
        </div>
      </Fade>
      <Fade right>
        <div className="imgWrapper">
          <img src="https://i.imgur.com/IfxTrNN.jpg" alt="Temp Logo" />
          <div className="aboutInfoContainer">
            <h1 className="aboutInfoHeader"> LOOK AT OUR MENU</h1>
            <h1 className="aboutInfoHeader">FULL OF DELICIOUS DRINKS</h1>
            <button className="menuButton">
              <a href="#menu">SHOW MENU</a>
            </button>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default AboutUs;
