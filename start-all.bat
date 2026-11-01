@echo off
REM AI Health Awareness - Complete Startup Script
REM This script starts both backend and frontend servers

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║   AI HEALTH AWARENESS - COMPLETE STARTUP                     ║
echo ║   Medical Image Analysis System                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0

echo 🔍 Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo 📥 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

node --version
echo ✅ Node.js found!
echo.

echo 📁 Navigating to project directory...
cd /d "%SCRIPT_DIR%"
if %errorlevel% neq 0 (
    echo ❌ Failed to navigate to project directory
    pause
    exit /b 1
)
echo ✅ Project directory: %cd%
echo.

REM Check if backend and frontend directories exist
if not exist "backend" (
    echo ❌ Backend directory not found
    echo 📍 Make sure to run this script from the project root
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ❌ Frontend directory not found
    echo 📍 Make sure to run this script from the project root
    pause
    exit /b 1
)

echo.
echo 📦 Installing backend dependencies (if needed)...
cd backend
if not exist "node_modules" (
    echo ⏳ Installing backend packages...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Backend dependencies already installed
)

echo.
echo 📦 Installing frontend dependencies (if needed)...
cd ..\frontend
if not exist "node_modules" (
    echo ⏳ Installing frontend packages...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Frontend dependencies already installed
)

cd ..
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║   ⏳ STARTING SERVERS                                         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Start backend in a new window
echo 🚀 Starting Backend Server (Port 5000)...
start cmd /k "cd backend && npm start"
echo ✅ Backend server starting in new window...
timeout /t 3

REM Start frontend in a new window  
echo 🚀 Starting Frontend Server (Port 5173)...
start cmd /k "cd frontend && npm run dev"
echo ✅ Frontend server starting in new window...

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║   ✅ SERVER STARTUP INITIALIZED                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔌 Backend:  http://localhost:5000
echo.
echo 📸 Navigate to Disease Prediction to use Image Analysis
echo.
echo Press any key to continue...
pause
