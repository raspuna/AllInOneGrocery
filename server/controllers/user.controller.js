require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    await User.init();
    const newUser = await user.save(req.body);
    const userToken = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
      },
      process.env.SECRET_KEY
    );
    res
      .cookie("userToken", userToken, {
        httpOnly: true,
      })
      .json({
        successMessage: "user created",
        user: {
          _id: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
        },
      });
  } catch (err) {
    console.log("User registration error", err);
    res.status(500).json(err);
  }
};
const login = async (req, res) => {
  const userDoc = await User.findOne({ email: req.body.email });
  if (!userDoc) {
    console.log("user not found");
    res.status(400).json({ message: "Invalid login" });
    return;
  }
  try {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      userDoc.password
    );
    if (!isPasswordValid) {
      console.log("password mismatch");
      res.status(400).json({ message: "Invalid login" });
      return;
    }
    const userToken = jwt.sign(
      {
        _id: userDoc._id,
        email: userDoc.email,
        firstName: userDoc.firstName,
      },
      process.env.SECRET_KEY
    );
    if (userDoc.roll === "Admin") {
      res
        .cookie("userToken", userToken, {
          httpOnly: true,
        })
        .json({ message: "admin login", roll: "Admin" });
    } else {
      res
        .cookie("userToken", userToken, {
          httpOnly: true,
        })
        .json({ message: "login success" });
    }
  } catch (err) {
    console.log("login err:", err);
    res.status(400).json({ message: "Invalid login" });
  }
};
const logout = (req, res) => {
  console.log("user logout");
  res.clearCookie("userToken");
  res.status(200).json({ msg: "logout" });
};
const getLoggedInUser = async (req, res) => {
  try {
    const userLoggedIn = jwt.verify(
      req.cookie.userToken,
      process.env.SECRET_KEY
    );
    const user = await User.findOne({ _id: userLoggedIn._id });
    res.status(200).json(user);
  } catch (err) {
    console.log("Get logged in user error:", err);
    res.status(500).json({ err });
  }
};
module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};
