import React from "react";

import "./Footer.css";

// A simple Footer that just provides the Copyright year.

const Footer = () => {
  let date = new Date();
  return (
    <footer className="footerWrapper">
      <h1 className="footerHeader">Copyright | {date.getFullYear()}</h1>
    </footer>
  );
};

export default Footer;
