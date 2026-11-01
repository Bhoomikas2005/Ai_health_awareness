// In-memory storage for medications
const medications = {};

export const addMedication = async (req, res) => {
  try {
    const { email, medicationName, dosage, frequency, startDate, endDate, prescribedBy } = req.body;
    
    if (!email || !medicationName || !dosage || !frequency) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    if (!medications[email]) {
      medications[email] = [];
    }
    
    const medication = {
      id: Date.now(),
      medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
      prescribedBy,
      addedAt: new Date()
    };
    
    medications[email].push(medication);
    
    res.json({
      message: "Medication added successfully",
      medication
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add medication" });
  }
};

export const getMedications = async (req, res) => {
  try {
    const { email } = req.query;
    
    res.json({
      medications: medications[email] || []
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medications" });
  }
};

export const deleteMedication = async (req, res) => {
  try {
    const { email, medicationId } = req.body;
    
    if (!medications[email]) {
      return res.status(404).json({ error: "No medications found" });
    }
    
    medications[email] = medications[email].filter(m => m.id !== medicationId);
    
    res.json({ message: "Medication deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete medication" });
  }
};

export const setMedicationReminder = async (req, res) => {
  try {
    const { email, medicationId, reminderTime } = req.body;
    
    if (!medications[email]) {
      return res.status(404).json({ error: "Medication not found" });
    }
    
    const medication = medications[email].find(m => m.id === medicationId);
    if (!medication) {
      return res.status(404).json({ error: "Medication not found" });
    }
    
    medication.reminder = {
      enabled: true,
      time: reminderTime,
      createdAt: new Date()
    };
    
    res.json({
      message: "Reminder set successfully",
      medication
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to set reminder" });
  }
};
