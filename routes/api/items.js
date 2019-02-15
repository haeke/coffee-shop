const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// get the Items Model
const Items = require("../../models/Items");

//@route GET api/items/test
//@desc Test route to make sure express is working
//@access Public
router.get("/test", async (req, res) =>
  res.status(200).json({ msg: "Items route works" })
);

//@route GET /api/items/
//@desc return the current list of items
//@access Public
router.get("/", async (req, res) => {
  try {
    let items = await Items.find().sort({ date: -1 });
    console.log("items ", items);
    res.json(items);
  } catch (error) {
    res.status(404).json(error);
  }
});

//@route GET /api/items/
//@desc Add an item to the database
//@access Private - a user needs to be logged in with their JWT present in order to create an item. passport.authenticate ensures that a user is logged before they can create an item.
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Create an object from the request that includes the name, price and description
      const newItem = {
        item_type: req.body.item_type,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
      };
      // pass the object to the Items model
      let item = new Items(newItem);
      // add to the comments array
      console.log("the new item ", item);
      item.save();
      // return the new item array to confirm adding the new item is working.
      res.json(item);
    } catch (error) {
      // Display an error if there is one.
      res.send(404).json(error);
    }
  }
);

//@route GET api/items/:id
//@desc Edit an Item
//@access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log(req.params.id);
      let item = await Items.findById(req.params.id);
      res.json(item);
    } catch (error) {
      res.send(404).json("Item not found.");
    }
  }
);

//@route PATCH api/items/:id
//@desc Edit the properties of an item
//@access Private
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log("id ", req.params.id);
      // Create an object from the request that includes the name, price and description
      const updateItem = {
        _id: req.params.id,
        item_type: req.body.item_type,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
      };
      console.log("updateItem ", updateItem);
      let item = await Items.findByIdAndUpdate(updateItem._id, updateItem);
      item.save();
    } catch (error) {
      res.sendStatus(404).json("Authorization error");
    }
  }
);

//@route DELETE api/items/:id
//@desc Delete an item
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // find the item by its id
      const item = Items.findById(req.params.id);
      // call remove on the item to delete it from the database.
      await item.remove();
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404).json("Cannot Delete Item");
    }
  }
);

module.exports = router;
