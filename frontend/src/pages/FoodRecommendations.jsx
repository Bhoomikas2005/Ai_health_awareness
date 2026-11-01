import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function FoodRecommendations() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const availableSymptoms = [
    "fever",
    "cough",
    "headache",
    "diarrhea",
    "fatigue",
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/food/recipes`);
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error("Failed to fetch recipes");
    }
  };

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError("");
    setRecommendations(null);

    try {
      const res = await fetch(`${API_URL}/api/food/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-page">
      <h1>🥗 Smart Food Recommendations</h1>
      <p className="subtitle">Get personalized food suggestions based on your symptoms</p>

      {error && <div className="alert error">{error}</div>}

      <div className="food-container">
        {/* Symptoms Selection */}
        <div className="symptoms-section">
          <h2>Select Your Symptoms</h2>
          <div className="symptoms-buttons">
            {availableSymptoms.map((symptom) => (
              <button
                key={symptom}
                className={`symptom-btn ${
                  selectedSymptoms.includes(symptom) ? "selected" : ""
                }`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
          <button
            className="btn-get-rec"
            onClick={getRecommendations}
            disabled={loading || selectedSymptoms.length === 0}
          >
            {loading ? "Getting recommendations..." : "Get Recommendations"}
          </button>
        </div>

        {/* Recommendations */}
        {recommendations && (
          <div className="recommendations-section">
            <h2>Food Recommendations</h2>

            <div className="rec-cards">
              <div className="rec-card good">
                <h3>✅ Recommended Foods</h3>
                <ul>
                  {recommendations.recommendations.recommended.map((food, idx) => (
                    <li key={idx}>{food}</li>
                  ))}
                </ul>
              </div>

              <div className="rec-card bad">
                <h3>❌ Foods to Avoid</h3>
                <ul>
                  {recommendations.recommendations.avoid.map((food, idx) => (
                    <li key={idx}>{food}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="tips-section">
              <h3>💡 Health Tips</h3>
              <ul>
                {recommendations.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Recipes Section */}
      <div className="recipes-section">
        <h2>🍳 Healthy Recipes</h2>
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.name}</h3>
              <p className="recipe-meta">⏱️ {recipe.duration} | 📊 {recipe.difficulty}</p>

              <div className="recipe-details">
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>

                <h4>Benefits:</h4>
                <p>{recipe.benefits}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .food-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .food-page h1 {
          text-align: center;
          color: #333;
          margin-bottom: 10px;
          font-size: 2.5em;
        }

        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 40px;
          font-size: 1.1em;
        }

        .food-container {
          background: white;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 40px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .symptoms-section h2,
        .recommendations-section h2,
        .recipes-section h2 {
          color: #333;
          margin: 20px 0;
          font-size: 1.5em;
        }

        .symptoms-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .symptom-btn {
          padding: 10px 15px;
          border: 2px solid #ddd;
          border-radius: 5px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          font-weight: 500;
        }

        .symptom-btn:hover {
          border-color: #667eea;
        }

        .symptom-btn.selected {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .btn-get-rec {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: transform 0.3s;
        }

        .btn-get-rec:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn-get-rec:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .rec-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .rec-card {
          padding: 20px;
          border-radius: 8px;
          border-left: 5px solid;
        }

        .rec-card.good {
          background: #d4edda;
          border-color: #155724;
          color: #155724;
        }

        .rec-card.bad {
          background: #f8d7da;
          border-color: #721c24;
          color: #721c24;
        }

        .rec-card h3 {
          margin-top: 0;
          margin-bottom: 15px;
        }

        .rec-card ul {
          margin: 0;
          padding-left: 20px;
        }

        .rec-card li {
          margin: 8px 0;
          line-height: 1.6;
        }

        .tips-section {
          background: #e7f3ff;
          padding: 20px;
          border-radius: 8px;
          border-left: 5px solid #2196F3;
          margin-top: 20px;
        }

        .tips-section h3 {
          color: #1976D2;
          margin-top: 0;
        }

        .tips-section ul {
          margin: 15px 0 0 0;
          padding-left: 20px;
        }

        .tips-section li {
          margin: 8px 0;
          color: #333;
          line-height: 1.6;
        }

        .recipes-section {
          margin-top: 40px;
        }

        .recipes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .recipe-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }

        .recipe-card:hover {
          transform: translateY(-5px);
        }

        .recipe-card h3 {
          color: #333;
          margin: 0 0 10px 0;
          font-size: 1.3em;
        }

        .recipe-meta {
          color: #666;
          font-size: 0.9em;
          margin-bottom: 15px;
        }

        .recipe-details h4 {
          color: #333;
          margin: 12px 0 8px 0;
        }

        .recipe-details ul {
          margin: 0 0 15px 0;
          padding-left: 20px;
        }

        .recipe-details li {
          margin: 5px 0;
          color: #666;
        }

        .recipe-details p {
          color: #666;
          margin: 0;
          font-style: italic;
        }

        .alert {
          padding: 12px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }

        .alert.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
          .rec-cards {
            grid-template-columns: 1fr;
          }

          .recipes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default FoodRecommendations;
