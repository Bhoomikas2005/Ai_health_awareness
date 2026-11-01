// Emergency notification controller - comprehensive alert system
export const notifyEmergency = async (req, res) => {
  try {
    const { riskScore, userLocation, timestamp, severity } = req.body;

    // Mock notification to hospitals
    const mockHospitals = [
      { id: 1, name: 'City General Hospital', email: 'emergency@cityhospital.com' },
      { id: 2, name: 'Metro Medical Center', email: 'alert@metromedical.com' },
      { id: 3, name: 'Emergency Care Unit', email: 'emergency@careunit.com' }
    ];

    console.log(`🚨 EMERGENCY ALERT: Risk Score ${riskScore} - Severity: ${severity}`);
    console.log(`Location: ${JSON.stringify(userLocation)}`);
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Notifying ${mockHospitals.length} nearby hospitals...`);

    res.json({
      success: true,
      message: 'Emergency notification sent to nearby hospitals',
      notifiedHospitals: mockHospitals.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Emergency notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send emergency notification',
      error: error.message
    });
  }
};

export const getNearbyHospitals = async (req, res) => {
  try {
    const { location, radius } = req.body;

    // Mock nearby hospitals database
    const mockHospitals = [
      {
        id: 1,
        name: 'City General Hospital',
        distance: 0.8,
        lat: (location?.lat || 28.6139) + 0.002,
        lng: (location?.lng || 77.2090) + 0.001,
        phone: '+91-11-2345-6789',
        address: '123 Medical Street, New Delhi',
        bedCapacity: 500,
        hasEmergency: true,
        operatingHours: '24/7'
      },
      {
        id: 2,
        name: 'Metro Medical Center',
        distance: 1.2,
        lat: (location?.lat || 28.6139) - 0.001,
        lng: (location?.lng || 77.2090) - 0.002,
        phone: '+91-11-2987-6543',
        address: '456 Health Avenue, Bengaluru',
        bedCapacity: 300,
        hasEmergency: true,
        operatingHours: '24/7'
      },
      {
        id: 3,
        name: 'Emergency Care Unit',
        distance: 1.5,
        lat: (location?.lat || 19.0760) + 0.003,
        lng: (location?.lng || 72.8777) - 0.001,
        phone: '+91-22-5678-9012',
        address: '789 Hospital Lane, Mumbai',
        bedCapacity: 200,
        hasEmergency: true,
        operatingHours: '24/7'
      }
    ];

    const nearbyHospitals = mockHospitals.filter(h => h.distance <= (radius || 5));

    res.json({
      success: true,
      hospitals: nearbyHospitals,
      totalFound: nearbyHospitals.length,
      searchRadius: radius || 5
    });
  } catch (error) {
    console.error('Hospital search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to find nearby hospitals',
      error: error.message
    });
  }
};

export const getEmergencyContacts = (req, res) => {
  try {
    // Current Indian emergency numbers
    const emergencyContacts = [
      { name: "🚑 Ambulance", number: "108" },
      { name: "👮 Police", number: "100" },
      { name: "🔥 Fire", number: "101" },
      { name: "🌍 National Emergency", number: "112" },
      { name: "🧠 Mental Health (iCall)", number: "9152987821" },
      { name: "👩 Women Helpline", number: "1091" },
      { name: "☠️ Poison Control", number: "1800-11-6117" }
    ];
    res.json(emergencyContacts); // Just returning the array as expected by frontend fetch
  } catch (error) {
    console.error('Failed to get emergency contacts:', error);
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
};

export const logEmergency = async (req, res) => {
  try {
    const { riskScore, userLocation, severity, hospitals, timestamp } = req.body;

    const emergencyLog = {
      id: Date.now(),
      riskScore,
      userLocation,
      severity,
      hospitalsNotified: hospitals,
      timestamp,
      status: 'logged'
    };

    console.log('📋 Emergency logged:', emergencyLog);

    res.json({
      success: true,
      message: 'Emergency event logged',
      logId: emergencyLog.id
    });
  } catch (error) {
    console.error('Emergency logging error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log emergency',
      error: error.message
    });
  }
};

export const getEmergencyHistory = async (req, res) => {
  try {
    const { userId, limit } = req.query;

    const mockHistory = [
      {
        id: 1,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        riskScore: 85,
        severity: 'High',
        hospitalsNotified: 3,
        status: 'resolved'
      }
    ];

    const history = mockHistory.slice(0, limit || 10);

    res.json({
      success: true,
      emergencyHistory: history,
      totalEvents: history.length
    });
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve emergency history',
      error: error.message
    });
  }
};
