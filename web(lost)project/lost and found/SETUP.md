# Setup Instructions - Lost and Found Portal

## Quick Start (Windows)

### Method 1: Using start.bat (Easiest)
1. Double-click `start.bat` file
2. Wait for installation to complete
3. Two windows will open - one for backend, one for frontend
4. Website will open automatically at http://localhost:3000

### Method 2: Using npm commands

#### Step 1: Install all dependencies
```bash
npm run install-all
```

#### Step 2: Start both servers together
```bash
npm start
```

This will start:
- Backend on: http://localhost:5000
- Frontend on: http://localhost:3000

## Manual Setup

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup (in new terminal)
```bash
cd frontend
npm install
npm start
```

## Important Notes

1. **MongoDB must be running** on `mongodb://localhost:27017`
2. Make sure MongoDB Compass or MongoDB service is running
3. Backend should start first, then frontend
4. If you see errors, make sure:
   - Node.js is installed
   - MongoDB is running
   - Ports 3000 and 5000 are not in use

## Troubleshooting

### Frontend not installing?
- Delete `frontend/node_modules` folder
- Run `cd frontend && npm install` again

### Backend not starting?
- Check if MongoDB is running
- Check if port 5000 is available
- Check `backend/.env` file exists

### Both not starting together?
- Use `start.bat` file (Windows)
- Or run them in separate terminals manually

