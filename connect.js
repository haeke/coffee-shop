const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// The helper function that takes in a URL that will connect us to the MongoDB database. The connect function is being used in server.js
const connect = url =>
  mongoose.connect(url, {
    useNewUrlParser: true
  });

module.exports = connect;
