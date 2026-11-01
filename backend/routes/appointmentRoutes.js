import express from "express";
import { getDoctors, bookAppointment, getAppointments, cancelAppointment, rescheduleAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/doctors", getDoctors);
router.post("/book", bookAppointment);
router.get("/list", getAppointments);
router.post("/cancel", cancelAppointment);
router.post("/reschedule", rescheduleAppointment);

export default router;
