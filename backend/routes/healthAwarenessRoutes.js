import express from "express";
import { getHealthAwareness } from "../controllers/healthAwarenessController.js";

const router = express.Router();

router.post("/", getHealthAwareness);

export default router;
