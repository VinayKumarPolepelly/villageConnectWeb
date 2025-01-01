import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { compare } from "bcrypt";
import { Complaint } from "../models/complaint.model.js";
import { Announcement } from "../models/announcement.model.js";
import { Activity } from "../models/activity.model.js";
import { SchemeGovt } from "../models/scheme.model.js";

// // Generate Tokens Function
// const generateTokens = async (userId) => {
//   const userInstance = await User.findById(userId);
//   const accessToken = await userInstance.generateAccessToken();
//   const refreshToken = await userInstance.generateSessionToken();

//   userInstance.refreshToken = refreshToken;
//   await userInstance.save({ validateBeforeSave: false });

//   return { accessToken, refreshToken };
// };

// Register User/Admin
export const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password, mobile, role } = req.body;
  if (!fullname || !email || !username || !password || !mobile) {
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
    mobile,
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

  //console.log(password);
});

// // Login User/Admin
// export const loginUser = asyncHandler(async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     throw new ApiError(400, "Username and password are required");
//   }

//   const user = await User.findOne({ username });
//   if (!user || !(await user.isPasswordCorrect(password))) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const { accessToken, refreshToken } = await generateTokens(user._id);

//   const options = {
//     httpOnly: true,
//     secure: true,
//     sameSite: "None",
//   };

//   res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         { user: { ...user.toObject(), accessToken } },
//         "User logged in successfully"
//       )
//     );
// });

// // Logout User
// export const logoutUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndUpdate(req.user._id, {
//     refreshToken: null,
//   });

//   const options = {
//     path: "/",
//     secure: true,
//     sameSite: "None",
//   };

//   res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged out successfully"));
// });

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    //console.log(userId);
    const userInstance = await User.findById(userId);
    //console.log(userInstance);
    const accessToken = await userInstance.generateAccessToken();
    const refreshToken = await userInstance.generateSessionToken();
    userInstance.refreshToken = refreshToken;
    userInstance.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "something went wrong while generating the tokens");
  }
};

// const registerUser = async (req, res, next) => {
//   try {
//     await res.status(200).json({
//       message: "OK",
//     });
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, "username is required");
  }
  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const existedUser = await User.findOne({ username });
  if (!existedUser) {
    throw new ApiError(404, "you are not registered yet");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "invalid user credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(existedUser._id);

  //const accessToken = existedUser.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true, // Ensure this is true if using HTTPS
    sameSite: "None",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: existedUser, accessToken },
        "user logged in successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  //console.log(req.user);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );
  const options = {
    path: "/",
    secure: true,
    sameSite: "None",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
  // .json({
  //   tokens: { accessToken, refreshToken },
  // });
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
  const { category, description, username } = req.body;

  if (!username || !category || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newComplaint = await Complaint.create({
    category,
    description,
    username: username, // Correct field reference
    status: "Pending", // Default status
  });

  if (!newComplaint) throw new ApiError(500, "Internal server error");

  return res.status(200).json({ complaint: newComplaint });
});

export const getComplaints = async (req, res) => {
  try {
    // Extract username from params
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username not provided" });
    }

    // Fetch complaints by username
    const complaints = await Complaint.find({ username: username }).sort({
      createdAt: -1,
    });

    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ message: "No complaints found" });
    }

    res.status(200).json({ complaint: complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const allAnnouncements = await Announcement.find().sort({
      createdAt: -1,
    });
    if (!allAnnouncements.length) throw new Error("No Announcements found");
    return res.status(200).json(allAnnouncements);
  } catch (error) {
    res.status(400).json({ message: "Error fetching Announcements" });
  }
};

export const getActivities = async (req, res) => {
  try {
    const allActivities = await Activity.find().sort({
      createdAt: -1,
    });
    if (!allActivities.length) throw new Error("No Activities found");
    return res.status(200).json(allActivities);
  } catch (error) {
    res.status(400).json({ message: "Error fetching Activities" });
  }
};

export const getSchemes = async (req, res) => {
  try {
    const allActivities = await SchemeGovt.find().sort({
      createdAt: -1,
    });
    if (!allActivities.length) throw new Error("No Schemes found");
    return res.status(200).json(allActivities);
  } catch (error) {
    res.status(400).json({ message: "Error fetching Schemes" });
  }
};
