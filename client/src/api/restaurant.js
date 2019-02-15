import axios from "axios";

let baseURL = "https://the-espresso-shop.herokuapp.com";
if (process.env.NODE_ENV === "production") {
  baseURL = "https://the-espresso-shop.herokuapp.com";
}

export default axios.create({
  baseURL: baseURL
});
