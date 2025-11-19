import mongoose from "mongoose";
import { DB_URI } from "./env.js";

const ConnectDB = async () => {
  try {
    if (!DB_URI) throw new Error("Define database url first");
    await mongoose.connect(DB_URI);
    console.log("Database connected !!");
  } catch (error) {
    console.log("Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default ConnectDB;
