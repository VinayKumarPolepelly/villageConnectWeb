import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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

const loginAdmin = asyncHandler(async (req, res) => {
  //req body ->data
  //username or email
  //find the user
  //check the password
  //access and refresh token generation
  //send cookies

  const { username, password } = req.body;
  //console.log(req.body);
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
  //console.log(isPasswordValid);
  if (!isPasswordValid) {
    // throw new ApiError(404, "invalid user credentials");
    return res.status(404).json({ message: "invalid user credentials" });
  }
  // res.status(200).json({
  //   user: existedUser,
  // });

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(existedUser._id);

  // console.log(accessToken);
  // console.log(refreshToken);

  //console.log(accessToken, refreshToken);

  //by default anyone from the frontend also can modify the cookies
  //but we dont want that to happen, we want to modify the cookies only from the server
  //hence we use this
  const options = {
    httpOnly: true,
    secure: true, // Ensure this is true if using HTTPS
    sameSite: "None",
  };
  //you can send with the key value pair within the string is key and another one is value
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: existedUser,
          accessToken,
          refreshToken,
        },
        "user loggedin successfully"
      )
    );
});

const registerAdmin = asyncHandler(async (req, res) => {
  //get the input from the user or frontend
  //validate the input
  //check if the user is already exists
  //create user object-create entry in db
  //remove the password and refresh token feild form response
  //check for user creation
  //return response

  const { username, password } = req.body;

  if (!fullname || !password) {
    throw new ApiError(400, "All feilds are required");
  }

  const existedUser = await User.findOne({
    username,
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = await User.create({
    username,
    password,
  });
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }
  // console.log(createdUser);

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "user registered successfully"));
});

const getAllComplaints = async (req, res) => {
  try {
    const allcomplaints = await Complaint.find().sort({
      createdAt: -1,
    });
    if (!allcomplaints.length) throw new Error("No complaints found");
    return res.status(200).json(allcomplaints);
  } catch (error) {
    res.status(400).json({ message: "Error fetching complaints" });
  }
};

const getAllUsers = async (req, res) => {
  // console.log("called getalluser funtion");
  try {
    const allusers = await User.find();
    if (!allusers.length) throw new Error("No Users found");
    return res.status(200).json({ users: allusers });
  } catch (error) {
    res.status(400).json({ messge: "Error fetching complaints" });
  }
};

const updateComplaints = async (req, res) => {
  try {
    const { user, status, comp_id } = req.body;
    const complaints = await Complaint.findByIdAndUpdate(
      { _id: comp_id },
      { status: status }
    );

    if (!complaints) throw new ApiError(400, "Complaints not found");
    return res.status(200).json(complaints);
  } catch (error) {
    // console.log("nikhil");
    res.status(400).json({ message: "something went wrong" });
  }
};
import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Announcement } from "../models/announcement.model.js";
import { Activity } from "../models/activity.model.js";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "announcements", // Cloudinary folder
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage }).single("image");

// Add Announcement Controller
const addAnnouncement = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const { title, description, username, image, fullname } = req.body;

    try {
      const newAnnouncement = await Announcement.create({
        title,
        description,
        image, // Cloudinary URL
        username: username,
        fullname: fullname,
      });

      if (!newAnnouncement) {
        return res.status(500).json({ message: "Failed to add announcement" });
      }

      res.status(200).json({ announcement: newAnnouncement });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
};

const addActivity = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const { title, description, username, image } = req.body;

    try {
      const newActivity = await Activity.create({
        title,
        description,
        image, // Cloudinary URL
        username: username,
      });

      if (!newActivity) {
        return res.status(500).json({ message: "Failed to add Activity" });
      }

      res.status(200).json({ activity: newActivity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
};

const getUserFullName = async (req, res) => {
  try {
    const { username } = req.params; // Get username from URL parameter
    if (!username) {
      return res.status(400).json({ message: "Username not provided" });
    }
    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //console.log("from backend", user.fullname);
    res.status(200).json({ fullname: user.fullname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
};

export {
  addActivity,
  getUserFullName,
  addAnnouncement,
  loginAdmin,
  registerAdmin,
  getAllComplaints,
  getAllUsers,
  updateComplaints,
};
