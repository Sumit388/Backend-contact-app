const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/details").post(getUserDetails);

module.exports = router;
