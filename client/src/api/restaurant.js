import axios from "axios";

let baseURL = "";
console.log(process.env.REACT_APP_NODE_ENV);
if (process.env.REACT_APP_NODE_ENV === "production") {
  baseURL = "https://the-espresso-shop.herokuapp.com";
}
console.log(baseURL);
export default axios.create({
  baseURL: baseURL
});
