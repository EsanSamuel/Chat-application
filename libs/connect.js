import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose.connect("mongodb+srv://esansamuel555:samuel555@cluster0.3e2eckd.mongodb.net/").then(() => {
    console.log("Database connected!");
  });
};

export default connectDB
