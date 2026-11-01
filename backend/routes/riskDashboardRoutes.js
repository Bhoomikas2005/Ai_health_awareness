/**
 * Risk Dashboard Routes
 * Endpoints for health risk assessment and monitoring
 */

import express from 'express';
import * as riskDashboardController from '../controllers/riskDashboardController.js';

const router = express.Router();

/**
 * @route   GET /api/risk-dashboard/analysis
 * @desc    Get comprehensive risk analysis
 * @query   period {string} - 'week', 'month', or 'year'
 * @query   userId {string} - User identifier
 */
router.get('/analysis', riskDashboardController.getRiskAnalysis);

/**
 * @route   GET /api/risk-dashboard/alerts
 * @desc    Get current health risk alerts
 * @query   userId {string} - User identifier
 */
router.get('/alerts', riskDashboardController.getRiskAlerts);

/**
 * @route   GET /api/risk-dashboard/history
 * @desc    Get risk assessment history
 * @query   userId {string} - User identifier
 * @query   startDate {string} - Start date for history
 * @query   endDate {string} - End date for history
 */
router.get('/history', riskDashboardController.getRiskHistory);

/**
 * @route   GET /api/risk-dashboard/recommendations
 * @desc    Get personalized health recommendations
 * @query   userId {string} - User identifier
 * @query   riskLevel {string} - Current risk level
 */
router.get('/recommendations', riskDashboardController.getRecommendations);

/**
 * @route   POST /api/risk-dashboard/compare
 * @desc    Compare risk scores over time period
 * @body    userId {string}, startDate {string}, endDate {string}
 */
router.post('/compare', riskDashboardController.compareRiskScores);

/**
 * @route   POST /api/risk-dashboard/report
 * @desc    Generate comprehensive risk report
 * @body    userId {string}, format {string}
 */
router.post('/report', riskDashboardController.generateRiskReport);

/**
 * @route   POST /api/risk-dashboard/emergency-alert
 * @desc    Trigger emergency alert when critical risk detected
 * @body    riskScore {number}, riskLevel {string}, location {object}, timestamp {string}
 */
router.post('/emergency-alert', riskDashboardController.triggerEmergencyAlert);

/**
 * @route   POST /api/risk-dashboard/nearby-hospitals
 * @desc    Find nearby hospitals and medical centers
 * @body    latitude {number}, longitude {number}, radius {number}
 */
router.post('/nearby-hospitals', riskDashboardController.findNearbyHospitals);

export default router;
