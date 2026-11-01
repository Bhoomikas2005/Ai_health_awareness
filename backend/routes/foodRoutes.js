import express from "express";
import { getFoodRecommendations, getHealthyRecipes } from "../controllers/foodRecommendationController.js";

const router = express.Router();

router.post("/recommendations", getFoodRecommendations);
router.get("/recipes", getHealthyRecipes);

export default router;
