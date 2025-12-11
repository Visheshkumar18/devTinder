const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { auth } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      password, 
      email, 
      skills, 
      about, 
      age, 
      gender,
      photoUrl 
    } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      password: encryptedPassword,
      email,
      photoUrl,
      skills,
      about,
      age,
      gender,
    });

    await user.save();
    res.send("User created successfully");

  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("enter the email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invaild credentials!!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // create a token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      // sending token to the user
      res.cookie("token", token);
      const loggedInUser=user;
      res.send(user);
    }
    // never enter these message Enter correct password its is data leaking
    // instead use invalid creditials
    else {
      res.send("Invaild credentials!!");
    }
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.send("Logout Successfully !!!");
});

module.exports = authRouter;
