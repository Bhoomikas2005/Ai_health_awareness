# 🚀 GitHub Push Setup Guide

## ⚠️ Current Status
Git is **NOT installed** on this system. You need to install it first to push to GitHub.

## 📥 Step 1: Install Git

### Option A: Download Git Directly
1. Visit: https://git-scm.com/download/win
2. Download the latest Git for Windows installer
3. Run the installer (accept default settings)
4. Restart PowerShell/Terminal after installation

### Option B: Using Chocolatey (if installed)
```powershell
choco install git
```

### Option C: Using Windows Package Manager
```powershell
winget install Git.Git
```

## 🔧 Step 2: Configure Git (After Installation)

Open PowerShell and run:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual GitHub account details.

## 📝 Step 3: Initialize Repository

```powershell
cd "c:\Users\Redmi\Downloads\AI-health-awareness\AI-health-awareness"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AI Health Awareness System with Image Analysis"
```

## 🔑 Step 4: Authentication Setup

### Option A: Using GitHub CLI (Recommended)
```powershell
# Install GitHub CLI
winget install GitHub.cli

# Authenticate
gh auth login
# Follow prompts to authenticate with GitHub
```

### Option B: Using Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` scope
3. When prompted for password during push, use the token

### Option C: Using SSH Keys
1. Generate SSH key:
   ```powershell
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```
2. Add to GitHub account: Settings → SSH Keys
3. Test connection: `ssh -T git@github.com`

## 🚀 Step 5: Push to GitHub

```powershell
cd "c:\Users\Redmi\Downloads\AI-health-awareness\AI-health-awareness"

# Add remote repository
git remote add origin https://github.com/Bhoomikas2005/risk-prediction.git

# Push to GitHub
git push -u origin main

# If you get an error about main branch not existing, use:
git branch -M main
git push -u origin main
```

## ✅ Step 6: Verify Push

Visit: https://github.com/Bhoomikas2005/risk-prediction

Your project should now be visible on GitHub!

---

## 📋 Project Files to Be Pushed

The following structure will be pushed:
```
AI-health-awareness/
├── backend/
│   ├── controllers/
│   │   ├── chatbotController.js
│   │   ├── emergencyController.js
│   │   ├── imageAnalysisController.js (NEW)
│   │   └── symptomController.js
│   ├── routes/
│   │   ├── chatbotRoutes.js
│   │   ├── emergencyRoutes.js
│   │   ├── imageAnalysisRoutes.js (NEW)
│   │   └── symptomRoutes.js
│   ├── models/
│   │   └── userModel.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── config/
│   │   └── db.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── DiseasePrediction.jsx (UPDATED)
│   │   ├── utils/
│   │   │   └── imageAnalyzer.js (NEW - Enhanced)
│   │   ├── api/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── package.json
└── .gitignore (NEW)
```

## 🆘 Troubleshooting

### "fatal: not a git repository"
- Make sure you're in the correct directory
- Run `git init` first

### "authentication failed" 
- Check GitHub credentials
- Use Personal Access Token instead of password
- Ensure token has `repo` scope

### "fatal: unable to access repository"
- Check internet connection
- Verify repository URL is correct
- Try using SSH instead of HTTPS

### "updates were rejected"
- Repository might have existing commits
- Use: `git pull origin main --allow-unrelated-histories`
- Then try pushing again

---

**Next Steps:**
1. Install Git (use one of the methods above)
2. Configure Git with your credentials
3. Follow the push commands in Step 5
4. Verify on GitHub

Good luck! 🎉
