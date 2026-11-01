import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [showBanner, setShowBanner] = useState(true);

  const features = [
    {
      to: "/risk-dashboard",
      icon: "📊",
      title: "Risk Dashboard",
      description: "Monitor your health risks with our advanced AI analytics engine."
    },
    {
      to: "/disease-prediction",
      icon: "🩺",
      title: "Disease Prediction",
      description: "Get early insights into potential health conditions using medical image analysis."
    },
    {
      to: "/appointments",
      icon: "👨‍⚕️",
      title: "Doctor Appointments",
      description: "Schedule consultations with top-rated medical professionals near you."
    },
    {
      to: "/medications",
      icon: "💊",
      title: "Medication Tracker",
      description: "Never miss a dose with our smart medication scheduling and reminder system."
    },
    {
      to: "/health-records",
      icon: "📋",
      title: "Health Records",
      description: "Securely store and access your entire medical history in one place."
    },
    {
      to: "/food-recommendations",
      icon: "🥗",
      title: "Food Recommendations",
      description: "Personalized diet plans tailored to your health profile and nutritional goals."
    }
  ];

  return (
    <div className="home-container">
      {showBanner && (
        <div className="disclaimer-banner">
          <div className="banner-content">
            <span>⚠️ <strong>Notice:</strong> HealthAI provides general health information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.</span>
            <button className="banner-close" onClick={() => setShowBanner(false)}>✕</button>
          </div>
        </div>
      )}

      <header className="hero-section">
        <div className="hero-content">
          <h1>🏥 Welcome to HealthAI</h1>
          <p className="hero-subtitle">Your Comprehensive AI-Powered Health Management Platform</p>
          <div className="hero-badges">
            <span className="badge">AI-Driven</span>
            <span className="badge">Secure</span>
            <span className="badge">Personalized</span>
          </div>
        </div>
      </header>

      <main className="features-section">
        <h2>Explore Our Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <Link key={index} to={feature.to} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="arrow">→</div>
            </Link>
          ))}
        </div>
      </main>

      <section className="info-section">
        <div className="info-card">
          <h3>Why HealthAI?</h3>
          <p>
            Our platform leverages state-of-the-art machine learning models to provide you with 
            actionable health insights. From analyzing medical images for early disease detection 
            to managing your daily medication, we empower you to take control of your well-being.
          </p>
        </div>
      </section>

      <style>{`
        .home-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .disclaimer-banner {
          background: #fffbe6;
          border: 1px solid #ffe58f;
          border-radius: 8px;
          margin-bottom: 30px;
          padding: 12px 20px;
          color: #856404;
          font-size: 0.95rem;
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .banner-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .banner-close {
          background: none;
          border: none;
          color: #856404;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0 5px;
          font-weight: bold;
        }

        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 20px;
          border-radius: 20px;
          text-align: center;
          margin-bottom: 50px;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-section h1 {
          margin: 0;
          font-size: 3.5rem;
          margin-bottom: 20px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          margin: 0;
          font-size: 1.4rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto 30px;
          line-height: 1.6;
        }

        .hero-badges {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .badge {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .features-section {
          margin-bottom: 60px;
        }

        .features-section h2 {
          text-align: center;
          color: #1a202c;
          font-size: 2.2rem;
          margin-bottom: 45px;
          font-weight: 700;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          text-decoration: none;
          color: #2d3748;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid #edf2f7;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .feature-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: #667eea;
        }

        .feature-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          margin: 0 0 12px 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
        }

        .feature-card p {
          margin: 0;
          color: #718096;
          font-size: 1rem;
          line-height: 1.6;
          flex-grow: 1;
        }

        .arrow {
          margin-top: 20px;
          color: #667eea;
          font-weight: bold;
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .arrow {
          transform: translateX(8px);
        }

        .info-section {
          margin-top: 60px;
          background: #f7fafc;
          padding: 50px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
        }

        .info-card h3 {
          color: #1a202c;
          margin-top: 0;
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        .info-card p {
          color: #4a5568;
          font-size: 1.1rem;
          line-height: 1.8;
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.1rem;
          }
          .disclaimer-banner {
            padding: 10px 15px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
