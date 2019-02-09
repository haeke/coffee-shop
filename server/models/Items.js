const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  drinks: [
    {
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
    }
  ],
  food: [
    {
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
    }
  ]
});

module.exports = Item = mongoose.model("item", itemSchema);
