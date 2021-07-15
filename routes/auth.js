const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {registerValidation, loginValidation} = require("../validation");

//REGISTER
router.post("/register", async (req, res) => {
  //Validate before adding a user
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email is already in DB.
  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send("Email already exists.");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    //Save new user
    const savedUser = await user.save();
    res.send({"user-id": savedUser._id});
  } catch (err) {
    //Catch error
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //Validate before adding loging in user
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email exists in DB.
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Email does not exist.");

  //Check if password is correct.
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
