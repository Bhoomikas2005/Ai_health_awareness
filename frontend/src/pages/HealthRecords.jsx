import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function HealthRecords() {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    recordType: "blood-pressure",
    systolic: "",
    diastolic: "",
    weight: "",
    temperature: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      fetchRecords();
      fetchStats();
    }
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/health/history?email=${userEmail}`
      );
      const data = await res.json();
      setRecords(data.records || []);
    } catch (err) {
      console.error("Failed to fetch records");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/health/stats?email=${userEmail}`
      );
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats");
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      setMessage("❌ Please login first");
      return;
    }

    setLoading(true);
    setMessage("");

    const data = { ...formData };
    if (formData.recordType === "blood-pressure") {
      data.systolic = parseInt(formData.systolic);
      data.diastolic = parseInt(formData.diastolic);
    } else if (formData.recordType === "weight") {
      data.weight = parseFloat(formData.weight);
    } else if (formData.recordType === "temperature") {
      data.temperature = parseFloat(formData.temperature);
    }

    try {
      const res = await fetch(`${API_URL}/api/health/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          recordType: formData.recordType,
          data,
        }),
      });

      const responseData = await res.json();
      if (res.ok) {
        setMessage("✅ Record added successfully!");
        setFormData({
          recordType: "blood-pressure",
          systolic: "",
          diastolic: "",
          weight: "",
          temperature: "",
          notes: "",
        });
        setShowForm(false);
        fetchRecords();
        fetchStats();
      } else {
        setMessage(`❌ ${responseData.error}`);
      }
    } catch (err) {
      setMessage("❌ Failed to add record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="health-records-page">
      <h1>📊 Health Records</h1>

      {message && (
        <div className={`alert ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      {/* Statistics */}
      {stats && (
        <div className="stats-section">
          <div className="stat-card">
            <h3>{stats.totalRecords}</h3>
            <p>Total Records</p>
          </div>
          <div className="stat-card">
            <h3>{Object.keys(stats.recordsByType || {}).length}</h3>
            <p>Record Types</p>
          </div>
          {stats.lastUpdated && (
            <div className="stat-card">
              <h3>{new Date(stats.lastUpdated).toLocaleDateString()}</h3>
              <p>Last Updated</p>
            </div>
          )}
        </div>
      )}

      <button
        className="btn-add"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "+ Add Health Record"}
      </button>

      {showForm && (
        <div className="form-card">
          <h2>Add Health Record</h2>
          <form onSubmit={handleAddRecord}>
            <div className="form-group">
              <label>Record Type</label>
              <select
                value={formData.recordType}
                onChange={(e) => {
                  setFormData({
                    recordType: e.target.value,
                    systolic: "",
                    diastolic: "",
                    weight: "",
                    temperature: "",
                    notes: "",
                  });
                }}
              >
                <option value="blood-pressure">Blood Pressure</option>
                <option value="weight">Weight</option>
                <option value="temperature">Temperature</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.recordType === "blood-pressure" && (
              <div className="form-row">
                <div className="form-group">
                  <label>Systolic (mmHg)</label>
                  <input
                    type="number"
                    value={formData.systolic}
                    onChange={(e) =>
                      setFormData({ ...formData, systolic: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Diastolic (mmHg)</label>
                  <input
                    type="number"
                    value={formData.diastolic}
                    onChange={(e) =>
                      setFormData({ ...formData, diastolic: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            )}

            {formData.recordType === "weight" && (
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  required
                />
              </div>
            )}

            {formData.recordType === "temperature" && (
              <div className="form-group">
                <label>Temperature (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.temperature}
                  onChange={(e) =>
                    setFormData({ ...formData, temperature: e.target.value })
                  }
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Any additional notes..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? "Adding..." : "Add Record"}
            </button>
          </form>
        </div>
      )}

      <div className="records-list">
        <h2>Your Records ({records.length})</h2>
        {records.length === 0 ? (
          <p className="no-data">No health records yet. Add your first one!</p>
        ) : (
          records
            .slice()
            .reverse()
            .map((record) => (
              <div key={record.id} className="record-card">
                <div className="record-type">📋 {record.type}</div>
                <div className="record-data">
                  {Object.entries(record.data)
                    .filter(([key]) => key !== "notes")
                    .map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {value}
                      </p>
                    ))}
                </div>
                <div className="record-date">
                  {new Date(record.timestamp).toLocaleDateString()}{" "}
                  {new Date(record.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
        )}
      </div>

      <style>{`
        .health-records-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .health-records-page h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 2.5em;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .stat-card h3 {
          margin: 0;
          font-size: 2em;
          margin-bottom: 8px;
        }

        .stat-card p {
          margin: 0;
          opacity: 0.9;
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
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
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

        .records-list {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
        }

        .records-list h2 {
          color: #333;
          margin-bottom: 20px;
        }

        .no-data {
          text-align: center;
          color: #999;
          padding: 40px;
        }

        .record-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-left: 5px solid #667eea;
        }

        .record-type {
          font-weight: bold;
          color: #667eea;
          margin-bottom: 10px;
        }

        .record-data p {
          margin: 5px 0;
          color: #666;
        }

        .record-date {
          font-size: 0.9em;
          color: #999;
          margin-top: 10px;
          font-style: italic;
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
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default HealthRecords;
