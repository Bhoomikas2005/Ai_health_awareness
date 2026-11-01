import express from "express";
import { addMedication, getMedications, deleteMedication, setMedicationReminder } from "../controllers/medicationController.js";

const router = express.Router();

router.post("/add", addMedication);
router.get("/list", getMedications);
router.delete("/delete", deleteMedication);
router.post("/reminder", setMedicationReminder);

export default router;
