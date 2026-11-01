import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function SymptomChecker() {
  const [symptom, setSymptom] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!symptom.trim()) {
      setError("Please enter a symptom first.");
      return;
    }

    setLoading(true);
    setError("");
    setAdvice("");

    try {
      const res = await fetch(`${API_URL}/api/symptom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from server.");
      }

      const data = await res.json();
      
      // Aligning with backend response field 'advice'
      if (data.advice) {
        setAdvice(data.advice);
      } else if (data.result) {
        setAdvice(data.result);
      } else {
        setAdvice("No specific advice found for this symptom.");
      }
    } catch (err) {
      setError("Unable to connect to the symptom checker. Please try again later.");
      console.error("Symptom checker error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="symptom-checker-card">
      <div className="input-group">
        <input
          type="text"
          className="symptom-input"
          value={symptom}
          onChange={e => setSymptom(e.target.value)}
          placeholder="e.g., fever, headache, cough..."
          onKeyDown={e => e.key === "Enter" && handleCheck()}
          disabled={loading}
        />
        <button 
          className="btn-check" 
          onClick={handleCheck} 
          disabled={loading || !symptom.trim()}
        >
          {loading ? <span className="spinner"></span> : "Analyze"}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span> {error}
        </div>
      )}

      {loading && <div className="loading-state">🔬 AI is analyzing your symptoms...</div>}

      {advice && (
        <div className="advice-card">
          <div className="advice-header">
            <h4>📋 AI Health Advice</h4>
          </div>
          <p className="advice-text">{advice}</p>
          <div className="disclaimer-footer">
            <p>⚠️ <strong>Disclaimer:</strong> This is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.</p>
          </div>
        </div>
      )}

      <style>{`
        .symptom-checker-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          margin-bottom: 30px;
        }

        .input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .symptom-input {
          flex: 1;
          padding: 12px 15px;
          border: 2px solid #edf2f7;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .symptom-input:focus {
          border-color: #667eea;
        }

        .btn-check {
          padding: 0 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-check:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .advice-card {
          margin-top: 20px;
          padding: 20px;
          background: #f7fafc;
          border-left: 4px solid #667eea;
          border-radius: 6px;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .advice-header h4 {
          margin: 0 0 10px 0;
          color: #2d3748;
          font-size: 1.1rem;
        }

        .advice-text {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .disclaimer-footer {
          font-size: 0.85rem;
          color: #718096;
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
          font-style: italic;
        }

        .error-message {
          color: #e53e3e;
          background: #fff5f5;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 15px;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .loading-state {
          color: #667eea;
          font-weight: 500;
          margin: 15px 0;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default SymptomChecker;
