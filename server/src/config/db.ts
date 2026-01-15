import mongoose from "mongoose";

const connectDB = async (mongoURL: string) => {
  try {
    const connect = await mongoose.connect(mongoURL);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
