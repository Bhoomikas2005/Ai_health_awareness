/**
 * Image Analysis Routes
 * Endpoints for uploading and analyzing medical images
 */

import express from 'express';
import * as imageAnalysisController from '../controllers/imageAnalysisController.js';

const router = express.Router();

/**
 * POST /api/image-analysis/analyze
 * Analyze uploaded medical image
 * Body: { base64Image, fileName, pixelData, colorData }
 */
router.post('/analyze', imageAnalysisController.analyzeImage);

/**
 * GET /api/image-analysis/history
 * Get analysis history for user
 * Query: email (required)
 */
router.get('/history', imageAnalysisController.getAnalysisHistory);

/**
 * POST /api/image-analysis/compare
 * Compare multiple images
 * Body: { images: [{ fileName }, ...] }
 */
router.post('/compare', imageAnalysisController.compareImages);

/**
 * POST /api/image-analysis/report
 * Generate downloadable report
 * Body: { analysisData, format: 'json' | 'pdf' }
 */
router.post('/report', imageAnalysisController.generateReport);

export default router;
