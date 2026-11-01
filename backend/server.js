import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import healthAwarenessRoutes from "./routes/healthAwarenessRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import diseasePredictionRoutes from "./routes/diseasePredictionRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import healthHistoryRoutes from "./routes/healthHistoryRoutes.js";
import imageAnalysisRoutes from "./routes/imageAnalysisRoutes.js";
import riskDashboardRoutes from "./routes/riskDashboardRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "AI Health Awareness Backend Server",
    version: "1.0.0",
    status: "Running",
    endpoints: {
      auth: "/api/auth",
      chatbot: "/api/chatbot",
      symptom: "/api/symptom",
      disease: "/api/disease",
      appointment: "/api/appointment",
      medication: "/api/medication",
      food: "/api/food",
      health: "/api/health",
      imageAnalysis: "/api/image-analysis",
      riskDashboard: "/api/risk-dashboard",
      emergency: "/api/emergency",
      awareness: "/health-awareness"
    }
  });
});

app.use("/api/chatbot", chatbotRoutes);
app.use("/api/symptom", symptomRoutes);
app.use("/health-awareness", healthAwarenessRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/medication", medicationRoutes);
app.use("/api/disease", diseasePredictionRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/health", healthHistoryRoutes);
app.use("/api/image-analysis", imageAnalysisRoutes);
app.use("/api/risk-dashboard", riskDashboardRoutes);
app.use("/api/emergency", emergencyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
