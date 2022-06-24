require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

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
      .status(200)
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
const login = async (req, res) => {};
const logout = (req, res) => {
  console.log("user logout");
  res.clearCookie("usertoken");
  res.status(200).json({ msg: "logout" });
};
const getLoggedInUser = (req, res) => {};
module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};
