import express from "express";
import {
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.js";
import { isAuthanticated } from "../middleware/auth.js";

const router = express.Router();
router.get("/all");
router.post("/new", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", isAuthanticated, getMyProfile);

export default router;
