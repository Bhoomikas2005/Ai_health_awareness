#!/bin/bash
# Quick Start Script for AI Health Awareness Platform

echo "🏥 AI Health Awareness Platform - Quick Start"
echo "=============================================="
echo ""

# Kill any existing node processes
echo "🔧 Cleaning up any existing processes..."
taskkill /IM node.exe /F 2>$null

# Start Backend
echo ""
echo "📦 Starting Backend Server (Port 5000)..."
cd backend
start "Backend" cmd /c "node server.js"
timeout /t 3

# Start Frontend
echo ""
echo "🎨 Starting Frontend Server (Port 5173)..."
cd ../frontend
start "Frontend" cmd /c "node node_modules/vite/bin/vite.js"

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "🌐 Access the application at: http://localhost:5173"
echo "📡 Backend API available at: http://localhost:5000"
echo ""
echo "Press any key to exit this script (servers will continue running)..."
pause
