// In-memory storage for health history
const healthHistory = {};

export const addHealthRecord = async (req, res) => {
  try {
    const { email, recordType, data } = req.body;
    
    if (!email || !recordType || !data) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    if (!healthHistory[email]) {
      healthHistory[email] = [];
    }
    
    const record = {
      id: Date.now(),
      type: recordType,
      data,
      timestamp: new Date()
    };
    
    healthHistory[email].push(record);
    
    res.json({
      message: "Health record added successfully",
      record
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add health record" });
  }
};

export const getHealthHistory = async (req, res) => {
  try {
    const { email, limit = 50 } = req.query;
    
    const records = (healthHistory[email] || []).slice(-limit);
    
    res.json({
      email,
      totalRecords: healthHistory[email]?.length || 0,
      records
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch health history" });
  }
};

export const deleteHealthRecord = async (req, res) => {
  try {
    const { email, recordId } = req.body;
    
    if (!healthHistory[email]) {
      return res.status(404).json({ error: "No records found" });
    }
    
    healthHistory[email] = healthHistory[email].filter(r => r.id !== recordId);
    
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};

export const getHealthStats = async (req, res) => {
  try {
    const { email } = req.query;
    
    const records = healthHistory[email] || [];
    
    const stats = {
      totalRecords: records.length,
      recordsByType: {},
      lastUpdated: records.length > 0 ? records[records.length - 1].timestamp : null
    };
    
    records.forEach(record => {
      stats.recordsByType[record.type] = (stats.recordsByType[record.type] || 0) + 1;
    });
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch health stats" });
  }
};

// Medical test results
const testResults = {};

export const addTestResult = async (req, res) => {
  try {
    const { email, testName, result, referenceRange, date, clinicName } = req.body;
    
    if (!email || !testName || !result) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    if (!testResults[email]) {
      testResults[email] = [];
    }
    
    const testResult = {
      id: Date.now(),
      testName,
      result,
      referenceRange,
      date: date || new Date().toISOString(),
      clinicName,
      uploadedAt: new Date()
    };
    
    testResults[email].push(testResult);
    
    res.json({
      message: "Test result added successfully",
      testResult
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add test result" });
  }
};

export const getTestResults = async (req, res) => {
  try {
    const { email } = req.query;
    
    res.json({
      testResults: testResults[email] || []
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch test results" });
  }
};
