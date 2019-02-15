const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
// make a connection to MongoDB
const connect = require("./connect");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");

// import the other routers that are defined
const users = require("./routes/api/users");
const items = require("./routes/api/items");

const app = express();
app.use(cors());

// configure passport with the strategy we have in place
app.use(passport.initialize());
// Passport configuration
require("./config/passport")(passport);

app.use(morgan("dev"));

// body parser urlencoded and json middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routes that we want to use
app.use("/api/users", users);
// Example - should exist on http://localhost:port/api/items/(routes defined in items file)
app.use("/api/items", items);

// Serve the static assets if in production
if (process.env.NODE_ENV === "production") {
  // set a static folder
  app.use(express.static("client/build"));
  // any route should go to the bundled html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 2500;
console.log("port ", port);

connect(process.env.REACT_APP_MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
});
