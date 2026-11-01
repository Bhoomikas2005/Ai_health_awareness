import express from "express";
import { addHealthRecord, getHealthHistory, deleteHealthRecord, getHealthStats, addTestResult, getTestResults } from "../controllers/healthHistoryController.js";

const router = express.Router();

router.post("/add", addHealthRecord);
router.get("/history", getHealthHistory);
router.delete("/delete", deleteHealthRecord);
router.get("/stats", getHealthStats);
router.post("/test-result/add", addTestResult);
router.get("/test-result/list", getTestResults);

export default router;
