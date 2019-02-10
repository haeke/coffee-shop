const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
// make a connection to MongoDB
const connect = require("./connect");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");

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

const port = process.env.PORT || 2000;

connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
});
