# 🚀 How to Start the Project

## Quick Start Guide

### Option 1: Direct Browser (Easiest)
1. Open `frontend/src/index.html` directly in your browser
2. Double-click the file or right-click → Open with → Browser

### Option 2: Local Server (Recommended)

#### Using Python:
```bash
# Navigate to frontend/src directory
cd frontend/src

# Start server
python -m http.server 8000

# Then open in browser:
# http://localhost:8000
```

#### Using Node.js (if you have it):
```bash
# Navigate to frontend/src directory
cd frontend/src

# Install http-server (one time)
npm install -g http-server

# Start server
http-server -p 8000

# Then open in browser:
# http://localhost:8000
```

#### Using VS Code Live Server:
1. Install "Live Server" extension in VS Code
2. Right-click on `frontend/src/index.html`
3. Click "Open with Live Server"

### Option 3: Using the Start Page
1. Open `frontend/start.html` in your browser
2. Click "Open Application" button

## Backend Setup (Required for Full Functionality)

1. Open a new terminal
2. Navigate to backend:
```bash
cd backend
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend:
```bash
python app.py
```

Backend will run on: `http://127.0.0.1:5000`

## Complete Setup Steps

### Step 1: Start Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Step 2: Start Frontend
```bash
# In a new terminal
cd frontend/src
python -m http.server 8000
```

### Step 3: Open Browser
- Frontend: http://localhost:8000
- Backend API: http://127.0.0.1:5000

## Troubleshooting

### Frontend not loading?
- Make sure you're in the `frontend/src` directory
- Check if port 8000 is already in use
- Try a different port: `python -m http.server 8080`

### Backend not starting?
- Make sure Python is installed
- Install Flask: `pip install Flask Flask-CORS`
- Check if port 5000 is available

### CORS errors?
- Make sure backend is running
- Check backend URL in `frontend/public/js/api.js`

## Default Credentials

- **Admin**: admin@cafe.com / admin123
- **User**: Sign up through the frontend

## Project Structure

```
smart_cafe_management_system/
├── backend/          # Python Flask API
│   └── app.py        # Run this for backend
├── frontend/         # HTML/CSS/JS Frontend
│   └── src/          # Main frontend files
│       └── index.html # Start here!
```

## Quick Commands

### Windows (PowerShell):
```powershell
# Backend
cd backend
python app.py

# Frontend (new terminal)
cd frontend\src
python -m http.server 8000
```

### Mac/Linux:
```bash
# Backend
cd backend
python3 app.py

# Frontend (new terminal)
cd frontend/src
python3 -m http.server 8000
```

## ✅ Success Indicators

- Backend: You'll see "Server running on: http://127.0.0.1:5000"
- Frontend: Browser opens and shows the home page
- No errors in browser console

Happy Coding! 🎉

