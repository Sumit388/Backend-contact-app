const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide valid user name"],
    },
    email: {
      type: String,
      required: [true, "Please provide valid Emial Id"],
      unique: [true, "Email address aleady taken."],
    },
    password: {
      type: String,
      required: [true, "Please provide valid password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
