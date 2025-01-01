import { Router } from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { loginRateLimit } from "../middlewares/rateLimit.js";
import {
  addActivity,
  getUserFullName,
  addAnnouncement,
  getAllComplaints,
  getAllUsers,
  updateComplaints,
  addScheme,
} from "../controllers/admin.controller.js";
const router = Router();
router.route("/login").post(loginRateLimit, loginAdmin);
router.route("/updateComplaints").post(updateComplaints);

router.route("/getallcomplaints").get(getAllComplaints);
router.route("/getallusers").get(getAllUsers);
router.route("/getfullname/:username").get(getUserFullName);
router.post("/addAnnouncement", addAnnouncement);
router.post("/addActivity", addActivity);
router.post("/addScheme", addScheme);

export default router;
