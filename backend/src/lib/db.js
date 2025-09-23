import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URL);
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("Error connecting MONGODB:", error);
    process.exit(1) // 1 status code for failed, 0 for success
  }
}