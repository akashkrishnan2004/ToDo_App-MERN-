import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected ${process.env.DB_URL}`);
  } catch (error) {
    console.log("Database not connected");
    console.log(error);
  }
};

export default connectDb