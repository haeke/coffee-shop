import React from "react";
import GoogleMap from "../GoogleMap/GoogleMap";

import "./Location.css";

const Location = () => {
  return (
    <div className="locationContainer">
      <GoogleMap />
      <div className="locationText">
        <h2 className="locationTextHeader">Our Location</h2>
        <h2 className="locationTextSubHeader">52 E 13th St</h2>
        <h2 className="locationTextSubHeader">New York, NY 10003</h2>
      </div>
    </div>
  );
};

export default Location;
