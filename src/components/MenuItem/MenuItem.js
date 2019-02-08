import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./MenuItem.css";

// Menu Item is reponsible for providing the style, item name and price.

const MenuItem = ({
  menuStyle,
  item,
  itemStyle,
  itemPrice,
  itemPriceStyle
}) => {
  return (
    <div className={classnames("menuItem", menuStyle)}>
      <p className={itemStyle}>{item}</p>
      <p className={itemPriceStyle}>{itemPrice}</p>
    </div>
  );
};

MenuItem.propTypes = {
  menuStyle: PropTypes.string,
  item: PropTypes.string,
  itemStyle: PropTypes.string,
  itemPrice: PropTypes.string,
  itemPriceStyle: PropTypes.string
};

export default MenuItem;
