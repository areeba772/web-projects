@echo off
echo ====================================
echo Starting Lost and Found Portal
echo ====================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Installing backend dependencies...
cd backend
call npm install
cd ..
echo.
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo.
echo ====================================
echo Starting Backend and Frontend...
echo ====================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.
start cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
start cmd /k "cd frontend && npm start"
echo.
echo Both servers are starting...
echo Check the opened windows for server status
pause

