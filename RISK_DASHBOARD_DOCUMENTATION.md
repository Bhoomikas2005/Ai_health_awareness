# 📊 Risk Dashboard Documentation

## Overview

The Risk Dashboard is a comprehensive health risk monitoring and assessment system that provides users with:
- **Real-time risk scoring** based on health indicators
- **Disease predictions** with confidence assessments
- **Personalized recommendations** for health improvement
- **Risk trend analysis** over time
- **Health metrics monitoring** with normal ranges
- **Emergency alerts** for critical conditions

## Features

### 1. Overall Risk Score
- Displays a circular progress visualization
- Shows numerical risk score (0-100)
- Categorizes risk level: Critical, High, Medium, Low
- Provides urgency-based recommendations

### 2. Risk Breakdown
- Shows percentage distribution across 5 risk categories:
  - Cardiovascular Risk
  - Respiratory Risk
  - Metabolic Risk
  - Mental Health Risk
  - Infection Risk
- Visual progress bars for each category
- Color-coded severity levels

### 3. Disease Risk Predictions
- Top 3 predicted diseases/conditions
- Confidence percentage for each prediction
- Risk severity level
- Probability assessment
- Brief clinical descriptions

### 4. Health Metrics
- BMI (Body Mass Index)
- Blood Pressure
- Cholesterol Levels
- Blood Sugar Levels
- Comparison with normal ranges
- Status indicators

### 5. Risk Trends
- Visual chart showing risk score over time
- Three time period options: Week, Month, Year
- Trend analysis
- Date-labeled data points
- Color-coded risk levels

### 6. Personalized Recommendations
- Action items based on risk assessment
- Priority levels (High/Medium)
- Detailed descriptions
- Icons for quick identification

### 7. Health Alerts
- Critical alerts with severity levels
- Immediate actionable warnings
- Disease-specific notifications
- Color-coded by urgency

## API Endpoints

### 1. Get Risk Analysis
```
GET /api/risk-dashboard/analysis?period=week&userId=user123
```

**Query Parameters:**
- `period` (string): 'week', 'month', or 'year'
- `userId` (string): User identifier

**Response:**
```json
{
  "success": true,
  "riskAnalysis": {
    "overallRiskLevel": "Medium",
    "riskScore": 62,
    "riskCategories": [...],
    "topDiseases": [...],
    "healthMetrics": [...],
    "trendData": [...],
    "recommendations": [...]
  }
}
```

### 2. Get Risk Alerts
```
GET /api/risk-dashboard/alerts?userId=user123
```

**Response:**
```json
{
  "success": true,
  "alerts": [
    {
      "title": "High Blood Pressure Detected",
      "message": "Your recent readings show elevated blood pressure",
      "severity": "High"
    }
  ],
  "count": 2
}
```

### 3. Get Risk History
```
GET /api/risk-dashboard/history?userId=user123&startDate=2024-01-01&endDate=2024-01-31
```

**Query Parameters:**
- `userId` (string): User identifier
- `startDate` (string): ISO date format
- `endDate` (string): ISO date format

**Response:**
```json
{
  "success": true,
  "history": [
    {
      "date": "2024-01-01",
      "riskScore": 55,
      "riskLevel": "Medium",
      "events": ["Elevated Blood Pressure", "Moderate Activity"]
    }
  ]
}
```

### 4. Get Recommendations
```
GET /api/risk-dashboard/recommendations?userId=user123&riskLevel=Medium
```

**Query Parameters:**
- `userId` (string): User identifier
- `riskLevel` (string): Current risk level

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "icon": "🚶",
      "title": "Increase Physical Activity",
      "description": "Aim for 150 minutes of moderate exercise per week",
      "priority": "High Priority"
    }
  ]
}
```

### 5. Compare Risk Scores
```
POST /api/risk-dashboard/compare
```

**Request Body:**
```json
{
  "userId": "user123",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}
```

**Response:**
```json
{
  "success": true,
  "comparison": {
    "period": "2024-01-01 to 2024-01-31",
    "startScore": 55,
    "endScore": 62,
    "change": 7,
    "changePercentage": 12.7,
    "trend": "Increasing",
    "interpretation": "Risk score has increased slightly"
  }
}
```

### 6. Generate Risk Report
```
POST /api/risk-dashboard/report
```

**Request Body:**
```json
{
  "userId": "user123",
  "format": "json"
}
```

**Response:**
```json
{
  "success": true,
  "report": {
    "title": "Personal Health Risk Assessment Report",
    "generatedDate": "2024-01-15T10:30:00Z",
    "summary": {...},
    "riskCategories": [...],
    "topDiseases": [...],
    "recommendations": [...],
    "nextSteps": [...]
  }
}
```

## Risk Level Categories

### Critical (Risk Score 80-100)
- 🔴 Seek immediate medical attention
- Emergency services may be needed
- Urgent specialist consultation required
- High likelihood of serious health issues

### High (Risk Score 60-79)
- 🟠 Consult healthcare professional urgently
- Schedule appointment within 24 hours
- Significant health concerns detected
- Immediate lifestyle modifications needed

### Medium (Risk Score 40-59)
- 🟡 Schedule medical consultation
- Regular monitoring recommended
- Preventive measures important
- Monitor symptoms closely

### Low (Risk Score 0-39)
- 🟢 Continue preventive care practices
- Maintain healthy lifestyle
- Regular check-ups recommended
- Monitor for any changes

## Health Metrics Guidelines

### BMI (Body Mass Index)
- **Underweight:** BMI < 18.5
- **Normal Weight:** BMI 18.5-24.9
- **Overweight:** BMI 25-29.9
- **Obese:** BMI ≥ 30

### Blood Pressure
- **Normal:** Less than 120/80 mmHg
- **Elevated:** SBP 120-129 and DBP < 80
- **High Blood Pressure Stage 1:** SBP 130-139 or DBP 80-89
- **High Blood Pressure Stage 2:** SBP ≥ 140 or DBP ≥ 90

### Cholesterol
- **Desirable:** Less than 200 mg/dL
- **Borderline High:** 200-239 mg/dL
- **High:** 240 mg/dL and above

### Blood Sugar (Fasting)
- **Normal:** Less than 100 mg/dL
- **Prediabetes:** 100-125 mg/dL
- **Diabetes:** 126 mg/dL and above

## Data Sources Integration

The Risk Dashboard pulls data from:
1. **Medical Image Analysis** - Disease predictions from uploaded images
2. **Symptom Assessment** - User symptom inputs
3. **Health History** - Past medical records
4. **User Inputs** - Manual health metrics
5. **Vital Signs** - Blood pressure, heart rate readings
6. **Lab Results** - Blood tests, cholesterol, etc.

## User Interface Components

### Responsive Design
- Mobile-optimized layout
- Tablet-friendly views
- Desktop full display
- Adaptive grid system

### Color Coding
- **Red (#ff4444):** Critical risk
- **Orange (#ff9800):** High risk
- **Yellow (#ffa500):** Medium risk
- **Green (#4caf50):** Low risk

### Interactive Elements
- Period selector (Week/Month/Year)
- Trend chart visualization
- Risk score progress circle
- Expandable alert boxes
- Clickable metric cards

## Usage Scenarios

### Scenario 1: Regular Health Monitoring
1. User logs in
2. Navigates to Risk Dashboard
3. Reviews overall risk score
4. Checks personal recommendations
5. Monitors trends over time
6. Downloads report if needed

### Scenario 2: Post-Image Analysis
1. User uploads medical image
2. Receives disease prediction
3. Navigates to Risk Dashboard
4. Sees updated risk assessment
5. Views new recommendations
6. Consults healthcare provider if needed

### Scenario 3: Emergency Alert Response
1. Critical alert appears
2. User sees emergency contacts
3. Takes immediate action
4. Documents symptoms
5. Seeks medical attention
6. Updates health records

## Emergency Contacts Included

- **Emergency Services:** 911
- **Poison Control:** 1-800-222-1222
- **Mental Health Crisis:** 988

## Medical Disclaimer

⚠️ **Important:** This dashboard provides educational health risk assessments. It is **NOT** a medical diagnosis or replacement for professional medical advice. Always consult qualified healthcare professionals for accurate diagnosis and treatment decisions.

## Integration with Other Features

The Risk Dashboard integrates with:
- **Disease Prediction** - Uses predictions as risk factors
- **Image Analysis** - Incorporates visual findings
- **Health Records** - Pulls historical context
- **Medication Tracker** - Considers current medications
- **Appointment System** - Recommends check-ups

## Data Privacy & Security

- User data is encrypted
- Only authenticated users access personal data
- Risk assessments are stored securely
- HIPAA compliance considerations
- Data retention policies enforced

## Future Enhancements

- Real-time vital sign integration
- Wearable device connectivity
- Predictive AI models
- PDF report export
- Sharing with healthcare providers
- Mobile app notifications
- Social health challenges
- Family health monitoring

---

**Last Updated:** March 6, 2026
**Version:** 1.0.0
**Status:** Production Ready
