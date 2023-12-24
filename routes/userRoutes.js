const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");
const validatetoken=require("../middleware/validateTokenHandler")

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/details").get(validatetoken, getUserDetails);

module.exports = router;
