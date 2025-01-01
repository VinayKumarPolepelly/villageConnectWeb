import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

export const SchemeGovt = mongoose.model("SchemeGovt", schemeSchema);
