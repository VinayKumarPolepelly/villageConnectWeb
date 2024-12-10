import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AnnouncemntSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    image: {
      type: String, // cloudinary url
    },
    by: {
      type: String,
      required: true,
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const Announcemnts = mongoose.model("Anouncements", AnnouncemntSchema);