import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection error:", err),
);

export default mongoose;
