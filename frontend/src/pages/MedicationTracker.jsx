import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function MedicationTracker() {
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    prescribedBy: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/medication/list?email=${userEmail}`
      );
      const data = await res.json();
      setMedications(data.medications || []);
    } catch (err) {
      console.error("Failed to fetch medications");
    }
  };

  const handleAddMedication = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      setMessage("❌ Please login first");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/medication/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          ...formData,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Medication added successfully!");
        setFormData({
          medicationName: "",
          dosage: "",
          frequency: "",
          startDate: "",
          endDate: "",
          prescribedBy: "",
        });
        setShowForm(false);
        fetchMedications();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Failed to add medication");
    } finally {
      setLoading(false);
    }
  };

  const deleteMedication = async (medicationId) => {
    try {
      const res = await fetch(`${API_URL}/api/medication/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          medicationId,
        }),
      });

      if (res.ok) {
        fetchMedications();
      }
    } catch (err) {
      console.error("Failed to delete medication");
    }
  };

  return (
    <div className="medication-page">
      <h1>💊 Medication Tracker</h1>

      {message && (
        <div className={`alert ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <button
        className="btn-add"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "+ Add Medication"}
      </button>

      {showForm && (
        <div className="form-card">
          <h2>Add New Medication</h2>
          <form onSubmit={handleAddMedication}>
            <div className="form-row">
              <div className="form-group">
                <label>Medication Name</label>
                <input
                  type="text"
                  value={formData.medicationName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medicationName: e.target.value,
                    })
                  }
                  placeholder="e.g., Aspirin"
                  required
                />
              </div>
              <div className="form-group">
                <label>Dosage</label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) =>
                    setFormData({ ...formData, dosage: e.target.value })
                  }
                  placeholder="e.g., 500mg"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Frequency</label>
                <input
                  type="text"
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({ ...formData, frequency: e.target.value })
                  }
                  placeholder="e.g., Twice daily"
                  required
                />
              </div>
              <div className="form-group">
                <label>Prescribed By</label>
                <input
                  type="text"
                  value={formData.prescribedBy}
                  onChange={(e) =>
                    setFormData({ ...formData, prescribedBy: e.target.value })
                  }
                  placeholder="e.g., Dr. Smith"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? "Adding..." : "Add Medication"}
            </button>
          </form>
        </div>
      )}

      <div className="medications-list">
        <h2>Your Medications ({medications.length})</h2>
        {medications.length === 0 ? (
          <p className="no-data">No medications added yet.</p>
        ) : (
          medications.map((med) => (
            <div key={med.id} className="medication-card">
              <div className="med-info">
                <h3>{med.medicationName}</h3>
                <p>💊 <strong>Dosage:</strong> {med.dosage}</p>
                <p>⏰ <strong>Frequency:</strong> {med.frequency}</p>
                {med.prescribedBy && (
                  <p>👨‍⚕️ <strong>Prescribed by:</strong> {med.prescribedBy}</p>
                )}
                {med.startDate && (
                  <p>📅 <strong>Duration:</strong> {med.startDate} to{" "}
                    {med.endDate || "Ongoing"}
                  </p>
                )}
              </div>
              <button
                className="btn-delete"
                onClick={() => deleteMedication(med.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <style>{`
        .medication-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .medication-page h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 2.5em;
        }

        .btn-add {
          display: block;
          margin: 0 auto 30px;
          padding: 12px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .btn-add:hover {
          transform: translateY(-2px);
        }

        .form-card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .form-card h2 {
          color: #333;
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .form-group input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
        }

        .btn-submit {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .medications-list {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
        }

        .medications-list h2 {
          color: #333;
          margin-bottom: 20px;
        }

        .no-data {
          text-align: center;
          color: #999;
          padding: 40px;
        }

        .medication-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: start;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .med-info h3 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .med-info p {
          margin: 5px 0;
          color: #666;
          font-size: 0.95em;
        }

        .btn-delete {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: opacity 0.3s;
        }

        .btn-delete:hover {
          opacity: 0.8;
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
          .medication-card {
            flex-direction: column;
          }

          .btn-delete {
            margin-top: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default MedicationTracker;
