# 🏥 AI Health Awareness Platform - API Documentation

## ✅ Backend Features (All Implemented)

The backend is now running on **http://localhost:5000** with all the following features:

### 1. **Authentication & User Management** (`/api/auth`)
- **POST /api/auth/register** - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }
  ```
- **POST /api/auth/login** - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **GET /api/auth/profile** - Get user profile
- **PUT /api/auth/profile** - Update profile (age, gender, blood type)

### 2. **Chatbot** (`/api/chatbot`)
- **POST /api/chatbot/chat** - Chat with AI assistant
  ```json
  {
    "message": "hello"
  }
  ```

### 3. **Symptom Checker** (`/api/symptom`)
- **POST /api/symptom** - Check symptoms (NOW returns `advice` instead of `result`)
  ```json
  {
    "symptom": "fever"
  }
  ```

### 4. **Disease Prediction** (`/api/disease`) ⭐ NEW
- **POST /api/disease/predict** - Predict disease from multiple symptoms
  ```json
  {
    "symptoms": ["fever", "cough", "headache"]
  }
  ```
- **GET /api/disease/symptoms** - Get list of available symptoms

### 5. **Appointment Booking** (`/api/appointment`) ⭐ NEW
- **GET /api/appointment/doctors** - List all available doctors
  ```json
  {
    "specialty": "General Medicine"  // Optional filter
  }
  ```
- **POST /api/appointment/book** - Book appointment
  ```json
  {
    "email": "user@example.com",
    "doctorId": 1,
    "appointmentDate": "2026-03-20",
    "appointmentTime": "10:00 AM",
    "concern": "High fever"
  }
  ```
- **GET /api/appointment/list** - Get user's appointments
- **POST /api/appointment/cancel** - Cancel appointment
- **POST /api/appointment/reschedule** - Reschedule appointment

### 6. **Medication Management** (`/api/medication`) ⭐ NEW
- **POST /api/medication/add** - Add medication
  ```json
  {
    "email": "user@example.com",
    "medicationName": "Aspirin",
    "dosage": "500mg",
    "frequency": "Twice daily",
    "startDate": "2026-03-01",
    "endDate": "2026-03-15",
    "prescribedBy": "Dr. Sharma"
  }
  ```
- **GET /api/medication/list** - Get medications
- **DELETE /api/medication/delete** - Delete medication
- **POST /api/medication/reminder** - Set reminder for medication

### 7. **Food Recommendations** (`/api/food`) ⭐ NEW
- **POST /api/food/recommendations** - Get food recommendations
  ```json
  {
    "symptoms": ["fever", "cough"]
  }
  ```
- **GET /api/food/recipes** - Get healthy recipes

### 8. **Health History & Records** (`/api/health`) ⭐ NEW
- **POST /api/health/add** - Add health record
  ```json
  {
    "email": "user@example.com",
    "recordType": "blood-pressure",
    "data": { "systolic": 120, "diastolic": 80 }
  }
  ```
- **GET /api/health/history** - Get health history
- **DELETE /api/health/delete** - Delete record
- **GET /api/health/stats** - Get health statistics
- **POST /api/health/test-result/add** - Add medical test result
- **GET /api/health/test-result/list** - Get test results

### 9. **Health Awareness** (`/health-awareness`)
- **POST /health-awareness** - Get health awareness tips

---

## 📱 Frontend Components (Ready to Use)

Available components in `/frontend/src/components/`:
1. **Chatbot.jsx** - AI Chatbot widget
2. **SymptomChecker.jsx** - Check symptoms
3. **EmergencyInfo.jsx** - Emergency contacts
4. **AwarenessArticles.jsx** - Health tips and articles
5. **Navbar.jsx** - Navigation
6. **Footer.jsx** - Footer
7. **Quiz.jsx** - Health quiz

---

## 🚀 How to Use

### Start Both Servers:
```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
cd frontend
node node_modules/vite/bin/vite.js
```

### Access the Application:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 📝 Example Workflows

### Register and Login
```javascript
// Register
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'secure123',
    fullName: 'Jane Doe'
  })
})

// Login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'secure123'
  })
})
```

### Disease Prediction
```javascript
fetch('http://localhost:5000/api/disease/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    symptoms: ['fever', 'cough', 'headache']
  })
})
```

### Book Appointment
```javascript
fetch('http://localhost:5000/api/appointment/book', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    doctorId: 1,
    appointmentDate: '2026-04-15',
    appointmentTime: '2:00 PM',
    concern: 'Regular checkup'
  })
})
```

---

## 🔧 Troubleshooting

If backend shows "address already in use":
```bash
# Kill node processes
taskkill /IM node.exe /F

# Then restart the server
```

If frontend doesn't connect to backend:
- Check if backend is running on port 5000
- Check CORS is enabled in server.js (it is)
- Check browser console for errors

---

## 📊 Available Doctors

1. Dr. Rajesh Kumar - General Medicine
2. Dr. Priya Sharma - Cardiology
3. Dr. Amit Patel - Orthopedics
4. Dr. Neha Singh - Pediatrics
5. Dr. Vikram Desai - Dermatology

---

## ✨ Next Steps

Add UI components in frontend for:
- [ ] User authentication forms
- [ ] Disease prediction interface
- [ ] Appointment booking interface
- [ ] Medication tracking page
- [ ] Health records dashboard
- [ ] Doctor consultation system

All backend APIs are ready and tested!
