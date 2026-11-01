import express from "express";
import { register, login, getUserProfile, updateUserProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

export default router;
