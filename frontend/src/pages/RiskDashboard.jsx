import React, { useState, useEffect, useRef } from 'react';
import EmergencyAlert from '../components/EmergencyAlert.jsx';

const RiskDashboard = () => {
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [riskAlerts, setRiskAlerts] = useState([]);
  const [showEmergency, setShowEmergency] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    fetchRiskData();
    fetchRiskAlerts();
  }, [selectedPeriod]);

  useEffect(() => {
    // Show emergency alert if critical risk detected
    if (riskData && riskData.riskScore > 80) {
      setShowEmergency(true);
    }
  }, [riskData?.riskScore]);

  const fetchRiskData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/risk-dashboard/analysis?period=${selectedPeriod}`);
      const data = await response.json();
      if (data.success) {
        setRiskData(data.riskAnalysis);
      }
    } catch (error) {
      console.error('Error fetching risk data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRiskAlerts = async () => {
    try {
      const response = await fetch('/api/risk-dashboard/alerts');
      const data = await response.json();
      if (data.success) {
        setRiskAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const initializeGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  };

  const findNearbyHospitals = async () => {
    if (!userLocation) {
      alert('Location access required to find nearby hospitals');
      return;
    }

    setLoadingHospitals(true);
    try {
      const response = await fetch('/api/risk-dashboard/nearby-hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          radius: 5000 // 5km radius
        })
      });
      const data = await response.json();
      if (data.success) {
        setHospitals(data.hospitals);
        initializeMap();
      }
    } catch (error) {
      console.error('Error finding hospitals:', error);
    } finally {
      setLoadingHospitals(false);
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || !userLocation) return;

    // Create mock map if Google Maps not available
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = `
      <div style="width: 100%; height: 400px; background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
        <div style="text-align: center;">
          <p style="font-size: 1rem; margin: 0 0 10px 0;">📍 Nearby Hospitals Map</p>
          <p style="font-size: 0.9rem; margin: 0;">Your Location: ${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}</p>
          <p style="font-size: 0.9rem; margin: 5px 0 0 0;">Found ${hospitals.length} hospitals nearby</p>
        </div>
      </div>
    `;
  };

  const triggerEmergencyAlert = async () => {
    try {
      await fetch('/api/risk-dashboard/emergency-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riskScore: riskData.riskScore,
          riskLevel: riskData.overallRiskLevel,
          location: userLocation,
          timestamp: new Date()
        })
      });
    } catch (error) {
      console.error('Error sending emergency alert:', error);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading Risk Dashboard...</p>
        </div>
      </div>
    );
  }

  const overallRiskLevel = riskData?.overallRiskLevel || 'Medium';
  const riskScore = riskData?.riskScore || 0;
  const riskPercentage = riskScore / 100;

  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical': return '#ff4444';
      case 'High': return '#ff6b6b';
      case 'Medium': return '#ffa500';
      case 'Low': return '#4caf50';
      default: return '#999';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case 'Critical': return '#fff0f0';
      case 'High': return '#fff5f5';
      case 'Medium': return '#fff8f0';
      case 'Low': return '#f0fff4';
      default: return '#f5f5f5';
    }
  };

  return (
    <div style={styles.container}>
      {/* Emergency Alert Modal Component */}
      <EmergencyAlert 
        isActive={showEmergency && riskData?.riskScore > 75}
        riskScore={riskData?.riskScore || 0}
        onClose={() => setShowEmergency(false)}
        userLocation={userLocation}
      />

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 Health Risk Dashboard</h1>
        <p style={styles.subtitle}>Comprehensive health risk assessment and monitoring</p>
      </div>

      {/* Critical Alerts */}
      {riskAlerts.length > 0 && (
        <div style={styles.alertsSection}>
          <h2 style={styles.sectionTitle}>⚠️ Health Alerts</h2>
          <div style={styles.alertsList}>
            {riskAlerts.map((alert, idx) => (
              <div key={idx} style={{...styles.alertBox, borderLeft: `5px solid ${getRiskColor(alert.severity)}`}}>
                <span style={{fontSize: '20px', color: getRiskColor(alert.severity)}}>⚠️</span>
                <div style={styles.alertContent}>
                  <h3 style={styles.alertTitle}>{alert.title}</h3>
                  <p style={styles.alertMessage}>{alert.message}</p>
                  <span style={styles.alertSeverity}>{alert.severity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overall Risk Score */}
      <div style={styles.grid2}>
        <div style={{...styles.card, backgroundColor: getRiskBgColor(overallRiskLevel)}}>
          <div style={styles.riskScoreHeader}>
            <h2 style={styles.cardTitle}>Overall Risk Score</h2>
            <span style={{fontSize: '32px', color: getRiskColor(overallRiskLevel)}}>🛡️</span>
          </div>
          
          <div style={styles.riskScoreDisplay}>
            <div style={styles.scoreCircle}>
              <svg style={styles.scoreCircleSvg} viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getRiskColor(overallRiskLevel)}
                  strokeWidth="8"
                  strokeDasharray={`${283 * riskPercentage} 283`}
                  style={{transform: 'rotate(-90deg)', transformOrigin: '50% 50%'}}
                />
              </svg>
              <div style={styles.scoreText}>
                <span style={styles.scoreValue}>{riskScore}</span>
                <span style={styles.scoreLabel}>Risk Score</span>
              </div>
            </div>
          </div>

          <div style={styles.riskLevelBox}>
            <span style={{...styles.riskBadge, backgroundColor: getRiskColor(overallRiskLevel)}}>
              {overallRiskLevel} Risk
            </span>
          </div>

          <p style={styles.riskDescription}>
            {overallRiskLevel === 'Critical' && '⚠️ Seek immediate medical attention'}
            {overallRiskLevel === 'High' && '⚠️ Consult healthcare professional urgently'}
            {overallRiskLevel === 'Medium' && '📋 Schedule medical consultation'}
            {overallRiskLevel === 'Low' && '✅ Continue preventive care practices'}
          </p>
        </div>

        {/* Risk Breakdown */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Risk Breakdown</h2>
          <div style={styles.riskBreakdown}>
            {riskData?.riskCategories?.map((category, idx) => (
              <div key={idx} style={styles.riskCategory}>
                <div style={styles.categoryHeader}>
                  <span style={styles.categoryName}>{category.name}</span>
                  <span style={{...styles.categoryBadge, backgroundColor: getRiskColor(category.level)}}>
                    {category.percentage}%
                  </span>
                </div>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${category.percentage}%`,
                      backgroundColor: getRiskColor(category.level)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disease Predictions */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📊 Disease Risk Predictions</h2>
        <div style={styles.grid3}>
          {riskData?.topDiseases?.map((disease, idx) => (
            <div key={idx} style={{...styles.diseaseCard, borderLeft: `4px solid ${getRiskColor(disease.severity)}`}}>
              <h3 style={styles.diseaseName}>{disease.name}</h3>
              <div style={styles.diseaseDetails}>
                <div style={styles.detailRow}>
                  <span>Confidence:</span>
                  <strong>{disease.confidence}%</strong>
                </div>
                <div style={styles.detailRow}>
                  <span>Risk Level:</span>
                  <strong style={{color: getRiskColor(disease.severity)}}>{disease.severity}</strong>
                </div>
                <div style={styles.detailRow}>
                  <span>Likelihood:</span>
                  <strong>{disease.probability}%</strong>
                </div>
              </div>
              <p style={styles.diseaseDescription}>{disease.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Health Metrics */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📈 Health Metrics</h2>
        <div style={styles.metricsGrid}>
          {riskData?.healthMetrics?.map((metric, idx) => (
            <div key={idx} style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <span style={{fontSize: '24px', color: metric.color}}>❤️</span>
                <h3 style={styles.metricName}>{metric.name}</h3>
              </div>
              <div style={styles.metricValue}>{metric.value}</div>
              <p style={styles.metricNormal}>Normal: {metric.normal}</p>
              <p style={styles.metricStatus}>{metric.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Trends */}
      <div style={styles.card}>
        <div style={styles.trendHeader}>
          <h2 style={styles.cardTitle}>📉 Risk Trends</h2>
          <div style={styles.periodSelector}>
            {['week', 'month', 'year'].map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                style={{
                  ...styles.periodButton,
                  backgroundColor: selectedPeriod === period ? '#007BFF' : '#f0f0f0',
                  color: selectedPeriod === period ? '#fff' : '#000'
                }}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={styles.trendChart}>
          {riskData?.trendData?.map((point, idx) => (
            <div key={idx} style={styles.trendPoint}>
              <div style={styles.trendDate}>{point.date}</div>
              <div style={styles.trendValue}>{point.riskScore}</div>
              <div
                style={{
                  ...styles.trendBar,
                  height: `${(point.riskScore / 100) * 200}px`,
                  backgroundColor: getRiskColor(point.level)
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>💊 Personalized Recommendations</h2>
        <div style={styles.recommendationsList}>
          {riskData?.recommendations?.map((rec, idx) => (
            <div key={idx} style={styles.recommendationItem}>
              <span style={styles.recommendationIcon}>{rec.icon}</span>
              <div style={styles.recommendationContent}>
                <h3 style={styles.recommendationTitle}>{rec.title}</h3>
                <p style={styles.recommendationText}>{rec.description}</p>
                <span style={styles.recommendationPriority}>{rec.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div style={{...styles.card, backgroundColor: '#fff8f0', borderLeft: '5px solid #ff6b6b'}}>
        <h2 style={styles.cardTitle}>🚨 Emergency Contacts</h2>
        <div style={styles.emergencyContacts}>
          <div style={styles.contactBox}>
            <h3>Emergency Services</h3>
            <p style={styles.contactNumber}>911</p>
            <p>Medical Emergency</p>
          </div>
          <div style={styles.contactBox}>
            <h3>Poison Control</h3>
            <p style={styles.contactNumber}>1-800-222-1222</p>
            <p>Poisoning & Drug Overdose</p>
          </div>
          <div style={styles.contactBox}>
            <h3>Mental Health Crisis</h3>
            <p style={styles.contactNumber}>988</p>
            <p>Suicide & Crisis Hotline</p>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div style={styles.disclaimerBox}>
        <h3 style={styles.disclaimerTitle}>⚕️ Medical Disclaimer</h3>
        <p style={styles.disclaimerText}>
          This dashboard provides educational health risk assessments based on AI analysis of uploaded images and symptom information. 
          It is NOT a medical diagnosis or professional medical advice. Always consult qualified healthcare professionals for accurate 
          diagnosis, treatment, and medical decisions. In case of medical emergency, call 911 immediately. This tool is for informational 
          purposes only.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  emergencyOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease'
  },
  emergencyModal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '0',
    maxWidth: '600px',
    width: '95%',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    animation: 'slideIn 0.3s ease',
    border: '3px solid #ff4444',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  emergencyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#ff4444',
    borderBottom: '2px solid #ff2222'
  },
  emergencyTitle: {
    margin: 0,
    fontSize: '1.5rem',
    color: 'white',
    fontWeight: 'bold'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: 'white',
    cursor: 'pointer',
    padding: '0 10px'
  },
  emergencyContent: {
    padding: '25px'
  },
  riskWarning: {
    backgroundColor: '#fff0f0',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #ff4444',
    marginBottom: '20px'
  },
  emergencyActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px'
  },
  emergencyButton: {
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  hospitalsSection: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid #e0e0e0'
  },
  hospitalsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  hospitalItem: {
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '6px',
    borderLeft: '4px solid #007BFF'
  },
  loadingHospitals: {
    backgroundColor: '#f0f8ff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '15px',
    color: '#666'
  },
  emergencyInfo: {
    backgroundColor: '#fffbf0',
    padding: '12px',
    borderRadius: '6px',
    borderLeft: '4px solid #ff9800'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#333'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    margin: 0
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: '20px'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #ddd',
    borderTop: '5px solid #007BFF',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  alertsSection: {
    marginBottom: '30px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333'
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  alertBox: {
    display: 'flex',
    gap: '15px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    alignItems: 'flex-start'
  },
  alertContent: {
    flex: 1
  },
  alertTitle: {
    margin: '0 0 5px 0',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333'
  },
  alertMessage: {
    margin: '0 0 8px 0',
    color: '#666',
    fontSize: '0.95rem'
  },
  alertSeverity: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    color: '#333'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
    color: '#333'
  },
  riskScoreHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  riskScoreDisplay: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px'
  },
  scoreCircle: {
    position: 'relative',
    width: '200px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreCircleSvg: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  scoreText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  scoreValue: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333'
  },
  scoreLabel: {
    fontSize: '0.9rem',
    color: '#666'
  },
  riskLevelBox: {
    textAlign: 'center',
    marginBottom: '15px'
  },
  riskBadge: {
    display: 'inline-block',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  riskDescription: {
    textAlign: 'center',
    color: '#666',
    marginTop: '15px',
    fontSize: '0.95rem'
  },
  riskBreakdown: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  riskCategory: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryName: {
    fontWeight: 'bold',
    color: '#333'
  },
  categoryBadge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '0.85rem'
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  diseaseCard: {
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px'
  },
  diseaseName: {
    margin: '0 0 10px 0',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333'
  },
  diseaseDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginBottom: '10px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#666'
  },
  diseaseDescription: {
    margin: '10px 0 0 0',
    fontSize: '0.85rem',
    color: '#777',
    borderTop: '1px solid #e0e0e0',
    paddingTop: '10px'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  metricCard: {
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #e0e0e0'
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  metricName: {
    margin: 0,
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#333'
  },
  metricValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: '5px'
  },
  metricNormal: {
    margin: '0 0 5px 0',
    fontSize: '0.85rem',
    color: '#666'
  },
  metricStatus: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#999'
  },
  trendHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  periodSelector: {
    display: 'flex',
    gap: '10px'
  },
  periodButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  },
  trendChart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '300px',
    gap: '10px'
  },
  trendPoint: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  trendDate: {
    fontSize: '0.8rem',
    color: '#666',
    marginBottom: '5px'
  },
  trendValue: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px'
  },
  trendBar: {
    width: '100%',
    borderRadius: '4px 4px 0 0',
    minHeight: '20px',
    transition: 'background-color 0.3s ease'
  },
  recommendationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  recommendationItem: {
    display: 'flex',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    borderLeft: '4px solid #007BFF'
  },
  recommendationIcon: {
    fontSize: '1.5rem',
    minWidth: '30px'
  },
  recommendationContent: {
    flex: 1
  },
  recommendationTitle: {
    margin: '0 0 5px 0',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: '#333'
  },
  recommendationText: {
    margin: '0 0 8px 0',
    color: '#666',
    fontSize: '0.9rem'
  },
  recommendationPriority: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    backgroundColor: '#e3f2fd',
    color: '#1976d2'
  },
  emergencyContacts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  contactBox: {
    padding: '15px',
    backgroundColor: '#fff9f9',
    borderRadius: '8px',
    borderLeft: '4px solid #ff6b6b',
    textAlign: 'center'
  },
  contactNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ff6b6b',
    margin: '8px 0'
  },
  disclaimerBox: {
    padding: '20px',
    backgroundColor: '#fff9f0',
    borderLeft: '5px solid #ff9800',
    borderRadius: '8px',
    marginTop: '30px'
  },
  disclaimerTitle: {
    margin: '0 0 10px 0',
    color: '#ff6b6b',
    fontSize: '1rem'
  },
  disclaimerText: {
    margin: 0,
    color: '#666',
    fontSize: '0.9rem',
    lineHeight: '1.6'
  }
};

// Add global styles for animations
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideIn {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;
  if (document.head) {
    document.head.appendChild(styleSheet);
  }
}

export default RiskDashboard;
