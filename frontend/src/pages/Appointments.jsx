import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    concern: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchDoctors();
    if (userEmail) fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${API_URL}/api/appointment/doctors`);
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch (err) {
      console.error("Failed to fetch doctors");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/appointment/list?email=${userEmail}`
      );
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error("Failed to fetch appointments");
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      setMessage("❌ Please login first");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/appointment/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          doctorId: selectedDoctor.id,
          ...formData,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Appointment booked successfully!");
        setFormData({ appointmentDate: "", appointmentTime: "", concern: "" });
        setShowBooking(false);
        setSelectedDoctor(null);
        fetchAppointments();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointments-page">
      <h1>👨‍⚕️ Book Doctor Appointment</h1>

      {message && (
        <div className={`alert ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="appointments-container">
        {/* Doctors List */}
        <div className="doctors-section">
          <h2>Available Doctors</h2>
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-header">
                  <h3>{doctor.name}</h3>
                  <span className="rating">⭐ {doctor.rating}</span>
                </div>
                <p className="specialty">🏥 {doctor.specialty}</p>
                <p className="availability">🕐 {doctor.availability}</p>
                <button
                  className="btn-book"
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setShowBooking(true);
                  }}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        {showBooking && selectedDoctor && (
          <div className="booking-modal">
            <div className="booking-card">
              <button
                className="close-btn"
                onClick={() => setShowBooking(false)}
              >
                ×
              </button>
              <h2>Book Appointment with {selectedDoctor.name}</h2>

              <form onSubmit={handleBooking}>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appointmentDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appointmentTime: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Concern/Reason</label>
                  <textarea
                    value={formData.concern}
                    onChange={(e) =>
                      setFormData({ ...formData, concern: e.target.value })
                    }
                    placeholder="Describe your health concern..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-confirm"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* My Appointments */}
      {userEmail && (
        <div className="my-appointments">
          <h2>📅 My Appointments</h2>
          {appointments.length === 0 ? (
            <p className="no-appointments">
              No appointments booked yet. Book one now!
            </p>
          ) : (
            <div className="appointments-list">
              {appointments.map((apt) => (
                <div key={apt.id} className="appointment-item">
                  <div className="apt-info">
                    <h3>{apt.doctorName}</h3>
                    <p>📋 {apt.doctorSpecialty}</p>
                    <p>📅 {apt.appointmentDate} at {apt.appointmentTime}</p>
                    <p>💬 {apt.concern}</p>
                    <p className={`status ${apt.status.toLowerCase()}`}>
                      Status: {apt.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        .appointments-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .appointments-page h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 2.5em;
        }

        .appointments-container {
          margin-bottom: 40px;
        }

        .doctors-section h2,
        .my-appointments h2 {
          color: #333;
          margin-bottom: 20px;
          font-size: 1.5em;
        }

        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .doctor-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .doctor-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 10px;
        }

        .doctor-header h3 {
          margin: 0;
          color: #333;
        }

        .rating {
          background: #FFD700;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 0.85em;
          font-weight: bold;
        }

        .specialty {
          color: #667eea;
          font-weight: bold;
          margin: 8px 0;
        }

        .availability {
          color: #666;
          font-size: 0.9em;
          margin-bottom: 15px;
        }

        .btn-book {
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.3s;
        }

        .btn-book:hover {
          transform: translateY(-2px);
        }

        .booking-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .booking-card {
          background: white;
          padding: 40px;
          border-radius: 10px;
          max-width: 500px;
          width: 90%;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #999;
        }

        .booking-card h2 {
          color: #333;
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
        }

        .btn-confirm {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .btn-confirm:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn-confirm:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .my-appointments {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
        }

        .no-appointments {
          color: #999;
          text-align: center;
          padding: 40px 20px;
        }

        .appointments-list {
          display: grid;
          gap: 15px;
        }

        .appointment-item {
          background: white;
          padding: 20px;
          border-left: 5px solid #667eea;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .apt-info h3 {
          margin: 0 0 8px 0;
          color: #333;
        }

        .apt-info p {
          margin: 5px 0;
          color: #666;
        }

        .status {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: bold;
          margin-top: 10px;
        }

        .status.confirmed {
          background: #d4edda;
          color: #155724;
        }

        .status.cancelled {
          background: #f8d7da;
          color: #721c24;
        }

        .alert {
          padding: 12px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }

        .alert.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .alert.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
          .doctors-grid {
            grid-template-columns: 1fr;
          }

          .booking-card {
            width: 95%;
          }
        }
      `}</style>
    </div>
  );
}

export default Appointments;
