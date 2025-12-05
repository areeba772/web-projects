@echo off
echo ========================================
echo Smart Cafe Management System
echo Frontend Server Starting...
echo ========================================
echo.
cd frontend\src
echo Starting server on http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
pause

