import axios from "axios";

let baseURL = "http://localhost:3040";
if (process.env.NODE_ENV === "production") {
  baseURL = "https://the-espresso-shop.herokuapp.com/";
}
export default axios.create({
  baseURL: baseURL
});
