const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// get the Items Model
const Items = require("../../models/Items");
const Drinks = require("../../models/Drinks");
const Food = require("../../models/Food");

//@route GET api/items/test
//@desc Test route to make sure express is working
//@access Public
router.get("/test", async (req, res) =>
  res.status(200).json({ msg: "Items route works" })
);

//@route GET /api/items/drinks
//@desc return the current list of items
//@access Public
router.get("/drinks", async (req, res) => {
  try {
    let items = await Drinks.find().sort({ date: -1 });
    console.log("items ", items);
    res.json(items);
  } catch (error) {
    res.status(404).json(error);
  }
});

//@route GET /api/items/drinks
//@desc Add an item to the database
//@access Public but it will be private soon.
router.post("/drinks", async (req, res) => {
  try {
    // pass the object to the Items model
    let item = new Drinks({
      name: req.body.name,
      other: req.body.other,
      price: req.body.price,
      description: req.body.description
    });
    // call save on the item
    item.save();
    // return the new item array to confirm adding the new item is working.
    res.json(item);
  } catch (error) {
    // Display an error if there is one.
    res.send(404).json(error);
  }
});

//@route GET /api/items/food
//@desc return the current list of items
//@access Public
router.get("/food", async (req, res) => {
  try {
    let items = await Food.find().sort({ date: -1 });
    console.log("items ", items);
    res.json(items);
  } catch (error) {
    res.status(404).json(error);
  }
});

//@route GET /api/items/food
//@desc Add an item to the database
//@access Public but it will be private soon.
router.post("/food", async (req, res) => {
  try {
    // Create an object from the request that includes the name, price and description
    const newItem = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };
    // pass the object to the Items model
    let item = new Food(newItem);
    // call save on the item
    item.save();
    // return the new item array to confirm adding the new item is working.
    res.json(item);
  } catch (error) {
    // Display an error if there is one.
    res.send(404).json(error);
  }
});

module.exports = router;
