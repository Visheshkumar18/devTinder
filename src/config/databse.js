const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://vk2256087:vishesh123@cluster0.uwsaw7m.mongodb.net/devTinder");
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); 
  }
};



module.exports = connectDb;
