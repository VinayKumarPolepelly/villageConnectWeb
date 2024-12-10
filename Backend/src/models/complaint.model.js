import mongoose, { Schema, model } from "mongoose";
const complaintSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accept", "reject"],
      default: "pending",
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const Complaint = model("Complaint", complaintSchema);