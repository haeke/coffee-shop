const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: String,
  item_type: { type: String },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("item", itemSchema);
