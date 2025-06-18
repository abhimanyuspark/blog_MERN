const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
