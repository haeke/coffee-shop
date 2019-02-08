import React from "react";
import Fade from "react-reveal/Fade";

import video from "../../assets/video/Double_Espresso.mp4";

import "./CafeLanding.css";

// The Landing page will contain a video element with text overlayed about the company. Maybe change the component such that it could be provided the video source, header title and sub-title as a prop.

const CafeLanding = () => {
  return (
    <section className="cafeLandingContainer">
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        src={video}
        className="videoStyle"
        style={{ width: "100%" }}
      />
      <Fade top>
        <div className="cafeTitleContainer">
          <h1 className="cafeTitleHeader">The Espresso Shop</h1>
          <p className="cafeSubTitle">Coming Soon</p>
        </div>
      </Fade>
    </section>
  );
};

export default CafeLanding;
