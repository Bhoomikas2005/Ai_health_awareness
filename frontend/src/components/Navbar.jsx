import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">🏥 HealthAI</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/risk-dashboard" className="risk-dashboard-link">📊 Risk Dashboard</Link></li>
          <li><Link to="/disease-prediction">🩺 Disease Prediction</Link></li>
          
          <li className="dropdown">
            <button
              className="dropdown-btn"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              More Features ▼
            </button>
            {dropdownOpen && (
              <div
                className="dropdown-menu"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link to="/appointments">👨‍⚕️ Doctor Appointments</Link>
                <Link to="/medications">💊 Medication Tracker</Link>
                <Link to="/health-records">📊 Health Records</Link>
                <Link to="/food-recommendations">🥗 Food Recommendations</Link>
              </div>
            )}
          </li>

          <li><Link to="/resources">📚 Resources</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {userEmail ? (
            <li className="profile-section">
              <button
                className="profile-btn"
                onMouseEnter={() => setProfileDropdown(true)}
                onMouseLeave={() => setProfileDropdown(false)}
              >
                👤 {userName} ▼
              </button>
              {profileDropdown && (
                <div
                  className="profile-dropdown"
                  onMouseEnter={() => setProfileDropdown(true)}
                  onMouseLeave={() => setProfileDropdown(false)}
                >
                  <div className="profile-email">{userEmail}</div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li><Link to="/auth" className="auth-link">Login/Register</Link></li>
          )}
        </ul>
      </div>

      <style>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1em 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }

        .logo {
          color: white;
          margin: 0;
          font-size: 1.8em;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 30px;
          margin: 0;
          padding: 0;
          align-items: center;
          flex-wrap: wrap;
        }

        .nav-links a, .dropdown-btn, .profile-btn {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1em;
          padding: 5px 10px;
        }

        .nav-links a:hover, .dropdown-btn:hover, .profile-btn:hover {
          opacity: 0.8;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .auth-link {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          padding: 8px 16px;
        }

        .dropdown {
          position: relative;
        }

        .dropdown-btn {
          padding: 5px 10px;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          min-width: 200px;
          margin-top: 10px;
          overflow: hidden;
        }

        .dropdown-menu a {
          display: block;
          color: #333;
          padding: 12px 20px;
          text-decoration: none;
          transition: background 0.3s;
          font-weight: 400;
        }

        .dropdown-menu a:hover {
          background: #f0f0f0;
          text-shadow: none;
        }

        .profile-section {
          position: relative;
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          min-width: 200px;
          margin-top: 10px;
          overflow: hidden;
        }

        .profile-email {
          color: #666;
          padding: 12px 20px;
          border-bottom: 1px solid #eee;
          font-size: 0.9em;
        }

        .logout-btn {
          width: 100%;
          padding: 12px 20px;
          background: none;
          border: none;
          color: #d32f2f;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          text-align: left;
        }

        .logout-btn:hover {
          background: #ffebee;
        }

        .risk-dashboard-link {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          padding: 8px 14px !important;
          font-weight: 600;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .risk-dashboard-link:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
          opacity: 1 !important;
        }

        @media (max-width: 768px) {
          .nav-links {
            gap: 15px;
            font-size: 0.9em;
          }

          .dropdown-menu {
            min-width: 150px;
          }

          .dropdown-menu a {
            padding: 10px 15px;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
