// In-memory storage for appointments
const appointments = {};
const doctors = [
  { id: 1, name: "Dr. Rajesh Kumar", specialty: "General Medicine", availability: "Mon-Fri 9AM-5PM", rating: 4.8 },
  { id: 2, name: "Dr. Priya Sharma", specialty: "Cardiology", availability: "Mon-Wed 10AM-4PM", rating: 4.9 },
  { id: 3, name: "Dr. Amit Patel", specialty: "Orthopedics", availability: "Tue-Thu 11AM-6PM", rating: 4.7 },
  { id: 4, name: "Dr. Neha Singh", specialty: "Pediatrics", availability: "Mon-Fri 2PM-6PM", rating: 4.6 },
  { id: 5, name: "Dr. Vikram Desai", specialty: "Dermatology", availability: "Wed-Fri 1PM-5PM", rating: 4.8 }
];

export const getDoctors = async (req, res) => {
  try {
    const { specialty } = req.query;
    
    let doctorList = doctors;
    if (specialty) {
      doctorList = doctors.filter(d => 
        d.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }
    
    res.json({ doctors: doctorList });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { email, doctorId, appointmentDate, appointmentTime, concern } = req.body;
    
    if (!email || !doctorId || !appointmentDate || !appointmentTime || !concern) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    
    if (!appointments[email]) {
      appointments[email] = [];
    }
    
    const appointment = {
      id: Date.now(),
      doctorId,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      appointmentDate,
      appointmentTime,
      concern,
      status: "Confirmed",
      bookedAt: new Date(),
      meetingLink: `https://meet.example.com/apt_${Date.now()}`
    };
    
    appointments[email].push(appointment);
    
    res.json({
      message: "Appointment booked successfully",
      appointment,
      confirmation: {
        id: appointment.id,
        reminder: "You will receive an SMS/Email reminder 24 hours before the appointment"
      }
    });
  } catch (error) {
    console.error("Appointment booking error:", error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { email } = req.query;
    
    res.json({
      appointments: appointments[email] || []
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { email, appointmentId } = req.body;
    
    if (!appointments[email]) {
      return res.status(404).json({ error: "No appointments found" });
    }
    
    const appointment = appointments[email].find(a => a.id === appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    
    appointment.status = "Cancelled";
    appointment.cancelledAt = new Date();
    
    res.json({ 
      message: "Appointment cancelled successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const { email, appointmentId, newDate, newTime } = req.body;
    
    if (!appointments[email]) {
      return res.status(404).json({ error: "No appointments found" });
    }
    
    const appointment = appointments[email].find(a => a.id === appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    
    appointment.appointmentDate = newDate;
    appointment.appointmentTime = newTime;
    appointment.rescheduledAt = new Date();
    
    res.json({ 
      message: "Appointment rescheduled successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to reschedule appointment" });
  }
};
