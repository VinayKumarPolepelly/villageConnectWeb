import { Router } from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { registerUser } from "../controllers/user.controller.js";
import { verifyAdmin, verifyJwt } from "../middlewares/auth.middleware.js";
import { loginRateLimit } from "../middlewares/rateLimit.js";
const router = Router();
router.route("/login").post(loginRateLimit, loginAdmin);
//router.route("/userRegister").post(registerUser);

export default router;
