import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    username: { type: String, required: true },
    fullname: { type: String, default: "admin", required: true },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
