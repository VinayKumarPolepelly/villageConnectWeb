import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    username: { type: String, required: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
