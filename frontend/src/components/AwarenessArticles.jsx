import React, { useState } from "react";
import { getHealthAwareness } from "../api/health";

function AwarenessArticles() {
  const [tips, setTips] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const generated = await getHealthAwareness(
        "Provide concise health awareness tips for the general public regarding diet, exercise, and mental health."
      );
      setTips(generated);
    } catch (err) {
      setError(err.message || "Failed to generate health tips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="awareness-articles-container">
      <h3>🌍 Global Health Resources</h3>
      <ul className="resource-list">
        <li>
          <a href="https://www.who.int/news-room" target="_blank" rel="noopener noreferrer">
            <span className="icon">🌐</span> WHO News & Updates
          </a>
        </li>
        <li>
          <a href="https://www.cdc.gov/healthyschools/index.htm" target="_blank" rel="noopener noreferrer">
            <span className="icon">🏫</span> CDC Health Education
          </a>
        </li>
        <li>
          <a href="https://www.mohfw.gov.in/" target="_blank" rel="noopener noreferrer">
            <span className="icon">🇮🇳</span> Ministry of Health (India)
          </a>
        </li>
      </ul>

      <div className="generator-section">
        <button 
          className="btn-generate"
          onClick={handleGenerate} 
          disabled={loading}
        >
          {loading ? "🔬 Analyzing Health Data..." : "✨ Generate AI Health Tips"}
        </button>

        {error && (
          <div className="error-box">
            <span>⚠️</span> {error}
          </div>
        )}

        {tips && !error && (
          <div className="tips-display-card">
            <div className="tips-content">
              {tips}
            </div>
            <div className="tips-disclaimer">
              <p>⚠️ This information is for general awareness only and is not medical advice.</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .awareness-articles-container {
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .resource-list {
          list-style: none;
          padding: 0;
          margin: 20px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }

        .resource-list li a {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          background: #f8fafc;
          border-radius: 8px;
          text-decoration: none;
          color: #4a5568;
          font-weight: 500;
          transition: all 0.2s;
          border: 1px solid #edf2f7;
        }

        .resource-list li a:hover {
          background: #edf2f7;
          border-color: #667eea;
          color: #667eea;
        }

        .generator-section {
          margin-top: 30px;
          border-top: 1px solid #edf2f7;
          padding-top: 30px;
        }

        .btn-generate {
          padding: 12px 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
          width: 100%;
        }

        .btn-generate:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-generate:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-box {
          margin-top: 15px;
          background: #fff5f5;
          color: #c53030;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tips-display-card {
          margin-top: 20px;
          background: #f0fff4;
          border-radius: 10px;
          border-left: 5px solid #48bb78;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .tips-content {
          padding: 20px;
          color: #2d3748;
          line-height: 1.6;
          white-space: pre-wrap;
          font-size: 1rem;
        }

        .tips-disclaimer {
          padding: 10px 20px;
          background: rgba(0,0,0,0.03);
          font-size: 0.8rem;
          color: #718096;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      `}</style>
    </div>
  );
}

export default AwarenessArticles;
