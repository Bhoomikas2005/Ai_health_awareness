import express from "express";
import { checkSymptom } from "../controllers/symptomController.js";
const router = express.Router();

router.post("/", checkSymptom);

export default router;
