# Lost and Found Portal

A full-stack web application for reporting and managing lost and found items.

## Features

- **User Authentication**: Signup/Login with JWT tokens
- **User Profile**: Edit profile with name and phone number
- **Dashboard**: Display all lost and found items with images, dates, locations, and reporter information
- **Report Lost Items**: Submit lost items with images, description, location, and date
- **Report Found Items**: Submit found items with images, description, location, and date
- **Smart Matching**: When reporting items, automatically shows matching lost/found items
- **Contact Features**: 
  - Call button (direct phone call)
  - Email button (opens email client)
  - WhatsApp button (opens WhatsApp chat)
- **RESTful API**: Complete backend API with authentication
- **MongoDB Database**: Using Mongoose ODM with MongoDB Compass support
- **Image Upload**: Support for item images with automatic storage

## Project Structure

```
lost and found/
├── backend/          # Backend API (Node.js, Express, Mongoose)
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── middleware/  # Authentication middleware
│   └── uploads/     # Uploaded images
└── frontend/        # Frontend (React)
    └── src/
        ├── components/
        ├── pages/
        └── context/
```

## Quick Start (Easiest Method)

### Windows Users:
1. **Double-click `start.bat`** - This will install everything and start both servers automatically!

### All Users (Alternative):

1. **Install all dependencies:**
```bash
npm run install-all
```

2. **Start both servers together:**
```bash
npm start
```

This will start:
- Backend on: http://localhost:5000
- Frontend on: http://localhost:3000

## Manual Setup

### Prerequisites

- Node.js installed (v14 or higher)
- MongoDB installed and running (or MongoDB Compass)
- npm

### Step 1: Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure `.env` file exists in backend folder with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lostfound
JWT_SECRET=your_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Make sure MongoDB is running on `mongodb://localhost:27017`

5. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 2: Frontend Setup (in a NEW terminal)

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000` and open automatically in your browser.

## Troubleshooting

### Frontend not installing?
- Delete `frontend/node_modules` folder
- Delete `frontend/package-lock.json` (if exists)
- Run `cd frontend && npm install` again

### Backend not starting?
- Check if MongoDB is running (open MongoDB Compass)
- Check if port 5000 is available
- Verify `backend/.env` file exists

### Port already in use?
- Close other applications using ports 3000 or 5000
- Or change ports in `.env` (backend) and restart

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (with optional phone)
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Lost Items
- `GET /api/lost-items` - Get all lost items
- `GET /api/lost-items/:id` - Get single lost item
- `POST /api/lost-items` - Create lost item (protected)
- `PUT /api/lost-items/:id` - Update lost item (protected)
- `DELETE /api/lost-items/:id` - Delete lost item (protected)

### Found Items
- `GET /api/found-items` - Get all found items
- `GET /api/found-items/:id` - Get single found item
- `POST /api/found-items` - Create found item (protected)
- `PUT /api/found-items/:id` - Update found item (protected)
- `DELETE /api/found-items/:id` - Delete found item (protected)

### Matching Items
- `GET /api/matching/lost/:name` - Get matching lost items by name
- `GET /api/matching/found/:name` - Get matching found items by name

## Usage

1. Start MongoDB (make sure it's running on port 27017)
2. Start the backend server (`cd backend && npm start`)
3. Start the frontend server (`cd frontend && npm start`)
4. Open `http://localhost:3000` in your browser
5. Sign up for a new account (you can add phone number for contact features)
6. View the dashboard to see all lost and found items
7. Use "Report Lost Item" or "Report Found Item" buttons to add new items
8. When reporting items, matching items will automatically appear if found
9. Click on Email, Call, or WhatsApp buttons on items to contact the reporter
10. Update your profile from the Profile page in the navigation

## Database

The application uses MongoDB with the following collections:
- `users` - User accounts
- `lostitems` - Lost items
- `founditems` - Found items

You can view and manage the database using MongoDB Compass by connecting to `mongodb://localhost:27017/lostfound`

