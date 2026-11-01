import React from "react";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>🏥 About HealthAI</h1>
          <p className="lead">Empowering everyone with accessible, AI-powered health insights.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="mission-box">
            <h2>🎯 Our Mission</h2>
            <p>
              HealthAI was developed with a single mission: to provide accurate, timely, and accessible 
              health information to the general public. By leveraging state-of-the-art Artificial 
              Intelligence, we aim to bridge the gap between medical knowledge and everyday awareness, 
              helping people make more informed decisions about their well-being.
            </p>
          </div>

          <div className="how-it-works">
            <h2>⚙️ How It Works</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">1</div>
                <h3>Input Symptoms</h3>
                <p>Provide 3 or more symptoms or upload a medical image for AI analysis.</p>
              </div>
              <div className="step-card">
                <div className="step-num">2</div>
                <h3>AI Analysis</h3>
                <p>Our multi-agent system analyzes your input against clinical databases.</p>
              </div>
              <div className="step-card">
                <div className="step-num">3</div>
                <h3>Get Insights</h3>
                <p>Receive immediate health advice, risk assessments, and next-step recommendations.</p>
              </div>
            </div>
          </div>

          <div className="tech-stack">
            <h2>💻 Technology Stack</h2>
            <p>Built with modern, high-performance technologies to ensure stability and security:</p>
            <div className="tech-grid">
              <div className="tech-item"><strong>Frontend:</strong> React.js, Vite, React Router</div>
              <div className="tech-item"><strong>Backend:</strong> Node.js, Express.js</div>
              <div className="tech-item"><strong>AI Core:</strong> Custom NLP Models, Medical Image Analysis (Vision AI)</div>
              <div className="tech-item"><strong>Security:</strong> ES Modules, Cross-Origin Resource Sharing (CORS)</div>
            </div>
          </div>

          <div className="team-disclaimer">
            <div className="disclaimer-note">
              <h3>⚠️ Important Notice</h3>
              <p>
                HealthAI is designed for informational and educational purposes only. It is not 
                intended to replace professional medical advice, diagnosis, or treatment. 
                In case of a medical emergency, please contact emergency services (112 or 108) 
                immediately.
              </p>
            </div>
            <p className="team-credit">Developed with ❤️ for the SIH Hackathon.</p>
          </div>
        </div>
      </section>

      <style>{`
        .about-page {
          background: #f8fafc;
          min-height: 100vh;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .about-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
        }

        .about-hero h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .lead {
          font-size: 1.4rem;
          opacity: 0.9;
          font-weight: 300;
        }

        .about-content {
          padding: 60px 0;
        }

        .mission-box, .how-it-works, .tech-stack, .team-disclaimer {
          background: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        h2 {
          color: #2d3748;
          margin-bottom: 25px;
          border-bottom: 3px solid #667eea;
          display: inline-block;
          padding-bottom: 5px;
        }

        p {
          line-height: 1.8;
          color: #4a5568;
          font-size: 1.1rem;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }

        .step-card {
          padding: 30px;
          background: #f7fafc;
          border-radius: 15px;
          text-align: center;
          transition: transform 0.3s;
        }

        .step-card:hover { transform: translateY(-5px); }

        .step-num {
          width: 40px;
          height: 40px;
          background: #667eea;
          color: white;
          border-radius: 50%;
          line-height: 40px;
          margin: 0 auto 15px;
          font-weight: bold;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 20px;
        }

        .tech-item {
          padding: 15px;
          background: #f1f5f9;
          border-radius: 10px;
          font-size: 1rem;
          color: #334155;
        }

        .disclaimer-note {
          background: #fff5f5;
          padding: 25px;
          border-radius: 12px;
          border-left: 5px solid #f56565;
          margin-bottom: 20px;
        }

        .disclaimer-note h3 { color: #c53030; margin-top: 0; }
        .disclaimer-note p { color: #742a2a; margin-bottom: 0; }

        .team-credit {
          text-align: center;
          font-weight: 600;
          color: #718096;
        }

        @media (max-width: 768px) {
          .tech-grid { grid-template-columns: 1fr; }
          .about-hero h1 { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}

export default About;
