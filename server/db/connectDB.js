const mongoose=require("mongoose");
const dotenv=require("dotenv");
const connectDB = async () => {
  dotenv.config();
  const mongoURI = process.env.MONGODB_URL;
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with a failure code
  }
};
module.exports=connectDB;