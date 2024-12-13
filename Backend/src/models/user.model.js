// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       index: true,
//     },
//     fullname: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       index: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     aadhar: {
//       type: Number,
//       required: true,
//     },
//     mobile: {
//       type: Number,
//       required: true,
//     },
//     refreshToken: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// //here we are not using the arrow function because in arrow function we dont have access to this operator
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateAccessToken = function () {
//   try {
//     const token = jwt.sign(
//       {
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         fullname: this.fullname,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: 432000,
//       }
//     );
//     return token;
//   } catch (error) {
//     console.error("Error generating access token:", error);
//     throw new Error("Failed to generate access token");
//   }
// };

// userSchema.methods.generateSessionToken = async function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

// export const User = mongoose.model("User", userSchema);

// models/User.js
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: { type: String, unique: true, lowercase: true },
    fullname: { type: String },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    address: { type: String },
    aadharnumber: { type: Number },
    mobile: { type: Number },
    role: { type: String, default: "user" },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};
userSchema.methods.generateSessionToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  }); // Refresh token valid for 7 days
};

export const User = mongoose.model("User", userSchema);
