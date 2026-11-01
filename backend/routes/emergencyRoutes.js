// backend/routes/emergencyRoutes.js
import express from "express";
import { getEmergencyContacts, notifyEmergency, getNearbyHospitals, logEmergency, getEmergencyHistory } from "../controllers/emergencyController.js";

const router = express.Router();

// GET - Retrieve emergency contacts
router.get("/", getEmergencyContacts);

// POST - Send emergency notification to nearby hospitals
router.post("/notify", notifyEmergency);

// POST - Find nearby hospitals
router.post("/nearby-hospitals", getNearbyHospitals);

// POST - Log emergency event
router.post("/log", logEmergency);

// GET - Retrieve emergency history
router.get("/history", getEmergencyHistory);

export default router;
