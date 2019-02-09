const express = require("express");
const router = express.Router();

//@route Get api/items/test
//@desc Test route to make sure express is working
//@access Public
router.get("/test", async (req, res) =>
  res.status(200).json({ msg: "Items route works" })
);

module.exports = router;
