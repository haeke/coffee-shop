const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

// load the User Model
const User = require("../../models/Users");

//@route Get api/items/test
//@desc Test route to make sure express is working
//@access Public
router.get("/test", async (req, res) =>
  res.status(200).json({ msg: "Users route works" })
);

// @route GET api/users/register
// @desc Register a user
// @access Public
router.post("/register", async (req, res) => {
  let user = await User.findOne({ name: req.body.name });

  if (user) {
    return res.status(400).json({ user: "Auth error" });
  } else {
    // creates a new user object based on the User model that was created
    const newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // handle encrypting the password passed to the route
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) throw error;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(error => console.error(error));
      });
    });
  }
});

//@route POST /api/users/login
//@desc Login User / Return a JWT
//@access Public
router.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  let user = await User.findOne({ name });
  console.log(user);
  // check to see if the user exists
  if (user) {
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched - so create a JWT payload
        const payload = { id: user.id, name: user.name };
        // sign token -
        jwt.sign(
          payload,
          process.env.REACT_APP_SERVER_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              sucess: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ auth: "Auth Error occured" });
      }
    });
  } else {
    return res.status(400).json({ user: "Auth error" });
  }
});

//@route GET api/users/current
//@desc return current user using json web tokens
//@access Private/Protected route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
