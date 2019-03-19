import axios from "axios";

let baseURL = "";

if (process.env.REACT_APP_NODE_ENV === "production") {
  baseURL = "https://the-espresso-shop.herokuapp.com";
}

export default axios.create({
  baseURL: baseURL
});
