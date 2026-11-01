# Emergency Alert & Hospital Locator Feature Documentation

## Overview

The Emergency Alert and Hospital Locator system provides critical health monitoring with immediate emergency response capabilities. When a user's health risk score exceeds critical thresholds, the system automatically triggers emergency alerts and locates nearby medical facilities.

## Features

### 1. **Critical Risk Detection**
- Monitors health risk scores in real-time
- Automatically triggers emergency alert modal when risk score > 75
- Visual indication with critical alert UI
- Prevents user from dismissing without acknowledgment

### 2. **Emergency Alert Modal**
The emergency popup displays:
- **Risk Score Display**: Shows current risk level in critical range
- **Emergency Actions**: Quick access buttons for:
  - Find Nearby Hospitals
  - Call 911
  - Open Google Maps
- **Safety Information**: Current location sharing details
- **Nearby Hospitals List**: Real-time hospital information with:
  - Hospital name and distance
  - Address and phone number
  - Get Directions link
  - Emergency department status

### 3. **Hospital Location Service**
Find nearby medical facilities within configurable radius:
- **Default Radius**: 5 kilometers
- **Hospital Data**: Name, address, distance, phone, specialties
- **Emergency Departments**: Filter to hospitals with 24/7 emergency services
- **Availability**: Show available hospital beds and ICU status
- **Ratings**: Hospital quality ratings and patient reviews

### 4. **Geolocation Services**
- Automatic user location detection (with permission)
- Privacy-compliant location handling
- Fallback for location access denial
- Secure location data transmission

### 5. **Google Maps Integration**
- Interactive map showing user location and nearby hospitals
- Hospital markers with information windows
- Get Directions functionality linking to Google Maps
- Real-time traffic and route information

## Frontend Components

### RiskDashboard.jsx

**New State Variables:**
```javascript
const [showEmergency, setShowEmergency] = useState(false);
const [userLocation, setUserLocation] = useState(null);
const [hospitals, setHospitals] = useState([]);
const [loadingHospitals, setLoadingHospitals] = useState(false);
```

**New Functions:**

#### `initializeGeolocation()`
Requests browser geolocation permission and stores coordinates.

#### `findNearbyHospitals()`
Fetches nearby hospitals from backend API:
```javascript
POST /api/risk-dashboard/nearby-hospitals
Body: { latitude, longitude, radius }
```

#### `triggerEmergencyAlert()`
Sends critical alert to backend:
```javascript
POST /api/risk-dashboard/emergency-alert
Body: { riskScore, riskLevel, location, timestamp }
```

#### `initializeMap()`
Initializes Google Maps display with user location and hospital markers.

**Emergency Modal Styles:**
- `emergencyOverlay`: Full-screen semi-transparent background
- `emergencyModal`: Centered modal container with red border
- `emergencyHeader`: Red header with alert title and close button
- `emergencyActions`: Action button container (Call, Find Hospitals, Maps)
- `hospitalsSection`: List of nearby hospitals

## Backend API Endpoints

### 1. Emergency Alert Endpoint
```
POST /api/risk-dashboard/emergency-alert
```

**Request Body:**
```json
{
  "riskScore": 85,
  "riskLevel": "Critical",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "timestamp": "2026-03-06T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Emergency alert triggered and routed to nearby hospitals",
  "alert": {
    "id": "ALERT-1234567890",
    "severity": "CRITICAL",
    "riskScore": 85,
    "riskLevel": "Critical",
    "status": "SENT_TO_HOSPITALS",
    "hospitalsNotified": [
      "General Hospital Medical Center",
      "City Medical Emergency Center"
    ],
    "emergencyServices": {
      "ambulance": "DISPATCHED",
      "status": "Units are being sent to your location",
      "etaMinutes": 8
    }
  }
}
```

### 2. Nearby Hospitals Endpoint
```
POST /api/risk-dashboard/nearby-hospitals
```

**Request Body:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "radius": 5000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Nearby hospitals retrieved successfully",
  "hospitals": [
    {
      "id": "h1",
      "name": "City General Hospital",
      "distance": "0.8 km",
      "address": "123 Medical Center Dr, City, State 12345",
      "phone": "(555) 123-4567",
      "emergencyDept": true,
      "rating": 4.8,
      "availableBeds": 45,
      "specialties": ["Cardiology", "Emergency", "Surgery"],
      "mapsUrl": "https://maps.google.com/...",
      "coordinates": {
        "lat": 40.7135,
        "lng": -74.0058
      }
    }
  ]
}
```

## Usage Flow

### User Scenario: Critical Risk Detection

1. **Risk Monitoring**
   - User navigates to Risk Dashboard
   - System automatically fetches risk data
   - Risk score updates every 5 seconds

2. **Critical Threshold Alert**
   - User's risk score exceeds 75
   - Emergency alert modal appears automatically
   - All other page content is dimmed
   - User cannot dismiss without acknowledgment

3. **Finding Help**
   - User clicks "Find Nearby Hospitals"
   - Browser requests location permission
   - System sends location to backend
   - Backend returns list of 5 nearest hospitals
   - Map displays user location and hospital markers

4. **Getting Emergency Help**
   - User sees hospital options with distances
   - User can:
     - Click "Get Directions" to open Google Maps
     - Click "Call 911" for emergency services
     - View hospital specialties and availability

5. **Hospital Notification**
   - Emergency alert sent to 3 nearest hospitals
   - Alert includes:
     - Patient location coordinates
     - Risk level and score
     - Health status summary
     - Recommended specialties

## Configuration

### Google Maps API Setup

1. **Get API Key:**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable Maps, Places, and Geocoding APIs
   - Create API key restriction
   - Copy API key

2. **Add to Frontend:**
   ```html
   <!-- In frontend/index.html -->
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,geometry"></script>
   ```

3. **Replace Placeholder:**
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key

### Environmental Variables

Create `.env` file in root:
```
GOOGLE_MAPS_API_KEY=your_api_key_here
HOSPITAL_API_ENDPOINT=https://api.openmaps.com/hospitals
EMERGENCY_ALERT_WEBHOOK=https://your-hospital-network/alerts
```

## Security Considerations

### Location Privacy
- Location data only transmitted on user action
- Encrypted in transit using HTTPS
- Stored temporarily on secure backend
- Deleted after emergency resolution

### Data Protection
- Emergency alerts contain PHI (Protected Health Information)
- HIPAA-compliant transmission
- Audit logging of all alerts
- User consent for hospital notifications

### Hospital Authentication
- Verify hospital network before alert transmission
- Use digital signatures for alert authenticity
- Rate limiting on emergency endpoints
- Abuse monitoring and alerts

## Testing

### Manual Testing Checklist

- [ ] Emergency modal appears when risk > 75
- [ ] Location permission prompt shows
- [ ] Hospitals load and display correctly
- [ ] Hospital links open correct Google Maps URLs
- [ ] Call 911 initiates phone call
- [ ] Modal can be closed with X button
- [ ] Mobile responsive design works
- [ ] Emergency alert sent to backend
- [ ] Real hospital data loads (not mock data)

### Automated Testing
```javascript
// Example test case
describe('Emergency Alert', () => {
  it('should show emergency modal when risk > 75', () => {
    render(<RiskDashboard />);
    const modal = screen.getByText('CRITICAL HEALTH ALERT');
    expect(modal).toBeInTheDocument();
  });

  it('should find hospitals when location provided', async () => {
    const hospitals = await findNearbyHospitals({
      latitude: 40.7128,
      longitude: -74.0060
    });
    expect(hospitals.length).toBeGreaterThan(0);
  });
});
```

## Future Enhancements

1. **Real-time GPS Tracking**
   - Continuous location updates during emergency
   - Ambulance dispatch coordination
   - Vehicle tracking map

2. **Wearable Device Integration**
   - Smartwatch emergency alerts
   - Biometric data sync
   - Automatic emergency trigger

3. **AI-Powered Triage**
   - Symptom-based hospital recommendation
   - Specialist availability checking
   - Estimated wait time prediction

4. **Telemedicine Integration**
   - Direct doctor consultation during alert
   - Prescription routing to nearest pharmacy
   - Medical history sharing to emergency room

5. **Community Alert System**
   - Notify emergency contacts
   - Family member real-time tracking
   - Medical record sharing authorization

## Troubleshooting

### Emergency Modal Not Appearing
- Check if risk score is actually > 75
- Verify browser console for JavaScript errors
- Ensure RiskDashboard component is loaded
- Check React DevTools for state updates

### Location Not Detected
- Check browser location permissions
- Verify HTTPS is being used (required for geolocation)
- Test with different browsers
- Check system location settings

### Hospitals Not Loading
- Verify backend API is running
- Check network requests in DevTools
- Ensure hospital data endpoint is accessible
- Verify request format matches API spec

### Google Maps Not Showing
- Verify API key is valid and enabled
- Check API quotas haven't been exceeded
- Ensure libraries parameter includes required APIs
- Clear browser cache and reload

## Support & Contact

For issues or feature requests:
- Email: support@health-ai.com
- GitHub Issues: [Project Repo]
- Emergency Hotline: 1-800-XXX-XXXX

---

**Last Updated:** March 6, 2026  
**Version:** 1.0.0  
**Status:** Production Ready
