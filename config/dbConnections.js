const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connected successfully",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error(err?.message);
    process.exit(1);
  }
};

module.exports = connectDb;
