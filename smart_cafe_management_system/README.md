# Smart Cafe Management System

A comprehensive web-based cafe management system for COMSATS University Islamabad, Vehari Campus. This system supports three main user roles: Admin, Users (Students and Teachers), and Food Authority (Government), with AI-based personalized food recommendations.

## Features

- **User Management**: Signup, Login, Logout with comprehensive validation
- **User Dashboard**: Browse cafes, view AI recommendations, manage cart, place orders
- **Admin Dashboard**: Manage cafes, menus, orders, users, and receive notifications
- **Food Authority Portal**: Monitor cafe rates, send regulatory notifications
- **AI Recommendations**: Personalized food suggestions based on user behavior
- **Shopping Cart**: Add/remove items, update quantities, checkout
- **Order Management**: Place orders, track order history
- **Notification System**: Communication between Food Authority and Admin

## Project Structure

```
smart_cafe_management_system/
├── backend/
│   ├── app.py              # Flask backend application
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
├── frontend/
│   ├── public/
│   │   ├── css/           # Additional CSS files
│   │   ├── images/        # Image assets
│   │   └── js/            # JavaScript utilities
│   │       ├── validation.js       # Form validation
│   │       ├── auth.js             # Authentication
│   │       ├── cart.js             # Cart management
│   │       ├── api.js              # API client
│   │       └── recommendations.js  # AI recommendations
│   ├── src/
│   │   ├── index.html     # Home page
│   │   ├── app.js         # Main application script
│   │   ├── styles/        # CSS stylesheets
│   │   └── pages/         # Application pages
│   │       ├── User/      # User pages
│   │       ├── Admin/     # Admin pages
│   │       └── FoodAuthority/  # Food Authority pages
│   └── README.md          # Frontend documentation
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for CDN resources)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask application:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Open `frontend/src/index.html` in your web browser
2. Or use a local web server:
```bash
cd frontend/src
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser

## Default Credentials

### Admin
- Email: `admin@cafe.com`
- Password: `admin123`

### Users
- Sign up through the frontend

### Food Authority
- Sign up through the frontend (requires special setup for role assignment)

## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Font Awesome (Icons)
- LocalStorage (Session & Cart Management)

### Backend
- Python 3.x
- Flask (Web Framework)
- SQLite (Database)
- Flask-CORS (Cross-Origin Resource Sharing)

## Validation Features

All forms include comprehensive validation:

- **Email**: Valid email format
- **Password**: Minimum 8 characters with uppercase, lowercase, number, and special character
- **Phone**: Pakistani format (92XXXXXXXXXX)
- **Student ID**: Format validation (XX22-XXX-XXX)
- **Real-time validation**: Immediate feedback on field blur
- **Form submission**: Validates all fields before submission

## AI Recommendation System

The system includes an AI-based recommendation engine that:
- Analyzes user order history
- Considers item popularity
- Provides personalized suggestions
- Falls back to popular items for new users

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User signup
- `POST /api/auth/logout` - User logout

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/orders` - Get order history
- `POST /api/user/orders` - Place new order

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/cafes` - Get all cafes
- `POST /api/admin/cafes` - Create new cafe

### Food Authority
- `GET /api/food-authority/dashboard` - Get dashboard
- `POST /api/food-authority/notifications` - Send notification

### Menu & Recommendations
- `GET /api/menu/cafes` - Get cafes with menu
- `GET /api/menu/cafes/<cafe_id>/items` - Get menu items
- `GET /api/menu/recommendations/<user_id>` - Get recommendations

## Development Notes

- Uses localStorage for session and cart management
- All API calls include error handling and fallbacks
- Responsive design for mobile and desktop
- Font Awesome icons for UI elements
- SQLite database for development (can be migrated to MySQL/PostgreSQL)

## Contributors

- Areeba Riaz (FA22-BSE-014) - User Module, User Dashboard, AI Recommendation System
- Fazeela Rubab (FA22-BSE-112) - Admin Module, Food Authority Portal, Notification System

## Supervisor

Sir Abdul Rahman

## License

This project is developed for COMSATS University Islamabad, Vehari Campus as a Final Year Project.

