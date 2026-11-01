import React, { useState, useEffect } from "react";
import { analyzeImage, validateImageFile, fileToDataURL } from "../utils/imageAnalyzer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function DiseasePrediction() {
  // Symptom-based prediction state
  const [symptoms, setSymptoms] = useState([]);
  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Image-based analysis state
  const [analysisMode, setAnalysisMode] = useState("symptoms"); // "symptoms" or "image"
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageAnalysis, setImageAnalysis] = useState(null);

  useEffect(() => {
    // Fetch available symptoms
    fetch(`${API_URL}/api/disease/symptoms`)
      .then((res) => res.json())
      .then((data) => setAvailableSymptoms(data.symptoms || []))
      .catch((err) => setError("Failed to load symptoms"));
  }, []);

  const addSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
  };

  const predictDisease = async () => {
    if (symptoms.length === 0) {
      setError("Please select at least one symptom");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const res = await fetch(`${API_URL}/api/disease/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError("Failed to predict disease. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError("");
    setImageFile(file);

    // Show preview
    const preview = await fileToDataURL(file);
    setImagePreview(preview);
  };

  const analyzeImageButton = async () => {
    if (!imageFile) {
      setError("Please select an image first");
      return;
    }

    setImageLoading(true);
    setError("");
    setImageAnalysis(null);

    try {
      const analysis = await analyzeImage(imageFile);
      setImageAnalysis(analysis);
    } catch (err) {
      setError(`Failed to analyze image: ${err.message}`);
    } finally {
      setImageLoading(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageAnalysis(null);
  };

  return (
    <div className="disease-prediction-page">
      <h1>🩺 AI Disease Prediction</h1>
      <p className="subtitle">Predict diseases using symptoms OR medical imaging</p>

      {error && <div className="alert error">{error}</div>}

      {/* Mode Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${analysisMode === "symptoms" ? "active" : ""}`}
          onClick={() => {
            setAnalysisMode("symptoms");
            setError("");
          }}
        >
          🏥 Symptom Analysis
        </button>
        <button
          className={`mode-btn ${analysisMode === "image" ? "active" : ""}`}
          onClick={() => {
            setAnalysisMode("image");
            setError("");
          }}
        >
          📸 Medical Image Analysis
        </button>
      </div>

      {/* SYMPTOM ANALYSIS MODE */}
      {analysisMode === "symptoms" && (
        <div className="prediction-container">
          <div className="symptoms-section">
            <h2>Available Symptoms</h2>
            <div className="symptoms-grid">
              {availableSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  className={`symptom-btn ${
                    symptoms.includes(symptom) ? "selected" : ""
                  }`}
                  onClick={() => addSymptom(symptom)}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <div className="selected-section">
            <h2>Selected Symptoms ({symptoms.length})</h2>
            <div className="selected-symptoms">
              {symptoms.length === 0 ? (
                <p className="no-symptoms">Select symptoms above...</p>
              ) : (
                symptoms.map((symptom) => (
                  <div key={symptom} className="selected-tag">
                    {symptom}
                    <button
                      className="remove-btn"
                      onClick={() => removeSymptom(symptom)}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              className="btn-predict"
              onClick={predictDisease}
              disabled={loading || symptoms.length === 0}
            >
              {loading ? "Predicting..." : "🔍 Predict Disease"}
            </button>
          </div>
        </div>
      )}

      {/* IMAGE ANALYSIS MODE */}
      {analysisMode === "image" && (
        <div className="image-analysis-container">
          <div className="image-upload-section">
            <h2>📸 Upload Medical Image</h2>
            <p className="image-info">
              Upload X-ray, MRI, CT scan, or images of injuries for AI analysis
            </p>

            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
                id="image-input"
              />
              <label htmlFor="image-input" className="upload-label">
                <div className="upload-icon">📁</div>
                <div className="upload-text">
                  Click to select image or drag and drop
                </div>
                <div className="upload-formats">
                  Supported: JPG, PNG, GIF, WebP, TIFF (Max 10MB)
                </div>
              </label>
            </div>

            {imagePreview && (
              <div className="image-preview-container">
                <h3>Image Preview</h3>
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
                <div className="image-actions">
                  <button
                    className="btn-analyze"
                    onClick={analyzeImageButton}
                    disabled={imageLoading}
                  >
                    {imageLoading ? "Analyzing..." : "🔬 Analyze Image"}
                  </button>
                  <button className="btn-clear" onClick={clearImage}>
                    Clear Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {imageAnalysis && (
            <div className="image-analysis-result">
              <h2>📋 Medical Image Analysis Report</h2>

              {/* Image Analysis Details */}
              <div className="analysis-details-card">
                <h3>📊 Image Analysis Details</h3>
                <div className="analysis-detail-grid">
                  <div className="detail-box">
                    <label>Imaging Type</label>
                    <p>{imageAnalysis.imageAnalysis.imagingType}</p>
                  </div>
                  <div className="detail-box">
                    <label>Image Dimensions</label>
                    <p>{imageAnalysis.imageAnalysis.dimensions}</p>
                  </div>
                  <div className="detail-box">
                    <label>Analysis Timestamp</label>
                    <p>{new Date(imageAnalysis.timestamp).toLocaleString()}</p>
                  </div>
                </div>

                <div className="pixel-analysis">
                  <h4>Pixel Density Analysis</h4>
                  <div className="analysis-bars">
                    <div className="bar-item">
                      <label>Dark Areas</label>
                      <div className="bar">
                        <div
                          className="bar-fill dark"
                          style={{
                            width: imageAnalysis.imageAnalysis.pixelDensity.dark,
                          }}
                        ></div>
                      </div>
                      <span>{imageAnalysis.imageAnalysis.pixelDensity.dark}</span>
                    </div>
                    <div className="bar-item">
                      <label>Bright Areas</label>
                      <div className="bar">
                        <div
                          className="bar-fill bright"
                          style={{
                            width: imageAnalysis.imageAnalysis.pixelDensity.bright,
                          }}
                        ></div>
                      </div>
                      <span>{imageAnalysis.imageAnalysis.pixelDensity.bright}</span>
                    </div>
                    <div className="bar-item">
                      <label>Gray Areas</label>
                      <div className="bar">
                        <div
                          className="bar-fill gray"
                          style={{
                            width: imageAnalysis.imageAnalysis.pixelDensity.gray,
                          }}
                        ></div>
                      </div>
                      <span>{imageAnalysis.imageAnalysis.pixelDensity.gray}</span>
                    </div>
                  </div>
                </div>

                <div className="color-analysis">
                  <h4>Color Profile Analysis</h4>
                  <div className="color-bars">
                    <div className="color-item">
                      <label>Red</label>
                      <div className="color-bar">
                        <div
                          className="color-fill red"
                          style={{
                            width: imageAnalysis.imageAnalysis.colorProfile.red,
                          }}
                        ></div>
                      </div>
                      <span>{imageAnalysis.imageAnalysis.colorProfile.red}</span>
                    </div>
                    <div className="color-item">
                      <label>Green</label>
                      <div className="color-bar">
                        <div
                          className="color-fill green"
                          style={{
                            width:
                              imageAnalysis.imageAnalysis.colorProfile.green,
                          }}
                        ></div>
                      </div>
                      <span>{imageAnalysis.imageAnalysis.colorProfile.green}</span>
                    </div>
                    <div className="color-item">
                      <label>Blue</label>
                      <div className="color-bar">
                        <div
                          className="color-fill blue"
                          style={{
                            width: imageAnalysis.imageAnalysis.colorProfile.blue,
                          }}
                        ></div>
                      </div>
                      <span>{imageAnalysis.imageAnalysis.colorProfile.blue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="risk-assessment-card">
                <h3>⚠️ Overall Risk Assessment</h3>
                <div className="risk-grid">
                  <div className={`risk-level ${imageAnalysis.overallRiskAssessment.riskLevel.toLowerCase()}`}>
                    <label>Risk Level</label>
                    <p>{imageAnalysis.overallRiskAssessment.riskLevel}</p>
                  </div>
                  <div className="risk-confidence">
                    <label>Average Confidence</label>
                    <p>{imageAnalysis.overallRiskAssessment.averageConfidence}</p>
                  </div>
                  <div className="risk-urgency">
                    <label>Urgency</label>
                    <p>{imageAnalysis.overallRiskAssessment.urgency}</p>
                  </div>
                </div>
              </div>

              {/* Disease Predictions */}
              <div className="disease-predictions">
                <h3>💉 Disease Predictions</h3>
                <div className="predictions-list">
                  {imageAnalysis.predictions.map((pred, idx) => (
                    <div key={idx} className="prediction-card">
                      <div className="pred-header">
                        <h4>{pred.disease}</h4>
                        <span className={`confidence-badge ${pred.severity.toLowerCase()}`}>
                          {pred.confidence}
                        </span>
                      </div>

                      <div className="pred-detail">
                        <label>Severity:</label>
                        <p className={`severity ${pred.severity.toLowerCase()}`}>
                          {pred.severity}
                        </p>
                      </div>

                      <div className="pred-detail">
                        <label>Symptoms:</label>
                        <div className="symptoms-list">
                          {pred.symptoms.map((sym, i) => (
                            <span key={i} className="symptom-tag">
                              {sym}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pred-detail">
                        <label>Treatment:</label>
                        <p>{pred.treatment}</p>
                      </div>

                      <div className="pred-detail">
                        <label>Risk Factors:</label>
                        <div className="risk-list">
                          {pred.riskFactors.map((risk, i) => (
                            <li key={i}>{risk}</li>
                          ))}
                        </div>
                      </div>

                      <div className="pred-detail">
                        <label>Recommendations:</label>
                        <div className="recommendations-list">
                          {pred.recommendations.map((rec, i) => (
                            <div key={i} className="rec-item">
                              ✓ {rec}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analysis-disclaimer">
                <strong>⚠️ Important Disclaimer:</strong>
                <p>
                  {imageAnalysis.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SYMPTOM MODE RESULTS */}
      {analysisMode === "symptoms" && prediction && (
        <div className="prediction-result">
          <h2>📋 Prediction Result</h2>
          <div className="result-card">
            <div className="result-header">
              <h3>{prediction.disease}</h3>
              <span className={`confidence ${prediction.confidence}`}>
                {prediction.confidence}
              </span>
            </div>

            <div className="result-details">
              <div className="detail-item">
                <label>Description:</label>
                <p>{prediction.description}</p>
              </div>

              <div className="detail-item">
                <label>Severity:</label>
                <p className={`severity ${prediction.severity.toLowerCase()}`}>
                  {prediction.severity}
                </p>
              </div>

              <div className="detail-item">
                <label>Recommendation:</label>
                <p>{prediction.recommendation}</p>
              </div>

              <div className="disclaimer">
                <strong>⚠️ Disclaimer:</strong>
                <p>{prediction.disclaimer}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .disease-prediction-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .disease-prediction-page h1 {
          text-align: center;
          color: #333;
          margin-bottom: 10px;
          font-size: 2.5em;
        }

        .subtitle {
          text-align: center;
          color: #666;
          font-size: 1.1em;
          margin-bottom: 30px;
        }

        /* Mode Selector */
        .mode-selector {
          display: flex;
          gap: 15px;
          margin-bottom: 40px;
          justify-content: center;
        }

        .mode-btn {
          padding: 12px 30px;
          border: 2px solid #ddd;
          border-radius: 25px;
          background: white;
          cursor: pointer;
          font-size: 1em;
          font-weight: 500;
          transition: all 0.3s;
        }

        .mode-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .mode-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
        }

        /* Symptom Analysis */
        .prediction-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
        }

        .symptoms-section h2,
        .selected-section h2 {
          color: #333;
          margin-bottom: 15px;
          font-size: 1.3em;
        }

        .symptoms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
        }

        .symptom-btn {
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 5px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
        }

        .symptom-btn:hover {
          border-color: #667eea;
          background: #f0f0f0;
        }

        .symptom-btn.selected {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .selected-symptoms {
          background: #f9f9f9;
          border-radius: 5px;
          padding: 15px;
          min-height: 100px;
          margin-bottom: 20px;
          border: 1px solid #eee;
        }

        .no-symptoms {
          color: #999;
          font-style: italic;
        }

        .selected-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #667eea;
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          margin-right: 8px;
          margin-bottom: 8px;
          font-size: 0.9em;
        }

        .remove-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 18px;
          padding: 0;
          margin-left: 5px;
        }

        .btn-predict {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .btn-predict:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn-predict:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Image Analysis Container */
        .image-analysis-container {
          padding: 30px;
          background: #f9f9f9;
          border-radius: 10px;
        }

        .image-upload-section {
          margin-bottom: 40px;
        }

        .image-upload-section h2 {
          color: #333;
          margin-bottom: 10px;
        }

        .image-info {
          color: #666;
          margin-bottom: 25px;
        }

        /* Upload Area */
        .upload-area {
          position: relative;
        }

        .file-input {
          display: none;
        }

        .upload-label {
          display: block;
          border: 2px dashed #667eea;
          border-radius: 10px;
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          background: white;
          transition: all 0.3s;
        }

        .upload-label:hover {
          border-color: #764ba2;
          background: #f0f0ff;
        }

        .upload-icon {
          font-size: 3em;
          margin-bottom: 10px;
        }

        .upload-text {
          font-size: 1.1em;
          color: #333;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .upload-formats {
          font-size: 0.85em;
          color: #999;
        }

        /* Image Preview */
        .image-preview-container {
          margin-top: 25px;
          background: white;
          padding: 20px;
          border-radius: 10px;
        }

        .image-preview-container h3 {
          margin-top: 0;
          color: #333;
          margin-bottom: 15px;
        }

        .image-preview {
          margin-bottom: 20px;
          max-height: 400px;
          overflow: auto;
        }

        .image-preview img {
          max-width: 100%;
          max-height: 400px;
          border-radius: 8px;
          display: block;
          margin: 0 auto;
        }

        .image-actions {
          display: flex;
          gap: 10px;
        }

        .btn-analyze {
          flex: 1;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .btn-analyze:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn-analyze:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-clear {
          padding: 12px 20px;
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-clear:hover {
          background: #ee5a52;
        }

        /* Image Analysis Results */
        .image-analysis-result {
          margin-top: 40px;
        }

        .image-analysis-result h2 {
          color: #333;
          margin-bottom: 25px;
          font-size: 1.8em;
        }

        .analysis-details-card {
          background: white;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 25px;
          border-left: 5px solid #667eea;
        }

        .analysis-details-card h3 {
          color: #333;
          margin-bottom: 15px;
        }

        .analysis-detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .detail-box {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
        }

        .detail-box label {
          display: block;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .detail-box p {
          margin: 0;
          color: #666;
        }

        .pixel-analysis {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .pixel-analysis h4 {
          color: #333;
          margin-bottom: 15px;
        }

        .analysis-bars {
          display: grid;
          gap: 15px;
        }

        .bar-item {
          display: grid;
          grid-template-columns: 80px 1fr 60px;
          align-items: center;
          gap: 15px;
        }

        .bar-item label {
          font-weight: 500;
          color: #333;
        }

        .bar {
          background: #eee;
          height: 25px;
          border-radius: 5px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          transition: width 0.3s;
        }

        .bar-fill.dark {
          background: linear-gradient(90deg, #1a1a1a, #4a4a4a);
        }

        .bar-fill.bright {
          background: linear-gradient(90deg, #ffeb99, #ffff99);
        }

        .bar-fill.gray {
          background: linear-gradient(90deg, #a9a9a9, #d3d3d3);
        }

        .bar-item span {
          text-align: right;
          font-weight: 500;
          color: #666;
        }

        .color-analysis {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .color-analysis h4 {
          color: #333;
          margin-bottom: 15px;
        }

        .color-bars {
          display: grid;
          gap: 15px;
        }

        .color-item {
          display: grid;
          grid-template-columns: 80px 1fr 60px;
          align-items: center;
          gap: 15px;
        }

        .color-item label {
          font-weight: 500;
          color: #333;
        }

        .color-bar {
          background: #eee;
          height: 25px;
          border-radius: 5px;
          overflow: hidden;
        }

        .color-fill {
          height: 100%;
          transition: width 0.3s;
        }

        .color-fill.red {
          background: linear-gradient(90deg, #ff6b6b, #ff9999);
        }

        .color-fill.green {
          background: linear-gradient(90deg, #51cf66, #8fef70);
        }

        .color-fill.blue {
          background: linear-gradient(90deg, #339af0, #74c0fc);
        }

        .color-item span {
          text-align: right;
          font-weight: 500;
          color: #666;
        }

        /* Risk Assessment */
        .risk-assessment-card {
          background: white;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 25px;
          border-left: 5px solid #ff6b6b;
        }

        .risk-assessment-card h3 {
          color: #333;
          margin-bottom: 15px;
        }

        .risk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .risk-level,
        .risk-confidence,
        .risk-urgency {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
          text-align: center;
        }

        .risk-level label,
        .risk-confidence label,
        .risk-urgency label {
          display: block;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }

        .risk-level p,
        .risk-confidence p,
        .risk-urgency p {
          margin: 0;
          font-size: 1.1em;
          font-weight: bold;
        }

        .risk-level.critical {
          background: #ffe0e0;
          border-left: 4px solid #ff0000;
        }

        .risk-level.critical p {
          color: #cc0000;
        }

        .risk-level.high {
          background: #fff3cd;
          border-left: 4px solid #ff9800;
        }

        .risk-level.high p {
          color: #ff9800;
        }

        .risk-level.medium {
          background: #fff9e6;
          border-left: 4px solid #ffeb3b;
        }

        .risk-level.medium p {
          color: #ffeb3b;
        }

        .risk-level.low {
          background: #e8f5e9;
          border-left: 4px solid #4caf50;
        }

        .risk-level.low p {
          color: #4caf50;
        }

        /* Disease Predictions */
        .disease-predictions {
          background: white;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 25px;
        }

        .disease-predictions h3 {
          color: #333;
          margin: 0 0 20px 0;
        }

        .predictions-list {
          display: grid;
          gap: 20px;
        }

        .prediction-card {
          background: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
        }

        .pred-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #eee;
        }

        .pred-header h4 {
          margin: 0;
          color: #333;
          font-size: 1.2em;
        }

        .confidence-badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9em;
        }

        .confidence-badge.critical {
          background: #ff0000;
          color: white;
        }

        .confidence-badge.high {
          background: #ff9800;
          color: white;
        }

        .confidence-badge.medium {
          background: #ffeb3b;
          color: #333;
        }

        .confidence-badge.low {
          background: #4caf50;
          color: white;
        }

        .pred-detail {
          margin-bottom: 15px;
        }

        .pred-detail label {
          display: block;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .pred-detail p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        .severity {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 5px;
          font-weight: bold;
        }

        .severity.critical {
          background: #ff0000;
          color: white;
        }

        .severity.high {
          background: #ff9800;
          color: white;
        }

        .severity.medium {
          background: #ffeb3b;
          color: #333;
        }

        .severity.low {
          background: #4caf50;
          color: white;
        }

        .symptoms-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .symptom-tag {
          background: #667eea;
          color: white;
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 0.85em;
        }

        .risk-list {
          margin: 0;
          padding-left: 20px;
          color: #666;
        }

        .risk-list li {
          margin-bottom: 5px;
        }

        .recommendations-list {
          display: grid;
          gap: 8px;
        }

        .rec-item {
          background: #e8f5e9;
          padding: 8px 12px;
          border-radius: 5px;
          color: #2e7d32;
        }

        /* Analysis Disclaimer */
        .analysis-disclaimer {
          background: #e7f3ff;
          border-left: 4px solid #2196F3;
          padding: 15px;
          border-radius: 5px;
          margin-top: 25px;
        }

        .analysis-disclaimer strong {
          color: #1976D2;
          display: block;
          margin-bottom: 8px;
        }

        .analysis-disclaimer p {
          margin: 0;
          color: #333;
          line-height: 1.6;
        }

        /* Prediction Results */
        .prediction-result {
          background: #f5f5f5;
          padding: 30px;
          border-radius: 10px;
          margin-top: 30px;
        }

        .prediction-result h2 {
          color: #333;
          margin-bottom: 20px;
        }

        .result-card {
          background: white;
          padding: 25px;
          border-radius: 8px;
          border-left: 5px solid #667eea;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #eee;
        }

        .result-header h3 {
          margin: 0;
          font-size: 1.5em;
          color: #333;
        }

        .confidence {
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: bold;
          background: #fff3cd;
          color: #856404;
        }

        .result-details {
          display: grid;
          gap: 15px;
        }

        .detail-item label {
          display: block;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .detail-item p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        .disclaimer {
          background: #e7f3ff;
          border-left: 4px solid #2196F3;
          padding: 15px;
          margin-top: 20px;
          border-radius: 5px;
        }

        .disclaimer strong {
          color: #1976D2;
        }

        .disclaimer p {
          margin: 8px 0 0 0;
          color: #333;
          line-height: 1.6;
        }

        .alert.error {
          background: #f8d7da;
          color: #721c24;
          padding: 12px;
          border-radius: 5px;
          margin-bottom: 20px;
          border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
          .prediction-container {
            grid-template-columns: 1fr;
          }

          .symptoms-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }

          .mode-selector {
            flex-direction: column;
          }

          .mode-btn {
            width: 100%;
          }

          .analysis-detail-grid {
            grid-template-columns: 1fr;
          }

          .bar-item,
          .color-item {
            grid-template-columns: 1fr;
          }

          .risk-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default DiseasePrediction;
