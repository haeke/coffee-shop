import axios from "axios";

let baseURL = "http://localhost:3040";
// When pushing to heroku we need to use the heroku domain to make API requests
if (process.env.NODE_ENV === "production") {
  baseURL = "https://the-espresso-shop.herokuapp.com";
}
export default axios.create({
  baseURL: baseURL
});
