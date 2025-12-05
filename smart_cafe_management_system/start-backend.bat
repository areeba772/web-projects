@echo off
echo ========================================
echo Smart Cafe Management System
echo Backend Server Starting...
echo ========================================
echo.
cd backend
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting server on http://127.0.0.1:5000
echo.
echo Press Ctrl+C to stop the server
echo.
python app.py
pause

