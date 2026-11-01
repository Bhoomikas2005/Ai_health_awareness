import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStatus({ type: "success", message: "Thank you! We've received your message and will get back to you soon." });
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 1500);
  };

  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <h1>📨 Get in Touch</h1>
        <p>Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-section">
          <div className="info-card">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h5>Our Office</h5>
                <p>HealthAI Headquarters, New Delhi, India</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <h5>Email Us</h5>
                <p>support@healthai.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h5>Call Us</h5>
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`status-alert ${status.type}`}>
                {status.type === 'error' ? '⚠️' : '✅'} {status.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select 
                id="subject" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                disabled={loading}
              ></textarea>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-page-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .contact-header h1 {
          font-size: 2.5rem;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .contact-header p {
          color: #718096;
          font-size: 1.1rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
        }

        .contact-info-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 40px;
          color: white;
          color: white;
        }

        .info-item {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .info-icon {
          font-size: 1.5rem;
          background: rgba(255,255,255,0.2);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .info-item h5 {
          margin: 0 0 5px 0;
          font-size: 1.1rem;
        }

        .info-item p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .contact-form-section {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a5568;
        }

        .form-group input, 
        .form-group select, 
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          border-color: #667eea;
        }

        .btn-submit {
          width: 100%;
          padding: 14px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-submit:hover:not(:disabled) {
          background: #764ba2;
        }

        .status-alert {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .status-alert.error {
          background: #fff5f5;
          color: #c53030;
          border: 1px solid #feb2b2;
        }

        .status-alert.success {
          background: #f0fff4;
          color: #2f855a;
          border: 1px solid #9ae6b4;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-page-container {
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;
