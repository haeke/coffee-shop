import React from "react";
import GoogleMap from "../GoogleMap/GoogleMap";

import "./Location.css";

const Location = () => {
  return (
    <div className="locationContainer">
      <GoogleMap />
      <div className="locationText">
        <h2>Our Location</h2>
      </div>
    </div>
  );
};

export default Location;
