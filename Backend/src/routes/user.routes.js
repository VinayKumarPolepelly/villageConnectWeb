// import { Router } from "express";
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   addComplaint,
//   getComplaints,
// } from "../controllers/user.controller.js";
// import { verifyJwt } from "../middlewares/auth.middleware.js";
// import { loginRateLimit } from "../middlewares/rateLimit.js";
// import { refreshAccessToken } from "../controllers/user.controller.js";
// const router = Router();
// router.route("/register").post(registerUser);

// router.route("/login").post(loginRateLimit,loginUser);
// //secured routes
// router.route("/logout").post(logoutUser);

// router.route("/addComplaint").post(addComplaint);
// router.route("/getComplaints").get(getComplaints);

//router.route("/refresh-token").post(refreshAccessToken);

//export default router;

import { Router } from "express";
import {
  getActivities,
  getAnnouncements,
  addComplaint,
  getComplaints,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { loginRateLimit } from "../middlewares/rateLimit.js";

const router = Router();
router.route("/register").post(registerUser);

router.route("/login").post(loginRateLimit, loginUser);
//secured routes
router.route("/logout").post(logoutUser, verifyJwt);

router.route("/refresh-token").post(refreshAccessToken);
router.route("/addComplaint/").post(addComplaint);
router.route("/getComplaints/:username").get(getComplaints);
router.route("/getannouncements").get(getAnnouncements);
router.route("/getactivities").get(getActivities);
export default router;

// // routes/userRoutes.js
// import express from "express";
// import { User } from "../models/user.model.js";
// import bcrypt from "bcrypt";

// const router = express.Router();

// // User Login Route
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isPasswordCorrect = await user.isPasswordCorrect(password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: "Incorrect password" });
//     }

//     const accessToken = user.generateAccessToken();
//     res.status(200).json({
//       message: "Login successful",
//       accessToken: accessToken,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
