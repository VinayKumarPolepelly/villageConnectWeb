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
    username: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Solved", "Rejected"],
      default: "Pending",
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const Complaint = model("Complaint", complaintSchema);
