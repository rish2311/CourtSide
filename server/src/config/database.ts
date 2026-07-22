import mongoose from "mongoose";
import { env } from "./env";

export async function connectDatabase(): Promise<void> {
  const uri = env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI environment variable is required");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB runtime error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
}
