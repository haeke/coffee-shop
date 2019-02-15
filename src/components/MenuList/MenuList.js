import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import restaurantApi from "../../api/restaurant";

import FoodItems from "../FoodItems/FoodItems";
// Query's the MongoDB store to list of items on the Menu in the home page.
class MenuList extends Component {
  constructor(props) {
    super(props);
    //used to prevent calling setState when the component unmounts
    this._hasData = false;
    this.state = {
      data: "",
      dataLoaded: false
    };
  }

  componentDidMount() {
    restaurantApi
      .get("/api/items")
      .then(res => {
        this.getMenu(res.data);
      })
      .catch(error => {
        console.error("Error : ", error);
      });
  }

  componentWillUnmount() {
    this._hasData = false;
  }

  getMenu = result => {
    this._hasData = true;
    if (this._hasData) {
      this.setState({
        data: result,
        dataLoaded: true
      });
    }
  };
  render() {
    const { data, dataLoaded } = this.state;
    if (data === "" || dataLoaded === false) {
      return <div>Loading...</div>;
    } else {
      return (
        <Fade top>
          <section id="menu">
            <h1 style={{ textAlign: "center" }}>Food</h1>
            <div className="menuWrapper">
              <FoodItems menuData={data} menuType="breakfast" />
              <FoodItems menuData={data} menuType="salads" />
              <FoodItems menuData={data} menuType="sandwiches" />
            </div>
            <h1 style={{ textAlign: "center" }}>Drinks</h1>
            <div className="menuWrapper">
              <FoodItems menuData={data} menuType="latte and chai" />
              <FoodItems menuData={data} menuType="specialty" />
              <FoodItems menuData={data} menuType="brew and more" />
            </div>
          </section>
        </Fade>
      );
    }
  }
}

export default MenuList;
