import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("Connecting...");

try {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected:", conn.connection.host);
} catch (err) {
  console.error(err);
}