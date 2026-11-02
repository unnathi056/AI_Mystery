import mongoose from "mongoose";

export async function connectDatabase(uri: string): Promise<void> {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
}

export function databaseStatus(): "connected" | "disconnected" | "connecting" {
  if (mongoose.connection.readyState === 1) return "connected";
  if (mongoose.connection.readyState === 2) return "connecting";
  return "disconnected";
}
