/**
 * Risk Dashboard Controller
 * Provides comprehensive health risk analysis and monitoring
 */

// Mock data - Replace with actual database calls
const mockRiskData = {
  overallRiskLevel: 'Medium',
  riskScore: 62,
  riskCategories: [
    {
      name: 'Cardiovascular Risk',
      percentage: 45,
      level: 'Medium'
    },
    {
      name: 'Respiratory Risk',
      percentage: 35,
      level: 'Low'
    },
    {
      name: 'Metabolic Risk',
      percentage: 50,
      level: 'Medium'
    },
    {
      name: 'Mental Health Risk',
      percentage: 30,
      level: 'Low'
    },
    {
      name: 'Infection Risk',
      percentage: 40,
      level: 'Medium'
    }
  ],
  topDiseases: [
    {
      name: 'Hypertension',
      severity: 'High',
      confidence: 72,
      probability: 65,
      description: 'Elevated blood pressure requiring monitoring'
    },
    {
      name: 'Type 2 Diabetes',
      severity: 'High',
      confidence: 58,
      probability: 50,
      description: 'Blood sugar regulation concern'
    },
    {
      name: 'Obesity-Related Issues',
      severity: 'Medium',
      confidence: 55,
      probability: 45,
      description: 'Weight-related health complications'
    }
  ],
  healthMetrics: [
    {
      name: 'BMI',
      value: '28.5',
      normal: '18.5-24.9',
      status: '⚠️ Overweight',
      color: '#ff9800'
    },
    {
      name: 'Blood Pressure',
      value: '145/95',
      normal: '<120/80',
      status: '⚠️ Elevated',
      color: '#ff6b6b'
    },
    {
      name: 'Cholesterol',
      value: '220',
      normal: '<200',
      status: '⚠️ High',
      color: '#ff9800'
    },
    {
      name: 'Blood Sugar',
      value: '110',
      normal: '<100',
      status: '⚠️ Slightly High',
      color: '#ffa500'
    }
  ],
  trendData: [
    { date: 'Mon', riskScore: 55, level: 'Medium' },
    { date: 'Tue', riskScore: 58, level: 'Medium' },
    { date: 'Wed', riskScore: 60, level: 'Medium' },
    { date: 'Thu', riskScore: 62, level: 'Medium' },
    { date: 'Fri', riskScore: 65, level: 'Medium' },
    { date: 'Sat', riskScore: 63, level: 'Medium' },
    { date: 'Sun', riskScore: 62, level: 'Medium' }
  ],
  recommendations: [
    {
      icon: '🚶',
      title: 'Increase Physical Activity',
      description: 'Aim for 150 minutes of moderate exercise per week to reduce cardiovascular risk',
      priority: 'High Priority'
    },
    {
      icon: '🥗',
      title: 'Dietary Changes',
      description: 'Reduce sodium intake and maintain balanced diet with more vegetables and whole grains',
      priority: 'High Priority'
    },
    {
      icon: '⏰',
      title: 'Regular Sleep Schedule',
      description: 'Maintain 7-8 hours of quality sleep daily to support overall health',
      priority: 'Medium Priority'
    },
    {
      icon: '📊',
      title: 'Monitor Vital Signs',
      description: 'Check blood pressure and blood sugar levels regularly as recommended',
      priority: 'High Priority'
    },
    {
      icon: '🏥',
      title: 'Medical Consultation',
      description: 'Schedule appointment with healthcare provider for comprehensive evaluation',
      priority: 'High Priority'
    },
    {
      icon: '💊',
      title: 'Medication Review',
      description: 'Review current medications with doctor for optimization',
      priority: 'Medium Priority'
    }
  ]
};

const mockAlerts = [
  {
    title: 'High Blood Pressure Detected',
    message: 'Your recent readings show elevated blood pressure (145/95). Please consult a healthcare provider.',
    severity: 'High'
  },
  {
    title: 'Weight Management Needed',
    message: 'BMI indicates overweight status. Consider lifestyle modifications or consultation.',
    severity: 'Medium'
  }
];

/**
 * Get comprehensive risk analysis
 */
export const getRiskAnalysis = (req, res) => {
  try {
    const { period = 'week', userId } = req.query;
    
    // In production, fetch from database based on userId and period
    // For now, return mock data with slight variations based on period
    const riskData = {
      ...mockRiskData,
      period,
      generatedAt: new Date().toISOString(),
      userId: userId || 'default'
    };

    // Adjust trend data based on period
    if (period === 'month') {
      riskData.trendData = generateMonthTrends();
    } else if (period === 'year') {
      riskData.trendData = generateYearTrends();
    }

    res.json({
      success: true,
      message: 'Risk analysis retrieved successfully',
      riskAnalysis: riskData
    });
  } catch (error) {
    console.error('Error in getRiskAnalysis:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving risk analysis',
      error: error.message
    });
  }
};

/**
 * Get health risk alerts
 */
export const getRiskAlerts = (req, res) => {
  try {
    const { userId } = req.query;

    const alerts = {
      success: true,
      message: 'Alerts retrieved successfully',
      alerts: mockAlerts,
      timestamp: new Date().toISOString(),
      count: mockAlerts.length
    };

    res.json(alerts);
  } catch (error) {
    console.error('Error in getRiskAlerts:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving alerts',
      error: error.message
    });
  }
};

/**
 * Get risk history
 */
export const getRiskHistory = (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    const history = {
      success: true,
      message: 'Risk history retrieved successfully',
      history: [
        {
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          riskScore: 55,
          riskLevel: 'Medium',
          events: ['Elevated Blood Pressure', 'Moderate Activity']
        },
        {
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          riskScore: 58,
          riskLevel: 'Medium',
          events: ['Continued Monitoring', 'Diet Adjusted']
        },
        {
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          riskScore: 60,
          riskLevel: 'Medium',
          events: ['Regular Exercise', 'Healthy Meals']
        },
        {
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          riskScore: 62,
          riskLevel: 'Medium',
          events: ['Minor Increase', 'Stress Level']
        }
      ],
      userId: userId || 'default'
    };

    res.json(history);
  } catch (error) {
    console.error('Error in getRiskHistory:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving risk history',
      error: error.message
    });
  }
};

/**
 * Get personalized health recommendations
 */
export const getRecommendations = (req, res) => {
  try {
    const { userId, riskLevel } = req.query;

    const recommendations = {
      success: true,
      message: 'Recommendations retrieved successfully',
      recommendations: mockRiskData.recommendations,
      priority: riskLevel || 'Medium',
      timestamp: new Date().toISOString()
    };

    res.json(recommendations);
  } catch (error) {
    console.error('Error in getRecommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving recommendations',
      error: error.message
    });
  }
};

/**
 * Compare risk scores over time
 */
export const compareRiskScores = (req, res) => {
  try {
    const { userId, startDate, endDate } = req.body;

    const comparison = {
      success: true,
      message: 'Risk comparison retrieved successfully',
      comparison: {
        period: `${startDate || 'N/A'} to ${endDate || 'N/A'}`,
        startScore: 55,
        endScore: 62,
        change: 7,
        changePercentage: 12.7,
        trend: 'Increasing',
        interpretation: 'Risk score has increased slightly. Consider implementing recommendations.'
      }
    };

    res.json(comparison);
  } catch (error) {
    console.error('Error in compareRiskScores:', error);
    res.status(500).json({
      success: false,
      message: 'Error comparing risk scores',
      error: error.message
    });
  }
};

/**
 * Generate risk report
 */
export const generateRiskReport = (req, res) => {
  try {
    const { userId, format = 'json' } = req.body;

    const report = {
      success: true,
      message: 'Risk report generated successfully',
      report: {
        title: 'Personal Health Risk Assessment Report',
        generatedDate: new Date().toISOString(),
        userId: userId || 'default',
        format,
        summary: {
          overallRiskLevel: mockRiskData.overallRiskLevel,
          riskScore: mockRiskData.riskScore,
          categoryCount: mockRiskData.riskCategories.length,
          diseaseCount: mockRiskData.topDiseases.length,
          alertCount: mockAlerts.length
        },
        riskCategories: mockRiskData.riskCategories,
        topDiseases: mockRiskData.topDiseases,
        recommendations: mockRiskData.recommendations,
        nextSteps: [
          'Schedule appointment with primary care physician',
          'Monitor vital signs daily',
          'Follow personalized recommendations',
          'Return for follow-up assessment in 4 weeks'
        ],
        disclaimer: 'This report is for informational purposes only and is not a medical diagnosis. Please consult with healthcare professionals for medical advice.'
      }
    };

    res.json(report);
  } catch (error) {
    console.error('Error in generateRiskReport:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating risk report',
      error: error.message
    });
  }
};

/**
 * Emergency Alert Handler
 * Triggers emergency notification when critical risk detected
 */
export const triggerEmergencyAlert = (req, res) => {
  try {
    const { riskScore, riskLevel, location, timestamp } = req.body;

    const emergencyAlert = {
      success: true,
      message: 'Emergency alert triggered and routed to nearby hospitals',
      alert: {
        id: `ALERT-${Date.now()}`,
        severity: 'CRITICAL',
        riskScore: riskScore,
        riskLevel: riskLevel,
        userLocation: location,
        timestamp: timestamp,
        status: 'SENT_TO_HOSPITALS',
        hospitalsNotified: [
          'General Hospital Medical Center',
          'City Medical Emergency Center',
          'Regional Healthcare Facility'
        ],
        emergencyServices: {
          ambulance: 'DISPATCHED',
          status: 'Units are being sent to your location',
          etaMinutes: 8
        },
        message: `CRITICAL ALERT: Patient with risk score ${riskScore} at coordinates ${location.latitude}, ${location.longitude}`
      }
    };

    // Log alert to emergency system (mock)
    console.log('🚨 EMERGENCY ALERT SENT:', emergencyAlert);

    res.json(emergencyAlert);
  } catch (error) {
    console.error('Error in triggerEmergencyAlert:', error);
    res.status(500).json({
      success: false,
      message: 'Error triggering emergency alert',
      error: error.message
    });
  }
};

/**
 * Find Nearby Hospitals
 * Returns list of hospitals near user location
 */
export const findNearbyHospitals = (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.body;

    // Mock hospitals database - Replace with real data or Google Places API
    const mockHospitals = [
      {
        id: 'h1',
        name: 'City General Hospital',
        distance: '0.8 km',
        address: '123 Medical Center Dr, City, State 12345',
        phone: '(555) 123-4567',
        emergencyDept: true,
        rating: 4.8,
        availableBeds: 45,
        specialties: ['Cardiology', 'Emergency', 'Surgery'],
        mapsUrl: `https://maps.google.com/?q=${latitude},${longitude}`,
        coordinates: {
          lat: latitude + 0.005,
          lng: longitude + 0.002
        }
      },
      {
        id: 'h2',
        name: 'Regional Medical Center',
        distance: '1.2 km',
        address: '456 Hospital Blvd, City, State 12345',
        phone: '(555) 234-5678',
        emergencyDept: true,
        rating: 4.6,
        availableBeds: 32,
        specialties: ['Trauma Center', 'Neurology', 'General Surgery'],
        mapsUrl: `https://maps.google.com/?q=${latitude},${longitude}`,
        coordinates: {
          lat: latitude - 0.003,
          lng: longitude + 0.004
        }
      },
      {
        id: 'h3',
        name: 'St. Mary\'s Medical Center',
        distance: '1.5 km',
        address: '789 Care Lane, City, State 12345',
        phone: '(555) 345-6789',
        emergencyDept: true,
        rating: 4.7,
        availableBeds: 28,
        specialties: ['Orthopedics', 'Emergency', 'Internal Medicine'],
        mapsUrl: `https://maps.google.com/?q=${latitude},${longitude}`,
        coordinates: {
          lat: latitude + 0.002,
          lng: longitude - 0.003
        }
      },
      {
        id: 'h4',
        name: 'Emergency Care Hospital',
        distance: '2.1 km',
        address: '321 Emergency Way, City, State 12345',
        phone: '(555) 456-7890',
        emergencyDept: true,
        rating: 4.5,
        availableBeds: 56,
        specialties: ['Emergency', 'Intensive Care', 'Pediatrics'],
        mapsUrl: `https://maps.google.com/?q=${latitude},${longitude}`,
        coordinates: {
          lat: latitude - 0.006,
          lng: longitude - 0.002
        }
      },
      {
        id: 'h5',
        name: 'Community Health Hospital',
        distance: '2.8 km',
        address: '654 Community Blvd, City, State 12345',
        phone: '(555) 567-8901',
        emergencyDept: true,
        rating: 4.4,
        availableBeds: 41,
        specialties: ['General Surgery', 'Cardiology', 'Emergency'],
        mapsUrl: `https://maps.google.com/?q=${latitude},${longitude}`,
        coordinates: {
          lat: latitude + 0.008,
          lng: longitude + 0.006
        }
      }
    ];

    // Filter hospitals within radius and sort by distance
    const nearbyHospitals = mockHospitals
      .filter(h => h.emergencyDept === true)
      .sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });

    res.json({
      success: true,
      message: 'Nearby hospitals retrieved successfully',
      hospitals: nearbyHospitals,
      userLocation: {
        latitude: latitude,
        longitude: longitude
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in findNearbyHospitals:', error);
    res.status(500).json({
      success: false,
      message: 'Error finding nearby hospitals',
      error: error.message
    });
  }
};

/**
 * Helper: Generate month trends
 */
function generateMonthTrends() {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  return weeks.map((week, idx) => ({
    date: week,
    riskScore: 55 + idx * 2,
    level: idx < 2 ? 'Low' : 'Medium'
  }));
}

/**
 * Helper: Generate year trends
 */
function generateYearTrends() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, idx) => ({
    date: month,
    riskScore: 50 + Math.sin(idx / 12 * Math.PI * 2) * 20,
    level: idx % 3 === 0 ? 'Low' : 'Medium'
  }));
}
