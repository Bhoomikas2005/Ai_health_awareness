import express from "express";
import { predictDisease, getSymptomSuggestions } from "../controllers/diseasePredictionController.js";

const router = express.Router();

router.post("/predict", predictDisease);
router.get("/symptoms", getSymptomSuggestions);

export default router;
