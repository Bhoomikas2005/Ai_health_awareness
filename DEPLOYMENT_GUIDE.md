# 🚀 Deployment & Installation Guide

## Quick Start (Easiest)

### For Windows Users:
1. Double-click `start-all.bat` in the project root
2. Two command windows will open automatically
3. Wait 10-15 seconds for both servers to start
4. Open browser: **http://localhost:5173**

## Detailed Setup Instructions

### Prerequisites
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **Git** (optional, for cloning) ([Download](https://git-scm.com/))
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Step 1: Get the Project

**Option A: Using Git**
```bash
git clone https://github.com/Bhoomikas2005/risk-prediction.git
cd AI-health-awareness
```

**Option B: Download ZIP**
1. Visit GitHub repository
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open extracted folder in terminal

### Step 2: Install Dependencies

```bash
# Navigate to project root
cd AI-health-awareness

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install

# Return to project root
cd ..
```

### Step 3: Start the Servers

**Method 1: Batch Scripts (Windows)**
- Just double-click: `start-all.bat`
- Or run individually:
  - `start-backend.bat` (Terminal 1)
  - `start-frontend.bat` (Terminal 2)

**Method 2: Manual Command Line**

Terminal 1 (Backend):
```bash
cd backend
npm start
# Should show: "Server running on http://localhost:5000"
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
# Should show: "Local: http://localhost:5173"
```

**Method 3: PowerShell**
```powershell
# Run in PowerShell as Administrator
cd "C:\path\to\AI-health-awareness"
.\start-all.ps1
```

### Step 4: Access the Application

1. Open your browser
2. Go to: **http://localhost:5173**
3. Click on **Features → Disease Prediction**
4. Select **📸 Medical Image Analysis** tab
5. Upload a medical image to test

## 🔧 Environment Configuration

### Backend (.env file - optional)

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
LOG_LEVEL=info
```

### Frontend (.env file - optional)

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=AI Health Awareness
```

## 📊 Project Structure After Installation

```
AI-health-awareness/
├── backend/
│   ├── node_modules/        (created after npm install)
│   ├── package.json
│   └── ... other files
├── frontend/
│   ├── node_modules/        (created after npm install)
│   ├── package.json
│   └── ... other files
├── start-all.bat            (Run this for quick start)
├── start-backend.bat
├── start-frontend.bat
├── README.md
└── ... other files
```

## ✅ Verification Checklist

After starting servers, verify everything is working:

- [ ] Backend console shows: "Server running on http://localhost:5000"
- [ ] Frontend console shows: "VITE ... ready in XXX ms"
- [ ] Browser opens to http://localhost:5173 without errors
- [ ] Can navigate to Disease Prediction page
- [ ] Image Analysis tab is visible and clickable
- [ ] Can upload/select images for analysis

## 🆘 Troubleshooting

### Issue: "npm is not recognized"
**Solution:**
- Install Node.js from https://nodejs.org/
- Restart PowerShell/Terminal after installation
- Verify: `npm --version`

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F
```

### Issue: "VITE app not loading"
**Solution:**
- Check frontend terminal for errors
- Clear browser cache (Ctrl+Shift+Delete)
- Restart frontend server: `npm run dev`

### Issue: "Cannot upload image"
**Solution:**
- Check file format (JPG, PNG, GIF, WebP, TIFF)
- File size must be under 10MB
- Check browser console for errors (F12)

### Issue: "Modules not found"
**Solution:**
```bash
# Delete node_modules and reinstall
cd backend
rm -r node_modules
npm install

cd ../frontend
rm -r node_modules
npm install
```

### Issue: "Git not configured"
**Solution:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

## 📦 Production Build

For production deployment:

**Backend:**
```bash
cd backend
npm run build  # if build script exists
npm start      # or set NODE_ENV=production
```

**Frontend:**
```bash
cd frontend
npm run build
# Creates dist/ folder with optimized files
# Can be served with any static server
```

## 🐳 Docker Deployment (Optional)

Build Docker image:
```bash
docker build -t ai-health-awareness .
docker run -p 3000:5173 -p 5000:5000 ai-health-awareness
```

## 📝 Development Commands

**Backend:**
- `npm start` - Start server
- `npm test` - Run tests (if configured)
- `npm run lint` - Lint code

**Frontend:**
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run preview` - Preview production build

## 🔒 Security Notes

1. Change default ports if needed:
   - Backend: Edit `backend/server.js` (line: `app.listen(5000)`)
   - Frontend: Edit `frontend/vite.config.js`

2. Add authentication for production:
   - Implement login/registration
   - Use JWT tokens
   - Hash sensitive data

3. Database setup:
   - Currently uses in-memory storage
   - Connect MongoDB/PostgreSQL for persistence

4. API Security:
   - Add rate limiting
   - Implement CORS policies
   - Validate all inputs

## 📖 Additional Resources

- [Node.js Docs](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Express.js API](https://expressjs.com/)

## 🆘 Getting Help

1. Check the troubleshooting section above
2. Review browser console (F12) for errors
3. Check terminal output for error messages
4. Create an issue on GitHub with:
   - Error message
   - Operating system
   - Node.js version
   - Steps to reproduce

## 📝 Notes

- Default servers run on `localhost:5000` (backend) and `localhost:5173` (frontend)
- Browser must support ES6+ and Canvas API
- WebP image format may not work on older browsers
- Some features require JavaScript enabled

## ✅ You're All Set!

Your AI Health Awareness System is ready to use. Start with `start-all.bat` and begin exploring the medical image analysis feature!

---

**Need help?** Check GITHUB_SETUP.md for Git configuration or GitHub_SETUP.md for GitHub push instructions.
