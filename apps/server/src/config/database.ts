import mongoose from "mongoose";

export const connectDb = async (mongoUri: string): Promise<void> => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};
