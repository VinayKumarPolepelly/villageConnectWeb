import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

// Generate Tokens Function
const generateTokens = async (userId) => {
  const userInstance = await User.findById(userId);
  const accessToken = await userInstance.generateAccessToken();
  const refreshToken = await userInstance.generateSessionToken();

  userInstance.refreshToken = refreshToken;
  await userInstance.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// Register User/Admin
export const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password, phoneNumber, role } = req.body;
  if (!fullname || !email || !username || !password || !phoneNumber) {
    //throw new ApiError(400, "All fields are required");
  }
  //console.log(password);

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = await User.create({
    fullname,
    email,
    username,
    password,
    phoneNumber,
    role,
  });
  //console.log(password);
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Error registering user");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));

  console.log(password);
});

// Login User/Admin
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Username and password are required");
  }

  const user = await User.findOne({ username });
  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: { ...user.toObject(), accessToken } },
        "User logged in successfully"
      )
    );
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    refreshToken: null,
  });

  const options = {
    path: "/",
    secure: true,
    sameSite: "None",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});


// Refresh Access Token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
});


export const addComplaint = asyncHandler(async (req, res) => {
  const { category, description, status } = req.body;
  const newComplaint = await complaint.create({
    category,
    description,
    status,
    user: req.user.username,
  });
  if (!newComplaint) throw new ApiError(500, "Internal server error");
  return res.status(200).json({ complaint: newComplaint });
});

export const getComplaints = asyncHandler(async (req, res) => {
  const username = req.user.username;
  //console.log(userId);
  const complaints = await complaint.find({ user: username });
  if (!complaints) throw new ApiError(400, "leaves not found");
  return res.status(200).json({ complaints: complaints });
});