const asyncHandler = require("express-async-handler");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register individual contacts
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const fetchedUser = await User.findOne({ email });
  if (fetchedUser) {
    registerUser(400);
    throw new Error("User already exist");
  }

  const hashedPassword = await bycrypt.hash(password, 10);
  const generatedUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (generatedUser) {
    res.status(201).json({
      mesaage: "User registered successfully",
      id: generatedUser.id,
      user_name: generatedUser.user,
    });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const fetchedUser = await User.findOne({ email });
  if (fetchedUser && (await bycrypt.compare(password, fetchedUser.password))) {
    const token = jwt.sign(
      {
        user: {
          name: fetchedUser.name,
          id: fetchedUser.id,
          email: fetchedUser.email,
        },
      },
      process.env.SECERET_KEY,
      { expiresIn: "60m" }
    );
    res.status(200).json({ auth_token: token });
  } else {
    res.status(401);
    throw new Error("Email Id or Password Incorrect");
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  res.status(200).json({ mesaage: "User details fetched successfully", data:req.user });
});

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
};
