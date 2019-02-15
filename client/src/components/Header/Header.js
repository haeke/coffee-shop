import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./Header.css";

// The header component accepts a css class if you want to override the default style of the header and a React node as a child for reusablity purposes.

const Header = ({ headerStyle, children }) => {
  return (
    <header className={classnames("headerContainer", headerStyle)}>
      {children}
    </header>
  );
};

Header.propTypes = {
  headerStyle: PropTypes.string,
  children: PropTypes.node
};

Header.defaultProps = {
  headerStyle: "",
  children: undefined
};

export default Header;
