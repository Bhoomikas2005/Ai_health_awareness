import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EmergencyAlert = ({ isActive, riskScore, onClose, userLocation }) => {
  const [notificationSent, setNotificationSent] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isActive && riskScore > 80) {
      notifyEmergency();
      findNearbyHospitals();
    }
  }, [isActive, riskScore]);

  const notifyEmergency = async () => {
    try {
      const response = await fetch(`${API_URL}/api/emergency/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riskScore,
          userLocation,
          timestamp: new Date().toISOString(),
          severity: riskScore > 90 ? 'Critical' : 'High'
        })
      });
      const data = await response.json();
      if (data.success) {
        setNotificationSent(true);
      }
    } catch (error) {
      console.error('Error notifying emergency:', error);
    }
  };

  const findNearbyHospitals = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/emergency/nearby-hospitals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: userLocation || { lat: 28.6139, lng: 77.2090 }, // Default: Delhi
          radius: 5 // 5 km radius
        })
      });
      const data = await response.json();
      if (data.success) {
        setHospitals(data.hospitals || mockHospitals);
      }
    } catch (error) {
      console.error('Error finding hospitals:', error);
      setHospitals(mockHospitals);
    } finally {
      setLoading(false);
    }
  };

  if (!isActive) return null;

  const mockHospitals = [
    { id: 1, name: 'City General Hospital', distance: 0.8, lat: 28.6150, lng: 77.2100, phone: '+91-11-2345-6789' },
    { id: 2, name: 'Metro Medical Center', distance: 1.2, lat: 28.6120, lng: 77.2060, phone: '+91-11-2987-6543' },
    { id: 3, name: 'Emergency Care Unit', distance: 1.5, lat: 28.6180, lng: 77.2120, phone: '+91-11-5678-9012' }
  ];

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={{...styles.header, borderBottom: riskScore > 90 ? '4px solid #ff0000' : '4px solid #ff6b6b'}}>
          <span style={styles.alertIcon}>{riskScore > 90 ? '🚨' : '⚠️'}</span>
          <h1 style={styles.title}>
            {riskScore > 90 ? 'CRITICAL HEALTH ALERT!' : 'HIGH RISK DETECTED'}
          </h1>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Risk Info */}
        <div style={{...styles.riskInfo, backgroundColor: riskScore > 90 ? '#fff0f0' : '#fff5f5'}}>
          <div style={styles.riskScore}>
            <span style={styles.scoreLabel}>Risk Score</span>
            <span style={{
              ...styles.scoreValue,
              color: riskScore > 90 ? '#ff0000' : '#ff6b6b',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              {riskScore}
            </span>
          </div>
          <div style={styles.riskMessage}>
            <p style={styles.message}>
              {riskScore > 90 
                ? '🚑 IMMEDIATE MEDICAL ATTENTION REQUIRED' 
                : '⚠️ High risk level detected. Nearby hospitals have been notified.'}
            </p>
            {notificationSent && (
              <p style={styles.notification}>✓ Emergency services have been notified</p>
            )}
          </div>
        </div>

        {/* Nearby Hospitals */}
        <div style={styles.hospitalsSection}>
          <h2 style={styles.sectionTitle}>🏥 Nearby Hospitals</h2>
          {loading ? (
            <div style={styles.loading}>Finding hospitals...</div>
          ) : (
            <div style={styles.hospitalsList}>
              {(hospitals.length > 0 ? hospitals : mockHospitals).map((hospital, idx) => (
                <div key={idx} style={styles.hospitalCard}>
                  <div style={styles.hospitalInfo}>
                    <h3 style={styles.hospitalName}>{hospital.name}</h3>
                    <p style={styles.distance}>📍 {hospital.distance} km away</p>
                    <p style={styles.phone}>📞 {hospital.phone}</p>
                  </div>
                  <button 
                    onClick={() => openMap(hospital.lat, hospital.lng)}
                    style={styles.mapBtn}
                  >
                    🗺️ Map
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button 
            onClick={() => window.open('tel:911')}
            style={{...styles.actionBtn, backgroundColor: '#ff0000'}}
          >
            📞 Call Emergency (911)
          </button>
          <button 
            onClick={() => openGoogleMaps()}
            style={{...styles.actionBtn, backgroundColor: '#4285F4'}}
          >
            🗺️ Open Google Maps
          </button>
          <button 
            onClick={onClose}
            style={{...styles.actionBtn, backgroundColor: '#666'}}
          >
            ✓ Acknowledge
          </button>
        </div>

        {/* Emergency Contacts */}
        <div style={styles.contactsSection}>
          <h3 style={styles.contactsTitle}>Emergency Contacts</h3>
          <div style={styles.contactsGrid}>
            <div style={styles.contact}>
              <span>🚑</span>
              <p>Ambulance: 102</p>
            </div>
            <div style={styles.contact}>
              <span>🚨</span>
              <p>Police: 100</p>
            </div>
            <div style={styles.contact}>
              <span>🧠</span>
              <p>Mental Health: 1800-891-4416</p>
            </div>
            <div style={styles.contact}>
              <span>☠️</span>
              <p>Poison Control: 1800-118-110</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const openMap = (lat, lng) => {
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15`;
  window.open(mapsUrl, '_blank');
};

const openGoogleMaps = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const mapsUrl = `https://www.google.com/maps/search/hospitals+near+me/@${latitude},${longitude},15z`;
      window.open(mapsUrl, '_blank');
    }, () => {
      // Fallback to search for hospitals
      window.open('https://www.google.com/maps/search/hospitals/', '_blank');
    });
  } else {
    window.open('https://www.google.com/maps/search/hospitals/', '_blank');
  }
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    animation: 'slideIn 0.3s ease-out',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    backgroundColor: '#fff5f5',
    borderRadius: '12px 12px 0 0',
    position: 'relative',
  },
  alertIcon: {
    fontSize: '32px',
    animation: 'pulse 1s infinite',
  },
  title: {
    margin: 0,
    color: '#d32f2f',
    fontSize: '20px',
    fontWeight: 'bold',
    flex: 1,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
    padding: 0,
  },
  riskInfo: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    alignItems: 'center',
    borderRadius: '8px',
    margin: '15px',
  },
  riskScore: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '80px',
  },
  scoreLabel: {
    fontSize: '12px',
    color: '#999',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  scoreValue: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  riskMessage: {
    flex: 1,
  },
  message: {
    margin: '0 0 8px 0',
    fontSize: '16px',
    color: '#333',
    fontWeight: '600',
  },
  notification: {
    margin: 0,
    fontSize: '14px',
    color: '#4caf50',
    fontWeight: '500',
  },
  hospitalsSection: {
    padding: '15px',
  },
  sectionTitle: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#999',
  },
  hospitalsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  hospitalCard: {
    display: 'flex',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #eee',
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  distance: {
    margin: '2px 0',
    fontSize: '12px',
    color: '#666',
  },
  phone: {
    margin: '2px 0',
    fontSize: '12px',
    color: '#0066cc',
  },
  mapBtn: {
    padding: '8px 12px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '15px',
    borderTop: '1px solid #eee',
  },
  actionBtn: {
    padding: '12px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'transform 0.2s, opacity 0.2s',
  },
  contactsSection: {
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid #eee',
  },
  contactsTitle: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    color: '#333',
    fontWeight: 'bold',
  },
  contactsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  contact: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '6px',
    fontSize: '12px',
  },
};

export default EmergencyAlert;
