import express from "express";
import { getMyProfile, loginUser, registerUser } from "../controller/user.js";

const router = express.Router();
router.get("/all");
router.post("/new", registerUser);
router.post("/login", loginUser);
router.get("/me", getMyProfile);

export default router;
