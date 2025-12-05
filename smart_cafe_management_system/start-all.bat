@echo off
echo ========================================
echo Smart Cafe Management System
echo Starting Both Servers...
echo ========================================
echo.
start "Backend Server" cmd /k "cd backend && python app.py"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "cd frontend\src && python -m http.server 8000"
timeout /t 2 /nobreak >nul
echo.
echo ========================================
echo Both servers are starting!
echo.
echo Backend:  http://127.0.0.1:5000
echo Frontend: http://localhost:8000
echo.
echo Close the windows to stop the servers
echo ========================================
pause

